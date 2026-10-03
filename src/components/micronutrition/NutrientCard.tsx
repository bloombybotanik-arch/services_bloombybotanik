import React, { useState } from 'react';
import { 
  Apple, 
  ShieldCheck, 
  AlertTriangle, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Calendar,
  CheckCircle2,
  FileCheck
} from 'lucide-react';
import { EvidenceBadge, EvidenceLevel } from './EvidenceBadge';
import { SourceItem, SourceList } from './SourceList';

export interface NutrientCardData {
  id: string;
  nom: string;
  sousTitre: string;
  evidenceLevel: EvidenceLevel;
  description_education: string;
  sources_alimentaires: string[];
  allégations_autorisées: string[];
  critères_de_lecture: string[];
  précautions: string[];
  interactions: string[];
  quand_consulter: string;
  sources: SourceItem[];
  date_de_revue: string;
}

interface NutrientCardProps {
  nutrient: NutrientCardData;
  defaultOpen?: boolean;
}

export function NutrientCard({ nutrient, defaultOpen = false }: NutrientCardProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#E7DFD3] shadow-xs overflow-hidden transition-all duration-300 hover:shadow-md">
      {/* Header */}
      <div 
        className="p-5 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer bg-gradient-to-r from-white via-white to-[#FAF7F2]"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="space-y-1.5 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-xl sm:text-2xl font-black text-[#0F261E] tracking-tight">
              {nutrient.nom}
            </h3>
            <EvidenceBadge level={nutrient.evidenceLevel} />
          </div>
          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            {nutrient.sousTitre}
          </p>
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
          <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1">
            <Calendar className="w-3 h-3" /> Revue : {nutrient.date_de_revue}
          </span>
          <button 
            type="button"
            className="w-8 h-8 rounded-full bg-[#FAF7F2] border border-[#E7DFD3] flex items-center justify-center text-[#0F261E] hover:text-[#D97706] transition-colors"
            aria-label={isOpen ? "Fermer les détails" : "Ouvrir les détails"}
          >
            {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Intro Description */}
      <div className="px-5 sm:px-7 pb-5 text-xs sm:text-sm text-slate-700 leading-relaxed font-light border-b border-slate-100">
        <p>{nutrient.description_education}</p>
      </div>

      {/* Accordion Expandable Content */}
      {isOpen && (
        <div className="p-5 sm:p-7 space-y-6 bg-[#FAF7F2]/40 animate-in fade-in duration-300">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 1. Sources Alimentaires */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1C3F34]">
                <Apple className="w-4 h-4 text-emerald-600" />
                <span>Sources Alimentaires Principales</span>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-700">
                {nutrient.sources_alimentaires.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 2. Allégations Autorisées CE n° 1924/2006 */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1C3F34]">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Allégations de Santé Autorisées</span>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-700">
                {nutrient.allégations_autorisées.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="italic">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 3. Critères de Choix & Lecture de l'Étiquette */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1C3F34]">
                <FileCheck className="w-4 h-4 text-[#D97706]" />
                <span>Comment Lire l'Étiquette</span>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-700">
                {nutrient.critères_de_lecture.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#D97706] font-bold">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 4. Précautions & Interactions */}
            <div className="bg-white p-5 rounded-2xl border border-amber-200/70 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-900">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>Précautions & Interactions</span>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-700">
                {nutrient.précautions.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-amber-600 font-bold">!</span>
                    <span>{item}</span>
                  </li>
                ))}
                {nutrient.interactions.map((item, i) => (
                  <li key={`int-${i}`} className="flex items-start gap-2 text-amber-950 font-medium">
                    <span className="text-amber-600 font-bold">↳</span>
                    <span>Interaction : {item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Quand consulter un professionnel */}
          <div className="p-4 rounded-xl bg-purple-50/70 border border-purple-200/80 text-xs text-purple-950 flex items-start gap-3">
            <HelpCircle className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
            <div>
              <strong className="block font-bold mb-0.5">Quand demander l'avis d'un professionnel de santé ?</strong>
              <span>{nutrient.quand_consulter}</span>
            </div>
          </div>

          {/* Sources scientifiques rattachées */}
          {nutrient.sources && nutrient.sources.length > 0 && (
            <SourceList sources={nutrient.sources} title="Références réglementaires pour ce nutriment" />
          )}
        </div>
      )}
    </div>
  );
}
