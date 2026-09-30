import React, { useState } from 'react';
import { 
  Sparkles, 
  Activity, 
  Leaf, 
  Moon, 
  Sun, 
  Zap, 
  Clock, 
  Check, 
  AlertTriangle, 
  ChevronRight, 
  Share2, 
  Printer, 
  ArrowRight,
  Brain,
  Shield,
  Compass,
  Layers,
  FlaskConical,
  Eye,
  Droplets,
  Calendar,
  CheckCircle2,
  FileText
} from 'lucide-react';
import { View } from './types';
import { Language } from './translations';
import { AcademyNavigation } from './components/AcademyNavigation';
import { TooltipLexique } from './components/TooltipLexique';

interface ProtocoleDecalcificationPinealeContentProps {
  isPremium?: boolean;
  onNavigate: (view: View, param?: string) => void;
  onRequireAuth?: () => void;
  lang?: Language;
}

export const getPinealeDisclaimer = (lang: Language = 'fr') => {
  if (lang === 'en') {
    return "This protocol is an educational guide. It does not replace medical advice. The pineal gland is an endocrine organ whose function regulates melatonin production. Always consult a physician before modifying treatments or using medicinal plants.";
  }
  if (lang === 'de') {
    return "Dieses Protokoll dient Bildungszwecken. Es ersetzt keinen ärztlichen Rat. Die Zirbeldrüse ist ein endokrines Organ zur Melatoninproduktion. Konsultieren Sie vor Therapieänderungen stets einen Arzt.";
  }
  return "Ce protocole est un accompagnement éducatif. Il ne remplace en aucun cas un avis médical. La glande pinéale est un organe endocrine dont le fonctionnement est lié à la production de mélatonine. Consultez un médecin avant toute modification de traitement ou utilisation de plantes médicinales.";
};

export const PINEALE_MEDICAL_DISCLAIMER = getPinealeDisclaimer('fr');

export default function ProtocoleDecalcificationPinealeContent({
  isPremium = false,
  onNavigate,
  onRequireAuth,
  lang = 'fr'
}: ProtocoleDecalcificationPinealeContentProps) {
  const [activeTab, setActiveTab] = useState<'avant-propos' | 'mecanismes' | 'phases' | 'extraction' | 'chronobiologie'>('avant-propos');
  const [copiedLink, setCopiedLink] = useState(false);

  const t = {
    fr: {
      navTitle: "Décalcification Pinéale",
      navSection: "Reset Homéostasique",
      badge: "Protocole Systémique — Chronobiologie & Épiphyse",
      h1: "PROTOCOLE DÉCALCIFICATION PINÉALE — RESET HOMÉOSTASIQUE",
      subtitle: "Guide pratique et chronobiologique pour libérer la glande pinéale",
      disclaimerTitle: "Avertissement Médical et Cadre Déontologique",
      disclaimer: getPinealeDisclaimer('fr'),
      duration: "Cure de 28 jours (4 semaines)",
      axis: "Axe Circadien & Émonctoires",
      share: "Partager",
      copied: "Copié !",
      print: "Imprimer",
      tab1: "1. Avant-Propos & Fondements",
      tab2: "2. Mécanismes & 3 Piliers",
      tab3: "3. Les 4 Phases (28 jours)",
      tab4: "4. Recette BloomLab",
      tab5: "5. Rythme Circadien"
    },
    en: {
      navTitle: "Pineal Decalcification",
      navSection: "Homeostatic Reset",
      badge: "Systemic Protocol — Chronobiology & Epiphysis",
      h1: "PINEAL DECALCIFICATION PROTOCOL — HOMEOSTATIC RESET",
      subtitle: "Practical and chronobiological guide to restore pineal function",
      disclaimerTitle: "Medical Disclaimer & Ethical Framework",
      disclaimer: getPinealeDisclaimer('en'),
      duration: "28-day protocol (4 weeks)",
      axis: "Circadian Axis & Clearance",
      share: "Share",
      copied: "Copied!",
      print: "Print",
      tab1: "1. Foreword & Rationale",
      tab2: "2. Mechanisms & 3 Pillars",
      tab3: "3. The 4 Phases (28 Days)",
      tab4: "4. BloomLab Recipe",
      tab5: "5. Circadian Rhythm"
    },
    de: {
      navTitle: "Zirbeldrüsen-Entkalkung",
      navSection: "Homöostatischer Reset",
      badge: "Systemisches Protokoll — Chronobiologie & Epiphyse",
      h1: "ZIRBELDRÜSEN-ENTKALKUNGSPROTOKOLL — HOMÖOSTATISCHER RESET",
      subtitle: "Praktischer und chronobiologischer Leitfaden zur Befreiung der Zirbeldrüse",
      disclaimerTitle: "Medizinischer Hinweis & Ethischer Rahmen",
      disclaimer: getPinealeDisclaimer('de'),
      duration: "28-Tage-Kur (4 Wochen)",
      axis: "Zirkadiane Achse & Ausleitung",
      share: "Teilen",
      copied: "Kopiert!",
      print: "Drucken",
      tab1: "1. Vorwort & Grundlagen",
      tab2: "2. Mechanismen & 3 Säulen",
      tab3: "3. Die 4 Phasen (28 Tage)",
      tab4: "4. BloomLab Rezept",
      tab5: "5. Zirkadianer Rhythmus"
    }
  };

  const cur = t[lang] || t.fr;

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#f5f0e8] selection:bg-[#c9a84c]/20 selection:text-[#f5f0e8] pb-24 font-sans">
      
      {/* 1. Header / Navigation Académie */}
      <AcademyNavigation
        currentView="protocole-decalcification-pineale"
        onNavigate={onNavigate}
        currentPageTitle={cur.navTitle}
        sectionName={cur.navSection}
        lang={lang}
      />

      {/* 2. Hero Section */}
      <div className="bg-gradient-to-b from-[#161b22] via-[#0d1117] to-[#161b22] border-b border-[#30363d] pt-12 pb-14 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          
          {/* Breadcrumb pills */}
          <div className="flex flex-wrap items-center gap-2 mb-6 text-xs">
            <button
              onClick={() => onNavigate('academie')}
              className="px-2.5 py-1 rounded-md bg-white/5 hover:bg-white/10 text-[#8b949e] hover:text-[#f5f0e8] transition-colors"
            >
              Bloom Academy
            </button>
            <span className="text-[#484f58]">/</span>
            <button
              onClick={() => onNavigate('phytotherapie-reset')}
              className="px-2.5 py-1 rounded-md bg-white/5 hover:bg-white/10 text-[#8b949e] hover:text-[#f5f0e8] transition-colors"
            >
              {cur.navSection}
            </button>
            <span className="text-[#484f58]">/</span>
            <span className="px-2.5 py-1 rounded-md bg-[#c9a84c]/15 text-[#c9a84c] border border-[#c9a84c]/30 font-bold">
              {cur.navTitle}
            </span>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#161b22] border border-[#c9a84c]/30 text-[#c9a84c] text-[11px] font-bold uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#c9a84c]" />
            <span>{cur.badge}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-[1.15] mb-4">
            {cur.h1}
          </h1>

          <p className="text-lg text-[#c9a84c] font-medium mb-6">
            {cur.subtitle}
          </p>

          {/* Medical disclaimer box */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#c9a84c]/10 border border-[#c9a84c]/30 text-xs sm:text-sm text-[#e6edf3] leading-relaxed flex items-start gap-3.5 mb-8 shadow-sm">
            <Shield className="w-5 h-5 text-[#c9a84c] shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-[#c9a84c] mb-1 uppercase tracking-wider text-[11px]">
                {cur.disclaimerTitle}
              </p>
              <p className="text-[#b8b8b8] leading-relaxed">
                {cur.disclaimer}
              </p>
            </div>
          </div>

          {/* Actions toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10 text-xs text-[#8b949e]">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 text-white/90">
                <Clock className="w-3.5 h-3.5 text-[#c9a84c]" /> {cur.duration}
              </span>
              <span className="hidden sm:inline text-white/20">•</span>
              <span className="flex items-center gap-1.5 text-white/90">
                <Activity className="w-3.5 h-3.5 text-[#86efac]" /> {cur.axis}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyLink}
                className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/80 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
                title="Copier le lien direct"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{copiedLink ? cur.copied : cur.share}</span>
              </button>
              <button
                onClick={handlePrint}
                className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/80 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
                title="Imprimer le protocole"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>{cur.print}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Navigation Tabs */}
      <div className="sticky top-14 z-30 bg-[#0d1117]/95 backdrop-blur-md border-b border-[#30363d] px-4">
        <div className="max-w-4xl mx-auto flex items-center gap-2 overflow-x-auto py-2.5 scrollbar-none text-xs font-semibold">
          {[
            { id: 'avant-propos', label: cur.tab1, icon: Brain },
            { id: 'mecanismes', label: cur.tab2, icon: Layers },
            { id: 'phases', label: cur.tab3, icon: Calendar },
            { id: 'extraction', label: cur.tab4, icon: FlaskConical },
            { id: 'chronobiologie', label: cur.tab5, icon: Moon }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3.5 py-2 rounded-xl whitespace-nowrap flex items-center gap-2 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#c9a84c] text-[#0d1117] font-black shadow-md'
                    : 'bg-[#161b22] text-[#8b949e] hover:text-[#f5f0e8] hover:bg-white/5 border border-transparent'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Tab Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10">

        {/* TAB 1: AVANT-PROPOS */}
        {activeTab === 'avant-propos' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="bg-[#161b22] rounded-3xl border border-[#30363d] p-6 sm:p-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c9a84c]/15 text-[#c9a84c] text-[10px] font-bold uppercase tracking-widest mb-4">
                Origine Biologique &amp; Enjeu
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
                AVANT-PROPOS — POURQUOI DÉCALCIFIER LA GLANDE PINÉALE ?
              </h2>

              <div className="space-y-4 text-sm sm:text-base text-[#c9d1d9] leading-relaxed">
                <p>
                  La glande pinéale (ou épiphyse) est un organe de la taille d'un grain de riz, situé au centre géométrique du cerveau, entre les deux hémisphères. Véritable transducteur neuroendocrinien, elle produit la <strong className="text-[#c9a84c]">mélatonine</strong> — l'hormone maîtresse qui régule le cycle veille-sommeil, l'immunité nocturne, la détoxication glymphatique et la régénération mitochondriale.
                </p>

                <div className="p-5 rounded-2xl bg-[#0d1117] border border-[#c9a84c]/20 my-6">
                  <h3 className="text-[#c9a84c] font-bold text-base mb-2 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" /> L'ennemi silencieux : l'accumulation de fluor et de phosphates
                  </h3>
                  <p className="text-xs sm:text-sm text-[#8b949e] leading-relaxed">
                    Contrairement au reste du cerveau protégé par une barrière hémato-encéphalique très sélective, la glande pinéale possède une vascularisation profuse de second ordre. Elle accumule le <strong className="text-white">fluorure</strong> en concentrations supérieures à n'importe quel autre tissu mou du corps humain (jusqu'à 330 ppm dans certaines études minéralogiques). Cette accumulation réagit avec les ions calcium pour former des concrétions minérales d'hydroxyapatite de calcium (souvent appelées <em>corpora arenacea</em> ou « sable cérébral »).
                  </p>
                </div>

                <p>
                  Cette calcification progressive engendre un verrouillage systémique :
                </p>

                <div className="grid sm:grid-cols-2 gap-4 my-6">
                  <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-2">
                    <div className="text-xs font-bold text-[#86efac] uppercase tracking-wider flex items-center gap-1.5">
                      <Moon className="w-3.5 h-3.5" /> Érosion Circadienne
                    </div>
                    <p className="text-xs text-[#8b949e]">
                      Diminution du pic nocturne de mélatonine. Sommeil morcelé, perte du sommeil paradoxal réparateur et réveils prématurés avec épuisement résiduel.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-2">
                    <div className="text-xs font-bold text-[#93c5fd] uppercase tracking-wider flex items-center gap-1.5">
                      <Brain className="w-3.5 h-3.5" /> Brouillard Cérébral
                    </div>
                    <p className="text-xs text-[#8b949e]">
                      Diminution du lavage glymphatique nocturne. Accumulation de débris protéiques et baisse de la neuro-plasticité diurne.
                    </p>
                  </div>
                </div>

                <p>
                  Dans l'approche systémique de Bloom, <strong className="text-white">votre corps n'est pas cassé ; il est verrouillé</strong> par une surcharge minérale inorganique. Le reset pinéal ne consiste pas à « forcer » le sommeil avec des somnifères, mais à libérer mécaniquement et chimiquement l'organe pour lui restituer son autonomie sécrétoire.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-[#30363d] flex justify-end">
                <button
                  onClick={() => setActiveTab('mecanismes')}
                  className="px-5 py-2.5 rounded-xl bg-[#c9a84c] text-[#0d1117] font-bold text-xs flex items-center gap-2 hover:bg-[#d8b85c] transition-all cursor-pointer"
                >
                  <span>Voir les mécanismes &amp; 3 Piliers</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: MÉCANISMES & 3 PILIERS */}
        {activeTab === 'mecanismes' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="bg-[#161b22] rounded-3xl border border-[#30363d] p-6 sm:p-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#86efac]/15 text-[#86efac] text-[10px] font-bold uppercase tracking-widest mb-4">
                Architecture Opératoire
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                LES 3 PILIERS DU RESET PINÉAL
              </h2>
              <p className="text-sm text-[#8b949e] mb-8">
                Pour inverser l'accumulation calcique sans créer d'effet rebond ni de crise de détoxication brutale, la méthode Bloom associe trois actions coordonnées.
              </p>

              <div className="space-y-6">
                {/* Pilier 1 */}
                <div className="p-5 rounded-2xl bg-[#0d1117] border border-[#30363d] hover:border-[#c9a84c]/50 transition-colors">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="w-8 h-8 rounded-lg bg-[#c9a84c]/20 text-[#c9a84c] font-black text-sm flex items-center justify-center">
                      1
                    </span>
                    <h3 className="font-bold text-base text-white">
                      Arrêt de l'alimentation minérale xénobiotique (Éviction)
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-[#c9d1d9] leading-relaxed pl-11">
                    On ne peut pas vider une baignoire dont le robinet reste grand ouvert. L'étape initiale requiert la suppression stricte des vecteurs de fluorure : eau du robinet non filtrée (le fluorure nécessite l'osmose inverse ou la distillation), dentifrices fluorés conventionnels, revêtements antiadhésifs usés (PTFE) et thés noirs industriels bon marché à forte teneur en résidus de fluor.
                  </p>
                </div>

                {/* Pilier 2 */}
                <div className="p-5 rounded-2xl bg-[#0d1117] border border-[#30363d] hover:border-[#86efac]/50 transition-colors">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="w-8 h-8 rounded-lg bg-[#86efac]/20 text-[#86efac] font-black text-sm flex items-center justify-center">
                      2
                    </span>
                    <h3 className="font-bold text-base text-white">
                      Chélation organique &amp; Dissolution ciblée (Le Totum Chélateur)
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-[#c9d1d9] leading-relaxed pl-11 mb-3">
                    L'utilisation de ligands naturels et d'acides organiques végétaux permet de solubiliser les cristaux de phosphate de calcium sans attaquer le tissu osseux utile :
                  </p>
                  <ul className="text-xs text-[#8b949e] space-y-1.5 pl-11">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#86efac]" />
                      <span><strong className="text-white">Tamarin (Tamarindus indica)</strong> : Démontré cliniquement pour augmenter l'excrétion urinaire du fluorure.</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#86efac]" />
                      <span><strong className="text-white">Prêle des champs (Equisetum arvense)</strong> : Silicium organique hautement biodisponible qui entre en compétition avec les liaisons fluor-calcium.</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#86efac]" />
                      <span><strong className="text-white">Curcuma &amp; Gingembre</strong> : Neutralisation de la neuro-inflammation astrocytaire péri-pinéale.</span>
                    </li>
                  </ul>
                </div>

                {/* Pilier 3 */}
                <div className="p-5 rounded-2xl bg-[#0d1117] border border-[#30363d] hover:border-[#93c5fd]/50 transition-colors">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="w-8 h-8 rounded-lg bg-[#93c5fd]/20 text-[#93c5fd] font-black text-sm flex items-center justify-center">
                      3
                    </span>
                    <h3 className="font-bold text-base text-white">
                      Re-synchronisation Photonique &amp; Axe Rétino-Hypothalamique
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-[#c9d1d9] leading-relaxed pl-11">
                    La glande pinéale répond directement aux photons captés par les cellules ganglionnaires intrinsèquement photosensibles de la rétine. Le protocole couple les plantes avec une exposition lumineuse matinale (soleil direct sans lunettes de soleil 15–20 minutes) pour saturer la sérotonine, et une obscurité totale absolue dès 22h pour libérer la cascade de la mélatonine.
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-[#30363d] flex justify-between">
                <button
                  onClick={() => setActiveTab('avant-propos')}
                  className="px-4 py-2 rounded-xl bg-white/5 text-[#8b949e] font-semibold text-xs hover:bg-white/10 transition-all cursor-pointer"
                >
                  &larr; Retour à l'avant-propos
                </button>
                <button
                  onClick={() => setActiveTab('phases')}
                  className="px-5 py-2.5 rounded-xl bg-[#c9a84c] text-[#0d1117] font-bold text-xs flex items-center gap-2 hover:bg-[#d8b85c] transition-all cursor-pointer"
                >
                  <span>Découvrir le protocole 28 jours</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: LES 4 PHASES DE 28 JOURS */}
        {activeTab === 'phases' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="bg-[#161b22] rounded-3xl border border-[#30363d] p-6 sm:p-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c9a84c]/15 text-[#c9a84c] text-[10px] font-bold uppercase tracking-widest mb-4">
                Calendrier Chronobiologique
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                LA CURE EN 4 PHASES SYNCHRONISÉES (28 JOURS)
              </h2>
              <p className="text-sm text-[#8b949e] mb-8">
                Chaque semaine active un étage physiologique spécifique afin de respecter l'énergie vitale et les capacités émonctorielles de l'organisme.
              </p>

              <div className="space-y-6">
                
                {/* Semaine 1 */}
                <div className="p-6 rounded-2xl bg-[#0d1117] border border-[#30363d] relative overflow-hidden">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-black uppercase text-[#86efac] tracking-widest bg-[#86efac]/10 px-3 py-1 rounded-full">
                      Semaine 1 (Jours 1 à 7)
                    </span>
                    <span className="text-xs text-[#8b949e] font-mono">Préparation Émonctorielle</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    Phase 1 : Ouverture des Voies Rénales &amp; Neutralisation
                  </h3>
                  <p className="text-xs sm:text-sm text-[#b8b8b8] leading-relaxed mb-4">
                    On ne mobilise aucun composé minéral sans avoir garanti la perméabilité rénale. Éviction totale des eaux fluorées. Hydratation avec une eau pure à résidu sec &lt; 50 mg/L.
                  </p>
                  <div className="bg-white/5 rounded-xl p-3.5 text-xs text-[#c9d1d9] space-y-1">
                    <p><strong className="text-[#86efac]">Plantes actives :</strong> Racine de Pissenlit (Taraxacum) + Aubier de Tilleul en décoction douce.</p>
                    <p><strong className="text-[#86efac]">Pratique clé :</strong> 1 verre d'eau tiède citronnée le matin au saut du lit pour stimuler la diurèse.</p>
                  </div>
                </div>

                {/* Semaine 2 */}
                <div className="p-6 rounded-2xl bg-[#0d1117] border border-[#c9a84c]/40 relative overflow-hidden">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-black uppercase text-[#c9a84c] tracking-widest bg-[#c9a84c]/10 px-3 py-1 rounded-full">
                      Semaine 2 (Jours 8 à 14)
                    </span>
                    <span className="text-xs text-[#c9a84c] font-mono">Chélation Spécifique</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    Phase 2 : Chélation au Tamarin &amp; Délogement Minéral
                  </h3>
                  <p className="text-xs sm:text-sm text-[#b8b8b8] leading-relaxed mb-4">
                    Introduction de l'extrait de Tamarin concentré. Les acides organiques naturels pénètrent dans la circulation centrale et mobilisent le fluorure vers les urines.
                  </p>
                  <div className="bg-white/5 rounded-xl p-3.5 text-xs text-[#c9d1d9] space-y-1">
                    <p><strong className="text-[#c9a84c]">Plantes actives :</strong> Pulpe de Tamarin (Tamarindus indica) + Chlorelle pyrenoidosa (adsorbant digestif).</p>
                    <p><strong className="text-[#c9a84c]">Posologie :</strong> 1 dose d'extrait BloomLab matin et fin d'après-midi.</p>
                  </div>
                </div>

                {/* Semaine 3 */}
                <div className="p-6 rounded-2xl bg-[#0d1117] border border-[#30363d] relative overflow-hidden">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-black uppercase text-[#93c5fd] tracking-widest bg-[#93c5fd]/10 px-3 py-1 rounded-full">
                      Semaine 3 (Jours 15 à 21)
                    </span>
                    <span className="text-xs text-[#93c5fd] font-mono">Reminéralisation Organique</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    Phase 3 : Substitution par la Silice &amp; Iode Natif
                  </h3>
                  <p className="text-xs sm:text-sm text-[#b8b8b8] leading-relaxed mb-4">
                    Une fois le fluorure délogé, la matrice doit recevoir des minéraux biologiques nobles (silicium végétal et iode naturel) pour stabiliser la membrane pinéalocytaire.
                  </p>
                  <div className="bg-white/5 rounded-xl p-3.5 text-xs text-[#c9d1d9] space-y-1">
                    <p><strong className="text-[#93c5fd]">Plantes actives :</strong> Prêle des champs (extrait aqueux concentré) + Laminaire / Kelp micro-dosé.</p>
                    <p><strong className="text-[#93c5fd]">Effet recherché :</strong> Consolidation de l'élasticité micro-vasculaire cérébrale.</p>
                  </div>
                </div>

                {/* Semaine 4 */}
                <div className="p-6 rounded-2xl bg-[#0d1117] border border-[#30363d] relative overflow-hidden">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-black uppercase text-[#d8b85c] tracking-widest bg-[#d8b85c]/10 px-3 py-1 rounded-full">
                      Semaine 4 (Jours 22 à 28)
                    </span>
                    <span className="text-xs text-[#d8b85c] font-mono">Ancrage Circadien</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    Phase 4 : Réveil Mélatoninergique &amp; Neuro-Protection
                  </h3>
                  <p className="text-xs sm:text-sm text-[#b8b8b8] leading-relaxed mb-4">
                    La glande pinéale réactivée reprend sa pulsation endogène. Intégration de plantes adaptogènes et calmantes pour consolider le cycle nocturne profond.
                  </p>
                  <div className="bg-white/5 rounded-xl p-3.5 text-xs text-[#c9d1d9] space-y-1">
                    <p><strong className="text-[#d8b85c]">Plantes actives :</strong> Passiflore, Bacopa monnieri, extrait de Cerise de Montmorency (mélatonine végétale native).</p>
                    <p><strong className="text-[#d8b85c]">Résultat attendu :</strong> Allongement des phases de sommeil réparateur, clarté mentale matinale nette.</p>
                  </div>
                </div>

              </div>

              <div className="mt-8 pt-6 border-t border-[#30363d] flex justify-between">
                <button
                  onClick={() => setActiveTab('mecanismes')}
                  className="px-4 py-2 rounded-xl bg-white/5 text-[#8b949e] font-semibold text-xs hover:bg-white/10 transition-all cursor-pointer"
                >
                  &larr; Revoir les 3 Piliers
                </button>
                <button
                  onClick={() => setActiveTab('extraction')}
                  className="px-5 py-2.5 rounded-xl bg-[#c9a84c] text-[#0d1117] font-bold text-xs flex items-center gap-2 hover:bg-[#d8b85c] transition-all cursor-pointer"
                >
                  <span>Voir la recette d'extraction BloomLab</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: RECETTE BLOOMLAB */}
        {activeTab === 'extraction' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="bg-[#161b22] rounded-3xl border-2 border-[#c9a84c]/50 p-6 sm:p-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c9a84c]/15 text-[#c9a84c] text-[10px] font-bold uppercase tracking-widest mb-4">
                Protocole Machine Officiel
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                ÉLIXIR PINÉAL SYSTÉMIQUE — EXTRACTION A/B BLOOMLAB
              </h2>
              <p className="text-sm text-[#8b949e] mb-6">
                Formule bi-phase spécifique pour extraire simultanément les acides organiques hydrophiles du Tamarin et les principes lipophiles neuro-protecteurs du Curcuma.
              </p>

              {/* Table of Active ingredients */}
              <div className="bg-[#0d1117] rounded-2xl border border-[#30363d] p-5 mb-8">
                <h3 className="text-xs font-bold uppercase tracking-widest text-[#c9a84c] mb-4">
                  Les Actifs Majeurs de l'Élixir
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-[#30363d] text-[#8b949e]">
                        <th className="pb-2">Plante &amp; Partie</th>
                        <th className="pb-2">Rôle Systémique</th>
                        <th className="pb-2">Principe Actif</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#30363d] text-[#c9d1d9]">
                      <tr>
                        <td className="py-2.5 font-bold text-white">Tamarin (pulpe séchée)</td>
                        <td className="py-2.5">Chélation &amp; mobilisation du fluorure</td>
                        <td className="py-2.5 text-[#86efac]">Acides tartrique, malique &amp; pectines</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 font-bold text-white">Prêle des champs (sommités)</td>
                        <td className="py-2.5">Reminéralisation &amp; échange d'ions</td>
                        <td className="py-2.5 text-[#93c5fd]">Silice colloïdale soluble</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 font-bold text-white">Curcuma (rhizome concassé)</td>
                        <td className="py-2.5">Neuro-protection astrocyte / pinéalocyte</td>
                        <td className="py-2.5 text-[#c9a84c]">Curcuminoïdes &amp; turmérones</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 font-bold text-white">Gingembre bio (rhizome)</td>
                        <td className="py-2.5">Amplificateur de diffusion &amp; thermogenèse</td>
                        <td className="py-2.5 text-[#d8b85c]">Gingérols &amp; shogaols</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Phase A & Phase B Boxes */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {/* Phase A */}
                <div className="bg-[#0d1117] rounded-2xl border border-[#30363d] p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#86efac] uppercase tracking-wider">
                      Phase A — Extraction Aqueuse
                    </span>
                    <span className="text-[10px] bg-[#86efac]/10 text-[#86efac] px-2 py-0.5 rounded font-mono">
                      600 ml
                    </span>
                  </div>
                  <ul className="text-xs text-[#8b949e] space-y-1">
                    <li>• Pulpe de Tamarin concassée : <strong>40 g</strong></li>
                    <li>• Prêle des champs séchée : <strong>20 g</strong></li>
                    <li>• Eau distillée ou osmosée extra pure : <strong>500 ml</strong></li>
                    <li>• Glycérine végétale bio : <strong>100 ml</strong></li>
                  </ul>
                  <div className="pt-2 border-t border-white/5 text-[11px] text-[#c9d1d9] space-y-0.5">
                    <p><strong>Température BloomLab :</strong> 45°C</p>
                    <p><strong>Durée :</strong> 2 heures (Agitation cyclique douce)</p>
                    <p className="text-[#86efac]">Rendement : ~550 ml d'extrait aqueux riche en acides organiques.</p>
                  </div>
                </div>

                {/* Phase B */}
                <div className="bg-[#0d1117] rounded-2xl border border-[#30363d] p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#c9a84c] uppercase tracking-wider">
                      Phase B — Extraction Hydroalcoolique
                    </span>
                    <span className="text-[10px] bg-[#c9a84c]/10 text-[#c9a84c] px-2 py-0.5 rounded font-mono">
                      600 ml
                    </span>
                  </div>
                  <ul className="text-xs text-[#8b949e] space-y-1">
                    <li>• Rhizome de Curcuma bio concassé : <strong>30 g</strong></li>
                    <li>• Rhizome de Gingembre frais haché : <strong>15 g</strong></li>
                    <li>• Alcool de grain ou vinique bio à 50° : <strong>600 ml</strong></li>
                    <li><em>(Préparation 50° : 312 ml alcool 96% + 288 ml eau pure)</em></li>
                  </ul>
                  <div className="pt-2 border-t border-white/5 text-[11px] text-[#c9d1d9] space-y-0.5">
                    <p><strong>Température BloomLab :</strong> 50°C</p>
                    <p><strong>Durée :</strong> 3 heures (Agitation régulière continue)</p>
                    <p className="text-[#c9a84c]">Rendement : ~540 ml d'extrait concentré doré.</p>
                  </div>
                </div>
              </div>

              {/* Instructions pas à pas */}
              <div className="bg-[#0d1117] rounded-2xl border border-[#30363d] p-5 mb-8 space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-widest text-white mb-2">
                  Assemblage &amp; Posologie Pratique
                </h3>
                <ol className="text-xs text-[#c9d1d9] space-y-2 list-decimal list-inside leading-relaxed">
                  <li>Filtrez séparément les phases A et B avec le filtre micronique BloomLab.</li>
                  <li>Mélangez 300 ml de Phase A et 300 ml de Phase B dans un flacon en verre ambré de 600 ml ou 1 L.</li>
                  <li>Laissez reposer 24h au frais avant la première prise. Le titre alcoolique final est d'environ 25°, assurant une conservation parfaite de 6 mois à température ambiante.</li>
                  <li><strong>Posologie de la cure :</strong> 1 cuillère à café (5 ml) diluée dans un petit verre d'eau tiède le matin à jeun, et 1 cuillère à café le soir 1h avant le coucher.</li>
                </ol>
              </div>

              <div className="mt-8 pt-6 border-t border-[#30363d] flex justify-between">
                <button
                  onClick={() => setActiveTab('phases')}
                  className="px-4 py-2 rounded-xl bg-white/5 text-[#8b949e] font-semibold text-xs hover:bg-white/10 transition-all cursor-pointer"
                >
                  &larr; Revoir les phases
                </button>
                <button
                  onClick={() => setActiveTab('chronobiologie')}
                  className="px-5 py-2.5 rounded-xl bg-[#c9a84c] text-[#0d1117] font-bold text-xs flex items-center gap-2 hover:bg-[#d8b85c] transition-all cursor-pointer"
                >
                  <span>Règles Circadiennes &amp; Sommeil</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: CHRONOBIOLOGIE & HYGIÈNE CIRCADIENNE */}
        {activeTab === 'chronobiologie' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="bg-[#161b22] rounded-3xl border border-[#30363d] p-6 sm:p-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#93c5fd]/15 text-[#93c5fd] text-[10px] font-bold uppercase tracking-widest mb-4">
                Biorythme &amp; Environnement
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                LES RÈGLES D'OR DE LA LIBÉRATION PHOTONIQUE
              </h2>
              <p className="text-sm text-[#8b949e] mb-8">
                Les plantes nettoient le terrain biologique, mais seule la lumière ordonne l'activation physiologique de la glande pinéale.
              </p>

              <div className="grid sm:grid-cols-2 gap-6 mb-8">
                
                {/* Matin */}
                <div className="p-5 rounded-2xl bg-[#0d1117] border border-[#30363d] space-y-3">
                  <div className="flex items-center gap-2.5 text-[#fbbf24] font-bold text-sm">
                    <Sun className="w-4 h-4" />
                    <span>Matin : Charge Sérotoninergique</span>
                  </div>
                  <ul className="text-xs text-[#c9d1d9] space-y-2 leading-relaxed">
                    <li>• <strong>Exposition au soleil direct :</strong> Dans les 30 minutes suivant le lever, exposez vos yeux (sans lunettes de soleil ni vitres) à la lumière naturelle pendant 10 à 20 minutes.</li>
                    <li>• <strong>Signal circadien :</strong> Ce flux de 10 000+ lux stoppe immédiatement la mélatonine résiduelle et lance l'horloge biologique centrale du noyau suprachiasmatique.</li>
                    <li>• <strong>Hydratation chaude :</strong> Eau pure tiède pour activer le péristaltisme et l'évacuation des métabolites nocturnes.</li>
                  </ul>
                </div>

                {/* Soir */}
                <div className="p-5 rounded-2xl bg-[#0d1117] border border-[#30363d] space-y-3">
                  <div className="flex items-center gap-2.5 text-[#818cf8] font-bold text-sm">
                    <Moon className="w-4 h-4" />
                    <span>Soir : Sanctuaire Obscur</span>
                  </div>
                  <ul className="text-xs text-[#c9d1d9] space-y-2 leading-relaxed">
                    <li>• <strong>Coupe des spectres bleus :</strong> Dès 20h30, tamisez les éclairages et activez les filtres rouge/orange sur tous les écrans (ou portez des lunettes bloquant la lumière bleue).</li>
                    <li>• <strong>Obscurité absolue :</strong> La moindre diode électroluminescente (LED de veille) perçue à travers les paupières peut inhiber jusqu'à 50% de la production pinéale nocturne.</li>
                    <li>• <strong>Température de chambre :</strong> 17–19°C. La synthèse de mélatonine s'accompagne d'une baisse thermique corporelle indispensable au sommeil profond.</li>
                  </ul>
                </div>

              </div>

              {/* Synthèse finale */}
              <div className="p-6 rounded-2xl bg-[#c9a84c]/10 border border-[#c9a84c]/30 text-xs sm:text-sm text-[#e6edf3] leading-relaxed mb-6">
                <h3 className="font-bold text-[#c9a84c] mb-2 uppercase tracking-wide text-xs">
                  Synthèse de la démarche Bloom
                </h3>
                <p>
                  En alliant l'éviction stricte du fluorure, la chélation sélective par les extraits concentrés de Tamarin et de Prêle réalisés avec l'extracteur BloomLab®, et l'alignement rigoureux des rythmes circadiens, vous permettez à votre pharmacie intérieure de restaurer son chef d'orchestre biologique le plus précieux : l'épiphyse.
                </p>
              </div>

              <div className="pt-6 border-t border-[#30363d] flex flex-wrap items-center justify-between gap-4">
                <button
                  onClick={() => onNavigate('phytotherapie-reset')}
                  className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold text-xs transition-all cursor-pointer"
                >
                  &larr; Retour au Reset Homéostasique
                </button>

                <button
                  onClick={() => onNavigate('product-detail', 'bloomlab')}
                  className="px-6 py-2.5 rounded-xl bg-[#c9a84c] hover:bg-[#d8b85c] text-[#0d1117] font-bold text-xs flex items-center gap-2 transition-all cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Découvrir l'Extracteur BloomLab®</span>
                </button>
              </div>
            </div>
          </div>
        )}

      </main>

    </div>
  );
}
