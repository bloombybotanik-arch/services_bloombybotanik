import React from 'react';
import { Clock, ChefHat, Sparkles, Droplets, BookOpen, AlertCircle } from 'lucide-react';
import { 
  getRecipeDifficulty, 
  RecipeDifficultyMetadata, 
  formatDifficultyDots, 
  getDifficultyColor,
  getCategoryBadge,
  RecipeCategory
} from '../data/recipeDifficulty';

interface DifficultyBadgeProps {
  recipeId?: string;
  metadata?: RecipeDifficultyMetadata;
  fallback?: {
    title?: string;
    category?: RecipeCategory;
    ingredientCount?: number;
    stepsCount?: number;
    isCosmetic?: boolean;
    durationMinutes?: number;
  };
  variant?: 'card' | 'inline' | 'detail' | 'compact';
  showCategory?: boolean;
  showTimes?: boolean;
  showIngredients?: boolean;
  className?: string;
}

export const DifficultyBadge: React.FC<DifficultyBadgeProps> = ({
  recipeId,
  metadata: providedMeta,
  fallback,
  variant = 'card',
  showCategory = true,
  showTimes = true,
  showIngredients = true,
  className = ''
}) => {
  const metadata: RecipeDifficultyMetadata = 
    providedMeta || (recipeId ? getRecipeDifficulty(recipeId, fallback) : getRecipeDifficulty('default', fallback));

  const colorStyles = getDifficultyColor(metadata.difficultyLevel);
  const categoryBadge = getCategoryBadge(metadata.category);
  const dots = formatDifficultyDots(metadata.difficultyLevel);

  // Variant: compact (just dots + level label)
  if (variant === 'compact') {
    return (
      <div 
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${colorStyles.bg} ${colorStyles.text} ${colorStyles.border} ${className}`}
        role="status"
        aria-label={`Difficulté : niveau ${metadata.difficultyLevel} sur 5, ${metadata.difficultyLabel}.`}
      >
        <span className="font-mono tracking-widest text-[11px]" aria-hidden="true">{dots}</span>
        <span>{metadata.difficultyLabel}</span>
      </div>
    );
  }

  // Variant: inline pill
  if (variant === 'inline') {
    return (
      <div 
        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border ${colorStyles.bg} ${colorStyles.text} ${colorStyles.border} shadow-2xs ${className}`}
        role="status"
        aria-label={`Difficulté : niveau ${metadata.difficultyLevel} sur 5, ${metadata.difficultyLabel}.`}
      >
        <span className="font-mono tracking-wider font-black text-sm" aria-hidden="true">{dots}</span>
        <span className="font-bold">{metadata.difficultyLabel}</span>
        <span className="text-[10px] opacity-75 font-mono">({metadata.difficultyLevel}/5)</span>
      </div>
    );
  }

  // Variant: card (full set of badges for recipe card preview)
  return (
    <div className={`space-y-2.5 ${className}`}>
      {/* Category & Difficulty Badges Row */}
      <div className="flex flex-wrap items-center gap-2">
        {showCategory && (
          <span 
            className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${categoryBadge.bg} ${categoryBadge.text} ${categoryBadge.border}`}
          >
            {categoryBadge.label}
          </span>
        )}

        <div 
          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${colorStyles.bg} ${colorStyles.text} ${colorStyles.border}`}
          role="status"
          aria-label={`Difficulté : niveau ${metadata.difficultyLevel} sur 5, ${metadata.difficultyLabel}.`}
        >
          <span className="font-mono tracking-widest text-[10px]" aria-hidden="true">{dots}</span>
          <span>{metadata.difficultyLabel}</span>
          <span className="text-[9px] opacity-75 font-mono">({metadata.difficultyLevel}/5)</span>
        </div>

        {metadata.humanReviewRequired && (
          <span 
            className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-300"
            title="Recette technique de haute précision"
          >
            Haute Précision
          </span>
        )}
      </div>

      {/* Technical metrics badges row (Active time, BloomLab duration, Ingredients) */}
      {(showTimes || showIngredients) && (
        <div className="flex flex-wrap items-center gap-3 text-xs text-[#0F261E]/75 font-medium pt-0.5">
          {showTimes && (
            <>
              <span className="inline-flex items-center gap-1 bg-[#FAF7F2] px-2 py-0.5 rounded-md border border-[#E7DFD3] text-[11px]">
                <Clock className="w-3 h-3 text-[#D97706]" />
                <span>Actif : {metadata.activeTimeMinutes} min</span>
              </span>
              <span className="inline-flex items-center gap-1 bg-[#FAF7F2] px-2 py-0.5 rounded-md border border-[#E7DFD3] text-[11px]">
                <Sparkles className="w-3 h-3 text-[#1C3F34]" />
                <span>BloomLab : {metadata.machineTimeMinutes >= 60 ? `${Math.floor(metadata.machineTimeMinutes / 60)}h${metadata.machineTimeMinutes % 60 ? `${metadata.machineTimeMinutes % 60}m` : ''}` : `${metadata.machineTimeMinutes} min`}</span>
              </span>
            </>
          )}

          {showIngredients && (
            <span className="inline-flex items-center gap-1 bg-[#FAF7F2] px-2 py-0.5 rounded-md border border-[#E7DFD3] text-[11px]">
              <ChefHat className="w-3 h-3 text-[#1C3F34]" />
              <span>{metadata.ingredientCount} ingrédient{metadata.ingredientCount > 1 ? 's' : ''}</span>
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default DifficultyBadge;
