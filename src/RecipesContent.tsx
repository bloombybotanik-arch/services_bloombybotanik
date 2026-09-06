import React, { useState } from 'react';
import { ArrowLeft, BookOpen, Clock, Heart, Share2, Search, Filter, PlayCircle, Download, ShieldCheck } from 'lucide-react';
import { discoveryRecipes, Recipe } from './data/recipesData';
import { translations, Language } from './translations';
import { motion, AnimatePresence } from 'motion/react';

interface RecipesContentProps {
  onBack: () => void;
  lang: Language;
  t: any;
}

export default function RecipesContent({ onBack, lang, t }: RecipesContentProps) {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', ...new Set(discoveryRecipes.map(r => r.category))];

  const filteredRecipes = discoveryRecipes.filter(recipe => {
    const matchesSearch = recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         recipe.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || recipe.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  // Limit to 5 per category for freemium (mocking premium check)
  const isPremium = false; // This should be dynamic in a real app
  const visibleRecipes = isPremium ? filteredRecipes : filteredRecipes.reduce((acc: Recipe[], recipe) => {
    const categoryCount = acc.filter(r => r.category === recipe.category).length;
    if (categoryCount < 5) {
      acc.push(recipe);
    }
    return acc;
  }, []);

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

      <div className="flex gap-2 overflow-x-auto pb-4 mb-12 no-scrollbar">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-6 py-2 rounded-full whitespace-nowrap transition-all font-medium ${activeCategory === category ? 'bg-botanik-green text-white shadow-lg' : 'bg-white text-botanik-green/60 hover:bg-botanik-green/5'}`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {visibleRecipes.map((recipe, index) => (
          <motion.div
            key={recipe.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => setSelectedRecipe(recipe)}
            className="group bg-white rounded-[32px] border border-botanik-green/5 overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer relative flex flex-col"
          >
            <div className="aspect-[4/3] overflow-hidden relative">
              <img 
                src={recipe.image} 
                alt={recipe.title} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
            </div>
            <div className="p-8 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <span className="px-3 py-1 bg-botanik-green/5 text-botanik-green text-[10px] font-bold uppercase tracking-widest rounded-full">
                  {recipe.category}
                </span>
                <span className="text-xs font-bold text-botanik-green/20">RECETTE #{recipe.id}</span>
              </div>
              <h3 className="text-2xl font-bold text-botanik-green mb-3 group-hover:text-botanik-orange transition-colors">
                {recipe.title}
              </h3>
              <p className="text-botanik-green/60 text-sm leading-relaxed line-clamp-2">
                {recipe.description}
              </p>
              <div className="mt-auto pt-6 border-t border-botanik-green/5 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-botanik-green/40">
                  <Clock className="w-4 h-4" /> 15-45 MIN
                </div>
                <div className="flex items-center gap-2 text-botanik-orange font-bold text-sm">
                  Voir le détail <ArrowLeft className="w-4 h-4 rotate-180" />
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
                    <p className="text-xl text-botanik-green/60 mb-12 font-light leading-relaxed">
                      {selectedRecipe.description}
                    </p>

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
