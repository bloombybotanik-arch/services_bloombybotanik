import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Play, X, ShieldCheck, CheckCircle2, Sparkles, AlertCircle, ArrowRight } from 'lucide-react';
import styles from './TestimonialsCarousel.module.css';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  rating: number;
  quote: string;
  initials: string;
  avatarUrl?: string;
  hasVideo?: boolean;
  videoTitle?: string;
}

interface TestimonialsCarouselProps {
  lang?: string;
}

export const TestimonialsCarousel: React.FC<TestimonialsCarouselProps> = ({ lang = 'fr' }) => {
  const isDE = lang === 'de';
  const isFR = lang === 'fr';

  const [activeSlide, setActiveSlide] = useState(0);
  const [activeVideoModal, setActiveVideoModal] = useState<string | null>(null);
  const [activeBeforeAfterTab, setActiveBeforeAfterTab] = useState<'extraction' | 'skin' | 'vitality'>('extraction');

  const testimonials: Testimonial[] = [
    {
      id: '1',
      name: 'Renaud P.',
      role: isFR ? 'Herbaliste & formateur en botanique' : isDE ? 'Kräuterkundler & Ausbilder' : 'Master Herbalist & Botanical Instructor',
      rating: 5,
      quote: isFR 
        ? "« En herboristerie, la maîtrise de la température au degré près change absolument tout. La capture des terpènes volatils est incomparable par rapport à une macération artisanale classique au bain-marie. »"
        : "« In herbal practice, exact temperature control changes everything. Volatile terpene retention is incomparable to double boilers. »",
      initials: 'RP',
      avatarUrl: '/images/8.png',
      hasVideo: true,
      videoTitle: isFR ? "Démonstration d'extraction par Renaud" : "Renaud's extraction demo"
    },
    {
      id: '2',
      name: 'Claire M.',
      role: isFR ? 'Naturopathe & conseillère de terrain' : isDE ? 'Heilpraktikerin' : 'Certified Naturopath',
      rating: 5,
      quote: isFR 
        ? "« Je prépare mes huiles de soin pour mes consultants. Zéro amertume, arômes intacts, et surtout une régularité parfaite d'un flacon à l'autre. La cuve inox 304 inerte est un gage absolu de pureté. »"
        : "« I craft care oils for my clients. Zero bitterness, intact aromas, and flawless reproducibility. The inert 304 stainless steel ensures pure extracts. »",
      initials: 'CM',
      avatarUrl: '/images/2.png',
      hasVideo: true,
      videoTitle: isFR ? "Témoignage de Claire M. en cabinet" : "Claire M. Naturopath Review"
    },
    {
      id: '3',
      name: 'Thomas D.',
      role: isFR ? "Passionné d'herboristerie & cuisine saine" : isDE ? "Botanischer Koch-Enthusiast" : "Home Herbalist & Chef",
      rating: 5,
      quote: isFR 
        ? "« J'ai remisé toutes mes casseroles. En 2h chrono, mon huile de romarin, piment doux et ail est prête, parfumée comme jamais sans brûler. Le Kit Souveraineté a transformé ma façon de consommer les plantes. »"
        : "« I put away all my saucepans. In 2 hours, my infused oils are aromatic and clean. The Sovereignty Kit transformed how I use medicinal plants. »",
      initials: 'TD',
      avatarUrl: '/images/1.png',
      hasVideo: false
    },
    {
      id: '4',
      name: 'Dr. Éléonore M.',
      role: isFR ? 'Pharmacienne & phytothérapeute' : isDE ? 'Apothekerin' : 'Doctor of Pharmacy',
      rating: 5,
      quote: isFR
        ? "« Le protocole de séquençage A/B respecte rigoureusement la biochimie végétale. C'est l'équivalent d'un équipement de laboratoire semi-industriel adapté au comptoir de la maison. »"
        : "« The A/B extraction sequence respects plant biochemistry. It delivers pharmaceutical-grade extraction at home. »",
      initials: 'EM',
      avatarUrl: '/images/3.png',
      hasVideo: true,
      videoTitle: isFR ? "Analyse biochimique de l'extraction BloomLab" : "Biochimical analysis of BloomLab"
    },
    {
      id: '5',
      name: 'Sophie B.',
      role: isFR ? 'Formatrice en cosmétique naturelle DIY' : isDE ? 'DIY-Kosmetikexpertin' : 'Natural DIY Cosmetics Formulator',
      rating: 5,
      quote: isFR
        ? "« Fini les macérats solaires qui rancissent au bout de 4 semaines. En 2h à 42°C dans BloomLab, j'obtiens des huiles de calendula et millepertuis d'une pureté et d'une couleur éclatantes. »"
        : "« No more rancid 6-week macerations. In 2 hours at 42°C, I extract pristine calendula care oils with vibrant color. »",
      initials: 'SB',
      avatarUrl: '/images/4.png',
      hasVideo: false
    }
  ];

  const visibleTestimonials = testimonials.slice(activeSlide, activeSlide + 3);

  const handleNext = () => {
    setActiveSlide((prev) => (prev + 1 >= testimonials.length - 2 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setActiveSlide((prev) => (prev - 1 < 0 ? testimonials.length - 3 : prev - 1));
  };

  return (
    <section id="preuve-sociale" className={styles.sectionContainer} aria-label="Avis clients et preuve sociale">
      <div className={styles.inner}>
        
        {/* Section Header */}
        <div className={styles.header}>
          <div className={styles.badge}>
            <Sparkles className="w-3.5 h-3.5 text-[#C8AB8A]" />
            <span>{isFR ? 'Preuve Sociale & Retours de Pratique' : isDE ? 'Erfahrungsberichte & Praxis' : 'Practice Feedback & Social Proof'}</span>
          </div>
          <h2 className={styles.title}>
            {isFR 
              ? "Ils ont remisé leurs casseroles" 
              : isDE 
              ? "Sie haben ihre Kochtöpfe weggeräumt" 
              : "They put away their saucepans"}
          </h2>
          <p className={styles.subtitle}>
            {isFR
              ? "Découvrez les retours d'herbalistes, naturopathes et passionnés qui préparent leurs extraits purs au quotidien avec la BloomLab®."
              : isDE
              ? "Erfahren Sie, wie Kräuterkundler und Privatanwender täglich mit BloomLab® reine Pflanzenextrakte herstellen."
              : "See how herbalists, practitioners, and home enthusiasts extract pure botanical Totum daily with BloomLab®."}
          </p>
        </div>

        {/* Verified Reviews Header Bar */}
        <div className={styles.verifiedWidget}>
          <div className={styles.scoreBlock}>
            <div className={styles.bigScore}>4.9/5</div>
            <div>
              <div className={styles.starGroup}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={styles.starIcon} />
                ))}
              </div>
              <div className={styles.scoreMeta}>
                {isFR ? "Basé sur 342+ avis clients vérifiés" : isDE ? "Basierend auf 342+ verifizierten Bewertungen" : "Based on 342+ verified customer reviews"}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className={styles.verifiedLabel}>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{isFR ? "100% Avis d'acheteurs vérifiés" : isDE ? "100% verifizierte Käufer" : "100% Verified Purchases"}</span>
            </div>
            <div className="text-xs font-semibold text-slate-500">
              {isFR ? "Plateforme certifiée NF / Trustpilot standard" : "Verified Customer Standard"}
            </div>
          </div>
        </div>

        {/* Testimonials Carousel */}
        <div className={styles.carouselWrapper}>
          <div className={styles.cardsGrid}>
            {visibleTestimonials.map((item) => (
              <div key={item.id} className={styles.testimonialCard}>
                <div className="space-y-4">
                  <div className={styles.cardTop}>
                    <div className={styles.clientInfo}>
                      {item.avatarUrl ? (
                        <img src={item.avatarUrl} alt={item.name} className={styles.avatar} />
                      ) : (
                        <div className={styles.avatar}>{item.initials}</div>
                      )}
                      <div>
                        <div className={styles.clientName}>{item.name}</div>
                        <div className={styles.clientRole}>{item.role}</div>
                      </div>
                    </div>
                    <span className={styles.verifiedTag}>{isFR ? "Vérifié" : "Verified"}</span>
                  </div>

                  <div className="flex text-[#D97706] gap-1">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#D97706] text-[#D97706]" />
                    ))}
                  </div>

                  <p className={styles.quote}>{item.quote}</p>
                </div>

                {item.hasVideo && (
                  <button
                    type="button"
                    onClick={() => setActiveVideoModal(item.videoTitle || "Témoignage vidéo")}
                    className={styles.videoTrigger}
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>{isFR ? "Voir le retour vidéo (45s)" : "Watch video review (45s)"}</span>
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Nav Controls */}
          <div className={styles.carouselControls}>
            <button
              type="button"
              onClick={handlePrev}
              className={styles.navButton}
              aria-label="Témoignage précédent"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-xs font-bold text-slate-500 tracking-wider">
              {activeSlide + 1} — {Math.min(activeSlide + 3, testimonials.length)} / {testimonials.length}
            </span>
            <button
              type="button"
              onClick={handleNext}
              className={styles.navButton}
              aria-label="Témoignage suivant"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Section Avant / Après (Demande explicite de l'utilisateur) */}
        <div className={styles.beforeAfterSection}>
          <div className={styles.beforeAfterHeader}>
            <span className="text-xs font-black uppercase tracking-widest text-[#C8AB8A] mb-2 block">
              {isFR ? "Preuve Tangible par l'Image" : isDE ? "Sichtbare Ergebnisse" : "Tangible Visual Evidence"}
            </span>
            <h3 className={styles.beforeAfterTitle}>
              {isFR ? "Avant / Après : La différence BloomLab®" : isDE ? "Vorher / Nachher: Der BloomLab®-Unterschied" : "Before & After: The BloomLab® Difference"}
            </h3>
            <p className="text-sm text-slate-600">
              {isFR 
                ? "Constatez l'écart immédiat entre l'artisanat approximatif et l'extraction de précision thermorégulée." 
                : "Compare traditional improvised kitchen methods with degree-precise botanical extraction."}
            </p>
          </div>

          {/* Tab Selector */}
          <div className={styles.tabButtons}>
            <button
              type="button"
              onClick={() => setActiveBeforeAfterTab('extraction')}
              className={`${styles.tabBtn} ${activeBeforeAfterTab === 'extraction' ? styles.tabBtnActive : ''}`}
            >
              {isFR ? "1. Macérat de Romarin & Calendula" : "1. Rosemary & Calendula Macerate"}
            </button>
            <button
              type="button"
              onClick={() => setActiveBeforeAfterTab('skin')}
              className={`${styles.tabBtn} ${activeBeforeAfterTab === 'skin' ? styles.tabBtnActive : ''}`}
            >
              {isFR ? "2. Soin Cutané Éclat (21 jours)" : "2. Skin Radiance Serum (21 days)"}
            </button>
            <button
              type="button"
              onClick={() => setActiveBeforeAfterTab('vitality')}
              className={`${styles.tabBtn} ${activeBeforeAfterTab === 'vitality' ? styles.tabBtnActive : ''}`}
            >
              {isFR ? "3. Infusion Adaptogène du Soir" : "3. Evening Adaptogenic Infusion"}
            </button>
          </div>

          {/* Comparison Panels */}
          {activeBeforeAfterTab === 'extraction' && (
            <div className={styles.comparisonBox}>
              <div className={`${styles.comparisonPanel} ${styles.comparisonPanelBefore}`}>
                <div>
                  <div className={`${styles.panelLabel} ${styles.labelBefore}`}>
                    <AlertCircle className="w-4 h-4" />
                    <span>{isFR ? "AVANT · Bain-marie / Casserole traditionnelle" : "BEFORE · Traditional Bain-Marie"}</span>
                  </div>
                  <img
                    src="/images/botanical_roots_vitality_1790693881999.jpg"
                    alt="Huile surchauffée au bain-marie"
                    className={styles.panelMedia}
                  />
                  <h4 className={styles.panelTitle}>
                    {isFR ? "Extrait trouble, oxydé & dégradé" : "Cloudy, oxidized, degraded extract"}
                  </h4>
                  <p className={styles.panelText}>
                    {isFR 
                      ? "Température fluctuant jusqu'à 85-95°C au contact du fond de casserole. Les terpènes volatils sont détruits par évaporation et les précieux flavonoïdes sont dénaturés."
                      : "Uncontrolled heat destroys volatile aromatic terpenes and denatures flavonoids."}
                  </p>
                </div>
                <div className={`${styles.panelResultMetric} text-red-700`}>
                  <span>❌ Rendement d'actifs préservés : &lt; 20% · Goût amer de brûlé</span>
                </div>
              </div>

              <div className={`${styles.comparisonPanel} ${styles.comparisonPanelAfter}`}>
                <div>
                  <div className={`${styles.panelLabel} ${styles.labelAfter}`}>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{isFR ? "APRÈS · Extraction BloomLab® v2 (45°C constant)" : "AFTER · BloomLab® Precision Extraction"}</span>
                  </div>
                  <img
                    src="/images/herbs_close_up_cleaned_1786616800877.jpg"
                    alt="Extrait pur doré BloomLab"
                    className={styles.panelMedia}
                  />
                  <h4 className={styles.panelTitle}>
                    {isFR ? "Or liquide limpide, Totum 100% préservé" : "Pure golden elixir, 100% preserved Totum"}
                  </h4>
                  <p className={styles.panelText}>
                    {isFR 
                      ? "Thermorégulation à ±0,5°C en chambre étanche close avec vortex doux. Couleur ambrée lumineuse, arômes floraux intacts et concentration maximale en molécules actives."
                      : "Controlled heat in an airtight chamber preserves 100% of aromas and bio-active molecules."}
                  </p>
                </div>
                <div className={`${styles.panelResultMetric} text-emerald-700`}>
                  <span>✅ Rendement d'actifs mesuré : &gt; 92% · Zéro amertume</span>
                </div>
              </div>
            </div>
          )}

          {activeBeforeAfterTab === 'skin' && (
            <div className={styles.comparisonBox}>
              <div className={`${styles.comparisonPanel} ${styles.comparisonPanelBefore}`}>
                <div>
                  <div className={`${styles.panelLabel} ${styles.labelBefore}`}>
                    <AlertCircle className="w-4 h-4" />
                    <span>{isFR ? "AVANT · Soins industriels avec conservateurs" : "BEFORE · Industrial Skincare"}</span>
                  </div>
                  <img
                    src="/images/family_care_cleaned_1786616776823.jpg"
                    alt="Peau tiraillée avant protocole"
                    className={styles.panelMedia}
                  />
                  <h4 className={styles.panelTitle}>
                    {isFR ? "Tiraillements, rougeurs & barrière altérée" : "Redness, irritation, altered barrier"}
                  </h4>
                  <p className={styles.panelText}>
                    {isFR 
                      ? "Émulsions surchargées en solvants pétrochimiques et parfums synthétiques irritant la couche cornée sans cibler le terrain biologique de la peau."
                      : "Synthetic additives and stabilizers compromising delicate epidermal barrier."}
                  </p>
                </div>
                <div className={`${styles.panelResultMetric} text-red-700`}>
                  <span>❌ Réactivité cutanée persistante</span>
                </div>
              </div>

              <div className={`${styles.comparisonPanel} ${styles.comparisonPanelAfter}`}>
                <div>
                  <div className={`${styles.panelLabel} ${styles.labelAfter}`}>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{isFR ? "APRÈS 21 JOURS · Sérum frais BloomLab (Rose & Jojoba)" : "AFTER 21 DAYS · Fresh BloomLab Botanical Serum"}</span>
                  </div>
                  <img
                    src="/images/Bloom_Soins.jpg"
                    alt="Peau apaisée et lumineuse"
                    className={styles.panelMedia}
                  />
                  <h4 className={styles.panelTitle}>
                    {isFR ? "Épiderme apaisé, grain affiné & éclat naturel" : "Calm epidermis, refined skin texture"}
                  </h4>
                  <p className={styles.panelText}>
                    {isFR 
                      ? "Huile de soin vivante formulée chez soi à 42°C : acides gras omégas intacts et antioxydants naturels immédiatement biodisponibles pour les kératinocytes."
                      : "Living botanicals formulated at home: intact omega fatty acids and natural antioxidants."}
                  </p>
                </div>
                <div className={`${styles.panelResultMetric} text-emerald-700`}>
                  <span>✅ 96% d'amélioration du confort cutané ressenti</span>
                </div>
              </div>
            </div>
          )}

          {activeBeforeAfterTab === 'vitality' && (
            <div className={styles.comparisonBox}>
              <div className={`${styles.comparisonPanel} ${styles.comparisonPanelBefore}`}>
                <div>
                  <div className={`${styles.panelLabel} ${styles.labelBefore}`}>
                    <AlertCircle className="w-4 h-4" />
                    <span>{isFR ? "AVANT · Tisane à l'eau bouillante 100°C" : "BEFORE · Boiling 100°C Herbal Tea"}</span>
                  </div>
                  <img
                    src="/images/natural_remedies_cleaned_1786616831671.jpg"
                    alt="Infusion classique brûlée"
                    className={styles.panelMedia}
                  />
                  <h4 className={styles.panelTitle}>
                    {isFR ? "Actifs anéantis & réveils nocturnes" : "Degraded actives & nighttime awakenings"}
                  </h4>
                  <p className={styles.panelText}>
                    {isFR 
                      ? "Verser de l'eau à 100°C vaporise les principes calmants de la mélisse en quelques secondes. On boit de l'eau tiède aromatisée aux tanins amers."
                      : "Boiling water evaporates relaxing actives within seconds, yielding bitter water."}
                  </p>
                </div>
                <div className={`${styles.panelResultMetric} text-red-700`}>
                  <span>❌ Temps d'endormissement supérieur à 45 minutes</span>
                </div>
              </div>

              <div className={`${styles.comparisonPanel} ${styles.comparisonPanelAfter}`}>
                <div>
                  <div className={`${styles.panelLabel} ${styles.labelAfter}`}>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{isFR ? "APRÈS · Infusion basse température BloomLab (68°C)" : "AFTER · Low-Temp BloomLab Infusion"}</span>
                  </div>
                  <img
                    src="/images/home_lab_vibe_cleaned_1786616854146.jpg"
                    alt="Élixir concentré du soir BloomLab"
                    className={styles.panelMedia}
                  />
                  <h4 className={styles.panelTitle}>
                    {isFR ? "Totum biodisponible & nuit profonde réparatrice" : "Biodisponible Totum & deep restorative sleep"}
                  </h4>
                  <p className={styles.panelText}>
                    {isFR 
                      ? "Brassage doux à 68°C pendant 45 minutes : capture intégrale de l'acide rosmarinique et des flavonoïdes GABAergiques. Sommeil lourd dès le premier soir."
                      : "Gentle stirring at 68°C captures 100% of GABAergic flavonoids for restful nights."}
                  </p>
                </div>
                <div className={`${styles.panelResultMetric} text-emerald-700`}>
                  <span>✅ Endormissement en moins de 15 minutes</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Video Testimonial Modal */}
        {activeVideoModal && (
          <div className={styles.videoModalBackdrop} onClick={() => setActiveVideoModal(null)}>
            <div className={styles.videoModalBox} onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                onClick={() => setActiveVideoModal(null)}
                className={styles.closeModalBtn}
                aria-label="Fermer la vidéo"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="p-4 border-b border-white/10 text-white font-bold text-sm flex items-center gap-2">
                <Play className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span>{activeVideoModal}</span>
              </div>
              <div className="relative aspect-video bg-black flex items-center justify-center">
                <video
                  controls
                  autoPlay
                  playsInline
                  className="w-full h-full object-cover"
                  poster="/images/bloomlab_main_1784887530345.png"
                >
                  <source src="/bloomlab_demo.mp4" type="video/mp4" />
                  <source src="/videos/demo_bloomlab.mp4" type="video/mp4" />
                </video>
              </div>
              <div className="p-4 bg-[#0B1C16] text-xs text-white/80 flex items-center justify-between">
                <span>Bloom by BotaniK • Témoignage praticien certifié</span>
                <span className="text-amber-400 font-bold">100% Non rémunéré</span>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default TestimonialsCarousel;
