import React from 'react';
import { ShoppingBag, Star, Check, ArrowRight, ShieldCheck, Leaf, FlaskConical, Search } from 'lucide-react';
import bloomLabImg from './assets/images/bloomlab_main_1784887530345.jpeg';
import img05 from './assets/images/lifestyle_botanik_cleaned_1786616810137.jpg';
import labHeroImg from './assets/images/lab_detail_cleaned_1786616788618.jpg';
import remediesImg from './assets/images/natural_remedies_cleaned_1786616831671.jpg';
import duoArgilesImg from './assets/images/product_duo_argiles.jpg';
import trioPouchesImg from './assets/images/product_trio_pouches.jpg';
import feuArticulaireImg from './assets/images/product_feu_articulaire.jpg';
import bouclierHiverImg from './assets/images/product_bouclier_hiver.jpg';
import nuitProfondeImg from './assets/images/product_nuit_profonde.jpg';
import seveFondamentaleImg from './assets/images/product_seve_fondamentale.jpg';
import digestionImg from './assets/images/product_digestion.jpeg';
import { translations, Language } from './translations';

export const getProducts = (lang: Language) => {
  const t = translations[lang].store.products;
  
  // Logic for Promotion (September 2026 -> January 1, 2027)
  // Current date in metadata is 2026-08-13.
  const now = new Date();
  const isPromoActive = now >= new Date('2026-09-01') && now < new Date('2027-01-01');
  const bloomLabPrice = isPromoActive ? 239.00 : 289.00;
  const bloomLabOriginal = isPromoActive ? 289.00 : 329.00;

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
      price: 59.00,
      originalPrice: 87.50,
      image: trioPouchesImg,
      rating: 5.0,
      reviews: 64,
      description: t.bundle_apothicaire.description,
      tags: ['Offre Limitée', 'Rentrée 2026', 'Best-Value'],
      isBundle: true
    },
    {
      id: 'pack-signature',
      name: t.pack_signature.name,
      subtitle: t.pack_signature.subtitle,
      price: 319.00,
      originalPrice: 349.00,
      image: bloomLabImg,
      rating: 5.0,
      reviews: 42,
      description: t.pack_signature.description,
      tags: ['Pack', 'Débutant', 'Prêt à l\'emploi'],
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
      id: 'kit-reset',
      name: t.kit_reset.name,
      subtitle: t.kit_reset.subtitle,
      price: 44.90,
      originalPrice: 49.00,
      image: duoArgilesImg,
      rating: 4.9,
      reviews: 31,
      description: t.kit_reset.description,
      tags: ['Kit', 'Détox']
    },
    {
      id: 'freemium-access',
      name: t.freemium_access.name,
      subtitle: t.freemium_access.subtitle,
      price: 0.00,
      image: remediesImg,
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
      image: img05,
      rating: 4.9,
      reviews: 89,
      description: t.premium_access.description,
      tags: ['Abonnement', 'Digital', 'Complet'],
      isSpecial: true,
      isDigital: true
    }
  ];
};

interface StoreContentProps {
  onNavigatePending: () => void;
  onNavigateDetail: (id: string) => void;
  onAddToCart: (product: any) => void;
  lang: Language;
}

export default function StoreContent({ onNavigatePending, onNavigateDetail, onAddToCart, lang }: StoreContentProps) {
  const [searchQuery, setSearchQuery] = React.useState('');
  const t = translations[lang].store;
  const isFR = lang === 'fr';
  const products = React.useMemo(() => getProducts(lang), [lang]);
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat(lang === 'fr' ? 'fr-FR' : lang === 'de' ? 'de-DE' : 'en-US', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // SEO JSON-LD for the 2026 Offer
  const seoSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": isFR ? "Soins Botaniques Famille — Pack Rentrée 2026" : "Family Botanical Care — 2026 Back-to-School Pack",
    "description": "Prenez soin de toute la famille avec l'herbier complet Bloom. Extraction botanique de précision pour des remèdes naturels faits maison : sommeil, digestion, vitalité et mobilité.",
    "brand": {
      "@type": "Brand",
      "name": "Bloom by BotaniK"
    },
    "offers": {
      "@type": "Offer",
      "priceCurrency": "EUR",
      "price": "59.00",
      "availability": "https://schema.org/InStock",
      "validFrom": "2026-08-15",
      "url": "https://bloombybotanik.com/shop",
      "category": "Phytothérapie & Soins Naturels"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "156"
    }
  };

  return (
    <div className="animate-in slide-in-from-right duration-500 pb-20">
      {/* SEO Injection */}
      <script type="application/ld+json">
        {JSON.stringify(seoSchema)}
      </script>

      {/* Promotional Banner */}
      <div className="bg-botanik-orange text-white text-center py-2 px-4 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] animate-pulse">
        {isFR 
          ? "Rentrée 2026 : Soins Botaniques pour toute la Famille - Pack Complet à 59€" 
          : "Back to School 2026: Botanical Care for the Whole Family - Complete Pack at 59€"}
      </div>
      
      {/* Search & Filter Header (App Style) */}
      <div className="bg-white px-4 md:px-6 pt-6 md:pt-8 pb-4">
        <h1 className="text-2xl md:text-3xl font-bold text-botanik-green mb-1 md:mb-2">{t.header.title}</h1>
        <p className="text-[10px] md:text-sm text-botanik-green/40 font-medium uppercase tracking-widest mb-4 md:mb-6">{t.header.subtitle}</p>
        
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

      {/* Featured Header: Split Hero Layout synchronized with Home */}
      {!searchQuery && (
        <div className="px-6 mb-16">
          <div className="relative group">
            <div className="absolute -inset-4 bg-botanik-green/5 rounded-[56px] blur-3xl group-hover:bg-botanik-orange/5 transition-colors duration-1000" />
            <div className="relative bg-white border border-botanik-green/5 rounded-[48px] overflow-hidden shadow-2xl">
              <div className="flex flex-col lg:flex-row items-stretch">
                {/* Left Side: Content */}
                <div className="lg:w-1/2 p-6 md:p-16 flex flex-col justify-center order-2 lg:order-1">
                  <div className="flex items-center gap-2 text-botanik-orange font-black uppercase tracking-[0.3em] text-[10px] mb-8">
                    <div className="w-1.5 h-1.5 rounded-full bg-botanik-orange animate-pulse" />
                    {t.hero.badge}
                  </div>
                  <h2 className="text-2xl sm:text-3xl md:text-6xl font-bold text-botanik-green mb-6 md:mb-8 leading-[1.1] tracking-tight">
                    {t.hero.title.split(' ')[0]} <span className="text-botanik-orange md:whitespace-nowrap">{t.hero.title.split(' ').slice(1).join(' ')}</span>
                  </h2>
                  <p className="text-base md:text-xl text-botanik-green/60 mb-8 md:mb-12 leading-relaxed max-w-md font-medium">
                    {t.hero.description}
                  </p>
                  <div className="flex flex-wrap gap-4 mt-4">
                    <button 
                      onClick={() => {
                        const el = document.getElementById('product-bloomlab');
                        el?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="px-10 py-5 bg-botanik-green text-white rounded-2xl font-bold flex items-center gap-3 hover:bg-botanik-orange transition-all shadow-xl shadow-botanik-green/10"
                    >
                      {t.hero.cta} <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                
                {/* Right Side: Image */}
                <div className="lg:w-1/2 relative order-1 lg:order-2 h-64 lg:h-auto min-h-[400px]">
                  <img 
                    src={bloomLabImg} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110" 
                    alt="BloomLab - Votre Laboratoire de Phytothérapie Maison" 
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
        <div className="px-4 md:px-6 mb-16">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl md:text-2xl font-bold text-botanik-green">
              {lang === 'fr' ? 'Nos Offres Groupées (Bundles)' : lang === 'en' ? 'Our Bundle Offers' : 'Unsere Bundle-Angebote'}
            </h3>
            <span className="px-3 py-1 bg-botanik-orange/10 text-botanik-orange text-[10px] font-bold uppercase tracking-widest rounded-full">
              {lang === 'fr' ? 'Économie Garantie' : lang === 'en' ? 'Guaranteed Savings' : 'Garantierte Ersparnis'}
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products.filter(p => (p as any).isBundle).map((product) => (
              <div 
                key={product.id} 
                onClick={() => onNavigateDetail(product.id)}
                className="bg-white rounded-[40px] border-2 border-botanik-orange/20 overflow-hidden flex flex-col cursor-pointer hover:shadow-2xl transition-all group relative"
              >
                <div className="absolute top-4 left-4 z-10 bg-botanik-orange text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg">
                  Bundle
                </div>
                <div className="relative h-64 overflow-hidden bg-[#F9F9F7]">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="text-[10px] font-bold text-botanik-orange uppercase tracking-widest mb-2">
                    {product.subtitle}
                  </div>
                  <h4 className="text-lg font-bold text-botanik-green mb-4 leading-tight">
                    {product.name}
                  </h4>
                  <p className="text-sm text-botanik-green/60 mb-6 font-light line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex flex-col">
                      {product.originalPrice && (
                        <span className="text-xs text-botanik-green/30 line-through">{formatPrice(product.originalPrice)}</span>
                      )}
                      <span className="text-2xl font-bold text-botanik-green">{formatPrice(product.price)}</span>
                    </div>
                    <button 
                      onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}
                      className="w-12 h-12 bg-botanik-green text-white rounded-2xl flex items-center justify-center shadow-lg hover:bg-botanik-orange transition-colors"
                    >
                      <ShoppingBag className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Digital Universe Section */}
      {!searchQuery && (
        <div className="px-4 md:px-6 mb-16">
          <div className="bg-botanik-green/5 rounded-[48px] p-8 md:p-12 border border-botanik-green/5">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="max-w-md">
                <h3 className="text-2xl md:text-3xl font-bold text-botanik-green mb-4">
                  {lang === 'fr' ? "L'Écosystème Digital" : lang === 'en' ? 'The Digital Ecosystem' : 'Das digitale Ökosystem'}
                </h3>
                <p className="text-botanik-green/60 leading-relaxed mb-6">
                  {lang === 'fr' 
                    ? "Accédez à notre bibliothèque de savoirs et à nos protocoles experts pour transformer votre pratique de l'herboristerie."
                    : lang === 'en'
                    ? "Access our knowledge library and expert protocols to transform your herbal practice."
                    : "Greifen Sie auf unsere Wissensbibliothek und Expertenprotokolle zu, um Ihre Kräuterpraxis zu transformieren."}
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-botanik-orange uppercase tracking-widest">
                    <Check className="w-4 h-4" /> 10 recettes gratuites
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-bold text-botanik-orange uppercase tracking-widest">
                    <Check className="w-4 h-4" /> Protocoles experts
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full md:w-auto">
                {products.filter(p => (p as any).isSpecial).map((product) => (
                  <div 
                    key={product.id}
                    className="bg-white p-6 rounded-3xl shadow-sm hover:shadow-xl transition-all cursor-pointer group border border-botanik-green/5"
                    onClick={() => onNavigateDetail(product.id)}
                  >
                    <div className="text-[10px] font-bold text-botanik-orange uppercase tracking-widest mb-2">{product.subtitle}</div>
                    <h4 className="text-lg font-bold text-botanik-green mb-4">{product.name}</h4>
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-xl font-bold text-botanik-green">
                        {product.price === 0 ? (lang === 'fr' ? 'Gratuit' : lang === 'en' ? 'Free' : 'Gratis') : formatPrice(product.price)}
                      </span>
                      <button className="w-10 h-10 bg-[#F9F9F7] text-botanik-green rounded-xl flex items-center justify-center group-hover:bg-botanik-green group-hover:text-white transition-colors">
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Product Grid */}
      <div className="px-4 md:px-6 mb-12">
        <h3 className="text-xs md:text-sm font-bold uppercase tracking-widest text-botanik-green/40 mb-4 md:mb-6">
          {searchQuery ? `${t.grid.results_for} "${searchQuery}"` : t.grid.title}
        </h3>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
          {filteredProducts.filter(p => (!p.featured && !(p as any).isBundle && !(p as any).isSpecial) || searchQuery).map((product) => {
            return (
              <div 
                key={product.id} 
                onClick={() => onNavigateDetail(product.id)}
                className="bg-white rounded-[40px] border border-botanik-green/5 overflow-hidden flex flex-col cursor-pointer hover:shadow-2xl transition-all group"
              >
                <div className="relative h-64 md:h-80 overflow-hidden bg-[#F9F9F7]">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <button 
                    onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}
                    className="absolute bottom-4 right-4 w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg text-botanik-green hover:bg-botanik-orange hover:text-white transition-colors"
                  >
                    <ShoppingBag className="w-5 h-5" />
                  </button>
                </div>
                <div className="p-4 md:p-6 flex flex-col flex-1">
                  <div className="text-[8px] md:text-[10px] font-bold text-botanik-orange uppercase tracking-widest mb-1 md:mb-2 whitespace-nowrap overflow-hidden text-ellipsis">
                    {product.subtitle}
                  </div>
                  <h4 className="text-sm md:text-lg font-bold text-botanik-green mb-2 md:mb-4 leading-tight flex-1">
                    {product.name}
                  </h4>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-base md:text-xl font-bold text-botanik-green">{formatPrice(product.price)}</span>
                    <ArrowRight className="w-4 h-4 md:w-5 md:h-5 text-botanik-green/20 group-hover:text-botanik-green transition-colors" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Trust Section */}
      <div className="px-4 md:px-6 grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 mb-12">
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
    </div>
  );
}
