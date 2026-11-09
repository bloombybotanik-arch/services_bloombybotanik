import { createServer } from 'vite';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

/**
 * Ce script teste le rendu SSR de l'application entière (<App />) sous Node.js via le module loader de Vite.
 *
 * LIMITES DOCUMENTÉES :
 * - Il teste le rendu initial serveur (renderToString) de l'arbre complet <App /> avec les dictionnaires réels.
 * - Les objets window et document sont des simulacres minimaux (mocks) réinitialisés à chaque itération.
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
    requiredSubstrings: ['Vue Extracteur', 'Pack Signature', 'Marque Botanique'],
    forbiddenSubstrings: ['comprendre-infusion-botanique', 'Recette introuvable']
  },
  {
    name: 'Guide /guide',
    route: '/guide',
    requiredSubstrings: ['comprendre-infusion-botanique', 'Extraction Botanique'],
    forbiddenSubstrings: ['Vue Extracteur', 'Recette introuvable']
  },
  {
    name: 'Boutique /boutique',
    route: '/boutique',
    requiredSubstrings: ['Boutique Officielle Bloom by BotaniK', 'Rechercher un produit'],
    forbiddenSubstrings: ['comprendre-infusion-botanique', 'Vue Extracteur']
  },
  {
    name: 'Machine /bloomlab',
    route: '/bloomlab',
    requiredSubstrings: ['BloomLab', 'Totum'],
    forbiddenSubstrings: ['Recette introuvable']
  },
  {
    name: 'Hub Recettes /recettes/',
    route: '/recettes/',
    requiredSubstrings: ['Toutes les recettes', 'Recettes botaniques : cuisine et cosmétique maison'],
    forbiddenSubstrings: ['Recette introuvable']
  },
  {
    name: 'Catégorie Culinaires Page 1',
    route: '/recettes/culinaires/',
    requiredSubstrings: ['Recettes culinaires botaniques', 'Huile infusée au Romarin'],
    forbiddenSubstrings: ['Recette introuvable']
  },
  {
    name: 'Catégorie Culinaires Page 2 (pagination réelle)',
    route: '/recettes/culinaires/page/2/',
    requiredSubstrings: ['Recettes culinaires botaniques', 'Page 2', 'Vinaigre botanique'],
    forbiddenSubstrings: ['Huile infusée au Romarin', 'Recette introuvable']
  },
  {
    name: 'Catégorie Cosmétiques Page 1',
    route: '/recettes/cosmetiques/',
    requiredSubstrings: ['Recettes cosmétiques botaniques maison', 'Huile de soin au Calendula'],
    forbiddenSubstrings: ['Recette introuvable']
  },
  {
    name: 'Catégorie Parcours Botaniques',
    route: '/recettes/parcours-botaniques/',
    requiredSubstrings: ['Parcours botaniques guidés', 'Parcours d&#x27;initiation'],
    forbiddenSubstrings: ['Recette introuvable']
  },
  {
    name: 'Fiche Culinaire (cul-01)',
    route: '/recettes/culinaires/huile-infusee-romarin/',
    requiredSubstrings: ['Huile infusée au Romarin', 'Ingrédients', 'Rosmarinus officinalis'],
    forbiddenSubstrings: ['Recette introuvable', 'Toutes les recettes']
  },
  {
    name: 'Fiche Cosmétique (cosm-01)',
    route: '/recettes/cosmetiques/huile-de-soin-calendula/',
    requiredSubstrings: ['Huile de soin au Calendula', 'Calendula officinalis'],
    forbiddenSubstrings: ['Recette introuvable', 'Toutes les recettes']
  },
  {
    name: 'Fiche Parcours (parc-01)',
    route: '/recettes/parcours-botaniques/parcours-extraction-basse-temperature/',
    requiredSubstrings: ['Extraction Solvantée Basse Température', 'polarité haute'],
    forbiddenSubstrings: ['Recette introuvable', 'Toutes les recettes']
  },
  {
    name: 'Recette Inexistante (404 UI)',
    route: '/recettes/culinaires/recette-inexistante-404/',
    requiredSubstrings: ['Recette introuvable', 'Erreur 404', 'Retour au catalogue public'],
    forbiddenSubstrings: ['Ingrédients & Matières premières', 'schema.org/Recipe']
  },
  {
    name: 'Pagination Inexistante (404 UI)',
    route: '/recettes/culinaires/page/99/',
    requiredSubstrings: ['Recette introuvable', 'Erreur 404', 'Retour au catalogue public'],
    forbiddenSubstrings: ['Page 99', 'schema.org/Recipe']
  },
  {
    name: 'FAQ /faq',
    route: '/faq',
    requiredSubstrings: ['FaqContent', 'Herboristerie moderne'],
    forbiddenSubstrings: ['Recette introuvable']
  },
  {
    name: 'Contact /contact',
    route: '/contact',
    requiredSubstrings: ['ContactContent', 'Herboristerie moderne'],
    forbiddenSubstrings: ['Recette introuvable']
  },
  {
    name: 'Lexique /lexique',
    route: '/lexique',
    requiredSubstrings: ['Lexique Fondateur Bloom', 'Corpus Scientifique'],
    forbiddenSubstrings: ['Recette introuvable']
  },
  {
    name: 'Académie /academie',
    route: '/academie',
    requiredSubstrings: ['Comprendre le modèle Bloom', 'Bloom by BotaniK'],
    forbiddenSubstrings: ['Recette introuvable']
  }
];

async function runSsrRenderTests() {
  console.log('=== Test d\'évaluation et rendu SSR React avec assertions de contenu ===\n');

  const vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom'
  });

  let passed = 0;

  for (const tc of TEST_CASES) {
    // Réinitialisation stricte des mocks pour chaque cas
    (globalThis as any).window = {
      location: {
        pathname: tc.route,
        search: '',
        href: `http://localhost:3000${tc.route}`,
      },
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
      // Rechargement du module App pour isoler l'état initial
      const appModule = await vite.ssrLoadModule('/src/App.tsx');
      const App = appModule.default;
      const rawHtml = ReactDOMServer.renderToString(React.createElement(App));
      // Normalisation des commentaires React SSR (ex: Page <!-- -->2)
      const html = rawHtml.replace(/<!-- -->/g, '');

      // 1. Contrôle des chaînes obligatoires
      for (const required of tc.requiredSubstrings) {
        if (!html.includes(required)) {
          throw new Error(`Sous-chaîne obligatoire manquante "${required}" sur ${tc.route}`);
        }
      }

      // 2. Contrôle des chaînes interdites (détection de mauvais fallback)
      for (const forbidden of tc.forbiddenSubstrings) {
        if (html.includes(forbidden)) {
          throw new Error(`Sous-chaîne interdite détectée "${forbidden}" sur ${tc.route} (mauvais fallback)`);
        }
      }

      console.log(`[PASS] ${tc.name.padEnd(45)} -> ${tc.route} (${html.length} car.)`);
      passed++;
    } catch (err: any) {
      console.error(`[FAIL] ${tc.name} (${tc.route}): ${err.message}`);
      await vite.close();
      process.exit(1);
    }
  }

  await vite.close();
  console.log(`\n=== Succès : ${passed}/${TEST_CASES.length} cas de test SSR validés avec assertions positives et négatives ! ===\n`);
}

runSsrRenderTests().catch((err) => {
  console.error('Erreur critique SSR:', err);
  process.exit(1);
});
