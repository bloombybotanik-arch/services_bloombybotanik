import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  ShieldCheck, 
  Brain, 
  ArrowRight, 
  Lock, 
  CheckCircle2, 
  Sparkles, 
  Droplets, 
  Clock, 
  Thermometer, 
  FileText, 
  Star, 
  Info,
  Calendar,
  Layers,
  Flame,
  KeyRound,
  ExternalLink
} from 'lucide-react';
import { View } from './types';
import { Language } from './translations';
import AcademyNavigation from './components/AcademyNavigation';

interface ProtocolesSystemiquesContentProps {
  onNavigate: (view: View, param?: string) => void;
  lang?: Language;
  isPremium?: boolean;
  onRequireAuth?: () => void;
}

export default function ProtocolesSystemiquesContent({
  onNavigate,
  lang = 'fr',
  isPremium = false,
  onRequireAuth
}: ProtocolesSystemiquesContentProps) {
  const [hasAccess, setHasAccess] = useState<boolean>(() => {
    if (isPremium) return true;
    if (typeof window !== 'undefined') {
      return localStorage.getItem('bloom_subscriber') === 'true' || localStorage.getItem('bloom_access') === 'true';
    }
    return false;
  });

  const [unlockCode, setUnlockCode] = useState('');
  const [unlockError, setUnlockError] = useState('');
  const [showCodeInput, setShowCodeInput] = useState(false);

  useEffect(() => {
    const title = lang === 'fr'
      ? "Protocoles Systémiques | Psoriasis, SIBO & Clarté Mentale | Bloom Académie"
      : lang === 'de'
      ? "Systemische Protokolle | Psoriasis, SIBO & Mentale Klarheit | Bloom Akademie"
      : "Systemic Protocols | Psoriasis, SIBO & Mental Clarity | Bloom Academy";
    document.title = title;

    if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
      (window as any).gtag('event', 'page_view_protocoles_systemiques', {
        page_title: 'Protocoles Systémiques',
        page_location: window.location.href
      });
    }
  }, [lang]);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = unlockCode.trim().toUpperCase();
    if (['BLOOMVIP', 'BLOOM2026', 'ABONNE', 'PREMIUM', 'ACADEMY', 'BOTANIK'].includes(clean)) {
      if (typeof window !== 'undefined') {
        localStorage.setItem('bloom_subscriber', 'true');
      }
      setHasAccess(true);
      setUnlockError('');
      setShowCodeInput(false);
    } else {
      setUnlockError(
        lang === 'fr' 
          ? 'Code invalide ou abonnement non trouvé.' 
          : lang === 'de' 
          ? 'Ungültiger Code oder Abonnement nicht gefunden.' 
          : 'Invalid code or subscription not found.'
      );
    }
  };

  const handleOpenProtocol = (targetView: View) => {
    if (hasAccess) {
      onNavigate(targetView);
    } else {
      onNavigate('abonnement');
    }
  };

  return (
    <div 
      className="min-h-screen bg-[#0d1117] text-[#c9d1d9] font-sans selection:bg-[#c9a84c]/30 selection:text-white pb-24"
      data-bloom-academie="true"
    >
      {/* 1. Header & Secondary Navigation */}
      <AcademyNavigation
        currentView="protocoles"
        onNavigate={onNavigate}
        currentPageTitle={lang === 'fr' ? 'Protocoles Systémiques' : lang === 'de' ? 'Systemische Protokolle' : 'Systemic Protocols'}
        sectionName={lang === 'fr' ? 'Approche Thérapeutique Documentée' : lang === 'de' ? 'Dokumentierte Therapeutische Ansätze' : 'Documented Therapeutic Approaches'}
        lang={lang}
      />

      {/* 2. Hero Section */}
      <header className="relative border-b border-[#30363d] bg-gradient-to-b from-[#161b22] via-[#0d1117] to-[#161b22] pt-14 pb-16 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#c9a84c]/10 border border-[#c9a84c]/30 text-[#c9a84c] text-xs font-bold uppercase tracking-widest shadow-sm">
            <ShieldCheck className="w-4 h-4 text-[#c9a84c]" />
            <span>
              {lang === 'fr' ? 'Phytothérapie Intégrale & Régulation de Terrain' : lang === 'de' ? 'Integrale Phytotherapie & Terrain-Regulation' : 'Integral Phytotherapy & Terrain Regulation'}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-[#f5f0e8] tracking-tight leading-[1.1]">
            {lang === 'fr' ? 'Protocoles Systémiques de Terrain' : lang === 'de' ? 'Systemische Terrain-Protokolle' : 'Systemic Terrain Protocols'}
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-[#b8b8b8] max-w-3xl mx-auto font-normal leading-relaxed">
            {lang === 'fr'
              ? "Trois approches phytothérapeutiques de haute précision élaborées pour lever les verrous physiologiques profonds, désengorger les voies d'élimination et accompagner la régénération cellulaire sans isoler le symptôme."
              : lang === 'de'
              ? "Drei hochpräzise phytotherapeutische Ansätze zur Lösung tiefer physiologischer Blockaden, Entlastung der Ausscheidungsorgane und Unterstützung der Zellregeneration."
              : "Three high-precision phytotherapeutic approaches designed to unlock deep physiological barriers, clear elimination pathways, and support cellular regeneration without isolating symptoms."}
          </p>

          {/* Quick Shortcuts */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <a 
              href="#psoriasis"
              className="px-4 py-2 rounded-xl bg-[#161b22] hover:bg-[#21262d] border border-[#30363d] hover:border-[#c9a84c] text-xs font-bold text-white transition-all flex items-center gap-2"
            >
              <Activity className="w-3.5 h-3.5 text-[#c9a84c]" />
              <span>Protocole Psoriasis</span>
            </a>
            <a 
              href="#sibo"
              className="px-4 py-2 rounded-xl bg-[#161b22] hover:bg-[#21262d] border border-[#30363d] hover:border-[#86efac] text-xs font-bold text-white transition-all flex items-center gap-2"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#86efac]" />
              <span>Protocole SIBO</span>
            </a>
            <a 
              href="#myeline"
              className="px-4 py-2 rounded-xl bg-[#161b22] hover:bg-[#21262d] border border-[#30363d] hover:border-[#93c5fd] text-xs font-bold text-white transition-all flex items-center gap-2"
            >
              <Brain className="w-3.5 h-3.5 text-[#93c5fd]" />
              <span>Protocole Clarté Mentale</span>
            </a>
          </div>
        </div>
      </header>

      {/* 3. Main Body */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-12 space-y-16">

        {/* Access Banner (VIP / Code) */}
        {!hasAccess ? (
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#1c180e] via-[#261f0d] to-[#1c180e] border-2 border-[#D97706]/50 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#D97706]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D97706]/20 border border-[#D97706]/40 text-[#D97706] text-[10px] font-bold uppercase tracking-wider">
                  <Lock className="w-3.5 h-3.5" />
                  <span>{lang === 'fr' ? 'Accès Membres Bloom Academy' : lang === 'de' ? 'Bloom Academy Mitglieder-Zugang' : 'Bloom Academy Member Access'}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  {lang === 'fr' 
                    ? 'Débloquez l’accès exhaustif aux 3 Protocoles Systémiques' 
                    : lang === 'de' 
                    ? 'Schalten Sie den vollständigen Zugriff auf alle 3 Protokolle frei' 
                    : 'Unlock full access to all 3 Systemic Protocols'}
                </h3>
                <p className="text-xs sm:text-sm text-[#E5D7B7] leading-relaxed">
                  {lang === 'fr'
                    ? 'Les fiches complètes avec séquençage hebdomadaire, cinétiques de macération assistée BloomLab®, dosages émonctoriels et carnets de suivi sont réservées aux abonnés.'
                    : lang === 'de'
                    ? 'Die vollständigen Dossiers mit wöchentlicher Sequenzierung, BloomLab® Extraktionskinetik und Dosierungen sind für Abonnenten reserviert.'
                    : 'Full dossiers including weekly sequencing, BloomLab® extraction kinetics, and dosage charts are reserved for digital subscribers.'}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
                <button
                  onClick={() => onNavigate('abonnement')}
                  className="px-6 py-3.5 rounded-xl bg-[#D97706] hover:bg-[#b45309] text-white font-black text-xs uppercase tracking-wider transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Star className="w-4 h-4 fill-current" />
                  <span>{lang === 'fr' ? 'Découvrir les Abonnements (dès 7,90 €)' : lang === 'de' ? 'Abonnements ansehen' : 'View Subscriptions'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowCodeInput(!showCodeInput)}
                  className="px-4 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs uppercase tracking-wider transition-all border border-white/20 text-center cursor-pointer"
                >
                  {lang === 'fr' ? 'J’ai un code' : lang === 'de' ? 'Ich habe einen Code' : 'I have a code'}
                </button>
              </div>
            </div>

            {showCodeInput && (
              <form onSubmit={handleUnlock} className="mt-5 pt-4 border-t border-[#D97706]/30 flex flex-wrap items-center gap-3">
                <input
                  type="text"
                  value={unlockCode}
                  onChange={(e) => setUnlockCode(e.target.value)}
                  placeholder={lang === 'fr' ? 'Entrez votre code d’accès (ex: BLOOMVIP)' : lang === 'de' ? 'Zugangscode eingeben' : 'Enter access code'}
                  className="px-4 py-2 rounded-lg bg-[#0d1117] border border-[#D97706]/40 text-white text-xs uppercase tracking-wider focus:outline-none focus:border-[#D97706] min-w-[240px]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-[#D97706] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#b45309] transition-all cursor-pointer"
                >
                  {lang === 'fr' ? 'Débloquer' : lang === 'de' ? 'Freischalten' : 'Unlock'}
                </button>
                {unlockError && <span className="text-xs text-rose-400 font-medium">{unlockError}</span>}
              </form>
            )}
          </div>
        ) : (
          <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>
                {lang === 'fr'
                  ? '✓ Accès Abonné Actif — Vous bénéficiez d’un accès illimité aux 3 protocoles thérapeutiques détaillés et aux paramètres d’extraction.'
                  : lang === 'de'
                  ? '✓ Aktiver Abonnentenzugang — Sie haben unbegrenzten Zugriff auf alle 3 detaillierten Protokolle.'
                  : '✓ Active Subscriber Access — You have full access to all 3 detailed therapeutic protocols.'}
              </span>
            </div>
            <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
              VIP
            </span>
          </div>
        )}

        {/* Foundational Pivot: Le Reset Homéostasique */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#161b22] border border-[#30363d] relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="text-[10px] font-black uppercase tracking-[0.25em] text-[#D97706] font-mono">
                {lang === 'fr' ? 'Méthodologie Pivot' : lang === 'de' ? 'Zentrale Methodik' : 'Core Methodology'}
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                {lang === 'fr' ? 'La règle d’or : Le Reset Homéostasique d’abord' : lang === 'de' ? 'Die goldene Regel: Der Homöostatische Reset zuerst' : 'The Golden Rule: Homeostatic Reset First'}
              </h2>
              <p className="text-xs sm:text-sm text-[#b8b8b8] leading-relaxed">
                {lang === 'fr'
                  ? "On ne draine jamais un organe en souffrance sans avoir d'abord libéré les 5 portes de sortie (foie, reins, intestins, peau, poumons). Chaque protocole ciblé ci-dessous s'inscrit dans cette vision systémique : désencombrer, réguler, puis régénérer."
                  : lang === 'de'
                  ? "Ein belastetes Organ wird niemals ausgeleitet, ohne zuvor die fünf Ausscheidungsorgane zu öffnen. Jedes der folgenden Protokolle folgt dieser systemischen Logik."
                  : "Never drain a strained organ without first clearing the 5 elimination emunctories. Each targeted protocol below builds on this systemic progression: unburden, regulate, and regenerate."}
              </p>
            </div>
            <button
              onClick={() => onNavigate('phytotherapie-reset')}
              className="px-5 py-3 rounded-xl bg-[#0d1117] hover:bg-[#21262d] border border-[#30363d] hover:border-[#D97706] text-white text-xs font-bold transition-all flex items-center gap-2 shrink-0 cursor-pointer"
            >
              <span>{lang === 'fr' ? 'Comprendre la démarche Reset' : lang === 'de' ? 'Den Reset-Ansatz verstehen' : 'Explore Reset Methodology'}</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#D97706]" />
            </button>
          </div>
        </div>

        {/* ======================================================== */}
        {/* PROTOCOLE 1: PSORIASIS */}
        {/* ======================================================== */}
        <section id="psoriasis" className="scroll-mt-24 space-y-6">
          <div className="p-6 sm:p-10 rounded-3xl bg-[#161b22] border-2 border-[#c9a84c]/40 hover:border-[#c9a84c] transition-all relative overflow-hidden shadow-xl">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[#c9a84c]/20 text-[#c9a84c] flex items-center justify-center shrink-0 shadow-inner">
                  <Activity className="w-7 h-7" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#c9a84c] bg-[#c9a84c]/10 px-2.5 py-0.5 rounded-full border border-[#c9a84c]/30 font-bold">
                      Protocole Clinique Documenté
                    </span>
                    <span className="text-[10px] font-mono text-white/60">
                      14 Semaines • Double Solvant
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-white">
                    Protocole Psoriasis
                  </h2>
                  <p className="text-xs sm:text-sm text-[#c9a84c] font-semibold">
                    Désengorgement hépato-biliaire, perméabilité intestinale et modulation de l'axe Th17/IL-23
                  </p>
                </div>
              </div>

              <div className="shrink-0 flex items-center gap-3">
                <button
                  onClick={() => handleOpenProtocol('protocole-psoriasis')}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#c9a84c] hover:bg-[#d8b85c] text-[#0d1117] font-black text-xs uppercase tracking-wider transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 cursor-pointer"
                >
                  {!hasAccess && <Lock className="w-3.5 h-3.5 text-[#0d1117]" />}
                  <span>{lang === 'fr' ? 'Accéder au protocole détaillé' : lang === 'de' ? 'Zum detaillierten Protokoll' : 'Access detailed protocol'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <p className="text-sm text-[#c9d1d9] leading-relaxed mb-8">
              Le psoriasis n'est pas une simple anomalie cutanée : la peau sert d'émonctoire vicariant lorsque le foie et l'intestin sont saturés. Ce protocole agit en amont en réduisant l'emballement cytokinique (IL-17, IL-23), en restaurant la barrière intestinale et en drainant les émonctoires profonds sans agresser l'épiderme.
            </p>

            {/* Phases Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="p-4 rounded-2xl bg-[#0d1117] border border-[#30363d] space-y-2">
                <div className="text-[10px] font-mono text-[#c9a84c] uppercase font-bold">Semaines 1–2</div>
                <div className="text-xs font-bold text-white">Phase 0 : Ouverture Émonctorielle</div>
                <p className="text-[11px] text-[#8b949e] leading-relaxed">
                  Drainage rénal et cutané doux pour ouvrir les voies de délestage sans déclencher d'effet rebond inflammatoire.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#0d1117] border border-[#30363d] space-y-2">
                <div className="text-[10px] font-mono text-[#c9a84c] uppercase font-bold">Semaines 3–6</div>
                <div className="text-xs font-bold text-white">Phase 1 : Désengorgement Hépatique</div>
                <p className="text-[11px] text-[#8b949e] leading-relaxed">
                  Relance de la cholérèse, stimulation des cytochromes P450 et diminution de la translocation bactérienne (LPS).
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#0d1117] border border-[#30363d] space-y-2">
                <div className="text-[10px] font-mono text-[#c9a84c] uppercase font-bold">Semaines 7–10</div>
                <div className="text-xs font-bold text-white">Phase 2 : Modulation Cytokinique</div>
                <p className="text-[11px] text-[#8b949e] leading-relaxed">
                  Apaisement de la prolifération des kératinocytes et régulation des lymphocytes Th17 par synergie botanique polyphénolique.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#0d1117] border border-[#30363d] space-y-2">
                <div className="text-[10px] font-mono text-[#c9a84c] uppercase font-bold">Semaines 11–14</div>
                <div className="text-xs font-bold text-white">Phase 3 : Consolidation Épithéliale</div>
                <p className="text-[11px] text-[#8b949e] leading-relaxed">
                  Régénération de la gaine cornée, relance des céramides endogènes et stabilisation de l'homéostasie cutanée.
                </p>
              </div>
            </div>

            {/* Extraction & Botanicals Highlights */}
            <div className="p-5 rounded-2xl bg-[#0d1117]/80 border border-[#30363d] flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs font-mono">
              <div className="space-y-1">
                <span className="text-[#c9a84c] font-bold">Synergie Botanique Clé :</span>
                <p className="text-[#8b949e]">
                  Bardane (*Arctium lappa*), Pensée sauvage (*Viola tricolor*), Fumeterre (*Fumaria officinalis*), Huile de Bourrache &amp; Nigelle.
                </p>
              </div>
              <div className="space-y-1 md:text-right shrink-0">
                <span className="text-[#c9a84c] font-bold">Extraction BloomLab® :</span>
                <p className="text-[#8b949e]">
                  Double Solvant (Phase A : 58°C thermo-régulée • Phase B : Macération lipidique à froid).
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* PROTOCOLE 2: SIBO */}
        {/* ======================================================== */}
        <section id="sibo" className="scroll-mt-24 space-y-6">
          <div className="p-6 sm:p-10 rounded-3xl bg-[#161b22] border-2 border-[#86efac]/40 hover:border-[#86efac] transition-all relative overflow-hidden shadow-xl">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[#86efac]/20 text-[#86efac] flex items-center justify-center shrink-0 shadow-inner">
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#86efac] bg-[#86efac]/10 px-2.5 py-0.5 rounded-full border border-[#86efac]/30 font-bold">
                      Protocole Gastro-Intestinal
                    </span>
                    <span className="text-[10px] font-mono text-white/60">
                      3 Phases Chronobiologiques
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-white">
                    Protocole SIBO
                  </h2>
                  <p className="text-xs sm:text-sm text-[#86efac] font-semibold">
                    Pullulation bactérienne du grêle, relance du Complexe Moteur Migrant (CMM) et étanchéité muqueuse
                  </p>
                </div>
              </div>

              <div className="shrink-0 flex items-center gap-3">
                <button
                  onClick={() => handleOpenProtocol('protocole-sibo')}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#86efac] hover:bg-[#6ee7b7] text-[#0d1117] font-black text-xs uppercase tracking-wider transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 cursor-pointer"
                >
                  {!hasAccess && <Lock className="w-3.5 h-3.5 text-[#0d1117]" />}
                  <span>{lang === 'fr' ? 'Accéder au protocole détaillé' : lang === 'de' ? 'Zum detaillierten Protokoll' : 'Access detailed protocol'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <p className="text-sm text-[#c9d1d9] leading-relaxed mb-8">
              Le SIBO (*Small Intestinal Bacterial Overgrowth*) résulte d'une panne du balai mécanique de l'intestin (le complexe moteur migrant), permettant aux bactéries coliques de refluer dans le grêle. Ce protocole ne détruit pas le microbiote : il assainit en douceur, relance la motilité gastrique et répare le mucus de protection sans gaz rebond.
            </p>

            {/* Phases Grid */}
            <div className="grid sm:grid-cols-3 gap-4 mb-8">
              <div className="p-4 rounded-2xl bg-[#0d1117] border border-[#30363d] space-y-2">
                <div className="text-[10px] font-mono text-[#86efac] uppercase font-bold">Phase 1 • 3 à 4 Semaines</div>
                <div className="text-xs font-bold text-white">Assainissement Antimicrobien Doux</div>
                <p className="text-[11px] text-[#8b949e] leading-relaxed">
                  Inhibition ciblée des colonies bactériennes déplacées du grêle sans destruction de la flore commensale saine.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#0d1117] border border-[#30363d] space-y-2">
                <div className="text-[10px] font-mono text-[#86efac] uppercase font-bold">Phase 2 • 4 Semaines</div>
                <div className="text-xs font-bold text-white">Relance Procinétique &amp; CMM</div>
                <p className="text-[11px] text-[#8b949e] leading-relaxed">
                  Stimulation des ondes péristaltiques interdigestives nocturnes via les principes amers et les gingérols actifs.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#0d1117] border border-[#30363d] space-y-2">
                <div className="text-[10px] font-mono text-[#86efac] uppercase font-bold">Phase 3 • 4 Semaines</div>
                <div className="text-xs font-bold text-white">Restauration du Mucus &amp; Jonctions</div>
                <p className="text-[11px] text-[#8b949e] leading-relaxed">
                  Régénération du biofilm protecteur et resserrement des jonctions occludines/zonulines de la barrière grêle.
                </p>
              </div>
            </div>

            {/* Extraction & Botanicals Highlights */}
            <div className="p-5 rounded-2xl bg-[#0d1117]/80 border border-[#30363d] flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs font-mono">
              <div className="space-y-1">
                <span className="text-[#86efac] font-bold">Synergie Botanique Clé :</span>
                <p className="text-[#8b949e]">
                  Gingembre bio (*Zingiber officinale* - gingérols), Gentiane jaune (*Gentiana lutea* - amarogentine), Épine-vinette (*Berberis*), Orme rouge.
                </p>
              </div>
              <div className="space-y-1 md:text-right shrink-0">
                <span className="text-[#86efac] font-bold">Extraction BloomLab® :</span>
                <p className="text-[#8b949e]">
                  Vortex cinétique à 58°C sous enceinte close (préservation des principes volatils sans amertume destructive).
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* PROTOCOLE 3: CLARTÉ MENTALE & MYÉLINE */}
        {/* ======================================================== */}
        <section id="myeline" className="scroll-mt-24 space-y-6">
          <div className="p-6 sm:p-10 rounded-3xl bg-[#161b22] border-2 border-[#93c5fd]/40 hover:border-[#93c5fd] transition-all relative overflow-hidden shadow-xl">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[#93c5fd]/20 text-[#93c5fd] flex items-center justify-center shrink-0 shadow-inner">
                  <Brain className="w-7 h-7" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#93c5fd] bg-[#93c5fd]/10 px-2.5 py-0.5 rounded-full border border-[#93c5fd]/30 font-bold">
                      Neurobiologie &amp; Neurogenèse
                    </span>
                    <span className="text-[10px] font-mono text-white/60">
                      3 Flacons Synergiques • Voies FGF17
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-white">
                    Protocole Clarté Mentale &amp; Myéline
                  </h2>
                  <p className="text-xs sm:text-sm text-[#93c5fd] font-semibold">
                    Préservation de l'isolant lipidique neuronal, activation des cellules progénitrices OPC et signalisation FGF17
                  </p>
                </div>
              </div>

              <div className="shrink-0 flex items-center gap-3">
                <button
                  onClick={() => handleOpenProtocol('protocole-myeline')}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#93c5fd] hover:bg-[#60a5fa] text-[#0d1117] font-black text-xs uppercase tracking-wider transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 cursor-pointer"
                >
                  {!hasAccess && <Lock className="w-3.5 h-3.5 text-[#0d1117]" />}
                  <span>{lang === 'fr' ? 'Accéder au protocole détaillé' : lang === 'de' ? 'Zum detaillierten Protokoll' : 'Access detailed protocol'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <p className="text-sm text-[#c9d1d9] leading-relaxed mb-8">
              Le déclin cognitif et le brouillard mental ne sont pas une usure inéluctable des neurones, mais une altération progressive de la gaine de myéline. Ce protocole fournit les briques lipidiques nobles et les flavones activatrices (lutéoline, apigénine) nécessaires à la remyélinisation et à la signalisation neurotrophique du FGF17.
            </p>

            {/* Flacons Grid */}
            <div className="grid sm:grid-cols-3 gap-4 mb-8">
              <div className="p-4 rounded-2xl bg-[#0d1117] border border-[#30363d] space-y-2">
                <div className="text-[10px] font-mono text-[#93c5fd] uppercase font-bold">Flacon 1 • Matin</div>
                <div className="text-xs font-bold text-white">Vivacité Synaptique &amp; Bacosides</div>
                <p className="text-[11px] text-[#8b949e] leading-relaxed">
                  Optimisation de la neurotransmission cholinergique et activation de la vigilance sans excitation cardiaque.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#0d1117] border border-[#30363d] space-y-2">
                <div className="text-[10px] font-mono text-[#93c5fd] uppercase font-bold">Flacon 2 • Midi</div>
                <div className="text-xs font-bold text-white">Antioxydation &amp; Mitochondrie</div>
                <p className="text-[11px] text-[#8b949e] leading-relaxed">
                  Protection des lipides membranaires cérébraux contre la péroxydation et soutien du flux d'ATP mitochondrial.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#0d1117] border border-[#30363d] space-y-2">
                <div className="text-[10px] font-mono text-[#93c5fd] uppercase font-bold">Flacon 3 • Soir</div>
                <div className="text-xs font-bold text-white">Reconstruction Lipidique &amp; FGF17</div>
                <p className="text-[11px] text-[#8b949e] leading-relaxed">
                  Apport de sphingolipides et stimulation nocturne des oligodendrocytes pour réparer la gaine isolante.
                </p>
              </div>
            </div>

            {/* Extraction & Botanicals Highlights */}
            <div className="p-5 rounded-2xl bg-[#0d1117]/80 border border-[#30363d] flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs font-mono">
              <div className="space-y-1">
                <span className="text-[#93c5fd] font-bold">Synergie Botanique Clé :</span>
                <p className="text-[#8b949e]">
                  Bacopa (*Bacopa monnieri*), Lion's Mane (*Hericium erinaceus*), Ginkgo biloba, Romarin (*Rosmarinus* - acide carnosique), Lutéoline.
                </p>
              </div>
              <div className="space-y-1 md:text-right shrink-0">
                <span className="text-[#93c5fd] font-bold">Extraction BloomLab® :</span>
                <p className="text-[#8b949e]">
                  Macération assistée à 45°C en solvant lipidique d'exception (huile de lin et caméline de 1ère pression à froid).
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Comparative Synthesis Table */}
        <section className="p-6 sm:p-8 rounded-3xl bg-[#161b22] border border-[#30363d] space-y-6">
          <div>
            <div className="text-[10px] font-mono text-[#c9a84c] uppercase tracking-wider font-bold mb-1">
              Tableau Récapitulatif
            </div>
            <h3 className="text-xl font-bold text-white">
              Synthèse Opératoire des 3 Protocoles
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#30363d] text-[#8b949e] uppercase font-mono text-[10px]">
                  <th className="py-3 px-4">Protocole</th>
                  <th className="py-3 px-4">Cible Biologique</th>
                  <th className="py-3 px-4">Durée</th>
                  <th className="py-3 px-4">Paramètre BloomLab®</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#30363d]/60 font-sans">
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="py-4 px-4 font-bold text-white flex items-center gap-2">
                    <Activity className="w-4 h-4 text-[#c9a84c]" />
                    <span>Psoriasis</span>
                  </td>
                  <td className="py-4 px-4 text-[#b8b8b8]">Axe Th17/IL-23, foie, barrière grêle</td>
                  <td className="py-4 px-4 font-mono text-[#c9a84c]">14 semaines (4 phases)</td>
                  <td className="py-4 px-4 font-mono text-[#8b949e]">Double Solvant (58°C + Huile)</td>
                  <td className="py-4 px-4 text-right">
                    <button
                      onClick={() => handleOpenProtocol('protocole-psoriasis')}
                      className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-[#c9a84c] hover:text-[#0d1117] text-white font-bold transition-all"
                    >
                      Consulter &rarr;
                    </button>
                  </td>
                </tr>

                <tr className="hover:bg-white/5 transition-colors">
                  <td className="py-4 px-4 font-bold text-white flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#86efac]" />
                    <span>SIBO</span>
                  </td>
                  <td className="py-4 px-4 text-[#b8b8b8]">Complexe Moteur Migrant, mucus, motilité</td>
                  <td className="py-4 px-4 font-mono text-[#86efac]">3 phases chronobiologiques</td>
                  <td className="py-4 px-4 font-mono text-[#8b949e]">Vortex 58°C chambre close</td>
                  <td className="py-4 px-4 text-right">
                    <button
                      onClick={() => handleOpenProtocol('protocole-sibo')}
                      className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-[#86efac] hover:text-[#0d1117] text-white font-bold transition-all"
                    >
                      Consulter &rarr;
                    </button>
                  </td>
                </tr>

                <tr className="hover:bg-white/5 transition-colors">
                  <td className="py-4 px-4 font-bold text-white flex items-center gap-2">
                    <Brain className="w-4 h-4 text-[#93c5fd]" />
                    <span>Clarté Mentale</span>
                  </td>
                  <td className="py-4 px-4 text-[#b8b8b8]">Gaine de myéline, activation FGF17, OPC</td>
                  <td className="py-4 px-4 font-mono text-[#93c5fd]">3 Flacons (8 à 12 sem.)</td>
                  <td className="py-4 px-4 font-mono text-[#8b949e]">Macération lipidique 45°C</td>
                  <td className="py-4 px-4 text-right">
                    <button
                      onClick={() => handleOpenProtocol('protocole-myeline')}
                      className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-[#93c5fd] hover:text-[#0d1117] text-white font-bold transition-all"
                    >
                      Consulter &rarr;
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 5. Legal & Scientific Boundary Disclaimer */}
        <section className="p-6 rounded-2xl bg-[#161b22] border border-[#30363d] text-xs text-[#8b949e] space-y-2">
          <div className="flex items-center gap-2 text-white font-bold">
            <Info className="w-4 h-4 text-[#c9a84c]" />
            <span>Cadre Légal &amp; Prudence Épistémique</span>
          </div>
          <p className="leading-relaxed">
            Les protocoles présentés ci-dessus relèvent de la phytothérapie intégrale de terrain et de l'hygiène de vie. Ils ont une vocation rigoureusement éducative et ne constituent ni un diagnostic médical, ni une consultation personnalisée, ni une prescription pharmacologique. Ils ne dispensent en aucun cas du suivi auprès de votre médecin traitant ou spécialiste. Ne jamais interrompre un traitement allopathique en cours.
          </p>
        </section>

      </main>
    </div>
  );
}
