import React, { useState } from 'react';
import { Clock, Thermometer, Sparkles, BookOpen, ChevronRight, ShieldCheck, Leaf } from 'lucide-react';
import { HerbierRecipe } from '../../data/herbierRecipesRegistry';

const BOTANICAL_ROOT_FALLBACKS = [
  '/images/illustrations/planche-botanique-default.jpg',
  '/assets/images/botanical_roots_hero_1790693840047.jpg',
  '/assets/images/botanical_roots_hepatic_1790693867525.jpg',
  '/assets/images/botanical_roots_emonctoires_1790693854850.jpg',
  '/assets/images/botanical_roots_vitality_1790693881999.jpg'
];

interface HerbierRecipeCardProps {
  recipe: HerbierRecipe;
  onSelect?: (url: string) => void;
  showHeritageTeaser?: boolean;
}

export const HerbierRecipeCard: React.FC<HerbierRecipeCardProps> = ({
  recipe,
  onSelect,
  showHeritageTeaser = true
}) => {
  const [imgError, setImgError] = useState(false);
  const title = recipe.title || (recipe as any).name || (recipe as any).nom_commun || (recipe as any).latinName || '';
  const subtitle = recipe.subtitle || (recipe as any).summary || (recipe as any).description || '';
  
  // Pick an authentic botanical root illustration instead of lifestyle or landscape photos
  const rawImage = recipe.image || (recipe as any).imageUrl;
  const image = (() => {
    if (rawImage && 
        !rawImage.includes('infusion_sommeil_profond') && 
        !rawImage.includes('strength_courage') && 
        !rawImage.includes('/images/og/')) {
      return rawImage;
    }
    const key = String(recipe.id || title || 'bloom');
    let hash = 0;
    for (let i = 0; i < key.length; i++) hash = (hash * 31 + key.charCodeAt(i)) >>> 0;
    return BOTANICAL_ROOT_FALLBACKS[hash % BOTANICAL_ROOT_FALLBACKS.length];
  })();
  const imageAlt = recipe.imageAlt || title;
  const rawDifficulty = typeof recipe.difficultyLevel === 'number' ? recipe.difficultyLevel : 2;
  const difficultyLevel = Math.max(1, Math.min(5, rawDifficulty));
  const difficultyLabel = recipe.difficultyLabel || 'Facile';
  const dotsString = '●'.repeat(difficultyLevel) + '○'.repeat(5 - difficultyLevel);
  const totalTimeMinutes = recipe.totalTimeMinutes || (recipe as any).machineTimeMinutes || 20;
  const categoryLabel = recipe.categoryLabel || ((recipe as any).category === 'culinaire' ? 'Culinaire' : (recipe as any).category === 'cosmetique' ? 'Cosmétique' : 'Phytothérapie');
  const terrains = Array.isArray(recipe.terrains) && recipe.terrains.length > 0 
    ? recipe.terrains 
    : (Array.isArray((recipe as any).terrains_cibles) ? (recipe as any).terrains_cibles : (Array.isArray((recipe as any).tags) ? (recipe as any).tags : ['T1']));
  const axes = Array.isArray(recipe.axes) ? recipe.axes : [];
  const tempSachetA = recipe.tempSachetA || ((recipe as any).temperatures ? (recipe as any).temperatures.split('/')[0]?.replace(/Phase A:?/i, '').trim() : '85°C');
  const tempSachetB = recipe.tempSachetB || ((recipe as any).temperatures ? (recipe as any).temperatures.split('/')[1]?.replace(/Phase B:?/i, '').trim() : '70°C');
  const canonicalUrl = recipe.canonicalUrl || ((recipe as any).slug ? `/recettes/${(recipe as any).categorySlug || 'phytotherapie'}/${(recipe as any).slug}/` : '#');

  const getCategoryTheme = () => {
    switch (recipe.category) {
      case 'phytotherapie':
        return {
          bg: 'bg-emerald-50 text-emerald-900 border-emerald-200',
          badge: 'bg-emerald-100 text-emerald-800'
        };
      case 'cosmetique':
        return {
          bg: 'bg-rose-50 text-rose-900 border-rose-200',
          badge: 'bg-rose-100 text-rose-800'
        };
      case 'gastronomie':
        return {
          bg: 'bg-amber-50 text-amber-900 border-amber-200',
          badge: 'bg-amber-100 text-amber-800'
        };
      default:
        return {
          bg: 'bg-stone-50 text-stone-900 border-stone-200',
          badge: 'bg-stone-100 text-stone-800'
        };
    }
  };

  const theme = getCategoryTheme();

  const handleClick = (e: React.MouseEvent) => {
    if (onSelect) {
      e.preventDefault();
      onSelect(canonicalUrl);
    }
  };

  return (
    <article className="group bg-white rounded-3xl border border-[#EAE5D9] overflow-hidden hover:shadow-xl hover:border-[#3E4A3D]/30 transition-all duration-300 flex flex-col justify-between">
      <div>
        {/* Image & Badges */}
        <div className="relative aspect-16/10 overflow-hidden bg-[#FAF7F2]">
          {!imgError ? (
            <img
              src={image}
              alt={imageAlt}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-[#FAF7F2] p-4 text-center">
              <div className="w-10 h-10 rounded-full bg-[#A8B8A0]/5 border border-[#A8B8A0]/15 flex items-center justify-center mb-2">
                <Leaf className="w-5 h-5 text-[#A8B8A0]" />
              </div>
              <span className="font-serif italic text-xs text-[#A8B8A0]/80">{title}</span>
              <span className="text-[10px] uppercase tracking-wider text-[#A8B8A0]/40 mt-0.5">Illustration Botanique</span>
            </div>
          )}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${theme.badge}`}>
              {categoryLabel}
            </span>
            {terrains.length > 0 && (
              <span className="px-2 py-1 rounded-full text-[10px] font-mono font-bold bg-[#3E4A3D]/80 text-white backdrop-blur-xs">
                Terrain {String(terrains[0])}
              </span>
            )}
          </div>
          <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-full text-[10px] font-bold text-[#3E4A3D] flex items-center gap-1 shadow-xs">
            <Clock className="w-3 h-3 text-[#3E4A3D]/60" />
            <span>{totalTimeMinutes} min</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="font-mono text-emerald-800 font-semibold" title={`Niveau : ${difficultyLabel}`}>
              {dotsString} <span className="font-sans text-[11px] text-[#3E4A3D]/60">{difficultyLabel}</span>
            </span>
            <span className="text-[11px] font-mono text-[#3E4A3D]/50">
              {tempSachetA} / {tempSachetB}
            </span>
          </div>

          <h3 className="text-lg sm:text-xl font-bold font-serif text-[#3E4A3D] group-hover:text-emerald-900 transition-colors line-clamp-2 mb-2 leading-snug">
            <a href={canonicalUrl} onClick={handleClick}>
              {title}
            </a>
          </h3>

          <p className="text-xs sm:text-sm text-[#3E4A3D]/70 line-clamp-2 mb-4 leading-relaxed font-light">
            {subtitle}
          </p>

          {/* Mémoire du vivant Teaser */}
          {showHeritageTeaser && recipe.heritage && (
            <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#EAE5D9]/70 mb-4 text-xs text-[#3E4A3D]/80">
              <div className="flex items-center gap-1.5 font-bold text-[10px] uppercase text-[#3E4A3D]/60 mb-1">
                <BookOpen className="w-3 h-3" />
                <span>{recipe.heritage.register.split('(')[0].trim()}</span>
              </div>
              <p className="italic font-serif line-clamp-2 text-[#3E4A3D]/90 text-[11px]">
                {recipe.heritage.quote}
              </p>
            </div>
          )}

          {/* Terrains & Axes Tags */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {terrains.map(t => (
              <span key={String(t)} className="px-2 py-0.5 rounded-md bg-[#FAF7F2] text-[10px] font-mono font-medium text-[#3E4A3D]/70 border border-[#EAE5D9]">
                T{String(t).replace(/\D/g, '') || String(t)}
              </span>
            ))}
            {axes.slice(0, 2).map(a => (
              <span key={String(a)} className="px-2 py-0.5 rounded-md bg-amber-50 text-[10px] font-mono font-medium text-amber-900 border border-amber-200">
                {String(a)}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="px-5 sm:px-6 pb-5 pt-3 border-t border-[#EAE5D9]/50 flex items-center justify-between">
        <span className="text-[11px] text-[#3E4A3D]/50">
          Lot {recipe.batchNumber || 1}
        </span>
        <a
          href={canonicalUrl}
          onClick={handleClick}
          className="inline-flex items-center gap-1 text-xs font-bold text-[#3E4A3D] group-hover:text-emerald-900 group-hover:translate-x-1 transition-all"
        >
          <span>Consulter le protocole</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </article>
  );
};

export default HerbierRecipeCard;
