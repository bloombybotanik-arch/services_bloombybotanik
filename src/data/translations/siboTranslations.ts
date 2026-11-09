import { ProtocolTranslations } from './psoriasisTranslations';

export const siboTranslations: Record<'fr' | 'en' | 'de', ProtocolTranslations> = {
  fr: {
    breadcrumb: {
      home: "Accueil",
      protocols: "Protocoles Systémiques",
      current: "Protocole SIBO",
      share: "Partager",
      copied: "Lien copié !",
      downloadPdf: "Télécharger le PDF"
    },
    hero: {
      badge: "Reset Homéostasique — Terrain Digestif",
      title: "PROTOCOLE SIBO — RESET HOMÉOSTASIQUE",
      subtitle: "Guide pratique et chronobiologique pour accompagner le terrain de la pullulation bactérienne de l'intestin grêle, relancer le Complexe Moteur Migrant (CMM) et restaurer la barrière muqueuse.",
      tagWeeks: "12 Semaines (Phases 0 à 3)",
      tagAxis: "Axe Motilité - Émonctoires - Barrière",
      tagSafety: "Séquençage Actif A/B & Binders"
    },
    disclaimer: {
      title: "Avertissement Médical et Légal",
      text: "Ce protocole est un guide informatif et éducatif d'accompagnement du terrain digestif par les plantes et la chronobiologie nutritionnelle. Il ne constitue pas un diagnostic médical ni une ordonnance. La pullulation bactérienne de l'intestin grêle (SIBO/IMO) doit faire l'objet d'explorations médicales appropriées (test respiratoire au glucose ou au lactulose) auprès de votre gastro-entérologue ou médecin traitant. Ne modifiez jamais vos prescriptions médicales sans avis médical."
    },
    nav: {
      foreword: "Avant-propos",
      prereqs: "4 Prérequis",
      detection: "Lire les signes",
      phases: "Protocole par phases",
      rules: "Règles d'or",
      observations: "Ce que vous observez",
      limits: "Ce que Bloom peut faire",
      logbook: "Carnet de bord"
    },
    foreword: {
      title: "Avant-propos — Lire le SIBO Autrement",
      quote: "Le SIBO n'est pas une maladie intrinsèque de l'intestin. C'est un signal d'un verrouillage en amont : hypochlorhydrie, stase biliaire et paralysie du complexe moteur migrant.",
      p1: "Vouloir éradiquer aveuglément les bactéries de l'intestin grêle sans comprendre pourquoi elles s'y sont installées conduit inévitablement à la récidive dans 80% des cas dans les six mois.",
      p2: "Dans l'écosystème digestif sain, l'intestin grêle est presque stérile grâce à trois verrous protecteurs : l'acidité gastrique qui détruit les germes ingérés, la bile alcalinisante qui désinfecte le chyme, et le balayage régulier par le complexe moteur migrant (CMM) entre les repas.",
      p3: "Notre approche ne cherche pas à stériliser l'intestin, mais à rétablir ces barrières d'amont, à drainer les endotoxines sans surcharge hépatique, et à créer un terrain où les bactéries ne peuvent plus pulluler.",
      highlightTitle: "Le principe clé du terrain SIBO",
      highlightText: "Ne pas bombarder l'intestin grêle : relancer l'acide gastrique, drainer la vésicule biliaire, réactiver les ondes de nettoyage (CMM) et capter les métabolites bactériens avec des binders spécifiques."
    },
    prereqs: {
      badge: "Prérequis Non Négociables (Accès Libre)",
      title: "Les 4 Piliers Quotidiens de la Motilité",
      subtitle: "Sans ces 4 ajustements physiologiques simples, aucun extrait végétal ne pourra débloquer le péristaltisme du grêle.",
      items: [
        {
          title: "1. Le Sommeil & la Phase CMM Nocturne",
          desc: "Le complexe moteur migrant fonctionne à plein régime la nuit lors du jeûne digestif. Manger tard paralyse ce nettoyage automatique.",
          advice: "Dîner au moins 3 à 4 heures avant le coucher et respecter un jeûne nocturne strict de 12 heures."
        },
        {
          title: "2. La Respiration & le Massage Diaphragmatique",
          desc: "Le diaphragme est le piston naturel de la motilité viscérale. Une respiration haute et stressée comprime l'estomac et bloque les sécrétions biliaires.",
          advice: "5 minutes de respiration ventrale diaphragmatique lente avant chaque repas pour basculer en mode parasympathique."
        },
        {
          title: "3. Le Mouvement Post-Prandial",
          desc: "Rester assis après un repas favorise la stagnation du bol alimentaire et la fermentation gazeuse dans l'intestin grêle.",
          advice: "15 à 20 minutes de marche digestive tranquille après le déjeuner et le dîner sans effort intense."
        },
        {
          title: "4. L'Hydratation & la Lumière Circadienne",
          desc: "Boire de grands verres d'eau pendant les repas dilue l'acide gastrique et les enzymes digestives, créant un festin pour les bactéries.",
          advice: "Boire en dehors des repas (30 min avant ou 1h30 après) de l'eau tiède ou des infusions tièdes sans sucre."
        }
      ]
    },
    freemiumGate: {
      badge: "Contenu Réservé aux Membres",
      title: "Débloquez le Protocole SIBO Complet",
      desc: "Accédez instantanément aux fiches d'extraction de précision BloomLab®, aux posologies de berberine/origan/gingembre, au tableau des 4 phases et aux ratios d'adsorption.",
      inputName: "Votre prénom",
      inputEmail: "Votre adresse email",
      button: "Débloquer le protocole complet gratuitement",
      submitting: "Validation de votre accès...",
      success: "Accès débloqué avec succès ! Vous pouvez consulter les 4 phases.",
      privacy: "Vos données restent strictement confidentielles. Aucun spam. Conforme au RGPD.",
      benefits: [
        "Paramètres thermiques exacts d'extraction des phytocomposés amers et antimicrobiens",
        "Chronobiologie des 4 phases (Préparation, Éradication douce, Restauration, Stabilisation)",
        "Guide d'utilisation des binders minéraux pour éviter la crise d'Herxheimer (die-off)",
        "Carnet de suivi des ballonnements, gaz et transit téléchargeable"
      ]
    },
    phases: {
      title: "Protocole SIBO Détaillé en 4 Phases",
      subtitle: "Un protocole séquentiel rigoureux de 12 semaines pour traiter les causes fonctionnelles de la pullulation.",
      tabs: {
        p0: "Phase 0 — Émonctoires (S1-S2)",
        p1: "Phase 1 — Éradication & Motilité (S3-S6)",
        p2: "Phase 2 — Restauration Barrière (S7-S9)",
        p3: "Phase 3 — Stabilisation (S10-S12)"
      },
      tableHeaders: {
        time: "Moment",
        actives: "Actifs Botaniques & Minéraux",
        dosage: "Posologie",
        bloomlab: "Extraction BloomLab®",
        precautions: "Précautions Clés"
      }
    },
    detection: {
      badge: "Sémiologie du Terrain",
      title: "Détection — Lire les Signes du SIBO",
      subtitle: "Reconnaître les manifestations corporelles de la fermentation haute et du ralentissement moteur.",
      tabs: {
        tongue: "Sur la Langue",
        pulse: "Sur le Pouls",
        abdomen: "Sur l'Abdomen",
        skin: "Sur le Visage"
      },
      colSign: "Signe clinique observé",
      colMeaning: "Interprétation physiologique",
      colAction: "Recommandation Bloom"
    },
    rules: {
      badge: "Principes Clés",
      title: "Les 6 Règles d'Or du Reset SIBO",
      subtitle: "Les habitudes déterminantes pour empêcher la recolonisation de l'intestin grêle."
    },
    observations: {
      badge: "Évolution Clinique",
      title: "Ce Que Vous Pouvez Observer Semaine par Semaine",
      subtitle: "Comprendre les étapes normales du dégonflement abdominal et de la régulation du transit.",
      colTime: "Semaines",
      colExpected: "Réactions physiologiques attendues",
      colAlerts: "Signaux d'adaptation & Précautions"
    },
    limits: {
      badge: "Précision & Transparence",
      title: "Ce Que ce Protocole Ne Peut Pas Faire",
      subtitle: "L'herboristerie scientifique respecte des limites claires et collabore avec la médecine conventionnelle.",
      canTitle: "Ce que le protocole Bloom apporte :",
      cannotTitle: "Ce que le protocole ne remplace pas :",
      canItems: [
        "Restaurer la production physiologique d'acide chlorhydrique et de sucs biliaires.",
        "Relancer la fréquence et l'amplitude des contractions de nettoyage du CMM.",
        "Inhiber la prolifération bactérienne sans détruire la flore du côlon.",
        "Capturer les gaz et endotoxines pour soulager immédiatement la distension abdominale."
      ],
      cannotItems: [
        "Ne remplace pas un test respiratoire au lactulose/glucose prescrit par un gastro-entérologue.",
        "Ne résout pas une sténose mécanique, une adhérence post-chirurgicale ou une tumeur sans chirurgie.",
        "Ne dispense pas d'un traitement antibiotique ciblé si votre médecin le juge impératif.",
        "Ne permet pas de reprendre une alimentation ultra-transformée après les 12 semaines."
      ]
    },
    logbook: {
      badge: "Auto-Évaluation",
      title: "Carnet de Bord Hebdomadaire SIBO",
      subtitle: "Suivez chaque semaine l'extinction des symptômes sur 5 marqueurs fonctionnels précis.",
      downloadBtn: "Télécharger le Carnet de Bord (PDF)",
      markersTitle: "Les 5 Marqueurs à Évaluer Chaque Semaine :"
    },
    cta: {
      quote: "L'intestin n'est pas un tuyau inerte. C'est un écosystème intelligent qui se répare dès qu'on cesse de l'asphyxier.",
      author: "Équipe Scientifique Bloom by BotaniK",
      boxTitle: "Prêt à maîtriser l'extraction végétale de haute précision ?",
      boxDesc: "Explorez l'extracteur BloomLab® pour extraire les principes actifs amers et antibactériens au degré près.",
      shopBtn: "Découvrir la BloomLab®",
      assessmentBtn: "Faire mon Bilan Systémique ALMA"
    }
  },
  en: {
    breadcrumb: {
      home: "Home",
      protocols: "Systemic Protocols",
      current: "SIBO Protocol",
      share: "Share",
      copied: "Link copied!",
      downloadPdf: "Download PDF"
    },
    hero: {
      badge: "Homeostatic Reset — Digestive Terrain",
      title: "SIBO PROTOCOL — HOMEOSTATIC RESET",
      subtitle: "Practical and chronobiological guide to support the small intestinal bacterial overgrowth terrain, reactivate the Migrating Motor Complex (MMC), and restore the mucosal barrier.",
      tagWeeks: "12 Weeks (Phases 0 to 3)",
      tagAxis: "Motility - Emunctories - Barrier Axis",
      tagSafety: "Active A/B Sequencing & Binders"
    },
    disclaimer: {
      title: "Medical & Legal Disclaimer",
      text: "This protocol is an educational and informational guide for supporting digestive terrain through medicinal plants and nutritional chronobiology. It does not constitute a medical diagnosis or prescription. Small Intestinal Bacterial Overgrowth (SIBO/IMO) requires clinical validation (lactulose or glucose breath test) by your gastroenterologist or attending physician. Never modify or discontinue prescribed medical treatments without formal medical advice."
    },
    nav: {
      foreword: "Foreword",
      prereqs: "4 Prerequisites",
      detection: "Read the Signs",
      phases: "Phased Protocol",
      rules: "Golden Rules",
      observations: "What You Will Observe",
      limits: "What Bloom Can Do",
      logbook: "Logbook"
    },
    foreword: {
      title: "Foreword — Reading SIBO Differently",
      quote: "SIBO is not an inherent disease of the gut. It is an alarm signal of upstream breakdown: hypochlorhydria, biliary stasis, and a paralyzed migrating motor complex.",
      p1: "Attempting to blindly eradicate bacteria from the small intestine without addressing why they migrated upstream inevitably leads to relapse in over 80% of patients within six months.",
      p2: "In a healthy gastrointestinal tract, the small intestine is kept virtually sterile by three physiological gatekeepers: stomach acid killing swallowed bacteria, alkaline bile cleansing the chyme, and rhythmic sweeping waves of the Migrating Motor Complex (MMC) between meals.",
      p3: "Our approach does not seek to sterilize the intestine, but to re-establish these upstream barriers, clear circulating endotoxins without hepatic congestion, and build a terrain where bacterial overgrowth cannot thrive.",
      highlightTitle: "The Core Principle of the SIBO Terrain",
      highlightText: "Do not bombard the small intestine: stimulate stomach acid, drain stagnant bile, reactivate sweeping cleaning waves (MMC), and capture microbial metabolites with specialized binders."
    },
    prereqs: {
      badge: "Non-Negotiable Prerequisites (Free Access)",
      title: "The 4 Daily Motility Pillars",
      subtitle: "Without these four simple physiological lifestyle adjustments, no herbal extract can unlock small bowel peristalsis.",
      items: [
        {
          title: "1. Sleep & Nocturnal MMC Fasting Window",
          desc: "The Migrating Motor Complex operates at peak intensity at night during digestive fasting. Late-night snacking halts this automated housekeeping cycle.",
          advice: "Finish dinner at least 3 to 4 hours before bedtime and observe a strict 12-hour overnight digestive fast."
        },
        {
          title: "2. Diaphragmatic Breath & Vagal Tone",
          desc: "The respiratory diaphragm is the mechanical pump for abdominal motility. Shallow chest breathing constricts the stomach and blunts bile release.",
          advice: "Perform 5 minutes of slow diaphragmatic belly breathing before every meal to engage parasympathetic digestion."
        },
        {
          title: "3. Post-Meal Gentle Movement",
          desc: "Remaining sedentary and slouching immediately after eating causes food bolus stasis and rapid gas fermentation in the small intestine.",
          advice: "Take a relaxed 15 to 20 minute walk following lunch and dinner—no strenuous exertion."
        },
        {
          title: "4. Hydration Timing & Circadian Sunlight",
          desc: "Gulping large glasses of cold water during meals dilutes gastric acid and digestive enzymes, creating a feast for fermenting bacteria.",
          advice: "Drink between meals (30 min before or 90 min after), preferring warm water or unsweetened herbal infusions."
        }
      ]
    },
    freemiumGate: {
      badge: "Member-Only Clinical Content",
      title: "Unlock the Complete SIBO Protocol",
      desc: "Gain instant access to precision BloomLab® botanical extraction recipes, exact dosages for berberine, oregano and ginger, 4-phase schedules, and binder protocols.",
      inputName: "Your first name",
      inputEmail: "Your email address",
      button: "Unlock Full Protocol for Free",
      submitting: "Activating your access...",
      success: "Access unlocked successfully! You can now explore all 4 phases.",
      privacy: "Your data is strictly confidential. Zero spam. Fully GDPR compliant.",
      benefits: [
        "Exact thermal and solvent profiles for bitter and antimicrobial botanical actives",
        "Chronobiological schedule across 4 phases (Preparation, Gentle Eradication, Restoration, Stabilization)",
        "Mineral binder guidelines to avert Herxheimer die-off reactions",
        "Weekly printable symptom tracker for gas, distension, and bowel habits"
      ]
    },
    phases: {
      title: "Comprehensive 4-Phase SIBO Protocol",
      subtitle: "A rigorous 12-week sequential protocol designed to resolve the root functional drivers of small bowel overgrowth.",
      tabs: {
        p0: "Phase 0 — Emunctories (Weeks 1-2)",
        p1: "Phase 1 — Eradication & Motility (Weeks 3-6)",
        p2: "Phase 2 — Barrier Restoration (Weeks 7-9)",
        p3: "Phase 3 — Long-Term Stability (Weeks 10-12)"
      },
      tableHeaders: {
        time: "Timing",
        actives: "Botanical & Mineral Actives",
        dosage: "Dosage",
        bloomlab: "BloomLab® Extraction",
        precautions: "Key Precautions"
      }
    },
    detection: {
      badge: "Terrain Semiology",
      title: "Detection — Reading the Signs of SIBO",
      subtitle: "Learn to recognize early bodily indicators of high digestive fermentation and sluggish intestinal motility.",
      tabs: {
        tongue: "On the Tongue",
        pulse: "On the Pulse",
        abdomen: "On the Abdomen",
        skin: "On the Face"
      },
      colSign: "Observed Physical Sign",
      colMeaning: "Physiological Meaning",
      colAction: "Bloom Action Step"
    },
    rules: {
      badge: "Foundational Rules",
      title: "The 6 Golden Rules of SIBO Reset",
      subtitle: "Decisive daily habits required to prevent bacterial re-colonization of the small intestine."
    },
    observations: {
      badge: "Clinical Progression",
      title: "What You Will Observe Week by Week",
      subtitle: "Understand the natural timeline of abdominal deflation and transit normalization.",
      colTime: "Weeks",
      colExpected: "Expected Physiological Shifts",
      colAlerts: "Adaptation Signals & Precautions"
    },
    limits: {
      badge: "Clarity & Responsibility",
      title: "What This Protocol Cannot Do",
      subtitle: "Scientific herbalism upholds clear boundaries and works collaboratively alongside conventional medicine.",
      canTitle: "What the Bloom protocol provides:",
      cannotTitle: "What the protocol does not replace:",
      canItems: [
        "Restores physiological production of hydrochloric acid and digestive bile salts.",
        "Re-establishes the regular frequency and strength of MMC cleansing sweeps.",
        "Selectively suppresses small bowel bacterial overgrowth without wiping out colon flora.",
        "Binds circulating gases and endotoxins to rapidly relieve abdominal bloating."
      ],
      cannotItems: [
        "Does not replace a formal lactulose/glucose breath test diagnosed by a gastroenterologist.",
        "Does not resolve structural mechanical strictures, surgical adhesions, or tumours.",
        "Does not replace targeted medical antibiotics if prescribed by your physician.",
        "Does not permit returning to high-sugar ultra-processed foods after 12 weeks."
      ]
    },
    logbook: {
      badge: "Self-Evaluation",
      title: "Weekly SIBO Recovery Logbook",
      subtitle: "Track symptom reduction each week across 5 clear functional health markers.",
      downloadBtn: "Download PDF Logbook",
      markersTitle: "5 Key Markers to Score Each Week:"
    },
    cta: {
      quote: "The gut is not an inert plumbing pipe. It is an intelligent ecosystem that repairs itself the moment you stop suffocating it.",
      author: "Bloom by BotaniK Scientific Team",
      boxTitle: "Ready to master precision botanical extraction?",
      boxDesc: "Discover the BloomLab® extractor to extract bitter and antibacterial actives calibrated to the exact half-degree.",
      shopBtn: "Discover BloomLab®",
      assessmentBtn: "Take the ALMA Systemic Assessment"
    }
  },
  de: {
    breadcrumb: {
      home: "Startseite",
      protocols: "Systemische Protokolle",
      current: "SIBO-Protokoll",
      share: "Teilen",
      copied: "Link kopiert!",
      downloadPdf: "PDF herunterladen"
    },
    hero: {
      badge: "Homöostatischer Reset — Verdauungsterrain",
      title: "SIBO-PROTOKOLL — HOMÖOSTATISCHER RESET",
      subtitle: "Praktischer und chronobiologischer Leitfaden zur Begleitung des Terrains bei bakterieller Fehlbesiedlung des Dünndarms (SIBO), Reaktivierung des wandernden Motorkomplexes (MMC) und Reparatur der Schleimhautbarriere.",
      tagWeeks: "12 Wochen (Phasen 0 bis 3)",
      tagAxis: "Motilität - Ausleitung - Barriere Achse",
      tagSafety: "Aktive A/B-Sequenzierung & Binder"
    },
    disclaimer: {
      title: "Medizinischer und rechtlicher Hinweis",
      text: "Dieses Protokoll dient als informativer und pädagogischer Leitfaden zur Begleitung des Verdauungsterrains durch Heilpflanzen und Ernährungs-Chronobiologie. Es stellt keine ärztliche Diagnose oder Verschreibung dar. Eine bakterielle Fehlbesiedlung des Dünndarms (SIBO/IMO) erfordert eine fachärztliche Abklärung (Atemtest mit Laktulose oder Glukose) durch Ihren Gastroenterologen. Verändern oder beenden Sie ärztlich verordnete Therapien keinesfalls eigenmächtig."
    },
    nav: {
      foreword: "Vorwort",
      prereqs: "4 Grundvoraussetzungen",
      detection: "Körpersignale lesen",
      phases: "Phasen-Protokoll",
      rules: "Goldene Regeln",
      observations: "Was Sie beobachten",
      limits: "Was Bloom leisten kann",
      logbook: "Tagebuch"
    },
    foreword: {
      title: "Vorwort — SIBO neu verstehen",
      quote: "SIBO ist keine primäre Dünndarmerkrankung. Es ist das Alarmsignal vorgeschalteter Blockaden: Hypochlorhydrie, Gallestau und Stillstand des wandernden Motorkomplexes.",
      p1: "Der Versuch, Bakterien im Dünndarm blind abzutöten, ohne zu verstehen, warum sie sich dort angesiedelt haben, führt in über 80% der Fälle innerhalb von sechs Monaten zu Rückfällen.",
      p2: "Im gesunden Verdauungstrakt wird der Dünndarm durch drei physiologische Schutzschranken keimarm gehalten: Magensäure, die Keime abtötet; basische Galle, die den Speisebrei desinfiziert; und die peristaltischen Reinigungswellen des MMC zwischen den Mahlzeiten.",
      p3: "Unser Ansatz zielt nicht auf eine Sterilisation des Darms ab, sondern auf die Wiederherstellung dieser natürlichen Schutzbarrieren, die Ausleitung von Endotoxinen ohne Leberüberlastung und den Aufbau eines stabilen Milieus.",
      highlightTitle: "Das Kernprinzip des SIBO-Terrains",
      highlightText: "Nicht den Dünndarm bombardieren: Magensäure anregen, Gallenfluss aktivieren, die Reinigungswellen (MMC) in Gang setzen und Bakterientoxine mit Bindern abfangen."
    },
    prereqs: {
      badge: "Nicht verhandelbare Grundlagen (Freier Zugang)",
      title: "Die 4 täglichen Säulen der Dünndarmmotilität",
      subtitle: "Ohne diese vier physiologischen Anpassungen kann kein pflanzlicher Extrakt die Peristaltik des Dünndarms nachhaltig wiederherstellen.",
      items: [
        {
          title: "1. Schlaf & Nächtliches MMC-Fastenfenster",
          desc: "Der wandernde Motorkomplex arbeitet nachts während des Verdauungsfastens auf Hochtouren. Späte Mahlzeiten stoppen diese automatische Selbstreinigung sofort.",
          advice: "Das Abendessen mindestens 3 bis 4 Stunden vor dem Schlafen beenden und ein 12-stündiges Nachtfasten einhalten."
        },
        {
          title: "2. Zwerchfellatmung & Vagustonus",
          desc: "Das Zwerchfell massiert mechanisch die Bauchorgane. Flache Brustatmung unter Stress blockiert die Magenentleerung und Gallensekretion.",
          advice: "Vor jeder Hauptmahlzeit 5 Minuten tief und ruhig in den Bauch atmen, um das vegetative Nervensystem in den Verdauungsmodus zu versetzen."
        },
        {
          title: "3. Bewegung nach den Mahlzeiten",
          desc: "Langes Sitzen unmittelbar nach dem Essen führt zu Speisestau und fördert die explosive Gasbildung im Dünndarm.",
          advice: "Nach Mittag- und Abendessen 15 bis 20 Minuten entspannt spazieren gehen – ohne intensive Belastung."
        },
        {
          title: "4. Trink-Timing & Tageslicht",
          desc: "Große Mengen kalter Getränke während des Essens verdünnen die Magensäure und Verdauungsenzyme – ein Festmahl für fermentierende Bakterien.",
          advice: "Außerhalb der Mahlzeiten trinken (30 Min vorher oder 90 Min nachher), bevorzugt lauwarmes Wasser oder zuckerfreie Kräutertees."
        }
      ]
    },
    freemiumGate: {
      badge: "Exklusiver Mitgliederbereich",
      title: "Vollständiges SIBO-Protokoll freischalten",
      desc: "Erhalten Sie sofortigen Zugang zu den präzisen BloomLab® Extraktionsrezepten, Dosierungen von Berberin/Oregano/Ingwer, den 4 Protokollphasen und dem Binder-Fahrplan.",
      inputName: "Ihr Vorname",
      inputEmail: "Ihre E-Mail-Adresse",
      button: "Vollständiges Protokoll kostenlos freischalten",
      submitting: "Zugang wird freigeschaltet...",
      success: "Zugang erfolgreich freigeschaltet! Sie können nun alle 4 Phasen einsehen.",
      privacy: "Ihre Daten bleiben streng vertraulich. Kein Spam. DSGVO-konform.",
      benefits: [
        "Exakte thermische Extraktionsprofile für Bitterstoffe und antibakterielle Wirkstoffe",
        "Chronobiologischer 4-Phasen-Ablauf (Vorbereitung, Sanfte Beseitigung, Schleimhautaufbau, Stabilisierung)",
        "Spezifische Binder-Anleitung zur Verhinderung von Herxheimer-Entgiftungskrisen",
        "Wöchentliches Dokumentationsblatt für Blähungen, Schmerzen und Stuhlfrequenz"
      ]
    },
    phases: {
      title: "Detailliertes 4-Phasen-SIBO-Protokoll",
      subtitle: "Ein strukturiertes 12-Wochen-System zur Beseitigung der funktionellen Ursachen der Fehlbesiedlung.",
      tabs: {
        p0: "Phase 0 — Ausleitungsorgane (Woche 1-2)",
        p1: "Phase 1 — Bereinigung & Motilität (Woche 3-6)",
        p2: "Phase 2 — Schleimhaut-Reparatur (Woche 7-9)",
        p3: "Phase 3 — Langzeit-Stabilität (Woche 10-12)"
      },
      tableHeaders: {
        time: "Tageszeit",
        actives: "Pflanzliche & Mineralische Wirkstoffe",
        dosage: "Dosierung",
        bloomlab: "BloomLab® Extraktion",
        precautions: "Wichtige Hinweise"
      }
    },
    detection: {
      badge: "Funktionelle Zeichenlehre",
      title: "Diagnostik — Die Körpersignale von SIBO lesen",
      subtitle: "Erkennen Sie frühe Warnzeichen von Dünndarmgärung und verlangsamter Darmperistaltik.",
      tabs: {
        tongue: "Zungendiagnostik",
        pulse: "Pulsqualität",
        abdomen: "Bauchraum & Blähungen",
        skin: "Gesicht & Haut"
      },
      colSign: "Beobachtetes Symptom",
      colMeaning: "Physiologische Bedeutung",
      colAction: "Bloom Handlungsempfehlung"
    },
    rules: {
      badge: "Leitlinien",
      title: "Die 6 Goldenen Regeln des SIBO-Resets",
      subtitle: "Unerlässliche Gewohnheiten zur dauerhaften Verhinderung einer erneuten Keimüberwucherung."
    },
    observations: {
      badge: "Klinischer Verlauf",
      title: "Was Sie Woche für Woche erwarten können",
      subtitle: "Verstehen Sie den normalen Genesungsverlauf von der ersten Entlastung bis zur dauerhaften Beschwerdefreiheit.",
      colTime: "Wochen",
      colExpected: "Erwartete physiologische Veränderungen",
      colAlerts: "Wichtige Anpassungszeichen & Vorsicht"
    },
    limits: {
      badge: "Verantwortung & Ethik",
      title: "Was dieses Protokoll nicht leisten kann",
      subtitle: "Wissenschaftliche Pflanzenheilkunde arbeitet transparent und Hand in Hand mit der Schulmedizin.",
      canTitle: "Was das Bloom-Protokoll leistet:",
      cannotTitle: "Was das Protokoll nicht ersetzt:",
      canItems: [
        "Regt die körpereigene Produktion von Magensäure und Gallensäuren an.",
        "Reaktiviert die Frequenz und Stärke der reinigenden Kontraktionswellen des MMC.",
        "Hemmt selektiv pathogene Keime im Dünndarm ohne das Mikrobiom des Dickdarms zu zerstören.",
        "Bindet schädliche Gase und Endotoxine zur raschen Entlastung von Bauchschmerzen."
      ],
      cannotItems: [
        "Ersetzt keinen ärztlichen Laktulose- oder Glukose-Atemtest beim Gastroenterologen.",
        "Behebt keine chirurgischen Verwachsungen oder mechanischen Darmstenosen.",
        "Ersetzt keine gezielte ärztlich verschriebene Antibiotikatherapie, falls medizinisch indiziert.",
        "Ermöglicht nach den 12 Wochen keine Rückkehr zu industrieller Fertignahrung."
      ]
    },
    logbook: {
      badge: "Selbstbeobachtung",
      title: "Ihr wöchentliches SIBO-Tagebuch",
      subtitle: "Verfolgen Sie die Rückbildung Ihrer Symptome objektiv anhand von 5 Schlüsselparametern.",
      downloadBtn: "Tagebuch als PDF herunterladen",
      markersTitle: "Die 5 Schlüsselparameter für jede Woche:"
    },
    cta: {
      quote: "Der Darm ist kein passives Rohr. Er ist ein intelligentes Ökosystem, das sich erholt, sobald man aufhört, ihn zu ersticken.",
      author: "Wissenschaftliches Team von Bloom by BotaniK",
      boxTitle: "Bereit für präzise botanische Extraktion zu Hause?",
      boxDesc: "Entdecken Sie den BloomLab® Extraktor für gradgenaue Extraktion von Bitterstoffen und antibakteriellen Pflanzenwirkstoffen.",
      shopBtn: "BloomLab® entdecken",
      assessmentBtn: "ALMA Systemische Analyse starten"
    }
  }
};
