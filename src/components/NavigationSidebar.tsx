import React, { useState } from 'react';
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
  ShoppingBag,
  Package,
  Calculator,
  User,
  Star,
  HeartHandshake,
  GraduationCap,
  ChevronDown,
  ChevronRight,
  Layers,
  Lock
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
  const [isBloomAcademyOpen, setIsBloomAcademyOpen] = useState(true);
  const [isComprendreCorpsOpen, setIsComprendreCorpsOpen] = useState(true);
  const [isNeufAxesOpen, setIsNeufAxesOpen] = useState(false);
  const t = translations[lang] || translations.fr;

  const isActive = (view: View) => currentView === view;

  const navItemClass = (active: boolean) =>
    `flex items-center justify-between w-full px-3 py-1.5 rounded-xl text-xs font-medium transition-all group cursor-pointer ${
      active
        ? 'bg-[#1C3F34] text-white font-bold border border-white/10 shadow-xs'
        : 'text-white/70 hover:text-white hover:bg-white/5'
    }`;

  const navIconClass = (active: boolean) =>
    `w-3.5 h-3.5 shrink-0 transition-colors ${
      active ? 'text-[#D97706]' : 'text-white/40 group-hover:text-white/80'
    }`;

  return (
    <aside 
      className="hidden md:flex flex-col fixed top-0 left-0 bottom-0 w-[280px] bg-[#0F261E] text-white z-40 border-r border-white/10 select-none shadow-2xl"
      aria-label="Navigation principale"
    >
      {/* 1. Header Lockup: Papillon + Bloom by BotaniK */}
      <div className="p-4 border-b border-white/10">
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('indexbis');
          }}
          className="flex items-center gap-3 group cursor-pointer"
          aria-label="Bloom by BotaniK - Accueil"
        >
          <BloomLogo variant="sidebar" className="w-9 h-9 shrink-0 group-hover:scale-105 transition-transform" />
          <div className="flex flex-col leading-tight uppercase">
            <span className="text-[10px] font-bold tracking-[0.24em] text-white/70 group-hover:text-[#D97706] transition-colors">
              Bloom by
            </span>
            <span className="text-lg font-black tracking-widest text-white group-hover:text-[#D97706] transition-colors">
              BotaniK
            </span>
          </div>
        </a>
      </div>

      {/* 2. Scrollable Navigation Menu */}
      <div className="flex-1 overflow-y-auto px-3.5 py-4 space-y-5 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
        
        {/* GROUP 1: ACCUEIL */}
        <div>
          <button
            onClick={() => onNavigate('indexbis')}
            className={navItemClass(isActive('indexbis') || isActive('home'))}
          >
            <div className="flex items-center gap-2.5">
              <Home className={navIconClass(isActive('indexbis') || isActive('home'))} />
              <span className="font-semibold text-xs">{lang === 'fr' ? 'Accueil' : lang === 'de' ? 'Startseite' : 'Home'}</span>
            </div>
          </button>
        </div>

        {/* GROUP 2: POURQUOI BLOOM */}
        <div>
          <div className="text-[10px] font-black uppercase tracking-[0.22em] text-[#D97706] px-3 mb-1.5 flex items-center justify-between">
            <span>POURQUOI BLOOM</span>
          </div>
          <div className="space-y-0.5">
            <button
              onClick={() => onNavigate('la-marque')}
              className={navItemClass(isActive('la-marque') || isActive('manifeste'))}
            >
              <div className="flex items-center gap-2.5">
                <HeartHandshake className={navIconClass(isActive('la-marque') || isActive('manifeste'))} />
                <span>Histoire &amp; Philosophie</span>
              </div>
            </button>
          </div>
        </div>

        {/* GROUP 3: LA MÉTHODE A/B */}
        <div>
          <div className="text-[10px] font-black uppercase tracking-[0.22em] text-[#D97706] px-3 mb-1.5">
            LA MÉTHODE A/B
          </div>
          <div className="space-y-0.5">
            <button
              onClick={() => onNavigate('infusion-botanique')}
              className={navItemClass(isActive('infusion-botanique') || isActive('infusion-botanique-maison-comment-ca-marche'))}
            >
              <div className="flex items-center gap-2.5">
                <FlaskConical className={navIconClass(isActive('infusion-botanique'))} />
                <span>L'infusion botanique ?</span>
              </div>
            </button>
            <button
              onClick={() => onNavigate('totum-vegetal')}
              className={navItemClass(isActive('totum-vegetal'))}
            >
              <div className="flex items-center gap-2.5">
                <Leaf className={navIconClass(isActive('totum-vegetal'))} />
                <span>Le Totum Végétal</span>
              </div>
            </button>
            <button
              onClick={() => onNavigate('guide-complet')}
              className={navItemClass(isActive('guide-complet') || isActive('pillar-extraction') || isActive('extraction-botanique'))}
            >
              <div className="flex items-center gap-2.5">
                <BookOpen className={navIconClass(isActive('guide-complet'))} />
                <span>Guide de l'extraction</span>
              </div>
            </button>
          </div>
        </div>

        {/* GROUP 4: VOTRE PRATIQUE */}
        <div>
          <div className="text-[10px] font-black uppercase tracking-[0.22em] text-[#D97706] px-3 mb-1.5">
            VOTRE PRATIQUE
          </div>
          <div className="space-y-0.5">
            <button
              onClick={() => onNavigate('culinaire')}
              className={navItemClass(isActive('culinaire'))}
            >
              <div className="flex items-center gap-2.5">
                <Utensils className={navIconClass(isActive('culinaire'))} />
                <span>Atelier Culinaire</span>
              </div>
            </button>
            <button
              onClick={() => onNavigate('cosmetiques')}
              className={navItemClass(isActive('cosmetiques'))}
            >
              <div className="flex items-center gap-2.5">
                <Droplets className={navIconClass(isActive('cosmetiques'))} />
                <span>Cosmétique Botanique</span>
              </div>
            </button>
            <button
              onClick={() => onNavigate('phytotherapie-reset')}
              className={navItemClass(isActive('phytotherapie-reset') || isActive('votre-pratique') || isActive('parcours'))}
            >
              <div className="flex items-center gap-2.5">
                <Activity className={navIconClass(isActive('phytotherapie-reset') || isActive('votre-pratique') || isActive('parcours'))} />
                <span>Reset Homéostasique</span>
              </div>
            </button>
          </div>
        </div>

        {/* GROUP 5: BOUTIQUE */}
        <div>
          <div className="text-[10px] font-black uppercase tracking-[0.22em] text-[#D97706] px-3 mb-1.5">
            BOUTIQUE
          </div>
          <div className="space-y-0.5">
            <a
              href="/bloomlab/"
              onClick={(e) => {
                if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                  e.preventDefault();
                  onNavigate('machine');
                }
              }}
              className={navItemClass(isActive('machine') || isActive('bloomlab'))}
            >
              <div className="flex items-center gap-2.5">
                <Sparkles className={navIconClass(isActive('machine') || isActive('bloomlab'))} />
                <span>BloomLab®</span>
              </div>
            </a>
            <button
              onClick={() => onNavigate('boutique-kits')}
              className={navItemClass(isActive('boutique-kits'))}
            >
              <div className="flex items-center gap-2.5">
                <Package className={navIconClass(isActive('boutique-kits'))} />
                <span>Packs</span>
              </div>
            </button>
            <button
              onClick={() => onNavigate('boutique')}
              className={navItemClass(isActive('boutique'))}
            >
              <div className="flex items-center gap-2.5">
                <ShoppingBag className={navIconClass(isActive('boutique'))} />
                <span>Accessoires</span>
              </div>
            </button>
            <a
              href="/boutique/duo-argiles/"
              onClick={(e) => {
                if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                  e.preventDefault();
                  onNavigate('product-detail', 'duo-argiles');
                }
              }}
              className={navItemClass(isActive('product-detail'))}
            >
              <div className="flex items-center gap-2.5">
                <Leaf className={navIconClass(false)} />
                <span>Argiles &amp; Matières Premières</span>
              </div>
            </a>
            {/* Abonnements numériques (placé dans Boutique après Argiles & Matières Premières) */}
            <a
              href="/boutique/abonnements-numeriques/"
              onClick={(e) => {
                if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                  e.preventDefault();
                  onNavigate('abonnement');
                }
              }}
              className={navItemClass(isActive('abonnement') || isActive('premium-info') || isActive('abonnements-numeriques'))}
              title={lang === 'fr' ? 'Abonnements numériques' : lang === 'de' ? 'Digitale Abonnements' : 'Digital Subscriptions'}
            >
              <div className="flex items-center gap-2.5">
                <Star className={navIconClass(isActive('abonnement') || isActive('premium-info') || isActive('abonnements-numeriques'))} />
                <span className="font-semibold text-[#D97706]">
                  {lang === 'fr' ? 'Abonnements numériques' : lang === 'de' ? 'Digitale Abonnements' : 'Digital Subscriptions'}
                </span>
              </div>
              <span className="text-[8px] uppercase px-1.5 py-0.5 rounded bg-[#D97706]/20 text-[#D97706] font-bold shrink-0">
                Abo
              </span>
            </a>
          </div>
        </div>

        {/* GROUP 6: RESSOURCES */}
        <div>
          <div className="text-[10px] font-black uppercase tracking-[0.22em] text-[#D97706] px-3 mb-1.5 flex items-center justify-between">
            <span>{lang === 'fr' ? 'RESSOURCES' : lang === 'de' ? 'RESSOURCEN' : 'RESOURCES'}</span>
          </div>
          <div className="space-y-0.5">
            <button
              onClick={() => onNavigate('herbier')}
              className={navItemClass(isActive('herbier') || isActive('library') || isActive('herbarium'))}
            >
              <div className="flex items-center gap-2.5">
                <BookOpen className={navIconClass(isActive('herbier') || isActive('library') || isActive('herbarium'))} />
                <span>{lang === 'fr' ? "L'Herbier" : lang === 'de' ? 'Das Herbarium' : 'The Herbarium'}</span>
              </div>
            </button>
            <button
              onClick={() => onNavigate('lexique')}
              className={navItemClass(isActive('lexique'))}
            >
              <div className="flex items-center gap-2.5">
                <BookOpen className={navIconClass(isActive('lexique'))} />
                <span>{lang === 'fr' ? 'Lexique Botanik' : lang === 'de' ? 'Botanik-Glossar' : 'Botanik Glossary'}</span>
              </div>
            </button>
          </div>
        </div>

        {/* GROUP 7: BLOOM ACADEMY (LIEN AVEC ICÔNE EN JAUNE + SOUS-MENU DÉROULANT) */}
        <div>
          <div className="flex items-center justify-between gap-1 mb-1">
            <a
              href="/academie/"
              onClick={(e) => {
                if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                  e.preventDefault();
                  onNavigate('academie');
                }
              }}
              className={`flex-1 flex items-center justify-between px-3 py-2 rounded-xl border transition-all text-xs font-bold cursor-pointer group ${
                isActive('academie') 
                  ? 'bg-[#FACC15]/20 text-[#FACC15] border-[#FACC15]/50 shadow-xs' 
                  : 'bg-[#FACC15]/10 hover:bg-[#FACC15]/15 text-[#FACC15] border-[#FACC15]/25 hover:border-[#FACC15]/40'
              }`}
              title={lang === 'fr' ? 'Accéder à Bloom Academy' : lang === 'de' ? 'Zur Bloom Academy' : 'Go to Bloom Academy'}
            >
              <span className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-[#FACC15] shrink-0" />
                <span className="font-bold text-[#FACC15] tracking-wide">Bloom Academy</span>
              </span>
              <span className="text-[8px] uppercase px-1.5 py-0.5 rounded-full bg-[#FACC15]/20 text-[#FACC15] font-bold border border-[#FACC15]/30">
                {lang === 'fr' ? 'Pédagogie' : lang === 'de' ? 'Pädagogik' : 'Pedagogy'}
              </span>
            </a>
            <button
              type="button"
              onClick={() => setIsBloomAcademyOpen(!isBloomAcademyOpen)}
              className="p-2 rounded-xl text-[#FACC15] hover:bg-[#FACC15]/15 border border-[#FACC15]/25 transition-colors cursor-pointer shrink-0"
              title={lang === 'fr' ? 'Déplier/Replier Bloom Academy' : lang === 'de' ? 'Bloom Academy ein-/ausblenden' : 'Toggle Bloom Academy'}
              aria-expanded={isBloomAcademyOpen}
            >
              {isBloomAcademyOpen ? (
                <ChevronDown className="w-4 h-4 text-[#FACC15]" />
              ) : (
                <ChevronRight className="w-4 h-4 text-[#FACC15]" />
              )}
            </button>
          </div>

          {isBloomAcademyOpen && (
            <div className="space-y-0.5">
              {/* Lien Accueil */}
              <a
                href="/academie/"
                onClick={(e) => {
                  if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                    e.preventDefault();
                    onNavigate('academie');
                  }
                }}
                className={navItemClass(isActive('academie'))}
              >
                <div className="flex items-center gap-2.5">
                  <Home className="w-3.5 h-3.5 shrink-0 text-[#FAF7F2]/70" />
                  <span className={isActive('academie') ? 'text-white font-bold' : 'text-[#FAF7F2]/90 font-medium'}>
                    {lang === 'fr' ? 'Accueil' : lang === 'de' ? 'Startseite' : 'Home'}
                  </span>
                </div>
              </a>

              {/* Menu Déroulant: COMPRENDRE LE CORPS */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setIsComprendreCorpsOpen(!isComprendreCorpsOpen)}
                  className="flex items-center justify-between w-full px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-[0.2em] text-[#c9a84c] hover:bg-white/5 transition-colors cursor-pointer group"
                  aria-expanded={isComprendreCorpsOpen}
                  title={lang === 'fr' ? 'Afficher/Masquer Comprendre le corps' : lang === 'de' ? 'Den Körper verstehen ein-/ausblenden' : 'Toggle Understanding the body'}
                >
                  <span className="flex items-center gap-1.5">
                    <Layers className="w-3 h-3 text-[#c9a84c]" />
                    <span>{lang === 'fr' ? 'COMPRENDRE LE CORPS' : lang === 'de' ? 'DEN KÖRPER VERSTEHEN' : 'UNDERSTANDING THE BODY'}</span>
                  </span>
                  {isComprendreCorpsOpen ? (
                    <ChevronDown className="w-3.5 h-3.5 text-[#c9a84c]/80 group-hover:text-[#c9a84c]" />
                  ) : (
                    <ChevronRight className="w-3.5 h-3.5 text-[#c9a84c]/80 group-hover:text-[#c9a84c]" />
                  )}
                </button>

                {isComprendreCorpsOpen && (
                  <div className="space-y-0.5 mt-0.5">
                    {/* 1. Comment lire le modèle Bloom (SEUL MODULE GRATUIT) */}
                    <button
                      onClick={() => onNavigate('comment-lire-modele-bloom')}
                      className={navItemClass(isActive('comment-lire-modele-bloom'))}
                      title={lang === 'fr' ? 'Comment lire le modèle Bloom (Accès Libre & Gratuit)' : lang === 'de' ? 'Wie man das Bloom-Modell liest (Kostenlos)' : 'How to read the Bloom model (Free)'}
                    >
                      <div className="flex items-center gap-2 pl-2 overflow-hidden text-left">
                        <span className="text-[#8b949e] font-mono text-[11px] shrink-0">├──</span>
                        <span className="truncate text-[11px]">
                          {lang === 'fr' ? 'Comment lire le modèle Bloom' : lang === 'de' ? 'Wie man das Bloom-Modell liest' : 'How to read the Bloom model'}
                        </span>
                      </div>
                      <span className="text-[8px] uppercase px-1 py-0.2 rounded bg-emerald-500/20 text-emerald-400 font-bold shrink-0 border border-emerald-500/30">
                        {lang === 'fr' ? 'Gratuit' : lang === 'de' ? 'Gratis' : 'Free'}
                      </span>
                    </button>

                    {/* 2. Les 4 Architectures (Payant / Abonnement) */}
                    <button
                      onClick={() => onNavigate('4-architectures')}
                      className={navItemClass(isActive('4-architectures'))}
                      title={lang === 'fr' ? 'Les 4 Architectures (Abonnement)' : lang === 'de' ? 'Die 4 Architekturen (Abonnement)' : 'The 4 Architectures (Subscription)'}
                    >
                      <div className="flex items-center gap-2 pl-2 overflow-hidden text-left">
                        <span className="text-[#8b949e] font-mono text-[11px] shrink-0">├──</span>
                        <span className="truncate text-[11px]">
                          {lang === 'fr' ? 'Les 4 Architectures' : lang === 'de' ? 'Die 4 Architekturen' : 'The 4 Architectures'}
                        </span>
                      </div>
                      <Lock className="w-3 h-3 text-[#c9a84c]/80 shrink-0" />
                    </button>

                    {/* 3. Les 7 Terrains (Payant / Abonnement) */}
                    <button
                      onClick={() => onNavigate('terrain')}
                      className={navItemClass(isActive('terrain') || isActive('7-terrains'))}
                      title={lang === 'fr' ? 'Les 7 Terrains (Abonnement)' : lang === 'de' ? 'Die 7 Terrains (Abonnement)' : 'The 7 Terrains (Subscription)'}
                    >
                      <div className="flex items-center gap-2 pl-2 overflow-hidden text-left">
                        <span className="text-[#8b949e] font-mono text-[11px] shrink-0">├──</span>
                        <span className="truncate text-[11px]">
                          {lang === 'fr' ? 'Les 7 Terrains' : lang === 'de' ? 'Die 7 Terrains' : 'The 7 Terrains'}
                        </span>
                      </div>
                      <Lock className="w-3 h-3 text-[#c9a84c]/80 shrink-0" />
                    </button>

                    {/* 4. Les 9 Axes historiques (Menu Déroulant) */}
                    <div>
                      <button
                        type="button"
                        onClick={() => setIsNeufAxesOpen(!isNeufAxesOpen)}
                        className={navItemClass(
                          isActive('9-axes') || 
                          isActive('neuf-axes-historiques') ||
                          isActive('module-0') ||
                          isActive('axe-a1') ||
                          isActive('axe-a2') ||
                          isActive('axe-a3') ||
                          isActive('axe-a4') ||
                          isActive('axe-a5') ||
                          isActive('axe-a6') ||
                          isActive('axe-a7') ||
                          isActive('axe-a8') ||
                          isActive('axe-a9')
                        )}
                        aria-expanded={isNeufAxesOpen}
                        title={lang === 'fr' ? 'Déplier/Replier les 9 Axes historiques' : 'Toggle 9 Historical Axes'}
                      >
                        <div className="flex items-center gap-2 pl-2 overflow-hidden text-left">
                          <span className="text-[#8b949e] font-mono text-[11px] shrink-0">├──</span>
                          <span className="truncate text-[11px]">
                            {lang === 'fr' ? 'Les 9 Axes historiques' : lang === 'de' ? 'Die 9 Historischen Achsen' : 'The 9 Historical Axes'}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <Lock className="w-3 h-3 text-[#c9a84c]/80" />
                          {isNeufAxesOpen ? (
                            <ChevronDown className="w-3 h-3 text-[#c9a84c]" />
                          ) : (
                            <ChevronRight className="w-3 h-3 text-[#c9a84c]" />
                          )}
                        </div>
                      </button>

                      {isNeufAxesOpen && (
                        <div className="space-y-0.5 mt-0.5 pl-3 border-l-2 border-[#c9a84c]/30 ml-3">
                          {/* Vue d'ensemble */}
                          <button
                            onClick={() => onNavigate('9-axes')}
                            className={navItemClass(isActive('9-axes') || isActive('neuf-axes-historiques'))}
                          >
                            <div className="flex items-center gap-2 pl-1 overflow-hidden text-left">
                              <span className="text-[#c9a84c] font-mono text-[10px] shrink-0">├─</span>
                              <span className="truncate text-[10.5px] text-white/90">
                                {lang === 'fr' ? "Vue d'ensemble (9 axes)" : "9 Axes Overview"}
                              </span>
                            </div>
                          </button>

                          {/* Module 0 */}
                          <button
                            onClick={() => onNavigate('module-0')}
                            className={navItemClass(isActive('module-0'))}
                          >
                            <div className="flex items-center gap-2 pl-1 overflow-hidden text-left">
                              <span className="text-[#c9a84c] font-mono text-[10px] shrink-0">├─</span>
                              <span className="truncate text-[10.5px] text-[#c9a84c] font-medium">
                                {lang === 'fr' ? 'Module 0 : Paradigme' : 'Module 0 : Paradigm'}
                              </span>
                            </div>
                            <Lock className="w-2.5 h-2.5 text-[#c9a84c]/80 shrink-0" />
                          </button>

                          {/* Axe A1 */}
                          <button
                            onClick={() => onNavigate('axe-a1')}
                            className={navItemClass(isActive('axe-a1'))}
                          >
                            <div className="flex items-center gap-2 pl-1 overflow-hidden text-left">
                              <span className="text-[#c9a84c] font-mono text-[10px] shrink-0">├─</span>
                              <span className="truncate text-[10.5px] text-[#86efac]">
                                {lang === 'fr' ? 'A1 : Émonctoires' : 'A1 : Emunctories'}
                              </span>
                            </div>
                            <Lock className="w-2.5 h-2.5 text-[#c9a84c]/80 shrink-0" />
                          </button>

                          {/* Axe A2 */}
                          <button
                            onClick={() => onNavigate('axe-a2')}
                            className={navItemClass(isActive('axe-a2'))}
                          >
                            <div className="flex items-center gap-2 pl-1 overflow-hidden text-left">
                              <span className="text-[#c9a84c] font-mono text-[10px] shrink-0">├─</span>
                              <span className="truncate text-[10.5px] text-white/80">
                                {lang === 'fr' ? 'A2 : Barrière Intestinale' : 'A2 : Gut Barrier'}
                              </span>
                            </div>
                            <Lock className="w-2.5 h-2.5 text-[#c9a84c]/80 shrink-0" />
                          </button>

                          {/* Axe A3 */}
                          <button
                            onClick={() => onNavigate('axe-a3')}
                            className={navItemClass(isActive('axe-a3'))}
                          >
                            <div className="flex items-center gap-2 pl-1 overflow-hidden text-left">
                              <span className="text-[#c9a84c] font-mono text-[10px] shrink-0">├─</span>
                              <span className="truncate text-[10.5px] text-white/80">
                                {lang === 'fr' ? 'A3 : Axe HPA & Stress' : 'A3 : HPA Axis'}
                              </span>
                            </div>
                            <Lock className="w-2.5 h-2.5 text-[#c9a84c]/80 shrink-0" />
                          </button>

                          {/* Axe A4 */}
                          <button
                            onClick={() => onNavigate('axe-a4')}
                            className={navItemClass(isActive('axe-a4'))}
                          >
                            <div className="flex items-center gap-2 pl-1 overflow-hidden text-left">
                              <span className="text-[#c9a84c] font-mono text-[10px] shrink-0">├─</span>
                              <span className="truncate text-[10.5px] text-white/80">
                                {lang === 'fr' ? 'A4 : Inflammation & SPMs' : 'A4 : Inflammation'}
                              </span>
                            </div>
                            <Lock className="w-2.5 h-2.5 text-[#c9a84c]/80 shrink-0" />
                          </button>

                          {/* Axe A5 */}
                          <button
                            onClick={() => onNavigate('axe-a5')}
                            className={navItemClass(isActive('axe-a5'))}
                          >
                            <div className="flex items-center gap-2 pl-1 overflow-hidden text-left">
                              <span className="text-[#c9a84c] font-mono text-[10px] shrink-0">├─</span>
                              <span className="truncate text-[10.5px] text-white/80">
                                {lang === 'fr' ? 'A5 : Mitochondries & ATP' : 'A5 : Mitochondria'}
                              </span>
                            </div>
                            <Lock className="w-2.5 h-2.5 text-[#c9a84c]/80 shrink-0" />
                          </button>

                          {/* Axe A6 */}
                          <button
                            onClick={() => onNavigate('axe-a6')}
                            className={navItemClass(isActive('axe-a6'))}
                          >
                            <div className="flex items-center gap-2 pl-1 overflow-hidden text-left">
                              <span className="text-[#c9a84c] font-mono text-[10px] shrink-0">├─</span>
                              <span className="truncate text-[10.5px] text-white/80">
                                {lang === 'fr' ? 'A6 : Tonus Vagal (SNA)' : 'A6 : Vagal Tone'}
                              </span>
                            </div>
                            <Lock className="w-2.5 h-2.5 text-[#c9a84c]/80 shrink-0" />
                          </button>

                          {/* Axe A7 */}
                          <button
                            onClick={() => onNavigate('axe-a7')}
                            className={navItemClass(isActive('axe-a7'))}
                          >
                            <div className="flex items-center gap-2 pl-1 overflow-hidden text-left">
                              <span className="text-[#c9a84c] font-mono text-[10px] shrink-0">├─</span>
                              <span className="truncate text-[10.5px] text-white/80">
                                {lang === 'fr' ? 'A7 : Matrice & Fascia' : 'A7 : Fascial Matrix'}
                              </span>
                            </div>
                            <Lock className="w-2.5 h-2.5 text-[#c9a84c]/80 shrink-0" />
                          </button>

                          {/* Axe A8 */}
                          <button
                            onClick={() => onNavigate('axe-a8')}
                            className={navItemClass(isActive('axe-a8'))}
                          >
                            <div className="flex items-center gap-2 pl-1 overflow-hidden text-left">
                              <span className="text-[#c9a84c] font-mono text-[10px] shrink-0">├─</span>
                              <span className="truncate text-[10.5px] text-white/80">
                                {lang === 'fr' ? 'A8 : Microbiote & Butyrate' : 'A8 : Microbiome'}
                              </span>
                            </div>
                            <Lock className="w-2.5 h-2.5 text-[#c9a84c]/80 shrink-0" />
                          </button>

                          {/* Axe A9 */}
                          <button
                            onClick={() => onNavigate('axe-a9')}
                            className={navItemClass(isActive('axe-a9'))}
                          >
                            <div className="flex items-center gap-2 pl-1 overflow-hidden text-left">
                              <span className="text-[#c9a84c] font-mono text-[10px] shrink-0">└─</span>
                              <span className="truncate text-[10.5px] text-white/80">
                                {lang === 'fr' ? 'A9 : Système EndoCannabinoïde' : 'A9 : Endocannabinoid'}
                              </span>
                            </div>
                            <Lock className="w-2.5 h-2.5 text-[#c9a84c]/80 shrink-0" />
                          </button>
                        </div>
                      )}
                    </div>

                    {/* 5. La Charge Allostatique (Payant / Abonnement) */}
                    <button
                      onClick={() => onNavigate('charge-allostatique')}
                      className={navItemClass(isActive('charge-allostatique'))}
                      title={lang === 'fr' ? 'La Charge Allostatique (Abonnement)' : lang === 'de' ? 'Die Allostatische Last (Abonnement)' : 'The Allostatic Load (Subscription)'}
                    >
                      <div className="flex items-center gap-2 pl-2 overflow-hidden text-left">
                        <span className="text-[#8b949e] font-mono text-[11px] shrink-0">├──</span>
                        <span className="truncate text-[11px]">
                          {lang === 'fr' ? 'La Charge Allostatique' : lang === 'de' ? 'Die Allostatische Last' : 'The Allostatic Load'}
                        </span>
                      </div>
                      <Lock className="w-3 h-3 text-[#c9a84c]/80 shrink-0" />
                    </button>

                    {/* 6. Le Reset Homéostasique (Payant / Abonnement) */}
                    <button
                      onClick={() => onNavigate('phytotherapie-reset')}
                      className={navItemClass(isActive('phytotherapie-reset') || isActive('reset-homeostasique'))}
                      title={lang === 'fr' ? 'Le Reset Homéostasique (Abonnement)' : lang === 'de' ? 'Der Homöostatische Reset (Abonnement)' : 'The Homeostatic Reset (Subscription)'}
                    >
                      <div className="flex items-center gap-2 pl-2 overflow-hidden text-left">
                        <span className="text-[#8b949e] font-mono text-[11px] shrink-0">├──</span>
                        <span className="truncate text-[11px]">
                          {lang === 'fr' ? 'Le Reset Homéostasique' : lang === 'de' ? 'Der Homöostatische Reset' : 'The Homeostatic Reset'}
                        </span>
                      </div>
                      <Lock className="w-3 h-3 text-[#c9a84c]/80 shrink-0" />
                    </button>

                    {/* 7. Protocoles Systémiques (remis après Reset Homeostasique - Payant / Abonnement) */}
                    <button
                      onClick={() => onNavigate('protocoles')}
                      className={navItemClass(isActive('protocoles'))}
                      title={lang === 'fr' ? 'Protocoles Systémiques (Abonnement)' : lang === 'de' ? 'Systemische Protokolle (Abonnement)' : 'Systemic Protocols (Subscription)'}
                    >
                      <div className="flex items-center gap-2 pl-2 overflow-hidden text-left">
                        <span className="text-[#8b949e] font-mono text-[11px] shrink-0">├──</span>
                        <span className="truncate text-[11px]">
                          {lang === 'fr' ? 'Protocoles Systémiques' : lang === 'de' ? 'Systemische Protokolle' : 'Systemic Protocols'}
                        </span>
                      </div>
                      <Lock className="w-3 h-3 text-[#c9a84c]/80 shrink-0" />
                    </button>

                    {/* 8. Métabolisme et insuline (placé après Protocoles Systémiques, écrit en jaune doré, Payant) */}
                    <button
                      onClick={() => onNavigate('metabolisme-insuline')}
                      className={`${navItemClass(isActive('metabolisme-insuline'))} hover:bg-[#F59E0B]/10`}
                      title={lang === 'fr' ? 'Métabolisme glucidique & insuline (Abonnement)' : lang === 'de' ? 'Stoffwechsel & Insulin (Abonnement)' : 'Metabolism & Insulin (Subscription)'}
                    >
                      <div className="flex items-center gap-2 pl-2 overflow-hidden text-left">
                        <span className="text-[#F59E0B] font-mono text-[11px] shrink-0">├──</span>
                        <span className="truncate text-[11px] text-[#F59E0B] font-black drop-shadow-[0_0_8px_rgba(245,158,11,0.3)]">
                          {lang === 'fr' ? 'Métabolisme & insuline' : lang === 'de' ? 'Stoffwechsel & Insulin' : 'Metabolism & Insulin'}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <span className="text-[8px] uppercase px-1 py-0.2 rounded bg-[#F59E0B]/20 text-[#F59E0B] font-bold border border-[#F59E0B]/30">
                          {lang === 'fr' ? 'Nouveau' : lang === 'de' ? 'Neu' : 'New'}
                        </span>
                        <Lock className="w-3 h-3 text-[#F59E0B] shrink-0" />
                      </div>
                    </button>

                    {/* 9. Autres modules prévus */}
                    <a
                      href="/academie/#comprendre-le-corps"
                      onClick={(e) => {
                        if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                          e.preventDefault();
                          onNavigate('academie');
                          setTimeout(() => {
                            const el = document.getElementById('comprendre-le-corps');
                            if (el) el.scrollIntoView({ behavior: 'smooth' });
                          }, 100);
                        }
                      }}
                      className={navItemClass(false)}
                      title={lang === 'fr' ? 'Autres modules prévus' : lang === 'de' ? 'Weitere geplante Module' : 'Other planned modules'}
                    >
                      <div className="flex items-center gap-2 pl-2 overflow-hidden text-left">
                        <span className="text-[#8b949e] font-mono text-[11px] shrink-0">└──</span>
                        <span className="truncate text-[11px] text-white/60 italic">
                          {lang === 'fr' ? 'Autres modules prévus' : lang === 'de' ? 'Weitere geplante Module' : 'Other planned modules'}
                        </span>
                      </div>
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 3. Footer Sidebar: Panier, Langue, Calculatrice, Compte */}
      <div className="p-3.5 border-t border-white/10 bg-[#0C1E18] space-y-2 shrink-0">
        
        {/* Cart & Account Line */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('cart')}
            className="flex items-center justify-between flex-1 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-xs font-semibold text-white/90 transition-colors cursor-pointer"
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
              className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-white/90 transition-colors cursor-pointer"
              title="Mon Compte"
              id="sidebar-account-btn"
            >
              <User className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={onOpenAuth}
              className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-white/90 transition-colors cursor-pointer"
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
            className="flex-1 flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-[#1C3F34] hover:bg-[#255244] text-[11px] font-bold text-white border border-white/10 transition-all cursor-pointer shadow-xs"
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
