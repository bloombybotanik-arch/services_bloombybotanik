import { plantsDatabase } from './therapeuticData';
import { culinaryDatabase } from './culinaryData';
import { cosmeticsRecipes } from '../cosmeticsData';
import { herbariumRecipes } from './recipesData';

export type PlantSource = 'therapeutic' | 'culinary' | 'cosmetic';

export interface UnifiedPlant {
  id: string;
  name: string;
  latinName?: string;
  source: PlantSource;
  category: string;
  description: string;
  image?: string;
  tags: string[];
}

export const unifiedBotanicalDatabase: UnifiedPlant[] = [
  // Therapeutic Main Plants
  ...(Array.isArray(plantsDatabase) ? plantsDatabase : []).map((p: any) => ({
    id: `therapeutic-${p.plant_id || p.id}`,
    name: p.nom_commun || p.name || 'Plante',
    latinName: p.nom_latin || p.latin,
    source: 'therapeutic' as const,
    category: p.famille_bloom || 'Herboristerie',
    description: p.preuve_scientifique || p.description || '',
    tags: [p.famille_bloom || 'Herboristerie', 'Thérapeutique', ...(p.terrains_cibles || [])]
  })),

  // Herbarium Extra Recipes (from recipesData.ts)
  ...(Array.isArray(herbariumRecipes) ? herbariumRecipes : []).map((r: any) => ({
    id: `extra-recipe-${r.id}`,
    name: r.title,
    latinName: r.plant?.name || '',
    source: 'therapeutic' as const,
    category: 'Protocole Spécifique',
    description: r.goal || r.description || '',
    tags: ['Thérapeutique', 'Recette Spécifique', r.plant?.name || 'Botanique']
  })),

  // Culinary Recipes
  ...(Array.isArray(culinaryDatabase) ? culinaryDatabase : []).map((p: any) => ({
    id: `culinary-${p.id || p.plant_id}`,
    name: p.name || p.nom_commun || 'Recette Culinaire',
    source: 'culinary' as const,
    category: 'Culinaire',
    description: p.description || p.profil_aromatique || '',
    tags: ['Culinaire', ...(p.tags || [])]
  })),

  // Cosmetic Recipes
  ...(Array.isArray(cosmeticsRecipes) ? cosmeticsRecipes : []).map((r: any) => ({
    id: `cosmetic-${r.id || r.plant_id}`,
    name: (r.title || r.nom_commun || 'Soin Cosmétique').split('—')[0].trim(),
    source: 'cosmetic' as const,
    category: 'Cosmétique',
    description: r.summary || r.cible || '',
    tags: ['Cosmétique', r.category || 'Soin']
  }))
];

export default unifiedBotanicalDatabase;
