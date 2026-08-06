import React from 'react';
import { motion } from 'motion/react';
import { X, ArrowRight, Sparkles } from 'lucide-react';
import { translations, Language } from '../translations';
import { ResetSectionDetail } from '../data/resetDetails';

interface ResetDetailModalProps {
  detail: ResetSectionDetail;
  onClose: () => void;
  onNavigate: (view: any) => void;
  lang: Language;
}

export const ResetDetailModal: React.FC<ResetDetailModalProps> = ({ detail, onClose, onNavigate, lang }) => {
  const t = translations[lang];
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-botanik-green/80 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="bg-[#F9F9F7] w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[40px] shadow-2xl relative"
        onClick={e => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white flex items-center justify-center text-botanik-green hover:bg-botanik-orange hover:text-white transition-all shadow-sm z-10"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-8 md:p-16">
          <div className="mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-botanik-green mb-6 leading-tight">
              {detail.translations?.[lang]?.title || detail.title}
            </h2>
            <div className="p-6 bg-botanik-orange/5 rounded-3xl border border-botanik-orange/10">
              <p className="text-botanik-green font-medium leading-relaxed italic">
                {detail.translations?.[lang]?.objective || detail.objective}
              </p>
            </div>
          </div>

          <div className="space-y-12">
            {detail.sections.map((section, sIdx) => (
              <div key={section.id} className="relative pl-8 border-l-2 border-botanik-orange/20">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-botanik-orange shadow-sm shadow-botanik-orange/20" />
                <h3 className="text-xl font-bold text-botanik-green mb-6">
                  {detail.translations?.[lang]?.sections?.[sIdx]?.title || section.title}
                </h3>
                <div className="space-y-4">
                  {(detail.translations?.[lang]?.sections?.[sIdx]?.content || section.content).map((p: string, idx: number) => (
                    <p key={idx} className="text-botanik-green/70 leading-relaxed">
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 pt-12 border-t border-botanik-green/10">
            <div className="bg-botanik-green p-8 md:p-12 rounded-[40px] text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <Sparkles className="w-32 h-32" />
              </div>
              <div className="relative z-10">
                <h4 className="text-2xl font-bold mb-4">{detail.translations?.[lang]?.cta?.label || detail.cta.label}</h4>
                <p className="text-white/70 mb-8 max-w-xl">
                  {detail.translations?.[lang]?.cta?.description || detail.cta.description}
                </p>
                <button 
                  onClick={() => {
                    const view = detail.id === 'alimentation' ? 'culinaire' : 'phytotherapie-reset';
                    onNavigate(view);
                    onClose();
                  }}
                  className="px-8 py-4 bg-botanik-orange text-white rounded-2xl font-bold flex items-center gap-2 hover:scale-105 transition-all shadow-xl shadow-botanik-orange/20"
                >
                  {t.common.start_now} <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
