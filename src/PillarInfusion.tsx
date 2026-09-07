import React from 'react';
import { motion } from 'motion/react';
import { FlaskConical, Thermometer, Clock, Droplets, Leaf, ShieldCheck, ChevronRight, BookOpen, Activity, ArrowRight, Check, Compass, Waves } from 'lucide-react';
import { Language, translations } from './translations';
import { OptimizedImage } from './components/OptimizedImage';

const heroImg = "https://images.unsplash.com/photo-1594631252845-29fc4586d56c?auto=format&fit=crop&w=1200&q=80";

export default function PillarInfusion({ lang, onNavigate }: { lang: Language, onNavigate: (v: any) => void }) {
  const t = translations[lang];

  return (
    <div className="flex-1 bg-[#F9F9F7]">
      {/* Hero Section */}
      <section className="relative py-24 px-6 overflow-hidden bg-[#1C3F34] text-white">
        <div className="absolute inset-0">
          <OptimizedImage 
            src={heroImg} 
            width={1200}
            height={800}
            className="w-full h-full object-cover opacity-30" 
            alt="Infusion Botanique" 
          />
        </div>
        
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1 bg-white/10 rounded-full text-xs font-bold uppercase tracking-widest mb-8 border border-white/10"
          >
            L'Art de l'Eau & Vitalité
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black mb-8 font-sans tracking-tight leading-tight"
          >
            L'Infusion Botanique : <br />
            <span className="text-botanik-orange">Au-delà de la Simple Tisane</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-white/80 leading-relaxed mb-12 max-w-3xl mx-auto"
          >
            Découvrez comment l'eau, solvant de la vie, peut devenir le vecteur d'une médecine douce mais puissante.
          </motion.p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-24 space-y-24">
        <section className="prose prose-botanik max-w-none">
          <h2 className="text-3xl font-bold text-botanik-green mb-8 flex items-center gap-4">
            <span className="w-8 h-8 rounded-full bg-botanik-green text-white flex items-center justify-center text-sm font-black">01</span>
            L'Eau, Solvant de Précision
          </h2>
          <p className="text-lg leading-relaxed text-botanik-green/80">
            L'eau est le solvant le plus utilisé en phytothérapie, capable d'extraire les sels minéraux, les mucilages et les composés hydrosolubles. Cependant, la température de l'eau est cruciale. Trop chaude, elle détruit ; trop froide, elle n'extrait rien.
          </p>
        </section>

        <section className="prose prose-botanik max-w-none">
          <h2 className="text-3xl font-bold text-botanik-green mb-8 flex items-center gap-4">
            <span className="w-8 h-8 rounded-full bg-botanik-green text-white flex items-center justify-center text-sm font-black">02</span>
            Le Protocole BloomLab® pour l'Infusion
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
            <div className="bg-white p-8 rounded-3xl border border-botanik-green/10 shadow-sm">
              <h3 className="font-bold text-xl mb-4">Thermostat Constant</h3>
              <p className="text-sm">Maintenir une température stable de 45°C pour les fleurs fragiles comme la Camomille ou le Calendula.</p>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-botanik-green/10 shadow-sm">
              <h3 className="font-bold text-xl mb-4">Vortex Moléculaire</h3>
              <p className="text-sm">L'agitation empêche la formation d'une zone de saturation autour des plantes.</p>
            </div>
          </div>
        </section>

        <section className="p-8 bg-white rounded-3xl border border-botanik-green/10 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1">
            <span className="text-xs font-black uppercase tracking-widest text-[#D97706]">Pilier Central du Cocoon</span>
            <h3 className="text-xl font-bold text-botanik-green">L'Extraction Botanique Séquentielle</h3>
            <p className="text-sm text-botanik-green/70">
              L'infusion aqueuse constitue la Phase A. Découvrez comment capturer le totum végétal intégral dans notre guide pilier complet.
            </p>
          </div>
          <button
            onClick={() => onNavigate('extraction-botanique')}
            className="px-6 py-3 rounded-xl bg-botanik-green text-white font-bold text-xs hover:bg-[#D97706] transition-all flex-shrink-0 cursor-pointer flex items-center gap-2"
          >
            <span>Consulter le Guide Pilier</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </section>

        <section className="text-center bg-[#F4F4F0] rounded-[60px] p-12 md:p-24 border border-botanik-green/5 shadow-inner">
          <h2 className="text-3xl md:text-5xl font-black text-botanik-green mb-8 tracking-tight">
            Prêt à infuser avec précision ?
          </h2>
          <button 
            onClick={() => onNavigate('machine')}
            className="px-12 py-5 bg-[#0F261E] hover:bg-[#D97706] active:bg-[#D97706] text-white rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-2xl shadow-black/10 inline-flex items-center gap-3 group cursor-pointer"
          >
            Découvrir la BloomLab
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </section>
      </div>
    </div>
  );
}
