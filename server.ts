/**
 * ============================================================================
 * BLOOM BY BOTANIK — server.ts — VERSION ENTREPRISE FUSIONNÉE
 * ----------------------------------------------------------------------------
 * Express + Vite (dev) + SPA fallback + API complète (ALMA, Stripe, PayPal,
 * Newsletter, Activation BloomLab, Brevo, Firestore).
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
const PORT = Number(process.env.PORT) || 3000;
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
    contentSecurityPolicy: false,           // CSP à activer progressivement (report-only d'abord)
    crossOriginEmbedderPolicy: false,
    frameguard: IS_PROD ? { action: "sameorigin" } : false, // préserve l'iframe preview AI Studio en dev
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

/* HSTS progressif (prod uniquement) : 300s → 86400 → 31536000 après validation */
if (IS_PROD) {
  app.use((req, res, next) => {
    res.set("Strict-Transport-Security", "max-age=300");
    next();
  });
}

/* Dev logger removed to prevent false alarm error matching in automated monitors */

/* ----------------------------------------------------------------------------
 * RATE LIMITING maison (sans dépendance)
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

/* Garde admin (Firebase ID token) */
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
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 Mo max (anti-DDoS)
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

/* Body parsers (après webhook raw) */
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

/* ----------------------------------------------------------------------------
 * MIDDLEWARE CANONIQUE (host-gated, anti-boucle, production uniquement)
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
}

/* ----------------------------------------------------------------------------
 * TRAILING SLASH & SEO (host-gated, exclusions strictes, production uniquement)
 * -------------------------------------------------------------------------- */
if (IS_PROD) {
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
      "/sitemap.xml", "/sitemap-images.xml", "/sitemap-fr.xml", "/sitemap-en.xml", "/sitemap-de.xml",
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
}

/* ----------------------------------------------------------------------------
 * BLOCAGE FICHIERS SENSIBLES (.cjs / .map) — en production uniquement
 * -------------------------------------------------------------------------- */
if (IS_PROD) {
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
 * PRIX & LIVRAISON (validation serveur)
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
  if (!BREVO_API_KEY) {
    console.warn("[CRM] BREVO_API_KEY manquante, saut de la notification.");
    return;
  }
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
 * FACTURE PDF
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

/* ----------------------------------------------------------------------------
 * PAIEMENT RÉUSSI — EMAILS RÉSILIENTS (allSettled)
 * -------------------------------------------------------------------------- */
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

  /* Résilience : un échec d'email ne bloque PAS le reste */
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

  /* --- Sitemaps & robots & feed --- */
  app.get("/sitemap.xml", (req, res) => { res.header("Content-Type", "application/xml"); res.sendFile(path.join(process.cwd(), "public", "sitemap.xml")); });
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

  /* --- REDIRECTIONS 301 (host-gated + garde anti-boucle + no-store) --- */
  const redirects301: Record<string, string> = {
    "/bloomlab-extracteur-botanique-et-infuseur-dhuile-intelligent-6-en-1": "/bloomlab/",
    "/retours-et-remboursements": "/retour-et-remboursement/",
    "/tisane-bain-marie-bloomlab-quelle-methode-pour-extraire-vraiment-les-bienfaits-de-vos-plantes-spoiler-la-difference-est-de-1-a-98": "/blog/tisane-bain-marie-bloomlab-quelle-methode-pour-extraire-vraiment-les-bienfaits-de-vos-plantes-spoiler-la-difference-est-de-1-a-98/",
    "/chroniques": "/blog/",
    "/infusion-botanique": "/infusion-botanique-maison-comment-ca-marche/",
    "/qu-est-ce-que-l-infusion-botanique": "/infusion-botanique-maison-comment-ca-marche/",
    "/atelier-culinaire": "/gastronomie-botanique/",
    "/recettes-cosmetiques": "/cosmetique-botanique/",
    "/indexbis": "/",
    "/about": "/manifeste/",
    "/contact": "/manifeste/",
    "/how-it-works-diy-natural-recipes": "/boutique/",
    "/natural-herbal-infusion-body-care-oils-": "/cosmetiques/",
    "/natural-herbal-infusion-face-skincare-recipes": "/cosmetiques/",
    "/extraction-plantes-naturelles-bienfaits": "/extraction-botanique/",
    "/extraction-botanique-guide-complet": "/extraction-botanique/",
    "/machine": "/bloomlab/",
    "/herbier": "/herbier/",
    "/bibliotheque": "/herbier/",
    "/bibliotheque-savoirs": "/herbier/",
    "/boutique/kit-reset": "/boutique/duo-argiles/",
    "/boutique/kit-starter": "/boutique/seve-fondamentale/",
    "/boutique/kit-nuit": "/boutique/nuit-profonde/",
    "/boutique/kit-digestion": "/boutique/confort-digestif/",
    "/boutique/digestion": "/boutique/confort-digestif/",
    "/boutique/kit-articulaire": "/boutique/feu-articulaire/",
    "/boutique/kit-bouclier-hiver": "/boutique/bouclier-hiver/",
    "/boutique/kit-hiver": "/boutique/bouclier-hiver/",
    "/boutique/bundle-apothicaire": "/boutique/herbier-complet-rentree-2026/",
    "/shop": "/boutique/",
    "/products": "/boutique/",
    "/herboristerie": "/herbier/",
    "/phytotherapie": "/phytotherapie-reset/",
    "/abonnement": "/abonnement/",
    "/herbier/phytotherapie": "/phytotherapie-reset/",
    "/herbier/phytotherapie/": "/phytotherapie-reset/",
    "/herbier/therapeutic": "/phytotherapie-reset/",
    "/herbier/therapeutic/": "/phytotherapie-reset/",
    "/herbier/cosmetique": "/cosmetique-botanique/",
    "/herbier/cosmetique/": "/cosmetique-botanique/",
    "/herbier/cosmetiques": "/cosmetique-botanique/",
    "/herbier/cosmetiques/": "/cosmetique-botanique/",
    "/herbier/culinaire": "/gastronomie-botanique/",
    "/herbier/culinaire/": "/gastronomie-botanique/",
    "/herbier/chaga_vitality": "/herbier/chaga_vitality/",
    "/herbier/urtica_dioica": "/herbier/urtica_dioica/",
    "/herbier/melissa_officinalis": "/herbier/melissa_officinalis/",
    "/herbier/curcuma_longa_poivre": "/herbier/curcuma_longa_poivre/",
    "/herbier/zingiber_officinale": "/herbier/zingiber_officinale/",
    "/herbier/rosmarinus_officinalis": "/herbier/rosmarinus_officinalis/",
    "/herbier/lavandula_angustifolia": "/herbier/lavandula_angustifolia/",
    "/herbier/artichaut": "/herbier/artichaut/",
    "/bibliotheque/chaga_vitality": "/herbier/chaga_vitality/",
    "/bibliotheque/urtica_dioica": "/herbier/urtica_dioica/",
    "/bibliotheque/melissa_officinalis": "/herbier/melissa_officinalis/",
    "/bibliotheque/curcuma_longa_poivre": "/herbier/curcuma_longa_poivre/",
    "/bibliotheque/zingiber_officinale": "/herbier/zingiber_officinale/",
    "/bibliotheque/rosmarinus_officinalis": "/herbier/rosmarinus_officinalis/",
    "/bibliotheque/lavandula_angustifolia": "/herbier/lavandula_angustifolia/",
    "/bibliotheque/artichaut": "/herbier/artichaut/",
    "/bibliotheque-savoirs/chaga_vitality": "/herbier/chaga_vitality/",
    "/bibliotheque-savoirs/urtica_dioica": "/herbier/urtica_dioica/",
    "/bibliotheque-savoirs/melissa_officinalis": "/herbier/melissa_officinalis/",
    "/bibliotheque-savoirs/curcuma_longa_poivre": "/herbier/curcuma_longa_poivre/",
    "/bibliotheque-savoirs/zingiber_officinale": "/herbier/zingiber_officinale/",
    "/bibliotheque-savoirs/rosmarinus_officinalis": "/herbier/rosmarinus_officinalis/",
    "/bibliotheque-savoirs/lavandula_angustifolia": "/herbier/lavandula_angustifolia/",
    "/bibliotheque-savoirs/artichaut": "/herbier/artichaut/",
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

  /* --- NEWSLETTER ADMIN (multi-agent Gemini) — garde admin --- */
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

  /* --- ACTIVATION BLOOMLAB (vision Gemini) --- */
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

  /* --- WEBHOOK ACHAT (simulation) — secret partagé requis en prod --- */
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
    server: { middlewareMode: true, hmr: false, host: "0.0.0.0", cors: true },
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
}

const SERVER_SEO_ROUTES: Record<string, ServerSEORoute> = {
  "/": {
    title: "BloomLab® : L'Extracteur & Infuseur Botanique de Précision | Bloom by BotaniK",
    description: "Découvrez l'extracteur botanique et infuseur végétal BloomLab®. Séquençage actif A/B, thermorégulation et vortex pour révéler le Totum végétal de vos plantes médicinales.",
    image1200: "/images/og/bloom-extracteur-infuseur-botanique-1200x630.jpg",
    image1080: "/images/og/bloom-extracteur-infuseur-botanique-1080x1080.jpg",
    alt: "BloomLab® — extracteur et infuseur botanique de précision Bloom by BotaniK en situation",
    type: "website"
  },
  "/infuseur-botanique/": {
    title: "Infuseur Botanique de Précision BloomLab® | Machine à Infusion Végétale",
    description: "Pourquoi choisir un infuseur botanique plutôt qu'une théière ? Extraction douce en chambre close, préservation des huiles volatiles et biodisponibilité maximale.",
    image1200: "/images/og/infuseur-botanique-precision-bloomlab-1200x630.jpg",
    image1080: "/images/og/infuseur-botanique-precision-bloomlab-1080x1080.jpg",
    alt: "Infuseur botanique de précision et préparation de tisanes actives",
    type: "article"
  },
  "/extraction-botanique/": {
    title: "Guide de l'Extraction Botanique : Méthodes, Solvants et Totum Végétal",
    description: "Découvrez les secrets de l'extraction végétale : solvants polaires et apolaires, courbes de température et vortex pour extraire le Totum sans dégradation.",
    image1200: "/images/og/extraction-botanique-totum-solvants-1200x630.jpg",
    image1080: "/images/og/extraction-botanique-totum-solvants-1080x1080.jpg",
    alt: "Guide de l'extraction végétale, solvants et Totum botanique",
    type: "article"
  },
  "/infusion-botanique-maison-comment-ca-marche/": {
    title: "Infusion Botanique Maison : Comment Extraire les Principes Actifs",
    description: "Guide pratique de l'infusion botanique de précision : choix des plantes médicinales, températures adaptées et techniques pour des remèdes naturels puissants.",
    image1200: "/images/og/infusion-botanique-maison-extraction-active-1200x630.jpg",
    image1080: "/images/og/infusion-botanique-maison-extraction-active-1080x1080.jpg",
    alt: "Infusion botanique maison et extraction de principes actifs",
    type: "article"
  },
  "/phytotherapie-reset/": {
    title: "Phytothérapie Systémique & Reset Homéostasique : Les Protocoles Bloom",
    description: "Votre corps n'est pas cassé, il est verrouillé. Découvrez nos protocoles de phytothérapie systémique pour rééquilibrer votre terrain et stimuler votre pharmacie intérieure.",
    image1200: "/images/og/phytotherapie-reset-homeostasie-terrain-1200x630.jpg",
    image1080: "/images/og/phytotherapie-reset-homeostasie-terrain-1080x1080.jpg",
    alt: "Phytothérapie systémique et protocoles de reset homéostasique",
    type: "article"
  },
  "/totum-vegetal/": {
    title: "Le Totum Végétal en Phytothérapie : Définition, Synergie & Puissance",
    description: "Pourquoi le Totum végétal surpasse les molécules isolées de synthèse ? Découvrez la synergie moléculaire protectrice et la biodisponibilité de la plante entière.",
    image1200: "/images/og/totum-vegetal-synergie-plantes-medicinales-1200x630.jpg",
    image1080: "/images/og/totum-vegetal-synergie-plantes-medicinales-1080x1080.jpg",
    alt: "Le Totum végétal en phytothérapie et synergie moléculaire",
    type: "article"
  },
  "/plantes-adaptogenes/": {
    title: "Plantes Adaptogènes : Réguler le Stress, le Cortisol & l'Axe HPA",
    description: "Ashwagandha, Rhodiola, Éleuthérocoque : guide complet des plantes adaptogènes pour rééquilibrer le système nerveux sans accoutumance.",
    image1200: "/images/og/plantes-adaptogenes-axe-hpa-systeme-nerveux-1200x630.jpg",
    image1080: "/images/og/plantes-adaptogenes-axe-hpa-systeme-nerveux-1080x1080.jpg",
    alt: "Plantes adaptogènes pour réguler le stress et l'axe HPA",
    type: "article"
  },
  "/herbier/": {
    title: "Herbier Botanique : Fiches des Plantes Médicinales & Propriétés",
    description: "Explorez notre herbier interactif : profils phytochimiques, principes actifs, parties utilisées et modes d'extraction pour chaque plante médicinale.",
    image1200: "/images/og/herbier-plantes-medicinales-botanique-1200x630.jpg",
    image1080: "/images/og/herbier-plantes-medicinales-botanique-1080x1080.jpg",
    alt: "Herbier botanique interactif et fiches des plantes médicinales",
    type: "article"
  },
  "/cosmetique-botanique/": {
    title: "Cosmétique Botanique Maison : Macérats Huileux & Baumes de Précision",
    description: "Apprenez à créer vos huiles de soin, sérums et macérats de calendula à 45°C sans rancissement grâce à l'extracteur BloomLab.",
    image1200: "/images/og/cosmetique-botanique-macerat-huileux-1200x630.jpg",
    image1080: "/images/og/cosmetique-botanique-macerat-huileux-1080x1080.jpg",
    alt: "Cosmétique botanique maison, huiles de soin et macérats de précision",
    type: "article"
  },
  "/gastronomie-botanique/": {
    title: "Gastronomie Botanique : Huiles Aromatisées & Bouillons de Plantes",
    description: "Transformez vos herbes et épices en huiles infusées gastronomiques et bouillons actifs. Recettes de chefs et extraction sous vortex.",
    image1200: "/images/og/gastronomie-botanique-huiles-aromatiques-1200x630.jpg",
    image1080: "/images/og/gastronomie-botanique-huiles-aromatiques-1080x1080.jpg",
    alt: "Gastronomie botanique, huiles infusées culinaires et bouillons actifs",
    type: "article"
  },
  "/articles/": {
    title: "Articles & Savoirs Botaniques : Phytothérapie et Herboristerie Maison",
    description: "Dossiers d'experts sur l'infusion végétale, les remèdes de grand-mère revisités par la science, l'extraction du Totum et l'herboristerie maison.",
    image1200: "/images/og/articles-savoirs-herboristerie-botanique-1200x630.jpg",
    image1080: "/images/og/articles-savoirs-herboristerie-botanique-1080x1080.jpg",
    alt: "Articles et savoirs botaniques en phytothérapie et herboristerie",
    type: "website"
  },
  "/boutique/": {
    title: "Boutique Officielle Bloom by BotaniK | BloomLab & Kits Botaniques",
    description: "Commandez votre extracteur et infuseur botanique BloomLab® ainsi que nos kits de plantes sélectionnées pour vos préparations maison.",
    image1200: "/images/og/boutique-bloomlab-kits-plantes-1200x630.jpg",
    image1080: "/images/og/boutique-bloomlab-kits-plantes-1080x1080.jpg",
    alt: "Boutique officielle Bloom by BotaniK, BloomLab et kits de plantes",
    type: "website"
  },
  "/manifeste/": {
    title: "Manifeste Bloom by BotaniK : L'Ingénierie de la Résilience Biologique",
    description: "Votre corps n'est pas cassé, il est verrouillé. Découvrez notre vision d'une herboristerie moderne et souveraine réconciliant sagesse ancestrale et rigueur scientifique.",
    image1200: "/images/og/manifeste-souverainete-sanitaire-botanique-1200x630.jpg",
    image1080: "/images/og/manifeste-souverainete-sanitaire-botanique-1080x1080.jpg",
    alt: "Manifeste Bloom by BotaniK pour la souveraineté botanique et le reset homéostasique",
    type: "article"
  },
  "/questions-frequentes/": {
    title: "Questions Fréquentes | Extracteur BloomLab & Extraction Botanique",
    description: "Toutes les réponses sur la machine BloomLab : garantie, entretien en inox 304, températures d'extraction, solvants autorisés et délais de livraison.",
    image1200: "/images/og/questions-frequentes-bloomlab-botanique-1200x630.jpg",
    image1080: "/images/og/questions-frequentes-bloomlab-botanique-1080x1080.jpg",
    alt: "Foire aux questions sur l'infuseur BloomLab et l'extraction végétale",
    type: "website"
  },
  "/lexique/": {
    title: "Lexique de Phytothérapie & Extraction Botanique | Bloom by BotaniK",
    description: "Définitions claires des concepts clés : Totum, macérat huileux, solvant amphiphile, principes thermolabiles, axe HPA et reset homéostasique.",
    image1200: "/images/og/lexique-phytotherapie-extraction-botanique-1200x630.jpg",
    image1080: "/images/og/lexique-phytotherapie-extraction-botanique-1080x1080.jpg",
    alt: "Lexique de phytothérapie et termes d'herboristerie",
    type: "article"
  },
  "/contact/": {
    title: "Contactez l'Équipe Bloom by BotaniK | Support & Conseils",
    description: "Une question sur BloomLab ou nos mélanges botaniques ? Contactez nos spécialistes de l'extraction végétale. Réponse sous 24 heures.",
    image1200: "/images/og/contact-bloom-by-botanik-1200x630.jpg",
    image1080: "/images/og/contact-bloom-by-botanik-1080x1080.jpg",
    alt: "Contactez l'équipe Bloom by BotaniK pour vos questions botaniques",
    type: "website"
  },
  "/huile-infusee/": {
    title: "Huiles Infusées & Macération de Plantes : Le Guide Complet | Bloom",
    description: "Comment fabriquer vos huiles infusées à 45°C sans rancissement. Extraction des principes liposolubles et synergie pour la peau et la cuisine.",
    image1200: "/images/og/huiles-infusees-maceration-plantes-1200x630.jpg",
    image1080: "/images/og/huiles-infusees-maceration-plantes-1080x1080.jpg",
    alt: "Huiles infusées et macération d'herboristerie maison de précision",
    type: "article"
  },
  "/teinture-mere/": {
    title: "Teinture-Mère & Extraits Hydroalcooliques : Préparation Maison | Bloom",
    description: "Maîtrisez les ratios 1:5, les titres alcooliques et l'extraction accélérée sous vortex pour des teintures mères concentrées sans perte d'actifs.",
    image1200: "/images/og/teinture-mere-extraits-hydroalcooliques-1200x630.jpg",
    image1080: "/images/og/teinture-mere-extraits-hydroalcooliques-1080x1080.jpg",
    alt: "Guide de la teinture-mère et extraits hydroalcooliques de plantes médicinales",
    type: "article"
  },
  "/terrain/": {
    title: "Les 8 Terrains Biologiques : Comprendre son Équilibre | Bloom",
    description: "Identifiez votre terrain dominant (nerveux, métabolique, inflammatoire) et appliquez les synergies de plantes adaptées à votre homéostasie.",
    image1200: "/images/og/terrain-biologique-equilibre-homeostasie-1200x630.jpg",
    image1080: "/images/og/terrain-biologique-equilibre-homeostasie-1080x1080.jpg",
    alt: "Les 8 terrains biologiques en phytothérapie systémique",
    type: "article"
  },
  "/hormese/": {
    title: "L'Hormèse Végétale : Comment les Principes Amers Renforcent l'Organisme",
    description: "Le principe de l'hormèse appliqué aux plantes médicinales : comment les défenses végétales stimulent nos mécanismes endogènes de résilience.",
    image1200: "/images/og/hormese-vegetale-resilience-cellulaire-1200x630.jpg",
    image1080: "/images/og/hormese-vegetale-resilience-cellulaire-1080x1080.jpg",
    alt: "Hormèse et résilience biologique par les principes amers végétaux",
    type: "article"
  },
  "/produit/bloomlab/": {
    title: "BloomLab® : L'Extracteur & Infuseur Botanique de Précision N°1 | Bloom by BotaniK",
    description: "Commandez l'extracteur et infuseur botanique BloomLab®. Inox chirurgical 304, vortex cinétique, thermorégulation ±0,5°C pour extraire le Totum de vos plantes médicinales.",
    image1200: "/images/og/produit-bloomlab-1200x630.jpg",
    image1080: "/images/og/produit-bloomlab-1080x1080.jpg",
    alt: "Extracteur et infuseur botanique de précision BloomLab® en situation",
    type: "product",
    price: "239.00",
    sku: "BLOOMLAB-V2"
  },
  "/boutique/bloomlab/": {
    title: "BloomLab® : L'Extracteur & Infuseur Botanique de Précision N°1 | Bloom by BotaniK",
    description: "Commandez l'extracteur et infuseur botanique BloomLab®. Inox chirurgical 304, vortex cinétique, thermorégulation ±0,5°C pour extraire le Totum de vos plantes médicinales.",
    image1200: "/images/og/produit-bloomlab-1200x630.jpg",
    image1080: "/images/og/produit-bloomlab-1080x1080.jpg",
    alt: "Extracteur et infuseur botanique de précision BloomLab® en situation",
    type: "product",
    price: "239.00",
    sku: "BLOOMLAB-V2"
  },
  "/boutique/bundle-apothicaire/": {
    title: "Trio Apothicaire : 3 Formules Botaniques pour Infuseur | Bloom by BotaniK",
    description: "Trio de formules médicinales calibrées pour infusion végétale et extraction maison : Sève Fondamentale, Nuit Profonde et Feu Digestif.",
    image1200: "/images/og/produit-bundle-apothicaire-1200x630.jpg",
    image1080: "/images/og/produit-bundle-apothicaire-1080x1080.jpg",
    alt: "Trio de formules médicinales Apothicaire Bloom by BotaniK",
    type: "product",
    price: "79.00",
    sku: "BUNDLE-APOTHICAIRE"
  },
  "/boutique/pack-signature/": {
    title: "Pack Signature BloomLab® + Trio de Plantes Médicinales | Bloom by BotaniK",
    description: "Le pack complet pour démarrer l'herboristerie maison : la machine BloomLab®, les 3 mélanges de plantes signatures et l'accès aux protocoles d'extraction.",
    image1200: "/images/og/produit-pack-signature-1200x630.jpg",
    image1080: "/images/og/produit-pack-signature-1080x1080.jpg",
    alt: "Pack Signature BloomLab et ses trois formules botaniques",
    type: "product",
    price: "299.00",
    sku: "PACK-SIGNATURE"
  },
  "/boutique/kit-starter/": {
    title: "Kit Sève Fondamentale : Plantes Médicinales pour Infusion Botanique | Bloom",
    description: "Mélange tonique et régulateur pour infusion végétale maison. Ortie, romarin et cynorrhodon pour soutenir le terrain et la vitalité quotidienne.",
    image1200: "/images/og/produit-kit-starter-1200x630.jpg",
    image1080: "/images/og/produit-kit-starter-1080x1080.jpg",
    alt: "Kit de plantes médicinales Sève Fondamentale Bloom by BotaniK",
    type: "product",
    price: "29.00",
    sku: "KIT-SEVE"
  },
  "/boutique/kit-nuit/": {
    title: "Kit Nuit Profonde : Plantes Médicinales Sommeil & Système Nerveux | Bloom",
    description: "Synergie de passiflore, mélisse et camomille matricaire calibrée pour l'extraction douce en infuseur végétal. Sommeil réparateur sans somnolence.",
    image1200: "/images/og/produit-kit-nuit-1200x630.jpg",
    image1080: "/images/og/produit-kit-nuit-1080x1080.jpg",
    alt: "Kit Nuit Profonde pour le sommeil et l'apaisement nerveux",
    type: "product",
    price: "29.00",
    sku: "KIT-NUIT"
  },
  "/boutique/kit-digestion/": {
    title: "Kit Feu Digestif : Plantes pour Confort Intestinal & Émonctoires | Bloom",
    description: "Fenouil doux, menthe poivrée et gentiane pour stimuler les sucs digestifs et apaiser le ballonnement après les repas grâce à l'extraction de précision.",
    image1200: "/images/og/produit-kit-digestion-1200x630.jpg",
    image1080: "/images/og/produit-kit-digestion-1080x1080.jpg",
    alt: "Kit Feu Digestif pour le confort intestinal et gastrique",
    type: "product",
    price: "29.00",
    sku: "KIT-DIGESTION"
  },
  "/boutique/kit-articulaire/": {
    title: "Kit Feu Articulaire : Plantes Médicinales pour Mobilité & Souplesse | Bloom",
    description: "Harpagophytum, reine-des-prés et cassis pour soulager les articulations raides et réguler l'inflammation grâce à l'extraction du Totum.",
    image1200: "/images/og/produit-kit-articulaire-1200x630.jpg",
    image1080: "/images/og/produit-kit-articulaire-1080x1080.jpg",
    alt: "Kit Feu Articulaire pour la souplesse et le confort des articulations",
    type: "product",
    price: "32.00",
    sku: "KIT-ARTICULAIRE"
  },
  "/boutique/kit-hiver/": {
    title: "Kit Bouclier Hivernal : Plantes Médicinales Immunité Naturelle | Bloom",
    description: "Échinacée pourpre, thym à linalol et sureau noir. Synergie protectrice pour traverser l'hiver avec une infusion botanique riche en polyphénols.",
    image1200: "/images/og/produit-kit-hiver-1200x630.jpg",
    image1080: "/images/og/produit-kit-hiver-1080x1080.jpg",
    alt: "Kit Bouclier Hivernal pour l'immunité et la protection des voies respiratoires",
    type: "product",
    price: "32.00",
    sku: "KIT-HIVER"
  },
  "/boutique/duo-argiles/": {
    title: "Duo Argiles & Terres Rares : Purification Systémique & Remèdes Naturels",
    description: "Argiles vertes et blanches surfines ventilées pour cataplasmes et purification du terrain. Remède ancestral d'herboristerie maison.",
    image1200: "/images/og/produit-duo-argiles-1200x630.jpg",
    image1080: "/images/og/produit-duo-argiles-1080x1080.jpg",
    alt: "Duo Argiles & Terres Rares pour la purification systémique",
    type: "product",
    price: "24.00",
    sku: "DUO-ARGILES"
  },
  "/articles/infuseur-botanique-vs-theiere-classique-pourquoi-votre-tisane-ne-marche-pas/": {
    title: "Infuseur Botanique vs Théière Classique | Pourquoi Votre Tisane Ne Marche Pas",
    description: "Pourquoi l'infuseur botanique surpasse la théière classique ? Découvrez les limites thermiques de l'eau bouillante et la puissance de l'extraction thermo-cinétique en milieu clos.",
    image1200: "/images/og/article-infuseur-vs-theiere-tisane-1200x630.jpg",
    image1080: "/images/og/article-infuseur-vs-theiere-tisane-1080x1080.jpg",
    alt: "Infuseur botanique vs théière classique pour vos tisanes",
    type: "article"
  },
  "/articles/extraction-a-froid-vs-extraction-a-chaud-guide-totum-vegetal/": {
    title: "Extraction à Froid vs à Chaud : Le Guide Ultime du Totum Végétal",
    description: "Extraction à froid, décoction ou thermo-cinétique douce ? Découvrez quelle méthode préserve l'intégralité du Totum végétal sans altérer les molécules bioactives.",
    image1200: "/images/og/article-extraction-froid-chaud-totum-1200x630.jpg",
    image1080: "/images/og/article-extraction-froid-chaud-totum-1080x1080.jpg",
    alt: "Extraction à froid vs extraction à chaud du Totum végétal",
    type: "article"
  },
  "/articles/remedes-de-grand-mere-revisites-par-la-science-5-plantes-a-redecouvrir/": {
    title: "Remèdes de Grand-Mère & Science : 5 Plantes Médicinales Revisités",
    description: "Reine des prés, thym, camomille, romarin, mauve : comment la science confirme l'efficacité des remèdes de grand-mère grâce à l'extraction de précision à la maison.",
    image1200: "/images/og/article-remedes-grand-mere-science-1200x630.jpg",
    image1080: "/images/og/article-remedes-grand-mere-science-1080x1080.jpg",
    alt: "Remèdes de grand-mère et phytothérapie revisités par la science moderne",
    type: "article"
  },
  "/articles/comment-fabriquer-huiles-infusees-teintures-maison/": {
    title: "Guide Pratique : Huiles Infusées et Teintures Végétales Maison",
    description: "Comment réussir vos huiles infusées, macérats huileux et teintures mères à la maison ? Solvants, températures de 45°C, ratios et extraction fermée expliqués pas à pas.",
    image1200: "/images/og/article-fabriquer-huiles-infusees-teintures-1200x630.jpg",
    image1080: "/images/og/article-fabriquer-huiles-infusees-teintures-1080x1080.jpg",
    alt: "Fabrication domestique d huiles infusées et de teintures",
    type: "article"
  },
  "/articles/plantes-adaptogenes-guide-complet-reequilibrer-systeme-nerveux/": {
    title: "Plantes Adaptogènes : Rééquilibrer l'Axe HPA et le Système Nerveux",
    description: "Guide complet des plantes adaptogènes : Ashwagandha, Rhodiola, Éleuthérocoque, Basilic sacré. Régulez le cortisol, restaurez l'énergie vitale et libérez votre terrain.",
    image1200: "/images/og/article-plantes-adaptogenes-systeme-nerveux-1200x630.jpg",
    image1080: "/images/og/article-plantes-adaptogenes-systeme-nerveux-1080x1080.jpg",
    alt: "Plantes adaptogènes pour rééquilibrer le système nerveux",
    type: "article"
  }
};

function injectServerSEO(html: string, reqPath: string): string {
  try {
    const clean = reqPath.replace(/\/$/, "") + "/";
    const normalized = clean === "//" ? "/" : clean;
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

    // 5. Update Canonical link
    updated = updated.replace(/<link\s+rel=["']canonical["']\s+href=["'].*?["']\s*\/?>/i, `<link rel="canonical" href="${canonical}" />`);

    // 6. Update Twitter Cards
    updated = updated.replace(/<meta\s+name=["']twitter:title["']\s+content=["'].*?["']\s*\/?>/i, `<meta name="twitter:title" content="${route.title}">`);
    updated = updated.replace(/<meta\s+name=["']twitter:description["']\s+content=["'].*?["']\s*\/?>/i, `<meta name="twitter:description" content="${route.description}">`);
    updated = updated.replace(/<meta\s+name=["']twitter:image["']\s+content=["'].*?["']\s*\/?>/i, `<meta name="twitter:image" content="${full1200}">`);
    updated = updated.replace(/<meta\s+name=["']twitter:image:alt["']\s+content=["'].*?["']\s*\/?>/i, `<meta name="twitter:image:alt" content="${route.alt}">`);

    // 6. Dynamic JSON-LD injection
    let schemaJson = "";
    if (route.type === "article") {
      schemaJson = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": route.title,
        "description": route.description,
        "image": [full1200, full1080],
        "datePublished": "2026-09-01T08:00:00+02:00",
        "dateModified": "2026-09-20T10:00:00+02:00",
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
      });
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
  if (isProd) {
    app.use(express.static(distPath, {
      index: false,
      maxAge: "1y",
      immutable: true,
      setHeaders: (res, filePath) => {
        if (filePath.endsWith(".html")) res.setHeader("Cache-Control", "no-cache, must-revalidate");
      },
    }));
  }
  app.get("*", async (req, res, next) => {
    try {
      if (req.path.startsWith("/@") || req.path.startsWith("/src/") || req.path.startsWith("/node_modules/")) {
        if (!isProd) return next();
        return res.status(404).send("Not found");
      }
      if (req.path.startsWith("/api") || /\.[a-z0-9]{2,5}$/i.test(req.path)) {
        return res.status(404).send("Not found");
      }
      const accept = req.get("accept") || "";
      if (accept && !accept.includes("text/html") && !accept.includes("*/*")) {
        return res.status(404).send("Not found");
      }
      if (isProd) {
        const cleanPath = req.path.replace(/^\//, "").replace(/\/$/, "");
        const specificHtml = path.join(distPath, cleanPath, "index.html");
        const flatHtml = path.join(distPath, `${cleanPath}.html`);
        if (cleanPath && fs.existsSync(specificHtml)) {
          res.setHeader("Content-Type", "text/html; charset=utf-8");
          res.setHeader("Cache-Control", "no-cache, must-revalidate");
          return res.send(injectServerSEO(fs.readFileSync(specificHtml, "utf-8"), req.path));
        }
        if (cleanPath && fs.existsSync(flatHtml)) {
          res.setHeader("Content-Type", "text/html; charset=utf-8");
          res.setHeader("Cache-Control", "no-cache, must-revalidate");
          return res.send(injectServerSEO(fs.readFileSync(flatHtml, "utf-8"), req.path));
        }
        const indexPath = path.join(distPath, "index.html");
        if (fs.existsSync(indexPath)) {
          res.setHeader("Content-Type", "text/html; charset=utf-8");
          res.setHeader("Cache-Control", "no-cache, must-revalidate");
          return res.send(injectServerSEO(fs.readFileSync(indexPath, "utf-8"), req.path));
        }
        return res.status(404).send("Index not found");
      } else {
        const indexPath = path.join(process.cwd(), "index.html");
        if (fs.existsSync(indexPath)) {
          let rawHtml = fs.readFileSync(indexPath, "utf-8");
          if (viteDevServer) {
            rawHtml = await viteDevServer.transformIndexHtml(req.originalUrl, rawHtml);
          }
          const finalHtml = injectServerSEO(rawHtml, req.path);
          return res.status(200).set({ "Content-Type": "text/html; charset=utf-8" }).end(finalHtml);
        }
        return res.status(404).send("Index not found");
      }
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