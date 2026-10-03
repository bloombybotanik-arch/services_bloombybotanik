import React, { useEffect } from 'react';
import { 
  ArrowLeft, 
  AlertTriangle, 
  ShieldAlert, 
  Stethoscope, 
  Baby, 
  HeartHandshake, 
  Compass, 
  Info,
  Calendar,
  CheckCircle2
} from 'lucide-react';
import { View } from '../types';
import { Language } from '../translations';
import { SafetyBox } from '../components/micronutrition/SafetyBox';
import { SourceList } from '../components/micronutrition/SourceList';
import { GLOBAL_MICRONUTRITION_SOURCES, FREQUENT_INTERACTIONS_DATA } from '../data/micronutritionData';

interface MicronutritionPrecautionsProps {
  onNavigate: (view: View, param?: string) => void;
  lang?: Language;
}

export default function MicronutritionPrecautions({ onNavigate, lang = 'fr' }: MicronutritionPrecautionsProps) {
  useEffect(() => {
    document.title = "Compléments alimentaires : précautions, interactions et situations à risque | Bloom by BotaniK";
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute(
      'content',
      "Anticoagulants, grossesse, traitements, chirurgie, troubles rénaux ou digestifs : les situations où demander conseil avant de prendre un complément alimentaire."
    );
  }, []);

  const precautionsFaqData = [
    {
      question: "Pourquoi les produits adsorbants (charbon, argile, zéolithe) doivent-ils être pris à distance des médicaments ?",
      answer: "Les adsorbants possèdent une structure microporeuse qui capte indifféremment les molécules présentes dans le tractus digestif. Pris en même temps qu'un médicament (pilule contraceptive, anticoagulant, antidiabétique, hormones thyroïdiennes), ils peuvent l'inactiver en empêchant son absorption. Une distance d'au moins 2 à 3 heures est indispensable."
    },
    {
      question: "Que faire en cas de troubles digestifs persistants ?",
      answer: "Une gêne digestive qui dure (douleurs, ballonnements constants, alternance diarrhée/constipation, perte de poids) ne doit pas être traitée par l'auto-médication de compléments. Il est nécessaire de consulter un médecin généraliste ou un gastro-entérologue afin d'établir un diagnostic médical précis."
    },
    {
      question: "Puis-je prendre des compléments alimentaires pendant la grossesse ?",
      answer: "Pendant la grossesse et l'allaitement, aucun complément alimentaire ni extrait de plante ne doit être pris sans l'accord explicite du médecin ou de la sage-femme. Seules les supplémentations prescrites (comme les folates en période périconceptionnelle) sont recommandées."
    }
  ];

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Compléments alimentaires : les précautions à connaître",
    "description": "Anticoagulants, grossesse, traitements, chirurgie, troubles rénaux ou digestifs : les situations où demander conseil avant de prendre un complément alimentaire.",
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
    "mainEntityOfPage": "https://bloombybotanik.com/academie/nutrition-et-micronutrition/precautions-et-interactions/"
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": precautionsFaqData.map(item => ({
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
            <span className="text-[#D97706] font-semibold">Précautions &amp; Interactions</span>
          </nav>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-amber-300 text-xs font-bold uppercase tracking-widest border border-white/15">
            <ShieldAlert className="w-4 h-4 text-amber-300" />
            <span>Sécurité &amp; Pharmacovigilance</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Compléments alimentaires : les précautions à connaître
          </h1>

          <p className="text-base sm:text-lg text-white/85 leading-relaxed font-light max-w-3xl">
            Anticoagulants, grossesse, traitements thyroïdiens, chirurgie programmée, insuffisance rénale ou prise d'adsorbants : panorama clair des situations où un avis médical préalable est impératif.
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

      {/* CONTENU PRINCIPAL */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-12">
        
        {/* Avertissement Global Réglementaire */}
        <SafetyBox isGlobalNotice={true} />

        {/* 1. MÉDICAMENTS ET COMPLÉMENTS */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E7DFD3] space-y-6 shadow-xs">
          <div className="space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-[#D97706]">Volet 1</span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0F261E]">
              Médicaments et compléments : les grandes familles à risque
            </h2>
          </div>

          <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-light">
            Certaines classes thérapeutiques sont particulièrement sensibles aux variations d'absorption ou aux interactions pharmacodynamiques avec les nutriments concentrés :
          </p>

          <div className="space-y-4 pt-2">
            {FREQUENT_INTERACTIONS_DATA.map((item, idx) => (
              <SafetyBox
                key={idx}
                niveau_de_vigilance={idx === 0 || idx === 3 ? 'imperatif' : 'moderee'}
                titre={item.category}
                situations_concernées={[item.risks]}
                action_recommandée={item.action}
              />
            ))}
          </div>
        </section>

        {/* 2. GROSSESSE, ALLAITEMENT ET ENFANCE */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E7DFD3] space-y-6 shadow-xs">
          <div className="space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-[#D97706]">Volet 2</span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0F261E]">
              Grossesse, allaitement et enfance : prudence absolue
            </h2>
          </div>

          <div className="flex items-start gap-4 p-5 rounded-2xl bg-purple-50/70 border border-purple-200 text-xs sm:text-sm text-purple-950">
            <Baby className="w-6 h-6 text-purple-600 shrink-0 mt-0.5" />
            <div className="space-y-2 leading-relaxed">
              <strong className="block font-bold">Aucune automédication pendant la période périnatale :</strong>
              <p>
                La barrière placentaire et le lait maternel transmettent activement de nombreuses molécules à l'embryon et au nourrisson. Aucune recommandation standardisée de plantes, extraits hydroalcooliques, algues, huiles essentielles ou compléments spécialisés (NAC, berbérine, mélatonine) ne doit être mise en œuvre sans validation directe par un médecin gynécologue, une sage-femme ou un pédiatre.
              </p>
              <p className="text-purple-800">
                Seule la supplémentation en folates (vitamine B9) fait l'objet d'un consensus de santé publique avant la conception et en début de grossesse, sous encadrement médical.
              </p>
            </div>
          </div>
        </section>

        {/* 3. TROUBLES DIGESTIFS ET SYMPTÔMES PERSISTANTS */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E7DFD3] space-y-6 shadow-xs">
          <div className="space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-[#D97706]">Volet 3</span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0F261E]">
              Troubles digestifs et symptômes persistants : savoir consulter
            </h2>
          </div>

          <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed font-light">
            <p>
              Il ne faut jamais confondre une gêne digestive chronique avec un simple besoin de compléments alimentaires. Des ballonnements permanents, des douleurs abdominales récurrentes, des diarrhées chroniques ou une perte de poids involontaire exigent une démarche diagnostique médicale auprès d'un gastro-entérologue.
            </p>
            <p className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-950">
              <strong>Signes d'alerte (Red Flags) imposant un avis médical urgent :</strong> sang dans les selles, fièvre persistante, fatigue intense nouvelle et inexpliquée, ictère (jaunisse) ou douleur thoracique. Les compléments alimentaires ne doivent en aucun cas retarder une consultation médicale.
            </p>
          </div>
        </section>

        {/* 4. ARGILES, CHARBON, ZÉOLITHE ET PRODUITS ADSORBANTS */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E7DFD3] space-y-6 shadow-xs">
          <div className="space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-[#D97706]">Volet 4</span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0F261E]">
              Argiles, charbon, zéolithe et minéraux adsorbants
            </h2>
          </div>

          <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed font-light">
            <p>
              Les poudres minérales adsorbantes (zéolithe clinoptilolite, bentonite, montmorillonite, charbon actif végétal) possèdent une microporosité spécifique leur conférant des propriétés d'adsorption physique de surface.
            </p>
            <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-2 text-xs text-amber-950">
              <strong className="block font-bold">Règle de sécurité impérative des 2 heures :</strong>
              <p className="leading-relaxed">
                Parce que leur capacité d'adsorption dans la lumière digestive n'est pas sélective, ces matières peuvent lier et inactiver les principes actifs de médicaments essentiels (contraceptifs oraux, traitements cardiovasculaires, antidépresseurs, antibiotiques) ainsi que les vitamines et minéraux de l'alimentation.
              </p>
              <p className="font-semibold text-amber-900">
                → Respecter impérativement un intervalle minimal de 2 heures (idéalement 3 heures) entre la prise de tout adsorbant minéral et vos traitements ou repas.
              </p>
            </div>
            <p className="text-[11px] text-slate-500 italic">
              Note réglementaire : les compléments alimentaires à base d'argiles ou zéolithe ne doivent jamais être présentés comme des chélateurs de métaux lourds ou des traitements de détoxification pathologique.
            </p>
          </div>
        </section>

        {/* FAQ DE SÉCURITÉ */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E7DFD3] space-y-6 shadow-xs">
          <div className="space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-[#D97706]">FAQ Sécurité</span>
            <h2 className="text-2xl font-black text-[#0F261E]">
              Questions fréquentes sur les précautions d'emploi
            </h2>
          </div>

          <div className="space-y-4 divide-y divide-slate-100">
            {precautionsFaqData.map((item, idx) => (
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
