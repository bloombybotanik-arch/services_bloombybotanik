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
  X,
  Compass,
  Layers,
  Leaf,
  Radio,
  Sliders,
  Repeat,
  Check,
  AlertTriangle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { getResetPhasesData, ResetPhaseDetail } from './data/resetPhases';
import { Language } from './translations';
import { GlossaryProvider } from './context/GlossaryContext';
import AcademyNavigation from './components/AcademyNavigation';
import FreemiumPaywallGate from './components/FreemiumPaywallGate';
import phycocyanineImg from './assets/images/phycocyanine_spiruline_extract_1795020366000.jpg';

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
  lang?: Language;
}> = ({ phase, onClose, lang = 'fr' }) => {
  const tr = (fr: string, en: string, de: string) => (lang === 'de' ? de : lang === 'fr' ? fr : en);
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
          aria-label={tr('Fermer', 'Close', 'Schließen')}
        >
          <X className="w-5 h-5 stroke-[2]" />
        </button>

        <div className="p-8 md:p-12">
          <div className="mb-8">
            <div className="text-[10px] font-mono font-bold !text-white tracking-[0.25em] mb-2 uppercase">
              {phase.subtitle}
            </div>
            <h2 className="text-2xl md:text-3xl font-black !text-white mb-4 leading-tight">
              {phase.title} : {phase.name}
            </h2>
            <div className="p-5 bg-[#3E4A3D] rounded-2xl border border-[#E7DFD3]/20">
              <p className="!text-white text-sm md:text-base font-normal leading-relaxed italic">
                {phase.long_text}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-base font-bold !text-white mb-4 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#C8AB8A]" />
                <span className="text-white">{tr('Objectifs de la Phase', 'Phase Objectives', 'Phasenziele')}</span>
              </h3>
              <ul className="space-y-3">
                {phase.objectives?.map((obj, idx) => (
                  <li key={idx} className="flex gap-2.5 text-xs sm:text-sm !text-white leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C8AB8A] shrink-0 mt-2" />
                    <span className="text-white">{obj}</span>
                  </li>
                ))}
              </ul>

              <h3 className="text-base font-bold !text-white mt-8 mb-4 flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#C8AB8A]" />
                <span className="text-white">{tr('Systèmes Biologiques Clés', 'Key Biological Systems', 'Wichtige Biologische Systeme')}</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {phase.focus_systems?.map((sys, idx) => (
                  <span key={idx} className="px-3 py-1.5 bg-[#3E4A3D] !text-white border border-white/25 rounded-xl text-[11px] font-mono font-bold uppercase">
                    {sys}
                  </span>
                ))}
              </div>
            </div>

            <div>
              {phase.core_plants && (
                <>
                  <h3 className="text-base font-bold !text-white mb-4 flex items-center gap-2">
                    <FlaskConical className="w-4 h-4 text-[#C8AB8A]" />
                    <span className="text-white">{tr('Plantes Clés du Totum', 'Key Totum Plants', 'Wichtige Totum-Pflanzen')}</span>
                  </h3>
                  <div className="space-y-3 mb-6">
                    {phase.core_plants?.map((plant, idx) => (
                      <div key={idx} className="p-3.5 bg-[#3E4A3D] rounded-xl border border-white/10">
                        <div className="flex justify-between items-start mb-1">
                          <span className="font-bold !text-white text-xs sm:text-sm">{plant.nom}</span>
                          <span className="text-[9px] bg-white/15 !text-white px-2 py-0.5 rounded-full uppercase tracking-wider font-mono">
                            {plant.partie}
                          </span>
                        </div>
                        <p className="text-xs !text-white leading-relaxed italic">{plant.role}</p>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {phase.actions && (
                <div>
                  <h3 className="text-base font-bold !text-white mb-3 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-[#C8AB8A]" />
                    <span className="text-white">{tr('Leviers d’Action', 'Action Levers', 'Aktionshebel')}</span>
                  </h3>
                  <ul className="space-y-2 text-xs !text-white">
                    {phase.actions?.map((act, i) => (
                      <li key={i} className="flex gap-2 !text-white">
                        <span className="text-white">•</span>
                        <span className="text-white">{act}</span>
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
  const tr = (fr: string, en: string, de: string) => (lang === 'de' ? de : lang === 'fr' ? fr : en);
  const localizedPhases = getResetPhasesData(lang);
  const [activeTab, setActiveTab] = useState<'protocol' | 'supplements' | 'chronobiology'>('protocol');
  const [selectedPhase, setSelectedPhase] = useState<ResetPhaseDetail | null>(null);

  // Phases renommées avec action biologique précise
  const tuningPhases = [
    {
      id: tr('Phase 0', 'Phase 0', 'Phase 0'),
      key: "phase_0",
      title: tr('Déverrouiller les Émonctoires', 'Unlock Elimination Pathways', 'Ausscheidungswege öffnen'),
      duration: tr('7 Jours', '7 Days', '7 Tage'),
      role: tr(
        "Ouverture des 5 voies d'évacuation (reins, peau, intestins, poumons, lymphe). Sans portes ouvertes, aucune détoxification hépatique n'est tolérée.",
        'Opening the 5 elimination routes (kidneys, skin, gut, lungs, lymph). Without open pathways, deeper metabolic support is poorly tolerated.',
        'Öffnung der 5 Ausscheidungswege (Nieren, Haut, Darm, Lunge, Lymphe). Ohne offene Wege wird jede weiterführende Aktivierung schlecht vertragen.'
      ),
      icon: Wind,
      plants: tr('Pissenlit racine, Prêle, Orthosiphon, Bardane', 'Dandelion root, Horsetail, Orthosiphon, Burdock', 'Löwenzahnwurzel, Schachtelhalm, Orthosiphon, Klette'),
      targetSystem: tr('Filtres Rénal & Cutané', 'Renal & Skin Filters', 'Nieren- & Hautfilter')
    },
    {
      id: tr('Phase 1', 'Phase 1', 'Phase 1'),
      key: "phase_1",
      title: tr('Réveiller le Filtre Hépatique', 'Awaken the Hepatic Filter', 'Den Leberfilter reaktivieren'),
      duration: tr('21 Jours', '21 Days', '21 Tage'),
      role: tr(
        'Activation douce de la Phase I & Phase II hépatiques et relance de la motricité biliaire sans choc thermique.',
        'Gentle support of hepatic Phase I & Phase II pathways and natural bile flow without overwhelming the system.',
        'Sanfte Unterstützung der hepatischen Phase I & II sowie des Gallenflusses ohne Überlastung.'
      ),
      icon: Zap,
      plants: tr('Gentiane, Radis noir, Artichaut, Chrysanthellum', 'Gentian, Black Radish, Artichoke, Chrysanthellum', 'Enzian, Schwarzer Rettich, Artischocke, Chrysanthellum'),
      targetSystem: tr('Foie, Vésicule & Phase II', 'Liver, Gallbladder & Phase II', 'Leber, Galle & Phase II')
    },
    {
      id: tr('Phase 2', 'Phase 2', 'Phase 2'),
      key: "pause_1",
      title: tr('Drainage Profond du Totum', 'Deep Totum Drainage', 'Tiefe Totum-Drainage'),
      duration: tr('14 Jours', '14 Days', '14 Tage'),
      role: tr(
        'Purification des liquides interstitiels et drainage lymphatique profond assisté par les saponines et les polyphénols.',
        'Interstitial fluid renewal and deep lymphatic circulation assisted by plant saponins and polyphenols.',
        'Erneuerung der Zellzwischenflüssigkeit und tiefe Lymphdrainage durch pflanzliche Saponine und Polyphenole.'
      ),
      icon: Activity,
      plants: tr('Sève Fondamentale, Sureau, Salsepareille', 'Vital Sap, Elderberry, Sarsaparilla', 'Ur-Saft, Holunder, Sarsaparille'),
      targetSystem: tr('Lymphe & Milieu Interstitiel', 'Lymph & Interstitial Fluid', 'Lymphe & Interstitium')
    },
    {
      id: tr('Phase 3', 'Phase 3', 'Phase 3'),
      key: "phase_2",
      title: tr("Régénération de l'Axe HPA", 'HPA Axis Regeneration', 'Regeneration der HPA-Achse'),
      duration: tr('28 Jours', '28 Days', '28 Tage'),
      role: tr(
        'Apaisement de la boucle hypophyse-surrénales, stabilisation du cortisol circadien et recharge mitochondriale.',
        'Calming the pituitary-adrenal feedback loop, supporting circadian cortisol rhythm and mitochondrial energy.',
        'Beruhigung der Hypophysen-Nebennieren-Schleife, Stabilisierung des zirkadianen Cortisols und Zellenergie-Unterstützung.'
      ),
      icon: Shield,
      plants: tr('Ashwagandha, Rhodiola, Schisandra', 'Ashwagandha, Rhodiola, Schisandra', 'Ashwagandha, Rosenwurz, Schisandra'),
      targetSystem: tr('Axe Neuro-Surrénalien & Sommeil', 'Neuro-Adrenal Axis & Sleep', 'Neuro-Nebennieren-Achse & Schlaf')
    },
    {
      id: tr('Phase 4', 'Phase 4', 'Phase 4'),
      key: "phase_3",
      title: tr('Consolidation & Téguments', 'Consolidation & Barriers', 'Festigung & Barrieren'),
      duration: tr('14 Jours', '14 Days', '14 Tage'),
      role: tr(
        'Fixation des minéraux et renforcement de la matrice collagénique du fascia et des barrières digestives.',
        'Mineral replenishment and reinforcement of fascia collagen matrix and digestive barrier integrity.',
        'Mineralstoff-Einbau sowie Stärkung der Kollagenmatrix von Faszien und Darmbarriere.'
      ),
      icon: Layers,
      plants: tr('Prêle, Ortie racine, Silicium végétal', 'Horsetail, Nettle root, Plant Silica', 'Schachtelhalm, Brennnesselwurzel, Pflanzliches Silizium'),
      targetSystem: tr('Fascia, Barrière Intestinale & Os', 'Fascia, Gut Barrier & Bone', 'Faszien, Darmbarriere & Knochen')
    },
    {
      id: 'Phase ∞',
      key: "phase_pause",
      title: tr('Pauses Intégratives & Homéostasie', 'Integrative Pauses & Homeostasis', 'Integrative Pausen & Homöostase'),
      duration: tr('Rythme libre', 'Flexible pace', 'Freier Rhythmus'),
      role: tr(
        "Périodes régulières de repos phytochimique pour laisser le corps consolider son nouvel équilibre d'auto-régulation autonome.",
        'Regular botanical rest windows allowing the body to consolidate its natural autonomous self-regulation balance.',
        'Regelmäßige botanische Ruhepausen, damit der Körper sein natürliches Gleichgewicht der Selbstregulation festigen kann.'
      ),
      icon: Repeat,
      plants: tr('Infusions douces, eau peu minéralisée, repos', 'Gentle infusions, low-mineral water, rest', 'Sanfte Aufgüsse, mineralarmes Wasser, Ruhe'),
      targetSystem: tr('Homéostasie Autonome Retrouvée', 'Restored Autonomous Homeostasis', 'Wiedergewonnene Selbstregulation')
    }
  ];

  const supplements = [
    {
      name: tr('Oméga-3 EPA/DHA', 'Omega-3 EPA/DHA', 'Omega-3 EPA/DHA'),
      dose: tr('2g / jour', '2g / day', '2g / Tag'),
      role: tr("Soutien des membranes cellulaires et régulation de l'inflammation lipidique.", 'Cell membrane fluidity support and balanced lipid signaling.', 'Unterstützung der Zellmembranen und ausgeglichener Lipid-Signalwege.'),
      target: tr('Membranes & SRA', 'Membranes & Resolution', 'Membranen & Resolving')
    },
    {
      name: tr('Magnésium Bisglycinate', 'Magnesium Bisglycinate', 'Magnesiumbisglycinat'),
      dose: tr('300mg / soir', '300mg / evening', '300mg / Abend'),
      role: tr('Relâchement neuro-musculaire et activation de plus de 300 enzymes vitales.', 'Neuromuscular relaxation and cofactor for over 300 enzymatic reactions.', 'Neuromuskuläre Entspannung und Aktivierung von über 300 Enzymen.'),
      target: tr('Axe HPA & Sommeil', 'HPA Axis & Sleep', 'HPA-Achse & Schlaf')
    },
    {
      name: 'L-Glutamine',
      dose: tr('5g / matin', '5g / morning', '5g / Morgen'),
      role: tr('Carburant préférentiel des entérocytes et consolidation de la barrière intestinale.', 'Primary fuel for enterocytes and intestinal mucosal barrier comfort.', 'Bevorzugter Brennstoff für Enterozyten und Erhalt der Darmschleimhaut.'),
      target: tr('T1 Microbiome & A2', 'T1 Microbiome & A2', 'T1 Mikrobiom & A2')
    },
    {
      name: tr('Vitamine D3 + K2 (MK7)', 'Vitamin D3 + K2 (MK7)', 'Vitamin D3 + K2 (MK7)'),
      dose: tr('2000 UI / 100µg', '2000 IU / 100µg', '2000 IE / 100µg'),
      role: tr('Modulation immunitaire, expression génique et fixation minérale osseuse.', 'Immune balance support, cellular signaling and bone mineral utilization.', 'Unterstützung der Immunbalance, Genexpression und Knochenmineralisierung.'),
      target: tr('Immunité & Fascia', 'Immunity & Fascia', 'Immunität & Faszien')
    },
    {
      name: tr('Sélénium Méthionine', 'Selenomethionine', 'Selenomethionin'),
      dose: tr('200µg / jour', '200µg / day', '200µg / Tag'),
      role: tr('Cofacteur de la désiodase thyroïdienne et protection antioxydante (glutathion).', 'Thyroid deiodinase cofactor and glutathione antioxidant defense support.', 'Kofaktor der Schilddrüsen-Deiodase und Glutathion-Antioxidansschutz.'),
      target: tr('Métabolisme T5', 'T5 Metabolism', 'Stoffwechsel T5')
    },
    {
      name: tr('Glycine Pure', 'Pure Glycine', 'Reines Glycin'),
      dose: tr('3g / soir', '3g / evening', '3g / Abend'),
      role: tr('Acide aminé fondamental de la matrice collagénique du fascia et du sommeil lent.', 'Core amino acid for fascia collagen structure and deep sleep quality.', 'Grundbaustein der Faszien-Kollagenmatrix und für ruhigen Tiefschlaf.'),
      target: tr('Fascia & Sommeil', 'Fascia & Sleep', 'Faszien & Schlaf')
    }
  ];

  const chronoPhases = [
    {
      id: 'matin',
      title: tr('07h00 - 09h00 • Réveil & Émonctoires', '07:00 - 09:00 • Awakening & Elimination', '07:00 - 09:00 • Erwachen & Ausscheidung'),
      icon: Sun,
      color: '#C8AB8A',
      desc: tr('Ouverture hépato-rénale, hydratation à température corporelle et stimulation du péristaltisme.', 'Hepato-renal morning support, body-temperature hydration and gentle digestive rhythm.', 'Leber-Nieren-Aktivierung am Morgen, körperwarme Flüssigkeitszufuhr und sanfte Darmbewegung.')
    },
    {
      id: 'midi',
      title: tr('12h00 - 14h00 • Puissance Métabolique', '12:00 - 14:00 • Metabolic Peak', '12:00 - 14:00 • Metabolisches Hoch'),
      icon: Zap,
      color: '#C8AB8A',
      desc: tr('Assimilation enzymatique maximale, stabilisation glycémique post-prandiale et soutien pancréatique.', 'Peak enzymatic assimilation, balanced post-meal blood sugar and digestive comfort.', 'Maximale enzymatische Aufnahme, ausgeglichener Blutzucker nach dem Essen und Verdauungskraft.')
    },
    {
      id: 'soir',
      title: tr('18h00 - 20h00 • Décharge Allostatique', '18:00 - 20:00 • Allostatic Unwinding', '18:00 - 20:00 • Allostatische Entlastung'),
      icon: Moon,
      color: '#8A8177',
      desc: tr('Baisse du cortisol, induction vagale et allègement de la charge digestive avant le repos.', 'Evening cortisol tapering, vagal calm and light digestive load prior to rest.', 'Abendliche Cortisol-Senkung, Aktivierung des Vagusnervs und leichte Verdauung vor dem Schlaf.')
    },
    {
      id: 'nuit',
      title: tr('22h00 - 04h00 • Régénération & Autophagie', '22:00 - 04:00 • Overnight Renewal', '22:00 - 04:00 • Nächtliche Regeneration'),
      icon: Sparkles,
      color: '#C8AB8A',
      desc: tr('Nettoyage glymphatique cérébral, réparation tissulaire et recyclage cellulaire profond.', 'Cerebral glymphatic clearance, nocturnal tissue renewal and cellular housekeeping.', 'Nächtliche glymphatische Gehirnreinigung, Gewebeerneuerung und zelluläre Regeneration.')
    }
  ];

  const [openResetFaq, setOpenResetFaq] = useState<number | null>(0);
  const resetFaqs = [
    {
      q: tr(
        "Qu'est-ce que le Reset Homéostasique selon Bloom by BotaniK ?",
        'What is the Homeostatic Reset according to Bloom by BotaniK?',
        'Was ist der Homöostatische Reset nach Bloom by BotaniK?'
      ),
      a: tr(
        "C'est une démarche éducative d'hygiène du terrain en 6 phases visant à soutenir les capacités naturelles d'autorégulation de l'organisme (homéostasie), en accompagnant d'abord les émonctoires et les cycles de récupération avant toute relance.",
        "It is an educational 6-phase terrain-hygiene framework designed to support the body's natural self-regulation capacities (homeostasis), supporting elimination pathways and recovery rhythms before deeper mobilization.",
        'Es ist ein edukatives 6-Phasen-Konzept der Terrainpflege, das die natürlichen Selbstregulationskräfte des Körpers (Homöostase) unterstützt, indem zunächst Ausscheidungswege und Erholungszyklen begleitet werden.'
      )
    },
    {
      q: tr(
        'Pourquoi libérer les 5 émonctoires dès la première phase ?',
        'Why support all 5 elimination pathways in Phase 0?',
        'Warum werden in Phase 0 alle 5 Ausscheidungswege zuerst unterstützt?'
      ),
      a: tr(
        "Le foie, les reins, l'intestin, les poumons et la peau assurent l'évacuation métabolique quotidienne. Accompagner en douceur ces voies d'élimination évite d'encombrer un terrain déjà saturé par la charge allostatique.",
        'The liver, kidneys, gut, lungs, and skin handle daily metabolic clearance. Gently supporting these pathways first prevents bottlenecking a system already carrying high allostatic load.',
        'Leber, Nieren, Darm, Lunge und Haut übernehmen die tägliche Stoffwechsel-Ausscheidung. Ihre sanfte Unterstützung verhindert eine Überlastung eines bereits stark beanspruchten Terrains.'
      )
    },
    {
      q: tr(
        "Pourquoi privilégier le Totum végétal plutôt qu'une molécule isolée ?",
        'Why favor the botanical Totum over an isolated molecule?',
        'Warum wird das pflanzliche Totum gegenüber einem isolierten Wirkstoff bevorzugt?'
      ),
      a: tr(
        "Les plantes contiennent un spectre complexe de principes actifs, polyphénols et cofacteurs agissant en synergie. Cette matrice naturelle dialogue avec plusieurs boucles physiologiques tout en conservant un meilleur profil de tolérance.",
        'Whole plants contain a rich spectrum of bioactives, polyphenols, and cofactors working in synergy. This natural matrix interacts smoothly across physiological loops with superior overall balance.',
        'Ganze Pflanzen enthalten ein komplexes Spektrum an Wirkstoffen, Polyphenolen und Kofaktoren im Verbund. Diese natürliche Matrix wirkt synergistisch und gut verträglich.'
      )
    },
    {
      q: tr(
        'Comment préparer les protocoles botaniques avec BloomLab® ?',
        'How are botanical protocols prepared with BloomLab®?',
        'Wie werden die botanischen Protokolle mit der BloomLab® zubereitet?'
      ),
      a: tr(
        "L'extracteur BloomLab® reproduit des températures précises (40°C à 85°C) et une agitation douce en cuve inox 304 pour préserver les composés fragiles (amers, flavonoïdes, phycocyanine). Ce contenu éducatif ne se substitue à aucun traitement ou avis médical.",
        'The BloomLab® extractor delivers accurate temperatures (40°C to 85°C) and gentle agitation in a 304 stainless-steel vessel to protect delicate compounds (bitters, flavonoids, phycocyanin). Educational content only; not a substitute for medical care or advice.',
        'Der BloomLab®-Extraktor hält präzise Temperaturen (40°C bis 85°C) bei sanfter Bewegung im 304-Edelstahlbehälter, um empfindliche Pflanzenstoffe (Bitterstoffe, Flavonoide, Phycocyanin) zu schützen. Rein edukative Inhalte; kein Ersatz für ärztliche Beratung oder Behandlung.'
      )
    }
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
          <div className="px-4 sm:px-6 lg:px-8 py-14 md:py-24 max-w-7xl mx-auto flex flex-col items-center text-center relative z-10">
            
            {/* Badge de positionnement */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-[#C8AB8A] text-xs font-bold uppercase tracking-widest shadow-xs mb-6">
              <Sparkles className="w-4 h-4 text-[#C8AB8A]" />
              <span>{tr('Ingénierie Biologique & Homéostasie', 'Biological Engineering & Homeostasis', 'Biologische Systematik & Homöostase')}</span>
            </div>

            {/* Titre Principal imposé */}
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15] mb-6 max-w-4xl">
              {tr(
                'Le Reset Homéostasique Bloom by BotaniK : Comment les plantes et BloomLab® rééquilibrent vos systèmes.',
                'The Bloom by BotaniK Homeostatic Reset: How Whole Plants & BloomLab® Support Systemic Balance.',
                'Der Homöostatische Reset von Bloom by BotaniK: Wie Heilpflanzen & BloomLab® Ihre Systeme ins Gleichgewicht bringen.'
              )}
            </h1>

            {/* Sous-titre imposé */}
            <p className="text-base sm:text-lg md:text-xl text-[#F9F6F0]/90 max-w-3xl mx-auto font-normal leading-relaxed mb-10">
              {tr(
                "Une démarche d'ingénierie biologique Bloom by BotaniK en 6 phases pour libérer vos ",
                'A 6-phase biological framework by Bloom by BotaniK to support your ',
                'Ein 6-Phasen-Konzept von Bloom by BotaniK zur Begleitung Ihrer '
              )}
              <TermTooltip 
                term={tr('Émonctoires', 'Elimination Pathways', 'Ausscheidungswege')} 
                definition={tr(
                  "Les 5 organes filtres naturels de l'organisme (foie, reins, intestins, poumons, peau) chargés d'évacuer les déchets métaboliques et toxiques.",
                  'The body’s 5 natural filter systems (liver, kidneys, gut, lungs, skin) responsible for daily metabolic clearance.',
                  'Die 5 natürlichen Filterorgane des Körpers (Leber, Nieren, Darm, Lunge, Haut), die Stoffwechselrückstände abführen.'
                )}
              >
                {tr('émonctoires', 'elimination pathways', 'Ausscheidungswege')}
              </TermTooltip>{' '}
              {tr(
                'et réactiver votre pharmacie intérieure.',
                'and reawaken your body’s natural self-regulation.',
                'und zur Aktivierung Ihrer inneren Selbstregulation.'
              )}
            </p>

            {/* Split-Screen Comparatif : Approche Symptomatique vs Approche Systémique Bloom */}
            <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6 text-left my-4">
              
              {/* Colonne 1 : Approche Symptomatique Traditionnelle */}
              <div className="bg-white/5 rounded-2xl border border-white/15 p-6 sm:p-8 flex flex-col justify-between backdrop-blur-xs">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#8A8177] font-bold">
                      {tr('Approche Symptomatique', 'Isolated Approach', 'Isolierter Ansatz')}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-white/70 text-[10px] font-bold">
                      {tr('Réductionniste', 'Reductionist', 'Reduktionistisch')}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                    <Lock className="w-4 h-4 text-[#8A8177] shrink-0" />
                    <span>{tr('1 Molécule → 1 Récepteur Isolé', '1 Molecule → 1 Isolated Target', '1 Molekül → 1 Isoliertes Ziel')}</span>
                  </h3>

                  <p className="text-xs sm:text-sm !text-white/90 leading-relaxed mb-4">
                    {tr(
                      'La pharmacologie classique isole un principe actif pur pour forcer ou inhiber un récepteur cellulaire unique. Le corps réagit de manière unilatérale.',
                      'Single-compound approaches target one isolated pathway at a time rather than supporting the terrain as a connected whole.',
                      'Einzelstoff-Ansätze zielen nur auf einen isolierten Signalweg statt auf das gesamte biologische Terrain.'
                    )}
                  </p>

                  <ul className="space-y-2.5 text-xs text-white mb-6">
                    <li className="flex items-start gap-2 !text-white">
                      <span className="text-[#C8AB8A] font-bold text-sm leading-none">•</span>
                      <span className="text-white font-medium">{tr('Tolérance rapide et accoutumance cellulaire', 'Narrow adaptation without cofactor synergy', 'Begrenzte Anpassung ohne Kofaktor-Synergie')}</span>
                    </li>
                    <li className="flex items-start gap-2 !text-white">
                      <span className="text-[#C8AB8A] font-bold text-sm leading-none">•</span>
                      <span className="text-white font-medium">{tr('Surcharge des émonctoires hépatiques et rénaux', 'Potential strain on liver & kidney filters', 'Mögliche Mehrbelastung von Leber & Nieren')}</span>
                    </li>
                    <li className="flex items-start gap-2 !text-white">
                      <span className="text-[#C8AB8A] font-bold text-sm leading-none">•</span>
                      <span className="text-white font-medium">{tr("Masquage du symptôme sans lever le verrou d'origine", 'Focuses on surface signals rather than terrain balance', 'Betrachtet Oberflächensignale statt des Grundterrains')}</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-3 border-t border-white/10 text-[11px] font-mono text-[#C8AB8A]">
                  {tr('Résultat : Dérive adaptative & épuisement du terrain', 'Result: Adaptive drift & terrain fatigue', 'Folge: Anpassungsstress & Terrain-Erschöpfung')}
                </div>
              </div>

              {/* Colonne 2 : Approche Systémique Bloom */}
              <div className="bg-[#3E4A3D] rounded-2xl border-2 border-[#C8AB8A] p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#C8AB8A]/10 rounded-full blur-2xl pointer-events-none" />
                
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#C8AB8A] font-bold">
                      {tr('Approche Systémique Bloom', 'Bloom Systemic Approach', 'Systemischer Bloom-Ansatz')}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#C8AB8A] text-[#0F261E] text-[10px] font-black uppercase tracking-wider">
                      {tr('Totum Végétal', 'Plant Totum', 'Pflanzen-Totum')}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold !text-white mb-2 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#C8AB8A] shrink-0" />
                    <span className="text-white">{tr("Le Totum Végétal → Réseau d'Organes", 'The Plant Totum → Whole-System Network', 'Das Pflanzen-Totum → Organsystem-Netzwerk')}</span>
                  </h3>

                  <p className="text-xs sm:text-sm !text-white/95 leading-relaxed mb-4">
                    {tr(
                      "Le Totum apporte une matrice vivante de centaines de principes actifs synergiques (amers, flavonoïdes, polyphénols, minéraux) dialoguant simultanément avec l'ensemble des systèmes.",
                      'The botanical Totum delivers a living matrix of hundreds of synergistic compounds (bitters, flavonoids, polyphenols, minerals) conversing across body systems.',
                      'Das Totum liefert eine lebendige Matrix aus hunderten synergetischen Pflanzenstoffen (Bitterstoffe, Flavonoide, Polyphenole, Mineralien), die gleichzeitig mit allen Systemen kommunizieren.'
                    )}
                  </p>

                  <ul className="space-y-2.5 text-xs text-white mb-6">
                    <li className="flex items-start gap-2 !text-white">
                      <Check className="w-3.5 h-3.5 text-[#C8AB8A] shrink-0 mt-0.5" />
                      <span className="text-white font-medium">{tr('Réveil des récepteurs endormis (amers TAS2R)', 'Activation of bitter-sensing TAS2R receptors', 'Aktivierung der Bitterstoff-Rezeptoren (TAS2R)')}</span>
                    </li>
                    <li className="flex items-start gap-2 !text-white">
                      <Check className="w-3.5 h-3.5 text-[#C8AB8A] shrink-0 mt-0.5" />
                      <span className="text-white font-medium">{tr('Ouverture des 5 émonctoires avant toute relance', 'Gentle opening of all 5 elimination routes first', 'Sanfte Öffnung der 5 Ausscheidungswege vorab')}</span>
                    </li>
                    <li className="flex items-start gap-2 !text-white">
                      <Check className="w-3.5 h-3.5 text-[#C8AB8A] shrink-0 mt-0.5" />
                      <span className="text-white font-medium">{tr("Restauration autonome des boucles d'auto-régulation", 'Support for natural self-regulation loops', 'Unterstützung natürlicher Selbstregulationskreisläufe')}</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-3 border-t border-white/15 text-[11px] font-mono text-[#C8AB8A] font-semibold">
                  {tr('Résultat : Homéostasie restaurée & vitalité durable', 'Result: Supported homeostasis & lasting vitality', 'Ergebnis: Gestützte Homöostase & nachhaltige Vitalität')}
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
                <span>{tr("Explorer l'Accordage en 6 Phases", 'Explore the 6-Phase Tuning', 'Die 6-Phasen-Abstimmung entdecken')}</span>
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById('planches-racines');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/15 text-white border border-white/20 text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
              >
                <Leaf className="w-4 h-4 text-[#C8AB8A]" />
                <span>{tr('Voir les 4 Planches Botaniques', 'View the 4 Botanical Plates', 'Zu den 4 Botanischen Tafeln')}</span>
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
              lang={lang}
            />
          )}
        </AnimatePresence>

        {/* ========================================================================= */}
        {/* CORPS PRINCIPAL DE LA PAGE                                                */}
        {/* ========================================================================= */}
        <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">

          {/* ========================================================================= */}
          {/* 1.2. SECTION "L'INTELLIGENCE OUBLIÉE" (ÉDUCATION SUR L'HOMÉOSTASIE)        */}
          {/* ========================================================================= */}
          <section className="space-y-10 py-8 scroll-mt-24">
            <div className="text-center max-w-4xl mx-auto space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-[#3E4A3D] border border-[#E7DFD3] text-[11px] font-bold uppercase tracking-wider shadow-sm">
                <Activity className="w-3.5 h-3.5 text-[#C8AB8A]" />
                <span>{tr('Le Paradigme de la Vitalité', 'The Vitality Paradigm', 'Das Vitalitäts-Paradigma')}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0F261E] tracking-tight">
                {tr(
                  "L'Intelligence Oubliée : Comprendre l'Homéostasie et Votre Pharmacie Intérieure",
                  'Forgotten Intelligence: Understanding Homeostasis & Self-Regulation',
                  'Vergessene Intelligenz: Homöostase & Ihre innere Selbstregulation verstehen'
                )}
              </h2>
              <p className="text-sm sm:text-base text-[#8A8177] leading-relaxed font-medium max-w-3xl mx-auto">
                {tr(
                  "Vous n'avez pas besoin d'apprendre à votre corps à guérir. Vous avez besoin de lui redonner les conditions pour le faire.",
                  'Your body already knows how to regulate itself — it simply needs the right terrain conditions to do so.',
                  'Ihr Körper weiß bereits, wie er sich selbst reguliert — er braucht dafür lediglich die richtigen Rahmenbedingungen.'
                )}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Bloc 1 */}
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E7DFD3] shadow-sm space-y-4">
                <div className="w-10 h-10 rounded-xl bg-[#F9F6F0] text-[#C8AB8A] flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-[#0F261E]">{tr('Le Miracle Silencieux', 'The Quiet Symphony', 'Das stille Wunder')}</h3>
                <p className="text-sm text-[#8A8177] leading-relaxed">
                  {tr(
                    "Chaque seconde, votre corps régule sa température, son pH et des milliers de paramètres. C'est l'",
                    'Every second, your body balances temperature, pH, and thousands of signals. That is ',
                    'In jeder Sekunde reguliert Ihr Körper Temperatur, pH-Wert und tausende Parameter. Das ist '
                  )}
                  <strong>{tr('homéostasie', 'homeostasis', 'Homöostase')}</strong> :{' '}
                  {tr(
                    "votre pharmacie intérieure, capable de réparer les tissus et d'éliminer les toxines, à condition qu'on ne la surcharge pas.",
                    'your built-in self-regulation capacity for cellular upkeep and daily clearance whenever it is not overloaded.',
                    'Ihre innere Regulation für Zellerhalt und tägliche Ausscheidung, solange sie nicht überlastet wird.'
                  )}
                </p>
              </div>

              {/* Bloc 2 */}
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E7DFD3] shadow-sm space-y-4">
                <div className="w-10 h-10 rounded-xl bg-[#F9F6F0] text-[#C8AB8A] flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-[#0F261E]">{tr('Le Verrou de la Vie Moderne', 'Modern Terrain Bottleneck', 'Die Blockade des modernen Alltags')}</h3>
                <p className="text-sm text-[#8A8177] leading-relaxed">
                  {tr(
                    "Face au stress chronique et aux toxines, l'organisme compense en \"surrégime\". C'est la ",
                    'Under chronic stress and environmental strain, the body runs in overdrive — known as ',
                    'Bei chronischem Stress und Umweltbelastung läuft der Organismus auf Hochtouren — die '
                  )}
                  <strong>{tr('charge allostatique', 'allostatic load', 'allostatische Last')}</strong>.{' '}
                  {tr(
                    'Les émonctoires saturent, et le corps verrouille des systèmes (digestion, sommeil, immunité) pour survivre, générant fatigue et inflammation.',
                    'Elimination pathways bottleneck and energy is conserved away from sleep, digestion, and recovery.',
                    'Ausscheidungswege stauen sich, und der Körper drosselt Verdauung, Schlaf und Regeneration, um Kraft zu sparen.'
                  )}
                </p>
              </div>

              {/* Bloc 3 */}
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E7DFD3] shadow-sm space-y-4">
                <div className="w-10 h-10 rounded-xl bg-[#F9F6F0] text-[#C8AB8A] flex items-center justify-center">
                  <FlaskConical className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-[#0F261E]">{tr("L'Approche Bloom", 'The Bloom Approach', 'Der Bloom-Ansatz')}</h3>
                <p className="text-sm text-[#8A8177] leading-relaxed">
                  {tr(
                    'Nous ne forçons pas un récepteur. Nous utilisons la synergie du ',
                    'We never force a single receptor. We draw on the synergy of the ',
                    'Wir erzwingen keinen einzelnen Rezeptor, sondern nutzen die Synergie des '
                  )}
                  <strong>{tr('Totum végétal', 'botanical Totum', 'Pflanzen-Totums')}</strong>{' '}
                  {tr(
                    "(extrait avec précision par la BloomLab) pour rouvrir les portes d'évacuation, relancer les boucles d'auto-régulation et lever le verrou pour que l'équilibre opère.",
                    '(precisely extracted with BloomLab) to gently support elimination routes, physiological feedback loops, and natural balance.',
                    '(präzise extrahiert mit der BloomLab), um Ausscheidungswege und körpereigene Regulationsschleifen sanft zu begleiten.'
                  )}
                </p>
              </div>
            </div>

            <div className="text-center max-w-3xl mx-auto pt-4">
              <p className="text-sm sm:text-base text-[#0F261E] font-medium leading-relaxed bg-[#F9F6F0] p-6 rounded-2xl border border-[#E7DFD3]">
                {tr(
                  "Ce n'est ni un régime, ni une contrainte de plus. C'est un ",
                  'Neither a restrictive diet nor another chore. It is a 6-phase ',
                  'Weder eine Diät noch ein weiterer Zwang. Es ist eine 6-phasige '
                )}
                <strong>{tr('Accordage Biologique', 'Biological Tuning', 'Biologische Abstimmung')}</strong>{' '}
                {tr(
                  "en 6 phases pour passer d'un état de survie (verrouillé) à un état de vitalité (déverrouillé). Découvrez la méthode ci-dessous.",
                  'to transition from an overloaded state to balanced vitality. Explore the educational framework below.',
                  'für den Weg von anhaltender Überlastung zurück in lebendige Balance. Entdecken Sie die Methode unten.'
                )}
              </p>
            </div>
          </section>

          {/* ========================================================================= */}
          {/* 1.5. SECTION "HÉRITAGE SCIENTIFIQUE" (CRÉDIBILITÉ - REMONTÉE ICI)          */}
          {/* ========================================================================= */}
          <section className="space-y-8 scroll-mt-24">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-[#3E4A3D] border border-[#E7DFD3] text-[11px] font-bold uppercase tracking-wider shadow-sm">
                <FlaskConical className="w-3.5 h-3.5 text-[#C8AB8A]" />
                <span>{tr('Physiologie Fondatrice & Crédibilité', 'Foundational Physiology', 'Grundlagen der Physiologie')}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0F261E] tracking-tight">
                {tr(
                  "Du « Milieu Intérieur » à l'Homéostasie : La Sagesse du Vivant",
                  'From "Milieu Intérieur" to Homeostasis: The Wisdom of Living Systems',
                  'Vom „Milieu Intérieur“ zur Homöostase: Die Weisheit des Lebendigen'
                )}
              </h2>
              <p className="text-xs sm:text-sm text-[#8A8177] leading-relaxed font-medium max-w-2xl mx-auto">
                {tr(
                  "Comprendre le corps humain commence par reconnaître qu'il ne dysfonctionne jamais sans raison. La fatigue chronique, les tensions et les désordres métaboliques ne sont pas des pannes arbitraires : ce sont des signaux d'adaptation d'un organisme qui cherche à préserver son équilibre vital.",
                  'Understanding the human body begins with recognizing that persistent fatigue or tension are not random flaws, but adaptive signals from an organism working to preserve vital balance.',
                  'Den Körper zu verstehen bedeutet anzuerkennen, dass anhaltende Müdigkeit oder Spannung keine zufälligen Pannen sind, sondern Anpassungssignale eines Systems, das sein Gleichgewicht schützt.'
                )}
              </p>
            </div>

            {/* 2 Colonnes Claude Bernard & Walter Cannon avec guillemets stylisés */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Claude Bernard */}
              <div className="bg-[#3E4A3D] text-[#F9F6F0] rounded-2xl border border-white/10 p-6 sm:p-8 flex flex-col justify-between shadow-sm relative overflow-hidden group">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#C8AB8A] font-bold">
                      {tr('XIXᵉ Siècle • Médecine Expérimentale', '19th Century • Experimental Physiology', '19. Jh. • Experimentelle Physiologie')}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-[#C8AB8A] text-[10px] font-bold font-mono">
                      1813 – 1878
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white">
                    {tr('Claude Bernard & le « Milieu Intérieur »', 'Claude Bernard & the "Milieu Intérieur"', 'Claude Bernard & das „Milieu Intérieur“')}
                  </h3>

                  {/* Bloc de citation stylisé avec guillemets géants */}
                  <div className="relative bg-[#0F261E]/60 rounded-xl p-5 border border-white/10 my-3">
                    <span className="absolute -top-3 -left-1 text-4xl text-[#C8AB8A]/40 font-serif leading-none select-none">“</span>
                    <p className="italic text-xs sm:text-sm text-[#F9F6F0] leading-relaxed font-serif pl-3">
                      {tr(
                        "« La fixité du milieu intérieur est la condition d'une vie libre et indépendante. »",
                        '"The constancy of the internal environment is the condition for free and independent life."',
                        '„Die Beständigkeit des inneren Milieus ist die Bedingung für ein freies und unabhängiges Leben.“'
                      )}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-[#F9F6F0]/80 leading-relaxed">
                    {tr(
                      'Claude Bernard a découvert que nos cellules baignent dans un océan liquidien intérieur (sang, lymphe, liquide interstitiel). Pour que les organes fonctionnent harmonieusement, ce milieu doit conserver une constance biochimique rigoureuse (pH, température, osmolarité).',
                      'Claude Bernard showed that our cells live within a continuous internal fluid ocean (blood, lymph, interstitial fluid) requiring steady biochemical balance in pH, temperature, and minerals.',
                      'Claude Bernard zeigte, dass unsere Zellen in einem inneren Flüssigkeitsmeer (Blut, Lymphe, Interstitium) leben, das präzise pH-, Temperatur- und Mineralbalance erfordert.'
                    )}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-2 text-xs text-[#C8AB8A] font-medium">
                  <CheckCircle className="w-4 h-4 text-[#C8AB8A] shrink-0" />
                  <span>{tr('Le terrain biologique : la matrice de toute santé durable', 'The biological terrain: foundation of lasting vitality', 'Das biologische Terrain: Grundlage nachhaltiger Vitalität')}</span>
                </div>
              </div>

              {/* Walter Cannon */}
              <div className="bg-[#3E4A3D] text-[#F9F6F0] rounded-2xl border border-white/10 p-6 sm:p-8 flex flex-col justify-between shadow-sm relative overflow-hidden group">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#C8AB8A] font-bold">
                      {tr('Université Harvard • Physiologie', 'Harvard University • Physiology', 'Harvard University • Physiologie')}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-[#C8AB8A] text-[10px] font-bold font-mono">
                      1871 – 1945
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white">
                    {tr("Walter Cannon & l'Homéostasie", 'Walter Cannon & Homeostasis', 'Walter Cannon & die Homöostase')}
                  </h3>

                  {/* Bloc de citation stylisé avec guillemets géants */}
                  <div className="relative bg-[#0F261E]/60 rounded-xl p-5 border border-white/10 my-3">
                    <span className="absolute -top-3 -left-1 text-4xl text-[#C8AB8A]/40 font-serif leading-none select-none">“</span>
                    <p className="italic text-xs sm:text-sm text-[#F9F6F0] leading-relaxed font-serif pl-3">
                      {tr(
                        "« L'homéostasie est la coordination des processus physiologiques maintenant les états stables de l'organisme. »",
                        '"Homeostasis is the coordinated physiological processes which maintain most of the steady states in the organism."',
                        '„Homöostase ist das Zusammenspiel physiologischer Prozesse, das die stabilen Zustände im Organismus aufrechterhält.“'
                      )}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-[#F9F6F0]/80 leading-relaxed">
                    {tr(
                      "Walter Cannon a conceptualisé la capacité d'auto-ajustement permanent du vivant : l'",
                      'Walter Cannon defined this continuous self-regulating wisdom of living organisms as ',
                      'Walter Cannon prägte für diese laufende Selbstanpassung des Lebendigen den Begriff '
                    )}
                    <strong>{tr('homéostasie', 'homeostasis', 'Homöostase')}</strong>.{' '}
                    {tr(
                      "L'organisme possède une pharmacie intérieure autonome capable de rééquilibrer tension, glycémie, immunité et réparation tissulaire grâce à de subtiles boucles de rétroaction.",
                      'The body holds refined feedback loops that balance blood sugar, energy, and recovery whenever its core channels stay open.',
                      'Der Organismus steuert Blutzucker, Energie und Erholung über feine Rückkopplungsschleifen, sofern seine Grundfunktionen frei bleiben.'
                    )}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-2 text-xs text-[#C8AB8A] font-medium">
                  <Sparkles className="w-4 h-4 text-[#C8AB8A] shrink-0" />
                  <span>{tr('La pharmacie intérieure : une auto-régulation perpétuelle', 'Inner self-regulation: a continuous adaptive dialogue', 'Innere Selbstregulation: ein fortwährender Ausgleich')}</span>
                </div>
              </div>

            </div>

            {/* Encadré signature fondatrice Bloom */}
            <div className="bg-[#0F261E] rounded-2xl p-6 sm:p-8 border border-[#C8AB8A]/40 shadow-sm relative overflow-hidden text-center">
              <div className="max-w-3xl mx-auto space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[#C8AB8A] text-[10px] font-bold tracking-widest uppercase font-mono">
                  <span>{tr('Principe Fondateur Bloom', 'Founding Bloom Principle', 'Grundprinzip von Bloom')}</span>
                </div>
                <blockquote className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight leading-snug">
                  {tr(
                    '« Votre corps n’est pas cassé. Il est verrouillé par une charge adaptative devenue trop lourde. »',
                    '"Your body is not broken. It is locked by an adaptive load that has grown too heavy."',
                    '„Ihr Körper ist nicht kaputt. Er ist durch eine zu groß gewordene Anpassungslast blockiert.“'
                  )}
                </blockquote>
                <p className="text-xs sm:text-sm text-[#F9F6F0]/80 leading-relaxed max-w-2xl mx-auto">
                  {tr(
                    "Face aux toxines environnementales, au stress chronique et aux désordres métaboliques, les émonctoires se saturent. L'organisme verrouille certains systèmes non vitaux pour préserver les fonctions d'urgence. Le Reset Homéostasique lève ces verrous sans forcer.",
                    'Under environmental stress and excess metabolic load, elimination pathways saturate and the body conserves energy. The Homeostatic Reset educational approach supports gentle reopening without forcing.',
                    'Unter Umweltbelastung und Dauerstress sättigen sich die Ausscheidungswege. Das edukative Konzept des Homöostatischen Resets unterstützt eine sanfte Entlastung ohne Überforderung.'
                  )}
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
                <span>{tr('Herbier Anatomique & Racines', 'Botanical Plates & Roots', 'Botanische Tafeln & Wurzeln')}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0F261E] tracking-tight">
                {tr('Les Racines du Vivant : la profondeur du Totum', 'Living Roots: The Depth of the Botanical Totum', 'Lebende Wurzeln: Die Tiefe des Pflanzen-Totums')}
              </h2>
              <p className="text-xs sm:text-sm text-[#8A8177] leading-relaxed font-medium max-w-2xl mx-auto">
                {tr(
                  "Les principes amers, les polysaccharides immunitaires et les adaptogènes majeurs sont concentrés au cœur des racines et des rhizomes. Dessinées à l'encre noire selon la tradition des planches naturalistes, ces illustrations révèlent l'architecture invisible qui ancre le pouvoir régénérant des plantes.",
                  'Bitter principles, immune polysaccharides, and key adaptogens are concentrated deep within roots and rhizomes. Illustrated in the classic naturalist ink tradition, these plates highlight the botanical architecture of the Totum.',
                  'Bitterstoffe, Polysaccharide und Adaptogene konzentrieren sich tief in Wurzeln und Rhizomen. Im Stil klassischer Naturforscher-Tafeln zeigen diese Illustrationen die Architektur des Pflanzen-Totums.'
                )}
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
                      alt={tr('Planche I : Gentiane et Bardane avec racines profondes', 'Plate I: Gentian and Burdock deep roots', 'Tafel I: Enzian und Klette mit Tiefwurzeln')} 
                      className="w-full h-full object-contain filter contrast-110 group-hover:scale-105 transition-transform duration-500" 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <span className="text-[#C8AB8A] font-bold uppercase">{tr('Planche I', 'Plate I', 'Tafel I')}</span>
                    <span className="text-[#F9F6F0]/60">Radix Primordialis</span>
                  </div>

                  <h3 className="font-bold text-base text-white">
                    {tr('Gentiane & Bardane', 'Gentian & Burdock', 'Enzian & Klette')}
                  </h3>

                  <p className="text-xs text-[#F9F6F0]/80 leading-relaxed">
                    {tr(
                      'Racine pivotante maîtresse : inuline prébiotique, principes amers et déverrouillage de la filtration hépato-cutanée.',
                      'Master taproots rich in prebiotic inulin and bitter glycosides supporting digestive and skin filtration.',
                      'Kräftige Pfahlwurzeln mit präbiotischem Inulin und Bitterstoffen zur Unterstützung von Verdauung und Haut.'
                    )}
                  </p>

                  {/* Encart "Mécanisme d'action" imposé */}
                  <div className="bg-[#F9F6F0] rounded-xl p-3 border border-[#E7DFD3] text-[#0F261E] space-y-1 mt-2">
                    <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-[#3E4A3D]">
                      <Radio className="w-3 h-3 text-[#C8AB8A]" />
                      <span>{tr("Mécanisme d'action", 'Key mechanism', 'Wirkungsmechanismus')}</span>
                    </div>
                    <p className="text-[11px] leading-relaxed text-[#0F261E]/90 italic font-medium">
                      {tr(
                        'Ses principes amers stimulent les récepteurs TAS2R, déclenchant un réflexe de sécrétion biliaire. La plante ne « nettoie » pas le foie, elle réactive le signal hépatique endormi.',
                        'Bitter compounds activate TAS2R receptors, prompting natural digestive and bile reflexes. Rather than forcing, the plant wakes up dormant physiological signaling.',
                        'Bitterstoffe sprechen TAS2R-Rezeptoren an und regen natürliche Verdauungs- und Gallenreflexe an — die Pflanze erinnert das System sanft an seine Eigenfunktion.'
                      )}
                    </p>
                  </div>
                </div>

                <div className="pt-3 mt-4 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-[#C8AB8A]">
                  <span>{tr('Cible : Émonctoires', 'Target: Elimination', 'Ziel: Ausscheidung')}</span>
                  <span>{tr('Phase 0 & 1', 'Phase 0 & 1', 'Phase 0 & 1')}</span>
                </div>
              </div>

              {/* Planche II : Prêle & Pissenlit */}
              <div className="bg-[#3E4A3D] rounded-2xl border border-white/10 p-5 flex flex-col justify-between shadow-sm group hover:border-[#C8AB8A] transition-all">
                <div className="space-y-3">
                  <div className="rounded-xl overflow-hidden bg-[#FAF7F2] p-3 border border-[#E7DFD3] shadow-inner flex items-center justify-center aspect-[4/3]">
                    <img 
                      src={botanicalEmonctoiresImg} 
                      alt={tr('Planche II : Prêle et Pissenlit avec chevelu racinaire', 'Plate II: Horsetail and Dandelion root fibers', 'Tafel II: Schachtelhalm und Löwenzahnwurzel')} 
                      className="w-full h-full object-contain filter contrast-110 group-hover:scale-105 transition-transform duration-500" 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <span className="text-[#C8AB8A] font-bold uppercase">{tr('Planche II', 'Plate II', 'Tafel II')}</span>
                    <span className="text-[#F9F6F0]/60">Emunctoria Renalia</span>
                  </div>

                  <h3 className="font-bold text-base text-white">
                    {tr('Prêle & Pissenlit', 'Horsetail & Dandelion', 'Schachtelhalm & Löwenzahn')}
                  </h3>

                  <p className="text-xs text-[#F9F6F0]/80 leading-relaxed">
                    {tr(
                      'Chevelu radiculaire et rhizomes : silicates organiques biodisponibles et élimination hydrique sans fuite de minéraux.',
                      'Fine root fibers and rhizomes supplying bioavailable organic silica and gentle fluid clearance without mineral depletion.',
                      'Feine Faserwurzeln und Rhizome mit bioverfügbarem Silizium und sanfter Wasserausscheidung ohne Mineralstoffverlust.'
                    )}
                  </p>

                  {/* Encart "Mécanisme d'action" */}
                  <div className="bg-[#F9F6F0] rounded-xl p-3 border border-[#E7DFD3] text-[#0F261E] space-y-1 mt-2">
                    <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-[#3E4A3D]">
                      <Radio className="w-3 h-3 text-[#C8AB8A]" />
                      <span>{tr("Mécanisme d'action", 'Key mechanism', 'Wirkungsmechanismus')}</span>
                    </div>
                    <p className="text-[11px] leading-relaxed text-[#0F261E]/90 italic font-medium">
                      {tr(
                        'Les silicates chélatés et les sels de potassium activent la filtration glomérulaire sans déperdition électrolytique. La plante relance le débit rénal et décongestionne la matrice extracellulaire.',
                        'Organic silicates and natural potassium salts gently encourage renal filtration while preserving electrolyte balance and extracellular hydration.',
                        'Organische Silikate und natürliche Kaliumsalze unterstützen die Nierenfiltration unter Erhalt der Elektrolytbalance und Gewebeflüssigkeit.'
                      )}
                    </p>
                  </div>
                </div>

                <div className="pt-3 mt-4 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-[#C8AB8A]">
                  <span>{tr('Cible : Reins & Fascia', 'Target: Kidneys & Fascia', 'Ziel: Nieren & Faszien')}</span>
                  <span>{tr('Drainage Doux', 'Gentle Clearance', 'Sanfte Drainage')}</span>
                </div>
              </div>

              {/* Planche III : Réglisse & Chardon-Marie */}
              <div className="bg-[#3E4A3D] rounded-2xl border border-white/10 p-5 flex flex-col justify-between shadow-sm group hover:border-[#C8AB8A] transition-all">
                <div className="space-y-3">
                  <div className="rounded-xl overflow-hidden bg-[#FAF7F2] p-3 border border-[#E7DFD3] shadow-inner flex items-center justify-center aspect-[4/3]">
                    <img 
                      src={botanicalHepaticImg} 
                      alt={tr('Planche III : Réglisse et Chardon-Marie avec rhizomes', 'Plate III: Licorice and Milk Thistle rhizomes', 'Tafel III: Süßholz und Mariendistel-Rhizome')} 
                      className="w-full h-full object-contain filter contrast-110 group-hover:scale-105 transition-transform duration-500" 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <span className="text-[#C8AB8A] font-bold uppercase">{tr('Planche III', 'Plate III', 'Tafel III')}</span>
                    <span className="text-[#F9F6F0]/60">Rhizoma Hepaticus</span>
                  </div>

                  <h3 className="font-bold text-base text-white">
                    {tr('Réglisse & Chardon', 'Licorice & Milk Thistle', 'Süßholz & Mariendistel')}
                  </h3>

                  <p className="text-xs text-[#F9F6F0]/80 leading-relaxed">
                    {tr(
                      'Rhizomes riches en glycyrrhizine et silymarine : régénération de la membrane hépatocytaire et relance biliaire.',
                      'Botanical compounds rich in silymarin and soothing triterpenes traditionally studied for liver cell protection and bile balance.',
                      'Pflanzenstoffe reich an Silymarin und beruhigenden Triterpenen, traditionell geschätzt für Leberzellschutz und Gallenbalance.'
                    )}
                  </p>

                  {/* Encart "Mécanisme d'action" */}
                  <div className="bg-[#F9F6F0] rounded-xl p-3 border border-[#E7DFD3] text-[#0F261E] space-y-1 mt-2">
                    <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-[#3E4A3D]">
                      <Radio className="w-3 h-3 text-[#C8AB8A]" />
                      <span>{tr("Mécanisme d'action", 'Key mechanism', 'Wirkungsmechanismus')}</span>
                    </div>
                    <p className="text-[11px] leading-relaxed text-[#0F261E]/90 italic font-medium">
                      {tr(
                        'La silymarine stabilise la membrane des hépatocytes et la glycyrrhizine inhibe la 11β-HSD, protégeant le cortisol endogène. Elles activent la phase II de détoxification sans forcer les cytochromes.',
                        'Silymarin supports hepatocyte membrane integrity while licorice compounds help buffer endogenous stress balance and support Phase II metabolic clearance.',
                        'Silymarin schützt die Zellmembran der Leber, während Süßholz die endogene Balance unterstützt und die Phase-II-Verstoffwechselung begleitet.'
                      )}
                    </p>
                  </div>
                </div>

                <div className="pt-3 mt-4 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-[#C8AB8A]">
                  <span>{tr('Cible : Foie & Bile', 'Target: Liver & Bile', 'Ziel: Leber & Galle')}</span>
                  <span>{tr('Relance Hépatique', 'Hepatic Support', 'Leber-Unterstützung')}</span>
                </div>
              </div>

              {/* Planche IV : Ashwagandha & Rhodiola */}
              <div className="bg-[#3E4A3D] rounded-2xl border border-white/10 p-5 flex flex-col justify-between shadow-sm group hover:border-[#C8AB8A] transition-all">
                <div className="space-y-3">
                  <div className="rounded-xl overflow-hidden bg-[#FAF7F2] p-3 border border-[#E7DFD3] shadow-inner flex items-center justify-center aspect-[4/3]">
                    <img 
                      src={botanicalVitalityImg} 
                      alt={tr('Planche IV : Ashwagandha et Rhodiola avec racines adaptogènes', 'Plate IV: Ashwagandha and Rhodiola adaptogenic roots', 'Tafel IV: Ashwagandha und Rosenwurz als Adaptogene')} 
                      className="w-full h-full object-contain filter contrast-110 group-hover:scale-105 transition-transform duration-500" 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <span className="text-[#C8AB8A] font-bold uppercase">{tr('Planche IV', 'Plate IV', 'Tafel IV')}</span>
                    <span className="text-[#F9F6F0]/60">Radix Adaptogena</span>
                  </div>

                  <h3 className="font-bold text-base text-white">
                    {tr('Ashwagandha & Rhodiola', 'Ashwagandha & Rhodiola', 'Ashwagandha & Rosenwurz')}
                  </h3>

                  <p className="text-xs text-[#F9F6F0]/80 leading-relaxed">
                    {tr(
                      "Withanolides et salidrosides : régulation de l'axe HPA du stress et recharge mitochondriale sans nervosité.",
                      'Withanolides and salidrosides supporting HPA stress resilience and steady mitochondrial energy without overstimulation.',
                      'Withanolide und Salidroside für eine ausgeglichene HPA-Stressachse und ruhige zelluläre Energie ohne Unruhe.'
                    )}
                  </p>

                  {/* Encart "Mécanisme d'action" */}
                  <div className="bg-[#F9F6F0] rounded-xl p-3 border border-[#E7DFD3] text-[#0F261E] space-y-1 mt-2">
                    <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-[#3E4A3D]">
                      <Radio className="w-3 h-3 text-[#C8AB8A]" />
                      <span>{tr("Mécanisme d'action", 'Key mechanism', 'Wirkungsmechanismus')}</span>
                    </div>
                    <p className="text-[11px] leading-relaxed text-[#0F261E]/90 italic font-medium">
                      {tr(
                        "Les withanolides et salidrosides modulent l'axe HPA en réduisant l'hyper-réactivité des récepteurs au cortisol. Elles restaurent l'ATP mitochondrial sans épuiser les réserves adrénergiques.",
                        'Withanolides and salidrosides help buffer stress-axis sensitivity and support natural mitochondrial ATP rhythm without draining adrenal reserves.',
                        'Withanolide und Salidroside modulieren die Stressachse und fördern die mitochondriale ATP-Produktion, ohne die Reserven zu erschöpfen.'
                      )}
                    </p>
                  </div>
                </div>

                <div className="pt-3 mt-4 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-[#C8AB8A]">
                  <span>{tr('Cible : Axe HPA & SEC', 'Target: HPA Axis & ECS', 'Ziel: HPA-Achse & ECS')}</span>
                  <span>{tr('Régénération', 'Resilience', 'Regeneration')}</span>
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
                <span>{tr("Le Parcours d'Accordage Biologique", 'The Biological Tuning Journey', 'Der Biologische Abstimmungs-Pfad')}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0F261E] tracking-tight">
                {tr("L'Accordage en 6 Phases : Synchroniser vos Systèmes", 'The 6-Phase Tuning: Synchronizing Your Systems', 'Abstimmung in 6 Phasen: Systeme synchronisieren')}
              </h2>
              <p className="text-xs sm:text-sm text-[#8A8177] leading-relaxed font-medium max-w-2xl mx-auto">
                {tr(
                  "Tout comme un instrument de musique se règle corde par corde, le corps ne peut être rééquilibré d'un coup. Le Reset déploie une séquence chronologique stricte pour alléger la ",
                  'Just like tuning an instrument string by string, the body cannot be rebalanced all at once. The Reset follows an orderly sequence to ease ',
                  'Wie ein Musikinstrument Saite für Saite gestimmt wird, braucht der Körper eine klare Reihenfolge, um die '
                )}
                <TermTooltip 
                  term={tr('Charge Allostatique', 'Allostatic Load', 'Allostatische Last')} 
                  definition={tr(
                    "L'usure accumulée par un corps qui tourne en surrégime pour compenser un déséquilibre chronique répété.",
                    'Cumulative wear placed on the body when it continuously compensates for ongoing stress and strain.',
                    'Die kumulative Beanspruchung eines Körpers, der dauerhaft Überstunden leistet, um Belastungen auszugleichen.'
                  )}
                >
                  {tr('charge allostatique', 'allostatic load', 'allostatische Last')}
                </TermTooltip>{' '}
                {tr('et ouvrir les ', 'and open the ', 'zu verringern und die ')}{' '}
                <TermTooltip 
                  term={tr('Émonctoires', 'Elimination Pathways', 'Ausscheidungswege')} 
                  definition={tr(
                    "Les 5 voies d'élimination de l'organisme (reins, foie, poumons, peau, intestins) qui évacuent les résidus métaboliques.",
                    'The 5 natural elimination routes (kidneys, liver, lungs, skin, gut) that clear metabolic by-products.',
                    'Die 5 natürlichen Ausscheidungswege des Körpers (Nieren, Leber, Lunge, Haut, Darm).'
                  )}
                >
                  {tr('émonctoires', 'elimination pathways', 'Ausscheidungswege')}
                </TermTooltip>{' '}
                {tr('dans le bon ordre.', 'in the proper sequence.', 'in der richtigen Reihenfolge zu öffnen.')}
              </p>
            </div>

            {/* Expérience d'accordage : Timeline visuelle interactive */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tuningPhases.map((phase, idx) => (
                <div 
                  key={idx}
                  onClick={() => {
                    const fullPhase = localizedPhases.find(p => p.key === phase.key) || localizedPhases[0];
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
                        {tr('Totum Végétal Clé :', 'Key Botanical Totum:', 'Wichtiges Pflanzen-Totum:')}
                      </div>
                      <div className="text-xs text-[#0F261E] font-medium">
                        {phase.plants}
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#E7DFD3] flex items-center justify-between text-[11px] font-mono">
                    <span className="text-[#8A8177]">{phase.targetSystem}</span>
                    <span className="text-[#3E4A3D] font-bold group-hover:translate-x-0.5 transition-transform">
                      {tr('Dosages', 'Details', 'Details')} &rarr;
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Encart Stratégique : Intégration de la Phycocyanine (Phases 2 & 3) */}
            <div className="rounded-3xl overflow-hidden border border-[#C8AB8A] bg-white shadow-sm grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-5 relative aspect-[16/10] lg:aspect-auto bg-[#FAF7F2] overflow-hidden">
                <img
                  src={phycocyanineImg}
                  alt={
                    lang === 'en'
                      ? 'Phycocyanin liquid extract at 40 °C for Homeostatic Reset Phases 2 and 3'
                      : lang === 'de'
                      ? 'Flüssiger Phycocyanin-Extrakt bei 40 °C für Phase 2 & 3 des Homöostatischen Resets'
                      : 'Extraction liquide de phycocyanine de spiruline à 40 °C pour les Phases 2 et 3 du Reset Homéostasique'
                  }
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-4">
                <div className="space-y-2.5">
                  <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#E8772E]">
                    {lang === 'en'
                      ? 'Strategic Synergy · Phases 2 & 3'
                      : lang === 'de'
                      ? 'Strategische Synergie · Phase 2 & 3'
                      : 'Synergie Stratégique · Phases 2 & 3 du Reset'}
                  </p>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-[#0F261E] leading-tight">
                    {lang === 'en'
                      ? 'Phycocyanin Extraction at 40 °C: Cellular Cleansing & Mitochondrial Support'
                      : lang === 'de'
                      ? 'Phycocyanin-Extraktion bei 40 °C: Zellschutz & Mitochondrien-Balance'
                      : 'Recette Phycocyanine à 40 °C : Le Bleu qui Potentialise vos Phases 2 & 3'}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#3E4A3D] leading-relaxed">
                    {lang === 'en'
                      ? 'Extracted gently at 40 °C with BloomLab, water-soluble spirulina phycocyanin protects mitochondria, modulates NF-κB / Nrf2 pathways, and helps lower allostatic load during Phase 2 and Phase 3.'
                      : lang === 'de'
                      ? 'Schonend bei 40 °C mit der BloomLab extrahiert, schützt Phycocyanin Mitochondrien, moduliert NF-κB / Nrf2 und entlastet die allostatische Last in Phase 2 & 3.'
                      : 'Extraite en douceur à 40 °C avec la BloomLab®, la phycocyanine de spiruline protège les mitochondries, module les voies NF-κB / Nrf2 et accompagne le Drainage Profond (Phase 2) ainsi que la Régénération de l’Axe HPA (Phase 3).'}
                  </p>
                  <p className="text-xs font-semibold text-[#3E4A3D]/80 tabular-nums">
                    {lang === 'en'
                      ? '40–50 g organic spirulina · 800 ml water (pH 7) · 1 h at 40 °C (< 45 °C)'
                      : lang === 'de'
                      ? '40–50 g Bio-Spirulina · 800 ml Wasser (pH 7) · 1 Std. bei 40 °C (< 45 °C)'
                      : '40–50 g de spiruline bio · 800 ml d’eau (pH 7) · 1 h à 40 °C (< 45 °C)'}
                  </p>
                </div>
                <div className="pt-1">
                  <a
                    href="/academie/reset-homeostasique/phycocyanine/"
                    onClick={(e) => {
                      if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                        e.preventDefault();
                        onNavigate('recette-phycocyanine');
                      }
                    }}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1E2E25] hover:bg-[#E8772E] !text-white font-bold text-xs sm:text-sm uppercase tracking-wider transition-colors"
                  >
                    <span>
                      {lang === 'en'
                        ? 'Open Phycocyanin Protocol'
                        : lang === 'de'
                        ? 'Zum Phycocyanin-Protokoll'
                        : 'Consulter la fiche Phycocyanine complète'}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Navigation Tabs (Protocoles, Compléments, Chronobiologie) avec Freemium Gate */}
            <div className="pt-6 space-y-6">
              <div className="flex flex-wrap justify-center gap-3">
                {[
                  { id: 'protocol', label: tr('1. Le Protocole Détaillé', '1. Detailed Protocol', '1. Detailliertes Protokoll'), icon: Activity },
                  { id: 'supplements', label: tr('2. Compléments Synergiques', '2. Synergistic Cofactors', '2. Synergetische Kofaktoren'), icon: FlaskConical },
                  { id: 'chronobiology', label: tr('3. Chronobiologie Circadienne', '3. Circadian Chronobiology', '3. Zirkadiane Chronobiologie'), icon: Clock }
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
                title={tr(
                  'Débloquez le Protocole Complet du Reset Homéostasique',
                  'Unlock the Full Homeostatic Reset Framework',
                  'Schalten Sie das komplette Homöostatische Reset-Protokoll frei'
                )}
                subtitle={tr(
                  "L’aperçu des planches botaniques et la trame d'accordage sont en accès libre. Débloquez l’intégralité des 6 phases d’extraction, les paramètres thermiques BloomLab®, les posologies précises et la synchronisation circadienne avec votre abonnement.",
                  'The botanical plates and tuning overview are open access. Subscribe to unlock all 6 extraction phases, BloomLab® temperature parameters, detailed ratios, and circadian timing.',
                  'Die botanischen Tafeln und der Phasenüberblick sind frei zugänglich. Mit dem Abo schalten Sie alle 6 Extraktionsphasen, BloomLab®-Temperaturwerte, Verhältnisse und zirkadiane Abläufe frei.'
                )}
                bulletPoints={[
                  tr("Paramètres thermiques stricts d'extraction séquentielle (Phase A aqueuse & B lipidique)", 'Exact thermal parameters for sequential extraction (Aqueous Phase A & Lipid Phase B)', 'Präzise Temperaturprofile für sequenzielle Extraktion (Phase A wässrig & Phase B lipid)'),
                  tr('Chronobiologie circadienne complète (Matin, Midi, Soir, Nuit)', 'Complete circadian timing chart (Morning, Midday, Evening, Night)', 'Vollständige zirkadiane Taktung (Morgen, Mittag, Abend, Nacht)'),
                  tr('Dosages précis des cofacteurs et compléments synergiques de terrain', 'Detailed educational overview of synergistic nutrients & cofactors', 'Strukturierte Übersicht synergetischer Nährstoffe und Kofaktoren'),
                  tr('Accès débloqué aux 4 Architectures, 7 Terrains et Protocoles Ciblés', 'Full access to the 4 Architectures, 7 Terrains & Targeted Guides', 'Vollzugriff auf die 4 Architekturen, 7 Terrains & Detail-Guides')
                ]}
                teaserContent={
                  <div className="p-6 rounded-2xl bg-[#0F261E] text-white border border-[#C8AB8A]/30 space-y-4">
                    <div className="flex items-center gap-2 text-xs font-bold !text-white uppercase tracking-wider font-mono">
                      <Sliders className="w-4 h-4 text-[#C8AB8A]" />
                      <span className="text-white">{tr("Cadence de l'Accordage Biologique • Vue Synthétique", 'Biological Tuning Cadence • Overview', 'Rhythmus der Biologischen Abstimmung • Übersicht')}</span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3 text-center text-xs">
                      {tuningPhases.map((phase, idx) => (
                        <div key={idx} className="p-3 rounded-xl bg-[#3E4A3D] border border-white/10 space-y-1">
                          <span className="font-mono !text-white font-black text-xs block">{phase.id}</span>
                          <strong className="!text-white block truncate text-[11px]">{phase.title}</strong>
                          <span className="text-[10px] !text-white block">{phase.duration}</span>
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
                        {localizedPhases.map((step, idx) => (
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
                              {tr('Consulter les dosages', 'View phase details', 'Phasendetails ansehen')} &rarr;
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
                              {tr('Cible :', 'Target:', 'Ziel:')} {item.target}
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
                              {tr('Synchronisation circadienne', 'Circadian synchronization', 'Zirkadiane Synchronisation')}
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
                <span>{tr('Responsabilisation & Piliers du Terrain', 'Lifestyle Foundations & Terrain Pillars', 'Lebensstil-Säulen & Terrainpflege')}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0F261E] tracking-tight">
                {tr('Les 4 Dimensions de la Responsabilité', 'The 4 Dimensions of Daily Terrain Care', 'Die 4 Dimensionen der täglichen Terrainpflege')}
              </h2>
              <p className="text-xs sm:text-sm text-[#8A8177] leading-relaxed font-medium max-w-2xl mx-auto">
                {tr(
                  'Les plantes médicinales ne sont pas des béquilles passives. Elles agissent comme de puissants catalyseurs biochimiques, mais leur pleine efficacité dépend des 4 piliers fondamentaux de votre hygiène de vie quotidienne.',
                  'Botanicals are not passive crutches. They act as biochemical catalysts whose steady support relies on the 4 core pillars of daily rhythm.',
                  'Heilpflanzen sind keine passiven Krücken. Sie wirken als biochemische Impulsgeber, deren Potenzial auf den 4 Grundpfeilern des Alltags beruht.'
                )}
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
                      {tr('Dimension I', 'Dimension I', 'Dimension I')}
                    </span>
                    <h3 className="text-base font-bold text-white mt-1">
                      {tr("L'Environnement & L'Ingestion", 'Environment & Nourishment', 'Umfeld & Ernährung')}
                    </h3>
                  </div>
                  <p className="text-xs text-[#F9F6F0]/85 leading-relaxed">
                    {tr(
                      "Ce que vous ingérez dicte la charge de vos filtres émonctoriels. Réduire les aliments ultra-transformés, réintroduire la saveur amère stimulatrice du foie et des sucs gastriques, s'hydrater avec une eau peu minéralisée.",
                      'Daily intake shapes the workload on your filter organs. Minimize ultra-processed foods, reintroduce bitter plant notes, and hydrate with pure low-mineral water.',
                      'Was wir aufnehmen, bestimmt die Last der Filterorgane. Weniger hochverarbeitete Kost, wieder mehr Bitterstoffe und reines, mineralarmes Wasser.'
                    )}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-white/10">
                  <p className="text-[11px] font-serif italic text-[#C8AB8A]">
                    {tr('« Nourrir la cellule, soulager le filtre hépato-rénal. »', '"Nourish the cell, ease the hepato-renal filter."', '„Die Zelle nähren, den Leber-Nieren-Filter entlasten.“')}
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
                      {tr('Dimension II', 'Dimension II', 'Dimension II')}
                    </span>
                    <h3 className="text-base font-bold text-white mt-1">
                      {tr('Le Mouvement & La Circulation', 'Movement & Circulation', 'Bewegung & Zirkulation')}
                    </h3>
                  </div>
                  <p className="text-xs text-[#F9F6F0]/85 leading-relaxed">
                    {tr(
                      "La lymphe — véhicule principal des déchets immunitaires et cellulaires — ne possède pas de pompe cardiaque. Seul le mouvement musculaire, la marche et la mobilité des fascias propulsent ce fleuve purificateur vers les canaux d'évacuation.",
                      'Lymph — the main clearance stream for cellular by-products — has no heart pump. Walking, muscular tone, and fascia mobility keep this internal river flowing.',
                      'Die Lymphe — Haupttransportweg zellulärer Rückstände — besitzt keine eigene Pumpe. Nur Muskelbewegung, Gehen und Faszienmobilität halten diesen Strom im Fluss.'
                    )}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-white/10">
                  <p className="text-[11px] font-serif italic text-[#C8AB8A]">
                    {tr("« L'eau stagnante s'encrasse, l'eau vive se purifie. »", '"Stagnant water clouds; flowing water stays clear."', '„Stehendes Wasser trübt sich, fließendes Wasser klärt sich.“')}
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
                      {tr('Dimension III', 'Dimension III', 'Dimension III')}
                    </span>
                    <h3 className="text-base font-bold text-white mt-1">
                      {tr('Le Sommeil & La Réparation', 'Sleep & Overnight Renewal', 'Schlaf & Nächtliche Erholung')}
                    </h3>
                  </div>
                  <p className="text-xs text-[#F9F6F0]/85 leading-relaxed">
                    {tr(
                      "C'est durant le sommeil profond que s'active le système glymphatique cérébral et que l'autophagie recycle les protéines endommagées. Sans repos circadien respecté, aucune régénération mitochondriale n'est possible.",
                      'Deep sleep activates cerebral glymphatic clearance and cellular autophagy housekeeping. Consistent circadian rest is indispensable for mitochondrial renewal.',
                      'Im Tiefschlaf aktiviert sich das glymphatische System des Gehirns und die zelluläre Autophagie. Verlässlicher Schlaf ist die Basis jeder Zellregeneration.'
                    )}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-white/10">
                  <p className="text-[11px] font-serif italic text-[#C8AB8A]">
                    {tr("« Le sommeil profond est l'élixir souverain de l'autophagie. »", '"Deep sleep is the cornerstone of cellular renewal."', '„Tiefer Schlaf ist der Schlüssel zur nächtlichen Zellerneuerung.“')}
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
                      {tr('Dimension IV', 'Dimension IV', 'Dimension IV')}
                    </span>
                    <h3 className="text-base font-bold text-white mt-1">
                      {tr('Le Mental, Le Vague & Le Stress', 'Mind, Vagus Nerve & Stress', 'Geist, Vagusnerv & Stress')}
                    </h3>
                  </div>
                  <p className="text-xs text-[#F9F6F0]/85 leading-relaxed">
                    {tr(
                      "En stress chronique (mode orthosympathique), le corps bloque les sécrétions digestives et hépatiques pour mobiliser l'énergie de survie. Cultiver le tonus du nerf vague (respiration 5-5) est le prérequis pour rouvrir la digestion et l'équilibre.",
                      'Under sustained sympathetic alert, digestive secretions slow down to prioritize immediate energy. Nurturing vagal tone through slow breathing restores calm digestive flow.',
                      'Bei anhaltendem Stress drosselt der Sympathikus Verdauungs- und Gallensäfte. Ruhiges Atmen stärkt den Vagusnerv und gibt der Verdauung grünes Licht.'
                    )}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-white/10">
                  <p className="text-[11px] font-serif italic text-[#C8AB8A]">
                    {tr('« Le corps ne répare ses tissus qu’en état de sécurité. »', '"The body repairs best when it feels safe."', '„Der Körper regeneriert am besten im Zustand innerer Sicherheit.“')}
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
                    {tr('Axe Neuro-Végétatif & Terrain', 'Autonomic Axis & Terrain', 'Vegetative Achse & Terrain')}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-[#0F261E]">
                    {tr("Le Nerf Vague : Le Siège de l'Équilibre Autonome", 'The Vagus Nerve: Anchor of Autonomic Balance', 'Der Vagusnerv: Anker der vegetativen Balance')}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#8A8177] leading-relaxed font-normal">
                    {tr(
                      "90% des informations nerveuses remontent du ventre vers le cerveau. 95% de la sérotonine est produite dans l'intestin. La respiration lente et la stimulation amère de la gentiane jaune (BloomLab) activent le tonus vagal pour réenclencher le péristaltisme et lever la charge allostatique.",
                      '90% of vagal fibers carry signals upward from gut to brain, and around 95% of serotonin is synthesized in the gut. Slow breathing and gentle bitter stimulation (gentian extracted via BloomLab) support vagal tone and calm digestive rhythm.',
                      'Rund 90 % der Vagus-Signale wandern vom Darm zum Gehirn, und ca. 95 % des Serotonins entstehen im Darm. Ruhige Atmung und Bitterstoffe wie gelber Enzian (BloomLab) fördern den Vagustonus und eine entspannte Verdauungsdynamik.'
                    )}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ========================================================================= */}
          {/* 5.5 QUESTIONS FRÉQUENTES SUR LE RESET HOMÉOSTASIQUE                       */}
          {/* ========================================================================= */}
          <section id="faq-reset-homeostasique" className="space-y-6">
            <div className="space-y-2 text-center max-w-3xl mx-auto">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#C8AB8A] font-bold">
                {tr('Questions Fréquentes · Terrain & Homéostasie', 'Frequently Asked Questions · Terrain & Homeostasis', 'Häufige Fragen · Terrain & Homöostase')}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#0F261E] tracking-tight">
                {tr("Comprendre l'accordage systémique en pratique", 'Understanding Systemic Tuning in Practice', 'Systemische Abstimmung in der Praxis verstehen')}
              </h2>
            </div>

            <div className="max-w-4xl mx-auto space-y-3">
              {resetFaqs.map((item, idx) => {
                const isOpen = openResetFaq === idx;
                return (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl border border-[#E7DFD3] overflow-hidden shadow-xs"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenResetFaq(isOpen ? null : idx)}
                      className="w-full flex items-center justify-between gap-4 p-5 text-left font-bold text-sm sm:text-base text-[#0F261E] hover:text-[#C8AB8A] transition-colors cursor-pointer"
                      aria-expanded={isOpen}
                    >
                      <span>{item.q}</span>
                      <span className="text-xs font-mono text-[#C8AB8A] shrink-0">{isOpen ? '−' : '+'}</span>
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 text-xs sm:text-sm text-[#3E4A3D] leading-relaxed border-t border-[#E7DFD3]/60 pt-3">
                        {item.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* ========================================================================= */}
          {/* 6. SECTION "ALMA" (LE CTA)                                                */}
          {/* ========================================================================= */}
          <section className="p-8 sm:p-14 rounded-2xl bg-[#0F261E] text-white border border-[#C8AB8A]/40 shadow-xl relative overflow-hidden text-center">
            <div className="max-w-3xl mx-auto space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/15 text-[#C8AB8A] text-[10px] font-bold uppercase tracking-widest font-mono">
                <Brain className="w-3.5 h-3.5 text-[#C8AB8A]" />
                <span>{tr('Anamnèse Personnalisée', 'Guided Terrain Questionnaire', 'Geführter Terrain-Check')}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
                {tr('Quel système biologique est actuellement le plus verrouillé chez vous ?', 'Which biological system is currently carrying the highest load?', 'Welches biologische System steht bei Ihnen aktuell unter höchster Last?')}
              </h2>

              <p className="text-xs sm:text-sm md:text-base text-[#F9F6F0]/85 !text-[#F9F6F0]/90 leading-relaxed max-w-2xl mx-auto">
                {tr(
                  "Le Reset Homéostasique n'est pas une recette universelle : il s'ajuste à votre terrain dominant et au niveau d'engorgement de vos émonctoires. Dialoguez avec ALMA pour identifier vos priorités physiologiques.",
                  'The Homeostatic Reset is never one-size-fits-all: it adapts to your dominant profile and current elimination load. Chat with ALMA to clarify your wellness priorities.',
                  'Der Homöostatische Reset ist kein Schema F: Er orientiert sich an Ihrem vorherrschenden Profil und Ihren Ausscheidungswegen. Tauschen Sie sich mit ALMA über Ihre Schwerpunkte aus.'
                )}
              </p>

              {/* Bouton CTA et Micro-texte imposé */}
              <div className="pt-2 flex flex-col items-center justify-center gap-3">
                <button 
                  onClick={() => onNavigate('chat')}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#C8AB8A] hover:bg-[#b89b7b] text-[#0F261E] font-black text-xs sm:text-sm uppercase tracking-wider transition-all shadow-xl hover:shadow-2xl flex items-center justify-center gap-3 cursor-pointer group"
                >
                  <Brain className="w-5 h-5 text-[#0F261E] group-hover:scale-110 transition-transform" />
                  <span>{tr('Commencer mon anamnèse avec ALMA', 'Start My Assessment with ALMA', 'Meinen Check mit ALMA starten')}</span>
                  <ArrowRight className="w-4 h-4 text-[#0F261E] group-hover:translate-x-1 transition-transform" />
                </button>

                {/* Micro-texte imposé sous le bouton */}
                <p className="text-xs text-[#C8AB8A] !text-[#C8AB8A] font-medium font-sans">
                  {tr(
                    'Test personnalisé de 3 minutes pour identifier le système le plus verrouillé chez vous.',
                    '3-minute guided questionnaire to identify your main systemic priority.',
                    'Geführter 3-Minuten-Check zur Erkennung Ihres wichtigsten Schwerpunkts.'
                  )}
                </p>
              </div>

              <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-center gap-4 text-xs text-[#F9F6F0]/80">
                <a
                  href="/bloomlab/"
                  onClick={(e) => { if (!e.ctrlKey && !e.metaKey && !e.shiftKey) { e.preventDefault(); onNavigate('machine'); } }}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold transition-colors"
                >
                  {tr('Découvrir BloomLab®', 'Discover BloomLab®', 'BloomLab® entdecken')}
                </a>
                <a
                  href="/extraction-botanique/"
                  onClick={(e) => { if (!e.ctrlKey && !e.metaKey && !e.shiftKey) { e.preventDefault(); onNavigate('pillar-extraction'); } }}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold transition-colors"
                >
                  {tr("Guide de l'Extraction A/B", 'A/B Extraction Guide', 'Leitfaden A/B-Extraktion')}
                </a>
                <a
                  href="/boutique/"
                  onClick={(e) => { if (!e.ctrlKey && !e.metaKey && !e.shiftKey) { e.preventDefault(); onNavigate('boutique'); } }}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold transition-colors"
                >
                  {tr('Boutique Bloom by BotaniK', 'Bloom by BotaniK Shop', 'Bloom by BotaniK Shop')}
                </a>
              </div>

              <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-[#F9F6F0]/60">
                <span className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#C8AB8A]" /> {tr('15 questions guidées', '15 guided questions', '15 geführte Fragen')}
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#C8AB8A]" /> {tr('100% confidentiel', '100% confidential', '100 % vertraulich')}
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#C8AB8A]" /> {tr('Sans engagement', 'No commitment', 'Unverbindlich')}
                </span>
              </div>

            </div>
          </section>

        </main>
      </div>
    </GlossaryProvider>
  );
}