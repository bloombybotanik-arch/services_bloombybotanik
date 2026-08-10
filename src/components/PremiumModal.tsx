import React from 'react';
import { X, Check, Star, ShieldCheck } from 'lucide-react';

interface PremiumModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpgrade: () => void;
}

export function PremiumModal({ isOpen, onClose, onUpgrade }: PremiumModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#1B3022]/80 backdrop-blur-sm animate-in fade-in">
      <div className="bg-[#F9F9F7] w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-botanik-green/50 hover:text-botanik-green transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8 md:p-12 text-center">
          <div className="w-16 h-16 mx-auto bg-botanik-orange/10 rounded-2xl flex items-center justify-center mb-6">
            <Star className="w-8 h-8 text-botanik-orange" />
          </div>
          
          <h2 className="text-3xl font-bold text-botanik-green mb-4">
            Débloquez le Totum
          </h2>
          <p className="text-botanik-green/70 mb-8 leading-relaxed">
            Vous avez atteint la limite de vos recettes gratuites. Rejoignez Bloom Premium pour accéder à l'intégralité du laboratoire.
          </p>

          <div className="bg-white border border-botanik-green/10 rounded-2xl p-6 text-left mb-8">
            <div className="flex items-center gap-4 mb-4 pb-4 border-b border-botanik-green/10">
              <ShieldCheck className="w-6 h-6 text-botanik-magenta" />
              <div>
                <h4 className="font-bold text-botanik-green">Bloom Méthode</h4>
                <p className="text-sm text-botanik-green/60">L'autonomie botanique complète</p>
              </div>
              <div className="ml-auto text-right">
                <div className="text-2xl font-bold text-botanik-green">7,90€</div>
                <div className="text-xs text-botanik-green/50">/mois</div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm mb-6">
              <div>
                <h5 className="font-bold text-botanik-green/50 mb-2 uppercase text-xs">Gratuit</h5>
                <ul className="space-y-2 text-botanik-green/70">
                  <li>• 9 recettes</li>
                  <li>• Paramètres de base</li>
                </ul>
              </div>
              <div>
                <h5 className="font-bold text-botanik-magenta mb-2 uppercase text-xs">Premium</h5>
                <ul className="space-y-2 text-botanik-green font-medium">
                  <li>• 60 recettes</li>
                  <li>• Protocoles complets</li>
                  <li>• Vidéos tutoriels</li>
                  <li>• Communauté privée</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-[#F9F9F7] p-4 rounded-xl border border-botanik-green/5">
              <p className="italic text-sm text-botanik-green/80">
                "En 3 semaines, ma peau a retrouvé son éclat" <br/>
                <span className="font-bold">— Marie</span>
              </p>
            </div>
          </div>

          <button 
            onClick={() => {
              onUpgrade();
              onClose();
            }}
            className="w-full py-4 bg-botanik-green text-white rounded-xl font-bold hover:bg-[#2a4533] transition-colors shadow-lg shadow-botanik-green/20"
          >
            Essayer 7 jours gratuitement
          </button>
          <p className="mt-2 text-xs text-botanik-green/50">Pas de carte bancaire requise</p>
          
          <button 
            onClick={onClose}
            className="mt-4 text-sm font-semibold text-botanik-green/50 hover:text-botanik-green transition-colors"
          >
            Peut-être plus tard
          </button>
        </div>
      </div>
    </div>
  );
}
