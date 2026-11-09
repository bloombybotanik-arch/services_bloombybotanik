import React, { useState, useMemo, useEffect } from 'react';
import { Search, ChevronDown, ChevronUp, ChefHat, Droplets, Flame, Hexagon, Beaker, Sprout, Star, ChevronRight, Lock } from 'lucide-react';
import { wrapTitle } from './lib/textUtils';
import { getCulinaryDatabase, CulinaryPlantData, ExtractionParams } from "./data/culinaryData";
import { translations, Language } from './translations';
import { DifficultyBadge } from './components/DifficultyBadge';
import { BeforeYouStartBlock } from './components/BeforeYouStartBlock';
import { getRecipeDifficulty } from './data/recipeDifficulty';
import { PageIntroHeader } from './components/ui/PageIntroHeader';


const renderExtractionParam = (plantId: string, key: string, param: ExtractionParams, t: any) => {
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
    <div key={key} className="bg-[#F9F9F7] p-4 rounded-xl border border-[#3E4A3D]/20 flex flex-col justify-between shadow-xs">
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <h5 className="font-bold text-[#3E4A3D] flex items-center gap-2">
            <span className="text-[#3E4A3D]">{icon}</span> {title}
          </h5>
          <DifficultyBadge 
            recipeId={`culinaire-${plantId}-${key}`}
            variant="compact"
            fallback={{ category: 'culinaire', ingredientCount: 2, stepsCount: 2 }}
          />
        </div>
        <div className="grid grid-cols-2 gap-y-2 text-sm text-[#3E4A3D] mb-3">
          <div><span className="font-semibold text-[#3E4A3D]">{t.params.temp}</span> {param.temp}</div>
          <div><span className="font-semibold text-[#3E4A3D]">{t.params.time}</span> {param.temps}</div>
          <div className="col-span-2"><span className="font-semibold text-[#3E4A3D]">{t.params.ratio}</span> {param.ratio}</div>
          <div className="col-span-2"><span className="font-semibold text-[#3E4A3D]">{t.params.solvent}</span> {param.solvant}</div>
        </div>
      </div>
      <div className="text-sm border-t border-[#3E4A3D]/20 pt-2 mt-2">
        <span className="font-semibold text-[#3E4A3D]">{t.params.usage}</span> <span className="text-[#3E4A3D]">{param.usage}</span>
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
    <div className="bg-white border border-[#3E4A3D]/20 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow mb-6 relative">
      {isLocked && (
        <div 
          onClick={onRequirePremium}
          className="absolute inset-0 bg-white/60 backdrop-blur-[2px] z-10 flex items-center justify-between px-6 md:px-8 cursor-pointer group"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-[#3E4A3D] rounded-full flex items-center justify-center shadow-lg">
              <Lock className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-bold text-[#3E4A3D]">{t.premium_badge}</p>
              <p className="text-[10px] text-[#3E4A3D]/80 uppercase tracking-widest font-black">{t.unlock_label}</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-[#3E4A3D]/40 group-hover:text-botanik-orange group-hover:translate-x-1 transition-all" />
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
              <h3 className="text-xl md:text-2xl font-extrabold text-[#3E4A3D] group-hover:text-botanik-orange transition-colors leading-tight">{wrapTitle(plant.nom_commun)}</h3>
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-block w-fit px-2 py-0.5 md:px-3 md:py-1 bg-[#3E4A3D]/5 text-[#3E4A3D] group-hover:bg-botanik-orange/10 group-hover:text-botanik-orange text-[9px] md:text-xs font-bold uppercase tracking-wider rounded-full border border-[#3E4A3D]/20 group-hover:border-botanik-orange/20 transition-colors">
                  {t.profile_label}
                </span>
                <DifficultyBadge 
                  recipeId={`culinaire-${plant.plant_id}-huile_finition`}
                  variant="compact"
                  fallback={{ category: 'culinaire', ingredientCount: 2, stepsCount: 2 }}
                />
              </div>
            </div>
            <p className="text-[#3E4A3D] text-sm font-medium leading-normal w-full">{plant.profil_aromatique}</p>
          </div>
          <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white border border-[#3E4A3D]/20 flex items-center justify-center text-[#3E4A3D] group-hover:text-botanik-orange group-hover:border-botanik-orange/20 transition-colors ml-3">
            {isOpen ? <ChevronUp className="w-4 h-4 md:w-5 md:h-5" /> : <ChevronDown className="w-4 h-4 md:w-5 md:h-5" />}
          </div>
        </button>
        <div className="pr-6">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite?.();
            }}
            className={`p-3 rounded-full transition-colors ${isFavorite ? 'text-botanik-orange bg-botanik-orange/10' : 'text-[#3E4A3D]/30 hover:text-botanik-orange hover:bg-botanik-orange/5'}`}
          >
            <Star className={`w-5 h-5 ${isFavorite ? 'fill-botanik-orange' : ''}`} />
          </button>
        </div>
      </div>

      {/* Expanded Content */}
      {isOpen && (
        <div className="px-6 md:px-8 pb-8 pt-4 border-t border-[#3E4A3D]/20 bg-white space-y-8">
          {/* Bloc Avant de commencer (Pré-requis techniques culinaires) */}
          <BeforeYouStartBlock 
            recipeId={`culinaire-${plant.plant_id}-huile_finition`}
            fallback={{
              category: 'culinaire',
              title: `${plant.nom_commun} — Préparation Culinaire`,
              ingredientCount: 2,
              stepsCount: 2,
              durationMinutes: 60
            }}
          />

          {/* Données structurées Schema.org Recipe (Strictement réservées aux recettes culinaires) */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Recipe",
                "name": `${plant.nom_commun} — Extraction Botanique Culinaire BloomLab`,
                "description": `Extraction culinaire de précision de ${plant.nom_commun} : ${plant.profil_aromatique}`,
                "recipeCategory": "Culinaire",
                "recipeCuisine": "Botanique / Française",
                "recipeIngredient": [
                  `${plant.nom_commun} (frais ou séché)`,
                  "Huile d'olive extra-vierge, beurre clarifié ou solvant gastronomique"
                ],
                "recipeInstructions": [
                  {
                    "@type": "HowToStep",
                    "text": `Peser les matières végétales de ${plant.nom_commun} et les placer dans la cuve.`
                  },
                  {
                    "@type": "HowToStep",
                    "text": "Ajouter le solvant gastronomique sélectionné et lancer le cycle BloomLab."
                  },
                  {
                    "@type": "HowToStep",
                    "text": "Filtrer à chaud avec le filtre tamis fin et conditionner en bouteille propre."
                  }
                ],
                "totalTime": "PT1H10M",
                "additionalProperty": {
                  "@type": "PropertyValue",
                  "name": "Niveau de difficulté",
                  "value": "Très facile"
                }
              })
            }}
          />
          
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-[#3E4A3D] mb-4 flex items-center gap-2">
              <ChefHat className="w-4 h-4 text-[#3E4A3D]" /> {t.extraction_title}
            </h4>
            <div className="grid md:grid-cols-2 gap-4">
              {Object.entries(plant.parametres_bloomlab).map(([key, param]) => 
                param ? renderExtractionParam(plant.plant_id, key, param as ExtractionParams, t) : null
              )}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h4 className="text-sm font-bold uppercase tracking-widest text-[#3E4A3D] mb-4">
                {t.synergies_title}
              </h4>
              <ul className="space-y-3 text-sm text-[#3E4A3D]">
                <li>
                  <span className="font-semibold text-[#3E4A3D] block mb-1">{t.associations_label}</span> 
                  <div className="flex flex-wrap gap-2">
                    {plant.synergies_aliments.map((aliment, i) => (
                      <span key={i} className="px-2 py-1 bg-[#3E4A3D]/5 text-[#3E4A3D] rounded-md text-xs font-semibold border border-[#3E4A3D]/20">
                        {aliment}
                      </span>
                    ))}
                  </div>
                </li>
              </ul>
            </div>
            <div>
              <div className="bg-[#3E4A3D]/5 p-5 rounded-xl border border-[#3E4A3D]/20 h-full flex flex-col justify-center shadow-xs">
                <h4 className="text-sm font-bold uppercase tracking-widest text-[#3E4A3D] mb-2 flex items-center gap-2">
                  <ChefHat className="w-4 h-4 text-[#3E4A3D]" /> {t.chef_tip}
                </h4>
                <p className="text-sm text-[#3E4A3D] italic leading-relaxed">
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
    <div className="w-full pb-20">
      {/* En-tête contextuel PageIntroHeader harmonisé avec Cosmétique Botanique */}
      <PageIntroHeader
        theme="sage"
        badge="VOTRE PRATIQUE • EXTRACTION CULINAIRE"
        title="La Gastronomie Botanique Vivante"
        subtitle="Révéler les arômes et les bienfaits par le Totum culinaire"
        context="Vous êtes dans l'espace culinaire de Bloom by BotaniK. De la simple infusion d'herbes aux bouillons médicinaux complexes, apprenez à utiliser la BloomLab pour extraire le meilleur des plantes, en respectant la progression logique de nos protocoles : du plus accessible au plus technique."
      />

      <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-12 md:py-20 lg:py-24 animate-in fade-in duration-700">
      
      {/* Header */}
      <header className="mb-16">
        <div className="flex gap-4 text-sm font-semibold text-[#3E4A3D] mb-6 uppercase tracking-widest flex-wrap">
          <span>{t.header.badge}</span>
          <span>•</span>
          <span>{t.header.badge_alt}</span>
        </div>
        <h1 className="leading-[1.1] tracking-tight text-[#3E4A3D] mb-8">
          <span className="block text-3xl md:text-5xl font-extrabold mb-2 text-[#3E4A3D]">
            {lang === 'fr'
              ? "Gastronomie Botanique — Extractions Culinaires & Bouillons"
              : lang === 'de'
              ? "Botanische Gastronomie — Kulinarische Auszüge & Brühen"
              : "Botanical Gastronomy — Culinary Extractions & Broths"}
          </span>
          <span className="block text-2xl md:text-4xl text-[#3E4A3D] font-bold">
            {wrapTitle(t.header.subtitle)}
          </span>
        </h1>
        <div className="text-base md:text-lg text-[#3E4A3D] w-full leading-relaxed space-y-4">
          {t.header.description.split('\n\n').map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>

        {/* SEO Pillars H2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="bg-white p-6 rounded-2xl md:rounded-3xl border border-[#3E4A3D]/20 shadow-sm space-y-2">
            <h2 className="text-lg md:text-xl font-extrabold text-[#3E4A3D] flex items-center gap-2">
              <ChefHat className="w-5 h-5 text-[#C8AB8A]" />
              {lang === 'fr' ? "Bouillons de Plantes Médicinales" : "Medicinal Plant Broths"}
            </h2>
            <p className="text-xs sm:text-sm text-[#3E4A3D] leading-relaxed">
              Infusion longue et maîtrisée de racines (gingembre, curcuma, bardane) et de feuilles aromatiques pour extraire minéraux biodisponibles et molécules umami thérapeutiques sans ébullition destructrice.
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl md:rounded-3xl border border-[#3E4A3D]/20 shadow-sm space-y-2">
            <h2 className="text-lg md:text-xl font-extrabold text-[#3E4A3D] flex items-center gap-2">
              <Droplets className="w-5 h-5 text-[#C8AB8A]" />
              {lang === 'fr' ? "Huiles Aromatisées Maison" : "Homemade Aromatic Oils"}
            </h2>
            <p className="text-xs sm:text-sm text-[#3E4A3D] leading-relaxed">
              Extraction thermo-cinétique en milieu clos dans l'huile d'olive vierge ou le ghee. Les composés lipophiles (romarin, piment, ail sauvage, laurier) infusent en 45 minutes à 50°C sans friture.
            </p>
          </div>
        </div>

        {/* Deux images réelles produit & préparation indexables (RÈGLE V1) */}
        <div className="grid sm:grid-cols-2 gap-6 mt-8">
          <div className="rounded-2xl sm:rounded-3xl overflow-hidden border border-[#3E4A3D]/20 bg-white shadow-sm flex flex-col">
            <div className="relative aspect-[16/10] overflow-hidden bg-[#FAF7F2]">
              <img
                src="/img/produit/bloomlab-cuisine-1200x630.jpg"
                alt={lang === 'fr' ? "Extraction culinaire et infusion d'huiles aromatiques avec BloomLab® en cuisine" : lang === 'de' ? "Kulinarische Extraktion und aromatisierte Öle mit BloomLab® in der Küche" : "Culinary extraction and aromatic oil infusion with BloomLab® in kitchen"}
                width={1200}
                height={630}
                loading="eager"
                fetchPriority="high"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-3 bg-[#FAF7F2] border-t border-[#3E4A3D]/15 flex items-center justify-between text-xs text-[#3E4A3D]">
              <span className="font-bold text-[#3E4A3D]">{lang === 'fr' ? "BloomLab® en atelier culinaire" : "BloomLab® in culinary workshop"}</span>
              <span className="text-[10px] text-[#C8AB8A] font-bold uppercase">Extraction Douce</span>
            </div>
          </div>

          <div className="rounded-2xl sm:rounded-3xl overflow-hidden border border-[#3E4A3D]/20 bg-white shadow-sm flex flex-col">
            <div className="relative aspect-[16/10] overflow-hidden bg-[#FAF7F2]">
              <img
                src="/assets/images/BloomLab_rosemary_infusion.png"
                alt={lang === 'fr' ? "Exemple de préparation culinaire : huile gastronomique infusée au romarin avec BloomLab" : lang === 'de' ? "Beispiel kulinarischer Zubereitung: Rosmarin-Öl-Infusion mit BloomLab" : "Culinary preparation example: rosemary infused gastronomic oil with BloomLab"}
                width={1200}
                height={750}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-3 bg-[#FAF7F2] border-t border-[#3E4A3D]/15 flex items-center justify-between text-xs text-[#3E4A3D]">
              <span className="font-bold text-[#3E4A3D]">{lang === 'fr' ? "Exemple : Huile infusée au romarin" : "Example: Rosemary infused oil"}</span>
              <span className="text-[10px] text-[#3E4A3D] font-bold uppercase">Préparation Maison</span>
            </div>
          </div>
        </div>
      </header>

      <form onSubmit={handleSearch} className="relative mb-8 md:mb-16">
        <div className="relative flex items-center w-full">
          <Search className="absolute left-4 md:left-6 w-4 h-4 md:w-6 md:h-6 text-[#3E4A3D]/50 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={t.search.placeholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 md:pl-16 pr-24 md:pr-32 py-3 md:py-5 bg-white border-2 border-[#3E4A3D]/20 rounded-full text-sm md:text-lg text-[#3E4A3D] font-medium placeholder:text-[#3E4A3D]/40 focus:outline-none focus:border-[#3E4A3D]/60 focus:shadow-lg transition-all shadow-sm"
          />
          <button 
            type="submit"
            className="absolute right-2 md:right-3 top-1.5 md:top-2 bottom-1.5 md:bottom-2 px-4 md:px-6 bg-[#3E4A3D] hover:bg-[#C8AB8A] active:bg-[#C8AB8A] text-[#0F261E] rounded-full font-bold uppercase tracking-widest text-[10px] md:text-xs transition-colors cursor-pointer"
          >
            {t.search.button}
          </button>
        </div>
      </form>

      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-sm font-bold uppercase tracking-widest text-[#3E4A3D]">
            {activeSearch ? `${t.search.results_for} "${activeSearch}"` : t.search.all_profiles}
          </h2>
          <span className="text-sm font-semibold text-[#3E4A3D]/70">{filteredPlants.length} {t.search.count_label}</span>
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
          <div className="bg-white p-12 rounded-2xl border border-[#3E4A3D]/20 text-center shadow-sm">
            <ChefHat className="w-12 h-12 text-[#3E4A3D]/30 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-[#3E4A3D] mb-2">{t.search.no_results}</h3>
            <p className="text-[#3E4A3D]/80">{t.search.no_results_desc}</p>
          </div>
        )}
      </div>
    </div>
    </div>
  );
}