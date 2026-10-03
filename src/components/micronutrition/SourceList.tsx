import React from 'react';
import { ExternalLink, BookOpen, ShieldCheck } from 'lucide-react';

export interface SourceItem {
  organisme_ou_revue: string;
  titre: string;
  date: string;
  lien: string;
  date_de_consultation: string;
}

interface SourceListProps {
  sources: SourceItem[];
  title?: string;
  className?: string;
}

export function SourceList({
  sources,
  title = "Sources scientifiques & Réglementaires vérifiables",
  className = ""
}: SourceListProps) {
  if (!sources || sources.length === 0) return null;

  return (
    <div className={`bg-white rounded-2xl p-6 border border-[#E7DFD3] space-y-4 ${className}`}>
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1C3F34]">
        <BookOpen className="w-4 h-4 text-[#D97706]" />
        <span>{title}</span>
      </div>

      <div className="divide-y divide-slate-100">
        {sources.map((src, i) => (
          <div key={i} className="py-3 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 text-xs">
            <div className="space-y-0.5">
              <span className="font-bold text-[#0F261E] block sm:inline mr-2">
                [{src.organisme_ou_revue}]
              </span>
              <span className="text-slate-700 italic">
                « {src.titre} » ({src.date})
              </span>
              <span className="block text-[11px] text-slate-400">
                Consulté le {src.date_de_consultation}
              </span>
            </div>

            {src.lien && (
              <a
                href={src.lien}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#D97706] hover:text-[#b45309] hover:underline shrink-0"
              >
                <span>Accéder</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        ))}
      </div>

      <div className="pt-2 border-t border-slate-100 flex items-center gap-2 text-[10px] text-slate-400">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
        <span>Toutes les allégations sont indexées au registre européen (Règlement CE n° 1924/2006) ou aux avis ANSES / EFSA.</span>
      </div>
    </div>
  );
}
