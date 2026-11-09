import http from 'http';
import { CANONICAL_RECIPES } from '../src/data/canonicalRecipesRegistry';
import { validateRecipeRoute } from '../src/utils/recipeRouteValidator';

interface RouteTestCase {
  path: string;
  expectedStatus: number;
  expectedContentType: string;
  expectedSubstring?: string;
  description: string;
}

function fetchHttp(urlPath: string): Promise<{ statusCode: number; headers: http.IncomingHttpHeaders; body: string }> {
  return new Promise((resolve, reject) => {
    http.get(`http://localhost:3000${urlPath}`, (res) => {
      let body = '';
      res.on('data', (chunk) => { body += chunk; });
      res.on('end', () => {
        resolve({ statusCode: res.statusCode || 0, headers: res.headers, body });
      });
    }).on('error', reject);
  });
}

async function runHttpAndMetadataTests() {
  console.log('=== Test d\'intégration HTTP & Métadonnées (Vérification serveur & templates) ===');

  const testCases: RouteTestCase[] = [
    {
      path: '/health',
      expectedStatus: 200,
      expectedContentType: 'application/json',
      expectedSubstring: '"status":"healthy"',
      description: 'Healthcheck JSON de la plateforme'
    },
    {
      path: '/',
      expectedStatus: 200,
      expectedContentType: 'text/html',
      expectedSubstring: '<div id="root">',
      description: 'Page d\'accueil / (Bloom by BotaniK)'
    },
    {
      path: '/recettes/',
      expectedStatus: 200,
      expectedContentType: 'text/html',
      expectedSubstring: '<div id="root">',
      description: 'Hub public crawlable des recettes'
    },
    {
      path: '/recettes/culinaires/',
      expectedStatus: 200,
      expectedContentType: 'text/html',
      expectedSubstring: '<div id="root">',
      description: 'Catégorie culinaires page 1'
    },
    {
      path: '/recettes/culinaires/page/2/',
      expectedStatus: 200,
      expectedContentType: 'text/html',
      expectedSubstring: '<div id="root">',
      description: 'Catégorie culinaires page 2 (pagination valide)'
    },
    {
      path: '/recettes/cosmetiques/',
      expectedStatus: 200,
      expectedContentType: 'text/html',
      expectedSubstring: '<div id="root">',
      description: 'Catégorie cosmétiques page 1'
    },
    {
      path: '/recettes/parcours-botaniques/',
      expectedStatus: 200,
      expectedContentType: 'text/html',
      expectedSubstring: '<div id="root">',
      description: 'Catégorie parcours botaniques'
    },
    {
      path: '/recettes/culinaires/huile-infusee-romarin/',
      expectedStatus: 200,
      expectedContentType: 'text/html',
      expectedSubstring: '<div id="root">',
      description: 'Fiche canonique existante : Huile infusée Romarin (cul-01)'
    },
    {
      path: '/recettes/cosmetiques/huile-de-soin-calendula/',
      expectedStatus: 200,
      expectedContentType: 'text/html',
      expectedSubstring: '<div id="root">',
      description: 'Fiche canonique existante : Huile de soin Calendula (cosm-01)'
    },
    {
      path: '/recettes/parcours-botaniques/parcours-extraction-basse-temperature/',
      expectedStatus: 200,
      expectedContentType: 'text/html',
      expectedSubstring: '<div id="root">',
      description: 'Fiche canonique existante : Parcours extraction (parc-01)'
    },
    {
      path: '/recettes/culinaires/recette-inexistante-test-404/',
      expectedStatus: 404,
      expectedContentType: 'text/html',
      expectedSubstring: '<div id="root">',
      description: 'Recette culinaire inconnue -> doit renvoyer HTTP 404'
    },
    {
      path: '/recettes/culinaires/page/99/',
      expectedStatus: 404,
      expectedContentType: 'text/html',
      expectedSubstring: '<div id="root">',
      description: 'Pagination culinaire inexistante (page 99) -> doit renvoyer HTTP 404'
    },
    {
      path: '/recettes/parcours-botaniques/page/2/',
      expectedStatus: 404,
      expectedContentType: 'text/html',
      expectedSubstring: '<div id="root">',
      description: 'Pagination parcours botaniques inexistante (1 seule page) -> doit renvoyer HTTP 404'
    },
    {
      path: '/sitemap-recettes.xml',
      expectedStatus: 200,
      expectedContentType: 'application/xml',
      expectedSubstring: '<urlset',
      description: 'Flux XML sitemap des recettes'
    }
  ];

  let passedCount = 0;
  for (const tc of testCases) {
    const res = await fetchHttp(tc.path);
    const contentType = res.headers['content-type'] || '';

    if (res.statusCode !== tc.expectedStatus) {
      throw new Error(`[FAIL] ${tc.path}: Statut attendu ${tc.expectedStatus}, obtenu ${res.statusCode} (${tc.description})`);
    }

    if (!contentType.includes(tc.expectedContentType)) {
      throw new Error(`[FAIL] ${tc.path}: Content-Type attendu ${tc.expectedContentType}, obtenu ${contentType}`);
    }

    if (tc.expectedSubstring && !res.body.includes(tc.expectedSubstring)) {
      throw new Error(`[FAIL] ${tc.path}: Contenu attendu "${tc.expectedSubstring}" absent de la réponse`);
    }

    console.log(`[PASS] ${tc.expectedStatus} ${tc.path} (${tc.description})`);
    passedCount++;
  }

  // Contrôle du sitemap : aucune fausse URL 404 ne doit être présente dans le sitemap
  const sitemapRes = await fetchHttp('/sitemap-recettes.xml');
  if (sitemapRes.body.includes('recette-inexistante') || sitemapRes.body.includes('page/99')) {
    throw new Error('[FAIL] URLs 404 détectées dans le sitemap XML !');
  }
  console.log('[PASS] Intégrité du sitemap XML : aucune URL inexistante détectée.');

  console.log(`=== ${passedCount + 1}/${passedCount + 1} tests HTTP & Métadonnées validés avec succès ! ===\n`);
}

runHttpAndMetadataTests().catch((err) => {
  console.error('Erreur test HTTP & Métadonnées :', err);
  process.exit(1);
});
