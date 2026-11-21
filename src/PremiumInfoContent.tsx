import React, { useRef } from 'react';
import { motion } from 'motion/react';
import {
  Star,
  Check,
  Sparkles,
  BookOpen,
  ArrowRight,
  Activity,
  AlertCircle,
  Package,
  Compass,
  Calendar,
  CheckCircle2,
  XCircle,
  ShieldAlert,
  Leaf,
} from 'lucide-react';
import { Language } from './translations';

interface PremiumInfoProps {
  onNavigate: (view: any, param?: string) => void;
  onAddToCart?: (product: any) => void;
  lang: Language;
}

export default function PremiumInfoContent({ onNavigate, onAddToCart, lang }: PremiumInfoProps) {
  const isFR = lang === 'fr';
  const isDE = lang === 'de';
  const pricingRef = useRef<HTMLDivElement>(null);

  const scrollToPricing = () => {
    pricingRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubscribe = (type: 'monthly' | 'annual' | 'complet') => {
    if (type === 'complet') {
      const bloomCompletProduct = {
        id: 'bloom-complet',
        name: isFR
          ? "Bloom Complet — L'accompagnement botanique mensuel"
          : isDE
          ? 'Bloom Komplett — Monatliche botanische Begleitung'
          : 'Bloom Complete — Monthly Botanical Guidance',
        subtitle: isFR
          ? 'Préparation botanique mensuelle + guide + accès inclus (59 €/mois)'
          : isDE
          ? 'Monatliche botanische Zubereitung + Leitfaden + Zugang inklusive (59 €/Monat)'
          : 'Monthly botanical blend + guide + included access (59 €/month)',
        price: 59,
        image: '/assets/images/bloomlab_main_1784887530345.jpeg',
        description: isFR
          ? "Une préparation botanique Bloom livrée chaque mois, accompagnée de son guide d'utilisation, de vos accès aux recettes et méthodes, et d'Alma pour votre orientation."
          : isDE
          ? 'Eine monatlich gelieferte botanische Zubereitung von Bloom samt Anwendungsleitfaden, Zugang zu Rezepten & Methoden und Orientierung mit Alma.'
          : 'A guided botanical preparation delivered monthly, with discovery guide, recipe & method access, and Alma guidance.',
        isDigital: false,
        isSubscription: true,
        quantity: 1,
      };
      if (onAddToCart) {
        onAddToCart(bloomCompletProduct);
      }
      onNavigate('cart');
      return;
    }

    const premiumProduct = {
      id: 'premium-access',
      name: isFR
        ? type === 'annual'
          ? 'Abonnement Annuel Premium'
          : 'Abonnement Mensuel Premium'
        : isDE
        ? type === 'annual'
          ? 'Jährliches Premium-Abo'
          : 'Monatliches Premium-Abo'
        : type === 'annual'
        ? 'Annual Premium Subscription'
        : 'Monthly Premium Subscription',
      price: type === 'annual' ? 79 : 9,
      image: '/assets/images/bloomlab_main_1784887530345.jpeg',
      description: isFR
        ? "Accès illimité à l'intégralité des 60+ protocoles experts Bloom, fiches plantes et mises à jour continues."
        : isDE
        ? 'Unbegrenzter Zugang zu allen über 60 Bloom-Expertenprotokollen, Pflanzenmonografien und laufenden Updates.'
        : 'Unlimited access to all 60+ Bloom expert protocols, plant monographs, and continuous updates.',
      isDigital: true,
      isSubscription: true,
      quantity: 1,
    };

    if (onAddToCart) {
      onAddToCart(premiumProduct);
      onNavigate('cart');
    } else {
      onNavigate('cart');
    }
  };

  const idealProfileItems = isFR
    ? [
        'Vous souhaitez découvrir les plantes sans devoir tout apprendre seul.',
        'Vous voulez recevoir chaque mois une préparation botanique expliquée.',
        "Vous n'êtes pas encore prêt à acheter BloomLab, mais vous souhaitez explorer la méthode Bloom.",
        'Vous aimez les pratiques maison, la cuisine botanique ou les soins cosmétiques externes selon les contenus disponibles.',
        "Vous recherchez un parcours progressif plutôt qu'une accumulation de produits.",
        'Vous voulez mieux comprendre les ingrédients et les méthodes avant de vous équiper.',
      ]
    : isDE
    ? [
        'Sie möchten Pflanzen entdecken, ohne alles im Alleingang lernen zu müssen.',
        'Sie wünschen sich jeden Monat eine verständlich erklärte botanische Zubereitung.',
        'Sie sind noch nicht bereit für den Kauf von BloomLab, möchten aber die Bloom-Methode kennenlernen.',
        'Sie schätzen selbstgemachte Zubereitungen, botanische Küche oder äußerliche Naturkosmetik.',
        'Sie suchen einen strukturierten Stufenweg statt einer Ansammlung einzelner Produkte.',
        'Sie möchten Inhaltsstoffe und Extraktionsmethoden verstehen, bevor Sie sich selbst ausstatten.',
      ]
    : [
        'You want to explore botanicals without having to learn everything alone first.',
        'You want to receive a clearly explained monthly botanical preparation.',
        'You are not yet ready to purchase BloomLab®, yet want to discover the Bloom method.',
        'You enjoy home botanical crafting, culinary infusions, or external skincare formulations.',
        'You prefer a structured step-by-step journey over accumulating isolated supplements.',
        'You want to understand ingredients and extraction methods before equipping your kitchen.',
      ];

  const comparisonRows = isFR
    ? [
        {
          without: 'Chercher des recettes dispersées et parfois contradictoires',
          with: 'Recevoir une préparation et un guide éditorialisé',
        },
        {
          without: 'Acheter des plantes sans savoir comment les découvrir',
          with: 'Commencer avec une préparation expliquée et des ressources associées',
        },
        {
          without: "Devoir acheter BloomLab avant de connaître l'univers",
          with: 'Explorer la méthode Bloom sans achat de machine nécessaire',
        },
        {
          without: 'Ne pas savoir quoi découvrir le mois suivant',
          with: 'Suivre une progression et des propositions saisonnières selon la formule',
        },
        {
          without: 'Être seul face aux informations disponibles en ligne',
          with: "Être orienté vers les contenus, recettes et précautions disponibles dans l'écosystème Bloom",
        },
      ]
    : isDE
    ? [
        {
          without: 'Verstreute und teils widersprüchliche Rezepte im Netz zusammensuchen',
          with: 'Eine fertige Zubereitung samt redaktionellem Begleitheft erhalten',
        },
        {
          without: 'Kräuter kaufen, ohne genau zu wissen, wie man sie anwendet',
          with: 'Mit einer klar erklärten Zubereitung und passenden Lernressourcen starten',
        },
        {
          without: 'BloomLab kaufen zu müssen, bevor man das Konzept kennt',
          with: 'Die Bloom-Methode ganz ohne eigene Geräteanschaffung kennenlernen',
        },
        {
          without: 'Nicht wissen, was im nächsten Monat sinnvoll ist',
          with: 'Einem klaren, saisonal abgestimmten Pfad folgen',
        },
        {
          without: 'Mit Online-Informationen auf sich allein gestellt sein',
          with: 'Im Bloom-Ökosystem gezielt zu Rezepten, Methoden und Vorsichtshinweisen navigieren',
        },
      ]
    : [
        {
          without: 'Searching scattered and sometimes contradictory recipes online',
          with: 'Receiving a ready preparation with a curated editorial guide',
        },
        {
          without: 'Buying dried herbs without knowing how to prepare them properly',
          with: 'Starting with an explained preparation and matching reference guides',
        },
        {
          without: 'Having to purchase BloomLab® before experiencing the method',
          with: 'Exploring the Bloom method without buying hardware upfront',
        },
        {
          without: 'Guessing what to explore next month',
          with: 'Following a seasonal progression tailored to your plan',
        },
        {
          without: 'Navigating unfiltered online claims on your own',
          with: 'Being guided directly to published recipes, precautions, and Herbarium notes',
        },
      ];

  const almaCan = isFR
    ? [
        'Expliquer une recette ou un guide déjà validé et publié.',
        'Aider à retrouver une fiche plante ou un contenu de la bibliothèque.',
        "Orienter vers les contenus débutants ou avancés inclus dans l'abonnement.",
        'Rappeler les indications de conservation publiées.',
        'Diriger vers les précautions et limites disponibles.',
        "Aider à retrouver les informations de livraison, d'accès ou d'abonnement.",
      ]
    : isDE
    ? [
        'Ein bereits veröffentlichtes Rezept oder einen Leitfaden verständlich erklären.',
        'Eine bestimmte Pflanzenmonografie oder ein Bibliotheksthema schnell auffinden.',
        'Zu Einsteiger- oder Fortgeschrittenen-Inhalten Ihres Abos navigieren.',
        'Auf die veröffentlichten Hinweise zur Haltbarkeit und Lagerung verweisen.',
        'Relevante Vorsichtshinweise und Anwendungsgrenzen aufzeigen.',
        'Informationen zu Lieferung, Zugang oder Abonnementverwaltung bereitstellen.',
      ]
    : [
        'Explain any already validated and published recipe or guide.',
        'Help locate a specific plant monograph or Library entry.',
        'Point you to beginner or advanced resources included in your plan.',
        'Remind you of published shelf-life and storage recommendations.',
        'Surface documented precautions and usage boundaries.',
        'Help you check delivery, account access, or subscription details.',
      ];

  const almaCannot = isFR
    ? [
        'Poser un diagnostic.',
        'Évaluer une pathologie, un symptôme ou une urgence médicale.',
        'Recommander une préparation pour traiter une maladie.',
        'Donner une posologie ou un protocole médical personnalisé.',
        "Conseiller d'arrêter ou modifier un médicament.",
        'Donner un avis personnalisé en cas de grossesse, traitement ou pathologie.',
        "Garantir la sécurité ou l'efficacité d'une préparation individuelle.",
      ]
    : isDE
    ? [
        'Eine Diagnose stellen.',
        'Krankheiten, Symptome oder medizinische Notfälle bewerten.',
        'Eine Zubereitung zur Behandlung einer Erkrankung empfehlen.',
        'Eine medizinisch personalisierte Dosierung vorgeben.',
        'Empfehlen, ein Medikament abzusetzen oder zu verändern.',
        'Individuelle medizinische Ratschläge bei Schwangerschaft, Stillzeit oder Medikation geben.',
        'Die Wirksamkeit oder Sicherheit einer Eigenmischung garantieren.',
      ]
    : [
        'Provide a medical diagnosis.',
        'Evaluate a disease, clinical symptom, or medical emergency.',
        'Recommend a preparation to treat or cure any illness.',
        'Prescribe personalized medical dosages.',
        'Advise stopping or altering a prescribed medication.',
        'Give individualized medical advice during pregnancy, breastfeeding, or treatment.',
        'Guarantee the clinical outcome or safety of a homemade preparation.',
      ];

  const steps = isFR
    ? [
        {
          step: '1',
          title: 'Créez votre espace',
          desc: 'Retrouvez vos livraisons, vos contenus inclus et les informations de votre formule.',
        },
        {
          step: '2',
          title: 'Vos univers',
          desc: 'Choisissez parmi : découverte des plantes, cuisine botanique, huiles infusées ou soins externes.',
        },
        {
          step: '3',
          title: 'Les précautions',
          desc: 'Consultez les informations disponibles concernant les ingrédients, la conservation et les précautions.',
        },
        {
          step: '4',
          title: 'Envoi mensuel',
          desc: 'Votre préparation (100 ml) et son guide sont envoyés selon le calendrier de votre formule.',
        },
        {
          step: '5',
          title: 'Découvrez',
          desc: 'Explorez les contenus inclus, retrouvez vos ressources et utilisez Alma pour vous orienter.',
        },
      ]
    : isDE
    ? [
        {
          step: '1',
          title: 'Zugang einrichten',
          desc: 'Verwalten Sie Lieferungen, Ihre enthaltenen Inhalte und alle Tarifdetails an einem Ort.',
        },
        {
          step: '2',
          title: 'Ihre Themenwelten',
          desc: 'Wählen Sie zwischen Pflanzenkunde, botanischer Küche, Ölauszügen oder äußerlicher Pflege.',
        },
        {
          step: '3',
          title: 'Vorsichtshinweise',
          desc: 'Prüfen Sie dokumentierte Hinweise zu Inhaltsstoffen, Lagerung und Kontraindikationen.',
        },
        {
          step: '4',
          title: 'Monatlicher Versand',
          desc: 'Ihre 100-ml-Zubereitung und das Begleitheft werden gemäß Ihrem Abo-Kalender versendet.',
        },
        {
          step: '5',
          title: 'Entdecken',
          desc: 'Nutzen Sie die Bibliothek und lassen Sie sich von Alma sicher durch alle Inhalte führen.',
        },
      ]
    : [
        {
          step: '1',
          title: 'Create your space',
          desc: 'Track your deliveries, included resources, and plan preferences in one place.',
        },
        {
          step: '2',
          title: 'Pick your focus',
          desc: 'Explore herbal discovery, botanical cuisine, infused oils, or external skincare.',
        },
        {
          step: '3',
          title: 'Review precautions',
          desc: 'Consult published notes covering ingredients, storage, and safety guidelines.',
        },
        {
          step: '4',
          title: 'Monthly shipment',
          desc: 'Your 100 ml preparation and discovery guide ship according to your schedule.',
        },
        {
          step: '5',
          title: 'Discover & learn',
          desc: 'Browse the Library at your own pace and use Alma to navigate every guide.',
        },
      ];

  return (
    <div data-product-page="true" className="product-detail flex-1 bg-[#F9F9F7] min-h-screen">
      {/* Promotional Banner */}
      <div className="bg-[#D97706]/10 text-[#B45309] border-b border-[#D97706]/30 text-center py-2.5 px-4 text-[10px] md:text-xs font-black uppercase tracking-[0.2em]">
        {isFR
          ? '🇫🇷 Ingénierie Botanique Française • Expédition 24/48h • Garantie 1 an • Paiement en 3x sans frais'
          : isDE
          ? '🇫🇷 Französische Botanik-Ingenieurskunst • Versand 24/48h • 1 Jahr Garantie • 3x zinsfrei'
          : '🇫🇷 French Botanical Engineering • 24/48h Shipping • 1-Year Warranty • 3x Fee-Free'}
      </div>

      {/* 1. Breadcrumb */}
      <div className="w-full bg-[#0F261E] border-b border-white/10 px-3 sm:px-4 md:px-8 py-2.5 sm:py-3 text-left">
        <nav aria-label="Fil d'Ariane" className="max-w-7xl mx-auto flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[11px] sm:text-xs text-white">
          <button
            onClick={() => onNavigate('home')}
            className="text-white/80 hover:text-[#F5F0E6] transition-colors cursor-pointer"
          >
            {isFR ? 'Accueil' : isDE ? 'Startseite' : 'Home'}
          </button>
          <span className="text-white/40">/</span>
          <button
            onClick={() => onNavigate('boutique')}
            className="text-white/80 hover:text-[#F5F0E6] transition-colors cursor-pointer"
          >
            {isFR ? 'Boutique' : 'Shop'}
          </button>
          <span className="text-white/40">/</span>
          <span className="text-white font-bold" aria-current="page">
            {isFR ? 'Abonnement Numérique & Bloom Complet' : isDE ? 'Digital-Abo & Bloom Komplett' : 'Digital Plan & Bloom Complete'}
          </span>
        </nav>
      </div>

      {/* 2. Hero */}
      <section className="relative py-16 md:py-24 px-6 overflow-hidden text-white bg-[#1E2E25] border-b border-white/10">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-white/20 text-[#C8AB8A]"
          >
            <Star className="w-3.5 h-3.5 fill-[#C8AB8A]" />
            <span style={{ color: '#C8AB8A' }}>
              {isFR
                ? "BLOOM COMPLET — L'ACCOMPAGNEMENT BOTANIQUE MENSUEL"
                : isDE
                ? 'BLOOM KOMPLETT — MONATLICHE BOTANISCHE BEGLEITUNG'
                : 'BLOOM COMPLETE — MONTHLY BOTANICAL GUIDANCE'}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6 leading-tight text-white"
            style={{ color: '#ffffff' }}
          >
            {isFR
              ? 'Une préparation botanique guidée, livrée chaque mois.'
              : isDE
              ? 'Eine geführte botanische Zubereitung, jeden Monat geliefert.'
              : 'Guided botanical preparation, delivered every month.'}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-white/90 max-w-2xl mx-auto leading-relaxed mb-6"
            style={{ color: '#F3F4F6' }}
          >
            {isFR
              ? "Vous souhaitez explorer les plantes, mais vous ne savez pas par où commencer ? Vous n'avez pas besoin d'être expert, de posséder BloomLab ou de passer des heures à chercher des recettes. Bloom prépare une sélection botanique, vous l'envoie à domicile et vous accompagne avec des ressources claires pour comprendre ce que vous recevez."
              : isDE
              ? 'Sie möchten die Welt der Pflanzen entdecken, wissen aber nicht, wo Sie anfangen sollen? Sie brauchen weder Vorkenntnisse noch ein BloomLab-Gerät. Bloom stellt jeden Monat eine botanische Auswahl für Sie zusammen, liefert sie direkt nach Hause und begleitet Sie mit klaren Leitfäden.'
              : "Want to explore botanicals without knowing where to start? You don't need to be an expert, own BloomLab®, or spend hours searching recipes. Bloom prepares a botanical blend, delivers it to your door, and guides you with clear resources."}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="text-sm font-semibold italic text-[#C8AB8A] mb-8"
          >
            {isFR
              ? '« Nous préparons. Vous découvrez. Vous avancez à votre rythme. »'
              : isDE
              ? '„Wir bereiten vor. Sie entdecken. Sie gehen in Ihrem eigenen Tempo voran.“'
              : '“We prepare. You discover. You advance at your own pace.”'}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button
              onClick={() => handleSubscribe('complet')}
              className="w-full sm:w-auto px-8 py-4 bg-[#3E4A3D] hover:bg-[#2D372C] text-white rounded-2xl font-bold text-sm transition-all shadow-xl cursor-pointer flex items-center justify-center gap-2"
            >
              <span>
                {isFR
                  ? 'Commencer avec Bloom Complet'
                  : isDE
                  ? 'Mit Bloom Komplett starten'
                  : 'Start with Bloom Complete'}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={scrollToPricing}
              className="w-full sm:w-auto px-6 py-4 bg-white/10 hover:bg-white/15 text-white border border-white/20 rounded-2xl font-bold text-sm transition-all cursor-pointer"
            >
              {isFR ? 'Voir ce qui est inclus' : isDE ? 'Leistungen ansehen' : 'See what is included'}
            </button>
          </motion.div>
        </div>
      </section>

      {/* 2. Pricing Cards */}
      <section ref={pricingRef} className="max-w-6xl mx-auto px-6 -mt-10 mb-20 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {/* Formule 1: Digitale Mensuelle */}
          <div
            className="rounded-3xl p-8 border border-[#E7DFD3] shadow-lg flex flex-col justify-between"
            style={{ backgroundColor: '#FAF7F2', color: '#3E4A3D' }}
          >
            <div>
              <div className="text-xs uppercase font-bold tracking-widest text-[#3E4A3D]/70 mb-2">
                {isFR ? 'Formule Essentielle' : isDE ? 'Basis-Tarif' : 'Essential Formula'}
              </div>
              <h3 className="text-2xl font-bold text-[#3E4A3D] mb-2" style={{ color: '#3E4A3D' }}>
                {isFR ? 'Digital Mensuel' : isDE ? 'Digital Monatlich' : 'Monthly Digital'}
              </h3>
              <p className="text-sm text-[#3E4A3D]/80 mb-6 leading-relaxed">
                {isFR
                  ? 'Pour explorer à votre rythme, sans engagement de durée.'
                  : isDE
                  ? 'Entdecken Sie die Bibliothek in Ihrem Tempo, jederzeit kündbar.'
                  : 'Explore at your own pace, cancel anytime.'}
              </p>
              <div className="mb-6 flex items-baseline gap-1">
                <span className="text-4xl font-black text-[#3E4A3D]" style={{ color: '#3E4A3D' }}>
                  9€
                </span>
                <span className="text-sm text-[#3E4A3D]/70">
                  {isFR ? '/mois' : isDE ? '/Monat' : '/month'}
                </span>
              </div>
              <ul className="space-y-3 text-sm text-[#3E4A3D]/85 mb-8">
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                  <span>
                    {isFR
                      ? 'Accès aux 60+ fiches recettes et méthodes'
                      : isDE
                      ? 'Zugang zu 60+ Rezepten & Extraktionsmethoden'
                      : 'Access to 60+ recipe sheets & methods'}
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                  <span>
                    {isFR
                      ? 'Paramètres précis (t°, temps, solvants)'
                      : isDE
                      ? 'Exakte Parameter (Temp., Zeit, Lösungsmittel)'
                      : 'Exact parameters (temp., timing, solvents)'}
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                  <span>
                    {isFR
                      ? 'Résiliable en 1 clic à tout moment'
                      : isDE
                      ? 'Jederzeit mit 1 Klick kündbar'
                      : 'Cancel in 1 click anytime'}
                  </span>
                </li>
              </ul>
            </div>
            <button
              onClick={() => handleSubscribe('monthly')}
              className="w-full py-3.5 px-6 rounded-2xl border-2 border-[#3E4A3D] text-[#3E4A3D] font-bold text-sm hover:bg-[#3E4A3D] hover:text-white transition-all cursor-pointer"
            >
              {isFR ? 'Choisir la formule mensuelle' : isDE ? 'Monatstarif wählen' : 'Select Monthly Plan'}
            </button>
          </div>

          {/* Formule 2: Bloom Complet */}
          <div
            className="rounded-3xl p-8 shadow-2xl border-2 border-[#C8AB8A] relative flex flex-col justify-between transform md:-translate-y-4"
            style={{ backgroundColor: '#3E4A3D', color: '#ffffff' }}
          >
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#C8AB8A] text-[#0F261E] text-[11px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-md">
              {isFR ? 'Recommandé • Offre Complète' : isDE ? 'Empfohlen • Komplettpaket' : 'Recommended • Best Value'}
            </div>
            <div>
              <div
                className="text-xs uppercase font-bold tracking-widest text-[#C8AB8A] mb-2 pt-2"
                style={{ color: '#C8AB8A' }}
              >
                {isFR
                  ? 'ACCOMPAGNEMENT BOTANIQUE MENSUEL'
                  : isDE
                  ? 'MONATLICHE BOTANISCHE BEGLEITUNG'
                  : 'MONTHLY BOTANICAL GUIDANCE'}
              </div>
              <h3 className="text-2xl font-bold text-white mb-2" style={{ color: '#ffffff' }}>
                {isFR ? 'Bloom Complet' : isDE ? 'Bloom Komplett' : 'Bloom Complete'}
              </h3>
              <p className="text-sm text-white/85 mb-4 leading-relaxed" style={{ color: '#E5E7EB' }}>
                {isFR
                  ? 'Votre préparation botanique guidée, livrée chaque mois.'
                  : isDE
                  ? 'Ihre geführte botanische Zubereitung, jeden Monat geliefert.'
                  : 'Your guided botanical preparation delivered monthly.'}
              </p>
              <div className="mb-2 flex items-baseline gap-1">
                <span className="text-4xl font-black text-white" style={{ color: '#ffffff' }}>
                  59€
                </span>
                <span className="text-sm text-white/75" style={{ color: '#D1D5DB' }}>
                  {isFR ? '/mois' : isDE ? '/Monat' : '/month'}
                </span>
              </div>
              <p className="text-[11px] text-white/70 mb-6 italic">
                {isFR
                  ? 'Sans engagement — suspension ou résiliation selon les conditions affichées.'
                  : isDE
                  ? 'Ohne Mindestlaufzeit — jederzeit pausierbar oder kündbar.'
                  : 'No commitment — pause or cancel anytime per displayed terms.'}
              </p>
              <ul className="space-y-3 text-sm text-white/90 mb-6">
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-[#C8AB8A] flex-shrink-0 mt-0.5" />
                  <span style={{ color: '#ffffff' }}>
                    {isFR ? (
                      <><strong>1 préparation botanique Bloom</strong> (format 100 ml)</>
                    ) : isDE ? (
                      <><strong>1 botanische Zubereitung</strong> (100 ml Flasche)</>
                    ) : (
                      <><strong>1 Bloom botanical preparation</strong> (100 ml bottle)</>
                    )}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-[#C8AB8A] flex-shrink-0 mt-0.5" />
                  <span style={{ color: '#ffffff' }}>
                    {isFR ? (
                      <><strong>Un guide clair :</strong> ingrédients, usage prévu, conservation et précautions</>
                    ) : isDE ? (
                      <><strong>Ein klarer Leitfaden:</strong> Inhaltsstoffe, Anwendung, Lagerung & Hinweise</>
                    ) : (
                      <><strong>A clear guide:</strong> ingredients, intended use, storage & precautions</>
                    )}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-[#C8AB8A] flex-shrink-0 mt-0.5" />
                  <span style={{ color: '#ffffff' }}>
                    {isFR ? (
                      <><strong>Accès à la bibliothèque</strong> de recettes et méthodes incluse</>
                    ) : isDE ? (
                      <><strong>Zugang zur Bibliothek</strong> mit Rezepten und Methoden inklusive</>
                    ) : (
                      <><strong>Full Library access</strong> to recipes and methods included</>
                    )}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-[#C8AB8A] flex-shrink-0 mt-0.5" />
                  <span style={{ color: '#ffffff' }}>
                    {isFR ? (
                      <><strong>Un parcours progressif</strong>, sans achat de BloomLab nécessaire</>
                    ) : isDE ? (
                      <><strong>Stufenweiser Lernpfad</strong>, ohne dass ein BloomLab-Gerät nötig ist</>
                    ) : (
                      <><strong>Progressive journey</strong>, no BloomLab® hardware purchase required</>
                    )}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-[#C8AB8A] flex-shrink-0 mt-0.5" />
                  <span style={{ color: '#ffffff' }}>
                    {isFR ? (
                      <><strong>Alma :</strong> assistant d'orientation dans l'univers Bloom</>
                    ) : isDE ? (
                      <><strong>Alma:</strong> Orientierungsassistentin im Bloom-Universum</>
                    ) : (
                      <><strong>Alma:</strong> orientation assistant inside the Bloom universe</>
                    )}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-[#C8AB8A] flex-shrink-0 mt-0.5" />
                  <span style={{ color: '#ffffff' }}>
                    {isFR
                      ? 'Collections et contenus saisonniers'
                      : isDE
                      ? 'Saisonale Kollektionen und Inhalte'
                      : 'Seasonal collections & curated guides'}
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <button
                onClick={() => handleSubscribe('complet')}
                className="w-full py-4 px-6 rounded-2xl bg-[#3E4A3D] hover:bg-[#2D372C] text-white font-bold text-sm transition-all shadow-lg cursor-pointer mb-4"
                style={{ backgroundColor: '#C8AB8A', color: '#ffffff' }}
              >
                {isFR ? 'Commencer avec Bloom Complet' : isDE ? 'Mit Bloom Komplett starten' : 'Start with Bloom Complete'}
              </button>

              <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-[10px] text-white/70 leading-relaxed flex items-start gap-2">
                <AlertCircle className="w-3.5 h-3.5 text-[#C8AB8A] shrink-0 mt-0.5" />
                <span>
                  {isFR
                    ? "Bloom Complet est un accompagnement de découverte et de préparation botanique. Il ne remplace pas un médicament, un diagnostic, une consultation médicale ni les conseils d'un pharmacien."
                    : isDE
                    ? 'Bloom Komplett dient der botanischen Entdeckung und Weiterbildung. Es ersetzt keine Medikamente, Diagnosen, ärztlichen Konsultationen oder Apothekerberatung.'
                    : 'Bloom Complete is an educational botanical discovery service. It does not replace medication, diagnosis, medical advice, or pharmacist guidance.'}
                </span>
              </div>
            </div>
          </div>

          {/* Formule 3: Digitale Annuelle */}
          <div
            className="rounded-3xl p-8 border border-[#E7DFD3] shadow-lg flex flex-col justify-between"
            style={{ backgroundColor: '#FAF7F2', color: '#3E4A3D' }}
          >
            <div>
              <div className="text-xs uppercase font-bold tracking-widest text-[#3E4A3D]/70 mb-2">
                {isFR ? 'Souveraineté Annuelle' : isDE ? 'Jahres-Zugang' : 'Annual Sovereignty'}
              </div>
              <h3 className="text-2xl font-bold text-[#3E4A3D] mb-2" style={{ color: '#3E4A3D' }}>
                {isFR ? 'Digital Annuel' : isDE ? 'Digital Jährlich' : 'Annual Digital'}
              </h3>
              <p className="text-sm text-[#3E4A3D]/80 mb-6 leading-relaxed">
                {isFR
                  ? "L'accès illimité pendant 1 an avec 2 mois offerts inclus."
                  : isDE
                  ? '1 Jahr unbegrenzter Zugang inklusive 2 Gratismonaten.'
                  : 'Unlimited access for 1 full year with 2 months free.'}
              </p>
              <div className="mb-6 flex items-baseline gap-1">
                <span className="text-4xl font-black text-[#3E4A3D]" style={{ color: '#3E4A3D' }}>
                  79€
                </span>
                <span className="text-sm text-[#3E4A3D]/70">{isFR ? '/an' : isDE ? '/Jahr' : '/year'}</span>
                <span className="ml-2 text-xs bg-[#C8AB8A]/10 text-[#C8AB8A] font-bold px-2 py-0.5 rounded-full border border-[#C8AB8A]/20">
                  {isFR ? '2 mois offerts' : isDE ? '2 Monate gratis' : '2 months free'}
                </span>
              </div>
              <ul className="space-y-3 text-sm text-[#3E4A3D]/85 mb-8">
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                  <span>
                    {isFR
                      ? "Tout le catalogue de protocoles d'extraction"
                      : isDE
                      ? 'Der gesamte Katalog an Extraktionsprotokollen'
                      : 'Complete catalog of extraction protocols'}
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                  <span>
                    {isFR
                      ? 'Mises à jour mensuelles des nouvelles recettes'
                      : isDE
                      ? 'Monatliche Updates mit neuen Rezepten'
                      : 'Monthly new recipe & monograph updates'}
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                  <span>
                    {isFR
                      ? 'Économie de plus de 28% par rapport au mensuel'
                      : isDE
                      ? 'Über 28% Ersparnis gegenüber dem Monatstarif'
                      : 'Over 28% savings compared to monthly'}
                  </span>
                </li>
              </ul>
            </div>
            <button
              onClick={() => handleSubscribe('annual')}
              className="w-full py-3.5 px-6 rounded-2xl border-2 border-[#3E4A3D] text-[#3E4A3D] font-bold text-sm hover:bg-[#3E4A3D] hover:text-white transition-all cursor-pointer"
            >
              {isFR ? 'Choisir la formule annuelle (79€)' : isDE ? 'Jahrestarif wählen (79€)' : 'Select Annual Plan (79€)'}
            </button>
          </div>
        </div>
      </section>

      {/* 3. Pourquoi choisir Bloom Complet */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#3E4A3D] mb-4" style={{ color: '#3E4A3D' }}>
            {isFR ? 'Pourquoi choisir Bloom Complet ?' : isDE ? 'Warum Bloom Komplett wählen?' : 'Why Choose Bloom Complete?'}
          </h2>
          <p className="text-lg font-semibold text-[#C8AB8A] max-w-2xl mx-auto mb-3">
            {isFR
              ? 'Parce que découvrir les plantes ne devrait pas obliger à tout apprendre seul avant de commencer.'
              : isDE
              ? 'Weil das Entdecken von Heilpflanzen nicht voraussetzen sollte, dass man vorab alles allein erlernen muss.'
              : "Because discovering botanicals shouldn't require learning everything alone before starting."}
          </p>
          <p className="text-sm md:text-base text-[#3E4A3D]/75 max-w-3xl mx-auto leading-relaxed">
            {isFR
              ? "Bloom Complet réunit une préparation botanique mensuelle, les informations nécessaires pour la découvrir, l'accès à des ressources Bloom et un parcours progressif. Vous n'achetez pas une simple fiole : vous entrez dans une pratique guidée, avec un cadre, des contenus et une continuité d'un mois à l'autre."
              : isDE
              ? 'Bloom Komplett vereint eine monatliche botanische Zubereitung, alle nötigen Informationen zum Verständnis, den Zugang zur Bloom-Bibliothek und einen klaren Lernpfad. Sie erhalten nicht nur ein Fläschchen, sondern eine strukturierte, begleitete Praxis Monat für Monat.'
              : 'Bloom Complete unites a monthly botanical preparation, clear educational context, Library access, and a progressive learning journey. More than a single bottle, it gives you continuity month after month.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 bg-white rounded-3xl border border-[#3E4A3D]/10 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#3E4A3D]/10 flex items-center justify-center text-[#3E4A3D]">
              <Package className="w-6 h-6 text-[#3E4A3D]" />
            </div>
            <h3 className="font-bold text-[#3E4A3D] text-xl">
              {isFR ? 'Nous préparons' : isDE ? 'Wir bereiten vor' : 'We Prepare'}
            </h3>
            <p className="text-sm text-[#3E4A3D]/80 leading-relaxed">
              {isFR
                ? "La préparation mensuelle est réalisée par Bloom dans le format proposé (100 ml). Vous pouvez découvrir l'univers Bloom sans devoir maîtriser l'équipement ni les étapes de préparation dès le premier jour."
                : isDE
                ? 'Die monatliche 100-ml-Zubereitung wird von Bloom erstellt. So entdecken Sie das Bloom-Universum, ohne ab Tag eins eigene Geräte oder Extraktionsschritte beherrschen zu müssen.'
                : 'Your monthly 100 ml preparation is crafted by Bloom. Experience the method without needing hardware mastery on day one.'}
            </p>
          </div>

          <div className="p-8 bg-white rounded-3xl border border-[#3E4A3D]/10 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#C8AB8A]/15 flex items-center justify-center text-[#C8AB8A]">
              <BookOpen className="w-6 h-6 text-[#C8AB8A]" />
            </div>
            <h3 className="font-bold text-[#3E4A3D] text-xl">
              {isFR ? 'Vous comprenez' : isDE ? 'Sie verstehen' : 'You Understand'}
            </h3>
            <p className="text-sm text-[#3E4A3D]/80 leading-relaxed">
              {isFR
                ? "Chaque envoi est accompagné d'un guide présentant les ingrédients, le contexte d'usage prévu, les indications de conservation et les précautions disponibles."
                : isDE
                ? 'Jede Lieferung enthält einen Leitfaden mit Inhaltsstoffen, vorgesehener Verwendung, Lagerungshinweisen und dokumentierten Vorsichtsmaßnahmen.'
                : 'Each shipment comes with a guide covering ingredients, intended context of use, storage advice, and precautions.'}
            </p>
          </div>

          <div className="p-8 bg-white rounded-3xl border border-[#3E4A3D]/10 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#3E4A3D]/10 flex items-center justify-center text-[#3E4A3D]">
              <Compass className="w-6 h-6 text-[#3E4A3D]" />
            </div>
            <h3 className="font-bold text-[#3E4A3D] text-xl">
              {isFR ? 'Vous progressez' : isDE ? 'Sie entwickeln sich' : 'You Progress'}
            </h3>
            <p className="text-sm text-[#3E4A3D]/80 leading-relaxed">
              {isFR
                ? "Retrouvez les méthodes, recettes et contenus inclus dans votre formule, puis avancez à votre rythme avec l'aide d'Alma pour vous orienter dans l'écosystème Bloom."
                : isDE
                ? 'Nutzen Sie die im Abo enthaltenen Methoden, Rezepte und Fachartikel und lassen Sie sich von Alma in Ihrem eigenen Tempo orientieren.'
                : "Access methods, recipes, and resources included in your plan, and advance at your own pace with Alma's orientation."}
            </p>
          </div>
        </div>
      </section>

      {/* 4. Ce qui est inclus chaque mois */}
      <section className="bg-white py-16 px-6 border-y border-[#3E4A3D]/10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#3E4A3D] mb-3">
              {isFR ? 'Ce qui est inclus chaque mois' : isDE ? 'Was jeden Monat enthalten ist' : 'What is Included Every Month'}
            </h2>
            <p className="text-base text-[#3E4A3D]/70 max-w-xl mx-auto">
              {isFR
                ? "Une expérience complète pour découvrir, apprendre et avancer sans partir d'une page blanche."
                : isDE
                ? 'Ein durchdachtes Gesamtpaket zum Entdecken, Lernen und sicheren Anwenden.'
                : 'A complete experience to discover, learn, and progress step by step.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 bg-[#FAF7F2] rounded-2xl border border-[#3E4A3D]/10 space-y-2">
              <div className="flex items-center gap-3 mb-2">
                <Package className="w-5 h-5 text-[#C8AB8A]" />
                <h4 className="font-bold text-[#3E4A3D] text-base">
                  {isFR ? 'Votre préparation du mois' : isDE ? 'Ihre Monats-Zubereitung' : 'Monthly Preparation'}
                </h4>
              </div>
              <p className="text-xs text-[#3E4A3D]/80 leading-relaxed">
                {isFR
                  ? 'Une préparation botanique Bloom de 100 ml, dans le format prévu par votre abonnement. Sélection issue des collections disponibles.'
                  : isDE
                  ? 'Eine 100-ml-Zubereitung von Bloom aus unseren aktuellen saisonalen Kollektionen.'
                  : 'A 100 ml Bloom botanical preparation in the format planned by your subscription.'}
              </p>
            </div>

            <div className="p-6 bg-[#FAF7F2] rounded-2xl border border-[#3E4A3D]/10 space-y-2">
              <div className="flex items-center gap-3 mb-2">
                <BookOpen className="w-5 h-5 text-[#C8AB8A]" />
                <h4 className="font-bold text-[#3E4A3D] text-base">
                  {isFR ? 'Son guide de découverte' : isDE ? 'Ihr Entdecker-Leitfaden' : 'Discovery Guide'}
                </h4>
              </div>
              <p className="text-xs text-[#3E4A3D]/80 leading-relaxed">
                {isFR
                  ? "Ingrédients, contexte d'usage prévu, informations de préparation, conseils de conservation et précautions associées."
                  : isDE
                  ? 'Inhaltsstoffe, Anwendungsbereich, Zubereitungshinweise, Lagerung und zugehörige Vorsichtsmaßnahmen.'
                  : 'Ingredients, context of use, preparation notes, storage guidelines, and associated precautions.'}
              </p>
            </div>

            <div className="p-6 bg-[#FAF7F2] rounded-2xl border border-[#3E4A3D]/10 space-y-2">
              <div className="flex items-center gap-3 mb-2">
                <Leaf className="w-5 h-5 text-[#C8AB8A]" />
                <h4 className="font-bold text-[#3E4A3D] text-base">
                  {isFR ? "Votre accès à l'univers Bloom" : isDE ? 'Zugang zur Bloom-Bibliothek' : 'Access to Bloom Library'}
                </h4>
              </div>
              <p className="text-xs text-[#3E4A3D]/80 leading-relaxed">
                {isFR
                  ? "Accédez aux recettes, méthodes, contenus pédagogiques et fiches de l'Herbier inclus dans votre formule."
                  : isDE
                  ? 'Zugriff auf Rezepte, Extraktionsmethoden, Lerninhalte und Einträge im Herbarium.'
                  : 'Access recipes, extraction methods, educational content, and Herbarium entries included.'}
              </p>
            </div>

            <div className="p-6 bg-[#FAF7F2] rounded-2xl border border-[#3E4A3D]/10 space-y-2">
              <div className="flex items-center gap-3 mb-2">
                <Activity className="w-5 h-5 text-[#C8AB8A]" />
                <h4 className="font-bold text-[#3E4A3D] text-base">
                  {isFR ? 'Un parcours progressif' : isDE ? 'Stufenweiser Lernpfad' : 'Progressive Journey'}
                </h4>
              </div>
              <p className="text-xs text-[#3E4A3D]/80 leading-relaxed">
                {isFR
                  ? 'Commencez sans posséder BloomLab, découvrez les gestes et approfondissez votre pratique à votre rythme.'
                  : isDE
                  ? 'Starten Sie ohne eigenes BloomLab-Gerät und vertiefen Sie Ihr Wissen Schritt für Schritt.'
                  : 'Start without owning BloomLab, discover methods, and deepen your practice at your own pace.'}
              </p>
            </div>

            <div className="p-6 bg-[#FAF7F2] rounded-2xl border border-[#3E4A3D]/10 space-y-2">
              <div className="flex items-center gap-3 mb-2">
                <Compass className="w-5 h-5 text-[#C8AB8A]" />
                <h4 className="font-bold text-[#3E4A3D] text-base">
                  {isFR ? 'Alma, votre orientation' : isDE ? 'Alma, Ihre Orientierung' : 'Alma, Orientation Assistant'}
                </h4>
              </div>
              <p className="text-xs text-[#3E4A3D]/80 leading-relaxed">
                {isFR
                  ? "Alma vous aide à retrouver les contenus pertinents, comprendre les méthodes publiées, naviguer dans l'Herbier et consulter les précautions."
                  : isDE
                  ? 'Alma führt Sie sicher zu veröffentlichten Rezepten, Herbarium-Einträgen, Lagerungstipps und Vorsichtshinweisen.'
                  : 'Alma guides you to published recipes, herbarium entries, storage rules, and precautionary notes.'}
              </p>
            </div>

            <div className="p-6 bg-[#FAF7F2] rounded-2xl border border-[#3E4A3D]/10 space-y-2">
              <div className="flex items-center gap-3 mb-2">
                <Calendar className="w-5 h-5 text-[#C8AB8A]" />
                <h4 className="font-bold text-[#3E4A3D] text-base">
                  {isFR ? 'Au fil des saisons' : isDE ? 'Im Rhythmus der Jahreszeiten' : 'Seasonal Content'}
                </h4>
              </div>
              <p className="text-xs text-[#3E4A3D]/80 leading-relaxed">
                {isFR
                  ? 'Découvrez des contenus et propositions éditoriales liés aux saisons lorsque ceux-ci sont disponibles dans votre formule.'
                  : isDE
                  ? 'Entdecken Sie saisonal abgestimmte Fachartikel und botanische Rezeptideen über das ganze Jahr.'
                  : 'Discover seasonal articles and curated recipes throughout the year.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Ideal Profile & Scope */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          <div className="p-8 bg-white rounded-3xl border border-[#3E4A3D]/10 shadow-sm space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#C8AB8A]">
              <CheckCircle2 className="w-4 h-4 text-[#C8AB8A]" />
              <span>{isFR ? 'Profil idéal' : isDE ? 'Ideales Profil' : 'Ideal Profile'}</span>
            </div>
            <h3 className="text-2xl font-bold text-[#3E4A3D]">
              {isFR
                ? 'Bloom Complet est fait pour vous si…'
                : isDE
                ? 'Bloom Komplett passt zu Ihnen, wenn…'
                : 'Bloom Complete is for you if...'}
            </h3>
            <ul className="space-y-3.5 text-sm text-[#3E4A3D]/85">
              {idealProfileItems.map((text, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-[#C8AB8A] shrink-0 mt-0.5" />
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-8 bg-[#FAF7F2] rounded-3xl border border-[#3E4A3D]/15 shadow-sm space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#3E4A3D]/60">
                <ShieldAlert className="w-4 h-4 text-[#3E4A3D]/60" />
                <span>{isFR ? 'Cadre du service' : isDE ? 'Leistungsrahmen' : 'Service Scope'}</span>
              </div>
              <h3 className="text-2xl font-bold text-[#3E4A3D]">
                {isFR
                  ? "Bloom Complet n'est pas un suivi médical."
                  : isDE
                  ? 'Bloom Komplett ist keine medizinische Behandlung.'
                  : 'Bloom Complete is not medical care.'}
              </h3>
              <p className="text-sm text-[#3E4A3D]/80 leading-relaxed">
                {isFR
                  ? "L'abonnement ne comprend pas de diagnostic, de prescription, de traitement personnalisé ni de recommandation destinée à traiter une maladie. Les préparations Bloom ne remplacent pas un médicament, une consultation médicale ni les conseils d'un pharmacien."
                  : isDE
                  ? 'Das Abonnement umfasst weder Diagnosen noch Verschreibungen oder medizinische Behandlungen. Bloom-Zubereitungen ersetzen weder Arzneimittel noch ärztliche oder pharmazeutische Beratung.'
                  : 'The subscription does not include diagnosis, medical prescription, or treatment for illness. Bloom preparations never replace medication, medical consultation, or pharmacist advice.'}
              </p>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-[#3E4A3D]/10 text-xs text-[#3E4A3D]/75 leading-relaxed">
              <p className="font-semibold text-[#3E4A3D] mb-1">
                {isFR ? 'Rappel de prudence :' : isDE ? 'Wichtiger Hinweis:' : 'Safety Reminder:'}
              </p>
              <p>
                {isFR
                  ? "En cas de traitement, de grossesse, d'allaitement ou de pathologie, demandez systématiquement conseil à un professionnel de santé qualifié."
                  : isDE
                  ? 'Bei laufender Medikation, Schwangerschaft, Stillzeit oder Vorerkrankungen konsultieren Sie bitte stets eine Ärztin, einen Arzt oder Apotheker.'
                  : 'If you have a medical condition, take medications, or are pregnant/nursing, always consult a qualified healthcare provider.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Comparison Table */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-[#3E4A3D] mb-3">
            {isFR ? 'Ce que Bloom Complet change' : isDE ? 'Was Bloom Komplett verändert' : 'What Bloom Complete Changes'}
          </h2>
          <p className="text-sm text-[#3E4A3D]/70 max-w-xl mx-auto">
            {isFR
              ? "Une alternative structurée face à l'abondance d'informations dispersées."
              : isDE
              ? 'Eine strukturierte Alternative zur Flut widersprüchlicher Online-Informationen.'
              : 'A structured alternative to scattered, contradictory online information.'}
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-[#3E4A3D]/10 overflow-hidden shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 bg-[#3E4A3D] text-white p-4 font-bold text-sm tracking-wide">
            <div className="p-2 text-white/70">
              {isFR ? 'Sans accompagnement structuré' : isDE ? 'Ohne strukturierte Begleitung' : 'Without structured guidance'}
            </div>
            <div className="p-2 text-[#C8AB8A]">
              {isFR ? 'Avec Bloom Complet' : isDE ? 'Mit Bloom Komplett' : 'With Bloom Complete'}
            </div>
          </div>

          <div className="divide-y divide-[#3E4A3D]/10">
            {comparisonRows.map((row, idx) => (
              <div key={idx} className="grid grid-cols-1 md:grid-cols-2 p-5 text-sm gap-4 items-center">
                <div className="flex items-start gap-2.5 text-[#3E4A3D]/70">
                  <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <span>{row.without}</span>
                </div>
                <div className="flex items-start gap-2.5 font-medium text-[#3E4A3D]">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{row.with}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Alma Orientation */}
      <section className="bg-white py-16 px-6 border-y border-[#3E4A3D]/10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#C8AB8A] mb-3">
              <Sparkles className="w-4 h-4 text-[#C8AB8A]" />
              <span>{isFR ? 'Orientation Pédagogique' : isDE ? 'Pädagogische Orientierung' : 'Educational Guidance'}</span>
            </div>
            <h2 className="text-3xl font-bold text-[#3E4A3D] mb-3">
              {isFR
                ? "Alma vous aide à vous orienter dans l'univers Bloom"
                : isDE
                ? 'Alma hilft Ihnen bei der Orientierung im Bloom-Universum'
                : 'Alma Guides You Through the Bloom Universe'}
            </h2>
            <p className="text-sm md:text-base text-[#3E4A3D]/75 max-w-2xl mx-auto leading-relaxed">
              {isFR
                ? "Alma est un assistant d'orientation. Il vous aide à retrouver les contenus disponibles dans votre formule, comprendre les méthodes de préparation publiées, consulter l'Herbier, retrouver vos recettes, vérifier les informations de conservation et vous orienter vers les précautions associées."
                : isDE
                ? 'Alma ist Ihr digitaler Orientierungsassistent. Sie hilft Ihnen, veröffentlichte Rezepte, Herbarium-Monografien, Lagerungshinweise und Vorsichtsmaßnahmen schnell zu finden.'
                : 'Alma is an orientation assistant helping you navigate published guides, herbarium monographs, recipes, storage information, and precautions.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="p-8 bg-[#F0FDF4] rounded-3xl border border-emerald-200 space-y-4">
              <h3 className="font-bold text-emerald-900 text-lg flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-700" />
                <span>{isFR ? "Ce qu'Alma peut faire :" : isDE ? 'Was Alma tun kann:' : 'What Alma can do:'}</span>
              </h3>
              <ul className="space-y-2.5 text-xs md:text-sm text-emerald-900/85">
                {almaCan.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-8 bg-[#FFF1F2] rounded-3xl border border-rose-200 space-y-4">
              <h3 className="font-bold text-rose-900 text-lg flex items-center gap-2">
                <XCircle className="w-5 h-5 text-rose-700" />
                <span>{isFR ? "Ce qu'Alma ne fait pas :" : isDE ? 'Was Alma nicht tut:' : 'What Alma cannot do:'}</span>
              </h3>
              <ul className="space-y-2.5 text-xs md:text-sm text-rose-900/85">
                {almaCannot.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0 mt-2" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="p-4 bg-[#FAF7F2] rounded-2xl border border-[#3E4A3D]/10 text-xs text-[#3E4A3D]/80 text-center italic max-w-2xl mx-auto">
            {isFR
              ? "Pour toute question médicale, toute réaction indésirable, tout traitement ou toute situation particulière, Alma vous invite systématiquement à demander conseil à un professionnel de santé qualifié."
              : isDE
              ? 'Bei medizinischen Fragen, Unverträglichkeiten oder laufenden Therapien verweist Alma grundsätzlich an qualifiziertes medizinisches Fachpersonal.'
              : 'For any medical question, reaction, or condition, Alma systematically directs you to consult a qualified healthcare professional.'}
          </div>
        </div>
      </section>

      {/* 8. 5 Steps */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#3E4A3D] mb-3">
            {isFR ? 'Comment fonctionne Bloom Complet ?' : isDE ? 'Wie funktioniert Bloom Komplett?' : 'How Bloom Complete Works'}
          </h2>
          <p className="text-sm text-[#3E4A3D]/70 max-w-xl mx-auto">
            {isFR
              ? '5 étapes claires de votre inscription à votre pratique guidée.'
              : isDE
              ? '5 klare Schritte von der Anmeldung bis zur begleiteten Praxis.'
              : '5 clear steps from subscription to guided discovery.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {steps.map((item) => (
            <div key={item.step} className="p-6 bg-white rounded-3xl border border-[#3E4A3D]/10 shadow-sm space-y-3">
              <div className="w-8 h-8 rounded-full bg-[#C8AB8A] text-[#0F261E] font-black text-sm flex items-center justify-center">
                {item.step}
              </div>
              <h4 className="font-bold text-[#3E4A3D] text-base leading-snug">{item.title}</h4>
              <p className="text-xs text-[#3E4A3D]/70 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 9. Timeline */}
      <section className="bg-[#FAF7F2] py-16 px-6 border-y border-[#3E4A3D]/10">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold text-[#3E4A3D]">
            {isFR
              ? "Après votre inscription, vous n'êtes pas seul"
              : isDE
              ? 'Nach der Anmeldung bleiben Sie nicht allein'
              : "After Subscribing, You're Not Alone"}
          </h2>
          <p className="text-sm text-[#3E4A3D]/75 max-w-2xl mx-auto leading-relaxed">
            {isFR
              ? "Votre abonnement ouvre un parcours simple : vous recevez vos informations de démarrage, découvrez vos accès, retrouvez votre préparation et son guide, puis avancez à votre rythme dans l'univers Bloom."
              : isDE
              ? 'Ihr Abo eröffnet einen klaren Ablauf: Zugangsdaten, Einführungshandbuch, monatliche Lieferung und kontinuierliche Begleitung durch Alma.'
              : 'Your subscription opens a structured path: access details, discovery guide, monthly botanical delivery, and continuous orientation.'}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-left pt-4">
            <div className="p-4 bg-white rounded-2xl border border-[#3E4A3D]/10">
              <span className="text-xs font-bold text-[#C8AB8A] block mb-1">
                {isFR ? 'Jour 0' : isDE ? 'Tag 0' : 'Day 0'}
              </span>
              <p className="text-xs text-[#3E4A3D]/80">
                {isFR
                  ? "Confirmation de l'abonnement et création de l'espace Bloom."
                  : isDE
                  ? 'Bestätigung des Abonnements & Einrichtung Ihres Bloom-Zugangs.'
                  : 'Subscription confirmation and creation of your Bloom member space.'}
              </p>
            </div>
            <div className="p-4 bg-white rounded-2xl border border-[#3E4A3D]/10">
              <span className="text-xs font-bold text-[#C8AB8A] block mb-1">
                {isFR ? 'Jour 1' : isDE ? 'Tag 1' : 'Day 1'}
              </span>
              <p className="text-xs text-[#3E4A3D]/80">
                {isFR
                  ? 'Guide de bienvenue et rappel des limites pédagogiques du service.'
                  : isDE
                  ? 'Willkommensleitfaden & Überblick über den pädagogischen Rahmen.'
                  : 'Welcome guide and overview of educational service boundaries.'}
              </p>
            </div>
            <div className="p-4 bg-white rounded-2xl border border-[#3E4A3D]/10">
              <span className="text-xs font-bold text-[#C8AB8A] block mb-1">
                {isFR ? 'Jour 3' : isDE ? 'Tag 3' : 'Day 3'}
              </span>
              <p className="text-xs text-[#3E4A3D]/80">
                {isFR
                  ? "Découverte des contenus inclus et de l'assistant d'orientation Alma."
                  : isDE
                  ? 'Freischaltung der Fachartikel & Vorstellung der Assistentin Alma.'
                  : 'Exploration of included Library guides and Alma orientation assistant.'}
              </p>
            </div>
            <div className="p-4 bg-white rounded-2xl border border-[#3E4A3D]/10">
              <span className="text-xs font-bold text-[#C8AB8A] block mb-1">
                {isFR ? "Avant l'envoi" : isDE ? 'Vor Versand' : 'Before Dispatch'}
              </span>
              <p className="text-xs text-[#3E4A3D]/80">
                {isFR
                  ? 'Informations sur la préparation mensuelle et les précautions associées.'
                  : isDE
                  ? 'Vorab-Informationen zu Ihrer Monatszubereitung und wichtigen Hinweisen.'
                  : 'Details on your monthly preparation and associated safety precautions.'}
              </p>
            </div>
            <div className="p-4 bg-white rounded-2xl border border-[#3E4A3D]/10 sm:col-span-2">
              <span className="text-xs font-bold text-[#C8AB8A] block mb-1">
                {isFR ? 'Chaque mois' : isDE ? 'Jeden Monat' : 'Every Month'}
              </span>
              <p className="text-xs text-[#3E4A3D]/80">
                {isFR
                  ? 'Nouvelle préparation, guide de découverte et contenus de saison selon la formule.'
                  : isDE
                  ? 'Neue Zubereitung, gedrucktes Begleitheft und passende Saison-Inhalte.'
                  : 'New botanical preparation, printed discovery guide, and seasonal library highlights.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 10. FAQ */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <div className="bg-white rounded-3xl p-8 md:p-12 border border-[#3E4A3D]/15 shadow-sm space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold text-[#3E4A3D] mb-6" style={{ color: '#3E4A3D' }}>
            {isFR ? 'Questions fréquentes sur Bloom Complet' : isDE ? 'Häufige Fragen zu Bloom Komplett' : 'Frequently Asked Questions'}
          </h2>

          <div className="space-y-6 divide-y divide-[#3E4A3D]/10">
            <div className="pt-4 first:pt-0">
              <h4 className="font-bold text-[#3E4A3D] text-base mb-2">
                {isFR
                  ? "Dois-je obligatoirement posséder l'extracteur BloomLab® ?"
                  : isDE
                  ? 'Muss ich zwingend den BloomLab® Extraktor besitzen?'
                  : 'Do I need the BloomLab® machine?'}
              </h4>
              <p className="text-sm text-[#3E4A3D]/80 leading-relaxed">
                {isFR
                  ? "Non. Bloom Complet est spécialement pensé pour vous permettre d'explorer l'univers botanique sans posséder d'équipement. Bloom prépare la sélection mensuelle et vous la livre prête à l'emploi avec son guide."
                  : isDE
                  ? 'Nein. Bloom Komplett ist speziell darauf ausgelegt, das botanische Universum ohne eigenes Gerät kennenzulernen. Bloom bereitet die monatliche Auswahl gebrauchsfertig für Sie vor.'
                  : 'No. Bloom Complete is designed to explore botanicals without owning machinery. Bloom prepares the monthly selection for you with its printed guide.'}
              </p>
            </div>

            <div className="pt-4">
              <h4 className="font-bold text-[#3E4A3D] text-base mb-2">
                {isFR
                  ? "L'abonnement est-il sans engagement ?"
                  : isDE
                  ? 'Ist das Abonnement jederzeit kündbar?'
                  : 'Is the subscription without commitment?'}
              </h4>
              <p className="text-sm text-[#3E4A3D]/80 leading-relaxed">
                {isFR
                  ? 'Oui. Vous pouvez suspendre ou résilier votre formule à tout moment depuis votre espace membre, sans frais cachés ni durée minimale.'
                  : isDE
                  ? 'Ja. Sie können Ihren Tarif jederzeit in Ihrem Kundenkonto pausieren oder kündigen – ohne versteckte Gebühren oder Mindestlaufzeit.'
                  : 'Yes. You can pause or cancel anytime from your account without hidden fees or minimum terms.'}
              </p>
            </div>

            <div className="pt-4">
              <h4 className="font-bold text-[#3E4A3D] text-base mb-2">
                {isFR
                  ? 'Quelle est la différence entre Bloom Complet (59€) et le Digital (9€) ?'
                  : isDE
                  ? 'Was ist der Unterschied zwischen Bloom Komplett (59€) und Digital (9€)?'
                  : 'Difference between Bloom Complete (59€) and Digital (9€)?'}
              </h4>
              <p className="text-sm text-[#3E4A3D]/80 leading-relaxed">
                {isFR
                  ? "L'abonnement Digital (9€/mois) vous donne accès aux ressources numériques (recettes et méthodes). Bloom Complet (59€/mois) inclut en plus la réception à domicile chaque mois de votre préparation botanique Bloom (100 ml) accompagnée de son guide imprimé de découverte."
                  : isDE
                  ? 'Das Digital-Abo (9€/Monat) gewährt Zugriff auf die Online-Ressourcen (Rezepte und Methoden). Bloom Komplett (59€/Monat) umfasst zusätzlich die monatliche physische Lieferung einer 100-ml-Zubereitung samt gedrucktem Leitfaden.'
                  : 'The digital plan (9€/month) gives access to online resources. Bloom Complete (59€/month) adds a monthly physical botanical preparation (100 ml) with its printed discovery guide.'}
              </p>
            </div>

            <div className="pt-4">
              <h4 className="font-bold text-[#3E4A3D] text-base mb-2">
                {isFR
                  ? 'Alma peut-il me conseiller sur une pathologie ou un traitement ?'
                  : isDE
                  ? 'Kann Alma mich bei Krankheiten oder Medikamenten beraten?'
                  : 'Can Alma advise me on medical conditions or treatments?'}
              </h4>
              <p className="text-sm text-[#3E4A3D]/80 leading-relaxed">
                {isFR
                  ? "Non. Alma est strictement un assistant d'orientation dans l'écosystème Bloom. Il ne pose aucun diagnostic et ne donne aucun conseil médical. En cas de traitement ou de problème de santé, demandez toujours l'avis de votre médecin ou pharmacien."
                  : isDE
                  ? 'Nein. Alma ist ausschließlich ein Orientierungsassistent im Bloom-Ökosystem und stellt weder Diagnosen noch gibt sie medizinischen Rat. Bei Erkrankungen oder Medikamenten fragen Sie stets Arzt oder Apotheker.'
                  : 'No. Alma is strictly an educational orientation guide within the Bloom ecosystem. It never provides medical diagnosis or treatment advice.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 11. Final CTA */}
      <section className="max-w-4xl mx-auto px-6 pb-12">
        <div
          className="rounded-3xl p-8 md:p-12 text-center text-white shadow-xl relative overflow-hidden"
          style={{ backgroundColor: '#3E4A3D' }}
        >
          <div className="max-w-2xl mx-auto space-y-4 relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold">
              {isFR
                ? 'Commencez sans devoir tout maîtriser'
                : isDE
                ? 'Starten Sie, ohne vorab alles wissen zu müssen'
                : 'Start Without Having to Master Everything'}
            </h2>
            <p className="text-sm md:text-base text-white/85 leading-relaxed">
              {isFR
                ? "Bloom Complet vous permet d'explorer l'univers des préparations botaniques à votre rythme : une préparation mensuelle, un guide, des ressources et un parcours pour mieux comprendre ce que vous découvrez."
                : isDE
                ? 'Mit Bloom Komplett entdecken Sie botanische Zubereitungen in Ihrem eigenen Tempo: monatliche Auswahl, klarer Leitfaden und strukturierte Begleitung.'
                : 'Bloom Complete allows you to explore botanical preparations at your own pace: a monthly blend, a guide, resources, and structured progression.'}
            </p>
            <div className="pt-4">
              <button
                onClick={() => handleSubscribe('complet')}
                className="px-8 py-4 bg-[#3E4A3D] hover:bg-[#2D372C] text-white rounded-2xl font-bold text-base transition-all shadow-xl cursor-pointer border border-white/25"
              >
                {isFR ? 'Rejoindre Bloom Complet' : isDE ? 'Bloom Komplett beitreten' : 'Join Bloom Complete'}
              </button>
            </div>
            <p className="text-xs text-white/70 pt-2">
              {isFR
                ? '59 €/mois — sans engagement, selon les conditions affichées.'
                : isDE
                ? '59 €/Monat — jederzeit kündbar.'
                : '59 €/month — cancel anytime.'}
            </p>
            <p className="text-[11px] text-white/50 pt-1">
              {isFR
                ? 'Bloom Complet ne remplace pas un avis médical, un diagnostic ou un traitement.'
                : isDE
                ? 'Bloom Komplett ersetzt keine ärztliche Beratung, Diagnose oder Behandlung.'
                : 'Bloom Complete does not replace medical advice, diagnosis, or treatment.'}
            </p>
          </div>
        </div>
      </section>

      {/* 12. Disclaimer */}
      <section className="max-w-4xl mx-auto px-6 pb-20">
        <div className="p-6 bg-white rounded-2xl border border-[#3E4A3D]/15 flex items-start gap-4 text-xs text-[#3E4A3D]/85 leading-relaxed shadow-sm">
          <AlertCircle className="w-5 h-5 text-[#C8AB8A] flex-shrink-0 mt-0.5" />
          <div className="space-y-1 text-[#374151]">
            <p className="font-bold text-[#3E4A3D]">
              {isFR ? 'Information réglementaire importante :' : isDE ? 'Wichtiger rechtlicher Hinweis:' : 'Important Regulatory Information:'}
            </p>
            <p>
              {isFR
                ? "Les produits et contenus Bloom by BotaniK ne sont pas des médicaments. Les informations proposées sont destinées à la découverte des plantes et des méthodes de préparation ; elles ne remplacent pas l'avis d'un professionnel de santé. En cas de traitement, de pathologie, de grossesse, d'allaitement, d'allergie, de chirurgie programmée ou de doute, demandez conseil à un professionnel de santé qualifié avant d'utiliser une nouvelle préparation."
                : isDE
                ? 'Die Produkte und Inhalte von Bloom by BotaniK sind keine Arzneimittel. Alle Informationen dienen der botanischen Bildung und Zubereitungspraxis und ersetzen keine ärztliche oder pharmazeutische Beratung. Bei Medikation, Schwangerschaft, Stillzeit, Allergien oder Vorerkrankungen konsultieren Sie vorab medizinisches Fachpersonal.'
                : 'Bloom by BotaniK products and contents are not medicinal drugs. The information provided is for educational discovery of plants and preparation methods; it does not replace the advice of a qualified healthcare professional.'}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
