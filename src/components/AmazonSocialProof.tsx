// src/components/AmazonSocialProof.tsx
import React from 'react';
import { Star, ShieldCheck, ExternalLink, PackageCheck } from 'lucide-react';

type Lang = 'fr' | 'en' | 'de';

/* ============================================================================
   ⚠️ SOURCING OBLIGATOIRE — remplir depuis Seller Central > Avis clients.
   Tant que rating = 0 ou count = 0, le composant NE REND RIEN :
   aucune preuve sociale fabriquée (règle Bloom + publicité trompeuse DGCCRF).
   ----------------------------------------------------------------------------
   CONFORMITÉ :
   1. Usage nominatif du mot "Amazon" uniquement — aucun logo reproduit.
   2. Pas de citation verbatim d'avis clients (contenu soumis aux CGV Amazon).
   3. PAS de schema.org AggregateRating : Google exige des avis hébergés
      sur la page elle-même → agrégat affiché en UI simple + lien source.
   ============================================================================ */
export const AMAZON_PROOF = {
  asin: 'B0F7GGTMNR',
  url: 'https://www.amazon.fr/dp/B0F7GGTMNR',
  rating: 4.3,
  count: 7,
  histogram: [4, 2, 1, 0, 0] as [number, number, number, number, number], // 5★:4, 4★:2, 3★:1, 2★:0, 1★:0
  updatedAt: '2026-10-02',
};

const STR = {
  fr: {
    title: 'Notes & Évaluations Amazon.fr',
    subtitle: 'Notes collectées et hébergées par Amazon.fr',
    reviews: 'notes',
    cta: 'Voir les avis sur Amazon.fr',
    activation: 'Acheté sur Amazon ? Activez vos protocoles Premium',
    updated: 'Mise à jour',
    microCopy: 'Note Amazon.fr au 02/10/2026 — voir les avis sur la fiche produit',
    badgeLabel: 'sur Amazon.fr',
  },
  en: {
    title: 'Ratings & Reviews Amazon.fr',
    subtitle: 'Ratings collected and hosted by Amazon.fr',
    reviews: 'ratings',
    cta: 'View reviews on Amazon.fr',
    activation: 'Bought on Amazon? Activate your Premium protocols',
    updated: 'Updated',
    microCopy: 'Amazon.fr rating as of 02/10/2026 — see reviews on product page',
    badgeLabel: 'on Amazon.fr',
  },
  de: {
    title: 'Bewertungen Amazon.fr',
    subtitle: 'Bewertungen erfasst und gehostet von Amazon.fr',
    reviews: 'Bewertungen',
    cta: 'Bewertungen auf Amazon.fr ansehen',
    activation: 'Auf Amazon gekauft? Premium-Protokolle aktivieren',
    updated: 'Stand',
    microCopy: 'Amazon.fr Bewertung Stand 02.10.2026 — Rezensionen auf Produktseite ansehen',
    badgeLabel: 'auf Amazon.fr',
  },
} as const;

export const CompactStars = ({ value, size = 'sm' }: { value: number; size?: 'sm' | 'md' }) => {
  const dim = size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4';
  return (
    <div className="relative inline-flex" aria-hidden="true">
      <div className="flex gap-0.5 text-slate-300">
        {[...Array(5)].map((_, i) => <Star key={i} className={dim} strokeWidth={1.5} />)}
      </div>
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${(value / 5) * 100}%` }}>
        <div className="flex gap-0.5 text-[#D97706]">
          {[...Array(5)].map((_, i) => <Star key={i} className={`${dim} fill-current`} strokeWidth={1.5} />)}
        </div>
      </div>
    </div>
  );
};

export function AmazonRatingBadge({
  lang = 'fr',
  className = '',
  variant = 'default',
}: {
  lang?: Lang;
  className?: string;
  variant?: 'default' | 'card' | 'minimal' | 'reassurance';
}) {
  const { rating, count, url } = AMAZON_PROOF;

  // Garde-fou anti-fabrication : aucune note réelle = aucun rendu
  if (!rating || !count) return null;

  const s = STR[lang];

  if (variant === 'reassurance') {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={`group inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FAF7F2] border border-[#E7DFD3] hover:border-[#D97706]/40 hover:bg-[#F5EFE6] transition-all text-[#0F261E] ${className}`}
        title={s.microCopy}
      >
        <span className="font-bold text-xs text-[#0F261E]">{rating.toFixed(1).replace('.', ',')}/5</span>
        <CompactStars value={rating} size="sm" />
        <span className="text-[11px] font-medium text-slate-600 group-hover:text-[#0F261E] transition-colors">
          ({count} {s.reviews} {s.badgeLabel})
        </span>
        <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-[#D97706] transition-colors" />
      </a>
    );
  }

  if (variant === 'minimal') {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={`group inline-flex items-center gap-2 text-xs text-slate-600 hover:text-[#0F261E] transition-colors ${className}`}
        title={s.microCopy}
      >
        <span className="font-bold text-[#0F261E]">{rating.toFixed(1).replace('.', ',')}/5</span>
        <CompactStars value={rating} size="sm" />
        <span className="underline underline-offset-2 decoration-slate-300 group-hover:decoration-[#D97706]">
          {count} {s.reviews} {s.badgeLabel}
        </span>
        <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-[#D97706]" />
      </a>
    );
  }

  // Variant default / card : note + étoiles + count + lien avec micro-copy discret
  return (
    <div className={`inline-flex flex-col gap-1 ${className}`}>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl bg-[#FAF7F2] border border-[#E7DFD3] hover:border-[#D97706]/50 hover:bg-white transition-all text-[#0F261E]"
      >
        <span className="text-sm font-black text-[#0F261E]">{rating.toFixed(1).replace('.', ',')}/5</span>
        <CompactStars value={rating} size="sm" />
        <span className="text-xs font-semibold text-slate-600 group-hover:text-[#0F261E] transition-colors">
          ({count} {s.reviews} {s.badgeLabel})
        </span>
        <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#D97706] transition-colors" />
      </a>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[10px] text-slate-500 hover:text-[#0F261E] transition-colors pl-1 tracking-tight flex items-center gap-1 underline underline-offset-2"
      >
        <span>{s.microCopy}</span>
      </a>
    </div>
  );
}

const Stars = ({ value }: { value: number }) => (
  <div className="relative inline-flex" aria-hidden="true">
    <div className="flex gap-0.5 text-slate-300">
      {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5" strokeWidth={1.5} />)}
    </div>
    <div className="absolute inset-0 overflow-hidden" style={{ width: `${(value / 5) * 100}%` }}>
      <div className="flex gap-0.5 text-[#D97706]">
        {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" strokeWidth={1.5} />)}
      </div>
    </div>
  </div>
);

export default function AmazonSocialProof({
  lang = 'fr',
  onNavigate,
}: {
  lang?: Lang;
  onNavigate?: (view: any, id?: string) => void;
}) {
  const s = STR[lang];
  const { rating, count, histogram, url, updatedAt } = AMAZON_PROOF;

  // Garde-fou anti-fabrication : aucune donnée réelle = aucun rendu.
  if (!rating || !count) return null;

  const max = Math.max(...histogram, 1);

  return (
    <section className="py-10 md:py-14 bg-white border-t border-[#F3EEE6]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF7F2] rounded-[32px] border border-[#E7DFD3] p-6 md:p-10 grid grid-cols-1 md:grid-cols-[auto_1fr_auto] gap-8 items-center">
          {/* Agrégat */}
          <div className="text-center md:text-left space-y-2">
            <div className="flex items-center justify-center md:justify-start gap-2 text-xs font-black uppercase tracking-widest text-slate-500">
              <ShieldCheck className="w-4 h-4 text-[#D97706]" />
              {s.title}
            </div>
            <div className="flex items-end justify-center md:justify-start gap-3">
              <span className="text-5xl font-black text-[#0F261E] leading-none">{rating.toFixed(1)}</span>
              <div className="pb-1 space-y-1">
                <Stars value={rating} />
                <span className="block text-xs font-bold text-slate-500">
                  {count} {s.reviews}
                </span>
              </div>
            </div>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[11px] text-slate-500 hover:text-[#0F261E] underline underline-offset-2 transition-colors pt-1"
            >
              <span>{s.microCopy}</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>
            {updatedAt && (
              <span className="block text-[10px] text-slate-400 font-medium">{s.updated} : {updatedAt}</span>
            )}
          </div>

          {/* Histogramme */}
          <div className="space-y-1.5" aria-hidden="true">
            {histogram.map((n, i) => (
              <div key={i} className="flex items-center gap-2 text-[10px] font-bold text-slate-500">
                <span className="w-6 text-right">{5 - i}★</span>
                <div className="flex-1 h-2 bg-[#E7DFD3]/60 rounded-full overflow-hidden">
                  <div className="h-full bg-[#D97706] rounded-full" style={{ width: `${(n / max) * 100}%` }} />
                </div>
                <span className="w-8">{n}</span>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col gap-3">
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#0F261E] hover:bg-[#D97706] text-white rounded-xl text-sm font-bold transition-colors"
            >
              {s.cta} <ExternalLink className="w-4 h-4" />
            </a>
            {onNavigate && (
              <button
                onClick={() => onNavigate('activation')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white border-2 border-[#1C3F34] text-[#1C3F34] hover:bg-[#FAF7F2] rounded-xl text-sm font-bold transition-colors cursor-pointer"
              >
                <PackageCheck className="w-4 h-4 text-[#D97706]" />
                {s.activation}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}