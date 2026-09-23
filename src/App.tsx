/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState, useMemo } from 'react';
import {
  Lock,
  ShoppingBag,
  BookOpen,
  FlaskConical,
  Menu,
  X,
  ChevronRight,
  Leaf,
  ShieldCheck,
  Award,
  Star,
  User,
  Check,
  ArrowRight,
  Sparkles,
  Utensils,
  Droplets,
  MessageCircle,
  Home,
  FileText,
  Newspaper,
  HelpCircle,
  Package,
  Calculator
} from 'lucide-react';
import { translations, Language } from './translations';
import Footer from './components/Footer';
import { AuthModal } from './components/AuthModal';
import { PremiumModal } from './components/PremiumModal';
import { auth, db } from './lib/firebase';
import { onAuthStateChanged, User as FirebaseUser, signOut } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import { CookieBanner } from './components/CookieBanner';
import { FloatingChat } from './components/FloatingChat';
import { LanguageSelector } from './components/LanguageSelector';
import { View, VIEW_PATHS } from './types';
import { BloomLogo } from './components/ui/BloomLogo';
import { NavigationSidebar } from './components/NavigationSidebar';
import { ShippingMethod } from './lib/shippingUtils';

import HomeContent from './HomeContent';
import HerbariumContent from './HerbariumContent';
import StoreContent from './StoreContent';
import GuideContent from './GuideContent';
import CartContent from './CartContent';
import CheckoutFlow from './CheckoutFlow';
import ProductDetail from './ProductDetail';
import CulinarySection from './CulinarySection';
import CosmeticsContent from './CosmeticsContent';
import LibraryLanding from './LibraryLanding';
import ActivationPage from './ActivationPage';
import LegalPages from './LegalPages';
import ChatContent from './ChatContent';
import AccountContent from './AccountContent';
import RecipesContent from './RecipesContent';
import AdminDashboard from './components/AdminDashboard';
import ManifesteContent from './ManifesteContent';
import MachineLanding from './MachineLanding';
import PhytotherapyResetPage from './PhytotherapyResetPage';
import PillarExtraction from './PillarExtraction';
import PillarInfusion from './PillarInfusion';
import PillarOil from './PillarOil';
import PillarAdaptogens from './PillarAdaptogens';
import PendingContent from './PendingContent';
import IndexBisContent from './IndexBisContent';
import * as SEOArticlesExports from './SEOArticlesContent';
import { NewsletterPreferences } from './NewsletterPreferences';
import { AdminNewsletter } from './components/AdminNewsletter';
import BlogContent from './BlogContent';
import FaqContent from './FaqContent';
import ContactContent from './ContactContent';
import ArticlesContent from './ArticlesContent';
import PremiumInfoContent from './PremiumInfoContent';
import LexiqueContent from './LexiqueContent';
import TerrainPillar from './TerrainPillar';
import ExtractionCalculator from './components/ExtractionCalculator';
import ProtocolePsoriasisContent from './ProtocolePsoriasisContent';
import ProtocoleSiboContent from './ProtocoleSiboContent';
import { updateDocumentSEO } from './utils/seoManager';

const PATH_VIEWS: Record<string, View> = {
  ...Object.fromEntries(
    Object.entries(VIEW_PATHS).flatMap(([view, path]) => {
      const withSlash = path.endsWith('/') ? path : `${path}/`;
      const withoutSlash = path.endsWith('/') ? path.slice(0, -1) : path;
      return [
        [path, view as View],
        [withSlash, view as View],
        [withoutSlash, view as View]
      ];
    })
  ),
  '/': 'indexbis',
  '/bloomlab': 'machine',
  '/bloomlab/': 'machine',
  '/boutique/kits': 'boutique-kits',
  '/boutique/kits/': 'boutique-kits',
  '/totum-vegetal': 'totum-vegetal',
  '/totum-vegetal/': 'totum-vegetal',
  '/abonnement': 'abonnement',
  '/abonnement/': 'abonnement',
  '/infusion-botanique-maison-comment-ca-marche': 'infusion-botanique',
  '/infusion-botanique-maison-comment-ca-marche/': 'infusion-botanique',
  '/lexique': 'lexique',
  '/lexique/': 'lexique',
  '/boutique/bloomlab': 'product-detail',
  '/boutique/bloomlab/': 'product-detail',
  '/boutique/bundle-apothicaire': 'product-detail',
  '/boutique/bundle-apothicaire/': 'product-detail',
  '/boutique/pack-signature': 'product-detail',
  '/boutique/pack-signature/': 'product-detail',
  '/boutique/kit-starter': 'product-detail',
  '/boutique/kit-starter/': 'product-detail',
  '/boutique/kit-nuit': 'product-detail',
  '/boutique/kit-nuit/': 'product-detail',
  '/boutique/kit-digestion': 'product-detail',
  '/boutique/kit-digestion/': 'product-detail',
  '/boutique/kit-articulaire': 'product-detail',
  '/boutique/kit-articulaire/': 'product-detail',
  '/boutique/kit-hiver': 'product-detail',
  '/boutique/kit-hiver/': 'product-detail',
  '/boutique/duo-argiles': 'product-detail',
  '/boutique/duo-argiles/': 'product-detail',
  '/phytotherapie-reset/protocole-psoriasis': 'protocole-psoriasis',
  '/phytotherapie-reset/protocole-psoriasis/': 'protocole-psoriasis',
  '/phytotherapie-reset/protocole-sibo': 'protocole-sibo',
  '/phytotherapie-reset/protocole-sibo/': 'protocole-sibo',
  '/protocoles-systemiques/protocole-sibo': 'protocole-sibo',
  '/protocoles-systemiques/protocole-sibo/': 'protocole-sibo',
};

const SEOArticles = ({ view, lang, t, onNavigate }: { view: string; lang: Language; t: any; onNavigate?: (view: any, param?: string) => void }) => {
  if (view === 'infusion-precision') return <SEOArticlesExports.InfusionPrecision lang={lang} t={t} onNavigate={onNavigate} />;
  if (view === 'totum-definition' || view === 'totum-vegetal') return <SEOArticlesExports.TotumDefinition lang={lang} t={t} onNavigate={onNavigate} />;
  if (view === 'solvants-extraction' || view === 'teinture-mere') return <SEOArticlesExports.SolvantsExtraction lang={lang} t={t} onNavigate={onNavigate} />;
  return null;
};

const CertificationCarousel = () => {
  const items = [
    { title: "Verre Borosilicate 3.3 Neutre", desc: "Zéro lixiviation, inertie totale aux solvants polaires" },
    { title: "Inox 316L Chirurgical", desc: "Grade pharmaceutique, résistant aux acides et alcools" },
    { title: "Thermo-Régulation 40-100°C", desc: "Précision ±1°C, préservation des composés thermolabiles" },
    { title: "Circulation Dynamique Active", desc: "Flux vortex continu, gradient d'extraction optimal" },
    { title: "Standard Totum BOTANIK", desc: "Spectre moléculaire complet non dénaturé" },
  ];
  return (
    <div className="w-full bg-[#1A2621] py-2.5 overflow-hidden border-b border-white/5">
      <div className="flex animate-marquee whitespace-nowrap gap-12 text-[11px] uppercase tracking-widest text-[#E8DCC4]/70 font-mono">
        {items.concat(items).map((item, idx) => (
          <div key={idx} className="inline-flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></span>
            <span className="font-bold text-[#FAF8F5]">{item.title}</span>
            <span className="text-[#E8DCC4]/50">— {item.desc}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function App() {
  const [currentView, setCurrentView] = useState<View>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      if (path === '/boutique/kits' || path === '/boutique/kits/') {
        return 'boutique-kits';
      }
      if (path === '/bloomlab' || path === '/bloomlab/') {
        return 'machine';
      }
      if (path.startsWith('/boutique/') && path !== '/boutique/' && path !== '/boutique') {
        return 'product-detail';
      }
      if (path.startsWith('/produit/') && path !== '/produit/' && path !== '/produit') {
        return 'product-detail';
      }
      if (path.startsWith('/articles/') && path !== '/articles/' && path !== '/articles') {
        return 'articles';
      }
      if (path.startsWith('/blog/') && path !== '/blog/' && path !== '/blog') {
        return 'blog';
      }
      if (PATH_VIEWS[path]) {
        return PATH_VIEWS[path];
      }
      const params = new URLSearchParams(window.location.search);
      const viewParam = params.get('view');
      if (viewParam && viewParam in VIEW_PATHS) {
        return viewParam as View;
      }
    }
    return 'indexbis';
  });

  const [selectedLanguage, setSelectedLanguage] = useState<Language>('fr');
  const [selectedProduct, setSelectedProduct] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      if (path.startsWith('/boutique/') && path !== '/boutique/' && path !== '/boutique' && path !== '/boutique/kits/' && path !== '/boutique/kits') {
        return path.replace(/^\/boutique\//, '').replace(/\/$/, '');
      }
      if (path.startsWith('/produit/') && path !== '/produit/' && path !== '/produit') {
        return path.replace(/^\/produit\//, '').replace(/\/$/, '');
      }
    }
    return 'bloomlab';
  });
  const [selectedSlug, setSelectedSlug] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      if (path.startsWith('/articles/') && path !== '/articles/' && path !== '/articles') {
        return path.replace(/^\/articles\//, '').replace(/\/$/, '');
      }
      if (path.startsWith('/blog/') && path !== '/blog/' && path !== '/blog') {
        return path.replace(/^\/blog\//, '').replace(/\/$/, '');
      }
    }
    return '';
  });
  const [selectedTerrain, setSelectedTerrain] = useState<string>('T1');
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isPremiumOpen, setIsPremiumOpen] = useState(false);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [shippingMethod, setShippingMethod] = useState<ShippingMethod>('colissimo');
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const [savedAssessment, setSavedAssessment] = useState<any>(null);

  // Cart state
  const [cart, setCart] = useState<any[]>(() => {
    try {
      const saved = localStorage.getItem('bloom-cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Auth and Subscription observer
  useEffect(() => {
    let unsubscribeDoc: (() => void) | null = null;

    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (unsubscribeDoc) {
        unsubscribeDoc();
        unsubscribeDoc = null;
      }
      if (currentUser) {
        const userRef = doc(db, 'users', currentUser.uid);
        unsubscribeDoc = onSnapshot(
          userRef,
          (snap) => {
            if (snap.exists()) {
              const data = snap.data();
              const hasPaid = Boolean(data?.isPremium) && (!data?.isPremiumUntil || new Date(data.isPremiumUntil).getTime() > Date.now());
              setIsSubscribed(hasPaid);
            } else {
              setIsSubscribed(false);
            }
          },
          () => {
            setIsSubscribed(false);
          }
        );
      } else {
        setIsSubscribed(false);
      }
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeDoc) unsubscribeDoc();
    };
  }, []);

  // History sync
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path === '/boutique/kits' || path === '/boutique/kits/') {
        setCurrentView('boutique-kits');
        return;
      }
      if (path === '/bloomlab' || path === '/bloomlab/') {
        setCurrentView('machine');
        return;
      }
      if (path.startsWith('/boutique/') && path !== '/boutique/' && path !== '/boutique') {
        const prod = path.replace(/^\/boutique\//, '').replace(/\/$/, '');
        setSelectedProduct(prod);
        setCurrentView('product-detail');
        return;
      }
      if (path.startsWith('/produit/') && path !== '/produit/' && path !== '/produit') {
        const prod = path.replace(/^\/produit\//, '').replace(/\/$/, '');
        setSelectedProduct(prod);
        setCurrentView('product-detail');
        return;
      }
      if (path.startsWith('/articles/') && path !== '/articles/' && path !== '/articles') {
        const slug = path.replace(/^\/articles\//, '').replace(/\/$/, '');
        setSelectedSlug(slug);
        setCurrentView('articles');
        return;
      }
      if (path.startsWith('/blog/') && path !== '/blog/' && path !== '/blog') {
        const slug = path.replace(/^\/blog\//, '').replace(/\/$/, '');
        setSelectedSlug(slug);
        setCurrentView('blog');
        return;
      }
      const view = PATH_VIEWS[path] || 'indexbis';
      setCurrentView(view);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Synchronize document SEO, Meta, Canonical & Hreflang
  useEffect(() => {
    updateDocumentSEO(currentView, selectedLanguage, selectedProduct, selectedSlug);
  }, [currentView, selectedLanguage, selectedProduct, selectedSlug]);

  // Scroll to top on view change
  const navigateTo = (view: View, param?: string) => {
    setCurrentView(view);
    setMobileMenuOpen(false);
    if (param) {
      if (view === 'product-detail') setSelectedProduct(param);
      if (view === 'blog' || view === 'articles') setSelectedSlug(param);
      if (view === 'terrain') setSelectedTerrain(param);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const targetPath = view === 'product-detail' && param 
      ? `/boutique/${param}/` 
      : (VIEW_PATHS[view] || '/');
    if (window.location.pathname !== targetPath) {
      window.history.pushState({ view, param }, '', targetPath);
    }
  };

  const addToCart = (product: any, quantity: number = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      let updated;
      if (existing) {
        updated = prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      } else {
        updated = [...prev, { ...product, quantity }];
      }
      try {
        localStorage.setItem('bloom-cart', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const updateCartQuantity = (id: string, delta: number) => {
    setCart((prev) => {
      const updated = prev
        .map((item) => {
          if (item.id === id) {
            const q = item.quantity + delta;
            return q > 0 ? { ...item, quantity: q } : null;
          }
          return item;
        })
        .filter(Boolean);
      try {
        localStorage.setItem('bloom-cart', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      try {
        localStorage.setItem('bloom-cart', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const cartCount = useMemo(() => {
    return cart.reduce((total, item) => total + (item.quantity || 1), 0);
  }, [cart]);

  const cartTotal = useMemo(() => {
    return cart.reduce((total, item) => total + (item.price || 0) * (item.quantity || 1), 0);
  }, [cart]);

  const t = translations[selectedLanguage] || translations.fr;

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1B3022] flex font-sans selection:bg-botanik-green selection:text-white w-full max-w-full overflow-x-hidden relative">
      {/* 1. Left Persistent Sidebar (Desktop + Tablet >= 768px) */}
      <NavigationSidebar
        currentView={currentView}
        onNavigate={navigateTo}
        lang={selectedLanguage}
        setLang={setSelectedLanguage}
        cartCount={cartCount}
        user={user}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenCalculator={() => setIsCalculatorOpen(true)}
      />

      {/* 2. Main Content Wrapper offset by 280px on md+ */}
      <div className="flex-1 flex flex-col min-w-0 w-full max-w-full overflow-x-hidden md:pl-[280px]">
        {/* Top Navigation Bar: Mobile Only (< 768px) */}
        <header className="md:hidden sticky top-0 z-30 bg-[#0F261E] border-b border-white/10 transition-colors shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
            {/* Left side: Brand Logo */}
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                navigateTo('indexbis');
              }}
              className="flex items-center gap-2.5 text-left focus:outline-none group cursor-pointer shrink-0"
              id="brand-logo-btn"
              aria-label="Bloom by BotaniK - Accueil"
            >
              <BloomLogo variant="header" theme="dark" className="text-[#FAF7F2] group-hover:text-[#D97706] transition-colors" />
              <div className="flex flex-col leading-tight uppercase text-[#FAF7F2] group-hover:text-[#D97706] transition-colors">
                <span className="text-[9px] font-bold tracking-[0.22em] text-[#FAF7F2]/75">Bloom by</span>
                <span className="text-base font-black tracking-widest text-[#FAF7F2]">BotaniK</span>
              </div>
            </a>

            {/* Right side: Actions & Utilities */}
            <div className="flex items-center gap-2">
              <LanguageSelector
                lang={selectedLanguage}
                setLang={setSelectedLanguage}
                variant="mobile-header"
              />

              {user ? (
                <button
                  onClick={() => navigateTo('account')}
                  className="p-2 text-[#FAF7F2]/85 hover:text-white hover:bg-white/10 rounded-full transition-colors relative"
                  title="Mon Compte"
                  id="mobile-account-btn"
                >
                  <User className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={() => setIsAuthOpen(true)}
                  className="p-2 text-[#FAF7F2]/85 hover:text-white hover:bg-white/10 rounded-full transition-colors relative"
                  title="Connexion"
                  id="mobile-login-btn"
                >
                  <User className="w-4 h-4 text-[#FAF7F2]" />
                </button>
              )}

              {/* Shopping Cart Button */}
              <button
                onClick={() => navigateTo('cart')}
                className="relative p-2 bg-[#1C3F34] text-[#FAF7F2] hover:bg-[#254F42] border border-white/15 rounded-full transition-colors flex items-center justify-center shadow-xs"
                title="Panier"
                id="mobile-cart-btn"
              >
                <ShoppingBag className="w-4 h-4 text-[#FAF7F2]" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#D97706] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-[#0F261E]">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Mobile Menu Hamburger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-[#FAF7F2] hover:bg-white/10 rounded-xl transition-colors"
                aria-label="Menu"
                id="mobile-menu-toggle"
              >
                {mobileMenuOpen ? <X className="w-6 h-6 text-[#FAF7F2]" /> : <Menu className="w-6 h-6 text-[#FAF7F2]" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation Drawer */}
          {mobileMenuOpen && (() => {
            const m = {
              accueil: selectedLanguage === 'fr' ? 'Accueil' : selectedLanguage === 'de' ? 'Startseite' : 'Home',
              manifeste: selectedLanguage === 'fr' ? 'Le Manifeste' : selectedLanguage === 'de' ? 'Das Manifest' : 'The Manifesto',
              infusion_botanique: selectedLanguage === 'fr' ? 'Infusion Botanique Maison' : selectedLanguage === 'de' ? 'Botanische Hausinfusion' : 'Home Botanical Infusion',
              bloomlab: selectedLanguage === 'fr' ? "L'Extracteur BloomLab®" : selectedLanguage === 'de' ? 'BloomLab® Extraktor' : 'BloomLab® Extractor',
              guide_extraction: selectedLanguage === 'fr' ? "Guide de l'extraction" : selectedLanguage === 'de' ? 'Extraktions-Leitfaden' : 'Extraction Guide',
              totum_vegetal: selectedLanguage === 'fr' ? 'Le Totum Végétal' : selectedLanguage === 'de' ? 'Das Pflanzen-Totum' : 'The Plant Totum',
              phytotherapie: selectedLanguage === 'fr' ? 'Protocoles Systémiques' : selectedLanguage === 'de' ? 'Systemische Protokolle' : 'Systemic Protocols',
              boutique_toute: selectedLanguage === 'fr' ? 'Toute la Boutique' : selectedLanguage === 'de' ? 'Alle Produkte' : 'All Products',
              kits_plantes: selectedLanguage === 'fr' ? 'Kits de plantes' : selectedLanguage === 'de' ? 'Pflanzen-Kits' : 'Plant Kits',
              abonnement: selectedLanguage === 'fr' ? 'Abonnement Premium' : selectedLanguage === 'de' ? 'Premium-Abonnement' : 'Premium Subscription',
              herbier: selectedLanguage === 'fr' ? "L'Herbier" : selectedLanguage === 'de' ? 'Das Herbarium' : 'The Herbarium',
              culinaire: selectedLanguage === 'fr' ? 'Atelier Culinaire' : selectedLanguage === 'de' ? 'Kulinarische Werkstatt' : 'Culinary Workshop',
              cosmetiques: selectedLanguage === 'fr' ? 'Cosmétique Botanique' : selectedLanguage === 'de' ? 'Botanische Kosmetik' : 'Botanical Cosmetics',
              bibliotheque: selectedLanguage === 'fr' ? 'Bibliothèque Scientifique' : selectedLanguage === 'de' ? 'Wissenschaftliche Bibliothek' : 'Scientific Library',
              calculatrice: selectedLanguage === 'fr' ? 'Calculatrice de Dilution' : selectedLanguage === 'de' ? 'Verdünnungsrechner' : 'Dilution Calculator',
              espace_membre: selectedLanguage === 'fr' ? 'Espace membre' : selectedLanguage === 'de' ? 'Mitgliederbereich' : 'Member Area',
              faq: selectedLanguage === 'fr' ? 'Questions Fréquentes' : selectedLanguage === 'de' ? 'Häufige Fragen' : 'FAQ',
              contact: selectedLanguage === 'fr' ? 'Nous Contacter' : selectedLanguage === 'de' ? 'Kontakt' : 'Contact Us',
              mon_compte: selectedLanguage === 'fr' ? 'Mon Compte' : selectedLanguage === 'de' ? 'Mein Konto' : 'My Account',
              se_connecter: selectedLanguage === 'fr' ? 'Se connecter' : selectedLanguage === 'de' ? 'Anmelden' : 'Login',
              panier: selectedLanguage === 'fr' ? 'Panier' : selectedLanguage === 'de' ? 'Warenkorb' : 'Cart',
            };
            return (
              <div className="bg-[#0F261E] border-b border-white/10 px-6 py-5 animate-in slide-in-from-top-4 duration-300">
                <div className="flex flex-col space-y-2">
                  <button
                    onClick={() => { navigateTo('indexbis'); setMobileMenuOpen(false); }}
                    className="flex items-center gap-3 px-3 py-2 rounded-xl text-[#FAF7F2] font-medium hover:bg-white/10 text-left text-sm"
                  >
                    <Home className="w-4 h-4 text-[#FAF7F2]/70" /> {m.accueil}
                  </button>
                  <button
                    onClick={() => { navigateTo('manifeste'); setMobileMenuOpen(false); }}
                    className="flex items-center gap-3 px-3 py-2 rounded-xl text-[#FAF7F2] font-medium hover:bg-white/10 text-left text-sm"
                  >
                    <BookOpen className="w-4 h-4 text-[#FAF7F2]/70" /> {m.manifeste}
                  </button>
                  <a
                    href="https://bloombybotanik.com/infusion-botanique-maison-comment-ca-marche/"
                    onClick={(e) => {
                      if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                        e.preventDefault();
                        navigateTo('infusion-botanique');
                        setMobileMenuOpen(false);
                      }
                    }}
                    className="flex items-center gap-3 px-3 py-2 rounded-xl text-[#FAF7F2] font-medium hover:bg-white/10 text-left text-sm"
                  >
                    <FlaskConical className="w-4 h-4 text-[#FAF7F2]/70" /> {m.infusion_botanique}
                  </a>
                  <a
                    href="https://bloombybotanik.com/boutique/bloomlab/"
                    onClick={(e) => {
                      if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                        e.preventDefault();
                        navigateTo('product-detail', 'bloomlab');
                        setMobileMenuOpen(false);
                      }
                    }}
                    className="flex items-center gap-3 px-3 py-2 rounded-xl text-[#FAF7F2] font-medium hover:bg-white/10 text-left text-sm"
                  >
                    <Sparkles className="w-4 h-4 text-[#FAF7F2]/70" /> {m.bloomlab}
                  </a>
                  <button
                    onClick={() => { navigateTo('guide-complet'); setMobileMenuOpen(false); }}
                    className="flex items-center gap-3 px-3 py-2 rounded-xl text-[#FAF7F2] font-medium hover:bg-white/10 text-left text-sm"
                  >
                    <BookOpen className="w-4 h-4 text-[#FAF7F2]/70" /> {m.guide_extraction}
                  </button>
                  <button
                    onClick={() => { navigateTo('totum-vegetal'); setMobileMenuOpen(false); }}
                    className="flex items-center gap-3 px-3 py-2 rounded-xl text-[#FAF7F2] font-medium hover:bg-white/10 text-left text-sm"
                  >
                    <Leaf className="w-4 h-4 text-[#FAF7F2]/70" /> {m.totum_vegetal}
                  </button>
                  <button
                    onClick={() => { navigateTo('phytotherapie-reset'); setMobileMenuOpen(false); }}
                    className="flex items-center gap-3 px-3 py-2 rounded-xl text-[#FAF7F2] font-medium hover:bg-white/10 text-left text-sm"
                  >
                    <Leaf className="w-4 h-4 text-[#FAF7F2]/70" /> {m.phytotherapie}
                  </button>
                  <button
                    onClick={() => { navigateTo('boutique'); setMobileMenuOpen(false); }}
                    className="flex items-center gap-3 px-3 py-2 rounded-xl text-[#FAF7F2] font-medium hover:bg-white/10 text-left text-sm"
                  >
                    <ShoppingBag className="w-4 h-4 text-[#FAF7F2]/70" /> {m.boutique_toute}
                  </button>
                  <button
                    onClick={() => { navigateTo('boutique-kits'); setMobileMenuOpen(false); }}
                    className="flex items-center gap-3 px-3 py-2 rounded-xl text-[#FAF7F2] font-medium hover:bg-white/10 text-left text-sm"
                  >
                    <Package className="w-4 h-4 text-[#FAF7F2]/70" /> {m.kits_plantes}
                  </button>
                  <a
                    href="https://bloombybotanik.com/abonnement/"
                    onClick={(e) => {
                      if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                        e.preventDefault();
                        navigateTo('abonnement');
                        setMobileMenuOpen(false);
                      }
                    }}
                    className="flex items-center gap-3 px-3 py-2 rounded-xl text-[#FAF7F2] font-medium hover:bg-white/10 text-left text-sm"
                  >
                    <Star className="w-4 h-4 text-[#D97706]" /> {m.abonnement}
                  </a>
                  <a
                    href="https://bloombybotanik.com/herbier/"
                    onClick={(e) => {
                      if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                        e.preventDefault();
                        navigateTo('herbier');
                        setMobileMenuOpen(false);
                      }
                    }}
                    className="flex items-center gap-3 px-3 py-2 rounded-xl text-[#FAF7F2] font-medium hover:bg-white/10 text-left text-sm"
                  >
                    <BookOpen className="w-4 h-4 text-[#FAF7F2]/70" /> {m.herbier}
                  </a>
                  <button
                    onClick={() => { navigateTo('culinaire'); setMobileMenuOpen(false); }}
                    className="flex items-center gap-3 px-3 py-2 rounded-xl text-[#FAF7F2] font-medium hover:bg-white/10 text-left text-sm"
                  >
                    <Utensils className="w-4 h-4 text-[#FAF7F2]/70" /> {m.culinaire}
                  </button>
                  <button
                    onClick={() => { navigateTo('cosmetiques'); setMobileMenuOpen(false); }}
                    className="flex items-center gap-3 px-3 py-2 rounded-xl text-[#FAF7F2] font-medium hover:bg-white/10 text-left text-sm"
                  >
                    <Droplets className="w-4 h-4 text-[#FAF7F2]/70" /> {m.cosmetiques}
                  </button>
                  <a
                    href="https://bloombybotanik.com/bibliotheque/"
                    onClick={(e) => {
                      if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                        e.preventDefault();
                        navigateTo('library-landing');
                        setMobileMenuOpen(false);
                      }
                    }}
                    className="flex items-center gap-3 px-3 py-2 rounded-xl text-[#FAF7F2] font-medium hover:bg-white/10 text-left text-sm"
                  >
                    <Newspaper className="w-4 h-4 text-[#FAF7F2]/70" /> {m.bibliotheque}
                  </a>
                  <button
                    onClick={() => { setIsCalculatorOpen(true); setMobileMenuOpen(false); }}
                    className="flex items-center gap-3 px-3 py-2 rounded-xl text-[#FAF7F2] font-medium hover:bg-white/10 text-left text-sm"
                  >
                    <Calculator className="w-4 h-4 text-[#D97706]" /> {m.calculatrice}
                  </button>
                  <button
                    onClick={() => { navigateTo('account'); setMobileMenuOpen(false); }}
                    className="flex items-center gap-3 px-3 py-2 rounded-xl text-[#FAF7F2] font-medium hover:bg-white/10 text-left text-sm"
                  >
                    <User className="w-4 h-4 text-[#FAF7F2]/70" /> {m.espace_membre}
                  </button>
                  <button
                    onClick={() => { navigateTo('faq'); setMobileMenuOpen(false); }}
                    className="flex items-center gap-3 px-3 py-2 rounded-xl text-[#FAF7F2] font-medium hover:bg-white/10 text-left text-sm"
                  >
                    <HelpCircle className="w-4 h-4 text-[#FAF7F2]/70" /> {m.faq}
                  </button>
                  <button
                    onClick={() => { navigateTo('contact'); setMobileMenuOpen(false); }}
                    className="flex items-center gap-3 px-3 py-2 rounded-xl text-[#FAF7F2] font-medium hover:bg-white/10 text-left text-sm"
                  >
                    <MessageCircle className="w-4 h-4 text-[#FAF7F2]/70" /> {m.contact}
                  </button>

                  <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                    {user ? (
                      <button
                        onClick={() => { navigateTo('account'); setMobileMenuOpen(false); }}
                        className="flex items-center gap-2 text-sm font-medium text-[#FAF7F2] hover:text-white"
                      >
                        <User className="w-4 h-4 text-[#FAF7F2]" /> {m.mon_compte}
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setMobileMenuOpen(false);
                          setIsAuthOpen(true);
                        }}
                        className="flex items-center gap-2 text-sm font-medium text-[#FAF7F2] hover:text-white"
                      >
                        <User className="w-4 h-4 text-[#FAF7F2]" /> {m.se_connecter}
                      </button>
                    )}
                    <button
                      onClick={() => { navigateTo('cart'); setMobileMenuOpen(false); }}
                      className="flex items-center gap-2 text-sm font-medium text-[#FAF7F2] hover:text-white"
                    >
                      <ShoppingBag className="w-4 h-4 text-[#FAF7F2]" /> {m.panier} ({cartCount})
                    </button>
                  </div>
                </div>
              </div>
            );
          })()}
        </header>

      {/* 3. Main Content Router */}
      <main className="flex-1 w-full">
        {currentView === 'home' || currentView === 'indexbis' ? (
          <IndexBisContent onNavigate={navigateTo} lang={selectedLanguage} />
        ) : currentView === 'machine' ? (
          <MachineLanding onNavigate={navigateTo} lang={selectedLanguage} />
        ) : currentView === 'protocole-psoriasis' ? (
          <ProtocolePsoriasisContent
            isPremium={isSubscribed}
            onNavigate={navigateTo}
            onRequireAuth={() => setIsAuthOpen(true)}
            lang={selectedLanguage}
          />
        ) : currentView === 'protocole-sibo' ? (
          <ProtocoleSiboContent
            isPremium={isSubscribed}
            onNavigate={navigateTo}
            onRequireAuth={() => setIsAuthOpen(true)}
            lang={selectedLanguage}
          />
        ) : currentView === 'phytotherapie-reset' || currentView === 'votre-pratique' || currentView === 'parcours' ? (
          <PhytotherapyResetPage
            onNavigate={navigateTo}
            lang={selectedLanguage}
            isPremium={false}
            user={user}
            onRequireAuth={() => setIsAuthOpen(true)}
          />
        ) : currentView === 'boutique' || currentView === 'boutique-kits' || currentView === 'kits-botaniques' ? (
          <StoreContent
            currentView={currentView}
            onNavigate={navigateTo}
            onAddToCart={addToCart}
            lang={selectedLanguage}
          />
        ) : currentView === 'product-detail' ? (
          <ProductDetail
            productId={selectedProduct}
            onBack={() => navigateTo('boutique')}
            onNavigate={navigateTo}
            onAddToCart={addToCart}
            lang={selectedLanguage}
          />
        ) : currentView === 'culinaire' || currentView === 'gastronomie-botanique' ? (
          <CulinarySection
            onNavigate={navigateTo}
            lang={selectedLanguage}
            onRequirePremium={() => setIsPremiumOpen(true)}
          />
        ) : currentView === 'cosmetiques' || currentView === 'cosmetique-botanique' ? (
          <CosmeticsContent
            onNavigate={navigateTo}
            lang={selectedLanguage}
            onRequirePremium={() => setIsPremiumOpen(true)}
          />
        ) : currentView === 'herbier' || currentView === 'library' || currentView === 'herbarium' ? (
          <HerbariumContent
            onNavigate={navigateTo}
            lang={selectedLanguage}
            isPremium={isSubscribed}
            onRequirePremium={() => {
              if (!user) {
                setIsAuthOpen(true);
              } else {
                navigateTo('abonnement');
              }
            }}
          />
        ) : currentView === 'library-landing' ? (
          <LibraryLanding onNavigate={navigateTo} lang={selectedLanguage} />
        ) : currentView === 'recettes' || currentView === 'recettes-gratuites' ? (
          <RecipesContent
            onBack={() => navigateTo('indexbis')}
            lang={selectedLanguage}
            t={t}
          />
        ) : currentView === 'cart' ? (
          <CartContent
            items={cart}
            onUpdateQuantity={updateCartQuantity}
            onRemove={removeFromCart}
            onBack={() => navigateTo('boutique')}
            onCheckout={() => navigateTo('checkout')}
            onNavigate={navigateTo}
            lang={selectedLanguage}
            shippingMethod={shippingMethod}
            setShippingMethod={setShippingMethod}
          />
        ) : currentView === 'checkout' ? (
          <CheckoutFlow
            cart={cart}
            total={cartTotal}
            shippingMethod={shippingMethod}
            user={user}
            onSuccess={() => {
              setCart([]);
              localStorage.removeItem('bloom-cart');
              navigateTo('account');
            }}
            onCancel={() => navigateTo('cart')}
            lang={selectedLanguage}
          />
        ) : currentView === 'manifeste' || currentView === 'la-marque' ? (
          <ManifesteContent
            onBack={() => navigateTo('indexbis')}
            onNavigate={navigateTo}
            lang={selectedLanguage}
          />
        ) : currentView === 'activation' || currentView === 'activate-bloomlab' ? (
          <ActivationPage
            userId={user?.uid || null}
            onSuccess={() => navigateTo('account')}
            lang={selectedLanguage}
            onRequireAuth={() => setIsAuthOpen(true)}
          />
        ) : currentView === 'account' ? (
          <AccountContent
            user={user}
            onNavigate={navigateTo}
            lang={selectedLanguage}
            onLogout={() => signOut(auth)}
          />
        ) : currentView === 'chat' ? (
          <ChatContent
            isPremium={false}
            onNavigate={navigateTo}
            user={user || undefined}
            onRequireAuth={() => setIsAuthOpen(true)}
            onSaveAssessment={(results) => setSavedAssessment(results)}
            savedAssessment={savedAssessment}
            onResetAssessment={() => setSavedAssessment(null)}
            lang={selectedLanguage}
          />
        ) : currentView === 'blog' ? (
          <BlogContent
            lang={selectedLanguage}
            onNavigate={navigateTo}
            initialSlug={selectedSlug}
          />
        ) : currentView === 'articles' ? (
          <ArticlesContent
            lang={selectedLanguage}
            onNavigate={navigateTo}
            initialSlug={selectedSlug}
          />
        ) : currentView === 'faq' || currentView === 'questions-frequentes' ? (
          <FaqContent onNavigate={navigateTo} lang={selectedLanguage} />
        ) : currentView === 'contact' ? (
          <ContactContent onNavigate={navigateTo} lang={selectedLanguage} />
        ) : currentView === 'lexique' ? (
          <LexiqueContent onNavigate={navigateTo} lang={selectedLanguage} />
        ) : currentView === 'abonnement' || currentView === 'premium-info' ? (
          <PremiumInfoContent
            onNavigate={navigateTo}
            onAddToCart={addToCart}
            lang={selectedLanguage}
          />
        ) : currentView === 'pillar-extraction' || currentView === 'extraction-botanique' || currentView === 'guide-complet' ? (
          <PillarExtraction lang={selectedLanguage} onNavigate={navigateTo} />
        ) : currentView === 'guide' || currentView === 'how_it_works' || currentView === 'comment-ca-marche' || currentView === 'infuseur-botanique' ? (
          <GuideContent onNavigate={navigateTo} lang={selectedLanguage} />
        ) : currentView === 'terrain' ? (
          <TerrainPillar
            terrainId={selectedTerrain}
            lang={selectedLanguage}
            onNavigate={navigateTo}
          />
        ) : currentView === 'hormese' || currentView === 'infusion-botanique' || currentView === 'infusion-botanique-maison-comment-ca-marche' ? (
          <PillarInfusion lang={selectedLanguage} onNavigate={navigateTo} />
        ) : currentView === 'huile-infusee' ? (
          <PillarOil lang={selectedLanguage} onNavigate={navigateTo} />
        ) : currentView === 'plantes-adaptogenes' ? (
          <PillarAdaptogens lang={selectedLanguage} onNavigate={navigateTo} />
        ) : currentView === 'pending' ? (
          <PendingContent onBack={() => navigateTo('indexbis')} lang={selectedLanguage} />
        ) : currentView === 'admin' ? (
          <AdminDashboard lang={selectedLanguage} />
        ) : currentView === 'newsletter-preferences' ? (
          <NewsletterPreferences
            subscriberId={user?.uid || 'guest'}
            lang={selectedLanguage}
          />
        ) : currentView === 'admin-newsletter' ? (
          <AdminNewsletter lang={selectedLanguage} />
        ) : currentView === 'legal' || currentView === 'cgv' || currentView === 'cgu' || currentView === 'privacy' || currentView === 'mentions' || currentView === 'returns' || currentView === 'withdrawal' ? (
          <LegalPages
            type={
              currentView === 'cgv'
                ? 'cgv'
                : currentView === 'privacy'
                ? 'privacy'
                : currentView === 'withdrawal' || currentView === 'returns'
                ? 'withdrawal'
                : currentView === 'mentions'
                ? 'mentions'
                : currentView === 'cgu'
                ? 'cgu'
                : 'terms'
            }
            onBack={() => navigateTo('indexbis')}
            lang={selectedLanguage}
          />
        ) : (
          <SEOArticles view={currentView} lang={selectedLanguage} t={t} onNavigate={navigateTo} />
        )}
      </main>

      {/* 4. Global Footer */}
      <Footer onNavigate={navigateTo} lang={selectedLanguage} />
      </div>

      {/* 5. Floating Interactive Elements & Modals */}
      <FloatingChat user={user} lang={selectedLanguage} />
      <CookieBanner lang={selectedLanguage} />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onSuccess={() => setIsAuthOpen(false)}
      />

      <PremiumModal
        isOpen={isPremiumOpen}
        onClose={() => setIsPremiumOpen(false)}
        onUpgrade={() => {
          setIsPremiumOpen(false);
          navigateTo('abonnement');
        }}
      />

      {/* Extraction Calculator Modal */}
      {isCalculatorOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setIsCalculatorOpen(false)}
        >
          <div 
            className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <ExtractionCalculator onClose={() => setIsCalculatorOpen(false)} isModal />
          </div>
        </div>
      )}
    </div>
  );
}
