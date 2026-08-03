import React, { useState, useMemo, useEffect } from 'react';
import { Search, ChevronDown, ChevronUp, Beaker, Leaf, AlertTriangle, Activity, ChefHat, Lock, Sparkles, Star, FlaskConical, ChevronRight, Filter, Info, ArrowLeft, Droplets, Wind, Waves, Moon, Utensils } from 'lucide-react';
import { wrapTitle } from './lib/textUtils';
import { plantsDatabase, PlantData } from './data/therapeuticData';
import { unifiedBotanicalDatabase, UnifiedPlant } from './data/unifiedBotanicalData';

// --- DATA STRUCTURE (As requested for the CMS) ---
// (Interface and array moved to therapeuticData.ts)

const PlantAccordion: React.FC<{ 
  plant: PlantData, 
  onSelect: () => void,
  isFavorite?: boolean,
  onToggleFavorite?: () => void
}> = ({ plant, onSelect, isFavorite, onToggleFavorite }) => {
  return (
    <div 
      onClick={onSelect}
      className="bg-white rounded-[40px] border border-botanik-green/5 p-8 hover:shadow-xl transition-all duration-500 group cursor-pointer flex flex-col h-full relative overflow-hidden"
    >
      <div className="flex items-center justify-between mb-6">
        <span className="px-3 py-1 bg-botanik-green/5 text-botanik-green text-[10px] font-black uppercase tracking-widest rounded-full border border-botanik-green/10">
          {plant.famille_bloom}
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
          {plant.nom_commun}
        </h3>
        <p className="text-xs italic text-botanik-green/40 font-serif mt-1">{plant.nom_latin}</p>
      </div>

      <p className="text-sm text-botanik-green/60 leading-relaxed mb-8 flex-grow line-clamp-3">
        {plant.preuve_scientifique.slice(0, 150)}...
      </p>

      <div className="flex flex-wrap gap-2 mt-auto">
        {plant.terrains_cibles.map(tag => (
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
  onToggleFavorite
}: { 
  onNavigate: (view: any, productId?: string) => void, 
  onNavigatePending?: () => void,
  initialPlantId?: string,
  isPremium?: boolean,
  onRequirePremium?: () => void,
  favorites?: string[],
  onToggleFavorite?: (id: string) => void
}) {
  const [selectedPlant, setSelectedPlant] = useState<PlantData | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<'all' | 'therapeutic' | 'culinary' | 'cosmetic'>('all');

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
    const originalId = plant.id.split('-').slice(1).join('-');
    if (plant.source === 'therapeutic') {
      const fullData = plantsDatabase.find(p => p.plant_id === originalId);
      if (fullData) {
        setSelectedPlant(fullData);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else if (plant.source === 'culinary') {
      onNavigate('culinaire', originalId);
    } else if (plant.source === 'cosmetic') {
      onNavigate('cosmetiques', originalId);
    }
  };

  if (selectedPlant) {
    return (
      <div className="max-w-[1200px] mx-auto px-6 py-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <button 
          onClick={() => setSelectedPlant(null)}
          className="flex items-center gap-2 text-botanik-green/60 hover:text-botanik-green font-bold mb-12 group transition-colors"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> Retour au Répertoire
        </button>

        <header className="mb-16">
          <div className="flex gap-4 text-sm font-medium text-botanik-green/60 mb-6 uppercase tracking-widest flex-wrap">
            <span>{selectedPlant.famille_bloom}</span>
            <span>•</span>
            <span>{selectedPlant.nom_latin}</span>
          </div>
          <h1 className="text-3xl md:text-8xl font-bold text-botanik-green mb-6 md:mb-8 leading-[0.9] tracking-tighter">
            {wrapTitle(selectedPlant.nom_commun)}
          </h1>
          <div className="flex flex-wrap gap-3">
            {selectedPlant.terrains_cibles.map(t => (
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
                <Beaker className="w-4 h-4" /> I. La Science du Totum
              </h2>
              <div className="grid md:grid-cols-2 gap-10">
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-widest text-botanik-green mb-4">Actifs Clés & Polarité</h4>
                  <div className="space-y-4">
                    {selectedPlant.actifs_cles.map(a => (
                      <div key={a.nom} className="flex justify-between items-center py-2 border-b border-botanik-green/5">
                        <span className="text-sm font-medium text-botanik-green">{a.nom}</span>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-botanik-green/40">{a.polarite}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-botanik-green/5 p-8 rounded-3xl">
                  <h4 className="text-sm font-bold uppercase tracking-widest text-botanik-green mb-4">Preuve Scientifique</h4>
                  <p className="text-sm text-botanik-green/70 leading-relaxed italic">
                    "{selectedPlant.preuve_scientifique}"
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
                  <FlaskConical className="w-4 h-4" /> II. Ingénierie BloomLab
                </h2>
                <div className="mb-12 max-w-2xl">
                  <h3 className="text-3xl font-bold mb-4">Pourquoi l'extraction ?</h3>
                  <p className="text-white/70 leading-relaxed">{selectedPlant.pourquoi_bloomlab.probleme_traditionnel}</p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/10">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-8 h-8 bg-botanik-orange rounded-lg flex items-center justify-center text-xs font-bold">A</div>
                      <span className="font-bold uppercase tracking-widest text-xs">Phase A : Hydrosoluble</span>
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between text-sm">
                        <span className="opacity-60">Température</span>
                        <span className="font-bold">{selectedPlant.pourquoi_bloomlab.phase_A.temp}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="opacity-60">Temps</span>
                        <span className="font-bold">{selectedPlant.pourquoi_bloomlab.phase_A.temps || "Variable"}</span>
                      </div>
                      <div className="pt-4 border-t border-white/10">
                        <p className="text-xs italic text-white/80">{selectedPlant.pourquoi_bloomlab.phase_A.cible}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/10">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-8 h-8 bg-botanik-orange rounded-lg flex items-center justify-center text-xs font-bold">B</div>
                      <span className="font-bold uppercase tracking-widest text-xs">Phase B : Liposoluble</span>
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between text-sm">
                        <span className="opacity-60">Température</span>
                        <span className="font-bold">{selectedPlant.pourquoi_bloomlab.phase_B.temp}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="opacity-60">Temps</span>
                        <span className="font-bold">{selectedPlant.pourquoi_bloomlab.phase_B.temps || "Variable"}</span>
                      </div>
                      <div className="pt-4 border-t border-white/10">
                        <p className="text-xs italic text-white/80">{selectedPlant.pourquoi_bloomlab.phase_B.cible}</p>
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
                  <ChefHat className="w-4 h-4" /> III. Protocole d'Extraction
                </h2>
                <div className="mb-12 p-6 bg-[#F9F9F7] rounded-3xl border border-botanik-green/5">
                  <h4 className="font-bold text-botanik-green mb-2">{selectedPlant.recette_pas_a_pas.batch_standard}</h4>
                </div>
                
                <div className="space-y-12">
                  {/* Preparation */}
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-widest text-botanik-orange mb-6 flex items-center gap-2">
                      <Leaf className="w-4 h-4" /> 1. Préparation des plantes
                    </h4>
                    <div className="space-y-4">
                      {selectedPlant.recette_pas_a_pas.preparation.map((step, i) => (
                        <div key={i} className="flex gap-4">
                          <span className="text-botanik-green/20 font-bold">{i+1}.</span>
                          <p className="text-sm text-botanik-green/80">{step}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Phase A */}
                  <div className="pl-6 border-l-2 border-botanik-orange/20">
                    <h4 className="text-sm font-bold uppercase tracking-widest text-botanik-orange mb-6">2. Lancement Phase A</h4>
                    <div className="space-y-4">
                      {selectedPlant.recette_pas_a_pas.phase_A_instructions.map((step, i) => (
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
                      <AlertTriangle className="w-4 h-4" /> Transition de Sécurité
                    </h4>
                    <div className="space-y-3">
                      {selectedPlant.recette_pas_a_pas.transition.map((step, i) => (
                        <p key={i} className="text-xs font-medium text-botanik-orange/80 leading-relaxed">{step}</p>
                      ))}
                    </div>
                  </div>

                  {/* Phase B */}
                  <div className="pl-6 border-l-2 border-botanik-orange/20">
                    <h4 className="text-sm font-bold uppercase tracking-widest text-botanik-orange mb-6">3. Lancement Phase B</h4>
                    <div className="space-y-4">
                      {selectedPlant.recette_pas_a_pas.phase_B_instructions.map((step, i) => (
                        <div key={i} className="flex gap-4">
                          <span className="text-botanik-orange/40 font-bold">•</span>
                          <p className="text-sm text-botanik-green/80">{step}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Filtration */}
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-widest text-botanik-orange mb-6">4. Filtration & Finition</h4>
                    <div className="space-y-4">
                      {selectedPlant.recette_pas_a_pas.filtration_et_finition.map((step, i) => (
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
                  <Activity className="w-4 h-4" /> III bis. Mode d'Emploi & Sécurité
                </h2>
                <div className="grid md:grid-cols-2 gap-10">
                  <div className="space-y-6">
                    <h4 className="text-sm font-bold uppercase tracking-widest text-botanik-green">Utilisation quotidienne</h4>
                    <div className="space-y-4 text-sm text-botanik-green/80">
                      <p><strong>Mode :</strong> {selectedPlant.usage_standard.mode_administration}</p>
                      <p><strong>Posologie :</strong> {selectedPlant.usage_standard.posologie_quotidienne}</p>
                      <p><strong>Dose max :</strong> {selectedPlant.usage_standard.dose_maximale}</p>
                      <p><strong>Durée :</strong> {selectedPlant.usage_standard.duree_utilisation}</p>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <h4 className="text-sm font-bold uppercase tracking-widest text-red-700">Contre-indications</h4>
                    <ul className="space-y-2 text-sm text-red-900/70">
                      {selectedPlant.usage_standard.contre_indications.map((ci, i) => (
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
                  <Utensils className="w-4 h-4" /> Protocoles Spécifiques
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
                          <h5 className="text-[10px] font-bold uppercase tracking-widest text-botanik-green/40">Paramètres</h5>
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
                          <h5 className="text-[10px] font-bold uppercase tracking-widest text-botanik-green/40">Plantes</h5>
                          <p className="text-xs font-medium text-botanik-green">
                            {recipe.plant.sachet_count} sachets ({recipe.plant.total_plant_mass_g}g)
                          </p>
                          <p className="text-[10px] text-botanik-green/60 italic">{recipe.plant.part}</p>
                        </div>

                        <div className="space-y-3">
                          <h5 className="text-[10px] font-bold uppercase tracking-widest text-botanik-green/40">Usage</h5>
                          <p className="text-xs font-medium text-botanik-green">
                            {recipe.use.servings.length} prises / jour
                          </p>
                          <p className="text-[10px] text-botanik-green/60 line-clamp-2">{recipe.use.notes}</p>
                        </div>
                      </div>

                      <div className="pt-6 border-t border-botanik-green/5 flex justify-between items-center">
                        <div className="flex items-center gap-2 text-[10px] font-bold text-botanik-green/40 uppercase tracking-wider">
                           <Info className="w-3 h-3" /> {recipe.storage.max_hours}h max
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
                  <Activity className="w-4 h-4" /> IV. Socle Synergique
                </h2>
                <div className="grid md:grid-cols-2 gap-10">
                  <div className="space-y-8">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-botanik-green">Compléments Cofacteurs</h4>
                    {selectedPlant.socle_synergique.cofacteurs_complements.map(c => (
                      <div key={c.nom} className="bg-white p-6 rounded-2xl border border-botanik-green/5">
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-bold text-sm text-botanik-green">{c.nom}</span>
                          <span className="text-[10px] font-bold text-botanik-orange">{c.dose}</span>
                        </div>
                        <p className="text-xs text-botanik-green/60 leading-relaxed">{c.role}</p>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-8">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-botanik-green">Leviers du Vivant</h4>
                    {selectedPlant.socle_synergique.leviers_du_vivant.map(l => (
                      <div key={l.nom} className="bg-white p-6 rounded-2xl border border-botanik-green/5">
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-bold text-sm text-botanik-green">{l.nom}</span>
                          <span className="text-[10px] font-bold text-botanik-orange">{l.frequence}</span>
                        </div>
                        <p className="text-xs text-botanik-green/60 leading-relaxed">{l.role}</p>
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
                <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-botanik-green/30 mb-4">L'Expert Bloom</h4>
                <p className="text-sm font-medium text-botanik-green/80 leading-relaxed italic">
                  "{selectedPlant.note_expert || "Cette plante est un pilier de la régulation systémique. Sa biodisponibilité est décuplée par l'extraction BloomLab."}"
                </p>
              </div>

              <div className="space-y-10">
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-botanik-green/30 mb-4">Convergence Ancestrale</h4>
                  <p className="text-xs text-botanik-green/70 leading-relaxed">{selectedPlant.convergence_ancestrale}</p>
                </div>
                
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-botanik-green/30 mb-4">Synergies</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedPlant.synergies_recommandees.map(s => (
                      <span key={s} className="text-[10px] font-bold px-3 py-1 bg-botanik-green/5 rounded-full text-botanik-green/60 uppercase tracking-wider">{s}</span>
                    ))}
                  </div>
                </div>

                {selectedPlant.precautions && (
                  <div className="pt-8 border-t border-botanik-green/5">
                    <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-botanik-magenta/60 mb-3 flex items-center gap-2">
                      <AlertTriangle className="w-3 h-3" /> Précautions
                    </h4>
                    <p className="text-[10px] text-botanik-magenta/80 leading-relaxed">{selectedPlant.precautions}</p>
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
        <h1 className="text-2xl md:text-3xl font-bold text-botanik-green mb-1 md:mb-2">Le Répertoire Botanique</h1>
        <p className="text-[10px] md:text-sm text-botanik-green/40 font-medium uppercase tracking-widest mb-4 md:mb-6">Intelligence du Totum • Cartographie Systémique</p>
        
        <div className="relative mb-4 md:mb-6 max-w-2xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 md:w-5 h-4 md:h-5 text-botanik-green/30" />
          <input
            type="text"
            placeholder="Chercher une plante, un actif..."
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
            { id: 'all', label: 'Tous', icon: Leaf, count: 93 },
            { id: 'therapeutic', label: 'Thérapeutique', icon: Activity, count: 50 },
            { id: 'culinary', label: 'Culinaire', icon: ChefHat, count: 21 },
            { id: 'cosmetic', label: 'Cosmétique', icon: Sparkles, count: 22 }
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
          {filteredDirectory.map((plant, index) => {
            const isLocked = index >= 4 && !isPremium;
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
                    <p className="text-sm font-bold uppercase tracking-widest text-botanik-green mb-1">Accès Premium</p>
                    <p className="text-[10px] text-botanik-green/60 font-medium">Abonnez-vous pour débloquer</p>
                  </div>
                )}
                {/* Category Badge */}
                <div className="flex items-center justify-between mb-6">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border shadow-sm ${
                    plant.source === 'therapeutic' ? 'bg-botanik-green text-white border-botanik-green' :
                    plant.source === 'culinary' ? 'bg-botanik-orange text-white border-botanik-orange' :
                    'bg-botanik-green text-white border-botanik-green'
                  }`}>
                    {plant.category}
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
                    {plant.name}
                  </h3>
                  {plant.latinName && (
                    <p className="text-xs italic text-botanik-green/40 font-serif mt-1">{plant.latinName}</p>
                  )}
                </div>

                <p className="text-sm text-botanik-green/60 leading-relaxed mb-8 flex-grow line-clamp-3">
                  {plant.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-auto">
                  {plant.tags.slice(0, 3).map(tag => (
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
          <h3 className="text-2xl font-bold text-botanik-green mb-2">Aucune plante trouvée</h3>
          <p className="text-botanik-green/40">Essayez une autre recherche ou changez de catégorie.</p>
        </div>
      )}
    </div>
  );
}
