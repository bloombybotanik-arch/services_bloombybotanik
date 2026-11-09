import React, { useState, useRef, useEffect } from 'react';
import { 
  Droplets, 
  Zap, 
  ShieldCheck, 
  Activity, 
  Target, 
  Waves, 
  Wind, 
  Flame, 
  Moon, 
  ChevronRight, 
  ChevronLeft, 
  Info, 
  X, 
  Sparkles, 
  Download, 
  CheckCircle2, 
  HelpCircle,
  ArrowRight,
  Compass,
  Lock,
  KeyRound,
  ShieldAlert
} from 'lucide-react';
import { Language } from '../translations';

// SHA-256 helper for client-side hash verification
async function computeSha256(text: string): Promise<string> {
  if (typeof crypto !== 'undefined' && crypto.subtle) {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hash = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(hash))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  }
  return text;
}

// Target hash for code "12345": sha256("12345") = 5994471abb01112afcc18159f6cc74b4f511b99806da59b3caf5a9c173cacfc5
const ADMIN_EMAIL_TARGET = 'bloombybotanik@gmail.com';
const ADMIN_HASH_TARGET = '5994471abb01112afcc18159f6cc74b4f511b99806da59b3caf5a9c173cacfc5';
const ADMIN_PLAIN_CODE = '12345';

export interface TerrainItem {
  code: string;
  number: number;
  label: Record<Language, string>;
  focusOrgan: Record<Language, string>;
  signals: Record<Language, string>;
  lockReason: Record<Language, string>;
  keyPlants: string[];
  recipeCount: number;
  colorTheme: {
    bg: string;
    border: string;
    badge: string;
    text: string;
    lightBg: string;
    gradient: string;
    ring: string;
  };
  icon: React.ComponentType<{ className?: string }>;
}

export const TERRAINS_DATA: TerrainItem[] = [
  {
    code: 'T1',
    number: 1,
    label: {
      fr: 'Microbiome & Digestion',
      en: 'Microbiome & Digestion',
      de: 'Mikrobiom & Verdauung'
    },
    focusOrgan: {
      fr: 'Intestin grêle • Colon • Écosystème entérique',
      en: 'Small intestine • Colon • Enteric ecosystem',
      de: 'Dünndarm • Dickdarm • Enterisches Ökosystem'
    },
    signals: {
      fr: 'Lourdeurs post-prandiales, ballonnements fréquents, transit capricieux, sensibilité digestive.',
      en: 'Post-meal heaviness, bloating, irregular transit, digestive sensitivity.',
      de: 'Schweregefühl nach Mahlzeiten, Blähungen, unregelmäßiger Transit.'
    },
    lockReason: {
      fr: 'Altération de la barrière mucosale et perte de diversité microbiotique.',
      en: 'Mucosal barrier wear and microbial diversity loss.',
      de: 'Störung der Darmschleimhaut und Verlust der mikrobiellen Vielfalt.'
    },
    keyPlants: ['Hericium', 'Artichaut', 'Mauve', 'Curcuma', 'Fenouil'],
    recipeCount: 34,
    colorTheme: {
      bg: 'bg-emerald-900',
      border: 'border-emerald-500/30',
      badge: 'bg-emerald-600 text-white',
      text: 'text-emerald-800',
      lightBg: 'bg-emerald-50/80',
      gradient: 'from-emerald-500 to-teal-700',
      ring: 'ring-emerald-500'
    },
    icon: Droplets
  },
  {
    code: 'T2',
    number: 2,
    label: {
      fr: 'Énergie & Vitalité Cellulaire',
      en: 'Cellular Energy & Vitality',
      de: 'Zellenergie & Vitalität'
    },
    focusOrgan: {
      fr: 'Mitochondries • Axe surrénalien • Métabolisme ATP',
      en: 'Mitochondria • Adrenal axis • ATP metabolism',
      de: 'Mitochondrien • Nebennierenachse • ATP-Synthese'
    },
    signals: {
      fr: 'Coup de pompe en milieu d\'après-midi, réveil laborieux, récupération physique lente.',
      en: 'Afternoon energy slump, sluggish morning wake-up, slow physical recovery.',
      de: 'Nachmittagstief, mühsames Aufwachen, verlangsamte Erholung.'
    },
    lockReason: {
      fr: 'Oxydation mitochondriale et insuffisance d\'oxygénation intracellulaire.',
      en: 'Mitochondrial oxidation and suboptimal cellular oxygenation.',
      de: 'Mitochondriale Oxidation und Sauerstoffdefizit der Zellen.'
    },
    keyPlants: ['Cordyceps', 'Gentiane Jaune', 'Rhodiola', 'Ginseng', 'Éleuthérocoque'],
    recipeCount: 33,
    colorTheme: {
      bg: 'bg-amber-900',
      border: 'border-amber-500/30',
      badge: 'bg-amber-600 text-white',
      text: 'text-amber-800',
      lightBg: 'bg-amber-50/80',
      gradient: 'from-amber-500 to-yellow-600',
      ring: 'ring-amber-500'
    },
    icon: Zap
  },
  {
    code: 'T3',
    number: 3,
    label: {
      fr: 'Immunité & Bouclier Saisonnier',
      en: 'Immunity & Seasonal Shield',
      de: 'Immunität & Saisonaler Schutz'
    },
    focusOrgan: {
      fr: 'Système lymphoïde • Muqueuses ORL • Barrières innées',
      en: 'Lymphoid tissues • ENT mucosa • Innate barriers',
      de: 'Lymphsystem • HNO-Schleimhäute • Barrieren'
    },
    signals: {
      fr: 'Vulnérabilité aux variations climatiques, fatigue hivernale, gorge sensible au moindre courant d\'air.',
      en: 'Vulnerability to seasonal shifts, winter fatigue, throat sensitivity.',
      de: 'Empfindlichkeit bei Wetterwechseln, Wintermüdigkeit, Halskratzen.'
    },
    lockReason: {
      fr: 'Cinétique immunitaire ralentie et barrière de surface perméable.',
      en: 'Delayed immune signaling and weakened surface barriers.',
      de: 'Verlangsamte Immunantwort und geschwächte Schleimhautbarrieren.'
    },
    keyPlants: ['Chaga', 'Reishi', 'Sureau Noir', 'Échinacée', 'Thym', 'Astragale'],
    recipeCount: 28,
    colorTheme: {
      bg: 'bg-teal-900',
      border: 'border-teal-500/30',
      badge: 'bg-teal-600 text-white',
      text: 'text-teal-800',
      lightBg: 'bg-teal-50/80',
      gradient: 'from-teal-500 to-emerald-700',
      ring: 'ring-teal-500'
    },
    icon: ShieldCheck
  },
  {
    code: 'T4',
    number: 4,
    label: {
      fr: 'Foie & Détoxication Hépato-Biliaire',
      en: 'Liver & Hepatic Clearance',
      de: 'Leber & Entgiftungsstoffwechsel'
    },
    focusOrgan: {
      fr: 'Hépatocytes • Vésicule biliaire • Conjugaison Phase I & II',
      en: 'Hepatocytes • Gallbladder • Phase I & II conjugation',
      de: 'Hepatozyten • Gallenblase • Phase-I- und II-Konjugation'
    },
    signals: {
      fr: 'Réveils nocturnes réguliers entre 1h et 3h, digestion difficile des lipides, teint brouillé.',
      en: 'Regular wakefulness between 1am and 3am, lipid intolerance, dull complexion.',
      de: 'Regelmäßiges Aufwachen zwischen 1 und 3 Uhr, schwere Fettverdauung.'
    },
    lockReason: {
      fr: 'Engorgement des cytochromes hépatiques et saturation biliaire.',
      en: 'Cytochrome P450 overload and sluggish bile output.',
      de: 'Überlastung der Lebercytochrome und Gallenstauung.'
    },
    keyPlants: ['Chardon-Marie', 'Desmodium', 'Radis Noir', 'Romarin', 'Artichaut'],
    recipeCount: 29,
    colorTheme: {
      bg: 'bg-yellow-900',
      border: 'border-yellow-600/30',
      badge: 'bg-yellow-700 text-white',
      text: 'text-yellow-900',
      lightBg: 'bg-yellow-50/80',
      gradient: 'from-yellow-600 to-amber-700',
      ring: 'ring-yellow-600'
    },
    icon: Activity
  },
  {
    code: 'T5',
    number: 5,
    label: {
      fr: 'Métabolisme & Sensibilité Glucidique',
      en: 'Metabolism & Glycemic Balance',
      de: 'Stoffwechsel & Blutzuckerbalance'
    },
    focusOrgan: {
      fr: 'Pancréas endocrine • Récepteurs insuliniques • Foie métabolique',
      en: 'Endocrine pancreas • Insulin receptors • Metabolic liver',
      de: 'Endokrines Pankreas • Insulinrezeptoren • Leber'
    },
    signals: {
      fr: 'Pulsions de sucre en fin de journée, coups de barre post-repas, stockage adipeux abdominal.',
      en: 'Late-day sugar cravings, post-prandial drowsiness, abdominal fat storage.',
      de: 'Heißhunger auf Süßes am späten Nachmittag, Müdigkeit nach Mahlzeiten.'
    },
    lockReason: {
      fr: 'Désensibilisation des récepteurs membranaires à l\'insuline et glycémie en dents de scie.',
      en: 'Peripheral insulin receptor desensitization and glucose volatility.',
      de: 'Desensibilisierung der Insulinrezeptoren und Blutzuckerschwankungen.'
    },
    keyPlants: ['Épine-vinette (Berbérine)', 'Cannelle de Ceylan', 'Fenugrec', 'Gingembre'],
    recipeCount: 26,
    colorTheme: {
      bg: 'bg-indigo-900',
      border: 'border-indigo-500/30',
      badge: 'bg-indigo-600 text-white',
      text: 'text-indigo-800',
      lightBg: 'bg-indigo-50/80',
      gradient: 'from-indigo-600 to-blue-700',
      ring: 'ring-indigo-600'
    },
    icon: Target
  },
  {
    code: 'T6',
    number: 6,
    label: {
      fr: 'Élimination, Reins & Drainage Cutané',
      en: 'Elimination, Kidneys & Skin Drainage',
      de: 'Ausscheidung, Nieren & Hautdrainage'
    },
    focusOrgan: {
      fr: 'Néphrons rénaux • Canaux lymphatiques • Glandes sudoripares',
      en: 'Renal nephrons • Lymphatic channels • Sweat glands',
      de: 'Nierennephrone • Lymphbahnen • Talgdrüsen'
    },
    signals: {
      fr: 'Sensibilité aux jambes lourdes, rétention d\'eau, imperfections cutanées récurrentes.',
      en: 'Heavy legs sensation, mild fluid retention, cyclical skin blemishes.',
      de: 'Schwere Beine, Wassereinlagerungen, unreine Haut.'
    },
    lockReason: {
      fr: 'Paresse des émonctoires secondaires et stagnation de la lymphe interstitielle.',
      en: 'Emunctory sluggishness and interstitial fluid stagnation.',
      de: 'Trägheit der Ausscheidungsorgane und Stagnation der Zwischenzellflüssigkeit.'
    },
    keyPlants: ['Pissenlit', 'Piloselle', 'Reine des Prés', 'Prêle', 'Bardane'],
    recipeCount: 23,
    colorTheme: {
      bg: 'bg-cyan-900',
      border: 'border-cyan-500/30',
      badge: 'bg-cyan-600 text-white',
      text: 'text-cyan-800',
      lightBg: 'bg-cyan-50/80',
      gradient: 'from-cyan-500 to-sky-700',
      ring: 'ring-cyan-500'
    },
    icon: Waves
  },
  {
    code: 'T7',
    number: 7,
    label: {
      fr: 'Sérénité & Régulation du Stress (Axe HPA)',
      en: 'Serenity & HPA Stress Axis',
      de: 'Gelassenheit & Stressachse (HPA)'
    },
    focusOrgan: {
      fr: 'Axe Hypothalamo-Hypophyso-Surrénalien • Système vagal parasympathique',
      en: 'Hypothalamic-Pituitary-Adrenal Axis • Vagus nerve',
      de: 'Hypophysen-Nebennieren-Achse • Vagusnerv'
    },
    signals: {
      fr: 'Charge mentale envahissante, hyper-réactivité émotionnelle, sensation d\'être sous tension.',
      en: 'Overwhelming mental chatter, emotional hyper-reactivity, constant inner tension.',
      de: 'Überlastungsgefühl, emotionale Übererregbarkeit, innere Unruhe.'
    },
    lockReason: {
      fr: 'Hyper-sécrétion chronique de cortisol et épuisement du tonus vagal régulateur.',
      en: 'Elevated baseline cortisol and depleted vagal tone.',
      de: 'Chronische Cortisol-Überlastung und geschwächter Parasympathikus.'
    },
    keyPlants: ['Safran', 'Ashwagandha', 'Mélisse', 'Passiflore', 'Millepertuis'],
    recipeCount: 24,
    colorTheme: {
      bg: 'bg-purple-900',
      border: 'border-purple-500/30',
      badge: 'bg-purple-600 text-white',
      text: 'text-purple-800',
      lightBg: 'bg-purple-50/80',
      gradient: 'from-purple-600 to-indigo-700',
      ring: 'ring-purple-600'
    },
    icon: Wind
  },
  {
    code: 'T8',
    number: 8,
    label: {
      fr: 'Inflammation & Confort Tissulaire',
      en: 'Inflammation & Tissue Comfort',
      de: 'Entzündungsbalance & Gewebekomfort'
    },
    focusOrgan: {
      fr: 'Tissu conjonctif • Synoviale articulaire • Endothélium',
      en: 'Connective tissues • Joint synovium • Vascular endothelium',
      de: 'Bindegewebe • Gelenkschmiere • Endothel'
    },
    signals: {
      fr: 'Raideurs au saut du lit, sensibilités articulaires à l\'humidité, perte de souplesse.',
      en: 'Morning joint stiffness, weather-linked aches, reduced physical flexibility.',
      de: 'Morgensteifigkeit der Gelenke, wetterfühlige Beschwerden, Steifheit.'
    },
    lockReason: {
      fr: 'Cascade de médiateurs pro-inflammatoires et stress oxydatif local.',
      en: 'Local inflammatory mediator cascade and oxidative tissue stress.',
      de: 'Kaskade von Entzündungsmediatoren und lokaler Gewebestress.'
    },
    keyPlants: ['Curcuma', 'Harpagophytum', 'Boswellia', 'Saule Blanc', 'Cassis'],
    recipeCount: 25,
    colorTheme: {
      bg: 'bg-rose-900',
      border: 'border-rose-500/30',
      badge: 'bg-rose-600 text-white',
      text: 'text-rose-800',
      lightBg: 'bg-rose-50/80',
      gradient: 'from-rose-500 to-amber-700',
      ring: 'ring-rose-500'
    },
    icon: Flame
  },
  {
    code: 'T9',
    number: 9,
    label: {
      fr: 'Sommeil & Rythmes Circadiens',
      en: 'Sleep & Circadian Rhythms',
      de: 'Schlaf & Zirkadiane Rhythmen'
    },
    focusOrgan: {
      fr: 'Épiphyse (glande pinéale) • Mélatonine endogène • Ondes delta',
      en: 'Pineal gland • Endogenous melatonin • Deep delta waves',
      de: 'Zirbeldrüse • Melatoninsynthese • Delta-Schlafwellen'
    },
    signals: {
      fr: 'Endormissement difficile (> 30 min), réveils nocturnes fractionnés, sentiment de non-récupération.',
      en: 'Sleep onset delay (>30 min), fragmented night awakenings, unrefreshed morning feeling.',
      de: 'Einschlafprobleme (>30 Min), nächtliches Erwachen, Erschöpfung am Morgen.'
    },
    lockReason: {
      fr: 'Désynchronisation de l\'horloge circadienne et retard de sécrétion mélatoninergique.',
      en: 'Circadian desynchronization and blunted evening melatonin surge.',
      de: 'Verschiebung der inneren biologischen Uhr und verzögerte Melatoninausschüttung.'
    },
    keyPlants: ['Eschscholtzia', 'Valériane', 'Passiflore', 'Houblon', 'Tilleul'],
    recipeCount: 10,
    colorTheme: {
      bg: 'bg-slate-900',
      border: 'border-slate-500/30',
      badge: 'bg-slate-700 text-white',
      text: 'text-slate-800',
      lightBg: 'bg-slate-100',
      gradient: 'from-slate-700 to-indigo-950',
      ring: 'ring-slate-500'
    },
    icon: Moon
  }
];

interface FriseTerrainsProps {
  selectedTerrain: string | null;
  onSelectTerrain: (terrainCode: string | null) => void;
  lang: Language;
  onNavigateToAlma?: () => void;
}

export const FriseTerrains: React.FC<FriseTerrainsProps> = ({
  selectedTerrain,
  onSelectTerrain,
  lang,
  onNavigateToAlma
}) => {
  const [expandedInfoCode, setExpandedInfoCode] = useState<string | null>(null);
  const [showPhilosophyModal, setShowPhilosophyModal] = useState<boolean>(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('bloom_admin_session') === ADMIN_EMAIL_TARGET;
    }
    return false;
  });
  const [showAdminAuthModal, setShowAdminAuthModal] = useState<boolean>(false);
  const [adminEmail, setAdminEmail] = useState<string>(ADMIN_EMAIL_TARGET);
  const [adminCode, setAdminCode] = useState<string>('');
  const [adminAuthError, setAdminAuthError] = useState<string>('');
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -280, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 280, behavior: 'smooth' });
    }
  };

  const triggerCsvDownload = () => {
    if (typeof window !== 'undefined') {
      const link = document.createElement('a');
      link.href = '/data/recettes_163_ingredients_terrains.csv';
      link.download = 'recettes_163_ingredients_terrains.csv';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleAdminAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdminAuthError('');
    setIsVerifying(true);

    try {
      const cleanEmail = adminEmail.trim().toLowerCase();
      const cleanCode = adminCode.trim();
      const hashedInput = await computeSha256(cleanCode);

      const isEmailValid = cleanEmail === ADMIN_EMAIL_TARGET;
      const isCodeValid = cleanCode === ADMIN_PLAIN_CODE || hashedInput === ADMIN_HASH_TARGET;

      if (isEmailValid && isCodeValid) {
        if (typeof window !== 'undefined') {
          sessionStorage.setItem('bloom_admin_session', ADMIN_EMAIL_TARGET);
        }
        setIsAdminAuthenticated(true);
        setShowAdminAuthModal(false);
        setAdminCode('');
        // Immediately trigger the download
        triggerCsvDownload();
      } else {
        setAdminAuthError(
          lang === 'fr' 
            ? 'Accès refusé : email ou code administrateur invalide. Ce registre officiel est strictement réservé à la direction.' 
            : 'Access denied: invalid admin email or password code.'
        );
      }
    } catch (err) {
      setAdminAuthError('Erreur lors de la validation des identifiants.');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleAdminLogout = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('bloom_admin_session');
    }
    setIsAdminAuthenticated(false);
  };

  const activeTerrainObj = TERRAINS_DATA.find(t => t.code === selectedTerrain);
  const expandedTerrainObj = TERRAINS_DATA.find(t => t.code === expandedInfoCode);

  return (
    <div className="bg-[#FAF7F2] border-y border-[#3E4A3D]/10 py-6 md:py-8 px-4 md:px-6 relative overflow-hidden">
      {/* Decorative watermark */}
      <div className="absolute right-0 top-0 bottom-0 pointer-events-none opacity-5 flex items-center pr-10">
        <Compass className="w-80 h-80 text-[#3E4A3D]" />
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        {/* Header with Title, Philosophy button and CSV download button */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-[#3E4A3D] text-white">
                <Compass className="w-3 h-3 text-[#C8AB8A]" />
                {lang === 'fr' ? 'Navigation Systémique' : 'Systemic Navigation'}
              </span>
              <button
                type="button"
                onClick={() => setShowPhilosophyModal(!showPhilosophyModal)}
                className="inline-flex items-center gap-1 text-[11px] font-bold text-[#C8AB8A] hover:text-[#3E4A3D] transition-colors cursor-pointer"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>{lang === 'fr' ? 'Pourquoi raisonner en Terrains ?' : 'Why reason by Terrains?'}</span>
              </button>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-[#3E4A3D] tracking-tight">
              {lang === 'fr' ? 'La Frise des Terrains Physiologiques Bloom' : 'The Bloom Physiological Terrains Strip'}
            </h2>
            <p className="text-xs md:text-sm text-[#3E4A3D]/70 max-w-2xl mt-1">
              {lang === 'fr' 
                ? 'Le corps ne trahit pas, il signale. Sélectionnez un terrain pour filtrer instantanément les 163 recettes et remèdes botaniques associés.' 
                : 'The body does not betray, it signals. Select a terrain to instantly filter the 163 matching botanical recipes.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Téléchargement du tableau masqué de l'interface utilisateur */}

            {/* Scroll navigation arrows for frise */}
            <div className="hidden sm:flex items-center gap-1 bg-white border border-[#3E4A3D]/10 rounded-xl p-0.5">
              <button
                type="button"
                onClick={scrollLeft}
                className="p-1.5 hover:bg-[#3E4A3D]/5 text-[#3E4A3D]/70 hover:text-[#3E4A3D] rounded-lg transition-colors cursor-pointer"
                aria-label="Défiler à gauche"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={scrollRight}
                className="p-1.5 hover:bg-[#3E4A3D]/5 text-[#3E4A3D]/70 hover:text-[#3E4A3D] rounded-lg transition-colors cursor-pointer"
                aria-label="Défiler à droite"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Philosophy accordion banner if open */}
        {showPhilosophyModal && (
          <div className="mb-6 p-5 md:p-6 bg-white border border-[#C8AB8A]/30 rounded-2xl shadow-sm relative animate-fadeIn">
            <button
              type="button"
              onClick={() => setShowPhilosophyModal(false)}
              className="absolute top-4 right-4 p-1 text-[#3E4A3D]/40 hover:text-[#3E4A3D] rounded-lg cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#C8AB8A]/10 text-[#C8AB8A] flex items-center justify-center flex-shrink-0 mt-0.5">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="space-y-2 text-xs md:text-sm text-[#3E4A3D]/80 leading-relaxed pr-6">
                <h4 className="font-bold text-[#3E4A3D] text-sm md:text-base">
                  « Votre corps n’est pas cassé. Il est verrouillé. »
                </h4>
                <p>
                  Dans la méthode Bloom, nous ne traitons pas un symptôme isolé. Nous accompagnons le <strong>terrain biologique</strong> dans sa globalité.
                  Lorsque le microbiote, le foie ou le système nerveux autonome subissent une surcharge allostatique, l'organisme bascule en mode de compensation.
                </p>
                <p>
                  Les <strong>8 à 9 Terrains Bloom</strong> constituent une boussole cartographique : chaque plante médicinale du Totum et chaque protocole d'extraction biphasée cible une dimension précise pour relancer votre homéostasie naturelle.
                </p>
                {onNavigateToAlma && (
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={onNavigateToAlma}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#3E4A3D] bg-[#C8AB8A]/20 hover:bg-[#3E4A3D] hover:text-white px-3 py-1.5 rounded-lg transition-all cursor-pointer"
                    >
                      <span>Identifier mon profil systémique avec ALMA</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Active Filter Pill Bar (if a terrain is currently selected) */}
        {selectedTerrain && activeTerrainObj && (
          <div className="mb-4 p-3 bg-white border border-[#C8AB8A]/40 rounded-xl flex items-center justify-between gap-3 shadow-xs">
            <div className="flex items-center gap-2.5 min-w-0">
              <span className={`px-2 py-0.5 rounded-md text-[11px] font-black tracking-wider ${activeTerrainObj.colorTheme.badge}`}>
                {activeTerrainObj.code}
              </span>
              <span className="text-xs md:text-sm font-bold text-[#3E4A3D] truncate">
                {lang === 'fr' ? activeTerrainObj.label.fr : activeTerrainObj.label.en}
              </span>
              <span className="hidden sm:inline-block text-xs text-[#3E4A3D]/60 truncate">
                • {lang === 'fr' ? activeTerrainObj.focusOrgan.fr : activeTerrainObj.focusOrgan.en}
              </span>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#3E4A3D]/5 text-[#3E4A3D]/80 font-bold whitespace-nowrap">
                {activeTerrainObj.recipeCount} {lang === 'fr' ? 'recettes cibles' : 'recipes'}
              </span>
            </div>
            <button
              type="button"
              onClick={() => onSelectTerrain(null)}
              className="flex items-center gap-1 text-xs font-bold text-[#3E4A3D]/70 hover:text-[#C8AB8A] px-2.5 py-1 rounded-lg hover:bg-[#FAF7F2] transition-colors cursor-pointer whitespace-nowrap"
            >
              <X className="w-3.5 h-3.5" />
              <span>{lang === 'fr' ? 'Effacer le filtre' : 'Clear filter'}</span>
            </button>
          </div>
        )}

        {/* THE TIMELINE STRIP (Horizontally scrollable with smooth touch) */}
        <div 
          ref={scrollContainerRef}
          className="flex items-stretch gap-3 overflow-x-auto pb-3 pt-1 scrollbar-thin scrollbar-thumb-[#3E4A3D]/20 scrollbar-track-transparent snap-x snap-mandatory"
          style={{ scrollbarWidth: 'thin' }}
        >
          {/* Quick "Tous les Terrains" pill - texte écrit en blanc */}
          <button
            type="button"
            onClick={() => onSelectTerrain(null)}
            className={`flex-shrink-0 snap-start flex flex-col justify-between p-3.5 rounded-2xl border text-left transition-all duration-300 w-[140px] cursor-pointer group text-white ${
              selectedTerrain === null
                ? 'bg-[#0F261E] border-[#0F261E] shadow-md scale-[1.02] ring-2 ring-[#C8AB8A]/40'
                : 'bg-[#3E4A3D] border-[#3E4A3D] hover:bg-[#0F261E] hover:shadow-xs'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-white/20 text-white">
                  TOUS
                </span>
                <Compass className="w-4 h-4 text-white group-hover:text-[#C8AB8A] transition-colors" />
              </div>
              <h3 className="font-bold text-xs md:text-sm leading-tight mb-1 text-white">
                {lang === 'fr' ? 'Tous les Terrains' : 'All Terrains'}
              </h3>
              <p className="text-[10px] leading-snug line-clamp-2 text-white/90">
                {lang === 'fr' ? '163 recettes botaniques' : '163 botanical recipes'}
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-white/20 text-[10px] font-bold text-white">
              {lang === 'fr' ? 'Vue intégrale' : 'Full catalog'}
            </div>
          </button>

          {/* 9 Terrains Cards */}
          {TERRAINS_DATA.map((t) => {
            const Icon = t.icon;
            const isSelected = selectedTerrain === t.code;
            const isInfoExpanded = expandedInfoCode === t.code;

            return (
              <div
                key={t.code}
                className={`flex-shrink-0 snap-start flex flex-col justify-between p-3.5 rounded-2xl border transition-all duration-300 w-[220px] md:w-[240px] relative group ${
                  isSelected
                    ? `${t.colorTheme.bg} text-white border-transparent shadow-lg scale-[1.02] ring-2 ${t.colorTheme.ring}`
                    : 'bg-white text-[#3E4A3D] border-[#3E4A3D]/10 hover:border-[#C8AB8A] hover:shadow-md'
                }`}
              >
                <div>
                  {/* Top Bar: Code badge + Icon + Recipe count */}
                  <div className="flex items-center justify-between mb-2.5">
                    <div className="flex items-center gap-1.5">
                      <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md ${
                        isSelected ? 'bg-white/20 text-white' : t.colorTheme.badge
                      }`}>
                        {t.code}
                      </span>
                      <span className={`text-[10px] font-bold ${isSelected ? 'text-white/70' : 'text-[#3E4A3D]/50'}`}>
                        {t.recipeCount} {lang === 'fr' ? 'recettes' : 'recipes'}
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      {/* Info trigger button */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setExpandedInfoCode(isInfoExpanded ? null : t.code);
                        }}
                        className={`p-1 rounded-md transition-colors cursor-pointer ${
                          isSelected 
                            ? 'text-white/70 hover:text-white hover:bg-white/10' 
                            : 'text-[#3E4A3D]/40 hover:text-[#C8AB8A] hover:bg-[#3E4A3D]/5'
                        }`}
                        title={lang === 'fr' ? 'Détails du terrain et signaux corporels' : 'Terrain details'}
                      >
                        <Info className="w-3.5 h-3.5" />
                      </button>

                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                        isSelected ? 'bg-white/10 text-white' : `${t.colorTheme.lightBg} ${t.colorTheme.text}`
                      }`}>
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>

                  {/* Terrain Title */}
                  <button
                    type="button"
                    onClick={() => onSelectTerrain(isSelected ? null : t.code)}
                    className="text-left w-full cursor-pointer focus:outline-hidden"
                  >
                    <h3 className="font-bold text-xs md:text-sm leading-tight mb-1">
                      {lang === 'fr' ? t.label.fr : t.label.en}
                    </h3>
                    <p className={`text-[10px] font-medium leading-snug line-clamp-1 mb-2 ${
                      isSelected ? 'text-white/80' : 'text-[#3E4A3D]/60'
                    }`}>
                      {lang === 'fr' ? t.focusOrgan.fr : t.focusOrgan.en}
                    </p>
                  </button>

                  {/* Typical signal cue */}
                  <div className={`p-2 rounded-xl text-[10px] leading-relaxed mb-2 ${
                    isSelected ? 'bg-white/10 text-white/90' : 'bg-[#FAF7F2] text-[#3E4A3D]/70 border border-[#3E4A3D]/5'
                  }`}>
                    <span className="font-bold block text-[9px] uppercase tracking-wider opacity-70 mb-0.5">
                      {lang === 'fr' ? 'Signaux corporels :' : 'Body signals:'}
                    </span>
                    <span className="line-clamp-2">
                      {lang === 'fr' ? t.signals.fr : t.signals.en}
                    </span>
                  </div>

                  {/* Key Plants pills */}
                  <div className="flex flex-wrap gap-1">
                    {t.keyPlants.slice(0, 3).map((plant) => (
                      <span
                        key={plant}
                        className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md ${
                          isSelected ? 'bg-white/20 text-white' : 'bg-[#3E4A3D]/5 text-[#3E4A3D]/80'
                        }`}
                      >
                        {plant}
                      </span>
                    ))}
                    {t.keyPlants.length > 3 && (
                      <span className={`text-[9px] font-bold px-1 py-0.5 ${isSelected ? 'text-white/60' : 'text-[#3E4A3D]/40'}`}>
                        +{t.keyPlants.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                {/* Bottom action bar */}
                <div className={`mt-3 pt-2.5 border-t flex items-center justify-between text-[11px] font-bold ${
                  isSelected ? 'border-white/15' : 'border-[#3E4A3D]/5'
                }`}>
                  <button
                    type="button"
                    onClick={() => onSelectTerrain(isSelected ? null : t.code)}
                    className={`flex items-center gap-1 transition-colors cursor-pointer ${
                      isSelected ? 'text-[#C8AB8A] hover:text-white' : 'text-[#3E4A3D]/70 hover:text-[#C8AB8A]'
                    }`}
                  >
                    <span>{isSelected ? (lang === 'fr' ? 'Actif' : 'Active') : (lang === 'fr' ? 'Filtrer' : 'Filter')}</span>
                    {isSelected ? <CheckCircle2 className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setExpandedInfoCode(isInfoExpanded ? null : t.code);
                    }}
                    className={`text-[10px] underline underline-offset-2 transition-colors cursor-pointer ${
                      isSelected ? 'text-white/70 hover:text-white' : 'text-[#3E4A3D]/50 hover:text-[#C8AB8A]'
                    }`}
                  >
                    {lang === 'fr' ? 'Comprendre' : 'Details'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Detailed Modal/Drawer for the clicked info button */}
        {expandedTerrainObj && (
          <div className="mt-4 p-5 md:p-6 bg-white border border-[#3E4A3D]/10 rounded-2xl shadow-md relative animate-fadeIn">
            <button
              type="button"
              onClick={() => setExpandedInfoCode(null)}
              className="absolute top-4 right-4 p-1.5 text-[#3E4A3D]/40 hover:text-[#3E4A3D] rounded-lg cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex flex-col md:flex-row md:items-start gap-6">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${expandedTerrainObj.colorTheme.badge}`}>
                  <expandedTerrainObj.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black px-2 py-0.5 rounded-md bg-[#3E4A3D] text-white">
                      {expandedTerrainObj.code}
                    </span>
                    <span className="text-xs text-[#3E4A3D]/60 font-bold">
                      {expandedTerrainObj.recipeCount} {lang === 'fr' ? 'recettes documentées' : 'documented recipes'}
                    </span>
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-[#3E4A3D] mt-0.5">
                    {lang === 'fr' ? expandedTerrainObj.label.fr : expandedTerrainObj.label.en}
                  </h3>
                  <p className="text-xs font-medium text-[#3E4A3D]/60">
                    {lang === 'fr' ? expandedTerrainObj.focusOrgan.fr : expandedTerrainObj.focusOrgan.en}
                  </p>
                </div>
              </div>

              <div className="flex-1 grid sm:grid-cols-2 gap-4 text-xs md:text-sm">
                <div className="bg-[#FAF7F2] p-4 rounded-xl border border-[#3E4A3D]/5">
                  <h4 className="font-bold text-[#3E4A3D] text-xs uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-[#C8AB8A]" />
                    {lang === 'fr' ? 'Signaux corporels observés' : 'Observed body signals'}
                  </h4>
                  <p className="text-[#3E4A3D]/75 leading-relaxed">
                    {lang === 'fr' ? expandedTerrainObj.signals.fr : expandedTerrainObj.signals.en}
                  </p>
                </div>

                <div className="bg-[#FAF7F2] p-4 rounded-xl border border-[#3E4A3D]/5">
                  <h4 className="font-bold text-[#3E4A3D] text-xs uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <Target className="w-3.5 h-3.5 text-[#C8AB8A]" />
                    {lang === 'fr' ? 'Verrou homéostatique Bloom' : 'Bloom homeostatic lock'}
                  </h4>
                  <p className="text-[#3E4A3D]/75 leading-relaxed">
                    {lang === 'fr' ? expandedTerrainObj.lockReason.fr : expandedTerrainObj.lockReason.en}
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row md:flex-col gap-2 justify-end">
                <button
                  type="button"
                  onClick={() => {
                    onSelectTerrain(expandedTerrainObj.code);
                    setExpandedInfoCode(null);
                  }}
                  className="px-4 py-2.5 bg-[#3E4A3D] hover:bg-[#2D372C] text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
                >
                  <Compass className="w-3.5 h-3.5 text-[#C8AB8A]" />
                  <span>{lang === 'fr' ? `Filtrer sur ${expandedTerrainObj.code}` : `Filter by ${expandedTerrainObj.code}`}</span>
                </button>

                {onNavigateToAlma && (
                  <button
                    type="button"
                    onClick={onNavigateToAlma}
                    className="px-4 py-2.5 bg-white hover:bg-[#FAF7F2] text-[#3E4A3D] border border-[#3E4A3D]/15 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
                  >
                    <span>{lang === 'fr' ? 'Demander à ALMA' : 'Ask ALMA'}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C8AB8A]" />
                  </button>
                )}
              </div>
            </div>

            {/* Botanical champions row in expanded drawer */}
            <div className="mt-4 pt-3 border-t border-[#3E4A3D]/5 flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-bold text-[#3E4A3D]/60 uppercase tracking-wider">
                {lang === 'fr' ? 'Plantes phares du terrain :' : 'Key botanical champions:'}
              </span>
              {expandedTerrainObj.keyPlants.map((plant) => (
                <span
                  key={plant}
                  className="text-xs font-semibold px-2.5 py-1 bg-[#3E4A3D]/5 text-[#3E4A3D] rounded-lg"
                >
                  🌿 {plant}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Modal d'Authentification Administrateur pour téléchargement CSV */}
        {showAdminAuthModal && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
            onClick={() => setShowAdminAuthModal(false)}
          >
            <div 
              className="bg-white rounded-3xl border border-[#3E4A3D]/15 shadow-2xl max-w-md w-full p-6 md:p-8 relative overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setShowAdminAuthModal(false)}
                className="absolute top-5 right-5 p-2 text-[#3E4A3D]/40 hover:text-[#3E4A3D] hover:bg-[#FAF7F2] rounded-full transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Header */}
              <div className="flex items-center gap-3 mb-5">
                <div className="w-11 h-11 rounded-2xl bg-[#3E4A3D] text-white flex items-center justify-center shadow-md">
                  <KeyRound className="w-5 h-5 text-[#C8AB8A]" />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded bg-[#C8AB8A]/15 text-[#C8AB8A]">
                    ACCÈS DIRECTION
                  </span>
                  <h3 className="text-lg font-bold text-[#3E4A3D] leading-tight mt-0.5">
                    Registre Officiel .CSV
                  </h3>
                </div>
              </div>

              <p className="text-xs text-[#3E4A3D]/70 leading-relaxed mb-6">
                Le tableau exhaustif des 163 recettes (formulations complètes, solvants, températures et dosages) est un actif confidentiel réservé à l'administrateur Bloom by BotaniK.
              </p>

              {adminAuthError && (
                <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-start gap-2.5 text-xs text-rose-800 animate-shake">
                  <ShieldAlert className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                  <span>{adminAuthError}</span>
                </div>
              )}

              <form onSubmit={handleAdminAuthSubmit} className="space-y-4">
                <div>
                  <label className="block text-[11px] font-bold text-[#3E4A3D]/70 uppercase tracking-wider mb-1.5">
                    Email Administrateur
                  </label>
                  <input
                    type="email"
                    required
                    value={adminEmail}
                    onChange={(e) => setAdminEmail(e.target.value)}
                    placeholder="bloombybotanik@gmail.com"
                    className="w-full px-4 py-2.5 bg-[#FAF7F2] rounded-xl border border-[#3E4A3D]/15 text-sm text-[#3E4A3D] focus:outline-hidden focus:ring-2 focus:ring-[#C8AB8A]/30 focus:border-[#C8AB8A]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#3E4A3D]/70 uppercase tracking-wider mb-1.5">
                    Code Secret Administrateur
                  </label>
                  <input
                    type="password"
                    required
                    autoFocus
                    value={adminCode}
                    onChange={(e) => setAdminCode(e.target.value)}
                    placeholder="Code d'accès"
                    className="w-full px-4 py-2.5 bg-[#FAF7F2] rounded-xl border border-[#3E4A3D]/15 text-sm text-[#3E4A3D] focus:outline-hidden focus:ring-2 focus:ring-[#C8AB8A]/30 focus:border-[#C8AB8A]"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowAdminAuthModal(false)}
                    className="px-4 py-2 text-xs font-bold text-[#3E4A3D]/70 hover:text-[#3E4A3D] hover:bg-[#FAF7F2] rounded-xl transition-colors cursor-pointer"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    disabled={isVerifying}
                    className="px-5 py-2.5 bg-[#3E4A3D] hover:bg-[#2D372C] text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <Lock className="w-3.5 h-3.5 text-[#C8AB8A]" />
                    <span>{isVerifying ? 'Vérification...' : 'Déverrouiller & Télécharger'}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
