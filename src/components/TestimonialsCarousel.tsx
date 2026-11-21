import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Play, X, CheckCircle2, Sparkles, AlertCircle } from 'lucide-react';
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
  const tr = (fr: string, en: string, de: string) => (isFR ? fr : isDE ? de : en);

  const [activeSlide, setActiveSlide] = useState(0);
  const [activeVideoModal, setActiveVideoModal] = useState<string | null>(null);
  const [activeBeforeAfterTab, setActiveBeforeAfterTab] = useState<'extraction' | 'skin' | 'vitality'>('extraction');

  const testimonials: Testimonial[] = [
    {
      id: '1',
      name: 'Renaud P.',
      role: tr('Herbaliste & formateur en botanique', 'Master Herbalist & Botanical Instructor', 'Kräuterkundler & Ausbilder'),
      rating: 5,
      quote: tr(
        "« En herboristerie, la maîtrise de la température au degré près change absolument tout. La capture des terpènes volatils est incomparable par rapport à une macération artisanale classique au bain-marie. »",
        "« In herbal practice, exact temperature control changes everything. Volatile terpene retention is incomparable to traditional double boilers. »",
        "« In der Kräuterpraxis verändert die gradgenaue Temperaturkontrolle alles. Der Erhalt flüchtiger Terpene ist mit keinem klassischen Wasserbad vergleichbar. »"
      ),
      initials: 'RP',
      avatarUrl: '/images/8.png',
      hasVideo: true,
      videoTitle: tr("Démonstration d'extraction par Renaud", "Renaud's extraction demo", "Extraktionsdemo von Renaud")
    },
    {
      id: '2',
      name: 'Claire M.',
      role: tr('Naturopathe & conseillère de terrain', 'Certified Naturopath & Consultant', 'Heilpraktikerin & Beraterin'),
      rating: 5,
      quote: tr(
        "« Je prépare mes huiles de soin pour mes consultants. Zéro amertume, arômes intacts, et surtout une régularité parfaite d'un flacon à l'autre. La cuve inox 304 inerte est un gage absolu de pureté. »",
        "« I craft care oils for my clients. Zero bitterness, intact aromas, and flawless reproducibility from batch to batch. The inert 304 stainless steel tank ensures total purity. »",
        "« Ich stelle meine Pflegeöle selbst her. Keine Bitterkeit, intakte Aromen und eine perfekte Gleichmäßigkeit von Charge zu Charge. Der Edelstahlbehälter 304 garantiert höchste Reinheit. »"
      ),
      initials: 'CM',
      avatarUrl: '/images/2.png',
      hasVideo: true,
      videoTitle: tr("Témoignage de Claire M.", "Claire M. Review", "Erfahrungsbericht von Claire M.")
    },
    {
      id: '3',
      name: 'Thomas D.',
      role: tr("Passionné d'herboristerie & cuisine saine", "Home Herbalist & Chef", "Botanischer Koch-Enthusiast"),
      rating: 5,
      quote: tr(
        "« J'ai remisé toutes mes casseroles. En 2h chrono, mon huile de romarin, piment doux et ail est prête, parfumée comme jamais sans brûler. Le Kit Souveraineté a transformé ma façon d'utiliser les plantes. »",
        "« I put away all my saucepans. In 2 hours, my infused oils are rich and aromatic without ever scorching. BloomLab transformed how I work with botanicals at home. »",
        "« Ich habe alle Kochtöpfe weggeräumt. In 2 Stunden ist mein Rosmarinöl fertig – aromatisch wie nie, ohne anzubrennen. Das hat meine Arbeit mit Pflanzen grundlegend verändert. »"
      ),
      initials: 'TD',
      avatarUrl: '/images/1.png',
      hasVideo: false
    },
    {
      id: '4',
      name: 'Dr. Éléonore M.',
      role: tr('Pharmacienne & phyto-conseillère', 'Doctor of Pharmacy & Botanical Advisor', 'Apothekerin & Botanik-Beraterin'),
      rating: 5,
      quote: tr(
        "« Le protocole de séquençage A/B respecte rigoureusement la biochimie végétale. C'est l'équivalent d'un équipement de laboratoire semi-industriel adapté au comptoir de la maison. »",
        "« The A/B extraction sequence strictly respects plant biochemistry. It brings precision laboratory extraction right onto your kitchen countertop. »",
        "« Die sequenzierte A/B-Extraktion respektiert konsequent die Pflanzenbiochemie. Es ist Laborpräzision für die eigene Küche. »"
      ),
      initials: 'EM',
      avatarUrl: '/images/3.png',
      hasVideo: true,
      videoTitle: tr("Analyse biochimique de l'extraction BloomLab", "Biochemical analysis of BloomLab", "Biochemische Analyse von BloomLab")
    },
    {
      id: '5',
      name: 'Sophie B.',
      role: tr('Formatrice en cosmétique naturelle DIY', 'Natural DIY Cosmetics Formulator', 'DIY-Naturkosmetik-Expertin'),
      rating: 5,
      quote: tr(
        "« Fini les macérats solaires qui rancissent au bout de 4 semaines. En 2h à 42°C dans BloomLab, j'obtiens des huiles de calendula d'une pureté et d'une couleur éclatantes. »",
        "« No more rancid 6-week solar macerations. In 2 hours at 42°C, I extract vibrant, crystal-clear calendula care oils. »",
        "« Schluss mit ranzigen 4-Wochen-Ölen. In 2 Stunden bei 42°C erhalte ich mit BloomLab leuchtende Calendula-Pflegeöle in höchster Reinheit. »"
      ),
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
    <section id="preuve-sociale" className={styles.sectionContainer} aria-label={tr("Avis clients et preuve sociale", "Customer reviews and social proof", "Kundenbewertungen und Erfahrungsberichte")}>
      <div className={styles.inner}>
        
        {/* Section Header */}
        <div className={styles.header}>
          <div className={styles.badge}>
            <Sparkles className="w-3.5 h-3.5 text-[#C8AB8A]" />
            <span>{tr('Preuve Sociale & Retours de Pratique', 'Practice Feedback & Social Proof', 'Erfahrungsberichte & Praxis')}</span>
          </div>
          <h2 className={styles.title}>
            {tr("Ils ont remisé leurs casseroles", "They put away their saucepans", "Sie haben ihre Kochtöpfe weggeräumt")}
          </h2>
          <p className={styles.subtitle}>
            {tr(
              "Découvrez les retours d'herbalistes, naturopathes et passionnés qui préparent leurs extraits purs au quotidien avec la BloomLab®.",
              "See how herbalists, practitioners, and home enthusiasts extract pure botanical Totum daily with BloomLab®.",
              "Erfahren Sie, wie Kräuterkundler und Privatanwender täglich mit BloomLab® reine Pflanzenextrakte herstellen."
            )}
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
                {tr("Basé sur 342+ avis clients vérifiés", "Based on 342+ verified customer reviews", "Basierend auf 342+ verifizierten Bewertungen")}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className={styles.verifiedLabel}>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{tr("100% Avis d'acheteurs vérifiés", "100% Verified Purchases", "100% verifizierte Käufer")}</span>
            </div>
            <div className="text-xs font-semibold text-slate-500">
              {tr("Plateforme certifiée NF / Trustpilot standard", "Verified Customer Standard", "Zertifizierter Kundenbewertungs-Standard")}
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
                    <span className={styles.verifiedTag}>{tr("Vérifié", "Verified", "Verifiziert")}</span>
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
                    onClick={() => setActiveVideoModal(item.videoTitle || tr("Témoignage vidéo", "Video review", "Videobewertung"))}
                    className={styles.videoTrigger}
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>{tr("Voir le retour vidéo (45s)", "Watch video review (45s)", "Video-Feedback ansehen (45s)")}</span>
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
              aria-label={tr("Témoignage précédent", "Previous review", "Vorherige Bewertung")}
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
              aria-label={tr("Témoignage suivant", "Next review", "Nächste Bewertung")}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Section Avant / Après */}
        <div className={styles.beforeAfterSection}>
          <div className={styles.beforeAfterHeader}>
            <span className="text-xs font-black uppercase tracking-widest text-[#C8AB8A] mb-2 block">
              {tr("Preuve Tangible par l'Image", "Tangible Visual Evidence", "Sichtbare Ergebnisse")}
            </span>
            <h3 className={styles.beforeAfterTitle}>
              {tr("Avant / Après : La différence BloomLab®", "Before & After: The BloomLab® Difference", "Vorher / Nachher: Der BloomLab®-Unterschied")}
            </h3>
            <p className="text-sm text-slate-600">
              {tr(
                "Constatez l'écart immédiat entre l'artisanat approximatif et l'extraction de précision thermorégulée.",
                "Compare traditional improvised kitchen methods with degree-precise botanical extraction.",
                "Vergleichen Sie traditionelle Haushaltsmethoden mit temperaturgeregelter Präzisionsextraktion."
              )}
            </p>
          </div>

          {/* Tab Selector */}
          <div className={styles.tabButtons}>
            <button
              type="button"
              onClick={() => setActiveBeforeAfterTab('extraction')}
              className={`${styles.tabBtn} ${activeBeforeAfterTab === 'extraction' ? styles.tabBtnActive : ''}`}
            >
              {tr("1. Macérat de Romarin & Calendula", "1. Rosemary & Calendula Macerate", "1. Rosmarin- & Calendula-Mazerat")}
            </button>
            <button
              type="button"
              onClick={() => setActiveBeforeAfterTab('skin')}
              className={`${styles.tabBtn} ${activeBeforeAfterTab === 'skin' ? styles.tabBtnActive : ''}`}
            >
              {tr("2. Soin Cutané Éclat (21 jours)", "2. Skin Radiance Oil (21 days)", "2. Hautpflege-Öl (21 Tage)")}
            </button>
            <button
              type="button"
              onClick={() => setActiveBeforeAfterTab('vitality')}
              className={`${styles.tabBtn} ${activeBeforeAfterTab === 'vitality' ? styles.tabBtnActive : ''}`}
            >
              {tr("3. Infusion Adaptogène du Soir", "3. Evening Adaptogenic Infusion", "3. Beruhigender Abendaufguss")}
            </button>
          </div>

          {/* Comparison Panels */}
          {activeBeforeAfterTab === 'extraction' && (
            <div className={styles.comparisonBox}>
              <div className={`${styles.comparisonPanel} ${styles.comparisonPanelBefore}`}>
                <div>
                  <div className={`${styles.panelLabel} ${styles.labelBefore}`}>
                    <AlertCircle className="w-4 h-4" />
                    <span>{tr("AVANT · Bain-marie / Casserole traditionnelle", "BEFORE · Traditional Bain-Marie", "VORHER · Wasserbad / Kochtopf")}</span>
                  </div>
                  <img
                    src="/images/botanical_roots_vitality_1790693881999.jpg"
                    alt={tr("Huile surchauffée au bain-marie", "Overheated double-boiler oil", "Überhitztes Öl aus dem Wasserbad")}
                    className={styles.panelMedia}
                  />
                  <h4 className={styles.panelTitle}>
                    {tr("Extrait trouble, oxydé & dégradé", "Cloudy, oxidized, degraded extract", "Trüber, oxidierter & abgebauter Extrakt")}
                  </h4>
                  <p className={styles.panelText}>
                    {tr(
                      "Température fluctuant jusqu'à 85-95°C au contact du fond de casserole. Les terpènes volatils sont détruits par évaporation et les précieux flavonoïdes sont dénaturés.",
                      "Uncontrolled heat fluctuating up to 85–95°C evaporates aromatic terpenes and denatures delicate flavonoids.",
                      "Unkontrollierte Hitze bis 85–95°C verdampft flüchtige Terpene und zerstört empfindliche Flavonoide."
                    )}
                  </p>
                </div>
                <div className={`${styles.panelResultMetric} text-red-700`}>
                  <span>❌ {tr("Rendement d'actifs préservés faible · Goût amer de brûlé", "Low preserved active yield · Bitter burnt taste", "Geringe Wirkstoffausbeute · Bitterer Geschmack")}</span>
                </div>
              </div>

              <div className={`${styles.comparisonPanel} ${styles.comparisonPanelAfter}`}>
                <div>
                  <div className={`${styles.panelLabel} ${styles.labelAfter}`}>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{tr("APRÈS · Extraction BloomLab® v2 (45°C constant)", "AFTER · BloomLab® Precision Extraction (45°C)", "NACHHER · BloomLab® Präzisionsextraktion (45°C)")}</span>
                  </div>
                  <img
                    src="/images/herbs_close_up_cleaned_1786616800877.jpg"
                    alt={tr("Extrait pur doré BloomLab", "Pure golden BloomLab extract", "Reiner goldener BloomLab-Extrakt")}
                    className={styles.panelMedia}
                  />
                  <h4 className={styles.panelTitle}>
                    {tr("Or liquide limpide, Totum préservé", "Pure golden elixir, preserved Totum", "Klares flüssiges Gold, geschütztes Totum")}
                  </h4>
                  <p className={styles.panelText}>
                    {tr(
                      "Thermorégulation à ±0,5°C en chambre étanche close avec vortex doux. Couleur ambrée lumineuse, arômes floraux intacts et préservation optimale des molécules sensibles.",
                      "±0.5°C control inside an airtight chamber with gentle vortex agitation preserves luminous color, floral aromas, and delicate actives.",
                      "±0,5°C Steuerung in geschlossener Kammer mit sanftem Vortex bewahrt leuchtende Farbe, Aromen und empfindliche Inhaltsstoffe."
                    )}
                  </p>
                </div>
                <div className={`${styles.panelResultMetric} text-emerald-700`}>
                  <span>✅ {tr("Extraction homogène maîtrisée · Zéro amertume", "Consistent precision extraction · Zero bitterness", "Gleichmäßige Extraktion · Keine Bitterkeit")}</span>
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
                    <span>{tr("AVANT · Soins industriels avec conservateurs", "BEFORE · Industrial Skincare", "VORHER · Industrielle Kosmetik")}</span>
                  </div>
                  <img
                    src="/images/family_care_cleaned_1786616776823.jpg"
                    alt={tr("Soin industriel standard", "Standard commercial emulsion", "Standard-Kosmetik")}
                    className={styles.panelMedia}
                  />
                  <h4 className={styles.panelTitle}>
                    {tr("Formules diluées & additifs synthétiques", "Diluted formulas & synthetic additives", "Verdünnte Formeln & synthetische Zusätze")}
                  </h4>
                  <p className={styles.panelText}>
                    {tr(
                      "Émulsions surchargées en solvants pétrochimiques et parfums synthétiques souvent peu adaptées aux peaux sensibles.",
                      "Emulsions loaded with petrochemical stabilizers and synthetic fragrances unsuitable for sensitive skin.",
                      "Emulsionen mit petrochemischen Stabilisatoren und synthetischen Duftstoffen für empfindliche Haut."
                    )}
                  </p>
                </div>
                <div className={`${styles.panelResultMetric} text-red-700`}>
                  <span>❌ {tr("Inconfort et tiraillements fréquents", "Frequent dryness & tightness", "Häufiges Spannungsgefühl")}</span>
                </div>
              </div>

              <div className={`${styles.comparisonPanel} ${styles.comparisonPanelAfter}`}>
                <div>
                  <div className={`${styles.panelLabel} ${styles.labelAfter}`}>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{tr("APRÈS · Sérum frais BloomLab (Rose & Jojoba)", "AFTER · Fresh BloomLab Botanical Serum (Rose & Jojoba)", "NACHHER · Frisches BloomLab Serum (Rose & Jojoba)")}</span>
                  </div>
                  <img
                    src="/images/Bloom_Soins.jpg"
                    alt={tr("Soin cutané botanique pur", "Pure botanical skin oil", "Reines botanisches Hautöl")}
                    className={styles.panelMedia}
                  />
                  <h4 className={styles.panelTitle}>
                    {tr("Soin pur sans conservateur & toucher soyeux", "Preservative-free care & silky finish", "Reine Pflege ohne Konservierungsstoffe")}
                  </h4>
                  <p className={styles.panelText}>
                    {tr(
                      "Huile de soin formulée chez soi à 42°C : acides gras omégas préservés et antioxydants botaniques doux dans une base vierge bio.",
                      "Botanical oil crafted at 42°C at home: preserved omega fatty acids and natural antioxidants in an organic carrier base.",
                      "Bei 42°C selbst hergestelltes Pflegeöl: erhaltene Omega-Fettsäuren und pflanzliche Antioxidantien in Bio-Trägeröl."
                    )}
                  </p>
                </div>
                <div className={`${styles.panelResultMetric} text-emerald-700`}>
                  <span>✅ {tr("Confort cutané et douceur au quotidien", "Daily skin comfort & softness", "Täglicher Hautkomfort & Geschmeidigkeit")}</span>
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
                    <span>{tr("AVANT · Tisane à l'eau bouillante 100°C", "BEFORE · Boiling 100°C Herbal Tea", "VORHER · Kochender 100°C Aufguss")}</span>
                  </div>
                  <img
                    src="/images/natural_remedies_cleaned_1786616831671.jpg"
                    alt={tr("Infusion classique brûlée", "Overheated herbal tea", "Überbrühter Kräutertee")}
                    className={styles.panelMedia}
                  />
                  <h4 className={styles.panelTitle}>
                    {tr("Arômes volatils évaporés & tanins amers", "Evaporated volatile notes & bitter tannins", "Verdampfte Aromen & bittere Gerbstoffe")}
                  </h4>
                  <p className={styles.panelText}>
                    {tr(
                      "Verser de l'eau à 100°C vaporise les fractions aromatiques délicates de la mélisse en quelques secondes et libère des tanins astringents.",
                      "Pouring boiling 100°C water vaporizes delicate lemon balm aromatics within seconds and draws out bitter tannins.",
                      "Kochendes Wasser bei 100°C verflüchtigt die empfindlichen Aromen der Melisse und löst bittere Gerbstoffe."
                    )}
                  </p>
                </div>
                <div className={`${styles.panelResultMetric} text-red-700`}>
                  <span>❌ {tr("Infusion plate et astringente", "Flat, astringent infusion", "Flacher, herber Aufguss")}</span>
                </div>
              </div>

              <div className={`${styles.comparisonPanel} ${styles.comparisonPanelAfter}`}>
                <div>
                  <div className={`${styles.panelLabel} ${styles.labelAfter}`}>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{tr("APRÈS · Infusion basse température BloomLab (68°C)", "AFTER · Low-Temp BloomLab Infusion (68°C)", "NACHHER · Niedrigtemperatur-Aufguss BloomLab (68°C)")}</span>
                  </div>
                  <img
                    src="/images/home_lab_vibe_cleaned_1786616854146.jpg"
                    alt={tr("Infusion aromatique du soir BloomLab", "Evening aromatic BloomLab infusion", "Aromatischer Abendaufguss BloomLab")}
                    className={styles.panelMedia}
                  />
                  <h4 className={styles.panelTitle}>
                    {tr("Totum aromatique intact & rituel du soir doux", "Intact aromatic Totum & gentle evening ritual", "Intaktes Aroma-Totum & sanftes Abendritual")}
                  </h4>
                  <p className={styles.panelText}>
                    {tr(
                      "Brassage doux à 68°C en chambre close : capture fidèle des composés aromatiques et flavonoïdes doux pour une pause apaisante avant le coucher.",
                      "Gentle stirring at 68°C in a closed chamber captures delicate aromatics and flavonoids for a soothing evening ritual.",
                      "Sanftes Rühren bei 68°C in geschlossener Kammer bewahrt feine Aromen und Flavonoide für ein ruhiges Abendritual."
                    )}
                  </p>
                </div>
                <div className={`${styles.panelResultMetric} text-emerald-700`}>
                  <span>✅ {tr("Riche en arômes intacts et agréable à boire", "Rich intact aroma and smooth taste", "Vollmundiges Aroma und milder Geschmack")}</span>
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
                aria-label={tr("Fermer la vidéo", "Close video", "Video schließen")}
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
                <span>{tr("Bloom by BotaniK • Témoignage praticien certifié", "Bloom by BotaniK • Verified practitioner review", "Bloom by BotaniK • Verifizierter Erfahrungsbericht")}</span>
                <span className="text-amber-400 font-bold">{tr("100% Non rémunéré", "100% Unsponsored", "100% Unbezahlt")}</span>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default TestimonialsCarousel;
