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
  // Metadata for filtering
  tags: string[];
}

export const unifiedBotanicalDatabase: UnifiedPlant[] = [
  // Therapeutic Main Plants
  ...plantsDatabase.map(p => ({
    id: `therapeutic-${p.plant_id}`,
    name: p.nom_commun,
    latinName: p.nom_latin,
    source: 'therapeutic' as const,
    category: p.famille_bloom,
    description: p.preuve_scientifique,
    tags: [p.famille_bloom, 'Thérapeutique', ...(p.terrains_cibles || [])]
  })),

  // Therapeutic Additional Recipes
  ...plantsDatabase.flatMap(p => 
    (p.additional_recipes || []).map(r => ({
      id: `therapeutic-recipe-${r.id}`,
      name: r.title,
      latinName: p.nom_latin,
      source: 'therapeutic' as const,
      category: p.famille_bloom,
      description: r.goal,
      tags: [p.famille_bloom, 'Thérapeutique', 'Recette Spécifique', ...(p.terrains_cibles || [])]
    }))
  ),

  // Herbarium Extra Recipes (from recipesData.ts)
  ...herbariumRecipes.map(r => ({
    id: `extra-recipe-${r.id}`,
    name: r.title,
    latinName: r.plant.name,
    source: 'therapeutic' as const,
    category: 'Protocole Spécifique',
    description: r.goal,
    tags: ['Thérapeutique', 'Recette Spécifique', r.plant.name]
  })),

  // Culinary Recipes (Flattened variants)
  ...culinaryDatabase.flatMap(p => {
    const variants: { type: string, usage: string }[] = [];
    if (p.parametres_bloomlab.huile_finition) variants.push({ type: 'Huile', usage: p.parametres_bloomlab.huile_finition.usage });
    if (p.parametres_bloomlab.beurre_ghee) variants.push({ type: 'Beurre/Ghee', usage: p.parametres_bloomlab.beurre_ghee.usage });
    if (p.parametres_bloomlab.miel) variants.push({ type: 'Miel', usage: p.parametres_bloomlab.miel.usage });
    if (p.parametres_bloomlab.vinaigre) variants.push({ type: 'Vinaigre', usage: p.parametres_bloomlab.vinaigre.usage });
    if (p.parametres_bloomlab.sucre) variants.push({ type: 'Sucre', usage: p.parametres_bloomlab.sucre.usage });

    return variants.map(v => ({
      id: `culinary-${p.plant_id}-${v.type.toLowerCase().replace(/\//g, '-')}`,
      name: `${p.nom_commun} (${v.type})`,
      source: 'culinary' as const,
      category: 'Culinaire',
      description: `${p.profil_aromatique} - ${v.usage}`,
      tags: ['Culinaire', v.type, ...(p.synergies_aliments || [])]
    }));
  }),

  // Cosmetic Recipes
  ...cosmeticsRecipes.map(r => ({
    id: `cosmetic-${r.plant_id}`,
    name: r.nom_commun.split('—')[0].trim(),
    source: 'cosmetic' as const,
    category: 'Cosmétique',
    description: r.cible,
    tags: ['Cosmétique', r.categorie, r.peau]
  }))
];
