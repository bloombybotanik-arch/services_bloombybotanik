import express from "express";
import path from "path";
import fs from "fs";
import cors from "cors";
import multer from "multer";
import nodemailer from "nodemailer";
import { jsPDF } from "jspdf";
import Stripe from "stripe";
import { GoogleGenAI } from "@google/genai";
import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore, Firestore } from "firebase-admin/firestore";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { NewsletterOrchestrator } from "./server/newsletter-orchestrator";

dotenv.config();

const getStripe = () => {
  const apiKey = process.env.STRIPE_SECRET_KEY;
  if (!apiKey) {
    throw new Error('STRIPE_SECRET_KEY is missing');
  }
  return new Stripe(apiKey, {
    apiVersion: "2023-10-16" as any,
  });
};

const app = express();

// Health check (MUST be before Vite)
app.get('/api/health', (req, res) => res.json({ status: 'ok', timestamp: new Date().toISOString() }));

// --- VITE MIDDLEWARE ---
async function setupVite(app: express.Express) {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { 
        middlewareMode: true,
        hmr: { clientPort: 443 },
        host: '0.0.0.0',
        cors: true
      },
      appType: "spa",
      base: '/'
    });
    
    // We will attach this inside startServer to ensure order
    return vite;
  }
  return null;
}

// Global vite instance
let viteDevServer: any = null;

// --- SAFETY: Technical paths ---
// We move this into startServer too

const PORT = 3000;
const upload = multer({ storage: multer.memoryStorage() });

// Initialize Email Transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

async function sendInvoiceEmail(analysis: any, file: Express.Multer.File, userEmail: string) {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.warn("SMTP credentials missing, skipping email sending.");
    return;
  }

  const mailOptions = {
    from: `"Bloom Assistant" <${process.env.SMTP_USER}>`,
    to: "bloombybotanik@gmail.com",
    subject: `[Activation BloomLab] Nouvelle facture déposée - ${analysis.numero_commande}`,
    text: `Une nouvelle demande d'activation BloomLab a été effectuée.
    
Utilisateur: ${userEmail}
Commande: ${analysis.numero_commande}
Date Facture: ${analysis.date_facture}
Produit détecté: ${analysis.nom_produit}
Montant: ${analysis.montant_total}
Est valide: ${analysis.est_bloomlab}

L'accès premium a été automatiquement activé pour cet utilisateur.`,
    attachments: [
      {
        filename: file.originalname,
        content: file.buffer,
      },
    ],
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Invoice email sent successfully");
  } catch (error) {
    console.error("Failed to send invoice email:", error);
  }
}

// Initialize Firebase Admin (lazy)
let db: Firestore | null = null;
function getDb() {
  if (!db) {
    if (!getApps().length) {
      initializeApp({
        projectId: process.env.FIREBASE_PROJECT_ID || "ai-studio-bloombybotanik",
      });
    }
    db = getFirestore();
  }
  return db;
}

// Initialize Gemini
const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-1.5-flash";
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

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

function registerAppRoutes(app: express.Express) {
  // --- Static Assets: Favicon, Assets, Public (Never serve index.html for these) ---
  app.get('/favicon.ico', (req, res) => {
    const icoPath = path.join(process.cwd(), 'public', 'favicon.ico');
    if (fs.existsSync(icoPath)) {
      res.setHeader('Content-Type', 'image/x-icon');
      res.setHeader('Cache-Control', 'public, max-age=86400, s-maxage=604800');
      return res.sendFile(icoPath);
    }
    res.status(404).end();
  });

  app.use('/assets', express.static(path.join(process.cwd(), 'public', 'assets'), {
    maxAge: '7d',
    immutable: true
  }));

  app.use(express.static(path.join(process.cwd(), 'public'), {
    maxAge: '1d',
    index: false
  }));

  // --- SAFETY: Technical paths (Prioritized) ---
  app.use((req, res, next) => {
    if (
      req.url.startsWith('/@') || 
      req.url.startsWith('/node_modules') || 
      req.url.includes('.tsx') || 
      req.url.includes('.ts') ||
      req.url.includes('vite')
    ) {
      return next();
    }
    next();
  });

  app.use(cors());

  app.use((req, res, next) => {
    if (req.originalUrl === '/api/webhooks/stripe') {
      next();
    } else {
      express.json({ limit: '50mb' })(req, res, next);
    }
  });
  app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// Canonical Host & Protocol Normalization Middleware (301)
app.use((req, res, next) => {
  const host = req.get('host') || '';
  const proto = req.get('x-forwarded-proto') || req.protocol;

  // 1. Host normalization: redirect www.bloombybotanik.com -> bloombybotanik.com
  if (host.startsWith('www.bloombybotanik.com')) {
    return res.redirect(301, `https://bloombybotanik.com${req.originalUrl}`);
  }
  
  // 2. Protocol normalization: redirect http -> https on live domain
  if (host.includes('bloombybotanik.com') && proto === 'http') {
    return res.redirect(301, `https://bloombybotanik.com${req.originalUrl}`);
  }

  next();
});

// --- TRAILING SLASH & SEO MIDDLEWARE ---
app.use((req, res, next) => {
  // 1. Only handle GET requests
  if (req.method !== 'GET') return next();

  const urlPath = req.path;
  const lowercasePath = urlPath.toLowerCase();

  // 2. EXCLUSIONS LIST (High Priority)
  // Skip root
  if (urlPath === '/') return next();

  // Skip technical paths, APIs, and node_modules
  if (
    urlPath.startsWith('/api') || 
    urlPath.startsWith('/webhooks') || 
    urlPath.startsWith('/stripe-webhook') || 
    urlPath.startsWith('/paypal-webhook') ||
    urlPath.startsWith('/@vite') || 
    urlPath.startsWith('/@fs') || 
    urlPath.startsWith('/@id') || 
    urlPath.startsWith('/node_modules') || 
    urlPath.includes('/node_modules/') || 
    lowercasePath.includes('vite') || 
    lowercasePath.includes('hmr') ||
    lowercasePath.includes('.mjs') ||
    lowercasePath.includes('.js') ||
    lowercasePath.includes('.ts')
  ) {
    return next();
  }

  // Skip assets and well-known static files
  if (urlPath.startsWith('/assets/')) return next();
  
  const staticFiles = [
    '/favicon.ico', '/favicon-', '/robots.txt', 
    '/sitemap.xml', '/sitemap-fr.xml', '/sitemap-en.xml', '/sitemap-de.xml',
    '/site.webmanifest', '/manifest.webmanifest', '/apple-touch-icon'
  ];
  if (staticFiles.some(file => lowercasePath.includes(file.toLowerCase()))) {
    return next();
  }

  // 3. ROBUST FILE & NON-HTML DETECTION
  // Skip if the path contains a dot (likely a file with extension)
  // We use a more precise regex to avoid false positives on SEO slugs
  if (/\.[a-z0-9]{2,5}$/i.test(urlPath)) {
    return next();
  }

  // Skip if it's NOT an HTML request (Accept header check)
  const accept = req.get('accept') || '';
  if (accept && !accept.includes('text/html') && !accept.includes('*/*')) {
    return next();
  }

  // 4. LEGACY REDIRECTS (Specific to Bloom by BotaniK)
  // Handle /bibliotheque -> /herbier/ etc.
  const herbariumMatch = urlPath.match(/^\/(bibliotheque|bibliotheque-savoirs)(\/.*)?$/);
  if (herbariumMatch) {
    const subPath = herbariumMatch[2] || '/';
    const newPath = `/herbier${subPath.endsWith('/') ? subPath : subPath + '/'}`;
    const query = req.url.slice(urlPath.length);
    return res.redirect(301, newPath + query);
  }

  // 5. GLOBAL TRAILING SLASH ENFORCEMENT
  if (!urlPath.endsWith('/')) {
    // Only redirect if it looks like a clean SEO slug (no dots, standard chars)
    if (/^\/([a-z0-9_-]+\/)*[a-z0-9_-]+$/i.test(urlPath)) {
      const query = req.url.slice(urlPath.length);
      // Extra safety: double check we aren't redirecting something that should be a file
      if (!urlPath.includes('.')) {
        return res.redirect(301, urlPath + '/' + query);
      }
    }
  }

  next();
});

// Sitemaps & robots.txt explicit delivery
app.get('/sitemap.xml', (req, res) => {
  res.header('Content-Type', 'application/xml');
  res.sendFile(path.join(process.cwd(), 'public', 'sitemap.xml'));
});
app.get('/sitemap-fr.xml', (req, res) => {
  res.header('Content-Type', 'application/xml');
  res.sendFile(path.join(process.cwd(), 'public', 'sitemap-fr.xml'));
});
app.get('/sitemap-en.xml', (req, res) => {
  res.header('Content-Type', 'application/xml');
  res.sendFile(path.join(process.cwd(), 'public', 'sitemap-en.xml'));
});
app.get('/sitemap-de.xml', (req, res) => {
  res.header('Content-Type', 'application/xml');
  res.sendFile(path.join(process.cwd(), 'public', 'sitemap-de.xml'));
});
app.get('/robots.txt', (req, res) => {
  res.header('Content-Type', 'text/plain');
  res.sendFile(path.join(process.cwd(), 'public', 'robots.txt'));
});

// Redirections 301 pour le SEO & correction d'erreurs 404
const redirects301: Record<string, string> = {
  // Erreurs 404 critiques
  '/bloomlab-extracteur-botanique-et-infuseur-dhuile-intelligent-6-en-1': '/bloomlab/',
  '/retours-et-remboursements': '/retour-et-remboursement/',
  '/tisane-bain-marie-bloomlab-quelle-methode-pour-extraire-vraiment-les-bienfaits-de-vos-plantes-spoiler-la-difference-est-de-1-a-98': '/blog/tisane-bain-marie-bloomlab-quelle-methode-pour-extraire-vraiment-les-bienfaits-de-vos-plantes-spoiler-la-difference-est-de-1-a-98/',
  '/chroniques': '/blog/',
  '/infusion-botanique-maison-comment-ca-marche': '/infusion-botanique/',
  
  // URLs d'anciennes versions & alias
  '/indexbis': '/',
  '/about': '/manifeste/',
  '/contact': '/manifeste/',
  '/how-it-works-diy-natural-recipes': '/boutique/',
  '/natural-herbal-infusion-body-care-oils-': '/cosmetiques/',
  '/natural-herbal-infusion-face-skincare-recipes': '/cosmetiques/',
  '/extraction-plantes-naturelles-bienfaits': '/extraction-botanique/',
  '/extraction-botanique-guide-complet': '/extraction-botanique/',
  '/herbier': '/herbier/',
  '/bibliotheque': '/herbier/',
  '/bibliotheque-savoirs': '/herbier/',
  '/boutique/confort-digestif': '/boutique/duo-argiles/',
  '/boutique/feu-actualisateur': '/boutique/purete-sanguine/',
  '/boutique/nutri-profonde': '/boutique/expert-peaux/',
  '/shop': '/boutique/',
  '/products': '/boutique/',
  '/herboristerie': '/herbier/',
  '/phytotherapie': '/phytotherapie-reset/',
  '/abonnement': '/abonnement/',
  
  // Redirections catégories Herbier vers pages de recettes dédiées
  '/herbier/phytotherapie': '/phytotherapie-reset/',
  '/herbier/phytotherapie/': '/phytotherapie-reset/',
  '/herbier/therapeutic': '/phytotherapie-reset/',
  '/herbier/therapeutic/': '/phytotherapie-reset/',
  '/herbier/cosmetique': '/cosmetique-botanique/',
  '/herbier/cosmetique/': '/cosmetique-botanique/',
  '/herbier/cosmetiques': '/cosmetique-botanique/',
  '/herbier/cosmetiques/': '/cosmetique-botanique/',
  '/herbier/culinaire': '/gastronomie-botanique/',
  '/herbier/culinaire/': '/gastronomie-botanique/',
  
  // Unification Herbier -> Bibliothèque (URLs dynamiques)
  '/herbier/chaga_vitality': '/herbier/chaga_vitality/',
  '/herbier/urtica_dioica': '/herbier/urtica_dioica/',
  '/herbier/melissa_officinalis': '/herbier/melissa_officinalis/',
  '/herbier/curcuma_longa_poivre': '/herbier/curcuma_longa_poivre/',
  '/herbier/zingiber_officinale': '/herbier/zingiber_officinale/',
  '/herbier/rosmarinus_officinalis': '/herbier/rosmarinus_officinalis/',
  '/herbier/lavandula_angustifolia': '/herbier/lavandula_angustifolia/',
  '/herbier/artichaut': '/herbier/artichaut/',
  '/bibliotheque/chaga_vitality': '/herbier/chaga_vitality/',
  '/bibliotheque/urtica_dioica': '/herbier/urtica_dioica/',
  '/bibliotheque/melissa_officinalis': '/herbier/melissa_officinalis/',
  '/bibliotheque/curcuma_longa_poivre': '/herbier/curcuma_longa_poivre/',
  '/bibliotheque/zingiber_officinale': '/herbier/zingiber_officinale/',
  '/bibliotheque/rosmarinus_officinalis': '/herbier/rosmarinus_officinalis/',
  '/bibliotheque/lavandula_angustifolia': '/herbier/lavandula_angustifolia/',
  '/bibliotheque/artichaut': '/herbier/artichaut/',
  '/bibliotheque-savoirs/chaga_vitality': '/herbier/chaga_vitality/',
  '/bibliotheque-savoirs/urtica_dioica': '/herbier/urtica_dioica/',
  '/bibliotheque-savoirs/melissa_officinalis': '/herbier/melissa_officinalis/',
  '/bibliotheque-savoirs/curcuma_longa_poivre': '/herbier/curcuma_longa_poivre/',
  '/bibliotheque-savoirs/zingiber_officinale': '/herbier/zingiber_officinale/',
  '/bibliotheque-savoirs/rosmarinus_officinalis': '/herbier/rosmarinus_officinalis/',
  '/bibliotheque-savoirs/lavandula_angustifolia': '/herbier/lavandula_angustifolia/',
  '/bibliotheque-savoirs/artichaut': '/herbier/artichaut/',
};

Object.entries(redirects301).forEach(([from, to]) => {
  app.get(from, (req, res) => res.redirect(301, to));
  // Support multilingual prefix redirects
  app.get(`/en${from}`, (req, res) => res.redirect(301, `/en${to}`));
  app.get(`/de${from}`, (req, res) => res.redirect(301, `/de${to}`));
});

// --- NEWSLETTER AGENT INSTRUCTIONS ---

const NEWSLETTER_PLANNER_INSTRUCTION = `Tu es l'Agent Planificateur Éditorial de Bloom by BotaniK.
Mission : Sélectionner le sujet et l'objectif de la newsletter de la semaine.
Règles :
- BloomLab et les extraits ne sont pas des médicaments.
- Suivre le calendrier saisonnier fourni.
- Alterner pédagogie (40%), usage BloomLab (20%), kits (15%), marque (15%), communauté (10%).
- Un seul CTA principal.
Output : JSON avec theme, editorial_angle, target_segments, primary_goal, cta.`;

const NEWSLETTER_WRITER_INSTRUCTION = `Tu es l'Agent Rédacteur de Bloom by BotaniK.
Mission : Rédiger une newsletter hebdomadaire utile, lisible et premium.
Ton : clair, rigoureux, pédagogique, chaleureux.
Sections requises : sujet, preheader, salutation, leçon principale, conseil pratique, section produit, CTA, note de prudence (SÉCURITÉ), footer.
Règles : Phrases courtes, sous-titres, pas d'allégation médicale.`;

// --- NEWSLETTER API ROUTES ---

app.post("/api/newsletter/subscribe", async (req, res) => {
  try {
    const { email, firstName, source } = req.body;
    if (!email) return res.status(400).json({ error: "Email requis" });

    const firestore = getDb();
    const normalizedEmail = email.toLowerCase().trim();
    
    // Find or create subscriber
    const subQuery = await firestore.collection('subscribers').where('email', '==', normalizedEmail).get();
    let subscriberId;
    
    if (subQuery.empty) {
      const newSub = await firestore.collection('subscribers').add({
        email: normalizedEmail,
        first_name: firstName || '',
        locale: 'fr-FR',
        marketing_consent: false, // Wait for double opt-in
        consent_source: source || 'footer_form',
        email_status: 'active',
        preferences: {
          family_rhythm: false,
          school_calendar_zone: 'non_precise',
          content_context: ['routine_personnelle']
        },
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });
      subscriberId = newSub.id;
    } else {
      subscriberId = subQuery.docs[0].id;
    }

    // Send Double Opt-in Email (Simulation)
    const confirmLink = `https://${req.get('host')}/api/newsletter/confirm?id=${subscriberId}`;
    console.log("Sending confirmation email to:", normalizedEmail, "Link:", confirmLink);
    
    // In real app, use transporter.sendMail(...)
    
    res.json({ success: true, subscriberId, message: "Email de confirmation envoyé" });
  } catch (error: any) {
    console.error("Subscription error:", error);
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/newsletter/confirm", async (req, res) => {
  try {
    const { id } = req.query;
    if (!id) return res.status(400).send("ID manquant");

    const firestore = getDb();
    const subRef = firestore.collection('subscribers').doc(id as string);
    const subDoc = await subRef.get();

    if (!subDoc.exists) return res.status(404).send("Abonné non trouvé");

    await subRef.update({
      marketing_consent: true,
      consent_timestamp: new Date().toISOString(),
      updated_at: new Date().toISOString()
    });

    res.send("<h1>Inscription confirmée !</h1><p>Merci d'avoir rejoint la communauté Bloom. Vous pouvez fermer cette page.</p>");
  } catch (error: any) {
    res.status(500).send("Erreur lors de la confirmation");
  }
});

app.get("/api/newsletter/unsubscribe", async (req, res) => {
  try {
    const { id } = req.query;
    if (!id) return res.status(400).send("ID manquant");

    const firestore = getDb();
    await firestore.collection('subscribers').doc(id as string).update({
      marketing_consent: false,
      email_status: 'unsubscribed',
      updated_at: new Date().toISOString()
    });

    res.send("<h1>Désinscription réussie</h1><p>Vous ne recevrez plus de newsletters de notre part.</p>");
  } catch (error: any) {
    res.status(500).send("Erreur lors de la désinscription");
  }
});

const orchestrator = new NewsletterOrchestrator(process.env.GEMINI_API_KEY!);

// Admin Route to generate newsletter using Multi-Agent Orchestrator
app.post("/api/admin/newsletter/generate", async (req, res) => {
  try {
    const { season, context_data } = req.body;
    
    const sharedMemory = await orchestrator.generateNewsletter({
      season,
      ...context_data
    });
    
    const firestore = getDb();
    const campaign = await firestore.collection('newsletter_campaigns').add({
      theme: sharedMemory.selected_topic.selected_topic,
      subject: sharedMemory.editorial_draft.subject,
      preheader: sharedMemory.editorial_draft.preheader,
      html_content: sharedMemory.html_output.html,
      text_content: sharedMemory.html_output.plain_text,
      status: sharedMemory.quality_report.status === 'pass' ? 'review' : 'draft',
      quality_report: sharedMemory.quality_report,
      target_segments: sharedMemory.selected_topic.target_segments || [],
      created_by: 'agent',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    });

    // Also save the full session for audit
    await firestore.collection('newsletter_generation_sessions').add({
      campaign_id: campaign.id,
      status: 'review',
      shared_memory: sharedMemory,
      risk_level: sharedMemory.quality_report.score < 80 ? 'medium' : 'low',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    });

    res.json({ success: true, campaignId: campaign.id, sharedMemory });
  } catch (error: any) {
    console.error("Newsletter generation error:", error);
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/admin/newsletter/approve", async (req, res) => {
  try {
    const { campaignId } = req.body;
    if (!campaignId) return res.status(400).json({ error: "Campaign ID requis" });

    const firestore = getDb();
    await firestore.collection('newsletter_campaigns').doc(campaignId).update({
      status: 'approved',
      approved_by: 'admin_user', // Simulation
      updated_at: new Date().toISOString()
    });

    res.json({ success: true, message: "Campagne approuvée" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Webhook Simulation for Purchases
app.post("/api/webhooks/purchase", async (req, res) => {
  try {
    const { email, productId, orderId } = req.body;
    if (!email || !productId) return res.status(400).json({ error: "Données manquantes" });

    const firestore = getDb();
    const normalizedEmail = email.toLowerCase().trim();
    
    // Find subscriber
    const subQuery = await firestore.collection('subscribers').where('email', '==', normalizedEmail).get();
    let subscriberId;
    
    if (subQuery.empty) {
      // Create shadow subscriber if not exists (no marketing consent)
      const newSub = await firestore.collection('subscribers').add({
        email: normalizedEmail,
        marketing_consent: false,
        email_status: 'active',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });
      subscriberId = newSub.id;
    } else {
      subscriberId = subQuery.docs[0].id;
    }

    const isBloomLab = productId.includes('bloomlab');
    
    // Update or create customer record
    const custQuery = await firestore.collection('customers').where('subscriber_id', '==', subscriberId).get();
    if (custQuery.empty) {
      await firestore.collection('customers').add({
        subscriber_id: subscriberId,
        bloomlab_purchase_verified: isBloomLab,
        bloomlab_purchase_date: isBloomLab ? new Date().toISOString() : null,
        kit_purchase_verified: !isBloomLab,
        last_purchase_date: new Date().toISOString(),
        purchase_source: 'webhook_simulation',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });
    } else {
      const custRef = custQuery.docs[0].ref;
      const updateData: any = {
        last_purchase_date: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      if (isBloomLab) {
        updateData.bloomlab_purchase_verified = true;
        updateData.bloomlab_purchase_date = new Date().toISOString();
      } else {
        updateData.kit_purchase_verified = true;
      }
      await custRef.update(updateData);
    }

    res.json({ success: true, message: "Achat synchronisé" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// --- CRM & AUTOMATION UTILS ---

async function notifyOrderToBrevo(orderData: { email: string, customerName: string, items: any[], total: number }) {
  const BREVO_API_KEY = process.env.BREVO_API_KEY;
  if (!BREVO_API_KEY) {
    console.warn("[CRM] BREVO_API_KEY manquante, saut de la notification d'événement.");
    return;
  }

  const url = "https://api.brevo.com/v3/event";
  
  // On prend le premier produit pour le lien d'avis (simplification)
  const mainProduct = orderData.items[0]?.name || "Produit Bloom";
  const reviewUrl = `https://bloombybotanik.com/boutique`; // URL générique vers la boutique/avis

  const payload = {
    "event": "order_completed",
    "email": orderData.email,
    "properties": {
      "FIRSTNAME": orderData.customerName.split(' ')[0],
      "PRODUCT_NAME": mainProduct,
      "REVIEW_URL": reviewUrl,
      "ORDER_TOTAL": orderData.total
    }
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': BREVO_API_KEY,
        'content-type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    
    if (response.ok) {
      console.log(`[CRM] Commande synchronisée pour automation : ${orderData.email}`);
    } else {
      const errorText = await response.text();
      console.error(`[CRM] Erreur Brevo Event API (${response.status}):`, errorText);
    }
  } catch (error) {
    console.error("[CRM] Erreur synchronisation Brevo:", error);
  }
}

// --- PAYMENT UTILS ---

async function handleSuccessfulPayment(orderData: any, orderId: string) {
  const firestore = getDb();
  
  // 1. Update Order Status
  await firestore.collection('orders').doc(orderId).update({
    status: 'paid',
    updatedAt: new Date().toISOString()
  });

  // 2. Update User for Premium Access
  const userRef = firestore.collection('users').doc(orderData.userId);
  const premiumUntil = new Date();
  premiumUntil.setMonth(premiumUntil.getMonth() + 1);

  await userRef.set({
    status: 'premium',
    isPremiumUntil: premiumUntil.toISOString(),
    updatedAt: new Date().toISOString()
  }, { merge: true });

  // 3. Generate PDF Invoice
  const pdfBuffer = await generateInvoicePDF(orderData, orderId);

  // 4. Send Emails
  // To Buyer
  await transporter.sendMail({
    from: `"Bloom by BotaniK" <${process.env.SMTP_USER}>`,
    to: orderData.email,
    subject: `Confirmation de votre commande ${orderId} - Bloom by BotaniK`,
    text: `Bonjour,

Merci pour votre confiance ! Votre commande ${orderId} est bien validée.

Vous trouverez votre facture en pièce jointe.

CADEAU : Votre accès Premium d'un mois a été activé ! Vous pouvez désormais accéder librement à nos 3 bibliothèques (Atelier Culinaire, Soin Cosmétique, Reset Homéostasique) directement depuis votre compte.

L'équipe Bloom`,
    attachments: [{
      filename: `Facture-${orderId}.pdf`,
      content: pdfBuffer
    }]
  });

  // 5. Notify Brevo for CRM Automation (Reviews after 21 days)
  await notifyOrderToBrevo(orderData);

  // 6. To Admin
  await transporter.sendMail({
    from: `"Système de Commande" <${process.env.SMTP_USER}>`,
    to: "bloombybotanik@gmail.com",
    subject: `URGENT - NOUVELLE COMMANDE ${orderId}`,
    text: `Une nouvelle commande vient d'être passée sur le site.

Récapitulatif :
Client : ${orderData.customerName} (${orderData.email})
ID Commande : ${orderId}
Montant Total : ${orderData.total.toFixed(2)} €
Livraison : ${orderData.shippingMethod}
Adresse : ${orderData.address}

Items :
${orderData.items.map((i: any) => `- ${i.name} x${i.quantity}`).join('\n')}

Action requise : Préparer l'expédition.`,
    attachments: [{
      filename: `Facture-${orderId}.pdf`,
      content: pdfBuffer
    }]
  });
}

// --- CHECKOUT API ---

const PRODUCT_PRICES: Record<string, number> = {
  'bloomlab': 239.00, // Promo price
  'bundle-apothicaire': 59.00,
  'pack-signature': 289.00,
  'kit-starter': 12.90,
  'kit-nuit': 9.90,
  'kit-digestion': 9.90,
  'kit-articulaire': 9.90,
  'kit-hiver': 9.90,
  'kit-reset': 44.90,
  'premium-access': 9.00,
  'freemium-access': 0.00
};

const getShippingPrice = (method: string, cart: any[]): number => {
  const hasBloomLab = cart.some(item => item.id === 'bloomlab');
  const sachetCount = cart
    .filter(item => !item.isDigital && item.id !== 'bloomlab')
    .reduce((sum, item) => sum + (item.quantity || 1), 0);

  if (hasBloomLab) {
    switch (method) {
      case 'mondialrelay': return 7.90;
      case 'colissimo': return 12.90;
      case 'laposte': return 5.90;
      case 'express': return 21.90;
      default: return 7.90;
    }
  }

  switch (method) {
    case 'mondialrelay': return sachetCount >= 3 ? 0 : 3.90;
    case 'colissimo': return sachetCount >= 3 ? 0 : 4.90;
    case 'laposte': return 5.90;
    case 'express': return 21.90;
    default: return 3.90;
  }
};

async function generateInvoicePDF(order: any, orderId: string) {
  const doc = new jsPDF();
  
  // Header
  doc.setFontSize(22);
  doc.setTextColor(27, 48, 34); // Botanik Green
  doc.text("Bloom by BotaniK", 20, 20);
  
  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text("L'Ingénierie au service du vivant", 20, 27);
  
  doc.setFontSize(14);
  doc.setTextColor(0);
  doc.text(`FACTURE: ${orderId}`, 140, 20);
  doc.text(`Date: ${new Date().toLocaleDateString('fr-FR')}`, 140, 30);
  
  // Addresses
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Vendu par:", 20, 45);
  doc.setFont("helvetica", "normal");
  doc.text("BotaniK Labs", 20, 52);
  doc.text("France", 20, 59);
  
  doc.setFont("helvetica", "bold");
  doc.text("Facturé à:", 120, 45);
  doc.setFont("helvetica", "normal");
  doc.text(order.customerName || "Client Bloom", 120, 52);
  doc.text(order.email, 120, 59);
  doc.text(order.address || "", 120, 66);
  
  // Items Table
  let y = 85;
  doc.setFont("helvetica", "bold");
  doc.text("Produit", 20, y);
  doc.text("Qté", 120, y);
  doc.text("Prix Unit.", 140, y);
  doc.text("Total", 170, y);
  
  doc.line(20, y + 2, 190, y + 2);
  y += 10;
  
  doc.setFont("helvetica", "normal");
  order.items.forEach((item: any) => {
    doc.text(item.name, 20, y);
    doc.text(item.quantity.toString(), 120, y);
    doc.text(`${item.price.toFixed(2)} €`, 140, y);
    doc.text(`${(item.price * item.quantity).toFixed(2)} €`, 170, y);
    y += 8;
  });
  
  y += 5;
  doc.line(120, y, 190, y);
  y += 10;
  
  doc.text("Sous-total:", 120, y);
  doc.text(`${(order.total - order.shippingPrice).toFixed(2)} €`, 170, y);
  
  y += 8;
  doc.text("Livraison:", 120, y);
  doc.text(`${order.shippingPrice.toFixed(2)} €`, 170, y);
  
  y += 10;
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("TOTAL:", 120, y);
  doc.text(`${order.total.toFixed(2)} €`, 170, y);
  
  // Footer
  doc.setFontSize(10);
  doc.setFont("helvetica", "italic");
  doc.text("Merci pour votre confiance. Faites fleurir votre bien-être.", 20, 270);
  doc.text("Facture acquittée - Paiement sécurisé via Stripe", 20, 277);
  
  return Buffer.from(doc.output('arraybuffer'));
}

app.post("/api/checkout/create-payment-intent", async (req, res) => {
  try {
    const { cart, shippingMethod, formData, userId, userEmail } = req.body;
    
    if (!cart || !userId || !userEmail) {
      return res.status(400).json({ error: "Données de commande incomplètes" });
    }

    // 1. Strict Validation
    let subtotal = 0;
    const validatedItems = cart.map((item: any) => {
      const officialPrice = PRODUCT_PRICES[item.id] || item.price;
      subtotal += officialPrice * item.quantity;
      return {
        id: item.id,
        name: item.name,
        price: officialPrice,
        quantity: item.quantity
      };
    });

    const shippingPrice = getShippingPrice(shippingMethod, validatedItems);
    const total = subtotal + shippingPrice;

    // 2. Persist to Firestore (pending)
    const firestore = getDb();
    const orderId = `BLM-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    const orderData = {
      userId,
      email: userEmail,
      customerName: `${formData.firstName} ${formData.lastName}`,
      address: `${formData.address}, ${formData.zipCode} ${formData.city}, ${formData.country}`,
      items: validatedItems,
      shippingMethod,
      shippingPrice,
      total,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    await firestore.collection('orders').doc(orderId).set(orderData);

    // 3. Create Stripe Payment Intent
    const stripeClient = getStripe();
    const paymentIntent = await stripeClient.paymentIntents.create({
      amount: Math.round(total * 100),
      currency: 'eur',
      metadata: { orderId, userId },
      receipt_email: userEmail,
    });

    res.json({ 
      clientSecret: paymentIntent.client_secret,
      orderId,
      total 
    });

  } catch (error: any) {
    console.error("Stripe Checkout error:", error);
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/webhooks/stripe", express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    const stripeClient = getStripe();
    event = stripeClient.webhooks.constructEvent(
      req.body,
      sig!,
      process.env.STRIPE_WEBHOOK_SECRET || ""
    );
  } catch (err: any) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object as Stripe.PaymentIntent;
    const { orderId } = paymentIntent.metadata;

    if (orderId) {
      const firestore = getDb();
      const orderDoc = await firestore.collection('orders').doc(orderId).get();
      if (orderDoc.exists) {
        await handleSuccessfulPayment(orderDoc.data(), orderId);
      }
    }
  }

  res.json({ received: true });
});

app.post("/api/checkout/paypal/create-order", async (req, res) => {
  try {
    const { cart, shippingMethod, formData, userId, userEmail } = req.body;
    
    let subtotal = 0;
    const validatedItems = cart.map((item: any) => {
      const officialPrice = PRODUCT_PRICES[item.id] || item.price;
      subtotal += officialPrice * item.quantity;
      return {
        id: item.id,
        name: item.name,
        price: officialPrice,
        quantity: item.quantity
      };
    });
    const shippingPrice = getShippingPrice(shippingMethod, validatedItems);
    const total = subtotal + shippingPrice;

    const firestore = getDb();
    const orderId = `BLM-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    const orderData = {
      userId,
      email: userEmail,
      customerName: `${formData.firstName} ${formData.lastName}`,
      address: `${formData.address}, ${formData.zipCode} ${formData.city}, ${formData.country}`,
      items: validatedItems,
      shippingMethod,
      shippingPrice,
      total,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    await firestore.collection('orders').doc(orderId).set(orderData);

    res.json({ orderId, total });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/checkout/paypal/capture", async (req, res) => {
  try {
    const { orderId } = req.body;
    const firestore = getDb();
    const orderDoc = await firestore.collection('orders').doc(orderId).get();
    if (orderDoc.exists) {
      await handleSuccessfulPayment(orderDoc.data(), orderId);
    }
    res.json({ success: true });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Middleware pour servir index.html sur toutes les routes non-API (SPA Fallback)
// Placé AVANT le démarrage de Vite en prod, mais APRES les routes API
app.post("/api/chat", async (req: express.Request, res: express.Response) => {
  try {
    const { message, history, userId, anonymousSessionId, language, pageUrl } = req.body;
    
    console.log("Chat request received:", { message: message?.substring(0, 50), userId, anonymousSessionId, language });

    if (!process.env.GEMINI_API_KEY) {
      console.error("GEMINI_API_KEY is missing");
      return res.status(500).json({ error: "Configuration API Key manquante" });
    }

    if (!message) {
      return res.status(400).json({ error: "Missing message" });
    }

    const contents = [
      ...(history || []).map((h: any) => ({
        role: h.role === 'user' ? 'user' : 'model',
        parts: [{ text: h.text }]
      })),
      { role: 'user', parts: [{ text: message }] }
    ];

    console.log("Calling Gemini with model:", GEMINI_MODEL);

    const result = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents,
      config: {
        systemInstruction: BOT_SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
      }
    });

    console.log("Gemini response status:", result ? "received" : "empty");

    const responseText = result.text || '{}';
    let data;
    try {
      data = JSON.parse(responseText);
    } catch (e) {
      console.error("Failed to parse Gemini response as JSON:", responseText);
      // Fallback for non-json response if model fails to follow instructions
      data = { answer: responseText, concern: {} };
    }

    // Save logging to Firestore
    try {
      const firestore = getDb();
      await firestore.collection('customer_concerns').add({
        ...(data.concern || {}),
        userId: userId || null,
        anonymousSessionId: anonymousSessionId || null,
        userQuestion: message,
        answerSummary: data.answer ? data.answer.substring(0, 500) : '',
        language: language || 'fr',
        pageUrl: pageUrl || '',
        createdAt: new Date().toISOString()
      });
      console.log("Concern logged to Firestore");
    } catch (e) {
      console.error("Failed to save concern to Firestore", e);
    }

    res.json({ text: data.answer || "Désolé, je rencontre une difficulté technique.", concern: data.concern });

  } catch (error: any) {
    console.error("Chat error:", error);
    res.status(500).json({ error: "Une erreur est survenue lors de la communication avec Alma." });
  }
});

// Activation endpoint
app.post("/api/activate-bloomlab", upload.single('invoice'), async (req: express.Request, res: express.Response) => {
  try {
    const { userId } = req.body;
    const file = req.file;

    if (!userId || !file) {
      return res.status(400).json({ error: "Missing userId or invoice file" });
    }

    // Call Gemini for vision analysis
    const imagePart = {
      inlineData: {
        mimeType: file.mimetype,
        data: file.buffer.toString('base64'),
      },
    };

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
      config: {
        responseMimeType: "application/json",
      }
    });

    const responseText = result.text || '{}';
    const analysis = JSON.parse(responseText);

    if (analysis.est_bloomlab && !analysis.offre_expiree) {
      // Update User in Firestore
      const firestore = getDb();
      const userRef = firestore.collection('users').doc(userId);
      
      const userDoc = await userRef.get();
      if (!userDoc.exists) {
        return res.status(404).json({ error: "Utilisateur non trouvé dans la base de données." });
      }

      const isPremiumUntil = new Date();
      isPremiumUntil.setMonth(isPremiumUntil.getMonth() + 1);

      await userRef.update({
        status: 'premium',
        isPremiumUntil: isPremiumUntil.toISOString(),
        machineOwned: true,
        updatedAt: new Date().toISOString(),
      });

      // Send Email Notification
      const userEmail = userDoc.data()?.email || userId;
      await sendInvoiceEmail(analysis, file, userEmail);

      // Log interaction
      await firestore.collection('interactions').add({
        userId,
        type: 'activation_bloomlab',
        metadata: analysis,
        createdAt: new Date().toISOString(),
      });

      return res.json({ success: true, analysis });
    } else {
      let message = "La facture ne correspond pas à une BloomLab valide.";
      if (analysis.offre_expiree) {
        message = "Cette offre a expiré (achat de plus de 30 jours).";
      }
      return res.status(400).json({ success: false, message, analysis });
    }

  } catch (error: any) {
    console.error("Activation error:", error);
    res.status(500).json({ error: error.message });
  }
});
}

async function startServer() {
  // 1. Health check
  app.get('/api/health', (req, res) => res.json({ status: 'ok', timestamp: new Date().toISOString() }));

  // 2. Register All App Routes, Static Assets & SEO 301 Middlewares
  registerAppRoutes(app);

  // 3. Vite Setup (DEV ONLY)
  if (process.env.NODE_ENV !== "production") {
    viteDevServer = await setupVite(app);
    app.use(viteDevServer.middlewares);
    console.log("Vite middleware attached in dev");
  }

  // 4. Production specific logic
  if (process.env.NODE_ENV === "production") {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath, { index: false }));

    app.get("*", async (req, res) => {
      try {
        // Skip API and files
        if (req.path.startsWith('/api') || /\.[a-z0-9]{2,5}$/i.test(req.path)) {
          return res.status(404).send("Not found");
        }

        const indexPath = path.join(distPath, "index.html");
        if (fs.existsSync(indexPath)) {
          res.send(fs.readFileSync(indexPath, "utf-8"));
        } else {
          res.status(404).send("Index not found");
        }
      } catch (err) {
        res.status(500).send("Internal Server Error");
      }
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server listening on http://0.0.0.0:${PORT} (${process.env.NODE_ENV || 'development'})`);
  });
}

startServer().catch(err => {
  console.error("Critical server startup error:", err);
  process.exit(1);
});

