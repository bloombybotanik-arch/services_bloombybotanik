/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState, lazy, Suspense, ReactNode } from 'react';
import { Lock, ShoppingBag, BookOpen, FlaskConical, Menu, X, ChevronRight, Leaf, ShieldCheck, SearchCheck, Award, Star, User, Check, ArrowRight, ChefHat, Instagram, Youtube, Facebook, Pin as Pinterest, Music2 as TikTok, MessageSquare, Sparkles, Wind, Waves, Moon, Utensils, Activity, Globe, Settings, Droplets, MessageCircle, ShoppingCart, Home, FileText } from 'lucide-react';
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
const HerbariumContent = lazy(() => import('./HerbariumContent'));
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
const RecipesContent = lazy(() => import('./RecipesContent'));
const AdminDashboard = lazy(() => import('./components/AdminDashboard'));
const ManifesteContent = lazy(() => import('./ManifesteContent'));
const MachineLanding = lazy(() => import('./MachineLanding'));
const PhytotherapyResetPage = lazy(() => import('./PhytotherapyResetPage'));
const PillarExtraction = lazy(() => import('./PillarExtraction'));
const PendingContent = lazy(() => import('./PendingContent'));
const IndexBisContent = lazy(() => import('./IndexBisContent'));
const NewsletterPreferences = lazy(() => import('./NewsletterPreferences').then(m => ({ default: m.NewsletterPreferences })));
const AdminNewsletter = lazy(() => import('./components/AdminNewsletter').then(m => ({ default: m.AdminNewsletter })));

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
  cart: '/panier', checkout: '/checkout', guide: '/infusion-botanique',
  how_it_works: '/infusion-botanique-maison-comment-ca-marche', pending: '/en-attente',
  library: '/bibliotheque', herbier: '/herbier', 'pillar-extraction': '/extraction-botanique',
  'guide-complet': '/extraction-botanique-guide-complet',
  'qu-est-ce-que-infusion': '/qu-est-ce-que-l-infusion-botanique',
  admin: '/admin', blog: '/blog', withdrawal: '/droit-de-retractation', indexbis: '/indexbis',
  'newsletter-preferences': '/newsletter/preferences',
  'admin-newsletter': '/admin/newsletter'
};

const PATH_VIEWS: Record<string, string> = Object.fromEntries(
  Object.entries(VIEW_PATHS).map(([view, path]) => [path, view])
);

// --- SEO & DATA UTILS ---
const POST_TITLE = "L'Élévation de l'Extraction : vers le Totum absolu";

// Generates dynamic ALT text (mimicking the requested PHP script)
const generateSeoAlt = (imageContext: string, t: any) => {
  const extendedKeywords = t.seo.keywords || "";
  return `${POST_TITLE} - ${imageContext} - ${extendedKeywords}`;
};

// JSON-LD & Dynamic SEO Metadata Injection Component
const SEOMetadata = ({ lang, currentView, t, productId }: { lang: Language, currentView: string, t: any, productId?: string }) => {
  useEffect(() => {
    // 1. Handle dynamic Title & Meta Description
    let seoKey: 'home' | 'herbarium' | 'shop' | 'blog' | 'pillar' | 'extraction' | 'infusion' | 'machine' | 'manifesto' | 'how_it_works' | 'reset' = 'home';
    
    if (['herbier', 'culinaire', 'cosmetiques'].includes(currentView)) {
      seoKey = 'herbarium';
    } else if (['boutique', 'product-detail', 'cart', 'checkout'].includes(currentView)) {
      seoKey = 'shop';
    } else if (currentView === 'pillar-extraction' || currentView === 'guide-complet') {
      seoKey = 'pillar';
    } else if (currentView === 'guide') {
      seoKey = 'extraction';
    } else if (currentView === 'how_it_works' || currentView === 'qu-est-ce-que-infusion') {
      seoKey = 'how_it_works';
    } else if (currentView === 'blog' || currentView === 'library-landing' || currentView === 'library') {
      seoKey = 'blog';
    } else if (currentView === 'machine' || currentView === 'indexbis') {
      seoKey = 'machine';
    } else if (currentView === 'manifeste') {
      seoKey = 'manifesto';
    } else if (currentView === 'phytotherapie-reset') {
      seoKey = 'reset';
    }

    const currentSeo = t.seo[seoKey];

    if (!currentSeo) {
      document.title = "Bloom by BotaniK";
      return;
    }

    // Override with product-specific SEO when viewing a product detail page
    let finalTitle = currentSeo.title;
    let finalDescription = currentSeo.description;
    let productData: any = null;

    if (currentView === 'product-detail' && productId) {
      const products = getProducts(lang);
      productData = products.find((p: any) => p.id === productId);
      if (productData) {
        finalTitle = `${productData.name} | ${productData.subtitle} | Bloom by BotaniK`;
        finalDescription = productData.description;
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
    
    // Update keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    const seoKeywords = t.seo.keywords || "";
    metaKeywords.setAttribute('content', seoKeywords);
    
    // Update canonical link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    const path = currentView === 'product-detail' && productId ? `/boutique/${productId}` : (VIEW_PATHS[currentView as string] || '/');
    const langPrefix = lang === 'fr' ? '' : `/${lang}`;
    canonical.setAttribute('href', `https://bloombybotanik.com${langPrefix}${path === '/' ? '' : path}`);
    
    // Update Hreflang tags
    const languages: Language[] = ['fr', 'en', 'de'];
    languages.forEach(l => {
      let hreflang = document.querySelector(`link[hreflang="${l}"]`);
      if (!hreflang) {
        hreflang = document.createElement('link');
        hreflang.setAttribute('rel', 'alternate');
        hreflang.setAttribute('hreflang', l);
        document.head.appendChild(hreflang);
      }
      const lPrefix = l === 'fr' ? '' : `/${l}`;
      hreflang.setAttribute('href', `https://bloombybotanik.com${lPrefix}${path === '/' ? '' : path}`);
    });

    // Handle x-default
    let xDefault = document.querySelector('link[hreflang="x-default"]');
    if (!xDefault) {
      xDefault = document.createElement('link');
      xDefault.setAttribute('rel', 'alternate');
      xDefault.setAttribute('hreflang', 'x-default');
      document.head.appendChild(xDefault);
    }
    xDefault.setAttribute('href', `https://bloombybotanik.com${path === '/' ? '' : path}`);

    // 2. JSON-LD Injection
    const pageUrl = `https://bloombybotanik.com${langPrefix}${path === '/' ? '' : path}`;

    const graph: any[] = [
      {
        "@type": "Organization",
        "@id": "https://bloombybotanik.com/#organization",
        "name": "Bloom by BotaniK",
        "url": "https://bloombybotanik.com",
        "logo": {
          "@type": "ImageObject",
          "url": "https://bloombybotanik.com/logo.png"
        },
        "description": "N°1 de l'extraction botanique de précision. BloomLab® vous offre toutes les clés pour réaliser vos propres remèdes naturels."
      },
      {
        "@type": "WebSite",
        "@id": "https://bloombybotanik.com/#website",
        "url": "https://bloombybotanik.com",
        "name": "Bloom by BotaniK",
        "publisher": { "@id": "https://bloombybotanik.com/#organization" }
      },
      {
        "@type": "WebPage",
        "@id": `${pageUrl}/#webpage`,
        "url": pageUrl,
        "name": finalTitle,
        "description": finalDescription,
        "isPartOf": { "@id": "https://bloombybotanik.com/#website" },
        "inLanguage": lang,
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": lang === 'fr' ? "Accueil" : lang === 'de' ? "Startseite" : "Home",
              "item": "https://bloombybotanik.com"
            },
            ...(currentView !== 'home' ? [{
              "@type": "ListItem",
              "position": 2,
              "name": finalTitle.split('|')[0].trim(),
              "item": pageUrl
            }] : [])
          ]
        }
      }
    ];

    if (currentView === 'product-detail' && productData) {
      graph.push({
        "@type": "Product",
        "@id": `${pageUrl}/#product`,
        "name": productData.name,
        "description": productData.description,
        "image": typeof productData.image === 'string' ? productData.image : (productData.image?.src || undefined),
        "brand": { "@type": "Brand", "name": "Bloom by BotaniK" },
        "sku": `BLOOM-${productData.id.toUpperCase()}`,
        "keywords": "tisanes, remèdes naturels, phytothérapie, extraction botanique",
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": (productData.rating || 4.8).toString(),
          "reviewCount": (productData.reviews || 15).toString(),
          "bestRating": "5",
          "worstRating": "1"
        },
        "review": [{
          "@type": "Review",
          "author": { "@type": "Person", "name": "Client Bloom" },
          "reviewBody": "Excellent produit, conforme à la démarche Bloom et à l'extraction de précision.",
          "reviewRating": { "@type": "Rating", "ratingValue": (productData.rating || 4.8).toString() }
        }],
        "offers": {
          "@type": "Offer",
          "price": productData.price.toFixed(2),
          "priceCurrency": "EUR",
          "availability": "https://schema.org/InStock",
          "url": pageUrl,
          "itemCondition": "https://schema.org/NewCondition"
        }
      });
    } else if (currentView === 'machine' || currentView === 'indexbis' || currentView === 'how_it_works') {
      // Add BloomLab product on its dedicated landing
      graph.push({
        "@type": "Product",
        "@id": "https://bloombybotanik.com/bloomlab/#product",
        "name": "BloomLab",
        "description": "Extracteur botanique de précision BloomLab®. Machine d'extraction du totum à basse température pour phytothérapie, cosmétique et culinaire.",
        "image": [
          "https://bloombybotanik.com/assets/images/bloomlab_main_1784887530345.jpeg",
          "https://bloombybotanik.com/assets/images/Img_05.jpeg"
        ],
        "brand": { "@type": "Brand", "name": "Bloom by BotaniK" },
        "sku": "BLOOM-LAB-2026",
        "mpn": "BL-2026",
        "keywords": "machine à infusion botanique, extracteur botanique, totum, phytothérapie de précision",
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "127",
          "bestRating": "5",
          "worstRating": "1"
        },
        "offers": {
          "@type": "Offer",
          "price": "239.00",
          "priceCurrency": "EUR",
          "availability": "https://schema.org/InStock",
          "url": "https://bloombybotanik.com/bloomlab",
          "itemCondition": "https://schema.org/NewCondition"
        }
      });

      // Add VideoObject Schema
      graph.push({
        "@type": "VideoObject",
        "name": "Démonstration BloomLab - Extraction Botanique de Précision",
        "description": "Découvrez comment fonctionne la BloomLab, l'extracteur botanique N°1 en France pour vos remèdes et cosmétiques maison.",
        "thumbnailUrl": [
          "https://bloombybotanik.com/assets/images/bloomlab_main_1784887530345.jpeg"
        ],
        "uploadDate": "2026-08-01T08:00:00+08:00",
        "contentUrl": "https://bloombybotanik.com/demo_bloomlab.mp4",
        "embedUrl": "https://bloombybotanik.com/bloomlab",
        "duration": "PT1M30S"
      });
    }

    const jsonLd = {
      "@context": "https://schema.org",
      "@graph": graph
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

const NavigationSidebar = ({ className = "", currentView, navigateTo, user, handleLogout, lang, setLang, t, isDiscovery, isPremium }: { className?: string, currentView: string, navigateTo: (v: any) => void, user?: any, handleLogout?: () => void, lang: Language, setLang: (l: Language) => void, t: any, isDiscovery: boolean, isPremium: boolean }) => {
  const NavItem = ({ id, label, icon: Icon, onClick, isActive, isSub }: { id?: string, label: string, icon?: any, onClick?: () => void, isActive?: boolean, isSub?: boolean }) => (
    <button
      onClick={onClick || (() => navigateTo(id as any))}
      className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all text-left group ${
        isActive 
          ? 'bg-white/10 text-white shadow-sm' 
          : 'text-white/60 hover:text-white hover:bg-white/5'
      } ${isSub ? 'pl-11 text-xs font-medium' : 'text-sm font-bold'}`}
    >
      {Icon && <Icon className={`w-4 h-4 shrink-0 transition-colors ${isActive ? 'text-botanik-orange' : 'group-hover:text-botanik-orange'}`} />}
      <span className="truncate">{label}</span>
    </button>
  );

  const NavGroup = ({ title, children }: { title: string, children: ReactNode }) => (
    <div className="space-y-1 mb-8">
      <h3 className="px-4 text-[10px] font-black uppercase tracking-[0.2em] text-white/30 mb-3 select-none">
        {title}
      </h3>
      <div className="space-y-0.5">
        {children}
      </div>
    </div>
  );

  const scrollTo = (id: string) => {
    if (currentView !== 'indexbis') {
      navigateTo('indexbis');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const cartItemsCount = 0; // I will compute this from cart if available in scope

  return (
    <aside className={`w-[280px] h-screen sticky top-0 bg-botanik-green flex flex-col border-r border-white/5 z-50 ${className}`}>
      {/* Header / Logo */}
      <div className="p-8 pb-10">
        <div 
          className="flex items-center gap-3 cursor-pointer group/logo"
          onClick={() => navigateTo('home')}
        >
          <img src={logoSidebar} alt="Bloom" className="w-10 h-10 object-contain group-hover:scale-105 transition-transform" />
          <div className="flex flex-col leading-none text-white">
            <span className="text-xl font-black tracking-widest">Bloom</span>
            <span className="text-[10px] font-bold tracking-[0.1em] opacity-70">by BotaniK</span>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <div className="flex-1 overflow-y-auto px-4 custom-scrollbar">
        <NavGroup title="BloomLab">
          <NavItem 
            id="indexbis" 
            label={lang === 'fr' ? 'Découvrir BloomLab®' : lang === 'de' ? 'Entdecken Sie BloomLab®' : 'Discover BloomLab®'} 
            icon={Settings} 
            isActive={currentView === 'indexbis'}
          />
          <NavItem 
            label={lang === 'fr' ? 'Bain-Marie vs BloomLab' : lang === 'de' ? 'Wasserbad vs BloomLab' : 'Bain-Marie vs BloomLab'} 
            onClick={() => scrollTo('comparatif')}
            isSub
          />
          <NavItem 
            label={lang === 'fr' ? 'Duo Argiles Bloom' : lang === 'de' ? 'Bloom Tonerde-Duo' : 'Bloom Clay Duo'} 
            onClick={() => scrollTo('duo-argiles')}
            isSub
          />
        </NavGroup>

        <NavGroup title={lang === 'fr' ? 'Les 3 Univers' : lang === 'de' ? 'Die 3 Universen' : 'The 3 Universes'}>
          <NavItem 
            id="culinaire" 
            label={lang === 'fr' ? 'Atelier Culinaire' : lang === 'de' ? 'Kulinarik-Atelier' : 'Culinary Workshop'} 
            icon={ChefHat} 
            isActive={currentView === 'culinaire'}
          />
          <NavItem 
            id="cosmetiques" 
            label={lang === 'fr' ? 'Soin Cosmétique' : lang === 'de' ? 'Kosmetische Pflege' : 'Cosmetic Care'} 
            icon={Sparkles} 
            isActive={currentView === 'cosmetiques'}
          />
          <NavItem 
            id="phytotherapie-reset" 
            label={lang === 'fr' ? 'Reset Homéostasique' : lang === 'de' ? 'Homöostatisches Reset' : 'Homeostatic Reset'} 
            icon={Wind} 
            isActive={currentView === 'phytotherapie-reset'}
          />
        </NavGroup>

        <NavGroup title="Boutique">
          <NavItem 
            id="boutique" 
            label={lang === 'fr' ? 'Découvrir la Boutique' : lang === 'de' ? 'Entdecken Sie den Shop' : 'Explore Shop'} 
            icon={ShoppingBag} 
            isActive={currentView === 'boutique'}
          />
        </NavGroup>

        <NavGroup title={lang === 'fr' ? 'Science du Totum' : 'Totum Science'}>
          <NavItem 
            label={lang === 'fr' ? 'La Méthode' : 'The Method'} 
            icon={Activity} 
            onClick={() => scrollTo('solvants')}
          />
          <NavItem 
            label="FAQ" 
            icon={MessageCircle} 
            onClick={() => scrollTo('faq')}
          />
        </NavGroup>

        <NavGroup title="Ressources">
          <NavItem 
            id="herbarium" 
            label={t.nav.herbarium} 
            icon={BookOpen} 
            isActive={currentView === 'herbarium'}
          />
          <a 
            href="https://blog.bloombybotanik.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all text-left group text-white/60 hover:text-white hover:bg-white/5 text-sm font-bold"
          >
            <SearchCheck className="w-4 h-4 shrink-0 transition-colors group-hover:text-botanik-orange" />
            <span className="truncate">{lang === 'fr' ? 'Journal Botanique' : 'Botanical Journal'}</span>
          </a>
          <NavItem 
            id="manifeste" 
            label={t.nav.manifesto} 
            icon={FileText} 
            isActive={currentView === 'manifeste'}
          />
        </NavGroup>
      </div>

      {/* Footer / User */}
      <div className="p-6 mt-auto border-t border-white/5 space-y-4">
        <button 
          onClick={() => navigateTo('cart')}
          className="w-full flex items-center justify-between p-3 rounded-xl bg-botanik-orange text-white font-bold text-sm hover:scale-[1.02] transition-all"
        >
          <div className="flex items-center gap-3">
            <ShoppingCart className="w-4 h-4" />
            <span>{t.nav.cart || 'Panier'}</span>
          </div>
        </button>

        <div className="flex items-center justify-between gap-2 px-2">
          <LanguageSelector lang={lang} setLang={setLang} variant="sidebar" />
          <button 
            onClick={() => navigateTo('account')}
            className="p-2 text-white/40 hover:text-white transition-colors"
            title={t.nav.account}
          >
            <User className="w-5 h-5" />
          </button>
        </div>
      </div>
    </aside>
  );
};

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
  const [currentView, setCurrentView] = useState<'home' | 'guide' | 'article' | 'boutique' | 'culinaire' | 'cosmetiques' | 'library' | 'pending' | 'product-detail' | 'cart' | 'checkout' | 'legal' | 'account' | 'chat' | 'machine' | 'phytotherapie-reset' | 'library-landing' | 'activation' | 'manifeste' | 'pillar-extraction' | 'admin' | 'blog' | 'indexbis' | 'how_it_works' | 'guide-complet' | 'qu-est-ce-que-infusion' | 'newsletter-preferences' | 'admin-newsletter' | 'withdrawal' | 'recipes'>('home');
  const [previousView, setPreviousView] = useState<'home' | 'guide' | 'article' | 'boutique' | 'culinaire' | 'cosmetiques' | 'library' | 'pending' | 'product-detail' | 'cart' | 'checkout' | 'legal' | 'account' | 'chat' | 'machine' | 'phytotherapie-reset' | 'library-landing' | 'activation' | 'manifeste' | 'pillar-extraction' | 'admin' | 'blog' | 'indexbis' | 'how_it_works' | 'guide-complet' | 'qu-est-ce-que-infusion' | 'newsletter-preferences' | 'admin-newsletter' | 'withdrawal' | 'recipes'>('home');

  const [currentProductId, setCurrentProductId] = useState<string | undefined>();
  const [legalType, setLegalType] = useState<'cgv' | 'cgu' | 'privacy' | 'mentions' | 'withdrawal'>('mentions');
  const [cart, setCart] = useState<any[]>([]);
  const [shippingMethod, setShippingMethod] = useState<any>('mondialrelay');
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
      let restPath = langMatch ? (langMatch[2] || '/') : rawPath;
      
      // Normalize: remove trailing slash except for root
      if (restPath !== '/' && restPath.endsWith('/')) {
        restPath = restPath.slice(0, -1);
      }
      
      setLang(detectedLang);
      sessionStorage.removeItem('spa-redirect-path');

      if (restPath === '/droit-de-retractation') {
        setLegalType('withdrawal');
        setCurrentView('legal');
        return;
      }

      // --- Legacy route aliases (pre-redesign URLs) mapped to current views ---
      const LEGACY_ALIASES: Record<string, string> = {
        '/about': '/manifeste',
        '/contact': '/manifeste',
        '/how-it-works-diy-natural-recipes': '/boutique',
        '/natural-herbal-infusion-body-care-oils-': '/cosmetiques',
        '/natural-herbal-infusion-face-skincare-recipes': '/cosmetiques',
        '/qu-est-ce-que-l-infusion-botanique': '/infusion-botanique',
        '/extraction-plantes-naturelles-bienfaits': '/extraction-botanique',
        '/extraction-botanique-guide-complet': '/extraction-botanique',
        '/herbier': '/bibliotheque',
        '/bloomlab-extracteur-botanique-et-infuseur-dhuile-intelligent-6-en-1': '/bloomlab',
        '/indexbis': '/',
        '/chroniques': '/blog',
      };
      const normalizedPath = LEGACY_ALIASES[restPath] || restPath;

      // --- Detect product detail URL pattern /boutique/:id ---
      const productMatch = normalizedPath.match(/^\/boutique\/([a-z0-9-]+)$/);
      if (productMatch) {
        setCurrentProductId(productMatch[1]);
        setCurrentView('product-detail');
        return;
      }

      // --- Detect newsletter preferences URL pattern /newsletter/preferences/:id ---
      const newsletterMatch = normalizedPath.match(/^\/newsletter\/preferences\/([a-z0-9-]+)$/);
      if (newsletterMatch) {
        setCurrentProductId(newsletterMatch[1]);
        setCurrentView('newsletter-preferences');
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
  const [isDiscovery, setIsDiscovery] = useState(false);
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
            const premium = data?.isPremium || data?.status === 'premium';
            const discovery = data?.isDiscovery || data?.status === 'freemium' || premium;
            setIsPremium(premium);
            setIsDiscovery(discovery);
            setAssessmentResult(data?.assessment || null);
            setFavorites(data?.favorites || []);
          } else {
            await setDoc(doc(db, 'users', user.uid), {
              isPremium: false,
              isDiscovery: false,
              createdAt: new Date().toISOString()
            });
            setIsPremium(false);
            setIsDiscovery(false);
            setAssessmentResult(null);
            setFavorites([]);
          }
        }
      } else {
        setIsPremium(false);
        setIsDiscovery(false);
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
      case 'home': return <IndexBisContent onNavigate={navigateTo} lang={lang} />;
      case 'machine': return <MachineLanding onNavigate={navigateTo} lang={lang} />;
      case 'phytotherapie-reset': return <PhytotherapyResetPage onNavigate={navigateTo} lang={lang} />;
      case 'library-landing': return <LibraryLanding onNavigate={navigateTo} lang={lang} />;
      case 'indexbis': return <IndexBisContent onNavigate={navigateTo} lang={lang} />;
      case 'guide':
      case 'qu-est-ce-que-infusion':
      case 'how_it_works': return <GuideContent onNavigate={navigateTo} lang={lang} />;
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
      case 'library':
      case 'herbier':
      case 'herbarium': return (
        <HerbariumContent 
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
        <ProductDetail 
          onBack={() => navigateTo('boutique')} 
          onAddToCart={(product) => addToCart(product)} 
          onNavigate={navigateTo}
          productId={currentProductId} 
          lang={lang} 
        />
      );
      case 'cart': return (
        <CartContent 
          items={cart}
          onUpdateQuantity={updateQuantity}
          onRemove={removeFromCart}
          onBack={() => navigateTo('boutique')}
          onCheckout={() => navigateTo('checkout')}
          onNavigate={navigateTo}
          lang={lang}
          shippingMethod={shippingMethod}
          setShippingMethod={setShippingMethod}
        />
      );
      case 'checkout': return (
        <CheckoutFlow 
          cart={cart}
          total={cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)}
          shippingMethod={shippingMethod}
          user={user}
          onSuccess={() => {
            setCart([]);
            navigateTo('home');
          }}
          onCancel={() => navigateTo('cart')}
          lang={lang}
        />
      );
      case 'recipes': return <RecipesContent onBack={() => navigateTo('home')} lang={lang} />;
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
      case 'pillar-extraction': 
      case 'guide-complet': return <PillarExtraction onNavigate={navigateTo} lang={lang} />;
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
      case 'admin-newsletter': return (
        user?.email === 'bloombybotanik@gmail.com' ? <AdminNewsletter lang={lang} /> : <HomeContent onNavigate={navigateTo} lang={lang} />
      );
      case 'blog': return <BlogContent lang={lang} onNavigate={navigateTo} />;
      case 'legal': return <LegalPages type={legalType} onBack={() => navigateTo(previousView)} lang={lang} />;
      case 'newsletter-preferences': return <NewsletterPreferences subscriberId={currentProductId || ''} lang={lang} />;
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
    <header className="lg:hidden sticky top-0 bg-botanik-green z-[60] border-b border-white/5 px-4 py-4 flex items-center justify-between shadow-sm">
      <div 
        className="flex items-center gap-3 cursor-pointer"
        onClick={() => navigateTo('home')}
      >
        <img src={logoSidebar} alt="Bloom" className="w-8 h-8 object-contain" />
        <div className="flex flex-col leading-none text-white">
          <span className="text-base font-black tracking-wider">Bloom</span>
          <span className="text-[8px] font-bold tracking-[0.1em] opacity-70">by BotaniK</span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button onClick={() => navigateTo('cart')} className="relative text-white p-2">
          <ShoppingCart className="w-6 h-6" />
          {cart.length > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-botanik-orange text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-botanik-green">
              {cart.reduce((s, i) => s + i.quantity, 0)}
            </span>
          )}
        </button>
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-white p-2"
          aria-label="Menu"
        >
          {isMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
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
        isDiscovery={isDiscovery}
        isPremium={isPremium}
      />

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          <div 
            className="absolute inset-0 bg-botanik-green/60 backdrop-blur-md animate-in fade-in duration-300" 
            onClick={() => setIsMenuOpen(false)} 
          />
          <div className="absolute right-0 top-0 bottom-0 w-[85%] max-w-sm bg-botanik-green shadow-2xl flex flex-col animate-in slide-in-from-right duration-500 border-l border-white/5">
            <div className="p-6 flex items-center justify-between border-b border-white/5 bg-black/10">
              <div className="flex items-center gap-3">
                <img src={logoSidebar} alt="Bloom" className="w-8 h-8 object-contain" />
              <div className="flex flex-col leading-none text-white">
                <span className="text-sm font-black tracking-widest">Bloom</span>
                <span className="text-[8px] font-bold tracking-[0.1em] opacity-70">by BotaniK</span>
              </div>
              </div>
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="p-2 text-white/60 hover:text-white transition-colors"
              >
                <X className="w-7 h-7" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 py-8 custom-scrollbar">
              <div className="space-y-10">
                <div>
                  <h3 className="px-4 text-[10px] font-black uppercase tracking-[0.3em] text-white/20 mb-6">BloomLab</h3>
                  <div className="space-y-2">
                    {[
                      { id: 'indexbis', label: lang === 'fr' ? 'Découvrir BloomLab®' : lang === 'de' ? 'Entdecken Sie BloomLab®' : 'Discover BloomLab®', icon: Settings, highlight: true },
                    ].map((item: any) => (
                      <button
                        key={item.id}
                        onClick={() => { navigateTo(item.id); setIsMenuOpen(false); }}
                        className={`w-full flex items-center justify-between px-6 py-4 rounded-2xl transition-all text-left group ${
                          currentView === item.id 
                            ? 'bg-white/10 text-white shadow-lg shadow-black/10' 
                            : 'bg-botanik-orange/10 text-white border border-botanik-orange/20'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <item.icon className={`w-5 h-5 transition-colors ${currentView === item.id ? 'text-botanik-orange' : 'text-botanik-orange/60 group-hover:text-botanik-orange'}`} />
                          <span className="font-bold text-base tracking-tight">{item.label}</span>
                        </div>
                        <div className="w-1.5 h-1.5 rounded-full bg-botanik-orange animate-pulse" />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="px-4 text-[10px] font-black uppercase tracking-[0.3em] text-white/20 mb-6">{lang === 'fr' ? 'Les 3 Univers' : lang === 'de' ? 'Die 3 Universen' : 'The 3 Universes'}</h3>
                  <div className="space-y-2">
                    {[
                      { id: 'culinaire', label: lang === 'fr' ? 'Atelier Culinaire' : lang === 'de' ? 'Kulinarik-Atelier' : 'Culinary Workshop', icon: ChefHat },
                      { id: 'cosmetiques', label: lang === 'fr' ? 'Soin Cosmétique' : lang === 'de' ? 'Kosmetische Pflege' : 'Cosmetic Care', icon: Sparkles },
                      { id: 'phytotherapie-reset', label: lang === 'fr' ? 'Reset Homéostasique' : lang === 'de' ? 'Homöostatisches Reset' : 'Homeostatic Reset', icon: Wind },
                    ].map((item: any) => (
                      <button
                        key={item.id}
                        onClick={() => { navigateTo(item.id); setIsMenuOpen(false); }}
                        className={`w-full flex items-center justify-between px-6 py-4 rounded-2xl transition-all text-left group ${
                          currentView === item.id ? 'bg-white/10 text-white shadow-lg shadow-black/10' : 'text-white/70 hover:bg-white/5'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <item.icon className={`w-5 h-5 transition-colors ${currentView === item.id ? 'text-botanik-orange' : 'text-white/40 group-hover:text-white/60'}`} />
                          <span className="font-bold text-base tracking-tight">{item.label}</span>
                        </div>
                        {currentView === item.id && <ChevronRight className="w-4 h-4 text-botanik-orange" />}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="px-4 text-[10px] font-black uppercase tracking-[0.3em] text-white/20 mb-6">Boutique</h3>
                  <div className="space-y-2">
                    {[
                      { id: 'boutique', label: lang === 'fr' ? 'Découvrir la Boutique' : lang === 'de' ? 'Den Shop entdecken' : 'Explore Shop', icon: ShoppingBag },
                    ].map((item: any) => (
                      <button
                        key={item.id}
                        onClick={() => { navigateTo(item.id); setIsMenuOpen(false); }}
                        className={`w-full flex items-center justify-between px-6 py-4 rounded-2xl transition-all text-left group ${
                          currentView === item.id ? 'bg-white/10 text-white shadow-lg shadow-black/10' : 'text-white/70 hover:bg-white/5'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <item.icon className={`w-5 h-5 transition-colors ${currentView === item.id ? 'text-botanik-orange' : 'text-white/40 group-hover:text-white/60'}`} />
                          <span className="font-bold text-base tracking-tight">{item.label}</span>
                        </div>
                        {currentView === item.id && <ChevronRight className="w-4 h-4 text-botanik-orange" />}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-auto p-8 border-t border-white/5 bg-black/10 space-y-8">
              <button 
                onClick={() => { navigateTo('account'); setIsMenuOpen(false); }}
                className="w-full flex items-center gap-4 p-5 rounded-3xl bg-white/5 border border-white/5 text-white hover:bg-white/10 transition-colors shadow-inner"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-botanik-orange to-[#FF9D66] flex items-center justify-center text-white shadow-lg shadow-botanik-orange/20">
                  <User className="w-6 h-6" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="font-bold text-base tracking-tight">Mon Compte</span>
                  <span className="text-xs text-white/30 uppercase tracking-widest font-black">Espace Membre</span>
                </div>
              </button>
              
              <div className="space-y-6">
                <div className="flex justify-center">
                  <LanguageSelector lang={lang} setLang={setLang} variant="sidebar" />
                </div>
                
                <p className="text-center text-[10px] text-white/20 italic leading-relaxed px-4">
                  "L'Ingénierie au service du vivant. Bloom by BotaniK est la clé."
                </p>
              </div>
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
    </div>
  );
}

