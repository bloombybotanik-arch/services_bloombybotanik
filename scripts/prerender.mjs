// Script de pré-rendu statique pour GitHub Pages.
// Génère un index.html physique par route (SEO-friendly, statut 200 pour Googlebot)
// en utilisant Puppeteer pour capturer le HTML final rendu par le SPA React après
// exécution du JavaScript (hydratation des données produit + JSON-LD dynamique).

import puppeteer from 'puppeteer';
import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs/promises';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, '../dist');
const PORT = 4175;
const BASE_URL = `http://localhost:${PORT}`;

// Liste des routes à pré-rendre. Les kits sont synchronisés avec les slugs
// définis dans src/StoreContent.tsx (fonction obtenirProduits).
const PRODUCT_SLUGS = [
  'bloomlab',
  'bundle-apothicaire',
  'pack-signature',
  'kit-starter',
  'kit-nuit',
  'kit-digestion',
  'kit-articulaire',
  'kit-hiver',
  'kit-reset',
  'freemium-access',
  'premium-access'
];

const BLOG_SLUGS = [
  'tisane-bain-marie-bloomlab-quelle-methode-pour-extraire-vraiment-les-bienfaits-de-vos-plantes',
  'macers-huileux-maison-les-5-erreurs-qui-detruisent-vos-actifs',
  'inflammation-chronique-le-role-des-plantes-dans-le-reset-homeostasique'
];

const PLANT_IDS = [
  'chaga_vitality', 'urtica_dioica', 'melissa_officinalis', 'curcuma_longa_poivre', 
  'zingiber_officinale', 'rosmarinus_officinalis', 'lavandula_angustifolia', 'artichaut'
];

const LANGUAGES = ['', '/en', '/de'];

const BASE_ROUTES = [
  '/',
  '/bloomlab',
  '/phytotherapie-reset',
  '/boutique',
  '/gastronomie-botanique',
  '/duo-argiles',
  '/bibliotheque-savoirs',
  '/herbier',
  '/manifeste',
  '/activation',
  '/chat',
  '/infusion-botanique',
  '/infuseur-botanique',
  '/infusion-botanique-maison-comment-ca-marche',
  '/extraction-botanique',
  '/extraction-botanique-guide-complet',
  '/qu-est-ce-que-l-infusion-botanique',
  '/blog',
  '/droit-de-retractation',
  '/conditions-generales-de-vente',
  '/termes-et-conditions',
  '/politique-de-confidentialite',
  '/mentions-legales',
  '/retour-et-remboursement',
  '/questions-frequentes',
  '/legal'
];

const ROUTES = [];

for (const lang of LANGUAGES) {
  for (const base of BASE_ROUTES) {
    const route = lang === '' ? base : `${lang}${base === '/' ? '' : base}`;
    ROUTES.push(route);
  }
  for (const slug of PRODUCT_SLUGS) {
    ROUTES.push(lang === '' ? `/boutique/${slug}` : `${lang}/boutique/${slug}`);
  }
  for (const slug of BLOG_SLUGS) {
    ROUTES.push(lang === '' ? `/blog/${slug}` : `${lang}/blog/${slug}`);
  }
  for (const id of PLANT_IDS) {
    ROUTES.push(lang === '' ? `/herbier/${id}` : `${lang}/herbier/${id}`);
    ROUTES.push(lang === '' ? `/bibliotheque/${id}` : `${lang}/bibliotheque/${id}`);
  }
}

async function routeToFilePath(route) {
  if (route === '/') {
    return path.join(distDir, 'index.html');
  }
  const dir = path.join(distDir, route.replace(/^\//, ''));
  await fs.mkdir(dir, { recursive: true });
  return path.join(dir, 'index.html');
}

async function main() {
  console.log('Démarrage du serveur statique pour le pré-rendu...');
  const app = express();
  app.use(express.static(distDir));
  app.get('*', (req, res) => {
    res.sendFile(path.join(distDir, 'index.html'));
  });
  
  const server = app.listen(PORT);

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const CONCURRENCY = 8;
  const chunks = [];
  for (let i = 0; i < ROUTES.length; i += CONCURRENCY) {
    chunks.push(ROUTES.slice(i, i + CONCURRENCY));
  }

  try {
    for (const chunk of chunks) {
      await Promise.all(chunk.map(async (route) => {
        const page = await browser.newPage();
        const url = `${BASE_URL}${route}${route.includes('?') ? '&' : '?'}prerender=true`;
        console.log(`Pré-rendu : ${url}`);

        try {
          await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 });
          // Augmentation du délai pour s'assurer que React a fini de rendre et que SEOMetadata a tourné
          await new Promise(r => setTimeout(r, 1500));
          const html = await page.content();
          const outputPath = await routeToFilePath(route);
          await fs.writeFile(outputPath, html, 'utf-8');
          console.log(`  -> écrit dans ${path.relative(distDir, outputPath)}`);
        } catch (err) {
          console.error(`Erreur sur ${url}:`, err.message);
        } finally {
          await page.close();
        }
      }));
    }
  } finally {
    await browser.close();
    server.close();
  }

  console.log('Pré-rendu terminé avec succès pour', ROUTES.length, 'routes.');
}

main().catch((err) => {
  console.error('Erreur lors du pré-rendu :', err);
  process.exit(1);
});
