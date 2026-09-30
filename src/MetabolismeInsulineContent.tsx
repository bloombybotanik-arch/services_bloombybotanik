import React from 'react';
import { 
  Activity, 
  ArrowRight, 
  BookOpen, 
  ShieldAlert, 
  Sparkles, 
  Compass, 
  Layers, 
  Brain, 
  Droplets, 
  Flame, 
  RefreshCw, 
  HeartHandshake, 
  Clock, 
  AlertTriangle,
  CheckCircle2,
  Zap,
  Battery,
  ShieldCheck,
  TrendingUp,
  Cpu,
  Feather,
  FlaskConical,
  Leaf
} from 'lucide-react';
import { View } from './types';
import { Language } from './translations';
import AcademyNavigation from './components/AcademyNavigation';
import { FreemiumPaywallGate } from './components/FreemiumPaywallGate';

interface MetabolismeInsulineContentProps {
  onNavigate: (view: View, param?: string) => void;
  lang?: Language;
}

export const MetabolismeInsulineContent: React.FC<MetabolismeInsulineContentProps> = ({ 
  onNavigate, 
  lang = 'fr' 
}) => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": lang === 'en'
      ? "Glucose metabolism & insulin: the orchestrator of energy homeostasis"
      : lang === 'de'
      ? "Glukosestoffwechsel & Insulin: Der Dirigent der Energie-Homöostase"
      : "Métabolisme glucidique & insuline : le chef d'orchestre de l'homéostasie énergétique",
    "description": lang === 'en'
      ? "Bloom Academy dossier exploring insulin sensitivity, functional hyperinsulinemia, mitochondrial flexibility and botanical levers of the plant totum."
      : lang === 'de'
      ? "Bloom Academy Dossier über Insulinsensitivität, funktionelle Hyperinsulinämie, mitochondriale Flexibilität und botanische Hebel des Pflanzentotums."
      : "Nouveau dossier Bloom Académie explorant la sensibilité à l'insuline, l'hyperinsulinémie fonctionnelle, la flexibilité mitochondriale et les leviers botaniques du totum végétal.",
    "publisher": {
      "@type": "Organization",
      "name": "Bloom Académie",
      "url": "https://bloombybotanik.com"
    }
  };

  const t = {
    fr: {
      breadcrumbAcademy: "Académie",
      breadcrumbSection: "Comprendre le Corps",
      breadcrumbTitle: "Métabolisme glucidique & insuline",
      badge: "Nouveau Dossier d'Approfondissement",
      mainTitle: "Métabolisme glucidique & insuline : le chef d'orchestre de l'énergie vitale",
      mainDesc: "Loin d'être un simple régulateur de sucre sanguin, l'insuline est l'hormone anabolique maîtresse de notre physiologie. Quand sa signalisation se grippe, ce n'est pas seulement le métabolisme qui ralentit : c'est l'ensemble des 4 architectures — neuro-endocrinienne, immunitaire, vasculaire et tissulaire — qui subit une onde de choc silencieuse.",
      disclaimerTitle: "Avertissement de non-médicalité : ",
      disclaimerDesc: "Ce dossier est une ressource éducative et scientifique indépendante. Il ne pose aucun diagnostic de diabète ou de syndrome métabolique et ne remplace en aucun cas un traitement médicalisé ou un suivi endocrinologique.",
      sec1Badge: "Perspective Historique",
      sec1Title: "Pourquoi l'insuline fait-elle l'objet d'un dossier séparé ?",
      sec1P1: "Dans la première version historique des 9 Axes opératoires de Bloom, la régulation énergétique était abordée de manière transversale à travers les émonctoires, la cascade de l'inflammation et l'axe cortico-surrénalien.",
      sec1P2: "Cependant, les recherches récentes en métabolisme intégratif et en géro-biologie ont démontré que la résistance à l'insuline et l'hyperinsulinémie compensatoire constituent un facteur amplificateur en amont de presque toutes les dysfonctions chroniques modernes : déclin cognitif précoce, inflammation à bas bruit, fatigue postprandiale, surcharge allostatique hépatique et raideur des fascias.",
      ruleBadge: "La règle d'or Bloom",
      ruleQuote: "« Traiter le cortisol sans réguler l'insuline est vain ; moduler l'immunité sans libérer la mitochondrie est incomplet. Le métabolisme du glucose est le socle énergétique sur lequel repose toute tentative de reset homéostasique. »",
      sec2Badge: "Chronologie Physiologique",
      sec2Title: "Les 4 étapes de l'engorgement métabolique",
      sec2Desc: "Comment le signal anabolique protecteur se transforme en verrou biologique systémique :",
      sec3Badge: "Bioénergétique Cellulaire",
      sec3Title: "L'arbitrage vital : AMPK vs mTOR",
      sec3Desc: "Chaque cellule vivante possède deux grands capteurs de statut énergétique qui régissent son comportement :",
      ampkTitle: "AMPK",
      ampkSubtitle: "Le capteur de disette",
      ampkDesc: "Activée lorsque le carburant cellulaire diminue. Elle déclenche la biogenèse mitochondriale, la bêta-oxydation des lipides, l'absorption du glucose indépendante de l'insuline et l'autophagie (nettoyage cellulaire).",
      mtorTitle: "mTOR",
      mtorSubtitle: "Le capteur d'abondance",
      mtorDesc: "Stimulé par l'insuline et les acides aminés ramifiés. Il ordonne la croissance, la synthèse protéique et le stockage. Activé sans répit, il bloque le recyclage des déchets et accélère la sénescence tissulaire.",
      sec4Badge: "Neuro-Métabolisme",
      sec4Title: "Insuline cérébrale, clarté mentale et gaine de myéline",
      sec4P1: "Longtemps considéré comme un organe insensible à l'insuline, le système nerveux central s'avère au contraire densément pourvu en récepteurs à l'insuline, particulièrement dans l'hippocampe (siège de la mémoire) et les bulbes olfactifs.",
      sec4P2: "Lorsque la barrière hémato-encéphalique subit l'usure de l'hyperinsulinémie périphérique, le passage de l'insuline vers les neurones diminue. Les oligodendrocytes, cellules hautement énergivores chargées de synthétiser et de réparer la gaine de myéline, manquent alors de carburant, ce qui favorise les brouillards mentaux et la lenteur d'évocation.",
      sec4Cta: "Consulter le dossier d'accompagnement Clarté Mentale & Myéline",
      sec5Badge: "Pharmacognosie Intégrative",
      sec5Title: "Les matières botaniques maîtresses du terrain glucidique",
      sec5Desc: "Des extractions douces en double solvant pour respecter l'intégrité de la matrice végétale :",
      sec6Badge: "Démarche Pratique",
      sec6Title: "Intégrer le métabolisme dans votre parcours Bloom",
      sec6Desc: "Pour accompagner ce terrain sans brutaliser la physiologie, la démarche Bloom privilégie une extraction fractionnée (eau pure contrôlée pour les polyphénols, puis solvant lipophile pour les composés terpéniques) qui garantit la biodisponibilité sans recours à des excipients de synthèse.",
      backAcademy: "Retour au sommaire de l'Académie",
      guideBtn: "Guide : Comment lire le modèle Bloom"
    },
    en: {
      breadcrumbAcademy: "Academy",
      breadcrumbSection: "Understanding the Body",
      breadcrumbTitle: "Glucose metabolism & insulin",
      badge: "New In-Depth Dossier",
      mainTitle: "Glucose Metabolism & Insulin: The Master Conductor of Vital Energy",
      mainDesc: "Far from being a mere blood sugar regulator, insulin is the master anabolic hormone of human physiology. When its signaling falters, it is not merely metabolism that slows down: all 4 architectures—neuro-endocrine, immune, vascular, and tissue—suffer a silent systemic shock wave.",
      disclaimerTitle: "Non-Medical Educational Notice: ",
      disclaimerDesc: "This dossier is an independent educational and scientific resource. It does not diagnose diabetes or metabolic syndrome and does not replace medical treatment or endocrinological care.",
      sec1Badge: "Historical Perspective",
      sec1Title: "Why does insulin have its own dedicated dossier?",
      sec1P1: "In the initial historical version of Bloom's 9 Operating Axes, energy regulation was addressed cross-sectionally through the emunctories, the inflammatory cascade, and the adrenocortical axis.",
      sec1P2: "However, recent research in integrative metabolism and geroscience has shown that insulin resistance and compensatory hyperinsulinemia are upstream amplifiers of nearly all modern chronic dysfunctions: early cognitive decline, low-grade inflammation, postprandial fatigue, hepatic allostatic overload, and fascial stiffness.",
      ruleBadge: "Bloom's Golden Rule",
      ruleQuote: "\"Treating cortisol without regulating insulin is futile; modulating immunity without unburdening the mitochondria is incomplete. Glucose metabolism is the energetic foundation upon which any attempt at homeostatic reset rests.\"",
      sec2Badge: "Physiological Timeline",
      sec2Title: "The 4 Stages of Metabolic Congestion",
      sec2Desc: "How a protective anabolic signal turns into a systemic biological bottleneck:",
      sec3Badge: "Cellular Bioenergetics",
      sec3Title: "The Vital Arbitration: AMPK vs mTOR",
      sec3Desc: "Every living cell possesses two major energy status sensors that govern its behavior:",
      ampkTitle: "AMPK",
      ampkSubtitle: "The scarcity sensor",
      ampkDesc: "Activated when cellular fuel declines. It triggers mitochondrial biogenesis, lipid beta-oxidation, insulin-independent glucose uptake, and autophagy (cellular cleansing).",
      mtorTitle: "mTOR",
      mtorSubtitle: "The abundance sensor",
      mtorDesc: "Stimulated by insulin and branched-chain amino acids. It dictates growth, protein synthesis, and nutrient storage. Unchecked activation impairs waste recycling and accelerates tissue senescence.",
      sec4Badge: "Neuro-Metabolism",
      sec4Title: "Brain Insulin, Mental Clarity, and the Myelin Sheath",
      sec4P1: "Long thought to be an insulin-insensitive organ, the central nervous system is in fact densely populated with insulin receptors, especially in the hippocampus (memory center) and olfactory bulbs.",
      sec4P2: "When the blood-brain barrier suffers from peripheral hyperinsulinemia, insulin transport to neurons drops. Oligodendrocytes, high-energy cells tasked with synthesizing and repairing the myelin sheath, run low on fuel, leading to brain fog and cognitive sluggishness.",
      sec4Cta: "Explore the Mental Clarity & Myelin Support Dossier",
      sec5Badge: "Integrative Pharmacognosy",
      sec5Title: "Key Botanical Materials for the Glycemic Terrain",
      sec5Desc: "Gentle dual-solvent extractions honoring the integrity of the plant matrix:",
      sec6Badge: "Practical Protocol",
      sec6Title: "Integrating Metabolism into Your Bloom Journey",
      sec6Desc: "To support this terrain without stressing physiology, Bloom's method favors fractionated extraction (pure controlled water for polyphenols, then lipophilic solvent for terpene compounds) ensuring bioavailability without synthetic excipients.",
      backAcademy: "Return to Academy Index",
      guideBtn: "Guide: How to Read the Bloom Model"
    },
    de: {
      breadcrumbAcademy: "Akademie",
      breadcrumbSection: "Den Körper Verstehen",
      breadcrumbTitle: "Glukosestoffwechsel & Insulin",
      badge: "Neues Vertiefungs-Dossier",
      mainTitle: "Glukosestoffwechsel & Insulin: Der Dirigent der Lebensenergie",
      mainDesc: "Weit mehr als ein einfacher Blutzuckerregler ist Insulin das anabole Meisterhormon unserer Physiologie. Gerät seine Signalübertragung ins Stocken, verlangsamt sich nicht nur der Stoffwechsel: Alle 4 Architekturen – neuro-endokrin, immunologisch, vaskulär und geweblich – erfahren eine stille Schockwelle.",
      disclaimerTitle: "Nicht-medizinischer Bildungshinweis: ",
      disclaimerDesc: "Dieses Dossier ist eine unabhängige pädagogische und wissenschaftliche Ressource. Es diagnostiziert weder Diabetes noch metabolisches Syndrom und ersetzt keinesfalls eine ärztliche Behandlung oder endokrinologische Betreuung.",
      sec1Badge: "Historische Perspektive",
      sec1Title: "Warum wird Insulin in einem separaten Dossier behandelt?",
      sec1P1: "In der ersten historischen Version der 9 Handlungsachsen von Bloom wurde die Energieregulierung quer durch die Ausleitungsorgane, die Entzündungskaskade und die Nebennierenachse behandelt.",
      sec1P2: "Aktuelle Forschungen in integrativer Stoffwechselbiologie und Alternsforschung zeigen jedoch, dass Insulinresistenz und kompensatorische Hyperinsulinämie fast alle modernen chronischen Dysfunktionen verstärken: frühen kognitiven Abbau, unterschwellige Entzündungen, postprandiale Müdigkeit, hepatische allostatische Last und Fasziensteifigkeit.",
      ruleBadge: "Die goldene Bloom-Regel",
      ruleQuote: "„Cortisol zu behandeln, ohne Insulin zu regulieren, ist vergebens; das Immunsystem zu modulieren, ohne die Mitochondrien zu entlasten, bleibt unvollständig. Der Glukosestoffwechsel ist das energetische Fundament jedes homöostatischen Resets.“",
      sec2Badge: "Physiologische Chronologie",
      sec2Title: "Die 4 Phasen des metabolischen Staus",
      sec2Desc: "Wie sich das schützende anabole Signal in eine systemische biologische Blockade verwandelt:",
      sec3Badge: "Zelluläre Bioenergetik",
      sec3Title: "Die vitale Abwägung: AMPK vs. mTOR",
      sec3Desc: "Jede lebende Zelle besitzt zwei zentrale Energiestatussensoren, die ihr Verhalten steuern:",
      ampkTitle: "AMPK",
      ampkSubtitle: "Der Mangelsensor",
      ampkDesc: "Aktiviert bei abnehmendem zellulärem Treibstoff. Startet die mitochondriale Biogenese, Fettsäureoxidation, insulinunabhängige Glukoseaufnahme und Autophagie (Zellreinigung).",
      mtorTitle: "mTOR",
      mtorSubtitle: "Der Wohlstandssensor",
      mtorDesc: "Stimuliert durch Insulin und Aminosäuren. Befiehlt Wachstum, Proteinsynthese und Speicherung. Daueraktiviert hemmt er das Recycling von Zellabfällen und beschleunigt die Gewebealterung.",
      sec4Badge: "Neuro-Metabolismus",
      sec4Title: "Gehirn-Insulin, mentale Klarheit und Myelinscheide",
      sec4P1: "Lange als insulinunempfindlich angesehen, ist das zentrale Nervensystem dicht mit Insulinrezeptoren besetzt, insbesondere im Hippocampus (Gedächtniszentrum) und den Riechkolben.",
      sec4P2: "Wird die Blut-Hirn-Schranke durch periphere Hyperinsulinämie belastet, sinkt der Insulintransport zu Neuronen. Oligodendrozyten, energiehungrige Zellen für die Myelinscheidenreparatur, geraten in Treibstoffmangel – was zu geistigem Nebel führt.",
      sec4Cta: "Dossier Mentale Klarheit & Myelin aufrufen",
      sec5Badge: "Integrative Pharmakognosie",
      sec5Title: "Botanische Leitpflanzen des Glukose-Terrains",
      sec5Desc: "Schonende Zwei-Phasen-Extraktionen zur Wahrung der Pflanzenmatrix:",
      sec6Badge: "Praktisches Vorgehen",
      sec6Title: "Stoffwechsel in Ihre Bloom-Reise integrieren",
      sec6Desc: "Um dieses Terrain physiologisch schonend zu begleiten, setzt Bloom auf fraktionierte Extraktion (kontrolliertes Wasser für Polyphenole, dann lipophiles Lösungsmittel für Terpene), die Bioverfügbarkeit ohne synthetische Hilfsstoffe sichert.",
      backAcademy: "Zurück zur Akademie-Übersicht",
      guideBtn: "Leitfaden: Wie man das Bloom-Modell liest"
    }
  }[lang] || {
    breadcrumbAcademy: "Académie",
    breadcrumbSection: "Comprendre le Corps",
    breadcrumbTitle: "Métabolisme glucidique & insuline",
    badge: "Nouveau Dossier d'Approfondissement",
    mainTitle: "Métabolisme glucidique & insuline : le chef d'orchestre de l'énergie vitale",
    mainDesc: "Loin d'être un simple régulateur de sucre sanguin, l'insuline est l'hormone anabolique maîtresse de notre physiologie.",
    disclaimerTitle: "Avertissement de non-médicalité : ",
    disclaimerDesc: "Ce dossier est une ressource éducative et scientifique indépendante.",
    sec1Badge: "Perspective Historique",
    sec1Title: "Pourquoi l'insuline fait-elle l'objet d'un dossier séparé ?",
    sec1P1: "Dans la première version historique des 9 Axes opératoires...",
    sec1P2: "Cependant, les recherches récentes...",
    ruleBadge: "La règle d'or Bloom",
    ruleQuote: "« Traiter le cortisol sans réguler l'insuline est vain... »",
    sec2Badge: "Chronologie Physiologique",
    sec2Title: "Les 4 étapes de l'engorgement métabolique",
    sec2Desc: "Comment le signal anabolique protecteur se transforme en verrou biologique systémique :",
    sec3Badge: "Bioénergétique Cellulaire",
    sec3Title: "L'arbitrage vital : AMPK vs mTOR",
    sec3Desc: "Chaque cellule vivante possède deux grands capteurs de statut énergétique qui régissent son comportement :",
    ampkTitle: "AMPK",
    ampkSubtitle: "Le capteur de disette",
    ampkDesc: "Activée lorsque le carburant cellulaire diminue.",
    mtorTitle: "mTOR",
    mtorSubtitle: "Le capteur d'abondance",
    mtorDesc: "Stimulé par l'insuline et les acides aminés ramifiés.",
    sec4Badge: "Neuro-Métabolisme",
    sec4Title: "Insuline cérébrale, clarté mentale et gaine de myéline",
    sec4P1: "Longtemps considéré comme un organe insensible à l'insuline...",
    sec4P2: "Lorsque la barrière hémato-encéphalique subit l'usure...",
    sec4Cta: "Consulter le dossier d'accompagnement Clarté Mentale & Myéline",
    sec5Badge: "Pharmacognosie Intégrative",
    sec5Title: "Les matières botaniques maîtresses du terrain glucidique",
    sec5Desc: "Des extractions douces en double solvant...",
    sec6Badge: "Démarche Pratique",
    sec6Title: "Intégrer le métabolisme dans votre parcours Bloom",
    sec6Desc: "Pour accompagner ce terrain sans brutaliser la physiologie...",
    backAcademy: "Retour au sommaire de l'Académie",
    guideBtn: "Guide : Comment lire le modèle Bloom"
  };

  const metabolicPhases = [
    {
      step: "01",
      title: lang === 'en' 
        ? "Silent Compensatory Hyperinsulinemia"
        : lang === 'de'
        ? "Stille kompensatorische Hyperinsulinämie"
        : "L'Hyperinsulinémie compensatoire silencieuse",
      timeframe: lang === 'en'
        ? "10 to 15 years before blood sugar elevation"
        : lang === 'de'
        ? "10 bis 15 Jahre vor Blutzuckeranstieg"
        : "10 à 15 ans avant l'élévation de la glycémie",
      desc: lang === 'en'
        ? "The pancreas massively overproduces insulin to force glucose into saturated cells. Fasting glucose remains normal, masking the underlying metabolic surge."
        : lang === 'de'
        ? "Die Bauchspeicheldrüse überproduziert massiv Insulin, um Glukose in gesättigte Zellen zu drücken. Der Nüchternblutzucker bleibt normal und maskiert die Überlastung."
        : "Le pancréas surproduit massivement de l'insuline pour forcer l'entrée du glucose dans des cellules saturées. La glycémie à jeun reste normale, masquant l'emballement métabolique sous-jacent (courbe de Kraft).",
      icon: Clock
    },
    {
      step: "02",
      title: lang === 'en'
        ? "Hepato-Muscular Ectopic Saturation"
        : lang === 'de'
        ? "Hepatisch-muskuläre ektopische Sättigung"
        : "La saturation ectopique hépato-musculaire",
      timeframe: lang === 'en'
        ? "Loss of metabolic flexibility"
        : lang === 'de'
        ? "Verlust der metabolischen Flexibilität"
        : "Perte de la flexibilité métabolique",
      desc: lang === 'en'
        ? "Skeletal muscle GLUT4 receptors and hepatocytes develop desensitization. The liver shifts into de novo lipogenesis, releasing triglycerides into circulation."
        : lang === 'de'
        ? "GLUT4-Rezeptoren der Skelettmuskulatur und Hepatozyten desensibilisieren sich. Die Leber schaltet auf De-novo-Lipogenese um und gibt Triglyceride ins Blut ab."
        : "Les récepteurs GLUT4 du muscle squelettique et les hépatocytes développent une désensibilisation. Le foie bascule en lipogenèse de novo (stéatose métabolique fonctionnelle), libérant des triglycérides dans la circulation.",
      icon: Activity
    },
    {
      step: "03",
      title: lang === 'en'
        ? "Mitochondrial Traffic Jam & Oxidative Stress"
        : lang === 'de'
        ? "Mitochondrialer Stau & Oxidativer Stress"
        : "L'embouteillage mitochondrial & Stress oxydatif",
      timeframe: lang === 'en'
        ? "Cellular energy dysfunction"
        : lang === 'de'
        ? "Zelluläre Energiedysfunktion"
        : "Dysfonction énergétique cellulaire",
      desc: lang === 'en'
        ? "Constant excess of carbon substrates overwhelms the respiratory chain. The ATP/AMP ratio blocks AMPK and locks mTOR in activation, halting restorative autophagy."
        : lang === 'de'
        ? "Permanenter Überschuss an Substraten überlastet die Atmungskette. Das ATP/AMP-Verhältnis hemmt AMPK und hält mTOR daueraktiviert, was die Autophagie stoppt."
        : "L'excès permanent de substrats carbonés surcharge la chaîne respiratoire mitochondriale. Le ratio ATP/AMP bloque l'enzyme régulatrice AMPK et maintient mTOR activé en permanence, empêchant l'autophagie salvatrice.",
      icon: Zap
    },
    {
      step: "04",
      title: lang === 'en'
        ? "Tissue Glycation & Systemic Stiffness"
        : lang === 'de'
        ? "Gewebeglykation & Systemische Steifigkeit"
        : "La glycation tissulaire & Raideur systémique",
      timeframe: lang === 'en'
        ? "Micro and macro-circulatory impact"
        : lang === 'de'
        ? "Mikro- und makrozirkulatorische Auswirkung"
        : "Impact micro et macro-circulatoire",
      desc: lang === 'en'
        ? "Reactive glucose derivatives irreversibly bind to structural proteins (collagen, myelin, endothelium), forming AGEs that activate the pro-inflammatory RAGE receptor."
        : lang === 'de'
        ? "Reaktive Glukosederivate binden irreversibel an Strukturproteine (Kollagen, Myelin, Endothel) und bilden AGEs, die den Entzündungsrezeptor RAGE aktivieren."
        : "Les dérivés réactifs du glucose se lient irréversiblement aux protéines de structure (collagène, myéline, endothélium), formant les AGEs (Advanced Glycation End-products) qui activent le récepteur pro-inflammatoire RAGE.",
      icon: Flame
    }
  ];

  const botanicalSynergies = [
    {
      name: lang === 'en' ? "Ceylon Cinnamon" : lang === 'de' ? "Ceylon-Zimt" : "Cannelle de Ceylan",
      latin: "Cinnamomum verum",
      fraction: lang === 'en' ? "Polyphenols & MHCP (Aqueous Fraction A)" : lang === 'de' ? "Polyphenole & MHCP (Wässrige Phase A)" : "Polyphénols & MHCP (Fraction aqueuse A)",
      action: lang === 'en'
        ? "Mimics insulin at the cellular tyrosine kinase receptor and supports peripheral glucose uptake."
        : lang === 'de'
        ? "Ahmt Insulin am zellulären Tyrosinkinase-Rezeptor nach und fördert die Glukoseaufnahme."
        : "Mime l'insuline au niveau du récepteur tyrosine kinase cellulaire et favorise la captation périphérique du glucose.",
      evidence: lang === 'en' ? "Randomized clinical trials & ancient traditional use" : lang === 'de' ? "Randomisierte Studien & traditionelle Anwendung" : "Études cliniques randomisées & usage traditionnel séculaire"
    },
    {
      name: lang === 'en' ? "Botanical Berberine" : lang === 'de' ? "Botanisches Berberin" : "Berbérine Botanique",
      latin: "Berberis aristata",
      fraction: lang === 'en' ? "Benzylisoquinoline Alkaloid (Fraction A/B)" : lang === 'de' ? "Benzylisochinolin-Alkaloid (Phase A/B)" : "Alcaloïde benzylisoquinoléine (Fraction A/B)",
      action: lang === 'en'
        ? "Potent natural activator of cellular AMPK, improving hepatic sensitivity and healthy gut microbiota balance."
        : lang === 'de'
        ? "Starker natürlicher Aktivator der zellulären AMPK, verbessert die Lebersensitivität und moduliert die Darmflora."
        : "Puissant activateur naturel de l'AMPK cellulaire, amélioration de la sensibilité hépatique et modulation saine du microbiote intestinal.",
      evidence: lang === 'en' ? "Human meta-analyses & established cellular biology" : lang === 'de' ? "Meta-Analysen & etablierte Zellbiologie" : "Méta-analyses humaines & biologie cellulaire établie"
    },
    {
      name: "Gymnema",
      latin: "Gymnema sylvestre",
      fraction: lang === 'en' ? "Gymnemic acids (Hydroalcoholic fraction A)" : lang === 'de' ? "Gymnemasäuren (Hydroalkoholische Phase A)" : "Acides gymnémiques (Fraction hydro-alcoolique A)",
      action: lang === 'en'
        ? "Temporarily blocks lingual sweet taste receptors and moderates intestinal absorption of rapid sugars."
        : lang === 'de'
        ? "Blockiert vorübergehend die lingualen Süßrezeptoren und dämpft die intestinale Glukoseaufnahme."
        : "Bloque temporairement les récepteurs lingaux du goût sucré et régule l'absorption intestinale des sucres rapides.",
      evidence: lang === 'en' ? "Millenary Ayurvedic pharmacopoeia & clinical trials" : lang === 'de' ? "Ayurvedische Pharmakopöe & klinische Tests" : "Pharmacopée ayurvédique millénaire & essais cliniques modernes"
    },
    {
      name: lang === 'en' ? "White Mulberry" : lang === 'de' ? "Weiße Maulbeere" : "Mûrier Blanc",
      latin: "Morus alba",
      fraction: "1-Déoxynojirimycine / DNJ (Fraction A)",
      action: lang === 'en'
        ? "Gentle competitive inhibition of intestinal alpha-glucosidases, smoothing postprandial glucose spikes."
        : lang === 'de'
        ? "Sanfte Hemmung der intestinalen Alpha-Glukosidasen, glättet postprandiale Blutzuckerspitzen."
        : "Inhibition compétitive douce des alpha-glucosidases intestinales, lissant l'amplitude des pics de glycémie postprandiale.",
      evidence: lang === 'en' ? "Documented pharmacological research" : lang === 'de' ? "Dokumentierte pharmakologische Forschung" : "Recherche pharmacologique documentée"
    }
  ];

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#f5f0e8] selection:bg-[#c9a84c]/20 selection:text-[#f5f0e8] pb-24 font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Navigation Académie */}
      <AcademyNavigation
        currentView="metabolisme-insuline"
        onNavigate={onNavigate}
        currentPageTitle={t.breadcrumbTitle}
        sectionName={t.breadcrumbSection}
        lang={lang}
      />

      {/* En-tête / Hero */}
      <header className="pt-12 pb-16 px-4 sm:px-6 bg-gradient-to-b from-[#161b22] via-[#0d1117] to-[#161b22] border-b border-[#30363d]">
        <div className="max-w-4xl mx-auto">
          {/* Fil d'Ariane */}
          <nav aria-label="Fil d'Ariane" className="flex items-center gap-2 text-xs text-[#8b949e] mb-6 font-mono">
            <button 
              onClick={() => onNavigate('academie')}
              className="hover:text-[#c9a84c] transition-colors"
            >
              {t.breadcrumbAcademy}
            </button>
            <span>/</span>
            <button 
              onClick={() => onNavigate('academie')}
              className="hover:text-[#c9a84c] transition-colors"
            >
              {t.breadcrumbSection}
            </button>
            <span>/</span>
            <span className="text-[#c9a84c] font-bold">{t.breadcrumbTitle}</span>
          </nav>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c9a84c]/10 border border-[#c9a84c]/30 text-[#c9a84c] text-[11px] font-mono uppercase tracking-widest mb-6">
            <Sparkles className="w-3.5 h-3.5 text-[#c9a84c]" />
            <span>{t.badge}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-[#f5f0e8] tracking-tight leading-[1.15] mb-6">
            {t.mainTitle}
          </h1>

          <p className="text-base sm:text-lg text-[#b8b8b8] leading-relaxed mb-6 font-normal">
            {t.mainDesc}
          </p>

          <div className="p-4 rounded-2xl bg-[#c9a84c]/10 border border-[#c9a84c]/30 flex items-start gap-3 text-xs text-[#c9a84c]">
            <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">{t.disclaimerTitle}</span>
              {t.disclaimerDesc}
            </div>
          </div>
        </div>
      </header>

      {/* Corps du dossier */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-16 space-y-16">

        {/* 1. Pourquoi ce dossier à part ? */}
        <section className="bg-[#161b22] rounded-3xl border border-[#30363d] p-8 sm:p-10 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#c9a84c]/20 text-[#c9a84c] flex items-center justify-center font-bold">
              1
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#c9a84c]">{t.sec1Badge}</span>
              <h2 className="text-2xl font-bold text-white">{t.sec1Title}</h2>
            </div>
          </div>

          <p className="text-sm text-[#c9d1d9] leading-relaxed">
            {t.sec1P1}
          </p>

          <p className="text-sm text-[#c9d1d9] leading-relaxed">
            {t.sec1P2}
          </p>

          <div className="p-5 rounded-2xl bg-[#0d1117] border border-[#c9a84c]/30 text-xs text-[#c9a84c] space-y-2">
            <div className="font-bold font-mono uppercase tracking-wider flex items-center gap-2">
              <Compass className="w-4 h-4" />
              <span>{t.ruleBadge}</span>
            </div>
            <p className="text-[#f5f0e8]/90 italic text-sm">
              {t.ruleQuote}
            </p>
          </div>
        </section>

        {/* FREEMIUM GATE : RÉSISTANCE CELLULAIRE, AMPK/mTOR & EXTRACTIONS BOTANIQUES */}
        <FreemiumPaywallGate
          onNavigate={onNavigate}
          lang={lang}
          title={lang === 'fr' ? 'Débloquez le Dossier Métabolisme Glucidique & Insuline' : lang === 'de' ? 'Glukosestoffwechsel & Insulin freischalten' : 'Unlock Glucose Metabolism & Insulin Dossier'}
          subtitle={lang === 'fr' ? 'L’introduction et la perspective historique sont en libre accès. Débloquez les 4 étapes de l’engorgement métabolique, l’arbitrage bioénergétique AMPK/mTOR, l’insuline cérébrale et les matières botaniques avec votre abonnement.' : lang === 'de' ? 'Einführung frei zugänglich. Schalten Sie alle biochemischen Mechanismen mit Ihrem Abonnement frei.' : 'Introduction open access. Unlock full bioenergetic arbitration and botanical extractions with your subscription.'}
          bulletPoints={[
            lang === 'fr' ? 'Les 4 étapes de la congestion métabolique et résistance périphérique' : 'The 4 stages of metabolic congestion and peripheral resistance',
            lang === 'fr' ? 'L’arbitrage AMPK vs mTOR : autophagie vs prolifération cellulaire' : 'AMPK vs mTOR arbitration: autophagy vs cellular growth',
            lang === 'fr' ? 'Insuline cérébrale, clarté mentale et synthèse de la myéline' : 'Brain insulin, mental clarity and myelin sheath synthesis',
            lang === 'fr' ? 'Pharmacognosie intégrative : berberis, cannelle, fenugrec et gymnéma' : 'Integrative pharmacognosy: berberis, cinnamon, fenugreek, gymnema'
          ]}
        >
          {/* 2. La cascade de la résistance cellulaire */}
          <section className="space-y-6">
          <div className="border-b border-[#30363d] pb-4">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#c9a84c]">{t.sec2Badge}</span>
            <h2 className="text-2xl font-black text-white mt-1">{t.sec2Title}</h2>
            <p className="text-xs text-[#8b949e] mt-1">
              {t.sec2Desc}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            {metabolicPhases.map((phase) => {
              const IconComp = phase.icon;
              return (
                <div key={phase.step} className="bg-[#161b22] rounded-3xl border border-[#30363d] p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-[#c9a84c]/15 text-[#c9a84c] flex items-center justify-center">
                        <IconComp className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-mono font-black text-[#c9a84c] px-2.5 py-1 rounded-full bg-[#0d1117] border border-[#30363d]">
                        Phase {phase.step}
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-[#86efac] block mb-1">{phase.timeframe}</span>
                    <h3 className="font-bold text-base text-white mb-2">{phase.title}</h3>
                    <p className="text-xs text-[#b8b8b8] leading-relaxed mb-4">{phase.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 3. Mitochondries, AMPK & mTOR */}
        <section className="bg-[#161b22] rounded-3xl border border-[#30363d] p-8 sm:p-10 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#c9a84c]/20 text-[#c9a84c] flex items-center justify-center font-bold">
              2
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#c9a84c]">{t.sec3Badge}</span>
              <h2 className="text-2xl font-bold text-white">{t.sec3Title}</h2>
            </div>
          </div>

          <p className="text-sm text-[#c9d1d9] leading-relaxed">
            {t.sec3Desc}
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-[#0d1117] border border-[#30363d] space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-xs text-[#86efac] uppercase">{t.ampkTitle}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-[#8b949e]">{t.ampkSubtitle}</span>
              </div>
              <p className="text-xs text-[#b8b8b8] leading-relaxed">
                {t.ampkDesc}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#0d1117] border border-[#c9a84c]/40 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-xs text-[#c9a84c] uppercase">{t.mtorTitle}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-[#8b949e]">{t.mtorSubtitle}</span>
              </div>
              <p className="text-xs text-[#b8b8b8] leading-relaxed">
                {t.mtorDesc}
              </p>
            </div>
          </div>
        </section>

        {/* 4. Le dialogue Cerveau - Myéline - Insuline */}
        <section className="bg-[#161b22] rounded-3xl border border-[#30363d] p-8 sm:p-10 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#c9a84c]/20 text-[#c9a84c] flex items-center justify-center font-bold">
              3
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#c9a84c]">{t.sec4Badge}</span>
              <h2 className="text-2xl font-bold text-white">{t.sec4Title}</h2>
            </div>
          </div>

          <p className="text-sm text-[#c9d1d9] leading-relaxed">
            {t.sec4P1}
          </p>

          <p className="text-sm text-[#c9d1d9] leading-relaxed">
            {t.sec4P2}
          </p>

          <div className="pt-2">
            <button
              onClick={() => onNavigate('protocole-myeline')}
              className="text-xs font-bold text-[#c9a84c] hover:underline flex items-center gap-1.5"
            >
              <span>{t.sec4Cta}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </section>

        {/* 5. Les Synergies Botaniques du Totum */}
        <section className="space-y-6">
          <div className="border-b border-[#30363d] pb-4">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#c9a84c]">{t.sec5Badge}</span>
            <h2 className="text-2xl font-black text-white mt-1">{t.sec5Title}</h2>
            <p className="text-xs text-[#8b949e] mt-1">
              {t.sec5Desc}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            {botanicalSynergies.map((bot, idx) => (
              <div key={idx} className="bg-[#161b22] rounded-3xl border border-[#30363d] p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-base text-white">{bot.name}</h3>
                    <span className="text-xs font-mono italic text-[#8b949e]">{bot.latin}</span>
                  </div>
                  <Leaf className="w-4 h-4 text-[#86efac]" />
                </div>
                <div className="text-[11px] font-mono text-[#c9a84c] bg-[#0d1117] px-3 py-1 rounded-lg border border-white/5">
                  {bot.fraction}
                </div>
                <p className="text-xs text-[#c9d1d9] leading-relaxed">
                  {bot.action}
                </p>
                <div className="pt-2 border-t border-white/5 text-[10px] text-[#8b949e] flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-[#86efac]" />
                  <span>{bot.evidence}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 6. Conclusion & Recommandation Méthodologique */}
        <section className="bg-gradient-to-br from-[#161b22] via-[#0d1117] to-[#1c2430] rounded-3xl border border-[#c9a84c]/40 p-8 sm:p-10 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#c9a84c] text-[#0d1117] flex items-center justify-center font-black">
              4
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#c9a84c]">{t.sec6Badge}</span>
              <h2 className="text-2xl font-bold text-white">{t.sec6Title}</h2>
            </div>
          </div>

          <p className="text-sm text-[#c9d1d9] leading-relaxed">
            {t.sec6Desc}
          </p>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10">
            <button
              onClick={() => onNavigate('academie')}
              className="px-6 py-3 rounded-xl bg-[#c9a84c] hover:bg-[#d8b85c] text-[#0d1117] font-black uppercase text-xs tracking-wider flex items-center gap-2 cursor-pointer transition-all shadow-md"
            >
              <span>{t.backAcademy}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigate('comment-lire-modele-bloom')}
              className="px-6 py-3 rounded-xl bg-[#0d1117] hover:bg-[#161b22] text-[#f5f0e8] border border-[#30363d] hover:border-[#c9a84c] text-xs font-bold flex items-center gap-2 cursor-pointer transition-all"
            >
              <span>{t.guideBtn}</span>
              <ArrowRight className="w-4 h-4 text-[#c9a84c]" />
            </button>
          </div>
        </section>
        </FreemiumPaywallGate>

      </main>
    </div>
  );
};

export default MetabolismeInsulineContent;
