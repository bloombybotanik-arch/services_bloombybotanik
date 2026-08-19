import express from "express";
import path from "path";
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

// Redirections 301 pour le SEO
const redirects: Record<string, string> = {
  '/indexbis': '/',
  '/boutique/confort-digestif': '/boutique/duo-argiles',
  '/boutique/feu-actualisateur': '/boutique/purete-sanguine',
  '/boutique/nutri-profonde': '/boutique/expert-peaux',
  '/bloomlab-extracteur-botanique-et-infuseur-dhuile-intelligent-6-en-1': '/bloomlab',
  '/termes-et-conditions': '/legal',
  '/chroniques': '/blog'
};

Object.entries(redirects).forEach(([from, to]) => {
  app.get(from, (req, res) => res.redirect(301, to));
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
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

setupVite();
