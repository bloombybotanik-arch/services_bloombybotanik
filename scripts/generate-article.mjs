/**
 * Script de génération d'article via Gemini
 */
import { GoogleGenerativeAI } from "@google/generative-ai";

async function generate() {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `Génère un article de blog expert en français pour Bloom by BotaniK.
  Sujet : L'extraction botanique et le bien-être.
  Ton : Premium, scientifique, bienveillant.
  Format de réponse : JSON uniquement avec les champs "title" et "content" (HTML).
  Inclus des mots clés : extraction basse température, Totum, phytothérapie, BloomLab.`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // On nettoie la réponse pour ne garder que le JSON
    const jsonStr = text.replace(/```json|```/g, '').trim();
    console.log(jsonStr);
  } catch (error) {
    console.error('Erreur de génération Gemini :', error);
    process.exit(1);
  }
}

generate();
