import React from 'react';
import { motion } from 'motion/react';
import { FlaskConical, Thermometer, Clock, Droplets, Leaf, ShieldCheck, ChevronRight, BookOpen, Activity, ArrowRight, Check, Compass, Waves, Zap } from 'lucide-react';
import { Language, translations } from './translations';
import { OptimizedImage } from './components/OptimizedImage';

const heroImg = "https://images.unsplash.com/photo-1512429234300-00810793630f?auto=format&fit=crop&w=1200&q=80";

export default function PillarAdaptogens({ lang, onNavigate }: { lang: Language, onNavigate: (v: any) => void }) {
  const t = translations[lang];

  return (
    <div className="flex-1 bg-[#F9F9F7]">
      {/* Hero Section */}
      <section className="relative py-24 px-6 overflow-hidden bg-[#3F1C2D] text-white">
        <div className="absolute inset-0">
          <OptimizedImage 
            src={heroImg} 
            width={1200}
            height={800}
            className="w-full h-full object-cover opacity-30" 
            alt="Plantes Adaptogènes" 
          />
        </div>
        
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1 bg-white/10 rounded-full text-xs font-bold uppercase tracking-widest mb-8 border border-white/10"
          >
            Résilience & Équilibre Systémique
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black mb-8 font-sans tracking-tight leading-tight"
          >
            Les Plantes Adaptogènes : <br />
            <span className="text-botanik-orange">Alliées du Stress Moderne</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-white/80 leading-relaxed mb-12 max-w-3xl mx-auto"
          >
            Apprenez comment ces plantes exceptionnelles aident votre corps à s'adapter aux agressions environnementales et émotionnelles.
          </motion.p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-24 space-y-24">
        <section className="prose prose-botanik max-w-none">
          <h2 className="text-3xl font-bold text-botanik-green mb-8 flex items-center gap-4">
            <span className="w-8 h-8 rounded-full bg-botanik-green text-white flex items-center justify-center text-sm font-black">01</span>
            Qu'est-ce qu'une plante adaptogène ?
          </h2>
          <p className="text-lg leading-relaxed text-botanik-green/80">
            Une plante adaptogène augmente la capacité du corps à s'adapter à des facteurs de stress et à favoriser la survie. Elle n'agit pas sur un symptôme précis, mais sur l'ensemble du système pour ramener l'équilibre (homéostasie).
          </p>
        </section>

        <section className="prose prose-botanik max-w-none">
          <h2 className="text-3xl font-bold text-botanik-green mb-8 flex items-center gap-4">
            <span className="w-8 h-8 rounded-full bg-botanik-green text-white flex items-center justify-center text-sm font-black">02</span>
            Extraire le Totum des Adaptogènes
          </h2>
          <p className="text-lg leading-relaxed text-botanik-green/80">
            Les plantes adaptogènes comme l'Ashwagandha, le Rhodiola ou le Ginseng sont souvent des racines denses ou des baies complexes. Une simple tisane est souvent incapable de briser leurs parois cellulaires rigides pour libérer les adaptogènes (complexes moléculaires). L'extraction de précision BloomLab est ici indispensable pour obtenir un remède réellement efficace.
          </p>
        </section>

        <section className="text-center bg-[#F4F4F0] rounded-[60px] p-12 md:p-24 border border-botanik-green/5 shadow-inner">
          <h2 className="text-3xl md:text-5xl font-black text-botanik-green mb-8 tracking-tight">
            Maîtrisez votre équilibre
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
