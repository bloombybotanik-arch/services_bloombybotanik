import React, { useState } from 'react';
import { motion } from 'motion/react';
import { FlaskConical, Droplets, Zap, Info, Calculator, CheckCircle2 } from 'lucide-react';

export default function ExtractionCalculator() {
  const [volume, setVolume] = useState<number>(100);
  const [targetDegree, setTargetDegree] = useState<45 | 55 | 60>(45);

  const calculate = () => {
    // Ratios for Alcohol 96°
    const ratios = {
      45: { alcohol: 0.469, water: 0.531 },
      55: { alcohol: 0.573, water: 0.427 },
      60: { alcohol: 0.625, water: 0.375 }
    };

    const ratio = ratios[targetDegree];
    return {
      alcohol: (volume * ratio.alcohol).toFixed(1),
      water: (volume * ratio.water).toFixed(1)
    };
  };

  const results = calculate();

  return (
    <div className="bg-white rounded-[32px] p-8 border border-botanik-green/5 shadow-xl">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-botanik-orange/10 rounded-xl flex items-center justify-center">
          <Calculator className="w-5 h-5 text-botanik-orange" />
        </div>
        <h3 className="text-xl font-bold text-botanik-green">Calculateur de Dilution</h3>
      </div>

      <div className="space-y-8">
        {/* Volume Input */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-botanik-green/40 mb-3">
            Volume Final Souhaité (ml)
          </label>
          <div className="relative">
            <input 
              type="number" 
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="w-full bg-botanik-bg border-none rounded-2xl px-6 py-4 text-botanik-green font-bold focus:ring-2 focus:ring-botanik-orange/20 transition-all"
            />
            <span className="absolute right-6 top-1/2 -translate-y-1/2 font-bold text-botanik-green/20">ml</span>
          </div>
        </div>

        {/* Target Degree Selection */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-botanik-green/40 mb-3">
            Degré Cible (Degré de Macération)
          </label>
          <div className="grid grid-cols-3 gap-3">
            {[45, 55, 60].map((degree) => (
              <button
                key={degree}
                onClick={() => setTargetDegree(degree as any)}
                className={`py-3 rounded-xl font-bold text-sm transition-all ${
                  targetDegree === degree 
                    ? 'bg-botanik-green text-white shadow-lg shadow-botanik-green/20' 
                    : 'bg-botanik-bg text-botanik-green/40 hover:bg-botanik-green/5'
                }`}
              >
                {degree}°
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="bg-botanik-green rounded-2xl p-6 text-white">
          <div className="flex items-center gap-2 mb-6 text-white/60">
            <Info className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Dosages Précis (Alcool 96°)</span>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="text-2xl font-bold">{results.alcohol} ml</div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-white/40 flex items-center gap-1">
                <Zap className="w-3 h-3 text-botanik-orange" /> Alcool 96°
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold">{results.water} ml</div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-white/40 flex items-center gap-1">
                <Droplets className="w-3 h-3 text-blue-400" /> Eau Distillée
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-start gap-3 p-4 bg-botanik-orange/5 rounded-2xl border border-botanik-orange/10">
          <CheckCircle2 className="w-5 h-5 text-botanik-orange shrink-0 mt-0.5" />
          <p className="text-[10px] text-botanik-green/60 leading-relaxed italic">
            Ce protocole est optimisé pour une extraction à basse température avec la <strong>BloomLab®</strong> afin de préserver l'intégralité du Totum végétal.
          </p>
        </div>
      </div>
    </div>
  );
}
