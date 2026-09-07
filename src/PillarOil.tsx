import React from 'react';
import { motion } from 'motion/react';
import { FlaskConical, Thermometer, Clock, Droplets, Leaf, ShieldCheck, ChevronRight, BookOpen, Activity, ArrowRight, Check, Compass, Waves } from 'lucide-react';
import { Language, translations } from './translations';
import { OptimizedImage } from './components/OptimizedImage';

const heroImg = "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80";

export default function PillarOil({ lang, onNavigate }: { lang: Language, onNavigate: (v: any) => void }) {
  const t = translations[lang];

  return (
    <div className="flex-1 bg-[#F9F9F7]">
      {/* Hero Section */}
      <section className="relative py-24 px-6 overflow-hidden bg-[#2D4F1E] text-white">
        <div className="absolute inset-0">
          <OptimizedImage 
            src={heroImg} 
            width={1200}
            height={800}
            className="w-full h-full object-cover opacity-30" 
            alt="Huile Infusée & Macérât" 
          />
        </div>
        
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1 bg-white/10 rounded-full text-xs font-bold uppercase tracking-widest mb-8 border border-white/10"
          >
            L'Or Végétal & Soin Profond
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black mb-8 font-sans tracking-tight leading-tight"
          >
            L'Huile Infusée : <br />
            <span className="text-botanik-orange">Concentré Liposoluble</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-white/80 leading-relaxed mb-12 max-w-3xl mx-auto"
          >
            Extraire les principes actifs huileux des plantes pour des soins cutanés et des remèdes de terrain d'une puissance inégalée.
          </motion.p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-24 space-y-24">
        <section className="prose prose-botanik max-w-none">
          <h2 className="text-3xl font-bold text-botanik-green mb-8 flex items-center gap-4">
            <span className="w-8 h-8 rounded-full bg-botanik-green text-white flex items-center justify-center text-sm font-black">01</span>
            Pourquoi l'Huile ?
          </h2>
          <p className="text-lg leading-relaxed text-botanik-green/80">
            Certaines molécules, comme les terpènes, les vitamines A, D, E et K, ou encore certains flavonoïdes, ne sont solubles que dans le gras. L'huile infusée permet de capturer ces "actifs lourds" que l'eau laisse derrière elle.
          </p>
        </section>

        <section className="prose prose-botanik max-w-none">
          <h2 className="text-3xl font-bold text-botanik-green mb-8 flex items-center gap-4">
            <span className="w-8 h-8 rounded-full bg-botanik-green text-white flex items-center justify-center text-sm font-black">02</span>
            Le BloomLab® et la Macération à Chaud
          </h2>
          <p className="text-lg leading-relaxed text-botanik-green/80">
            Oubliez la bouteille laissée au soleil pendant 40 jours (qui fait souvent rancir l'huile). Avec le BloomLab, vous réalisez un macérât de qualité professionnelle en quelques heures, grâce à une chaleur douce et constante qui accélère le transfert moléculaire sans oxyder les lipides.
          </p>
        </section>

        <section className="p-8 bg-white rounded-3xl border border-botanik-green/10 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1">
            <span className="text-xs font-black uppercase tracking-widest text-[#D97706]">Pilier Central du Cocoon</span>
            <h3 className="text-xl font-bold text-botanik-green">L'Extraction Botanique Globale</h3>
            <p className="text-sm text-botanik-green/70">
              L'huile capte les molécules liposolubles (Phase B). Pour combiner fractions aqueuses et lipidiques, découvrez notre guide pilier complet.
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
            Créez vos propres huiles de soin
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
