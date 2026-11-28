import http from 'http';

interface HtmlAssertion {
  canonicalPath: string;
  expectedTitleFragment: string;
  exactTitle?: string;
  requireRootImg?: boolean;
  requireRootH1?: boolean;
  expectedH1Fragment?: string;
  requireEmptyRoot?: boolean;
  expectedRobots?: string;
  expectedXRobotsTag?: string;
  requireVideoObject?: boolean;
  requireProductSchema?: boolean;
  forbidProductSchema?: boolean;
  forbiddenSubstrings?: string[];
}

interface RouteTestCase {
  path: string;
  method?: 'GET' | 'HEAD';
  headers?: Record<string, string>;
  expectedStatus: number;
  expectedContentType: string;
  expectedSubstring?: string;
  expectedLocation?: string;
  htmlAssertions?: HtmlAssertion;
  description: string;
}

function fetchHttp(
  urlPath: string,
  options: { method?: 'GET' | 'HEAD'; headers?: Record<string, string> } = {}
): Promise<{ statusCode: number; headers: http.IncomingHttpHeaders; body: string }> {
  return new Promise((resolve, reject) => {
    const req = http.request(
      {
        hostname: 'localhost',
        port: 3000,
        path: urlPath,
        method: options.method || 'GET',
        headers: options.headers || {},
      },
      (res) => {
        if (options.method === 'HEAD') {
          res.resume();
          resolve({ statusCode: res.statusCode || 0, headers: res.headers, body: '' });
          return;
        }
        let body = '';
        res.on('data', (chunk) => { body += chunk; });
        res.on('end', () => {
          resolve({ statusCode: res.statusCode || 0, headers: res.headers, body });
        });
      }
    );
    req.on('error', reject);
    req.end();
  });
}

function extractRootBlock(html: string): string {
  const start = html.indexOf('<div id="root">');
  if (start === -1) return '';
  const tail = html.slice(start);
  const scriptIdx = tail.indexOf('<script');
  return scriptIdx === -1 ? tail : tail.slice(0, scriptIdx);
}

function decodeBasicEntities(val: string): string {
  return val
    .replace(/&#x27;/gi, "'")
    .replace(/&#39;/gi, "'")
    .replace(/&apos;/gi, "'")
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"');
}

async function runHttpAndMetadataTests() {
  console.log("=== Test d'intégration HTTP & Métadonnées (Chantiers 1, 2 & 3 — GSC, Canonicals, YMYL & Assets) ===");

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
        expectedTitleFragment: 'BloomLab® — Extracteur Botanique de Précision | Bloom by BotaniK',
        exactTitle: 'BloomLab® — Extracteur Botanique de Précision | Bloom by BotaniK',
        requireRootImg: true,
        requireRootH1: true,
        expectedH1Fragment: 'BloomLab',
        requireVideoObject: true,
        forbidProductSchema: true,
        forbiddenSubstrings: ['~3,8 mg', '3,8 mg par tasse', 'alcool chauffé en cuve suspendu', 'garantie constructeur 1 an', 'souveraineté sanitaire']
      },
      description: "Page d'accueil / (Titre naturel, VideoObject, sans Product JSON-LD)"
    },
    {
      path: '/?utm_source=test&fbclid=12345',
      expectedStatus: 200,
      expectedContentType: 'text/html',
      htmlAssertions: {
        canonicalPath: '/',
        expectedTitleFragment: 'BloomLab® — Extracteur Botanique de Précision | Bloom by BotaniK',
        exactTitle: 'BloomLab® — Extracteur Botanique de Précision | Bloom by BotaniK',
        requireRootH1: true,
      },
      description: 'Nettoyage query/UTM sur / -> self-canonical propre'
    },
    {
      path: '/bloomlab/',
      expectedStatus: 200,
      expectedContentType: 'text/html',
      expectedSubstring: 'Bibliothèque numérique',
      htmlAssertions: {
        canonicalPath: '/bloomlab/',
        expectedTitleFragment: 'BloomLab® — Extracteur Botanique Inox 304 & Recettes Maison',
        exactTitle: 'BloomLab® — Extracteur Botanique Inox 304 & Recettes Maison',
        requireRootImg: true,
        requireRootH1: true,
        requireProductSchema: true,
        forbiddenSubstrings: ['~3,8 mg', 'sans surveillance pendant', 'fonctionnement autonome sans surveillance', 'garantie constructeur 1 an', '3 mois d\'accès']
      },
      description: 'Page produit pilier /bloomlab/ (seule route avec Product JSON-LD)'
    },
    {
      path: '/bloomlab/?fbclid=xyz987',
      expectedStatus: 200,
      expectedContentType: 'text/html',
      htmlAssertions: {
        canonicalPath: '/bloomlab/',
        expectedTitleFragment: 'BloomLab® — Extracteur Botanique Inox 304 & Recettes Maison',
      },
      description: 'Nettoyage fbclid sur /bloomlab/ -> self-canonical propre'
    },
    {
      path: '/extraction-botanique/',
      expectedStatus: 200,
      expectedContentType: 'text/html',
      expectedSubstring: '<div id="root">',
      htmlAssertions: {
        canonicalPath: '/extraction-botanique/',
        expectedTitleFragment: "Guide de l'Extraction Botanique : Température, Temps & Solvants",
        exactTitle: "Guide de l'Extraction Botanique : Température, Temps & Solvants",
        requireRootImg: true,
        requireRootH1: true,
        expectedH1Fragment: "Guide de l'Extraction Botanique",
        forbiddenSubstrings: ['~3,8 mg', 'Sans chauffe 4', 'Décarboxylation']
      },
      description: 'Guide pilier /extraction-botanique/'
    },
    {
      path: '/infusion-botanique-maison-comment-ca-marche/',
      expectedStatus: 200,
      expectedContentType: 'text/html',
      expectedSubstring: '<div id="root">',
      htmlAssertions: {
        canonicalPath: '/infusion-botanique-maison-comment-ca-marche/',
        expectedTitleFragment: "L'Infusion Botanique Maîtrisée : Principes & Préparations",
        exactTitle: "L'Infusion Botanique Maîtrisée : Principes & Préparations",
        requireRootImg: true,
        requireRootH1: true,
        expectedH1Fragment: "L'Infusion Botanique Maîtrisée",
        forbiddenSubstrings: ['~3,8 mg']
      },
      description: 'Page pilier /infusion-botanique-maison-comment-ca-marche/'
    },
    {
      path: '/totum-vegetal/',
      expectedStatus: 200,
      expectedContentType: 'text/html',
      expectedSubstring: '<div id="root">',
      htmlAssertions: {
        canonicalPath: '/totum-vegetal/',
        expectedTitleFragment: 'Le Totum Végétal : Comprendre la Synergie des Plantes',
        exactTitle: 'Le Totum Végétal : Comprendre la Synergie des Plantes',
        requireRootImg: true,
        requireRootH1: true,
        expectedH1Fragment: 'Le Totum Végétal',
        forbiddenSubstrings: ['décarboxylation', 'psoriasis', 'Souveraineté']
      },
      description: 'Page pilier /totum-vegetal/'
    },
    {
      path: '/cosmetiques-naturels-diy/',
      expectedStatus: 200,
      expectedContentType: 'text/html',
      expectedSubstring: '<div id="root">',
      htmlAssertions: {
        canonicalPath: '/cosmetiques-naturels-diy/',
        expectedTitleFragment: 'Cosmétique Botanique Maison : Macérâts, Sérums & Baumes',
        exactTitle: 'Cosmétique Botanique Maison : Macérâts, Sérums & Baumes',
        requireRootImg: true,
        requireRootH1: true,
        expectedH1Fragment: 'Cosmétique Botanique Maison',
        forbiddenSubstrings: ['décarboxylation']
      },
      description: 'Page pilier /cosmetiques-naturels-diy/'
    },
    {
      path: '/gastronomie-botanique/',
      expectedStatus: 200,
      expectedContentType: 'text/html',
      expectedSubstring: '<div id="root">',
      htmlAssertions: {
        canonicalPath: '/gastronomie-botanique/',
        expectedTitleFragment: 'Gastronomie Botanique : Huiles Parfumées & Infusions Culinaires',
        exactTitle: 'Gastronomie Botanique : Huiles Parfumées & Infusions Culinaires',
        requireRootImg: true,
        requireRootH1: true,
        expectedH1Fragment: 'Gastronomie Botanique',
        forbiddenSubstrings: ['décarboxylation']
      },
      description: 'Page pilier /gastronomie-botanique/'
    },
    {
      path: '/boutique/',
      expectedStatus: 200,
      expectedContentType: 'text/html',
      expectedSubstring: '100 recettes inclus',
      htmlAssertions: {
        canonicalPath: '/boutique/',
        expectedTitleFragment: 'Boutique',
        requireRootImg: true,
        requireRootH1: true,
        forbidProductSchema: true,
        forbiddenSubstrings: ['Purification Systémique', 'chélation interne', '3 mois d\'accès']
      },
      description: 'Boutique officielle (sans Product JSON-LD, Bibliothèque incluse)'
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
        forbidProductSchema: true,
        forbiddenSubstrings: ['Purification Systémique', 'chélation interne', 'détoxification profonde']
      },
      description: 'Fiche produit Duo Argiles (sans Product JSON-LD)'
    },
    {
      path: '/boutique/kit-nuit/',
      expectedStatus: 200,
      expectedContentType: 'text/html',
      expectedSubstring: '<div id="root">',
      htmlAssertions: {
        canonicalPath: '/boutique/kit-nuit/',
        expectedTitleFragment: 'Infusion Douceur du Soir',
        requireRootImg: true,
        requireRootH1: true,
        forbidProductSchema: true,
      },
      description: 'Fiche kit-nuit renommée (sans Product JSON-LD)'
    },
    {
      path: '/boutique/kit-digestion/',
      expectedStatus: 200,
      expectedContentType: 'text/html',
      expectedSubstring: '<div id="root">',
      htmlAssertions: {
        canonicalPath: '/boutique/kit-digestion/',
        expectedTitleFragment: 'Infusion Fraîcheur',
        requireRootImg: true,
        requireRootH1: true,
        forbidProductSchema: true,
      },
      description: 'Fiche kit-digestion renommée (sans Product JSON-LD)'
    },
    {
      path: '/boutique/kit-articulaire/',
      expectedStatus: 200,
      expectedContentType: 'text/html',
      expectedSubstring: '<div id="root">',
      htmlAssertions: {
        canonicalPath: '/boutique/kit-articulaire/',
        expectedTitleFragment: 'Infusion Souplesse',
        requireRootImg: true,
        requireRootH1: true,
        forbidProductSchema: true,
      },
      description: 'Fiche kit-articulaire renommée (sans Product JSON-LD)'
    },
    {
      path: '/boutique/kit-hiver/',
      expectedStatus: 200,
      expectedContentType: 'text/html',
      expectedSubstring: '<div id="root">',
      htmlAssertions: {
        canonicalPath: '/boutique/kit-hiver/',
        expectedTitleFragment: 'Infusion Épicée d',
        requireRootImg: true,
        requireRootH1: true,
        forbidProductSchema: true,
      },
      description: 'Fiche kit-hiver renommée (sans Product JSON-LD)'
    },
    {
      path: '/remedes-naturels/',
      expectedStatus: 200,
      expectedContentType: 'text/html',
      expectedSubstring: '<div id="root">',
      htmlAssertions: {
        canonicalPath: '/remedes-naturels/',
        expectedTitleFragment: 'Préparations & Infusions Botaniques Maison',
        requireRootImg: true,
        requireRootH1: true,
        expectedH1Fragment: 'Préparations & Infusions Botaniques Maison',
        forbiddenSubstrings: ['sphère ORL', 'récepteurs GABA', 'muqueuses gastriques', 'hépatobiliaire', 'stress chronique', 'Sphère Sommeil Profond']
      },
      description: 'Page /remedes-naturels/ indexable & sécurisée'
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
        forbiddenSubstrings: ['~3,8 mg', 'psoriasis', 'décalcification pinéale']
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
      description: 'Herbier scientifique Bloom'
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
        forbiddenSubstrings: ['privilégiez le programme Sans chauffe', '~3,8 mg', 'garantie constructeur 1 an']
      },
      description: 'Page Questions Fréquentes'
    },
    {
      path: '/route-inconnue-seo-test/',
      expectedStatus: 200,
      expectedContentType: 'text/html',
      htmlAssertions: {
        canonicalPath: '/route-inconnue-seo-test/',
        expectedTitleFragment: 'Route Inconnue Seo Test',
        requireRootH1: true,
      },
      description: 'Route non mappée -> titre unique + self-canonical (jamais /)'
    },
    // Chantier 3: Routes YMYL strictement noindex, nofollow + X-Robots-Tag + #root vide
    {
      path: '/academie/protocoles/psoriasis/',
      expectedStatus: 200,
      expectedContentType: 'text/html',
      htmlAssertions: {
        canonicalPath: '/academie/protocoles/psoriasis/',
        expectedTitleFragment: 'Dossier Terrain Cutané',
        requireEmptyRoot: true,
        expectedRobots: 'noindex, nofollow',
        expectedXRobotsTag: 'noindex, nofollow',
      },
      description: 'YMYL noindex, nofollow : /academie/protocoles/psoriasis/'
    },
    {
      path: '/academie/protocoles/sibo/',
      expectedStatus: 200,
      expectedContentType: 'text/html',
      htmlAssertions: {
        canonicalPath: '/academie/protocoles/sibo/',
        expectedTitleFragment: 'Dossier Terrain Digestif',
        requireEmptyRoot: true,
        expectedRobots: 'noindex, nofollow',
        expectedXRobotsTag: 'noindex, nofollow',
      },
      description: 'YMYL noindex, nofollow : /academie/protocoles/sibo/'
    },
    {
      path: '/academie/protocoles/decalcification-pineale/',
      expectedStatus: 200,
      expectedContentType: 'text/html',
      htmlAssertions: {
        canonicalPath: '/academie/protocoles/decalcification-pineale/',
        expectedTitleFragment: 'Dossier Rythme Circadien',
        requireEmptyRoot: true,
        expectedRobots: 'noindex, nofollow',
        expectedXRobotsTag: 'noindex, nofollow',
      },
      description: 'YMYL noindex, nofollow : /academie/protocoles/decalcification-pineale/'
    },
    {
      path: '/phytotherapie-reset/protocole-psoriasis/',
      expectedStatus: 200,
      expectedContentType: 'text/html',
      htmlAssertions: {
        canonicalPath: '/phytotherapie-reset/protocole-psoriasis/',
        expectedTitleFragment: 'Dossier Terrain Cutané',
        requireEmptyRoot: true,
        expectedRobots: 'noindex, nofollow',
        expectedXRobotsTag: 'noindex, nofollow',
      },
      description: 'YMYL noindex, nofollow : /phytotherapie-reset/protocole-psoriasis/'
    },
    {
      path: '/recettes/parcours-botaniques/remede-psoriasis-emonctoires-regulation/',
      expectedStatus: 200,
      expectedContentType: 'text/html',
      htmlAssertions: {
        canonicalPath: '/recettes/parcours-botaniques/remede-psoriasis-emonctoires-regulation/',
        expectedTitleFragment: 'Atelier Botanique',
        requireEmptyRoot: true,
        expectedRobots: 'noindex, nofollow',
        expectedXRobotsTag: 'noindex, nofollow',
      },
      description: 'Recette YMYL noindex, nofollow : remede-psoriasis-emonctoires-regulation'
    },
    {
      path: '/en/bloomlab/',
      expectedStatus: 200,
      expectedContentType: 'text/html',
      htmlAssertions: {
        canonicalPath: '/en/bloomlab/',
        expectedTitleFragment: 'BloomLab',
        expectedRobots: 'noindex, follow',
        expectedXRobotsTag: 'noindex, follow',
      },
      description: 'Route EN /en/bloomlab/ -> noindex, follow + X-Robots-Tag'
    },
    // Chantier 2: 12 redirections 301 sur host canonique bloombybotanik.com
    ...[
      ['/totum-definition', '/totum-vegetal/'],
      ['/solvants-extraction', '/guide-solvants/'],
      ['/infusion-precision', '/infusion-botanique-maison-comment-ca-marche/'],
      ['/infusion-botanique', '/infusion-botanique-maison-comment-ca-marche/'],
      ['/comprendre-le-corps/4-architectures', '/academie/comprendre-le-corps/4-architectures/'],
      ['/comprendre-le-corps/7-terrains', '/academie/comprendre-le-corps/7-terrains/'],
      ['/comprendre-le-corps/9-axes-historiques', '/academie/comprendre-le-corps/9-axes-historiques/'],
      ['/comprendre-le-corps/charge-allostatique', '/academie/comprendre-le-corps/charge-allostatique/'],
      ['/comprendre-le-corps/metabolisme-glucidique-insuline', '/academie/comprendre-le-corps/metabolisme-glucidique-insuline/'],
      ['/comprendre-le-corps/reset-homeostasique', '/academie/reset-homeostasique/'],
      ['/academie/comprendre-le-corps/reset-homeostasique', '/academie/reset-homeostasique/'],
      ['/comprendre-le-corps/comment-lire-le-modele-bloom', '/academie/comprendre-le-modele-bloom/'],
      ['/abonnement', '/bloomlab/'],
      ['/abonnements-numeriques', '/bloomlab/'],
      ['/boutique/abonnements-numeriques', '/bloomlab/'],
    ].map(([from, to]): RouteTestCase => ({
      path: from,
      headers: { Host: 'bloombybotanik.com' },
      expectedStatus: 301,
      expectedContentType: '',
      expectedLocation: to,
      description: `301 ${from} -> ${to}`
    })),
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
      description: 'Recette culinaire inconnue -> HTTP 404'
    },
    {
      path: '/recettes/culinaires/page/99/',
      expectedStatus: 404,
      expectedContentType: 'text/html',
      expectedSubstring: '<div id="root">',
      description: 'Pagination culinaire inexistante (page 99) -> HTTP 404'
    },
    {
      path: '/recettes/parcours-botaniques/page/2/',
      expectedStatus: 404,
      expectedContentType: 'text/html',
      expectedSubstring: '<div id="root">',
      description: 'Pagination parcours botaniques inexistante -> HTTP 404'
    },
    {
      path: '/robots.txt',
      expectedStatus: 200,
      expectedContentType: 'text/plain',
      expectedSubstring: 'Allow: /videos/',
      description: 'Fichier robots.txt avec Allow: /images/ et Allow: /videos/'
    },
    {
      path: '/sitemap.xml',
      expectedStatus: 200,
      expectedContentType: 'application/xml',
      expectedSubstring: '<sitemapindex',
      description: 'Sitemap index principal pointant vers sitemap-fr.xml & sitemap-recettes.xml'
    },
    {
      path: '/sitemap-fr.xml',
      expectedStatus: 200,
      expectedContentType: 'application/xml',
      expectedSubstring: 'https://bloombybotanik.com/infuseur-botanique/',
      description: 'Sitemap FR avec /infuseur-botanique/ & namespace image:image'
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
      path: '/videos/Full_BloomLab_Serum.mp4',
      method: 'HEAD',
      expectedStatus: 200,
      expectedContentType: 'video/mp4',
      description: 'Vidéo /videos/Full_BloomLab_Serum.mp4 (HTTP 200)'
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
    const res = await fetchHttp(tc.path, { method: tc.method, headers: tc.headers });
    const contentType = res.headers['content-type'] || '';

    if (res.statusCode !== tc.expectedStatus) {
      throw new Error(`[FAIL] ${tc.path}: Statut attendu ${tc.expectedStatus}, obtenu ${res.statusCode} (${tc.description})`);
    }

    if (tc.expectedLocation) {
      const location = res.headers['location'] || '';
      if (location !== tc.expectedLocation) {
        throw new Error(`[FAIL] ${tc.path}: Location attendue "${tc.expectedLocation}", obtenue "${location}"`);
      }
    }

    if (tc.expectedContentType) {
      const isXmlValid = tc.expectedContentType === 'application/xml'
        ? (contentType.includes('application/xml') || contentType.includes('text/xml'))
        : contentType.includes(tc.expectedContentType);
      if (!isXmlValid) {
        throw new Error(`[FAIL] ${tc.path}: Content-Type attendu ${tc.expectedContentType}, obtenu ${contentType}`);
      }
    }

    if (tc.expectedSubstring && !res.body.includes(tc.expectedSubstring)) {
      throw new Error(`[FAIL] ${tc.path}: Contenu attendu "${tc.expectedSubstring}" absent de la réponse`);
    }

    if (tc.htmlAssertions) {
      const ha = tc.htmlAssertions;
      const titleMatch = res.body.match(/<title>([^<]+)<\/title>/i);
      const title = titleMatch ? decodeBasicEntities(titleMatch[1].trim()) : '';
      if (!title || !title.toLowerCase().includes(ha.expectedTitleFragment.toLowerCase())) {
        throw new Error(`[FAIL] ${tc.path}: <title> "${title}" ne contient pas "${ha.expectedTitleFragment}"`);
      }
      if (ha.exactTitle && title !== ha.exactTitle) {
        throw new Error(`[FAIL] ${tc.path}: <title> exact attendu "${ha.exactTitle}", obtenu "${title}"`);
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

      if (ha.expectedRobots) {
        const robotsMatch = res.body.match(/<meta\s+name=["']robots["']\s+content=["']([^"']+)["']/i);
        const actualRobots = robotsMatch ? robotsMatch[1] : '';
        if (actualRobots !== ha.expectedRobots) {
          throw new Error(`[FAIL] ${tc.path}: meta robots attendu "${ha.expectedRobots}", obtenu "${actualRobots}"`);
        }
      }

      if (ha.expectedXRobotsTag) {
        const xRobots = String(res.headers['x-robots-tag'] || '');
        if (xRobots !== ha.expectedXRobotsTag) {
          throw new Error(`[FAIL] ${tc.path}: X-Robots-Tag attendu "${ha.expectedXRobotsTag}", obtenu "${xRobots}"`);
        }
      }

      if (ha.requireVideoObject && !/"@type"\s*:\s*"VideoObject"/.test(res.body)) {
        throw new Error(`[FAIL] ${tc.path}: Schema VideoObject attendu absent`);
      }
      if (ha.requireProductSchema && !/"@type"\s*:\s*"Product"/.test(res.body)) {
        throw new Error(`[FAIL] ${tc.path}: Schema Product attendu absent sur /bloomlab/`);
      }
      if (ha.forbidProductSchema && /"@type"\s*:\s*"Product"/.test(res.body)) {
        throw new Error(`[FAIL] ${tc.path}: Schema Product interdit détecté hors /bloomlab/`);
      }

      const rootBlock = extractRootBlock(res.body);
      if (ha.requireEmptyRoot) {
        if (!/<div id=["']root["']><\/div>/i.test(res.body)) {
          throw new Error(`[FAIL] ${tc.path}: <div id="root"></div> doit être vide sur route strict noindex`);
        }
      } else {
        if (ha.requireRootH1) {
          const h1Match = rootBlock.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
          if (!h1Match) {
            throw new Error(`[FAIL] ${tc.path}: Balise <h1> absente dans <div id="root">`);
          }
          if (ha.expectedH1Fragment) {
            const h1Text = decodeBasicEntities(h1Match[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim());
            if (!h1Text.toLowerCase().includes(ha.expectedH1Fragment.toLowerCase())) {
              throw new Error(`[FAIL] ${tc.path}: <h1> "${h1Text}" ne contient pas "${ha.expectedH1Fragment}"`);
            }
          }
        }
        if (ha.requireRootImg && !/<img[\s\S]*?src=["'](?:https:\/\/bloombybotanik\.com)?\/[^"']+["']/i.test(rootBlock)) {
          throw new Error(`[FAIL] ${tc.path}: Balise <img> réelle absente dans <div id="root">`);
        }
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

  // Contrôle robots.txt
  const robotsRes = await fetchHttp('/robots.txt');
  if (!robotsRes.body.includes('Allow: /images/') || !robotsRes.body.includes('Allow: /videos/')) {
    throw new Error('[FAIL] /robots.txt doit contenir Allow: /images/ et Allow: /videos/');
  }
  console.log('[PASS] Conformité /robots.txt (Allow: /images/ & Allow: /videos/).');
  passedCount++;

  // Contrôle des sitemaps : aucune fausse URL 404, aucun doublon, zéro URL YMYL/abonnement, zéro changefreq/priority
  const excludedSitemapPatterns = [
    'recette-inexistante',
    'page/99',
    '/totum-definition/',
    '/solvants-extraction/',
    '/infusion-precision/',
    '/infusion-botanique/',
    '/qu-est-ce-que-l-infusion-botanique/',
    '/academie/protocoles/psoriasis/',
    '/academie/protocoles/sibo/',
    '/academie/protocoles/decalcification-pineale/',
    'psoriasis',
    '/abonnement/',
    '/abonnements-numeriques/',
    '/boutique/abonnements-numeriques/',
    '/en/',
    '<changefreq>',
    '<priority>',
  ];
  for (const smPath of ['/sitemap.xml', '/sitemap-fr.xml', '/sitemap-recettes.xml']) {
    const smRes = await fetchHttp(smPath);
    for (const pat of excludedSitemapPatterns) {
      if (smRes.body.includes(pat)) {
        throw new Error(`[FAIL] Élément exclu "${pat}" détecté dans ${smPath} !`);
      }
    }
  }
  const smIndexRes = await fetchHttp('/sitemap.xml');
  if (!smIndexRes.body.includes('https://bloombybotanik.com/sitemap-fr.xml') || !smIndexRes.body.includes('https://bloombybotanik.com/sitemap-recettes.xml')) {
    throw new Error('[FAIL] /sitemap.xml doit pointer vers sitemap-fr.xml et sitemap-recettes.xml');
  }
  const smFrRes = await fetchHttp('/sitemap-fr.xml');
  if (!smFrRes.body.includes('xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"') || !smFrRes.body.includes('<image:image>')) {
    throw new Error('[FAIL] /sitemap-fr.xml doit inclure le namespace image:image et ses balises <image:image>');
  }
  const infuseurBlock = smFrRes.body.match(/<url>\s*<loc>https:\/\/bloombybotanik\.com\/infuseur-botanique\/<\/loc>[\s\S]*?<\/url>/);
  if (!infuseurBlock || !infuseurBlock[0].includes('<image:image>')) {
    throw new Error('[FAIL] /sitemap-fr.xml doit contenir /infuseur-botanique/ avec sa balise <image:image>');
  }
  const smRecettesRes = await fetchHttp('/sitemap-recettes.xml');
  if (smRecettesRes.body.includes('<lastmod>')) {
    throw new Error('[FAIL] /sitemap-recettes.xml ne doit plus contenir de <lastmod> générés en masse');
  }
  console.log('[PASS] Intégrité des sitemaps XML (/sitemap.xml, /sitemap-fr.xml, /sitemap-recettes.xml) : hygiène complète validée.');
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

  console.log(`=== ${passedCount}/${passedCount} contrôles HTTP, SEO, Images, Vidéo & Conformité validés avec succès ! ===\n`);
}

runHttpAndMetadataTests().catch((err) => {
  console.error('Erreur test HTTP & Métadonnées :', err);
  process.exit(1);
});
