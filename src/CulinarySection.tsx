import React, { useState, useMemo, useEffect } from 'react';
import { Search, ChevronDown, ChevronUp, ChefHat, Droplets, Flame, Hexagon, Beaker, Sprout, Star, ChevronRight, Lock } from 'lucide-react';
import { wrapTitle } from './lib/textUtils';
import { getCulinaryDatabase, CulinaryPlantData, ExtractionParams } from "./data/culinaryData";
import { translations, Language } from './translations';


const renderExtractionParam = (key: string, param: ExtractionParams, t: any) => {
  const getIconAndTitle = () => {
    switch(key) {
      case 'huile_finition': return { icon: <Droplets className="w-4 h-4" />, title: t.params.oil };
      case 'beurre_ghee': return { icon: <Flame className="w-4 h-4" />, title: t.params.butter };
      case 'miel': return { icon: <Hexagon className="w-4 h-4" />, title: t.params.honey };
      case 'vinaigre': return { icon: <Beaker className="w-4 h-4" />, title: t.params.vinegar };
      case 'sucre': return { icon: <Sprout className="w-4 h-4" />, title: t.params.sugar };
      default: return { icon: <ChefHat className="w-4 h-4" />, title: key };
    }
  };

  const { icon, title } = getIconAndTitle();

  return (
    <div key={key} className="bg-[#F9F9F7] p-4 rounded-xl border border-botanik-green/10">
      <h5 className="font-bold text-[#1B3022] mb-3 flex items-center gap-2">
        <span className="text-botanik-green">{icon}</span> {title}
      </h5>
      <div className="grid grid-cols-2 gap-y-2 text-sm text-[#1B3022]/80 mb-3">
        <div><span className="font-semibold text-botanik-green">{t.params.temp}</span> {param.temp}</div>
        <div><span className="font-semibold text-botanik-green">{t.params.time}</span> {param.temps}</div>
        <div className="col-span-2"><span className="font-semibold text-botanik-green">{t.params.ratio}</span> {param.ratio}</div>
        <div className="col-span-2"><span className="font-semibold text-botanik-green">{t.params.solvent}</span> {param.solvant}</div>
      </div>
      <div className="text-sm border-t border-botanik-green/10 pt-2 mt-2">
        <span className="font-semibold text-[#1B3022]">{t.params.usage}</span> {param.usage}
      </div>
    </div>
  );
};

const CulinaryAccordion: React.FC<{ 
  plant: CulinaryPlantData, 
  isLocked?: boolean, 
  onRequirePremium?: () => void, 
  onNavigatePending?: () => void,
  isFavorite?: boolean,
  onToggleFavorite?: () => void,
  t: any
}> = ({ plant, isLocked, onRequirePremium, onNavigatePending, isFavorite, onToggleFavorite, t }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white border border-botanik-green/10 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow mb-6 relative">
      {isLocked && (
        <div 
          onClick={onRequirePremium}
          className="absolute inset-0 bg-white/60 backdrop-blur-[2px] z-10 flex items-center justify-between px-6 md:px-8 cursor-pointer group"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-botanik-green rounded-full flex items-center justify-center shadow-lg">
              <Lock className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-bold text-botanik-green">{t.premium_badge}</p>
              <p className="text-[10px] text-botanik-green/60 uppercase tracking-widest font-black">{t.unlock_label}</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-botanik-green/30 group-hover:text-botanik-orange group-hover:translate-x-1 transition-all" />
        </div>
      )}
      {/* Header (Always visible) */}
      <div className="flex items-center">
        <button 
          onClick={() => !isLocked && setIsOpen(!isOpen)}
          className={`flex-1 text-left px-5 md:px-8 py-5 md:py-6 flex items-center justify-between bg-white ${!isLocked ? 'hover:bg-[#FFF8F0]' : ''} transition-colors group`}
        >
          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3 mb-2">
              <h3 className="text-xl md:text-2xl font-extrabold text-botanik-green group-hover:text-botanik-orange transition-colors leading-tight">{wrapTitle(plant.nom_commun)}</h3>
              <span className="inline-block w-fit px-2 py-0.5 md:px-3 md:py-1 bg-botanik-green/5 text-botanik-green group-hover:bg-botanik-orange/10 group-hover:text-botanik-orange text-[9px] md:text-xs font-bold uppercase tracking-wider rounded-full border border-botanik-green/10 group-hover:border-botanik-orange/20 transition-colors">
                {t.profile_label}
              </span>
            </div>
            <p className="text-[#1B3022]/70 text-sm font-medium leading-normal w-full">{plant.profil_aromatique}</p>
          </div>
          <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white border border-botanik-green/10 flex items-center justify-center text-botanik-green group-hover:text-botanik-orange group-hover:border-botanik-orange/20 transition-colors ml-3">
            {isOpen ? <ChevronUp className="w-4 h-4 md:w-5 md:h-5" /> : <ChevronDown className="w-4 h-4 md:w-5 md:h-5" />}
          </div>
        </button>
        <div className="pr-6">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite?.();
            }}
            className={`p-3 rounded-full transition-colors ${isFavorite ? 'text-botanik-orange bg-botanik-orange/10' : 'text-botanik-green/20 hover:text-botanik-orange hover:bg-botanik-orange/5'}`}
          >
            <Star className={`w-5 h-5 ${isFavorite ? 'fill-botanik-orange' : ''}`} />
          </button>
        </div>
      </div>

      {/* Expanded Content */}
      {isOpen && (
        <div className="px-6 md:px-8 pb-8 pt-4 border-t border-botanik-green/10 bg-white">
          
          <div className="mb-8">
            <h4 className="text-sm font-bold uppercase tracking-widest text-botanik-green mb-4 flex items-center gap-2">
              <ChefHat className="w-4 h-4" /> {t.extraction_title}
            </h4>
            <div className="grid md:grid-cols-2 gap-4">
              {Object.entries(plant.parametres_bloomlab).map(([key, param]) => 
                param ? renderExtractionParam(key, param as ExtractionParams, t) : null
              )}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h4 className="text-sm font-bold uppercase tracking-widest text-botanik-green mb-4">
                {t.synergies_title}
              </h4>
              <ul className="space-y-3 text-sm text-[#1B3022]/80">
                <li>
                  <span className="font-semibold text-[#1B3022] block mb-1">{t.associations_label}</span> 
                  <div className="flex flex-wrap gap-2">
                    {plant.synergies_aliments.map((aliment, i) => (
                      <span key={i} className="px-2 py-1 bg-botanik-green/5 text-botanik-green rounded-md text-xs font-medium border border-botanik-green/10">
                        {aliment}
                      </span>
                    ))}
                  </div>
                </li>
              </ul>
            </div>
            <div>
              <div className="bg-botanik-green/5 p-5 rounded-xl border border-botanik-green/10 h-full flex flex-col justify-center">
                <h4 className="text-sm font-bold uppercase tracking-widest text-botanik-green mb-2 flex items-center gap-2">
                  <ChefHat className="w-4 h-4" /> {t.chef_tip}
                </h4>
                <p className="text-sm text-[#1B3022]/90 italic leading-relaxed">
                  "{plant.astuce_chef_bloom}"
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default function CulinarySection({ 
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
  const t = translations[lang].culinary;
  const culinaryDatabase = useMemo(() => getCulinaryDatabase(lang), [lang]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSearch, setActiveSearch] = useState("");

  // Handle initial plant selection
  useEffect(() => {
    if (initialPlantId) {
      const plant = culinaryDatabase.find(p => p.plant_id === initialPlantId);
      if (plant) {
        setActiveSearch(plant.nom_commun.toLowerCase());
        setSearchQuery(plant.nom_commun);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }, [initialPlantId]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveSearch(searchQuery.toLowerCase());
  };

  const filteredPlants = useMemo(() => {
    if (!activeSearch.trim()) return culinaryDatabase;
    return culinaryDatabase.filter(plant => {
      const searchableString = `
        ${plant.nom_commun} 
        ${plant.profil_aromatique}
      `.toLowerCase();
      return searchableString.includes(activeSearch);
    });
  }, [activeSearch]);

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
          <span className="block text-3xl md:text-[54px] font-bold mb-2">
            {wrapTitle(t.header.title)}
          </span>
          <span className="block text-3xl md:text-[54px] text-botanik-green/80 font-bold">
            {wrapTitle(t.header.subtitle)}
          </span>
        </h1>
        <p className="text-base md:text-xl text-botanik-green/80 max-w-2xl leading-relaxed">
          {t.header.description}
        </p>
      </header>

      <form onSubmit={handleSearch} className="relative mb-8 md:mb-16">
        <div className="relative flex items-center w-full">
          <Search className="absolute left-4 md:left-6 w-4 h-4 md:w-6 md:h-6 text-botanik-green/40 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={t.search.placeholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 md:pl-16 pr-24 md:pr-32 py-3 md:py-5 bg-white border-2 border-botanik-green/10 rounded-full text-sm md:text-lg text-[#1B3022] font-medium placeholder:text-botanik-green/30 focus:outline-none focus:border-botanik-green/30 focus:shadow-lg transition-all shadow-sm"
          />
          <button 
            type="submit"
            className="absolute right-2 md:right-3 top-1.5 md:top-2 bottom-1.5 md:bottom-2 px-4 md:px-6 bg-botanik-green text-white rounded-full font-bold uppercase tracking-widest text-[10px] md:text-xs hover:bg-botanik-orange transition-colors"
          >
            {t.search.button}
          </button>
        </div>
      </form>

      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-sm font-bold uppercase tracking-widest text-botanik-green/60">
            {activeSearch ? `${t.search.results_for} "${activeSearch}"` : t.search.all_profiles}
          </h2>
          <span className="text-sm font-medium text-[#1B3022]/40">{filteredPlants.length} {t.search.count_label}</span>
        </div>

        {filteredPlants.length > 0 ? (
          <div className="space-y-6">
            {filteredPlants.map((plant, index) => {
              const isLocked = index >= 9 && !isPremium;
              return (
                <CulinaryAccordion 
                  key={plant.plant_id} 
                  plant={plant} 
                  isLocked={isLocked}
                  onRequirePremium={onRequirePremium}
                  onNavigatePending={onNavigatePending}
                  isFavorite={favorites.includes(plant.plant_id)}
                  onToggleFavorite={() => onToggleFavorite?.(plant.plant_id)}
                  t={t.card}
                />
              );
            })}
          </div>
        ) : (
          <div className="bg-white p-12 rounded-2xl border border-botanik-green/10 text-center">
            <ChefHat className="w-12 h-12 text-botanik-green/20 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-botanik-green mb-2">{t.search.no_results}</h3>
            <p className="text-[#1B3022]/60">{t.search.no_results_desc}</p>
          </div>
        )}
      </div>
    </div>
  );
}

