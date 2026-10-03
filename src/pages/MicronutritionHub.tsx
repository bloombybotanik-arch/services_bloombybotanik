import React, { useEffect } from 'react';
import { 
  ShieldCheck, 
  BookOpen, 
  HelpCircle, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  Compass, 
  FileText, 
  Stethoscope, 
  Share2,
  Calendar
} from 'lucide-react';
import { View } from '../types';
import { Language } from '../translations';
import { SafetyBox } from '../components/micronutrition/SafetyBox';
import { NutrientCard } from '../components/micronutrition/NutrientCard';
import { SourceList } from '../components/micronutrition/SourceList';
import { 
  NUTRIENTS_DATA, 
  GLOBAL_MICRONUTRITION_SOURCES, 
  EVALUATION_CHECKLIST,
  FREQUENT_INTERACTIONS_DATA 
} from '../data/micronutritionData';

interface MicronutritionHubProps {
  onNavigate: (view: View, param?: string) => void;
  lang?: Language;
}

export default function MicronutritionHub({ onNavigate, lang = 'fr' }: MicronutritionHubProps) {
  const isFR = lang === 'fr';

  useEffect(() => {
    document.title = "Micronutrition : comprendre les compléments alimentaires avec discernement | Bloom by BotaniK";
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute(
      'content',
      "Un guide pédagogique pour comprendre les vitamines, minéraux, oméga-3 et autres compléments alimentaires : allégations autorisées, critères de choix, précautions et interactions."
    );
  }, []);

  const faqData = [
    {
      question: "Un complément alimentaire peut-il remplacer une alimentation équilibrée ?",
      answer: "Non. Les compléments alimentaires sont destinés à compléter une alimentation normale ; ils ne remplacent ni une alimentation variée et équilibrée, ni un mode de vie sain."
    },
    {
      question: "Puis-je prendre plusieurs compléments en même temps ?",
      answer: "Cela dépend de leur composition, des doses cumulées, de vos traitements et de votre situation de santé. En cas de doute, demandez conseil à un pharmacien ou à un médecin."
    },
    {
      question: "Comment savoir si je suis carencé ?",
      answer: "Certains signes sont non spécifiques. Un professionnel de santé peut évaluer la situation et, lorsque nécessaire, prescrire ou interpréter un bilan adapté."
    }
  ];

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Comprendre les compléments alimentaires : repères, formes et précautions",
    "description": "Un guide pédagogique pour comprendre les vitamines, minéraux, oméga-3 et autres compléments alimentaires : allégations autorisées, critères de choix, précautions et interactions.",
    "author": {
      "@type": "Organization",
      "name": "Bloom by BotaniK - Pôle Éditorial et Scientifique"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Bloom by BotaniK",
      "logo": {
        "@type": "ImageObject",
        "url": "https://bloombybotanik.com/brand/logo-org.jpg"
      }
    },
    "datePublished": "2026-10-03",
    "dateModified": "2026-10-03",
    "mainEntityOfPage": "https://bloombybotanik.com/academie/nutrition-et-micronutrition/"
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };

  return (
    <article className="min-h-screen bg-[#FAF7F2] text-[#0F261E] pb-24">
      <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>

      {/* HEADER HERO */}
      <header className="relative bg-[#0F261E] text-white pt-16 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#D97706_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
        
        <div className="max-w-5xl mx-auto relative z-10 space-y-6">
          {/* Fil d'Ariane */}
          <nav aria-label="Fil d'Ariane" className="flex items-center gap-2 text-xs text-white/70">
            <button onClick={() => onNavigate('home')} className="hover:text-white transition-colors">Accueil</button>
            <span>/</span>
            <button onClick={() => onNavigate('academie')} className="hover:text-white transition-colors">Bloom Académie</button>
            <span>/</span>
            <span className="text-[#D97706] font-semibold">Nutrition & Micronutrition</span>
          </nav>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-[#D97706] text-xs font-bold uppercase tracking-widest border border-white/15">
            <Compass className="w-4 h-4 text-[#D97706]" />
            <span>Éducation Nutritionnelle & Prudence Scientifique</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Comprendre les compléments alimentaires : repères, formes et précautions
          </h1>

          <p className="text-base sm:text-lg text-white/85 leading-relaxed font-light max-w-3xl">
            Un guide pédagogique indépendant pour comprendre les vitamines, minéraux, oméga-3 et substances spécialisées : allégations de santé autorisées, critères de choix rigoureux, précautions d'emploi et interactions à connaître.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-white/70">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#D97706]" /> Dernière revue scientifique : Octobre 2026
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Conforme Règlement (CE) n° 1924/2006 & ANSES
            </span>
          </div>
        </div>
      </header>

      {/* CONTENU PRINCIPAL */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-16">
        
        {/* Avertissement Global Réglementaire (Mandatory Safety Framework) */}
        <SafetyBox isGlobalNotice={true} />

        {/* SECTION 1 : AVANT DE COMMENCER */}
        <section id="avant-de-commencer" className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E7DFD3] space-y-6 shadow-xs">
          <div className="space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-[#D97706]">Fondations</span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0F261E]">
              Avant toute supplémentation
            </h2>
          </div>

          <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-light">
            Les compléments alimentaires ne remplacent ni une alimentation variée et équilibrée, ni le sommeil, l'activité physique, ni un suivi médical régulier. Avant d'envisager une prise, plusieurs règles de discernement s'imposent :
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E7DFD3] space-y-2">
              <div className="font-bold text-sm text-[#0F261E] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>1. Faire le point global</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Faire le point sur son alimentation réelle, son sommeil, sa charge allostatique et son exposition solaire avant de supposer une carence sans contexte clinique ou biologique adapté.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E7DFD3] space-y-2">
              <div className="font-bold text-sm text-[#0F261E] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>2. Prendre en compte le terrain individuel</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                L'âge, la grossesse, l'allaitement, un régime végétarien, des antécédents rénaux, digestifs ou des traitements modifient fondamentalement la pertinence d'un nutriment.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E7DFD3] space-y-2">
              <div className="font-bold text-sm text-[#0F261E] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>3. Distinguer apport de référence et dose active</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Ne pas confondre la Valeur Nutritionnelle de Référence (VNR, besoin physiologique de base), la dose apportée par la formule, et une prescription médicale ciblée.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E7DFD3] space-y-2">
              <div className="font-bold text-sm text-[#0F261E] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>4. Vigilance sur les cumuls</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Prendre plusieurs produits différents (ex: formule immunité + complexe peau + multivitamine) entraîne fréquemment un dépassement silencieux des limites de sécurité pour le zinc, le sélénium ou la vitamine D.
              </p>
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-purple-50 border border-purple-200">
            <div className="flex items-center gap-3">
              <Stethoscope className="w-6 h-6 text-purple-700 shrink-0" />
              <div className="text-xs text-purple-950">
                <strong className="block font-bold">Un doute sur vos symptômes ou vos analyses ?</strong>
                <span>Ne débutez pas de supplémentation à l'aveugle : parlez-en à votre médecin traitant ou à votre pharmacien.</span>
              </div>
            </div>
            <a
              href="#choisir"
              className="px-5 py-2.5 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs shrink-0 transition-colors shadow-xs"
            >
              Voir la grille d'évaluation
            </a>
          </div>
        </section>

        {/* SECTION NAVIGATION VERS LES SOUS-PAGES DÉDIÉES */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div 
            onClick={() => onNavigate('micronutrition-guide-achat')}
            className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E7DFD3] hover:border-[#D97706]/60 transition-all cursor-pointer group shadow-xs space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-widest text-[#D97706]">Guide Pratique d'Achat</span>
              <ArrowRight className="w-4 h-4 text-[#D97706] group-hover:translate-x-1 transition-transform" />
            </div>
            <h3 className="text-xl font-bold text-[#0F261E]">
              Comment lire l'étiquette d'un complément ?
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Apprenez à repérer la part de nutriment élémentaire actif, traquer les doublons cachés et utiliser notre comparateur Oméga-3 au gramme actif.
            </p>
          </div>

          <div 
            onClick={() => onNavigate('micronutrition-precautions')}
            className="p-6 sm:p-8 rounded-3xl bg-white border border-amber-200/80 hover:border-amber-400 transition-all cursor-pointer group shadow-xs space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-800">Sécurité & Pharmacologie</span>
              <ArrowRight className="w-4 h-4 text-amber-700 group-hover:translate-x-1 transition-transform" />
            </div>
            <h3 className="text-xl font-bold text-[#0F261E]">
              Précautions, Interactions & Situations à Risque
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Anticoagulants, grossesse, lévothyroxine, chirurgie programmée ou prise d'argiles et adsorbants : toutes les situations exigeant un avis médical strict.
            </p>
          </div>
        </section>

        {/* SECTION 2 : LES FONDAMENTAUX À CONNAÎTRE (CARTES NUTRIMENTS) */}
        <section id="fondamentaux" className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-[#D97706]">Fiches Détaillées</span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0F261E]">
              Les fondamentaux à connaître : 9 fiches nutriments
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl font-light">
              Cliquez sur chaque nutriment pour consulter ses sources alimentaires naturelles, les allégations européennes strictement autorisées, les critères de qualité et les précautions associées.
            </p>
          </div>

          <div className="space-y-4">
            {NUTRIENTS_DATA.map((nut, idx) => (
              <NutrientCard key={nut.id} nutrient={nut} defaultOpen={idx === 0} />
            ))}
          </div>
        </section>

        {/* SECTION 3 : COMMENT ÉVALUER UN COMPLÉMENT (CHECKLIST EN 7 POINTS) */}
        <section id="choisir" className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E7DFD3] space-y-8 shadow-xs">
          <div className="space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-[#D97706]">Méthodologie</span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0F261E]">
              Comment évaluer un complément : la checklist en 7 points
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-light">
              Avant de valider tout panier ou de débuter une supplémentation, posez-vous ces 7 questions essentielles :
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {EVALUATION_CHECKLIST.map((item, i) => (
              <div key={i} className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E7DFD3] space-y-1.5">
                <h4 className="font-bold text-sm text-[#0F261E]">{item.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 4 : INTERACTIONS ET ERREURS FRÉQUENTES */}
        <section id="interactions" className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-[#D97706]">Sécurité Active</span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0F261E]">
              Interactions médicamenteuses et erreurs fréquentes
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-light max-w-2xl">
              Un complément alimentaire n'est jamais anodin : ses principes actifs peuvent modifier l'absorption, la métabolisation hépatique ou l'élimination de traitements médicamenteux indispensables.
            </p>
          </div>

          <div className="space-y-4">
            {FREQUENT_INTERACTIONS_DATA.map((item, i) => (
              <div key={i} className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[#0F261E]">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>{item.category}</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  <strong className="text-slate-900">Mécanisme : </strong>{item.risks}
                </p>
                <p className="text-xs text-emerald-900 bg-emerald-50/70 p-3 rounded-xl border border-emerald-100">
                  <strong>Conduite à tenir : </strong>{item.action}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 5 : FAQ SCHÉMA FAQPAGE */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E7DFD3] space-y-6 shadow-xs">
          <div className="space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-[#D97706]">Foire Aux Questions</span>
            <h2 className="text-2xl font-black text-[#0F261E]">
              Questions fréquentes sur la micronutrition
            </h2>
          </div>

          <div className="space-y-4 divide-y divide-slate-100">
            {faqData.map((item, idx) => (
              <div key={idx} className="pt-4 first:pt-0 space-y-2">
                <h4 className="font-bold text-sm sm:text-base text-[#0F261E]">
                  {item.question}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 6 : SOURCES INSTITUTIONNELLES */}
        <SourceList sources={GLOBAL_MICRONUTRITION_SOURCES} />

        {/* SECTION 7 : MAILLAGE INTERNE & ORIENTATION */}
        <section className="bg-[#FAF7F2] p-8 rounded-3xl border border-[#E7DFD3] space-y-6">
          <h3 className="text-lg font-bold text-[#0F261E]">
            Pour continuer votre lecture éducative sur Bloom :
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs font-semibold">
            <button 
              onClick={() => onNavigate('infusion-botanique')}
              className="p-4 rounded-2xl bg-white border border-[#E7DFD3] text-left hover:text-[#D97706] hover:border-[#D97706] transition-all"
            >
              Infusion botanique & extraction douce →
            </button>
            <button 
              onClick={() => onNavigate('herbier')}
              className="p-4 rounded-2xl bg-white border border-[#E7DFD3] text-left hover:text-[#D97706] hover:border-[#D97706] transition-all"
            >
              L'Herbier des plantes & précautions →
            </button>
            <button 
              onClick={() => onNavigate('questions-frequentes')}
              className="p-4 rounded-2xl bg-white border border-[#E7DFD3] text-left hover:text-[#D97706] hover:border-[#D97706] transition-all"
            >
              Questions fréquentes BloomLab →
            </button>
            <button 
              onClick={() => onNavigate('machine')}
              className="p-4 rounded-2xl bg-white border border-[#E7DFD3] text-left hover:text-[#D97706] hover:border-[#D97706] transition-all"
            >
              L'Extracteur BloomLab (usages culinaires & sensoriels) →
            </button>
          </div>
        </section>

      </main>
    </article>
  );
}
