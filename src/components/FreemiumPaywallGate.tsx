import React, { useState, useEffect } from 'react';
import { Lock, Star, CheckCircle2, ArrowRight, ShieldCheck, Sparkles, KeyRound } from 'lucide-react';
import { View } from '../types';
import { Language } from '../translations';

interface FreemiumPaywallGateProps {
  children: React.ReactNode;
  onNavigate: (view: View, param?: string) => void;
  lang?: Language;
  title?: string;
  subtitle?: string;
  teaserContent?: React.ReactNode;
  bulletPoints?: string[];
}

export const FreemiumPaywallGate: React.FC<FreemiumPaywallGateProps> = ({
  children,
  onNavigate,
  lang = 'fr',
  title,
  subtitle,
  teaserContent,
  bulletPoints
}) => {
  const [hasAccess, setHasAccess] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return (
        localStorage.getItem('bloom_subscriber') === 'true' ||
        localStorage.getItem('bloom_access') === 'true'
      );
    }
    return false;
  });

  const [unlockCode, setUnlockCode] = useState('');
  const [unlockError, setUnlockError] = useState('');
  const [showCodeInput, setShowCodeInput] = useState(false);

  useEffect(() => {
    const checkAccess = () => {
      if (typeof window !== 'undefined') {
        const val =
          localStorage.getItem('bloom_subscriber') === 'true' ||
          localStorage.getItem('bloom_access') === 'true';
        setHasAccess(val);
      }
    };
    checkAccess();
    window.addEventListener('storage', checkAccess);
    return () => window.removeEventListener('storage', checkAccess);
  }, []);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = unlockCode.trim().toUpperCase();
    if (['BLOOMVIP', 'BLOOM2026', 'ABONNE', 'PREMIUM', 'ACADEMY', 'BOTANIK'].includes(clean)) {
      if (typeof window !== 'undefined') {
        localStorage.setItem('bloom_subscriber', 'true');
        localStorage.setItem('bloom_access', 'true');
      }
      setHasAccess(true);
      setUnlockError('');
      setShowCodeInput(false);
    } else {
      setUnlockError(
        lang === 'fr'
          ? 'Code invalide ou abonnement non trouvé.'
          : lang === 'de'
          ? 'Ungültiger Code oder Abonnement nicht gefunden.'
          : 'Invalid code or subscription not found.'
      );
    }
  };

  const defaultTitle =
    lang === 'fr'
      ? 'Dossier Réservé aux Membres de l’Académie'
      : lang === 'de'
      ? 'Exklusives Dossier für Akademie-Mitglieder'
      : 'Dossier Reserved for Academy Members';

  const defaultSubtitle =
    lang === 'fr'
      ? 'L’introduction et les repères fondamentaux sont en accès libre. Débloquez l’analyse approfondie, les protocoles botaniques précis et l’ensemble des modules systémiques avec votre abonnement.'
      : lang === 'de'
      ? 'Die Einführung und die Grundlagen sind frei zugänglich. Schalten Sie die tiefgehende Analyse, präzise botanische Protokolle und alle systemischen Module mit Ihrem Abonnement frei.'
      : 'The introduction and fundamental benchmarks are freely accessible. Unlock the in-depth analysis, precise botanical protocols, and all systemic modules with your subscription.';

  const defaultBullets =
    bulletPoints ||
    (lang === 'fr'
      ? [
          'Analyse biochimique & neuro-endocrinienne détaillée',
          'Synergies végétales Totum, ratios et polarités d’extraction',
          'Chronobiologie précise et posologies séquentielles',
          'Accès illimité à l’intégralité des 4 architectures et 9 axes'
        ]
      : lang === 'de'
      ? [
          'Detaillierte biochemische & neuroendokrine Analyse',
          'Pflanzliche Totum-Synergien, Verhältnisse und Extraktionspolaritäten',
          'Präzise Chronobiologie und sequentielle Dosierungen',
          'Unbegrenzter Zugang zu allen 4 Architekturen und 9 Achsen'
        ]
      : [
          'Detailed biochemical & neuro-endocrine analysis',
          'Plant Totum synergies, ratios, and extraction polarities',
          'Precise chronobiology and sequential dosages',
          'Unlimited access to all 4 architectures and 9 axes'
        ]);

  if (hasAccess) {
    return (
      <div className="space-y-6">
        {/* Banner indiquant que l'utilisateur est abonné */}
        <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>
              {lang === 'fr'
                ? 'Accès Membre Actif — Vous consultez la version intégrale de ce module réservé aux abonnés Bloom.'
                : lang === 'de'
                ? 'Aktiver Mitgliederzugang — Sie sehen die Vollversion dieses Moduls.'
                : 'Active Member Access — You are viewing the full version of this subscriber module.'}
            </span>
          </div>
          <span className="text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shrink-0">
            Abonné VIP
          </span>
        </div>
        {children}
      </div>
    );
  }

  return (
    <div className="space-y-10 relative">
      {/* Optional Teaser snippet visible to everyone */}
      {teaserContent && <div className="space-y-6">{teaserContent}</div>}

      {/* Freemium Paywall Lock Gate */}
      <div className="relative rounded-[32px] overflow-hidden border border-[#E8772E]/30 bg-[#16231C]/90 p-8 sm:p-12 shadow-2xl text-center space-y-6">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#E8772E]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#E8772E]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6 max-w-3xl mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-[#E8772E]/15 border border-[#E8772E]/30 text-[#E8772E] flex items-center justify-center mx-auto shadow-inner">
            <Lock className="w-8 h-8 text-[#E8772E]" />
          </div>

          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#E8772E]/15 text-[#E8772E] text-[10px] font-black uppercase tracking-[0.2em] border border-[#E8772E]/30">
              <Star className="w-3 h-3 fill-current text-[#E8772E]" />
              <span>{lang === 'fr' ? 'Contenu Sous Abonnement' : lang === 'de' ? 'Exklusiver Inhalt' : 'Member Exclusive'}</span>
            </span>

            <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
              {title || defaultTitle}
            </h3>

            <p className="text-sm sm:text-base text-[#FAF7F2]/80 leading-relaxed font-normal max-w-2xl mx-auto">
              {subtitle || defaultSubtitle}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-3 text-left text-xs sm:text-sm text-[#FAF7F2]/90 max-w-2xl mx-auto pt-2">
            {defaultBullets.map((bullet, idx) => (
              <div key={idx} className="flex items-start gap-2.5 p-3.5 rounded-xl bg-black/40 border border-white/10">
                <CheckCircle2 className="w-4 h-4 text-[#E8772E] shrink-0 mt-0.5" />
                <span className="leading-snug">{bullet}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <button
              onClick={() => onNavigate('abonnement')}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#E8772E] hover:bg-[#D4651F] text-white font-black text-xs uppercase tracking-wider transition-all shadow-xl hover:shadow-2xl flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 fill-current" />
              <span>{lang === 'fr' ? 'Découvrir les Abonnements (dès 7,90 €)' : lang === 'de' ? 'Abonnements ansehen (ab 7,90 €)' : 'View Subscriptions (from €7.90)'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => setShowCodeInput(!showCodeInput)}
              className="w-full sm:w-auto px-5 py-4 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs uppercase tracking-wider transition-all border border-white/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              <KeyRound className="w-4 h-4 text-[#E8772E]" />
              <span>{lang === 'fr' ? 'J’ai déjà un code' : lang === 'de' ? 'Ich habe einen Code' : 'I have a code'}</span>
            </button>
          </div>

          {showCodeInput && (
            <form onSubmit={handleUnlock} className="pt-4 border-t border-[#C8AB8A]/30 flex flex-wrap items-center justify-center gap-3 animate-in fade-in duration-300">
              <input
                type="text"
                value={unlockCode}
                onChange={(e) => setUnlockCode(e.target.value)}
                placeholder={lang === 'fr' ? 'Entrez votre code (ex: BLOOMVIP)' : lang === 'de' ? 'Zugangscode eingeben' : 'Enter access code'}
                className="px-4 py-2.5 rounded-lg bg-[#3E4A3D] border border-[#C8AB8A]/50 text-[#FAF7F2] text-xs uppercase tracking-wider focus:outline-none focus:border-[#C8AB8A] min-w-[260px]"
              />
              <button
                type="submit"
                className="px-5 py-2.5 rounded-lg bg-[#3E4A3D] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#2D372C] transition-all cursor-pointer"
              >
                {lang === 'fr' ? 'Valider' : lang === 'de' ? 'Bestätigen' : 'Validate'}
              </button>
              {unlockError && <p className="w-full text-xs text-rose-400 font-medium">{unlockError}</p>}
            </form>
          )}

          <p className="text-[11px] text-[#8b949e] font-mono">
            {lang === 'fr'
              ? 'Formule sans engagement • Résiliation en un clic • Accès instantané à l’ensemble des protocoles'
              : lang === 'de'
              ? 'Ohne Bindung • Mit einem Klick kündbar • Sofortiger Zugriff'
              : 'No-commitment subscription • Cancel anytime • Instant access'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FreemiumPaywallGate;