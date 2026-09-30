import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Activity, 
  Leaf, 
  BookOpen, 
  ChevronRight, 
  ChevronDown,
  ArrowRight, 
  Brain, 
  ShieldCheck, 
  Droplets, 
  Thermometer, 
  Clock, 
  CheckCircle2, 
  Layers, 
  Zap, 
  HeartHandshake, 
  Lock, 
  Send,
  Network,
  Compass,
  Star
} from 'lucide-react';
import { View } from './types';
import { Language } from './translations';
import AcademyNavigation from './components/AcademyNavigation';

interface BloomAcademiePageProps {
  onNavigate: (view: View, param?: string) => void;
  lang: Language;
}

export default function BloomAcademiePage({ onNavigate, lang }: BloomAcademiePageProps) {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subscribeSuccess, setSubscribeSuccess] = useState(false);
  
  // Access control for paywalled sections ("Comprendre le Corps" through "Protocoles Systémiques")
  const [hasAccess, setHasAccess] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('bloom_subscriber') === 'true' || localStorage.getItem('bloom_access') === 'true';
    }
    return false;
  });
  const [unlockCode, setUnlockCode] = useState('');
  const [unlockError, setUnlockError] = useState('');
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [isNeufAxesTreeOpen, setIsNeufAxesTreeOpen] = useState(true);

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

  const handleRestrictedClick = (targetView: View, param?: string) => {
    if (hasAccess) {
      onNavigate(targetView, param);
    } else {
      onNavigate('abonnement');
    }
  };

  // Track page_view_academie
  useEffect(() => {
    if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
      (window as any).gtag('event', 'page_view_academie', {
        page_title: 'Bloom Académie',
        page_location: window.location.href
      });
    }
    if (typeof window !== 'undefined' && Array.isArray((window as any).dataLayer)) {
      (window as any).dataLayer.push({
        event: 'page_view_academie',
        page: 'academie'
      });
    }
  }, []);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, firstName, source: 'academie_hub' }),
      });
      if (res.ok) {
        setSubscribeSuccess(true);
        if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
          (window as any).gtag('event', 'inscription_premium', {
            source: 'academie_hub'
          });
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const trackBoutiqueClick = (product = 'bloomlab') => {
    if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
      (window as any).gtag('event', 'clic_vers_boutique', {
        product: product,
        origin: 'academie_hub'
      });
    }
    onNavigate('product-detail', 'bloomlab');
  };

  return (
    <div 
      className="min-h-screen bg-[#0d1117] text-[#f5f0e8] selection:bg-[#c9a84c]/20 selection:text-[#f5f0e8] pb-24 font-sans"
      data-bloom-academie="true"
    >
      
      {/* 1. ACADÉMIE NAVIGATION & BREADCRUMB */}
      <AcademyNavigation
        currentView="academie"
        onNavigate={onNavigate}
        currentPageTitle={lang === 'fr' ? 'Accueil Académie' : lang === 'de' ? 'Akademie Übersicht' : 'Academy Home'}
        sectionName={lang === 'fr' ? 'Espace Pédagogique' : lang === 'de' ? 'Bildungsbereich' : 'Educational Space'}
        lang={lang}
      />

      {/* 2. EN-TÊTE / HERO */}
      <header className="pt-14 pb-16 px-4 sm:px-6 bg-gradient-to-b from-[#161b22] via-[#0d1117] to-[#161b22] border-b border-[#30363d]">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#161b22] border border-[#c9a84c]/30 text-[#c9a84c] text-[11px] font-black uppercase tracking-[0.2em] mb-6 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#c9a84c]" />
            <span>Pôle Pédagogique &amp; Transmission du Vivant</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-5xl lg:text-6xl font-black text-[#f5f0e8] tracking-tight leading-[1.1] mb-6">
            Bloom Academy : comprendre les plantes, les méthodes et le modèle Bloom
          </h1>

          <p className="text-base sm:text-lg text-[#b8b8b8] max-w-3xl mx-auto font-normal leading-relaxed mb-8">
            Un espace pour apprendre pas à pas : comprendre nos repères de recherche, découvrir les plantes et distinguer les usages traditionnels des connaissances établies.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-bold mb-8">
            <button
              onClick={() => onNavigate('comment-lire-modele-bloom')}
              className="px-6 py-3.5 rounded-xl bg-[#c9a84c] hover:bg-[#d8b85c] text-[#0d1117] font-black uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-lg hover:shadow-xl"
            >
              <Compass className="w-4 h-4" />
              <span>Comment lire le modèle Bloom</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href="/boutique/bloomlab/"
              onClick={(e) => {
                if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                  e.preventDefault();
                  trackBoutiqueClick('bloomlab');
                }
              }}
              className="px-6 py-3.5 rounded-xl bg-[#161b22] hover:bg-[#21262d] text-[#f5f0e8] border border-[#30363d] hover:border-[#c9a84c] transition-all flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#c9a84c]" />
              <span>Voir BloomLab</span>
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-bold">
            <a 
              href="#comprendre-le-corps"
              className="px-3.5 py-1.5 rounded-lg bg-[#161b22] border border-[#30363d] text-[#b8b8b8] hover:text-white hover:border-[#c9a84c] transition-all flex items-center gap-1.5"
            >
              <Brain className="w-3.5 h-3.5 text-[#86efac]" /> Comprendre le Corps
            </a>
            <a 
              href="#extraction-totum"
              className="px-3.5 py-1.5 rounded-lg bg-[#161b22] border border-[#30363d] text-[#b8b8b8] hover:text-white hover:border-[#c9a84c] transition-all flex items-center gap-1.5"
            >
              <Leaf className="w-3.5 h-3.5 text-[#c9a84c]" /> Extraction &amp; Totum
            </a>
            <a 
              href="#bibliotheque"
              className="px-3.5 py-1.5 rounded-lg bg-[#161b22] border border-[#30363d] text-[#b8b8b8] hover:text-white hover:border-[#c9a84c] transition-all flex items-center gap-1.5"
            >
              <BookOpen className="w-3.5 h-3.5 text-[#93c5fd]" /> Bibliothèque
            </a>
          </div>
        </div>
      </header>

      {/* 3. MAIN BODY CONTAINER */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-16 space-y-24">

        {/* SECTION 1: COMPRENDRE LE CORPS */}
        <section id="comprendre-le-corps" className="scroll-mt-24">
          <div className="mb-8">
            <div className="text-[10px] font-black uppercase tracking-[0.25em] text-[#c9a84c] mb-2 font-mono">
              Physiologie &amp; Neurosciences Appliquées
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#f5f0e8] tracking-tight">
              Comprendre le Corps
            </h2>
            <p className="text-sm text-[#b8b8b8] max-w-2xl mt-1">
              Les grands systèmes qui régulent votre biologie. Découvrez comment le vivant communique par réseaux d'information et d'homéostasie.
            </p>
          </div>

          {/* BANNIÈRE ABONNEMENT OU ACCÈS VIP ACTIF (AVANT LE PLAN POUR PLACER LE PLAN DANS L'ABONNEMENT) */}
          {!hasAccess ? (
            <div className="mb-8 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#1c180e] via-[#261f0d] to-[#1c180e] border-2 border-[#D97706]/50 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-[#D97706]/10 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="space-y-2 max-w-2xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D97706]/20 border border-[#D97706]/40 text-[#D97706] text-[10px] font-bold uppercase tracking-wider">
                    <Lock className="w-3.5 h-3.5" />
                    <span>{lang === 'fr' ? 'Contenu Réservé aux Membres' : lang === 'de' ? 'Exklusiver Mitglieder-Inhalt' : 'Members Exclusive Content'}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white">
                    {lang === 'fr'
                      ? 'Accédez à l’intégralité de l’Académie Bloom & des Protocoles Systémiques'
                      : lang === 'de'
                      ? 'Zugang zur gesamten Bloom Academy & systemischen Protokollen'
                      : 'Unlock the Entire Bloom Academy & Systemic Protocols'}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#E5D7B7] leading-relaxed">
                    {lang === 'fr'
                      ? 'L’onglet Bloom Academy est en accès libre pour « Comment lire le modèle Bloom ». Le plan de la branche « Comprendre le Corps » et les « Protocoles Systémiques » nécessitent un abonnement numérique actif.'
                      : lang === 'de'
                      ? 'Die Bloom Academy bietet freien Zugang zu « Wie man das Bloom-Modell liest ». Der Strukturplan « Den Körper verstehen » und « Systemische Protokolle » erfordern ein aktives digitales Abonnement.'
                      : 'Bloom Academy provides free access to "How to read the Bloom model". The "Understanding the Body" branch plan and "Systemic Protocols" require an active digital subscription.'}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
                  <button
                    onClick={() => onNavigate('abonnement')}
                    className="px-6 py-3.5 rounded-xl bg-[#D97706] hover:bg-[#b45309] text-white font-black text-xs uppercase tracking-wider transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Star className="w-4 h-4 fill-current" />
                    <span>{lang === 'fr' ? 'Découvrir les Abonnements (dès 7,90 €)' : lang === 'de' ? 'Abonnements ansehen (ab 7,90 €)' : 'View Subscriptions (from €7.90)'}</span>
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
                    placeholder={lang === 'fr' ? 'Entrez votre code d’accès (ex: BLOOMVIP)' : lang === 'de' ? 'Geben Sie Ihren Zugangscode ein' : 'Enter your access code'}
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
            <div className="mb-8 p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center justify-between gap-4">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>
                  {lang === 'fr'
                    ? '✓ Accès Abonné Actif — Vous bénéficiez d’un accès illimité à l’ensemble des modules et protocoles systémiques de la Bloom Academy.'
                    : lang === 'de'
                    ? '✓ Aktiver Abonnentenzugang — Sie genießen unbegrenzten Zugriff auf alle Module und Protokolle der Bloom Academy.'
                    : '✓ Active Subscriber Access — You enjoy unlimited access to all Bloom Academy modules and systemic protocols.'}
                </span>
              </div>
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                VIP
              </span>
            </div>
          )}

          {/* SECTION : PLAN DE LA BRANCHE « COMPRENDRE LE CORPS » (DANS L'ABONNEMENT PAYANT) */}
          <div className="mb-10 p-5 rounded-2xl bg-[#161b22] border-2 border-[#D97706]/40 font-mono text-xs text-[#c9d1d9] space-y-3 overflow-x-auto relative shadow-xl">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-[#30363d]">
              <div className="text-[11px] font-bold text-[#c9a84c] uppercase tracking-wider flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#c9a84c]" />
                <span>
                  {lang === 'fr' 
                    ? 'Plan de la branche « Comprendre le Corps »' 
                    : lang === 'de' 
                    ? 'Struktur des Zweigs « Den Körper verstehen »' 
                    : 'Structure of the "Understanding the Body" Branch'}
                </span>
              </div>
              {!hasAccess ? (
                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#D97706]/20 border border-[#D97706]/40 text-[#D97706] text-[10px] font-bold uppercase tracking-wider">
                  <Lock className="w-3 h-3" />
                  <span>Abonnement requis</span>
                </div>
              ) : (
                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-[10px] font-bold uppercase tracking-wider">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Plan débloqué</span>
                </div>
              )}
            </div>

            <div className="space-y-1 pl-2 border-l border-[#30363d]/80">
              <div className="flex items-center gap-2 hover:text-[#c9a84c] transition-colors cursor-pointer" onClick={() => onNavigate('comment-lire-modele-bloom')}>
                <span className="text-[#8b949e]">├──</span>
                <span className="font-bold text-white">
                  {lang === 'fr' ? 'Comment lire le modèle Bloom' : lang === 'de' ? 'Wie man das Bloom-Modell liest' : 'How to read the Bloom model'}
                </span>
                <span className="text-[10px] text-emerald-400 bg-emerald-500/20 border border-emerald-500/30 px-1.5 py-0.5 rounded font-bold">
                  {lang === 'fr' ? "Accès Libre & Gratuit" : lang === 'de' ? 'Kostenlos & Frei' : 'Free & Open Access'}
                </span>
              </div>
              <div className="flex items-center gap-2 hover:text-[#c9a84c] transition-colors cursor-pointer" onClick={() => handleRestrictedClick('4-architectures')}>
                <span className="text-[#8b949e]">├──</span>
                <span className="font-bold text-white">
                  {lang === 'fr' ? 'Les 4 Architectures' : lang === 'de' ? 'Die 4 Architekturen' : 'The 4 Architectures'}
                </span>
                <span className="text-[10px] text-[#86efac] bg-[#86efac]/10 px-1.5 py-0.5 rounded">SRA, HPA, Fascia, SEC</span>
                {!hasAccess && <Lock className="w-3 h-3 text-[#c9a84c]/80" />}
              </div>
              <div className="flex items-center gap-2 hover:text-[#c9a84c] transition-colors cursor-pointer" onClick={() => handleRestrictedClick('terrain')}>
                <span className="text-[#8b949e]">├──</span>
                <span className="font-bold text-white">
                  {lang === 'fr' ? 'Les 7 Terrains' : lang === 'de' ? 'Die 7 Terrains' : 'The 7 Terrains'}
                </span>
                <span className="text-[10px] text-[#93c5fd] bg-[#93c5fd]/10 px-1.5 py-0.5 rounded">
                  {lang === 'fr' ? 'Grille systémique T1–T7' : lang === 'de' ? 'Systemisches Raster T1–T7' : 'Systemic grid T1–T7'}
                </span>
                {!hasAccess && <Lock className="w-3 h-3 text-[#c9a84c]/80" />}
              </div>
              {/* 4. Les 9 Axes historiques (Menu Déroulant) */}
              <div>
                <div 
                  className="flex items-center justify-between gap-2 hover:text-[#c9a84c] transition-colors cursor-pointer select-none"
                  onClick={() => setIsNeufAxesTreeOpen(!isNeufAxesTreeOpen)}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-[#8b949e]">├──</span>
                    <span className="font-bold text-white">
                      {lang === 'fr' ? 'Les 9 Axes historiques' : lang === 'de' ? 'Die 9 Historischen Achsen' : 'The 9 Historical Axes'}
                    </span>
                    <span className="text-[10px] text-[#c9a84c] bg-[#c9a84c]/10 px-1.5 py-0.5 rounded">
                      {lang === 'fr' ? "Matrice opératoire d'origine" : lang === 'de' ? 'Ursprüngliche Matrix' : 'Original operational matrix'}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {!hasAccess && <Lock className="w-3 h-3 text-[#c9a84c]/80" />}
                    {isNeufAxesTreeOpen ? (
                      <ChevronDown className="w-3.5 h-3.5 text-[#c9a84c]" />
                    ) : (
                      <ChevronRight className="w-3.5 h-3.5 text-[#c9a84c]" />
                    )}
                  </div>
                </div>

                {/* Sous-menus déroulants des 9 Axes */}
                {isNeufAxesTreeOpen && (
                  <div className="space-y-1 mt-1 pl-4 border-l border-[#c9a84c]/30 ml-2">
                    <div className="flex items-center gap-2 hover:text-[#c9a84c] transition-colors cursor-pointer" onClick={() => handleRestrictedClick('9-axes')}>
                      <span className="text-[#c9a84c] font-mono text-xs">├─</span>
                      <span className="font-medium text-white/90 text-xs">
                        {lang === 'fr' ? "Vue d'ensemble (9 axes)" : "Overview (9 axes)"}
                      </span>
                      {!hasAccess && <Lock className="w-2.5 h-2.5 text-[#c9a84c]/80" />}
                    </div>
                    <div className="flex items-center gap-2 hover:text-[#c9a84c] transition-colors cursor-pointer" onClick={() => handleRestrictedClick('module-0')}>
                      <span className="text-[#c9a84c] font-mono text-xs">├─</span>
                      <span className="font-medium text-[#c9a84c] text-xs">
                        {lang === 'fr' ? 'Module 0 : Le Choc de Paradigme' : lang === 'de' ? 'Modul 0 : Paradigmenwechsel' : 'Module 0 : Paradigm Shift'}
                      </span>
                      <span className="text-[9px] text-[#c9a84c] bg-[#c9a84c]/15 px-1 py-0.2 rounded font-mono">Porte d'entrée</span>
                      {!hasAccess && <Lock className="w-2.5 h-2.5 text-[#c9a84c]/80" />}
                    </div>
                    <div className="flex items-center gap-2 hover:text-[#c9a84c] transition-colors cursor-pointer" onClick={() => handleRestrictedClick('axe-a1')}>
                      <span className="text-[#c9a84c] font-mono text-xs">└─</span>
                      <span className="font-medium text-[#86efac] text-xs">
                        {lang === 'fr' ? 'Axe A1 : Émonctoires & Élimination' : lang === 'de' ? 'Achse A1 : Ausscheidungsorgane' : 'Axis A1 : Emunctories'}
                      </span>
                      <span className="text-[9px] text-[#86efac] bg-[#86efac]/15 px-1 py-0.2 rounded font-mono">Phase 1</span>
                      {!hasAccess && <Lock className="w-2.5 h-2.5 text-[#c9a84c]/80" />}
                    </div>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2 hover:text-[#c9a84c] transition-colors cursor-pointer" onClick={() => handleRestrictedClick('charge-allostatique')}>
                <span className="text-[#8b949e]">├──</span>
                <span className="font-bold text-white">
                  {lang === 'fr' ? 'La Charge Allostatique' : lang === 'de' ? 'Die Allostatische Last' : 'The Allostatic Load'}
                </span>
                <span className="text-[10px] text-[#86efac] bg-[#86efac]/10 px-1.5 py-0.5 rounded">
                  {lang === 'fr' ? "Physiologie de l'usure" : lang === 'de' ? 'Physiologie der Abnutzung' : 'Wear and tear physiology'}
                </span>
                {!hasAccess && <Lock className="w-3 h-3 text-[#c9a84c]/80" />}
              </div>
              <div className="flex items-center gap-2 hover:text-[#c9a84c] transition-colors cursor-pointer" onClick={() => handleRestrictedClick('phytotherapie-reset')}>
                <span className="text-[#8b949e]">├──</span>
                <span className="font-bold text-white">
                  {lang === 'fr' ? 'Le Reset Homéostasique' : lang === 'de' ? 'Der Homöostatische Reset' : 'The Homeostatic Reset'}
                </span>
                <span className="text-[10px] text-[#D97706] bg-[#D97706]/10 px-1.5 py-0.5 rounded">
                  {lang === 'fr' ? 'Démarche Pivot' : lang === 'de' ? 'Zentrale Methode' : 'Core Method'}
                </span>
                {!hasAccess && <Lock className="w-3 h-3 text-[#c9a84c]/80" />}
              </div>
              <div className="flex items-center gap-2 hover:text-[#c9a84c] transition-colors cursor-pointer" onClick={() => handleRestrictedClick('protocoles')}>
                <span className="text-[#8b949e]">├──</span>
                <span className="font-bold text-white">
                  {lang === 'fr' ? 'Protocoles Systémiques' : lang === 'de' ? 'Systemische Protokolle' : 'Systemic Protocols'}
                </span>
                <span className="text-[10px] text-[#86efac] bg-[#86efac]/10 px-1.5 py-0.5 rounded">
                  {lang === 'fr' ? 'Phytothérapie & Cures' : lang === 'de' ? 'Phytotherapie & Kuren' : 'Phytotherapy & Protocols'}
                </span>
                {!hasAccess && <Lock className="w-3 h-3 text-[#c9a84c]/80" />}
              </div>
              <div className="flex items-center gap-2 hover:text-[#F59E0B] transition-colors cursor-pointer" onClick={() => handleRestrictedClick('metabolisme-insuline')}>
                <span className="text-[#F59E0B] font-black">├──</span>
                <span className="font-bold text-[#F59E0B] drop-shadow-[0_0_8px_rgba(245,158,11,0.3)]">
                  {lang === 'fr' ? 'Métabolisme glucidique & insuline' : lang === 'de' ? 'Stoffwechsel & Insulin' : 'Metabolism & Insulin'}
                </span>
                <span className="text-[10px] font-black uppercase text-[#0d1117] bg-[#F59E0B] px-2 py-0.5 rounded">
                  {lang === 'fr' ? 'Nouveau dossier' : lang === 'de' ? 'Neues Dossier' : 'New dossier'}
                </span>
                {!hasAccess && <Lock className="w-3 h-3 text-[#F59E0B]" />}
              </div>
              <div className="flex items-center gap-2 pt-1 text-[#8b949e]">
                <span className="text-[#8b949e]">└──</span>
                <span className="italic">
                  {lang === 'fr' 
                    ? 'Autres modules prévus (Fascia, Thymus, Nerf Vague, Microbiote, Épigénétique...)'
                    : lang === 'de'
                    ? 'Weitere geplante Module (Faszie, Thymus, Vagusnerv, Mikrobiom, Epigenetik...)'
                    : 'Other planned modules (Fascia, Thymus, Vagus Nerve, Microbiome, Epigenetics...)'}
                </span>
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* 1. Comment lire le modèle Bloom */}
            <div 
              onClick={() => onNavigate('comment-lire-modele-bloom')}
              className="bg-[#161b22] rounded-3xl border-2 border-[#c9a84c] hover:border-[#d8b85c] p-6 cursor-pointer transition-all duration-300 hover:-translate-y-1 shadow-xl group relative overflow-hidden flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#c9a84c]/20 text-[#c9a84c] flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Compass className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] uppercase font-bold text-[#c9a84c] tracking-widest bg-[#0d1117] px-2.5 py-1 rounded-full border border-[#c9a84c]/40 font-mono">
                    Guide d'orientation
                  </span>
                </div>
                <h3 className="font-bold text-lg text-white group-hover:text-[#c9a84c] transition-colors mb-2">
                  Comment lire le modèle Bloom
                </h3>
                <p className="text-xs text-[#b8b8b8] leading-relaxed mb-4">
                  Architectures, terrains, axes et fiches botaniques : le guide pour vous repérer pas à pas dans l'Académie et comprendre les niveaux de preuve sans sur-interpréter.
                </p>
              </div>
              <span className="text-xs font-bold text-[#c9a84c] flex items-center gap-1 pt-2 border-t border-white/5">
                Consulter le guide &rarr;
              </span>
            </div>

            {/* 2. Les 4 Architectures */}
            <div 
              onClick={() => handleRestrictedClick('4-architectures')}
              className="bg-[#161b22] rounded-3xl border border-[#30363d] hover:border-[#c9a84c] p-6 cursor-pointer transition-all duration-300 hover:-translate-y-1 shadow-xs group flex flex-col justify-between relative overflow-hidden"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#c9a84c]/20 text-[#c9a84c] flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Network className="w-5 h-5" />
                  </div>
                  <div className="flex items-center gap-1.5">
                    {!hasAccess && (
                      <span className="text-[9px] uppercase font-bold text-[#D97706] bg-[#D97706]/15 border border-[#D97706]/30 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Lock className="w-3 h-3" />
                        <span>{lang === 'fr' ? 'Abonnement' : lang === 'de' ? 'Abo' : 'Subscription'}</span>
                      </span>
                    )}
                    <span className="text-[10px] uppercase font-bold text-[#c9a84c] tracking-widest bg-[#0d1117] px-2.5 py-1 rounded-full border border-[#30363d] font-mono">
                      Fondement Clé
                    </span>
                  </div>
                </div>
                <h3 className="font-bold text-lg text-white group-hover:text-[#c9a84c] transition-colors mb-2">
                  Les 4 Architectures du Corps
                </h3>
                <p className="text-xs text-[#b8b8b8] leading-relaxed mb-4">
                  SRA, Axe HPA, Fascia et SEC. Les quatre systèmes fondamentaux qui s'effondrent ensemble dans la maladie chronique et comment les restaurer.
                </p>
              </div>
              <span className="text-xs font-bold text-[#c9a84c] flex items-center gap-1 pt-2 border-t border-white/5">
                {hasAccess ? 'Découvrir les 4 Architectures →' : (lang === 'fr' ? 'Débloquer avec l’Abonnement →' : lang === 'de' ? 'Mit Abo freischalten →' : 'Unlock with Subscription →')}
              </span>
            </div>

            {/* 3. Les 7 Terrains */}
            <div 
              onClick={() => handleRestrictedClick('terrain')}
              className="bg-[#161b22] rounded-3xl border border-[#30363d] hover:border-[#86efac] p-6 cursor-pointer transition-all duration-300 hover:-translate-y-1 shadow-xs group flex flex-col justify-between relative overflow-hidden"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#86efac]/15 text-[#86efac] flex items-center justify-center">
                    <Activity className="w-5 h-5" />
                  </div>
                  <div className="flex items-center gap-1.5">
                    {!hasAccess && (
                      <span className="text-[9px] uppercase font-bold text-[#D97706] bg-[#D97706]/15 border border-[#D97706]/30 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Lock className="w-3 h-3" />
                        <span>{lang === 'fr' ? 'Abonnement' : lang === 'de' ? 'Abo' : 'Subscription'}</span>
                      </span>
                    )}
                    <span className="text-[10px] uppercase font-bold text-[#86efac] tracking-widest bg-[#0d1117] px-2.5 py-1 rounded-full border border-[#30363d] font-mono">
                      Grille Systémique
                    </span>
                  </div>
                </div>
                <h3 className="font-bold text-base text-white group-hover:text-[#86efac] transition-colors mb-2">
                  Les 7 Terrains
                </h3>
                <p className="text-xs text-[#b8b8b8] leading-relaxed mb-4">
                  Comprendre les interactions entre les grands systèmes du corps : digestion, détoxication, immunité, neuro-endocrinien et vitalité.
                </p>
              </div>
              <span className="text-xs font-bold text-[#86efac] flex items-center gap-1 pt-2 border-t border-white/5">
                {hasAccess ? 'Explorer les 7 Terrains →' : (lang === 'fr' ? 'Débloquer avec l’Abonnement →' : lang === 'de' ? 'Mit Abo freischalten →' : 'Unlock with Subscription →')}
              </span>
            </div>

            {/* 4. Les 9 Axes historiques */}
            <div 
              onClick={() => handleRestrictedClick('9-axes')}
              className="bg-[#161b22] rounded-3xl border border-[#30363d] hover:border-[#c9a84c] p-6 cursor-pointer transition-all duration-300 hover:-translate-y-1 shadow-xs group flex flex-col justify-between relative overflow-hidden"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#c9a84c]/15 text-[#c9a84c] flex items-center justify-center">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div className="flex items-center gap-1.5">
                    {!hasAccess && (
                      <span className="text-[9px] uppercase font-bold text-[#D97706] bg-[#D97706]/15 border border-[#D97706]/30 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Lock className="w-3 h-3" />
                        <span>{lang === 'fr' ? 'Abonnement' : lang === 'de' ? 'Abo' : 'Subscription'}</span>
                      </span>
                    )}
                    <span className="text-[10px] uppercase font-bold text-[#c9a84c] tracking-widest bg-[#0d1117] px-2.5 py-1 rounded-full border border-[#30363d] font-mono">
                      Version Historique
                    </span>
                  </div>
                </div>
                <h3 className="font-bold text-base text-white group-hover:text-[#c9a84c] transition-colors mb-2">
                  Les 9 Axes historiques
                </h3>
                <p className="text-xs text-[#b8b8b8] leading-relaxed mb-4">
                  Les processus transversaux originaux reliant les terrains : émonctoires, barrière intestinale, axe HPA, inflammation et régulation neuro-endocrine.
                </p>
              </div>
              <span className="text-xs font-bold text-[#c9a84c] flex items-center gap-1 pt-2 border-t border-white/5">
                {hasAccess ? 'Consulter les 9 Axes →' : (lang === 'fr' ? 'Débloquer avec l’Abonnement →' : lang === 'de' ? 'Mit Abo freischalten →' : 'Unlock with Subscription →')}
              </span>
            </div>

            {/* 5. La Charge Allostatique */}
            <div 
              onClick={() => handleRestrictedClick('charge-allostatique')}
              className="bg-[#161b22] rounded-3xl border border-[#30363d] hover:border-[#86efac] p-6 cursor-pointer transition-all duration-300 hover:-translate-y-1 shadow-xs group flex flex-col justify-between relative overflow-hidden"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#86efac]/15 text-[#86efac] flex items-center justify-center">
                    <Zap className="w-5 h-5" />
                  </div>
                  <div className="flex items-center gap-1.5">
                    {!hasAccess && (
                      <span className="text-[9px] uppercase font-bold text-[#D97706] bg-[#D97706]/15 border border-[#D97706]/30 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Lock className="w-3 h-3" />
                        <span>{lang === 'fr' ? 'Abonnement' : lang === 'de' ? 'Abo' : 'Subscription'}</span>
                      </span>
                    )}
                    <span className="text-[10px] uppercase font-bold text-[#86efac] tracking-widest bg-[#0d1117] px-2.5 py-1 rounded-full border border-[#30363d] font-mono">
                      Adaptation
                    </span>
                  </div>
                </div>
                <h3 className="font-bold text-base text-white group-hover:text-[#86efac] transition-colors mb-2">
                  La Charge Allostatique
                </h3>
                <p className="text-xs text-[#b8b8b8] leading-relaxed mb-4">
                  Comprendre l'usure biologique liée à l'adaptation continue au stress chronique, les 4 modes de dysfonction et les mécanismes de délestage.
                </p>
              </div>
              <span className="text-xs font-bold text-[#86efac] flex items-center gap-1 pt-2 border-t border-white/5">
                {hasAccess ? 'Explorer la Charge Allostatique →' : (lang === 'fr' ? 'Débloquer avec l’Abonnement →' : lang === 'de' ? 'Mit Abo freischalten →' : 'Unlock with Subscription →')}
              </span>
            </div>

            {/* 6. Le Reset Homéostasique */}
            <div 
              onClick={() => handleRestrictedClick('phytotherapie-reset')}
              className="bg-[#161b22] rounded-3xl border border-[#30363d] hover:border-[#D97706] p-6 cursor-pointer transition-all duration-300 hover:-translate-y-1 shadow-xs group flex flex-col justify-between relative overflow-hidden"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#D97706]/15 text-[#D97706] flex items-center justify-center">
                    <Activity className="w-5 h-5" />
                  </div>
                  <div className="flex items-center gap-1.5">
                    {!hasAccess && (
                      <span className="text-[9px] uppercase font-bold text-[#D97706] bg-[#D97706]/15 border border-[#D97706]/30 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Lock className="w-3 h-3" />
                        <span>{lang === 'fr' ? 'Abonnement' : lang === 'de' ? 'Abo' : 'Subscription'}</span>
                      </span>
                    )}
                    <span className="text-[10px] uppercase font-bold text-[#D97706] tracking-widest bg-[#0d1117] px-2.5 py-1 rounded-full border border-[#30363d] font-mono">
                      {lang === 'fr' ? 'Démarche Pivot' : lang === 'de' ? 'Zentrale Methode' : 'Core Method'}
                    </span>
                  </div>
                </div>
                <h3 className="font-bold text-base text-white group-hover:text-[#D97706] transition-colors mb-2">
                  {lang === 'fr' ? 'Le Reset Homéostasique' : lang === 'de' ? 'Der Homöostatische Reset' : 'The Homeostatic Reset'}
                </h3>
                <p className="text-xs text-[#b8b8b8] leading-relaxed mb-4">
                  {lang === 'fr' 
                    ? "La démarche phytothérapeutique complète : drainage émonctoriel, régulation neuro-endocrine, chronobiologie et relance de l'homéostasie profonde."
                    : lang === 'de'
                    ? "Der vollständige phytotherapeutische Ansatz: Ausleitung über die Ausscheidungsorgane, neuroendokrine Regulation und Reaktivierung der Homöostase."
                    : "The complete phytotherapeutic approach: emunctory drainage, neuro-endocrine regulation, chronobiology, and deep homeostatic reboot."}
                </p>
              </div>
              <span className="text-xs font-bold text-[#D97706] flex items-center gap-1 pt-2 border-t border-white/5">
                {hasAccess ? (lang === 'fr' ? 'Voir le Reset Homéostasique →' : lang === 'de' ? 'Den Reset ansehen →' : 'View Homeostatic Reset →') : (lang === 'fr' ? 'Débloquer avec l’Abonnement →' : lang === 'de' ? 'Mit Abo freischalten →' : 'Unlock with Subscription →')}
              </span>
            </div>

            {/* 7. Protocoles Systémiques (remis après Reset Homeostasique) */}
            <div 
              onClick={() => handleRestrictedClick('protocoles')}
              className="bg-[#161b22] rounded-3xl border border-[#30363d] hover:border-[#86efac] p-6 cursor-pointer transition-all duration-300 hover:-translate-y-1 shadow-xs group flex flex-col justify-between relative overflow-hidden"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#86efac]/15 text-[#86efac] flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div className="flex items-center gap-1.5">
                    {!hasAccess && (
                      <span className="text-[9px] uppercase font-bold text-[#D97706] bg-[#D97706]/15 border border-[#D97706]/30 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Lock className="w-3 h-3" />
                        <span>{lang === 'fr' ? 'Abonnement' : lang === 'de' ? 'Abo' : 'Subscription'}</span>
                      </span>
                    )}
                    <span className="text-[10px] uppercase font-bold text-[#86efac] tracking-widest bg-[#0d1117] px-2.5 py-1 rounded-full border border-[#30363d] font-mono">
                      {lang === 'fr' ? 'Cures Ciblées' : lang === 'de' ? 'Gezielte Kuren' : 'Targeted Cures'}
                    </span>
                  </div>
                </div>
                <h3 className="font-bold text-base text-white group-hover:text-[#86efac] transition-colors mb-2">
                  {lang === 'fr' ? 'Protocoles Systémiques' : lang === 'de' ? 'Systemische Protokolle' : 'Systemic Protocols'}
                </h3>
                <p className="text-xs text-[#b8b8b8] leading-relaxed mb-4">
                  {lang === 'fr'
                    ? 'Découvrez nos protocoles phytothérapeutiques précis : Décalcification Pinéale, Psoriasis, SIBO, Clarté Mentale & Myéline avec posologies et chronobiologie.'
                    : lang === 'de'
                    ? 'Entdecken Sie unsere präzisen Protokolle: Zirbeldrüsen-Entkalkung, Psoriasis, SIBO, Geistige Klarheit & Myelin mit Dosierungen und Chronobiologie.'
                    : 'Discover our targeted phytotherapeutic protocols: Pineal Decalcification, Psoriasis, SIBO, Mental Clarity & Myelin with precise chronobiology.'}
                </p>
              </div>
              <span className="text-xs font-bold text-[#86efac] flex items-center gap-1 pt-2 border-t border-white/5">
                {hasAccess ? (lang === 'fr' ? 'Accéder aux protocoles →' : lang === 'de' ? 'Zu den Protokollen →' : 'Access protocols →') : (lang === 'fr' ? 'Débloquer avec l’Abonnement →' : lang === 'de' ? 'Mit Abo freischalten →' : 'Unlock with Subscription →')}
              </span>
            </div>

            {/* 8. Métabolisme glucidique & insuline (écrit en jaune doré) */}
            <div 
              onClick={() => handleRestrictedClick('metabolisme-insuline')}
              className="bg-gradient-to-br from-[#161b22] to-[#251c0d] rounded-3xl border-2 border-[#F59E0B] hover:border-[#fbbf24] p-6 cursor-pointer transition-all duration-300 hover:-translate-y-1 shadow-[0_0_20px_rgba(245,158,11,0.15)] group flex flex-col justify-between relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#F59E0B]/15 rounded-full blur-2xl pointer-events-none" />
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#F59E0B] text-[#0d1117] flex items-center justify-center group-hover:scale-105 transition-transform font-bold shadow-md">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div className="flex items-center gap-1.5">
                    {!hasAccess && (
                      <span className="text-[9px] uppercase font-bold text-[#0d1117] bg-[#F59E0B] px-2 py-0.5 rounded-full flex items-center gap-1 font-mono">
                        <Lock className="w-3 h-3" />
                        <span>{lang === 'fr' ? 'Abonnement' : lang === 'de' ? 'Abo' : 'Subscription'}</span>
                      </span>
                    )}
                    <span className="text-[10px] uppercase font-black text-[#0d1117] bg-[#F59E0B] px-3 py-1 rounded-full tracking-widest font-mono shadow-sm">
                      {lang === 'fr' ? 'Nouveau Dossier' : lang === 'de' ? 'Neues Dossier' : 'New Dossier'}
                    </span>
                  </div>
                </div>
                <h3 className="font-bold text-xl text-[#F59E0B] drop-shadow-[0_0_10px_rgba(245,158,11,0.3)] transition-colors mb-2">
                  {lang === 'fr' ? 'Métabolisme glucidique & insuline' : lang === 'de' ? 'Stoffwechsel & Insulin' : 'Metabolism & Insulin'}
                </h3>
                <p className="text-xs sm:text-sm text-[#FDE68A]/85 leading-relaxed mb-4">
                  {lang === 'fr'
                    ? "Dossier d'approfondissement sur la sensibilité à l'insuline, l'hyperinsulinémie silencieuse, la flexibilité mitochondriale (AMPK / mTOR) et les synergies botaniques d'extraction."
                    : lang === 'de'
                    ? "Vertiefendes Dossier über Insulinsensitivität, stille Hyperinsulinämie, mitochondriale Flexibilität (AMPK / mTOR) und botanische Synergien."
                    : "In-depth dossier on insulin sensitivity, silent hyperinsulinemia, mitochondrial flexibility (AMPK / mTOR), and botanical extraction synergies."}
                </p>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-[#F59E0B]/20 text-xs font-bold text-[#F59E0B]">
                <span>{hasAccess ? (lang === 'fr' ? 'Explorer le dossier complet →' : lang === 'de' ? 'Vollständiges Dossier ansehen →' : 'Explore full dossier →') : (lang === 'fr' ? 'Débloquer avec l’Abonnement →' : lang === 'de' ? 'Mit Abo freischalten →' : 'Unlock with Subscription →')}</span>
                <span className="text-[11px] font-mono text-[#F59E0B]/70">Bioénergétique &amp; Totum</span>
              </div>
            </div>

            {/* 8. Autres modules prévus */}
            <div className="bg-[#161b22]/70 rounded-3xl border border-[#30363d] p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 text-[#8b949e] flex items-center justify-center">
                    <Clock className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] uppercase font-bold text-[#8b949e] tracking-widest bg-[#0d1117] px-2.5 py-1 rounded-full border border-[#30363d] font-mono">
                    Roadmap
                  </span>
                </div>
                <h3 className="font-bold text-base text-white/90 mb-2">
                  Autres modules prévus
                </h3>
                <p className="text-xs text-[#8b949e] leading-relaxed mb-3">
                  Modules d'approfondissement en cours de rédaction scientifique et pédagogique :
                </p>
                <ul className="text-xs text-[#c9d1d9] space-y-1.5 font-mono">
                  <li className="flex items-center gap-1.5 text-[11px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c9a84c]" />
                    <span>Le Fascia &amp; l'Interstitium</span>
                  </li>
                  <li className="flex items-center gap-1.5 text-[11px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#86efac]" />
                    <span>Le Thymus &amp; Immunosénescence</span>
                  </li>
                  <li className="flex items-center gap-1.5 text-[11px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#93c5fd]" />
                    <span>Le Nerf Vague &amp; Tonus vagal</span>
                  </li>
                  <li className="flex items-center gap-1.5 text-[11px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c9a84c]" />
                    <span>Le Microbiote &amp; Axe Intestin-Cerveau</span>
                  </li>
                  <li className="flex items-center gap-1.5 text-[11px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#86efac]" />
                    <span>L'Épigénétique &amp; Chronobiologie</span>
                  </li>
                </ul>
              </div>
              <span className="text-[11px] text-[#8b949e] italic pt-3 border-t border-white/5">
                Publication séquentielle documentée
              </span>
            </div>
          </div>
        </section>

        {/* SECTION 2: PROTOCOLES SYSTÉMIQUES */}
        <section id="protocoles" className="scroll-mt-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <div className="text-[10px] font-black uppercase tracking-[0.25em] text-[#c9a84c] mb-2 font-mono flex items-center gap-2">
                <span>Approche Thérapeutique Documentée</span>
                {!hasAccess && (
                  <span className="text-[9px] uppercase font-bold text-[#D97706] bg-[#D97706]/15 border border-[#D97706]/30 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Lock className="w-3 h-3" />
                    <span>{lang === 'fr' ? 'Accès Abonné' : lang === 'de' ? 'Abo-Zugang' : 'Subscriber Access'}</span>
                  </span>
                )}
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-[#f5f0e8] tracking-tight">
                Protocoles Systémiques
              </h2>
              <p className="text-sm text-[#b8b8b8] max-w-xl mt-1">
                Des protocoles complets pour accompagner les terrains biologiques en profondeur, de l'élimination des surcharges à la régénération cellulaire.
              </p>
            </div>
            <button
              onClick={() => handleRestrictedClick('phytotherapie-reset')}
              className="text-xs font-bold text-[#c9a84c] hover:underline flex items-center gap-1 cursor-pointer shrink-0"
            >
              <span>Voir la démarche Reset Homéostasique</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Carte Psoriasis */}
            <div className="bg-[#161b22] rounded-3xl border border-[#30363d] hover:border-[#c9a84c]/60 p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-xs group relative overflow-hidden">
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-[#c9a84c]/15 text-[#c9a84c] flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Activity className="w-6 h-6" />
                  </div>
                  {!hasAccess && (
                    <span className="text-[9px] uppercase font-bold text-[#D97706] bg-[#D97706]/15 border border-[#D97706]/30 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Lock className="w-3 h-3" />
                      <span>{lang === 'fr' ? 'Abonnement' : lang === 'de' ? 'Abo' : 'Subscription'}</span>
                    </span>
                  )}
                </div>
                <div className="text-[10px] font-mono text-[#c9a84c] uppercase tracking-wider mb-2">
                  14 Semaines • Double Solvant
                </div>
                <h3 className="text-xl font-bold text-[#f5f0e8] mb-3 group-hover:text-[#c9a84c] transition-colors">
                  Protocole Psoriasis
                </h3>
                <p className="text-xs sm:text-sm text-[#b8b8b8] leading-relaxed mb-6">
                  Désengorgement hépato-biliaire, perméabilité intestinale et modulation de l'axe Th17/IL-23 pour restaurer l'intégrité cutanée.
                </p>
              </div>

              <div className="pt-4 border-t border-[#30363d]">
                <button
                  onClick={() => handleRestrictedClick('protocole-psoriasis')}
                  className="w-full py-3 rounded-2xl bg-[#0d1117] hover:bg-[#c9a84c] hover:text-[#0d1117] text-[#f5f0e8] text-xs font-bold border border-[#30363d] hover:border-[#c9a84c] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {!hasAccess ? (
                    <>
                      <Lock className="w-3.5 h-3.5 text-[#D97706]" />
                      <span>{lang === 'fr' ? 'Débloquer le protocole' : lang === 'de' ? 'Protokoll freischalten' : 'Unlock protocol'}</span>
                    </>
                  ) : (
                    <>
                      <span>Découvrir le protocole</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Carte SIBO */}
            <div className="bg-[#161b22] rounded-3xl border border-[#30363d] hover:border-[#c9a84c]/60 p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-xs group relative overflow-hidden">
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-[#2d5016]/50 text-[#86efac] flex items-center justify-center group-hover:scale-105 transition-transform">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  {!hasAccess && (
                    <span className="text-[9px] uppercase font-bold text-[#D97706] bg-[#D97706]/15 border border-[#D97706]/30 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Lock className="w-3 h-3" />
                      <span>{lang === 'fr' ? 'Abonnement' : lang === 'de' ? 'Abo' : 'Subscription'}</span>
                    </span>
                  )}
                </div>
                <div className="text-[10px] font-mono text-[#86efac] uppercase tracking-wider mb-2">
                  3 Phases • Motilité &amp; Grêle
                </div>
                <h3 className="text-xl font-bold text-[#f5f0e8] mb-3 group-hover:text-[#86efac] transition-colors">
                  Protocole SIBO
                </h3>
                <p className="text-xs sm:text-sm text-[#b8b8b8] leading-relaxed mb-6">
                  Assainissement antimicrobien doux du grêle, relance du Complexe Moteur Migrant (CMM) et restauration du mucus protecteur.
                </p>
              </div>

              <div className="pt-4 border-t border-[#30363d]">
                <button
                  onClick={() => handleRestrictedClick('protocole-sibo')}
                  className="w-full py-3 rounded-2xl bg-[#0d1117] hover:bg-[#86efac] hover:text-[#0d1117] text-[#f5f0e8] text-xs font-bold border border-[#30363d] hover:border-[#86efac] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {!hasAccess ? (
                    <>
                      <Lock className="w-3.5 h-3.5 text-[#D97706]" />
                      <span>{lang === 'fr' ? 'Débloquer le protocole' : lang === 'de' ? 'Protokoll freischalten' : 'Unlock protocol'}</span>
                    </>
                  ) : (
                    <>
                      <span>Découvrir le protocole</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Carte Clarté Mentale */}
            <div className="bg-[#161b22] rounded-3xl border border-[#30363d] hover:border-[#c9a84c]/60 p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-xs group relative overflow-hidden">
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-[#1e3a8a]/50 text-[#93c5fd] flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Brain className="w-6 h-6" />
                  </div>
                  {!hasAccess && (
                    <span className="text-[9px] uppercase font-bold text-[#D97706] bg-[#D97706]/15 border border-[#D97706]/30 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Lock className="w-3 h-3" />
                      <span>{lang === 'fr' ? 'Abonnement' : lang === 'de' ? 'Abo' : 'Subscription'}</span>
                    </span>
                  )}
                </div>
                <div className="text-[10px] font-mono text-[#93c5fd] uppercase tracking-wider mb-2">
                  3 Flacons • Myéline &amp; FGF17
                </div>
                <h3 className="text-xl font-bold text-[#f5f0e8] mb-3 group-hover:text-[#93c5fd] transition-colors">
                  Protocole Clarté Mentale
                </h3>
                <p className="text-xs sm:text-sm text-[#b8b8b8] leading-relaxed mb-6">
                  Soutien neuronal, préservation de l'isolant lipidique de la gaine de myéline et stimulation des voies de signalisation du FGF17.
                </p>
              </div>

              <div className="pt-4 border-t border-[#30363d]">
                <button
                  onClick={() => handleRestrictedClick('protocole-myeline')}
                  className="w-full py-3 rounded-2xl bg-[#0d1117] hover:bg-[#93c5fd] hover:text-[#0d1117] text-[#f5f0e8] text-xs font-bold border border-[#30363d] hover:border-[#93c5fd] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {!hasAccess ? (
                    <>
                      <Lock className="w-3.5 h-3.5 text-[#D97706]" />
                      <span>{lang === 'fr' ? 'Débloquer le protocole' : lang === 'de' ? 'Protokoll freischalten' : 'Unlock protocol'}</span>
                    </>
                  ) : (
                    <>
                      <span>Découvrir le protocole</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: EXTRACTION & TOTUM */}
        <section id="extraction-totum" className="scroll-mt-24">
          <div className="mb-8">
            <div className="text-[10px] font-black uppercase tracking-[0.25em] text-[#c9a84c] mb-2">
              Ingénierie &amp; Phytochimie
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#f5f0e8]">
              Extraction &amp; Totum
            </h2>
            <p className="text-sm text-[#b8b8b8] max-w-xl mt-1">
              Les principes scientifiques de l'extraction de haute précision : préserver les liaisons délicates du Totum végétal par double ou triple solvant.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Les Solvants */}
            <div 
              onClick={() => onNavigate('solvants-extraction')}
              className="bg-[#161b22] rounded-3xl border border-[#30363d] hover:border-[#c9a84c] p-6 cursor-pointer transition-all duration-300 hover:-translate-y-1 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#c9a84c]/15 text-[#c9a84c] flex items-center justify-center mb-4">
                  <Droplets className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-sm text-white mb-2">
                  Les Solvants Naturels
                </h3>
                <p className="text-xs text-[#b8b8b8] leading-relaxed mb-4">
                  Eau pure, huiles végétales de première pression à froid, glycérine végétale : affinités polaires et non-polaires.
                </p>
              </div>
              <span className="text-xs font-bold text-[#c9a84c] flex items-center gap-1">
                Guide des solvants &rarr;
              </span>
            </div>

            {/* Les Températures */}
            <div 
              onClick={() => onNavigate('infusion-precision')}
              className="bg-[#161b22] rounded-3xl border border-[#30363d] hover:border-[#c9a84c] p-6 cursor-pointer transition-all duration-300 hover:-translate-y-1 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#86efac]/15 text-[#86efac] flex items-center justify-center mb-4">
                  <Thermometer className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-sm text-white mb-2">
                  Les Températures Précises
                </h3>
                <p className="text-xs text-[#b8b8b8] leading-relaxed mb-4">
                  Régulation au 0,5°C près : pourquoi l'eau bouillante détruit les polyphénols et comment extraire à 45°C, 58°C ou 72°C.
                </p>
              </div>
              <span className="text-xs font-bold text-[#c9a84c] flex items-center gap-1">
                Courbes thermiques &rarr;
              </span>
            </div>

            {/* Les Recettes */}
            <div 
              onClick={() => onNavigate('recettes')}
              className="bg-[#161b22] rounded-3xl border border-[#30363d] hover:border-[#c9a84c] p-6 cursor-pointer transition-all duration-300 hover:-translate-y-1 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#93c5fd]/15 text-[#93c5fd] flex items-center justify-center mb-4">
                  <BookOpen className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-sm text-white mb-2">
                  Les Recettes BloomLab®
                </h3>
                <p className="text-xs text-[#b8b8b8] leading-relaxed mb-4">
                  Fiches pas à pas avec ratio plante/solvant, cinétique de macération assistée et règles de conservation active.
                </p>
              </div>
              <span className="text-xs font-bold text-[#c9a84c] flex items-center gap-1">
                Explorer le carnet &rarr;
              </span>
            </div>

            {/* Le Guide d'Extraction */}
            <div 
              onClick={() => onNavigate('guide-complet')}
              className="bg-[#161b22] rounded-3xl border border-[#30363d] hover:border-[#c9a84c] p-6 cursor-pointer transition-all duration-300 hover:-translate-y-1 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#e879f9]/15 text-[#e879f9] flex items-center justify-center mb-4">
                  <Leaf className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-sm text-white mb-2">
                  Le Grand Guide d'Extraction
                </h3>
                <p className="text-xs text-[#b8b8b8] leading-relaxed mb-4">
                  Manuel exhaustif sur le séquençage A/B, le vortex cinétique continu et l'inertie du verre borosilicate 3.3.
                </p>
              </div>
              <span className="text-xs font-bold text-[#c9a84c] flex items-center gap-1">
                Lire le guide &rarr;
              </span>
            </div>
          </div>
        </section>

        {/* SECTION 4: BIBLIOTHÈQUE SCIENTIFIQUE */}
        <section id="bibliotheque" className="scroll-mt-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <div className="text-[10px] font-black uppercase tracking-[0.25em] text-[#c9a84c] mb-2">
                Documentation &amp; Sources Primaires
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-[#f5f0e8]">
                Bibliothèque Scientifique
              </h2>
              <p className="text-sm text-[#b8b8b8] max-w-xl mt-1">
                Articles de fond, monographies botaniques, études cliniques et traductions d'ouvrages pionniers.
              </p>
            </div>
            <button
              onClick={() => onNavigate('library-landing')}
              className="text-xs font-bold text-[#c9a84c] hover:underline flex items-center gap-1 cursor-pointer shrink-0"
            >
              <span>Voir tous les articles de la Bibliothèque</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-4">
            {/* Article 1 */}
            <div 
              onClick={() => onNavigate('blog-vieillissement-myeline')}
              className="p-5 sm:p-6 rounded-2xl bg-[#161b22] border border-[#30363d] hover:border-[#c9a84c] transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
            >
              <div className="space-y-1.5 max-w-2xl">
                <div className="flex items-center gap-2 text-[10px] font-mono text-[#c9a84c] uppercase">
                  <span>Recherche 2026</span>
                  <span>•</span>
                  <span>Neurobiologie</span>
                </div>
                <h3 className="font-bold text-sm sm:text-base text-white group-hover:text-[#c9a84c] transition-colors">
                  Le Vieillissement N'est Pas une Fatalité : Ce que la Science Découvre sur la Myéline et le FGF17
                </h3>
                <p className="text-xs text-[#b8b8b8] leading-relaxed">
                  Analyse des mécanismes de remyélinisation axonale et revue des flavones capables d'activer les progéniteurs neuronaux OPC.
                </p>
              </div>
              <span className="text-xs font-bold text-[#c9a84c] shrink-0 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                <span>Lire</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>

            {/* Article 2 */}
            <div 
              onClick={() => onNavigate('totum-vegetal')}
              className="p-5 sm:p-6 rounded-2xl bg-[#161b22] border border-[#30363d] hover:border-[#c9a84c] transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
            >
              <div className="space-y-1.5 max-w-2xl">
                <div className="flex items-center gap-2 text-[10px] font-mono text-[#86efac] uppercase">
                  <span>Monographie</span>
                  <span>•</span>
                  <span>Phytochimie</span>
                </div>
                <h3 className="font-bold text-sm sm:text-base text-white group-hover:text-[#c9a84c] transition-colors">
                  Le Totum Végétal : Pourquoi la Synergie Moléculaire Surpasse la Molécule Isolée
                </h3>
                <p className="text-xs text-[#b8b8b8] leading-relaxed">
                  Étude comparative entre extraits standardisés monosubstance et infusion intégrale préservant les cofacteurs d'absorption.
                </p>
              </div>
              <span className="text-xs font-bold text-[#c9a84c] shrink-0 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                <span>Lire</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>

            {/* Article 3 */}
            <div 
              onClick={() => onNavigate('herbier')}
              className="p-5 sm:p-6 rounded-2xl bg-[#161b22] border border-[#30363d] hover:border-[#c9a84c] transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
            >
              <div className="space-y-1.5 max-w-2xl">
                <div className="flex items-center gap-2 text-[10px] font-mono text-[#93c5fd] uppercase">
                  <span>Botanique Clinique</span>
                  <span>•</span>
                  <span>L'Herbier</span>
                </div>
                <h3 className="font-bold text-sm sm:text-base text-white group-hover:text-[#c9a84c] transition-colors">
                  L'Herbier Vivant des 40 Plantes Majeures de la Pharmacopée Européenne
                </h3>
                <p className="text-xs text-[#b8b8b8] leading-relaxed">
                  Profils phytochimiques détaillés, parties utilisées, principes actifs majeurs, contre-indications et réglages thermiques d'extraction.
                </p>
              </div>
              <span className="text-xs font-bold text-[#c9a84c] shrink-0 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                <span>Consulter</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        </section>

        {/* SECTION 5: CTA FREEMIUM / INSCRIPTION */}
        <section className="bg-gradient-to-b from-[#161b22] to-[#0f261e] border-2 border-[#c9a84c]/50 rounded-[36px] p-8 sm:p-12 text-center shadow-2xl relative overflow-hidden">
          <div className="max-w-2xl mx-auto relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-[#c9a84c]/20 border border-[#c9a84c]/40 text-[#c9a84c] flex items-center justify-center mx-auto mb-6">
              <Sparkles className="w-7 h-7" />
            </div>

            <span className="inline-block px-3.5 py-1 rounded-full bg-[#c9a84c]/20 text-[#c9a84c] text-[10px] font-black uppercase tracking-[0.2em] mb-4">
              Transmission Libre &amp; Gratuite
            </span>

            <h2 className="text-2xl sm:text-4xl font-black text-white mb-4">
              Prêt à Apprendre le Langage de Votre Corps ?
            </h2>

            <p className="text-sm sm:text-base text-[#b8b8b8] mb-8 leading-relaxed">
              Inscrivez-vous gratuitement pour débloquer les guides d'initiation, les paramètres thermiques des protocoles et recevoir nos analyses cliniques chaque dimanche.
            </p>

            {subscribeSuccess ? (
              <div className="p-6 rounded-2xl bg-emerald-950/40 border border-emerald-500/50 text-emerald-200">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                <h3 className="font-bold text-base mb-1">Bienvenue dans l'Académie Bloom !</h3>
                <p className="text-xs text-emerald-300">
                  Un email de confirmation vous a été envoyé. Consultez votre boîte de réception pour valider votre accès.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-4 max-w-md mx-auto text-left">
                <div>
                  <label className="block text-xs font-semibold text-[#b8b8b8] mb-1">Votre Prénom</label>
                  <input
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Sophie"
                    className="w-full px-4 py-3 rounded-xl bg-[#0d1117] border border-[#30363d] text-white text-sm focus:outline-none focus:border-[#c9a84c] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#b8b8b8] mb-1">Votre Adresse Email</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="sophie@exemple.com"
                    className="w-full px-4 py-3 rounded-xl bg-[#0d1117] border border-[#30363d] text-white text-sm focus:outline-none focus:border-[#c9a84c] transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl bg-[#c9a84c] hover:bg-[#dfbf63] text-[#0d1117] font-black text-sm uppercase tracking-wider transition-all shadow-lg hover:shadow-xl cursor-pointer flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <span>Inscription en cours...</span>
                  ) : (
                    <>
                      <span>Rejoindre Bloom Académie Gratuitement</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>

                <p className="text-[11px] text-center text-[#8b949e]">
                  🔒 Vos données restent strictement confidentielles. Zéro spam. Désinscription en 1 clic.
                </p>
              </form>
            )}
          </div>
        </section>

        {/* SECTION 6: PONT SAVOIR -> BOUTIQUE */}
        <section className="bg-[#161b22] border border-[#30363d] rounded-[36px] p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 text-[#c9a84c] text-[10px] font-bold uppercase tracking-wider mb-3">
              Passer du Savoir à la Pratique
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white mb-2">
              L'Extracteur Botanique BloomLab®
            </h3>
            <p className="text-xs sm:text-sm text-[#b8b8b8] leading-relaxed">
              Pour appliquer les protocoles de l'Académie avec la régulation thermique au 0,5°C près indispensable à la bioactivité du Totum, découvrez la machine BloomLab et ses accessoires.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
            <button
              onClick={() => trackBoutiqueClick('bloomlab')}
              className="px-6 py-3.5 rounded-2xl bg-[#c9a84c] hover:bg-[#dfbf63] text-[#0d1117] font-black text-xs uppercase tracking-wider transition-all shadow-md text-center cursor-pointer"
            >
              Découvrir la BloomLab®
            </button>
            <button
              onClick={() => onNavigate('boutique')}
              className="px-6 py-3.5 rounded-2xl bg-white/5 hover:bg-white/10 text-white font-bold text-xs uppercase tracking-wider border border-[#30363d] transition-all text-center cursor-pointer"
            >
              Voir Toute la Boutique
            </button>
          </div>
        </section>

      </main>

    </div>
  );
}
