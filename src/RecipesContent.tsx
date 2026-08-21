import React, { useState } from 'react';
import { ArrowLeft, BookOpen, Clock, Heart, Share2, Search, Filter, PlayCircle, Download } from 'lucide-react';
import { discoveryRecipes, Recipe } from './data/recipesData';
import { translations, Language } from './translations';
import { motion, AnimatePresence } from 'motion/react';

interface RecipesContentProps {
  onBack: () => void;
  lang: Language;
}

export default function RecipesContent({ onBack, lang }: RecipesContentProps) {
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
            Espace <span className="text-botanik-orange">Découverte</span>
          </h1>
          <p className="text-xl text-botanik-green/60 font-light max-w-2xl">
            Vos 10 recettes fondamentales pour maîtriser votre BloomLab® et commencer votre voyage vers la souveraineté sanitaire.
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
        {filteredRecipes.map((recipe, index) => (
          <motion.div
            key={recipe.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => setSelectedRecipe(recipe)}
            className="group bg-white rounded-[32px] border border-botanik-green/5 overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer relative"
          >
            <div className="aspect-square bg-[#F9F9F7] flex items-center justify-center p-12 group-hover:bg-botanik-orange/5 transition-colors">
              <recipe.icon className="w-24 h-24 text-botanik-green group-hover:scale-110 group-hover:text-botanik-orange transition-all duration-700" />
            </div>
            <div className="p-8">
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
              <div className="mt-8 pt-6 border-t border-botanik-green/5 flex items-center justify-between">
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
                    <div className="aspect-square bg-[#F9F9F7] rounded-[40px] flex items-center justify-center p-20">
                      <selectedRecipe.icon className="w-full h-full text-botanik-green" />
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
                      <button className="flex-1 bg-botanik-green text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-botanik-orange transition-all shadow-xl shadow-botanik-green/10">
                        <Download className="w-5 h-5" /> Télécharger la fiche
                      </button>
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
