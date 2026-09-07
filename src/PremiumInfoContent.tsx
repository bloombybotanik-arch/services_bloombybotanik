import React from 'react';
import { motion } from 'motion/react';
import { Star, ShieldCheck, Check, Sparkles, BookOpen, Clock, ArrowRight, Activity, Zap, Heart, AlertCircle } from 'lucide-react';
import { Language, translations } from './translations';

interface PremiumInfoProps {
  onNavigate: (view: any, param?: string) => void;
  onAddToCart?: (product: any) => void;
  lang: Language;
}

export default function PremiumInfoContent({ onNavigate, onAddToCart, lang }: PremiumInfoProps) {
  const isFR = lang === 'fr';

  const handleSubscribe = (type: 'monthly' | 'annual' | 'complet') => {
    if (type === 'complet') {
      onNavigate('boutique', 'complet');
      return;
    }

    const premiumProduct = {
      id: 'premium-access',
      name: isFR 
        ? (type === 'annual' ? "Abonnement Annuel Premium" : "Abonnement Mensuel Premium")
        : (type === 'annual' ? "Annual Premium Subscription" : "Monthly Premium Subscription"),
      price: type === 'annual' ? 79 : 9,
      image: "https://images.unsplash.com/photo-1546554137-f86b9593a222?auto=format&fit=crop&q=80&w=800",
      description: isFR 
        ? "Accès illimité à l'intégralité des 60+ protocoles experts Bloom, fiches plantes et mises à jour continues."
        : "Unlimited access to all Bloom expert protocols, plant monographs, and continuous updates.",
      isDigital: true
    };

    if (onAddToCart) {
      onAddToCart(premiumProduct);
      onNavigate('cart');
    } else {
      onNavigate('product-detail', 'premium-access');
    }
  };

  return (
    <div className="flex-1 bg-[#F9F9F7] min-h-screen">
      {/* Hero */}
      <section className="relative py-20 px-6 overflow-hidden bg-botanik-green text-white">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-white/10 text-botanik-orange"
          >
            <Star className="w-3.5 h-3.5 fill-botanik-orange" />
            {isFR ? "L'Abonnement Bloom Premium" : "Bloom Premium Membership"}
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6 leading-tight"
          >
            {isFR ? "Débloquez l'Intégralité du Totum Botanique" : "Unlock the Full Botanical Totum"}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-white/85 max-w-2xl mx-auto leading-relaxed"
          >
            {isFR 
              ? "Rejoignez le cercle des praticiens autonomes. Accédez à l'ensemble de nos protocoles cliniques de précision, aux ratios de solvants et aux synergies de terrain."
              : "Access the entire library of precision botanical protocols, exact solvent ratios, and systemic terrain synergies."}
          </motion.p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="max-w-6xl mx-auto px-6 -mt-10 mb-20 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          
          {/* Formule 1: Digitale Mensuelle */}
          <div className="bg-white rounded-3xl p-8 border border-botanik-green/10 shadow-lg flex flex-col justify-between">
            <div>
              <div className="text-xs uppercase font-bold tracking-widest text-botanik-green/60 mb-2">
                {isFR ? "Formule Essentielle" : "Essential Formula"}
              </div>
              <h3 className="text-2xl font-bold text-botanik-green mb-2">
                {isFR ? "Digital Mensuel" : "Monthly Digital"}
              </h3>
              <p className="text-sm text-botanik-green/70 mb-6 leading-relaxed">
                {isFR ? "Pour explorer à votre rythme, sans engagement de durée." : "Explore at your own pace, cancel anytime."}
              </p>
              <div className="mb-6 flex items-baseline gap-1">
                <span className="text-4xl font-black text-botanik-green">9€</span>
                <span className="text-sm text-botanik-green/60">/mois</span>
              </div>
              <ul className="space-y-3 text-sm text-botanik-green/80 mb-8">
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-botanik-green flex-shrink-0" />
                  <span>Accès aux 60+ protocoles complets</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-botanik-green flex-shrink-0" />
                  <span>Paramètres précis (t°, temps, solvants)</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-botanik-green flex-shrink-0" />
                  <span>Résiliable en 1 clic à tout moment</span>
                </li>
              </ul>
            </div>
            <button
              onClick={() => handleSubscribe('monthly')}
              className="w-full py-3.5 px-6 rounded-2xl border-2 border-botanik-green text-botanik-green font-bold text-sm hover:bg-botanik-green hover:text-white transition-all cursor-pointer"
            >
              {isFR ? "Choisir la formule mensuelle" : "Select Monthly Plan"}
            </button>
          </div>

          {/* Formule 2: Bloom Complet - Formule Centrale Recommandée */}
          <div className="bg-botanik-green text-white rounded-3xl p-8 shadow-2xl border-2 border-botanik-orange relative flex flex-col justify-between transform md:-translate-y-4">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-botanik-orange text-white text-[11px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-md">
              {isFR ? "Recommandé • Le Plus Complet" : "Recommended • Best Value"}
            </div>
            <div>
              <div className="text-xs uppercase font-bold tracking-widest text-botanik-orange mb-2 pt-2">
                {isFR ? "Accompagnement Global" : "Complete Protocol"}
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                {isFR ? "Bloom Complet" : "Bloom Complete"}
              </h3>
              <p className="text-sm text-white/80 mb-6 leading-relaxed">
                {isFR ? "Le protocole complet, avec vos mélanges botaniques livrés chaque mois et l'accès expert." : "Complete protocol with botanicals delivered monthly and expert guidance."}
              </p>
              <div className="mb-6 flex items-baseline gap-1">
                <span className="text-4xl font-black text-white">59€</span>
                <span className="text-sm text-white/70">/mois</span>
              </div>
              <ul className="space-y-3 text-sm text-white/90 mb-8">
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-botanik-orange flex-shrink-0" />
                  <span><strong>Accès illimité</strong> à tous les protocoles et recettes</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-botanik-orange flex-shrink-0" />
                  <span><strong>Kits botaniques de plantes</strong> livrés chez vous</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-botanik-orange flex-shrink-0" />
                  <span>Reset homéostatique personnalisé par terrain</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-botanik-orange flex-shrink-0" />
                  <span>Sans engagement, liberté absolue</span>
                </li>
              </ul>
            </div>
            <button
              onClick={() => handleSubscribe('complet')}
              className="w-full py-4 px-6 rounded-2xl bg-botanik-orange text-white font-bold text-sm hover:bg-white hover:text-botanik-green transition-all shadow-lg cursor-pointer"
            >
              {isFR ? "Rejoindre Bloom Complet" : "Join Bloom Complete"}
            </button>
          </div>

          {/* Formule 3: Digitale Annuelle */}
          <div className="bg-white rounded-3xl p-8 border border-botanik-green/10 shadow-lg flex flex-col justify-between">
            <div>
              <div className="text-xs uppercase font-bold tracking-widest text-botanik-green/60 mb-2">
                {isFR ? "Souveraineté Annuelle" : "Annual Sovereignty"}
              </div>
              <h3 className="text-2xl font-bold text-botanik-green mb-2">
                {isFR ? "Digital Annuel" : "Annual Digital"}
              </h3>
              <p className="text-sm text-botanik-green/70 mb-6 leading-relaxed">
                {isFR ? "L'accès illimité pendant 1 an avec 2 mois offerts inclus." : "Unlimited access for 1 full year with 2 months free."}
              </p>
              <div className="mb-6 flex items-baseline gap-1">
                <span className="text-4xl font-black text-botanik-green">79€</span>
                <span className="text-sm text-botanik-green/60">/an</span>
                <span className="ml-2 text-xs bg-botanik-orange/10 text-botanik-orange font-bold px-2 py-0.5 rounded-full">
                  {isFR ? "2 mois offerts" : "2 months free"}
                </span>
              </div>
              <ul className="space-y-3 text-sm text-botanik-green/80 mb-8">
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-botanik-green flex-shrink-0" />
                  <span>Tout le catalogue de protocoles d'extraction</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-botanik-green flex-shrink-0" />
                  <span>Mises à jour mensuelles des nouvelles recettes</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-botanik-green flex-shrink-0" />
                  <span>Économie de plus de 28% par rapport au mensuel</span>
                </li>
              </ul>
            </div>
            <button
              onClick={() => handleSubscribe('annual')}
              className="w-full py-3.5 px-6 rounded-2xl border-2 border-botanik-green text-botanik-green font-bold text-sm hover:bg-botanik-green hover:text-white transition-all cursor-pointer"
            >
              {isFR ? "Choisir la formule annuelle (79€)" : "Select Annual Plan (79€)"}
            </button>
          </div>

        </div>
      </section>

      {/* Ce que vous débloquez */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-botanik-green mb-4">
            {isFR ? "Ce que comprend votre Abonnement Premium" : "What is included in your Premium Membership"}
          </h2>
          <p className="text-base text-botanik-green/70 max-w-2xl mx-auto">
            {isFR 
              ? "Une boîte à outils complète pour comprendre le vivant et réussir vos préparations botaniques."
              : "A complete toolkit to understand plant synergies and master botanical preparations."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-white rounded-2xl border border-botanik-green/10 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-botanik-green/10 flex items-center justify-center text-botanik-green">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-botanik-green text-lg">
              {isFR ? "60+ Fiches et Protocoles" : "60+ Protocols and Monographs"}
            </h3>
            <p className="text-sm text-botanik-green/70 leading-relaxed">
              {isFR 
                ? "Fiches complètes avec ratios de solvants (eau, alcool, glycérine, huile), polarité et temps d'extraction."
                : "Complete monographs with exact solvent ratios, polarities, and kinetic durations."}
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-botanik-green/10 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-botanik-orange/10 flex items-center justify-center text-botanik-orange">
              <Activity className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-botanik-green text-lg">
              {isFR ? "Protocoles Systémiques" : "Systemic Protocols"}
            </h3>
            <p className="text-sm text-botanik-green/70 leading-relaxed">
              {isFR 
                ? "Des protocoles ciblés pour accompagner les 9 terrains biologiques (Microbiome, Énergie, Sommeil, Sérénité...)."
                : "Targeted protocols to support the 9 biological terrains (Microbiome, Energy, Sleep, Serenity...)."}
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-botanik-green/10 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-botanik-green/10 flex items-center justify-center text-botanik-green">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-botanik-green text-lg">
              {isFR ? "Recettes Cosmétiques & Culinaires" : "Cosmetic & Culinary Recipes"}
            </h3>
            <p className="text-sm text-botanik-green/70 leading-relaxed">
              {isFR 
                ? "Accès illimité aux ateliers : sérums précieux, baumes botaniques, huiles gastronomiques et beurres aromatiques."
                : "Full access to cosmetic serums, botanical balms, gourmet oils, and aromatic butters."}
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-4xl mx-auto px-6 py-12 mb-16">
        <div className="bg-white rounded-3xl p-8 md:p-12 border border-botanik-green/10 shadow-sm space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold text-botanik-green mb-6">
            {isFR ? "Questions fréquentes sur l'abonnement" : "Subscription FAQ"}
          </h2>

          <div className="space-y-6 divide-y divide-botanik-green/10">
            <div className="pt-4 first:pt-0">
              <h4 className="font-bold text-botanik-green text-base mb-2">
                {isFR ? "L'abonnement est-il sans engagement ?" : "Is the subscription commitment-free?"}
              </h4>
              <p className="text-sm text-botanik-green/80 leading-relaxed">
                {isFR 
                  ? "Oui, absolument. Vous pouvez résilier en un clic depuis votre espace membre à tout moment. Vous conserverez l'accès jusqu'à la fin de votre période en cours."
                  : "Yes, absolutely. You can cancel with a single click from your member account at any time."}
              </p>
            </div>

            <div className="pt-4">
              <h4 className="font-bold text-botanik-green text-base mb-2">
                {isFR ? "Dois-je obligatoirement posséder la machine BloomLab® ?" : "Do I need the BloomLab® machine?"}
              </h4>
              <p className="text-sm text-botanik-green/80 leading-relaxed">
                {isFR 
                  ? "Non, les savoirs et protocoles sont consultables librement. Cependant, l'utilisation de la BloomLab® garantit une précision thermique à ±0,5°C et une agitation cinétique impossible à reproduire au bain-marie."
                  : "No, the monographs and recipes can be consulted on any device. However, BloomLab allows you to execute them with degree-level thermal precision."}
              </p>
            </div>

            <div className="pt-4">
              <h4 className="font-bold text-botanik-green text-base mb-2">
                {isFR ? "Quelle est la différence entre Bloom Complet et l'abonnement digital ?" : "Difference between Bloom Complete and Digital?"}
              </h4>
              <p className="text-sm text-botanik-green/80 leading-relaxed">
                {isFR 
                  ? "L'abonnement digital (9€/mois) vous donne accès à tous les contenus numériques. La formule Bloom Complet (59€/mois) inclut en plus la réception régulière de nos mélanges botaniques rigoureusement sourcés pour réaliser vos cures en toute sérénité."
                  : "The digital plan provides complete library access. The Bloom Complete plan also includes our physical botanical blends shipped directly to your door."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mandatory Disclaimer */}
      <section className="max-w-4xl mx-auto px-6 pb-20">
        <div className="p-6 bg-botanik-green/5 rounded-2xl border border-botanik-green/10 flex items-start gap-4 text-xs text-botanik-green/80 leading-relaxed">
          <AlertCircle className="w-5 h-5 text-botanik-green flex-shrink-0 mt-0.5" />
          <p>
            <strong>{isFR ? "Avertissement : " : "Disclaimer: "}</strong>
            {isFR 
              ? "Bloom by BotaniK propose une approche éducative de la préparation botanique. Nos contenus ne remplacent pas un avis médical, un diagnostic ou un traitement."
              : "Bloom by BotaniK offers an educational approach to botanical preparation. Our content does not replace medical advice, diagnosis, or treatment."}
          </p>
        </div>
      </section>
    </div>
  );
}
