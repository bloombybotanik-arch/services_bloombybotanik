import React, { useState } from 'react';
import { Sparkles, Leaf, ShieldCheck, Award, User, ChevronRight, FlaskConical, BookOpen, ShoppingBag, ChefHat, Star, Wind, Waves, Moon, Utensils, X, ArrowRight } from 'lucide-react';
import bloomImg from './assets/images/bloomlab_main_1784887530345.jpeg';
import { resetDetailsData, ResetSectionDetail } from './data/resetDetails';
import { motion, AnimatePresence } from 'motion/react';

interface HomeContentProps {
  onNavigate: (view: any) => void;
}

const ResetDetailModal: React.FC<{ 
  detail: ResetSectionDetail; 
  onClose: () => void;
  onNavigate: (view: any) => void;
}> = ({ detail, onClose, onNavigate }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-botanik-green/80 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="bg-[#F9F9F7] w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[40px] shadow-2xl relative"
        onClick={e => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white flex items-center justify-center text-botanik-green hover:bg-botanik-orange hover:text-white transition-all shadow-sm z-10"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-8 md:p-16">
          <div className="mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-botanik-green mb-6 leading-tight">
              {detail.title}
            </h2>
            <div className="p-6 bg-botanik-orange/5 rounded-3xl border border-botanik-orange/10">
              <p className="text-botanik-green font-medium leading-relaxed italic">
                {detail.objective}
              </p>
            </div>
          </div>

          <div className="space-y-12">
            {detail.sections.map((section) => (
              <div key={section.id} className="relative pl-8 border-l-2 border-botanik-orange/20">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-botanik-orange shadow-sm shadow-botanik-orange/20" />
                <h3 className="text-xl font-bold text-botanik-green mb-6">{section.title}</h3>
                <div className="space-y-4">
                  {section.content.map((p, idx) => (
                    <p key={idx} className="text-botanik-green/70 leading-relaxed">
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 pt-12 border-t border-botanik-green/10">
            <div className="bg-botanik-green p-8 md:p-12 rounded-[40px] text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <Sparkles className="w-32 h-32" />
              </div>
              <div className="relative z-10">
                <h4 className="text-2xl font-bold mb-4">{detail.cta.label}</h4>
                <p className="text-white/70 mb-8 max-w-xl">
                  {detail.cta.description}
                </p>
                <button 
                  onClick={() => {
                    const view = detail.id === 'alimentation' ? 'culinaire' : 'phytotherapie-reset';
                    onNavigate(view);
                    onClose();
                  }}
                  className="px-8 py-4 bg-botanik-orange text-white rounded-2xl font-bold flex items-center gap-2 hover:scale-105 transition-all shadow-xl shadow-botanik-orange/20"
                >
                  Démarrer maintenant <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function HomeContent({ onNavigate }: HomeContentProps) {
  const [selectedResetDetail, setSelectedResetDetail] = useState<ResetSectionDetail | null>(null);

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-12 lg:py-24 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      
      <AnimatePresence>
        {selectedResetDetail && (
          <ResetDetailModal 
            detail={selectedResetDetail} 
            onClose={() => setSelectedResetDetail(null)} 
            onNavigate={onNavigate}
          />
        )}
      </AnimatePresence>

      {/* PAGE 1 — COMMENCER ICI */}
      <section id="protocole" className="mb-24 md:mb-32 scroll-mt-24">
        <div className="bg-white rounded-[40px] md:rounded-[60px] p-6 md:p-16 border border-botanik-green/5 shadow-2xl mb-16 md:mb-24 overflow-hidden relative group">
          <div className="absolute top-0 right-0 w-48 md:w-64 h-48 md:h-64 bg-botanik-orange/5 rounded-bl-full -z-0" />
          <div className="grid lg:grid-cols-[1fr_450px] gap-8 md:gap-12 items-center relative z-10">
            <div>
              <div className="flex gap-4 text-[10px] font-black text-botanik-green/40 uppercase tracking-[0.3em] items-center mb-8">
                <span>Introduction</span>
                <span className="w-1 h-1 rounded-full bg-botanik-green/20" />
                <span>Onboarding</span>
              </div>
              <h1 className="text-3xl md:text-7xl font-bold text-botanik-green mb-6 md:mb-8 leading-[1.1]">
                Commencer ici
              </h1>
              <p className="text-base md:text-2xl text-botanik-green/60 leading-relaxed font-light">
                Bienvenue dans l'écosystème Bloom by Botanik. Plus qu'une application, voici votre guide pour réapprendre à écouter, comprendre et accompagner votre biologie vivante.
              </p>
            </div>
            <div className="relative aspect-square rounded-[32px] md:rounded-[40px] overflow-hidden border-4 md:border-8 border-white shadow-2xl transition-transform duration-700 group-hover:scale-[1.02]">
              <img src={bloomImg} className="w-full h-full object-cover" alt="BloomLab" />
              <div className="absolute inset-0 ring-1 ring-inset ring-botanik-green/10 rounded-[32px] md:rounded-[40px]" />
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          <div className="bg-white p-6 md:p-12 rounded-[32px] md:rounded-[40px] border border-botanik-green/5 shadow-sm hover:shadow-xl transition-all duration-500 group">
            <div className="w-12 h-12 bg-botanik-orange/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Sparkles className="w-6 h-6 text-botanik-orange" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-botanik-green mb-4">Bienvenue chez Bloom by Botanik</h3>
            <p className="text-sm md:text-base text-botanik-green/60 leading-relaxed">
              Nous sommes un écosystème de soin botanique, éducatif et biologique. Notre mission est de restaurer la cohérence entre votre corps, vos soins et la nature à travers l'intelligence du Totum.
            </p>
          </div>

          <div className="bg-white p-6 md:p-12 rounded-[32px] md:rounded-[40px] border border-botanik-green/5 shadow-sm hover:shadow-xl transition-all duration-500 group">
            <div className="w-12 h-12 bg-botanik-orange/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <FlaskConical className="w-6 h-6 text-botanik-orange" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-botanik-green mb-4">Ce que nous faisons</h3>
            <p className="text-sm md:text-base text-botanik-green/60 leading-relaxed">
              Nous unissons l'usage de la machine BloomLab, des produits d'exception, des protocoles rigoureux et des ateliers de transmission pour vous offrir une autonomie réelle dans votre pratique du soin.
            </p>
          </div>

          <div className="bg-white p-6 md:p-12 rounded-[32px] md:rounded-[40px] border border-botanik-green/5 shadow-sm hover:shadow-xl transition-all duration-500 group">
            <div className="w-12 h-12 bg-botanik-orange/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <BookOpen className="w-6 h-6 text-botanik-orange" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-botanik-green mb-4">Dans cette application</h3>
            <p className="text-sm md:text-base text-botanik-green/60 leading-relaxed">
              Explorez l'Herbier systémique, accédez à vos protocoles de Reset, maîtrisez l'art de l'infusion via nos ateliers et apprenez à lire votre propre terrain biologique avec l'aide d'ALMA.
            </p>
          </div>

          <div className="bg-white p-6 md:p-12 rounded-[32px] md:rounded-[40px] border border-botanik-green/5 shadow-sm hover:shadow-xl transition-all duration-500 group">
            <div className="w-12 h-12 bg-botanik-orange/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <ChevronRight className="w-6 h-6 text-botanik-orange" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-botanik-green mb-4">Par où commencer ?</h3>
            <p className="text-sm md:text-base text-botanik-green/60 leading-relaxed mb-6">
              Nous vous recommandons de débuter par un bilan personnalisé avec ALMA pour identifier vos besoins prioritaires ou de plonger dans la Science du Totum pour comprendre notre vision.
            </p>
            <button 
              onClick={() => onNavigate('chat')}
              className="flex items-center gap-2 text-botanik-orange font-bold text-sm uppercase tracking-widest hover:gap-3 transition-all"
            >
              Faire mon bilan <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* PAGE 2 — LA SCIENCE DU TOTUM */}
      <section id="science" className="mb-24 md:mb-32 scroll-mt-24">
        <div className="max-w-3xl mb-12 md:mb-16">
          <span className="inline-block px-3 py-1 bg-botanik-green/5 text-botanik-green text-[10px] font-bold uppercase tracking-widest rounded-full mb-6">Philosophie</span>
          <h2 className="text-2xl md:text-6xl font-bold text-botanik-green mb-6 md:mb-8 leading-tight">
            La science du Totum
          </h2>
          <p className="text-base md:text-xl text-botanik-green/60 leading-relaxed font-light">
            La plante est une intelligence vivante que l'on ne peut réduire à une seule molécule isolée. Notre approche repose sur le respect de cette complexité biologique.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 md:gap-12">
          <div className="space-y-10 md:space-y-12">
            <div>
              <h4 className="text-lg md:text-xl font-bold text-botanik-green mb-2">Qu'est-ce que le Totum ?</h4>
              <p className="text-[10px] md:text-sm font-medium text-botanik-orange uppercase tracking-wider mb-3 md:mb-4">L'INTÉGRALITÉ DU VIVANT</p>
              <p className="text-sm md:text-base text-botanik-green/60 leading-relaxed">
                Le Totum est l'ensemble des principes actifs d'une plante. Contrairement à l'approche industrielle qui isole une molécule, le Totum préserve la synergie naturelle où chaque composé module et soutient l'action des autres.
              </p>
            </div>
            <div>
              <h4 className="text-lg md:text-xl font-bold text-botanik-green mb-2">Pourquoi cette approche ?</h4>
              <p className="text-[10px] md:text-sm font-medium text-botanik-orange uppercase tracking-wider mb-3 md:mb-4">RÉPONSE BIOLOGIQUE</p>
              <p className="text-sm md:text-base text-botanik-green/60 leading-relaxed">
                Le corps reconnaît mieux les structures complexes du Totum. Cette "langue" biologique permet une assimilation optimale et réduit les effets secondaires souvent liés aux actifs isolés et sur-concentrés.
              </p>
            </div>
          </div>
          <div className="space-y-10 md:space-y-12">
            <div>
              <h4 className="text-lg md:text-xl font-bold text-botanik-green mb-2">Notre lecture du corps</h4>
              <p className="text-[10px] md:text-sm font-medium text-botanik-orange uppercase tracking-wider mb-3 md:mb-4">SYSTÈMES INTERCONNECTÉS</p>
              <p className="text-sm md:text-base text-botanik-green/60 leading-relaxed">
                Nous ne traitons pas des symptômes isolés. Stress, immunité, inflammation et microbiote forment un terrain unique. Bloom s'attache à restaurer la régulation globale de ces systèmes interconnectés.
              </p>
            </div>
            <div>
              <h4 className="text-lg md:text-xl font-bold text-botanik-green mb-2">Le sens de l'extraction</h4>
              <p className="text-[10px] md:text-sm font-medium text-botanik-orange uppercase tracking-wider mb-3 md:mb-4">RÉVÉLER LA PUISSANCE</p>
              <p className="text-sm md:text-base text-botanik-green/60 leading-relaxed">
                L'extraction est l'art de révéler les différentes familles de composés d'une plante. BloomLab permet de maîtriser ce processus pour capturer l'essence pure du Totum adaptée à votre terrain spécifique.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PAGE 3 — UNE AUTRE VOIE */}
      <section id="alternative" className="mb-32 scroll-mt-24">
        <div className="bg-botanik-green rounded-[60px] p-8 md:p-20 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 p-12 opacity-5">
            <Sparkles className="w-96 h-96 rotate-12" />
          </div>
          
          <div className="relative z-10">
            <div className="max-w-3xl mb-12 md:mb-20">
              <h2 className="text-3xl md:text-6xl font-bold mb-6 md:mb-8 leading-tight">
                Une autre voie
              </h2>
              <p className="text-lg md:text-xl text-white/70 leading-relaxed font-light italic">
                "Votre corps n'est pas cassé. Il est verrouillé."
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-16">
              <div className="space-y-10">
                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center shrink-0">
                    <Leaf className="w-6 h-6 text-botanik-orange" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Pourquoi une autre voie ?</h4>
                    <p className="text-white/60 text-sm leading-relaxed">
                      Face à la fragmentation des routines modernes qui s'épuisent à masquer les signaux, nous proposons de revenir à la source : la régulation des systèmes biologiques profonds.
                    </p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-6 h-6 text-botanik-orange" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">La souveraineté</h4>
                    <p className="text-white/60 text-sm leading-relaxed">
                      La souveraineté n'est pas l'isolement, c'est l'autonomie par la connaissance. Comprendre son corps et maîtriser ses propres outils de soin est l'acte de liberté ultime.
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-10">
                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center shrink-0">
                    <Award className="w-6 h-6 text-botanik-orange" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">La différence Bloom</h4>
                    <p className="text-white/60 text-sm leading-relaxed">
                      Nous ne cherchons pas l'accumulation d'actifs, mais la cohérence du geste. Chaque protocole Bloom est une éducation au vivant, alliant rigueur scientifique et respect botanique.
                    </p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center shrink-0">
                    <User className="w-6 h-6 text-botanik-orange" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Une vision profonde</h4>
                    <p className="text-white/60 text-sm leading-relaxed">
                      Le soin est un dialogue. Nous vous apprenons à lire les messages de votre peau, de votre énergie et de vos rythmes pour y répondre avec une justesse souveraine.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PAGE 4 — TROUVER VOTRE VOIE */}
      <section id="choix" className="scroll-mt-24">
        <div className="max-w-3xl mb-16">
          <span className="inline-block px-3 py-1 bg-botanik-orange/10 text-botanik-orange text-[10px] font-bold uppercase tracking-widest rounded-full mb-6">Orientation</span>
          <h2 className="text-3xl md:text-6xl font-bold text-botanik-green mb-8 leading-tight">
            Trouver votre voie
          </h2>
          <p className="text-lg md:text-xl text-botanik-green/60 leading-relaxed font-light">
            Chaque parcours commence par une intention. Identifiez le point d'entrée qui résonne avec votre besoin actuel.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          <div className="bg-white p-8 md:p-10 rounded-[32px] md:rounded-[40px] border border-botanik-green/5 shadow-sm hover:border-botanik-orange transition-all duration-300 flex flex-col group">
            <h4 className="text-lg md:text-xl font-bold text-botanik-green mb-4">Découvrir la marque</h4>
            <p className="text-botanik-green/60 text-xs md:text-sm mb-6 md:mb-8 leading-relaxed flex-grow">
              Plongez dans l'univers Bloom, notre histoire et notre vision du Totum à travers nos dossiers thématiques et notre manifeste.
            </p>
            <button 
              onClick={() => onNavigate('manifeste')}
              className="flex items-center gap-2 text-botanik-orange font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] group-hover:gap-3 transition-all"
            >
              Manifeste <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="bg-white p-8 md:p-10 rounded-[32px] md:rounded-[40px] border border-botanik-green/5 shadow-sm hover:border-botanik-orange transition-all duration-300 flex flex-col group">
            <h4 className="text-lg md:text-xl font-bold text-botanik-green mb-4">Solution concrète</h4>
            <p className="text-botanik-green/60 text-xs md:text-sm mb-6 md:mb-8 leading-relaxed flex-grow">
              Vous cherchez un produit spécifique ou la machine BloomLab ? Accédez directement à notre boutique d'outils botaniques.
            </p>
            <button 
              onClick={() => onNavigate('boutique')}
              className="flex items-center gap-2 text-botanik-orange font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] group-hover:gap-3 transition-all"
            >
              La Boutique <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="bg-white p-8 md:p-10 rounded-[32px] md:rounded-[40px] border border-botanik-green/5 shadow-sm hover:border-botanik-orange transition-all duration-300 flex flex-col group">
            <h4 className="text-lg md:text-xl font-bold text-botanik-green mb-4">Reset Systémique</h4>
            <p className="text-botanik-green/60 text-xs md:text-sm mb-6 md:mb-8 leading-relaxed flex-grow">
              Prêt pour une transformation profonde ? Entrez dans le protocole de Reset pour rééquilibrer vos systèmes de régulation.
            </p>
            <button 
              onClick={() => onNavigate('phytotherapie-reset')}
              className="flex items-center gap-2 text-botanik-orange font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] group-hover:gap-3 transition-all"
            >
              Le Reset <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="bg-white p-8 md:p-10 rounded-[32px] md:rounded-[40px] border border-botanik-green/5 shadow-sm hover:border-botanik-orange transition-all duration-300 flex flex-col group">
            <h4 className="text-lg md:text-xl font-bold text-botanik-green mb-4">Aller plus loin</h4>
            <p className="text-botanik-green/60 text-xs md:text-sm mb-6 md:mb-8 leading-relaxed flex-grow">
              Explorez l'Herbier systémique pour approfondir votre connaissance des plantes ou participez à nos ateliers experts.
            </p>
            <button 
              onClick={() => onNavigate('herbier')}
              className="flex items-center gap-2 text-botanik-orange font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] group-hover:gap-3 transition-all"
            >
              L'Herbier <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Featured Protocol Grid - Integrated as part of the flow */}
      <div className="mt-32">
        <div className="bg-botanik-green rounded-[40px] px-8 md:px-16 py-10 md:py-16 text-white overflow-hidden relative group">
          <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:scale-110 transition-transform duration-1000">
            <FlaskConical className="w-96 h-96 rotate-12" />
          </div>
          
          <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
            <div className="max-w-xl">
              <span className="inline-block px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-[10px] font-bold uppercase tracking-widest mb-6">Protocole Signature</span>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">Le Reset <br /> Homéostatique</h2>
              <p className="text-white/80 text-base md:text-lg mb-10 leading-relaxed">
                Un voyage de 21 jours pour réinitialiser vos mécanismes naturels. La puissance du Totum à portée de main.
              </p>
              <button onClick={() => onNavigate('phytotherapie-reset')} className="px-10 py-5 bg-white text-botanik-green rounded-2xl font-bold flex items-center gap-3 hover:bg-[#F5F3EB] transition-colors shadow-2xl">
                Découvrir le Protocole <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { id: 'respiration', title: "Respiration", subtitle: "Nerf Vague & thymus", detail: "Système Nerveux Autonome", icon: Wind, color: "bg-[#E0F2FE] text-[#0369A1]", iconColor: "text-[#0369A1]" },
                { id: 'mouvement', title: "Mouvement", subtitle: "Lymphe et Fascia", detail: "Système Lymphatique", icon: Waves, color: "bg-[#DCFCE7] text-[#15803D]", iconColor: "text-[#15803D]" },
                { id: 'sommeil', title: "Sommeil", subtitle: "Nuit de reconstruction", detail: "Apaisement & Réparation", icon: Moon, color: "bg-[#F3E8FF] text-[#7E22CE]", iconColor: "text-[#7E22CE]" },
                { id: 'alimentation', title: "Alimentation", subtitle: "Nourrir le terrain", detail: "Métabolisme & Vitalité", icon: Utensils, color: "bg-[#FEF9C3] text-[#854D0E]", iconColor: "text-[#854D0E]" }
              ].map((item, idx) => (
                <div 
                  key={idx} 
                  onClick={() => {
                    const detail = resetDetailsData.find(d => d.id === item.id);
                    if (detail) setSelectedResetDetail(detail);
                  }}
                  className={`${item.color} p-4 rounded-3xl relative overflow-hidden group/vignette transition-transform hover:-translate-y-1 cursor-pointer`}
                >
                  <div className="absolute top-2 right-2">
                    <div className="w-5 h-5 bg-white/50 rounded-full flex items-center justify-center">
                      <ChevronRight className="w-3 h-3 text-green-600" />
                    </div>
                  </div>
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center mb-4 shadow-sm">
                    <item.icon className={`w-5 h-5 ${item.iconColor}`} />
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="text-[13px] font-black leading-tight uppercase tracking-tight">{item.title}</h4>
                    <p className="text-[11px] font-bold opacity-90">{item.subtitle}</p>
                    <p className="text-[9px] opacity-70 mt-1">{item.detail}</p>
                  </div>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      const detail = resetDetailsData.find(d => d.id === item.id);
                      if (detail) setSelectedResetDetail(detail);
                    }}
                    className="mt-4 flex items-center gap-1 text-[10px] font-black uppercase tracking-widest opacity-80 group-hover/vignette:opacity-100"
                  >
                    Détails <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
