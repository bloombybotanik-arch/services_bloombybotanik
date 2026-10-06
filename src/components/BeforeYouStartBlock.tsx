import React from 'react';
import { 
  ShieldCheck, 
  Clock, 
  Wrench, 
  Layers, 
  AlertTriangle, 
  CheckCircle2, 
  Archive, 
  HelpCircle,
  Thermometer,
  Sparkles
} from 'lucide-react';
import { 
  RecipeDifficultyMetadata, 
  getRecipeDifficulty, 
  formatDifficultyDots, 
  getDifficultyColor,
  getCategoryBadge,
  RecipeCategory 
} from '../data/recipeDifficulty';

interface BeforeYouStartBlockProps {
  recipeId?: string;
  metadata?: RecipeDifficultyMetadata;
  fallback?: {
    title?: string;
    category?: RecipeCategory;
    ingredientCount?: number;
    stepsCount?: number;
    isCosmetic?: boolean;
    durationMinutes?: number;
  };
  className?: string;
}

export const BeforeYouStartBlock: React.FC<BeforeYouStartBlockProps> = ({
  recipeId,
  metadata: providedMeta,
  fallback,
  className = ''
}) => {
  const metadata: RecipeDifficultyMetadata = 
    providedMeta || (recipeId ? getRecipeDifficulty(recipeId, fallback) : getRecipeDifficulty('default', fallback));

  const colorStyles = getDifficultyColor(metadata.difficultyLevel);
  const categoryBadge = getCategoryBadge(metadata.category);
  const dots = formatDifficultyDots(metadata.difficultyLevel);

  const formatHours = (minutes: number) => {
    if (minutes < 60) return `${minutes} minutes`;
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return m > 0 ? `${h}h${m.toString().padStart(2, '0')}` : `${h} heure${h > 1 ? 's' : ''}`;
  };

  return (
    <section 
      aria-labelledby="before-you-start-heading"
      className={`my-8 bg-[#FAF7F2] border border-[#E7DFD3] rounded-3xl p-6 sm:p-8 shadow-xs space-y-6 ${className}`}
    >
      {/* En-tête : Titre & Badge Difficulté */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#E7DFD3]">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2">
            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${categoryBadge.bg} ${categoryBadge.text} ${categoryBadge.border}`}>
              {categoryBadge.label}
            </span>
            <span className="text-[11px] font-mono text-[#0F261E]/60 uppercase tracking-widest font-bold">
              Checklist Pré-Extraction
            </span>
          </div>
          <h3 
            id="before-you-start-heading" 
            className="text-xl sm:text-2xl font-black text-[#0F261E] tracking-tight flex items-center gap-2"
          >
            <ShieldCheck className="w-5 h-5 text-[#D97706]" />
            Avant de commencer
          </h3>
        </div>

        {/* Badge Difficulté Accessible */}
        <div 
          className={`self-start sm:self-auto inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl border ${colorStyles.bg} ${colorStyles.text} ${colorStyles.border} shadow-2xs`}
          role="status"
          aria-label={`Difficulté : niveau ${metadata.difficultyLevel} sur 5, ${metadata.difficultyLabel}.`}
        >
          <span className="font-mono text-sm tracking-wider font-black" aria-hidden="true">{dots}</span>
          <div className="text-left leading-tight">
            <span className="block text-[10px] uppercase tracking-wider font-extrabold opacity-75">Niveau Technique</span>
            <span className="text-xs sm:text-sm font-black">
              {metadata.difficultyLabel} — {metadata.difficultyLevel}/5
            </span>
          </div>
        </div>
      </div>

      {/* Pourquoi ce niveau ? */}
      <div className="bg-white/80 p-4 sm:p-5 rounded-2xl border border-[#E7DFD3]/80 space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0F261E]/80">
          <HelpCircle className="w-4 h-4 text-[#D97706]" />
          <span>Pourquoi ce niveau ?</span>
        </div>
        <p className="text-sm sm:text-base text-[#0F261E]/90 leading-relaxed font-normal">
          {metadata.difficultyReason}
        </p>
      </div>

      {/* Grille Temps (Actif, Machine, Total) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-white p-4 rounded-2xl border border-[#E7DFD3]/70 space-y-1">
          <div className="flex items-center gap-1.5 text-xs text-[#0F261E]/60 font-semibold uppercase tracking-wider">
            <Clock className="w-3.5 h-3.5 text-[#D97706]" />
            <span>Temps actif estimé</span>
          </div>
          <p className="text-lg font-black text-[#0F261E]">
            ~{metadata.activeTimeMinutes} min
          </p>
          <p className="text-[11px] text-[#0F261E]/60">Pesée, préparation & filtrage</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-[#E7DFD3]/70 space-y-1">
          <div className="flex items-center gap-1.5 text-xs text-[#0F261E]/60 font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#1C3F34]" />
            <span>Temps cycle BloomLab</span>
          </div>
          <p className="text-lg font-black text-[#0F261E]">
            ~{formatHours(metadata.machineTimeMinutes)}
          </p>
          <p className="text-[11px] text-[#0F261E]/60">Thermorégulation & vortex</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-[#E7DFD3]/70 space-y-1">
          <div className="flex items-center gap-1.5 text-xs text-[#0F261E]/60 font-semibold uppercase tracking-wider">
            <Thermometer className="w-3.5 h-3.5 text-[#D97706]" />
            <span>Temps total estimé</span>
          </div>
          <p className="text-lg font-black text-[#0F261E]">
            ~{formatHours(metadata.totalTimeMinutes)}
          </p>
          <p className="text-[11px] text-[#0F261E]/60">De la plante au flacon prêt</p>
        </div>
      </div>

      {/* Matériel nécessaire & Étapes clés */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Matériel */}
        <div className="bg-white p-5 rounded-2xl border border-[#E7DFD3]/70 space-y-3">
          <h4 className="text-xs font-black uppercase tracking-wider text-[#0F261E] flex items-center gap-2">
            <Wrench className="w-3.5 h-3.5 text-[#D97706]" />
            Matériel nécessaire
          </h4>
          <ul className="space-y-1.5 text-xs sm:text-sm text-[#0F261E]/85">
            {metadata.materialsNeeded.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Étapes clés */}
        <div className="bg-white p-5 rounded-2xl border border-[#E7DFD3]/70 space-y-3">
          <h4 className="text-xs font-black uppercase tracking-wider text-[#0F261E] flex items-center gap-2">
            <Layers className="w-3.5 h-3.5 text-[#1C3F34]" />
            Étapes techniques clés
          </h4>
          <ol className="space-y-1.5 text-xs sm:text-sm text-[#0F261E]/85 list-decimal list-inside">
            {metadata.keySteps.map((step, idx) => (
              <li key={idx} className="leading-snug">
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Conservation & Précautions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Conservation */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E7DFD3]/70 space-y-2">
          <h4 className="text-xs font-black uppercase tracking-wider text-[#0F261E] flex items-center gap-2">
            <Archive className="w-3.5 h-3.5 text-[#1C3F34]" />
            Exigences de conservation
          </h4>
          <p className="text-xs sm:text-sm text-[#0F261E]/85 leading-relaxed">
            {metadata.conservationRequirement}
          </p>
        </div>

        {/* Précautions techniques */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E7DFD3]/70 space-y-2">
          <h4 className="text-xs font-black uppercase tracking-wider text-[#0F261E] flex items-center gap-2">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
            Précautions techniques & sécurité
          </h4>
          <ul className="space-y-1 text-xs text-[#0F261E]/85">
            {metadata.allergensOrPrecautions.map((p, idx) => (
              <li key={idx} className="flex items-start gap-1.5">
                <span className="text-amber-600 shrink-0 font-bold">•</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Disclaimer Légal & Éducatif Obligatoire */}
      <div className="pt-2 border-t border-[#E7DFD3]/70">
        <p className="text-[11px] leading-relaxed text-[#0F261E]/60 font-sans italic">
          <strong>Vocation éducative :</strong> Les contenus Bloom by BotaniK sont strictement éducatifs et techniques. Ils ne constituent pas un avis médical, dermatologique, pharmaceutique ou nutritionnel et ne se substituent à aucun traitement. En cas de grossesse, allaitement, allergie, affection chronique ou traitement médical, demandez conseil à un professionnel de santé.
        </p>
      </div>
    </section>
  );
};

export default BeforeYouStartBlock;
