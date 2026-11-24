import fs from 'node:fs';
import path from 'node:path';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

const SITE_ORIGIN = 'https://bloombybotanik.com';

const VIEW_SOURCE_MAP: Record<string, string[]> = {
  home: ['src/IndexBisContent.tsx', 'src/HomeContent.tsx'],
  indexbis: ['src/IndexBisContent.tsx'],
  bloomlab: ['src/MachineLanding.tsx', 'src/ProductDetail.tsx'],
  machine: ['src/MachineLanding.tsx'],
  'product-detail': ['src/ProductDetail.tsx', 'src/data/productDetailsData.ts'],
  boutique: ['src/StoreContent.tsx'],
  'boutique-kits': ['src/StoreContent.tsx'],
  'kits-botaniques': ['src/StoreContent.tsx'],
  abonnement: ['src/PremiumInfoContent.tsx'],
  'premium-info': ['src/PremiumInfoContent.tsx'],
  'abonnements-numeriques': ['src/PremiumInfoContent.tsx'],
  culinaire: ['src/CulinarySection.tsx', 'src/data/culinaryData.ts'],
  'gastronomie-botanique': ['src/CulinarySection.tsx', 'src/data/culinaryData.ts'],
  cosmetiques: ['src/CosmeticsContent.tsx'],
  'cosmetique-botanique': ['src/CosmeticsContent.tsx'],
  'cosmetiques-naturels-diy': ['src/CosmeticsContent.tsx'],
  'recette-soupe-tremella': ['src/TremellaBeautySoupRecipe.tsx'],
  'recette-phycocyanine': ['src/PhycocyanineResetRecipe.tsx'],
  'phytotherapie-reset': ['src/PhytotherapyResetPage.tsx'],
  'reset-homeostasique': ['src/PhytotherapyResetPage.tsx'],
  academie: ['src/BloomAcademiePage.tsx'],
  'comment-lire-modele-bloom': ['src/CommentLireModeleBloomContent.tsx'],
  'women-academy': ['src/WomenAcademy.tsx', 'src/data/womenAcademyData.ts'],
  '4-architectures': ['src/Les4ArchitecturesContent.tsx'],
  '7-terrains': ['src/TerrainPillar.tsx'],
  terrain: ['src/TerrainPillar.tsx'],
  '9-axes': ['src/NeufAxesHistoriquesContent.tsx'],
  'neuf-axes-historiques': ['src/NeufAxesHistoriquesContent.tsx'],
  'charge-allostatique': ['src/ChargeAllostatiqueContent.tsx'],
  'metabolisme-insuline': ['src/MetabolismeInsulineContent.tsx'],
  protocoles: ['src/ProtocolesSystemiquesContent.tsx'],
  'votre-pratique': ['src/ProtocolesSystemiquesContent.tsx'],
  parcours: ['src/ProtocolesSystemiquesContent.tsx'],
  'module-0': ['src/academie/Module0ChocParadigmeContent.tsx'],
  'axe-a1': ['src/academie/AxeA1EmonctoiresContent.tsx'],
  'protocole-psoriasis': ['src/ProtocolePsoriasisContent.tsx'],
  'protocole-sibo': ['src/ProtocoleSiboContent.tsx'],
  'protocole-myeline': ['src/ProtocoleMyelineContent.tsx'],
  'protocole-decalcification-pineale': ['src/ProtocoleDecalcificationPinealeContent.tsx'],
  'blog-vieillissement-myeline': ['src/BlogVieillissementMyelineContent.tsx'],
  manifeste: ['src/ManifesteContent.tsx'],
  'la-marque': ['src/ManifesteContent.tsx'],
  contact: ['src/ContactContent.tsx'],
  faq: ['src/FaqContent.tsx'],
  'questions-frequentes': ['src/FaqContent.tsx'],
  guide: ['src/PillarInfusion.tsx', 'src/GuideContent.tsx'],
  'infusion-botanique': ['src/PillarInfusion.tsx'],
  'infusion-botanique-maison-comment-ca-marche': ['src/PillarInfusion.tsx'],
  'qu-est-ce-que-infusion': ['src/PillarInfusion.tsx'],
  'pillar-extraction': ['src/PillarExtraction.tsx'],
  'extraction-botanique': ['src/PillarExtraction.tsx'],
  'guide-complet': ['src/PillarExtraction.tsx'],
  'guide-complet-extraction-botanique-maison': ['src/PillarExtraction.tsx'],
  'guide-solvants': ['src/SolventsGuide.tsx'],
  'solvants-extraction': ['src/SEOArticlesContent.tsx'],
  'teinture-mere': ['src/SEOArticlesContent.tsx'],
  'infusion-precision': ['src/SEOArticlesContent.tsx'],
  'totum-definition': ['src/SEOArticlesContent.tsx'],
  'totum-vegetal': ['src/SEOArticlesContent.tsx'],
  'totum-vegetal-comprendre': ['src/SEOArticlesContent.tsx'],
  'huile-infusee': ['src/PillarOil.tsx'],
  'plantes-adaptogenes': ['src/PillarAdaptogens.tsx'],
  herbier: ['src/HerbariumContent.tsx'],
  library: ['src/HerbariumContent.tsx'],
  herbarium: ['src/HerbariumContent.tsx'],
  bibliotheque: ['src/LibraryLanding.tsx'],
  'library-landing': ['src/LibraryLanding.tsx'],
  recettes: ['src/RecipesContent.tsx', 'src/components/recipes/PublicRecipeCatalog.tsx'],
  'recettes-hub': ['src/components/recipes/PublicRecipeCatalog.tsx'],
  'recettes-culinaires': ['src/components/recipes/PublicRecipeCatalog.tsx'],
  'recettes-cosmetiques': ['src/components/recipes/PublicRecipeCatalog.tsx'],
  'recettes-parcours': ['src/components/recipes/PublicRecipeCatalog.tsx'],
  'recettes-phytotherapie': ['src/components/recipes/PublicRecipeCatalog.tsx'],
  'recettes-gastronomie': ['src/components/recipes/PublicRecipeCatalog.tsx'],
  'recette-detail': ['src/RecipesContent.tsx'],
  blog: ['src/BlogContent.tsx', 'src/data/blogPosts.ts'],
  articles: ['src/ArticlesContent.tsx'],
  lexique: ['src/LexiqueContent.tsx'],
  cgv: ['src/LegalPages.tsx', 'src/translations.ts'],
  cgu: ['src/LegalPages.tsx', 'src/translations.ts'],
  privacy: ['src/LegalPages.tsx', 'src/translations.ts'],
  mentions: ['src/LegalPages.tsx', 'src/translations.ts'],
  returns: ['src/LegalPages.tsx', 'src/translations.ts'],
  withdrawal: ['src/LegalPages.tsx', 'src/translations.ts'],
  legal: ['src/LegalPages.tsx', 'src/translations.ts'],
  'remedes-naturels': ['src/PillarPagesContent.tsx'],
  'remedes-naturels-maison-guide': ['src/PillarPagesContent.tsx'],
  'maceration-plantes': ['src/PillarPagesContent.tsx'],
  'phytotherapie-moderne-scientifique': ['src/PillarPagesContent.tsx'],
  'nutrition-et-micronutrition': ['src/PillarPagesContent.tsx'],
  'micronutrition-guide-achat': ['src/PillarPagesContent.tsx'],
  'micronutrition-precautions': ['src/PillarPagesContent.tsx'],
  'comment-ca-marche': ['src/PillarPagesContent.tsx'],
  how_it_works: ['src/PillarPagesContent.tsx'],
  decouvrir: ['src/PillarPagesContent.tsx'],
  'recettes-gratuites': ['src/PillarPagesContent.tsx'],
  apprendre: ['src/PillarPagesContent.tsx'],
  'preparations-avancees': ['src/PillarPagesContent.tsx'],
  'infuseur-botanique': ['src/PillarPagesContent.tsx'],
  hormese: ['src/PillarPagesContent.tsx'],
  cart: ['src/CartContent.tsx'],
  checkout: ['src/CheckoutFlow.tsx'],
  account: ['src/AccountContent.tsx'],
  activation: ['src/ActivationPage.tsx'],
  'activate-bloomlab': ['src/ActivationPage.tsx'],
  chat: ['src/ChatContent.tsx'],
  pending: ['src/PendingContent.tsx'],
  admin: ['src/components/AdminDashboard.tsx'],
  'admin-newsletter': ['src/components/AdminNewsletter.tsx'],
  'newsletter-preferences': ['src/NewsletterPreferences.tsx'],
};

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function normalizeCanonicalRoute(rawPath: string): string {
  if (!rawPath || rawPath === '/') return '/';
  const clean = rawPath.startsWith('/') ? rawPath : `/${rawPath}`;
  return clean.endsWith('/') ? clean : `${clean}/`;
}

function parseKeyValuePairs(block: string): Array<[string, string]> {
  const pairs: Array<[string, string]> = [];
  const entryRegex = /(?:['"]([^'"]+)['"]|([a-zA-Z0-9_-]+))\s*:\s*['"]([^'"]+)['"]/g;
  let match: RegExpExecArray | null;
  while ((match = entryRegex.exec(block)) !== null) {
    const key = match[1] ?? match[2];
    const val = match[3];
    if (key && val) pairs.push([key, val]);
  }
  return pairs;
}

function getFileMtimeIsoDate(rootDir: string, relPaths: string[], fallbackDate: string): string {
  let latestMs = 0;
  for (const rel of relPaths) {
    const abs = path.resolve(rootDir, rel);
    if (fs.existsSync(abs)) {
      const mtimeMs = fs.statSync(abs).mtimeMs;
      if (mtimeMs > latestMs) latestMs = mtimeMs;
    }
  }
  return latestMs > 0 ? new Date(latestMs).toISOString().slice(0, 10) : fallbackDate;
}

const ROBOTS_DISALLOWED_PREFIXES = [
  '/admin',
  '/panier',
  '/commande',
  '/checkout',
  '/compte',
  '/activation',
  '/en-attente',
  '/newsletter/',
  '/api/',
];

function isIndexableSitemapRoute(route: string): boolean {
  if (ROBOTS_DISALLOWED_PREFIXES.some((prefix) => route.startsWith(prefix))) {
    return false;
  }

  // Exclure les variantes non-canoniques dont le <link rel="canonical"> pointe vers une URL cible
  if (
    route === '/boutique/bloomlab/' ||
    route === '/produit/bloomlab/' ||
    route === '/machine/' ||
    route === '/infuseur-botanique/' ||
    route === '/comprendre-le-corps/7-terrains/' ||
    route === '/terrains/' ||
    route === '/academie/comprendre-le-corps/reset-homeostasique/' ||
    route === '/comprendre-le-corps/reset-homeostasique/' ||
    route === '/reset-homeostasique/' ||
    route === '/phytotherapie-reset/' ||
    route === '/phytotherapie/' ||
    route === '/protocoles/' ||
    route.startsWith('/protocoles/') ||
    route.startsWith('/protocoles-systemiques/') ||
    route.startsWith('/phytotherapie-reset/') ||
    route === '/votre-pratique/' ||
    route === '/parcours/'
  ) {
    return false;
  }

  return true;
}

function getPriorityAndFreq(route: string): { changefreq: string; priority: string } {
  if (route === '/') return { changefreq: 'daily', priority: '1.0' };
  if (
    route === '/bloomlab/' ||
    route === '/boutique/' ||
    route === '/academie/' ||
    route === '/extraction-botanique/' ||
    route === '/infusion-botanique/' ||
    route === '/infusion-botanique-maison-comment-ca-marche/' ||
    route === '/academie/reset-homeostasique/'
  ) {
    return { changefreq: 'weekly', priority: '0.9' };
  }
  if (
    route === '/legal/' ||
    route === '/conditions-generales-de-vente/' ||
    route === '/termes-et-conditions/' ||
    route === '/politique-de-confidentialite/' ||
    route === '/mentions-legales/' ||
    route === '/retour-et-remboursement/' ||
    route === '/droit-de-retractation/'
  ) {
    return { changefreq: 'monthly', priority: '0.3' };
  }
  if (
    route.startsWith('/academie/') ||
    route.startsWith('/boutique/') ||
    route.startsWith('/recettes/') ||
    route.startsWith('/blog/')
  ) {
    return { changefreq: 'weekly', priority: '0.8' };
  }
  return { changefreq: 'weekly', priority: '0.7' };
}

function generateDynamicSitemapXml(rootDir: string): { xml: string; routeCount: number } {
  const typesPath = path.resolve(rootDir, 'src/types.ts');
  const appPath = path.resolve(rootDir, 'src/App.tsx');

  const typesContent = fs.readFileSync(typesPath, 'utf-8');
  const appContent = fs.readFileSync(appPath, 'utf-8');

  const appMtimeDate = new Date(fs.statSync(appPath).mtimeMs).toISOString().slice(0, 10);

  const viewPathsMatch = typesContent.match(/export const VIEW_PATHS[^=]*=\s*\{([\s\S]*?)\};/);
  const pathViewsMatch = appContent.match(/const PATH_VIEWS[^=]*=\s*\{([\s\S]*?)\n\};/);

  const routeToView = new Map<string, string>();

  if (viewPathsMatch) {
    for (const [view, rawPath] of parseKeyValuePairs(viewPathsMatch[1])) {
      const normalizedRoute = normalizeCanonicalRoute(rawPath);
      if (isIndexableSitemapRoute(normalizedRoute)) {
        routeToView.set(normalizedRoute, view);
      }
    }
  }

  if (pathViewsMatch) {
    for (const [rawPath, view] of parseKeyValuePairs(pathViewsMatch[1])) {
      const normalizedRoute = normalizeCanonicalRoute(rawPath);
      if (isIndexableSitemapRoute(normalizedRoute)) {
        routeToView.set(normalizedRoute, view);
      }
    }
  }

  const sortedRoutes = Array.from(routeToView.entries()).sort(([a], [b]) => {
    if (a === '/') return -1;
    if (b === '/') return 1;
    return a.localeCompare(b, 'fr');
  });

  const urlNodes = sortedRoutes.map(([route, view]) => {
    const sourceFiles = VIEW_SOURCE_MAP[view] ?? ['src/App.tsx'];
    const lastmod = getFileMtimeIsoDate(rootDir, sourceFiles, appMtimeDate);
    const { changefreq, priority } = getPriorityAndFreq(route);
    const loc = escapeXml(`${SITE_ORIGIN}${route}`);
    return [
      '  <url>',
      `    <loc>${loc}</loc>`,
      `    <lastmod>${lastmod}</lastmod>`,
      `    <changefreq>${changefreq}</changefreq>`,
      `    <priority>${priority}</priority>`,
      '  </url>',
    ].join('\n');
  });

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urlNodes,
    '</urlset>',
    '',
  ].join('\n');

  return { xml, routeCount: sortedRoutes.length };
}

function writeDynamicSitemap(rootDir: string): void {
  const outPath = path.resolve(rootDir, 'public/sitemap.xml');
  const { xml } = generateDynamicSitemapXml(rootDir);
  const previous = fs.existsSync(outPath) ? fs.readFileSync(outPath, 'utf-8') : '';
  if (previous !== xml) {
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, xml, 'utf-8');
  }
}

function dynamicSitemapPlugin(): Plugin {
  const rootDir = process.cwd();
  return {
    name: 'bloom-dynamic-sitemap',
    buildStart() {
      writeDynamicSitemap(rootDir);
    },
    configureServer(server) {
      writeDynamicSitemap(rootDir);
      server.watcher.on('change', (changedPath) => {
        if (
          changedPath.endsWith(path.join('src', 'App.tsx')) ||
          changedPath.endsWith(path.join('src', 'types.ts'))
        ) {
          writeDynamicSitemap(rootDir);
        }
      });
    },
  };
}

export default defineConfig({
  plugins: [
    react(),
    dynamicSitemapPlugin(),
    {
      name: 'remove-vite-client',
      enforce: 'post',
      transformIndexHtml(html) {
        // Supprime la balise qui cause la boucle infinie
        return html
          .replace(/<script type="module" src="\/@vite\/client"><\/script>/g, '')
          .replace(/<script\b[^>]*src=["']\/@vite\/client["'][^>]*><\/script>/gi, '');
      }
    }
  ],
  optimizeDeps: {
    entries: ['index.html'],
  },
  build: {
    emptyOutDir: false,
  },
  server: {
    port: 3000,
    host: '0.0.0.0',
    strictPort: true,
    hmr: false, // Désactive le HMR
    ws: false,
    allowedHosts: true,
    cors: true,
    watch: {
      ignored: ['**/backups/**', '**/seo-audit/**', '**/app/**', '**/dist/**'],
    },
  }
});
