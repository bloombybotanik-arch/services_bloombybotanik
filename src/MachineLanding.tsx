import React, { useState } from 'react';
import { 
  ChevronRight, 
  ShieldCheck, 
  Zap, 
  FlaskConical, 
  Star, 
  Activity, 
  ArrowRight, 
  Check, 
  Utensils, 
  CheckCircle, 
  X, 
  Maximize2, 
  Flame, 
  Clock, 
  Sparkles, 
  HelpCircle,
  Package,
  Layers,
  HeartHandshake,
  Award,
  Compass,
  Thermometer,
  Wind
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TooltipLexique } from './components/TooltipLexique';
import { translations, Language } from './translations';
import { trackViewItem, trackFaqExpand } from './utils/analytics';

const heroViews = [
  { id: 'v2', label: 'Vue 2', src: '/images/1.png', fallbackSrc: '/images/1.png', subtitle: 'Précision' },
  { id: 'v3', label: 'Vue 3', src: '/images/2.png', fallbackSrc: '/images/2.png', subtitle: 'Extraction' },
  { id: 'v4', label: 'Vue 4', src: '/images/8.png', fallbackSrc: '/images/8.png', subtitle: 'Totum' },
  { id: 'v1', label: 'Vue 1', src: '/img/produit/bloomlab-face-1200x1200.jpg', fallbackSrc: '/img/produit/bloomlab-face-1200x1200.jpg', subtitle: 'Face Inox' },
];
const heroImg1 = heroViews[0].src;
const bloomSoinsImg = "/assets/images/Bloom_Soins.jpg";
const fourMmImg = "/assets/images/4MM.jpg";

export default function MachineLanding({ onNavigate, lang }: { onNavigate: (view: any, param?: string) => void, lang: Language }) {
  const t = translations[lang].machine;
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);
  const [selectedHeroImage, setSelectedHeroImage] = useState<string>(heroViews[0].src);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  React.useEffect(() => {
    trackViewItem({
      id: 'bloomlab',
      name: 'BloomLab® — Extracteur Botanique de Précision',
      price: 239.00,
      category: 'hardware'
    });
  }, []);

  const activeView = heroViews.find(v => v.src === selectedHeroImage || v.fallbackSrc === selectedHeroImage) || heroViews[0];

  const faqItems = (t as any).faq || [];

  return (
    <div className="animate-in fade-in duration-700 bg-[#FAF7F2] text-[#0F261E] w-full max-w-full overflow-x-hidden">
      {/* Fullscreen Image Overlay */}
      <AnimatePresence>
        {fullscreenImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setFullscreenImage(null)}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-12 cursor-zoom-out"
          >
            <button 
              onClick={() => setFullscreenImage(null)}
              className="absolute top-6 right-6 p-3 bg-[#0F261E] hover:bg-[#1C3F34] rounded-full text-white transition-colors border border-white/20"
              aria-label="Close"
            >
              <X className="w-8 h-8" />
            </button>
            <motion.img 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={fullscreenImage} 
              alt="BloomLab Detail" 
              className="max-w-full max-h-full object-contain rounded-xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1. HERO HEADER SECTION */}
      <section className="relative overflow-hidden bg-[#0F261E] text-white pt-8 pb-16 md:pt-12 md:pb-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(217,119,6,0.15),rgba(255,255,255,0))] pointer-events-none" />
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          {/* Hero Image with Overlay: Header Texts (Top) & Gallery Links (Bottom-Left) */}
          <div className="flex flex-col items-center mb-10">
            <div 
              className="relative rounded-3xl overflow-hidden border border-white/15 bg-white/5 shadow-2xl w-full max-w-4xl h-[380px] sm:h-[480px] md:h-[560px] min-h-[380px] sm:min-h-[480px] md:min-h-[560px] cursor-zoom-in group"
              onClick={() => setFullscreenImage(selectedHeroImage)}
            >
              <picture>
                <source type="image/webp" srcSet={activeView.src} />
                <img 
                  src={activeView.fallbackSrc} 
                  alt={activeView.subtitle || "BloomLab"} 
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  className="w-full h-full object-cover object-[center_35%] group-hover:scale-105 transition-transform duration-700" 
                />
              </picture>

              {/* Dual Gradients for High Legibility */}
              <div className="absolute inset-x-0 top-0 h-3/5 bg-gradient-to-b from-black/85 via-black/40 to-transparent pointer-events-none" />
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />
              
              {/* Header Texts placed directly ON the hero image */}
              <div className="absolute top-4 left-4 right-4 sm:top-6 sm:left-6 sm:right-6 z-20 space-y-1.5 sm:space-y-2.5 max-w-2xl pointer-events-none">
                <div className="inline-flex items-center gap-1.5 bg-black/60 backdrop-blur-md text-[#D97706] px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-widest border border-white/20 shadow-lg">
                  <Zap className="w-3 h-3 text-[#D97706]" /> 
                  <span>Autonomie Botanique — Méthode A/B</span>
                </div>

                <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white leading-tight tracking-tight drop-shadow-md">
                  {lang === 'fr' ? (
                    <>BloomLab® — Extracteur Botanique de Précision pour Infusions Végétales</>
                  ) : lang === 'de' ? (
                    <>BloomLab® — Botanischer Präzisionsextraktor für Pflanzenaufgüsse</>
                  ) : (
                    <>BloomLab® — Precision Botanical Extractor for Herbal Infusions</>
                  )}
                </h1>
              </div>

              {/* 4 Image Thumbnails on bottom-left: no text labels, just sleek image thumbnails */}
              <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 z-20 flex items-center gap-2">
                {heroViews.map((view) => {
                  const isSelected = selectedHeroImage === view.src || selectedHeroImage === view.fallbackSrc;
                  return (
                    <button
                      key={view.id}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedHeroImage(view.src);
                      }}
                      className={`p-1 rounded-xl border transition-all cursor-pointer backdrop-blur-md ${
                        isSelected 
                          ? 'bg-black/80 border-[#D97706] shadow-xl ring-2 ring-[#D97706]' 
                          : 'bg-black/50 border-white/25 hover:border-white/60 hover:bg-black/75'
                      }`}
                      title={view.subtitle}
                    >
                      <picture>
                        <source type="image/webp" srcSet={view.src} />
                        <img 
                          src={view.fallbackSrc} 
                          alt={view.subtitle} 
                          loading="lazy"
                          decoding="async"
                          className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg object-cover" 
                        />
                      </picture>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* AMAZON ACTIVATION BANNER */}
          <div className="max-w-4xl mx-auto mb-10 bg-[#132B22] border border-[#D97706]/30 rounded-2xl p-4 shadow-lg">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3 text-white">
                <div className="w-10 h-10 rounded-xl bg-[#D97706] flex items-center justify-center shrink-0">
                  <Package className="w-5 h-5 text-white" />
                </div>
                <p className="text-xs sm:text-sm font-medium">
                  <span className="font-bold text-[#D97706]">Acheteur Amazon ?</span> Ne restez pas seul face à vos plantes. Uploadez votre facture pour débloquer gratuitement vos protocoles cliniques et l'accès Premium à la Bibliothèque Bloom.
                </p>
              </div>
              <button 
                onClick={() => onNavigate('activation')} 
                className="px-5 py-2 bg-[#D97706] hover:bg-[#b45309] text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-[#D97706]/20 whitespace-nowrap cursor-pointer"
              >
                Activer mon accès Premium
              </button>
            </div>
          </div>

          {/* Suivit du texte */}
          <div className="max-w-3xl mx-auto space-y-8 text-center sm:text-left">
            {/* Texte historique : Le naturel ne doit plus être approximatif */}
            <div className="p-6 md:p-8 rounded-3xl bg-[#142D23] border-2 border-[#D97706]/40 space-y-4 shadow-2xl shadow-black/20 text-[#FAF7F2]">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D97706]/20 border border-[#D97706]/35 text-[#D97706] text-xs font-bold uppercase tracking-widest">
                <Compass className="w-4 h-4 text-[#D97706]" />
                <span>
                  {(t.hero as any).history_badge || "Héritage Millénaire & Rigueur Botanique"}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#F3E8D8] leading-snug">
                {(t.hero as any).history_title || "Le naturel ne doit plus être approximatif."}
              </h3>
              <p className="text-base sm:text-lg text-[#D97706] leading-relaxed font-serif italic">
                {(t.hero as any).history_subtitle || "Il y a 5 000 ans, l'Asie savait déjà tout de l'extraction."}
              </p>
              <p className="text-sm sm:text-base text-[#FAF7F2]/90 leading-relaxed font-light">
                {(t.hero as any).history_p1 || "En Médecine Traditionnelle Chinoise comme en Ayurveda, l'extraction n'était ni un geste approximatif, ni une habitude de cuisine. C'était un art codifié, où le temps, le feu et la matière obéissaient à des règles précises. Décoctions longuement mijotées, macérations à feu doux, résines travaillées avec patience : les praticiens d'Orient savaient qu'une plante trahie par la chaleur est une plante qui perd son intelligence."}
              </p>
              <p className="text-sm sm:text-base text-[#D97706] font-semibold flex items-center gap-2">
                <span>—</span>
                <span>{(t.hero as any).history_p2 || "Ce savoir a fondé l'herboristerie du monde."}</span>
              </p>
            </div>

            <div className="space-y-4 text-base sm:text-lg text-white/85 leading-relaxed font-light">
              <p>
                Favorisez l'extraction des composés recherchés et respectez les fractions sensibles. Avec BloomLab, vous ne faites plus simplement chauffer une plante : vous optimisez le profil d'extraction de ses principes actifs dans des conditions rigoureuses. La température est maintenue au degré près : assez élevée pour optimiser l’extraction des phytocomposés (<TooltipLexique terme="polyphenols" />, flavonoïdes, huiles essentielles…), mais jamais au‑delà des seuils qui les dégradent, ce qui est exactement ce que montrent les études sur l’impact de la température en extraction végétale.
              </p>
              <p className="text-white/75 text-sm sm:text-base">
                Là où une casserole ou un bain‑marie improvisé chauffent trop fort ou de façon irrégulière (perte d’antioxydants, arômes brûlés, actifs détruits), BloomLab offre un profil thermique maîtrisé qui préserve les molécules sensibles à la chaleur et améliore la quantité d’actifs réellement présents dans vos huiles infusées et macérâts.
              </p>
            </div>

            {/* Reassurance Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-semibold text-white/90 bg-white/5 border border-white/10 px-4 py-3 rounded-xl">
                <ShieldCheck className="w-4 h-4 text-[#D97706] shrink-0" />
                <span>Inox 304 alimentaire</span>
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-semibold text-white/90 bg-white/5 border border-white/10 px-4 py-3 rounded-xl">
                <Activity className="w-4 h-4 text-[#D97706] shrink-0" />
                <span>Précision ±0,5°C</span>
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-semibold text-white/90 bg-white/5 border border-white/10 px-4 py-3 rounded-xl">
                <Award className="w-4 h-4 text-[#D97706] shrink-0" />
                <span>Garantie 1 an</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-4">
              <button 
                onClick={() => onNavigate('product-detail', 'bloomlab')}
                className="px-8 py-4 bg-[#D97706] hover:bg-[#b45309] text-white rounded-2xl font-bold text-base md:text-lg transition-all shadow-xl shadow-black/20 flex items-center gap-3 cursor-pointer"
              >
                <span>{t.hero.cta || "Commander BloomLab"}</span>
                <ChevronRight className="w-5 h-5" />
              </button>
              <button 
                onClick={() => document.getElementById('pourquoi-l-infusion-echoue')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 bg-white/10 hover:bg-white/15 text-white border border-white/20 rounded-2xl font-semibold text-base transition-all cursor-pointer"
              >
                {t.hero.discover || "Comprendre la méthode"}
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 2. LE VERROU MÉTHODOLOGIQUE */}
      <section id="verrou-methodologique" className="py-20 md:py-28 bg-[#FAF7F2]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="inline-block px-3.5 py-1.5 rounded-full bg-[#D97706]/10 text-[#D97706] text-xs font-black uppercase tracking-[0.25em] border border-[#D97706]/20">
              2. LE VERROU MÉTHODOLOGIQUE
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0F261E] leading-tight">
              {lang === 'fr' 
                ? "Technologie d'Extraction Botanique Séquentielle A/B : Libérer la Puissance de la Plante" 
                : lang === 'de' 
                ? "Sequenzielle botanische A/B-Extraktionstechnologie: Pflanzenkraft entfesseln" 
                : "Sequential A/B Botanical Extraction Technology: Unlocking Plant Power"}
            </h2>
            <p className="text-base sm:text-lg text-[#0F261E]/70 leading-relaxed font-normal">
              L'extraction végétale domestique se heurte traditionnellement à 3 barrières physiques invisibles. BloomLab les résout par le contrôle strict de la cinétique, de la température et des solvants.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Carte 1 : Choc Thermique */}
            <div className="bg-white p-8 rounded-3xl border border-[#0F261E]/10 shadow-xs flex flex-col">
              <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mb-6">
                <Thermometer className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#0F261E] mb-3">1. Le Choc Thermique</h3>
              <p className="text-sm text-[#0F261E]/75 leading-relaxed flex-1">
                L'eau bouillante ou un bain-marie incontrôlé dépasse les 60°C à 100°C : les terpènes volatils s'évaporent et les flavonoïdes thermolabiles sont dégradés avant usage.
              </p>
            </div>

            {/* Carte 2 : Barrière de Polarité */}
            <div className="bg-white p-8 rounded-3xl border border-[#0F261E]/10 shadow-xs flex flex-col">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-6">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#0F261E] mb-3">2. La Barrière de Polarité</h3>
              <p className="text-sm text-[#0F261E]/75 leading-relaxed flex-1">
                Une plante contient à la fois des principes hydrosolubles et liposolubles. Une extraction unique à l'aveugle laisse la moitié des principes actifs captifs de la fibre végétale.
              </p>
            </div>

            {/* Carte 3 : Oxydation à l'Air Libre */}
            <div className="bg-white p-8 rounded-3xl border border-[#0F261E]/10 shadow-xs flex flex-col">
              <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center mb-6">
                <Wind className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#0F261E] mb-3">3. L'Oxydation à l'Air Libre</h3>
              <p className="text-sm text-[#0F261E]/75 leading-relaxed flex-1">
                Les bocaux ouverts ou casseroles exposent les lipides et molécules actives à l'oxygène ambiant, accélérant le rancissement et la déperdition aromatique.
              </p>
            </div>
          </div>

          {/* Carte blanche finale, 3 colonnes à coches */}
          <div className="bg-white p-8 md:p-10 rounded-3xl border border-[#0F261E]/10 shadow-md">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="space-y-2.5">
                <div className="flex items-center gap-2 text-botanik-green font-bold text-base">
                  <div className="w-6 h-6 rounded-full bg-[#0F261E]/10 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 text-[#0F261E]" />
                  </div>
                  <span>Contre le Gaspillage</span>
                </div>
                <p className="text-xs sm:text-sm text-[#0F261E]/75 leading-relaxed">
                  Ne jetez plus de matière végétale mal extraite. Chaque gramme de plante libère son profil complet sous conditions adaptées.
                </p>
              </div>

              <div className="space-y-2.5">
                <div className="flex items-center gap-2 text-botanik-green font-bold text-base">
                  <div className="w-6 h-6 rounded-full bg-[#0F261E]/10 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 text-[#0F261E]" />
                  </div>
                  <span>Pour l'Autonomie Botanique</span>
                </div>
                <p className="text-xs sm:text-sm text-[#0F261E]/75 leading-relaxed">
                  Reprenez le contrôle complet sur vos préparations. Vous choisissez la plante, le solvant noble et la concentration exacte.
                </p>
              </div>

              <div className="space-y-2.5">
                <div className="flex items-center gap-2 text-botanik-green font-bold text-base">
                  <div className="w-6 h-6 rounded-full bg-[#0F261E]/10 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 text-[#0F261E]" />
                  </div>
                  <span>Par la Précision</span>
                </div>
                <p className="text-xs sm:text-sm text-[#0F261E]/75 leading-relaxed">
                  Chaque extraction devient un protocole documenté, reproductible à volonté sans incertitude ni risque de brûler vos actifs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. COMPARISON TABLE: SCIENCE VS TRADITION */}
      <section className="py-20 md:py-28 bg-[#FAF7F2]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-xs font-black uppercase tracking-[0.25em] text-[#D97706] mb-3 block">
              Rigueur Comparée
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0F261E] mb-4">
              {lang === 'fr' 
                ? "Infusion Végétale de Grade Laboratoire : BloomLab vs Méthodes Traditionnelles" 
                : lang === 'de' 
                ? "Pflanzenaufguss in Laborqualität: BloomLab vs. traditionelle Methoden" 
                : "Laboratory-Grade Herbal Infusion: BloomLab vs. Traditional Methods"}
            </h2>
            <p className="text-base text-[#0F261E]/70 max-w-2xl mx-auto">
              Mesure concrète des paramètres physiques qui conditionnent la richesse et la biodisponibilité de vos infusions végétales, macérations huileuses, décoctions et teintures de plantes médicinales.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse bg-white rounded-3xl overflow-hidden shadow-xs border border-[#0F261E]/10">
              <thead>
                <tr className="bg-[#0F261E] text-white text-xs sm:text-sm">
                  <th className="p-5 font-bold">Critère d'Extraction</th>
                  <th className="p-5 font-bold text-center text-white/70">Infusion / Bain-Marie</th>
                  <th className="p-5 font-bold text-center text-[#D97706]">BloomLab® Officiel</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                <tr>
                  <td className="p-5 font-semibold text-[#0F261E]">Précision de la température</td>
                  <td className="p-5 text-center text-rose-700 font-medium">± 5°C à 15°C (pics incontrôlés)</td>
                  <td className="p-5 text-center font-bold text-emerald-700 bg-emerald-50/50">± 0,5°C asservie</td>
                </tr>
                <tr>
                  <td className="p-5 font-semibold text-[#0F261E]">Préservation des principes thermolabiles</td>
                  <td className="p-5 text-center text-rose-700 font-medium">Dégradation rapide &gt; 80°C</td>
                  <td className="p-5 text-center font-bold text-emerald-700 bg-emerald-50/50">Totum préservé intact</td>
                </tr>
                <tr>
                  <td className="p-5 font-semibold text-[#0F261E]">Matériau en contact avec les solvants</td>
                  <td className="p-5 text-center text-slate-500">Aluminium réactif / Plastique</td>
                  <td className="p-5 text-center font-bold text-emerald-700 bg-emerald-50/50">Inox 304 biocompatible certifié</td>
                </tr>
                <tr>
                  <td className="p-5 font-semibold text-[#0F261E]">Extraction cinétique vortex</td>
                  <td className="p-5 text-center text-slate-500">Néant (stagnation passive)</td>
                  <td className="p-5 text-center font-bold text-emerald-700 bg-emerald-50/50">Vortex laminaire continu</td>
                </tr>
                <tr>
                  <td className="p-5 font-semibold text-[#0F261E]">Temps d'obtention d'un macérât huileux</td>
                  <td className="p-5 text-center text-slate-500">4 à 6 semaines au soleil</td>
                  <td className="p-5 text-center font-bold text-emerald-700 bg-emerald-50/50">2 à 4 heures sous vide contrôlé</td>
                </tr>
                <tr>
                  <td className="p-5 font-semibold text-[#0F261E]">Garantie constructeur</td>
                  <td className="p-5 text-center text-slate-500">Variable</td>
                  <td className="p-5 text-center font-bold text-emerald-700 bg-emerald-50/50">Garantie 1 an complète</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 4. BRAND HERITAGE & ETHNOBOTANY */}
<section className="heritage-section py-20 md:py-28 bg-[#FAF7F2] border-t border-[#0F261E]/5 relative overflow-hidden">
  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
    <div className="text-center max-w-3xl mx-auto mb-12">
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1C3F34]/10 text-[#1C3F34] text-xs font-bold uppercase tracking-widest mb-4">
        <Compass className="w-3.5 h-3.5 text-[#D97706]" />
        <span>Ethnobotanique & Pharmacopée Ancestrale</span>
      </div>
      <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-[#0F261E] mb-4 tracking-tight">
        L'ingénierie moderne au service des textes fondateurs
      </h2>
    </div>

    <div className="bg-white rounded-3xl p-8 sm:p-12 md:p-14 border border-[#E7DFD3] shadow-xl relative overflow-hidden">
      <div className="absolute top-6 right-8 text-[#D97706]/15 select-none pointer-events-none text-8xl font-serif">“</div>
      
      <div className="max-w-none text-[#0F261E]/80 space-y-6 text-base sm:text-lg leading-relaxed font-light">
        <p className="first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:text-[#1C3F34] first-letter:mr-3 first-letter:float-left">
          La BloomLab n'est pas une invention ex nihilo. Elle est la réponse technologique aux limites des textes fondateurs. Dans l'Ayurveda, la méthode du <em>Taila Paka</em> (cuisson lente des huiles médicinales) exigeait un contrôle visuel et tactile épuisant pour éviter que les plantes ne carbonisent. Dans la pharmacopée chinoise du <em>Shennong Ben Cao Jing</em>, on savait déjà que certaines racines exigeaient des décoctions longues, tandis que les fleurs nécessitaient des infusions flash.
        </p>
        <p>
          Le drame de l'herboristerie occidentale moderne a été de tout réduire à l'eau bouillante, ignorant la <strong>polarité des solvants</strong> et la <strong>thermolabilité des enzymes</strong>. La BloomLab réconcilie la sagesse empirique de l'Orient avec la rigueur de la biochimie du XXIe siècle. Elle permet d'appliquer le <strong>Séquençage Actif A/B</strong> (extraction hydrophile puis lipophile) avec une précision de ±0,5°C que même les meilleurs laboratoires peinent à démocratiser.
        </p>
      </div>

      <div className="mt-8 pt-8 border-t border-[#E7DFD3] flex items-center gap-4 bg-[#FAF7F2] -mx-8 -mb-8 sm:-mx-12 sm:-mb-12 md:-mx-14 md:-mb-14 p-6 sm:p-8 rounded-b-3xl">
        <div className="w-12 h-12 rounded-2xl bg-[#1C3F34] text-white flex items-center justify-center shrink-0 shadow-md">
          <Activity className="w-6 h-6 text-[#D97706]" />
        </div>
        <p className="text-sm sm:text-base font-serif italic text-[#1C3F34] leading-snug">
          « Nous n'avons pas réinventé la plante. Nous avons domestiqué la cinétique d'extraction pour que le Totum arrive intact jusqu'à vos récepteurs cellulaires. »
        </p>
      </div>
    </div>
  </div>
</section>

      {/* 5. THE 3 DOMAINS OF APPLICATION */}
      <section id="niveaux" className="py-20 md:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-black uppercase tracking-[0.25em] text-[#D97706] mb-3 block">
              Applications Pratiques
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0F261E] mb-4">
              {lang === 'fr' 
                ? "Préservez le Totum des Plantes Médicinales : Macération Huileuse, Teinture, Décoction & Infusion" 
                : lang === 'de' 
                ? "Das pflanzliche Totum von Heilpflanzen bewahren: Ölauszug, Tinktur, Dekokt & Aufguss" 
                : "Preserve the Totum of Medicinal Plants: Oil Maceration, Tincture, Decoction & Infusion"}
            </h2>
            <p className="text-base text-[#0F261E]/70">
              Un seul instrument polyvalent pour vos remèdes naturels maison, vos plantes adaptogènes de terrain, vos soins cosmétiques et vos préparations culinaires d'exception.
            </p>
          </div>

          <div className="space-y-12">
            {/* Niveau 1: Culinaire */}
            <div className="grid lg:grid-cols-[1fr_420px] gap-10 items-center bg-[#FAF7F2] rounded-3xl p-8 md:p-12 border border-[#0F261E]/5 shadow-xs">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-[#D97706]/10 rounded-2xl flex items-center justify-center text-[#D97706]">
                    <Utensils className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#D97706] block">Niveau 1</span>
                    <h3 className="text-xl md:text-2xl font-bold text-[#0F261E]">{t.levels?.lvl1?.title || "Gastronomie & Huiles Vivantes"}</h3>
                  </div>
                </div>
                <p className="text-base text-[#0F261E]/75 mb-6 leading-relaxed italic">
                  {t.levels?.lvl1?.quote || "Transformez vos huiles d'olive et beurres en concentrés aromatiques et nutritifs."}
                </p>
                <p className="text-sm text-[#0F261E]/70 mb-6 leading-relaxed">
                  {t.levels?.lvl1?.description || "Extraction d'herbes aromatiques fraîches ou séchées sans goût de brûlé ni amertume thermique."}
                </p>
                <button 
                  onClick={() => onNavigate('culinaire')} 
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#0F261E] hover:bg-[#D97706] text-white rounded-xl text-sm font-bold transition-all cursor-pointer"
                >
                  <span>{t.levels?.lvl1?.cta || "Voir les recettes culinaires"}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              <div 
                className="relative min-h-[360px] sm:min-h-[440px] h-[400px] sm:h-[460px] rounded-2xl overflow-hidden bg-slate-200 cursor-zoom-in group"
                onClick={() => setFullscreenImage("https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=800")}
              >
                <img 
                  src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=800" 
                  alt="Application Culinaire" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <Maximize2 className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            {/* Niveau 2: Cosmétique */}
            <div className="grid lg:grid-cols-[420px_1fr] gap-10 items-center bg-[#FAF7F2] rounded-3xl p-8 md:p-12 border border-[#0F261E]/5 shadow-xs">
              <div 
                className="relative min-h-[360px] sm:min-h-[440px] h-[400px] sm:h-[460px] rounded-2xl overflow-hidden bg-slate-200 cursor-zoom-in group order-2 lg:order-1"
                onClick={() => setFullscreenImage(bloomSoinsImg)}
              >
                <img 
                  src={bloomSoinsImg} 
                  alt="Soins et Dermo-Cosmétique" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <Maximize2 className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-[#D97706]/10 rounded-2xl flex items-center justify-center text-[#D97706]">
                    <FlaskConical className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#D97706] block">Niveau 2</span>
                    <h3 className="text-xl md:text-2xl font-bold text-[#0F261E]">{t.levels?.lvl2?.title || "Dermo-Cosmétique & Macérâts Actifs"}</h3>
                  </div>
                </div>
                <p className="text-base text-[#0F261E]/75 mb-6 leading-relaxed italic">
                  {t.levels?.lvl2?.quote || "Créez vos sérums, baumes et huiles de soin purs sans conservateurs ni additifs pétrochimiques."}
                </p>
                <p className="text-sm text-[#0F261E]/70 mb-6 leading-relaxed">
                  {t.levels?.lvl2?.description || "Macérâts de calendula, de pâquerette ou de millepertuis préparés en quelques heures avec une fraîcheur absolue."}
                </p>
                <button 
                  onClick={() => onNavigate('cosmetiques')} 
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#0F261E] hover:bg-[#D97706] text-white rounded-xl text-sm font-bold transition-all cursor-pointer"
                >
                  <span>{t.levels?.lvl2?.cta || "Découvrir les cosmétiques"}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Niveau 3: Phytothérapie de Terrain (Optimized for Reset Protocol) */}
<div className="grid lg:grid-cols-[1fr_420px] gap-10 items-center bg-[#FAF7F2] rounded-3xl p-8 md:p-12 border border-[#D97706]/20 shadow-sm">
  <div>
    <div className="flex items-center gap-3 mb-4">
      <div className="w-12 h-12 bg-[#D97706]/10 rounded-2xl flex items-center justify-center text-[#D97706]">
        <Activity className="w-6 h-6" />
      </div>
      <div>
        <span className="text-[10px] font-black uppercase tracking-widest text-[#D97706] block">Niveau 3</span>
        <h3 className="text-xl md:text-2xl font-bold text-[#0F261E]">Herboristerie Systémique & Reset</h3>
      </div>
    </div>
    <p className="text-base text-[#0F261E]/75 mb-6 leading-relaxed italic">
      "Ne traitez pas le symptôme, réinitialisez le terrain. La phytothérapie clinique à domicile."
    </p>
    <p className="text-sm text-[#0F261E]/70 mb-6 leading-relaxed">
      Accédez aux protocoles de <strong>Reset Homéostatique (84 jours)</strong>. Ciblez précisément vos terrains biologiques : T1 (Intestin/Leaky Gut), T4 (Axe HPA/Stress), ou T8 (Adipeux Viscéral) avec des extraits hyper-concentrés et biodisponibles.
    </p>
    <button 
      onClick={() => onNavigate('library')} 
      className="inline-flex items-center gap-2 px-6 py-3 bg-[#0F261E] hover:bg-[#D97706] text-white rounded-xl text-sm font-bold transition-all cursor-pointer"
    >
      <span>Explorer les Protocoles Cliniques</span>
      <ArrowRight className="w-4 h-4" />
    </button>
  </div>

              <div 
                className="relative min-h-[360px] sm:min-h-[440px] h-[400px] sm:h-[460px] rounded-2xl overflow-hidden bg-slate-200 cursor-zoom-in group"
                onClick={() => setFullscreenImage(fourMmImg)}
              >
                <img 
                  src={fourMmImg} 
                  alt="Herboristerie Systémique" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <Maximize2 className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. WHAT'S IN THE BOX & 1-YEAR WARRANTY */}
      <section className="py-20 md:py-28 bg-[#FAF7F2]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-black uppercase tracking-[0.25em] text-[#D97706] mb-3 block">
              Équipement Complet
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0F261E] mb-4">
              Ce que contient votre coffret BloomLab®
            </h2>
            <p className="text-base text-[#0F261E]/70">
              Tout le nécessaire pour démarrer vos extractions immédiatement dans des conditions professionnelles.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-[#0F261E]/5 shadow-xs flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-xl bg-[#0F261E]/5 flex items-center justify-center text-[#0F261E] mb-4">
                <Package className="w-6 h-6 text-[#D97706]" />
              </div>
              <h4 className="font-bold text-[#0F261E] mb-1">Unité BloomLab®</h4>
              <p className="text-xs text-[#0F261E]/70">Cuve Inox 304 biocompatible avec régulation numérique ±0,5°C.</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#0F261E]/5 shadow-xs flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-xl bg-[#0F261E]/5 flex items-center justify-center text-[#0F261E] mb-4">
                <Layers className="w-6 h-6 text-[#D97706]" />
              </div>
              <h4 className="font-bold text-[#0F261E] mb-1">Panier Filtrant Inox</h4>
              <p className="text-xs text-[#0F261E]/70">Filtration micrométrique pour séparer le marc végétal avec netteté.</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#0F261E]/5 shadow-xs flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-xl bg-[#0F261E]/5 flex items-center justify-center text-[#0F261E] mb-4">
                <FlaskConical className="w-6 h-6 text-[#D97706]" />
              </div>
              <h4 className="font-bold text-[#0F261E] mb-1">Guide des Protocoles</h4>
              <p className="text-xs text-[#0F261E]/70">Manuel pas-à-pas avec températures et durées pour plus de 50 plantes.</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#0F261E]/5 shadow-xs flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-xl bg-[#0F261E]/5 flex items-center justify-center text-[#0F261E] mb-4">
                <ShieldCheck className="w-6 h-6 text-[#D97706]" />
              </div>
              <h4 className="font-bold text-[#0F261E] mb-1">Garantie 1 An</h4>
              <p className="text-xs text-[#0F261E]/70">Garantie constructeur pièces et main-d'œuvre avec support technique dédié.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. PRICING & FORMULAS (BLOOM COMPLET 59€ & BLOOM LAB 239€) */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-black uppercase tracking-[0.25em] text-[#D97706] mb-3 block">
              Formules & Accompagnement
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0F261E] mb-4">
              {t.pricing?.title || "Choisissez Votre Niveau d'Autonomie"}
            </h2>
            <p className="text-base text-[#0F261E]/70">
              {t.pricing?.subtitle || "De l'équipement autonome au protocole complet guidé."}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
            
            {/* 1. BloomLab Solo (239€ - Machine seule) */}
            <div className="bg-[#FAF7F2] rounded-3xl p-8 border border-[#0F261E]/10 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-[#0F261E]/60 block mb-2">
                  Achat Matériel Seul
                </span>
                <h3 className="text-2xl font-bold text-[#0F261E] mb-2">BloomLab® Solo</h3>
                <p className="text-xs text-[#0F261E]/70 mb-6 leading-relaxed">
                  L'extracteur botanique de laboratoire chez vous pour réaliser vos extractions de plantes en toute autonomie.
                </p>
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-4xl font-black text-[#0F261E]">239€</span>
                  <span className="text-sm line-through text-[#0F261E]/40 font-medium">289€</span>
                  <span className="text-xs bg-[#D97706]/15 text-[#D97706] font-bold px-2.5 py-1 rounded-full">-50€</span>
                </div>
                <ul className="space-y-3 text-xs text-[#0F261E]/80 mb-8">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
                    <span>Extracteur BloomLab® complet Inox 304</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
                    <span>Panier de filtration micrométrique</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
                    <span>Guide complet des protocoles d'extraction</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
                    <span className="font-bold text-[#0F261E]">Garantie constructeur 1 an</span>
                  </li>
                </ul>
              </div>
              <button 
                onClick={() => onNavigate('product-detail', 'bloomlab')}
                className="w-full py-4 bg-[#0F261E] hover:bg-[#D97706] text-white rounded-xl font-bold transition-all text-sm cursor-pointer shadow-md"
              >
                Commander BloomLab Solo (239€)
              </button>
            </div>

            {/* 2. Pack Signature (289€ - Machine + Accessoires + 1ère Cure Totum) */}
            <div className="bg-[#FFF8F0] rounded-3xl p-8 border-2 border-[#D97706] shadow-xl flex flex-col justify-between relative transform lg:-translate-y-2">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#D97706] text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-md">
                Pack Recommandé
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-[#D97706] block mb-2">
                  Équipement + Cure Clé en Main
                </span>
                <h3 className="text-2xl font-bold text-[#0F261E] mb-2">Pack Signature</h3>
                <p className="text-xs text-[#0F261E]/70 mb-6 leading-relaxed">
                  L'extracteur BloomLab® accompagné de la panoplie complète d'apothicaire et d'une cure de plantes pour démarrer immédiatement.
                </p>
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-4xl font-black text-[#0F261E]">289€</span>
                  <span className="text-sm line-through text-[#0F261E]/40 font-medium">389€</span>
                  <span className="text-xs bg-[#D97706]/15 text-[#D97706] font-bold px-2.5 py-1 rounded-full">-100€</span>
                </div>
                <ul className="space-y-3 text-xs text-[#0F261E]/80 mb-8">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
                    <span className="font-bold text-[#0F261E]">Extracteur BloomLab® Inox 304 complet</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
                    <span>Kit accessoires apothicaire (flacons ambrés, entonnoir)</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
                    <span>1 mois de plantes brutes de grade herboristerie</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
                    <span>Accès complet à la Bibliothèque de protocoles</span>
                  </li>
                </ul>
              </div>
              <button 
                onClick={() => onNavigate('product-detail', 'pack-signature')}
                className="w-full py-4 bg-[#D97706] hover:bg-[#b45309] text-white rounded-xl font-bold transition-all text-sm cursor-pointer shadow-lg"
              >
                Choisir le Pack Signature (289€)
              </button>
            </div>

            {/* 3. Abonnement Cures & Protocoles (59€/mois - Sans engagement) */}
            <div className="bg-[#FAF7F2] rounded-3xl p-8 border border-[#0F261E]/10 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-[#0F261E]/60 block mb-2">
                  Abonnement Plantes & Suivi
                </span>
                <h3 className="text-2xl font-bold text-[#0F261E] mb-2">Cures Systémiques</h3>
                <p className="text-xs text-[#0F261E]/70 mb-6 leading-relaxed">
                  Abonnement de plantes sélectionnées selon votre anamnèse, prêtes pour l'infusion ou le BloomLab.
                </p>
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-4xl font-black text-[#0F261E]">59€</span>
                  <span className="text-[#0F261E]/60 font-medium text-sm">/mois</span>
                </div>
                <ul className="space-y-3 text-xs text-[#0F261E]/80 mb-8">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
                    <span>Plantes brutes certifiées livrées chaque mois</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
                    <span>Fiches protocoles A/B et posologies sécurisées</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
                    <span>Suivi d'évolution du terrain avec ALMA</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
                    <span>Sans engagement, pause ou arrêt en 1 clic</span>
                  </li>
                </ul>
              </div>
              <button 
                onClick={() => onNavigate('abonnement')}
                className="w-full py-4 bg-[#0F261E] hover:bg-[#D97706] text-white rounded-xl font-bold transition-all text-sm cursor-pointer shadow-md"
              >
                Découvrir les Abonnements Cures
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* 8. FAQ SECTION (LEVÉE DES OBJECTIONS) */}
      <section className="py-20 md:py-28 bg-[#FAF7F2]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-xs font-black uppercase tracking-[0.25em] text-[#D97706] mb-3 block">
              Questions Fréquentes
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0F261E]">
              Tout ce que vous devez savoir sur BloomLab®
            </h2>
          </div>

          <div className="space-y-4">
            {faqItems.map((item, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div 
                  key={idx} 
                  className="bg-white rounded-2xl border border-[#0F261E]/5 overflow-hidden transition-all shadow-xs"
                >
                  <button
                    type="button"
                    onClick={() => {
                      if (!isOpen) {
                        trackFaqExpand(item.q);
                      }
                      setOpenFaqIndex(isOpen ? null : idx);
                    }}
                    className="w-full text-left p-6 flex items-center justify-between gap-4 font-bold text-[#0F261E] text-base sm:text-lg cursor-pointer hover:text-[#D97706] transition-colors"
                  >
                    <span>{item.q}</span>
                    <span className={`w-8 h-8 rounded-full bg-[#FAF7F2] flex items-center justify-center shrink-0 transition-transform ${isOpen ? 'rotate-180 text-[#D97706]' : 'text-[#0F261E]/60'}`}>
                      ↓
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 text-sm sm:text-base text-[#0F261E]/75 leading-relaxed pt-1 border-t border-slate-50">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 9. FINAL CTA SECTION */}
      <section className="py-20 md:py-28 bg-[#0F261E] text-white text-center relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-6 leading-tight">
            {t.final_cta?.title || "Reprenez le Contrôle de Votre Pharmacie Intérieure"}
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-white/75 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
            {t.final_cta?.description || "Votre corps n'est pas cassé. Il est verrouillé. Donnez-lui simplement les bons outils et la juste extraction."}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => onNavigate('product-detail', 'bloomlab')}
              className="w-full sm:w-auto px-10 py-5 bg-[#D97706] hover:bg-[#b45309] text-white rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-3 cursor-pointer shadow-xl"
            >
              <span>{t.final_cta?.button || "Commander mon BloomLab®"}</span>
              <ChevronRight className="w-5 h-5" />
            </button>
            <button 
              onClick={() => onNavigate('guide')}
              className="w-full sm:w-auto px-10 py-5 bg-white/10 hover:bg-white/15 text-white rounded-2xl font-semibold text-lg transition-all border border-white/20 cursor-pointer"
            >
              {t.final_cta?.guide || "Consulter le Guide Botanique"}
            </button>
          </div>
        </div>
      </section>

      {/* 10. SECTION "L'INGÉNIERIE AU SERVICE DU VIVANT." (FOND VERT SOMBRE ET TEXTE BLANC PARFAITEMENT LISIBLE) */}
      <section 
        className="py-24 bg-[#0F261E] text-white overflow-hidden relative"
        style={{ backgroundColor: '#0F261E', color: '#ffffff' }}
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#D97706]/10 rounded-full blur-[120px] -mr-48 -mt-48 pointer-events-none" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 
            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 leading-tight italic text-white"
            style={{ color: '#ffffff' }}
          >
            {t.vision?.quote || "L'Ingénierie au service du vivant."}
          </h2>
          <p 
            className="text-base sm:text-lg md:text-xl text-white/85 mb-10 leading-relaxed font-light max-w-2xl mx-auto"
            style={{ color: '#e5e7eb' }}
          >
            {t.vision?.p1 || "Nous ne créons pas de solutions miracles. Nous concevons les outils techniques et rigoureux qui permettent à vos cellules de mobiliser leurs propres mécanismes d'homéostasie."}
          </p>
          
          <div className="space-y-5 text-left inline-block max-w-2xl mx-auto">
            <div className="flex items-start gap-4">
              <div 
                className="w-8 h-8 rounded-full bg-[#D97706] flex items-center justify-center shrink-0 mt-1 shadow-md"
                style={{ backgroundColor: '#D97706', color: '#ffffff' }}
              >
                <Check className="w-5 h-5 text-white" />
              </div>
              <p 
                className="text-base sm:text-lg text-white/90"
                style={{ color: '#ffffff' }}
                dangerouslySetInnerHTML={{ __html: t.vision?.check1 || "<strong>Respect absolu de la synergie végétale</strong> : extraction du Totum sans solvant toxique." }}
              />
            </div>
            <div className="flex items-start gap-4">
              <div 
                className="w-8 h-8 rounded-full bg-[#D97706] flex items-center justify-center shrink-0 mt-1 shadow-md"
                style={{ backgroundColor: '#D97706', color: '#ffffff' }}
              >
                <Check className="w-5 h-5 text-white" />
              </div>
              <p 
                className="text-base sm:text-lg text-white/90"
                style={{ color: '#ffffff' }}
                dangerouslySetInnerHTML={{ __html: t.vision?.check2 || "<strong>Souveraineté thérapeutique et préventive</strong> : la maîtrise de vos préparations à domicile." }}
              />
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
