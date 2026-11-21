import React, { useState, useMemo } from 'react';
import { Search, ShoppingCart, Info, Check, Filter, ChevronRight, ArrowRight, Star, ShieldCheck, Zap, Package, FlaskConical, Leaf, Heart, Wind, Flame, Droplets, User, FileText, Globe, ShoppingBag } from 'lucide-react';
import { OptimizedImage } from './components/OptimizedImage';
import { StoreSequencingSection } from './components/StoreSequencingSection';
import packSignatureImg from './assets/images/BloomLab_pack_signature.png';
// import bloomLabImg from './assets/images/bloomlab_main_1784887530345.jpeg';
// import img05 from './assets/images/lifestyle_botanik_cleaned_1786616810137.jpg';
// import labHeroImg from './assets/images/lab_detail_cleaned_1786616788618.jpg';
// import remediesImg from './assets/images/natural_remedies_cleaned_1786616831671.jpg';
// import herbsCloseUpImg from './assets/images/herbs_close_up_cleaned_1786616800877.jpg';
// import duoArgilesImg from './assets/images/product_duo_argiles.jpg';
// import trioPouchesImg from './assets/images/product_trio_pouches.jpg';
// import feuArticulaireImg from './assets/images/product_feu_articulaire.jpg';
// import bouclierHiverImg from './assets/images/product_bouclier_hiver.jpg';
// import nuitProfondeImg from './assets/images/product_nuit_profonde.jpg';
// import seveFondamentaleImg from './assets/images/product_seve_fondamentale.jpg';
// import digestionImg from './assets/images/product_digestion.jpeg';
// import modernShelvesImg from './assets/images/modern_herbalist_shelves_1786699793560.jpg';

const bloomLabImg = "/assets/images/BloomLab_rosemary_infusion.png";
const img05 = "/assets/images/lifestyle_botanik_cleaned_1786616810137.jpg";
const labHeroImg = "/assets/images/lab_detail_cleaned_1786616788618.jpg";
const remediesImg = "/assets/images/natural_remedies_cleaned_1786616831671.jpg";
const herbsCloseUpImg = "/assets/images/herbs_close_up_cleaned_1786616800877.jpg";
const duoArgilesImg = "/img/produit/duo-argiles-1200x1200.jpg";
const trioPouchesImg = "/img/produit/trio-pouches-1200x1200.jpg";
const feuArticulaireImg = "/img/produit/feu-articulaire-1200x1200.jpg";
const bouclierHiverImg = "/img/produit/bouclier-hiver-1200x1200.jpg";
const nuitProfondeImg = "/img/produit/nuit-profonde-1200x1200.jpg";
const seveFondamentaleImg = "/img/produit/seve-fondamentale-1200x1200.jpg";
const digestionImg = "/img/produit/digestion-1200x1200.jpg";
const modernShelvesImg = "/assets/images/modern_herbalist_shelves_1786699793560.jpg";
import { translations, Language } from './translations';

export const getProducts = (lang: Language) => {
  const t = translations[lang].store.products;
  
  const bloomLabPrice = 229.00;
  const bloomLabOriginal = 289.00;

  const seoTags = (translations[lang].seo.keywords || "").split(', ').slice(3, 8); // Take 5 keywords from the list

  return [
    {
      id: 'bloomlab',
      name: t.bloomlab.name,
      subtitle: t.bloomlab.subtitle,
      price: bloomLabPrice,
      originalPrice: bloomLabOriginal,
      image: bloomLabImg,
      rating: 4.9,
      reviews: 128,
      description: t.bloomlab.description,
      bullets: t.bloomlab.bullets,
      tags: ['Best-Seller', 'Inox 304', 'Souveraineté'],
      featured: true
    },
    {
      id: 'bundle-apothicaire',
      name: t.bundle_apothicaire.name,
      subtitle: t.bundle_apothicaire.subtitle,
      price: 49.00,
      originalPrice: 87.50,
      image: trioPouchesImg,
      rating: 5.0,
      reviews: 64,
      description: t.bundle_apothicaire.description,
      tags: ['Offre Limitée', 'Best-Value'],
      isBundle: true
    },
    {
      id: 'pack-signature',
      name: t.pack_signature.name,
      subtitle: t.pack_signature.subtitle,
      price: 289.00,
      oldPriceStrike: 349.00,
      image: packSignatureImg,
      rating: 5.0,
      reviews: 42,
      description: t.pack_signature.description,
      tags: ['Le plus populaire', 'Complet', 'Best-Seller'],
      isBundle: true
    },
    {
      id: 'kit-starter',
      name: t.kit_starter.name,
      subtitle: t.kit_starter.subtitle,
      price: 12.90,
      image: seveFondamentaleImg,
      rating: 4.8,
      reviews: 56,
      description: t.kit_starter.description,
      tags: ['Kit', 'Plantes']
    },
    {
      id: 'kit-nuit',
      name: t.kit_nuit.name,
      subtitle: t.kit_nuit.subtitle,
      price: 9.90,
      image: nuitProfondeImg,
      rating: 4.9,
      reviews: 42,
      description: t.kit_nuit.description,
      tags: ['Sommeil']
    },
    {
      id: 'kit-digestion',
      name: t.kit_digestion.name,
      subtitle: t.kit_digestion.subtitle,
      price: 9.90,
      image: digestionImg,
      rating: 4.7,
      reviews: 35,
      description: t.kit_digestion.description,
      tags: ['Digestion']
    },
    {
      id: 'kit-articulaire',
      name: t.kit_articulaire.name,
      subtitle: t.kit_articulaire.subtitle,
      price: 9.90,
      image: feuArticulaireImg,
      rating: 4.8,
      reviews: 28,
      description: t.kit_articulaire.description,
      tags: ['Mobilité']
    },
    {
      id: 'kit-hiver',
      name: t.kit_hiver.name,
      subtitle: t.kit_hiver.subtitle,
      price: 9.90,
      image: bouclierHiverImg,
      rating: 4.8,
      reviews: 32,
      description: t.kit_hiver.description,
      tags: ['Immunité', 'Hiver']
    },
    {
      id: 'duo-argiles',
      name: t.kit_reset.name,
      subtitle: t.kit_reset.subtitle,
      price: 34.00,
      originalPrice: 49.00,
      image: duoArgilesImg,
      rating: 4.9,
      reviews: 31,
      description: t.kit_reset.description,
      tags: ['Duo Argiles', 'Purification Systémique', 'Reset Homéostatique']
    },
    {
      id: 'abonnements-numeriques',
      name: lang === 'fr' 
        ? "Abonnements Numériques Bloom" 
        : lang === 'de' 
        ? "Digitale Abonnements Bloom" 
        : "Bloom Digital Subscriptions",
      subtitle: lang === 'fr' 
        ? "Académie & Protocoles Systémiques" 
        : lang === 'de' 
        ? "Akademie & Systemische Protokolle" 
        : "Academy & Systemic Protocols",
      price: 9.00,
      originalPrice: 12.00,
      image: modernShelvesImg,
      rating: 4.9,
      reviews: 128,
      description: lang === 'fr'
        ? "Accès illimité à l'ensemble des modules de la Bloom Academy, fiches détaillées, architectures cellulaires et protocoles systémiques complets."
        : lang === 'de'
        ? "Unbegrenzter Zugang zu allen Modulen der Bloom Academy, detaillierten Leitfäden, zellulären Architekturen und systemischen Protokollen."
        : "Unlimited access to all Bloom Academy modules, detailed guides, cellular architectures, and complete systemic protocols.",
      tags: ['Abonnement', 'Digital', 'Académie'],
      isSpecial: false,
      isDigital: true
    },
    {
      id: 'freemium-access',
      name: t.freemium_access.name,
      subtitle: t.freemium_access.subtitle,
      price: 0.00,
      image: herbsCloseUpImg,
      rating: 4.7,
      reviews: 156,
      description: t.freemium_access.description,
      tags: ['Gratuit', 'Digital', 'Découverte'],
      isSpecial: true,
      isDigital: true
    },
    {
      id: 'premium-access',
      name: t.premium_access.name,
      subtitle: t.premium_access.subtitle,
      price: 9.00,
      image: modernShelvesImg,
      rating: 4.9,
      reviews: 128,
      description: t.premium_access.description,
      tags: ['Abonnement', 'Digital', 'Annuel'],
      isSpecial: true,
      isDigital: true
    }
  ];
};

interface StoreContentProps {
  currentView?: string;
  onNavigate?: (view: any, productId?: string, type?: any) => void;
  onNavigatePending?: () => void;
  onNavigateDetail?: (id: string) => void;
  onAddToCart: (product: any) => void;
  lang: Language;
}

export default function StoreContent({ currentView, onNavigate, onNavigatePending, onNavigateDetail, onAddToCart, lang }: StoreContentProps) {
  const handleNavigateDetail = (id: string) => {
    if (id === 'abonnements-numeriques' || id === 'abonnement') {
      if (onNavigate) onNavigate('abonnement');
      return;
    }
    if (onNavigateDetail) onNavigateDetail(id);
    else if (onNavigate) onNavigate('product-detail', id);
  };
  const handleNavigatePending = () => {
    if (onNavigatePending) onNavigatePending();
    else if (onNavigate) onNavigate('pending');
  };

  const [searchQuery, setSearchQuery] = React.useState('');
  const t = translations[lang].store;
  const isFR = lang === 'fr';
  const isDE = lang === 'de';
  const products = React.useMemo(() => getProducts(lang), [lang]);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);
  
  const formatPrice = (price: number) => {
    return (
      <span className="whitespace-nowrap">
        {new Intl.NumberFormat(lang === 'fr' ? 'fr-FR' : lang === 'de' ? 'de-DE' : 'en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(price)} €
      </span>
    );
  };

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Schema.org Logic
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": isFR ? "Accueil" : isDE ? "Startseite" : "Home",
        "item": "https://bloombybotanik.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": isFR ? "Boutique" : "Shop",
        "item": "https://bloombybotanik.com/boutique/"
      }
    ]
  };

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": t.header.title,
    "description": t.header.subtitle,
    "url": "https://bloombybotanik.com/boutique/",
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": filteredProducts.length,
      "itemListElement": filteredProducts.map((p, i) => ({
        "@type": "ListItem",
        "position": i + 1,
        "url": `https://bloombybotanik.com/boutique/${p.id}/`,
        "name": p.name
      }))
    }
  };

  const productsSchema = {
    "@context": "https://schema.org",
    "@graph": filteredProducts.map((p) => ({
      "@type": "Product",
      "@id": `https://bloombybotanik.com/boutique/${p.id}/#product`,
      "name": p.name,
      "description": p.description,
      "image": `https://bloombybotanik.com${p.image}`,
      "sku": p.id,
      "mpn": `BLOOM-${p.id.toUpperCase()}`,
      "brand": {
        "@type": "Brand",
        "name": "Bloom by BotaniK"
      },
      "offers": {
        "@type": "Offer",
        "url": `https://bloombybotanik.com/boutique/${p.id}/`,
        "priceCurrency": "EUR",
        "price": p.price.toFixed(2),
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
            "value": p.id === 'bloomlab' ? "7.90" : "5.90",
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
    }))
  };

  return (
    <div data-product-page="true" className="product-detail pb-20">
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(collectionSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(productsSchema)}
      </script>

      {/* Promotional Banner */}
      <div className="bg-[#D97706]/10 text-[#B45309] border-y border-[#D97706]/30 text-center py-2.5 px-4 text-[10px] md:text-xs font-black uppercase tracking-[0.2em]">
        {isFR 
          ? "🇫🇷 Ingénierie Botanique Française • Expédition 24/48h • Garantie 1 an • Paiement en 3x sans frais" 
          : isDE
          ? "🇫🇷 Französische Botanik-Ingenieurskunst • Versand 24/48h • 1 Jahr Garantie • 3x zinsfrei"
          : "🇫🇷 French Botanical Engineering • 24/48h Shipping • 1-Year Warranty • 3x Fee-Free"}
      </div>
      
      {/* Search & Filter Header (App Style) */}
      <div className="bg-white pt-6 md:pt-8 pb-4 border-b border-botanik-green/5">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-botanik-green/40 mb-4">
          <button onClick={() => window.location.href='/'} className="hover:text-botanik-orange transition-colors">
            {isFR ? "Accueil" : isDE ? "Startseite" : "Home"}
          </button>
          <span>/</span>
          <span className="text-botanik-green/60">{isFR ? "Boutique" : "Shop"}</span>
        </div>

        <h1 className="text-2xl md:text-4xl font-bold text-botanik-green mb-2">
          {(currentView === 'boutique-kits' || currentView === 'kits-botaniques')
            ? (isFR
                ? 'Plantes Médicinales Bio & Soins Botaniques Maison'
                : isDE
                ? 'Bio-Heilpflanzen & Botanische Hauspflege'
                : 'Organic Medicinal Plants & Home Botanical Care')
            : t.header.title}
        </h1>
        <div className="max-w-2xl mb-6">
          <p className="text-sm md:text-base text-botanik-green/60 font-light leading-relaxed">
            {isFR 
              ? "Découvrez l'univers Bloom by BotaniK : de l'extracteur botanique BloomLab aux mélanges de plantes médicinales bio rigoureusement sélectionnés. Notre boutique vous offre toutes les clés pour réaliser vos propres préparations botaniques, huiles infusées et rituels de soin avec une précision laboratoire."
              : isDE
              ? "Entdecken Sie die Welt von Bloom by BotaniK: vom botanischen Extraktor BloomLab bis hin zu sorgfältig ausgewählten Bio-Heilpflanzenmischungen. Unser Shop bietet alles, um eigene pflanzliche Zubereitungen, infundierte Öle und Pflegerituale mit Laborpräzision herzustellen."
              : "Discover the Bloom by BotaniK universe: from the BloomLab botanical extractor to rigorously selected organic medicinal plant blends. Our shop provides everything you need to craft your own botanical preparations, infused oils, and care rituals with laboratory precision."}
          </p>
        </div>
        
        <div className="relative mb-4 md:mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 md:w-5 h-4 md:h-5 text-botanik-green/30" />
          <input 
            type="text" 
            placeholder={t.header.search_placeholder} 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 md:pl-12 pr-4 py-2 md:py-3 bg-[#F9F9F7] rounded-xl md:rounded-2xl border-none text-sm md:text-base text-botanik-green focus:ring-2 focus:ring-botanik-orange/20"
          />
        </div>
        </div>
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 md:pt-8">
      {/* Featured Header: Split Hero Layout synchronized with Home */}
      {!searchQuery && currentView !== 'boutique-kits' && currentView !== 'kits-botaniques' && (
        <div className="mb-12 sm:mb-16">
          <div className="relative group">
            <div className="absolute -inset-4 bg-botanik-green/5 rounded-3xl sm:rounded-[56px] blur-3xl group-hover:bg-botanik-orange/5 transition-colors duration-1000" />
            <div className="relative bg-white border border-botanik-green/5 rounded-3xl sm:rounded-[48px] overflow-hidden shadow-2xl">
              <div className="flex flex-col lg:flex-row items-stretch">
                {/* Left Side: Content */}
                <div className="lg:w-1/2 p-5 sm:p-8 md:p-16 flex flex-col justify-center order-2 lg:order-1">
                  <div className="flex items-center gap-2 text-botanik-orange font-black uppercase tracking-[0.3em] text-[10px] mb-6 sm:mb-8">
                    <div className="w-1.5 h-1.5 rounded-full bg-botanik-orange animate-pulse" />
                    {t.hero.badge}
                  </div>
                  <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-botanik-green mb-4 sm:mb-8 leading-[1.1] tracking-tight">
                    {t.hero.title.split(' ')[0]} <span className="text-botanik-orange md:whitespace-nowrap">{t.hero.title.split(' ').slice(1).join(' ')}</span>
                  </h2>
                  <p className="text-sm sm:text-base md:text-xl text-botanik-green/60 mb-6 sm:mb-10 md:mb-12 leading-relaxed max-w-md font-medium">
                    {t.hero.description}
                  </p>
                  <div className="flex flex-wrap gap-4 mt-2 sm:mt-4">
                    <a 
                      href="/bloomlab/"
                      onClick={(e) => {
                        if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                          e.preventDefault();
                          if (onNavigate) {
                            onNavigate('machine');
                          } else {
                            handleNavigateDetail('bloomlab');
                          }
                        }
                      }}
                      className="w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 bg-[#3E4A3D] hover:bg-[#2D372C] active:bg-[#2D372C] text-white rounded-2xl font-bold flex items-center justify-center gap-3 transition-all shadow-xl shadow-black/10 cursor-pointer min-h-[48px]"
                    >
                      {t.hero.cta} <ArrowRight className="w-5 h-5 text-white" />
                    </a>
                  </div>
                </div>
                
                {/* Right Side: Image */}
                <div className="lg:w-1/2 relative order-1 lg:order-2 h-56 sm:h-72 lg:h-auto min-h-[220px] sm:min-h-[340px]">
                  <img 
                    src={bloomLabImg} 
                    className="absolute inset-0 w-full h-full object-cover" 
                    alt="BloomLab - Votre Laboratoire Botanique Maison - Infusion Végétale, Tisanes et Soins Naturels" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-transparent hidden lg:block" />
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent lg:hidden" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bundles Section */}
      {!searchQuery && (
        <div className="mb-12 sm:mb-16">
          <div className="flex items-center justify-between mb-6 sm:mb-8 flex-wrap gap-2">
            <h3 className="text-xl md:text-2xl font-bold text-botanik-green">
              {lang === 'fr' ? 'Nos Offres Groupées (Bundles)' : lang === 'en' ? 'Our Bundle Offers' : 'Unsere Bundle-Angebote'}
            </h3>
            <span className="px-3 py-1 bg-botanik-orange/10 text-botanik-orange text-[10px] font-bold uppercase tracking-widest rounded-full">
              {lang === 'fr' ? 'Économie Garantie' : lang === 'en' ? 'Guaranteed Savings' : 'Garantierte Ersparnis'}
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {products.filter(p => (p as any).isBundle).map((product) => (
              <a 
                key={product.id} 
                href={`/boutique/${product.id}/`}
                onClick={(e) => {
                  if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                    e.preventDefault();
                    handleNavigateDetail(product.id);
                  }
                }}
                className="bg-white rounded-2xl border border-[#E7DFD3] shadow-sm flex flex-col justify-between overflow-hidden cursor-pointer hover:shadow-xl transition-all group relative"
              >
                <div className="absolute top-4 left-4 z-10 bg-botanik-orange text-[#0F261E] px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
                  Bundle
                </div>
                <div className="relative w-full aspect-square bg-[#F9F6F0] flex items-center justify-center overflow-hidden rounded-t-2xl">
                  <OptimizedImage 
                    src={product.image} 
                    alt={`${product.name} - ${product.subtitle} - Bloom by BotaniK - Extracteur botanique et soins végétaux`} 
                    className="w-full h-full object-contain p-4 transform group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5 flex flex-col flex-1 justify-between">
                  <div>
                    <div className="text-[10px] font-bold text-botanik-orange uppercase tracking-widest mb-2">
                      {product.subtitle}
                    </div>
                    <h4 className="text-base sm:text-lg font-bold text-botanik-green mb-3 leading-tight">
                      {product.name}
                    </h4>
                    <p className="text-xs sm:text-sm text-botanik-green/60 mb-5 font-light line-clamp-2">
                      {product.description}
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-auto pt-2">
                    <div className="flex flex-col">
                      {(product.originalPrice || (product as any).oldPriceStrike) && (
                        <div className="flex items-center gap-2 flex-wrap">
                          {product.originalPrice && (
                            <span className="text-xs text-botanik-green/30 line-through">{formatPrice(product.originalPrice)}</span>
                          )}
                          {(product as any).oldPriceStrike && (
                            <span className="text-xs text-botanik-green/30 line-through">{formatPrice((product as any).oldPriceStrike)}</span>
                          )}
                        </div>
                      )}
                      <span className="text-xl sm:text-2xl font-bold text-botanik-green">{formatPrice(product.price)}</span>
                    </div>
                    <button 
                      type="button"
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); onAddToCart(product); }}
                      className="w-12 h-12 bg-[#D97706] hover:bg-[#B45309] text-white rounded-2xl flex items-center justify-center shadow-lg shadow-orange-900/20 transition-all cursor-pointer shrink-0"
                      aria-label={`${isFR ? 'Ajouter au panier' : isDE ? 'In den Warenkorb' : 'Add to cart'} ${product.name}`}
                    >
                      <ShoppingBag className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Digital Universe Section */}
      {!searchQuery && (
        <div className="mb-12 sm:mb-16">
          <div className="bg-botanik-green/5 rounded-3xl sm:rounded-[48px] p-6 sm:p-8 md:p-12 border border-botanik-green/5">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="max-w-md">
                <h3 className="text-2xl md:text-3xl font-bold text-botanik-green mb-4">
                  {lang === 'fr' ? "L'Écosystème Digital" : lang === 'en' ? 'The Digital Ecosystem' : 'Das digitale Ökosystem'}
                </h3>
                <p className="text-sm sm:text-base text-botanik-green/60 leading-relaxed mb-6">
                  {lang === 'fr' 
                    ? "Accédez à notre bibliothèque de savoirs et à nos protocoles experts pour transformer votre pratique de l'herboristerie."
                    : lang === 'en'
                    ? "Access our knowledge library and expert protocols to transform your herbal practice."
                    : "Greifen Sie auf unsere Wissensbibliothek und Expertenprotokolle zu, um Ihre Kräuterpraxis zu transformieren."}
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-botanik-orange uppercase tracking-widest">
                    <Check className="w-4 h-4" /> {isFR ? "10 recettes gratuites" : isDE ? "10 kostenlose Rezepte" : "10 free recipes"}
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-bold text-botanik-orange uppercase tracking-widest">
                    <Check className="w-4 h-4" /> {isFR ? "Protocoles experts" : isDE ? "Expertenprotokolle" : "Expert protocols"}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full md:w-auto">
                {products.filter(p => (p as any).isSpecial).map((product) => (
                  <a 
                    key={product.id}
                    href={`/boutique/${product.id}/`}
                    className="bg-white rounded-3xl sm:rounded-[40px] shadow-sm hover:shadow-xl transition-all cursor-pointer group border border-botanik-green/5 overflow-hidden flex flex-col"
                    onClick={(e) => {
                      if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                        e.preventDefault();
                        handleNavigateDetail(product.id);
                      }
                    }}
                  >
                    <div className="relative aspect-video sm:aspect-square md:aspect-video overflow-hidden bg-[#F9F9F7]">
                      <OptimizedImage 
                        src={product.image} 
                        alt={`${product.name} - ${product.subtitle} - Bloom by BotaniK - Extracteur botanique et soins végétaux`} 
                        className="w-full h-full object-cover transform scale-110 group-hover:scale-125 transition-transform duration-700"
                      />
                    </div>
                    <div className="p-5 sm:p-6 flex flex-col flex-1">
                      <div className="flex items-center gap-1 mb-2">
                        <div className="flex items-center text-botanik-orange">
                          <Star className="w-3 h-3 fill-current" />
                          <span className="text-[10px] font-bold ml-1">{product.rating}/5</span>
                        </div>
                        <span className="text-[10px] text-botanik-green/30">({product.reviews} {isFR ? 'avis' : isDE ? 'Bewertungen' : 'reviews'})</span>
                      </div>
                      <div className="text-[10px] font-bold text-botanik-orange uppercase tracking-widest mb-1">{product.subtitle}</div>
                      <h4 className="text-base sm:text-lg font-bold text-botanik-green mb-4 leading-tight">{product.name}</h4>
                      <div className="flex items-center justify-between gap-4 mt-auto">
                        <span className="text-lg sm:text-xl font-bold text-botanik-green">
                          {product.price === 0 ? (lang === 'fr' ? 'Gratuit' : lang === 'en' ? 'Free' : 'Gratis') : formatPrice(product.price)}
                        </span>
                        <div 
                          className="w-10 h-10 bg-[#3E4A3D] text-white rounded-xl flex items-center justify-center group-hover:bg-botanik-orange transition-colors"
                          aria-label={`${isFR ? 'Découvrir' : isDE ? 'Entdecken' : 'Discover'} ${product.name}`}
                        >
                          <ArrowRight className="w-5 h-5" />
                        </div>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Synergies Multi-Plantes & Séquençage A/B Educational Section */}
      {!searchQuery && currentView !== 'boutique-kits' && currentView !== 'kits-botaniques' && (
        <div>
          <StoreSequencingSection onNavigate={onNavigate} lang={lang} />
        </div>
      )}

      {/* Product Grid */}
      <div id="nos-kits" className="mb-12 scroll-mt-24">
        {(currentView === 'boutique-kits' || currentView === 'kits-botaniques') && (
          <div className="mb-8 p-6 sm:p-8 bg-[#3E4A3D] rounded-3xl text-white border border-[#C8AB8A]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-xl">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C8AB8A]/20 text-[#C8AB8A] text-xs font-bold uppercase tracking-wider mb-3">
                <Package className="w-4 h-4" />
                {isFR ? 'Herboristerie & Totum' : isDE ? 'Bio-Kräuter & Totum' : 'Herbalism & Botanical Totum'}
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white mb-2">
                {isFR
                  ? 'Plantes Médicinales Bio & Synergies Botaniques'
                  : isDE
                  ? 'Bio-Heilpflanzen & Botanische Synergien'
                  : 'Organic Medicinal Plants & Botanical Synergies'}
              </h2>
              <p className="text-sm text-white/70 max-w-2xl leading-relaxed">
                {isFR 
                  ? 'Mélanges certifiés de plantes médicinales bio entières, coupées et calibrées pour l’extraction séquentielle A/B. Qualité herboristerie, principes actifs préservés.' 
                  : isDE
                  ? 'Zertifizierte Mischungen aus ganzen Bio-Heilpflanzen, speziell kalibriert für die sequentielle A/B-Extraktion. Kräuterfachqualität mit erhaltenem Wirkstoffspektrum.'
                  : 'Certified organic medicinal plant blends cut and calibrated for A/B sequential extraction. Herbalist grade with active compounds preserved.'}
              </p>
            </div>
          </div>
        )}

        {/* Produits d'appel — Démarrer dès 9,90 € */}
        {!searchQuery && (
          <div className="mb-10 bg-[#FAF8F5] border border-[#E7DFD3] rounded-3xl p-5 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <div>
                <div className="text-[10px] font-black uppercase tracking-widest text-botanik-orange">
                  {isFR ? "Produits d'appel" : isDE ? "Einstiegsprodukte" : "Starter Essentials"}
                </div>
                <h3 className="text-base sm:text-lg font-bold text-botanik-green">
                  {isFR ? "Commencez l'expérience Bloom dès 9,90 €" : isDE ? "Starten Sie mit Bloom ab 9,90 €" : "Start your Bloom experience from 9.90 €"}
                </h3>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <button
                type="button"
                onClick={() => handleNavigateDetail('kit-starter')}
                className="p-4 rounded-2xl bg-white border border-[#E7DFD3] hover:border-botanik-orange text-left transition-all cursor-pointer space-y-1 shadow-2xs"
              >
                <div className="text-xs font-black text-botanik-orange">9,90 € / 12,90 €</div>
                <div className="font-bold text-sm text-botanik-green">{isFR ? "Kits Plantes Bio" : isDE ? "Bio-Pflanzen-Kits" : "Organic Plant Kits"}</div>
                <div className="text-[11px] text-botanik-green/60">{isFR ? "Sève, Nuit, Digestion, Articulaire, Hiver" : isDE ? "Saft, Nacht, Verdauung, Gelenke, Winter" : "Sap, Night, Digestion, Joint, Winter"}</div>
              </button>
              <button
                type="button"
                onClick={() => handleNavigateDetail('duo-argiles')}
                className="p-4 rounded-2xl bg-white border border-[#E7DFD3] hover:border-botanik-orange text-left transition-all cursor-pointer space-y-1 shadow-2xs"
              >
                <div className="text-xs font-black text-botanik-orange">34,00 €</div>
                <div className="font-bold text-sm text-botanik-green">Duo Argiles KlinoMont®</div>
                <div className="text-[11px] text-botanik-green/60">{isFR ? "Zéolithe-Bentonite micronisée 6µm" : isDE ? "Mikronisiertes Zeolith-Bentonit 6µm" : "Micronized Zeolite-Bentonite 6µm"}</div>
              </button>
              <button
                type="button"
                onClick={() => handleNavigateDetail('bundle-apothicaire')}
                className="p-4 rounded-2xl bg-white border border-[#E7DFD3] hover:border-botanik-orange text-left transition-all cursor-pointer space-y-1 shadow-2xs"
              >
                <div className="text-xs font-black text-botanik-orange">49,00 €</div>
                <div className="font-bold text-sm text-botanik-green">{isFR ? "Pack Herbier Complet" : isDE ? "Vollständiges Herbarium" : "Complete Herbarium Pack"}</div>
                <div className="text-[11px] text-botanik-green/60">{isFR ? "4 mélanges + Duo Argiles KlinoMont®" : isDE ? "4 Mischungen + KlinoMont® Duo" : "4 blends + KlinoMont® Clay Duo"}</div>
              </button>
              <button
                type="button"
                onClick={() => handleNavigateDetail('abonnements-numeriques')}
                className="p-4 rounded-2xl bg-white border border-[#E7DFD3] hover:border-botanik-orange text-left transition-all cursor-pointer space-y-1 shadow-2xs"
              >
                <div className="text-xs font-black text-botanik-orange">9,00 €/mois</div>
                <div className="font-bold text-sm text-botanik-green">{isFR ? "Abonnement Numérique Académie" : isDE ? "Akademie Digital-Abo" : "Academy Digital Membership"}</div>
                <div className="text-[11px] text-botanik-green/60">{isFR ? "+100 recettes & protocoles guidés" : isDE ? "+100 Rezepte & Protokolle" : "+100 recipes & guided protocols"}</div>
              </button>
            </div>
          </div>
        )}

        <h3 className="text-xs md:text-sm font-bold uppercase tracking-widest text-botanik-green/40 mb-4 md:mb-6">
          {searchQuery
            ? `${t.grid.results_for} "${searchQuery}"`
            : (currentView === 'boutique-kits' || currentView === 'kits-botaniques')
            ? (isFR ? 'Toutes nos plantes médicinales bio' : isDE ? 'Alle Bio-Heilpflanzen-Kits' : 'All organic medicinal plant kits')
            : t.grid.title}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
          {filteredProducts.filter(p => (!p.featured && !(p as any).isBundle && !(p as any).isSpecial) || searchQuery).map((product) => {
            return (
              <a 
                key={product.id} 
                href={`/boutique/${product.id}/`}
                onClick={(e) => {
                  if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                    e.preventDefault();
                    handleNavigateDetail(product.id);
                  }
                }}
                className="bg-white rounded-2xl border border-[#E7DFD3] shadow-sm flex flex-col justify-between overflow-hidden cursor-pointer hover:shadow-xl transition-all group"
              >
                <div className="relative w-full aspect-square bg-[#F9F6F0] flex items-center justify-center overflow-hidden rounded-t-2xl">
                  <OptimizedImage 
                    src={product.image} 
                    alt={`${product.name} - ${product.subtitle} - Bloom by BotaniK - Extracteur botanique et soins végétaux`} 
                    className="w-full h-full object-contain p-4 transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <button 
                    type="button"
                    onClick={(e) => { 
                      e.preventDefault(); 
                      e.stopPropagation(); 
                      if (product.id === 'abonnements-numeriques') {
                        if (onNavigate) onNavigate('abonnement');
                      } else {
                        onAddToCart(product); 
                      }
                    }}
                    className="absolute bottom-3 right-3 w-10 h-10 sm:w-11 sm:h-11 bg-[#D97706] hover:bg-[#B45309] text-white rounded-xl flex items-center justify-center shadow-lg shadow-orange-900/20 transition-all cursor-pointer"
                    aria-label={product.id === 'abonnements-numeriques' ? (isFR ? 'Découvrir les abonnements' : isDE ? 'Abonnements entdecken' : 'Discover subscriptions') : `${isFR ? 'Ajouter au panier' : isDE ? 'In den Warenkorb' : 'Add to cart'} ${product.name}`}
                  >
                    {product.id === 'abonnements-numeriques' ? (
                      <Star className="w-4 h-4 sm:w-5 sm:h-5 text-white fill-white" />
                    ) : (
                      <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
                    )}
                  </button>
                </div>
                <div className="p-5 flex flex-col flex-1 justify-between">
                  <div>
                    <div className="text-[10px] font-bold text-botanik-orange uppercase tracking-widest mb-1.5">
                      {product.subtitle}
                    </div>
                    <h4 className="text-sm sm:text-base font-bold text-botanik-green mb-3 leading-snug line-clamp-2">
                      {product.name}
                    </h4>
                  </div>
                  <div className="flex items-center justify-between mt-auto pt-2">
                    <span className="text-base sm:text-lg font-bold text-botanik-green">{formatPrice(product.price)}</span>
                    <ArrowRight className="w-4 h-4 md:w-5 md:h-5 text-botanik-green/30 group-hover:text-botanik-green transition-colors" />
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>

      {/* Trust Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 mb-12">
        <div className="bg-white border border-botanik-green/5 p-4 md:p-5 rounded-2xl flex items-center gap-3 md:gap-4 shadow-sm">
          <div className="w-8 h-8 md:w-10 md:h-10 bg-botanik-green/5 rounded-full flex items-center justify-center shrink-0">
            <ShieldCheck className="w-4 h-4 md:w-5 md:h-5 text-botanik-green" />
          </div>
          <span className="text-[10px] md:text-xs font-bold text-botanik-green uppercase tracking-wider leading-tight">{t.trust.payment}</span>
        </div>
        <div className="bg-white border border-botanik-green/5 p-4 md:p-5 rounded-2xl flex items-center gap-3 md:gap-4 shadow-sm">
          <div className="w-8 h-8 md:w-10 md:h-10 bg-botanik-green/5 rounded-full flex items-center justify-center shrink-0">
            <FlaskConical className="w-4 h-4 md:w-5 md:h-5 text-botanik-green" />
          </div>
          <span className="text-[10px] md:text-xs font-bold text-botanik-green uppercase tracking-wider leading-tight">{t.trust.lab}</span>
        </div>
        <div className="bg-white border border-botanik-green/5 p-4 md:p-5 rounded-2xl flex items-center gap-3 md:gap-4 shadow-sm">
          <div className="w-8 h-8 md:w-10 md:h-10 bg-botanik-green/5 rounded-full flex items-center justify-center shrink-0">
            <Check className="w-4 h-4 md:w-5 md:h-5 text-botanik-green" />
          </div>
          <span className="text-[10px] md:text-xs font-bold text-botanik-green uppercase tracking-wider leading-tight">{t.trust.guarantee}</span>
        </div>
      </div>

      {/* Boutique Internal Linking Strip */}
      <div className="bg-[#F9F6F0] border border-[#E7DFD3] rounded-2xl p-6 mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-bold text-botanik-green">
            {isFR ? "Guides & Ressources Bloom by BotaniK" : isDE ? "Leitfäden & Ressourcen Bloom by BotaniK" : "Bloom by BotaniK Guides & Resources"}
          </h3>
          <p className="text-xs text-botanik-green/70 mt-1">
            {isFR
              ? "Maîtrisez la BloomLab® et le choix de vos solvants avant de composer vos kits de plantes."
              : isDE
              ? "Meistern Sie die BloomLab® und die Wahl der Lösungsmittel, bevor Sie Ihre Pflanzenkits zusammenstellen."
              : "Explore BloomLab®, our solvents guide, and extraction protocols before choosing your plant kits."}
          </p>
        </div>
        <div className="flex flex-wrap gap-2.5 text-xs font-bold">
          <a
            href="/bloomlab/"
            onClick={(e) => { if (onNavigate && !e.ctrlKey && !e.metaKey && !e.shiftKey) { e.preventDefault(); onNavigate('machine'); } }}
            className="px-3.5 py-2 rounded-xl bg-white border border-[#E7DFD3] text-botanik-green hover:border-botanik-orange transition-colors"
          >
            BloomLab®
          </a>
          <a
            href="/guide-solvants/"
            onClick={(e) => { if (onNavigate && !e.ctrlKey && !e.metaKey && !e.shiftKey) { e.preventDefault(); onNavigate('guide-solvants'); } }}
            className="px-3.5 py-2 rounded-xl bg-white border border-[#E7DFD3] text-botanik-green hover:border-botanik-orange transition-colors"
          >
            {isFR ? "Guide des Solvants" : isDE ? "Lösungsmittel-Leitfaden" : "Solvents Guide"}
          </a>
          <a
            href="/extraction-botanique/"
            onClick={(e) => { if (onNavigate && !e.ctrlKey && !e.metaKey && !e.shiftKey) { e.preventDefault(); onNavigate('pillar-extraction'); } }}
            className="px-3.5 py-2 rounded-xl bg-white border border-[#E7DFD3] text-botanik-green hover:border-botanik-orange transition-colors"
          >
            {isFR ? "Extraction A/B" : isDE ? "A/B-Extraktion" : "A/B Extraction"}
          </a>
          <a
            href="/"
            onClick={(e) => { if (onNavigate && !e.ctrlKey && !e.metaKey && !e.shiftKey) { e.preventDefault(); onNavigate('indexbis'); } }}
            className="px-3.5 py-2 rounded-xl bg-white border border-[#E7DFD3] text-botanik-green hover:border-botanik-orange transition-colors"
          >
            {isFR ? "Accueil Bloom" : isDE ? "Bloom Startseite" : "Home"}
          </a>
        </div>
      </div>

      {/* Questions Fréquentes Boutique */}
      <section aria-label="FAQ Boutique Bloom by BotaniK" className="bg-white border border-[#E7DFD3] rounded-2xl p-6 md:p-8 shadow-sm space-y-4">
        <h2 className="text-xl md:text-2xl font-bold text-botanik-green">
          {isFR ? "Questions fréquentes — Boutique & Kits Bloom by BotaniK" : isDE ? "Häufige Fragen — Bloom by BotaniK Shop & Kits" : "Frequently Asked Questions — Bloom by BotaniK Shop"}
        </h2>
        <div className="space-y-3 text-sm text-botanik-green/85">
          <details className="rounded-xl border border-[#E7DFD3] p-4 bg-[#FAF8F5]" open>
            <summary className="font-bold text-botanik-green cursor-pointer">
              {isFR ? "Que contient l'offre BloomLab® Solo à 229 € ?" : isDE ? "Was enthält das Angebot BloomLab® Solo für 229 €?" : "What is included in the BloomLab® Solo offer at 229 €?"}
            </summary>
            <p className="mt-2 text-xs sm:text-sm leading-relaxed">
              {isFR
                ? "La BloomLab® Solo inclut la machine BloomLab® Inox 304, le panier filtrant micrométrique, le guide digital de 100 recettes, la garantie 1 an, le programme auto-nettoyant 5 minutes ainsi que 5 accessoires offerts."
                : isDE
                ? "Die BloomLab® Solo umfasst die BloomLab® 304-Edelstahl-Maschine, den mikrometrischen Filterkorb, den digitalen 100-Rezepte-Leitfaden, 1 Jahr Garantie, die 5-Minuten-Selbstreinigung sowie 5 Gratis-Zubehörteile."
                : "BloomLab® Solo includes the BloomLab® 304 stainless steel machine, micrometric filter basket, 100-recipe digital guide, 1-year warranty, 5-minute self-clean program, and 5 complimentary accessories."}
            </p>
          </details>
          <details className="rounded-xl border border-[#E7DFD3] p-4 bg-[#FAF8F5]">
            <summary className="font-bold text-botanik-green cursor-pointer">
              {isFR ? "Quelle différence entre BloomLab® Solo et le Pack Signature ?" : isDE ? "Worin liegt der Unterschied zwischen BloomLab® Solo und dem Pack Signature?" : "What is the difference between BloomLab® Solo and Pack Signature?"}
            </summary>
            <p className="mt-2 text-xs sm:text-sm leading-relaxed">
              {isFR
                ? "Le Pack Signature (289 € au lieu de 349 €) associe la machine BloomLab® Inox 304 au Kit accessoires apothicaire, à L'Herbier Complet (4 mélanges de plantes), au Duo Argiles KlinoMont® (Zéolithe-Bentonite) et à 3 mois d'accès Premium à l'Académie."
                : isDE
                ? "Das Pack Signature (289 € statt 349 €) kombiniert die BloomLab® 304-Edelstahl-Maschine mit dem Apotheker-Zubehörset, dem Vollständigen Herbarium (4 Mischungen), dem KlinoMont® Tonerde-Duo (Zeolith-Bentonit) und 3 Monaten Premium-Zugang zur Akademie."
                : "Pack Signature (289 € instead of 349 €) pairs the BloomLab® 304 stainless steel machine with the apothecary kit, Complete Herbarium (4 plant blends), KlinoMont® Clay Duo (Zeolite-Bentonite), and 3 months Premium Academy access."}
            </p>
          </details>
          <details className="rounded-xl border border-[#E7DFD3] p-4 bg-[#FAF8F5]">
            <summary className="font-bold text-botanik-green cursor-pointer">
              {isFR ? "Les kits de plantes sont-ils utilisables sans matériel supplémentaire ?" : isDE ? "Sind die Pflanzenkits ohne weiteres Zubehör verwendbar?" : "Are the plant kits ready to use with BloomLab®?"}
            </summary>
            <p className="mt-2 text-xs sm:text-sm leading-relaxed">
              {isFR
                ? "Oui, nos kits de plantes sèches tracées sont calibrés en granulométrie pour l'extracteur BloomLab® et s'adaptent aux extractions aqueuses, huileuses ou glycérinées selon les fiches protocoles."
                : isDE
                ? "Ja, unsere rückverfolgbaren Trockenpflanzen-Kits sind in ihrer Körnung exakt auf die BloomLab® abgestimmt und eignen sich je nach Protokoll für wässrige, ölige oder glyzerinbasierte Extraktionen."
                : "Yes, every traceable dried botanical blend is calibrated in particle size for BloomLab® and adapts to aqueous, oil, or glycerin extractions according to protocol sheets."}
            </p>
          </details>
          <details className="rounded-xl border border-[#E7DFD3] p-4 bg-[#FAF8F5]">
            <summary className="font-bold text-botanik-green cursor-pointer">
              {isFR ? "Quels sont les délais d'expédition et garanties Bloom by BotaniK ?" : isDE ? "Wie sind Lieferzeiten und Garantien bei Bloom by BotaniK?" : "What are the shipping times and warranties?"}
            </summary>
            <p className="mt-2 text-xs sm:text-sm leading-relaxed">
              {isFR
                ? "Expédition depuis la France sous 24 à 48 heures ouvrées avec suivi Colissimo ou Point Relais, et droit de rétractation légal de 14 jours."
                : isDE
                ? "Versand aus Frankreich innerhalb von 24 bis 48 Werktagsstunden mit Sendungsverfolgung sowie gesetzliches 14-tägiges Widerrufsrecht."
                : "Dispatched from France within 24–48 business hours with tracked delivery and a 14-day statutory return window."}
            </p>
          </details>
        </div>
      </section>
      </div>
    </div>
  );
}