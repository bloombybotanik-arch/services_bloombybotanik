import React from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Quote, Leaf, Activity, FlaskConical, HeartPulse } from 'lucide-react';
import { translations, Language } from './translations';

interface ManifesteContentProps {
  onBack: () => void;
  lang: Language;
}

export default function ManifesteContent({ onBack, lang }: ManifesteContentProps) {
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
            {lang === 'fr' ? 'Retour' : 'Back'}
          </button>
          <div className="text-[10px] font-black uppercase tracking-[0.3em] text-botanik-orange">
            {lang === 'fr' ? 'Manifeste' : 'Manifesto'}
          </div>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-6 py-20 md:py-32">
        <motion.header 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-24"
        >
          <h1 className="text-4xl md:text-6xl font-black text-botanik-green mb-12 leading-tight tracking-tight">
            Manifeste Bloom by BotaniK
          </h1>
          <p className="text-2xl md:text-3xl text-botanik-orange font-bold leading-tight mb-12">
            Le corps ne vous trahit pas. Il vous informe.
          </p>
          <div className="space-y-6 text-lg text-botanik-green/80 leading-relaxed">
            <p>Nous vivons souvent avec l’idée que notre corps devrait fonctionner sans bruit, sans fatigue, sans tension et sans déséquilibre.</p>
            <p>Lorsqu’un inconfort apparaît, nous cherchons rapidement à le faire disparaître. Nous oublions parfois de nous demander ce qu’il peut nous apprendre sur nos rythmes, nos habitudes et notre environnement.</p>
            <p>Chez Bloom by BotaniK, nous choisissons une autre posture : écouter avant d’interpréter, comprendre avant d’agir, préparer avec méthode plutôt que chercher des solutions instantanées.</p>
            <p>Nous ne considérons pas le corps comme une machine défaillante. Nous le considérons comme un système vivant, complexe et en interaction permanente avec son environnement.</p>
            <p>Bloom by BotaniK a été créé pour accompagner cette relation avec soi, en proposant des outils et des savoirs botaniques au service d’une autonomie éclairée.</p>
            <p>Nous nous situons entre l’herboristerie ancestrale et l’ingénierie moléculaire : nous respectons le totum végétal et les savoirs transmis, tout en y apportant la rigueur, la précision thermique et la reproductibilité des méthodes de laboratoire.</p>
            <p>Notre vision est simple : le corps sait se réguler s'il reçoit les bons outils. Nous sommes là pour vous aider à préparer.</p>
          </div>
        </motion.header>
      </article>

      {/* Final CTA */}
      <section className="bg-[#1B3022] py-24 text-center text-white">
        <div className="max-w-4xl mx-auto px-6">
          <h3 className="text-3xl md:text-5xl font-black mb-10">Rejoindre la démarche Bloom</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <button 
              onClick={() => onBack()}
              className="px-10 py-5 bg-botanik-orange text-white rounded-full font-bold hover:bg-[#F97316] transition-all shadow-xl"
            >
              Découvrir la BloomLab
            </button>
            <button 
              onClick={() => onBack()}
              className="px-10 py-5 border border-white/20 text-white rounded-full font-bold hover:bg-white/10 transition-all"
            >
              Explorer l'Herbier
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
