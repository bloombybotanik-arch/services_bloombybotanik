# 🛑 GOLDEN MASTER - FICHIER DE RESTAURATION BLOOM BY BOTANIK
Ce fichier contient la version stable du site.
En cas d'écran blanc ou de bug critique, demandez à l'IA de 'Restaurer le projet depuis GOLDEN_MASTER_BACKUP.md'.

Date de création : 2026-11-09T08:41:38.193Z

---

## server.ts (Le serveur Express et les routes API)
Chemin : `server.ts`

```typescript
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
import multer from "multer";
import nodemailer from "nodemailer";
import { jsPDF } from "jspdf";
import Stripe from "stripe";
import { GoogleGenAI } from "@google/genai";
import { initializeApp, getApps, cert, applicationDefault } from "firebase-admin/app";
import { getFirestore, Firestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";
import dotenv from "dotenv";
import { NewsletterOrchestrator } from "./server/newsletter-orchestrator";
import { 
  renderRecipePageHtml, 
  renderCategoryPageHtml, 
  renderHubPageHtml 
} from "./src/server/recipeSsrRenderer";
import { 
  renderHerbierRecipePageHtml, 
  renderHerbierCategoryPageHtml 
} from "./src/server/herbierRecipeSsrRenderer";
import { getRecipeByPath } from "./src/data/canonicalRecipesRegistry";
import { getHerbierRecipeByPath } from "./src/data/herbierRecipesRegistry";

dotenv.config();

/* Dépendances optionnelles (dégradation gracieuse) */
const optionalRequire = (id: string): any => {
  try { return require(id); } catch { return null; }
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
function getDb(): Firestore {
  if (!db) {
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
    db = getFirestore();
  }
  return db;
}

async function requireAdmin(req: express.Request, res: express.Response, next: express.NextFunction) {
  const header = req.get("authorization") || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) return res.status(401).json({ error: "Authentification requise" });
  try {
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
const getStripe = (): Stripe => {
  if (!stripeInstance) {
    const apiKey = process.env.STRIPE_SECRET_KEY;
    if (!apiKey) throw new Error("STRIPE_SECRET_KEY is missing");
    stripeInstance = new Stripe(apiKey, { apiVersion: "2023-10-16" as any });
  }
  return stripeInstance;
};

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: process.env.SMTP_SECURE === "true",
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
});

const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-1.5-flash";
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
  httpOptions: { headers: { "User-Agent": "aistudio-build" } },
});

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
});

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
    event = getStripe().webhooks.constructEvent(req.body, sig as string, process.env.STRIPE_WEBHOOK_SECRET || "");
  } catch (err: any) {
    console.error(`[Stripe Webhook] Signature verification failed: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
  try {
    if (event.type === "payment_intent.succeeded" || event.type === "checkout.session.completed") {
      const obj: any = event.data.object;
      const orderId = obj.metadata?.orderId;
      if (orderId) {
        const orderDoc = await getDb().collection("orders").doc(orderId).get();
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

QUALITÉ ET BIODISPONIBILITÉ (GRADE PHARMACIE) :
Rassure systématiquement sur la qualité Bloom (biodisponibilité maximale) via ces 4 critères :
1. Sourcing certifié Bio.
2. Ramassage à la main respectueux.
3. Séchage à très basse température (préservation des actifs thermosensibles).
4. Pureté de qualité herboristerie professionnelle.

STRATÉGIE COMMERCIALE :
Propose systématiquement deux options d'achat :
- Option A : Le "Remède du Reset" (synergie de plusieurs plantes de la liste pour une approche systémique du terrain).
- Option B : Sachets de plantes individuelles (besoin ciblé ou complément d'herbier).

CROSS-SELLING SYSTÉMIQUE :
À chaque recommandation de plantes, suggère d'associer le "Duo Argiles Bloom — Purification Systémique Zeolithe-Bentonite" (mélange Zéolithe/Bentonite 70:30).
Argument : "Pour que votre organisme assimile parfaitement les extraits de ces plantes de haute qualité, il est primordial de détoxifier vos émonctoires au préalable grâce à la chélation minérale de notre Duo Argiles Bloom."

MODULE D'EXPERTISE EN EXTRACTION (CALCULATEUR) :
Si l'utilisateur interroge sur une extraction ou un dosage :
1. Demande-lui systématiquement le volume final souhaité (en ml).
2. Une fois le volume reçu, calcule et affiche les dosages précis selon ces règles (base alcool 96°) :
   - Cible 45° (Fleurs, mucilages, parties tendres) : Alcool 96° = Volume * 0.469 | Eau distillée = Volume * 0.531
   - Cible 55° (Racines, écorces, plantes aromatiques) : Alcool 96° = Volume * 0.573 | Eau distillée = Volume * 0.427
   - Cible 60° (Résines, graines dures, huiles essentielles) : Alcool 96° = Volume * 0.625 | Eau distillée = Volume * 0.375
3. Précise toujours que ces calculs sont optimisés pour l'infuseur BloomLab afin de préserver le Totum.

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
  "bloomlab": 239.00,
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
  const firestore = getDb();
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

  app.get(["/blog/vieillissement-myeline-fgf17-clarte-mentale", "/blog/vieillissement-myeline-fgf17-clarte-mentale/", "/blog/vieillissement-myeline-fgf17-clarte-mentale.html", "/blog/vieillissement-myeline-fgf17.html", "/blog/vieillissement-myeline-fgf17/index.html"], (req, res) => {
    res.sendFile(path.join(process.cwd(), "public", "blog", "vieillissement-myeline-fgf17-clarte-mentale.html"));
  });
  app.get(["/protocoles/clarte-mentale", "/protocoles/clarte-mentale/", "/protocoles/clarte-mentale.html", "/protocoles/myeline.html", "/protocoles/myeline/index.html"], (req, res) => {
    res.sendFile(path.join(process.cwd(), "public", "protocoles", "clarte-mentale.html"));
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
    "/infusion-botanique": "/infusion-botanique-maison-comment-ca-marche/",
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
    "/contact": "/manifeste/",
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
    "/comprendre-le-modele-bloom": "/academie/",
    "/academie/comprendre-le-modele-bloom": "/academie/",
    "/academie/comprendre-le-corps/comment-lire-le-modele-bloom": "/academie/",
    "/abonnement": "/abonnement/",
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
      const firestore = getDb();
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
      const ref = getDb().collection("subscribers").doc(id as string);
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
      await getDb().collection("subscribers").doc(id as string).update({
        marketing_consent: false, email_status: "unsubscribed", updated_at: new Date().toISOString(),
      });
      res.send("<h1>Désinscription réussie</h1><p>Vous ne recevrez plus de newsletters de notre part.</p>");
    } catch {
      res.status(500).send("Erreur lors de la désinscription");
    }
  });

  /* --- NEWSLETTER ADMIN --- */
  const orchestrator = new NewsletterOrchestrator(process.env.GEMINI_API_KEY!);
  app.post("/api/admin/newsletter/generate", requireAdmin, async (req, res) => {
    try {
      const { season, context_data } = req.body || {};
      const sharedMemory: any = await orchestrator.generateNewsletter({ season, ...(context_data || {}) });
      const firestore = getDb();
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
      await getDb().collection("newsletter_campaigns").doc(campaignId).update({
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
      const result = await ai.models.generateContent({
        model: GEMINI_MODEL,
        contents,
        config: { systemInstruction: BOT_SYSTEM_INSTRUCTION, responseMimeType: "application/json" },
      });
      const responseText = (result as any).text || "{}";
      let data: any;
      try { data = JSON.parse(responseText); }
      catch { data = { answer: responseText, concern: {} }; }
      try {
        await getDb().collection("customer_concerns").add({
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
  app.post("/api/activate-bloomlab", createRateLimiter(60_000, 5), upload.single("invoice") as any, async (req: express.Request, res: express.Response) => {
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
      const result = await ai.models.generateContent({
        model: GEMINI_MODEL,
        contents: [{ parts: [imagePart, { text: prompt }] }],
        config: { responseMimeType: "application/json" },
      });
      const analysis: any = JSON.parse((result as any).text || "{}");
      if (analysis.est_bloomlab && !analysis.offre_expiree) {
        const firestore = getDb();
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
      const firestore = getDb();
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
      const paymentIntent = await getStripe().paymentIntents.create({
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
      await getDb().collection("orders").doc(orderId).set({
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
      const orderDoc = await getDb().collection("orders").doc(orderId).get();
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
      const firestore = getDb();
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
interface ServerSEORoute {
  title: string;
  description: string;
  image1200: string;
  image1080: string;
  alt: string;
  type: "website" | "article" | "product";
  price?: string;
  sku?: string;
  isPaywalled?: boolean;
  datePublished?: string;
  dateModified?: string;
}

const SERVER_SEO_ROUTES: Record<string, ServerSEORoute> = {
  "/": {
    title: "Extracteur Botanique BloomLab® | Infusion Précision",
    description: "Découvrez l'extracteur et infuseur botanique de précision BloomLab®. Vortex cinétique et thermorégulation ±0,5°C pour extraire le Totum actif de vos plantes.",
    image1200: "/images/og/bloom-extracteur-infuseur-botanique-1200x630.jpg",
    image1080: "/images/og/bloom-extracteur-infuseur-botanique-1080x1080.jpg",
    alt: "BloomLab® — extracteur et infuseur botanique de précision Bloom by BotaniK en situation",
    type: "website"
  },
  "/bloomlab/": {
    title: "BloomLab® Extracteur Botanique | Totum Végétal Préservé — 239€",
    description: "Extracteur et infuseur botanique BloomLab® : inox chirurgical 304, vortex cinétique, thermorégulation ±0,5°C pour extraire le Totum intégral de vos plantes à la maison.",
    image1200: "/images/og/produit-bloomlab-1200x630.jpg",
    image1080: "/images/og/produit-bloomlab-1080x1080.jpg",
    alt: "Extracteur et infuseur botanique BloomLab® en acier inoxydable 304",
    type: "product",
    price: "239.00",
    sku: "BLOOMLAB-V2"
  },
  "/infuseur-botanique/": {
    title: "Infuseur Botanique Précision | Tisanes Actives BloomLab®",
    description: "Pourquoi choisir un infuseur de précision plutôt qu'une théière ? Extraction douce en chambre close, thermorégulation active et préservation du Totum végétal.",
    image1200: "/images/og/infuseur-botanique-precision-bloomlab-1200x630.jpg",
    image1080: "/images/og/infuseur-botanique-precision-bloomlab-1080x1080.jpg",
    alt: "Infuseur botanique de précision et préparation de tisanes actives",
    type: "article"
  },
  "/extraction-botanique/": {
    title: "Extraction Botanique Guide | Totum & Séquençage A/B",
    description: "Guide complet de l'extraction végétale : extraction hydrothermique, solvants nobles, vortex cinétique et biodisponibilité sans dégradation moléculaire.",
    image1200: "/images/og/extraction-botanique-totum-solvants-1200x630.jpg",
    image1080: "/images/og/extraction-botanique-totum-solvants-1080x1080.jpg",
    alt: "Guide de l'extraction végétale, solvants et Totum botanique",
    type: "article"
  },
  "/infusion-botanique-maison-comment-ca-marche/": {
    title: "Infusion Botanique Maison | Principes Actifs & Méthode",
    description: "Comprendre l'infusion végétale de précision : seuils thermiques, cinétique d'agitation et préservation des molécules actives thermosensibles.",
    image1200: "/images/og/infusion-botanique-maison-extraction-active-1200x630.jpg",
    image1080: "/images/og/infusion-botanique-maison-extraction-active-1080x1080.jpg",
    alt: "Infusion botanique maison et extraction de principes actifs",
    type: "article"
  },
  "/phytotherapie-reset/": {
    title: "Reset Homéostasique | Protocoles Phytothérapie",
    description: "Phytothérapie intégrative et rééquilibrage du terrain : découvrez nos protocoles de reset homéostatique pour soutenir les capacités d'autorégulation.",
    image1200: "/images/og/phytotherapie-reset-homeostasie-terrain-1200x630.jpg",
    image1080: "/images/og/phytotherapie-reset-homeostasie-terrain-1080x1080.jpg",
    alt: "Phytothérapie systémique et protocoles de reset homéostasique",
    type: "article"
  },
  "/totum-vegetal/": {
    title: "Totum Végétal vs Molécules Isolées | Synergie des Plantes",
    description: "Pourquoi le Totum végétal surpasse les isolats : synergie biochimique, biodisponibilité accrue et effet tampon des principes actifs entiers.",
    image1200: "/images/og/totum-vegetal-synergie-plantes-medicinales-1200x630.jpg",
    image1080: "/images/og/totum-vegetal-synergie-plantes-medicinales-1080x1080.jpg",
    alt: "Le Totum végétal en phytothérapie et synergie moléculaire",
    type: "article"
  },
  "/plantes-adaptogenes/": {
    title: "Plantes Adaptogènes | Axe HPA, Cortisol & Résilience",
    description: "Ashwagandha, Rhodiola, Éleuthérocoque : guide pratique des plantes adaptogènes pour moduler le cortisol et soutenir l'axe neuro-endocrinien.",
    image1200: "/images/og/plantes-adaptogenes-axe-hpa-systeme-nerveux-1200x630.jpg",
    image1080: "/images/og/plantes-adaptogenes-axe-hpa-systeme-nerveux-1080x1080.jpg",
    alt: "Plantes adaptogènes pour réguler le stress et l'axe HPA",
    type: "article"
  },
  "/herbier/": {
    title: "Herbier Bloom | Plantes Médicinales & Adaptogènes",
    description: "Herbier interactif Bloom : explorez les monographies botaniques, principes actifs, températures optimales d'extraction et précautions d'usage.",
    image1200: "/images/og/herbier-plantes-medicinales-botanique-1200x630.jpg",
    image1080: "/images/og/herbier-plantes-medicinales-botanique-1080x1080.jpg",
    alt: "Herbier botanique interactif et fiches des plantes médicinales",
    type: "article"
  },
  "/cosmetique-botanique/": {
    title: "Cosmétique Botanique Maison | Macérats Huileux & Baumes",
    description: "Créez vos soins botaniques sur mesure : macérats huileux stables à 45°C, baumes concentrés et sérums actifs sans conservateurs agressifs.",
    image1200: "/images/og/cosmetique-botanique-macerat-huileux-1200x630.jpg",
    image1080: "/images/og/cosmetique-botanique-macerat-huileux-1080x1080.jpg",
    alt: "Cosmétique botanique maison, huiles de soin et macérats de précision",
    type: "article"
  },
  "/gastronomie-botanique/": {
    title: "Gastronomie Botanique | Huiles Aromatisées & Bouillons",
    description: "Gastronomie botanique de précision : créez des huiles infusées d'exception, vinaigres botaniques et bouillons actifs grâce au vortex cinétique BloomLab.",
    image1200: "/images/og/gastronomie-botanique-huiles-aromatiques-1200x630.jpg",
    image1080: "/images/og/gastronomie-botanique-huiles-aromatiques-1080x1080.jpg",
    alt: "Gastronomie botanique, huiles infusées culinaires et bouillons actifs",
    type: "article"
  },
  "/articles/": {
    title: "Articles Savoirs Botaniques | Phytothérapie Maison",
    description: "Explorez tous nos articles d'experts sur l'extraction botanique, la phytothérapie de terrain, les plantes adaptogènes et les macérations de précision.",
    image1200: "/images/og/articles-savoirs-herboristerie-botanique-1200x630.jpg",
    image1080: "/images/og/articles-savoirs-herboristerie-botanique-1080x1080.jpg",
    alt: "Articles et savoirs botaniques en phytothérapie et herboristerie",
    type: "website"
  },
  "/boutique/": {
    title: "Kits Plantes Médicinales & Remèdes Naturels | Bloom",
    description: "Découvrez notre gamme complète d'herboristerie : extracteur BloomLab, kits de plantes médicinales bio, accessoires d'extraction et abonnements.",
    image1200: "/images/og/boutique-bloomlab-kits-plantes-1200x630.jpg",
    image1080: "/images/og/boutique-bloomlab-kits-plantes-1080x1080.jpg",
    alt: "Boutique officielle Bloom by BotaniK, BloomLab et kits de plantes",
    type: "website"
  },
  "/boutique/kits/": {
    title: "Kits Plantes Médicinales & Remèdes Naturels | Bloom",
    description: "Découvrez notre gamme complète d'herboristerie : extracteur BloomLab, kits de plantes médicinales bio, accessoires d'extraction et abonnements.",
    image1200: "/images/og/boutique-bloomlab-kits-plantes-1200x630.jpg",
    image1080: "/images/og/boutique-bloomlab-kits-plantes-1080x1080.jpg",
    alt: "Boutique officielle Bloom by BotaniK, BloomLab et kits de plantes",
    type: "website"
  },
  "/manifeste/": {
    title: "Manifeste Bloom | Souveraineté Sanitaire & Plantes",
    description: "Manifeste Bloom by BotaniK : souveraineté sanitaire, ingénierie biologique et réconciliation entre rigueur scientifique et sagesse végétale ancestrale.",
    image1200: "/images/og/manifeste-souverainete-sanitaire-botanique-1200x630.jpg",
    image1080: "/images/og/manifeste-souverainete-sanitaire-botanique-1080x1080.jpg",
    alt: "Manifeste Bloom by BotaniK pour la souveraineté botanique et le reset homéostasique",
    type: "article"
  },
  "/questions-frequentes/": {
    title: "FAQ Extracteur Botanique | Questions Fréquentes",
    description: "Foire aux questions BloomLab® : garanties, entretien de l'inox 304, protocoles d'extraction, solvants autorisés et délais d'expédition sous 24 à 48 heures.",
    image1200: "/images/og/questions-frequentes-bloomlab-botanique-1200x630.jpg",
    image1080: "/images/og/questions-frequentes-bloomlab-botanique-1080x1080.jpg",
    alt: "Foire aux questions sur l'infuseur BloomLab et l'extraction végétale",
    type: "website"
  },
  "/faq/": {
    title: "FAQ Extracteur Botanique | Questions Fréquentes",
    description: "Foire aux questions BloomLab® : garanties, entretien de l'inox 304, protocoles d'extraction, solvants autorisés et délais d'expédition sous 24 à 48 heures.",
    image1200: "/images/og/questions-frequentes-bloomlab-botanique-1200x630.jpg",
    image1080: "/images/og/questions-frequentes-bloomlab-botanique-1080x1080.jpg",
    alt: "Foire aux questions sur l'infuseur BloomLab et l'extraction végétale",
    type: "website"
  },
  "/lexique/": {
    title: "Lexique Phytothérapie | Termes Extraction Botanique",
    description: "Lexique de phytothérapie et d'extraction botanique : définitions du Totum, de la charge allostatique, des solvants nobles et du séquençage actif A/B.",
    image1200: "/images/og/lexique-phytotherapie-extraction-botanique-1200x630.jpg",
    image1080: "/images/og/lexique-phytotherapie-extraction-botanique-1080x1080.jpg",
    alt: "Lexique de phytothérapie et termes d'herboristerie",
    type: "article"
  },
  "/contact/": {
    title: "Contact & Assistance Botanique | Bloom by BotaniK",
    description: "Une question sur BloomLab® ou nos kits botaniques ? Contactez nos conseillers en phytothérapie. Équipe basée en France, réponse sous 24 à 48 heures.",
    image1200: "/images/og/contact-bloom-by-botanik-1200x630.jpg",
    image1080: "/images/og/contact-bloom-by-botanik-1080x1080.jpg",
    alt: "Contactez l'équipe Bloom by BotaniK pour vos questions botaniques",
    type: "website"
  },
  "/huile-infusee/": {
    title: "Huiles Infusées Maison | Guide Macération Végétale",
    description: "Guide pratique des huiles infusées : sélection des huiles végétales bio, température de macération à 45°C et extraction des principes actifs liposolubles.",
    image1200: "/images/og/huiles-infusees-maceration-plantes-1200x630.jpg",
    image1080: "/images/og/huiles-infusees-maceration-plantes-1080x1080.jpg",
    alt: "Huiles infusées et macération d'herboristerie maison de précision",
    type: "article"
  },
  "/teinture-mere/": {
    title: "Teinture-Mère Maison | Guide Extraits Hydroalcooliques",
    description: "Fabrication de teintures mères maison : ratios 1:5, choix des titres alcooliques et extraction dynamique par vortex cinétique pour un concentré d'actifs.",
    image1200: "/images/og/teinture-mere-extraits-hydroalcooliques-1200x630.jpg",
    image1080: "/images/og/teinture-mere-extraits-hydroalcooliques-1080x1080.jpg",
    alt: "Guide de la teinture-mère et extraits hydroalcooliques de plantes médicinales",
    type: "article"
  },
  "/terrain/": {
    title: "Les 8 Terrains Biologiques | Équilibre & Homéostasie",
    description: "Explorez les 8 terrains biologiques en phytothérapie systémique : cartographiez vos vulnérabilités et choisissez les synergies de plantes appropriées.",
    image1200: "/images/og/terrain-biologique-equilibre-homeostasie-1200x630.jpg",
    image1080: "/images/og/terrain-biologique-equilibre-homeostasie-1080x1080.jpg",
    alt: "Les 8 terrains biologiques en phytothérapie systémique",
    type: "article"
  },
  "/hormese/": {
    title: "Hormèse Végétale | Principes Amers & Résilience Bloom",
    description: "Le principe d'hormèse végétale : comment les molécules de défense des plantes stimulent notre pharmacie intérieure et nos mécanismes de régénération.",
    image1200: "/images/og/hormese-vegetale-resilience-cellulaire-1200x630.jpg",
    image1080: "/images/og/hormese-vegetale-resilience-cellulaire-1080x1080.jpg",
    alt: "Hormèse et résilience biologique par les principes amers végétaux",
    type: "article"
  },
  "/produit/bloomlab/": {
    title: "BloomLab® Extracteur Précision | Inox 304 ±0,5°C",
    description: "Commandez l'extracteur et infuseur botanique BloomLab®. Inox chirurgical 304, vortex cinétique, thermorégulation ±0,5°C pour extraire le Totum de vos plantes.",
    image1200: "/images/og/produit-bloomlab-1200x630.jpg",
    image1080: "/images/og/produit-bloomlab-1080x1080.jpg",
    alt: "Extracteur et infuseur botanique de précision BloomLab® en situation",
    type: "product",
    price: "239.00",
    sku: "BLOOMLAB-V2"
  },
  "/boutique/bloomlab/": {
    title: "BloomLab® Extracteur Précision | Inox 304 ±0,5°C",
    description: "Commandez l'extracteur et infuseur botanique BloomLab®. Inox chirurgical 304, vortex cinétique, thermorégulation ±0,5°C pour extraire le Totum de vos plantes.",
    image1200: "/images/og/produit-bloomlab-1200x630.jpg",
    image1080: "/images/og/produit-bloomlab-1080x1080.jpg",
    alt: "Extracteur et infuseur botanique de précision BloomLab® en situation",
    type: "product",
    price: "239.00",
    sku: "BLOOMLAB-V2"
  },
  "/boutique/bundle-apothicaire/": {
    title: "Trio Apothicaire | 3 Kits Plantes Médicinales",
    description: "Trio de formules médicinales calibrées pour infusion végétale et extraction maison : Sève Fondamentale, Nuit Profonde et Feu Digestif.",
    image1200: "/images/og/produit-bundle-apothicaire-1200x630.jpg",
    image1080: "/images/og/produit-bundle-apothicaire-1080x1080.jpg",
    alt: "Trio de formules médicinales Apothicaire Bloom by BotaniK",
    type: "product",
    price: "79.00",
    sku: "BUNDLE-APOTHICAIRE"
  },
  "/boutique/pack-signature/": {
    title: "Pack Signature BloomLab® + Trio Plantes — 289€",
    description: "Le pack complet pour démarrer l'herboristerie maison : la machine BloomLab®, les 3 mélanges de plantes signatures et l'accès aux protocoles d'extraction.",
    image1200: "/images/og/produit-pack-signature-1200x630.jpg",
    image1080: "/images/og/produit-pack-signature-1080x1080.jpg",
    alt: "Pack Signature BloomLab et ses trois formules botaniques",
    type: "product",
    price: "289.00",
    sku: "PACK-SIGNATURE"
  },
  "/boutique/kit-starter/": {
    title: "Kit Sève Fondamentale | Plantes Médicinales Énergie",
    description: "Mélange tonique et régulateur pour infusion végétale maison. Ortie, romarin et cynorrhodon pour soutenir le terrain et la vitalité quotidienne.",
    image1200: "/images/og/produit-kit-starter-1200x630.jpg",
    image1080: "/images/og/produit-kit-starter-1080x1080.jpg",
    alt: "Kit de plantes médicinales Sève Fondamentale Bloom by BotaniK",
    type: "product",
    price: "29.00",
    sku: "KIT-SEVE"
  },
  "/boutique/kit-nuit/": {
    title: "Kit Nuit Profonde | Sommeil Réparateur & Plantes Bio",
    description: "Synergie de passiflore, mélisse et camomille matricaire calibrée pour l'extraction douce en infuseur végétal. Sommeil réparateur sans somnolence.",
    image1200: "/images/og/produit-kit-nuit-1200x630.jpg",
    image1080: "/images/og/produit-kit-nuit-1080x1080.jpg",
    alt: "Kit Nuit Profonde pour le sommeil et l'apaisement nerveux",
    type: "product",
    price: "29.00",
    sku: "KIT-NUIT"
  },
  "/boutique/kit-digestion/": {
    title: "Kit Feu Digestif | Confort Intestinal & Plantes Bio",
    description: "Fenouil doux, menthe poivrée et gentiane pour stimuler les sucs digestifs et apaiser le ballonnement après les repas grâce à l'extraction de précision.",
    image1200: "/images/og/produit-kit-digestion-1200x630.jpg",
    image1080: "/images/og/produit-kit-digestion-1080x1080.jpg",
    alt: "Kit Feu Digestif pour le confort intestinal et gastrique",
    type: "product",
    price: "29.00",
    sku: "KIT-DIGESTION"
  },
  "/boutique/kit-articulaire/": {
    title: "Kit Feu Articulaire | Mobilité & Souplesse Articulaire",
    description: "Harpagophytum, reine-des-prés et cassis pour soulager les articulations raides et réguler l'inflammation grâce à l'extraction du Totum.",
    image1200: "/images/og/produit-kit-articulaire-1200x630.jpg",
    image1080: "/images/og/produit-kit-articulaire-1080x1080.jpg",
    alt: "Kit Feu Articulaire pour la souplesse et le confort des articulations",
    type: "product",
    price: "32.00",
    sku: "KIT-ARTICULAIRE"
  },
  "/boutique/kit-hiver/": {
    title: "Kit Bouclier Hivernal | Défenses Immunitaires & Plantes",
    description: "Échinacée pourpre, thym à linalol et sureau noir. Synergie protectrice pour traverser l'hiver avec une infusion botanique riche en polyphénols.",
    image1200: "/images/og/produit-kit-hiver-1200x630.jpg",
    image1080: "/images/og/produit-kit-hiver-1080x1080.jpg",
    alt: "Kit Bouclier Hivernal pour l'immunité et la protection des voies respiratoires",
    type: "product",
    price: "32.00",
    sku: "KIT-HIVER"
  },
  "/boutique/duo-argiles/": {
    title: "Duo Argiles & Terres Rares | Purification Botanique",
    description: "Argiles vertes et blanches surfines ventilées pour cataplasmes et purification du terrain. Remède ancestral d'herboristerie maison.",
    image1200: "/images/og/produit-duo-argiles-1200x630.jpg",
    image1080: "/images/og/produit-duo-argiles-1080x1080.jpg",
    alt: "Duo Argiles & Terres Rares pour la purification systémique",
    type: "product",
    price: "24.00",
    sku: "DUO-ARGILES"
  },
  "/articles/infuseur-botanique-vs-theiere-classique-pourquoi-votre-tisane-ne-marche-pas/": {
    title: "Infuseur vs Théière | Pourquoi Votre Tisane Ne Marche Pas",
    description: "Pourquoi l'infuseur botanique surpasse la théière classique ? Découvrez les limites thermiques de l'eau bouillante et la puissance de l'extraction thermo-cinétique en milieu clos.",
    image1200: "/images/og/article-infuseur-vs-theiere-tisane-1200x630.jpg",
    image1080: "/images/og/article-infuseur-vs-theiere-tisane-1080x1080.jpg",
    alt: "Infuseur botanique vs théière classique pour vos tisanes",
    type: "article"
  },
  "/articles/extraction-a-froid-vs-extraction-a-chaud-guide-totum-vegetal/": {
    title: "Extraction Froid vs Chaud | Guide Totum Végétal",
    description: "Extraction à froid, décoction ou thermo-cinétique douce ? Découvrez quelle méthode préserve l'intégralité du Totum végétal sans altérer les molécules bioactives.",
    image1200: "/images/og/article-extraction-froid-chaud-totum-1200x630.jpg",
    image1080: "/images/og/article-extraction-froid-chaud-totum-1080x1080.jpg",
    alt: "Extraction à froid vs extraction à chaud du Totum végétal",
    type: "article"
  },
  "/articles/remedes-de-grand-mere-revisites-par-la-science-5-plantes-a-redecouvrir/": {
    title: "Remèdes Grand-Mère & Science | 5 Plantes Revisités",
    description: "Reine des prés, thym, camomille, romarin, mauve : comment la science confirme l'efficacité des remèdes de grand-mère grâce à l'extraction de précision à la maison.",
    image1200: "/images/og/article-remedes-grand-mere-science-1200x630.jpg",
    image1080: "/images/og/article-remedes-grand-mere-science-1080x1080.jpg",
    alt: "Remèdes de grand-mère et phytothérapie revisités par la science moderne",
    type: "article"
  },
  "/articles/comment-fabriquer-huiles-infusees-teintures-maison/": {
    title: "Huiles Infusées & Teintures | Guide Fabrication Maison",
    description: "Comment réussir vos huiles infusées, macérats huileux et teintures mères à la maison ? Solvants, températures de 45°C, ratios et extraction fermée expliqués pas à pas.",
    image1200: "/images/og/article-fabriquer-huiles-infusees-teintures-1200x630.jpg",
    image1080: "/images/og/article-fabriquer-huiles-infusees-teintures-1080x1080.jpg",
    alt: "Fabrication domestique d huiles infusées et de teintures",
    type: "article"
  },
  "/articles/plantes-adaptogenes-guide-complet-reequilibrer-systeme-nerveux/": {
    title: "Plantes Adaptogènes | Rééquilibrer l'Axe HPA & Stress",
    description: "Guide complet des plantes adaptogènes : Ashwagandha, Rhodiola, Éleuthérocoque, Basilic sacré. Régulez le cortisol, restaurez l'énergie vitale et libérez votre terrain.",
    image1200: "/images/og/article-plantes-adaptogenes-systeme-nerveux-1200x630.jpg",
    image1080: "/images/og/article-plantes-adaptogenes-systeme-nerveux-1080x1080.jpg",
    alt: "Plantes adaptogènes pour rééquilibrer le système nerveux",
    type: "article"
  },
  "/blog/science-extraction-botanique-biodisponibilite/": {
    title: "Science Extraction Botanique | Journal Bloom",
    description: "Comprendre les principes biophysiques de l'extraction végétale : biodisponibilité cellulaire, cinétique vortex et thermorégulation de précision.",
    image1200: "/images/og/article-extraction-froid-chaud-totum-1200x630.jpg",
    image1080: "/images/og/article-extraction-froid-chaud-totum-1080x1080.jpg",
    alt: "Science de l'extraction botanique et biodisponibilité",
    type: "article"
  },
  "/blog/phytotherapie-axe-intestin-cerveau-microbiote/": {
    title: "Axe Intestin-Cerveau & Plantes | Journal Bloom",
    description: "L'impact des principes amers et polyphénols sur l'axe intestin-cerveau, le microbiote intestinal et la régulation neuro-végétative.",
    image1200: "/images/og/produit-kit-digestion-1200x630.jpg",
    image1080: "/images/og/produit-kit-digestion-1080x1080.jpg",
    alt: "Phytothérapie et axe intestin-cerveau",
    type: "article"
  },
  "/blog/protocoles-sommeil-reparateur-extraction-douce/": {
    title: "Protocoles Sommeil Réparateur | Journal Bloom",
    description: "Comment concevoir des extractions végétales douces pour restaurer les cycles circadiens et favoriser un sommeil profond et réparateur.",
    image1200: "/images/og/produit-kit-nuit-1200x630.jpg",
    image1080: "/images/og/produit-kit-nuit-1080x1080.jpg",
    alt: "Protocoles de sommeil réparateur par extraction douce",
    type: "article"
  },
  "/blog/guide-solvants-naturels-huile-eau-alcool-vinaigre/": {
    title: "Guide Solvants Naturels | Journal Bloom",
    description: "Eau, alcool de grain, huiles végétales et vinaigre de cidre : quel solvant choisir pour extraire les principes actifs de vos plantes.",
    image1200: "/images/og/huiles-infusees-maceration-plantes-1200x630.jpg",
    image1080: "/images/og/huiles-infusees-maceration-plantes-1080x1080.jpg",
    alt: "Guide des solvants naturels en phytothérapie",
    type: "article"
  },
  "/phytotherapie-reset/protocole-psoriasis/": {
    title: "Protocole Psoriasis | Reset Terrain Cutané",
    description: "Protocole complet d'accompagnement du terrain psoriasique par la phytothérapie intégrale : 4 phases, 14 semaines, soutien émonctoriel et régulation cutanée.",
    image1200: "/images/og/protocole-psoriasis-reset-homeostatique-1200x630.jpg",
    image1080: "/images/og/protocole-psoriasis-reset-homeostatique-1080x1080.jpg",
    alt: "Protocole Psoriasis — Reset Homéostasique et phytothérapie intégrale Bloom by BotaniK",
    type: "article",
    isPaywalled: true,
    datePublished: "2026-09-22T08:00:00+02:00",
    dateModified: "2026-09-22T08:00:00+02:00"
  },
  "/abonnement/": {
    title: "Abonnement Bloom | Protocoles & Accompagnement ALMA",
    description: "Rejoignez Bloom : accédez aux protocoles saisonniers de reset homéostatique, au suivi d'anamnèse ALMA et à l'ensemble des formules botaniques guidées.",
    image1200: "/images/og/bloom-extracteur-infuseur-botanique-1200x630.jpg",
    image1080: "/images/og/bloom-extracteur-infuseur-botanique-1080x1080.jpg",
    alt: "Abonnement et protocoles d'accompagnement Bloom by BotaniK",
    type: "website"
  },
  "/activation/": {
    title: "Activer Votre BloomLab® | Garantie & Mise en Service",
    description: "Activez votre extracteur botanique BloomLab® : enregistrement de la garantie constructeur 1 an et déblocage de vos premiers protocoles d'extraction guidés.",
    image1200: "/images/og/produit-bloomlab-1200x630.jpg",
    image1080: "/images/og/produit-bloomlab-1080x1080.jpg",
    alt: "Activation et enregistrement de garantie BloomLab",
    type: "website"
  },
  "/la-marque/": {
    title: "Manifeste Bloom | Souveraineté Sanitaire & Plantes",
    description: "Manifeste Bloom by BotaniK : souveraineté sanitaire, ingénierie biologique et réconciliation entre rigueur scientifique et sagesse végétale ancestrale.",
    image1200: "/images/og/manifeste-souverainete-sanitaire-botanique-1200x630.jpg",
    image1080: "/images/og/manifeste-souverainete-sanitaire-botanique-1080x1080.jpg",
    alt: "La marque Bloom by BotaniK et sa mission de phytothérapie intégrale",
    type: "website"
  },
  "/bibliotheque/": {
    title: "Bibliothèque Botanique : Protocoles, Guides & Formulations | Bloom",
    description: "Accédez à l'ensemble de nos guides d'extraction, fiches recettes de phytothérapie et ateliers d'herboristerie moderne.",
    image1200: "/images/og/articles-savoirs-herboristerie-botanique-1200x630.jpg",
    image1080: "/images/og/articles-savoirs-herboristerie-botanique-1080x1080.jpg",
    alt: "Bibliothèque de savoirs et protocoles botaniques Bloom by BotaniK",
    type: "website"
  },
  "/recettes/": {
    title: "Recettes & Formulations Botaniques : Tisanes, Huiles & Extraits | Bloom",
    description: "Recettes précises d'extraction végétale : ratios, températures et solvants pour concevoir vos remèdes et soins botaniques à la maison.",
    image1200: "/images/og/articles-savoirs-herboristerie-botanique-1200x630.jpg",
    image1080: "/images/og/articles-savoirs-herboristerie-botanique-1080x1080.jpg",
    alt: "Recettes et préparations de phytothérapie moderne",
    type: "website"
  },
  "/blog/": {
    title: "Journal Botanique | Extraction & Remèdes Naturels",
    description: "Le Journal Botanique Bloom : analyses scientifiques, dossiers d'herboristerie moderne, recettes d'extraction et guides pratiques pour vos remèdes maison.",
    image1200: "/images/og/articles-savoirs-herboristerie-botanique-1200x630.jpg",
    image1080: "/images/og/articles-savoirs-herboristerie-botanique-1080x1080.jpg",
    alt: "Le Blog Botanique Bloom by BotaniK",
    type: "website"
  },
  "/mentions-legales/": {
    title: "Mentions Légales | Bloom by BotaniK",
    description: "Mentions légales du site bloombybotanik.com : éditeur, hébergement, propriété intellectuelle et informations réglementaires de la marque Bloom.",
    image1200: "/images/og/bloom-extracteur-infuseur-botanique-1200x630.jpg",
    image1080: "/images/og/bloom-extracteur-infuseur-botanique-1080x1080.jpg",
    alt: "Mentions légales Bloom by BotaniK",
    type: "website"
  },
  "/politique-de-confidentialite/": {
    title: "Politique de Confidentialité | Données Personnelles Bloom",
    description: "Politique de confidentialité et protection des données personnelles (RGPD) sur bloombybotanik.com. Vos données de santé et de navigation sont sécurisées.",
    image1200: "/images/og/bloom-extracteur-infuseur-botanique-1200x630.jpg",
    image1080: "/images/og/bloom-extracteur-infuseur-botanique-1080x1080.jpg",
    alt: "Politique de confidentialité Bloom by BotaniK",
    type: "website"
  },
  "/conditions-generales-de-vente/": {
    title: "Conditions Générales de Vente (CGV) | Bloom by BotaniK",
    description: "Consultez les conditions générales de vente de Bloom by BotaniK : commandes, tarifs, garanties, livraisons et droit de rétractation applicable.",
    image1200: "/images/og/bloom-extracteur-infuseur-botanique-1200x630.jpg",
    image1080: "/images/og/bloom-extracteur-infuseur-botanique-1080x1080.jpg",
    alt: "Conditions Générales de Vente Bloom by BotaniK",
    type: "website"
  },
  "/termes-et-conditions/": {
    title: "Conditions d'Utilisation (CGU) | Bloom by BotaniK",
    description: "Conditions générales d'utilisation du site et des services Bloom by BotaniK. Modalités d'accès à l'application et aux contenus botaniques.",
    image1200: "/images/og/bloom-extracteur-infuseur-botanique-1200x630.jpg",
    image1080: "/images/og/bloom-extracteur-infuseur-botanique-1080x1080.jpg",
    alt: "Termes et conditions d'utilisation Bloom by BotaniK",
    type: "website"
  },
  "/retour-et-remboursement/": {
    title: "Retours & Remboursements | Garantie 30 Jours Bloom",
    description: "Politique de retour et de remboursement Bloom by BotaniK : garantie satisfait ou remboursé sous 30 jours et modalités de prise en charge SAV.",
    image1200: "/images/og/bloom-extracteur-infuseur-botanique-1200x630.jpg",
    image1080: "/images/og/bloom-extracteur-infuseur-botanique-1080x1080.jpg",
    alt: "Retour et remboursement Bloom by BotaniK",
    type: "website"
  },
  "/droit-de-retractation/": {
    title: "Droit de Rétractation | Formulaire de Retour Bloom",
    description: "Exercice de votre droit légal de rétractation sous 14 jours et formulaire de retour de commande pour vos achats sur bloombybotanik.com.",
    image1200: "/images/og/bloom-extracteur-infuseur-botanique-1200x630.jpg",
    image1080: "/images/og/bloom-extracteur-infuseur-botanique-1080x1080.jpg",
    alt: "Droit de rétractation Bloom by BotaniK",
    type: "website"
  }
};

function injectServerSEO(html: string, reqPath: string): string {
  try {
    const clean = reqPath.replace(/\/$/, "") + "/";
    const normalized = clean === "//" ? "/" : clean;

    // 0. Recettes publiques crawlables (Hub, Catégories, Pagination & Fiches individuelles)
    if (reqPath.startsWith("/recettes") || reqPath.startsWith("/recettes/")) {
      const cleanRecipePath = reqPath.endsWith("/") ? reqPath : reqPath + "/";

      // 0.1 Fiche Recette Herbier Migrée
      const herbierRecipe = getHerbierRecipeByPath(cleanRecipePath);
      if (herbierRecipe) {
        const rendered = renderHerbierRecipePageHtml(herbierRecipe);
        let updated = html.replace(/<title>.*?<\/title>/i, `<title>${rendered.title}</title>`);
        updated = updated.replace(/<meta\s+name=["']description["']\s+content=["'].*?["']\s*\/?>/i, `<meta name="description" content="${rendered.metaDescription}" />`);
        updated = updated.replace(/<meta\s+property=["']og:title["']\s+content=["'].*?["']\s*\/?>/i, `<meta property="og:title" content="${rendered.title}">`);
        updated = updated.replace(/<meta\s+property=["']og:description["']\s+content=["'].*?["']\s*\/?>/i, `<meta property="og:description" content="${rendered.metaDescription}">`);
        updated = updated.replace(/<meta\s+property=["']og:url["']\s+content=["'].*?["']\s*\/?>/i, `<meta property="og:url" content="${rendered.canonical}">`);
        updated = updated.replace(/<meta\s+property=["']og:type["']\s+content=["'].*?["']\s*\/?>/i, `<meta property="og:type" content="${herbierRecipe.schemaType === 'Recipe' ? 'website' : 'article'}">`);
        updated = updated.replace(/<link\s+rel=["']canonical["']\s+href=["'].*?["']\s*\/?>/i, `<link rel="canonical" href="${rendered.canonical}" />`);
        updated = updated.replace(/<meta\s+name=["']twitter:title["']\s+content=["'].*?["']\s*\/?>/i, `<meta name="twitter:title" content="${rendered.title}">`);
        updated = updated.replace(/<meta\s+name=["']twitter:description["']\s+content=["'].*?["']\s*\/?>/i, `<meta name="twitter:description" content="${rendered.metaDescription}">`);
        updated = updated.replace("</head>", `  ${rendered.jsonLd}\n  </head>`);
        updated = updated.replace(/<div id=["']root["']>[\s\S]*?<\/div>/i, `<div id="root">${rendered.bodyHtml}</div>`);
        return updated;
      }

      // 0.2 Fiche Recette Canonique
      const recipe = getRecipeByPath(cleanRecipePath);
      if (recipe) {
        const rendered = renderRecipePageHtml(recipe);
        let updated = html.replace(/<title>.*?<\/title>/i, `<title>${rendered.title}</title>`);
        updated = updated.replace(/<meta\s+name=["']description["']\s+content=["'].*?["']\s*\/?>/i, `<meta name="description" content="${rendered.metaDescription}" />`);
        updated = updated.replace(/<meta\s+property=["']og:title["']\s+content=["'].*?["']\s*\/?>/i, `<meta property="og:title" content="${rendered.title}">`);
        updated = updated.replace(/<meta\s+property=["']og:description["']\s+content=["'].*?["']\s*\/?>/i, `<meta property="og:description" content="${rendered.metaDescription}">`);
        updated = updated.replace(/<meta\s+property=["']og:url["']\s+content=["'].*?["']\s*\/?>/i, `<meta property="og:url" content="${rendered.canonical}">`);
        updated = updated.replace(/<meta\s+property=["']og:type["']\s+content=["'].*?["']\s*\/?>/i, `<meta property="og:type" content="${recipe.schemaType === 'Recipe' ? 'website' : 'article'}">`);
        updated = updated.replace(/<link\s+rel=["']canonical["']\s+href=["'].*?["']\s*\/?>/i, `<link rel="canonical" href="${rendered.canonical}" />`);
        updated = updated.replace(/<meta\s+name=["']twitter:title["']\s+content=["'].*?["']\s*\/?>/i, `<meta name="twitter:title" content="${rendered.title}">`);
        updated = updated.replace(/<meta\s+name=["']twitter:description["']\s+content=["'].*?["']\s*\/?>/i, `<meta name="twitter:description" content="${rendered.metaDescription}">`);
        updated = updated.replace("</head>", `  ${rendered.jsonLd}\n  </head>`);
        updated = updated.replace(/<div id=["']root["']>[\s\S]*?<\/div>/i, `<div id="root">${rendered.bodyHtml}</div>`);
        return updated;
      }

      // 0.3 Catégorie Phytothérapie
      if (cleanRecipePath.startsWith("/recettes/phytotherapie")) {
        const matchPage = cleanRecipePath.match(/\/page\/(\d+)\/?$/);
        const pageNum = matchPage ? parseInt(matchPage[1], 10) : 1;
        const rendered = renderHerbierCategoryPageHtml('phytotherapie', pageNum);
        let updated = html.replace(/<title>.*?<\/title>/i, `<title>${rendered.title}</title>`);
        updated = updated.replace(/<meta\s+name=["']description["']\s+content=["'].*?["']\s*\/?>/i, `<meta name="description" content="${rendered.metaDescription}" />`);
        updated = updated.replace(/<meta\s+property=["']og:title["']\s+content=["'].*?["']\s*\/?>/i, `<meta property="og:title" content="${rendered.title}">`);
        updated = updated.replace(/<meta\s+property=["']og:description["']\s+content=["'].*?["']\s*\/?>/i, `<meta property="og:description" content="${rendered.metaDescription}">`);
        updated = updated.replace(/<meta\s+property=["']og:url["']\s+content=["'].*?["']\s*\/?>/i, `<meta property="og:url" content="${rendered.canonical}">`);
        updated = updated.replace(/<link\s+rel=["']canonical["']\s+href=["'].*?["']\s*\/?>/i, `<link rel="canonical" href="${rendered.canonical}" />`);
        updated = updated.replace(/<meta\s+name=["']twitter:title["']\s+content=["'].*?["']\s*\/?>/i, `<meta name="twitter:title" content="${rendered.title}">`);
        updated = updated.replace(/<meta\s+name=["']twitter:description["']\s+content=["'].*?["']\s*\/?>/i, `<meta name="twitter:description" content="${rendered.metaDescription}">`);
        updated = updated.replace("</head>", `  ${rendered.jsonLd}\n  </head>`);
        updated = updated.replace(/<div id=["']root["']>[\s\S]*?<\/div>/i, `<div id="root">${rendered.bodyHtml}</div>`);
        return updated;
      }

      // 0.4 Catégorie Gastronomie
      if (cleanRecipePath.startsWith("/recettes/gastronomie")) {
        const matchPage = cleanRecipePath.match(/\/page\/(\d+)\/?$/);
        const pageNum = matchPage ? parseInt(matchPage[1], 10) : 1;
        const rendered = renderHerbierCategoryPageHtml('gastronomie', pageNum);
        let updated = html.replace(/<title>.*?<\/title>/i, `<title>${rendered.title}</title>`);
        updated = updated.replace(/<meta\s+name=["']description["']\s+content=["'].*?["']\s*\/?>/i, `<meta name="description" content="${rendered.metaDescription}" />`);
        updated = updated.replace(/<meta\s+property=["']og:title["']\s+content=["'].*?["']\s*\/?>/i, `<meta property="og:title" content="${rendered.title}">`);
        updated = updated.replace(/<meta\s+property=["']og:description["']\s+content=["'].*?["']\s*\/?>/i, `<meta property="og:description" content="${rendered.metaDescription}">`);
        updated = updated.replace(/<meta\s+property=["']og:url["']\s+content=["'].*?["']\s*\/?>/i, `<meta property="og:url" content="${rendered.canonical}">`);
        updated = updated.replace(/<link\s+rel=["']canonical["']\s+href=["'].*?["']\s*\/?>/i, `<link rel="canonical" href="${rendered.canonical}" />`);
        updated = updated.replace(/<meta\s+name=["']twitter:title["']\s+content=["'].*?["']\s*\/?>/i, `<meta name="twitter:title" content="${rendered.title}">`);
        updated = updated.replace(/<meta\s+name=["']twitter:description["']\s+content=["'].*?["']\s*\/?>/i, `<meta name="twitter:description" content="${rendered.metaDescription}">`);
        updated = updated.replace("</head>", `  ${rendered.jsonLd}\n  </head>`);
        updated = updated.replace(/<div id=["']root["']>[\s\S]*?<\/div>/i, `<div id="root">${rendered.bodyHtml}</div>`);
        return updated;
      }

      if (cleanRecipePath.startsWith("/recettes/culinaires")) {
        const matchPage = cleanRecipePath.match(/\/page\/(\d+)\/?$/);
        const pageNum = matchPage ? parseInt(matchPage[1], 10) : 1;
        const rendered = renderCategoryPageHtml('culinaires', pageNum);
        let updated = html.replace(/<title>.*?<\/title>/i, `<title>${rendered.title}</title>`);
        updated = updated.replace(/<meta\s+name=["']description["']\s+content=["'].*?["']\s*\/?>/i, `<meta name="description" content="${rendered.metaDescription}" />`);
        updated = updated.replace(/<meta\s+property=["']og:title["']\s+content=["'].*?["']\s*\/?>/i, `<meta property="og:title" content="${rendered.title}">`);
        updated = updated.replace(/<meta\s+property=["']og:description["']\s+content=["'].*?["']\s*\/?>/i, `<meta property="og:description" content="${rendered.metaDescription}">`);
        updated = updated.replace(/<meta\s+property=["']og:url["']\s+content=["'].*?["']\s*\/?>/i, `<meta property="og:url" content="${rendered.canonical}">`);
        updated = updated.replace(/<link\s+rel=["']canonical["']\s+href=["'].*?["']\s*\/?>/i, `<link rel="canonical" href="${rendered.canonical}" />`);
        updated = updated.replace(/<meta\s+name=["']twitter:title["']\s+content=["'].*?["']\s*\/?>/i, `<meta name="twitter:title" content="${rendered.title}">`);
        updated = updated.replace(/<meta\s+name=["']twitter:description["']\s+content=["'].*?["']\s*\/?>/i, `<meta name="twitter:description" content="${rendered.metaDescription}">`);
        updated = updated.replace("</head>", `  ${rendered.jsonLd}\n  </head>`);
        updated = updated.replace(/<div id=["']root["']>[\s\S]*?<\/div>/i, `<div id="root">${rendered.bodyHtml}</div>`);
        return updated;
      }

      if (cleanRecipePath.startsWith("/recettes/cosmetiques")) {
        const matchPage = cleanRecipePath.match(/\/page\/(\d+)\/?$/);
        const pageNum = matchPage ? parseInt(matchPage[1], 10) : 1;
        const rendered = renderCategoryPageHtml('cosmetiques', pageNum);
        let updated = html.replace(/<title>.*?<\/title>/i, `<title>${rendered.title}</title>`);
        updated = updated.replace(/<meta\s+name=["']description["']\s+content=["'].*?["']\s*\/?>/i, `<meta name="description" content="${rendered.metaDescription}" />`);
        updated = updated.replace(/<meta\s+property=["']og:title["']\s+content=["'].*?["']\s*\/?>/i, `<meta property="og:title" content="${rendered.title}">`);
        updated = updated.replace(/<meta\s+property=["']og:description["']\s+content=["'].*?["']\s*\/?>/i, `<meta property="og:description" content="${rendered.metaDescription}">`);
        updated = updated.replace(/<meta\s+property=["']og:url["']\s+content=["'].*?["']\s*\/?>/i, `<meta property="og:url" content="${rendered.canonical}">`);
        updated = updated.replace(/<link\s+rel=["']canonical["']\s+href=["'].*?["']\s*\/?>/i, `<link rel="canonical" href="${rendered.canonical}" />`);
        updated = updated.replace(/<meta\s+name=["']twitter:title["']\s+content=["'].*?["']\s*\/?>/i, `<meta name="twitter:title" content="${rendered.title}">`);
        updated = updated.replace(/<meta\s+name=["']twitter:description["']\s+content=["'].*?["']\s*\/?>/i, `<meta name="twitter:description" content="${rendered.metaDescription}">`);
        updated = updated.replace("</head>", `  ${rendered.jsonLd}\n  </head>`);
        updated = updated.replace(/<div id=["']root["']>[\s\S]*?<\/div>/i, `<div id="root">${rendered.bodyHtml}</div>`);
        return updated;
      }

      if (cleanRecipePath.startsWith("/recettes/parcours-botaniques")) {
        const matchPage = cleanRecipePath.match(/\/page\/(\d+)\/?$/);
        const pageNum = matchPage ? parseInt(matchPage[1], 10) : 1;
        const rendered = renderCategoryPageHtml('parcours-botaniques', pageNum);
        let updated = html.replace(/<title>.*?<\/title>/i, `<title>${rendered.title}</title>`);
        updated = updated.replace(/<meta\s+name=["']description["']\s+content=["'].*?["']\s*\/?>/i, `<meta name="description" content="${rendered.metaDescription}" />`);
        updated = updated.replace(/<meta\s+property=["']og:title["']\s+content=["'].*?["']\s*\/?>/i, `<meta property="og:title" content="${rendered.title}">`);
        updated = updated.replace(/<meta\s+property=["']og:description["']\s+content=["'].*?["']\s*\/?>/i, `<meta property="og:description" content="${rendered.metaDescription}">`);
        updated = updated.replace(/<meta\s+property=["']og:url["']\s+content=["'].*?["']\s*\/?>/i, `<meta property="og:url" content="${rendered.canonical}">`);
        updated = updated.replace(/<link\s+rel=["']canonical["']\s+href=["'].*?["']\s*\/?>/i, `<link rel="canonical" href="${rendered.canonical}" />`);
        updated = updated.replace(/<meta\s+name=["']twitter:title["']\s+content=["'].*?["']\s*\/?>/i, `<meta name="twitter:title" content="${rendered.title}">`);
        updated = updated.replace(/<meta\s+name=["']twitter:description["']\s+content=["'].*?["']\s*\/?>/i, `<meta name="twitter:description" content="${rendered.metaDescription}">`);
        updated = updated.replace("</head>", `  ${rendered.jsonLd}\n  </head>`);
        updated = updated.replace(/<div id=["']root["']>[\s\S]*?<\/div>/i, `<div id="root">${rendered.bodyHtml}</div>`);
        return updated;
      }

      if (cleanRecipePath === "/recettes/" || cleanRecipePath === "/recettes") {
        const rendered = renderHubPageHtml();
        let updated = html.replace(/<title>.*?<\/title>/i, `<title>${rendered.title}</title>`);
        updated = updated.replace(/<meta\s+name=["']description["']\s+content=["'].*?["']\s*\/?>/i, `<meta name="description" content="${rendered.metaDescription}" />`);
        updated = updated.replace(/<meta\s+property=["']og:title["']\s+content=["'].*?["']\s*\/?>/i, `<meta property="og:title" content="${rendered.title}">`);
        updated = updated.replace(/<meta\s+property=["']og:description["']\s+content=["'].*?["']\s*\/?>/i, `<meta property="og:description" content="${rendered.metaDescription}">`);
        updated = updated.replace(/<meta\s+property=["']og:url["']\s+content=["'].*?["']\s*\/?>/i, `<meta property="og:url" content="${rendered.canonical}">`);
        updated = updated.replace(/<link\s+rel=["']canonical["']\s+href=["'].*?["']\s*\/?>/i, `<link rel="canonical" href="${rendered.canonical}" />`);
        updated = updated.replace(/<meta\s+name=["']twitter:title["']\s+content=["'].*?["']\s*\/?>/i, `<meta name="twitter:title" content="${rendered.title}">`);
        updated = updated.replace(/<meta\s+name=["']twitter:description["']\s+content=["'].*?["']\s*\/?>/i, `<meta name="twitter:description" content="${rendered.metaDescription}">`);
        updated = updated.replace("</head>", `  ${rendered.jsonLd}\n  </head>`);
        updated = updated.replace(/<div id=["']root["']>[\s\S]*?<\/div>/i, `<div id="root">${rendered.bodyHtml}</div>`);
        return updated;
      }
    }

    const route = SERVER_SEO_ROUTES[normalized] || SERVER_SEO_ROUTES[reqPath] || SERVER_SEO_ROUTES["/"];

    const full1200 = `https://bloombybotanik.com${route.image1200}`;
    const full1080 = `https://bloombybotanik.com${route.image1080}`;
    const canonical = `https://bloombybotanik.com${normalized}`;

    let updated = html;

    // 1. Update Title
    updated = updated.replace(/<title>.*?<\/title>/i, `<title>${route.title}</title>`);

    // 2. Update Meta Description
    updated = updated.replace(/<meta\s+name=["']description["']\s+content=["'].*?["']\s*\/?>/i, `<meta name="description" content="${route.description}" />`);

    // 3. Update OG Title, Description, URL, Type
    updated = updated.replace(/<meta\s+property=["']og:title["']\s+content=["'].*?["']\s*\/?>/i, `<meta property="og:title" content="${route.title}">`);
    updated = updated.replace(/<meta\s+property=["']og:description["']\s+content=["'].*?["']\s*\/?>/i, `<meta property="og:description" content="${route.description}">`);
    updated = updated.replace(/<meta\s+property=["']og:url["']\s+content=["'].*?["']\s*\/?>/i, `<meta property="og:url" content="${canonical}">`);
    updated = updated.replace(/<meta\s+property=["']og:type["']\s+content=["'].*?["']\s*\/?>/i, `<meta property="og:type" content="${route.type}">`);

    // 4. Update OG Images Block cleanly
    const ogBlockRegex = /<!-- Primary OG Image[\s\S]*?<!-- Twitter Card -->/i;
    if (ogBlockRegex.test(updated)) {
      updated = updated.replace(
        ogBlockRegex,
        `<!-- Primary OG Image (1200x630) -->\n    <meta property="og:image" content="${full1200}">\n    <meta property="og:image:secure_url" content="${full1200}">\n    <meta property="og:image:type" content="image/jpeg">\n    <meta property="og:image:width" content="1200">\n    <meta property="og:image:height" content="630">\n    <meta property="og:image:alt" content="${route.alt}">\n    <!-- Secondary OG Image (1080x1080 Square Fallback) -->\n    <meta property="og:image" content="${full1080}">\n    <meta property="og:image:secure_url" content="${full1080}">\n    <meta property="og:image:type" content="image/jpeg">\n    <meta property="og:image:width" content="1080">\n    <meta property="og:image:height" content="1080">\n    <meta property="og:image:alt" content="${route.alt}">\n\n    <!-- Twitter Card -->`
      );
    }

    // 5. Update Canonical link & Hreflang
    updated = updated.replace(/<link\s+rel=["']canonical["']\s+href=["'].*?["']\s*\/?>/i, `<link rel="canonical" href="${canonical}" />`);

    if (normalized === "/phytotherapie-reset/protocole-psoriasis/") {
      updated = updated.replace(/<link\s+rel=["']alternate["']\s+hreflang=["'].*?["']\s+href=["'].*?["']\s*\/?>/gi, "");
      const customHreflang = `<link rel="alternate" hreflang="fr" href="${canonical}" />\n    <link rel="alternate" hreflang="x-default" href="${canonical}" />`;
      updated = updated.replace("<head>", `<head>\n    ${customHreflang}`);
    }

    // 6. Update Twitter Cards
    updated = updated.replace(/<meta\s+name=["']twitter:title["']\s+content=["'].*?["']\s*\/?>/i, `<meta name="twitter:title" content="${route.title}">`);
    updated = updated.replace(/<meta\s+name=["']twitter:description["']\s+content=["'].*?["']\s*\/?>/i, `<meta name="twitter:description" content="${route.description}">`);
    updated = updated.replace(/<meta\s+name=["']twitter:image["']\s+content=["'].*?["']\s*\/?>/i, `<meta name="twitter:image" content="${full1200}">`);
    updated = updated.replace(/<meta\s+name=["']twitter:image:alt["']\s+content=["'].*?["']\s*\/?>/i, `<meta name="twitter:image:alt" content="${route.alt}">`);

    // 7. Dynamic JSON-LD injection
    let schemaJson = "";
    if (route.type === "article") {
      const articleData: any = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": route.title,
        "description": route.description,
        "image": [full1200, full1080],
        "datePublished": (route as any).datePublished || "2026-09-01T08:00:00+02:00",
        "dateModified": (route as any).dateModified || "2026-09-20T10:00:00+02:00",
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
    } else if (route.type === "product") {
      schemaJson = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Product",
        "name": route.title,
        "description": route.description,
        "image": [full1080, full1200],
        "sku": route.sku || "BLOOM-PROD",
        "brand": {
          "@type": "Brand",
          "name": "Bloom by BotaniK"
        },
        "offers": {
          "@type": "Offer",
          "url": canonical,
          "priceCurrency": "EUR",
          "price": route.price || "29.00",
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
      });
    }

    if (schemaJson) {
      const scriptTag = `<script type="application/ld+json" id="bloom-ssr-schema">\n${schemaJson}\n    </script>`;
      updated = updated.replace("</head>", `    ${scriptTag}\n  </head>`);
    }

    return updated;
  } catch (err) {
    console.error("[injectServerSEO error]", err);
    return html;
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

      if (fs.existsSync(distIndex)) {
        res.setHeader("Content-Type", "text/html; charset=utf-8");
        res.setHeader("Cache-Control", "no-cache, must-revalidate");
        return res.sendFile(distIndex);
      } else if (fs.existsSync(rootIndex)) {
        let rawHtml = fs.readFileSync(rootIndex, "utf-8");
        if (viteDevServer) {
          rawHtml = await viteDevServer.transformIndexHtml(req.originalUrl, rawHtml);
          rawHtml = rawHtml.replace(/<script type="module" src="\/@vite\/client"><\/script>/g, '');
          rawHtml = rawHtml.replace(/<script\b[^>]*src=["']\/@vite\/client["'][^>]*><\/script>/gi, '');
        }
        return res.status(200).set({ "Content-Type": "text/html; charset=utf-8" }).end(rawHtml);
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
    viteDevServer = await setupVite(app);
    if (viteDevServer) {
      app.use((req, res, next) => {
        if (req.path.startsWith('/upload/') || req.path.includes('/upload/')) {
          const fallback = path.join(process.cwd(), 'public', 'images', 'logo_sidebar_1784886108085.png');
          if (fs.existsSync(fallback)) {
            res.setHeader('Content-Type', 'image/png');
            return res.sendFile(fallback);
          }
          return res.status(204).end();
        }
        next();
      });

      // ANTI-LOOP VITE (AI STUDIO)
      app.get('/@vite/client', (req, res) => {
        res.setHeader('Content-Type', 'application/javascript');
        return res.send('export default {};');
      });

      app.use(viteDevServer.middlewares);
      console.log("Vite middleware attached in dev");
    }
  }

  registerAppRoutes(app);

  registerCatchAll(app, IS_PROD);
  app.use(errorHandler);

  const server = app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server listening on http://0.0.0.0:${PORT} (${IS_PROD ? "production" : "development"})`);
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
```

---

## src/index.css (Les styles globaux et la charte graphique)
Chemin : `src/index.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  /* ==========================================================================
     POLICES : Manrope pour les titres, Inter pour le corps
     ========================================================================== */
  --font-sans: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-body: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-display: "Manrope", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;

  /* ==========================================================================
     PALETTE "PRÉCISION BOTANIQUE" & "VITAMINES" (AUDIT UX/UI)
     ========================================================================== */
  /* Fonds */
  --color-botanik-linen: #F9F6F0;   /* Fond principal Lin */
  --color-botanik-bg: #F9F6F0;      
  --color-botanik-cream: #F5F0E6;   /* Crème chaleureuse */
  --color-botanik-menu-bg: #FCFAF8; /* Fond menu élégant */
  --color-botanik-border: #E7DFD3;  /* Bordures douces */

  /* Verts (Structure & Ancrage) */
  --color-botanik-dark: #0F261E;    /* Vert Forêt Sombre (Texte / Fonds très sombres) */
  --vert-fonce: #1E2E25;            /* Vert profond pour textes forts */
  --vert-moyen: #4A5D4A;            /* Vert moyen pour sous-titres */
  --color-botanik-green: #3E4A3D;   /* Vert Mousse Profond (Signature) */
  --color-botanik-sage: #A8B8A0;    /* Sauge / Verveine (Sidebar, Footer, Hero) */
  --vert-clair-lisible: #7A8E7A;    /* Vert clair accessible (Ratio 4.6:1) */

  /* Échelle Orange (Action & Dynamisme) */
  --orange-energie: #E8772E;        /* CTA Principaux, Actions fortes */
  --orange-chaleur: #D4956A;        /* Accents, Badges, Liens */
  --orange-brume: #F5E6D8;          /* Fonds de cartes, Hover states */
  --color-botanik-ash: #8A8177;     /* Taupe / Gris Chaud */

  /* Animations */
  --animate-loading-bar: loading-bar 2s ease-in-out infinite;
  --animate-bounce-horizontal: bounce-horizontal 1.5s infinite;
}

@keyframes loading-bar { 0% { left: -100%; width: 100%; } 50% { left: 0%; width: 100%; } 100% { left: 100%; width: 100%; } }
@keyframes bounce-horizontal { 0%, 100% { transform: translateX(-25%); animation-timing-function: cubic-bezier(0.8, 0, 1, 1); } 50% { transform: translateX(0); animation-timing-function: cubic-bezier(0, 0, 0.2, 1); } }
@keyframes bloom-breath { 0%, 100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.03); opacity: 0.9; } }

/* ==========================================================================
   BASES & RESET
   ========================================================================== */
*, *::before, *::after { box-sizing: border-box; text-wrap: pretty; overflow-wrap: break-word; word-break: break-word; }
html { scroll-behavior: smooth; overflow-x: hidden !important; width: 100% !important; max-width: 100vw !important; touch-action: pan-y; -webkit-overflow-scrolling: touch; }
body {
  background-color: var(--color-botanik-bg);
  color: var(--vert-fonce);
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-x: hidden !important;
  width: 100% !important;
  max-width: 100vw !important;
  min-width: 320px;
  position: relative;
  touch-action: pan-y;
}
#root { overflow-x: hidden !important; width: 100% !important; max-width: 100vw !important; position: relative; }

@layer base { img, video, canvas, svg { max-width: 100%; height: auto; } }
header img[alt="Bloom by BotaniK"] { width: 44px !important; height: 44px !important; object-fit: contain; }

/* ==========================================================================
   CLASSES UTILITAIRES COULEURS
   ========================================================================== */
.bg-botanik-green { background-color: var(--color-botanik-green); }
.bg-botanik-sage { background-color: var(--color-botanik-sage); }
.bg-botanik-dark { background-color: var(--color-botanik-dark); }
.bg-orange-energie { background-color: var(--orange-energie); }
.bg-orange-brume { background-color: var(--orange-brume); }

.text-botanik-green { color: var(--color-botanik-green); }
.text-botanik-sage { color: var(--color-botanik-sage); }
.text-orange-energie { color: var(--orange-energie) !important; }
.text-orange-chaleur { color: var(--orange-chaleur) !important; }
.text-vert-moyen { color: var(--vert-moyen) !important; }

/* ==========================================================================
   TYPOGRAPHIE & HIÉRARCHIE (AUDIT : Loi de Von Restorff)
   ========================================================================== */
h1, h2, h3, h4, h5, h6, .h1, .h2, .h3, .h4, .h5, .h6, [class*="font-display"], .font-display {
  font-family: var(--font-display) !important;
  text-wrap: balance;
  color: var(--vert-fonce);
}

h1, .h1 { font-weight: 800 !important; line-height: 1.05; letter-spacing: -0.03em !important; font-size: clamp(2.1rem, 9vw, 3rem); }
@media (min-width: 1024px) { h1, .h1 { font-size: clamp(2.5rem, 5vw, 4.5rem); letter-spacing: -0.02em !important; } }

h2, .h2 { font-weight: 700 !important; line-height: 1.15; letter-spacing: -0.02em !important; font-size: clamp(1.6rem, 7vw, 2.2rem); }
@media (min-width: 1024px) { h2, .h2 { font-size: clamp(1.75rem, 3vw, 3rem); letter-spacing: -0.015em !important; } }

h3, .h3 { font-weight: 600 !important; line-height: 1.25; letter-spacing: -0.01em !important; font-size: clamp(1.25rem, 4vw, 1.6rem); }
h4, .h4 { font-weight: 600 !important; line-height: 1.3; font-size: clamp(1.1rem, 3vw, 1.35rem); }
h5, h6, .h5, .h6 { font-weight: 600 !important; line-height: 1.4; font-size: clamp(0.95rem, 2.5vw, 1.15rem); }

/* Corps de texte */
p, li, span, a, label, button, blockquote, dt, dd, th, td, input, textarea, select { font-family: var(--font-sans); }
p, li { font-size: 1rem; line-height: 1.7; max-width: 75ch; color: var(--vert-fonce); }

/* Sous-titres */
.intro-text, .subtitle, .subheading {
  font-size: clamp(1.05rem, 2vw, 1.25rem);
  line-height: 1.6;
  font-weight: 500;
  color: var(--vert-moyen) !important;
  font-style: italic;
}

/* Badges & Labels */
.label-caps, .badge-caps {
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 0.75rem;
}

/* Prix */
.price, [data-price], .price-currency, .currency, [class*="price-value"] {
  font-family: var(--font-display) !important;
  color: var(--vert-fonce);
  font-weight: 800;
}

/* ==========================================================================
   BOUTONS & CTA
   ========================================================================== */
.btn-primary, button[data-cta="cart"], .btn-add-to-cart {
  background-color: var(--orange-energie) !important;
  color: #FFFFFF !important;
  font-weight: 700 !important;
  letter-spacing: 0.02em;
  border-radius: 0.75rem !important;
  transition: background-color 0.2s ease, transform 0.15s ease, box-shadow 0.2s ease;
  box-shadow: 0 4px 14px rgba(232, 119, 46, 0.3);
}
.btn-primary:hover, button[data-cta="cart"]:hover, .btn-add-to-cart:hover {
  background-color: #D4651F !important;
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(232, 119, 46, 0.4);
}

.btn-secondary {
  background-color: transparent !important;
  color: var(--orange-energie) !important;
  border: 1px solid var(--orange-energie) !important;
  font-weight: 600 !important;
  transition: all 0.2s ease;
}
.btn-secondary:hover { background-color: var(--orange-brume) !important; }

/* ==========================================================================
   CARTES & COMPOSANTS
   ========================================================================== */
.rounded-organic { border-radius: 1rem !important; }
.rounded-organic-lg { border-radius: 1.25rem !important; }

.product-card, [data-product-card], .recipe-card, .card, .bloom-card {
  background-color: #FFFFFF !important;
  border: 1px solid var(--color-botanik-border) !important;
  border-radius: 1rem !important;
  box-shadow: 0 4px 20px rgba(30, 46, 37, 0.04);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.product-card:hover, [data-product-card]:hover, .recipe-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(30, 46, 37, 0.08);
}

.badge-ecommerce-accent, .badge-new, .badge-sale {
  background-color: var(--orange-brume) !important;
  color: var(--orange-energie) !important;
  border: 1px solid var(--orange-chaleur) !important;
  border-radius: 9999px;
  font-weight: 700;
}

/* ==========================================================================
   LIENS & INTERACTIONS
   ========================================================================== */
p a:not([class*="btn"]):not([class*="button"]):not([class*="bg-"]):not([class*="rounded-full"]),
.prose a:not([class*="btn"]):not([class*="button"]):not([class*="bg-"]) {
  color: var(--orange-energie);
  text-decoration: underline;
  text-underline-offset: 3px;
  text-decoration-color: var(--orange-energie);
  text-decoration-thickness: 1.5px;
  transition: color 0.2s ease, text-decoration-color 0.2s ease;
}
p a:hover, .prose a:hover { color: var(--vert-fonce); text-decoration-color: var(--vert-fonce); }

/* ==========================================================================
   SÉCURITÉ CONTRASTE (WCAG 2.1 AA+)
   ========================================================================== */
.btn-primary {
  color: #FFFFFF !important;
}

/* ==========================================================================
   BLOOM ACADÉMIE & FUNNEL
   ========================================================================== */
.academie-badge, .tag-education, .tag-level {
  background-color: rgba(168, 184, 160, 0.25) !important;
  color: var(--vert-fonce) !important;
  border: 1px solid rgba(168, 184, 160, 0.6) !important;
  border-radius: 9999px;
  font-weight: 700;
}

.academie-progress-bar { background-color: var(--vert-fonce); border-radius: 9999px; }
.academie-card-box { border-left: 4px solid var(--orange-energie); background-color: var(--orange-brume); border-radius: 0.75rem; }

.funnel-micro-cta {
  background-color: var(--orange-brume);
  color: var(--orange-energie);
  border: 1px solid var(--orange-chaleur);
  border-radius: 0.75rem;
  font-weight: 700;
  transition: all 0.2s ease;
}
.funnel-micro-cta:hover { background-color: var(--orange-energie); color: #FFFFFF; }
```

---

## tailwind.config.js (La configuration des couleurs)
Chemin : `tailwind.config.js`

```javascript
import tailwindAnimate from 'tailwindcss-animate';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Manrope', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        'botanik-linen': '#F9F6F0',
        'botanik-bg': '#F9F6F0',
        'botanik-cream': '#F5F0E6',
        'botanik-tan': '#D4C5B9',
        'botanik-ash': '#8A8177',
        'botanik-green': '#3E4A3D',
        'botanik-sage': '#A8B8A0',
        'botanik-orange': '#C8AB8A',
        'botanik-clay': '#C8AB8A',
        'botanik-border': '#E7DFD3',
        'botanik-dark': '#0F261E',
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [
    tailwindAnimate,
  ],
};

```

---

## src/App.tsx (Le routeur principal et la structure)
Chemin : `src/App.tsx`

```tsx
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState, useMemo } from 'react';
import {
  Lock,
  ShoppingBag,
  BookOpen,
  FlaskConical,
  Menu,
  X,
  ChevronRight,
  Leaf,
  ShieldCheck,
  Award,
  Star,
  User,
  Check,
  ArrowRight,
  Sparkles,
  Utensils,
  Droplets,
  MessageCircle,
  Activity,
  Home,
  FileText,
  Newspaper,
  HelpCircle,
  Package,
  Calculator,
  HeartHandshake,
  GraduationCap,
  ChevronDown,
  Layers
} from 'lucide-react';
import { translations, Language } from './translations';
import Footer from './components/Footer';
import { AuthModal } from './components/AuthModal';
import { PremiumModal } from './components/PremiumModal';
import { auth, db } from './lib/firebase';
import { onAuthStateChanged, User as FirebaseUser, signOut } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import { CookieBanner } from './components/CookieBanner';
import { FloatingChat } from './components/FloatingChat';
import { LanguageSelector } from './components/LanguageSelector';
import { View, VIEW_PATHS } from './types';
import { BloomLogo } from './components/ui/BloomLogo';
import { NavigationSidebar } from './components/NavigationSidebar';
import { ShippingMethod } from './lib/shippingUtils';

import HomeContent from './HomeContent';
import HerbariumContent from './HerbariumContent';
import StoreContent from './StoreContent';
import GuideContent from './GuideContent';
import CartContent from './CartContent';
import CheckoutFlow from './CheckoutFlow';
import ProductDetail from './ProductDetail';
import CulinarySection from './CulinarySection';
import CosmeticsContent from './CosmeticsContent';
import LibraryLanding from './LibraryLanding';
import ActivationPage from './ActivationPage';
import LegalPages from './LegalPages';
import ChatContent from './ChatContent';
import AccountContent from './AccountContent';
import RecipesContent from './RecipesContent';
import PublicRecipeCatalog from './components/recipes/PublicRecipeCatalog';
import AdminDashboard from './components/AdminDashboard';
import ManifesteContent from './ManifesteContent';
import MachineLanding from './MachineLanding';
import PhytotherapyResetPage from './PhytotherapyResetPage';
import PillarExtraction from './PillarExtraction';
import PillarInfusion from './PillarInfusion';
import PillarOil from './PillarOil';
import PillarAdaptogens from './PillarAdaptogens';
import PendingContent from './PendingContent';
import IndexBisContent from './IndexBisContent';
import * as SEOArticlesExports from './SEOArticlesContent';
import { NewsletterPreferences } from './NewsletterPreferences';
import { AdminNewsletter } from './components/AdminNewsletter';
import BlogContent from './BlogContent';
import FaqContent from './FaqContent';
import ContactContent from './ContactContent';
import ArticlesContent from './ArticlesContent';
import PremiumInfoContent from './PremiumInfoContent';
import LexiqueContent from './LexiqueContent';
import TerrainPillar from './TerrainPillar';
import ExtractionCalculator from './components/ExtractionCalculator';
import ProtocolePsoriasisContent from './ProtocolePsoriasisContent';
import ProtocoleSiboContent from './ProtocoleSiboContent';
import ProtocoleMyelineContent from './ProtocoleMyelineContent';
import ProtocoleDecalcificationPinealeContent from './ProtocoleDecalcificationPinealeContent';
import BlogVieillissementMyelineContent from './BlogVieillissementMyelineContent';
import BloomAcademiePage from './BloomAcademiePage';
import Les4ArchitecturesContent from './Les4ArchitecturesContent';
import CommentLireModeleBloomContent from './CommentLireModeleBloomContent';
import NeufAxesHistoriquesContent from './NeufAxesHistoriquesContent';
import ChargeAllostatiqueContent from './ChargeAllostatiqueContent';
import MetabolismeInsulineContent from './MetabolismeInsulineContent';
import ProtocolesSystemiquesContent from './ProtocolesSystemiquesContent';
import Module0ChocParadigmeContent from './academie/Module0ChocParadigmeContent';
import AxeA1EmonctoiresContent from './academie/AxeA1EmonctoiresContent';
import PillarPagesContent from './PillarPagesContent';
import { updateDocumentSEO } from './utils/seoManager';

const PATH_VIEWS: Record<string, View> = {
  ...Object.fromEntries(
    Object.entries(VIEW_PATHS).flatMap(([view, path]) => {
      const withSlash = path.endsWith('/') ? path : `${path}/`;
      const withoutSlash = path.endsWith('/') ? path.slice(0, -1) : path;
      return [
        [path, view as View],
        [withSlash, view as View],
        [withoutSlash, view as View]
      ];
    })
  ),
  '/': 'indexbis',
  '/academie/axes/a1-emonctoires': 'axe-a1',
  '/academie/axes/a1-emonctoires/': 'axe-a1',
  '/academie/axes/a1': 'axe-a1',
  '/academie/axes/a1/': 'axe-a1',
  '/academie': 'comment-lire-modele-bloom',
  '/academie/': 'comment-lire-modele-bloom',
  '/academie/herbier': 'herbier',
  '/academie/herbier/': 'herbier',
  '/academie/bibliotheque': 'bibliotheque',
  '/academie/bibliotheque/': 'bibliotheque',
  '/remedes-naturels': 'remedes-naturels-maison-guide',
  '/remedes-naturels/': 'remedes-naturels-maison-guide',
  '/extraction-botanique': 'pillar-extraction',
  '/extraction-botanique/': 'pillar-extraction',
  '/totum-vegetal': 'totum-vegetal',
  '/totum-vegetal/': 'totum-vegetal',
  '/cosmetiques-naturels-diy': 'cosmetiques',
  '/cosmetiques-naturels-diy/': 'cosmetiques',
  '/academie/comprendre-le-corps': '4-architectures',
  '/academie/comprendre-le-corps/': '4-architectures',
  '/academie/comprendre-le-modele-bloom': 'comment-lire-modele-bloom',
  '/academie/comprendre-le-modele-bloom/': 'comment-lire-modele-bloom',
  '/comprendre-le-modele-bloom': 'comment-lire-modele-bloom',
  '/comprendre-le-modele-bloom/': 'comment-lire-modele-bloom',
  '/academie/comprendre-le-corps/comment-lire-le-modele-bloom': 'comment-lire-modele-bloom',
  '/academie/comprendre-le-corps/comment-lire-le-modele-bloom/': 'comment-lire-modele-bloom',
  '/comprendre-le-corps/comment-lire-le-modele-bloom': 'comment-lire-modele-bloom',
  '/comprendre-le-corps/comment-lire-le-modele-bloom/': 'comment-lire-modele-bloom',
  '/academie/comprendre-le-corps/4-architectures': '4-architectures',
  '/academie/comprendre-le-corps/4-architectures/': '4-architectures',
  '/comprendre-le-corps/4-architectures': '4-architectures',
  '/comprendre-le-corps/4-architectures/': '4-architectures',
  '/academie/comprendre-le-corps/7-terrains': 'terrain',
  '/academie/comprendre-le-corps/7-terrains/': 'terrain',
  '/comprendre-le-corps/7-terrains': 'terrain',
  '/comprendre-le-corps/7-terrains/': 'terrain',
  '/terrains': 'terrain',
  '/terrains/': 'terrain',
  '/academie/comprendre-le-corps/9-axes-historiques': '9-axes',
  '/academie/comprendre-le-corps/9-axes-historiques/': '9-axes',
  '/comprendre-le-corps/9-axes-historiques': '9-axes',
  '/comprendre-le-corps/9-axes-historiques/': '9-axes',
  '/academie/comprendre-le-corps/charge-allostatique': 'charge-allostatique',
  '/academie/comprendre-le-corps/charge-allostatique/': 'charge-allostatique',
  '/comprendre-le-corps/charge-allostatique': 'charge-allostatique',
  '/comprendre-le-corps/charge-allostatique/': 'charge-allostatique',
  '/academie/comprendre-le-corps/reset-homeostasique': 'phytotherapie-reset',
  '/academie/comprendre-le-corps/reset-homeostasique/': 'phytotherapie-reset',
  '/comprendre-le-corps/reset-homeostasique': 'phytotherapie-reset',
  '/comprendre-le-corps/reset-homeostasique/': 'phytotherapie-reset',
  '/academie/comprendre-le-corps/metabolisme-glucidique-insuline': 'metabolisme-insuline',
  '/academie/comprendre-le-corps/metabolisme-glucidique-insuline/': 'metabolisme-insuline',
  '/comprendre-le-corps/metabolisme-glucidique-insuline': 'metabolisme-insuline',
  '/comprendre-le-corps/metabolisme-glucidique-insuline/': 'metabolisme-insuline',
  '/protocoles': 'protocoles',
  '/protocoles/': 'protocoles',
  '/protocoles/psoriasis': 'protocole-psoriasis',
  '/protocoles/psoriasis/': 'protocole-psoriasis',
  '/protocoles/sibo': 'protocole-sibo',
  '/protocoles/sibo/': 'protocole-sibo',
  '/protocoles/clarte-mentale': 'protocole-myeline',
  '/protocoles/clarte-mentale/': 'protocole-myeline',
  '/protocoles/decalcification-pineale': 'protocole-decalcification-pineale',
  '/protocoles/decalcification-pineale/': 'protocole-decalcification-pineale',
  '/academie/protocoles': 'protocoles',
  '/academie/protocoles/': 'protocoles',
  '/academie/protocoles/psoriasis': 'protocole-psoriasis',
  '/academie/protocoles/psoriasis/': 'protocole-psoriasis',
  '/academie/protocoles/sibo': 'protocole-sibo',
  '/academie/protocoles/sibo/': 'protocole-sibo',
  '/academie/protocoles/clarte-mentale': 'protocole-myeline',
  '/academie/protocoles/clarte-mentale/': 'protocole-myeline',
  '/academie/protocoles/decalcification-pineale': 'protocole-decalcification-pineale',
  '/academie/protocoles/decalcification-pineale/': 'protocole-decalcification-pineale',
  '/bloomlab': 'machine',
  '/bloomlab/': 'machine',
  '/boutique/kits': 'boutique-kits',
  '/boutique/kits/': 'boutique-kits',
  '/abonnement': 'abonnement',
  '/abonnement/': 'abonnement',
  '/boutique/abonnements-numeriques': 'abonnement',
  '/boutique/abonnements-numeriques/': 'abonnement',
  '/abonnements-numeriques': 'abonnement',
  '/abonnements-numeriques/': 'abonnement',
  '/infusion-botanique-maison-comment-ca-marche': 'infusion-botanique',
  '/infusion-botanique-maison-comment-ca-marche/': 'infusion-botanique',
  '/lexique': 'lexique',
  '/lexique/': 'lexique',
  '/boutique/bloomlab': 'machine',
  '/boutique/bloomlab/': 'machine',
  '/boutique/bundle-apothicaire': 'product-detail',
  '/boutique/bundle-apothicaire/': 'product-detail',
  '/boutique/pack-signature': 'product-detail',
  '/boutique/pack-signature/': 'product-detail',
  '/boutique/kit-starter': 'product-detail',
  '/boutique/kit-starter/': 'product-detail',
  '/boutique/kit-nuit': 'product-detail',
  '/boutique/kit-nuit/': 'product-detail',
  '/boutique/kit-digestion': 'product-detail',
  '/boutique/kit-digestion/': 'product-detail',
  '/boutique/kit-articulaire': 'product-detail',
  '/boutique/kit-articulaire/': 'product-detail',
  '/boutique/kit-hiver': 'product-detail',
  '/boutique/kit-hiver/': 'product-detail',
  '/boutique/duo-argiles': 'product-detail',
  '/boutique/duo-argiles/': 'product-detail',
  '/phytotherapie-reset/protocole-psoriasis': 'protocole-psoriasis',
  '/phytotherapie-reset/protocole-psoriasis/': 'protocole-psoriasis',
  '/phytotherapie-reset/protocole-sibo': 'protocole-sibo',
  '/phytotherapie-reset/protocole-sibo/': 'protocole-sibo',
  '/protocoles-systemiques/protocole-sibo': 'protocole-sibo',
  '/protocoles-systemiques/protocole-sibo/': 'protocole-sibo',
  '/protocoles/myeline': 'protocole-myeline',
  '/protocoles/myeline/': 'protocole-myeline',
  '/phytotherapie-reset/protocole-clarte-mentale': 'protocole-myeline',
  '/phytotherapie-reset/protocole-clarte-mentale/': 'protocole-myeline',
  '/protocoles-systemiques/protocole-myeline': 'protocole-myeline',
  '/protocoles-systemiques/protocole-myeline/': 'protocole-myeline',
  '/blog/vieillissement-myeline-fgf17': 'blog-vieillissement-myeline',
  '/blog/vieillissement-myeline-fgf17/': 'blog-vieillissement-myeline',
  '/blog/vieillissement-myeline-fgf17-clarte-mentale': 'blog-vieillissement-myeline',
  '/blog/vieillissement-myeline-fgf17-clarte-mentale/': 'blog-vieillissement-myeline',
  '/blog/le-vieillissement-n-est-pas-une-fatalite': 'blog-vieillissement-myeline',
  '/blog/le-vieillissement-n-est-pas-une-fatalite/': 'blog-vieillissement-myeline',
};

const SEOArticles = ({ view, lang, t, onNavigate, isPremium, onRequireAuth }: { view: string; lang: Language; t: any; onNavigate?: (view: any, param?: string) => void; isPremium?: boolean; onRequireAuth?: () => void }) => {
  if (view === 'infusion-precision') return <SEOArticlesExports.InfusionPrecision lang={lang} t={t} onNavigate={onNavigate} />;
  if (view === 'totum-definition' || view === 'totum-vegetal') return <SEOArticlesExports.TotumDefinition lang={lang} t={t} onNavigate={onNavigate} />;
  if (view === 'solvants-extraction' || view === 'teinture-mere') return <SEOArticlesExports.SolvantsExtraction lang={lang} t={t} onNavigate={onNavigate} isPremium={isPremium} onRequireAuth={onRequireAuth} />;
  return null;
};

const CertificationCarousel = () => {
  const items = [
    { title: "Verre Borosilicate 3.3 Neutre", desc: "Zéro lixiviation, inertie totale aux solvants polaires" },
    { title: "Inox 316L Chirurgical", desc: "Grade pharmaceutique, résistant aux acides et alcools" },
    { title: "Thermo-Régulation 40-100°C", desc: "Précision ±1°C, préservation des composés thermolabiles" },
    { title: "Circulation Dynamique Active", desc: "Flux vortex continu, gradient d'extraction optimal" },
    { title: "Standard Totum BOTANIK", desc: "Spectre moléculaire complet non dénaturé" },
  ];
  return (
    <div className="w-full bg-[#1A2621] py-2.5 overflow-hidden border-b border-white/5">
      <div className="flex animate-marquee whitespace-nowrap gap-12 text-[11px] uppercase tracking-widest text-[#E8DCC4]/70 font-mono">
        {items.concat(items).map((item, idx) => (
          <div key={idx} className="inline-flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></span>
            <span className="font-bold text-[#FAF8F5]">{item.title}</span>
            <span className="text-[#E8DCC4]/50">— {item.desc}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function App() {
  const [currentView, setCurrentView] = useState<View>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      if (path === '/boutique/kits' || path === '/boutique/kits/') {
        return 'boutique-kits';
      }
      if (path === '/bloomlab' || path === '/bloomlab/') {
        return 'machine';
      }
      if (path.startsWith('/boutique/') && path !== '/boutique/' && path !== '/boutique') {
        return 'product-detail';
      }
      if (path.startsWith('/produit/') && path !== '/produit/' && path !== '/produit') {
        return 'product-detail';
      }
      if (path.startsWith('/articles/') && path !== '/articles/' && path !== '/articles') {
        return 'articles';
      }
      if (path.startsWith('/blog/') && path !== '/blog/' && path !== '/blog') {
        return 'blog';
      }
      if (path.startsWith('/recettes')) {
        if (path === '/recettes' || path === '/recettes/') return 'recettes-hub';
        if (path.startsWith('/recettes/culinaires')) {
          if (path === '/recettes/culinaires' || path === '/recettes/culinaires/' || path.startsWith('/recettes/culinaires/page/')) return 'recettes-culinaires';
          return 'recette-detail';
        }
        if (path.startsWith('/recettes/cosmetiques')) {
          if (path === '/recettes/cosmetiques' || path === '/recettes/cosmetiques/' || path.startsWith('/recettes/cosmetiques/page/')) return 'recettes-cosmetiques';
          return 'recette-detail';
        }
        if (path.startsWith('/recettes/parcours-botaniques')) {
          if (path === '/recettes/parcours-botaniques' || path === '/recettes/parcours-botaniques/' || path.startsWith('/recettes/parcours-botaniques/page/')) return 'recettes-parcours';
          return 'recette-detail';
        }
        return 'recette-detail';
      }
      if (PATH_VIEWS[path]) {
        return PATH_VIEWS[path];
      }
      const params = new URLSearchParams(window.location.search);
      const viewParam = params.get('view');
      if (viewParam && viewParam in VIEW_PATHS) {
        return viewParam as View;
      }
    }
    return 'indexbis';
  });

  const [selectedLanguage, setSelectedLanguage] = useState<Language>('fr');
  const [selectedProduct, setSelectedProduct] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      if (path.startsWith('/boutique/') && path !== '/boutique/' && path !== '/boutique' && path !== '/boutique/kits/' && path !== '/boutique/kits') {
        return path.replace(/^\/boutique\//, '').replace(/\/$/, '');
      }
      if (path.startsWith('/produit/') && path !== '/produit/' && path !== '/produit') {
        return path.replace(/^\/produit\//, '').replace(/\/$/, '');
      }
    }
    return 'bloomlab';
  });
  const [selectedSlug, setSelectedSlug] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      if (path.startsWith('/articles/') && path !== '/articles/' && path !== '/articles') {
        return path.replace(/^\/articles\//, '').replace(/\/$/, '');
      }
      if (path.startsWith('/blog/') && path !== '/blog/' && path !== '/blog') {
        return path.replace(/^\/blog\//, '').replace(/\/$/, '');
      }
    }
    return '';
  });
  const [selectedTerrain, setSelectedTerrain] = useState<string>('T1');
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isPremiumOpen, setIsPremiumOpen] = useState(false);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileBloomAcademyOpen, setMobileBloomAcademyOpen] = useState(true);
  const [mobileComprendreCorpsOpen, setMobileComprendreCorpsOpen] = useState(true);
  const [shippingMethod, setShippingMethod] = useState<ShippingMethod>('colissimo');
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const [savedAssessment, setSavedAssessment] = useState<any>(null);

  // Cart state
  const [cart, setCart] = useState<any[]>(() => {
    try {
      const saved = localStorage.getItem('bloom-cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Auth and Subscription observer
  useEffect(() => {
    let unsubscribeDoc: (() => void) | null = null;

    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (unsubscribeDoc) {
        unsubscribeDoc();
        unsubscribeDoc = null;
      }
      if (currentUser) {
        const userRef = doc(db, 'users', currentUser.uid);
        unsubscribeDoc = onSnapshot(
          userRef,
          (snap) => {
            if (snap.exists()) {
              const data = snap.data();
              const hasPaid = Boolean(data?.isPremium) && (!data?.isPremiumUntil || new Date(data.isPremiumUntil).getTime() > Date.now());
              setIsSubscribed(hasPaid);
            } else {
              setIsSubscribed(false);
            }
          },
          () => {
            setIsSubscribed(false);
          }
        );
      } else {
        setIsSubscribed(false);
      }
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeDoc) unsubscribeDoc();
    };
  }, []);

  // History sync
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path === '/boutique/kits' || path === '/boutique/kits/') {
        setCurrentView('boutique-kits');
        return;
      }
      if (path === '/bloomlab' || path === '/bloomlab/') {
        setCurrentView('machine');
        return;
      }
      if (path.startsWith('/boutique/') && path !== '/boutique/' && path !== '/boutique') {
        const prod = path.replace(/^\/boutique\//, '').replace(/\/$/, '');
        setSelectedProduct(prod);
        setCurrentView('product-detail');
        return;
      }
      if (path.startsWith('/produit/') && path !== '/produit/' && path !== '/produit') {
        const prod = path.replace(/^\/produit\//, '').replace(/\/$/, '');
        setSelectedProduct(prod);
        setCurrentView('product-detail');
        return;
      }
      if (path.startsWith('/articles/') && path !== '/articles/' && path !== '/articles') {
        const slug = path.replace(/^\/articles\//, '').replace(/\/$/, '');
        setSelectedSlug(slug);
        setCurrentView('articles');
        return;
      }
      if (path.startsWith('/blog/') && path !== '/blog/' && path !== '/blog') {
        const slug = path.replace(/^\/blog\//, '').replace(/\/$/, '');
        setSelectedSlug(slug);
        setCurrentView('blog');
        return;
      }
      if (path.startsWith('/recettes')) {
        if (path === '/recettes' || path === '/recettes/') {
          setCurrentView('recettes-hub');
          return;
        }
        if (path.startsWith('/recettes/culinaires')) {
          if (path === '/recettes/culinaires' || path === '/recettes/culinaires/' || path.startsWith('/recettes/culinaires/page/')) {
            setCurrentView('recettes-culinaires');
          } else {
            setCurrentView('recette-detail');
          }
          return;
        }
        if (path.startsWith('/recettes/cosmetiques')) {
          if (path === '/recettes/cosmetiques' || path === '/recettes/cosmetiques/' || path.startsWith('/recettes/cosmetiques/page/')) {
            setCurrentView('recettes-cosmetiques');
          } else {
            setCurrentView('recette-detail');
          }
          return;
        }
        if (path.startsWith('/recettes/parcours-botaniques')) {
          if (path === '/recettes/parcours-botaniques' || path === '/recettes/parcours-botaniques/' || path.startsWith('/recettes/parcours-botaniques/page/')) {
            setCurrentView('recettes-parcours');
          } else {
            setCurrentView('recette-detail');
          }
          return;
        }
        setCurrentView('recette-detail');
        return;
      }
      const view = PATH_VIEWS[path] || 'indexbis';
      setCurrentView(view);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Synchronize document SEO, Meta, Canonical & Hreflang
  useEffect(() => {
    updateDocumentSEO(currentView, selectedLanguage, selectedProduct, selectedSlug);
  }, [currentView, selectedLanguage, selectedProduct, selectedSlug]);

  // Scroll to top on view change
  const navigateTo = (view: View, param?: string) => {
    setCurrentView(view);
    setMobileMenuOpen(false);
    if (param) {
      if (view === 'product-detail') setSelectedProduct(param);
      if (view === 'blog' || view === 'articles') setSelectedSlug(param);
      if (view === 'terrain') setSelectedTerrain(param);
    }
    if (view === 'chat' && (param === 'start' || param === 'new' || !param)) {
      setSavedAssessment(null);
    }
    window.scrollTo(0, 0);
    const targetPath = view === 'product-detail' && param 
      ? `/boutique/${param}/` 
      : (VIEW_PATHS[view] || '/');
    if (window.location.pathname !== targetPath) {
      window.history.pushState({ view, param }, '', targetPath);
    }
  };

  const addToCart = (product: any, quantity: number = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      let updated;
      if (existing) {
        updated = prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      } else {
        updated = [...prev, { ...product, quantity }];
      }
      try {
        localStorage.setItem('bloom-cart', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const updateCartQuantity = (id: string, delta: number) => {
    setCart((prev) => {
      const updated = prev
        .map((item) => {
          if (item.id === id) {
            const q = item.quantity + delta;
            return q > 0 ? { ...item, quantity: q } : null;
          }
          return item;
        })
        .filter(Boolean);
      try {
        localStorage.setItem('bloom-cart', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      try {
        localStorage.setItem('bloom-cart', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const cartCount = useMemo(() => {
    return cart.reduce((total, item) => total + (item.quantity || 1), 0);
  }, [cart]);

  const cartTotal = useMemo(() => {
    return cart.reduce((total, item) => total + (item.price || 0) * (item.quantity || 1), 0);
  }, [cart]);

  const t = translations[selectedLanguage] || translations.fr;

  return (
    <div 
      style={{ fontFamily: "'Manrope', sans-serif" }}
      className="min-h-screen bg-[#FAF8F5] text-[#1B3022] flex font-sans selection:bg-botanik-green selection:text-white w-full max-w-full overflow-x-hidden relative"
    >
      {/* 1. Left Persistent Sidebar (Desktop + Tablet >= 768px) */}
      <NavigationSidebar
        currentView={currentView}
        onNavigate={navigateTo}
        lang={selectedLanguage}
        setLang={setSelectedLanguage}
        cartCount={cartCount}
        user={user}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenCalculator={() => setIsCalculatorOpen(true)}
      />

      {/* 2. Main Content Wrapper offset by 280px on md+ */}
      <div className="flex-1 flex flex-col min-w-0 w-full max-w-full overflow-x-hidden md:pl-[280px]">
        {/* Top Navigation Bar: Mobile Only (< 768px) */}
        <header className="md:hidden sticky top-0 z-30 bg-[#0F261E] border-b border-white/10 transition-colors shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
            {/* Left side: Brand Logo */}
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                navigateTo('indexbis');
              }}
              className="flex items-center gap-2.5 text-left focus:outline-none group cursor-pointer shrink-0"
              id="brand-logo-btn"
              aria-label="Bloom by BotaniK - Accueil"
            >
              <BloomLogo variant="header" theme="dark" className="text-[#FAF7F2] group-hover:text-[#C8AB8A] transition-colors" />
              <div className="flex flex-col leading-tight uppercase text-[#FAF7F2] group-hover:text-[#C8AB8A] transition-colors">
                <span className="text-[9px] font-bold tracking-[0.22em] text-[#FAF7F2]/75">Bloom by</span>
                <span className="text-base font-black tracking-widest text-[#FAF7F2]">BotaniK</span>
              </div>
            </a>

            {/* Right side: Actions & Utilities */}
            <div className="flex items-center gap-2">
              <LanguageSelector
                lang={selectedLanguage}
                setLang={setSelectedLanguage}
                variant="mobile-header"
              />

              {user ? (
                <button
                  onClick={() => navigateTo('account')}
                  className="p-2 text-[#FAF7F2]/85 hover:text-white hover:bg-white/10 rounded-full transition-colors relative"
                  title="Mon Compte"
                  id="mobile-account-btn"
                >
                  <User className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={() => setIsAuthOpen(true)}
                  className="p-2 text-[#FAF7F2]/85 hover:text-white hover:bg-white/10 rounded-full transition-colors relative"
                  title="Connexion"
                  id="mobile-login-btn"
                >
                  <User className="w-4 h-4 text-[#FAF7F2]" />
                </button>
              )}

              {/* Shopping Cart Button */}
              <button
                onClick={() => navigateTo('cart')}
                className="relative p-2 bg-white/10 text-[#FAF7F2] hover:bg-white/20 border border-white/15 rounded-full transition-colors flex items-center justify-center shadow-xs"
                title="Panier"
                id="mobile-cart-btn"
              >
                <ShoppingBag className="w-4 h-4 text-[#FAF7F2]" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#C8AB8A] text-[#0F261E] text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-[#3E4A3D]">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Mobile Menu Hamburger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-[#FAF7F2] hover:bg-white/10 rounded-xl transition-colors"
                aria-label="Menu"
                id="mobile-menu-toggle"
              >
                {mobileMenuOpen ? <X className="w-6 h-6 text-[#FAF7F2]" /> : <Menu className="w-6 h-6 text-[#FAF7F2]" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation Drawer */}
          {mobileMenuOpen && (() => {
            const m = {
              accueil: selectedLanguage === 'fr' ? 'Accueil' : selectedLanguage === 'de' ? 'Startseite' : 'Home',
              manifeste: selectedLanguage === 'fr' ? 'Le Manifeste' : selectedLanguage === 'de' ? 'Das Manifest' : 'The Manifesto',
              infusion_botanique: selectedLanguage === 'fr' ? 'Infusion Botanique Maison' : selectedLanguage === 'de' ? 'Botanische Hausinfusion' : 'Home Botanical Infusion',
              bloomlab: selectedLanguage === 'fr' ? "L'Extracteur BloomLab®" : selectedLanguage === 'de' ? 'BloomLab® Extraktor' : 'BloomLab® Extractor',
              guide_extraction: selectedLanguage === 'fr' ? "Guide de l'extraction" : selectedLanguage === 'de' ? 'Extraktions-Leitfaden' : 'Extraction Guide',
              totum_vegetal: selectedLanguage === 'fr' ? 'Le Totum Végétal' : selectedLanguage === 'de' ? 'Das Pflanzen-Totum' : 'The Plant Totum',
              phytotherapie: selectedLanguage === 'fr' ? 'Protocoles Systémiques' : selectedLanguage === 'de' ? 'Systemische Protokolle' : 'Systemic Protocols',
              protocole_psoriasis: selectedLanguage === 'fr' ? 'Protocole Psoriasis' : selectedLanguage === 'de' ? 'Psoriasis-Protokoll' : 'Psoriasis Protocol',
              protocole_sibo: selectedLanguage === 'fr' ? 'Protocole SIBO' : selectedLanguage === 'de' ? 'SIBO-Protokoll' : 'SIBO Protocol',
              protocole_myeline: selectedLanguage === 'fr' ? 'Protocole Clarté Mentale' : selectedLanguage === 'de' ? 'Mentale Klarheit Protokoll' : 'Mental Clarity Protocol',
              diagnostic: selectedLanguage === 'fr' ? 'Bilan & Diagnostic ALMA' : selectedLanguage === 'de' ? 'ALMA Diagnose' : 'ALMA Assessment',
              boutique_toute: selectedLanguage === 'fr' ? 'Toute la Boutique' : selectedLanguage === 'de' ? 'Alle Produkte' : 'All Products',
              kits_plantes: selectedLanguage === 'fr' ? 'Kits de plantes' : selectedLanguage === 'de' ? 'Pflanzen-Kits' : 'Plant Kits',
              abonnement: selectedLanguage === 'fr' ? 'Abonnement Premium' : selectedLanguage === 'de' ? 'Premium-Abonnement' : 'Premium Subscription',
              herbier: selectedLanguage === 'fr' ? "L'Herbier" : selectedLanguage === 'de' ? 'Das Herbarium' : 'The Herbarium',
              culinaire: selectedLanguage === 'fr' ? 'Atelier Culinaire' : selectedLanguage === 'de' ? 'Kulinarische Werkstatt' : 'Culinary Workshop',
              cosmetiques: selectedLanguage === 'fr' ? 'Cosmétique Botanique' : selectedLanguage === 'de' ? 'Botanische Kosmetik' : 'Botanical Cosmetics',
              bibliotheque: selectedLanguage === 'fr' ? 'Bibliothèque Scientifique' : selectedLanguage === 'de' ? 'Wissenschaftliche Bibliothek' : 'Scientific Library',
              calculatrice: selectedLanguage === 'fr' ? 'Calculatrice de Dilution' : selectedLanguage === 'de' ? 'Verdünnungsrechner' : 'Dilution Calculator',
              espace_membre: selectedLanguage === 'fr' ? 'Espace membre' : selectedLanguage === 'de' ? 'Mitgliederbereich' : 'Member Area',
              faq: selectedLanguage === 'fr' ? 'Questions Fréquentes' : selectedLanguage === 'de' ? 'Häufige Fragen' : 'FAQ',
              contact: selectedLanguage === 'fr' ? 'Nous Contacter' : selectedLanguage === 'de' ? 'Kontakt' : 'Contact Us',
              mon_compte: selectedLanguage === 'fr' ? 'Mon Compte' : selectedLanguage === 'de' ? 'Mein Konto' : 'My Account',
              se_connecter: selectedLanguage === 'fr' ? 'Se connecter' : selectedLanguage === 'de' ? 'Anmelden' : 'Login',
              panier: selectedLanguage === 'fr' ? 'Panier' : selectedLanguage === 'de' ? 'Warenkorb' : 'Cart',
            };

            const sectionTitle = (title: string) => (
              <div className="text-[10px] font-black uppercase tracking-[0.22em] text-[#E8772E] px-3 pt-3 pb-1 border-b border-white/10 mb-1">
                {title}
              </div>
            );

            return (
              <div className="bg-[#0F261E] border-b border-white/10 px-5 py-5 max-h-[85vh] overflow-y-auto animate-in slide-in-from-top-4 duration-300">
                <div className="flex flex-col space-y-1">
                  
                  {/* SECTION: ACCUEIL */}
                  <button
                    onClick={() => { navigateTo('indexbis'); setMobileMenuOpen(false); }}
                    className="flex items-center gap-3 px-3 py-2 rounded-xl text-white font-semibold hover:bg-white/10 text-left text-sm"
                  >
                    <Home className="w-4 h-4 text-[#E8772E]" /> {m.accueil}
                  </button>

                  {/* SECTION: POURQUOI BLOOM */}
                  {sectionTitle(selectedLanguage === 'fr' ? 'POURQUOI BLOOM' : selectedLanguage === 'de' ? 'WARUM BLOOM' : 'WHY BLOOM')}
                  <button
                    onClick={() => { navigateTo('la-marque'); setMobileMenuOpen(false); }}
                    className="flex items-center gap-3 px-3 py-2 rounded-xl text-white font-medium hover:bg-white/10 text-left text-sm"
                  >
                    <HeartHandshake className="w-4 h-4 text-white/70" /> Histoire &amp; Philosophie
                  </button>

                  {/* SECTION: LA MÉTHODE A/B */}
                  {sectionTitle(selectedLanguage === 'fr' ? 'LA MÉTHODE A/B' : selectedLanguage === 'de' ? 'DIE A/B METHODE' : 'THE A/B METHOD')}
                  <button
                    onClick={() => { navigateTo('infusion-botanique'); setMobileMenuOpen(false); }}
                    className="flex items-center gap-3 px-3 py-2 rounded-xl text-white font-medium hover:bg-white/10 text-left text-sm"
                  >
                    <FlaskConical className="w-4 h-4 text-white/70" /> L'infusion botanique ?
                  </button>
                  <button
                    onClick={() => { navigateTo('totum-vegetal'); setMobileMenuOpen(false); }}
                    className="flex items-center gap-3 px-3 py-2 rounded-xl text-white font-medium hover:bg-white/10 text-left text-sm"
                  >
                    <Leaf className="w-4 h-4 text-white/70" /> Le Totum Végétal
                  </button>
                  <button
                    onClick={() => { navigateTo('guide-complet'); setMobileMenuOpen(false); }}
                    className="flex items-center gap-3 px-3 py-2 rounded-xl text-white font-medium hover:bg-white/10 text-left text-sm"
                  >
                    <BookOpen className="w-4 h-4 text-white/70" /> Guide de l'extraction
                  </button>

                  {/* SECTION: VOTRE PRATIQUE */}
                  {sectionTitle(selectedLanguage === 'fr' ? 'VOTRE PRATIQUE' : selectedLanguage === 'de' ? 'IHRE PRAXIS' : 'YOUR PRACTICE')}
                  <button
                    onClick={() => { navigateTo('culinaire'); setMobileMenuOpen(false); }}
                    className="flex items-center gap-3 px-3 py-2 rounded-xl text-white font-medium hover:bg-white/10 text-left text-sm"
                  >
                    <Utensils className="w-4 h-4 text-white/70" /> {m.culinaire}
                  </button>
                  <button
                    onClick={() => { navigateTo('cosmetiques'); setMobileMenuOpen(false); }}
                    className="flex items-center gap-3 px-3 py-2 rounded-xl text-white font-medium hover:bg-white/10 text-left text-sm"
                  >
                    <Droplets className="w-4 h-4 text-white/70" /> {m.cosmetiques}
                  </button>
                  <button
                    onClick={() => { navigateTo('phytotherapie-reset'); setMobileMenuOpen(false); }}
                    className="flex items-center gap-3 px-3 py-2 rounded-xl text-white font-medium hover:bg-white/10 text-left text-sm"
                  >
                    <Activity className="w-4 h-4 text-white/70" /> Reset Homéostasique
                  </button>

                  {/* SECTION: BOUTIQUE */}
                  {sectionTitle(selectedLanguage === 'fr' ? 'BOUTIQUE' : selectedLanguage === 'de' ? 'SHOP' : 'STORE')}
                  <button
                    onClick={() => { navigateTo('machine'); setMobileMenuOpen(false); }}
                    className="flex items-center gap-3 px-3 py-2 rounded-xl text-white font-medium hover:bg-white/10 text-left text-sm"
                  >
                    <Sparkles className="w-4 h-4 text-[#E8772E]" /> BloomLab®
                  </button>
                  <button
                    onClick={() => {
                      navigateTo('boutique-kits');
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-3 px-3 py-2 rounded-xl text-white font-medium hover:bg-white/10 text-left text-sm"
                  >
                    <Package className="w-4 h-4 text-white/70" /> Packs
                  </button>
                  <button
                    onClick={() => {
                      navigateTo('boutique');
                      setMobileMenuOpen(false);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="flex items-center gap-3 px-3 py-2 rounded-xl text-white font-medium hover:bg-white/10 text-left text-sm"
                  >
                    <ShoppingBag className="w-4 h-4 text-white/70" /> Accessoires
                  </button>
                  <button
                    onClick={() => { navigateTo('product-detail', 'duo-argiles'); setMobileMenuOpen(false); }}
                    className="flex items-center gap-3 px-3 py-2 rounded-xl text-white font-medium hover:bg-white/10 text-left text-sm"
                  >
                    <Leaf className="w-4 h-4 text-white/70" /> Argiles &amp; Matières Premières
                  </button>
                  <a
                    href="https://bloombybotanik.com/abonnement/"
                    onClick={(e) => {
                      if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                        e.preventDefault();
                        navigateTo('abonnement');
                        setMobileMenuOpen(false);
                      }
                    }}
                    className="flex items-center gap-3 px-3 py-2 rounded-xl text-white font-medium hover:bg-white/10 text-left text-sm"
                  >
                    <Star className="w-4 h-4 text-[#E8772E]" /> {m.abonnement}
                  </a>

                  {/* SECTION: RESSOURCES */}
                  {sectionTitle(selectedLanguage === 'fr' ? 'RESSOURCES' : selectedLanguage === 'de' ? 'RESSOURCEN' : 'RESOURCES')}
                  <button
                    onClick={() => { navigateTo('herbier'); setMobileMenuOpen(false); }}
                    className="flex items-center gap-3 px-3 py-2 rounded-xl text-white font-medium hover:bg-white/10 text-left text-sm"
                  >
                    <BookOpen className="w-4 h-4 text-white/70" /> {m.herbier}
                  </button>
                  <button
                    onClick={() => { navigateTo('lexique'); setMobileMenuOpen(false); }}
                    className="flex items-center gap-3 px-3 py-2 rounded-xl text-white font-medium hover:bg-white/10 text-left text-sm"
                  >
                    <BookOpen className="w-4 h-4 text-white/70" /> {selectedLanguage === 'fr' ? 'Lexique Botanik' : selectedLanguage === 'de' ? 'Botanik-Glossar' : 'Botanik Glossary'}
                  </button>
                  <a
                    href="https://bloombybotanik.com/bibliotheque/"
                    onClick={(e) => {
                      if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                        e.preventDefault();
                        navigateTo('library-landing');
                        setMobileMenuOpen(false);
                      }
                    }}
                    className="flex items-center gap-3 px-3 py-2 rounded-xl text-white font-medium hover:bg-white/10 text-left text-sm"
                  >
                    <Newspaper className="w-4 h-4 text-white/70" /> {m.bibliotheque}
                  </a>
                  <button
                    onClick={() => { setIsCalculatorOpen(true); setMobileMenuOpen(false); }}
                    className="flex items-center gap-3 px-3 py-2 rounded-xl text-white font-medium hover:bg-white/10 text-left text-sm"
                  >
                    <Calculator className="w-4 h-4 text-[#E8772E]" /> {m.calculatrice}
                  </button>
                  <button
                    onClick={() => { navigateTo('faq'); setMobileMenuOpen(false); }}
                    className="flex items-center gap-3 px-3 py-2 rounded-xl text-white font-medium hover:bg-white/10 text-left text-sm"
                  >
                    <HelpCircle className="w-4 h-4 text-white/70" /> {m.faq}
                  </button>
                  <button
                    onClick={() => { navigateTo('contact'); setMobileMenuOpen(false); }}
                    className="flex items-center gap-3 px-3 py-2 rounded-xl text-white font-medium hover:bg-white/10 text-left text-sm"
                  >
                    <MessageCircle className="w-4 h-4 text-white/70" /> {m.contact}
                  </button>

                  {/* SECTION: BLOOM ACADEMY (MENU DÉROULANT MOBILE) */}
                  <div className="pt-2 pb-1">
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <a
                        href="/academie/"
                        onClick={(e) => {
                          if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                            e.preventDefault();
                            navigateTo('academie');
                            setMobileMenuOpen(false);
                          }
                        }}
                        className="flex-1 flex items-center justify-between px-3 py-2 rounded-xl bg-[#E8772E]/10 hover:bg-[#E8772E]/20 border border-[#E8772E]/30 text-[#E8772E] transition-colors"
                      >
                        <span className="flex items-center gap-2 text-[#E8772E]">
                          <GraduationCap className="w-4 h-4 text-[#E8772E]" />
                          <span className="text-[#E8772E] font-bold text-xs tracking-wide">Bloom Academy</span>
                        </span>
                        <span className="text-[8px] uppercase px-1.5 py-0.5 rounded-full bg-[#E8772E]/20 text-[#FAF7F2] font-black tracking-wider border border-[#E8772E]/30">
                          {selectedLanguage === 'fr' ? 'Pédagogie' : selectedLanguage === 'de' ? 'Pädagogik' : 'Pedagogy'}
                        </span>
                      </a>
                      <button
                        type="button"
                        onClick={() => setMobileBloomAcademyOpen(!mobileBloomAcademyOpen)}
                        className="p-2 rounded-xl text-[#E8772E] hover:bg-[#E8772E]/15 border border-[#E8772E]/30 transition-colors cursor-pointer"
                        title="Ouvrir le menu Bloom Academy"
                      >
                        {mobileBloomAcademyOpen ? (
                          <ChevronDown className="w-4 h-4 text-[#E8772E]" />
                        ) : (
                          <ChevronRight className="w-4 h-4 text-[#E8772E]" />
                        )}
                      </button>
                    </div>
                  </div>

                  {mobileBloomAcademyOpen && (
                    <div className="space-y-1 mb-2">
                      {/* Lien Accueil */}
                      <a
                        href="/academie/"
                        onClick={(e) => {
                          if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                            e.preventDefault();
                            navigateTo('academie');
                            setMobileMenuOpen(false);
                          }
                        }}
                        className="flex items-center justify-between w-full px-3 py-2 rounded-xl bg-white/10 text-white font-bold text-xs uppercase tracking-wider hover:bg-white/20 transition-colors mb-1"
                      >
                        <span className="flex items-center gap-2.5">
                          <Home className="w-4 h-4 text-white/80" />
                          <span className="text-white font-bold">{selectedLanguage === 'fr' ? 'Accueil' : selectedLanguage === 'de' ? 'Startseite' : 'Home'}</span>
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 text-white/80" />
                      </a>

                      {/* Sous-Menu Déroulant: COMPRENDRE LE CORPS */}
                      <div className="pt-1 pb-1">
                        <button
                          type="button"
                          onClick={() => setMobileComprendreCorpsOpen(!mobileComprendreCorpsOpen)}
                          className="flex items-center justify-between w-full px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-[0.2em] text-[#E8772E] hover:bg-white/5 transition-colors cursor-pointer group"
                        >
                          <span className="flex items-center gap-1.5">
                            <Layers className="w-3 h-3 text-[#E8772E]" />
                            <span>{selectedLanguage === 'fr' ? 'COMPRENDRE LE CORPS' : selectedLanguage === 'de' ? 'DEN KÖRPER VERSTEHEN' : 'UNDERSTANDING THE BODY'}</span>
                          </span>
                          {mobileComprendreCorpsOpen ? (
                            <ChevronDown className="w-3.5 h-3.5 text-[#E8772E]/80" />
                          ) : (
                            <ChevronRight className="w-3.5 h-3.5 text-[#E8772E]/80" />
                          )}
                        </button>
                      </div>

                      {mobileComprendreCorpsOpen && (
                        <div className="space-y-0.5">
                          {/* 1. Comment lire le modèle Bloom (SEUL MODULE GRATUIT) */}
                          <button
                            onClick={() => { navigateTo('comment-lire-modele-bloom'); setMobileMenuOpen(false); }}
                            className="flex items-center justify-between w-full px-3 py-1.5 rounded-xl text-white font-medium hover:bg-white/10 text-left text-xs"
                          >
                            <span className="flex items-center gap-2">
                              <span className="text-white/40 font-mono text-[11px]">├──</span>
                              <span className="text-white">{selectedLanguage === 'fr' ? 'Comment lire le modèle Bloom' : selectedLanguage === 'de' ? 'Wie man das Bloom-Modell liest' : 'How to read the Bloom model'}</span>
                            </span>
                            <span className="text-[8px] uppercase px-1 py-0.2 rounded bg-emerald-500/20 text-emerald-400 font-bold shrink-0 border border-emerald-500/30">
                              {selectedLanguage === 'fr' ? 'Gratuit' : selectedLanguage === 'de' ? 'Gratis' : 'Free'}
                            </span>
                          </button>

                          {/* Module 0 : Le Choc de Paradigme */}
                          <button
                            onClick={() => { navigateTo('module-0'); setMobileMenuOpen(false); }}
                            className="flex items-center justify-between w-full px-3 py-1.5 rounded-xl text-white font-medium hover:bg-white/10 text-left text-xs"
                          >
                            <span className="flex items-center gap-2">
                              <span className="text-white/40 font-mono text-[11px]">├──</span>
                              <span className="text-white">{selectedLanguage === 'fr' ? 'Module 0 : Choc de Paradigme' : selectedLanguage === 'de' ? 'Modul 0 : Paradigmenwechsel' : 'Module 0 : Paradigm Shift'}</span>
                            </span>
                            <Lock className="w-3 h-3 text-[#E8772E] shrink-0" />
                          </button>

                          {/* Axe A1 : Émonctoires & Élimination */}
                          <a
                            href="/academie/axes/a1-emonctoires/"
                            onClick={(e) => { e.preventDefault(); navigateTo('axe-a1'); setMobileMenuOpen(false); }}
                            className="flex items-center justify-between w-full px-3 py-1.5 rounded-xl text-white font-medium hover:bg-white/10 text-left text-xs"
                          >
                            <span className="flex items-center gap-2">
                              <span className="text-white/40 font-mono text-[11px]">├──</span>
                              <span className="text-white">{selectedLanguage === 'fr' ? 'Axe A1 : Émonctoires' : selectedLanguage === 'de' ? 'Achse A1 : Ausscheidung' : 'Axis A1 : Emunctories'}</span>
                            </span>
                            <Lock className="w-3 h-3 text-[#E8772E] shrink-0" />
                          </a>

                          {/* 2. Les 4 Architectures (Payant / Abonnement) */}
                          <button
                            onClick={() => { navigateTo('4-architectures'); setMobileMenuOpen(false); }}
                            className="flex items-center justify-between w-full px-3 py-1.5 rounded-xl text-white font-medium hover:bg-white/10 text-left text-xs"
                          >
                            <span className="flex items-center gap-2">
                              <span className="text-white/40 font-mono text-[11px]">├──</span>
                              <span className="text-white">{selectedLanguage === 'fr' ? 'Les 4 Architectures' : selectedLanguage === 'de' ? 'Die 4 Architekturen' : 'The 4 Architectures'}</span>
                            </span>
                            <Lock className="w-3 h-3 text-white/50 shrink-0" />
                          </button>

                          {/* 3. Les 7 Terrains (Payant / Abonnement) */}
                          <button
                            onClick={() => { navigateTo('terrain'); setMobileMenuOpen(false); }}
                            className="flex items-center justify-between w-full px-3 py-1.5 rounded-xl text-white font-medium hover:bg-white/10 text-left text-xs"
                          >
                            <span className="flex items-center gap-2">
                              <span className="text-white/40 font-mono text-[11px]">├──</span>
                              <span className="text-white">{selectedLanguage === 'fr' ? 'Les 7 Terrains' : selectedLanguage === 'de' ? 'Die 7 Terrains' : 'The 7 Terrains'}</span>
                            </span>
                            <Lock className="w-3 h-3 text-white/50 shrink-0" />
                          </button>

                          {/* 4. Les 9 Axes historiques (Payant / Abonnement) */}
                          <button
                            onClick={() => { navigateTo('9-axes'); setMobileMenuOpen(false); }}
                            className="flex items-center justify-between w-full px-3 py-1.5 rounded-xl text-white font-medium hover:bg-white/10 text-left text-xs"
                          >
                            <span className="flex items-center gap-2">
                              <span className="text-white/40 font-mono text-[11px]">├──</span>
                              <span className="text-white">{selectedLanguage === 'fr' ? 'Les 9 Axes historiques' : selectedLanguage === 'de' ? 'Die 9 Historischen Achsen' : 'The 9 Historical Axes'}</span>
                            </span>
                            <Lock className="w-3 h-3 text-white/50 shrink-0" />
                          </button>

                          {/* 5. La Charge Allostatique (Payant / Abonnement) */}
                          <button
                            onClick={() => { navigateTo('charge-allostatique'); setMobileMenuOpen(false); }}
                            className="flex items-center justify-between w-full px-3 py-1.5 rounded-xl text-white font-medium hover:bg-white/10 text-left text-xs"
                          >
                            <span className="flex items-center gap-2">
                              <span className="text-white/40 font-mono text-[11px]">├──</span>
                              <span className="text-white">{selectedLanguage === 'fr' ? 'La Charge Allostatique' : selectedLanguage === 'de' ? 'Die Allostatische Last' : 'The Allostatic Load'}</span>
                            </span>
                            <Lock className="w-3 h-3 text-white/50 shrink-0" />
                          </button>

                          {/* 6. Le Reset Homéostasique (Payant / Abonnement) */}
                          <button
                            onClick={() => { navigateTo('phytotherapie-reset'); setMobileMenuOpen(false); }}
                            className="flex items-center justify-between w-full px-3 py-1.5 rounded-xl text-white font-medium hover:bg-white/10 text-left text-xs"
                          >
                            <span className="flex items-center gap-2">
                              <span className="text-white/40 font-mono text-[11px]">├──</span>
                              <span className="text-white">{selectedLanguage === 'fr' ? 'Le Reset Homéostasique' : selectedLanguage === 'de' ? 'Der Homöostatische Reset' : 'The Homeostatic Reset'}</span>
                            </span>
                            <Lock className="w-3 h-3 text-white/50 shrink-0" />
                          </button>

                          {/* 7. Protocoles Systémiques (remis après Reset Homeostasique) (Payant / Abonnement) */}
                          <button
                            onClick={() => { navigateTo('protocoles'); setMobileMenuOpen(false); }}
                            className="flex items-center justify-between w-full px-3 py-1.5 rounded-xl text-white font-medium hover:bg-white/10 text-left text-xs"
                          >
                            <span className="flex items-center gap-2">
                              <span className="text-white/40 font-mono text-[11px]">├──</span>
                              <span className="text-white">{selectedLanguage === 'fr' ? 'Protocoles Systémiques' : selectedLanguage === 'de' ? 'Systemische Protokolle' : 'Systemic Protocols'}</span>
                            </span>
                            <Lock className="w-3 h-3 text-white/50 shrink-0" />
                          </button>

                          {/* 8. Métabolisme et insuline */}
                          <button
                            onClick={() => { navigateTo('metabolisme-insuline'); setMobileMenuOpen(false); }}
                            className="flex items-center justify-between px-3 py-1.5 rounded-xl text-white font-bold hover:bg-white/10 text-left text-xs"
                          >
                            <span className="flex items-center gap-2">
                              <span className="text-[#E8772E] font-mono text-[11px]">├──</span>
                              <span className="text-white font-bold">{selectedLanguage === 'fr' ? 'Métabolisme & insuline' : selectedLanguage === 'de' ? 'Stoffwechsel & Insulin' : 'Metabolism & Insulin'}</span>
                            </span>
                            <div className="flex items-center gap-1.5">
                              <span className="text-[8px] uppercase px-1 py-0.2 rounded bg-[#E8772E]/20 text-[#E8772E] font-bold border border-[#E8772E]/30">
                                {selectedLanguage === 'fr' ? 'Nouveau' : selectedLanguage === 'de' ? 'Neu' : 'New'}
                              </span>
                              <Lock className="w-3 h-3 text-white/50 shrink-0" />
                            </div>
                          </button>

                          {/* 9. Autres modules prévus */}
                          <button
                            onClick={() => { navigateTo('academie'); setMobileMenuOpen(false); }}
                            className="flex items-center justify-between w-full px-3 py-1.5 rounded-xl text-white/70 hover:bg-white/10 text-left text-xs italic"
                          >
                            <span className="flex items-center gap-2">
                              <span className="text-white/40 font-mono text-[11px]">└──</span>
                              <span className="text-white/80">{selectedLanguage === 'fr' ? 'Autres modules prévus' : selectedLanguage === 'de' ? 'Weitere geplante Module' : 'Other planned modules'}</span>
                            </span>
                            <Lock className="w-3 h-3 text-white/40 shrink-0" />
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {/* SECTION: COMPTE */}
                  {sectionTitle(selectedLanguage === 'fr' ? 'MON ESPACE' : selectedLanguage === 'de' ? 'MEIN KONTO' : 'MY ACCOUNT')}
                  <button
                    onClick={() => { navigateTo('account'); setMobileMenuOpen(false); }}
                    className="flex items-center gap-3 px-3 py-2 rounded-xl text-white font-medium hover:bg-white/10 text-left text-sm"
                  >
                    <User className="w-4 h-4 text-white/70" /> {m.espace_membre}
                  </button>

                  <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                    {user ? (
                      <button
                        onClick={() => { navigateTo('account'); setMobileMenuOpen(false); }}
                        className="flex items-center gap-2 text-sm font-medium text-white hover:text-[#E8772E]"
                      >
                        <User className="w-4 h-4 text-white" /> {m.mon_compte}
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setMobileMenuOpen(false);
                          setIsAuthOpen(true);
                        }}
                        className="flex items-center gap-2 text-sm font-medium text-white hover:text-[#E8772E]"
                      >
                        <User className="w-4 h-4 text-white" /> {m.se_connecter}
                      </button>
                    )}
                    <button
                      onClick={() => { navigateTo('cart'); setMobileMenuOpen(false); }}
                      className="flex items-center gap-2 text-sm font-medium text-white hover:text-[#E8772E]"
                    >
                      <ShoppingBag className="w-4 h-4 text-white" /> {m.panier} ({cartCount})
                    </button>
                  </div>
                </div>
              </div>
            );
          })()}
        </header>

      {/* 3. Main Content Router */}
      <main className="flex-1 w-full">
        {currentView === 'home' || currentView === 'indexbis' ? (
          <IndexBisContent onNavigate={navigateTo} lang={selectedLanguage} />
        ) : currentView === 'machine' ? (
          <MachineLanding onNavigate={navigateTo} lang={selectedLanguage} />
        ) : currentView === 'protocole-psoriasis' ? (
          <ProtocolePsoriasisContent
            isPremium={isSubscribed}
            onNavigate={navigateTo}
            onRequireAuth={() => setIsAuthOpen(true)}
            lang={selectedLanguage}
          />
        ) : currentView === 'protocole-sibo' ? (
          <ProtocoleSiboContent
            isPremium={isSubscribed}
            onNavigate={navigateTo}
            onRequireAuth={() => setIsAuthOpen(true)}
            lang={selectedLanguage}
          />
        ) : currentView === 'protocole-myeline' ? (
          <ProtocoleMyelineContent
            isPremium={isSubscribed}
            onNavigate={navigateTo}
            onRequireAuth={() => setIsAuthOpen(true)}
            lang={selectedLanguage}
          />
        ) : currentView === 'protocole-decalcification-pineale' ? (
          <ProtocoleDecalcificationPinealeContent
            isPremium={isSubscribed}
            onNavigate={navigateTo}
            onRequireAuth={() => setIsAuthOpen(true)}
            lang={selectedLanguage}
          />
        ) : currentView === 'blog-vieillissement-myeline' ? (
          <BlogVieillissementMyelineContent
            onNavigate={navigateTo}
            lang={selectedLanguage}
          />
        ) : currentView === 'academie' || currentView === 'comment-lire-modele-bloom' ? (
          <CommentLireModeleBloomContent
            onNavigate={navigateTo}
            lang={selectedLanguage}
          />
        ) : currentView === 'module-0' ? (
          <Module0ChocParadigmeContent
            onNavigate={navigateTo}
            lang={selectedLanguage}
          />
        ) : currentView === 'axe-a1' ? (
          <AxeA1EmonctoiresContent
            onNavigate={navigateTo}
            lang={selectedLanguage}
          />
        ) : currentView === 'protocoles' ? (
          <ProtocolesSystemiquesContent
            onNavigate={navigateTo}
            lang={selectedLanguage}
            isPremium={isSubscribed}
            onRequireAuth={() => setIsAuthOpen(true)}
          />
        ) : currentView === '4-architectures' ? (
          <Les4ArchitecturesContent
            onNavigate={navigateTo}
            lang={selectedLanguage}
            isPremium={isSubscribed}
            onRequireAuth={() => setIsAuthOpen(true)}
          />
        ) : currentView === '9-axes' || currentView === 'neuf-axes-historiques' ? (
          <NeufAxesHistoriquesContent
            onNavigate={navigateTo}
            lang={selectedLanguage}
          />
        ) : currentView === 'charge-allostatique' ? (
          <ChargeAllostatiqueContent
            onNavigate={navigateTo}
            lang={selectedLanguage}
          />
        ) : currentView === 'metabolisme-insuline' ? (
          <MetabolismeInsulineContent
            onNavigate={navigateTo}
            lang={selectedLanguage}
          />
        ) : currentView === 'reset-homeostasique' || currentView === 'phytotherapie-reset' || currentView === 'votre-pratique' || currentView === 'parcours' ? (
          <PhytotherapyResetPage
            onNavigate={navigateTo}
            lang={selectedLanguage}
            isPremium={false}
            user={user}
            onRequireAuth={() => setIsAuthOpen(true)}
          />
        ) : currentView === 'boutique' || currentView === 'boutique-kits' || currentView === 'kits-botaniques' ? (
          <StoreContent
            currentView={currentView}
            onNavigate={navigateTo}
            onAddToCart={addToCart}
            lang={selectedLanguage}
          />
        ) : currentView === 'product-detail' ? (
          <ProductDetail
            productId={selectedProduct}
            onBack={() => navigateTo('boutique')}
            onNavigate={navigateTo}
            onAddToCart={addToCart}
            lang={selectedLanguage}
          />
        ) : currentView === 'culinaire' || currentView === 'gastronomie-botanique' ? (
          <CulinarySection
            onNavigate={navigateTo}
            lang={selectedLanguage}
            onRequirePremium={() => setIsPremiumOpen(true)}
          />
        ) : currentView === 'cosmetiques' || currentView === 'cosmetique-botanique' ? (
          <CosmeticsContent
            onNavigate={navigateTo}
            lang={selectedLanguage}
            onRequirePremium={() => setIsPremiumOpen(true)}
          />
        ) : currentView === 'herbier' || currentView === 'library' || currentView === 'herbarium' ? (
          <HerbariumContent
            onNavigate={navigateTo}
            lang={selectedLanguage}
            isPremium={isSubscribed}
            onRequirePremium={() => {
              if (!user) {
                setIsAuthOpen(true);
              } else {
                navigateTo('abonnement');
              }
            }}
          />
        ) : currentView === 'library-landing' ? (
          <LibraryLanding onNavigate={navigateTo} lang={selectedLanguage} />
        ) : currentView === 'recettes' || currentView === 'recettes-gratuites' || currentView === 'recettes-hub' || currentView === 'recettes-culinaires' || currentView === 'recettes-cosmetiques' || currentView === 'recettes-parcours' || currentView === 'recette-detail' ? (
          <PublicRecipeCatalog
            initialPath={typeof window !== 'undefined' ? window.location.pathname : '/recettes/'}
            onNavigate={(targetPath) => {
              if (targetPath.startsWith('/recettes/')) {
                if (targetPath === '/recettes/' || targetPath === '/recettes') setCurrentView('recettes-hub');
                else if (targetPath.startsWith('/recettes/culinaires')) {
                  if (targetPath === '/recettes/culinaires/' || targetPath.startsWith('/recettes/culinaires/page/')) setCurrentView('recettes-culinaires');
                  else setCurrentView('recette-detail');
                } else if (targetPath.startsWith('/recettes/cosmetiques')) {
                  if (targetPath === '/recettes/cosmetiques/' || targetPath.startsWith('/recettes/cosmetiques/page/')) setCurrentView('recettes-cosmetiques');
                  else setCurrentView('recette-detail');
                } else if (targetPath.startsWith('/recettes/parcours-botaniques')) {
                  if (targetPath === '/recettes/parcours-botaniques/' || targetPath.startsWith('/recettes/parcours-botaniques/page/')) setCurrentView('recettes-parcours');
                  else setCurrentView('recette-detail');
                }
              } else if (targetPath === '/') {
                navigateTo('indexbis');
              } else {
                const targetView = (PATH_VIEWS[targetPath] || 'indexbis') as View;
                navigateTo(targetView);
              }
            }}
            lang={selectedLanguage}
          />
        ) : currentView === 'cart' ? (
          <CartContent
            items={cart}
            onUpdateQuantity={updateCartQuantity}
            onRemove={removeFromCart}
            onBack={() => navigateTo('boutique')}
            onCheckout={() => navigateTo('checkout')}
            onNavigate={navigateTo}
            lang={selectedLanguage}
            shippingMethod={shippingMethod}
            setShippingMethod={(m: any) => setShippingMethod(m)}
          />
        ) : currentView === 'checkout' ? (
          <CheckoutFlow
            cart={cart}
            total={cartTotal}
            shippingMethod={shippingMethod}
            user={user}
            onSuccess={() => {
              setCart([]);
              localStorage.removeItem('bloom-cart');
              navigateTo('account');
            }}
            onCancel={() => navigateTo('cart')}
            lang={selectedLanguage}
          />
        ) : currentView === 'manifeste' || currentView === 'la-marque' ? (
          <ManifesteContent
            onBack={() => navigateTo('indexbis')}
            onNavigate={navigateTo}
            lang={selectedLanguage}
          />
        ) : currentView === 'activation' || currentView === 'activate-bloomlab' ? (
          <ActivationPage
            userId={user?.uid || null}
            onSuccess={() => navigateTo('account')}
            lang={selectedLanguage}
            onRequireAuth={() => setIsAuthOpen(true)}
          />
        ) : currentView === 'account' ? (
          <AccountContent
            user={user}
            onNavigate={navigateTo}
            lang={selectedLanguage}
            onLogout={() => signOut(auth)}
          />
        ) : currentView === 'chat' ? (
          <ChatContent
            isPremium={false}
            onNavigate={navigateTo}
            user={user || undefined}
            onRequireAuth={() => setIsAuthOpen(true)}
            onSaveAssessment={(results) => setSavedAssessment(results)}
            savedAssessment={savedAssessment}
            onResetAssessment={() => setSavedAssessment(null)}
            lang={selectedLanguage}
          />
        ) : currentView === 'blog' ? (
          <BlogContent
            lang={selectedLanguage}
            onNavigate={navigateTo}
            initialSlug={selectedSlug}
          />
        ) : currentView === 'articles' ? (
          <ArticlesContent
            lang={selectedLanguage}
            onNavigate={navigateTo}
            initialSlug={selectedSlug}
          />
        ) : currentView === 'faq' || currentView === 'questions-frequentes' ? (
          <FaqContent onNavigate={navigateTo} lang={selectedLanguage} />
        ) : currentView === 'contact' ? (
          <ContactContent onNavigate={navigateTo} lang={selectedLanguage} />
        ) : currentView === 'lexique' ? (
          <LexiqueContent onNavigate={navigateTo} lang={selectedLanguage} />
        ) : currentView === 'abonnement' || currentView === 'premium-info' ? (
          <PremiumInfoContent
            onNavigate={navigateTo}
            onAddToCart={addToCart}
            lang={selectedLanguage}
          />
        ) : currentView === 'totum-vegetal' || currentView === 'totum-definition' ? (
          <SEOArticlesExports.TotumDefinition lang={selectedLanguage} t={t} onNavigate={navigateTo} />
        ) : currentView === 'pillar-extraction' || currentView === 'extraction-botanique' || currentView === 'guide-complet' || currentView === 'guide' || currentView === 'how_it_works' || currentView === 'comment-ca-marche' || currentView === 'infuseur-botanique' ? (
          <PillarExtraction lang={selectedLanguage} onNavigate={navigateTo} />
        ) : currentView === 'terrain' || currentView === '7-terrains' ? (
          <TerrainPillar
            terrainId={selectedTerrain}
            lang={selectedLanguage}
            onNavigate={navigateTo}
          />
        ) : currentView === 'hormese' || currentView === 'infusion-botanique' || currentView === 'infusion-botanique-maison-comment-ca-marche' ? (
          <PillarInfusion lang={selectedLanguage} onNavigate={navigateTo} />
        ) : currentView === 'huile-infusee' ? (
          <PillarOil lang={selectedLanguage} onNavigate={navigateTo} />
        ) : currentView === 'plantes-adaptogenes' ? (
          <PillarAdaptogens lang={selectedLanguage} onNavigate={navigateTo} />
        ) : currentView === 'pending' ? (
          <PendingContent onBack={() => navigateTo('indexbis')} lang={selectedLanguage} />
        ) : currentView === 'admin' ? (
          <AdminDashboard lang={selectedLanguage} />
        ) : currentView === 'newsletter-preferences' ? (
          <NewsletterPreferences
            subscriberId={user?.uid || 'guest'}
            lang={selectedLanguage}
          />
        ) : currentView === 'admin-newsletter' ? (
          <AdminNewsletter lang={selectedLanguage} />
        ) : currentView === 'legal' || currentView === 'cgv' || currentView === 'cgu' || currentView === 'privacy' || currentView === 'mentions' || currentView === 'returns' || currentView === 'withdrawal' ? (
          <LegalPages
            type={
              currentView === 'cgv'
                ? 'cgv'
                : currentView === 'privacy'
                ? 'privacy'
                : currentView === 'withdrawal' || currentView === 'returns'
                ? 'withdrawal'
                : currentView === 'mentions'
                ? 'mentions'
                : currentView === 'cgu'
                ? 'cgu'
                : 'terms'
            }
            onBack={() => navigateTo('indexbis')}
            lang={selectedLanguage}
          />
        ) : currentView === 'guide-complet-extraction-botanique-maison' || currentView === 'remedes-naturels-maison-guide' || currentView === 'remedes-naturels' || currentView === 'totum-vegetal-comprendre' || currentView === 'cosmetiques-naturels-diy' || currentView === 'phytotherapie-moderne-scientifique' ? (
          <PillarPagesContent pillar={currentView === 'remedes-naturels' ? 'remedes-naturels-maison-guide' : currentView} lang={selectedLanguage} onNavigate={navigateTo} />
        ) : (
          <SEOArticles view={currentView} lang={selectedLanguage} t={t} onNavigate={navigateTo} isPremium={isSubscribed} onRequireAuth={() => setIsAuthOpen(true)} />
        )}
      </main>

      {/* 4. Global Footer */}
      <Footer onNavigate={navigateTo} lang={selectedLanguage} />
      </div>

      {/* 5. Floating Interactive Elements & Modals */}
      <FloatingChat user={user} lang={selectedLanguage} />
      <CookieBanner lang={selectedLanguage} />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onSuccess={() => setIsAuthOpen(false)}
      />

      <PremiumModal
        isOpen={isPremiumOpen}
        onClose={() => setIsPremiumOpen(false)}
        onUpgrade={() => {
          setIsPremiumOpen(false);
          navigateTo('abonnement');
        }}
      />

      {/* Extraction Calculator Modal */}
      {isCalculatorOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setIsCalculatorOpen(false)}
        >
          <div 
            className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <ExtractionCalculator onClose={() => setIsCalculatorOpen(false)} isModal />
          </div>
        </div>
      )}
    </div>
  );
}

```

---

## src/lib/firebase.ts (La configuration Firebase)
Chemin : `src/lib/firebase.ts`

```typescript
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import rawConfig from '../../firebase-applet-config.json';

export const firebaseConfig = {
  id: rawConfig.id || "1e04d90f-3878-4981-8138-5c8a14f59353",
  name: rawConfig.name || "bloom-by-botanik",
  apiKey: rawConfig.apiKey || "AIzaSyBTYEyKqE3pL8FElyt_UkjaaphYjp9-r6Q",
  authDomain: rawConfig.authDomain || "gen-lang-client-0781708429.firebaseapp.com",
  projectId: rawConfig.projectId || "gen-lang-client-0781708429",
  storageBucket: rawConfig.storageBucket || "gen-lang-client-0781708429.firebasestorage.app",
  messagingSenderId: rawConfig.messagingSenderId || "224466673114",
  appId: rawConfig.appId || "1:224466673114:web:8c843edae8205a6ae034e3",
  measurementId: rawConfig.measurementId || undefined,
  firestoreDatabaseId: rawConfig.firestoreDatabaseId || "ai-studio-bloombybotaniksi-1e04d90f-3878-4981-8138-5c8a14f59353"
};

export const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

export default app;
```

---

## src/components/NavigationSidebar.tsx (La Sidebar)
Chemin : `src/components/NavigationSidebar.tsx`

```tsx
import React, { useState } from 'react';
import {
  Home,
  FileText,
  FlaskConical,
  BookOpen,
  Leaf,
  Utensils,
  Droplets,
  Activity,
  Sparkles,
  ShoppingBag,
  Package,
  Calculator,
  User,
  Star,
  HeartHandshake,
  GraduationCap,
  ChevronDown,
  ChevronRight,
  Layers,
  Lock
} from 'lucide-react';
import { BloomLogo } from './ui/BloomLogo';
import { LanguageSelector } from './LanguageSelector';
import { Language, translations } from '../translations';
import { View } from '../types';
import { User as FirebaseUser } from 'firebase/auth';

interface NavigationSidebarProps {
  currentView: View;
  onNavigate: (view: View, param?: string) => void;
  lang: Language;
  setLang: (lang: Language) => void;
  cartCount: number;
  user: FirebaseUser | null;
  onOpenAuth: () => void;
  onOpenCalculator: () => void;
}

export const NavigationSidebar: React.FC<NavigationSidebarProps> = ({
  currentView,
  onNavigate,
  lang,
  setLang,
  cartCount,
  user,
  onOpenAuth,
  onOpenCalculator
}) => {
  const [isBloomAcademyOpen, setIsBloomAcademyOpen] = useState(true);
  const [isComprendreCorpsOpen, setIsComprendreCorpsOpen] = useState(true);
  const [isNeufAxesOpen, setIsNeufAxesOpen] = useState(false);
  const t = translations[lang] || translations.fr;

  const isActive = (view: View) => currentView === view;

  const navItemClass = (active: boolean) =>
    `flex items-center justify-between w-full px-3 py-1.5 rounded-xl text-xs font-semibold transition-all group cursor-pointer ${
      active
        ? 'bg-white/10 text-white font-bold border border-white/20 shadow-xs'
        : 'text-white/80 hover:text-white hover:bg-white/10'
    }`;

  const navIconClass = (active: boolean) =>
    `w-3.5 h-3.5 shrink-0 transition-colors ${
      active ? 'text-[#E8772E]' : 'text-white/60 group-hover:text-white'
    }`;

  return (
    <aside 
      className="hidden md:flex flex-col fixed top-0 left-0 bottom-0 w-[280px] bg-[#0F261E] text-[#F9F6F0] z-40 border-r border-white/10 select-none shadow-2xl"
      aria-label="Navigation principale"
    >
      {/* 1. Header Lockup: Papillon + Bloom by BotaniK */}
      <div className="p-4 border-b border-white/10">
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('indexbis');
          }}
          className="flex items-center gap-3 group cursor-pointer"
          aria-label="Bloom by BotaniK - Accueil"
        >
          <BloomLogo variant="sidebar" className="w-9 h-9 shrink-0 group-hover:scale-105 transition-transform" />
          <div className="flex flex-col leading-tight uppercase">
            <span className="text-[10px] font-bold tracking-[0.24em] text-white/60 group-hover:opacity-80 transition-opacity">
              Bloom by
            </span>
            <span className="text-lg font-black tracking-widest text-white group-hover:opacity-80 transition-opacity">
              BotaniK
            </span>
          </div>
        </a>
      </div>

      {/* 2. Scrollable Navigation Menu */}
      <div className="flex-1 overflow-y-auto px-3.5 py-4 space-y-5 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
        
        {/* GROUP 1: ACCUEIL */}
        <div>
          <button
            onClick={() => onNavigate('indexbis')}
            className={navItemClass(isActive('indexbis') || isActive('home'))}
          >
            <div className="flex items-center gap-2.5">
              <Home className={navIconClass(isActive('indexbis') || isActive('home'))} />
              <span className="font-semibold text-xs">{lang === 'fr' ? 'Accueil' : lang === 'de' ? 'Startseite' : 'Home'}</span>
            </div>
          </button>
        </div>

        {/* GROUP 2: POURQUOI BLOOM */}
        <div>
          <div className="text-[10px] font-black uppercase tracking-[0.22em] text-[#E8772E] px-3 mb-1.5 flex items-center justify-between">
            <span>POURQUOI BLOOM</span>
          </div>
          <div className="space-y-0.5">
            <button
              onClick={() => onNavigate('la-marque')}
              className={navItemClass(isActive('la-marque') || isActive('manifeste'))}
            >
              <div className="flex items-center gap-2.5">
                <HeartHandshake className={navIconClass(isActive('la-marque') || isActive('manifeste'))} />
                <span>Histoire &amp; Philosophie</span>
              </div>
            </button>
          </div>
        </div>

        {/* GROUP 3: LA MÉTHODE A/B */}
        <div>
          <div className="text-[10px] font-black uppercase tracking-[0.22em] text-[#E8772E] px-3 mb-1.5">
            LA MÉTHODE A/B
          </div>
          <div className="space-y-0.5">
            <button
              onClick={() => onNavigate('infusion-botanique')}
              className={navItemClass(isActive('infusion-botanique') || isActive('infusion-botanique-maison-comment-ca-marche'))}
            >
              <div className="flex items-center gap-2.5">
                <FlaskConical className={navIconClass(isActive('infusion-botanique'))} />
                <span>L'infusion botanique ?</span>
              </div>
            </button>
            <button
              onClick={() => onNavigate('totum-vegetal')}
              className={navItemClass(isActive('totum-vegetal'))}
            >
              <div className="flex items-center gap-2.5">
                <Leaf className={navIconClass(isActive('totum-vegetal'))} />
                <span>Le Totum Végétal</span>
              </div>
            </button>
            <button
              onClick={() => onNavigate('guide-complet')}
              className={navItemClass(isActive('guide-complet') || isActive('pillar-extraction') || isActive('extraction-botanique'))}
            >
              <div className="flex items-center gap-2.5">
                <BookOpen className={navIconClass(isActive('guide-complet'))} />
                <span>Guide de l'extraction</span>
              </div>
            </button>
          </div>
        </div>

        {/* GROUP 4: VOTRE PRATIQUE */}
        <div>
          <div className="text-[10px] font-black uppercase tracking-[0.22em] text-[#E8772E] px-3 mb-1.5">
            VOTRE PRATIQUE
          </div>
          <div className="space-y-0.5">
            <button
              onClick={() => onNavigate('culinaire')}
              className={navItemClass(isActive('culinaire'))}
            >
              <div className="flex items-center gap-2.5">
                <Utensils className={navIconClass(isActive('culinaire'))} />
                <span>Atelier Culinaire</span>
              </div>
            </button>
            <button
              onClick={() => onNavigate('cosmetiques')}
              className={navItemClass(isActive('cosmetiques'))}
            >
              <div className="flex items-center gap-2.5">
                <Droplets className={navIconClass(isActive('cosmetiques'))} />
                <span>Cosmétique Botanique</span>
              </div>
            </button>
            <button
              onClick={() => onNavigate('phytotherapie-reset')}
              className={navItemClass(isActive('phytotherapie-reset') || isActive('votre-pratique') || isActive('parcours'))}
            >
              <div className="flex items-center gap-2.5">
                <Activity className={navIconClass(isActive('phytotherapie-reset') || isActive('votre-pratique') || isActive('parcours'))} />
                <span>Reset Homéostasique</span>
              </div>
            </button>
          </div>
        </div>

        {/* GROUP 5: BOUTIQUE */}
        <div>
          <div className="text-[10px] font-black uppercase tracking-[0.22em] text-[#E8772E] px-3 mb-1.5">
            BOUTIQUE
          </div>
          <div className="space-y-0.5">
            <a
              href="/bloomlab/"
              onClick={(e) => {
                if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                  e.preventDefault();
                  onNavigate('machine');
                }
              }}
              className={navItemClass(isActive('machine') || isActive('bloomlab'))}
            >
              <div className="flex items-center gap-2.5">
                <Sparkles className={navIconClass(isActive('machine') || isActive('bloomlab'))} />
                <span>BloomLab®</span>
              </div>
            </a>
            <button
              onClick={() => onNavigate('boutique-kits')}
              className={navItemClass(isActive('boutique-kits'))}
            >
              <div className="flex items-center gap-2.5">
                <Package className={navIconClass(isActive('boutique-kits'))} />
                <span>Packs</span>
              </div>
            </button>
            <button
              onClick={() => onNavigate('boutique')}
              className={navItemClass(isActive('boutique'))}
            >
              <div className="flex items-center gap-2.5">
                <ShoppingBag className={navIconClass(isActive('boutique'))} />
                <span>Accessoires</span>
              </div>
            </button>
            <a
              href="/boutique/duo-argiles/"
              onClick={(e) => {
                if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                  e.preventDefault();
                  onNavigate('product-detail', 'duo-argiles');
                }
              }}
              className={navItemClass(isActive('product-detail'))}
            >
              <div className="flex items-center gap-2.5">
                <Leaf className={navIconClass(false)} />
                <span>Argiles &amp; Matières Premières</span>
              </div>
            </a>
            {/* Abonnements numériques (placé dans Boutique après Argiles & Matières Premières) */}
            <a
              href="/boutique/abonnements-numeriques/"
              onClick={(e) => {
                if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                  e.preventDefault();
                  onNavigate('abonnement');
                }
              }}
              className={navItemClass(isActive('abonnement') || isActive('premium-info') || isActive('abonnements-numeriques'))}
              title={lang === 'fr' ? 'Abonnements numériques' : lang === 'de' ? 'Digitale Abonnements' : 'Digital Subscriptions'}
            >
              <div className="flex items-center gap-2.5">
                <Star className={navIconClass(isActive('abonnement') || isActive('premium-info') || isActive('abonnements-numeriques'))} />
                <span className="font-semibold text-white">
                  {lang === 'fr' ? 'Abonnements numériques' : lang === 'de' ? 'Digitale Abonnements' : 'Digital Subscriptions'}
                </span>
              </div>
              <span className="text-[8px] uppercase px-1.5 py-0.5 rounded bg-[#C8AB8A]/20 text-[#C8AB8A] font-bold shrink-0">
                Abo
              </span>
            </a>
          </div>
        </div>

        {/* GROUP 6: RESSOURCES */}
        <div>
          <div className="text-[10px] font-black uppercase tracking-[0.22em] text-[#E8772E] px-3 mb-1.5 flex items-center justify-between">
            <span>{lang === 'fr' ? 'RESSOURCES' : lang === 'de' ? 'RESSOURCEN' : 'RESOURCES'}</span>
          </div>
          <div className="space-y-0.5">
            <button
              onClick={() => onNavigate('herbier')}
              className={navItemClass(isActive('herbier') || isActive('library') || isActive('herbarium'))}
            >
              <div className="flex items-center gap-2.5">
                <BookOpen className={navIconClass(isActive('herbier') || isActive('library') || isActive('herbarium'))} />
                <span>{lang === 'fr' ? "L'Herbier" : lang === 'de' ? 'Das Herbarium' : 'The Herbarium'}</span>
              </div>
            </button>
            <button
              onClick={() => onNavigate('lexique')}
              className={navItemClass(isActive('lexique'))}
            >
              <div className="flex items-center gap-2.5">
                <BookOpen className={navIconClass(isActive('lexique'))} />
                <span>{lang === 'fr' ? 'Lexique Botanik' : lang === 'de' ? 'Botanik-Glossar' : 'Botanik Glossary'}</span>
              </div>
            </button>
          </div>
        </div>

        {/* GROUP 7: BLOOM ACADEMY (LIEN AVEC ICÔNE EN JAUNE + SOUS-MENU DÉROULANT) */}
        <div>
          <div className="flex items-center justify-between gap-1 mb-1">
            <a
              href="/academie/"
              onClick={(e) => {
                if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                  e.preventDefault();
                  onNavigate('academie');
                }
              }}
              className={`flex-1 flex items-center justify-between px-3 py-2 rounded-xl border transition-all text-xs font-bold cursor-pointer group ${
                isActive('academie') 
                  ? 'bg-[#E8772E]/20 text-[#E8772E] border-[#E8772E]/50 shadow-xs' 
                  : 'bg-[#E8772E]/10 hover:bg-[#E8772E]/15 text-[#E8772E] border-[#E8772E]/25 hover:border-[#E8772E]/40'
              }`}
              title={lang === 'fr' ? 'Accéder à Bloom Academy' : lang === 'de' ? 'Zur Bloom Academy' : 'Go to Bloom Academy'}
            >
              <span className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-[#E8772E] shrink-0" />
                <span className="font-bold text-[#E8772E] tracking-wide">Bloom Academy</span>
              </span>
              <span className="text-[8px] uppercase px-2 py-0.5 rounded-full bg-[#FAF7F2] text-[#0F261E] font-black tracking-wider shadow-xs">
                {lang === 'fr' ? 'Pédagogie' : lang === 'de' ? 'Pädagogik' : 'Pedagogy'}
              </span>
            </a>
            <button
              type="button"
              onClick={() => setIsBloomAcademyOpen(!isBloomAcademyOpen)}
              className="p-2 rounded-xl text-[#E8772E] hover:bg-[#E8772E]/15 border border-[#E8772E]/25 transition-colors cursor-pointer shrink-0"
              title={lang === 'fr' ? 'Déplier/Replier Bloom Academy' : lang === 'de' ? 'Bloom Academy ein-/ausblenden' : 'Toggle Bloom Academy'}
              aria-expanded={isBloomAcademyOpen}
            >
              {isBloomAcademyOpen ? (
                <ChevronDown className="w-4 h-4 text-[#E8772E]" />
              ) : (
                <ChevronRight className="w-4 h-4 text-[#E8772E]" />
              )}
            </button>
          </div>

          {isBloomAcademyOpen && (
            <div className="space-y-0.5">
              {/* Lien Accueil */}
              <a
                href="/academie/"
                onClick={(e) => {
                  if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                    e.preventDefault();
                    onNavigate('academie');
                  }
                }}
                className={navItemClass(isActive('academie'))}
              >
                <div className="flex items-center gap-2.5">
                  <Home className="w-3.5 h-3.5 shrink-0 text-white" />
                  <span className={isActive('academie') ? 'text-white font-bold' : 'text-white font-medium'}>
                    {lang === 'fr' ? 'Accueil' : lang === 'de' ? 'Startseite' : 'Home'}
                  </span>
                </div>
              </a>

              {/* Menu Déroulant: COMPRENDRE LE CORPS */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setIsComprendreCorpsOpen(!isComprendreCorpsOpen)}
                  className="flex items-center justify-between w-full px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-[0.2em] text-[#E8772E] hover:bg-white/5 transition-colors cursor-pointer group"
                  aria-expanded={isComprendreCorpsOpen}
                  title={lang === 'fr' ? 'Afficher/Masquer Comprendre le corps' : lang === 'de' ? 'Den Körper verstehen ein-/ausblenden' : 'Toggle Understanding the body'}
                >
                  <span className="flex items-center gap-1.5">
                    <Layers className="w-3 h-3 text-[#E8772E]" />
                    <span>{lang === 'fr' ? 'COMPRENDRE LE CORPS' : lang === 'de' ? 'DEN KÖRPER VERSTEHEN' : 'UNDERSTANDING THE BODY'}</span>
                  </span>
                  {isComprendreCorpsOpen ? (
                    <ChevronDown className="w-3.5 h-3.5 text-[#E8772E]/80 group-hover:text-[#E8772E]" />
                  ) : (
                    <ChevronRight className="w-3.5 h-3.5 text-[#E8772E]/80 group-hover:text-[#E8772E]" />
                  )}
                </button>

                {isComprendreCorpsOpen && (
                  <div className="space-y-0.5 mt-0.5">
                    {/* 1. Comment lire le modèle Bloom (SEUL MODULE GRATUIT) */}
                    <button
                      onClick={() => onNavigate('comment-lire-modele-bloom')}
                      className={navItemClass(isActive('comment-lire-modele-bloom'))}
                      title={lang === 'fr' ? 'Comment lire le modèle Bloom (Accès Libre & Gratuit)' : lang === 'de' ? 'Wie man das Bloom-Modell liest (Kostenlos)' : 'How to read the Bloom model (Free)'}
                    >
                      <div className="flex items-center gap-2 pl-2 overflow-hidden text-left">
                        <span className="text-[#8b949e] font-mono text-[11px] shrink-0">├──</span>
                        <span className="truncate text-[11px]">
                          {lang === 'fr' ? 'Comment lire le modèle Bloom' : lang === 'de' ? 'Wie man das Bloom-Modell liest' : 'How to read the Bloom model'}
                        </span>
                      </div>
                      <span className="text-[8px] uppercase px-1 py-0.2 rounded bg-emerald-500/20 text-emerald-400 font-bold shrink-0 border border-emerald-500/30">
                        {lang === 'fr' ? 'Gratuit' : lang === 'de' ? 'Gratis' : 'Free'}
                      </span>
                    </button>

                    {/* 2. Les 4 Architectures (Payant / Abonnement) */}
                    <button
                      onClick={() => onNavigate('4-architectures')}
                      className={navItemClass(isActive('4-architectures'))}
                      title={lang === 'fr' ? 'Les 4 Architectures (Abonnement)' : lang === 'de' ? 'Die 4 Architekturen (Abonnement)' : 'The 4 Architectures (Subscription)'}
                    >
                      <div className="flex items-center gap-2 pl-2 overflow-hidden text-left">
                        <span className="text-[#8b949e] font-mono text-[11px] shrink-0">├──</span>
                        <span className="truncate text-[11px]">
                          {lang === 'fr' ? 'Les 4 Architectures' : lang === 'de' ? 'Die 4 Architekturen' : 'The 4 Architectures'}
                        </span>
                      </div>
                      <Lock className="w-3 h-3 text-[#c9a84c]/80 shrink-0" />
                    </button>

                    {/* 3. Les 7 Terrains (Payant / Abonnement) */}
                    <button
                      onClick={() => onNavigate('terrain')}
                      className={navItemClass(isActive('terrain') || isActive('7-terrains'))}
                      title={lang === 'fr' ? 'Les 7 Terrains (Abonnement)' : lang === 'de' ? 'Die 7 Terrains (Abonnement)' : 'The 7 Terrains (Subscription)'}
                    >
                      <div className="flex items-center gap-2 pl-2 overflow-hidden text-left">
                        <span className="text-[#8b949e] font-mono text-[11px] shrink-0">├──</span>
                        <span className="truncate text-[11px]">
                          {lang === 'fr' ? 'Les 7 Terrains' : lang === 'de' ? 'Die 7 Terrains' : 'The 7 Terrains'}
                        </span>
                      </div>
                      <Lock className="w-3 h-3 text-[#c9a84c]/80 shrink-0" />
                    </button>

                    {/* 4. Les 9 Axes historiques (Menu Déroulant) */}
                    <div>
                      <button
                        type="button"
                        onClick={() => setIsNeufAxesOpen(!isNeufAxesOpen)}
                        className={navItemClass(
                          isActive('9-axes') || 
                          isActive('neuf-axes-historiques') ||
                          isActive('module-0') ||
                          isActive('axe-a1') ||
                          isActive('axe-a2') ||
                          isActive('axe-a3') ||
                          isActive('axe-a4') ||
                          isActive('axe-a5') ||
                          isActive('axe-a6') ||
                          isActive('axe-a7') ||
                          isActive('axe-a8') ||
                          isActive('axe-a9')
                        )}
                        aria-expanded={isNeufAxesOpen}
                        title={lang === 'fr' ? 'Déplier/Replier les 9 Axes historiques' : 'Toggle 9 Historical Axes'}
                      >
                        <div className="flex items-center gap-2 pl-2 overflow-hidden text-left">
                          <span className="text-[#8b949e] font-mono text-[11px] shrink-0">├──</span>
                          <span className="truncate text-[11px]">
                            {lang === 'fr' ? 'Les 9 Axes historiques' : lang === 'de' ? 'Die 9 Historischen Achsen' : 'The 9 Historical Axes'}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <Lock className="w-3 h-3 text-[#c9a84c]/80" />
                          {isNeufAxesOpen ? (
                            <ChevronDown className="w-3 h-3 text-[#c9a84c]" />
                          ) : (
                            <ChevronRight className="w-3 h-3 text-[#c9a84c]" />
                          )}
                        </div>
                      </button>

                      {isNeufAxesOpen && (
                        <div className="space-y-0.5 mt-0.5 pl-3 border-l-2 border-[#c9a84c]/30 ml-3">
                          {/* Vue d'ensemble */}
                          <button
                            onClick={() => onNavigate('9-axes')}
                            className={navItemClass(isActive('9-axes') || isActive('neuf-axes-historiques'))}
                          >
                            <div className="flex items-center gap-2 pl-1 overflow-hidden text-left">
                              <span className="text-[#c9a84c] font-mono text-[10px] shrink-0">├─</span>
                              <span className="truncate text-[10.5px] text-white/90">
                                {lang === 'fr' ? "Vue d'ensemble (9 axes)" : "9 Axes Overview"}
                              </span>
                            </div>
                          </button>

                          {/* Module 0 */}
                          <button
                            onClick={() => onNavigate('module-0')}
                            className={navItemClass(isActive('module-0'))}
                          >
                            <div className="flex items-center gap-2 pl-1 overflow-hidden text-left">
                              <span className="text-[#c9a84c] font-mono text-[10px] shrink-0">├─</span>
                              <span className="truncate text-[10.5px] text-white font-medium">
                                {lang === 'fr' ? 'Module 0 : Paradigme' : 'Module 0 : Paradigm'}
                              </span>
                            </div>
                            <Lock className="w-2.5 h-2.5 text-[#c9a84c]/80 shrink-0" />
                          </button>

                          {/* Axe A1 */}
                          <a
                            href="/academie/axes/a1-emonctoires/"
                            onClick={(e) => {
                              e.preventDefault();
                              onNavigate('axe-a1');
                            }}
                            className={navItemClass(isActive('axe-a1'))}
                          >
                            <div className="flex items-center gap-2 pl-1 overflow-hidden text-left">
                              <span className="text-[#c9a84c] font-mono text-[10px] shrink-0">├─</span>
                              <span className="truncate text-[10.5px] text-white">
                                {lang === 'fr' ? 'A1 : Émonctoires' : 'A1 : Emunctories'}
                              </span>
                            </div>
                            <Lock className="w-2.5 h-2.5 text-[#c9a84c]/80 shrink-0" />
                          </a>

                          {/* Axe A2 */}
                          <button
                            onClick={() => onNavigate('axe-a2')}
                            className={navItemClass(isActive('axe-a2'))}
                          >
                            <div className="flex items-center gap-2 pl-1 overflow-hidden text-left">
                              <span className="text-[#c9a84c] font-mono text-[10px] shrink-0">├─</span>
                              <span className="truncate text-[10.5px] text-white">
                                {lang === 'fr' ? 'A2 : Barrière Intestinale' : 'A2 : Gut Barrier'}
                              </span>
                            </div>
                            <Lock className="w-2.5 h-2.5 text-[#c9a84c]/80 shrink-0" />
                          </button>

                          {/* Axe A3 */}
                          <button
                            onClick={() => onNavigate('axe-a3')}
                            className={navItemClass(isActive('axe-a3'))}
                          >
                            <div className="flex items-center gap-2 pl-1 overflow-hidden text-left">
                              <span className="text-[#c9a84c] font-mono text-[10px] shrink-0">├─</span>
                              <span className="truncate text-[10.5px] text-white">
                                {lang === 'fr' ? 'A3 : Axe HPA & Stress' : 'A3 : HPA Axis'}
                              </span>
                            </div>
                            <Lock className="w-2.5 h-2.5 text-[#c9a84c]/80 shrink-0" />
                          </button>

                          {/* Axe A4 */}
                          <button
                            onClick={() => onNavigate('axe-a4')}
                            className={navItemClass(isActive('axe-a4'))}
                          >
                            <div className="flex items-center gap-2 pl-1 overflow-hidden text-left">
                              <span className="text-[#c9a84c] font-mono text-[10px] shrink-0">├─</span>
                              <span className="truncate text-[10.5px] text-white">
                                {lang === 'fr' ? 'A4 : Inflammation & SPMs' : 'A4 : Inflammation'}
                              </span>
                            </div>
                            <Lock className="w-2.5 h-2.5 text-[#c9a84c]/80 shrink-0" />
                          </button>

                          {/* Axe A5 */}
                          <button
                            onClick={() => onNavigate('axe-a5')}
                            className={navItemClass(isActive('axe-a5'))}
                          >
                            <div className="flex items-center gap-2 pl-1 overflow-hidden text-left">
                              <span className="text-[#c9a84c] font-mono text-[10px] shrink-0">├─</span>
                              <span className="truncate text-[10.5px] text-white">
                                {lang === 'fr' ? 'A5 : Mitochondries & ATP' : 'A5 : Mitochondria'}
                              </span>
                            </div>
                            <Lock className="w-2.5 h-2.5 text-[#c9a84c]/80 shrink-0" />
                          </button>

                          {/* Axe A6 */}
                          <button
                            onClick={() => onNavigate('axe-a6')}
                            className={navItemClass(isActive('axe-a6'))}
                          >
                            <div className="flex items-center gap-2 pl-1 overflow-hidden text-left">
                              <span className="text-[#c9a84c] font-mono text-[10px] shrink-0">├─</span>
                              <span className="truncate text-[10.5px] text-white">
                                {lang === 'fr' ? 'A6 : Tonus Vagal (SNA)' : 'A6 : Vagal Tone'}
                              </span>
                            </div>
                            <Lock className="w-2.5 h-2.5 text-[#c9a84c]/80 shrink-0" />
                          </button>

                          {/* Axe A7 */}
                          <button
                            onClick={() => onNavigate('axe-a7')}
                            className={navItemClass(isActive('axe-a7'))}
                          >
                            <div className="flex items-center gap-2 pl-1 overflow-hidden text-left">
                              <span className="text-[#c9a84c] font-mono text-[10px] shrink-0">├─</span>
                              <span className="truncate text-[10.5px] text-white">
                                {lang === 'fr' ? 'A7 : Matrice & Fascia' : 'A7 : Fascial Matrix'}
                              </span>
                            </div>
                            <Lock className="w-2.5 h-2.5 text-[#c9a84c]/80 shrink-0" />
                          </button>

                          {/* Axe A8 */}
                          <button
                            onClick={() => onNavigate('axe-a8')}
                            className={navItemClass(isActive('axe-a8'))}
                          >
                            <div className="flex items-center gap-2 pl-1 overflow-hidden text-left">
                              <span className="text-[#c9a84c] font-mono text-[10px] shrink-0">├─</span>
                              <span className="truncate text-[10.5px] text-white">
                                {lang === 'fr' ? 'A8 : Microbiote & Butyrate' : 'A8 : Microbiome'}
                              </span>
                            </div>
                            <Lock className="w-2.5 h-2.5 text-[#c9a84c]/80 shrink-0" />
                          </button>

                          {/* Axe A9 */}
                          <button
                            onClick={() => onNavigate('axe-a9')}
                            className={navItemClass(isActive('axe-a9'))}
                          >
                            <div className="flex items-center gap-2 pl-1 overflow-hidden text-left">
                              <span className="text-[#c9a84c] font-mono text-[10px] shrink-0">└─</span>
                              <span className="truncate text-[10.5px] text-white">
                                {lang === 'fr' ? 'A9 : Système EndoCannabinoïde' : 'A9 : Endocannabinoid'}
                              </span>
                            </div>
                            <Lock className="w-2.5 h-2.5 text-[#c9a84c]/80 shrink-0" />
                          </button>
                        </div>
                      )}
                    </div>

                    {/* 5. La Charge Allostatique (Payant / Abonnement) */}
                    <button
                      onClick={() => onNavigate('charge-allostatique')}
                      className={navItemClass(isActive('charge-allostatique'))}
                      title={lang === 'fr' ? 'La Charge Allostatique (Abonnement)' : lang === 'de' ? 'Die Allostatische Last (Abonnement)' : 'The Allostatic Load (Subscription)'}
                    >
                      <div className="flex items-center gap-2 pl-2 overflow-hidden text-left">
                        <span className="text-[#8b949e] font-mono text-[11px] shrink-0">├──</span>
                        <span className="truncate text-[11px]">
                          {lang === 'fr' ? 'La Charge Allostatique' : lang === 'de' ? 'Die Allostatische Last' : 'The Allostatic Load'}
                        </span>
                      </div>
                      <Lock className="w-3 h-3 text-[#c9a84c]/80 shrink-0" />
                    </button>

                    {/* 6. Le Reset Homéostasique (Payant / Abonnement) */}
                    <button
                      onClick={() => onNavigate('phytotherapie-reset')}
                      className={navItemClass(isActive('phytotherapie-reset') || isActive('reset-homeostasique'))}
                      title={lang === 'fr' ? 'Le Reset Homéostasique (Abonnement)' : lang === 'de' ? 'Der Homöostatische Reset (Abonnement)' : 'The Homeostatic Reset (Subscription)'}
                    >
                      <div className="flex items-center gap-2 pl-2 overflow-hidden text-left">
                        <span className="text-[#8b949e] font-mono text-[11px] shrink-0">├──</span>
                        <span className="truncate text-[11px]">
                          {lang === 'fr' ? 'Le Reset Homéostasique' : lang === 'de' ? 'Der Homöostatische Reset' : 'The Homeostatic Reset'}
                        </span>
                      </div>
                      <Lock className="w-3 h-3 text-[#c9a84c]/80 shrink-0" />
                    </button>

                    {/* 7. Protocoles Systémiques (remis après Reset Homeostasique - Payant / Abonnement) */}
                    <button
                      onClick={() => onNavigate('protocoles')}
                      className={navItemClass(isActive('protocoles'))}
                      title={lang === 'fr' ? 'Protocoles Systémiques (Abonnement)' : lang === 'de' ? 'Systemische Protokolle (Abonnement)' : 'Systemic Protocols (Subscription)'}
                    >
                      <div className="flex items-center gap-2 pl-2 overflow-hidden text-left">
                        <span className="text-[#8b949e] font-mono text-[11px] shrink-0">├──</span>
                        <span className="truncate text-[11px]">
                          {lang === 'fr' ? 'Protocoles Systémiques' : lang === 'de' ? 'Systemische Protokolle' : 'Systemic Protocols'}
                        </span>
                      </div>
                      <Lock className="w-3 h-3 text-[#c9a84c]/80 shrink-0" />
                    </button>

                    {/* 8. Métabolisme et insuline (placé après Protocoles Systémiques, écrit en jaune doré, Payant) */}
                    <button
                      onClick={() => onNavigate('metabolisme-insuline')}
                      className={`${navItemClass(isActive('metabolisme-insuline'))} hover:bg-[#F59E0B]/10`}
                      title={lang === 'fr' ? 'Métabolisme glucidique & insuline (Abonnement)' : lang === 'de' ? 'Stoffwechsel & Insulin (Abonnement)' : 'Metabolism & Insulin (Subscription)'}
                    >
                      <div className="flex items-center gap-2 pl-2 overflow-hidden text-left">
                        <span className="text-[#F59E0B] font-mono text-[11px] shrink-0">├──</span>
                        <span className="truncate text-[11px] text-[#F59E0B] font-black drop-shadow-[0_0_8px_rgba(245,158,11,0.3)]">
                          {lang === 'fr' ? 'Métabolisme & insuline' : lang === 'de' ? 'Stoffwechsel & Insulin' : 'Metabolism & Insulin'}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <span className="text-[8px] uppercase px-1.5 py-0.5 rounded bg-[#D97706]/10 text-[#B45309] font-bold border border-[#D97706]/30">
                          {lang === 'fr' ? 'Nouveau' : lang === 'de' ? 'Neu' : 'New'}
                        </span>
                        <Lock className="w-3 h-3 text-[#F59E0B] shrink-0" />
                      </div>
                    </button>

                    {/* 9. Autres modules prévus */}
                    <a
                      href="/academie/#comprendre-le-corps"
                      onClick={(e) => {
                        if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                          e.preventDefault();
                          onNavigate('academie');
                          setTimeout(() => {
                            const el = document.getElementById('comprendre-le-corps');
                            if (el) el.scrollIntoView({ behavior: 'smooth' });
                          }, 100);
                        }
                      }}
                      className={navItemClass(false)}
                      title={lang === 'fr' ? 'Autres modules prévus' : lang === 'de' ? 'Weitere geplante Module' : 'Other planned modules'}
                    >
                      <div className="flex items-center gap-2 pl-2 overflow-hidden text-left">
                        <span className="text-[#8b949e] font-mono text-[11px] shrink-0">└──</span>
                        <span className="truncate text-[11px] text-white/60 italic">
                          {lang === 'fr' ? 'Autres modules prévus' : lang === 'de' ? 'Weitere geplante Module' : 'Other planned modules'}
                        </span>
                      </div>
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 3. Footer Sidebar: Panier, Langue, Calculatrice, Compte */}
      <div className="p-3.5 border-t border-white/10 bg-[#0C1E18] space-y-2 shrink-0">
        
        {/* Cart & Account Line */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('cart')}
            className="flex items-center justify-between flex-1 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-xs font-semibold text-white/90 transition-colors cursor-pointer"
            id="sidebar-cart-btn"
          >
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-[#C8AB8A]" />
              <span>Panier</span>
            </div>
            {cartCount > 0 ? (
              <span className="bg-[#E8772E] text-white text-[10px] font-black px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                {cartCount}
              </span>
            ) : (
              <span className="text-white/40 text-[11px]">0</span>
            )}
          </button>

          {user ? (
            <button
              onClick={() => onNavigate('account')}
              className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-white/90 transition-colors cursor-pointer"
              title="Mon Compte"
              id="sidebar-account-btn"
            >
              <User className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={onOpenAuth}
              className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-white/90 transition-colors cursor-pointer"
              title="Connexion"
              id="sidebar-login-btn"
            >
              <User className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Language Selector & Dilution Calculator */}
        <div className="flex items-center justify-between gap-2">
          <LanguageSelector lang={lang} setLang={setLang} variant="sidebar" />

          <button
            type="button"
            onClick={onOpenCalculator}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-[#E8772E] hover:bg-[#D4651F] text-[11px] font-bold text-white transition-all cursor-pointer shadow-md shadow-orange-900/20"
            id="sidebar-calculator-btn"
            title="Calculateur de Dilution Botanique"
          >
            <Calculator className="w-3.5 h-3.5 text-white" />
            <span>Calculatrice</span>
          </button>
        </div>

      </div>
    </aside>
  );
};

export default NavigationSidebar;
```

---

## src/components/Footer.tsx (Le Footer)
Chemin : `src/components/Footer.tsx`

```tsx
import React from 'react';
import { Youtube, Instagram, Facebook, GraduationCap, Sparkles } from 'lucide-react';
import { Language, translations } from '../translations';
import { VIEW_PATHS, View } from '../types';
import { BloomLogo } from './ui/BloomLogo';

/* Icônes marque auto-hébergées (paths Simple Icons) — zéro CDN externe */
const PinterestIcon = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.623.024 12.017.024z" />
  </svg>
);
const TikTokIcon = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
  </svg>
);

interface FooterProps {
  onNavigate: (view: View, productId?: string, type?: any) => void;
  lang?: Language;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, lang = 'fr' }) => {
  const t = translations[lang] || translations.fr;
  const [email, setEmail] = React.useState('');
  const [subState, setSubState] = React.useState<'idle' | 'ok' | 'error'>('idle');

  const socialLinks = [
    { icon: Youtube, href: 'https://www.youtube.com/@BloomByBotanik', label: 'YouTube' },
    { icon: PinterestIcon, href: 'https://fr.pinterest.com/bloombybotanik', label: 'Pinterest' },
    { icon: Instagram, href: 'https://www.instagram.com/bloombybotanik/', label: 'Instagram' },
    { icon: Facebook, href: 'https://www.facebook.com/profile.php?id=61577892110122', label: 'Facebook' },
    { icon: TikTokIcon, href: 'https://www.tiktok.com/@bloombybotanik', label: 'TikTok' },
  ];

  /* Lien interne crawlable (SEO) + navigation SPA */
  const NavLink = ({ view, param, children }: { view: View; param?: string; children: React.ReactNode }) => (
    <a
      href={(VIEW_PATHS as Record<string, string>)[view] ?? '#'}
      onClick={(e) => { 
        if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
          e.preventDefault(); 
          onNavigate(view, param); 
        }
      }}
      className="text-white/80 hover:text-white hover:underline font-medium transition-colors"
    >
      {children}
    </a>
  );

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'footer_new_structure' }),
      });
      setSubState(res.ok ? 'ok' : 'error');
      if (res.ok) setEmail('');
    } catch {
      setSubState('error');
    }
  };

  return (
    <footer className="bg-[#0F261E] text-[#F9F6F0] py-12 md:py-16 px-4 sm:px-6 md:px-8 lg:px-12 border-t border-white/10">
      <div className="max-w-[1200px] mx-auto">
        
        {/* Brand & Mission + Newsletter Inscription */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-14 pb-12 border-b border-white/10">
          <div className="lg:col-span-6">
            <a
              href="/"
              className="flex items-center gap-3.5 mb-4 cursor-pointer group/footer-logo w-fit notranslate text-[#F9F6F0] hover:opacity-80 transition-opacity"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('indexbis');
              }}
              translate="no"
              id="footer-brand-logo-link"
              aria-label="Bloom by BotaniK - Accueil"
            >
              <BloomLogo variant="footer" className="w-12 h-12 flex-shrink-0" />
              <div className="flex flex-col leading-tight uppercase text-[#F9F6F0]">
                <span className="text-[10px] font-bold tracking-[0.22em] opacity-80">Bloom by</span>
                <span className="text-xl font-black tracking-widest text-white">BotaniK</span>
              </div>
            </a>
            <p className="text-white/70 text-xs sm:text-sm leading-relaxed max-w-md mb-6 font-medium">
              L'alliance des sagesses ancestrales et de la phytothérapie de haute précision. Votre corps n'est pas cassé, il est verrouillé.
            </p>

            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="me noopener noreferrer"
                  className="text-white/60 hover:text-white transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Formulaire Newsletter Pôle dédié */}
          <div className="lg:col-span-6 flex flex-col justify-center bg-white/5 rounded-3xl p-6 border border-white/10 shadow-xs">
            <div className="flex items-center gap-2 mb-2 text-[#E8772E] text-xs font-black uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-[#E8772E]" />
              <span>LE PROTOCOLE DU DIMANCHE &amp; BILLET DE L'ACADÉMIE</span>
            </div>
            <p className="text-xs text-white/70 mb-4 font-medium">
              Recevez nos synthèses exclusives de phytochimie clinique, protocoles saisonniers et monographies du Totum végétal.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Votre adresse email..."
                className="flex-1 px-4 py-2.5 rounded-xl bg-white/10 border border-white/15 text-xs sm:text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[#E8772E]"
              />
              <button 
                type="submit" 
                className="px-5 py-2.5 rounded-xl bg-[#E8772E] hover:bg-[#D4651F] text-white text-xs sm:text-sm font-bold transition-all shadow-md cursor-pointer shrink-0"
              >
                S'inscrire
              </button>
            </form>
            {subState === 'ok' && <p className="text-emerald-400 text-xs mt-2.5 font-bold">✓ Merci ! Un lien de confirmation vous a été envoyé.</p>}
            {subState === 'error' && <p className="text-rose-400 text-xs mt-2.5 font-bold">Une erreur est survenue. Veuillez réessayer.</p>}
          </div>
        </div>

        {/* NOUVELLE STRUCTURE FOOTER EN 4 COLONNES */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-10 mb-10 border-b border-white/10 text-xs text-white/70">
          
          {/* COLONNE 1: BLOOM BY BOTANIK */}
          <div>
            <h4 className="text-xs uppercase tracking-widest font-black mb-4 text-[#F9F6F0]">
              BLOOM BY BOTANIK
            </h4>
            <ul className="space-y-2.5">
              <li><NavLink view="la-marque">Histoire &amp; Philosophie</NavLink></li>
              <li><NavLink view="contact">Contact</NavLink></li>
            </ul>
          </div>

          {/* COLONNE 2: BLOOM ACADÉMIE */}
          <div>
            <h4 className="text-xs uppercase tracking-widest font-black mb-4 text-[#F9F6F0] flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-[#E8772E]" />
              <span>BLOOM ACADÉMIE</span>
            </h4>
            <ul className="space-y-2.5">
              <li><NavLink view="academie">Hub Bloom Académie</NavLink></li>
              <li><NavLink view="protocoles">Protocoles Systémiques</NavLink></li>
              <li><NavLink view="phytotherapie-reset">Reset Homéostasique</NavLink></li>
              <li><NavLink view="4-architectures">Comprendre le Corps</NavLink></li>
              <li><NavLink view="pillar-extraction">Extraction &amp; Totum</NavLink></li>
              <li><NavLink view="library-landing">Bibliothèque Scientifique</NavLink></li>
            </ul>
          </div>

          {/* COLONNE 3: BOUTIQUE */}
          <div>
            <h4 className="text-xs uppercase tracking-widest font-black mb-4 text-[#F9F6F0]">
              BOUTIQUE
            </h4>
            <ul className="space-y-2.5">
              <li><NavLink view="product-detail" param="bloomlab">BloomLab®</NavLink></li>
              <li><NavLink view="boutique-kits">Packs</NavLink></li>
              <li><NavLink view="boutique">Accessoires</NavLink></li>
              <li><button onClick={() => onNavigate('legal', undefined, 'cgv')} className="text-white/80 hover:text-white hover:underline font-medium transition-colors text-left cursor-pointer">CGV</button></li>
            </ul>
          </div>

          {/* COLONNE 4: RESSOURCES */}
          <div>
            <h4 className="text-xs uppercase tracking-widest font-black mb-4 text-[#F9F6F0]">
              RESSOURCES
            </h4>
            <ul className="space-y-2.5">
              <li><NavLink view="faq">FAQ</NavLink></li>
              <li><NavLink view="returns">Livraison &amp; Retours</NavLink></li>
              <li><button onClick={() => onNavigate('legal', undefined, 'mentions')} className="text-white/80 hover:text-white hover:underline font-medium transition-colors text-left cursor-pointer">Mentions Légales</button></li>
              <li><button onClick={() => onNavigate('legal', undefined, 'privacy')} className="text-white/80 hover:text-white hover:underline font-medium transition-colors text-left cursor-pointer">Politique de Confidentialité</button></li>
            </ul>
          </div>

        </div>

        {/* Mentions légales de bas de page */}
        <div className="pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] uppercase tracking-widest text-white/50 text-center md:text-left font-medium">
            © {new Date().getFullYear()} Bloom by BotaniK — Tous droits réservés
          </p>
          <p className="text-[10px] uppercase tracking-widest text-white/50 text-center md:text-right max-w-xl font-medium">
            Dispositif d'extraction botanique à usage personnel. Ceci n'est pas un dispositif médical.
            Contenus éducatifs et d'accompagnement de terrain — ne remplace pas une consultation médicale.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
```

---
