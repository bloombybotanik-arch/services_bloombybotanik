import React, { useState, useMemo } from 'react';
import { ArrowLeft, Check, ShieldCheck, Thermometer, Timer, RefreshCw, ShoppingBag, FlaskConical, Beaker, Leaf, ChefHat, X, Star, Heart, Share2, Info, Award } from 'lucide-react';
import { translations, Language } from './translations';
import { getProductSheets } from './data/productDetailsData';
import { AmazonRatingBadge } from './components/AmazonSocialProof';

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
  const t = translations[lang].product_detail;
  const productSheets = useMemo(() => getProductSheets(lang), [lang]);
  const sheet = productSheets[productId] || productSheets['bloomlab'];
  const isArgiles = productId === 'duo-argiles' || productId === 'kit-reset';
  const gallery = sheet.images.map((img: string, i: number) => ({ 
    src: img, 
    alt: `${sheet.name} - ${sheet.subtitle || 'Herboristerie de précision'} - Vue ${i + 1} - Infuseur et extracteur botanique Bloom by BotaniK`
  }));

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `https://bloombybotanik.com/boutique/${productId}/#product`,
    "name": sheet.name,
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
        "merchantReturnDays": 14,
        "returnMethod": "https://schema.org/ReturnByMail",
        "returnFees": "https://schema.org/ReturnShippingFees"
      }
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": lang === 'fr' ? "Accueil" : "Home",
        "item": "https://bloombybotanik.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": lang === 'fr' ? "Boutique" : "Shop",
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

  return (
    <article data-product-page="true" className="product-detail w-full max-w-[1200px] mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <script type="application/ld+json">
        {JSON.stringify(productSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
        <nav aria-label="Fil d'Ariane" className="flex items-center gap-2 text-xs sm:text-sm text-[#1B3022]/60">
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
                className="w-full h-full min-h-full object-cover object-center transition-transform duration-700 hover:scale-105"
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
              <div className="absolute top-4 left-4 sm:top-6 sm:left-6 bg-[#0F261E]/90 backdrop-blur-md text-[#D97706] px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] border border-[#D97706]/30 shadow-lg z-20 whitespace-nowrap flex items-center gap-1.5">
                <Leaf className="w-3.5 h-3.5 text-[#D97706]" />
                <span>Argiles &amp; Matières Premières</span>
              </div>
            )}
            {productId === 'bloomlab' && (
              <div className="absolute top-4 left-4 sm:top-6 sm:left-6 bg-[#D97706] text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] border border-white/20 shadow-xl z-20 whitespace-nowrap">
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
                        ? 'border-[#D97706] ring-2 ring-[#D97706]/40 shadow-md scale-105' 
                        : 'border-[#1B3022]/15 hover:border-[#D97706]/50 opacity-80 hover:opacity-100 hover:scale-102'
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
          isArgiles ? 'p-6 sm:p-8 lg:p-10' : 'p-5 sm:p-8 md:p-16 lg:p-20'
        }`}>
          <div className="flex items-center gap-2 text-[#1C3F34] font-bold uppercase tracking-widest text-[9px] sm:text-[10px] mb-2 sm:mb-2.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#D97706]" /> 
            <span>{lang === 'fr' ? 'Conception Botanique & Minérale de Précision' : lang === 'de' ? 'Botanische Präzisionsentwicklung' : 'Precision Botanical Design'}</span>
          </div>
          
          {isArgiles ? (
            <div className="mb-3">
              <div className="text-[#C9922B] text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] mb-1.5">
                {sheet.subtitle}
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-[#0F261E] tracking-tight leading-snug">
                Duo Argiles Bloom
              </h1>
              <p className="text-xs sm:text-sm font-medium text-[#1B3022]/70 mt-1">
                Purification Systémique Zéolithe-Bentonite (6μm)
              </p>
            </div>
          ) : (
            <>
              <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-[#1B3022] mb-3 sm:mb-4 md:mb-6 tracking-tight leading-tight">
                {sheet.name}
              </h1>
              <div className="text-[#D97706] text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] mb-4">
                {sheet.subtitle}
              </div>
              {(productId === 'bloomlab' || productId === 'pack-signature') && (
                <div className="mb-4">
                  <AmazonRatingBadge lang={lang} />
                </div>
              )}
            </>
          )}
          
          <p className={`${
            isArgiles
              ? 'text-xs sm:text-sm text-[#1B3022]/75 font-normal mb-4 leading-relaxed max-w-xl'
              : 'text-sm sm:text-base md:text-xl text-[#1B3022]/80 font-medium mb-6 md:mb-8 leading-relaxed'
          }`}>
            {sheet.description}
          </p>

          <div className={`rounded-2xl sm:rounded-3xl border border-[#1B3022]/8 ${
            isArgiles ? 'bg-[#FAF8F5] p-4 sm:p-5 mb-5 shadow-xs' : 'bg-[#F9F9F7] p-5 sm:p-8 mb-8 md:mb-10'
          }`}>
            {(productId === 'bloomlab' || productId === 'pack-signature') && (
              <div className="mb-3">
                <AmazonRatingBadge lang={lang} variant="minimal" />
              </div>
            )}
            <div className="flex items-baseline gap-3 mb-3 flex-wrap">
              <span className={`${
                isArgiles ? 'text-2xl sm:text-3xl font-bold text-[#0F261E]' : 'text-2xl sm:text-3xl md:text-5xl font-bold text-[#1B3022]'
              }`}>{sheet.price.toFixed(2).replace('.', ',')} €</span>
              {sheet.originalPrice && (
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[#1B3022]/40 line-through text-xs sm:text-sm">{sheet.originalPrice.toFixed(2).replace('.', ',')} €</span>
                  <span className="text-[9px] font-bold uppercase tracking-wider bg-[#D97706]/10 text-[#D97706] border border-[#D97706]/20 px-2 py-0.5 rounded-full whitespace-nowrap">
                    Édition Rentrée 2026
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
              className={`w-full bg-[#0F261E] hover:bg-[#D97706] active:bg-[#B45309] text-white rounded-xl font-bold tracking-wide transition-all flex items-center justify-center gap-2.5 shadow-md shadow-black/5 transform hover:-translate-y-0.5 cursor-pointer ${
                isArgiles ? 'px-4 py-3 text-sm min-h-[44px]' : 'px-6 py-4 md:py-5 text-base sm:text-lg md:text-xl min-h-[48px]'
              }`}
            >
              <ShoppingBag className="w-4 h-4" /> {t.add_to_cart}
            </button>
            <p className="text-center text-[11px] text-[#1B3022]/55 mt-2.5 flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 shrink-0 text-[#1B3022]/50" /> {t.shipping_info}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
            {sheet.specs.map((spec: any, i: number) => (
              <div key={i} className="bg-[#FAF8F5] border border-[#1B3022]/5 p-2.5 sm:p-3 rounded-xl flex items-center gap-2.5 group hover:bg-white hover:border-[#1B3022]/10 transition-colors">
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-white border border-[#1B3022]/10 rounded-lg flex items-center justify-center shadow-2xs shrink-0">
                  <spec.icon className="w-3.5 h-3.5 text-[#1B3022]" />
                </div>
                <div className="min-w-0">
                  <div className="text-[9px] uppercase font-bold text-[#1B3022]/45 tracking-wider truncate">{spec.label}</div>
                  <div className="text-xs font-semibold text-[#0F261E] truncate sm:whitespace-normal">{spec.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        <div dangerouslySetInnerHTML={{ __html: sheet.fullDescription }} />

        {/* SEO Linking: Guides & Recettes associés */}
        <div className="mt-16 pt-10 border-t border-[#1B3022]/10">
          <h3 className="text-xl font-bold text-[#1B3022] mb-6">
            {lang === 'fr' ? 'Guides d’extraction & Protocoles associés' : 'Related Extraction Guides & Recipes'}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <a 
              href="/extraction-botanique-guide-complet/"
              onClick={(e) => {
                if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                  e.preventDefault();
                  onNavigate('extraction-guide');
                }
              }}
              className="p-4 rounded-2xl bg-[#F9F9F7] border border-[#1B3022]/5 hover:border-[#D97706]/30 transition-all group flex flex-col justify-between"
            >
              <div className="text-[10px] uppercase font-bold text-[#D97706] mb-1">Guide Pratique</div>
              <div className="text-sm font-bold text-[#1B3022] group-hover:text-[#D97706] transition-colors mb-2">
                {lang === 'fr' ? "L'Art de l'Extraction Botanique de Précision" : "Botanical Precision Extraction"}
              </div>
              <span className="text-xs text-[#1B3022]/50">Consulter le dossier &rarr;</span>
            </a>

            <a 
              href="/recettes/"
              onClick={(e) => {
                if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                  e.preventDefault();
                  onNavigate('recettes');
                }
              }}
              className="p-4 rounded-2xl bg-[#F9F9F7] border border-[#1B3022]/5 hover:border-[#D97706]/30 transition-all group flex flex-col justify-between"
            >
              <div className="text-[10px] uppercase font-bold text-[#D97706] mb-1">Protocoles</div>
              <div className="text-sm font-bold text-[#1B3022] group-hover:text-[#D97706] transition-colors mb-2">
                {lang === 'fr' ? "Recettes & Formules d'Herboristerie" : "Herbal Recipes & Formulas"}
              </div>
              <span className="text-xs text-[#1B3022]/50">Explorer les recettes &rarr;</span>
            </a>

            <a 
              href="/infuseur-botanique/"
              onClick={(e) => {
                if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                  e.preventDefault();
                  onNavigate('infuseur-botanique');
                }
              }}
              className="p-4 rounded-2xl bg-[#F9F9F7] border border-[#1B3022]/5 hover:border-[#D97706]/30 transition-all group flex flex-col justify-between"
            >
              <div className="text-[10px] uppercase font-bold text-[#D97706] mb-1">Technologie</div>
              <div className="text-sm font-bold text-[#1B3022] group-hover:text-[#D97706] transition-colors mb-2">
                {lang === 'fr' ? "Principe de l'Infusion Séquentielle A/B" : "Sequential A/B Infusion"}
              </div>
              <span className="text-xs text-[#1B3022]/50">Découvrir la méthode &rarr;</span>
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
            Mentions Légales
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
            CGV
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
            CGU
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
            className="absolute top-6 right-6 p-3 bg-[#0F261E] hover:bg-[#1C3F34] rounded-full text-white transition-colors border border-white/20"
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
  );
}

