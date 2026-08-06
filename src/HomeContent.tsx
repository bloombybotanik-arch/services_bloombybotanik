import React, { useState } from 'react';
import { Sparkles, Leaf, ShieldCheck, Award, User, ChevronRight, FlaskConical, BookOpen, ShoppingBag, ChefHat, Star, Wind, Waves, Moon, Utensils, X, ArrowRight } from 'lucide-react';
import bloomImg from './assets/images/bloomlab_main_1784887530345.jpeg';
import { resetDetailsData, ResetSectionDetail } from './data/resetDetails';
import { motion, AnimatePresence } from 'motion/react';

import { translations, Language } from './translations';

import { OptimizedImage } from './components/OptimizedImage';

interface HomeContentProps {
  onNavigate: (view: any) => void;
  lang: Language;
}

const ResetDetailModal: React.FC<{ 
  detail: ResetSectionDetail; 
  onClose: () => void;
  onNavigate: (view: any) => void;
  lang: Language;
}> = ({ detail, onClose, onNavigate, lang }) => {
  const t = translations[lang];
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-botanik-green/80 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="bg-[#F9F9F7] w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[40px] shadow-2xl relative"
        onClick={e => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white flex items-center justify-center text-botanik-green hover:bg-botanik-orange hover:text-white transition-all shadow-sm z-10"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-8 md:p-16">
          <div className="mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-botanik-green mb-6 leading-tight">
              {detail.translations?.[lang]?.title || detail.title}
            </h2>
            <div className="p-6 bg-botanik-orange/5 rounded-3xl border border-botanik-orange/10">
              <p className="text-botanik-green font-medium leading-relaxed italic">
                {detail.translations?.[lang]?.objective || detail.objective}
              </p>
            </div>
          </div>

          <div className="space-y-12">
            {detail.sections.map((section, sIdx) => (
              <div key={section.id} className="relative pl-8 border-l-2 border-botanik-orange/20">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-botanik-orange shadow-sm shadow-botanik-orange/20" />
                <h3 className="text-xl font-bold text-botanik-green mb-6">
                  {detail.translations?.[lang]?.sections?.[sIdx]?.title || section.title}
                </h3>
                <div className="space-y-4">
                  {(detail.translations?.[lang]?.sections?.[sIdx]?.content || section.content).map((p: string, idx: number) => (
                    <p key={idx} className="text-botanik-green/70 leading-relaxed">
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 pt-12 border-t border-botanik-green/10">
            <div className="bg-botanik-green p-8 md:p-12 rounded-[40px] text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <Sparkles className="w-32 h-32" />
              </div>
              <div className="relative z-10">
                <h4 className="text-2xl font-bold mb-4">{detail.translations?.[lang]?.cta?.label || detail.cta.label}</h4>
                <p className="text-white/70 mb-8 max-w-xl">
                  {detail.translations?.[lang]?.cta?.description || detail.cta.description}
                </p>
                <button 
                  onClick={() => {
                    const view = detail.id === 'alimentation' ? 'culinaire' : 'phytotherapie-reset';
                    onNavigate(view);
                    onClose();
                  }}
                  className="px-8 py-4 bg-botanik-orange text-white rounded-2xl font-bold flex items-center gap-2 hover:scale-105 transition-all shadow-xl shadow-botanik-orange/20"
                >
                  {t.common.start_now} <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function HomeContent({ onNavigate, lang }: HomeContentProps) {
  const [selectedResetDetail, setSelectedResetDetail] = useState<ResetSectionDetail | null>(null);
  const t = translations[lang];

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-12 lg:py-24 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      
      <AnimatePresence>
        {selectedResetDetail && (
          <ResetDetailModal 
            detail={selectedResetDetail} 
            onClose={() => setSelectedResetDetail(null)} 
            onNavigate={onNavigate}
            lang={lang}
          />
        )}
      </AnimatePresence>

      {/* PAGE 1 — COMMENCER ICI */}
      <section id="protocole" className="mb-24 md:mb-32 scroll-mt-24">
        <div className="bg-white rounded-[40px] md:rounded-[60px] p-6 md:p-12 lg:p-16 border border-botanik-green/5 shadow-2xl mb-16 md:mb-24 overflow-hidden relative group">
          <div className="absolute top-0 right-0 w-48 md:w-64 h-48 md:h-64 bg-botanik-orange/5 rounded-bl-full -z-0" />
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-20 items-center relative z-10">
            <div className="max-w-xl">
              <div className="flex gap-4 text-[10px] font-black text-botanik-green/40 uppercase tracking-[0.3em] items-center mb-8">
                <span>{t.home.hero.intro}</span>
                <span className="w-1 h-1 rounded-full bg-botanik-green/20" />
                <span>{t.home.hero.onboarding}</span>
              </div>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-botanik-green mb-6 md:mb-8 leading-[1.1]">
                {t.home.hero.title}
              </h1>
              <p className="text-base md:text-lg lg:text-xl text-botanik-green/60 leading-relaxed font-light">
                {t.home.hero.description}
              </p>
            </div>
            <div className="relative aspect-square rounded-[32px] md:rounded-[40px] overflow-hidden border-4 md:border-8 border-white shadow-2xl transition-transform duration-700 group-hover:scale-[1.02]">
              <OptimizedImage 
                src={bloomImg} 
                priority={true} 
                width={500}
                height={500}
                className="w-full h-full object-cover" 
                alt="BloomLab - Extraction de précision" 
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
              onClick={() => onNavigate('chat')}
              className="flex items-center gap-2 text-botanik-orange font-bold text-sm uppercase tracking-widest hover:gap-3 transition-all"
            >
              {t.home.cards.start.cta} <ChevronRight className="w-4 h-4" />
            </button>
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
