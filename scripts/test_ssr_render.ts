import { createServer } from 'vite';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import {
  renderHubPageHtml,
  renderCategoryPageHtml,
  renderRecipePageHtml
} from '../src/server/recipeSsrRenderer';
import { getRecipeByPath } from '../src/data/canonicalRecipesRegistry';

/**
 * Ce script teste :
 * 1. Le rendu SSR de l'application React entière (<App />) sous Node.js via le module loader de Vite.
 * 2. Le moteur de rendu SSR dédié au catalogue & fiches recettes (/recettes/*).
 *
 * LIMITES DOCUMENTÉES :
 * - Il teste le rendu initial serveur (renderToString) et les fonctions de rendu SSR HTML sous Node.js.
 * - Les objets window, document et localStorage sont des simulacres minimaux (mocks) réinitialisés à chaque itération.
 * - Ce script NE TESTE PAS :
 *   1. L'exécution réelle dans un moteur de navigateur (Chromium, Firefox, Safari).
 *   2. Le cycle de vie post-montage (effets useEffect du client, timers, écouteurs d'événements).
 *   3. Le rendu dans l'iframe Google AI Studio.
 */

interface SsrTestCase {
  name: string;
  route: string;
  requiredSubstrings: string[];
  forbiddenSubstrings: string[];
}

const TEST_CASES: SsrTestCase[] = [
  {
    name: 'Accueil /',
    route: '/',
    requiredSubstrings: ['BloomLab®', 'Extracteur Botanique de Précision', 'Totum Végétal'],
    forbiddenSubstrings: ['comprendre-infusion-botanique', 'Recette introuvable', '~3,8 mg', 'alcool chauffé en cuve suspendu']
  },
  {
    name: 'Guide /infusion-botanique-maison-comment-ca-marche/',
    route: '/infusion-botanique-maison-comment-ca-marche/',
    requiredSubstrings: ['Infusion botanique maison', 'BloomLab®'],
    forbiddenSubstrings: ['Recette introuvable', '~3,8 mg', 'Sans chauffe 4']
  },
  {
    name: 'Boutique /boutique/',
    route: '/boutique/',
    requiredSubstrings: ['Boutique Bloom by BotaniK', 'BloomLab'],
    forbiddenSubstrings: ['comprendre-infusion-botanique', 'Purification Systémique', 'chélation interne']
  },
  {
    name: 'Produit Duo Argiles /boutique/duo-argiles/',
    route: '/boutique/duo-argiles/',
    requiredSubstrings: ['Duo Argiles', 'Zéolithe', 'Bentonite'],
    forbiddenSubstrings: ['Recette introuvable', 'Purification Systémique', 'chélation interne']
  },
  {
    name: 'Produit Kit Starter /boutique/kit-starter/',
    route: '/boutique/kit-starter/',
    requiredSubstrings: ['SÈVE FONDAMENTALE', 'BloomLab'],
    forbiddenSubstrings: ['Recette introuvable', 'Produit Alimentaire / Cosmétique', 'usage cosmétique']
  },
  {
    name: 'Machine /bloomlab/',
    route: '/bloomlab/',
    requiredSubstrings: ['BloomLab', 'Totum'],
    forbiddenSubstrings: ['Recette introuvable', 'sans surveillance pendant', 'fonctionnement autonome']
  },
  {
    name: 'Guide Solvants /guide-solvants/',
    route: '/guide-solvants/',
    requiredSubstrings: ['Le Guide des Solvants', 'BloomLab'],
    forbiddenSubstrings: ['Recette introuvable', '~3,8 mg', 'Sans chauffe 4']
  },
  {
    name: 'Extraction Botanique /extraction-botanique/',
    route: '/extraction-botanique/',
    requiredSubstrings: ['Guide Complet : Extraction Botanique', 'BloomLab'],
    forbiddenSubstrings: ['Recette introuvable', '~3,8 mg', '3,8 mg par tasse', 'Sans chauffe 4']
  },
  {
    name: 'Académie Femme /academie/pouvoir-cyclique-femme/ (EMA Sauge)',
    route: '/academie/pouvoir-cyclique-femme/',
    requiredSubstrings: ['17,6 %', '6 mg/jour', '2 semaines'],
    forbiddenSubstrings: ['~3,8 mg', '3,8 mg par tasse', 'Sans chauffe 4']
  },
  {
    name: 'Catalogue React Recettes /recettes/',
    route: '/recettes/',
    requiredSubstrings: ['Les Recettes Bloom', 'Créations Botaniques Maison'],
    forbiddenSubstrings: ['Recette introuvable', '~3,8 mg']
  },
  {
    name: 'FAQ /questions-frequentes/',
    route: '/questions-frequentes/',
    requiredSubstrings: ['Questions Fréquentes', 'BloomLab'],
    forbiddenSubstrings: ['Recette introuvable', 'privilégiez le programme Sans chauffe']
  },
  {
    name: 'Contact /contact/',
    route: '/contact/',
    requiredSubstrings: ['Nous Contacter', 'Bloom'],
    forbiddenSubstrings: ['Recette introuvable']
  },
  {
    name: 'Lexique /lexique/',
    route: '/lexique/',
    requiredSubstrings: ['Lexique Fondateur Bloom', 'Charge allostatique'],
    forbiddenSubstrings: ['Recette introuvable']
  },
  {
    name: 'Académie /academie/',
    route: '/academie/',
    requiredSubstrings: ['La méthode Bloom', 'Comprendre le Corps'],
    forbiddenSubstrings: ['Recette introuvable']
  }
];

async function runSsrRenderTests() {
  console.log("=== Test d'évaluation et rendu SSR React + Renderer Recettes ===\n");

  const vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom'
  });

  let passed = 0;

  for (const tc of TEST_CASES) {
    const store = new Map<string, string>();
    const storageMock = {
      getItem: (k: string) => (store.has(k) ? store.get(k)! : null),
      setItem: (k: string, v: string) => { store.set(k, String(v)); },
      removeItem: (k: string) => { store.delete(k); },
      clear: () => { store.clear(); }
    };

    (globalThis as any).localStorage = storageMock;
    (globalThis as any).window = {
      location: {
        pathname: tc.route,
        search: '',
        href: `http://localhost:3000${tc.route}`,
      },
      localStorage: storageMock,
      addEventListener: () => {},
      removeEventListener: () => {},
      scrollTo: () => {},
      document: {
        title: '',
        querySelector: () => null,
        querySelectorAll: () => [],
        getElementById: () => null,
      }
    };

    try {
      const appModule = await vite.ssrLoadModule('/src/App.tsx');
      const App = appModule.default;
      const rawHtml = ReactDOMServer.renderToString(React.createElement(App));
      const html = rawHtml.replace(/<!-- -->/g, '');

      for (const required of tc.requiredSubstrings) {
        if (!html.includes(required)) {
          throw new Error(`Sous-chaîne obligatoire manquante "${required}" sur ${tc.route}`);
        }
      }

      for (const forbidden of tc.forbiddenSubstrings) {
        if (html.toLowerCase().includes(forbidden.toLowerCase())) {
          throw new Error(`Sous-chaîne interdite détectée "${forbidden}" sur ${tc.route}`);
        }
      }

      console.log(`[PASS] ${tc.name.padEnd(55)} -> ${tc.route} (${html.length} car.)`);
      passed++;
    } catch (err: any) {
      console.error(`[FAIL] ${tc.name} (${tc.route}): ${err.message}`);
      await vite.close();
      process.exit(1);
    }
  }

  await vite.close();

  // Contrôles directs du moteur SSR Recettes (pagination, schémas, 404)
  const hub = renderHubPageHtml();
  if (!hub.bodyHtml.includes('Sélection de recettes récentes') || !hub.bodyHtml.includes('/recettes/culinaires/')) {
    throw new Error('[FAIL] renderHubPageHtml() incomplet');
  }
  console.log('[PASS] Renderer SSR Recettes : Hub /recettes/');
  passed++;

  const culP1 = renderCategoryPageHtml('culinaires', 1);
  const culP2 = renderCategoryPageHtml('culinaires', 2);
  const culP99 = renderCategoryPageHtml('culinaires', 99);
  if (!culP1 || !culP1.bodyHtml.includes('Sirop Traditionnel de Sureau')) {
    throw new Error('[FAIL] renderCategoryPageHtml(culinaires, 1) invalide');
  }
  if (!culP2 || !culP2.bodyHtml.includes('Curcuma — Beurre clarifié') || culP2.bodyHtml.includes('Sirop Traditionnel de Sureau')) {
    throw new Error('[FAIL] renderCategoryPageHtml(culinaires, 2) invalide');
  }
  if (culP99 !== null) {
    throw new Error('[FAIL] renderCategoryPageHtml(culinaires, 99) aurait dû retourner null (404)');
  }
  console.log('[PASS] Renderer SSR Recettes : Catégorie Culinaires (Page 1, Page 2, 404 Page 99)');
  passed++;

  const cosmP1 = renderCategoryPageHtml('cosmetiques', 1);
  const parcP1 = renderCategoryPageHtml('parcours-botaniques', 1);
  const parcP2 = renderCategoryPageHtml('parcours-botaniques', 2);
  if (!cosmP1 || !cosmP1.bodyHtml.includes('Baume à Lèvres au Calendula')) {
    throw new Error('[FAIL] renderCategoryPageHtml(cosmetiques, 1) invalide');
  }
  if (!parcP1 || !parcP1.bodyHtml.includes('Teinture Mère de Propolis Maison') || parcP2 !== null) {
    throw new Error('[FAIL] renderCategoryPageHtml(parcours-botaniques) invalide');
  }
  console.log('[PASS] Renderer SSR Recettes : Catégories Cosmétiques & Parcours Botaniques (404 Page 2)');
  passed++;

  const recCul = getRecipeByPath('/recettes/culinaires/sirop-sureau-immunite/');
  const recCosm = getRecipeByPath('/recettes/cosmetiques/baume-levres-calendula/');
  const recParc = getRecipeByPath('/recettes/parcours-botaniques/teinture-propolis-maison/');
  const recMissing = getRecipeByPath('/recettes/culinaires/recette-inexistante-404/');
  if (!recCul || !recCosm || !recParc || recMissing !== undefined) {
    throw new Error('[FAIL] Résolution getRecipeByPath() incohérente');
  }
  const recCulHtml = renderRecipePageHtml(recCul);
  const recCosmHtml = renderRecipePageHtml(recCosm);
  const recParcHtml = renderRecipePageHtml(recParc);
  if (!recCulHtml.jsonLd.includes('"@type": "Recipe"') || recCosmHtml.jsonLd.includes('"@type": "Recipe"') || recParcHtml.jsonLd.includes('"@type": "Recipe"')) {
    throw new Error('[FAIL] Schema.org Recipe/Article mal assigné');
  }
  console.log('[PASS] Renderer SSR Recettes : Fiches canoniques & Schema.org Recipe/Article');
  passed++;

  console.log(`\n=== Succès : ${passed}/${TEST_CASES.length + 4} cas de test SSR validés avec assertions positives et négatives ! ===\n`);
}

runSsrRenderTests().catch((err) => {
  console.error('Erreur critique SSR:', err);
  process.exit(1);
});
