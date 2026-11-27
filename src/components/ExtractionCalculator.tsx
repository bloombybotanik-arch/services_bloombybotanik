import React, { useState } from 'react';
import { Droplets, Zap, Info, Calculator, CheckCircle2, X, AlertTriangle } from 'lucide-react';

interface ExtractionCalculatorProps {
  onClose?: () => void;
  isModal?: boolean;
}

const START_PRESETS = [96, 95, 90, 75, 70];
const TARGET_PRESETS = [
  { degree: 45, label: '45°', hint: 'Fleurs & feuilles délicates' },
  { degree: 55, label: '55°', hint: 'Sommités & racines tendres' },
  { degree: 60, label: '60°', hint: 'Racines & écorces moyennes' },
  { degree: 70, label: '70°', hint: 'Racines denses, champignons, alcaloïdes' },
  { degree: 75, label: '75°', hint: 'Haute preuve (150 proof) sans eau' },
];

export default function ExtractionCalculator({ onClose }: ExtractionCalculatorProps = {}) {
  const [volume, setVolume] = useState<number>(300);
  const [startDegree, setStartDegree] = useState<number>(96);
  const [targetDegree, setTargetDegree] = useState<number>(60);

  const safeVolume = Number.isFinite(volume) ? Math.min(Math.max(volume, 10), 5000) : 300;
  const safeStart = Number.isFinite(startDegree) ? Math.min(Math.max(startDegree, 1), 100) : 96;
  const safeTarget = Number.isFinite(targetDegree) ? Math.min(Math.max(targetDegree, 1), 100) : 60;
  const isInvalidTarget = safeTarget > safeStart;

  const calculate = () => {
    if (isInvalidTarget || safeStart <= 0) {
      return {
        alcohol: '—',
        water: '—',
        targetProof: (safeTarget * 2).toFixed(0),
        startProof: (safeStart * 2).toFixed(0),
      };
    }
    // Formule de dilution linéaire C1 * V1 = C2 * V2 (approx. volumétrique standard hors contraction)
    const alcoholMl = (safeVolume * safeTarget) / safeStart;
    const waterMl = Math.max(0, safeVolume - alcoholMl);
    return {
      alcohol: alcoholMl.toFixed(1),
      water: waterMl.toFixed(1),
      targetProof: (safeTarget * 2).toFixed(0),
      startProof: (safeStart * 2).toFixed(0),
    };
  };

  const results = calculate();

  return (
    <div
      className="relative rounded-[32px] p-6 sm:p-8 md:p-10 border shadow-2xl transition-all"
      style={{ backgroundColor: '#FAF7F2', borderColor: '#E7DFD3' }}
    >
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-[#3E4A3D]/5 hover:bg-[#3E4A3D]/10 text-[#3E4A3D] transition-colors cursor-pointer"
          aria-label="Fermer la calculatrice"
        >
          <X className="w-5 h-5" />
        </button>
      )}

      <div className="flex items-center gap-3 mb-6 sm:mb-8 pr-8">
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-xs"
          style={{ backgroundColor: '#3E4A3D', color: '#C8AB8A' }}
        >
          <Calculator className="w-6 h-6 text-[#C8AB8A]" />
        </div>
        <div>
          <h3 className="text-xl md:text-2xl font-bold" style={{ color: '#3E4A3D' }}>
            Calculateur de Dilution Hydroalcoolique
          </h3>
          <p className="text-xs font-semibold" style={{ color: '#4A5D4A' }}>
            Calculez les volumes d’alcool de départ ({safeStart}° / {results.startProof} proof) et d’eau distillée selon votre titre cible.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Volume + Alcool de départ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label
              htmlFor="calc-volume-input"
              className="block text-xs font-bold uppercase tracking-widest mb-2.5"
              style={{ color: '#3E4A3D' }}
            >
              Volume Final Souhaité (ml)
            </label>
            <div className="relative">
              <input
                id="calc-volume-input"
                type="number"
                min={10}
                max={5000}
                step={10}
                value={volume}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setVolume(Number.isFinite(val) ? val : 0);
                }}
                onBlur={() => setVolume(safeVolume)}
                className="w-full rounded-2xl px-5 py-3.5 pr-12 font-bold text-lg border focus:outline-none focus:ring-2 focus:ring-[#3E4A3D] transition-all"
                style={{
                  backgroundColor: '#FFFFFF',
                  color: '#3E4A3D',
                  borderColor: '#D8CFBF',
                }}
              />
              <span
                className="absolute right-5 top-1/2 -translate-y-1/2 font-bold text-sm"
                style={{ color: '#3E4A3D', opacity: 0.55 }}
              >
                ml
              </span>
            </div>
            <p className="text-[11px] text-[#3E4A3D]/65 mt-1.5">
              Plage recommandée : 10 ml à 5 000 ml (dans BloomLab®, rester entre MIN et MAX, ~300–1 200 ml).
            </p>
          </div>

          <div>
            <label
              htmlFor="calc-start-abv"
              className="block text-xs font-bold uppercase tracking-widest mb-2.5"
              style={{ color: '#3E4A3D' }}
            >
              Degré d’alcool de départ (% vol.)
            </label>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {START_PRESETS.map((deg) => (
                <button
                  key={deg}
                  type="button"
                  onClick={() => setStartDegree(deg)}
                  className="px-2.5 py-1 rounded-lg text-xs font-bold border transition-all cursor-pointer"
                  style={{
                    backgroundColor: startDegree === deg ? '#3E4A3D' : '#FFFFFF',
                    color: startDegree === deg ? '#FFFFFF' : '#3E4A3D',
                    borderColor: startDegree === deg ? '#3E4A3D' : '#D8CFBF',
                  }}
                >
                  {deg}°
                </button>
              ))}
            </div>
            <div className="relative">
              <input
                id="calc-start-abv"
                type="number"
                min={1}
                max={100}
                step={1}
                value={startDegree}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setStartDegree(Number.isFinite(val) ? val : 0);
                }}
                onBlur={() => setStartDegree(safeStart)}
                className="w-full rounded-2xl px-5 py-2.5 pr-24 font-bold text-base border focus:outline-none focus:ring-2 focus:ring-[#3E4A3D] transition-all"
                style={{
                  backgroundColor: '#FFFFFF',
                  color: '#3E4A3D',
                  borderColor: '#D8CFBF',
                }}
              />
              <span
                className="absolute right-4 top-1/2 -translate-y-1/2 font-semibold text-xs"
                style={{ color: '#3E4A3D', opacity: 0.6 }}
              >
                % ({results.startProof} proof)
              </span>
            </div>
          </div>
        </div>

        {/* Target Degree Selection */}
        <div>
          <label
            htmlFor="calc-target-abv"
            className="block text-xs font-bold uppercase tracking-widest mb-2.5"
            style={{ color: '#3E4A3D' }}
          >
            Degré Cible (selon la matrice végétale)
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 mb-3">
            {TARGET_PRESETS.map((preset) => {
              const isSelected = targetDegree === preset.degree;
              const disabled = preset.degree > safeStart;
              return (
                <button
                  key={preset.degree}
                  type="button"
                  disabled={disabled}
                  onClick={() => setTargetDegree(preset.degree)}
                  title={preset.hint}
                  className="py-2.5 px-2 rounded-xl font-bold text-sm transition-all cursor-pointer border shadow-xs disabled:opacity-40 disabled:cursor-not-allowed flex flex-col items-center justify-center text-center"
                  style={{
                    backgroundColor: isSelected ? '#3E4A3D' : '#FFFFFF',
                    color: isSelected ? '#FFFFFF' : '#3E4A3D',
                    borderColor: isSelected ? '#3E4A3D' : '#D8CFBF',
                  }}
                >
                  <span>{preset.label}</span>
                  <span className={`text-[10px] font-normal leading-tight mt-0.5 ${isSelected ? 'text-white/80' : 'text-[#3E4A3D]/65'}`}>
                    {preset.degree * 2} proof
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-[#3E4A3D]/75 shrink-0">Personnalisé :</span>
            <input
              id="calc-target-abv"
              type="number"
              min={1}
              max={100}
              step={1}
              value={targetDegree}
              onChange={(e) => {
                const val = Number(e.target.value);
                setTargetDegree(Number.isFinite(val) ? val : 0);
              }}
              onBlur={() => setTargetDegree(safeTarget)}
              className="w-28 rounded-xl px-3.5 py-2 font-bold text-sm border bg-white text-[#3E4A3D] border-[#D8CFBF] focus:outline-none focus:ring-2 focus:ring-[#3E4A3D]"
            />
            <span className="text-xs text-[#3E4A3D]/75">
              % vol. ({results.targetProof} US proof) — {TARGET_PRESETS.find((p) => p.degree === targetDegree)?.hint || 'Titre personnalisé'}
            </span>
          </div>
        </div>

        {isInvalidTarget && (
          <div className="flex items-start gap-2.5 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold">
            <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>
              Le degré cible ({safeTarget}°) ne peut pas dépasser le degré de l’alcool de départ ({safeStart}°). Choisissez un titre inférieur ou égal à {safeStart}°, ou un alcool de départ plus concentré.
            </span>
          </div>
        )}

        {/* Results */}
        <div
          className="rounded-2xl p-6 md:p-7 shadow-lg space-y-5"
          style={{ backgroundColor: '#3E4A3D', color: '#ffffff' }}
        >
          <div className="flex flex-wrap items-center justify-between gap-2 text-white/90">
            <div className="flex items-center gap-2">
              <Info className="w-5 h-5 text-[#C8AB8A]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#C8AB8A]">
                Calcul pour {safeVolume} ml à {safeTarget}° ({results.targetProof} proof) — base {safeStart}°
              </span>
            </div>
            <span className="text-[11px] font-mono text-white/70">C1·V1 = C2·V2</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div
              className="p-5 rounded-2xl border transition-all"
              style={{ backgroundColor: 'rgba(200, 171, 138, 0.15)', borderColor: 'rgba(200, 171, 138, 0.4)' }}
            >
              <div className="text-2xl sm:text-3xl font-black text-[#F59E0B]">
                {results.alcohol === '—' ? '—' : `${results.alcohol} ml`}
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-amber-200 mt-1 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-[#F59E0B]" /> Alcool éthylique {safeStart}°
              </div>
            </div>
            <div
              className="p-5 rounded-2xl border transition-all"
              style={{ backgroundColor: 'rgba(14, 165, 233, 0.15)', borderColor: 'rgba(14, 165, 233, 0.4)' }}
            >
              <div className="text-2xl sm:text-3xl font-black text-[#38BDF8]">
                {results.water === '—' ? '—' : `${results.water} ml`}
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-sky-200 mt-1 flex items-center gap-1.5">
                <Droplets className="w-3.5 h-3.5 text-[#38BDF8]" /> Eau distillée / filtrée
              </div>
            </div>
          </div>
        </div>

        <div
          className="flex items-start gap-3 p-4 rounded-2xl border"
          style={{ backgroundColor: '#FFFFFF', borderColor: '#E7DFD3' }}
        >
          <CheckCircle2 className="w-5 h-5 text-[#C8AB8A] shrink-0 mt-0.5" />
          <div className="text-xs leading-relaxed space-y-1.5" style={{ color: '#3E4A3D', opacity: 0.9 }}>
            <p>
              <strong>Repère mathématique indicatif :</strong> ce calcul suit la proportion linéaire <code>C₁·V₁ = C₂·V₂</code> (sans correction de la légère contraction volumique éthanol-eau d’environ 2–3 %). Il ne constitue ni un dosage de consommation ni une recette universelle.
            </p>
            <p>
              <strong>Emploi dans BloomLab® :</strong> le programme prédéfini <strong>Tincture</strong> démarre par défaut à <strong>71 °C (160 °F) pendant 4 h</strong>, et les boutons <strong>TEMP / TIME (+ / -)</strong> permettent de programmer manuellement la température et la durée adaptées à la plante (la touche Sans chauffe correspond à une fonction à température non réglable pour mélanges à froid type vinaigrette, non utilisée pour nos extractions). L’exemple du manuel emploie un alcool ≥ 75 % vol. (150 proof) sans eau ni lécithine ; pour les dilutions hydroalcooliques à l’eau (45°–70°), utiliser un bocal en verre hermétique hors appareil et ne jamais laisser la BloomLab® sans surveillance en fonctionnement ni lorsqu’elle est branchée.
            </p>
            <p>
              <strong>Sécurité physico-chimique (INRS) :</strong> le risque d’inflammation ne dépend pas du point d’ébullition (78 °C). Le point d’éclair de l’éthanol est de <strong>13 °C</strong> pur, <strong>21 °C</strong> à 70 % vol. et <strong>49 °C</strong> à 10 % vol. : à 50 °C comme à 71 °C, les vapeurs sont déjà inflammables et leur pression de vapeur augmente avec la chaleur. Travaillez impérativement en pièce très ventilée, loin de toute flamme ou étincelle, couvercle verrouillé et entre les repères MIN–MAX.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}