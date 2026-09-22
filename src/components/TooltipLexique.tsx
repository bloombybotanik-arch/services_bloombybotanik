import React, { useState, useRef, useEffect, useId } from 'react';
import { Info, ArrowRight, X } from 'lucide-react';
import { findLexiqueEntry, LexiqueEntry } from '../data/lexique';
import { useGlossary } from '../context/GlossaryContext';

export interface TooltipLexiqueProps {
  terme: string;
  children?: React.ReactNode;
  className?: string;
  force?: boolean; // Force display even if second occurrence
  onNavigate?: (view: any, param?: string) => void;
}

export const TooltipLexique: React.FC<TooltipLexiqueProps> = ({
  terme,
  children,
  className = '',
  force = false,
  onNavigate
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);
  const popoverRef = useRef<HTMLSpanElement>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const popoverId = useId();

  const glossary = useGlossary();
  const entry: LexiqueEntry | undefined = findLexiqueEntry(terme);

  // Check if first occurrence on page
  const [isFirstOccurrence] = useState(() => {
    if (force || !glossary || !entry) return true;
    return glossary.registerTerm(entry.slug);
  });

  if (!entry) {
    return <span className={className}>{children || terme}</span>;
  }

  // If not first occurrence, render clean plain text without visual clutter
  if (!isFirstOccurrence && !force) {
    return <span className={`text-inherit ${className}`}>{children || entry.terme}</span>;
  }

  // Handle clicking outside & Escape key
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
        const trigger = containerRef.current?.querySelector('button');
        trigger?.focus();
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
    }, 250);
  };

  const handleToggleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  const handleKeyDownTrigger = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsOpen((prev) => !prev);
    }
  };

  const handleLinkClick = (e: React.MouseEvent) => {
    if (onNavigate) {
      e.preventDefault();
      setIsOpen(false);
      onNavigate('lexique', entry.slug);
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
      className={`relative inline-flex items-baseline group font-inherit ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        type="button"
        onClick={handleToggleClick}
        onKeyDown={handleKeyDownTrigger}
        aria-describedby={isOpen ? popoverId : undefined}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        aria-label={`Comprendre le terme "${entry.terme}" dans le lexique Bloom`}
        className="inline-flex items-baseline gap-0.5 text-left cursor-pointer p-0 bg-transparent border-0 font-inherit text-inherit focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D97706] focus-visible:ring-offset-1 rounded-xs transition-colors"
      >
        <span className="underline decoration-dotted decoration-[#D97706] underline-offset-4 font-inherit decoration-2 text-inherit group-hover:text-[#0F261E] group-hover:decoration-[#0F261E] transition-colors">
          {children || entry.terme}
        </span>
        <span
          className="inline-flex items-center justify-center w-3 h-3 text-[#D97706] group-hover:text-[#0F261E] transition-colors translate-y-0.5 opacity-80 ml-0.5"
          aria-hidden="true"
        >
          <Info className="w-3 h-3" />
        </span>
      </button>

      {/* Accessible Popover */}
      {isOpen && (
        <span
          id={popoverId}
          ref={popoverRef}
          role="dialog"
          aria-modal="false"
          aria-label={`Définition de ${entry.terme}`}
          className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2.5 w-[300px] sm:w-[350px] max-w-[90vw] bg-[#FAF7F2] border border-[#E7DFD3] rounded-2xl shadow-xl p-4 text-[#0F261E] text-left animate-in fade-in zoom-in-95 duration-150 block cursor-default font-normal whitespace-normal select-text"
          style={{
            filter: 'drop-shadow(0 12px 28px rgba(15, 38, 30, 0.16))'
          }}
        >
          {/* Triangular arrow indicator */}
          <span
            className="absolute top-full left-1/2 -translate-x-1/2 -mt-[1px] w-3 h-3 bg-[#FAF7F2] border-r border-b border-[#E7DFD3] rotate-45 block"
            aria-hidden="true"
          />

          {/* Popover Header */}
          <span className="flex items-start justify-between gap-2 pb-2 border-b border-[#E7DFD3]/80">
            <span className="block">
              <span className="text-[10px] font-bold tracking-widest uppercase text-[#D97706] block mb-0.5">
                Lexique Botanik
              </span>
              <span role="heading" aria-level={4} className="text-sm sm:text-base font-extrabold text-[#0F261E] leading-snug m-0 block">
                {entry.terme}
              </span>
            </span>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-[#0F261E]/40 hover:text-[#0F261E] p-1 rounded-md transition-colors"
              aria-label="Fermer la définition"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </span>

          {/* Simple Definition */}
          <span className="block text-xs sm:text-[13px] text-[#0F261E]/90 leading-relaxed mt-2.5 mb-2 font-normal">
            {entry.definitionSimple || entry.definitionNovice}
          </span>

          {/* Analogy / Metaphor */}
          {entry.analogie && (
            <span className="block bg-white/80 rounded-xl p-2.5 border border-[#E7DFD3]/70 mb-3">
              <span className="block text-xs italic text-[#1C3F34] leading-snug m-0">
                <span className="font-serif not-italic mr-1 text-[#D97706]">“</span>
                {entry.analogie}
                <span className="font-serif not-italic ml-1 text-[#D97706]">”</span>
              </span>
            </span>
          )}

          {/* Footer Action Link */}
          <span className="flex items-center justify-between pt-1 border-t border-[#E7DFD3]/60">
            <span className="text-[10px] text-[#1C3F34]/70 font-medium">
              Preuve : {entry.niveauPreuve}/5
            </span>
            <a
              href={`/lexique#${entry.slug}`}
              onClick={handleLinkClick}
              className="inline-flex items-center gap-1 text-xs font-bold text-[#D97706] hover:text-[#0F261E] transition-colors group/link py-0.5"
            >
              <span>→ Voir dans le Lexique</span>
              <ArrowRight className="w-3 h-3 group-hover/link:translate-x-0.5 transition-transform" />
            </a>
          </span>
        </span>
      )}
    </span>
  );
};

// Also export alias DefTerm for ergonomic usage
export const DefTerm = TooltipLexique;
export default TooltipLexique;
