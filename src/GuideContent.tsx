import React from 'react';
import { Sparkles, Leaf, ShieldCheck, FlaskConical, BookOpen, ChevronRight, Beaker, Clock, Thermometer, Activity, Settings, Info } from 'lucide-react';
import { wrapTitle } from './lib/textUtils';
import bloomLabImg from './assets/images/bloomlab_main_1784887530345.jpeg';
import { cosmeticsRecipes } from './cosmeticsData';
import { translations, Language } from './translations';

interface GuideContentProps {
  onNavigate: (view: any) => void;
  lang: Language;
}

export default function GuideContent({ onNavigate, lang }: GuideContentProps) {
  const t = translations[lang];
  // Get the 3 technical sheets from the data
  const technicalSheets = [
    cosmeticsRecipes.find(r => r.plant_id === "elixir_croissance_capillaire"),
    cosmeticsRecipes.find(r => r.plant_id === "serum_reparateur_nuit"),
    cosmeticsRecipes.find(r => r.plant_id === "huile_massage_recuperation")
  ].filter(Boolean);

  return (
    <div id="comprendre-infusion-botanique" className="max-w-[1200px] mx-auto px-6 py-12 lg:py-24 animate-in fade-in duration-1000">
      
      {/* Header: Mode d'Emploi */}
      <header className="mb-24 text-center">
        <h1 className="text-5xl md:text-7xl font-black text-[#0F261E] mb-8 tracking-tighter leading-none">
          {t.seo.infusion_guide.title}
        </h1>
        <div className="max-w-3xl mx-auto">
          <p className="text-xl text-[#0F261E]/70 leading-relaxed font-medium mb-8">
            {t.seo.infusion_guide.summary}
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <span className="px-4 py-2 bg-[#E8F1EE] text-[#0F261E] rounded-full text-sm font-bold border border-[#D8CBB7]">Totum Absolute</span>
            <span className="px-4 py-2 bg-[#E8F1EE] text-[#0F261E] rounded-full text-sm font-bold border border-[#D8CBB7]">Précision Thermique</span>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <button 
              onClick={() => onNavigate('infuseur-botanique')}
              className="px-8 py-4 bg-botanik-green text-white rounded-2xl font-bold hover:bg-botanik-green/90 transition-all shadow-xl flex items-center gap-2 group"
            >
              {lang === 'fr' ? "Découvrir l'infuseur botanique" : "Discover the botanical infuser"} <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => onNavigate('home')}
              className="px-8 py-4 bg-white border border-botanik-green/10 text-botanik-green rounded-2xl font-bold hover:bg-[#F5F3EB] transition-all flex items-center gap-2"
            >
              {lang === 'fr' ? "Retour à l'accueil" : "Back to home"}
            </button>
          </div>
        </div>
      </header>

      {/* FAQ Section: Strategic SEO Visibility */}
      <section className="mb-32">
        <div className="bg-[#FAF7F2] rounded-[40px] border border-[#F3EEE6] p-8 md:p-16">
          <h2 className="text-3xl md:text-4xl font-black text-[#0F261E] mb-12 flex items-center gap-4">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center border border-[#F3EEE6] shadow-sm">
              <span className="text-botanik-green font-bold">?</span>
            </div>
            {t.seo.infusion_guide.faq_title}
          </h2>
          
          <div className="grid gap-8">
            {t.seo.infusion_guide.faq.map((item: any, index: number) => (
              <div key={index} className="bg-white rounded-3xl p-8 border border-[#F3EEE6] hover:shadow-md transition-shadow duration-300">
                <h3 className="text-xl font-bold text-[#0F261E] mb-4 flex items-start gap-3">
                  <span className="text-botanik-green opacity-50 shrink-0">Q.</span>
                  {item.q}
                </h3>
                <div className="pl-8 border-l-2 border-[#E8F1EE]">
                  <p className="text-[#0F261E]/70 leading-relaxed">
                    {item.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Machine Intro Section */}
      <section className="mb-32">
        <div className="bg-white border border-botanik-green/5 rounded-[60px] overflow-hidden shadow-2xl">
          <div className="flex flex-col lg:flex-row items-stretch">
            <div className="lg:w-1/2 p-8 md:p-16 lg:p-20 flex flex-col justify-center">
              <h2 className="text-3xl md:text-5xl font-bold text-botanik-green mb-8 leading-tight">{t.guide.machine.title}</h2>
              <div className="space-y-6 mb-12">
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-botanik-green/5 rounded-xl flex items-center justify-center shrink-0">
                    <Settings className="w-5 h-5 text-botanik-green" />
                  </div>
                  <div>
                    <h4 className="font-bold text-botanik-green mb-1">{t.guide.machine.precision.title}</h4>
                    <p className="text-botanik-green/60 text-sm leading-relaxed">{t.guide.machine.precision.desc}</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-botanik-green/5 rounded-xl flex items-center justify-center shrink-0">
                    <FlaskConical className="w-5 h-5 text-botanik-green" />
                  </div>
                  <div>
                    <h4 className="font-bold text-botanik-green mb-1">{t.guide.machine.extraction.title}</h4>
                    <p className="text-botanik-green/60 text-sm leading-relaxed">{t.guide.machine.extraction.desc}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col gap-4 mt-8">
                <button 
                  onClick={() => onNavigate('cart')}
                  className="w-full md:w-auto px-10 py-6 bg-white border-2 border-botanik-green text-botanik-green rounded-2xl font-bold hover:bg-botanik-green hover:text-white transition-all shadow-xl flex items-center justify-center gap-3 group"
                >
                  <span className="uppercase tracking-widest">{t.common.add_to_cart}</span>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
            <div className="lg:w-1/2 relative min-h-[500px] lg:min-h-0 overflow-hidden bg-[#F9F9F7]">
              <img 
                src={bloomLabImg} 
                alt={t.seo.alt.bloomlab} 
                className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-90" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Les 3 Niveaux d'Utilisation */}
      <section id="usage-levels" className="mb-32">
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-botanik-green mb-6 tracking-tight">{t.guide.levels.title}</h2>
          <p className="text-botanik-green/60 text-xl max-w-2xl mx-auto">{t.guide.levels.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Niveau 1 */}
          <div 
            onClick={() => onNavigate('culinaire')}
            className="bg-white rounded-[40px] border border-botanik-green/5 p-10 shadow-sm hover:bg-[#F5F3EB] hover:shadow-xl transition-all duration-500 group cursor-pointer"
          >
            <div className="w-16 h-16 bg-[#F5F3EB] rounded-2xl flex items-center justify-center mb-8 group-hover:bg-botanik-orange/10 transition-colors">
              <Leaf className="w-8 h-8 text-botanik-orange" />
            </div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-6 h-6 rounded-full bg-botanik-orange text-white text-[10px] font-bold flex items-center justify-center">1</span>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-botanik-orange">{t.guide.levels.lvl1.status}</span>
            </div>
            <h3 className="text-2xl font-bold text-botanik-green mb-4 leading-tight group-hover:text-botanik-green transition-colors">{t.guide.levels.lvl1.title}</h3>
            <p className="text-botanik-green/60 text-sm mb-12 leading-relaxed">
              {t.guide.levels.lvl1.desc}
            </p>
            <div className="pt-6 border-t border-botanik-green/10">
              <span className="text-[10px] font-bold text-botanik-orange uppercase tracking-widest flex items-center gap-2">
                {t.guide.levels.lvl1.cta} <ChevronRight className="w-3 h-3" />
              </span>
            </div>
          </div>

          {/* Niveau 2 */}
          <div 
            onClick={() => onNavigate('cosmetiques')}
            className="bg-white rounded-[40px] border border-botanik-green/5 p-10 shadow-sm hover:bg-[#F5F3EB] hover:shadow-xl transition-all duration-500 group cursor-pointer"
          >
            <div className="w-16 h-16 bg-[#F5F3EB] rounded-2xl flex items-center justify-center mb-8 group-hover:bg-botanik-orange/10 transition-colors">
              <FlaskConical className="w-8 h-8 text-botanik-orange" />
            </div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-6 h-6 rounded-full bg-botanik-orange text-white text-[10px] font-bold flex items-center justify-center">2</span>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-botanik-orange">{t.guide.levels.lvl2.status}</span>
            </div>
            <h3 className="text-2xl font-bold text-botanik-green mb-4 leading-tight group-hover:text-botanik-green transition-colors">{t.guide.levels.lvl2.title}</h3>
            <p className="text-botanik-green/60 text-sm mb-12 leading-relaxed">
              {t.guide.levels.lvl2.desc}
            </p>
            <div className="pt-6 border-t border-botanik-green/10">
              <span className="text-[10px] font-bold text-botanik-orange uppercase tracking-widest flex items-center gap-2">
                {t.guide.levels.lvl2.cta} <ChevronRight className="w-3 h-3" />
              </span>
            </div>
          </div>

          {/* Niveau 3 */}
          <div 
            onClick={() => onNavigate('library-landing')}
            className="bg-white rounded-[40px] border border-botanik-green/5 p-10 shadow-sm hover:bg-[#F5F3EB] hover:shadow-xl transition-all duration-500 group cursor-pointer"
          >
            <div className="w-16 h-16 bg-[#F5F3EB] rounded-2xl flex items-center justify-center mb-8 group-hover:bg-botanik-orange/10 transition-colors">
              <Activity className="w-8 h-8 text-botanik-orange" />
            </div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-6 h-6 rounded-full bg-botanik-orange text-white text-[10px] font-bold flex items-center justify-center">3</span>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-botanik-orange">{t.guide.levels.lvl3.status}</span>
            </div>
            <h3 className="text-2xl font-bold text-botanik-green mb-4 leading-tight group-hover:text-botanik-green transition-colors">{t.guide.levels.lvl3.title}</h3>
            <p className="text-botanik-green/60 text-sm mb-12 leading-relaxed">
              {t.guide.levels.lvl3.desc}
            </p>
            <div className="pt-6 border-t border-botanik-green/10">
              <span className="text-[10px] font-bold text-botanik-orange uppercase tracking-widest flex items-center gap-2">
                {t.guide.levels.lvl3.cta} <ChevronRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Trouver votre voie */}
      <section className="mb-32">
        <div className="max-w-3xl mb-16">
          <span className="inline-block px-3 py-1 bg-botanik-orange/10 text-botanik-orange text-[10px] font-bold uppercase tracking-widest rounded-full mb-6">{t.home.way.badge}</span>
          <h2 className="text-4xl md:text-6xl font-bold text-botanik-green mb-8 leading-tight">
            {t.home.way.title}
          </h2>
          <p className="text-xl text-botanik-green/60 leading-relaxed font-light">
            {t.home.way.description}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-10 rounded-[40px] border border-botanik-green/5 shadow-sm hover:border-botanik-orange transition-all duration-300 flex flex-col group">
            <h4 className="text-xl font-bold text-botanik-green mb-4">{t.home.way.discover.title}</h4>
            <p className="text-botanik-green/60 text-sm mb-8 leading-relaxed flex-grow">
              {t.home.way.discover.description}
            </p>
            <button 
              onClick={() => onNavigate('manifeste')}
              className="flex items-center gap-2 text-botanik-orange font-bold text-xs uppercase tracking-[0.2em] group-hover:gap-3 transition-all"
            >
              {t.home.way.discover.cta} <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="bg-white p-10 rounded-[40px] border border-botanik-green/5 shadow-sm hover:border-botanik-orange transition-all duration-300 flex flex-col group">
            <h4 className="text-xl font-bold text-botanik-green mb-4">{t.home.way.reset.title}</h4>
            <p className="text-botanik-green/60 text-sm mb-8 leading-relaxed flex-grow">
              {t.home.way.reset.description}
            </p>
            <button 
              onClick={() => onNavigate('phytotherapie-reset')}
              className="flex items-center gap-2 text-botanik-orange font-bold text-xs uppercase tracking-[0.2em] group-hover:gap-3 transition-all"
            >
              {t.home.way.reset.cta} <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="bg-white p-10 rounded-[40px] border border-botanik-green/5 shadow-sm hover:border-botanik-orange transition-all duration-300 flex flex-col group">
            <h4 className="text-xl font-bold text-botanik-green mb-4">{t.home.way.more.title}</h4>
            <p className="text-botanik-green/60 text-sm mb-8 leading-relaxed flex-grow">
              {t.home.way.more.description}
            </p>
            <button 
              onClick={() => onNavigate('library-landing')}
              className="flex items-center gap-2 text-botanik-orange font-bold text-xs uppercase tracking-[0.2em] group-hover:gap-3 transition-all"
            >
              {t.home.way.more.cta} <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Principes Fondamentaux d'Usage */}
      <section id="reset-homeostasique">
        <div className="bg-[#F5F3EB] rounded-[48px] p-8 md:p-16 lg:p-20">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-bold text-botanik-green mb-8 leading-tight">{t.guide.principles.title}</h2>
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="w-8 h-8 bg-botanik-green text-white rounded-full flex items-center justify-center font-bold shrink-0 mt-1">1</div>
                <div>
                  <h4 className="font-bold text-botanik-green mb-2 text-lg">{t.guide.principles.p1.title}</h4>
                  <p className="text-botanik-green/60 leading-relaxed">{t.guide.principles.p1.desc}</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="w-8 h-8 bg-botanik-green text-white rounded-full flex items-center justify-center font-bold shrink-0 mt-1">2</div>
                <div>
                  <h4 className="font-bold text-botanik-green mb-2 text-lg">{t.guide.principles.p2.title}</h4>
                  <p className="text-botanik-green/60 leading-relaxed">{t.guide.principles.p2.desc}</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="w-8 h-8 bg-botanik-green text-white rounded-full flex items-center justify-center font-bold shrink-0 mt-1">3</div>
                <div>
                  <h4 className="font-bold text-botanik-green mb-2 text-lg">{t.guide.principles.p3.title}</h4>
                  <p className="text-botanik-green/60 leading-relaxed">{t.guide.principles.p3.desc}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
    </div>
  );
}
