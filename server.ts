import express from "express";
import path from "path";
import fs from "fs";
import cors from "cors";
import multer from "multer";
import nodemailer from "nodemailer";
import { GoogleGenAI } from "@google/genai";
import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore, Firestore } from "firebase-admin/firestore";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

dotenv.config();

const app = express();
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
Ta mission : accueillir l’utilisateur, conduire une anamnèse conversationnelle, identifier son profil systémique dominant, puis présenter l’offre Bloom la plus adaptée.

PHRASE FONDATRICE : "L'Ingénierie au service du vivant."

RÈGLES D'OR :
1. Tu ne poses JAMAIS plusieurs questions à la fois. UNE seule question, tu attends la réponse avant de poursuivre.
2. Tu valides d’abord le vécu de la personne en une phrase courte et empathique, puis tu expliques ou poses la question suivante.
3. Ton ton est bienveillant, clair, rassurant, structuré, non médical, non prescriptif.
4. Tu ne promets jamais de guérison. Tu n'invites jamais à arrêter un traitement médical.
5. Vocabulaire à privilégier : reset homéostatique, dimension, terrain, chef d’orchestre, pharmacie intérieure, libérer.
6. Vocabulaire interdit : guérir, soigner, traiter une maladie, remplacer un médecin.

DÉROULÉ :
- Accueil et Questionnaire (15 questions max, une par une).
- Analyse du profil.
- Présentation des offres dans cet ordre : 1. Bloom Lab, 2. Bloom Complet, 3. Essentiel.
- Recommandation finale orientée vers Bloom Complet (59€/mois).

SCHEMA DE RÉPONSE JSON :
Tu dois impérativement répondre au format JSON :
{
  "answer": "Ta réponse visible par l'utilisateur (incluant ta validation, ton explication et ta question unique)",
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

app.use(cors());
app.use(express.json({ limit: '10mb' }));

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
  '/bloomlab-extracteur-botanique-et-infuseur-dhuile-intelligent-6-en-1': '/bloomlab',
  '/retours-et-remboursements': '/retour-et-remboursement',
  '/tisane-bain-marie-bloomlab-quelle-methode-pour-extraire-vraiment-les-bienfaits-de-vos-plantes-spoiler-la-difference-est-de-1-a-98': '/blog?post=tisane-bain-marie-bloomlab-quelle-methode-pour-extraire-vraiment-les-bienfaits-de-vos-plantes-spoiler-la-difference-est-de-1-a-98',
  '/chroniques': '/blog',
  '/infusion-botanique-maison-comment-ca-marche': '/infusion-botanique#comprendre-infusion-botanique',
  
  // URLs d'anciennes versions & alias
  '/indexbis': '/',
  '/about': '/manifeste',
  '/contact': '/manifeste',
  '/how-it-works-diy-natural-recipes': '/boutique',
  '/natural-herbal-infusion-body-care-oils-': '/cosmetiques',
  '/natural-herbal-infusion-face-skincare-recipes': '/cosmetiques',
  '/extraction-plantes-naturelles-bienfaits': '/extraction-botanique',
  '/extraction-botanique-guide-complet': '/extraction-botanique',
  '/herbier': '/bibliotheque-savoirs',
  '/herbier/': '/bibliotheque-savoirs',
  '/bibliotheque': '/bibliotheque-savoirs',
  '/boutique/confort-digestif': '/boutique/duo-argiles',
  '/boutique/feu-actualisateur': '/boutique/purete-sanguine',
  '/boutique/nutri-profonde': '/boutique/expert-peaux',
  '/shop': '/boutique',
  '/products': '/boutique',
  '/herboristerie': '/bibliotheque-savoirs',
  '/phytotherapie': '/phytotherapie-reset',
  
  // Unification Herbier -> Bibliothèque (URLs dynamiques)
  '/herbier/chaga_vitality': '/bibliotheque-savoirs/chaga_vitality',
  '/herbier/urtica_dioica': '/bibliotheque-savoirs/urtica_dioica',
  '/herbier/melissa_officinalis': '/bibliotheque-savoirs/melissa_officinalis',
  '/herbier/curcuma_longa_poivre': '/bibliotheque-savoirs/curcuma_longa_poivre',
  '/herbier/zingiber_officinale': '/bibliotheque-savoirs/zingiber_officinale',
  '/herbier/rosmarinus_officinalis': '/bibliotheque-savoirs/rosmarinus_officinalis',
  '/herbier/lavandula_angustifolia': '/bibliotheque-savoirs/lavandula_angustifolia',
  '/herbier/artichaut': '/bibliotheque-savoirs/artichaut',
  '/bibliotheque/chaga_vitality': '/bibliotheque-savoirs/chaga_vitality',
  '/bibliotheque/urtica_dioica': '/bibliotheque-savoirs/urtica_dioica',
  '/bibliotheque/melissa_officinalis': '/bibliotheque-savoirs/melissa_officinalis',
  '/bibliotheque/curcuma_longa_poivre': '/bibliotheque-savoirs/curcuma_longa_poivre',
  '/bibliotheque/zingiber_officinale': '/bibliotheque-savoirs/zingiber_officinale',
  '/bibliotheque/rosmarinus_officinalis': '/bibliotheque-savoirs/rosmarinus_officinalis',
  '/bibliotheque/lavandula_angustifolia': '/bibliotheque-savoirs/lavandula_angustifolia',
  '/bibliotheque/artichaut': '/bibliotheque-savoirs/artichaut',
  
  // Doublons WordPress Blog (suffixes -2, -3, -4)
  '/autonomie-botanique-pourquoi-une-maison-qui-utilise-des-plantes-a-besoin-dun-vrai-outil-dextraction-2': '/blog?post=autonomie-botanique-pourquoi-une-maison-qui-utilise-des-plantes-a-besoin-dun-vrai-outil-dextraction',
  '/autonomie-botanique-pourquoi-une-maison-qui-utilise-des-plantes-a-besoin-dun-vrai-outil-dextraction-3': '/blog?post=autonomie-botanique-pourquoi-une-maison-qui-utilise-des-plantes-a-besoin-dun-vrai-outil-dextraction',
  '/autonomie-botanique-pourquoi-une-maison-qui-utilise-des-plantes-a-besoin-dun-vrai-outil-dextraction-4': '/blog?post=autonomie-botanique-pourquoi-une-maison-qui-utilise-des-plantes-a-besoin-dun-vrai-outil-dextraction',
  '/melisse-la-difference-entre-une-infusion-du-soir-et-une-extraction-pensee-pour-le-systeme-nerveux-3': '/blog?post=melisse-la-difference-entre-une-infusion-du-soir-et-une-extraction-pensee-pour-le-systeme-nerveux',
  '/melisse-la-difference-entre-une-infusion-du-soir-et-une-extraction-pensee-pour-le-systeme-nerveux-5': '/blog?post=melisse-la-difference-entre-une-infusion-du-soir-et-une-extraction-pensee-pour-le-systeme-nerveux',
  '/melisse-la-difference-entre-une-infusion-du-soir-et-une-extraction-pensee-pour-le-systeme-nerveux-6': '/blog?post=melisse-la-difference-entre-une-infusion-du-soir-et-une-extraction-pensee-pour-le-systeme-nerveux',
  
  // Articles Blog additionnels (Doublons/Séquences)
  '/chardon-marie-la-silymarine-pourquoi-la-tisane-ne-peut-pas-la-liberer-correctement-6': '/blog?post=chardon-marie-la-silymarine-pourquoi-la-tisane-ne-peut-pas-la-liberer-correctement',
  '/lavande-pourquoi-lhuile-essentielle-et-lhuile-infusee-ne-font-pas-le-meme-travail-2': '/blog?post=lavande-pourquoi-lhuile-essentielle-et-lhuile-infusee-ne-font-pas-le-meme-travail',
  '/lavande-pourquoi-lhuile-essentielle-et-lhuile-infusee-ne-font-pas-le-meme-travail-3': '/blog?post=lavande-pourquoi-lhuile-essentielle-et-lhuile-infusee-ne-font-pas-le-meme-travail',
  '/gingembre-le-bain-marie-ancestral-avait-raison-sur-le-principe-muts-pas-sur-la-precision-3': '/blog?post=gingembre-le-bain-marie-ancestral-avait-raison-sur-le-principe-mais-pas-sur-la-precision',
  '/gingembre-le-bain-marie-ancestral-avait-raison-sur-le-principe-mais-pas-sur-la-precision-5': '/blog?post=gingembre-le-bain-marie-ancestral-avait-raison-sur-le-principe-mais-pas-sur-la-precision',
  
  // Boutique Redundancy
  '/boutique/bloomlab': '/bloomlab',
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

import { NewsletterOrchestrator } from "./server/newsletter-orchestrator";

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

// Vite middleware
async function setupVite() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath, { index: false })); // Don't serve index.html automatically

    app.get('*', async (req, res) => {
      const urlPath = req.path;
      const langMatch = urlPath.match(/^\/(en|de)(\/|$)/);
      const lang = (langMatch ? langMatch[1] : 'fr') as 'fr' | 'en' | 'de';
      const restPath = langMatch ? urlPath.replace(/^\/(en|de)/, '') || '/' : urlPath;

      let indexPath = path.join(distPath, 'index.html');
      let html = fs.readFileSync(indexPath, 'utf8');

      // 1. Dynamic Hreflang Injection
      const baseUrl = 'https://bloombybotanik.com';
      const cleanPath = restPath === '/' ? '' : restPath;
      const hreflangs = `
    <link rel="canonical" href="${baseUrl}${lang === 'fr' ? '' : '/' + lang}${cleanPath}" />
    <link rel="alternate" hreflang="fr" href="${baseUrl}${cleanPath}" />
    <link rel="alternate" hreflang="en" href="${baseUrl}/en${cleanPath}" />
    <link rel="alternate" hreflang="de" href="${baseUrl}/de${cleanPath}" />
    <link rel="alternate" hreflang="x-default" href="${baseUrl}${cleanPath}" />`;
      
      // Remove existing canonical and hreflang to avoid duplicates
      html = html.replace(/<link rel="canonical".*?\/>/g, '');
      html = html.replace(/<link rel="alternate" hreflang=".*?".*?\/>/g, '');
      html = html.replace('</head>', `${hreflangs}\n</head>`);

      // 2. Localized Metadata (Basic logic for main pages)
      const seoData: any = {
        fr: {
          '/': { 
            title: 'Extracteur Botanique & Infuseur de Précision | BloomLab', 
            desc: 'Découvrez BloomLab®, l\'extracteur botanique de précision et infuseur de plantes pour la phytothérapie maison. Maîtrisez l\'extraction du totum végétal à basse température pour soigner le terrain biologique.' 
          },
          '/bloomlab': { 
            title: 'BloomLab® | L\'Extracteur Botanique de Précision N°1 en France', 
            desc: 'La machine pour extraction de plantes de référence. Appareil de phytothérapie maison pour réaliser vos propres remèdes naturels et extractions du totum à basse température.' 
          },
          '/phytotherapie-reset': { 
            title: 'Reset Homéostasique | Le voyage de phytothérapie de 90 jours', 
            desc: 'Accompagnez vos fonctions naturelles, soignez le terrain biologique et installez un reset homéostasique durable avec le protocole expert Bloom.' 
          },
          '/boutique': { 
            title: 'Boutique BloomLab | Machine pour extraction de plantes & Kits', 
            desc: 'Trouvez votre appareil de phytothérapie maison BloomLab, nos kits de plantes médicinales et ressources pour votre souveraineté sanitaire.' 
          },
          '/manifeste': { 
            title: 'Notre Manifeste | Souveraineté Sanitaire & Médecine des Systèmes', 
            desc: 'Découvrez l\'ADN de Bloom : l\'alliance de l\'ingénierie et de la médecine des systèmes pour une souveraineté sanitaire retrouvée.' 
          },
          '/extraction-botanique': { 
            title: 'Guide de l\'Extraction Botanique | Extraction du Totum Végétal', 
            desc: 'Apprenez les secrets de l\'extraction botanique de précision : basse température, biodisponibilité optimale et préservation du totum.' 
          }
        },
        en: {
          '/': { title: 'Precision Botanical Extractor & Infuser | BloomLab', desc: 'Discover BloomLab®, the precision botanical extractor and infuser. Master the extraction of the plant totum at low temperature for home phytotherapy.' },
          '/bloomlab': { title: 'BloomLab® | The #1 Precision Botanical Extractor in France', desc: 'The reference machine for plant extraction. Home phytotherapy device for creating your own natural remedies and low-temperature totum extractions.' },
          '/phytotherapie-reset': { title: 'Homeostatic Reset | The 90-day Botanical Journey', desc: 'Support your natural functions, care for the biological terrain, and establish a sustainable homeostatic reset with the Bloom protocol.' },
          '/boutique': { title: 'Bloom Store | Plant Extraction Machine & Kits', desc: 'Find your BloomLab home phytotherapy device, our medicinal plant kits, and resources for your health sovereignty.' },
          '/manifeste': { title: 'Our Manifesto | Health Sovereignty & Systems Medicine', desc: 'Discover the DNA of Bloom: the alliance of engineering and systems medicine for regained health sovereignty.' },
          '/extraction-botanique': { title: 'Botanical Extraction Guide | Plant Totum Extraction', desc: 'Learn the secrets of precision botanical extraction: low temperature, optimal bioavailability, and totum preservation.' }
        },
        de: {
          '/': { title: 'Botanischer Präzisions-Extraktor & Infuser | BloomLab', desc: 'Entdecken Sie BloomLab®, den Präzisions-Extraktor. Meistern Sie die Extraktion des pflanzlichen Totums bei niedriger Temperatur für die Phytotherapie zu Hause.' },
          '/bloomlab': { title: 'BloomLab® | Der Präzisions-Extraktor Nr. 1 in Frankreich', desc: 'Die Referenzmaschine für die Pflanzenextraktion. Phytotherapie-Gerät für zu Hause zur Erstellung eigener natürlicher Heilmittel.' },
          '/phytotherapie-reset': { title: 'Homöostatischer Reset | Die botanische 90-Tage-Reise', desc: 'Unterstützen Sie Ihre natürlichen Funktionen, pflegen Sie das biologische Terrain und etablieren Sie einen nachhaltigen homöostatischen Reset.' },
          '/boutique': { title: 'Bloom Shop | Pflanzenextraktionsmaschine & Kits', desc: 'Finden Sie Ihr BloomLab-Phytotherapie-Gerät für zu Hause, unsere Heilpflanzen-Kits und Ressourcen für Ihre Gesundheitsautonomie.' },
          '/manifeste': { title: 'Unser Manifest | Gesundheits-Souveränität & Systemmedizin', desc: 'Entdecken Sie die DNA von Bloom: die Allianz von Engineering und Systemmedizin für wiedergewonnene Gesundheitsautonomie.' },
          '/extraction-botanique': { title: 'Leitfaden zur botanischen Extraktion | Totum-Technologie', desc: 'Lernen Sie die Geheimnisse der botanischen Präzisionsextraktion: Niedertemperatur, optimale Bioverfügbarkeit und Totum-Erhalt.' }
        }
      };

      const pageSeo = seoData[lang]?.[restPath] || seoData[lang]?.['/'];
      if (pageSeo) {
        html = html.replace(/<title>.*?<\/title>/, `<title>${pageSeo.title}</title>`);
        html = html.replace(/<meta name="description" content=".*?" \/>/, `<meta name="description" content="${pageSeo.desc}" />`);
        html = html.replace(/<html lang=".*?"/, `<html lang="${lang}"`);
      }

      // 2.5 Structured Data (JSON-LD)
      const schemas: any[] = [
        {
          "@context": "https://schema.org",
          "@type": "HealthAndBeautyBusiness",
          "name": "Bloom by BotaniK",
          "description": "Expertise en médecine des systèmes, reset homéostasique et souveraineté sanitaire par l'extraction botanique de précision.",
          "url": baseUrl,
          "logo": `${baseUrl}/brand/logo-org.jpg`,
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "FR"
          }
        }
      ];

      if (restPath === '/bloomlab' || restPath === '/') {
        schemas.push({
          "@context": "https://schema.org",
          "@type": "Product",
          "name": "BloomLab®",
          "description": "L'extracteur botanique de précision et infuseur botanique de référence. Permet l'extraction du totum végétal à basse température (extraction basse température) pour une biodisponibilité optimale et une souveraineté sanitaire retrouvée.",
          "brand": {
            "@type": "Brand",
            "name": "Bloom by BotaniK"
          },
          "image": `${baseUrl}/assets/bloomlab_main_1784887530345.png`,
          "offers": {
            "@type": "Offer",
            "url": `${baseUrl}/bloomlab`,
            "priceCurrency": "EUR",
            "price": "239.00",
            "availability": "https://schema.org/InStock"
          }
        });
      }

      const schemaHtml = schemas.map(s => `<script type="application/ld+json">${JSON.stringify(s)}</script>`).join('\n');
      html = html.replace('</head>', `${schemaHtml}\n</head>`);

      // 3. Localized Noscript Content (Structural injection)
      const noscriptContent: any = {
        fr: `<h1>Bloom by BotaniK | Infuseur & Extracteur Botanique de Précision</h1><p>Expertise en infusion et extraction botanique de précision. BloomLab® vous offre toutes les clés pour réaliser vos propres remèdes naturels.</p>`,
        en: `<h1>Bloom by BotaniK | Precision Botanical Infuser & Extractor</h1><p>Expertise in precision botanical infusion and extraction. BloomLab® gives you all the keys to create your own natural remedies.</p>`,
        de: `<h1>Bloom by BotaniK | Präzisions-Botanischer Infuser & Extrahierer</h1><p>Expertise in präziser botanischer Infusion und Extraktion. BloomLab® bietet Ihnen alle Schlüssel zur Erstellung Ihrer eigenen natürlichen Heilmittel.</p>`
      };

      if (noscriptContent[lang]) {
        html = html.replace(/<noscript>[\s\S]*?<\/noscript>/, `<noscript><div style="padding: 20px; font-family: sans-serif; line-height: 1.6;">${noscriptContent[lang]}</div></noscript>`);
      }

      // SSR-Lite: Inject metadata for Blog Posts (Keep existing logic but localized)
      if (restPath.startsWith('/blog/')) {
        const slug = restPath.replace('/blog/', '').split('/')[0];
        try {
          const blogPostsModule = await import('./src/data/blogPosts');
          const post = blogPostsModule.blogPosts.find((p: any) => p.slug === slug);
          
          if (post) {
            const title = `${post.title[lang]} | Journal Bloom`;
            const desc = post.excerpt[lang];
            const ogImage = post.image ? `https://bloombybotanik.com${post.image}` : "https://bloombybotanik.com/brand/social-logo.jpg";
            
            html = html.replace(/<title>.*?<\/title>/, `<title>${title}</title>`);
            html = html.replace(/<meta name="description" content=".*?" \/>/, `<meta name="description" content="${desc}" />`);
            
            const ogTags = `<meta property="og:title" content="${title}" />\n<meta property="og:description" content="${desc}" />\n<meta property="og:image" content="${ogImage}" />\n<meta property="og:url" content="https://bloombybotanik.com${urlPath}" />\n<meta property="og:type" content="article" />`;
            html = html.replace('</head>', `${ogTags}\n</head>`);
          }
        } catch (e) {
          console.error("SSR-lite error:", e);
        }
      }

      res.send(html);
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

setupVite();
