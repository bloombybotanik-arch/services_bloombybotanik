import React from 'react';

interface MarqueeBannerProps {
  lang?: string;
  items?: string[];
}

export const MarqueeBanner: React.FC<MarqueeBannerProps> = ({ lang = 'fr', items }) => {
  const isFR = lang === 'fr';
  const isDE = lang === 'de';

  const defaultItems = items || (isFR
    ? [
        "🇫🇷 Marque Botanique Française",
        "🚚 Expédition Prioritaire sous 24/48h",
        "🛡️ Garantie Satisfait ou Remboursé 30 Jours",
        "⚡ Garantie Constructeur 1 An",
        "🔒 Paiement 3x Sans Frais Sécurisé"
      ]
    : isDE
    ? [
        "🇫🇷 Französische botanische Marke",
        "🚚 Prioritärer Versand in 24/48h",
        "🛡️ 30-Tage-Geld-zurück-Garantie",
        "⚡ 1 Jahr Herstellergarantie",
        "🔒 Sichere 3x Ratenzahlung"
      ]
    : [
        "🇫🇷 French Botanical Brand",
        "🚚 Priority Shipping in 24/48h",
        "🛡️ 30-Day Money Back Guarantee",
        "⚡ 1-Year Manufacturer Warranty",
        "🔒 Secure 3x Fee-Free Payment"
      ]);

  return (
    <div className="bg-[#C8AB8A] text-[#0F261E] py-2 overflow-hidden border-b border-[#0F261E]/10 shadow-xs relative z-30 select-none">
      <div className="flex w-max animate-marquee whitespace-nowrap items-center hover:pause">
        {[...defaultItems, ...defaultItems, ...defaultItems, ...defaultItems].map((item, i) => (
          <div key={i} className="flex items-center gap-10 px-6 shrink-0">
            <span className="text-[11px] md:text-xs font-black uppercase tracking-[0.2em] whitespace-nowrap">
              {item}
            </span>
            <span className="opacity-40 text-sm select-none">•</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarqueeBanner;
