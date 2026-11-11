import React from 'react';

export interface PageIntroHeaderProps {
  badge: string;       // ex: "PROTOCOLES SYSTÉMIQUES" ou "ACADÉMIE BLOOM"
  title: string;       // ex: "Le Reset Homéostasique"
  subtitle: string;    // ex: "Relancer la pharmacie intérieure"
  context?: string;    // ex: "Vous êtes ici dans l'espace dédié au rééquilibrage du terrain..."
  breadcrumb?: string; // ex: "Accueil / Votre Pratique / Atelier Culinaire"
  className?: string;
  actions?: React.ReactNode;
  theme?: 'dark' | 'light' | 'sage';
}

export const PageIntroHeader: React.FC<PageIntroHeaderProps> = ({ 
  badge, 
  title, 
  subtitle, 
  context,
  breadcrumb,
  className = '',
  actions
}) => {
  return (
    <header className={`w-full bg-[#1E2E25] text-white relative overflow-hidden border-b border-white/10 ${className}`}>
      {/* 1. Barre de fil d'Ariane tout en haut : Vert Profond du Menu #0F261E */}
      {breadcrumb && (
        <div className="w-full bg-[#0F261E] border-b border-white/10 px-4 md:px-8 py-3.5 text-left">
          <nav aria-label="Fil d'Ariane" className="max-w-7xl mx-auto">
            <ol className="flex flex-wrap items-center gap-2 text-sm">
              {breadcrumb.split(/\s*\/\s*/).map((part, index, arr) => {
                const isLast = index === arr.length - 1;
                return (
                  <React.Fragment key={index}>
                    {index > 0 && <span className="text-white/40">/</span>}
                    {isLast ? (
                      <li className="text-white font-bold" aria-current="page">
                        {part}
                      </li>
                    ) : (
                      <li className="text-white/80">
                        {part}
                      </li>
                    )}
                  </React.Fragment>
                );
              })}
            </ol>
          </nav>
        </div>
      )}

      {/* Lueur subtile en arrière-plan */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-80 sm:w-96 md:w-[600px] h-64 sm:h-80 bg-[#E8772E]/10 rounded-full blur-3xl pointer-events-none" 
        aria-hidden="true"
      />

      {/* 2. Section de contenu */}
      <div className="px-4 md:px-8 py-12 md:py-20 max-w-7xl mx-auto flex flex-col items-center text-center relative z-10">
        {/* Badge écosystème */}
        {badge && (
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 text-[11px] sm:text-xs font-bold tracking-widest rounded-full mb-3.5 uppercase shadow-xs border bg-white/10 border-white/20 text-white">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E8772E] animate-pulse" />
            {badge}
          </span>
        )}

        {/* Titre principal */}
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-black mb-3 tracking-tight leading-tight text-white">
          {title}
        </h1>

        {/* Sous-titre objectif */}
        <h2 className="text-sm sm:text-lg md:text-xl font-semibold mb-5 sm:mb-6 leading-snug text-white/80 max-w-3xl">
          {subtitle}
        </h2>

        {/* Section explicative "Où suis-je ?" */}
        {context && (
          <div className="bg-white/5 border border-white/10 text-white/80 p-6 rounded-2xl max-w-2xl mx-auto mt-6 text-left shadow-xs">
            <div className="flex items-center justify-start gap-1.5 mb-1.5">
              <span className="text-[10px] sm:text-[11px] uppercase tracking-wider font-bold font-mono text-[#E8772E]">
                Où suis-je ?
              </span>
            </div>
            <p className="text-xs sm:text-sm md:text-base leading-relaxed italic text-white/80">
              {context}
            </p>
          </div>
        )}

        {/* Actions optionnelles (boutons, filtres, liens) */}
        {actions && (
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            {actions}
          </div>
        )}
      </div>
    </header>
  );
};

export default PageIntroHeader;
