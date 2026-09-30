import React, { useEffect, useState } from 'react';
import { 
  ChevronRight, 
  ArrowRight, 
  Brain, 
  ShieldCheck, 
  Activity, 
  Sparkles, 
  Layers, 
  Heart, 
  Network, 
  Flame, 
  RefreshCw, 
  Clock, 
  BookOpen, 
  CheckCircle2, 
  AlertTriangle,
  Compass,
  MessageSquare,
  Lock
} from 'lucide-react';
import { View } from './types';
import { Language } from './translations';
import AcademyNavigation from './components/AcademyNavigation';

interface Les4ArchitecturesContentProps {
  onNavigate: (view: View, param?: string) => void;
  lang: Language;
  isPremium?: boolean;
  onRequireAuth?: () => void;
}

export const Les4ArchitecturesContent: React.FC<Les4ArchitecturesContentProps> = ({ 
  onNavigate, 
  lang,
  isPremium = false,
  onRequireAuth 
}) => {
  const isFR = lang === 'fr';
  const [localUnlocked, setLocalUnlocked] = useState(false);
  const [accessCode, setAccessCode] = useState('');
  const [codeError, setCodeError] = useState(false);
  const hasAccess = Boolean(isPremium || localUnlocked);

  const handleUnlockWithCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (accessCode.trim().length >= 2) {
      setLocalUnlocked(true);
      setCodeError(false);
    } else {
      setCodeError(true);
    }
  };

  useEffect(() => {
    // 1. Meta Title & Description
    const pageTitle = "Les 4 Architectures du Corps Vivant — SRA, HPA, Fascia, SEC | Bloom Académie";
    const pageDesc = "Découvrez les 4 architectures fondamentales qui régulent votre corps : le SRA, l'axe HPA, le Fascia et le Système EndoCannabinoïde. Comprendre le corps pour restaurer le terrain.";
    document.title = pageTitle;

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', pageDesc);

    // Meta Keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', "SRA, axe HPA, fascia, système endocannabinoïde, SEC, comprendre le corps, homéostasie, terrain biologique");

    // Canonical link
    const canonicalUrl = "https://bloombybotanik.com/academie/comprendre-le-corps/4-architectures";
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalUrl);

    // OpenGraph
    const setOG = (property: string, content: string) => {
      let og = document.querySelector(`meta[property="${property}"]`);
      if (!og) {
        og = document.createElement('meta');
        og.setAttribute('property', property);
        document.head.appendChild(og);
      }
      og.setAttribute('content', content);
    };

    setOG('og:title', "Les 4 Architectures du Corps Vivant | Bloom Académie");
    setOG('og:description', "Découvrez les 4 systèmes fondamentaux qui régulent votre biologie : SRA, HPA, Fascia et SEC.");
    setOG('og:type', "article");
    setOG('og:url', canonicalUrl);
    setOG('og:image', "https://bloombybotanik.com/images/4-architectures-og.jpg");
    setOG('og:site_name', "Bloom by BotaniK");

    // Schema.org JSON-LD Article
    const schemaScriptId = 'schema-4-architectures';
    let scriptTag = document.getElementById(schemaScriptId) as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = schemaScriptId;
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }

    const schemaData = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "Les 4 Architectures du Corps Vivant",
      "description": "Découvrez les 4 architectures fondamentales qui régulent votre corps : le SRA, l'axe HPA, le Fascia et le Système EndoCannabinoïde.",
      "author": {
        "@type": "Organization",
        "name": "Bloom by BotaniK",
        "url": "https://bloombybotanik.com"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Bloom by BotaniK",
        "url": "https://bloombybotanik.com",
        "logo": {
          "@type": "ImageObject",
          "url": "https://bloombybotanik.com/images/logo.png"
        }
      },
      "datePublished": "2026-09-25",
      "dateModified": "2026-09-25",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": canonicalUrl
      }
    };
    scriptTag.text = JSON.stringify(schemaData);

    // Track analytics if available
    if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
      (window as any).gtag('event', 'page_view_4_architectures', {
        page_title: 'Les 4 Architectures du Corps Vivant',
        page_location: window.location.href
      });
    }

    return () => {
      // Cleanup schema on unmount if needed
      const tag = document.getElementById(schemaScriptId);
      if (tag) tag.remove();
    };
  }, [isFR]);

  return (
    <article 
      className="min-h-screen bg-[#0d1117] text-[#f5f0e8] selection:bg-[#c9a84c]/20 selection:text-[#f5f0e8] pb-24 font-sans"
      data-bloom-academie="true"
    >
      
      {/* 1. ACADÉMIE NAVIGATION & BREADCRUMB */}
      <AcademyNavigation
        currentView="4-architectures"
        onNavigate={onNavigate}
        currentPageTitle={lang === 'fr' ? 'Les 4 Architectures' : lang === 'de' ? 'Die 4 Architekturen' : 'The 4 Architectures'}
        sectionName={lang === 'fr' ? 'Comprendre le Corps' : lang === 'de' ? 'Den Körper verstehen' : 'Understanding the Body'}
        lang={lang}
      />

      {/* 2. EN-TÊTE HERO */}
      <header className="relative border-b border-[#30363d] bg-gradient-to-b from-[#161b22] to-[#0d1117] pt-12 sm:pt-20 pb-12 sm:pb-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto space-y-6">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#c9a84c]/10 border border-[#c9a84c]/30 text-[#c9a84c] text-xs font-bold uppercase tracking-widest">
            <Network className="w-4 h-4 text-[#c9a84c]" />
            <span>Fondements Biologiques &amp; Homéostasie</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-[#f5f0e8] tracking-tight leading-[1.1] mb-6">
            Les 4 Architectures du Corps Vivant
          </h1>

          <p className="text-lg sm:text-xl text-[#b8b8b8] leading-relaxed font-normal max-w-3xl">
            SRA · HPA · Fascia · Système EndoCannabinoïde — Les quatre piliers qui régulent votre biologie
          </p>

          <div className="flex flex-wrap items-center gap-4 sm:gap-8 pt-4 text-xs font-mono text-[#b8b8b8] border-t border-[#30363d]">
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#c9a84c]" />
              Lecture : 7 min
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-[#86efac]" />
              Niveau : Fondamental
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#c9a84c]" />
              Bloom Académie R&amp;D
            </span>
          </div>

        </div>
      </header>

      {/* 3. CORPS DE LA PAGE */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-10 sm:pt-14 space-y-12 sm:space-y-16">

        {/* INTRODUCTION — ENCADRÉ AVEC BORDURE GAUCHE OR */}
        <section>
          <div className="p-6 sm:p-8 rounded-2xl bg-[#161b22] border-l-4 border-[#c9a84c] border-y border-r border-[#30363d] space-y-4 shadow-xl">
            <p className="text-xl sm:text-2xl font-bold text-[#f5f0e8]">
              Votre corps n'est pas une machine.
            </p>
            <p className="text-base sm:text-lg text-[#f5f0e8]/90 leading-relaxed font-light">
              C'est un <strong className="text-[#c9a84c] font-semibold">réseau de réseaux</strong> — des systèmes qui se parlent en permanence, à des vitesses différentes, à des échelles différentes.
            </p>
            <p className="text-base sm:text-lg text-[#b8b8b8] leading-relaxed font-light">
              La maladie chronique n'est pas la défaillance d'une pièce. C'est la <strong className="text-[#f5f0e8] font-semibold">perturbation d'un réseau</strong>.
            </p>
            <p className="text-base sm:text-lg text-[#c9a84c] font-medium leading-relaxed italic pt-1">
              Et pour restaurer un réseau, il faut comprendre son architecture.
            </p>
          </div>
        </section>

        {/* CARTE VISUELLE DES 4 ARCHITECTURES */}
        <section className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <div className="p-4 rounded-xl bg-[#161b22] border border-[#30363d] text-center space-y-2">
            <span className="text-2xl block">⚙️</span>
            <span className="text-xs uppercase font-bold tracking-wider text-[#c9a84c] block">Le SRA</span>
            <span className="text-[11px] text-[#b8b8b8] block">Chef d'Orchestre Universel</span>
          </div>
          <div className="p-4 rounded-xl bg-[#161b22] border border-[#30363d] text-center space-y-2">
            <span className="text-2xl block">🧠</span>
            <span className="text-xs uppercase font-bold tracking-wider text-[#93c5fd] block">L'Axe HPA</span>
            <span className="text-[11px] text-[#b8b8b8] block">L'Exécutif du Stress</span>
          </div>
          <div className="p-4 rounded-xl bg-[#161b22] border border-[#30363d] text-center space-y-2">
            <span className="text-2xl block">🕸️</span>
            <span className="text-xs uppercase font-bold tracking-wider text-[#e879f9] block">Le Fascia</span>
            <span className="text-[11px] text-[#b8b8b8] block">La Mémoire du Corps</span>
          </div>
          <div className="p-4 rounded-xl bg-[#161b22] border border-[#30363d] text-center space-y-2">
            <span className="text-2xl block">🌿</span>
            <span className="text-xs uppercase font-bold tracking-wider text-[#86efac] block">Le SEC</span>
            <span className="text-[11px] text-[#b8b8b8] block">Thermostat Synaptique</span>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* PILIERS 01 À 04 : CONTENU SOUS ABONNEMENT PAYANT (MODE FREEMIUM) */}
        {/* ========================================================================= */}
        {hasAccess ? (
          <div className="space-y-12 sm:space-y-16 animate-in fade-in duration-500">
            {/* Bannière de confirmation abonnement */}
            <div className="p-4 rounded-2xl bg-[#161b22] border border-[#c9a84c]/50 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs shadow-md">
              <div className="flex items-center gap-2.5 text-[#f5f0e8]">
                <CheckCircle2 className="w-4 h-4 text-[#c9a84c] shrink-0" />
                <span>
                  <strong className="text-[#c9a84c]">Espace Membre Débloqué :</strong> Accès illimité aux 4 Piliers Biologiques Fondamentaux (SRA, HPA, Fascia, SEC).
                </span>
              </div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#c9a84c] bg-[#0d1117] px-3 py-1 rounded-full border border-[#c9a84c]/30">
                Abonnement Actif
              </span>
            </div>

            {/* SECTION 1 — LE SRA */}
            <section id="sra" className="p-6 sm:p-10 rounded-2xl bg-[#161b22] border border-[#30363d] space-y-6 shadow-xl transition-all hover:border-[#c9a84c]/50">
              <div className="flex items-center gap-3">
                <span className="text-3xl">⚙️</span>
                <div>
                  <div className="text-[10px] font-mono text-[#c9a84c] uppercase tracking-widest font-bold">Pilier 01</div>
                  <h2 className="text-2xl sm:text-3xl font-black text-[#f5f0e8] tracking-tight">
                    Le SRA — Le Chef d'Orchestre Universel
                  </h2>
                </div>
              </div>

              <p className="text-base sm:text-lg text-[#f5f0e8]/90 leading-relaxed font-light">
                Le <strong className="text-[#c9a84c] font-semibold">Système Rénine-Angiotensine (SRA)</strong> est présent sur <strong className="text-[#f5f0e8] font-semibold">toutes les membranes de toutes vos cellules</strong>. C'est le système le plus ubiquitaire du corps humain.
              </p>

              <div className="grid sm:grid-cols-3 gap-6 pt-2">
                {/* Ce qu'il contrôle */}
                <div className="p-5 rounded-xl bg-[#0d1117] border border-[#30363d] space-y-3">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[#c9a84c] flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#c9a84c]" />
                    Ce qu'il contrôle
                  </h3>
                  <ul className="text-xs sm:text-sm text-[#b8b8b8] space-y-2 list-disc pl-4 leading-relaxed">
                    <li>Le cortisol et l'axe du stress (HPA)</li>
                    <li>Les hormones (œstrogènes, testostérone)</li>
                    <li>L'immunité innée (macrophages, mastocytes)</li>
                    <li>Les microbiotes (intestinal, cutané, vaginal)</li>
                    <li>La réparation de l'ADN et la télomérase</li>
                    <li>Le monoxyde d'azote (NO) et la cognition</li>
                  </ul>
                </div>

                {/* Ce qui le dérègle */}
                <div className="p-5 rounded-xl bg-[#0d1117] border border-[#8b3a3a]/40 space-y-3">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[#f87171] flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-[#f87171]" />
                    Ce qui le dérègle
                  </h3>
                  <ul className="text-xs sm:text-sm text-[#b8b8b8] space-y-2 list-disc pl-4 leading-relaxed">
                    <li>Le stress chronique</li>
                    <li>La malbouffe et les aliments ultra-transformés</li>
                    <li>La pollution et les perturbateurs endocriniens</li>
                    <li>Les infections virales (dont le SARS-CoV-2)</li>
                    <li>Les carences en vitamine D, magnésium et zinc</li>
                  </ul>
                </div>

                {/* Ce qui le restaure */}
                <div className="p-5 rounded-xl bg-[#0d1117] border border-[#2d5016] space-y-3">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[#86efac] flex items-center gap-2">
                    <RefreshCw className="w-4 h-4 text-[#86efac]" />
                    Ce qui le restaure
                  </h3>
                  <ul className="text-xs sm:text-sm text-[#b8b8b8] space-y-2 list-disc pl-4 leading-relaxed">
                    <li><strong className="text-[#f5f0e8]">Vitamine D3</strong> (&gt; 50 ng/mL) + <strong className="text-[#f5f0e8]">K2</strong></li>
                    <li><strong className="text-[#f5f0e8]">Magnésium bisglycinate</strong></li>
                    <li><strong className="text-[#f5f0e8]">Zinc et sélénium</strong></li>
                    <li><strong className="text-[#f5f0e8]">Oméga-3 EPA/DHA</strong></li>
                    <li><strong className="text-[#f5f0e8]">NAC et glutathion</strong></li>
                  </ul>
                </div>
              </div>
            </section>

            {/* SECTION 2 — L'AXE HPA */}
            <section id="hpa" className="p-6 sm:p-10 rounded-2xl bg-[#161b22] border border-[#30363d] space-y-6 shadow-xl transition-all hover:border-[#93c5fd]/50">
              <div className="flex items-center gap-3">
                <span className="text-3xl">🧠</span>
                <div>
                  <div className="text-[10px] font-mono text-[#93c5fd] uppercase tracking-widest font-bold">Pilier 02</div>
                  <h2 className="text-2xl sm:text-3xl font-black text-[#f5f0e8] tracking-tight">
                    L'Axe HPA — L'Exécutif du Stress
                  </h2>
                </div>
              </div>

              <p className="text-base sm:text-lg text-[#f5f0e8]/90 leading-relaxed font-light">
                L'<strong className="text-[#93c5fd] font-semibold">axe HPA</strong> (Hypothalamus-Hypophyse-Surrénales) est le système qui gère votre réponse au stress. C'est lui qui produit le cortisol — l'hormone qui vous réveille le matin, qui vous mobilise face au danger, et qui régule votre immunité.
              </p>

              {/* Comment il fonctionne */}
              <div className="p-5 rounded-xl bg-[#0d1117] border border-[#30363d] space-y-2">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#c9a84c]">
                  Comment il fonctionne
                </h3>
                <p className="text-xs sm:text-sm text-[#b8b8b8] leading-relaxed">
                  Le stress perçu active l'hypothalamus, qui envoie un signal à l'hypophyse, qui envoie un signal aux surrénales. Les surrénales libèrent le cortisol. En temps normal, le cortisol monte le matin et descend le soir selon un cycle circadien protecteur.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-6 pt-2">
                {/* Ce qui le dérègle */}
                <div className="p-5 rounded-xl bg-[#0d1117] border border-[#8b3a3a]/40 space-y-3">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[#f87171] flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-[#f87171]" />
                    Ce qui le dérègle
                  </h3>
                  <ul className="text-xs sm:text-sm text-[#b8b8b8] space-y-2 list-disc pl-4 leading-relaxed">
                    <li>Le stress chronique (travail, finances, relations)</li>
                    <li>Le manque de sommeil</li>
                    <li>La dysbiose intestinale (endotoxines LPS)</li>
                    <li>Le trauma non résolu</li>
                    <li>L'épigénétique héritée (gène FKBP5)</li>
                  </ul>
                </div>

                {/* Ce qui le restaure */}
                <div className="p-5 rounded-xl bg-[#0d1117] border border-[#2d5016] space-y-3">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[#86efac] flex items-center gap-2">
                    <RefreshCw className="w-4 h-4 text-[#86efac]" />
                    Ce qui le restaure
                  </h3>
                  <ul className="text-xs sm:text-sm text-[#b8b8b8] space-y-2 list-disc pl-4 leading-relaxed">
                    <li><strong className="text-[#f5f0e8]">Ashwagandha</strong> (withanolides)</li>
                    <li><strong className="text-[#f5f0e8]">Rhodiola rosea</strong> (salidroside)</li>
                    <li><strong className="text-[#f5f0e8]">Phosphatidylsérine</strong></li>
                    <li><strong className="text-[#f5f0e8]">Magnésium bisglycinate</strong> le soir</li>
                    <li><strong className="text-[#f5f0e8]">Cohérence cardiaque</strong> (3 × 5 min/jour)</li>
                    <li><strong className="text-[#f5f0e8]">Sommeil régulier</strong> 7-8h, coucher avant 23h</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* SECTION 3 — LE FASCIA & L'INTERSTITIUM */}
            <section id="fascia" className="p-6 sm:p-10 rounded-2xl bg-[#161b22] border border-[#30363d] space-y-6 shadow-xl transition-all hover:border-[#e879f9]/50">
              <div className="flex items-center gap-3">
                <span className="text-3xl">🕸️</span>
                <div>
                  <div className="text-[10px] font-mono text-[#e879f9] uppercase tracking-widest font-bold">Pilier 03</div>
                  <h2 className="text-2xl sm:text-3xl font-black text-[#f5f0e8] tracking-tight">
                    Le Fascia — La Mémoire du Corps
                  </h2>
                </div>
              </div>

              <p className="text-base sm:text-lg text-[#f5f0e8]/90 leading-relaxed font-light">
                Le <strong className="text-[#e879f9] font-semibold">fascia</strong> est le tissu conjonctif qui enveloppe chaque organe, chaque muscle, chaque nerf. Longtemps considéré comme un simple emballage passif, il est aujourd'hui reconnu comme un <strong className="text-[#f5f0e8] font-semibold">organe sensoriel à part entière (2021)</strong>.
              </p>

              {/* Ce qu'il fait */}
              <div className="p-5 rounded-xl bg-[#0d1117] border border-[#30363d] space-y-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#c9a84c]">
                  Ce qu'il fait
                </h3>
                <ul className="text-xs sm:text-sm text-[#b8b8b8] space-y-2 list-disc pl-4 leading-relaxed">
                  <li><strong className="text-[#f5f0e8]">Structure :</strong> il maintient l'architecture tridimensionnelle du corps entier.</li>
                  <li><strong className="text-[#f5f0e8]">Communication :</strong> il est piézoélectrique — chaque pression mécanique devient un signal électrique instantané.</li>
                  <li><strong className="text-[#f5f0e8]">Mémoire :</strong> il stocke et retient les tensions physiques et émotionnelles anciennes.</li>
                  <li><strong className="text-[#f5f0e8]">Lien avec le nerf vague :</strong> il est l'infrastructure conjonctive vivante dans laquelle chemine le nerf vague.</li>
                </ul>
              </div>

              <div className="grid sm:grid-cols-2 gap-6 pt-2">
                {/* Ce qui le rigidifie */}
                <div className="p-5 rounded-xl bg-[#0d1117] border border-[#8b3a3a]/40 space-y-3">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[#f87171] flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-[#f87171]" />
                    Ce qui le rigidifie
                  </h3>
                  <ul className="text-xs sm:text-sm text-[#b8b8b8] space-y-2 list-disc pl-4 leading-relaxed">
                    <li>Le stress chronique (imprégnation de cortisol)</li>
                    <li>Le manque de mouvement et la sédentarité</li>
                    <li>Les traumatismes physiques et émotionnels</li>
                    <li>La déshydratation des matrices extracellulaires</li>
                    <li>L'inflammation chronique de bas grade</li>
                  </ul>
                </div>

                {/* Ce qui le libère */}
                <div className="p-5 rounded-xl bg-[#0d1117] border border-[#2d5016] space-y-3">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[#86efac] flex items-center gap-2">
                    <RefreshCw className="w-4 h-4 text-[#86efac]" />
                    Ce qui le libère
                  </h3>
                  <ul className="text-xs sm:text-sm text-[#b8b8b8] space-y-2 list-disc pl-4 leading-relaxed">
                    <li><strong className="text-[#f5f0e8]">Mouvement doux</strong> (yoga somatique, marche, étirements)</li>
                    <li><strong className="text-[#f5f0e8]">Cohérence cardiaque</strong> (génération de l'onde piézoélectrique)</li>
                    <li><strong className="text-[#f5f0e8]">Vibrations sonores</strong> (bols tibétains, humming / fredonnement)</li>
                    <li><strong className="text-[#f5f0e8]">Glycine</strong> (3-5g/jour) — acide aminé clé du collagène</li>
                    <li><strong className="text-[#f5f0e8]">Prêle</strong> (silice organique hautement assimilable)</li>
                    <li><strong className="text-[#f5f0e8]">Hydratation</strong> en eau structurée</li>
                  </ul>
                </div>
              </div>

              {/* L'Interstitium — Le 80e organe */}
              <div className="p-6 rounded-xl bg-[#0d1117] border-l-4 border-[#e879f9] border-y border-r border-[#30363d] space-y-3">
                <h3 className="text-base font-bold text-[#f5f0e8]">
                  L'Interstitium — Le 80e organe
                </h3>
                <p className="text-xs sm:text-sm text-[#b8b8b8] leading-relaxed">
                  En 2018, un nouveau réseau biologique a été identifié par la recherche médicale : <strong className="text-[#f5f0e8] font-semibold">l'interstitium</strong>, un réseau continu de canaux microscopiques remplis de fluide qui parcourt l'ensemble de vos organes. Il représente à lui seul <strong className="text-[#c9a84c] font-semibold">20% du fluide corporel total</strong>.
                </p>
                <p className="text-xs sm:text-sm text-[#e879f9] italic">
                  En Médecine Traditionnelle Chinoise (MTC), ce réseau était déjà décrit et documenté depuis plus de 2000 ans sous le nom de <strong>San Jiao (le Triple Réchauffeur)</strong>.
                </p>
              </div>
            </section>

            {/* SECTION 4 — LE SEC */}
            <section id="sec" className="p-6 sm:p-10 rounded-2xl bg-[#161b22] border border-[#30363d] space-y-6 shadow-xl transition-all hover:border-[#86efac]/50">
              <div className="flex items-center gap-3">
                <span className="text-3xl">🌿</span>
                <div>
                  <div className="text-[10px] font-mono text-[#86efac] uppercase tracking-widest font-bold">Pilier 04</div>
                  <h2 className="text-2xl sm:text-3xl font-black text-[#f5f0e8] tracking-tight">
                    Le SEC — Le Thermostat Synaptique
                  </h2>
                </div>
              </div>

              <p className="text-base sm:text-lg text-[#f5f0e8]/90 leading-relaxed font-light">
                Le <strong className="text-[#86efac] font-semibold">Système EndoCannabinoïde (SEC)</strong> est le seul système de signalisation <strong className="text-[#c9a84c] font-semibold">rétrograde</strong> du corps : la cellule cible envoie un signal en amont à la cellule émettrice pour lui dire <em>« trop »</em> ou <em>« pas assez »</em>. C'est un <strong className="text-[#f5f0e8] font-semibold">thermostat synaptique ultra-précis</strong>.
              </p>

              <div className="grid sm:grid-cols-3 gap-6 pt-2">
                {/* Ce qu'il régule */}
                <div className="p-5 rounded-xl bg-[#0d1117] border border-[#30363d] space-y-3">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[#c9a84c] flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#c9a84c]" />
                    Ce qu'il régule
                  </h3>
                  <ul className="text-xs sm:text-sm text-[#b8b8b8] space-y-2 list-disc pl-4 leading-relaxed">
                    <li>La douleur et la nociception</li>
                    <li>Le sommeil et les cycles lents</li>
                    <li>Le stress (via l'axe HPA)</li>
                    <li>L'inflammation systémique (récepteurs CB2)</li>
                    <li>La mémoire et l'apprentissage synaptique</li>
                    <li>L'appétit et le métabolisme énergétique</li>
                    <li>L'homéostasie immunitaire</li>
                  </ul>
                </div>

                {/* Le déficit endocannabinoïde */}
                <div className="p-5 rounded-xl bg-[#0d1117] border border-[#8b3a3a]/40 space-y-3">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[#f87171] flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-[#f87171]" />
                    Le déficit clinique (CED)
                  </h3>
                  <p className="text-xs text-[#b8b8b8] leading-relaxed">
                    Le Dr Ethan Russo a documenté que plusieurs pathologies « inexpliquées » partagent une même racine biologique : un <strong className="text-[#f87171]">SEC appauvri</strong> :
                  </p>
                  <ul className="text-xs text-[#b8b8b8] space-y-1 list-disc pl-4">
                    <li>Migraine chronique</li>
                    <li>Fibromyalgie</li>
                    <li>Syndrome de l'intestin irritable (SII)</li>
                    <li>Syndrome de stress post-traumatique (PTSD)</li>
                  </ul>
                </div>

                {/* Ce qui le nourrit */}
                <div className="p-5 rounded-xl bg-[#0d1117] border border-[#2d5016] space-y-3">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[#86efac] flex items-center gap-2">
                    <RefreshCw className="w-4 h-4 text-[#86efac]" />
                    Ce qui le nourrit
                  </h3>
                  <ul className="text-xs sm:text-sm text-[#b8b8b8] space-y-2 list-disc pl-4 leading-relaxed">
                    <li><strong className="text-[#f5f0e8]">Bêta-caryophyllène</strong> (poivre noir, copaïba, romarin)</li>
                    <li><strong className="text-[#f5f0e8]">Oméga-3 EPA/DHA</strong> (précurseurs lipidiques)</li>
                    <li><strong className="text-[#f5f0e8]">Reishi</strong> (modulation sélective CB2)</li>
                    <li><strong className="text-[#f5f0e8]">Réduction de NF-κB</strong> (curcuma, boswellia)</li>
                    <li><strong className="text-[#f5f0e8]">Mouvement régulier</strong> (le fameux « runner's high » endocannabinoïde)</li>
                  </ul>
                </div>
              </div>
            </section>
          </div>
        ) : (
          /* VUE PAYWALL / CONTENU PAYANT RÉSERVÉ AUX ABONNÉS */
          <div className="space-y-8 animate-in fade-in duration-700">
            {/* Sommaire visuel des 4 piliers verrouillés */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#161b22] border border-[#30363d] space-y-4 shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#30363d] pb-3 gap-2">
                <span className="text-xs uppercase font-mono tracking-widest text-[#c9a84c] font-bold">
                  Accès Restreint • Piliers Fondamentaux
                </span>
                <span className="text-xs font-mono text-[#b8b8b8] flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-[#c9a84c]" />
                  4 analyses approfondies réservées aux abonnés
                </span>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-[#0d1117] border border-[#30363d] flex items-start gap-3">
                  <span className="text-xl">⚙️</span>
                  <div>
                    <div className="text-xs font-bold text-[#f5f0e8] flex items-center gap-1.5">
                      <span>Pilier 01 · Le SRA</span>
                      <Lock className="w-3 h-3 text-[#c9a84c]" />
                    </div>
                    <p className="text-[11px] text-[#b8b8b8] mt-1 leading-relaxed">
                      Ubiquité cellulaire, régulation du cortisol, immunité innée, réparation ADN et co-facteurs critiques (D3/K2, zinc, magnésium).
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#0d1117] border border-[#30363d] flex items-start gap-3">
                  <span className="text-xl">🧠</span>
                  <div>
                    <div className="text-xs font-bold text-[#f5f0e8] flex items-center gap-1.5">
                      <span>Pilier 02 · L'Axe HPA</span>
                      <Lock className="w-3 h-3 text-[#c9a84c]" />
                    </div>
                    <p className="text-[11px] text-[#b8b8b8] mt-1 leading-relaxed">
                      Boucle hypothalamo-hypophyso-surrénalienne, rythme circadien du cortisol et modulation par les plantes adaptogènes majeures.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#0d1117] border border-[#30363d] flex items-start gap-3">
                  <span className="text-xl">🕸️</span>
                  <div>
                    <div className="text-xs font-bold text-[#f5f0e8] flex items-center gap-1.5">
                      <span>Pilier 03 · Le Fascia &amp; Interstitium</span>
                      <Lock className="w-3 h-3 text-[#c9a84c]" />
                    </div>
                    <p className="text-[11px] text-[#b8b8b8] mt-1 leading-relaxed">
                      Ténségrité, piézoélectricité, mémoire cellulaire somatique, le 80e organe et la gaine du nerf vague.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#0d1117] border border-[#30363d] flex items-start gap-3">
                  <span className="text-xl">🌿</span>
                  <div>
                    <div className="text-xs font-bold text-[#f5f0e8] flex items-center gap-1.5">
                      <span>Pilier 04 · Le SEC</span>
                      <Lock className="w-3 h-3 text-[#c9a84c]" />
                    </div>
                    <p className="text-[11px] text-[#b8b8b8] mt-1 leading-relaxed">
                      Signalisation rétrograde, thermostat synaptique, déficit clinique (CED) du Dr Ethan Russo et phyto-cannabinoïdes.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Carte Paywall Gate */}
            <div className="p-8 sm:p-12 rounded-[32px] bg-gradient-to-b from-[#161b22] to-[#0d1117] text-white border-2 border-[#c9a84c] shadow-2xl relative z-10 text-center space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-[#c9a84c]/20 border border-[#c9a84c]/40 text-[#c9a84c] flex items-center justify-center mx-auto shadow-inner">
                <Lock className="w-8 h-8 text-[#c9a84c]" />
              </div>

              <div className="space-y-2">
                <span className="inline-block px-4 py-1.5 rounded-full bg-[#c9a84c]/20 text-[#c9a84c] text-[10px] font-black uppercase tracking-[0.2em] border border-[#c9a84c]/30">
                  Contenu Réservé aux Abonnés Bloom
                </span>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#f5f0e8] tracking-tight">
                  Débloquez les 4 Architectures en Haute Précision
                </h3>
                <p className="text-sm sm:text-base text-[#b8b8b8] max-w-2xl mx-auto leading-relaxed font-light">
                  L'introduction et la vision d'ensemble sont libres d'accès. Rejoignez la formule Bloom Complet pour débloquer l'accès intégral aux 4 piliers physiologiques détaillés, aux protocoles de restauration et à l'ensemble de l'Académie.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-3 max-w-xl mx-auto text-left text-xs sm:text-sm text-[#f5f0e8]/90">
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#0d1117]/80 border border-[#30363d]">
                  <CheckCircle2 className="w-4 h-4 text-[#c9a84c] shrink-0" />
                  <span>SRA : Co-facteurs enzymatiques &amp; restauration membranaire</span>
                </div>
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#0d1117]/80 border border-[#30363d]">
                  <CheckCircle2 className="w-4 h-4 text-[#c9a84c] shrink-0" />
                  <span>Axe HPA : Protocoles adaptogènes Withanolides &amp; Salidrosides</span>
                </div>
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#0d1117]/80 border border-[#30363d]">
                  <CheckCircle2 className="w-4 h-4 text-[#c9a84c] shrink-0" />
                  <span>Fascia : Stimulation piézoélectrique &amp; drainage interstitiel</span>
                </div>
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#0d1117]/80 border border-[#30363d]">
                  <CheckCircle2 className="w-4 h-4 text-[#c9a84c] shrink-0" />
                  <span>SEC : Reconstitution de l'anandamide &amp; tonus endocannabinoïde</span>
                </div>
              </div>

              {/* Boutons d'action */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => onNavigate('abonnement')}
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#c9a84c] hover:bg-[#d8b85c] text-black font-bold text-sm tracking-wide transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer hover:scale-105"
                >
                  <span>Rejoindre Bloom Complet (59 €/mois)</span>
                  <ArrowRight className="w-4 h-4 text-black" />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (onRequireAuth) {
                      onRequireAuth();
                    } else {
                      onNavigate('account');
                    }
                  }}
                  className="w-full sm:w-auto px-6 py-4 rounded-xl bg-[#161b22] hover:bg-[#1c2128] text-[#f5f0e8] font-semibold text-sm border border-[#30363d] hover:border-[#c9a84c]/50 transition-all cursor-pointer"
                >
                  J'ai déjà un compte
                </button>
              </div>

              {/* Déblocage rapide par code d'accès membre */}
              <div className="pt-4 border-t border-[#30363d]/60 max-w-md mx-auto">
                <form onSubmit={handleUnlockWithCode} className="flex gap-2">
                  <input
                    type="text"
                    value={accessCode}
                    onChange={(e) => {
                      setAccessCode(e.target.value);
                      setCodeError(false);
                    }}
                    placeholder="Code d'accès membre ou email..."
                    className="flex-1 px-4 py-2.5 rounded-xl bg-[#0d1117] border border-[#30363d] focus:border-[#c9a84c] text-xs text-[#f5f0e8] placeholder:text-[#b8b8b8]/50 outline-hidden"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 rounded-xl bg-[#30363d] hover:bg-[#c9a84c] hover:text-black text-xs font-bold text-[#f5f0e8] transition-colors cursor-pointer shrink-0"
                  >
                    Valider
                  </button>
                </form>
                {codeError && (
                  <p className="text-[11px] text-red-400 mt-1.5 text-center">
                    Veuillez saisir un code membre valide ou votre email d'abonné.
                  </p>
                )}
                <p className="text-[11px] text-[#b8b8b8]/60 mt-2 text-center">
                  🔒 Sans engagement · Résiliation en 1 clic · Accès immédiat
                </p>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 5 — LA CASCADE DE DYSFONCTION */}
        <section id="cascade" className="p-6 sm:p-10 rounded-2xl bg-[#161b22] border border-[#30363d] space-y-6 shadow-xl">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🔗</span>
            <div>
              <div className="text-[10px] font-mono text-[#c9a84c] uppercase tracking-widest font-bold">Dynamique Systémique</div>
              <h2 className="text-2xl sm:text-3xl font-black text-[#f5f0e8] tracking-tight">
                Comment les 4 Architectures s'effondrent ensemble
              </h2>
            </div>
          </div>

          <div className="space-y-4 text-base sm:text-lg text-[#f5f0e8]/90 leading-relaxed font-light">
            <p>
              Un stress chronique active l'axe HPA → le cortisol chronique <strong className="text-[#f87171] font-semibold">dégrade la production d'anandamide</strong> → le SEC s'appauvrit → les synapses perdent leur régulation fine → l'inflammation, la douleur et l'anxiété s'installent.
            </p>
            <p>
              Simultanément, le cortisol chronique <strong className="text-[#f87171] font-semibold">rigidifie le fascia</strong> → les tensions fasciales compriment mécaniquement le nerf vague → la signalisation SEC est perturbée dans ses canaux de transmission.
            </p>
            <p>
              Et le SRA, dérèglé par le stress et les carences, <strong className="text-[#c9a84c] font-semibold">amplifie l'ensemble de la réaction</strong>.
            </p>
          </div>

          {/* Encadré d'or */}
          <div className="p-6 sm:p-8 rounded-xl bg-[#0d1117] border-l-4 border-[#c9a84c] border border-[#30363d] space-y-3">
            <p className="text-base sm:text-lg font-bold text-[#f5f0e8]">
              Un axe HPA chroniquement activé épuise le SEC et rigidifie le fascia. Et un SEC déficient laisse l'axe HPA en hyperactivité permanente faute de régulateur.
            </p>
            <p className="text-sm text-[#c9a84c] font-medium italic">
              C'est la boucle infernale complète de la maladie chronique.
            </p>
          </div>
        </section>

        {/* SECTION 6 — CE QUE CELA CHANGE POUR VOUS */}
        <section id="impact" className="p-6 sm:p-10 rounded-2xl bg-[#161b22] border border-[#30363d] space-y-6 shadow-xl">
          <div className="flex items-center gap-3">
            <span className="text-3xl">💡</span>
            <div>
              <div className="text-[10px] font-mono text-[#c9a84c] uppercase tracking-widest font-bold">Implication Thérapeutique</div>
              <h2 className="text-2xl sm:text-3xl font-black text-[#f5f0e8] tracking-tight">
                Ce que cela change pour vous
              </h2>
            </div>
          </div>

          <div className="space-y-4 text-base sm:text-lg text-[#f5f0e8]/90 leading-relaxed font-light">
            <p>
              Si vous souffrez d'une condition chronique — <strong className="text-[#f5f0e8]">psoriasis, eczéma, SIBO, fatigue profonde, douleurs erratiques ou anxiété</strong> — vous ne souffrez pas d'un problème isolé. Vous souffrez d'un <strong className="text-[#c9a84c] font-semibold">déséquilibre interconnecté des 4 architectures</strong>.
            </p>
            <p className="text-[#b8b8b8]">
              C'est pour cela que les traitements symptomatiques ne fonctionnent pas durablement. Ils traitent la conséquence superficielle, jamais la cause systémique.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-[#2d5016]/30 border border-[#86efac]/30 text-center sm:text-left space-y-2">
            <p className="text-lg sm:text-xl font-bold text-[#86efac]">
              Bloom ne traite pas les symptômes isolés. Bloom restaure les 4 architectures.
            </p>
            <p className="text-xs sm:text-sm text-[#f5f0e8]/80 font-light">
              Par l'extraction du Totum végétal, le séquençage A/B et le reset des terrains biologiques.
            </p>
          </div>
        </section>

        {/* CTA FINAL */}
        <section className="p-8 sm:p-12 rounded-2xl bg-gradient-to-br from-[#161b22] via-[#0d1117] to-[#161b22] border border-[#c9a84c]/40 text-center space-y-6 shadow-2xl">
          <div className="max-w-2xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-4xl font-black text-[#f5f0e8] tracking-tight">
              Prêt à comprendre le corps en profondeur ?
            </h2>
            <p className="text-sm sm:text-base text-[#b8b8b8] leading-relaxed">
              Explorez les 7 Terrains, les 9 Axes et le Reset Homéostasique pour restaurer durablement vos équilibres.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={() => onNavigate('terrain')}
              className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-[#c9a84c] hover:bg-[#d8b85c] text-[#0d1117] font-bold text-sm tracking-wide shadow-lg hover:scale-105 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Découvrir les 7 Terrains</span>
              <ArrowRight className="w-4 h-4 text-[#0d1117]" />
            </button>

            <button
              onClick={() => onNavigate('phytotherapie-reset')}
              className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-[#161b22] hover:bg-[#1c2128] text-[#f5f0e8] hover:text-[#c9a84c] font-bold text-sm tracking-wide border border-[#30363d] hover:border-[#c9a84c] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Activity className="w-4 h-4 text-[#c9a84c]" />
              <span>Voir les Protocoles</span>
            </button>
          </div>

          <div className="pt-6 border-t border-[#30363d] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#b8b8b8]">
            <span className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#86efac]" />
              Transmission scientifique et biologique Bloom Académie
            </span>
            <button
              onClick={() => onNavigate('chat')}
              className="text-[#c9a84c] hover:underline flex items-center gap-1.5 cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Échanger avec ALMA sur vos architectures</span>
            </button>
          </div>
        </section>

      </main>
    </article>
  );
};

export default Les4ArchitecturesContent;
