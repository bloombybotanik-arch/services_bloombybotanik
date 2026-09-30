import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  AlertTriangle, 
  Clock, 
  Sparkles, 
  Lock, 
  CheckCircle2, 
  ArrowRight, 
  Printer, 
  Share2, 
  Activity, 
  Leaf, 
  ChevronRight, 
  Sun, 
  Moon, 
  Download, 
  Check, 
  Compass, 
  Zap,
  FileCheck,
  Eye,
  Heart,
  Calendar
} from 'lucide-react';
import { View } from './types';
import { Language } from './translations';
import { TooltipLexique } from './components/TooltipLexique';
import { GlossaryProvider } from './context/GlossaryContext';
import { siboTranslations } from './data/translations/siboTranslations';

interface ProtocoleSiboContentProps {
  isPremium: boolean;
  onNavigate: (view: View, param?: string) => void;
  onRequireAuth: () => void;
  lang: Language;
}

export const SIBO_MEDICAL_DISCLAIMER = "Ce protocole relève de la phytothérapie intégrale, de la micronutrition et de l'hygiène de vie. Il ne se substitue en aucun cas à un diagnostic médical ni aux prescriptions de votre gastro-entérologue ou médecin traitant. Ne jamais interrompre un traitement en cours sans l'avis d'un professionnel de santé.";

export default function ProtocoleSiboContent({
  isPremium,
  onNavigate,
  onRequireAuth,
  lang
}: ProtocoleSiboContentProps) {
  const t = siboTranslations[lang || 'fr'] || siboTranslations.fr;
  // Local unlock state (if user entered email in the form or is subscriber)
  const [isUnlocked, setIsUnlocked] = useState<boolean>(() => {
    if (isPremium) return true;
    if (typeof window !== 'undefined') {
      try {
        return localStorage.getItem('bloom_sibo_unlocked') === 'true';
      } catch (_) {
        return false;
      }
    }
    return false;
  });

  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [formError, setFormError] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    if (isPremium) {
      setIsUnlocked(true);
    }
  }, [isPremium]);

  const handleUnlockSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email.trim())) {
      setFormError('Veuillez renseigner une adresse email valide.');
      return;
    }
    if (!prenom.trim()) {
      setFormError('Veuillez renseigner votre prénom.');
      return;
    }

    try {
      localStorage.setItem('bloom_sibo_unlocked', 'true');
      localStorage.setItem('bloom_subscriber_email', email.trim());
      localStorage.setItem('bloom_subscriber_prenom', prenom.trim());
    } catch (_) {}

    if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
      (window as any).gtag('event', 'protocol_unlocked', {
        protocol: 'sibo',
        user_email: email.trim()
      });
    }

    setIsUnlocked(true);
  };

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  const handleShare = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText('https://bloombybotanik.com/phytotherapie-reset/protocole-sibo/');
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  return (
    <GlossaryProvider pageKey="protocole-sibo">
      <article 
        className="min-h-screen bg-[#FAF7F2] text-[#0F261E] pb-24 selection:bg-[#D97706]/20 selection:text-[#0F261E]"
        data-bloom-academie="true"
      >
        
        {/* Style d'impression */}
        <style>{`
          @media print {
            nav, aside, header, footer, .no-print {
              display: none !important;
            }
            body, article {
              background: #ffffff !important;
              color: #000000 !important;
            }
            .print-card {
              border: 1px solid #ccc !important;
              background: #ffffff !important;
              color: #000000 !important;
              page-break-inside: avoid;
            }
            table, th, td {
              color: #000000 !important;
              border-color: #dddddd !important;
            }
            th {
              background: #f0f0f0 !important;
            }
          }
        `}</style>

        {/* 1. Fil d'Ariane & Barre d'actions supérieure */}
        <div className="border-b border-[#E7DFD3] bg-[#FAF7F2]/80 backdrop-blur-md sticky top-0 z-30 no-print">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#0F261E]/70 overflow-hidden text-ellipsis whitespace-nowrap">
              <button 
                onClick={() => onNavigate('home')} 
                className="hover:text-[#D97706] transition-colors cursor-pointer"
              >
                Accueil
              </button>
              <ChevronRight className="w-3.5 h-3.5 text-[#0F261E]/40 shrink-0" />
              <button 
                onClick={() => onNavigate('academie')} 
                className="hover:text-[#D97706] transition-colors cursor-pointer"
              >
                Bloom Académie
              </button>
              <ChevronRight className="w-3.5 h-3.5 text-[#0F261E]/40 shrink-0" />
              <button 
                onClick={() => onNavigate('phytotherapie-reset')} 
                className="hover:text-[#D97706] transition-colors cursor-pointer"
              >
                Protocoles Systémiques
              </button>
              <ChevronRight className="w-3.5 h-3.5 text-[#0F261E]/40 shrink-0" />
              <span className="text-[#0F261E] font-bold truncate">Protocole SIBO</span>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handleShare}
                className="px-3 py-1.5 rounded-xl border border-[#0F261E]/15 text-[#0F261E] hover:bg-[#0F261E]/5 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                title={t.breadcrumb.share}
                aria-label={t.breadcrumb.share}
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
                <span className="hidden sm:inline">{copiedLink ? "Copié" : t.breadcrumb.share}</span>
              </button>
              <button
                onClick={handlePrint}
                className="px-3.5 py-1.5 rounded-xl bg-[#0F261E] hover:bg-[#D97706] text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
                title={t.breadcrumb.downloadPdf}
                aria-label={t.breadcrumb.downloadPdf}
              >
                <Printer className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{t.breadcrumb.downloadPdf}</span>
              </button>
            </div>
          </div>
        </div>

        {/* 2. SECTION 1 : EN-TÊTE / HERO */}
        <header className="pt-8 pb-14 px-4 sm:px-6 bg-gradient-to-b from-[#FAF7F2] via-[#F4EFE6] to-[#FAF7F2] border-b border-[#E7DFD3]">
          <div className="max-w-4xl mx-auto">
            
            {/* Back link */}
            <div className="mb-6">
              <button
                onClick={() => onNavigate('phytotherapie-reset')}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0F261E]/70 hover:text-[#D97706] transition-colors cursor-pointer"
              >
                <span>← Retour aux Protocoles Systémiques</span>
              </button>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1C3F34] text-white text-[11px] font-black uppercase tracking-[0.2em] mb-6 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-[#D97706]" />
                <span>{t.hero.badge}</span>
              </div>

              <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-[#0F261E] tracking-tight leading-[1.1] mb-6">
                {t.hero.title}
              </h1>

              <p className="text-base sm:text-xl text-[#0F261E]/80 max-w-2xl mx-auto font-medium leading-relaxed mb-8">
                {t.hero.subtitle}
              </p>

              {/* Barre de métadonnées */}
              <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-bold mb-8">
                <span className="px-3.5 py-1.5 rounded-xl bg-white border border-[#E7DFD3] text-[#0F261E] shadow-xs flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#D97706]" />
                  <span>Durée : {t.hero.tagWeeks}</span>
                </span>
                <span className="px-3.5 py-1.5 rounded-xl bg-white border border-[#E7DFD3] text-[#0F261E] shadow-xs flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-[#1C3F34]" />
                  <span>Cible : {t.hero.tagAxis}</span>
                </span>
                <span className="px-3.5 py-1.5 rounded-xl bg-white border border-[#E7DFD3] text-[#0F261E] shadow-xs flex items-center gap-1.5">
                  <Leaf className="w-4 h-4 text-[#1C3F34]" />
                  <span>Sécurité : {t.hero.tagSafety}</span>
                </span>
                <span className="px-3.5 py-1.5 rounded-xl bg-white border border-[#E7DFD3] text-[#0F261E] shadow-xs flex items-center gap-1.5">
                  <Shield className="w-4 h-4 text-[#B45309]" />
                  <span>Hygiène Vitale Validée</span>
                </span>
              </div>
            </div>

            {/* Avertissement Médical */}
            <div className="p-6 sm:p-7 rounded-3xl bg-[#FEF3C7]/40 border-2 border-[#D97706]/40 text-[#78350F] shadow-sm">
              <div className="flex items-start gap-3.5">
                <AlertTriangle className="w-6 h-6 text-[#D97706] shrink-0 mt-0.5" />
                <div className="space-y-2">
                  <h2 className="text-xs font-black uppercase tracking-widest text-[#92400E]">
                    Avertissement Médical Obligatoire
                  </h2>
                  <p className="text-xs sm:text-sm leading-relaxed text-[#78350F] font-normal">
                    {SIBO_MEDICAL_DISCLAIMER}
                  </p>
                </div>
              </div>
            </div>

          </div>
        </header>

        {/* Main Article Body */}
        <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-6 space-y-16">

          {/* 3. SECTION 2 : AVANT-PROPOS — LIRE LE SIBO AUTREMENT */}
          <section className="scroll-mt-36">
            <div className="bg-white p-8 sm:p-10 rounded-[36px] border border-[#E7DFD3] shadow-xs">
              <div className="text-[10px] font-black uppercase tracking-[0.25em] text-[#D97706] mb-3">
                I. COMPRENDRE LE TERRAIN SIBO
              </div>
              
              <h2 className="text-2xl sm:text-3xl font-black text-[#0F261E] mb-6">
                {t.foreword.title}
              </h2>
              
              <div className="space-y-4 text-sm sm:text-base text-[#0F261E]/80 leading-relaxed font-normal mb-6">
                <p>{t.foreword.p1}</p>
                <p>{t.foreword.p2}</p>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAF7F2] border-l-4 border-[#D97706] mb-6 text-sm font-serif italic text-[#0F261E]">
                "{t.foreword.quote}"
              </div>

              <p className="text-sm sm:text-base text-[#0F261E]/80 leading-relaxed mb-6 font-normal">
                {t.foreword.p3}
              </p>

              {t.foreword.highlightTitle && (
                <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E7DFD3] text-sm text-[#0F261E]">
                  <strong className="text-[#D97706] block mb-1 text-xs font-black uppercase tracking-wider">{t.foreword.highlightTitle}</strong>
                  <p className="text-[#0F261E]/80">{t.foreword.highlightText}</p>
                </div>
              )}
            </div>
          </section>

          {/* 4. SECTION 3 : LES 4 PRÉREQUIS NON NÉGOCIABLES */}
          <section className="scroll-mt-36">
            <div className="bg-white p-8 sm:p-10 rounded-[36px] border border-[#E7DFD3] shadow-xs">
              <div className="text-[10px] font-black uppercase tracking-[0.25em] text-[#D97706] mb-3">
                II. {t.prereqs.badge}
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-[#0F261E] mb-3">
                {t.prereqs.title}
              </h2>
              <p className="text-sm sm:text-base text-[#0F261E]/80 max-w-2xl mb-8 font-normal">
                {t.prereqs.subtitle}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {t.prereqs.items.map((item, idx) => (
                  <div key={idx} className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#E7DFD3] hover:border-[#D97706]/40 transition-all relative overflow-hidden group flex flex-col justify-between">
                    <div className="absolute top-4 right-5 text-4xl text-[#0F261E]/5 font-black select-none group-hover:text-[#0F261E]/10 transition-colors">
                      0{idx + 1}
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-xl bg-white border border-[#E7DFD3] flex items-center justify-center text-[#D97706] shadow-xs">
                          {idx === 0 ? <Moon className="w-5 h-5" /> : idx === 1 ? <Activity className="w-5 h-5 text-[#1C3F34]" /> : idx === 2 ? <Zap className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                        </div>
                        <h3 className="text-base sm:text-lg font-black text-[#0F261E]">{item.title}</h3>
                      </div>
                      <p className="text-xs sm:text-sm text-[#0F261E]/80 leading-relaxed mb-4 font-normal">
                        {item.desc}
                      </p>
                    </div>
                    {item.advice && (
                      <div className="p-2.5 rounded-xl bg-white text-[11px] text-[#D97706] font-bold border-l-2 border-[#D97706] shadow-xs">
                        {item.advice}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 5. SECTION 4 : PROTOCOLE DÉTAILLÉ EN 4 PHASES (PREMIUM AVEC VERROU) */}
          <section className="scroll-mt-36" id="protocole-detaille">
            
            {!isUnlocked ? (
              /* Bloc de verrouillage interactif */
              <div className="p-8 sm:p-12 rounded-[36px] bg-white border-2 border-[#D97706]/40 text-center relative overflow-hidden shadow-xs">
                <div className="w-16 h-16 rounded-full bg-[#1C3F34] text-[#D97706] flex items-center justify-center mx-auto mb-6 shadow-sm">
                  <Lock className="w-7 h-7" />
                </div>

                <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#1C3F34] text-white text-[11px] font-black uppercase tracking-[0.2em] mb-4 shadow-xs">
                  Accès Protocole Avancé
                </div>

                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0F261E] mb-3">
                  PROTOCOLE DÉTAILLÉ — CONTENU PRIVILÈGE
                </h2>

                <p className="text-sm sm:text-base text-[#0F261E]/80 max-w-xl mx-auto mb-6 font-normal leading-relaxed">
                  Inscrivez-vous gratuitement pour débloquer l'accès immédiat à l'intégralité du protocole SIBO : la détection des signes cliniques (langue, pouls, abdomen), les 4 phases séquentielles, les posologies au milligramme, la chronobiologie d'administration et les règles de sécurité.
                </p>

                {/* Repères des modules inclus dans le contenu privilège */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-w-lg mx-auto mb-8 text-left text-xs">
                  <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#E7DFD3]">
                    <span className="font-bold text-[#0F261E] block text-[11px] uppercase tracking-wider text-[#D97706]">Étape 1</span>
                    <span className="text-slate-700 font-medium">Détection &amp; Signes</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#E7DFD3]">
                    <span className="font-bold text-[#0F261E] block text-[11px] uppercase tracking-wider text-[#1C3F34]">Phases 0 &amp; 1</span>
                    <span className="text-slate-700 font-medium">Drainage &amp; Biofilms</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#E7DFD3]">
                    <span className="font-bold text-[#0F261E] block text-[11px] uppercase tracking-wider text-[#1C3F34]">Phase 2</span>
                    <span className="text-slate-700 font-medium">Assainissement</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#E7DFD3]">
                    <span className="font-bold text-[#0F261E] block text-[11px] uppercase tracking-wider text-[#1C3F34]">Phase 3</span>
                    <span className="text-slate-700 font-medium">Réparation</span>
                  </div>
                </div>

                <form onSubmit={handleUnlockSubmit} className="max-w-md mx-auto space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      value={prenom}
                      onChange={(e) => setPrenom(e.target.value)}
                      placeholder="Votre prénom"
                      className="w-full px-4 py-3 rounded-xl bg-[#FAF7F2] border border-[#E7DFD3] focus:border-[#D97706] focus:outline-none text-sm text-[#0F261E] placeholder-[#0F261E]/40"
                      required
                    />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Votre email"
                      className="w-full px-4 py-3 rounded-xl bg-[#FAF7F2] border border-[#E7DFD3] focus:border-[#D97706] focus:outline-none text-sm text-[#0F261E] placeholder-[#0F261E]/40"
                      required
                    />
                  </div>

                  {formError && (
                    <div className="text-xs text-rose-600 font-bold text-left pt-1">
                      {formError}
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-xl bg-[#D97706] hover:bg-[#B45309] text-white font-bold text-sm tracking-wide transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Débloquer le Protocole Complet</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <p className="text-[11px] text-[#0F261E]/60 pt-2 font-normal">
                    🔒 Vos données restent strictement confidentielles. Aucun spam. Respect de la vie privée conforme RGPD.
                  </p>
                </form>
              </div>
            ) : (
              /* Contenu Débloqué */
              <div className="space-y-12 animate-in fade-in duration-700">
                
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3 text-sm text-emerald-900 font-medium">
                    <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-600" />
                    <span><strong>Protocole complet débloqué :</strong> Accès illimité à la détection clinique et aux 4 phases séquentielles.</span>
                  </div>
                  <button
                    onClick={handlePrint}
                    className="px-4 py-2 rounded-xl bg-white hover:bg-emerald-100/50 border border-emerald-200 text-xs font-bold text-emerald-900 flex items-center gap-2 transition-colors cursor-pointer shrink-0 shadow-xs"
                  >
                    <Download className="w-3.5 h-3.5 text-[#D97706]" />
                    <span>Imprimer / PDF</span>
                  </button>
                </div>

                {/* ==================== DÉTECTION — LIRE LES SIGNES DU SIBO ==================== */}
                <article className="p-6 sm:p-10 rounded-[36px] bg-white border border-[#E7DFD3] shadow-xs print-card">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="px-3.5 py-1 rounded-full bg-[#1C3F34] text-white font-black text-xs uppercase tracking-wider">
                      Étape Préalable
                    </span>
                    <span className="text-xs text-[#D97706] font-bold">
                      Observation Biologique • Signatures du Terrain
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-[#0F261E] mb-2">
                    DÉTECTION — LIRE LES SIGNES DU SIBO
                  </h3>
                  <p className="text-sm sm:text-base text-[#0F261E]/80 max-w-2xl mb-8 font-normal leading-relaxed">
                    Le corps exprime la dysbiose haute à travers des signatures corporelles précises documentées par les traditions et validées par la clinique. Identifiez vos marqueurs avant d'entamer le protocole séquentiel.
                  </p>

                  <div className="space-y-6">
                    
                    {/* 1. Langue */}
                    <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#E7DFD3] print-card">
                      <h4 className="text-base sm:text-lg font-black text-[#0F261E] mb-4 flex items-center gap-2">
                        <Eye className="w-4 h-4 text-[#D97706]" />
                        1. Sur la Langue (Observation au réveil à jeun)
                      </h4>
                      <div className="overflow-x-auto rounded-2xl border border-[#E7DFD3] bg-white shadow-xs">
                        <table className="w-full text-left text-xs sm:text-sm">
                          <thead className="bg-[#1C3F34] text-white border-b border-[#E7DFD3]">
                            <tr>
                              <th className="p-3.5 sm:p-4 font-bold">Observation Visuelle</th>
                              <th className="p-3.5 sm:p-4 font-bold">Signification Traditionnelle</th>
                              <th className="p-3.5 sm:p-4 font-bold">Corrélat Clinique SIBO</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-[#E7DFD3] text-[#0F261E]">
                            <tr className="hover:bg-[#FAF7F2]">
                              <td className="p-3.5 sm:p-4 font-bold text-[#0F261E]">Enduit blanc épais au centre et à l'arrière</td>
                              <td className="p-3.5 sm:p-4 text-[#0F261E]/80">Accumulation massive d'Ama (toxines non métabolisées)</td>
                              <td className="p-3.5 sm:p-4 text-[#0F261E]/80">SIBO à hydrogène prédominant (fermentation active des glucides).</td>
                            </tr>
                            <tr className="hover:bg-[#FAF7F2]">
                              <td className="p-3.5 sm:p-4 font-bold text-[#0F261E]">Langue pâle, gonflée avec empreintes de dents</td>
                              <td className="p-3.5 sm:p-4 text-[#0F261E]/80">Vide de Qi de Rate avec stase d'Humidité (Kapha)</td>
                              <td className="p-3.5 sm:p-4 text-[#0F261E]/80">SIBO à méthane (ralentissement du transit, tendance à la constipation).</td>
                            </tr>
                            <tr className="hover:bg-[#FAF7F2]">
                              <td className="p-3.5 sm:p-4 font-bold text-[#0F261E]">Langue rouge vif, enduit jaune sec au fond</td>
                              <td className="p-3.5 sm:p-4 text-[#0F261E]/80">Feu gastrique toxique et Chaleur-Humidité (Pitta)</td>
                              <td className="p-3.5 sm:p-4 text-[#0F261E]/80">Inflammation muqueuse intestinale et pullulation mixte.</td>
                            </tr>
                            <tr className="hover:bg-[#FAF7F2]">
                              <td className="p-3.5 sm:p-4 font-bold text-[#0F261E]">Langue fissurée au centre, sans enduit</td>
                              <td className="p-3.5 sm:p-4 text-[#0F261E]/80">Épuisement du Yin de l'Estomac et sécheresse de Vata</td>
                              <td className="p-3.5 sm:p-4 text-[#0F261E]/80">Atrophie villositaire débutante et malabsorption chronique.</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* 2. Pouls */}
                    <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#E7DFD3] print-card">
                      <h4 className="text-base sm:text-lg font-black text-[#0F261E] mb-4 flex items-center gap-2">
                        <Heart className="w-4 h-4 text-[#D97706]" />
                        2. Sur le Pouls (Évaluation de la vitalité)
                      </h4>
                      <div className="overflow-x-auto rounded-2xl border border-[#E7DFD3] bg-white shadow-xs">
                        <table className="w-full text-left text-xs sm:text-sm">
                          <thead className="bg-[#1C3F34] text-white border-b border-[#E7DFD3]">
                            <tr>
                              <th className="p-3.5 sm:p-4 font-bold">Qualité du Pouls</th>
                              <th className="p-3.5 sm:p-4 font-bold">Sensibilité Palpatoire</th>
                              <th className="p-3.5 sm:p-4 font-bold">Écho Métabolique</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-[#E7DFD3] text-[#0F261E]">
                            <tr className="hover:bg-[#FAF7F2]">
                              <td className="p-3.5 sm:p-4 font-bold text-[#0F261E]">Pouls Glissant (Hua Mai)</td>
                              <td className="p-3.5 sm:p-4 text-[#0F261E]/80">Sensation d'une bille roulant sous le doigt à la loge droite</td>
                              <td className="p-3.5 sm:p-4 text-[#0F261E]/80">Présence de glaires et stase d'eau dans le tube digestif médian.</td>
                            </tr>
                            <tr className="hover:bg-[#FAF7F2]">
                              <td className="p-3.5 sm:p-4 font-bold text-[#0F261E]">Pouls en Corde (Xian Mai)</td>
                              <td className="p-3.5 sm:p-4 text-[#0F261E]/80">Tendu et rigide comme une corde d'instrument</td>
                              <td className="p-3.5 sm:p-4 text-[#0F261E]/80">Hypertonie sympathique : le stress bloque le nerf vague.</td>
                            </tr>
                            <tr className="hover:bg-[#FAF7F2]">
                              <td className="p-3.5 sm:p-4 font-bold text-[#0F261E]">Pouls Faible et Profond (Chen Xu Mai)</td>
                              <td className="p-3.5 sm:p-4 text-[#0F261E]/80">Imperceptible en surface, nécessite une pression appuyée</td>
                              <td className="p-3.5 sm:p-4 text-[#0F261E]/80">Déficit enzymatique pancréatique et épuisement de la pompe acide.</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* 3. Abdomen & Visage */}
                    <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#E7DFD3] print-card">
                      <h4 className="text-base sm:text-lg font-black text-[#0F261E] mb-4 flex items-center gap-2">
                        <Activity className="w-4 h-4 text-[#1C3F34]" />
                        3. Sur l'Abdomen et le Visage
                      </h4>
                      <div className="overflow-x-auto rounded-2xl border border-[#E7DFD3] bg-white shadow-xs">
                        <table className="w-full text-left text-xs sm:text-sm">
                          <thead className="bg-[#1C3F34] text-white border-b border-[#E7DFD3]">
                            <tr>
                              <th className="p-3.5 sm:p-4 font-bold">Zone Corporelle</th>
                              <th className="p-3.5 sm:p-4 font-bold">Signe Clinique Révélateur</th>
                              <th className="p-3.5 sm:p-4 font-bold">Mécanisme Sous-jacent</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-[#E7DFD3] text-[#0F261E]">
                            <tr className="hover:bg-[#FAF7F2]">
                              <td className="p-3.5 sm:p-4 font-bold text-[#0F261E]">Abdomen épigastrique</td>
                              <td className="p-3.5 sm:p-4 text-[#0F261E]/80">Distension visible 30 à 45 minutes après le repas</td>
                              <td className="p-3.5 sm:p-4 text-[#0F261E]/80">Gaz précoces produits dans l'intestin grêle (avant d'atteindre le côlon).</td>
                            </tr>
                            <tr className="hover:bg-[#FAF7F2]">
                              <td className="p-3.5 sm:p-4 font-bold text-[#0F261E]">Fosse iliaque droite</td>
                              <td className="p-3.5 sm:p-4 text-[#0F261E]/80">Tension douloureuse au carrefour de la valve iléo-cæcale</td>
                              <td className="p-3.5 sm:p-4 text-[#0F261E]/80">Spasme ou incompétence valvulaire laissant remonter le microbiote colique.</td>
                            </tr>
                            <tr className="hover:bg-[#FAF7F2]">
                              <td className="p-3.5 sm:p-4 font-bold text-[#0F261E]">Cernes sous-orbitaires</td>
                              <td className="p-3.5 sm:p-4 text-[#0F261E]/80">Cernes sombres bleutés ou violacés permanents</td>
                              <td className="p-3.5 sm:p-4 text-[#0F261E]/80">Surcharge hépatique due aux endotoxines LPS circulantes.</td>
                            </tr>
                            <tr className="hover:bg-[#FAF7F2]">
                              <td className="p-3.5 sm:p-4 font-bold text-[#0F261E]">Peau péribuccale</td>
                              <td className="p-3.5 sm:p-4 text-[#0F261E]/80">Petits boutons inflammatoires ou rougeurs type rosacée</td>
                              <td className="p-3.5 sm:p-4 text-[#0F261E]/80">Axe intestin-peau activé par l'hyperperméabilité digestive.</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                  </div>
                </article>

                {/* ==================== PHASE 0 ==================== */}
                <article className="p-6 sm:p-10 rounded-[36px] bg-white border border-[#E7DFD3] shadow-xs print-card">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="px-3.5 py-1 rounded-full bg-[#1C3F34] text-white font-black text-xs uppercase tracking-wider">
                      Phase 0
                    </span>
                    <span className="text-xs text-[#D97706] font-bold">
                      Durée obligatoire : 5 à 7 jours
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-[#0F261E] mb-3">
                    PRÉPARATION DES ÉMONCTOIRES &amp; SOUTIEN HÉPATOBILIAIRE
                  </h3>
                  <p className="text-sm sm:text-base text-[#0F261E]/80 leading-relaxed mb-6 font-normal">
                    <strong>Objectif capital :</strong> Ouvrir les voies d'élimination hépatique, biliaire et rénale avant d'amorcer toute lyse bactérienne. Cette étape élimine le risque d'engorgement toxinique et prévient la violente réaction d'Herxheimer (céphalées, nausées, frissons).
                  </p>

                  <div className="overflow-x-auto rounded-2xl border border-[#E7DFD3] bg-white mb-6 shadow-xs">
                    <table className="w-full text-left text-xs sm:text-sm">
                      <thead className="bg-[#1C3F34] text-white border-b border-[#E7DFD3]">
                        <tr>
                          <th className="p-3.5 sm:p-4 font-bold">Moment</th>
                          <th className="p-3.5 sm:p-4 font-bold">Principe Actif / Plante</th>
                          <th className="p-3.5 sm:p-4 font-bold">Posologie Recommandée</th>
                          <th className="p-3.5 sm:p-4 font-bold">Rôle Physiologique</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E7DFD3] text-[#0F261E]">
                        <tr className="hover:bg-[#FAF7F2]">
                          <td className="p-3.5 sm:p-4 font-bold text-[#0F261E]">Matin (à jeun)</td>
                          <td className="p-3.5 sm:p-4">Desmodium <em>(Desmodium adscendens)</em> + Citron tiède</td>
                          <td className="p-3.5 sm:p-4">1 tasse d'infusion concentrée (ou 250 mg extrait sec)</td>
                          <td className="p-3.5 sm:p-4 text-[#0F261E]/80">Protection des hépatocytes et relance de la bile matinale.</td>
                        </tr>
                        <tr className="hover:bg-[#FAF7F2]">
                          <td className="p-3.5 sm:p-4 font-bold text-[#0F261E]">Midi (avant repas)</td>
                          <td className="p-3.5 sm:p-4">Artichaut &amp; Pissenlit <em>(Taraxacum officinale)</em></td>
                          <td className="p-3.5 sm:p-4">Extrait fluide ou infusion titrée (300 mg)</td>
                          <td className="p-3.5 sm:p-4 text-[#0F261E]/80">Stimulation cholérétique (sécrétion biliaire décontaminante).</td>
                        </tr>
                        <tr className="hover:bg-[#FAF7F2]">
                          <td className="p-3.5 sm:p-4 font-bold text-[#0F261E]">Soir (avant repas)</td>
                          <td className="p-3.5 sm:p-4">Chardon-Marie <em>(Silybum marianum)</em></td>
                          <td className="p-3.5 sm:p-4">Extrait titré à 80% silymarine (150 mg)</td>
                          <td className="p-3.5 sm:p-4 text-[#0F261E]/80">Régénération membranaire hépatique face aux endotoxines.</td>
                        </tr>
                        <tr className="hover:bg-[#FAF7F2]">
                          <td className="p-3.5 sm:p-4 font-bold text-[#0F261E]">Coucher</td>
                          <td className="p-3.5 sm:p-4">Infusion Romarin à verbénone &amp; Camomille matricaire</td>
                          <td className="p-3.5 sm:p-4">1 tasse tiède extraite au BloomLab (85°C, 8 min)</td>
                          <td className="p-3.5 sm:p-4 text-[#0F261E]/80">Spasmolytique biliaire et détente du sphincter d'Oddi.</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E7DFD3]">
                      <h4 className="text-xs uppercase font-black text-[#D97706] mb-2 flex items-center gap-2">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        Précautions &amp; Sécurité
                      </h4>
                      <p className="text-xs text-[#0F261E]/80 leading-relaxed font-normal">
                        • Ne pas administrer en cas d'obstruction avérée des voies biliaires (calculs vésiculaires enclavés).<br />
                        • Boire 1,5L d'eau peu minéralisée pour drainer le filtre rénal.
                      </p>
                    </div>
                    <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E7DFD3]">
                      <h4 className="text-xs uppercase font-black text-[#1C3F34] mb-2 flex items-center gap-2">
                        <Leaf className="w-3.5 h-3.5" />
                        Alimentation Associée
                      </h4>
                      <p className="text-xs text-[#0F261E]/80 leading-relaxed font-normal">
                        • Légumes cuits doux (courgettes épluchées, carottes vapeur, potimarron).<br />
                        • Suppression totale de l'alcool, café serré, fritures et sucres raffinés.
                      </p>
                    </div>
                  </div>
                </article>

              {/* ==================== PHASE 1 ==================== */}
              <article className="p-6 sm:p-10 rounded-[36px] bg-white border border-[#E7DFD3] shadow-xs print-card">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="px-3.5 py-1 rounded-full bg-[#1C3F34] text-white font-black text-xs uppercase tracking-wider">
                    Phase 1
                  </span>
                  <span className="text-xs text-[#D97706] font-bold">
                    Durée : 4 à 6 semaines
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-[#0F261E] mb-3">
                  ÉRADICATION DOUCE &amp; RELANCE PROKINÉTIQUE
                </h3>
                <p className="text-sm sm:text-base text-[#0F261E]/80 leading-relaxed mb-6 font-normal">
                  <strong>Objectif :</strong> Dissoudre les biofilms microbiens, réduire la pullulation dans l'intestin grêle sans ravager la flore colique résidente, et stimuler les ondes péristaltiques du Complexe Moteur Migrant.
                </p>

                <div className="overflow-x-auto rounded-2xl border border-[#E7DFD3] bg-white mb-6 shadow-xs">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-[#1C3F34] text-white border-b border-[#E7DFD3]">
                      <tr>
                        <th className="p-3.5 sm:p-4 font-bold">Moment</th>
                        <th className="p-3.5 sm:p-4 font-bold">Phyto-actifs Précision</th>
                        <th className="p-3.5 sm:p-4 font-bold">Posologie</th>
                        <th className="p-3.5 sm:p-4 font-bold">Mode d'Action &amp; Précautions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E7DFD3] text-[#0F261E]">
                      <tr className="hover:bg-[#FAF7F2]">
                        <td className="p-3.5 sm:p-4 font-bold text-[#0F261E]">Matin (15 min avant)</td>
                        <td className="p-3.5 sm:p-4">Extrait de Gingembre officinal <em>(Zingiber officinale)</em></td>
                        <td className="p-3.5 sm:p-4">500 mg extrait titré à 5% gingérols</td>
                        <td className="p-3.5 sm:p-4 text-[#0F261E]/80">Prokinétique gastrique : active le récepteur sérotoninergique 5-HT4.</td>
                      </tr>
                      <tr className="hover:bg-[#FAF7F2]">
                        <td className="p-3.5 sm:p-4 font-bold text-[#0F261E]">Midi (au repas)</td>
                        <td className="p-3.5 sm:p-4">Berbérine HCl + Origan compact (capsules gastrorésistantes)</td>
                        <td className="p-3.5 sm:p-4">Berbérine 500 mg + 1 capsule Origan encapsulé</td>
                        <td className="p-3.5 sm:p-4 text-[#0F261E]/80">Antibactérien large spectre et antifongique sans toxicité hépatique directe.</td>
                      </tr>
                      <tr className="hover:bg-[#FAF7F2]">
                        <td className="p-3.5 sm:p-4 font-bold text-[#0F261E]">Soir (au repas)</td>
                        <td className="p-3.5 sm:p-4">Extrait de Pépins de Pamplemousse (EPP) + Thym à thymol</td>
                        <td className="p-3.5 sm:p-4">15 gouttes d'EPP pur ou 1 capsule titrée</td>
                        <td className="p-3.5 sm:p-4 text-[#0F261E]/80">Dislocation des biofilms bactériens et antifongique de soutien.</td>
                      </tr>
                      <tr className="hover:bg-[#FAF7F2]">
                        <td className="p-3.5 sm:p-4 font-bold text-[#0F261E]">Coucher (2h après)</td>
                        <td className="p-3.5 sm:p-4"><strong>Binder :</strong> Charbon Végétal Activé ou Argile Montmorillonite</td>
                        <td className="p-3.5 sm:p-4">1 cuillère à café dans un grand verre d'eau</td>
                        <td className="p-3.5 sm:p-4 text-[#0F261E]/80"><strong>Adsorbant :</strong> Capte les endotoxines LPS libérées. <em>À 2h de tout médicament.</em></td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E7DFD3]">
                    <h4 className="text-xs uppercase font-black text-[#D97706] mb-2 flex items-center gap-2">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      Règles d'or Phase 1
                    </h4>
                    <p className="text-xs text-[#0F261E]/80 leading-relaxed font-normal">
                      • <strong>Strictement AUCUN probiotique</strong> durant cette phase : ils suralimenteraient la pullulation dans le grêle.<br />
                      • Respecter 2 heures d'écart strict entre le binder et tout traitement médicamenteux.
                    </p>
                  </div>
                  <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E7DFD3]">
                    <h4 className="text-xs uppercase font-black text-[#1C3F34] mb-2 flex items-center gap-2">
                      <Leaf className="w-3.5 h-3.5" />
                      Alimentation Low-FODMAP
                    </h4>
                    <p className="text-xs text-[#0F261E]/80 leading-relaxed font-normal">
                      • Réduction transitoire des glucides fermentescibles (oignons, ail cru, pommes, choux, légumineuses).<br />
                      • Maintenir des apports en protéines nobles digestes (poisson blanc, volaille, œufs bio).
                    </p>
                  </div>
                </div>
              </article>

              {/* ==================== PHASE 2 ==================== */}
              <article className="p-6 sm:p-10 rounded-[36px] bg-white border border-[#E7DFD3] shadow-xs print-card">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="px-3.5 py-1 rounded-full bg-[#1C3F34] text-white font-black text-xs uppercase tracking-wider">
                    Phase 2
                  </span>
                  <span className="text-xs text-[#D97706] font-bold">
                    Durée : 4 semaines
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-[#0F261E] mb-3">
                  RESTAURATION DE LA BARRIÈRE &amp; RÉENSEMENCEMENT SPORULÉ
                </h3>
                <p className="text-sm sm:text-base text-[#0F261E]/80 leading-relaxed mb-6 font-normal">
                  <strong>Objectif :</strong> Réparer la muqueuse intestinale lésée par l'inflammation (hyperperméabilité ou <em>leaky gut</em>) et réensemencer prudemment le côlon avec des souches sporulées qui ne fermentent pas dans l'intestin grêle.
                </p>

                <div className="overflow-x-auto rounded-2xl border border-[#E7DFD3] bg-white mb-6 shadow-xs">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-[#1C3F34] text-white border-b border-[#E7DFD3]">
                      <tr>
                        <th className="p-3.5 sm:p-4 font-bold">Moment</th>
                        <th className="p-3.5 sm:p-4 font-bold">Nutriments &amp; Plantes Réparatrices</th>
                        <th className="p-3.5 sm:p-4 font-bold">Posologie</th>
                        <th className="p-3.5 sm:p-4 font-bold">Action Cellulaire</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E7DFD3] text-[#0F261E]">
                      <tr className="hover:bg-[#FAF7F2]">
                        <td className="p-3.5 sm:p-4 font-bold text-[#0F261E]">Matin (à jeun)</td>
                        <td className="p-3.5 sm:p-4">L-Glutamine pure fermentée végétale</td>
                        <td className="p-3.5 sm:p-4">3 à 5 g dans un verre d'eau tiède</td>
                        <td className="p-3.5 sm:p-4 text-[#0F261E]/80">Carburant premier des entérocytes et fermeture des jonctions serrées.</td>
                      </tr>
                      <tr className="hover:bg-[#FAF7F2]">
                        <td className="p-3.5 sm:p-4 font-bold text-[#0F261E]">Avant déjeuner</td>
                        <td className="p-3.5 sm:p-4">Gel d'Aloe Vera natif (sans aloïne) + Réglisse DGL</td>
                        <td className="p-3.5 sm:p-4">30 ml de gel pur + 250 mg extrait DGL</td>
                        <td className="p-3.5 sm:p-4 text-[#0F261E]/80">Nappage protecteur muqueux et apaisement de l'irritation mécanique.</td>
                      </tr>
                      <tr className="hover:bg-[#FAF7F2]">
                        <td className="p-3.5 sm:p-4 font-bold text-[#0F261E]">Midi (au repas)</td>
                        <td className="p-3.5 sm:p-4">Zinc L-Carnosine</td>
                        <td className="p-3.5 sm:p-4">75 mg (apportant 16 mg de zinc élémentaire)</td>
                        <td className="p-3.5 sm:p-4 text-[#0F261E]/80">Cicatrisation démontrée de la paroi gastro-duodénale.</td>
                      </tr>
                      <tr className="hover:bg-[#FAF7F2]">
                        <td className="p-3.5 sm:p-4 font-bold text-[#0F261E]">Dîner (au repas)</td>
                        <td className="p-3.5 sm:p-4">Probiotiques sporulés <em>(Bacillus coagulans &amp; subtilis)</em></td>
                        <td className="p-3.5 sm:p-4">2 à 3 milliards d'UFC sporulées</td>
                        <td className="p-3.5 sm:p-4 text-[#0F261E]/80">Atteignent le côlon intacts sans proliférer dans le duodénum.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E7DFD3]">
                    <h4 className="text-xs uppercase font-black text-[#D97706] mb-2 flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5" />
                      Pourquoi des Spores ?
                    </h4>
                    <p className="text-xs text-[#0F261E]/80 leading-relaxed font-normal">
                      Contrairement aux souches classiques qui se dégradent ou fermentent dès le grêle, les spores résistent à l'acide gastrique et germent uniquement dans le côlon distal.
                    </p>
                  </div>
                  <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E7DFD3]">
                    <h4 className="text-xs uppercase font-black text-[#1C3F34] mb-2 flex items-center gap-2">
                      <Leaf className="w-3.5 h-3.5" />
                      Fibres Douces &amp; Collagène
                    </h4>
                    <p className="text-xs text-[#0F261E]/80 leading-relaxed font-normal">
                      Réintroduction graduelle de fibres solubles douces (graines de chia trempées, carottes cuites) et bouillons riches en minéraux biodisponibles.
                    </p>
                  </div>
                </div>
              </article>

              {/* ==================== PHASE 3 ==================== */}
              <article className="p-6 sm:p-10 rounded-[36px] bg-white border border-[#E7DFD3] shadow-xs print-card">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="px-3.5 py-1 rounded-full bg-[#1C3F34] text-white font-black text-xs uppercase tracking-wider">
                    Phase 3
                  </span>
                  <span className="text-xs text-[#D97706] font-bold">
                    Stabilisation Durable (3 à 6 mois)
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-[#0F261E] mb-3">
                  STABILISATION, ACIDITÉ GASTRIQUE &amp; PRÉVENTION DES RÉCIDIVES
                </h3>
                <p className="text-sm sm:text-base text-[#0F261E]/80 leading-relaxed mb-6 font-normal">
                  <strong>Objectif :</strong> Pérenniser l'homéostasie, s'assurer que le premier filtre antibactérien naturel (l'acidité gastrique) fonctionne à plein régime, et verrouiller le réflexe du complexe moteur migrant.
                </p>

                <div className="overflow-x-auto rounded-2xl border border-[#E7DFD3] bg-white shadow-xs">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-[#1C3F34] text-white border-b border-[#E7DFD3]">
                      <tr>
                        <th className="p-3.5 sm:p-4 font-bold">Pratique d'Entretien</th>
                        <th className="p-3.5 sm:p-4 font-bold">Modalité Concrète</th>
                        <th className="p-3.5 sm:p-4 font-bold">Bénéfice Préventif</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E7DFD3] text-[#0F261E]">
                      <tr className="hover:bg-[#FAF7F2]">
                        <td className="p-3.5 sm:p-4 font-bold text-[#0F261E]">Amers Botaniques avant repas</td>
                        <td className="p-3.5 sm:p-4">Gentiane jaune, Artichaut ou 1 c.à.c de vinaigre de cidre bio non pasteurisé</td>
                        <td className="p-3.5 sm:p-4 text-[#0F261E]/80">Déclenche le réflexe vagal de sécrétion d'acide chlorhydrique et d'enzymes pancréatiques.</td>
                      </tr>
                      <tr className="hover:bg-[#FAF7F2]">
                        <td className="p-3.5 sm:p-4 font-bold text-[#0F261E]">Infusion d'Entretien BloomLab</td>
                        <td className="p-3.5 sm:p-4">Gingembre frais + Mauve + Mélisse (90°C, 10 min)</td>
                        <td className="p-3.5 sm:p-4 text-[#0F261E]/80">Conserve un péristaltisme nocturne fluide sans accoutumance.</td>
                      </tr>
                      <tr className="hover:bg-[#FAF7F2]">
                        <td className="p-3.5 sm:p-4 font-bold text-[#0F261E]">Jeûne Interprandial</td>
                        <td className="p-3.5 sm:p-4">4 heures strictes entre chaque prise alimentaire sans grignotage</td>
                        <td className="p-3.5 sm:p-4 text-[#0F261E]/80">Chaque prise alimentaire interrompt le cycle de nettoyage du CMM. Laisser l'intestin vide permet le balayage.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </article>

            </div>
          )}

        </section>

        {/* 6. SECTION 5 : RÈGLES D'OR DU RESET SIBO */}
        <section className="scroll-mt-36">
          <div className="bg-white p-8 sm:p-10 rounded-[36px] border border-[#E7DFD3] shadow-xs">
            <div className="text-[10px] font-black uppercase tracking-[0.25em] text-[#D97706] mb-3">
              III. RÈGLES STRATÉGIQUES • PRÉCISION
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0F261E] mb-2">
              LES RÈGLES D'OR DU RESET SIBO
            </h2>
            <p className="text-sm sm:text-base text-[#0F261E]/80 max-w-2xl mb-8 font-normal">
              Le non-respect d'un seul de ces principes peut compromettre l'ensemble du protocole.
            </p>

            <div className="overflow-x-auto rounded-2xl border border-[#E7DFD3] bg-white print-card shadow-xs">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-[#1C3F34] text-white border-b border-[#E7DFD3]">
                  <tr>
                    <th className="p-3.5 sm:p-4 font-bold">Règle Inviolable</th>
                    <th className="p-3.5 sm:p-4 font-bold">Application Pratique</th>
                    <th className="p-3.5 sm:p-4 font-bold">Raison Biologique</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E7DFD3] text-[#0F261E]">
                  <tr className="hover:bg-[#FAF7F2]">
                    <td className="p-3.5 sm:p-4 font-bold text-[#0F261E]">1. La Phase 0 est absolue</td>
                    <td className="p-3.5 sm:p-4 text-[#0F261E]/80">5 à 7 jours de drainage avant toute plante bactéricide</td>
                    <td className="p-3.5 sm:p-4 text-[#0F261E]/80">Désengorge le foie et les reins pour neutraliser la réaction d'Herxheimer.</td>
                  </tr>
                  <tr className="hover:bg-[#FAF7F2]">
                    <td className="p-3.5 sm:p-4 font-bold text-[#0F261E]">2. Zéro probiotiques en Phase 1</td>
                    <td className="p-3.5 sm:p-4 text-[#0F261E]/80">Suspension totale des gélules de ferments lactiques</td>
                    <td className="p-3.5 sm:p-4 text-[#0F261E]/80">Les probiotiques standards suralimentent la pullulation bactérienne dans le grêle.</td>
                  </tr>
                  <tr className="hover:bg-[#FAF7F2]">
                    <td className="p-3.5 sm:p-4 font-bold text-[#0F261E]">3. Le Binder toujours à l'écart</td>
                    <td className="p-3.5 sm:p-4 text-[#0F261E]/80">Au moins 2h après le dîner et éloigné des médicaments</td>
                    <td className="p-3.5 sm:p-4 text-[#0F261E]/80">L'argile et le charbon sont non sélectifs : ils adsorberaient les principes actifs des plantes.</td>
                  </tr>
                  <tr className="hover:bg-[#FAF7F2]">
                    <td className="p-3.5 sm:p-4 font-bold text-[#0F261E]">4. La fenêtre des 4 heures</td>
                    <td className="p-3.5 sm:p-4 text-[#0F261E]/80">Aucun grignotage entre les repas principaux</td>
                    <td className="p-3.5 sm:p-4 text-[#0F261E]/80">Le complexe moteur migrant a besoin de 90 à 120 minutes de jeûne pour déclencher son onde de balayage.</td>
                  </tr>
                  <tr className="hover:bg-[#FAF7F2]">
                    <td className="p-3.5 sm:p-4 font-bold text-[#0F261E]">5. La mastication complète</td>
                    <td className="p-3.5 sm:p-4 text-[#0F261E]/80">Mâcher 30 fois chaque bouchée</td>
                    <td className="p-3.5 sm:p-4 text-[#0F261E]/80">L'amylase salivaire pré-digère les glucides. Des morceaux mal broyés constituent le festin des bactéries.</td>
                  </tr>
                  <tr className="hover:bg-[#FAF7F2]">
                    <td className="p-3.5 sm:p-4 font-bold text-[#0F261E]">6. Jamais de boissons glacées</td>
                    <td className="p-3.5 sm:p-4 text-[#0F261E]/80">Boire à température ambiante ou infusions chaudes</td>
                    <td className="p-3.5 sm:p-4 text-[#0F261E]/80">Le froid éteint les enzymes gastriques et ralentit la vidange du pylore.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* 7. SECTION 6 : CE QUE VOUS POUVEZ OBSERVER */}
        <section className="scroll-mt-36">
          <div className="bg-white p-8 sm:p-10 rounded-[36px] border border-[#E7DFD3] shadow-xs">
            <div className="text-[10px] font-black uppercase tracking-[0.25em] text-[#D97706] mb-3">
              IV. CALENDRIER D'ÉVOLUTION • REPÈRES
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0F261E] mb-2">
              CE QUE VOUS POUVEZ OBSERVER
            </h2>
            <p className="text-sm sm:text-base text-[#0F261E]/80 max-w-2xl mb-8 font-normal">
              Voici l'itinéraire classique de restauration du terrain au fil des semaines.
            </p>

            <div className="overflow-x-auto rounded-2xl border border-[#E7DFD3] bg-white print-card shadow-xs">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-[#1C3F34] text-white border-b border-[#E7DFD3]">
                  <tr>
                    <th className="p-3.5 sm:p-4 font-bold">Période</th>
                    <th className="p-3.5 sm:p-4 font-bold">Signaux Corporels Notables</th>
                    <th className="p-3.5 sm:p-4 font-bold">Interprétation &amp; Conduite à Tenir</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E7DFD3] text-[#0F261E]">
                  <tr className="hover:bg-[#FAF7F2]">
                    <td className="p-3.5 sm:p-4 font-bold text-[#0F261E]">Semaine 1 (Phase 0)</td>
                    <td className="p-3.5 sm:p-4 text-[#0F261E]/80">Urines plus chargées, légère transpiration nocturne, transit qui s'accélère doucement.</td>
                    <td className="p-3.5 sm:p-4 text-[#0F261E]/80">Les émonctoires s'ouvrent. Boire abondamment des eaux peu minéralisées.</td>
                  </tr>
                  <tr className="hover:bg-[#FAF7F2]">
                    <td className="p-3.5 sm:p-4 font-bold text-[#0F261E]">Semaines 2 à 3 (Début Phase 1)</td>
                    <td className="p-3.5 sm:p-4 text-[#0F261E]/80">Possibles légères céphalées les premiers jours, puis diminution marquée des gaz de fin de journée.</td>
                    <td className="p-3.5 sm:p-4 text-[#0F261E]/80">Lyse bactérienne en cours. Le charbon du coucher doit être pris fidèlement.</td>
                  </tr>
                  <tr className="hover:bg-[#FAF7F2]">
                    <td className="p-3.5 sm:p-4 font-bold text-[#0F261E]">Semaines 4 à 6 (Fin Phase 1)</td>
                    <td className="p-3.5 sm:p-4 text-[#0F261E]/80">Ventre plat en fin de repas, énergie matinale retrouvée, disparition du brouillard mental (<em>brain fog</em>).</td>
                    <td className="p-3.5 sm:p-4 text-[#0F261E]/80">La pullulation dans le grêle est neutralisée. Préparation au passage en réparation.</td>
                  </tr>
                  <tr className="hover:bg-[#FAF7F2]">
                    <td className="p-3.5 sm:p-4 font-bold text-[#0F261E]">Semaines 7 à 10 (Phase 2)</td>
                    <td className="p-3.5 sm:p-4 text-[#0F261E]/80">Selles moulées, disparition des douleurs à la palpation iléale, meilleure tolérance alimentaire.</td>
                    <td className="p-3.5 sm:p-4 text-[#0F261E]/80">L'épithélium intestinal cicatrise et réinstalle sa barrière imperméable.</td>
                  </tr>
                  <tr className="hover:bg-[#FAF7F2]">
                    <td className="p-3.5 sm:p-4 font-bold text-[#0F261E]">Semaines 11+ (Phase 3)</td>
                    <td className="p-3.5 sm:p-4 text-[#0F261E]/80">Digestion silencieuse et fluide, vitalité stable, sérénité digestive complète.</td>
                    <td className="p-3.5 sm:p-4 text-[#0F261E]/80">Le terrain est stabilisé. Maintenir les prérequis d'hygiène vitale.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* 8. SECTION 7 : CE QUE CE PROTOCOLE NE PEUT PAS FAIRE */}
        <section className="scroll-mt-36">
          <div className="bg-white p-8 sm:p-10 rounded-[36px] border border-[#E7DFD3] shadow-xs">
            <div className="text-[10px] font-black uppercase tracking-[0.25em] text-[#D97706] mb-3">
              V. CADRE DE RESPONSABILITÉ DÉONTOLOGIQUE
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0F261E] mb-2">
              CE QUE CE PROTOCOLE NE PEUT PAS FAIRE
            </h2>
            <p className="text-sm sm:text-base text-[#0F261E]/80 max-w-2xl mb-8 font-normal">
              La crédibilité de la phytothérapie de précision repose sur une transparence absolue quant à ses capacités et à ses frontières.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Bloom Peut */}
              <div className="p-6 sm:p-8 rounded-2xl bg-[#ECFDF5] border border-emerald-300 text-emerald-900 shadow-xs">
                <h3 className="text-lg font-black text-emerald-900 mb-4 flex items-center gap-2">
                  <Check className="w-5 h-5 text-emerald-600" />
                  Bloom Peut
                </h3>
                <ul className="space-y-3 text-xs sm:text-sm text-emerald-950 font-normal">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-700 font-bold">✓</span>
                    <span>Réduire la pullulation bactérienne de l'intestin grêle via des extraits botaniques standardisés à haute biodisponibilité.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-700 font-bold">✓</span>
                    <span>Stimuler le Complexe Moteur Migrant par modulation vagale et principes prokinétiques naturels.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-700 font-bold">✓</span>
                    <span>Restaurer les jonctions serrées de la muqueuse intestinale pour stopper l'hyperperméabilité et l'inflammation de bas grade.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-700 font-bold">✓</span>
                    <span>Désengorger les filtres hépatique et rénal pour prévenir l'auto-intoxication toxinique.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-700 font-bold">✓</span>
                    <span>Accompagner le retour à une autonomie digestive sereine et pérenne.</span>
                  </li>
                </ul>
              </div>

              {/* Bloom Ne Peut Pas */}
              <div className="p-6 sm:p-8 rounded-2xl bg-[#FEF2F2] border border-rose-300 text-rose-900 shadow-xs">
                <h3 className="text-lg font-black text-rose-900 mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-rose-600" />
                  Bloom Ne Peut Pas
                </h3>
                <ul className="space-y-3 text-xs sm:text-sm text-rose-950 font-normal">
                  <li className="flex items-start gap-2">
                    <span className="text-rose-700 font-bold">✕</span>
                    <span>Remplacer une antibiothérapie ciblée si prescrite par votre médecin gastro-entérologue en phase aiguë.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-700 font-bold">✕</span>
                    <span>Corriger une anomalie mécanique structurelle (adhérences post-chirurgicales, diverticules grêles, sténoses).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-700 font-bold">✕</span>
                    <span>Poser un diagnostic médical officiel (seul le test respiratoire au glucose/lactulose prescrit par un médecin le peut).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-700 font-bold">✕</span>
                    <span>Se substituer aux examens médicaux réguliers requis pour votre situation de santé.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 9. SECTION 8 : CARNET DE BORD DU SIBO */}
        <section className="scroll-mt-36">
          <div className="p-8 sm:p-10 rounded-[36px] bg-white border border-[#E7DFD3] shadow-xs print-card">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div>
                <div className="text-[10px] font-black uppercase tracking-[0.25em] text-[#D97706] mb-2">
                  VI. SUIVI D'ÉVOLUTION • MESURE
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-[#0F261E]">
                  VOTRE CARNET DE BORD QUOTIDIEN
                </h2>
              </div>
              <button
                onClick={handlePrint}
                className="px-4 py-2.5 rounded-xl bg-[#0F261E] hover:bg-[#D97706] text-white font-bold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-sm no-print"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Télécharger le Carnet PDF</span>
              </button>
            </div>

            <p className="text-sm sm:text-base text-[#0F261E]/80 leading-relaxed mb-6 font-normal">
              Chaque soir, notez ces 5 marqueurs fondamentaux pour mesurer la trajectoire de votre Reset Homéostasique :
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 mb-6">
              <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E7DFD3] text-center">
                <div className="w-7 h-7 rounded-full bg-[#1C3F34] text-[#D97706] text-xs font-black flex items-center justify-center mx-auto mb-2">1</div>
                <div className="font-bold text-xs text-[#0F261E] mb-1">Sommeil</div>
                <div className="text-[11px] text-[#0F261E]/70 font-normal">Heures, réveils, récupération</div>
              </div>
              <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E7DFD3] text-center">
                <div className="w-7 h-7 rounded-full bg-[#1C3F34] text-[#D97706] text-xs font-black flex items-center justify-center mx-auto mb-2">2</div>
                <div className="font-bold text-xs text-[#0F261E] mb-1">Transit</div>
                <div className="text-[11px] text-[#0F261E]/70 font-normal">Échelle de Bristol, fréquence</div>
              </div>
              <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E7DFD3] text-center">
                <div className="w-7 h-7 rounded-full bg-[#1C3F34] text-[#D97706] text-xs font-black flex items-center justify-center mx-auto mb-2">3</div>
                <div className="font-bold text-xs text-[#0F261E] mb-1">Ballonnements</div>
                <div className="text-[11px] text-[#0F261E]/70 font-normal">Intensité (0-10) et moment</div>
              </div>
              <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E7DFD3] text-center">
                <div className="w-7 h-7 rounded-full bg-[#1C3F34] text-[#D97706] text-xs font-black flex items-center justify-center mx-auto mb-2">4</div>
                <div className="font-bold text-xs text-[#0F261E] mb-1">Langue</div>
                <div className="text-[11px] text-[#0F261E]/70 font-normal">Aspect et enduit matinal</div>
              </div>
              <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E7DFD3] text-center">
                <div className="w-7 h-7 rounded-full bg-[#1C3F34] text-[#D97706] text-xs font-black flex items-center justify-center mx-auto mb-2">5</div>
                <div className="font-bold text-xs text-[#0F261E] mb-1">Vitalité</div>
                <div className="text-[11px] text-[#0F261E]/70 font-normal">Clarté mentale, énergie</div>
              </div>
            </div>
          </div>
        </section>

        {/* 11. SECTION 10 : CONCLUSION & SIGNATURE BLOOM */}
        <section className="text-center py-12">
          <blockquote className="font-serif text-2xl sm:text-3xl text-[#0F261E] leading-snug mb-6 italic">
            "Votre corps n'est pas cassé. <span className="text-[#D97706] font-bold">Il est verrouillé.</span><br />
            Bloom ne guérit pas. Bloom rouvre la porte."
          </blockquote>
          
          <p className="text-sm sm:text-base text-[#0F261E]/80 leading-relaxed mb-8 max-w-2xl mx-auto font-normal">
            Ce protocole n'est pas une promesse magique : c'est une méthode d'ingénierie biologique respectueuse de la physiologie vivante. En restituant à l'organisme les solvants nobles, la thermorégulation juste et les séquences actives indispensables, vous lui offrez la clarté nécessaire pour réinitialiser sa propre homéostasie.
          </p>

          <div className="text-lg font-black tracking-wider text-[#0F261E]">
            Bloom by BotaniK
            <span className="block text-xs tracking-widest text-[#D97706] font-bold uppercase mt-1">
              L'Ingénierie au Service du Vivant
            </span>
          </div>
        </section>

        {/* 12. SECTION 11 : APPEL À L'ACTION (CTA) VERS LA BOUTIQUE */}
        <section className="no-print">
          <div className="p-8 sm:p-12 rounded-[36px] bg-gradient-to-br from-[#1C3F34] to-[#0F261E] text-white text-center shadow-lg border border-white/10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D97706]/20 text-[#D97706] text-xs font-bold uppercase tracking-wider mb-4 border border-[#D97706]/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Équipement Recommandé</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-3">
              Pour appliquer ce protocole, découvrez la BloomLab®
            </h2>
            <p className="text-sm sm:text-base text-white/80 max-w-xl mx-auto mb-8 leading-relaxed font-normal">
              L'extracteur et infuseur de précision pour extraire les principes actifs antibactériens et procinétiques (gingembre, berberis, origan) à régulation thermique au 0,5°C près sans dégrader les terpènes volatils.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => {
                  if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
                    (window as any).gtag('event', 'clic_vers_boutique', {
                      product: 'bloomlab',
                      origin: 'protocole_sibo'
                    });
                  }
                  onNavigate('product-detail', 'bloomlab');
                }}
                className="px-8 py-4 rounded-2xl bg-[#D97706] hover:bg-[#B45309] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg flex items-center gap-2 cursor-pointer"
              >
                <span>Découvrir la BloomLab® — 239 €</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('phytotherapie-reset')}
                className="px-6 py-4 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
              >
                <span>Tous les Protocoles</span>
              </button>
            </div>
          </div>
        </section>

        </main>
      </article>
    </GlossaryProvider>
  );
}
