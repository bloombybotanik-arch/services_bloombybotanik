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
  Compass
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { translations, Language } from './translations';

const heroViews = [
  { id: 'v1', label: 'Vue 1', src: '/images/8.webp', fallbackSrc: '/images/8.png', subtitle: 'Plante' },
  { id: 'v2', label: 'Vue 2', src: '/images/1.webp', fallbackSrc: '/images/1.png', subtitle: 'Infusion' },
  { id: 'v3', label: 'Vue 3', src: '/images/2.webp', fallbackSrc: '/images/2.png', subtitle: 'Totum' },
  { id: 'v4', label: 'Vue 4', src: '/images/5.webp', fallbackSrc: '/images/5.png', subtitle: 'Précision' },
];
const heroImg1 = heroViews[0].src;
const bloomSoinsImg = "/assets/images/Bloom_Soins.jpg";
const fourMmImg = "/assets/images/4MM.jpg";

export default function MachineLanding({ onNavigate, lang }: { onNavigate: (view: any, param?: string) => void, lang: Language }) {
  const t = translations[lang].machine;
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);
  const [selectedHeroImage, setSelectedHeroImage] = useState<string>(heroViews[0].src);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const activeView = heroViews.find(v => v.src === selectedHeroImage || v.fallbackSrc === selectedHeroImage) || heroViews[0];

  const faqItems = (t as any).faq || [];

  return (
    <div className="animate-in fade-in duration-700 bg-[#FAF7F2] text-[#0F261E]">
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
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          {/* Hero Image with Overlay: Header Texts (Top) & Gallery Links (Bottom-Left) */}
          <div className="flex flex-col items-center mb-12">
            <div 
              className="relative rounded-3xl overflow-hidden border border-white/15 bg-white/5 shadow-2xl w-full max-w-5xl h-[380px] sm:h-[440px] md:h-[480px] min-h-[380px] sm:min-h-[440px] md:min-h-[480px] cursor-zoom-in group"
              onClick={() => setFullscreenImage(selectedHeroImage)}
            >
              <picture>
                <source type="image/webp" srcSet={activeView.src} />
                <img 
                  src={activeView.fallbackSrc} 
                  alt={`${activeView.label} - ${activeView.subtitle}`} 
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
              <div className="absolute top-5 left-5 right-5 sm:top-8 sm:left-8 sm:right-8 z-20 space-y-2 sm:space-y-3 max-w-3xl pointer-events-none">
                <div className="inline-flex items-center gap-2 bg-black/60 backdrop-blur-md text-[#D97706] px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-widest border border-white/20 shadow-lg">
                  <Zap className="w-3.5 h-3.5 text-[#D97706]" /> 
                  <span>Souveraineté Botanique — Méthode A/B</span>
                </div>

                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight tracking-tight drop-shadow-md">
                  {lang === 'fr' ? (
                    <>L'art de l'extraction botanique : libérer le potentiel de vos plantes</>
                  ) : lang === 'de' ? (
                    <>Die Kunst der botanischen Extraktion: Das Potenzial Ihrer Pflanzen freisetzen</>
                  ) : (
                    <>The art of botanical extraction: unlocking your plants' potential</>
                  )}
                </h1>
              </div>

              {/* 4 Image Selector Links on bottom-left: Vue 1 (Plante), Vue 2 (Infusion), Vue 3 (Totum), Vue 4 (Précision) */}
              <div className="absolute bottom-3 left-3 sm:bottom-5 sm:left-5 z-20 flex flex-wrap items-center gap-1.5 sm:gap-2.5 max-w-[calc(100%-110px)]">
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
                      className={`flex items-center gap-1.5 sm:gap-2 p-1 sm:p-1.5 pr-2.5 sm:pr-3.5 rounded-xl border transition-all cursor-pointer backdrop-blur-md ${
                        isSelected 
                          ? 'bg-black/80 border-[#D97706] shadow-xl text-white ring-2 ring-[#D97706]/70' 
                          : 'bg-black/50 border-white/20 text-white/80 hover:text-white hover:bg-black/75 hover:border-white/40'
                      }`}
                    >
                      <picture>
                        <source type="image/webp" srcSet={view.src} />
                        <img 
                          src={view.fallbackSrc} 
                          alt={view.label} 
                          loading="lazy"
                          decoding="async"
                          className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg object-cover" 
                        />
                      </picture>
                      <div className="text-left text-xs">
                        <p className="font-bold text-[10px] sm:text-xs leading-tight text-white">{view.label}</p>
                        <p className="text-[9px] sm:text-[10px] text-[#D97706] font-medium leading-tight">{view.subtitle}</p>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Bottom-Right Zoom Trigger */}
              <div className="absolute bottom-3 right-3 sm:bottom-5 sm:right-5 z-20 flex items-center gap-2 text-white text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setFullscreenImage(selectedHeroImage)}
                  className="bg-black/60 hover:bg-black/80 backdrop-blur-md px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full border border-white/20 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-lg"
                >
                  <Maximize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#D97706]" /> 
                  <span>{lang === 'fr' ? "Agrandir" : "Zoom"}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Suivit du texte */}
          <div className="max-w-3xl mx-auto space-y-8 text-center sm:text-left">
            {/* Texte historique : Le naturel ne doit plus être approximatif */}
            <div className="p-6 md:p-8 rounded-3xl bg-white/[0.07] border border-white/15 space-y-4 backdrop-blur-xs">
              <div className="flex items-center gap-2 text-[#D97706] text-xs font-bold uppercase tracking-widest">
                <Compass className="w-4 h-4" />
                <span>
                  {(t.hero as any).history_badge || "Héritage Millénaire & Rigueur Botanique"}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white leading-snug">
                {(t.hero as any).history_title || "Le naturel ne doit plus être approximatif."}
              </h3>
              <p className="text-base sm:text-lg text-white/95 leading-relaxed font-serif italic">
                {(t.hero as any).history_subtitle || "Il y a 5 000 ans, l'Asie savait déjà tout de l'extraction."}
              </p>
              <p className="text-sm sm:text-base text-white/80 leading-relaxed font-light">
                {(t.hero as any).history_p1 || "En Médecine Traditionnelle Chinoise comme en Ayurveda, l'extraction n'était ni un geste approximatif, ni une habitude de cuisine. C'était un art codifié, où le temps, le feu et la matière obéissaient à des règles précises. Décoctions longuement mijotées, macérations à feu doux, résines travaillées avec patience : les praticiens d'Orient savaient qu'une plante trahie par la chaleur est une plante qui perd son intelligence."}
              </p>
              <p className="text-sm sm:text-base text-[#D97706] font-medium">
                {(t.hero as any).history_p2 || "Ce savoir a fondé l'herboristerie du monde."}
              </p>
            </div>

            <div className="space-y-4 text-base sm:text-lg text-white/85 leading-relaxed font-light">
              <p>
                Libérez jusqu'à 98% des actifs de vos plantes. Avec BloomLab, vous ne faites plus “chauffer une plante”, vous libérez réellement ses principes actifs dans des conditions proches d’un laboratoire. La température est maintenue au degré près : assez élevée pour optimiser l’extraction des phytocomposés (polyphénols, flavonoïdes, huiles essentielles…), mais jamais au‑delà des seuils qui les dégradent, ce qui est exactement ce que montrent les études sur l’impact de la température en extraction végétale.
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

      {/* 2. THE PROBLEM (POURQUOI L'EXTRACTION MAISON ÉCHOUE) */}
      <section id="pourquoi-l-infusion-echoue" className="py-20 md:py-28 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-black uppercase tracking-[0.25em] text-[#D97706] mb-3 block">
              Constat Éducatif & Biologique
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0F261E] mb-6 leading-tight">
              Pourquoi l'infusion et le bain-marie artisanaux détruisent l'intelligence des plantes
            </h2>
            <p className="text-base sm:text-lg text-[#0F261E]/70 leading-relaxed font-normal">
              La plupart des gestes traditionnels chauffent trop fort ou trop vite. Sans contrôle cinétique et thermique précis, jusqu'à 80% des molécules actives s'évaporent ou se dégradent avant même d'atteindre votre organisme.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl border border-[#0F261E]/10 shadow-xs flex flex-col">
              <div className="w-12 h-12 rounded-2xl bg-[#D97706]/10 text-[#D97706] flex items-center justify-center mb-6">
                <Flame className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#0F261E] mb-3">Choc Thermique Destructeur</h3>
              <p className="text-sm text-[#0F261E]/70 leading-relaxed flex-1">
                L'eau bouillante (100°C) dénature instantanément les polyphénols fragiles, dégrade les flavonoïdes et volatilise les terpènes légers, transformant votre préparation en eau aromatisée sans action de terrain.
              </p>
              <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-semibold text-rose-700 flex items-center gap-2">
                <span>Perte active : jusqu'à 75%</span>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-[#0F261E]/10 shadow-xs flex flex-col">
              <div className="w-12 h-12 rounded-2xl bg-[#D97706]/10 text-[#D97706] flex items-center justify-center mb-6">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#0F261E] mb-3">Macération Passive & Oxydation</h3>
              <p className="text-sm text-[#0F261E]/70 leading-relaxed flex-1">
                Les macérâts au soleil sur 4 à 6 semaines exposent les lipides à la lumière et à l'oxygène, risquant le rancissement des acides gras essentiels et le développement de moisissures indésirables.
              </p>
              <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-semibold text-amber-700 flex items-center gap-2">
                <span>Risque d'oxydation et instabilité</span>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-[#0F261E]/10 shadow-xs flex flex-col">
              <div className="w-12 h-12 rounded-2xl bg-[#D97706]/10 text-[#D97706] flex items-center justify-center mb-6">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#0F261E] mb-3">Paroi Cellulaire Imperméable</h3>
              <p className="text-sm text-[#0F261E]/70 leading-relaxed flex-1">
                Sans agitation calibrée ni micro-vortex, les principes actifs restent piégés à l'intérieur de la cellulose végétale. Une simple cuillère ne génère pas la force cinétique nécessaire à l'extraction du Totum.
              </p>
              <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-semibold text-slate-600 flex items-center gap-2">
                <span>Rendement insuffisant du végétal</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. THE SYSTEMIC SOLUTION (L'INSTRUMENT DE SOUVERAINETÉ) */}
      <section id="details" className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
            
            <div className="lg:col-span-6 space-y-6 flex flex-col justify-between">
              <div>
                <span className="text-xs font-black uppercase tracking-[0.25em] text-[#D97706] block mb-2">
                  Ingénierie de Précision
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0F261E] leading-tight mb-4">
                  L'Extracteur Botanique Conçu pour Libérer le Totum Végétal
                </h2>
                <p className="text-base sm:text-lg text-[#0F261E]/75 leading-relaxed">
                  Le <strong>BloomLab®</strong> comble le fossé entre la tisane imprécise et la gélule industrielle inerte. En maintenant une stabilité thermique chirurgicale à <strong>±0,5°C</strong> associée à une cinétique de vortex doux, il extrait l'intégralité du profil moléculaire actif dans un environnement stérile et biocompatible.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 pt-2">
                <div className="p-5 bg-[#FAF7F2] rounded-2xl border border-[#0F261E]/5">
                  <div className="flex items-center gap-3 mb-2 font-bold text-[#0F261E] text-base">
                    <ShieldCheck className="w-5 h-5 text-[#D97706]" />
                    <span>Inox 304 Médical</span>
                  </div>
                  <p className="text-xs text-[#0F261E]/70 leading-relaxed">
                    Totalement inerte, sans bisphénol, sans transfert de métaux lourds ni perturbateurs endocriniens.
                  </p>
                </div>

                <div className="p-5 bg-[#FAF7F2] rounded-2xl border border-[#0F261E]/5">
                  <div className="flex items-center gap-3 mb-2 font-bold text-[#0F261E] text-base">
                    <Activity className="w-5 h-5 text-[#D97706]" />
                    <span>Régulation ±0,5°C</span>
                  </div>
                  <p className="text-xs text-[#0F261E]/70 leading-relaxed">
                    Conserve les molécules thermolabiles sensibles sans risque de surchauffe ou de dégradation.
                  </p>
                </div>

                <div className="p-5 bg-[#FAF7F2] rounded-2xl border border-[#0F261E]/5">
                  <div className="flex items-center gap-3 mb-2 font-bold text-[#0F261E] text-base">
                    <FlaskConical className="w-5 h-5 text-[#D97706]" />
                    <span>Multiphasique</span>
                  </div>
                  <p className="text-xs text-[#0F261E]/70 leading-relaxed">
                    Compatible avec l'eau purifiée, les huiles végétales biologiques, la glycérine végétale et l'alcool.
                  </p>
                </div>

                <div className="p-5 bg-[#FAF7F2] rounded-2xl border border-[#0F261E]/5">
                  <div className="flex items-center gap-3 mb-2 font-bold text-[#0F261E] text-base">
                    <Sparkles className="w-5 h-5 text-[#D97706]" />
                    <span>Vortex Cinétique</span>
                  </div>
                  <p className="text-xs text-[#0F261E]/70 leading-relaxed">
                    Permet jusqu'à 98% d'extraction des phytocomposés solubles sans broyage agressif des fibres.
                  </p>
                </div>
              </div>
            </div>

            {/* Video Column: vertically aligned with the left column and text cards */}
            <div className="lg:col-span-6 relative flex flex-col">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-[#0F261E]/10 bg-[#0F261E] flex-1 w-full min-h-[460px] lg:min-h-full">
                <video 
                  poster={heroImg1}
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                  title="BloomLab - Démonstration d'extraction thermique contrôlée"
                  className="w-full h-full object-cover min-h-[460px] lg:min-h-full" 
                >
                  <source src="/videos/demo_bloomlab.mp4" type="video/mp4" />
                </video>
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-xs text-white text-xs font-semibold px-3 py-1.5 rounded-full border border-white/20 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Cycle d'extraction séquentielle A/B en direct
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. COMPARISON TABLE: SCIENCE VS TRADITION */}
      <section className="py-20 md:py-28 bg-[#FAF7F2]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-xs font-black uppercase tracking-[0.25em] text-[#D97706] mb-3 block">
              Rigueur Comparée
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0F261E] mb-4">
              BloomLab vs Méthodes Traditionnelles
            </h2>
            <p className="text-base text-[#0F261E]/70 max-w-2xl mx-auto">
              Mesure concrète des paramètres physiques qui conditionnent la richesse et la biodisponibilité de vos extraits.
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

      {/* 4. BRAND HERITAGE & ASIAN ORIGINS STORY */}
      <section className="heritage-section py-20 md:py-28 bg-[#FAF7F2] border-t border-[#0F261E]/5 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1C3F34]/10 text-[#1C3F34] text-xs font-bold uppercase tracking-widest mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#D97706]" />
              <span>{t.heritage?.badge || "Origines & Sagesse Botanique"}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-[#0F261E] mb-4 tracking-tight">
              {t.heritage?.title || "Un héritage de sagesse pour un monde moderne"}
            </h2>
            <p className="text-base sm:text-lg text-[#D97706] font-medium">
              {t.heritage?.subtitle || "Aux origines asiatiques de l'extraction de précision"}
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 sm:p-12 md:p-14 border border-[#E7DFD3] shadow-xl relative">
            <div className="absolute top-6 right-8 text-[#D97706]/15 select-none pointer-events-none text-8xl font-serif">
              “
            </div>
            
            <div className="max-w-none text-[#0F261E]/80 space-y-6 text-base sm:text-lg leading-relaxed font-light">
              <p className="first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:text-[#1C3F34] first-letter:mr-3 first-letter:float-left">
                {t.heritage?.text || "BloomLab n'est pas une invention occidentale. C'est la réponse moderne à un besoin millénaire né au cœur des traditions botaniques asiatiques. Pendant des siècles, les maîtres herboristes d'Asie ont cherché un moyen d'extraire l'essence parfaite de leurs plantes, sans la brûler ni la gaspiller. La BloomLab est l'aboutissement de cette quête : un outil de précision qui réconcilie la sagesse ancestrale avec la technologie du XXIe siècle. Approuvée d'abord par les experts asiatiques, elle arrive aujourd'hui en Europe pour redonner à chacun le pouvoir de créer ses propres élixirs de soin."}
              </p>
            </div>

            <div className="mt-8 pt-8 border-t border-[#E7DFD3] flex items-center gap-4 bg-[#FAF7F2] -mx-8 -mb-8 sm:-mx-12 sm:-mb-12 md:-mx-14 md:-mb-14 p-6 sm:p-8 rounded-b-3xl">
              <div className="w-12 h-12 rounded-2xl bg-[#1C3F34] text-white flex items-center justify-center shrink-0 shadow-md">
                <Compass className="w-6 h-6 text-[#D97706]" />
              </div>
              <p className="text-sm sm:text-base font-serif italic text-[#1C3F34] leading-snug">
                {t.heritage?.quote || "« Extraire sans brûler, révéler sans dénaturer : l'alliance de la tradition herboriste asiatique et de la thermorégulation contemporaine. »"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. THE 3 DOMAINS OF APPLICATION */}
      <section id="niveaux" className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-black uppercase tracking-[0.25em] text-[#D97706] mb-3 block">
              Applications Pratiques
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0F261E] mb-4">
              3 Dimensions d'Autonomie pour Votre Quotidien
            </h2>
            <p className="text-base text-[#0F261E]/70">
              Un seul instrument polyvalent pour vos besoins de terrain, de santé préventive et d'art culinaire.
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

            {/* Niveau 3: Phytothérapie de Terrain */}
            <div className="grid lg:grid-cols-[1fr_420px] gap-10 items-center bg-[#FAF7F2] rounded-3xl p-8 md:p-12 border border-[#D97706]/20 shadow-sm">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-[#D97706]/10 rounded-2xl flex items-center justify-center text-[#D97706]">
                    <Activity className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#D97706] block">Niveau 3</span>
                    <h3 className="text-xl md:text-2xl font-bold text-[#0F261E]">{t.levels?.lvl3?.title || "Herboristerie Systémique de Terrain"}</h3>
                  </div>
                </div>
                <p className="text-base text-[#0F261E]/75 mb-6 leading-relaxed italic">
                  {t.levels?.lvl3?.quote || "Libérez la pharmacie intérieure de votre corps par une biodisponibilité maximale."}
                </p>
                <p className="text-sm text-[#0F261E]/70 mb-6 leading-relaxed">
                  {t.levels?.lvl3?.description || "Préparations ciblées pour les émonctoires, l'équilibre digestif, l'apaisement nerveux et la vitalité articulaire."}
                </p>
                <button 
                  onClick={() => onNavigate('library')} 
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#0F261E] hover:bg-[#D97706] text-white rounded-xl text-sm font-bold transition-all cursor-pointer"
                >
                  <span>{t.levels?.lvl3?.cta || "Explorer la bibliothèque de recettes"}</span>
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            
            {/* 1. Bloom Lab (Machine Seule ou Formule Équipée) */}
            <div className="bg-[#FAF7F2] rounded-3xl p-8 border border-[#0F261E]/10 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-[#0F261E]/60 block mb-2">
                  Autonomie Totale
                </span>
                <h3 className="text-2xl font-bold text-[#0F261E] mb-2">Bloom Lab</h3>
                <p className="text-xs text-[#0F261E]/70 mb-6 leading-relaxed">
                  L'extracteur botanique de laboratoire chez vous pour réaliser vos extractions de plantes en toute liberté.
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
                    <span>Guide des protocoles thermiques inclus</span>
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
                Commander l'extracteur BloomLab
              </button>
            </div>

            {/* 2. Bloom Complet (Recommended Central Offer 59€/mois) */}
            <div className="bg-[#FFF8F0] rounded-3xl p-8 border-2 border-[#D97706] shadow-xl flex flex-col justify-between relative transform lg:-translate-y-2">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#D97706] text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-md">
                Formule Recommandée
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-[#D97706] block mb-2">
                  Protocole Intégral
                </span>
                <h3 className="text-2xl font-bold text-[#0F261E] mb-2">Bloom Complet</h3>
                <p className="text-xs text-[#0F261E]/70 mb-6 leading-relaxed">
                  Le protocole complet sans contrainte technique : formulations prêtes à l'emploi et suivi de terrain systémique.
                </p>
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-4xl font-black text-[#0F261E]">59€</span>
                  <span className="text-[#0F261E]/60 font-medium text-sm">/mois</span>
                </div>
                <ul className="space-y-3 text-xs text-[#0F261E]/80 mb-8">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
                    <span>Protocole systémique personnalisé selon votre anamnèse</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
                    <span>Préparations botaniques pures livrées chaque mois</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
                    <span>Accompagnement continu et ajustement du terrain</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
                    <span>Accès illimité aux conseils de l'Architecte Bloom</span>
                  </li>
                </ul>
              </div>
              <button 
                onClick={() => onNavigate('abonnement')}
                className="w-full py-4 bg-[#D97706] hover:bg-[#b45309] text-white rounded-xl font-bold transition-all text-sm cursor-pointer shadow-lg"
              >
                Choisir Bloom Complet (59€/mois)
              </button>
            </div>

            {/* 3. Essentiel (Budget ou Découverte Douce) */}
            <div className="bg-[#FAF7F2] rounded-3xl p-8 border border-[#0F261E]/10 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-[#0F261E]/60 block mb-2">
                  Démarrage Progressif
                </span>
                <h3 className="text-2xl font-bold text-[#0F261E] mb-2">Essentiel</h3>
                <p className="text-xs text-[#0F261E]/70 mb-6 leading-relaxed">
                  Pour découvrir la démarche et sécuriser les premières habitudes botaniques à votre rythme.
                </p>
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-4xl font-black text-[#0F261E]">29€</span>
                  <span className="text-[#0F261E]/60 font-medium text-sm">/mois</span>
                </div>
                <ul className="space-y-3 text-xs text-[#0F261E]/80 mb-8">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
                    <span>Cure ciblée sur l'axe fondamental prioritaire</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
                    <span>Fiches pédagogiques de posologie et précautions</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
                    <span>Sans engagement, modifiable à tout moment</span>
                  </li>
                </ul>
              </div>
              <button 
                onClick={() => onNavigate('boutique')}
                className="w-full py-4 bg-[#0F261E] hover:bg-[#D97706] text-white rounded-xl font-bold transition-all text-sm cursor-pointer shadow-md"
              >
                Démarrer avec Essentiel
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* 8. FAQ SECTION (LEVÉE DES OBJECTIONS) */}
      <section className="py-20 md:py-28 bg-[#FAF7F2]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
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
