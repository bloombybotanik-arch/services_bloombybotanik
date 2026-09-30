import React from 'react';
import { 
  Layers, 
  ArrowRight, 
  BookOpen, 
  ShieldAlert, 
  Sparkles, 
  Compass, 
  Activity, 
  Brain, 
  Droplets, 
  Flame, 
  RefreshCw, 
  HeartHandshake, 
  Clock, 
  HelpCircle,
  CheckCircle2,
  FileCheck,
  AlertTriangle
} from 'lucide-react';
import { View } from './types';
import { Language } from './translations';
import AcademyNavigation from './components/AcademyNavigation';
import { FreemiumPaywallGate } from './components/FreemiumPaywallGate';

interface NeufAxesHistoriquesContentProps {
  onNavigate: (view: View, param?: string) => void;
  lang?: Language;
}

export const NeufAxesHistoriquesContent: React.FC<NeufAxesHistoriquesContentProps> = ({ 
  onNavigate, 
  lang = 'fr' 
}) => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": lang === 'en'
      ? "The 9 Operational Axes of the Reset — Historical Version"
      : lang === 'de'
      ? "Die 9 operativen Achsen des Resets — Historische Version"
      : "Les 9 axes opératoires du Reset — version historique",
    "description": lang === 'en'
      ? "Educational explanation of Bloom's historical 9 operating axes, networked interactions, and link with the new insulin dossier."
      : lang === 'de'
      ? "Pädagogische Erklärung der historischen 9 Achsen von Bloom, ihrer Vernetzung und des neuen Insulin-Dossiers."
      : "Explication pédagogique des 9 axes opératoires historiques de Bloom, leurs relations en réseau et leur articulation avec le nouveau dossier insuline.",
    "publisher": {
      "@type": "Organization",
      "name": "Bloom Académie",
      "url": "https://bloombybotanik.com"
    }
  };

  const axesData = {
    fr: [
      {
        num: "A1",
        title: "Émonctoires & Élimination physiologique",
        target: "Foie, Reins, Intestins, Peau, Poumons",
        summary: "Accompagner les voies de conjugaison hépatique et d'évacuation rénale et cutanée pour éviter la recirculation de déchets métaboliques.",
        proof: "Biologie établie",
        traditional: "Plantes dépuratives douces (bardane, pissenlit, artichaut)"
      },
      {
        num: "A2",
        title: "Barrière intestinale & Jonctions serrées",
        target: "Entérocytes, Mucus, Jonctions serrées (occludines/zonulines)",
        summary: "Préserver l'étanchéité mécanique et immunitaire de l'épithélium digestif face aux fragments bactériens (LPS) et molécules étrangères.",
        proof: "Recherche chez l'humain",
        traditional: "Glutamine, mucilages émollients (guimauve, plantain)"
      },
      {
        num: "A3",
        title: "Axe HPA & Régulation neuro-surrénalienne",
        target: "Hypothalamus, Hypophyse, Glandes surrénales, Cortisol",
        summary: "Moduler la réponse physiologique au stress aigu et chronique afin d'éviter l'épuisement des cascades hormonales adaptatives.",
        proof: "Recherche préclinique & clinique",
        traditional: "Plantes adaptogènes (ashwagandha, rhodiola, basilic sacré)"
      },
      {
        num: "A4",
        title: "Cascade de l'inflammation & Résolution",
        target: "Voies NF-kB, COX/LOX, Médiateurs pro-résolution (SPMs)",
        summary: "Favoriser la phase active de résolution de l'inflammation physiologique plutôt que son simple blocage symptomatique.",
        proof: "Biologie établie",
        traditional: "Résines à boswellia, curcuminoïdes, acides gras oméga-3"
      },
      {
        num: "A5",
        title: "Énergie cellulaire & Fonction mitochondriale",
        target: "Mitochondries, Synthèse d'ATP, Stress oxydatif",
        summary: "Soutenir le métabolisme de conversion des nutriments en énergie cellulaire stable et neutraliser l'excès de radicaux libres.",
        proof: "Recherche fondamentale",
        traditional: "Polyphénols antioxydants, CoQ10, shilajit purifié"
      },
      {
        num: "A6",
        title: "Système nerveux autonome & Tonus vagal",
        target: "Nerf Vague (X), Balance sympathique / parasympathique",
        summary: "Stimuler la branche « repos et digestion » (parasympathique) pour freiner l'emballement inflammatoire réflexe.",
        proof: "Recherche neurophysiologique",
        traditional: "Cohérence cardiaque, plantes calmantes (passiflore, mélisse)"
      },
      {
        num: "A7",
        title: "Matrice extracellulaire & Réseau fascial",
        target: "Tissu conjonctif, Collagène, Fluides interstitiels",
        summary: "Maintenir la viscosité, la mobilité et la circulation des signaux biochimiques et mécaniques à travers la toile conjonctive.",
        proof: "Hypothèse intégrative Bloom",
        traditional: "Hydratation minérale, prêle des champs, mouvement doux"
      },
      {
        num: "A8",
        title: "Écosystème du microbiote & Symbiose",
        target: "Flore commensale, Acides Gras à Chaîne Courte (butyrate)",
        summary: "Nourrir la diversité bactérienne symbiotique pour optimiser la fermentation des fibres et la synthèse de neurotransmetteurs.",
        proof: "Recherche chez l'humain",
        traditional: "Fibres prébiotiques, polyphénols, alimentation fermentée"
      },
      {
        num: "A9",
        title: "Système endocannabinoïde & Homéostasie centrale",
        target: "Récepteurs CB1 / CB2, Endocannabinoïdes (AEA, 2-AG)",
        summary: "Réguler en boucle rétroactive la sensation douloureuse, la modulation émotionnelle et l'équilibre immunitaire global.",
        proof: "Biologie fondamentale",
        traditional: "Phytocannabinoïdes du chanvre (CBD), bêta-caryophyllène"
      }
    ],
    en: [
      {
        num: "A1",
        title: "Emunctories & Physiological Clearance",
        target: "Liver, Kidneys, Bowels, Skin, Lungs",
        summary: "Supporting hepatic conjugation pathways, renal excretion, and perspiration to prevent metabolic waste recirculation.",
        proof: "Established Biology",
        traditional: "Gentle depurative herbs (burdock root, dandelion root, artichoke)"
      },
      {
        num: "A2",
        title: "Intestinal Barrier & Tight Junctions",
        target: "Enterocytes, Mucus Layer, Tight Junctions (occludins/zonulins)",
        summary: "Preserving the mechanical and immune integrity of the gut lining against bacterial fragments (LPS) and antigenic macromolecules.",
        proof: "Human Research",
        traditional: "Glutamine, demulcent mucilages (marshmallow root, plantain)"
      },
      {
        num: "A3",
        title: "HPA Axis & Adrenocortical Regulation",
        target: "Hypothalamus, Pituitary, Adrenal Glands, Cortisol",
        summary: "Modulating acute and chronic stress response cascades to avoid endocrine burnout and receptor downregulation.",
        proof: "Preclinical & Clinical Data",
        traditional: "Adaptogenic plants (ashwagandha, rhodiola rosea, holy basil)"
      },
      {
        num: "A4",
        title: "Inflammatory Cascade & Active Resolution",
        target: "NF-kB, COX/LOX Pathways, Specialized Pro-Resolving Mediators (SPMs)",
        summary: "Facilitating the natural resolution phase of physiological inflammation rather than simply blunting symptoms.",
        proof: "Established Biology",
        traditional: "Boswellia serrata resins, curcuminoids, omega-3 fatty acids"
      },
      {
        num: "A5",
        title: "Cellular Energy & Mitochondrial Function",
        target: "Mitochondria, ATP Synthesis, Oxidative Stress",
        summary: "Supporting nutritional bioenergetic conversion into cellular ATP while quenching free radicals and peroxides.",
        proof: "Fundamental Research",
        traditional: "Antioxidant polyphenols, CoQ10, purified shilajit"
      },
      {
        num: "A6",
        title: "Autonomic Nervous System & Vagal Tone",
        target: "Vagus Nerve (Cranial Nerve X), Sympathetic / Parasympathetic Balance",
        summary: "Activating the 'Rest & Digest' parasympathetic tone to brake the neuro-inflammatory reflex cascade.",
        proof: "Neurophysiological Data",
        traditional: "Heart rate variability (HRV), calming botanicals (passionflower, lemon balm)"
      },
      {
        num: "A7",
        title: "Extracellular Matrix & Fascial Network",
        target: "Connective Tissue, Collagen, Interstitial Fluids",
        summary: "Preserving fluid viscosity, biomechanical transmission, and interstitial biochemical signaling across connective tissues.",
        proof: "Bloom Integrative Hypothesis",
        traditional: "Electrolyte hydration, horsetail, mindful myofascial movement"
      },
      {
        num: "A8",
        title: "Microbiome Ecosystem & Symbiosis",
        target: "Commensal Microbes, Short-Chain Fatty Acids (Butyrate)",
        summary: "Nourishing microbial diversity to optimize fiber fermentation and systemic neurotransmitter precursor synthesis.",
        proof: "Human Clinical Research",
        traditional: "Prebiotic fibers, polyphenol-dense herbs, wild lacto-ferments"
      },
      {
        num: "A9",
        title: "Endocannabinoid System & Central Homeostasis",
        target: "CB1 / CB2 Receptors, Endocannabinoids (Anandamide, 2-AG)",
        summary: "Providing retrograde inhibitory control over pain perception, emotional processing, and whole-body immune equilibrium.",
        proof: "Fundamental Biology",
        traditional: "Hemp phytocannabinoids (broad-spectrum CBD), beta-caryophyllene"
      }
    ],
    de: [
      {
        num: "A1",
        title: "Ausscheidungsorgane & Physiologische Elimination",
        target: "Leber, Nieren, Darm, Haut, Lunge",
        summary: "Unterstützung der hepatischen Konjugation und der renalen sowie kutanen Ausscheidung zur Verhinderung von Stoffwechselschlacken-Rückstau.",
        proof: "Etablierte Biologie",
        traditional: "Sanfte Ausleitungspflanzen (Klettenwurzel, Löwenzahn, Artischocke)"
      },
      {
        num: "A2",
        title: "Darmbarriere & Tight Junctions",
        target: "Enterozyten, Schleimschicht, Schlussleistenkomplexe (Okkludine/Zonulin)",
        summary: "Bewahrung der mechanischen und immunologischen Dichtigkeit der Darmschleimhaut gegen bakterielle Fragmente (LPS).",
        proof: "Humanstudien",
        traditional: "L-Glutamin, pflanzliche Schleimstoffe (Eibisch, Spitzwegerich)"
      },
      {
        num: "A3",
        title: "HPA-Achse & Neuro-Nebennieren-Regulation",
        target: "Hypothalamus, Hypophyse, Nebennierenrinde, Cortisol",
        summary: "Modulation der akuten und chronischen Stresskaskaden zur Vermeidung von hormoneller Erschöpfung.",
        proof: "Präklinische & klinische Daten",
        traditional: "Adaptogene Pflanzen (Ashwagandha, Rhodiola rosea, Tulsi)"
      },
      {
        num: "A4",
        title: "Entzündungskaskade & Aktive Resolution",
        target: "NF-kB, COX/LOX-Wege, Pro-Resolving Mediatoren (SPMs)",
        summary: "Förderung der aktiven physiologischen Auflösungsphase von Entzündungen statt reiner Symptomunterdrückung.",
        proof: "Etablierte Biologie",
        traditional: "Boswellia-Harze, Curcuminoide, Omega-3-Fettsäuren"
      },
      {
        num: "A5",
        title: "Zellenergie & Mitochondriale Funktion",
        target: "Mitochondrien, ATP-Synthese, Oxidativer Stress",
        summary: "Unterstützung der zellulären Energieumwandlung in stabiles ATP und Neutralisation reaktiver Sauerstoffspezies.",
        proof: "Grundlagenforschung",
        traditional: "Antioxidative Polyphenole, Coenzym Q10, gereinigtes Shilajit"
      },
      {
        num: "A6",
        title: "Autonomes Nervensystem & Vagustonus",
        target: "Vagusnerv (Nervus X), Sympathikus / Parasympathikus",
        summary: "Aktivierung des Parasympathikus ('Ruhe & Verdauung') zur Bremsung unkontrollierter neuro-inflammatorischer Reflexe.",
        proof: "Neurophysiologische Daten",
        traditional: "Herzkohärenz, beruhigende Heilkräuter (Passionsblume, Melisse)"
      },
      {
        num: "A7",
        title: "Extrazelluläre Matrix & Fasziales Netzwerk",
        target: "Bindegewebe, Kollagen, Interstitielle Flüssigkeiten",
        summary: "Aufrechterhaltung der Viskosität, Gleitfähigkeit und mechanisch-biochemischen Signalübertragung im Fasziengewebe.",
        proof: "Bloom Integrative Hypothese",
        traditional: "Elektrolyt-Hydratation, Ackerschachtelhalm, sanfte Bewegung"
      },
      {
        num: "A8",
        title: "Mikrobiom-Ökosystem & Symbiose",
        target: "Kommensale Flora, Kurzkettige Fettsäuren (Butyrat)",
        summary: "Förderung mikrobieller Diversität zur Optimierung von Ballaststofffermentation und Neurotransmitter-Synthese.",
        proof: "Humanforschung",
        traditional: "Präbiotische Ballaststoffe, Polyphenole, fermentierte Kost"
      },
      {
        num: "A9",
        title: "Endocannabinoid-System & Zentrale Homöostase",
        target: "CB1 / CB2-Rezeptoren, Endocannabinoide (Anandamid, 2-AG)",
        summary: "Rückkoppelnde Regulation von Schmerzempfindung, emotionaler Ausgeglichenheit und Immunbalance.",
        proof: "Grundlagenbiologie",
        traditional: "Hanf-Phytocannabinoide (Breitspektrum-CBD), Beta-Caryophyllen"
      }
    ]
  };

  const texts = {
    fr: {
      badge: "BLOOM ACADÉMIE · FONDEMENTS HISTORIQUES",
      title: "Les 9 axes opératoires du Reset — version historique",
      intro: "Bloom a organisé une première version de son Reset autour de neuf axes opératoires. Cette page explique ce que recouvre chacun d'eux, comment ils se relient et pourquoi la recherche ultérieure a conduit à étudier plus explicitement le métabolisme glucidique et l'insuline. Ces axes constituent un modèle Bloom, pas une classification médicale universelle.",
      btnBackGuide: "← Revoir le Guide de lecture",
      btnInsulinDossier: "Explorer le dossier Insuline →",
      sec1Badge: "Repère Méthodologique",
      sec1Title: "À quoi sert un axe opératoire ?",
      sec1Desc: "Dans la méthode Bloom, un axe opératoire ne désigne pas une maladie ni une ordonnance, mais un processus biologique transversal qui traverse plusieurs organes à la fois. Par exemple, la régulation du stress (Axe HPA) influence simultanément la motricité intestinale, le tonus cardiovasculaire, la vigilance cérébrale et l'immunité cutanée.",
      sec1Note: "Précision de gouvernance : Ces axes constituent une grille d'apprentissage Bloom pour observer la complexité du vivant. Ils ne remplacent ni la nosologie médicale internationale, ni un bilan biologique prescrit par un médecin.",
      sec2Badge: "Inventaire Documenté",
      sec2Title: "Les 9 axes opératoires historiques de Bloom",
      sec2Desc: "Consignés dans les archives fondatrices du Reset Homéostasique, ces neuf leviers forment la matrice d'observation physiologique originale :",
      targetsLabel: "Cibles fonctionnelles :",
      traditionalLabel: "Repère herboriste :",
      sec3Badge: "Interconnexions",
      sec3Title: "Les relations entre axes : une toile, pas des silos",
      sec3Desc: "Dans un organisme vivant, aucun axe ne fonctionne isolément. Si la barrière intestinale (A2) est perméable, des endotoxines (LPS) rejoignent la circulation portale, surchargeant le foie (A1) et activant la cascade inflammatoire (A4). Cette inflammation signale à son tour à l'axe HPA (A3) de produire du cortisol, ce qui peut épuiser les mitochondries (A5).",
      sec3Caution: "Reconnaître ces liens permet de comprendre pourquoi agir sur un seul symptôme est souvent insuffisant. Cela ne permet en aucun cas de poser un diagnostic médical en ligne sans consultation clinique et examens biologiques réels.",
      sec4Badge: "Évolution des Recherches Bloom",
      sec4Title: "Pourquoi le métabolisme glucidique & l'insuline font l'objet d'un dossier à part",
      sec4Desc: "La version historique à neuf axes intégrait l'énergie cellulaire sous l'angle mitochondrial (A5). Toutefois, les données cliniques modernes ont démontré que la sensibilité à l'insuline constitue un pivot métabolique transversal qui conditionne à la fois l'inflammation (A4), le tonus nerveux (A6) et la régulation hormonale. Plutôt que de modifier rétroactivement les archives historiques, Bloom a choisi de consacrer un dossier d'approfondissement dédié à cette question.",
      sec4Btn: "Consulter le dossier Métabolisme & Insuline",
      sec5Title: "Limites du modèle Bloom et responsabilité individuelle",
      sec5Desc: "Les axes opératoires Bloom sont des modèles théoriques de transmission pédagogique. Ils ne mesurent pas votre état de santé individuel et ne remplacent pas les consultations auprès de médecins, endocrinologues ou gastro-entérologues. N'interrompez jamais un traitement en cours."
    },
    en: {
      badge: "BLOOM ACADEMY · HISTORICAL FOUNDATIONS",
      title: "The 9 Operational Axes of the Reset — Historical Version",
      intro: "Bloom organized the initial version of the Homeostatic Reset around nine operational axes. This page explains what each represents, how they interconnect, and why subsequent clinical research prompted a dedicated focus on glucose metabolism and insulin. These axes represent a Bloom educational model, not an international disease nosology.",
      btnBackGuide: "← Back to Reading Guide",
      btnInsulinDossier: "Explore Insulin Dossier →",
      sec1Badge: "Methodological Landmark",
      sec1Title: "What is the purpose of an operational axis?",
      sec1Desc: "In the Bloom framework, an operational axis does not designate a disease or a prescription, but a transversal physiological process spanning multiple organs simultaneously. For instance, stress regulation (HPA Axis) concurrently impacts gut motility, cardiovascular tone, cognitive alertness, and dermal immunity.",
      sec1Note: "Governance Notice: These axes constitute a Bloom learning matrix for understanding biological complexity. They do not replace clinical examinations, standardized medical guidelines, or physician-ordered blood tests.",
      sec2Badge: "Documented Inventory",
      sec2Title: "Bloom's 9 Historical Operational Axes",
      sec2Desc: "Documented in the founding archives of the Homeostatic Reset, these nine levers represent the original systemic observation matrix:",
      targetsLabel: "Functional targets:",
      traditionalLabel: "Herbal landmark:",
      sec3Badge: "Interconnections",
      sec3Title: "Cross-talk between axes: a living web, not silos",
      sec3Desc: "In a living organism, no axis operates in isolation. If the gut barrier (A2) loses integrity, endotoxins (LPS) enter the portal system, burdening hepatic clearance (A1) and firing the inflammatory cascade (A4). This in turn commands the HPA axis (A3) to output cortisol, eventually straining mitochondrial biogenesis (A5).",
      sec3Caution: "Acknowledging these feedback loops explains why addressing isolated symptoms is often insufficient. It never substitutes for actual medical consultations and laboratory evaluations.",
      sec4Badge: "Evolution of Bloom Research",
      sec4Title: "Why glucose metabolism & insulin received a dedicated dossier",
      sec4Desc: "The historical 9-axis version incorporated cellular energetics through a mitochondrial lens (A5). However, modern geroscience and metabolic research demonstrated that insulin sensitivity is a master upstream lever influencing systemic inflammation (A4), autonomic balance (A6), and hormonal longevity. Rather than rewriting historical archives, Bloom created a dedicated deep-dive dossier.",
      sec4Btn: "Consult the Metabolism & Insulin Dossier",
      sec5Title: "Boundaries of the Bloom Model & Personal Responsibility",
      sec5Desc: "Bloom operational axes are educational models for biological comprehension. They do not assess your individual medical status and cannot replace consultations with physicians, endocrinologists, or gastroenterologists. Never discontinue medical treatments."
    },
    de: {
      badge: "BLOOM AKADEMIE · HISTORISCHE GRUNDLAGEN",
      title: "Die 9 operativen Achsen des Resets — Historische Version",
      intro: "Bloom strukturierte die erste Version des Homöostatischen Resets um neun operative Achsen. Diese Seite erläutert jeden Prozess, ihre Vernetzung und warum neuere Forschungen ein vertiefendes Dossier zum Glukosestoffwechsel und Insulin erforderten. Diese Achsen sind ein didaktisches Bloom-Modell, keine universelle medizinische Klassifikation.",
      btnBackGuide: "← Zurück zum Leitfaden",
      btnInsulinDossier: "Zum Insulin-Dossier →",
      sec1Badge: "Methodischer Orientierungspunkt",
      sec1Title: "Wozu dient eine operative Achse?",
      sec1Desc: "In der Bloom-Methode bezeichnet eine operative Achse weder eine Krankheit noch ein Rezept, sondern einen biologischen Querschnittsprozess über mehrere Organe hinweg. Beispielsweise beeinflusst die Stressregulation (HPA-Achse) gleichzeitig die Darmmotilität, den Gefäßtonus, die mentale Wachheit und die Hautimmunität.",
      sec1Note: "Hinweis: Diese Achsen bilden ein Bloom-Lernmodell zur Betrachtung lebendiger Systeme. Sie ersetzen weder eine ärztliche Diagnose noch ärztlich verordnete Laboruntersuchungen.",
      sec2Badge: "Dokumentiertes Inventar",
      sec2Title: "Die 9 historischen operativen Achsen von Bloom",
      sec2Desc: "In den Gründungsarchiven des Homöostatischen Resets niedergelegt, bilden diese neun Hebel die ursprüngliche Matrix:",
      targetsLabel: "Funktionelle Ziele:",
      traditionalLabel: "Pflanzlicher Bezug:",
      sec3Badge: "Vernetzung",
      sec3Title: "Beziehungen zwischen Achsen: Ein Netzwerk, keine Silos",
      sec3Desc: "In einem lebendigen Körper agiert keine Achse isoliert. Ist die Darmbarriere (A2) durchlässig, gelangen Endotoxine in die Pfortader, überlasten die Leber (A1) und triggern Entzündungen (A4). Dies fordert die HPA-Achse (A3) zur Cortisol-Sekretion auf, was letztlich die Mitochondrien (A5) strapaziert.",
      sec3Caution: "Das Verständnis dieser Wechselwirkungen zeigt, warum das bloße Unterdrücken von Einzelsymptomen selten nachhaltig ist. Es ersetzt niemals eine persönliche ärztliche Untersuchung.",
      sec4Badge: "Entwicklung der Bloom-Forschung",
      sec4Title: "Warum Glukosestoffwechsel & Insulin ein eigenes Dossier erhielten",
      sec4Desc: "Die historische 9-Achsen-Fassung betrachtete die Zellenergie primär mitochondrial (A5). Neuere Forschungen zeigten jedoch, dass die Insulinsensitivität ein zentraler physiologischer Taktgeber ist, der Entzündung (A4), Nerventonus (A6) und Hormonbalance maßgeblich moduliert. Daher widmete Bloom diesem Hebel ein eigenständiges Dossier.",
      sec4Btn: "Das Stoffwechsel- & Insulin-Dossier ansehen",
      sec5Title: "Grenzen des Modells & Eigenverantwortung",
      sec5Desc: "Die operativen Achsen von Bloom sind didaktische Modelle zur Wissensvermittlung. Sie erheben keinen diagnostischen Anspruch und ersetzen keine fachärztliche Betreuung. Setzen Sie laufende medizinische Therapien niemals eigenmächtig ab."
    }
  };

  const curT = texts[lang] || texts.fr;
  const currentAxes = axesData[lang] || axesData.fr;

  return (
    <div 
      className="min-h-screen bg-[#0d1117] text-[#c9d1d9] font-sans selection:bg-[#c9a84c]/30 selection:text-white"
      data-bloom-academie="true"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Navigation Académie */}
      <AcademyNavigation
        currentView="9-axes-historiques"
        onNavigate={onNavigate}
        currentPageTitle={lang === 'fr' ? 'Les 9 Axes historiques' : lang === 'de' ? 'Die 9 Historischen Achsen' : 'The 9 Historical Axes'}
        sectionName={lang === 'fr' ? 'Comprendre le Corps' : lang === 'de' ? 'Den Körper verstehen' : 'Understanding the Body'}
        lang={lang}
      />

      {/* Hero Header */}
      <header className="border-b border-[#30363d] bg-radial from-[#1c2128] via-[#0d1117] to-[#0d1117] py-14 sm:py-20 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#c9a84c]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c9a84c]/10 border border-[#c9a84c]/30 text-[#c9a84c] text-[11px] font-mono uppercase tracking-widest mb-6">
            <Layers className="w-3.5 h-3.5" />
            <span>{curT.badge}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-5xl lg:text-6xl font-black text-[#f5f0e8] tracking-tight leading-[1.1] mb-6">
            {curT.title}
          </h1>

          <p className="text-base sm:text-lg text-[#b8b8b8] leading-relaxed max-w-3xl mx-auto font-normal mb-8">
            {curT.intro}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => onNavigate('comment-lire-modele-bloom')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold transition-all cursor-pointer border border-white/10"
            >
              <span>{curT.btnBackGuide}</span>
            </button>
            <button
              onClick={() => onNavigate('metabolisme-insuline')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#F59E0B] hover:bg-[#d97706] text-[#0d1117] text-xs font-black uppercase tracking-wider transition-all cursor-pointer shadow-md"
            >
              <span>{curT.btnInsulinDossier}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-14 space-y-16">

        {/* Section 1 : À quoi sert un axe opératoire ? */}
        <section className="space-y-4">
          <div className="text-[10px] font-black uppercase tracking-[0.25em] text-[#c9a84c] font-mono">
            {curT.sec1Badge}
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#f5f0e8] tracking-tight">
            {curT.sec1Title}
          </h2>
          <p className="text-sm sm:text-base text-[#c9d1d9] leading-relaxed">
            {curT.sec1Desc}
          </p>
          <div className="p-4 rounded-2xl bg-[#161b22] border border-[#30363d] flex items-start gap-3">
            <Compass className="w-5 h-5 text-[#c9a84c] shrink-0 mt-0.5" />
            <p className="text-xs text-[#c9d1d9] leading-relaxed">
              {curT.sec1Note}
            </p>
          </div>
        </section>

        {/* FREEMIUM GATE : LES 9 AXES OPÉRATOIRES EN DÉTAIL */}
        <FreemiumPaywallGate
          onNavigate={onNavigate}
          lang={lang}
          title={lang === 'fr' ? 'Débloquez les 9 Axes Historiques en Détail' : lang === 'de' ? 'Die 9 Historischen Achsen im Detail freischalten' : 'Unlock the 9 Historical Axes in Detail'}
          subtitle={lang === 'fr' ? 'L’introduction et les définitions de base sont en libre accès. Débloquez la grille intégrale des 9 axes opératoires, leurs cibles fonctionnelles, leurs repères herboristes et leurs interactions systémiques avec votre abonnement.' : lang === 'de' ? 'Einführung frei zugänglich. Schalten Sie alle 9 operativen Achsen mit Ihrem Abonnement frei.' : 'Introduction open access. Unlock the full grid of 9 operating axes with your subscription.'}
          bulletPoints={[
            lang === 'fr' ? 'Inventaire documenté des 9 axes opératoires A1 à A9' : 'Documented inventory of 9 operating axes A1 to A9',
            lang === 'fr' ? 'Cibles cellulaires, cascades enzymatiques et niveaux de preuve' : 'Cellular targets, enzymatic cascades and evidence levels',
            lang === 'fr' ? 'Toile d’interconnexions et rétrocontrôles physiologiques' : 'Interconnection web and physiological feedbacks',
            lang === 'fr' ? 'Accès débloqué à l’ensemble des dossiers de l’Académie' : 'Full access to all Academy modules and dossiers'
          ]}
        >
          {/* Section 2 : La grille des 9 axes historiques */}
          <section className="space-y-6">
          <div className="text-[10px] font-black uppercase tracking-[0.25em] text-[#c9a84c] font-mono">
            {curT.sec2Badge}
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#f5f0e8] tracking-tight">
            {curT.sec2Title}
          </h2>
          <p className="text-sm sm:text-base text-[#c9d1d9] leading-relaxed">
            {curT.sec2Desc}
          </p>

          <div className="grid gap-4">
            {currentAxes.map((axe) => (
              <div 
                key={axe.num}
                className="p-5 rounded-2xl bg-[#161b22] border border-[#30363d] hover:border-[#c9a84c]/50 transition-colors space-y-3"
              >
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-[#c9a84c]/15 text-[#c9a84c] flex items-center justify-center font-mono font-bold text-xs">
                      {axe.num}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-[#f5f0e8]">
                      {axe.title}
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-white/5 text-[#8b949e] border border-white/10">
                    {axe.proof}
                  </span>
                </div>

                <div className="text-xs text-[#8b949e]">
                  <strong className="text-[#c9d1d9]">{curT.targetsLabel}</strong> {axe.target}
                </div>

                <p className="text-xs sm:text-sm text-[#c9d1d9] leading-relaxed">
                  {axe.summary}
                </p>

                <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs text-[#c9a84c]">
                  <span>{curT.traditionalLabel} {axe.traditional}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3 : Relations entre axes et vision systémique */}
        <section className="space-y-4">
          <div className="text-[10px] font-black uppercase tracking-[0.25em] text-[#c9a84c] font-mono">
            {curT.sec3Badge}
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#f5f0e8] tracking-tight">
            {curT.sec3Title}
          </h2>
          <p className="text-sm sm:text-base text-[#c9d1d9] leading-relaxed">
            {curT.sec3Desc}
          </p>
          <div className="p-5 rounded-2xl bg-[#161b22] border-l-4 border-[#86efac] border-y border-r border-[#30363d] text-xs text-[#c9d1d9] leading-relaxed space-y-1">
            <strong className="text-[#86efac] block uppercase tracking-wider text-[11px]">
              Principe de prudence Bloom
            </strong>
            <p>
              {curT.sec3Caution}
            </p>
          </div>
        </section>

        {/* Section 4 : Pourquoi le dossier insuline s'ajoute à cette réflexion */}
        <section className="space-y-4 p-6 sm:p-8 rounded-3xl bg-[#161b22] border border-[#F59E0B]/40 shadow-[0_0_20px_rgba(245,158,11,0.1)]">
          <div className="text-[10px] font-black uppercase tracking-[0.25em] text-[#F59E0B] font-mono">
            {curT.sec4Badge}
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-[#F59E0B] tracking-tight">
            {curT.sec4Title}
          </h2>
          <p className="text-xs sm:text-sm text-[#c9d1d9] leading-relaxed">
            {curT.sec4Desc}
          </p>
          <div className="pt-2">
            <button
              onClick={() => onNavigate('metabolisme-insuline')}
              className="px-5 py-2.5 rounded-xl bg-[#F59E0B] hover:bg-[#d97706] text-[#0d1117] text-xs font-bold transition-all inline-flex items-center gap-2 cursor-pointer shadow-md"
            >
              <span>{curT.sec4Btn}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </section>

        {/* Section 5 : Limites et sécurité */}
        <section className="p-6 rounded-2xl bg-[#161b22] border border-[#8b3a3a]/40 flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-[#8b3a3a]/20 text-[#f87171] flex items-center justify-center shrink-0">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div className="space-y-2 text-xs text-[#c9d1d9] leading-relaxed">
            <h3 className="font-bold text-sm text-[#f5f0e8]">
              {curT.sec5Title}
            </h3>
            <p>
              {curT.sec5Desc}
            </p>
          </div>
        </section>
        </FreemiumPaywallGate>

      </main>

      {/* Footer Académie */}
      <footer className="border-t border-[#30363d] py-12 text-center text-xs text-[#8b949e] mt-20">
        <div className="text-base text-[#f5f0e8] mb-2 font-bold">Bloom by BotaniK</div>
        <p className="mb-2">
          {lang === 'fr'
            ? 'Transmission pédagogique du vivant • Phytothérapie de haute précision'
            : lang === 'de'
            ? 'Pädagogische Wissensvermittlung • Hochpräzise Phytotherapie'
            : 'Educational transmission • High-precision phytotherapy'}
        </p>
        <p className="text-[10px] text-[#484f58]">
          {lang === 'fr'
            ? 'Ce contenu est purement éducatif. Référence méthodologique interne V2.1/Soleau.'
            : lang === 'de'
            ? 'Dieser Inhalt dient rein pädagogischen Zwecken. Interne methodische Referenz V2.1/Soleau.'
            : 'This content is purely educational. Internal methodological reference V2.1/Soleau.'}
        </p>
      </footer>
    </div>
  );
};

export default NeufAxesHistoriquesContent;
