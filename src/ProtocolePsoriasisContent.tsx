import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  AlertTriangle, 
  Clock, 
  Droplets, 
  Sparkles, 
  Lock, 
  CheckCircle2, 
  ArrowRight, 
  Printer, 
  Share2, 
  BookOpen, 
  Activity, 
  Heart, 
  Flame, 
  Leaf, 
  ChevronRight, 
  Info,
  Calendar,
  Layers,
  FileText,
  Sun,
  Moon,
  Coffee,
  Check
} from 'lucide-react';
import { View } from './types';
import { Language } from './translations';
import { TooltipLexique } from './components/TooltipLexique';
import { GlossaryProvider } from './context/GlossaryContext';

interface ProtocolePsoriasisContentProps {
  isPremium: boolean;
  onNavigate: (view: View, param?: string) => void;
  onRequireAuth: () => void;
  lang: Language;
}

export const MEDICAL_DISCLAIMER = "Ce protocole relève de la phytothérapie intégrale et de l'hygiène de vie. Il ne se substitue en aucun cas à un diagnostic médical ni aux prescriptions de votre dermatologue. Ne jamais interrompre un traitement en cours sans l'avis d'un professionnel de santé.";

export default function ProtocolePsoriasisContent({
  isPremium,
  onNavigate,
  onRequireAuth,
  lang
}: ProtocolePsoriasisContentProps) {
  const [activeTab, setActiveTab] = useState<'sommaire' | 'phase0' | 'phase1' | 'phase2' | 'phase3' | 'carnet'>('sommaire');
  const [copiedLink, setCopiedLink] = useState(false);

  // Track paywall view if user is not premium
  useEffect(() => {
    if (!isPremium) {
      if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
        (window as any).gtag('event', 'paywall_view', {
          protocol_id: 'psoriasis',
          content_type: 'protocol_phase0_sequence',
          location: 'protocole_psoriasis'
        });
      }
      if (typeof window !== 'undefined' && Array.isArray((window as any).dataLayer)) {
        (window as any).dataLayer.push({
          event: 'paywall_view',
          protocol_id: 'psoriasis',
          content_type: 'protocol_phase0_sequence'
        });
      }
    }
  }, [isPremium]);

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  const handleShare = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText('https://bloombybotanik.com/phytotherapie-reset/protocole-psoriasis/');
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const trackCtaClick = (actionName: string) => {
    if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
      (window as any).gtag('event', 'paywall_cta_click', {
        action: actionName,
        protocol: 'psoriasis'
      });
    }
    if (typeof window !== 'undefined' && Array.isArray((window as any).dataLayer)) {
      (window as any).dataLayer.push({
        event: 'paywall_cta_click',
        action: actionName,
        protocol: 'psoriasis'
      });
    }
  };

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      try {
        window.history.pushState(null, '', `#${id}`);
      } catch (_) {}
    }
  };

  return (
    <GlossaryProvider pageKey="protocole-psoriasis">
      <article className="min-h-screen bg-[#FAF7F2] text-[#0F261E] pb-24 selection:bg-[#D97706]/20 selection:text-[#0F261E]">
      {/* Print Stylesheet Hook */}
      <style>{`
        @media print {
          nav, aside, header, footer, .no-print {
            display: none !important;
          }
          body, article {
            background: #ffffff !important;
            color: #000000 !important;
          }
          .print-break-inside-avoid {
            break-inside: avoid;
            page-break-inside: avoid;
          }
        }
      `}</style>

      {/* 1. Top Breadcrumb & Actions Bar */}
      <div className="border-b border-[#E7DFD3] bg-[#FAF7F2]/80 backdrop-blur-md sticky top-0 z-30 no-print">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#0F261E]/70 overflow-hidden text-ellipsis whitespace-nowrap">
            <button 
              onClick={() => onNavigate('home')} 
              className="hover:text-[#D97706] transition-colors cursor-pointer"
            >
              Accueil
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-[#0F261E]/40 shrink-0" />
            <button 
              onClick={() => onNavigate('phytotherapie-reset')} 
              className="hover:text-[#D97706] transition-colors cursor-pointer"
            >
              Phytothérapie Reset
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-[#0F261E]/40 shrink-0" />
            <span className="text-[#0F261E] font-bold truncate">Protocole Psoriasis</span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleShare}
              className="px-3 py-1.5 rounded-xl border border-[#0F261E]/15 text-[#0F261E] hover:bg-[#0F261E]/5 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
              title="Partager le lien"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{copiedLink ? 'Lien copié !' : 'Partager'}</span>
            </button>

            {isPremium && (
              <button
                onClick={handlePrint}
                className="px-3.5 py-1.5 rounded-xl bg-[#0F261E] hover:bg-[#D97706] text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
                title="Imprimer ou enregistrer en PDF"
              >
                <Printer className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Télécharger le PDF</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 2. Hero Header Section */}
      <header className="pt-12 pb-14 px-4 sm:px-6 bg-gradient-to-b from-[#FAF7F2] via-[#F4EFE6] to-[#FAF7F2] border-b border-[#E7DFD3]">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1C3F34] text-white text-[11px] font-black uppercase tracking-[0.2em] mb-6 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#D97706]" />
            <span>Reset Homéostasique — Terrain Thérapeutique</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-[#0F261E] tracking-tight leading-[1.1] mb-6">
            Protocole Psoriasis
          </h1>

          <p className="text-base sm:text-xl text-[#0F261E]/80 max-w-2xl mx-auto font-medium leading-relaxed mb-8">
            Accompagner le <TooltipLexique terme="terrain">terrain</TooltipLexique> psoriasique (profil de vulnérabilité génétique, épigénétique et allostatique), déverrouiller les <TooltipLexique terme="emonctoires">émonctoires</TooltipLexique> profonds et apaiser le spectre de <TooltipLexique terme="charge-allostatique">charges allostatiques accumulées</TooltipLexique> par la phytothérapie intégrale de haute précision.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-bold">
            <span className="px-3.5 py-1.5 rounded-xl bg-white border border-[#E7DFD3] text-[#0F261E] shadow-xs flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-[#D97706]" /> 14 Semaines (Phases 0 à 3)
            </span>
            <span className="px-3.5 py-1.5 rounded-xl bg-white border border-[#E7DFD3] text-[#0F261E] shadow-xs flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-[#1C3F34]" /> Axe Intestin - Foie - Peau
            </span>
            <span className="px-3.5 py-1.5 rounded-xl bg-white border border-[#E7DFD3] text-[#0F261E] shadow-xs flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-[#B45309]" /> Sécurité & Binders Inclus
            </span>
          </div>
        </div>
      </header>

      {/* 3. Avertissement Médical Verbatim — Haut de page */}
      <section id="avertissement-top" className="max-w-4xl mx-auto px-4 sm:px-6 pt-10">
        <div className="p-6 sm:p-7 rounded-3xl bg-[#FEF3C7]/40 border-2 border-[#D97706]/40 text-[#78350F] shadow-sm">
          <div className="flex items-start gap-3.5">
            <AlertTriangle className="w-6 h-6 text-[#D97706] shrink-0 mt-0.5" />
            <div className="space-y-2">
              <h2 className="text-xs font-black uppercase tracking-widest text-[#92400E]">
                Avertissement Médical et Légal
              </h2>
              <p className="text-xs sm:text-sm leading-relaxed text-[#78350F] font-normal">
                {MEDICAL_DISCLAIMER}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Sticky Sommaire / Navigation Rapide */}
      <nav 
        id="sommaire" 
        className="max-w-4xl mx-auto px-4 sm:px-6 pt-8 pb-4 sticky top-[53px] z-20 bg-[#FAF7F2]/90 backdrop-blur-md no-print"
        aria-label="Sommaire du protocole"
      >
        <div className="p-2 rounded-2xl bg-white border border-[#E7DFD3] shadow-xs flex items-center gap-1 overflow-x-auto scrollbar-none text-xs font-bold text-[#0F261E]/70">
          <a 
            href="#avant-propos" 
            onClick={(e) => scrollToSection(e, 'avant-propos')}
            className="px-3 py-1.5 rounded-xl hover:bg-[#FAF7F2] hover:text-[#D97706] whitespace-nowrap transition-colors"
          >
            Avant-propos
          </a>
          <span className="text-[#0F261E]/20">•</span>
          <a 
            href="#prerequis" 
            onClick={(e) => scrollToSection(e, 'prerequis')}
            className="px-3 py-1.5 rounded-xl hover:bg-[#FAF7F2] hover:text-[#D97706] whitespace-nowrap transition-colors"
          >
            4 Prérequis
          </a>
          <span className="text-[#0F261E]/20">•</span>
          <a 
            href="#securite-regles" 
            onClick={(e) => scrollToSection(e, 'securite-regles')}
            className="px-3 py-1.5 rounded-xl hover:bg-[#FAF7F2] hover:text-[#D97706] whitespace-nowrap transition-colors"
          >
            Règles de Sécurité
          </a>
          <span className="text-[#0F261E]/20">•</span>
          <a 
            href="#phase-0" 
            onClick={(e) => scrollToSection(e, 'phase-0')}
            className="px-3 py-1.5 rounded-xl hover:bg-[#FAF7F2] hover:text-[#D97706] whitespace-nowrap transition-colors"
          >
            Phase 0
          </a>
          <span className="text-[#0F261E]/20">•</span>
          <a 
            href="#phase-1" 
            onClick={(e) => scrollToSection(e, 'phase-1')}
            className="px-3 py-1.5 rounded-xl hover:bg-[#FAF7F2] hover:text-[#D97706] whitespace-nowrap transition-colors"
          >
            Phase 1
          </a>
          <span className="text-[#0F261E]/20">•</span>
          <a 
            href="#phase-2" 
            onClick={(e) => scrollToSection(e, 'phase-2')}
            className="px-3 py-1.5 rounded-xl hover:bg-[#FAF7F2] hover:text-[#D97706] whitespace-nowrap transition-colors"
          >
            Phase 2
          </a>
          <span className="text-[#0F261E]/20">•</span>
          <a 
            href="#phase-3" 
            onClick={(e) => scrollToSection(e, 'phase-3')}
            className="px-3 py-1.5 rounded-xl hover:bg-[#FAF7F2] hover:text-[#D97706] whitespace-nowrap transition-colors"
          >
            Phase 3
          </a>
          <span className="text-[#0F261E]/20">•</span>
          <a 
            href="#regles-dor" 
            onClick={(e) => scrollToSection(e, 'regles-dor')}
            className="px-3 py-1.5 rounded-xl hover:bg-[#FAF7F2] hover:text-[#D97706] whitespace-nowrap transition-colors"
          >
            Règles d'or
          </a>
          <span className="text-[#0F261E]/20">•</span>
          <a 
            href="#observations" 
            onClick={(e) => scrollToSection(e, 'observations')}
            className="px-3 py-1.5 rounded-xl hover:bg-[#FAF7F2] hover:text-[#D97706] whitespace-nowrap transition-colors"
          >
            Observations
          </a>
          <span className="text-[#0F261E]/20">•</span>
          <a 
            href="#carnet-de-bord" 
            onClick={(e) => scrollToSection(e, 'carnet-de-bord')}
            className="px-3 py-1.5 rounded-xl hover:bg-[#FAF7F2] hover:text-[#D97706] whitespace-nowrap transition-colors"
          >
            Carnet de bord
          </a>
        </div>
      </nav>

      {/* 5. Main Article Body */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-6 space-y-16">
        
        {/* SECTION : Avant-propos */}
        <section id="avant-propos" className="scroll-mt-36">
          <div className="bg-white p-8 sm:p-10 rounded-[36px] border border-[#E7DFD3] shadow-xs">
            <div className="text-[10px] font-black uppercase tracking-[0.25em] text-[#D97706] mb-3">
              I. Vision Systémique
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0F261E] mb-6">
              Avant-propos : Votre corps n'est pas cassé. Il est verrouillé.
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-[#0F261E]/80 leading-relaxed font-normal">
              <p>
                Le psoriasis n'est pas une anomalie cutanée fortuite ou isolée. La peau n'est pas le siège primaire de la problématique : elle n'est que l'écran d'affichage d'un emballement inflammatoire systémique et d'une congestion émonctorielle profonde.
              </p>
              <p>
                Lorsque les voies normales d'élimination — le filtre hépatique, la barrière entérocytaire et la clairance rénale — se trouvent saturées par des complexes immuns et des métabolites pro-inflammatoires, l'organisme mobilise son filtre de dérivation de dernier recours : le derme. L'hyperprolifération kératinocytaire et les plaques épidermiques témoignent de cet effort adaptatif excessif mais logique.
              </p>
              <p>
                Notre démarche de <strong>Reset Homéostasique</strong> ne cherche pas à réprimer le symptôme de manière belliqueuse. Elle vise à accompagner le terrain psoriasique en restaurant la perméabilité de la muqueuse intestinale, en réouvrant les filtres physiologiques et en régulant la pharmacie intérieure via la synergie intégrale du Totum végétal.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION : Les 4 Prérequis Non Négociables */}
        <section id="prerequis" className="scroll-mt-36">
          <div className="text-[10px] font-black uppercase tracking-[0.25em] text-[#D97706] mb-3">
            II. Fondations du Terrain
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0F261E] mb-6">
            Les 4 Prérequis Non Négociables
          </h2>
          <p className="text-sm sm:text-base text-[#0F261E]/80 leading-relaxed mb-8">
            Aucun protocole de reset homéostasique ne peut être initié sur un organisme verrouillé sans avoir préalablement validé ces 4 piliers indispensables.
          </p>

          <div className="grid sm:grid-cols-2 gap-5">
            <div className="p-6 bg-white rounded-3xl border border-[#E7DFD3] shadow-xs hover:border-[#D97706]/40 transition-colors">
              <div className="w-10 h-10 rounded-2xl bg-[#EAF2ED] text-[#1C3F34] flex items-center justify-center font-black text-sm mb-4">
                1
              </div>
              <h3 className="font-bold text-base text-[#0F261E] mb-2">
                Émonctoires ouverts & transit quotidien actif
              </h3>
              <p className="text-xs sm:text-sm text-[#0F261E]/70 leading-relaxed">
                Une évacuation intestinale quotidienne (1 à 2 selles moulées par jour) est impérative. En cas de constipation, drainer la peau refoulerait les toxines dans le sang et amplifierait les manifestations cutanées.
              </p>
            </div>

            <div className="p-6 bg-white rounded-3xl border border-[#E7DFD3] shadow-xs hover:border-[#D97706]/40 transition-colors">
              <div className="w-10 h-10 rounded-2xl bg-[#EAF2ED] text-[#1C3F34] flex items-center justify-center font-black text-sm mb-4">
                2
              </div>
              <h3 className="font-bold text-base text-[#0F261E] mb-2">
                Hydratation de précision & charge minérale
              </h3>
              <p className="text-xs sm:text-sm text-[#0F261E]/70 leading-relaxed">
                Consommer 1,5 à 2 litres d'eau peu minéralisée par jour, enrichie d'une pincée d'électrolytes ou d'un hydrolat végétal doux pour maintenir le débit de filtration glomérulaire sans surcharger les reins.
              </p>
            </div>

            <div className="p-6 bg-white rounded-3xl border border-[#E7DFD3] shadow-xs hover:border-[#D97706]/40 transition-colors">
              <div className="w-10 h-10 rounded-2xl bg-[#FAF2E6] text-[#92400E] flex items-center justify-center font-black text-sm mb-4">
                3
              </div>
              <h3 className="font-bold text-base text-[#0F261E] mb-2">
                Fenêtre thérapeutique & diète hypotoxique
              </h3>
              <p className="text-xs sm:text-sm text-[#0F261E]/70 leading-relaxed">
                Éviction absolue de l'alcool, du tabac, des produits ultra-transformés et des huiles végétales riches en oméga-6 pro-oxydés. Réduire drastiquement le sucre blanc et les céréales raffinées.
              </p>
            </div>

            <div className="p-6 bg-white rounded-3xl border border-[#E7DFD3] shadow-xs hover:border-[#D97706]/40 transition-colors">
              <div className="w-10 h-10 rounded-2xl bg-[#FAF2E6] text-[#92400E] flex items-center justify-center font-black text-sm mb-4">
                4
              </div>
              <h3 className="font-bold text-base text-[#0F261E] mb-2">
                Suivi médical & absence de contre-indications
              </h3>
              <p className="text-xs sm:text-sm text-[#0F261E]/70 leading-relaxed">
                Le protocole accompagne le terrain et ne remplace jamais les traitements dermatologiques. Contre-indiqué en cas de grossesse, d'allaitement, d'insuffisance rénale ou hépatique décompensée.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION : Encart Sécurité Public (3 Règles Absolues) */}
        <section id="securite-regles" className="scroll-mt-36">
          <div className="p-8 sm:p-10 rounded-[36px] bg-[#0F261E] text-white border border-[#1C3F34] shadow-xl relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <Shield className="w-6 h-6 text-[#D97706]" />
                <span className="text-xs font-black uppercase tracking-[0.25em] text-[#D97706]">
                  Sécurité Publique Impérative
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black mb-6 text-white">
                Les 3 Règles d'Or de Sécurité Thérapeutique
              </h2>
              <div className="space-y-6 text-sm sm:text-base text-white/90">
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                  <span className="w-7 h-7 rounded-full bg-[#D97706] text-white flex items-center justify-center text-xs font-black shrink-0 mt-0.5">
                    A
                  </span>
                  <div>
                    <h3 className="font-bold text-white mb-1">
                      Prise de Binder 45 à 60 minutes après tout remède ou tisane active
                    </h3>
                    <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                      L'activation des émonctoires libère des métabolites dans l'intestin. Le binder (Charbon végétal activé ou Zéolite clinoptilolite) piège ces endotoxines pour éviter le cycle entéro-hépatique de réabsorption.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                  <span className="w-7 h-7 rounded-full bg-[#D97706] text-white flex items-center justify-center text-xs font-black shrink-0 mt-0.5">
                    B
                  </span>
                  <div>
                    <h3 className="font-bold text-white mb-1">
                      Délai incompressible de 2 heures avec tout médicament prescrit
                    </h3>
                    <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                      Tout adsorbant ou préparation phytothérapeutique doit être consommé à 2 heures minimum d'intervalle de vos médicaments de synthèse afin de ne pas altérer leur cinétique plasmatique.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                  <span className="w-7 h-7 rounded-full bg-[#D97706] text-white flex items-center justify-center text-xs font-black shrink-0 mt-0.5">
                    C
                  </span>
                  <div>
                    <h3 className="font-bold text-white mb-1">
                      Phase 0 non négociable & suivi médical indispensable
                    </h3>
                    <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                      Ne passez jamais aux phases de dépuration profonde sans les 2 semaines préalables de la Phase 0. Tout changement d'état doit être rapporté à votre praticien de santé.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION : Phase 0 (Zone Gratuite -> Déclencheur du Paywall) */}
        <section id="phase-0" className="scroll-mt-36">
          <div className="text-[10px] font-black uppercase tracking-[0.25em] text-[#D97706] mb-3">
            III. Préparation Émonctorielle
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-[#0F261E] mb-4">
            Phase 0 : Déverrouillage des Émonctoires & Amorçage Hépato-Rénal
          </h2>
          <div className="flex flex-wrap items-center gap-3 mb-6 text-xs font-bold">
            <span className="px-3 py-1 rounded-lg bg-[#EAF2ED] text-[#1C3F34] border border-[#D2E2D8]">
              Durée : Semaines 1 à 2
            </span>
            <span className="px-3 py-1 rounded-lg bg-white text-[#0F261E] border border-[#E7DFD3]">
              Cible : Foie, Reins, Motilité Intestinale
            </span>
          </div>

          {/* Encadré Pourquoi cette phase : Risque Jarisch-Herxheimer */}
          <div className="p-7 rounded-3xl bg-[#FAF2E6] border border-[#EEDFC6] mb-8">
            <div className="flex items-center gap-2.5 text-[#92400E] font-black text-xs uppercase tracking-widest mb-3">
              <Info className="w-4 h-4" />
              Pourquoi cette phase : La prévention de la <TooltipLexique terme="jarisch-herxheimer">réaction de Jarisch-Herxheimer</TooltipLexique>
            </div>
            <p className="text-sm text-[#0F261E]/80 leading-relaxed font-normal mb-3">
              Tenter de mobiliser et libérer les charges de la peau dès le premier jour est l'erreur la plus fréquente. Si les <TooltipLexique terme="emonctoires">émonctoires</TooltipLexique> principaux ne sont pas grand ouverts, la mise en circulation brutale d'endotoxines (<TooltipLexique terme="lps-endotoxines">LPS</TooltipLexique>) et de complexes antigéniques provoque un engorgement métabolique aigu, assimilable à une <em>réaction de Jarisch-Herxheimer</em>.
            </p>
            <p className="text-sm text-[#0F261E]/80 leading-relaxed font-normal">
              Les conséquences immédiates : poussée squameuse fulgurante, prurit violent, céphalées et épuisement. La Phase 0 prépare le lit émonctoriel, fluidifie la bile et stimule l'élimination rénale en douceur avant toute mobilisation tissulaire profonde.
            </p>
          </div>

          {/* Tableau Séquences Phase 0 (Accessible à tous) */}
          <div className="mt-8 bg-white rounded-3xl border border-[#E7DFD3] p-6 sm:p-8 shadow-xs overflow-hidden print-break-inside-avoid">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-xl bg-[#D97706]/15 text-[#D97706] flex items-center justify-center">
                <Sun className="w-4 h-4" />
              </div>
              <h3 className="text-xl font-black text-[#0F261E]">
                Protocole Quotidien — Phase 0 (Semaines 1-2)
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-[#E7DFD3] text-[#0F261E]/60 font-black uppercase text-[10px] tracking-wider">
                    <th className="py-3 px-3">Moment</th>
                    <th className="py-3 px-3">Plantes & Synergies</th>
                    <th className="py-3 px-3">Paramètres BloomLab</th>
                    <th className="py-3 px-3">Posologie</th>
                    <th className="py-3 px-3">Sécurité / Binder</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E7DFD3]/60">
                  <tr>
                    <td className="py-3 px-3 font-bold text-[#0F261E]">Réveil (à jeun)</td>
                    <td className="py-3 px-3">Eau tiède + Jus d'un 1/2 citron frais ou 1 c.à.s d'hydrolat de Romarin verbénone</td>
                    <td className="py-3 px-3 text-[#0F261E]/70">—</td>
                    <td className="py-3 px-3">300 ml</td>
                    <td className="py-3 px-3 text-[#1C3F34] font-semibold">Attendre 15 min avant petit-déjeuner</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3 font-bold text-[#0F261E]">Matinée (10h)</td>
                    <td className="py-3 px-3">Racine de Pissenlit (<em>Taraxacum officinale</em>) 10g + Aubier de Tilleul 10g</td>
                    <td className="py-3 px-3">
                      <span className="inline-block px-2 py-0.5 rounded bg-[#FAF2E6] text-[#92400E] text-[11px] font-bold">
                        80°C • 30 min (Phase A)
                      </span>
                    </td>
                    <td className="py-3 px-3">1 grande tasse (250 ml)</td>
                    <td className="py-3 px-3 text-[#0F261E]/70">—</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3 font-bold text-[#0F261E]">Après-midi (16h)</td>
                    <td className="py-3 px-3">Mauve (<em>Malva sylvestris</em>) 5g + Romarin (<em>Rosmarinus officinalis</em>) 5g</td>
                    <td className="py-3 px-3">
                      <span className="inline-block px-2 py-0.5 rounded bg-[#FAF2E6] text-[#92400E] text-[11px] font-bold">
                        65°C • 20 min (Mucilages)
                      </span>
                    </td>
                    <td className="py-3 px-3">200 ml</td>
                    <td className="py-3 px-3 text-[#B45309] font-bold">
                      1 c.à.c de Charbon actif 50 min après
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3 font-bold text-[#0F261E]">Soirée (21h)</td>
                    <td className="py-3 px-3">Mélisse (<em>Melissa officinalis</em>) + Camomille matricaire (<em>Matricaria chamomilla</em>)</td>
                    <td className="py-3 px-3">
                      <span className="inline-block px-2 py-0.5 rounded bg-[#FAF2E6] text-[#92400E] text-[11px] font-bold">
                        75°C • 15 min
                      </span>
                    </td>
                    <td className="py-3 px-3">200 ml</td>
                    <td className="py-3 px-3 text-[#1C3F34] font-semibold">2h après tout repas ou médicament</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* PHASE 1 */}
        <section id="phase-1" className="scroll-mt-32 sm:scroll-mt-36 print-break-inside-avoid">
          <div className="text-[10px] font-black uppercase tracking-[0.25em] text-[#D97706] mb-2">
            IV. Phase d'Attaque
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0F261E] mb-4">
            Phase 1 : Drainage Systémique & Axe Intestin-Peau (Semaines 3 à 6)
          </h2>
          <p className="text-sm text-[#0F261E]/80 leading-relaxed mb-6 font-normal">
            L'objectif de cette phase est de drainer le sang et la lymphe sans surcharger les émonctoires, tout en restaurant l'imperméabilité des jonctions serrées intestinales (lutte contre le <em>leaky gut</em>).
          </p>

          {/* Encadré Pourquoi ces plantes : Bardane et Salsepareille */}
          <div className="p-7 rounded-3xl bg-[#FAF2E6] border border-[#EEDFC6] mb-6">
            <div className="flex items-center gap-2.5 text-[#92400E] font-black text-xs uppercase tracking-widest mb-3">
              <Leaf className="w-4 h-4" />
              Pourquoi cette synergie : Bardane et Salsepareille
            </div>
            <p className="text-sm text-[#0F261E]/80 leading-relaxed font-normal mb-3">
              <strong>La Bardane (<em>Arctium lappa</em>)</strong> est le grand dépuratif royal du terrain psoriasique. Riche en inuline prébiotique, elle réensemence la flore anti-inflammatoire et favorise l'élimination des toxines par la voie hépato-biliaire.
            </p>
            <p className="text-sm text-[#0F261E]/80 leading-relaxed font-normal">
              <strong>La Salsepareille (<em>Smilax medica</em>)</strong> possède une affinité remarquable pour les endotoxines bactériennes circulantes (LPS), qu'elle complexe et neutralise avant qu'elles ne parviennent à l'épiderme.
            </p>
          </div>

          {isPremium ? (
            /* Tableau Phase 1 débloqué */
            <div className="bg-white rounded-3xl border border-[#E7DFD3] p-6 sm:p-8 shadow-xs overflow-hidden premium-paywall-content">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-[#E7DFD3] text-[#0F261E]/60 font-black uppercase text-[10px] tracking-wider">
                      <th className="py-3 px-3">Moment</th>
                      <th className="py-3 px-3">Synergie Végétale Totum</th>
                      <th className="py-3 px-3">Extraction BloomLab</th>
                      <th className="py-3 px-3">Dose journalière</th>
                      <th className="py-3 px-3">Binder & Espacement</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E7DFD3]/60">
                    <tr>
                      <td className="py-3 px-3 font-bold">Matin (jeûn)</td>
                      <td className="py-3 px-3">Racine de Bardane concassée (20g) + Pensée sauvage (10g)</td>
                      <td className="py-3 px-3">
                        <span className="inline-block px-2 py-0.5 rounded bg-[#FAF2E6] text-[#92400E] text-[11px] font-bold">
                          Phase A : 75°C • 45 min
                        </span>
                      </td>
                      <td className="py-3 px-3">250 ml</td>
                      <td className="py-3 px-3 text-[#0F261E]/70">—</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-3 font-bold">Midi (12h30)</td>
                      <td className="py-3 px-3">Salsepareille racine (15g) + Romarin officinal (5g)</td>
                      <td className="py-3 px-3">
                        <span className="inline-block px-2 py-0.5 rounded bg-[#FAF2E6] text-[#92400E] text-[11px] font-bold">
                          Phase A : 80°C • 30 min
                        </span>
                      </td>
                      <td className="py-3 px-3">200 ml</td>
                      <td className="py-3 px-3 text-[#B45309] font-bold">
                        Zéolite clinoptilolite 1 c.à.c 1h après
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-3 font-bold">Soir (20h30)</td>
                      <td className="py-3 px-3">Ortie racine (10g) + Mélisse (10g) + L-Glutamine (3g)</td>
                      <td className="py-3 px-3">
                        <span className="inline-block px-2 py-0.5 rounded bg-[#FAF2E6] text-[#92400E] text-[11px] font-bold">
                          Phase A : 65°C • 20 min
                        </span>
                      </td>
                      <td className="py-3 px-3">250 ml</td>
                      <td className="py-3 px-3 text-[#1C3F34] font-semibold">
                        Distance de 2h avec médicaments
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            /* Teaser + Paywall Gate */
            <div className="space-y-6">
              <div 
                className="bg-white rounded-3xl border border-[#E7DFD3] p-6 select-none overflow-hidden filter blur-[2px] opacity-60 pointer-events-none"
                aria-hidden="true"
              >
                <div className="space-y-3 text-xs sm:text-sm">
                  <div className="flex justify-between border-b pb-2">
                    <span className="font-bold">Matin : Bardane concassée + Pensée sauvage</span>
                    <span className="bg-gray-100 px-2 py-0.5 rounded">Phase A • 75°C</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="font-bold">Midi : Salsepareille + Romarin</span>
                    <span className="bg-gray-100 px-2 py-0.5 rounded">Binder Zéolite 1h après</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-bold">Soir : Ortie racine + Mélisse + L-Glutamine</span>
                    <span className="bg-gray-100 px-2 py-0.5 rounded">Phase A • 65°C</span>
                  </div>
                </div>
              </div>

              {/* Card PremiumGate */}
              <div className="p-8 sm:p-10 rounded-[36px] bg-[#0F261E] text-white border-2 border-[#D97706] shadow-2xl relative z-10 text-center">
                <div className="w-14 h-14 rounded-2xl bg-[#D97706]/20 border border-[#D97706]/40 text-[#D97706] flex items-center justify-center mx-auto mb-6">
                  <Lock className="w-7 h-7" />
                </div>
                
                <span className="inline-block px-3.5 py-1 rounded-full bg-[#D97706]/20 text-[#D97706] text-[10px] font-black uppercase tracking-[0.2em] mb-4">
                  Espace Réservé aux Abonnés Bloom
                </span>

                <h3 className="text-2xl sm:text-3xl font-black text-white mb-4">
                  Débloquez l'intégralité du Protocole Psoriasis
                </h3>

                <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto mb-8 leading-relaxed">
                  Accédez aux détails millimétrés des séquences journalières, aux paramètres d'extraction au BloomLab des Phases 1, 2 et 3, ainsi qu'au carnet de suivi complet.
                </p>

                <div className="grid sm:grid-cols-2 gap-3 max-w-xl mx-auto text-left mb-8 text-xs sm:text-sm text-slate-200">
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 border border-white/10">
                    <CheckCircle2 className="w-4 h-4 text-[#D97706] shrink-0" />
                    <span>Séquences matin, midi, soir (Phases 1 à 3)</span>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 border border-white/10">
                    <CheckCircle2 className="w-4 h-4 text-[#D97706] shrink-0" />
                    <span>Températures & solvants A/B BloomLab</span>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 border border-white/10">
                    <CheckCircle2 className="w-4 h-4 text-[#D97706] shrink-0" />
                    <span>Dosages précis, binders & chronobiologie</span>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 border border-white/10">
                    <CheckCircle2 className="w-4 h-4 text-[#D97706] shrink-0" />
                    <span>Carnet de bord & export dossier PDF</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button
                    onClick={() => {
                      trackCtaClick('rejoindre_abonnement');
                      onNavigate('abonnement');
                    }}
                    className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#D97706] hover:bg-[#B45309] active:bg-[#92400E] text-white font-black text-sm transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Rejoindre l'abonnement (59 €/mois)</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => {
                      trackCtaClick('se_connecter');
                      onRequireAuth();
                    }}
                    className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition-all cursor-pointer"
                  >
                    J'ai déjà un compte
                  </button>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* PHASE 2 */}
        <section id="phase-2" className="scroll-mt-32 sm:scroll-mt-36 print-break-inside-avoid">
          <div className="text-[10px] font-black uppercase tracking-[0.25em] text-[#D97706] mb-2">
            V. Modulation de l'Inflammation
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0F261E] mb-4">
            Phase 2 : Dépuration Profonde & Apaisement des Voies Th17 (Semaines 7 à 10)
          </h2>
          <p className="text-sm text-[#0F261E]/80 leading-relaxed mb-6 font-normal">
            Après la décongestion émonctorielle et le drainage du sang, cette phase s'attaque aux cascades de signalisation inflammatoires (axe IL-23 / IL-17 et voie enzymatique 5-LOX).
          </p>

          {/* Encadré Pourquoi ces plantes : Boswellia et Thym */}
          <div className="p-7 rounded-3xl bg-[#FAF2E6] border border-[#EEDFC6] mb-6">
            <div className="flex items-center gap-2.5 text-[#92400E] font-black text-xs uppercase tracking-widest mb-3">
              <Flame className="w-4 h-4" />
              Pourquoi cette synergie : Boswellia serrata & Thym à linalol
            </div>
            <p className="text-sm text-[#0F261E]/80 leading-relaxed font-normal mb-3">
              <strong>Le Boswellia (<em>Boswellia serrata</em>)</strong> renferme des acides boswelliques (dont l'AKBA), puissants inhibiteurs naturels de la 5-lipoxygénase. Ils freinent l'afflux des leucocytes neutrophiles dans les plaques épidermiques sans irriter l'estomac.
            </p>
            <p className="text-sm text-[#0F261E]/80 leading-relaxed font-normal">
              <strong>Le Thym (<em>Thymus vulgaris</em>)</strong> assainit le microbiote intestinal, réduit les fermentations anormales et renforce l'action antioxydante globale.
            </p>
          </div>

          {isPremium ? (
            /* Tableau Phase 2 débloqué */
            <div className="bg-white rounded-3xl border border-[#E7DFD3] p-6 sm:p-8 shadow-xs overflow-hidden premium-paywall-content">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-[#E7DFD3] text-[#0F261E]/60 font-black uppercase text-[10px] tracking-wider">
                      <th className="py-3 px-3">Moment</th>
                      <th className="py-3 px-3">Formulation & Totum</th>
                      <th className="py-3 px-3">Protocole Séquentiel BloomLab</th>
                      <th className="py-3 px-3">Posologie</th>
                      <th className="py-3 px-3">Sécurité & Binder</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E7DFD3]/60">
                    <tr>
                      <td className="py-3 px-3 font-bold">Matin</td>
                      <td className="py-3 px-3">Résine de Boswellia (15g) + Curcuma longa (10g)</td>
                      <td className="py-3 px-3">
                        <span className="inline-block px-2 py-0.5 rounded bg-[#FAF2E6] text-[#92400E] text-[11px] font-bold">
                          Phase B : Alcool 60° • 45°C • 2h (Résines)
                        </span>
                      </td>
                      <td className="py-3 px-3">30 gouttes dans un fond d'eau tiède</td>
                      <td className="py-3 px-3 text-[#1C3F34] font-semibold">Au cours du petit-déjeuner</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-3 font-bold">Midi</td>
                      <td className="py-3 px-3">Thym à linalol (10g) + Bardane (10g)</td>
                      <td className="py-3 px-3">
                        <span className="inline-block px-2 py-0.5 rounded bg-[#FAF2E6] text-[#92400E] text-[11px] font-bold">
                          Phase A : 85°C • 20 min
                        </span>
                      </td>
                      <td className="py-3 px-3">200 ml</td>
                      <td className="py-3 px-3 text-[#B45309] font-bold">
                        Binder 45 min après
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-3 font-bold">Soir</td>
                      <td className="py-3 px-3">Scutellaire de Baïkal (<em>Scutellaria</em>) + Mauve</td>
                      <td className="py-3 px-3">
                        <span className="inline-block px-2 py-0.5 rounded bg-[#FAF2E6] text-[#92400E] text-[11px] font-bold">
                          Phase A : 70°C • 30 min
                        </span>
                      </td>
                      <td className="py-3 px-3">200 ml</td>
                      <td className="py-3 px-3 text-[#1C3F34] font-semibold">Sommeil réparateur</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-[#E7DFD3] p-8 text-center shadow-xs">
              <div className="w-12 h-12 rounded-2xl bg-[#D97706]/15 text-[#D97706] flex items-center justify-center mx-auto mb-4">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-lg sm:text-xl font-black text-[#0F261E] mb-2">
                Protocole & Paramètres BloomLab Phase 2 réservés aux membres
              </h3>
              <p className="text-xs sm:text-sm text-[#0F261E]/70 max-w-md mx-auto mb-6">
                Débloquez les ratios d'extraction totum (Boswellia, Thym, Scutellaire) et la gestion des binders Th17 avec Bloom Complet.
              </p>
              <button
                onClick={() => {
                  trackCtaClick('rejoindre_abonnement_phase2');
                  onNavigate('abonnement');
                }}
                className="px-6 py-3 rounded-2xl bg-[#D97706] hover:bg-[#B45309] text-white font-black text-xs transition-all shadow-md inline-flex items-center gap-2 cursor-pointer"
              >
                <span>Débloquer avec Bloom Complet (59 €/mois)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </section>

        {/* PHASE 3 */}
        <section id="phase-3" className="scroll-mt-32 sm:scroll-mt-36 print-break-inside-avoid">
          <div className="text-[10px] font-black uppercase tracking-[0.25em] text-[#D97706] mb-2">
            VI. Stabilisation Durable
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0F261E] mb-4">
            Phase 3 : Consolidation & Axe Psycho-Cutané (Semaines 11 à 14+)
          </h2>
          <p className="text-sm text-[#0F261E]/80 leading-relaxed mb-6 font-normal">
            La peau étant intimement reliée au système neuro-végétatif (axe corticotrope HPA), cette phase régule la réponse au stress et ancre l'homéostasie du terrain sur le long terme pour prévenir les récidives.
          </p>

          {/* Encadré Pourquoi ces plantes : Ashwagandha et Houblon */}
          <div className="p-7 rounded-3xl bg-[#FAF2E6] border border-[#EEDFC6] mb-6">
            <div className="flex items-center gap-2.5 text-[#92400E] font-black text-xs uppercase tracking-widest mb-3">
              <Heart className="w-4 h-4" />
              Pourquoi cette synergie : Ashwagandha & Houblon
            </div>
            <p className="text-sm text-[#0F261E]/80 leading-relaxed font-normal mb-3">
              <strong>L'Ashwagandha (<em>Withania somnifera</em>)</strong> module l'axe HPA en régulant les pics de cortisol sérique. Elle apaise la sensibilité nerveuse cutanée sans effet sédatif diurne.
            </p>
            <p className="text-sm text-[#0F261E]/80 leading-relaxed font-normal">
              <strong>Le Houblon (<em>Humulus lupulus</em>)</strong> apporte des dérivés prénylés calmants et aide à désamorcer l'hyper-réactivité épidermique liée aux tensions émotionnelles.
            </p>
          </div>

          {isPremium ? (
            /* Tableau Phase 3 débloqué */
            <div className="bg-white rounded-3xl border border-[#E7DFD3] p-6 sm:p-8 shadow-xs overflow-hidden premium-paywall-content">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-[#E7DFD3] text-[#0F261E]/60 font-black uppercase text-[10px] tracking-wider">
                      <th className="py-3 px-3">Moment</th>
                      <th className="py-3 px-3">Plantes & Adaptogènes</th>
                      <th className="py-3 px-3">Préparation BloomLab</th>
                      <th className="py-3 px-3">Rythme & Posologie</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E7DFD3]/60">
                    <tr>
                      <td className="py-3 px-3 font-bold">Matin</td>
                      <td className="py-3 px-3">Racine d'Ashwagandha (10g) + Ortie feuille (10g)</td>
                      <td className="py-3 px-3">
                        <span className="inline-block px-2 py-0.5 rounded bg-[#FAF2E6] text-[#92400E] text-[11px] font-bold">
                          Phase A : 70°C • 30 min
                        </span>
                      </td>
                      <td className="py-3 px-3">200 ml (5 jours sur 7)</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-3 font-bold">Soir</td>
                      <td className="py-3 px-3">Cônes de Houblon (5g) + Passiflore (10g)</td>
                      <td className="py-3 px-3">
                        <span className="inline-block px-2 py-0.5 rounded bg-[#FAF2E6] text-[#92400E] text-[11px] font-bold">
                          Phase A : 65°C • 15 min
                        </span>
                      </td>
                      <td className="py-3 px-3">150 ml avant le coucher</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-[#E7DFD3] p-8 text-center shadow-xs">
              <div className="w-12 h-12 rounded-2xl bg-[#D97706]/15 text-[#D97706] flex items-center justify-center mx-auto mb-4">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-lg sm:text-xl font-black text-[#0F261E] mb-2">
                Formulations adaptogènes & posologies Phase 3 réservées aux abonnés
              </h3>
              <p className="text-xs sm:text-sm text-[#0F261E]/70 max-w-md mx-auto mb-6">
                Accédez aux ratios Ashwagandha/Houblon et au calendrier d'ancrage homéostasique avec la formule Bloom Complet.
              </p>
              <button
                onClick={() => {
                  trackCtaClick('rejoindre_abonnement_phase3');
                  onNavigate('abonnement');
                }}
                className="px-6 py-3 rounded-2xl bg-[#D97706] hover:bg-[#B45309] text-white font-black text-xs transition-all shadow-md inline-flex items-center gap-2 cursor-pointer"
              >
                <span>Débloquer avec Bloom Complet (59 €/mois)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </section>

        {/* LES 5 RÈGLES D'OR DU TERRAIN PSORIASIQUE */}
        <section id="regles-dor" className="scroll-mt-32 sm:scroll-mt-36 print-break-inside-avoid">
          <div className="text-[10px] font-black uppercase tracking-[0.25em] text-[#D97706] mb-2">
            VII. Hygiène de Vie & Gestes
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0F261E] mb-6">
            Les 5 Règles d'Or du Terrain Psoriasique
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-6 bg-white rounded-3xl border border-[#E7DFD3] shadow-xs">
              <div className="text-xs font-black text-[#D97706] mb-1">Règle n°1</div>
              <h3 className="font-bold text-sm text-[#0F261E] mb-2">Ne jamais décaper les squames</h3>
              <p className="text-xs sm:text-sm text-[#0F261E]/70 leading-relaxed">
                Le décapage mécanique ou le grattage stimule le <em>phénomène de Koebner</em> : toute lésion mécanique de l'épiderme réactive localement la cascade inflammatoire et épaissit la plaque.
              </p>
            </div>

            <div className="p-6 bg-white rounded-3xl border border-[#E7DFD3] shadow-xs">
              <div className="text-xs font-black text-[#D97706] mb-1">Règle n°2</div>
              <h3 className="font-bold text-sm text-[#0F261E] mb-2">Cosmétique pure sans pétrochimie</h3>
              <p className="text-xs sm:text-sm text-[#0F261E]/70 leading-relaxed">
                Bannir les huiles minérales (paraffine, vaseline) et les parfums synthétiques. Favoriser un macérat de Calendula ou un beurre de Karité brut non raffiné extrait à basse température.
              </p>
            </div>

            <div className="p-6 bg-white rounded-3xl border border-[#E7DFD3] shadow-xs">
              <div className="text-xs font-black text-[#D97706] mb-1">Règle n°3</div>
              <h3 className="font-bold text-sm text-[#0F261E] mb-2">Respecter la chronobiologie du foie</h3>
              <p className="text-xs sm:text-sm text-[#0F261E]/70 leading-relaxed">
                Dîner léger avant 20h. Le foie réalise sa phase de détoxication enzymatique majeure entre 1h et 3h du matin ; un repas trop copieux bloque ce processus.
              </p>
            </div>

            <div className="p-6 bg-white rounded-3xl border border-[#E7DFD3] shadow-xs">
              <div className="text-xs font-black text-[#D97706] mb-1">Règle n°4</div>
              <h3 className="font-bold text-sm text-[#0F261E] mb-2">Cohérence cardiaque 3 fois par jour</h3>
              <p className="text-xs sm:text-sm text-[#0F261E]/70 leading-relaxed">
                5 minutes de respiration guidée (6 cycles par minute) réduisent instantanément le tonus orthosympathique et la libération de substance P au niveau des terminaisons nerveuses cutanées.
              </p>
            </div>

            <div className="p-6 bg-white rounded-3xl border border-[#E7DFD3] shadow-xs sm:col-span-2">
              <div className="text-xs font-black text-[#D97706] mb-1">Règle n°5</div>
              <h3 className="font-bold text-sm text-[#0F261E] mb-2">Exposition solaire modérée et progressive</h3>
              <p className="text-xs sm:text-sm text-[#0F261E]/70 leading-relaxed">
                10 à 15 minutes d'exposition douce aux heures clémentes favorisent la synthèse de vitamine D3 endogène et calment les lymphocytes T cutanés, sans jamais provoquer de coup de soleil.
              </p>
            </div>
          </div>
        </section>

        {/* TABLEAU OBSERVATIONS (Strictement au conditionnel) */}
        <section id="observations" className="scroll-mt-32 sm:scroll-mt-36 print-break-inside-avoid">
          <div className="text-[10px] font-black uppercase tracking-[0.25em] text-[#D97706] mb-2">
            VIII. Évolution & Repères
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0F261E] mb-4">
            Ce que vous pourriez observer (Signaux de votre terrain)
          </h2>
          <p className="text-xs sm:text-sm text-[#0F261E]/70 mb-6 italic">
            Chaque organisme est unique. Ce tableau récapitule les manifestations physiologiques fréquemment constatées par nos utilisateurs au fil des semaines :
          </p>

          <div className="bg-white rounded-3xl border border-[#E7DFD3] p-6 sm:p-8 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-[#E7DFD3] text-[#0F261E]/60 font-black uppercase text-[10px] tracking-wider">
                    <th className="py-3 px-3">Période</th>
                    <th className="py-3 px-3">Ce que vous pourriez remarquer</th>
                    <th className="py-3 px-3">Interprétation systémique</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E7DFD3]/60">
                  <tr>
                    <td className="py-3 px-3 font-bold text-[#0F261E]">Semaines 1-2 (Phase 0)</td>
                    <td className="py-3 px-3 text-[#0F261E]/80">
                      Légère augmentation du débit urinaire, selles plus fréquentes, sensation de légèreté digestive ; possible prurit passager très bref.
                    </td>
                    <td className="py-3 px-3 text-[#1C3F34] font-medium">
                      Réouverture effective des filtres d'évacuation hépato-rénaux.
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3 font-bold text-[#0F261E]">Semaines 3-6 (Phase 1)</td>
                    <td className="py-3 px-3 text-[#0F261E]/80">
                      Atténuation progressive des tiraillements cutanés, squames plus fines et moins adhérentes, teint plus lumineux.
                    </td>
                    <td className="py-3 px-3 text-[#1C3F34] font-medium">
                      Drainage du sang et restauration des jonctions de la muqueuse digestive.
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3 font-bold text-[#0F261E]">Semaines 7-10 (Phase 2)</td>
                    <td className="py-3 px-3 text-[#0F261E]/80">
                      Diminution de l'intensité des rougeurs, espacement des sensations de démangeaison, souplesse cutanée accrue.
                    </td>
                    <td className="py-3 px-3 text-[#1C3F34] font-medium">
                      Apaisement de la cascade cytokinique (inhibition 5-LOX et Th17).
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3 font-bold text-[#0F261E]">Semaines 11+ (Phase 3)</td>
                    <td className="py-3 px-3 text-[#0F261E]/80">
                      Stabilité retrouvée du terrain, meilleure tolérance aux stress du quotidien, renouvellement cutané harmonisé.
                    </td>
                    <td className="py-3 px-3 text-[#1C3F34] font-medium">
                      Consolidation neuro-endocrinienne et homéostasie stabilisée.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* CARNET DE BORD HEBDOMADAIRE */}
        <section id="carnet-de-bord" className="scroll-mt-32 sm:scroll-mt-36 print-break-inside-avoid">
          <div className="text-[10px] font-black uppercase tracking-[0.25em] text-[#D97706] mb-2">
            IX. Suivi Personnel
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0F261E] mb-4">
            Carnet de Bord Hebdomadaire
          </h2>
          <p className="text-xs sm:text-sm text-[#0F261E]/70 mb-6 font-normal">
            Prenez 3 minutes chaque dimanche pour consigner vos ressentis. Imprimez cette fiche pour suivre l'évolution objective de votre terrain :
          </p>

          <div className="bg-white rounded-3xl border border-[#E7DFD3] p-6 sm:p-8 shadow-xs">
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E7DFD3]">
                <div className="text-[10px] font-black uppercase tracking-wider text-[#0F261E]/50 mb-1">
                  Prurit & Démangeaisons
                </div>
                <div className="text-xs text-[#0F261E]/80">
                  Échelle de 0 à 10 : ________
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E7DFD3]">
                <div className="text-[10px] font-black uppercase tracking-wider text-[#0F261E]/50 mb-1">
                  Épaisseur des Plaques
                </div>
                <div className="text-xs text-[#0F261E]/80">
                  Diminuée / Stable / Active
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E7DFD3]">
                <div className="text-[10px] font-black uppercase tracking-wider text-[#0F261E]/50 mb-1">
                  Transit Intestinal
                </div>
                <div className="text-xs text-[#0F261E]/80">
                  Fréquence : ____ selles/j
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E7DFD3]">
                <div className="text-[10px] font-black uppercase tracking-wider text-[#0F261E]/50 mb-1">
                  Qualité du Sommeil
                </div>
                <div className="text-xs text-[#0F261E]/80">
                  Réparateur / Haché / Difficile
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E7DFD3] text-xs text-[#0F261E]/70 space-y-2">
              <div className="font-bold text-[#0F261E]">Notes & Événements déclencheurs remarqués (Stress, alimentation, climat) :</div>
              <div className="h-16 border-b border-dashed border-[#0F261E]/20"></div>
              <div className="h-16 border-b border-dashed border-[#0F261E]/20"></div>
            </div>
          </div>
        </section>

        {/* MOT DE LA FIN */}
        <section id="mot-de-la-fin" className="scroll-mt-32 sm:scroll-mt-36 print-break-inside-avoid">
          <div className="p-8 sm:p-12 rounded-[36px] bg-[#1C3F34] text-white border border-[#235344] shadow-xl text-center">
            <div className="w-12 h-12 rounded-full bg-[#D97706]/20 text-[#D97706] flex items-center justify-center mx-auto mb-6">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-black mb-4 text-white">
              Le Mot de la Fin : La Patience du Terrain
            </h3>
            <p className="text-sm sm:text-base text-white/90 max-w-2xl mx-auto leading-relaxed mb-6 font-normal">
              Rappelez-vous : votre peau n'est pas votre ennemie. Elle est le baromètre fidèle de votre équilibre intérieur. En apprenant à déverrouiller votre terrain plutôt qu'à combattre aveuglément les symptômes, vous rendez à votre organisme sa capacité naturelle d'autorégulation homéostasique.
            </p>
            <div className="text-xs uppercase tracking-[0.2em] font-black text-[#D97706]">
              Bloom by BotaniK — L'alliance de la science moderne et de la sagesse végétale
            </div>
          </div>
        </section>

        {/* 6. Avertissement Médical Verbatim — Bas de page */}
        <section id="avertissement-bottom" className="pt-8 print-break-inside-avoid">
          <div className="p-6 sm:p-7 rounded-3xl bg-[#FEF3C7]/40 border-2 border-[#D97706]/40 text-[#78350F] shadow-sm">
            <div className="flex items-start gap-3.5">
              <AlertTriangle className="w-6 h-6 text-[#D97706] shrink-0 mt-0.5" />
              <div className="space-y-2">
                <h2 className="text-xs font-black uppercase tracking-widest text-[#92400E]">
                  Rappel Déontologique & Médical Obligatoire
                </h2>
                <p className="text-xs sm:text-sm leading-relaxed text-[#78350F] font-normal">
                  {MEDICAL_DISCLAIMER}
                </p>
              </div>
            </div>
          </div>
        </section>

      </main>
    </article>
    </GlossaryProvider>
  );
}
