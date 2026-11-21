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
import { View, VIEW_PATHS } from '../types';
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
    `flex items-center justify-between w-full px-3 py-1.5 rounded-xl text-xs font-semibold transition-all group cursor-pointer whitespace-nowrap overflow-hidden ${
      active
        ? 'bg-white/10 text-white font-bold border border-white/20 shadow-xs'
        : 'text-white/80 hover:text-white hover:bg-white/10'
    }`;

  const navIconClass = (active: boolean) =>
    `w-3.5 h-3.5 shrink-0 transition-colors ${
      active ? 'text-[#E8772E]' : 'text-white/60 group-hover:text-white'
    }`;

  return (
    <aside 
      className="hidden md:flex flex-col w-[280px] lg:w-[320px] flex-shrink-0 h-full overflow-y-auto overflow-x-hidden z-40 bg-[#0F261E] text-[#F9F6F0] border-r border-white/10 select-none shadow-2xl"
      aria-label="Navigation principale"
    >
      {/* 1. Header Lockup: Papillon + Bloom by BotaniK */}
      <div className="p-4 border-b border-white/10 shrink-0">
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
            <span className="text-[10px] font-bold tracking-[0.24em] text-white/60 group-hover:opacity-80 transition-opacity">
              Bloom by
            </span>
            <span className="text-lg font-black tracking-widest text-white group-hover:opacity-80 transition-opacity">
              BotaniK
            </span>
          </div>
        </a>
      </div>

      {/* 2. Scrollable Navigation Menu */}
      <div className="flex-1 overflow-y-auto px-3.5 py-4 space-y-5 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
        
        {/* GROUP 1: ACCUEIL */}
        <div>
          <a
            href="/"
            onClick={(e) => {
              if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                e.preventDefault();
                onNavigate('indexbis');
              }
            }}
            className={navItemClass(isActive('indexbis') || isActive('home'))}
          >
            <div className="flex items-center gap-2.5 min-w-0 overflow-hidden">
              <Home className={navIconClass(isActive('indexbis') || isActive('home'))} />
              <span className="font-semibold text-xs truncate whitespace-nowrap">{lang === 'fr' ? 'Accueil' : lang === 'de' ? 'Startseite' : 'Home'}</span>
            </div>
          </a>
        </div>

        {/* GROUP 2: POURQUOI BLOOM */}
        <div>
          <div className="text-[10px] font-black uppercase tracking-[0.22em] text-[#E8772E] px-3 mb-1.5 flex items-center justify-between">
            <span className="truncate whitespace-nowrap">
              {lang === 'fr' ? 'POURQUOI BLOOM' : lang === 'de' ? 'WARUM BLOOM' : 'WHY BLOOM'}
            </span>
          </div>
          <div className="space-y-0.5">
            <a
              href={VIEW_PATHS['la-marque']}
              onClick={(e) => {
                if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                  e.preventDefault();
                  onNavigate('la-marque');
                }
              }}
              className={navItemClass(isActive('la-marque') || isActive('manifeste'))}
            >
              <div className="flex items-center gap-2.5 min-w-0 overflow-hidden">
                <HeartHandshake className={navIconClass(isActive('la-marque') || isActive('manifeste'))} />
                <span className="truncate whitespace-nowrap">
                  {lang === 'fr' ? 'Histoire & Philosophie' : lang === 'de' ? 'Geschichte & Philosophie' : 'Story & Philosophy'}
                </span>
              </div>
            </a>
          </div>
        </div>

        {/* GROUP 3: LA MÉTHODE A/B */}
        <div>
          <div className="text-[10px] font-black uppercase tracking-[0.22em] text-[#E8772E] px-3 mb-1.5">
            <span className="truncate whitespace-nowrap">
              {lang === 'fr' ? 'LA MÉTHODE A/B' : lang === 'de' ? 'DIE A/B-METHODE' : 'THE A/B METHOD'}
            </span>
          </div>
          <div className="space-y-0.5">
            <a
              href={VIEW_PATHS['infusion-botanique']}
              onClick={(e) => {
                if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                  e.preventDefault();
                  onNavigate('infusion-botanique');
                }
              }}
              className={navItemClass(isActive('infusion-botanique') || isActive('infusion-botanique-maison-comment-ca-marche'))}
            >
              <div className="flex items-center gap-2.5 min-w-0 overflow-hidden">
                <FlaskConical className={navIconClass(isActive('infusion-botanique'))} />
                <span className="truncate whitespace-nowrap">
                  {lang === 'fr' ? 'Infusion Botanique' : lang === 'de' ? 'Botanische Infusion' : 'Botanical Infusion'}
                </span>
              </div>
            </a>
            <a
              href={VIEW_PATHS['totum-vegetal']}
              onClick={(e) => {
                if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                  e.preventDefault();
                  onNavigate('totum-vegetal');
                }
              }}
              className={navItemClass(isActive('totum-vegetal'))}
            >
              <div className="flex items-center gap-2.5 min-w-0 overflow-hidden">
                <Leaf className={navIconClass(isActive('totum-vegetal'))} />
                <span className="truncate whitespace-nowrap">
                  {lang === 'fr' ? 'Totum Végétal' : lang === 'de' ? 'Pflanzen-Totum' : 'Plant Totum'}
                </span>
              </div>
            </a>
            <a
              href={VIEW_PATHS['guide-complet']}
              onClick={(e) => {
                if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                  e.preventDefault();
                  onNavigate('guide-complet');
                }
              }}
              className={navItemClass(isActive('guide-complet') || isActive('pillar-extraction') || isActive('extraction-botanique'))}
            >
              <div className="flex items-center gap-2.5 min-w-0 overflow-hidden">
                <BookOpen className={navIconClass(isActive('guide-complet'))} />
                <span className="truncate whitespace-nowrap">
                  {lang === 'fr' ? 'Extraction Végétale' : lang === 'de' ? 'Pflanzenextraktion' : 'Plant Extraction'}
                </span>
              </div>
            </a>
            <a
              href={VIEW_PATHS['guide-solvants']}
              onClick={(e) => {
                if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                  e.preventDefault();
                  onNavigate('guide-solvants');
                }
              }}
              className={navItemClass(isActive('guide-solvants'))}
            >
              <div className="flex items-center gap-2.5 min-w-0 overflow-hidden">
                <Droplets className={navIconClass(isActive('guide-solvants'))} />
                <span className="truncate whitespace-nowrap">
                  {lang === 'fr' ? 'Teintures & Solvants' : lang === 'de' ? 'Tinkturen & Lösungsmittel' : 'Tinctures & Solvents'}
                </span>
              </div>
            </a>
          </div>
        </div>

        {/* GROUP 4: VOTRE PRATIQUE */}
        <div>
          <div className="text-[10px] font-black uppercase tracking-[0.22em] text-[#E8772E] px-3 mb-1.5">
            <span className="truncate whitespace-nowrap">
              {lang === 'fr' ? 'VOTRE PRATIQUE' : lang === 'de' ? 'IHRE PRAXIS' : 'YOUR PRACTICE'}
            </span>
          </div>
          <div className="space-y-0.5">
            <a
              href={VIEW_PATHS['culinaire']}
              onClick={(e) => {
                if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                  e.preventDefault();
                  onNavigate('culinaire');
                }
              }}
              className={navItemClass(isActive('culinaire'))}
            >
              <div className="flex items-center gap-2.5 min-w-0 overflow-hidden">
                <Utensils className={navIconClass(isActive('culinaire'))} />
                <span className="truncate whitespace-nowrap">
                  {lang === 'fr' ? 'Cuisine Botanique' : lang === 'de' ? 'Botanische Küche' : 'Botanical Cuisine'}
                </span>
              </div>
            </a>
            <a
              href="/recettes/culinaires/soupe-beaute-tremella/"
              onClick={(e) => {
                if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                  e.preventDefault();
                  onNavigate('recette-soupe-tremella');
                }
              }}
              className={navItemClass(isActive('recette-soupe-tremella'))}
            >
              <div className="flex items-center gap-2.5 min-w-0 overflow-hidden pl-3">
                <Sparkles className={navIconClass(isActive('recette-soupe-tremella'))} />
                <span className="truncate whitespace-nowrap">
                  {lang === 'en'
                    ? 'Tremella Beauty Soup'
                    : lang === 'de'
                    ? 'Tremella Schönheitssuppe'
                    : 'Soupe Beauté Tremella'}
                </span>
              </div>
            </a>
            <a
              href={VIEW_PATHS['cosmetiques']}
              onClick={(e) => {
                if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                  e.preventDefault();
                  onNavigate('cosmetiques');
                }
              }}
              className={navItemClass(isActive('cosmetiques'))}
            >
              <div className="flex items-center gap-2.5 min-w-0 overflow-hidden">
                <Droplets className={navIconClass(isActive('cosmetiques'))} />
                <span className="truncate whitespace-nowrap">
                  {lang === 'fr' ? 'Cosmétique Maison' : lang === 'de' ? 'Naturkosmetik DIY' : 'Homemade Cosmetics'}
                </span>
              </div>
            </a>
            <a
              href={VIEW_PATHS['phytotherapie-reset']}
              onClick={(e) => {
                if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                  e.preventDefault();
                  onNavigate('phytotherapie-reset');
                }
              }}
              className={navItemClass(isActive('phytotherapie-reset') || isActive('votre-pratique') || isActive('parcours'))}
            >
              <div className="flex items-center gap-2.5 min-w-0 overflow-hidden">
                <Activity className={navIconClass(isActive('phytotherapie-reset') || isActive('votre-pratique') || isActive('parcours'))} />
                <span className="truncate whitespace-nowrap">
                  {lang === 'fr' ? 'Rituel Reset' : lang === 'de' ? 'Reset-Ritual' : 'Reset Ritual'}
                </span>
              </div>
            </a>
            <a
              href="/academie/reset-homeostasique/phycocyanine/"
              onClick={(e) => {
                if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                  e.preventDefault();
                  onNavigate('recette-phycocyanine');
                }
              }}
              className={navItemClass(isActive('recette-phycocyanine'))}
            >
              <div className="flex items-center gap-2.5 min-w-0 overflow-hidden pl-3">
                <FlaskConical className={navIconClass(isActive('recette-phycocyanine'))} />
                <span className="truncate whitespace-nowrap">
                  {lang === 'en'
                    ? 'Phycocyanin'
                    : lang === 'de'
                    ? 'Phycocyanin'
                    : 'Phycocyanine'}
                </span>
              </div>
            </a>
          </div>
        </div>

        {/* GROUP 5: BOUTIQUE */}
        <div>
          <div className="text-[10px] font-black uppercase tracking-[0.22em] text-[#E8772E] px-3 mb-1.5">
            <span className="truncate whitespace-nowrap">
              {lang === 'fr' ? 'BOUTIQUE' : lang === 'de' ? 'SHOP' : 'STORE'}
            </span>
          </div>
          <div className="space-y-0.5">
            <a
              href="/boutique/bloomlab/"
              onClick={(e) => {
                if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                  e.preventDefault();
                  onNavigate('product-detail', 'bloomlab');
                }
              }}
              className={navItemClass(
                isActive('machine') ||
                isActive('bloomlab') ||
                (isActive('product-detail') && typeof window !== 'undefined' && window.location.pathname.startsWith('/boutique/bloomlab'))
              )}
            >
              <div className="flex items-center gap-2.5 min-w-0 overflow-hidden">
                <Sparkles className={navIconClass(
                  isActive('machine') ||
                  isActive('bloomlab') ||
                  (isActive('product-detail') && typeof window !== 'undefined' && window.location.pathname.startsWith('/boutique/bloomlab'))
                )} />
                <span className="truncate whitespace-nowrap">BloomLab®</span>
              </div>
            </a>
            <a
              href={VIEW_PATHS['boutique-kits']}
              onClick={(e) => {
                if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                  e.preventDefault();
                  onNavigate('boutique-kits');
                }
              }}
              className={navItemClass(isActive('boutique-kits'))}
            >
              <div className="flex items-center gap-2.5 min-w-0 overflow-hidden">
                <Package className={navIconClass(isActive('boutique-kits'))} />
                <span className="truncate whitespace-nowrap">
                  {lang === 'fr'
                    ? 'Soins Botaniques'
                    : lang === 'de'
                    ? 'Botanische Pflege'
                    : 'Botanical Care'}
                </span>
              </div>
            </a>
            <a
              href={VIEW_PATHS['boutique']}
              onClick={(e) => {
                if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                  e.preventDefault();
                  onNavigate('boutique');
                }
              }}
              className={navItemClass(isActive('boutique'))}
            >
              <div className="flex items-center gap-2.5 min-w-0 overflow-hidden">
                <ShoppingBag className={navIconClass(isActive('boutique'))} />
                <span className="truncate whitespace-nowrap">
                  {lang === 'fr' ? 'Accessoires' : lang === 'de' ? 'Zubehör' : 'Accessories'}
                </span>
              </div>
            </a>
            <a
              href="/boutique/duo-argiles/"
              onClick={(e) => {
                if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                  e.preventDefault();
                  onNavigate('product-detail', 'duo-argiles');
                }
              }}
              className={navItemClass(
                isActive('product-detail') && typeof window !== 'undefined' && window.location.pathname.startsWith('/boutique/duo-argiles')
              )}
            >
              <div className="flex items-center gap-2.5 min-w-0 overflow-hidden">
                <Leaf className={navIconClass(false)} />
                <span className="truncate whitespace-nowrap">
                  {lang === 'fr' ? 'Argiles & Liants' : lang === 'de' ? 'Tonerden & Bindemittel' : 'Clays & Binders'}
                </span>
              </div>
            </a>
            {/* Abonnements numériques */}
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
              <div className="flex items-center gap-2.5 min-w-0 overflow-hidden">
                <Star className={navIconClass(isActive('abonnement') || isActive('premium-info') || isActive('abonnements-numeriques'))} />
                <span className="font-semibold text-white truncate whitespace-nowrap">
                  {lang === 'fr' ? 'Abonnements' : lang === 'de' ? 'Digitale Abonnements' : 'Digital Subscriptions'}
                </span>
              </div>
              <span className="text-[8px] uppercase px-1.5 py-0.5 rounded bg-[#C8AB8A]/20 text-[#C8AB8A] font-bold shrink-0">
                Abo
              </span>
            </a>
          </div>
        </div>

        {/* GROUP 6: RESSOURCES */}
        <div>
          <div className="text-[10px] font-black uppercase tracking-[0.22em] text-[#E8772E] px-3 mb-1.5 flex items-center justify-between">
            <span className="truncate whitespace-nowrap">{lang === 'fr' ? 'RESSOURCES' : lang === 'de' ? 'RESSOURCEN' : 'RESOURCES'}</span>
          </div>
          <div className="space-y-0.5">
            <a
              href={VIEW_PATHS['herbier']}
              onClick={(e) => {
                if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                  e.preventDefault();
                  onNavigate('herbier');
                }
              }}
              className={navItemClass(isActive('herbier') || isActive('library') || isActive('herbarium'))}
            >
              <div className="flex items-center gap-2.5 min-w-0 overflow-hidden">
                <BookOpen className={navIconClass(isActive('herbier') || isActive('library') || isActive('herbarium'))} />
                <span className="truncate whitespace-nowrap">{lang === 'fr' ? 'Herbier' : lang === 'de' ? 'Das Herbarium' : 'The Herbarium'}</span>
              </div>
            </a>
            <a
              href={VIEW_PATHS['lexique']}
              onClick={(e) => {
                if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                  e.preventDefault();
                  onNavigate('lexique');
                }
              }}
              className={navItemClass(isActive('lexique'))}
            >
              <div className="flex items-center gap-2.5 min-w-0 overflow-hidden">
                <BookOpen className={navIconClass(isActive('lexique'))} />
                <span className="truncate whitespace-nowrap">{lang === 'fr' ? 'Lexique' : lang === 'de' ? 'Botanik-Glossar' : 'Botanik Glossary'}</span>
              </div>
            </a>
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
                  ? 'bg-[#E8772E]/20 text-[#E8772E] border-[#E8772E]/50 shadow-xs' 
                  : 'bg-[#E8772E]/10 hover:bg-[#E8772E]/15 text-[#E8772E] border-[#E8772E]/25 hover:border-[#E8772E]/40'
              }`}
              title={lang === 'fr' ? 'Accéder à Bloom Academy' : lang === 'de' ? 'Zur Bloom Academy' : 'Go to Bloom Academy'}
            >
              <span className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-[#E8772E] shrink-0" />
                <span className="font-bold text-[#E8772E] tracking-wide">
                  {lang === 'fr' ? 'Académie' : lang === 'de' ? 'Akademie' : 'Academy'}
                </span>
              </span>
              <span className="text-[8px] uppercase px-2 py-0.5 rounded-full bg-[#FAF7F2] text-[#0F261E] font-black tracking-wider shadow-xs">
                {lang === 'fr' ? 'Pédagogie' : lang === 'de' ? 'Pädagogik' : 'Pedagogy'}
              </span>
            </a>
            <button
              type="button"
              onClick={() => setIsBloomAcademyOpen(!isBloomAcademyOpen)}
              className="p-2 rounded-xl text-[#E8772E] hover:bg-[#E8772E]/15 border border-[#E8772E]/25 transition-colors cursor-pointer shrink-0"
              title={lang === 'fr' ? 'Déplier/Replier Bloom Academy' : lang === 'de' ? 'Bloom Academy ein-/ausblenden' : 'Toggle Bloom Academy'}
              aria-expanded={isBloomAcademyOpen}
            >
              {isBloomAcademyOpen ? (
                <ChevronDown className="w-4 h-4 text-[#E8772E]" />
              ) : (
                <ChevronRight className="w-4 h-4 text-[#E8772E]" />
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
                  <Home className="w-3.5 h-3.5 shrink-0 text-white" />
                  <span className={isActive('academie') ? 'text-white font-bold' : 'text-white font-medium'}>
                    {lang === 'fr' ? 'Accueil' : lang === 'de' ? 'Startseite' : 'Home'}
                  </span>
                </div>
              </a>

              {/* Menu Déroulant: COMPRENDRE LE CORPS */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setIsComprendreCorpsOpen(!isComprendreCorpsOpen)}
                  className="flex items-center justify-between w-full px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-[0.2em] text-[#E8772E] hover:bg-white/5 transition-colors cursor-pointer group"
                  aria-expanded={isComprendreCorpsOpen}
                  title={lang === 'fr' ? 'Afficher/Masquer Comprendre le corps' : lang === 'de' ? 'Den Körper verstehen ein-/ausblenden' : 'Toggle Understanding the body'}
                >
                  <span className="flex items-center gap-1.5">
                    <Layers className="w-3 h-3 text-[#E8772E]" />
                    <span>{lang === 'fr' ? 'COMPRENDRE LE CORPS' : lang === 'de' ? 'DEN KÖRPER VERSTEHEN' : 'UNDERSTANDING THE BODY'}</span>
                  </span>
                  {isComprendreCorpsOpen ? (
                    <ChevronDown className="w-3.5 h-3.5 text-[#E8772E]/80 group-hover:text-[#E8772E]" />
                  ) : (
                    <ChevronRight className="w-3.5 h-3.5 text-[#E8772E]/80 group-hover:text-[#E8772E]" />
                  )}
                </button>

                {isComprendreCorpsOpen && (
                  <div className="space-y-0.5 mt-0.5">
                    {/* 1. Comment lire le modèle Bloom (MODULE GRATUIT) */}
                    <a
                      href={VIEW_PATHS['comment-lire-modele-bloom']}
                      onClick={(e) => {
                        if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                          e.preventDefault();
                          onNavigate('comment-lire-modele-bloom');
                        }
                      }}
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
                    </a>

                    {/* 1b. Le Pouvoir Cyclique & Sacré de la Femme (MODULE GRATUIT) */}
                    <a
                      href="/academie/pouvoir-cyclique-femme/"
                      onClick={(e) => {
                        if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                          e.preventDefault();
                          onNavigate('women-academy');
                        }
                      }}
                      className={navItemClass(isActive('women-academy'))}
                      title={lang === 'fr' ? 'Le Pouvoir Cyclique et Sacré de la Femme (Accès Libre)' : lang === 'de' ? 'Die Zyklische Kraft der Frau (Kostenlos)' : 'The Cyclical Power of Women (Free)'}
                    >
                      <div className="flex items-center gap-2 pl-2 overflow-hidden text-left">
                        <span className="text-[#C8AB8A] font-mono text-[11px] shrink-0">├──</span>
                        <span className="truncate text-[11px]">
                          {lang === 'fr' ? 'Cycle Féminin' : lang === 'de' ? 'Zyklische Kraft der Frau' : 'Women Cyclical Power'}
                        </span>
                      </div>
                      <span className="text-[8px] uppercase px-1 py-0.2 rounded bg-emerald-500/20 text-emerald-400 font-bold shrink-0 border border-emerald-500/30">
                        {lang === 'fr' ? 'Gratuit' : lang === 'de' ? 'Gratis' : 'Free'}
                      </span>
                    </a>

                    {/* 2. Les 4 Architectures (Payant / Abonnement) */}
                    <a
                      href={VIEW_PATHS['4-architectures']}
                      onClick={(e) => {
                        if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                          e.preventDefault();
                          onNavigate('4-architectures');
                        }
                      }}
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
                    </a>

                    {/* 3. Les 7 Terrains (Payant / Abonnement) */}
                    <a
                      href={VIEW_PATHS['7-terrains']}
                      onClick={(e) => {
                        if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                          e.preventDefault();
                          onNavigate('terrain');
                        }
                      }}
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
                    </a>

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
                        title={lang === 'fr' ? 'Déplier/Replier les 9 Axes historiques' : lang === 'de' ? 'Die 9 Historischen Achsen ein-/ausblenden' : 'Toggle 9 Historical Axes'}
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
                          <a
                            href={VIEW_PATHS['9-axes']}
                            onClick={(e) => {
                              if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                                e.preventDefault();
                                onNavigate('9-axes');
                              }
                            }}
                            className={navItemClass(isActive('9-axes') || isActive('neuf-axes-historiques'))}
                          >
                            <div className="flex items-center gap-2 pl-1 overflow-hidden text-left">
                              <span className="text-[#c9a84c] font-mono text-[10px] shrink-0">├─</span>
                              <span className="truncate text-[10.5px] text-white/90">
                                {lang === 'fr' ? "Vue d'ensemble (9 axes)" : lang === 'de' ? 'Überblick (9 Achsen)' : '9 Axes Overview'}
                              </span>
                            </div>
                          </a>

                          {/* Module 0 */}
                          <a
                            href={VIEW_PATHS['module-0']}
                            onClick={(e) => {
                              if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                                e.preventDefault();
                                onNavigate('module-0');
                              }
                            }}
                            className={navItemClass(isActive('module-0'))}
                          >
                            <div className="flex items-center gap-2 pl-1 overflow-hidden text-left">
                              <span className="text-[#c9a84c] font-mono text-[10px] shrink-0">├─</span>
                              <span className="truncate text-[10.5px] text-white font-medium">
                                {lang === 'fr' ? 'Module 0 : Paradigme' : lang === 'de' ? 'Modul 0 : Paradigma' : 'Module 0 : Paradigm'}
                              </span>
                            </div>
                            <Lock className="w-2.5 h-2.5 text-[#c9a84c]/80 shrink-0" />
                          </a>

                          {/* Axe A1 */}
                          <a
                            href="/academie/axes/a1-emonctoires/"
                            onClick={(e) => {
                              if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                                e.preventDefault();
                                onNavigate('axe-a1');
                              }
                            }}
                            className={navItemClass(isActive('axe-a1'))}
                          >
                            <div className="flex items-center gap-2 pl-1 overflow-hidden text-left">
                              <span className="text-[#c9a84c] font-mono text-[10px] shrink-0">├─</span>
                              <span className="truncate text-[10.5px] text-white">
                                {lang === 'fr' ? 'A1 : Émonctoires' : lang === 'de' ? 'A1 : Ausscheidung' : 'A1 : Emunctories'}
                              </span>
                            </div>
                            <Lock className="w-2.5 h-2.5 text-[#c9a84c]/80 shrink-0" />
                          </a>

                          {/* Axe A2 */}
                          <a
                            href={VIEW_PATHS['axe-a2']}
                            onClick={(e) => {
                              if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                                e.preventDefault();
                                onNavigate('axe-a2');
                              }
                            }}
                            className={navItemClass(isActive('axe-a2'))}
                          >
                            <div className="flex items-center gap-2 pl-1 overflow-hidden text-left">
                              <span className="text-[#c9a84c] font-mono text-[10px] shrink-0">├─</span>
                              <span className="truncate text-[10.5px] text-white">
                                {lang === 'fr' ? 'A2 : Barrière Intestinale' : lang === 'de' ? 'A2 : Darmbarriere' : 'A2 : Gut Barrier'}
                              </span>
                            </div>
                            <Lock className="w-2.5 h-2.5 text-[#c9a84c]/80 shrink-0" />
                          </a>

                          {/* Axe A3 */}
                          <a
                            href={VIEW_PATHS['axe-a3']}
                            onClick={(e) => {
                              if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                                e.preventDefault();
                                onNavigate('axe-a3');
                              }
                            }}
                            className={navItemClass(isActive('axe-a3'))}
                          >
                            <div className="flex items-center gap-2 pl-1 overflow-hidden text-left">
                              <span className="text-[#c9a84c] font-mono text-[10px] shrink-0">├─</span>
                              <span className="truncate text-[10.5px] text-white">
                                {lang === 'fr' ? 'A3 : Axe HPA & Stress' : lang === 'de' ? 'A3 : HPA-Achse' : 'A3 : HPA Axis'}
                              </span>
                            </div>
                            <Lock className="w-2.5 h-2.5 text-[#c9a84c]/80 shrink-0" />
                          </a>

                          {/* Axe A4 */}
                          <a
                            href={VIEW_PATHS['axe-a4']}
                            onClick={(e) => {
                              if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                                e.preventDefault();
                                onNavigate('axe-a4');
                              }
                            }}
                            className={navItemClass(isActive('axe-a4'))}
                          >
                            <div className="flex items-center gap-2 pl-1 overflow-hidden text-left">
                              <span className="text-[#c9a84c] font-mono text-[10px] shrink-0">├─</span>
                              <span className="truncate text-[10.5px] text-white">
                                {lang === 'fr' ? 'A4 : Inflammation & SPMs' : lang === 'de' ? 'A4 : Entzündungsbalance' : 'A4 : Inflammation'}
                              </span>
                            </div>
                            <Lock className="w-2.5 h-2.5 text-[#c9a84c]/80 shrink-0" />
                          </a>

                          {/* Axe A5 */}
                          <a
                            href={VIEW_PATHS['axe-a5']}
                            onClick={(e) => {
                              if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                                e.preventDefault();
                                onNavigate('axe-a5');
                              }
                            }}
                            className={navItemClass(isActive('axe-a5'))}
                          >
                            <div className="flex items-center gap-2 pl-1 overflow-hidden text-left">
                              <span className="text-[#c9a84c] font-mono text-[10px] shrink-0">├─</span>
                              <span className="truncate text-[10.5px] text-white">
                                {lang === 'fr' ? 'A5 : Mitochondries & ATP' : lang === 'de' ? 'A5 : Mitochondrien' : 'A5 : Mitochondria'}
                              </span>
                            </div>
                            <Lock className="w-2.5 h-2.5 text-[#c9a84c]/80 shrink-0" />
                          </a>

                          {/* Axe A6 */}
                          <a
                            href={VIEW_PATHS['axe-a6']}
                            onClick={(e) => {
                              if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                                e.preventDefault();
                                onNavigate('axe-a6');
                              }
                            }}
                            className={navItemClass(isActive('axe-a6'))}
                          >
                            <div className="flex items-center gap-2 pl-1 overflow-hidden text-left">
                              <span className="text-[#c9a84c] font-mono text-[10px] shrink-0">├─</span>
                              <span className="truncate text-[10.5px] text-white">
                                {lang === 'fr' ? 'A6 : Tonus Vagal (SNA)' : lang === 'de' ? 'A6 : Vagustonus' : 'A6 : Vagal Tone'}
                              </span>
                            </div>
                            <Lock className="w-2.5 h-2.5 text-[#c9a84c]/80 shrink-0" />
                          </a>

                          {/* Axe A7 */}
                          <a
                            href={VIEW_PATHS['axe-a7']}
                            onClick={(e) => {
                              if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                                e.preventDefault();
                                onNavigate('axe-a7');
                              }
                            }}
                            className={navItemClass(isActive('axe-a7'))}
                          >
                            <div className="flex items-center gap-2 pl-1 overflow-hidden text-left">
                              <span className="text-[#c9a84c] font-mono text-[10px] shrink-0">├─</span>
                              <span className="truncate text-[10.5px] text-white">
                                {lang === 'fr' ? 'A7 : Matrice & Fascia' : lang === 'de' ? 'A7 : Faszienmatrix' : 'A7 : Fascial Matrix'}
                              </span>
                            </div>
                            <Lock className="w-2.5 h-2.5 text-[#c9a84c]/80 shrink-0" />
                          </a>

                          {/* Axe A8 */}
                          <a
                            href={VIEW_PATHS['axe-a8']}
                            onClick={(e) => {
                              if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                                e.preventDefault();
                                onNavigate('axe-a8');
                              }
                            }}
                            className={navItemClass(isActive('axe-a8'))}
                          >
                            <div className="flex items-center gap-2 pl-1 overflow-hidden text-left">
                              <span className="text-[#c9a84c] font-mono text-[10px] shrink-0">├─</span>
                              <span className="truncate text-[10.5px] text-white">
                                {lang === 'fr' ? 'A8 : Microbiote & Butyrate' : lang === 'de' ? 'A8 : Mikrobiom' : 'A8 : Microbiome'}
                              </span>
                            </div>
                            <Lock className="w-2.5 h-2.5 text-[#c9a84c]/80 shrink-0" />
                          </a>

                          {/* Axe A9 */}
                          <a
                            href={VIEW_PATHS['axe-a9']}
                            onClick={(e) => {
                              if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                                e.preventDefault();
                                onNavigate('axe-a9');
                              }
                            }}
                            className={navItemClass(isActive('axe-a9'))}
                          >
                            <div className="flex items-center gap-2 pl-1 overflow-hidden text-left">
                              <span className="text-[#c9a84c] font-mono text-[10px] shrink-0">└─</span>
                              <span className="truncate text-[10.5px] text-white">
                                {lang === 'fr' ? 'A9 : Système EndoCannabinoïde' : lang === 'de' ? 'A9 : Endocannabinoid' : 'A9 : Endocannabinoid'}
                              </span>
                            </div>
                            <Lock className="w-2.5 h-2.5 text-[#c9a84c]/80 shrink-0" />
                          </a>
                        </div>
                      )}
                    </div>

                    {/* 5. La Charge Allostatique (Payant / Abonnement) */}
                    <a
                      href={VIEW_PATHS['charge-allostatique']}
                      onClick={(e) => {
                        if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                          e.preventDefault();
                          onNavigate('charge-allostatique');
                        }
                      }}
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
                    </a>

                    {/* 6. Le Reset Homéostasique (Payant / Abonnement) */}
                    <a
                      href={VIEW_PATHS['phytotherapie-reset']}
                      onClick={(e) => {
                        if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                          e.preventDefault();
                          onNavigate('phytotherapie-reset');
                        }
                      }}
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
                    </a>

                    {/* 7. Protocoles Systémiques (remis après Reset Homeostasique - Payant / Abonnement) */}
                    <a
                      href={VIEW_PATHS['protocoles']}
                      onClick={(e) => {
                        if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                          e.preventDefault();
                          onNavigate('protocoles');
                        }
                      }}
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
                    </a>

                    {/* 8. Métabolisme et insuline (placé après Protocoles Systémiques, écrit en jaune doré, Payant) */}
                    <a
                      href={VIEW_PATHS['metabolisme-insuline']}
                      onClick={(e) => {
                        if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                          e.preventDefault();
                          onNavigate('metabolisme-insuline');
                        }
                      }}
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
                        <span className="text-[8px] uppercase px-1.5 py-0.5 rounded bg-[#D97706]/10 text-[#B45309] font-bold border border-[#D97706]/30">
                          {lang === 'fr' ? 'Nouveau' : lang === 'de' ? 'Neu' : 'New'}
                        </span>
                        <Lock className="w-3 h-3 text-[#F59E0B] shrink-0" />
                      </div>
                    </a>

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
              <ShoppingBag className="w-4 h-4 text-[#C8AB8A]" />
              <span>{lang === 'fr' ? 'Panier' : lang === 'de' ? 'Warenkorb' : 'Cart'}</span>
            </div>
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
              onClick={() => onNavigate('account')}
              className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-white/90 transition-colors cursor-pointer"
              title={lang === 'fr' ? 'Mon Compte' : lang === 'de' ? 'Mein Konto' : 'My Account'}
              id="sidebar-account-btn"
            >
              <User className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={onOpenAuth}
              className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-white/90 transition-colors cursor-pointer"
              title={lang === 'fr' ? 'Connexion' : lang === 'de' ? 'Anmelden' : 'Login'}
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
            className="flex-1 flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-[#E8772E] hover:bg-[#D4651F] text-[11px] font-bold text-white transition-all cursor-pointer shadow-md shadow-orange-900/20"
            id="sidebar-calculator-btn"
            title={lang === 'fr' ? 'Calculateur de Dilution Botanique' : lang === 'de' ? 'Botanischer Verdünnungsrechner' : 'Botanical Dilution Calculator'}
          >
            <Calculator className="w-3.5 h-3.5 text-white" />
            <span>{lang === 'fr' ? 'Calculatrice' : lang === 'de' ? 'Rechner' : 'Calculator'}</span>
          </button>
        </div>

      </div>
    </aside>
  );
};

export default NavigationSidebar;