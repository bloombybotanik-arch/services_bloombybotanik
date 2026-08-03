/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { Lock, ShoppingBag, BookOpen, FlaskConical, Menu, X, ChevronRight, Leaf, ShieldCheck, SearchCheck, Award, Star, User, Check, ArrowRight, ChefHat, Instagram, Youtube, Facebook, Pin as Pinterest, Music2 as TikTok, MessageSquare, Sparkles, Wind, Waves, Moon, Utensils, Activity } from 'lucide-react';
import LibraryContent from './LibraryContent';
import HerbariumContent from './HerbariumContent';
import StoreContent from './StoreContent';
import PendingContent from './PendingContent';
import CosmeticsContent from './CosmeticsContent';
import CulinarySection from './CulinarySection';
import ProductDetail from './ProductDetail';
import CartContent from './CartContent';
import CheckoutFlow from './CheckoutFlow';
import LegalPages from './LegalPages';
import ChatContent from './ChatContent';
import AccountContent from './AccountContent';
import Footer from './components/Footer';
import { wrapTitle } from './lib/textUtils';
import { AuthModal } from './components/AuthModal';
import { PremiumModal } from './components/PremiumModal';
import { auth, db } from './lib/firebase';
import { onAuthStateChanged, User as FirebaseUser, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import bloomLabImg from './assets/images/bloomlab_main_1784887530345.jpeg';
import img05 from './assets/images/Img_05.jpeg';
import ManifesteContent from './ManifesteContent';
import HomeContent from './HomeContent';
import GuideContent from './GuideContent';
import MachineLanding from './MachineLanding';
import PhytotherapyResetPage from './PhytotherapyResetPage';
import LibraryLanding from './LibraryLanding';
import ActivationPage from './ActivationPage';
import headerImg from './assets/images/Header.jpeg';
import logoSidebar from './assets/images/logo_sidebar_1784886108085.png';

// --- SEO & DATA UTILS ---
const POST_TITLE = "L'Élévation de l'Extraction : vers le Totum absolu";
const MAIN_KEYWORDS = "extraction totum, laboratoire botanique, souveraineté santé";

// Generates dynamic ALT text (mimicking the requested PHP script)
const generateSeoAlt = (imageContext: string) => {
  return `${POST_TITLE} - ${imageContext} - ${MAIN_KEYWORDS}`;
};

// JSON-LD Injection Component
const SEOMetadata = () => {
  useEffect(() => {
    const jsonLd = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Product",
          "name": "BloomLab",
          "description": "Extracteur Inox 304 avec précision ±0,5°C",
          "brand": {
            "@type": "Brand",
            "name": "Bloom by BotaniK"
          },
          "offers": {
            "@type": "Offer",
            "price": "329.00",
            "priceCurrency": "EUR",
            "availability": "https://schema.org/InStock"
          }
        },
        {
          "@type": "Service",
          "name": "Le Laboratoire - Extraction Déléguée",
          "description": "Nous réalisons votre Totum sur-mesure sous contrat de traçabilité signé.",
          "provider": {
            "@type": "Organization",
            "name": "Bloom by BotaniK"
          }
        }
      ]
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(jsonLd);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

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

const NavigationSidebar = ({ className = "", currentView, navigateTo, user, handleLogout }: { className?: string, currentView: string, navigateTo: (v: any) => void, user?: any, handleLogout?: () => void }) => (
  <aside className={`w-80 h-screen sticky top-0 bg-[#293228] p-8 flex flex-col justify-between ${className}`}>
    <div>
      <div 
        className="flex items-center gap-4 mb-12 cursor-pointer group/logo"
        onClick={() => navigateTo('home')}
      >
        <img src={logoSidebar} alt="Logo Bloom by BotaniK" className="w-16 h-16 object-contain group-hover/logo:brightness-0 group-hover/logo:invert-[51%] group-hover/logo:sepia-[95%] group-hover/logo:saturate-[2180%] group-hover/logo:hue-rotate-[1deg] group-hover/logo:brightness-[101%] group-hover/logo:contrast-[101%] transition-all" />
        <div className="flex flex-col leading-tight uppercase text-white group-hover/logo:text-[#F97316] transition-colors">
          <span className="text-[11px] font-bold tracking-[0.22em] opacity-80">Bloom by</span>
          <span className="text-xl font-black tracking-widest">botaniK</span>
        </div>
      </div>

      <nav className="mb-12">
        <h3 className="text-xs uppercase tracking-[0.2em] text-[#F5F3EB] mb-6 font-semibold">Sommaire</h3>
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
              I. Commencer ici
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
              II. La science du Totum
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
              III. Une autre voie
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
              IV. Trouver votre voie
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
              V. Activer ma BloomLab
            </a>
          </li>
        </ul>
      </nav>

      <div className="space-y-4">
        <h3 className="text-xs uppercase tracking-[0.2em] text-[#F5F3EB] mb-4 font-semibold">Accès Rapide</h3>
        <a 
          href="#" 
          onClick={(e) => { e.preventDefault(); navigateTo('machine'); }}
          className={`flex items-center gap-3 text-sm font-medium transition-colors group ${currentView === 'machine' ? 'text-[#F97316]' : 'text-white hover:text-[#F97316]'}`}
        >
          <FlaskConical className={`w-4 h-4 transition-colors ${currentView === 'machine' ? 'text-[#F97316]' : 'group-hover:text-[#F97316]'}`} /> La Machine & Niveaux
        </a>
        <a 
          href="#" 
          onClick={(e) => { e.preventDefault(); navigateTo('phytotherapie-reset'); }}
          className={`flex items-center gap-3 text-sm font-medium transition-colors group ${currentView === 'phytotherapie-reset' ? 'text-[#F97316]' : 'text-white hover:text-[#F97316]'}`}
        >
          <Activity className={`w-4 h-4 transition-colors ${currentView === 'phytotherapie-reset' ? 'text-[#F97316]' : 'group-hover:text-[#F97316]'}`} /> Phytothérapie & Reset
        </a>
        <a 
          href="#" 
          onClick={(e) => { e.preventDefault(); navigateTo('boutique'); }}
          className={`flex items-center gap-3 text-sm font-medium transition-colors group ${currentView === 'boutique' ? 'text-[#F97316]' : 'text-white hover:text-[#F97316]'}`}
        >
          <ShoppingBag className={`w-4 h-4 transition-colors ${currentView === 'boutique' ? 'text-[#F97316]' : 'group-hover:text-[#F97316]'}`} /> Boutique
        </a>
        <a 
          href="#" 
          onClick={(e) => { e.preventDefault(); navigateTo('culinaire'); }}
          className={`flex items-center gap-3 text-sm font-medium transition-colors group ${currentView === 'culinaire' ? 'text-[#F97316]' : 'text-white hover:text-[#F97316]'}`}
        >
          <ChefHat className={`w-4 h-4 transition-colors ${currentView === 'culinaire' ? 'text-[#F97316]' : 'group-hover:text-[#F97316]'}`} /> Atelier Culinaire
        </a>
        <a 
          href="#" 
          onClick={(e) => { e.preventDefault(); navigateTo('cosmetiques'); }}
          className={`flex items-center gap-3 text-sm font-medium transition-colors group ${currentView === 'cosmetiques' ? 'text-[#F97316]' : 'text-white hover:text-[#F97316]'}`}
        >
          <Star className={`w-4 h-4 transition-colors ${currentView === 'cosmetiques' ? 'text-[#F97316]' : 'group-hover:text-[#F97316]'}`} /> Soins Cosmétiques
        </a>
        <a 
          href="#" 
          onClick={(e) => { e.preventDefault(); navigateTo('library-landing'); }}
          className={`flex items-center gap-3 text-sm font-medium transition-colors group ${currentView === 'library-landing' || currentView === 'herbier' ? 'text-[#F97316]' : 'text-white hover:text-[#F97316]'}`}
        >
          <Leaf className={`w-4 h-4 transition-colors ${currentView === 'library-landing' || currentView === 'herbier' ? 'text-[#F97316]' : 'group-hover:text-[#F97316]'}`} /> L'Herbier
        </a>
        <a 
          href="https://blog.bloombybotanik.com/" 
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 text-sm font-medium text-white hover:text-[#F97316] transition-colors group"
        >
          <BookOpen className="w-4 h-4 group-hover:text-[#F97316]" /> Le Blog
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
        <img 
          src={bloomLabImg}
          alt={generateSeoAlt("Machine BloomLab")} 
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
          <div className="text-3xl font-bold mb-6">289 €</div>
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
  const [currentView, setCurrentView] = useState<'home' | 'guide' | 'article' | 'boutique' | 'culinaire' | 'cosmetiques' | 'herbier' | 'library' | 'pending' | 'product-detail' | 'cart' | 'checkout' | 'legal' | 'account' | 'chat' | 'machine' | 'phytotherapie-reset' | 'library-landing' | 'activation' | 'manifeste'>('home');
  const [previousView, setPreviousView] = useState<'home' | 'guide' | 'article' | 'boutique' | 'culinaire' | 'cosmetiques' | 'herbier' | 'library' | 'pending' | 'product-detail' | 'cart' | 'checkout' | 'legal' | 'account' | 'chat' | 'machine' | 'phytotherapie-reset' | 'library-landing' | 'activation' | 'manifeste'>('home');

  const [currentProductId, setCurrentProductId] = useState<string | undefined>();
  const [legalType, setLegalType] = useState<'cgv' | 'cgu' | 'privacy' | 'mentions'>('mentions');
  const [cart, setCart] = useState<any[]>([]);
  const [isSplashFinished, setIsSplashFinished] = useState(false);

  useEffect(() => {
    // Simple splash timeout
    const timer = setTimeout(() => setIsSplashFinished(true), 2500);
    return () => clearTimeout(timer);
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
    window.scrollTo(0, 0);
  };
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

  const handleNavigate = (view: 'home' | 'library' | 'herbier' | 'boutique' | 'culinaire' | 'cosmetiques' | 'account') => {
    setCurrentView(view);
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

  const MobileHeader = () => (
    <header className="lg:hidden sticky top-0 bg-botanik-green z-40 border-b border-white/5 px-4 py-3 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-2 cursor-pointer group/logo" onClick={() => navigateTo('home')}>
        <div className="w-10 h-10 flex items-center justify-center overflow-hidden">
          <img src={logoSidebar} alt="Bloom" className="w-full h-full object-contain scale-110" />
        </div>
        <div className="flex flex-col leading-none uppercase text-white group-hover/logo:text-botanik-orange transition-colors">
          <span className="text-[8px] font-bold tracking-[0.2em] opacity-80">Bloom by</span>
          <span className="text-sm font-black tracking-widest">botaniK</span>
        </div>
      </div>
      <div className="flex items-center gap-4">
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
      <SEOMetadata />
      
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
      
      {/* Desktop Sidebar */}
      <NavigationSidebar 
        className="hidden lg:flex" 
        currentView={currentView} 
        navigateTo={navigateTo} 
        user={user} 
        handleLogout={handleLogout} 
      />

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 w-full lg:max-w-[calc(100vw-20rem)] pb-24 lg:pb-0">
        <MobileHeader />
        
        {currentView === 'home' ? (
          <HomeContent onNavigate={navigateTo} />
        ) : currentView === 'machine' ? (
          <MachineLanding onNavigate={navigateTo} />
        ) : currentView === 'phytotherapie-reset' ? (
          <PhytotherapyResetPage onNavigate={navigateTo} />
        ) : currentView === 'library-landing' ? (
          <LibraryLanding onNavigate={navigateTo} />
        ) : currentView === 'guide' ? (
          <GuideContent onNavigate={navigateTo} />
        ) : currentView === 'ateliers' ? (
          <div className="max-w-[1200px] mx-auto px-6 py-12 animate-in fade-in duration-700">
            <h2 className="text-3xl font-bold text-botanik-green mb-8">Vos Ateliers</h2>
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
        ) : currentView === 'library' ? (
          <LibraryContent 
            isPremium={isPremium} 
            onRequirePremium={handleRequirePremium} 
            onNavigatePending={() => navigateTo('pending')}
            onNavigate={navigateTo}
          />
        ) : currentView === 'herbier' ? (
          <HerbariumContent 
            isPremium={isPremium} 
            onRequirePremium={handleRequirePremium} 
            onNavigatePending={() => navigateTo('pending')}
            onNavigate={navigateTo}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            initialPlantId={currentProductId}
          />
        ) : currentView === 'culinaire' ? (
          <CulinarySection 
            isPremium={isPremium} 
            onRequirePremium={handleRequirePremium} 
            onNavigatePending={() => navigateTo('pending')}
            onNavigate={navigateTo}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            initialPlantId={currentProductId}
          />
        ) : currentView === 'cosmetiques' ? (
          <CosmeticsContent 
            isPremium={isPremium} 
            onRequirePremium={handleRequirePremium} 
            onNavigatePending={() => navigateTo('pending')}
            onNavigate={navigateTo}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            initialPlantId={currentProductId}
          />
        ) : currentView === 'pending' ? (
          <PendingContent onBack={() => navigateTo(previousView === 'pending' ? 'home' : previousView)} />
        ) : currentView === 'product-detail' ? (
          <ProductDetail onBack={() => navigateTo('boutique')} onAddToCart={(product) => {
            addToCart(product);
          }} productId={currentProductId} />
        ) : currentView === 'cart' ? (
          <CartContent 
            items={cart}
            onUpdateQuantity={updateQuantity}
            onRemove={removeFromCart}
            onBack={() => navigateTo('boutique')}
            onCheckout={() => navigateTo('checkout')}
          />
        ) : currentView === 'checkout' ? (
          <CheckoutFlow 
            cart={cart}
            total={cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)}
            onSuccess={() => {
              setCart([]);
              navigateTo('home');
            }}
            onCancel={() => navigateTo('cart')}
          />
        ) : currentView === 'chat' ? (
          <ChatContent 
            isPremium={isPremium} 
            onNavigate={navigateTo} 
            user={user}
            onRequireAuth={() => setShowAuthModal(true)}
            onSaveAssessment={handleSaveAssessment}
            savedAssessment={assessmentResult}
            onResetAssessment={handleResetAssessment}
          />
        ) : currentView === 'manifeste' ? (
          <ManifesteContent onBack={() => navigateTo(previousView === 'manifeste' ? 'home' : previousView)} />
        ) : currentView === 'activation' ? (
          <ActivationPage 
            userId={user?.uid || null} 
            onSuccess={() => {
              setIsPremium(true);
              navigateTo('library');
            }} 
          />
        ) : currentView === 'account' ? (
          <AccountContent 
            user={user} 
            onNavigate={navigateTo} 
            onLogout={handleLogout} 
          />
        ) : currentView === 'legal' ? (
          <LegalPages type={legalType} onBack={() => navigateTo(previousView)} />
        ) : (
          <StoreContent 
            onNavigatePending={() => navigateTo('pending')} 
            onNavigateDetail={(id) => navigateTo('product-detail', id)}
            onAddToCart={(product) => addToCart(product)}
          />
        )}
        <Footer onNavigate={navigateTo} />
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-botanik-green/5 px-4 pt-4 pb-8 flex justify-between items-center z-50 shadow-[0_-4px_20px_rgba(27,48,34,0.05)]">
        {[
          { id: 'home', label: 'Guide', icon: FlaskConical },
          { id: 'library-landing', label: "L'Herbier", icon: Leaf },
          { id: 'blog', label: 'Blog', icon: BookOpen, url: 'https://blog.bloombybotanik.com/' },
          { id: 'chat', label: 'Conseils', icon: MessageSquare },
          { id: 'boutique', label: 'Boutique', icon: ShoppingBag },
          { id: 'account', label: 'Compte', icon: User }
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
      </nav>
    </div>
  );
}

