import React, { useState } from 'react';
import { ChevronRight, ShieldCheck, Zap, FlaskConical, Award, Star, Activity, ArrowRight, Check, Utensils, CheckCircle, X, Maximize2 } from 'lucide-react';
import bloomLabImg from './assets/images/bloomlab_main_1784887530345.jpeg';
import bloomSoinsImg from './assets/images/Bloom_Soins.jpg';
import fourMmImg from './assets/images/4MM.jpg';
import { motion, AnimatePresence } from 'motion/react';

import { translations, Language } from './translations';

export default function MachineLanding({ onNavigate, lang }: { onNavigate: (view: any) => void, lang: Language }) {
  const t = translations[lang].machine;
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);

  return (
    <div className="animate-in fade-in duration-700">
      {/* Fullscreen Image Overlay */}
      <AnimatePresence>
        {fullscreenImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setFullscreenImage(null)}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-12 cursor-zoom-out"
          >
            <button 
              onClick={() => setFullscreenImage(null)}
              className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
            <motion.img 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={fullscreenImage} 
              alt="Fullscreen view" 
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-[#293228]">
        <div className="absolute inset-0 opacity-20">
          <img 
            src={bloomLabImg} 
            alt={translations[lang].seo.alt.extracteur} 
            className="w-full h-full object-cover blur-sm" 
          />
        </div>
        <div className="container mx-auto px-6 relative z-10 py-24">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-[#F97316] px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-8 border border-white/10">
              <Zap className="w-4 h-4" /> {t.hero.badge}
            </div>
            <h1 className="text-4xl md:text-8xl font-bold text-white mb-8 leading-[0.9] tracking-tighter">
              {t.hero.title}<br />
              <span className="text-[#F97316]">{t.hero.title_accent}</span>
            </h1>
            <p className="text-base md:text-2xl text-white/70 mb-12 max-w-2xl leading-relaxed font-light whitespace-pre-wrap">
              {t.hero.description}
            </p>
            <div className="flex flex-wrap gap-6">
              <button 
                onClick={() => onNavigate('boutique')}
                className="px-10 py-5 bg-[#F97316] text-white rounded-2xl font-bold text-lg hover:bg-[#EA580C] transition-all shadow-2xl shadow-[#F97316]/20 flex items-center gap-3 group"
              >
                {t.hero.cta} <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={() => document.getElementById('details')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-10 py-5 bg-white/5 backdrop-blur-md text-white border border-white/20 rounded-2xl font-bold text-lg hover:bg-white/10 transition-all"
              >
                {t.hero.discover}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* What is the machine? (Section 2) */}
      <section id="details" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <span className="text-sm font-black uppercase tracking-[0.3em] text-[#F97316] mb-4 block italic">Ingénierie de la Vitalité</span>
              <h2 className="text-2xl md:text-6xl font-bold text-botanik-green mb-8 leading-tight">
                L'Extracteur Botanique <br /> de Précision N°1
              </h2>
              <div className="space-y-8">
                <p className="text-lg text-botanik-green/70 leading-relaxed">
                  Le <strong>BloomLab®</strong> n'est pas une simple machine à infusion. C'est un instrument de grade laboratoire conçu pour la <strong>thermorégulation intelligente</strong> et l'<strong>extraction du totum</strong> végétal. En maintenant une précision à ±0,5°C, il libère l'intelligence moléculaire des plantes pour un rééquilibrage de terrain profond et une biodisponibilité optimale.
                </p>
                <div className="grid sm:grid-cols-2 gap-8">
                  <div className="p-6 bg-[#F9F9F7] rounded-3xl border border-botanik-green/5">
                    <ShieldCheck className="w-10 h-10 text-botanik-green mb-4" />
                    <h4 className="font-bold text-botanik-green mb-2">Inox 304 Biocompatible</h4>
                    <p className="text-sm text-botanik-green/60">Une extraction sans perturbateurs endocriniens pour préserver votre homéostasie.</p>
                  </div>
                  <div className="p-6 bg-[#F9F9F7] rounded-3xl border border-botanik-green/5">
                    <Activity className="w-10 h-10 text-botanik-green mb-4" />
                    <h4 className="font-bold text-botanik-green mb-2">Contrôle Systémique</h4>
                    <p className="text-sm text-botanik-green/60">Agitation vortex et cinétique moléculaire pour un rendement de 98% des actifs.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-[#F97316]/5 rounded-[60px] blur-3xl"></div>
              <video 
                poster={bloomLabImg}
                autoPlay 
                loop 
                muted 
                playsInline
                title="BloomLab - Extracteur Botanique de Précision pour le Totum"
                className="relative rounded-[40px] shadow-2xl border border-botanik-green/5 w-full object-cover aspect-square bg-botanik-green/5" 
              >
                <source src="/demo_bloomlab.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </section>

      {/* Les 3 Niveaux d'Expertise (Move here after details) */}
      <section id="niveaux" className="py-24 bg-[#F9F9F7]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-sm font-black uppercase tracking-[0.3em] text-[#F97316] mb-4 block italic">Médecine des Systèmes</span>
            <h2 className="text-2xl md:text-6xl font-bold text-botanik-green mb-6">3 Niveaux de Souveraineté</h2>
            <p className="text-base md:text-xl text-botanik-green/60 max-w-2xl mx-auto">De l'usage culinaire à la pharmacie intérieure, BloomLab vous accompagne dans votre projet de soins sur mesure.</p>
          </div>

          <div className="space-y-12">
            {/* Niveau 1 */}
            <div className="grid lg:grid-cols-[1fr_450px] gap-12 items-center bg-white rounded-[60px] p-8 md:p-16 border border-botanik-green/5 shadow-sm hover:shadow-xl transition-all duration-700 group">
              <div>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-16 h-16 bg-[#F5F3EB] rounded-2xl flex items-center justify-center group-hover:bg-[#F97316]/10 transition-colors">
                    <Utensils className="w-8 h-8 text-[#F97316]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-[#F97316] mb-1">
                      <span>{t.levels.lvl1.badge}</span>
                      <span className="w-1 h-1 rounded-full bg-[#F97316]/40"></span>
                      <span>{t.levels.lvl1.status}</span>
                    </div>
                    <h2 className="text-2xl md:text-4xl font-bold text-botanik-green">{t.levels.lvl1.title}</h2>
                  </div>
                </div>
                <p className="text-lg text-botanik-green/70 mb-8 leading-relaxed italic">
                  {t.levels.lvl1.quote}
                </p>
                <div className="space-y-6 mb-10">
                  <p className="text-botanik-green/60 text-sm leading-relaxed">
                    {t.levels.lvl1.description}
                  </p>
                  <div className="bg-[#F5F3EB] p-8 rounded-3xl">
                    <h4 className="font-bold text-botanik-green mb-4">{t.levels.lvl1.learn_title}</h4>
                    <ul className="grid sm:grid-cols-2 gap-4">
                      <li className="flex items-center gap-3 text-sm font-medium text-botanik-green/80"><CheckCircle className="w-4 h-4 text-[#F97316]" /> {t.levels.lvl1.learn1}</li>
                      <li className="flex items-center gap-3 text-sm font-medium text-botanik-green/80"><CheckCircle className="w-4 h-4 text-[#F97316]" /> {t.levels.lvl1.learn2}</li>
                    </ul>
                  </div>
                </div>
                <button onClick={() => onNavigate('culinaire')} className="flex items-center gap-3 px-8 py-4 bg-botanik-green text-white rounded-2xl font-bold hover:bg-botanik-green/90 transition-all shadow-lg group">
                  {t.levels.lvl1.cta} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
              <div 
                className="relative aspect-square rounded-[40px] overflow-hidden bg-[#F5F3EB] hidden lg:block cursor-zoom-in group/img"
                onClick={() => setFullscreenImage("https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=800")}
              >
                <img src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" alt="Culinaire" />
                <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover/img:opacity-100">
                  <Maximize2 className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>

            {/* Niveau 2 */}
            <div className="grid lg:grid-cols-[450px_1fr] gap-12 items-center bg-white rounded-[60px] p-8 md:p-16 border border-botanik-green/5 shadow-sm hover:shadow-xl transition-all duration-700 group">
              <div 
                className="relative aspect-square rounded-[40px] overflow-hidden bg-[#F5F3EB] hidden lg:block cursor-zoom-in group/img"
                onClick={() => setFullscreenImage(bloomSoinsImg)}
              >
                <img src={bloomSoinsImg} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" alt="Cosmétique" />
                <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover/img:opacity-100">
                  <Maximize2 className="w-8 h-8 text-white" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-16 h-16 bg-[#F5F3EB] rounded-2xl flex items-center justify-center group-hover:bg-[#F97316]/10 transition-colors">
                    <FlaskConical className="w-8 h-8 text-[#F97316]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-[#F97316] mb-1">
                      <span>{t.levels.lvl2.badge}</span>
                      <span className="w-1 h-1 rounded-full bg-[#F97316]/40"></span>
                      <span>{t.levels.lvl2.status}</span>
                    </div>
                    <h2 className="text-2xl md:text-4xl font-bold text-botanik-green">{t.levels.lvl2.title}</h2>
                  </div>
                </div>
                <p className="text-lg text-botanik-green/70 mb-8 leading-relaxed italic">
                  {t.levels.lvl2.quote}
                </p>
                <div className="space-y-6 mb-10">
                  <p className="text-botanik-green/60 text-sm leading-relaxed">
                    {t.levels.lvl2.description}
                  </p>
                  <div className="bg-[#F5F3EB] p-8 rounded-3xl">
                    <h4 className="font-bold text-botanik-green mb-4">{t.levels.lvl2.learn_title}</h4>
                    <ul className="grid sm:grid-cols-2 gap-4">
                      <li className="flex items-center gap-3 text-sm font-medium text-botanik-green/80"><CheckCircle className="w-4 h-4 text-[#F97316]" /> {t.levels.lvl2.learn1}</li>
                      <li className="flex items-center gap-3 text-sm font-medium text-botanik-green/80"><CheckCircle className="w-4 h-4 text-[#F97316]" /> {t.levels.lvl2.learn2}</li>
                    </ul>
                  </div>
                </div>
                <button onClick={() => onNavigate('cosmetiques')} className="flex items-center gap-3 px-8 py-4 bg-botanik-green text-white rounded-2xl font-bold hover:bg-botanik-green/90 transition-all shadow-lg group">
                  {t.levels.lvl2.cta} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Niveau 3 */}
            <div className="grid lg:grid-cols-[1fr_450px] gap-12 items-center bg-white rounded-[60px] p-8 md:p-16 border border-[#F97316]/20 shadow-[0_20px_50px_rgba(249,115,22,0.05)] hover:shadow-2xl transition-all duration-700 group relative overflow-hidden">
              <div>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-16 h-16 bg-[#F97316]/10 rounded-2xl flex items-center justify-center group-hover:bg-[#F97316]/20 transition-colors">
                    <Activity className="w-8 h-8 text-[#F97316]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-[#F97316] mb-1">
                      <span>{t.levels.lvl3.badge}</span>
                      <span className="w-1 h-1 rounded-full bg-[#F97316]/40"></span>
                      <span>{t.levels.lvl3.status}</span>
                    </div>
                    <h2 className="text-2xl md:text-4xl font-bold text-botanik-green">{t.levels.lvl3.title}</h2>
                  </div>
                </div>
                <p className="text-lg text-botanik-green/70 mb-8 leading-relaxed italic">
                  {t.levels.lvl3.quote}
                </p>
                <div className="space-y-6 mb-10">
                  <p className="text-botanik-green/60 text-sm leading-relaxed">
                    {t.levels.lvl3.description}
                  </p>
                  <div className="bg-[#F9F9F7] p-8 rounded-3xl border border-[#F97316]/10">
                    <h4 className="font-bold text-botanik-green mb-4">{t.levels.lvl3.learn_title}</h4>
                    <ul className="grid sm:grid-cols-2 gap-4">
                      <li className="flex items-center gap-3 text-sm font-medium text-botanik-green/80"><CheckCircle className="w-4 h-4 text-[#F97316]" /> {t.levels.lvl3.learn1}</li>
                      <li className="flex items-center gap-3 text-sm font-medium text-botanik-green/80"><CheckCircle className="w-4 h-4 text-[#F97316]" /> {t.levels.lvl3.learn2}</li>
                    </ul>
                  </div>
                </div>
                <button onClick={() => onNavigate('library')} className="flex items-center gap-3 px-8 py-4 bg-[#F97316] text-white rounded-2xl font-bold hover:bg-[#EA580C] transition-all shadow-xl shadow-[#F97316]/20 group">
                  {t.levels.lvl3.cta} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
              <div 
                className="relative aspect-square rounded-[40px] overflow-hidden bg-[#F5F3EB] hidden lg:block cursor-zoom-in group/img"
                onClick={() => setFullscreenImage(fourMmImg)}
              >
                <img src={fourMmImg} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" alt="Expert" />
                <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover/img:opacity-100">
                  <Maximize2 className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section (From UsageLevels) */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-6xl font-bold text-botanik-green mb-6">{t.pricing.title}</h2>
            <p className="text-base md:text-xl text-botanik-green/60 max-w-2xl mx-auto">{t.pricing.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Bloom Découverte */}
            <div className="bg-[#F9F9F7] rounded-3xl p-8 border border-botanik-green/5 flex flex-col">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-botanik-green mb-1">{t.pricing.discovery.name}</h3>
                <p className="text-xs text-botanik-green/60 mb-4">{t.pricing.discovery.tagline}</p>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-4xl font-black text-botanik-green">{t.pricing.discovery.price}</span>
                  <span className="text-botanik-green/60 font-medium">{t.pricing.discovery.period}</span>
                </div>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {t.pricing.discovery.bullets.map((bullet: string, i: number) => (
                  <li key={i} className="flex items-start gap-3 text-xs leading-relaxed font-medium">
                    <CheckCircle className="w-4 h-4 text-[#F97316] shrink-0 mt-0.5" /> 
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
              <button onClick={() => onNavigate('boutique')} className="w-full py-4 bg-botanik-green text-white rounded-xl font-bold hover:bg-botanik-green/90 transition-all text-sm">{t.pricing.discovery.cta}</button>
            </div>

            {/* Bloom Méthode (Recommended) */}
            <div className="bg-botanik-green rounded-3xl p-8 border-4 border-[#F97316] flex flex-col relative transform lg:scale-110 shadow-2xl shadow-botanik-green/20 z-10">
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-[#F97316] text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest whitespace-nowrap">{t.pricing.method.badge}</div>
              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-1">{t.pricing.method.name}</h3>
                <p className="text-xs text-white/60 mb-4">{t.pricing.method.tagline}</p>
                <div className="flex items-baseline gap-1 mb-4 text-white">
                  <span className="text-4xl font-black">{t.pricing.method.price}</span>
                  <span className="opacity-60 font-medium">{t.pricing.method.period}</span>
                </div>
              </div>
              <ul className="space-y-3 mb-8 flex-1 text-white">
                {t.pricing.method.bullets.map((bullet: string, i: number) => (
                  <li key={i} className="flex items-start gap-3 text-xs leading-relaxed font-medium">
                    <CheckCircle className="w-4 h-4 text-[#F97316] shrink-0 mt-0.5" /> 
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
              <button onClick={() => onNavigate('boutique')} className="w-full py-4 bg-[#F97316] text-white rounded-xl font-bold hover:bg-[#EA580C] transition-all text-sm">{t.pricing.method.cta}</button>
            </div>

            {/* Bloom Méthode Annuel */}
            <div className="bg-[#F9F9F7] rounded-3xl p-8 border border-botanik-green/5 flex flex-col">
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-xl font-bold text-botanik-green">{t.pricing.annual.name}</h3>
                  <span className="bg-botanik-orange/10 text-botanik-orange text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">{t.pricing.annual.highlight}</span>
                </div>
                <p className="text-xs text-botanik-green/60 mb-4">{t.pricing.annual.tagline}</p>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-4xl font-black text-botanik-green">{t.pricing.annual.price}</span>
                  <span className="text-botanik-green/60 font-medium">{t.pricing.annual.period}</span>
                </div>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {t.pricing.annual.bullets.map((bullet: string, i: number) => (
                  <li key={i} className="flex items-start gap-3 text-xs leading-relaxed font-medium">
                    <CheckCircle className="w-4 h-4 text-[#F97316] shrink-0 mt-0.5" /> 
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
              <button onClick={() => onNavigate('boutique')} className="w-full py-4 bg-botanik-green text-white rounded-xl font-bold hover:bg-botanik-green/90 transition-all text-sm">{t.pricing.annual.cta}</button>
            </div>
          </div>
        </div>
      </section>

      {/* Comparative Section for SEO */}
      <section className="py-24 bg-[#F9F9F7]">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-botanik-green mb-6">BloomLab vs Autres Extracteurs Botaniques</h2>
            <p className="text-lg text-botanik-green/60">Pourquoi choisir la précision BloomLab face aux alternatives du marché ?</p>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white p-10 rounded-[40px] shadow-sm border border-botanik-green/5">
              <h3 className="text-2xl font-bold text-botanik-green mb-6">Comparatif Technique</h3>
              <p className="text-botanik-green/70 mb-8 leading-relaxed">
                Contrairement à des modèles comme le <strong>MagicalButter MB2e</strong> ou le <strong>ONGROK Botanical Extractor</strong>, le BloomLab® mise sur une précision thermique chirurgicale (±0,5°C). 
                Là où la plupart des machines grand public ont des variations de température importantes, BloomLab protège l'intelligence moléculaire (le Totum) de vos plantes.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-sm text-botanik-green/80"><CheckCircle className="w-5 h-5 text-[#F97316]" /> Inox 304 vs Plastique/Alu</li>
                <li className="flex items-center gap-3 text-sm text-botanik-green/80"><CheckCircle className="w-5 h-5 text-[#F97316]" /> Précision ±0,5°C vs ±5°C</li>
                <li className="flex items-center gap-3 text-sm text-botanik-green/80"><CheckCircle className="w-5 h-5 text-[#F97316]" /> Protocoles Totum 56 vs Modes Basiques</li>
              </ul>
            </div>
            <div className="bg-white p-10 rounded-[40px] shadow-sm border border-botanik-green/5">
              <h3 className="text-2xl font-bold text-botanik-green mb-6">L'Expertise Européenne</h3>
              <p className="text-botanik-green/70 mb-8 leading-relaxed">
                Face à des solutions comme <strong>Nebula Boost</strong> ou <strong>Ardent FX</strong>, BloomLab offre une approche globale combinant décarboxylation, infusion et macération dans un seul instrument certifié aux normes européennes les plus strictes.
              </p>
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center p-4 bg-botanik-green/5 rounded-2xl">
                  <span className="font-bold text-botanik-green">Souveraineté</span>
                  <span className="text-[#F97316] font-black">★★★</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-botanik-green/5 rounded-2xl">
                  <span className="font-bold text-botanik-green">Précision Thermique</span>
                  <span className="text-[#F97316] font-black">★★★</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-[#293228] text-white text-center">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-3xl md:text-7xl font-bold mb-8 leading-tight">{t.final_cta.title}</h2>
          <p className="text-lg md:text-xl text-white/60 mb-12 max-w-2xl mx-auto italic font-light">
            {t.final_cta.description}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button 
              onClick={() => onNavigate('boutique')}
              className="w-full sm:w-auto px-12 py-6 bg-[#F97316] text-white rounded-2xl font-bold text-xl hover:bg-[#EA580C] transition-all flex items-center justify-center gap-3"
            >
              {t.final_cta.button} <ChevronRight className="w-6 h-6" />
            </button>
            <button 
              onClick={() => onNavigate('guide')}
              className="w-full sm:w-auto px-12 py-6 bg-white/10 text-white rounded-2xl font-bold text-xl hover:bg-white/20 transition-all"
            >
              {t.final_cta.guide}
            </button>
          </div>
        </div>
      </section>

      {/* Why it exists (Moved here after final cta) */}
      <section className="py-24 bg-botanik-green text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#F97316]/10 rounded-full blur-[120px] -mr-48 -mt-48"></div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-6xl font-bold mb-12 leading-tight italic">{t.vision.quote}</h2>
            <p className="text-lg md:text-2xl text-white/80 mb-12 leading-relaxed font-light">
              {t.vision.p1}
            </p>
            <div className="space-y-6 text-left inline-block">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-[#F97316] flex items-center justify-center shrink-0 mt-1">
                  <Check className="w-5 h-5 text-white" />
                </div>
                <p className="text-lg text-white/90" dangerouslySetInnerHTML={{ __html: t.vision.check1 }}></p>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-[#F97316] flex items-center justify-center shrink-0 mt-1">
                  <Check className="w-5 h-5 text-white" />
                </div>
                <p className="text-lg text-white/90" dangerouslySetInnerHTML={{ __html: t.vision.check2 }}></p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
