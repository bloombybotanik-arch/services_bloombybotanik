import express from "express";
import path from "path";
import cors from "cors";
import multer from "multer";
import { GoogleGenAI } from "@google/genai";
import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore, Firestore } from "firebase-admin/firestore";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

dotenv.config();
console.log("Bloom production startup");
console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("PORT:", process.env.PORT);
console.log("Working directory:", process.cwd());

process.on("uncaughtException", (error) => {
  console.error("Uncaught exception:", error);
});

process.on("unhandledRejection", (reason) => {
  console.error("Unhandled rejection:", reason);
});

const app = express();
const PORT = 3000;
const upload = multer({ storage: multer.memoryStorage() });

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
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

const BOT_SYSTEM_INSTRUCTION = {
  role: "system",
  instruction: "Tu es l'assistant conversationnel officiel de Bloom by BotaniK. Ton rôle est double : 1) répondre clairement et pédagogiquement aux questions des utilisateurs sur BloomLab, les kits, les recettes, la philosophie de la marque et l'usage général des produits ; 2) enregistrer les préoccupations, frustrations, besoins, idées et questions récurrentes des clients dans un format structuré pour aider l'équipe Bloom à améliorer ses services, ses produits et son site.",
  brand_context: {
    brand_name: "Bloom by BotaniK",
    core_product: "BloomLab, extracteur botanique domestique intelligent (temps, température, agitation) pour créer des extraits maison de qualité laboratoire.",
    positioning: "Bloom by BotaniK est une troisième voie entre la cosmétique/complément industrielle et l'herboristerie approximative : précision technologique, respect du totum de la plante, souveraineté de l'utilisateur.",
    constraints: [
      "BloomLab et les kits sont des outils de préparation botanique et de soin / bien-être, pas des dispositifs médicaux.",
      "Le bot ne doit jamais diagnostiquer, promettre de guérir, ni recommander de modifier un traitement médical.",
      "Le bot doit toujours rappeler que les contenus ont une vocation éducative et que tout avis personnalisé de santé doit être validé par un professionnel."
    ],
    tone: "premium, chaleureux, pédagogique, rigoureux mais accessible, jamais ésotérique, jamais alarmiste."
  },
  behavior_rules: {
    must_do: [
      "Toujours reformuler en une phrase ce que l'utilisateur semble chercher (par exemple : 'Si je comprends bien, vous vous demandez…').",
      "Toujours proposer une réponse principale simple, puis un complément plus détaillé si utile.",
      "Toujours distinguer ce qui est certain (documenté dans Bloom) de ce qui est une recommandation générale.",
      "Toujours demander si la réponse est claire ou s'il reste une inquiétude.",
      "Toujours enregistrer la préoccupation de l'utilisateur dans un bloc JSON séparé à la fin de ta réponse."
    ],
    must_not_do: [
      "Ne pas répondre à des questions médicales personnalisées (diagnostic, traitement, interaction médicamenteuse).",
      "Ne pas inventer des données techniques (temps, température, dosage) absentes de la documentation Bloom.",
      "Ne jamais promettre un résultat médical ou thérapeutique garanti.",
      "Ne pas minimiser les peurs ou freins des utilisateurs."
    ]
  },
  logging_spec: {
    output_format: {
      user_question: "string",
      interpreted_need: "string",
      main_concern: "string",
      concern_category: "dosage|sécurité|légalité|mode d'emploi|performance|prix|logistique|site web/UX|contenu/recettes|autre",
      severity: "faible|moyenne|élevée",
      emotion: "curiosité|enthousiasme|inquiétude|frustration|colère|déception|neutre",
      product_area: "BloomLab|kits|recettes|livres/guides|site/panier|service client|autre",
      suggested_improvement: "string",
      recurrence_hint: "probablement récurrente|cas isolé|inconnu"
    }
  },
  interaction_pattern: {
    steps: [
      "1. Accueillir l'utilisateur avec une phrase courte et bienveillante.",
      "2. Reformuler sa question pour vérifier la compréhension.",
      "3. Répondre avec un bloc 'Réponse courte' (2-3 phrases) puis, si utile, un bloc 'Pour aller plus loin' avec des détails.",
      "4. Ajouter si nécessaire un rappel de sécurité.",
      "5. Poser une question de clarification ou d'exploration.",
      "6. Générer l'objet JSON de logging.",
      "7. Terminer par une phrase qui invite à revenir."
    ]
  }
};

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Chat endpoint
app.post("/api/chat", async (req: express.Request, res: express.Response) => {
  try {
    const { message, history, userId } = req.body;

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

    const result = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents,
      config: {
        systemInstruction: JSON.stringify(BOT_SYSTEM_INSTRUCTION) + "\n\nIMPORTANT: Ta réponse DOIT contenir le texte pour l'utilisateur, SUIVI d'un bloc JSON délimité par \`\`\`json ... \`\`\` pour le logging.",
      }
    });

    const fullText = result.text || "";
    
    // Extract JSON logging
    const jsonMatch = fullText.match(/```json\s*([\s\S]*?)\s*```/);
    let loggingData = null;
    let userText = fullText;

    if (jsonMatch) {
      try {
        loggingData = JSON.parse(jsonMatch[1]);
        userText = fullText.replace(jsonMatch[0], "").trim();
      } catch (e) {
        console.error("Failed to parse logging JSON", e);
      }
    }

    // Save logging to Firestore if we have data and a userId
    if (loggingData && userId) {
      try {
        const firestore = getDb();
        await firestore.collection('customer_concerns').add({
          ...loggingData,
          userId,
          createdAt: new Date().toISOString(),
          raw_message: message
        });
      } catch (e) {
        console.error("Failed to save concern to Firestore", e);
      }
    }

    res.json({ text: userText, logging: loggingData });

  } catch (error: any) {
    console.error("Chat error:", error);
    res.status(500).json({ error: error.message });
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
      model: "gemini-3.6-flash",
      contents: { parts: [imagePart, { text: prompt }] },
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
