import React, { useState, useMemo, useEffect } from 'react';
import { Search, ChevronDown, ChevronUp, Beaker, Leaf, AlertTriangle, Activity, ChefHat, Lock, Sparkles, Star, FlaskConical, ChevronRight, Filter, Info, ArrowLeft, Droplets, Wind, Waves, Moon, Utensils } from 'lucide-react';
import { wrapTitle } from './lib/textUtils';
import { plantsDatabase, PlantData } from './data/therapeuticData';
import { unifiedBotanicalDatabase, UnifiedPlant } from './data/unifiedBotanicalData';
import { translations, Language } from './translations';

// --- DATA STRUCTURE (As requested for the CMS) ---
// (Interface and array moved to therapeuticData.ts)

const PlantAccordion: React.FC<{ 
  plant: PlantData, 
  onSelect: () => void,
  isFavorite?: boolean,
  onToggleFavorite?: () => void,
  lang: Language
}> = ({ plant, onSelect, isFavorite, onToggleFavorite, lang }) => {
  const t = translations[lang].herbarium;
  
  const getTranslated = (field: keyof PlantData) => {
    return (plant as any).translations?.[lang]?.[field] || plant[field];
  };

  const family = t.details.families[plant.famille_bloom] || plant.famille_bloom;
  const terrains = plant.terrains_cibles.map(ter => t.details.terrains[ter] || ter);

  return (
    <div 
      onClick={onSelect}
      className="bg-white rounded-[40px] border border-botanik-green/5 p-8 hover:shadow-xl transition-all duration-500 group cursor-pointer flex flex-col h-full relative overflow-hidden"
    >
      <div className="flex items-center justify-between mb-6">
        <span className="px-3 py-1 bg-botanik-green/5 text-botanik-green text-[10px] font-black uppercase tracking-widest rounded-full border border-botanik-green/10">
          {family}
        </span>
        <div className="flex items-center gap-2">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite?.();
            }}
            className={`p-2 rounded-full transition-colors ${isFavorite ? 'text-botanik-orange bg-botanik-orange/10' : 'text-botanik-green/20 hover:text-botanik-orange hover:bg-botanik-orange/5'}`}
          >
            <Star className={`w-4 h-4 ${isFavorite ? 'fill-botanik-orange' : ''}`} />
          </button>
          <div className="w-8 h-8 rounded-full bg-botanik-green/5 flex items-center justify-center text-botanik-green group-hover:bg-botanik-orange group-hover:text-white transition-all">
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>
      </div>

      <div className="mb-4">
        <h3 className="text-2xl font-bold text-botanik-green group-hover:text-botanik-orange transition-colors duration-300">
          {getTranslated('nom_commun')}
        </h3>
        <p className="text-xs italic text-botanik-green/40 mt-1">{plant.nom_latin}</p>
      </div>

      <p className="text-sm text-botanik-green/60 leading-relaxed mb-8 flex-grow line-clamp-3">
        {getTranslated('preuve_scientifique').slice(0, 150)}...
      </p>

      <div className="flex flex-wrap gap-2 mt-auto">
        {terrains.map(tag => (
          <span key={tag} className="text-[9px] font-bold px-2 py-1 bg-[#F9F9F7] rounded-md text-botanik-green/40 uppercase tracking-wider">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default function HerbariumContent({ 
  onNavigate, 
  onNavigatePending,
  initialPlantId,
  isPremium = false,
  onRequirePremium,
  favorites = [],
  onToggleFavorite,
  lang
}: { 
  onNavigate: (view: any, productId?: string) => void, 
  onNavigatePending?: () => void,
  initialPlantId?: string,
  isPremium?: boolean,
  onRequirePremium?: () => void,
  favorites?: string[],
  onToggleFavorite?: (id: string) => void,
  lang: Language
}) {
  const [selectedPlant, setSelectedPlant] = useState<PlantData | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<'all' | 'therapeutic' | 'culinary' | 'cosmetic'>('all');

  const t = translations[lang].herbarium;

  // Handle initial plant selection from navigation
  useEffect(() => {
    if (initialPlantId) {
      const plant = plantsDatabase.find(p => p.plant_id === initialPlantId);
      if (plant) {
        setSelectedPlant(plant);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }, [initialPlantId]);

  const filteredDirectory = useMemo(() => {
    let results = unifiedBotanicalDatabase;
    
    if (activeFilter !== 'all') {
      results = results.filter(p => p.source === activeFilter);
    }
    
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      results = results.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.latinName?.toLowerCase().includes(query) ||
        p.tags.some(t => t.toLowerCase().includes(query))
      );
    }
    
    return results;
  }, [searchQuery, activeFilter]);

  const handlePlantClick = (plant: UnifiedPlant) => {
    if (plant.source === 'therapeutic') {
      let fullData;
      if (plant.id.startsWith('therapeutic-recipe-')) {
        const recipeId = plant.id.replace('therapeutic-recipe-', '');
        fullData = plantsDatabase.find(p => (p.additional_recipes || []).some(r => r.id === recipeId));
      } else if (plant.id.startsWith('extra-recipe-')) {
        const recipeId = plant.id.replace('extra-recipe-', '');
        // For extra recipes from recipesData, they might correspond to plants in the database
        // Like Artichoke.
        fullData = plantsDatabase.find(p => (p.additional_recipes || []).some(r => r.id === recipeId));
      } else {
        const plantId = plant.id.replace('therapeutic-', '');
        fullData = plantsDatabase.find(p => p.plant_id === plantId);
      }
      
      if (fullData) {
        setSelectedPlant(fullData);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else if (plant.source === 'culinary') {
      const parts = plant.id.split('-');
      const plantId = parts[1];
      onNavigate('culinaire', plantId);
    } else if (plant.source === 'cosmetic') {
      const plantId = plant.id.replace('cosmetic-', '');
      onNavigate('cosmetiques', plantId);
    }
  };

  const getTranslated = (plant: PlantData, field: string) => {
    return (plant as any).translations?.[lang]?.[field] || (plant as any)[field];
  };

  const counts = useMemo(() => {
    return {
      all: unifiedBotanicalDatabase.length,
      therapeutic: unifiedBotanicalDatabase.filter(p => p.source === 'therapeutic').length,
      culinary: unifiedBotanicalDatabase.filter(p => p.source === 'culinary').length,
      cosmetic: unifiedBotanicalDatabase.filter(p => p.source === 'cosmetic').length
    };
  }, []);

  if (selectedPlant) {
    const family = t.details.families[selectedPlant.famille_bloom] || selectedPlant.famille_bloom;
    const terrains = selectedPlant.terrains_cibles.map(ter => t.details.terrains[ter] || ter);

    return (
      <div className="max-w-[1200px] mx-auto px-6 py-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <button 
          onClick={() => setSelectedPlant(null)}
          className="flex items-center gap-2 text-botanik-green/60 hover:text-botanik-green font-bold mb-12 group transition-colors"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> {t.details.back}
        </button>

        <header className="mb-16">
          <div className="flex gap-4 text-sm font-medium text-botanik-green/60 mb-6 uppercase tracking-widest flex-wrap">
            <span>{family}</span>
            <span>•</span>
            <span>{selectedPlant.nom_latin}</span>
          </div>
          <h1 className="text-3xl md:text-8xl font-bold text-botanik-green mb-6 md:mb-8 leading-[0.9] tracking-tighter">
            {wrapTitle(getTranslated(selectedPlant, 'nom_commun'))}
          </h1>
          <div className="flex flex-wrap gap-3">
            {terrains.map(t => (
              <span key={t} className="px-4 py-2 bg-botanik-green/5 text-botanik-green rounded-full text-xs font-bold border border-botanik-green/10">
                {t}
              </span>
            ))}
          </div>
        </header>
        
        <div className="grid lg:grid-cols-[1fr_400px] gap-16">
          <div className="space-y-16">
            {/* 1. SCIENCE DU TOTUM */}
            <section className="bg-white p-10 rounded-[40px] border border-botanik-green/5 shadow-sm">
              <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-botanik-green/40 mb-8 flex items-center gap-2">
                <Beaker className="w-4 h-4" /> {t.details.science.title}
              </h2>
              <div className="grid md:grid-cols-2 gap-10">
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-widest text-botanik-green mb-4">{t.details.science.actives_title}</h4>
                  <div className="space-y-4">
                    {selectedPlant.actifs_cles.map(a => (
                      <div key={a.nom} className="flex justify-between items-center py-2 border-b border-botanik-green/5">
                        <span className="text-sm font-medium text-botanik-green">{(a as any).translations?.[lang]?.nom || a.nom}</span>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-botanik-green/40">{(a as any).translations?.[lang]?.polarite || a.polarite}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-botanik-green/5 p-8 rounded-3xl">
                  <h4 className="text-sm font-bold uppercase tracking-widest text-botanik-green mb-4">{t.details.science.evidence_title}</h4>
                  <p className="text-sm text-botanik-green/70 leading-relaxed italic">
                    "{getTranslated(selectedPlant, 'preuve_scientifique')}"
                  </p>
                </div>
              </div>
            </section>

            {/* 2. INGÉNIERIE BLOOMLAB */}
            <section className="bg-botanik-green text-white p-10 md:p-16 rounded-[60px] relative overflow-hidden">
              <div className="absolute top-0 right-0 p-12 opacity-5">
                <FlaskConical className="w-64 h-64" />
              </div>
              <div className="relative z-10">
                <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-white/40 mb-10 flex items-center gap-2">
                  <FlaskConical className="w-4 h-4" /> {t.details.engineering.title}
                </h2>
                <div className="mb-12 max-w-2xl">
                  <h3 className="text-3xl font-bold mb-4">{t.details.engineering.why_extraction}</h3>
                  <p className="text-white/70 leading-relaxed">{selectedPlant.pourquoi_bloomlab.translations?.[lang]?.probleme_traditionnel || selectedPlant.pourquoi_bloomlab.probleme_traditionnel}</p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/10">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-8 h-8 bg-botanik-orange rounded-lg flex items-center justify-center text-xs font-bold">A</div>
                      <span className="font-bold uppercase tracking-widest text-xs">{t.details.engineering.phase_a}</span>
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between text-sm">
                        <span className="opacity-60">{t.details.engineering.temperature}</span>
                        <span className="font-bold">{selectedPlant.pourquoi_bloomlab.phase_A.temp}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="opacity-60">{t.details.engineering.time}</span>
                        <span className="font-bold">{selectedPlant.pourquoi_bloomlab.phase_A.temps || t.details.engineering.variable}</span>
                      </div>
                      <div className="pt-4 border-t border-white/10">
                        <p className="text-xs italic text-white/80">{selectedPlant.pourquoi_bloomlab.phase_A.translations?.[lang]?.cible || selectedPlant.pourquoi_bloomlab.phase_A.cible}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/10">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-8 h-8 bg-botanik-orange rounded-lg flex items-center justify-center text-xs font-bold">B</div>
                      <span className="font-bold uppercase tracking-widest text-xs">{t.details.engineering.phase_b}</span>
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between text-sm">
                        <span className="opacity-60">{t.details.engineering.temperature}</span>
                        <span className="font-bold">{selectedPlant.pourquoi_bloomlab.phase_B.temp}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="opacity-60">{t.details.engineering.time}</span>
                        <span className="font-bold">{selectedPlant.pourquoi_bloomlab.phase_B.temps || t.details.engineering.variable}</span>
                      </div>
                      <div className="pt-4 border-t border-white/10">
                        <p className="text-xs italic text-white/80">{selectedPlant.pourquoi_bloomlab.phase_B.translations?.[lang]?.cible || selectedPlant.pourquoi_bloomlab.phase_B.cible}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 3. RECETTE PAS À PAS (If available) */}
            {selectedPlant.recette_pas_a_pas && (
              <section className="bg-white p-10 rounded-[40px] border border-botanik-green/5 shadow-sm">
                <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-botanik-green/40 mb-10 flex items-center gap-2">
                  <ChefHat className="w-4 h-4" /> {t.details.protocol.title}
                </h2>
                <div className="mb-12 p-6 bg-[#F9F9F7] rounded-3xl border border-botanik-green/5">
                  <h4 className="font-bold text-botanik-green mb-2">{selectedPlant.recette_pas_a_pas.translations?.[lang]?.batch_standard || selectedPlant.recette_pas_a_pas.batch_standard}</h4>
                </div>
                
                <div className="space-y-12">
                  {/* Preparation */}
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-widest text-botanik-orange mb-6 flex items-center gap-2">
                      <Leaf className="w-4 h-4" /> {t.details.protocol.preparation}
                    </h4>
                    <div className="space-y-4">
                      {(selectedPlant.recette_pas_a_pas.translations?.[lang]?.preparation || selectedPlant.recette_pas_a_pas.preparation).map((step: string, i: number) => (
                        <div key={i} className="flex gap-4">
                          <span className="text-botanik-green/20 font-bold">{i+1}.</span>
                          <p className="text-sm text-botanik-green/80">{step}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Phase A */}
                  <div className="pl-6 border-l-2 border-botanik-orange/20">
                    <h4 className="text-sm font-bold uppercase tracking-widest text-botanik-orange mb-6">{t.details.protocol.phase_a}</h4>
                    <div className="space-y-4">
                      {(selectedPlant.recette_pas_a_pas.translations?.[lang]?.phase_A_instructions || selectedPlant.recette_pas_a_pas.phase_A_instructions).map((step: string, i: number) => (
                        <div key={i} className="flex gap-4">
                          <span className="text-botanik-orange/40 font-bold">•</span>
                          <p className="text-sm text-botanik-green/80">{step}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Transition */}
                  <div className="p-8 bg-botanik-orange/5 rounded-3xl border border-botanik-orange/10">
                    <h4 className="text-sm font-bold uppercase tracking-widest text-botanik-orange mb-4 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4" /> {t.details.protocol.transition}
                    </h4>
                    <div className="space-y-3">
                      {(selectedPlant.recette_pas_a_pas.translations?.[lang]?.transition || selectedPlant.recette_pas_a_pas.transition).map((step: string, i: number) => (
                        <p key={i} className="text-xs font-medium text-botanik-orange/80 leading-relaxed">{step}</p>
                      ))}
                    </div>
                  </div>

                  {/* Phase B */}
                  <div className="pl-6 border-l-2 border-botanik-orange/20">
                    <h4 className="text-sm font-bold uppercase tracking-widest text-botanik-orange mb-6">{t.details.protocol.phase_b}</h4>
                    <div className="space-y-4">
                      {(selectedPlant.recette_pas_a_pas.translations?.[lang]?.phase_B_instructions || selectedPlant.recette_pas_a_pas.phase_B_instructions).map((step: string, i: number) => (
                        <div key={i} className="flex gap-4">
                          <span className="text-botanik-orange/40 font-bold">•</span>
                          <p className="text-sm text-botanik-green/80">{step}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Filtration */}
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-widest text-botanik-orange mb-6">{t.details.protocol.filtration}</h4>
                    <div className="space-y-4">
                      {(selectedPlant.recette_pas_a_pas.translations?.[lang]?.filtration_et_finition || selectedPlant.recette_pas_a_pas.filtration_et_finition).map((step: string, i: number) => (
                        <div key={i} className="flex gap-4">
                          <span className="text-botanik-green/20 font-bold">{i+1}.</span>
                          <p className="text-sm text-botanik-green/80">{step}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* USAGE STANDARD */}
            {selectedPlant.usage_standard && (
              <section className="bg-white p-10 rounded-[40px] border border-botanik-green/5 shadow-sm">
                <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-botanik-green/40 mb-10 flex items-center gap-2">
                  <Activity className="w-4 h-4" /> {t.details.usage.title}
                </h2>
                <div className="grid md:grid-cols-2 gap-10">
                  <div className="space-y-6">
                    <h4 className="text-sm font-bold uppercase tracking-widest text-botanik-green">{t.details.usage.daily}</h4>
                    <div className="space-y-4 text-sm text-botanik-green/80">
                      <p><strong>{t.details.usage.mode}</strong> {selectedPlant.usage_standard.translations?.[lang]?.mode_administration || selectedPlant.usage_standard.mode_administration}</p>
                      <p><strong>{t.details.usage.dosage}</strong> {selectedPlant.usage_standard.translations?.[lang]?.posologie_quotidienne || selectedPlant.usage_standard.posologie_quotidienne}</p>
                      <p><strong>{t.details.usage.max_dose}</strong> {selectedPlant.usage_standard.translations?.[lang]?.dose_maximale || selectedPlant.usage_standard.dose_maximale}</p>
                      <p><strong>{t.details.usage.duration}</strong> {selectedPlant.usage_standard.translations?.[lang]?.duree_utilisation || selectedPlant.usage_standard.duree_utilisation}</p>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <h4 className="text-sm font-bold uppercase tracking-widest text-red-700">{t.details.usage.contraindications}</h4>
                    <ul className="space-y-2 text-sm text-red-900/70">
                      {(selectedPlant.usage_standard.translations?.[lang]?.contre_indications || selectedPlant.usage_standard.contre_indications).map((ci: string, i: number) => (
                        <li key={i} className="flex gap-2">
                          <span className="text-red-300">•</span> {ci}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>
            )}

            {/* 3.5 ADDITIONAL RECIPES (If available) */}
            {selectedPlant.additional_recipes && selectedPlant.additional_recipes.length > 0 && (
              <section className="bg-white p-10 rounded-[40px] border border-botanik-green/5 shadow-sm">
                <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-botanik-green/40 mb-10 flex items-center gap-2">
                  <Utensils className="w-4 h-4" /> {t.details.specific_protocols.title}
                </h2>
                <div className="space-y-6">
                  {selectedPlant.additional_recipes.map((recipe, idx) => (
                    <div key={idx} className="p-8 bg-[#F9F9F7] rounded-3xl border border-botanik-green/5 hover:border-botanik-orange/20 transition-all group">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                        <div>
                          <h4 className="text-xl font-bold text-botanik-green mb-1">{recipe.title}</h4>
                          <p className="text-sm text-botanik-green/60">{recipe.goal}</p>
                        </div>
                        <span className="px-4 py-1 bg-botanik-green/10 text-botanik-green text-[10px] font-bold uppercase tracking-widest rounded-full border border-botanik-green/10">
                          {recipe.process.method.replace(/_/g, ' ')}
                        </span>
                      </div>

                      <div className="grid md:grid-cols-3 gap-8 mb-8">
                        <div className="space-y-3">
                          <h5 className="text-[10px] font-bold uppercase tracking-widest text-botanik-green/40">{t.details.specific_protocols.params}</h5>
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-botanik-orange shadow-sm">
                              <Droplets className="w-4 h-4" />
                            </div>
                            <div>
                              <p className="text-xs font-bold text-botanik-green">
                                {recipe.solvent.volume_ml || (recipe.solvent.water_volume_ml! + recipe.solvent.ethanol_volume_ml!)} ml
                              </p>
                              <p className="text-[10px] text-botanik-green/40 uppercase">{recipe.solvent.type}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-botanik-orange shadow-sm">
                              <Wind className="w-4 h-4" />
                            </div>
                            <div>
                              <p className="text-xs font-bold text-botanik-green">{recipe.process.temperature_c}°C</p>
                              <p className="text-[10px] text-botanik-green/40 uppercase">{recipe.process.time_min} min</p>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <h5 className="text-[10px] font-bold uppercase tracking-widest text-botanik-green/40">{t.details.specific_protocols.plants}</h5>
                          <p className="text-xs font-medium text-botanik-green">
                            {recipe.plant.sachet_count} sachets ({recipe.plant.total_plant_mass_g}g)
                          </p>
                          <p className="text-[10px] text-botanik-green/60 italic">{recipe.plant.part}</p>
                        </div>

                        <div className="space-y-3">
                          <h5 className="text-[10px] font-bold uppercase tracking-widest text-botanik-green/40">{t.details.specific_protocols.usage}</h5>
                          <p className="text-xs font-medium text-botanik-green">
                            {recipe.use.servings.length} prises / jour
                          </p>
                          <p className="text-[10px] text-botanik-green/60 line-clamp-2">{recipe.use.notes}</p>
                        </div>
                      </div>

                      <div className="pt-6 border-t border-botanik-green/5 flex justify-between items-center">
                        <div className="flex items-center gap-2 text-[10px] font-bold text-botanik-green/40 uppercase tracking-wider">
                           <Info className="w-3 h-3" /> {recipe.storage.max_hours}h {t.details.specific_protocols.max_hours}
                        </div>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            onNavigate('pending');
                          }}
                          className="flex items-center gap-2 text-xs font-bold text-botanik-orange hover:gap-3 transition-all"
                        >
                          {recipe.cta.label} <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* 4. SOCLE SYNERGIQUE */}
            {selectedPlant.socle_synergique && (
              <section className="bg-[#F9F9F7] p-10 rounded-[40px] border border-botanik-green/5">
                <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-botanik-green/40 mb-10 flex items-center gap-2">
                  <Activity className="w-4 h-4" /> {t.details.synergy.title}
                </h2>
                <div className="grid md:grid-cols-2 gap-10">
                  <div className="space-y-8">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-botanik-green">{t.details.synergy.cofactors}</h4>
                    {selectedPlant.socle_synergique.cofacteurs_complements.map(c => (
                      <div key={c.nom} className="bg-white p-6 rounded-2xl border border-botanik-green/5">
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-bold text-sm text-botanik-green">{(c as any).translations?.[lang]?.nom || c.nom}</span>
                          <span className="text-[10px] font-bold text-botanik-orange">{(c as any).translations?.[lang]?.dose || c.dose}</span>
                        </div>
                        <p className="text-xs text-botanik-green/60 leading-relaxed">{(c as any).translations?.[lang]?.role || c.role}</p>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-8">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-botanik-green">{t.details.synergy.levers}</h4>
                    {selectedPlant.socle_synergique.leviers_du_vivant.map(l => (
                      <div key={l.nom} className="bg-white p-6 rounded-2xl border border-botanik-green/5">
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-bold text-sm text-botanik-green">{(l as any).translations?.[lang]?.nom || l.nom}</span>
                          <span className="text-[10px] font-bold text-botanik-orange">{(l as any).translations?.[lang]?.frequence || l.frequence}</span>
                        </div>
                        <p className="text-xs text-botanik-green/60 leading-relaxed">{(l as any).translations?.[lang]?.role || l.role}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}
          </div>

          <aside className="space-y-8">
            <div className="bg-white p-8 rounded-[40px] border border-botanik-green/5 sticky top-24">
              <div className="mb-10">
                <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-botanik-green/30 mb-4">{t.details.expert.title}</h4>
                <p className="text-sm font-medium text-botanik-green/80 leading-relaxed italic">
                  "{getTranslated(selectedPlant, 'note_expert') || t.details.expert.default_note}"
                </p>
              </div>

              <div className="space-y-10">
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-botanik-green/30 mb-4">{t.details.expert.convergence}</h4>
                  <p className="text-xs text-botanik-green/70 leading-relaxed">{getTranslated(selectedPlant, 'convergence_ancestrale')}</p>
                </div>
                
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-botanik-green/30 mb-4">{t.details.expert.synergies}</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedPlant.synergies_recommandees.map(s => (
                      <span key={s} className="text-[10px] font-bold px-3 py-1 bg-botanik-green/5 rounded-full text-botanik-green/60 uppercase tracking-wider">{s}</span>
                    ))}
                  </div>
                </div>

                {selectedPlant.precautions && (
                  <div className="pt-8 border-t border-botanik-green/5">
                    <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-botanik-magenta/60 mb-3 flex items-center gap-2">
                      <AlertTriangle className="w-3 h-3" /> {t.details.expert.precautions}
                    </h4>
                    <p className="text-[10px] text-botanik-magenta/80 leading-relaxed">{getTranslated(selectedPlant, 'precautions')}</p>
                  </div>
                )}
              </div>
            </div>
          </aside>
        </div>
      </div>
    );
  }

  // DIRECTORY VIEW (Landing Page)
  return (
    <div className="animate-in slide-in-from-right duration-500 pb-20">
      
      {/* Search & Filter Header (App Style) */}
      <div className="bg-white px-4 md:px-6 pt-6 md:pt-8 pb-4 border-b border-botanik-green/5">
        <h1 className="text-2xl md:text-3xl font-bold text-botanik-green mb-1 md:mb-2">{t.header.title}</h1>
        <p className="text-[10px] md:text-sm text-botanik-green/40 font-medium uppercase tracking-widest mb-2">{t.header.subtitle}</p>
        <p className="text-sm text-botanik-green/60 mb-4 md:mb-6">{t.header.description}</p>
        
        <div className="relative mb-4 md:mb-6 max-w-2xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 md:w-5 h-4 md:h-5 text-botanik-green/30" />
          <input
            type="text"
            placeholder={t.header.search_placeholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 md:pl-12 pr-4 py-2 md:py-3 bg-[#F9F9F7] rounded-xl md:rounded-2xl border-none text-sm md:text-base text-botanik-green focus:ring-2 focus:ring-botanik-orange/20"
          />
        </div>
      </div>

      {/* FILTERS with Counts moved here for mobile/desktop alignment */}
      <div className="sticky top-0 z-30 bg-[#F9F9F7]/95 backdrop-blur-md py-3 md:py-4 px-4 md:px-6 mb-8 border-b border-botanik-green/5 overflow-x-auto whitespace-nowrap scrollbar-hide">
        <div className="flex gap-2 items-center">
          {[
            { id: 'all', label: t.filters.all, icon: Leaf, count: counts.all },
            { id: 'therapeutic', label: t.filters.therapeutic, icon: Activity, count: counts.therapeutic },
            { id: 'culinary', label: t.filters.culinary, icon: ChefHat, count: counts.culinary },
            { id: 'cosmetic', label: t.filters.cosmetic, icon: Sparkles, count: counts.cosmetic }
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-[10px] md:text-xs font-bold transition-all ${
                activeFilter === f.id 
                  ? 'bg-botanik-green text-white shadow-md' 
                  : 'bg-white text-botanik-green/40 border border-botanik-green/5 hover:border-botanik-green/20'
              }`}
            >
              <f.icon className="w-3.5 h-3.5 md:w-4 md:h-4" />
              <span>{f.label}</span>
              <span className={`text-[8px] md:text-[10px] px-1.5 py-0.5 rounded-md ${activeFilter === f.id ? 'bg-white/20 text-white' : 'bg-botanik-green/5 text-botanik-green/40'}`}>
                {f.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* GRID VIEW */}
      <div className="px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDirectory.map((plant) => {
            // Locking logic: 4 free recipes per category based on global order
            const categoryItems = unifiedBotanicalDatabase.filter(p => p.source === plant.source);
            const itemIndexInCategory = categoryItems.findIndex(p => p.id === plant.id);
            const isLocked = !isPremium && itemIndexInCategory >= 10;
            
            const originalId = plant.id.split('-').slice(1).join('-');
            const therapeuticData = plant.source === 'therapeutic' ? plantsDatabase.find(p => p.plant_id === originalId) : null;
            
            const displayName = therapeuticData 
              ? (therapeuticData as any).translations?.[lang]?.nom_commun || therapeuticData.nom_commun
              : plant.name;
            
            const displayDescription = therapeuticData
              ? (therapeuticData as any).translations?.[lang]?.preuve_scientifique || therapeuticData.preuve_scientifique
              : plant.description;

            const displayFamily = therapeuticData
              ? t.details.families[therapeuticData.famille_bloom] || therapeuticData.famille_bloom
              : plant.category;

            const displayTags = therapeuticData
              ? therapeuticData.terrains_cibles.map(ter => t.details.terrains[ter] || ter)
              : plant.tags;

            return (
              <div 
                key={plant.id} 
                onClick={() => isLocked ? onRequirePremium?.() : handlePlantClick(plant)}
                className="bg-white rounded-[40px] border border-botanik-green/5 p-8 hover:shadow-xl transition-all duration-500 group cursor-pointer flex flex-col h-full relative overflow-hidden"
              >
                {isLocked && (
                  <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] z-10 flex flex-col items-center justify-center p-6 text-center">
                    <div className="w-12 h-12 bg-botanik-green rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                      <Lock className="w-6 h-6 text-white" />
                    </div>
                    <p className="text-sm font-bold uppercase tracking-widest text-botanik-green mb-1">{t.card.premium_access}</p>
                    <p className="text-[10px] text-botanik-green/60 font-medium">{t.card.subscribe}</p>
                  </div>
                )}
                {/* Category Badge */}
                <div className="flex items-center justify-between mb-6">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border shadow-sm ${
                    plant.source === 'therapeutic' ? 'bg-botanik-green text-white border-botanik-green' :
                    plant.source === 'culinary' ? 'bg-botanik-orange text-white border-botanik-orange' :
                    'bg-botanik-green text-white border-botanik-green'
                  }`}>
                    {displayFamily}
                  </span>
                  <div className="flex items-center gap-2">
                    {plant.source === 'therapeutic' && (
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          const originalId = plant.id.split('-').slice(1).join('-');
                          onToggleFavorite?.(originalId);
                        }}
                        className={`p-2 rounded-full transition-colors ${favorites.includes(plant.id.split('-').slice(1).join('-')) ? 'text-botanik-orange bg-botanik-orange/10' : 'text-botanik-green/20 hover:text-botanik-orange hover:bg-botanik-orange/5'}`}
                      >
                        <Star className={`w-4 h-4 ${favorites.includes(plant.id.split('-').slice(1).join('-')) ? 'fill-botanik-orange' : ''}`} />
                      </button>
                    )}
                    <div className="w-8 h-8 rounded-full bg-botanik-green/5 flex items-center justify-center text-botanik-green group-hover:bg-botanik-orange group-hover:text-white transition-all">
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <h3 className="text-xl md:text-2xl font-bold text-botanik-green group-hover:text-botanik-orange transition-colors duration-300">
                    {displayName}
                  </h3>
                  {plant.latinName && (
                    <p className="text-xs italic text-botanik-green/40 mt-1">{plant.latinName}</p>
                  )}
                </div>

                <p className="text-sm text-botanik-green/60 leading-relaxed mb-8 flex-grow line-clamp-3">
                  {displayDescription}
                </p>

                <div className="flex flex-wrap gap-2 mt-auto">
                  {displayTags.slice(0, 3).map(tag => (
                    <span key={tag} className="text-[9px] font-bold px-2 py-1 bg-[#F9F9F7] rounded-md text-botanik-green/40 uppercase tracking-wider">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Decorative background icon */}
                <div className="absolute -bottom-2 -right-2 opacity-[0.03] group-hover:scale-110 group-hover:opacity-[0.05] transition-all duration-700">
                  {plant.source === 'therapeutic' && <Activity className="w-3.5 h-3.5" />}
                  {plant.source === 'culinary' && <ChefHat className="w-3.5 h-3.5" />}
                  {plant.source === 'cosmetic' && <Sparkles className="w-3.5 h-3.5" />}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {filteredDirectory.length === 0 && (
        <div className="text-center py-24 bg-white rounded-[60px] border border-dashed border-botanik-green/10">
          <Leaf className="w-16 h-16 text-botanik-green/10 mx-auto mb-6" />
          <h3 className="text-2xl font-bold text-botanik-green mb-2">{t.empty.title}</h3>
          <p className="text-botanik-green/40">{t.empty.description}</p>
        </div>
      )}
    </div>
  );
}
