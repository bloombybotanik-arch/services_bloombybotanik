import React, { useState, useMemo } from 'react';
import { ArrowLeft, BookOpen, Clock, Heart, Share2, Search, Filter, PlayCircle, Download, ShieldCheck, ArrowUpDown } from 'lucide-react';
import { discoveryRecipes, Recipe } from './data/recipesData';
import { translations, Language } from './translations';
import { motion, AnimatePresence } from 'motion/react';
import { DifficultyBadge } from './components/DifficultyBadge';
import { BeforeYouStartBlock } from './components/BeforeYouStartBlock';
import { getRecipeDifficulty, RecipeCategory, DifficultyLevel } from './data/recipeDifficulty';

interface RecipesContentProps {
  onBack: () => void;
  lang: Language;
  t: any;
}

export default function RecipesContent({ onBack, lang, t }: RecipesContentProps) {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('default');
  const [activeArchitecture, setActiveArchitecture] = useState<string>('All');
  const [activeTerrain, setActiveTerrain] = useState<string>('All');

  const architectures = ['All', 'SRA', 'HPA', 'Fascia', 'SEC'];
  const terrainsList = ['All', 'T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];

  const categoryOptions = [
    { id: 'All', label: 'Toutes les catégories' },
    { id: 'culinaire', label: 'Culinaire' },
    { id: 'cosmetique', label: 'Cosmétique' },
    { id: 'parcours-guide', label: 'Parcours botanique guidé' }
  ];

  const difficultyOptions = [
    { id: 'All', label: 'Toutes les difficultés' },
    { id: '1', label: '●○○○○ Très facile (1)' },
    { id: '2', label: '●●○○○ Facile (2)' },
    { id: '3', label: '●●●○○ Intermédiaire (3)' },
    { id: '4', label: '●●●●○ Avancé (4)' },
    { id: '5', label: '●●●●● Expert (5)' }
  ];

  const filteredAndSortedRecipes = useMemo(() => {
    return discoveryRecipes
      .filter(recipe => {
        const meta = getRecipeDifficulty(recipe.id);
        const matchesSearch = recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                             recipe.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                             (recipe.terrains && recipe.terrains.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))) ||
                             (recipe.axes && recipe.axes.some(a => a.toLowerCase().includes(searchQuery.toLowerCase())));
        
        const matchesCategory = selectedCategory === 'All' || meta.category === selectedCategory;
        const matchesDifficulty = selectedDifficulty === 'All' || meta.difficultyLevel.toString() === selectedDifficulty;
        const matchesArch = activeArchitecture === 'All' || (recipe.architectures && recipe.architectures.includes(activeArchitecture));
        const matchesTerrain = activeTerrain === 'All' || (recipe.terrains && recipe.terrains.some(t => t.startsWith(activeTerrain)));
        
        return matchesSearch && matchesCategory && matchesDifficulty && matchesArch && matchesTerrain;
      })
      .sort((a, b) => {
        const metaA = getRecipeDifficulty(a.id);
        const metaB = getRecipeDifficulty(b.id);
        if (sortBy === 'difficulty-asc') {
          return metaA.difficultyFinalScore - metaB.difficultyFinalScore;
        }
        if (sortBy === 'difficulty-desc') {
          return metaB.difficultyFinalScore - metaA.difficultyFinalScore;
        }
        if (sortBy === 'time-asc') {
          return metaA.totalTimeMinutes - metaB.totalTimeMinutes;
        }
        if (sortBy === 'category') {
          return metaA.category.localeCompare(metaB.category);
        }
        return 0;
      });
  }, [searchQuery, selectedCategory, selectedDifficulty, activeArchitecture, activeTerrain, sortBy]);

  const visibleRecipes = filteredAndSortedRecipes;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-24 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
        <div>
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-botanik-green/50 hover:text-botanik-green transition-colors mb-6 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Retour
          </button>
          <h1 className="text-4xl md:text-6xl font-bold text-botanik-green mb-4">
            {t.seo.recettes.h1}
          </h1>
          <p className="text-xl text-botanik-green/60 font-light max-w-2xl">
            {t.seo.recettes.intro}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-botanik-green/30" />
            <input 
              type="text" 
              placeholder="Rechercher une recette..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-6 py-4 bg-white border border-botanik-green/10 rounded-2xl w-full sm:w-80 outline-none focus:ring-2 focus:ring-botanik-orange transition-all"
            />
          </div>
        </div>
      </div>

      {/* Filtres Catégories, Difficulté et Tri */}
      <div className="space-y-4 mb-12">
        {/* Catégories principales */}
        <div className="flex flex-wrap items-center gap-2 pb-1">
          <span className="text-xs font-bold text-botanik-green/60 uppercase tracking-wider shrink-0 mr-2">Catégorie :</span>
          {categoryOptions.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-1.5 rounded-full whitespace-nowrap text-xs transition-all font-semibold cursor-pointer ${selectedCategory === cat.id ? 'bg-botanik-green text-white shadow-md' : 'bg-white text-botanik-green/70 hover:bg-botanik-green/5 border border-botanik-green/10'}`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Niveaux de Difficulté */}
        <div className="flex flex-wrap items-center gap-2 pb-1">
          <span className="text-xs font-bold text-[#D97706] uppercase tracking-wider shrink-0 mr-2">Difficulté :</span>
          {difficultyOptions.map(diff => (
            <button
              key={diff.id}
              onClick={() => setSelectedDifficulty(diff.id)}
              className={`px-3 py-1.5 rounded-xl whitespace-nowrap text-xs transition-all font-bold cursor-pointer ${selectedDifficulty === diff.id ? 'bg-[#D97706] text-white shadow-sm' : 'bg-white text-slate-700 hover:border-[#D97706]/40 border border-slate-200'}`}
            >
              {diff.label}
            </button>
          ))}
        </div>

        {/* Tri et options secondaires */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-botanik-green/10">
          <div className="flex items-center gap-2">
            <ArrowUpDown className="w-4 h-4 text-botanik-green/50" />
            <span className="text-xs font-bold text-botanik-green/60 uppercase tracking-wider">Trier par :</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-botanik-green/15 text-xs font-semibold text-botanik-green rounded-xl px-3 py-1.5 outline-none cursor-pointer focus:ring-2 focus:ring-[#D97706]"
            >
              <option value="default">Ordre recommandé</option>
              <option value="difficulty-asc">Difficulté croissante (Très facile → Expert)</option>
              <option value="difficulty-desc">Difficulté décroissante (Expert → Très facile)</option>
              <option value="time-asc">Temps total le plus court</option>
              <option value="category">Catégorie</option>
            </select>
          </div>

          <div className="text-xs text-botanik-green/60 font-medium">
            <strong>{visibleRecipes.length}</strong> recette{visibleRecipes.length > 1 ? 's' : ''} trouvée{visibleRecipes.length > 1 ? 's' : ''}
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {visibleRecipes.map((recipe, index) => (
          <motion.div
            key={recipe.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => setSelectedRecipe(recipe)}
            className="group bg-white rounded-[32px] border border-botanik-green/10 overflow-hidden shadow-xs hover:shadow-xl transition-all cursor-pointer relative flex flex-col"
          >
            <div className="aspect-[4/3] overflow-hidden relative">
              <img 
                src={recipe.image} 
                alt={recipe.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              />
              <div className="absolute inset-0 bg-black/15 group-hover:bg-black/0 transition-colors" />
            </div>
            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                {/* Badges Normalisés : Catégorie, Difficulté & Métriques */}
                <DifficultyBadge 
                  recipeId={recipe.id} 
                  fallback={{ title: recipe.title, ingredientCount: recipe.ingredients.length }}
                  showCategory={true}
                  showTimes={true}
                  showIngredients={true}
                />

                <h3 className="text-xl sm:text-2xl font-bold text-botanik-green group-hover:text-botanik-orange transition-colors pt-1">
                  {recipe.title}
                </h3>
                <p className="text-botanik-green/70 text-xs sm:text-sm leading-relaxed line-clamp-2">
                  {recipe.description}
                </p>
              </div>

              <div className="pt-4 border-t border-botanik-green/10 flex items-center justify-between">
                <span className="text-[11px] font-mono text-botanik-green/40 font-bold uppercase">
                  #{recipe.id} • {recipe.category}
                </span>
                <div className="flex items-center gap-1.5 text-botanik-orange font-bold text-xs sm:text-sm">
                  Voir la fiche <ArrowLeft className="w-4 h-4 rotate-180" />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedRecipe && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedRecipe(null)}
              className="absolute inset-0 bg-botanik-green/90 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[40px] md:rounded-[60px] shadow-2xl"
            >
              <div className="sticky top-0 right-0 p-6 flex justify-end z-10">
                <button 
                  onClick={() => setSelectedRecipe(null)}
                  className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg text-botanik-green hover:text-botanik-orange transition-colors"
                >
                  <ArrowLeft className="w-6 h-6" />
                </button>
              </div>

              <div className="p-8 md:p-16 pt-0">
                <div className="grid lg:grid-cols-2 gap-16">
                  <div>
                    <div className="flex items-center gap-4 mb-8">
                      <span className="px-4 py-1.5 bg-botanik-green/5 text-botanik-green text-xs font-bold uppercase tracking-widest rounded-full">
                        {selectedRecipe.category}
                      </span>
                      <span className="text-sm font-bold text-botanik-green/20">RECETTE #{selectedRecipe.id}</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-botanik-green mb-6">
                      {selectedRecipe.title}
                    </h2>
                    <p className="text-xl text-botanik-green/60 mb-8 font-light leading-relaxed">
                      {selectedRecipe.description}
                    </p>

                    {/* Bloc Avant de commencer (Indicateur de difficulté & Pré-requis techniques) */}
                    <BeforeYouStartBlock 
                      recipeId={selectedRecipe.id} 
                      fallback={{
                        title: selectedRecipe.title,
                        ingredientCount: selectedRecipe.ingredients.length,
                        stepsCount: selectedRecipe.instructions.length
                      }}
                    />

                    {/* Bloc Profil Systémique Bloom : 4 Architectures, 7 Terrains, 9 Axes */}
                    <div className="mb-10 p-6 rounded-3xl bg-[#FAF7F2] border border-[#c9a84c]/30 space-y-4 shadow-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#92400e]">
                          Profil Systémique Bloom
                        </span>
                        <span className="text-[10px] font-mono bg-[#c9a84c]/20 text-[#92400e] px-2.5 py-0.5 rounded-full font-bold">
                          Modèle 4-7-9
                        </span>
                      </div>

                      <div className="space-y-2 text-xs">
                        {selectedRecipe.architectures && (
                          <div className="flex items-start gap-2">
                            <strong className="text-[#0F261E] shrink-0 font-bold">4 Architectures :</strong>
                            <div className="flex flex-wrap gap-1.5">
                              {selectedRecipe.architectures.map((a, i) => (
                                <span key={i} className="px-2 py-0.5 rounded bg-[#0F261E] text-white text-[10px] font-bold">
                                  {a}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {selectedRecipe.terrains && (
                          <div className="flex items-start gap-2">
                            <strong className="text-[#0F261E] shrink-0 font-bold">7 Terrains :</strong>
                            <div className="flex flex-wrap gap-1.5">
                              {selectedRecipe.terrains.map((t, i) => (
                                <span key={i} className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 text-[10px] font-semibold border border-emerald-300">
                                  {t}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {selectedRecipe.axes && (
                          <div className="flex items-start gap-2">
                            <strong className="text-[#0F261E] shrink-0 font-bold">9 Axes :</strong>
                            <div className="flex flex-wrap gap-1.5">
                              {selectedRecipe.axes.map((x, i) => (
                                <span key={i} className="px-2 py-0.5 rounded bg-sky-100 text-sky-900 text-[10px] font-semibold border border-sky-300">
                                  {x}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-10">
                      <section>
                        <h4 className="text-xs font-bold text-botanik-green uppercase tracking-[0.2em] mb-6 border-b border-botanik-green/10 pb-4">
                          Ingrédients requis
                        </h4>
                        <ul className="grid sm:grid-cols-2 gap-4">
                          {selectedRecipe.ingredients.map((ing, i) => (
                            <li key={i} className="flex items-center gap-3 text-botanik-green/70">
                              <div className="w-1.5 h-1.5 rounded-full bg-botanik-orange" />
                              {ing}
                            </li>
                          ))}
                        </ul>
                      </section>

                      <div className="grid sm:grid-cols-2 gap-8">
                        <section className="bg-botanik-green/5 p-6 rounded-2xl">
                          <h4 className="text-[10px] font-bold text-botanik-green uppercase tracking-widest mb-4">Sachet A</h4>
                          <div className="text-sm space-y-2 text-botanik-green/80">
                            <p><strong>Compo:</strong> {selectedRecipe.sachetA.composition.join(', ')}</p>
                            <p><strong>Solvant:</strong> {selectedRecipe.sachetA.solvant}</p>
                            <p><strong>Cycle:</strong> {selectedRecipe.sachetA.temp} | {selectedRecipe.sachetA.duration}</p>
                          </div>
                        </section>
                        <section className="bg-botanik-green/5 p-6 rounded-2xl">
                          <h4 className="text-[10px] font-bold text-botanik-green uppercase tracking-widest mb-4">Sachet B</h4>
                          <div className="text-sm space-y-2 text-botanik-green/80">
                            <p><strong>Compo:</strong> {selectedRecipe.sachetB.composition.join(', ')}</p>
                            <p><strong>Solvant:</strong> {selectedRecipe.sachetB.solvant}</p>
                            <p><strong>Cycle:</strong> {selectedRecipe.sachetB.temp} | {selectedRecipe.sachetB.duration}</p>
                          </div>
                        </section>
                      </div>

                      <section>
                        <h4 className="text-xs font-bold text-botanik-green uppercase tracking-[0.2em] mb-4">Administration & Dosage</h4>
                        <div className="bg-[#F9F9F7] p-8 rounded-3xl space-y-4 text-sm text-botanik-green/80 border border-botanik-green/5">
                          <p><strong>Mode:</strong> {selectedRecipe.administration.mode}</p>
                          <div className="grid grid-cols-2 gap-4">
                            <p><strong>Dose:</strong> {selectedRecipe.administration.dailyDose}</p>
                            <p><strong>Max:</strong> {selectedRecipe.administration.maxDose}</p>
                          </div>
                          <p><strong>Fréquence:</strong> {selectedRecipe.administration.frequency} ({selectedRecipe.administration.timing})</p>
                          {selectedRecipe.administration.usageDuration && (
                            <p><strong>Durée:</strong> {selectedRecipe.administration.usageDuration}</p>
                          )}
                        </div>
                      </section>

                      <section className="grid sm:grid-cols-2 gap-8">
                        <div>
                          <h4 className="text-[10px] font-bold text-red-800 uppercase tracking-widest mb-4">Contre-indications</h4>
                          <ul className="space-y-2">
                            {selectedRecipe.contraindications.map((c, i) => (
                              <li key={i} className="text-xs text-red-800/70 flex gap-2"><span>•</span> {c}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-[10px] font-bold text-botanik-green uppercase tracking-widest mb-4">Précautions</h4>
                          <ul className="space-y-2">
                            {selectedRecipe.precautions.map((p, i) => (
                              <li key={i} className="text-xs text-botanik-green/60 flex gap-2"><span>•</span> {p}</li>
                            ))}
                          </ul>
                        </div>
                      </section>

                      <section>
                        <h4 className="text-xs font-bold text-botanik-green uppercase tracking-[0.2em] mb-6 border-b border-botanik-green/10 pb-4">
                          Bienfaits ciblés
                        </h4>
                        <div className="flex flex-wrap gap-3">
                          {selectedRecipe.benefits.map((benefit, i) => (
                            <span key={i} className="px-4 py-2 bg-[#F9F9F7] text-botanik-green/80 text-sm rounded-xl font-medium">
                              {benefit}
                            </span>
                          ))}
                        </div>
                      </section>
                    </div>
                  </div>

                  <div className="space-y-12">
                    <div className="aspect-square overflow-hidden rounded-[40px] shadow-lg">
                      <img 
                        src={selectedRecipe.image} 
                        alt={selectedRecipe.title} 
                        className="w-full h-full object-cover" 
                      />
                    </div>

                    <section className="bg-[#F9F9F7] p-10 rounded-[40px]">
                      <h4 className="text-xs font-bold text-botanik-green uppercase tracking-[0.2em] mb-8 flex items-center gap-3">
                        <PlayCircle className="w-5 h-5 text-botanik-orange" /> Protocole d'extraction
                      </h4>
                      <div className="space-y-8">
                        {selectedRecipe.instructions.map((step, i) => (
                          <div key={i} className="flex gap-6">
                            <span className="text-2xl font-bold text-botanik-orange opacity-30 italic">0{i+1}</span>
                            <p className="text-botanik-green font-medium leading-relaxed">{step}</p>
                          </div>
                        ))}
                      </div>
                    </section>

                    <div className="flex gap-4">
                      <button className="flex-1 bg-[#0F261E] hover:bg-[#D97706] active:bg-[#D97706] text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all shadow-xl shadow-black/10 cursor-pointer">
                        <Download className="w-5 h-5" /> Télécharger la fiche
                      </button>
                    </div>

                    <div className="mt-8 p-6 bg-botanik-orange/5 border border-botanik-orange/20 rounded-2xl">
                      <p className="text-xs font-bold text-botanik-orange uppercase tracking-widest mb-2 flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4" /> Message de sécurité
                      </p>
                      <p className="text-sm text-botanik-green/80 italic">"{selectedRecipe.safetyMessage}"</p>
                    </div>

                    <div className="mt-6 p-6 bg-[#0F261E] text-white rounded-2xl shadow-lg relative overflow-hidden" style={{ backgroundColor: '#0F261E', color: '#ffffff' }}>
                      <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-2xl" />
                      <p className="text-xs font-bold uppercase tracking-widest mb-2 opacity-60 text-white">Note d'ALMA</p>
                      <p className="text-sm font-medium leading-relaxed italic text-white/90">{selectedRecipe.bloomNote}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
