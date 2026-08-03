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

app.use(cors());
app.use(express.json({ limit: '10mb' }));

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
