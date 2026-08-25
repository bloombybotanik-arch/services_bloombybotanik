import React, { useState, useMemo } from 'react';
import { Star, Leaf, Droplet, Wind, ArrowRight, ShieldCheck, Check, Search, Filter, Thermometer, Clock, Beaker, Lock, ChevronDown, ChevronUp, User, Activity } from 'lucide-react';
import { wrapTitle } from './lib/textUtils';
import { getCosmeticsRecipes } from './cosmeticsData';
import { translations, Language } from './translations';

export default function CosmeticsContent({ 
  isPremium = false, 
  onRequirePremium,
  onNavigate,
  onNavigatePending,
  initialPlantId,
  favorites = [],
  onToggleFavorite,
  lang
}: { 
  isPremium?: boolean, 
  onRequirePremium?: () => void,
  onNavigate?: (view: any) => void,
  onNavigatePending?: () => void,
  initialPlantId?: string,
  favorites?: string[],
  onToggleFavorite?: (id: string) => void,
  lang: Language
}) {
  const t = translations[lang].cosmetics;
  const cosmeticsRecipes = useMemo(() => getCosmeticsRecipes(lang), [lang]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategorie, setFilterCategorie] = useState(t.filters.all);
  const [filterPeau, setFilterPeau] = useState(t.filters.all);
  const [selectedRecipe, setSelectedRecipe] = useState(cosmeticsRecipes[0]);

  const detailRef = React.useRef<HTMLDivElement>(null);

  // Handle initial plant selection
  React.useEffect(() => {
    if (initialPlantId) {
      const recipe = cosmeticsRecipes.find(r => r.plant_id === initialPlantId);
      if (recipe) {
        setSelectedRecipe(recipe);
        if (window.innerWidth < 1024) {
          setTimeout(() => {
            detailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 100);
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }
    }
  }, [initialPlantId, cosmeticsRecipes]);

  const categories = [t.filters.all, ...new Set(cosmeticsRecipes.map(r => r.categorie))];
  const peaux = [t.filters.all, ...new Set(cosmeticsRecipes.map(r => r.peau))];

  const filteredRecipes = useMemo(() => {
    return cosmeticsRecipes.filter(recipe => {
      const matchesSearch = recipe.nom_commun.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           recipe.cible.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategorie = filterCategorie === t.filters.all || recipe.categorie === filterCategorie;
      const matchesPeau = filterPeau === t.filters.all || recipe.peau === filterPeau;
      
      return matchesSearch && matchesCategorie && matchesPeau;
    });
  }, [searchTerm, filterCategorie, filterPeau, t.filters.all, cosmeticsRecipes]);

  return (
    <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-12 md:py-20 lg:py-24 animate-in fade-in duration-700">
      
      {/* Header */}
      <header className="mb-16">
        <div className="flex gap-4 text-sm font-medium text-botanik-green/60 mb-6 uppercase tracking-widest flex-wrap">
          <span>{t.header.badge}</span>
          <span>•</span>
          <span>{t.header.badge_alt}</span>
        </div>
        <h1 className="leading-[1.1] tracking-tight text-botanik-green mb-8">
          <span className="block text-3xl md:text-7xl font-bold mb-2">
            {wrapTitle(t.header.title)}
          </span>
          <span className="block text-2xl md:text-6xl text-botanik-green/80 font-bold">
            {wrapTitle(t.header.subtitle)}
          </span>
        </h1>
        <p className="text-base md:text-xl text-botanik-green/80 max-w-2xl leading-relaxed">
          {t.header.description}
        </p>
      </header>

      {/* Filters Bar */}
      <div className="mb-12 bg-white rounded-3xl border border-botanik-green/10 p-4 md:p-6 shadow-sm space-y-4 md:space-y-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 md:w-5 h-4 md:h-5 text-botanik-green/40" />
          <input 
            type="text"
            placeholder={t.filters.search_placeholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 md:pl-12 pr-4 py-3 md:py-4 bg-[#F5F3EB] rounded-xl md:rounded-2xl border-none focus:ring-2 focus:ring-botanik-magenta/20 text-sm md:text-base text-botanik-green placeholder:text-botanik-green/40"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase text-botanik-green/40 mb-2 ml-2">{t.filters.body_zone}</label>
            <select 
              value={filterCategorie}
              onChange={(e) => setFilterCategorie(e.target.value)}
              className="w-full bg-[#F5F3EB] border-none rounded-xl px-4 py-3 text-sm text-botanik-green focus:ring-2 focus:ring-botanik-magenta/20"
            >
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold uppercase text-botanik-green/40 mb-2 ml-2">{t.filters.skin_type}</label>
            <select 
              value={filterPeau}
              onChange={(e) => setFilterPeau(e.target.value)}
              className="w-full bg-[#F5F3EB] border-none rounded-xl px-4 py-3 text-sm text-botanik-green focus:ring-2 focus:ring-botanik-magenta/20"
            >
              {peaux.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[350px_1fr] gap-12">
        {/* Sidebar: Recipe Selection */}
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-6 border-b border-botanik-green/10 pb-4">
            <h3 className="text-sm font-bold tracking-widest uppercase text-botanik-green">
              {t.sidebar.title}
            </h3>
            <span className="text-xs font-bold text-botanik-magenta bg-botanik-magenta/5 px-2 py-1 rounded-full">
              {filteredRecipes.length}
            </span>
          </div>
          
          <div className="space-y-3 max-h-[800px] overflow-y-auto pr-2 custom-scrollbar">
            {filteredRecipes.length > 0 ? (
              filteredRecipes.map((recipe) => {
                const globalIndex = cosmeticsRecipes.findIndex(r => r.plant_id === recipe.plant_id);
                const isLocked = globalIndex >= 9 && !isPremium;
                return (
                  <div
                    key={recipe.plant_id}
                    onClick={() => {
                      if (isLocked) {
                        onRequirePremium?.();
                      } else {
                        setSelectedRecipe(recipe);
                        if (window.innerWidth < 1024) {
                          detailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                      }
                    }}
                    className={`w-full text-left p-4 rounded-xl transition-all duration-300 relative cursor-pointer ${
                      selectedRecipe.plant_id === recipe.plant_id 
                        ? 'bg-botanik-green text-white shadow-lg' 
                        : 'bg-white text-botanik-green hover:bg-[#F5F3EB] border border-botanik-green/10'
                    }`}
                  >
                    <div className="flex justify-between items-start gap-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className={`font-semibold ${isLocked ? 'text-botanik-green/60' : ''}`}>
                            {recipe.nom_commun.split('—')[0].trim()}
                          </h4>
                        </div>
                        <div className="flex flex-wrap gap-2 items-center">
                          <span className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded ${
                            selectedRecipe.plant_id === recipe.plant_id ? 'bg-white/20 text-white' : 'bg-botanik-green/5 text-botanik-green/40'
                          }`}>
                            {recipe.categorie}
                          </span>
                          <p className={`text-xs ${
                            selectedRecipe.plant_id === recipe.plant_id 
                              ? 'text-white/80' 
                              : isLocked ? 'text-botanik-green/40' : 'text-botanik-green/60'
                          }`}>
                            {recipe.nom_commun.split('—')[1]?.trim() || recipe.type_produit}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleFavorite?.(recipe.plant_id);
                          }}
                          className={`p-1.5 rounded-full transition-colors ${
                            selectedRecipe.plant_id === recipe.plant_id
                              ? favorites.includes(recipe.plant_id) ? 'text-white bg-white/20' : 'text-white/40 hover:text-white hover:bg-white/10'
                              : favorites.includes(recipe.plant_id) ? 'text-botanik-orange bg-botanik-orange/10' : 'text-botanik-green/20 hover:text-botanik-orange hover:bg-botanik-orange/5'
                          }`}
                        >
                          <Star className={`w-4 h-4 ${favorites.includes(recipe.plant_id) ? 'fill-current' : ''}`} />
                        </button>
                        {isLocked && (
                          <div className="p-1.5 bg-botanik-orange/10 rounded-full flex-shrink-0">
                            <Lock className="w-4 h-4 text-botanik-orange" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-12 bg-white rounded-3xl border border-dashed border-botanik-green/20">
                <p className="text-botanik-green/40 text-sm">{t.sidebar.no_results}</p>
                <button 
                  onClick={() => {
                    setSearchTerm('');
                    setFilterCategorie(t.filters.all);
                    setFilterPeau(t.filters.all);
                  }}
                  className="mt-4 text-xs font-bold text-botanik-magenta uppercase tracking-widest hover:underline"
                >
                  {t.sidebar.reset}
                </button>
              </div>
            )}
          </div>
          
          <div className="mt-8 p-6 bg-[#F5F3EB] rounded-2xl">
            <h4 className="font-bold text-botanik-green mb-4 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-botanik-magenta" /> {t.sidebar.rules.title}
            </h4>
            <ul className="space-y-3 text-sm text-botanik-green/80">
              <li>{t.sidebar.rules.rule1}</li>
              <li>{t.sidebar.rules.rule2}</li>
              <li>{t.sidebar.rules.rule3}</li>
            </ul>
          </div>
        </div>

        {/* Main Content: Recipe Details */}
        <div ref={detailRef} className="bg-white rounded-3xl border border-botanik-green/10 p-8 md:p-12 shadow-sm relative overflow-hidden">
          {/* Subtle Background Pattern */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-botanik-green/5 rounded-full -mr-32 -mt-32 blur-3xl pointer-events-none"></div>

          {/* Header Info */}
          <div className="mb-12 border-b border-botanik-green/10 pb-12">
            <div className="flex flex-wrap gap-3 mb-8">
              <div className="inline-flex items-center gap-2 bg-[#F5F3EB] text-botanik-green px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                <Beaker className="w-3 h-3" /> {selectedRecipe.type_produit}
              </div>
              <div className="inline-flex items-center gap-2 bg-botanik-magenta/5 text-botanik-magenta px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                <Filter className="w-3 h-3" /> {selectedRecipe.categorie}
              </div>
              <div className="inline-flex items-center gap-2 bg-botanik-orange/10 text-botanik-orange px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                <Droplet className="w-3 h-3" /> {lang === 'fr' ? 'Peau' : lang === 'de' ? 'Haut' : 'Skin'} {selectedRecipe.peau}
              </div>
            </div>

            <div className="flex items-center justify-between gap-4 mb-4">
              <h2 className="text-2xl md:text-4xl font-bold text-botanik-green leading-tight">{wrapTitle(selectedRecipe.nom_commun)}</h2>
              <button 
                onClick={() => onToggleFavorite?.(selectedRecipe.plant_id)}
                className={`p-3 rounded-full transition-colors ${favorites.includes(selectedRecipe.plant_id) ? 'text-botanik-orange bg-botanik-orange/10' : 'text-botanik-green/20 hover:text-botanik-orange hover:bg-botanik-orange/5'}`}
              >
                <Star className={`w-6 h-6 ${favorites.includes(selectedRecipe.plant_id) ? 'fill-botanik-orange' : ''}`} />
              </button>
            </div>
            <p className="text-base md:text-lg text-botanik-green/80 leading-relaxed max-w-3xl">
              {t.details.intro}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
            {/* Ingredients Phase A */}
            <div>
              <h3 className="text-xl font-bold text-botanik-green mb-6 flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-botanik-green text-white flex items-center justify-center text-sm">A</div>
                {t.details.phase_a.title}
              </h3>
              <div className="bg-[#F5F3EB] p-6 rounded-2xl mb-6 border border-botanik-green/5">
                <div className="mb-4">
                  <span className="text-[10px] font-bold uppercase text-botanik-green/40 tracking-wider">{t.details.phase_a.solvent}</span>
                  <div className="font-semibold text-botanik-green">{selectedRecipe.solvants.phase_A.type} ({selectedRecipe.solvants.phase_A.volume})</div>
                  <div className="text-sm text-botanik-green/70 italic leading-snug mt-1">{selectedRecipe.solvants.phase_A.role}</div>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase text-botanik-green/40 tracking-wider">{t.details.phase_a.plant}</span>
                  <div className="font-semibold text-botanik-green">{selectedRecipe.plantes.phase_A.nom} ({selectedRecipe.plantes.phase_A.grammage})</div>
                  <div className="text-sm text-botanik-green/70 italic leading-snug mt-1">{selectedRecipe.plantes.phase_A.actifs}</div>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-semibold text-botanik-magenta bg-botanik-magenta/5 p-4 rounded-xl border border-botanik-magenta/10">
                <div className="flex items-center gap-1.5 shrink-0">
                  <Thermometer className="w-4 h-4" /> {selectedRecipe.parametres_bloomlab.phase_A.temp}
                </div>
                <div className="hidden sm:block w-px h-4 bg-botanik-magenta/20"></div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <Clock className="w-4 h-4" /> {selectedRecipe.parametres_bloomlab.phase_A.temps}
                </div>
                <div className="hidden sm:block w-px h-4 bg-botanik-magenta/20"></div>
                <div className="flex items-center gap-1.5 shrink-0 min-w-fit">
                  <Activity className="w-4 h-4" /> <span className="whitespace-nowrap">{selectedRecipe.parametres_bloomlab.phase_A.agitation}</span>
                </div>
              </div>
            </div>

            {/* Ingredients Phase B */}
            <div>
              <h3 className="text-xl font-bold text-botanik-green mb-6 flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-botanik-green text-white flex items-center justify-center text-sm">B</div>
                {t.details.phase_b.title}
              </h3>
              <div className="bg-[#F5F3EB] p-6 rounded-2xl mb-6 border border-botanik-green/5">
                <div className="mb-4">
                  <span className="text-[10px] font-bold uppercase text-botanik-green/40 tracking-wider">{t.details.phase_b.solvent}</span>
                  <div className="font-semibold text-botanik-green">{selectedRecipe.solvants.phase_B.type} ({selectedRecipe.solvants.phase_B.volume})</div>
                  <div className="text-sm text-botanik-green/70 italic leading-snug mt-1">{selectedRecipe.solvants.phase_B.role}</div>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase text-botanik-green/40 tracking-wider">{t.details.phase_b.plant}</span>
                  <div className="font-semibold text-botanik-green">{selectedRecipe.plantes.phase_B.nom} ({selectedRecipe.plantes.phase_B.grammage})</div>
                  <div className="text-sm text-botanik-green/70 italic leading-snug mt-1">{selectedRecipe.plantes.phase_B.actifs}</div>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-semibold text-botanik-orange bg-botanik-orange/5 p-4 rounded-xl border border-botanik-orange/10">
                <div className="flex items-center gap-1.5 shrink-0">
                  <Thermometer className="w-4 h-4" /> {selectedRecipe.parametres_bloomlab.phase_B.temp}
                </div>
                <div className="hidden sm:block w-px h-4 bg-botanik-orange/20"></div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <Clock className="w-4 h-4" /> {selectedRecipe.parametres_bloomlab.phase_B.temps}
                </div>
                <div className="hidden sm:block w-px h-4 bg-botanik-orange/20"></div>
                <div className="flex items-center gap-1.5 shrink-0 min-w-fit">
                  <Activity className="w-4 h-4" /> <span className="whitespace-nowrap">{selectedRecipe.parametres_bloomlab.phase_B.agitation}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Protocole Pas à Pas */}
          <div className="border-t border-botanik-green/10 pt-12">
            <h3 className="text-xl md:text-2xl font-bold text-botanik-green mb-8 flex items-center gap-3">
              <Check className="w-6 h-6 text-botanik-magenta" /> {t.details.protocol.title}
            </h3>
            
            <div className="space-y-8">
              {/* Phase A Protocol */}
              <div className="pl-6 border-l-2 border-botanik-green/20 relative">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-botanik-green"></div>
                <h4 className="font-bold text-lg mb-4 text-botanik-green">{t.details.protocol.step1}</h4>
                <ul className="space-y-3 text-botanik-green/80">
                  {selectedRecipe.recette_pas_a_pas.phase_A_instructions.map((step, idx) => (
                    <li key={idx} className="flex gap-3">
                      <span className="font-bold text-botanik-magenta/40 min-w-[20px]">{idx + 1}.</span>
                      <span>{step.replace(/^\d+\.\s*/, '')}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Transition Protocol */}
              <div className="pl-6 border-l-2 border-botanik-orange bg-botanik-orange/5 py-6 rounded-r-2xl relative">
                <div className="absolute -left-[9px] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-botanik-orange"></div>
                <h4 className="font-bold text-lg mb-4 text-botanik-orange">{t.details.protocol.step2}</h4>
                <ul className="space-y-3 text-botanik-green/80">
                  {selectedRecipe.recette_pas_a_pas.transition.map((step, idx) => (
                    <li key={idx} className={`flex gap-3 ${step.includes('⚠️') ? 'font-semibold text-botanik-orange' : ''}`}>
                      <Check className="w-4 h-4 mt-1 flex-shrink-0" />
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Phase B Protocol */}
              <div className="pl-6 border-l-2 border-botanik-green/20 relative">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-botanik-green"></div>
                <h4 className="font-bold text-lg mb-4 text-botanik-green">{t.details.protocol.step3}</h4>
                <ul className="space-y-3 text-botanik-green/80">
                  {selectedRecipe.recette_pas_a_pas.phase_B_instructions.map((step, idx) => (
                    <li key={idx} className="flex gap-3">
                      <span className="font-bold text-botanik-magenta/40 min-w-[20px]">{idx + 1}.</span>
                      <span>{step.replace(/^\d+\.\s*/, '')}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Filtration */}
              <div className="pl-6 border-l-2 border-botanik-green/20 relative">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-botanik-green"></div>
                <h4 className="font-bold text-lg mb-4 text-botanik-green">{t.details.protocol.step4}</h4>
                <ul className="space-y-3 text-botanik-green/80">
                  {selectedRecipe.recette_pas_a_pas.filtration_et_finition.map((step, idx) => (
                    <li key={idx} className="flex gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-botanik-magenta mt-2 flex-shrink-0"></div>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Usage & Conservation Footer */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 bg-botanik-green/[0.02] border border-botanik-green/10 p-8 rounded-3xl">
            <div>
              <h4 className="font-bold text-botanik-green mb-4 uppercase text-xs tracking-widest flex items-center gap-2">
                <Check className="w-4 h-4 text-botanik-magenta" /> {t.details.footer.usage}
              </h4>
              <div className="space-y-4">
                <p className="text-sm text-botanik-green/80 leading-relaxed">
                  <strong className="block text-botanik-green/40 uppercase text-[10px] mb-1">{lang === 'fr' ? 'Format' : lang === 'de' ? 'Format' : 'Format'}</strong>
                  {selectedRecipe.conditionnement}
                </p>
                <p className="text-sm text-botanik-green/80 leading-relaxed">
                  <strong className="block text-botanik-green/40 uppercase text-[10px] mb-1">{lang === 'fr' ? 'Application' : lang === 'de' ? 'Anwendung' : 'Application'}</strong>
                  {selectedRecipe.mode_utilisation}
                </p>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-botanik-green mb-4 uppercase text-xs tracking-widest flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-botanik-magenta" /> {t.details.footer.safety}
              </h4>
              <div className="space-y-4">
                <p className="text-sm text-botanik-green/80 leading-relaxed">
                  <strong className="block text-botanik-green/40 uppercase text-[10px] mb-1">{lang === 'fr' ? 'Durée' : lang === 'de' ? 'Dauer' : 'Duration'}</strong>
                  {selectedRecipe.conservation}
                </p>
                <p className="text-sm text-botanik-green/80 leading-relaxed">
                  <strong className="block text-botanik-green/40 uppercase text-[10px] mb-1">{lang === 'fr' ? 'Avertissement' : lang === 'de' ? 'Warnung' : 'Warning'}</strong>
                  {selectedRecipe.precautions}
                </p>
              </div>
            </div>
            <div className="md:col-span-2 pt-6 border-t border-botanik-green/10 mt-2">
              <h4 className="font-bold text-botanik-magenta mb-3 uppercase text-xs tracking-widest flex items-center gap-2">
                <Activity className="w-4 h-4" /> {t.details.footer.synergy}
              </h4>
              <p className="text-sm text-botanik-green/80 leading-relaxed bg-botanik-magenta/[0.03] p-4 rounded-xl border border-botanik-magenta/10">
                {selectedRecipe.synergies_kits_internes}
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
