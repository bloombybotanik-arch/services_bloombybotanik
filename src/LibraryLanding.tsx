import React, { useState, useMemo } from 'react';
import { Search, Leaf, BookOpen, FlaskConical, Target, Zap, ChevronRight, ArrowRight, ShieldCheck, Star, Utensils, Sparkles } from 'lucide-react';
import { wrapTitle } from './lib/textUtils';
import { unifiedBotanicalDatabase } from './data/unifiedBotanicalData';
import { translations, Language } from './translations';

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

  const categories = [
    { 
      id: 'therapeutic', 
      name: 'Thérapeutique', 
      view: 'herbier', 
      icon: Leaf, 
      count: 56,
      color: 'text-botanik-green',
      bg: 'bg-botanik-green/5'
    },
    { 
      id: 'culinary', 
      name: 'Culinaire', 
      view: 'culinaire', 
      icon: Utensils, 
      count: 15,
      color: 'text-botanik-orange',
      bg: 'bg-botanik-orange/5'
    },
    { 
      id: 'cosmetic', 
      name: 'Cosmétique', 
      view: 'cosmetiques', 
      icon: Sparkles, 
      count: 22,
      color: 'text-botanik-green',
      bg: 'bg-botanik-green/5'
    }
  ];

  return (
    <div className="animate-in fade-in duration-700 bg-white">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 bg-[#F9F9F7] overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
          <img src="https://images.unsplash.com/photo-1541675154750-0444c7d51e8e?auto=format&fit=crop&q=80&w=1200" alt="Botanical detail" className="w-full h-full object-cover" />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-botanik-green/5 text-botanik-green px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-8">
              {t.hero.badge}
            </div>
            <h1 className="text-4xl md:text-8xl font-bold text-botanik-green mb-8 leading-[0.9] tracking-tighter">
              {t.hero.title}<br />
              <span className="text-[#F97316]">{t.hero.title_accent}</span>
            </h1>
            
            {/* Unified Search / Directory */}
            <div className="relative max-w-2xl mt-8 md:mt-12">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 md:w-6 h-5 md:h-6 text-botanik-green/30" />
              <input 
                type="text" 
                placeholder={t.hero.search_placeholder} 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-14 md:pl-16 pr-6 py-4 md:py-6 bg-white rounded-[24px] md:rounded-[32px] border-none text-base md:text-xl text-botanik-green shadow-xl focus:ring-2 focus:ring-botanik-orange/20 transition-all"
              />
              
              {searchQuery && filteredPlants.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-4 bg-white rounded-3xl shadow-2xl border border-botanik-green/5 overflow-hidden z-50 animate-in slide-in-from-top-2 duration-300">
                  {filteredPlants.map((plant) => (
                    <div 
                      key={plant.id}
                      onClick={() => onNavigate(plant.source === 'therapeutic' ? 'herbier' : plant.source === 'culinary' ? 'culinaire' : 'cosmetiques', plant.id)}
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
          {[
            { id: 'therapeutic', t: t.categories.therapeutic, view: 'herbier', icon: Leaf, count: 56, color: 'text-botanik-green', bg: 'bg-botanik-green/5' },
            { id: 'culinary', t: t.categories.culinary, view: 'culinaire', icon: Utensils, count: 15, color: 'text-botanik-orange', bg: 'bg-botanik-orange/5' },
            { id: 'cosmetic', t: t.categories.cosmetic, view: 'cosmetiques', icon: Sparkles, count: 22, color: 'text-botanik-green', bg: 'bg-botanik-green/5' }
          ].map((cat) => (
            <div 
              key={cat.id} 
              onClick={() => onNavigate(cat.view as any)}
              className={`group cursor-pointer ${cat.bg} rounded-[40px] p-10 border border-botanik-green/5 hover:shadow-2xl transition-all duration-500`}
            >
              <div className="flex justify-between items-start mb-8">
                <cat.icon className={`w-8 h-8 ${cat.color} group-hover:scale-110 transition-transform`} />
                <span className={`text-xs font-bold px-3 py-1 rounded-full bg-white/50 backdrop-blur-sm border border-botanik-green/5 ${cat.color}`}>{cat.count} {t.categories.fiches}</span>
              </div>
              <h3 className="text-2xl font-bold text-botanik-green mb-4">{cat.t.name}</h3>
              <p className="text-sm text-botanik-green/60 mb-8 leading-relaxed">
                {cat.t.desc}
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
                onClick={() => onNavigate(plant.source === 'therapeutic' ? 'herbier' : plant.source === 'culinary' ? 'culinaire' : 'cosmetiques', plant.id)}
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
      <section className="py-24 bg-botanik-green text-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#F97316] mb-4 block">{t.features.badge}</span>
            <h2 className="text-4xl md:text-6xl font-bold">{t.features.title}</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Zap, t: t.features.item1 },
              { icon: FlaskConical, t: t.features.item2 },
              { icon: Star, t: t.features.item3 },
              { icon: ShieldCheck, t: t.features.item4 }
            ].map((item, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-sm">
                <item.icon className="w-8 h-8 text-[#F97316] mb-6" />
                <h4 className="font-bold text-lg mb-3">{item.t.title}</h4>
                <p className="text-sm text-white/60 leading-relaxed">{item.t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
