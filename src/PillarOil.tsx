import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Language } from './translations';
import { OptimizedImage } from './components/OptimizedImage';

const heroImg = "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80";

export default function PillarOil({ lang, onNavigate }: { lang: Language, onNavigate: (v: any) => void }) {
  const isFR = lang === 'fr';
  const isDE = lang === 'de';

  return (
    <div className="flex-1 bg-[#F9F9F7]">
      {/* Hero Section */}
      <section className="relative py-24 px-6 overflow-hidden bg-[#2D4F1E] text-white">
        <div className="absolute inset-0">
          <OptimizedImage 
            src={heroImg} 
            className="w-full h-full object-cover opacity-30" 
            alt={isFR ? "Huile Infusée & Macérât" : isDE ? "Infusioniertes Öl & Mazerat" : "Infused Oil & Botanical Macerate"} 
          />
        </div>
        
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1 bg-white/10 rounded-full text-xs font-bold uppercase tracking-widest mb-8 border border-white/10"
          >
            {isFR ? "L'Or Végétal & Soin Profond" : isDE ? "Pflanzengold & Tiefenpflege" : "Liquid Plant Gold & Deep Care"}
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black mb-8 font-sans tracking-tight leading-tight"
          >
            {isFR ? "L'Huile Infusée : " : isDE ? "Infusioniertes Öl: " : "Botanical Infused Oil: "}
            <br />
            <span className="text-botanik-orange">
              {isFR ? "Concentré Liposoluble" : isDE ? "Fettlösliches Konzentrat" : "Lipophilic Concentrate"}
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-white/80 leading-relaxed mb-12 max-w-3xl mx-auto"
          >
            {isFR
              ? "Extraire les principes actifs huileux des plantes pour des soins cutanés et des préparations de terrain d'une pureté inégalée."
              : isDE
              ? "Gewinnen Sie fettlösliche Pflanzenstoffe für Hautpflege und botanische Zubereitungen von höchster Reinheit."
              : "Extract lipid-soluble plant compounds for homemade skincare and daily botanical preparations of unmatched purity."}
          </motion.p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-24 space-y-24">
        <section className="prose prose-botanik max-w-none">
          <h2 className="text-3xl font-bold text-botanik-green mb-8 flex items-center gap-4">
            <span className="w-8 h-8 rounded-full bg-botanik-green text-white flex items-center justify-center text-sm font-black">01</span>
            {isFR ? "Pourquoi l'Huile ?" : isDE ? "Warum Öl als Lösungsmittel?" : "Why Infused Oil?"}
          </h2>
          <p className="text-lg leading-relaxed text-botanik-green/80">
            {isFR
              ? "Certaines molécules, comme les terpènes, les vitamines A, D, E et K, ou encore certains flavonoïdes, ne sont solubles que dans le gras. L'huile infusée permet de capturer ces \"actifs lourds\" que l'eau laisse derrière elle."
              : isDE
              ? "Bestimmte Moleküle wie Terpene, die Vitamine A, D, E und K sowie lipophile Flavonoide sind ausschließlich fettlöslich. Durch eine präzise Ölmazeration werden genau diese Wirkstoffe gebunden, die reines Wasser zurücklässt."
              : "Certain molecules—such as terpenes, fat-soluble vitamins A, D, E, and K, and lipophilic flavonoids—only dissolve in lipids. Infused oil captures these rich compounds that water alone leaves behind."}
          </p>
        </section>

        <section className="prose prose-botanik max-w-none">
          <h2 className="text-3xl font-bold text-botanik-green mb-8 flex items-center gap-4">
            <span className="w-8 h-8 rounded-full bg-botanik-green text-white flex items-center justify-center text-sm font-black">02</span>
            {isFR ? "Le BloomLab® et la Macération à Chaud" : isDE ? "BloomLab® & kontrollierte Warmmazeration" : "BloomLab® & Controlled Warm Maceration"}
          </h2>
          <p className="text-lg leading-relaxed text-botanik-green/80">
            {isFR
              ? "Oubliez la bouteille laissée au soleil pendant 40 jours (qui fait souvent rancir l'huile). Avec la BloomLab, vous réalisez un macérât huileux maison en quelques heures, grâce à une chaleur douce et régulée."
              : isDE
              ? "Vergessen Sie das wochenlange Ziehenlassen in der Sonne, bei dem Öle oft ranzig werden. Mit BloomLab stellen Sie in wenigen Stunden ein hausgemachtes Ölmazerat bei sanfter, geregelter Wärme her."
              : "Forget leaving jars in the sun for 40 days where carrier oils often go rancid. With BloomLab®, you craft homemade oil macerates in just a few hours thanks to gentle, regulated warmth."}
          </p>
        </section>

        <section className="p-8 bg-white rounded-3xl border border-botanik-green/10 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1">
            <span className="text-xs font-black uppercase tracking-widest text-[#C8AB8A]">
              {isFR ? "Pilier Central du Cocoon" : isDE ? "Zentraler Leitfaden" : "Core Botanical Pillar"}
            </span>
            <h3 className="text-xl font-bold text-botanik-green">
              {isFR ? "L'Extraction Botanique Globale" : isDE ? "Umfassende Botanische Extraktion" : "Complete Botanical Extraction"}
            </h3>
            <p className="text-sm text-botanik-green/70">
              {isFR
                ? "L'huile capte les molécules liposolubles (Phase B). Pour combiner fractions aqueuses et lipidiques, découvrez notre guide pilier complet."
                : isDE
                ? "Öl bindet fettlösliche Moleküle (Phase B). Erfahren Sie in unserem Hauptleitfaden, wie Sie wässrige und ölige Auszüge kombinieren."
                : "Oil captures lipid-soluble molecules (Phase B). To combine aqueous and lipid fractions, explore our complete pillar guide."}
            </p>
          </div>
          <button
            onClick={() => onNavigate('extraction-botanique')}
            className="px-6 py-3 rounded-xl bg-botanik-green text-white font-bold text-xs hover:bg-[#C8AB8A] transition-all flex-shrink-0 cursor-pointer flex items-center gap-2"
          >
            <span>{isFR ? "Consulter le Guide Pilier" : isDE ? "Hauptleitfaden ansehen" : "Read the Pillar Guide"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </section>

        <section className="text-center bg-[#F4F4F0] rounded-[60px] p-12 md:p-24 border border-botanik-green/5 shadow-inner">
          <h2 className="text-3xl md:text-5xl font-black text-botanik-green mb-8 tracking-tight">
            {isFR ? "Créez vos propres huiles de soin" : isDE ? "Kreieren Sie Ihre eigenen Pflegeöle" : "Craft your own botanical care oils"}
          </h2>
          <button 
            onClick={() => onNavigate('machine')}
            className="px-12 py-5 bg-[#3E4A3D] hover:bg-[#C8AB8A] active:bg-[#C8AB8A] text-white hover:text-[#0F261E] rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-2xl shadow-black/10 inline-flex items-center gap-3 group cursor-pointer"
          >
            {isFR ? "Découvrir la BloomLab" : isDE ? "BloomLab entdecken" : "Discover BloomLab"}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </section>
      </div>
    </div>
  );
}
