import React from 'react';
import {
  Home,
  FileText,
  FlaskConical,
  BookOpen,
  Leaf,
  Utensils,
  Droplets,
  Activity,
  Sparkles,
  Newspaper,
  HelpCircle,
  MessageCircle,
  ShoppingBag,
  Package,
  Calculator,
  User,
  Star,
  ChevronRight
} from 'lucide-react';
import { BloomLogo } from './ui/BloomLogo';
import { LanguageSelector } from './LanguageSelector';
import { Language, translations } from '../translations';
import { View } from '../types';
import { User as FirebaseUser } from 'firebase/auth';

interface NavigationSidebarProps {
  currentView: View;
  onNavigate: (view: View, param?: string) => void;
  lang: Language;
  setLang: (lang: Language) => void;
  cartCount: number;
  user: FirebaseUser | null;
  onOpenAuth: () => void;
  onOpenCalculator: () => void;
}

export const NavigationSidebar: React.FC<NavigationSidebarProps> = ({
  currentView,
  onNavigate,
  lang,
  setLang,
  cartCount,
  user,
  onOpenAuth,
  onOpenCalculator
}) => {
  const t = translations[lang] || translations.fr;
  const navT = t.nav;

  const isActive = (view: View) => currentView === view;

  const navItemClass = (active: boolean) =>
    `flex items-center justify-between w-full px-3 py-2 rounded-xl text-xs font-medium transition-all group cursor-pointer ${
      active
        ? 'bg-[#1C3F34] text-white font-bold border border-white/10 shadow-xs'
        : 'text-white/70 hover:text-white hover:bg-white/5'
    }`;

  const navIconClass = (active: boolean) =>
    `w-4 h-4 shrink-0 transition-colors ${
      active ? 'text-[#D97706]' : 'text-white/40 group-hover:text-white/80'
    }`;

  return (
    <aside 
      className="hidden md:flex flex-col fixed top-0 left-0 bottom-0 w-[280px] bg-[#0F261E] text-white z-40 border-r border-white/10 select-none shadow-2xl"
      aria-label="Navigation principale"
    >
      {/* 1. Header Lockup: Papillon + Bloom by BotaniK */}
      <div className="p-5 border-b border-white/10">
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('indexbis');
          }}
          className="flex items-center gap-3.5 group cursor-pointer"
          aria-label="Bloom by BotaniK - Accueil"
        >
          <BloomLogo variant="sidebar" className="w-10 h-10 shrink-0 group-hover:scale-105 transition-transform" />
          <div className="flex flex-col leading-tight uppercase">
            <span className="text-[10px] font-bold tracking-[0.24em] text-white/70 group-hover:text-[#D97706] transition-colors">
              Bloom by
            </span>
            <span className="text-xl font-black tracking-widest text-white group-hover:text-[#D97706] transition-colors">
              BotaniK
            </span>
          </div>
        </a>
      </div>

      {/* 2. Scrollable Navigation Menu */}
      <div className="flex-1 overflow-y-auto px-4 py-5 space-y-6 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
        
        {/* GROUP: ACCUEIL */}
        <div>
          <div className="text-[10px] font-black uppercase tracking-[0.25em] text-white/30 px-3 mb-2">
            {navT.accueil || 'ACCUEIL'}
          </div>
          <button
            onClick={() => onNavigate('indexbis')}
            className={navItemClass(isActive('indexbis') || isActive('home'))}
          >
            <div className="flex items-center gap-3">
              <Home className={navIconClass(isActive('indexbis') || isActive('home'))} />
              <span>Accueil</span>
            </div>
          </button>
        </div>

        {/* GROUP: POURQUOI BLOOM */}
        <div>
          <div className="text-[10px] font-black uppercase tracking-[0.25em] text-white/30 px-3 mb-2">
            {navT.pourquoi_bloom || 'POURQUOI BLOOM'}
          </div>
          <div className="space-y-1">
            <button
              onClick={() => onNavigate('manifeste')}
              className={navItemClass(isActive('manifeste'))}
            >
              <div className="flex items-center gap-3">
                <FileText className={navIconClass(isActive('manifeste'))} />
                <span>Le Manifeste</span>
              </div>
            </button>
            <button
              onClick={() => onNavigate('guide')}
              className={navItemClass(isActive('guide') || isActive('infuseur-botanique') || isActive('comment-ca-marche'))}
            >
              <div className="flex items-center gap-3">
                <FlaskConical className={navIconClass(isActive('guide') || isActive('infuseur-botanique') || isActive('comment-ca-marche'))} />
                <span>L'Extraction de Précision</span>
              </div>
            </button>
          </div>
        </div>

        {/* GROUP: LA MÉTHODE A/B */}
        <div>
          <div className="text-[10px] font-black uppercase tracking-[0.25em] text-white/30 px-3 mb-2">
            {navT.methode_ab || 'LA MÉTHODE A/B'}
          </div>
          <div className="space-y-1">
            <a
              href="https://bloombybotanik.com/boutique/bloomlab/"
              onClick={(e) => {
                if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                  e.preventDefault();
                  onNavigate('product-detail', 'bloomlab');
                }
              }}
              className={navItemClass(isActive('product-detail') || isActive('machine'))}
            >
              <div className="flex items-center gap-3">
                <Sparkles className={navIconClass(isActive('product-detail') || isActive('machine'))} />
                <span>L'Extracteur BloomLab®</span>
              </div>
            </a>
            <button
              onClick={() => onNavigate('guide-complet')}
              className={navItemClass(isActive('guide-complet') || isActive('pillar-extraction') || isActive('extraction-botanique'))}
            >
              <div className="flex items-center gap-3">
                <BookOpen className={navIconClass(isActive('guide-complet') || isActive('pillar-extraction') || isActive('extraction-botanique'))} />
                <span className="truncate">Guide de l'extraction</span>
              </div>
            </button>
            <button
              onClick={() => onNavigate('totum-vegetal')}
              className={navItemClass(isActive('totum-vegetal'))}
            >
              <div className="flex items-center gap-3">
                <Leaf className={navIconClass(isActive('totum-vegetal'))} />
                <span>Le Totum Végétal</span>
              </div>
            </button>
          </div>
        </div>

        {/* GROUP: VOTRE PRATIQUE */}
        <div>
          <div className="text-[10px] font-black uppercase tracking-[0.25em] text-white/30 px-3 mb-2">
            {navT.votre_pratique || 'VOTRE PRATIQUE'}
          </div>
          <div className="space-y-1">
            <button
              onClick={() => onNavigate('culinaire')}
              className={navItemClass(isActive('culinaire'))}
            >
              <div className="flex items-center gap-3">
                <Utensils className={navIconClass(isActive('culinaire'))} />
                <span>Atelier Culinaire</span>
              </div>
            </button>
            <button
              onClick={() => onNavigate('cosmetiques')}
              className={navItemClass(isActive('cosmetiques'))}
            >
              <div className="flex items-center gap-3">
                <Droplets className={navIconClass(isActive('cosmetiques'))} />
                <span>Cosmétique Botanique</span>
              </div>
            </button>
            <button
              onClick={() => onNavigate('phytotherapie-reset')}
              className={navItemClass(isActive('phytotherapie-reset'))}
            >
              <div className="flex items-center gap-3">
                <Activity className={navIconClass(isActive('phytotherapie-reset'))} />
                <span>Protocoles Systémiques</span>
              </div>
            </button>
            <button
              onClick={() => onNavigate('chat')}
              className={navItemClass(isActive('chat'))}
            >
              <div className="flex items-center gap-3">
                <Sparkles className={navIconClass(isActive('chat'))} />
                <span>Je commence : Diagnostic</span>
              </div>
            </button>
            <a
              href="https://bloombybotanik.com/herbier/"
              onClick={(e) => {
                if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                  e.preventDefault();
                  onNavigate('herbier');
                }
              }}
              className={navItemClass(isActive('herbier'))}
            >
              <div className="flex items-center gap-3">
                <BookOpen className={navIconClass(isActive('herbier'))} />
                <span>L'Herbier</span>
              </div>
            </a>
          </div>
        </div>

        {/* GROUP: BOUTIQUE */}
        <div>
          <div className="text-[10px] font-black uppercase tracking-[0.25em] text-white/30 px-3 mb-2">
            {navT.shop || 'BOUTIQUE'}
          </div>
          <div className="space-y-1">
            <button
              onClick={() => onNavigate('boutique')}
              className={navItemClass(isActive('boutique'))}
            >
              <div className="flex items-center gap-3">
                <ShoppingBag className={navIconClass(isActive('boutique'))} />
                <span>Toute la Boutique</span>
              </div>
            </button>
            <button
              onClick={() => onNavigate('boutique-kits')}
              className={navItemClass(isActive('boutique-kits'))}
            >
              <div className="flex items-center gap-3">
                <Package className={navIconClass(isActive('boutique-kits'))} />
                <span>Kits de plantes</span>
              </div>
            </button>
            <a
              href="https://bloombybotanik.com/abonnement/"
              onClick={(e) => {
                if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                  e.preventDefault();
                  onNavigate('abonnement');
                }
              }}
              className={navItemClass(isActive('abonnement') || isActive('premium-info'))}
            >
              <div className="flex items-center gap-3">
                <Star className={navIconClass(isActive('abonnement') || isActive('premium-info'))} />
                <span>{navT.boutique_sub?.abonnement || 'Abonnement premium'}</span>
              </div>
            </a>
          </div>
        </div>

        {/* GROUP: TRANSMISSION */}
        <div>
          <div className="text-[10px] font-black uppercase tracking-[0.25em] text-white/30 px-3 mb-2">
            {navT.transmission || 'TRANSMISSION'}
          </div>
          <div className="space-y-1">
            <a
              href="https://bloombybotanik.com/bibliotheque/"
              onClick={(e) => {
                if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                  e.preventDefault();
                  onNavigate('library-landing');
                }
              }}
              className={navItemClass(isActive('library-landing') || isActive('bibliotheque'))}
            >
              <div className="flex items-center gap-3">
                <Newspaper className={navIconClass(isActive('library-landing') || isActive('bibliotheque'))} />
                <span>Bibliothèque Scientifique</span>
              </div>
            </a>
            <button
              onClick={() => onNavigate('faq')}
              className={navItemClass(isActive('faq'))}
            >
              <div className="flex items-center gap-3">
                <HelpCircle className={navIconClass(isActive('faq'))} />
                <span>Questions Fréquentes</span>
              </div>
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className={navItemClass(isActive('contact'))}
            >
              <div className="flex items-center gap-3">
                <MessageCircle className={navIconClass(isActive('contact'))} />
                <span>Nous Contacter</span>
              </div>
            </button>
          </div>
        </div>

        {/* GROUP: MON COMPTE */}
        <div>
          <div className="text-[10px] font-black uppercase tracking-[0.25em] text-white/30 px-3 mb-2">
            {navT.compte || 'MON COMPTE'}
          </div>
          <div className="space-y-1">
            <button
              onClick={() => onNavigate('account')}
              className={navItemClass(isActive('account'))}
            >
              <div className="flex items-center gap-3">
                <User className={navIconClass(isActive('account'))} />
                <span>{navT.compte_sub?.espace || 'Espace membre'}</span>
              </div>
            </button>
          </div>
        </div>

      </div>

      {/* 3. Footer Sidebar: Panier, Langue, Calculatrice, Compte */}
      <div className="p-4 border-t border-white/10 bg-[#0C1E18] space-y-2.5 shrink-0">
        
        {/* Cart & Account Line */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('cart')}
            className="flex items-center justify-between flex-1 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-xs font-semibold text-white/90 transition-colors cursor-pointer"
            id="sidebar-cart-btn"
          >
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-[#D97706]" />
              <span>Panier</span>
            </div>
            {cartCount > 0 ? (
              <span className="bg-[#D97706] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                {cartCount}
              </span>
            ) : (
              <span className="text-white/40 text-[11px]">0</span>
            )}
          </button>

          {user ? (
            <button
              onClick={() => onNavigate('account')}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-white/90 transition-colors cursor-pointer"
              title="Mon Compte"
              id="sidebar-account-btn"
            >
              <User className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={onOpenAuth}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-white/90 transition-colors cursor-pointer"
              title="Connexion"
              id="sidebar-login-btn"
            >
              <User className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Language Selector & Dilution Calculator */}
        <div className="flex items-center justify-between gap-2">
          <LanguageSelector lang={lang} setLang={setLang} variant="sidebar" />

          <button
            type="button"
            onClick={onOpenCalculator}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#1C3F34] hover:bg-[#255244] text-[11px] font-bold text-white border border-white/10 transition-all cursor-pointer shadow-xs"
            id="sidebar-calculator-btn"
            title="Calculateur de Dilution Botanique"
          >
            <Calculator className="w-3.5 h-3.5 text-[#D97706]" />
            <span>Calculatrice</span>
          </button>
        </div>

      </div>
    </aside>
  );
};

export default NavigationSidebar;
