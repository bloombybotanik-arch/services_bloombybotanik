import React, { useState, useMemo } from 'react';
import { Search, Leaf, BookOpen, FlaskConical, Target, Zap, ChevronRight, ArrowRight, ShieldCheck, Star, Utensils, Sparkles, Droplets, Flame, Moon, Wind, Heart, Activity, ShieldAlert } from 'lucide-react';
import { wrapTitle } from './lib/textUtils';
import { unifiedBotanicalDatabase } from './data/unifiedBotanicalData';
import { translations, Language } from './translations';
import { PUBLIC_TERRAINS, TERRAIN_EDITORIAL_NOTICE, TERRAIN_PAGE_INTRO } from './data/terrainMapping';
import rosemaryImg from './assets/images/BloomLab_rosemary_infusion.png';

export default function LibraryLanding({ onNavigate, lang }: { onNavigate: (view: any, id?: string) => void, lang: Language }) {
  const t = translations[lang].library;
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPlants = useMemo(() => {
    if (!searchQuery) return [];
    return unifiedBotanicalDatabase.filter(plant => 
      plant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      plant.latinName?.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 10);
  }, [searchQuery]);

  const counts = useMemo(() => {
    return {
      culinary: unifiedBotanicalDatabase.filter(p => p.source === 'culinary').length,
      cosmetic: unifiedBotanicalDatabase.filter(p => p.source === 'cosmetic').length,
      therapeutic: unifiedBotanicalDatabase.filter(p => p.source === 'therapeutic').length
    };
  }, []);

  const categories = [
    { 
      id: 'culinary', 
      name: 'Culinaire', 
      view: 'culinaire', 
      icon: Utensils, 
      count: counts.culinary,
      color: 'text-botanik-orange',
      bg: 'bg-botanik-orange/5'
    },
    { 
      id: 'cosmetic', 
      name: 'Cosmétique', 
      view: 'cosmetiques', 
      icon: Sparkles, 
      count: counts.cosmetic,
      color: 'text-botanik-green',
      bg: 'bg-botanik-green/5'
    },
    { 
      id: 'therapeutic', 
      name: 'Thérapeutique', 
      view: 'library', 
      icon: Leaf, 
      count: counts.therapeutic,
      color: 'text-botanik-green',
      bg: 'bg-botanik-green/5'
    }
  ];

  return (
    <div className="animate-in fade-in duration-700 bg-white">
      {/* Hero Section with BloomLab Rosemary Infusion (Sans Opacité & Image alignée verticalement) */}
      <section className="relative py-14 md:py-20 bg-[#FAF7F2] overflow-hidden border-b border-botanik-green/10">
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 lg:items-stretch items-center">
            
            {/* Left: Texts & Search */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 bg-botanik-green/5 text-botanik-green px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6 border border-botanik-green/10">
                  {t.hero.badge}
                </div>
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-botanik-green mb-6 leading-[0.95] tracking-tight">
                  {t.hero.title}<br />
                  <span className="text-[#F97316]">{t.hero.title_accent}</span>
                </h1>
                <p className="text-botanik-green/75 text-base sm:text-lg mb-8 max-w-xl font-serif italic">
                  {lang === 'fr' 
                    ? "Explorez notre bibliothèque vivante de plantes médicinales, protocoles d'extraction et synergies actives pour restaurer votre terrain biologique."
                    : lang === 'de'
                    ? "Erkunden Sie unsere lebendige Bibliothek von Heilpflanzen, Extraktionsprotokollen und aktiven Synergien."
                    : "Explore our living library of medicinal plants, extraction protocols, and active synergies."}
                </p>
              </div>
              
              {/* Unified Search / Directory */}
              <div className="relative max-w-2xl">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 md:w-6 h-5 md:h-6 text-botanik-green/30" />
                <input 
                  type="text" 
                  placeholder={t.hero.search_placeholder} 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-14 md:pl-16 pr-6 py-4 md:py-5 bg-white rounded-[24px] md:rounded-[32px] border border-botanik-green/15 text-base md:text-lg text-botanik-green shadow-lg focus:ring-2 focus:ring-botanik-orange/20 transition-all"
                />
                
                {searchQuery && filteredPlants.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-4 bg-white rounded-3xl shadow-2xl border border-botanik-green/5 overflow-hidden z-50 animate-in slide-in-from-top-2 duration-300">
                    {filteredPlants.map((plant) => (
                      <div 
                        key={plant.id}
                        onClick={() => onNavigate(plant.source === 'therapeutic' ? 'library' : plant.source === 'culinary' ? 'culinaire' : 'cosmetiques', plant.id)}
                        className="px-8 py-4 hover:bg-botanik-green/5 cursor-pointer flex items-center justify-between border-b border-botanik-green/5 last:border-0 group"
                      >
                        <div>
                          <div className="font-bold text-botanik-green">{plant.name}</div>
                          <div className="text-xs text-botanik-green/40 italic">{plant.latinName}</div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${
                            plant.source === 'therapeutic' ? 'bg-botanik-green/10 text-botanik-green' : 
                            plant.source === 'culinary' ? 'bg-botanik-orange/10 text-botanik-orange' : 
                            'bg-botanik-green/10 text-botanik-green'
                          }`}>
                            {plant.source}
                          </span>
                          <ChevronRight className="w-4 h-4 text-botanik-green/20 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right: BloomLab Rosemary Infusion Image Sans Opacité (Agrandie verticalement pour aligner le bas sur la barre de recherche) */}
            <div className="lg:col-span-5 flex flex-col h-full justify-stretch">
              <div className="relative w-full h-full min-h-[360px] lg:min-h-0 rounded-3xl overflow-hidden shadow-2xl border-2 border-white bg-white group flex flex-col">
                <img 
                  src={rosemaryImg} 
                  alt="BloomLab - Infusion de romarin" 
                  className="w-full h-full flex-1 object-cover opacity-100 group-hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute bottom-4 left-4 right-4 bg-[#0F261E]/85 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/20 shadow-lg flex items-center justify-between">
                  <div className="text-xs font-bold text-white tracking-wide">
                    BloomLab® • Infusion de Romarin
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#D97706] bg-[#D97706]/20 px-2.5 py-0.5 rounded-full border border-[#D97706]/30">
                    Totum Végétal
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Terrains Section — Normalisée T1 à T9 */}
      <section className="py-20 bg-white container mx-auto px-6 border-b border-botanik-green/5">
        <div className="max-w-4xl mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-botanik-green/5 rounded-full border border-botanik-green/10 text-botanik-green text-[10px] font-black uppercase tracking-[0.2em] mb-4">
            <span>Navigation par terrain</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-botanik-green mb-3">
            {lang === 'fr' 
              ? "Explorer l'univers Bloom par terrain" 
              : lang === 'de' 
              ? "Das Bloom-Universum nach Terrain erkunden" 
              : "Explore the Bloom Universe by Terrain"}
          </h2>
          <p className="text-botanik-green/70 text-base md:text-lg leading-relaxed">
            {TERRAIN_PAGE_INTRO[lang]}
          </p>
        </div>

        {/* 9 Terrains Grid (3x3 on desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 mb-8">
          {PUBLIC_TERRAINS.map((terrain) => {
            const Icon = terrain.icon;
            return (
              <div 
                key={terrain.code}
                onClick={() => onNavigate('terrain', terrain.code)}
                className="group flex flex-col justify-between p-6 rounded-3xl bg-[#FAF7F2] hover:bg-white hover:shadow-xl transition-all duration-300 cursor-pointer border border-[#D8CBB7]/30 hover:border-botanik-green/30 relative overflow-hidden"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-[#1C3F34] group-hover:bg-[#FAF7F2] text-white group-hover:text-[#1C3F34] border border-[#D8CBB7] group-hover:border-[#1C3F34] rounded-2xl flex items-center justify-center group-hover:scale-105 transition-all duration-300 shadow-sm">
                      <Icon className="w-5 h-5 transition-colors duration-300" />
                    </div>
                    <span className="text-[11px] font-black uppercase tracking-widest text-[#1C3F34] bg-[#1C3F34]/10 px-3 py-1 rounded-full border border-[#1C3F34]/15">
                      {terrain.code}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-botanik-green mb-2 group-hover:text-[#1C3F34] transition-colors">
                    {terrain.label[lang]}
                  </h3>
                  
                  <p className="text-xs text-botanik-green/70 leading-relaxed line-clamp-3 mb-6">
                    {terrain.publicDescription[lang]}
                  </p>
                </div>

                <div className="pt-4 border-t border-botanik-green/5 flex items-center justify-between text-xs font-bold text-[#D97706] group-hover:text-[#1C3F34] transition-colors">
                  <span>{lang === 'fr' ? 'Explorer les contenus' : lang === 'de' ? 'Inhalte entdecken' : 'Explore content'}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Note éditoriale de cadrage & non-diagnostic */}
        <div className="p-4 md:p-5 rounded-2xl bg-botanik-green/5 border border-botanik-green/10 text-xs text-botanik-green/70 leading-relaxed flex items-start gap-3">
          <ShieldAlert className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
          <p>
            <strong className="text-botanik-green font-semibold">Note éditoriale : </strong>
            {TERRAIN_EDITORIAL_NOTICE[lang]}
          </p>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-24 container mx-auto px-6">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold text-botanik-green">{t.categories.title}</h2>
            <p className="text-botanik-green/60">{t.categories.subtitle}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {categories.map((cat) => (
            <div 
              key={cat.id} 
              onClick={() => onNavigate(cat.view as any)}
              className={`group cursor-pointer ${cat.bg} rounded-[40px] p-10 border border-botanik-green/5 hover:shadow-2xl transition-all duration-500`}
            >
              <div className="flex justify-between items-start mb-8">
                <cat.icon className={`w-8 h-8 ${cat.color} group-hover:scale-110 transition-transform`} />
                <span className={`text-xs font-bold px-3 py-1 rounded-full bg-white/50 backdrop-blur-sm border border-botanik-green/5 ${cat.color}`}>{cat.count} {t.categories.fiches}</span>
              </div>
              <h3 className="text-2xl font-bold text-botanik-green mb-4">{t.categories[cat.id].name}</h3>
              <p className="text-sm text-botanik-green/60 mb-8 leading-relaxed">
                {t.categories[cat.id].desc}
              </p>
              <div className={`flex items-center gap-3 text-xs font-bold uppercase tracking-widest ${cat.color}`}>
                {t.categories.explorer} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Directory Section (Full List) */}
      <section className="py-24 bg-[#F9F9F7]">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mb-16">
            <h2 className="text-4xl font-bold text-botanik-green mb-6">{t.inventory.title}</h2>
            <p className="text-xl text-botanik-green/60">
              {t.inventory.description}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {unifiedBotanicalDatabase.sort((a, b) => a.name.localeCompare(b.name)).map((plant) => (
              <div 
                key={plant.id}
                onClick={() => onNavigate(plant.source === 'therapeutic' ? 'library' : plant.source === 'culinary' ? 'culinaire' : 'cosmetiques', plant.id)}
                className="bg-white p-4 rounded-2xl border border-botanik-green/5 hover:border-botanik-orange/30 hover:shadow-lg transition-all cursor-pointer group"
              >
                <div className="text-xs font-bold text-botanik-green mb-1 truncate group-hover:text-botanik-orange transition-colors">
                  {plant.name}
                </div>
                <div className={`w-1.5 h-1.5 rounded-full ${
                  plant.source === 'therapeutic' ? 'bg-botanik-green' : 
                  plant.source === 'culinary' ? 'bg-botanik-orange' : 
                  'bg-botanik-green'
                }`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Content description */}
      <section className="py-24 bg-[#0F261E] text-white border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#1C3F34] border border-[#D8CBB7]/40 text-[#D97706] text-[10px] font-black uppercase tracking-[0.3em] mb-4">
              {t.features.badge}
            </span>
            <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight">{t.features.title}</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Zap, t: t.features.item1 },
              { icon: FlaskConical, t: t.features.item2 },
              { icon: Star, t: t.features.item3 },
              { icon: ShieldCheck, t: t.features.item4 }
            ].map((item, idx) => (
              <div key={idx} className="bg-[#16352B] border border-[#D8CBB7]/30 hover:border-[#D97706]/60 p-8 rounded-3xl shadow-lg transition-all duration-300">
                <div className="w-12 h-12 rounded-2xl bg-[#1C3F34] border border-[#D8CBB7]/30 flex items-center justify-center mb-6">
                  <item.icon className="w-6 h-6 text-[#D97706]" />
                </div>
                <h4 className="font-bold text-lg mb-3 text-white">{item.t.title}</h4>
                <p className="text-sm text-[#E8F1EE]/80 leading-relaxed">{item.t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
