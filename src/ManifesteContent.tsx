import React from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Quote, Leaf, Activity, FlaskConical, HeartPulse } from 'lucide-react';
import { translations, Language } from './translations';

interface ManifesteContentProps {
  onBack: () => void;
  lang: Language;
}

export default function ManifesteContent({ onBack, lang }: ManifesteContentProps) {
  const t = translations[lang].manifesto;

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-[#1B3022]">
      {/* Navigation Sticky */}
      <div className="sticky top-0 z-30 bg-[#FDFCFB]/80 backdrop-blur-md border-b border-botanik-green/5">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-botanik-green/40 hover:text-botanik-green transition-colors group"
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            {t.nav.back}
          </button>
          <div className="text-[10px] font-black uppercase tracking-[0.3em] text-botanik-orange">
            {t.nav.title}
          </div>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-6 py-20 md:py-32">
        {/* Intro Section */}
        <motion.header 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-24 md:mb-32"
        >
          <span className="inline-block px-3 py-1 bg-botanik-orange/10 text-botanik-orange text-[10px] font-black uppercase tracking-widest rounded-full mb-8">
            {t.hero.badge}
          </span>
          <h1 className="text-4xl md:text-7xl lg:text-8xl font-bold text-botanik-green mb-12 leading-[0.9] tracking-tighter">
            {t.hero.title}<br/>
            <span className="text-botanik-orange">{t.hero.title_accent}</span>
          </h1>
          <div className="text-lg md:text-2xl text-botanik-green/70 leading-relaxed font-light italic border-l-4 border-botanik-orange pl-8 py-4">
            "{t.hero.quote}"
          </div>
        </motion.header>

        {/* Content Flow */}
        <div className="space-y-32">
          {/* Section 1: La Troisième Voie */}
          <section className="grid lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-4">
              <h2 className="text-2xl font-bold text-botanik-green sticky top-24 uppercase tracking-wider">{t.section1.title}</h2>
            </div>
            <div className="lg:col-span-8 text-lg text-botanik-green/80 leading-relaxed space-y-6">
              <p>
                {t.section1.p1}
              </p>
              <p>
                {t.section1.p2}
              </p>
              <div className="p-8 bg-[#F5F3EB] rounded-3xl border border-botanik-green/5 my-8">
                <p className="text-base italic">
                  {t.section1.box}
                </p>
              </div>
            </div>
          </section>

          {/* Section 2: Comprendre le Signal */}
          <section className="grid lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-4">
              <h2 className="text-2xl font-bold text-botanik-green sticky top-24 uppercase tracking-wider">{t.section2.title}</h2>
            </div>
            <div className="lg:col-span-8 text-lg text-botanik-green/80 leading-relaxed space-y-6">
              <p>
                {t.section2.p1}
              </p>
              <p className="text-2xl text-botanik-green font-medium leading-tight">
                {t.section2.p2}
              </p>
            </div>
          </section>

          {/* Section 3: L'Intelligence de l'Extraction */}
          <section className="bg-botanik-green text-white p-12 md:p-20 rounded-[60px] -mx-4 md:-mx-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
              <Leaf className="w-64 h-64 rotate-12" />
            </div>
            <div className="max-w-3xl mx-auto relative z-10">
              <Quote className="w-12 h-12 text-botanik-orange mb-8 opacity-50" />
              <h2 className="text-2xl md:text-5xl font-bold mb-12">{t.section3.title}</h2>
              <div className="text-base md:text-xl text-white/80 leading-relaxed space-y-8">
                <p>
                  {t.section3.p1}
                </p>
                <p className="p-8 border border-white/20 rounded-3xl bg-white/5 backdrop-blur-sm">
                  {t.section3.box}
                </p>
              </div>
            </div>
          </section>

          {/* Section 4: BloomLab & Séquençage Actif */}
          <section className="grid lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-4">
              <h2 className="text-2xl font-bold text-botanik-green sticky top-24 uppercase tracking-wider">{t.section4.title}</h2>
            </div>
            <div className="lg:col-span-8 text-lg text-botanik-green/80 leading-relaxed space-y-8">
              <p>
                {t.section4.p1}
              </p>
              
              <div className="space-y-6 mt-12">
                <div className="p-8 bg-[#F9F9F7] rounded-[40px] border border-botanik-green/5 relative group hover:bg-white hover:shadow-2xl transition-all duration-500">
                  <div className="w-12 h-12 bg-botanik-green text-white rounded-2xl flex items-center justify-center font-bold mb-6 text-xl shadow-lg">A</div>
                  <h4 className="text-xl font-bold text-botanik-green mb-4">{t.section4.phaseA.title}</h4>
                  <p className="text-base text-botanik-green/70 leading-relaxed">
                    {t.section4.phaseA.description}
                  </p>
                </div>
                <div className="p-8 bg-[#F9F9F7] rounded-[40px] border border-botanik-green/5 relative group hover:bg-white hover:shadow-2xl transition-all duration-500">
                  <div className="w-12 h-12 bg-botanik-orange text-white rounded-2xl flex items-center justify-center font-bold mb-6 text-xl shadow-lg">B</div>
                  <h4 className="text-xl font-bold text-botanik-green mb-4">{t.section4.phaseB.title}</h4>
                  <p className="text-base text-botanik-green/70 leading-relaxed">
                    {t.section4.phaseB.description}
                  </p>
                </div>
              </div>

              <p className="p-6 bg-botanik-orange/5 rounded-2xl text-sm text-botanik-green/60 italic border-l-4 border-botanik-orange">
                {t.section4.footer}
              </p>
            </div>
          </section>

          {/* Section 5: Distinguer Bloom */}
          <section className="bg-botanik-green/5 p-12 md:p-20 rounded-[60px] relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none">
              <FlaskConical className="w-[500px] h-[500px]" />
            </div>
            <div className="max-w-3xl mx-auto relative z-10">
              <h2 className="text-2xl md:text-4xl font-bold text-botanik-green mb-10">{t.section5.title}</h2>
              <div className="text-base md:text-lg text-botanik-green/80 leading-relaxed space-y-6">
                <p>
                  {t.section5.p1}
                </p>
                <p>
                  {t.section5.p2}
                </p>
              </div>
            </div>
          </section>

          {/* Section 6: Architecture vs Produits */}
          <section className="grid lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-4">
              <h2 className="text-2xl font-bold text-botanik-green sticky top-24 uppercase tracking-wider">{t.section6.title}</h2>
            </div>
            <div className="lg:col-span-8 text-base md:text-lg text-botanik-green/80 leading-relaxed space-y-8">
              <p>
                {t.section6.p1}
              </p>
              <p className="text-xl md:text-2xl text-botanik-green font-bold leading-tight">
                {t.section6.p2}
              </p>
            </div>
          </section>

          {/* Section 7: Conclusion / Mission */}
          <section className="text-center py-20">
            <div className="inline-flex p-6 bg-botanik-orange/5 rounded-full mb-12 animate-pulse">
              <Activity className="w-16 h-16 text-botanik-orange" />
            </div>
            <h2 className="text-3xl md:text-6xl font-bold text-botanik-green mb-12 tracking-tight">{t.section7.title}</h2>
            <div className="max-w-3xl mx-auto text-base md:text-lg text-botanik-green/70 space-y-8 leading-relaxed">
              <p>
                {t.section7.p1}
              </p>
              <div className="p-12 bg-botanik-green text-white rounded-[40px] shadow-2xl">
                <p className="text-xl md:text-3xl font-bold leading-tight">
                  {t.section7.box}
                </p>
              </div>
            </div>
          </section>
        </div>
      </article>

      {/* Final CTA */}
      <section className="bg-[#1B3022] py-32 text-center text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] opacity-10"></div>
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <span className="text-botanik-orange text-[10px] font-black uppercase tracking-[0.4em] mb-8 block">{t.cta.badge}</span>
          <h3 className="text-3xl md:text-6xl font-bold mb-12">{t.cta.title}</h3>
          <div className="flex flex-wrap justify-center gap-6">
            <button 
              onClick={onBack}
              className="px-12 py-6 bg-botanik-orange text-white rounded-2xl font-bold hover:bg-[#F97316] transition-all shadow-xl inline-flex items-center gap-3 group text-lg"
            >
              {t.cta.button} <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
