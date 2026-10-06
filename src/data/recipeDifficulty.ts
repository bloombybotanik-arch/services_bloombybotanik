/**
 * BLOOM BY BOTANIK — MOTEUR D'AUDIT ET DE CALCUL DE DIFFICULTÉ DES RECETTES
 * 
 * Normes techniques & déontologiques :
 * - Mesure la complexité technique de réalisation à domicile avec BloomLab.
 * - Ne diagnostique ni ne traite aucune maladie.
 * - Précise 'Usage externe' pour les cosmétiques et rappelle la vocation éducative des parcours botaniques.
 */

export type RecipeCategory = 'culinaire' | 'cosmetique' | 'parcours-guide';
export type DifficultyConfidence = 'high' | 'medium' | 'low';
export type DifficultyLevel = 1 | 2 | 3 | 4 | 5;
export type DifficultyLabel = 'Très facile' | 'Facile' | 'Intermédiaire' | 'Avancé' | 'Expert';

export interface DifficultyBreakdown {
  active_steps: number;
  ingredients: number;
  extraction_phases: number;
  thermal_precision: number;
  preparation_precision: number;
  filtration_assembly: number;
  user_attention: number;
  conservation: number;
  safety_handling: number;
}

export interface RecipeDifficultyMetadata {
  id: string;
  title: string;
  url: string;
  status: 'publiée' | 'brouillon' | 'premium' | 'freemium' | 'archivage';
  category: RecipeCategory;
  subcategory: string;
  ingredientCount: number;
  activeStepCount: number;
  extractionPhaseCount: number;
  temperatures: string;
  machineTimeMinutes: number;
  activeTimeMinutes: number;
  totalTimeMinutes: number;
  filtrationRequired: boolean;
  assemblyRequired: boolean;
  conservationRequirement: string;
  allergensOrPrecautions: string[];
  materialsNeeded: string[];
  keySteps: string[];
  difficultyCalculatedScore: number;
  difficultyFinalScore: number;
  difficultyLevel: DifficultyLevel;
  difficultyLabel: DifficultyLabel;
  difficultyReason: string;
  difficultyConfidence: DifficultyConfidence;
  breakdown: DifficultyBreakdown;
  difficultyOverrideReason?: string | null;
  difficultyReviewedBy: string;
  difficultyReviewedAt: string;
  missingData: string[];
  humanReviewRequired: boolean;
}

export function computeDifficultyScore(raw: {
  active_steps_count: number;
  ingredients_count: number;
  extraction_phases_count: number;
  thermal_precision_tier: 2 | 5 | 10;
  preparation_precision_tier: 2 | 5 | 10;
  filtration_assembly_tier: 0 | 4 | 10;
  user_attention_tier: 1 | 3 | 5;
  conservation_tier: 0 | 2 | 5;
  safety_handling_tier: 0 | 4 | 10;
}): { score: number; level: DifficultyLevel; label: DifficultyLabel; breakdown: DifficultyBreakdown } {
  let active_steps = 2;
  if (raw.active_steps_count <= 2) active_steps = 2;
  else if (raw.active_steps_count <= 4) active_steps = 7;
  else if (raw.active_steps_count <= 6) active_steps = 12;
  else active_steps = 20;

  let ingredients = 2;
  if (raw.ingredients_count <= 3) ingredients = 2;
  else if (raw.ingredients_count <= 5) ingredients = 5;
  else if (raw.ingredients_count <= 8) ingredients = 10;
  else ingredients = 15;

  let extraction_phases = 2;
  if (raw.extraction_phases_count === 1) extraction_phases = 2;
  else if (raw.extraction_phases_count === 2) extraction_phases = 9;
  else extraction_phases = 15;

  const breakdown: DifficultyBreakdown = {
    active_steps,
    ingredients,
    extraction_phases,
    thermal_precision: raw.thermal_precision_tier,
    preparation_precision: raw.preparation_precision_tier,
    filtration_assembly: raw.filtration_assembly_tier,
    user_attention: raw.user_attention_tier,
    conservation: raw.conservation_tier,
    safety_handling: raw.safety_handling_tier
  };

  const score = Object.values(breakdown).reduce((a, b) => a + b, 0);

  let level: DifficultyLevel = 1;
  let label: DifficultyLabel = 'Très facile';

  if (score <= 20) {
    level = 1;
    label = 'Très facile';
  } else if (score <= 40) {
    level = 2;
    label = 'Facile';
  } else if (score <= 60) {
    level = 3;
    label = 'Intermédiaire';
  } else if (score <= 80) {
    level = 4;
    label = 'Avancé';
  } else {
    level = 5;
    label = 'Expert';
  }

  return { score, level, label, breakdown };
}

export function formatDifficultyDots(level: DifficultyLevel): string {
  switch (level) {
    case 1: return '●○○○○';
    case 2: return '●●○○○';
    case 3: return '●●●○○';
    case 4: return '●●●●○';
    case 5: return '●●●●●';
    default: return '●○○○○';
  }
}

export function getDifficultyColor(level: DifficultyLevel): {
  bg: string;
  text: string;
  border: string;
  dotActive: string;
  dotInactive: string;
} {
  switch (level) {
    case 1:
      return {
        bg: 'bg-emerald-50',
        text: 'text-emerald-900',
        border: 'border-emerald-300',
        dotActive: 'text-emerald-700',
        dotInactive: 'text-emerald-200'
      };
    case 2:
      return {
        bg: 'bg-teal-50',
        text: 'text-teal-900',
        border: 'border-teal-300',
        dotActive: 'text-teal-700',
        dotInactive: 'text-teal-200'
      };
    case 3:
      return {
        bg: 'bg-amber-50',
        text: 'text-amber-900',
        border: 'border-amber-300',
        dotActive: 'text-amber-700',
        dotInactive: 'text-amber-200'
      };
    case 4:
      return {
        bg: 'bg-orange-50',
        text: 'text-orange-950',
        border: 'border-orange-300',
        dotActive: 'text-orange-700',
        dotInactive: 'text-orange-200'
      };
    case 5:
      return {
        bg: 'bg-red-50',
        text: 'text-red-950',
        border: 'border-red-300',
        dotActive: 'text-red-700',
        dotInactive: 'text-red-200'
      };
    default:
      return {
        bg: 'bg-slate-50',
        text: 'text-slate-900',
        border: 'border-slate-300',
        dotActive: 'text-slate-700',
        dotInactive: 'text-slate-200'
      };
  }
}

export function getCategoryBadge(category: RecipeCategory): {
  label: string;
  bg: string;
  text: string;
  border: string;
} {
  switch (category) {
    case 'culinaire':
      return {
        label: 'Culinaire',
        bg: 'bg-[#FAF7F2]',
        text: 'text-[#92400e]',
        border: 'border-[#c9a84c]/40'
      };
    case 'cosmetique':
      return {
        label: 'Cosmétique (Usage externe)',
        bg: 'bg-rose-50',
        text: 'text-rose-900',
        border: 'border-rose-200'
      };
    case 'parcours-guide':
      return {
        label: 'Parcours botanique guidé',
        bg: 'bg-emerald-50',
        text: 'text-[#0F261E]',
        border: 'border-emerald-300'
      };
    default:
      return {
        label: 'Recette Botanique',
        bg: 'bg-slate-50',
        text: 'text-slate-800',
        border: 'border-slate-200'
      };
  }
}

// Full registry of audited recipes
import auditedData from './recipes_difficulty_audit.json';

export const RECIPE_DIFFICULTY_DATABASE: Record<string, RecipeDifficultyMetadata> = {};

// Auto-register audited data
if (Array.isArray(auditedData)) {
  auditedData.forEach((r: any) => {
    RECIPE_DIFFICULTY_DATABASE[r.id.toLowerCase()] = r;
    const shortId = r.id.replace(/^(discovery-|cosmetique-|culinaire-|parcours-)/, '');
    if (shortId !== r.id) {
      RECIPE_DIFFICULTY_DATABASE[shortId.toLowerCase()] = r;
    }
  });
}

// Helper to look up difficulty metadata with fallback
export function getRecipeDifficulty(
  idOrKey: string,
  fallback?: {
    title?: string;
    category?: RecipeCategory;
    ingredientCount?: number;
    stepsCount?: number;
    isCosmetic?: boolean;
    durationMinutes?: number;
  }
): RecipeDifficultyMetadata {
  const normalizedKey = idOrKey.toLowerCase().trim();
  
  if (RECIPE_DIFFICULTY_DATABASE[normalizedKey]) {
    return RECIPE_DIFFICULTY_DATABASE[normalizedKey];
  }

  // Prefix matching
  const matchingKey = Object.keys(RECIPE_DIFFICULTY_DATABASE).find(k => 
    k === normalizedKey || 
    k.endsWith(`-${normalizedKey}`) || 
    normalizedKey.endsWith(`-${k}`) ||
    k.includes(normalizedKey)
  );

  if (matchingKey && RECIPE_DIFFICULTY_DATABASE[matchingKey]) {
    return RECIPE_DIFFICULTY_DATABASE[matchingKey];
  }

  // Compute on-the-fly fallback
  const isCosmetic = fallback?.isCosmetic || fallback?.category === 'cosmetique' || normalizedKey.includes('serum') || normalizedKey.includes('baume') || normalizedKey.includes('elixir') || normalizedKey.includes('huile_corps');
  const category: RecipeCategory = fallback?.category || (isCosmetic ? 'cosmetique' : normalizedKey.includes('remede') || normalizedKey.includes('parcours') ? 'parcours-guide' : 'culinaire');
  const ingredientCount = fallback?.ingredientCount || 3;
  const activeStepCount = fallback?.stepsCount || 3;
  const machineTime = fallback?.durationMinutes || (isCosmetic ? 120 : 60);
  const activeTime = isCosmetic ? 20 : 10;
  const phases = isCosmetic ? 2 : 1;

  const { score, level, label, breakdown } = computeDifficultyScore({
    active_steps_count: activeStepCount,
    ingredients_count: ingredientCount,
    extraction_phases_count: phases,
    thermal_precision_tier: isCosmetic ? 10 : 5,
    preparation_precision_tier: isCosmetic ? 10 : 5,
    filtration_assembly_tier: isCosmetic ? 10 : 4,
    user_attention_tier: isCosmetic ? 5 : 1,
    conservation_tier: isCosmetic ? 5 : 2,
    safety_handling_tier: isCosmetic ? 10 : 0
  });

  return {
    id: normalizedKey,
    title: fallback?.title || idOrKey,
    url: `/recettes/#${normalizedKey}`,
    status: 'publiée',
    category,
    subcategory: category === 'cosmetique' ? 'Soin externe' : category === 'culinaire' ? 'Extraction gastronomique' : 'Parcours guidé',
    ingredientCount,
    activeStepCount,
    extractionPhaseCount: phases,
    temperatures: isCosmetic ? '45°C - 50°C' : '40°C - 85°C',
    machineTimeMinutes: machineTime,
    activeTimeMinutes: activeTime,
    totalTimeMinutes: machineTime + activeTime,
    filtrationRequired: true,
    assemblyRequired: isCosmetic,
    conservationRequirement: isCosmetic ? 'Flacon ambré hermétique au réfrigérateur' : 'Bocal propre hermétique',
    allergensOrPrecautions: isCosmetic ? ['Usage externe exclusif. Ne pas ingérer.', 'Test cutané préalable recommandé 48h.'] : ['Usage alimentaire.'],
    materialsNeeded: ['Extracteur BloomLab®', 'Balance de précision', 'Filtre tamis', 'Récipient propre'],
    keySteps: ['Préparation des matières végétales', 'Extraction BloomLab®', 'Filtration et conditionnement'],
    difficultyCalculatedScore: score,
    difficultyFinalScore: score,
    difficultyLevel: level,
    difficultyLabel: label,
    difficultyReason: isCosmetic
      ? 'Préparation cosmétique bi-phase nécessitant une filtration fine et un conditionnement protecteur.'
      : 'Préparation simple en extraction directe avec contrôle standard de température.',
    difficultyConfidence: 'medium',
    breakdown,
    difficultyReviewedBy: 'Auditeur Botanique Bloom',
    difficultyReviewedAt: new Date().toISOString(),
    missingData: [],
    humanReviewRequired: level >= 4
  };
}

// Load and populate from pre-computed audit records
export function registerAuditedRecipes(records: RecipeDifficultyMetadata[]) {
  records.forEach(r => {
    RECIPE_DIFFICULTY_DATABASE[r.id.toLowerCase()] = r;
    // Also index without prefix
    const shortId = r.id.replace(/^(discovery-|cosmetique-|culinaire-|parcours-)/, '');
    if (shortId !== r.id) {
      RECIPE_DIFFICULTY_DATABASE[shortId.toLowerCase()] = r;
    }
  });
}
