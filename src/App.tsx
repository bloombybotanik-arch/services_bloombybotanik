/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState, useMemo } from 'react';
import {
  ShoppingBag,
  Menu,
  X,
  User,
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
import { NavigationMenuTree } from './components/NavigationMenuTree';
import { ShippingMethod } from './lib/shippingUtils';

import HomeContent from './HomeContent';
import HerbariumContent from './HerbariumContent';
import StoreContent from './StoreContent';
import GuideContent from './GuideContent';
import CartContent from './CartContent';
import CheckoutFlow from './CheckoutFlow';
import ProductDetail from './ProductDetail';
import CulinarySection from './CulinarySection';
import TremellaBeautySoupRecipe from './TremellaBeautySoupRecipe';
import CosmeticsContent from './CosmeticsContent';
import LibraryLanding from './LibraryLanding';
import ActivationPage from './ActivationPage';
import LegalPages from './LegalPages';
import ChatContent from './ChatContent';
import AccountContent from './AccountContent';
import RecipesContent from './RecipesContent';
import PublicRecipeCatalog from './components/recipes/PublicRecipeCatalog';
import AdminDashboard from './components/AdminDashboard';
import ManifesteContent from './ManifesteContent';
import MachineLanding from './MachineLanding';
import PhytotherapyResetPage from './PhytotherapyResetPage';
import PhycocyanineResetRecipe from './PhycocyanineResetRecipe';
import PillarExtraction from './PillarExtraction';
import PillarInfusion from './PillarInfusion';
import PillarOil from './PillarOil';
import PillarAdaptogens from './PillarAdaptogens';
import SolventsGuide from './SolventsGuide';
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
import WomenAcademy from './WomenAcademy';
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
  '/academie/axes/a1-emonctoires': 'axe-a1',
  '/academie/axes/a1-emonctoires/': 'axe-a1',
  '/academie/axes/a1': 'axe-a1',
  '/academie/axes/a1/': 'axe-a1',
  '/academie': 'academie',
  '/academie/': 'academie',
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
  '/infusion-botanique': 'infusion-botanique',
  '/infusion-botanique/': 'infusion-botanique',
  '/infusion-botanique-maison-comment-ca-marche': 'infusion-botanique',
  '/infusion-botanique-maison-comment-ca-marche/': 'infusion-botanique',
  '/reset-homeostasique': 'reset-homeostasique',
  '/reset-homeostasique/': 'reset-homeostasique',
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
    { title: "Cuve Inox 304 Alimentaire", desc: "Eau filtrée, huiles végétales et glycérine selon les fiches" },
    { title: "Régulation Thermique 40–100°C", desc: "Spécification nominale fabricant, chauffe douce des composés sensibles" },
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
      if (path.startsWith('/recettes')) {
        if (path === '/recettes' || path === '/recettes/') return 'recettes-hub';
        if (path === '/recettes/culinaires/soupe-beaute-tremella' || path === '/recettes/culinaires/soupe-beaute-tremella/') {
          return 'recette-soupe-tremella';
        }
        if (path.startsWith('/recettes/culinaires')) {
          if (path === '/recettes/culinaires' || path === '/recettes/culinaires/' || path.startsWith('/recettes/culinaires/page/')) return 'recettes-culinaires';
          return 'recette-detail';
        }
        if (path.startsWith('/recettes/cosmetiques')) {
          if (path === '/recettes/cosmetiques' || path === '/recettes/cosmetiques/' || path.startsWith('/recettes/cosmetiques/page/')) return 'recettes-cosmetiques';
          return 'recette-detail';
        }
        if (path.startsWith('/recettes/parcours-botaniques')) {
          if (path === '/recettes/parcours-botaniques' || path === '/recettes/parcours-botaniques/' || path.startsWith('/recettes/parcours-botaniques/page/')) return 'recettes-parcours';
          return 'recette-detail';
        }
        if (path === '/recettes/phytotherapie' || path === '/recettes/phytotherapie/' || path.startsWith('/recettes/phytotherapie/page/')) {
          return 'recettes-phytotherapie';
        }
        if (path === '/recettes/gastronomie' || path === '/recettes/gastronomie/' || path.startsWith('/recettes/gastronomie/page/')) {
          return 'recettes-gastronomie';
        }
        return 'recette-detail';
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

  const [selectedLanguage, setSelectedLanguage] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const langParam = new URLSearchParams(window.location.search).get('lang');
      if (langParam === 'en' || langParam === 'de' || langParam === 'fr') {
        return langParam;
      }
    }
    return 'fr';
  });
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
  const mobileMenuButtonRef = React.useRef<HTMLButtonElement | null>(null);
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
    let unsubscribeAuth: (() => void) | null = null;

    try {
      unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        if (unsubscribeDoc) {
          unsubscribeDoc();
          unsubscribeDoc = null;
        }
        if (currentUser) {
          try {
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
          } catch (err) {
            console.warn('[Firestore user listener error]', err);
            setIsSubscribed(false);
          }
        } else {
          setIsSubscribed(false);
        }
      });
    } catch (err) {
      console.warn('[Firebase Auth listener error]', err);
      setIsSubscribed(false);
    }

    return () => {
      if (unsubscribeAuth) unsubscribeAuth();
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
      if (path === '/articles' || path === '/articles/') {
        setSelectedSlug('');
        setCurrentView('articles');
        return;
      }
      if (path.startsWith('/articles/')) {
        const slug = path.replace(/^\/articles\//, '').replace(/\/$/, '');
        setSelectedSlug(slug);
        setCurrentView('articles');
        return;
      }
      if (path === '/blog' || path === '/blog/') {
        setSelectedSlug('');
        setCurrentView('blog');
        return;
      }
      if (path.startsWith('/blog/') && path !== '/blog/vieillissement-myeline-fgf17-clarte-mentale' && path !== '/blog/vieillissement-myeline-fgf17-clarte-mentale/') {
        const slug = path.replace(/^\/blog\//, '').replace(/\/$/, '');
        setSelectedSlug(slug);
        setCurrentView('blog');
        return;
      }
      if (path.startsWith('/recettes')) {
        if (path === '/recettes' || path === '/recettes/') {
          setCurrentView('recettes-hub');
          return;
        }
        if (path === '/recettes/culinaires/soupe-beaute-tremella' || path === '/recettes/culinaires/soupe-beaute-tremella/') {
          setCurrentView('recette-soupe-tremella');
          return;
        }
        if (path.startsWith('/recettes/culinaires')) {
          if (path === '/recettes/culinaires' || path === '/recettes/culinaires/' || path.startsWith('/recettes/culinaires/page/')) {
            setCurrentView('recettes-culinaires');
          } else {
            setCurrentView('recette-detail');
          }
          return;
        }
        if (path.startsWith('/recettes/cosmetiques')) {
          if (path === '/recettes/cosmetiques' || path === '/recettes/cosmetiques/' || path.startsWith('/recettes/cosmetiques/page/')) {
            setCurrentView('recettes-cosmetiques');
          } else {
            setCurrentView('recette-detail');
          }
          return;
        }
        if (path.startsWith('/recettes/parcours-botaniques')) {
          if (path === '/recettes/parcours-botaniques' || path === '/recettes/parcours-botaniques/' || path.startsWith('/recettes/parcours-botaniques/page/')) {
            setCurrentView('recettes-parcours');
          } else {
            setCurrentView('recette-detail');
          }
          return;
        }
        if (path.startsWith('/recettes/phytotherapie')) {
          if (path === '/recettes/phytotherapie' || path === '/recettes/phytotherapie/' || path.startsWith('/recettes/phytotherapie/page/')) {
            setCurrentView('recettes-phytotherapie');
          } else {
            setCurrentView('recette-detail');
          }
          return;
        }
        if (path.startsWith('/recettes/gastronomie')) {
          if (path === '/recettes/gastronomie' || path === '/recettes/gastronomie/' || path.startsWith('/recettes/gastronomie/page/')) {
            setCurrentView('recettes-gastronomie');
          } else {
            setCurrentView('recette-detail');
          }
          return;
        }
        setCurrentView('recette-detail');
        return;
      }
      const view = PATH_VIEWS[path] || 'indexbis';
      setCurrentView(view);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const mainScrollRef = React.useRef<HTMLDivElement | null>(null);

  // Synchronize document SEO, Meta, Canonical & Hreflang
  useEffect(() => {
    updateDocumentSEO(currentView, selectedLanguage, selectedProduct, selectedSlug);
  }, [currentView, selectedLanguage, selectedProduct, selectedSlug]);

  // Ensure main Flexbox scroll container resets to top on view/route change
  useEffect(() => {
    mainScrollRef.current?.scrollTo({ top: 0, behavior: 'auto' });
    window.scrollTo(0, 0);
  }, [currentView, selectedProduct, selectedSlug]);

  // Close mobile navigation drawer on Escape and restore focus to toggle button
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false);
        mobileMenuButtonRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Scroll to top on view change
  const navigateTo = (view: View, param?: string) => {
    setCurrentView(view);
    setMobileMenuOpen(false);
    if (view === 'blog' || view === 'articles') {
      setSelectedSlug(param || '');
    } else if (param) {
      if (view === 'product-detail') setSelectedProduct(param);
      if (view === 'terrain') setSelectedTerrain(param);
    }
    if (view === 'chat' && (param === 'start' || param === 'new' || !param)) {
      setSavedAssessment(null);
    }
    mainScrollRef.current?.scrollTo({ top: 0, behavior: 'auto' });
    window.scrollTo(0, 0);
    const targetPath =
      view === 'product-detail' && param
        ? `/boutique/${param}/`
        : view === 'blog' && param
        ? `/blog/${param}/`
        : view === 'articles' && param
        ? `/articles/${param}/`
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
    <div 
      style={{ fontFamily: "'Manrope', sans-serif" }}
      className="flex h-screen w-full overflow-hidden bg-[#F9F6F0] text-[#1B3022] font-sans selection:bg-botanik-green selection:text-white relative"
    >
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

      {/* 2. Fluid Main Content Column inside Flexbox Shell */}
      <div
        ref={mainScrollRef}
        id="main-scroll-container"
        className="flex-1 min-w-0 w-full h-full overflow-y-auto overflow-x-hidden flex flex-col transition-all"
      >
        {/* Top Navigation Bar: Mobile Only (< 768px) */}
        <header className="md:hidden sticky top-0 z-[80] shrink-0 bg-[#0F261E] border-b border-white/10 transition-colors shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
            {/* Left side: Brand Logo */}
            <a
              href="/"
              onClick={(e) => {
                if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                  e.preventDefault();
                  navigateTo('indexbis');
                }
              }}
              className="flex items-center gap-2.5 text-left rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8772E] group cursor-pointer shrink-0"
              id="brand-logo-btn"
              aria-label="Bloom by BotaniK - Accueil"
            >
              <BloomLogo variant="header" theme="dark" className="text-[#FAF7F2] group-hover:text-[#C8AB8A] transition-colors" />
              <div className="flex flex-col leading-tight uppercase text-[#FAF7F2] group-hover:text-[#C8AB8A] transition-colors">
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
                  type="button"
                  onClick={() => navigateTo('account')}
                  className="p-2 text-[#FAF7F2]/85 hover:text-white hover:bg-white/10 rounded-full transition-colors relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8772E]"
                  title={selectedLanguage === 'fr' ? 'Mon Compte' : selectedLanguage === 'de' ? 'Mein Konto' : 'My Account'}
                  aria-label={selectedLanguage === 'fr' ? 'Mon Compte' : selectedLanguage === 'de' ? 'Mein Konto' : 'My Account'}
                  id="mobile-account-btn"
                >
                  <User className="w-4 h-4" aria-hidden="true" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsAuthOpen(true)}
                  className="p-2 text-[#FAF7F2]/85 hover:text-white hover:bg-white/10 rounded-full transition-colors relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8772E]"
                  title={selectedLanguage === 'fr' ? 'Connexion' : selectedLanguage === 'de' ? 'Anmelden' : 'Login'}
                  aria-label={selectedLanguage === 'fr' ? 'Connexion' : selectedLanguage === 'de' ? 'Anmelden' : 'Login'}
                  id="mobile-login-btn"
                >
                  <User className="w-4 h-4 text-[#FAF7F2]" aria-hidden="true" />
                </button>
              )}

              {/* Shopping Cart Button */}
              <button
                type="button"
                onClick={() => navigateTo('cart')}
                className="relative p-2 bg-white/10 text-[#FAF7F2] hover:bg-white/20 border border-white/15 rounded-full transition-colors flex items-center justify-center shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8772E]"
                title={selectedLanguage === 'fr' ? 'Panier' : selectedLanguage === 'de' ? 'Warenkorb' : 'Cart'}
                aria-label={`${selectedLanguage === 'fr' ? 'Panier' : selectedLanguage === 'de' ? 'Warenkorb' : 'Cart'} (${cartCount})`}
                id="mobile-cart-btn"
              >
                <ShoppingBag className="w-4 h-4 text-[#FAF7F2]" aria-hidden="true" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#C8AB8A] text-[#0F261E] text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-[#3E4A3D]">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Mobile Menu Hamburger */}
              <button
                ref={mobileMenuButtonRef}
                type="button"
                onClick={() => setMobileMenuOpen((prev) => !prev)}
                className="p-2 text-[#FAF7F2] hover:bg-white/10 rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8772E]"
                aria-label={
                  mobileMenuOpen
                    ? selectedLanguage === 'fr' ? 'Fermer le menu' : selectedLanguage === 'de' ? 'Menü schließen' : 'Close menu'
                    : selectedLanguage === 'fr' ? 'Ouvrir le menu' : selectedLanguage === 'de' ? 'Menü öffnen' : 'Open menu'
                }
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-navigation-drawer"
                id="mobile-menu-toggle"
              >
                {mobileMenuOpen ? <X className="w-6 h-6 text-[#FAF7F2]" aria-hidden="true" /> : <Menu className="w-6 h-6 text-[#FAF7F2]" aria-hidden="true" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation Drawer */}
          {mobileMenuOpen && (
            <nav
              id="mobile-navigation-drawer"
              aria-label={
                selectedLanguage === 'fr'
                  ? 'Navigation mobile'
                  : selectedLanguage === 'de'
                  ? 'Mobile Navigation'
                  : 'Mobile navigation'
              }
              className="bg-[#0F261E] border-b border-white/10 px-4 pt-4 pb-24 max-h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain animate-in slide-in-from-top-4 duration-300 shadow-2xl"
            >
              <NavigationMenuTree
                currentView={currentView}
                onNavigate={navigateTo}
                lang={selectedLanguage}
                variant="mobile"
                onItemSelect={() => setMobileMenuOpen(false)}
              />

              {/* Persistent Utility Footer inside Mobile Drawer */}
              <div className="mt-5 pt-4 border-t border-white/10 space-y-2.5">
                <button
                  type="button"
                  onClick={() => {
                    setIsCalculatorOpen(true);
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl bg-[#E8772E] hover:bg-[#D4651F] text-white font-bold text-sm transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  aria-label={
                    selectedLanguage === 'fr'
                      ? 'Calculateur de dilution (alcool 96° / eau)'
                      : selectedLanguage === 'de'
                      ? 'Verdünnungsrechner (96° Alkohol / Wasser)'
                      : 'Dilution calculator (96° alcohol / water)'
                  }
                >
                  <Calculator className="w-4 h-4 text-white" aria-hidden="true" />
                  <span>
                    {selectedLanguage === 'fr'
                      ? 'Calculatrice (dilution alcool / eau)'
                      : selectedLanguage === 'de'
                      ? 'Verdünnungsrechner'
                      : 'Dilution Calculator'}
                  </span>
                </button>

                <div className="flex items-center justify-between gap-2 pt-1">
                  {user ? (
                    <button
                      type="button"
                      onClick={() => {
                        navigateTo('account');
                        setMobileMenuOpen(false);
                      }}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-sm font-medium text-white hover:text-[#E8772E] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8772E]"
                    >
                      <User className="w-4 h-4" aria-hidden="true" />
                      <span>{selectedLanguage === 'fr' ? 'Mon Compte' : selectedLanguage === 'de' ? 'Mein Konto' : 'My Account'}</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        setIsAuthOpen(true);
                      }}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-sm font-medium text-white hover:text-[#E8772E] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8772E]"
                    >
                      <User className="w-4 h-4" aria-hidden="true" />
                      <span>{selectedLanguage === 'fr' ? 'Se connecter' : selectedLanguage === 'de' ? 'Anmelden' : 'Login'}</span>
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => {
                      navigateTo('cart');
                      setMobileMenuOpen(false);
                    }}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-sm font-medium text-white hover:text-[#E8772E] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8772E]"
                  >
                    <ShoppingBag className="w-4 h-4 text-[#C8AB8A]" aria-hidden="true" />
                    <span>
                      {selectedLanguage === 'fr' ? 'Panier' : selectedLanguage === 'de' ? 'Warenkorb' : 'Cart'} ({cartCount})
                    </span>
                  </button>
                </div>
              </div>
            </nav>
          )}
        </header>

      {/* 3. Main Content Router */}
      <main className="flex-1 w-full min-w-0 transition-all">
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
        ) : currentView === 'academie' ? (
          <BloomAcademiePage
            onNavigate={navigateTo}
            lang={selectedLanguage}
          />
        ) : currentView === 'comment-lire-modele-bloom' ? (
          <CommentLireModeleBloomContent
            onNavigate={navigateTo}
            lang={selectedLanguage}
          />
        ) : currentView === 'women-academy' ? (
          <WomenAcademy
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
        ) : currentView === '9-axes' || currentView === 'neuf-axes-historiques' || currentView === 'axe-a2' || currentView === 'axe-a3' || currentView === 'axe-a4' || currentView === 'axe-a5' || currentView === 'axe-a6' || currentView === 'axe-a7' || currentView === 'axe-a8' || currentView === 'axe-a9' ? (
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
        ) : currentView === 'recette-phycocyanine' ? (
          <PhycocyanineResetRecipe
            lang={selectedLanguage}
            onNavigate={navigateTo}
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
        ) : currentView === 'recette-soupe-tremella' ? (
          <TremellaBeautySoupRecipe
            lang={selectedLanguage}
            onNavigate={navigateTo}
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
        ) : currentView === 'recettes' || currentView === 'recettes-gratuites' || currentView === 'recettes-hub' || currentView === 'recettes-culinaires' || currentView === 'recettes-cosmetiques' || currentView === 'recettes-parcours' || currentView === 'recette-detail' ? (
          <PublicRecipeCatalog
            initialPath={typeof window !== 'undefined' ? window.location.pathname : '/recettes/'}
            onNavigate={(targetPath) => {
              if (targetPath.startsWith('/recettes/')) {
                if (targetPath === '/recettes/' || targetPath === '/recettes') setCurrentView('recettes-hub');
                else if (targetPath.startsWith('/recettes/culinaires')) {
                  if (targetPath === '/recettes/culinaires/' || targetPath.startsWith('/recettes/culinaires/page/')) setCurrentView('recettes-culinaires');
                  else setCurrentView('recette-detail');
                } else if (targetPath.startsWith('/recettes/cosmetiques')) {
                  if (targetPath === '/recettes/cosmetiques/' || targetPath.startsWith('/recettes/cosmetiques/page/')) setCurrentView('recettes-cosmetiques');
                  else setCurrentView('recette-detail');
                } else if (targetPath.startsWith('/recettes/parcours-botaniques')) {
                  if (targetPath === '/recettes/parcours-botaniques/' || targetPath.startsWith('/recettes/parcours-botaniques/page/')) setCurrentView('recettes-parcours');
                  else setCurrentView('recette-detail');
                } else if (targetPath.startsWith('/recettes/phytotherapie')) {
                  if (targetPath === '/recettes/phytotherapie/' || targetPath.startsWith('/recettes/phytotherapie/page/')) setCurrentView('recettes-phytotherapie');
                  else setCurrentView('recette-detail');
                } else if (targetPath.startsWith('/recettes/gastronomie')) {
                  if (targetPath === '/recettes/gastronomie/' || targetPath.startsWith('/recettes/gastronomie/page/')) setCurrentView('recettes-gastronomie');
                  else setCurrentView('recette-detail');
                }
              } else if (targetPath === '/') {
                navigateTo('indexbis');
              } else {
                const targetView = (PATH_VIEWS[targetPath] || 'indexbis') as View;
                navigateTo(targetView);
              }
            }}
            lang={selectedLanguage}
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
            setShippingMethod={(m: any) => setShippingMethod(m)}
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
        ) : currentView === 'totum-vegetal' || currentView === 'totum-definition' ? (
          <SEOArticlesExports.TotumDefinition lang={selectedLanguage} t={t} onNavigate={navigateTo} />
        ) : currentView === 'guide-solvants' ? (
          <SolventsGuide lang={selectedLanguage} onNavigate={navigateTo} />
        ) : currentView === 'pillar-extraction' || currentView === 'extraction-botanique' || currentView === 'guide-complet' || currentView === 'guide' || currentView === 'how_it_works' || currentView === 'comment-ca-marche' || currentView === 'infuseur-botanique' ? (
          <PillarExtraction lang={selectedLanguage} onNavigate={navigateTo} />
        ) : currentView === 'terrain' || currentView === '7-terrains' ? (
          <TerrainPillar
            terrainId={selectedTerrain}
            lang={selectedLanguage}
            onNavigate={navigateTo}
          />
        ) : currentView === 'hormese' || currentView === 'infusion-botanique' || currentView === 'infusion-botanique-maison-comment-ca-marche' || currentView === 'qu-est-ce-que-infusion' ? (
          <PillarInfusion lang={selectedLanguage} onNavigate={navigateTo} />
        ) : currentView === 'huile-infusee' || currentView === 'maceration-plantes' ? (
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
