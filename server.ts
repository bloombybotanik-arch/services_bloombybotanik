/**
 * ============================================================================
 * BLOOM BY BOTANIK — server.ts — VERSION ENTREPRISE FUSIONNÉE (PROD + AI STUDIO)
 * ----------------------------------------------------------------------------
 * Express + Vite (dev) + SPA fallback + API complète (ALMA, Stripe, PayPal,
 * Newsletter, Activation BloomLab, Brevo, Firestore, SEO SSR).
 *
 * Prérequis OPTIONNELS (dégradation gracieuse si absents) :
 *   npm i helmet compression
 *
 * Principes :
 *  - Host-gating : aucune redirection 301 hors host canonique (anti-boucle proxy).
 *  - Ordre : routes API → Vite (dev) → catch-all SPA → error handler.
 *  - Sécurité : blocage .cjs/.map, headers sécurité, rate-limit, garde admin.
 *  - Résilience : emails via Promise.allSettled, graceful shutdown, process safety.
 * ============================================================================
 */
import express from "express";
import path from "path";
import fs from "fs";
import cors from "cors";
import type Stripe from "stripe";
import type { Firestore } from "firebase-admin/firestore";
import { createRequire } from "module";
import dotenv from "dotenv";
import { ROUTES_META, getRouteMeta, type RouteMeta } from "./src/seo/routesMeta";

dotenv.config();

/* Dépendances optionnelles (dégradation gracieuse) */
const requireFromMeta = createRequire(import.meta.url);
const optionalRequire = (id: string): any => {
  try { return requireFromMeta(id); } catch { return null; }
};
const helmet: any = optionalRequire("helmet");
const compression: any = optionalRequire("compression");

/* ----------------------------------------------------------------------------
 * CONFIG
 * -------------------------------------------------------------------------- */
const getAppPort = (): number => {
  const portArgIndex = process.argv.indexOf("--port");
  if (portArgIndex !== -1 && process.argv[portArgIndex + 1]) {
    const parsed = Number(process.argv[portArgIndex + 1]);
    if (!isNaN(parsed) && parsed > 0) return parsed;
  }
  const envPort = Number(process.env.PORT);
  if (envPort && !isNaN(envPort) && envPort !== 8080) {
    return envPort;
  }
  const defaultPort = Number(process.env.DEFAULT_APP_PORT);
  if (defaultPort && !isNaN(defaultPort) && defaultPort !== 8080) {
    return defaultPort;
  }
  return 3000;
};
const PORT = getAppPort();
const CANONICAL_HOST = "bloombybotanik.com";
const ADMIN_EMAIL = "bloombybotanik@gmail.com";
const HAS_BUILD = fs.existsSync(path.join(process.cwd(), "dist", "index.html"));
const IS_PROD = process.env.NODE_ENV === "production" && HAS_BUILD;

const isCanonicalHost = (host?: string) => {
  const h = (host || "").split(":")[0].toLowerCase();
  return h === CANONICAL_HOST || h.endsWith("." + CANONICAL_HOST);
};

const app = express();
app.disable("x-powered-by");
app.set("trust proxy", true);

/* ----------------------------------------------------------------------------
 * HEADERS SÉCURITÉ
 * -------------------------------------------------------------------------- */
if (helmet) {
  app.use(helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
    frameguard: IS_PROD ? { action: "sameorigin" } : false,
  }));
} else {
  app.use((req, res, next) => {
    res.set("X-Content-Type-Options", "nosniff");
    res.set("Referrer-Policy", "strict-origin-when-cross-origin");
    res.set("Permissions-Policy", "geolocation=(), microphone=(), camera=()");
    if (IS_PROD) res.set("X-Frame-Options", "SAMEORIGIN");
    next();
  });
}
if (compression) app.use(compression());

if (IS_PROD) {
  app.use((req, res, next) => {
    res.set("Strict-Transport-Security", "max-age=300");
    next();
  });
}

/* ----------------------------------------------------------------------------
 * NÉGOCIATION AUTOMATIQUE WEBP + CACHE IMAGE HAUTE PERFORMANCE (DEV & PROD)
 * Sert automatiquement la variante .webp (~85 Ko) pour toute image .png/.jpg/.jpeg
 * dans /images, /assets, /products, /img, /brand lorsque le navigateur supporte WebP.
 * -------------------------------------------------------------------------- */
const PUBLIC_ROOT = path.resolve(process.cwd(), "public");
const WEBP_ELIGIBLE_RE = /^\/(?:images|assets\/images|assets\/img|products|img|brand|src\/assets\/images)\/.+\.(?:png|jpe?g)$|^\/BloomLab_rosemary_infusion\.png$/i;

function webpNegotiationMiddleware(req: express.Request, res: express.Response, next: express.NextFunction) {
  if (req.method !== "GET" && req.method !== "HEAD") return next();
  const reqPath = req.path;
  if (!WEBP_ELIGIBLE_RE.test(reqPath)) return next();
  const lowPath = reqPath.toLowerCase();
  if (lowPath.includes("/og/") || lowPath.includes("favicon") || lowPath.includes("apple-touch-icon")) {
    return next();
  }

  let decodedPath: string;
  try {
    decodedPath = decodeURIComponent(reqPath);
  } catch {
    return next();
  }
  const relPath = decodedPath.replace(/^\/+/, "");
  const absOrig = path.resolve(PUBLIC_ROOT, relPath);
  if (!absOrig.startsWith(PUBLIC_ROOT + path.sep)) return next();

  const accept = String(req.headers.accept || "").toLowerCase();
  res.setHeader("Vary", "Accept");
  res.setHeader("Cache-Control", "public, max-age=604800, stale-while-revalidate=86400");

  if (accept.includes("image/webp")) {
    const absWebp = absOrig.replace(/\.(png|jpe?g)$/i, ".webp");
    if (absWebp.startsWith(PUBLIC_ROOT + path.sep) && fs.existsSync(absWebp)) {
      res.setHeader("Content-Type", "image/webp");
      return res.sendFile(absWebp);
    }
  }
  return next();
}

app.use(webpNegotiationMiddleware);

/* ----------------------------------------------------------------------------
 * RATE LIMITING maison
 * -------------------------------------------------------------------------- */
const createRateLimiter = (windowMs: number, max: number) => {
  const hits = new Map<string, { count: number; reset: number }>();
  return (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const key = req.ip || "unknown";
    const now = Date.now();
    const entry = hits.get(key);
    if (!entry || now > entry.reset) {
      hits.set(key, { count: 1, reset: now + windowMs });
      return next();
    }
    entry.count++;
    if (entry.count > max) {
      res.set("Retry-After", String(Math.ceil((entry.reset - now) / 1000)));
      return res.status(429).json({ error: "Trop de requêtes. Réessayez plus tard." });
    }
    next();
  };
};

/* ----------------------------------------------------------------------------
 * FIREBASE ADMIN (lazy)
 * -------------------------------------------------------------------------- */
let db: Firestore | null = null;
async function ensureFirebaseAdminApp() {
  const { initializeApp, getApps, cert, applicationDefault } = await import("firebase-admin/app");
  if (!getApps().length) {
    const projectId = process.env.FIREBASE_PROJECT_ID || "ai-studio-bloombybotanik";
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");
    if (clientEmail && privateKey) {
      initializeApp({ credential: cert({ projectId, clientEmail, privateKey }), projectId });
    } else {
      try { initializeApp({ credential: applicationDefault(), projectId }); }
      catch { initializeApp({ projectId }); }
    }
  }
}

async function getDb(): Promise<Firestore> {
  if (!db) {
    await ensureFirebaseAdminApp();
    const { getFirestore } = await import("firebase-admin/firestore");
    db = getFirestore();
  }
  return db;
}

async function requireAdmin(req: express.Request, res: express.Response, next: express.NextFunction) {
  const header = req.get("authorization") || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) return res.status(401).json({ error: "Authentification requise" });
  try {
    await ensureFirebaseAdminApp();
    const { getAuth } = await import("firebase-admin/auth");
    const decoded = await getAuth().verifyIdToken(token);
    if (decoded.email !== ADMIN_EMAIL) return res.status(403).json({ error: "Accès interdit" });
    next();
  } catch {
    return res.status(401).json({ error: "Token invalide" });
  }
}

/* ----------------------------------------------------------------------------
 * STRIPE / SMTP / GEMINI (lazy singletons)
 * -------------------------------------------------------------------------- */
let stripeInstance: Stripe | null = null;
const getStripe = async (): Promise<Stripe> => {
  if (!stripeInstance) {
    const apiKey = process.env.STRIPE_SECRET_KEY;
    if (!apiKey) throw new Error("STRIPE_SECRET_KEY is missing");
    const { default: StripeCtor } = await import("stripe");
    stripeInstance = new StripeCtor(apiKey, { apiVersion: "2023-10-16" as any });
  }
  return stripeInstance;
};

let transporterInstance: any = null;
const getTransporter = async () => {
  if (!transporterInstance) {
    const nodemailer = (await import("nodemailer")).default;
    transporterInstance = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: process.env.SMTP_SECURE === "true",
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });
  }
  return transporterInstance;
};

const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-1.5-flash";
let aiInstance: any = null;
const getAi = async () => {
  if (!aiInstance) {
    const apiKey = process.env.GEMINI_API_KEY || "";
    if (!apiKey) throw new Error("GEMINI_API_KEY is missing");
    const { GoogleGenAI } = await import("@google/genai");
    aiInstance = new GoogleGenAI({
      apiKey,
      httpOptions: { headers: { "User-Agent": "aistudio-build" } },
    });
  }
  return aiInstance;
};

let ssrModulesCache: {
  renderRecipePageHtml: any;
  renderCategoryPageHtml: any;
  renderHubPageHtml: any;
  renderHerbierRecipePageHtml: any;
  renderHerbierCategoryPageHtml: any;
  getRecipeByPath: any;
  getHerbierRecipeByPath: any;
  blogPosts: any[];
} | null = null;
let ssrModulesPromise: Promise<typeof ssrModulesCache> | null = null;

function ensureSsrModules() {
  if (ssrModulesCache) return Promise.resolve(ssrModulesCache);
  if (!ssrModulesPromise) {
    ssrModulesPromise = Promise.all([
      import("./src/server/recipeSsrRenderer"),
      import("./src/server/herbierRecipeSsrRenderer"),
      import("./src/data/canonicalRecipesRegistry"),
      import("./src/data/herbierRecipesRegistry"),
      import("./src/data/blogPosts"),
    ]).then(([recipeSsr, herbierSsr, canonicalReg, herbierReg, blogMod]) => {
      ssrModulesCache = {
        renderRecipePageHtml: recipeSsr.renderRecipePageHtml,
        renderCategoryPageHtml: recipeSsr.renderCategoryPageHtml,
        renderHubPageHtml: recipeSsr.renderHubPageHtml,
        renderHerbierRecipePageHtml: herbierSsr.renderHerbierRecipePageHtml,
        renderHerbierCategoryPageHtml: herbierSsr.renderHerbierCategoryPageHtml,
        getRecipeByPath: canonicalReg.getRecipeByPath,
        getHerbierRecipeByPath: herbierReg.getHerbierRecipeByPath,
        blogPosts: blogMod.blogPosts || [],
      };
      return ssrModulesCache;
    }).catch((err) => {
      console.error("[SSR Modules] load error:", err);
      ssrModulesPromise = null;
      return null;
    });
  }
  return ssrModulesPromise;
}

const lazyUploadInvoice: express.RequestHandler = async (req, res, next) => {
  const { default: multer } = await import("multer");
  const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 },
  });
  return (upload.single("invoice") as any)(req, res, next);
};

/* ----------------------------------------------------------------------------
 * SANTÉ & DEBUG
 * -------------------------------------------------------------------------- */
app.get(["/api/health", "/health"], (req, res) =>
  res.json({
    status: "ok",
    service: "Bloom by BotaniK Server",
    timestamp: new Date().toISOString(),
    uptime: Math.round(process.uptime()),
    nodeEnv: process.env.NODE_ENV || "development",
  })
);

app.get("/api/debug/status", (req, res) => {
  if (IS_PROD) return res.status(403).json({ error: "Forbidden" });
  res.json({
    status: "ok",
    environment: process.env.NODE_ENV || "development",
    uptimeSeconds: Math.round(process.uptime()),
    memoryUsage: process.memoryUsage(),
    configuredServices: {
      gemini: !!process.env.GEMINI_API_KEY,
      firebase: !!process.env.FIREBASE_PROJECT_ID,
      stripe: !!process.env.STRIPE_SECRET_KEY,
      brevo: !!process.env.BREVO_API_KEY,
      paypal: !!process.env.PAYPAL_CLIENT_ID,
      smtp: !!(process.env.SMTP_USER && process.env.SMTP_PASS),
    },
  });
});

/* ----------------------------------------------------------------------------
 * CORS
 * -------------------------------------------------------------------------- */
const allowedOrigins = [
  "https://bloombybotanik.com",
  "https://www.bloombybotanik.com",
  "http://localhost:3000",
  "http://127.0.0.1:3000",
];
app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (
      allowedOrigins.includes(origin) ||
      origin.endsWith(".bloombybotanik.com") ||
      origin.includes(".run.app") ||
      origin.includes("localhost")
    ) return callback(null, true);
    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
}));

/* ----------------------------------------------------------------------------
 * WEBHOOK STRIPE — RAW AVANT express.json
 * -------------------------------------------------------------------------- */
app.post("/api/webhooks/stripe", express.raw({ type: "application/json" }), async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event: Stripe.Event;
  try {
    event = (await getStripe()).webhooks.constructEvent(req.body, sig as string, process.env.STRIPE_WEBHOOK_SECRET || "");
  } catch (err: any) {
    console.error(`[Stripe Webhook] Signature verification failed: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
  try {
    if (event.type === "payment_intent.succeeded" || event.type === "checkout.session.completed") {
      const obj: any = event.data.object;
      const orderId = obj.metadata?.orderId;
      if (orderId) {
        const orderDoc = await (await getDb()).collection("orders").doc(orderId).get();
        if (orderDoc.exists) await handleSuccessfulPayment(orderDoc.data(), orderId);
      }
    }
  } catch (err) {
    console.error("[Stripe Webhook] handling error:", err);
  }
  res.json({ received: true });
});

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

/* ----------------------------------------------------------------------------
 * MIDDLEWARE CANONIQUE & SEO (PRODUCTION)
 * -------------------------------------------------------------------------- */
if (IS_PROD) {
  app.use((req, res, next) => {
    const host = req.get("host") || "";
    if (!isCanonicalHost(host)) return next();
    const proto = (req.get("x-forwarded-proto") || req.protocol).split(",")[0].trim();
    if (host.startsWith("www.")) {
      res.set("Cache-Control", "no-store");
      return res.redirect(301, `https://${CANONICAL_HOST}${req.originalUrl}`);
    }
    if (proto === "http") {
      res.set("Cache-Control", "no-store");
      return res.redirect(301, `https://${CANONICAL_HOST}${req.originalUrl}`);
    }
    next();
  });

  app.use((req, res, next) => {
    if (req.method !== "GET") return next();
    const urlPath = req.path;
    const lower = urlPath.toLowerCase();
    if (urlPath === "/") return next();
    if (urlPath.includes(".")) return next();
    if (
      urlPath.startsWith("/api") || urlPath.startsWith("/webhooks") ||
      urlPath.startsWith("/stripe-webhook") || urlPath.startsWith("/paypal-webhook") ||
      urlPath.startsWith("/@vite") || urlPath.startsWith("/@fs") || urlPath.startsWith("/@id") ||
      urlPath.startsWith("/node_modules") || urlPath.includes("/node_modules/") ||
      lower.includes("vite") || lower.includes("hmr") ||
      lower.includes(".mjs") || lower.includes(".js") || lower.includes(".ts") ||
      urlPath.startsWith("/assets") || urlPath.startsWith("/images") ||
      urlPath.startsWith("/img") || urlPath.startsWith("/products")
    ) return next();
    const staticFiles = [
      "/favicon.ico", "/favicon-", "/robots.txt",
      "/sitemap.xml", "/sitemap-recettes.xml", "/sitemap-images.xml", "/sitemap-fr.xml", "/sitemap-en.xml", "/sitemap-de.xml",
      "/site.webmanifest", "/manifest.webmanifest", "/apple-touch-icon", "/feed/",
    ];
    if (staticFiles.some((f) => lower.includes(f))) return next();
    if (/\.[a-z0-9]{2,5}$/i.test(urlPath)) return next();
    const accept = req.get("accept") || "";
    if (accept && !accept.includes("text/html") && !accept.includes("*/*")) return next();
    if (!isCanonicalHost(req.get("host") || "")) return next();
    if (!urlPath.endsWith("/") && /^\/([a-z0-9_-]+\/)*[a-z0-9_-]+$/i.test(urlPath)) {
      const query = req.url.slice(urlPath.length);
      res.set("Cache-Control", "no-store");
      return res.redirect(301, urlPath + "/" + query);
    }
    next();
  });

  app.use((req, res, next) => {
    if (/\.(cjs|map)$/i.test(req.path)) return res.status(404).end();
    next();
  });
}

/* ----------------------------------------------------------------------------
 * ALMA — INSTRUCTION SYSTÈME
 * -------------------------------------------------------------------------- */
const BOT_SYSTEM_INSTRUCTION = `Tu es ALMA, l’assistante de Bloom by Botanik.
Ta mission : accueillir l’utilisateur, conduire une anamnèse conversationnelle, identifier son profil systémique dominant, répondre aux questions techniques sur l'extraction et accompagner l'utilisateur dans ses dosages.

PHRASE FONDATRICE : "L'Ingénierie au service du vivant."

RÈGLES D'OR :
1. Tu ne poses JAMAIS plusieurs questions à la fois. UNE seule question, tu attends la réponse avant de poursuivre.
2. Tu valides d’abord le vécu de la personne en une phrase courte et empathique, puis tu expliques ou poses la question suivante.
3. Ton ton est bienveillant, clair, rassurant, structuré, non médical, non prescriptif.
4. Tu ne promets jamais de guérison. Tu n'invites jamais à arrêter un traitement médical.
5. Vocabulaire à privilégier : reset homéostatique, dimension, terrain, chef d’orchestre, pharmacie intérieure, libérer.
6. Vocabulaire interdit : guérir, soigner, traiter une maladie, remplacer un médecin.

INVENTAIRE ET RECOMMANDATIONS :
Tes recommandations de plantes doivent OBLIGATOIREMENT être puisées dans cet inventaire réel :
- Prêle Bio, Thym Bio, Valériane Bio, Passiflore Bio, Reine des Prés Bio, Gingembre Bio, Girofle Bio, Sureau Bio, Romarin Bio, Racine d'Ortie Piquante Bio, Boswellia (résine), Ginkgo Biloba, Brou de Noix.

QUALITÉ ET BIODISPONIBILITÉ BOTANIQUE :
Rassure systématiquement sur la qualité Bloom via ces 4 critères :
1. Sourcing certifié Bio.
2. Ramassage à la main respectueux.
3. Séchage à très basse température (préservation des composés sensibles).
4. Pureté et traçabilité d'herboristerie.

STRATÉGIE COMMERCIALE :
Propose systématiquement deux options d'achat :
- Option A : Le "Trio Apothicaire" (3 sachets de plantes complémentaires).
- Option B : Sachets de plantes individuels.

COMPLÉMENT MINÉRAL :
En complément des préparations végétales, tu peux mentionner le "Duo Argiles Bloom — Zéolithe & Bentonite 6 µm" comme argiles minérales ventilées pour les préparations externes ou d'herboristerie traditionnelle, sans aucune allégation de détoxification, de drainage d'émonctoires ou de chélation interne.

MODULE D'EXPERTISE EN EXTRACTION (CALCULATEUR ET RÉGLAGES BLOOMLAB®) :
Si l'utilisateur interroge sur une extraction, un calcul de degré alcoolique ou un réglage machine :
1. Demande-lui systématiquement :
   - Le volume final souhaité (en ml),
   - Le titre de son alcool de départ (par défaut 96° s'il ne le précise pas ; accepte aussi 95°, 90°, 75° / 150 US proof, 70°),
   - La plante visée (ou le degré cible souhaité parmi : 45° fleurs/feuilles tendres, 55° sommités aromatiques, 60° plantes semi-denses, 70° racines denses/écorces/champignons/alcaloïdes, 75° exemple fort du manuel, 90–96° résines pures sans eau).
2. Une fois ces valeurs reçues, calcule et affiche les dosages exacts selon la formule linéaire :
   - V_alcool (ml) = V_final × (C_cible / C_depart)
   - V_eau (ml) = V_final − V_alcool
   - Rappel US Proof (pour les utilisateurs anglophones du manuel) : Proof = 2 × % vol. (ex. 150 proof = 75°).
   - Précise toujours que ce calcul linéaire sert de repère pratique (contraction de volume éthanol/eau d'environ 2 à 3 % en mélange réel ; compléter si besoin jusqu'au volume final).
3. Rappelle fidèlement les réglages et précautions du manuel BloomLab® :
   - 6 programmes prédéfinis : Butter (71 °C / 2h), Oil (71 °C / 1h), Tincture (160 °F / 71 °C et 4h par défaut), Sans chauffe (fonction à température non réglable réservée aux mélanges froids type vinaigrette, jamais utilisée pour nos extractions), Activation thermique douce des résines et aromates (121 °C / 1h30 par défaut, 71–121 °C et 30 min–4h + 15 min de refroidissement), Nettoyage (5 min fixe, non réglable).
   - Mode manuel TEMP/TIME (+ / -) disponible de 0 °C à 121 °C et 30 min à 12h sur les modes réglables : les valeurs de Tincture (71 °C / 4h) sont donc un point de départ modifiable librement selon les besoins de la plante ; la minuterie démarre une fois la température cible atteinte.
   - RÈGLE DE SÉCURITÉ ALCOOL (données INRS & manuel) : le risque d'inflammation ne vient pas de l'ébullition (78 °C). L'éthanol pur a un point d'éclair de 13 °C (21 °C à 70 %, 49 °C à 10 %) : à 50 °C comme à 71 °C, les vapeurs sont déjà inflammables et la pression de vapeur augmente avec la chaleur. Travailler impérativement dans une pièce très bien ventilée, sans aucune flamme, cigarette ou source d'ignition, couvercle verrouillé, en respectant les repères MIN et MAX (et sans inventer de seuil arbitraire « max 60 °C » non présent dans les documents fabricant), et ne jamais laisser l'appareil sans surveillance en fonctionnement ni lorsqu'il est branché. L'exemple chauffé du manuel « Tincture » emploie un alcool ≥ 75 % vol. (150 proof) avec la consigne « Ne pas ajouter d'eau ni de lécithine » : pour une dilution hydro-alcoolique contenant de l'eau (45°–70°), utiliser un bocal hermétique hors appareil à l'abri de la chaleur et de toute flamme (ne pas chauffer d'alcool dilué à l'eau dans BloomLab®). En extraction A/B, toujours vider, nettoyer et sécher intégralement la cuve avant la Phase B.
   - RÈGLE RÉGLEMENTAIRE (Règlement CE n° 1924/2006) : ne formuler aucune allégation de santé non autorisée sur les plantes ou compléments (éviter « contribue au confort articulaire », « favorise la détente », « soutient la digestion », « sommeil réparateur », etc.) ; s'en tenir à l'usage botanique/traditionnel documenté et aux fiches de l'app.

SÉCURITÉ ABSOLUE (PLANTES TOXIQUES) :
Il est FORMELLEMENT INTERDIT de suggérer, vendre ou fournir un protocole pour des plantes toxiques ou dangereuses.
Liste noire non exhaustive : Absinthe, Aconit, Belladone, Digitale, Jusquiame, Datura, Ricin, Colchique, Hellébore, If, etc.
Réponds avec fermeté et bienveillance que Bloom se concentre exclusivement sur les plantes sécuritaires.

DÉROULÉ GÉNÉRAL :
- Accueil et Questionnaire (15 questions max, une par une).
- Analyse du profil.
- Présentation des offres dans cet ordre : 1. Bloom Lab, 2. Bloom Complet, 3. Essentiel.
- Recommandation finale orientée vers Bloom Complet (59€/mois).

SCHEMA DE RÉPONSE JSON :
Tu dois impérativement répondre au format JSON :
{
  "answer": "Ta réponse visible par l'utilisateur",
  "concern": {
    "mainConcern": "Résumé du besoin",
    "category": "dosage|sécurité|légalité|mode d'emploi|performance|prix|logistique|site web/UX|contenu/recettes|assistant|autre",
    "severity": "faible|moyenne|élevée",
    "emotion": "curiosité|enthousiasme|inquiétude|frustration|colère|déception|neutre",
    "productArea": "BloomLab|kits|recettes|livres/guides|site/panier|service client|assistant|autre",
    "suggestedImprovement": "Idée d'amélioration",
    "recurrenceHint": "probablement récurrente|cas isolé|inconnu"
  }
}`;

/* ----------------------------------------------------------------------------
 * PRIX & LIVRAISON
 * -------------------------------------------------------------------------- */
const PRODUCT_PRICES: Record<string, number> = {
  "bloomlab": 229.00,
  "bundle-apothicaire": 59.00,
  "pack-signature": 289.00,
  "kit-starter": 12.90,
  "kit-nuit": 9.90,
  "kit-digestion": 9.90,
  "kit-articulaire": 9.90,
  "kit-hiver": 9.90,
  "kit-reset": 44.90,
  "premium-access": 9.00,
  "freemium-access": 0.00,
};

const getShippingPrice = (method: string, cart: any[]): number => {
  const hasBloomLab = cart.some((i) => i.id === "bloomlab");
  const sachetCount = cart
    .filter((i) => !i.isDigital && i.id !== "bloomlab")
    .reduce((sum, i) => sum + (i.quantity || 1), 0);
  if (hasBloomLab) {
    switch (method) {
      case "mondialrelay": return 7.90;
      case "colissimo": return 12.90;
      case "laposte": return 5.90;
      case "express": return 21.90;
      default: return 7.90;
    }
  }
  switch (method) {
    case "mondialrelay": return sachetCount >= 3 ? 0 : 3.90;
    case "colissimo": return sachetCount >= 3 ? 0 : 4.90;
    case "laposte": return 5.90;
    case "express": return 21.90;
    default: return 3.90;
  }
};

/* ----------------------------------------------------------------------------
 * BREVO CRM
 * -------------------------------------------------------------------------- */
async function notifyOrderToBrevo(orderData: { email: string; customerName: string; items: any[]; total: number }) {
  const BREVO_API_KEY = process.env.BREVO_API_KEY;
  if (!BREVO_API_KEY) return;
  const mainProduct = orderData.items[0]?.name || "Produit Bloom";
  const payload = {
    event: "order_completed",
    email: orderData.email,
    properties: {
      FIRSTNAME: orderData.customerName.split(" ")[0],
      PRODUCT_NAME: mainProduct,
      REVIEW_URL: "https://bloombybotanik.com/boutique",
      ORDER_TOTAL: orderData.total,
    },
  };
  try {
    const response = await fetch("https://api.brevo.com/v3/event", {
      method: "POST",
      headers: { accept: "application/json", "api-key": BREVO_API_KEY, "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (response.ok) console.log(`[CRM] Commande synchronisée : ${orderData.email}`);
    else console.error(`[CRM] Erreur Brevo (${response.status}):`, await response.text());
  } catch (error) {
    console.error("[CRM] Erreur synchronisation Brevo:", error);
  }
}

/* ----------------------------------------------------------------------------
 * FACTURE PDF & PAIEMENT
 * -------------------------------------------------------------------------- */
async function generateInvoicePDF(order: any, orderId: string) {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF();
  doc.setFontSize(22); doc.setTextColor(27, 48, 34);
  doc.text("Bloom by BotaniK", 20, 20);
  doc.setFontSize(10); doc.setTextColor(100);
  doc.text("L'Ingénierie au service du vivant", 20, 27);
  doc.setFontSize(14); doc.setTextColor(0);
  doc.text(`FACTURE: ${orderId}`, 140, 20);
  doc.text(`Date: ${new Date().toLocaleDateString("fr-FR")}`, 140, 30);
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold"); doc.text("Vendu par:", 20, 45);
  doc.setFont("helvetica", "normal");
  doc.text("BotaniK Labs", 20, 52); doc.text("France", 20, 59);
  doc.setFont("helvetica", "bold"); doc.text("Facturé à:", 120, 45);
  doc.setFont("helvetica", "normal");
  doc.text(order.customerName || "Client Bloom", 120, 52);
  doc.text(order.email || "", 120, 59);
  doc.text(order.address || "", 120, 66);
  let y = 85;
  doc.setFont("helvetica", "bold");
  doc.text("Produit", 20, y); doc.text("Qté", 120, y); doc.text("Prix Unit.", 140, y); doc.text("Total", 170, y);
  doc.line(20, y + 2, 190, y + 2); y += 10;
  doc.setFont("helvetica", "normal");
  (order.items || []).forEach((item: any) => {
    doc.text(String(item.name), 20, y);
    doc.text(String(item.quantity), 120, y);
    doc.text(`${Number(item.price).toFixed(2)} €`, 140, y);
    doc.text(`${(Number(item.price) * Number(item.quantity)).toFixed(2)} €`, 170, y);
    y += 8;
  });
  y += 5;
  doc.line(120, y, 190, y); y += 10;
  doc.text("Sous-total:", 120, y);
  doc.text(`${(Number(order.total) - Number(order.shippingPrice)).toFixed(2)} €`, 170, y);
  y += 8;
  doc.text("Livraison:", 120, y);
  doc.text(`${Number(order.shippingPrice).toFixed(2)} €`, 170, y);
  y += 10;
  doc.setFontSize(14); doc.setFont("helvetica", "bold");
  doc.text("TOTAL:", 120, y);
  doc.text(`${Number(order.total).toFixed(2)} €`, 170, y);
  doc.setFontSize(10); doc.setFont("helvetica", "italic");
  doc.text("Merci de votre confiance. Faites fleurir votre bien-être.", 20, 270);
  doc.text("Facture acquittée - Paiement sécurisé via Stripe", 20, 277);
  return Buffer.from(doc.output("arraybuffer"));
}

async function handleSuccessfulPayment(orderData: any, orderId: string) {
  const firestore = await getDb();
  await firestore.collection("orders").doc(orderId).update({
    status: "paid",
    updatedAt: new Date().toISOString(),
  });
  const userRef = firestore.collection("users").doc(orderData.userId);
  const premiumUntil = new Date();
  premiumUntil.setMonth(premiumUntil.getMonth() + 1);
  await userRef.set({
    status: "premium",
    isPremiumUntil: premiumUntil.toISOString(),
    updatedAt: new Date().toISOString(),
  }, { merge: true });

  const pdfBuffer = await generateInvoicePDF(orderData, orderId);
  const transporter = await getTransporter();

  await Promise.allSettled([
    transporter.sendMail({
      from: `"Bloom by BotaniK" <${process.env.SMTP_USER}>`,
      to: orderData.email,
      subject: `Confirmation de votre commande ${orderId} - Bloom by BotaniK`,
      text: `Bonjour,\n\nMerci pour votre confiance ! Votre commande ${orderId} est bien validée.\n\nVous trouverez votre facture en pièce jointe.\n\nCADEAU : votre accès Premium d'un mois est activé (3 bibliothèques : Atelier Culinaire, Soin Cosmétique, Reset Homéostasique).\n\nL'équipe Bloom`,
      attachments: [{ filename: `Facture-${orderId}.pdf`, content: pdfBuffer }],
    }),
    transporter.sendMail({
      from: `"Système de Commande" <${process.env.SMTP_USER}>`,
      to: ADMIN_EMAIL,
      subject: `URGENT - NOUVELLE COMMANDE ${orderId}`,
      text: `Client : ${orderData.customerName} (${orderData.email})\nID : ${orderId}\nTotal : ${Number(orderData.total).toFixed(2)} €\nLivraison : ${orderData.shippingMethod}\nAdresse : ${orderData.address}\n\nItems :\n${(orderData.items || []).map((i: any) => `- ${i.name} x${i.quantity}`).join("\n")}\n\nAction requise : préparer l'expédition.`,
      attachments: [{ filename: `Facture-${orderId}.pdf`, content: pdfBuffer }],
    }),
    notifyOrderToBrevo(orderData),
  ]);
}

/* ----------------------------------------------------------------------------
 * ROUTES APPLICATIVES
 * -------------------------------------------------------------------------- */
function registerAppRoutes(app: express.Express) {
  /* --- Statiques & favicon --- */
  app.get("/favicon.ico", (req, res) => {
    const p = path.join(process.cwd(), "public", "favicon.ico");
    if (fs.existsSync(p)) {
      res.setHeader("Content-Type", "image/x-icon");
      res.setHeader("Cache-Control", "public, max-age=86400, s-maxage=604800");
      return res.sendFile(p);
    }
    res.status(404).end();
  });
  app.get(["/apple-touch-icon.png", "/favicon-48x48.png", "/favicon-96x96.png", "/favicon-192x192.png"], (req, res) => {
    const p = path.join(process.cwd(), "public", path.basename(req.path));
    if (fs.existsSync(p)) {
      res.setHeader("Content-Type", "image/png");
      res.setHeader("Cache-Control", "public, max-age=86400, s-maxage=604800");
      return res.sendFile(p);
    }
    res.status(404).end();
  });

  const distAssets = path.join(process.cwd(), "dist", "assets");
  if (fs.existsSync(distAssets)) {
    app.use("/assets", express.static(distAssets, { maxAge: "1y", immutable: true }));
  }
  app.use("/assets", express.static(path.join(process.cwd(), "public", "assets"), { maxAge: "7d", immutable: true }));
  app.use("/images", express.static(path.join(process.cwd(), "public", "images"), { maxAge: "7d" }));
  app.use("/img", express.static(path.join(process.cwd(), "public", "img"), { maxAge: "30d" }));
  app.use("/products", express.static(path.join(process.cwd(), "public", "products"), { maxAge: "30d" }));
  app.get(["/blog/vieillissement-myeline-fgf17.html", "/blog/vieillissement-myeline-fgf17/index.html", "/blog/vieillissement-myeline-fgf17-clarte-mentale.html"], (req, res) => {
    res.set("Cache-Control", "no-store");
    res.redirect(301, "/blog/vieillissement-myeline-fgf17-clarte-mentale/");
  });
  app.get(["/protocoles/clarte-mentale.html", "/protocoles/myeline.html", "/protocoles/myeline/index.html"], (req, res) => {
    res.set("Cache-Control", "no-store");
    res.redirect(301, "/academie/protocoles/clarte-mentale/");
  });

  app.use(express.static(path.join(process.cwd(), "public"), { maxAge: "1d", index: false }));

  // [AI STUDIO FIX] Intercepter les requêtes upload d'assets pour éviter les erreurs 404 en console
  app.use((req, res, next) => {
    if (req.path.startsWith('/upload/') || req.path.includes('/upload/')) {
      const fallback = path.join(process.cwd(), "public", "images", "logo_sidebar_1784886108085.png");
      if (fs.existsSync(fallback)) {
        res.setHeader("Content-Type", "image/png");
        res.setHeader("Cache-Control", "public, max-age=86400");
        return res.sendFile(fallback);
      }
      return res.status(204).end();
    }
    next();
  });

  /* --- Sitemaps & robots & feed --- */
  app.get("/sitemap.xml", (req, res) => { res.header("Content-Type", "application/xml"); res.sendFile(path.join(process.cwd(), "public", "sitemap.xml")); });
  app.get("/sitemap-recettes.xml", (req, res) => { res.header("Content-Type", "application/xml"); res.sendFile(path.join(process.cwd(), "public", "sitemap-recettes.xml")); });
  app.get("/sitemap-images.xml", (req, res) => { res.header("Content-Type", "application/xml"); res.sendFile(path.join(process.cwd(), "public", "sitemap-images.xml")); });
  app.get("/sitemap-fr.xml", (req, res) => { res.header("Content-Type", "application/xml"); res.sendFile(path.join(process.cwd(), "public", "sitemap-fr.xml")); });
  app.get("/sitemap-en.xml", (req, res) => { res.header("Content-Type", "application/xml"); res.sendFile(path.join(process.cwd(), "public", "sitemap-en.xml")); });
  app.get("/sitemap-de.xml", (req, res) => { res.header("Content-Type", "application/xml"); res.sendFile(path.join(process.cwd(), "public", "sitemap-de.xml")); });
  app.get("/robots.txt", (req, res) => { res.header("Content-Type", "text/plain"); res.sendFile(path.join(process.cwd(), "public", "robots.txt")); });
  app.get("/feed/google-merchant.xml", (req, res) => {
    res.header("Content-Type", "application/xml; charset=utf-8");
    res.header("Cache-Control", "public, max-age=3600");
    res.sendFile(path.join(process.cwd(), "public", "feed", "google-merchant.xml"));
  });

  /* --- REDIRECTIONS 301 (MASSIVE MERGE) --- */
  const redirects301: Record<string, string> = {
    "/bloomlab-extracteur-botanique-et-infuseur-dhuile-intelligent-6-en-1": "/bloomlab/",
    "/boutique/bloomlab": "/bloomlab/",
    "/produit/bloomlab": "/bloomlab/",
    "/infuseur-botanique": "/bloomlab/",
    "/guide-complet-extraction-botanique-maison": "/extraction-botanique/",
    "/remedes-naturels-maison-guide": "/remedes-naturels/",
    "/retours-et-remboursements": "/retour-et-remboursement/",
    "/tisane-bain-marie-bloomlab-quelle-methode-pour-extraire-vraiment-les-bienfaits-de-vos-plantes-spoiler-la-difference-est-de-1-a-98": "/blog/tisane-bain-marie-bloomlab-quelle-methode-pour-extraire-vraiment-les-bienfaits-de-vos-plantes-spoiler-la-difference-est-de-1-a-98/",
    "/chroniques": "/blog/",
    "/qu-est-ce-que-l-infusion-botanique": "/infusion-botanique-maison-comment-ca-marche/",
    "/atelier-culinaire": "/gastronomie-botanique/",
    "/recettes-culinaires": "/recettes/culinaires/",
    "/recettes-cosmetiques": "/recettes/cosmetiques/",
    "/recettes-parcours": "/recettes/parcours-botaniques/",
    "/recettes/01": "/recettes/culinaires/infusion-sommeil-profond/",
    "/recettes/02": "/recettes/cosmetiques/huile-massage-articulaire/",
    "/recettes/03": "/recettes/cosmetiques/serum-visage-eclat-botanique/",
    "/recettes/04": "/recettes/cosmetiques/baume-levres-calendula/",
    "/recettes/05": "/recettes/parcours-botaniques/teinture-propolis-maison/",
    "/recettes/06": "/recettes/culinaires/sirop-sureau-immunite/",
    "/recettes/07": "/recettes/parcours-botaniques/decoction-detox-soutien-hepatique/",
    "/recettes/08": "/recettes/parcours-botaniques/elixir-regulateur-metabolique/",
    "/recettes/09": "/recettes/culinaires/infusion-drainage-elimination/",
    "/recettes/10": "/recettes/parcours-botaniques/remede-psoriasis-emonctoires-regulation/",
    "/recettes/11": "/recettes/parcours-botaniques/remede-eczema-desamorcage-histaminique/",
    "/recettes/12": "/recettes/cosmetiques/soin-alopecie-anti-dht-matrice-folliculaire/",
    "/cosmetique-botanique": "/cosmetiques-naturels-diy/",
    "/indexbis": "/",
    "/about": "/manifeste/",
    "/how-it-works-diy-natural-recipes": "/boutique/",
    "/natural-herbal-infusion-body-care-oils-": "/cosmetiques-naturels-diy/",
    "/natural-herbal-infusion-face-skincare-recipes": "/cosmetiques-naturels-diy/",
    "/extraction-plantes-naturelles-bienfaits": "/extraction-botanique/",
    "/extraction-botanique-guide-complet": "/extraction-botanique/",
    "/machine": "/bloomlab/",
    "/herbier": "/academie/herbier/",
    "/bibliotheque": "/academie/bibliotheque/",
    "/bibliotheque-savoirs": "/academie/bibliotheque/",
    "/boutique/kit-reset": "/boutique/duo-argiles/",
    "/boutique/seve-fondamentale": "/boutique/kit-starter/",
    "/boutique/nuit-profonde": "/boutique/kit-nuit/",
    "/boutique/confort-digestif": "/boutique/kit-digestion/",
    "/boutique/digestion": "/boutique/kit-digestion/",
    "/boutique/feu-articulaire": "/boutique/kit-articulaire/",
    "/boutique/bouclier-hiver": "/boutique/kit-hiver/",
    "/boutique/kit-bouclier-hiver": "/boutique/kit-hiver/",
    "/boutique/herbier-complet-rentree-2026": "/boutique/bundle-apothicaire/",
    "/shop": "/boutique/",
    "/products": "/boutique/",
    "/herboristerie": "/academie/herbier/",
    "/phytotherapie": "/academie/reset-homeostasique/",
    "/phytotherapie-reset": "/academie/reset-homeostasique/",
    "/phytotherapie-reset/protocole-psoriasis": "/academie/protocoles/psoriasis/",
    "/phytotherapie-reset/protocole-sibo": "/academie/protocoles/sibo/",
    "/phytotherapie-reset/protocole-myeline": "/academie/protocoles/clarte-mentale/",
    "/protocoles/psoriasis": "/academie/protocoles/psoriasis/",
    "/protocoles/sibo": "/academie/protocoles/sibo/",
    "/protocoles/clarte-mentale": "/academie/protocoles/clarte-mentale/",
    "/protocoles/clarte-mentale/": "/academie/protocoles/clarte-mentale/",
    "/academie/comprendre-le-corps/comment-lire-le-modele-bloom": "/academie/comprendre-le-modele-bloom/",
    "/abonnement": "/bloomlab/",
    "/abonnements-numeriques": "/bloomlab/",
    "/boutique/abonnements-numeriques": "/bloomlab/",
    "/herbier/phytotherapie": "/academie/reset-homeostasique/",
    "/herbier/phytotherapie/": "/academie/reset-homeostasique/",
    "/herbier/therapeutic": "/academie/reset-homeostasique/",
    "/herbier/therapeutic/": "/academie/reset-homeostasique/",
    "/herbier/cosmetique": "/cosmetiques-naturels-diy/",
    "/herbier/cosmetique/": "/cosmetiques-naturels-diy/",
    "/herbier/cosmetiques": "/cosmetiques-naturels-diy/",
    "/herbier/cosmetiques/": "/cosmetiques-naturels-diy/",
    "/herbier/culinaire": "/gastronomie-botanique/",
    "/herbier/culinaire/": "/gastronomie-botanique/",
    "/herbier/chaga_vitality": "/academie/herbier/chaga_vitality/",
    "/herbier/urtica_dioica": "/academie/herbier/urtica_dioica/",
    "/herbier/melissa_officinalis": "/academie/herbier/melissa_officinalis/",
    "/herbier/curcuma_longa_poivre": "/academie/herbier/curcuma_longa_poivre/",
    "/herbier/zingiber_officinale": "/academie/herbier/zingiber_officinale/",
    "/herbier/rosmarinus_officinalis": "/academie/herbier/rosmarinus_officinalis/",
    "/herbier/lavandula_angustifolia": "/academie/herbier/lavandula_angustifolia/",
    "/bibliotheque/chaga_vitality": "/academie/herbier/chaga_vitality/",
    "/bibliotheque/urtica_dioica": "/academie/herbier/urtica_dioica/",
    "/bibliotheque/melissa_officinalis": "/academie/herbier/melissa_officinalis/",
    "/bibliotheque/curcuma_longa_poivre": "/academie/herbier/curcuma_longa_poivre/",
    "/bibliotheque/zingiber_officinale": "/academie/herbier/zingiber_officinale/",
    "/bibliotheque/rosmarinus_officinalis": "/academie/herbier/rosmarinus_officinalis/",
    "/bibliotheque/lavandula_angustifolia": "/academie/herbier/lavandula_angustifolia/",
    "/bibliotheque/artichaut": "/academie/herbier/artichaut/",
    "/bibliotheque-savoirs/chaga_vitality": "/academie/herbier/chaga_vitality/",
    "/bibliotheque-savoirs/urtica_dioica": "/academie/herbier/urtica_dioica/",
    "/bibliotheque-savoirs/melissa_officinalis": "/academie/herbier/melissa_officinalis/",
    "/bibliotheque-savoirs/curcuma_longa_poivre": "/academie/herbier/curcuma_longa_poivre/",
    "/bibliotheque-savoirs/zingiber_officinale": "/academie/herbier/zingiber_officinale/",
    "/bibliotheque-savoirs/rosmarinus_officinalis": "/academie/herbier/rosmarinus_officinalis/",
    "/bibliotheque-savoirs/lavandula_angustifolia": "/academie/herbier/lavandula_angustifolia/",
    "/bibliotheque-savoirs/artichaut": "/academie/herbier/artichaut/",
    // --- Lot 1 : Recettes Herbier Prioritaires (>100 impressions GSC 90j) vers URLs canoniques ---
    "/herbier/chaga-diamant-de-la-foret": "/recettes/phytotherapie/chaga-diamant-de-la-foret/",
    "/herbier/cordyceps-l-or-de-l-himalaya": "/recettes/phytotherapie/cordyceps-l-or-de-l-himalaya/",
    "/herbier/hericium-criniere-de-lion": "/recettes/phytotherapie/hericium-criniere-de-lion/",
    "/herbier/reishi-champignon-de-l-immortalite": "/recettes/phytotherapie/reishi-champignon-de-l-immortalite/",
    "/herbier/curcuma-et-poivre-noir": "/recettes/phytotherapie/curcuma-et-poivre-noir/",
    "/herbier/boswellia-encens": "/recettes/phytotherapie/boswellia-encens/",
    "/herbier/safran": "/recettes/phytotherapie/safran/",
    "/herbier/ortie-feuille-et-racine": "/recettes/phytotherapie/ortie-feuille-et-racine/",
    "/herbier/prele-des-champs": "/recettes/phytotherapie/prele-des-champs/",
    "/herbier/gingembre": "/recettes/phytotherapie/gingembre/",
    "/herbier/scutellaire-de-baikal": "/recettes/phytotherapie/scutellaire-de-baikal/",
    "/herbier/rhodiola-rosea": "/recettes/phytotherapie/rhodiola-rosea/",
    "/herbier/griffonia": "/recettes/phytotherapie/griffonia/",
    "/herbier/gentiane-jaune": "/recettes/phytotherapie/gentiane-jaune/",
    "/herbier/radis-noir": "/recettes/phytotherapie/radis-noir/",
    "/herbier/chrysanthellum": "/recettes/phytotherapie/chrysanthellum/",
    "/herbier/desmodium": "/recettes/phytotherapie/desmodium/",
    "/herbier/bardane": "/recettes/phytotherapie/bardane/",
    "/herbier/astragale": "/recettes/phytotherapie/astragale/",
    "/herbier/eleutherocoque": "/recettes/phytotherapie/eleutherocoque/",
    "/herbier/therapeutic/chaga_vitality": "/recettes/phytotherapie/chaga-diamant-de-la-foret/",
    "/herbier/therapeutic/cordyceps_performance": "/recettes/phytotherapie/cordyceps-l-or-de-l-himalaya/",
    "/herbier/therapeutic/hericium_focus": "/recettes/phytotherapie/hericium-criniere-de-lion/",
    "/herbier/therapeutic/reishi_zen": "/recettes/phytotherapie/reishi-champignon-de-l-immortalite/",
    "/herbier/therapeutic/curcuma_longa_poivre": "/recettes/phytotherapie/curcuma-et-poivre-noir/",
    "/herbier/therapeutic/boswellia_serrata": "/recettes/phytotherapie/boswellia-encens/",
    "/herbier/therapeutic/crocus_sativus": "/recettes/phytotherapie/safran/",
    "/herbier/therapeutic/urtica_dioica": "/recettes/phytotherapie/ortie-feuille-et-racine/",
    "/herbier/therapeutic/equisetum_arvense": "/recettes/phytotherapie/prele-des-champs/",
    "/herbier/therapeutic/zingiber_officinale": "/recettes/phytotherapie/gingembre/",
    "/herbier/therapeutic/scutellaria_baicalensis": "/recettes/phytotherapie/scutellaire-de-baikal/",
    "/herbier/therapeutic/rhodiola_rosea": "/recettes/phytotherapie/rhodiola-rosea/",
    "/herbier/therapeutic/griffonia_simplicifolia": "/recettes/phytotherapie/griffonia/",
    "/herbier/therapeutic/gentiana_lutea": "/recettes/phytotherapie/gentiane-jaune/",
    "/herbier/therapeutic/raphanus_sativus_niger": "/recettes/phytotherapie/radis-noir/",
    "/herbier/therapeutic/chrysanthellum_indicum": "/recettes/phytotherapie/chrysanthellum/",
    "/herbier/therapeutic/desmodium_adscendens": "/recettes/phytotherapie/desmodium/",
    "/herbier/therapeutic/arctium_lappa": "/recettes/phytotherapie/bardane/",
    "/herbier/therapeutic/astragalus_membranaceus": "/recettes/phytotherapie/astragale/",
    "/herbier/therapeutic/eleutherococcus_senticosus": "/recettes/phytotherapie/eleutherocoque/",
    // --- Lot 2 : Phytothérapie prioritaire (Terrains T1 à T4) ---
    "/herbier/bacopa": "/recettes/phytotherapie/bacopa/",
    "/herbier/therapeutic-bacopa_monnieri": "/recettes/phytotherapie/bacopa/",
    "/herbier/therapeutic/bacopa_monnieri": "/recettes/phytotherapie/bacopa/",
    "/herbier/bacopa_monnieri": "/recettes/phytotherapie/bacopa/",
    "/herbier/chanvre-industriel-fleurs": "/recettes/phytotherapie/chanvre-industriel-fleurs/",
    "/herbier/therapeutic-cannabis_sativa_fleurs": "/recettes/phytotherapie/chanvre-industriel-fleurs/",
    "/herbier/therapeutic/cannabis_sativa_fleurs": "/recettes/phytotherapie/chanvre-industriel-fleurs/",
    "/herbier/cannabis_sativa_fleurs": "/recettes/phytotherapie/chanvre-industriel-fleurs/",
    "/herbier/plantain-majeur": "/recettes/phytotherapie/plantain-majeur/",
    "/herbier/therapeutic-plantago_major": "/recettes/phytotherapie/plantain-majeur/",
    "/herbier/therapeutic/plantago_major": "/recettes/phytotherapie/plantain-majeur/",
    "/herbier/plantago_major": "/recettes/phytotherapie/plantain-majeur/",
    "/herbier/quassia-amer": "/recettes/phytotherapie/quassia-amer/",
    "/herbier/therapeutic-picrasma_quassioides": "/recettes/phytotherapie/quassia-amer/",
    "/herbier/therapeutic/picrasma_quassioides": "/recettes/phytotherapie/quassia-amer/",
    "/herbier/picrasma_quassioides": "/recettes/phytotherapie/quassia-amer/",
    "/herbier/armoise-annuelle": "/recettes/phytotherapie/armoise-annuelle/",
    "/herbier/therapeutic-artemisia_annua": "/recettes/phytotherapie/armoise-annuelle/",
    "/herbier/therapeutic/artemisia_annua": "/recettes/phytotherapie/armoise-annuelle/",
    "/herbier/artemisia_annua": "/recettes/phytotherapie/armoise-annuelle/",
    "/herbier/nigelle": "/recettes/phytotherapie/nigelle/",
    "/herbier/therapeutic-nigella_sativa": "/recettes/phytotherapie/nigelle/",
    "/herbier/therapeutic/nigella_sativa": "/recettes/phytotherapie/nigelle/",
    "/herbier/nigella_sativa": "/recettes/phytotherapie/nigelle/",
    "/herbier/piloselle": "/recettes/phytotherapie/piloselle/",
    "/herbier/therapeutic-hieracium_pilosella": "/recettes/phytotherapie/piloselle/",
    "/herbier/therapeutic/hieracium_pilosella": "/recettes/phytotherapie/piloselle/",
    "/herbier/hieracium_pilosella": "/recettes/phytotherapie/piloselle/",
    "/herbier/mauve": "/recettes/phytotherapie/mauve/",
    "/herbier/therapeutic-malva_sylvestris": "/recettes/phytotherapie/mauve/",
    "/herbier/therapeutic/malva_sylvestris": "/recettes/phytotherapie/mauve/",
    "/herbier/malva_sylvestris": "/recettes/phytotherapie/mauve/",
    "/herbier/moringa": "/recettes/phytotherapie/moringa/",
    "/herbier/therapeutic-moringa_oleifera": "/recettes/phytotherapie/moringa/",
    "/herbier/therapeutic/moringa_oleifera": "/recettes/phytotherapie/moringa/",
    "/herbier/moringa_oleifera": "/recettes/phytotherapie/moringa/",
    "/herbier/ail-vieilli-ou-noir": "/recettes/phytotherapie/ail-vieilli-ou-noir/",
    "/herbier/therapeutic-allium_sativum": "/recettes/phytotherapie/ail-vieilli-ou-noir/",
    "/herbier/therapeutic/allium_sativum": "/recettes/phytotherapie/ail-vieilli-ou-noir/",
    "/herbier/allium_sativum": "/recettes/phytotherapie/ail-vieilli-ou-noir/",
    "/herbier/aubepine": "/recettes/phytotherapie/aubepine/",
    "/herbier/therapeutic-crataegus_monogyna": "/recettes/phytotherapie/aubepine/",
    "/herbier/therapeutic/crataegus_monogyna": "/recettes/phytotherapie/aubepine/",
    "/herbier/crataegus_monogyna": "/recettes/phytotherapie/aubepine/",
    "/herbier/quinquina-rouge": "/recettes/phytotherapie/quinquina-rouge/",
    "/herbier/therapeutic-cinchona_succirubra": "/recettes/phytotherapie/quinquina-rouge/",
    "/herbier/therapeutic/cinchona_succirubra": "/recettes/phytotherapie/quinquina-rouge/",
    "/herbier/cinchona_succirubra": "/recettes/phytotherapie/quinquina-rouge/",
    "/herbier/pissenlit": "/recettes/phytotherapie/pissenlit/",
    "/herbier/therapeutic-taraxacum_officinale": "/recettes/phytotherapie/pissenlit/",
    "/herbier/therapeutic/taraxacum_officinale": "/recettes/phytotherapie/pissenlit/",
    "/herbier/taraxacum_officinale": "/recettes/phytotherapie/pissenlit/",
    "/herbier/melisse": "/recettes/phytotherapie/melisse/",
    "/herbier/passiflore": "/recettes/phytotherapie/passiflore/",
    "/herbier/therapeutic-passiflora_incarnata": "/recettes/phytotherapie/passiflora/",
    "/herbier/therapeutic/passiflora_incarnata": "/recettes/phytotherapie/passiflore/",
    "/herbier/passiflora_incarnata": "/recettes/phytotherapie/passiflore/",
    "/herbier/valeriane": "/recettes/phytotherapie/valeriane/",
    "/herbier/therapeutic-valeriana_officinalis": "/recettes/phytotherapie/valeriane/",
    "/herbier/therapeutic/valeriana_officinalis": "/recettes/phytotherapie/valeriane/",
    "/herbier/valeriana_officinalis": "/recettes/phytotherapie/valeriane/",
    "/herbier/eschscholtzia": "/recettes/phytotherapie/eschscholtzia/",
    "/herbier/therapeutic-eschscholzia_californica": "/recettes/phytotherapie/eschscholtzia/",
    "/herbier/therapeutic/eschscholzia_californica": "/recettes/phytotherapie/eschscholtzia/",
    "/herbier/eschscholzia_californica": "/recettes/phytotherapie/eschscholtzia/",
    "/herbier/romarin": "/recettes/phytotherapie/romarin/",
    "/herbier/lavande": "/recettes/phytotherapie/lavande/",
    "/herbier/artichaut": "/recettes/phytotherapie/artichaut/",
    "/herbier/therapeutic-artichaut": "/recettes/phytotherapie/artichaut/",
    "/herbier/therapeutic/artichaut": "/recettes/phytotherapie/artichaut/",
    // --- Lot 3 : Phytothérapie secondaire (Terrains T5 à T8) ---
    "/herbier/ginkgo": "/recettes/phytotherapie/ginkgo/",
    "/herbier/therapeutic-ginkgo_biloba": "/recettes/phytotherapie/ginkgo/",
    "/herbier/therapeutic/ginkgo_biloba": "/recettes/phytotherapie/ginkgo/",
    "/herbier/ginkgo_biloba": "/recettes/phytotherapie/ginkgo/",
    "/herbier/fenugrec": "/recettes/phytotherapie/fenugrec/",
    "/herbier/therapeutic-trigonella_foenum_graecum": "/recettes/phytotherapie/fenugrec/",
    "/herbier/therapeutic/trigonella_foenum_graecum": "/recettes/phytotherapie/fenugrec/",
    "/herbier/trigonella_foenum_graecum": "/recettes/phytotherapie/fenugrec/",
    "/herbier/renouee-du-japon-racine": "/recettes/phytotherapie/renouee-du-japon-racine/",
    "/herbier/therapeutic-reynoutria_japonica": "/recettes/phytotherapie/renouee-du-japon-racine/",
    "/herbier/therapeutic/reynoutria_japonica": "/recettes/phytotherapie/renouee-du-japon-racine/",
    "/herbier/reynoutria_japonica": "/recettes/phytotherapie/renouee-du-japon-racine/",
    "/herbier/euphraise": "/recettes/phytotherapie/euphraise/",
    "/herbier/therapeutic-euphrasia_officinalis": "/recettes/phytotherapie/euphraise/",
    "/herbier/therapeutic/euphrasia_officinalis": "/recettes/phytotherapie/euphraise/",
    "/herbier/euphrasia_officinalis": "/recettes/phytotherapie/euphraise/",
    "/herbier/myrtille": "/recettes/phytotherapie/myrtille/",
    "/herbier/therapeutic-vaccinium_myrtillus": "/recettes/phytotherapie/myrtille/",
    "/herbier/therapeutic/vaccinium_myrtillus": "/recettes/phytotherapie/myrtille/",
    "/herbier/vaccinium_myrtillus": "/recettes/phytotherapie/myrtille/",
    "/herbier/maca": "/recettes/phytotherapie/maca/",
    "/herbier/therapeutic-lepidium_meyenii": "/recettes/phytotherapie/maca/",
    "/herbier/therapeutic/lepidium_meyenii": "/recettes/phytotherapie/maca/",
    "/herbier/lepidium_meyenii": "/recettes/phytotherapie/maca/",
    "/herbier/alchemille": "/recettes/phytotherapie/alchemille/",
    "/herbier/therapeutic-alchemilla_vulgaris": "/recettes/phytotherapie/alchemille/",
    "/herbier/therapeutic/alchemilla_vulgaris": "/recettes/phytotherapie/alchemille/",
    "/herbier/alchemilla_vulgaris": "/recettes/phytotherapie/alchemille/",
    "/herbier/gattilier-vitex": "/recettes/phytotherapie/gattilier-vitex/",
    "/herbier/therapeutic-vitex_agnus_castus": "/recettes/phytotherapie/gattilier-vitex/",
    "/herbier/therapeutic/vitex_agnus_castus": "/recettes/phytotherapie/gattilier-vitex/",
    "/herbier/vitex_agnus_castus": "/recettes/phytotherapie/gattilier-vitex/",
    "/herbier/shatavari": "/recettes/phytotherapie/shatavari/",
    "/herbier/therapeutic-asparagus_racemosus": "/recettes/phytotherapie/shatavari/",
    "/herbier/therapeutic/asparagus_racemosus": "/recettes/phytotherapie/shatavari/",
    "/herbier/asparagus_racemosus": "/recettes/phytotherapie/shatavari/",
    "/herbier/hamamelis": "/recettes/phytotherapie/hamamelis/",
    "/herbier/therapeutic-hamamelis_virginiana": "/recettes/phytotherapie/hamamelis/",
    "/herbier/therapeutic/hamamelis_virginiana": "/recettes/phytotherapie/hamamelis/",
    "/herbier/hamamelis_virginiana": "/recettes/phytotherapie/hamamelis/",
    "/herbier/saule-blanc": "/recettes/phytotherapie/saule-blanc/",
    "/herbier/therapeutic-salix_alba": "/recettes/phytotherapie/saule-blanc/",
    "/herbier/therapeutic/salix_alba": "/recettes/phytotherapie/saule-blanc/",
    "/herbier/salix_alba": "/recettes/phytotherapie/saule-blanc/",
    "/herbier/epine-vinette": "/recettes/phytotherapie/epine-vinette/",
    "/herbier/therapeutic-berberis_vulgaris": "/recettes/phytotherapie/epine-vinette/",
    "/herbier/therapeutic/berberis_vulgaris": "/recettes/phytotherapie/epine-vinette/",
    "/herbier/berberis_vulgaris": "/recettes/phytotherapie/epine-vinette/",
    "/herbier/cassis": "/recettes/phytotherapie/cassis/",
    "/herbier/therapeutic-ribes_nigrum": "/recettes/phytotherapie/cassis/",
    "/herbier/therapeutic/ribes_nigrum": "/recettes/phytotherapie/cassis/",
    "/herbier/ribes_nigrum": "/recettes/phytotherapie/cassis/",
    "/herbier/millepertuis": "/recettes/phytotherapie/millepertuis/",
    "/herbier/therapeutic-millepertuis": "/recettes/phytotherapie/millepertuis/",
    "/herbier/therapeutic/millepertuis": "/recettes/phytotherapie/millepertuis/",
    "/herbier/decoction-detox-soutien-hepatique": "/recettes/phytotherapie/decoction-detox-soutien-hepatique/",
    "/herbier/extra-recipe-07": "/recettes/phytotherapie/decoction-detox-soutien-hepatique/",
    "/herbier/elixir-regulateur-metabolique": "/recettes/phytotherapie/elixir-regulateur-metabolique/",
    "/herbier/extra-recipe-08": "/recettes/phytotherapie/elixir-regulateur-metabolique/",
    "/herbier/infusion-drainage-elimination": "/recettes/phytotherapie/infusion-drainage-elimination/",
    "/herbier/extra-recipe-09": "/recettes/phytotherapie/infusion-drainage-elimination/",
    "/herbier/remede-psoriasis-emonctoires-regulation-epidermique": "/recettes/phytotherapie/remede-psoriasis-emonctoires-regulation-epidermique/",
    "/herbier/extra-recipe-10": "/recettes/phytotherapie/remede-psoriasis-emonctoires-regulation-epidermique/",
    "/herbier/remede-eczema-desamorcage-histaminique-barriere": "/recettes/phytotherapie/remede-eczema-desamorcage-histaminique-barriere/",
    "/herbier/extra-recipe-11": "/recettes/phytotherapie/remede-eczema-desamorcage-histaminique-barriere/",
    "/herbier/remede-alopecie-anti-dht-matrice-folliculaire": "/recettes/phytotherapie/remede-alopecie-anti-dht-matrice-folliculaire/",
    "/herbier/extra-recipe-12": "/recettes/phytotherapie/remede-alopecie-anti-dht-matrice-folliculaire/",
    "/herbier/gastronomie": "/recettes/gastronomie/",
    "/herbier/gastronomie/": "/recettes/gastronomie/",
    // --- Chantier 2 : Doublons éditoriaux & anciens chemins Académie ---
    "/totum-definition": "/totum-vegetal/",
    "/solvants-extraction": "/guide-solvants/",
    "/infusion-precision": "/infusion-botanique-maison-comment-ca-marche/",
    "/infusion-botanique": "/infusion-botanique-maison-comment-ca-marche/",
    "/comprendre-le-corps/4-architectures": "/academie/comprendre-le-corps/4-architectures/",
    "/comprendre-le-corps/7-terrains": "/academie/comprendre-le-corps/7-terrains/",
    "/comprendre-le-corps/9-axes-historiques": "/academie/comprendre-le-corps/9-axes-historiques/",
    "/comprendre-le-corps/charge-allostatique": "/academie/comprendre-le-corps/charge-allostatique/",
    "/comprendre-le-corps/metabolisme-glucidique-insuline": "/academie/comprendre-le-corps/metabolisme-glucidique-insuline/",
    "/comprendre-le-corps/reset-homeostasique": "/academie/reset-homeostasique/",
    "/academie/comprendre-le-corps/reset-homeostasique": "/academie/reset-homeostasique/",
    "/comprendre-le-corps/comment-lire-le-modele-bloom": "/academie/comprendre-le-modele-bloom/",
  };

  Object.entries(redirects301).forEach(([from, to]) => {
    const handleRedirect = (target: string) => (req: express.Request, res: express.Response, next: express.NextFunction) => {
      if (!isCanonicalHost(req.get("host") || "")) return next();
      const current = req.path;
      if (current === target || current === `${target}/` || `${current}/` === target) return next();
      res.set("Cache-Control", "no-store");
      res.redirect(301, target);
    };
    app.get(from, handleRedirect(to));
    app.get(`/en${from}`, handleRedirect(`/en${to}`));
    app.get(`/de${from}`, handleRedirect(`/de${to}`));
  });

  /* --- NEWSLETTER --- */
  app.post("/api/newsletter/subscribe", createRateLimiter(60_000, 10), async (req, res) => {
    try {
      const { email, firstName, source } = req.body || {};
      if (!email) return res.status(400).json({ error: "Email requis" });
      const firestore = await getDb();
      const normalized = String(email).toLowerCase().trim();
      const existing = await firestore.collection("subscribers").where("email", "==", normalized).get();
      let subscriberId: string;
      if (existing.empty) {
        const created = await firestore.collection("subscribers").add({
          email: normalized,
          first_name: firstName || "",
          locale: "fr-FR",
          marketing_consent: false,
          consent_source: source || "footer_form",
          email_status: "active",
          preferences: { family_rhythm: false, school_calendar_zone: "non_precise", content_context: ["routine_personnelle"] },
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        });
        subscriberId = created.id;
      } else {
        subscriberId = existing.docs[0].id;
      }
      const confirmLink = `https://${req.get("host")}/api/newsletter/confirm?id=${subscriberId}`;
      console.log("[Newsletter] Confirmation à envoyer :", normalized, confirmLink);
      res.json({ success: true, subscriberId, message: "Email de confirmation envoyé" });
    } catch (error: any) {
      console.error("[Newsletter] subscribe error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/newsletter/confirm", async (req, res) => {
    try {
      const { id } = req.query;
      if (!id) return res.status(400).send("ID manquant");
      const ref = (await getDb()).collection("subscribers").doc(id as string);
      const doc = await ref.get();
      if (!doc.exists) return res.status(404).send("Abonné non trouvé");
      await ref.update({ marketing_consent: true, consent_timestamp: new Date().toISOString(), updated_at: new Date().toISOString() });
      res.send("<h1>Inscription confirmée !</h1><p>Merci d'avoir rejoint la communauté Bloom. Vous pouvez fermer cette page.</p>");
    } catch {
      res.status(500).send("Erreur lors de la confirmation");
    }
  });

  app.get("/api/newsletter/unsubscribe", async (req, res) => {
    try {
      const { id } = req.query;
      if (!id) return res.status(400).send("ID manquant");
      await (await getDb()).collection("subscribers").doc(id as string).update({
        marketing_consent: false, email_status: "unsubscribed", updated_at: new Date().toISOString(),
      });
      res.send("<h1>Désinscription réussie</h1><p>Vous ne recevrez plus de newsletters de notre part.</p>");
    } catch {
      res.status(500).send("Erreur lors de la désinscription");
    }
  });

  /* --- NEWSLETTER ADMIN --- */
  let orchestratorInstance: any = null;
  const getOrchestrator = async () => {
    if (!orchestratorInstance) {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) throw new Error("GEMINI_API_KEY is missing");
      const { NewsletterOrchestrator } = await import("./server/newsletter-orchestrator");
      orchestratorInstance = new NewsletterOrchestrator(apiKey);
    }
    return orchestratorInstance;
  };
  app.post("/api/admin/newsletter/generate", requireAdmin, async (req, res) => {
    try {
      const { season, context_data } = req.body || {};
      const orchestrator = await getOrchestrator();
      const sharedMemory: any = await orchestrator.generateNewsletter({ season, ...(context_data || {}) });
      const firestore = await getDb();
      const campaign = await firestore.collection("newsletter_campaigns").add({
        theme: sharedMemory.selected_topic?.selected_topic,
        subject: sharedMemory.editorial_draft?.subject,
        preheader: sharedMemory.editorial_draft?.preheader,
        html_content: sharedMemory.html_output?.html,
        text_content: sharedMemory.html_output?.plain_text,
        status: sharedMemory.quality_report?.status === "pass" ? "review" : "draft",
        quality_report: sharedMemory.quality_report,
        target_segments: sharedMemory.selected_topic?.target_segments || [],
        created_by: "agent",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });
      await firestore.collection("newsletter_generation_sessions").add({
        campaign_id: campaign.id,
        status: "review",
        shared_memory: sharedMemory,
        risk_level: (sharedMemory.quality_report?.score ?? 100) < 80 ? "medium" : "low",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });
      res.json({ success: true, campaignId: campaign.id, sharedMemory });
    } catch (error: any) {
      console.error("[Newsletter] generate error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/admin/newsletter/approve", requireAdmin, async (req, res) => {
    try {
      const { campaignId } = req.body || {};
      if (!campaignId) return res.status(400).json({ error: "Campaign ID requis" });
      await (await getDb()).collection("newsletter_campaigns").doc(campaignId).update({
        status: "approved", approved_by: ADMIN_EMAIL, updated_at: new Date().toISOString(),
      });
      res.json({ success: true, message: "Campagne approuvée" });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  /* --- CHAT ALMA --- */
  app.post("/api/chat", createRateLimiter(60_000, 30), async (req, res) => {
    try {
      const { message, history, userId, anonymousSessionId, language, pageUrl } = req.body || {};
      if (!process.env.GEMINI_API_KEY) return res.status(500).json({ error: "Configuration API Key manquante" });
      if (!message) return res.status(400).json({ error: "Missing message" });
      const contents = [
        ...(history || []).map((h: any) => ({ role: h.role === "user" ? "user" : "model", parts: [{ text: h.text }] })),
        { role: "user", parts: [{ text: message }] },
      ];
      const result = await (await getAi()).models.generateContent({
        model: GEMINI_MODEL,
        contents,
        config: { systemInstruction: BOT_SYSTEM_INSTRUCTION, responseMimeType: "application/json" },
      });
      const responseText = (result as any).text || "{}";
      let data: any;
      try { data = JSON.parse(responseText); }
      catch { data = { answer: responseText, concern: {} }; }
      try {
        await (await getDb()).collection("customer_concerns").add({
          ...(data.concern || {}),
          userId: userId || null,
          anonymousSessionId: anonymousSessionId || null,
          userQuestion: message,
          answerSummary: data.answer ? String(data.answer).substring(0, 500) : "",
          language: language || "fr",
          pageUrl: pageUrl || "",
          createdAt: new Date().toISOString(),
        });
      } catch (e) { console.error("[Chat] Firestore log error:", e); }
      res.json({ text: data.answer || "Désolé, je rencontre une difficulté technique.", concern: data.concern });
    } catch (error: any) {
      console.error("[Chat] error:", error);
      res.status(500).json({ error: "Une erreur est survenue lors de la communication avec Alma." });
    }
  });

  /* --- ACTIVATION BLOOMLAB --- */
  app.post("/api/activate-bloomlab", createRateLimiter(60_000, 5), lazyUploadInvoice, async (req: express.Request, res: express.Response) => {
    try {
      const { userId } = req.body || {};
      const file = req.file;
      if (!userId || !file) return res.status(400).json({ error: "Missing userId or invoice file" });
      const imagePart = { inlineData: { mimeType: file.mimetype, data: file.buffer.toString("base64") } };
      const prompt = `Tu es un expert comptable et un vérificateur de commandes e-commerce.
Analyse l'image/PDF de la facture jointe et extrais UNIQUEMENT les données suivantes au format JSON strict :
{
  "numero_commande": "string",
  "date_facture": "YYYY-MM-DD",
  "nom_produit": "string",
  "montant_total": number,
  "est_bloomlab": boolean
}
RÈGLES DE VÉRIFICATION STRICTES :
- "est_bloomlab" est TRUE uniquement si le nom du produit contient EXACTEMENT "BloomLab" ou "Pack Souveraineté".
- "est_bloomlab" est FALSE si c'est un kit de plantes, un binder ou un accessoire seul.
- Si la date est supérieure à 30 jours par rapport à aujourd'hui, ajoute un champ "offre_expiree": true.
- Ne retourne AUCUN texte explicatif, uniquement le JSON valide.`;
      const result = await (await getAi()).models.generateContent({
        model: GEMINI_MODEL,
        contents: [{ parts: [imagePart, { text: prompt }] }],
        config: { responseMimeType: "application/json" },
      });
      const analysis: any = JSON.parse((result as any).text || "{}");
      if (analysis.est_bloomlab && !analysis.offre_expiree) {
        const firestore = await getDb();
        const userRef = firestore.collection("users").doc(userId);
        const userDoc = await userRef.get();
        if (!userDoc.exists) return res.status(404).json({ error: "Utilisateur non trouvé dans la base de données." });
        const isPremiumUntil = new Date();
        isPremiumUntil.setMonth(isPremiumUntil.getMonth() + 1);
        await userRef.update({
          status: "premium",
          isPremiumUntil: isPremiumUntil.toISOString(),
          machineOwned: true,
          updatedAt: new Date().toISOString(),
        });
        const userEmail = userDoc.data()?.email || userId;
        const transporter = await getTransporter();
        await transporter.sendMail({
          from: `"Bloom Assistant" <${process.env.SMTP_USER}>`,
          to: ADMIN_EMAIL,
          subject: `[Activation BloomLab] Nouvelle facture déposée - ${analysis.numero_commande}`,
          text: `Utilisateur: ${userEmail}\nCommande: ${analysis.numero_commande}\nDate Facture: ${analysis.date_facture}\nProduit: ${analysis.nom_produit}\nMontant: ${analysis.montant_total}\nValide: ${analysis.est_bloomlab}`,
          attachments: [{ filename: file.originalname, content: file.buffer }],
        }).catch((e) => console.error("[Activation] email error:", e));
        await firestore.collection("interactions").add({
          userId, type: "activation_bloomlab", metadata: analysis, createdAt: new Date().toISOString(),
        });
        return res.json({ success: true, analysis });
      }
      let message = "La facture ne correspond pas à une BloomLab valide.";
      if (analysis.offre_expiree) message = "Cette offre a expiré (achat de plus de 30 jours).";
      return res.status(400).json({ success: false, message, analysis });
    } catch (error: any) {
      console.error("[Activation] error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  /* --- CHECKOUT STRIPE --- */
  app.post("/api/checkout/create-payment-intent", createRateLimiter(60_000, 20), async (req, res) => {
    try {
      const { cart, shippingMethod, formData, userId, userEmail } = req.body || {};
      if (!cart || !userId || !userEmail) return res.status(400).json({ error: "Données de commande incomplètes" });
      let subtotal = 0;
      const validatedItems = cart.map((item: any) => {
        const officialPrice = PRODUCT_PRICES[item.id] ?? item.price;
        subtotal += officialPrice * (item.quantity || 1);
        return { id: item.id, name: item.name, price: officialPrice, quantity: item.quantity || 1 };
      });
      const shippingPrice = getShippingPrice(shippingMethod, validatedItems);
      const total = subtotal + shippingPrice;
      const firestore = await getDb();
      const orderId = `BLM-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
      await firestore.collection("orders").doc(orderId).set({
        userId, email: userEmail,
        customerName: `${formData?.firstName ?? ""} ${formData?.lastName ?? ""}`.trim(),
        address: `${formData?.address ?? ""}, ${formData?.zipCode ?? ""} ${formData?.city ?? ""}, ${formData?.country ?? ""}`,
        items: validatedItems, shippingMethod, shippingPrice, total,
        status: "pending",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
      const paymentIntent = await (await getStripe()).paymentIntents.create({
        amount: Math.round(total * 100),
        currency: "eur",
        metadata: { orderId, userId },
        receipt_email: userEmail,
      });
      res.json({ clientSecret: paymentIntent.client_secret, orderId, total });
    } catch (error: any) {
      console.error("[Checkout] error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  /* --- PAYPAL --- */
  app.post("/api/checkout/paypal/create-order", createRateLimiter(60_000, 20), async (req, res) => {
    try {
      const { cart, shippingMethod, formData, userId, userEmail } = req.body || {};
      let subtotal = 0;
      const validatedItems = cart.map((item: any) => {
        const officialPrice = PRODUCT_PRICES[item.id] ?? item.price;
        subtotal += officialPrice * (item.quantity || 1);
        return { id: item.id, name: item.name, price: officialPrice, quantity: item.quantity || 1 };
      });
      const shippingPrice = getShippingPrice(shippingMethod, validatedItems);
      const total = subtotal + shippingPrice;
      const orderId = `BLM-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
      await (await getDb()).collection("orders").doc(orderId).set({
        userId, email: userEmail,
        customerName: `${formData?.firstName ?? ""} ${formData?.lastName ?? ""}`.trim(),
        address: `${formData?.address ?? ""}, ${formData?.zipCode ?? ""} ${formData?.city ?? ""}, ${formData?.country ?? ""}`,
        items: validatedItems, shippingMethod, shippingPrice, total,
        status: "pending",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
      res.json({ orderId, total });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/checkout/paypal/capture", createRateLimiter(60_000, 20), async (req, res) => {
    try {
      const { orderId } = req.body || {};
      const orderDoc = await (await getDb()).collection("orders").doc(orderId).get();
      if (orderDoc.exists) await handleSuccessfulPayment(orderDoc.data(), orderId);
      res.json({ success: true });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  /* --- WEBHOOK ACHAT (simulation) --- */
  app.post("/api/webhooks/purchase", async (req, res) => {
    const secret = process.env.PURCHASE_WEBHOOK_SECRET;
    if (secret) {
      if (req.get("x-webhook-secret") !== secret) return res.status(401).json({ error: "Unauthorized" });
    } else if (IS_PROD) {
      return res.status(403).json({ error: "Webhook désactivé en production sans secret" });
    }
    try {
      const { email, productId, orderId } = req.body || {};
      if (!email || !productId) return res.status(400).json({ error: "Données manquantes" });
      const firestore = await getDb();
      const normalized = String(email).toLowerCase().trim();
      const existing = await firestore.collection("subscribers").where("email", "==", normalized).get();
      let subscriberId: string;
      if (existing.empty) {
        const created = await firestore.collection("subscribers").add({
          email: normalized, marketing_consent: false, email_status: "active",
          created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
        });
        subscriberId = created.id;
      } else subscriberId = existing.docs[0].id;
      const isBloomLab = String(productId).includes("bloomlab");
      const cust = await firestore.collection("customers").where("subscriber_id", "==", subscriberId).get();
      if (cust.empty) {
        await firestore.collection("customers").add({
          subscriber_id: subscriberId,
          bloomlab_purchase_verified: isBloomLab,
          bloomlab_purchase_date: isBloomLab ? new Date().toISOString() : null,
          kit_purchase_verified: !isBloomLab,
          last_purchase_date: new Date().toISOString(),
          purchase_source: "webhook_simulation",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        });
      } else {
        const update: any = { last_purchase_date: new Date().toISOString(), updated_at: new Date().toISOString() };
        if (isBloomLab) { update.bloomlab_purchase_verified = true; update.bloomlab_purchase_date = new Date().toISOString(); }
        else update.kit_purchase_verified = true;
        await cust.docs[0].ref.update(update);
      }
      res.json({ success: true, message: "Achat synchronisé" });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });
}

/* ----------------------------------------------------------------------------
 * VITE (DEV)
 * -------------------------------------------------------------------------- */
let viteDevServer: any = null;
async function setupVite(app: express.Express) {
  const { createServer: createViteServer } = await import("vite");
  const vite = await createViteServer({
    server: { middlewareMode: true, hmr: false, ws: false, host: "0.0.0.0", cors: true },
    appType: "custom",
    base: "/",
  });
  return vite;
}

/* ----------------------------------------------------------------------------
 * SERVER-SIDE SEO INJECTION (Googlebot & Social Preview Optimization)
 * -------------------------------------------------------------------------- */
type ServerSEORoute = RouteMeta;

const SERVER_SEO_ROUTES: Record<string, ServerSEORoute> = ROUTES_META;

function buildBreadcrumbItems(normalizedPath: string, canonical: string, title: string) {
  const cleanLabel = title.split("|")[0].split("—")[0].trim();
  const rootItem = {
    "@type": "ListItem",
    "position": 1,
    "name": "Accueil",
    "item": "https://bloombybotanik.com/"
  };

  if (
    normalizedPath === "/bloomlab/" ||
    normalizedPath === "/produit/bloomlab/" ||
    normalizedPath === "/boutique/bloomlab/"
  ) {
    return [
      rootItem,
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Boutique",
        "item": "https://bloombybotanik.com/boutique/"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "BloomLab®",
        "item": canonical
      }
    ];
  }

  if (normalizedPath.startsWith("/boutique/") && normalizedPath !== "/boutique/") {
    return [
      rootItem,
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Boutique",
        "item": "https://bloombybotanik.com/boutique/"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": cleanLabel || title,
        "item": canonical
      }
    ];
  }

  if (normalizedPath.startsWith("/academie/") && normalizedPath !== "/academie/") {
    const academieItem = {
      "@type": "ListItem",
      "position": 2,
      "name": "Académie",
      "item": "https://bloombybotanik.com/academie/"
    };
    if (normalizedPath.startsWith("/academie/comprendre-le-corps/") && normalizedPath !== "/academie/comprendre-le-corps/") {
      return [
        rootItem,
        academieItem,
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Comprendre le Corps",
          "item": "https://bloombybotanik.com/academie/comprendre-le-corps/"
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": cleanLabel || title,
          "item": canonical
        }
      ];
    }
    if (normalizedPath.startsWith("/academie/protocoles/") && normalizedPath !== "/academie/protocoles/") {
      return [
        rootItem,
        academieItem,
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Protocoles",
          "item": "https://bloombybotanik.com/academie/protocoles/"
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": cleanLabel || title,
          "item": canonical
        }
      ];
    }
    if (normalizedPath.startsWith("/academie/nutrition-et-micronutrition/") && normalizedPath !== "/academie/nutrition-et-micronutrition/") {
      return [
        rootItem,
        academieItem,
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Nutrition & Micronutrition",
          "item": "https://bloombybotanik.com/academie/nutrition-et-micronutrition/"
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": cleanLabel || title,
          "item": canonical
        }
      ];
    }
    if (normalizedPath.startsWith("/academie/reset-homeostasique/") && normalizedPath !== "/academie/reset-homeostasique/") {
      return [
        rootItem,
        academieItem,
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Reset Homéostasique",
          "item": "https://bloombybotanik.com/academie/reset-homeostasique/"
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": cleanLabel || title,
          "item": canonical
        }
      ];
    }
    return [
      rootItem,
      academieItem,
      {
        "@type": "ListItem",
        "position": 3,
        "name": cleanLabel || title,
        "item": canonical
      }
    ];
  }

  if (normalizedPath.startsWith("/articles/") && normalizedPath !== "/articles/") {
    return [
      rootItem,
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Articles & Savoirs",
        "item": "https://bloombybotanik.com/articles/"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": cleanLabel || title,
        "item": canonical
      }
    ];
  }

  if (normalizedPath.startsWith("/blog/") && normalizedPath !== "/blog/") {
    return [
      rootItem,
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Journal Botanique",
        "item": "https://bloombybotanik.com/blog/"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": cleanLabel || title,
        "item": canonical
      }
    ];
  }

  return [
    rootItem,
    {
      "@type": "ListItem",
      "position": 2,
      "name": cleanLabel || title,
      "item": canonical
    }
  ];
}

function stripHomepageSpecificSchemas(html: string, canonical: string, title: string, normalizedPath: string = "/"): string {
  const minimalGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://bloombybotanik.com/#organization",
        "name": "Bloom by BotaniK",
        "url": "https://bloombybotanik.com",
        "logo": {
          "@type": "ImageObject",
          "url": "https://bloombybotanik.com/assets/img/logo-bloom-square-512.png",
          "width": 512,
          "height": 512
        },
        "sameAs": [
          "https://www.instagram.com/bloombybotanik/",
          "https://www.tiktok.com/@bloombybotanik",
          "https://www.youtube.com/@BloomByBotanik",
          "https://fr.pinterest.com/bloombybotanik",
          "https://www.facebook.com/profile.php?id=61577892110122",
          "https://www.amazon.fr/dp/B0F7GGTMNR"
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://bloombybotanik.com/#website",
        "url": "https://bloombybotanik.com",
        "name": "Bloom by BotaniK",
        "publisher": { "@id": "https://bloombybotanik.com/#organization" }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": buildBreadcrumbItems(normalizedPath, canonical, title)
      }
    ]
  };
  return html.replace(
    /<script\b[^>]*id=["']bloom-root-schema["'][^>]*>[\s\S]*?<\/script>/i,
    `<script type="application/ld+json" id="bloom-root-schema">${JSON.stringify(minimalGraph)}</script>`
  );
}

function isPathologyNoindexPath(normalizedPath: string): boolean {
  const clean = normalizedPath.toLowerCase();
  return (
    clean === "/academie/protocoles/psoriasis/" ||
    clean === "/academie/protocoles/sibo/" ||
    clean === "/academie/protocoles/decalcification-pineale/" ||
    clean === "/phytotherapie-reset/protocole-psoriasis/" ||
    clean === "/phytotherapie-reset/protocole-sibo/" ||
    clean.includes("psoriasis")
  );
}

function isEnLocalePath(normalizedPath: string): boolean {
  return normalizedPath === "/en/" || normalizedPath.startsWith("/en/");
}

function buildFallbackRoute(normalizedPath: string): ServerSEORoute {
  const slug = normalizedPath
    .replace(/^\/+|\/+$/g, "")
    .split("/")
    .filter(Boolean)
    .pop() || "accueil";
  const readable = slug
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
  const title = `${readable} | Bloom by BotaniK`;
  const description = `${readable} — Documentation botanique et méthode d'extraction Bloom by BotaniK.`;
  return {
    path: normalizedPath,
    canonical: normalizedPath,
    title,
    h1: readable,
    description,
    image1200: "/images/og/bloomlab-extracteur-botanique-1200x630.jpg",
    image1080: "/images/og/bloomlab-extracteur-botanique-1080x1080.jpg",
    alt: `${readable} — Bloom by BotaniK`,
    type: "website",
    images: [{ url: "/images/og/bloomlab-extracteur-botanique-1200x630.jpg", alt: `${readable} — Bloom by BotaniK` }],
  };
}

function finalizeRecipeSsrHtml(
  html: string,
  rendered: { title: string; metaDescription: string; canonical: string; jsonLd: string; bodyHtml: string },
  ogType: string = 'website',
  isNotFound: boolean = false,
  isStrictNoindex: boolean = isNotFound
): string {
  let updated = stripHomepageSpecificSchemas(html, rendered.canonical, rendered.title);
  updated = updated.replace(/<title>.*?<\/title>/i, `<title>${rendered.title}</title>`);
  updated = updated.replace(/<meta\s+name=["']description["']\s+content=["'].*?["']\s*\/?>/i, `<meta name="description" content="${rendered.metaDescription}" />`);
  updated = updated.replace(/<meta\s+property=["']og:title["']\s+content=["'].*?["']\s*\/?>/i, `<meta property="og:title" content="${rendered.title}">`);
  updated = updated.replace(/<meta\s+property=["']og:description["']\s+content=["'].*?["']\s*\/?>/i, `<meta property="og:description" content="${rendered.metaDescription}">`);
  updated = updated.replace(/<meta\s+property=["']og:url["']\s+content=["'].*?["']\s*\/?>/i, `<meta property="og:url" content="${rendered.canonical}">`);
  updated = updated.replace(/<meta\s+property=["']og:type["']\s+content=["'].*?["']\s*\/?>/i, `<meta property="og:type" content="${ogType}">`);
  updated = updated.replace(/<link\s+rel=["']canonical["']\s+href=["'].*?["']\s*\/?>/i, `<link rel="canonical" href="${rendered.canonical}" />`);
  updated = updated.replace(/<meta\s+name=["']twitter:title["']\s+content=["'].*?["']\s*\/?>/i, `<meta name="twitter:title" content="${rendered.title}">`);
  updated = updated.replace(/<meta\s+name=["']twitter:description["']\s+content=["'].*?["']\s*\/?>/i, `<meta name="twitter:description" content="${rendered.metaDescription}">`);
  const robotsVal = isNotFound || isStrictNoindex
    ? "noindex, nofollow"
    : "index, follow, max-image-preview:large, max-video-preview:-1, max-snippet:-1";
  if (/<meta\s+name=["']robots["'][^>]*>/i.test(updated)) {
    updated = updated.replace(/<meta\s+name=["']robots["'][^>]*>/i, `<meta name="robots" content="${robotsVal}" />`);
  } else {
    updated = updated.replace("</head>", `  <meta name="robots" content="${robotsVal}" />\n  </head>`);
  }
  updated = updated.replace(/<link\s+rel=["']alternate["']\s+hreflang=["'].*?["']\s+href=["'].*?["']\s*\/?>\s*/gi, "");
  const jsonLdBlock = isStrictNoindex && !isNotFound ? "" : rendered.jsonLd;
  updated = updated.replace(
    "</head>",
    `  <link rel="alternate" hreflang="fr" href="${rendered.canonical}" />\n  <link rel="alternate" hreflang="x-default" href="${rendered.canonical}" />\n  ${jsonLdBlock}\n  </head>`
  );
  if (isStrictNoindex && !isNotFound) {
    updated = updated.replace(/<div id=["']root["']>[\s\S]*?<\/div>/i, `<div id="root"></div>`);
  } else {
    const hasImg = /<img[\s\S]*?src=/i.test(rendered.bodyHtml);
    const safeAlt = rendered.title.replace(/"/g, '&quot;');
    const figureHtml = hasImg
      ? ''
      : `\n      <figure><img src="https://bloombybotanik.com/images/bloomlab_main_1784887530345.png" alt="${safeAlt}" width="1200" height="900" loading="eager" /></figure>`;
    updated = updated.replace(/<div id=["']root["']>[\s\S]*?<\/div>/i, `<div id="root">${rendered.bodyHtml}${figureHtml}</div>`);
  }
  return updated;
}

function resolveCanonicalPath(normalizedPath: string, matchedPostSlug: string | null = null): string {
  if (matchedPostSlug) {
    return `/articles/${matchedPostSlug}/`;
  }

  if (isPathologyNoindexPath(normalizedPath)) {
    return normalizedPath;
  }

  const routeMeta = getRouteMeta(normalizedPath);
  if (routeMeta?.canonical) {
    return routeMeta.canonical;
  }

  // 1. BloomLab → canonique = /bloomlab/
  if (
    normalizedPath === "/bloomlab/" ||
    normalizedPath === "/boutique/bloomlab/" ||
    normalizedPath === "/produit/bloomlab/" ||
    normalizedPath === "/machine/" ||
    normalizedPath === "/infuseur-botanique/" ||
    normalizedPath === "/bloomlab-extracteur-botanique-et-infuseur-dhuile-intelligent-6-en-1/"
  ) {
    return "/bloomlab/";
  }

  // 2. Terrains → canonique = /academie/comprendre-le-corps/7-terrains/
  if (
    normalizedPath === "/academie/comprendre-le-corps/7-terrains/" ||
    normalizedPath === "/comprendre-le-corps/7-terrains/" ||
    normalizedPath === "/terrains/"
  ) {
    return "/academie/comprendre-le-corps/7-terrains/";
  }

  // 3. Reset → canonique = /academie/reset-homeostasique/
  if (
    normalizedPath === "/academie/reset-homeostasique/" ||
    normalizedPath === "/academie/comprendre-le-corps/reset-homeostasique/" ||
    normalizedPath === "/comprendre-le-corps/reset-homeostasique/" ||
    normalizedPath === "/reset-homeostasique/" ||
    normalizedPath === "/phytotherapie-reset/" ||
    normalizedPath === "/phytotherapie/"
  ) {
    return "/academie/reset-homeostasique/";
  }

  // 4. Protocoles → canonique = /academie/protocoles/
  // Les variantes /protocoles/..., /protocoles-systemiques/..., /phytotherapie-reset/... pointent canonique dessus
  if (
    normalizedPath === "/academie/protocoles/" ||
    normalizedPath === "/protocoles/" ||
    normalizedPath.startsWith("/protocoles/") ||
    normalizedPath.startsWith("/protocoles-systemiques/") ||
    normalizedPath.startsWith("/phytotherapie-reset/") ||
    normalizedPath === "/votre-pratique/" ||
    normalizedPath === "/parcours/"
  ) {
    return "/academie/protocoles/";
  }

  return normalizedPath;
}

function injectServerSEO(html: string, reqPath: string): { html: string; statusCode: number } {
  try {
    const pathOnly = (reqPath || "/").split("?")[0].split("#")[0] || "/";
    const clean = pathOnly.replace(/\/$/, "") + "/";
    const normalized = clean === "//" ? "/" : clean;

    const ssrMods = ssrModulesCache;
    // 0. Recettes publiques crawlables (Hub, Catégories, Pagination & Fiches individuelles)
    if (
      ssrMods &&
      (pathOnly.startsWith("/recettes") || pathOnly.startsWith("/recettes/")) &&
      normalized !== "/recettes/culinaires/soupe-beaute-tremella/"
    ) {
      const cleanRecipePath = pathOnly.endsWith("/") ? pathOnly : pathOnly + "/";
      const isRecipeNoindex = isPathologyNoindexPath(cleanRecipePath);

      // 0.1 Fiche Recette Herbier Migrée
      const herbierRecipe = ssrMods.getHerbierRecipeByPath(cleanRecipePath);
      if (herbierRecipe) {
        const rendered = ssrMods.renderHerbierRecipePageHtml(herbierRecipe);
        return {
          html: finalizeRecipeSsrHtml(html, rendered, herbierRecipe.schemaType === 'Recipe' ? 'website' : 'article', false, isRecipeNoindex),
          statusCode: 200,
        };
      }

      // 0.2 Fiche Recette Canonique
      const recipe = ssrMods.getRecipeByPath(cleanRecipePath);
      if (recipe) {
        const rendered = ssrMods.renderRecipePageHtml(recipe);
        return {
          html: finalizeRecipeSsrHtml(html, rendered, recipe.schemaType === 'Recipe' ? 'website' : 'article', false, isRecipeNoindex),
          statusCode: 200,
        };
      }

      // 0.3 Hub /recettes/
      if (cleanRecipePath === "/recettes/") {
        return {
          html: finalizeRecipeSsrHtml(html, ssrMods.renderHubPageHtml(), 'website'),
          statusCode: 200,
        };
      }

      // 0.4 Catégories strictes & pagination bornée
      const catMatch = cleanRecipePath.match(
        /^\/recettes\/(phytotherapie|gastronomie|culinaires|cosmetiques|parcours-botaniques)\/(?:page\/(\d+)\/)?$/
      );
      if (catMatch) {
        const category = catMatch[1] as 'phytotherapie' | 'gastronomie' | 'culinaires' | 'cosmetiques' | 'parcours-botaniques';
        const pageNum = catMatch[2] ? parseInt(catMatch[2], 10) : 1;
        const renderedCat =
          category === 'phytotherapie' || category === 'gastronomie'
            ? ssrMods.renderHerbierCategoryPageHtml(category, pageNum)
            : ssrMods.renderCategoryPageHtml(category, pageNum);

        if (renderedCat) {
          return {
            html: finalizeRecipeSsrHtml(html, renderedCat, 'website'),
            statusCode: 200,
          };
        }
      }

      // 0.5 Toute route /recettes/* inconnue ou page hors bornes -> HTTP 404 réel
      return {
        html: finalizeRecipeSsrHtml(
          html,
          {
            title: 'Recette introuvable — Erreur 404 | Bloom by BotaniK',
            metaDescription: 'Cette fiche recette ou page du catalogue botanique est introuvable.',
            canonical: 'https://bloombybotanik.com/recettes/',
            jsonLd: '',
            bodyHtml: `<div class="max-w-3xl mx-auto px-6 py-20 text-center text-[#3E4A3D]"><h1>Recette introuvable — Erreur 404</h1><p>Cette fiche botanique n&apos;existe pas ou a été déplacée.</p><p><a href="/recettes/">Retour au catalogue public des recettes</a></p></div>`,
          },
          'website',
          true
        ),
        statusCode: 404,
      };
    }

    let route: ServerSEORoute | undefined = getRouteMeta(normalized) || SERVER_SEO_ROUTES[normalized] || SERVER_SEO_ROUTES[pathOnly];
    let matchedPostSlug: string | null = null;

    // Résolution dynamique des articles & billets de blog depuis blogPosts.ts
    if (ssrMods && !route && (normalized.startsWith("/articles/") || normalized.startsWith("/blog/"))) {
      const slug = normalized.replace(/^\/(?:articles|blog)\//, "").replace(/\/$/, "");
      const matchedPost = ssrMods.blogPosts.find((p: any) => p.slug === slug);
      if (matchedPost) {
        matchedPostSlug = matchedPost.slug;
        const postTitle = matchedPost.metaTitle?.fr || `${matchedPost.title?.fr || "Article Botanique"} | Bloom by BotaniK`;
        const postDesc = (matchedPost.metaDescription?.fr || matchedPost.excerpt?.fr || postTitle).slice(0, 158);
        const postImg = matchedPost.image?.startsWith("http")
          ? matchedPost.image.replace("https://bloombybotanik.com", "")
          : matchedPost.image?.startsWith("/")
            ? matchedPost.image
            : "/images/og/articles-savoirs-herboristerie-botanique-1200x630.jpg";
        const postImgSq = matchedPost.imageSquare?.startsWith("http")
          ? matchedPost.imageSquare.replace("https://bloombybotanik.com", "")
          : matchedPost.imageSquare?.startsWith("/")
            ? matchedPost.imageSquare
            : postImg;
        const postAlt = matchedPost.imageAlt || matchedPost.title?.fr || "Article Botanique Bloom";
        route = {
          path: normalized,
          canonical: `/articles/${matchedPost.slug}/`,
          title: postTitle,
          description: postDesc,
          image1200: postImg,
          image1080: postImgSq,
          alt: postAlt,
          type: "article",
          datePublished: matchedPost.date ? `${matchedPost.date}T08:00:00+01:00` : "2026-10-01T08:00:00+01:00",
          dateModified: matchedPost.date ? `${matchedPost.date}T08:00:00+01:00` : "2026-11-18T10:00:00+01:00",
          images: [{ url: postImg, alt: postAlt }],
        };
      }
    }

    if (!route) {
      route = buildFallbackRoute(normalized);
    }

    const full1200 = `https://bloombybotanik.com${route.image1200}`;
    const full1080 = `https://bloombybotanik.com${route.image1080}`;
    const canonicalPath = resolveCanonicalPath(normalized, matchedPostSlug);
    const canonical = `https://bloombybotanik.com${canonicalPath}`;

    let updated = html;
    if (normalized !== "/") {
      updated = stripHomepageSpecificSchemas(updated, canonical, route.title, normalized);
    }

    // 1. Update Title
    updated = updated.replace(/<title>.*?<\/title>/i, `<title>${route.title}</title>`);

    // 2. Update Meta Description
    updated = updated.replace(/<meta\s+name=["']description["']\s+content=["'].*?["']\s*\/?>/i, `<meta name="description" content="${route.description}" />`);

    // 3. Update OG Title, Description, URL, Type
    updated = updated.replace(/<meta\s+property=["']og:title["']\s+content=["'].*?["']\s*\/?>/i, `<meta property="og:title" content="${route.title}">`);
    updated = updated.replace(/<meta\s+property=["']og:description["']\s+content=["'].*?["']\s*\/?>/i, `<meta property="og:description" content="${route.description}">`);
    updated = updated.replace(/<meta\s+property=["']og:url["']\s+content=["'].*?["']\s*\/?>/i, `<meta property="og:url" content="${canonical}">`);
    updated = updated.replace(/<meta\s+property=["']og:type["']\s+content=["'].*?["']\s*\/?>/i, `<meta property="og:type" content="${canonicalPath === "/bloomlab/" ? route.type : (route.type === "article" ? "article" : "website")}">`);

    // 4. Update OG Images Block cleanly
    const ogBlockRegex = /<!-- Primary OG Image[\s\S]*?<!-- Twitter Card -->/i;
    if (ogBlockRegex.test(updated)) {
      updated = updated.replace(
        ogBlockRegex,
        `<!-- Primary OG Image (1200x630) -->\n    <meta property="og:image" content="${full1200}">\n    <meta property="og:image:secure_url" content="${full1200}">\n    <meta property="og:image:type" content="image/jpeg">\n    <meta property="og:image:width" content="1200">\n    <meta property="og:image:height" content="630">\n    <meta property="og:image:alt" content="${route.alt}">\n    <!-- Secondary OG Image (1080x1080 Square Fallback) -->\n    <meta property="og:image" content="${full1080}">\n    <meta property="og:image:secure_url" content="${full1080}">\n    <meta property="og:image:type" content="image/jpeg">\n    <meta property="og:image:width" content="1080">\n    <meta property="og:image:height" content="1080">\n    <meta property="og:image:alt" content="${route.alt}">\n\n    <!-- Twitter Card -->`
      );
    }

    // 5. Update Canonical link, Robots & Self-Referencing Hreflang
    const isPrivateNoindex = [
      "/admin/", "/panier/", "/checkout/", "/commande/", "/compte/", "/activation/", "/en-attente/"
    ].some((prefix) => normalized.startsWith(prefix)) || normalized.startsWith("/newsletter/");
    const isPathologyNoindex = isPathologyNoindexPath(normalized) || Boolean(route.noindex);
    const isEnRoute = isEnLocalePath(normalized);
    const isNoindexRoute = isPrivateNoindex || isPathologyNoindex;

    const robotsValue = isNoindexRoute
      ? "noindex, nofollow"
      : isEnRoute
        ? "noindex, follow"
        : "index, follow, max-image-preview:large, max-video-preview:-1, max-snippet:-1";
    if (/<meta\s+name=["']robots["'][^>]*>/i.test(updated)) {
      updated = updated.replace(/<meta\s+name=["']robots["'][^>]*>/i, `<meta name="robots" content="${robotsValue}" />`);
    } else {
      updated = updated.replace("</head>", `  <meta name="robots" content="${robotsValue}" />\n  </head>`);
    }

    if (/<link\s+rel=["']canonical["']\s+href=["'].*?["']\s*\/?>/i.test(updated)) {
      updated = updated.replace(/<link\s+rel=["']canonical["']\s+href=["'].*?["']\s*\/?>/i, `<link rel="canonical" href="${canonical}" />`);
    } else {
      updated = updated.replace("</head>", `  <link rel="canonical" href="${canonical}" />\n  </head>`);
    }

    updated = updated.replace(/<link\s+rel=["']alternate["']\s+hreflang=["'].*?["']\s+href=["'].*?["']\s*\/?>\s*/gi, "");
    const selfHreflang = `<link rel="alternate" hreflang="fr" href="${canonical}" />\n    <link rel="alternate" hreflang="x-default" href="${canonical}" />`;
    updated = updated.replace("</head>", `  ${selfHreflang}\n  </head>`);

    // 6. Update Twitter Cards
    updated = updated.replace(/<meta\s+name=["']twitter:title["']\s+content=["'].*?["']\s*\/?>/i, `<meta name="twitter:title" content="${route.title}">`);
    updated = updated.replace(/<meta\s+name=["']twitter:description["']\s+content=["'].*?["']\s*\/?>/i, `<meta name="twitter:description" content="${route.description}">`);
    updated = updated.replace(/<meta\s+name=["']twitter:image["']\s+content=["'].*?["']\s*\/?>/i, `<meta name="twitter:image" content="${full1200}">`);
    updated = updated.replace(/<meta\s+name=["']twitter:image:alt["']\s+content=["'].*?["']\s*\/?>/i, `<meta name="twitter:image:alt" content="${route.alt}">`);

    // 7. Dynamic JSON-LD injection
    let schemaJson = "";
    if (normalized === "/recettes/culinaires/soupe-beaute-tremella/") {
      const recipeData = {
        "@context": "https://schema.org",
        "@type": "Recipe",
        "name": "L'Élixir de Beauté : La Soupe au Champignon des Neiges (Tremella) à la BloomLab",
        "description": route.description,
        "image": [full1200],
        "datePublished": "2026-11-18",
        "prepTime": "PT4H15M",
        "cookTime": "PT1H",
        "totalTime": "PT5H15M",
        "recipeYield": "800 ml (3 à 4 tasses)",
        "recipeCategory": "Atelier Culinaire · Recette MTC",
        "recipeCuisine": "Médecine Traditionnelle Chinoise",
        "keywords": "soupe tremella beauté, recette soupe champignon blanc MTC, bienfaits longan MTC, soupe tremella sommeil, poire ou pomme tisane, graines de lotus bienfaits, recette yin beauté, recette BloomLab, collagène végétal",
        "author": {
          "@type": "Organization",
          "name": "Bloom by BotaniK",
          "url": "https://bloombybotanik.com"
        }
      };
      schemaJson = JSON.stringify(recipeData);
    } else if (normalized === "/academie/reset-homeostasique/phycocyanine/") {
      const phycoRecipeData = {
        "@context": "https://schema.org",
        "@type": "Recipe",
        "name": "Phycocyanine & Reset Homéostasique : Le Bleu qui Réinitialise votre Biologie",
        "description": route.description,
        "image": [full1200],
        "datePublished": "2026-11-18",
        "prepTime": "PT10M",
        "cookTime": "PT1H",
        "totalTime": "PT1H10M",
        "recipeYield": "800 ml d'extrait liquide concentré",
        "recipeCategory": "Reset Homéostasique · Extraction Botanique",
        "keywords": "phycocyanine Reset Homéostasique, extraction phycocyanine BloomLab, recette spiruline MTC, bienfaits phycocyanine, protocole détox spiruline",
        "author": {
          "@type": "Organization",
          "name": "Bloom by BotaniK",
          "url": "https://bloombybotanik.com"
        }
      };
      schemaJson = JSON.stringify(phycoRecipeData);
    } else if (normalized === "/academie/pouvoir-cyclique-femme/") {
      const womenArticleData = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "Le Pouvoir Cyclique et Sacré de la Femme",
        "description": route.description,
        "image": [full1200],
        "datePublished": "2026-11-18",
        "dateModified": "2026-11-18",
        "isAccessibleForFree": true,
        "keywords": "manuscrit de Voynich femme, post-partum dépression naturelle, ménopause chute hormonale symptômes, sagesse féminine manuscrits hérétiques, biologie de la fécondation, plantes ménopause",
        "author": {
          "@type": "Organization",
          "name": "Bloom by BotaniK",
          "url": "https://bloombybotanik.com"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Bloom by BotaniK",
          "url": "https://bloombybotanik.com"
        }
      };
      schemaJson = JSON.stringify(womenArticleData);
    } else if (route.type === "article") {
      const articleData: any = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": route.title,
        "description": route.description,
        "image": [full1200, full1080],
        "datePublished": (route as any).datePublished || "2026-09-01T08:00:00+02:00",
        "dateModified": (route as any).dateModified || "2026-11-18T10:00:00+01:00",
        "author": {
          "@type": "Organization",
          "name": "Bloom by BotaniK",
          "url": "https://bloombybotanik.com"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Bloom by BotaniK",
          "logo": {
            "@type": "ImageObject",
            "url": "https://bloombybotanik.com/assets/img/logo-bloom-square-512.png",
            "width": 512,
            "height": 512
          }
        },
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": canonical
        }
      };

      if ((route as any).isPaywalled) {
        articleData.isAccessibleForFree = false;
        articleData.hasPart = {
          "@type": "WebPageElement",
          "isAccessibleForFree": false,
          "cssSelector": ".premium-paywall-content"
        };
      }

      schemaJson = JSON.stringify(articleData);
    } else if (route.type === "product" && canonicalPath === "/bloomlab/") {
      const isBloomLabProduct = route.sku === "BLOOMLAB-V2";
      const bloomLabImages = [
        "https://bloombybotanik.com/images/1.png",
        "https://bloombybotanik.com/images/2.png",
        "https://bloombybotanik.com/images/8.png",
        "https://bloombybotanik.com/img/produit/bloomlab-face-1200x1200.jpg"
      ];
      const productPayload: Record<string, any> = {
        "@context": "https://schema.org",
        "@type": "Product",
        "@id": `${canonical}#product`,
        "name": isBloomLabProduct ? "BloomLab® — Extracteur Botanique de Précision" : route.title,
        "description": route.description,
        "image": isBloomLabProduct ? bloomLabImages : [full1080, full1200],
        "sku": route.sku || "BLOOM-PROD",
        "mpn": route.sku || "BLOOM-PROD",
        "brand": {
          "@type": "Brand",
          "name": "Bloom by BotaniK"
        },
        "offers": {
          "@type": "Offer",
          "url": canonical,
          "priceCurrency": "EUR",
          "price": route.price || "29.00",
          "priceValidUntil": "2026-12-31",
          "itemCondition": "https://schema.org/NewCondition",
          "availability": "https://schema.org/InStock",
          "seller": {
            "@type": "Organization",
            "name": "Bloom by BotaniK"
          },
          "shippingDetails": {
            "@type": "OfferShippingDetails",
            "shippingRate": {
              "@type": "MonetaryAmount",
              "value": (route.sku && route.sku.includes("BLOOMLAB")) ? "7.90" : "5.90",
              "currency": "EUR"
            },
            "shippingDestination": {
              "@type": "DefinedRegion",
              "addressCountry": "FR"
            },
            "deliveryTime": {
              "@type": "ShippingDeliveryTime",
              "handlingTime": {
                "@type": "QuantitativeValue",
                "minValue": 1,
                "maxValue": 2,
                "unitCode": "DAY"
              },
              "transitTime": {
                "@type": "QuantitativeValue",
                "minValue": 2,
                "maxValue": 4,
                "unitCode": "DAY"
              }
            }
          },
          "hasMerchantReturnPolicy": {
            "@type": "MerchantReturnPolicy",
            "applicableCountry": "FR",
            "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
            "merchantReturnDays": 14,
            "returnMethod": "https://schema.org/ReturnByMail",
            "returnFees": "https://schema.org/ReturnShippingFees"
          }
        }
      };
      if (isBloomLabProduct) {
        productPayload.aggregateRating = {
          "@type": "AggregateRating",
          "ratingValue": "4.3",
          "reviewCount": "7",
          "bestRating": "5",
          "worstRating": "1"
        };
      }
      schemaJson = JSON.stringify(productPayload);
    } else if (normalized === "/questions-frequentes/" || normalized === "/faq/") {
      const faqPageData = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "@id": "https://bloombybotanik.com/questions-frequentes/#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Qu'est-ce que la charge allostatique ?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "La charge allostatique est l'usure biologique accumulée par le corps lorsqu'il doit s'adapter trop souvent, trop longtemps, à trop de stress à la fois (émotionnels, hormonaux, inflammatoires, toxiques, métaboliques). Quand cette charge dépasse sa capacité de récupération, le corps ne revient plus à l'équilibre : c'est là que les symptômes s'installent. Analogie : Le problème n'est pas la paille qui a fait plier le dos de l'âne, mais le fardeau déjà présent sur son dos."
            }
          },
          {
            "@type": "Question",
            "name": "Quelle différence entre stress et charge allostatique ?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Le stress est la réaction ponctuelle d'adaptation d'un organisme face à un défi immédiat. La charge allostatique est le prix cumulatif et silencieux de cette adaptation répétée dans le temps, lorsque les périodes de repos font défaut et que les systèmes de régulation finissent par s'épuiser."
            }
          },
          {
            "@type": "Question",
            "name": "Peut-on réduire sa charge allostatique ?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Oui, en accompagnant le terrain biologique (profil de vulnérabilité génétique, épigénétique et allostatique) par des gestes de décharge ciblés : respecter le sommeil circadien, soutenir les voies d'élimination émonctorielles (foie, reins, intestins), apaiser les cascades inflammatoires de bas grade par des synergies végétales de haute précision et restaurer la variabilité du système nerveux autonome. Cette démarche ne remplace pas un avis médical."
            }
          },
          {
            "@type": "Question",
            "name": "Faut-il des compétences particulières en herboristerie pour utiliser BloomLab® ?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Absolument pas. BloomLab® a été conçu pour guider chaque étape avec une ergonomie intuitive. Nos protocoles documentés et notre bibliothèque de recettes indiquent la température, le solvant adapté (eau, huile végétale ou glycérine végétale) et la durée indicative pour chaque plante."
            }
          },
          {
            "@type": "Question",
            "name": "Pourquoi une régulation thermique douce est-elle importante ?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Certains principes végétaux (flavonoïdes, terpènes, polyphénols) sont sensibles à la chaleur excessive : au-delà de seuils variables selon les espèces, ils se dénaturent ou s'évaporent. La BloomLab® utilise une régulation thermique dont la valeur nominale annoncée par le fabricant est de ±0,5°C (sans certification métrologique par laboratoire tiers)."
            }
          },
          {
            "@type": "Question",
            "name": "Comment se déroule le nettoyage et l'entretien de l'appareil ?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "La cuve en acier Inoxydable 304 certifié contact alimentaire et le panier filtrant micro-perforé se nettoient en moins de deux minutes à l'eau tiède avec un savon doux naturel. Un cycle d'auto-nettoyage rapide à l'eau chaude permet également un rinçage impeccable entre deux préparations botaniques."
            }
          },
          {
            "@type": "Question",
            "name": "La BloomLab presse-t-elle les graines pour extraire de l'huile ?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Non — c'est un infuseur/extracteur basse température qui aromatise et extrait par macération contrôlée ; elle ne remplace pas une presse à huile."
            }
          },
          {
            "@type": "Question",
            "name": "Faut-il un temps d'adaptation pour maîtriser les réglages ?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Oui, compter quelques préparations ; le guide 100 recettes, le démarrage rapide et les vidéos accompagnent les premiers cycles."
            }
          },
          {
            "@type": "Question",
            "name": "Quelle est la différence entre une tisane classique, un bain-marie et BloomLab® ?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "L'eau bouillante d'une tisane classique fragilise certains arômes volatils tout en laissant peu extraits les composés liposolubles. Le bain-marie traditionnel est difficile à stabiliser à basse température. BloomLab® régule en continu la température, la durée et l'agitation douce en chambre fermée sans ébullition."
            }
          },
          {
            "@type": "Question",
            "name": "Quels solvants peut-on employer dans la cuve d'extraction ?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Dans la cuve en acier inoxydable de la BloomLab®, vous pouvez employer de l'eau filtrée, des huiles végétales vierges, du beurre, de la glycérine végétale bio ainsi que de l'alcool alimentaire dans le respect strict du manuel : le programme prédéfini Tincture (71 °C / 160 °F et 4 h par défaut, réglable manuellement en température et durée selon la plante) s'applique aux préparations alcooliques (exemple du manuel ≥ 75 % vol. / 150 proof sans ajout d'eau ni de lécithine). Les vapeurs d'éthanol étant déjà inflammables à basse température (point d'éclair 13 °C pur, 21 °C à 70 %), travaillez uniquement en pièce bien ventilée, loin de toute flamme, couvercle verrouillé et entre MIN et MAX ; pour les dilutions hydro-alcooliques à l'eau (45° à 70°), utilisez un bocal hermétique hors appareil à l'abri de la chaleur et de toute flamme (ne pas chauffer d'alcool dilué à l'eau dans la cuve ; le bouton Sans chauffe est un mode à température non réglable réservé aux mélanges froids type vinaigrette). Ne jamais laisser l'appareil sans surveillance en fonctionnement ni lorsqu'il est branché."
            }
          },
          {
            "@type": "Question",
            "name": "Qu'appelle-t-on la méthode séquentielle A/B ?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Certaines plantes nécessitent des températures ou des solvants distincts pour révéler toutes leurs vertus. La méthode séquentielle A/B permet d'extraire d'abord la fraction la plus sensible (fleurs tendres ou composés volatils du Sachet A à basse température), puis la fraction dense (racines, écorces ou résines du Sachet B à température supérieure), avant réunion synergique du Totum."
            }
          },
          {
            "@type": "Question",
            "name": "Quelles sont les trois dimensions d'usage au quotidien ?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "1. Culinaire : huiles infusées gastronomiques, vinaigres botaniques et beurres aromatiques d'exception. 2. Cosmétique : sérums visage purs, macérats régénérants sans conservateurs synthétiques. 3. Systémique : protocoles d'extraits concentrés pour soutenir le terrain biologique et la vitalité naturelle."
            }
          },
          {
            "@type": "Question",
            "name": "Peut-on utiliser ses propres plantes du jardin ou de cueillette locale ?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Oui, tout à fait ! BloomLab® est un instrument d'autonomie botanique. Vous pouvez utiliser vos propres récoltes séchées avec soin, des plantes d'herboristerie biologique certifiée, ou nos kits pré-dosés grade Totum."
            }
          },
          {
            "@type": "Question",
            "name": "Quels sont les délais d'expédition et de livraison ?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Toutes les commandes sont expédiées sous 24 à 48 heures ouvrées depuis notre atelier logistique en France métropolitaine. La livraison est effectuée via Colissimo suivi à domicile ou en point relais Mondial Relay avec numéro de suivi en temps réel."
            }
          },
          {
            "@type": "Question",
            "name": "Quelle est la garantie de la machine BloomLab® ?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "L'extracteur BloomLab® bénéficie de la garantie légale de conformité de 2 ans (UE), avec support et SAV basés en France."
            }
          },
          {
            "@type": "Question",
            "name": "Quels modes de paiement sont proposés ?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Le règlement est traité par carte bancaire via Stripe et via PayPal selon les options affichées lors du passage en caisse (le paiement fractionné dépend de l'éligibilité PayPal proposée au checkout)."
            }
          },
          {
            "@type": "Question",
            "name": "Quelles sont les conditions de rétractation et de retour ?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Vous bénéficiez du droit légal de rétractation de 14 jours à compter de la réception, ainsi que d'une fenêtre commerciale d'essai de 30 jours selon les conditions détaillées sur la page Livraison & Retours."
            }
          }
        ]
      };
      schemaJson = JSON.stringify(faqPageData);
    }

    if (schemaJson) {
      const scriptTag = `<script type="application/ld+json" id="bloom-ssr-schema">\n${schemaJson}\n    </script>`;
      updated = updated.replace("</head>", `    ${scriptTag}\n  </head>`);
    }

    // 8. Semantic SSR Fallback inside #root for Googlebot & crawlers (cleanly replaced by React createRoot on hydration)
    if (!isNoindexRoute && /<div id=["']root["']><\/div>/i.test(updated)) {
      const escapeHtml = (val: string) =>
        val
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;");
      const productSnippet = canonicalPath === "/bloomlab/" && route.type === "product" && route.price
        ? `<p><strong>Marque :</strong> Bloom by BotaniK · <strong>Prix :</strong> ${escapeHtml(route.price)} EUR · <strong>Disponibilité :</strong> En stock (expédition 24-48h depuis la France)</p>`
        : "";
      const summaryHtml = route.ssrSummaryHtml
        ? `<p style="font-size:15px;line-height:1.65;color:#2E3B30;margin-bottom:16px;">${escapeHtml(route.ssrSummaryHtml)}</p>`
        : "";
      const ssrImages = (route.images && route.images.length > 0)
        ? route.images
        : [{ url: route.image1200, alt: route.alt }];
      const imagesHtml = ssrImages
        .map((img) => {
          const absSrc = img.url.startsWith("http") ? img.url : `https://bloombybotanik.com${img.url}`;
          return `<figure style="margin:0;">
              <img src="${escapeHtml(absSrc)}" alt="${escapeHtml(img.alt)}" loading="eager" style="width:100%;height:auto;border-radius:12px;display:block;" />
              ${img.caption ? `<figcaption style="font-size:12px;color:#5A6659;margin-top:6px;">${escapeHtml(img.caption)}</figcaption>` : ""}
            </figure>`;
        })
        .join("\n            ");
      const ssrFallback = `<div id="root">
      <div class="bloom-ssr-fallback" style="max-width:960px;margin:0 auto;padding:32px 20px;font-family:Inter,system-ui,sans-serif;color:#1E2E25;background:#F9F6F0;">
        <header style="border-bottom:1px solid #E7DFD3;padding-bottom:16px;margin-bottom:24px;">
          <a href="/" style="font-weight:800;font-size:18px;color:#1E2E25;text-decoration:none;">Bloom by BotaniK</a>
          <nav aria-label="Navigation principale" style="margin-top:12px;display:flex;flex-wrap:wrap;gap:14px;font-size:14px;">
            <a href="/bloomlab/">Extracteur BloomLab®</a>
            <a href="/boutique/">Boutique</a>
            <a href="/boutique/kits/">Kits Plantes Bio</a>
            <a href="/boutique/duo-argiles/">Duo Argiles</a>
            <a href="/extraction-botanique/">Méthode A/B &amp; Extraction</a>
            <a href="/infusion-botanique-maison-comment-ca-marche/">Infusion Botanique</a>
            <a href="/guide-solvants/">Guide des Solvants</a>
            <a href="/recettes/">Recettes Botaniques</a>
            <a href="/recettes/culinaires/soupe-beaute-tremella/">Soupe Tremella</a>
            <a href="/academie/">Académie Bloom</a>
            <a href="/academie/pouvoir-cyclique-femme/">Pouvoir Cyclique Femme</a>
            <a href="/academie/reset-homeostasique/">Reset Homéostasique</a>
            <a href="/academie/reset-homeostasique/phycocyanine/">Phycocyanine 40°C</a>
            <a href="/academie/herbier/">Herbier Botanique</a>
            <a href="/blog/">Journal Botanique</a>
            <a href="/articles/">Articles &amp; Savoirs</a>
            <a href="/la-marque/">La Marque</a>
            <a href="/contact/">Contact</a>
          </nav>
        </header>
        <main>
          <h1 style="font-size:28px;font-weight:800;line-height:1.25;margin-bottom:12px;">${escapeHtml(route.h1 || route.title)}</h1>
          <p style="font-size:16px;line-height:1.6;margin-bottom:16px;">${escapeHtml(route.description)}</p>
          ${summaryHtml}
          ${productSnippet}
          <div class="bloom-ssr-gallery" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:16px;margin:20px 0;">
            ${imagesHtml}
          </div>
          <p style="font-size:14px;color:#3E4A3D;">Bloom by BotaniK conçoit l&apos;extracteur botanique de précision BloomLab® (inox 304, régulation thermique nominale ±0,5 °C annoncée par le fabricant, agitation douce) ainsi que des dossiers pédagogiques d&apos;extraction végétale pour préserver le Totum des plantes.</p>
          <nav aria-label="Explorer Bloom" style="margin-top:24px;padding-top:16px;border-top:1px solid #E7DFD3;">
            <h2 style="font-size:14px;font-weight:800;text-transform:uppercase;letter-spacing:0.12em;margin-bottom:10px;">Explorer Bloom</h2>
            <ul style="list-style:none;padding:0;margin:0;display:flex;flex-wrap:wrap;gap:12px;font-size:14px;">
              <li><a href="/bloomlab/">Découvrir la BloomLab</a></li>
              <li><a href="/extraction-botanique/">Guide d&apos;extraction</a></li>
              <li><a href="/infusion-botanique-maison-comment-ca-marche/">Infusion Botanique</a></li>
              <li><a href="/remedes-naturels/">Préparations Maison</a></li>
              <li><a href="/academie/reset-homeostasique/">Reset Homéostasique</a></li>
              <li><a href="/guide-solvants/">Guide des Solvants</a></li>
              <li><a href="/academie/">Académie</a></li>
              <li><a href="/boutique/">Boutique</a></li>
            </ul>
          </nav>
        </main>
      </div>
    </div>`;
      updated = updated.replace(/<div id=["']root["']><\/div>/i, ssrFallback);
    }

    return { html: updated, statusCode: 200 };
  } catch (err) {
    console.error("[injectServerSEO error]", err);
    return { html, statusCode: 200 };
  }
}

/* ----------------------------------------------------------------------------
 * CATCH-ALL SPA (APRÈS Vite)
 * -------------------------------------------------------------------------- */
function registerCatchAll(app: express.Express, isProd: boolean) {
  const distPath = path.join(process.cwd(), "dist");
  const distIndex = path.join(distPath, "index.html");
  const rootIndex = path.join(process.cwd(), "index.html");

  app.use(express.static(distPath, {
    index: false,
    maxAge: "1y",
    immutable: true,
  }));

  app.get("*", async (req, res, next) => {
    try {
      if (req.path.startsWith("/@") || req.path.startsWith("/src/") || req.path.startsWith("/node_modules/")) {
        if (!isProd) return next();
        return res.status(404).send("Not found");
      }
      if (req.path.startsWith("/api") || /\.[a-z0-9]{2,5}$/i.test(req.path)) {
        return next();
      }

      const normCatch = (req.path.replace(/\/$/, "") + "/").replace(/^\/\/$/, "/");
      const isPrivateRoute = [
        "/admin/", "/panier/", "/checkout/", "/commande/", "/compte/", "/activation/", "/en-attente/", "/newsletter/"
      ].some((prefix) => normCatch.startsWith(prefix));
      const catchRouteMeta = getRouteMeta(normCatch);
      const isStrictNoindexCatch = isPrivateRoute || isPathologyNoindexPath(normCatch) || Boolean(catchRouteMeta?.noindex);
      const xRobotsTag = isStrictNoindexCatch
        ? "noindex, nofollow"
        : isEnLocalePath(normCatch)
          ? "noindex, follow"
          : "index, follow, max-image-preview:large, max-video-preview:-1, max-snippet:-1";

      if (req.path.startsWith("/recettes") || req.path.startsWith("/articles/") || req.path.startsWith("/blog/")) {
        await ensureSsrModules();
      }

      if (isProd && fs.existsSync(distIndex)) {
        let rawHtml = fs.readFileSync(distIndex, "utf-8");
        const { html: finalHtml, statusCode } = injectServerSEO(rawHtml, req.path);
        return res.status(statusCode)
          .set({
            "Content-Type": "text/html; charset=utf-8",
            "Cache-Control": "no-cache, must-revalidate",
            "X-Robots-Tag": statusCode === 404 ? "noindex, nofollow" : xRobotsTag,
          })
          .end(finalHtml);
      } else if (fs.existsSync(rootIndex)) {
        let rawHtml = fs.readFileSync(rootIndex, "utf-8");
        rawHtml = rawHtml.replace(/<script type="module" src="\/@vite\/client"><\/script>/g, '');
        rawHtml = rawHtml.replace(/<script\b[^>]*src=["']\/@vite\/client["'][^>]*><\/script>/gi, '');
        const { html: finalHtml, statusCode } = injectServerSEO(rawHtml, req.path);
        return res.status(statusCode)
          .set({
            "Content-Type": "text/html; charset=utf-8",
            "Cache-Control": "no-cache, must-revalidate",
            "X-Robots-Tag": statusCode === 404 ? "noindex, nofollow" : xRobotsTag,
          })
          .end(finalHtml);
      }
      return res.status(404).send("Index not found");
    } catch (err: any) {
      if (!isProd && viteDevServer) viteDevServer.ssrFixStacktrace(err);
      console.error("[CatchAll Error]", err);
      res.status(500).send("Internal Server Error");
    }
  });
}

/* ----------------------------------------------------------------------------
 * ERROR HANDLER GLOBAL
 * -------------------------------------------------------------------------- */
function errorHandler(err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
  if (res.headersSent) return next(err);
  console.error("[Global Error]", req.method, req.originalUrl, err);
  res.status(err.status || 500).json({
    error: IS_PROD ? "Une erreur interne est survenue sur le serveur." : err.message || "Internal Server Error",
  });
}

/* ----------------------------------------------------------------------------
 * START + GRACEFUL SHUTDOWN + PROCESS SAFETY
 * -------------------------------------------------------------------------- */
async function startServer() {
  if (!IS_PROD) {
    app.get(["/blog/vieillissement-myeline-fgf17.html", "/blog/vieillissement-myeline-fgf17/index.html", "/blog/vieillissement-myeline-fgf17-clarte-mentale.html"], (req, res) => {
      res.set("Cache-Control", "no-store");
      res.redirect(301, "/blog/vieillissement-myeline-fgf17-clarte-mentale/");
    });
    app.get(["/protocoles/clarte-mentale.html", "/protocoles/myeline.html", "/protocoles/myeline/index.html"], (req, res) => {
      res.set("Cache-Control", "no-store");
      res.redirect(301, "/academie/protocoles/clarte-mentale/");
    });

    const vitePromise = setupVite(app)
      .then((vite) => {
        viteDevServer = vite;
        console.log("Vite middleware attached in dev");
        return vite;
      })
      .catch((err) => {
        console.error("[Vite setup error]", err);
        return null;
      });

    app.use(async (req, res, next) => {
      if (req.path.startsWith("/api/") || req.path === "/health") {
        return next();
      }
      const vite = viteDevServer || (await vitePromise);
      if (vite) {
        return vite.middlewares(req, res, next);
      }
      next();
    });
  }

  registerAppRoutes(app);

  registerCatchAll(app, IS_PROD);
  app.use(errorHandler);

  const server = app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server listening on http://0.0.0.0:${PORT} (${IS_PROD ? "production" : "development"})`);
    setTimeout(() => { ensureSsrModules(); }, 4000).unref();
  });

  const shutdown = (signal: string) => {
    console.log(`[Shutdown] ${signal} reçu, fermeture gracieuse…`);
    server.close(() => {
      console.log("[Shutdown] Fermeture propre terminée.");
      process.exit(0);
    });
    setTimeout(() => process.exit(0), 10_000).unref();
  };
  process.on("SIGTERM", () => shutdown("SIGTERM"));
  process.on("SIGINT", () => shutdown("SIGINT"));
}

process.on("unhandledRejection", (reason, promise) => {
  console.error("[Process Safety] Unhandled Rejection at:", promise, "reason:", reason);
});
process.on("uncaughtException", (err) => {
  console.error("[Process Safety] Uncaught Exception thrown:", err);
});

startServer().catch((err) => {
  console.error("Critical server startup error:", err);
  process.exit(1);
});