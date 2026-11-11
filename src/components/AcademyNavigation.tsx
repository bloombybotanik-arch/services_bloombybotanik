import React, { useState } from 'react';
import { 
  ChevronRight, 
  ArrowLeft, 
  Sparkles, 
  Compass, 
  Layers, 
  BookOpen, 
  Activity, 
  Menu, 
  X, 
  ShieldAlert,
  ArrowRight
} from 'lucide-react';
import { View } from '../types';
import { Language } from '../translations';

interface AcademyNavigationProps {
  currentView: View | string;
  onNavigate: (view: View, param?: string) => void;
  currentPageTitle?: string;
  sectionName?: string;
  lang?: Language;
}

export const AcademyNavigation: React.FC<AcademyNavigationProps> = ({
  currentView,
  onNavigate,
  currentPageTitle = 'Comment lire le modèle Bloom',
  sectionName = 'Comprendre le Corps',
  lang = 'fr'
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const texts = {
    medical: lang === 'fr' 
      ? 'Ce contenu est pédagogique. Il ne remplace pas un avis médical.' 
      : lang === 'de' 
      ? 'Dieser Inhalt dient Bildungszwecken. Er ersetzt keinen ärztlichen Rat.' 
      : 'This content is educational. It does not replace medical advice.',
    home: lang === 'fr' ? 'Accueil' : lang === 'de' ? 'Startseite' : 'Home',
    guide: lang === 'fr' ? 'Guide' : lang === 'de' ? 'Leitfaden' : 'Guide',
    arch: lang === 'fr' ? '4 Architectures' : lang === 'de' ? '4 Architekturen' : '4 Architectures',
    terrains: lang === 'fr' ? '7 Terrains' : lang === 'de' ? '7 Terrains' : '7 Terrains',
    axes: lang === 'fr' ? '9 Axes' : lang === 'de' ? '9 Achsen' : '9 Axes',
    charge: lang === 'fr' ? 'Charge Allostatique' : lang === 'de' ? 'Allostatische Last' : 'Allostatic Load',
    reset: lang === 'fr' ? 'Reset' : lang === 'de' ? 'Reset' : 'Reset',
    protocoles: lang === 'fr' ? 'Protocoles' : lang === 'de' ? 'Protokolle' : 'Protocols',
    meta: lang === 'fr' ? 'Métabolisme & Insuline' : lang === 'de' ? 'Stoffwechsel & Insulin' : 'Metabolism & Insulin',
    herbier: lang === 'fr' ? 'Herbier' : lang === 'de' ? 'Herbarium' : 'Herbarium',
    bloomlab: lang === 'fr' ? 'Découvrir BloomLab®' : lang === 'de' ? 'BloomLab® entdecken' : 'Discover BloomLab®',
    back: lang === 'fr' ? '← Retour à l\'accueil' : lang === 'de' ? '← Zurück zur Startseite' : '← Back to home'
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0F261E]/95 backdrop-blur-md border-b border-white/10 select-none text-white">
      {/* 1. Medical Boundary Notice (Mandatory by specification) */}
      <div className="bg-[#c9a84c]/10 border-b border-[#c9a84c]/20 py-1.5 px-4 text-center">
        <p className="text-[11px] sm:text-xs text-[#c9a84c] font-medium flex items-center justify-center gap-1.5">
          <ShieldAlert className="w-3.5 h-3.5 shrink-0 text-[#c9a84c]" />
          <span>{texts.medical}</span>
        </p>
      </div>

      {/* 2. Main Navigation Bar */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
        {/* Left: Breadcrumb & Academy Brand */}
        <div className="flex flex-nowrap overflow-x-auto whitespace-nowrap hide-scrollbar gap-2 items-center min-w-0">
          <button
            onClick={() => onNavigate('indexbis')}
            className="flex items-center gap-1.5 text-xs text-white/80 hover:text-[#F5F0E6] transition-colors py-1 shrink-0 cursor-pointer"
            title="Retour au site principal"
          >
            <ArrowLeft className="w-3.5 h-3.5 shrink-0" />
            <span className="shrink-0">{texts.home}</span>
          </button>

          <span className="text-white/40 shrink-0">/</span>

          <button
            onClick={() => onNavigate('academie')}
            className="flex items-center gap-2 px-2.5 py-1 rounded-lg bg-white/10 text-[#c9a84c] border border-[#c9a84c]/30 text-xs font-bold shrink-0 hover:bg-white/20 hover:text-white transition-colors cursor-pointer"
          >
            <Compass className="w-3.5 h-3.5 shrink-0" />
            <span className="tracking-wide uppercase font-mono text-[11px] shrink-0">Bloom Academy</span>
          </button>

          <span className="text-white/40 shrink-0">/</span>

          <span className="text-xs text-white/80 shrink-0">
            {sectionName}
          </span>

          <span className="text-white/40 shrink-0">/</span>

          <span className="text-xs text-white font-semibold shrink-0">
            {currentPageTitle}
          </span>
        </div>

        {/* Center / Desktop Links */}
        <nav className="hidden xl:flex items-center gap-1 text-xs">
          <button
            onClick={() => onNavigate('academie')}
            className={`px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer font-medium ${
              currentView === 'academie'
                ? 'bg-white/10 text-[#c9a84c] font-bold'
                : 'text-white/80 hover:text-[#F5F0E6] hover:bg-white/10'
            }`}
          >
            {lang === 'fr' ? 'Accueil Académie' : lang === 'de' ? 'Übersicht' : 'Academy Home'}
          </button>
          <button
            onClick={() => onNavigate('comment-lire-modele-bloom')}
            className={`px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer font-medium ${
              currentView === 'comment-lire-modele-bloom'
                ? 'bg-white/10 text-[#c9a84c] font-bold'
                : 'text-white/80 hover:text-[#F5F0E6] hover:bg-white/10'
            }`}
          >
            {texts.guide}
          </button>
          <button
            onClick={() => onNavigate('4-architectures')}
            className={`px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer font-medium ${
              currentView === '4-architectures'
                ? 'bg-white/10 text-[#c9a84c] font-bold'
                : 'text-white/80 hover:text-[#F5F0E6] hover:bg-white/10'
            }`}
          >
            {texts.arch}
          </button>
          <button
            onClick={() => onNavigate('terrain')}
            className={`px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer font-medium ${
              currentView === 'terrain' || currentView === '7-terrains'
                ? 'bg-white/10 text-[#c9a84c] font-bold'
                : 'text-white/80 hover:text-[#F5F0E6] hover:bg-white/10'
            }`}
          >
            {texts.terrains}
          </button>
          <button
            onClick={() => onNavigate('9-axes')}
            className={`px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer font-medium ${
              currentView === '9-axes' || currentView === 'neuf-axes-historiques'
                ? 'bg-white/10 text-[#c9a84c] font-bold'
                : 'text-white/80 hover:text-[#F5F0E6] hover:bg-white/10'
            }`}
          >
            {texts.axes}
          </button>
          <button
            onClick={() => onNavigate('charge-allostatique')}
            className={`px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer font-medium ${
              currentView === 'charge-allostatique'
                ? 'bg-white/10 text-[#c9a84c] font-bold'
                : 'text-white/80 hover:text-[#F5F0E6] hover:bg-white/10'
            }`}
          >
            {texts.charge}
          </button>
          <button
            onClick={() => onNavigate('phytotherapie-reset')}
            className={`px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer font-medium ${
              currentView === 'phytotherapie-reset' || currentView === 'reset-homeostasique'
                ? 'bg-white/10 text-[#c9a84c] font-bold'
                : 'text-white/80 hover:text-[#F5F0E6] hover:bg-white/10'
            }`}
          >
            {texts.reset}
          </button>
          <button
            onClick={() => onNavigate('phytotherapie-reset')}
            className="px-2.5 py-1.5 rounded-lg text-white/80 hover:text-[#F5F0E6] hover:bg-white/10 transition-colors cursor-pointer font-medium"
          >
            {texts.protocoles}
          </button>
          <button
            onClick={() => onNavigate('metabolisme-insuline')}
            className={`px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer font-bold ${
              currentView === 'metabolisme-insuline'
                ? 'bg-[#F59E0B]/20 text-[#F59E0B]'
                : 'text-[#F59E0B] hover:text-white hover:bg-[#F59E0B]/10'
            }`}
          >
            {texts.meta}
          </button>
          <button
            onClick={() => onNavigate('herbier')}
            className="px-2.5 py-1.5 rounded-lg text-white/80 hover:text-[#F5F0E6] hover:bg-white/10 transition-colors cursor-pointer font-medium"
          >
            {texts.herbier}
          </button>
        </nav>

        {/* Right: Commercial Return Link & Mobile Toggle */}
        <div className="flex items-center gap-2 shrink-0">
          <a
            href="/bloomlab/"
            onClick={(e) => {
              if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                e.preventDefault();
                onNavigate('machine');
              }
            }}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-[#2D372C] text-white text-xs font-bold transition-all shadow-xs hover:shadow-md cursor-pointer border border-white/10 hover:border-[#C8AB8A]"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C8AB8A] group-hover:text-white" />
            <span>{texts.bloomlab}</span>
            <ArrowRight className="w-3 h-3 ml-0.5" />
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-white/5 border border-white/10 text-white/80 hover:text-white"
            aria-label="Menu Académie"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0F261E] border-b border-white/10 px-4 py-4 space-y-3 animate-in slide-in-from-top-2 duration-200">
          <div className="text-[10px] font-mono uppercase tracking-wider text-[#c9a84c] font-bold px-2">
            Navigation Bloom Academy
          </div>
          <div className="space-y-1">
            <button
              onClick={() => {
                onNavigate('academie');
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold flex items-center justify-between ${
                currentView === 'academie'
                  ? 'bg-[#c9a84c]/20 text-[#c9a84c]'
                  : 'text-white/80 hover:bg-white/5'
              }`}
            >
              <span className="flex items-center gap-2">
                <Compass className="w-3.5 h-3.5 text-[#c9a84c]" />
                <span>{lang === 'fr' ? 'Accueil Académie' : lang === 'de' ? 'Übersicht' : 'Academy Home'}</span>
              </span>
              <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-white/10 text-white/80">Hub</span>
            </button>

            <button
              onClick={() => {
                onNavigate('comment-lire-modele-bloom');
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold flex items-center justify-between ${
                currentView === 'comment-lire-modele-bloom'
                  ? 'bg-[#c9a84c]/20 text-[#c9a84c]'
                  : 'text-white/80 hover:bg-white/5'
              }`}
            >
              <span className="flex items-center gap-2">
                <Compass className="w-3.5 h-3.5 text-[#c9a84c]" />
                <span>{texts.guide}</span>
              </span>
              <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-[#c9a84c]/20 text-[#c9a84c]">Guide</span>
            </button>

            <button
              onClick={() => {
                onNavigate('4-architectures');
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold flex items-center justify-between ${
                currentView === '4-architectures'
                  ? 'bg-[#c9a84c]/20 text-[#c9a84c]'
                  : 'text-white/80 hover:bg-white/5'
              }`}
            >
              <span className="flex items-center gap-2">
                <Layers className="w-3.5 h-3.5 text-[#86efac]" />
                <span>{texts.arch}</span>
              </span>
            </button>

            <button
              onClick={() => {
                onNavigate('terrain');
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold flex items-center justify-between ${
                currentView === 'terrain' || currentView === '7-terrains'
                  ? 'bg-[#c9a84c]/20 text-[#c9a84c]'
                  : 'text-white/80 hover:bg-white/5'
              }`}
            >
              <span className="flex items-center gap-2">
                <Activity className="w-3.5 h-3.5 text-[#93c5fd]" />
                <span>{texts.terrains}</span>
              </span>
            </button>

            <button
              onClick={() => {
                onNavigate('9-axes');
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold flex items-center justify-between ${
                currentView === '9-axes' || currentView === 'neuf-axes-historiques'
                  ? 'bg-[#c9a84c]/20 text-[#c9a84c]'
                  : 'text-white/80 hover:bg-white/5'
              }`}
            >
              <span className="flex items-center gap-2">
                <Layers className="w-3.5 h-3.5 text-[#c9a84c]" />
                <span>{texts.axes}</span>
              </span>
            </button>

            <button
              onClick={() => {
                onNavigate('charge-allostatique');
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold flex items-center justify-between ${
                currentView === 'charge-allostatique'
                  ? 'bg-[#c9a84c]/20 text-[#c9a84c]'
                  : 'text-white/80 hover:bg-white/5'
              }`}
            >
              <span className="flex items-center gap-2">
                <Activity className="w-3.5 h-3.5 text-[#86efac]" />
                <span>{texts.charge}</span>
              </span>
            </button>

            <button
              onClick={() => {
                onNavigate('phytotherapie-reset');
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold flex items-center justify-between ${
                currentView === 'phytotherapie-reset' || currentView === 'reset-homeostasique'
                  ? 'bg-[#c9a84c]/20 text-[#c9a84c]'
                  : 'text-white/80 hover:bg-white/5'
              }`}
            >
              <span className="flex items-center gap-2">
                <Activity className="w-3.5 h-3.5 text-[#86efac]" />
                <span>{texts.reset}</span>
              </span>
            </button>

            <button
              onClick={() => {
                onNavigate('phytotherapie-reset');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-white/80 hover:bg-white/5 flex items-center justify-between"
            >
              <span className="flex items-center gap-2">
                <Activity className="w-3.5 h-3.5 text-[#c9a84c]" />
                <span>{texts.protocoles}</span>
              </span>
            </button>

            <button
              onClick={() => {
                onNavigate('metabolisme-insuline');
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2 rounded-lg text-xs font-bold flex items-center justify-between ${
                currentView === 'metabolisme-insuline'
                  ? 'bg-[#F59E0B]/20 text-[#F59E0B]'
                  : 'text-[#F59E0B] hover:bg-[#F59E0B]/10'
              }`}
            >
              <span className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
                <span className="font-bold">{texts.meta}</span>
              </span>
              <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-[#D97706]/10 text-[#B45309] border border-[#D97706]/30 font-bold">
                {lang === 'fr' ? 'Nouveau' : lang === 'de' ? 'Neu' : 'New'}
              </span>
            </button>

            <button
              onClick={() => {
                onNavigate('herbier');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-white/80 hover:bg-white/5 flex items-center justify-between"
            >
              <span className="flex items-center gap-2">
                <BookOpen className="w-3.5 h-3.5 text-[#C8AB8A]" />
                <span>{texts.herbier}</span>
              </span>
            </button>
          </div>

          <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
            <a
              href="/bloomlab/"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('machine');
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 rounded-xl bg-[#3E4A3D] hover:bg-[#2D372C] text-white text-xs font-bold text-center flex items-center justify-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{texts.bloomlab}</span>
            </a>

            <button
              onClick={() => {
                onNavigate('indexbis');
                setMobileMenuOpen(false);
              }}
              className="w-full py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 text-xs font-medium text-center"
            >
              {texts.back}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default AcademyNavigation;