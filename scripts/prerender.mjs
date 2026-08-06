// Script de pré-rendu statique pour GitHub Pages.
// Génère un index.html physique par route (SEO-friendly, statut 200 pour Googlebot)
// en utilisant Puppeteer pour capturer le HTML final rendu par le SPA React après
// exécution du JavaScript (hydratation des données produit + JSON-LD dynamique).
//
// IMPORTANT : on utilise `vite preview` (et non http-server) comme serveur local,
// car il gère nativement le fallback SPA (sert index.html pour toute route inconnue
// avec un statut 200), contrairement à http-server qui renverrait le vrai 404.html
// et fausserait la capture Puppeteer (contenu de la page d'accueil figé partout).

import puppeteer from 'puppeteer';
import { preview } from 'vite';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs/promises';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');
const PORT = 4173;

// Liste des slugs produits, synchronisés avec src/StoreContent.tsx (fonction getProducts).
const PRODUCT_SLUGS = [
  'bloomlab',
  'seve-fondamentale',
  'nuit-profonde',
  'confort-digestif',
  'feu-articulaire',
  'duo-argiles',
  'pack-trio',
];

const ROUTES = [
  '/',
  '/machine',
  '/phytotherapie-reset',
  '/boutique',
  '/culinaire',
  '/cosmetiques',
  '/library-landing',
  '/herbier',
  '/manifeste',
  '/activation',
  ...PRODUCT_SLUGS.map((slug) => `/boutique/${slug}`),
];

async function routeToFilePath(route) {
  if (route === '/') {
    return path.join(distDir, 'index.html');
  }
  const dir = path.join(distDir, route.replace(/^\//, ''));
  await fs.mkdir(dir, { recursive: true });
  return path.join(dir, 'index.html');
}

async function main() {
  console.log('Démarrage du serveur vite preview (fallback SPA natif)...');
  const server = await preview({
    root: rootDir,
    preview: { port: PORT, strictPort: true },
  });
  const BASE_URL = `http://localhost:${PORT}`;

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  try {
    for (const route of ROUTES) {
      const page = await browser.newPage();
      const url = `${BASE_URL}${route}`;
      console.log(`Pré-rendu : ${url}`);

      await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });

      // Attend que le routing SPA (lecture de window.location.pathname) et les
      // effets React (JSON-LD dynamique, données produit) se soient appliqués.
      await page.waitForFunction(
        () => document.readyState === 'complete',
        { timeout: 10000 }
      );
      await new Promise((r) => setTimeout(r, 800));

      const html = await page.content();
      const outputPath = await routeToFilePath(route);
      await fs.writeFile(outputPath, html, 'utf-8');
      console.log(`  -> écrit dans ${path.relative(distDir, outputPath)}`);

      await page.close();
    }
  } finally {
    await browser.close();
    await new Promise((resolve) => server.httpServer.close(resolve));
  }

  console.log('Pré-rendu terminé avec succès pour', ROUTES.length, 'routes.');
}

main().catch((err) => {
  console.error('Erreur lors du pré-rendu :', err);
  process.exit(1);
});
