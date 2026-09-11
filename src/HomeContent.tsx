import React, { useState, useEffect } from 'react';
import { Sparkles, Leaf, ShieldCheck, Award, User, ChevronRight, FlaskConical, BookOpen, ShoppingBag, ChefHat, Star, Wind, Waves, Moon, Utensils, X, ArrowRight, Activity, Settings, Check, HelpCircle, Mail } from 'lucide-react';
import bloomImg from './assets/images/bloomlab_main_1784887530345.jpeg';
import { motion, AnimatePresence } from 'motion/react';
import { VIEW_PATHS } from './types';

import img1 from './assets/images/BloomLab_rosemary_infusion.png';
import img3 from './assets/images/lab_detail_cleaned_1786616788618.jpg';
import img6 from './assets/images/extraction_precision_cleaned_1786616821723.jpg';
import img8 from './assets/images/8.png';
import img9 from './assets/images/home_lab_vibe_cleaned_1786616854146.jpg';

import { translations, Language } from './translations';
import { OptimizedImage } from './components/OptimizedImage';

interface HomeContentProps {
  onNavigate: (view: any, id?: string) => void;
  lang: Language;
}

export default function HomeContent({ onNavigate, lang }: HomeContentProps) {
  const t = translations[lang];
  const h = t.home2026;
  const isFR = lang === 'fr';

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-12 lg:py-24 animate-in fade-in slide-in-from-bottom-4 duration-1000 overflow-x-hidden">
      
      {/* 1. HERO - BENEFIT ORIENTED */}
      <section className="mb-24 md:mb-32 text-center max-w-4xl mx-auto px-4 relative">
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-botanik-orange/5 rounded-full blur-3xl -z-10" />
        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-botanik-green/5 rounded-full blur-3xl -z-10" />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-botanik-green/5 rounded-full mb-8 border border-botanik-green/10"
        >
          <Sparkles className="w-4 h-4 text-botanik-orange" />
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-botanik-green/60">
            {isFR ? "L'Expertise de l'Extraction 2026" : "2026 Extraction Expertise"}
          </span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl md:text-6xl font-extrabold text-botanik-green mb-8 leading-[1.1] tracking-tight"
        >
          {h.hero.h1}
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-xl text-botanik-green/80 font-light leading-relaxed max-w-2xl mx-auto mb-10"
        >
          {h.hero.subtitle}
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button 
            onClick={() => onNavigate('machine')}
            className="w-full sm:w-auto px-8 py-4 bg-[#0F261E] hover:bg-[#D97706] active:bg-[#D97706] text-white rounded-2xl font-bold transition-all flex items-center justify-center gap-2 shadow-xl shadow-black/10 cursor-pointer"
          >
            {h.hero.cta_primary} <ArrowRight className="w-4 h-4" />
          </button>
          <button 
            onClick={() => onNavigate('boutique')}
            className="w-full sm:w-auto px-8 py-4 bg-white text-botanik-green border border-botanik-green/10 rounded-2xl font-bold hover:bg-botanik-green/5 transition-all flex items-center justify-center gap-2"
          >
            {h.hero.cta_secondary}
          </button>
        </motion.div>
      </section>

      {/* 2. PROBLEM - THE WASTE */}
      <section className="mb-24 md:mb-32">
        <div className="bg-botanik-orange/5 rounded-[40px] md:rounded-[60px] p-8 md:p-16 border border-botanik-orange/10 relative overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="rounded-[32px] overflow-hidden shadow-2xl">
                <OptimizedImage 
                  src="/img/produit/bloomlab-cuisine-1200x630.jpg" 
                  className="w-full aspect-[4/3] object-cover" 
                  alt="BloomLab en cuisine d'apothicaire" 
                  priority={true}
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-white rounded-3xl shadow-xl flex items-center justify-center p-6 border border-botanik-orange/10">
                <X className="w-12 h-12 text-botanik-orange" />
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl md:text-5xl font-bold text-botanik-green mb-6 leading-tight">
                {h.problem.title}
              </h2>
              <p className="text-lg text-botanik-green/70 mb-8 font-light leading-relaxed">
                {h.problem.content}
              </p>
              <button 
                onClick={() => {
                  const el = document.getElementById('solution-section');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-botanik-orange font-bold flex items-center gap-2 hover:gap-3 transition-all"
              >
                {h.problem.cta} <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SOLUTION - THE PRECISION */}
      <section id="solution-section" className="mb-24 md:mb-32">
        <div className="bg-botanik-green rounded-[40px] md:rounded-[60px] p-8 md:p-16 text-white relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <OptimizedImage 
              src={img3} 
              className="w-full h-full object-cover opacity-10" 
              alt="BloomLab detail" 
            />
          </div>
          <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                {h.solution.title}
              </h2>
              <p className="text-lg text-white/70 mb-8 font-light leading-relaxed">
                {h.solution.content}
              </p>
              <div className="grid grid-cols-2 gap-6 mb-10">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center shrink-0">
                    <Check className="w-4 h-4 text-botanik-orange" />
                  </div>
                  <span className="text-sm font-medium text-white/90">{isFR ? "Inox 304 Certifié" : "Certified 304 Stainless"}</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center shrink-0">
                    <Check className="w-4 h-4 text-botanik-orange" />
                  </div>
                  <span className="text-sm font-medium text-white/90">{isFR ? "Précision ±0,5°C" : "±0.5°C Precision"}</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center shrink-0">
                    <Check className="w-4 h-4 text-botanik-orange" />
                  </div>
                  <span className="text-sm font-medium text-white/90">{isFR ? "Programmes Guidés" : "Guided Programs"}</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center shrink-0">
                    <Check className="w-4 h-4 text-botanik-orange" />
                  </div>
                  <span className="text-sm font-medium text-white/90">{isFR ? "Auto-Nettoyage" : "Self-Cleaning"}</span>
                </div>
              </div>
              <button 
                onClick={() => onNavigate('guide')}
                className="px-8 py-4 bg-white text-botanik-green rounded-2xl font-bold hover:bg-botanik-orange hover:text-white transition-all shadow-xl shadow-black/10 flex items-center gap-2"
              >
                {h.solution.cta} <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <div className="relative">
              <div className="rounded-[40px] overflow-hidden shadow-2xl border-4 border-white/10">
                <OptimizedImage 
                  src="/img/produit/bloomlab-face-1200x1200.jpg" 
                  className="w-full aspect-square object-cover" 
                  alt="Extracteur Botanique BloomLab" 
                />
              </div>
              <div className="absolute -top-6 -left-6 bg-botanik-orange text-white px-6 py-3 rounded-2xl font-bold shadow-xl rotate-[-5deg]">
                Totum {isFR ? "végétal révélé" : "plant totum revealed"}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. UNIVERSES - THE 3 DIMENSIONS */}
      <section className="mb-24 md:mb-32">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-botanik-green mb-6">
            {h.universes.title}
          </h2>
          <div className="h-px w-24 bg-botanik-orange/20 mx-auto" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              id: 'culinaire',
              title: h.universes.culinaire.title,
              desc: h.universes.culinaire.desc,
              cta: h.universes.culinaire.cta,
              icon: ChefHat,
              image: img1,
              color: "bg-[#F9F9F7]"
            },
            {
              id: 'cosmetique',
              title: h.universes.cosmetique.title,
              desc: h.universes.cosmetique.desc,
              cta: h.universes.cosmetique.cta,
              icon: Sparkles,
              image: img6,
              color: "bg-[#F7FBF7]"
            },
            {
              id: 'phytotherapie',
              title: h.universes.phytotherapie.title,
              desc: h.universes.phytotherapie.desc,
              cta: h.universes.phytotherapie.cta,
              icon: FlaskConical,
              image: img3,
              color: "bg-[#FFF9F2]"
            }
          ].map((universe) => (
            <motion.div 
              key={universe.id}
              whileHover={{ y: -8 }}
              className={`${universe.color} rounded-[40px] p-8 border border-botanik-green/5 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden flex flex-col h-full`}
            >
              <div className="relative h-48 mb-8 rounded-3xl overflow-hidden shadow-sm">
                <OptimizedImage 
                  src={universe.image} 
                  className="w-full h-full object-cover transition-transform duration-700" 
                  alt={universe.title} 
                />
                <div className="absolute top-4 left-4">
                  <div className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg">
                    <universe.icon className="w-5 h-5 text-botanik-green" />
                  </div>
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-botanik-green mb-4">{universe.title}</h3>
              <p className="text-botanik-green/60 mb-8 font-light leading-relaxed flex-grow">
                {universe.desc}
              </p>
              
              <button 
                onClick={() => {
                  const viewMap: any = { culinaire: 'culinaire', cosmetique: 'cosmetiques', phytotherapie: 'phytotherapie-reset' };
                  onNavigate(viewMap[universe.id]);
                }}
                className="w-full py-4 bg-[#0F261E] hover:bg-[#D97706] active:bg-[#D97706] text-white rounded-2xl font-bold transition-all flex items-center justify-center gap-2 group cursor-pointer"
              >
                {universe.cta} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 5. COMPARISON - THE TABLE */}
      <section className="mb-24 md:mb-32">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-botanik-green">
            {h.comparison.title}
          </h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full bg-white rounded-[32px] overflow-hidden border border-botanik-green/5 shadow-xl">
            <thead>
              <tr className="bg-botanik-green text-white">
                <th className="px-6 py-6 text-left font-bold">{h.comparison.headers[0]}</th>
                <th className="px-6 py-6 text-center font-bold">{h.comparison.headers[1]}</th>
                <th className="px-6 py-6 text-center font-bold bg-botanik-orange">{h.comparison.headers[2]}</th>
              </tr>
            </thead>
            <tbody>
              {h.comparison.rows.map((row: string[], idx: number) => (
                <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-botanik-green/5'}>
                  <td className="px-6 py-6 font-bold text-botanik-green">{row[0]}</td>
                  <td className="px-6 py-6 text-center text-botanik-green/60">{row[1]}</td>
                  <td className="px-6 py-6 text-center text-botanik-green font-bold border-x border-botanik-orange/10">{row[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 6. TESTIMONIALS - SOCIAL PROOF */}
      <section className="mb-24 md:mb-32">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-botanik-green">
            {h.testimonials.title}
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {h.testimonials.list.map((tst: any, idx: number) => (
            <div key={idx} className="bg-white p-10 rounded-[40px] border border-botanik-green/5 shadow-sm relative group hover:shadow-xl transition-all duration-500">
              <div className="flex gap-1 mb-6">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-4 h-4 fill-botanik-orange text-botanik-orange" />
                ))}
              </div>
              <p className="text-lg text-botanik-green/80 italic mb-8 leading-relaxed">
                "{tst.text}"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-botanik-green/5 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-botanik-green/40" />
                </div>
                <div>
                  <h4 className="font-bold text-botanik-green">{tst.name}</h4>
                  <p className="text-xs text-botanik-orange font-bold uppercase tracking-widest">{tst.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. OFFERS - THE PRICING */}
      <section className="mb-24 md:mb-32">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-botanik-green mb-6">
            {h.offers.title}
          </h2>
          <p className="text-lg text-botanik-green/60 font-light italic">
            {h.offers.mention}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Offer 1: Solo */}
          <div className="bg-white rounded-[40px] p-10 border-2 border-botanik-green/5 flex flex-col group hover:border-botanik-green transition-all duration-500">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h3 className="text-2xl font-bold text-botanik-green mb-2">{h.offers.solo.title}</h3>
                <span className="inline-block px-3 py-1 bg-botanik-green/5 text-botanik-green text-[10px] font-black uppercase tracking-widest rounded-full">{h.offers.solo.tag}</span>
              </div>
              <div className="text-3xl font-black text-botanik-green">{h.offers.solo.price}</div>
            </div>
            <p className="text-botanik-green/60 mb-8 flex-grow">
              {h.offers.solo.desc}
            </p>
            <button 
              onClick={() => onNavigate('product-detail', 'bloomlab')}
              className="w-full py-4 bg-[#0F261E] hover:bg-[#D97706] active:bg-[#D97706] text-white rounded-2xl font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <ShoppingBag className="w-5 h-5" /> {h.offers.solo.cta}
            </button>
          </div>
          
          {/* Offer 2: Signature */}
          <div className="bg-white rounded-[40px] p-10 border-2 border-botanik-orange flex flex-col relative group hover:shadow-2xl transition-all duration-500">
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-botanik-orange text-white px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest shadow-lg">
              {isFR ? "Recommandé" : "Recommended"}
            </div>
            <div className="flex justify-between items-start mb-8">
              <div>
                <h3 className="text-2xl font-bold text-botanik-green mb-2">{h.offers.signature.title}</h3>
                <span className="inline-block px-3 py-1 bg-botanik-orange/10 text-botanik-orange text-[10px] font-black uppercase tracking-widest rounded-full">{h.offers.signature.tag}</span>
              </div>
              <div className="text-3xl font-black text-botanik-green">{h.offers.signature.price}</div>
            </div>
            <p className="text-botanik-green/60 mb-8 flex-grow">
              {h.offers.signature.desc}
            </p>
            <button 
              onClick={() => onNavigate('product-detail', 'pack_signature')}
              className="w-full py-4 bg-[#0F261E] hover:bg-[#D97706] active:bg-[#D97706] text-white rounded-2xl font-bold transition-all flex items-center justify-center gap-2 shadow-xl shadow-black/10 cursor-pointer"
            >
              <ShoppingBag className="w-5 h-5" /> {h.offers.signature.cta}
            </button>
          </div>
        </div>
      </section>

      {/* 8. GUARANTEE & FAQ */}
      <section className="mb-24 md:mb-32">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <div className="bg-botanik-green/5 p-10 rounded-[40px] border border-botanik-green/10 mb-12 relative overflow-hidden">
              <Award className="w-24 h-24 text-botanik-green/5 absolute -top-4 -right-4 rotate-12" />
              <h2 className="text-3xl font-bold text-botanik-green mb-4">{h.guarantee_faq.title}</h2>
              <p className="text-xl text-botanik-green font-medium mb-6">{h.guarantee_faq.guarantee}</p>
              <div className="flex items-center gap-4 text-botanik-green/60">
                <ShieldCheck className="w-6 h-6 text-botanik-orange" />
                <span>{isFR ? "Garantie constructeur 1 an incluse" : (lang === 'de' ? "1 Jahr Herstellergarantie inklusive" : "1-year manufacturer warranty included")}</span>
              </div>
            </div>
            
            <div className="rounded-[40px] overflow-hidden shadow-2xl grayscale hover:grayscale-0 transition-all duration-700">
              <OptimizedImage src={img8} className="w-full aspect-video object-cover" alt="Souveraineté Sanitaire" />
            </div>
          </div>
          
          <div className="space-y-6">
            {h.guarantee_faq.faq.map((item: any, idx: number) => (
              <details key={idx} className="group bg-white rounded-3xl border border-botanik-green/5 shadow-sm overflow-hidden">
                <summary className="flex items-center justify-between p-8 cursor-pointer list-none">
                  <span className="text-lg font-bold text-botanik-green flex items-center gap-4">
                    <HelpCircle className="w-6 h-6 text-botanik-orange" />
                    {item.q}
                  </span>
                  <ChevronRight className="w-5 h-5 text-botanik-green/30 group-open:rotate-90 transition-transform" />
                </summary>
                <div className="px-8 pb-8 text-botanik-green/70 leading-relaxed font-light">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 9. NEWSLETTER - OPT-IN */}
      <section className="mb-12">
        <div className="bg-botanik-green rounded-[40px] md:rounded-[60px] p-8 md:p-20 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-botanik-orange/10 mix-blend-overlay opacity-20" />
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
          
          <div className="relative z-10 max-w-2xl mx-auto">
            <div className="w-20 h-20 bg-white/10 rounded-3xl flex items-center justify-center mx-auto mb-10 shadow-inner">
              <Mail className="w-10 h-10 text-botanik-orange" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              {h.newsletter.title}
            </h2>
            <p className="text-lg text-white/70 mb-10 font-light leading-relaxed">
              {h.newsletter.desc}
            </p>
            <form className="flex flex-col sm:flex-row gap-4" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder={isFR ? "Votre email..." : "Your email..."} 
                className="flex-grow px-8 py-5 bg-white/10 border border-white/20 rounded-2xl text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-botanik-orange transition-all"
                required
              />
              <button className="px-10 py-5 bg-botanik-orange text-white rounded-2xl font-bold hover:bg-[#1C3F34] hover:text-white transition-all shadow-xl shadow-black/20">
                {h.newsletter.cta}
              </button>
            </form>
            <p className="mt-6 text-[10px] text-white/40 uppercase tracking-[0.2em] font-medium">
              {isFR ? "Pas de spam. Désinscription en un clic." : "No spam. One-click unsubscribe."}
            </p>
          </div>
        </div>
      </section>
      
    </div>
  );
}
