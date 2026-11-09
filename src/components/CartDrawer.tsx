import React from 'react';
import { X, Check, ShoppingBag } from 'lucide-react';
import { PaymentBadges } from './PaymentBadges';
import { AmazonRatingBadge } from './AmazonSocialProof';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: () => void;
  cartItem?: {
    title: string;
    price: number;
    id?: string;
  };
  lang?: string;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  onCheckout,
  cartItem = {
    title: "Kit de Démarrage Souveraineté — BloomLab® + 1 Kit Plantes",
    price: 299,
  },
  lang = 'fr',
}) => {
  const isFR = lang === 'fr';
  const isDE = lang === 'de';

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end animate-in fade-in duration-200">
      {/* Backdrop */}
      <div 
        onClick={onClose} 
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity cursor-pointer" 
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-white h-full p-8 shadow-2xl flex flex-col justify-between z-10 overflow-y-auto">
        <div className="space-y-6">
          <div className="flex justify-between items-center border-b pb-4">
            <h3 className="text-xl font-black uppercase tracking-tight text-[#3E4A3D]">
              {isFR ? "Mon Panier" : isDE ? "Mein Warenkorb" : "My Cart"}
            </h3>
            <button 
              type="button"
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-800 transition-colors cursor-pointer rounded-full hover:bg-slate-100"
              aria-label="Fermer le panier"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="bg-[#FAF7F2] p-6 rounded-3xl border border-[#E7DFD3] flex justify-between items-center">
            <div className="space-y-1 pr-4">
              <div className="font-bold text-sm text-[#3E4A3D]">{cartItem.title}</div>
              <div className="text-xs text-slate-500">BloomLab® Precision Extractor</div>
            </div>
            <div className="font-black text-2xl text-[#C8AB8A] shrink-0">{cartItem.price}€</div>
          </div>

          <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 text-xs text-emerald-800 space-y-1">
            <div className="font-bold flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>{isFR ? "Expédition prioritaire sous 24/48h incluse" : "Priority 24/48h shipping included"}</span>
            </div>
            <div className="text-emerald-700/80">
              {isFR 
                ? "Garantie constructeur 1 an & Satisfait ou remboursé 30 jours." 
                : "1-year warranty & 30-day money-back guarantee."}
            </div>
          </div>

          <div className="flex justify-center pt-1">
            <AmazonRatingBadge lang={isDE ? 'de' : isFR ? 'fr' : 'en'} variant="reassurance" />
          </div>
        </div>

        <div className="space-y-4 pt-6 border-t border-slate-100">
          <button 
            type="button"
            onClick={onCheckout} 
            className="w-full bg-[#D97706] hover:bg-[#B45309] active:bg-[#B45309] text-white py-4 sm:py-5 rounded-full font-black text-base sm:text-lg transition-all cursor-pointer shadow-lg shadow-orange-900/20 flex items-center justify-center gap-3"
          >
            <ShoppingBag className="w-5 h-5" />
            <span>{isFR ? "Commander maintenant" : "Proceed to Checkout"}</span>
          </button>
          <div className="flex justify-center">
            <PaymentBadges />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
