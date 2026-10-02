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
  Activity,
  Home,
  FileText,
  Newspaper,
  HelpCircle,
  Package,
  Calculator,
  HeartHandshake,
  GraduationCap,
  ChevronDown,
  Layers
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
import ProtocoleMyelineContent from './ProtocoleMyelineContent';
import ProtocoleDecalcificationPinealeContent from './ProtocoleDecalcificationPinealeContent';
import BlogVieillissementMyelineContent from './BlogVieillissementMyelineContent';
import BloomAcademiePage from './BloomAcademiePage';
import Les4ArchitecturesContent from './Les4ArchitecturesContent';
import CommentLireModeleBloomContent from './CommentLireModeleBloomContent';
import NeufAxesHistoriquesContent from './NeufAxesHistoriquesContent';
import ChargeAllostatiqueContent from './ChargeAllostatiqueContent';
import MetabolismeInsulineContent from './MetabolismeInsulineContent';
import ProtocolesSystemiquesContent from './ProtocolesSystemiquesContent';
import Module0ChocParadigmeContent from './academie/Module0ChocParadigmeContent';
import AxeA1EmonctoiresContent from './academie/AxeA1EmonctoiresContent';
import PillarPagesContent from './PillarPagesContent';
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
  '/academie': 'comment-lire-modele-bloom',
  '/academie/': 'comment-lire-modele-bloom',
  '/academie/herbier': 'herbier',
  '/academie/herbier/': 'herbier',
  '/academie/bibliotheque': 'bibliotheque',
  '/academie/bibliotheque/': 'bibliotheque',
  '/remedes-naturels': 'remedes-naturels-maison-guide',
  '/remedes-naturels/': 'remedes-naturels-maison-guide',
  '/extraction-botanique': 'pillar-extraction',
  '/extraction-botanique/': 'pillar-extraction',
  '/totum-vegetal': 'totum-vegetal',
  '/totum-vegetal/': 'totum-vegetal',
  '/cosmetiques-naturels-diy': 'cosmetiques',
  '/cosmetiques-naturels-diy/': 'cosmetiques',
  '/academie/comprendre-le-corps': '4-architectures',
  '/academie/comprendre-le-corps/': '4-architectures',
  '/academie/comprendre-le-modele-bloom': 'comment-lire-modele-bloom',
  '/academie/comprendre-le-modele-bloom/': 'comment-lire-modele-bloom',
  '/comprendre-le-modele-bloom': 'comment-lire-modele-bloom',
  '/comprendre-le-modele-bloom/': 'comment-lire-modele-bloom',
  '/academie/comprendre-le-corps/comment-lire-le-modele-bloom': 'comment-lire-modele-bloom',
  '/academie/comprendre-le-corps/comment-lire-le-modele-bloom/': 'comment-lire-modele-bloom',
  '/comprendre-le-corps/comment-lire-le-modele-bloom': 'comment-lire-modele-bloom',
  '/comprendre-le-corps/comment-lire-le-modele-bloom/': 'comment-lire-modele-bloom',
  '/academie/comprendre-le-corps/4-architectures': '4-architectures',
  '/academie/comprendre-le-corps/4-architectures/': '4-architectures',
  '/comprendre-le-corps/4-architectures': '4-architectures',
  '/comprendre-le-corps/4-architectures/': '4-architectures',
  '/academie/comprendre-le-corps/7-terrains': 'terrain',
  '/academie/comprendre-le-corps/7-terrains/': 'terrain',
  '/comprendre-le-corps/7-terrains': 'terrain',
  '/comprendre-le-corps/7-terrains/': 'terrain',
  '/terrains': 'terrain',
  '/terrains/': 'terrain',
  '/academie/comprendre-le-corps/9-axes-historiques': '9-axes',
  '/academie/comprendre-le-corps/9-axes-historiques/': '9-axes',
  '/comprendre-le-corps/9-axes-historiques': '9-axes',
  '/comprendre-le-corps/9-axes-historiques/': '9-axes',
  '/academie/comprendre-le-corps/charge-allostatique': 'charge-allostatique',
  '/academie/comprendre-le-corps/charge-allostatique/': 'charge-allostatique',
  '/comprendre-le-corps/charge-allostatique': 'charge-allostatique',
  '/comprendre-le-corps/charge-allostatique/': 'charge-allostatique',
  '/academie/comprendre-le-corps/reset-homeostasique': 'phytotherapie-reset',
  '/academie/comprendre-le-corps/reset-homeostasique/': 'phytotherapie-reset',
  '/comprendre-le-corps/reset-homeostasique': 'phytotherapie-reset',
  '/comprendre-le-corps/reset-homeostasique/': 'phytotherapie-reset',
  '/academie/comprendre-le-corps/metabolisme-glucidique-insuline': 'metabolisme-insuline',
  '/academie/comprendre-le-corps/metabolisme-glucidique-insuline/': 'metabolisme-insuline',
  '/comprendre-le-corps/metabolisme-glucidique-insuline': 'metabolisme-insuline',
  '/comprendre-le-corps/metabolisme-glucidique-insuline/': 'metabolisme-insuline',
  '/protocoles': 'protocoles',
  '/protocoles/': 'protocoles',
  '/protocoles/psoriasis': 'protocole-psoriasis',
  '/protocoles/psoriasis/': 'protocole-psoriasis',
  '/protocoles/sibo': 'protocole-sibo',
  '/protocoles/sibo/': 'protocole-sibo',
  '/protocoles/clarte-mentale': 'protocole-myeline',
  '/protocoles/clarte-mentale/': 'protocole-myeline',
  '/protocoles/decalcification-pineale': 'protocole-decalcification-pineale',
  '/protocoles/decalcification-pineale/': 'protocole-decalcification-pineale',
  '/academie/protocoles': 'protocoles',
  '/academie/protocoles/': 'protocoles',
  '/academie/protocoles/psoriasis': 'protocole-psoriasis',
  '/academie/protocoles/psoriasis/': 'protocole-psoriasis',
  '/academie/protocoles/sibo': 'protocole-sibo',
  '/academie/protocoles/sibo/': 'protocole-sibo',
  '/academie/protocoles/clarte-mentale': 'protocole-myeline',
  '/academie/protocoles/clarte-mentale/': 'protocole-myeline',
  '/academie/protocoles/decalcification-pineale': 'protocole-decalcification-pineale',
  '/academie/protocoles/decalcification-pineale/': 'protocole-decalcification-pineale',
  '/bloomlab': 'machine',
  '/bloomlab/': 'machine',
  '/boutique/kits': 'boutique-kits',
  '/boutique/kits/': 'boutique-kits',
  '/abonnement': 'abonnement',
  '/abonnement/': 'abonnement',
  '/boutique/abonnements-numeriques': 'abonnement',
  '/boutique/abonnements-numeriques/': 'abonnement',
  '/abonnements-numeriques': 'abonnement',
  '/abonnements-numeriques/': 'abonnement',
  '/infusion-botanique-maison-comment-ca-marche': 'infusion-botanique',
  '/infusion-botanique-maison-comment-ca-marche/': 'infusion-botanique',
  '/lexique': 'lexique',
  '/lexique/': 'lexique',
  '/boutique/bloomlab': 'machine',
  '/boutique/bloomlab/': 'machine',
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
  '/protocoles/myeline': 'protocole-myeline',
  '/protocoles/myeline/': 'protocole-myeline',
  '/phytotherapie-reset/protocole-clarte-mentale': 'protocole-myeline',
  '/phytotherapie-reset/protocole-clarte-mentale/': 'protocole-myeline',
  '/protocoles-systemiques/protocole-myeline': 'protocole-myeline',
  '/protocoles-systemiques/protocole-myeline/': 'protocole-myeline',
  '/blog/vieillissement-myeline-fgf17': 'blog-vieillissement-myeline',
  '/blog/vieillissement-myeline-fgf17/': 'blog-vieillissement-myeline',
  '/blog/vieillissement-myeline-fgf17-clarte-mentale': 'blog-vieillissement-myeline',
  '/blog/vieillissement-myeline-fgf17-clarte-mentale/': 'blog-vieillissement-myeline',
  '/blog/le-vieillissement-n-est-pas-une-fatalite': 'blog-vieillissement-myeline',
  '/blog/le-vieillissement-n-est-pas-une-fatalite/': 'blog-vieillissement-myeline',
};

const SEOArticles = ({ view, lang, t, onNavigate, isPremium, onRequireAuth }: { view: string; lang: Language; t: any; onNavigate?: (view: any, param?: string) => void; isPremium?: boolean; onRequireAuth?: () => void }) => {
  if (view === 'infusion-precision') return <SEOArticlesExports.InfusionPrecision lang={lang} t={t} onNavigate={onNavigate} />;
  if (view === 'totum-definition' || view === 'totum-vegetal') return <SEOArticlesExports.TotumDefinition lang={lang} t={t} onNavigate={onNavigate} />;
  if (view === 'solvants-extraction' || view === 'teinture-mere') return <SEOArticlesExports.SolvantsExtraction lang={lang} t={t} onNavigate={onNavigate} isPremium={isPremium} onRequireAuth={onRequireAuth} />;
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
  const [mobileBloomAcademyOpen, setMobileBloomAcademyOpen] = useState(true);
  const [mobileComprendreCorpsOpen, setMobileComprendreCorpsOpen] = useState(true);
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
              protocole_psoriasis: selectedLanguage === 'fr' ? 'Protocole Psoriasis' : selectedLanguage === 'de' ? 'Psoriasis-Protokoll' : 'Psoriasis Protocol',
              protocole_sibo: selectedLanguage === 'fr' ? 'Protocole SIBO' : selectedLanguage === 'de' ? 'SIBO-Protokoll' : 'SIBO Protocol',
              protocole_myeline: selectedLanguage === 'fr' ? 'Protocole Clarté Mentale' : selectedLanguage === 'de' ? 'Mentale Klarheit Protokoll' : 'Mental Clarity Protocol',
              diagnostic: selectedLanguage === 'fr' ? 'Bilan & Diagnostic ALMA' : selectedLanguage === 'de' ? 'ALMA Diagnose' : 'ALMA Assessment',
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

            const sectionTitle = (title: string) => (
              <div className="text-[10px] font-black uppercase tracking-[0.25em] text-[#D97706]/90 px-3 pt-3 pb-1 border-b border-white/10 mb-1">
                {title}
              </div>
            );

            return (
              <div className="bg-[#0F261E] border-b border-white/10 px-5 py-5 max-h-[85vh] overflow-y-auto animate-in slide-in-from-top-4 duration-300">
                <div className="flex flex-col space-y-1">
                  
                  {/* SECTION: ACCUEIL */}
                  <button
                    onClick={() => { navigateTo('indexbis'); setMobileMenuOpen(false); }}
                    className="flex items-center gap-3 px-3 py-2 rounded-xl text-[#FAF7F2] font-semibold hover:bg-white/10 text-left text-sm"
                  >
                    <Home className="w-4 h-4 text-[#D97706]" /> {m.accueil}
                  </button>

                  {/* SECTION: POURQUOI BLOOM */}
                  {sectionTitle(selectedLanguage === 'fr' ? 'POURQUOI BLOOM' : selectedLanguage === 'de' ? 'WARUM BLOOM' : 'WHY BLOOM')}
                  <button
                    onClick={() => { navigateTo('la-marque'); setMobileMenuOpen(false); }}
                    className="flex items-center gap-3 px-3 py-2 rounded-xl text-[#FAF7F2] font-medium hover:bg-white/10 text-left text-sm"
                  >
                    <HeartHandshake className="w-4 h-4 text-[#FAF7F2]/70" /> Histoire &amp; Philosophie
                  </button>

                  {/* SECTION: LA MÉTHODE A/B */}
                  {sectionTitle(selectedLanguage === 'fr' ? 'LA MÉTHODE A/B' : selectedLanguage === 'de' ? 'DIE A/B METHODE' : 'THE A/B METHOD')}
                  <button
                    onClick={() => { navigateTo('infusion-botanique'); setMobileMenuOpen(false); }}
                    className="flex items-center gap-3 px-3 py-2 rounded-xl text-[#FAF7F2] font-medium hover:bg-white/10 text-left text-sm"
                  >
                    <FlaskConical className="w-4 h-4 text-[#FAF7F2]/70" /> L'infusion botanique ?
                  </button>
                  <button
                    onClick={() => { navigateTo('totum-vegetal'); setMobileMenuOpen(false); }}
                    className="flex items-center gap-3 px-3 py-2 rounded-xl text-[#FAF7F2] font-medium hover:bg-white/10 text-left text-sm"
                  >
                    <Leaf className="w-4 h-4 text-[#FAF7F2]/70" /> Le Totum Végétal
                  </button>
                  <button
                    onClick={() => { navigateTo('guide-complet'); setMobileMenuOpen(false); }}
                    className="flex items-center gap-3 px-3 py-2 rounded-xl text-[#FAF7F2] font-medium hover:bg-white/10 text-left text-sm"
                  >
                    <BookOpen className="w-4 h-4 text-[#FAF7F2]/70" /> Guide de l'extraction
                  </button>

                  {/* SECTION: VOTRE PRATIQUE */}
                  {sectionTitle(selectedLanguage === 'fr' ? 'VOTRE PRATIQUE' : selectedLanguage === 'de' ? 'IHRE PRAXIS' : 'YOUR PRACTICE')}
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
                  <button
                    onClick={() => { navigateTo('phytotherapie-reset'); setMobileMenuOpen(false); }}
                    className="flex items-center gap-3 px-3 py-2 rounded-xl text-[#FAF7F2] font-medium hover:bg-white/10 text-left text-sm"
                  >
                    <Activity className="w-4 h-4 text-[#FAF7F2]/70" /> Reset Homéostasique
                  </button>

                  {/* SECTION: BOUTIQUE */}
                  {sectionTitle(selectedLanguage === 'fr' ? 'BOUTIQUE' : selectedLanguage === 'de' ? 'SHOP' : 'STORE')}
                  <button
                    onClick={() => { navigateTo('machine'); setMobileMenuOpen(false); }}
                    className="flex items-center gap-3 px-3 py-2 rounded-xl text-[#FAF7F2] font-medium hover:bg-white/10 text-left text-sm"
                  >
                    <Sparkles className="w-4 h-4 text-[#D97706]" /> BloomLab®
                  </button>
                  <button
                    onClick={() => { navigateTo('boutique-kits'); setMobileMenuOpen(false); }}
                    className="flex items-center gap-3 px-3 py-2 rounded-xl text-[#FAF7F2] font-medium hover:bg-white/10 text-left text-sm"
                  >
                    <Package className="w-4 h-4 text-[#FAF7F2]/70" /> Packs
                  </button>
                  <button
                    onClick={() => { navigateTo('boutique'); setMobileMenuOpen(false); }}
                    className="flex items-center gap-3 px-3 py-2 rounded-xl text-[#FAF7F2] font-medium hover:bg-white/10 text-left text-sm"
                  >
                    <ShoppingBag className="w-4 h-4 text-[#FAF7F2]/70" /> Accessoires
                  </button>
                  <button
                    onClick={() => { navigateTo('product-detail', 'duo-argiles'); setMobileMenuOpen(false); }}
                    className="flex items-center gap-3 px-3 py-2 rounded-xl text-[#FAF7F2] font-medium hover:bg-white/10 text-left text-sm"
                  >
                    <Leaf className="w-4 h-4 text-[#FAF7F2]/70" /> Argiles &amp; Matières Premières
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

                  {/* SECTION: RESSOURCES */}
                  {sectionTitle(selectedLanguage === 'fr' ? 'RESSOURCES' : selectedLanguage === 'de' ? 'RESSOURCEN' : 'RESOURCES')}
                  <button
                    onClick={() => { navigateTo('herbier'); setMobileMenuOpen(false); }}
                    className="flex items-center gap-3 px-3 py-2 rounded-xl text-[#FAF7F2] font-medium hover:bg-white/10 text-left text-sm"
                  >
                    <BookOpen className="w-4 h-4 text-[#FAF7F2]/70" /> {m.herbier}
                  </button>
                  <button
                    onClick={() => { navigateTo('lexique'); setMobileMenuOpen(false); }}
                    className="flex items-center gap-3 px-3 py-2 rounded-xl text-[#FAF7F2] font-medium hover:bg-white/10 text-left text-sm"
                  >
                    <BookOpen className="w-4 h-4 text-[#FAF7F2]/70" /> {selectedLanguage === 'fr' ? 'Lexique Botanik' : selectedLanguage === 'de' ? 'Botanik-Glossar' : 'Botanik Glossary'}
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

                  {/* SECTION: BLOOM ACADEMY (MENU DÉROULANT MOBILE) */}
                  <div className="pt-2 pb-1">
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <a
                        href="/academie/"
                        onClick={(e) => {
                          if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                            e.preventDefault();
                            navigateTo('academie');
                            setMobileMenuOpen(false);
                          }
                        }}
                        className="flex-1 flex items-center justify-between px-3 py-2 rounded-xl bg-[#FACC15]/10 hover:bg-[#FACC15]/15 border border-[#FACC15]/30 text-[#FACC15] transition-colors"
                      >
                        <span className="flex items-center gap-2 text-[#FACC15]">
                          <GraduationCap className="w-4 h-4 text-[#FACC15]" />
                          <span className="text-[#FACC15] font-bold text-xs tracking-wide">Bloom Academy</span>
                        </span>
                        <span className="text-[8px] uppercase px-1.5 py-0.5 rounded-full bg-[#FACC15]/20 text-[#FACC15] font-bold border border-[#FACC15]/30">
                          {selectedLanguage === 'fr' ? 'Pédagogie' : selectedLanguage === 'de' ? 'Pädagogik' : 'Pedagogy'}
                        </span>
                      </a>
                      <button
                        type="button"
                        onClick={() => setMobileBloomAcademyOpen(!mobileBloomAcademyOpen)}
                        className="p-2 rounded-xl text-[#FACC15] hover:bg-[#FACC15]/15 border border-[#FACC15]/30 transition-colors"
                        title="Ouvrir le menu Bloom Academy"
                      >
                        {mobileBloomAcademyOpen ? (
                          <ChevronDown className="w-4 h-4 text-[#FACC15]" />
                        ) : (
                          <ChevronRight className="w-4 h-4 text-[#FACC15]" />
                        )}
                      </button>
                    </div>
                  </div>

                  {mobileBloomAcademyOpen && (
                    <div className="space-y-1 mb-2">
                      {/* Lien Accueil */}
                      <a
                        href="/academie/"
                        onClick={(e) => {
                          if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                            e.preventDefault();
                            navigateTo('academie');
                            setMobileMenuOpen(false);
                          }
                        }}
                        className="flex items-center justify-between w-full px-3 py-2 rounded-xl bg-white/10 text-white font-bold text-xs uppercase tracking-wider hover:bg-white/20 transition-colors mb-1"
                      >
                        <span className="flex items-center gap-2.5">
                          <Home className="w-4 h-4 text-[#FAF7F2]/80" />
                          <span className="text-white font-bold">{selectedLanguage === 'fr' ? 'Accueil' : selectedLanguage === 'de' ? 'Startseite' : 'Home'}</span>
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 text-white/80" />
                      </a>

                      {/* Sous-Menu Déroulant: COMPRENDRE LE CORPS */}
                      <div className="pt-1 pb-1">
                        <button
                          type="button"
                          onClick={() => setMobileComprendreCorpsOpen(!mobileComprendreCorpsOpen)}
                          className="flex items-center justify-between w-full px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-[0.2em] text-[#c9a84c] hover:bg-white/5 transition-colors cursor-pointer group"
                        >
                          <span className="flex items-center gap-1.5">
                            <Layers className="w-3 h-3 text-[#c9a84c]" />
                            <span>{selectedLanguage === 'fr' ? 'COMPRENDRE LE CORPS' : selectedLanguage === 'de' ? 'DEN KÖRPER VERSTEHEN' : 'UNDERSTANDING THE BODY'}</span>
                          </span>
                          {mobileComprendreCorpsOpen ? (
                            <ChevronDown className="w-3.5 h-3.5 text-[#c9a84c]/80" />
                          ) : (
                            <ChevronRight className="w-3.5 h-3.5 text-[#c9a84c]/80" />
                          )}
                        </button>
                      </div>

                      {mobileComprendreCorpsOpen && (
                        <div className="space-y-0.5">
                          {/* 1. Comment lire le modèle Bloom (SEUL MODULE GRATUIT) */}
                          <button
                            onClick={() => { navigateTo('comment-lire-modele-bloom'); setMobileMenuOpen(false); }}
                            className="flex items-center justify-between w-full px-3 py-1.5 rounded-xl text-[#FAF7F2]/90 hover:bg-white/10 text-left text-xs font-medium"
                          >
                            <span className="flex items-center gap-2">
                              <span className="text-[#8b949e] font-mono text-[11px]">├──</span>
                              <span>{selectedLanguage === 'fr' ? 'Comment lire le modèle Bloom' : selectedLanguage === 'de' ? 'Wie man das Bloom-Modell liest' : 'How to read the Bloom model'}</span>
                            </span>
                            <span className="text-[8px] uppercase px-1 py-0.2 rounded bg-emerald-500/20 text-emerald-400 font-bold shrink-0 border border-emerald-500/30">
                              {selectedLanguage === 'fr' ? 'Gratuit' : selectedLanguage === 'de' ? 'Gratis' : 'Free'}
                            </span>
                          </button>

                          {/* Module 0 : Le Choc de Paradigme */}
                          <button
                            onClick={() => { navigateTo('module-0'); setMobileMenuOpen(false); }}
                            className="flex items-center justify-between w-full px-3 py-1.5 rounded-xl text-[#FAF7F2]/90 hover:bg-white/10 text-left text-xs font-medium"
                          >
                            <span className="flex items-center gap-2">
                              <span className="text-[#8b949e] font-mono text-[11px]">├──</span>
                              <span className="text-[#c9a84c] font-medium">{selectedLanguage === 'fr' ? 'Module 0 : Choc de Paradigme' : selectedLanguage === 'de' ? 'Modul 0 : Paradigmenwechsel' : 'Module 0 : Paradigm Shift'}</span>
                            </span>
                            <Lock className="w-3 h-3 text-[#c9a84c]/80 shrink-0" />
                          </button>

                          {/* Axe A1 : Émonctoires & Élimination */}
                          <button
                            onClick={() => { navigateTo('axe-a1'); setMobileMenuOpen(false); }}
                            className="flex items-center justify-between w-full px-3 py-1.5 rounded-xl text-[#FAF7F2]/90 hover:bg-white/10 text-left text-xs font-medium"
                          >
                            <span className="flex items-center gap-2">
                              <span className="text-[#8b949e] font-mono text-[11px]">├──</span>
                              <span>{selectedLanguage === 'fr' ? 'Axe A1 : Émonctoires' : selectedLanguage === 'de' ? 'Achse A1 : Ausscheidung' : 'Axis A1 : Emunctories'}</span>
                            </span>
                            <Lock className="w-3 h-3 text-[#c9a84c]/80 shrink-0" />
                          </button>

                          {/* 2. Les 4 Architectures (Payant / Abonnement) */}
                          <button
                            onClick={() => { navigateTo('4-architectures'); setMobileMenuOpen(false); }}
                            className="flex items-center justify-between w-full px-3 py-1.5 rounded-xl text-[#FAF7F2]/90 hover:bg-white/10 text-left text-xs font-medium"
                          >
                            <span className="flex items-center gap-2">
                              <span className="text-[#8b949e] font-mono text-[11px]">├──</span>
                              <span>{selectedLanguage === 'fr' ? 'Les 4 Architectures' : selectedLanguage === 'de' ? 'Die 4 Architekturen' : 'The 4 Architectures'}</span>
                            </span>
                            <Lock className="w-3 h-3 text-[#c9a84c]/80 shrink-0" />
                          </button>

                          {/* 3. Les 7 Terrains (Payant / Abonnement) */}
                          <button
                            onClick={() => { navigateTo('terrain'); setMobileMenuOpen(false); }}
                            className="flex items-center justify-between w-full px-3 py-1.5 rounded-xl text-[#FAF7F2]/90 hover:bg-white/10 text-left text-xs font-medium"
                          >
                            <span className="flex items-center gap-2">
                              <span className="text-[#8b949e] font-mono text-[11px]">├──</span>
                              <span>{selectedLanguage === 'fr' ? 'Les 7 Terrains' : selectedLanguage === 'de' ? 'Die 7 Terrains' : 'The 7 Terrains'}</span>
                            </span>
                            <Lock className="w-3 h-3 text-[#c9a84c]/80 shrink-0" />
                          </button>

                          {/* 4. Les 9 Axes historiques (Payant / Abonnement) */}
                          <button
                            onClick={() => { navigateTo('9-axes'); setMobileMenuOpen(false); }}
                            className="flex items-center justify-between w-full px-3 py-1.5 rounded-xl text-[#FAF7F2]/90 hover:bg-white/10 text-left text-xs font-medium"
                          >
                            <span className="flex items-center gap-2">
                              <span className="text-[#8b949e] font-mono text-[11px]">├──</span>
                              <span>{selectedLanguage === 'fr' ? 'Les 9 Axes historiques' : selectedLanguage === 'de' ? 'Die 9 Historischen Achsen' : 'The 9 Historical Axes'}</span>
                            </span>
                            <Lock className="w-3 h-3 text-[#c9a84c]/80 shrink-0" />
                          </button>

                          {/* 5. La Charge Allostatique (Payant / Abonnement) */}
                          <button
                            onClick={() => { navigateTo('charge-allostatique'); setMobileMenuOpen(false); }}
                            className="flex items-center justify-between w-full px-3 py-1.5 rounded-xl text-[#FAF7F2]/90 hover:bg-white/10 text-left text-xs font-medium"
                          >
                            <span className="flex items-center gap-2">
                              <span className="text-[#8b949e] font-mono text-[11px]">├──</span>
                              <span>{selectedLanguage === 'fr' ? 'La Charge Allostatique' : selectedLanguage === 'de' ? 'Die Allostatische Last' : 'The Allostatic Load'}</span>
                            </span>
                            <Lock className="w-3 h-3 text-[#c9a84c]/80 shrink-0" />
                          </button>

                          {/* 6. Le Reset Homéostasique (Payant / Abonnement) */}
                          <button
                            onClick={() => { navigateTo('phytotherapie-reset'); setMobileMenuOpen(false); }}
                            className="flex items-center justify-between w-full px-3 py-1.5 rounded-xl text-[#FAF7F2]/90 hover:bg-white/10 text-left text-xs font-medium"
                          >
                            <span className="flex items-center gap-2">
                              <span className="text-[#8b949e] font-mono text-[11px]">├──</span>
                              <span>{selectedLanguage === 'fr' ? 'Le Reset Homéostasique' : selectedLanguage === 'de' ? 'Der Homöostatische Reset' : 'The Homeostatic Reset'}</span>
                            </span>
                            <Lock className="w-3 h-3 text-[#c9a84c]/80 shrink-0" />
                          </button>

                          {/* 7. Protocoles Systémiques (remis après Reset Homeostasique) (Payant / Abonnement) */}
                          <button
                            onClick={() => { navigateTo('protocoles'); setMobileMenuOpen(false); }}
                            className="flex items-center justify-between w-full px-3 py-1.5 rounded-xl text-[#FAF7F2]/90 hover:bg-white/10 text-left text-xs font-medium"
                          >
                            <span className="flex items-center gap-2">
                              <span className="text-[#8b949e] font-mono text-[11px]">├──</span>
                              <span>{selectedLanguage === 'fr' ? 'Protocoles Systémiques' : selectedLanguage === 'de' ? 'Systemische Protokolle' : 'Systemic Protocols'}</span>
                            </span>
                            <Lock className="w-3 h-3 text-[#c9a84c]/80 shrink-0" />
                          </button>

                          {/* 8. Métabolisme et insuline (placé après Protocoles Systémiques, écrit en jaune doré) (Payant / Abonnement) */}
                          <button
                            onClick={() => { navigateTo('metabolisme-insuline'); setMobileMenuOpen(false); }}
                            className="flex items-center justify-between px-3 py-1.5 rounded-xl text-[#F59E0B] hover:bg-white/10 text-left text-xs font-bold"
                          >
                            <span className="flex items-center gap-2">
                              <span className="text-[#F59E0B] font-mono text-[11px]">├──</span>
                              <span className="text-[#F59E0B] font-black">{selectedLanguage === 'fr' ? 'Métabolisme & insuline' : selectedLanguage === 'de' ? 'Stoffwechsel & Insulin' : 'Metabolism & Insulin'}</span>
                            </span>
                            <div className="flex items-center gap-1.5">
                              <span className="text-[8px] uppercase px-1 py-0.2 rounded bg-[#F59E0B]/20 text-[#F59E0B] font-bold border border-[#F59E0B]/30">
                                {selectedLanguage === 'fr' ? 'Nouveau' : selectedLanguage === 'de' ? 'Neu' : 'New'}
                              </span>
                              <Lock className="w-3 h-3 text-[#F59E0B] shrink-0" />
                            </div>
                          </button>

                          {/* 9. Autres modules prévus */}
                          <button
                            onClick={() => { navigateTo('academie'); setMobileMenuOpen(false); }}
                            className="flex items-center justify-between w-full px-3 py-1.5 rounded-xl text-white/60 hover:bg-white/10 text-left text-xs italic"
                          >
                            <span className="flex items-center gap-2">
                              <span className="text-[#8b949e] font-mono text-[11px]">└──</span>
                              <span>{selectedLanguage === 'fr' ? 'Autres modules prévus' : selectedLanguage === 'de' ? 'Weitere geplante Module' : 'Other planned modules'}</span>
                            </span>
                            <Lock className="w-3 h-3 text-white/40 shrink-0" />
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {/* SECTION: COMPTE */}
                  {sectionTitle(selectedLanguage === 'fr' ? 'MON ESPACE' : selectedLanguage === 'de' ? 'MEIN KONTO' : 'MY ACCOUNT')}
                  <button
                    onClick={() => { navigateTo('account'); setMobileMenuOpen(false); }}
                    className="flex items-center gap-3 px-3 py-2 rounded-xl text-[#FAF7F2] font-medium hover:bg-white/10 text-left text-sm"
                  >
                    <User className="w-4 h-4 text-[#FAF7F2]/70" /> {m.espace_membre}
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
        ) : currentView === 'protocole-myeline' ? (
          <ProtocoleMyelineContent
            isPremium={isSubscribed}
            onNavigate={navigateTo}
            onRequireAuth={() => setIsAuthOpen(true)}
            lang={selectedLanguage}
          />
        ) : currentView === 'protocole-decalcification-pineale' ? (
          <ProtocoleDecalcificationPinealeContent
            isPremium={isSubscribed}
            onNavigate={navigateTo}
            onRequireAuth={() => setIsAuthOpen(true)}
            lang={selectedLanguage}
          />
        ) : currentView === 'blog-vieillissement-myeline' ? (
          <BlogVieillissementMyelineContent
            onNavigate={navigateTo}
            lang={selectedLanguage}
          />
        ) : currentView === 'academie' || currentView === 'comment-lire-modele-bloom' ? (
          <CommentLireModeleBloomContent
            onNavigate={navigateTo}
            lang={selectedLanguage}
          />
        ) : currentView === 'module-0' ? (
          <Module0ChocParadigmeContent
            onNavigate={navigateTo}
            lang={selectedLanguage}
          />
        ) : currentView === 'axe-a1' ? (
          <AxeA1EmonctoiresContent
            onNavigate={navigateTo}
            lang={selectedLanguage}
          />
        ) : currentView === 'protocoles' ? (
          <ProtocolesSystemiquesContent
            onNavigate={navigateTo}
            lang={selectedLanguage}
            isPremium={isSubscribed}
            onRequireAuth={() => setIsAuthOpen(true)}
          />
        ) : currentView === '4-architectures' ? (
          <Les4ArchitecturesContent
            onNavigate={navigateTo}
            lang={selectedLanguage}
            isPremium={isSubscribed}
            onRequireAuth={() => setIsAuthOpen(true)}
          />
        ) : currentView === '9-axes' || currentView === 'neuf-axes-historiques' ? (
          <NeufAxesHistoriquesContent
            onNavigate={navigateTo}
            lang={selectedLanguage}
          />
        ) : currentView === 'charge-allostatique' ? (
          <ChargeAllostatiqueContent
            onNavigate={navigateTo}
            lang={selectedLanguage}
          />
        ) : currentView === 'metabolisme-insuline' ? (
          <MetabolismeInsulineContent
            onNavigate={navigateTo}
            lang={selectedLanguage}
          />
        ) : currentView === 'reset-homeostasique' || currentView === 'phytotherapie-reset' || currentView === 'votre-pratique' || currentView === 'parcours' ? (
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
        ) : currentView === 'terrain' || currentView === '7-terrains' ? (
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
        ) : currentView === 'guide-complet-extraction-botanique-maison' || currentView === 'remedes-naturels-maison-guide' || currentView === 'remedes-naturels' || currentView === 'totum-vegetal-comprendre' || currentView === 'cosmetiques-naturels-diy' || currentView === 'phytotherapie-moderne-scientifique' ? (
          <PillarPagesContent pillar={currentView === 'remedes-naturels' ? 'remedes-naturels-maison-guide' : currentView} lang={selectedLanguage} onNavigate={navigateTo} />
        ) : (
          <SEOArticles view={currentView} lang={selectedLanguage} t={t} onNavigate={navigateTo} isPremium={isSubscribed} onRequireAuth={() => setIsAuthOpen(true)} />
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
