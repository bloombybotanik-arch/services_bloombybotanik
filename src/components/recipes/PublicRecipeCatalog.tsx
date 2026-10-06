import React, { useState, useMemo, useEffect } from 'react';
import { 
  ArrowLeft, Search, Filter, Clock, Flame, ShieldAlert, Sparkles, 
  Share2, ChevronRight, Check, AlertTriangle, BookOpen, Layers, ChefHat, Eye
} from 'lucide-react';
import { 
  CanonicalRecipe, 
  CANONICAL_RECIPES, 
  CATEGORY_METADATA, 
  RECIPES_BY_CATEGORY, 
  getRecipeByPath 
} from '../../data/canonicalRecipesRegistry';
import { formatDifficultyDots, getDifficultyColor, getCategoryBadge } from '../../data/recipeDifficulty';
import { Language } from '../../translations';

interface PublicRecipeCatalogProps {
  initialPath?: string;
  categoryKey?: 'culinaires' | 'cosmetiques' | 'parcours-botaniques';
  recipeSlug?: string;
  onNavigate: (path: string) => void;
  lang: Language;
}

export default function PublicRecipeCatalog({
  initialPath = '/recettes/',
  categoryKey,
  recipeSlug,
  onNavigate,
  lang
}: PublicRecipeCatalogProps) {
  const [currentPath, setCurrentPath] = useState(initialPath);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficultyFilter, setSelectedDifficultyFilter] = useState<string>('All');
  const [selectedTimeFilter, setSelectedTimeFilter] = useState<string>('All');
  const [currentPageNum, setCurrentPageNum] = useState<number>(1);
  const [copiedLink, setCopiedLink] = useState(false);

  // Sync with browser path
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentPath(window.location.pathname);
      const matchPage = window.location.pathname.match(/\/page\/(\d+)\/?$/);
      if (matchPage) {
        setCurrentPageNum(parseInt(matchPage[1], 10) || 1);
      } else {
        setCurrentPageNum(1);
      }
    }
  }, [initialPath]);

  // Determine current active view based on path
  const activeRecipe = useMemo(() => {
    return getRecipeByPath(currentPath);
  }, [currentPath]);

  const activeCategory = useMemo(() => {
    if (categoryKey) return CATEGORY_METADATA[categoryKey];
    if (currentPath.includes('/recettes/culinaires')) return CATEGORY_METADATA.culinaires;
    if (currentPath.includes('/recettes/cosmetiques')) return CATEGORY_METADATA.cosmetiques;
    if (currentPath.includes('/recettes/parcours-botaniques')) return CATEGORY_METADATA['parcours-botaniques'];
    return null;
  }, [currentPath, categoryKey]);

  // Navigate helper with pushState
  const handleInternalNavigate = (url: string, e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', url);
      setCurrentPath(url);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    onNavigate(url);
  };

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  /* --------------------------------------------------------------------------
   * 1. RECIPE DETAIL VIEW
   * ------------------------------------------------------------------------ */
  if (activeRecipe) {
    const dots = formatDifficultyDots(activeRecipe.difficultyLevel);
    const diffColor = getDifficultyColor(activeRecipe.difficultyLevel);
    const related = RECIPES_BY_CATEGORY[activeRecipe.category]
      .filter(r => r.id !== activeRecipe.id)
      .slice(0, 3);

    return (
      <div className="min-h-screen bg-[#FDFBF7] text-[#0F261E] pb-24">
        {/* Fil d'Ariane */}
        <div className="border-b border-[#EAE5D9] bg-white/70 backdrop-blur-md sticky top-0 z-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
            <nav aria-label="Fil d'Ariane" className="text-xs sm:text-sm text-[#0F261E]/60 overflow-x-auto whitespace-nowrap">
              <ol className="flex items-center gap-2">
                <li>
                  <a href="/" onClick={(e) => handleInternalNavigate('/', e)} className="hover:text-[#0F261E] underline">
                    Accueil
                  </a>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <a href="/recettes/" onClick={(e) => handleInternalNavigate('/recettes/', e)} className="hover:text-[#0F261E] underline">
                    Recettes botaniques
                  </a>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <a 
                    href={`/recettes/${activeRecipe.categorySlug}/`} 
                    onClick={(e) => handleInternalNavigate(`/recettes/${activeRecipe.categorySlug}/`, e)} 
                    className="hover:text-[#0F261E] underline"
                  >
                    {activeRecipe.categoryLabel}
                  </a>
                </li>
                <li aria-hidden="true">/</li>
                <li className="text-[#0F261E] font-medium" aria-current="page">
                  {activeRecipe.title}
                </li>
              </ol>
            </nav>

            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#EAE5D9] text-xs font-medium hover:bg-[#FAF7F2] transition-colors"
              title="Copier le lien"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copiedLink ? 'Lien copié' : 'Partager'}</span>
            </button>
          </div>
        </div>

        <article className="max-w-5xl mx-auto px-4 sm:px-6 py-10 md:py-16">
          {/* Back button */}
          <div className="mb-6">
            <a 
              href={`/recettes/${activeRecipe.categorySlug}/`} 
              onClick={(e) => handleInternalNavigate(`/recettes/${activeRecipe.categorySlug}/`, e)}
              className="inline-flex items-center gap-2 text-sm font-medium text-[#0F261E]/60 hover:text-[#0F261E] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour à {activeRecipe.categoryLabel}
            </a>
          </div>

          {/* Header */}
          <header className="mb-10">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <a 
                href={`/recettes/${activeRecipe.categorySlug}/`}
                onClick={(e) => handleInternalNavigate(`/recettes/${activeRecipe.categorySlug}/`, e)}
                className="px-3.5 py-1 text-xs font-bold rounded-full bg-[#EAE5D9] text-[#0F261E] hover:bg-[#ded7c8] transition-colors"
              >
                {activeRecipe.categoryLabel}
              </a>

              {/* Badge Difficulté Accessible */}
              <span 
                className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold ${diffColor.bg} ${diffColor.text} ${diffColor.border} border`}
                aria-label={`Difficulté technique ${activeRecipe.difficultyLabel} : ${activeRecipe.difficultyLevel} sur 5`}
              >
                <span className="font-mono tracking-tight">{dots}</span>
                <span>{activeRecipe.difficultyLabel}</span>
                <span className="opacity-60">({activeRecipe.difficultyFinalScore}/100)</span>
              </span>

              {activeRecipe.category === 'cosmetique' && (
                <span className="px-3 py-1 text-xs font-bold rounded-full bg-rose-50 text-rose-800 border border-rose-200">
                  Usage externe
                </span>
              )}
              {activeRecipe.category === 'parcours-guide' && (
                <span className="px-3 py-1 text-xs font-bold rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                  Atelier éducatif non médical
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#0F261E] tracking-tight mb-4">
              {activeRecipe.title}
            </h1>

            <p className="text-lg sm:text-xl text-[#0F261E]/80 font-light leading-relaxed max-w-3xl mb-8">
              {activeRecipe.summary}
            </p>

            {/* Metrics bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-[#FAF7F2] border border-[#EAE5D9]">
              <div>
                <span className="block text-[11px] uppercase tracking-wider text-[#0F261E]/50 font-bold">Temps actif</span>
                <span className="text-lg font-bold text-[#0F261E]">{activeRecipe.activeTimeMinutes} min</span>
              </div>
              <div>
                <span className="block text-[11px] uppercase tracking-wider text-[#0F261E]/50 font-bold">Cycle BloomLab®</span>
                <span className="text-lg font-bold text-[#0F261E]">{activeRecipe.machineTimeMinutes} min</span>
              </div>
              <div>
                <span className="block text-[11px] uppercase tracking-wider text-[#0F261E]/50 font-bold">Durée totale</span>
                <span className="text-lg font-bold text-[#0F261E]">{activeRecipe.totalTimeMinutes} min</span>
              </div>
              <div>
                <span className="block text-[11px] uppercase tracking-wider text-[#0F261E]/50 font-bold">Température</span>
                <span className="text-lg font-bold text-[#0F261E]">{activeRecipe.temperatures}</span>
              </div>
            </div>
          </header>

          {/* Photo Principale */}
          <div className="mb-12 rounded-3xl overflow-hidden border border-[#EAE5D9] shadow-sm bg-[#FAF7F2] max-h-[460px]">
            <img 
              src={activeRecipe.image} 
              alt={activeRecipe.imageAlt} 
              className="w-full h-full object-cover" 
              loading="eager"
            />
          </div>

          {/* Section Avant de Commencer */}
          <div className="mb-10 p-6 rounded-2xl bg-amber-50/50 border border-amber-200">
            <h2 className="text-lg font-serif font-bold text-amber-950 mb-3 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-700" />
              Avant de commencer : niveau de difficulté & prérequis
            </h2>
            <p className="text-sm text-amber-900/90 leading-relaxed mb-4">
              <strong>Motif du classement :</strong> {activeRecipe.difficultyReason}
            </p>
            <div className="grid sm:grid-cols-3 gap-3 text-xs text-amber-950">
              <div className="p-3 bg-white/80 rounded-xl border border-amber-200/60">
                <span className="font-bold block mb-1">Étapes actives</span>
                <span>{activeRecipe.activeStepCount} étapes ({activeRecipe.breakdown.active_steps}/20 pts)</span>
              </div>
              <div className="p-3 bg-white/80 rounded-xl border border-amber-200/60">
                <span className="font-bold block mb-1">Phases d'extraction</span>
                <span>{activeRecipe.extractionPhaseCount} phase(s) ({activeRecipe.breakdown.extraction_phases}/15 pts)</span>
              </div>
              <div className="p-3 bg-white/80 rounded-xl border border-amber-200/60">
                <span className="font-bold block mb-1">Conditionnement</span>
                <span>{activeRecipe.conservationRequirement}</span>
              </div>
            </div>
          </div>

          {/* Ingrédients & Instructions */}
          <div className="grid md:grid-cols-3 gap-10 mb-12">
            {/* Aside gauche */}
            <aside className="md:col-span-1 space-y-6">
              <section className="p-6 rounded-2xl bg-white border border-[#EAE5D9] shadow-xs">
                <h2 className="text-xl font-serif font-bold text-[#0F261E] mb-4">
                  Ingrédients ({activeRecipe.ingredientCount})
                </h2>
                <ul className="space-y-3 text-sm text-[#0F261E]/80">
                  {activeRecipe.ingredients.map((ing, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="text-emerald-700 font-bold">•</span>
                      <span>{ing}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="p-6 rounded-2xl bg-white border border-[#EAE5D9] shadow-xs">
                <h3 className="text-lg font-serif font-bold text-[#0F261E] mb-3">
                  Matériel requis
                </h3>
                <ul className="space-y-2 text-sm text-[#0F261E]/80">
                  {activeRecipe.materialsNeeded.map((m, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#c9a84c]">✔</span>
                      <span>{m}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {activeRecipe.allergensOrPrecautions.length > 0 && (
                <section className="p-5 rounded-2xl bg-red-50/50 border border-red-200 text-xs text-red-950">
                  <h3 className="font-bold flex items-center gap-1.5 mb-2 text-red-900">
                    <ShieldAlert className="w-4 h-4 text-red-700" />
                    Précautions & Sécurité
                  </h3>
                  <ul className="space-y-1.5">
                    {activeRecipe.allergensOrPrecautions.map((p, i) => (
                      <li key={i}>⚠️ {p}</li>
                    ))}
                  </ul>
                  {activeRecipe.category === 'cosmetique' && (
                    <p className="mt-2.5 pt-2 border-t border-red-200/60 font-semibold text-rose-900">
                      Test de tolérance cutanée obligatoire : appliquer 24h à 48h au pli du coude avant tout usage étendu.
                    </p>
                  )}
                </section>
              )}
            </aside>

            {/* Instructions droite */}
            <section className="md:col-span-2 space-y-6">
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#EAE5D9] shadow-xs">
                <h2 className="text-2xl font-serif font-bold text-[#0F261E] mb-6">
                  Protocole d'extraction pas à pas
                </h2>
                <ol className="space-y-5">
                  {activeRecipe.instructions.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-4">
                      <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#EAE5D9] text-[#0F261E] font-bold text-sm flex items-center justify-center">
                        {idx + 1}
                      </span>
                      <div className="flex-1 pt-1 text-sm sm:text-base text-[#0F261E]/85 leading-relaxed">
                        {step}
                      </div>
                    </li>
                  ))}
                </ol>

                {activeRecipe.dosageOrUsage && (
                  <div className="mt-8 pt-6 border-t border-[#EAE5D9]">
                    <h3 className="text-base font-bold text-[#0F261E] mb-2">Conseils d'utilisation & dosage</h3>
                    <p className="text-sm text-[#0F261E]/80 leading-relaxed">{activeRecipe.dosageOrUsage}</p>
                  </div>
                )}

                {activeRecipe.bloomNote && (
                  <div className="mt-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs sm:text-sm text-emerald-950">
                    <strong>Note de l'herboriste Bloom :</strong> {activeRecipe.bloomNote}
                  </div>
                )}
              </div>

              {/* Disclaimer Vocation Educative */}
              <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#EAE5D9] text-xs text-[#0F261E]/60 leading-relaxed">
                <p>
                  <strong>Avertissement :</strong> Les contenus Bloom sont éducatifs. Ils ne remplacent pas un avis médical, dermatologique, pharmaceutique ou nutritionnel. En cas de grossesse, allaitement, allergie, traitement, maladie chronique ou symptôme persistant, demandez conseil à un professionnel de santé.
                </p>
              </div>
            </section>
          </div>

          {/* Recettes Liées */}
          {related.length > 0 && (
            <section className="mt-16 pt-12 border-t border-[#EAE5D9]">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-serif font-bold text-[#0F261E]">
                  Autres recettes dans la même catégorie
                </h2>
                <a 
                  href={`/recettes/${activeRecipe.categorySlug}/`} 
                  onClick={(e) => handleInternalNavigate(`/recettes/${activeRecipe.categorySlug}/`, e)}
                  className="text-sm font-bold text-emerald-800 hover:underline"
                >
                  Voir tout &rarr;
                </a>
              </div>
              <div className="grid sm:grid-cols-3 gap-6">
                {related.map(r => (
                  <article key={r.id} className="rounded-2xl border border-[#EAE5D9] bg-white overflow-hidden shadow-xs hover:shadow-md transition-shadow">
                    <a 
                      href={r.canonicalUrl} 
                      onClick={(e) => handleInternalNavigate(r.canonicalUrl, e)}
                      className="block group"
                    >
                      <div className="aspect-[16/10] overflow-hidden bg-[#FAF7F2]">
                        <img 
                          src={r.image} 
                          alt={r.imageAlt} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                          loading="lazy" 
                        />
                      </div>
                      <div className="p-5">
                        <div className="flex items-center justify-between text-xs text-[#0F261E]/60 mb-2">
                          <span>{r.difficultyLabel}</span>
                          <span>{r.totalTimeMinutes} min</span>
                        </div>
                        <h3 className="font-serif font-bold text-base text-[#0F261E] group-hover:text-emerald-800 transition-colors line-clamp-2">
                          {r.title}
                        </h3>
                      </div>
                    </a>
                  </article>
                ))}
              </div>
            </section>
          )}
        </article>
      </div>
    );
  }

  /* --------------------------------------------------------------------------
   * 2. CATEGORY VIEW (Culinaires, Cosmétiques, Parcours Botaniques)
   * ------------------------------------------------------------------------ */
  if (activeCategory) {
    const allCategoryRecipes = RECIPES_BY_CATEGORY[activeCategory.id];
    
    // Filtering
    const filteredRecipes = allCategoryRecipes.filter(r => {
      const matchesSearch = !searchQuery || 
        r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.ingredients.some(ing => ing.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesDifficulty = selectedDifficultyFilter === 'All' || 
        r.difficultyLevel.toString() === selectedDifficultyFilter;

      let matchesTime = true;
      if (selectedTimeFilter === 'short') matchesTime = r.totalTimeMinutes <= 45;
      if (selectedTimeFilter === 'medium') matchesTime = r.totalTimeMinutes > 45 && r.totalTimeMinutes <= 90;
      if (selectedTimeFilter === 'long') matchesTime = r.totalTimeMinutes > 90;

      return matchesSearch && matchesDifficulty && matchesTime;
    });

    const pageSize = activeCategory.pageSize;
    const totalPages = Math.ceil(filteredRecipes.length / pageSize) || 1;
    const safePage = Math.max(1, Math.min(currentPageNum, totalPages));
    const startIdx = (safePage - 1) * pageSize;
    const paginatedRecipes = filteredRecipes.slice(startIdx, startIdx + pageSize);

    const prevPageUrl = safePage === 2 
      ? activeCategory.url 
      : safePage > 2 
        ? `/recettes/${activeCategory.slug}/page/${safePage - 1}/` 
        : null;

    const nextPageUrl = safePage < totalPages 
      ? `/recettes/${activeCategory.slug}/page/${safePage + 1}/` 
      : null;

    return (
      <div className="min-h-screen bg-[#FDFBF7] text-[#0F261E] pb-24">
        {/* Fil d'Ariane */}
        <div className="border-b border-[#EAE5D9] bg-white/70 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
            <nav aria-label="Fil d'Ariane" className="text-xs sm:text-sm text-[#0F261E]/60">
              <ol className="flex items-center gap-2">
                <li>
                  <a href="/" onClick={(e) => handleInternalNavigate('/', e)} className="hover:text-[#0F261E] underline">
                    Accueil
                  </a>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <a href="/recettes/" onClick={(e) => handleInternalNavigate('/recettes/', e)} className="hover:text-[#0F261E] underline">
                    Recettes botaniques
                  </a>
                </li>
                <li aria-hidden="true">/</li>
                <li className="text-[#0F261E] font-medium" aria-current="page">
                  {activeCategory.h1}
                </li>
              </ol>
            </nav>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-16">
          <header className="mb-10">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="px-3.5 py-1 text-xs font-bold rounded-full bg-[#EAE5D9] text-[#0F261E]">
                Catégorie Botanique • {allCategoryRecipes.length} préparations
              </span>
              {activeCategory.id === 'cosmetique' && (
                <span className="px-3.5 py-1 text-xs font-bold rounded-full bg-rose-50 text-rose-800 border border-rose-200">
                  Usage externe exclusif
                </span>
              )}
              {activeCategory.id === 'parcours-guide' && (
                <span className="px-3.5 py-1 text-xs font-bold rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                  Vocation éducative non médicale
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#0F261E] tracking-tight mb-4">
              {activeCategory.h1}
            </h1>

            <p className="text-base sm:text-lg text-[#0F261E]/80 font-light leading-relaxed max-w-4xl mb-8">
              {activeCategory.intro}
            </p>

            {/* Navigation Catégories Sœurs */}
            <div className="flex flex-wrap items-center gap-2.5 pt-4 border-t border-[#EAE5D9]">
              <span className="text-xs uppercase tracking-wider font-bold text-[#0F261E]/50 mr-2">Catégories :</span>
              <a 
                href="/recettes/"
                onClick={(e) => handleInternalNavigate('/recettes/', e)}
                className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white border border-[#EAE5D9] text-[#0F261E] hover:border-emerald-600 transition-colors"
              >
                Toutes ({CANONICAL_RECIPES.length})
              </a>
              <a 
                href="/recettes/culinaires/"
                onClick={(e) => handleInternalNavigate('/recettes/culinaires/', e)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors ${activeCategory.slug === 'culinaires' ? 'bg-[#0F261E] text-white' : 'bg-white border border-[#EAE5D9] text-[#0F261E] hover:border-emerald-600'}`}
              >
                Culinaires ({CATEGORY_METADATA.culinaires.totalRecipes})
              </a>
              <a 
                href="/recettes/cosmetiques/"
                onClick={(e) => handleInternalNavigate('/recettes/cosmetiques/', e)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors ${activeCategory.slug === 'cosmetiques' ? 'bg-[#0F261E] text-white' : 'bg-white border border-[#EAE5D9] text-[#0F261E] hover:border-emerald-600'}`}
              >
                Cosmétiques ({CATEGORY_METADATA.cosmetiques.totalRecipes})
              </a>
              <a 
                href="/recettes/parcours-botaniques/"
                onClick={(e) => handleInternalNavigate('/recettes/parcours-botaniques/', e)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors ${activeCategory.slug === 'parcours-botaniques' ? 'bg-[#0F261E] text-white' : 'bg-white border border-[#EAE5D9] text-[#0F261E] hover:border-emerald-600'}`}
              >
                Parcours guidés ({CATEGORY_METADATA['parcours-botaniques'].totalRecipes})
              </a>
            </div>
          </header>

          {/* Filtres de recherche */}
          <div className="mb-10 p-5 rounded-2xl bg-white border border-[#EAE5D9] shadow-xs flex flex-wrap gap-4 items-center justify-between">
            <div className="relative flex-1 min-w-[240px]">
              <Search className="w-4 h-4 text-[#0F261E]/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Rechercher une plante, un ingrédient ou une recette..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-[#EAE5D9] focus:outline-hidden focus:border-emerald-600 bg-[#FAF7F2]/50"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <select
                value={selectedDifficultyFilter}
                onChange={(e) => setSelectedDifficultyFilter(e.target.value)}
                className="text-xs font-medium px-3 py-2 rounded-xl border border-[#EAE5D9] bg-white text-[#0F261E] focus:outline-hidden"
              >
                <option value="All">Toutes les difficultés</option>
                <option value="1">●○○○○ Très facile (1)</option>
                <option value="2">●●○○○ Facile (2)</option>
                <option value="3">●●●○○ Intermédiaire (3)</option>
                <option value="4">●●●●○ Avancé (4)</option>
                <option value="5">●●●●● Expert (5)</option>
              </select>

              <select
                value={selectedTimeFilter}
                onChange={(e) => setSelectedTimeFilter(e.target.value)}
                className="text-xs font-medium px-3 py-2 rounded-xl border border-[#EAE5D9] bg-white text-[#0F261E] focus:outline-hidden"
              >
                <option value="All">Toutes durées</option>
                <option value="short">Rapide (&le; 45 min)</option>
                <option value="medium">Moyen (45 à 90 min)</option>
                <option value="long">Long (&gt; 90 min)</option>
              </select>
            </div>
          </div>

          {/* Grille des cartes de recettes crawlables */}
          <main>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {paginatedRecipes.map(r => {
                const dots = formatDifficultyDots(r.difficultyLevel);
                const diffColor = getDifficultyColor(r.difficultyLevel);
                return (
                  <article 
                    key={r.id} 
                    className="group bg-white rounded-3xl border border-[#EAE5D9] overflow-hidden shadow-xs hover:shadow-xl transition-all flex flex-col justify-between"
                  >
                    <a 
                      href={r.canonicalUrl} 
                      onClick={(e) => handleInternalNavigate(r.canonicalUrl, e)}
                      className="block overflow-hidden relative aspect-[16/10] bg-[#FAF7F2]"
                    >
                      <img 
                        src={r.image} 
                        alt={r.imageAlt} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                        loading="lazy" 
                      />
                      <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                        <span className="px-2.5 py-1 text-[11px] font-bold rounded-full bg-white/95 text-[#0F261E] shadow-xs">
                          {r.subcategory || r.categoryLabel}
                        </span>
                      </div>
                    </a>

                    <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                      <div>
                        <div className="flex items-center justify-between text-xs text-[#0F261E]/70 mb-2.5 font-medium">
                          <span 
                            className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md font-mono ${diffColor.bg} ${diffColor.text}`}
                            aria-label={`Difficulté ${r.difficultyLabel}`}
                          >
                            <span>{dots}</span>
                            <span>{r.difficultyLabel}</span>
                          </span>
                          <span>{r.totalTimeMinutes} min • {r.ingredientCount} ing.</span>
                        </div>

                        <h2 className="text-xl font-serif font-bold text-[#0F261E] group-hover:text-emerald-800 transition-colors mb-2 line-clamp-2">
                          <a 
                            href={r.canonicalUrl}
                            onClick={(e) => handleInternalNavigate(r.canonicalUrl, e)}
                          >
                            {r.title}
                          </a>
                        </h2>

                        <p className="text-xs sm:text-sm text-[#0F261E]/70 line-clamp-2 leading-relaxed">
                          {r.summary}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-[#EAE5D9] flex items-center justify-between">
                        <span className="text-[11px] font-mono text-[#0F261E]/40 font-bold uppercase">
                          {r.temperatures}
                        </span>
                        <a 
                          href={r.canonicalUrl} 
                          onClick={(e) => handleInternalNavigate(r.canonicalUrl, e)}
                          className="text-xs sm:text-sm font-bold text-emerald-800 hover:text-emerald-950 inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                        >
                          Consulter la fiche &rarr;
                        </a>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Pagination Crawlable */}
            {totalPages > 1 && (
              <nav aria-label="Pagination des recettes" className="flex items-center justify-between pt-8 border-t border-[#EAE5D9] text-sm">
                <div>
                  {prevPageUrl ? (
                    <a 
                      href={prevPageUrl} 
                      rel="prev" 
                      onClick={(e) => handleInternalNavigate(prevPageUrl, e)}
                      className="px-4 py-2 rounded-xl bg-white border border-[#EAE5D9] font-medium text-[#0F261E] hover:bg-[#FAF7F2] transition-colors"
                    >
                      &larr; Page précédente
                    </a>
                  ) : (
                    <span className="text-[#0F261E]/30">&larr; Page précédente</span>
                  )}
                </div>
                <div className="text-[#0F261E]/70 font-medium">
                  Page {safePage} sur {totalPages}
                </div>
                <div>
                  {nextPageUrl ? (
                    <a 
                      href={nextPageUrl} 
                      rel="next" 
                      onClick={(e) => handleInternalNavigate(nextPageUrl, e)}
                      className="px-4 py-2 rounded-xl bg-white border border-[#EAE5D9] font-medium text-[#0F261E] hover:bg-[#FAF7F2] transition-colors"
                    >
                      Page suivante &rarr;
                    </a>
                  ) : (
                    <span className="text-[#0F261E]/30">Page suivante &rarr;</span>
                  )}
                </div>
              </nav>
            )}
          </main>

          <footer className="mt-16 p-5 rounded-2xl bg-[#FAF7F2] border border-[#EAE5D9] text-xs text-[#0F261E]/60 leading-relaxed">
            <p>
              <strong>Avertissement :</strong> Les contenus Bloom sont éducatifs. Ils ne remplacent pas un avis médical, dermatologique, pharmaceutique ou nutritionnel. En cas de grossesse, allaitement, allergie, traitement, maladie chronique ou symptôme persistant, demandez conseil à un professionnel de santé.
            </p>
          </footer>
        </div>
      </div>
    );
  }

  /* --------------------------------------------------------------------------
   * 3. HUB VIEW (/recettes/)
   * ------------------------------------------------------------------------ */
  const featured = CANONICAL_RECIPES.slice(0, 12);

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#0F261E] pb-24">
      {/* Fil d'Ariane */}
      <div className="border-b border-[#EAE5D9] bg-white/70 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <nav aria-label="Fil d'Ariane" className="text-xs sm:text-sm text-[#0F261E]/60">
            <ol className="flex items-center gap-2">
              <li>
                <a href="/" onClick={(e) => handleInternalNavigate('/', e)} className="hover:text-[#0F261E] underline">
                  Accueil
                </a>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-[#0F261E] font-medium" aria-current="page">
                Recettes botaniques
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-16">
        <header className="mb-14">
          <span className="inline-block px-3.5 py-1 text-xs font-bold rounded-full bg-[#EAE5D9] text-[#0F261E] mb-4">
            Bibliothèque de formulations • {CANONICAL_RECIPES.length} recettes publiques
          </span>
          <h1 className="text-3xl sm:text-6xl font-serif font-bold text-[#0F261E] tracking-tight mb-6">
            Recettes botaniques : cuisine et cosmétique maison
          </h1>
          <p className="text-base sm:text-xl text-[#0F261E]/80 font-light leading-relaxed max-w-3xl">
            Explorez l'art de l'extraction végétale de précision. Des huiles de finition gastronomiques aux sérums protecteurs pour la peau, découvrez des protocoles rigoureux testés pour révéler le totum des plantes médicinales et aromatiques avec BloomLab®.
          </p>
        </header>

        {/* 3 Piliers de Catégories */}
        <section className="grid md:grid-cols-3 gap-8 mb-16" aria-label="Catégories principales">
          {/* Culinaire */}
          <article className="p-8 rounded-3xl bg-[#FAF7F2] border border-[#EAE5D9] flex flex-col justify-between hover:shadow-lg transition-all">
            <div>
              <span className="inline-block px-3 py-1 text-xs font-bold rounded-full bg-[#92400e]/10 text-[#92400e] mb-4">
                {CATEGORY_METADATA.culinaires.totalRecipes} recettes
              </span>
              <h2 className="text-2xl font-serif font-bold text-[#0F261E] mb-3">
                <a 
                  href="/recettes/culinaires/"
                  onClick={(e) => handleInternalNavigate('/recettes/culinaires/', e)}
                  className="hover:underline"
                >
                  Recettes culinaires botaniques
                </a>
              </h2>
              <p className="text-sm text-[#0F261E]/75 leading-relaxed mb-6">
                Huiles infusées de finition, beurres gastronomiques, vinaigres aromatiques et miels botaniques sans détérioration des composés volatils.
              </p>
            </div>
            <a 
              href="/recettes/culinaires/"
              onClick={(e) => handleInternalNavigate('/recettes/culinaires/', e)}
              className="inline-flex items-center gap-2 font-bold text-sm text-emerald-800 hover:text-emerald-950"
            >
              Explorer les recettes culinaires &rarr;
            </a>
          </article>

          {/* Cosmétique */}
          <article className="p-8 rounded-3xl bg-rose-50/40 border border-rose-200/60 flex flex-col justify-between hover:shadow-lg transition-all">
            <div>
              <span className="inline-block px-3 py-1 text-xs font-bold rounded-full bg-rose-100 text-rose-800 mb-4">
                {CATEGORY_METADATA.cosmetiques.totalRecipes} soins • Usage externe
              </span>
              <h2 className="text-2xl font-serif font-bold text-[#0F261E] mb-3">
                <a 
                  href="/recettes/cosmetiques/"
                  onClick={(e) => handleInternalNavigate('/recettes/cosmetiques/', e)}
                  className="hover:underline"
                >
                  Recettes cosmétiques botaniques
                </a>
              </h2>
              <p className="text-sm text-[#0F261E]/75 leading-relaxed mb-6">
                Sérums bi-phase, huiles de soin, baumes réparateurs et macérats actifs pour nourrir la peau sans conservateurs agressifs.
              </p>
            </div>
            <a 
              href="/recettes/cosmetiques/"
              onClick={(e) => handleInternalNavigate('/recettes/cosmetiques/', e)}
              className="inline-flex items-center gap-2 font-bold text-sm text-rose-900 hover:text-rose-950"
            >
              Explorer les soins cosmétiques &rarr;
            </a>
          </article>

          {/* Parcours botaniques */}
          <article className="p-8 rounded-3xl bg-emerald-50/50 border border-emerald-200/60 flex flex-col justify-between hover:shadow-lg transition-all">
            <div>
              <span className="inline-block px-3 py-1 text-xs font-bold rounded-full bg-emerald-100 text-emerald-900 mb-4">
                {CATEGORY_METADATA['parcours-botaniques'].totalRecipes} parcours guidés
              </span>
              <h2 className="text-2xl font-serif font-bold text-[#0F261E] mb-3">
                <a 
                  href="/recettes/parcours-botaniques/"
                  onClick={(e) => handleInternalNavigate('/recettes/parcours-botaniques/', e)}
                  className="hover:underline"
                >
                  Parcours botaniques guidés
                </a>
              </h2>
              <p className="text-sm text-[#0F261E]/75 leading-relaxed mb-6">
                Ateliers techniques et éducatifs pour appréhender l'extraction séquentielle, les solvants multiples et le totum végétal à domicile.
              </p>
            </div>
            <a 
              href="/recettes/parcours-botaniques/"
              onClick={(e) => handleInternalNavigate('/recettes/parcours-botaniques/', e)}
              className="inline-flex items-center gap-2 font-bold text-sm text-emerald-900 hover:text-emerald-950"
            >
              Explorer les ateliers &rarr;
            </a>
          </article>
        </section>

        {/* Sélection de recettes récentes avec vrais liens <a> */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0F261E]">
              Sélection de formulations botaniques
            </h2>
            <span className="text-sm text-[#0F261E]/60">12 recettes à la une</span>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featured.map(r => {
              const dots = formatDifficultyDots(r.difficultyLevel);
              const diffColor = getDifficultyColor(r.difficultyLevel);
              return (
                <article 
                  key={r.id} 
                  className="group bg-white rounded-3xl border border-[#EAE5D9] overflow-hidden shadow-xs hover:shadow-xl transition-all flex flex-col justify-between"
                >
                  <a 
                    href={r.canonicalUrl} 
                    onClick={(e) => handleInternalNavigate(r.canonicalUrl, e)}
                    className="block overflow-hidden relative aspect-[16/10] bg-[#FAF7F2]"
                  >
                    <img 
                      src={r.image} 
                      alt={r.imageAlt} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      loading="lazy" 
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 text-[11px] font-bold rounded-full bg-white/95 text-[#0F261E] shadow-xs">
                        {r.categoryLabel}
                      </span>
                    </div>
                  </a>

                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-center justify-between text-xs text-[#0F261E]/70 mb-2 font-medium">
                        <span 
                          className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md font-mono ${diffColor.bg} ${diffColor.text}`}
                        >
                          <span>{dots}</span>
                          <span>{r.difficultyLabel}</span>
                        </span>
                        <span>{r.totalTimeMinutes} min</span>
                      </div>

                      <h3 className="text-xl font-serif font-bold text-[#0F261E] group-hover:text-emerald-800 transition-colors mb-2 line-clamp-2">
                        <a 
                          href={r.canonicalUrl}
                          onClick={(e) => handleInternalNavigate(r.canonicalUrl, e)}
                        >
                          {r.title}
                        </a>
                      </h3>

                      <p className="text-xs sm:text-sm text-[#0F261E]/70 line-clamp-2 leading-relaxed">
                        {r.summary}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[#EAE5D9] flex items-center justify-between">
                      <span className="text-xs text-[#0F261E]/50 font-bold">
                        {r.ingredientCount} ingrédients
                      </span>
                      <a 
                        href={r.canonicalUrl} 
                        onClick={(e) => handleInternalNavigate(r.canonicalUrl, e)}
                        className="text-xs sm:text-sm font-bold text-emerald-800 hover:text-emerald-950 inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                      >
                        Consulter la fiche &rarr;
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <footer className="mt-16 p-5 rounded-2xl bg-[#FAF7F2] border border-[#EAE5D9] text-xs text-[#0F261E]/60 leading-relaxed">
          <p>
            <strong>Avertissement :</strong> Les contenus Bloom sont éducatifs. Ils ne remplacent pas un avis médical, dermatologique, pharmaceutique ou nutritionnel. En cas de grossesse, allaitement, allergie, traitement, maladie chronique ou symptôme persistant, demandez conseil à un professionnel de santé.
          </p>
        </footer>
      </div>
    </div>
  );
}
