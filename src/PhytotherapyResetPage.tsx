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
  Leaf,
  Radio,
  Sliders,
  HelpCircle,
  Repeat,
  HeartHandshake,
  Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { resetPhasesData, ResetPhaseDetail } from './data/resetPhases';
import { chronobiologyData } from './data/chronobiology';
import { translations, Language } from './translations';
import { TooltipLexique } from './components/TooltipLexique';
import { GlossaryProvider } from './context/GlossaryContext';
import AcademyNavigation from './components/AcademyNavigation';
import FreemiumPaywallGate from './components/FreemiumPaywallGate';

// Illustrations naturalistes des racines au style herbier scientifique du XIXe siècle (encre noire sur fond crème chaud)
const botanicalHeroImg = "/images/botanical_roots_hero_1790693840047.jpg";
const botanicalEmonctoiresImg = "/images/botanical_roots_emonctoires_1790693854850.jpg";
const botanicalHepaticImg = "/images/botanical_roots_hepatic_1790693867525.jpg";
const botanicalVitalityImg = "/images/botanical_roots_vitality_1790693881999.jpg";

/**
 * Composant Tooltip interactif pour clarifier le jargon médical (Allostasie, Émonctoires, etc.)
 */
const TermTooltip: React.FC<{ term: string; definition: string; children?: React.ReactNode }> = ({ 
  term, 
  definition, 
  children 
}) => {
  const [open, setOpen] = useState(false);
  return (
    <span 
      className="relative inline-block"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="underline decoration-[#C8AB8A] decoration-dotted underline-offset-4 font-semibold text-inherit hover:text-[#C8AB8A] transition-colors cursor-help inline-flex items-center gap-1 text-left"
        aria-label={`${term}: ${definition}`}
      >
        <span>{children || term}</span>
        <span className="w-3.5 h-3.5 rounded-full bg-[#C8AB8A]/25 text-[#C8AB8A] text-[9px] font-bold flex items-center justify-center shrink-0">?</span>
      </button>
      {open && (
        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 sm:w-80 p-3.5 bg-[#0F261E] text-[#F9F6F0] text-xs rounded-2xl shadow-2xl border border-[#C8AB8A]/40 z-50 pointer-events-none animate-in fade-in zoom-in-95 duration-150 leading-relaxed block text-left">
          <strong className="block text-[#C8AB8A] font-bold uppercase tracking-wider text-[10px] mb-1 font-mono">
            {term}
          </strong>
          <span className="text-[#F9F6F0]/90 text-xs font-normal">
            {definition}
          </span>
          <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#0F261E]" />
        </span>
      )}
    </span>
  );
};

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
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-[#0F261E]/80 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="bg-[#0F261E] text-[#F9F6F0] w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl relative border border-[#C8AB8A]/40"
        onClick={e => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 w-11 h-11 rounded-full bg-[#3E4A3D] hover:bg-[#2D372C] text-[#F9F6F0] flex items-center justify-center transition-all shadow-md z-10 cursor-pointer border border-white/10"
          aria-label="Fermer"
        >
          <X className="w-5 h-5 stroke-[2]" />
        </button>

        <div className="p-8 md:p-12">
          <div className="mb-8">
            <div className="text-[10px] font-mono font-bold text-[#C8AB8A] tracking-[0.25em] mb-2 uppercase">
              {phase.subtitle}
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-white mb-4 leading-tight">
              {phase.title} : {phase.name}
            </h2>
            <div className="p-5 bg-[#3E4A3D] rounded-2xl border border-[#E7DFD3]/20">
              <p className="text-[#F9F6F0] text-sm md:text-base font-normal leading-relaxed italic">
                {phase.long_text}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#C8AB8A]" />
                <span>Objectifs de la Phase</span>
              </h3>
              <ul className="space-y-3">
                {phase.objectives.map((obj, idx) => (
                  <li key={idx} className="flex gap-2.5 text-xs sm:text-sm text-[#F9F6F0]/80 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C8AB8A] shrink-0 mt-2" />
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>

              <h3 className="text-base font-bold text-white mt-8 mb-4 flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#C8AB8A]" />
                <span>Systèmes Biologiques Clés</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {phase.focus_systems.map((sys, idx) => (
                  <span key={idx} className="px-3 py-1.5 bg-[#3E4A3D] text-[#C8AB8A] border border-[#C8AB8A]/30 rounded-xl text-[11px] font-mono font-bold uppercase">
                    {sys}
                  </span>
                ))}
              </div>
            </div>

            <div>
              {phase.core_plants && (
                <>
                  <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                    <FlaskConical className="w-4 h-4 text-[#C8AB8A]" />
                    <span>Plantes Clés du Totum</span>
                  </h3>
                  <div className="space-y-3 mb-6">
                    {phase.core_plants.map((plant, idx) => (
                      <div key={idx} className="p-3.5 bg-[#3E4A3D] rounded-xl border border-white/10">
                        <div className="flex justify-between items-start mb-1">
                          <span className="font-bold text-white text-xs sm:text-sm">{plant.nom}</span>
                          <span className="text-[9px] bg-[#C8AB8A]/20 text-[#C8AB8A] px-2 py-0.5 rounded-full uppercase tracking-wider font-mono">
                            {plant.partie}
                          </span>
                        </div>
                        <p className="text-xs text-[#F9F6F0]/80 leading-relaxed italic">{plant.role}</p>
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
                  <ul className="space-y-2 text-xs text-[#F9F6F0]/80">
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
  const [activeTab, setActiveTab] = useState<'protocol' | 'supplements' | 'chronobiology'>('protocol');
  const [selectedPhase, setSelectedPhase] = useState<ResetPhaseDetail | null>(null);

  // Phases renommées avec action biologique précise
  const tuningPhases = [
    {
      id: "Phase 0",
      key: "phase_0",
      title: "Déverrouiller les Émonctoires",
      duration: "7 Jours",
      role: "Ouverture des 5 voies d'évacuation (reins, peau, intestins, poumons, lymphe). Sans portes ouvertes, aucune détoxification hépatique n'est tolérée.",
      icon: Wind,
      plants: "Pissenlit racine, Prêle, Orthosiphon, Bardane",
      targetSystem: "Filtres Rénal & Cutané"
    },
    {
      id: "Phase 1",
      key: "phase_1",
      title: "Réveiller le Filtre Hépatique",
      duration: "21 Jours",
      role: "Activation douce de la Phase I & Phase II hépatiques et relance de la motricité biliaire sans choc thermique.",
      icon: Zap,
      plants: "Gentiane, Radis noir, Artichaut, Chrysanthellum",
      targetSystem: "Foie, Vésicule & Phase II"
    },
    {
      id: "Phase 2",
      key: "pause_1",
      title: "Drainage Profond du Totum",
      duration: "14 Jours",
      role: "Purification des liquides interstitiels et drainage lymphatique profond assisté par les saponines et les polyphénols.",
      icon: Activity,
      plants: "Sève Fondamentale, Sureau, Salsepareille",
      targetSystem: "Lymphe & Milieu Interstitiel"
    },
    {
      id: "Phase 3",
      key: "phase_2",
      title: "Régénération de l'Axe HPA",
      duration: "28 Jours",
      role: "Apaisement de la boucle hypophyse-surrénales, stabilisation du cortisol circadien et recharge mitochondriale.",
      icon: Shield,
      plants: "Ashwagandha, Rhodiola, Schisandra",
      targetSystem: "Axe Neuro-Surrénalien & Sommeil"
    },
    {
      id: "Phase 4",
      key: "phase_3",
      title: "Consolidation & Téguments",
      duration: "14 Jours",
      role: "Fixation des minéraux et renforcement de la matrice collagénique du fascia et des barrières digestives.",
      icon: Layers,
      plants: "Prêle, Ortie racine, Silicium végétal",
      targetSystem: "Fascia, Barrière Intestinale & Os"
    },
    {
      id: "Phase ∞",
      key: "phase_pause",
      title: "Pauses Intégratives & Homéostasie",
      duration: "Rythme libre",
      role: "Périodes régulières de repos phytochimique pour laisser le corps consolider son nouvel équilibre d'auto-régulation autonome.",
      icon: Repeat,
      plants: "Infusions douces, eau peu minéralisée, repos",
      targetSystem: "Homéostasie Autonome Retrouvée"
    }
  ];

  const supplements = [
    { name: "Oméga-3 EPA/DHA", dose: "2g / jour", role: "Soutien des membranes cellulaires et régulation de l'inflammation lipidique.", target: "Membranes & SRA" },
    { name: "Magnésium Bisglycinate", dose: "300mg / soir", role: "Relâchement neuro-musculaire et activation de plus de 300 enzymes vitales.", target: "Axe HPA & Sommeil" },
    { name: "L-Glutamine", dose: "5g / matin", role: "Carburant préférentiel des entérocytes et consolidation de la barrière intestinale.", target: "T1 Microbiome & A2" },
    { name: "Vitamine D3 + K2 (MK7)", dose: "2000 UI / 100µg", role: "Modulation immunitaire, expression génique et fixation minérale osseuse.", target: "Immunité & Fascia" },
    { name: "Sélénium Méthionine", dose: "200µg / jour", role: "Cofacteur de la désiodase thyroïdienne et protection antioxydante (glutathion).", target: "Métabolisme T5" },
    { name: "Glycine Pure", dose: "3g / soir", role: "Acide aminé fondamental de la matrice collagénique du fascia et du sommeil lent.", target: "Fascia & Sommeil" }
  ];

  const chronoPhases = [
    { id: 'matin', title: '07h00 - 09h00 • Réveil & Émonctoires', icon: Sun, color: '#C8AB8A', desc: "Ouverture hépato-rénale, hydratation à température corporelle et stimulation du péristaltisme." },
    { id: 'midi', title: '12h00 - 14h00 • Puissance Métabolique', icon: Zap, color: '#C8AB8A', desc: "Assimilation enzymatique maximale, stabilisation glycémique post-prandiale et soutien pancréatique." },
    { id: 'soir', title: '18h00 - 20h00 • Décharge Allostatique', icon: Moon, color: '#8A8177', desc: "Baisse du cortisol, induction vagale et allègement de la charge digestive avant le repos." },
    { id: 'nuit', title: '22h00 - 04h00 • Régénération & Autophagie', icon: Sparkles, color: '#C8AB8A', desc: "Nettoyage glymphatique cérébral, réparation tissulaire et recyclage cellulaire profond." }
  ];

  return (
    <GlossaryProvider pageKey="phytotherapie-reset">
      <div 
        className="w-full min-h-screen bg-[#F9F6F0] text-[#3E4A3D] font-sans selection:bg-[#C8AB8A]/30 selection:text-[#0F261E] pb-24"
        data-bloom-academie="true"
      >
        {/* Navigation supérieure de l'Académie */}
        <AcademyNavigation
          currentView="phytotherapie-reset"
          onNavigate={onNavigate}
          currentPageTitle={lang === 'fr' ? 'Le Reset Homéostasique' : lang === 'de' ? 'Der Homöostatische Reset' : 'The Homeostatic Reset'}
          sectionName={lang === 'fr' ? 'Comprendre le Corps' : lang === 'de' ? 'Den Körper verstehen' : 'Understanding the Body'}
          lang={lang}
        />

        {/* ========================================================================= */}
        {/* 1. HERO SECTION (LE "POURQUOI")                                           */}
        {/* ========================================================================= */}
        <header className="w-full bg-[#1E2E25] text-white border-b border-white/10 mb-14 relative overflow-hidden">
          <div className="px-4 md:px-8 py-14 md:py-24 max-w-6xl mx-auto flex flex-col items-center text-center relative z-10">
            
            {/* Badge de positionnement */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-[#C8AB8A] text-xs font-bold uppercase tracking-widest shadow-xs mb-6">
              <Sparkles className="w-4 h-4 text-[#C8AB8A]" />
              <span>Ingénierie Biologique &amp; Homéostasie</span>
            </div>

            {/* Titre Principal imposé */}
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15] mb-6 max-w-4xl">
              Le Reset Homéostasique : Comment les plantes rééquilibrent vos systèmes, pas seulement vos cellules.
            </h1>

            {/* Sous-titre imposé */}
            <p className="text-base sm:text-lg md:text-xl text-[#F9F6F0]/90 max-w-3xl mx-auto font-normal leading-relaxed mb-10">
              Une démarche d'ingénierie biologique en 6 phases pour libérer vos{' '}
              <TermTooltip 
                term="Émonctoires" 
                definition="Les 5 organes filtres naturels de l'organisme (foie, reins, intestins, poumons, peau) chargés d'évacuer les déchets métaboliques et toxiques."
              >
                émonctoires
              </TermTooltip>{' '}
              et réactiver votre pharmacie intérieure.
            </p>

            {/* Split-Screen Comparatif : Approche Symptomatique vs Approche Systémique Bloom */}
            <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6 text-left my-4">
              
              {/* Colonne 1 : Approche Symptomatique Traditionnelle */}
              <div className="bg-white/5 rounded-2xl border border-white/15 p-6 sm:p-8 flex flex-col justify-between backdrop-blur-xs">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#8A8177] font-bold">
                      Approche Symptomatique
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-white/70 text-[10px] font-bold">
                      Réductionniste
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                    <Lock className="w-4 h-4 text-[#8A8177] shrink-0" />
                    <span>1 Molécule → 1 Récepteur Isolé</span>
                  </h3>

                  <p className="text-xs sm:text-sm text-white/90 leading-relaxed mb-4">
                    La pharmacologie classique isole un principe actif pur pour forcer ou inhiber un récepteur cellulaire unique. Le corps réagit de manière unilatérale.
                  </p>

                  <ul className="space-y-2.5 text-xs text-white mb-6">
                    <li className="flex items-start gap-2 text-white">
                      <span className="text-[#C8AB8A] font-bold text-sm leading-none">•</span>
                      <span className="text-white font-medium">Tolérance rapide et accoutumance cellulaire</span>
                    </li>
                    <li className="flex items-start gap-2 text-white">
                      <span className="text-[#C8AB8A] font-bold text-sm leading-none">•</span>
                      <span className="text-white font-medium">Surcharge des émonctoires hépatiques et rénaux</span>
                    </li>
                    <li className="flex items-start gap-2 text-white">
                      <span className="text-[#C8AB8A] font-bold text-sm leading-none">•</span>
                      <span className="text-white font-medium">Masquage du symptôme sans lever le verrou d'origine</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-3 border-t border-white/10 text-[11px] font-mono text-[#C8AB8A]">
                  Résultat : Dérive adaptative &amp; épuisement du terrain
                </div>
              </div>

              {/* Colonne 2 : Approche Systémique Bloom */}
              <div className="bg-[#3E4A3D] rounded-2xl border-2 border-[#C8AB8A] p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#C8AB8A]/10 rounded-full blur-2xl pointer-events-none" />
                
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#C8AB8A] font-bold">
                      Approche Systémique Bloom
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#C8AB8A] text-[#0F261E] text-[10px] font-black uppercase tracking-wider">
                      Totum Végétal
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#C8AB8A] shrink-0" />
                    <span>Le Totum Végétal → Réseau d'Organes</span>
                  </h3>

                  <p className="text-xs sm:text-sm text-white/95 leading-relaxed mb-4">
                    Le Totum apporte une matrice vivante de centaines de principes actifs synergiques (amers, flavonoïdes, polyphénols, minéraux) dialoguant simultanément avec l'ensemble des systèmes.
                  </p>

                  <ul className="space-y-2.5 text-xs text-white mb-6">
                    <li className="flex items-start gap-2 text-white">
                      <Check className="w-3.5 h-3.5 text-[#C8AB8A] shrink-0 mt-0.5" />
                      <span className="text-white font-medium">Réveil des récepteurs endormis (amers TAS2R)</span>
                    </li>
                    <li className="flex items-start gap-2 text-white">
                      <Check className="w-3.5 h-3.5 text-[#C8AB8A] shrink-0 mt-0.5" />
                      <span className="text-white font-medium">Ouverture des 5 émonctoires avant toute relance</span>
                    </li>
                    <li className="flex items-start gap-2 text-white">
                      <Check className="w-3.5 h-3.5 text-[#C8AB8A] shrink-0 mt-0.5" />
                      <span className="text-white font-medium">Restauration autonome des boucles d'auto-régulation</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-3 border-t border-white/15 text-[11px] font-mono text-[#C8AB8A] font-semibold">
                  Résultat : Homéostasie restaurée &amp; vitalité durable
                </div>
              </div>

            </div>

            {/* CTAs du Hero */}
            <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
              <button
                onClick={() => {
                  const el = document.getElementById('protocole-accordage');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-3.5 rounded-2xl bg-[#C8AB8A] hover:bg-[#b89b7b] text-[#0F261E] font-black text-xs uppercase tracking-wider transition-all shadow-lg hover:shadow-xl flex items-center gap-2 cursor-pointer"
              >
                <Sliders className="w-4 h-4 text-[#0F261E]" />
                <span>Explorer l'Accordage en 6 Phases</span>
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById('planches-racines');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/15 text-white border border-white/20 text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
              >
                <Leaf className="w-4 h-4 text-[#C8AB8A]" />
                <span>Voir les 4 Planches Botaniques</span>
              </button>
            </div>

          </div>
        </header>

        {/* Modal Phase Detail */}
        <AnimatePresence>
          {selectedPhase && (
            <PhaseDetailModal 
              phase={selectedPhase} 
              onClose={() => setSelectedPhase(null)} 
              onNavigate={onNavigate}
            />
          )}
        </AnimatePresence>

        {/* ========================================================================= */}
        {/* CORPS PRINCIPAL DE LA PAGE                                                */}
        {/* ========================================================================= */}
        <main className="max-w-6xl mx-auto px-4 sm:px-6 space-y-24">

          {/* ========================================================================= */}
          {/* 1.5. SECTION "HÉRITAGE SCIENTIFIQUE" (CRÉDIBILITÉ - REMONTÉE ICI)          */}
          {/* ========================================================================= */}
          <section className="space-y-8 scroll-mt-24">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-[#3E4A3D] border border-[#E7DFD3] text-[11px] font-bold uppercase tracking-wider shadow-sm">
                <FlaskConical className="w-3.5 h-3.5 text-[#C8AB8A]" />
                <span>Physiologie Fondatrice &amp; Crédibilité</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0F261E] tracking-tight">
                Du « Milieu Intérieur » à l'Homéostasie : La Sagesse du Vivant
              </h2>
              <p className="text-xs sm:text-sm text-[#8A8177] leading-relaxed font-medium max-w-2xl mx-auto">
                Comprendre le corps humain commence par reconnaître qu'il ne dysfonctionne jamais sans raison. La fatigue chronique, les tensions et les désordres métaboliques ne sont pas des pannes arbitraires : ce sont des signaux d'adaptation d'un organisme qui cherche à préserver son équilibre vital.
              </p>
            </div>

            {/* 2 Colonnes Claude Bernard & Walter Cannon avec guillemets stylisés */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Claude Bernard */}
              <div className="bg-[#3E4A3D] text-[#F9F6F0] rounded-2xl border border-white/10 p-6 sm:p-8 flex flex-col justify-between shadow-sm relative overflow-hidden group">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#C8AB8A] font-bold">
                      XIXᵉ Siècle • Médecine Expérimentale
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-[#C8AB8A] text-[10px] font-bold font-mono">
                      1813 – 1878
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white">
                    Claude Bernard &amp; le « Milieu Intérieur »
                  </h3>

                  {/* Bloc de citation stylisé avec guillemets géants */}
                  <div className="relative bg-[#0F261E]/60 rounded-xl p-5 border border-white/10 my-3">
                    <span className="absolute -top-3 -left-1 text-4xl text-[#C8AB8A]/40 font-serif leading-none select-none">“</span>
                    <p className="italic text-xs sm:text-sm text-[#F9F6F0] leading-relaxed font-serif pl-3">
                      « La fixité du milieu intérieur est la condition d'une vie libre et indépendante. »
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-[#F9F6F0]/80 leading-relaxed">
                    Claude Bernard a découvert que nos cellules baignent dans un océan liquidien intérieur (sang, lymphe, liquide interstitiel). Pour que les organes fonctionnent harmonieusement, ce milieu doit conserver une constance biochimique rigoureuse (pH, température, osmolarité).
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-2 text-xs text-[#C8AB8A] font-medium">
                  <CheckCircle className="w-4 h-4 text-[#C8AB8A] shrink-0" />
                  <span>Le terrain biologique : la matrice de toute santé durable</span>
                </div>
              </div>

              {/* Walter Cannon */}
              <div className="bg-[#3E4A3D] text-[#F9F6F0] rounded-2xl border border-white/10 p-6 sm:p-8 flex flex-col justify-between shadow-sm relative overflow-hidden group">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#C8AB8A] font-bold">
                      Université Harvard • Physiologie
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-[#C8AB8A] text-[10px] font-bold font-mono">
                      1871 – 1945
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white">
                    Walter Cannon &amp; l'Homéostasie
                  </h3>

                  {/* Bloc de citation stylisé avec guillemets géants */}
                  <div className="relative bg-[#0F261E]/60 rounded-xl p-5 border border-white/10 my-3">
                    <span className="absolute -top-3 -left-1 text-4xl text-[#C8AB8A]/40 font-serif leading-none select-none">“</span>
                    <p className="italic text-xs sm:text-sm text-[#F9F6F0] leading-relaxed font-serif pl-3">
                      « L'homéostasie est la coordination des processus physiologiques maintenant les états stables de l'organisme. »
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-[#F9F6F0]/80 leading-relaxed">
                    Walter Cannon a conceptualisé la capacité d'auto-ajustement permanent du vivant : l'<strong>homéostasie</strong>. L'organisme possède une pharmacie intérieure autonome capable de rééquilibrer tension, glycémie, immunité et réparation tissulaire grâce à de subtiles boucles de rétroaction.
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-2 text-xs text-[#C8AB8A] font-medium">
                  <Sparkles className="w-4 h-4 text-[#C8AB8A] shrink-0" />
                  <span>La pharmacie intérieure : une auto-régulation perpétuelle</span>
                </div>
              </div>

            </div>

            {/* Encadré signature fondatrice Bloom */}
            <div className="bg-[#0F261E] rounded-2xl p-6 sm:p-8 border border-[#C8AB8A]/40 shadow-sm relative overflow-hidden text-center">
              <div className="max-w-3xl mx-auto space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[#C8AB8A] text-[10px] font-bold tracking-widest uppercase font-mono">
                  <span>Principe Fondateur Bloom</span>
                </div>
                <blockquote className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight leading-snug">
                  « Votre corps n’est pas cassé. Il est verrouillé par une charge adaptative devenue trop lourde. »
                </blockquote>
                <p className="text-xs sm:text-sm text-[#F9F6F0]/80 leading-relaxed max-w-2xl mx-auto">
                  Face aux toxines environnementales, au stress chronique et aux désordres métaboliques, les émonctoires se saturent. L'organisme verrouille certains systèmes non vitaux pour préserver les fonctions d'urgence. Le Reset Homéostasique lève ces verrous sans forcer.
                </p>
              </div>
            </div>
          </section>

          {/* ========================================================================= */}
          {/* 2. SECTION "LES PLANCHES BOTANIQUES" (LE "COMMENT")                        */}
          {/* ========================================================================= */}
          <section id="planches-racines" className="scroll-mt-24 space-y-8">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-[#3E4A3D] border border-[#E7DFD3] text-[11px] font-bold uppercase tracking-wider shadow-sm">
                <Leaf className="w-3.5 h-3.5 text-[#C8AB8A]" />
                <span>Herbier Anatomique &amp; Racines</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0F261E] tracking-tight">
                Les Racines du Vivant : la profondeur du Totum
              </h2>
              <p className="text-xs sm:text-sm text-[#8A8177] leading-relaxed font-medium max-w-2xl mx-auto">
                Les principes amers, les polysaccharides immunitaires et les adaptogènes majeurs sont concentrés au cœur des racines et des rhizomes. Dessinées à l'encre noire selon la tradition des planches naturalistes, ces illustrations révèlent l'architecture invisible qui ancre le pouvoir régénérant des plantes.
              </p>
            </div>

            {/* Grille des 4 planches botaniques avec Encart "Mécanisme d'action" */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
              {/* Planche I : Gentiane & Bardane */}
              <div className="bg-[#3E4A3D] rounded-2xl border border-white/10 p-5 flex flex-col justify-between shadow-sm group hover:border-[#C8AB8A] transition-all">
                <div className="space-y-3">
                  <div className="rounded-xl overflow-hidden bg-[#FAF7F2] p-3 border border-[#E7DFD3] shadow-inner flex items-center justify-center aspect-[4/3]">
                    <img 
                      src={botanicalHeroImg} 
                      alt="Planche I : Gentiane et Bardane avec racines profondes" 
                      className="w-full h-full object-contain filter contrast-110 group-hover:scale-105 transition-transform duration-500" 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <span className="text-[#C8AB8A] font-bold uppercase">Planche I</span>
                    <span className="text-[#F9F6F0]/60">Radix Primordialis</span>
                  </div>

                  <h3 className="font-bold text-base text-white">
                    Gentiane &amp; Bardane
                  </h3>

                  <p className="text-xs text-[#F9F6F0]/80 leading-relaxed">
                    Racine pivotante maîtresse : inuline prébiotique, principes amers et déverrouillage de la filtration hépato-cutanée.
                  </p>

                  {/* Encart "Mécanisme d'action" imposé */}
                  <div className="bg-[#F9F6F0] rounded-xl p-3 border border-[#E7DFD3] text-[#0F261E] space-y-1 mt-2">
                    <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-[#3E4A3D]">
                      <Radio className="w-3 h-3 text-[#C8AB8A]" />
                      <span>Mécanisme d'action</span>
                    </div>
                    <p className="text-[11px] leading-relaxed text-[#0F261E]/90 italic font-medium">
                      Ses principes amers stimulent les récepteurs TAS2R, déclenchant un réflexe de sécrétion biliaire. La plante ne « nettoie » pas le foie, elle réactive le signal hépatique endormi.
                    </p>
                  </div>
                </div>

                <div className="pt-3 mt-4 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-[#C8AB8A]">
                  <span>Cible : Émonctoires</span>
                  <span>Phase 0 &amp; 1</span>
                </div>
              </div>

              {/* Planche II : Prêle & Pissenlit */}
              <div className="bg-[#3E4A3D] rounded-2xl border border-white/10 p-5 flex flex-col justify-between shadow-sm group hover:border-[#C8AB8A] transition-all">
                <div className="space-y-3">
                  <div className="rounded-xl overflow-hidden bg-[#FAF7F2] p-3 border border-[#E7DFD3] shadow-inner flex items-center justify-center aspect-[4/3]">
                    <img 
                      src={botanicalEmonctoiresImg} 
                      alt="Planche II : Prêle et Pissenlit avec chevelu racinaire" 
                      className="w-full h-full object-contain filter contrast-110 group-hover:scale-105 transition-transform duration-500" 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <span className="text-[#C8AB8A] font-bold uppercase">Planche II</span>
                    <span className="text-[#F9F6F0]/60">Emunctoria Renalia</span>
                  </div>

                  <h3 className="font-bold text-base text-white">
                    Prêle &amp; Pissenlit
                  </h3>

                  <p className="text-xs text-[#F9F6F0]/80 leading-relaxed">
                    Chevelu radiculaire et rhizomes : silicates organiques biodisponibles et élimination hydrique sans fuite de minéraux.
                  </p>

                  {/* Encart "Mécanisme d'action" */}
                  <div className="bg-[#F9F6F0] rounded-xl p-3 border border-[#E7DFD3] text-[#0F261E] space-y-1 mt-2">
                    <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-[#3E4A3D]">
                      <Radio className="w-3 h-3 text-[#C8AB8A]" />
                      <span>Mécanisme d'action</span>
                    </div>
                    <p className="text-[11px] leading-relaxed text-[#0F261E]/90 italic font-medium">
                      Les silicates chélatés et les sels de potassium activent la filtration glomérulaire sans déperdition électrolytique. La plante relance le débit rénal et décongestionne la matrice extracellulaire.
                    </p>
                  </div>
                </div>

                <div className="pt-3 mt-4 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-[#C8AB8A]">
                  <span>Cible : Reins &amp; Fascia</span>
                  <span>Drainage Doux</span>
                </div>
              </div>

              {/* Planche III : Réglisse & Chardon-Marie */}
              <div className="bg-[#3E4A3D] rounded-2xl border border-white/10 p-5 flex flex-col justify-between shadow-sm group hover:border-[#C8AB8A] transition-all">
                <div className="space-y-3">
                  <div className="rounded-xl overflow-hidden bg-[#FAF7F2] p-3 border border-[#E7DFD3] shadow-inner flex items-center justify-center aspect-[4/3]">
                    <img 
                      src={botanicalHepaticImg} 
                      alt="Planche III : Réglisse et Chardon-Marie avec rhizomes" 
                      className="w-full h-full object-contain filter contrast-110 group-hover:scale-105 transition-transform duration-500" 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <span className="text-[#C8AB8A] font-bold uppercase">Planche III</span>
                    <span className="text-[#F9F6F0]/60">Rhizoma Hepaticus</span>
                  </div>

                  <h3 className="font-bold text-base text-white">
                    Réglisse &amp; Chardon
                  </h3>

                  <p className="text-xs text-[#F9F6F0]/80 leading-relaxed">
                    Rhizomes riches en glycyrrhizine et silymarine : régénération de la membrane hépatocytaire et relance biliaire.
                  </p>

                  {/* Encart "Mécanisme d'action" */}
                  <div className="bg-[#F9F6F0] rounded-xl p-3 border border-[#E7DFD3] text-[#0F261E] space-y-1 mt-2">
                    <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-[#3E4A3D]">
                      <Radio className="w-3 h-3 text-[#C8AB8A]" />
                      <span>Mécanisme d'action</span>
                    </div>
                    <p className="text-[11px] leading-relaxed text-[#0F261E]/90 italic font-medium">
                      La silymarine stabilise la membrane des hépatocytes et la glycyrrhizine inhibe la 11β-HSD, protégeant le cortisol endogène. Elles activent la phase II de détoxification sans forcer les cytochromes.
                    </p>
                  </div>
                </div>

                <div className="pt-3 mt-4 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-[#C8AB8A]">
                  <span>Cible : Foie &amp; Bile</span>
                  <span>Relance Hépatique</span>
                </div>
              </div>

              {/* Planche IV : Ashwagandha & Rhodiola */}
              <div className="bg-[#3E4A3D] rounded-2xl border border-white/10 p-5 flex flex-col justify-between shadow-sm group hover:border-[#C8AB8A] transition-all">
                <div className="space-y-3">
                  <div className="rounded-xl overflow-hidden bg-[#FAF7F2] p-3 border border-[#E7DFD3] shadow-inner flex items-center justify-center aspect-[4/3]">
                    <img 
                      src={botanicalVitalityImg} 
                      alt="Planche IV : Ashwagandha et Rhodiola avec racines adaptogènes" 
                      className="w-full h-full object-contain filter contrast-110 group-hover:scale-105 transition-transform duration-500" 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <span className="text-[#C8AB8A] font-bold uppercase">Planche IV</span>
                    <span className="text-[#F9F6F0]/60">Radix Adaptogena</span>
                  </div>

                  <h3 className="font-bold text-base text-white">
                    Ashwagandha &amp; Rhodiola
                  </h3>

                  <p className="text-xs text-[#F9F6F0]/80 leading-relaxed">
                    Withanolides et salidrosides : régulation de l'axe HPA du stress et recharge mitochondriale sans nervosité.
                  </p>

                  {/* Encart "Mécanisme d'action" */}
                  <div className="bg-[#F9F6F0] rounded-xl p-3 border border-[#E7DFD3] text-[#0F261E] space-y-1 mt-2">
                    <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-[#3E4A3D]">
                      <Radio className="w-3 h-3 text-[#C8AB8A]" />
                      <span>Mécanisme d'action</span>
                    </div>
                    <p className="text-[11px] leading-relaxed text-[#0F261E]/90 italic font-medium">
                      Les withanolides et salidrosides modulent l'axe HPA en réduisant l'hyper-réactivité des récepteurs au cortisol. Elles restaurent l'ATP mitochondrial sans épuiser les réserves adrénergiques.
                    </p>
                  </div>
                </div>

                <div className="pt-3 mt-4 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-[#C8AB8A]">
                  <span>Cible : Axe HPA &amp; SEC</span>
                  <span>Régénération</span>
                </div>
              </div>

            </div>
          </section>

          {/* ========================================================================= */}
          {/* 3. SECTION "LE PROTOCOLE EN 6 PHASES" (L'EXPÉRIENCE D'ACCORDAGE)           */}
          {/* ========================================================================= */}
          <section id="protocole-accordage" className="scroll-mt-24 space-y-8">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-[#3E4A3D] border border-[#E7DFD3] text-[11px] font-bold uppercase tracking-wider shadow-sm">
                <Sliders className="w-3.5 h-3.5 text-[#C8AB8A]" />
                <span>Le Parcours d'Accordage Biologique</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0F261E] tracking-tight">
                L'Accordage en 6 Phases : Synchroniser vos Systèmes
              </h2>
              <p className="text-xs sm:text-sm text-[#8A8177] leading-relaxed font-medium max-w-2xl mx-auto">
                Tout comme un instrument de musique se règle corde par corde, le corps ne peut être rééquilibré d'un coup. Le Reset déploie une séquence chronologique stricte pour alléger la{' '}
                <TermTooltip 
                  term="Charge Allostatique" 
                  definition="L'usure accumulée par un corps qui tourne en surrégime pour compenser un déséquilibre chronique répété."
                >
                  charge allostatique
                </TermTooltip>{' '}
                et ouvrir les{' '}
                <TermTooltip 
                  term="Émonctoires" 
                  definition="Les 5 voies d'élimination de l'organisme (reins, foie, poumons, peau, intestins) qui évacuent les résidus métaboliques."
                >
                  émonctoires
                </TermTooltip>{' '}
                dans le bon ordre.
              </p>
            </div>

            {/* Expérience d'accordage : Timeline visuelle interactive */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tuningPhases.map((phase, idx) => (
                <div 
                  key={idx}
                  onClick={() => {
                    const fullPhase = resetPhasesData.find(p => p.key === phase.key) || resetPhasesData[0];
                    setSelectedPhase(fullPhase);
                  }}
                  className="bg-white rounded-2xl border border-[#E7DFD3] p-6 shadow-sm hover:shadow-md transition-all duration-300 relative group overflow-hidden cursor-pointer flex flex-col justify-between hover:border-[#C8AB8A]"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-mono font-bold text-[#C8AB8A] tracking-[0.2em] uppercase">
                        {phase.id} • {phase.duration}
                      </span>
                      <div className="p-2 rounded-xl bg-[#F9F6F0] border border-[#E7DFD3] text-[#3E4A3D] group-hover:bg-[#3E4A3D] group-hover:text-white transition-colors">
                        <phase.icon className="w-4 h-4 stroke-[1.5]" />
                      </div>
                    </div>

                    <h3 className="text-base font-bold text-[#0F261E] group-hover:text-[#3E4A3D] transition-colors mb-2">
                      {phase.title}
                    </h3>

                    <p className="text-xs text-[#8A8177] leading-relaxed mb-4">
                      {phase.role}
                    </p>

                    <div className="bg-[#F9F6F0] rounded-xl p-3 border border-[#E7DFD3]/60 mb-4 space-y-1">
                      <div className="text-[10px] font-mono text-[#3E4A3D] font-bold uppercase tracking-wider">
                        Totum Végétal Clé :
                      </div>
                      <div className="text-xs text-[#0F261E] font-medium">
                        {phase.plants}
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#E7DFD3] flex items-center justify-between text-[11px] font-mono">
                    <span className="text-[#8A8177]">{phase.targetSystem}</span>
                    <span className="text-[#3E4A3D] font-bold group-hover:translate-x-0.5 transition-transform">
                      Dosages &rarr;
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Tabs (Protocoles, Compléments, Chronobiologie) avec Freemium Gate */}
            <div className="pt-6 space-y-6">
              <div className="flex flex-wrap justify-center gap-3">
                {[
                  { id: 'protocol', label: '1. Le Protocole Détaillé', icon: Activity },
                  { id: 'supplements', label: '2. Compléments Synergiques', icon: FlaskConical },
                  { id: 'chronobiology', label: '3. Chronobiologie Circadienne', icon: Clock }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-2.5 px-6 py-3 rounded-2xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                      activeTab === tab.id 
                        ? 'bg-[#0F261E] text-white shadow-md font-black' 
                        : 'bg-white text-[#3E4A3D] hover:bg-[#F9F6F0] border border-[#E7DFD3]'
                    }`}
                  >
                    <tab.icon className="w-4 h-4 stroke-[2]" />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>

              {/* Freemium Paywall Gate pour protéger les posologies exactes de l'Académie */}
              <FreemiumPaywallGate
                onNavigate={onNavigate}
                lang={lang}
                title="Débloquez le Protocole Complet du Reset Homéostasique"
                subtitle="L’aperçu des planches botaniques et la trame d'accordage sont en accès libre. Débloquez l’intégralité des 6 phases d’extraction, les paramètres thermiques BloomLab®, les posologies précises et la synchronisation circadienne avec votre abonnement."
                bulletPoints={[
                  "Paramètres thermiques stricts d'extraction séquentielle (Phase A aqueuse & B lipidique)",
                  "Chronobiologie circadienne complète (Matin, Midi, Soir, Nuit)",
                  "Dosages précis des cofacteurs et compléments synergiques de terrain",
                  "Accès débloqué aux 4 Architectures, 7 Terrains et Protocoles Ciblés"
                ]}
                teaserContent={
                  <div className="p-6 rounded-2xl bg-[#0F261E] text-white border border-[#C8AB8A]/30 space-y-4">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#C8AB8A] uppercase tracking-wider font-mono">
                      <Sliders className="w-4 h-4 text-[#C8AB8A]" />
                      <span>Cadence de l'Accordage Biologique • Vue Synthétique</span>
                    </div>
                    <div className="grid sm:grid-cols-3 lg:grid-cols-6 gap-3 text-center text-xs">
                      {tuningPhases.map((phase, idx) => (
                        <div key={idx} className="p-3 rounded-xl bg-[#3E4A3D] border border-white/10 space-y-1">
                          <span className="font-mono text-[#C8AB8A] font-black text-xs block">{phase.id}</span>
                          <strong className="text-white block truncate text-[11px]">{phase.title}</strong>
                          <span className="text-[10px] text-white/60 block">{phase.duration}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                }
              >
                {/* Contenu Débloqué pour les Abonnés */}
                <div className="space-y-8">
                  {/* Onglet 1 : Protocole Détaillé */}
                  {activeTab === 'protocol' && (
                    <div className="space-y-6 animate-in fade-in duration-500">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {resetPhasesData.map((step, idx) => (
                          <div 
                            key={idx}
                            onClick={() => setSelectedPhase(step)}
                            className="bg-white p-6 rounded-2xl border border-[#E7DFD3] hover:border-[#C8AB8A] transition-all cursor-pointer shadow-sm flex flex-col justify-between"
                          >
                            <div>
                              <div className="text-[10px] font-mono font-bold text-[#C8AB8A] tracking-[0.2em] mb-2 uppercase">
                                {step.subtitle}
                              </div>
                              <h3 className="text-base font-bold text-[#0F261E] mb-2">
                                {step.title} : {step.name}
                              </h3>
                              <p className="text-xs text-[#8A8177] leading-relaxed mb-4">
                                {step.short_text}
                              </p>
                            </div>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedPhase(step);
                              }}
                              className="w-full py-2.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider bg-[#3E4A3D] hover:bg-[#0F261E] text-white transition-all cursor-pointer text-center"
                            >
                              Consulter les dosages &rarr;
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Onglet 2 : Compléments */}
                  {activeTab === 'supplements' && (
                    <div className="space-y-6 animate-in fade-in duration-500">
                      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {supplements.map((item, idx) => (
                          <div key={idx} className="p-6 rounded-2xl bg-white border border-[#E7DFD3] space-y-3 shadow-sm">
                            <div className="flex justify-between items-start">
                              <h4 className="font-bold text-sm text-[#0F261E]">{item.name}</h4>
                              <span className="text-[10px] font-mono bg-[#C8AB8A]/20 text-[#3E4A3D] px-2 py-0.5 rounded-full font-bold">
                                {item.dose}
                              </span>
                            </div>
                            <p className="text-xs text-[#8A8177] leading-relaxed">
                              {item.role}
                            </p>
                            <div className="pt-2 border-t border-[#E7DFD3] text-[10px] font-mono text-[#3E4A3D] font-bold">
                              Cible : {item.target}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Onglet 3 : Chronobiologie */}
                  {activeTab === 'chronobiology' && (
                    <div className="space-y-6 animate-in fade-in duration-500">
                      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {chronoPhases.map((phase) => (
                          <div key={phase.id} className="p-6 rounded-2xl bg-white border border-[#E7DFD3] space-y-3 shadow-sm flex flex-col justify-between">
                            <div>
                              <div className="w-10 h-10 rounded-xl bg-[#3E4A3D] text-[#C8AB8A] flex items-center justify-center mb-3">
                                <phase.icon className="w-5 h-5" />
                              </div>
                              <h4 className="font-bold text-sm text-[#0F261E] mb-1">{phase.title}</h4>
                              <p className="text-xs text-[#8A8177] leading-relaxed">
                                {phase.desc}
                              </p>
                            </div>
                            <span className="text-[10px] font-mono text-[#3E4A3D] font-semibold uppercase tracking-wider block pt-2 border-t border-[#E7DFD3]">
                              Synchronisation circadienne
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </FreemiumPaywallGate>
            </div>
          </section>

          {/* ========================================================================= */}
          {/* 4. SECTION "LES 4 DIMENSIONS DE LA RESPONSABILITÉ" (L'ENVIRONNEMENT)       */}
          {/* ========================================================================= */}
          <section className="space-y-8">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-[#3E4A3D] border border-[#E7DFD3] text-[11px] font-bold uppercase tracking-wider shadow-sm">
                <Compass className="w-3.5 h-3.5 text-[#C8AB8A]" />
                <span>Responsabilisation &amp; Piliers du Terrain</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0F261E] tracking-tight">
                Les 4 Dimensions de la Responsabilité
              </h2>
              <p className="text-xs sm:text-sm text-[#8A8177] leading-relaxed font-medium max-w-2xl mx-auto">
                Les plantes médicinales ne sont pas des béquilles passives. Elles agissent comme de puissants catalyseurs biochimiques, mais leur pleine efficacité dépend des 4 piliers fondamentaux de votre hygiène de vie quotidienne.
              </p>
            </div>

            {/* Grille des 4 Dimensions : Fond Vert Mousse (#3E4A3D) avec texte clair (#F9F6F0) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
              {/* Dimension 1 : Environnement & Ingestion */}
              <div className="bg-[#3E4A3D] text-[#F9F6F0] rounded-2xl border border-white/10 p-6 flex flex-col justify-between shadow-sm group hover:border-[#C8AB8A] transition-all">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center border border-white/15 shadow-sm group-hover:scale-105 transition-transform">
                    <Leaf className="w-6 h-6 text-[#C8AB8A]" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#C8AB8A] font-bold">
                      Dimension I
                    </span>
                    <h3 className="text-base font-bold text-white mt-1">
                      L'Environnement &amp; L'Ingestion
                    </h3>
                  </div>
                  <p className="text-xs text-[#F9F6F0]/85 leading-relaxed">
                    Ce que vous ingérez dicte la charge de vos filtres émonctoriels. Réduire les aliments ultra-transformés, réintroduire la saveur amère stimulatrice du foie et des sucs gastriques, s'hydrater avec une eau peu minéralisée.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-white/10">
                  <p className="text-[11px] font-serif italic text-[#C8AB8A]">
                    « Nourrir la cellule, soulager le filtre hépato-rénal. »
                  </p>
                </div>
              </div>

              {/* Dimension 2 : Mouvement & Circulation */}
              <div className="bg-[#3E4A3D] text-[#F9F6F0] rounded-2xl border border-white/10 p-6 flex flex-col justify-between shadow-sm group hover:border-[#C8AB8A] transition-all">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center border border-white/15 shadow-sm group-hover:scale-105 transition-transform">
                    <Activity className="w-6 h-6 text-[#C8AB8A]" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#C8AB8A] font-bold">
                      Dimension II
                    </span>
                    <h3 className="text-base font-bold text-white mt-1">
                      Le Mouvement &amp; La Circulation
                    </h3>
                  </div>
                  <p className="text-xs text-[#F9F6F0]/85 leading-relaxed">
                    La lymphe — véhicule principal des déchets immunitaires et cellulaires — ne possède pas de pompe cardiaque. Seul le mouvement musculaire, la marche et la mobilité des fascias propulsent ce fleuve purificateur vers les canaux d'évacuation.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-white/10">
                  <p className="text-[11px] font-serif italic text-[#C8AB8A]">
                    « L'eau stagnante s'encrasse, l'eau vive se purifie. »
                  </p>
                </div>
              </div>

              {/* Dimension 3 : Sommeil & Réparation */}
              <div className="bg-[#3E4A3D] text-[#F9F6F0] rounded-2xl border border-white/10 p-6 flex flex-col justify-between shadow-sm group hover:border-[#C8AB8A] transition-all">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center border border-white/15 shadow-sm group-hover:scale-105 transition-transform">
                    <Moon className="w-6 h-6 text-[#C8AB8A]" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#C8AB8A] font-bold">
                      Dimension III
                    </span>
                    <h3 className="text-base font-bold text-white mt-1">
                      Le Sommeil &amp; La Réparation
                    </h3>
                  </div>
                  <p className="text-xs text-[#F9F6F0]/85 leading-relaxed">
                    C'est durant le sommeil profond que s'active le système glymphatique cérébral et que l'autophagie recycle les protéines endommagées. Sans repos circadien respecté, aucune régénération mitochondriale n'est possible.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-white/10">
                  <p className="text-[11px] font-serif italic text-[#C8AB8A]">
                    « Le sommeil profond est l'élixir souverain de l'autophagie. »
                  </p>
                </div>
              </div>

              {/* Dimension 4 : Mental, Vague & Stress */}
              <div className="bg-[#3E4A3D] text-[#F9F6F0] rounded-2xl border border-white/10 p-6 flex flex-col justify-between shadow-sm group hover:border-[#C8AB8A] transition-all">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center border border-white/15 shadow-sm group-hover:scale-105 transition-transform">
                    <Brain className="w-6 h-6 text-[#C8AB8A]" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#C8AB8A] font-bold">
                      Dimension IV
                    </span>
                    <h3 className="text-base font-bold text-white mt-1">
                      Le Mental, Le Vague &amp; Le Stress
                    </h3>
                  </div>
                  <p className="text-xs text-[#F9F6F0]/85 leading-relaxed">
                    En stress chronique (mode orthosympathique), le corps bloque les sécrétions digestives et hépatiques pour mobiliser l'énergie de survie. Cultiver le tonus du nerf vague (respiration 5-5) est le prérequis pour rouvrir la digestion et la guérison.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-white/10">
                  <p className="text-[11px] font-serif italic text-[#C8AB8A]">
                    « Le corps ne répare ses tissus qu'en état de sécurité. »
                  </p>
                </div>
              </div>

            </div>

            {/* Focus Nerf Vague & Axe Cerveau-Intestin */}
            <div className="bg-white rounded-2xl border border-[#E7DFD3] p-6 sm:p-8 shadow-sm">
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#0F261E] text-white flex items-center justify-center shrink-0 shadow-sm">
                  <Brain className="w-6 h-6 text-[#C8AB8A]" />
                </div>
                <div className="space-y-2">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-[#C8AB8A] font-bold">
                    Axe Neuro-Végétatif &amp; Terrain
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-[#0F261E]">
                    Le Nerf Vague : Le Siège de la Guérison Autonome
                  </h3>
                  <p className="text-xs sm:text-sm text-[#8A8177] leading-relaxed font-normal">
                    90% des informations nerveuses remontent du ventre vers le cerveau. 95% de la sérotonine est produite dans l'intestin. La respiration lente et la stimulation amère de la gentiane jaune (BloomLab) activent le tonus vagal pour réenclencher le péristaltisme et lever la charge allostatique.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ========================================================================= */}
          {/* 6. SECTION "ALMA" (LE CTA)                                                */}
          {/* ========================================================================= */}
          <section className="p-8 sm:p-14 rounded-2xl bg-[#0F261E] text-white border border-[#C8AB8A]/40 shadow-xl relative overflow-hidden text-center">
            <div className="max-w-3xl mx-auto space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/15 text-[#C8AB8A] text-[10px] font-bold uppercase tracking-widest font-mono">
                <Brain className="w-3.5 h-3.5 text-[#C8AB8A]" />
                <span>Anamnèse Personnalisée</span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
                Quel système biologique est actuellement le plus verrouillé chez vous ?
              </h2>

              <p className="text-xs sm:text-sm md:text-base text-[#F9F6F0]/85 leading-relaxed max-w-2xl mx-auto">
                Le Reset Homéostasique n'est pas une recette universelle : il s'ajuste à votre terrain dominant et au niveau d'engorgement de vos émonctoires. Dialoguez avec ALMA pour identifier vos priorités physiologiques.
              </p>

              {/* Bouton CTA et Micro-texte imposé */}
              <div className="pt-2 flex flex-col items-center justify-center gap-3">
                <button 
                  onClick={() => onNavigate('chat')}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#C8AB8A] hover:bg-[#b89b7b] text-[#0F261E] font-black text-xs sm:text-sm uppercase tracking-wider transition-all shadow-xl hover:shadow-2xl flex items-center justify-center gap-3 cursor-pointer group"
                >
                  <Brain className="w-5 h-5 text-[#0F261E] group-hover:scale-110 transition-transform" />
                  <span>Commencer mon anamnèse avec ALMA</span>
                  <ArrowRight className="w-4 h-4 text-[#0F261E] group-hover:translate-x-1 transition-transform" />
                </button>

                {/* Micro-texte imposé sous le bouton */}
                <p className="text-xs text-[#C8AB8A] font-medium font-sans">
                  Test personnalisé de 3 minutes pour identifier le système le plus verrouillé chez vous.
                </p>
              </div>

              <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 text-xs text-[#F9F6F0]/60">
                <span className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#C8AB8A]" /> 15 questions guidées
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#C8AB8A]" /> 100% confidentiel
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#C8AB8A]" /> Sans engagement
                </span>
              </div>

            </div>
          </section>

        </main>
      </div>
    </GlossaryProvider>
  );
}