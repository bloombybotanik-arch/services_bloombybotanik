import React from 'react';
import { Calculator, User, ShoppingBag } from 'lucide-react';
import { BloomLogo } from './ui/BloomLogo';
import { LanguageSelector } from './LanguageSelector';
import { Language } from '../translations';
import { View } from '../types';
import { User as FirebaseUser } from 'firebase/auth';
import { NavigationMenuTree } from './NavigationMenuTree';

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
  onOpenCalculator,
}) => {
  const calculatorTooltip =
    lang === 'fr'
      ? 'Calculateur de dilution (alcool 96° / eau)'
      : lang === 'de'
      ? 'Verdünnungsrechner (96° Alkohol / Wasser)'
      : 'Dilution calculator (96° alcohol / water)';

  return (
    <aside
      className="hidden md:flex flex-col w-[280px] lg:w-[320px] flex-shrink-0 h-full overflow-hidden z-40 bg-[#0F261E] text-[#F9F6F0] border-r border-white/10 select-none shadow-2xl"
      aria-label={
        lang === 'fr'
          ? 'Navigation principale'
          : lang === 'de'
          ? 'Hauptnavigation'
          : 'Main navigation'
      }
    >
      {/* 1. Header Lockup: Papillon + Bloom by BotaniK */}
      <div className="p-4 border-b border-white/10 shrink-0">
        <a
          href="/"
          onClick={(e) => {
            if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
              e.preventDefault();
              onNavigate('indexbis');
            }
          }}
          className="flex items-center gap-3 group cursor-pointer rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8772E]"
          aria-label="Bloom by BotaniK - Accueil"
        >
          <BloomLogo
            variant="sidebar"
            className="w-9 h-9 shrink-0 group-hover:scale-105 transition-transform"
          />
          <div className="flex flex-col leading-tight uppercase">
            <span className="text-[10px] font-bold tracking-[0.24em] text-white/60 group-hover:opacity-80 transition-opacity">
              Bloom by
            </span>
            <span className="text-lg font-black tracking-widest text-white group-hover:opacity-80 transition-opacity">
              BotaniK
            </span>
          </div>
        </a>
      </div>

      {/* 2. Independently Scrollable Navigation Tree */}
      <nav
        aria-label={
          lang === 'fr'
            ? 'Menu du site'
            : lang === 'de'
            ? 'Seitenmenü'
            : 'Site menu'
        }
        className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-3.5 py-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent"
      >
        <NavigationMenuTree
          currentView={currentView}
          onNavigate={onNavigate}
          lang={lang}
          variant="sidebar"
        />
      </nav>

      {/* 3. Persistent Utility Footer: Panier | Compte | Langue | Calculatrice */}
      <div className="p-3.5 border-t border-white/10 bg-[#0C1E18] space-y-2 shrink-0">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onNavigate('cart')}
            className="flex items-center justify-between flex-1 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-xs font-semibold text-white/90 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8772E]"
            id="sidebar-cart-btn"
          >
            <span className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-[#C8AB8A]" aria-hidden="true" />
              <span>{lang === 'fr' ? 'Panier' : lang === 'de' ? 'Warenkorb' : 'Cart'}</span>
            </span>
            {cartCount > 0 ? (
              <span className="bg-[#E8772E] text-white text-[10px] font-black px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                {cartCount}
              </span>
            ) : (
              <span className="text-white/40 text-[11px]">0</span>
            )}
          </button>

          {user ? (
            <button
              type="button"
              onClick={() => onNavigate('account')}
              className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-white/90 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8772E]"
              title={lang === 'fr' ? 'Mon Compte' : lang === 'de' ? 'Mein Konto' : 'My Account'}
              aria-label={lang === 'fr' ? 'Mon Compte' : lang === 'de' ? 'Mein Konto' : 'My Account'}
              id="sidebar-account-btn"
            >
              <User className="w-4 h-4" aria-hidden="true" />
            </button>
          ) : (
            <button
              type="button"
              onClick={onOpenAuth}
              className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-white/90 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8772E]"
              title={lang === 'fr' ? 'Connexion' : lang === 'de' ? 'Anmelden' : 'Login'}
              aria-label={lang === 'fr' ? 'Connexion' : lang === 'de' ? 'Anmelden' : 'Login'}
              id="sidebar-login-btn"
            >
              <User className="w-4 h-4" aria-hidden="true" />
            </button>
          )}
        </div>

        <div className="flex items-center justify-between gap-2">
          <LanguageSelector lang={lang} setLang={setLang} variant="sidebar" />

          <button
            type="button"
            onClick={onOpenCalculator}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-[#E8772E] hover:bg-[#D4651F] text-[11px] font-bold text-white transition-all cursor-pointer shadow-md shadow-orange-900/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            id="sidebar-calculator-btn"
            title={calculatorTooltip}
            aria-label={calculatorTooltip}
          >
            <Calculator className="w-3.5 h-3.5 text-white shrink-0" aria-hidden="true" />
            <span>{lang === 'fr' ? 'Calculatrice' : lang === 'de' ? 'Rechner' : 'Calculator'}</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default NavigationSidebar;