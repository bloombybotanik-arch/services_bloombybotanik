import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { 
  Star, 
  ShieldCheck, 
  Check, 
  Sparkles, 
  BookOpen, 
  Clock, 
  ArrowRight, 
  Activity, 
  Zap, 
  Heart, 
  AlertCircle,
  Package,
  Compass,
  Calendar,
  CheckCircle2,
  XCircle,
  ShieldAlert,
  Leaf,
  Droplets,
  HelpCircle
} from 'lucide-react';
import { Language, translations } from './translations';

interface PremiumInfoProps {
  onNavigate: (view: any, param?: string) => void;
  onAddToCart?: (product: any) => void;
  lang: Language;
}

export default function PremiumInfoContent({ onNavigate, onAddToCart, lang }: PremiumInfoProps) {
  const isFR = lang === 'fr';
  const pricingRef = useRef<HTMLDivElement>(null);

  const scrollToPricing = () => {
    pricingRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubscribe = (type: 'monthly' | 'annual' | 'complet') => {
    if (type === 'complet') {
      const bloomCompletProduct = {
        id: 'bloom-complet',
        name: isFR ? "Bloom Complet — L'accompagnement botanique mensuel" : "Bloom Complete — Monthly Botanical Guidance",
        subtitle: isFR ? "Préparation botanique mensuelle + guide + accès inclus (59 €/mois)" : "Monthly botanical blend + guide + included access (59 €/month)",
        price: 59,
        image: "/assets/images/bloomlab_main_1784887530345.jpeg",
        description: isFR 
          ? "Une préparation botanique Bloom livrée chaque mois, accompagnée de son guide d'utilisation, de vos accès aux recettes et méthodes, et d'Alma pour votre orientation."
          : "A guided botanical preparation delivered monthly, with discovery guide, recipe & method access, and Alma guidance.",
        isDigital: false,
        isSubscription: true,
        quantity: 1
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
        ? (type === 'annual' ? "Abonnement Annuel Premium" : "Abonnement Mensuel Premium")
        : (type === 'annual' ? "Annual Premium Subscription" : "Monthly Premium Subscription"),
      price: type === 'annual' ? 79 : 9,
      image: "/assets/images/bloomlab_main_1784887530345.jpeg",
      description: isFR 
        ? "Accès illimité à l'intégralité des 60+ protocoles experts Bloom, fiches plantes et mises à jour continues."
        : "Unlimited access to all Bloom expert protocols, plant monographs, and continuous updates.",
      isDigital: true,
      isSubscription: true,
      quantity: 1
    };

    if (onAddToCart) {
      onAddToCart(premiumProduct);
      onNavigate('cart');
    } else {
      onNavigate('cart');
    }
  };

  return (
    <div className="flex-1 bg-[#F9F9F7] min-h-screen">
      {/* 1. Hero: Fond vert sombre #0F261E garanti, texte blanc et accents ambrés */}
      <section 
        className="relative py-20 md:py-28 px-6 overflow-hidden text-white"
        style={{ backgroundColor: '#0F261E', color: '#ffffff' }}
      >
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-white/20 text-[#D97706]"
          >
            <Star className="w-3.5 h-3.5 fill-[#D97706]" />
            <span style={{ color: '#D97706' }}>
              {isFR ? "BLOOM COMPLET — L'ACCOMPAGNEMENT BOTANIQUE MENSUEL" : "BLOOM COMPLETE — MONTHLY BOTANICAL GUIDANCE"}
            </span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6 leading-tight text-white"
            style={{ color: '#ffffff' }}
          >
            {isFR ? "Une préparation botanique guidée, livrée chaque mois." : "Guided botanical preparation, delivered every month."}
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
              : "Want to explore plants without knowing where to start? You don't need to be an expert, own BloomLab, or spend hours searching recipes. Bloom prepares a botanical blend, delivers it to your door, and guides you with clear resources to understand every step."}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="text-sm font-semibold italic text-[#D97706] mb-8"
          >
            {isFR 
              ? "« Nous préparons. Vous découvrez. Vous avancez à votre rythme. »"
              : "“We prepare. You discover. You advance at your own pace.”"}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button
              onClick={() => handleSubscribe('complet')}
              className="w-full sm:w-auto px-8 py-4 bg-[#D97706] hover:bg-[#b45309] text-white rounded-2xl font-bold text-sm transition-all shadow-xl cursor-pointer flex items-center justify-center gap-2"
            >
              <span>{isFR ? "Commencer avec Bloom Complet" : "Start with Bloom Complete"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={scrollToPricing}
              className="w-full sm:w-auto px-6 py-4 bg-white/10 hover:bg-white/15 text-white border border-white/20 rounded-2xl font-bold text-sm transition-all cursor-pointer"
            >
              {isFR ? "Voir ce qui est inclus" : "See what is included"}
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
            style={{ backgroundColor: '#FAF7F2', color: '#0F261E' }}
          >
            <div>
              <div className="text-xs uppercase font-bold tracking-widest text-[#0F261E]/70 mb-2">
                {isFR ? "Formule Essentielle" : "Essential Formula"}
              </div>
              <h3 className="text-2xl font-bold text-[#0F261E] mb-2" style={{ color: '#0F261E' }}>
                {isFR ? "Digital Mensuel" : "Monthly Digital"}
              </h3>
              <p className="text-sm text-[#0F261E]/80 mb-6 leading-relaxed">
                {isFR ? "Pour explorer à votre rythme, sans engagement de durée." : "Explore at your own pace, cancel anytime."}
              </p>
              <div className="mb-6 flex items-baseline gap-1">
                <span className="text-4xl font-black text-[#0F261E]" style={{ color: '#0F261E' }}>9€</span>
                <span className="text-sm text-[#0F261E]/70">/mois</span>
              </div>
              <ul className="space-y-3 text-sm text-[#0F261E]/85 mb-8">
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                  <span>Accès aux 60+ fiches recettes et méthodes</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                  <span>Paramètres précis (t°, temps, solvants)</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                  <span>Résiliable en 1 clic à tout moment</span>
                </li>
              </ul>
            </div>
            <button
              onClick={() => handleSubscribe('monthly')}
              className="w-full py-3.5 px-6 rounded-2xl border-2 border-[#0F261E] text-[#0F261E] font-bold text-sm hover:bg-[#0F261E] hover:text-white transition-all cursor-pointer"
            >
              {isFR ? "Choisir la formule mensuelle" : "Select Monthly Plan"}
            </button>
          </div>

          {/* Formule 2: Bloom Complet - Formule Centrale Recommandée */}
          <div 
            className="rounded-3xl p-8 shadow-2xl border-2 border-[#D97706] relative flex flex-col justify-between transform md:-translate-y-4"
            style={{ backgroundColor: '#0F261E', color: '#ffffff' }}
          >
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#D97706] text-white text-[11px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-md">
              {isFR ? "Recommandé • Offre Complète" : "Recommended • Best Value"}
            </div>
            <div>
              <div className="text-xs uppercase font-bold tracking-widest text-[#D97706] mb-2 pt-2" style={{ color: '#D97706' }}>
                {isFR ? "ACCOMPAGNEMENT BOTANIQUE MENSUEL" : "MONTHLY BOTANICAL GUIDANCE"}
              </div>
              <h3 className="text-2xl font-bold text-white mb-2" style={{ color: '#ffffff' }}>
                Bloom Complet
              </h3>
              <p className="text-sm text-white/85 mb-4 leading-relaxed" style={{ color: '#E5E7EB' }}>
                {isFR 
                  ? "Votre préparation botanique guidée, livrée chaque mois."
                  : "Your guided botanical preparation delivered monthly."}
              </p>
              <div className="mb-2 flex items-baseline gap-1">
                <span className="text-4xl font-black text-white" style={{ color: '#ffffff' }}>59€</span>
                <span className="text-sm text-white/75" style={{ color: '#D1D5DB' }}>/mois</span>
              </div>
              <p className="text-[11px] text-white/70 mb-6 italic">
                {isFR 
                  ? "Sans engagement — suspension ou résiliation selon les conditions affichées."
                  : "No commitment — pause or cancel according to displayed terms."}
              </p>
              <ul className="space-y-3 text-sm text-white/90 mb-6">
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-[#D97706] flex-shrink-0 mt-0.5" />
                  <span style={{ color: '#ffffff' }}><strong>1 préparation botanique Bloom</strong> (format 100 ml)</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-[#D97706] flex-shrink-0 mt-0.5" />
                  <span style={{ color: '#ffffff' }}><strong>Un guide clair :</strong> ingrédients, usage prévu, conservation et précautions</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-[#D97706] flex-shrink-0 mt-0.5" />
                  <span style={{ color: '#ffffff' }}><strong>Accès à la bibliothèque</strong> de recettes et méthodes incluse</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-[#D97706] flex-shrink-0 mt-0.5" />
                  <span style={{ color: '#ffffff' }}><strong>Un parcours progressif</strong>, sans achat de BloomLab nécessaire</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-[#D97706] flex-shrink-0 mt-0.5" />
                  <span style={{ color: '#ffffff' }}><strong>Alma :</strong> assistant d'orientation dans l'univers Bloom</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-[#D97706] flex-shrink-0 mt-0.5" />
                  <span style={{ color: '#ffffff' }}>Collections et contenus saisonniers</span>
                </li>
              </ul>
            </div>

            <div>
              <button
                onClick={() => handleSubscribe('complet')}
                className="w-full py-4 px-6 rounded-2xl bg-[#D97706] hover:bg-[#b45309] text-white font-bold text-sm transition-all shadow-lg cursor-pointer mb-4"
                style={{ backgroundColor: '#D97706', color: '#ffffff' }}
              >
                {isFR ? "Commencer avec Bloom Complet" : "Start with Bloom Complete"}
              </button>

              {/* Short mandatory disclaimer on card */}
              <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-[10px] text-white/70 leading-relaxed flex items-start gap-2">
                <AlertCircle className="w-3.5 h-3.5 text-[#D97706] shrink-0 mt-0.5" />
                <span>
                  {isFR 
                    ? "Bloom Complet est un accompagnement de découverte et de préparation botanique. Il ne remplace pas un médicament, un diagnostic, une consultation médicale ni les conseils d'un pharmacien."
                    : "Bloom Complete is an educational botanical discovery service. It does not replace medication, diagnosis, medical advice, or pharmacist guidance."}
                </span>
              </div>
            </div>
          </div>

          {/* Formule 3: Digitale Annuelle */}
          <div 
            className="rounded-3xl p-8 border border-[#E7DFD3] shadow-lg flex flex-col justify-between"
            style={{ backgroundColor: '#FAF7F2', color: '#0F261E' }}
          >
            <div>
              <div className="text-xs uppercase font-bold tracking-widest text-[#0F261E]/70 mb-2">
                {isFR ? "Souveraineté Annuelle" : "Annual Sovereignty"}
              </div>
              <h3 className="text-2xl font-bold text-[#0F261E] mb-2" style={{ color: '#0F261E' }}>
                {isFR ? "Digital Annuel" : "Annual Digital"}
              </h3>
              <p className="text-sm text-[#0F261E]/80 mb-6 leading-relaxed">
                {isFR ? "L'accès illimité pendant 1 an avec 2 mois offerts inclus." : "Unlimited access for 1 full year with 2 months free."}
              </p>
              <div className="mb-6 flex items-baseline gap-1">
                <span className="text-4xl font-black text-[#0F261E]" style={{ color: '#0F261E' }}>79€</span>
                <span className="text-sm text-[#0F261E]/70">/an</span>
                <span className="ml-2 text-xs bg-[#D97706]/10 text-[#D97706] font-bold px-2 py-0.5 rounded-full border border-[#D97706]/20">
                  {isFR ? "2 mois offerts" : "2 months free"}
                </span>
              </div>
              <ul className="space-y-3 text-sm text-[#0F261E]/85 mb-8">
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                  <span>Tout le catalogue de protocoles d'extraction</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                  <span>Mises à jour mensuelles des nouvelles recettes</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                  <span>Économie de plus de 28% par rapport au mensuel</span>
                </li>
              </ul>
            </div>
            <button
              onClick={() => handleSubscribe('annual')}
              className="w-full py-3.5 px-6 rounded-2xl border-2 border-[#0F261E] text-[#0F261E] font-bold text-sm hover:bg-[#0F261E] hover:text-white transition-all cursor-pointer"
            >
              {isFR ? "Choisir la formule annuelle (79€)" : "Select Annual Plan (79€)"}
            </button>
          </div>

        </div>
      </section>

      {/* 3. Section : Pourquoi choisir Bloom Complet ? */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0F261E] mb-4" style={{ color: '#0F261E' }}>
            {isFR ? "Pourquoi choisir Bloom Complet ?" : "Why Choose Bloom Complete?"}
          </h2>
          <p className="text-lg font-semibold text-[#D97706] max-w-2xl mx-auto mb-3">
            {isFR 
              ? "Parce que découvrir les plantes ne devrait pas obliger à tout apprendre seul avant de commencer."
              : "Because discovering botanicals shouldn't require learning everything alone before starting."}
          </p>
          <p className="text-sm md:text-base text-[#0F261E]/75 max-w-3xl mx-auto leading-relaxed">
            {isFR 
              ? "Bloom Complet réunit une préparation botanique mensuelle, les informations nécessaires pour la découvrir, l'accès à des ressources Bloom et un parcours progressif. Vous n'achetez pas une simple fiole : vous entrez dans une pratique guidée, avec un cadre, des contenus et une continuité d'un mois à l'autre."
              : "Bloom Complete brings together a monthly botanical preparation, clear information, access to Bloom resources, and progressive learning."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 bg-white rounded-3xl border border-[#0F261E]/10 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#0F261E]/10 flex items-center justify-center text-[#0F261E]">
              <Package className="w-6 h-6 text-[#0F261E]" />
            </div>
            <h3 className="font-bold text-[#0F261E] text-xl">
              {isFR ? "Nous préparons" : "We Prepare"}
            </h3>
            <p className="text-sm text-[#0F261E]/80 leading-relaxed">
              {isFR 
                ? "La préparation mensuelle est réalisée par Bloom dans le format proposé (100 ml). Vous pouvez découvrir l'univers Bloom sans devoir maîtriser l'équipement ni les étapes de préparation dès le premier jour."
                : "The monthly preparation is created by Bloom. You discover botanicals without having to master specialized equipment on day one."}
            </p>
          </div>

          <div className="p-8 bg-white rounded-3xl border border-[#0F261E]/10 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#D97706]/15 flex items-center justify-center text-[#D97706]">
              <BookOpen className="w-6 h-6 text-[#D97706]" />
            </div>
            <h3 className="font-bold text-[#0F261E] text-xl">
              {isFR ? "Vous comprenez" : "You Understand"}
            </h3>
            <p className="text-sm text-[#0F261E]/80 leading-relaxed">
              {isFR 
                ? "Chaque envoi est accompagné d'un guide présentant les ingrédients, le contexte d'usage prévu, les indications de conservation et les précautions disponibles."
                : "Each shipment comes with a guide covering ingredients, intended context of use, storage advice, and precautions."}
            </p>
          </div>

          <div className="p-8 bg-white rounded-3xl border border-[#0F261E]/10 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#0F261E]/10 flex items-center justify-center text-[#0F261E]">
              <Compass className="w-6 h-6 text-[#0F261E]" />
            </div>
            <h3 className="font-bold text-[#0F261E] text-xl">
              {isFR ? "Vous progressez" : "You Progress"}
            </h3>
            <p className="text-sm text-[#0F261E]/80 leading-relaxed">
              {isFR 
                ? "Retrouvez les méthodes, recettes et contenus inclus dans votre formule, puis avancez à votre rythme avec l'aide d'Alma pour vous orienter dans l'écosystème Bloom."
                : "Access methods, recipes, and resources included in your plan, and advance at your own pace with Alma's orientation."}
            </p>
          </div>
        </div>
      </section>

      {/* 4. Section : Ce qui est inclus chaque mois */}
      <section className="bg-white py-16 px-6 border-y border-[#0F261E]/10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0F261E] mb-3">
              {isFR ? "Ce qui est inclus chaque mois" : "What is Included Every Month"}
            </h2>
            <p className="text-base text-[#0F261E]/70 max-w-xl mx-auto">
              {isFR 
                ? "Une expérience complète pour découvrir, apprendre et avancer sans partir d'une page blanche."
                : "A complete experience to discover, learn, and progress step by step."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 bg-[#FAF7F2] rounded-2xl border border-[#0F261E]/10 space-y-2">
              <div className="flex items-center gap-3 mb-2">
                <Package className="w-5 h-5 text-[#D97706]" />
                <h4 className="font-bold text-[#0F261E] text-base">{isFR ? "Votre préparation du mois" : "Monthly Preparation"}</h4>
              </div>
              <p className="text-xs text-[#0F261E]/80 leading-relaxed">
                {isFR 
                  ? "Une préparation botanique Bloom de 100 ml, dans le format prévu par votre abonnement. Sélection issue des collections disponibles."
                  : "A 100 ml Bloom botanical preparation in the format planned by your subscription."}
              </p>
            </div>

            <div className="p-6 bg-[#FAF7F2] rounded-2xl border border-[#0F261E]/10 space-y-2">
              <div className="flex items-center gap-3 mb-2">
                <BookOpen className="w-5 h-5 text-[#D97706]" />
                <h4 className="font-bold text-[#0F261E] text-base">{isFR ? "Son guide de découverte" : "Discovery Guide"}</h4>
              </div>
              <p className="text-xs text-[#0F261E]/80 leading-relaxed">
                {isFR 
                  ? "Ingrédients, contexte d'usage prévu, informations de préparation, conseils de conservation et précautions associées."
                  : "Ingredients, context of use, preparation notes, storage guidelines, and associated precautions."}
              </p>
            </div>

            <div className="p-6 bg-[#FAF7F2] rounded-2xl border border-[#0F261E]/10 space-y-2">
              <div className="flex items-center gap-3 mb-2">
                <Leaf className="w-5 h-5 text-[#D97706]" />
                <h4 className="font-bold text-[#0F261E] text-base">{isFR ? "Votre accès à l'univers Bloom" : "Access to Bloom Library"}</h4>
              </div>
              <p className="text-xs text-[#0F261E]/80 leading-relaxed">
                {isFR 
                  ? "Accédez aux recettes, méthodes, contenus pédagogiques et fiches de l'Herbier inclus dans votre formule."
                  : "Access recipes, extraction methods, educational content, and Herbarium entries included."}
              </p>
            </div>

            <div className="p-6 bg-[#FAF7F2] rounded-2xl border border-[#0F261E]/10 space-y-2">
              <div className="flex items-center gap-3 mb-2">
                <Activity className="w-5 h-5 text-[#D97706]" />
                <h4 className="font-bold text-[#0F261E] text-base">{isFR ? "Un parcours progressif" : "Progressive Journey"}</h4>
              </div>
              <p className="text-xs text-[#0F261E]/80 leading-relaxed">
                {isFR 
                  ? "Commencez sans posséder BloomLab, découvrez les gestes et approfondissez votre pratique à votre rythme."
                  : "Start without owning BloomLab, discover methods, and deepen your practice at your own pace."}
              </p>
            </div>

            <div className="p-6 bg-[#FAF7F2] rounded-2xl border border-[#0F261E]/10 space-y-2">
              <div className="flex items-center gap-3 mb-2">
                <Compass className="w-5 h-5 text-[#D97706]" />
                <h4 className="font-bold text-[#0F261E] text-base">{isFR ? "Alma, votre orientation" : "Alma, Orientation Assistant"}</h4>
              </div>
              <p className="text-xs text-[#0F261E]/80 leading-relaxed">
                {isFR 
                  ? "Alma vous aide à retrouver les contenus pertinents, comprendre les méthodes publiées, naviguer dans l'Herbier et consulter les précautions."
                  : "Alma guides you to published recipes, herbarium entries, storage rules, and precautionary notes."}
              </p>
            </div>

            <div className="p-6 bg-[#FAF7F2] rounded-2xl border border-[#0F261E]/10 space-y-2">
              <div className="flex items-center gap-3 mb-2">
                <Calendar className="w-5 h-5 text-[#D97706]" />
                <h4 className="font-bold text-[#0F261E] text-base">{isFR ? "Au fil des saisons" : "Seasonal Content"}</h4>
              </div>
              <p className="text-xs text-[#0F261E]/80 leading-relaxed">
                {isFR 
                  ? "Découvrez des contenus et propositions éditoriales liés aux saisons lorsque ceux-ci sont disponibles dans votre formule."
                  : "Discover seasonal articles and curated recipes throughout the year."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Section : Bloom Complet est fait pour vous si… + Limites médicales */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Pour qui */}
          <div className="p-8 bg-white rounded-3xl border border-[#0F261E]/10 shadow-sm space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#D97706]">
              <CheckCircle2 className="w-4 h-4 text-[#D97706]" />
              <span>{isFR ? "Profil idéal" : "Ideal Profile"}</span>
            </div>
            <h3 className="text-2xl font-bold text-[#0F261E]">
              {isFR ? "Bloom Complet est fait pour vous si…" : "Bloom Complete is for you if..."}
            </h3>
            <ul className="space-y-3.5 text-sm text-[#0F261E]/85">
              {[
                "Vous souhaitez découvrir les plantes sans devoir tout apprendre seul.",
                "Vous voulez recevoir chaque mois une préparation botanique expliquée.",
                "Vous n'êtes pas encore prêt à acheter BloomLab, mais vous souhaitez explorer la méthode Bloom.",
                "Vous aimez les pratiques maison, la cuisine botanique ou les soins cosmétiques externes selon les contenus disponibles.",
                "Vous recherchez un parcours progressif plutôt qu'une accumulation de produits.",
                "Vous voulez mieux comprendre les ingrédients et les méthodes avant de vous équiper."
              ].map((text, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Pas de suivi médical */}
          <div className="p-8 bg-[#FAF7F2] rounded-3xl border border-[#0F261E]/15 shadow-sm space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#0F261E]/60">
                <ShieldAlert className="w-4 h-4 text-[#0F261E]/60" />
                <span>{isFR ? "Cadre du service" : "Service Scope"}</span>
              </div>
              <h3 className="text-2xl font-bold text-[#0F261E]">
                {isFR ? "Bloom Complet n'est pas un suivi médical." : "Bloom Complete is not medical care."}
              </h3>
              <p className="text-sm text-[#0F261E]/80 leading-relaxed">
                {isFR 
                  ? "L'abonnement ne comprend pas de diagnostic, de prescription, de traitement personnalisé ni de recommandation destinée à traiter une maladie. Les préparations Bloom ne remplacent pas un médicament, une consultation médicale ni les conseils d'un pharmacien."
                  : "The subscription does not include diagnosis, medical prescription, or treatment for illness. Bloom preparations never replace medication, medical consultation, or pharmacist advice."}
              </p>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-[#0F261E]/10 text-xs text-[#0F261E]/75 leading-relaxed">
              <p className="font-semibold text-[#0F261E] mb-1">
                {isFR ? "Rappel de prudence :" : "Safety Reminder:"}
              </p>
              <p>
                {isFR 
                  ? "En cas de traitement, de grossesse, d'allaitement ou de pathologie, demandez systématiquement conseil à un professionnel de santé qualifié."
                  : "If you have a medical condition, take medications, or are pregnant/nursing, always consult a qualified healthcare provider."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Section : Ce que Bloom Complet change (Tableau comparatif) */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-[#0F261E] mb-3">
            {isFR ? "Ce que Bloom Complet change" : "What Bloom Complete Changes"}
          </h2>
          <p className="text-sm text-[#0F261E]/70 max-w-xl mx-auto">
            {isFR 
              ? "Une alternative structurée face à l'abondance d'informations dispersées."
              : "A structured alternative to scattered, contradictory online information."}
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-[#0F261E]/10 overflow-hidden shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 bg-[#0F261E] text-white p-4 font-bold text-sm tracking-wide">
            <div className="p-2 text-white/70">{isFR ? "Sans accompagnement structuré" : "Without structured guidance"}</div>
            <div className="p-2 text-[#D97706]">{isFR ? "Avec Bloom Complet" : "With Bloom Complete"}</div>
          </div>

          <div className="divide-y divide-[#0F261E]/10">
            {[
              {
                without: "Chercher des recettes dispersées et parfois contradictoires",
                with: "Recevoir une préparation et un guide éditorialisé"
              },
              {
                without: "Acheter des plantes sans savoir comment les découvrir",
                with: "Commencer avec une préparation expliquée et des ressources associées"
              },
              {
                without: "Devoir acheter BloomLab avant de connaître l'univers",
                with: "Explorer la méthode Bloom sans achat de machine nécessaire"
              },
              {
                without: "Ne pas savoir quoi découvrir le mois suivant",
                with: "Suivre une progression et des propositions saisonnières selon la formule"
              },
              {
                without: "Être seul face aux informations disponibles en ligne",
                with: "Être orienté vers les contenus, recettes et précautions disponibles dans l'écosystème Bloom"
              }
            ].map((row, idx) => (
              <div key={idx} className="grid grid-cols-1 md:grid-cols-2 p-5 text-sm gap-4 items-center">
                <div className="flex items-start gap-2.5 text-[#0F261E]/70">
                  <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <span>{row.without}</span>
                </div>
                <div className="flex items-start gap-2.5 font-medium text-[#0F261E]">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{row.with}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Section : Alma vous aide à vous orienter */}
      <section className="bg-white py-16 px-6 border-y border-[#0F261E]/10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#D97706] mb-3">
              <Sparkles className="w-4 h-4 text-[#D97706]" />
              <span>{isFR ? "Orientation Pédagogique" : "Educational Guidance"}</span>
            </div>
            <h2 className="text-3xl font-bold text-[#0F261E] mb-3">
              {isFR ? "Alma vous aide à vous orienter dans l'univers Bloom" : "Alma Guides You Through the Bloom Universe"}
            </h2>
            <p className="text-sm md:text-base text-[#0F261E]/75 max-w-2xl mx-auto leading-relaxed">
              {isFR 
                ? "Alma est un assistant d'orientation. Il vous aide à retrouver les contenus disponibles dans votre formule, comprendre les méthodes de préparation publiées, consulter l'Herbier, retrouver vos recettes, vérifier les informations de conservation et vous orienter vers les précautions associées."
                : "Alma is an orientation assistant helping you navigate published guides, herbarium monographs, recipes, storage information, and precautions."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Ce qu'Alma fait */}
            <div className="p-8 bg-[#F0FDF4] rounded-3xl border border-emerald-200 space-y-4">
              <h3 className="font-bold text-emerald-900 text-lg flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-700" />
                <span>{isFR ? "Ce qu'Alma peut faire :" : "What Alma can do:"}</span>
              </h3>
              <ul className="space-y-2.5 text-xs md:text-sm text-emerald-900/85">
                {[
                  "Expliquer une recette ou un guide déjà validé et publié.",
                  "Aider à retrouver une fiche plante ou un contenu de la bibliothèque.",
                  "Orienter vers les contenus débutants ou avancés inclus dans l'abonnement.",
                  "Rappeler les indications de conservation publiées.",
                  "Diriger vers les précautions et limites disponibles.",
                  "Aider à retrouver les informations de livraison, d'accès ou d'abonnement."
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Ce qu'Alma ne fait pas */}
            <div className="p-8 bg-[#FFF1F2] rounded-3xl border border-rose-200 space-y-4">
              <h3 className="font-bold text-rose-900 text-lg flex items-center gap-2">
                <XCircle className="w-5 h-5 text-rose-700" />
                <span>{isFR ? "Ce qu'Alma ne fait pas :" : "What Alma cannot do:"}</span>
              </h3>
              <ul className="space-y-2.5 text-xs md:text-sm text-rose-900/85">
                {[
                  "Poser un diagnostic.",
                  "Évaluer une pathologie, un symptôme ou une urgence médicale.",
                  "Recommander une préparation pour traiter une maladie.",
                  "Donner une posologie ou une cure personnalisée.",
                  "Conseiller d'arrêter ou modifier un médicament.",
                  "Donner un avis personnalisé en cas de grossesse, traitement ou pathologie.",
                  "Garantir la sécurité ou l'efficacité d'une préparation individuelle."
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0 mt-2" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="p-4 bg-[#FAF7F2] rounded-2xl border border-[#0F261E]/10 text-xs text-[#0F261E]/80 text-center italic max-w-2xl mx-auto">
            {isFR 
              ? "Pour toute question médicale, toute réaction indésirable, tout traitement ou toute situation particulière, Alma vous invite systématiquement à demander conseil à un professionnel de santé qualifié."
              : "For any medical question, reaction, or condition, Alma systematically directs you to consult a qualified healthcare professional."}
          </div>
        </div>
      </section>

      {/* 8. Section : Comment fonctionne Bloom Complet ? (5 étapes) */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#0F261E] mb-3">
            {isFR ? "Comment fonctionne Bloom Complet ?" : "How Bloom Complete Works"}
          </h2>
          <p className="text-sm text-[#0F261E]/70 max-w-xl mx-auto">
            {isFR ? "5 étapes claires de votre inscription à votre pratique guidée." : "5 clear steps from subscription to guided discovery."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {[
            {
              step: "1",
              title: "Créez votre espace",
              desc: "Retrouvez vos livraisons, vos contenus inclus et les informations de votre formule."
            },
            {
              step: "2",
              title: "Vos univers",
              desc: "Choisissez parmi : découverte des plantes, cuisine botanique, huiles infusées ou soins externes."
            },
            {
              step: "3",
              title: "Les précautions",
              desc: "Consultez les informations disponibles concernant les ingrédients, la conservation et les précautions."
            },
            {
              step: "4",
              title: "Envoi mensuel",
              desc: "Votre préparation (100 ml) et son guide sont envoyés selon le calendrier de votre formule."
            },
            {
              step: "5",
              title: "Découvrez",
              desc: "Explorez les contenus inclus, retrouvez vos ressources et utilisez Alma pour vous orienter."
            }
          ].map((item) => (
            <div key={item.step} className="p-6 bg-white rounded-3xl border border-[#0F261E]/10 shadow-sm space-y-3">
              <div className="w-8 h-8 rounded-full bg-[#D97706] text-white font-black text-sm flex items-center justify-center">
                {item.step}
              </div>
              <h4 className="font-bold text-[#0F261E] text-base leading-snug">{item.title}</h4>
              <p className="text-xs text-[#0F261E]/70 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 9. Section : Après votre inscription, vous n'êtes pas seul */}
      <section className="bg-[#FAF7F2] py-16 px-6 border-y border-[#0F261E]/10">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold text-[#0F261E]">
            {isFR ? "Après votre inscription, vous n'êtes pas seul" : "After Subscribing, You're Not Alone"}
          </h2>
          <p className="text-sm text-[#0F261E]/75 max-w-2xl mx-auto leading-relaxed">
            {isFR 
              ? "Votre abonnement ouvre un parcours simple : vous recevez vos informations de démarrage, découvrez vos accès, retrouvez votre préparation et son guide, puis avancez à votre rythme dans l'univers Bloom."
              : "Your subscription opens a structured path: access details, discovery guide, monthly botanical delivery, and continuous orientation."}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-left pt-4">
            <div className="p-4 bg-white rounded-2xl border border-[#0F261E]/10">
              <span className="text-xs font-bold text-[#D97706] block mb-1">Jour 0</span>
              <p className="text-xs text-[#0F261E]/80">Confirmation de l'abonnement et création de l'espace Bloom.</p>
            </div>
            <div className="p-4 bg-white rounded-2xl border border-[#0F261E]/10">
              <span className="text-xs font-bold text-[#D97706] block mb-1">Jour 1</span>
              <p className="text-xs text-[#0F261E]/80">Guide de bienvenue et rappel des limites pédagogiques du service.</p>
            </div>
            <div className="p-4 bg-white rounded-2xl border border-[#0F261E]/10">
              <span className="text-xs font-bold text-[#D97706] block mb-1">Jour 3</span>
              <p className="text-xs text-[#0F261E]/80">Découverte des contenus inclus et de l'assistant d'orientation Alma.</p>
            </div>
            <div className="p-4 bg-white rounded-2xl border border-[#0F261E]/10">
              <span className="text-xs font-bold text-[#D97706] block mb-1">Avant l'envoi</span>
              <p className="text-xs text-[#0F261E]/80">Informations sur la préparation mensuelle et les précautions associées.</p>
            </div>
            <div className="p-4 bg-white rounded-2xl border border-[#0F261E]/10 sm:col-span-2">
              <span className="text-xs font-bold text-[#D97706] block mb-1">Chaque mois</span>
              <p className="text-xs text-[#0F261E]/80">Nouvelle préparation, guide de découverte et contenus de saison selon la formule.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 10. FAQ */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <div className="bg-white rounded-3xl p-8 md:p-12 border border-[#0F261E]/15 shadow-sm space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold text-[#0F261E] mb-6" style={{ color: '#0F261E' }}>
            {isFR ? "Questions fréquentes sur Bloom Complet" : "Frequently Asked Questions"}
          </h2>

          <div className="space-y-6 divide-y divide-[#0F261E]/10">
            <div className="pt-4 first:pt-0">
              <h4 className="font-bold text-[#0F261E] text-base mb-2">
                {isFR ? "Dois-je obligatoirement posséder l'extracteur BloomLab® ?" : "Do I need the BloomLab® machine?"}
              </h4>
              <p className="text-sm text-[#0F261E]/80 leading-relaxed">
                {isFR 
                  ? "Non. Bloom Complet est spécialement pensé pour vous permettre d'explorer l'univers botanique sans posséder d'équipement. Bloom prépare la sélection mensuelle et vous la livre prête à l'emploi avec son guide."
                  : "No. Bloom Complete is designed to explore botanicals without owning machinery. Bloom prepares the monthly selection for you."}
              </p>
            </div>

            <div className="pt-4">
              <h4 className="font-bold text-[#0F261E] text-base mb-2">
                {isFR ? "L'abonnement est-il sans engagement ?" : "Is the subscription without commitment?"}
              </h4>
              <p className="text-sm text-[#0F261E]/80 leading-relaxed">
                {isFR 
                  ? "Oui. Vous pouvez suspendre ou résilier votre formule à tout moment depuis votre espace membre, sans frais cachés ni durée minimale."
                  : "Yes. You can pause or cancel anytime from your account without hidden fees."}
              </p>
            </div>

            <div className="pt-4">
              <h4 className="font-bold text-[#0F261E] text-base mb-2">
                {isFR ? "Quelle est la différence entre Bloom Complet (59€) et le Digital (9€) ?" : "Difference between Bloom Complete and Digital?"}
              </h4>
              <p className="text-sm text-[#0F261E]/80 leading-relaxed">
                {isFR 
                  ? "L'abonnement Digital (9€/mois) vous donne accès aux ressources numériques (recettes et méthodes). Bloom Complet (59€/mois) inclut en plus la réception à domicile chaque mois de votre préparation botanique Bloom (100 ml) accompagnée de son guide imprimé de découverte."
                  : "The digital plan gives access to online resources. Bloom Complete (59€/month) adds a monthly physical botanical preparation (100 ml) with its printed discovery guide."}
              </p>
            </div>

            <div className="pt-4">
              <h4 className="font-bold text-[#0F261E] text-base mb-2">
                {isFR ? "Alma peut-il me conseiller sur une pathologie ou un traitement ?" : "Can Alma advise me on illnesses?"}
              </h4>
              <p className="text-sm text-[#0F261E]/80 leading-relaxed">
                {isFR 
                  ? "Non. Alma est strictement un assistant d'orientation dans l'écosystème Bloom. Il ne pose aucun diagnostic et ne donne aucun conseil médical. En cas de traitement ou de problème de santé, demandez toujours l'avis de votre médecin ou pharmacien."
                  : "No. Alma is strictly an educational guide within the Bloom ecosystem. It does not provide medical diagnosis or treatment advice."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 11. Final CTA Section */}
      <section className="max-w-4xl mx-auto px-6 pb-12">
        <div 
          className="rounded-3xl p-8 md:p-12 text-center text-white shadow-xl relative overflow-hidden"
          style={{ backgroundColor: '#0F261E' }}
        >
          <div className="max-w-2xl mx-auto space-y-4 relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold">
              {isFR ? "Commencez sans devoir tout maîtriser" : "Start Without Having to Master Everything"}
            </h2>
            <p className="text-sm md:text-base text-white/85 leading-relaxed">
              {isFR 
                ? "Bloom Complet vous permet d'explorer l'univers des préparations botaniques à votre rythme : une préparation mensuelle, un guide, des ressources et un parcours pour mieux comprendre ce que vous découvrez."
                : "Bloom Complete allows you to explore botanical preparations at your own pace: a monthly blend, a guide, resources, and structured progression."}
            </p>
            <div className="pt-4">
              <button
                onClick={() => handleSubscribe('complet')}
                className="px-8 py-4 bg-[#D97706] hover:bg-[#b45309] text-white rounded-2xl font-bold text-base transition-all shadow-xl cursor-pointer"
              >
                {isFR ? "Rejoindre Bloom Complet" : "Join Bloom Complete"}
              </button>
            </div>
            <p className="text-xs text-white/70 pt-2">
              {isFR ? "59 €/mois — sans engagement, selon les conditions affichées." : "59 €/month — cancel anytime."}
            </p>
            <p className="text-[11px] text-white/50 pt-1">
              {isFR ? "Bloom Complet ne remplace pas un avis médical, un diagnostic ou un traitement." : "Bloom Complete does not replace medical advice, diagnosis, or treatment."}
            </p>
          </div>
        </div>
      </section>

      {/* 12. Full Mandatory Compliance Disclaimer */}
      <section className="max-w-4xl mx-auto px-6 pb-20">
        <div className="p-6 bg-white rounded-2xl border border-[#0F261E]/15 flex items-start gap-4 text-xs text-[#0F261E]/85 leading-relaxed shadow-sm">
          <AlertCircle className="w-5 h-5 text-[#D97706] flex-shrink-0 mt-0.5" />
          <div className="space-y-1 text-[#374151]">
            <p className="font-bold text-[#0F261E]">
              {isFR ? "Information réglementaire importante :" : "Important Regulatory Information:"}
            </p>
            <p>
              {isFR 
                ? "Les produits et contenus Bloom by BotaniK ne sont pas des médicaments. Les informations proposées sont destinées à la découverte des plantes et des méthodes de préparation ; elles ne remplacent pas l'avis d'un professionnel de santé. En cas de traitement, de pathologie, de grossesse, d'allaitement, d'allergie, de chirurgie programmée ou de doute, demandez conseil à un professionnel de santé qualifié avant d'utiliser une nouvelle préparation."
                : "Bloom by BotaniK products and contents are not medicinal drugs. The information provided is for educational discovery of plants and preparation methods; it does not replace the advice of a qualified healthcare professional."}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
