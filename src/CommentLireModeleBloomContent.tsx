import React from 'react';
import { 
  ArrowRight, 
  BookOpen, 
  Layers, 
  HelpCircle, 
  CheckCircle2, 
  Info, 
  ShieldAlert, 
  Sparkles, 
  Compass, 
  Clock, 
  FlaskConical, 
  Microscope, 
  FileCheck, 
  Award 
} from 'lucide-react';
import { View } from './types';
import { Language } from './translations';
import AcademyNavigation from './components/AcademyNavigation';

interface CommentLireModeleBloomProps {
  onNavigate: (view: View, param?: string) => void;
  lang?: Language;
}

export default function CommentLireModeleBloomContent({ onNavigate, lang = 'fr' }: CommentLireModeleBloomProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "Bloom Académie",
    "url": "https://bloombybotanik.com/academie/comprendre-le-modele-bloom",
    "description": lang === 'en'
      ? "Understanding the Bloom model: architectures, terrains, axes, and plant monographs. Reading guide and methodological landmarks."
      : lang === 'de'
      ? "Das Bloom-Modell verstehen: Architekturen, Terrains, Achsen und Pflanzenmonographien. Leitfaden und methodische Orientierungspunkte."
      : "Comprendre le modèle Bloom : architectures, terrains, axes et fiches plantes. Guide de lecture et repères méthodologiques.",
    "parentOrganization": {
      "@type": "Organization",
      "name": "Bloom by BotaniK",
      "url": "https://bloombybotanik.com"
    }
  };

  const t = {
    fr: {
      badge: "BLOOM ACADÉMIE · GUIDE D'ORIENTATION",
      title: "Comprendre le modèle Bloom : architectures, terrains, axes et fiches plantes",
      subtitle: "Bloom étudie les liens entre les grandes fonctions du corps, les habitudes de vie et les plantes. Pour vous orienter dans l'Académie, nous utilisons plusieurs niveaux de lecture : architectures, terrains, axes et fiches botaniques. Cette organisation est une méthode pédagogique propre à Bloom. Elle n'est ni un diagnostic ni une classification médicale universelle.",
      ctaBloomLab: "Découvrir l'extracteur BloomLab®",
      ctaArchitectures: "Accéder aux 4 Architectures",
      sec1Badge: "Repères Fondamentaux",
      sec1Title: "Quatre mots, quatre rôles",
      sec1Intro: "Une architecture donne une vue d'ensemble du modèle Bloom. Un terrain désigne un domaine que nous étudions, comme l'intestin ou l'énergie cellulaire. Un axe décrit un processus qui relie plusieurs terrains, par exemple les rythmes biologiques ou le métabolisme glucidique. Une fiche plante présente une matière botanique précise, la partie utilisée, sa préparation, les connaissances disponibles et ses précautions. Ces niveaux sont complémentaires ; ils ne sont pas interchangeables.",
      card1Title: "L'Architecture",
      card1Desc: "La vue d'ensemble : Les quatre grands piliers intégrateurs du vivant (SRA, Axe HPA, Fascia, SEC) qui orchestrent la communication globale et maintiennent l'équilibre général.",
      card2Title: "Le Terrain",
      card2Desc: "Le domaine fonctionnel : Une zone d'apprentissage spécifique (ex : digestion, détoxication hépatique, régulation nerveuse) observée dans ses interactions avec le reste du corps.",
      card3Title: "L'Axe",
      card3Desc: "Le processus transversal : Un mécanisme dynamique qui relie plusieurs terrains entre eux, comme les rythmes circadiens ou la régulation du glucose et de l'insuline.",
      card4Title: "La Fiche Plante",
      card4Desc: "La matière botanique : La description précise d'une plante, de sa partie utilisée (racine, sommité, feuille), de son mode d'extraction, de ses données scientifiques et de ses contre-indications.",
      themeNote: "Thèmes du site vs Terrains du Reset : Les rubriques et thèmes de navigation aident les lecteurs à trouver des contenus et des recettes selon leurs centres d'intérêt, mais ne correspondent pas automatiquement aux terrains d'observation biologique formalisés du Reset.",
      sec2Badge: "Méthodologie & Discernement",
      sec2Title: "Lire une fiche plante sans aller trop vite",
      sec2Intro: "Commencez par vérifier le nom botanique, la partie utilisée et la forme de préparation. Repérez ensuite pourquoi Bloom relie cette plante à un thème : composition décrite, usage traditionnel, étude expérimentale ou étude menée chez l'humain. Vérifiez enfin les limites de ces données et les précautions. Une étude sur un extrait standardisé ne prouve pas qu'une infusion ou une préparation réalisée avec BloomLab possède la même composition ou produit le même effet.",
      exampleTitle: "Exemple de lecture éclairée",
      exampleDesc: "Si une fiche associe une plante au thème « Énergie », comprenez : « cette plante est étudiée dans ce chapitre pour une raison documentée ». Ne comprenez pas : « cette plante traite ma fatigue » ou « elle convient à ma situation ».",
      rule1: "La partie de la plante compte : une racine n'a pas les mêmes principes actifs ni la même action qu'une sommité fleurie ou une feuille.",
      rule2: "La préparation étudiée compte : un extrait hydro-alcoolique concentré diffère fondamentalement d'une tisane classique ou d'une huile.",
      rule3: "La dose n'est pas transférable : la quantité et le produit utilisés dans un essai clinique ne s'appliquent pas automatiquement à une recette maison.",
      rule4: "Pas de prescription déguisée : un rattachement éditorial à un chapitre ne constitue jamais un avis médical ni une prescription.",
      sec3Badge: "Rigueur Scientifique",
      sec3Title: "Ce que signifient les niveaux de preuve",
      sec3Intro: "Un usage traditionnel renseigne sur l'histoire d'une pratique ; il ne démontre pas à lui seul une efficacité clinique. Une étude en laboratoire ou chez l'animal explore un mécanisme, sans établir directement un bénéfice pour une personne. Une étude chez l'humain porte sur une population, un produit, une dose et un résultat définis. Lorsque Bloom dispose d'essais sur une préparation ou un appareil précis, ils doivent être présentés avec leur méthode et leurs limites.",
      proof1Title: "Usage traditionnel",
      proof1Desc: "Témoignage historique et empirique d'une culture ou d'une pharmacopée ancienne. Renseigne sur l'usage, pas sur une preuve d'efficacité clinique standardisée.",
      proof2Title: "Composition documentée",
      proof2Desc: "Identification chromatographique des métabolites secondaires (polyphénols, flavonoïdes, terpènes, saponines) caractérisés dans la plante.",
      proof3Title: "Étude préclinique",
      proof3Desc: "Essais in vitro sur lignées cellulaires ou in vivo sur modèles animaux. Permet d'explorer un mécanisme biologique, sans preuve directe chez l'humain.",
      proof4Title: "Étude humaine",
      proof4Desc: "Essai contrôlé sur cohorte humaine avec extrait standardisé, protocole précis, posologie définie et critères d'évaluation mesurables.",
      proof5Title: "Préparation Bloom testée",
      proof5Desc: "Extraction spécifique au protocole BloomLab avec cinétique mesurée, solvants définis et rendement du Totum vérifié en laboratoire.",
      proof6Title: "À confirmer",
      proof6Desc: "Hypothèse biologique prometteuse mais nécessitant des études complémentaires indépendantes avant toute conclusion définitive.",
      sec4Badge: "Approfondissement Transversal",
      sec4Title: "Pourquoi l'insuline mérite un dossier à part",
      sec4Intro: "L'insuline participe à la gestion du glucose et de l'énergie. Une sensibilité à l'insuline diminuée est un sujet de recherche important, y compris pendant la transition vers la ménopause. Nous lui consacrons un dossier d'approfondissement relié à plusieurs terrains, plutôt que d'en faire une étiquette qui résumerait une personne.",
      sec4CardTitle: "Dossier d'approfondissement transversal",
      sec4CardSubtitle: "Métabolisme glucidique, insuline et homéostasie énergétique",
      sec4CardBadge: "Nouveau dossier",
      sec5Badge: "Parcours Pédagogique",
      sec5Title: "Comment parcourir l'Académie",
      sec5Intro: "Commencez par ce guide, puis choisissez un cours selon la question que vous souhaitez comprendre. Les 7 Terrains présentent une grille d'apprentissage du corps. Les 9 Axes décrivent une version historique des processus étudiés par Bloom. Le dossier sur l'insuline complète cette réflexion.",
      sec6Title: "Ce que ce modèle ne permet pas",
      sec6Desc: "Cette grille ne permet pas d'identifier à distance une maladie, d'interpréter un bilan biologique personnel, de choisir une dose ou de remplacer un suivi médical. Si une question concerne vos symptômes, un traitement, une grossesse, une maladie ou un examen biologique, demandez conseil à un professionnel de santé qualifié.",
      footerQuote: "L'objectif de Bloom Académie est de vous aider à comprendre les questions que nous étudions, la méthode utilisée et ce qui reste à démontrer. Apprendre à lire une fiche, c'est aussi apprendre à reconnaître ses limites.",
      btnExploreCourses: "Explorer les cours publiés",
      btnDiscoverHerbarium: "Découvrir l'Herbier"
    },
    en: {
      badge: "BLOOM ACADEMY · ORIENTATION GUIDE",
      title: "Understanding the Bloom Model: Architectures, Terrains, Axes, and Plant Monographs",
      subtitle: "Bloom examines the connections between major bodily functions, lifestyle habits, and botanicals. To guide you through the Academy, we use distinct layers of understanding: architectures, terrains, axes, and plant monographs. This structure is Bloom's educational framework—not a clinical diagnosis nor a universal medical classification.",
      ctaBloomLab: "Discover the BloomLab® Extractor",
      ctaArchitectures: "Access the 4 Architectures",
      sec1Badge: "Fundamental Landmarks",
      sec1Title: "Four concepts, four roles",
      sec1Intro: "An architecture offers a big-picture view of the Bloom framework. A terrain designates a functional domain we study, such as the gut or cellular energy. An axis describes a transversal process linking multiple terrains, such as circadian rhythms or glucose metabolism. A plant monograph covers a specific botanical substance, its part used, preparation methods, available evidence, and safety precautions.",
      card1Title: "The Architecture",
      card1Desc: "The big picture: The four master integrative pillars of living physiology (RAS, HPA Axis, Fascia, ECS) coordinating whole-body communication and global balance.",
      card2Title: "The Terrain",
      card2Desc: "The functional domain: A specific learning focus (e.g., digestion, hepatic clearance, nervous regulation) examined in its interconnectedness with the body.",
      card3Title: "The Axis",
      card3Desc: "The transversal process: A dynamic mechanism linking multiple terrains together, such as biological clocks or glucose-insulin signaling.",
      card4Title: "The Plant Monograph",
      card4Desc: "Botanical matter: Detailed description of a plant, its used part (root, flowering top, leaf), extraction kinetics, scientific data, and contraindications.",
      themeNote: "Website themes vs. Reset Terrains: Navigation categories help readers discover contents and formulations by interest, but do not automatically equate to the formalized biological observation terrains of the Reset.",
      sec2Badge: "Methodology & Discernment",
      sec2Title: "Reading a plant monograph with scientific discernment",
      sec2Intro: "Always begin by checking the botanical binomial name, the plant part used, and the extraction format. Then identify why Bloom links this botanical to a theme: phytochemical profile, historical use, preclinical trial, or human study. Notice the limits of the data. A trial using a standardized pharmaceutical extract does not mean a home brew or BloomLab recipe yields the identical composition or outcome.",
      exampleTitle: "An example of informed reading",
      exampleDesc: "If a monograph links a herb to 'Energy', understand: 'this botanical is examined in this section for a documented rationale'. Do not interpret as: 'this plant cures my chronic fatigue' or 'it fits my personal condition'.",
      rule1: "The plant part matters: a root contains completely different phytochemicals and bioactivity than leaves or flowering tops.",
      rule2: "The preparation method matters: a concentrated hydroalcoholic extract differs fundamentally from a water infusion or an infused oil.",
      rule3: "Doses cannot be extrapolated: quantities and extracts evaluated in a clinical trial cannot be directly applied to a homemade preparation.",
      rule4: "No disguised prescriptions: linking a botanical to an educational topic never constitutes medical advice or therapeutic prescription.",
      sec3Badge: "Scientific Rigor",
      sec3Title: "What levels of evidence actually mean",
      sec3Intro: "Traditional usage highlights historical and cultural lineage; it does not by itself validate clinical efficacy. Preclinical bench or animal trials illuminate mechanistic hypotheses, without guaranteeing direct human benefit. Human clinical trials involve a defined cohort, standardized extract, and measurable endpoints. Bloom clarifies these distinctions rather than conflating them into a single promise.",
      proof1Title: "Traditional Usage",
      proof1Desc: "Empirical historical documentation from ancestral herbal pharmacopeias. Indicates cultural custom, not standardized clinical efficacy proof.",
      proof2Title: "Documented Phytochemistry",
      proof2Desc: "Chromatographic identification of secondary metabolites (polyphenols, flavonoids, terpenes, saponins) characterized in the plant matrix.",
      proof3Title: "Preclinical Research",
      proof3Desc: "In vitro cellular models or in vivo animal assays. Unveils biological pathways without demonstrating direct human clinical outcomes.",
      proof4Title: "Human Clinical Study",
      proof4Desc: "Controlled clinical trial on human cohorts with standardized extracts, strict protocols, defined dosing, and validated endpoints.",
      proof5Title: "Tested Bloom Preparation",
      proof5Desc: "Extraction run with the BloomLab protocol, measured kinetics, calibrated solvent ratios, and verified Totum yields.",
      proof6Title: "Pending Confirmation",
      proof6Desc: "Promising biological hypothesis requiring further independent peer-reviewed trials before firm conclusions can be drawn.",
      sec4Badge: "Transversal In-Depth Dossier",
      sec4Title: "Why insulin warrants a dedicated dossier",
      sec4Intro: "Insulin governs glucose partitioning and cellular bioenergetics. Diminished insulin sensitivity is a major research focus across health stages, including perimenopause. We dedicate a comprehensive transversal dossier to it across multiple terrains, without reducing anyone to a clinical label.",
      sec4CardTitle: "Transversal In-Depth Dossier",
      sec4CardSubtitle: "Glucose metabolism, insulin dynamics, and energy homeostasis",
      sec4CardBadge: "New Dossier",
      sec5Badge: "Educational Pathway",
      sec5Title: "How to navigate the Academy",
      sec5Intro: "Start with this guide, then pick a course aligned with the physiological question you wish to explore. The 7 Terrains outline our learning framework. The 9 Historical Axes trace our original systems map. The Insulin Dossier deepens cellular bioenergetics.",
      sec6Title: "What this framework cannot do",
      sec6Desc: "This framework cannot diagnose illness remotely, evaluate personal lab results, calculate medical dosages, or substitute for licensed medical supervision. Botanicals possess active constituents and potential interactions with prescription drugs. Always consult a qualified physician for symptoms or medical concerns.",
      footerQuote: "The purpose of Bloom Academy is to help you comprehend the biological questions we explore, our extraction methodology, and what remains to be proven. Learning to read a monograph is learning to respect its boundaries.",
      btnExploreCourses: "Explore published courses",
      btnDiscoverHerbarium: "Discover the Herbarium"
    },
    de: {
      badge: "BLOOM AKADEMIE · ORIENTIERUNGSLEITFADEN",
      title: "Das Bloom-Modell verstehen: Architekturen, Terrains, Achsen und Pflanzenmonographien",
      subtitle: "Bloom erforscht die Zusammenhänge zwischen den großen Körperfunktionen, Lebensgewohnheiten und Heilpflanzen. Um Sie durch die Akademie zu führen, nutzen wir mehrere Verständnisebenen: Architekturen, Terrains, Achsen und Pflanzenprofile. Diese Struktur ist ein pädagogisches Modell von Bloom – weder eine Diagnose noch eine medizinische Klassifikation.",
      ctaBloomLab: "Den BloomLab®-Extraktor entdecken",
      ctaArchitectures: "Zu den 4 Architekturen",
      sec1Badge: "Grundlegende Orientierungspunkte",
      sec1Title: "Vier Begriffe, vier Aufgaben",
      sec1Intro: "Eine Architektur bietet den Gesamtüberblick über das Bloom-Modell. Ein Terrain bezeichnet ein funktionelles Lernfeld wie den Darm oder die Zellenergie. Eine Achse beschreibt einen übergreifenden Prozess, der mehrere Terrains verbindet (z. B. Biorhythmen oder Glukosestoffwechsel). Ein Pflanzenprofil stellt eine präzise botanische Substanz, den verwendeten Teil, Zubereitungsweisen, Evidenz und Vorsichtsmaßnahmen dar.",
      card1Title: "Die Architektur",
      card1Desc: "Der Gesamtüberblick: Die vier integrativen Säulen des lebendigen Organismus (RAS, HPA-Achse, Faszie, ECS), die die globale Kommunikation und Homöostase koordinieren.",
      card2Title: "Das Terrain",
      card2Desc: "Das Funktionsfeld: Ein spezifischer Lernbereich (z. B. Verdauung, hepatische Ausleitung, Nervenregulation) in Wechselwirkung mit dem Gesamtsystem.",
      card3Title: "Die Achse",
      card3Desc: "Der Querschnittsprozess: Ein dynamischer Mechanismus, der mehrere Terrains verbindet, wie der zirkadiane Rhythmus oder die Insulinregulation.",
      card4Title: "Das Pflanzenprofil",
      card4Desc: "Die botanische Substanz: Genaue Beschreibung der Pflanze, des verwendeten Pflanzenteils (Wurzel, Blüte, Blatt), der Extraktionsweise und der Kontraindikationen.",
      themeNote: "Webseiten-Themen vs. Reset-Terrains: Navigationsthemen helfen Lesern beim Auffinden von Rezepten nach Interesse, entsprechen aber nicht automatisch den formalisierten biologischen Terrains des Resets.",
      sec2Badge: "Methodik & Urteilsvermögen",
      sec2Title: "Ein Pflanzenprofil mit Sorgfalt lesen",
      sec2Intro: "Prüfen Sie stets den botanischen Artnamen, den verwendeten Teil und die Zubereitungsform. Erkennen Sie, warum Bloom diese Pflanze mit einem Thema verknüpft: beschriebene Phytochemie, traditionelle Verwendung, präklinische oder klinische Humanstudien. Beachten Sie die Grenzen der Daten.",
      exampleTitle: "Beispiel für aufgeklärtes Lesen",
      exampleDesc: "Wenn ein Profil eine Pflanze dem Thema « Energie » zuordnet, verstehen Sie: « Diese Pflanze wird in diesem Kapitel aus dokumentierten Gründen erforscht ». Verstehen Sie nicht: « Diese Pflanze heilt meine Erschöpfung ».",
      rule1: "Der Pflanzenteil zählt: Eine Wurzel besitzt völlig andere Inhaltsstoffe und Wirkungen als Blüten oder Blätter.",
      rule2: "Die Zubereitungsform zählt: Ein konzentrierter hydroalkoholischer Extrakt unterscheidet sich grundlegend von einem einfachen Tee oder Öl.",
      rule3: "Dosen sind nicht übertragbar: In klinischen Studien untersuchte Mengen lassen sich nicht direkt auf Hausrezepte anwenden.",
      rule4: "Keine getarnte Verschreibung: Die redaktionelle Zuordnung zu einem Thema stellt niemals eine medizinische Diagnose oder Verordnung dar.",
      sec3Badge: "Wissenschaftliche Sorgfalt",
      sec3Title: "Was Evidenzstufen wirklich bedeuten",
      sec3Intro: "Traditionelle Anwendung belegt historische Überlieferung, liefert aber für sich allein keinen klinischen Wirksamkeitsnachweis. Labor- oder Tierstudien erforschen Mechanismen, ohne direkten Nutzen beim Menschen zu beweisen. Humanstudien untersuchen definierte Kollektive mit standardisierten Extrakten. Bloom unterscheidet diese Stufen präzise.",
      proof1Title: "Traditionelle Anwendung",
      proof1Desc: "Historischer und empirischer Erfahrungsbericht alter Arzneibücher. Belegt Brauchtum, keinen standardisierten klinischen Nachweis.",
      proof2Title: "Dokumentierte Phytochemie",
      proof2Desc: "Chromatographische Identifizierung sekundärer Pflanzenstoffe (Polyphenole, Flavonoide, Terpene, Saponine) in der Pflanzenmatrix.",
      proof3Title: "Präklinische Forschung",
      proof3Desc: "In-vitro-Zelllinien oder In-vivo-Tiermodelle zur Erforschung biologischer Pfade ohne direkten Wirksamkeitsnachweis am Menschen.",
      proof4Title: "Klinische Humanstudie",
      proof4Desc: "Kontrollierte Studie an Probanden mit standardisiertem Extrakt, klarem Protokoll, fester Dosierung und messbaren Endpunkten.",
      proof5Title: "Geprüfte Bloom-Zubereitung",
      proof5Desc: "Spezifische BloomLab-Extraktion mit gemessener Kinetik, definierten Lösungsmitteln und laborgeprüfter Totum-Ausbeute.",
      proof6Title: "Noch zu bestätigen",
      proof6Desc: "Vielversprechende biologische Hypothese, die vor endgültigen Schlussfolgerungen weiterer unabhängiger Studien bedarf.",
      sec4Badge: "Vertiefendes Querschnitts-Dossier",
      sec4Title: "Warum Insulin ein eigenes Dossier verdient",
      sec4Intro: "Insulin steuert die Glukoseverteilung und die Zellbioenergetik. Eine verminderte Insulinsensitivität ist ein zentraler Forschungsschwerpunkt. Wir widmen diesem Thema ein eigenes Dossier, ohne Menschen auf ein Label zu reduzieren.",
      sec4CardTitle: "Vertiefendes Querschnitts-Dossier",
      sec4CardSubtitle: "Glukosestoffwechsel, Insulin und Energie-Homöostase",
      sec4CardBadge: "Neues Dossier",
      sec5Badge: "Pädagogischer Lehrpfad",
      sec5Title: "Wie Sie die Akademie erkunden",
      sec5Intro: "Beginnen Sie mit diesem Leitfaden und wählen Sie dann ein Modul nach Ihren Fragen. Die 7 Terrains bieten ein integratives Modell. Die 9 historischen Achsen beschreiben unsere ursprüngliche Matrix. Das Insulin-Dossier vertieft den Energiestoffwechsel.",
      sec6Title: "Was dieses Modell nicht leisten kann",
      sec6Desc: "Dieses Modell ersetzt keine ärztliche Diagnose, bewertet keine persönlichen Laborwerte und bestimmt keine individuellen Therapien. Pflanzenextrakte besitzen wirksame Inhaltsstoffe und mögliche Wechselwirkungen mit Medikamenten. Konsultieren Sie bei Beschwerden stets einen qualifizierten Arzt.",
      footerQuote: "Das Ziel der Bloom Akademie ist es, biologische Fragen, Extraktionsmethoden und das noch zu Beweisende verständlich zu machen. Ein Profil zu verstehen heißt auch, seine Grenzen zu respektieren.",
      btnExploreCourses: "Veröffentlichte Kurse erkunden",
      btnDiscoverHerbarium: "Das Herbarium entdecken"
    }
  };

  const cur = t[lang] || t.fr;

  return (
    <div 
      className="min-h-screen bg-[#0d1117] text-[#c9d1d9] font-sans selection:bg-[#c9a84c]/30 selection:text-white"
      data-bloom-academie="true"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Secondary Academy Navigation */}
      <AcademyNavigation
        currentView="comment-lire-modele-bloom"
        onNavigate={onNavigate}
        currentPageTitle={lang === 'fr' ? 'Comment lire le modèle Bloom' : lang === 'de' ? 'Wie man das Bloom-Modell liest' : 'How to read the Bloom model'}
        sectionName={lang === 'fr' ? 'Comprendre le Corps' : lang === 'de' ? 'Den Körper verstehen' : 'Understanding the Body'}
        lang={lang}
      />

      {/* 2. HERO HEADER */}
      <header className="border-b border-[#30363d] bg-radial from-[#1c2128] via-[#0d1117] to-[#0d1117] py-14 sm:py-20 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#c9a84c]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c9a84c]/10 border border-[#c9a84c]/30 text-[#c9a84c] text-[11px] font-mono uppercase tracking-widest mb-6">
            <Compass className="w-3.5 h-3.5" />
            <span>{cur.badge}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-5xl lg:text-6xl font-black text-[#f5f0e8] tracking-tight leading-[1.1] mb-6">
            {cur.title}
          </h1>

          <p className="text-base sm:text-lg text-[#b8b8b8] leading-relaxed max-w-3xl mx-auto font-normal mb-8">
            {cur.subtitle}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="/bloomlab/"
              onClick={(e) => {
                if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                  e.preventDefault();
                  onNavigate('machine');
                }
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#D97706] hover:bg-[#b45309] text-white text-xs font-bold transition-all shadow-md hover:shadow-lg cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>{cur.ctaBloomLab}</span>
            </a>
            <button
              onClick={() => onNavigate('4-architectures')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold transition-all cursor-pointer border border-white/10"
            >
              <span>{cur.ctaArchitectures}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* 3. MAIN CONTENT CONTAINER */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-14 space-y-16">

        {/* SECTION 1: QUATRE MOTS, QUATRE RÔLES */}
        <section aria-labelledby="section-quatre-mots" className="scroll-mt-24">
          <div className="mb-6">
            <div className="text-[10px] font-black uppercase tracking-[0.25em] text-[#c9a84c] mb-2 font-mono">
              {cur.sec1Badge}
            </div>
            <h2 id="section-quatre-mots" className="text-2xl sm:text-3xl font-black text-[#f5f0e8] tracking-tight">
              {cur.sec1Title}
            </h2>
          </div>

          <p className="text-sm sm:text-base text-[#c9d1d9] leading-relaxed mb-8">
            {cur.sec1Intro}
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            {/* Carte 1 : Architecture */}
            <div className="p-5 rounded-2xl bg-[#161b22] border border-[#30363d] hover:border-[#c9a84c]/50 transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg bg-[#c9a84c]/15 text-[#c9a84c] flex items-center justify-center font-bold text-xs">
                  01
                </div>
                <h3 className="text-lg font-bold text-[#f5f0e8]">
                  {cur.card1Title}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-[#8b949e] leading-relaxed">
                {cur.card1Desc}
              </p>
            </div>

            {/* Carte 2 : Terrain */}
            <div className="p-5 rounded-2xl bg-[#161b22] border border-[#30363d] hover:border-[#86efac]/50 transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg bg-[#86efac]/15 text-[#86efac] flex items-center justify-center font-bold text-xs">
                  02
                </div>
                <h3 className="text-lg font-bold text-[#f5f0e8]">
                  {cur.card2Title}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-[#8b949e] leading-relaxed">
                {cur.card2Desc}
              </p>
            </div>

            {/* Carte 3 : Axe */}
            <div className="p-5 rounded-2xl bg-[#161b22] border border-[#30363d] hover:border-[#93c5fd]/50 transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg bg-[#93c5fd]/15 text-[#93c5fd] flex items-center justify-center font-bold text-xs">
                  03
                </div>
                <h3 className="text-lg font-bold text-[#f5f0e8]">
                  {cur.card3Title}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-[#8b949e] leading-relaxed">
                {cur.card3Desc}
              </p>
            </div>

            {/* Carte 4 : Fiche Plante */}
            <div className="p-5 rounded-2xl bg-[#161b22] border border-[#30363d] hover:border-[#D97706]/50 transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg bg-[#D97706]/15 text-[#D97706] flex items-center justify-center font-bold text-xs">
                  04
                </div>
                <h3 className="text-lg font-bold text-[#f5f0e8]">
                  {cur.card4Title}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-[#8b949e] leading-relaxed">
                {cur.card4Desc}
              </p>
            </div>
          </div>

          {/* Note de repère */}
          <div className="mt-4 p-4 rounded-xl bg-[#161b22] border border-[#30363d] flex items-start gap-3">
            <Compass className="w-5 h-5 text-[#c9a84c] shrink-0 mt-0.5" />
            <p className="text-xs text-[#c9d1d9] leading-relaxed">
              {cur.themeNote}
            </p>
          </div>
        </section>

        {/* SECTION 2: LIRE UNE FICHE PLANTE SANS ALLER TROP VITE */}
        <section aria-labelledby="section-lire-fiche" className="scroll-mt-24 pt-10 border-t border-[#30363d]">
          <div className="mb-6">
            <div className="text-[10px] font-black uppercase tracking-[0.25em] text-[#c9a84c] mb-2 font-mono">
              {cur.sec2Badge}
            </div>
            <h2 id="section-lire-fiche" className="text-2xl sm:text-3xl font-black text-[#f5f0e8] tracking-tight">
              {cur.sec2Title}
            </h2>
          </div>

          <p className="text-sm sm:text-base text-[#c9d1d9] leading-relaxed mb-6">
            {cur.sec2Intro}
          </p>

          {/* Exemple concret */}
          <div className="p-5 rounded-2xl bg-[#161b22] border-l-4 border-[#c9a84c] border-y border-r border-[#30363d] mb-8">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-[#c9a84c] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#c9a84c] mb-1">
                  {cur.exampleTitle}
                </h4>
                <p className="text-xs sm:text-sm text-[#f5f0e8] leading-relaxed">
                  {cur.exampleDesc}
                </p>
              </div>
            </div>
          </div>

          {/* Les 4 points d'exigence */}
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#161b22] border border-[#30363d]">
              <CheckCircle2 className="w-4 h-4 text-[#c9a84c] shrink-0 mt-0.5" />
              <span className="text-xs text-[#c9d1d9]">{cur.rule1}</span>
            </div>
            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#161b22] border border-[#30363d]">
              <CheckCircle2 className="w-4 h-4 text-[#c9a84c] shrink-0 mt-0.5" />
              <span className="text-xs text-[#c9d1d9]">{cur.rule2}</span>
            </div>
            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#161b22] border border-[#30363d]">
              <CheckCircle2 className="w-4 h-4 text-[#c9a84c] shrink-0 mt-0.5" />
              <span className="text-xs text-[#c9d1d9]">{cur.rule3}</span>
            </div>
            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#161b22] border border-[#30363d]">
              <CheckCircle2 className="w-4 h-4 text-[#c9a84c] shrink-0 mt-0.5" />
              <span className="text-xs text-[#c9d1d9]">{cur.rule4}</span>
            </div>
          </div>
        </section>

        {/* SECTION 3: CE QUE SIGNIFIENT LES NIVEAUX DE PREUVE */}
        <section aria-labelledby="section-niveaux-preuve" className="scroll-mt-24 pt-10 border-t border-[#30363d]">
          <div className="mb-6">
            <div className="text-[10px] font-black uppercase tracking-[0.25em] text-[#c9a84c] mb-2 font-mono">
              {cur.sec3Badge}
            </div>
            <h2 id="section-niveaux-preuve" className="text-2xl sm:text-3xl font-black text-[#f5f0e8] tracking-tight">
              {cur.sec3Title}
            </h2>
          </div>

          <p className="text-sm sm:text-base text-[#c9d1d9] leading-relaxed mb-8">
            {cur.sec3Intro}
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-[#161b22] border border-[#30363d] space-y-2">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#D97706]" />
                <span className="text-xs font-bold text-[#f5f0e8]">{cur.proof1Title}</span>
              </div>
              <p className="text-xs text-[#8b949e] leading-relaxed">{cur.proof1Desc}</p>
            </div>

            <div className="p-4 rounded-xl bg-[#161b22] border border-[#30363d] space-y-2">
              <div className="flex items-center gap-2">
                <FlaskConical className="w-4 h-4 text-[#86efac]" />
                <span className="text-xs font-bold text-[#f5f0e8]">{cur.proof2Title}</span>
              </div>
              <p className="text-xs text-[#8b949e] leading-relaxed">{cur.proof2Desc}</p>
            </div>

            <div className="p-4 rounded-xl bg-[#161b22] border border-[#30363d] space-y-2">
              <div className="flex items-center gap-2">
                <Microscope className="w-4 h-4 text-[#38bdf8]" />
                <span className="text-xs font-bold text-[#f5f0e8]">{cur.proof3Title}</span>
              </div>
              <p className="text-xs text-[#8b949e] leading-relaxed">{cur.proof3Desc}</p>
            </div>

            <div className="p-4 rounded-xl bg-[#161b22] border border-[#30363d] space-y-2">
              <div className="flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-[#c9a84c]" />
                <span className="text-xs font-bold text-[#f5f0e8]">{cur.proof4Title}</span>
              </div>
              <p className="text-xs text-[#8b949e] leading-relaxed">{cur.proof4Desc}</p>
            </div>

            <div className="p-4 rounded-xl bg-[#161b22] border border-[#c9a84c]/50 bg-[#c9a84c]/5 space-y-2">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-[#c9a84c]" />
                <span className="text-xs font-bold text-[#c9a84c]">{cur.proof5Title}</span>
              </div>
              <p className="text-xs text-[#8b949e] leading-relaxed">{cur.proof5Desc}</p>
            </div>

            <div className="p-4 rounded-xl bg-[#161b22] border border-[#30363d] space-y-2">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-[#8b949e]" />
                <span className="text-xs font-bold text-[#8b949e]">{cur.proof6Title}</span>
              </div>
              <p className="text-xs text-[#8b949e] leading-relaxed">{cur.proof6Desc}</p>
            </div>
          </div>
        </section>

        {/* SECTION 4: POURQUOI L'INSULINE MÉRITE UN DOSSIER À PART */}
        <section aria-labelledby="section-insuline" className="scroll-mt-24 pt-10 border-t border-[#30363d]">
          <div className="mb-6">
            <div className="text-[10px] font-black uppercase tracking-[0.25em] text-[#c9a84c] mb-2 font-mono">
              {cur.sec4Badge}
            </div>
            <h2 id="section-insuline" className="text-2xl sm:text-3xl font-black text-[#f5f0e8] tracking-tight">
              {cur.sec4Title}
            </h2>
          </div>

          <p className="text-sm sm:text-base text-[#c9d1d9] leading-relaxed mb-6">
            {cur.sec4Intro}
          </p>

          <div 
            onClick={() => onNavigate('metabolisme-insuline')}
            className="p-5 rounded-2xl bg-[#161b22] border-2 border-[#F59E0B] hover:border-[#fbbf24] flex items-center justify-between gap-4 cursor-pointer transition-all hover:-translate-y-0.5 shadow-md group"
          >
            <div className="flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-[#F59E0B] shrink-0 group-hover:scale-110 transition-transform" />
              <div>
                <div className="text-xs font-bold text-[#f5f0e8] group-hover:text-[#F59E0B] transition-colors">
                  {cur.sec4CardTitle}
                </div>
                <div className="text-xs text-[#8b949e]">
                  {cur.sec4CardSubtitle}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="px-2.5 py-1 rounded-full bg-[#F59E0B] text-[#0d1117] text-[10px] font-mono uppercase tracking-wider font-black">
                {cur.sec4CardBadge}
              </span>
              <ArrowRight className="w-4 h-4 text-[#F59E0B]" />
            </div>
          </div>
        </section>

        {/* SECTION 5: COMMENT PARCOURIR L'ACADÉMIE */}
        <section aria-labelledby="section-parcourir" className="scroll-mt-24 pt-10 border-t border-[#30363d]">
          <div className="mb-6">
            <div className="text-[10px] font-black uppercase tracking-[0.25em] text-[#c9a84c] mb-2 font-mono">
              {cur.sec5Badge}
            </div>
            <h2 id="section-parcourir" className="text-2xl sm:text-3xl font-black text-[#f5f0e8] tracking-tight">
              {cur.sec5Title}
            </h2>
          </div>

          <p className="text-sm sm:text-base text-[#c9d1d9] leading-relaxed mb-6">
            {cur.sec5Intro}
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            <button
              onClick={() => onNavigate('4-architectures')}
              className="p-5 rounded-2xl bg-[#161b22] border border-[#30363d] hover:border-[#c9a84c] text-left transition-all group cursor-pointer"
            >
              <div className="text-[10px] font-mono text-[#c9a84c] uppercase tracking-wider mb-1">
                Pilier 01 · Fondement
              </div>
              <h3 className="text-base font-bold text-[#f5f0e8] group-hover:text-[#c9a84c] transition-colors mb-2">
                {lang === 'fr' ? 'Les 4 Architectures →' : lang === 'de' ? 'Die 4 Architekturen →' : 'The 4 Architectures →'}
              </h3>
              <p className="text-xs text-[#8b949e]">
                {lang === 'fr' ? "Explorez le SRA, l'Axe HPA, le Fascia et le SEC." : lang === 'de' ? 'Erforschen Sie RAS, HPA, Faszie und ECS.' : 'Explore RAS, HPA Axis, Fascia, and ECS.'}
              </p>
            </button>

            <button
              onClick={() => onNavigate('terrain')}
              className="p-5 rounded-2xl bg-[#161b22] border border-[#30363d] hover:border-[#86efac] text-left transition-all group cursor-pointer"
            >
              <div className="text-[10px] font-mono text-[#86efac] uppercase tracking-wider mb-1">
                Pilier 02 · Grille Thématique
              </div>
              <h3 className="text-base font-bold text-[#f5f0e8] group-hover:text-[#86efac] transition-colors mb-2">
                {lang === 'fr' ? 'Les 7 Terrains →' : lang === 'de' ? 'Die 7 Terrains →' : 'The 7 Terrains →'}
              </h3>
              <p className="text-xs text-[#8b949e]">
                {lang === 'fr' ? 'Interactions fonctionnelles : digestion, énergie, élimination.' : lang === 'de' ? 'Funktionelle Interaktionen: Verdauung, Energie, Ausleitung.' : 'Functional interactions: digestion, energy, elimination.'}
              </p>
            </button>

            <button
              onClick={() => onNavigate('9-axes')}
              className="p-5 rounded-2xl bg-[#161b22] border border-[#30363d] hover:border-[#c9a84c] text-left transition-all group cursor-pointer"
            >
              <div className="text-[10px] font-mono text-[#c9a84c] uppercase tracking-wider mb-1">
                Pilier 03 · Version Historique
              </div>
              <h3 className="text-base font-bold text-[#f5f0e8] group-hover:text-[#c9a84c] transition-colors mb-2">
                {lang === 'fr' ? 'Les 9 Axes historiques →' : lang === 'de' ? 'Die 9 Historischen Achsen →' : 'The 9 Historical Axes →'}
              </h3>
              <p className="text-xs text-[#8b949e]">
                {lang === 'fr' ? "La matrice opératoire d'origine et ses 9 processus." : lang === 'de' ? 'Die ursprüngliche Matrix mit 9 Prozessen.' : 'The original operational matrix and its 9 processes.'}
              </p>
            </button>

            <button
              onClick={() => onNavigate('charge-allostatique')}
              className="p-5 rounded-2xl bg-[#161b22] border border-[#30363d] hover:border-[#86efac] text-left transition-all group cursor-pointer"
            >
              <div className="text-[10px] font-mono text-[#86efac] uppercase tracking-wider mb-1">
                Pilier 04 · Neuro-Endocrinien
              </div>
              <h3 className="text-base font-bold text-[#f5f0e8] group-hover:text-[#86efac] transition-colors mb-2">
                {lang === 'fr' ? 'La Charge Allostatique →' : lang === 'de' ? 'Die Allostatische Last →' : 'The Allostatic Load →'}
              </h3>
              <p className="text-xs text-[#8b949e]">
                {lang === 'fr' ? "Le coût biologique du stress chronique et le délestage." : lang === 'de' ? 'Die biologischen Kosten chronischen Stresses.' : 'Biological wear and tear of chronic stress and relief.'}
              </p>
            </button>

            <button
              onClick={() => onNavigate('phytotherapie-reset')}
              className="p-5 rounded-2xl bg-[#161b22] border border-[#30363d] hover:border-[#D97706] text-left transition-all group cursor-pointer"
            >
              <div className="text-[10px] font-mono text-[#D97706] uppercase tracking-wider mb-1">
                Pilier 05 · Démarche Pivot
              </div>
              <h3 className="text-base font-bold text-[#f5f0e8] group-hover:text-[#D97706] transition-colors mb-2">
                {lang === 'fr' ? 'Le Reset Homéostasique →' : lang === 'de' ? 'Der Homöostatische Reset →' : 'The Homeostatic Reset →'}
              </h3>
              <p className="text-xs text-[#8b949e]">
                {lang === 'fr' ? 'La phytothérapie intégrale en action et ses protocoles.' : lang === 'de' ? 'Ganzheitliche Phytotherapie in Aktion.' : 'Full-spectrum phytotherapy in action and protocols.'}
              </p>
            </button>

            <button
              onClick={() => onNavigate('metabolisme-insuline')}
              className="p-5 rounded-2xl bg-gradient-to-br from-[#161b22] to-[#251c0d] border-2 border-[#F59E0B] hover:border-[#fbbf24] text-left transition-all group cursor-pointer"
            >
              <div className="text-[10px] font-mono text-[#F59E0B] uppercase tracking-wider mb-1 font-bold">
                Pilier 06 · {lang === 'fr' ? 'Nouveau Dossier' : lang === 'de' ? 'Neues Dossier' : 'New Dossier'}
              </div>
              <h3 className="text-base font-bold text-[#F59E0B] group-hover:text-[#fbbf24] transition-colors mb-2">
                {lang === 'fr' ? 'Métabolisme & Insuline →' : lang === 'de' ? 'Stoffwechsel & Insulin →' : 'Metabolism & Insulin →'}
              </h3>
              <p className="text-xs text-[#FDE68A]/80">
                {lang === 'fr' ? "L'insuline comme chef d'orchestre anabolique et mitochondrial." : lang === 'de' ? 'Insulin als Dirigent des Energiestoffwechsels.' : 'Insulin as anabolic conductor and mitochondrial flexibility.'}
              </p>
            </button>
          </div>
        </section>

        {/* SECTION 6: CE QUE CE MODÈLE NE PERMET PAS */}
        <section aria-labelledby="section-limites" className="scroll-mt-24 p-6 sm:p-8 rounded-3xl bg-[#161b22] border border-[#8b3a3a]/40 relative overflow-hidden">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-2xl bg-[#8b3a3a]/20 text-[#f87171] flex items-center justify-center shrink-0 mt-1">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div className="space-y-3">
              <h2 id="section-limites" className="text-xl sm:text-2xl font-black text-[#f5f0e8] tracking-tight">
                {cur.sec6Title}
              </h2>
              <p className="text-xs sm:text-sm text-[#c9d1d9] leading-relaxed">
                {cur.sec6Desc}
              </p>
            </div>
          </div>
        </section>

        {/* CLOSING & CALL TO ACTION */}
        <div className="text-center pt-8 border-t border-[#30363d] space-y-6">
          <p className="text-sm sm:text-base text-[#f5f0e8] font-medium max-w-2xl mx-auto leading-relaxed">
            {cur.footerQuote}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => onNavigate('4-architectures')}
              className="px-6 py-3.5 rounded-2xl bg-[#c9a84c] hover:bg-[#d8b85c] text-[#0d1117] text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-lg hover:shadow-xl"
            >
              <span>{cur.btnExploreCourses}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('herbier')}
              className="px-6 py-3.5 rounded-2xl bg-[#161b22] hover:bg-[#21262d] text-[#f5f0e8] text-xs font-bold border border-[#30363d] hover:border-[#8b949e] transition-all flex items-center gap-2 cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-[#c9a84c]" />
              <span>{cur.btnDiscoverHerbarium}</span>
            </button>
          </div>
        </div>

      </main>

      {/* FOOTER ACADÉMIE */}
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
            ? 'Bloom Académie est une ressource éducative. Elle ne constitue ni un diagnostic, ni un dispositif médical.'
            : lang === 'de'
            ? 'Bloom Academy ist eine Bildungsressource. Sie stellt weder eine Diagnose noch ein Medizinprodukt dar.'
            : 'Bloom Academy is an educational resource. It constitutes neither a clinical diagnosis nor a medical device.'}
        </p>
      </footer>
    </div>
  );
}
