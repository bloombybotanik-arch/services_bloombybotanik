export type RecipeCategory = 'culinaire' | 'cosmetique' | 'parcours-guide';
export type DifficultyLevel = 1 | 2 | 3 | 4 | 5;

export interface RecipeDifficultyMetadata {
  id: string;
  title: string;
  difficultyLevel: 1 | 2 | 3 | 4 | 5;
  difficultyLabel: string;
  difficultyScore: number;
  activeTimeMinutes: number;
  machineTimeMinutes: number;
  totalTimeMinutes: number;
  materialsNeeded?: string[];
  allergensOrPrecautions?: string[];
  temperatures?: string;
  category?: RecipeCategory;
  breakdown?: any;
  difficultyReason?: string;
  keySteps?: string[];
  conservationRequirement?: string;
  [key: string]: any;
}

export function getRecipeDifficulty(idOrSlug: string, category?: any): RecipeDifficultyMetadata {
  return {
    id: idOrSlug,
    title: idOrSlug,
    difficultyLevel: 2,
    difficultyLabel: 'Facile',
    difficultyScore: 24,
    activeTimeMinutes: 10,
    machineTimeMinutes: 60,
    totalTimeMinutes: 70,
    materialsNeeded: ['BloomLab', 'Étamine de filtration'],
    allergensOrPrecautions: ['Tester la sensibilité cutanée avant usage pour les formules externes.'],
    temperatures: '45°C',
    difficultyReason: 'Paramétrage standard et filtration simple.',
    keySteps: ['Dosage des solvants', 'Thermo-infusion', 'Filtration'],
    conservationRequirement: 'Conserver en flacon ambré à l\'abri de la lumière.'
  };
}

export function formatDifficultyDots(level: number): string {
  return '●'.repeat(level) + '○'.repeat(5 - level);
}

export function getDifficultyColor(level: number): any {
  if (level <= 1) return { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' };
  if (level === 2) return { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' };
  if (level === 3) return { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' };
  if (level === 4) return { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200' };
  return { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' };
}

export function getCategoryBadge(category?: string): { label: string; color: string; bg: string; text: string; border: string } {
  if (category === 'culinaire') return { label: 'Culinaire', color: 'bg-amber-100 text-amber-900', bg: 'bg-amber-50', text: 'text-amber-800', border: 'border-amber-200' };
  if (category === 'cosmetique') return { label: 'Cosmétique', color: 'bg-rose-100 text-rose-900', bg: 'bg-rose-50', text: 'text-rose-800', border: 'border-rose-200' };
  return { label: 'Parcours Guidé', color: 'bg-emerald-100 text-emerald-900', bg: 'bg-emerald-50', text: 'text-emerald-800', border: 'border-emerald-200' };
}
