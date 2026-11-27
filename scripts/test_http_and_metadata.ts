import http from 'http';

interface HtmlAssertion {
  canonicalPath: string;
  expectedTitleFragment: string;
  requireRootImg?: boolean;
  requireRootH1?: boolean;
  forbiddenSubstrings?: string[];
}

interface RouteTestCase {
  path: string;
  expectedStatus: number;
  expectedContentType: string;
  expectedSubstring?: string;
  htmlAssertions?: HtmlAssertion;
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

function extractRootBlock(html: string): string {
  const start = html.indexOf('<div id="root">');
  if (start === -1) return '';
  const tail = html.slice(start);
  const scriptIdx = tail.indexOf('<script');
  return scriptIdx === -1 ? tail : tail.slice(0, scriptIdx);
}

async function runHttpAndMetadataTests() {
  console.log("=== Test d'intégration HTTP & Métadonnées (Serveur SSR léger, Images & Conformité) ===");

  const testCases: RouteTestCase[] = [
    {
      path: '/health',
      expectedStatus: 200,
      expectedContentType: 'application/json',
      expectedSubstring: '"status":"ok"',
      description: 'Healthcheck JSON de la plateforme'
    },
    {
      path: '/',
      expectedStatus: 200,
      expectedContentType: 'text/html',
      expectedSubstring: '<div id="root">',
      htmlAssertions: {
        canonicalPath: '/',
        expectedTitleFragment: 'Bloom by BotaniK',
        requireRootImg: true,
        requireRootH1: true,
        forbiddenSubstrings: ['~3,8 mg', '3,8 mg par tasse', 'alcool chauffé en cuve suspendu']
      },
      description: "Page d'accueil / (Bloom by BotaniK)"
    },
    {
      path: '/bloomlab/',
      expectedStatus: 200,
      expectedContentType: 'text/html',
      expectedSubstring: '<div id="root">',
      htmlAssertions: {
        canonicalPath: '/bloomlab/',
        expectedTitleFragment: 'BloomLab',
        requireRootImg: true,
        requireRootH1: true,
        forbiddenSubstrings: ['~3,8 mg', 'sans surveillance pendant', 'fonctionnement autonome sans surveillance']
      },
      description: 'Page produit pilier BloomLab'
    },
    {
      path: '/boutique/',
      expectedStatus: 200,
      expectedContentType: 'text/html',
      expectedSubstring: '<div id="root">',
      htmlAssertions: {
        canonicalPath: '/boutique/',
        expectedTitleFragment: 'Boutique',
        requireRootImg: true,
        requireRootH1: true,
        forbiddenSubstrings: ['Purification Systémique', 'chélation interne']
      },
      description: 'Boutique officielle Bloom by BotaniK'
    },
    {
      path: '/boutique/duo-argiles/',
      expectedStatus: 200,
      expectedContentType: 'text/html',
      expectedSubstring: '<div id="root">',
      htmlAssertions: {
        canonicalPath: '/boutique/duo-argiles/',
        expectedTitleFragment: 'Duo Argiles',
        requireRootImg: true,
        requireRootH1: true,
        forbiddenSubstrings: ['Purification Systémique', 'chélation interne', 'détoxification profonde']
      },
      description: 'Fiche produit Duo Argiles'
    },
    {
      path: '/extraction-botanique/',
      expectedStatus: 200,
      expectedContentType: 'text/html',
      expectedSubstring: '<div id="root">',
      htmlAssertions: {
        canonicalPath: '/extraction-botanique/',
        expectedTitleFragment: 'Extraction Botanique',
        requireRootImg: true,
        requireRootH1: true,
        forbiddenSubstrings: ['~3,8 mg', 'Sans chauffe 4']
      },
      description: 'Guide pilier Extraction Botanique'
    },
    {
      path: '/guide-solvants/',
      expectedStatus: 200,
      expectedContentType: 'text/html',
      expectedSubstring: '<div id="root">',
      htmlAssertions: {
        canonicalPath: '/guide-solvants/',
        expectedTitleFragment: 'Solvants',
        requireRootImg: true,
        requireRootH1: true,
        forbiddenSubstrings: ['~3,8 mg', 'Sans chauffe 4']
      },
      description: 'Guide des solvants et polarité'
    },
    {
      path: '/academie/',
      expectedStatus: 200,
      expectedContentType: 'text/html',
      expectedSubstring: '<div id="root">',
      htmlAssertions: {
        canonicalPath: '/academie/',
        expectedTitleFragment: 'Académie',
        requireRootImg: true,
        requireRootH1: true,
        forbiddenSubstrings: ['~3,8 mg']
      },
      description: 'Accueil de Bloom Académie'
    },
    {
      path: '/academie/herbier/',
      expectedStatus: 200,
      expectedContentType: 'text/html',
      expectedSubstring: '<div id="root">',
      htmlAssertions: {
        canonicalPath: '/academie/herbier/',
        expectedTitleFragment: 'Herbier',
        requireRootImg: true,
        requireRootH1: true,
        forbiddenSubstrings: ['~3,8 mg']
      },
      description: 'Herbier scientifique Bloom (163 plantes)'
    },
    {
      path: '/questions-frequentes/',
      expectedStatus: 200,
      expectedContentType: 'text/html',
      expectedSubstring: '<div id="root">',
      htmlAssertions: {
        canonicalPath: '/questions-frequentes/',
        expectedTitleFragment: 'FAQ',
        requireRootImg: true,
        requireRootH1: true,
        forbiddenSubstrings: ['privilégiez le programme Sans chauffe', '~3,8 mg']
      },
      description: 'Page Questions Fréquentes'
    },
    {
      path: '/infusion-botanique-maison-comment-ca-marche/',
      expectedStatus: 200,
      expectedContentType: 'text/html',
      expectedSubstring: '<div id="root">',
      htmlAssertions: {
        canonicalPath: '/infusion-botanique-maison-comment-ca-marche/',
        expectedTitleFragment: 'Infusion',
        requireRootImg: true,
        requireRootH1: true,
        forbiddenSubstrings: ['~3,8 mg']
      },
      description: 'Page pilier Infusion Botanique'
    },
    {
      path: '/recettes/',
      expectedStatus: 200,
      expectedContentType: 'text/html',
      expectedSubstring: '<div id="root">',
      htmlAssertions: {
        canonicalPath: '/recettes/',
        expectedTitleFragment: 'Recettes',
        requireRootImg: true,
        requireRootH1: true
      },
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
      path: '/recettes/culinaires/sirop-sureau-immunite/',
      expectedStatus: 200,
      expectedContentType: 'text/html',
      expectedSubstring: 'Sirop Traditionnel de Sureau',
      description: 'Fiche canonique existante : Sirop Traditionnel de Sureau & Gingembre'
    },
    {
      path: '/recettes/cosmetiques/baume-levres-calendula/',
      expectedStatus: 200,
      expectedContentType: 'text/html',
      expectedSubstring: 'Baume à Lèvres au Calendula',
      description: 'Fiche canonique existante : Baume à Lèvres au Calendula'
    },
    {
      path: '/recettes/parcours-botaniques/teinture-propolis-maison/',
      expectedStatus: 200,
      expectedContentType: 'text/html',
      expectedSubstring: 'Teinture Mère de Propolis Maison',
      description: 'Fiche canonique existante : Teinture Mère de Propolis Maison'
    },
    {
      path: '/recettes/phytotherapie/romarin/',
      expectedStatus: 200,
      expectedContentType: 'text/html',
      expectedSubstring: 'Romarin',
      description: 'Fiche herbier migrée existante : Romarin'
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
      path: '/robots.txt',
      expectedStatus: 200,
      expectedContentType: 'text/plain',
      expectedSubstring: 'Allow: /images/',
      description: 'Fichier robots.txt avec accès explicite aux répertoires images'
    },
    {
      path: '/sitemap.xml',
      expectedStatus: 200,
      expectedContentType: 'application/xml',
      expectedSubstring: 'xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"',
      description: 'Sitemap principal avec namespace image:image'
    },
    {
      path: '/sitemap-images.xml',
      expectedStatus: 200,
      expectedContentType: 'application/xml',
      expectedSubstring: '<image:image>',
      description: 'Sitemap dédié aux images du site'
    },
    {
      path: '/sitemap-recettes.xml',
      expectedStatus: 200,
      expectedContentType: 'application/xml',
      expectedSubstring: '<urlset',
      description: 'Flux XML sitemap des recettes'
    },
    {
      path: '/feed/google-merchant.xml',
      expectedStatus: 200,
      expectedContentType: 'application/xml',
      expectedSubstring: 'https://bloombybotanik.com/products/',
      description: 'Flux Google Merchant XML'
    },
    {
      path: '/images/bloomlab_main_1784887530345.png',
      expectedStatus: 200,
      expectedContentType: 'image/png',
      description: 'Image produit principale BloomLab (HTTP 200)'
    },
    {
      path: '/images/1.png',
      expectedStatus: 200,
      expectedContentType: 'image/png',
      description: 'Image héroïque BloomLab 1.png (HTTP 200)'
    },
    {
      path: '/images/product_duo_argiles.jpg',
      expectedStatus: 200,
      expectedContentType: 'image/jpeg',
      description: 'Image produit Duo Argiles (HTTP 200)'
    },
    {
      path: '/images/og/bloom-extracteur-infuseur-botanique-1200x630.jpg',
      expectedStatus: 200,
      expectedContentType: 'image/jpeg',
      description: 'Image OpenGraph 1200x630 (HTTP 200)'
    }
  ];

  const seenTitles = new Map<string, string>();
  let passedCount = 0;

  for (const tc of testCases) {
    const res = await fetchHttp(tc.path);
    const contentType = res.headers['content-type'] || '';

    if (res.statusCode !== tc.expectedStatus) {
      throw new Error(`[FAIL] ${tc.path}: Statut attendu ${tc.expectedStatus}, obtenu ${res.statusCode} (${tc.description})`);
    }

    const isXmlValid = tc.expectedContentType === 'application/xml'
      ? (contentType.includes('application/xml') || contentType.includes('text/xml'))
      : contentType.includes(tc.expectedContentType);
    if (!isXmlValid) {
      throw new Error(`[FAIL] ${tc.path}: Content-Type attendu ${tc.expectedContentType}, obtenu ${contentType}`);
    }

    if (tc.expectedSubstring && !res.body.includes(tc.expectedSubstring)) {
      throw new Error(`[FAIL] ${tc.path}: Contenu attendu "${tc.expectedSubstring}" absent de la réponse`);
    }

    if (tc.htmlAssertions) {
      const ha = tc.htmlAssertions;
      const titleMatch = res.body.match(/<title>([^<]+)<\/title>/i);
      const title = titleMatch ? titleMatch[1].trim() : '';
      if (!title || !title.toLowerCase().includes(ha.expectedTitleFragment.toLowerCase())) {
        throw new Error(`[FAIL] ${tc.path}: <title> "${title}" ne contient pas "${ha.expectedTitleFragment}"`);
      }
      if (seenTitles.has(title) && seenTitles.get(title) !== ha.canonicalPath) {
        throw new Error(`[FAIL] ${tc.path}: <title> dupliqué avec ${seenTitles.get(title)} ("${title}")`);
      }
      seenTitles.set(title, ha.canonicalPath);

      const expectedCanonical = `https://bloombybotanik.com${ha.canonicalPath}`;
      if (!res.body.includes(`<link rel="canonical" href="${expectedCanonical}"`)) {
        throw new Error(`[FAIL] ${tc.path}: Balise canonical attendue "${expectedCanonical}" absente`);
      }

      if (!/property="og:image"\s+content="https:\/\/bloombybotanik\.com\/[^"]+"/i.test(res.body)) {
        throw new Error(`[FAIL] ${tc.path}: Balise og:image valide absente`);
      }

      const rootBlock = extractRootBlock(res.body);
      if (ha.requireRootH1 && !/<h1[\s>]/i.test(rootBlock)) {
        throw new Error(`[FAIL] ${tc.path}: Balise <h1> absente dans <div id="root">`);
      }
      if (ha.requireRootImg && !/<img[\s\S]*?src=["'](?:https:\/\/bloombybotanik\.com)?\/[^"']+["']/i.test(rootBlock)) {
        throw new Error(`[FAIL] ${tc.path}: Balise <img> réelle absente dans <div id="root">`);
      }

      for (const forbidden of ha.forbiddenSubstrings || []) {
        if (res.body.toLowerCase().includes(forbidden.toLowerCase())) {
          throw new Error(`[FAIL] ${tc.path}: Chaîne interdite détectée "${forbidden}"`);
        }
      }
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
  passedCount++;

  // Contrôle du flux Merchant : pas d'allégation cosmétique sur les 5 kits oraux ni de suppression tarifaire
  const merchantRes = await fetchHttp('/feed/google-merchant.xml');
  if (/Produit Alimentaire\s*\/\s*Cosmétique|Purification Systémique/i.test(merchantRes.body)) {
    throw new Error('[FAIL] Mention interdite détectée dans /feed/google-merchant.xml');
  }
  if (!merchantRes.body.includes('<g:price>') || !merchantRes.body.includes('<g:availability>')) {
    throw new Error('[FAIL] Balises g:price ou g:availability manquantes dans /feed/google-merchant.xml');
  }
  console.log('[PASS] Conformité & intégrité tarifaire du flux Google Merchant XML.');
  passedCount++;

  console.log(`=== ${passedCount}/${passedCount} contrôles HTTP, SEO, Images & Contenu validés avec succès ! ===\n`);
}

runHttpAndMetadataTests().catch((err) => {
  console.error('Erreur test HTTP & Métadonnées :', err);
  process.exit(1);
});
