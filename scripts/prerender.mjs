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
const rootDir = path.resolve(__dirname, '..');
const PORT = 4176;
const BASE_URL = `http://localhost:${PORT}`;

/**
 * Extraction dynamique des slugs et IDs depuis les fichiers source
 */
async function getDynamicRoutes() {
  const products = [];
  const blogPosts = [];
  const plants = [];

  try {
    // 1. Products from StoreContent.tsx
    const storeContent = await fs.readFile(path.join(rootDir, 'src/StoreContent.tsx'), 'utf-8');
    const productMatches = storeContent.matchAll(/id:\s*['"]([a-z0-9-]+)['"]/g);
    for (const match of productMatches) {
      if (!products.includes(match[1])) products.push(match[1]);
    }

    // 2. Blog posts from blogPosts.ts
    const blogContent = await fs.readFile(path.join(rootDir, 'src/data/blogPosts.ts'), 'utf-8');
    const blogMatches = blogContent.matchAll(/slug:\s*['"]([a-z0-9-]+)['"]/g);
    for (const match of blogMatches) {
      if (!blogPosts.includes(match[1])) blogPosts.push(match[1]);
    }

    // 3. Plants from therapeuticData.ts
    const plantContent = await fs.readFile(path.join(rootDir, 'src/data/therapeuticData.ts'), 'utf-8');
    const plantMatches = plantContent.matchAll(/plant_id:\s*['"]([A-Za-z0-9_]+)['"]/g);
    for (const match of plantMatches) {
      if (!plants.includes(match[1])) plants.push(match[1]);
    }

    console.log(`Routes découvertes : ${products.length} produits, ${blogPosts.length} articles, ${plants.length} plantes.`);
  } catch (err) {
    console.error('Erreur lors de la découverte des routes :', err);
  }

  return { products, blogPosts, plants };
}

const LANGUAGES = ['', '/en', '/de'];

const BASE_ROUTES = [
  '/',
  '/bloomlab/',
  '/phytotherapie-reset/',
  '/boutique/',
  '/gastronomie-botanique/',
  '/duo-argiles/',
  '/herbier/',
  '/manifeste/',
  '/activation/',
  '/infusion-botanique/',
  '/infuseur-botanique/',
  '/infusion-botanique-maison-comment-ca-marche/',
  '/extraction-botanique/',
  '/extraction-botanique-guide-complet/',
  '/qu-est-ce-que-l-infusion-botanique/',
  '/blog/',
  '/droit-de-retractation/',
  '/conditions-generales-de-vente/',
  '/termes-et-conditions/',
  '/politique-de-confidentialite/',
  '/mentions-legales/',
  '/retour-et-remboursement/',
  '/questions-frequentes/',
  '/methode-infusion-botanique-precision/',
  '/totum-vegetal-definition/',
  '/solvants-extraction-botanique/',
  '/panier/',
  '/compte/',
  '/legal/'
];

async function routeToFilePath(route) {
  if (route === '/') {
    return path.join(distDir, 'index.html');
  }
  const dir = path.join(distDir, route.replace(/^\//, ''));
  await fs.mkdir(dir, { recursive: true });
  return path.join(dir, 'index.html');
}

/**
 * Génération automatique du sitemap.xml
 */
async function generateSitemaps(routes) {
  const baseUrl = 'https://bloombybotanik.com';
  const now = new Date().toISOString().split('T')[0];

  const generateXml = (langs) => `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${routes.filter(r => {
    // Exclure les routes techniques ou privées du sitemap
    const excluded = ['/panier/', '/checkout/', '/admin/', '/compte/', '/en-attente/', '/legal/'];
    return !excluded.some(ex => r.includes(ex));
  }).map(route => {
    const isMain = !route.startsWith('/en/') && !route.startsWith('/de/');
    if (!isMain) return ''; // On ne traite que les routes principales pour générer les alternates
    
    const cleanRoute = route;
    return `  <url>
    <loc>${baseUrl}${cleanRoute}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${cleanRoute === '/' ? '1.0' : '0.8'}</priority>
    <xhtml:link rel="alternate" hreflang="fr" href="${baseUrl}${cleanRoute}" />
    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/en${cleanRoute}" />
    <xhtml:link rel="alternate" hreflang="de" href="${baseUrl}/de${cleanRoute}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}${cleanRoute}" />
  </url>`;
  }).join('\n')}
</urlset>`;

  await fs.writeFile(path.join(distDir, 'sitemap.xml'), generateXml(['fr', 'en', 'de']), 'utf-8');
  console.log('Sitemap généré avec succès.');
}

async function main() {
  const { products, blogPosts, plants } = await getDynamicRoutes();
  const ROUTES = [];

  for (const lang of LANGUAGES) {
    for (const base of BASE_ROUTES) {
      const route = lang === '' ? base : `${lang}${base === '/' ? '' : base}`;
      ROUTES.push(route);
    }
    for (const slug of products) {
      ROUTES.push(lang === '' ? `/boutique/${slug}/` : `${lang}/boutique/${slug}/`);
    }
    for (const slug of blogPosts) {
      ROUTES.push(lang === '' ? `/blog/${slug}/` : `${lang}/blog/${slug}/`);
    }
    for (const id of plants) {
      ROUTES.push(lang === '' ? `/herbier/${id}/` : `${lang}/herbier/${id}/`);
    }
  }

  console.log(`Démarrage du pré-rendu pour ${ROUTES.length} routes...`);
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
        // Force evaluation of SEOMetadata by passing prerender=true
        const url = `${BASE_URL}${route}${route.includes('?') ? '&' : '?'}prerender=true`;
        
        try {
          await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 });
          // Wait for React to hydrate and SEO tags to be injected
          await new Promise(r => setTimeout(r, 1000));
          
          const html = await page.content();
          
          // Quality check: verify canonical exists and has trailing slash
          if (!html.includes('rel="canonical"') || !html.includes('href="https://bloombybotanik.com')) {
            console.warn(`  [!] Attention: Canonical manquante ou incorrecte sur ${route}`);
          }
          
          const outputPath = await routeToFilePath(route);
          await fs.writeFile(outputPath, html, 'utf-8');
          console.log(`  -> écrit : ${path.relative(distDir, outputPath)}`);
        } catch (err) {
          console.error(`Erreur sur ${url}:`, err.message);
        } finally {
          await page.close();
        }
      }));
    }

    await generateSitemaps(ROUTES);

  } finally {
    await browser.close();
    server.close();
  }

  console.log('Pré-rendu terminé avec succès.');
}

main().catch((err) => {
  console.error('Erreur lors du pré-rendu :', err);
  process.exit(1);
});
