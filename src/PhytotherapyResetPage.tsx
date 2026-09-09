import React, { useState } from 'react';
import { Shield, FlaskConical, Activity, Heart, ArrowRight, CheckCircle, Search, Microscope, Beaker, Sparkles, Zap, Brain, Wind, Lock, Sun, Moon, Utensils, Clock, Waves, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { resetPhasesData, ResetPhaseDetail } from './data/resetPhases';
import { chronobiologyData, ChronoPhase } from './data/chronobiology';
import { translations, Language } from './translations';

// import natureHero from './assets/images/nature_biology_reset_hero_1785755295636.jpg';
// import strengthPlant from './assets/images/strength_courage_plant_1786630685093.jpg';
// import emonctoiresImg from './assets/images/emonctoires_natural_drainage_1785755307026.jpg';
// import hepaticImg from './assets/images/hepatic_balance_liver_1785755318947.jpg';
// import bloodPurityImg from './assets/images/blood_purity_lymphatic_1785755331143.jpg';

const natureHero = "/images/nature_biology_reset_hero_1785755295636.jpg";
const strengthPlant = "/images/strength_courage_plant_1786630685093.jpg";
const emonctoiresImg = "/images/emonctoires_natural_drainage_1785755307026.jpg";
const hepaticImg = "/images/hepatic_balance_liver_1785755318947.jpg";
const bloodPurityImg = "/images/blood_purity_lymphatic_1785755331143.jpg";

// Pastel palette for cards
const pastelThemes = [
  { bg: 'bg-[#EAF2ED]', border: 'border-[#D2E2D8]', badge: 'bg-[#1C3F34] text-white', accent: 'bg-[#1C3F34]' },
  { bg: 'bg-[#FAF2E6]', border: 'border-[#EEDFC6]', badge: 'bg-[#92400E] text-white', accent: 'bg-[#92400E]' },
  { bg: 'bg-[#F5EFEB]', border: 'border-[#E4D7CD]', badge: 'bg-[#7C2D12] text-white', accent: 'bg-[#7C2D12]' },
  { bg: 'bg-[#EEF2F6]', border: 'border-[#D0DCE7]', badge: 'bg-[#1E3A5F] text-white', accent: 'bg-[#1E3A5F]' },
  { bg: 'bg-[#F2EFE9]', border: 'border-[#DDD4C7]', badge: 'bg-[#3F3F46] text-white', accent: 'bg-[#3F3F46]' },
  { bg: 'bg-[#E8F0EA]', border: 'border-[#CFDFD3]', badge: 'bg-[#14532D] text-white', accent: 'bg-[#14532D]' }
];

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
        className="bg-[#FAF7F2] w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[40px] shadow-2xl relative border border-[#E7DFD3]"
        onClick={e => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 w-12 h-12 rounded-full bg-[#0F261E] hover:bg-[#D97706] active:bg-[#B45309] flex items-center justify-center text-white transition-all shadow-md z-10 cursor-pointer"
        >
          <X className="w-6 h-6 stroke-[1.5]" />
        </button>

        <div className="p-8 md:p-16">
          <div className="mb-12">
            <div className="text-xs font-black text-[#B45309] tracking-[0.25em] mb-2 uppercase">{phase.subtitle}</div>
            <h2 className="text-3xl md:text-5xl font-black text-[#0F261E] mb-6 leading-tight">
              {phase.title} : {phase.name}
            </h2>
            <div className="p-6 bg-[#FAF2E6] rounded-3xl border border-[#EEDFC6]">
              <p className="text-[#0F261E] font-medium leading-relaxed italic">
                {phase.long_text}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-black text-[#0F261E] mb-6 flex items-center gap-2.5">
                <CheckCircle className="w-5 h-5 text-[#374151] stroke-[1.5]" /> Objectifs de la Phase
              </h3>
              <ul className="space-y-4">
                {phase.objectives.map((obj, idx) => (
                  <li key={idx} className="flex gap-3 text-slate-700 text-sm leading-relaxed">
                    <span className="w-2 h-2 rounded-full bg-[#374151] shrink-0 mt-2" />
                    {obj}
                  </li>
                ))}
              </ul>

              <h3 className="text-xl font-black text-[#0F261E] mt-12 mb-6 flex items-center gap-2.5">
                <Activity className="w-5 h-5 text-[#374151] stroke-[1.5]" /> Systèmes Clés
              </h3>
              <div className="flex flex-wrap gap-2">
                {phase.focus_systems.map((sys, idx) => (
                  <span key={idx} className="px-4 py-2 bg-[#EAF2ED] text-[#1C3F34] border border-[#D2E2D8] rounded-xl text-xs font-bold uppercase tracking-wider">
                    {sys}
                  </span>
                ))}
              </div>
            </div>

            <div>
              {/* Plantes de base */}
              {phase.core_plants && (
                <>
                  <h3 className="text-xl font-black text-[#0F261E] mb-6 flex items-center gap-2.5">
                    <FlaskConical className="w-5 h-5 text-[#374151] stroke-[1.5]" /> Plantes de base (Protocole standard)
                  </h3>
                  <div className="space-y-4 mb-12">
                    {phase.core_plants.map((plant, idx) => (
                      <div key={idx} className="p-4 bg-[#EAF2ED] rounded-2xl border border-[#D2E2D8] shadow-xs">
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-black text-[#0F261E]">{plant.nom}</span>
                          <span className="text-[10px] bg-[#1C3F34] text-white px-2.5 py-0.5 rounded-full uppercase tracking-widest font-black">{plant.partie}</span>
                        </div>
                        <p className="text-xs text-slate-700 leading-relaxed italic">{plant.role}</p>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {/* Plantes optionnelles */}
              {phase.optional_plants && phase.optional_plants.length > 0 && (
                <>
                  <h3 className="text-xl font-black text-[#0F261E] mb-6 flex items-center gap-2.5">
                    <Sparkles className="w-5 h-5 text-[#374151] stroke-[1.5]" /> Options selon Bilan ALMA
                  </h3>
                  <div className="space-y-4 mb-12">
                    {phase.optional_plants.map((plant, idx) => (
                      <div key={idx} className="p-4 bg-[#FAF2E6] rounded-2xl border border-[#EEDFC6] shadow-xs">
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-black text-[#92400E]">{plant.nom}</span>
                          <span className="text-[10px] bg-[#92400E] text-white px-2.5 py-0.5 rounded-full uppercase tracking-widest font-black">{plant.partie}</span>
                        </div>
                        <p className="text-xs text-slate-700 leading-relaxed italic">{plant.role}</p>
                      </div>
                    ))}
                  </div>
                </>
              )}

              <h3 className="text-xl font-black text-[#0F261E] mb-6 flex items-center gap-2.5">
                <Zap className="w-5 h-5 text-[#374151] stroke-[1.5]" /> Actions Recommandées
              </h3>
              <ul className="space-y-4">
                {phase.actions.map((action, idx) => (
                  <li key={idx} className="flex gap-3 text-slate-700 text-sm leading-relaxed">
                    <div className="w-5 h-5 rounded-full bg-[#374151]/10 flex items-center justify-center shrink-0">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#374151]" />
                    </div>
                    {action}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {phase.system_message && (
            <div className="mt-12 p-6 bg-[#0F261E] text-white rounded-3xl text-center border border-[#1C3F34]">
              <p className="text-sm font-medium italic">"{phase.system_message}"</p>
            </div>
          )}

          <div className="mt-16 pt-12 border-t border-[#E7DFD3] flex justify-center">
            <button 
              onClick={() => {
                if (phase.type === 'phase') {
                  onNavigate('boutique');
                } else if (phase.type === 'diagnostic') {
                  onNavigate('chat');
                } else {
                  onNavigate('library');
                }
                onClose();
              }}
              className="px-12 py-5 bg-[#0F261E] hover:bg-[#D97706] active:bg-[#B45309] text-white rounded-2xl font-black text-base shadow-xl hover:shadow-2xl transition-all flex items-center gap-3 cursor-pointer"
            >
              <span>{phase.cta}</span>
              <ArrowRight className="w-5 h-5 stroke-[2]" />
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function PhytotherapyResetPage({ 
  onNavigate, 
  lang,
  isPremium = false,
  user = null,
  onRequireAuth
}: { 
  onNavigate: (view: any) => void, 
  lang: Language,
  isPremium?: boolean,
  user?: any,
  onRequireAuth?: () => void
}) {
  const t = translations[lang].phytotherapyReset;
  const almaT = translations[lang].alma_recommendation;
  const [activeTab, setActiveTab] = useState<'protocol' | 'supplements' | 'chronobiology'>('protocol');
  const [selectedChrono, setSelectedChrono] = useState<string | null>(null);
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
    target: phase.type === 'diagnostic' ? 'chat' : (phase.type === 'pause' ? 'library' : (phase.key === 'phase_0' ? 'herbier' : 'boutique')),
    highlight: phase.type === 'diagnostic'
  }));

  // Mode freemium : les 3 premiers sont libres, à partir de Vitamine D3 + K2 (index 3) c'est réservé à l'abonnement
  const supplements = [
    { name: "Oméga-3 EPA/DHA", dose: "2g / jour", role: "Soutien des membranes et régulation de l'inflammation lipidique.", isFree: true },
    { name: "Magnésium Bisglycinate", dose: "300mg / soir", role: "Relâchement nerveux et activation de plus de 300 réactions enzymatiques.", isFree: true },
    { name: "L-Glutamine", dose: "5g / matin", role: "Carburant des entérocytes et réparation de la barrière intestinale (T1).", isFree: true },
    { name: "Vitamine D3 + K2 (MK7)", dose: "2000 UI / 100µg", role: "Modulation immunitaire et fixation minérale osseuse et vasculaire.", isFree: false },
    { name: "Sélénium", dose: "200µg / jour", role: "Cofacteur de la thyroïde et protection contre le stress oxydatif.", isFree: false },
    { name: "Glycine", dose: "3g / soir", role: "Acide aminé fondamental pour la structure du fascia et le sommeil profond.", isFree: false },
    { name: "Vitamines B (B-Complex)", dose: "1 gélule / matin", role: "Formes actives (B6, B9, B12) pour le métabolisme énergétique et mitochondrial.", isFree: false },
    { name: "Vitamine C (Rhodiola)", dose: "500mg / matin", role: "Soutien des surrénales et protection antioxydante systémique.", isFree: false }
  ];

  // Chronobiologie : activation_matin est libre, à partir de métabolisme_midi (et phases suivantes) c'est réservé à l'abonnement
  const chronoSteps = [
    { 
      id: 'activation_matin',
      icon: Sun, 
      color: "text-orange-500", 
      data: chronobiologyData.activation_matin,
      isFree: true
    },
    { 
      id: 'metabolisme_midi',
      icon: Zap, 
      color: "text-yellow-500", 
      data: chronobiologyData.metabolisme_midi,
      isFree: false
    },
    { 
      id: 'preparation_soir',
      icon: Moon, 
      color: "text-blue-500", 
      data: chronobiologyData.preparation_soir,
      isFree: false
    },
    { 
      id: 'regeneration_nuit',
      icon: Sparkles, 
      color: "text-purple-500", 
      data: chronobiologyData.regeneration_nuit,
      isFree: false
    }
  ];

  return (
    <div className="animate-in fade-in duration-700 bg-[#F9F9F7] min-h-screen pb-20">
      
      <AnimatePresence>
        {selectedPhase && (
          <PhaseDetailModal 
            phase={selectedPhase} 
            onClose={() => setSelectedPhase(null)} 
            onNavigate={onNavigate}
          />
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative pt-20 pb-28 overflow-hidden bg-[#0F261E] text-white rounded-b-[48px] md:rounded-b-[64px] shadow-2xl">
        <div className="absolute inset-0 pointer-events-none">
          <img src={natureHero} className="w-full h-full object-cover opacity-30 mix-blend-overlay" alt={translations[lang].seo.alt.reset_hero} />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0F261E]/40 via-[#0F261E]/80 to-[#0F261E]"></div>
        </div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1C3F34]/90 backdrop-blur-md text-emerald-300 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.25em] mb-6 border border-emerald-500/30 shadow-sm">
            {t.badge}
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black mb-6 leading-tight tracking-tight text-white">
            {t.title} <br />
            <span className="text-[#D97706] text-2xl sm:text-3xl md:text-4xl block mt-3 font-extrabold">{t.title_accent}</span>
          </h1>
          <p className="text-base sm:text-xl text-slate-200 max-w-3xl mx-auto leading-relaxed font-normal mb-8 italic">
            "{t.quote}"
          </p>
        </div>
      </section>

      {/* Navigation Tabs */}
      <div className="container mx-auto px-6 -mt-8 mb-16 relative z-20">
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
          {[
            { id: 'protocol', label: lang === 'fr' ? 'Le Protocole' : 'Protocol', icon: Activity },
            { id: 'supplements', label: lang === 'fr' ? 'Compléments' : 'Supplements', icon: Beaker },
            { id: 'chronobiology', label: lang === 'fr' ? 'Chronobiologie' : 'Chronobiology', icon: Clock }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2.5 px-6 sm:px-8 py-3.5 rounded-2xl font-black text-xs sm:text-sm transition-all shadow-md cursor-pointer ${
                activeTab === tab.id 
                  ? 'bg-[#0F261E] text-white ring-2 ring-[#D97706] shadow-lg' 
                  : 'bg-white text-slate-700 hover:bg-[#FAF7F2] border border-[#E7DFD3]'
              }`}
            >
              <tab.icon className={`w-4 h-4 stroke-[1.5] ${activeTab === tab.id ? 'text-white' : 'text-[#374151]'}`} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-6">
        {activeTab === 'protocol' && (
          <div className="space-y-12">
            {/* New Editorial Section */}
            <div className="max-w-4xl mx-auto text-center mb-16">
              <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-medium">
                {t.intro_editorial}
              </p>
            </div>

            {/* New Journey Phases Block */}
            <div className="bg-[#FAF7F2] rounded-[48px] p-8 md:p-14 border border-[#E7DFD3] shadow-xl mb-16 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#EAF2ED] rounded-bl-full -z-10 opacity-70" />
              <h2 className="text-2xl md:text-4xl font-black text-[#0F261E] mb-6">{t.journey.subtitle}</h2>
              <p className="text-base text-slate-600 mb-10 leading-relaxed">{t.journey.text}</p>
              
              <div className="space-y-8 text-left">
                {[
                  t.journey.step0,
                  t.journey.phase0,
                  t.journey.phase1,
                  t.journey.phase2,
                  t.journey.phase3,
                  t.journey.pauses
                ].map((step, idx) => {
                  const labels = ['0', '0', '1', '2', '3', '∞'];
                  const pastelBg = pastelThemes[idx % pastelThemes.length].bg;
                  const pastelBorder = pastelThemes[idx % pastelThemes.length].border;
                  return (
                    <div key={idx} className={`flex gap-5 p-4 sm:p-5 rounded-2xl ${pastelBg} border ${pastelBorder}`}>
                      <div className="w-9 h-9 rounded-xl bg-[#0F261E] text-white flex items-center justify-center shrink-0 font-black text-xs shadow-xs">
                        {labels[idx]}
                      </div>
                      <div>
                        <h4 className="text-lg font-black text-[#0F261E] mb-1.5">{step.title}</h4>
                        <p className="text-sm text-slate-700 leading-relaxed">{step.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-10 pt-6 border-t border-[#E7DFD3] text-center">
                <p className="text-base sm:text-lg font-bold text-[#0F261E] leading-relaxed max-w-2xl mx-auto italic">
                  {t.journey.footer}
                </p>
              </div>
            </div>

            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-4xl font-black text-[#0F261E] mb-4">{lang === 'fr' ? 'Détail des Étapes' : 'Steps Detail'}</h2>
              <p className="text-sm md:text-base text-slate-600 max-w-2xl mx-auto">
                Suivez les étapes clés pour déverrouiller votre terrain et stabiliser vos ressources vitales durablement.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {resetSteps.map((step, idx) => {
                const theme = pastelThemes[idx % pastelThemes.length];
                return (
                  <div 
                    key={idx} 
                    onClick={() => {
                      if (step.phaseKey !== 'step_0') {
                        const phase = resetPhasesData.find(p => p.key === step.phaseKey);
                        if (phase) setSelectedPhase(phase);
                      }
                    }}
                    className={`${theme.bg} p-6 sm:p-7 rounded-[36px] border ${theme.border} transition-all duration-300 relative group overflow-hidden cursor-pointer shadow-md hover:shadow-xl flex flex-col justify-between`}
                  >
                    <div>
                      <div className="text-[10px] font-black text-slate-600 tracking-[0.2em] mb-2 uppercase">{step.subtitle}</div>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-black text-[#0F261E]">{step.id}</h3>
                        <div className="p-2.5 rounded-xl bg-white/80 border border-slate-300/60 text-[#2D3748] shadow-xs">
                          <step.icon className="w-4 h-4 stroke-[1.5] text-[#2D3748]" />
                        </div>
                      </div>
                      <h4 className="text-base font-bold text-[#0F261E] mb-3">{step.title}</h4>
                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-6">{step.desc}</p>
                    </div>

                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        if (step.phaseKey === 'step_0') {
                          onNavigate(step.target as any);
                        } else {
                          const phase = resetPhasesData.find(p => p.key === step.phaseKey);
                          if (phase) setSelectedPhase(phase);
                        }
                      }}
                      className="w-full py-3.5 px-4 rounded-xl font-black text-xs uppercase tracking-wider bg-[#0F261E] hover:bg-[#D97706] active:bg-[#B45309] text-white shadow-md hover:shadow-lg transition-all cursor-pointer"
                    >
                      {step.action}
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Détails des Phases - VIGNETTES EN FONDS PASTELS DIVERS */}
            <div className="bg-[#EAF2ED] rounded-[48px] p-8 md:p-14 border border-[#D2E2D8] shadow-xl mt-12 relative overflow-hidden">
               <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <div className="inline-block px-3 py-1 bg-[#1C3F34] text-white text-[10px] font-black uppercase tracking-widest rounded-full mb-4">
                      Étape 0
                    </div>
                    <h3 className="text-2xl md:text-3xl font-black text-[#0F261E] mb-8">Phase 0 : Préparation des Émonctoires</h3>
                    <div className="space-y-6">
                       <div className="p-5 rounded-2xl bg-white/80 border border-[#D2E2D8] flex flex-col items-start gap-3">
                          <div className="w-10 h-10 rounded-xl bg-[#FAF7F2] border border-[#D2E2D8] flex items-center justify-center text-[#2D3748]">
                            <Wind className="w-5 h-5 stroke-[1.5]" />
                          </div>
                          <div>
                            <h4 className="text-lg font-black text-[#0F261E] mb-1.5">Ouverture & Drainage (Prêle, Orthosiphon)</h4>
                            <p className="text-sm text-slate-700 leading-relaxed">Étape cruciale pour éliminer les acides et préparer la filtration lymphatique. Prépare les reins et la lymphe.</p>
                          </div>
                       </div>
                       <div className="p-5 rounded-2xl bg-white/80 border border-[#D2E2D8] flex flex-col items-start gap-3">
                          <div className="w-10 h-10 rounded-xl bg-[#FAF7F2] border border-[#D2E2D8] flex items-center justify-center text-[#2D3748]">
                            <Shield className="w-5 h-5 stroke-[1.5]" />
                          </div>
                          <div>
                            <h4 className="text-lg font-black text-[#0F261E] mb-1.5">Dépuration & Douceur (Bardane, Mauve)</h4>
                            <p className="text-sm text-slate-700 leading-relaxed">Soutient le foie et l'intestin tout en apaisant les muqueuses. Indispensable avant le drainage profond.</p>
                          </div>
                       </div>
                    </div>
                  </div>
                  <div className="rounded-[32px] overflow-hidden shadow-xl h-[360px] border border-white/50">
                    <img 
                      src={emonctoiresImg} 
                      className="w-full h-full object-cover" 
                      alt={translations[lang].seo.alt.phase0} 
                    />
                  </div>
               </div>
            </div>

            <div className="bg-[#FAF2E6] rounded-[48px] p-8 md:p-14 border border-[#EEDFC6] shadow-xl mt-12 relative overflow-hidden">
               <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <div className="inline-block px-3 py-1 bg-[#92400E] text-white text-[10px] font-black uppercase tracking-widest rounded-full mb-4">
                      Étape 1
                    </div>
                    <h3 className="text-2xl md:text-3xl font-black text-[#0F261E] mb-8">Phase 1 : Relance Hépatique</h3>
                    <div className="space-y-6">
                       <div className="p-5 rounded-2xl bg-white/80 border border-[#EEDFC6] flex flex-col items-start gap-3">
                          <div className="w-10 h-10 rounded-xl bg-[#FAF7F2] border border-[#EEDFC6] flex items-center justify-center text-[#2D3748]">
                            <FlaskConical className="w-5 h-5 stroke-[1.5]" />
                          </div>
                          <div>
                            <h4 className="text-lg font-black text-[#0F261E] mb-1.5">Mobilisation Totale (Gentiane, Radis Noir)</h4>
                            <p className="text-sm text-slate-700 leading-relaxed">Gentiane, Salsepareille, Pissenlit racine et Radis noir pour mobiliser les toxines et relancer la filtration profonde.</p>
                          </div>
                       </div>
                       <div className="p-5 rounded-2xl bg-white/80 border border-[#EEDFC6] flex flex-col items-start gap-3">
                          <div className="w-10 h-10 rounded-xl bg-[#FAF7F2] border border-[#EEDFC6] flex items-center justify-center text-[#2D3748]">
                            <Waves className="w-5 h-5 stroke-[1.5]" />
                          </div>
                          <div>
                            <h4 className="text-lg font-black text-[#0F261E] mb-1.5">Soutien Bilio-Digestif (Artichaut, Chrysanthellum)</h4>
                            <p className="text-sm text-slate-700 leading-relaxed">Artichaut, Orange amère, Gingembre et Poivre Noir pour protéger les hépatocytes et fluidifier la bile.</p>
                          </div>
                       </div>
                    </div>
                  </div>
                  <div className="rounded-[32px] overflow-hidden shadow-xl h-[360px] border border-white/50">
                    <img 
                      src={hepaticImg} 
                      className="w-full h-full object-cover" 
                      alt={translations[lang].seo.alt.phase1} 
                    />
                  </div>
               </div>
            </div>

            {/* Pause Block */}
            <div className="bg-[#0F261E] rounded-[48px] p-8 md:p-14 text-white mt-12 relative overflow-hidden shadow-2xl border border-[#1C3F34]">
               <div className="max-w-3xl mx-auto text-center">
                  <Clock className="w-12 h-12 text-[#E2E8F0] stroke-[1.5] mx-auto mb-6" />
                  <h3 className="text-2xl md:text-3xl font-black mb-4">La Pause Intégrative</h3>
                  <p className="text-base sm:text-lg text-slate-200 leading-relaxed mb-6">
                    Entre chaque phase de 21 jours, nous observons 7 jours de repos total. Ce n'est pas un arrêt, mais une étape d'intégration cruciale où votre corps stabilise les acquis et laisse sa propre pharmacie intérieure prendre le relais.
                  </p>
                  <div className="inline-flex items-center gap-2 bg-[#1C3F34] px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.25em] border border-emerald-500/30 text-emerald-300">
                    Secret du Protocole Systémique
                  </div>
               </div>
            </div>

            <div className="bg-[#F5EFEB] rounded-[48px] p-8 md:p-14 border border-[#E4D7CD] shadow-xl mt-12 relative overflow-hidden">
               <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <div className="inline-block px-3 py-1 bg-[#7C2D12] text-white text-[10px] font-black uppercase tracking-widest rounded-full mb-4">
                      Étape 2
                    </div>
                    <h3 className="text-2xl md:text-3xl font-black text-[#0F261E] mb-8">Phase 2 : Pureté Sanguine</h3>
                    <div className="space-y-6">
                       <div className="p-5 rounded-2xl bg-white/80 border border-[#E4D7CD] flex flex-col items-start gap-3">
                          <div className="w-10 h-10 rounded-xl bg-[#FAF7F2] border border-[#E4D7CD] flex items-center justify-center text-[#2D3748]">
                            <Shield className="w-5 h-5 stroke-[1.5]" />
                          </div>
                          <div>
                            <h4 className="text-lg font-black text-[#0F261E] mb-1.5">Purification du Sang (Manjishtha, Ortie)</h4>
                            <p className="text-sm text-slate-700 leading-relaxed">Nettoyage de fond du terrain sanguin et régulation de l'équilibre circulatoire via des plantes ancestrales.</p>
                          </div>
                       </div>
                       <div className="p-5 rounded-2xl bg-white/80 border border-[#E4D7CD] flex flex-col items-start gap-3">
                          <div className="w-10 h-10 rounded-xl bg-[#FAF7F2] border border-[#E4D7CD] flex items-center justify-center text-[#2D3748]">
                            <Activity className="w-5 h-5 stroke-[1.5]" />
                          </div>
                          <div>
                            <h4 className="text-lg font-black text-[#0F261E] mb-1.5">Équilibre Global (Cassis, Curcuma)</h4>
                            <p className="text-sm text-slate-700 leading-relaxed">Soutien de la réactivité immunitaire et protection des tissus contre l'usure de fond.</p>
                          </div>
                       </div>
                    </div>
                  </div>
                  <div className="rounded-[32px] overflow-hidden shadow-xl h-[360px] border border-white/50">
                    <img 
                      src={bloodPurityImg} 
                      className="w-full h-full object-cover" 
                      alt={translations[lang].seo.alt.phase2} 
                    />
                  </div>
               </div>
            </div>

            <div className="bg-[#EEF2F6] rounded-[48px] p-8 md:p-14 border border-[#D0DCE7] shadow-xl mt-12 relative overflow-hidden">
               <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <div className="inline-block px-3 py-1 bg-[#1E3A5F] text-white text-[10px] font-black uppercase tracking-widest rounded-full mb-4">
                      Étape 3
                    </div>
                    <h3 className="text-2xl md:text-3xl font-black text-[#0F261E] mb-8">Phase 3 : Stabilisation & Renforcement</h3>
                    <div className="space-y-6">
                       <div className="p-5 rounded-2xl bg-white/80 border border-[#D0DCE7] flex flex-col items-start gap-3">
                          <div className="w-10 h-10 rounded-xl bg-[#FAF7F2] border border-[#D0DCE7] flex items-center justify-center text-[#2D3748]">
                            <Sparkles className="w-5 h-5 stroke-[1.5]" />
                          </div>
                          <div>
                            <h4 className="text-lg font-black text-[#0F261E] mb-1.5">Régénération Tissulaire (Centella, Prêle)</h4>
                            <p className="text-sm text-slate-700 leading-relaxed">Consolidation de la barrière intestinale et cutanée pour un ancrage durable des résultats.</p>
                          </div>
                       </div>
                       <div className="p-5 rounded-2xl bg-white/80 border border-[#D0DCE7] flex flex-col items-start gap-3">
                          <div className="w-10 h-10 rounded-xl bg-[#FAF7F2] border border-[#D0DCE7] flex items-center justify-center text-[#2D3748]">
                            <Zap className="w-5 h-5 stroke-[1.5]" />
                          </div>
                          <div>
                            <h4 className="text-lg font-black text-[#0F261E] mb-1.5">Bouclier Botanique (Astragale, Romarin)</h4>
                            <p className="text-sm text-slate-700 leading-relaxed">Renforcement du terrain de fond et protection cellulaire contre les stress futurs.</p>
                          </div>
                       </div>
                    </div>
                  </div>
                  <div className="rounded-[32px] overflow-hidden shadow-xl h-[360px] border border-white/50">
                    <img 
                      src={strengthPlant} 
                      className="w-full h-full object-cover" 
                      alt={translations[lang].seo.alt.phase3} 
                    />
                  </div>
               </div>
            </div>
          </div>
        )}

        {activeTab === 'supplements' && (
          <div className="animate-in slide-in-from-bottom duration-700 max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-[#0F261E]/5 border border-[#0F261E]/10 px-3.5 py-1.5 rounded-full text-[11px] font-bold text-[#0F261E] mb-4">
                <span>Mode Freemium : 3 compléments libres d'accès • 5 réservés aux abonnés</span>
              </div>
              <h2 className="text-2xl md:text-4xl font-black text-[#0F261E] mb-4">Compléments Alimentaires</h2>
              <p className="text-sm md:text-base text-slate-600 max-w-2xl mx-auto">
                Le socle indispensable pour que le Totum végétal puisse s'exprimer pleinement dans vos cellules.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              {supplements.map((item, idx) => {
                const theme = pastelThemes[idx % pastelThemes.length];
                const isLocked = !item.isFree && !isPremium;
                return (
                  <div key={idx} className={`${theme.bg} p-6 sm:p-7 rounded-[32px] border ${theme.border} shadow-md flex gap-5 items-start relative overflow-hidden`}>
                    <div className="w-12 h-12 bg-white rounded-2xl border border-slate-200 flex items-center justify-center shrink-0 shadow-xs mt-0.5">
                      {isLocked ? (
                        <Lock className="w-6 h-6 stroke-[1.5] text-[#92400E]" />
                      ) : (
                        <Beaker className="w-6 h-6 stroke-[1.5] text-[#2D3748]" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                        <h4 className="font-black text-[#0F261E] text-base">{item.name}</h4>
                        {isLocked ? (
                          <span className="text-[10px] bg-[#92400E] text-white px-2.5 py-0.5 rounded-full font-black uppercase tracking-wider flex items-center gap-1">
                            <Lock className="w-2.5 h-2.5" /> Abonnement
                          </span>
                        ) : (
                          <span className="text-[10px] bg-[#0F261E] text-white px-2.5 py-0.5 rounded-full font-black uppercase tracking-wider">{item.dose}</span>
                        )}
                      </div>
                      
                      {isLocked ? (
                        <div className="mt-2 space-y-2">
                          <p className="text-xs text-slate-500 italic">
                            Dosage et explications thérapeutiques réservés aux abonnés digitaux.
                          </p>
                          <button
                            onClick={() => onNavigate('abonnement')}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#D97706] hover:bg-[#B45309] text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
                          >
                            <Lock className="w-3.5 h-3.5" /> Débloquer (9 €/mois)
                          </button>
                        </div>
                      ) : (
                        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">{item.role}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Freemium Upgrade Box if not premium */}
            {!isPremium && (
              <div className="mt-12 bg-gradient-to-br from-[#0F261E] to-[#1C3F34] text-white p-8 md:p-12 rounded-[36px] border border-[#D97706]/30 shadow-2xl relative overflow-hidden">
                <div className="max-w-3xl relative z-10">
                  <div className="inline-flex items-center gap-2 bg-[#D97706]/20 text-[#D97706] px-3.5 py-1.5 rounded-full text-[11px] font-black uppercase tracking-widest mb-4 border border-[#D97706]/30">
                    <Lock className="w-3.5 h-3.5" />
                    Mode Freemium • Compléments Systémiques
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black mb-3">
                    Débloquez l'Intégralité des Fiches & Posologies de Terrain
                  </h3>
                  <p className="text-sm md:text-base text-slate-200 leading-relaxed mb-8">
                    À partir de la Vitamine D3 + K2 (MK7), les posologies précises, cofacteurs d'assimilation et protocoles de micronutrition sont réservés aux abonnés. Profitez d'un abonnement digital sans engagement à 9 €/mois, résiliable chaque mois en 1 clic.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <button
                      onClick={() => onNavigate('abonnement')}
                      className="w-full sm:w-auto px-8 py-4 bg-[#D97706] hover:bg-[#B45309] active:bg-[#92400E] text-white rounded-2xl font-black text-sm md:text-base shadow-lg transition-all flex items-center justify-center gap-3 cursor-pointer"
                    >
                      <span>S'abonner à l'Abonnement Digital (9 €/mois)</span>
                      <ArrowRight className="w-5 h-5 stroke-[2]" />
                    </button>
                    <button
                      onClick={() => onRequireAuth ? onRequireAuth() : onNavigate('account')}
                      className="w-full sm:w-auto px-6 py-4 bg-white/10 hover:bg-white/20 text-white rounded-2xl font-bold text-sm transition-colors cursor-pointer text-center"
                    >
                      Déjà abonné ? Se connecter
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'chronobiology' && (
          <div className="animate-in slide-in-from-bottom duration-700">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-[#0F261E]/5 border border-[#0F261E]/10 px-3.5 py-1.5 rounded-full text-[11px] font-bold text-[#0F261E] mb-4">
                <span>Mode Freemium : Matin en accès libre • Dès Métabolisme (11h) réservé aux abonnés</span>
              </div>
              <h2 className="text-2xl md:text-4xl font-black text-[#0F261E] mb-4">Chronobiologie du Protocole</h2>
              <p className="text-sm md:text-base text-slate-600 max-w-2xl mx-auto">
                Respecter les rythmes circadiens pour une efficacité décuplée de votre pharmacie intérieure. Cliquez sur une phase pour découvrir son protocole.
              </p>
            </div>

            <div className="max-w-5xl mx-auto space-y-5">
               {chronoSteps.map((step, idx) => {
                 const theme = pastelThemes[idx % pastelThemes.length];
                 const isSelected = selectedChrono === step.id;
                 const isLocked = !step.isFree && !isPremium;
                 return (
                   <div key={idx} className="space-y-4">
                     <button 
                      onClick={() => setSelectedChrono(isSelected ? null : step.id)}
                      className={`w-full ${theme.bg} p-6 sm:p-7 rounded-[32px] border ${theme.border} shadow-md flex flex-col md:flex-row items-center gap-6 group transition-all text-left cursor-pointer ${isSelected ? 'ring-2 ring-[#0F261E]' : 'hover:shadow-lg'}`}
                     >
                        <div className="flex flex-col items-center gap-2 min-w-[120px]">
                          <span className="text-xs font-black text-[#0F261E] tracking-widest">{step.data.time_window}</span>
                          <div className="p-3.5 rounded-2xl bg-white border border-slate-200 text-[#2D3748] shadow-xs group-hover:scale-105 transition-transform">
                             <step.icon className="w-6 h-6 stroke-[1.5] text-[#2D3748]" />
                          </div>
                        </div>
                        <div className="flex-1">
                           <div className="flex items-center gap-3 mb-1.5 flex-wrap">
                             <h4 className="text-xl font-black text-[#0F261E]">{step.data.title}</h4>
                             {isLocked && (
                               <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#92400E] text-white text-[10px] font-black uppercase tracking-wider">
                                 <Lock className="w-2.5 h-2.5" /> Abonnement Digital
                               </span>
                             )}
                           </div>
                           <p className="text-sm text-slate-700 leading-relaxed">{step.data.short_text}</p>
                        </div>
                        <div className="hidden md:block">
                           <motion.div
                            animate={{ rotate: isSelected ? 90 : 0 }}
                            transition={{ duration: 0.3 }}
                           >
                            <ArrowRight className="w-6 h-6 stroke-[2] text-[#2D3748]" />
                           </motion.div>
                        </div>
                     </button>
                     
                     {isSelected && (
                       isLocked ? (
                         <motion.div 
                          initial={{ opacity: 0, y: -15 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="bg-[#FAF7F2] p-8 md:p-10 rounded-[32px] border-2 border-[#D97706]/40 mx-2 sm:mx-6 shadow-xl text-center"
                         >
                           <div className="w-14 h-14 mx-auto rounded-2xl bg-[#0F261E] text-[#D97706] flex items-center justify-center mb-4 shadow-md">
                             <Lock className="w-7 h-7 stroke-[1.75]" />
                           </div>
                           <div className="inline-block px-3 py-1 bg-[#D97706]/10 text-[#B45309] text-xs font-black uppercase tracking-widest rounded-full mb-3">
                             Phase Réservée aux Abonnés
                           </div>
                           <h4 className="text-2xl md:text-3xl font-black text-[#0F261E] mb-3">
                             {step.data.title} : Accès Verrouillé
                           </h4>
                           <p className="text-sm md:text-base text-slate-700 max-w-2xl mx-auto mb-6 leading-relaxed">
                             À partir de la phase Métabolisme (11h-15h), les protocoles d'assimilation cellulaire, synergies de plantes et conseils circadiens approfondis sont réservés aux abonnés. Abonnement digital à 9 €/mois, sans engagement, résiliable chaque mois en 1 clic.
                           </p>
                           <div className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-md mx-auto">
                             <button
                               onClick={() => onNavigate('abonnement')}
                               className="w-full sm:w-auto px-8 py-3.5 bg-[#D97706] hover:bg-[#B45309] text-white rounded-2xl font-black text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                             >
                               <span>S'abonner (9 €/mois)</span>
                               <ArrowRight className="w-4 h-4 stroke-[2]" />
                             </button>
                             <button
                               onClick={() => onRequireAuth ? onRequireAuth() : onNavigate('account')}
                               className="w-full sm:w-auto px-6 py-3.5 bg-white border border-[#E7DFD3] hover:bg-slate-50 text-slate-700 rounded-2xl font-bold text-sm transition-colors cursor-pointer"
                             >
                               Déjà membre ? Se connecter
                             </button>
                           </div>
                         </motion.div>
                       ) : (
                         <motion.div 
                          initial={{ opacity: 0, y: -15 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="bg-white p-8 sm:p-10 rounded-[32px] border border-[#E7DFD3] mx-2 sm:mx-6 shadow-xl"
                         >
                           <div className="mb-10">
                             <p className="text-slate-800 font-medium leading-relaxed italic mb-8 p-5 bg-[#FAF7F2] rounded-2xl border border-[#E7DFD3]">
                               "{step.data.long_text}"
                             </p>
                             
                             <div className="grid md:grid-cols-2 gap-10">
                               <div>
                                 <h5 className="text-xs font-black text-[#0F261E] uppercase tracking-widest mb-4 flex items-center gap-2">
                                   <CheckCircle className="w-4 h-4 stroke-[1.5] text-[#2D3748]" /> Objectifs
                                 </h5>
                                 <ul className="space-y-3">
                                   {step.data.objectives.map((obj, i) => (
                                     <li key={i} className="flex gap-2.5 text-slate-700 text-sm leading-relaxed">
                                       <span className="w-1.5 h-1.5 rounded-full bg-[#0F261E] shrink-0 mt-2" />
                                       {obj}
                                     </li>
                                   ))}
                                  </ul>
                               </div>
                               
                               <div>
                                 <h5 className="text-xs font-black text-[#0F261E] uppercase tracking-widest mb-4 flex items-center gap-2">
                                   <FlaskConical className="w-4 h-4 stroke-[1.5] text-[#2D3748]" /> Plantes Clés
                                 </h5>
                                 <div className="space-y-3">
                                   {step.data.core_plants.map((plant, i) => (
                                     <div key={i} className="p-3.5 bg-[#FAF7F2] rounded-xl border border-[#E7DFD3]">
                                       <div className="font-bold text-[#0F261E] text-sm mb-0.5">{plant.nom}</div>
                                       <p className="text-xs text-slate-600 leading-relaxed">{plant.role}</p>
                                     </div>
                                   ))}

                                   {step.data.core_supplements && step.data.core_supplements.length > 0 && (
                                     <div className="mt-6">
                                       <h6 className="text-[10px] font-black text-[#92400E] uppercase tracking-widest mb-2">Compléments de terrain</h6>
                                       <div className="space-y-2.5">
                                         {step.data.core_supplements.map((supp, i) => (
                                           <div key={i} className="p-3.5 bg-[#FAF2E6] rounded-xl border border-[#EEDFC6]">
                                             <div className="font-bold text-[#92400E] text-sm mb-0.5">{supp.nom}</div>
                                             <p className="text-xs text-slate-700 leading-relaxed">{supp.role}</p>
                                             {supp.avertissement && (
                                               <p className="mt-1 text-[10px] text-red-600 font-bold italic">⚠️ {supp.avertissement}</p>
                                             )}
                                           </div>
                                         ))}
                                       </div>
                                     </div>
                                   )}
                                 </div>
                               </div>
                             </div>
                           </div>
                           
                           <div className="p-5 bg-[#0F261E] text-white rounded-2xl text-center border border-[#1C3F34]">
                             <p className="text-xs sm:text-sm font-medium italic">"{step.data.system_message}"</p>
                           </div>
                         </motion.div>
                       )
                     )}
                   </div>
                 );
               })}
            </div>
          </div>
        )}
      </div>

      {/* ALMA Recommendation Section */}
      <section className="mt-20 container mx-auto px-6">
        <div className="bg-[#FAF7F2] rounded-[48px] p-8 md:p-14 border border-[#E7DFD3] shadow-xl relative overflow-hidden group">
          <div className="max-w-4xl relative z-10">
            <span className="inline-block px-3.5 py-1 bg-[#1C3F34] text-white text-[10px] font-black uppercase tracking-widest rounded-full mb-6">
              {almaT.badge}
            </span>
            <h2 className="text-2xl md:text-4xl font-black text-[#0F261E] mb-4 leading-tight">
              {almaT.title} {almaT.title_accent}
            </h2>
            <div 
              className="text-base sm:text-lg text-slate-700 mb-8 leading-relaxed font-normal"
              dangerouslySetInnerHTML={{ __html: almaT.description }}
            />
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => onNavigate('chat')}
                className="px-8 py-4 bg-[#0F261E] hover:bg-[#D97706] active:bg-[#B45309] text-white rounded-2xl font-black text-sm sm:text-base shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3 cursor-pointer"
              >
                <span>{almaT.cta_primary}</span>
                <ArrowRight className="w-5 h-5 stroke-[2]" />
              </button>
              <button 
                onClick={() => onNavigate('pillar-extraction')}
                className="px-8 py-4 bg-white text-[#0F261E] border border-[#0F261E]/30 rounded-2xl font-bold text-sm sm:text-base hover:bg-[#F3EEE6] active:bg-[#E7DFD3] transition-all flex items-center justify-center cursor-pointer"
              >
                <span>{almaT.cta_secondary}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="mt-24 container mx-auto px-6">
        <div className="bg-[#0F261E] rounded-[48px] p-10 md:p-18 text-center text-white relative overflow-hidden shadow-2xl border border-[#1C3F34]">
          <h2 className="text-2xl md:text-5xl font-black mb-6 relative z-10 text-white">{t.title} {t.title_accent}</h2>
          <p className="text-base md:text-lg text-slate-300 mb-10 max-w-2xl mx-auto relative z-10 leading-relaxed">
            {t.description}
          </p>
          <div className="flex flex-wrap justify-center gap-4 relative z-10">
            <button 
              onClick={() => onNavigate('abonnement')}
              className="px-9 py-4 bg-[#D97706] hover:bg-[#B45309] active:bg-[#92400E] text-white rounded-2xl font-black text-base shadow-xl hover:shadow-2xl transition-all flex items-center gap-2.5 cursor-pointer"
            >
              <span>{t.cta_primary}</span>
              <ArrowRight className="w-5 h-5 stroke-[2]" />
            </button>
            <button 
              onClick={() => onNavigate('machine')}
              className="px-9 py-4 bg-[#1C3F34] hover:bg-[#D97706] active:bg-[#B45309] text-white border border-emerald-500/30 rounded-2xl font-black text-base transition-all shadow-md cursor-pointer"
            >
              {t.cta_secondary}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

function MessageCircleIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    </svg>
  )
}
