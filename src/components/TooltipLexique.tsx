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

  const [coords, setCoords] = useState<{
    left: number;
    top?: number;
    bottom?: number;
    width: number;
    arrowLeft: number;
    placement: 'top' | 'bottom';
  } | null>(null);

  const glossary = useGlossary();
  const entry: LexiqueEntry | undefined = findLexiqueEntry(terme);

  // Check if first occurrence on page
  const [isFirstOccurrence] = useState(() => {
    if (force || !glossary || !entry) return true;
    return glossary.registerTerm(entry.slug);
  });

  const updatePosition = () => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const viewportW = typeof window !== 'undefined' ? window.innerWidth : 1024;
    const viewportH = typeof window !== 'undefined' ? window.innerHeight : 768;
    const margin = 12; // minimum margin from screen edges
    const maxAvailableWidth = Math.max(220, viewportW - margin * 2);
    const width = Math.min(360, maxAvailableWidth);

    const triggerCenterX = rect.left + rect.width / 2;
    let left = triggerCenterX - width / 2;
    if (left < margin) {
      left = margin;
    }
    if (left + width > viewportW - margin) {
      left = Math.max(margin, viewportW - width - margin);
    }

    const arrowLeft = Math.max(16, Math.min(width - 16, triggerCenterX - left));

    const estimatedHeight = 220;
    const spaceAbove = rect.top;
    const spaceBelow = viewportH - rect.bottom;
    const placeAbove = spaceAbove >= estimatedHeight || spaceAbove > spaceBelow;

    if (placeAbove) {
      setCoords({
        left,
        bottom: viewportH - rect.top + 8,
        width,
        arrowLeft,
        placement: 'top'
      });
    } else {
      setCoords({
        left,
        top: rect.bottom + 8,
        width,
        arrowLeft,
        placement: 'bottom'
      });
    }
  };

  useEffect(() => {
    if (isOpen) {
      updatePosition();
      const handleScrollOrResize = () => {
        updatePosition();
      };
      window.addEventListener('resize', handleScrollOrResize);
      window.addEventListener('scroll', handleScrollOrResize, true);
      return () => {
        window.removeEventListener('resize', handleScrollOrResize);
        window.removeEventListener('scroll', handleScrollOrResize, true);
      };
    }
  }, [isOpen]);

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
      const target = event.target as Node;
      if (
        containerRef.current &&
        !containerRef.current.contains(target) &&
        popoverRef.current &&
        !popoverRef.current.contains(target)
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
    updatePosition();
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
    updatePosition();
    setIsOpen((prev) => !prev);
  };

  const handleKeyDownTrigger = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      updatePosition();
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
      className={`relative inline-flex items-baseline group font-inherit max-w-full ${className}`}
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
        className="inline-flex items-baseline gap-0.5 text-left cursor-pointer p-0 bg-transparent border-0 font-inherit text-inherit focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D97706] focus-visible:ring-offset-1 rounded-xs transition-colors max-w-full"
      >
        <span className="underline decoration-dotted decoration-[#D97706] underline-offset-4 font-inherit decoration-2 text-inherit group-hover:text-[#0F261E] group-hover:decoration-[#0F261E] transition-colors break-words">
          {children || entry.terme}
        </span>
        <span
          className="inline-flex items-center justify-center w-3 h-3 text-[#D97706] group-hover:text-[#0F261E] transition-colors translate-y-0.5 opacity-80 ml-0.5 shrink-0"
          aria-hidden="true"
        >
          <Info className="w-3 h-3" />
        </span>
      </button>

      {/* Accessible Popover positioned with viewport-safe fixed positioning */}
      {isOpen && coords && (
        <span
          id={popoverId}
          ref={popoverRef}
          role="dialog"
          aria-modal="false"
          aria-label={`Définition de ${entry.terme}`}
          className="fixed z-[9999] bg-[#FAF7F2] opacity-100 border border-[#E7DFD3] rounded-2xl shadow-2xl p-4 text-[#0F261E] text-left animate-in fade-in zoom-in-95 duration-150 block cursor-default font-normal whitespace-normal select-text pointer-events-auto"
          style={{
            left: `${coords.left}px`,
            ...(coords.top !== undefined ? { top: `${coords.top}px` } : {}),
            ...(coords.bottom !== undefined ? { bottom: `${coords.bottom}px` } : {}),
            width: `${coords.width}px`,
            maxWidth: 'calc(100vw - 24px)',
            backgroundColor: '#FAF7F2',
            opacity: 1,
            backdropFilter: 'none',
            WebkitBackdropFilter: 'none',
            boxShadow: '0 20px 45px -10px rgba(15, 38, 30, 0.45), 0 0 0 1px #E7DFD3',
            isolation: 'isolate'
          }}
          onMouseEnter={() => {
            if (closeTimeoutRef.current) {
              clearTimeout(closeTimeoutRef.current);
              closeTimeoutRef.current = null;
            }
          }}
          onMouseLeave={handleMouseLeave}
        >
          {/* Triangular arrow indicator aligned to trigger center */}
          <span
            className={`absolute w-3 h-3 ${
              coords.placement === 'top'
                ? 'top-full -mt-[6px] border-r border-b border-[#E7DFD3] rotate-45'
                : 'bottom-full -mb-[6px] border-l border-t border-[#E7DFD3] rotate-45'
            } block`}
            style={{ left: `${coords.arrowLeft}px`, backgroundColor: '#FAF7F2', opacity: 1 }}
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
          <span className="block text-xs sm:text-[13px] text-[#0F261E] leading-relaxed mt-2.5 mb-2 font-medium">
            {entry.definitionSimple || entry.definitionNovice}
          </span>

          {/* Analogy / Metaphor */}
          {entry.analogie && (
            <span className="block bg-white rounded-xl p-2.5 border border-[#E7DFD3] mb-3 opacity-100 shadow-xs">
              <span className="block text-xs italic text-[#1C3F34] leading-snug m-0 font-medium">
                <span className="not-italic mr-1 text-[#D97706]">“</span>
                {entry.analogie}
                <span className="not-italic ml-1 text-[#D97706]">”</span>
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
