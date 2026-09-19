// src/components/ExtractionKineticsChart.tsx
import React, { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { FlaskConical, Flame, Wind, Thermometer } from 'lucide-react';

type Lang = 'fr' | 'en' | 'de';

/* ============================================================================
   MODÈLE CINÉTIQUE PÉDAGOGIQUE (Loi de Fick + dégradation type Q10/Arrhenius)
   ----------------------------------------------------------------------------
   dE/dt = k_ext(T) · (Emax − E)        // diffusion du principe actif (Fick, 1er ordre)
   dI/dt = dE/dt − k_deg(T) · I         // I = actifs INTACTS (extraits − dégradés)
   k_ext(T) = k_ref · 2^((T−45)/18)     // l'extraction accélère avec T
   k_deg(T) = k_ref · 2^((T−45)/10)     // Q10 : la dégradation ≈ double tous les +10 °C
   ⚠️ Modèle ILLUSTRATIF et pédagogique — PAS une mesure clinique contractuelle.
   ============================================================================ */
const K_EXT_REF = 0.35;
const K_DEG_REF = 0.015;
const OXIDATION_AIR_LIBRE = 0.035; // macération ouverte : rancissement oxydatif
const H_MAX = 6;
const DT = 0.05;

const kExt = (T: number) => K_EXT_REF * Math.pow(2, (T - 45) / 18);
const kDeg = (T: number, openAir = false) =>
  K_DEG_REF * Math.pow(2, (T - 45) / 10) + (openAir ? OXIDATION_AIR_LIBRE : 0);

interface Method {
  id: 'bloomlab' | 'bainmarie' | 'passive';
  color: string;
  emax: number;
  openAir?: boolean;
  temp: (t: number) => number;
}

const METHODS: Method[] = [
  { id: 'bloomlab',  color: '#D97706', emax: 96, temp: (t) => (t < 2 ? 72 : 50) }, // Séquençage A/B
  { id: 'bainmarie', color: '#B91C1C', emax: 92, temp: () => 98 },                  // eau bouillante non régulée
  { id: 'passive',   color: '#64748B', emax: 62, openAir: true, temp: () => 22 },   // macération solaire ouverte
];

function simulate(emax: number, temp: (t: number) => number, openAir = false) {
  const pts: { t: number; intact: number }[] = [];
  let E = 0, I = 0;
  for (let t = 0; t <= H_MAX + 1e-9; t += DT) {
    pts.push({ t: +t.toFixed(2), intact: I });
    const T = temp(t);
    const dE = kExt(T) * (emax - E) * DT;
    const dI = dE - kDeg(T, openAir) * I * DT;
    E += dE;
    I = Math.max(0, I + dI);
  }
  return pts;
}

const STR = {
  fr: {
    badge: 'Preuve cinétique', title: 'Pourquoi la température fait tout : la cinétique d\u2019extraction',
    sub: 'Actifs intacts récupérables au fil du temps, selon la méthode (modèle de diffusion de Fick + dégradation thermique).',
    bloomlab: 'BloomLab® — Séquençage A/B (72 °C → 50 °C)',
    bainmarie: 'Bain-marie / eau bouillante (~98 °C, non régulé)',
    passive: 'Macération solaire ouverte (20-22 °C, 4-6 semaines)',
    hours: 'Temps (heures)', intact: 'Actifs intacts (%)',
    simTitle: 'Simulez votre propre méthode', simHint: 'Réglez la température constante de votre extraction :',
    at3h: 'Actifs intacts à 3 h',
    verdictLow: 'Extraction trop lente : le rendement plafonne.',
    verdictOpt: 'Fenêtre optimale BloomLab® : extraction efficace, dégradation minimale.',
    verdictHigh: 'Dégradation thermique dominante : les actifs extraits sont détruits plus vite qu\u2019ils ne sortent.',
    footnote: 'Modèle pédagogique illustratif (diffusion de Fick au 1er ordre + cinétique de dégradation type Q10). Courbes non contractuelles : ce graphique n\u2019est pas une mesure d\u2019efficacité clinique.',
    hover: 'h',
  },
  en: {
    badge: 'Kinetic evidence', title: 'Why temperature is everything: extraction kinetics',
    sub: 'Intact actives recovered over time, by method (Fick diffusion model + thermal degradation).',
    bloomlab: 'BloomLab® — Sequential A/B (72 °C → 50 °C)',
    bainmarie: 'Double-boiler / boiling water (~98 °C, unregulated)',
    passive: 'Open solar maceration (20-22 °C, 4-6 weeks)',
    hours: 'Time (hours)', intact: 'Intact actives (%)',
    simTitle: 'Simulate your own method', simHint: 'Set the constant temperature of your extraction:',
    at3h: 'Intact actives at 3 h',
    verdictLow: 'Extraction too slow: yield plateaus.',
    verdictOpt: 'BloomLab® optimal window: efficient extraction, minimal degradation.',
    verdictHigh: 'Thermal degradation dominates: actives are destroyed faster than extracted.',
    footnote: 'Illustrative educational model (first-order Fick diffusion + Q10-type degradation kinetics). Curves are not contractual: this chart is not a clinical efficacy measurement.',
    hover: 'h',
  },
  de: {
    badge: 'Kinetischer Nachweis', title: 'Warum die Temperatur alles entscheidet: Extraktionskinetik',
    sub: 'Intakte Wirkstoffe über die Zeit, je nach Methode (Fick-Diffusionsmodell + thermischer Abbau).',
    bloomlab: 'BloomLab® — Sequenzielle A/B (72 °C → 50 °C)',
    bainmarie: 'Wasserbad / kochendes Wasser (~98 °C, ungeregelt)',
    passive: 'Offene Sonnenmazeration (20-22 °C, 4-6 Wochen)',
    hours: 'Zeit (Stunden)', intact: 'Intakte Wirkstoffe (%)',
    simTitle: 'Simulieren Sie Ihre Methode', simHint: 'Stellen Sie die konstante Temperatur ein:',
    at3h: 'Intakte Wirkstoffe nach 3 h',
    verdictLow: 'Extraktion zu langsam: die Ausbeute stagniert.',
    verdictOpt: 'Optimales BloomLab®-Fenster: effiziente Extraktion, minimaler Abbau.',
    verdictHigh: 'Thermischer Abbau dominiert: Wirkstoffe werden schneller zerstört als extrahiert.',
    footnote: 'Illustratives Lehrmodell (Fick-Diffusion 1. Ordnung + Q10-Abbaukinetik). Kurven nicht vertraglich: keine klinische Wirksamkeitsmessung.',
    hover: 'h',
  },
} as const;

/* ---- Géométrie SVG ---- */
const W = 640, H = 360, PL = 48, PR = 16, PT = 16, PB = 40;
const px = (t: number) => PL + (t / H_MAX) * (W - PL - PR);
const py = (v: number) => PT + (1 - v / 100) * (H - PT - PB);
const toPath = (pts: { t: number; intact: number }[]) =>
  pts.map((p, i) => `${i ? 'L' : 'M'}${px(p.t).toFixed(1)},${py(p.intact).toFixed(1)}`).join(' ');
const valueAt = (pts: { t: number; intact: number }[], t: number) =>
  pts[Math.min(pts.length - 1, Math.max(0, Math.round(t / DT)))].intact;

export default function ExtractionKineticsChart({ lang = 'fr' }: { lang?: Lang }) {
  const s = STR[lang];
  const curves = useMemo(() => METHODS.map((m) => ({ m, pts: simulate(m.emax, m.temp, m.openAir) })), []);
  const [customT, setCustomT] = useState(72);
  const customPts = useMemo(() => simulate(90, () => customT), [customT]);
  const [hoverT, setHoverT] = useState<number | null>(null);

  const customAt3h = valueAt(customPts, 3);
  const verdict = customT < 45 ? s.verdictLow : customT <= 80 ? s.verdictOpt : s.verdictHigh;

  const onMove = (e: React.PointerEvent<SVGSVGElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const vx = ((e.clientX - r.left) / r.width) * W;
    const t = ((vx - PL) / (W - PL - PR)) * H_MAX;
    setHoverT(t >= 0 && t <= H_MAX ? t : null);
  };

  return (
    <section id="cinetique" className="py-16 md:py-24 bg-[#FAF7F2] border-y border-[#F3EEE6]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#E8F1EE] text-[#1C3F34] text-[10px] font-black uppercase tracking-widest rounded-md border border-[#D8CBB7]">
            <FlaskConical className="w-3.5 h-3.5 text-[#D97706]" />
            <span>{s.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0F261E] tracking-tight">{s.title}</h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">{s.sub}</p>
        </div>

        <figure className="bg-white rounded-[32px] border border-[#E7DFD3] shadow-sm p-4 sm:p-8 space-y-6">
          <svg
            viewBox={`0 0 ${W} ${H}`}
            className="w-full h-auto select-none"
            role="img"
            aria-label={s.sub}
            onPointerMove={onMove}
            onPointerLeave={() => setHoverT(null)}
          >
            {/* Grille */}
            {[0, 20, 40, 60, 80, 100].map((v) => (
              <g key={v}>
                <line x1={PL} x2={W - PR} y1={py(v)} y2={py(v)} stroke="#F3EEE6" strokeWidth={1} />
                <text x={PL - 8} y={py(v) + 4} textAnchor="end" fontSize={10} fill="#94A3B8">{v}</text>
              </g>
            ))}
            {[0, 1, 2, 3, 4, 5, 6].map((t) => (
              <g key={t}>
                <line x1={px(t)} x2={px(t)} y1={PT} y2={H - PB} stroke="#F3EEE6" strokeWidth={1} />
                <text x={px(t)} y={H - PB + 16} textAnchor="middle" fontSize={10} fill="#94A3B8">{t}{s.hover}</text>
              </g>
            ))}
            <text x={PL} y={H - 6} fontSize={10} fill="#64748B" fontWeight={700}>{s.hours}</text>
            <text x={PL} y={PT - 4} fontSize={10} fill="#64748B" fontWeight={700}>{s.intact}</text>

            {/* Courbes méthodes */}
            {curves.map(({ m, pts }) => (
              <motion.path
                key={m.id}
                d={toPath(pts)}
                fill="none"
                stroke={m.color}
                strokeWidth={3}
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.4, ease: 'easeOut' }}
              />
            ))}

            {/* Courbe simulée (pointillés) */}
            <path d={toPath(customPts)} fill="none" stroke="#1C3F34" strokeWidth={2.5} strokeDasharray="6 5" />

            {/* Ligne de survol */}
            {hoverT !== null && (
              <g>
                <line x1={px(hoverT)} x2={px(hoverT)} y1={PT} y2={H - PB} stroke="#0F261E" strokeWidth={1} strokeDasharray="3 3" />
                {curves.map(({ m, pts }) => (
                  <circle key={m.id} cx={px(hoverT)} cy={py(valueAt(pts, hoverT))} r={4.5} fill={m.color} stroke="#fff" strokeWidth={2} />
                ))}
                <circle cx={px(hoverT)} cy={py(valueAt(customPts, hoverT))} r={4.5} fill="#1C3F34" stroke="#fff" strokeWidth={2} />
                <g transform={`translate(${Math.min(px(hoverT) + 10, W - 190)}, ${PT + 6})`}>
                  <rect width={180} height={92} rx={10} fill="#0F261E" opacity={0.94} />
                  <text x={10} y={18} fontSize={10} fill="#F9F9F7" fontWeight={800}>t = {hoverT.toFixed(1)} h</text>
                  {curves.map(({ m, pts }, i) => (
                    <text key={m.id} x={10} y={34 + i * 14} fontSize={9.5} fill={m.color} fontWeight={700}>
                      {valueAt(pts, hoverT).toFixed(0)} % — {m.id === 'bloomlab' ? 'BloomLab®' : m.id === 'bainmarie' ? 'Bain-marie' : 'Macération'}
                    </text>
                  ))}
                  <text x={10} y={34 + 3 * 14} fontSize={9.5} fill="#8FBFA9" fontWeight={700}>
                    {valueAt(customPts, hoverT).toFixed(0)} % — {customT} °C
                  </text>
                </g>
              </g>
            )}
          </svg>

          {/* Légende */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs font-bold">
            {curves.map(({ m }) => (
              <div key={m.id} className="flex items-center gap-2">
                <span className="w-6 h-1.5 rounded-full shrink-0" style={{ backgroundColor: m.color }} />
                <span className="text-slate-700 leading-snug">
                  {m.id === 'bloomlab' ? s.bloomlab : m.id === 'bainmarie' ? s.bainmarie : s.passive}
                </span>
              </div>
            ))}
            <div className="flex items-center gap-2">
              <span className="w-6 h-0 border-t-2 border-dashed border-[#1C3F34] shrink-0" />
              <span className="text-slate-700 leading-snug">{s.simTitle} — {customT} °C</span>
            </div>
          </div>

          {/* Simulateur température */}
          <div className="bg-[#FAF7F2] rounded-2xl border border-[#E7DFD3] p-5 sm:p-6 space-y-4">
            <div className="flex items-center gap-2 text-sm font-black text-[#0F261E]">
              <Thermometer className="w-4 h-4 text-[#D97706]" />
              {s.simTitle}
            </div>
            <p className="text-xs text-slate-600">{s.simHint}</p>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <input
                type="range" min={20} max={100} step={1} value={customT}
                onChange={(e) => setCustomT(Number(e.target.value))}
                className="w-full accent-[#D97706]"
                aria-label={s.simHint}
              />
              <div className="text-2xl font-black text-[#0F261E] whitespace-nowrap">{customT} °C</div>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
              <div className="text-sm font-bold text-[#1C3F34]">
                {s.at3h} : <span className="text-[#D97706] text-lg font-black">{customAt3h.toFixed(0)} %</span>
              </div>
              <div className={`text-xs font-bold flex items-center gap-2 ${customT > 80 ? 'text-rose-700' : customT < 45 ? 'text-slate-500' : 'text-emerald-700'}`}>
                {customT > 80 ? <Flame className="w-4 h-4" /> : customT < 45 ? <Wind className="w-4 h-4" /> : <FlaskConical className="w-4 h-4" />}
                {verdict}
              </div>
            </div>
          </div>

          <figcaption className="text-[11px] text-slate-500 leading-relaxed border-t border-[#F3EEE6] pt-4">
            {s.footnote}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

export { ExtractionKineticsChart };
export const ExtractionKinisticsChart = ExtractionKineticsChart;
