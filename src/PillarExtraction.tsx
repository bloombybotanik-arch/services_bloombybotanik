import React from 'react';
import { motion } from 'motion/react';
import { FlaskConical, Thermometer, Clock, Droplets, Leaf, ShieldCheck, ChevronRight, BookOpen, Activity, ArrowRight, Check } from 'lucide-react';
import { Language, translations } from './translations';
import bloomLabImg from './assets/images/bloomlab_main_1784887530345.jpeg';
import { OptimizedImage } from './components/OptimizedImage';

export default function PillarExtraction({ lang, onNavigate }: { lang: Language, onNavigate: (v: any) => void }) {
  const t = translations[lang];

  return (
    <div className="flex-1 bg-[#F9F9F7]">
      {/* Hero Section */}
      <section className="relative py-24 px-6 overflow-hidden bg-botanik-green text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_0%,transparent_50%)]" />
        </div>
        
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1 bg-white/10 rounded-full text-xs font-bold uppercase tracking-widest mb-8 border border-white/10"
          >
            Guide Complet de Souveraineté
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-light mb-8 font-sans tracking-tight leading-tight"
          >
            Extraction Botanique : <br />
            <span className="font-bold italic">L'Art de Libérer le Totum</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-white/80 leading-relaxed mb-12 max-w-3xl mx-auto font-serif"
          >
            Passer de la simple infusion domestique à l'extraction de grade laboratoire. 
            Découvrez comment capturer l'intégralité du génie moléculaire des plantes.
          </motion.p>
        </div>
      </section>

      {/* Sommaire Rapide */}
      <section className="max-w-4xl mx-auto -mt-12 px-6 mb-24 relative z-20">
        <div className="bg-white rounded-3xl p-8 shadow-2xl border border-botanik-green/5 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-botanik-green/5 flex items-center justify-center flex-shrink-0">
              <FlaskConical className="w-5 h-5 text-botanik-green" />
            </div>
            <div>
              <h3 className="font-bold text-botanik-green text-sm mb-1">Méthodes</h3>
              <p className="text-xs text-botanik-green/60">Eau, alcool, huile : choisir son solvant.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-botanik-orange/5 flex items-center justify-center flex-shrink-0">
              <Thermometer className="w-5 h-5 text-botanik-orange" />
            </div>
            <div>
              <h3 className="font-bold text-botanik-green text-sm mb-1">Paramètres</h3>
              <p className="text-xs text-botanik-green/60">Température et durée : la précision ±0,5°C.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-botanik-magenta/5 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-5 h-5 text-botanik-magenta" />
            </div>
            <div>
              <h3 className="font-bold text-botanik-green text-sm mb-1">Sécurité</h3>
              <p className="text-xs text-botanik-green/60">Dosage et conservation de vos extraits.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 pb-24 space-y-24">
        
        {/* Section 1: Qu'est-ce que l'extraction ? */}
        <section className="prose prose-botanik max-w-none">
          <h2 className="text-3xl font-bold text-botanik-green mb-8 flex items-center gap-4">
            <span className="w-8 h-8 rounded-full bg-botanik-green text-white flex items-center justify-center text-sm">01</span>
            Le sens de l'extraction : au-delà de l'infusion
          </h2>
          <p className="text-lg leading-relaxed text-botanik-green/80 mb-6">
            L'infusion classique (verser de l'eau chaude sur une plante) est la forme la plus simple d'extraction. Mais la plante est un coffre-fort moléculaire complexe. Certaines molécules sont <strong>hydrosolubles</strong> (solubles dans l'eau), d'autres <strong>liposolubles</strong> (solubles dans l'huile) ou <strong>alcoolosolubles</strong>.
          </p>
          <div className="bg-botanik-green/5 p-8 rounded-3xl border border-botanik-green/10 my-12">
            <h4 className="font-bold text-botanik-green mb-4 flex items-center gap-2">
              <Droplets className="w-5 h-5" /> Le rôle du solvant
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-botanik-orange mt-1" />
                <span><strong>L'eau :</strong> Idéale pour les sels minéraux, les mucilages et les tanins.</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-botanik-orange mt-1" />
                <span><strong>L'huile :</strong> Capture les huiles essentielles, les caroténoïdes et les vitamines liposolubles (A, D, E, K).</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-botanik-orange mt-1" />
                <span><strong>L'alcool :</strong> Le solvant le plus puissant pour les alcaloïdes et les résines complexes.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Section 2: Pourquoi la précision thermique ? */}
        <section className="prose prose-botanik max-w-none">
          <h2 className="text-3xl font-bold text-botanik-green mb-8 flex items-center gap-4">
            <span className="w-8 h-8 rounded-full bg-botanik-green text-white flex items-center justify-center text-sm">02</span>
            La variable critique : La Température
          </h2>
          <p className="text-lg leading-relaxed text-botanik-green/80 mb-8">
            C'est ici que l'herboristerie classique rencontre ses limites. Une eau trop chaude (bouillante à 100°C) peut détruire instantanément les enzymes fragiles et oxyder les terpènes aromatiques.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white p-6 rounded-2xl border border-botanik-green/5 shadow-sm">
              <h4 className="font-bold text-botanik-green mb-2">Extraction à Froid (20°C - 40°C)</h4>
              <p className="text-sm text-botanik-green/70">Préserve l'intégralité des vitamines et des arômes. Idéal pour les fleurs fragiles et les macérats solaires.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-botanik-green/5 shadow-sm">
              <h4 className="font-bold text-botanik-green mb-2">Extraction à Chaud (60°C - 85°C)</h4>
              <p className="text-sm text-botanik-green/70">Nécessaire pour briser les structures cellulosiques dures (racines, écorces) et libérer les principes actifs profonds.</p>
            </div>
          </div>
          <div className="bg-botanik-green text-white p-8 rounded-3xl relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-4">Le secret de BloomLab</h3>
              <p className="opacity-90 mb-6">
                Grâce à un contrôle au <strong className="text-botanik-orange">±0,5°C</strong>, nous pouvons cibler précisément la fenêtre thermique de chaque plante. Plus d'approximation, seulement du Totum pur.
              </p>
              <button onClick={() => onNavigate('machine')} className="flex items-center gap-2 text-botanik-orange font-bold group">
                Découvrir la technologie <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            <FlaskConical className="absolute bottom-[-20%] right-[-10%] w-64 h-64 text-white/5 rotate-12" />
          </div>
        </section>

        {/* Section 3: FAQ & JSON-LD Section */}
        <section className="bg-white rounded-3xl p-8 md:p-12 border border-botanik-green/10">
          <h2 className="text-3xl font-bold text-botanik-green mb-12 text-center">Foire Aux Questions</h2>
          <div className="space-y-8">
            <div className="border-b border-botanik-green/5 pb-8">
              <h4 className="font-bold text-botanik-green mb-4">Quelle est la différence entre infusion et extraction ?</h4>
              <p className="text-botanik-green/70 leading-relaxed">
                L'infusion est un type d'extraction utilisant l'eau. L'extraction au sens large inclut l'utilisation de différents solvants et des paramètres de température et de temps contrôlés pour capturer une palette moléculaire plus large (le Totum).
              </p>
            </div>
            <div className="border-b border-botanik-green/5 pb-8">
              <h4 className="font-bold text-botanik-green mb-4">Combien de temps se conserve un extrait maison ?</h4>
              <p className="text-botanik-green/70 leading-relaxed">
                Cela dépend du solvant. Une infusion aqueuse se consomme dans les 24h. Un macérat huileux stabilisé peut durer 6 mois, et une teinture alcoolique plusieurs années si elle est conservée à l'abri de la lumière.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-botanik-green mb-4">Peut-on extraire toutes les plantes ?</h4>
              <p className="text-botanik-green/70 leading-relaxed">
                La plupart des plantes médicinales et aromatiques se prêtent à l'extraction. Cependant, il est crucial de respecter les dosages et les contre-indications propres à chaque plante. Notre Herbarium systémique est là pour vous guider.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Area */}
        <section className="text-center bg-botanik-green/5 rounded-[40px] p-12 md:p-20">
          <FlaskConical className="w-16 h-16 text-botanik-green mx-auto mb-8" />
          <h2 className="text-3xl md:text-4xl font-bold text-botanik-green mb-6">Prêt à devenir souverain ?</h2>
          <p className="text-lg text-botanik-green/60 mb-10 max-w-xl mx-auto leading-relaxed">
            Équipez votre foyer d'un outil de précision clinique et commencez votre voyage vers l'extraction de Totum.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button 
              onClick={() => onNavigate('boutique')}
              className="px-8 py-4 bg-botanik-green text-white rounded-2xl font-bold hover:bg-botanik-orange transition-all shadow-xl shadow-botanik-green/10"
            >
              Voir la BloomLab
            </button>
            <button 
              onClick={() => onNavigate('library-landing')}
              className="px-8 py-4 bg-white text-botanik-green border border-botanik-green/10 rounded-2xl font-bold hover:bg-botanik-green/5 transition-all"
            >
              Explorer l'Herbier
            </button>
          </div>
        </section>

      </div>
    </div>
  );
}
