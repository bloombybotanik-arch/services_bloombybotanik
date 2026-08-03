import React from 'react';
import { ArrowLeft, Clock } from 'lucide-react';

interface PendingContentProps {
  onBack: () => void;
}

const PendingContent: React.FC<PendingContentProps> = ({ onBack }) => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-700">
      <div className="w-24 h-24 bg-[#1B3022]/10 rounded-full flex items-center justify-center mb-6">
        <Clock className="w-12 h-12 text-[#1B3022]" />
      </div>
      <h2 className="text-3xl md:text-4xl font-light text-[#1B3022] mb-4">En attente d'intégration</h2>
      <p className="text-lg text-[#1B3022]/70 max-w-lg mx-auto mb-8 leading-relaxed">
        Cette page est actuellement inactive ou en cours de préparation pour la démonstration de la logique WordPress / WooCommerce.
      </p>
      <button
        onClick={onBack}
        className="flex items-center gap-2 px-8 py-4 bg-[#1B3022] text-white rounded-full font-medium hover:bg-[#1B3022]/90 transition-colors shadow-lg"
      >
        <ArrowLeft className="w-5 h-5" />
        Retour à la page précédente
      </button>
    </div>
  );
};

export default PendingContent;
