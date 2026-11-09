import React, { useEffect, useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  ArrowLeft,
  Compass, 
  Activity,
  Layers, 
  Filter, 
  Clock, 
  Scale, 
  Lock, 
  CheckCircle2, 
  BookOpen, 
  KeyRound,
  ExternalLink
} from 'lucide-react';
import { View } from '../types';
import { Language } from '../translations';
import AcademyNavigation from '../components/AcademyNavigation';
import FreemiumPaywallGate from '../components/FreemiumPaywallGate';

interface AxeA1EmonctoiresContentProps {
  onNavigate: (view: View, param?: string) => void;
  lang?: Language;
}

export const AxeA1EmonctoiresContent: React.FC<AxeA1EmonctoiresContentProps> = ({
  onNavigate,
  lang = 'fr'
}) => {
  const [activeTab, setActiveTab] = useState<'enseignement' | 'observation'>('enseignement');

  useEffect(() => {
    document.title = lang === 'fr'
      ? "Axe A1 : Émonctoires & Élimination Physiologique | Bloom Académie"
      : lang === 'de'
      ? "Achse A1 : Ausscheidungsorgane | Bloom Akademie"
      : "Axis A1 : Emunctories & Physiological Elimination | Bloom Academy";

    if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
      (window as any).gtag('event', 'page_view_axe_a1', {
        page_title: 'Axe A1 - Émonctoires & Élimination Physiologique',
        page_location: window.location.href
      });
    }
  }, [lang]);

  return (
    <div 
      className="min-h-screen bg-[#0F1713] text-[#FAF7F2] font-sans selection:bg-[#E8772E]/30 selection:text-white pb-24"
      data-bloom-academie="true"
    >
      {/* 1. Header & Secondary Academy Navigation Bar */}
      <AcademyNavigation
        currentView="axe-a1"
        onNavigate={onNavigate}
        currentPageTitle={lang === 'fr' ? 'A1 : Émonctoires' : lang === 'de' ? 'A1 : Ausscheidung' : 'A1 : Emunctories'}
        sectionName={lang === 'fr' ? 'Les 9 Axes historiques' : lang === 'de' ? 'Die 9 Historischen Achsen' : 'The 9 Historical Axes'}
        lang={lang}
      />

      {/* 2. Hero Section matching screenshot 1 */}
      <header className="relative pt-12 pb-10 px-4 sm:px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Pill badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/15 text-[#C8AB8A] text-xs font-bold uppercase tracking-widest shadow-sm">
            <Compass className="w-3.5 h-3.5 text-[#C8AB8A]" />
            <span>AXE A1 • PHASE 1 : L'OBSERVATEUR</span>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.1]">
            Émonctoires &amp; Élimination Physiologique
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base md:text-lg text-[#FAF7F2]/80 max-w-3xl mx-auto font-normal leading-relaxed">
            Foie, reins, intestins, peau, poumons : comprendre les portes de sortie biologiques pour cesser 
            de saturer un organisme déjà sous charge allostatique.
          </p>

          {/* 3 Action Tabs below subtitle */}
          <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => setActiveTab('enseignement')}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md ${
                activeTab === 'enseignement'
                  ? 'bg-[#E5A93C] text-black hover:bg-[#d4972b]'
                  : 'bg-white/10 text-white hover:bg-white/15 border border-white/10'
              }`}
            >
              1. Enseignement &amp; Biologie
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('observation')}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md ${
                activeTab === 'observation'
                  ? 'bg-[#E5A93C] text-black hover:bg-[#d4972b]'
                  : 'bg-white/10 text-white hover:bg-white/15 border border-white/10'
              }`}
            >
              2. Laboratoire N=1 (Observation)
            </button>

            <button
              type="button"
              onClick={() => onNavigate('protocoles')}
              className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-xs uppercase tracking-wider border border-white/15 transition-all flex items-center gap-2 cursor-pointer shadow-md"
            >
              <Activity className="w-3.5 h-3.5 text-[#E8772E]" />
              <span>Voir les 3 Protocoles Systémiques</span>
            </button>
          </div>
        </div>
      </header>

      {/* 3. Main Free Content (Cards 1 & 2) + Freemium Gate */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">

        {/* CARD 1: LA QUESTION D'ENTRÉE */}
        <section className="p-7 sm:p-9 rounded-3xl bg-[#191913]/90 border border-[#4A3C23]/60 relative overflow-hidden shadow-xl space-y-4">
          <div className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] text-[#C8AB8A] font-bold">
            1. LA QUESTION D'ENTRÉE
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white italic tracking-tight leading-snug">
            « Pourquoi vos toxines s'accumulent-elles et fatiguent votre immunité alors que vous mangez sainement ? »
          </h2>
          <p className="text-sm sm:text-base text-[#FAF7F2]/80 leading-relaxed font-normal">
            Parce qu'un déchet métabolique non évacué recircule en permanence dans la lymphe et le sang. 
            Avant de nourrir ou de stimuler une cellule, il faut d'abord s'assurer que ses portes de vidange sont déverrouillées.
          </p>
        </section>

        {/* CARD 2: DÉFINITION SIMPLE */}
        <section className="p-7 sm:p-9 rounded-3xl bg-[#131F19]/90 border border-white/10 shadow-xl space-y-6">
          <div className="space-y-2">
            <div className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] text-[#86efac] font-bold">
              2. DÉFINITION SIMPLE
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Qu'est-ce qu'un émonctoire ?
            </h3>
            <p className="text-sm sm:text-base text-[#FAF7F2]/80 leading-relaxed font-normal">
              Un <strong className="text-white">émonctoire</strong> est un organe anatomique spécialisé dans la filtration, la transformation et l'expulsion hors du corps des sous-produits de notre propre métabolisme (acide urique, urée, dioxyde de carbone, métabolites hormonaux) et des xénobiotiques extérieurs.
            </p>
            <p className="text-xs sm:text-sm text-[#FAF7F2]/70">
              Le corps humain en possède cinq principaux :
            </p>
          </div>

          {/* Grid of the 5 emunctories */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-4 sm:p-5 rounded-2xl bg-[#0F1713]/80 border border-white/10 space-y-1.5">
              <h4 className="text-sm font-bold text-white">
                1. Le Foie :
              </h4>
              <p className="text-xs text-[#FAF7F2]/75 leading-relaxed">
                Le grand alchimiste de conjugaison (Phase I et Phase II enzymatique) et évacuation biliaire.
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-[#0F1713]/80 border border-white/10 space-y-1.5">
              <h4 className="text-sm font-bold text-white">
                2. Les Reins :
              </h4>
              <p className="text-xs text-[#FAF7F2]/75 leading-relaxed">
                Filtration glomérulaire de 180 litres de plasma/jour et régulation hydrominérale.
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-[#0F1713]/80 border border-white/10 space-y-1.5">
              <h4 className="text-sm font-bold text-white">
                3. L'Intestin :
              </h4>
              <p className="text-xs text-[#FAF7F2]/75 leading-relaxed">
                Barrière immunologique et transit fécal des résidus non solubles.
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-[#0F1713]/80 border border-white/10 space-y-1.5">
              <h4 className="text-sm font-bold text-white">
                4. La Peau :
              </h4>
              <p className="text-xs text-[#FAF7F2]/75 leading-relaxed">
                Émonctoire vicariant d'évacuation par la sueur (aqueuse) et le sébum (lipidique).
              </p>
            </div>

            <div className="sm:col-span-2 p-4 sm:p-5 rounded-2xl bg-[#0F1713]/80 border border-white/10 space-y-1.5">
              <h4 className="text-sm font-bold text-white">
                5. Les Poumons :
              </h4>
              <p className="text-xs text-[#FAF7F2]/75 leading-relaxed">
                Élimination des acides volatils et régulation du pH artériel par l'expiration.
              </p>
            </div>
          </div>
        </section>

        {/* 4. Freemium Gate matching screenshot 2 */}
        <FreemiumPaywallGate
          onNavigate={onNavigate}
          lang={lang}
          title="Débloquez l'Axe A1 : Émonctoires & Élimination"
          subtitle="La question d'entrée et la définition des 5 émonctoires sont en accès libre. Débloquez les cascades biochimiques de phase II, le protocole du Laboratoire N=1, les cinétiques d'extraction et l'ensemble des modules systémiques avec votre abonnement."
          bulletPoints={[
            "Tableau des cascades biologiques et niveaux de preuve clinique",
            "Laboratoire N=1 : protocole d'observation sur 7 jours",
            "Extraction de précision : solvants, cinétiques et températures",
            "Accès illimité aux 3 Protocoles Systémiques et 9 Axes"
          ]}
        >
          {/* Detailed protected content for subscribed members */}
          <div className="space-y-8 pt-4">
            <div className="p-6 sm:p-8 rounded-3xl bg-[#131F19] border border-white/10 space-y-4">
              <span className="text-xs font-mono uppercase tracking-widest text-[#E8772E] font-bold">
                Biochimie Avancée • Phase II Hépatique
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                La cascade des cytochromes P450 et de la glucuronidation
              </h3>
              <p className="text-sm text-[#FAF7F2]/80 leading-relaxed">
                Lorsque la Phase I transforme un métabolite lipophile en intermédiaire réactif, la Phase II doit impérativement intervenir via la sulfoconjugaison, la glucuronidation ou la liaison au glutathion réduit (GSH). Sans ce synchronisme, le stress oxydatif hépatocytaire s'emballe.
              </p>
            </div>

            <div className="p-6 sm:p-8 rounded-3xl bg-[#131F19] border border-white/10 space-y-4">
              <span className="text-xs font-mono uppercase tracking-widest text-[#E8772E] font-bold">
                Protocole Laboratoire N=1 (7 Jours)
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                Observatoire individuel de la perméabilité d'élimination
              </h3>
              <p className="text-sm text-[#FAF7F2]/80 leading-relaxed">
                Suivez quotidiennement les marqueurs d'excrétion (clarté urinaire matinale, transit intestinal, sébum cutané, odeur de la sueur). Ce protocole d'observation permet de calibrer les temps de contact de l'infusion à l'eau pure versus hydro-alcoolique.
              </p>
            </div>
          </div>
        </FreemiumPaywallGate>

        {/* 5. Bottom Navigation Bar matching screenshot 2 */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10">
          <button
            onClick={() => onNavigate('module-0')}
            className="text-xs text-[#FAF7F2]/80 hover:text-white flex items-center gap-2 cursor-pointer transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Revenir au Module 0 (Le Choc de Paradigme)</span>
          </button>

          <button
            onClick={() => onNavigate('protocoles')}
            className="px-6 py-3 rounded-xl bg-[#E5A93C] hover:bg-[#d4972b] text-black font-black text-xs uppercase tracking-wider transition-all shadow-md flex items-center gap-2 cursor-pointer"
          >
            <span>Découvrir les 3 Protocoles Systémiques</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </main>
    </div>
  );
};

export default AxeA1EmonctoiresContent;
