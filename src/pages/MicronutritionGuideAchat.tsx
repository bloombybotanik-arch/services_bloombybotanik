import React, { useEffect } from 'react';
import { 
  ArrowLeft, 
  Search, 
  AlertCircle, 
  ShieldCheck, 
  CheckCircle2, 
  Scale, 
  FileText, 
  Compass,
  Calendar
} from 'lucide-react';
import { View } from '../types';
import { Language } from '../translations';
import { SafetyBox } from '../components/micronutrition/SafetyBox';
import { Omega3Comparator } from '../components/micronutrition/Omega3Comparator';
import { SourceList } from '../components/micronutrition/SourceList';
import { GLOBAL_MICRONUTRITION_SOURCES } from '../data/micronutritionData';

interface MicronutritionGuideAchatProps {
  onNavigate: (view: View, param?: string) => void;
  lang?: Language;
}

export default function MicronutritionGuideAchat({ onNavigate, lang = 'fr' }: MicronutritionGuideAchatProps) {
  useEffect(() => {
    document.title = "Choisir un complément alimentaire : lire l'étiquette et comparer les produits | Bloom by BotaniK";
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute(
      'content',
      "Apprenez à comparer les compléments alimentaires : quantité active, forme, dose totale, qualité, traçabilité, conservation et précautions d'emploi."
    );
  }, []);

  const guideFaqData = [
    {
      question: "Pourquoi la dose affichée sur le devant de la boîte ne correspond-elle pas toujours au nutriment actif ?",
      answer: "Pour les minéraux comme le magnésium ou le zinc, le fabricant affiche souvent le poids total du sel minéral (ex: 500 mg de bisglycinate de magnésium) et non la quantité de magnésium élémentaire réel (qui n'est que d'environ 60 à 75 mg). Il faut toujours lire le tableau nutritionnel au dos."
    },
    {
      question: "Que signifie le pourcentage des VNR sur une étiquette ?",
      answer: "La Valeur Nutritionnelle de Référence (VNR) correspond aux besoins quotidiens moyens d'un adulte en bonne santé pour éviter une carence nutritionnelle. Elle ne constitue pas un objectif maximal ni une posologie thérapeutique."
    },
    {
      question: "Un produit plus cher est-il forcément de meilleure qualité ?",
      answer: "Pas nécessairement. Le prix reflète souvent les coûts marketing ou le packaging. Ce qui compte réellement est la quantité d'actif net par portion, la pureté certifiée, l'absence d'excipients controversés et la traçabilité du lot."
    }
  ];

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Comment lire l'étiquette d'un complément alimentaire ?",
    "description": "Apprenez à comparer les compléments alimentaires : quantité active, forme, dose totale, qualité, traçabilité, conservation et précautions d'emploi.",
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
    "mainEntityOfPage": "https://bloombybotanik.com/academie/nutrition-et-micronutrition/guide-achat/"
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": guideFaqData.map(item => ({
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
          <nav aria-label="Fil d'Ariane" className="flex items-center gap-2 text-xs text-white/70">
            <button onClick={() => onNavigate('home')} className="hover:text-white transition-colors">Accueil</button>
            <span>/</span>
            <button onClick={() => onNavigate('academie')} className="hover:text-white transition-colors">Bloom Académie</button>
            <span>/</span>
            <button onClick={() => onNavigate('nutrition-et-micronutrition')} className="hover:text-white transition-colors">Micronutrition</button>
            <span>/</span>
            <span className="text-[#D97706] font-semibold">Guide d'Achat</span>
          </nav>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-[#D97706] text-xs font-bold uppercase tracking-widest border border-white/15">
            <Scale className="w-4 h-4 text-[#D97706]" />
            <span>Éducation à l'Achat Responsable</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Comment lire l'étiquette d'un complément alimentaire ?
          </h1>

          <p className="text-base sm:text-lg text-white/85 leading-relaxed font-light max-w-3xl">
            Décrypter les tableaux nutritionnels, déjouer les pièges de dosage entre poids du sel et quantité active, traquer les doublons et comparer le coût réel par gramme d'actif.
          </p>

          <div className="pt-2">
            <button
              onClick={() => onNavigate('nutrition-et-micronutrition')}
              className="inline-flex items-center gap-2 text-xs font-bold text-white/80 hover:text-[#D97706] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Retour au dossier complet Micronutrition</span>
            </button>
          </div>
        </div>
      </header>

      {/* CONTENU DU GUIDE D'ACHAT */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-12">
        
        {/* Avertissement Global de Sécurité */}
        <SafetyBox isGlobalNotice={true} />

        {/* 1. CHERCHER LA QUANTITÉ RÉELLEMENT APPORTÉE */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E7DFD3] space-y-6 shadow-xs">
          <div className="space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-[#D97706]">Étape 1</span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0F261E]">
              1. Chercher la quantité réellement apportée
            </h2>
          </div>

          <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-light">
            La règle d'or d'une étiquette est de ne jamais se fier à l'allégation frontale. Il est impératif d'examiner le tableau des informations nutritionnelles situé au dos de l'emballage :
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E7DFD3] space-y-2">
              <h4 className="font-bold text-sm text-[#0F261E]">Minéraux (Magnésium, Zinc, Fer)</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Vérifiez toujours la part de <strong>nutriment élémentaire</strong>. Par exemple, 500 mg de bisglycinate de magnésium ne contiennent qu'environ 60 à 75 mg de magnésium élémentaire. C'est ce chiffre qui compte.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E7DFD3] space-y-2">
              <h4 className="font-bold text-sm text-[#0F261E]">Oméga-3 Marins</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Ne comparez pas la quantité brute d'huile de poisson (ex: 1 000 mg d'huile), mais le dosage combiné en <strong>EPA et DHA</strong> (ex: 400 mg EPA + 200 mg DHA = 600 mg d'acides gras actifs).
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E7DFD3] space-y-2">
              <h4 className="font-bold text-sm text-[#0F261E]">Vitamines & Unités</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Vérifiez les unités : microgrammes (µg) pour B9, B12, D3, sélénium ; milligrammes (mg) pour vitamine C, B6. Attention aux conversions : 1 µg de vitamine D = 40 UI.
              </p>
            </div>
          </div>
        </section>

        {/* 2. VÉRIFIER LES DOUBLONS */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E7DFD3] space-y-6 shadow-xs">
          <div className="space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-[#D97706]">Étape 2</span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0F261E]">
              2. Vérifier les doublons et les cumuls d'apports
            </h2>
          </div>

          <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-light">
            Une erreur courante consiste à cumuler une multivitamine du matin, une formule spéciale "cheveux & ongles", des boissons enrichies et un complément saisonnier d'immunité.
          </p>

          <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-2 text-xs text-amber-950">
            <strong className="block font-bold">Risque de dépassement des limites de sécurité :</strong>
            <p className="leading-relaxed">
              Le zinc, le sélénium, la vitamine A et la vitamine B6 sont fréquemment présents dans de multiples formules grand public. En cumulant trois produits différents, vous pouvez facilement dépasser la Limite Supérieure de Sécurité établie par l'EFSA (ex: 25 mg pour le zinc, 12 mg pour la B6).
            </p>
          </div>
        </section>

        {/* 3. REGARDER LA QUALITÉ SANS SURPROMETTRE */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E7DFD3] space-y-6 shadow-xs">
          <div className="space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-[#D97706]">Étape 3</span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0F261E]">
              3. Regarder la qualité sans céder aux promesses marketing
            </h2>
          </div>

          <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed font-light">
            <p>
              Privilégiez la transparence factuelle : présence d'un <strong>numéro de lot</strong> traçable, <strong>date de péremption</strong> claire, certificat d'analyses disponible sur demande et adresse complète du metteur sur le marché au sein de l'Union Européenne.
            </p>
            <p>
              Méfiez-vous des arguments miracles non vérifiés : les termes tels que <em>"absorption cellulaire garantie à 100%"</em>, <em>"forme la plus puissante du marché"</em> ou <em>"détox totale"</em> relèvent du marketing abusif et non de la rigueur scientifique.
            </p>
          </div>
        </section>

        {/* 4. CONNAÎTRE LES PRÉCAUTIONS */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E7DFD3] space-y-6 shadow-xs">
          <div className="space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-[#D97706]">Étape 4</span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0F261E]">
              4. Identifier les contre-indications personnelles
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-950 space-y-1">
              <strong className="block font-bold">Anticoagulants AVK & Vitamine K</strong>
              <p>Contre-indication stricte sans avis médical. Risque d'inactivation du médicament.</p>
            </div>
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 space-y-1">
              <strong className="block font-bold">Insuffisance rénale & Minéraux</strong>
              <p>Prudence sur le magnésium et le potassium, dont l'élimination rénale peut être ralentie.</p>
            </div>
            <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200 text-purple-950 space-y-1">
              <strong className="block font-bold">Grossesse & Allaitement</strong>
              <p>Aucun complément sans validation préalable par le gynécologue ou la sage-femme.</p>
            </div>
            <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-blue-950 space-y-1">
              <strong className="block font-bold">Chirurgie programmée</strong>
              <p>Arrêter les oméga-3 à forte dose et les plantes fluidifiantes au moins 1 à 2 semaines avant l'intervention.</p>
            </div>
          </div>
        </section>

        {/* 5. COMPARATEUR OMÉGA-3 INTERACTIF */}
        <section className="space-y-4">
          <div className="space-y-1">
            <span className="text-xs font-black uppercase tracking-widest text-[#D97706]">Étape 5</span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0F261E]">
              5. Comparer les oméga-3 de façon juste
            </h2>
          </div>
          <Omega3Comparator />
        </section>

        {/* FAQ DU GUIDE D'ACHAT */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E7DFD3] space-y-6 shadow-xs">
          <div className="space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-[#D97706]">FAQ Étiquette</span>
            <h2 className="text-2xl font-black text-[#0F261E]">
              Questions fréquentes sur les étiquettes de compléments
            </h2>
          </div>

          <div className="space-y-4 divide-y divide-slate-100">
            {guideFaqData.map((item, idx) => (
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

        {/* Sources & Références */}
        <SourceList sources={GLOBAL_MICRONUTRITION_SOURCES} />

        {/* Retour au dossier */}
        <div className="text-center pt-4">
          <button
            onClick={() => onNavigate('nutrition-et-micronutrition')}
            className="px-6 py-3 rounded-full bg-[#0F261E] hover:bg-[#D97706] text-white font-bold text-xs transition-colors shadow-sm cursor-pointer"
          >
            ← Revenir au dossier complet Nutrition &amp; Micronutrition
          </button>
        </div>

      </main>
    </article>
  );
}
