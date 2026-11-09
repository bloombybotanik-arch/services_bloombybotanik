import React from 'react';

export interface PageIntroHeaderProps {
  badge: string;       // ex: "PROTOCOLES SYSTÉMIQUES" ou "ACADÉMIE BLOOM"
  title: string;       // ex: "Le Reset Homéostasique"
  subtitle: string;    // ex: "Relancer la pharmacie intérieure"
  context: string;     // ex: "Vous êtes ici dans l'espace dédié au rééquilibrage du terrain..."
  className?: string;
  actions?: React.ReactNode;
  theme?: 'dark' | 'light' | 'sage';
}

export const PageIntroHeader: React.FC<PageIntroHeaderProps> = ({ 
  badge, 
  title, 
  subtitle, 
  context,
  className = '',
  actions,
  theme = 'light'
}) => {
  const isDark = theme === 'dark';
  const isSage = theme === 'sage';

  return (
    <div className={`w-full py-10 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8 border-b relative overflow-hidden ${
      isSage || isDark
        ? 'bg-[#0F261E] text-white border-white/10' 
        : 'bg-[#FAF7F2] text-[#1E2E25] border-[#E7DFD3]'
    } ${className}`}>
      {/* Lueur subtile en arrière-plan */}
      <div 
        className={`absolute top-0 left-1/2 -translate-x-1/2 w-80 sm:w-96 md:w-[500px] h-64 sm:h-80 rounded-full blur-3xl pointer-events-none ${
          isSage || isDark ? 'bg-[#E8772E]/10' : 'bg-[#E8772E]/5'
        }`} 
        aria-hidden="true"
      />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Badge écosystème */}
        <span className={`inline-flex items-center gap-1.5 px-3.5 py-1 text-[11px] sm:text-xs font-bold tracking-widest rounded-full mb-3.5 uppercase shadow-xs border ${
          isSage || isDark
            ? 'bg-white/10 border-white/20 text-white'
            : 'bg-[#E8772E]/10 border-[#E8772E]/25 text-[#E8772E]'
        }`}>
          <span className="w-1.5 h-1.5 rounded-full bg-[#E8772E] animate-pulse" />
          {badge}
        </span>

        {/* Titre principal */}
        <h1 className={`text-2xl sm:text-3xl md:text-5xl font-black mb-3 tracking-tight leading-tight ${
          isSage || isDark ? 'text-white' : 'text-[#0F261E]'
        }`}>
          {title}
        </h1>

        {/* Sous-titre objectif */}
        <h2 className={`text-sm sm:text-lg md:text-xl font-semibold mb-5 sm:mb-6 leading-snug ${
          isSage || isDark ? 'text-[#FAF7F2]/80' : 'text-[#3E4A3D]'
        }`}>
          {subtitle}
        </h2>

        {/* Section explicative "Où suis-je ?" */}
        <div className={`p-4 sm:p-5 rounded-2xl max-w-2xl mx-auto shadow-xs border ${
          isSage || isDark
            ? 'bg-black/30 border border-white/10 text-white/90'
            : 'bg-white border-[#E7DFD3] text-[#4A5D4A]'
        }`}>
          <div className="flex items-center justify-center gap-1.5 mb-1.5">
            <span className="text-[10px] sm:text-[11px] uppercase tracking-wider font-bold font-mono text-[#E8772E]">
              Où suis-je ?
            </span>
          </div>
          <p className={`text-xs sm:text-sm md:text-base leading-relaxed italic ${
            isSage || isDark ? 'text-white/90' : 'text-[#4A5D4A]'
          }`}>
            {context}
          </p>
        </div>

        {/* Actions optionnelles (boutons, filtres, liens) */}
        {actions && (
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
};

export default PageIntroHeader;
