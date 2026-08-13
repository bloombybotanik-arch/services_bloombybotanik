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

PHRASE FONDATRICE : "Votre corps n’est pas cassé. Il est verrouillé."

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

// Chat endpoint
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

// Redirections for SEO and legacy URLs
app.get("/bloomlab-extracteur-botanique-et-infuseur-dhuile-intelligent-6-en-1", (req, res) => {
  res.redirect(301, "/bloomlab");
});

app.get("/infusion-botanique-maison-comment-ca-marche", (req, res) => {
  res.redirect(301, "/qu-est-ce-que-l-infusion-botanique");
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
