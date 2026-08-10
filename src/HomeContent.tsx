import React, { useState, lazy, Suspense } from 'react';
import { Sparkles, Leaf, ShieldCheck, Award, User, ChevronRight, FlaskConical, BookOpen, ShoppingBag, ChefHat, Star, Wind, Waves, Moon, Utensils, X, ArrowRight, Activity } from 'lucide-react';
import bloomImg from './assets/images/bloomlab_main_1784887530345.jpeg';
import { resetDetailsData, ResetSectionDetail } from './data/resetDetails';
import { motion, AnimatePresence } from 'motion/react';

import { translations, Language } from './translations';
import { OptimizedImage } from './components/OptimizedImage';

const ResetDetailModal = lazy(() => import('./components/ResetDetailModal').then(m => ({ default: m.ResetDetailModal })));


interface HomeContentProps {
  onNavigate: (view: any) => void;
  lang: Language;
}

export default function HomeContent({ onNavigate, lang }: HomeContentProps) {
  const [selectedResetDetail, setSelectedResetDetail] = useState<ResetSectionDetail | null>(null);
  const t = translations[lang];

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-12 lg:py-24 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      
      <AnimatePresence>
        {selectedResetDetail && (
          <Suspense fallback={null}>
            <ResetDetailModal 
              detail={selectedResetDetail} 
              onClose={() => setSelectedResetDetail(null)} 
              onNavigate={onNavigate}
              lang={lang}
            />
          </Suspense>
        )}
      </AnimatePresence>

      {/* SEO PILLAR LINK - New Section - MOVED TO TOP */}
      <section className="mb-24 md:mb-32">
        <div className="bg-botanik-green/5 rounded-[40px] md:rounded-[60px] p-8 md:p-16 border border-botanik-green/10 relative overflow-hidden group">
          <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-botanik-green/5 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-1000" />
          <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
            <div className="max-w-3xl">
              <span className="inline-block px-3 py-1 bg-botanik-green text-white text-[10px] font-bold uppercase tracking-widest rounded-full mb-6 whitespace-nowrap">
                {t.home.extractionGuide.badge}
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-botanik-green mb-6 leading-tight">
                {t.home.extractionGuide.title} <br />
                <span className="text-botanik-orange">{t.home.extractionGuide.subtitle}</span>
              </h2>
              <p className="text-lg md:text-xl text-botanik-green/60 mb-10 leading-relaxed font-light">
                {t.home.extractionGuide.description}
              </p>
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => onNavigate('boutique')}
                  className="px-6 md:px-8 py-3 md:py-4 bg-botanik-green text-white rounded-2xl font-bold hover:bg-botanik-orange transition-all flex items-center justify-center gap-3 shadow-xl shadow-botanik-green/10 text-sm md:text-base flex-1 sm:flex-none"
                >
                  {t.home.extractionGuide.cta_buy} <ArrowRight className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => onNavigate('phytotherapie-reset')}
                  className="px-6 md:px-8 py-3 md:py-4 bg-white text-botanik-green border border-botanik-green/10 rounded-2xl font-bold hover:bg-botanik-green/5 transition-all flex items-center justify-center text-sm md:text-base flex-1 sm:flex-none whitespace-nowrap"
                >
                  {lang === 'fr' ? "Démarrer l'expérience" : lang === 'en' ? "Start the experience" : "Erfahrung starten"}
                </button>
              </div>
            </div>
            <div className="relative h-[250px] md:h-[450px] rounded-3xl overflow-hidden shadow-2xl transition-transform duration-700 group-hover:scale-[1.02] bg-botanik-green/10">
              <OptimizedImage 
                src={bloomImg} 
                priority={true} 
                width={800}
                height={1000}
                className="w-full h-full object-cover" 
                alt="BloomLab - Appareil d'infusion botanique et extraction de précision pour le Totum des plantes" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-botanik-green/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </div>
        </div>
      </section>

      {/* UNIVERSES SECTION - NEW Transactional Hub */}
      <section className="mb-24 md:mb-32">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-botanik-green mb-6">{t.universes.title}</h2>
          <p className="text-lg text-botanik-green/60 font-light">{t.universes.subtitle}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* CULINARY */}
          <div className="group relative bg-[#FFF9F2] rounded-[40px] p-8 border border-orange-100 hover:border-botanik-orange transition-all duration-500 overflow-hidden">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-botanik-orange/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
            <div className="relative z-10">
              <div className="w-14 h-14 bg-botanik-orange/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                <ChefHat className="w-7 h-7 text-botanik-orange" />
              </div>
              <h3 className="text-2xl font-bold text-botanik-green mb-4">{t.universes.culinaire.title}</h3>
              <p className="text-botanik-green/60 mb-8 font-light leading-relaxed">
                {t.universes.culinaire.description}
              </p>
              <button 
                onClick={() => onNavigate('culinaire')}
                className="w-full py-4 bg-botanik-orange text-white rounded-2xl font-bold hover:bg-botanik-green transition-all shadow-lg shadow-botanik-orange/10 flex items-center justify-center gap-2"
              >
                {t.universes.culinaire.cta} <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* COSMETICS */}
          <div className="group relative bg-[#F7FBF7] rounded-[40px] p-8 border border-green-100 hover:border-botanik-green transition-all duration-500 overflow-hidden">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-botanik-green/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
            <div className="relative z-10">
              <div className="w-14 h-14 bg-botanik-green/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                <Star className="w-7 h-7 text-botanik-green" />
              </div>
              <h3 className="text-2xl font-bold text-botanik-green mb-4">{t.universes.cosmetique.title}</h3>
              <p className="text-botanik-green/60 mb-8 font-light leading-relaxed">
                {t.universes.cosmetique.description}
              </p>
              <button 
                onClick={() => onNavigate('cosmetiques')}
                className="w-full py-4 bg-botanik-green text-white rounded-2xl font-bold hover:bg-botanik-orange transition-all shadow-lg shadow-botanik-green/10 flex items-center justify-center gap-2"
              >
                {t.universes.cosmetique.cta} <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* RESET */}
          <div className="group relative bg-[#F5F7FF] rounded-[40px] p-8 border border-blue-100 hover:border-botanik-green transition-all duration-500 overflow-hidden">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
            <div className="relative z-10">
              <div className="w-14 h-14 bg-botanik-green/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                <Activity className="w-7 h-7 text-botanik-green" />
              </div>
              <h3 className="text-2xl font-bold text-botanik-green mb-4">{t.universes.reset.title}</h3>
              <p className="text-botanik-green/60 mb-8 font-light leading-relaxed">
                {t.universes.reset.description}
              </p>
              <button 
                onClick={() => onNavigate('phytotherapie-reset')}
                className="w-full py-4 border-2 border-botanik-green text-botanik-green rounded-2xl font-bold hover:bg-botanik-green hover:text-white transition-all flex items-center justify-center gap-2"
              >
                {t.universes.reset.cta} <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* PAGE 1 — COMMENCER ICI */}
      <section id="protocole" className="mb-24 md:mb-32 scroll-mt-24">
        <div className="bg-white rounded-[40px] md:rounded-[60px] p-6 md:p-12 lg:p-16 border border-botanik-green/5 shadow-2xl mb-16 md:mb-24 overflow-hidden relative group">
          <div className="absolute top-0 right-0 w-48 md:w-64 h-48 md:h-64 bg-botanik-orange/5 rounded-bl-full -z-0" />
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-20 items-center relative z-10">
            <div className="max-w-xl">
              <div className="flex gap-4 text-[10px] font-black text-botanik-orange uppercase tracking-[0.3em] items-center mb-8">
                <span>{t.home.hero.intro}</span>
                <span className="w-1 h-1 rounded-full bg-botanik-orange/20" />
                <span>{t.home.hero.onboarding}</span>
              </div>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-botanik-green mb-6 md:mb-8 leading-[1.1]">
                {t.home.hero.title}
              </h1>
              <p className="text-base md:text-lg lg:text-xl text-botanik-green/60 leading-relaxed font-light">
                {t.home.hero.description}
              </p>
            </div>
            <div className="relative aspect-[4/5] lg:aspect-[3/4] rounded-[32px] md:rounded-[40px] overflow-hidden border-4 md:border-8 border-white shadow-2xl transition-transform duration-700 group-hover:scale-[1.02]">
              <video 
                src="/demo_bloomlab.mp4" 
                autoPlay 
                loop 
                muted 
                playsInline
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-botanik-green/10 rounded-[32px] md:rounded-[40px]" />
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          <div className="bg-white p-6 md:p-12 rounded-[32px] md:rounded-[40px] border border-botanik-green/5 shadow-sm hover:shadow-xl transition-all duration-500 group">
            <div className="w-12 h-12 bg-botanik-orange/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Sparkles className="w-6 h-6 text-botanik-orange" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-botanik-green mb-4">{t.home.cards.welcome.title}</h3>
            <p className="text-sm md:text-base text-botanik-green/60 leading-relaxed">
              {t.home.cards.welcome.description}
            </p>
          </div>

          <div className="bg-white p-6 md:p-12 rounded-[32px] md:rounded-[40px] border border-botanik-green/5 shadow-sm hover:shadow-xl transition-all duration-500 group">
            <div className="w-12 h-12 bg-botanik-orange/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <FlaskConical className="w-6 h-6 text-botanik-orange" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-botanik-green mb-4">{t.home.cards.what_we_do.title}</h3>
            <p className="text-sm md:text-base text-botanik-green/60 leading-relaxed">
              {t.home.cards.what_we_do.description}
            </p>
          </div>

          <div className="bg-white p-6 md:p-12 rounded-[32px] md:rounded-[40px] border border-botanik-green/5 shadow-sm hover:shadow-xl transition-all duration-500 group">
            <div className="w-12 h-12 bg-botanik-orange/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <BookOpen className="w-6 h-6 text-botanik-orange" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-botanik-green mb-4">{t.home.cards.in_app.title}</h3>
            <p className="text-sm md:text-base text-botanik-green/60 leading-relaxed">
              {t.home.cards.in_app.description}
            </p>
          </div>

          <div className="bg-white p-6 md:p-12 rounded-[32px] md:rounded-[40px] border border-botanik-green/5 shadow-sm hover:shadow-xl transition-all duration-500 group">
            <div className="w-12 h-12 bg-botanik-orange/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <ChevronRight className="w-6 h-6 text-botanik-orange" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-botanik-green mb-4">{t.home.cards.start.title}</h3>
            <p className="text-sm md:text-base text-botanik-green/60 leading-relaxed mb-6">
              {t.home.cards.start.description}
            </p>
            <button 
              onClick={() => onNavigate('machine')}
              className="flex items-center gap-2 text-botanik-orange font-bold text-sm uppercase tracking-widest hover:gap-3 transition-all"
            >
              {t.home.cards.start.cta} <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* SECTION I - Comprendre l'infusion */}
      <section id="comprendre-infusion-botanique" className="mb-24 md:mb-32 scroll-mt-24">
        <div className="bg-white rounded-[40px] md:rounded-[60px] p-8 md:p-16 border border-botanik-green/5 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-botanik-orange/5 rounded-bl-full -z-0" />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold text-botanik-green mb-8 leading-tight max-w-2xl">
              {t.home.understandingInfusion.h2}
            </h2>
            <p className="text-lg md:text-xl text-botanik-green/60 mb-12 max-w-3xl leading-relaxed font-light">
              {t.home.understandingInfusion.intro}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
              {t.home.understandingInfusion.cards.map((card: any, idx: number) => (
                <div key={idx} className="bg-[#F9F9F7] p-8 rounded-3xl border border-botanik-green/5 hover:border-botanik-orange/30 transition-all duration-300 group/card">
                  <h3 className="text-xl font-bold text-botanik-green mb-4 group-hover/card:text-botanik-orange transition-colors flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-botanik-orange/10 flex items-center justify-center text-botanik-orange text-xs font-black">{idx + 1}</span>
                    {card.title}
                  </h3>
                  <p className="text-sm md:text-base text-botanik-green/60 leading-relaxed font-light">
                    {card.text}
                  </p>
                </div>
              ))}
            </div>

            <div className="border-t border-botanik-green/10 pt-16">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-botanik-green mb-6">
                    {t.home.understandingInfusion.bloomlab_h2}
                  </h3>
                  <p className="text-base md:text-lg text-botanik-green/60 leading-relaxed font-light mb-10">
                    {t.home.understandingInfusion.bloomlab_text}
                  </p>
                  <button 
                    onClick={() => onNavigate('machine')}
                    className="inline-flex items-center gap-3 px-8 py-4 bg-botanik-green text-white rounded-2xl font-bold text-sm hover:bg-botanik-orange transition-all group/btn shadow-xl shadow-botanik-green/10"
                  >
                    {t.home.understandingInfusion.cta}
                    <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
                <div className="bg-botanik-orange/5 p-8 rounded-[32px] border border-botanik-orange/10 relative">
                  <Sparkles className="absolute top-4 right-4 w-6 h-6 text-botanik-orange/20" />
                  <p className="text-sm md:text-base text-botanik-orange font-medium leading-relaxed italic pr-8">
                    {t.home.understandingInfusion.safety_note}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PAGE 2 — LA SCIENCE DU TOTUM */}
      <section id="science" className="mb-24 md:mb-32 scroll-mt-24">
        <div className="max-w-3xl mb-12 md:mb-16">
          <span className="inline-block px-3 py-1 bg-botanik-green/5 text-botanik-green text-[10px] font-bold uppercase tracking-widest rounded-full mb-6">{t.home.science.badge}</span>
          <h2 className="text-2xl md:text-6xl font-bold text-botanik-green mb-6 md:mb-8 leading-tight">
            {t.home.science.title}
          </h2>
          <p className="text-base md:text-xl text-botanik-green/60 leading-relaxed font-light">
            {t.home.science.description}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 md:gap-12">
          <div className="space-y-10 md:space-y-12">
            <div>
              <h4 className="text-lg md:text-xl font-bold text-botanik-green mb-2">{t.home.science.q1.title}</h4>
              <p className="text-[10px] md:text-sm font-medium text-botanik-orange uppercase tracking-wider mb-3 md:mb-4">{t.home.science.q1.subtitle}</p>
              <p className="text-sm md:text-base text-botanik-green/60 leading-relaxed">
                {t.home.science.q1.description}
              </p>
            </div>
            <div>
              <h4 className="text-lg md:text-xl font-bold text-botanik-green mb-2">{t.home.science.q2.title}</h4>
              <p className="text-[10px] md:text-sm font-medium text-botanik-orange uppercase tracking-wider mb-3 md:mb-4">{t.home.science.q2.subtitle}</p>
              <p className="text-sm md:text-base text-botanik-green/60 leading-relaxed">
                {t.home.science.q2.description}
              </p>
            </div>
          </div>
          <div className="space-y-10 md:space-y-12">
            <div>
              <h4 className="text-lg md:text-xl font-bold text-botanik-green mb-2">{t.home.science.q3.title}</h4>
              <p className="text-[10px] md:text-sm font-medium text-botanik-orange uppercase tracking-wider mb-3 md:mb-4">{t.home.science.q3.subtitle}</p>
              <p className="text-sm md:text-base text-botanik-green/60 leading-relaxed">
                {t.home.science.q3.description}
              </p>
            </div>
            <div>
              <h4 className="text-lg md:text-xl font-bold text-botanik-green mb-2">{t.home.science.q4.title}</h4>
              <p className="text-[10px] md:text-sm font-medium text-botanik-orange uppercase tracking-wider mb-3 md:mb-4">{t.home.science.q4.subtitle}</p>
              <p className="text-sm md:text-base text-botanik-green/60 leading-relaxed">
                {t.home.science.q4.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PAGE 3 — UNE AUTRE VOIE */}
      <section id="alternative" className="mb-32 scroll-mt-24">
        <div className="bg-botanik-green rounded-[60px] p-8 md:p-20 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 p-12 opacity-5">
            <Sparkles className="w-96 h-96 rotate-12" />
          </div>
          
          <div className="relative z-10">
            <div className="max-w-3xl mb-12 md:mb-20">
              <h2 className="text-3xl md:text-6xl font-bold mb-6 md:mb-8 leading-tight">
                {t.home.alternative.title}
              </h2>
              <p className="text-lg md:text-xl text-white/70 leading-relaxed font-light italic">
                {t.home.alternative.quote}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-16">
              <div className="space-y-10">
                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center shrink-0">
                    <Leaf className="w-6 h-6 text-botanik-orange" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">{t.home.alternative.q1.title}</h4>
                    <p className="text-white/60 text-sm leading-relaxed">
                      {t.home.alternative.q1.description}
                    </p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-6 h-6 text-botanik-orange" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">{t.home.alternative.q2.title}</h4>
                    <p className="text-white/60 text-sm leading-relaxed">
                      {t.home.alternative.q2.description}
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-10">
                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center shrink-0">
                    <Award className="w-6 h-6 text-botanik-orange" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">{t.home.alternative.q3.title}</h4>
                    <p className="text-white/60 text-sm leading-relaxed">
                      {t.home.alternative.q3.description}
                    </p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center shrink-0">
                    <User className="w-6 h-6 text-botanik-orange" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">{t.home.alternative.q4.title}</h4>
                    <p className="text-white/60 text-sm leading-relaxed">
                      {t.home.alternative.q4.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PAGE 4 — TROUVER VOTRE VOIE */}
      <section id="choix" className="scroll-mt-24">
        <div className="max-w-3xl mb-16">
          <span className="inline-block px-3 py-1 bg-botanik-orange/10 text-botanik-orange text-[10px] font-bold uppercase tracking-widest rounded-full mb-6">{t.home.way.badge}</span>
          <h2 className="text-3xl md:text-6xl font-bold text-botanik-green mb-8 leading-tight">
            {t.home.way.title}
          </h2>
          <p className="text-lg md:text-xl text-botanik-green/60 leading-relaxed font-light">
            {t.home.way.description}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          <div className="bg-white p-8 md:p-10 rounded-[32px] md:rounded-[40px] border border-botanik-green/5 shadow-sm hover:border-botanik-orange transition-all duration-300 flex flex-col group">
            <h4 className="text-lg md:text-xl font-bold text-botanik-green mb-4">{t.home.way.discover.title}</h4>
            <p className="text-botanik-green/60 text-xs md:text-sm mb-6 md:mb-8 leading-relaxed flex-grow">
              {t.home.way.discover.description}
            </p>
            <button 
              onClick={() => onNavigate('manifeste')}
              className="flex items-center gap-2 text-botanik-orange font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] group-hover:gap-3 transition-all"
            >
              {t.home.way.discover.cta} <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="bg-white p-8 md:p-10 rounded-[32px] md:rounded-[40px] border border-botanik-green/5 shadow-sm hover:border-botanik-orange transition-all duration-300 flex flex-col group">
            <h4 className="text-lg md:text-xl font-bold text-botanik-green mb-4">{t.home.way.solution.title}</h4>
            <p className="text-botanik-green/60 text-xs md:text-sm mb-6 md:mb-8 leading-relaxed flex-grow">
              {t.home.way.solution.description}
            </p>
            <button 
              onClick={() => onNavigate('boutique')}
              className="flex items-center gap-2 text-botanik-orange font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] group-hover:gap-3 transition-all"
            >
              {t.home.way.solution.cta} <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="bg-white p-8 md:p-10 rounded-[32px] md:rounded-[40px] border border-botanik-green/5 shadow-sm hover:border-botanik-orange transition-all duration-300 flex flex-col group">
            <h4 className="text-lg md:text-xl font-bold text-botanik-green mb-4">{t.home.way.reset.title}</h4>
            <p className="text-botanik-green/60 text-xs md:text-sm mb-6 md:mb-8 leading-relaxed flex-grow">
              {t.home.way.reset.description}
            </p>
            <button 
              onClick={() => onNavigate('phytotherapie-reset')}
              className="flex items-center gap-2 text-botanik-orange font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] group-hover:gap-3 transition-all"
            >
              {t.home.way.reset.cta} <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="bg-white p-8 md:p-10 rounded-[32px] md:rounded-[40px] border border-botanik-green/5 shadow-sm hover:border-botanik-orange transition-all duration-300 flex flex-col group">
            <h4 className="text-lg md:text-xl font-bold text-botanik-green mb-4">{t.home.way.more.title}</h4>
            <p className="text-botanik-green/60 text-xs md:text-sm mb-6 md:mb-8 leading-relaxed flex-grow">
              {t.home.way.more.description}
            </p>
            <button 
              onClick={() => onNavigate('herbier')}
              className="flex items-center gap-2 text-botanik-orange font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] group-hover:gap-3 transition-all"
            >
              {t.home.way.more.cta} <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* BLOG HIGHLIGHTS - TARGETING NICHE QUERIES */}
      <section className="mt-32">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <span className="inline-block px-3 py-1 bg-botanik-orange/10 text-botanik-orange text-[10px] font-bold uppercase tracking-widest rounded-full mb-6">Le Blog du Totum</span>
            <h2 className="text-3xl md:text-5xl font-bold text-botanik-green mb-6 leading-tight">Extracteur Botanique & Infusion : Dernières Recherches</h2>
            <p className="text-lg text-botanik-green/60 font-light">
              Explorez nos dossiers de fond sur la science de l'extraction et la biophysique des plantes. 
              Pour approfondir, consultez les <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7074153/" target="_blank" rel="noopener noreferrer" className="text-botanik-orange underline underline-offset-4 decoration-1">études scientifiques sur les extraits botaniques</a>.
            </p>
          </div>
          <a href="https://blog.bloombybotanik.com/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-botanik-green font-bold group">
            Voir tout le blog <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { 
              title: "La Thermorégulation du Vivant", 
              desc: "Comment le contrôle précis de la température préserve l'intelligence moléculaire des extraits.",
              tag: "Science",
              url: "https://blog.bloombybotanik.com/thermoregulation-du-vivant-extraction-botanique/"
            },
            { 
              title: "Le Refroidisseur à Circulation", 
              desc: "L'importance du choc thermique contrôlé dans la stabilisation des terpènes fragiles.",
              tag: "Technique",
              url: "https://blog.bloombybotanik.com/refroidissement-stabilite-thermique-extraction-botanique/"
            },
            { 
              title: "L'Humidificateur Diffuseur", 
              desc: "Transformer votre atmosphère : pourquoi la diffusion ultrasonique respecte mieux le Totum.",
              tag: "Usage",
              url: "https://blog.bloombybotanik.com/humidificateur-diffuseur-rituel-botanique-interieur/"
            }
          ].map((post, i) => (
            <a 
              key={i}
              href={post.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white p-8 rounded-[32px] border border-botanik-green/5 hover:border-botanik-orange transition-all duration-300 group flex flex-col"
            >
              <span className="text-[10px] font-bold text-botanik-orange uppercase tracking-widest mb-4">{post.tag}</span>
              <h4 className="text-xl font-bold text-botanik-green mb-4 leading-snug group-hover:text-botanik-orange transition-colors">{post.title}</h4>
              <p className="text-botanik-green/60 text-sm leading-relaxed mb-8 flex-grow">{post.desc}</p>
              <div className="flex items-center gap-2 text-botanik-green font-bold text-xs uppercase tracking-widest">
                Lire l'article <ChevronRight className="w-4 h-4" />
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Featured Protocol Grid - Integrated as part of the flow */}
      <div className="mt-32">
        <div className="bg-botanik-green rounded-[40px] px-8 md:px-16 py-10 md:py-16 text-white overflow-hidden relative group">
          <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:scale-110 transition-transform duration-1000">
            <FlaskConical className="w-96 h-96 rotate-12" />
          </div>
          
          <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
            <div className="max-w-xl">
              <span className="inline-block px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-[10px] font-bold uppercase tracking-widest mb-6">{t.home.featured.badge}</span>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">{t.home.featured.title}</h2>
              <p className="text-white/80 text-base md:text-lg mb-10 leading-relaxed">
                {t.home.featured.description}
              </p>
              <button onClick={() => onNavigate('phytotherapie-reset')} className="px-10 py-5 bg-white text-botanik-green rounded-2xl font-bold flex items-center gap-3 hover:bg-[#F5F3EB] transition-colors shadow-2xl">
                {t.home.featured.cta} <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { id: 'respiration', title: t.home.featured.items.respiration.title, subtitle: t.home.featured.items.respiration.subtitle, detail: t.home.featured.items.respiration.detail, icon: Wind, color: "bg-[#E0F2FE] text-[#0369A1]", iconColor: "text-[#0369A1]" },
                { id: 'mouvement', title: t.home.featured.items.movement.title, subtitle: t.home.featured.items.movement.subtitle, detail: t.home.featured.items.movement.detail, icon: Waves, color: "bg-[#DCFCE7] text-[#15803D]", iconColor: "text-[#15803D]" },
                { id: 'sommeil', title: t.home.featured.items.sleep.title, subtitle: t.home.featured.items.sleep.subtitle, detail: t.home.featured.items.sleep.detail, icon: Moon, color: "bg-[#F3E8FF] text-[#7E22CE]", iconColor: "text-[#7E22CE]" },
                { id: 'alimentation', title: t.home.featured.items.nutrition.title, subtitle: t.home.featured.items.nutrition.subtitle, detail: t.home.featured.items.nutrition.detail, icon: Utensils, color: "bg-[#FEF9C3] text-[#854D0E]", iconColor: "text-[#854D0E]" }
              ].map((item, idx) => (
                <div 
                  key={idx} 
                  onClick={() => {
                    const detail = resetDetailsData.find(d => d.id === item.id);
                    if (detail) setSelectedResetDetail(detail);
                  }}
                  className={`${item.color} p-4 rounded-3xl relative overflow-hidden group/vignette transition-transform hover:-translate-y-1 cursor-pointer`}
                >
                  <div className="absolute top-2 right-2">
                    <div className="w-5 h-5 bg-white/50 rounded-full flex items-center justify-center">
                      <ChevronRight className="w-3 h-3 text-green-600" />
                    </div>
                  </div>
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center mb-4 shadow-sm">
                    <item.icon className={`w-5 h-5 ${item.iconColor}`} />
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="text-[13px] font-black leading-tight uppercase tracking-tight">{item.title}</h4>
                    <p className="text-[11px] font-bold opacity-90">{item.subtitle}</p>
                    <p className="text-[9px] opacity-70 mt-1">{item.detail}</p>
                  </div>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      const detail = resetDetailsData.find(d => d.id === item.id);
                      if (detail) setSelectedResetDetail(detail);
                    }}
                    className="mt-4 flex items-center gap-1 text-[10px] font-black uppercase tracking-widest opacity-80 group-hover/vignette:opacity-100"
                  >
                    {t.common.details} <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
