import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Language } from './translations';
import { OptimizedImage } from './components/OptimizedImage';
import { TooltipLexique } from './components/TooltipLexique';

const heroImg = "https://images.unsplash.com/photo-1512429234300-00810793630f?auto=format&fit=crop&w=1200&q=80";

export default function PillarAdaptogens({ lang, onNavigate }: { lang: Language, onNavigate: (v: any) => void }) {
  const isFR = lang === 'fr';
  const isDE = lang === 'de';

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
            alt={isFR ? "Plantes Adaptogènes" : isDE ? "Adaptogene Pflanzen" : "Adaptogenic Plants"} 
          />
        </div>
        
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1 bg-white/10 rounded-full text-xs font-bold uppercase tracking-widest mb-8 border border-white/10"
          >
            {isFR ? "Résilience & Équilibre Systémique" : isDE ? "Resilienz & Systemisches Gleichgewicht" : "Resilience & Systemic Balance"}
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black mb-8 font-sans tracking-tight leading-tight"
          >
            {isFR ? "Les Plantes Adaptogènes : " : isDE ? "Adaptogene Pflanzen: " : "Adaptogenic Plants: "}
            <br />
            <span className="text-botanik-orange">
              {isFR ? "Alliées du Stress Moderne" : isDE ? "Begleiter gegen modernen Stress" : "Allies Against Modern Stress"}
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-white/80 leading-relaxed mb-12 max-w-3xl mx-auto"
          >
            {isFR
              ? "Apprenez comment ces plantes exceptionnelles accompagnent la capacité d'adaptation de votre organisme face aux sollicitations du quotidien."
              : isDE
              ? "Erfahren Sie, wie diese besonderen Pflanzen den Organismus bei der Anpassung an alltägliche Belastungen unterstützen."
              : "Learn how these remarkable botanicals support your body's natural adaptability to environmental and everyday demands."}
          </motion.p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-24 space-y-24">
        <section className="prose prose-botanik max-w-none">
          <h2 className="text-3xl font-bold text-botanik-green mb-8 flex items-center gap-4">
            <span className="w-8 h-8 rounded-full bg-botanik-green text-white flex items-center justify-center text-sm font-black">01</span>
            {isFR ? "Qu'est-ce qu'une plante adaptogène ?" : isDE ? "Was ist eine adaptogene Pflanze?" : "What is an adaptogenic plant?"}
          </h2>
          <p className="text-lg leading-relaxed text-botanik-green/80">
            {isFR ? (
              <>
                Une plante <TooltipLexique terme="adaptogene">adaptogène</TooltipLexique> soutient la capacité globale du corps à s'adapter aux facteurs de stress et favorise l'équilibre physiologique (<TooltipLexique terme="homeostasie">homéostasie</TooltipLexique>) dans une approche de terrain non spécifique.
              </>
            ) : isDE ? (
              <>
                Eine <TooltipLexique terme="adaptogene">adaptogene</TooltipLexique> Pflanze unterstützt die allgemeine Anpassungsfähigkeit des Organismus an Stressfaktoren und fördert das innere Gleichgewicht (<TooltipLexique terme="homeostasie">Homöostase</TooltipLexique>).
              </>
            ) : (
              <>
                An <TooltipLexique terme="adaptogene">adaptogenic</TooltipLexique> plant supports the body's broad capacity to adapt to stressors, working across the whole terrain to encourage physiological balance (<TooltipLexique terme="homeostasie">homeostasis</TooltipLexique>).
              </>
            )}
          </p>
        </section>

        <section className="prose prose-botanik max-w-none">
          <h2 className="text-3xl font-bold text-botanik-green mb-8 flex items-center gap-4">
            <span className="w-8 h-8 rounded-full bg-botanik-green text-white flex items-center justify-center text-sm font-black">02</span>
            {isFR ? "Extraire le Totum des Adaptogènes" : isDE ? "Das Totum von Adaptogenen extrahieren" : "Extracting the Totum of Adaptogens"}
          </h2>
          <p className="text-lg leading-relaxed text-botanik-green/80">
            {isFR
              ? "Les plantes adaptogènes comme l'Ashwagandha, la Rhodiola ou le Ginseng sont souvent des racines denses ou des baies complexes. Une simple tisane ne suffit pas à traverser leurs parois cellulaires rigides : l'extraction de précision BloomLab permet de restituer fidèlement leur totum."
              : isDE
              ? "Adaptogene wie Ashwagandha, Rhodiola oder Ginseng bestehen meist aus dichten Wurzeln oder komplexen Beeren. Ein gewöhnlicher Teeaufguss löst ihre festen Zellwände kaum – die Präzisionsextraktion im BloomLab schließt ihr pflanzliches Totum gezielt auf."
              : "Adaptogenic plants like Ashwagandha, Rhodiola, or Ginseng are often dense roots or complex berries. A brief herbal tea rarely unlocks their tough cellular walls—BloomLab precision extraction captures their full botanical Totum."}
          </p>
        </section>

        <section className="text-center bg-[#F4F4F0] rounded-[60px] p-12 md:p-24 border border-botanik-green/5 shadow-inner">
          <h2 className="text-3xl md:text-5xl font-black text-botanik-green mb-8 tracking-tight">
            {isFR ? "Maîtrisez votre équilibre" : isDE ? "Meistern Sie Ihr Gleichgewicht" : "Master your daily balance"}
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