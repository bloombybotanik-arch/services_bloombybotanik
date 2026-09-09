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
    <div 
      className="rounded-[32px] p-8 md:p-10 border shadow-xl transition-all"
      style={{ backgroundColor: '#FAF7F2', borderColor: '#E7DFD3' }}
    >
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-xs" style={{ backgroundColor: '#0F261E', color: '#D97706' }}>
          <Calculator className="w-6 h-6 text-[#D97706]" />
        </div>
        <div>
          <h3 className="text-xl md:text-2xl font-bold" style={{ color: '#0F261E' }}>Calculateur de Dilution</h3>
          <p className="text-xs font-semibold" style={{ color: '#1C3F34', opacity: 0.75 }}>
            Ajustez le volume et le degré cible pour obtenir les volumes précis d'alcool 96° et d'eau distillée.
          </p>
        </div>
      </div>

      <div className="space-y-8">
        {/* Volume Input */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#0F261E' }}>
            Volume Final Souhaité (ml)
          </label>
          <div className="relative">
            <input 
              type="number" 
              value={volume}
              onChange={(e) => setVolume(Math.max(1, Number(e.target.value)))}
              className="w-full rounded-2xl px-6 py-4 font-bold text-lg border focus:outline-none focus:ring-2 transition-all"
              style={{ 
                backgroundColor: '#FFFFFF', 
                color: '#0F261E', 
                borderColor: '#D8CFBF' 
              }}
            />
            <span className="absolute right-6 top-1/2 -translate-y-1/2 font-bold text-sm" style={{ color: '#0F261E', opacity: 0.45 }}>ml</span>
          </div>
        </div>

        {/* Target Degree Selection */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#0F261E' }}>
            Degré Cible (Degré de Macération)
          </label>
          <div className="grid grid-cols-3 gap-3">
            {[45, 55, 60].map((degree) => {
              const isSelected = targetDegree === degree;
              return (
                <button
                  key={degree}
                  type="button"
                  onClick={() => setTargetDegree(degree as any)}
                  className="py-3.5 rounded-xl font-bold text-sm md:text-base transition-all cursor-pointer border shadow-sm"
                  style={{
                    backgroundColor: isSelected ? '#0F261E' : '#FFFFFF',
                    color: isSelected ? '#FFFFFF' : '#0F261E',
                    borderColor: isSelected ? '#0F261E' : '#D8CFBF'
                  }}
                >
                  {degree}°
                </button>
              );
            })}
          </div>
        </div>

        {/* Results */}
        <div 
          className="rounded-2xl p-6 md:p-8 shadow-lg space-y-6"
          style={{ backgroundColor: '#0F261E', color: '#ffffff' }}
        >
          <div className="flex items-center gap-2 text-white/90">
            <Info className="w-5 h-5 text-[#D97706]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#D97706]">
              Dosages Précis (Alcool 96°)
            </span>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div 
              className="p-5 rounded-2xl border transition-all"
              style={{ backgroundColor: 'rgba(217, 119, 6, 0.15)', borderColor: 'rgba(217, 119, 6, 0.4)' }}
            >
              <div className="text-2xl sm:text-3xl font-black text-[#F59E0B]">{results.alcohol} ml</div>
              <div className="text-xs font-bold uppercase tracking-wider text-amber-200 mt-1 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-[#F59E0B]" /> Alcool 96°
              </div>
            </div>
            <div 
              className="p-5 rounded-2xl border transition-all"
              style={{ backgroundColor: 'rgba(14, 165, 233, 0.15)', borderColor: 'rgba(14, 165, 233, 0.4)' }}
            >
              <div className="text-2xl sm:text-3xl font-black text-[#38BDF8]">{results.water} ml</div>
              <div className="text-xs font-bold uppercase tracking-wider text-sky-200 mt-1 flex items-center gap-1.5">
                <Droplets className="w-3.5 h-3.5 text-[#38BDF8]" /> Eau Distillée
              </div>
            </div>
          </div>
        </div>

        <div 
          className="flex items-start gap-3 p-4 rounded-2xl border"
          style={{ backgroundColor: '#FFFFFF', borderColor: '#E7DFD3' }}
        >
          <CheckCircle2 className="w-5 h-5 text-[#D97706] shrink-0 mt-0.5" />
          <p className="text-xs leading-relaxed italic" style={{ color: '#0F261E', opacity: 0.85 }}>
            Ce protocole est optimisé pour une extraction à basse température avec la <strong>BloomLab®</strong> afin de préserver l'intégralité du Totum végétal.
          </p>
        </div>
      </div>
    </div>
  );
}
