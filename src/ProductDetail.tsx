import React, { useState, useMemo } from 'react';
import { ArrowLeft, Check, ShieldCheck, Thermometer, Timer, RefreshCw, ShoppingBag, FlaskConical, Beaker, Leaf, ChefHat, X, Star, Heart, Share2, Info, Award } from 'lucide-react';
import { translations, Language } from './translations';
import { getProductSheets } from './data/productDetailsData';
import { AmazonRatingBadge } from './components/AmazonSocialProof';
import SeoHead from './components/SeoHead';

interface ProductDetailProps {
  onBack: () => void;
  onAddToCart: (product: any) => void;
  onNavigate: (view: any, productId?: string, type?: any) => void;
  productId?: string;
  lang: Language;
}

export default function ProductDetail({ onBack, onAddToCart, onNavigate, productId = 'bloomlab', lang }: ProductDetailProps) {
  const [activeImage, setActiveImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [bloomlabOption, setBloomlabOption] = useState<'solo' | 'signature'>('solo');
  const t = translations[lang].product_detail;
  const productSheets = useMemo(() => getProductSheets(lang), [lang]);
  const sheet = productSheets[productId] || productSheets['bloomlab'];
  const isBloomLab = productId === 'bloomlab';
  const isArgiles = productId === 'duo-argiles' || productId === 'kit-reset';
  const packSignatureSheet = productSheets['pack-signature'];
  const gallery = sheet.images.map((img: string, i: number) => ({ 
    src: img, 
    alt: `${sheet.name} - ${sheet.subtitle || 'Herboristerie de précision'} - Vue ${i + 1} - Extracteur botanique Bloom by BotaniK`
  }));

  const seoTitle = isBloomLab
    ? (lang === 'fr'
        ? "BloomLab® — L'Extracteur Botanique de Précision pour vos Soins Maison | Bloom by BotaniK"
        : lang === 'de'
        ? "BloomLab® — Botanischer Präzisionsextraktor für Ihre Naturkosmetik | Bloom by BotaniK"
        : "BloomLab® — The Precision Botanical Extractor for Homemade Care | Bloom by BotaniK")
    : `${sheet.name} | Bloom by BotaniK`;

  const seoDescription = isBloomLab
    ? (lang === 'fr'
        ? "Transformez vos plantes brutes en sérums capillaires, huiles de soin et infusions concentrées en quelques heures avec la BloomLab® (cuve Inox 304, ±0,5 °C)."
        : lang === 'de'
        ? "Verwandeln Sie Rohpflanzen in wenigen Stunden in Haarseren, Pflegeöle und konzentrierte Aufgüsse mit der BloomLab® (304-Edelstahl, ±0,5 °C)."
        : "Transform raw plants into hair serums, care oils, and concentrated infusions in hours with BloomLab® (304 stainless steel, ±0.5°C).")
    : (sheet.description || '');

  const productSchema: Record<string, any> = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `https://bloombybotanik.com/boutique/${productId}/#product`,
    "name": isBloomLab ? "BloomLab®" : sheet.name,
    "description": sheet.description,
    "image": gallery.map((g: any) => `https://bloombybotanik.com${g.src}`),
    "sku": productId,
    "mpn": `BLOOM-${productId.toUpperCase()}`,
    "brand": {
      "@type": "Brand",
      "name": "Bloom by BotaniK"
    },
    "offers": {
      "@type": "Offer",
      "url": `https://bloombybotanik.com/boutique/${productId}/`,
      "priceCurrency": "EUR",
      "price": (sheet.price || 0).toFixed(2),
      "priceValidUntil": "2026-12-31",
      "itemCondition": "https://schema.org/NewCondition",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "Bloom by BotaniK"
      },
      "shippingDetails": {
        "@type": "OfferShippingDetails",
        "shippingRate": {
          "@type": "MonetaryAmount",
          "value": productId === 'bloomlab' ? "7.90" : "5.90",
          "currency": "EUR"
        },
        "shippingDestination": {
          "@type": "DefinedRegion",
          "addressCountry": "FR"
        },
        "deliveryTime": {
          "@type": "ShippingDeliveryTime",
          "handlingTime": {
            "@type": "QuantitativeValue",
            "minValue": 1,
            "maxValue": 2,
            "unitCode": "DAY"
          },
          "transitTime": {
            "@type": "QuantitativeValue",
            "minValue": 2,
            "maxValue": 4,
            "unitCode": "DAY"
          }
        }
      },
      "hasMerchantReturnPolicy": {
        "@type": "MerchantReturnPolicy",
        "applicableCountry": "FR",
        "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
        "merchantReturnDays": 30,
        "returnMethod": "https://schema.org/ReturnByMail",
        "returnFees": "https://schema.org/ReturnShippingFees"
      }
    }
  };

  if (isBloomLab || productId === 'pack-signature') {
    productSchema.aggregateRating = {
      "@type": "AggregateRating",
      "ratingValue": "4.3",
      "reviewCount": "7",
      "bestRating": "5",
      "worstRating": "1"
    };
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": lang === 'fr' ? "Accueil" : lang === 'de' ? "Startseite" : "Home",
        "item": "https://bloombybotanik.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": lang === 'fr' ? "Boutique" : lang === 'de' ? "Shop" : "Shop",
        "item": "https://bloombybotanik.com/boutique/"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": sheet.name,
        "item": `https://bloombybotanik.com/boutique/${productId}/`
      }
    ]
  };

  const handleAddSelectedBloomLab = () => {
    if (isBloomLab && bloomlabOption === 'signature' && packSignatureSheet) {
      onAddToCart({
        id: 'pack-signature',
        name: packSignatureSheet.name,
        subtitle: packSignatureSheet.subtitle,
        price: 289.00,
        image: packSignatureSheet.images[0] || sheet.images[0]
      });
      return;
    }
    onAddToCart({
      id: productId,
      name: sheet.name,
      subtitle: sheet.subtitle,
      price: sheet.price,
      image: sheet.images[0]
    });
  };

  return (
    <>
      <SeoHead
        title={seoTitle}
        description={seoDescription}
        canonical={`https://bloombybotanik.com/boutique/${productId}/`}
        ogType="product"
        lang={lang}
        schemas={[productSchema, breadcrumbSchema]}
      />
      {/* Promotional Banner */}
      <div className="bg-[#D97706]/10 text-[#B45309] border-b border-[#D97706]/30 text-center py-2.5 px-4 text-[10px] md:text-xs font-black uppercase tracking-[0.2em]">
        {lang === 'fr' 
          ? "🇫🇷 Marque française • Conception des protocoles & kits botaniques en France • Expédition 24/48h • Garantie 1 an • Paiement 3x sans frais" 
          : lang === 'de'
          ? "🇫🇷 Französische Marke • Protokolle & Botanik-Kits aus Frankreich • Versand 24/48h • 1 Jahr Garantie • 3x zinsfrei"
          : "🇫🇷 French Brand • Protocols & botanical kits crafted in France • 24/48h Shipping • 1-Year Warranty • 3x Fee-Free"}
      </div>

      <article data-product-page="true" className="product-detail w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
        <nav aria-label="Fil d'Ariane" className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[11px] sm:text-xs text-[#1B3022]/60">
          <a 
            href="/" 
            onClick={(e) => {
              if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                e.preventDefault();
                onNavigate('home');
              }
            }}
            className="hover:text-[#1B3022] hover:underline"
          >
            {lang === 'fr' ? 'Accueil' : lang === 'de' ? 'Startseite' : 'Home'}
          </a>
          <span>/</span>
          <a 
            href="/boutique/" 
            onClick={(e) => {
              if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                e.preventDefault();
                onNavigate('boutique');
              }
            }}
            className="hover:text-[#1B3022] hover:underline"
          >
            {lang === 'fr' ? 'Boutique' : lang === 'de' ? 'Shop' : 'Store'}
          </a>
          <span>/</span>
          <span className="text-[#1B3022] font-semibold truncate max-w-[200px] sm:max-w-none">{sheet.name}</span>
        </nav>

        {!isBloomLab && (
          <a 
            href="/boutique/"
            onClick={(e) => {
              if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                e.preventDefault();
                onBack();
              }
            }}
            className="inline-flex items-center gap-2 text-[#1B3022]/60 hover:text-[#1B3022] transition-colors group py-1 text-xs sm:text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            {t.back}
          </a>
        )}
      </div>

      <div className="flex flex-col lg:flex-row items-stretch bg-white border border-[#1B3022]/5 rounded-3xl sm:rounded-[48px] overflow-hidden shadow-2xl mb-16 sm:mb-24 min-h-0 lg:min-h-[580px]">
        {/* Left Side: Visual Showcase & Gallery */}
        <div 
          className={`lg:w-1/2 flex flex-col justify-between transition-all ${
            isArgiles 
              ? 'bg-[#FAF8F5] relative overflow-hidden min-h-[380px] sm:min-h-[480px] lg:min-h-full border-b lg:border-b-0 lg:border-r border-[#1B3022]/10' 
              : 'bg-[#F9F9F7] relative overflow-hidden min-h-[300px] sm:min-h-[400px] lg:min-h-[560px] items-stretch'
          }`}
        >
          {/* Main Visual Display */}
          <div 
            className="relative flex-1 w-full h-full min-h-[380px] sm:min-h-[480px] lg:min-h-full flex items-center justify-center cursor-zoom-in overflow-hidden"
            onClick={() => setIsZoomed(true)}
          >
            {isArgiles ? (
              <img 
                src={gallery[activeImage].src} 
                alt={gallery[activeImage].alt} 
                width={1200}
                height={1200}
                loading="eager"
                fetchPriority="high"
                srcSet={`${gallery[activeImage].src} 600w, ${gallery[activeImage].src} 1200w`}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="w-full h-full min-h-full object-cover object-center transition-transform duration-700 scale-120 sm:scale-125 hover:scale-130"
              />
            ) : (
              <img 
                src={gallery[activeImage].src} 
                alt={gallery[activeImage].alt} 
                width={1200}
                height={1200}
                loading="eager"
                fetchPriority="high"
                srcSet={`${gallery[activeImage].src} 600w, ${gallery[activeImage].src} 1200w`}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="w-full h-full object-cover transition-all duration-500 scale-105 sm:scale-110 hover:scale-125"
              />
            )}
            {isArgiles && (
              <div className="absolute top-4 left-4 sm:top-6 sm:left-6 bg-[#3E4A3D]/90 backdrop-blur-md text-[#C8AB8A] px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] border border-[#C8AB8A]/30 shadow-lg z-20 whitespace-nowrap flex items-center gap-1.5">
                <Leaf className="w-3.5 h-3.5 text-[#C8AB8A]" />
                <span>
                  {lang === 'fr' ? 'Argiles & Matières Premières' : lang === 'de' ? 'Heilerden & Mineralien' : 'Clays & Raw Minerals'}
                </span>
              </div>
            )}
            {productId === 'bloomlab' && (
              <div className="absolute top-4 left-4 sm:top-6 sm:left-6 bg-[#C8AB8A] text-[#0F261E] px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] border border-white/20 shadow-xl z-20 whitespace-nowrap">
                {sheet.subtitle}
              </div>
            )}
          </div>

          {/* Vignettes photos bien proportionnées & élégantes (pas trop petites) */}
          {gallery.length > 1 && (
            <div className={`${isArgiles ? 'mt-6 pt-4 border-t border-[#1B3022]/10' : 'absolute bottom-4 left-4 right-4 sm:bottom-8 sm:left-8 sm:right-8 z-20'}`}>
              <div className={`flex items-center gap-3 sm:gap-4 overflow-x-auto p-1.5 ${isArgiles ? 'justify-center flex-wrap' : 'bg-white/20 backdrop-blur-md rounded-2xl border border-white/20 w-fit max-w-full'}`}>
                {gallery.map((img: any, i: number) => (
                  <button 
                    key={i} 
                    type="button"
                    onClick={(e) => { e.stopPropagation(); setActiveImage(i); }}
                    className={`relative rounded-2xl overflow-hidden border-2 transition-all p-1.5 bg-white cursor-pointer shadow-sm ${
                      isArgiles ? 'w-20 h-20 sm:w-24 sm:h-24 md:w-26 md:h-26' : 'w-12 h-12 sm:w-14 sm:h-14'
                    } ${
                      activeImage === i 
                        ? 'border-[#C8AB8A] ring-2 ring-[#C8AB8A]/40 shadow-md scale-105' 
                        : 'border-[#1B3022]/15 hover:border-[#C8AB8A]/50 opacity-80 hover:opacity-100 hover:scale-102'
                    }`}
                    title={img.alt}
                  >
                    <img 
                      src={img.src} 
                      alt={img.alt} 
                      width={120} 
                      height={120} 
                      loading="lazy" 
                      decoding="async" 
                      className="w-full h-full object-contain rounded-xl" 
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Side: Info & Buy */}
        <div className={`lg:w-1/2 flex flex-col justify-center ${
          isArgiles ? 'p-6 sm:p-8 lg:p-10' : isBloomLab ? 'p-6 sm:p-8 lg:p-12' : 'p-5 sm:p-8 md:p-16 lg:p-20'
        }`}>
          <div className="flex items-center gap-2 text-[#A8B8A0] font-bold uppercase tracking-widest text-[9px] sm:text-[10px] mb-2 sm:mb-2.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#C8AB8A]" /> 
            <span>{lang === 'fr' ? 'Extraction Botanique de Précision • Inox 304' : lang === 'de' ? 'Botanische Präzisionsextraktion • Edelstahl 304' : 'Precision Botanical Extraction • 304 Steel'}</span>
          </div>
          
          {isArgiles ? (
            <div className="mb-3">
              <div className="text-[#C9922B] text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] mb-1.5">
                {sheet.subtitle}
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-[#3E4A3D] tracking-tight leading-snug">
                {lang === 'fr' ? 'Duo Argiles' : lang === 'de' ? 'Erden-Duo' : 'Clay Duo'}
              </h1>
              <p className="text-xs sm:text-sm font-medium text-[#1B3022]/70 mt-1">
                {lang === 'fr' ? 'Purification Systémique Zéolithe-Bentonite (6μm)' : lang === 'de' ? 'Systemische Reinigung Zeolith-Bentonit (6μm)' : 'Systemic Zeolite-Bentonite Purification (6μm)'}
              </p>
            </div>
          ) : isBloomLab ? (
            <>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#1B3022] mb-3 tracking-tight leading-tight">
                {lang === 'fr'
                  ? "BloomLab® — L'Extracteur Botanique de Précision pour vos Soins Maison"
                  : lang === 'de'
                  ? "BloomLab® — Der Botanische Präzisionsextraktor für Ihre Hauspflege"
                  : "BloomLab® — The Precision Botanical Extractor for Your Home Care"}
              </h1>
              <div className="mb-4 text-xs sm:text-sm font-bold text-[#B45309] flex flex-wrap items-center gap-2">
                <span>
                  {lang === 'fr'
                    ? "⭐⭐⭐⭐☆ 4,3/5 (Basé sur les avis vérifiés de nos premiers utilisateurs)"
                    : lang === 'de'
                    ? "⭐⭐⭐⭐☆ 4,3/5 (Basierend auf verifizierten Bewertungen unserer ersten Nutzer)"
                    : "⭐⭐⭐⭐☆ 4.3/5 (Based on verified reviews from our early users)"}
                </span>
              </div>
              <div className="text-base sm:text-lg font-extrabold text-[#1B3022] mb-2">
                {lang === 'fr'
                  ? "Ne devinez plus. Extrayez avec précision."
                  : lang === 'de'
                  ? "Schluss mit Raten. Präzise extrahieren."
                  : "Stop guessing. Extract with precision."}
              </div>
              <p className="text-sm sm:text-base text-[#1B3022]/80 font-medium mb-6 leading-relaxed">
                {lang === 'fr'
                  ? "Transformez vos plantes brutes en sérums capillaires, huiles de soin et infusions concentrées en quelques heures. La BloomLab® remplace l'improvisation du bain-marie par la rigueur d'un laboratoire, en préservant l'intégralité du Totum végétal (l'ensemble des actifs synergiques de la plante)."
                  : lang === 'de'
                  ? "Verwandeln Sie Rohpflanzen in wenigen Stunden in Haarseren, Pflegeöle und konzentrierte Aufgüsse. Die BloomLab® ersetzt das improvisierte Wasserbad durch Laborpräzision und bewahrt das vollständige Pflanzen-Totum."
                  : "Transform raw botanicals into hair serums, skincare oils, and concentrated infusions in hours. BloomLab® replaces stovetop guesswork with laboratory rigor, preserving the complete plant Totum."}
              </p>
            </>
          ) : (
            <>
              <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-[#1B3022] mb-3 sm:mb-4 md:mb-6 tracking-tight leading-tight">
                {sheet.name}
              </h1>
              <div className="text-[#C8AB8A] text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] mb-4">
                {sheet.subtitle}
              </div>
              {productId === 'pack-signature' && (
                <div className="mb-4">
                  <AmazonRatingBadge lang={lang} />
                </div>
              )}
              <p className="text-sm sm:text-base md:text-xl text-[#1B3022]/80 font-medium mb-6 md:mb-8 leading-relaxed">
                {sheet.description}
              </p>
            </>
          )}

          {isArgiles && (
            <p className="text-xs sm:text-sm text-[#1B3022]/75 font-normal mb-4 leading-relaxed max-w-xl">
              {sheet.description}
            </p>
          )}

          <div className={`rounded-2xl sm:rounded-3xl border border-[#1B3022]/10 ${
            isArgiles ? 'bg-[#FAF8F5] p-4 sm:p-5 mb-5 shadow-xs' : 'bg-[#F9F9F7] p-5 sm:p-7 mb-7'
          }`}>
            {isBloomLab ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setBloomlabOption('solo')}
                    className={`w-full p-3.5 sm:p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between gap-3 ${
                      bloomlabOption === 'solo'
                        ? 'bg-white border-[#D97706] ring-2 ring-[#D97706]/30 shadow-sm'
                        : 'bg-white/60 border-[#1B3022]/10 hover:bg-white'
                    }`}
                  >
                    <div>
                      <div className="text-xs sm:text-sm font-black text-[#1B3022]">
                        {lang === 'fr' ? "OPTION 1 : BloomLab® Solo" : lang === 'de' ? "OPTION 1: BloomLab® Solo" : "OPTION 1: BloomLab® Solo"}
                      </div>
                      <div className="text-[11px] text-[#1B3022]/65">
                        {lang === 'fr' ? "L'essentiel pour débuter • Prix Black Friday" : lang === 'de' ? "Das Wesentliche für den Start • Black-Friday-Preis" : "Essentials to start • Black Friday Price"}
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-xl font-black text-[#1B3022]">229 €</div>
                      <div className="text-[11px] line-through text-[#1B3022]/40">289 €</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setBloomlabOption('signature')}
                    className={`w-full p-3.5 sm:p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between gap-3 ${
                      bloomlabOption === 'signature'
                        ? 'bg-white border-[#D97706] ring-2 ring-[#D97706]/30 shadow-sm'
                        : 'bg-white/60 border-[#1B3022]/10 hover:bg-white'
                    }`}
                  >
                    <div>
                      <div className="text-xs sm:text-sm font-black text-[#1B3022] flex flex-wrap items-center gap-2">
                        <span>{lang === 'fr' ? "OPTION 2 : Pack Signature" : lang === 'de' ? "OPTION 2: Signature-Paket" : "OPTION 2: Signature Pack"}</span>
                        <span className="text-[9px] px-2 py-0.5 rounded-full bg-[#D97706] text-white font-black uppercase tracking-wider">
                          {lang === 'fr' ? "Recommandé • -60 €" : lang === 'de' ? "Empfohlen • -60 €" : "Recommended • -€60"}
                        </span>
                      </div>
                      <div className="text-[11px] text-[#1B3022]/65">
                        {lang === 'fr' ? "Le protocole complet (3 mois de pratique)" : lang === 'de' ? "Das Komplettprotokoll (3 Monate)" : "The complete protocol (3 months)"}
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-xl font-black text-[#1B3022]">289 €</div>
                      <div className="text-[11px] line-through text-[#1B3022]/40">349 €</div>
                    </div>
                  </button>
                </div>

                <button 
                  type="button"
                  onClick={handleAddSelectedBloomLab}
                  className="w-full bg-[#D97706] hover:bg-[#B45309] active:bg-[#92400E] text-white rounded-xl font-black tracking-wide transition-all flex items-center justify-center gap-2.5 shadow-lg shadow-orange-900/20 transform hover:-translate-y-0.5 cursor-pointer px-6 py-4 text-sm sm:text-base min-h-[48px]"
                >
                  <ShoppingBag className="w-4 h-4 shrink-0" />
                  <span>
                    {bloomlabOption === 'signature'
                      ? (lang === 'fr' ? "Commander le Pack Signature — Expédition 24/48h" : lang === 'de' ? "Signature-Paket bestellen — Versand 24/48h" : "Order Signature Pack — Ships 24/48h")
                      : (lang === 'fr' ? "Ajouter au panier — Expédition 24/48h" : lang === 'de' ? "In den Warenkorb — Versand 24/48h" : "Add to Cart — Ships 24/48h")}
                  </span>
                </button>
                <p className="text-center text-[11px] text-[#1B3022]/65 flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 shrink-0 text-[#1B3022]/60" />
                  <span>
                    {lang === 'fr'
                      ? "Satisfait ou remboursé 30 jours • Garantie 1 an • 3x ou 4x sans frais Klarna / PayPal"
                      : lang === 'de'
                      ? "30 Tage Geld-zurück • 1 Jahr Garantie • 3x/4x zinsfrei via Klarna / PayPal"
                      : "30-day money-back trial • 1-year warranty • 3x/4x fee-free via Klarna / PayPal"}
                  </span>
                </p>
              </div>
            ) : (
              <>
                {productId === 'pack-signature' && (
                  <div className="mb-3">
                    <AmazonRatingBadge lang={lang} variant="minimal" />
                  </div>
                )}
                <div className="flex items-baseline gap-3 mb-3 flex-wrap">
                  <span className={`${
                    isArgiles ? 'text-2xl sm:text-3xl font-bold text-[#3E4A3D]' : 'text-2xl sm:text-3xl md:text-5xl font-bold text-[#1B3022]'
                  }`}>{sheet.price.toFixed(2).replace('.', ',')} €</span>
                  {sheet.originalPrice && (
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[#1B3022]/40 line-through text-xs sm:text-sm">{sheet.originalPrice.toFixed(2).replace('.', ',')} €</span>
                      <span className="text-[9px] font-bold uppercase tracking-wider bg-[#D97706]/10 text-[#B45309] border border-[#D97706]/30 px-2 py-0.5 rounded-full whitespace-nowrap">
                        {lang === 'fr' ? 'Édition 2026' : lang === 'de' ? 'Edition 2026' : '2026 Edition'}
                      </span>
                    </div>
                  )}
                </div>
                
                <button 
                  onClick={() => onAddToCart({
                    id: productId,
                    name: sheet.name,
                    subtitle: sheet.subtitle,
                    price: sheet.price,
                    image: sheet.images[0]
                  })}
                  className={`w-full bg-[#D97706] hover:bg-[#B45309] active:bg-[#92400E] text-white rounded-xl font-bold tracking-wide transition-all flex items-center justify-center gap-2.5 shadow-lg shadow-orange-900/20 transform hover:-translate-y-0.5 cursor-pointer ${
                    isArgiles ? 'px-4 py-3 text-sm min-h-[44px]' : 'px-6 py-4 md:py-5 text-base sm:text-lg md:text-xl min-h-[48px]'
                  }`}
                >
                  <ShoppingBag className="w-4 h-4" /> {t.add_to_cart}
                </button>
                <p className="text-center text-[11px] text-[#1B3022]/55 mt-2.5 flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 shrink-0 text-[#1B3022]/50" /> {t.shipping_info}
                </p>
              </>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
            {sheet.specs.map((spec: any, i: number) => (
              <div key={i} className="bg-[#FAF8F5] border border-[#1B3022]/5 p-2.5 sm:p-3 rounded-xl flex items-center gap-2.5 group hover:bg-white hover:border-[#1B3022]/10 transition-colors">
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-white border border-[#1B3022]/10 rounded-lg flex items-center justify-center shadow-2xs shrink-0">
                  <spec.icon className="w-3.5 h-3.5 text-[#1B3022]" />
                </div>
                <div className="min-w-0">
                  <div className="text-[9px] uppercase font-bold text-[#1B3022]/45 tracking-wider truncate">{spec.label}</div>
                  <div className="text-xs font-semibold text-[#3E4A3D] truncate sm:whitespace-normal">{spec.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto">
        {isBloomLab ? (
          <div className="space-y-16">
            {/* Section 1 : Pourquoi la BloomLab® change la donne ? */}
            <section className="space-y-6">
              <div className="space-y-3">
                <h2 className="text-2xl sm:text-3xl font-black text-[#1B3022] tracking-tight">
                  {lang === 'fr'
                    ? "🧬 Pourquoi la BloomLab® change la donne ?"
                    : lang === 'de'
                    ? "🧬 Warum die BloomLab® den Unterschied macht"
                    : "🧬 Why BloomLab® Changes Everything"}
                </h2>
                <p className="text-base sm:text-lg text-[#1B3022]/80 leading-relaxed">
                  {lang === 'fr'
                    ? "Contrairement aux méthodes traditionnelles qui dénaturent les actifs ou laissent des résidus, la BloomLab® maîtrise les 3 piliers de l'extraction botanique :"
                    : lang === 'de'
                    ? "Im Gegensatz zu herkömmlichen Methoden, die Wirkstoffe zerstören oder Rückstände hinterlassen, beherrscht die BloomLab® die 3 Säulen der botanischen Extraktion:"
                    : "Unlike traditional methods that degrade active compounds or leave residues, BloomLab® masters the 3 pillars of botanical extraction:"}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white border border-[#1B3022]/10 rounded-3xl p-6 shadow-xs space-y-3">
                  <h3 className="text-lg font-bold text-[#1B3022]">
                    {lang === 'fr' ? "🌡️ Thermorégulation de Précision (±0,5 °C)" : lang === 'de' ? "🌡️ Präzise Thermoregulation (±0,5 °C)" : "🌡️ Precision Thermoregulation (±0.5°C)"}
                  </h3>
                  <p className="text-sm text-[#1B3022]/80 leading-relaxed">
                    {lang === 'fr'
                      ? "Fini les actifs brûlés. Que ce soit pour une extraction douce à 50 °C (préservation des terpènes et huiles essentielles) ou une activation à 121 °C (découplage des résines denses), la température reste stable."
                      : lang === 'de'
                      ? "Keine verbrannten Wirkstoffe mehr. Ob sanfte Extraktion bei 50 °C (Schutz von Terpenen und ätherischen Ölen) oder Aktivierung bei 121 °C (Aufschluss dichter Harze) – die Temperatur bleibt stabil."
                      : "No more scorched actives. Whether extracting gently at 50°C (preserving terpenes and essential oils) or activating dense resins at 121°C, temperature remains locked."}
                  </p>
                  <div className="pt-1 text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-2">
                    {lang === 'fr'
                      ? "✅ Vérifié : préserve les molécules thermolabiles."
                      : lang === 'de'
                      ? "✅ Geprüft: schützt hitzeempfindliche Moleküle."
                      : "✅ Verified: preserves heat-labile molecules."}
                  </div>
                </div>

                <div className="bg-white border border-[#1B3022]/10 rounded-3xl p-6 shadow-xs space-y-3">
                  <h3 className="text-lg font-bold text-[#1B3022]">
                    {lang === 'fr' ? "🔄 Agitation Cyclique Douce" : lang === 'de' ? "🔄 Sanfte Zyklische Bewegung" : "🔄 Gentle Cyclic Agitation"}
                  </h3>
                  <p className="text-sm text-[#1B3022]/80 leading-relaxed">
                    {lang === 'fr'
                      ? "Pas de lames broyeuses qui oxydent la plante. Un brassage régulier brise la \"couche limite\" du solvant, maximisant le transfert des principes actifs sans amertume."
                      : lang === 'de'
                      ? "Keine Schneidmesser, die die Pflanze oxidieren. Regelmäßiges Rühren durchbricht die Grenzschicht des Lösungsmittels und maximiert die Wirkstoffausbeute ohne Bitterkeit."
                      : "No shredding blades that oxidize herbs. Steady gentle agitation breaks the solvent boundary layer, maximizing active transfer without bitterness."}
                  </p>
                </div>

                <div className="bg-white border border-[#1B3022]/10 rounded-3xl p-6 shadow-xs space-y-3">
                  <h3 className="text-lg font-bold text-[#1B3022]">
                    {lang === 'fr' ? "🌡️ Cuve Hermétique en Inox 304 Alimentaire" : lang === 'de' ? "🌡️ Hermetischer Behälter aus Edelstahl 304" : "🌡️ Hermetic 304 Food-Grade Steel Tank"}
                  </h3>
                  <p className="text-sm text-[#1B3022]/80 leading-relaxed">
                    {lang === 'fr'
                      ? "Contrairement aux méthodes à l'air libre, notre enceinte close capture et condense les molécules thermolabiles (terpènes, huiles essentielles). Vos actifs ne s'évaporent plus, ils s'infusent."
                      : lang === 'de'
                      ? "Im Gegensatz zu offenen Methoden fängt unser geschlossener Behälter thermolabile Moleküle (Terpene, ätherische Öle) ein und kondensiert sie. Ihre Wirkstoffe verdampfen nicht mehr, sie ziehen ein."
                      : "Unlike open-air methods, our sealed chamber captures and condenses heat-sensitive molecules (terpenes, essential oils). Your actives no longer evaporate—they infuse."}
                  </p>
                </div>
              </div>
            </section>

            {/* Section 2 : Deux exemples de ce que vous pouvez créer dès ce soir */}
            <section className="bg-[#1B3022]/5 border border-[#1B3022]/10 rounded-3xl p-6 sm:p-10 space-y-6">
              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl font-black text-[#1B3022] tracking-tight">
                  {lang === 'fr'
                    ? "🌿 Deux exemples de ce que vous pouvez créer dès ce soir :"
                    : lang === 'de'
                    ? "🌿 Zwei Beispiele, die Sie heute Abend zubereiten können:"
                    : "🌿 Two creations you can make tonight:"}
                </h2>
                <p className="text-xs sm:text-sm font-semibold text-[#1B3022]/70">
                  {lang === 'fr'
                    ? "Repère des phases : Phase A = Hydrosoluble (eau & infusions) • Phase B = Liposoluble (huiles végétales & macérats)"
                    : lang === 'de'
                    ? "Phasen-Hinweis: Phase A = Wasserlöslich (Wasser & Aufgüsse) • Phase B = Fettlöslich (Pflanzenöle & Mazerate)"
                    : "Phase guide: Phase A = Water-soluble (water & infusions) • Phase B = Fat-soluble (plant oils & macerates)"}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl p-6 border border-[#1B3022]/10 shadow-xs space-y-3">
                  <h3 className="text-lg font-extrabold text-[#1B3022]">
                    {lang === 'fr' ? "Sérum Capillaire Fortifiant" : lang === 'de' ? "Kräftigendes Haarserum" : "Fortifying Hair Serum"}
                  </h3>
                  <div className="flex flex-wrap gap-2 text-xs font-bold">
                    <span className="px-2.5 py-1 rounded-md bg-amber-50 text-[#B45309] border border-amber-200">
                      {lang === 'fr' ? "Phase : Phase B (Liposoluble)" : lang === 'de' ? "Phase: Phase B (Fettlöslich)" : "Phase: Phase B (Fat-soluble)"}
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-[#1B3022]/5 text-[#1B3022] border border-[#1B3022]/10">
                      {lang === 'fr' ? "Paramètres : 45°C / 2h" : lang === 'de' ? "Parameter: 45°C / 2 Std." : "Parameters: 45°C / 2h"}
                    </span>
                  </div>
                  <p className="text-sm text-[#1B3022]/85 leading-relaxed">
                    {lang === 'fr'
                      ? "Extraction des actifs du romarin et du gingembre dans l'huile de jojoba. Une synergie qui fortifie le cuir chevelu tout en préservant la légèreté de l'huile, sans résidus brûlés."
                      : lang === 'de'
                      ? "Extraktion der Wirkstoffe von Rosmarin und Ingwer in Jojobaöl. Eine Synergie, die die Kopfhaut stärkt und gleichzeitig die Leichtigkeit des Öls ohne verbrannte Rückstände bewahrt."
                      : "Extraction of rosemary and ginger actives in jojoba oil. A synergy that strengthens the scalp while preserving the lightness of the oil, with zero burnt residue."}
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-[#1B3022]/10 shadow-xs space-y-3">
                  <h3 className="text-lg font-extrabold text-[#1B3022]">
                    {lang === 'fr' ? "Baume Apaisant au Calendula" : lang === 'de' ? "Beruhigender Calendula-Balsam" : "Soothing Calendula Balm"}
                  </h3>
                  <div className="flex flex-wrap gap-2 text-xs font-bold">
                    <span className="px-2.5 py-1 rounded-md bg-amber-50 text-[#B45309] border border-amber-200">
                      {lang === 'fr' ? "Phase : Phase B (Liposoluble)" : lang === 'de' ? "Phase: Phase B (Fettlöslich)" : "Phase: Phase B (Fat-soluble)"}
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-[#1B3022]/5 text-[#1B3022] border border-[#1B3022]/10">
                      {lang === 'fr' ? "Paramètres : 40°C / 3h" : lang === 'de' ? "Parameter: 40°C / 3 Std." : "Parameters: 40°C / 3h"}
                    </span>
                  </div>
                  <p className="text-sm text-[#1B3022]/85 leading-relaxed">
                    {lang === 'fr'
                      ? "Macérat de fleurs de calendula dans l'huile d'olive. Une extraction douce qui capture tous les principes apaisants et les pigments de la fleur, pour un baume riche et réparateur."
                      : lang === 'de'
                      ? "Mazerat aus Ringelblumenblüten in Olivenöl. Eine sanfte Extraktion, die alle beruhigenden Wirkstoffe und Pigmente der Blüte für einen reichhaltigen, regenerierenden Balsam einfängt."
                      : "Maceration of calendula flowers in olive oil. A gentle extraction that captures all soothing actives and floral pigments for a rich, restorative balm."}
                  </p>
                </div>
              </div>
            </section>

            {/* Section 3 : Choisissez votre niveau d'autonomie */}
            <section className="space-y-6">
              <h2 className="text-2xl sm:text-3xl font-black text-[#1B3022] tracking-tight">
                {lang === 'fr'
                  ? "📦 Choisissez votre niveau d'autonomie"
                  : lang === 'de'
                  ? "📦 Wählen Sie Ihr Autonomie-Level"
                  : "📦 Choose Your Level of Autonomy"}
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
                {/* OPTION 1 : BloomLab® Solo */}
                <div className="bg-white border border-[#1B3022]/15 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div>
                      <div className="text-xs font-black uppercase tracking-widest text-[#B45309] mb-1">
                        {lang === 'fr' ? "OPTION 1" : "OPTION 1"}
                      </div>
                      <h3 className="text-xl sm:text-2xl font-black text-[#1B3022]">
                        {lang === 'fr'
                          ? "BloomLab® Solo — L'essentiel pour débuter"
                          : lang === 'de'
                          ? "BloomLab® Solo — Das Wesentliche für den Start"
                          : "BloomLab® Solo — Essentials to Begin"}
                      </h3>
                      <p className="text-sm text-[#1B3022]/70 mt-1 italic">
                        {lang === 'fr'
                          ? "Idéal si vous avez déjà vos plantes et solvants."
                          : lang === 'de'
                          ? "Ideal, wenn Sie bereits eigene Pflanzen und Lösungsmittel besitzen."
                          : "Ideal if you already have your own herbs and solvents."}
                      </p>
                    </div>

                    <ul className="space-y-2.5 text-sm text-[#1B3022]/85">
                      <li className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
                        <span>{lang === 'fr' ? "Extracteur BloomLab® v2 (Cuve Inox 304 + Couvercle hermétique)" : lang === 'de' ? "Extraktor BloomLab® v2 (Edelstahl 304 + hermetischer Deckel)" : "BloomLab® v2 Extractor (304 Steel Tank + Airtight Lid)"}</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
                        <span>{lang === 'fr' ? "Sac de filtration en maille fine (90 µm)" : lang === 'de' ? "Feinmaschiger Filterbeutel (90 µm)" : "Fine mesh filtration bag (90 µm)"}</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
                        <span>{lang === 'fr' ? "Manuel d'utilisation & Accès au Guide Digital \"100 Recettes Pas-à-Pas\"" : lang === 'de' ? "Bedienungsanleitung & Zugang zum digitalen Rezeptbuch \"100 Schritt-für-Schritt-Rezepte\"" : "User manual & access to the \"100 Step-by-Step Recipes\" Digital Guide"}</span>
                      </li>
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-[#1B3022]/10 space-y-4">
                    <div className="flex items-baseline gap-3 flex-wrap">
                      <span className="text-xs font-black uppercase tracking-wider text-[#B45309]">
                        {lang === 'fr' ? "Prix Black Friday :" : lang === 'de' ? "Black-Friday-Preis:" : "Black Friday Price:"}
                      </span>
                      <span className="text-3xl font-black text-[#1B3022]">229 €</span>
                      <span className="text-sm line-through text-[#1B3022]/45">
                        {lang === 'fr' ? "(au lieu de 289 €)" : lang === 'de' ? "(statt 289 €)" : "(instead of €289)"}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => onAddToCart({
                        id: 'bloomlab',
                        name: sheet.name,
                        subtitle: sheet.subtitle,
                        price: 229.00,
                        image: sheet.images[0]
                      })}
                      className="w-full py-3.5 px-5 bg-[#1B3022] hover:bg-[#132218] text-white rounded-xl font-bold text-sm sm:text-base transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                    >
                      <span>👉 {lang === 'fr' ? "Ajouter au panier — Expédition 24/48h" : lang === 'de' ? "In den Warenkorb — Versand 24/48h" : "Add to Cart — Ships 24/48h"}</span>
                    </button>
                  </div>
                </div>

                {/* OPTION 2 : Pack Signature */}
                <div className="bg-[#1B3022] text-white border-2 border-[#D97706] rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col justify-between space-y-6 relative">
                  <div className="space-y-4">
                    <div>
                      <div className="inline-block px-3 py-1 rounded-full bg-[#D97706] text-white text-[10px] font-black uppercase tracking-widest mb-2">
                        {lang === 'fr' ? "OPTION 2 • RECOMMANDÉ" : lang === 'de' ? "OPTION 2 • EMPFOHLEN" : "OPTION 2 • RECOMMENDED"}
                      </div>
                      <h3 className="text-xl sm:text-2xl font-black text-white !text-white">
                        {lang === 'fr'
                          ? "Pack Signature — Le protocole complet"
                          : lang === 'de'
                          ? "Signature-Paket — Das Komplettprotokoll"
                          : "Signature Pack — Complete Protocol"}
                      </h3>
                      <p className="text-sm text-white !text-white mt-1">
                        {lang === 'fr'
                          ? "Économisez 60 € et démarrez avec tout ce qu'il faut pour 3 mois de pratique."
                          : lang === 'de'
                          ? "Sparen Sie 60 € und starten Sie mit allem, was Sie für 3 Monate Praxis benötigen."
                          : "Save €60 and start with everything you need for 3 months of practice."}
                      </p>
                    </div>

                    <ul className="space-y-2.5 text-sm text-white !text-white">
                      <li className="flex items-start gap-2.5 text-white !text-white">
                        <Check className="w-4 h-4 text-[#E8772E] shrink-0 mt-0.5" />
                        <span className="text-white !text-white">{lang === 'fr' ? "Tout le contenu de l'offre Solo" : lang === 'de' ? "Der gesamte Inhalt des Solo-Angebots" : "Everything included in the Solo offer"}</span>
                      </li>
                      <li className="flex items-start gap-2.5 text-white !text-white">
                        <Check className="w-4 h-4 text-[#E8772E] shrink-0 mt-0.5" />
                        <span className="text-white !text-white">{lang === 'fr' ? "+ Kit Apothicaire de Démarrage (Plantes bio sélectionnées pour 5 protocoles phares)" : lang === 'de' ? "+ Apotheker-Starter-Set (Bio-Pflanzen für 5 Hauptprotokolle)" : "+ Apothecary Starter Kit (Organic herbs selected for 5 signature protocols)"}</span>
                      </li>
                      <li className="flex items-start gap-2.5 text-white !text-white">
                        <Check className="w-4 h-4 text-[#E8772E] shrink-0 mt-0.5" />
                        <span className="text-white !text-white">{lang === 'fr' ? "+ Duo Argiles Bloom (Zeolithe & Bentonite documentées pour la purification)" : lang === 'de' ? "+ Bloom Tonerde-Duo (Zeolith & Bentonit für Reinigung)" : "+ Bloom Clay Duo (Zeolite & Bentonite for purification)"}</span>
                      </li>
                      <li className="flex items-start gap-2.5 text-white !text-white">
                        <Check className="w-4 h-4 text-[#E8772E] shrink-0 mt-0.5" />
                        <span className="text-white !text-white">{lang === 'fr' ? "+ Accès Premium 3 mois à l'Académie (Vidéos de formation et fiches techniques avancées)" : lang === 'de' ? "+ 3 Monate Premium-Akademie-Zugang (Schulungsvideos & technische Datenblätter)" : "+ 3 Months Premium Academy Access (Training videos & advanced datasheets)"}</span>
                      </li>
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-white/15 space-y-4">
                    <div className="flex items-baseline gap-3 flex-wrap">
                      <span className="text-xs font-black uppercase tracking-wider text-[#E8772E]">
                        {lang === 'fr' ? "Prix Black Friday :" : lang === 'de' ? "Black-Friday-Preis:" : "Black Friday Price:"}
                      </span>
                      <span className="text-3xl font-black text-white">289 €</span>
                      <span className="text-sm line-through text-white/50">
                        {lang === 'fr' ? "(au lieu de 349 €)" : lang === 'de' ? "(statt 349 €)" : "(instead of €349)"}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => onAddToCart({
                        id: 'pack-signature',
                        name: packSignatureSheet?.name || 'Pack Signature — BloomLab®',
                        subtitle: packSignatureSheet?.subtitle || sheet.subtitle,
                        price: 289.00,
                        image: packSignatureSheet?.images?.[0] || sheet.images[0]
                      })}
                      className="w-full py-3.5 px-5 bg-[#E8772E] hover:bg-[#D4651F] text-white rounded-xl font-black text-sm sm:text-base transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                    >
                      <span>👉 {lang === 'fr' ? "Commander le Pack Signature — Expédition 24/48h" : lang === 'de' ? "Signature-Paket bestellen — Versand 24/48h" : "Order Signature Pack — Ships 24/48h"}</span>
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 4 : Votre sérénité est notre priorité */}
            <section className="bg-[#FAF8F5] border border-[#1B3022]/10 rounded-3xl p-6 sm:p-10 space-y-6">
              <h2 className="text-2xl sm:text-3xl font-black text-[#1B3022] tracking-tight">
                {lang === 'fr'
                  ? "🛡️ Votre sérénité est notre priorité"
                  : lang === 'de'
                  ? "🛡️ Ihre Sicherheit steht an erster Stelle"
                  : "🛡️ Your Peace of Mind Comes First"}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="bg-white rounded-2xl p-5 border border-[#1B3022]/10 space-y-1">
                  <div className="font-bold text-[#1B3022]">
                    {lang === 'fr' ? "🚚 Expédition Prioritaire" : lang === 'de' ? "🚚 Prioritätsversand" : "🚚 Priority Shipping"}
                  </div>
                  <p className="text-sm text-[#1B3022]/75">
                    {lang === 'fr' ? "Sous 24/48h depuis notre entrepôt." : lang === 'de' ? "Innerhalb von 24/48h aus unserem Lager." : "Within 24/48h from our warehouse."}
                  </p>
                </div>
                <div className="bg-white rounded-2xl p-5 border border-[#1B3022]/10 space-y-1">
                  <div className="font-bold text-[#1B3022]">
                    {lang === 'fr' ? "🔄 Satisfait ou Remboursé" : lang === 'de' ? "🔄 Zufriedenheitsgarantie" : "🔄 Money-Back Guarantee"}
                  </div>
                  <p className="text-sm text-[#1B3022]/75">
                    {lang === 'fr'
                      ? "30 jours pour tester la machine chez vous. Si elle ne révolutionne pas vos préparations, nous la reprenons."
                      : lang === 'de'
                      ? "30 Tage zu Hause testen. Wenn sie Ihre Zubereitungen nicht revolutioniert, nehmen wir sie zurück."
                      : "30 days to test the appliance at home. If it doesn't transform your preparations, we take it back."}
                  </p>
                </div>
                <div className="bg-white rounded-2xl p-5 border border-[#1B3022]/10 space-y-1">
                  <div className="font-bold text-[#1B3022]">
                    {lang === 'fr' ? "⚡ Garantie Constructeur" : lang === 'de' ? "⚡ Herstellergarantie" : "⚡ Manufacturer Warranty"}
                  </div>
                  <p className="text-sm text-[#1B3022]/75">
                    {lang === 'fr'
                      ? "1 an de garantie constructeur sur l'électronique et la cuve."
                      : lang === 'de'
                      ? "1 Jahr Herstellergarantie auf Elektronik und Edelstahlbehälter."
                      : "1-year manufacturer warranty on electronics and stainless steel tank."}
                  </p>
                </div>
                <div className="bg-white rounded-2xl p-5 border border-[#1B3022]/10 space-y-1">
                  <div className="font-bold text-[#1B3022]">
                    {lang === 'fr' ? "💳 Paiement Flexible" : lang === 'de' ? "💳 Flexible Zahlung" : "💳 Flexible Payment"}
                  </div>
                  <p className="text-sm text-[#1B3022]/75">
                    {lang === 'fr'
                      ? "3x ou 4x sans frais via Klarna ou PayPal."
                      : lang === 'de'
                      ? "3x oder 4x zinsfrei über Klarna oder PayPal."
                      : "3x or 4x interest-free via Klarna or PayPal."}
                  </p>
                </div>
              </div>
            </section>
          </div>
        ) : (
          <div dangerouslySetInnerHTML={{ __html: sheet.fullDescription }} />
        )}

        {/* SEO Linking: Guides & Recettes associés */}
        <div className="mt-16 pt-10 border-t border-[#1B3022]/10">
          <h3 className="text-xl font-bold text-[#1B3022] mb-6">
            {lang === 'fr' ? 'Guides d’extraction & Protocoles associés' : lang === 'de' ? 'Verwandte Extraktions-Leitfäden & Protokolle' : 'Related Extraction Guides & Protocols'}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <a 
              href="/extraction-botanique/"
              onClick={(e) => {
                if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                  e.preventDefault();
                  onNavigate('pillar-extraction');
                }
              }}
              className="p-4 rounded-2xl bg-[#F9F9F7] border border-[#1B3022]/5 hover:border-[#C8AB8A]/30 transition-all group flex flex-col justify-between"
            >
              <div className="text-[10px] uppercase font-bold text-[#C8AB8A] mb-1">
                {lang === 'fr' ? 'Guide Pratique' : lang === 'de' ? 'Praxisleitfaden' : 'Practical Guide'}
              </div>
              <div className="text-sm font-bold text-[#1B3022] group-hover:text-[#C8AB8A] transition-colors mb-2">
                {lang === 'fr' ? "L'Art de l'Extraction Botanique de Précision" : lang === 'de' ? "Die Kunst der botanischen Präzisionsextraktion" : "Botanical Precision Extraction"}
              </div>
              <span className="text-xs text-[#1B3022]/50">
                {lang === 'fr' ? 'Consulter le dossier' : lang === 'de' ? 'Dossier lesen' : 'Read the guide'} &rarr;
              </span>
            </a>

            <a 
              href="/recettes/"
              onClick={(e) => {
                if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                  e.preventDefault();
                  onNavigate('recettes');
                }
              }}
              className="p-4 rounded-2xl bg-[#F9F9F7] border border-[#1B3022]/5 hover:border-[#C8AB8A]/30 transition-all group flex flex-col justify-between"
            >
              <div className="text-[10px] uppercase font-bold text-[#C8AB8A] mb-1">
                {lang === 'fr' ? 'Protocoles' : lang === 'de' ? 'Protokolle' : 'Protocols'}
              </div>
              <div className="text-sm font-bold text-[#1B3022] group-hover:text-[#C8AB8A] transition-colors mb-2">
                {lang === 'fr' ? "Recettes & Formules d'Herboristerie" : lang === 'de' ? "Kräuterrezepte & Rezepturen" : "Herbal Recipes & Formulas"}
              </div>
              <span className="text-xs text-[#1B3022]/50">
                {lang === 'fr' ? 'Explorer les recettes' : lang === 'de' ? 'Rezepte entdecken' : 'Explore recipes'} &rarr;
              </span>
            </a>

            <a 
              href="/infuseur-botanique/"
              onClick={(e) => {
                if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                  e.preventDefault();
                  onNavigate('infuseur-botanique');
                }
              }}
              className="p-4 rounded-2xl bg-[#F9F9F7] border border-[#1B3022]/5 hover:border-[#C8AB8A]/30 transition-all group flex flex-col justify-between"
            >
              <div className="text-[10px] uppercase font-bold text-[#C8AB8A] mb-1">
                {lang === 'fr' ? 'Technologie' : lang === 'de' ? 'Technologie' : 'Technology'}
              </div>
              <div className="text-sm font-bold text-[#1B3022] group-hover:text-[#C8AB8A] transition-colors mb-2">
                {lang === 'fr' ? "Principe de l'Infusion Séquentielle A/B" : lang === 'de' ? "Prinzip des sequenziellen A/B-Aufgusses" : "Sequential A/B Infusion"}
              </div>
              <span className="text-xs text-[#1B3022]/50">
                {lang === 'fr' ? 'Découvrir la méthode' : lang === 'de' ? 'Methode entdecken' : 'Discover the method'} &rarr;
              </span>
            </a>
          </div>
        </div>
      </div>
      
      <footer className="mt-20 border-t border-[#1B3022]/10 pt-10 text-center">
        <div className="flex flex-wrap justify-center gap-6 mb-8 text-xs font-bold uppercase tracking-widest text-[#1B3022]/40">
          <a 
            href="/mentions-legales/"
            onClick={(e) => {
              if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                e.preventDefault();
                onNavigate('legal', undefined, 'mentions');
              }
            }}
            className="hover:text-botanik-orange transition-colors"
          >
            {lang === 'fr' ? 'Mentions Légales' : lang === 'de' ? 'Impressum' : 'Legal Notice'}
          </a>
          <a 
            href="/conditions-generales-de-vente/"
            onClick={(e) => {
              if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                e.preventDefault();
                onNavigate('legal', undefined, 'cgv');
              }
            }}
            className="hover:text-botanik-orange transition-colors"
          >
            {lang === 'fr' ? 'CGV' : lang === 'de' ? 'AGB' : 'Terms of Sale'}
          </a>
          <a 
            href="/termes-et-conditions/"
            onClick={(e) => {
              if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                e.preventDefault();
                onNavigate('legal', undefined, 'cgu');
              }
            }}
            className="hover:text-botanik-orange transition-colors"
          >
            {lang === 'fr' ? 'CGU' : lang === 'de' ? 'Nutzungsbedingungen' : 'Terms of Use'}
          </a>
        </div>
        <p className="text-sm text-[#1B3022]/40 italic max-w-2xl mx-auto">
          {sheet.name} {t.disclaimer}
        </p>
      </footer>

      {/* Zoom Modal */}
      {isZoomed && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-300 cursor-zoom-out"
          onClick={() => setIsZoomed(false)}
        >
          <button 
            className="absolute top-6 right-6 p-3 bg-[#3E4A3D] hover:bg-[#2D372C] rounded-full text-white transition-colors border border-white/20"
            onClick={() => setIsZoomed(false)}
          >
            <X className="w-8 h-8" />
          </button>
          <img 
            src={gallery[activeImage].src} 
            alt={gallery[activeImage].alt} 
            className={`max-w-full max-h-full object-contain ${isArgiles ? 'max-w-[420px] max-h-[420px] bg-white p-6 rounded-3xl shadow-2xl' : ''} animate-in zoom-in-95 duration-300`}
          />
        </div>
      )}
    </article>
  </>
);
}