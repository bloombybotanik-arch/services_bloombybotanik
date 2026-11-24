import ExtractionKineticsChart from './components/ExtractionKineticsChart';
import AmazonSocialProof, { AmazonRatingBadge } from './components/AmazonSocialProof';
import SeoHead from './components/SeoHead';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PaymentBadges } from './components/PaymentBadges';
import { TooltipLexique } from './components/TooltipLexique';
import { GlossaryProvider } from './context/GlossaryContext';
import { 
  ShieldCheck, 
  Star, 
  ArrowRight, 
  Check, 
  FlaskConical, 
  Activity, 
  ChevronDown, 
  ChevronUp, 
  ChevronRight, 
  ChefHat, 
  Clock, 
  Thermometer, 
  Droplets, 
  Microscope, 
  Sparkles, 
  AlertTriangle, 
  Utensils, 
  Truck, 
  X, 
  BookOpen, 
  Wind, 
  FileText, 
  Layers, 
  Lock, 
  HelpCircle,
  Compass,
  ArrowUpRight,
  Package,
  Flame
} from 'lucide-react';
import { translations as globalTranslations } from './translations';

const heroImg1 = "/images/bloomlab_main_1784887530345.png";
const heroImg2 = "/images/2.png";
const heroImg3 = "/images/8.png";
const shelvesImg = "/images/modern_herbalist_shelves_1786699793560.jpg";
const herbsImg = "/assets/images/herbs_close_up_cleaned_1786616800877.jpg";
const bloomSoinsImg = "/assets/images/Bloom_Soins.jpg";
const duoArgilesImg = "/assets/images/product_duo_argiles.jpg";

interface IndexBisContentProps {
  onNavigate: (view: any, id?: string) => void;
  lang?: string;
  scrollToId?: string;
}

type UniverseType = 'culinaire' | 'cosmetique' | 'phytotherapie';

export default function IndexBisContent({ onNavigate, lang = 'fr', scrollToId }: IndexBisContentProps) {
  useEffect(() => {
    if (scrollToId) {
      const el = document.getElementById(scrollToId);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 500);
      }
    }
  }, [scrollToId]);

  const [activeUniverse, setActiveUniverse] = useState<UniverseType>('cosmetique');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItem, setCartItem] = useState({ title: "Pack Signature — BloomLab® + Herbier Complet + Duo Argiles", price: 289 });
  const heroSlides = [heroImg1, heroImg2, heroImg3];
  const extendedHeroSlides = [...heroSlides, heroImg1];
  const [heroIntroMode, setHeroIntroMode] = useState<'video' | 'carousel'>('video');
  const [heroVideoAvailable, setHeroVideoAvailable] = useState(true);
  const introVideoRef = useRef<HTMLVideoElement | null>(null);
  const [heroSlideIndex, setHeroSlideIndex] = useState(0);
  const [isHeroResetting, setIsHeroResetting] = useState(false);

  useEffect(() => {
    if (heroIntroMode !== 'video') return;
    const vid = introVideoRef.current;
    if (!vid) return;
    vid.muted = true;
    vid.defaultMuted = true;
    vid.volume = 0;
    if (vid.ended) {
      vid.currentTime = 0;
    }
    const playPromise = vid.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Si l'autoplay vidéo est bloqué par le navigateur, bascule sur le carrousel
        setHeroIntroMode('carousel');
      });
    }
  }, [heroIntroMode]);

  useEffect(() => {
    if (heroIntroMode !== 'carousel') return;
    const interval = setInterval(() => {
      setIsHeroResetting(false);
      setHeroSlideIndex((prev) => (prev >= heroSlides.length ? 1 : prev + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, [heroIntroMode]);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSent, setNewsletterSent] = useState(false);

  // Sticky bar visible UNIQUEMENT après 60% de scroll
  useEffect(() => {
    const scrollContainer = document.getElementById('main-scroll-container');
    const handleScroll = () => {
      if (scrollContainer) {
        const docHeight = scrollContainer.scrollHeight - scrollContainer.clientHeight;
        if (docHeight > 0) {
          setShowStickyBar(scrollContainer.scrollTop / docHeight >= 0.6);
        }
      } else {
        const scrollY = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (docHeight > 0) {
          setShowStickyBar(scrollY / docHeight >= 0.6);
        }
      }
    };
    const target: EventTarget = scrollContainer || window;
    target.addEventListener('scroll', handleScroll, { passive: true } as AddEventListenerOptions);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      target.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const t = globalTranslations[lang as keyof typeof globalTranslations] || globalTranslations.fr;
  const isFR = lang === 'fr';
  const isDE = lang === 'de';

  const selectPackage = (type: 'solo' | 'signature', price: number) => {
    setCartItem({
      title: type === 'solo' 
        ? (isFR ? "BloomLab® Solo — Inox 304 + Panier micrométrique + Guide 100 recettes" : isDE ? "BloomLab® Solo — Edelstahl 304 + Korb + 100-Rezepte-Leitfaden" : "BloomLab® Solo — 304 Steel + Filter Basket + 100-Recipe Guide") 
        : (isFR ? "Pack Signature — BloomLab® + Kit apothicaire + Herbier Complet + Duo Argiles + 3 mois Académie" : isDE ? "Signature-Paket — BloomLab® + Apotheker-Set + Herbarium + Tonerde-Duo + 3 Mon. Akademie" : "Signature Pack — BloomLab® + Apothecary Kit + Full Herbarium + Clay Duo + 3 Mo Academy"),
      price: price
    });
    setIsCartOpen(true);
  };

  const [newsletterError, setNewsletterError] = useState<string | null>(null);
  const [newsletterLoading, setNewsletterLoading] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const email = newsletterEmail.trim();
    if (!email) return;
    setNewsletterLoading(true);
    setNewsletterError(null);
    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error('Request failed');
      setNewsletterSent(true);
      setNewsletterEmail('');
    } catch {
      setNewsletterError(
        isFR
          ? "L'enregistrement serveur n'a pas abouti pour le moment. Contactez contact@bloombybotanik.com."
          : isDE
          ? "Die Server-Registrierung konnte derzeit nicht abgeschlossen werden. Kontakt: contact@bloombybotanik.com."
          : "Server registration could not be completed right now. Please contact contact@bloombybotanik.com."
      );
    } finally {
      setNewsletterLoading(false);
    }
  };

  const marqueeItems = isFR
    ? [
        "🇫🇷 Marque française • Conception des protocoles & kits botaniques en France",
        "Expédition sous 24/48h",
        "Garantie légale 2 ans (UE) + commerciale 1 an",
        "Paiement en 3x sans frais"
      ]
    : isDE
    ? [
        "🇫🇷 Französische Marke • Protokolle & Botanik-Kits aus Frankreich",
        "Versand in 24/48h",
        "2 J. gesetzl. Gewährleistung (EU) + 1 J. Garantie",
        "3x zinsfreie Ratenzahlung"
      ]
    : [
        "🇫🇷 French Brand • Protocols & botanical kits crafted in France",
        "24/48h Shipping",
        "2-Yr EU Legal + 1-Yr Commercial Warranty",
        "3x Fee-Free Payment"
      ];

  const homeSeoTitle = isFR
    ? "BloomLab® — Extracteur Botanique de Précision & Totum Végétal | Bloom by BotaniK"
    : isDE
    ? "BloomLab® — Botanischer Präzisionsextraktor & Pflanzen-Totum | Bloom by BotaniK"
    : "BloomLab® — Precision Botanical Extractor & Whole-Plant Totum | Bloom by BotaniK";

  const homeSeoDescription = isFR
    ? "Créez vos huiles de soin, sérums visage, baumes et huiles parfumées maison en 2h. Cuve Inox 304, contrôle thermique précis et guide de 100 recettes en français."
    : isDE
    ? "Kreieren Sie Pflegeöle, Gesichtsseren, Balsame und Duftöle in 2 Std. selbst. 304-Edelstahlbehälter, präzise Temperatursteuerung und 100-Rezepte-Leitfaden."
    : "Create homemade skincare oils, face serums, balms, and scented oils in 2h. 304 stainless steel chamber, precise thermal control, and 100-recipe guide.";

  const homeFaqItems = [
    {
      q: isFR
        ? "En quoi la BloomLab® est-elle différente d'un simple bain-marie ?"
        : isDE
        ? "Wie unterscheidet sich die BloomLab® von einem einfachen Wasserbad?"
        : "How is BloomLab® different from a simple double-boiler?",
      a: isFR
        ? "Le bain-marie traditionnel ne permet aucun réglage fin : l'eau atteint rapidement des températures fluctuantes dégradant les molécules thermosensibles. La BloomLab® intègre une sonde thermique régulée (spécification nominale fabricant ±0,5 °C, non certifiée indépendamment) combinée à un brassage cyclique doux en milieu clos."
        : isDE
        ? "Ein herkömmliches Wasserbad erlaubt keine Feinregelung: Schwankende Temperaturen schädigen hitzeempfindliche Moleküle. Die BloomLab® bietet eine Sensorsteuerung (Hersteller-Nennwert ±0,5 °C) mit sanftem zyklischem Rühren in geschlossener Kammer."
        : "A traditional double-boiler lacks fine thermal control: fluctuating heat degrades heat-sensitive compounds. BloomLab® integrates a nominal ±0.5°C temperature sensor (manufacturer rating) with gentle cyclic stirring in a closed chamber."
    },
    {
      q: isFR
        ? "Faut-il être herboriste ou chimiste pour l'utiliser ?"
        : isDE
        ? "Muss man Kräuterkundler oder Chemiker sein, um sie zu bedienen?"
        : "Do I need to be an herbalist or chemist to use it?",
      a: isFR
        ? "Absolument pas. L'appareil a été pensé pour une prise en main progressive. Vous disposez d'un guide pratique de 100 recettes et de l'Herbier en ligne qui détaillent chaque paramètre temps, température et solvant étape par étape."
        : isDE
        ? "Überhaupt nicht. Das Gerät wurde für eine einfache, schrittweise Nutzung konzipiert. Sie erhalten einen praktischen Leitfaden mit 100 Rezepten sowie unser Online-Herbarium mit genauen Zeit-, Temperatur- und Lösungsmittelangaben."
        : "Not at all. The extractor is built for progressive, intuitive use. You receive a 100-recipe practical guide and full Herbarium access detailing time, temperature, and solvent parameters step by step."
    },
    {
      q: isFR
        ? "Quels solvants puis-je utiliser en toute sécurité ?"
        : isDE
        ? "Welche Lösungsmittel kann ich sicher verwenden?"
        : "Which solvents can I use safely?",
      a: isFR
        ? "La cuve en Inox 304 de grade alimentaire fonctionne avec l'eau filtrée, les huiles végétales (jojoba, olive, amande douce, argan) et la glycérine végétale. Par mesure de sécurité, l'utilisation d'alcool chauffé dans la cuve BloomLab® est suspendue (toute macération alcoolique se réalise uniquement à froid, en bocal verre hors appareil)."
        : isDE
        ? "Der lebensmittelechte Behälter aus Edelstahl 304 eignet sich für gereinigtes Wasser, Pflanzenöle (Jojoba, Olive, Süßmandel, Argan) und pflanzliches Glycerin. Aus Sicherheitsgründen ist das Erhitzen von Alkohol im BloomLab®-Behälter ausgesetzt (alkoholische Mazerationen erfolgen ausschließlich kalt im Glas außerhalb des Geräts)."
        : "The food-grade 304 stainless steel chamber operates with purified water, botanical oils (jojoba, olive, sweet almond, argan), and vegetable glycerin. As a precaution, heated alcohol extraction inside the BloomLab® chamber is suspended (any alcohol maceration must be done cold in a glass jar outside the appliance)."
    },
    {
      q: isFR
        ? "Combien de temps dure une extraction ?"
        : isDE
        ? "Wie lange dauert eine Extraktion?"
        : "How long does an extraction take?",
      a: isFR
        ? "La durée varie entre 1h30 pour une huile infusée culinaire douce et 3h pour une extraction concentrée de racines denses, sans surveillance constante requise."
        : isDE
        ? "Die Dauer liegt zwischen 1,5 Stunden für ein mildes kulinarisches Kräuteröl und 3 Stunden für eine konzentrierte Wurzelextraktion – ganz ohne ständige Aufsicht."
        : "Extraction cycles range from 1.5 hours for gentle culinary oils to 3 hours for dense root preparations, with no constant supervision required."
    }
  ];

  const homeProductSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': 'https://bloombybotanik.com/bloomlab/#product',
    name: 'BloomLab® — Extracteur Botanique de Précision',
    image: [
      'https://bloombybotanik.com/images/1.png',
      'https://bloombybotanik.com/images/2.png',
      'https://bloombybotanik.com/images/8.png',
      'https://bloombybotanik.com/img/produit/bloomlab-face-1200x1200.jpg',
    ],
    description: homeSeoDescription,
    sku: 'BLOOMLAB-V2',
    brand: {
      '@type': 'Brand',
      name: 'Bloom by BotaniK',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.3',
      reviewCount: '7',
      bestRating: '5',
      worstRating: '1',
    },
    offers: {
      '@type': 'Offer',
      url: 'https://bloombybotanik.com/bloomlab/',
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
  };

  const homeFaqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': 'https://bloombybotanik.com/#faq',
    mainEntity: homeFaqItems.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };

  return (
    <GlossaryProvider pageKey="home">
    <SeoHead
      title={homeSeoTitle}
      description={homeSeoDescription}
      canonical="https://bloombybotanik.com/"
      lang={isDE ? 'de' : isFR ? 'fr' : 'en'}
      schemas={[homeProductSchema, homeFaqSchema]}
    />
    <div className="w-full overflow-x-clip bg-[#FAF7F2] text-slate-800 font-sans antialiased selection:bg-[#E8772E] selection:text-white">

      {/* ========================================================================= */}
      {/* BANDEAU ANNONCE DÉFILANT (Marquee Réassurance Réelle) */}
      {/* ========================================================================= */}
      <div className="w-full bg-[#1E2E25] text-[#FAF7F2] py-2 sm:py-2.5 overflow-hidden border-b border-white/10 shadow-sm relative z-30">
        <motion.div 
          className="flex w-max whitespace-nowrap items-center"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        >
          {[...marqueeItems, ...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, i) => (
            <div key={i} className="flex items-center gap-6 sm:gap-10 md:gap-12 px-4 sm:px-6 md:px-8 shrink-0">
              <span className="text-[10px] sm:text-[11px] md:text-xs font-black uppercase tracking-[0.16em] sm:tracking-[0.22em] md:tracking-[0.25em] whitespace-nowrap">
                {item}
              </span>
              <span className="opacity-30 text-base sm:text-lg font-light select-none shrink-0">•</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ========================================================================= */}
      {/* BLOC 1 : HERO (Rôle : Accueil & Promesse Fondatrice) */}
      {/* Règle : 1 seul H1, vraies photos, aucun prix ici */}
      {/* ========================================================================= */}
      <section className="relative pt-6 pb-16 md:pt-10 md:pb-24 overflow-hidden bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Galerie Visuelle Produit Réel — Vidéo d'ouverture muette avant le défilement du carrousel */}
          <div className="relative max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-xl border border-[#E7DFD3] bg-[#FAF7F2] mb-10 sm:mb-12">
            <div className="relative w-full h-[340px] sm:h-[480px] md:h-[580px] lg:h-[640px] overflow-hidden">
              {heroIntroMode === 'video' ? (
                <video
                  ref={introVideoRef}
                  src="/videos/Full_BloomLab_Serum.mp4"
                  poster={heroImg1}
                  autoPlay
                  muted
                  playsInline
                  preload="auto"
                  onLoadedMetadata={(e) => {
                    e.currentTarget.muted = true;
                    e.currentTarget.volume = 0;
                  }}
                  onVolumeChange={(e) => {
                    if (!e.currentTarget.muted || e.currentTarget.volume > 0) {
                      e.currentTarget.muted = true;
                      e.currentTarget.volume = 0;
                    }
                  }}
                  onEnded={() => {
                    setIsHeroResetting(false);
                    setHeroSlideIndex(0);
                    setHeroIntroMode('carousel');
                  }}
                  onError={() => {
                    setHeroVideoAvailable(false);
                    setHeroIntroMode('carousel');
                  }}
                  aria-label={isFR ? "Vidéo de présentation BloomLab Sérum" : isDE ? "BloomLab Serum Präsentationsvideo" : "BloomLab Serum presentation video"}
                  className="w-full h-full object-cover object-center"
                />
              ) : (
                <motion.div
                  className="flex w-full h-full"
                  animate={{ x: `-${heroSlideIndex * 100}%` }}
                  transition={isHeroResetting ? { duration: 0 } : { duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  onAnimationComplete={() => {
                    if (heroSlideIndex >= heroSlides.length) {
                      setIsHeroResetting(true);
                      setHeroSlideIndex(0);
                    }
                  }}
                >
                  {extendedHeroSlides.map((slideSrc, idx) => (
                    <div key={idx} className="w-full h-full shrink-0">
                      <img
                        src={slideSrc}
                        alt={t.seo.alt.extracteur}
                        width={1200}
                        height={880}
                        loading={idx === 0 ? "eager" : "lazy"}
                        decoding={idx === 0 ? "sync" : "async"}
                        fetchPriority={idx === 0 ? "high" : "auto"}
                        className="w-full h-full object-cover object-[center_60%] brightness-105 contrast-105 filter"
                      />
                    </div>
                  ))}
                </motion.div>
              )}
            </div>
            {/* Scrim ciblé sur le coin supérieur gauche pour la lisibilité du titre sans assombrir le visage de la femme à droite */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/65 via-black/20 via-45% to-transparent pointer-events-none" />
            
            {/* Indicateurs discrets (vidéo + slides du carrousel) & badge stock */}
            <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 z-10 flex flex-wrap items-center justify-between gap-2 sm:gap-3">
              <div className="flex items-center gap-2 bg-black/45 backdrop-blur-xs border border-white/20 px-3 py-1.5 rounded-full">
                {heroVideoAvailable && (
                  <button
                    type="button"
                    onClick={() => setHeroIntroMode('video')}
                    aria-label={isFR ? "Lire la vidéo" : isDE ? "Video abspielen" : "Play video"}
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                      heroIntroMode === 'video'
                        ? 'w-6 bg-[#E8772E]'
                        : 'w-2 bg-white/60 hover:bg-white'
                    }`}
                  />
                )}
                {heroSlides.map((_, idx) => {
                  const isActive = heroIntroMode === 'carousel' && (heroSlideIndex % heroSlides.length) === idx;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setHeroIntroMode('carousel');
                        setIsHeroResetting(false);
                        setHeroSlideIndex(idx);
                      }}
                      aria-label={`Slide ${idx + 1}`}
                      className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                        isActive
                          ? 'w-6 bg-[#E8772E]'
                          : 'w-2 bg-white/60 hover:bg-white'
                      }`}
                    />
                  );
                })}
              </div>
              <span className="bg-black/60 backdrop-blur-xs border border-white/20 text-white text-[9px] sm:text-xs font-black px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full uppercase tracking-widest shadow-md flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                {isFR ? 'En Stock · Expédition 24/48h' : isDE ? 'Auf Lager · 24/48h' : 'In Stock · 24/48h Shipping'}
              </span>
            </div>

            {/* Instruction de cadrage & zone protégée : 
                Le bloc titre est strictement ancré dans le cadran supérieur gauche (top-left) avec une largeur maximale contrainte, garantissant que le titre ne masque JAMAIS le visage de la femme situé dans le quadrant droit supérieur, ni la machine BloomLab située sur le plan de travail inférieur gauche, quelle que soit la taille de l'écran. */}
            <div className="absolute top-3 left-3 sm:top-5 sm:left-5 md:top-8 md:left-8 z-10 p-3 sm:p-4 md:p-5 rounded-2xl bg-black/50 sm:bg-black/40 backdrop-blur-[2px] border border-white/15 space-y-1.5 sm:space-y-2 max-w-[290px] sm:max-w-md md:max-w-lg lg:max-w-xl shadow-lg">
              <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
                <div className="inline-block px-2.5 py-0.5 sm:px-3 sm:py-1 bg-black/60 border border-white/25 text-white text-[8px] sm:text-[10px] font-black uppercase tracking-widest rounded-full backdrop-blur-xs">
                  {isFR
                    ? "Séquençage A/B 2026"
                    : isDE
                    ? "A/B-Sequenzierung 2026"
                    : "A/B Sequencing 2026"}
                </div>
                <span className="text-[9px] sm:text-[11px] font-black uppercase tracking-widest text-[#E8772E] drop-shadow-xs">
                  {isFR
                    ? "Extraction de précision"
                    : isDE
                    ? "Präzisionsextraktion"
                    : "Precision Extraction"}
                </span>
              </div>
              {/* Le SEUL H1 de la page d'accueil */}
              <h1 className="text-sm sm:text-lg md:text-2xl lg:text-[28px] xl:text-[32px] font-black text-[#FAF7F2] text-white !text-white leading-[1.18] tracking-tight drop-shadow-md">
                {isFR ? (
                  <>
                    BloomLab®
                    <br />
                    L'Extracteur Botanique de Précision
                    <br />
                    qui Préserve le Totum Végétal
                  </>
                ) : isDE ? (
                  "BloomLab®: Der botanische Präzisionsextraktor für das volle Pflanzen-Totum"
                ) : (
                  "BloomLab®: The Precision Botanical Extractor Preserving the Whole-Plant Totum"
                )}
              </h1>
            </div>
          </div>

          {/* Textes du Manifeste & CTAs Hero */}
          <div className="space-y-8 max-w-5xl mx-auto">
            <div className="space-y-3">
              <div className="inline-block px-3.5 py-1 bg-[#F5E6D8] text-[#B45309] border border-[#E8772E]/30 rounded-full text-xs font-black uppercase tracking-widest">
                {isFR
                  ? "L'extracteur botanique de précision en Inox 304"
                  : isDE
                  ? "Der botanische Präzisionsextraktor aus Edelstahl 304"
                  : "The precision 304 stainless botanical extractor"}
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-[#1E2E25] leading-snug tracking-tight">
                {isFR
                  ? "Vos huiles de soin, sérums et macérats botaniques maison, sans jamais brûler vos plantes."
                  : isDE
                  ? "Hausgemachte Pflegeöle, Seren und Pflanzenmazerate, ohne Ihre Kräuter zu verbrennen."
                  : "Homemade skincare oils, serums, and botanical macerates, without ever scorching your herbs."}
              </h2>
              {/* Sous-titre Plain-language (Niveau 1 immédiat) */}
              <p className="text-base sm:text-lg md:text-xl text-[#1E2E25]/90 font-medium leading-relaxed">
                {isFR 
                  ? "La BloomLab® s'appuie sur des paramètres reproductibles (température guidée, durée et agitation douce) pour extraire les plantes sans les brûler. Préparez chez vous vos huiles de soin, sérums, macérats glycérinés et infusions concentrées (tout usage d'alcool chauffé en cuve est suspendu par précaution)." 
                  : isDE 
                  ? "Die BloomLab® arbeitet mit reproduzierbaren Parametern (geführte Temperatur, Dauer und sanftes Rühren), um Pflanzen ohne Verbrennen zu extrahieren. Bereiten Sie Pflegeöle, Seren, Glycerin-Mazerate und konzentrierte Aufgüsse zu Hause zu (erhitzter Alkohol im Behälter ausgesetzt)." 
                  : "BloomLab® relies on repeatable parameters (guided temperature, duration, and gentle stirring) to extract herbs without scorching them. Prepare skincare oils, serums, glycerin macerates, and concentrated infusions at home (heated alcohol inside the chamber is suspended)."}
              </p>
            </div>

            {/* CTAs Héroïques CRO */}
            <div className="space-y-3 pt-1">
              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={() => onNavigate('product-detail', 'bloomlab')}
                  className="px-8 py-4 bg-[#E8772E] hover:bg-[#D4651F] active:bg-[#D4651F] text-white rounded-2xl font-bold text-sm sm:text-base flex items-center gap-3 transition-all shadow-lg shadow-orange-900/20 cursor-pointer"
                >
                  <span>{isFR ? "Découvrir la BloomLab® (229 €)" : isDE ? "BloomLab® entdecken (229 €)" : "Discover BloomLab® (€229)"}</span>
                  <ArrowRight className="w-4 h-4 text-white/90" />
                </button>
                <button
                  onClick={() => onNavigate('boutique-kits')}
                  className="px-8 py-4 bg-white hover:bg-[#FAF7F2] border-2 border-[#1E2E25]/20 text-[#1E2E25] rounded-2xl font-bold text-sm sm:text-base flex items-center gap-3 transition-all shadow-sm cursor-pointer"
                >
                  <span>{isFR ? "Commencer par les plantes (dès 9,90 €)" : isDE ? "Mit Pflanzen starten (ab 9,90 €)" : "Start with plants (from €9.90)"}</span>
                  <Sparkles className="w-4 h-4 text-[#E8772E]" />
                </button>
                <a
                  href="/la-marque/"
                  onClick={(e) => {
                    if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                      e.preventDefault();
                      onNavigate('la-marque');
                    }
                  }}
                  className="px-6 py-4 bg-[#FAF7F2] hover:bg-[#F3EEE6] border border-[#D8CBB7] text-[#1E2E25] rounded-2xl font-bold text-sm sm:text-base inline-flex items-center gap-2 transition-all cursor-pointer"
                >
                  <span>{isFR ? "Découvrir la marque Bloom by BotaniK" : isDE ? "Die Marke Bloom by BotaniK entdecken" : "Discover Bloom by BotaniK"}</span>
                  <ArrowRight className="w-4 h-4 text-[#E8772E]" />
                </a>
              </div>
              {/* Preuve sociale immédiate sous les boutons */}
              <div className="inline-flex flex-wrap items-center gap-2 px-4 py-2 rounded-xl bg-white border border-[#E7DFD3] text-xs sm:text-sm font-bold text-[#1E2E25] shadow-2xs">
                <span>
                  {isFR
                    ? "Note Amazon.fr : 4,3/5 (7 avis vérifiés) • Cuve Inox 304 sans plastique • Rétractation 14 j + essai 30 j"
                    : isDE
                    ? "Amazon.fr: 4,3/5 (7 Bewertungen) • Edelstahl 304 ohne Kunststoff • 14 T. Widerruf + 30 T. Testphase"
                    : "Amazon.fr: 4.3/5 (7 verified reviews) • Plastic-free 304 Steel Tank • 14-day withdrawal + 30-day trial"}
                </span>
              </div>
            </div>

            {/* Section 2 : Encart Vidéo & Démonstration */}
            <div className="rounded-3xl border border-[#D8CBB7] bg-[#1E2E25] text-white overflow-hidden shadow-xl">
              <div className="grid grid-cols-1 md:grid-cols-12 items-center">
                <div className="md:col-span-5 bg-[#0F261E] p-4 sm:p-6 flex items-center justify-center">
                  <div className="relative w-full max-w-[220px] sm:max-w-[240px] aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl border border-white/15 bg-black">
                    <video
                      src="/videos/Recette_Bloom.mp4"
                      poster={heroImg2}
                      autoPlay
                      muted
                      loop
                      playsInline
                      controls
                      preload="metadata"
                      aria-label={isFR ? "Démonstration vidéo BloomLab® : de la plante brute au sérum doré" : isDE ? "BloomLab® Videodemonstration: von der Pflanze zum Serum" : "BloomLab® video demonstration: from raw plant to golden serum"}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                </div>
                <div className="md:col-span-7 p-6 sm:p-8 space-y-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[#C8AB8A] text-[10px] font-black uppercase tracking-widest">
                    <Clock className="w-3.5 h-3.5 text-[#E8772E]" />
                    <span>{isFR ? "Démonstration en vidéo" : isDE ? "Videodemonstration" : "Video Demonstration"}</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-black text-white leading-snug">
                    {isFR
                      ? "De la plante brute au sérum doré en 2 heures chrono."
                      : isDE
                      ? "Von der rohen Pflanze zum goldenen Serum in genau 2 Stunden."
                      : "From raw plant to golden serum in 2 hours flat."}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/85 leading-relaxed">
                    {isFR
                      ? "Pas besoin d'être herboriste ou chimiste. Mettez vos plantes séchées ou fraîches dans le panier en inox, versez votre huile végétale, votre eau ou votre glycérine végétale, choisissez la température et laissez BloomLab® travailler en silence."
                      : isDE
                      ? "Sie müssen weder Kräuterkundler noch Chemiker sein. Geben Sie trockene oder frische Pflanzen in den Edelstahlkorb, fügen Sie Pflanzenöl, Wasser oder Glycerin hinzu, wählen Sie die Temperatur und lassen Sie BloomLab® leise arbeiten."
                      : "No need to be an herbalist or chemist. Place your dried or fresh herbs in the stainless steel basket, pour your carrier oil, water, or vegetable glycerin, pick the temperature, and let BloomLab® work silently."}
                  </p>
                  <div className="p-3 rounded-xl bg-black/30 border border-white/15 text-xs text-[#C8AB8A] font-medium">
                    {isFR
                      ? "Extraction basse température en cuve inox 304 : plantes entières → palier maîtrisé → filtration 90 µm."
                      : isDE
                      ? "Niedrigtemperatur-Extraktion im Edelstahl-304-Behälter: ganze Pflanzen → kontrollierte Temperatur → 90-µm-Filtration."
                      : "Low-temperature 304 stainless extraction: whole plants → controlled heat → 90 µm filtration."}
                  </div>
                </div>
              </div>
            </div>

            {/* Chips-tooltip sous les CTA */}
            <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 text-xs text-slate-500">
              <span className="font-semibold text-slate-600 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#E8772E]" />
                {isFR ? "Un mot vous intrigue ? Touchez-le :" : isDE ? "Ein Begriff macht Sie neugierig? Antippen:" : "Curious about a term? Tap it:"}
              </span>
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#FAF7F2] border border-[#D8CBB7] hover:border-[#E8772E] hover:bg-white transition-colors cursor-pointer text-xs font-semibold text-[#1E2E25]">
                  <TooltipLexique terme="totum" force={true}>
                    {isFR ? "Totum végétal" : isDE ? "Pflanzen-Totum" : "Plant Totum"}
                  </TooltipLexique>
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#FAF7F2] border border-[#D8CBB7] hover:border-[#E8772E] hover:bg-white transition-colors cursor-pointer text-xs font-semibold text-[#1E2E25]">
                  <TooltipLexique terme="sequencage-ab" force={true}>
                    {isFR ? "Double Extraction Intelligente" : isDE ? "Intelligente Doppelextraktion" : "Smart Dual Extraction"}
                  </TooltipLexique>
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#FAF7F2] border border-[#D8CBB7] hover:border-[#E8772E] hover:bg-white transition-colors cursor-pointer text-xs font-semibold text-[#1E2E25]">
                  <TooltipLexique terme="adaptogenes" force={true}>
                    {isFR ? "Plantes adaptogènes" : isDE ? "Adaptogene Pflanzen" : "Adaptogenic Plants"}
                  </TooltipLexique>
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#FAF7F2] border border-[#D8CBB7] hover:border-[#E8772E] hover:bg-white transition-colors cursor-pointer text-xs font-semibold text-[#1E2E25]">
                  <TooltipLexique terme="terrain" force={true}>
                    {isFR ? "Terrain biologique" : isDE ? "Biologisches Terrain" : "Biological Terrain"}
                  </TooltipLexique>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AMAZON ACTIVATION BANNER - STRATEGIC RETENTION HACK */}
      <section className="bg-[#1E2E25] border-y border-[#C8AB8A]/30 py-4">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-white">
            <div className="w-10 h-10 rounded-full bg-[#E8772E] flex items-center justify-center shrink-0">
              <Package className="w-5 h-5 text-white" />
            </div>
            <p className="text-sm font-medium text-[#FAF7F2]/90">
              {isFR ? (
                <>
                  <span className="font-bold text-[#E8772E]">Acheteur Amazon ?</span> Ne restez pas seul face à vos plantes. Uploadez votre facture pour débloquer gratuitement vos protocoles botaniques et l'accès Premium à la Bibliothèque Bloom.
                </>
              ) : isDE ? (
                <>
                  <span className="font-bold text-[#E8772E]">Amazon-Käufer?</span> Lassen Sie Ihre Pflanzen nicht ungenutzt. Laden Sie Ihre Rechnung hoch, um Ihre Protokolle und den Premium-Zugang zur Bloom-Bibliothek kostenlos freizuschalten.
                </>
              ) : (
                <>
                  <span className="font-bold text-[#E8772E]">Amazon buyer?</span> Don't stay alone with your herbs. Upload your invoice to unlock your botanical protocols and Premium access to the Bloom Library for free.
                </>
              )}
            </p>
          </div>
          <button 
            onClick={() => onNavigate('activation')} 
            className="px-6 py-2.5 bg-[#E8772E] hover:bg-[#D4651F] text-white text-xs font-black uppercase tracking-wider rounded-lg transition-all shadow-lg shadow-orange-900/20 whitespace-nowrap cursor-pointer"
          >
            {isFR ? "Activer mon accès Premium" : isDE ? "Premium-Zugang aktivieren" : "Activate my Premium access"}
          </button>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* BLOC 2 : CONNAISSANCE (CRÉÉ) */}
      {/* Rôle : Éveil & Pédagogie sur la matière végétale */}
      {/* ========================================================================= */}
      <section id="connaissance" className="py-16 md:py-20 bg-white border-y border-[#F3EEE6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-block px-4 py-1.5 bg-[#F5E6D8] text-[#1E2E25] text-[10px] font-bold uppercase tracking-widest rounded-md border border-[#E8772E]/20">
              {isFR ? '1. Connaissance Botanique' : isDE ? '1. Botanisches Wissen' : '1. Botanical Knowledge'}
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1E2E25] tracking-tight">
              {isFR 
                ? "Soins Botaniques de Précision à Domicile : Connaissez-vous vos plantes ?" 
                : isDE 
                ? "Präzise botanische Pflege für zu Hause: Kennen Sie Ihre Pflanzen?" 
                : "Precision Home Botanical Care: Do you truly know your plants?"}
            </h2>
            <p className="text-[#4A5D4A] text-base sm:text-lg leading-relaxed font-medium">
              {isFR 
                ? "Entre l'herboristerie maison empirique et les promesses marketing, la matière végétale exige une méthode claire. Chaque plante médicinale possède son propre code d'extraction pour délivrer ses principes actifs sans altération."
                : isDE 
                ? "Zwischen traditioneller Kräuterkunde und Marketingversprechen verlangt Pflanzenmaterial eine wissenschaftliche Methode. Jede Heilpflanze besitzt ihren eigenen Extraktionscode."
                : "Between empirical home herbalism and marketing hype, botanical matter demands methodical precision. Every medicinal plant holds its unique extraction code to release active compounds intact."}
            </p>
          </div>

          {/* 3 Cartes Fondamentales */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#FAF7F2] p-8 rounded-[32px] border border-[#E7DFD3] shadow-sm space-y-4 hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-2xl bg-[#1E2E25] text-[#E8772E] flex items-center justify-center font-black">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-[#1E2E25]">
                {isFR ? "Quelle partie utiliser ?" : isDE ? "Welchen Pflanzenteil nutzen?" : "Which part to use?"}
              </h3>
              <p className="text-[#1E2E25]/80 text-sm leading-relaxed">
                {isFR 
                  ? "Feuilles, sommités fleuries, écorces, racines ou résines : chaque organe végétal concentre des familles moléculaires spécifiques aux résistances thermiques opposées."
                  : isDE 
                  ? "Blätter, Blüten, Rinden, Wurzeln oder Harze: Jeder Pflanzenteil konzentriert spezifische Molekülfamilien."
                  : "Leaves, flowering tops, barks, roots or resins: each plant organ concentrates distinct molecular families."}
              </p>
            </div>

            <div className="bg-[#FAF7F2] p-8 rounded-[32px] border border-[#E7DFD3] shadow-sm space-y-4 hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-2xl bg-[#1E2E25] text-[#E8772E] flex items-center justify-center font-black">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-[#1E2E25]">
                {isFR ? "Quelles précautions ?" : isDE ? "Welche Vorsichtsmaßnahmen?" : "Which precautions?"}
              </h3>
              <p className="text-[#1E2E25]/80 text-sm leading-relaxed">
                {isFR 
                  ? "Contre-indications, choix des solvants nobles, synergies et respect strict des dosages journaliers adaptés au terrain biologique sans jamais improviser."
                  : isDE 
                  ? "Kontraindikationen, Wahl edler Lösungsmittel und strikte Einhaltung sicherer Tagesdosierungen."
                  : "Contraindications, noble solvent choices, synergies and strict adherence to safe daily dosages."}
              </p>
            </div>

            <div className="bg-[#FAF7F2] p-8 rounded-[32px] border border-[#E7DFD3] shadow-sm space-y-4 hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-2xl bg-[#1E2E25] text-[#E8772E] flex items-center justify-center font-black">
                <FlaskConical className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-[#1E2E25]">
                {isFR ? "Comment l'extraire ?" : isDE ? "Wie extrahieren?" : "How to extract?"}
              </h3>
                  <p className="text-[#1E2E25]/80 text-sm leading-relaxed">
                    {isFR 
                      ? "Hydrosoluble (eau, glycérine) ou liposoluble (huiles végétales) : la température ciblée, la durée et le brassage continu orientent la capture des fractions aromatiques et végétales (l'alcool chauffé en cuve est suspendu)."
                      : isDE 
                      ? "Wasserlöslich oder fettlöslich: Gezielte Temperatur und Rühren bestimmen den Auszug (erhitzter Alkohol im Behälter ausgesetzt)."
                      : "Water-soluble (water, glycerin) or fat-soluble (plant oils): targeted temperature and continuous stirring guide botanical extraction (heated alcohol inside chamber suspended)."}
                  </p>
                </div>
              </div>

              <div className="text-center pt-4">
                <button
                  onClick={() => onNavigate('herbier')}
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#1E2E25] hover:bg-[#2D372C] text-white font-bold text-sm sm:text-base shadow-md hover:shadow-lg transition-all cursor-pointer"
                >
                  <span>{isFR ? "Explorer l'Herbier" : isDE ? "Das Herbarium erkunden" : "Explore the Herbarium"}</span>
                  <ArrowRight className="w-4 h-4 text-[#E8772E]" />
                </button>
              </div>

            </div>
          </section>

          {/* ========================================================================= */}
          {/* BLOC 3 : LE PROBLÈME & LA SOLUTION (Vulgarisation sans jargon) */}
          {/* ========================================================================= */}
          <section id="pourquoi-l-infusion-echoue" className="py-20 md:py-24 bg-[#FAF7F2]">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
              <div className="text-center max-w-3xl mx-auto space-y-4">
                <div className="inline-block px-4 py-1.5 bg-[#F5E6D8] text-[#1E2E25] text-[10px] font-bold uppercase tracking-widest rounded-md border border-[#E8772E]/20">
                  {isFR ? '2. Le Problème & La Solution' : isDE ? '2. Problem & Lösung' : '2. Problem & Solution'}
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#1E2E25] leading-tight">
                  {isFR
                    ? "Pourquoi vos infusions et macérâts maison peinent-ils à préserver les composés fragiles ?"
                    : isDE
                    ? "Warum verlieren hausgemachte Aufgüsse und Mazerate oft empfindliche Pflanzenstoffe?"
                    : "Why do homemade infusions and macerates often lose delicate botanical compounds?"}
                </h2>
            <p className="text-base sm:text-lg text-[#1E2E25]/80 leading-relaxed font-normal">
              {isFR
                ? "Quand on prépare ses plantes à la maison, on se heurte toujours aux mêmes obstacles :"
                : isDE
                ? "Wer Pflanzen zu Hause zubereitet, stößt immer wieder auf dieselben Hindernisse:"
                : "When preparing herbs at home, you always run into the same obstacles:"}
            </p>
          </div>

          <div className="bg-white rounded-[32px] border border-[#E7DFD3] overflow-hidden shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-2 bg-[#1E2E25] text-white text-xs sm:text-sm font-black uppercase tracking-wider">
              <div className="p-5 sm:p-6 border-b md:border-b-0 md:border-r border-white/10 text-rose-200">
                {isFR ? "Ce qui abîme vos plantes" : isDE ? "Was Ihren Pflanzen schadet" : "What damages your plants"}
              </div>
              <div className="p-5 sm:p-6 text-emerald-300">
                {isFR ? "La solution BloomLab®" : isDE ? "Die Lösung mit BloomLab®" : "The BloomLab® solution"}
              </div>
            </div>

            <div className="divide-y divide-[#F3EEE6]">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="p-6 sm:p-7 space-y-2 border-b md:border-b-0 md:border-r border-[#F3EEE6]">
                  <div className="font-black text-[#1E2E25] text-sm sm:text-base flex items-start gap-2.5">
                    <Flame className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                    <span>
                      {isFR
                        ? "1. L'eau bouillante et le bain-marie brûlent les actifs"
                        : isDE
                        ? "1. Kochendes Wasser und Wasserbad verbrennen die Wirkstoffe"
                        : "1. Boiling water and double-boilers scorch actives"}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#1E2E25]/80 leading-relaxed">
                    {isFR
                      ? "Au-delà de 60 °C, les huiles essentielles s'évaporent et les antioxydants délicats sont détruits. Résultat : un liquide amer."
                      : isDE
                      ? "Über 60 °C verdampfen ätherische Öle und empfindliche Antioxidantien werden zerstört. Ergebnis: ein bitterer Auszug."
                      : "Above 60°C, essential oils evaporate and delicate antioxidants are destroyed. Result: a bitter liquid."}
                  </p>
                </div>
                <div className="p-6 sm:p-7 space-y-2 bg-emerald-50/40">
                  <div className="font-black text-[#1E2E25] text-sm sm:text-base flex items-start gap-2.5">
                    <Thermometer className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                    <span>
                      {isFR
                        ? "Régulation thermique suivie (consigne nominale ±0,5 °C)"
                        : isDE
                        ? "Geführte Temperaturregelung (Nennwert ±0,5 °C)"
                        : "Guided thermal regulation (nominal ±0.5°C spec)"}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#1E2E25]/85 leading-relaxed font-medium">
                    {isFR
                      ? "La machine maintient la température idéale pour extraire le meilleur de la plante sans jamais la cuire."
                      : isDE
                      ? "Die Maschine hält die ideale Temperatur, um das Beste aus der Pflanze zu lösen, ohne sie je zu kochen."
                      : "The extractor maintains the ideal temperature to extract the best from the plant without ever cooking it."}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="p-6 sm:p-7 space-y-2 border-b md:border-b-0 md:border-r border-[#F3EEE6]">
                  <div className="font-black text-[#1E2E25] text-sm sm:text-base flex items-start gap-2.5">
                    <Clock className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <span>
                      {isFR
                        ? "2. La macération au soleil prend 6 semaines"
                        : isDE
                        ? "2. Die Sonnenmazeration dauert 6 Wochen"
                        : "2. Sun maceration takes 6 weeks"}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#1E2E25]/80 leading-relaxed">
                    {isFR
                      ? "L'air et la lumière oxydent vos huiles, qui risquent de rancir avant même d'être filtrées."
                      : isDE
                      ? "Luft und Licht oxidieren Ihre Öle, sodass sie noch vor dem Filtern ranzig werden können."
                      : "Air and light oxidize your oils, creating a high risk of rancidity before you even filter them."}
                  </p>
                </div>
                <div className="p-6 sm:p-7 space-y-2 bg-emerald-50/40">
                  <div className="font-black text-[#1E2E25] text-sm sm:text-base flex items-start gap-2.5">
                    <Lock className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                    <span>
                      {isFR
                        ? "Prêt en 2h à 4h, à l'abri de l'air"
                        : isDE
                        ? "Fertig in 2 bis 4 Std., unter Luftabschluss"
                        : "Ready in 2h to 4h, shielded from air"}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#1E2E25]/85 leading-relaxed font-medium">
                    {isFR
                      ? "Une chambre fermée et hermétique protège vos huiles et garantit une conservation optimale."
                      : isDE
                      ? "Eine dicht verschlossene Kammer schützt Ihre Öle und sichert optimale Haltbarkeit."
                      : "An airtight, sealed chamber protects your oils and ensures optimal shelf stability."}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="p-6 sm:p-7 space-y-2 border-b md:border-b-0 md:border-r border-[#F3EEE6]">
                  <div className="font-black text-[#1E2E25] text-sm sm:text-base flex items-start gap-2.5">
                    <Droplets className="w-5 h-5 text-slate-600 shrink-0 mt-0.5" />
                    <span>
                      {isFR
                        ? "3. L'eau seule ignore les actifs liposolubles"
                        : isDE
                        ? "3. Wasser allein übersieht fettlösliche Wirkstoffe"
                        : "3. Water alone leaves fat-soluble actives behind"}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#1E2E25]/80 leading-relaxed">
                    {isFR
                      ? "Une tisane classique laisse de côté les vitamines, résines et acides gras essentiels qui ne se dissolvent que dans l'huile."
                      : isDE
                      ? "Ein klassischer Kräutertee lässt Vitamine, Harze und essentielle Fettsäuren zurück, die sich nur in Öl lösen."
                      : "A regular herbal tea leaves behind vitamins, resins, and essential fatty acids that only dissolve in oil."}
                  </p>
                </div>
                <div className="p-6 sm:p-7 space-y-2 bg-emerald-50/40">
                  <div className="font-black text-[#1E2E25] text-sm sm:text-base flex items-start gap-2.5">
                    <FlaskConical className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                    <span>
                      {isFR
                        ? "Double Extraction Intelligente (Méthode A/B)"
                        : isDE
                        ? "Intelligente Doppelextraktion (A/B-Methode)"
                        : "Smart Dual Extraction (A/B Method)"}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#1E2E25]/85 leading-relaxed font-medium">
                    {isFR
                      ? "BloomLab® enchaîne ou adapte l'extraction à l'eau ou à la glycérine puis à l'huile végétale pour élargir le spectre extrait (extraction à l'alcool chauffé en cuve suspendue)."
                      : isDE
                      ? "BloomLab® kombiniert die Extraktion in Wasser oder Glycerin sowie anschließend in Pflanzenöl für ein breiteres Spektrum (erhitzter Alkohol im Behälter ausgesetzt)."
                      : "BloomLab® sequences or adapts water or glycerin extraction followed by carrier oil to broaden extracted fractions (heated alcohol inside chamber suspended)."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* BLOC 4 : SOLUTION (Le Séquençage Actif A/B & L'Architecture BloomLab) */}
      {/* Rôle : Présenter l'ingénierie concrète sans aucune allégation interdite */}
      {/* ========================================================================= */}
      <section id="solution" className="py-16 md:py-24 bg-white border-b border-[#F3EEE6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-block px-4 py-1.5 bg-[#F5E6D8] text-[#1E2E25] text-[10px] font-bold uppercase tracking-widest rounded-md border border-[#E8772E]/20">
              {isFR ? '3. La Solution Technologique' : isDE ? '3. Die technologische Lösung' : '3. The Technological Solution'}
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1E2E25] tracking-tight">
              {isFR 
                ? "Double Extraction Intelligente (Eau/Glycérine + Huile)" 
                : isDE 
                ? "Intelligente Doppelextraktion (Wasser/Glycerin + Öl)" 
                : "Smart Dual Extraction (Water/Glycerin + Oil)"}
            </h2>
            <p className="text-[#4A5D4A] text-base sm:text-lg leading-relaxed font-medium">
              {isFR 
                ? "La BloomLab adapte automatiquement la température et le solvant non inflammable à chaque plante : l'eau et la glycérine captent les composés hydrosolubles, l'huile végétale capte les lipides et arômes (alcool chauffé en cuve suspendu)." 
                : isDE 
                ? "BloomLab passt Temperatur und Lösungsmittel an jede Pflanze an: Wasser und Glycerin lösen wasserlösliche Stoffe, Pflanzenöl bindet Lipide und Aromen (erhitzter Alkohol im Behälter ausgesetzt)." 
                : "BloomLab adapts temperature and non-flammable solvent to each plant: water and glycerin capture water-soluble compounds while carrier oil captures lipids and aromas (heated alcohol suspended)."}
            </p>
          </div>

          {/* Les 3 Paliers Thermiques A/B */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#FAF7F2] p-8 rounded-[32px] border border-[#E7DFD3] space-y-3">
              <div className="text-xs font-black uppercase tracking-widest text-[#E8772E]">
                {isFR ? "Phase A · Hydrosoluble" : isDE ? "Phase A · Wasserlöslich" : "Phase A · Water-Soluble"}
              </div>
              <div className="text-3xl font-black text-[#1E2E25]">70 - 75°C</div>
              <p className="text-slate-600 text-sm leading-relaxed">
                {isFR 
                  ? "Extraction douce des tanins protecteurs, mucilages et polyphénols solubles dans l'eau sans dépasser le seuil critique de cuisson." 
                  : isDE 
                  ? "Sanfte Extraktion schützender Tannine, Schleimstoffe und wasserlöslicher Polyphenole." 
                  : "Gentle extraction of protective tannins, mucilages, and water-soluble polyphenols without scorching."}
              </p>
            </div>

            <div className="bg-[#FAF7F2] p-8 rounded-[32px] border border-[#E7DFD3] space-y-3">
              <div className="text-xs font-black uppercase tracking-widest text-[#E8772E]">
                {isFR ? "Phase B · Liposoluble" : isDE ? "Phase B · Fettlöslich" : "Phase B · Fat-Soluble"}
              </div>
              <div className="text-3xl font-black text-[#1E2E25]">45 - 55°C</div>
              <p className="text-slate-600 text-sm leading-relaxed">
                {isFR 
                  ? "Préservation des acides gras nobles, huiles essentielles et terpènes volatils dans les huiles végétales et beurres (usage d'alcool chauffé en cuve suspendu)." 
                  : isDE 
                  ? "Erhalt wertvoller Fettsäuren, ätherischer Öle und flüchtiger Terpene in Pflanzenölen und Buttern (erhitzter Alkohol ausgesetzt)." 
                  : "Preservation of noble fatty acids, essential oils, and volatile terpenes in plant oils and butters (heated alcohol suspended)."}
              </p>
            </div>

            <div className="bg-[#FAF7F2] p-8 rounded-[32px] border border-[#E7DFD3] space-y-3">
              <div className="text-xs font-black uppercase tracking-widest text-[#E8772E]">
                {isFR ? "Activation Thermique Douce" : isDE ? "Sanfte Thermische Aktivierung" : "Gentle Thermal Activation"}
              </div>
              <div className="text-3xl font-black text-[#1E2E25]">121°C</div>
              <p className="text-slate-600 text-sm leading-relaxed">
                {isFR 
                  ? "Activation thermique douce des résines et aromates grâce aux 6 programmes automatisés (0 à 121 °C, spéc. nominale ±0,5 °C)." 
                  : isDE 
                  ? "Sanfte thermische Aktivierung von Harzen und Aromastoffen dank 6 automatischer Programme (0 bis 121 °C, Nennwert ±0,5 °C)." 
                  : "Gentle thermal activation of resins and aromatics via 6 automated programs (0–121°C, nominal ±0.5°C spec)."}
              </p>
            </div>
          </div>

          {/* 4 Cartes Caractéristiques Matérielles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-[#E7DFD3] shadow-sm space-y-2">
              <Microscope className="w-6 h-6 text-[#E8772E]" />
              <div className="text-sm font-black text-[#1E2E25]">
                {isFR ? "Inox 304 Alimentaire" : isDE ? "Edelstahl 304 (Lebensmittelecht)" : "Food-Grade 304 Stainless Steel"}
              </div>
              <div className="text-xs text-[#1E2E25]/75 leading-relaxed">
                {isFR
                  ? "Cuve neutre inerte, zéro transfert métallique ni relargage plastique."
                  : isDE
                  ? "Inerte, neutrale Kammer ohne Metallabgabe oder Kunststoffkontakt."
                  : "Inert neutral chamber with zero metallic transfer or plastic leaching."}
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#E7DFD3] shadow-sm space-y-2">
              <Thermometer className="w-6 h-6 text-[#E8772E]" />
              <div className="text-sm font-black text-[#1E2E25]">
                {isFR ? "Consigne nominale ±0,5°C" : isDE ? "Nennwert ±0,5 °C" : "Nominal ±0.5°C Spec"}
              </div>
              <div className="text-xs text-[#1E2E25]/75 leading-relaxed">
                {isFR
                  ? "Sonde numérique continue (spécification nominale fabricant non certifiée indépendamment) limitant les pics thermiques."
                  : isDE
                  ? "Kontinuierlicher Digitalsensor (Hersteller-Nennwert, nicht unabhängig zertifiziert) gegen Hitzespitzen."
                  : "Continuous digital sensor (manufacturer nominal spec, not third-party certified) limiting heat spikes."}
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#E7DFD3] shadow-sm space-y-2">
              <Activity className="w-6 h-6 text-[#E8772E]" />
              <div className="text-sm font-black text-[#1E2E25]">
                {isFR ? "Agitation Cyclique" : isDE ? "Zyklisches Rühren" : "Cyclic Agitation"}
              </div>
              <div className="text-xs text-[#1E2E25]/75 leading-relaxed">
                {isFR
                  ? "Brassage régulier automatisé maximisant l'échange solvant-plante."
                  : isDE
                  ? "Automatisiertes gleichmäßiges Rühren für maximalen Pflanzen-Lösungsmittel-Austausch."
                  : "Automated cyclic stirring optimizing solvent-plant exchange."}
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#E7DFD3] shadow-sm space-y-2">
              <Lock className="w-6 h-6 text-[#E8772E]" />
              <div className="text-sm font-black text-[#1E2E25]">
                {isFR ? "Milieu Clos Hermétique" : isDE ? "Hermetisches System" : "Hermetic Closed Chamber"}
              </div>
              <div className="text-xs text-[#1E2E25]/75 leading-relaxed">
                {isFR
                  ? "Chambre fermée limitant l'évaporation des arômes et terpènes volatils."
                  : isDE
                  ? "Dicht verschlossene Kammer reduziert das Verdampfen flüchtiger Aromen und Terpene."
                  : "Sealed chamber reducing evaporation of volatile terpenes and aromas."}
              </div>
            </div>
          </div>

          {/* Niveau 2 Dépliable : Accordéon expert phytochimie */}
          <details className="rounded-3xl border border-[#D8CBB7] bg-[#FAF7F2] p-6 sm:p-8 shadow-xs group">
            <summary className="cursor-pointer font-black text-sm sm:text-base text-[#1E2E25] flex items-center justify-between gap-4 list-none">
              <span>
                {isFR
                  ? "🔬 Pour les praticiens et passionnés de phytochimie : comprendre la méthode A/B et la Loi de Fick"
                  : isDE
                  ? "🔬 Für Praktiker & Phytochemie-Interessierte: die A/B-Methode und das Ficksche Gesetz verstehen"
                  : "🔬 For practitioners & phytochemistry enthusiasts: understanding the A/B method and Fick's Law"}
              </span>
              <ChevronDown className="w-5 h-5 text-[#E8772E] shrink-0 transition-transform group-open:rotate-180" />
            </summary>
            <div className="mt-6 pt-6 border-t border-[#D8CBB7]/60 text-xs sm:text-sm text-[#1E2E25]/85 leading-relaxed space-y-3">
              <p>
                {isFR
                  ? "Phase A (hydrosoluble, 70–75 °C) pour les tanins et polyphénols ; Phase B (liposoluble, 45–55 °C) pour les terpènes et acides gras ; brassage laminaire évitant la formation d'une couche limite de saturation (Loi de Fick) sans broyer les fibres végétales."
                  : isDE
                  ? "Phase A (wasserlöslich, 70–75 °C) für Tannine und Polyphenole; Phase B (fettlöslich, 45–55 °C) für Terpene und Fettsäuren; laminares Rühren verhindert eine Sättigungsgrenzschicht (Ficksches Gesetz) ohne die Pflanzenfasern zu zerkleinern."
                  : "Phase A (water-soluble, 70–75°C) for tannins and polyphenols; Phase B (fat-soluble, 45–55°C) for terpenes and fatty acids; laminar stirring prevents boundary layer saturation (Fick's Law) without shredding plant fibers."}
              </p>
            </div>
          </details>

        </div>
      </section>

      {/* BLOC 4.5 : PREUVE CINÉTIQUE — Loi de Fick (modèle illustratif) */}
      <ExtractionKineticsChart lang={lang as 'fr' | 'en' | 'de'} />

      {/* ========================================================================= */}
      {/* BLOC 5 : DÉMONSTRATION (5 Étapes, Aucune Improvisation) */}
      {/* Rôle : Rendre la méthode limpide et dédramatiser la pratique */}
      {/* ========================================================================= */}
      <section id="demonstration" className="py-16 md:py-24 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-block px-4 py-1.5 bg-[#F5E6D8] text-[#1E2E25] text-[10px] font-bold uppercase tracking-widest rounded-md border border-[#E8772E]/20">
              {isFR ? '4. Protocole en Action (5 étapes)' : isDE ? '4. Protokoll in Aktion (5 Schritte)' : '4. Protocol in Action (5 Steps)'}
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1E2E25] tracking-tight">
              {isFR ? "5 étapes, aucune improvisation" : isDE ? "5 Schritte, keine Improvisation" : "5 steps, zero guesswork"}
            </h2>
            <p className="text-[#1E2E25]/80 text-base sm:text-lg leading-relaxed">
              {isFR 
                ? "Pensé pour une prise en main progressive. Chaque geste s'appuie sur des repères précis." 
                : isDE 
                ? "Entwickelt für einen schrittweisen Einstieg. Jeder Handgriff basiert auf präzisen Richtwerten." 
                : "Designed for progressive onboarding. Every gesture is grounded in precise guidelines."}
            </p>
          </div>

          {/* Les 5 Étapes Détaillées */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {[
              {
                num: "01",
                title: isFR ? "Choisir la recette" : isDE ? "Rezept wählen" : "Choose recipe",
                desc: isFR
                  ? "Sélectionnez un protocole validé selon votre objectif culinaire, cosmétique ou de terrain."
                  : isDE
                  ? "Wählen Sie ein dokumentiertes Protokoll für Ihre kulinarischen, kosmetischen oder botanischen Ziele."
                  : "Select a documented protocol suited to your culinary, cosmetic, or systemic goal."
              },
              {
                num: "02",
                title: isFR ? "Peser les plantes" : isDE ? "Pflanzen abwiegen" : "Weigh plants",
                desc: isFR
                  ? "Pesez vos plantes sèches ou fraîches avec rigueur et disposez-les dans le panier d'infusion."
                  : isDE
                  ? "Wiegen Sie getrocknete oder frische Pflanzen präzise ab und geben Sie sie in den Korb."
                  : "Weigh dry or fresh herbs precisely and place them in the infusion basket."
              },
              {
                num: "03",
                title: isFR ? "Régler les paramètres" : isDE ? "Parameter einstellen" : "Set parameters",
                desc: isFR
                  ? "Associez temps, température et solvant non inflammable (eau, huile végétale ou glycérine végétale — alcool chauffé suspendu) selon la fiche."
                  : isDE
                  ? "Kombinieren Sie Zeit, Temperatur und nicht brennbares Lösungsmittel (Wasser, Pflanzenöl oder Glycerin — erhitzter Alkohol ausgesetzt) laut Anleitung."
                  : "Match time, temperature, and non-flammable solvent (water, plant oil, or vegetable glycerin — heated alcohol suspended) per the protocol sheet."
              },
              {
                num: "04",
                title: isFR ? "Lancer le cycle" : isDE ? "Zyklus starten" : "Run cycle",
                desc: isFR
                  ? "BloomLab maintient la température exacte et l'agitation douce en continu de manière autonome."
                  : isDE
                  ? "BloomLab hält die exakte Temperatur und rührt kontinuierlich und sanft — völlig selbstständig."
                  : "BloomLab autonomously maintains exact temperature and continuous gentle stirring."
              },
              {
                num: "05",
                title: isFR ? "Filtrer & documenter" : isDE ? "Filtern & notieren" : "Filter & record",
                desc: isFR
                  ? "Recueillez votre extrait Totum pur en flacon stérile et notez vos observations dans votre carnet."
                  : isDE
                  ? "Fangen Sie Ihren reinen Totum-Extrakt in einer Braunglasflasche auf und notieren Sie Ihre Ergebnisse."
                  : "Collect your pure Totum extract into an amber bottle and log your observations."
              }
            ].map((step, idx) => (
              <div key={idx} className="bg-white p-6 rounded-[28px] border border-[#E7DFD3] shadow-sm flex flex-col justify-between space-y-4 hover:border-[#E8772E]/40 transition-all">
                <div className="space-y-3">
                  <div className="text-3xl font-black text-[#E8772E]">{step.num}</div>
                  <h3 className="text-base font-black text-[#1E2E25]">{step.title}</h3>
                  <p className="text-xs text-[#1E2E25]/75 leading-relaxed">{step.desc}</p>
                </div>
                <div className="w-full h-1 bg-[#FAF7F2] rounded-full overflow-hidden">
                  <div className="h-full bg-[#1E2E25]" style={{ width: `${(idx + 1) * 20}%` }} />
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* BLOC 6 : LES 3 UNIVERS DE PRATIQUE (La Preuve par l'Usage) */}
      {/* ========================================================================= */}
      <section id="projection" className="py-16 md:py-24 bg-white border-y border-[#F3EEE6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-block px-4 py-1.5 bg-[#F5E6D8] text-[#1E2E25] text-[10px] font-bold uppercase tracking-widest rounded-md border border-[#E8772E]/20">
              {isFR ? '5. Les 3 Univers de Pratique' : isDE ? '5. Die 3 Praxisbereiche' : '5. The 3 Practice Universes'}
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1E2E25] tracking-tight">
              {isFR 
                ? "Un seul appareil pour votre salle de bain, votre bien-être et votre cuisine." 
                : isDE 
                ? "Ein einziges Gerät für Ihr Badezimmer, Ihr Wohlbefinden und Ihre Küche." 
                : "One single device for your bathroom, your well-being, and your kitchen."}
            </h2>
          </div>

          {/* 3 Cartes Avatars d'Usage */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Univers 1 : Cosmétique */}
            <div
              onClick={() => setActiveUniverse('cosmetique')}
              className={`p-7 rounded-[28px] border text-left transition-all cursor-pointer flex flex-col justify-between space-y-5 ${
                activeUniverse === 'cosmetique'
                  ? 'bg-[#FAF7F2] border-[#E8772E] shadow-lg ring-2 ring-[#E8772E]/30'
                  : 'bg-[#FAF7F2] border-[#E7DFD3] hover:border-[#E8772E]/50'
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-[#1E2E25] text-[#E8772E] shrink-0">
                    <Droplets className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-wider text-[#B45309]">
                      {isFR ? "Univers 1 · Cosmétique & Soins de la Peau" : isDE ? "Bereich 1 · Naturkosmetik & Hautpflege" : "Universe 1 · Cosmetics & Skincare"}
                    </div>
                    <div className="font-black text-base text-[#1E2E25]">
                      {isFR ? "Claire, formulation naturelle" : isDE ? "Claire, Naturkosmetik" : "Claire, natural formulation"}
                    </div>
                  </div>
                </div>
                <p className="text-xs italic font-medium text-[#1E2E25]/80 bg-white p-3.5 rounded-2xl border border-[#E7DFD3]">
                  {isFR
                    ? "« Je paie mes sérums bio 60 € le flacon sans toujours maîtriser la conservation. »"
                    : isDE
                    ? "« Ich zahle 60 € pro Bio-Serumfläschchen, ohne volle Kontrolle über die Haltbarkeit. »"
                    : "« I pay €60 per organic serum bottle without full control over its preservation. »"}
                </p>
                <div className="space-y-2 text-xs sm:text-sm text-[#1E2E25]/85 leading-relaxed">
                  <p>
                    <strong className="text-[#1E2E25]">{isFR ? "Usage BloomLab® : " : isDE ? "BloomLab®-Anwendung: " : "BloomLab® use: "}</strong>
                    {isFR
                      ? "Macérâts de calendula, sérums à la rose de Damas et jojoba, huiles fortifiantes au romarin pour le cuir chevelu."
                      : isDE
                      ? "Calendula-Mazerate, Damaszener-Rosen- & Jojoba-Seren, kräftigende Rosmarin-Haaröle."
                      : "Calendula macerates, Damask rose & jojoba serums, strengthening rosemary scalp oils."}
                  </p>
                  <p className="font-bold text-emerald-800">
                    {isFR
                      ? "3 flacons de sérums visage ≈ 180 € dans le commerce. Avec vos plantes et huiles végétales bio, votre BloomLab® est rentabilisée dès vos 4 premières préparations."
                      : isDE
                      ? "3 Gesichtsseren kosten ≈ 180 € im Handel. Mit eigenen Kräutern und Bio-Ölen amortisiert sich BloomLab® bereits ab Ihren ersten 4 Zubereitungen."
                      : "3 face serum bottles ≈ €180 retail. With your organic herbs and plant oils, BloomLab® pays for itself within your first 4 batches."}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); onNavigate('cosmetiques'); }}
                className="inline-flex items-center gap-2 text-sm font-black text-[#E8772E] hover:underline cursor-pointer"
              >
                <span>{isFR ? "Voir les recettes cosmétiques →" : isDE ? "Kosmetikrezepte ansehen →" : "See cosmetic recipes →"}</span>
              </button>
            </div>

            {/* Univers 2 : Bien-être & Pharmacie Familiale */}
            <div
              onClick={() => setActiveUniverse('phytotherapie')}
              className={`p-7 rounded-[28px] border text-left transition-all cursor-pointer flex flex-col justify-between space-y-5 ${
                activeUniverse === 'phytotherapie'
                  ? 'bg-[#FAF7F2] border-[#E8772E] shadow-lg ring-2 ring-[#E8772E]/30'
                  : 'bg-[#FAF7F2] border-[#E7DFD3] hover:border-[#E8772E]/50'
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-[#1E2E25] text-[#E8772E] shrink-0">
                    <Activity className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-wider text-[#B45309]">
                      {isFR ? "Univers 2 · Bien-être & Pharmacie Familiale" : isDE ? "Bereich 2 · Wohlbefinden & Hausapotheke" : "Universe 2 · Wellness & Home Apothecary"}
                    </div>
                    <div className="font-black text-base text-[#1E2E25]">
                      {isFR ? "Marc & Famille" : isDE ? "Marc & Familie" : "Marc & Family"}
                    </div>
                  </div>
                </div>
                <p className="text-xs italic font-medium text-[#1E2E25]/80 bg-white p-3.5 rounded-2xl border border-[#E7DFD3]">
                  {isFR
                    ? "« Je veux des tisanes concentrées, des baumes et des extraits purs sans additifs. »"
                    : isDE
                    ? "« Ich möchte konzentrierte Auszüge, Balsame und reine Extrakte ohne Zusatzstoffe. »"
                    : "« I want concentrated herbal infusions, balms, and pure additive-free extracts. »"}
                </p>
                <div className="space-y-2 text-xs sm:text-sm text-[#1E2E25]/85 leading-relaxed">
                  <p>
                    <strong className="text-[#1E2E25]">{isFR ? "Usage BloomLab® : " : isDE ? "BloomLab®-Anwendung: " : "BloomLab® use: "}</strong>
                    {isFR
                      ? "Infusions concentrées de plantes apaisantes, baumes articulaires maison, macérâts d'arnica ou d'achillée, extraits de racines adaptogènes."
                      : isDE
                      ? "Konzentrierte Auszüge beruhigender Pflanzen, hausgemachte Gelenkbalsame, Arnika- und Schafgarben-Mazerate, adaptogene Wurzelextrakte."
                      : "Concentrated soothing herbal infusions, homemade joint balms, arnica or yarrow macerates, adaptogenic root extracts."}
                  </p>
                  <p className="font-bold text-emerald-800">
                    {isFR
                      ? "Des préparations dosées, reproductibles et prêtes à l'avance pour toute l'année."
                      : isDE
                      ? "Präzise dosierte, reproduzierbare Zubereitungen auf Vorrat für das ganze Jahr."
                      : "Accurately dosed, repeatable preparations ready in advance for the entire year."}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); onNavigate('boutique-kits'); }}
                className="inline-flex items-center gap-2 text-sm font-black text-[#E8772E] hover:underline cursor-pointer"
              >
                <span>{isFR ? "Explorer nos mélanges de plantes →" : isDE ? "Pflanzenmischungen entdecken →" : "Explore our plant blends →"}</span>
              </button>
            </div>

            {/* Univers 3 : Gastronomie & Mixologie */}
            <div
              onClick={() => setActiveUniverse('culinaire')}
              className={`p-7 rounded-[28px] border text-left transition-all cursor-pointer flex flex-col justify-between space-y-5 ${
                activeUniverse === 'culinaire'
                  ? 'bg-[#FAF7F2] border-[#E8772E] shadow-lg ring-2 ring-[#E8772E]/30'
                  : 'bg-[#FAF7F2] border-[#E7DFD3] hover:border-[#E8772E]/50'
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-[#1E2E25] text-[#E8772E] shrink-0">
                    <ChefHat className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-wider text-[#B45309]">
                      {isFR ? "Univers 3 · Gastronomie & Mixologie" : isDE ? "Bereich 3 · Gastronomie & Mixologie" : "Universe 3 · Gastronomy & Mixology"}
                    </div>
                    <div className="font-black text-base text-[#1E2E25]">
                      {isFR ? "Julien, passionné de goût" : isDE ? "Julien, Genussmensch" : "Julien, flavor enthusiast"}
                    </div>
                  </div>
                </div>
                <p className="text-xs italic font-medium text-[#1E2E25]/80 bg-white p-3.5 rounded-2xl border border-[#E7DFD3]">
                  {isFR
                    ? "« Les huiles infusées à la casserole deviennent toujours amères ou brûlent l'ail et les herbes. »"
                    : isDE
                    ? "« Im Topf aromatisierte Öle werden immer bitter oder verbrennen Knoblauch und Kräuter. »"
                    : "« Stovetop infused oils always turn bitter or burn the garlic and herbs. »"}
                </p>
                <div className="space-y-2 text-xs sm:text-sm text-[#1E2E25]/85 leading-relaxed">
                  <p>
                    <strong className="text-[#1E2E25]">{isFR ? "Usage BloomLab® : " : isDE ? "BloomLab®-Anwendung: " : "BloomLab® use: "}</strong>
                    {isFR
                      ? "Huiles d'olive infusées au basilic ou au piment doux, beurres végétaux aux aromates, sirops botaniques et bases pour cocktails sans amertume."
                      : isDE
                      ? "Olivenöle mit Basilikum oder mildem Chili, Kräuterbutter, botanische Sirupe und Cocktail-Basen ganz ohne Bitterkeit."
                      : "Basil or mild chili infused olive oils, compound plant butters, botanical syrups, and bitterness-free cocktail bases."}
                  </p>
                  <p className="font-bold text-emerald-800">
                    {isFR
                      ? "Une extraction à basse température qui révèle le parfum frais de la plante comme au restaurant."
                      : isDE
                      ? "Eine Niedertemperatur-Extraktion, die das frische Aroma der Pflanze wie im Spitzenrestaurant bewahrt."
                      : "Low-temperature extraction that preserves the fresh aroma of the herb just like a fine restaurant."}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); onNavigate('culinaire'); }}
                className="inline-flex items-center gap-2 text-sm font-black text-[#E8772E] hover:underline cursor-pointer"
              >
                <span>{isFR ? "Découvrir l'atelier culinaire →" : isDE ? "Kulinarik-Werkstatt entdecken →" : "Discover culinary workshop →"}</span>
              </button>
            </div>
          </div>

          {/* Détail de l'Univers Actif */}
          <div className="bg-[#FAF7F2] rounded-[40px] p-8 md:p-12 border border-[#E7DFD3] shadow-md grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              {activeUniverse === 'culinaire' && (
                <>
                  <div className="inline-block px-3 py-1 bg-[#F5E6D8] text-[#B45309] text-xs font-bold uppercase tracking-wider rounded-full border border-[#E8772E]/30">
                    {isFR ? "Niveau 1 · Gastronomie & Arômes" : isDE ? "Stufe 1 · Gastronomie & Aromen" : "Level 1 · Gastronomy & Aromas"}
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-[#1E2E25]">
                    {isFR ? "L'Art Culinaire sans amertume ni surchauffe" : isDE ? "Kulinarische Kunst ohne Bitterkeit oder Überhitzung" : "Culinary Art without bitterness or scorching"}
                  </h3>
                  <p className="text-[#1E2E25]/80 text-sm sm:text-base leading-relaxed">
                    {isFR 
                      ? "Révélez l'intensité pure des herbes fraîches et aromates. L'extraction thermique douce empêche l'apparition des composés brûlés et acides." 
                      : isDE
                      ? "Entfalten Sie das reine Aroma frischer Kräuter und Gewürze. Die sanfte thermische Extraktion verhindert verbrannte und bittere Noten."
                      : "Reveal pure aromatics from fresh herbs and spices. Gentle thermal extraction prevents burnt and bitter compounds."}
                  </p>
                  
                  {/* Fiche Exemple Concret */}
                  <div className="bg-white p-6 rounded-2xl border border-[#E7DFD3] space-y-3 shadow-xs">
                    <div className="text-xs font-black text-[#B45309] uppercase tracking-wider">
                      {isFR ? "Exemple de protocole culinaire :" : isDE ? "Beispiel für ein kulinarisches Protokoll:" : "Sample culinary protocol:"}
                    </div>
                    <div className="font-black text-lg text-[#1E2E25]">
                      {isFR ? "Huile d'olive infusée au Romarin, Piment doux & Ail" : isDE ? "Olivenöl infundiert mit Rosmarin, mildem Chili & Knoblauch" : "Rosemary, Mild Chili & Garlic Infused Olive Oil"}
                    </div>
                    <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#F3EEE6] text-center">
                      <div className="p-2 bg-[#FAF7F2] rounded-xl text-xs">
                        <span className="font-black text-[#1E2E25] block">38°C</span>
                        <span className="text-[10px] text-[#1E2E25]/70">{isFR ? "Température" : isDE ? "Temperatur" : "Temp"}</span>
                      </div>
                      <div className="p-2 bg-[#FAF7F2] rounded-xl text-xs">
                        <span className="font-black text-[#1E2E25] block">1h 30m</span>
                        <span className="text-[10px] text-[#1E2E25]/70">{isFR ? "Durée" : isDE ? "Dauer" : "Time"}</span>
                      </div>
                      <div className="p-2 bg-[#FAF7F2] rounded-xl text-xs">
                        <span className="font-black text-[#1E2E25] block">{isFR ? "Huile d'olive" : isDE ? "Olivenöl" : "Olive oil"}</span>
                        <span className="text-[10px] text-[#1E2E25]/70">{isFR ? "Solvant" : isDE ? "Lösungsmittel" : "Solvent"}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => onNavigate('culinaire')}
                    className="inline-flex items-center gap-2 text-sm font-bold text-[#1E2E25] hover:text-[#E8772E] transition-colors cursor-pointer"
                  >
                    <span>{isFR ? "Explorer les recettes culinaires" : isDE ? "Kulinarische Rezepte entdecken" : "Explore culinary recipes"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </>
              )}

              {activeUniverse === 'cosmetique' && (
                <>
                  <div className="inline-block px-3 py-1 bg-[#F5E6D8] text-[#B45309] text-xs font-bold uppercase tracking-wider rounded-full border border-[#E8772E]/30">
                    {isFR ? "Niveau 2 · Cosmétique Vivante" : isDE ? "Stufe 2 · Lebendige Naturkosmetik" : "Level 2 · Living Cosmetics"}
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-[#1E2E25]">
                    {isFR ? "Formulations Botaniques Cutanées Pures" : isDE ? "Reine botanische Hautpflege-Rezepturen" : "Pure Botanical Skin Formulations"}
                  </h3>
                  <p className="text-[#1E2E25]/80 text-sm sm:text-base leading-relaxed">
                    {isFR 
                      ? "Concevez vos propres sérums et macérats de soin sur-mesure. Les acides gras essentiels et antioxydants végétaux sont conservés intacts sans solvants pétrochimiques." 
                      : isDE
                      ? "Kreieren Sie maßgeschneiderte Seren und Pflegemazerate. Essentielle Fettsäuren und pflanzliche Antioxidantien bleiben ohne petrochemische Zusätze intakt."
                      : "Formulate custom serums and restorative macerates. Essential fatty acids and botanical antioxidants remain intact without petrochemical solvents."}
                  </p>

                  <div className="bg-white p-6 rounded-2xl border border-[#E7DFD3] space-y-3 shadow-xs">
                    <div className="text-xs font-black text-[#B45309] uppercase tracking-wider">
                      {isFR ? "Exemple de protocole cosmétique :" : isDE ? "Beispiel für ein Kosmetikprotokoll:" : "Sample cosmetic protocol:"}
                    </div>
                    <div className="font-black text-lg text-[#1E2E25]">
                      {isFR ? "Sérum précieux Passiflore, Rose de Damas & Jojoba" : isDE ? "Kostbares Serum aus Passionsblume, Damaszener-Rose & Jojoba" : "Passionflower, Damask Rose & Jojoba Serum"}
                    </div>
                    <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#F3EEE6] text-center">
                      <div className="p-2 bg-[#FAF7F2] rounded-xl text-xs">
                        <span className="font-black text-[#1E2E25] block">42°C</span>
                        <span className="text-[10px] text-[#1E2E25]/70">{isFR ? "Température" : isDE ? "Temperatur" : "Temp"}</span>
                      </div>
                      <div className="p-2 bg-[#FAF7F2] rounded-xl text-xs">
                        <span className="font-black text-[#1E2E25] block">2h 00m</span>
                        <span className="text-[10px] text-[#1E2E25]/70">{isFR ? "Durée" : isDE ? "Dauer" : "Time"}</span>
                      </div>
                      <div className="p-2 bg-[#FAF7F2] rounded-xl text-xs">
                        <span className="font-black text-[#1E2E25] block">{isFR ? "Huile de Jojoba" : isDE ? "Jojobaöl" : "Jojoba oil"}</span>
                        <span className="text-[10px] text-[#1E2E25]/70">{isFR ? "Solvant" : isDE ? "Lösungsmittel" : "Solvent"}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => onNavigate('cosmetiques')}
                    className="inline-flex items-center gap-2 text-sm font-bold text-[#1E2E25] hover:text-[#E8772E] transition-colors cursor-pointer"
                  >
                    <span>{isFR ? "Découvrir la cosmétique maison" : isDE ? "Naturkosmetik DIY entdecken" : "Discover homemade cosmetics"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </>
              )}

              {activeUniverse === 'phytotherapie' && (
                <>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-[#1E2E25] rounded-2xl flex items-center justify-center text-white shadow-sm">
                      <Activity className="w-6 h-6 text-[#E8772E]" />
                    </div>
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-[#B45309] block">
                        {isFR ? "Niveau 3" : isDE ? "Stufe 3" : "Level 3"}
                      </span>
                      <h3 className="text-xl md:text-2xl font-bold text-[#1E2E25]">
                        {isFR ? "Herboristerie Systémique & Reset" : isDE ? "Systemische Pflanzenkunde & Reset" : "Systemic Herbalism & Reset"}
                      </h3>
                    </div>
                  </div>
                  <p className="text-base text-[#1E2E25]/80 mb-6 leading-relaxed italic font-medium">
                    {isFR
                      ? "\"Accompagnez votre terrain en profondeur avec l'herboristerie de précision à domicile.\""
                      : isDE
                      ? "\"Fokus auf das biologische Terrain statt einzelner Symptome. Strukturierte Pflanzenkunde für zu Hause.\""
                      : "\"Focus on the biological terrain rather than isolated symptoms. Structured botanical practice at home.\""}
                  </p>
                  <p className="text-sm text-[#1E2E25]/75 mb-6 leading-relaxed">
                    {isFR ? (
                      <>
                        Accédez aux protocoles de <strong>Reset Homéostatique (84 jours)</strong>. Ciblez précisément vos terrains biologiques : T1 (Intestin/Leaky Gut), T4 (Axe HPA/Stress), ou T8 (Adipeux Viscéral) avec des extraits hyper-concentrés et biodisponibles.
                      </>
                    ) : isDE ? (
                      <>
                        Entdecken Sie unsere Protokolle zum <strong>Homöostatischen Reset (84 Tage)</strong> und lernen Sie, Ihre biologischen Terrains (T1 Darmbarriere, T4 HPA-Achse/Stress, T8 Stoffwechsel) mit hochkonzentrierten Extrakten zu begleiten.
                      </>
                    ) : (
                      <>
                        Access our <strong>Homeostatic Reset protocols (84 days)</strong> and learn to support your biological terrains (T1 Gut Barrier, T4 HPA Axis/Stress, T8 Metabolic balance) with concentrated, bioavailable botanical extracts.
                      </>
                    )}
                  </p>
                  <button 
                    onClick={() => onNavigate('library')} 
                    className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#E8772E] hover:bg-[#D4651F] active:bg-[#D4651F] text-white rounded-xl text-sm font-black transition-all shadow-lg shadow-orange-900/20 cursor-pointer"
                  >
                    <span>{isFR ? "Explorer les Protocoles Systémiques" : isDE ? "Systemische Protokolle entdecken" : "Explore Systemic Protocols"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>

            {/* Visuel immersif de pratique */}
            <div className="relative rounded-3xl overflow-hidden shadow-xl border border-[#E7DFD3] h-[340px] sm:h-[420px]">
              <img 
                src={activeUniverse === 'culinaire' ? herbsImg : activeUniverse === 'cosmetique' ? bloomSoinsImg : shelvesImg} 
                alt={activeUniverse === 'culinaire' ? "Infuseur végétal et herbes aromatiques pour gastronomie botanique" : activeUniverse === 'cosmetique' ? "Extracteur de plantes maison pour macérâts et cosmétique botanique" : "Atelier d'herboristerie maison et extraction de principes actifs"} 
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white text-xs font-medium">
                {isFR
                  ? "Précision reproductible à domicile · Extraction du Totum végétal"
                  : isDE
                  ? "Reproduzierbare Präzision für zu Hause · Extraktion des Pflanzen-Totums"
                  : "Reproducible home precision · Whole-plant Totum extraction"}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* BLOC 7 : COMPARATIF HONNÊTE (4 colonnes) */}
      {/* ========================================================================= */}
      <section id="comparatif" className="py-16 md:py-24 bg-[#FAF7F2]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-block px-4 py-1.5 bg-[#F5E6D8] text-[#1E2E25] text-[10px] font-bold uppercase tracking-widest rounded-md border border-[#E8772E]/20">
              {isFR ? '6. Comparatif Honnête' : isDE ? '6. Ehrlicher Vergleich' : '6. Honest Comparison'}
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1E2E25] tracking-tight">
              {isFR 
                ? "Pourquoi choisir BloomLab® plutôt qu'une casserole ou un mixeur chauffant ?" 
                : isDE 
                ? "Warum BloomLab® statt Kochtopf oder Heizmixer wählen?" 
                : "Why choose BloomLab® over a saucepan or a heated blender?"}
            </h2>
          </div>

          <div className="overflow-x-auto bg-white rounded-[32px] border border-[#E7DFD3] shadow-md">
            <table className="w-full text-left border-collapse min-w-[680px]">
              <thead>
                <tr className="bg-[#1E2E25] text-white text-xs sm:text-sm uppercase tracking-wider">
                  <th className="p-5 sm:p-6 font-black">{isFR ? "Critère" : isDE ? "Kriterium" : "Criterion"}</th>
                  <th className="p-5 sm:p-6 font-bold text-white/75">{isFR ? "Casserole / Bain-marie" : isDE ? "Kochtopf / Wasserbad" : "Saucepan / Double-boiler"}</th>
                  <th className="p-5 sm:p-6 font-bold text-white/75">{isFR ? "Mixeurs chauffants (type MagicalButter)" : isDE ? "Beheizte Mixer (z. B. MagicalButter)" : "Heated Blenders (e.g. MagicalButter)"}</th>
                  <th className="p-5 sm:p-6 font-black text-[#E8772E]">{isFR ? "Infuseur BloomLab®" : isDE ? "BloomLab® Infuser" : "BloomLab® Infuser"}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F3EEE6] text-xs sm:text-sm">
                <tr>
                  <td className="p-5 sm:p-6 font-black text-[#1E2E25]">{isFR ? "Préservation du goût" : isDE ? "Geschmackserhalt" : "Flavor preservation"}</td>
                  <td className="p-5 sm:p-6 text-slate-600">{isFR ? "Souvent brûlé ou amer" : isDE ? "Oft angebrannt oder bitter" : "Often scorched or bitter"}</td>
                  <td className="p-5 sm:p-6 text-slate-600">{isFR ? "Lames qui hachent la plante (goût vert/amer de chlorophylle)" : isDE ? "Messer zerkleinern Pflanzen (bitterer Chlorophyllgeschmack)" : "Blades chop herbs (bitter green chlorophyll taste)"}</td>
                  <td className="p-5 sm:p-6 font-bold text-emerald-800 bg-emerald-50/40">{isFR ? "Brassage doux sans broyer : arômes purs préservés" : isDE ? "Sanftes Rühren ohne Zerkleinern: reine Aromen" : "Gentle stirring without shredding: pure aromas preserved"}</td>
                </tr>
                <tr className="bg-[#FAF7F2]/40">
                  <td className="p-5 sm:p-6 font-black text-[#1E2E25]">{isFR ? "Matériau de la cuve" : isDE ? "Behältermaterial" : "Chamber material"}</td>
                  <td className="p-5 sm:p-6 text-slate-600">{isFR ? "Variable (souvent aluminium ou revêtement)" : isDE ? "Variabel (oft Aluminium oder Beschichtung)" : "Variable (often aluminum or coated)"}</td>
                  <td className="p-5 sm:p-6 text-slate-600">{isFR ? "Acier ou revêtements parfois collants / nettoyage difficile" : isDE ? "Stahl oder klebrige Beschichtung / schwer zu reinigen" : "Steel or sticky coatings / hard to clean"}</td>
                  <td className="p-5 sm:p-6 font-bold text-emerald-800 bg-emerald-50/60">{isFR ? "Cuve 100 % Inox 304 alimentaire sans revêtement chimique" : isDE ? "100 % Edelstahl 304 ohne chemische Beschichtung" : "100% food-grade 304 stainless steel, zero chemical coating"}</td>
                </tr>
                <tr>
                  <td className="p-5 sm:p-6 font-black text-[#1E2E25]">{isFR ? "Précision thermique" : isDE ? "Temperaturpräzision" : "Thermal precision"}</td>
                  <td className="p-5 sm:p-6 text-slate-600">{isFR ? "Aléatoire (±10 à 15 °C)" : isDE ? "Zufällig (±10 bis 15 °C)" : "Unpredictable (±10 to 15°C)"}</td>
                  <td className="p-5 sm:p-6 text-slate-600">{isFR ? "Paliers fixes approximatifs" : isDE ? "Grobe feste Stufen" : "Approximate fixed presets"}</td>
                  <td className="p-5 sm:p-6 font-bold text-emerald-800 bg-emerald-50/40">{isFR ? "Régulation numérique guidée (spéc. nominale ±0,5 °C)" : isDE ? "Geführte Digitalregelung (Nennwert ±0,5 °C)" : "Guided digital regulation (nominal ±0.5°C spec)"}</td>
                </tr>
                <tr className="bg-[#FAF7F2]/40">
                  <td className="p-5 sm:p-6 font-black text-[#1E2E25]">{isFR ? "Accompagnement" : isDE ? "Begleitung" : "Guidance"}</td>
                  <td className="p-5 sm:p-6 text-slate-600">{isFR ? "Aucun" : isDE ? "Keine" : "None"}</td>
                  <td className="p-5 sm:p-6 text-slate-600">{isFR ? "Brochure basique en anglais" : isDE ? "Basisbroschüre auf Englisch" : "Basic brochure"}</td>
                  <td className="p-5 sm:p-6 font-bold text-emerald-800 bg-emerald-50/60">{isFR ? "Guide digital 100 recettes en français + Bloom Academy" : isDE ? "Digitaler 100-Rezepte-Leitfaden + Bloom Academy" : "100-recipe digital guide + Bloom Academy"}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="text-center pt-4">
            <p className="text-lg md:text-xl font-black text-[#1E2E25] max-w-2xl mx-auto leading-relaxed">
              {isFR 
                ? "« Vous n'avez pas besoin de plus de recettes. Vous avez besoin d'une méthode que vous pouvez répéter. »" 
                : isDE 
                ? "« Sie brauchen nicht mehr Rezepte. Sie brauchen eine Methode, die Sie wiederholen können. »" 
                : "« You don't need more recipes. You need a method you can repeat. »"}
            </p>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* BLOC 8 : PREUVE SOCIALE EXTERNE VÉRIFIABLE (Amazon.fr) */}
      {/* ========================================================================= */}
      <section id="avis" className="py-20 md:py-24 bg-white border-t border-[#F3EEE6]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-block px-4 py-1.5 bg-[#F5E6D8] text-[#1E2E25] text-[10px] font-bold uppercase tracking-widest rounded-md border border-[#E8772E]/20">
              {isFR ? '7. Évaluations Clients Vérifiées' : isDE ? '7. Verifizierte Kundenbewertungen' : '7. Verified Customer Reviews'}
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1E2E25] tracking-tight">
              {isFR ? "Retours vérifiés sur Amazon.fr" : isDE ? "Verifizierte Bewertungen auf Amazon.fr" : "Verified feedback on Amazon.fr"}
            </h2>
            <p className="text-[#1E2E25]/80 text-base sm:text-lg">
              {isFR 
                ? "Les seuls avis clients agrégés que nous affichons proviennent de la fiche produit publique Amazon.fr, consultable librement." 
                : isDE
                ? "Wir zeigen ausschließlich die öffentlich einsehbaren Kundenbewertungen der Produktseite auf Amazon.fr an."
                : "We only display publicly verifiable customer ratings published on the Amazon.fr product listing."}
            </p>
          </div>

          {/* Preuve sociale cross-canal : agrégat Amazon réel + flywheel activation */}
          <AmazonSocialProof lang={lang as 'fr' | 'en' | 'de'} onNavigate={onNavigate} />

        </div>

      </section>

      {/* ========================================================================= */}
      {/* BLOC 9 : ORIGINES (Sagesse Ancienne & Instrument Moderne) */}
      {/* Rôle : Donner du sens et de la profondeur sans surcharge */}
      {/* ========================================================================= */}
      {/* 4. BRAND HERITAGE & ETHNOBOTANY */}
      <section className="heritage-section py-20 md:py-28 bg-[#FAF7F2] border-t border-[#3E4A3D]/5 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
            <div className="inline-block px-4 py-1.5 bg-[#F5E6D8] text-[#1E2E25] text-[10px] font-bold uppercase tracking-widest rounded-md border border-[#E8772E]/20">
              {isFR ? '8. Héritage & Pharmacopée' : isDE ? '8. Erbe & Pharmakopöe' : '8. Heritage & Pharmacopoeia'}
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-[#1E2E25] tracking-tight">
              {isFR ? "L'ingénierie moderne au service des textes fondateurs" : isDE ? "Moderne Technik im Dienste der Grundlagentexte" : "Modern engineering serving foundational texts"}
            </h2>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F5E6D8] text-[#B45309] border border-[#E8772E]/30 text-xs font-bold uppercase tracking-widest">
              <Compass className="w-3.5 h-3.5 text-[#B45309]" />
              <span>{isFR ? "Ethnobotanique & Pharmacopée Ancestrale" : isDE ? "Ethnobotanik & Traditionelle Pharmakopöe" : "Ethnobotany & Ancestral Pharmacopoeia"}</span>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 sm:p-12 md:p-14 border border-[#E7DFD3] shadow-xl relative overflow-hidden">
            <div className="absolute top-6 right-8 text-[#C8AB8A]/15 select-none pointer-events-none text-8xl ">“</div>
            
            <div className="max-w-none text-[#1E2E25]/85 space-y-6 text-base sm:text-lg leading-relaxed font-light">
              <p className="first-letter:text-5xl first-letter:first-letter:font-bold first-letter:text-[#B45309] first-letter:mr-3 first-letter:float-left">
                {isFR ? (
                  <>
                    La BloomLab n'est pas une invention ex nihilo. Elle est la réponse technologique aux limites des textes fondateurs. Dans l'Ayurveda, la méthode du <em>Taila Paka</em> (cuisson lente des huiles médicinales) exigeait un contrôle visuel et tactile épuisant pour éviter que les plantes ne carbonisent. Dans la pharmacopée chinoise du <em>Shennong Ben Cao Jing</em>, on savait déjà que certaines racines exigeaient des décoctions longues, tandis que les fleurs nécessitaient des infusions flash.
                  </>
                ) : isDE ? (
                  <>
                    Die BloomLab ist keine Erfindung aus dem Nichts. Sie ist die technologische Antwort auf die Grenzen der historischen Grundlagentexte. Im Ayurveda erforderte die Methode <em>Taila Paka</em> (schonendes Köcheln botanischer Öle) ständige visuelle und taktile Kontrolle, um ein Verbrennen der Pflanzen zu verhindern. In der chinesischen Pharmakopöe des <em>Shennong Ben Cao Jing</em> war bereits bekannt, dass Wurzeln lange Dekokte verlangen, während Blüten kurze Flash-Infusionen benötigen.
                  </>
                ) : (
                  <>
                    BloomLab is not an invention from scratch. It is the technological answer to the practical limits of foundational texts. In Ayurveda, the <em>Taila Paka</em> method (slow simmering of botanical oils) required exhausting visual and tactile monitoring to prevent plants from scorching. In the Chinese pharmacopoeia of the <em>Shennong Ben Cao Jing</em>, practitioners already knew roots demanded long decoctions while flowers needed brief flash infusions.
                  </>
                )}
              </p>
              <p>
                {isFR ? (
                  <>
                    Le drame de l'herboristerie occidentale moderne a été de tout réduire à l'eau bouillante, ignorant la <strong>polarité des solvants</strong> et la <strong>thermolabilité des enzymes</strong>. La BloomLab rapproche la sagesse empirique de l'Orient avec les méthodes de la biochimie moderne via la <strong>Double Extraction Intelligente A/B</strong> (extraction hydrophile puis lipophile, spécification nominale fabricant annoncée à ±0,5 °C).
                  </>
                ) : isDE ? (
                  <>
                    Das Versäumnis der modernen westlichen Kräuterkunde lag darin, alles auf kochendes Wasser zu reduzieren und die <strong>Polarität der Lösungsmittel</strong> sowie die <strong>Wärmeempfindlichkeit der Enzyme</strong> zu ignorieren. Die BloomLab verbindet östliche Erfahrungskunde mit moderner Biochemie und ermöglicht <strong>Aktive A/B-Sequenzierung</strong> (hydrophile und lipophile Extraktion, Hersteller-Nennwert ±0,5 °C).
                  </>
                ) : (
                  <>
                    The shortcoming of modern Western herbalism has been reducing everything to boiling water, ignoring <strong>solvent polarity</strong> and <strong>thermal sensitivity of enzymes</strong>. BloomLab bridges empirical Eastern wisdom with 21st-century biochemistry, enabling <strong>Active A/B Sequencing</strong> (hydrophilic then lipophilic extraction, manufacturer nominal ±0.5°C rating).
                  </>
                )}
              </p>
            </div>

            <div className="mt-8 pt-8 border-t border-[#E7DFD3] flex items-center gap-4 bg-[#FAF7F2] -mx-8 -mb-8 sm:-mx-12 sm:-mb-12 md:-mx-14 md:-mb-14 p-6 sm:p-8 rounded-b-3xl">
              <div className="w-12 h-12 rounded-2xl bg-[#1E2E25] text-white flex items-center justify-center shrink-0 shadow-md">
                <Activity className="w-6 h-6 text-[#E8772E]" />
              </div>
              <p className="text-sm sm:text-base italic text-[#1E2E25] font-medium leading-snug">
                {isFR
                  ? "« Nous n'avons pas réinventé la plante. Nous avons domestiqué la cinétique d'extraction pour que le Totum arrive intact jusqu'à vos récepteurs cellulaires. »"
                  : isDE
                  ? "« Wir haben die Pflanze nicht neu erfunden. Wir haben die Extraktionskinetik gemeistert, damit das vollständige Pflanzen-Totum intakt bewahrt bleibt. »"
                  : "« We didn't reinvent the plant. We mastered extraction kinetics so the whole botanical Totum remains intact. »"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* BLOC 10 : FAQ (Avant le prix) */}
      {/* Rôle : Lever tous les doutes rationnels avant le closing */}
      {/* ========================================================================= */}
      <section id="faq" className="py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-block px-4 py-1.5 bg-[#F5E6D8] text-[#1E2E25] text-[10px] font-bold uppercase tracking-widest rounded-md border border-[#E8772E]/20">
              {isFR ? '9. Foire Aux Questions' : isDE ? '9. Häufige Fragen' : '9. FAQ'}
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#1E2E25] tracking-tight">
              {isFR 
                ? "Tout ce que vous devez savoir avant de commander" 
                : isDE 
                ? "Alles, was Sie vor der Bestellung wissen sollten" 
                : "Everything you need to know before ordering"}
            </h2>
          </div>

          <div className="space-y-4">
            {homeFaqItems.map((item, idx) => (
              <div key={idx} className="border border-[#E7DFD3] rounded-2xl overflow-hidden transition-all bg-[#FAF7F2]">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-6 text-left font-bold text-[#1E2E25] flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="text-base sm:text-lg">{item.q}</span>
                  {openFaq === idx ? <ChevronUp className="w-5 h-5 text-[#E8772E] shrink-0" /> : <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />}
                </button>
                {openFaq === idx && (
                  <div className="px-6 pb-6 pt-2 text-[#1E2E25]/80 text-sm leading-relaxed border-t border-[#E7DFD3] bg-white">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* BLOC 11 : DÉPART GUIDÉ (CRÉÉ) */}
      {/* Rôle : Orienter chaque profil d'utilisateur selon sa situation */}
      {/* ========================================================================= */}
      <section id="depart-guide" className="py-16 md:py-24 bg-[#FAF7F2] border-t border-[#F3EEE6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-block px-4 py-1.5 bg-[#F5E6D8] text-[#1E2E25] text-[10px] font-bold uppercase tracking-widest rounded-md border border-[#E8772E]/20">
              {isFR ? '10. Orientation Personnalisée' : isDE ? '10. Orientierung' : '10. Guided Start'}
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1E2E25] tracking-tight">
              {isFR ? "Par où commencer sans vous tromper ?" : isDE ? "Wo beginnen, ohne Fehler zu machen?" : "Where to start without making mistakes?"}
            </h2>
            <p className="text-[#1E2E25]/80 text-base sm:text-lg">
              {isFR 
                ? "Choisissez votre point d'entrée selon votre niveau de pratique actuel." 
                : isDE
                ? "Wählen Sie Ihren Einstiegspunkt je nach Ihrem aktuellen Erfahrungsstand."
                : "Choose your entry point based on your current experience level."}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-[28px] border border-[#E7DFD3] flex flex-col justify-between space-y-4 hover:shadow-lg transition-all">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold">
                  <BookOpen className="w-5 h-5" />
                </div>
                <h3 className="font-black text-lg text-[#1E2E25]">
                  {isFR ? "Je découvre les plantes" : isDE ? "Ich entdecke die Pflanzen" : "Discovering plants"}
                </h3>
                <p className="text-xs text-[#1E2E25]/75 leading-relaxed">
                  {isFR
                    ? "Apprenez à reconnaître les familles moléculaires et leurs précautions d'usage."
                    : isDE
                    ? "Lernen Sie Pflanzenfamilien, aktive Inhaltsstoffe und sichere Anwendungshinweise kennen."
                    : "Learn to identify molecular families and safe botanical practices."}
                </p>
              </div>
              <button
                onClick={() => onNavigate('herbier')}
                className="w-full py-3 bg-[#FAF7F2] hover:bg-[#1E2E25] hover:text-white border border-[#E7DFD3] text-[#1E2E25] text-xs font-black rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{isFR ? "Explorer l'Herbier" : isDE ? "Herbarium entdecken" : "Explore Herbarium"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="bg-white p-6 rounded-[28px] border border-[#E7DFD3] flex flex-col justify-between space-y-4 hover:shadow-lg transition-all">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-[#B45309] flex items-center justify-center font-bold">
                  <FileText className="w-5 h-5" />
                </div>
                <h3 className="font-black text-lg text-[#1E2E25]">
                  {isFR ? "Je veux ma 1ère recette" : isDE ? "Mein erstes Rezept" : "My first recipe"}
                </h3>
                <p className="text-xs text-[#1E2E25]/75 leading-relaxed">
                  {isFR
                    ? "Accédez à nos 10 protocoles d'initiation culinaire et cosmétique gratuits."
                    : isDE
                    ? "Greifen Sie kostenlos auf unsere 10 Einsteiger-Protokolle für Küche und Naturkosmetik zu."
                    : "Access our 10 free culinary and cosmetic beginner recipes."}
                </p>
              </div>
              <button
                onClick={() => onNavigate('recettes')}
                className="w-full py-3 bg-[#FAF7F2] hover:bg-[#1E2E25] hover:text-white border border-[#E7DFD3] text-[#1E2E25] text-xs font-black rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{isFR ? "Voir les recettes" : isDE ? "Rezepte ansehen" : "View recipes"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="bg-white p-6 rounded-[28px] border border-[#E7DFD3] flex flex-col justify-between space-y-4 hover:shadow-lg transition-all">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-800 flex items-center justify-center font-bold">
                  <Microscope className="w-5 h-5" />
                </div>
                <h3 className="font-black text-lg text-[#1E2E25]">
                  {isFR ? "J'ai déjà BloomLab" : isDE ? "Ich besitze BloomLab" : "I already own BloomLab"}
                </h3>
                <p className="text-xs text-[#1E2E25]/75 leading-relaxed">
                  {isFR
                    ? "Consultez la Bibliothèque Scientifique et les fiches techniques avancées."
                    : isDE
                    ? "Entdecken Sie die Wissenschaftliche Bibliothek und fortgeschrittene Fachprotokolle."
                    : "Consult the Scientific Library and advanced technical protocols."}
                </p>
              </div>
              <button
                onClick={() => onNavigate('library-landing')}
                className="w-full py-3 bg-[#FAF7F2] hover:bg-[#1E2E25] hover:text-white border border-[#E7DFD3] text-[#1E2E25] text-xs font-black rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{isFR ? "Accéder aux fiches" : isDE ? "Zur Bibliothek" : "Access Library"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="bg-[#1E2E25] text-[#F9F6F0] p-6 rounded-[28px] border border-[#1E2E25] flex flex-col justify-between space-y-4 shadow-xl">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-[#E8772E] text-white flex items-center justify-center font-bold">
                  <FlaskConical className="w-5 h-5" />
                </div>
                <h3 className="font-black text-lg text-white">
                  {isFR ? "Je veux m'équiper" : isDE ? "Ich möchte ausrüsten" : "I want to get equipped"}
                </h3>
                <p className="text-xs text-[#F9F6F0]/80 font-medium leading-relaxed">
                  {isFR
                    ? "Commandez votre BloomLab® Inox 304 (expédition 24/48h, garantie légale 2 ans UE + commerciale 1 an) et démarrez dès cette semaine."
                    : isDE
                    ? "Bestellen Sie Ihre BloomLab® (Versand in 24/48h, 2 J. gesetzl. Gewährleistung EU + 1 J. Garantie) und starten Sie diese Woche."
                    : "Order your BloomLab® (24/48h shipping, 2-year EU legal + 1-year commercial warranty) and get started this week."}
                </p>
              </div>
              <button
                onClick={() => {
                  const el = document.getElementById('commande');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full py-3 bg-[#E8772E] hover:bg-[#D4651F] text-white text-xs font-black rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-orange-900/20"
              >
                <span>{isFR ? "Choisir mon pack" : isDE ? "Paket wählen" : "Choose my pack"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Passerelle Atelier à Façon */}
          <div className="p-6 md:p-8 bg-white rounded-3xl border border-[#E7DFD3] flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left shadow-xs">
            <div className="space-y-1">
              <div className="text-xs font-black uppercase tracking-wider text-[#E8772E]">
                {isFR ? "Service d'extraction à façon" : isDE ? "Auftragsextraktions-Service" : "Custom extraction workshop"}
              </div>
              <p className="text-sm md:text-base text-[#1E2E25] font-bold">
                {isFR 
                  ? "« Envie de tester sans la machine ? Confiez vos plantes à notre atelier d'extraction à façon. »" 
                  : isDE
                  ? "« Möchten Sie ohne Gerät testen? Vertrauen Sie Ihre Pflanzen unserer Manufaktur an. »"
                  : "« Want to test without the machine? Entrust your herbs to our custom extraction workshop. »"}
              </p>
            </div>
            <button
              onClick={() => onNavigate('contact')}
              className="px-6 py-3 bg-[#FAF7F2] hover:bg-[#1E2E25] hover:text-white border border-[#E7DFD3] text-[#1E2E25] text-xs font-black rounded-xl transition-all whitespace-nowrap cursor-pointer shrink-0"
            >
              {isFR ? "Contacter l'atelier" : isDE ? "Atelier kontaktieren" : "Contact the workshop"}
            </button>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* BLOC 11.5 : PONT D'ENTRÉE À PETIT PRIX ("Pas encore prêt pour la machine ?") */}
      {/* ========================================================================= */}
      <section id="entree-plantes" className="py-16 md:py-20 bg-[#FAF7F2] border-t border-[#F3EEE6]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="inline-block px-4 py-1.5 bg-[#F5E6D8] text-[#1E2E25] text-[10px] font-bold uppercase tracking-widest rounded-md border border-[#E8772E]/20">
              {isFR ? "Pas encore prêt pour la machine ?" : isDE ? "Noch nicht bereit für das Gerät?" : "Not ready for the machine yet?"}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#1E2E25] tracking-tight">
              {isFR
                ? "Découvrez l'efficacité de nos plantes avant même de vous équiper."
                : isDE
                ? "Entdecken Sie die Qualität unserer Pflanzen, noch bevor Sie sich ausrüsten."
                : "Discover the quality of our botanicals before equipping yourself."}
            </h2>
            <p className="text-[#1E2E25]/80 text-sm sm:text-base leading-relaxed">
              {isFR
                ? "Vous voulez tester la qualité de nos mélanges botaniques dans votre théière ou vos soins quotidiens avant d'investir dans l'extracteur ? Commencez ici :"
                : isDE
                ? "Sie möchten unsere Pflanzenmischungen erst in Ihrer Teekanne oder täglichen Pflege testen? Starten Sie hier:"
                : "Want to test our botanical blends in your teapot or daily care before investing in the extractor? Start here:"}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <button
              type="button"
              onClick={() => onNavigate('product-detail', 'kit-starter')}
              className="p-6 rounded-3xl bg-white border border-[#E7DFD3] hover:border-[#E8772E] text-left transition-all cursor-pointer flex flex-col justify-between space-y-3 shadow-xs"
            >
              <div className="space-y-1.5">
                <div className="text-sm font-black text-[#E8772E]">12,90 €</div>
                <div className="font-black text-base text-[#1E2E25]">
                  {isFR ? "Kit Sève Fondamentale" : isDE ? "Kit Sève Fondamentale" : "Fundamental Sap Kit"}
                </div>
                <p className="text-xs text-[#1E2E25]/75">
                  {isFR ? "Mélange botanique de départ pour vos préparations maison." : isDE ? "Botanische Starter-Mischung für Zuhause." : "Starter botanical blend for home infusions."}
                </p>
              </div>
              <span className="text-xs font-bold text-[#1E2E25] inline-flex items-center gap-1">
                <span>{isFR ? "Découvrir" : isDE ? "Entdecken" : "Explore"}</span> <ArrowRight className="w-3.5 h-3.5 text-[#E8772E]" />
              </span>
            </button>

            <button
              type="button"
              onClick={() => onNavigate('boutique-kits')}
              className="p-6 rounded-3xl bg-white border border-[#E7DFD3] hover:border-[#E8772E] text-left transition-all cursor-pointer flex flex-col justify-between space-y-3 shadow-xs"
            >
              <div className="space-y-1.5">
                <div className="text-sm font-black text-[#E8772E]">9,90 €</div>
                <div className="font-black text-base text-[#1E2E25]">
                  {isFR ? "Kits Nuit Profonde / Confort Digestif / Feu Articulaire" : isDE ? "Kits Tiefe Nacht / Verdauungskomfort / Gelenkkomfort" : "Deep Night / Digestive Comfort / Joint Kits"}
                </div>
                <p className="text-xs text-[#1E2E25]/75">
                  {isFR ? "Mélanges de plantes ciblés prêts à infuser." : isDE ? "Gezielte Bio-Kräutermischungen." : "Targeted organic herbal blends ready to infuse."}
                </p>
              </div>
              <span className="text-xs font-bold text-[#1E2E25] inline-flex items-center gap-1">
                <span>{isFR ? "Choisir mon mélange" : isDE ? "Mischung wählen" : "Choose my blend"}</span> <ArrowRight className="w-3.5 h-3.5 text-[#E8772E]" />
              </span>
            </button>

            <button
              type="button"
              onClick={() => onNavigate('product-detail', 'duo-argiles')}
              className="p-6 rounded-3xl bg-white border border-[#E7DFD3] hover:border-[#E8772E] text-left transition-all cursor-pointer flex flex-col justify-between space-y-3 shadow-xs"
            >
              <div className="space-y-1.5">
                <div className="text-sm font-black text-[#E8772E]">34,00 €</div>
                <div className="font-black text-base text-[#1E2E25]">
                  {isFR ? "Duo Argiles" : isDE ? "Tonerde-Duo" : "Clay Duo"}
                </div>
                <p className="text-xs text-[#1E2E25]/75">
                  {isFR ? "Zéolithe-Bentonite 70:30 — Purification minérale externe/soin." : isDE ? "Zeolith-Bentonit 70:30 — Mineralische Reinigung/Pflege." : "Zeolite-Bentonite 70:30 — External/care mineral purification."}
                </p>
              </div>
              <span className="text-xs font-bold text-[#1E2E25] inline-flex items-center gap-1">
                <span>{isFR ? "Voir la fiche" : isDE ? "Details ansehen" : "View product"}</span> <ArrowRight className="w-3.5 h-3.5 text-[#E8772E]" />
              </span>
            </button>

            <button
              type="button"
              onClick={() => onNavigate('product-detail', 'bundle-apothicaire')}
              className="p-6 rounded-3xl bg-[#FFF8F0] border-2 border-[#E8772E]/60 hover:border-[#E8772E] text-left transition-all cursor-pointer flex flex-col justify-between space-y-3 shadow-sm relative lg:col-span-2"
            >
              <span className="inline-block self-start px-3 py-1 rounded-full bg-[#E8772E] text-white text-[10px] font-black uppercase tracking-wider">
                {isFR ? "Meilleure vente découverte" : isDE ? "Entdecker-Bestseller" : "Discovery Best-Seller"}
              </span>
              <div className="space-y-1.5">
                <div className="text-lg font-black text-[#E8772E]">49,00 €</div>
                <div className="font-black text-lg text-[#1E2E25]">
                  {isFR ? "L'Herbier Complet (Les 4 mélanges + Duo Argiles)" : isDE ? "Das vollständige Herbarium (4 Mischungen + Tonerde-Duo)" : "The Complete Herbarium (4 Blends + Clay Duo)"}
                </div>
                <p className="text-xs sm:text-sm text-[#1E2E25]/80">
                  {isFR ? "Le coffret complet de démarrage avec toutes nos plantes phares et le Duo Argiles." : isDE ? "Das komplette Pflanzen-Starterpaket mit allen vier Mischungen und dem Tonerde-Duo." : "Complete discovery set with all 4 flagship herbal blends and the Clay Duo."}
                </p>
              </div>
              <span className="text-xs font-black text-[#1E2E25] inline-flex items-center gap-1">
                <span>{isFR ? "Commander L'Herbier Complet" : isDE ? "Herbarium bestellen" : "Order Complete Herbarium"}</span> <ArrowRight className="w-3.5 h-3.5 text-[#E8772E]" />
              </span>
            </button>

            <button
              type="button"
              onClick={() => {
                const el = document.getElementById('sortie');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="p-6 rounded-3xl bg-[#1E2E25] text-white border border-[#1E2E25] hover:bg-[#2D372C] text-left transition-all cursor-pointer flex flex-col justify-between space-y-3 shadow-md"
            >
              <div className="space-y-1.5">
                <div className="text-sm font-black text-[#E8772E]">
                  {isFR ? "Gratuit (contre inscription email)" : isDE ? "Kostenlos (per E-Mail-Anmeldung)" : "Free (via email signup)"}
                </div>
                <div className="font-black text-base text-white">
                  {isFR ? "Guide Découverte — 10 Recettes Gratuites" : isDE ? "Entdecker-Leitfaden — 10 Gratismuster" : "Discovery Guide — 10 Free Recipes"}
                </div>
                <p className="text-xs text-white/75">
                  {isFR ? "Recevez nos 10 recettes pas-à-pas directement par email." : isDE ? "Erhalten Sie 10 Schritt-für-Schritt-Rezepte per E-Mail." : "Receive 10 step-by-step recipes directly by email."}
                </p>
              </div>
              <span className="text-xs font-black text-[#C8AB8A] inline-flex items-center gap-1">
                <span>{isFR ? "Recevoir le guide gratuit" : isDE ? "Gratis-Leitfaden erhalten" : "Get free guide"}</span> <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* BLOC 12 : CLOSING / OFFRES (SEUL BLOC PRIX MACHINE DE LA PAGE) */}
      {/* ========================================================================= */}
      <section id="commande" className="py-16 md:py-24 bg-white border-t border-[#F3EEE6]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-block px-4 py-1.5 bg-[#F5E6D8] text-[#1E2E25] text-[10px] font-bold uppercase tracking-widest rounded-md border border-[#E8772E]/20">
              {isFR ? '11. Offres & Configurations BloomLab®' : isDE ? '11. BloomLab® Angebote' : '11. BloomLab® Offers & Configurations'}
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1E2E25] tracking-tight">
              {isFR ? "Choisissez votre équipement BloomLab®" : isDE ? "Wählen Sie Ihre BloomLab®-Ausstattung" : "Choose your BloomLab® equipment"}
            </h2>
            <p className="text-[#1E2E25]/80 text-base sm:text-lg">
              {isFR 
                ? "Expédition sous 24/48h • Garantie légale 2 ans (UE) + commerciale 1 an • Paiement en 3x sans frais." 
                : isDE
                ? "Versand in 24/48h • 2 J. gesetzl. Gewährleistung (EU) + 1 J. Garantie • 3x zinsfreie Ratenzahlung."
                : "24/48h Shipping • 2-Yr EU Legal + 1-Yr Commercial Warranty • 3x fee-free payment."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            
            {/* Offre 1 : BloomLab® Solo 229€ */}
            <div className="bg-[#FAF7F2] p-8 md:p-10 rounded-[40px] border border-[#E7DFD3] space-y-8 shadow-sm flex flex-col justify-between">
              <div className="space-y-6">
                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider bg-slate-200 text-slate-700 px-3 py-1 rounded-full">
                    {isFR ? "L'essentiel pour démarrer" : isDE ? "Die Basis zum Starten" : "The essentials to start"}
                  </span>
                  <h3 className="text-2xl font-black text-[#1E2E25] pt-2">BloomLab® Solo</h3>
                </div>

                <div className="space-y-1">
                  <div className="flex flex-wrap items-baseline gap-3">
                    <div className="text-4xl font-black text-[#1E2E25]">229 €</div>
                    <div className="text-xl text-slate-400 line-through">289 €</div>
                    <span className="text-xs font-bold uppercase tracking-wider bg-[#F5E6D8] text-[#B45309] border border-[#E8772E]/30 px-2.5 py-0.5 rounded-full">
                      {isFR ? "Économisez 60 €" : isDE ? "60 € sparen" : "Save €60"}
                    </span>
                  </div>
                  <div className="text-xs font-bold text-emerald-700">
                    {isFR ? "ou 3x 76,33 € sans frais" : isDE ? "oder 3x 76,33 € zinsfrei" : "or 3x €76.33 fee-free"}
                  </div>
                </div>

                <ul className="space-y-3 pt-2">
                  <li className="flex items-start gap-3 text-sm font-medium text-[#1E2E25]/90">
                    <Check className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{isFR ? "Infuseur botanique de précision BloomLab® (Cuve 100 % Inox 304, 6 programmes automatisés 0 à 121 °C)" : isDE ? "Botanischer Präzisions-Infuser BloomLab® (100 % Edelstahl 304, 6 Programme 0–121 °C)" : "BloomLab® Precision Botanical Infuser (100% 304 Steel, 6 automated programs 0–121°C)"}</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm font-medium text-[#1E2E25]/90">
                    <Check className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{isFR ? "Panier de filtration micrométrique (90 microns)" : isDE ? "Mikrometrischer Filterkorb (90 Mikron)" : "Micrometric filter basket (90 microns)"}</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm font-medium text-[#1E2E25]/90">
                    <Check className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      {isFR
                        ? "5 Accessoires offerts : 1 flacon pipette 100 ml verre opaque + 1 pot crème 50 g verre opaque + 1 distributeur de sérum cuir chevelu + 1 sac de filtration 90 µm + 1 gant silicone anti-brûlure"
                        : isDE
                        ? "5 Gratis-Zubehörteile: 100-ml-Pipettenflasche aus blickdichtem Glas + 50-g-Cremetiegel + Kopfhaut-Serumspender + 90-µm-Filterbeutel + Silikonhandschuh"
                        : "5 Free Accessories: 100ml opaque glass dropper bottle + 50g opaque cream jar + scalp serum dispenser + 90 µm filtration bag + silicone glove"}
                    </span>
                  </li>
                  <li className="flex items-start gap-3 text-sm font-medium text-[#1E2E25]/90">
                    <Check className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{isFR ? "Manuel complet et 100 recettes exclusives en français" : isDE ? "Vollständiges Handbuch & 100 exklusive Rezepte" : "Complete manual and 100 exclusive recipes"}</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm font-medium text-[#1E2E25]/90">
                    <Check className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{isFR ? "Garantie légale 2 ans (UE) + commerciale 1 an" : isDE ? "2 J. gesetzl. Gewährleistung (EU) + 1 J. Garantie" : "2-Yr EU Legal + 1-Yr Commercial Warranty"}</span>
                  </li>
                </ul>
              </div>

              <button 
                onClick={() => selectPackage('solo', 229)} 
                className="w-full py-5 rounded-full bg-[#1E2E25] text-white font-black text-base sm:text-lg hover:bg-[#2D372C] transition-colors cursor-pointer"
              >
                {isFR ? "Commander BloomLab® Solo — 229 €" : isDE ? "BloomLab® Solo bestellen — 229 €" : "Order BloomLab® Solo — €229"}
              </button>
            </div>

            {/* Offre 2 : Pack Signature 289€ (PLUS POPULAIRE) */}
            <div className="bg-[#0F261E] p-8 md:p-10 rounded-[40px] text-[#F9F6F0] space-y-8 shadow-2xl relative overflow-hidden flex flex-col justify-between border-2 border-[#C8AB8A]/40">
              <div className="absolute top-0 right-0 bg-[#E8772E] text-white text-[10px] font-black px-6 py-2 uppercase tracking-widest rounded-bl-2xl">
                {isFR ? "LE PLUS POPULAIRE" : isDE ? "AM BELIEBTESTEN" : "MOST POPULAR"}
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider bg-white/10 text-white/90 px-3 py-1 rounded-full">
                    {isFR ? "Le coffret complet prêt à extraire" : isDE ? "Das komplette Extraktions-Set" : "Complete ready-to-extract kit"}
                  </span>
                  <h3 className="text-2xl font-black pt-2 text-white !text-white">Pack Signature</h3>
                </div>

                <div className="space-y-1">
                  <div className="flex flex-wrap items-baseline gap-3">
                    <div className="text-4xl font-black text-white">289 €</div>
                    <div className="text-xl text-white/50 line-through">349 €</div>
                    <span className="text-xs font-bold uppercase tracking-wider bg-[#E8772E] text-white px-2.5 py-0.5 rounded-full">
                      {isFR ? "Économisez 60 €" : isDE ? "60 € sparen" : "Save €60"}
                    </span>
                  </div>
                  <div className="text-xs font-bold text-[#C8AB8A]">
                    {isFR ? "ou 3x 96,33 € sans frais" : isDE ? "oder 3x 96,33 € zinsfrei" : "or 3x €96.33 fee-free"}
                  </div>
                </div>

                <ul className="space-y-3 pt-2">
                  <li className="flex items-start gap-3 text-sm font-medium text-white/90">
                    <Check className="w-5 h-5 text-[#C8AB8A] shrink-0 mt-0.5" />
                    <span>{isFR ? "Tout le contenu de la BloomLab® Solo + les 5 accessoires offerts" : isDE ? "Gesamter Inhalt der BloomLab® Solo + 5 Gratis-Zubehörteile" : "Full BloomLab® Solo package + 5 free accessories"}</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm font-medium text-white/90">
                    <Check className="w-5 h-5 text-[#C8AB8A] shrink-0 mt-0.5" />
                    <span>{isFR ? "Kit apothicaire complémentaire (flacons ambrés & entonnoir)" : isDE ? "Zusätzliches Apotheker-Set (Braunglasflaschen & Trichter)" : "Additional apothecary kit (amber bottles & funnel)"}</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm font-medium text-white/90">
                    <Check className="w-5 h-5 text-[#C8AB8A] shrink-0 mt-0.5" />
                    <span>{isFR ? "L'Herbier Complet : les 4 mélanges de plantes sélectionnées" : isDE ? "Das vollständige Herbarium: alle 4 ausgewählten Pflanzenmischungen" : "Complete Herbarium: all 4 curated plant blends"}</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm font-medium text-white/90">
                    <Check className="w-5 h-5 text-[#C8AB8A] shrink-0 mt-0.5" />
                    <span>{isFR ? "Duo Argiles (Zéolithe-Bentonite 70:30)*" : isDE ? "Tonerde-Duo (Zeolith-Bentonit 70:30)*" : "Clay Duo (Zeolite-Bentonite 70:30)*"}</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm font-medium text-white/90">
                    <Check className="w-5 h-5 text-[#C8AB8A] shrink-0 mt-0.5" />
                    <span>{isFR ? "3 mois d'accès complet à la Bloom Academy" : isDE ? "3 Monate Vollzugang zur Bloom Academy" : "3 months full access to Bloom Academy"}</span>
                  </li>
                </ul>

                {/* Note astérisque obligatoire en blanc */}
                <div className="p-4 rounded-2xl bg-black/25 border border-white/15 text-xs text-white leading-relaxed">
                  <p className="text-white !text-white text-xs leading-relaxed">
                    {isFR 
                      ? "*Le Duo Argiles est une matière première minérale documentée sélectionnée pour les synergies botaniques. Usage éducatif. Ne se substitue à aucun traitement médical." 
                      : isDE
                      ? "*Das Tonerde-Duo ist ein dokumentierter mineralischer Rohstoff für botanische Synergien. Bildungsverwendung. Ersetzt keine medizinische Behandlung."
                      : "*The Clay Duo is a documented mineral raw material selected for botanical synergies. Educational use. Not a substitute for medical treatment."}
                  </p>
                </div>
              </div>

              <button 
                onClick={() => selectPackage('signature', 289)} 
                className="w-full py-5 rounded-full bg-[#E8772E] hover:bg-[#D4651F] active:bg-[#D4651F] text-white font-black text-base sm:text-lg transition-all shadow-lg shadow-orange-900/20 cursor-pointer"
              >
                {isFR ? "Commander le Pack Signature — 289 €" : isDE ? "Signature-Paket bestellen — 289 €" : "Order Signature Pack — €289"}
              </button>
            </div>

          </div>

          {/* Réassurance & Logos de Paiement (ICI UNIQUEMENT) */}
          <div className="pt-10 border-t border-[#F3EEE6] space-y-6 text-center">
            <div className="flex justify-center">
              <AmazonRatingBadge lang={isDE ? 'de' : isFR ? 'fr' : 'en'} variant="reassurance" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto text-xs text-slate-600 font-bold">
              <div className="flex items-center justify-center gap-2">
                <Truck className="w-4 h-4 text-[#C8AB8A]" />
                <span>{isFR ? "Expédition 24/48h" : isDE ? "Versand in 24/48 Std." : "24/48h Shipping"}</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#C8AB8A]" />
                <span>{isFR ? "Garantie légale 2 ans (UE) + 1 an" : isDE ? "2 J. Gewährleistung (EU) + 1 J." : "2-Yr EU Legal + 1-Yr Warranty"}</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Sparkles className="w-4 h-4 text-[#C8AB8A]" />
                <span>{isFR ? "Paiement en 3x sans frais" : isDE ? "3x zinsfreie Ratenzahlung" : "3x fee-free installment payment"}</span>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center space-y-3">
              <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">
                {isFR ? "Paiement 100% Sécurisé & Chiffré SSL" : isDE ? "100 % sichere & SSL-verschlüsselte Zahlung" : "100% Secure & SSL Encrypted Payment"}
              </span>
              <PaymentBadges />
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* BLOC 13 : FILET DE SORTIE (Journal Botanique + Newsletter Fusionnés) */}
      {/* Rôle : Rétention douce, CTA de remontée finale et signature */}
      {/* ========================================================================= */}
      <section id="sortie" className="py-16 md:py-24 bg-[#FAF7F2] border-t border-[#F3EEE6]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-block px-4 py-1.5 bg-[#F5E6D8] text-[#1E2E25] text-[10px] font-bold uppercase tracking-widest rounded-md border border-[#E8772E]/20">
              {isFR ? '12. Transmission Continue' : isDE ? '12. Wissenstransfer' : '12. Continuous Knowledge'}
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#1E2E25] tracking-tight">
              {isFR ? "Pas encore prêt ? Apprenez quand même." : isDE ? "Noch nicht bereit? Lernen Sie trotzdem." : "Not ready yet? Learn anyway."}
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              {isFR 
                ? "Découvrez les synthèses documentaires et protocoles publiés chaque semaine par notre équipe éditoriale et de recherche botanique." 
                : isDE
                ? "Entdecken Sie fundierte Analysen und Protokolle, die wöchentlich von unserem Botanik-Team veröffentlicht werden."
                : "Explore in-depth articles and weekly protocols published by our botanical team."}
            </p>
          </div>

          {/* 2 Articles du Journal Botanique */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div 
              onClick={() => onNavigate('articles', 'extraction-botanique-vs-huiles-essentielles-pourquoi-choisir-le-totum')}
              className="bg-white rounded-3xl overflow-hidden border border-[#E7DFD3] shadow-sm hover:shadow-lg transition-all cursor-pointer flex flex-col group"
            >
              <div className="h-52 overflow-hidden bg-slate-100">
                <img 
                  src={shelvesImg} 
                  alt="Extraction du Totum végétal et herboristerie maison" 
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
              </div>
              <div className="p-8 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#E8772E]">
                    {isFR ? "Article de fond" : isDE ? "Fachartikel" : "In-depth article"}
                  </span>
                  <h3 className="text-xl font-black text-[#1E2E25] group-hover:text-[#E8772E] transition-colors">
                    {isFR
                      ? "L'Art du Totum végétal : pourquoi extraire l'ensemble plutôt qu'une molécule isolée"
                      : isDE
                      ? "Die Kunst des Pflanzen-Totums: Warum das Ganze statt einzelner Moleküle extrahieren?"
                      : "The Art of Plant Totum: why extract the whole plant rather than an isolated molecule"}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {isFR
                      ? "Comprendre la synergie naturelle entre flavonoïdes, tanins et terpènes pour préserver le plein potentiel végétal."
                      : isDE
                      ? "Die natürliche Synergie von Flavonoiden, Tanninen und Terpenen verstehen, um das volle Pflanzenpotenzial zu bewahren."
                      : "Understanding the natural synergy between flavonoids, tannins, and terpenes to preserve the plant's full potential."}
                  </p>
                </div>
                <div className="pt-4 flex items-center gap-2 text-xs font-bold text-[#E8772E]">
                  <span>{isFR ? "Lire l'analyse" : isDE ? "Analyse lesen" : "Read analysis"}</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>

            <div 
              onClick={() => onNavigate('articles', 'comment-fabriquer-huiles-infusees-teintures-maison')}
              className="bg-white rounded-3xl overflow-hidden border border-[#E7DFD3] shadow-sm hover:shadow-lg transition-all cursor-pointer flex flex-col group"
            >
              <div className="h-52 overflow-hidden bg-slate-100">
                <img 
                  src={herbsImg} 
                  alt="Plantes médicinales et infuseur botanique de précision" 
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
              </div>
              <div className="p-8 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#E8772E]">
                    {isFR ? "Guide pratique" : isDE ? "Praxisleitfaden" : "Practical guide"}
                  </span>
                  <h3 className="text-xl font-black text-[#1E2E25] group-hover:text-[#E8772E] transition-colors">
                    {isFR
                      ? "Le choix des solvants : eau, huile ou glycérine (alcool chauffé en cuve suspendu)"
                      : isDE
                      ? "Die Wahl der Lösungsmittel: Wasser, Öl oder Glycerin (erhitzter Alkohol ausgesetzt)"
                      : "Choosing solvents: water, oil, or glycerin (heated alcohol suspended)"}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {isFR
                      ? "Table de polarité simplifiée pour réussir vos extractions sans gaspiller vos plantes précieuses."
                      : isDE
                      ? "Vereinfachte Polaritätstabelle für erfolgreiche Extraktionen ohne Verschwendung wertvoller Pflanzen."
                      : "Simplified polarity chart to succeed with every extraction without wasting botanicals."}
                  </p>
                </div>
                <div className="pt-4 flex items-center gap-2 text-xs font-bold text-[#E8772E]">
                  <span>{isFR ? "Consulter le guide" : isDE ? "Leitfaden ansehen" : "View guide"}</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </div>

          {/* Liens vers tous les articles & Blog Officiel */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              type="button"
              onClick={() => onNavigate('extraction-botanique')}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#1E2E25] hover:bg-[#2D372C] text-white font-bold text-sm transition-all shadow-xs cursor-pointer"
            >
              <span>{isFR ? "Guide Pilier : Extraction Botanique" : isDE ? "Leitfaden: Botanische Extraktion" : "Pillar Guide: Botanical Extraction"}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => onNavigate('articles')}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white hover:bg-[#FAF7F2] border-2 border-[#1E2E25]/20 text-[#1E2E25] hover:border-[#1E2E25] font-bold text-sm transition-all shadow-xs cursor-pointer"
            >
              <span>{isFR ? "Consulter tous les articles du Journal" : isDE ? "Alle Fachartikel entdecken" : "Explore all botanical articles"}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
            <a
              href="https://blog.bloombybotanik.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#E8F1EE] hover:bg-[#D8CBB7]/30 text-[#1E2E25] border border-[#D8CBB7] font-bold text-sm transition-all cursor-pointer"
            >
              <span>{isFR ? "Visiter le blog officiel (blog.bloombybotanik.com)" : isDE ? "Offiziellen Blog besuchen (blog.bloombybotanik.com)" : "Visit official blog (blog.bloombybotanik.com)"}</span>
              <ArrowUpRight className="w-4 h-4 text-[#E8772E]" />
            </a>
          </div>

          {/* Formulaire Newsletter Sans Engagement */}
          <div className="bg-[#1E2E25] text-white rounded-[36px] p-8 md:p-12 text-center max-w-3xl mx-auto space-y-6 shadow-xl">
            <div className="space-y-2">
              <h3 className="text-2xl sm:text-3xl font-black text-[#FAF7F2]">
                {isFR ? "La Lettre Botanique Hebdomadaire" : isDE ? "Der wöchentliche Botanik-Brief" : "The Weekly Botanical Letter"}
              </h3>
              <p className="text-white/80 text-sm max-w-xl mx-auto">
                {isFR 
                  ? "Recevez un protocole inédit chaque dimanche matin, sans publicité ni spam." 
                  : isDE
                  ? "Erhalten Sie jeden Sonntagmorgen ein neues Protokoll – ganz ohne Werbung oder Spam."
                  : "Receive an exclusive botanical protocol every Sunday morning, with no ads or spam."}
              </p>
            </div>

            {newsletterSent ? (
              <div className="p-4 bg-emerald-900/60 border border-emerald-400/40 rounded-2xl text-emerald-200 text-sm font-bold flex items-center justify-center gap-2">
                <Check className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>
                  {isFR
                    ? "Inscription enregistrée sur le serveur local (un envoi SMTP automatique n'est pas encore activé sur cette instance)."
                    : isDE
                    ? "Anmeldung auf dem lokalen Server gespeichert (automatischer SMTP-Versand ist auf dieser Instanz noch nicht aktiviert)."
                    : "Subscription recorded on the local server (automated SMTP email delivery is not yet enabled on this instance)."}
                </span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="space-y-3 max-w-md mx-auto">
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder={isFR ? "Votre adresse email..." : isDE ? "Ihre E-Mail-Adresse..." : "Your email address..."}
                    className="px-5 py-3.5 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/60 text-sm focus:outline-none focus:border-[#E8772E] flex-1"
                  />
                  <button
                    type="submit"
                    disabled={newsletterLoading}
                    className="px-6 py-3.5 rounded-full bg-[#E8772E] hover:bg-[#D4651F] disabled:opacity-60 text-white text-sm font-black transition-all shadow-md shadow-orange-900/20 cursor-pointer shrink-0"
                  >
                    {newsletterLoading ? "..." : (isFR ? "S'inscrire" : isDE ? "Abonnieren" : "Subscribe")}
                  </button>
                </div>
                {newsletterError && (
                  <p className="text-xs text-amber-300 font-medium">{newsletterError}</p>
                )}
              </form>
            )}

            <div className="text-[11px] text-white/60">
              {isFR ? "Désinscription en un clic. Vos données restent confidentielles." : isDE ? "Abmeldung mit einem Klick. Ihre Daten bleiben streng vertraulich." : "One-click unsubscribe. Your data remains strictly confidential."}
            </div>
          </div>

          {/* CTA Final de Remontée & Signature de Marque */}
          <div className="text-center pt-8 border-t border-[#E7DFD3] space-y-6">
            <h3 className="text-2xl sm:text-3xl font-black text-[#1E2E25]">
              {isFR ? "Prêt à maîtriser votre extraction botanique ?" : isDE ? "Bereit, Ihre botanische Extraktion zu meistern?" : "Ready to master your botanical extraction?"}
            </h3>
            <button
              onClick={() => {
                const el = document.getElementById('commande');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#E8772E] hover:bg-[#D4651F] active:bg-[#D4651F] text-white font-black text-base shadow-lg shadow-orange-900/20 transition-all cursor-pointer"
            >
              <span>{isFR ? "Rejoindre l'expérience BloomLab" : isDE ? "BloomLab-Erlebnis starten" : "Join the BloomLab experience"}</span>
              <ArrowRight className="w-5 h-5 text-white" />
            </button>

            <div className="pt-6">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">
                {isFR ? "L'Ingénierie au service du vivant." : isDE ? "Ingenieurskunst im Dienst des Lebendigen." : "Engineering in service of the living."}
              </p>
            </div>
          </div>

          {/* Explorer Bloom : Maillage Interne Structuré pour Sitelinks */}
          <nav aria-label={isFR ? "Explorer Bloom" : isDE ? "Bloom Entdecken" : "Explore Bloom"} className="pt-8 border-t border-[#E7DFD3]">
            <div className="text-center mb-5">
              <h3 className="text-sm font-black uppercase tracking-[0.2em] text-[#1E2E25]">
                {isFR ? "Explorer Bloom" : isDE ? "Bloom Entdecken" : "Explore Bloom"}
              </h3>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
              {[
                { label: isFR ? "Découvrir la BloomLab" : isDE ? "BloomLab entdecken" : "Discover BloomLab", view: "product-detail", param: "bloomlab", href: "/boutique/bloomlab/" },
                { label: isFR ? "Guide d'extraction" : isDE ? "Extraktions-Leitfaden" : "Extraction Guide", view: "pillar-extraction", href: "/extraction-botanique/" },
                { label: isFR ? "Infusion Botanique" : isDE ? "Botanische Infusion" : "Botanical Infusion", view: "infusion-botanique", href: "/infusion-botanique/" },
                { label: isFR ? "Soins Botaniques" : isDE ? "Botanische Pflege" : "Botanical Care", view: "remedes-naturels", href: "/remedes-naturels/" },
                { label: isFR ? "Reset Corps" : isDE ? "Homöostatischer Reset" : "Homeostatic Reset", view: "reset-homeostasique", href: "/reset-homeostasique/" },
                { label: isFR ? "Guide des Solvants" : isDE ? "Lösungsmittel-Leitfaden" : "Solvents Guide", view: "guide-solvants", href: "/guide-solvants/" },
                { label: isFR ? "Académie" : isDE ? "Akademie" : "Academy", view: "academie", href: "/academie/" },
                { label: isFR ? "Boutique" : isDE ? "Shop" : "Shop", view: "boutique", href: "/boutique/" },
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                      e.preventDefault();
                      onNavigate(item.view, (item as { param?: string }).param);
                    }
                  }}
                  className="px-4 py-2 rounded-full bg-white border border-[#E7DFD3] hover:border-[#E8772E] text-xs sm:text-sm font-bold text-[#1E2E25] hover:text-[#E8772E] transition-colors shadow-2xs"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </nav>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* BARRE FIXE COLLANTE (STICKY BAR) */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {showStickyBar && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-0 inset-x-0 z-40 bg-[#1E2E25]/95 backdrop-blur-md border-t border-[#C8AB8A]/30 text-white py-3 px-4 sm:px-8 shadow-2xl"
          >
            <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#E8772E]/20 border border-[#E8772E]/40 flex items-center justify-center text-[#E8772E] shrink-0">
                  <FlaskConical className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm sm:text-base font-black tracking-tight flex items-center gap-2">
                    <span>BloomLab® — 229 €</span>
                    <span className="text-[10px] uppercase font-bold bg-[#E8772E] text-white px-2 py-0.5 rounded-full hidden sm:inline-block">
                      {isFR ? "Expédition 24/48h" : isDE ? "Versand 24/48h" : "24/48h Shipping"}
                    </span>
                  </div>
                  <div className="text-[10px] sm:text-xs text-white/60 hidden sm:block">
                    {isFR ? 'Garantie légale 2 ans (UE) + 1 an • Paiement en 3x sans frais' : isDE ? '2 J. Gewährleistung (EU) + 1 J. • 3x zinsfrei' : '2-Yr EU Legal + 1-Yr Warranty • 3x fee-free'}
                  </div>
                </div>
              </div>
              <button
                onClick={() => {
                  const el = document.getElementById('commande');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-2.5 bg-[#E8772E] hover:bg-[#D4651F] text-white rounded-full font-black text-xs sm:text-sm tracking-wide transition-all shadow-lg shadow-orange-900/20 cursor-pointer shrink-0"
              >
                {isFR ? 'Commander' : isDE ? 'Bestellen' : 'Order Now'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* TIROIR PANIER MODAL */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-[100] flex justify-end">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setIsCartOpen(false)} 
              className="absolute inset-0 bg-black/40 backdrop-blur-xs" 
            />
            <motion.div 
              initial={{ x: '100%' }} 
              animate={{ x: 0 }} 
              exit={{ x: '100%' }} 
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-md bg-white h-full p-8 shadow-2xl flex flex-col justify-between"
            >
              <div className="space-y-8">
                <div className="flex justify-between items-center border-b pb-4">
                  <h3 className="text-xl font-black uppercase tracking-tight text-[#1E2E25]">
                    {isFR ? "Mon Panier" : isDE ? "Mein Warenkorb" : "My Cart"}
                  </h3>
                  <button 
                    onClick={() => setIsCartOpen(false)}
                    className="p-2 text-slate-400 hover:text-slate-800 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="bg-[#FAF7F2] p-6 rounded-3xl border border-[#E7DFD3] flex justify-between items-center">
                  <div className="space-y-1">
                    <div className="font-bold text-sm text-[#1E2E25]">{cartItem.title}</div>
                    <div className="text-xs text-slate-500">
                      {isFR ? "Infuseur botanique de précision BloomLab®" : isDE ? "Botanischer Präzisions-Infuser BloomLab®" : "BloomLab® Precision Botanical Infuser"}
                    </div>
                  </div>
                  <div className="font-black text-xl text-[#1E2E25]">{cartItem.price}€</div>
                </div>

                <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 text-xs text-emerald-800 space-y-1">
                  <div className="font-bold flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>{isFR ? "Expédition prioritaire 24/48h incluse" : isDE ? "Prioritätsversand 24/48 Std. inklusive" : "Priority 24/48h shipping included"}</span>
                  </div>
                  <div className="text-emerald-700/80">
                    {isFR
                      ? "Garantie légale 2 ans (UE) + 1 an • Rétractation 14 j + essai 30 j."
                      : isDE
                      ? "2 J. gesetzl. Gewährleistung (EU) + 1 J. • 14 T. Widerruf + 30 T. Testphase."
                      : "2-yr EU legal + 1-yr warranty • 14-day withdrawal + 30-day trial."}
                  </div>
                </div>

                <div className="flex justify-center pt-1">
                  <AmazonRatingBadge lang={isDE ? 'de' : isFR ? 'fr' : 'en'} variant="reassurance" />
                </div>
              </div>

              <div className="space-y-3">
                <button 
                  onClick={() => {
                    setIsCartOpen(false);
                    onNavigate('checkout');
                  }} 
                  className="w-full bg-[#E8772E] hover:bg-[#D4651F] active:bg-[#D4651F] text-white py-5 rounded-full font-black text-lg transition-all cursor-pointer shadow-lg shadow-orange-900/20"
                >
                  {isFR ? "Procéder au Paiement" : isDE ? "Zur Kasse gehen" : "Proceed to Checkout"}
                </button>
                <div className="flex justify-center">
                  <PaymentBadges />
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
    </GlossaryProvider>
  );
}