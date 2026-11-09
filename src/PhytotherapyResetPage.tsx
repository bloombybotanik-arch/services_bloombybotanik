import React, { useState } from 'react';
import { 
  Shield, 
  FlaskConical, 
  Activity, 
  ArrowRight, 
  CheckCircle, 
  Sparkles, 
  Zap, 
  Brain, 
  Wind, 
  Lock, 
  Sun, 
  Moon, 
  Clock, 
  Waves, 
  X,
  Compass,
  Layers,
  Leaf
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { resetPhasesData, ResetPhaseDetail } from './data/resetPhases';
import { chronobiologyData } from './data/chronobiology';
import { translations, Language } from './translations';
import { TooltipLexique } from './components/TooltipLexique';
import { GlossaryProvider } from './context/GlossaryContext';
import AcademyNavigation from './components/AcademyNavigation';
import FreemiumPaywallGate from './components/FreemiumPaywallGate';

// Botanical root illustrations in 19th-century scientific herbarium style (black ink on warm cream background)
const botanicalHeroImg = "/images/botanical_roots_hero_1790693840047.jpg";
const botanicalEmonctoiresImg = "/images/botanical_roots_emonctoires_1790693854850.jpg";
const botanicalHepaticImg = "/images/botanical_roots_hepatic_1790693867525.jpg";
const botanicalVitalityImg = "/images/botanical_roots_vitality_1790693881999.jpg";

const PhaseDetailModal: React.FC<{ 
  phase: ResetPhaseDetail; 
  onClose: () => void;
  onNavigate: (view: any) => void;
}> = ({ phase, onClose, onNavigate }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-[#3E4A3D]/90 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="bg-[#16352B] text-[#FAF7F2] w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[36px] shadow-2xl relative border border-[#c9a84c]/40"
        onClick={e => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 w-11 h-11 rounded-full bg-[#3E4A3D] hover:bg-[#2D372C] text-white flex items-center justify-center transition-all shadow-md z-10 cursor-pointer border border-white/10"
          aria-label="Fermer"
        >
          <X className="w-5 h-5 stroke-[2]" />
        </button>

        <div className="p-8 md:p-14">
          <div className="mb-10">
            <div className="text-[10px] font-mono font-bold text-[#c9a84c] tracking-[0.25em] mb-2 uppercase">
              {phase.subtitle}
            </div>
            <h2 className="text-2xl md:text-4xl font-black text-white mb-4 leading-tight">
              {phase.title} : {phase.name}
            </h2>
            <div className="p-5 bg-[#3E4A3D] rounded-2xl border border-white/10">
              <p className="text-[#E5D7B7] text-sm md:text-base font-normal leading-relaxed italic">
                {phase.long_text}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#86efac]" />
                <span>Objectifs de la Phase</span>
              </h3>
              <ul className="space-y-3">
                {phase.objectives.map((obj, idx) => (
                  <li key={idx} className="flex gap-2.5 text-xs sm:text-sm text-[#b8b8b8] leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c9a84c] shrink-0 mt-2" />
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>

              <h3 className="text-base font-bold text-white mt-8 mb-4 flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#c9a84c]" />
                <span>Systèmes Biologiques Clés</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {phase.focus_systems.map((sys, idx) => (
                  <span key={idx} className="px-3 py-1.5 bg-[#0d1117] text-[#86efac] border border-[#30363d] rounded-xl text-[11px] font-mono font-bold uppercase">
                    {sys}
                  </span>
                ))}
              </div>
            </div>

            <div>
              {phase.core_plants && (
                <>
                  <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                    <FlaskConical className="w-4 h-4 text-[#c9a84c]" />
                    <span>Plantes Clés du Totum</span>
                  </h3>
                  <div className="space-y-3 mb-8">
                    {phase.core_plants.map((plant, idx) => (
                      <div key={idx} className="p-3.5 bg-[#0d1117] rounded-xl border border-[#30363d]">
                        <div className="flex justify-between items-start mb-1">
                          <span className="font-bold text-white text-xs sm:text-sm">{plant.nom}</span>
                          <span className="text-[9px] bg-[#c9a84c]/20 text-[#c9a84c] px-2 py-0.5 rounded-full uppercase tracking-wider font-mono">
                            {plant.partie}
                          </span>
                        </div>
                        <p className="text-xs text-[#b8b8b8] leading-relaxed italic">{plant.role}</p>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {phase.actions && (
                <div>
                  <h3 className="text-base font-bold text-white mb-3 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-[#C8AB8A]" />
                    <span>Leviers d’Action</span>
                  </h3>
                  <ul className="space-y-2 text-xs text-[#b8b8b8]">
                    {phase.actions.map((act, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="text-[#C8AB8A]">•</span>
                        <span>{act}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function PhytotherapyResetPage({
  onNavigate,
  lang = 'fr',
  isPremium = false,
  user,
  onRequireAuth
}: { 
  onNavigate: (view: any, param?: string) => void;
  lang: Language;
  isPremium?: boolean;
  user?: any;
  onRequireAuth?: () => void;
}) {
  const t = translations[lang].phytotherapyReset;
  const almaT = translations[lang].alma_recommendation;
  const [activeTab, setActiveTab] = useState<'protocol' | 'supplements' | 'chronobiology'>('protocol');
  const [selectedPhase, setSelectedPhase] = useState<ResetPhaseDetail | null>(null);

  const resetSteps = resetPhasesData.map(phase => ({
    id: phase.title,
    phaseKey: phase.key,
    type: phase.type,
    title: phase.name,
    subtitle: phase.subtitle.toUpperCase(),
    desc: phase.short_text,
    action: phase.cta,
    icon: phase.type === 'diagnostic' ? Brain : (phase.type === 'pause' ? Clock : (phase.key === 'phase_0' ? Wind : (phase.key === 'phase_1' ? Zap : (phase.key === 'phase_2' ? Activity : Shield)))),
    target: phase.type === 'diagnostic' ? 'chat' : (phase.type === 'pause' ? 'library' : (phase.key === 'phase_0' ? 'herbier' : 'boutique'))
  }));

  const supplements = [
    { name: "Oméga-3 EPA/DHA", dose: "2g / jour", role: "Soutien des membranes cellulaires et régulation de l'inflammation lipidique.", target: "Membranes & SRA" },
    { name: "Magnésium Bisglycinate", dose: "300mg / soir", role: "Relâchement neuro-musculaire et activation de plus de 300 enzymes vitales.", target: "Axe HPA & Sommeil" },
    { name: "L-Glutamine", dose: "5g / matin", role: "Carburant préférentiel des entérocytes et consolidation de la barrière intestinale.", target: "T1 Microbiome & A2" },
    { name: "Vitamine D3 + K2 (MK7)", dose: "2000 UI / 100µg", role: "Modulation immunitaire, expression génique et fixation minérale osseuse.", target: "Immunité & Fascia" },
    { name: "Sélénium Méthionine", dose: "200µg / jour", role: "Cofacteur de la désiodase thyroïdienne et protection antioxydante (glutathion).", target: "Métabolisme T5" },
    { name: "Glycine Pure", dose: "3g / soir", role: "Acide aminé fondamental de la matrice collagénique du fascia et du sommeil lent.", target: "Fascia & Sommeil" }
  ];

  const chronoPhases = [
    { id: 'matin', title: '07h00 - 09h00 • Réveil & Émonctoires', icon: Sun, color: '#f59e0b', desc: "Ouverture hépato-rénale, hydratation à température corporelle et stimulation du péristaltisme." },
    { id: 'midi', title: '12h00 - 14h00 • Puissance Métabolique', icon: Zap, color: '#eab308', desc: "Assimilation enzymatique maximale, stabilisation glycémique post-prandiale et soutien pancréatique." },
    { id: 'soir', title: '18h00 - 20h00 • Décharge Allostatique', icon: Moon, color: '#38bdf8', desc: "Baisse du cortisol, induction vagale et allègement de la charge digestive avant le repos." },
    { id: 'nuit', title: '22h00 - 04h00 • Régénération & Autophagie', icon: Sparkles, color: '#a855f7', desc: "Nettoyage glymphatique cérébral, réparation tissulaire et recyclage cellulaire profond." }
  ];

  return (
    <GlossaryProvider pageKey="phytotherapie-reset">
      <div 
        className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8 min-h-screen bg-[#3E4A3D] text-[#FAF7F2] font-sans selection:bg-[#c9a84c]/30 selection:text-white pb-24"
        data-bloom-academie="true"
      >
        {/* 1. Header & Secondary Navigation */}
        <AcademyNavigation
          currentView="phytotherapie-reset"
          onNavigate={onNavigate}
          currentPageTitle={lang === 'fr' ? 'Le Reset Homéostasique' : lang === 'de' ? 'Der Homöostatische Reset' : 'The Homeostatic Reset'}
          sectionName={lang === 'fr' ? 'Comprendre le Corps' : lang === 'de' ? 'Den Körper verstehen' : 'Understanding the Body'}
          lang={lang}
        />

        {/* 2. Hero Section : Vert Forêt #0F261E & Blanc */}
        <header className="relative border border-white/10 bg-[#0F261E] pt-14 pb-16 px-4 sm:px-6 rounded-3xl mb-12 shadow-xl text-white">
          <div className="max-w-5xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/30 border border-white/10 text-[#E8772E] text-xs font-bold uppercase tracking-widest shadow-xs">
              <Sparkles className="w-4 h-4 text-[#E8772E]" />
              <span>Phytothérapie Systémique • Reset Homéostasique</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-sans font-black text-white tracking-tight leading-[1.1]">
              {lang === 'fr' 
                ? "Le Reset Homéostasique : relancer la pharmacie intérieure" 
                : lang === 'de'
                ? "Der Homöostatische Reset : Die innere Apotheke reaktivieren"
                : "The Homeostatic Reset: Reactivating the Inner Pharmacy"}
            </h1>

            <p className="text-lg sm:text-xl text-[#FAF7F2]/90 max-w-3xl mx-auto font-normal leading-relaxed italic border-l-2 sm:border-l-0 border-white/30 pl-4 sm:pl-0">
              « Votre corps n’est pas cassé. Il est verrouillé par une charge adaptative devenue trop lourde. »
            </p>

            <p className="text-sm sm:text-base text-[#FAF7F2]/80 max-w-3xl mx-auto font-normal leading-relaxed">
              Une démarche biologique en 6 phases séquentielles qui libère les émonctoires, allège la charge allostatique et réveille les mécanismes naturels d'auto-régulation grâce au Totum des plantes médicinales.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <button
                onClick={() => {
                  const el = document.getElementById('planches-racines');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-3.5 rounded-xl bg-[#E8772E] hover:bg-[#D4651F] text-white font-black text-xs uppercase tracking-wider transition-all shadow-lg hover:shadow-xl flex items-center gap-2 cursor-pointer border border-[#E8772E]/30"
              >
                <Leaf className="w-4 h-4 text-white" />
                <span>Découvrir les Planches Botaniques</span>
              </button>

              <button
                onClick={() => onNavigate('protocoles')}
                className="px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-[#1E2E25] border border-white/20 text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-md"
              >
                <Layers className="w-4 h-4 text-[#E8772E]" />
                <span>Voir les 3 Protocoles Systémiques</span>
              </button>
            </div>
          </div>
        </header>

        {/* 3. Modal Phase Detail */}
        <AnimatePresence>
          {selectedPhase && (
            <PhaseDetailModal 
              phase={selectedPhase} 
              onClose={() => setSelectedPhase(null)} 
              onNavigate={onNavigate}
            />
          )}
        </AnimatePresence>

        {/* 4. MAIN BODY CONTAINER */}
        <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-14 space-y-20">

          {/* ========================================================================= */}
          {/* BLOC 1 : LE VOYAGE AU CŒUR DE L'HOMÉOSTASIE (HISTOIRE & SCIENCE)           */}
          {/* ========================================================================= */}
          <section className="space-y-8">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF7F2] text-[#3E4A3D] border border-[#E7DFD3] text-[11px] font-bold uppercase tracking-wider shadow-sm">
                <FlaskConical className="w-3.5 h-3.5 text-[#C8AB8A]" />
                <span>Histoire & Physiologie Fondatrice</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-[#f5f0e8] tracking-tight">
                {lang === 'fr' 
                  ? "Du « Milieu Intérieur » à l'Homéostasie : La Sagesse du Vivant" 
                  : lang === 'de'
                  ? "Vom « Milieu Intérieur » zur Homöostase : Die Weisheit des Lebens"
                  : "From the « Milieu Intérieur » to Homeostasis: The Wisdom of Living Systems"}
              </h2>
              <p className="text-xs sm:text-sm text-[#b8b8b8] leading-relaxed">
                {lang === 'fr'
                  ? "Comprendre le corps humain commence par reconnaître qu'il ne dysfonctionne jamais sans raison. La fatigue chronique, les tensions et les désordres métaboliques ne sont pas des pannes arbitraires : ce sont des signaux d'adaptation d'un organisme qui cherche désespérément à préserver son équilibre vital."
                  : lang === 'de'
                  ? "Um den Körper zu verstehen, müssen wir erkennen, dass er nie ohne Grund aus dem Takt gerät. Chronische Müdigkeit und Entzündungen sind Schutzsignale."
                  : "Understanding the human body begins with recognizing that it never falters by mistake. Chronic fatigue and tension are protective adaptive signals."}
              </p>
            </div>

            {/* 2 Colonnes Claude Bernard & Walter Cannon */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Claude Bernard */}
              <div className="bg-[#16352B] rounded-3xl border border-white/10 p-6 sm:p-8 flex flex-col justify-between shadow-xl relative overflow-hidden group hover:border-[#c9a84c]/60 transition-all">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#c9a84c] font-bold">
                      XIXᵉ Siècle • Fondateur de la Physiologie
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#c9a84c]/10 text-[#c9a84c] text-[10px] font-bold">
                      1813 – 1878
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-[#FAF7F2]">
                    Claude Bernard & le « Milieu Intérieur »
                  </h3>
                  <div className="bg-[#FAF7F2] text-[#3E4A3D] rounded-2xl p-4 border border-[#E7DFD3] shadow-sm italic text-xs sm:text-sm leading-relaxed font-serif">
                    « La fixité du milieu intérieur est la condition d'une vie libre et indépendante. »
                  </div>
                  <p className="text-xs sm:text-sm text-[#FAF7F2]/80 leading-relaxed">
                    Claude Bernard a démontré que nos cellules baignent dans un océan liquidien intérieur (sang, lymphe, liquide interstitiel). Pour que les organes fonctionnent harmonieusement, ce milieu doit conserver une constance biochimique rigoureuse de pH, de température et de pression osmotique.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-2 text-xs text-[#c9a84c] font-medium">
                  <CheckCircle className="w-4 h-4 text-[#C8AB8A]" />
                  <span>Le terrain biologique : la matrice de toute santé durable</span>
                </div>
              </div>

              {/* Walter Cannon */}
              <div className="bg-[#16352B] rounded-3xl border border-white/10 p-6 sm:p-8 flex flex-col justify-between shadow-xl relative overflow-hidden group hover:border-[#c9a84c]/60 transition-all">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#c9a84c] font-bold">
                      Université Harvard • 1926
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#c9a84c]/10 text-[#c9a84c] text-[10px] font-bold">
                      1871 – 1945
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-[#FAF7F2]">
                    Walter Cannon & l'Homéostasie
                  </h3>
                  <div className="bg-[#FAF7F2] text-[#3E4A3D] rounded-2xl p-4 border border-[#E7DFD3] shadow-sm italic text-xs sm:text-sm leading-relaxed font-serif">
                    « L'homéostasie est la coordination des processus physiologiques maintenant la plupart des états stables de l'organisme. »
                  </div>
                  <p className="text-xs sm:text-sm text-[#FAF7F2]/80 leading-relaxed">
                    Walter Cannon a théorisé la formidable capacité d'ajustement du vivant : l'<strong>homéostasie</strong> (du grec <em>homoios</em>, semblable, et <em>stasis</em>, stabilité). Le corps dispose d'une pharmacie intérieure autonome capable de réguler tension, glycémie, immunité et réparation tissulaire grâce à de subtiles boucles de rétroaction.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-2 text-xs text-[#c9a84c] font-medium">
                  <Sparkles className="w-4 h-4 text-[#C8AB8A]" />
                  <span>La pharmacie intérieure : une auto-régulation perpétuelle</span>
                </div>
              </div>
            </div>

            {/* Encadré signature Vert Forêt #3E4A3D & Doré */}
            <div className="bg-[#3E4A3D] rounded-3xl p-6 sm:p-8 border-2 border-[#C8AB8A]/40 shadow-2xl relative overflow-hidden">
              <div className="max-w-3xl mx-auto text-center space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF7F2]/10 border border-[#FAF7F2]/20 text-[#FAF7F2] text-[11px] font-bold tracking-widest uppercase">
                  <span>Principe Fondateur Bloom</span>
                </div>
                <blockquote className="text-xl sm:text-2xl md:text-3xl font-black text-[#FAF7F2] tracking-tight leading-snug">
                  « Votre corps n’est pas cassé. Il est verrouillé par une charge adaptative devenue trop lourde. »
                </blockquote>
                <p className="text-xs sm:text-sm text-[#FAF7F2]/80 leading-relaxed max-w-2xl mx-auto">
                  Face aux polluants, au stress chronique et aux excès métaboliques, les émonctoires se saturent. L'organisme verrouille certains systèmes non-urgents pour préserver les fonctions vitales immédiates. Notre mission n'est pas d'étouffer vos symptômes, mais de lever les verrous pour restaurer la fluidité originelle du milieu intérieur.
                </p>
              </div>
            </div>
          </section>

          {/* ========================================================================= */}
          {/* BLOC 2 : LES 4 DIMENSIONS DE LA RESPONSABILITÉ (LES PILIERS DU TERRAIN)   */}
          {/* ========================================================================= */}
          <section className="space-y-8">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF7F2] text-[#3E4A3D] border border-[#E7DFD3] text-[11px] font-bold uppercase tracking-wider shadow-sm">
                <Compass className="w-3.5 h-3.5 text-[#C8AB8A]" />
                <span>Responsabilisation & Éducation Systémique</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-[#f5f0e8] tracking-tight">
                {lang === 'fr' 
                  ? "Les 4 Dimensions de la Responsabilité" 
                  : lang === 'de'
                  ? "Die 4 Dimensionen der Selbstverantwortung"
                  : "The 4 Dimensions of Responsibility"}
              </h2>
              <p className="text-xs sm:text-sm text-[#b8b8b8] leading-relaxed">
                {lang === 'fr'
                  ? "Les plantes médicinales ne sont pas des béquilles passives. Elles agissent comme de puissants catalyseurs biochimiques, mais leur pleine efficacité dépend des 4 piliers fondamentaux de votre hygiène de vie."
                  : lang === 'de'
                  ? "Heilpflanzen sind biochemische Katalysatoren, die ihr volles Potenzial erst im Einklang mit den 4 Pfeilern entfalten."
                  : "Botanical extracts act as powerful biochemical catalysts, reaching their full potential when rooted in 4 daily pillars."}
              </p>
            </div>

            {/* Grille des 4 dimensions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
              {/* Dimension 1 : Environnement & Ingestion */}
              <div className="bg-[#16352B] rounded-3xl border border-white/10 hover:border-[#c9a84c] transition-all p-6 flex flex-col justify-between shadow-xl group">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#FAF7F2] flex items-center justify-center border border-[#E7DFD3] shadow-md group-hover:scale-105 transition-transform">
                    <Leaf className="w-6 h-6 text-[#3E4A3D]" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#C8AB8A] font-bold">
                      Dimension I
                    </span>
                    <h3 className="text-base font-bold text-[#FAF7F2] mt-1">
                      L'Environnement & L'Ingestion
                    </h3>
                  </div>
                  <p className="text-xs text-[#FAF7F2]/80 leading-relaxed">
                    Ce que vous ingérez dicte la charge de vos filtres émonctoriels. Réduire les aliments ultra-transformés, réintroduire la saveur amère stimulatrice du foie et des sucs gastriques, s'hydrater avec une eau peu minéralisée et éliminer les perturbateurs endocriniens.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-white/10">
                  <p className="text-[11px] font-serif italic text-[#c9a84c]">
                    « Nourrir la cellule, soulager le filtre hépato-rénal. »
                  </p>
                </div>
              </div>

              {/* Dimension 2 : Mouvement & Circulation */}
              <div className="bg-[#16352B] rounded-3xl border border-white/10 hover:border-[#c9a84c] transition-all p-6 flex flex-col justify-between shadow-xl group">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#FAF7F2] flex items-center justify-center border border-[#E7DFD3] shadow-md group-hover:scale-105 transition-transform">
                    <Activity className="w-6 h-6 text-[#3E4A3D]" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#C8AB8A] font-bold">
                      Dimension II
                    </span>
                    <h3 className="text-base font-bold text-[#FAF7F2] mt-1">
                      Le Mouvement & La Circulation
                    </h3>
                  </div>
                  <p className="text-xs text-[#FAF7F2]/80 leading-relaxed">
                    La lymphe — véhicule principal des déchets immunitaires et cellulaires — ne possède pas de pompe cardiaque. Seul le mouvement musculaire, la marche et la mobilité des fascias propulsent ce fleuve purificateur vers les canaux d'évacuation.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-white/10">
                  <p className="text-[11px] font-serif italic text-[#c9a84c]">
                    « L'eau stagnante s'encrasse, l'eau vive se purifie. »
                  </p>
                </div>
              </div>

              {/* Dimension 3 : Sommeil & Réparation */}
              <div className="bg-[#16352B] rounded-3xl border border-white/10 hover:border-[#c9a84c] transition-all p-6 flex flex-col justify-between shadow-xl group">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#FAF7F2] flex items-center justify-center border border-[#E7DFD3] shadow-md group-hover:scale-105 transition-transform">
                    <Moon className="w-6 h-6 text-[#3E4A3D]" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#C8AB8A] font-bold">
                      Dimension III
                    </span>
                    <h3 className="text-base font-bold text-[#FAF7F2] mt-1">
                      Le Sommeil & La Réparation
                    </h3>
                  </div>
                  <p className="text-xs text-[#FAF7F2]/80 leading-relaxed">
                    C'est durant le sommeil profond que s'active le système glymphatique cérébral et que l'autophagie recycle les protéines endommagées. Sans un repos circadien respecté, aucune régénération mitochondriale ou cellulaire n'est viable à long terme.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-white/10">
                  <p className="text-[11px] font-serif italic text-[#c9a84c]">
                    « Le sommeil profond est l'élixir souverain de l'autophagie. »
                  </p>
                </div>
              </div>

              {/* Dimension 4 : Mental, Vague & Stress */}
              <div className="bg-[#16352B] rounded-3xl border border-white/10 hover:border-[#c9a84c] transition-all p-6 flex flex-col justify-between shadow-xl group">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#FAF7F2] flex items-center justify-center border border-[#E7DFD3] shadow-md group-hover:scale-105 transition-transform">
                    <Brain className="w-6 h-6 text-[#3E4A3D]" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#C8AB8A] font-bold">
                      Dimension IV
                    </span>
                    <h3 className="text-base font-bold text-[#FAF7F2] mt-1">
                      Le Mental, Le Vague & Le Stress
                    </h3>
                  </div>
                  <p className="text-xs text-[#FAF7F2]/80 leading-relaxed">
                    En état de stress chronique (mode orthosympathique), le corps bloque les fonctions digestives et hépatiques pour mobiliser l'énergie de survie. Cultiver le tonus du nerf vague (respiration lente, apaisement) est le prérequis physiologique pour rouvrir la digestion et la guérison.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-white/10">
                  <p className="text-[11px] font-serif italic text-[#c9a84c]">
                    « Le corps ne répare ses tissus qu'en état de sécurité. »
                  </p>
                </div>
              </div>

            </div>

            {/* Pilier 1 : Le Nerf Vague & L'Intuition */}
            <div className="bg-[#F5F0E6] border border-[#E7DFD3] p-6 sm:p-8 rounded-3xl text-[#0F261E] shadow-lg mt-8">
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#0F261E] text-white flex items-center justify-center shrink-0 shadow-md">
                  <Brain className="w-6 h-6 text-[#C8AB8A]" />
                </div>
                <div className="space-y-2">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-[#E8772E] font-bold">
                    Pilier 1 • Axe Neuro-Végétatif & Terrain
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-[#0F261E]">
                    Le Nerf Vague : Le Siège de l'Intuition
                  </h3>
                  <p className="text-sm sm:text-base text-[#0F261E]/90 leading-relaxed font-medium">
                    90% des informations remontent du ventre au cerveau. 95% de la sérotonine est produite dans l'intestin. La respiration 5-5 et le froid stimulent le tonus vagal. L'extrait hydro-alcoolique de gentiane (BloomLab) réactive l'axe intestin-cerveau.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ========================================================================= */}
          {/* BLOC 3 : COMMENT LE RESET BLOOM VOUS ACCOMPAGNE (TRANSITION DOUCE)        */}
          {/* ========================================================================= */}
          <section className="bg-gradient-to-br from-[#A8B8A0] via-[#16352B] to-[#3E4A3D] rounded-[36px] border border-[#c9a84c]/40 p-8 sm:p-12 shadow-2xl relative overflow-hidden">
            <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#c9a84c]/20 border border-[#c9a84c]/40 text-[#c9a84c] text-xs font-bold uppercase tracking-widest shadow-sm">
                <Sparkles className="w-4 h-4 text-[#C8AB8A]" />
                <span>Accompagnement Individualisé • Synergie Totum</span>
              </div>

              <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-[#FAF7F2] tracking-tight leading-tight">
                {lang === 'fr' 
                  ? "Comment le Reset Bloom vous accompagne" 
                  : lang === 'de'
                  ? "Wie der Bloom Reset Sie begleitet"
                  : "How the Bloom Reset Guides You"}
              </h2>

              <p className="text-sm sm:text-base text-[#d8d8d8] max-w-2xl mx-auto leading-relaxed">
                Le Totum végétal n'impose rien à votre physiologie : il lui apporte les molécules-signaux (amers digestifs, polyphénols antioxydants, adaptogènes régulateurs de l'axe HPA) nécessaires pour déverrouiller vos émonctoires et réactiver votre pharmacie intérieure.
              </p>

              <div className="grid sm:grid-cols-3 gap-4 pt-2 text-left">
                <div className="bg-[#FAF7F2] text-[#3E4A3D] rounded-2xl p-4 border border-[#E7DFD3] shadow-sm">
                  <div className="font-bold text-xs uppercase tracking-wide text-[#C8AB8A] mb-1">Étape 1</div>
                  <div className="font-black text-sm text-[#3E4A3D]">Anamnèse Ciblée</div>
                  <div className="text-xs text-gray-700 mt-1">Identification du profil systémique dominant avec ALMA.</div>
                </div>
                <div className="bg-[#FAF7F2] text-[#3E4A3D] rounded-2xl p-4 border border-[#E7DFD3] shadow-sm">
                  <div className="font-bold text-xs uppercase tracking-wide text-[#C8AB8A] mb-1">Étape 2</div>
                  <div className="font-black text-sm text-[#3E4A3D]">Séquençage en 6 Phases</div>
                  <div className="text-xs text-gray-700 mt-1">Décharge émonctorielle douce puis relance métabolique profonde.</div>
                </div>
                <div className="bg-[#FAF7F2] text-[#3E4A3D] rounded-2xl p-4 border border-[#E7DFD3] shadow-sm">
                  <div className="font-bold text-xs uppercase tracking-wide text-[#C8AB8A] mb-1">Étape 3</div>
                  <div className="font-black text-sm text-[#3E4A3D]">Autonomie Retrouvée</div>
                  <div className="text-xs text-gray-700 mt-1">Ancrage des 4 dimensions pour maintenir l'homéostasie durablement.</div>
                </div>
              </div>

              {/* Bouton CTA pour ALMA */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={() => onNavigate('chat')}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#C8AB8A] hover:bg-[#b45309] text-[#0d1117] font-black text-xs sm:text-sm uppercase tracking-wider transition-all shadow-xl hover:shadow-2xl flex items-center justify-center gap-3 cursor-pointer group"
                >
                  <Brain className="w-5 h-5 text-[#0d1117] group-hover:scale-110 transition-transform" />
                  <span>Commencer mon anamnèse avec ALMA</span>
                  <ArrowRight className="w-4 h-4 text-[#0d1117] group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              <p className="text-[11px] text-[#8b949e] font-mono">
                Anamnèse conversationnelle confidentielle • 15 questions guidées • Recommandation personnalisée de votre protocole
              </p>
            </div>
          </section>

          {/* SECTION A : LES PLANCHES BOTANIQUES ANATOMIQUES (RACINES EN NOIR SUR FOND CRÈME) */}
          <section id="planches-racines" className="scroll-mt-24 space-y-8">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <div className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-[#c9a84c]">
                Herbier Scientifique Bloom • Anatomie Souterraine
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-[#f5f0e8] tracking-tight">
                Les Racines du Vivant : la profondeur du Totum
              </h2>
              <p className="text-xs sm:text-sm text-[#b8b8b8] leading-relaxed">
                Les principes amers, les polysaccharides immunitaires et les adaptogènes majeurs sont concentrés au cœur des racines et des rhizomes. Dessinées à l'encre noire selon la tradition des planches naturalistes, ces illustrations révèlent l'architecture invisible qui ancre le pouvoir régénérant des plantes.
              </p>
            </div>

            {/* Grille des 4 planches avec racines apparentes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
              {/* Planche I */}
              <div className="bg-[#16352B] rounded-3xl border border-white/10 hover:border-[#c9a84c] transition-all p-4 flex flex-col justify-between shadow-xl group">
                <div className="rounded-2xl overflow-hidden bg-[#FAF7F2] p-3 border border-[#E7DFD3] shadow-inner mb-4 flex items-center justify-center aspect-[4/3]">
                  <img 
                    src={botanicalHeroImg} 
                    alt="Planche I : Gentiane et Bardane avec racines profondes" 
                    className="w-full h-full object-contain filter contrast-110 group-hover:scale-105 transition-transform duration-500" 
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <span className="text-[#c9a84c] font-bold uppercase">Planche I</span>
                    <span className="text-[#8b949e]">Radix Primordialis</span>
                  </div>
                  <h3 className="font-bold text-base text-[#FAF7F2] group-hover:text-[#c9a84c] transition-colors">
                    Gentiane &amp; Bardane
                  </h3>
                  <p className="text-xs text-[#FAF7F2]/80 leading-relaxed">
                    Racine pivotante maîtresse : inuline prébiotique, principes amers et déverrouillage de la filtration hépato-cutanée.
                  </p>
                  <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-[#c9a84c]">
                    <span>Cible : Émonctoires</span>
                    <span>Totum Phase 0</span>
                  </div>
                </div>
              </div>

              {/* Planche II */}
              <div className="bg-[#16352B] rounded-3xl border border-white/10 hover:border-[#86efac] transition-all p-4 flex flex-col justify-between shadow-xl group">
                <div className="rounded-2xl overflow-hidden bg-[#FAF7F2] p-3 border border-[#E7DFD3] shadow-inner mb-4 flex items-center justify-center aspect-[4/3]">
                  <img 
                    src={botanicalEmonctoiresImg} 
                    alt="Planche II : Prêle et Pissenlit avec chevelu racinaire" 
                    className="w-full h-full object-contain filter contrast-110 group-hover:scale-105 transition-transform duration-500" 
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <span className="text-[#86efac] font-bold uppercase">Planche II</span>
                    <span className="text-[#8b949e]">Emunctoria Renalia</span>
                  </div>
                  <h3 className="font-bold text-base text-[#FAF7F2] group-hover:text-[#86efac] transition-colors">
                    Prêle &amp; Pissenlit
                  </h3>
                  <p className="text-xs text-[#FAF7F2]/80 leading-relaxed">
                    Chevelu radiculaire et rhizomes : silicates organiques biodisponibles et élimination hydrique sans fuite de minéraux.
                  </p>
                  <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-[#86efac]">
                    <span>Cible : Reins &amp; Fascia</span>
                    <span>Drainage Doux</span>
                  </div>
                </div>
              </div>

              {/* Planche III */}
              <div className="bg-[#16352B] rounded-3xl border border-white/10 hover:border-[#C8AB8A] transition-all p-4 flex flex-col justify-between shadow-xl group">
                <div className="rounded-2xl overflow-hidden bg-[#FAF7F2] p-3 border border-[#E7DFD3] shadow-inner mb-4 flex items-center justify-center aspect-[4/3]">
                  <img 
                    src={botanicalHepaticImg} 
                    alt="Planche III : Réglisse et Chardon-Marie avec rhizomes" 
                    className="w-full h-full object-contain filter contrast-110 group-hover:scale-105 transition-transform duration-500" 
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <span className="text-[#C8AB8A] font-bold uppercase">Planche III</span>
                    <span className="text-[#8b949e]">Rhizoma Hepaticus</span>
                  </div>
                  <h3 className="font-bold text-base text-[#FAF7F2] group-hover:text-[#C8AB8A] transition-colors">
                    Réglisse &amp; Chardon
                  </h3>
                  <p className="text-xs text-[#FAF7F2]/80 leading-relaxed">
                    Rhizomes riches en glycyrrhizine et silymarine : régénération de la membrane hépatocytaire et relance biliaire.
                  </p>
                  <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-[#C8AB8A]">
                    <span>Cible : Foie &amp; Bile</span>
                    <span>Totum Phase 1</span>
                  </div>
                </div>
              </div>

              {/* Planche IV */}
              <div className="bg-[#16352B] rounded-3xl border border-white/10 hover:border-[#c9a84c] transition-all p-4 flex flex-col justify-between shadow-xl group">
                <div className="rounded-2xl overflow-hidden bg-[#FAF7F2] p-3 border border-[#E7DFD3] shadow-inner mb-4 flex items-center justify-center aspect-[4/3]">
                  <img 
                    src={botanicalVitalityImg} 
                    alt="Planche IV : Ashwagandha et Rhodiola avec racines adaptogènes" 
                    className="w-full h-full object-contain filter contrast-110 group-hover:scale-105 transition-transform duration-500" 
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <span className="text-[#c9a84c] font-bold uppercase">Planche IV</span>
                    <span className="text-[#8b949e]">Radix Adaptogena</span>
                  </div>
                  <h3 className="font-bold text-base text-[#FAF7F2] group-hover:text-[#c9a84c] transition-colors">
                    Ashwagandha &amp; Rhodiola
                  </h3>
                  <p className="text-xs text-[#FAF7F2]/80 leading-relaxed">
                    Withanolides et salidrosides : régulation de l'axe HPA du stress et recharge mitochondriale sans nervosité.
                  </p>
                  <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-[#c9a84c]">
                    <span>Cible : Axe HPA &amp; SEC</span>
                    <span>Stabilisation</span>
                  </div>
                </div>
              </div>

            </div>
          </section>

          {/* SECTION B : ONGLET PROTOCOLE, COMPLÉMENTS & CHRONOBIOLOGIE AVEC FREEMIUM GATE */}
          <section className="space-y-8">
            {/* Navigation Tabs */}
            <div className="flex flex-wrap justify-center gap-3">
              {[
                { id: 'protocol', label: lang === 'fr' ? '1. Le Protocole en 6 Phases' : '1. 6-Phase Protocol', icon: Activity },
                { id: 'supplements', label: lang === 'fr' ? '2. Compléments Synergiques' : '2. Synergistic Supplements', icon: FlaskConical },
                { id: 'chronobiology', label: lang === 'fr' ? '3. Chronobiologie Circadienne' : '3. Chronobiology', icon: Clock }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2.5 px-6 py-3 rounded-2xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                    activeTab === tab.id 
                      ? 'bg-[#c9a84c] text-[#0d1117] shadow-lg font-black' 
                      : 'bg-[#3E4A3D]/40 text-[#F9F6F0]/80 hover:text-white hover:bg-[#3E4A3D] border border-white/10'
                  }`}
                >
                  <tab.icon className="w-4 h-4 stroke-[2]" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* FREEMIUM GATE ENGLOBANT LE DÉTAIL DES PHASES ET PROTOCOLES */}
            <FreemiumPaywallGate
              onNavigate={onNavigate}
              lang={lang}
              title="Débloquez le Protocole Complet du Reset Homéostasique"
              subtitle="L’aperçu des 4 planches botaniques est en accès libre. Débloquez l’intégralité des 6 phases d’extraction, les posologies précises, le dial chronobiologique et l’ensemble des modules de l’Académie avec votre abonnement."
              bulletPoints={[
                "6 phases d'action séquentielles avec paramètres thermiques d'extraction (Phase A & B)",
                "Chronobiologie circadienne complète (Matin, Midi, Soir, Nuit)",
                "Dosages précis des cofacteurs et compléments synergiques de terrain",
                "Accès débloqué aux 4 Architectures, 7 Terrains et Protocoles Ciblés"
              ]}
              teaserContent={
                /* Petit aperçu préliminaire accessible à tous */
                <div className="p-6 rounded-3xl bg-[#16352B] border border-white/10 space-y-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#c9a84c] uppercase tracking-wider font-mono">
                    <Compass className="w-4 h-4 text-[#c9a84c]" />
                    <span>Aperçu de la Démarche • Déroulé en 6 Étapes</span>
                  </div>
                  <div className="grid sm:grid-cols-3 lg:grid-cols-6 gap-3 text-center text-xs">
                    <div className="p-3 rounded-xl bg-[#3E4A3D] border border-white/10 space-y-1">
                      <span className="font-mono text-[#c9a84c] font-black text-sm block">0</span>
                      <strong className="text-[#FAF7F2] block truncate">Émonctoires</strong>
                      <span className="text-[10px] text-[#FAF7F2]/60">Drainage doux</span>
                    </div>
                    <div className="p-3 rounded-xl bg-[#3E4A3D] border border-white/10 space-y-1">
                      <span className="font-mono text-[#c9a84c] font-black text-sm block">1</span>
                      <strong className="text-[#FAF7F2] block truncate">Hépatique</strong>
                      <span className="text-[10px] text-[#FAF7F2]/60">Relance biliaire</span>
                    </div>
                    <div className="p-3 rounded-xl bg-[#3E4A3D] border border-white/10 space-y-1">
                      <span className="font-mono text-[#c9a84c] font-black text-sm block">2</span>
                      <strong className="text-[#FAF7F2] block truncate">Totum</strong>
                      <span className="text-[10px] text-[#FAF7F2]/60">Drainage profond</span>
                    </div>
                    <div className="p-3 rounded-xl bg-[#3E4A3D] border border-white/10 space-y-1">
                      <span className="font-mono text-[#c9a84c] font-black text-sm block">3</span>
                      <strong className="text-[#FAF7F2] block truncate">Régénération</strong>
                      <span className="text-[10px] text-[#FAF7F2]/60">Axe HPA &amp; SEC</span>
                    </div>
                    <div className="p-3 rounded-xl bg-[#3E4A3D] border border-white/10 space-y-1">
                      <span className="font-mono text-[#c9a84c] font-black text-sm block">4</span>
                      <strong className="text-[#FAF7F2] block truncate">Consolidation</strong>
                      <span className="text-[10px] text-[#FAF7F2]/60">Fascia &amp; Ténségrité</span>
                    </div>
                    <div className="p-3 rounded-xl bg-[#3E4A3D] border border-white/10 space-y-1">
                      <span className="font-mono text-[#c9a84c] font-black text-sm block">∞</span>
                      <strong className="text-[#FAF7F2] block truncate">Pauses</strong>
                      <span className="text-[10px] text-[#FAF7F2]/60">Homéostasie</span>
                    </div>
                  </div>
                </div>
              }
            >
              {/* CONTENU PROTÉGÉ : VISIBLE UNIQUEMENT AUX ABONNÉS */}
              <div className="space-y-12">
                
                {/* 1. ONGLET PROTOCOLE */}
                {activeTab === 'protocol' && (
                  <div className="space-y-8 animate-in fade-in duration-500">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {resetSteps.map((step, idx) => (
                        <div 
                          key={idx}
                          onClick={() => {
                            const phase = resetPhasesData.find(p => p.key === step.phaseKey);
                            if (phase) setSelectedPhase(phase);
                          }}
                          className="bg-[#16352B] p-6 rounded-3xl border border-white/10 hover:border-[#c9a84c] transition-all duration-300 relative group overflow-hidden cursor-pointer shadow-lg flex flex-col justify-between"
                        >
                          <div>
                            <div className="text-[10px] font-mono font-bold text-[#c9a84c] tracking-[0.2em] mb-2 uppercase">
                              {step.subtitle}
                            </div>
                            <div className="flex items-center justify-between mb-3">
                              <h3 className="text-base font-bold text-[#FAF7F2] group-hover:text-[#c9a84c] transition-colors">
                                {step.id} : {step.title}
                              </h3>
                              <div className="p-2 rounded-xl bg-[#3E4A3D] border border-white/10 text-[#c9a84c]">
                                <step.icon className="w-4 h-4 stroke-[1.5]" />
                              </div>
                            </div>
                            <p className="text-xs text-[#FAF7F2]/80 leading-relaxed mb-6">
                              {step.desc}
                            </p>
                          </div>

                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              const phase = resetPhasesData.find(p => p.key === step.phaseKey);
                              if (phase) setSelectedPhase(phase);
                            }}
                            className="w-full py-2.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider bg-[#3E4A3D] hover:bg-[#c9a84c] hover:text-[#0d1117] text-[#c9a84c] border border-[#c9a84c]/30 transition-all cursor-pointer text-center"
                          >
                            Consulter les dosages &rarr;
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 2. ONGLET COMPLÉMENTS */}
                {activeTab === 'supplements' && (
                  <div className="space-y-6 animate-in fade-in duration-500">
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {supplements.map((item, idx) => (
                        <div key={idx} className="p-6 rounded-3xl bg-[#16352B] border border-white/10 space-y-3 shadow-md">
                          <div className="flex justify-between items-start">
                            <h4 className="font-bold text-sm text-[#FAF7F2]">{item.name}</h4>
                            <span className="text-[10px] font-mono bg-[#c9a84c]/20 text-[#c9a84c] px-2 py-0.5 rounded-full font-bold">
                              {item.dose}
                            </span>
                          </div>
                          <p className="text-xs text-[#FAF7F2]/80 leading-relaxed">
                            {item.role}
                          </p>
                          <div className="pt-2 border-t border-white/5 text-[10px] font-mono text-[#86efac]">
                            Cible : {item.target}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 3. ONGLET CHRONOBIOLOGIE */}
                {activeTab === 'chronobiology' && (
                  <div className="space-y-6 animate-in fade-in duration-500">
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                      {chronoPhases.map((phase) => (
                        <div key={phase.id} className="p-6 rounded-3xl bg-[#16352B] border border-white/10 space-y-3 shadow-md flex flex-col justify-between">
                          <div>
                            <div className="w-10 h-10 rounded-xl bg-[#3E4A3D] border border-white/10 flex items-center justify-center mb-3" style={{ color: phase.color }}>
                              <phase.icon className="w-5 h-5" />
                            </div>
                            <h4 className="font-bold text-sm text-[#FAF7F2] mb-1">{phase.title}</h4>
                            <p className="text-xs text-[#FAF7F2]/80 leading-relaxed">
                              {phase.desc}
                            </p>
                          </div>
                          <span className="text-[10px] font-mono text-[#c9a84c] uppercase tracking-wider block pt-2 border-t border-white/5">
                            Synchronisation circadienne
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            </FreemiumPaywallGate>
          </section>

          {/* SECTION C : RECOMMANDATION ALMA & LIENS VERS LA BOUTIQUE */}
          <section className="p-8 sm:p-12 rounded-[32px] bg-gradient-to-br from-[#A8B8A0] to-[#3E4A3D] border border-[#c9a84c]/40 shadow-2xl relative overflow-hidden">
            <div className="max-w-3xl space-y-4">
              <span className="inline-block px-3 py-1 bg-[#c9a84c]/20 text-[#c9a84c] text-[10px] font-bold uppercase tracking-widest rounded-full border border-[#c9a84c]/30 font-mono">
                {almaT.badge || "Conseil Systémique d’ALMA"}
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-[#FAF7F2]">
                {almaT.title || "Votre Bilan Systémique Personnalisé"}
              </h3>
              <p className="text-xs sm:text-sm text-[#FAF7F2]/80 leading-relaxed">
                Le Reset Homéostasique n'est pas un protocole générique : il s'adapte à votre architecture dominante et à votre charge allostatique du moment. Dialoguez avec ALMA pour établir votre anamnèse complète en 15 questions.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <button 
                  onClick={() => onNavigate('chat')}
                  className="px-6 py-3 bg-[#c9a84c] hover:bg-[#d8b85c] text-[#0d1117] rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <span>Démarrer l'Anamnèse ALMA</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => onNavigate('product-detail', 'bloomlab')}
                  className="px-6 py-3 bg-[#3E4A3D] hover:bg-[#A8B8A0] text-[#FAF7F2] border border-white/10 hover:border-[#c9a84c] rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Découvrir l'Extracteur BloomLab®</span>
                </button>
              </div>
            </div>
          </section>

        </main>
      </div>
    </GlossaryProvider>
  );
}