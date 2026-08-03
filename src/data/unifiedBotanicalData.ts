import { plantsDatabase } from './therapeuticData';
import { culinaryDatabase } from './culinaryData';
import { cosmeticsRecipes } from '../cosmeticsData';

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
  // Therapeutic
  ...plantsDatabase.map(p => ({
    id: `therapeutic-${p.plant_id}`,
    name: p.nom_commun,
    latinName: p.nom_latin,
    source: 'therapeutic' as const,
    category: p.famille_bloom,
    description: p.preuve_scientifique,
    tags: [p.famille_bloom, 'Thérapeutique', ...(p.terrains_cibles || [])]
  })),
  // Culinary
  ...culinaryDatabase.map(p => ({
    id: `culinary-${p.plant_id}`,
    name: p.nom_commun,
    source: 'culinary' as const,
    category: 'Culinaire',
    description: p.profil_aromatique,
    tags: ['Culinaire', ...(p.synergies_aliments || [])]
  })),
  // Cosmetic
  ...cosmeticsRecipes.map(r => ({
    id: `cosmetic-${r.plant_id}`,
    name: r.nom_commun.split('—')[0].trim(),
    source: 'cosmetic' as const,
    category: 'Cosmétique',
    description: r.cible,
    tags: ['Cosmétique', r.categorie, r.peau]
  }))
];
