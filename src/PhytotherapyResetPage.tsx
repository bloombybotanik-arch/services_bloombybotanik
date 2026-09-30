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
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-[#0d1117]/85 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="bg-[#161b22] text-[#f5f0e8] w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[36px] shadow-2xl relative border border-[#c9a84c]/40"
        onClick={e => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 w-11 h-11 rounded-full bg-[#0d1117] hover:bg-[#D97706] text-white flex items-center justify-center transition-all shadow-md z-10 cursor-pointer border border-[#30363d]"
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
            <div className="p-5 bg-[#0d1117] rounded-2xl border border-[#30363d]">
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
                    <Zap className="w-4 h-4 text-[#D97706]" />
                    <span>Leviers d’Action</span>
                  </h3>
                  <ul className="space-y-2 text-xs text-[#b8b8b8]">
                    {phase.actions.map((act, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="text-[#D97706]">•</span>
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
        className="min-h-screen bg-[#0d1117] text-[#c9d1d9] font-sans selection:bg-[#c9a84c]/30 selection:text-white pb-24"
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

        {/* 2. Hero Section : Élégance Sombre & Identité Bloom */}
        <header className="relative border-b border-[#30363d] bg-gradient-to-b from-[#161b22] via-[#0d1117] to-[#161b22] pt-14 pb-16 px-4 sm:px-6">
          <div className="max-w-5xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#c9a84c]/10 border border-[#c9a84c]/30 text-[#c9a84c] text-xs font-bold uppercase tracking-widest shadow-sm">
              <Sparkles className="w-4 h-4 text-[#c9a84c]" />
              <span>Phytothérapie Systémique • Reset Homéostasique</span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-[#f5f0e8] tracking-tight leading-[1.1]">
              {lang === 'fr' 
                ? "Le Reset Homéostasique : relancer la pharmacie intérieure" 
                : lang === 'de'
                ? "Der Homöostatische Reset : Die innere Apotheke reaktivieren"
                : "The Homeostatic Reset: Reactivating the Inner Pharmacy"}
            </h1>

            <p className="text-lg sm:text-xl text-[#f5f0e8] max-w-3xl mx-auto font-normal leading-relaxed italic border-l-2 sm:border-l-0 border-[#c9a84c] pl-4 sm:pl-0">
              « Votre corps n’est pas cassé. Il est verrouillé par une charge adaptative devenue trop lourde. »
            </p>

            <p className="text-sm sm:text-base text-[#b8b8b8] max-w-3xl mx-auto font-normal leading-relaxed">
              Une démarche biologique en 6 phases séquentielles qui libère les émonctoires, allège la charge allostatique et réveille les mécanismes naturels d'auto-régulation grâce au Totum des plantes médicinales.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <button
                onClick={() => {
                  const el = document.getElementById('planches-racines');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-3.5 rounded-xl bg-[#c9a84c] hover:bg-[#d8b85c] text-[#0d1117] font-black text-xs uppercase tracking-wider transition-all shadow-lg hover:shadow-xl flex items-center gap-2 cursor-pointer"
              >
                <Leaf className="w-4 h-4" />
                <span>Découvrir les Planches Botaniques</span>
              </button>

              <button
                onClick={() => onNavigate('protocoles')}
                className="px-6 py-3.5 rounded-xl bg-[#161b22] hover:bg-[#21262d] text-white border border-[#30363d] hover:border-[#c9a84c] text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
              >
                <Layers className="w-4 h-4 text-[#c9a84c]" />
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
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
              {/* Planche I */}
              <div className="bg-[#161b22] rounded-3xl border border-[#30363d] hover:border-[#c9a84c] transition-all p-4 flex flex-col justify-between shadow-xl group">
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
                  <h3 className="font-bold text-base text-white group-hover:text-[#c9a84c] transition-colors">
                    Gentiane &amp; Bardane
                  </h3>
                  <p className="text-xs text-[#b8b8b8] leading-relaxed">
                    Racine pivotante maîtresse : inuline prébiotique, principes amers et déverrouillage de la filtration hépato-cutanée.
                  </p>
                  <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-[#c9a84c]">
                    <span>Cible : Émonctoires</span>
                    <span>Totum Phase 0</span>
                  </div>
                </div>
              </div>

              {/* Planche II */}
              <div className="bg-[#161b22] rounded-3xl border border-[#30363d] hover:border-[#86efac] transition-all p-4 flex flex-col justify-between shadow-xl group">
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
                  <h3 className="font-bold text-base text-white group-hover:text-[#86efac] transition-colors">
                    Prêle &amp; Pissenlit
                  </h3>
                  <p className="text-xs text-[#b8b8b8] leading-relaxed">
                    Chevelu radiculaire et rhizomes : silicates organiques biodisponibles et élimination hydrique sans fuite de minéraux.
                  </p>
                  <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-[#86efac]">
                    <span>Cible : Reins &amp; Fascia</span>
                    <span>Drainage Doux</span>
                  </div>
                </div>
              </div>

              {/* Planche III */}
              <div className="bg-[#161b22] rounded-3xl border border-[#30363d] hover:border-[#D97706] transition-all p-4 flex flex-col justify-between shadow-xl group">
                <div className="rounded-2xl overflow-hidden bg-[#FAF7F2] p-3 border border-[#E7DFD3] shadow-inner mb-4 flex items-center justify-center aspect-[4/3]">
                  <img 
                    src={botanicalHepaticImg} 
                    alt="Planche III : Réglisse et Chardon-Marie avec rhizomes" 
                    className="w-full h-full object-contain filter contrast-110 group-hover:scale-105 transition-transform duration-500" 
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <span className="text-[#D97706] font-bold uppercase">Planche III</span>
                    <span className="text-[#8b949e]">Rhizoma Hepaticus</span>
                  </div>
                  <h3 className="font-bold text-base text-white group-hover:text-[#D97706] transition-colors">
                    Réglisse &amp; Chardon
                  </h3>
                  <p className="text-xs text-[#b8b8b8] leading-relaxed">
                    Rhizomes riches en glycyrrhizine et silymarine : régénération de la membrane hépatocytaire et relance biliaire.
                  </p>
                  <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-[#D97706]">
                    <span>Cible : Foie &amp; Bile</span>
                    <span>Totum Phase 1</span>
                  </div>
                </div>
              </div>

              {/* Planche IV */}
              <div className="bg-[#161b22] rounded-3xl border border-[#30363d] hover:border-[#c9a84c] transition-all p-4 flex flex-col justify-between shadow-xl group">
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
                  <h3 className="font-bold text-base text-white group-hover:text-[#c9a84c] transition-colors">
                    Ashwagandha &amp; Rhodiola
                  </h3>
                  <p className="text-xs text-[#b8b8b8] leading-relaxed">
                    Withanolides et salidrosides : régulation de l'axe HPA du stress et recharge mitochondriale sans nervosité.
                  </p>
                  <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-[#c9a84c]">
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
                      : 'bg-[#161b22] text-[#8b949e] hover:text-white border border-[#30363d]'
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
                <div className="p-6 rounded-3xl bg-[#161b22] border border-[#30363d] space-y-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#c9a84c] uppercase tracking-wider font-mono">
                    <Compass className="w-4 h-4 text-[#c9a84c]" />
                    <span>Aperçu de la Démarche • Déroulé en 6 Étapes</span>
                  </div>
                  <div className="grid sm:grid-cols-3 lg:grid-cols-6 gap-3 text-center text-xs">
                    <div className="p-3 rounded-xl bg-[#0d1117] border border-white/5 space-y-1">
                      <span className="font-mono text-[#c9a84c] font-black text-sm block">0</span>
                      <strong className="text-white block truncate">Émonctoires</strong>
                      <span className="text-[10px] text-[#8b949e]">Drainage doux</span>
                    </div>
                    <div className="p-3 rounded-xl bg-[#0d1117] border border-white/5 space-y-1">
                      <span className="font-mono text-[#c9a84c] font-black text-sm block">1</span>
                      <strong className="text-white block truncate">Hépatique</strong>
                      <span className="text-[10px] text-[#8b949e]">Relance biliaire</span>
                    </div>
                    <div className="p-3 rounded-xl bg-[#0d1117] border border-white/5 space-y-1">
                      <span className="font-mono text-[#c9a84c] font-black text-sm block">2</span>
                      <strong className="text-white block truncate">Totum</strong>
                      <span className="text-[10px] text-[#8b949e]">Drainage profond</span>
                    </div>
                    <div className="p-3 rounded-xl bg-[#0d1117] border border-white/5 space-y-1">
                      <span className="font-mono text-[#c9a84c] font-black text-sm block">3</span>
                      <strong className="text-white block truncate">Régénération</strong>
                      <span className="text-[10px] text-[#8b949e]">Axe HPA &amp; SEC</span>
                    </div>
                    <div className="p-3 rounded-xl bg-[#0d1117] border border-white/5 space-y-1">
                      <span className="font-mono text-[#c9a84c] font-black text-sm block">4</span>
                      <strong className="text-white block truncate">Consolidation</strong>
                      <span className="text-[10px] text-[#8b949e]">Fascia &amp; Ténségrité</span>
                    </div>
                    <div className="p-3 rounded-xl bg-[#0d1117] border border-white/5 space-y-1">
                      <span className="font-mono text-[#c9a84c] font-black text-sm block">∞</span>
                      <strong className="text-white block truncate">Pauses</strong>
                      <span className="text-[10px] text-[#8b949e]">Homéostasie</span>
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
                          className="bg-[#161b22] p-6 rounded-3xl border border-[#30363d] hover:border-[#c9a84c] transition-all duration-300 relative group overflow-hidden cursor-pointer shadow-lg flex flex-col justify-between"
                        >
                          <div>
                            <div className="text-[10px] font-mono font-bold text-[#c9a84c] tracking-[0.2em] mb-2 uppercase">
                              {step.subtitle}
                            </div>
                            <div className="flex items-center justify-between mb-3">
                              <h3 className="text-base font-bold text-white group-hover:text-[#c9a84c] transition-colors">
                                {step.id} : {step.title}
                              </h3>
                              <div className="p-2 rounded-xl bg-[#0d1117] border border-[#30363d] text-[#c9a84c]">
                                <step.icon className="w-4 h-4 stroke-[1.5]" />
                              </div>
                            </div>
                            <p className="text-xs text-[#b8b8b8] leading-relaxed mb-6">
                              {step.desc}
                            </p>
                          </div>

                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              const phase = resetPhasesData.find(p => p.key === step.phaseKey);
                              if (phase) setSelectedPhase(phase);
                            }}
                            className="w-full py-2.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider bg-[#0d1117] hover:bg-[#c9a84c] hover:text-[#0d1117] text-[#c9a84c] border border-[#c9a84c]/30 transition-all cursor-pointer text-center"
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
                        <div key={idx} className="p-6 rounded-3xl bg-[#161b22] border border-[#30363d] space-y-3 shadow-md">
                          <div className="flex justify-between items-start">
                            <h4 className="font-bold text-sm text-white">{item.name}</h4>
                            <span className="text-[10px] font-mono bg-[#c9a84c]/20 text-[#c9a84c] px-2 py-0.5 rounded-full font-bold">
                              {item.dose}
                            </span>
                          </div>
                          <p className="text-xs text-[#b8b8b8] leading-relaxed">
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
                        <div key={phase.id} className="p-6 rounded-3xl bg-[#161b22] border border-[#30363d] space-y-3 shadow-md flex flex-col justify-between">
                          <div>
                            <div className="w-10 h-10 rounded-xl bg-[#0d1117] border border-[#30363d] flex items-center justify-center mb-3" style={{ color: phase.color }}>
                              <phase.icon className="w-5 h-5" />
                            </div>
                            <h4 className="font-bold text-sm text-white mb-1">{phase.title}</h4>
                            <p className="text-xs text-[#b8b8b8] leading-relaxed">
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
          <section className="p-8 sm:p-12 rounded-[32px] bg-gradient-to-br from-[#161b22] to-[#1c180e] border border-[#c9a84c]/40 shadow-2xl relative overflow-hidden">
            <div className="max-w-3xl space-y-4">
              <span className="inline-block px-3 py-1 bg-[#c9a84c]/20 text-[#c9a84c] text-[10px] font-bold uppercase tracking-widest rounded-full border border-[#c9a84c]/30 font-mono">
                {almaT.badge || "Conseil Systémique d’ALMA"}
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                {almaT.title || "Votre Bilan Systémique Personnalisé"}
              </h3>
              <p className="text-xs sm:text-sm text-[#b8b8b8] leading-relaxed">
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
                  className="px-6 py-3 bg-[#0d1117] hover:bg-[#21262d] text-white border border-[#30363d] hover:border-[#c9a84c] rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer"
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
