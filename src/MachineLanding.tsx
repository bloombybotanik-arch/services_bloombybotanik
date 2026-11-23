import React, { useState } from 'react';
import { 
  ChevronRight, 
  ShieldCheck, 
  Zap, 
  FlaskConical, 
  Star, 
  Activity, 
  ArrowRight, 
  Check, 
  Utensils, 
  CheckCircle, 
  X, 
  Maximize2, 
  Flame, 
  Clock, 
  Sparkles, 
  HelpCircle,
  Package,
  Layers,
  HeartHandshake,
  Award,
  Compass,
  Thermometer,
  Wind
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TooltipLexique } from './components/TooltipLexique';
import { translations, Language } from './translations';
import { trackViewItem, trackFaqExpand } from './utils/analytics';
import { AmazonRatingBadge } from './components/AmazonSocialProof';
import SeoHead from './components/SeoHead';

const heroViews = [
  { id: 'v2', label: 'Vue 2', src: '/images/1.png', fallbackSrc: '/images/1.png', subtitle: 'Précision' },
  { id: 'v3', label: 'Vue 3', src: '/images/2.png', fallbackSrc: '/images/2.png', subtitle: 'Extraction' },
  { id: 'v4', label: 'Vue 4', src: '/images/8.png', fallbackSrc: '/images/8.png', subtitle: 'Totum' },
  { id: 'v1', label: 'Vue 1', src: '/img/produit/bloomlab-face-1200x1200.jpg', fallbackSrc: '/img/produit/bloomlab-face-1200x1200.jpg', subtitle: 'Face Inox' },
];
const heroImg1 = heroViews[0].src;
const bloomSoinsImg = "/assets/images/Bloom_Soins.jpg";
const fourMmImg = "/assets/images/4MM.jpg";

export default function MachineLanding({ onNavigate, lang }: { onNavigate: (view: any, param?: string) => void, lang: Language }) {
  const t = translations[lang].machine;
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);
  const [selectedHeroImage, setSelectedHeroImage] = useState<string>(heroViews[0].src);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [selectedOption, setSelectedOption] = useState<'solo' | 'signature'>('solo');

  React.useEffect(() => {
    trackViewItem({
      id: 'bloomlab',
      name: 'BloomLab® — Extracteur Botanique de Précision',
      price: 229.00,
      category: 'hardware'
    });
  }, []);

  const activeView = heroViews.find(v => v.src === selectedHeroImage || v.fallbackSrc === selectedHeroImage) || heroViews[0];

  const faqItems = (t as any).faq || [];

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': 'https://bloombybotanik.com/bloomlab#product',
    name: 'BloomLab®',
    description:
      lang === 'fr'
        ? "Extracteur botanique en acier inoxydable 304 pour cosmétique et cuisine maison. Cuve Inox 304 alimentaire, 6 programmes automatisés (0 à 121 °C, spécification nominale ±0,5 °C), brassage doux sans broyage, manuel complet et 100 recettes en français. Garantie légale 2 ans (UE) + commerciale 1 an."
        : lang === 'de'
        ? 'Botanischer Extraktor aus Edelstahl 304 für Naturkosmetik und Küche. 6 automatische Programme (0–121 °C, Nennwert ±0,5 °C), sanftes Rühren, Handbuch und 100 Rezepte. 2 Jahre gesetzl. Gewährleistung (EU) + 1 Jahr Garantie.'
        : '304 stainless steel botanical extractor for homemade cosmetics and culinary creations. 6 automated programs (0–121°C, nominal ±0.5°C), gentle stirring, complete manual and 100 recipes. 2-year EU legal warranty + 1-year commercial warranty.',
    image: [
      'https://bloombybotanik.com/img/produit/bloomlab-face-1200x1200.jpg',
      'https://bloombybotanik.com/img/produit/bloomlab-3quarts-1200x1200.jpg',
    ],
    sku: 'BLOOMLAB-V2',
    brand: {
      '@type': 'Brand',
      name: 'Bloom by BotaniK',
    },
    offers: {
      '@type': 'Offer',
      url: 'https://bloombybotanik.com/bloomlab',
      priceCurrency: 'EUR',
      price: '229.00',
      priceValidUntil: '2026-12-31',
      itemCondition: 'https://schema.org/NewCondition',
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'Bloom by BotaniK',
      },
    },
    /* schema.org AggregateRating omis : avis externes hébergés sur Amazon.fr */
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': 'https://bloombybotanik.com/bloomlab#faq',
    mainEntity: faqItems.map((item: any) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };

  const bloomlabSeoTitle =
    lang === 'fr'
      ? 'BloomLab® — Extracteur Botanique Inox 304 pour Cosmétique & Cuisine Maison'
      : lang === 'de'
      ? 'BloomLab® — Botanischer Extraktor Edelstahl 304 für Kosmetik & Küche'
      : 'BloomLab® — 304 Stainless Botanical Extractor for Homemade Cosmetics & Kitchen';

  const bloomlabSeoDescription =
    lang === 'fr'
      ? 'Préparez vos macérâts huileux, baumes et infusions botaniques sans amertume. Garantie légale 2 ans (UE) + commerciale 1 an, manuel complet en français et 100 recettes.'
      : lang === 'de'
      ? 'Bereiten Sie Ölmazerate, Balsame und Kräuterauszüge ohne Bitterkeit zu. 2 Jahre gesetzl. Gewährleistung (EU) + 1 Jahr Garantie, Handbuch und 100 Rezepte.'
      : 'Prepare oil macerates, balms, and botanical infusions without bitterness. 2-year EU legal + 1-year commercial warranty, complete manual, and 100 recipes included.';

  return (
    <div data-product-page="true" className="product-detail animate-in fade-in duration-700 bg-[#FAF7F2] text-[#3E4A3D] w-full max-w-full overflow-x-clip">
      <SeoHead
        title={bloomlabSeoTitle}
        description={bloomlabSeoDescription}
        canonical="https://bloombybotanik.com/bloomlab"
        ogType="product"
        lang={lang}
        schemas={[productSchema, faqSchema]}
      />
      {/* Fullscreen Image Overlay */}
      <AnimatePresence>
        {fullscreenImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setFullscreenImage(null)}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-12 cursor-zoom-out"
          >
            <button 
              onClick={() => setFullscreenImage(null)}
              className="absolute top-6 right-6 p-3 bg-[#3E4A3D] hover:bg-[#2D372C] rounded-full text-white transition-colors border border-white/20"
              aria-label="Close"
            >
              <X className="w-8 h-8" />
            </button>
            <motion.img 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={fullscreenImage} 
              alt="BloomLab Detail" 
              className="max-w-full max-h-full object-contain rounded-xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Promotional Banner */}
      <div className="bg-[#D97706]/10 text-[#B45309] border-b border-[#D97706]/30 text-center py-2.5 px-4 text-[10px] md:text-xs font-black uppercase tracking-[0.2em]">
        {lang === 'fr' 
          ? "🇫🇷 Conception française des protocoles • Expédition 24/48h • Garantie légale 2 ans (UE) + commerciale 1 an" 
          : lang === 'de'
          ? "🇫🇷 Französische Protokoll-Entwicklung • Versand 24/48h • 2 Jahre gesetzl. Gewährleistung (EU) + 1 Jahr Garantie"
          : "🇫🇷 Protocols crafted in France • 24/48h Shipping • 2-Year EU Legal Warranty + 1-Year Commercial"}
      </div>

      {/* 1. HERO HEADER SECTION */}
      <section className="relative overflow-hidden bg-[#3E4A3D] text-white pt-8 pb-16 md:pt-12 md:pb-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(200, 171, 138,0.15),rgba(255,255,255,0))] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <nav aria-label="Fil d'Ariane" className="flex flex-wrap items-center justify-between gap-3 mb-6 text-[11px] sm:text-xs text-white/80">
            <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
              <li>
                <a
                  href="/"
                  onClick={(e) => {
                    if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                      e.preventDefault();
                      onNavigate('home');
                    }
                  }}
                  className="hover:text-white underline-offset-4 hover:underline transition-colors"
                >
                  {lang === 'fr' ? 'Accueil Bloom by BotaniK' : lang === 'de' ? 'Startseite Bloom by BotaniK' : 'Bloom by BotaniK Home'}
                </a>
              </li>
              <li className="text-white/40">/</li>
              <li>
                <a
                  href="/boutique/"
                  onClick={(e) => {
                    if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                      e.preventDefault();
                      onNavigate('boutique');
                    }
                  }}
                  className="hover:text-white underline-offset-4 hover:underline transition-colors"
                >
                  {lang === 'fr' ? 'Boutique' : lang === 'de' ? 'Shop' : 'Shop'}
                </a>
              </li>
              <li className="text-white/40">/</li>
              <li className="text-white font-semibold" aria-current="page">BloomLab®</li>
            </ol>
          </nav>

          {/* Hero E-Commerce 2 Colonnes : Galerie Produit (Gauche) + Fiche & Buy-Box (Droite) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start mb-12">
            {/* Colonne Gauche : Galerie interactive */}
            <div className="lg:col-span-6 space-y-4">
              <div 
                className="relative rounded-3xl overflow-hidden border border-white/15 bg-white/5 shadow-2xl w-full h-[360px] sm:h-[460px] lg:h-[520px] cursor-zoom-in group"
                onClick={() => setFullscreenImage(selectedHeroImage)}
              >
                <picture>
                  <source type="image/webp" srcSet={activeView.src} />
                  <img 
                    src={activeView.fallbackSrc} 
                    alt={activeView.subtitle || "BloomLab"} 
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                    className="w-full h-full object-cover object-[center_35%] group-hover:scale-105 transition-transform duration-700" 
                  />
                </picture>
                <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/75 via-black/30 to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 z-20 flex items-center gap-2">
                  {heroViews.map((view) => {
                    const isSelected = selectedHeroImage === view.src || selectedHeroImage === view.fallbackSrc;
                    return (
                      <button
                        key={view.id}
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedHeroImage(view.src);
                        }}
                        className={`p-1 rounded-xl border transition-all cursor-pointer backdrop-blur-md ${
                          isSelected 
                            ? 'bg-black/80 border-[#C8AB8A] shadow-xl ring-2 ring-[#C8AB8A]' 
                            : 'bg-black/50 border-white/25 hover:border-white/60 hover:bg-black/75'
                        }`}
                        title={view.subtitle}
                      >
                        <picture>
                          <source type="image/webp" srcSet={view.src} />
                          <img 
                            src={view.fallbackSrc} 
                            alt={view.subtitle} 
                            loading="lazy"
                            decoding="async"
                            className="w-11 h-11 sm:w-12 sm:h-12 rounded-lg object-cover" 
                          />
                        </picture>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Colonne Droite : En-tête Produit & Sélecteur de configuration */}
            <div className="lg:col-span-6 space-y-5 bg-white/5 border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xs">
              <div className="space-y-2.5">
                <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight tracking-tight">
                  {lang === 'fr'
                    ? "BloomLab® — Extracteur Botanique de Précision Inox 304 pour Cosmétique & Cuisine Maison"
                    : lang === 'de'
                    ? "BloomLab® — Botanischer Präzisionsextraktor Edelstahl 304 für Kosmetik & Küche"
                    : "BloomLab® — 304 Stainless Precision Botanical Extractor for Cosmetics & Kitchen"}
                </h1>
                <div className="pt-1">
                  <AmazonRatingBadge lang={lang} />
                </div>
              </div>

              <p className="text-sm sm:text-base text-white/90 leading-relaxed">
                {lang === 'fr'
                  ? "Le laboratoire domestique de cosmétique botanique et cuisine maison : créez vos sérums visage, huiles de soin, baumes et infusions concentrées en 2 heures, sans amertume ni 6 semaines d'attente."
                  : lang === 'de'
                  ? "Das kompakte Labor für Naturkosmetik und botanische Küche: Seren, Pflegeöle, Balsame und konzentrierte Aufgüsse in 2 Stunden ohne Bitterkeit und ohne 6 Wochen Wartezeit."
                  : "The compact home lab for botanical cosmetics and kitchen infusions: craft face serums, skincare oils, balms, and concentrated herbal preparations in 2 hours without bitterness or waiting 6 weeks."}
              </p>

              {/* 3 Bénéfices Clés Immédiats */}
              <ul className="space-y-2.5 text-xs sm:text-sm text-white/95">
                <li className="flex items-start gap-2.5">
                  <span className="shrink-0">✅</span>
                  <span>
                    {lang === 'fr'
                      ? "6 programmes automatisés (0 à 121 °C, régulation nominale annoncée ±0,5 °C) : limite les pics de chaleur sur les résines et aromates"
                      : lang === 'de'
                      ? "6 automatische Programme (0–121 °C, Hersteller-Nennwert ±0,5 °C): begrenzt Hitzespitzen für Harze und Aromaten"
                      : "6 automated programs (0–121°C, nominal mfr. spec ±0.5°C): avoids heat spikes on resins and aromatics"}
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="shrink-0">✅</span>
                  <span>
                    {lang === 'fr'
                      ? "Brassage doux sans broyage : préserve la plante sans amertume (contrairement aux mixeurs à lames)"
                      : lang === 'de'
                      ? "Sanftes Rühren ohne Zerkleinern: bewahrt die Pflanze ohne Bitterkeit (anders als Mixmesser)"
                      : "Gentle stirring without shredding: preserves herbs with zero bitterness (unlike bladed blenders)"}
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="shrink-0">✅</span>
                  <span>
                    {lang === 'fr'
                      ? "Cuve 100 % Inox 304 alimentaire sans plastique + manuel complet et 100 recettes exclusives en français"
                      : lang === 'de'
                      ? "100 % lebensmittelechter Edelstahl 304 ohne Kunststoff + vollständiges Handbuch & 100 exklusive Rezepte"
                      : "100% food-grade 304 stainless steel chamber without plastic + complete manual and 100 exclusive recipes"}
                  </span>
                </li>
              </ul>

              {/* Sélecteur de configuration */}
              <div className="space-y-2.5 pt-2">
                <div className="text-xs font-black uppercase tracking-wider text-[#C8AB8A]">
                  {lang === 'fr' ? "Sélecteur de configuration" : lang === 'de' ? "Konfiguration wählen" : "Configuration selector"}
                </div>
                <div className="grid grid-cols-1 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setSelectedOption('solo')}
                    className={`w-full p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between gap-3 ${
                      selectedOption === 'solo'
                        ? 'bg-[#0F261E] border-[#E8772E] ring-2 ring-[#E8772E]/50 text-white'
                        : 'bg-white/5 border-white/15 text-white/80 hover:bg-white/10'
                    }`}
                  >
                    <div>
                      <div className="font-black text-sm">
                        {lang === 'fr' ? "Option 1 : BloomLab® Solo" : lang === 'de' ? "Option 1: BloomLab® Solo" : "Option 1: BloomLab® Solo"}
                      </div>
                      <div className="text-[11px] text-white/70">
                        {lang === 'fr' ? "Infuseur Inox 304 + Panier 90 µm + 5 accessoires offerts + Accès 3 mois (+160 recettes)" : lang === 'de' ? "Edelstahl-Infuser + 90-µm-Korb + 5 Gratis-Zubehörteile + 3 Mon. Zugang (+160 Rezepte)" : "304 Steel Infuser + 90µm basket + 5 free accessories + 3-mo access (160+ recipes)"}
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-lg font-black text-white">229 €</div>
                      <div className="text-[11px] line-through text-white/45">289 €</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedOption('signature')}
                    className={`w-full p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between gap-3 relative ${
                      selectedOption === 'signature'
                        ? 'bg-[#0F261E] border-[#E8772E] ring-2 ring-[#E8772E]/50 text-white'
                        : 'bg-white/5 border-white/15 text-white/80 hover:bg-white/10'
                    }`}
                  >
                    <div>
                      <div className="font-black text-sm flex flex-wrap items-center gap-2">
                        <span>{lang === 'fr' ? "Option 2 : Pack Signature" : lang === 'de' ? "Option 2: Signature-Paket" : "Option 2: Signature Pack"}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#E8772E] text-white font-black uppercase">
                          {lang === 'fr' ? "Économisez 60 €" : lang === 'de' ? "60 € sparen" : "Save €60"}
                        </span>
                      </div>
                      <div className="text-[11px] text-white/70">
                        {lang === 'fr' ? "Machine + Kit apothicaire + Herbier Complet + Duo Argiles + 3 mois Académie" : lang === 'de' ? "Maschine + Apotheker-Set + Herbarium + Tonerde-Duo + 3 Mon. Akademie" : "Machine + Apothecary Kit + Complete Herbarium + Clay Duo + 3 Mo Academy"}
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-lg font-black text-white">289 €</div>
                      <div className="text-[11px] line-through text-white/45">349 €</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Bouton d'achat principal */}
              <button
                type="button"
                onClick={() => onNavigate('product-detail', selectedOption === 'solo' ? 'bloomlab' : 'pack-signature')}
                className="w-full py-4 px-6 bg-[#E8772E] hover:bg-[#D4651F] text-white rounded-2xl font-black text-sm sm:text-base transition-all shadow-xl flex items-center justify-center gap-3 cursor-pointer"
              >
                <span>
                  {lang === 'fr'
                    ? "Ajouter au panier — Expédition sous 24/48h"
                    : lang === 'de'
                    ? "In den Warenkorb — Versand in 24/48h"
                    : "Add to cart — Ships in 24/48h"}
                </span>
                <ChevronRight className="w-5 h-5" />
              </button>

              <p className="text-[11px] sm:text-xs text-white/80 text-center leading-relaxed">
                {lang === 'fr'
                  ? "🛡️ Rétractation légale 14 j • Essai commercial 30 j • ⚡ Garantie légale 2 ans (UE) + commerciale 1 an • 💳 Stripe & PayPal."
                  : lang === 'de'
                  ? "🛡️ 14 Tage gesetzl. Widerruf • 30 Tage Test • ⚡ 2 Jahre gesetzl. Gewährleistung (EU) + 1 Jahr Garantie • 💳 Stripe & PayPal."
                  : "🛡️ 14-day legal withdrawal • 30-day trial • ⚡ 2-Year EU Legal + 1-Year Commercial Warranty • 💳 Stripe & PayPal."}
              </p>
            </div>
          </div>

          {/* AMAZON ACTIVATION BANNER */}
          <div className="max-w-4xl mx-auto mb-10 bg-[#132B22] border border-[#C8AB8A]/30 rounded-2xl p-4 shadow-lg">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3 text-white">
                <div className="w-10 h-10 rounded-xl bg-[#C8AB8A] flex items-center justify-center shrink-0">
                  <Package className="w-5 h-5 text-white" />
                </div>
                <p className="text-xs sm:text-sm font-medium text-white">
                  <span className="font-bold text-white">
                    {lang === 'fr' ? "Acheteur Amazon ?" : lang === 'de' ? "Amazon-Kunde?" : "Amazon Customer?"}
                  </span>{' '}
                  <span className="text-white">
                    {lang === 'fr'
                      ? "Ne restez pas seul face à vos plantes. Uploadez votre facture pour débloquer gratuitement vos protocoles et l'accès Premium à la Bibliothèque Bloom."
                      : lang === 'de'
                      ? "Laden Sie Ihre Rechnung hoch, um Ihre Protokolle und den Premium-Zugang zur Bloom-Bibliothek kostenlos freizuschalten."
                      : "Upload your invoice to unlock your extraction protocols and free Premium Bloom Library access."}
                  </span>
                </p>
              </div>
              <button 
                onClick={() => onNavigate('activation')} 
                className="px-5 py-2.5 bg-[#3E4A3D] hover:bg-[#2D372C] text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-[#C8AB8A]/20 whitespace-nowrap cursor-pointer border border-white/20"
              >
                {lang === 'fr' ? "Activer mon accès Premium" : lang === 'de' ? "Premium-Zugang aktivieren" : "Activate Premium Access"}
              </button>
            </div>
          </div>

          {/* Suivit du texte */}
          <div className="max-w-3xl mx-auto space-y-8 text-center sm:text-left">
            {/* Texte historique : Le naturel ne doit plus être approximatif */}
            <div className="p-6 md:p-8 rounded-3xl bg-[#142D23] border-2 border-[#C8AB8A]/40 space-y-4 shadow-2xl shadow-black/20 text-[#FAF7F2]">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C8AB8A]/20 border border-[#C8AB8A]/35 text-[#C8AB8A] text-xs font-bold uppercase tracking-widest">
                <Compass className="w-4 h-4 text-[#C8AB8A]" />
                <span>
                  {(t.hero as any).history_badge || "Héritage Millénaire & Rigueur Botanique"}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#F3E8D8] leading-snug">
                {(t.hero as any).history_title || "Le naturel ne doit plus être approximatif."}
              </h3>
              <p className="text-base sm:text-lg text-[#C8AB8A] leading-relaxed italic">
                {(t.hero as any).history_subtitle || "Il y a 5 000 ans, l'Asie savait déjà tout de l'extraction."}
              </p>
              <p className="text-sm sm:text-base text-[#FAF7F2]/90 leading-relaxed font-light">
                {(t.hero as any).history_p1 || "En Médecine Traditionnelle Chinoise comme en Ayurveda, l'extraction n'était ni un geste approximatif, ni une habitude de cuisine. C'était un art codifié, où le temps, le feu et la matière obéissaient à des règles précises. Décoctions longuement mijotées, macérations à feu doux, résines travaillées avec patience : les praticiens d'Orient savaient qu'une plante trahie par la chaleur est une plante qui perd son intelligence."}
              </p>
              <p className="text-sm sm:text-base text-[#C8AB8A] font-semibold flex items-center gap-2">
                <span>—</span>
                <span>{(t.hero as any).history_p2 || "Ce savoir a fondé l'herboristerie du monde."}</span>
              </p>
            </div>

            <div className="space-y-4 text-base sm:text-lg text-white leading-relaxed font-normal">
              <p className="text-white">
                {lang === 'fr' ? (
                  <>Conçue par <strong>Bloom by BotaniK</strong>, la <strong>BloomLab®</strong> favorise l&apos;extraction des composés recherchés tout en respectant les fractions sensibles. Vous ne faites plus simplement chauffer une plante : vous régulez la température et la durée de vos infusions (<TooltipLexique terme="polyphenols" />, flavonoïdes, notes aromatiques…) sous des seuils thermiques modérés afin de limiter leur altération par la chaleur.</>
                ) : lang === 'de' ? (
                  <>Entwickelt von <strong>Bloom by BotaniK</strong>, unterstützt die <strong>BloomLab®</strong> die gezielte Extraktion pflanzlicher Inhaltsstoffe bei gleichzeitigem Schutz empfindlicher Molekülfraktionen. Statt Kräuter unkontrolliert zu erhitzen, steuern Sie Temperatur, Zeit und Lösungsmittel innerhalb moderater Schwellenwerte.</>
                ) : (
                  <>Engineered by <strong>Bloom by BotaniK</strong>, the <strong>BloomLab®</strong> supports extraction of desired botanical compounds while safeguarding heat-sensitive fractions. Instead of guessing on a stovetop, you regulate temperature, timing, and solvent conditions under moderate thermal thresholds.</>
                )}
              </p>
              <p className="text-white/90 text-sm sm:text-base font-light">
                {lang === 'fr'
                  ? "Là où une casserole ou un bain‑marie improvisé chauffent de façon irrégulière, BloomLab offre un profil thermique régulé qui ménage les molécules sensibles à la chaleur dans vos huiles infusées, macérâts glycérinés et décoctions aqueuses."
                  : lang === 'de'
                  ? "Wo ein Kochtopf oder ein improvisiertes Wasserbad ungleichmäßig erhitzt, bietet BloomLab ein geregeltes Temperaturprofil, das wärmeempfindliche Moleküle in Ihren Ölauszügen, Glycerinauszügen und Dekokten schont."
                  : "Where a saucepan or improvised double boiler heats unevenly, BloomLab maintains a regulated thermal profile that protects heat-sensitive compounds in your infused oils, glycerin extracts, and aqueous decoctions."}
              </p>
            </div>

            {/* Reassurance Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-semibold text-white/90 bg-white/5 border border-white/10 px-4 py-3 rounded-xl">
                <ShieldCheck className="w-4 h-4 text-[#C8AB8A] shrink-0" />
                <span>{lang === 'fr' ? "Inox 304 alimentaire" : lang === 'de' ? "304-Edelstahl (Lebensmittelqualität)" : "Food-grade 304 Steel"}</span>
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-semibold text-white/90 bg-white/5 border border-white/10 px-4 py-3 rounded-xl">
                <Activity className="w-4 h-4 text-[#C8AB8A] shrink-0" />
                <span>{lang === 'fr' ? "Régulation ±0,5°C (spéc. fabricant)" : lang === 'de' ? "Regelung ±0,5°C (Herstellerangabe)" : "±0.5°C Regulation (mfr. spec)"}</span>
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-semibold text-white/90 bg-white/5 border border-white/10 px-4 py-3 rounded-xl">
                <Award className="w-4 h-4 text-[#C8AB8A] shrink-0" />
                <span>{lang === 'fr' ? "Garantie 2 ans UE + 1 an" : lang === 'de' ? "2 J. EU-Gewährl. + 1 J. Gar." : "2-Yr EU + 1-Yr Warranty"}</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-4">
              <button 
                onClick={() => onNavigate('product-detail', 'bloomlab')}
                className="px-8 py-4 bg-[#3E4A3D] hover:bg-[#2D372C] text-white rounded-2xl font-bold text-base md:text-lg transition-all shadow-xl shadow-black/20 flex items-center gap-3 cursor-pointer"
              >
                <span>{t.hero.cta || "Commander BloomLab"}</span>
                <ChevronRight className="w-5 h-5" />
              </button>
              <button 
                onClick={() => document.getElementById('pourquoi-l-infusion-echoue')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 bg-white/10 hover:bg-white/15 text-white border border-white/20 rounded-2xl font-semibold text-base transition-all cursor-pointer"
              >
                {t.hero.discover || "Comprendre la méthode"}
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 2. LE VERROU MÉTHODOLOGIQUE */}
      <section id="verrou-methodologique" className="py-20 md:py-28 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="inline-block px-3.5 py-1.5 rounded-full bg-[#C8AB8A]/10 text-[#C8AB8A] text-xs font-black uppercase tracking-[0.25em] border border-[#C8AB8A]/20">
              {lang === 'fr' ? "2. LE VERROU MÉTHODOLOGIQUE" : lang === 'de' ? "2. DIE METHODISCHE HÜRDE" : "2. THE METHODOLOGICAL BARRIER"}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#3E4A3D] leading-tight">
              {lang === 'fr' 
                ? "Double Extraction Séquentielle (Eau + Huile / Glycérine) : préservez l'équilibre du Totum" 
                : lang === 'de' 
                ? "Sequenzielle Doppelextraktion (Wasser + Öl / Glycerin): das Pflanzen-Totum bewahren" 
                : "Sequential Dual Extraction (Water + Oil / Glycerin): Preserve the Plant Totum"}
            </h2>
            <p className="text-base sm:text-lg text-[#3E4A3D]/70 leading-relaxed font-normal">
              {lang === 'fr'
                ? "Préparez vos huiles de soin, sérums et infusions concentrées en 2 heures au lieu de 6 semaines. BloomLab adresse les 3 barrières physiques qui affaiblissent les préparations maison grâce au contrôle du temps, de la température et des solvants non inflammables (eau, huile, glycérine — alcool chauffé en cuve suspendu par sécurité)."
                : lang === 'de'
                ? "Stellen Sie Pflegeöle, Seren und konzentrierte Auszüge in 2 Stunden statt 6 Wochen her. BloomLab arbeitet mit nicht brennbaren Lösungsmitteln (Wasser, Öl, Glycerin — erhitzter Alkohol im Gerät ist aus Sicherheitsgründen ausgesetzt)."
                : "Craft care oils, serums, and concentrated infusions in 2 hours instead of 6 weeks using non-flammable solvents (water, oil, glycerin — heated alcohol inside the chamber is suspended for safety)."}
            </p>
            <details className="text-left max-w-2xl mx-auto rounded-2xl border border-[#3E4A3D]/15 bg-white p-4 shadow-xs">
              <summary className="cursor-pointer font-bold text-sm text-[#3E4A3D] select-none">
                {lang === 'fr'
                  ? "🔬 Pour les experts & praticiens : voir le principe biochimique"
                  : lang === 'de'
                  ? "🔬 Für Experten & Praktiker: biochemisches Prinzip ansehen"
                  : "🔬 For experts & practitioners: view biochemical principle"}
              </summary>
              <div className="mt-3 pt-3 border-t border-[#3E4A3D]/10 text-xs sm:text-sm text-[#3E4A3D]/80 space-y-2 leading-relaxed">
                <p>
                  {lang === 'fr'
                    ? "L'extraction obéit à la loi de diffusion de Fick et à la sélectivité de polarité des solvants : la phase hydrophile (eau ou glycérine, 75–90 °C sur racines et fibres denses) solubilise tanins, polyphénols et minéraux, tandis que la phase lipophile (huiles végétales ou beurres, 40–58 °C sur feuilles et sommités fleuries) capture les terpènes volatils et composés liposolubles. Par précaution technique, aucune extraction à l'alcool chauffé n'est conduite dans la cuve BloomLab®."
                    : lang === 'de'
                    ? "Die Extraktion folgt dem Fickschen Diffusionsgesetz und der Lösungsmittelpolarität: Die hydrophile Phase (Wasser/Glycerin, 75–90 °C) löst Tannine und Mineralstoffe aus festen Wurzeln, während die lipophile Phase (Pflanzenöle, 40–58 °C) flüchtige Terpene und fettlösliche Moleküle aufnimmt. Aus Sicherheitsgründen erfolgt keine erhitzte Alkoholextraktion im BloomLab®."
                    : "Extraction follows Fick's diffusion law and solvent polarity selectivity: the hydrophilic stage (water/glycerin, 75–90°C) solubilizes tannins and minerals from dense roots, while the lipophilic stage (carrier oils, 40–58°C) captures volatile terpenes and fat-soluble compounds. For safety, no heated alcohol extraction is performed inside BloomLab®."}
                </p>
                <p>
                  {lang === 'fr'
                    ? "Le vortex laminaire réduit l'épaisseur de couche limite autour des fibres végétales sans broyer la plante ni libérer de chlorophylle amère, pour une reproductibilité constante."
                    : lang === 'de'
                    ? "Der laminare Vortex reduziert die Grenzschicht um die Pflanzenfasern ohne Zerkleinern und ohne Freisetzung bitteren Chlorophylls."
                    : "Continuous laminar vortex agitation reduces the boundary layer around plant fibers without shredding or releasing bitter chlorophyll."}
                </p>
              </div>
            </details>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Carte 1 : Choc Thermique */}
            <div className="bg-white p-8 rounded-3xl border border-[#3E4A3D]/10 shadow-xs flex flex-col">
              <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mb-6">
                <Thermometer className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#3E4A3D] mb-3">
                {lang === 'fr' ? "1. Le Choc Thermique" : lang === 'de' ? "1. Der Thermoschock" : "1. Thermal Shock"}
              </h3>
              <p className="text-sm text-[#3E4A3D]/75 leading-relaxed flex-1">
                {lang === 'fr'
                  ? "L'eau bouillante ou un bain-marie incontrôlé dépasse les 60°C à 100°C : les terpènes volatils s'évaporent et les flavonoïdes thermolabiles sont dégradés avant usage."
                  : lang === 'de'
                  ? "Kochendes Wasser oder ein unkontrolliertes Wasserbad übersteigt 60°C bis 100°C: flüchtige Terpene verdampfen und hitzeempfindliche Flavonoide werden zerstört."
                  : "Boiling water or an uncontrolled double boiler exceeds 60°C to 100°C: volatile terpenes evaporate and heat-labile flavonoids degrade before use."}
              </p>
            </div>

            {/* Carte 2 : Barrière de Polarité */}
            <div className="bg-white p-8 rounded-3xl border border-[#3E4A3D]/10 shadow-xs flex flex-col">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-6">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#3E4A3D] mb-3">
                {lang === 'fr' ? "2. La Barrière de Polarité" : lang === 'de' ? "2. Die Polaritätsbarriere" : "2. Polarity Barrier"}
              </h3>
              <p className="text-sm text-[#3E4A3D]/75 leading-relaxed flex-1">
                {lang === 'fr'
                  ? "Une plante contient à la fois des principes hydrosolubles et liposolubles. Une extraction unique à l'aveugle laisse la moitié des principes actifs captifs de la fibre végétale."
                  : lang === 'de'
                  ? "Jede Pflanze enthält sowohl wasser- als auch fettlösliche Stoffe. Eine einfache Einzelextraktion lässt die Hälfte der Aktivstoffe in der Pflanzenfaser gefangen."
                  : "Every plant contains both water-soluble and fat-soluble compounds. A single uncalibrated extraction leaves half the active spectrum trapped in plant fiber."}
              </p>
            </div>

            {/* Carte 3 : Oxydation à l'Air Libre */}
            <div className="bg-white p-8 rounded-3xl border border-[#3E4A3D]/10 shadow-xs flex flex-col">
              <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center mb-6">
                <Wind className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#3E4A3D] mb-3">
                {lang === 'fr' ? "3. L'Oxydation à l'Air Libre" : lang === 'de' ? "3. Oxidation an der Luft" : "3. Open-Air Oxidation"}
              </h3>
              <p className="text-sm text-[#3E4A3D]/75 leading-relaxed flex-1">
                {lang === 'fr'
                  ? "Les bocaux ouverts ou casseroles exposent les lipides et molécules actives à l'oxygène ambiant, accélérant le rancissement et la déperdition aromatique."
                  : lang === 'de'
                  ? "Offene Gläser oder Töpfe setzen Lipide und empfindliche Moleküle dem Luftsauerstoff aus, was Ranzigkeit und Aromaverlust beschleunigt."
                  : "Open jars or pots expose lipids and active molecules to ambient oxygen, accelerating rancidity and aromatic loss."}
              </p>
            </div>
          </div>

          {/* Carte blanche finale, 3 colonnes à coches */}
          <div className="bg-white p-8 md:p-10 rounded-3xl border border-[#3E4A3D]/10 shadow-md">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="space-y-2.5">
                <div className="flex items-center gap-2 text-botanik-green font-bold text-base">
                  <div className="w-6 h-6 rounded-full bg-[#3E4A3D]/10 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 text-[#3E4A3D]" />
                  </div>
                  <span>{lang === 'fr' ? "Contre le Gaspillage" : lang === 'de' ? "Gegen Verschwendung" : "Zero Waste"}</span>
                </div>
                <p className="text-xs sm:text-sm text-[#3E4A3D]/75 leading-relaxed">
                  {lang === 'fr'
                    ? "Ne jetez plus de matière végétale mal extraite. Chaque gramme de plante libère son profil complet sous conditions adaptées."
                    : lang === 'de'
                    ? "Werfen Sie keine unvollständig extrahierten Kräuter mehr weg. Jedes Gramm gibt sein volles Profil unter optimalen Bedingungen frei."
                    : "Stop discarding poorly extracted botanicals. Every gram releases its complete profile under tailored conditions."}
                </p>
              </div>

              <div className="space-y-2.5">
                <div className="flex items-center gap-2 text-botanik-green font-bold text-base">
                  <div className="w-6 h-6 rounded-full bg-[#3E4A3D]/10 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 text-[#3E4A3D]" />
                  </div>
                  <span>{lang === 'fr' ? "Pour l'Autonomie Botanique" : lang === 'de' ? "Für botanische Autonomie" : "For Botanical Autonomy"}</span>
                </div>
                <p className="text-xs sm:text-sm text-[#3E4A3D]/75 leading-relaxed">
                  {lang === 'fr'
                    ? "Reprenez le contrôle complet sur vos préparations. Vous choisissez la plante, le solvant noble et la concentration exacte."
                    : lang === 'de'
                    ? "Übernehmen Sie die volle Kontrolle über Ihre Zubereitungen. Sie wählen Pflanze, Lösungsmittel und exakte Konzentration."
                    : "Reclaim complete control over your preparations. You choose the botanical, the clean solvent, and the exact concentration."}
                </p>
              </div>

              <div className="space-y-2.5">
                <div className="flex items-center gap-2 text-botanik-green font-bold text-base">
                  <div className="w-6 h-6 rounded-full bg-[#3E4A3D]/10 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 text-[#3E4A3D]" />
                  </div>
                  <span>{lang === 'fr' ? "Par la Précision" : lang === 'de' ? "Durch Präzision" : "By Precision"}</span>
                </div>
                <p className="text-xs sm:text-sm text-[#3E4A3D]/75 leading-relaxed">
                  {lang === 'fr'
                    ? "Chaque extraction devient un protocole documenté, reproductible à volonté sans incertitude ni risque de brûler vos actifs."
                    : lang === 'de'
                    ? "Jede Extraktion wird zu einem dokumentierten, jederzeit reproduzierbaren Protokoll ohne Risiko, Wirkstoffe zu verbrennen."
                    : "Every extraction becomes a documented, repeatable protocol without guesswork or scorching delicate actives."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. COMPARISON TABLE: SCIENCE VS TRADITION */}
      <section className="py-20 md:py-28 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-xs font-black uppercase tracking-[0.25em] text-[#C8AB8A] mb-3 block">
              {lang === 'fr' ? "Rigueur Comparée" : lang === 'de' ? "Vergleichsrigorosität" : "Comparative Precision"}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#3E4A3D] mb-4">
              {lang === 'fr' 
                ? "Infusion Végétale Régulée : BloomLab vs Méthodes Traditionnelles" 
                : lang === 'de' 
                ? "Kontrollierte Pflanzenextraktion: BloomLab vs. traditionelle Methoden" 
                : "Regulated Herbal Extraction: BloomLab vs. Traditional Methods"}
            </h2>
            <p className="text-base text-[#3E4A3D]/70 max-w-2xl mx-auto">
              {lang === 'fr'
                ? "Comparaison indicative des paramètres physiques d'extraction pour vos infusions végétales, macérations huileuses, macérâts glycérinés et décoctions."
                : lang === 'de'
                ? "Orientierender Vergleich der physikalischen Extraktionsparameter für Kräuteraufgüsse, Ölmazerate, Glycerinextrakte und Dekokte."
                : "Indicative comparison of physical parameters governing herbal infusions, oil macerates, glycerin extracts, and decoctions."}
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse bg-white rounded-3xl overflow-hidden shadow-xs border border-[#3E4A3D]/10">
              <thead>
                <tr className="bg-[#3E4A3D] text-white text-xs sm:text-sm">
                  <th className="p-5 font-bold">{lang === 'fr' ? "Critère d'Extraction" : lang === 'de' ? "Extraktionskriterium" : "Extraction Criterion"}</th>
                  <th className="p-5 font-bold text-center text-white/70">{lang === 'fr' ? "Casserole / Bain-Marie / Mixeur" : lang === 'de' ? "Kochtopf / Wasserbad / Mixer" : "Saucepan / Double Boiler / Blender"}</th>
                  <th className="p-5 font-bold text-center text-[#C8AB8A]">{lang === 'fr' ? "BloomLab® Officiel" : lang === 'de' ? "Offizielles BloomLab®" : "Official BloomLab®"}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                <tr>
                  <td className="p-5 font-semibold text-[#3E4A3D]">{lang === 'fr' ? "Régulation de la température" : lang === 'de' ? "Temperaturregelung" : "Temperature regulation"}</td>
                  <td className="p-5 text-center text-rose-700 font-medium">{lang === 'fr' ? "± 5°C à 15°C (pics incontrôlés, actifs brûlés)" : lang === 'de' ? "± 5°C bis 15°C (unkontrollierte Spitzen)" : "± 5°C to 15°C (uncontrolled spikes)"}</td>
                  <td className="p-5 text-center font-bold text-emerald-700 bg-emerald-50/50">{lang === 'fr' ? "± 0,5°C nominale fabricant (chambre fermée, limitation de l'évaporation)" : lang === 'de' ? "± 0,5°C Hersteller-Nennwert (geschlossene Kammer)" : "± 0.5°C nominal mfr. spec (closed chamber)"}</td>
                </tr>
                <tr>
                  <td className="p-5 font-semibold text-[#3E4A3D]">{lang === 'fr' ? "Préservation des plantes & arômes" : lang === 'de' ? "Schutz von Pflanzen & Aromen" : "Herb & aroma preservation"}</td>
                  <td className="p-5 text-center text-rose-700 font-medium">{lang === 'fr' ? "Lames de mixeur qui broient (chlorophylle amère) ou dégradation > 80°C" : lang === 'de' ? "Mixmesser zerkleinern (bitteres Chlorophyll) oder Abbau > 80°C" : "Blender blades shred herbs (bitter chlorophyll) or degrade > 80°C"}</td>
                  <td className="p-5 text-center font-bold text-emerald-700 bg-emerald-50/50">{lang === 'fr' ? "Brassage doux sans broyer la plante — Totum intact" : lang === 'de' ? "Sanftes Rühren ohne Zerkleinern — Totum intakt" : "Gentle stirring without shredding — intact Totum"}</td>
                </tr>
                <tr>
                  <td className="p-5 font-semibold text-[#3E4A3D]">{lang === 'fr' ? "Matériau en contact avec les solvants" : lang === 'de' ? "Material im Kontakt mit Lösungsmitteln" : "Solvent-contact material"}</td>
                  <td className="p-5 text-center text-slate-500">{lang === 'fr' ? "Revêtements antiadhésifs chimiques / Aluminium / Plastique" : lang === 'de' ? "Chemische Beschichtungen / Aluminium / Kunststoff" : "Chemical non-stick coatings / Aluminum / Plastic"}</td>
                  <td className="p-5 text-center font-bold text-emerald-700 bg-emerald-50/50">{lang === 'fr' ? "Cuve 100 % Inox 304 sans revêtement chimique" : lang === 'de' ? "100 % Edelstahl 304 ohne chemische Beschichtung" : "100% 304 Steel tank with zero chemical coating"}</td>
                </tr>
                <tr>
                  <td className="p-5 font-semibold text-[#3E4A3D]">{lang === 'fr' ? "Extraction cinétique vortex" : lang === 'de' ? "Kinetische Vortex-Extraktion" : "Kinetic vortex extraction"}</td>
                  <td className="p-5 text-center text-slate-500">{lang === 'fr' ? "Néant (stagnation passive ou émulsion forcée)" : lang === 'de' ? "Keine (passive Stagnation)" : "None (passive stagnation or harsh blending)"}</td>
                  <td className="p-5 text-center font-bold text-emerald-700 bg-emerald-50/50">{lang === 'fr' ? "Vortex laminaire continu sans écraser les fibres" : lang === 'de' ? "Kontinuierlicher laminarer Vortex" : "Continuous laminar vortex"}</td>
                </tr>
                <tr>
                  <td className="p-5 font-semibold text-[#3E4A3D]">{lang === 'fr' ? "Temps d'obtention d'un macérât huileux" : lang === 'de' ? "Dauer für einen Ölauszug" : "Oil maceration duration"}</td>
                  <td className="p-5 text-center text-slate-500">{lang === 'fr' ? "6 semaines au soleil (risque d'oxydation et de rancissement)" : lang === 'de' ? "6 Wochen in der Sonne (Oxidationsrisiko)" : "6 weeks in sunlight (rancidity & oxidation risk)"}</td>
                  <td className="p-5 text-center font-bold text-emerald-700 bg-emerald-50/50">{lang === 'fr' ? "2h à 4h à l'abri de la lumière, limite l'oxydation" : lang === 'de' ? "2 bis 4 Std. lichtgeschützt, reduziert Oxidation" : "2h to 4h protected from light, limits oxidation"}</td>
                </tr>
                <tr>
                  <td className="p-5 font-semibold text-[#3E4A3D]">{lang === 'fr' ? "Garanties" : lang === 'de' ? "Garantien" : "Warranties"}</td>
                  <td className="p-5 text-center text-slate-500">{lang === 'fr' ? "Variable" : lang === 'de' ? "Variabel" : "Variable"}</td>
                  <td className="p-5 text-center font-bold text-emerald-700 bg-emerald-50/50">{lang === 'fr' ? "2 ans légale UE + 1 an commerciale" : lang === 'de' ? "2 Jahre gesetzl. (EU) + 1 Jahr Garantie" : "2-Year EU Legal + 1-Year Commercial"}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 4. BRAND HERITAGE & ETHNOBOTANY */}
<section className="heritage-section py-20 md:py-28 bg-[#FAF7F2] border-t border-[#3E4A3D]/5 relative overflow-hidden">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
    <div className="text-center max-w-3xl mx-auto mb-12">
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#A8B8A0]/10 text-[#A8B8A0] text-xs font-bold uppercase tracking-widest mb-4">
        <Compass className="w-3.5 h-3.5 text-[#C8AB8A]" />
        <span>{lang === 'fr' ? "Ethnobotanique & Pharmacopée Ancestrale" : lang === 'de' ? "Ethnobotanik & traditionelle Pharmakopöe" : "Ethnobotany & Ancestral Pharmacopoeia"}</span>
      </div>
      <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-[#3E4A3D] mb-4 tracking-tight">
        {lang === 'fr' ? "L'ingénierie moderne au service des textes fondateurs" : lang === 'de' ? "Moderne Ingenieurskunst im Dienst traditioneller Kräuterkunst" : "Modern engineering at the service of foundational botanical texts"}
      </h2>
    </div>

    <div className="bg-white rounded-3xl p-8 sm:p-12 md:p-14 border border-[#E7DFD3] shadow-xl relative overflow-hidden">
      <div className="absolute top-6 right-8 text-[#C8AB8A]/15 select-none pointer-events-none text-8xl">“</div>
      
      <div className="max-w-none text-[#3E4A3D]/80 space-y-6 text-base sm:text-lg leading-relaxed font-light">
        <p className="first-letter:text-5xl first-letter:font-bold first-letter:text-[#A8B8A0] first-letter:mr-3 first-letter:float-left">
          {lang === 'fr' ? (
            <>La BloomLab n'est pas une invention ex nihilo. Elle est la réponse technologique aux limites des textes fondateurs. Dans l'Ayurveda, la méthode du <em>Taila Paka</em> (cuisson lente des huiles végétales) exigeait un contrôle visuel et tactile épuisant pour éviter que les plantes ne carbonisent. Dans la pharmacopée chinoise du <em>Shennong Ben Cao Jing</em>, on savait déjà que certaines racines exigeaient des décoctions longues, tandis que les fleurs nécessitaient des infusions flash.</>
          ) : lang === 'de' ? (
            <>BloomLab entstand nicht aus dem Nichts, sondern als technologische Antwort auf jahrtausendealte Kräuterkunst. Im Ayurveda verlangte die Methode des <em>Taila Paka</em> (langsames Einkochen pflanzlicher Öle) höchste Wachsamkeit, um ein Verbrennen zu verhindern. Auch das chinesische <em>Shennong Ben Cao Jing</em> wusste bereits, dass harte Wurzeln lange Dekokte und zarte Blüten kurze Auszüge erfordern.</>
          ) : (
            <>BloomLab was not invented in a vacuum—it is the technological answer to classical botanical treatises. In Ayurveda, the <em>Taila Paka</em> method required constant manual supervision so herbs would never scorch. In Chinese tradition (<em>Shennong Ben Cao Jing</em>), practitioners knew dense roots required sustained decoctions while delicate blossoms demanded gentle infusions.</>
          )}
        </p>
        <p>
          {lang === 'fr' ? (
            <>Le drame de l'herboristerie occidentale moderne a été de tout réduire à l'eau bouillante, ignorant la <strong>polarité des solvants</strong> et la <strong>thermolabilité des composés fragiles</strong>. La BloomLab rapproche la sagesse empirique de la rigueur moderne via la <strong>Double Extraction Séquentielle A/B</strong> (hydrophile puis lipophile) avec une régulation annoncée à ±0,5°C à domicile.</>
          ) : lang === 'de' ? (
            <>Die moderne westliche Praxis reduzierte alles oft auf kochendes Wasser und ignorierte die <strong>Polarität der Lösungsmittel</strong> sowie die <strong>Hitzeempfindlichkeit empfindlicher Stoffe</strong>. BloomLab verbindet traditionelles Erfahrungswissen mit moderner Technik und ermöglicht die <strong>sequenzielle Doppelextraktion A/B</strong> (hydrophil und lipophil) mit geregelter Temperatur (Hersteller-Nennwert ±0,5°C).</>
          ) : (
            <>Modern domestic herbalism often reduced everything to boiling water, overlooking <strong>solvent polarity</strong> and <strong>heat sensitivity</strong>. BloomLab bridges ancestral botanical wisdom with modern thermal control, enabling <strong>Sequential Dual Extraction A/B</strong> (hydrophilic then lipophilic) with a nominal ±0.5°C regulation rating at home.</>
          )}
        </p>
      </div>

      <div className="mt-8 pt-8 border-t border-[#E7DFD3] flex items-center gap-4 bg-[#FAF8F5] -mx-8 -mb-8 sm:-mx-12 sm:-mb-12 md:-mx-14 md:-mb-14 p-6 sm:p-8 rounded-b-3xl">
        <div className="w-12 h-12 rounded-2xl bg-[#0F261E] text-white flex items-center justify-center shrink-0 shadow-md">
          <Activity className="w-6 h-6 text-[#E8772E]" />
        </div>
        <p className="text-sm sm:text-base italic text-[#1E2E25] font-medium leading-snug">
          {lang === 'fr'
            ? "« Nous n'avons pas réinventé la plante. Nous avons domestiqué la cinétique d'extraction pour que le Totum reste intact dans vos préparations. »"
            : lang === 'de'
            ? "„Wir haben die Pflanze nicht neu erfunden. Wir haben die Extraktionskinetik gebändigt, damit das volle pflanzliche Totum in Ihren Zubereitungen erhalten bleibt.“"
            : "“We did not reinvent the plant. We mastered extraction kinetics so the full-spectrum Totum stays intact in every preparation.”"}
        </p>
      </div>
    </div>
  </div>
</section>

      {/* 5. THE 3 DOMAINS OF APPLICATION */}
      <section id="niveaux" className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-black uppercase tracking-[0.25em] text-[#C8AB8A] mb-3 block">
              {lang === 'fr' ? "Applications Pratiques" : lang === 'de' ? "Praktische Anwendungen" : "Practical Applications"}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#3E4A3D] mb-4">
              {lang === 'fr' 
                ? "Préservez le Totum Végétal : Macération Huileuse, Glycériné, Décoction & Infusion" 
                : lang === 'de' 
                ? "Das pflanzliche Totum bewahren: Ölauszug, Glycerinextrakt, Dekokt & Aufguss" 
                : "Preserve the Plant Totum: Oil Maceration, Glycerin Extract, Decoction & Infusion"}
            </h2>
            <p className="text-base text-[#3E4A3D]/70">
              {lang === 'fr'
                ? "Un seul instrument polyvalent pour vos préparations botaniques maison, vos plantes adaptogènes, vos soins cosmétiques et vos huiles culinaires d'exception."
                : lang === 'de'
                ? "Ein einziges vielseitiges Gerät für Ihre pflanzlichen Hausrezepturen, Adaptogene, Naturkosmetik und aromatischen Küchenöle."
                : "One versatile instrument for home botanical preparations, adaptogenic infusions, natural skincare, and gourmet culinary oils."}
            </p>
          </div>

          <div className="space-y-12">
            {/* Niveau 1: Cosmétique Botanique Maison (Pilier N°1) */}
            <div className="grid xl:grid-cols-[400px_minmax(0,1fr)] gap-10 items-center bg-[#FAF7F2] rounded-3xl p-8 md:p-12 border border-[#3E4A3D]/5 shadow-xs">
              <div 
                className="relative min-h-[360px] sm:min-h-[440px] h-[400px] sm:h-[460px] rounded-2xl overflow-hidden bg-slate-200 cursor-zoom-in group order-2 xl:order-1"
                onClick={() => setFullscreenImage(bloomSoinsImg)}
              >
                <img 
                  src={bloomSoinsImg} 
                  alt="Cosmétique Botanique Maison — Sérums, Huiles et Baumes" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <Maximize2 className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="order-1 xl:order-2">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-[#C8AB8A]/10 rounded-2xl flex items-center justify-center text-[#C8AB8A]">
                    <FlaskConical className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#C8AB8A] block">
                      {lang === 'fr' ? "Pilier 1 • Laboratoire Cosmétique Maison" : lang === 'de' ? "Säule 1 • Naturkosmetik-Labor Zuhause" : "Pillar 1 • Home Cosmetic Lab"}
                    </span>
                    <h3 className="text-xl md:text-2xl font-bold text-[#3E4A3D]">
                      {lang === 'fr' ? "Cosmétique Botanique Maison & Macérâts de Soin" : lang === 'de' ? "Naturkosmetik DIY & Pflegemazerate" : "Homemade Botanical Cosmetics & Care Macerates"}
                    </h3>
                  </div>
                </div>
                <p className="text-base text-[#3E4A3D]/75 mb-6 leading-relaxed italic">
                  {t.levels?.lvl2?.quote || "Créez vos sérums, baumes et huiles de soin purs sans conservateurs ni additifs pétrochimiques."}
                </p>
                <p className="text-sm text-[#3E4A3D]/70 mb-6 leading-relaxed">
                  {t.levels?.lvl2?.description || "Macérâts de calendula, de pâquerette ou de millepertuis préparés en 2 heures avec une fraîcheur absolue."}
                </p>
                <button 
                  onClick={() => onNavigate('cosmetiques')} 
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#3E4A3D] hover:bg-[#2D372C] text-white rounded-xl text-sm font-bold transition-all cursor-pointer"
                >
                  <span>{t.levels?.lvl2?.cta || "Découvrir les cosmétiques"}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Niveau 2: Gastronomie Botanique */}
            <div className="grid xl:grid-cols-[minmax(0,1fr)_400px] gap-10 items-center bg-[#FAF7F2] rounded-3xl p-8 md:p-12 border border-[#3E4A3D]/5 shadow-xs">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-[#C8AB8A]/10 rounded-2xl flex items-center justify-center text-[#C8AB8A]">
                    <Utensils className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#C8AB8A] block">
                      {lang === 'fr' ? "Pilier 2 • Gastronomie Botanique" : lang === 'de' ? "Säule 2 • Botanische Küche" : "Pillar 2 • Botanical Gastronomy"}
                    </span>
                    <h3 className="text-xl md:text-2xl font-bold text-[#3E4A3D]">{t.levels?.lvl1?.title || "Gastronomie & Huiles Vivantes"}</h3>
                  </div>
                </div>
                <p className="text-base text-[#3E4A3D]/75 mb-6 leading-relaxed italic">
                  {t.levels?.lvl1?.quote || "Transformez vos huiles d'olive et beurres en concentrés aromatiques et nutritifs."}
                </p>
                <p className="text-sm text-[#3E4A3D]/70 mb-6 leading-relaxed">
                  {t.levels?.lvl1?.description || "Extraction d'herbes aromatiques fraîches ou séchées sans goût de brûlé ni amertume thermique."}
                </p>
                <button 
                  onClick={() => onNavigate('culinaire')} 
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#3E4A3D] hover:bg-[#2D372C] text-white rounded-xl text-sm font-bold transition-all cursor-pointer"
                >
                  <span>{t.levels?.lvl1?.cta || "Voir les recettes culinaires"}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              <div 
                className="relative min-h-[360px] sm:min-h-[440px] h-[400px] sm:h-[460px] rounded-2xl overflow-hidden bg-slate-200 cursor-zoom-in group"
                onClick={() => setFullscreenImage("https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=800")}
              >
                <img 
                  src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=800" 
                  alt="Application Culinaire" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <Maximize2 className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            {/* Niveau 3: Phytothérapie de Terrain */}
            <div className="grid xl:grid-cols-[minmax(0,1fr)_400px] gap-10 items-center bg-[#FAF7F2] rounded-3xl p-8 md:p-12 border border-[#C8AB8A]/20 shadow-sm">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-[#C8AB8A]/10 rounded-2xl flex items-center justify-center text-[#C8AB8A]">
                    <Activity className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#C8AB8A] block">
                      {lang === 'fr' ? "Niveau 3" : lang === 'de' ? "Stufe 3" : "Level 3"}
                    </span>
                    <h3 className="text-xl md:text-2xl font-bold text-[#3E4A3D]">
                      {lang === 'fr'
                        ? "Herboristerie Systémique & Reset"
                        : lang === 'de'
                        ? "Systemische Pflanzenkunde & Reset"
                        : "Systemic Herbalism & Terrain Reset"}
                    </h3>
                  </div>
                </div>
                <p className="text-base text-[#3E4A3D]/75 mb-6 leading-relaxed italic">
                  {lang === 'fr'
                    ? "« Rééquilibrez le terrain en profondeur grâce à la précision de l'extraction végétale à domicile. »"
                    : lang === 'de'
                    ? "„Bringen Sie Ihr biologisches Terrain mit präziser häuslicher Pflanzenextraktion wieder ins Gleichgewicht.“"
                    : "“Rebalance your biological terrain from within through precision botanical extraction at home.”"}
                </p>
                <p className="text-sm text-[#3E4A3D]/70 mb-6 leading-relaxed">
                  {lang === 'fr' ? (
                    <>Accédez aux protocoles de <strong>Reset Homéostatique (84 jours)</strong>. Accompagnez vos terrains prioritaires : sphère digestive, axe de réponse au stress ou vitalité métabolique avec des extraits concentrés et biodisponibles.</>
                  ) : lang === 'de' ? (
                    <>Entdecken Sie unsere <strong>84-Tage-Protokolle zum homöostatischen Reset</strong>. Unterstützen Sie gezielt Verdauung, Stressachse und Stoffwechselbalance mit bioverfügbaren Vollspektrum-Extrakten.</>
                  ) : (
                    <>Access structured <strong>84-day Homeostatic Reset protocols</strong> targeting digestive balance, stress-axis resilience, and metabolic vitality with bioavailable full-spectrum extracts.</>
                  )}
                </p>
                <button 
                  onClick={() => onNavigate('library')} 
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#3E4A3D] hover:bg-[#2D372C] text-white rounded-xl text-sm font-bold transition-all cursor-pointer"
                >
                  <span>
                    {lang === 'fr'
                      ? "Explorer les Protocoles & Recettes"
                      : lang === 'de'
                      ? "Protokolle & Rezepte entdecken"
                      : "Explore Protocols & Recipes"}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div 
                className="relative min-h-[360px] sm:min-h-[440px] h-[400px] sm:h-[460px] rounded-2xl overflow-hidden bg-slate-200 cursor-zoom-in group"
                onClick={() => setFullscreenImage(fourMmImg)}
              >
                <img 
                  src={fourMmImg} 
                  alt="Herboristerie Systémique" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <Maximize2 className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5.5 BLOC RENTABILITÉ & MODE D'EMPLOI VISUEL */}
      <section className="py-16 md:py-24 bg-[#FAF7F2] border-t border-[#E7DFD3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          {/* Bloc Rentabilité */}
          <div className="space-y-10">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <span className="text-xs font-black uppercase tracking-[0.25em] text-[#C8AB8A] block">
                {lang === 'fr' ? "Rentabilité" : lang === 'de' ? "Wirtschaftlichkeit" : "Value & ROI"}
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#3E4A3D]">
                {lang === 'fr' ? "Un investissement rapidement rentabilisé" : lang === 'de' ? "Eine Investition, die sich schnell bezahlt macht" : "An investment that quickly pays for itself"}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-7 rounded-3xl border border-[#E7DFD3] shadow-xs space-y-2.5">
                <div className="text-xs font-black uppercase tracking-wider text-[#E8772E]">
                  {lang === 'fr' ? "Cosmétique maison" : lang === 'de' ? "Naturkosmetik DIY" : "Homemade skincare"}
                </div>
                <p className="text-sm text-[#3E4A3D]/85 leading-relaxed">
                  {lang === 'fr'
                    ? "Un sérum visage naturel coûte en moyenne 45 à 70 € pour 30 ml en boutique. Fait maison avec BloomLab® : moins de 4 € le flacon."
                    : lang === 'de'
                    ? "Ein natürliches Gesichtsserum kostet im Handel 45 bis 70 € für 30 ml. Hausgemacht mit BloomLab®: unter 4 € pro Fläschchen."
                    : "A natural face serum costs €45–€70 per 30ml retail. Homemade with BloomLab®: under €4 per bottle."}
                </p>
              </div>
              <div className="bg-white p-7 rounded-3xl border border-[#E7DFD3] shadow-xs space-y-2.5">
                <div className="text-xs font-black uppercase tracking-wider text-[#E8772E]">
                  {lang === 'fr' ? "Herboristerie & soins" : lang === 'de' ? "Kräuterkunde & Pflege" : "Herbalism & care"}
                </div>
                <p className="text-sm text-[#3E4A3D]/85 leading-relaxed">
                  {lang === 'fr'
                    ? "Un flacon de macérât huileux concentré (calendula, millepertuis, arnica) coûte 18 à 25 €. Une seule extraction vous donne l'équivalent de 10 flacons."
                    : lang === 'de'
                    ? "Eine Flasche konzentriertes Ölmazerat (Calendula, Johanniskraut, Arnika) kostet 18 bis 25 €. Eine einzige Extraktion ergibt das Äquivalent von 10 Fläschchen."
                    : "A bottle of concentrated oil macerate (calendula, St. John's wort, arnica) costs €18–€25. A single extraction yields the equivalent of 10 bottles."}
                </p>
              </div>
              <div className="bg-[#3E4A3D] text-white p-7 rounded-3xl shadow-md flex flex-col justify-center space-y-2">
                <div className="text-xs font-black uppercase tracking-wider text-[#C8AB8A]">
                  {lang === 'fr' ? "Verdict" : lang === 'de' ? "Fazit" : "Bottom line"}
                </div>
                <p className="text-lg font-black leading-snug text-white">
                  {lang === 'fr'
                    ? "Rentabilisée dès vos 4 premières préparations maison."
                    : lang === 'de'
                    ? "Bereits ab Ihren ersten 4 hausgemachten Zubereitungen amortisiert."
                    : "Pays for itself within your first 4 homemade batches."}
                </p>
              </div>
            </div>
          </div>

          {/* Mode d'emploi visuel (5 étapes simples) */}
          <div className="space-y-10">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <span className="text-xs font-black uppercase tracking-[0.25em] text-[#C8AB8A] block">
                {lang === 'fr' ? "Mode d'emploi visuel" : lang === 'de' ? "Schritt-für-Schritt-Anleitung" : "Visual Guide"}
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#3E4A3D]">
                {lang === 'fr' ? "Comment réussir votre première extraction en 5 gestes ?" : lang === 'de' ? "Wie gelingt Ihre erste Extraktion in 5 Schritten?" : "How to succeed on your first extraction in 5 steps?"}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
              {[
                {
                  step: "01",
                  text: lang === 'fr'
                    ? "Choisissez votre recette dans le guide digital (100 recettes fournies) ou la Bloom Academy."
                    : lang === 'de'
                    ? "Wählen Sie ein Rezept im digitalen Leitfaden (100 Rezepte) oder in der Bloom Academy."
                    : "Choose your recipe from the 100-recipe digital guide or Bloom Academy."
                },
                {
                  step: "02",
                  text: lang === 'fr'
                    ? "Placez vos plantes (sèches ou fraîches) dans le panier filtrant en inox."
                    : lang === 'de'
                    ? "Geben Sie getrocknete oder frische Pflanzen in den Edelstahl-Filterkorb."
                    : "Place dried or fresh botanicals inside the stainless mesh basket."
                },
                {
                  step: "03",
                  text: lang === 'fr'
                    ? "Ajoutez votre solvant non inflammable (eau filtrée, huile végétale vierge ou glycérine végétale — alcool chauffé suspendu)."
                    : lang === 'de'
                    ? "Fügen Sie Ihr nicht brennbares Lösungsmittel hinzu (gefiltertes Wasser, kaltgepresstes Öl oder pflanzliches Glycerin)."
                    : "Add your non-flammable solvent (filtered water, virgin carrier oil, or vegetable glycerin — heated alcohol suspended)."
                },
                {
                  step: "04",
                  text: lang === 'fr'
                    ? "Sélectionnez le programme (température & durée) : la machine s'occupe du reste en silence."
                    : lang === 'de'
                    ? "Wählen Sie Programm (Temperatur & Dauer): Das Gerät übernimmt den Rest leise."
                    : "Select program (temperature & time): the machine quietly handles the rest."
                },
                {
                  step: "05",
                  text: lang === 'fr'
                    ? "Filtrez avec le sac 90 microns fourni et versez dans votre flacon en verre opaque."
                    : lang === 'de'
                    ? "Mit dem beiliegenden 90-Mikron-Beutel filtern und in Ihre Braunglasflasche abfüllen."
                    : "Filter through the included 90-micron bag and pour into your opaque glass bottle."
                }
              ].map((s, idx) => (
                <div key={idx} className="bg-white p-6 rounded-2xl border border-[#3E4A3D]/10 shadow-xs space-y-3">
                  <div className="text-2xl font-black text-[#E8772E]">{s.step}</div>
                  <p className="text-xs sm:text-sm text-[#3E4A3D]/85 leading-relaxed font-medium">{s.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. CARACTÉRISTIQUES TECHNIQUES & CONTENU DU COFFRET */}
      <section className="py-20 md:py-28 bg-white border-t border-[#E7DFD3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-black uppercase tracking-[0.25em] text-[#C8AB8A] mb-3 block">
              {lang === 'fr' ? "Spécifications & Coffret" : lang === 'de' ? "Technische Daten & Lieferumfang" : "Specs & Box Contents"}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#3E4A3D] mb-4">
              {lang === 'fr' ? "Caractéristiques techniques & contenu du coffret" : lang === 'de' ? "Technische Daten & Lieferumfang Ihres BloomLab®" : "Technical specifications & what's in the box"}
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[#FAF7F2] p-6 rounded-2xl border border-[#3E4A3D]/10 shadow-xs flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-xl bg-[#3E4A3D]/5 flex items-center justify-center text-[#3E4A3D] mb-4">
                <Package className="w-6 h-6 text-[#C8AB8A]" />
              </div>
              <h4 className="font-bold text-[#3E4A3D] mb-1">
                {lang === 'fr' ? "Matériau de la cuve" : lang === 'de' ? "Behältermaterial" : "Chamber material"}
              </h4>
              <p className="text-xs text-[#3E4A3D]/80 leading-relaxed">
                {lang === 'fr'
                  ? "Acier inoxydable 304 qualité alimentaire (sans BPA, sans revêtement antiadhésif chimique)"
                  : lang === 'de'
                  ? "Edelstahl 304 in Lebensmittelqualität (BPA-frei, ohne Antihaftbeschichtung)"
                  : "Food-grade 304 stainless steel (BPA-free, zero chemical non-stick coating)"}
              </p>
            </div>

            <div className="bg-[#FAF7F2] p-6 rounded-2xl border border-[#3E4A3D]/10 shadow-xs flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-xl bg-[#3E4A3D]/5 flex items-center justify-center text-[#3E4A3D] mb-4">
                <Thermometer className="w-6 h-6 text-[#C8AB8A]" />
              </div>
              <h4 className="font-bold text-[#3E4A3D] mb-1">
                {lang === 'fr' ? "Plage de température" : lang === 'de' ? "Temperaturbereich" : "Temperature range"}
              </h4>
              <p className="text-xs text-[#3E4A3D]/80 leading-relaxed">
                {lang === 'fr'
                  ? "35 °C à 121 °C (régulation nominale fabricant ±0,5 °C, non certifiée par laboratoire tiers)"
                  : lang === 'de'
                  ? "35 °C bis 121 °C (Hersteller-Nennwert ±0,5 °C)"
                  : "35°C to 121°C (nominal mfr. spec ±0.5°C)"}
              </p>
            </div>

            <div className="bg-[#FAF7F2] p-6 rounded-2xl border border-[#3E4A3D]/10 shadow-xs flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-xl bg-[#3E4A3D]/5 flex items-center justify-center text-[#3E4A3D] mb-4">
                <FlaskConical className="w-6 h-6 text-[#C8AB8A]" />
              </div>
              <h4 className="font-bold text-[#3E4A3D] mb-1">
                {lang === 'fr' ? "Capacité utile" : lang === 'de' ? "Nutzvolumen" : "Working capacity"}
              </h4>
              <p className="text-xs text-[#3E4A3D]/80 leading-relaxed">
                {lang === 'fr'
                  ? "150 ml à 500 ml (parfait pour ne pas gaspiller d'huiles précieuses type jojoba ou argan)"
                  : lang === 'de'
                  ? "150 ml bis 500 ml (ideal, um kostbare Öle wie Jojoba oder Argan nicht zu verschwenden)"
                  : "150 ml to 500 ml (ideal to avoid wasting precious oils like jojoba or argan)"}
              </p>
            </div>

            <div className="bg-[#FAF7F2] p-6 rounded-2xl border border-[#3E4A3D]/10 shadow-xs flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-xl bg-[#3E4A3D]/5 flex items-center justify-center text-[#3E4A3D] mb-4">
                <ShieldCheck className="w-6 h-6 text-[#C8AB8A]" />
              </div>
              <h4 className="font-bold text-[#3E4A3D] mb-1">
                {lang === 'fr' ? "Garantie 2 ans UE + 1 an" : lang === 'de' ? "2 Jahre EU + 1 Jahr Garantie" : "2-Yr EU + 1-Yr Warranty"}
              </h4>
              <p className="text-xs text-[#3E4A3D]/80 leading-relaxed">
                {lang === 'fr'
                  ? "Cycle de rinçage rapide à l'eau chaude avec une goutte de savon doux • Panier 90 µm + 5 accessoires offerts."
                  : lang === 'de'
                  ? "Schnellspülzyklus mit warmem Wasser & einem Tropfen milder Seife • 90-µm-Korb + 5 Gratis-Zubehörteile."
                  : "Quick warm-water rinse cycle with mild soap • 90 µm basket + 5 free starter accessories."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. PRICING & FORMULAS (BLOOM COMPLET 59€ & BLOOM LAB 229€) */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-black uppercase tracking-[0.25em] text-[#C8AB8A] mb-3 block">
              {lang === 'fr' ? "Formules & Accompagnement" : lang === 'de' ? "Optionen & Begleitung" : "Packages & Guidance"}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#3E4A3D] mb-4">
              {t.pricing?.title || "Choisissez Votre Niveau d'Autonomie"}
            </h2>
            <p className="text-base text-[#3E4A3D]/70">
              {t.pricing?.subtitle || "De l'équipement autonome au protocole complet guidé."}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
            
            {/* 1. BloomLab Solo (229€ - Machine seule) */}
            <div className="bg-[#FAF7F2] rounded-3xl p-8 border border-[#3E4A3D]/10 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-[#3E4A3D]/60 block mb-2">
                  {lang === 'fr' ? "Achat Matériel Seul" : lang === 'de' ? "Einzelgerät" : "Hardware Only"}
                </span>
                <h3 className="text-2xl font-bold text-[#3E4A3D] mb-2">BloomLab® Solo</h3>
                <p className="text-xs text-[#3E4A3D]/70 mb-4 leading-relaxed">
                  {lang === 'fr'
                    ? "L'infuseur botanique de précision chez vous pour réaliser vos soins cosmétiques et culinaires en toute autonomie."
                    : lang === 'de'
                    ? "Der botanische Präzisions-Infuser für Zuhause – für unabhängige Naturkosmetik und Kräuterauszüge."
                    : "The precision botanical infuser at home for autonomous cosmetic and culinary preparations."}
                </p>
                <div className="mb-4">
                  <AmazonRatingBadge lang={lang} />
                </div>
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-4xl font-black text-[#3E4A3D]">229€</span>
                  <span className="text-sm line-through text-[#3E4A3D]/40 font-medium">289€</span>
                  <span className="text-xs bg-[#C8AB8A]/15 text-[#C8AB8A] font-bold px-2.5 py-1 rounded-full">-60€</span>
                </div>
                <ul className="space-y-3 text-xs text-[#3E4A3D]/80 mb-8">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-[#C8AB8A] shrink-0 mt-0.5" />
                    <span>{lang === 'fr' ? "Infuseur BloomLab® Inox 304 • 6 programmes (0 à 121 °C)" : lang === 'de' ? "BloomLab® 304-Edelstahl-Infuser • 6 Programme (0–121 °C)" : "BloomLab® 304 Steel Infuser • 6 programs (0–121°C)"}</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-[#C8AB8A] shrink-0 mt-0.5" />
                    <span>{lang === 'fr' ? "Panier filtrant micrométrique (90 µm)" : lang === 'de' ? "Mikrometrischer Filterkorb (90 µm)" : "Micrometric filter basket (90 µm)"}</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-[#C8AB8A] shrink-0 mt-0.5" />
                    <span>
                      {lang === 'fr'
                        ? "5 Accessoires Offerts pour bien débuter : 1 flacon pipette 100 ml en verre opaque capuchon en bambou, 1 pot crème 50 g verre opaque couvercle en bambou, 1 distributeur de sérum pour cuir chevelu, 1 sac de filtration 90 microns, 1 gant silicone anti-brûlure"
                        : lang === 'de'
                        ? "5 Gratis-Zubehörteile für den Start: 1 Pipettenflasche 100 ml aus blickdichtem Glas mit Bambusverschluss, 1 Cremetiegel 50 g aus blickdichtem Glas mit Bambusdeckel, 1 Kopfhaut-Serumspender, 1 Filterbeutel 90 Mikron, 1 Hitzeschutz-Silikonhandschuh"
                        : "5 Free Starter Accessories: 1× 100ml opaque glass dropper bottle with bamboo cap, 1× 50g opaque glass cream jar with bamboo lid, 1× scalp serum dispenser, 1× 90-micron filtration bag, 1× heat-resistant silicone glove"}
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-[#C8AB8A] shrink-0 mt-0.5" />
                    <span>
                      {lang === 'fr'
                        ? "Accès 3 mois à plus de 160 recettes (culinaire, cosmétique, plantes médicinales) + Manuel complet et 100 recettes exclusives en français"
                        : lang === 'de'
                        ? "3 Monate Zugang zu über 160 Rezepten (Kulinarik, Kosmetik, Heilpflanzen) + Vollständiges Handbuch & 100 exklusive Rezepte"
                        : "3-month access to 160+ recipes (culinary, cosmetics, medicinal plants) + Complete manual & 100 exclusive recipes"}
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-[#C8AB8A] shrink-0 mt-0.5" />
                    <span className="font-bold text-[#3E4A3D]">{lang === 'fr' ? "Garantie légale 2 ans (UE) + commerciale 1 an" : lang === 'de' ? "2 Jahre gesetzl. Gewährl. (EU) + 1 Jahr Garantie" : "2-Year EU Legal + 1-Year Commercial Warranty"}</span>
                  </li>
                </ul>
              </div>
              <button 
                onClick={() => onNavigate('product-detail', 'bloomlab')}
                className="w-full py-4 bg-[#3E4A3D] hover:bg-[#2D372C] text-white rounded-xl font-bold transition-all text-sm cursor-pointer shadow-md"
              >
                {lang === 'fr' ? "Commander BloomLab Solo (229€)" : lang === 'de' ? "BloomLab Solo bestellen (229€)" : "Order BloomLab Solo (229€)"}
              </button>
            </div>

            {/* 2. Pack Signature (289€ au lieu de 349€ - Le plus populaire) */}
            <div className="bg-[#FFF8F0] rounded-3xl p-8 border-2 border-[#C8AB8A] shadow-xl flex flex-col justify-between relative transform lg:-translate-y-2">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#C8AB8A] text-[#0F261E] px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-md">
                {lang === 'fr' ? "Le plus populaire" : lang === 'de' ? "Am beliebtesten" : "Most Popular"}
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-[#C8AB8A] block mb-2">
                  {lang === 'fr' ? "Équipement + Kit Clé en Main" : lang === 'de' ? "Gerät + Komplett-Set" : "Hardware + Complete Kit"}
                </span>
                <h3 className="text-2xl font-bold text-[#3E4A3D] mb-2">
                  {lang === 'fr' ? "Pack Signature" : lang === 'de' ? "Signature-Paket" : "Signature Pack"}
                </h3>
                <p className="text-xs text-[#3E4A3D]/70 mb-6 leading-relaxed">
                  {lang === 'fr'
                    ? "Machine BloomLab® Inox 304, Kit accessoires apothicaire, L'Herbier Complet (4 mélanges), Duo Argiles et 3 mois d'accès Premium Académie."
                    : lang === 'de'
                    ? "BloomLab® 304-Edelstahl, Apotheker-Zubehör, Vollständiges Herbarium (4 Mischungen), Tonerde-Duo und 3 Monate Premium-Akademie."
                    : "BloomLab® 304 Steel Machine, Apothecary Kit, Complete Herbarium (4 blends), Clay Duo, and 3 months Premium Academy access."}
                </p>
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-4xl font-black text-[#3E4A3D]">289€</span>
                  <span className="text-sm line-through text-[#3E4A3D]/40 font-medium">349€</span>
                  <span className="text-xs bg-[#C8AB8A]/15 text-[#C8AB8A] font-bold px-2.5 py-1 rounded-full">-60€</span>
                </div>
                <ul className="space-y-3 text-xs text-[#3E4A3D]/80 mb-8">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-[#C8AB8A] shrink-0 mt-0.5" />
                    <span className="font-bold text-[#3E4A3D]">{lang === 'fr' ? "Machine BloomLab® Inox 304 complète" : lang === 'de' ? "Vollständige BloomLab® 304-Edelstahl-Maschine" : "Complete BloomLab® 304 Steel Machine"}</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-[#C8AB8A] shrink-0 mt-0.5" />
                    <span>{lang === 'fr' ? "Kit accessoires apothicaire (flacons ambrés, entonnoir)" : lang === 'de' ? "Apotheker-Zubehörset (Braunglasflaschen, Trichter)" : "Apothecary accessory kit (amber bottles, funnel)"}</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-[#C8AB8A] shrink-0 mt-0.5" />
                    <span>{lang === 'fr' ? "L'Herbier Complet (4 mélanges) + Duo Argiles (Zéolithe-Bentonite)" : lang === 'de' ? "Vollständiges Herbarium (4 Mischungen) + Erden-Duo (Zeolith-Bentonit)" : "Complete Herbarium (4 blends) + Clay Duo (Zeolite-Bentonite)"}</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-[#C8AB8A] shrink-0 mt-0.5" />
                    <span>{lang === 'fr' ? "3 mois d'accès Premium Académie inclus" : lang === 'de' ? "3 Monate Premium-Zugang zur Akademie inklusive" : "3 months Premium Academy access included"}</span>
                  </li>
                </ul>
              </div>
              <button 
                onClick={() => onNavigate('product-detail', 'pack-signature')}
                className="w-full py-4 bg-[#3E4A3D] hover:bg-[#2D372C] text-white rounded-xl font-bold transition-all text-sm cursor-pointer shadow-lg"
              >
                {lang === 'fr' ? "Choisir le Pack Signature (289€)" : lang === 'de' ? "Signature-Paket wählen (289€)" : "Choose Signature Pack (289€)"}
              </button>
            </div>

            {/* 3. Bloom Complet (59€/mois - Sans engagement) */}
            <div className="bg-[#FAF7F2] rounded-3xl p-8 border border-[#3E4A3D]/10 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-[#3E4A3D]/60 block mb-2">
                  {lang === 'fr' ? "Abonnement Plantes & Suivi" : lang === 'de' ? "Pflanzen-Abo & Begleitung" : "Botanical Subscription"}
                </span>
                <h3 className="text-2xl font-bold text-[#3E4A3D] mb-2">
                  {lang === 'fr' ? "Bloom Complet" : lang === 'de' ? "Bloom Komplett" : "Bloom Complete"}
                </h3>
                <p className="text-xs text-[#3E4A3D]/70 mb-6 leading-relaxed">
                  {lang === 'fr'
                    ? "Abonnement mensuel de préparations et plantes sélectionnées, livrées avec guide et ressources."
                    : lang === 'de'
                    ? "Monatliche botanische Zubereitungen und Pflanzenauswahl, geliefert mit Leitfaden und Ressourcenzugang."
                    : "Monthly curated botanical preparations delivered with discovery guide and library access."}
                </p>
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-4xl font-black text-[#3E4A3D]">59€</span>
                  <span className="text-[#3E4A3D]/60 font-medium text-sm">
                    {lang === 'fr' ? "/mois" : lang === 'de' ? "/Monat" : "/month"}
                  </span>
                </div>
                <ul className="space-y-3 text-xs text-[#3E4A3D]/80 mb-8">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-[#C8AB8A] shrink-0 mt-0.5" />
                    <span>{lang === 'fr' ? "Préparations & plantes bio livrées chaque mois" : lang === 'de' ? "Monatliche Lieferung geprüfter Pflanzenzubereitungen" : "Certified botanical preparations delivered monthly"}</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-[#C8AB8A] shrink-0 mt-0.5" />
                    <span>{lang === 'fr' ? "Fiches protocoles A/B et précautions détaillées" : lang === 'de' ? "A/B-Protokolle und klare Anwendungshinweise" : "A/B protocol sheets & clear usage precautions"}</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-[#C8AB8A] shrink-0 mt-0.5" />
                    <span>{lang === 'fr' ? "Orientation pédagogique avec ALMA" : lang === 'de' ? "Orientierung im Bloom-Universum mit ALMA" : "Educational orientation with ALMA"}</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-[#C8AB8A] shrink-0 mt-0.5" />
                    <span>{lang === 'fr' ? "Sans engagement, pause ou arrêt en 1 clic" : lang === 'de' ? "Ohne Bindung, mit 1 Klick pausier- oder kündbar" : "No commitment, pause or cancel in 1 click"}</span>
                  </li>
                </ul>
              </div>
              <button 
                onClick={() => onNavigate('abonnement')}
                className="w-full py-4 bg-[#3E4A3D] hover:bg-[#2D372C] text-white rounded-xl font-bold transition-all text-sm cursor-pointer shadow-md"
              >
                {lang === 'fr' ? "Découvrir Bloom Complet" : lang === 'de' ? "Bloom Komplett entdecken" : "Explore Bloom Complete"}
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* 8. FAQ SECTION (LEVÉE DES OBJECTIONS) */}
      <section className="py-20 md:py-28 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-xs font-black uppercase tracking-[0.25em] text-[#C8AB8A] mb-3 block">
              {lang === 'fr' ? "Questions Fréquentes" : lang === 'de' ? "Häufige Fragen" : "Frequently Asked Questions"}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#3E4A3D]">
              {lang === 'fr' ? "Tout ce que vous devez savoir sur BloomLab®" : lang === 'de' ? "Alles, was Sie über BloomLab® wissen müssen" : "Everything you need to know about BloomLab®"}
            </h2>
          </div>

          <div className="space-y-4">
            {faqItems.map((item, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div 
                  key={idx} 
                  className="bg-white rounded-2xl border border-[#3E4A3D]/5 overflow-hidden transition-all shadow-xs"
                >
                  <button
                    type="button"
                    onClick={() => {
                      if (!isOpen) {
                        trackFaqExpand(item.q);
                      }
                      setOpenFaqIndex(isOpen ? null : idx);
                    }}
                    className="w-full text-left p-6 flex items-center justify-between gap-4 font-bold text-[#3E4A3D] text-base sm:text-lg cursor-pointer hover:text-[#C8AB8A] transition-colors"
                  >
                    <span>{item.q}</span>
                    <span className={`w-8 h-8 rounded-full bg-[#FAF7F2] flex items-center justify-center shrink-0 transition-transform ${isOpen ? 'rotate-180 text-[#C8AB8A]' : 'text-[#3E4A3D]/60'}`}>
                      ↓
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 text-sm sm:text-base text-[#3E4A3D]/75 leading-relaxed pt-1 border-t border-slate-50">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 9. FINAL CTA SECTION */}
      <section className="py-20 md:py-28 bg-[#3E4A3D] text-white text-center relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-6 leading-tight">
            {t.final_cta?.title || "Reprenez le Contrôle de Votre Pharmacie Intérieure"}
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-white/75 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
            {t.final_cta?.description || "Votre corps n'est pas cassé. Il est verrouillé. Donnez-lui simplement les bons outils et la juste extraction."}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => onNavigate('product-detail', 'bloomlab')}
              className="w-full sm:w-auto px-10 py-5 bg-[#3E4A3D] hover:bg-[#2D372C] text-white rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-3 cursor-pointer shadow-xl"
            >
              <span>{t.final_cta?.button || "Commander mon BloomLab®"}</span>
              <ChevronRight className="w-5 h-5" />
            </button>
            <button 
              onClick={() => onNavigate('guide')}
              className="w-full sm:w-auto px-10 py-5 bg-white/10 hover:bg-white/15 text-white rounded-2xl font-semibold text-lg transition-all border border-white/20 cursor-pointer"
            >
              {t.final_cta?.guide || "Consulter le Guide Botanique"}
            </button>
            <a
              href="/guide-solvants/"
              onClick={(e) => {
                if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                  e.preventDefault();
                  onNavigate('guide-solvants');
                }
              }}
              className="w-full sm:w-auto px-8 py-5 bg-white/10 hover:bg-white/15 text-white rounded-2xl font-semibold text-base transition-all border border-white/20 inline-flex items-center justify-center"
            >
              {lang === 'fr' ? "Guide des Solvants" : lang === 'de' ? "Lösungsmittel-Guide" : "Solvents Guide"}
            </a>
            <a
              href="/boutique/"
              onClick={(e) => {
                if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                  e.preventDefault();
                  onNavigate('boutique');
                }
              }}
              className="w-full sm:w-auto px-8 py-5 bg-transparent hover:bg-white/10 text-white/90 rounded-2xl font-semibold text-base transition-all border border-white/20 inline-flex items-center justify-center"
            >
              {lang === 'fr' ? "Voir toute la Boutique Bloom by BotaniK" : lang === 'de' ? "Zum Bloom by BotaniK Shop" : "Browse Bloom by BotaniK Shop"}
            </a>
            <a
              href="/"
              onClick={(e) => {
                if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                  e.preventDefault();
                  onNavigate('home');
                }
              }}
              className="w-full sm:w-auto px-6 py-5 bg-transparent hover:bg-white/10 text-white/80 rounded-2xl font-medium text-sm transition-all border border-white/15 inline-flex items-center justify-center"
            >
              {lang === 'fr' ? "Accueil Bloom by BotaniK" : lang === 'de' ? "Bloom by BotaniK Startseite" : "Bloom by BotaniK Home"}
            </a>
          </div>
        </div>
      </section>

      {/* 10. SECTION "L'INGÉNIERIE AU SERVICE DU VIVANT." (FOND VERT SOMBRE ET TEXTE BLANC PARFAITEMENT LISIBLE) */}
      <section 
        className="py-24 bg-[#3E4A3D] text-white overflow-hidden relative"
        style={{ backgroundColor: '#3E4A3D', color: '#ffffff' }}
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#C8AB8A]/10 rounded-full blur-[120px] -mr-48 -mt-48 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 
            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 leading-tight italic text-white"
            style={{ color: '#ffffff' }}
          >
            {t.vision?.quote || "L'Ingénierie au service du vivant."}
          </h2>
          <p 
            className="text-base sm:text-lg md:text-xl text-white/85 mb-10 leading-relaxed font-light max-w-2xl mx-auto"
            style={{ color: '#e5e7eb' }}
          >
            {t.vision?.p1 || "Nous ne créons pas de solutions miracles. Nous concevons les outils techniques et rigoureux qui permettent à vos cellules de mobiliser leurs propres mécanismes d'homéostasie."}
          </p>
          
          <div className="space-y-5 text-left inline-block max-w-2xl mx-auto">
            <div className="flex items-start gap-4">
              <div 
                className="w-8 h-8 rounded-full bg-[#C8AB8A] flex items-center justify-center shrink-0 mt-1 shadow-md"
                style={{ backgroundColor: '#C8AB8A', color: '#ffffff' }}
              >
                <Check className="w-5 h-5 text-white" />
              </div>
              <p 
                className="text-base sm:text-lg text-white/90"
                style={{ color: '#ffffff' }}
                dangerouslySetInnerHTML={{ __html: t.vision?.check1 || "<strong>Respect absolu de la synergie végétale</strong> : extraction du Totum sans solvant toxique." }}
              />
            </div>
            <div className="flex items-start gap-4">
              <div 
                className="w-8 h-8 rounded-full bg-[#C8AB8A] flex items-center justify-center shrink-0 mt-1 shadow-md"
                style={{ backgroundColor: '#C8AB8A', color: '#ffffff' }}
              >
                <Check className="w-5 h-5 text-white" />
              </div>
              <p 
                className="text-base sm:text-lg text-white/90"
                style={{ color: '#ffffff' }}
                dangerouslySetInnerHTML={{ __html: t.vision?.check2 || "<strong>Autonomie cosmétique et bien-être naturel</strong> : la maîtrise de vos préparations à domicile." }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* MENTION RÉGLEMENTAIRE DE PIED DE FICHE */}
      <section className="py-8 bg-[#0F261E] text-white/80 border-t border-white/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs sm:text-sm leading-relaxed">
            {lang === 'fr'
              ? "Dispositif domestique de préparation culinaire, cosmétique et botanique à usage personnel. Ceci n'est pas un dispositif médical. Les informations et recettes fournies ont un but éducatif et ne remplacent pas l'avis d'un professionnel de santé."
              : lang === 'de'
              ? "Haushaltsgerät zur kulinarischen, kosmetischen und botanischen Zubereitung für den persönlichen Gebrauch. Dies ist kein Medizinprodukt. Die bereitgestellten Informationen und Rezepte dienen Bildungszwecken und ersetzen keinen ärztlichen Rat."
              : "Domestic appliance for culinary, cosmetic, and botanical preparation for personal use. This is not a medical device. Information and recipes provided are for educational purposes and do not replace professional medical advice."}
          </p>
        </div>
      </section>

    </div>
  );
}