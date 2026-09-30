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
  Feather
} from 'lucide-react';
import { View } from './types';
import { Language } from './translations';
import AcademyNavigation from './components/AcademyNavigation';
import { FreemiumPaywallGate } from './components/FreemiumPaywallGate';

interface ChargeAllostatiqueContentProps {
  onNavigate: (view: View, param?: string) => void;
  lang?: Language;
}

export const ChargeAllostatiqueContent: React.FC<ChargeAllostatiqueContentProps> = ({ 
  onNavigate, 
  lang = 'fr' 
}) => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": lang === 'en'
      ? "Allostatic Load: Understanding the Body's Adaptive Wear and Tear"
      : lang === 'de'
      ? "Die allostatische Last: Die adaptive Abnutzung des Körpers verstehen"
      : "La Charge Allostatique : Comprendre l'usure adaptative du corps",
    "description": lang === 'en'
      ? "Understand the biological concept of allostatic load and overload, neuro-hormonal chronic stress regulation, and relief pathways through homeostasis."
      : lang === 'de'
      ? "Verstehen Sie das biologische Konzept der allostatischen Last und Überlastung, neuro-hormonelle chronische Stressregulation und Entlastungswege durch Homöostase."
      : "Comprendre le concept biologique de charge et de surcharge allostatique, la régulation neuro-hormonale du stress chronique et les voies de délestage par l'homéostasie.",
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
      breadcrumbTitle: "La Charge Allostatique",
      badge: "Physiologie de l'Adaptation & Stress Chronique",
      mainTitle: "La Charge Allostatique : comprendre l'usure adaptative du corps",
      mainDesc: "Le corps humain ne s'effondre pas sans prévenir : il paie le prix de son adaptation continue. Découvert par les neurobiologistes Peter Sterling et Bruce McEwen, le concept d'allostasie explique comment le vivant maintient sa stabilité par le changement — et pourquoi l'accumulation de ces ajustements finit par verrouiller nos équilibres vitaux.",
      disclaimerTitle: "Cadre pédagogique Bloom : ",
      disclaimerDesc: "Ce dossier détaille un modèle de recherche en psycho-neuro-immunologie. Il ne constitue pas un diagnostic de stress ou de burnout et ne se substitue pas à une consultation médicale.",
      sec1Badge: "Origine Biologique",
      sec1Title: "Homéostasie vs Allostasie : la nuance capitale",
      sec1P1: "Historiquement formalisée par Claude Bernard puis Walter Cannon, l'homéostasie décrit le maintien rigide de constantes vitales étroites indispensables à la survie immédiate : température centrale (37 °C), pH sanguin (7,35 - 7,45) ou oxygénation tissulaire.",
      sec1P2: "En 1988, Sterling et Eyer forgent le terme d'allostasie (du grec allo, variable, et stasis, stable) : c'est la capacité du corps à atteindre la stabilité à travers le changement dynamique. Pour courir face à un danger ou surmonter une nuit blanche, l'organisme ne garde pas ses paramètres stables : il augmente sa pression artérielle, libère du glucose, sécrète du cortisol et met en veille la digestion.",
      homeoTitle: "Homéostasie",
      homeoDesc: "Stabilité par constance. Paramètres fixes et vitaux non négociables. Si l'homéostasie du pH ou de la glycémie immédiate rompt, la cellule meurt en quelques minutes.",
      alloTitle: "Allostasie",
      alloDesc: "Stabilité par adaptation. Paramètres hautement flexibles (cortisol, rythme cardiaque, flux sanguin) qui fluctuent pour protéger l'homéostasie des organes nobles.",
      sec2Badge: "Définition de Bruce McEwen",
      sec2Title: "Le coût biologique de l'adaptation continue",
      sec2P1: "Chaque fois que le système allostatique s'active pour répondre à un défi, il consomme de l'énergie, mobilise des enzymes, produit des métabolites oxydants et modifie l'expression de récepteurs cellulaires.",
      sec2Quote: "« La charge allostatique est le prix que le corps paie pour être forcé de s'adapter continuellement à un environnement physique ou émotionnel trop exigeant. »",
      sec2Author: "— Dr Bruce McEwen, Rockefeller University",
      sec2P2: "Tant que les stresseurs sont suivis d'une phase de relâchement et de décharge, l'usure est infime et la plasticité biologique se renforce (effet d'hormèse). En revanche, lorsque les alarmes ne s'éteignent jamais, la charge allostatique se transforme en surcharge allostatique (allostatic overload) : les mécanismes protecteurs se retournent contre les tissus qu'ils devaient sauvegarder.",
      sec3Badge: "Cartographie Clinique",
      sec3Title: "Les 4 trajectoires d'épuisement allostatique",
      sec3Desc: "Bruce McEwen a identifié quatre schémas précis où la mécanique adaptative se dérègle :",
      consequenceLabel: "Conséquence : ",
      sec4Badge: "Évaluation Pédagogique",
      sec4Title: "Comment se mesure la charge allostatique ?",
      sec4Desc: "La recherche médicale ne s'arrête pas à un seul chiffre : elle évalue un score composite croisant trois étages d'impacts physiologiques.",
      sec5Badge: "La Démarche Bloom",
      sec5Title: "Le délestage : libérer le terrain saturé",
      foundingPrinciple: "Principe Fondateur",
      foundingQuote: "« Votre corps n’est pas cassé. Il est verrouillé par une charge adaptative devenue trop lourde. »",
      sec5P1: "Traiter le symptôme isolé (faire baisser la tension avec un vasodilatateur ou masquer une douleur avec un anti-inflammatoire sans modifier le terrain) ne fait qu'ajouter une contrainte chimique supplémentaire.",
      sec5P2: "Dans la méthodologie Bloom, délester la charge allostatique s'opère par trois leviers coordonnés :",
      lever1Title: "1. Drainer les émonctoires",
      lever1Desc: "Alléger la recirculation hépato-rénale pour réduire le signal d'alarme toxique interne.",
      lever2Title: "2. Moduler l'Axe HPA",
      lever2Desc: "Utiliser des adaptogènes totum (rhodiola, ashwagandha) pour réinitialiser la sensibilité des récepteurs au cortisol.",
      lever3Title: "3. Soutien Vagal & SEC",
      lever3Desc: "Stimuler le nerf vague et le système endocannabinoïde pour activer la phase de repos et de réparation (Rest & Digest).",
      ctaReset: "Découvrir le Reset Homéostasique",
      ctaInsuline: "Dossier Métabolisme & Insuline",
      nextModule: "Module suivant dans Comprendre le Corps :",
      prevLink: "← Les 4 Architectures",
      nextLink: "Les 9 Axes historiques →"
    },
    en: {
      breadcrumbAcademy: "Academy",
      breadcrumbSection: "Understanding the Body",
      breadcrumbTitle: "Allostatic Load",
      badge: "Physiology of Adaptation & Chronic Stress",
      mainTitle: "Allostatic Load: Understanding Adaptive Wear and Tear on the Body",
      mainDesc: "The human body does not break down without warning: it pays the price of continuous adaptation. Formulated by neurobiologists Peter Sterling and Bruce McEwen, the concept of allostasis explains how living organisms achieve stability through change—and why the accumulation of these adjustments eventually locks our vital balance.",
      disclaimerTitle: "Bloom Educational Framework: ",
      disclaimerDesc: "This dossier details a research model in psycho-neuro-immunology. It does not constitute a clinical diagnosis of stress or burnout and is not a substitute for medical consultation.",
      sec1Badge: "Biological Origin",
      sec1Title: "Homeostasis vs Allostasis: The Crucial Distinction",
      sec1P1: "Historically formalized by Claude Bernard and Walter Cannon, homeostasis describes the strict preservation of tight vital constants indispensable to immediate survival: core temperature (37°C), blood pH (7.35-7.45), or tissue oxygenation.",
      sec1P2: "In 1988, Sterling and Eyer coined the term allostasis (from Greek allo, variable, and stasis, stable): the ability of the body to achieve stability through dynamic change. To flee danger or survive a sleepless night, the organism does not keep parameters constant: it elevates blood pressure, mobilizes glucose, releases cortisol, and pauses digestion.",
      homeoTitle: "Homeostasis",
      homeoDesc: "Stability through constancy. Fixed, non-negotiable vital parameters. If pH or acute blood sugar homeostasis fails, cells die within minutes.",
      alloTitle: "Allostasis",
      alloDesc: "Stability through adaptation. Highly flexible parameters (cortisol, heart rate, blood flow) fluctuating dynamically to safeguard the homeostasis of vital organs.",
      sec2Badge: "Bruce McEwen's Definition",
      sec2Title: "The Biological Cost of Ongoing Adaptation",
      sec2P1: "Each time the allostatic system activates to meet a challenge, it expends energy, recruits enzymes, generates oxidative metabolites, and modulates cell receptor expression.",
      sec2Quote: "\"Allostatic load is the price the body pays for being forced to adapt constantly to adverse physical or emotional circumstances.\"",
      sec2Author: "— Dr. Bruce McEwen, Rockefeller University",
      sec2P2: "As long as stressors are followed by recovery and de-escalation, wear is minimal and biological resilience increases (hormesis). However, when the alarm never shuts down, allostatic load turns into allostatic overload: protective mechanisms turn against the very tissues they were meant to preserve.",
      sec3Badge: "Clinical Mapping",
      sec3Title: "The 4 Trajectories of Allostatic Exhaustion",
      sec3Desc: "Bruce McEwen identified four precise patterns where adaptive mechanics break down:",
      consequenceLabel: "Consequence: ",
      sec4Badge: "Educational Evaluation",
      sec4Title: "How is Allostatic Load Measured?",
      sec4Desc: "Medical research relies not on a single number, but on a composite score assessing three tiers of physiological impact.",
      sec5Badge: "The Bloom Approach",
      sec5Title: "Unburdening: Freeing the Saturated Terrain",
      foundingPrinciple: "Foundational Principle",
      foundingQuote: "\"Your body is not broken. It is locked by an adaptive load that has become too heavy.\"",
      sec5P1: "Treating an isolated symptom (lowering blood pressure with a vasodilator or masking pain with an anti-inflammatory without addressing the biological terrain) merely adds an extra chemical burden.",
      sec5P2: "In Bloom's methodology, easing allostatic load operates through three coordinated levers:",
      lever1Title: "1. Drain Emunctories",
      lever1Desc: "Relieve hepato-renal recirculation to reduce internal toxic alarm signals.",
      lever2Title: "2. Modulate HPA Axis",
      lever2Desc: "Use totum adaptogens (rhodiola, ashwagandha) to reset cortisol receptor sensitivity.",
      lever3Title: "3. Vagal & ECS Support",
      lever3Desc: "Stimulate the vagus nerve and endocannabinoid system to activate the Rest & Digest restorative state.",
      ctaReset: "Discover Homeostatic Reset",
      ctaInsuline: "Metabolism & Insulin Dossier",
      nextModule: "Next module in Understanding the Body:",
      prevLink: "← The 4 Architectures",
      nextLink: "The 9 Historical Axes →"
    },
    de: {
      breadcrumbAcademy: "Akademie",
      breadcrumbSection: "Den Körper Verstehen",
      breadcrumbTitle: "Die allostatische Last",
      badge: "Physiologie der Anpassung & Chronischer Stress",
      mainTitle: "Die allostatische Last: Die adaptive Abnutzung des Körpers verstehen",
      mainDesc: "Der menschliche Körper bricht nicht ohne Vorwarnung zusammen: Er zahlt den Preis seiner kontinuierlichen Anpassung. Entdeckt von den Neurobiologen Peter Sterling und Bruce McEwen erklärt das Konzept der Allostase, wie der Organismus Stabilität durch Veränderung wahrt – und warum die Anhäufung dieser Anpassungen schließlich unsere lebenswichtigen Gleichgewichte blockiert.",
      disclaimerTitle: "Pädagogischer Bloom-Rahmen: ",
      disclaimerDesc: "Dieses Dossier erläutert ein Forschungsmodell der Psychoneuroimmunologie. Es stellt keine klinische Diagnose von Stress oder Burnout dar und ersetzt keine ärztliche Konsultation.",
      sec1Badge: "Biologische Herkunft",
      sec1Title: "Homöostase vs. Allostase: Die entscheidende Nuance",
      sec1P1: "Historisch von Claude Bernard und Walter Cannon formalisiert, beschreibt Homöostase die strikte Einhaltung enger Lebenskonstanten für das unmittelbare Überleben: Kerntemperatur (37 °C), Blut-pH (7,35 - 7,45) oder Gewebssauerstoff.",
      sec1P2: "1988 prägten Sterling und Eyer den Begriff Allostase (von griech. allo, veränderlich, und stasis, stabil): die Fähigkeit des Körpers, Stabilität durch dynamischen Wandel zu erreichen. Bei Gefahr oder Schlafmangel hält der Körper Werte nicht starr: Er steigert Blutdruck, mobilisiert Glukose, schüttet Cortisol aus und dämpft die Verdauung.",
      homeoTitle: "Homöostase",
      homeoDesc: "Stabilität durch Konstanz. Feste, nicht verhandelbare Vitalparameter. Bricht die pH- oder Glukose-Homöostase zusammen, stirbt die Zelle innerhalb von Minuten.",
      alloTitle: "Allostase",
      alloDesc: "Stabilität durch Anpassung. Hochflexible Parameter (Cortisol, Puls, Durchblutung), die schwanken, um die Homöostase der lebenswichtigen Organe zu sichern.",
      sec2Badge: "Definition von Bruce McEwen",
      sec2Title: "Die biologischen Kosten kontinuierlicher Anpassung",
      sec2P1: "Jedes Mal, wenn das allostatische System anspringt, verbraucht es Energie, rekrutiert Enzyme, erzeugt oxidative Metaboliten und verändert die Rezeptorexpression.",
      sec2Quote: "„Die allostatische Last ist der Preis, den der Körper dafür zahlt, sich fortlaufend an eine überfordernde Umgebung anpassen zu müssen.“",
      sec2Author: "— Dr. Bruce McEwen, Rockefeller University",
      sec2P2: "Solange auf Stressoren Erholungsphasen folgen, ist die Abnutzung minimal und die biologische Plastizität wächst (Hormesis). Bleiben die Alarmsignale jedoch daueraktiv, wird allostatische Last zur allostatischen Überlastung (allostatic overload): Die Schutzmechanismen wenden sich gegen das eigene Gewebe.",
      sec3Badge: "Klinische Kartierung",
      sec3Title: "Die 4 Muster allostatischer Erschöpfung",
      sec3Desc: "Bruce McEwen identifizierte vier präzise Fehlregulationsmuster der adaptiven Mechanik:",
      consequenceLabel: "Folge: ",
      sec4Badge: "Pädagogische Bewertung",
      sec4Title: "Wie wird die allostatische Last gemessen?",
      sec4Desc: "Die Forschung stützt sich nicht auf einen Einzelwert, sondern auf einen zusammengesetzten Score aus drei physiologischen Ebenen.",
      sec5Badge: "Der Bloom-Ansatz",
      sec5Title: "Entlastung: Das gesättigte Terrain befreien",
      foundingPrinciple: "Grundlegendes Prinzip",
      foundingQuote: "„Ihr Körper ist nicht kaputt. Er ist durch eine zu schwere adaptive Last blockiert.“",
      sec5P1: "Isolierte Symptome zu behandeln (Blutdruck senken oder Schmerzen betäuben, ohne das Terrain zu verändern), fügt lediglich eine chemische Zusatzbelastung hinzu.",
      sec5P2: "In der Bloom-Methode erfolgt die allostatische Entlastung über drei koordinierte Hebel:",
      lever1Title: "1. Ausleitungsorgane unterstützen",
      lever1Desc: "Hepatisch-renale Rezirkulation entlasten, um innere toxische Alarmsignale zu reduzieren.",
      lever2Title: "2. HPA-Achse modulieren",
      lever2Desc: "Totum-Adaptogene (Rhodiola, Ashwagandha) einsetzen, um die Cortisolrezeptor-Sensitivität neu zu kalibrieren.",
      lever3Title: "3. Vagus- & Endocannabinoid-Support",
      lever3Desc: "Vagusnerv und Endocannabinoid-System stimulieren, um die Rest-and-Digest-Erholungsphase zu aktivieren.",
      ctaReset: "Homöostatischen Reset entdecken",
      ctaInsuline: "Dossier Stoffwechsel & Insulin",
      nextModule: "Nächstes Modul in Den Körper Verstehen:",
      prevLink: "← Die 4 Architekturen",
      nextLink: "Die 9 Historischen Achsen →"
    }
  }[lang] || {
    breadcrumbAcademy: "Académie",
    breadcrumbSection: "Comprendre le Corps",
    breadcrumbTitle: "La Charge Allostatique",
    badge: "Physiologie de l'Adaptation & Stress Chronique",
    mainTitle: "La Charge Allostatique : comprendre l'usure adaptative du corps",
    mainDesc: "Le corps humain ne s'effondre pas sans prévenir...",
    disclaimerTitle: "Cadre pédagogique Bloom : ",
    disclaimerDesc: "Ce dossier détaille un modèle de recherche...",
    sec1Badge: "Origine Biologique",
    sec1Title: "Homéostasie vs Allostasie : la nuance capitale",
    sec1P1: "Historiquement formalisée par Claude Bernard...",
    sec1P2: "En 1988, Sterling et Eyer forgent le terme...",
    homeoTitle: "Homéostasie",
    homeoDesc: "Stabilité par constance...",
    alloTitle: "Allostasie",
    alloDesc: "Stabilité par adaptation...",
    sec2Badge: "Définition de Bruce McEwen",
    sec2Title: "Le coût biologique de l'adaptation continue",
    sec2P1: "Chaque fois que le système allostatique s'active...",
    sec2Quote: "« La charge allostatique est le prix... »",
    sec2Author: "— Dr Bruce McEwen",
    sec2P2: "Tant que les stresseurs sont suivis...",
    sec3Badge: "Cartographie Clinique",
    sec3Title: "Les 4 trajectoires d'épuisement allostatique",
    sec3Desc: "Bruce McEwen a identifié quatre schémas précis...",
    consequenceLabel: "Conséquence : ",
    sec4Badge: "Évaluation Pédagogique",
    sec4Title: "Comment se mesure la charge allostatique ?",
    sec4Desc: "La recherche médicale ne s'arrête pas à un seul chiffre...",
    sec5Badge: "La Démarche Bloom",
    sec5Title: "Le délestage : libérer le terrain saturé",
    foundingPrinciple: "Principe Fondateur",
    foundingQuote: "« Votre corps n’est pas cassé... »",
    sec5P1: "Traiter le symptôme isolé...",
    sec5P2: "Dans la méthodologie Bloom...",
    lever1Title: "1. Drainer les émonctoires",
    lever1Desc: "Alléger la recirculation...",
    lever2Title: "2. Moduler l'Axe HPA",
    lever2Desc: "Utiliser des adaptogènes...",
    lever3Title: "3. Soutien Vagal & SEC",
    lever3Desc: "Stimuler le nerf vague...",
    ctaReset: "Découvrir le Reset Homéostasique",
    ctaInsuline: "Dossier Métabolisme & Insuline",
    nextModule: "Module suivant dans Comprendre le Corps :",
    prevLink: "← Les 4 Architectures",
    nextLink: "Les 9 Axes historiques →"
  };

  const allostaticPatterns = [
    {
      num: "01",
      title: lang === 'en'
        ? "Repeated Hits"
        : lang === 'de'
        ? "Wiederholte Reize (Repeated Hits)"
        : "Chocs répétés (Repeated Hits)",
      desc: lang === 'en'
        ? "An uninterrupted succession of physiological, environmental, or psychological stressors leaving zero recovery interval for the neuro-endocrine system."
        : lang === 'de'
        ? "Eine ununterbrochene Folge von Stressoren, die dem neuro-endokrinen System keinerlei Erholungsfenster lässt."
        : "Une succession ininterrompue de stresseurs physiologiques, environnementaux ou psychiques ne laissant aucun intervalle de récupération au système neuro-endocrinien.",
      consequence: lang === 'en'
        ? "Repeated catecholamine and cortisol spikes, progressive baseline inflammation."
        : lang === 'de'
        ? "Wiederholte Spitzen von Katecholaminen und Cortisol, schleichende Grundentzündung."
        : "Pics répétés de catécholamines et de cortisol, inflammation basale progressive.",
      icon: Activity
    },
    {
      num: "02",
      title: lang === 'en'
        ? "Lack of Adaptation"
        : lang === 'de'
        ? "Fehlende Gewöhnung (Lack of Adaptation)"
        : "Défaut d'habituation (Lack of Adaptation)",
      desc: lang === 'en'
        ? "The body fails to habituate to the same repeated stressor, triggering a maximal disproportionate alarm response every time."
        : lang === 'de'
        ? "Der Organismus gewöhnt sich nicht an den gleichen wiederholten Stressor und löst jedes Mal maximale Alarmreaktionen aus."
        : "L'organisme ne parvient plus à s'habituer à un même stresseur répété et déclenche à chaque fois une réponse d'alerte maximale disproportionnée.",
      consequence: lang === 'en'
        ? "Premature membrane receptor depletion and functional adrenal fatigue."
        : lang === 'de'
        ? "Vorzeitige Rezeptorerschöpfung und funktionelle Nebennierenmüdigkeit."
        : "Épuisement prématuré des récepteurs membranaires et fatigue surrénalienne fonctionnelle.",
      icon: AlertTriangle
    },
    {
      num: "03",
      title: lang === 'en'
        ? "Delayed Shut-off"
        : lang === 'de'
        ? "Verzögerte Abschaltung (Delayed Shut-off)"
        : "Réponse prolongée (Delayed Shut-off)",
      desc: lang === 'en'
        ? "The alarm remains on hours or days after the threat is gone. Hypothalamic-pituitary negative feedback is impaired."
        : lang === 'de'
        ? "Der Alarm bleibt Stunden oder Tage nach Bedrohungsende aktiv. Die hypothalamische Rückkopplungsschleife ist gestört."
        : "L'alarme reste activée des heures ou des jours après la disparition de la menace. La boucle de rétrocontrôle négatif hypothalamo-hypophysaire est altérée.",
      consequence: lang === 'en'
        ? "Nocturnal hypercortisolemia, blocked cellular regeneration, and tissue catabolism."
        : lang === 'de'
        ? "Nächtliche Hypercortisolämie, blockierte Zellregeneration und Gewebekatabolismus."
        : "Hypercortisolemie nocturne, blocage de la régénération cellulaire et catabolisme tissulaire.",
      icon: Clock
    },
    {
      num: "04",
      title: lang === 'en'
        ? "Inadequate Response"
        : lang === 'de'
        ? "Unzureichende Antwort (Inadequate Response)"
        : "Réponse inadéquate (Inadequate Response)",
      desc: lang === 'en'
        ? "Faced with a stressor, adaptive mediator output collapses. The immune system is no longer restrained by regulatory cortisol."
        : lang === 'de'
        ? "Die Ausschüttung adaptiver Mediatoren bricht ein. Das Immunsystem wird nicht mehr durch regulatorisches Cortisol gebremst."
        : "Face au stresseur, la sécrétion de médiateurs adaptatifs s'effondre. Le système immunitaire n'est plus freiné par le cortisol régulateur.",
      consequence: lang === 'en'
        ? "Systemic inflammatory flare-ups, peripheral autoimmune hyper-reactivity."
        : lang === 'de'
        ? "Systemische Entzündungsschübe, periphere autoimmune Überreaktivität."
        : "Flambées inflammatoires systémiques, hyper-réactivité auto-immune périphérique.",
      icon: Flame
    }
  ];

  const biomarkers = [
    {
      domain: lang === 'en' ? "Primary Mediators" : lang === 'de' ? "Primäre Mediatoren" : "Médiateurs primaires",
      subtitle: lang === 'en' ? "Immediate neuro-endocrine signals" : lang === 'de' ? "Unmittelbare neuro-endokrine Signale" : "Signaux neuro-endocriniens immédiats",
      items: lang === 'en'
        ? ["Free salivary cortisol & circadian curve", "DHEA-S (anabolism index)", "Plasma adrenaline & noradrenaline", "Heart Rate Variability (HRV / Vagal Tone)"]
        : lang === 'de'
        ? ["Freies Speichelcortisol & zirkadiane Kurve", "DHEA-S (Anabolismus)", "Plasma-Adrenalin & Noradrenalin", "Herzfrequenzvariabilität (HRV / Vagustonus)"]
        : ["Cortisol salivaire libre & rythme circadien", "DHEA-S (anabolisme)", "Adrénaline & Noradrénaline plasmatiques", "Variabilité de la Fréquence Cardiaque (VRC / Vagal Tone)"]
    },
    {
      domain: lang === 'en' ? "Secondary Mediators" : lang === 'de' ? "Sekundäre Mediatoren" : "Médiateurs secondaires",
      subtitle: lang === 'en' ? "Metabolic & immune consequences" : lang === 'de' ? "Metabolische & immunologische Folgen" : "Conséquences métaboliques et immunitaires",
      items: lang === 'en'
        ? ["High-sensitivity C-Reactive Protein (hs-CRP)", "Interleukin-6 (IL-6) & TNF-alpha", "Fasting insulin & HOMA-IR index", "Systolic / diastolic blood pressure", "Waist-to-hip ratio"]
        : lang === 'de'
        ? ["Hochsensitives C-reaktives Protein (hs-CRP)", "Interleukin-6 (IL-6) & TNF-alpha", "Nüchterninsulin & HOMA-IR Index", "Systolischer / diastolischer Blutdruck", "Taille-Hüft-Verhältnis"]
        : ["Protéine C-Réactive ultrasensible (hs-CRP)", "Interleukine-6 (IL-6) & TNF-alpha", "Insuline à jeun & index HOMA-IR", "Tension artérielle systolique / diastolique", "Rapport Tour de taille / Tour de hanches"]
    },
    {
      domain: lang === 'en' ? "Tertiary Consequences" : lang === 'de' ? "Tertiäre Konsequenzen" : "Conséquences tertiaires",
      subtitle: lang === 'en' ? "Structural terrain shifts" : lang === 'de' ? "Strukturelle Terrain-Verschiebungen" : "Basculement structurel des terrains",
      items: lang === 'en'
        ? ["Hippocampal atrophy & neuro-inflammation", "Intestinal hyperpermeability (leaky gut)", "Mitochondrial dysfunction & chronic fatigue", "Arterial stiffness & tissue glycation"]
        : lang === 'de'
        ? ["Hippocampus-Atrophie & Neuroinflammation", "Darm-Hyperpermeabilität (Leaky Gut)", "Mitochondriale Dysfunktion & Erschöpfung", "Arteriensteifigkeit & Gewebeglykation"]
        : ["Atrophie de l'hippocampe & neuro-inflammation", "Hyperperméabilité intestinale (leaky gut)", "Dysfonction mitochondriale & fatigue chronique", "Raideur artérielle & glycation tissulaire"]
    }
  ];

  const curT = t;

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#f5f0e8] selection:bg-[#c9a84c]/20 selection:text-[#f5f0e8] pb-24 font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Navigation Académie */}
      <AcademyNavigation
        currentView="charge-allostatique"
        onNavigate={onNavigate}
        currentPageTitle={curT.breadcrumbTitle}
        sectionName={curT.breadcrumbSection}
        lang={lang}
      />

      {/* Fil d'Ariane & En-tête */}
      <header className="pt-12 pb-16 px-4 sm:px-6 bg-gradient-to-b from-[#161b22] via-[#0d1117] to-[#161b22] border-b border-[#30363d]">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb textuel */}
          <nav aria-label="Fil d'Ariane" className="flex items-center gap-2 text-xs text-[#8b949e] mb-6 font-mono">
            <button 
              onClick={() => onNavigate('academie')}
              className="hover:text-[#c9a84c] transition-colors"
            >
              {curT.breadcrumbAcademy}
            </button>
            <span>/</span>
            <button 
              onClick={() => onNavigate('academie')}
              className="hover:text-[#c9a84c] transition-colors"
            >
              {curT.breadcrumbSection}
            </button>
            <span>/</span>
            <span className="text-[#c9a84c] font-bold">{curT.breadcrumbTitle}</span>
          </nav>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c9a84c]/10 border border-[#c9a84c]/30 text-[#c9a84c] text-[11px] font-mono uppercase tracking-widest mb-6">
            <Battery className="w-3.5 h-3.5 text-[#c9a84c]" />
            <span>{curT.badge}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-[#f5f0e8] tracking-tight leading-[1.15] mb-6">
            {curT.mainTitle}
          </h1>

          <p className="text-base sm:text-lg text-[#b8b8b8] leading-relaxed mb-6 font-normal">
            {curT.mainDesc}
          </p>

          <div className="p-4 rounded-2xl bg-[#c9a84c]/10 border border-[#c9a84c]/30 flex items-start gap-3 text-xs text-[#c9a84c]">
            <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">{curT.disclaimerTitle}</span>
              {curT.disclaimerDesc}
            </div>
          </div>
        </div>
      </header>

      {/* Contenu principal */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-16 space-y-16">

        {/* 1. Homéostasie vs Allostasie : La nuance fondamentale */}
        <section className="bg-[#161b22] rounded-3xl border border-[#30363d] p-8 sm:p-10 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#c9a84c]/20 text-[#c9a84c] flex items-center justify-center font-bold">
              1
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#c9a84c]">Origine Biologique</span>
              <h2 className="text-2xl font-bold text-white">Homéostasie vs Allostasie : la nuance capitale</h2>
            </div>
          </div>

          <p className="text-sm text-[#c9d1d9] leading-relaxed">
            Historiquement formalisée par Claude Bernard puis Walter Cannon, l'<strong>homéostasie</strong> décrit le maintien rigide de constantes vitales étroites indispensables à la survie immédiate : température centrale (37 °C), pH sanguin (7,35 - 7,45) ou oxygénation tissulaire.
          </p>

          <p className="text-sm text-[#c9d1d9] leading-relaxed">
            En 1988, Sterling et Eyer forgent le terme d'<strong>allostasie</strong> (du grec <em>allo</em>, variable, et <em>stasis</em>, stable) : c'est la capacité du corps à atteindre la stabilité <em>à travers le changement dynamique</em>. Pour courir face à un danger ou surmonter une nuit blanche, l'organisme ne garde pas ses paramètres stables : il augmente sa pression artérielle, libère du glucose, sécrète du cortisol et met en veille la digestion.
          </p>

          <div className="grid sm:grid-cols-2 gap-4 pt-4">
            <div className="p-5 rounded-2xl bg-[#0d1117] border border-[#30363d]">
              <span className="text-xs font-mono font-bold text-[#86efac] uppercase block mb-1">Homéostasie</span>
              <p className="text-xs text-[#8b949e] leading-relaxed">
                Stabilité par constance. Paramètres fixes et vitaux non négociables. Si l'homéostasie du pH ou de la glycémie immédiate rompt, la cellule meurt en quelques minutes.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-[#0d1117] border border-[#c9a84c]/40">
              <span className="text-xs font-mono font-bold text-[#c9a84c] uppercase block mb-1">Allostasie</span>
              <p className="text-xs text-[#8b949e] leading-relaxed">
                Stabilité par adaptation. Paramètres hautement flexibles (cortisol, rythme cardiaque, flux sanguin) qui fluctuent pour protéger l'homéostasie des organes nobles.
              </p>
            </div>
          </div>
        </section>

        {/* FREEMIUM GATE : DÉFINITIONS CLINIQUES, 4 TRAJECTOIRES & DÉLESTAGE */}
        <FreemiumPaywallGate
          onNavigate={onNavigate}
          lang={lang}
          title={lang === 'fr' ? 'Débloquez l’Analyse Complète de la Charge Allostatique' : lang === 'de' ? 'Vollständige Analyse der Allostatischen Last freischalten' : 'Unlock Full Allostatic Load Analysis'}
          subtitle={lang === 'fr' ? 'L’introduction et la distinction entre Homéostasie et Allostasie sont en accès libre. Débloquez les 4 trajectoires d’épuisement de Bruce McEwen, l’évaluation par biomarqueurs et les leviers de délestage Bloom avec votre abonnement.' : lang === 'de' ? 'Einführung frei zugänglich. Schalten Sie die 4 Erschöpfungsmuster und Biomarker mit Ihrem Abo frei.' : 'Introduction open access. Unlock the 4 exhaustion patterns and biomarker evaluation with your subscription.'}
          bulletPoints={[
            lang === 'fr' ? 'Les 4 trajectoires d’épuisement allostatique (McEwen, Rockefeller)' : 'The 4 allostatic exhaustion trajectories (McEwen, Rockefeller)',
            lang === 'fr' ? 'Biomarqueurs primaires, secondaires et tertiaires d’évaluation' : 'Primary, secondary and tertiary evaluation biomarkers',
            lang === 'fr' ? 'Les 3 leviers de délestage systémique : émonctoires, HPA et Vague' : 'The 3 unburdening levers: emunctories, HPA and Vagus',
            lang === 'fr' ? 'Accès débloqué aux 4 Architectures et 9 Axes historiques' : 'Full access to 4 Architectures and 9 Historical Axes'
          ]}
        >
          {/* 2. Qu'est-ce que la Charge Allostatique ? */}
          <section className="bg-[#161b22] rounded-3xl border border-[#30363d] p-8 sm:p-10 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#c9a84c]/20 text-[#c9a84c] flex items-center justify-center font-bold">
              2
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#c9a84c]">Définition de Bruce McEwen</span>
              <h2 className="text-2xl font-bold text-white">Le coût biologique de l'adaptation continue</h2>
            </div>
          </div>

          <p className="text-sm text-[#c9d1d9] leading-relaxed">
            Chaque fois que le système allostatique s'active pour répondre à un défi, il consomme de l'énergie, mobilise des enzymes, produit des métabolites oxydants et modifie l'expression de récepteurs cellulaires. 
          </p>

          <blockquote className="p-5 rounded-2xl bg-[#0d1117] border-l-4 border-[#c9a84c] italic text-sm text-[#f5f0e8]/90">
            « La charge allostatique est le prix que le corps paie pour être forcé de s'adapter continuellement à un environnement physique ou émotionnel trop exigeant. »
            <span className="block not-italic text-xs text-[#c9a84c] font-mono mt-2">— Dr Bruce McEwen, Rockefeller University</span>
          </blockquote>

          <p className="text-sm text-[#c9d1d9] leading-relaxed">
            Tant que les stresseurs sont suivis d'une phase de relâchement et de décharge, l'usure est infime et la plasticité biologique se renforce (effet d'hormèse). En revanche, lorsque les alarmes ne s'éteignent jamais, la charge allostatique se transforme en <strong>surcharge allostatique (allostatic overload)</strong> : les mécanismes protecteurs se retournent contre les tissus qu'ils devaient sauvegarder.
          </p>
        </section>

        {/* 3. Les 4 Modes de Dysfonction Allostatique */}
        <section className="space-y-6">
          <div className="border-b border-[#30363d] pb-4">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#c9a84c]">Cartographie Clinique</span>
            <h2 className="text-2xl font-black text-white mt-1">Les 4 trajectoires d'épuisement allostatique</h2>
            <p className="text-xs text-[#8b949e] mt-1">
              Bruce McEwen a identifié quatre schémas précis où la mécanique adaptative se dérègle :
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            {allostaticPatterns.map((pat) => {
              const IconComp = pat.icon;
              return (
                <div key={pat.num} className="bg-[#161b22] rounded-3xl border border-[#30363d] p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-[#c9a84c]/15 text-[#c9a84c] flex items-center justify-center">
                        <IconComp className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-mono font-black text-[#c9a84c] px-2.5 py-1 rounded-full bg-[#0d1117] border border-[#30363d]">
                        {pat.num}
                      </span>
                    </div>
                    <h3 className="font-bold text-base text-white mb-2">{pat.title}</h3>
                    <p className="text-xs text-[#b8b8b8] leading-relaxed mb-4">{pat.desc}</p>
                  </div>
                  <div className="pt-3 border-t border-white/5 text-[11px] text-[#86efac]">
                    <strong>Conséquence : </strong>{pat.consequence}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 4. Marqueurs et Niveaux d'évaluation */}
        <section className="bg-[#161b22] rounded-3xl border border-[#30363d] p-8 sm:p-10 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#c9a84c]/20 text-[#c9a84c] flex items-center justify-center font-bold">
              3
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#c9a84c]">Évaluation Pédagogique</span>
              <h2 className="text-2xl font-bold text-white">Comment se mesure la charge allostatique ?</h2>
            </div>
          </div>

          <p className="text-sm text-[#c9d1d9] leading-relaxed">
            La recherche médicale ne s'arrête pas à un seul chiffre : elle évalue un score composite croisant trois étages d'impacts physiologiques.
          </p>

          <div className="space-y-4">
            {biomarkers.map((bm, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-[#0d1117] border border-[#30363d]">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-3">
                  <h3 className="text-sm font-bold text-[#f5f0e8]">{bm.domain}</h3>
                  <span className="text-xs font-mono text-[#c9a84c]">{bm.subtitle}</span>
                </div>
                <div className="grid sm:grid-cols-2 gap-2">
                  {bm.items.map((it, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-[#8b949e]">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#c9a84c]" />
                      <span>{it}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. La perspective Bloom : Délestage & Reset Homéostasique */}
        <section className="bg-gradient-to-br from-[#161b22] via-[#0d1117] to-[#1c2430] rounded-3xl border border-[#c9a84c]/40 p-8 sm:p-10 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#c9a84c] text-[#0d1117] flex items-center justify-center font-black">
              4
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#c9a84c]">La Démarche Bloom</span>
              <h2 className="text-2xl font-bold text-white">Le délestage : libérer le terrain saturé</h2>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#0d1117]/80 border border-[#c9a84c]/30 text-center space-y-3">
            <div className="text-xs font-mono uppercase tracking-widest text-[#c9a84c]">Principe Fondateur</div>
            <p className="text-xl sm:text-2xl font-serif italic text-white leading-relaxed">
              « Votre corps n’est pas cassé. Il est verrouillé par une charge adaptative devenue trop lourde. »
            </p>
          </div>

          <p className="text-sm text-[#c9d1d9] leading-relaxed">
            Traiter le symptôme isolé (faire baisser la tension avec un vasodilatateur ou masquer une douleur avec un anti-inflammatoire sans modifier le terrain) ne fait qu'ajouter une contrainte chimique supplémentaire.
          </p>

          <p className="text-sm text-[#c9d1d9] leading-relaxed">
            Dans la méthodologie Bloom, délester la charge allostatique s'opère par trois leviers coordonnés :
          </p>

          <div className="grid sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-[#161b22] border border-[#30363d] space-y-2">
              <span className="text-xs font-bold text-[#86efac] block">1. Drainer les émonctoires</span>
              <p className="text-xs text-[#8b949e]">
                Alléger la recirculation hépato-rénale pour réduire le signal d'alarme toxique interne.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-[#161b22] border border-[#30363d] space-y-2">
              <span className="text-xs font-bold text-[#c9a84c] block">2. Moduler l'Axe HPA</span>
              <p className="text-xs text-[#8b949e]">
                Utiliser des adaptogènes totum (rhodiola, ashwagandha) pour réinitialiser la sensibilité des récepteurs au cortisol.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-[#161b22] border border-[#30363d] space-y-2">
              <span className="text-xs font-bold text-[#93c5fd] block">3. Soutien Vagal &amp; SEC</span>
              <p className="text-xs text-[#8b949e]">
                Stimuler le nerf vague et le système endocannabinoïde pour activer la phase de repos et de réparation (Rest &amp; Digest).
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-white/10">
            <button
              onClick={() => onNavigate('phytotherapie-reset')}
              className="px-6 py-3 rounded-xl bg-[#c9a84c] hover:bg-[#d8b85c] text-[#0d1117] font-black uppercase text-xs tracking-wider flex items-center gap-2 cursor-pointer transition-all shadow-md"
            >
              <span>Découvrir le Reset Homéostasique</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigate('metabolisme-insuline')}
              className="px-6 py-3 rounded-xl bg-[#0d1117] hover:bg-[#161b22] text-[#f5f0e8] border border-[#30363d] hover:border-[#c9a84c] text-xs font-bold flex items-center gap-2 cursor-pointer transition-all"
            >
              <span>Dossier Métabolisme &amp; Insuline</span>
              <ArrowRight className="w-4 h-4 text-[#c9a84c]" />
            </button>
          </div>
        </section>
        </FreemiumPaywallGate>

        {/* 6. Navigation secondaire vers les modules du corps */}
        <div className="p-6 rounded-3xl bg-[#161b22] border border-[#30363d] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-[#8b949e]">
            Module suivant dans Comprendre le Corps :
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate('4-architectures')}
              className="text-xs font-bold text-[#8b949e] hover:text-white transition-colors"
            >
              &larr; Les 4 Architectures
            </button>
            <span className="text-[#30363d]">|</span>
            <button
              onClick={() => onNavigate('9-axes')}
              className="text-xs font-bold text-[#8b949e] hover:text-white transition-colors"
            >
              Les 9 Axes historiques &rarr;
            </button>
          </div>
        </div>

      </main>
    </div>
  );
};

export default ChargeAllostatiqueContent;
