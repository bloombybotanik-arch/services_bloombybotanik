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
  FileCheck,
  Eye,
  Heart
} from 'lucide-react';
import { View } from './types';
import { Language } from './translations';
import { TooltipLexique } from './components/TooltipLexique';
import { GlossaryProvider } from './context/GlossaryContext';

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
      <article className="min-h-screen bg-[#0d1117] text-[#f5f0e8] pb-24 selection:bg-[#c9a84c]/20 selection:text-[#f5f0e8]">
        
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
        <div className="border-b border-[#30363d] bg-[#0d1117]/90 backdrop-blur-md sticky top-0 z-30 no-print">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#b8b8b8] overflow-hidden text-ellipsis whitespace-nowrap">
              <button 
                onClick={() => onNavigate('home')} 
                className="hover:text-[#c9a84c] transition-colors cursor-pointer"
              >
                Accueil
              </button>
              <ChevronRight className="w-3.5 h-3.5 text-[#484f58] shrink-0" />
              <button 
                onClick={() => onNavigate('phytotherapie-reset')} 
                className="hover:text-[#c9a84c] transition-colors cursor-pointer"
              >
                Protocoles Systémiques
              </button>
              <ChevronRight className="w-3.5 h-3.5 text-[#484f58] shrink-0" />
              <span className="text-[#c9a84c] truncate">Protocole SIBO</span>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handleShare}
                className="p-2 rounded-lg bg-[#161b22] hover:bg-[#21262d] text-[#b8b8b8] hover:text-[#f5f0e8] border border-[#30363d] transition-colors cursor-pointer"
                title="Partager le protocole"
                aria-label="Partager le protocole"
              >
                {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
              </button>
              <button
                onClick={handlePrint}
                className="p-2 rounded-lg bg-[#161b22] hover:bg-[#21262d] text-[#b8b8b8] hover:text-[#f5f0e8] border border-[#30363d] transition-colors cursor-pointer"
                title="Imprimer le protocole ou exporter en PDF"
                aria-label="Imprimer le protocole"
              >
                <Printer className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* 2. SECTION 1 : EN-TÊTE / HERO */}
        <header className="border-b border-[#30363d] relative overflow-hidden bg-gradient-to-b from-[#161b22]/40 via-transparent to-transparent">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-12 pb-14">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#c9a84c]/10 border border-[#c9a84c]/30 text-[#c9a84c] text-xs font-bold uppercase tracking-wider mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Protocole Systémique n°2 • Intestin & Axe Entéro-Cérébral</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#f5f0e8] font-normal tracking-tight leading-[1.15] mb-6">
              PROTOCOLE SIBO — RESET HOMÉOSTASIQUE
            </h1>

            <p className="text-lg md:text-xl text-[#b8b8b8] leading-relaxed max-w-3xl mb-8">
              Guide pratique et chronobiologique pour accompagner le terrain de la pullulation bactérienne de l'intestin grêle, relancer le complexe moteur migrant et restaurer la motilité sans agresser le microbiote.
            </p>

            {/* Barre de métadonnées */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-[#161b22] border border-[#30363d] text-xs text-[#b8b8b8] mb-8">
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#c9a84c] shrink-0" />
                <div>
                  <div className="text-[10px] uppercase text-[#8b949e]">Durée</div>
                  <div className="font-semibold text-[#f5f0e8]">10 à 14 semaines</div>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <Activity className="w-4 h-4 text-[#c9a84c] shrink-0" />
                <div>
                  <div className="text-[10px] uppercase text-[#8b949e]">Cible Clé</div>
                  <div className="font-semibold text-[#f5f0e8]">Complexe Moteur Migrant</div>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <Leaf className="w-4 h-4 text-[#c9a84c] shrink-0" />
                <div>
                  <div className="text-[10px] uppercase text-[#8b949e]">Méthode</div>
                  <div className="font-semibold text-[#f5f0e8]">Totum Végétal Séquencé</div>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <Shield className="w-4 h-4 text-[#c9a84c] shrink-0" />
                <div>
                  <div className="text-[10px] uppercase text-[#8b949e]">Statut</div>
                  <div className="font-semibold text-emerald-400">Hygiène Vitale Validée</div>
                </div>
              </div>
            </div>

            {/* Avertissement Médical */}
            <div className="p-4 sm:p-5 rounded-r-xl border-l-4 border-[#8b3a3a] bg-[#8b3a3a]/10 border-y border-r border-[#8b3a3a]/30 text-xs sm:text-sm text-[#f5c6c6] leading-relaxed">
              <div className="flex items-center gap-2 font-bold uppercase tracking-wider text-[#ff9b9b] text-xs mb-1.5">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>Avertissement Médical Obligatoire</span>
              </div>
              {SIBO_MEDICAL_DISCLAIMER}
            </div>

          </div>
        </header>

        {/* 3. SECTION 2 : AVANT-PROPOS — LIRE LE SIBO AUTREMENT */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 py-14">
          <div className="p-6 sm:p-10 rounded-2xl bg-[#161b22] border border-[#30363d] relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 left-12 right-12 h-px bg-gradient-to-r from-transparent via-[#c9a84c] to-transparent" />
            
            <h2 className="font-serif text-2xl sm:text-3xl text-[#f5f0e8] mb-4">
              AVANT-PROPOS — LIRE LE SIBO AUTREMENT
            </h2>
            
            <p className="text-base text-[#b8b8b8] leading-relaxed mb-4">
              Le SIBO (<TooltipLexique terme="SIBO" /> ou pullulation bactérienne de l'intestin grêle) n'est pas une fatalité ni une maladie isolée de l'organe intestinal.
            </p>
            <p className="text-base text-[#b8b8b8] leading-relaxed mb-6">
              C'est un <strong>signal</strong> — un cri d'alarme du corps qui indique que la dynamique de circulation, d'écoulement biliaire et de décontamination naturelle est verrouillée. L'intestin grêle, normalement quasi-stérile entre les repas, devient le théâtre d'une fermentation précoce parce que le flux descendant s'est arrêté.
            </p>

            <blockquote className="font-serif text-xl sm:text-2xl text-[#c9a84c] italic border-l-2 border-[#c9a84c] pl-4 sm:pl-6 my-6 py-1 leading-snug">
              "Votre corps ne vous trahit pas. Il vous informe."
            </blockquote>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              <div className="p-4 rounded-xl bg-[#0d1117] border border-[#30363d] hover:border-[#c9a84c]/40 transition-colors">
                <div className="text-xs uppercase font-bold text-[#c9a84c] tracking-wider mb-2">Médecine Chinoise</div>
                <p className="text-xs text-[#b8b8b8] leading-relaxed">
                  Stagnation du Qi du Foie comprimant la Rate, engendrant une accumulation d'Humidité-Chaleur et une rébellion du reflux de l'Estomac.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#0d1117] border border-[#30363d] hover:border-[#c9a84c]/40 transition-colors">
                <div className="text-xs uppercase font-bold text-[#c9a84c] tracking-wider mb-2">Ayurvéda Ancestral</div>
                <p className="text-xs text-[#b8b8b8] leading-relaxed">
                  Affaiblissement du feu digestif (<em>Mandagni</em>), produisant des résidus non métabolisés (<em>Ama</em>) qui obstruent les micro-canaux nourriciers (<em>Srotas</em>).
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#0d1117] border border-[#30363d] hover:border-[#c9a84c]/40 transition-colors">
                <div className="text-xs uppercase font-bold text-[#c9a84c] tracking-wider mb-2">Science Moderne</div>
                <p className="text-xs text-[#b8b8b8] leading-relaxed">
                  Défaillance du <TooltipLexique terme="Complexe Moteur Migrant" />, hypochlorhydrie gastrique ou hypotonie de la valve iléo-cæcale favorisant l'ascension microbienne colique.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 4. SECTION 3 : LES 4 PRÉREQUIS NON NÉGOCIABLES (FREEMIUM) */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
          <div className="mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-600/40 text-emerald-400 text-[11px] font-bold uppercase tracking-wider mb-3">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Accès Libre • Freemium
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#f5f0e8] mb-2">
              LES 4 PRÉREQUIS NON NÉGOCIABLES
            </h2>
            <p className="text-sm sm:text-base text-[#b8b8b8] max-w-2xl">
              Avant d'introduire le moindre extrait de plante, ces quatre piliers doivent être ancrés. Sans eux, aucun principe actif ne peut agir durablement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            
            {/* Prerequis 1 */}
            <div className="p-6 rounded-2xl bg-[#161b22] border border-[#30363d] hover:border-[#484f58] transition-all relative overflow-hidden group">
              <div className="absolute top-4 right-5 font-serif text-4xl text-white/5 font-bold select-none group-hover:text-white/10 transition-colors">01</div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#c9a84c]/10 border border-[#c9a84c]/30 flex items-center justify-center text-[#c9a84c]">
                  <Moon className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-lg text-[#f5f0e8] font-medium">1. Le Sommeil — La condition absolue</h3>
              </div>
              <p className="text-xs sm:text-sm text-[#b8b8b8] leading-relaxed mb-4">
                Le Complexe Moteur Migrant accomplit sa phase d'auto-nettoyage la plus puissante en phase de jeûne nocturne profond.
              </p>
              <ul className="space-y-2 text-xs sm:text-sm text-[#b8b8b8]">
                <li className="flex items-start gap-2">
                  <span className="text-[#c9a84c] font-bold">•</span>
                  <span><strong>7 à 8 heures consécutives :</strong> coucher impératif avant 23h pour respecter le pic de mélatonine.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#c9a84c] font-bold">•</span>
                  <span><strong>Thermorégulation :</strong> chambre fraîche entre 18°C et 19°C.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#c9a84c] font-bold">•</span>
                  <span><strong>Obscurité totale :</strong> zéro veilleuse pour protéger la barrière entérique.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#c9a84c] font-bold">•</span>
                  <span><strong>Zéro écran 1h avant :</strong> la lumière bleue bloque la motilité gastrique.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#c9a84c] font-bold">•</span>
                  <span><strong>Dîner précoce :</strong> aucun aliment solide après 20h.</span>
                </li>
              </ul>
            </div>

            {/* Prerequis 2 */}
            <div className="p-6 rounded-2xl bg-[#161b22] border border-[#30363d] hover:border-[#484f58] transition-all relative overflow-hidden group">
              <div className="absolute top-4 right-5 font-serif text-4xl text-white/5 font-bold select-none group-hover:text-white/10 transition-colors">02</div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#c9a84c]/10 border border-[#c9a84c]/30 flex items-center justify-center text-[#c9a84c]">
                  <Activity className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-lg text-[#f5f0e8] font-medium">2. La Respiration — Le modulateur vagal</h3>
              </div>
              <p className="text-xs sm:text-sm text-[#b8b8b8] leading-relaxed mb-4">
                Le <strong>nerf vague</strong> contrôle directement la vidange gastrique, la motilité du grêle et le tonus de la valve iléo-cæcale.
              </p>
              <ul className="space-y-2 text-xs sm:text-sm text-[#b8b8b8]">
                <li className="flex items-start gap-2">
                  <span className="text-[#c9a84c] font-bold">•</span>
                  <span><strong>Cohérence Cardiaque 365 :</strong> 6 respirations par minute (5s inspiration abdominale, 5s expiration).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#c9a84c] font-bold">•</span>
                  <span><strong>Rythme :</strong> 3 sessions de 5 minutes par jour (matin au réveil, avant le déjeuner, fin d'après-midi).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#c9a84c] font-bold">•</span>
                  <span><strong>Impact direct :</strong> désactive la sidération sympathique et relance les sécrétions enzymatiques.</span>
                </li>
              </ul>
            </div>

            {/* Prerequis 3 */}
            <div className="p-6 rounded-2xl bg-[#161b22] border border-[#30363d] hover:border-[#484f58] transition-all relative overflow-hidden group">
              <div className="absolute top-4 right-5 font-serif text-4xl text-white/5 font-bold select-none group-hover:text-white/10 transition-colors">03</div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#c9a84c]/10 border border-[#c9a84c]/30 flex items-center justify-center text-[#c9a84c]">
                  <Compass className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-lg text-[#f5f0e8] font-medium">3. Le Mouvement — Relancer le péristaltisme</h3>
              </div>
              <p className="text-xs sm:text-sm text-[#b8b8b8] leading-relaxed mb-4">
                La sédentarité fige les anses intestinales et favorise la stase stercorale propice à la colonisation rétrograde.
              </p>
              <ul className="space-y-2 text-xs sm:text-sm text-[#b8b8b8]">
                <li className="flex items-start gap-2">
                  <span className="text-[#c9a84c] font-bold">•</span>
                  <span><strong>Marche postprandiale :</strong> 10 à 15 minutes de marche douce après chaque repas principal.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#c9a84c] font-bold">•</span>
                  <span><strong>Le prokinétique naturel le plus puissant :</strong> stimule mécaniquement les mécanorécepteurs myentériques.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#c9a84c] font-bold">•</span>
                  <span><strong>Pratique quotidienne :</strong> 30 minutes de marche continue ou de yoga doux sans impacts brutaux.</span>
                </li>
              </ul>
            </div>

            {/* Prerequis 4 */}
            <div className="p-6 rounded-2xl bg-[#161b22] border border-[#30363d] hover:border-[#484f58] transition-all relative overflow-hidden group">
              <div className="absolute top-4 right-5 font-serif text-4xl text-white/5 font-bold select-none group-hover:text-white/10 transition-colors">04</div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#c9a84c]/10 border border-[#c9a84c]/30 flex items-center justify-center text-[#c9a84c]">
                  <Sun className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-lg text-[#f5f0e8] font-medium">4. La Lumière — Calibrer l'horloge</h3>
              </div>
              <p className="text-xs sm:text-sm text-[#b8b8b8] leading-relaxed mb-4">
                Le microbiome possède son propre rythme circadien synchronisé sur le noyau suprachiasmatique cérébral.
              </p>
              <ul className="space-y-2 text-xs sm:text-sm text-[#b8b8b8]">
                <li className="flex items-start gap-2">
                  <span className="text-[#c9a84c] font-bold">•</span>
                  <span><strong>Lumière matinale :</strong> exposition aux photons naturels 15 à 20 minutes avant 10h.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#c9a84c] font-bold">•</span>
                  <span><strong>Lumière du soir :</strong> éclairage tamisé ambré dès 20h pour permettre la libération de la mélatonine entérique.</span>
                </li>
              </ul>
            </div>

          </div>
        </section>

        {/* 5. SECTION 4 : PROTOCOLE DÉTAILLÉ EN 4 PHASES (PREMIUM AVEC VERROU) */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12" id="protocole-detaille">
          
          {!isUnlocked ? (
            /* Bloc de verrouillage interactif */
            <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-[#161b22] to-[#11151b] border border-[#c9a84c]/40 text-center relative overflow-hidden shadow-2xl">
              <div className="w-16 h-16 rounded-full bg-[#c9a84c]/10 border border-[#c9a84c] flex items-center justify-center mx-auto mb-6 text-[#c9a84c]">
                <Lock className="w-8 h-8" />
              </div>

              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#c9a84c]/15 border border-[#c9a84c]/30 text-[#c9a84c] text-xs font-bold uppercase tracking-wider mb-4">
                Accès Protocole Avancé
              </span>

              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#f5f0e8] mb-3">
                PROTOCOLE DÉTAILLÉ — CONTENU PREMIUM
              </h2>

              <p className="text-sm sm:text-base text-[#b8b8b8] max-w-xl mx-auto mb-8">
                Inscrivez-vous gratuitement pour débloquer l'accès immédiat à l'intégralité du protocole SIBO : les 4 phases séquentielles, les posologies au milligramme, la chronobiologie d'administration et les règles de sécurité.
              </p>

              <form onSubmit={handleUnlockSubmit} className="max-w-md mx-auto space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    value={prenom}
                    onChange={(e) => setPrenom(e.target.value)}
                    placeholder="Votre prénom"
                    className="w-full px-4 py-3 rounded-xl bg-[#0d1117] border border-[#30363d] focus:border-[#c9a84c] focus:outline-none text-sm text-[#f5f0e8] placeholder-[#8b949e]"
                    required
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Votre email"
                    className="w-full px-4 py-3 rounded-xl bg-[#0d1117] border border-[#30363d] focus:border-[#c9a84c] focus:outline-none text-sm text-[#f5f0e8] placeholder-[#8b949e]"
                    required
                  />
                </div>

                {formError && (
                  <div className="text-xs text-rose-400 text-left pt-1">
                    {formError}
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl bg-[#c9a84c] hover:bg-[#e5c368] text-[#0b0f14] font-bold text-sm transition-all shadow-lg hover:shadow-[#c9a84c]/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Débloquer le Protocole Complet</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <p className="text-[11px] text-[#8b949e] pt-2">
                  🔒 Vos données restent strictement confidentielles. Aucun spam. Respect de la vie privée conforme RGPD.
                </p>
              </form>
            </div>
          ) : (
            /* Contenu Débloqué */
            <div className="space-y-12 animate-in fade-in duration-700">
              
              <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3 text-sm text-emerald-300">
                  <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
                  <span><strong>Protocole complet débloqué :</strong> Accès illimité aux 4 phases séquentielles.</span>
                </div>
                <button
                  onClick={handlePrint}
                  className="px-4 py-2 rounded-lg bg-[#161b22] hover:bg-[#21262d] border border-[#30363d] text-xs font-semibold text-[#f5f0e8] flex items-center gap-2 transition-colors cursor-pointer shrink-0"
                >
                  <Download className="w-3.5 h-3.5 text-[#c9a84c]" />
                  <span>Imprimer / PDF</span>
                </button>
              </div>

              {/* ==================== PHASE 0 ==================== */}
              <article className="p-6 sm:p-10 rounded-3xl bg-[#161b22] border border-[#30363d] print-card">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="px-3 py-1 rounded-full bg-[#c9a84c] text-[#0b0f14] font-extrabold text-xs uppercase tracking-wider">
                    Phase 0
                  </span>
                  <span className="text-xs text-[#c9a84c] font-semibold">
                    Durée obligatoire : 5 à 7 jours
                  </span>
                </div>
                <h3 className="font-serif text-xl sm:text-2xl text-[#f5f0e8] mb-3">
                  PRÉPARATION DES ÉMONCTOIRES & SOUTIEN HÉPATOBILIAIRE
                </h3>
                <p className="text-sm text-[#b8b8b8] leading-relaxed mb-6">
                  <strong>Objectif capital :</strong> Ouvrir les voies d'élimination hépatique, biliaire et rénale avant d'amorcer toute lyse bactérienne. Cette étape élimine le risque d'engorgement toxinique et prévient la violente réaction d'Herxheimer (céphalées, nausées, frissons).
                </p>

                <div className="overflow-x-auto rounded-xl border border-[#30363d] bg-[#0d1117] mb-6">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-[#1c222b] text-[#c9a84c] border-b border-[#30363d]">
                      <tr>
                        <th className="p-3 sm:p-4 font-serif">Moment</th>
                        <th className="p-3 sm:p-4 font-serif">Principe Actif / Plante</th>
                        <th className="p-3 sm:p-4 font-serif">Posologie Recommandée</th>
                        <th className="p-3 sm:p-4 font-serif">Rôle Physiologique</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#30363d] text-[#b8b8b8]">
                      <tr>
                        <td className="p-3 sm:p-4 font-bold text-[#f5f0e8]">Matin (à jeun)</td>
                        <td className="p-3 sm:p-4">Desmodium <em>(Desmodium adscendens)</em> + Citron tiède</td>
                        <td className="p-3 sm:p-4">1 tasse d'infusion concentrée (ou 250 mg extrait sec)</td>
                        <td className="p-3 sm:p-4">Protection des hépatocytes et relance de la bile matinale.</td>
                      </tr>
                      <tr>
                        <td className="p-3 sm:p-4 font-bold text-[#f5f0e8]">Midi (avant repas)</td>
                        <td className="p-3 sm:p-4">Artichaut & Pissenlit <em>(Taraxacum officinale)</em></td>
                        <td className="p-3 sm:p-4">Extrait fluide ou infusion titrée (300 mg)</td>
                        <td className="p-3 sm:p-4">Stimulation cholérétique (sécrétion biliaire décontaminante).</td>
                      </tr>
                      <tr>
                        <td className="p-3 sm:p-4 font-bold text-[#f5f0e8]">Soir (avant repas)</td>
                        <td className="p-3 sm:p-4">Chardon-Marie <em>(Silybum marianum)</em></td>
                        <td className="p-3 sm:p-4">Extrait titré à 80% silymarine (150 mg)</td>
                        <td className="p-3 sm:p-4">Régénération membranaire hépatique face aux endotoxines.</td>
                      </tr>
                      <tr>
                        <td className="p-3 sm:p-4 font-bold text-[#f5f0e8]">Coucher</td>
                        <td className="p-3 sm:p-4">Infusion Romarin à verbénone & Camomille matricaire</td>
                        <td className="p-3 sm:p-4">1 tasse tiède extraite au BloomLab (85°C, 8 min)</td>
                        <td className="p-3 sm:p-4">Spasmolytique biliaire et détente du sphincter d'Oddi.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-[#0d1117] border border-[#30363d]">
                    <h4 className="text-xs uppercase font-bold text-[#c9a84c] mb-2 flex items-center gap-2">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      Précautions & Sécurité
                    </h4>
                    <p className="text-xs text-[#b8b8b8] leading-relaxed">
                      • Ne pas administrer en cas d'obstruction avérée des voies biliaires (calculs vésiculaires enclavés).<br />
                      • Boire 1,5L d'eau peu minéralisée pour drainer le filtre rénal.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-[#0d1117] border border-[#30363d]">
                    <h4 className="text-xs uppercase font-bold text-[#c9a84c] mb-2 flex items-center gap-2">
                      <Leaf className="w-3.5 h-3.5" />
                      Alimentation Associée
                    </h4>
                    <p className="text-xs text-[#b8b8b8] leading-relaxed">
                      • Légumes cuits doux (courgettes épluchées, carottes vapeur, potimarron).<br />
                      • Suppression totale de l'alcool, café serré, fritures et sucres raffinés.
                    </p>
                  </div>
                </div>
              </article>

              {/* ==================== PHASE 1 ==================== */}
              <article className="p-6 sm:p-10 rounded-3xl bg-[#161b22] border border-[#30363d] print-card">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="px-3 py-1 rounded-full bg-[#8b3a3a] text-white font-extrabold text-xs uppercase tracking-wider">
                    Phase 1
                  </span>
                  <span className="text-xs text-[#ff9b9b] font-semibold">
                    Durée : 4 à 6 semaines
                  </span>
                </div>
                <h3 className="font-serif text-xl sm:text-2xl text-[#f5f0e8] mb-3">
                  ÉRADICATION DOUCE & RELANCE PROKINÉTIQUE
                </h3>
                <p className="text-sm text-[#b8b8b8] leading-relaxed mb-6">
                  <strong>Objectif :</strong> Dissoudre les biofilms microbiens, réduire la pullulation dans l'intestin grêle sans ravager la flore colique résidente, et stimuler les ondes péristaltiques du Complexe Moteur Migrant.
                </p>

                <div className="overflow-x-auto rounded-xl border border-[#30363d] bg-[#0d1117] mb-6">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-[#1c222b] text-[#c9a84c] border-b border-[#30363d]">
                      <tr>
                        <th className="p-3 sm:p-4 font-serif">Moment</th>
                        <th className="p-3 sm:p-4 font-serif">Phyto-actifs Précision</th>
                        <th className="p-3 sm:p-4 font-serif">Posologie</th>
                        <th className="p-3 sm:p-4 font-serif">Mode d'Action & Précautions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#30363d] text-[#b8b8b8]">
                      <tr>
                        <td className="p-3 sm:p-4 font-bold text-[#f5f0e8]">Matin (15 min avant)</td>
                        <td className="p-3 sm:p-4">Extrait de Gingembre officinal <em>(Zingiber officinale)</em></td>
                        <td className="p-3 sm:p-4">500 mg extrait titré à 5% gingérols</td>
                        <td className="p-3 sm:p-4">Prokinétique gastrique : active le récepteur sérotoninergique 5-HT4.</td>
                      </tr>
                      <tr>
                        <td className="p-3 sm:p-4 font-bold text-[#f5f0e8]">Midi (au repas)</td>
                        <td className="p-3 sm:p-4">Berbérine HCl + Origan compact (capsules gastrorésistantes)</td>
                        <td className="p-3 sm:p-4">Berbérine 500 mg + 1 capsule Origan encapsulé</td>
                        <td className="p-3 sm:p-4">Antibactérien large spectre et antifongique sans toxicité hépatique directe.</td>
                      </tr>
                      <tr>
                        <td className="p-3 sm:p-4 font-bold text-[#f5f0e8]">Soir (au repas)</td>
                        <td className="p-3 sm:p-4">Extrait de Pépins de Pamplemousse (EPP) + Thym à thymol</td>
                        <td className="p-3 sm:p-4">15 gouttes d'EPP pur ou 1 capsule titrée</td>
                        <td className="p-3 sm:p-4">Dislocation des biofilms bactériens et antifongique de soutien.</td>
                      </tr>
                      <tr>
                        <td className="p-3 sm:p-4 font-bold text-[#f5f0e8]">Coucher (2h après)</td>
                        <td className="p-3 sm:p-4"><strong>Binder :</strong> Charbon Végétal Activé ou Argile Montmorillonite</td>
                        <td className="p-3 sm:p-4">1 cuillère à café dans un grand verre d'eau</td>
                        <td className="p-3 sm:p-4"><strong>Adsorbant :</strong> Capte les endotoxines LPS libérées. <em>À 2h de tout médicament.</em></td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-[#0d1117] border border-[#30363d]">
                    <h4 className="text-xs uppercase font-bold text-[#c9a84c] mb-2 flex items-center gap-2">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      Règles d'or Phase 1
                    </h4>
                    <p className="text-xs text-[#b8b8b8] leading-relaxed">
                      • <strong>Strictement AUCUN probiotique</strong> durant cette phase : ils suralimenteraient la pullulation dans le grêle.<br />
                      • Respecter 2 heures d'écart strict entre le binder et tout traitement médicamenteux.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-[#0d1117] border border-[#30363d]">
                    <h4 className="text-xs uppercase font-bold text-[#c9a84c] mb-2 flex items-center gap-2">
                      <Leaf className="w-3.5 h-3.5" />
                      Alimentation Low-FODMAP
                    </h4>
                    <p className="text-xs text-[#b8b8b8] leading-relaxed">
                      • Réduction transitoire des glucides fermentescibles (oignons, ail cru, pommes, choux, légumineuses).<br />
                      • Maintenir des apports en protéines nobles digestes (poisson blanc, volaille, œufs bio).
                    </p>
                  </div>
                </div>
              </article>

              {/* ==================== PHASE 2 ==================== */}
              <article className="p-6 sm:p-10 rounded-3xl bg-[#161b22] border border-[#30363d] print-card">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="px-3 py-1 rounded-full bg-[#2d5016] text-[#9edc77] font-extrabold text-xs uppercase tracking-wider">
                    Phase 2
                  </span>
                  <span className="text-xs text-[#9edc77] font-semibold">
                    Durée : 4 semaines
                  </span>
                </div>
                <h3 className="font-serif text-xl sm:text-2xl text-[#f5f0e8] mb-3">
                  RESTAURATION DE LA BARRIÈRE & RÉENSEMENCEMENT SPORULÉ
                </h3>
                <p className="text-sm text-[#b8b8b8] leading-relaxed mb-6">
                  <strong>Objectif :</strong> Réparer la muqueuse intestinale lésée par l'inflammation (hyperperméabilité ou <em>leaky gut</em>) et réensemencer prudemment le côlon avec des souches sporulées qui ne fermentent pas dans l'intestin grêle.
                </p>

                <div className="overflow-x-auto rounded-xl border border-[#30363d] bg-[#0d1117] mb-6">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-[#1c222b] text-[#c9a84c] border-b border-[#30363d]">
                      <tr>
                        <th className="p-3 sm:p-4 font-serif">Moment</th>
                        <th className="p-3 sm:p-4 font-serif">Nutriments & Plantes Réparatrices</th>
                        <th className="p-3 sm:p-4 font-serif">Posologie</th>
                        <th className="p-3 sm:p-4 font-serif">Action Cellulaire</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#30363d] text-[#b8b8b8]">
                      <tr>
                        <td className="p-3 sm:p-4 font-bold text-[#f5f0e8]">Matin (à jeun)</td>
                        <td className="p-3 sm:p-4">L-Glutamine pure fermentée végétale</td>
                        <td className="p-3 sm:p-4">3 à 5 g dans un verre d'eau tiède</td>
                        <td className="p-3 sm:p-4">Carburant premier des entérocytes et fermeture des jonctions serrées.</td>
                      </tr>
                      <tr>
                        <td className="p-3 sm:p-4 font-bold text-[#f5f0e8]">Avant déjeuner</td>
                        <td className="p-3 sm:p-4">Gel d'Aloe Vera natif (sans aloïne) + Réglisse DGL</td>
                        <td className="p-3 sm:p-4">30 ml de gel pur + 250 mg extrait DGL</td>
                        <td className="p-3 sm:p-4">Nappage protecteur muqueux et apaisement de l'irritation mécanique.</td>
                      </tr>
                      <tr>
                        <td className="p-3 sm:p-4 font-bold text-[#f5f0e8]">Midi (au repas)</td>
                        <td className="p-3 sm:p-4">Zinc L-Carnosine</td>
                        <td className="p-3 sm:p-4">75 mg (apportant 16 mg de zinc élémentaire)</td>
                        <td className="p-3 sm:p-4">Cicatrisation démontrée de la paroi gastro-duodénale.</td>
                      </tr>
                      <tr>
                        <td className="p-3 sm:p-4 font-bold text-[#f5f0e8]">Dîner (au repas)</td>
                        <td className="p-3 sm:p-4">Probiotiques sporulés <em>(Bacillus coagulans & subtilis)</em></td>
                        <td className="p-3 sm:p-4">2 à 3 milliards d'UFC sporulées</td>
                        <td className="p-3 sm:p-4">Atteignent le côlon intacts sans proliférer dans le duodénum.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-[#0d1117] border border-[#30363d]">
                    <h4 className="text-xs uppercase font-bold text-[#c9a84c] mb-2 flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5" />
                      Pourquoi des Spores ?
                    </h4>
                    <p className="text-xs text-[#b8b8b8] leading-relaxed">
                      Contrairement aux souches classiques qui se dégradent ou fermentent dès le grêle, les spores résistent à l'acide gastrique et germent uniquement dans le côlon distal.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-[#0d1117] border border-[#30363d]">
                    <h4 className="text-xs uppercase font-bold text-[#c9a84c] mb-2 flex items-center gap-2">
                      <Leaf className="w-3.5 h-3.5" />
                      Fibres Douces & Collagène
                    </h4>
                    <p className="text-xs text-[#b8b8b8] leading-relaxed">
                      Réintroduction graduelle de fibres solubles douces (graines de chia trempées, carottes cuites) et bouillons riches en minéraux biodisponibles.
                    </p>
                  </div>
                </div>
              </article>

              {/* ==================== PHASE 3 ==================== */}
              <article className="p-6 sm:p-10 rounded-3xl bg-[#161b22] border border-[#30363d] print-card">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="px-3 py-1 rounded-full bg-[#c9a84c] text-[#0b0f14] font-extrabold text-xs uppercase tracking-wider">
                    Phase 3
                  </span>
                  <span className="text-xs text-[#c9a84c] font-semibold">
                    Stabilisation Durable (3 à 6 mois)
                  </span>
                </div>
                <h3 className="font-serif text-xl sm:text-2xl text-[#f5f0e8] mb-3">
                  STABILISATION, ACIDITÉ GASTRIQUE & PRÉVENTION DES RÉCIDIVES
                </h3>
                <p className="text-sm text-[#b8b8b8] leading-relaxed mb-6">
                  <strong>Objectif :</strong> Pérenniser l'homéostasie, s'assurer que le premier filtre antibactérien naturel (l'acidité gastrique) fonctionne à plein régime, et verrouiller le réflexe du complexe moteur migrant.
                </p>

                <div className="overflow-x-auto rounded-xl border border-[#30363d] bg-[#0d1117]">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-[#1c222b] text-[#c9a84c] border-b border-[#30363d]">
                      <tr>
                        <th className="p-3 sm:p-4 font-serif">Pratique d'Entretien</th>
                        <th className="p-3 sm:p-4 font-serif">Modalité Concrète</th>
                        <th className="p-3 sm:p-4 font-serif">Bénéfice Préventif</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#30363d] text-[#b8b8b8]">
                      <tr>
                        <td className="p-3 sm:p-4 font-bold text-[#f5f0e8]">Amers Botaniques avant repas</td>
                        <td className="p-3 sm:p-4">Gentiane jaune, Artichaut ou 1 c.à.c de vinaigre de cidre bio non pasteurisé</td>
                        <td className="p-3 sm:p-4">Déclenche le réflexe vagal de sécrétion d'acide chlorhydrique et d'enzymes pancréatiques.</td>
                      </tr>
                      <tr>
                        <td className="p-3 sm:p-4 font-bold text-[#f5f0e8]">Infusion d'Entretien BloomLab</td>
                        <td className="p-3 sm:p-4">Gingembre frais + Mauve + Mélisse (90°C, 10 min)</td>
                        <td className="p-3 sm:p-4">Conserve un péristaltisme nocturne fluide sans accoutumance.</td>
                      </tr>
                      <tr>
                        <td className="p-3 sm:p-4 font-bold text-[#f5f0e8]">Jeûne Interprandial</td>
                        <td className="p-3 sm:p-4">4 heures strictes entre chaque prise alimentaire sans grignotage</td>
                        <td className="p-3 sm:p-4">Chaque prise alimentaire interrompt le cycle de nettoyage du CMM. Laisser l'intestin vide permet le balayage.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </article>

            </div>
          )}

        </section>

        {/* 6. SECTION 5 : DÉTECTION — LIRE LES SIGNES DU SIBO (FREEMIUM) */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
          <div className="mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-600/40 text-emerald-400 text-[11px] font-bold uppercase tracking-wider mb-3">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Accès Libre • Freemium
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#f5f0e8] mb-2">
              DÉTECTION — LIRE LES SIGNES DU SIBO
            </h2>
            <p className="text-sm sm:text-base text-[#b8b8b8] max-w-2xl">
              Le corps exprime la dysbiose haute à travers des signatures corporelles précises documentées par les traditions et validées par la clinique.
            </p>
          </div>

          <div className="space-y-6">
            
            {/* 1. Langue */}
            <div className="p-6 rounded-2xl bg-[#161b22] border border-[#30363d] print-card">
              <h3 className="font-serif text-lg text-[#f5f0e8] mb-4 flex items-center gap-2">
                <Eye className="w-4 h-4 text-[#c9a84c]" />
                1. Sur la Langue (Observation au réveil à jeun)
              </h3>
              <div className="overflow-x-auto rounded-xl border border-[#30363d] bg-[#0d1117]">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-[#1c222b] text-[#c9a84c] border-b border-[#30363d]">
                    <tr>
                      <th className="p-3 sm:p-4 font-serif">Observation Visuelle</th>
                      <th className="p-3 sm:p-4 font-serif">Signification Traditionnelle</th>
                      <th className="p-3 sm:p-4 font-serif">Corrélat Clinique SIBO</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#30363d] text-[#b8b8b8]">
                    <tr>
                      <td className="p-3 sm:p-4 font-semibold text-[#f5f0e8]">Enduit blanc épais au centre et à l'arrière</td>
                      <td className="p-3 sm:p-4">Accumulation massive d'Ama (toxines non métabolisées)</td>
                      <td className="p-3 sm:p-4">SIBO à hydrogène prédominant (fermentation active des glucides).</td>
                    </tr>
                    <tr>
                      <td className="p-3 sm:p-4 font-semibold text-[#f5f0e8]">Langue pâle, gonflée avec empreintes de dents</td>
                      <td className="p-3 sm:p-4">Vide de Qi de Rate avec stase d'Humidité (Kapha)</td>
                      <td className="p-3 sm:p-4">SIBO à méthane (ralentissement du transit, tendance à la constipation).</td>
                    </tr>
                    <tr>
                      <td className="p-3 sm:p-4 font-semibold text-[#f5f0e8]">Langue rouge vif, enduit jaune sec au fond</td>
                      <td className="p-3 sm:p-4">Feu gastrique toxique et Chaleur-Humidité (Pitta)</td>
                      <td className="p-3 sm:p-4">Inflammation muqueuse intestinale et pullulation mixte.</td>
                    </tr>
                    <tr>
                      <td className="p-3 sm:p-4 font-semibold text-[#f5f0e8]">Langue fissurée au centre, sans enduit</td>
                      <td className="p-3 sm:p-4">Épuisement du Yin de l'Estomac et sécheresse de Vata</td>
                      <td className="p-3 sm:p-4">Atrophie villositaire débutante et malabsorption chronique.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* 2. Pouls */}
            <div className="p-6 rounded-2xl bg-[#161b22] border border-[#30363d] print-card">
              <h3 className="font-serif text-lg text-[#f5f0e8] mb-4 flex items-center gap-2">
                <Heart className="w-4 h-4 text-[#c9a84c]" />
                2. Sur le Pouls (Évaluation de la vitalité)
              </h3>
              <div className="overflow-x-auto rounded-xl border border-[#30363d] bg-[#0d1117]">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-[#1c222b] text-[#c9a84c] border-b border-[#30363d]">
                    <tr>
                      <th className="p-3 sm:p-4 font-serif">Qualité du Pouls</th>
                      <th className="p-3 sm:p-4 font-serif">Sensibilité Palpatoire</th>
                      <th className="p-3 sm:p-4 font-serif">Écho Métabolique</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#30363d] text-[#b8b8b8]">
                    <tr>
                      <td className="p-3 sm:p-4 font-semibold text-[#f5f0e8]">Pouls Glissant (Hua Mai)</td>
                      <td className="p-3 sm:p-4">Sensation d'une bille roulant sous le doigt à la loge droite</td>
                      <td className="p-3 sm:p-4">Présence de glaires et stase d'eau dans le tube digestif médian.</td>
                    </tr>
                    <tr>
                      <td className="p-3 sm:p-4 font-semibold text-[#f5f0e8]">Pouls en Corde (Xian Mai)</td>
                      <td className="p-3 sm:p-4">Tendu et rigide comme une corde d'instrument</td>
                      <td className="p-3 sm:p-4">Hypertonie sympathique : le stress bloque le nerf vague.</td>
                    </tr>
                    <tr>
                      <td className="p-3 sm:p-4 font-semibold text-[#f5f0e8]">Pouls Faible et Profond (Chen Xu Mai)</td>
                      <td className="p-3 sm:p-4">Imperceptible en surface, nécessite une pression appuyée</td>
                      <td className="p-3 sm:p-4">Déficit enzymatique pancréatique et épuisement de la pompe acide.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* 3. Abdomen & Visage */}
            <div className="p-6 rounded-2xl bg-[#161b22] border border-[#30363d] print-card">
              <h3 className="font-serif text-lg text-[#f5f0e8] mb-4 flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#c9a84c]" />
                3. Sur l'Abdomen et le Visage
              </h3>
              <div className="overflow-x-auto rounded-xl border border-[#30363d] bg-[#0d1117]">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-[#1c222b] text-[#c9a84c] border-b border-[#30363d]">
                    <tr>
                      <th className="p-3 sm:p-4 font-serif">Zone Corporelle</th>
                      <th className="p-3 sm:p-4 font-serif">Signe Clinique Révélateur</th>
                      <th className="p-3 sm:p-4 font-serif">Mécanisme Sous-jacent</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#30363d] text-[#b8b8b8]">
                    <tr>
                      <td className="p-3 sm:p-4 font-semibold text-[#f5f0e8]">Abdomen épigastrique</td>
                      <td className="p-3 sm:p-4">Distension visible 30 à 45 minutes après le repas</td>
                      <td className="p-3 sm:p-4">Gaz précoces produits dans l'intestin grêle (avant d'atteindre le côlon).</td>
                    </tr>
                    <tr>
                      <td className="p-3 sm:p-4 font-semibold text-[#f5f0e8]">Fosse iliaque droite</td>
                      <td className="p-3 sm:p-4">Tension douloureuse au carrefour de la valve iléo-cæcale</td>
                      <td className="p-3 sm:p-4">Spasme ou incompétence valvulaire laissant remonter le microbiote colique.</td>
                    </tr>
                    <tr>
                      <td className="p-3 sm:p-4 font-semibold text-[#f5f0e8]">Cernes sous-orbitaires</td>
                      <td className="p-3 sm:p-4">Cernes sombres bleutés ou violacés permanents</td>
                      <td className="p-3 sm:p-4">Surcharge hépatique due aux endotoxines LPS circulantes.</td>
                    </tr>
                    <tr>
                      <td className="p-3 sm:p-4 font-semibold text-[#f5f0e8]">Peau péribuccale</td>
                      <td className="p-3 sm:p-4">Petits boutons inflammatoires ou rougeurs type rosacée</td>
                      <td className="p-3 sm:p-4">Axe intestin-peau activé par l'hyperperméabilité digestive.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </section>

        {/* 7. SECTION 6 : RÈGLES D'OR DU RESET SIBO */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
          <div className="mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#c9a84c]/10 border border-[#c9a84c]/30 text-[#c9a84c] text-[11px] font-bold uppercase tracking-wider mb-3">
              <FileCheck className="w-3.5 h-3.5" />
              Règles Stratégiques • Précision
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#f5f0e8] mb-2">
              LES RÈGLES D'OR DU RESET SIBO
            </h2>
            <p className="text-sm sm:text-base text-[#b8b8b8] max-w-2xl">
              Le non-respect d'un seul de ces principes peut compromettre l'ensemble du protocole.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-[#30363d] bg-[#161b22] print-card">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-[#1c222b] text-[#c9a84c] border-b border-[#30363d]">
                <tr>
                  <th className="p-3.5 sm:p-4 font-serif">Règle Inviolable</th>
                  <th className="p-3.5 sm:p-4 font-serif">Application Pratique</th>
                  <th className="p-3.5 sm:p-4 font-serif">Raison Biologique</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#30363d] text-[#b8b8b8]">
                <tr>
                  <td className="p-3.5 sm:p-4 font-semibold text-[#f5f0e8]">1. La Phase 0 est absolue</td>
                  <td className="p-3.5 sm:p-4">5 à 7 jours de drainage avant toute plante bactéricide</td>
                  <td className="p-3.5 sm:p-4">Désengorge le foie et les reins pour neutraliser la réaction d'Herxheimer.</td>
                </tr>
                <tr>
                  <td className="p-3.5 sm:p-4 font-semibold text-[#f5f0e8]">2. Zéro probiotiques en Phase 1</td>
                  <td className="p-3.5 sm:p-4">Suspension totale des gélules de ferments lactiques</td>
                  <td className="p-3.5 sm:p-4">Les probiotiques standards suralimentent la pullulation bactérienne dans le grêle.</td>
                </tr>
                <tr>
                  <td className="p-3.5 sm:p-4 font-semibold text-[#f5f0e8]">3. Le Binder toujours à l'écart</td>
                  <td className="p-3.5 sm:p-4">Au moins 2h après le dîner et éloigné des médicaments</td>
                  <td className="p-3.5 sm:p-4">L'argile et le charbon sont non sélectifs : ils adsorberaient les principes actifs des plantes.</td>
                </tr>
                <tr>
                  <td className="p-3.5 sm:p-4 font-semibold text-[#f5f0e8]">4. La fenêtre des 4 heures</td>
                  <td className="p-3.5 sm:p-4">Aucun grignotage entre les repas principaux</td>
                  <td className="p-3.5 sm:p-4">Le complexe moteur migrant a besoin de 90 à 120 minutes de jeûne pour déclencher son onde de balayage.</td>
                </tr>
                <tr>
                  <td className="p-3.5 sm:p-4 font-semibold text-[#f5f0e8]">5. La mastication complète</td>
                  <td className="p-3.5 sm:p-4">Mâcher 30 fois chaque bouchée</td>
                  <td className="p-3.5 sm:p-4">L'amylase salivaire pré-digère les glucides. Des morceaux mal broyés constituent le festin des bactéries.</td>
                </tr>
                <tr>
                  <td className="p-3.5 sm:p-4 font-semibold text-[#f5f0e8]">6. Jamais de boissons glacées</td>
                  <td className="p-3.5 sm:p-4">Boire à température ambiante ou infusions chaudes</td>
                  <td className="p-3.5 sm:p-4">Le froid éteint les enzymes gastriques et ralentit la vidange du pylore.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 8. SECTION 7 : CE QUE VOUS POUVEZ OBSERVER */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
          <div className="mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#c9a84c]/10 border border-[#c9a84c]/30 text-[#c9a84c] text-[11px] font-bold uppercase tracking-wider mb-3">
              <Calendar className="w-3.5 h-3.5" />
              Calendrier d'Évolution • Repères
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#f5f0e8] mb-2">
              CE QUE VOUS POUVEZ OBSERVER
            </h2>
            <p className="text-sm sm:text-base text-[#b8b8b8] max-w-2xl">
              Voici l'itinéraire classique de restauration du terrain au fil des semaines.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-[#30363d] bg-[#161b22] print-card">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-[#1c222b] text-[#c9a84c] border-b border-[#30363d]">
                <tr>
                  <th className="p-3.5 sm:p-4 font-serif">Période</th>
                  <th className="p-3.5 sm:p-4 font-serif">Signaux Corporels Notables</th>
                  <th className="p-3.5 sm:p-4 font-serif">Interprétation & Conduite à Tenir</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#30363d] text-[#b8b8b8]">
                <tr>
                  <td className="p-3.5 sm:p-4 font-semibold text-[#f5f0e8]">Semaine 1 (Phase 0)</td>
                  <td className="p-3.5 sm:p-4">Urines plus chargées, légère transpiration nocturne, transit qui s'accélère doucement.</td>
                  <td className="p-3.5 sm:p-4">Les émonctoires s'ouvrent. Boire abondamment des eaux peu minéralisées.</td>
                </tr>
                <tr>
                  <td className="p-3.5 sm:p-4 font-semibold text-[#f5f0e8]">Semaines 2 à 3 (Début Phase 1)</td>
                  <td className="p-3.5 sm:p-4">Possibles légères céphalées les premiers jours, puis diminution marquée des gaz de fin de journée.</td>
                  <td className="p-3.5 sm:p-4">Lyse bactérienne en cours. Le charbon du coucher doit être pris fidèlement.</td>
                </tr>
                <tr>
                  <td className="p-3.5 sm:p-4 font-semibold text-[#f5f0e8]">Semaines 4 à 6 (Fin Phase 1)</td>
                  <td className="p-3.5 sm:p-4">Ventre plat en fin de repas, énergie matinale retrouvée, disparition du brouillard mental (<em>brain fog</em>).</td>
                  <td className="p-3.5 sm:p-4">La pullulation dans le grêle est neutralisée. Préparation au passage en réparation.</td>
                </tr>
                <tr>
                  <td className="p-3.5 sm:p-4 font-semibold text-[#f5f0e8]">Semaines 7 à 10 (Phase 2)</td>
                  <td className="p-3.5 sm:p-4">Selles moulées, disparition des douleurs à la palpation iléale, meilleure tolérance alimentaire.</td>
                  <td className="p-3.5 sm:p-4">L'épithélium intestinal cicatrise et réinstalle sa barrière imperméable.</td>
                </tr>
                <tr>
                  <td className="p-3.5 sm:p-4 font-semibold text-[#f5f0e8]">Semaines 11+ (Phase 3)</td>
                  <td className="p-3.5 sm:p-4">Digestion silencieuse et fluide, vitalité stable, sérénité digestive complète.</td>
                  <td className="p-3.5 sm:p-4">Le terrain est stabilisé. Maintenir les prérequis d'hygiène vitale.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 9. SECTION 8 : CE QUE CE PROTOCOLE NE PEUT PAS FAIRE (FREEMIUM) */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
          <div className="mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-600/40 text-emerald-400 text-[11px] font-bold uppercase tracking-wider mb-3">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Cadre de Responsabilité • Freemium
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#f5f0e8] mb-2">
              CE QUE CE PROTOCOLE NE PEUT PAS FAIRE
            </h2>
            <p className="text-sm sm:text-base text-[#b8b8b8] max-w-2xl">
              La crédibilité de la phytothérapie de précision repose sur une transparence absolue quant à ses capacités et à ses frontières.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Bloom Peut */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#161b22] border-t-4 border-t-emerald-500 border-x border-b border-[#30363d] print-card">
              <h3 className="font-serif text-xl text-emerald-400 font-semibold mb-4 flex items-center gap-2">
                <Check className="w-5 h-5 text-emerald-400" />
                Bloom Peut
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-[#b8b8b8]">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>Réduire la pullulation bactérienne de l'intestin grêle via des extraits botaniques standardisés à haute biodisponibilité.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>Stimuler le Complexe Moteur Migrant par modulation vagale et principes prokinétiques naturels.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>Restaurer les jonctions serrées de la muqueuse intestinale pour stopper l'hyperperméabilité et l'inflammation de bas grade.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>Désengorger les filtres hépatique et rénal pour prévenir l'auto-intoxication toxinique.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>Accompagner le retour à une autonomie digestive sereine et pérenne.</span>
                </li>
              </ul>
            </div>

            {/* Bloom Ne Peut Pas */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#161b22] border-t-4 border-t-rose-500 border-x border-b border-[#30363d] print-card">
              <h3 className="font-serif text-xl text-rose-400 font-semibold mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-rose-400" />
                Bloom Ne Peut Pas
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-[#b8b8b8]">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">✕</span>
                  <span>Remplacer une antibiothérapie ciblée si prescrite par votre médecin gastro-entérologue en phase aiguë.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">✕</span>
                  <span>Corriger une anomalie mécanique structurelle (adhérences post-chirurgicales, diverticules grêles, sténoses).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">✕</span>
                  <span>Poser un diagnostic médical officiel (seul le test respiratoire au glucose/lactulose prescrit par un médecin le peut).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">✕</span>
                  <span>Se substituer aux examens médicaux réguliers requis pour votre situation de santé.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* 10. SECTION 9 : CARNET DE BORD DU SIBO (PREMIUM) */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
          <div className="p-8 sm:p-10 rounded-3xl bg-[#161b22] border border-[#30363d] print-card">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#c9a84c]/10 border border-[#c9a84c]/30 text-[#c9a84c] text-[11px] font-bold uppercase tracking-wider mb-2">
                  Suivi d'Évolution • Mesure
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-[#f5f0e8]">
                  VOTRE CARNET DE BORD QUOTIDIEN
                </h2>
              </div>
              <button
                onClick={handlePrint}
                className="px-4 py-2.5 rounded-xl bg-[#c9a84c] hover:bg-[#e5c368] text-[#0b0f14] font-bold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-md no-print"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Télécharger le Carnet PDF</span>
              </button>
            </div>

            <p className="text-sm text-[#b8b8b8] leading-relaxed mb-6">
              Chaque soir, notez ces 5 marqueurs fondamentaux pour mesurer la trajectoire de votre Reset Homéostasique :
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 mb-6">
              <div className="p-4 rounded-xl bg-[#0d1117] border border-[#30363d] text-center">
                <div className="w-7 h-7 rounded-full bg-[#c9a84c]/15 text-[#c9a84c] text-xs font-bold flex items-center justify-center mx-auto mb-2">1</div>
                <div className="font-semibold text-xs text-[#f5f0e8] mb-1">Sommeil</div>
                <div className="text-[11px] text-[#8b949e]">Heures, réveils, récupération</div>
              </div>
              <div className="p-4 rounded-xl bg-[#0d1117] border border-[#30363d] text-center">
                <div className="w-7 h-7 rounded-full bg-[#c9a84c]/15 text-[#c9a84c] text-xs font-bold flex items-center justify-center mx-auto mb-2">2</div>
                <div className="font-semibold text-xs text-[#f5f0e8] mb-1">Transit</div>
                <div className="text-[11px] text-[#8b949e]">Échelle de Bristol (1-7), fréquence</div>
              </div>
              <div className="p-4 rounded-xl bg-[#0d1117] border border-[#30363d] text-center">
                <div className="w-7 h-7 rounded-full bg-[#c9a84c]/15 text-[#c9a84c] text-xs font-bold flex items-center justify-center mx-auto mb-2">3</div>
                <div className="font-semibold text-xs text-[#f5f0e8] mb-1">Ballonnements</div>
                <div className="text-[11px] text-[#8b949e]">Intensité (0-10) et moment</div>
              </div>
              <div className="p-4 rounded-xl bg-[#0d1117] border border-[#30363d] text-center">
                <div className="w-7 h-7 rounded-full bg-[#c9a84c]/15 text-[#c9a84c] text-xs font-bold flex items-center justify-center mx-auto mb-2">4</div>
                <div className="font-semibold text-xs text-[#f5f0e8] mb-1">Langue</div>
                <div className="text-[11px] text-[#8b949e]">Aspect et enduit matinal</div>
              </div>
              <div className="p-4 rounded-xl bg-[#0d1117] border border-[#30363d] text-center">
                <div className="w-7 h-7 rounded-full bg-[#c9a84c]/15 text-[#c9a84c] text-xs font-bold flex items-center justify-center mx-auto mb-2">5</div>
                <div className="font-semibold text-xs text-[#f5f0e8] mb-1">Vitalité</div>
                <div className="text-[11px] text-[#8b949e]">Clarté mentale, énergie</div>
              </div>
            </div>
          </div>
        </section>

        {/* 11. SECTION 10 : CONCLUSION & SIGNATURE BLOOM */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 py-16 text-center">
          <blockquote className="font-serif text-2xl sm:text-3xl text-[#f5f0e8] leading-snug mb-6">
            "Votre corps n'est pas cassé. <span className="text-[#c9a84c]">Il est verrouillé.</span><br />
            Bloom ne guérit pas. Bloom rouvre la porte."
          </blockquote>
          
          <p className="text-sm sm:text-base text-[#b8b8b8] leading-relaxed mb-8">
            Ce protocole n'est pas une promesse magique : c'est une méthode d'ingénierie biologique respectueuse de la physiologie vivante. En restituant à l'organisme les solvants nobles, la thermorégulation juste et les séquences actives indispensables, vous lui offrez la clarté nécessaire pour réinitialiser sa propre homéostasie.
          </p>

          <div className="font-serif text-lg tracking-wider text-[#c9a84c]">
            Bloom by BotaniK
            <span className="block font-sans text-xs tracking-widest text-[#8b949e] uppercase mt-1">
              L'Ingénierie au Service du Vivant
            </span>
          </div>
        </section>

        {/* 12. SECTION 11 : APPEL À L'ACTION (CTA) */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 py-8 no-print">
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-[#161b22] to-[#0d1117] border border-[#30363d] text-center relative overflow-hidden">
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#f5f0e8] mb-3">
              Prêt à maîtriser votre extraction botanique ?
            </h2>
            <p className="text-sm sm:text-base text-[#b8b8b8] max-w-xl mx-auto mb-8">
              L'ingénierie au service du Totum végétal. Extrayez les principes actifs des plantes médicinales avec une précision thermique de ±0,5°C sans détruire les molécules thermosensibles.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => onNavigate('machine')}
                className="px-6 py-3.5 rounded-xl bg-[#c9a84c] hover:bg-[#e5c368] text-[#0b0f14] font-bold text-sm transition-all shadow-lg hover:shadow-[#c9a84c]/20 flex items-center gap-2 cursor-pointer"
              >
                <span>Découvrir l'Extracteur BloomLab®</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('phytotherapie-reset')}
                className="px-6 py-3.5 rounded-xl bg-transparent hover:bg-[#161b22] border border-[#484f58] hover:border-[#c9a84c] text-[#f5f0e8] font-semibold text-sm transition-all cursor-pointer"
              >
                <span>Tous les Protocoles Systémiques</span>
              </button>

              <button
                onClick={() => onNavigate('protocole-psoriasis')}
                className="px-6 py-3.5 rounded-xl bg-transparent hover:bg-[#161b22] border border-[#484f58] hover:border-[#c9a84c] text-[#f5f0e8] font-semibold text-sm transition-all cursor-pointer"
              >
                <span>Protocole Psoriasis</span>
              </button>
            </div>
          </div>
        </section>

      </article>
    </GlossaryProvider>
  );
}
