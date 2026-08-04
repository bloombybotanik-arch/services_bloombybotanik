import React, { useState } from 'react';
import { Shield, FlaskConical, Activity, Heart, ArrowRight, CheckCircle, Search, Microscope, Beaker, Sparkles, Zap, Brain, Wind, Lock, Sun, Moon, Utensils, Clock, Waves, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { resetPhasesData, ResetPhaseDetail } from './data/resetPhases';
import { chronobiologyData, ChronoPhase } from './data/chronobiology';
import { translations, Language } from './translations';

import natureHero from './assets/images/nature_biology_reset_hero_1785755295636.jpg';
import emonctoiresImg from './assets/images/emonctoires_natural_drainage_1785755307026.jpg';
import hepaticImg from './assets/images/hepatic_balance_liver_1785755318947.jpg';
import bloodPurityImg from './assets/images/blood_purity_lymphatic_1785755331143.jpg';

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
            <div className="text-sm font-black text-botanik-orange tracking-[0.3em] mb-2 uppercase">{phase.subtitle}</div>
            <h2 className="text-3xl md:text-5xl font-bold text-botanik-green mb-6 leading-tight">
              {phase.title} : {phase.name}
            </h2>
            <div className="p-6 bg-botanik-orange/5 rounded-3xl border border-botanik-orange/10">
              <p className="text-botanik-green font-medium leading-relaxed italic">
                {phase.long_text}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-bold text-botanik-green mb-6 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-botanik-orange" /> Objectifs de la Phase
              </h3>
              <ul className="space-y-4">
                {phase.objectives.map((obj, idx) => (
                  <li key={idx} className="flex gap-3 text-botanik-green/70 text-sm leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-botanik-orange shrink-0 mt-2" />
                    {obj}
                  </li>
                ))}
              </ul>

              <h3 className="text-xl font-bold text-botanik-green mt-12 mb-6 flex items-center gap-2">
                <Activity className="w-5 h-5 text-botanik-orange" /> Systèmes Clés
              </h3>
              <div className="flex flex-wrap gap-2">
                {phase.focus_systems.map((sys, idx) => (
                  <span key={idx} className="px-4 py-2 bg-botanik-green/5 text-botanik-green rounded-xl text-xs font-bold uppercase tracking-wider">
                    {sys}
                  </span>
                ))}
              </div>
            </div>

            <div>
              {/* Plantes de base */}
              {phase.core_plants && (
                <>
                  <h3 className="text-xl font-bold text-botanik-green mb-6 flex items-center gap-2">
                    <FlaskConical className="w-5 h-5 text-botanik-orange" /> Plantes de base (Reset standard)
                  </h3>
                  <div className="space-y-4 mb-12">
                    {phase.core_plants.map((plant, idx) => (
                      <div key={idx} className="p-4 bg-white rounded-3xl border border-botanik-green/5 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-bold text-botanik-green">{plant.nom}</span>
                          <span className="text-[10px] bg-botanik-green/5 text-botanik-green px-2 py-0.5 rounded-full uppercase tracking-widest font-black">{plant.partie}</span>
                        </div>
                        <p className="text-xs text-botanik-green/60 leading-relaxed italic">{plant.role}</p>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {/* Plantes optionnelles */}
              {phase.optional_plants && phase.optional_plants.length > 0 && (
                <>
                  <h3 className="text-xl font-bold text-botanik-green mb-6 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-botanik-magenta" /> Options selon Bilan ALMA
                  </h3>
                  <div className="space-y-4 mb-12">
                    {phase.optional_plants.map((plant, idx) => (
                      <div key={idx} className="p-4 bg-botanik-magenta/5 rounded-3xl border border-botanik-magenta/10 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-bold text-botanik-magenta">{plant.nom}</span>
                          <span className="text-[10px] bg-botanik-magenta/10 text-botanik-magenta px-2 py-0.5 rounded-full uppercase tracking-widest font-black">{plant.partie}</span>
                        </div>
                        <p className="text-xs text-botanik-magenta/60 leading-relaxed italic">{plant.role}</p>
                      </div>
                    ))}
                  </div>
                </>
              )}

              <h3 className="text-xl font-bold text-botanik-green mb-6 flex items-center gap-2">
                <Zap className="w-5 h-5 text-botanik-orange" /> Actions Recommandées
              </h3>
              <ul className="space-y-4">
                {phase.actions.map((action, idx) => (
                  <li key={idx} className="flex gap-3 text-botanik-green/70 text-sm leading-relaxed">
                    <div className="w-5 h-5 rounded-full bg-botanik-green/5 flex items-center justify-center shrink-0">
                      <div className="w-1 h-1 rounded-full bg-botanik-green" />
                    </div>
                    {action}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {phase.system_message && (
            <div className="mt-12 p-6 bg-botanik-green text-white rounded-3xl text-center">
              <p className="text-sm font-medium italic">"{phase.system_message}"</p>
            </div>
          )}

          <div className="mt-16 pt-12 border-t border-botanik-green/10 flex justify-center">
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
              className="px-12 py-6 bg-botanik-orange text-white rounded-2xl font-bold shadow-2xl shadow-botanik-orange/20 hover:scale-105 transition-all flex items-center gap-3"
            >
              {phase.cta} <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function PhytotherapyResetPage({ onNavigate, lang }: { onNavigate: (view: any) => void, lang: Language }) {
  const t = translations[lang].phytotherapyReset;
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

  const supplements = [
    { name: "Oméga-3 EPA/DHA", dose: "2g / jour", role: "Soutien des membranes et régulation de l'inflammation lipidique." },
    { name: "Magnésium Bisglycinate", dose: "300mg / soir", role: "Relâchement nerveux et activation de plus de 300 réactions enzymatiques." },
    { name: "L-Glutamine", dose: "5g / matin", role: "Carburant des entérocytes et réparation de la barrière intestinale (T1)." },
    { name: "Vitamine D3 + K2 (MK7)", dose: "2000 UI / 100µg", role: "Modulation immunitaire et fixation minérale osseuse et vasculaire." },
    { name: "Sélénium", dose: "200µg / jour", role: "Cofacteur de la thyroïde et protection contre le stress oxydatif." },
    { name: "Glycine", dose: "3g / soir", role: "Acide aminé fondamental pour la structure du fascia et le sommeil profond." },
    { name: "Vitamines B (B-Complex)", dose: "1 gélule / matin", role: "Formes actives (B6, B9, B12) pour le métabolisme énergétique et mitochondrial." },
    { name: "Vitamine C (Rhodiola)", dose: "500mg / matin", role: "Soutien des surrénales et protection antioxydante systémique." }
  ];

  const chronoSteps = [
    { 
      id: 'activation_matin',
      icon: Sun, 
      color: "text-orange-500", 
      data: chronobiologyData.activation_matin
    },
    { 
      id: 'metabolisme_midi',
      icon: Zap, 
      color: "text-yellow-500", 
      data: chronobiologyData.metabolisme_midi
    },
    { 
      id: 'preparation_soir',
      icon: Moon, 
      color: "text-blue-500", 
      data: chronobiologyData.preparation_soir
    },
    { 
      id: 'regeneration_nuit',
      icon: Sparkles, 
      color: "text-purple-500", 
      data: chronobiologyData.regeneration_nuit
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
      <section className="relative pt-20 pb-32 overflow-hidden bg-botanik-green text-white rounded-b-[60px] md:rounded-b-[100px] shadow-2xl">
        <div className="absolute inset-0 pointer-events-none">
          <img src={natureHero} className="w-full h-full object-cover opacity-40 mix-blend-overlay" alt="" />
          <div className="absolute inset-0 bg-gradient-to-b from-botanik-green/20 to-botanik-green"></div>
        </div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-botanik-orange px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-8 border border-white/10">
            {t.badge}
          </div>
          <h1 className="text-4xl md:text-8xl font-bold mb-8 leading-[0.9] tracking-tighter">
            {t.title} <br />
            <span className="text-botanik-orange">{t.title_accent}</span>
          </h1>
          <p className="text-base md:text-2xl text-white/70 max-w-2xl mx-auto leading-relaxed font-light mb-12 italic">
            {t.quote}
          </p>
        </div>
      </section>

      {/* Navigation Tabs */}
      <div className="container mx-auto px-6 -mt-10 mb-20 relative z-20">
        <div className="flex flex-wrap justify-center gap-4">
          {[
            { id: 'protocol', label: 'Le Protocole', icon: Activity },
            { id: 'supplements', label: 'Compléments', icon: Beaker },
            { id: 'chronobiology', label: 'Chronobiologie', icon: Clock }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-sm transition-all shadow-xl ${
                activeTab === tab.id 
                  ? 'bg-botanik-orange text-white scale-105' 
                  : 'bg-white text-botanik-green hover:bg-gray-50'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-6">
        {activeTab === 'protocol' && (
          <div className="space-y-12">
            <div className="text-center mb-16">
              <h2 className="text-2xl md:text-5xl font-bold text-botanik-green mb-6">Un voyage de 90 jours</h2>
              <p className="text-base md:text-lg text-botanik-green/60 max-w-2xl mx-auto">
                Suivez les étapes clés pour déverrouiller votre terrain et stabiliser vos ressources vitales durablement.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {resetSteps.map((step, idx) => (
                <div 
                  key={idx} 
                  onClick={() => {
                    if (step.phaseKey !== 'step_0') {
                      const phase = resetPhasesData.find(p => p.key === step.phaseKey);
                      if (phase) setSelectedPhase(phase);
                    }
                  }}
                  className={`${
                    step.type === 'diagnostic' || step.type === 'pause' ? 'bg-botanik-orange/10' : 'bg-white'
                  } p-8 rounded-[48px] border transition-all duration-500 relative group overflow-hidden cursor-pointer ${
                    step.highlight ? 'border-botanik-orange ring-4 ring-botanik-orange/5 shadow-2xl' : 'border-botanik-green/5 shadow-lg hover:shadow-xl'
                  }`}
                >
                  <div className="text-[10px] font-black text-botanik-orange tracking-[0.3em] mb-2 uppercase">{step.subtitle}</div>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-botanik-green">{step.id}</h3>
                    <div className={`p-2 rounded-lg ${step.highlight ? 'bg-botanik-orange/10 text-botanik-orange' : 'bg-botanik-green/5 text-botanik-green'}`}>
                      <step.icon className="w-4 h-4" />
                    </div>
                  </div>
                  <h4 className="text-lg font-bold text-botanik-green mb-4">{step.title}</h4>
                  <p className="text-sm text-botanik-green/60 leading-relaxed mb-8 flex-1">{step.desc}</p>
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
                    className={`w-full py-4 rounded-2xl font-bold text-xs uppercase tracking-widest transition-all ${
                      step.highlight ? 'bg-botanik-orange text-white shadow-lg' : 'bg-botanik-green/5 text-botanik-green hover:bg-botanik-green/10'
                    }`}
                  >
                    {step.action}
                  </button>
                </div>
              ))}
            </div>

            {/* Détails des Phases */}
            <div className="bg-white rounded-[60px] p-10 md:p-20 border border-botanik-green/5 shadow-2xl mt-16 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-botanik-orange/5 rounded-bl-full -z-10" />
               <div className="grid lg:grid-cols-2 gap-16 items-center">
                  <div>
                    <h3 className="text-2xl md:text-4xl font-bold text-botanik-green mb-8">Phase 0 : Préparation des Émonctoires</h3>
                    <div className="space-y-6">
                       <div className="flex gap-6 p-6 bg-[#F9F9F7] rounded-3xl border border-botanik-green/5">
                          <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm shrink-0">
                            <Wind className="w-6 h-6 text-botanik-orange" />
                          </div>
                          <div>
                            <h4 className="font-bold text-botanik-green mb-2">Ouverture & Drainage (Prêle, Orthosiphon)</h4>
                            <p className="text-sm text-botanik-green/60">Étape cruciale pour éliminer les acides et préparer la filtration lymphatique. Prépare les reins et la lymphe.</p>
                          </div>
                       </div>
                       <div className="flex gap-6 p-6 bg-[#F9F9F7] rounded-3xl border border-botanik-green/5">
                          <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm shrink-0">
                            <Shield className="w-6 h-6 text-botanik-orange" />
                          </div>
                          <div>
                            <h4 className="font-bold text-botanik-green mb-2">Dépuration & Douceur (Bardane, Mauve)</h4>
                            <p className="text-sm text-botanik-green/60">Soutient le foie et l'intestin tout en apaisant les muqueuses. Indispensable avant le drainage profond.</p>
                          </div>
                       </div>
                    </div>
                  </div>
                  <div className="rounded-[40px] overflow-hidden shadow-2xl h-[400px]">
                    <img 
                      src={emonctoiresImg} 
                      className="w-full h-full object-cover" 
                      alt="Phase 0 Plants" 
                    />
                  </div>
               </div>
            </div>

            <div className="bg-white rounded-[60px] p-10 md:p-20 border border-botanik-green/5 shadow-2xl mt-16 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-botanik-orange/5 rounded-bl-full -z-10" />
               <div className="grid lg:grid-cols-2 gap-16 items-center">
                  <div>
                    <h3 className="text-2xl md:text-4xl font-bold text-botanik-green mb-8">Phase 1 : Relance Hépatique</h3>
                    <div className="space-y-6">
                       <div className="flex gap-6 p-6 bg-[#F9F9F7] rounded-3xl border border-botanik-green/5">
                          <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm shrink-0">
                            <FlaskConical className="w-6 h-6 text-botanik-orange" />
                          </div>
                          <div>
                            <h4 className="font-bold text-botanik-green mb-2">Mobilisation Totale (Gentiane, Radis Noir)</h4>
                            <p className="text-sm text-botanik-green/60">Gentiane, Salsepareille, Pissenlit racine et Radis noir pour mobiliser les toxines et relancer la filtration profonde.</p>
                          </div>
                       </div>
                       <div className="flex gap-6 p-6 bg-[#F9F9F7] rounded-3xl border border-botanik-green/5">
                          <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm shrink-0">
                            <Waves className="w-6 h-6 text-botanik-orange" />
                          </div>
                          <div>
                            <h4 className="font-bold text-botanik-green mb-2">Soutien Bilio-Digestif (Artichaut, Chrysanthellum)</h4>
                            <p className="text-sm text-botanik-green/60">Artichaut, Orange amère, Gingembre et Poivre Noir pour protéger les hépatocytes et fluidifier la bile.</p>
                          </div>
                       </div>
                    </div>
                  </div>
                  <div className="rounded-[40px] overflow-hidden shadow-2xl h-[400px]">
                    <img 
                      src={hepaticImg} 
                      className="w-full h-full object-cover" 
                      alt="Reset" 
                    />
                  </div>
               </div>
            </div>

            {/* Pause Block */}
            <div className="bg-botanik-green rounded-[60px] p-10 md:p-20 text-white mt-16 relative overflow-hidden shadow-2xl">
               <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-bl-full -z-10" />
               <div className="max-w-3xl mx-auto text-center">
                  <Clock className="w-16 h-16 text-botanik-orange mx-auto mb-8" />
                  <h3 className="text-2xl md:text-4xl font-bold mb-6">La Pause Intégrative</h3>
                  <p className="text-lg md:text-xl text-white/70 leading-relaxed mb-8">
                    Entre chaque phase de 21 jours, nous observons 7 jours de repos total. Ce n'est pas un arrêt, mais une étape d'intégration cruciale où votre corps stabilise les acquis et laisse sa propre pharmacie intérieure prendre le relais.
                  </p>
                  <div className="inline-flex items-center gap-2 bg-white/10 px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.3em] border border-white/10">
                    Secret du Reset Homéostasique
                  </div>
               </div>
            </div>

            <div className="bg-white rounded-[60px] p-10 md:p-20 border border-botanik-green/5 shadow-2xl mt-16 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-botanik-orange/5 rounded-bl-full -z-10" />
               <div className="grid lg:grid-cols-2 gap-16 items-center">
                  <div>
                    <h3 className="text-2xl md:text-4xl font-bold text-botanik-green mb-8">Phase 2 : Pureté Sanguine</h3>
                    <div className="space-y-6">
                       <div className="flex gap-6 p-6 bg-[#F9F9F7] rounded-3xl border border-botanik-green/5">
                          <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm shrink-0">
                            <Shield className="w-6 h-6 text-botanik-orange" />
                          </div>
                          <div>
                            <h4 className="font-bold text-botanik-green mb-2">Purification du Sang (Manjishtha, Ortie)</h4>
                            <p className="text-sm text-botanik-green/60">Nettoyage de fond du terrain sanguin et diminution de l'inflammation circulante via des plantes ancestrales.</p>
                          </div>
                       </div>
                       <div className="flex gap-6 p-6 bg-[#F9F9F7] rounded-3xl border border-botanik-green/5">
                          <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm shrink-0">
                            <Activity className="w-6 h-6 text-botanik-orange" />
                          </div>
                          <div>
                            <h4 className="font-bold text-botanik-green mb-2">Anti-Inflammatoire Global (Cassis, Curcuma)</h4>
                            <p className="text-sm text-botanik-green/60">Soutien de la réactivité immunitaire et protection des tissus contre l'inflammation de bas grade.</p>
                          </div>
                       </div>
                    </div>
                  </div>
                  <div className="rounded-[40px] overflow-hidden shadow-2xl h-[400px]">
                    <img 
                      src={bloodPurityImg} 
                      className="w-full h-full object-cover" 
                      alt="Pureté" 
                    />
                  </div>
               </div>
            </div>

            <div className="bg-white rounded-[60px] p-10 md:p-20 border border-botanik-green/5 shadow-2xl mt-16 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-botanik-orange/5 rounded-bl-full -z-10" />
               <div className="grid lg:grid-cols-2 gap-16 items-center">
                  <div>
                    <h3 className="text-2xl md:text-4xl font-bold text-botanik-green mb-8">Phase 3 : Stabilisation & Renforcement</h3>
                    <div className="space-y-6">
                       <div className="flex gap-6 p-6 bg-[#F9F9F7] rounded-3xl border border-botanik-green/5">
                          <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm shrink-0">
                            <Sparkles className="w-6 h-6 text-botanik-orange" />
                          </div>
                          <div>
                            <h4 className="font-bold text-botanik-green mb-2">Régénération Tissulaire (Centella, Prêle)</h4>
                            <p className="text-sm text-botanik-green/60">Consolidation de la barrière intestinale et cutanée pour un ancrage durable des résultats.</p>
                          </div>
                       </div>
                       <div className="flex gap-6 p-6 bg-[#F9F9F7] rounded-3xl border border-botanik-green/5">
                          <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm shrink-0">
                            <Zap className="w-6 h-6 text-botanik-orange" />
                          </div>
                          <div>
                            <h4 className="font-bold text-botanik-green mb-2">Bouclier Immunitaire (Astragale, Romarin)</h4>
                            <p className="text-sm text-botanik-green/60">Renforcement du terrain de fond et protection cellulaire contre les stress futurs.</p>
                          </div>
                       </div>
                    </div>
                  </div>
                  <div className="rounded-[40px] overflow-hidden shadow-2xl h-[400px]">
                    <img 
                      src={natureHero} 
                      className="w-full h-full object-cover" 
                      alt="Stabilisation" 
                    />
                  </div>
               </div>
            </div>
          </div>
        )}

        {activeTab === 'supplements' && (
          <div className="animate-in slide-in-from-bottom duration-700">
            <div className="text-center mb-16">
              <h2 className="text-2xl md:text-5xl font-bold text-botanik-green mb-6">Compléments Alimentaires</h2>
              <p className="text-base md:text-lg text-botanik-green/60 max-w-2xl mx-auto">
                Le socle indispensable pour que le Totum puisse s'exprimer pleinement dans vos cellules.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {supplements.map((item, idx) => (
                <div key={idx} className="bg-white p-8 rounded-[40px] border border-botanik-green/5 shadow-lg flex gap-6 items-center">
                  <div className="w-14 h-14 bg-botanik-orange/10 rounded-2xl flex items-center justify-center shrink-0">
                    <Beaker className="w-7 h-7 text-botanik-orange" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h4 className="font-bold text-botanik-green">{item.name}</h4>
                      <span className="text-[10px] bg-botanik-green/5 text-botanik-green px-2 py-0.5 rounded-full font-black uppercase tracking-widest">{item.dose}</span>
                    </div>
                    <p className="text-sm text-botanik-green/60">{item.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'chronobiology' && (
          <div className="animate-in slide-in-from-bottom duration-700">
            <div className="text-center mb-16">
              <h2 className="text-2xl md:text-5xl font-bold text-botanik-green mb-6">Chronobiologie du Reset</h2>
              <p className="text-base md:text-lg text-botanik-green/60 max-w-2xl mx-auto">
                Respecter les rythmes circadiens pour une efficacité décuplée de votre pharmacie intérieure. Cliquez sur une phase pour découvrir son protocole.
              </p>
            </div>

            <div className="max-w-5xl mx-auto space-y-6">
               {chronoSteps.map((step, idx) => (
                 <div key={idx} className="space-y-4">
                   <button 
                    onClick={() => setSelectedChrono(selectedChrono === step.id ? null : step.id)}
                    className={`w-full bg-white p-8 rounded-[40px] border shadow-lg flex flex-col md:flex-row items-center gap-8 group transition-all text-left ${selectedChrono === step.id ? 'border-botanik-orange ring-2 ring-botanik-orange/10' : 'border-botanik-green/5 hover:border-botanik-orange'}`}
                   >
                      <div className="flex flex-col items-center gap-2 min-w-[120px]">
                        <span className="text-sm font-black text-botanik-green/40 tracking-widest">{step.data.time_window}</span>
                        <div className={`p-4 rounded-2xl bg-gray-50 ${step.color} group-hover:scale-110 transition-transform`}>
                           <step.icon className="w-8 h-8" />
                        </div>
                      </div>
                      <div className="flex-1">
                         <h4 className="text-2xl font-bold text-botanik-green mb-2">{step.data.title}</h4>
                         <p className="text-botanik-green/60 leading-relaxed">{step.data.short_text}</p>
                      </div>
                      <div className="hidden md:block">
                         <motion.div
                          animate={{ rotate: selectedChrono === step.id ? 90 : 0 }}
                          transition={{ duration: 0.3 }}
                         >
                          <ArrowRight className={`w-8 h-8 transition-colors ${selectedChrono === step.id ? 'text-botanik-orange' : 'text-botanik-green/10 group-hover:text-botanik-orange'}`} />
                         </motion.div>
                      </div>
                   </button>
                   
                   {selectedChrono === step.id && (
                     <motion.div 
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white p-10 rounded-[40px] border border-botanik-orange/20 mx-4 md:mx-10 shadow-xl"
                     >
                       <div className="mb-12">
                         <p className="text-botanik-green font-medium leading-relaxed italic mb-8">
                           {step.data.long_text}
                         </p>
                         
                         <div className="grid md:grid-cols-2 gap-12">
                           <div>
                             <h5 className="text-sm font-black text-botanik-orange uppercase tracking-widest mb-6">Objectifs</h5>
                             <ul className="space-y-4">
                               {step.data.objectives.map((obj, i) => (
                                 <li key={i} className="flex gap-3 text-botanik-green/70 text-sm leading-relaxed">
                                   <span className="w-1.5 h-1.5 rounded-full bg-botanik-orange shrink-0 mt-2" />
                                   {obj}
                                 </li>
                               ))}
                             </ul>
                           </div>
                           
                           <div>
                             <h5 className="text-sm font-black text-botanik-orange uppercase tracking-widest mb-6">Plantes Clés</h5>
                             <div className="space-y-4">
                               {step.data.core_plants.map((plant, i) => (
                                 <div key={i} className="p-4 bg-botanik-green/5 rounded-2xl border border-botanik-green/10">
                                   <div className="font-bold text-botanik-green mb-1">{plant.nom}</div>
                                   <p className="text-xs text-botanik-green/60 leading-relaxed">{plant.role}</p>
                                 </div>
                               ))}

                               {step.data.core_supplements && step.data.core_supplements.length > 0 && (
                                 <div className="mt-8">
                                   <h6 className="text-[10px] font-black text-botanik-orange uppercase tracking-widest mb-4">Compléments de terrain</h6>
                                   <div className="space-y-3">
                                     {step.data.core_supplements.map((supp, i) => (
                                       <div key={i} className="p-4 bg-botanik-orange/5 rounded-2xl border border-botanik-orange/10">
                                         <div className="font-bold text-botanik-orange mb-1">{supp.nom}</div>
                                         <p className="text-xs text-botanik-orange/60 leading-relaxed">{supp.role}</p>
                                         {supp.avertissement && (
                                           <p className="mt-2 text-[10px] text-red-500 font-medium italic">⚠️ {supp.avertissement}</p>
                                         )}
                                       </div>
                                     ))}
                                   </div>
                                 </div>
                               )}
                               
                               {step.data.optional_plants.length > 0 && (
                                 <div className="mt-8">
                                   <h6 className="text-[10px] font-black text-botanik-magenta uppercase tracking-widest mb-4">Plantes Optionnelles (selon bilan ALMA)</h6>
                                   <div className="space-y-3">
                                     {step.data.optional_plants.map((plant, i) => (
                                       <div key={i} className="p-3 bg-botanik-magenta/5 rounded-2xl border border-botanik-magenta/10">
                                         <div className="font-bold text-botanik-magenta text-sm mb-1">{plant.nom}</div>
                                         <p className="text-[10px] text-botanik-magenta/60 leading-relaxed italic">{plant.role}</p>
                                       </div>
                                     ))}
                                   </div>
                                 </div>
                               )}

                               {step.data.optional_supplements && step.data.optional_supplements.length > 0 && (
                                 <div className="mt-8">
                                   <h6 className="text-[10px] font-black text-botanik-magenta uppercase tracking-widest mb-4">Compléments Optionnels</h6>
                                   <div className="space-y-3">
                                     {step.data.optional_supplements.map((supp, i) => (
                                       <div key={i} className="p-3 bg-botanik-magenta/5 rounded-2xl border border-botanik-magenta/10">
                                         <div className="font-bold text-botanik-magenta text-sm mb-1">{supp.nom}</div>
                                         <p className="text-[10px] text-botanik-magenta/60 leading-relaxed italic">{supp.role}</p>
                                       </div>
                                     ))}
                                   </div>
                                 </div>
                               )}
                             </div>
                           </div>
                         </div>
                       </div>
                       
                       <div className="p-6 bg-botanik-green text-white rounded-3xl text-center">
                         <p className="text-sm font-medium italic">"{step.data.system_message}"</p>
                       </div>
                     </motion.div>
                   )}
                 </div>
               ))}
            </div>
          </div>
        )}
      </div>

      {/* CTA Final */}
      <section className="mt-32 container mx-auto px-6">
        <div className="bg-botanik-green rounded-[60px] p-12 md:p-24 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.1)_0%,transparent_70%)]" />
          <h2 className="text-3xl md:text-6xl font-bold mb-8 relative z-10">{t.title} {t.title_accent}</h2>
          <p className="text-lg md:text-xl text-white/60 mb-12 max-w-2xl mx-auto relative z-10">
            {t.description}
          </p>
          <div className="flex flex-wrap justify-center gap-6 relative z-10">
            <button 
              onClick={() => onNavigate('chat')}
              className="px-12 py-6 bg-botanik-orange text-white rounded-2xl font-bold shadow-2xl shadow-botanik-orange/20 hover:scale-105 transition-all flex items-center gap-3"
            >
              {t.cta_primary} <ArrowRight className="w-5 h-5" />
            </button>
            <button 
              onClick={() => onNavigate('boutique')}
              className="px-12 py-6 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-2xl font-bold hover:bg-white/20 transition-all"
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
