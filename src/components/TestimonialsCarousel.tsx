import React, { useState } from 'react';
import { CheckCircle2, Sparkles, AlertCircle } from 'lucide-react';
import AmazonSocialProof from './AmazonSocialProof';
import styles from './TestimonialsCarousel.module.css';

interface TestimonialsCarouselProps {
  lang?: string;
}

export const TestimonialsCarousel: React.FC<TestimonialsCarouselProps> = ({ lang = 'fr' }) => {
  const isDE = lang === 'de';
  const isFR = lang === 'fr';
  const tr = (fr: string, en: string, de: string) => (isFR ? fr : isDE ? de : en);

  const [activeBeforeAfterTab, setActiveBeforeAfterTab] = useState<'extraction' | 'skin' | 'vitality'>('extraction');

  return (
    <section id="preuve-sociale" className={styles.sectionContainer} aria-label={tr("Avis clients et preuve sociale", "Customer reviews and social proof", "Kundenbewertungen und Erfahrungsberichte")}>
      <div className={styles.inner}>
        
        {/* Section Header */}
        <div className={styles.header}>
          <div className={styles.badge}>
            <Sparkles className="w-3.5 h-3.5 text-[#C8AB8A]" />
            <span>{tr('Évaluations Externes & Pédagogie', 'External Ratings & Practice', 'Externe Bewertungen & Praxis')}</span>
          </div>
          <h2 className={styles.title}>
            {tr("Évaluations vérifiées & repères comparatifs", "Verified ratings & comparative benchmarks", "Verifizierte Bewertungen & Vergleichsrahmen")}
          </h2>
          <p className={styles.subtitle}>
            {tr(
              "Consultez les évaluations publiques collectées par Amazon.fr et comparez les paramètres techniques d'extraction à domicile.",
              "Review public ratings collected by Amazon.fr and compare technical parameters for home extraction.",
              "Sehen Sie sich die öffentlichen Bewertungen auf Amazon.fr an und vergleichen Sie die technischen Extraktionsparameter."
            )}
          </p>
        </div>

        {/* Authentic Amazon Social Proof (no fabricated reviews or ratings) */}
        <div className="mb-12">
          <AmazonSocialProof lang={isFR ? 'fr' : isDE ? 'de' : 'en'} />
        </div>

        {/* Section Avant / Après */}
        <div className={styles.beforeAfterSection}>
          <div className={styles.beforeAfterHeader}>
            <span className="text-xs font-black uppercase tracking-widest text-[#C8AB8A] mb-2 block">
              {tr("Comparaison Pédagogique", "Educational Comparison", "Pädagogischer Vergleich")}
            </span>
            <h3 className={styles.beforeAfterTitle}>
              {tr("Bain-marie classique vs enceinte close BloomLab®", "Traditional double-boiler vs closed-chamber BloomLab®", "Klassisches Wasserbad vs. geschlossene BloomLab®-Kammer")}
            </h3>
            <p className="text-sm text-slate-600">
              {tr(
                "Repères indicatifs comparant un chauffage ouvert non régulé à une chauffe douce thermorégulée (selon les paramètres nominaux du fabricant).",
                "Indicative comparison between unregulated open-pot heating and thermoregulated gentle heating (per nominal manufacturer specs).",
                "Orientierender Vergleich zwischen offenem Erhitzen und temperaturgeregelter Erwärmung (gemäß Herstellerangaben)."
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
                      "Chauffe thermorégulée (consigne nominale fabricant ±0,5°C non certifiée par laboratoire tiers) en enceinte close avec agitation douce. Limite l'évaporation des notes volatiles et l'échauffement local.",
                      "Thermoregulated heating (nominal manufacturer spec ±0.5°C, not third-party lab calibrated) in a closed chamber with gentle stirring, limiting volatile loss and localized scorching.",
                      "Temperaturgeregelte Erwärmung (Hersteller-Nennwert ±0,5 °C, ohne externe Laborkalibrierung) in geschlossener Kammer mit sanftem Rühren."
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

        {/* Video modal removed along with fabricated practitioner video claims */}

      </div>
    </section>
  );
};

export default TestimonialsCarousel;
