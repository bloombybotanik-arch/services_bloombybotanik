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
  rating: 0,                    // TODO Seller Central : ex. 4.6
  count: 0,                     // TODO Seller Central : ex. 279
  histogram: [0, 0, 0, 0, 0] as [number, number, number, number, number], // 5★ → 1★
  updatedAt: '',                // TODO : '2026-09-01'
};

const STR = {
  fr: {
    title: 'Avis vérifiés Amazon.fr',
    subtitle: 'Notes collectées et hébergées par Amazon sur des commandes vérifiées.',
    reviews: 'avis vérifiés',
    cta: 'Lire les avis sur Amazon.fr',
    activation: 'Acheté sur Amazon ? Activez vos protocoles Premium',
    updated: 'Mise à jour',
  },
  en: {
    title: 'Verified reviews on Amazon.fr',
    subtitle: 'Ratings collected and hosted by Amazon on verified orders.',
    reviews: 'verified reviews',
    cta: 'Read reviews on Amazon.fr',
    activation: 'Bought on Amazon? Activate your Premium protocols',
    updated: 'Updated',
  },
  de: {
    title: 'Verifizierte Bewertungen auf Amazon.fr',
    subtitle: 'Bewertungen von Amazon über verifizierte Bestellungen erfasst.',
    reviews: 'verifizierte Bewertungen',
    cta: 'Bewertungen auf Amazon.fr lesen',
    activation: 'Auf Amazon gekauft? Premium-Protokolle aktivieren',
    updated: 'Stand',
  },
} as const;

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