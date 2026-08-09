import React from 'react';
import { motion } from 'motion/react';
import { X, ArrowRight, Sparkles, CheckCircle2, Clock, Calendar, AlertCircle, Info, Activity, Zap } from 'lucide-react';
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

        <div className="p-6 md:p-16">
          <div className="mb-12">
            <div className="text-[10px] font-black text-botanik-orange tracking-[0.3em] mb-4 uppercase">{detail.subtitle || "Axe de Vie"}</div>
            <h2 className="text-3xl md:text-5xl font-bold text-botanik-green mb-6 leading-tight">
              {detail.translations?.[lang]?.title || detail.title}
            </h2>
            <div className="p-6 bg-botanik-orange/5 rounded-[32px] border border-botanik-orange/10 mb-8">
              <p className="text-sm md:text-lg text-botanik-green font-medium leading-relaxed italic">
                {detail.translations?.[lang]?.objective || detail.objective}
              </p>
            </div>

            {detail.why && (
              <div className="mb-12">
                <h3 className="text-xl font-bold text-botanik-green mb-4 flex items-center gap-2">
                   <Info className="w-5 h-5 text-botanik-orange" /> Pourquoi cet axe est vital ?
                </h3>
                <p className="text-sm md:text-base text-botanik-green/70 leading-relaxed">
                  {detail.why}
                </p>
              </div>
            )}

            {detail.objectives && detail.objectives.length > 0 && (
              <div className="mb-12">
                <h3 className="text-xl font-bold text-botanik-green mb-6 flex items-center gap-2">
                   <CheckCircle2 className="w-5 h-5 text-botanik-orange" /> Objectifs Physiologiques
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {detail.objectives.map((obj, idx) => (
                    <div key={idx} className="flex gap-3 p-4 bg-white rounded-2xl border border-botanik-green/5 shadow-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-botanik-orange shrink-0 mt-2" />
                      <p className="text-xs md:text-sm text-botanik-green/80 font-medium">{obj}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-12">
            {detail.daily_rituals && detail.daily_rituals.length > 0 && (
              <div className="space-y-8">
                <h3 className="text-2xl font-bold text-botanik-green flex items-center gap-2">
                  <Calendar className="w-6 h-6 text-botanik-orange" /> Rituels Quotidiens
                </h3>
                <div className="grid gap-6">
                  {detail.daily_rituals.map((ritual, idx) => (
                    <div key={idx} className="p-6 md:p-8 bg-white rounded-[32px] border border-botanik-green/5 shadow-lg group hover:border-botanik-orange/20 transition-all">
                      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                        <h4 className="text-lg font-bold text-botanik-green">{ritual.name}</h4>
                        <div className="flex items-center gap-3">
                          {ritual.time_of_day && (
                            <span className="px-3 py-1 bg-botanik-green/5 text-botanik-green rounded-full text-[10px] font-bold uppercase tracking-wider">
                              {ritual.time_of_day}
                            </span>
                          )}
                          {ritual.estimated_duration_minutes !== undefined && (
                            <span className="flex items-center gap-1.5 text-[10px] font-bold text-botanik-orange uppercase">
                              <Clock className="w-3 h-3" /> {ritual.estimated_duration_minutes} min
                            </span>
                          )}
                        </div>
                      </div>
                      <p className="text-sm md:text-base text-botanik-green/70 leading-relaxed">
                        {ritual.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {detail.sections && detail.sections.map((section, sIdx) => (
              <div key={section.id} className="relative pl-6 md:pl-8 border-l-2 border-botanik-orange/20">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-botanik-orange shadow-sm shadow-botanik-orange/20" />
                <h3 className="text-lg md:text-xl font-bold text-botanik-green mb-4 md:mb-6">
                  {detail.translations?.[lang]?.sections?.[sIdx]?.title || section.title}
                </h3>
                <div className="space-y-3 md:space-y-4">
                  {(detail.translations?.[lang]?.sections?.[sIdx]?.content || section.content).map((p: string, idx: number) => (
                    <p key={idx} className="text-sm md:text-base text-botanik-green/70 leading-relaxed">
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            ))}

            {detail.progression_21_days && (
              <div className="p-8 bg-botanik-green/5 rounded-[40px] border border-botanik-green/10">
                <h3 className="text-xl font-bold text-botanik-green mb-4 flex items-center gap-2">
                   <Activity className="w-5 h-5 text-botanik-orange" /> Progression sur 21 jours
                </h3>
                <p className="text-sm md:text-base text-botanik-green/70 leading-relaxed">
                  {detail.progression_21_days}
                </p>
              </div>
            )}

            {detail.integration_with_reset && (
              <div className="p-8 bg-botanik-orange/5 rounded-[40px] border border-botanik-orange/10">
                <h3 className="text-xl font-bold text-botanik-green mb-4 flex items-center gap-2">
                   <Zap className="w-5 h-5 text-botanik-orange" /> Intégration avec le Reset
                </h3>
                <p className="text-sm md:text-base text-botanik-green/70 leading-relaxed">
                  {detail.integration_with_reset}
                </p>
              </div>
            )}

            {detail.precautions && (
              <div className="p-6 md:p-8 bg-red-50 rounded-[32px] border border-red-100 flex gap-4">
                <AlertCircle className="w-6 h-6 text-red-500 shrink-0" />
                <div>
                  <h3 className="text-lg font-bold text-red-900 mb-2">Précautions & Contre-indications</h3>
                  <p className="text-xs md:text-sm text-red-700/80 leading-relaxed italic">
                    {detail.precautions}
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="mt-12 md:mt-16 pt-8 md:pt-12 border-t border-botanik-green/10">
            <div className="bg-botanik-green p-6 md:p-12 rounded-[30px] md:rounded-[40px] text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <Sparkles className="w-16 md:w-32 h-16 md:h-32" />
              </div>
              <div className="relative z-10">
                <h4 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">{detail.translations?.[lang]?.cta?.label || detail.cta.label}</h4>
                <p className="text-sm md:text-base text-white/70 mb-6 md:mb-8 max-w-xl">
                  {detail.translations?.[lang]?.cta?.description || detail.cta.description}
                </p>
                <button 
                  onClick={() => {
                    const view = detail.id === 'alimentation' ? 'culinaire' : 'phytotherapie-reset';
                    onNavigate(view);
                    onClose();
                  }}
                  className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 bg-botanik-orange text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:scale-105 transition-all shadow-xl shadow-botanik-orange/20"
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
