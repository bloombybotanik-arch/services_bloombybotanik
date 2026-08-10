/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState, lazy, Suspense } from 'react';
import { Lock, ShoppingBag, BookOpen, FlaskConical, Menu, X, ChevronRight, Leaf, ShieldCheck, SearchCheck, Award, Star, User, Check, ArrowRight, ChefHat, Instagram, Youtube, Facebook, Pin as Pinterest, Music2 as TikTok, MessageSquare, Sparkles, Wind, Waves, Moon, Utensils, Activity, Globe, Settings } from 'lucide-react';
import { translations, Language } from './translations';
import { getProducts } from './StoreContent';
import Footer from './components/Footer';
import { wrapTitle } from './lib/textUtils';
import { AuthModal } from './components/AuthModal';
import { PremiumModal } from './components/PremiumModal';
import { auth, db } from './lib/firebase';
import { onAuthStateChanged, User as FirebaseUser, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import bloomLabImg from './assets/images/bloomlab_main_1784887530345.jpeg';
import img05 from './assets/images/Img_05.jpeg';
import logoSidebar from './assets/images/logo_sidebar_1784886108085.png';
import { OptimizedImage } from './components/OptimizedImage';
import { CookieBanner } from './components/CookieBanner';
import { FloatingChat } from './components/FloatingChat';
import { LanguageSelector } from './components/LanguageSelector';

const HomeContent = lazy(() => import('./HomeContent'));
const LibraryContent = lazy(() => import('./LibraryContent'));
const StoreContent = lazy(() => import('./StoreContent'));
const GuideContent = lazy(() => import('./GuideContent'));
const CartContent = lazy(() => import('./CartContent'));
const CheckoutFlow = lazy(() => import('./CheckoutFlow'));
const ProductDetail = lazy(() => import('./ProductDetail'));
const CulinarySection = lazy(() => import('./CulinarySection'));
const CosmeticsContent = lazy(() => import('./CosmeticsContent'));
const LibraryLanding = lazy(() => import('./LibraryLanding'));
const ActivationPage = lazy(() => import('./ActivationPage'));
const LegalPages = lazy(() => import('./LegalPages'));
const ChatContent = lazy(() => import('./ChatContent'));
const AccountContent = lazy(() => import('./AccountContent'));
const AdminDashboard = lazy(() => import('./components/AdminDashboard'));
const ManifesteContent = lazy(() => import('./ManifesteContent'));
const MachineLanding = lazy(() => import('./MachineLanding'));
const PhytotherapyResetPage = lazy(() => import('./PhytotherapyResetPage'));
const PillarExtraction = lazy(() => import('./PillarExtraction'));
const PendingContent = lazy(() => import('./PendingContent'));

// Loading Placeholder for Lazy components
const ViewLoader = () => (
  <div className="flex-1 flex items-center justify-center bg-[#F9F9F7]">
    <div className="w-12 h-12 border-4 border-botanik-green/20 border-t-botanik-green rounded-full animate-spin" />
  </div>
);

// --- SPA ROUTING CONFIG ---
const BlogContent = lazy(() => import('./BlogContent'));

const VIEW_PATHS: Record<string, string> = {
  home: '/', machine: '/bloomlab', 'phytotherapie-reset': '/phytotherapie-reset',
  boutique: '/boutique', culinaire: '/culinaire', cosmetiques: '/cosmetiques',
  'library-landing': '/library-landing', manifeste: '/manifeste',
  activation: '/activation', account: '/compte', legal: '/legal', chat: '/chat',
  cart: '/panier', checkout: '/checkout', guide: '/qu-est-ce-que-l-infusion-botanique', pending: '/en-attente',
  library: '/bibliotheque', 'pillar-extraction': '/extraction-botanique-guide-complet',
  admin: '/admin', blog: '/blog'
};

const PATH_VIEWS: Record<string, string> = Object.fromEntries(
  Object.entries(VIEW_PATHS).map(([view, path]) => [path, view])
);

// --- SEO & DATA UTILS ---
const POST_TITLE = "L'Élévation de l'Extraction : vers le Totum absolu";
const MAIN_KEYWORDS = "extraction totum, laboratoire botanique, souveraineté santé, infusion botanique, art de l'extraction, plantes médicinales, remèdes naturels";

// Generates dynamic ALT text (mimicking the requested PHP script)
const generateSeoAlt = (imageContext: string) => {
  return `${POST_TITLE} - ${imageContext} - ${MAIN_KEYWORDS}`;
};

// JSON-LD & Dynamic SEO Metadata Injection Component
const SEOMetadata = ({ lang, currentView, t, productId }: { lang: Language, currentView: string, t: any, productId?: string }) => {
  useEffect(() => {
    // 1. Handle dynamic Title & Meta Description
    let seoKey: 'home' | 'herbarium' | 'shop' | 'blog' | 'pillar' | 'extraction' | 'infusion' | 'machine' | 'manifesto' = 'home';
    
    if (['herbier', 'library', 'library-landing', 'culinaire', 'cosmetiques'].includes(currentView)) {
      seoKey = 'herbarium';
    } else if (['boutique', 'product-detail', 'cart', 'checkout'].includes(currentView)) {
      seoKey = 'shop';
    } else if (currentView === 'pillar-extraction') {
      seoKey = 'pillar';
    } else if (currentView === 'blog') {
      seoKey = 'blog';
    } else if (currentView === 'machine') {
      seoKey = 'machine';
    } else if (currentView === 'manifeste') {
      seoKey = 'manifesto';
    }

    const currentSeo = t.seo[seoKey];

    if (!currentSeo) {
      document.title = "Bloom by BotaniK";
      return;
    }

      // Override with product-specific SEO when viewing a product detail page
      let finalTitle = currentSeo.title;
      let finalDescription = currentSeo.description;
      if (currentView === 'product-detail' && productId) {
        const products = getProducts(lang);
        const product = products.find((p: any) => p.id === productId);
        if (product) {
          finalTitle = `${product.name} | ${product.subtitle} | Bloom by BotaniK`;
          finalDescription = product.description;
        }
      }
      document.title = finalTitle;
    
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
      metaDesc.setAttribute('content', finalDescription);
    
    // Update canonical link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      const path = currentView === 'product-detail' && productId ? `/boutique/${productId}` : (VIEW_PATHS[currentView as string] || '/');
      canonical.setAttribute('href', `https://bloombybotanik.com${path}`);
    }
    
    // 2. JSON-LD Injection
    const jsonLd = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          "@id": "https://bloombybotanik.com/#organization",
          "name": "Bloom by BotaniK",
          "url": "https://bloombybotanik.com",
          "logo": {
            "@type": "ImageObject",
            "url": "https://bloombybotanik.com/logo.png"
          }
        },
        {
          "@type": "WebSite",
          "@id": "https://bloombybotanik.com/#website",
          "url": "https://bloombybotanik.com",
          "name": "Bloom by BotaniK",
          "publisher": { "@id": "https://bloombybotanik.com/#organization" }
        },
        {
          "@type": "Product",
          "@id": "https://bloombybotanik.com/bloomlab/#product",
          "name": "BloomLab",
          "description": "Extracteur Inox 304 avec précision ±0,5°C",
          "image": "https://bloombybotanik.com/assets/images/bloomlab_main_1784887530345.jpeg",
          "brand": {
            "@type": "Brand",
            "name": "Bloom by BotaniK"
          },
          "sku": "BLOOM-LAB-2026",
          "mpn": "BL-2026",
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "127",
            "bestRating": "5",
            "worstRating": "1"
          },
          "review": [
            {
              "@type": "Review",
              "author": {
                "@type": "Person",
                "name": "Marie D."
              },
              "datePublished": "2026-06-15",
              "reviewBody": "Une précision incroyable pour mes macérats huileux. Je ne m'en passe plus.",
              "reviewRating": {
                "@type": "Rating",
                "bestRating": "5",
                "ratingValue": "5",
                "worstRating": "1"
              }
            }
          ],
          "offers": {
            "@type": "Offer",
            "price": "289.00",
            "priceCurrency": "EUR",
            "availability": "https://schema.org/InStock",
            "url": "https://bloombybotanik.com/bloomlab",
            "itemCondition": "https://schema.org/NewCondition",
            "hasMerchantReturnPolicy": {
              "@type": "MerchantReturnPolicy",
              "applicableCountry": "FR",
              "returnPolicyCategory": "MerchantReturnFiniteReturnPeriod",
              "merchantReturnDays": 14,
              "returnMethod": "https://schema.org/ReturnByMail",
              "returnFees": "https://schema.org/FreeReturn"
            },
            "shippingDetails": {
              "@type": "OfferShippingDetails",
              "shippingRate": {
                "@type": "MonetaryAmount",
                "value": "0.00",
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
                  "minValue": 0,
                  "maxValue": 1,
                  "unitCode": "d"
                },
                "transitTime": {
                  "@type": "QuantitativeValue",
                  "minValue": 2,
                  "maxValue": 5,
                  "unitCode": "d"
                }
              }
            }
          }
        },
            ...getProducts(lang).filter((p: any) => p.id !== 'bloomlab').map((p: any) => ({
              "@type": "Product",
              "@id": `https://bloombybotanik.com/boutique/${p.id}/#product`,
              "name": p.name,
              "description": p.description,
              "image": typeof p.image === 'string' ? p.image : (p.image?.src || undefined),
              "brand": { "@type": "Brand", "name": "Bloom by BotaniK" },
              "aggregateRating": p.reviews ? {
                "@type": "AggregateRating",
                "ratingValue": p.rating.toString(),
                "reviewCount": p.reviews.toString(),
                "bestRating": "5",
                "worstRating": "1"
              } : undefined,
              "review": p.reviews ? [{
                "@type": "Review",
                "author": { "@type": "Person", "name": "Client Bloom" },
                "reviewBody": "Excellent produit, conforme à la démarche Bloom.",
                "reviewRating": {
                  "@type": "Rating",
                  "bestRating": "5",
                  "ratingValue": p.rating.toString(),
                  "worstRating": "1"
                }
              }] : undefined,
              "offers": {
                "@type": "Offer",
                "price": p.price.toFixed(2),
                "priceCurrency": "EUR",
                "availability": "https://schema.org/InStock",
                "url": `https://bloombybotanik.com/boutique/${p.id}`,
                "itemCondition": "https://schema.org/NewCondition"
              }
            }))
      ]
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'json-ld-seo';
    script.text = JSON.stringify(jsonLd);
    document.head.appendChild(script);

    return () => {
      const oldScript = document.getElementById('json-ld-seo');
      if (oldScript) document.head.removeChild(oldScript);
    };
    }, [lang, currentView, t, productId]);

  return null;
};

const CertificationCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const certs = [
    { icon: Leaf, text: "Certifié BIO" },
    { icon: ShieldCheck, text: "Zéro Métaux Lourds" },
    { icon: SearchCheck, text: "Traçabilité 100%" },
    { icon: Award, text: "Garantie Haute Pureté" }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % certs.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-16 flex items-center justify-center overflow-hidden bg-white/5 rounded-xl border border-white/10">
      {certs.map((cert, index) => {
        const Icon = cert.icon;
        return (
          <div
            key={index}
            className={`absolute inset-0 flex flex-col items-center justify-center p-2 transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? 'opacity-100 relative z-10' : 'opacity-0 absolute z-0'
            }`}
          >
            <Icon className="w-5 h-5 text-white mb-1" />
            <span className="text-[10px] uppercase tracking-widest text-[#F5F3EB] font-semibold text-center leading-tight">
              {cert.text}
            </span>
          </div>
        );
      })}
    </div>
  );
};

// --- COMPONENTS ---

const NavigationSidebar = ({ className = "", currentView, navigateTo, user, handleLogout, lang, setLang, t }: { className?: string, currentView: string, navigateTo: (v: any) => void, user?: any, handleLogout?: () => void, lang: Language, setLang: (l: Language) => void, t: any }) => (
  <aside className={`w-80 h-screen sticky top-0 bg-[#293228] p-8 flex flex-col justify-between ${className}`}>
    <div>
      <div 
        className="flex items-center gap-4 mb-12 cursor-pointer group/logo notranslate"
        onClick={() => navigateTo('home')}
        translate="no"
      >
        <OptimizedImage 
          src={logoSidebar} 
          alt="Logo Bloom by BotaniK" 
          priority={true}
          width={64}
          height={64}
          className="w-16 h-16 object-contain group-hover/logo:brightness-0 group-hover/logo:invert-[51%] group-hover/logo:sepia-[95%] group-hover/logo:saturate-[2180%] group-hover/logo:hue-rotate-[1deg] group-hover/logo:brightness-[101%] group-hover/logo:contrast-[101%] transition-all" 
        />
        <div className="flex flex-col leading-tight uppercase text-white group-hover/logo:text-[#F97316] transition-colors">
          <span className="text-[11px] font-bold tracking-[0.22em] opacity-80">Bloom by</span>
          <span className="text-xl font-black tracking-widest">botaniK</span>
        </div>
      </div>

      <LanguageSelector lang={lang} setLang={setLang} variant="sidebar" />

      <nav className="mb-12">
        <h3 className="text-xs uppercase tracking-[0.2em] text-[#F5F3EB] mb-6 font-semibold">{lang === 'fr' ? 'Sommaire' : lang === 'en' ? 'Summary' : 'Inhalt'}</h3>
        <ul className="space-y-4 text-sm font-medium">
          <li>
            <a 
              href="#" 
              onClick={(e) => { 
                e.preventDefault(); 
                navigateTo('home'); 
                setTimeout(() => document.getElementById('protocole')?.scrollIntoView({ behavior: 'smooth' }), 100);
              }} 
              className="text-white hover:text-[#F97316] transition-colors"
            >
              I. {lang === 'fr' ? 'Commencer ici' : lang === 'en' ? 'Start here' : 'Hier beginnen'}
            </a>
          </li>
          <li>
            <a 
              href="#" 
              onClick={(e) => { 
                e.preventDefault(); 
                navigateTo('home'); 
                setTimeout(() => document.getElementById('comprendre-infusion-botanique')?.scrollIntoView({ behavior: 'smooth' }), 100);
              }} 
              className="text-white hover:text-[#F97316] transition-colors"
            >
              II. {t.home.understandingInfusion.sidebar_label.split('. ')[1]}
            </a>
          </li>
          <li>
            <a 
              href="#" 
              onClick={(e) => { 
                e.preventDefault(); 
                navigateTo('home'); 
                setTimeout(() => document.getElementById('science')?.scrollIntoView({ behavior: 'smooth' }), 100);
              }} 
              className="text-white hover:text-[#F97316] transition-colors"
            >
              III. {lang === 'fr' ? 'La science du Totum' : lang === 'en' ? 'The science of Totum' : 'Die Wissenschaft des Totum'}
            </a>
          </li>
          <li>
            <a 
              href="#" 
              onClick={(e) => { 
                e.preventDefault(); 
                navigateTo('home'); 
                setTimeout(() => document.getElementById('alternative')?.scrollIntoView({ behavior: 'smooth' }), 100);
              }} 
              className="text-white hover:text-[#F97316] transition-colors"
            >
              IV. {lang === 'fr' ? 'Une autre voie' : lang === 'en' ? 'Another way' : 'Ein anderer Weg'}
            </a>
          </li>
          <li>
            <a 
              href="#" 
              onClick={(e) => { 
                e.preventDefault(); 
                navigateTo('home'); 
                setTimeout(() => document.getElementById('choix')?.scrollIntoView({ behavior: 'smooth' }), 100);
              }} 
              className="text-white hover:text-[#F97316] transition-colors"
            >
              V. {lang === 'fr' ? 'Trouver votre voie' : lang === 'en' ? 'Find your way' : 'Finden Sie Ihren Weg'}
            </a>
          </li>
          <li>
            <a 
              href="#" 
              onClick={(e) => { 
                e.preventDefault(); 
                navigateTo('activation'); 
              }} 
              className="text-white hover:text-[#F97316] transition-colors"
            >
              VI. {lang === 'fr' ? 'Activer ma BloomLab' : lang === 'en' ? 'Activate my BloomLab' : 'Meine BloomLab aktivieren'}
            </a>
          </li>
        </ul>
      </nav>

      <div className="space-y-4">
        <h3 className="text-xs uppercase tracking-[0.2em] text-[#F5F3EB] mb-4 font-semibold">{lang === 'fr' ? 'Accès Rapide' : lang === 'en' ? 'Quick Access' : 'Schnellzugriff'}</h3>
        <a 
          href="#" 
          onClick={(e) => { e.preventDefault(); navigateTo('machine'); }}
          className={`flex items-center gap-3 text-sm font-medium transition-colors group ${currentView === 'machine' ? 'text-[#F97316]' : 'text-white hover:text-[#F97316]'}`}
        >
          <FlaskConical className={`w-4 h-4 transition-colors ${currentView === 'machine' ? 'text-[#F97316]' : 'group-hover:text-[#F97316]'}`} /> {lang === 'fr' ? 'La Machine & Niveaux' : lang === 'en' ? 'The Machine & Levels' : 'Die Maschine & Level'}
        </a>
        <a 
          href="#" 
          onClick={(e) => { e.preventDefault(); navigateTo('phytotherapie-reset'); }}
          className={`flex items-center gap-3 text-sm font-medium transition-colors group ${currentView === 'phytotherapie-reset' ? 'text-[#F97316]' : 'text-white hover:text-[#F97316]'}`}
        >
          <Activity className={`w-4 h-4 transition-colors ${currentView === 'phytotherapie-reset' ? 'text-[#F97316]' : 'group-hover:text-[#F97316]'}`} /> {t.nav.guide}
        </a>
        <a 
          href="#" 
          onClick={(e) => { e.preventDefault(); navigateTo('boutique'); }}
          className={`flex items-center gap-3 text-sm font-medium transition-colors group ${currentView === 'boutique' ? 'text-[#F97316]' : 'text-white hover:text-[#F97316]'}`}
        >
          <ShoppingBag className={`w-4 h-4 transition-colors ${currentView === 'boutique' ? 'text-[#F97316]' : 'group-hover:text-[#F97316]'}`} /> {t.nav.shop}
        </a>
        <a 
          href="#" 
          onClick={(e) => { e.preventDefault(); navigateTo('culinaire'); }}
          className={`flex items-center gap-3 text-sm font-medium transition-colors group ${currentView === 'culinaire' ? 'text-[#F97316]' : 'text-white hover:text-[#F97316]'}`}
        >
          <ChefHat className={`w-4 h-4 transition-colors ${currentView === 'culinaire' ? 'text-[#F97316]' : 'group-hover:text-[#F97316]'}`} /> {t.nav.culinary}
        </a>
        <a 
          href="#" 
          onClick={(e) => { e.preventDefault(); navigateTo('cosmetiques'); }}
          className={`flex items-center gap-3 text-sm font-medium transition-colors group ${currentView === 'cosmetiques' ? 'text-[#F97316]' : 'text-white hover:text-[#F97316]'}`}
        >
          <Star className={`w-4 h-4 transition-colors ${currentView === 'cosmetiques' ? 'text-[#F97316]' : 'group-hover:text-[#F97316]'}`} /> {t.nav.cosmetics}
        </a>
        <a 
          href="#" 
          onClick={(e) => { e.preventDefault(); navigateTo('library-landing'); }}
          className={`flex items-center gap-3 text-sm font-medium transition-colors group ${currentView === 'library-landing' ? 'text-[#F97316]' : 'text-white hover:text-[#F97316]'}`}
        >
          <Leaf className={`w-4 h-4 transition-colors ${currentView === 'library-landing' ? 'text-[#F97316]' : 'group-hover:text-[#F97316]'}`} /> {t.nav.herbarium}
        </a>
        <a 
          href="https://blog.bloombybotanik.com/" 
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 text-sm font-medium text-white hover:text-[#F97316] transition-colors group mb-12"
        >
          <BookOpen className="w-4 h-4 group-hover:text-[#F97316]" /> {t.nav.blog}
        </a>
      </div>
    </div>

    <div>
      {/* Social Links */}
      <div className="flex justify-between items-center px-2 mb-8">
        <a href="https://www.youtube.com/@BloomByBotanik" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-[#F97316] transition-colors" aria-label="YouTube">
          <Youtube className="w-5 h-5" />
        </a>
        <a href="https://fr.pinterest.com/bloombybotanik" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-[#F97316] transition-colors" aria-label="Pinterest">
          <img src="https://cdn.simpleicons.org/pinterest/white" className="w-5 h-5 opacity-40 hover:opacity-100 transition-opacity" alt="Pinterest" />
        </a>
        <a href="https://www.instagram.com/bloombybotanik/" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-[#F97316] transition-colors" aria-label="Instagram">
          <Instagram className="w-5 h-5" />
        </a>
        <a href="https://www.facebook.com/profile.php?id=61577892110122" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-[#F97316] transition-colors" aria-label="Facebook">
          <Facebook className="w-5 h-5" />
        </a>
        <a href="https://www.tiktok.com/@bloombybotanik" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-[#F97316] transition-colors" aria-label="TikTok">
          <img src="https://cdn.simpleicons.org/tiktok/white" className="w-5 h-5 opacity-40 hover:opacity-100 transition-opacity" alt="TikTok" />
        </a>
      </div>

      {/* Auth Status */}
      {user ? (
        <div className="mb-6 p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3 text-sm text-white">
            <div className="w-8 h-8 rounded-full bg-botanik-green flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-xs truncate max-w-[120px]">{user.email}</span>
              <button onClick={handleLogout} className="text-left text-[10px] text-white/50 hover:text-white transition-colors">Déconnexion</button>
            </div>
          </div>
        </div>
        ) : (
        <div className="mb-6">
          <button 
            onClick={() => navigateTo('account')} 
            className="w-full py-3 px-4 bg-white/10 text-white rounded-xl text-sm font-semibold hover:bg-white/20 transition-colors flex items-center justify-center gap-2"
          >
            <User className="w-4 h-4" /> Espace Membre
          </button>
        </div>
      )}

      {/* Product Reassurance Image - Restored per request */}
      <div className="mt-8 rounded-xl overflow-hidden relative group bg-white/5">
        {/* Note pour Hostinger : Utiliser /assets/images/IMG_9472.jpg */}
        <OptimizedImage 
          src={bloomLabImg}
          alt={generateSeoAlt("Machine BloomLab")} 
          width={300}
          height={300}
          className="w-full h-auto object-contain p-4 transform group-hover:scale-105 transition-transform duration-700"
        />
      </div>
    </div>
  </aside>
);

const HybridOffer = ({ onNavigate }: { onNavigate: (view: any) => void }) => (
  <section id="choix" className="my-24 scroll-mt-24">
    <div className="text-center mb-12">
      <h2 className="text-3xl md:text-5xl font-light mb-4 font-sans text-botanik-green tracking-[0.05em]">Le Choix de Souveraineté</h2>
      <p className="text-xl opacity-80 max-w-2xl mx-auto">Deux voies d'excellence pour atteindre le Totum. Laquelle résonne avec votre essence ?</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-12">
      {/* GAUCHE : L'Unité (Autonomie) */}
      <div className="bg-white border border-botanik-green/10 rounded-2xl p-8 lg:p-12 shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
        <div className="mb-8 flex-1">
          <div className="inline-block px-3 py-1 bg-botanik-green/5 text-botanik-green text-xs font-bold uppercase tracking-widest rounded-full mb-6">Autonomie</div>
          <h3 className="text-2xl lg:text-3xl font-medium tracking-wide mb-4">Maîtrisez votre autonomie</h3>
          <p className="text-lg opacity-80 mb-6 leading-relaxed">Devenez l'artisan de votre propre bien-être. Reprenez le pouvoir sur chaque étape de l'extraction.</p>
          <ul className="space-y-3 mb-8">
            <li className="flex items-center gap-3"><ChevronRight className="w-4 h-4 text-botanik-orange" /> <span>Précision thermique absolue <strong className="font-semibold text-botanik-orange">±0,5°C</strong></span></li>
            <li className="flex items-center gap-3"><ChevronRight className="w-4 h-4 text-botanik-orange" /> <span>Conception clinique en <strong>Inox 304</strong></span></li>
            <li className="flex items-center gap-3"><ChevronRight className="w-4 h-4 text-botanik-orange" /> <span>Liberté d'expérimentation totale</span></li>
          </ul>
        </div>
        <div>
          <div className="text-3xl font-bold mb-6">239 € <span className="text-lg line-through opacity-50 font-normal">289 €</span></div>
          <button onClick={() => onNavigate('boutique')} className="w-full py-4 px-6 bg-botanik-green text-white rounded-lg font-semibold hover:bg-botanik-green/90 transition-colors flex items-center justify-center gap-2 group">
            Acquérir ma BloomLab
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* DROITE : Le Laboratoire (Délégation en MAGENTA) */}
      <div className="bg-white border-2 border-botanik-magenta rounded-2xl p-8 lg:p-12 shadow-[0_8px_30px_rgba(118,14,43,0.12)] hover:shadow-[0_8px_40px_rgba(118,14,43,0.2)] transition-shadow duration-300 flex flex-col h-full relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-botanik-magenta/5 rounded-bl-full -z-10" />
        
        <div className="mb-8 flex-1">
          <div className="inline-block px-3 py-1 bg-botanik-magenta text-white text-xs font-bold uppercase tracking-widest rounded-full mb-6 relative z-10">Service Premium</div>
          <h3 className="text-2xl lg:text-3xl font-medium tracking-wide mb-4 text-botanik-magenta">Déléguez votre extraction</h3>
          <p className="text-lg mb-6 leading-relaxed font-medium text-gray-800">Nous réalisons votre Totum sur-mesure sous contrat de traçabilité signé.</p>
          <ul className="space-y-3 mb-8">
            <li className="flex items-center gap-3"><ChevronRight className="w-4 h-4 text-botanik-magenta" /> <span>Expertise biochimique d'<strong>Élio</strong></span></li>
            <li className="flex items-center gap-3"><ChevronRight className="w-4 h-4 text-botanik-magenta" /> <span>Protocoles de laboratoire certifiés</span></li>
            <li className="flex items-center gap-3"><ChevronRight className="w-4 h-4 text-botanik-magenta" /> <span>Pureté garantie, effort nul</span></li>
          </ul>
        </div>
        <div>
          <p className="text-sm text-botanik-magenta/80 mb-4 font-medium uppercase tracking-wide">Sur devis & disponibilité</p>
          <button onClick={() => onNavigate('pending')} className="w-full py-4 px-6 bg-botanik-magenta text-white rounded-lg font-semibold hover:bg-[#5a0b21] transition-colors flex items-center justify-center gap-2 shadow-[0_4px_14px_rgba(118,14,43,0.39)] group">
            Solliciter le Laboratoire
            <FlaskConical className="w-4 h-4 group-hover:rotate-12 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  </section>
);

export default function App() {
  const [lang, setLang] = useState<Language>('fr');
  const t = translations[lang];
  const [currentView, setCurrentView] = useState<'home' | 'guide' | 'article' | 'boutique' | 'culinaire' | 'cosmetiques' | 'library' | 'pending' | 'product-detail' | 'cart' | 'checkout' | 'legal' | 'account' | 'chat' | 'machine' | 'phytotherapie-reset' | 'library-landing' | 'activation' | 'manifeste' | 'pillar-extraction' | 'admin' | 'blog'>('home');
  const [previousView, setPreviousView] = useState<'home' | 'guide' | 'article' | 'boutique' | 'culinaire' | 'cosmetiques' | 'library' | 'pending' | 'product-detail' | 'cart' | 'checkout' | 'legal' | 'account' | 'chat' | 'machine' | 'phytotherapie-reset' | 'library-landing' | 'activation' | 'manifeste' | 'pillar-extraction' | 'admin' | 'blog'>('home');

  const [currentProductId, setCurrentProductId] = useState<string | undefined>();
  const [legalType, setLegalType] = useState<'cgv' | 'cgu' | 'privacy' | 'mentions'>('mentions');
  const [cart, setCart] = useState<any[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSplashFinished, setIsSplashFinished] = useState(false);

  useEffect(() => {
    // Simple splash timeout
    const timer = setTimeout(() => setIsSplashFinished(true), 2500);
    return () => clearTimeout(timer);
  }, []);
  
    // --- SPA ROUTING: sync URL with state ---
    useEffect(() => {
      // --- Detect legacy language prefix (/en, /de) and strip it ---
      const rawPath = (sessionStorage.getItem('spa-redirect-path') || window.location.pathname).split('?')[0].split('#')[0];
      const langMatch = rawPath.match(/^\/(en|de)(\/.*)?$/);
      const detectedLang = (langMatch ? langMatch[1] : 'fr') as Language;
      const restPath = langMatch ? (langMatch[2] || '/') : rawPath;
      setLang(detectedLang);
      sessionStorage.removeItem('spa-redirect-path');

      // --- Legacy route aliases (pre-redesign URLs) mapped to current views ---
      const LEGACY_ALIASES: Record<string, string> = {
        '/about': '/manifeste',
        '/contact': '/manifeste',
        '/how-it-works-diy-natural-recipes': '/boutique',
        '/natural-herbal-infusion-body-care-oils-': '/cosmetiques',
        '/natural-herbal-infusion-face-skincare-recipes': '/cosmetiques',
        '/infusion-botanique-maison-comment-ca-marche': '/',
        '/extraction-plantes-naturelles-bienfaits': '/extraction-botanique-guide-complet',
        '/chroniques': '/',
        '/blog': '/',
        '/blog/': '/',
      };
      const normalizedPath = LEGACY_ALIASES[restPath] || restPath;

      // --- Detect product detail URL pattern /boutique/:id ---
      const productMatch = normalizedPath.match(/^\/boutique\/([a-z0-9-]+)$/);
      if (productMatch) {
        setCurrentProductId(productMatch[1]);
        setCurrentView('product-detail');
        return;
      }

      const matchedView = PATH_VIEWS[normalizedPath];
      if (matchedView) {
        setCurrentView(matchedView as typeof currentView);
        
        // Handle scrolling to specific section for legacy URL
        if (restPath === '/infusion-botanique-maison-comment-ca-marche') {
          setTimeout(() => {
            const element = document.getElementById('comprendre-infusion-botanique');
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
            }
          }, 1500);
        }
      }
    }, []);


  const addToCart = (product: any) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    navigateTo('cart');
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(0, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const navigateTo = (view: typeof currentView, productId?: string, type?: any) => {
    if (view === 'account' && !user) {
      setShowAuthModal(true);
      return;
    }
    if (view !== 'pending' && currentView !== 'pending') setPreviousView(currentView);
    else if (view === 'pending') setPreviousView(currentView);
    
    if (view === 'legal' && type) setLegalType(type);
    
    setCurrentProductId(productId);
    setCurrentView(view);
    const targetPath = view === 'product-detail' && productId ? `/boutique/${productId}` : (VIEW_PATHS[view] || '/');
    if (window.location.pathname !== targetPath) {
      window.history.pushState({}, '', targetPath);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView, currentProductId]);

  const [user, setUser] = useState<FirebaseUser | any | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [assessmentResult, setAssessmentResult] = useState<any>(null);
  const [favorites, setFavorites] = useState<string[]>([]);

  const handleAdminLogin = () => {
    const adminUser = {
      uid: 'admin-uid',
      email: 'bloombybotanik@gmail.com',
      displayName: 'Admin Bloom',
    };
    setUser(adminUser);
    setIsPremium(true);
    setAuthLoading(false);
  };

  const handleSaveAssessment = async (result: any) => {
    setAssessmentResult(result);
    if (user) {
      try {
        await setDoc(doc(db, 'users', user.uid), {
          assessment: result,
          updatedAt: new Date().toISOString()
        }, { merge: true });
      } catch (error) {
        console.error("Error saving assessment:", error);
      }
    }
  };

  const handleToggleFavorite = async (itemId: string) => {
    const newFavorites = favorites.includes(itemId)
      ? favorites.filter(id => id !== itemId)
      : [...favorites, itemId];
    
    setFavorites(newFavorites);
    if (user) {
      try {
        await setDoc(doc(db, 'users', user.uid), {
          favorites: newFavorites,
          updatedAt: new Date().toISOString()
        }, { merge: true });
      } catch (error) {
        console.error("Error saving favorites:", error);
      }
    }
  };

  const handleResetAssessment = async () => {
    setAssessmentResult(null);
    if (user) {
      try {
        await setDoc(doc(db, 'users', user.uid), {
          assessment: null,
          updatedAt: new Date().toISOString()
        }, { merge: true });
      } catch (error) {
        console.error("Error resetting assessment:", error);
      }
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        if (user.email === 'bloombybotanik@gmail.com') {
          setIsPremium(true);
        } else {
          // Fetch user premium status from Firestore
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            const data = userDoc.data();
            setIsPremium(data?.isPremium || false);
            setAssessmentResult(data?.assessment || null);
            setFavorites(data?.favorites || []);
          } else {
            await setDoc(doc(db, 'users', user.uid), {
              isPremium: false,
              createdAt: new Date().toISOString()
            });
            setIsPremium(false);
            setAssessmentResult(null);
            setFavorites([]);
          }
        }
      } else {
        setIsPremium(false);
        setAssessmentResult(null);
        setFavorites([]);
      }
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleNavigate = (view: any) => {
    navigateTo(view);
  };

  const handleRequirePremium = () => {
    if (!user) {
      setShowAuthModal(true);
    } else if (!isPremium) {
      setShowPremiumModal(true);
    }
  };

  const handleLogout = () => {
    signOut(auth);
    navigateTo('home');
  };

  if (authLoading || !isSplashFinished) return (
    <div className="min-h-screen bg-[#293228] flex flex-col items-center justify-center animate-in fade-in duration-1000">
      <img src={logoSidebar} alt="Bloom" className="w-24 h-24 mb-6" />
      <div className="w-12 h-1 border-2 border-white/10 overflow-hidden relative rounded-full">
        <div className="absolute inset-0 bg-white/40 animate-loading-bar" />
      </div>
    </div>
  );

  const renderMainContent = () => {
    switch (currentView) {
      case 'home': return <HomeContent onNavigate={navigateTo} lang={lang} />;
      case 'machine': return <MachineLanding onNavigate={navigateTo} lang={lang} />;
      case 'phytotherapie-reset': return <PhytotherapyResetPage onNavigate={navigateTo} lang={lang} />;
      case 'library-landing': return <LibraryLanding onNavigate={navigateTo} lang={lang} />;
      case 'guide': return <GuideContent onNavigate={navigateTo} lang={lang} />;
      case 'ateliers': return (
        <div className="max-w-[1200px] mx-auto px-6 py-12 animate-in fade-in duration-700">
          <h2 className="text-3xl font-bold text-botanik-green mb-8">{t.nav.guide}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div onClick={() => navigateTo('culinaire')} className="group cursor-pointer bg-white border border-botanik-green/5 p-8 rounded-3xl hover:border-botanik-orange transition-colors">
              <ChefHat className="w-12 h-12 text-botanik-orange mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-botanik-green mb-2">L'Atelier Culinaire</h3>
              <p className="text-botanik-green/60 text-sm mb-6 leading-relaxed">Maîtrisez l'art de l'infusion et des terpènes pour une gastronomie vivante.</p>
              <div className="flex items-center gap-2 text-botanik-orange font-bold text-sm">Découvrir <ArrowRight className="w-4 h-4" /></div>
            </div>
            <div onClick={() => navigateTo('cosmetiques')} className="group cursor-pointer bg-white border border-botanik-green/5 p-8 rounded-3xl hover:border-botanik-green transition-colors">
              <Star className="w-12 h-12 text-botanik-green mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-botanik-green mb-2">Les Soins Cosmétiques</h3>
              <p className="text-botanik-green/60 text-sm mb-6 leading-relaxed">Créez vos propres sérums et élixirs systémiques sans chimie de synthèse.</p>
              <div className="flex items-center gap-2 text-botanik-green font-bold text-sm">Découvrir <ArrowRight className="w-4 h-4" /></div>
            </div>
            <div onClick={() => navigateTo('library')} className="group cursor-pointer bg-botanik-green/5 border border-botanik-green/10 p-8 rounded-3xl hover:bg-botanik-green transition-colors">
              <FlaskConical className="w-12 h-12 text-botanik-green mb-6 group-hover:text-white transition-colors" />
              <h3 className="text-xl font-bold text-botanik-green group-hover:text-white transition-colors mb-2">Phytothérapie Experte</h3>
              <p className="text-botanik-green/60 group-hover:text-white/60 text-sm mb-6 leading-relaxed">Accédez aux protocoles avancés et aux 56 kits de précision BloomLab.</p>
              <div className="flex items-center gap-2 text-botanik-green group-hover:text-white font-bold text-sm transition-colors">Explorer <ArrowRight className="w-4 h-4" /></div>
            </div>
          </div>
        </div>
      );
      case 'library': return (
        <LibraryContent 
          isPremium={isPremium} 
          onRequirePremium={handleRequirePremium} 
          onNavigatePending={() => navigateTo('pending')}
          onNavigate={navigateTo}
          lang={lang}
        />
      );
      case 'culinaire': return (
        <CulinarySection 
          isPremium={isPremium} 
          onRequirePremium={handleRequirePremium} 
          onNavigatePending={() => navigateTo('pending')}
          onNavigate={navigateTo}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
          initialPlantId={currentProductId}
          lang={lang}
        />
      );
      case 'cosmetiques': return (
        <CosmeticsContent 
          isPremium={isPremium} 
          onRequirePremium={handleRequirePremium} 
          onNavigatePending={() => navigateTo('pending')}
          onNavigate={navigateTo}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
          initialPlantId={currentProductId}
          lang={lang}
        />
      );
      case 'pending': return <PendingContent onBack={() => navigateTo(previousView === 'pending' ? 'home' : previousView)} lang={lang} />;
      case 'product-detail': return (
        <ProductDetail onBack={() => navigateTo('boutique')} onAddToCart={(product) => {
          addToCart(product);
        }} productId={currentProductId} lang={lang} />
      );
      case 'cart': return (
        <CartContent 
          items={cart}
          onUpdateQuantity={updateQuantity}
          onRemove={removeFromCart}
          onBack={() => navigateTo('boutique')}
          onCheckout={() => navigateTo('checkout')}
          lang={lang}
        />
      );
      case 'checkout': return (
        <CheckoutFlow 
          cart={cart}
          total={cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)}
          onSuccess={() => {
            setCart([]);
            navigateTo('home');
          }}
          onCancel={() => navigateTo('cart')}
          lang={lang}
        />
      );
      case 'chat': return (
        <ChatContent 
          isPremium={isPremium} 
          onNavigate={navigateTo} 
          user={user}
          onRequireAuth={() => setShowAuthModal(true)}
          onSaveAssessment={handleSaveAssessment}
          savedAssessment={assessmentResult}
          onResetAssessment={handleResetAssessment}
          lang={lang}
        />
      );
      case 'manifeste': return <ManifesteContent onBack={() => navigateTo(previousView === 'manifeste' ? 'home' : previousView)} lang={lang} />;
      case 'pillar-extraction': return <PillarExtraction onNavigate={navigateTo} lang={lang} />;
      case 'activation': return (
        <ActivationPage 
          userId={user?.uid || null} 
          onSuccess={() => {
            setIsPremium(true);
            navigateTo('library');
          }} 
          lang={lang}
        />
      );
      case 'account': return (
        <AccountContent 
          user={user} 
          onNavigate={navigateTo} 
          onLogout={handleLogout} 
          lang={lang}
        />
      );
      case 'admin': return (
        user?.email === 'bloombybotanik@gmail.com' ? <AdminDashboard lang={lang} /> : <HomeContent onNavigate={navigateTo} lang={lang} />
      );
      case 'blog': return <BlogContent lang={lang} onNavigate={navigateTo} />;
      case 'legal': return <LegalPages type={legalType} onBack={() => navigateTo(previousView)} lang={lang} />;
      default: return (
        <StoreContent 
          onNavigatePending={() => navigateTo('pending')} 
          onNavigateDetail={(id) => navigateTo('product-detail', id)}
          onAddToCart={(product) => addToCart(product)}
          lang={lang}
        />
      );
    }
  };

  const MobileHeader = () => (
    <header className="lg:hidden sticky top-0 bg-botanik-green z-40 border-b border-white/5 px-4 py-3 flex items-center justify-between shadow-sm notranslate" translate="no">
      <div className="flex items-center gap-2 cursor-pointer group/logo" onClick={() => navigateTo('home')}>
        <div className="w-10 h-10 flex items-center justify-center overflow-hidden">
          <img src={logoSidebar} alt="Bloom" loading="lazy" className="w-full h-full object-contain scale-110" />
        </div>
        <div className="flex flex-col leading-none uppercase text-white group-hover/logo:text-botanik-orange transition-colors">
          <span className="text-[8px] font-bold tracking-[0.2em] opacity-80">Bloom by</span>
          <span className="text-sm font-black tracking-widest">botaniK</span>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button 
          onClick={() => setIsMenuOpen(true)}
          className="p-2 text-white hover:bg-white/10 rounded-full transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>
        <button onClick={() => navigateTo('cart')} className="relative p-2 text-white hover:bg-white/10 rounded-full transition-colors">
          <ShoppingBag className="w-6 h-6 md:w-7 md:h-7" />
          {cart.length > 0 && (
            <span className="absolute top-0 right-0 w-4 h-4 bg-botanik-orange text-white text-[10px] font-bold rounded-full flex items-center justify-center">
              {cart.reduce((s, i) => s + i.quantity, 0)}
            </span>
          )}
        </button>
      </div>
    </header>
  );

  return (
    <div className="flex relative min-h-screen bg-[#F9F9F7]">
        <SEOMetadata lang={lang} currentView={currentView} t={t} productId={currentProductId} />
      
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
        onSuccess={() => {}}
        onAdminLogin={handleAdminLogin}
      />
      
      <PremiumModal
        isOpen={showPremiumModal}
        onClose={() => setShowPremiumModal(false)}
        onUpgrade={async () => {
          if (user) {
            await setDoc(doc(db, 'users', user.uid), { isPremium: true }, { merge: true });
            setIsPremium(true);
          }
        }}
      />

      <CookieBanner lang={lang} />
      {currentView !== 'chat' && <FloatingChat user={user} lang={lang} />}
      
      {/* Desktop Sidebar */}
      <NavigationSidebar 
        className="hidden lg:flex" 
        currentView={currentView} 
        navigateTo={navigateTo} 
        user={user} 
        handleLogout={handleLogout} 
        lang={lang}
        setLang={setLang}
        t={t}
      />

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-botanik-green/95 backdrop-blur-md" onClick={() => setIsMenuOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-[80%] max-w-sm bg-botanik-green border-l border-white/10 shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            <div className="p-6 flex items-center justify-between border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-botanik-orange flex items-center justify-center">
                  <Leaf className="w-4 h-4 text-white" />
                </div>
                <span className="text-white font-black tracking-widest text-sm uppercase">Bloom</span>
              </div>
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="p-2 text-white/60 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8">
              <div className="mb-12">
                <h3 className="text-xs uppercase tracking-[0.2em] text-white/40 mb-6 font-bold">Navigation</h3>
                <div className="grid gap-4">
                  {[
                    { id: 'home', label: lang === 'fr' ? 'Accueil' : lang === 'en' ? 'Home' : 'Startseite', icon: Leaf },
                    { id: 'library-landing', label: t.nav.herbarium, icon: BookOpen },
                    { id: 'phytotherapie-reset', label: 'Reset', icon: Wind },
                    { id: 'machine', label: 'BloomLab', icon: Settings },
                    { id: 'boutique', label: t.nav.shop, icon: ShoppingBag },
                    { id: 'chat', label: t.nav.chat, icon: MessageSquare },
                    { id: 'account', label: t.nav.account, icon: User },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        navigateTo(item.id as any);
                        setIsMenuOpen(false);
                      }}
                      className={`flex items-center gap-4 p-4 rounded-2xl transition-all ${
                        currentView === item.id ? 'bg-botanik-orange text-white' : 'text-white/60 hover:bg-white/5'
                      }`}
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="font-bold">{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xs uppercase tracking-[0.2em] text-white/40 mb-6 font-bold">
                  {lang === 'fr' ? 'Sommaire' : lang === 'en' ? 'Summary' : 'Inhalt'}
                </h3>
                <ul className="space-y-6">
                  <li>
                    <button 
                      onClick={() => { 
                        navigateTo('home'); 
                        setIsMenuOpen(false);
                        setTimeout(() => document.getElementById('protocole')?.scrollIntoView({ behavior: 'smooth' }), 300);
                      }} 
                      className="text-white hover:text-botanik-orange transition-colors text-left font-light"
                    >
                      I. {lang === 'fr' ? 'Commencer ici' : lang === 'en' ? 'Start here' : 'Hier beginnen'}
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => { 
                        navigateTo('home'); 
                        setIsMenuOpen(false);
                        setTimeout(() => document.getElementById('comprendre-infusion-botanique')?.scrollIntoView({ behavior: 'smooth' }), 300);
                      }} 
                      className="text-white hover:text-botanik-orange transition-colors text-left font-light"
                    >
                      II. {t.home.understandingInfusion.sidebar_label.split('. ')[1]}
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => { 
                        navigateTo('home'); 
                        setIsMenuOpen(false);
                        setTimeout(() => document.getElementById('science')?.scrollIntoView({ behavior: 'smooth' }), 300);
                      }} 
                      className="text-white hover:text-botanik-orange transition-colors text-left font-light"
                    >
                      III. {lang === 'fr' ? 'La science du Totum' : lang === 'en' ? 'The science of Totum' : 'Die Wissenschaft des Totum'}
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => { 
                        navigateTo('home'); 
                        setIsMenuOpen(false);
                        setTimeout(() => document.getElementById('another-way')?.scrollIntoView({ behavior: 'smooth' }), 300);
                      }} 
                      className="text-white hover:text-botanik-orange transition-colors text-left font-light"
                    >
                      IV. {lang === 'fr' ? 'Une autre voie' : lang === 'en' ? 'Another way' : 'Ein anderer Weg'}
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => { 
                        navigateTo('home'); 
                        setIsMenuOpen(false);
                        setTimeout(() => document.getElementById('find-way')?.scrollIntoView({ behavior: 'smooth' }), 300);
                      }} 
                      className="text-white hover:text-botanik-orange transition-colors text-left font-light"
                    >
                      V. {lang === 'fr' ? 'Trouver votre voie' : lang === 'en' ? 'Find your way' : 'Finden Sie Ihren Weg'}
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => { 
                        navigateTo('home'); 
                        setIsMenuOpen(false);
                        setTimeout(() => document.getElementById('activate')?.scrollIntoView({ behavior: 'smooth' }), 300);
                      }} 
                      className="text-white hover:text-botanik-orange transition-colors text-left font-light"
                    >
                      VI. {lang === 'fr' ? 'Activer ma BloomLab' : lang === 'en' ? 'Activate my BloomLab' : 'Meine BloomLab aktivieren'}
                    </button>
                  </li>
                </ul>
              </div>
            </div>

            <div className="p-8 border-t border-white/10">
              <LanguageSelector lang={lang} setLang={setLang} variant="sidebar" />
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 w-full lg:max-w-[calc(100vw-20rem)] flex flex-col min-h-screen overflow-x-hidden">
        <div className="flex-1 w-full">
          <MobileHeader />
          <Suspense fallback={<ViewLoader />}>
            {renderMainContent()}
          </Suspense>
        </div>
        <Footer onNavigate={navigateTo} lang={lang} />
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-botanik-green/5 px-4 pt-4 pb-8 flex justify-between items-center z-50 shadow-[0_-4px_20px_rgba(27,48,34,0.05)]">
        {[
          { id: 'home', label: t.nav.guide, icon: FlaskConical },
          { id: 'library-landing', label: t.nav.herbarium, icon: Leaf },
          { id: 'blog', label: t.nav.blog, icon: BookOpen, url: 'https://blog.bloombybotanik.com/' },
          { id: 'chat', label: t.nav.chat, icon: MessageSquare },
          { id: 'boutique', label: t.nav.shop, icon: ShoppingBag },
          { id: 'account', label: t.nav.account, icon: User }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              if (tab.url) {
                window.open(tab.url, '_blank');
              } else {
                navigateTo(tab.id as any);
              }
            }}
            className={`flex flex-col items-center gap-1 min-w-[50px] transition-all ${currentView === tab.id || (tab.id === 'library-landing' && currentView === 'herbier') ? 'text-botanik-orange scale-110' : 'text-botanik-green/40'}`}
          >
            <tab.icon className={`w-5 h-5 ${currentView === tab.id ? 'fill-botanik-orange/10' : ''}`} />
            <span className="text-[9px] uppercase font-bold tracking-wider">{tab.label}</span>
          </button>
        ))}
        <div className="flex gap-1 border-l border-botanik-green/10 pl-3 ml-1">
          <LanguageSelector lang={lang} setLang={setLang} variant="mobile-bottom" />
        </div>
      </nav>
    </div>
  );
}

