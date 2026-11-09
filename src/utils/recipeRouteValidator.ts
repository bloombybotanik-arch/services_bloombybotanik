import { CANONICAL_RECIPES, CanonicalRecipe } from '../data/canonicalRecipesRegistry';

export const RECIPES_PER_PAGE = 2;

export interface RecipeRouteValidation {
  isValid: boolean;
  type: 'hub' | 'category' | 'detail' | 'not-found';
  category?: 'culinaires' | 'cosmetiques' | 'parcours-botaniques' | 'hub';
  pageNum?: number;
  recipe?: CanonicalRecipe;
}

/**
 * Valide rigoureusement une route sous /recettes/ contre le registre canonique et la pagination réelle.
 */
export function validateRecipeRoute(pathname: string): RecipeRouteValidation {
  // Nettoyage de l'URL : suppression des query params et trailing slash éventuels
  const clean = pathname.split('?')[0].replace(/\/$/, '') || '/';

  if (!clean.startsWith('/recettes')) {
    return { isValid: false, type: 'not-found' };
  }

  // 1. Hub racine
  if (clean === '/recettes') {
    return { isValid: true, type: 'hub', category: 'hub', pageNum: 1 };
  }

  const hubPageMatch = clean.match(/^\/recettes\/page\/(\d+)$/);
  if (hubPageMatch) {
    const page = parseInt(hubPageMatch[1], 10);
    const totalPages = Math.max(1, Math.ceil(CANONICAL_RECIPES.length / 6));
    if (page >= 1 && page <= totalPages) {
      return { isValid: true, type: 'hub', category: 'hub', pageNum: page };
    }
    return { isValid: false, type: 'not-found' };
  }

  // 2. Catégories et pagination par catégorie
  const categories: Array<'culinaires' | 'cosmetiques' | 'parcours-botaniques'> = [
    'culinaires',
    'cosmetiques',
    'parcours-botaniques'
  ];

  for (const cat of categories) {
    const catBase = `/recettes/${cat}`;
    if (clean === catBase) {
      return { isValid: true, type: 'category', category: cat, pageNum: 1 };
    }

    const catPageMatch = clean.match(new RegExp(`^${catBase}/page/(\\d+)$`));
    if (catPageMatch) {
      const page = parseInt(catPageMatch[1], 10);
      const catFilter = cat === 'culinaires' ? 'culinaire' : (cat === 'cosmetiques' ? 'cosmetique' : 'parcours-guide');
      const count = CANONICAL_RECIPES.filter((r) => r.category === catFilter).length;
      const totalPages = Math.max(1, Math.ceil(count / RECIPES_PER_PAGE));
      if (page >= 1 && page <= totalPages) {
        return { isValid: true, type: 'category', category: cat, pageNum: page };
      }
      return { isValid: false, type: 'not-found' };
    }
  }

  // 3. Fiches de recettes canoniques exactes
  for (const r of CANONICAL_RECIPES) {
    const rClean = r.canonicalUrl.replace(/\/$/, '');
    if (clean === rClean) {
      const cat = r.category === 'culinaire' ? 'culinaires' : (r.category === 'cosmetique' ? 'cosmetiques' : 'parcours-botaniques');
      return { isValid: true, type: 'detail', category: cat, recipe: r };
    }
  }

  // 4. Toute autre URL sous /recettes/ est une ressource introuvable (404)
  return { isValid: false, type: 'not-found' };
}
