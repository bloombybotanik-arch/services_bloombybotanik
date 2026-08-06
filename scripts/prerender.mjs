// Script de pré-rendu statique pour GitHub Pages.
// Génère un index.html physique par route (SEO-friendly, statut 200 pour Googlebot)
// en utilisant Puppeteer pour capturer le HTML final rendu par le SPA React après
// exécution du JavaScript (hydratation des données produit + JSON-LD dynamique).

import puppeteer from 'puppeteer';
import { createServer } from 'http-server';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs/promises';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, '../dist');
const PORT = 4173;
const BASE_URL = `http://localhost:${PORT}`;

// Liste des routes à pré-rendre. Les kits sont synchronisés avec les slugs
// définis dans src/StoreContent.tsx (fonction obtenirProduits).
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
  console.log('Démarrage du serveur statique local pour le pré-rendu...');
  const server = createServer({ root: distDir });
  await new Promise((resolve) => server.listen(PORT, resolve));

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

      // Laisse le temps aux effets React (JSON-LD dynamique, données produit) de s'appliquer.
      await new Promise((r) => setTimeout(r, 500));

      const html = await page.content();
      const outputPath = await routeToFilePath(route);
      await fs.writeFile(outputPath, html, 'utf-8');
      console.log(`  -> écrit dans ${path.relative(distDir, outputPath)}`);

      await page.close();
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
