import { HERBIER_RECIPES, HerbierRecipe } from './herbierRecipesRegistry';
import { PlantData } from './therapeuticData';

export type PlantSource = 'therapeutic' | 'culinary' | 'cosmetic';

export interface UnifiedPlant {
  id: string;
  name: string;
  latinName?: string;
  source: PlantSource;
  category: string;
  description: string;
  image?: string;
  // Metadata for filtering
  tags: string[];
  slug?: string;
  canonicalUrl?: string;
  difficultyLevel?: number;
  difficultyLabel?: string;
  totalTimeMinutes?: number;
  tempSachetA?: string;
  tempSachetB?: string;
  terrains?: string[];
  axes?: string[];
}

const BOTANICAL_ROOT_ILLUSTRATIONS = [
  '/assets/images/botanical_roots_hero_1790693840047.jpg',
  '/assets/images/botanical_roots_hepatic_1790693867525.jpg',
  '/assets/images/botanical_roots_emonctoires_1790693854850.jpg',
  '/assets/images/botanical_roots_vitality_1790693881999.jpg'
];

function getBotanicalImage(recipe: HerbierRecipe, index: number): string {
  // If recipe has an explicit non-lifestyle, non-landscape, non-OG image, keep it
  if (recipe.image && 
      !recipe.image.includes('infusion_sommeil_profond') && 
      !recipe.image.includes('strength_courage') &&
      !recipe.image.includes('/images/og/')) {
    return recipe.image;
  }

  const name = (recipe.title || '').toLowerCase();
  const terrains = (recipe.terrains || []).join(' ').toLowerCase();

  // Thematic botanical engraving assignments
  if (name.includes('artichaut') || name.includes('foie') || name.includes('radis') || name.includes('chrysanthellum') || terrains.includes('t2') || terrains.includes('t1')) {
    return '/assets/images/botanical_roots_hepatic_1790693867525.jpg';
  }
  if (name.includes('drainage') || name.includes('bardane') || name.includes('pissenlit') || name.includes('émonctoire') || terrains.includes('t3') || terrains.includes('t4')) {
    return '/assets/images/botanical_roots_emonctoires_1790693854850.jpg';
  }
  if (name.includes('vital') || name.includes('sommeil') || name.includes('adaptogène') || name.includes('chaga') || name.includes('cordyceps') || name.includes('rhodiola') || terrains.includes('t5') || terrains.includes('t6')) {
    return '/assets/images/botanical_roots_vitality_1790693881999.jpg';
  }

  // Deterministic assignment of botanical root illustration based on identifier
  const key = recipe.id || recipe.title || String(index);
  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    hash = (hash * 31 + key.charCodeAt(i)) >>> 0;
  }
  return BOTANICAL_ROOT_ILLUSTRATIONS[hash % BOTANICAL_ROOT_ILLUSTRATIONS.length];
}

// Master official 163 botanical recipes catalogue of Bloom by BotaniK
export const unifiedBotanicalDatabase: UnifiedPlant[] = HERBIER_RECIPES.map((r, index) => ({
  id: r.id,
  name: r.title,
  latinName: r.subtitle || r.title,
  source: (r.category === 'phytotherapie' ? 'therapeutic' : r.category === 'cosmetique' ? 'cosmetic' : 'culinary') as PlantSource,
  category: r.categoryLabel || (r.category === 'phytotherapie' ? 'Phytothérapie' : r.category === 'cosmetique' ? 'Cosmétique' : 'Gastronomie Botanique'),
  description: r.subtitle || (r.instructions && r.instructions[0]) || '',
  image: getBotanicalImage(r, index),
  tags: [
    r.categoryLabel || 'Botanique',
    r.category === 'phytotherapie' ? 'Thérapeutique' : r.category === 'cosmetique' ? 'Cosmétique' : 'Culinaire',
    ...(r.terrains || []),
    ...(r.axes || [])
  ],
  slug: r.slug,
  canonicalUrl: r.canonicalUrl,
  difficultyLevel: r.difficultyLevel,
  difficultyLabel: r.difficultyLabel,
  totalTimeMinutes: r.totalTimeMinutes,
  tempSachetA: r.tempSachetA,
  tempSachetB: r.tempSachetB,
  terrains: r.terrains,
  axes: r.axes
}));

export default unifiedBotanicalDatabase;
