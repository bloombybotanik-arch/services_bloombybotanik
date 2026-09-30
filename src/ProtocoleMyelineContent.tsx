import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Activity, 
  Leaf, 
  Moon, 
  Zap, 
  Clock, 
  Check, 
  AlertTriangle, 
  ChevronRight, 
  Share2, 
  Printer, 
  Lock, 
  Unlock, 
  ArrowRight,
  Brain,
  Shield,
  Download
} from 'lucide-react';
import { View } from './types';
import { Language } from './translations';
import { GlossaryProvider } from './context/GlossaryContext';

interface ProtocoleMyelineContentProps {
  isPremium: boolean;
  onNavigate: (view: View, param?: string) => void;
  onRequireAuth: () => void;
  lang: Language;
}

export const MYELINE_MEDICAL_DISCLAIMER = "Ce protocole relève de la phytothérapie intégrale, des neurosciences appliquées et de l'hygiène de vie. Il ne se substitue en aucun cas à un diagnostic médical ni aux prescriptions de votre médecin traitant ou neurologue. Ne jamais interrompre un traitement en cours sans l'avis d'un professionnel de santé.";

export default function ProtocoleMyelineContent({
  isPremium,
  onNavigate,
  onRequireAuth,
  lang
}: ProtocoleMyelineContentProps) {
  const [isUnlocked, setIsUnlocked] = useState<boolean>(() => {
    if (isPremium) return true;
    if (typeof window !== 'undefined') {
      try {
        return localStorage.getItem('bloom_myeline_unlocked') === 'true';
      } catch (_) {
        return false;
      }
    }
    return false;
  });

  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [formError, setFormError] = useState('');

  // Self-assessment tracker markers
  const [scores, setScores] = useState<Record<string, number>>({
    vitesse: 6,
    clarte: 5,
    fluidite: 6,
    memoire: 5,
    endurance: 5
  });

  useEffect(() => {
    if (isPremium) {
      setIsUnlocked(true);
    }
  }, [isPremium]);

  const handleUnlockSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!userEmail || !emailRegex.test(userEmail.trim())) {
      setFormError('Veuillez renseigner une adresse email valide.');
      return;
    }
    if (!userName.trim()) {
      setFormError('Veuillez renseigner votre prénom.');
      return;
    }

    try {
      localStorage.setItem('bloom_myeline_unlocked', 'true');
      localStorage.setItem('bloom_user_email', userEmail.trim());
      localStorage.setItem('bloom_user_name', userName.trim());
    } catch (_) {}

    if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
      (window as any).gtag('event', 'protocol_unlocked', {
        protocol: 'clarte_mentale',
        user_email: userEmail.trim()
      });
    }

    setIsUnlocked(true);
  };

  const handleShare = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      try {
        window.history.pushState(null, '', `#${id}`);
      } catch (_) {}
    }
  };

  return (
    <GlossaryProvider pageKey="protocole-myeline">
      <article 
        className="min-h-screen bg-[#FAF7F2] text-[#0F261E] pb-24 selection:bg-[#D97706]/20 selection:text-[#0F261E]"
        data-bloom-academie="true"
      >
        {/* Print Styles */}
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

        {/* 1. Fil d'Ariane & Barre d'actions */}
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
              <span className="text-[#0F261E] font-bold truncate">Protocole Clarté Mentale</span>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handleShare}
                className="px-3 py-1.5 rounded-xl border border-[#0F261E]/15 text-[#0F261E] hover:bg-[#0F261E]/5 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                title="Partager le protocole"
                aria-label="Partager le protocole"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
                <span className="hidden sm:inline">{copiedLink ? "Copié" : "Partager"}</span>
              </button>
              <button
                onClick={handlePrint}
                className="px-3.5 py-1.5 rounded-xl bg-[#0F261E] hover:bg-[#D97706] text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
                title="Imprimer le protocole ou exporter en PDF"
                aria-label="Imprimer le protocole"
              >
                <Printer className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Imprimer / PDF</span>
              </button>
            </div>
          </div>
        </div>

        {/* 2. Hero Header */}
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
                <span>Protocole Systémique n°3 • Neuro-Longévité &amp; Gaine Myélinique</span>
              </div>

              <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-[#0F261E] tracking-tight leading-[1.1] mb-6">
                PROTOCOLE CLARTÉ MENTALE
              </h1>

              <p className="text-base sm:text-xl text-[#0F261E]/80 max-w-2xl mx-auto font-medium leading-relaxed mb-8">
                Soutien Neuronal, Myéline &amp; Facteurs Neurotrophiques — Recette d'Ingénierie BloomLab®
              </p>

              {/* Metadata tags */}
              <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-bold mb-8">
                <span className="px-3.5 py-1.5 rounded-xl bg-white border border-[#E7DFD3] text-[#0F261E] shadow-xs flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#D97706]" />
                  <span>Durée : 21j ON / 7j OFF</span>
                </span>
                <span className="px-3.5 py-1.5 rounded-xl bg-white border border-[#E7DFD3] text-[#0F261E] shadow-xs flex items-center gap-1.5">
                  <Brain className="w-4 h-4 text-[#1C3F34]" />
                  <span>Cible : Oligodendrocytes &amp; FGF17</span>
                </span>
                <span className="px-3.5 py-1.5 rounded-xl bg-white border border-[#E7DFD3] text-[#0F261E] shadow-xs flex items-center gap-1.5">
                  <Leaf className="w-4 h-4 text-[#1C3F34]" />
                  <span>Volume Total : ~730 ml (Flacons A+B+C)</span>
                </span>
                <span className="px-3.5 py-1.5 rounded-xl bg-white border border-[#E7DFD3] text-[#0F261E] shadow-xs flex items-center gap-1.5">
                  <Shield className="w-4 h-4 text-[#B45309]" />
                  <span>Posologie : 15ml A + 10ml B + 5ml C</span>
                </span>
              </div>

              {/* Quick link to blog article */}
              <div className="inline-flex items-center gap-2 text-xs text-[#0F261E]/70 bg-white px-4 py-2 rounded-full border border-[#E7DFD3] shadow-xs">
                <span>Envie de comprendre la science fondamentale ?</span>
                <button 
                  onClick={() => onNavigate('blog-vieillissement-myeline')}
                  className="text-[#D97706] hover:underline font-bold flex items-center gap-1 cursor-pointer"
                >
                  Lire l'article de fond 2026 <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>

          </div>
        </header>

        {/* 3. Avertissement Médical */}
        <section id="avertissement" className="max-w-4xl mx-auto px-4 sm:px-6 pt-10">
          <div className="p-6 sm:p-7 rounded-3xl bg-[#FEF3C7]/40 border-2 border-[#D97706]/40 text-[#78350F] shadow-sm">
            <div className="flex items-start gap-3.5">
              <AlertTriangle className="w-6 h-6 text-[#D97706] shrink-0 mt-0.5" />
              <div className="space-y-2">
                <h2 className="text-xs font-black uppercase tracking-widest text-[#92400E]">
                  Avertissement Médical Obligatoire
                </h2>
                <p className="text-xs sm:text-sm leading-relaxed text-[#78350F] font-normal">
                  {MYELINE_MEDICAL_DISCLAIMER}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Navigation d'ancres rapide */}
        <nav 
          className="max-w-4xl mx-auto px-4 sm:px-6 pt-8 pb-4 sticky top-[53px] z-20 bg-[#FAF7F2]/90 backdrop-blur-md no-print"
          aria-label="Sommaire du protocole"
        >
          <div className="p-2 rounded-2xl bg-white border border-[#E7DFD3] shadow-xs flex items-center gap-1 overflow-x-auto scrollbar-none text-xs font-bold text-[#0F261E]/70">
            <a 
              href="#informations-generales" 
              onClick={(e) => scrollToSection(e, 'informations-generales')}
              className="px-3 py-1.5 rounded-xl hover:bg-[#FAF7F2] hover:text-[#D97706] whitespace-nowrap transition-colors"
            >
              Vue d'ensemble
            </a>
            <span className="text-[#0F261E]/20">•</span>
            <a 
              href="#prerequis" 
              onClick={(e) => scrollToSection(e, 'prerequis')}
              className="px-3 py-1.5 rounded-xl hover:bg-[#FAF7F2] hover:text-[#D97706] whitespace-nowrap transition-colors"
            >
              4 Prérequis
            </a>
            <span className="text-[#0F261E]/20">•</span>
            <a 
              href="#contre-indications" 
              onClick={(e) => scrollToSection(e, 'contre-indications')}
              className="px-3 py-1.5 rounded-xl hover:bg-[#FAF7F2] hover:text-[#D97706] whitespace-nowrap transition-colors"
            >
              Contre-indications
            </a>
            <span className="text-[#0F261E]/20">•</span>
            <a 
              href="#recette-bloomlab" 
              onClick={(e) => scrollToSection(e, 'recette-bloomlab')}
              className="px-3 py-1.5 rounded-xl hover:bg-[#FAF7F2] hover:text-[#D97706] whitespace-nowrap transition-colors"
            >
              3 Flacons d'Extraction
            </a>
            <span className="text-[#0F261E]/20">•</span>
            <a 
              href="#chronobiologie" 
              onClick={(e) => scrollToSection(e, 'chronobiologie')}
              className="px-3 py-1.5 rounded-xl hover:bg-[#FAF7F2] hover:text-[#D97706] whitespace-nowrap transition-colors"
            >
              Chronobiologie
            </a>
          </div>
        </nav>

        {/* Main Article Content */}
        <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-6 space-y-16">

          {/* SECTION 1 : VUE D'ENSEMBLE DU PROTOCOLE */}
          <section id="informations-generales" className="scroll-mt-36">
            <div className="bg-white p-8 sm:p-10 rounded-[36px] border border-[#E7DFD3] shadow-xs">
              <div className="text-[10px] font-black uppercase tracking-[0.25em] text-[#D97706] mb-3">
                I. CAHIER DES CHARGES THÉRAPEUTIQUE
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-[#0F261E] mb-3">
                Informations Générales
              </h2>
              <p className="text-sm sm:text-base text-[#0F261E]/80 leading-relaxed max-w-3xl mb-8 font-normal">
                Le terme grand public <strong>"Clarté Mentale"</strong> correspond au bénéfice ressenti : vivacité cognitive, mémoire nette et apaisement nerveux. Le terme technique <strong>"Soutien Neuronal &amp; Myéline"</strong> désigne l'action biologique : préservation de l'isolant lipidique des neurones et activation des récepteurs sensibles au FGF17.
              </p>

              <div className="overflow-x-auto rounded-2xl border border-[#E7DFD3] bg-white mb-4 shadow-xs">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead className="bg-[#1C3F34] text-white border-b border-[#E7DFD3]">
                    <tr className="uppercase tracking-wider text-[11px]">
                      <th className="py-3.5 px-4 font-bold">Paramètre</th>
                      <th className="py-3.5 px-4 font-bold">Spécification du Protocole</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E7DFD3] text-[#0F261E]">
                    <tr className="hover:bg-[#FAF7F2]">
                      <td className="py-3.5 px-4 font-bold text-[#0F261E]">Nom du protocole</td>
                      <td className="py-3.5 px-4 text-[#D97706] font-bold">Protocole Clarté Mentale — Soutien Neuronal &amp; Myéline</td>
                    </tr>
                    <tr className="hover:bg-[#FAF7F2]">
                      <td className="py-3.5 px-4 font-bold text-[#0F261E]">Objectif</td>
                      <td className="py-3.5 px-4 text-[#0F261E]/80">Protéger la myéline, soutenir les voies du FGF17, réduire la neuro-inflammation</td>
                    </tr>
                    <tr className="hover:bg-[#FAF7F2]">
                      <td className="py-3.5 px-4 font-bold text-[#0F261E]">Public visé</td>
                      <td className="py-3.5 px-4 text-[#0F261E]/80">Adultes 45+, déclin cognitif léger, fatigue mentale, sensation de brouillard cérébral</td>
                    </tr>
                    <tr className="hover:bg-[#FAF7F2]">
                      <td className="py-3.5 px-4 font-bold text-[#0F261E]">Durée de la cure</td>
                      <td className="py-3.5 px-4 text-[#0F261E]/80">21 jours ON / 7 jours OFF, renouvelable</td>
                    </tr>
                    <tr className="hover:bg-[#FAF7F2]">
                      <td className="py-3.5 px-4 font-bold text-[#0F261E]">Volume total produit</td>
                      <td className="py-3.5 px-4 text-[#0F261E]/80">~730 ml (Sachet A + B + C)</td>
                    </tr>
                    <tr className="hover:bg-[#FAF7F2]">
                      <td className="py-3.5 px-4 font-bold text-[#0F261E]">Volume BloomLab</td>
                      <td className="py-3.5 px-4 text-[#0F261E]/80">Compatible avec cuve 600 ml à 1,2 L</td>
                    </tr>
                    <tr className="hover:bg-[#FAF7F2]">
                      <td className="py-3.5 px-4 font-bold text-[#0F261E]">Posologie</td>
                      <td className="py-3.5 px-4 text-emerald-700 font-bold">15 ml A + 10 ml B + 5 ml C matin et soir</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* SECTION 2 : LES 4 PRÉREQUIS NON NÉGOCIABLES */}
          <section id="prerequis" className="scroll-mt-36">
            <div className="bg-white p-8 sm:p-10 rounded-[36px] border border-[#E7DFD3] shadow-xs">
              <div className="text-[10px] font-black uppercase tracking-[0.25em] text-[#D97706] mb-3">
                II. CONDITIONS FONDATRICES D'ANABOLISME
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-[#0F261E] mb-3">
                Les 4 Prérequis Non Négociables de la Neuro-Régénération
              </h2>
              <p className="text-sm sm:text-base text-[#0F261E]/80 leading-relaxed max-w-3xl mb-8 font-normal">
                Aucun principe actif végétal ne peut forcer la synthèse de myéline si les conditions cellulaires d'anabolisme ne sont pas réunies. Avant toute extraction, ces 4 leviers doivent être activés :
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-2">
                {/* Prereq 1 */}
                <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#E7DFD3] hover:border-[#D97706]/40 transition-all flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-white border border-[#E7DFD3] text-[#D97706] flex items-center justify-center mb-4 shadow-xs">
                      <Moon className="w-5 h-5" />
                    </div>
                    <h3 className="text-base sm:text-lg font-black text-[#0F261E] mb-2">
                      1. Sommeil Profond à Ondes Lentes
                    </h3>
                    <p className="text-xs sm:text-sm text-[#0F261E]/80 leading-relaxed mb-4 font-normal">
                      C'est pendant les phases 3 et 4 du sommeil profond (entre 23h et 3h) que l'expression des gènes myéliniques et la réplication des cellules souches cérébrales culminent.
                    </p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white text-[11px] text-[#D97706] font-bold border-l-2 border-[#D97706] shadow-xs">
                    Chambre à 18°C, obscurité complète, dîner léger 3h avant le coucher.
                  </div>
                </div>

                {/* Prereq 2 */}
                <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#E7DFD3] hover:border-[#D97706]/40 transition-all flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-white border border-[#E7DFD3] text-[#1C3F34] flex items-center justify-center mb-4 shadow-xs">
                      <Clock className="w-5 h-5" />
                    </div>
                    <h3 className="text-base sm:text-lg font-black text-[#0F261E] mb-2">
                      2. Jeûne Intermittent 14h-16h
                    </h3>
                    <p className="text-xs sm:text-sm text-[#0F261E]/80 leading-relaxed mb-4 font-normal">
                      La clairance des débris de myéline oxydée nécessite l'activation de l'autophagie cellulaire. Un jeûne nocturne régulier relance ce nettoyage indispensable.
                    </p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white text-[11px] text-[#D97706] font-bold border-l-2 border-[#D97706] shadow-xs">
                    Dîner à 19h30, première prise liquide à 11h30 (16h de repos digestif).
                  </div>
                </div>

                {/* Prereq 3 */}
                <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#E7DFD3] hover:border-[#D97706]/40 transition-all flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-white border border-[#E7DFD3] text-[#D97706] flex items-center justify-center mb-4 shadow-xs">
                      <Zap className="w-5 h-5" />
                    </div>
                    <h3 className="text-base sm:text-lg font-black text-[#0F261E] mb-2">
                      3. Mouvement &amp; Libération BDNF
                    </h3>
                    <p className="text-xs sm:text-sm text-[#0F261E]/80 leading-relaxed mb-4 font-normal">
                      Le facteur neurotrophique BDNF est sécrété en réponse à la contraction musculaire brève et intense (marche rapide en côte, renforcement musculaire).
                    </p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white text-[11px] text-[#D97706] font-bold border-l-2 border-[#D97706] shadow-xs">
                    30 min de marche vive quotidienne et 2 séances de résistance légère/semaine.
                  </div>
                </div>

                {/* Prereq 4 */}
                <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#E7DFD3] hover:border-[#D97706]/40 transition-all flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-white border border-[#E7DFD3] text-[#1C3F34] flex items-center justify-center mb-4 shadow-xs">
                      <Activity className="w-5 h-5" />
                    </div>
                    <h3 className="text-base sm:text-lg font-black text-[#0F261E] mb-2">
                      4. Oxygénation &amp; Respiration Nasale
                    </h3>
                    <p className="text-xs sm:text-sm text-[#0F261E]/80 leading-relaxed mb-4 font-normal">
                      Les oligodendrocytes consomment une quantité prodigieuse d'oxygène pour synthétiser les lipides complexes. L'apnée et l'hypoxie tissulaire bloquent la remyélinisation.
                    </p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white text-[11px] text-[#D97706] font-bold border-l-2 border-[#D97706] shadow-xs">
                    Respiration exclusivement nasale en journée et 5 min de cohérence cardiaque 2x/jour.
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 3 : CONTRE-INDICATIONS ET PRÉCAUTIONS */}
          <section id="contre-indications" className="scroll-mt-36">
            <div className="bg-white p-8 sm:p-10 rounded-[36px] border border-[#E7DFD3] shadow-xs">
              <div className="text-[10px] font-black uppercase tracking-[0.25em] text-[#D97706] mb-3">
                III. SÉCURITÉ &amp; PHARMACOVIGILANCE
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-[#0F261E] mb-6">
                Contre-indications &amp; Précautions d'Emploi Obligatoires
              </h2>
              
              <div className="p-6 sm:p-7 rounded-2xl bg-[#FEF3C7]/40 border-2 border-[#D97706]/40 text-[#78350F]">
                <ul className="space-y-3 text-xs sm:text-sm text-[#78350F] leading-relaxed">
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#D97706] font-black shrink-0 mt-0.5">•</span>
                    <span><strong>Traitements anticoagulants ou antiagrégants plaquettaires :</strong> En raison de la présence de <em>Ginkgo biloba</em> (action fluidifiante sur la microcirculation), demandez impérativement l'avis de votre cardiologue.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#D97706] font-black shrink-0 mt-0.5">•</span>
                    <span><strong>Grossesse et allaitement :</strong> Protocole déconseillé par mesure de précaution en l'absence de données d'innocuité chez la femme enceinte.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#D97706] font-black shrink-0 mt-0.5">•</span>
                    <span><strong>Épilepsie non stabilisée :</strong> Éviter les stimulants nerveux centraux sans supervision médicale directe.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#D97706] font-black shrink-0 mt-0.5">•</span>
                    <span><strong>Intervention chirurgicale programmée :</strong> Interrompre la prise de Ginkgo au moins 10 jours avant tout acte chirurgical ou dentaire lourd.</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* SECTION 4 : FREEMIUM GATE CARD (SI VERROUILLÉ) */}
          {!isUnlocked ? (
            <section className="scroll-mt-36" id="recette-bloomlab">
              <div className="p-8 sm:p-12 rounded-[36px] bg-white border-2 border-[#D97706]/40 text-center relative overflow-hidden shadow-xs">
                <div className="w-16 h-16 rounded-full bg-[#1C3F34] text-[#D97706] flex items-center justify-center mx-auto mb-6 shadow-sm">
                  <Lock className="w-7 h-7" />
                </div>

                <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#1C3F34] text-white text-[11px] font-black uppercase tracking-[0.2em] mb-4 shadow-xs">
                  Contenu Réservé aux Membres
                </div>

                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0F261E] mb-3">
                  DÉBLOQUEZ LA RECETTE D'EXTRACTION BLOOMLAB®
                </h2>

                <p className="text-sm sm:text-base text-[#0F261E]/80 max-w-xl mx-auto mb-8 font-normal leading-relaxed">
                  Remplissez ce formulaire pour débloquer immédiatement et gratuitement les réglages thermiques précis au 0,5°C près, les ratios Sachet A/B/C, les solvants, la chronobiologie et le suivi des 5 marqueurs.
                </p>

                <form onSubmit={handleUnlockSubmit} className="max-w-md mx-auto space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      placeholder="Votre prénom"
                      className="w-full px-4 py-3 rounded-xl bg-[#FAF7F2] border border-[#E7DFD3] focus:border-[#D97706] focus:outline-none text-sm text-[#0F261E] placeholder-[#0F261E]/40"
                    />
                    <input
                      type="email"
                      required
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      placeholder="Votre email"
                      className="w-full px-4 py-3 rounded-xl bg-[#FAF7F2] border border-[#E7DFD3] focus:border-[#D97706] focus:outline-none text-sm text-[#0F261E] placeholder-[#0F261E]/40"
                    />
                  </div>

                  {formError && (
                    <div className="text-xs text-rose-600 font-bold text-left pt-1">
                      {formError}
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-xl bg-[#D97706] hover:bg-[#B45309] text-white font-bold text-sm tracking-wide transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer mt-4"
                  >
                    <span>Débloquer le Protocole Immédiatement</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <p className="text-[11px] text-[#0F261E]/60 pt-2 font-normal">
                    🔒 Vos données restent strictement confidentielles. Aucun spam. Respect de la vie privée.
                  </p>
                </form>
              </div>
            </section>
          ) : (
            /* CONTENU DÉBLOQUÉ (RECETTE, TABLEAUX, CHRONOBIOLOGIE) */
            <div className="space-y-16 animate-in fade-in duration-700">
              
              {/* Confirmation Banner */}
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 flex flex-col sm:flex-row items-center justify-between gap-4 no-print">
                <div className="flex items-center gap-3 text-sm text-emerald-900 font-medium">
                  <Unlock className="w-5 h-5 shrink-0 text-emerald-600" />
                  <span><strong>Accès complet débloqué :</strong> Protocole Myéline &amp; FGF17 actif en mode haute précision.</span>
                </div>
                <button
                  onClick={handlePrint}
                  className="px-4 py-2 rounded-xl bg-white hover:bg-emerald-100/50 border border-emerald-200 text-xs font-bold text-emerald-900 flex items-center gap-2 transition-colors cursor-pointer shrink-0 shadow-xs"
                >
                  <Download className="w-3.5 h-3.5 text-[#D97706]" />
                  <span>Imprimer / PDF</span>
                </button>
              </div>

              {/* Recette BloomLab 3 Flacons A/B/C */}
              <section id="recette-bloomlab" className="scroll-mt-36">
                <div className="bg-white p-8 sm:p-10 rounded-[36px] border border-[#E7DFD3] shadow-xs">
                  <div className="text-[10px] font-black uppercase tracking-[0.25em] text-[#D97706] mb-3">
                    IV. PARAMÈTRES D'INGÉNIERIE BLOOMLAB®
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-[#0F261E] mb-3">
                    Formulation &amp; Extraction en 3 Flacons
                  </h2>
                  <p className="text-sm sm:text-base text-[#0F261E]/80 leading-relaxed max-w-3xl mb-8 font-normal">
                    La restauration de la conduction nerveuse requiert l'extraction séparée et synergique de 3 familles moléculaires aux propriétés thermodynamiques distinctes :
                  </p>

                  {/* Flacon A Table */}
                  <div className="mb-10 p-6 sm:p-8 rounded-[32px] bg-[#FAF7F2] border border-[#E7DFD3]">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                      <h3 className="text-lg sm:text-xl font-black text-[#0F261E] flex items-center gap-2">
                        <span className="w-7 h-7 rounded-lg bg-[#1C3F34] text-white font-bold text-xs flex items-center justify-center">A</span>
                        Flacon A : Romarin + Épimède + Baicaléine (15 ml)
                      </h3>
                      <span className="text-xs text-[#D97706] font-mono bg-white px-3 py-1 rounded-full border border-[#E7DFD3] font-bold">
                        Eau purifiée • 72,0°C • 35 min • Volume : 250 ml
                      </span>
                    </div>

                    <div className="overflow-x-auto rounded-2xl border border-[#E7DFD3] bg-white shadow-xs">
                      <table className="w-full text-left text-xs sm:text-sm border-collapse">
                        <thead className="bg-[#1C3F34] text-white border-b border-[#E7DFD3]">
                          <tr className="uppercase tracking-wider text-[11px]">
                            <th className="py-3 px-3 font-bold">Plante / Actif</th>
                            <th className="py-3 px-3 font-bold">Partie Utilisée</th>
                            <th className="py-3 px-3 font-bold">Dosage / Consigne</th>
                            <th className="py-3 px-3 font-bold">Substance Active &amp; Rôle</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#E7DFD3] text-[#0F261E]">
                          <tr className="hover:bg-[#FAF7F2]">
                            <td className="py-3 px-3 font-bold text-[#0F261E]">Romarin officinal</td>
                            <td className="py-3 px-3 text-[#0F261E]/80">Feuilles bio séchées</td>
                            <td className="py-3 px-3 text-[#D97706] font-mono font-bold">4,0 g</td>
                            <td className="py-3 px-3 text-[#0F261E]/80">Acide carnosique &amp; carnosol (réactivation des gènes de myéline)</td>
                          </tr>
                          <tr className="hover:bg-[#FAF7F2]">
                            <td className="py-3 px-3 font-bold text-[#0F261E]">Épimède (Epimedium)</td>
                            <td className="py-3 px-3 text-[#0F261E]/80">Parties aériennes titrées</td>
                            <td className="py-3 px-3 text-[#D97706] font-mono font-bold">2,5 g</td>
                            <td className="py-3 px-3 text-[#0F261E]/80">Icariine (stimulation NGF et prolifération des progéniteurs OPC)</td>
                          </tr>
                          <tr className="hover:bg-[#FAF7F2]">
                            <td className="py-3 px-3 font-bold text-[#0F261E]">Scutellaire du Baïkal</td>
                            <td className="py-3 px-3 text-[#0F261E]/80">Racines séchées</td>
                            <td className="py-3 px-3 text-[#D97706] font-mono font-bold">2,0 g</td>
                            <td className="py-3 px-3 text-[#0F261E]/80">Baicaléine (protection mitochondriale et remyélinisation active)</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div className="mt-4 p-4 rounded-xl bg-white border border-[#E7DFD3] text-xs text-[#0F261E]/80">
                      <strong className="text-[#D97706]">Procédure BloomLab Flacon A :</strong> Verser 250 ml d'eau peu minéralisée dans la cuve. Insérer le panier d'extraction contenant le mélange broyé grossièrement. Lancer le cycle 72,0°C pendant 35 min. Filtrer et conditionner en flacon ambré.
                    </div>
                  </div>

                  {/* Flacon B Table */}
                  <div className="mb-10 p-6 sm:p-8 rounded-[32px] bg-[#FAF7F2] border border-[#E7DFD3]">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                      <h3 className="text-lg sm:text-xl font-black text-[#0F261E] flex items-center gap-2">
                        <span className="w-7 h-7 rounded-lg bg-[#1C3F34] text-white font-bold text-xs flex items-center justify-center">B</span>
                        Flacon B : Curcumine + Pipérine + Huile d'Onagre (10 ml)
                      </h3>
                      <span className="text-xs text-[#1C3F34] font-mono bg-white px-3 py-1 rounded-full border border-[#E7DFD3] font-bold">
                        Bain lipidique • 58,0°C • 45 min • Volume : 250 ml
                      </span>
                    </div>

                    <div className="overflow-x-auto rounded-2xl border border-[#E7DFD3] bg-white shadow-xs">
                      <table className="w-full text-left text-xs sm:text-sm border-collapse">
                        <thead className="bg-[#1C3F34] text-white border-b border-[#E7DFD3]">
                          <tr className="uppercase tracking-wider text-[11px]">
                            <th className="py-3 px-3 font-bold">Composant</th>
                            <th className="py-3 px-3 font-bold">Spécification</th>
                            <th className="py-3 px-3 font-bold">Quantité</th>
                            <th className="py-3 px-3 font-bold">Action Myélinique Clé</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#E7DFD3] text-[#0F261E]">
                          <tr className="hover:bg-[#FAF7F2]">
                            <td className="py-3 px-3 font-bold text-[#0F261E]">Curcuma longa (Curcumine)</td>
                            <td className="py-3 px-3 text-[#0F261E]/80">Extrait sec concentré</td>
                            <td className="py-3 px-3 text-[#1C3F34] font-mono font-bold">1 200 mg</td>
                            <td className="py-3 px-3 text-[#0F261E]/80">Inhibition de NF-κB cérébral, facilitation de la myélogenèse</td>
                          </tr>
                          <tr className="hover:bg-[#FAF7F2]">
                            <td className="py-3 px-3 font-bold text-[#0F261E]">Piper nigrum (Pipérine)</td>
                            <td className="py-3 px-3 text-[#0F261E]/80">Extrait de poivre noir</td>
                            <td className="py-3 px-3 text-[#1C3F34] font-mono font-bold">15 mg</td>
                            <td className="py-3 px-3 text-[#0F261E]/80">Multiplie la biodisponibilité de la curcumine par 20</td>
                          </tr>
                          <tr className="hover:bg-[#FAF7F2]">
                            <td className="py-3 px-3 font-bold text-[#0F261E]">Huile vierge d'onagre</td>
                            <td className="py-3 px-3 text-[#0F261E]/80">1ère pression à froid</td>
                            <td className="py-3 px-3 text-[#1C3F34] font-mono font-bold">230 ml</td>
                            <td className="py-3 px-3 text-[#0F261E]/80">Substrat lipidique riche en acides gras oméga-6 essentiels (GLA)</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div className="mt-4 p-4 rounded-xl bg-white border border-[#E7DFD3] text-xs text-[#0F261E]/80">
                      <strong className="text-[#1C3F34]">Procédure BloomLab Flacon B :</strong> Verser l'huile d'onagre dans la cuve. Dissoudre la curcumine et la pipérine. Lancer le cycle d'infusion à 58,0°C pendant 45 min avec vortex cinétique lent pour émulsionner sans dégrader.
                    </div>
                  </div>

                  {/* Flacon C Table */}
                  <div className="p-6 sm:p-8 rounded-[32px] bg-[#FAF7F2] border border-[#E7DFD3]">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                      <h3 className="text-lg sm:text-xl font-black text-[#0F261E] flex items-center gap-2">
                        <span className="w-7 h-7 rounded-lg bg-[#1C3F34] text-white font-bold text-xs flex items-center justify-center">C</span>
                        Flacon C : Quercétine + Oméga-3 (5 ml)
                      </h3>
                      <span className="text-xs text-[#0F261E] font-mono bg-white px-3 py-1 rounded-full border border-[#E7DFD3] font-bold">
                        Émulsion douce • 48,0°C • 25 min • Volume : 230 ml
                      </span>
                    </div>

                    <div className="overflow-x-auto rounded-2xl border border-[#E7DFD3] bg-white shadow-xs">
                      <table className="w-full text-left text-xs sm:text-sm border-collapse">
                        <thead className="bg-[#1C3F34] text-white border-b border-[#E7DFD3]">
                          <tr className="uppercase tracking-wider text-[11px]">
                            <th className="py-3 px-3 font-bold">Composant</th>
                            <th className="py-3 px-3 font-bold">Spécification</th>
                            <th className="py-3 px-3 font-bold">Quantité</th>
                            <th className="py-3 px-3 font-bold">Action Myélinique Clé</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#E7DFD3] text-[#0F261E]">
                          <tr className="hover:bg-[#FAF7F2]">
                            <td className="py-3 px-3 font-bold text-[#0F261E]">Quercétine anhydre</td>
                            <td className="py-3 px-3 text-[#0F261E]/80">Pureté &gt; 98%</td>
                            <td className="py-3 px-3 text-[#D97706] font-mono font-bold">800 mg</td>
                            <td className="py-3 px-3 text-[#0F261E]/80">Inhibe la mort cellulaire par surcharge de fer (ferroptose) dans la glie</td>
                          </tr>
                          <tr className="hover:bg-[#FAF7F2]">
                            <td className="py-3 px-3 font-bold text-[#0F261E]">Huile de cameline bio / DHA</td>
                            <td className="py-3 px-3 text-[#0F261E]/80">Riche en acide docosahexaénoïque</td>
                            <td className="py-3 px-3 text-[#D97706] font-mono font-bold">220 ml</td>
                            <td className="py-3 px-3 text-[#0F261E]/80">Composant structural majeur des gaines de myéline et fluidité synaptique</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div className="mt-4 p-4 rounded-xl bg-white border border-[#E7DFD3] text-xs text-[#0F261E]/80">
                      <strong className="text-[#0F261E]">Procédure BloomLab Flacon C :</strong> Chauffage très doux à 48,0°C pendant 25 min afin de préserver l'intégrité des liaisons insaturées oméga-3.
                    </div>
                  </div>

                </div>
              </section>

              {/* Chronobiologie des Prises */}
              <section id="chronobiologie" className="scroll-mt-36">
                <div className="bg-white p-8 sm:p-10 rounded-[36px] border border-[#E7DFD3] shadow-xs">
                  <div className="text-[10px] font-black uppercase tracking-[0.25em] text-[#D97706] mb-3">
                    V. RYTHME CIRCADIEN D'ADMINISTRATION
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-[#0F261E] mb-3">
                    Protocole Chronobiologique Quotidien
                  </h2>
                  <p className="text-sm sm:text-base text-[#0F261E]/80 leading-relaxed max-w-3xl mb-8 font-normal">
                    Posologie standard : 15 ml Flacon A + 10 ml Flacon B + 5 ml Flacon C répartis stratégiquement sur la journée :
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E7DFD3]">
                      <div className="text-xs font-bold text-[#D97706] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" /> Matin (Réveil)
                      </div>
                      <h3 className="text-sm sm:text-base font-black text-[#0F261E] mb-2">15 ml Flacon A + 10 ml Flacon B</h3>
                      <p className="text-xs text-[#0F261E]/80 leading-relaxed font-normal">
                        Prendre avec un grand verre d'eau tiède lors du petit-déjeuner pour relancer l'activation neuronale et la clarté matinale.
                      </p>
                    </div>

                    <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E7DFD3]">
                      <div className="text-xs font-bold text-[#1C3F34] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <Activity className="w-3.5 h-3.5" /> Midi
                      </div>
                      <h3 className="text-sm sm:text-base font-black text-[#0F261E] mb-2">Cohérence Cardiaque</h3>
                      <p className="text-xs text-[#0F261E]/80 leading-relaxed font-normal">
                        5 minutes de respiration guidée (6 cycles/minute) avant le déjeuner pour maintenir l'axe vagal protecteur.
                      </p>
                    </div>

                    <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E7DFD3]">
                      <div className="text-xs font-bold text-[#D97706] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" /> Soir (Dîner)
                      </div>
                      <h3 className="text-sm sm:text-base font-black text-[#0F261E] mb-2">15 ml Flacon A + 10 ml Flacon B</h3>
                      <p className="text-xs text-[#0F261E]/80 leading-relaxed font-normal">
                        Au cours du repas du soir pour accompagner l'assimilation lipidique sans perturber la digestion.
                      </p>
                    </div>

                    <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E7DFD3]">
                      <div className="text-xs font-bold text-[#1C3F34] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <Moon className="w-3.5 h-3.5" /> Coucher (22h30)
                      </div>
                      <h3 className="text-sm sm:text-base font-black text-[#0F261E] mb-2">5 ml Flacon C</h3>
                      <p className="text-xs text-[#0F261E]/80 leading-relaxed font-normal">
                        Prise sublinguale ou mélangée à une infusion tiède avant d'éteindre les lumières pour nourrir l'anabolisme nocturne.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Planification sur 12 Semaines */}
              <section id="phases" className="scroll-mt-36">
                <div className="bg-white p-8 sm:p-10 rounded-[36px] border border-[#E7DFD3] shadow-xs">
                  <div className="text-[10px] font-black uppercase tracking-[0.25em] text-[#D97706] mb-3">
                    VI. PROGRESSION THÉRAPEUTIQUE
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-[#0F261E] mb-6">
                    Planification Clinique sur 12 Semaines
                  </h2>
                  <div className="rounded-2xl border border-[#E7DFD3] bg-white overflow-x-auto shadow-xs">
                    <table className="w-full text-left text-xs sm:text-sm border-collapse">
                      <thead className="bg-[#1C3F34] text-white border-b border-[#E7DFD3]">
                        <tr className="uppercase tracking-wider text-[11px]">
                          <th className="py-3.5 px-4 font-bold">Période</th>
                          <th className="py-3.5 px-4 font-bold">Objectif Physiologique</th>
                          <th className="py-3.5 px-4 font-bold">Posologie Ajustée</th>
                          <th className="py-3.5 px-4 font-bold">Signes Cliniques Attendus</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E7DFD3] text-[#0F261E]">
                        <tr className="hover:bg-[#FAF7F2]">
                          <td className="py-3.5 px-4 font-bold text-[#D97706]">
                            Semaines 1 à 3<br/>
                            <span className="text-[11px] text-[#0F261E]/60 font-normal">Phase d'Induction</span>
                          </td>
                          <td className="py-3.5 px-4 text-[#0F261E]/80">Désactivation de la neuro-inflammation et priming des récepteurs</td>
                          <td className="py-3.5 px-4 font-bold text-[#0F261E]">Demi-dose Sachet A (150 ml) + 1 cuillère Sachet B le midi</td>
                          <td className="py-3.5 px-4 text-[#0F261E]/80">Moins de somnolence post-prandiale, sommeil plus profond</td>
                        </tr>
                        <tr className="hover:bg-[#FAF7F2]">
                          <td className="py-3.5 px-4 font-bold text-[#D97706]">
                            Semaines 4 à 8<br/>
                            <span className="text-[11px] text-[#0F261E]/60 font-normal">Phase de Prolifération</span>
                          </td>
                          <td className="py-3.5 px-4 text-[#0F261E]/80">Activation du facteur FGF17 et multiplication des progéniteurs OPC</td>
                          <td className="py-3.5 px-4 font-bold text-[#0F261E]">Pleine dose Sachet A (250 ml) + 2 cuillères Sachet B réparties</td>
                          <td className="py-3.5 px-4 text-[#0F261E]/80">Disparition du brouillard mental, rapidité d'évocation des mots</td>
                        </tr>
                        <tr className="hover:bg-[#FAF7F2]">
                          <td className="py-3.5 px-4 font-bold text-[#D97706]">
                            Semaines 9 à 12<br/>
                            <span className="text-[11px] text-[#0F261E]/60 font-normal">Phase de Consolidation</span>
                          </td>
                          <td className="py-3.5 px-4 text-[#0F261E]/80">Épaississement de la gaine et accélération de la conduction axonale</td>
                          <td className="py-3.5 px-4 font-bold text-[#0F261E]">Rythme de croisière 5 jours sur 7 (2 jours de repos hebdomadaire)</td>
                          <td className="py-3.5 px-4 text-[#0F261E]/80">Endurance cognitive en soirée, clarté mentale stable sans baisse d'énergie</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>

              {/* Carnet de Bord des 5 Marqueurs */}
              <section id="carnet-bord" className="scroll-mt-36">
                <div className="bg-white p-8 sm:p-10 rounded-[36px] border border-[#E7DFD3] shadow-xs">
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
                    <div>
                      <div className="text-[10px] font-black uppercase tracking-[0.25em] text-[#D97706] mb-1">
                        VII. SUIVI QUALITATIF HEBDOMADAIRE
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-black text-[#0F261E]">
                        Carnet de Bord : Évaluez Vos 5 Marqueurs
                      </h2>
                    </div>
                    <button
                      onClick={handlePrint}
                      className="px-4 py-2 rounded-xl bg-white hover:bg-[#FAF7F2] text-xs font-bold text-[#0F261E] border border-[#E7DFD3] flex items-center gap-1.5 cursor-pointer no-print shadow-xs"
                    >
                      <Download className="w-3.5 h-3.5 text-[#D97706]" />
                      <span>Imprimer la Fiche de Suivi</span>
                    </button>
                  </div>

                  <p className="text-sm text-[#0F261E]/80 mb-6 font-normal">
                    Chaque dimanche matin, évaluez votre progression de 1 à 10 pour objectiver la régénération myélinique :
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                      { key: 'vitesse', label: '1. Vitesse de traitement', desc: 'Rapidité à décider et exécuter des tâches complexes sans hésitation.' },
                      { key: 'clarte', label: '2. Clarté mentale', desc: 'Sensation de vivacité dès le lever, absence de sensation cotonneuse.' },
                      { key: 'fluidite', label: '3. Fluidité verbale', desc: 'Capacité à retrouver immédiatement les noms, dates et vocabulaire précis.' },
                      { key: 'memoire', label: '4. Mémoire de travail', desc: 'Facilité à jongler avec plusieurs flux d\'idées sans perdre le fil.' },
                      { key: 'endurance', label: '5. Endurance cognitive', desc: 'Maintenir un travail intellectuel intense à 17h comme à 9h.' }
                    ].map((item) => (
                      <div key={item.key} className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E7DFD3]">
                        <div className="flex justify-between items-center mb-1">
                          <h4 className="font-bold text-[#0F261E] text-xs">{item.label}</h4>
                          <span className="font-mono text-sm font-black text-[#D97706]">{scores[item.key]}/10</span>
                        </div>
                        <p className="text-[11px] text-[#0F261E]/70 mb-3 leading-snug">{item.desc}</p>
                        <input 
                          type="range" 
                          min="1" 
                          max="10" 
                          value={scores[item.key]} 
                          onChange={(e) => setScores({ ...scores, [item.key]: parseInt(e.target.value) })}
                          className="w-full accent-[#D97706] cursor-pointer no-print"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Section FAQ */}
              <section id="faq" className="scroll-mt-36">
                <div className="bg-white p-8 sm:p-10 rounded-[36px] border border-[#E7DFD3] shadow-xs">
                  <div className="text-[10px] font-black uppercase tracking-[0.25em] text-[#D97706] mb-3">
                    VIII. FOIRE AUX QUESTIONS
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-[#0F261E] mb-6">
                    Foire Aux Questions — Clarté Mentale &amp; Myéline
                  </h2>
                  <div className="space-y-4">
                    <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E7DFD3]">
                      <h3 className="text-base text-[#0F261E] font-bold mb-2">
                        Qu'est-ce que la myéline et pourquoi est-elle importante ?
                      </h3>
                      <p className="text-xs sm:text-sm text-[#0F261E]/80 leading-relaxed font-normal">
                        La myéline est une gaine lipidique qui enveloppe les axones des neurones. Elle permet aux signaux nerveux de circuler 100 fois plus vite. Son renouvellement ralentit avec l'âge, ce qui est associé au déclin cognitif.
                      </p>
                    </div>

                    <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E7DFD3]">
                      <h3 className="text-base text-[#0F261E] font-bold mb-2">
                        Quelles plantes protègent la myéline naturellement ?
                      </h3>
                      <p className="text-xs sm:text-sm text-[#0F261E]/80 leading-relaxed font-normal">
                        Le romarin, l'épimède, la baicaléine, la curcumine et la quercétine sont documentés pour protéger la myéline et soutenir les facteurs de croissance neuronale.
                      </p>
                    </div>

                    <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E7DFD3]">
                      <h3 className="text-base text-[#0F261E] font-bold mb-2">
                        Qu'est-ce que le FGF17 ?
                      </h3>
                      <p className="text-xs sm:text-sm text-[#0F261E]/80 leading-relaxed font-normal">
                        Le FGF17 est une protéine de signalisation qui active la prolifération des cellules progénitrices des oligodendrocytes (OPC) et restaure la myéline. Elle décline avec l'âge.
                      </p>
                    </div>

                    <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E7DFD3]">
                      <h3 className="text-base text-[#0F261E] font-bold mb-2">
                        Comment améliorer sa clarté mentale naturellement ?
                      </h3>
                      <p className="text-xs sm:text-sm text-[#0F261E]/80 leading-relaxed font-normal">
                        Un protocole combinant romarin, épimède, baicaléine, curcumine, huile d'onagre et quercétine, associé à une hygiène de vie (sommeil, exercice, cohérence cardiaque), peut soutenir la clarté mentale.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Maillage Interne */}
              <section className="scroll-mt-36 no-print">
                <div className="bg-white p-8 sm:p-10 rounded-[36px] border border-[#E7DFD3] shadow-xs">
                  <div className="text-[10px] font-black uppercase tracking-[0.25em] text-[#D97706] mb-3">
                    IX. EXPLORATION COMPLÉMENTAIRE
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-[#0F261E] mb-6">
                    Poursuivre Votre Démarche Homéostasique
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div 
                      onClick={() => onNavigate('blog-vieillissement-myeline')}
                      className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E7DFD3] hover:border-[#D97706] transition-all cursor-pointer group"
                    >
                      <h4 className="text-sm font-bold text-[#0F261E] group-hover:text-[#D97706] mb-1">
                        Article de Fond 2026
                      </h4>
                      <p className="text-xs text-[#0F261E]/70 mb-3">
                        Comprendre la science de la myéline, du FGF17 et la biologie du vieillissement cérébral.
                      </p>
                      <span className="text-xs text-[#D97706] font-bold flex items-center gap-1">
                        Lire l'article &rarr;
                      </span>
                    </div>

                    <div 
                      onClick={() => onNavigate('protocole-sibo')}
                      className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E7DFD3] hover:border-[#D97706] transition-all cursor-pointer group"
                    >
                      <h4 className="text-sm font-bold text-[#0F261E] group-hover:text-[#D97706] mb-1">
                        Protocole SIBO
                      </h4>
                      <p className="text-xs text-[#0F261E]/70 mb-3">
                        Assainissement doux du grêle, motilité intestinale et barrière muqueuse.
                      </p>
                      <span className="text-xs text-[#D97706] font-bold flex items-center gap-1">
                        Découvrir &rarr;
                      </span>
                    </div>

                    <div 
                      onClick={() => onNavigate('protocole-psoriasis')}
                      className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E7DFD3] hover:border-[#D97706] transition-all cursor-pointer group"
                    >
                      <h4 className="text-sm font-bold text-[#0F261E] group-hover:text-[#D97706] mb-1">
                        Protocole Psoriasis
                      </h4>
                      <p className="text-xs text-[#0F261E]/70 mb-3">
                        14 semaines de drainage émonctoriel, modulation de l'inflammation et régénération.
                      </p>
                      <span className="text-xs text-[#D97706] font-bold flex items-center gap-1">
                        Découvrir &rarr;
                      </span>
                    </div>
                  </div>
                </div>
              </section>

              {/* CTA BOUTIQUE BLOOMLAB */}
              <section className="p-8 sm:p-10 rounded-[32px] bg-[#1C3F34] text-white text-center max-w-4xl mx-auto shadow-xl no-print">
                <div className="font-serif text-xl sm:text-2xl text-[#E7DFD3] mb-3 italic">
                  "Votre corps n'est pas cassé. Il est verrouillé."
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-white mb-3">
                  Pour appliquer ce protocole, découvrez la BloomLab®
                </h3>
                <p className="text-xs sm:text-sm text-white/80 max-w-xl mx-auto mb-6 leading-relaxed">
                  L'extracteur et infuseur de précision pour extraire le Totum végétal, activer le FGF17 et soutenir la myéline avec une stabilité thermique au 0,5°C près sans dégrader les flavones délicates.
                </p>
                <button
                  onClick={() => {
                    if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
                      (window as any).gtag('event', 'clic_vers_boutique', {
                        product: 'bloomlab',
                        origin: 'protocole_clarte_mentale'
                      });
                    }
                    onNavigate('product-detail', 'bloomlab');
                  }}
                  className="px-8 py-4 rounded-2xl bg-[#D97706] hover:bg-[#B45309] text-white font-black text-xs uppercase tracking-wider transition-all shadow-lg hover:shadow-xl cursor-pointer inline-flex items-center gap-2"
                >
                  <span>Découvrir la BloomLab® — 239 €</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </section>

            </div>
          )}

        </main>

        {/* Footer */}
        <footer className="mt-20 border-t border-[#E7DFD3] pt-12 text-center text-xs text-[#0F261E]/60">
          <div className="font-serif text-base text-[#0F261E] mb-2 font-bold">Bloom by BotaniK</div>
          <p className="mb-2">L'ingénierie au service du vivant • Phytothérapie de haute précision</p>
          <p>&copy; 2026 Bloom by BotaniK. Tous droits réservés.</p>
        </footer>

      </article>
    </GlossaryProvider>
  );
}
