import React from 'react';
import { ShieldCheck, BookOpen, AlertCircle, Sparkles } from 'lucide-react';

export type EvidenceLevel = 
  | 'Allégation autorisée'
  | 'Données nutritionnelles générales'
  | 'Données préliminaires'
  | 'Avis professionnel recommandé';

interface EvidenceBadgeProps {
  level: EvidenceLevel;
  className?: string;
}

export function EvidenceBadge({ level, className = '' }: EvidenceBadgeProps) {
  switch (level) {
    case 'Allégation autorisée':
      return (
        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200/80 shadow-xs ${className}`}>
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span>{level}</span>
        </span>
      );
    case 'Données nutritionnelles générales':
      return (
        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#E8F1EE] text-[#1C3F34] border border-[#1C3F34]/20 shadow-xs ${className}`}>
          <BookOpen className="w-3.5 h-3.5 text-[#1C3F34] shrink-0" />
          <span>{level}</span>
        </span>
      );
    case 'Données préliminaires':
      return (
        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-900 border border-amber-200/80 shadow-xs ${className}`}>
          <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
          <span>{level}</span>
        </span>
      );
    case 'Avis professionnel recommandé':
    default:
      return (
        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-purple-50 text-purple-900 border border-purple-200/80 shadow-xs ${className}`}>
          <AlertCircle className="w-3.5 h-3.5 text-purple-600 shrink-0" />
          <span>{level}</span>
        </span>
      );
  }
}
