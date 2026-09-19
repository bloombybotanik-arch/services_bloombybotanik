import React, { useState, useRef, useEffect, useId } from 'react';
import { Info, Star, ArrowRight, X } from 'lucide-react';
import { lexique, LexiqueTermKey } from '../data/lexique';

export interface TooltipLexiqueProps {
  terme: LexiqueTermKey;
  children?: React.ReactNode;
  className?: string;
  onNavigate?: (view: any, param?: string) => void;
}

export const TooltipLexique: React.FC<TooltipLexiqueProps> = ({
  terme,
  children,
  className = '',
  onNavigate
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);
  const popoverRef = useRef<HTMLSpanElement>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const popoverId = useId();

  const entry = lexique[terme];

  if (!entry) {
    return <span className={className}>{children || terme}</span>;
  }

  // Handle clicking outside to close
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        // Return focus to trigger button
        const button = containerRef.current?.querySelector('button');
        button?.focus();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 280);
  };

  const handleToggleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(prev => !prev);
  };

  const handleLinkClick = (e: React.MouseEvent) => {
    if (onNavigate) {
      e.preventDefault();
      setIsOpen(false);
      onNavigate('lexique', entry.slug);
      // Ensure scrolling to target anchor
      setTimeout(() => {
        const el = document.getElementById(entry.slug);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 300);
    } else {
      setIsOpen(false);
    }
  };

  return (
    <span
      ref={containerRef}
      className={`relative inline-flex items-baseline gap-1 group font-inherit ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        type="button"
        onClick={handleToggleClick}
        aria-describedby={isOpen ? popoverId : undefined}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        aria-label={`Comprendre le terme ${entry.terme} dans le lexique Bloom`}
        className="inline-flex items-baseline gap-1 text-left cursor-pointer p-0 bg-transparent border-0 font-inherit text-inherit focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D97706] focus-visible:ring-offset-1 rounded-sm transition-colors"
      >
        <span className="underline decoration-dotted decoration-[#D97706] underline-offset-4 font-inherit decoration-2 text-inherit group-hover:text-[#0F261E] group-hover:decoration-[#0F261E] transition-colors">
          {children || entry.terme}
        </span>
        <span
          className="inline-flex items-center justify-center w-3.5 h-3.5 text-[#D97706] group-hover:text-[#0F261E] transition-colors translate-y-0.5 opacity-90"
          aria-hidden="true"
        >
          <Info className="w-3.5 h-3.5" />
        </span>
      </button>

      {/* Popover */}
      {isOpen && (
        <span
          id={popoverId}
          ref={popoverRef}
          role="dialog"
          aria-modal="false"
          aria-label={`Définition de ${entry.terme}`}
          className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2.5 w-[310px] sm:w-[350px] max-w-[90vw] bg-[#FAF7F2] border border-[#E7DFD3] rounded-xl shadow-xl p-4 text-[#0F261E] text-left animate-in fade-in zoom-in-95 duration-150 block cursor-default font-normal whitespace-normal select-text"
          style={{
            filter: 'drop-shadow(0 10px 25px rgba(15, 38, 30, 0.12))'
          }}
        >
          {/* Subtle Pointer triangle */}
          <span
            className="absolute top-full left-1/2 -translate-x-1/2 -mt-[1px] w-3 h-3 bg-[#FAF7F2] border-r border-b border-[#E7DFD3] rotate-45 block"
            aria-hidden="true"
          />

          {/* Header with Term & Proof Level */}
          <span className="flex items-start justify-between gap-2 pb-2.5 border-b border-[#E7DFD3]/80">
            <span className="block">
              <span className="text-[10px] font-bold tracking-widest uppercase text-[#D97706] block mb-0.5">
                Lexique Botanik
              </span>
              <span role="heading" aria-level={4} className="text-base font-extrabold text-[#0F261E] leading-snug m-0 block">
                {entry.terme}
              </span>
            </span>
            
            {/* Stars rating */}
            <span
              className="flex items-center gap-0.5 pt-1"
              aria-label={`Niveau de preuve scientifique : ${entry.niveauPreuve} sur 5`}
              title={`Niveau de preuve scientifique : ${entry.niveauPreuve}/5`}
            >
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-3 h-3 ${
                    star <= entry.niveauPreuve
                      ? 'text-[#D97706] fill-[#D97706]'
                      : 'text-[#E7DFD3]'
                  }`}
                />
              ))}
            </span>
          </span>

          {/* Novice Definition (2 lines) */}
          <span className="block text-xs sm:text-[13px] text-[#0F261E]/90 leading-relaxed mt-2.5 mb-2 font-normal line-clamp-2">
            {entry.definitionNovice}
          </span>

          {/* Metaphor in italics */}
          <span className="block bg-[#FFFFFF]/70 rounded-lg p-2.5 border border-[#E7DFD3]/60 mb-3">
            <span className="block text-xs italic text-[#1C3F34] leading-snug m-0">
              <span className="font-serif not-italic mr-1 text-[#D97706]">“</span>
              {entry.metaphore}
              <span className="font-serif not-italic ml-1 text-[#D97706]">”</span>
            </span>
          </span>

          {/* Footer Link */}
          <span className="flex items-center justify-between pt-1 border-t border-[#E7DFD3]/60">
            <span className="text-[10px] text-[#1C3F34]/70">
              Preuve : {entry.niveauPreuve}/5
            </span>
            <a
              href={`/lexique#${entry.slug}`}
              onClick={handleLinkClick}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D97706] hover:text-[#0F261E] transition-colors group/link py-0.5"
            >
              <span>→ Voir dans le Lexique complet</span>
              <ArrowRight className="w-3 h-3 group-hover/link:translate-x-0.5 transition-transform" />
            </a>
          </span>
        </span>
      )}
    </span>
  );
};

export default TooltipLexique;
