import React from 'react';
import { AlertTriangle, AlertCircle, Info, ShieldAlert } from 'lucide-react';

export type VigilanceLevel = 'information' | 'moderee' | 'imperatif';

interface SafetyBoxProps {
  niveau_de_vigilance?: VigilanceLevel;
  titre?: string;
  situations_concernées?: string[];
  action_recommandée?: string;
  isGlobalNotice?: boolean;
  className?: string;
}

export function SafetyBox({
  niveau_de_vigilance = 'moderee',
  titre,
  situations_concernées,
  action_recommandée,
  isGlobalNotice = false,
  className = '',
}: SafetyBoxProps) {
  if (isGlobalNotice) {
    return (
      <div className={`p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-[#FAF7F2] border-2 border-[#D97706]/40 text-[#0F261E] shadow-sm ${className}`}>
        <div className="flex items-start gap-3.5">
          <div className="p-2 rounded-xl bg-[#D97706]/15 text-[#D97706] shrink-0 mt-0.5">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div className="space-y-2 text-xs sm:text-sm leading-relaxed">
            <h4 className="font-extrabold uppercase tracking-wider text-xs text-[#0F261E]">
              Cadre Réglementaire & Sécurité d'Usage
            </h4>
            <p className="text-slate-700">
              <strong>Contenu éducatif :</strong> les compléments alimentaires ne remplacent ni une alimentation variée et équilibrée, ni un mode de vie sain, ni un suivi médical. Demandez conseil à un médecin ou à un pharmacien avant toute supplémentation en cas de grossesse, allaitement, maladie chronique, traitement médicamenteux, intervention chirurgicale programmée ou symptômes persistants.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const levelStyles = {
    information: {
      bg: 'bg-emerald-50/70',
      border: 'border-emerald-200',
      iconBg: 'bg-emerald-100 text-emerald-700',
      icon: <Info className="w-5 h-5" />,
      tag: 'Information & Bon sens',
      tagColor: 'text-emerald-800'
    },
    moderee: {
      bg: 'bg-amber-50/70',
      border: 'border-amber-200',
      iconBg: 'bg-amber-100 text-amber-700',
      icon: <AlertTriangle className="w-5 h-5" />,
      tag: 'Vigilance Recommandée',
      tagColor: 'text-amber-800'
    },
    imperatif: {
      bg: 'bg-rose-50/70',
      border: 'border-rose-200',
      iconBg: 'bg-rose-100 text-rose-700',
      icon: <AlertCircle className="w-5 h-5" />,
      tag: 'Avis Médical Impératif',
      tagColor: 'text-rose-800'
    }
  };

  const current = levelStyles[niveau_de_vigilance] || levelStyles.moderee;

  return (
    <div className={`p-5 sm:p-6 rounded-2xl border ${current.bg} ${current.border} space-y-3.5 shadow-xs ${className}`}>
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-xl ${current.iconBg} shrink-0`}>
          {current.icon}
        </div>
        <div>
          <span className={`text-[10px] font-black uppercase tracking-widest ${current.tagColor}`}>
            {current.tag}
          </span>
          <h4 className="font-bold text-sm sm:text-base text-[#0F261E]">
            {titre || (niveau_de_vigilance === 'imperatif' ? 'Précautions Médicales Strictes' : 'Points d\'Attention')}
          </h4>
        </div>
      </div>

      {situations_concernées && situations_concernées.length > 0 && (
        <div className="space-y-1.5 pt-1">
          <span className="text-xs font-semibold text-slate-600 block">Situations concernées :</span>
          <ul className="space-y-1 text-xs text-slate-700 list-disc list-inside">
            {situations_concernées.map((sit, i) => (
              <li key={i} className="leading-relaxed">{sit}</li>
            ))}
          </ul>
        </div>
      )}

      {action_recommandée && (
        <div className="pt-2 border-t border-black/5 text-xs text-slate-800 leading-relaxed">
          <strong className="text-[#0F261E]">Action recommandée :</strong> {action_recommandée}
        </div>
      )}
    </div>
  );
}
