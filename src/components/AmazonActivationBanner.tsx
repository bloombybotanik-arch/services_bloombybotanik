import React from 'react';
import { Package } from 'lucide-react';

interface AmazonActivationBannerProps {
  onActivate?: () => void;
  lang?: string;
}

export const AmazonActivationBanner: React.FC<AmazonActivationBannerProps> = ({ onActivate, lang = 'fr' }) => {
  const isFR = lang === 'fr';

  return (
    <section className="bg-[#0F261E] border-y border-white/10 py-3.5 px-4">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-white">
          <div className="w-9 h-9 rounded-full bg-[#E8772E] flex items-center justify-center shrink-0">
            <Package className="w-4 h-4 text-white" />
          </div>
          <p className="text-xs sm:text-sm font-medium text-white">
            <span className="font-bold text-[#E8772E]">{isFR ? "Acheteur Amazon ?" : "Amazon Customer?"}</span>{' '}
            {isFR 
              ? "Ne restez pas seul face à vos plantes. Uploadez votre facture pour débloquer gratuitement vos protocoles cliniques et l'accès Premium à la Bibliothèque Bloom." 
              : "Upload your invoice to unlock clinical protocols and Premium Bloom Library access for free."}
          </p>
        </div>
        {onActivate && (
          <button 
            type="button"
            onClick={onActivate} 
            className="px-5 py-2 bg-[#E8772E] hover:bg-[#D4651F] text-white text-xs font-black uppercase tracking-wider rounded-lg transition-all shadow-md whitespace-nowrap cursor-pointer shrink-0"
          >
            {isFR ? "Activer mon accès Premium" : "Activate Premium Access"}
          </button>
        )}
      </div>
    </section>
  );
};

export default AmazonActivationBanner;
