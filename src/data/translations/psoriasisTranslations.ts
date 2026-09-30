export interface ProtocolTranslations {
  breadcrumb: {
    home: string;
    protocols: string;
    current: string;
    share: string;
    copied: string;
    downloadPdf: string;
  };
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    tagWeeks: string;
    tagAxis: string;
    tagSafety: string;
  };
  disclaimer: {
    title: string;
    text: string;
  };
  nav: {
    foreword: string;
    prereqs: string;
    detection: string;
    phases: string;
    rules: string;
    observations: string;
    limits: string;
    logbook: string;
  };
  foreword: {
    title: string;
    quote: string;
    p1: string;
    p2: string;
    p3: string;
    highlightTitle: string;
    highlightText: string;
  };
  prereqs: {
    badge: string;
    title: string;
    subtitle: string;
    items: Array<{
      title: string;
      desc: string;
      advice: string;
    }>;
  };
  freemiumGate: {
    badge: string;
    title: string;
    desc: string;
    inputName: string;
    inputEmail: string;
    button: string;
    submitting: string;
    success: string;
    privacy: string;
    benefits: string[];
  };
  phases: {
    title: string;
    subtitle: string;
    tabs: {
      p0: string;
      p1: string;
      p2: string;
      p3: string;
    };
    tableHeaders: {
      time: string;
      actives: string;
      dosage: string;
      bloomlab: string;
      precautions: string;
    };
  };
  detection: {
    badge: string;
    title: string;
    subtitle: string;
    tabs: {
      tongue: string;
      pulse: string;
      abdomen: string;
      skin: string;
    };
    colSign: string;
    colMeaning: string;
    colAction: string;
  };
  rules: {
    badge: string;
    title: string;
    subtitle: string;
  };
  observations: {
    badge: string;
    title: string;
    subtitle: string;
    colTime: string;
    colExpected: string;
    colAlerts: string;
  };
  limits: {
    badge: string;
    title: string;
    subtitle: string;
    canTitle: string;
    cannotTitle: string;
    canItems: string[];
    cannotItems: string[];
  };
  logbook: {
    badge: string;
    title: string;
    subtitle: string;
    downloadBtn: string;
    markersTitle: string;
  };
  cta: {
    quote: string;
    author: string;
    boxTitle: string;
    boxDesc: string;
    shopBtn: string;
    assessmentBtn: string;
  };
}

export const psoriasisTranslations: Record<'fr' | 'en' | 'de', ProtocolTranslations> = {
  fr: {
    breadcrumb: {
      home: "Accueil",
      protocols: "Phytothérapie Reset",
      current: "Protocole Psoriasis",
      share: "Partager",
      copied: "Lien copié !",
      downloadPdf: "Télécharger le PDF"
    },
    hero: {
      badge: "Reset Homéostasique — Terrain Thérapeutique",
      title: "Protocole Psoriasis",
      subtitle: "Accompagner le terrain psoriasique (profil de vulnérabilité génétique, épigénétique et allostatique), déverrouiller les émonctoires profonds et apaiser le spectre de charges allostatiques accumulées par la phytothérapie intégrale de haute précision.",
      tagWeeks: "14 Semaines (Phases 0 à 3)",
      tagAxis: "Axe Intestin - Foie - Peau",
      tagSafety: "Sécurité & Binders Inclus"
    },
    disclaimer: {
      title: "Avertissement Médical et Légal",
      text: "Ce protocole est un document d'information et d'éducation sur l'accompagnement du terrain biologique par les plantes médicinales et l'hygiène vitale. Il ne constitue en aucun cas un acte médical, un diagnostic, ni une prescription thérapeutique. Le psoriasis est une dermatose inflammatoire chronique nécessitant un suivi dermatologique régulier. N'interrompez jamais un traitement médical prescrit sans l'accord formel de votre médecin."
    },
    nav: {
      foreword: "Avant-propos",
      prereqs: "4 Prérequis",
      detection: "Détection du terrain",
      phases: "Protocole par phases",
      rules: "Règles d'or",
      observations: "Observations",
      limits: "Ce que Bloom peut faire",
      logbook: "Carnet de bord"
    },
    foreword: {
      title: "Avant-propos — Lire le Psoriasis Autrement",
      quote: "Le psoriasis n'est pas une maladie de peau. C'est un signal cutané d'une surcharge métabolique et d'un intestin poreux.",
      p1: "La dermatologie conventionnelle cible souvent le symptôme épidermique visible : plaques érythémato-squameuses, prolifération kératinocytaire accélérée. Mais l'épiderme n'est que le miroir externe.",
      p2: "Dans l'approche systémique Bloom by BotaniK, la peau est le troisième émonctoire de secours. Quand le foie est saturé et que la barrière intestinale laisse transloquer des endotoxines (LPS), le système immunitaire s'embrase.",
      p3: "Notre protocole restaure l'intégrité de la muqueuse digestive, relance le drainage biliaire et hépatique, et module la cascade cytokinique sans bloquer artificiellement les défenses vitales de l'organisme.",
      highlightTitle: "La clé biologique du terrain",
      highlightText: "Ne pas étouffer la peau : décharger le foie, réparer l'intestin, capter les toxines circulantes avec des adsorbants (binders) et reconstituer le Totum micronutritionnel."
    },
    prereqs: {
      badge: "Fondations Non Négociables (Accès Libre)",
      title: "Les 4 Prérequis Quotidiens du Reset",
      subtitle: "Aucun actif végétal ne peut compenser un mode de vie qui maintient l'organisme en alerte allostatique permanente.",
      items: [
        {
          title: "1. Sommeil & Rythme Circadien",
          desc: "Endormissement avant 23h. La régénération cellulaire cutanée et la détoxication glymphatique cérébrale et hépatique s'opèrent entre 22h et 3h du matin.",
          advice: "Chambre à 18°C, obscurité totale, extinction des écrans bleus 90 minutes avant le coucher."
        },
        {
          title: "2. Respiration & Tonus Vagal",
          desc: "La cohérence cardiaque (5 secondes d'inspiration, 5 secondes d'expiration pendant 5 minutes) 3 fois par jour apaise l'axe hypothalamo-hypophyso-surrénalien.",
          advice: "Pratiquer le matin au réveil, avant le déjeuner et avant le coucher."
        },
        {
          title: "3. Mouvement & Circulation Lymphatique",
          desc: "La lymphe ne possède pas de pompe cardiaque : seul le mouvement musculaire et la marche drainent les toxines vers les ganglions d'élimination.",
          advice: "30 minutes de marche rapide quotidienne et étirements doux matinaux."
        },
        {
          title: "4. Lumière Naturelle & Électrolytes",
          desc: "Exposition matinale à la lumière du jour dans les 30 minutes suivant le réveil pour caler l'horloge biologique et hydratation enrichie en sel non raffiné.",
          advice: "Boire 1,5L à 2L d'eau peu minéralisée, tempérée, par petites gorgées tout au long du jour."
        }
      ]
    },
    freemiumGate: {
      badge: "Espace Protocoles Cliniques",
      title: "Débloquez l'Intégralité du Protocole Psoriasis",
      desc: "Accédez immédiatement aux posologies précises, aux cycles d'extraction BloomLab®, aux ratios d'adsorption et au calendrier complet de 14 semaines.",
      inputName: "Votre prénom",
      inputEmail: "Votre adresse email",
      button: "Débloquer l'accès complet gratuitement",
      submitting: "Validation de votre accès...",
      success: "Accès activé avec succès ! Bienvenue dans le protocole.",
      privacy: "Vos données restent strictement confidentielles. Aucun spam. Respect strict du RGPD.",
      benefits: [
        "Fiches d'extraction complètes BloomLab® (temps, solvants, températures au 0,5°C)",
        "Chronobiologie des prises : Matin, Midi, Soir et Coucher",
        "Protocole d'adsorption et gestion des réactions d'élimination (Herxheimer)",
        "Carnet de bord imprimable et suivi des 5 marqueurs biologiques"
      ]
    },
    phases: {
      title: "Protocole Clinique par Phases Chronologiques",
      subtitle: "Un déploiement progressif en 14 semaines pour accompagner la désensibilisation et la reconstruction du terrain.",
      tabs: {
        p0: "Phase 0 — Déverrouillage (S1-S2)",
        p1: "Phase 1 — Drainage Hépato-Biliaire (S3-S6)",
        p2: "Phase 2 — Réparation Muqueuse (S7-S10)",
        p3: "Phase 3 — Stabilisation (S11-S14)"
      },
      tableHeaders: {
        time: "Moment",
        actives: "Actifs Botaniques & Synergies",
        dosage: "Posologie",
        bloomlab: "Extraction BloomLab®",
        precautions: "Précautions Clés"
      }
    },
    detection: {
      badge: "Sémiologie Fonctionnelle",
      title: "Détection du Terrain : Lire les Signes d'Alerte",
      subtitle: "Apprenez à observer les réponses de votre physiologie avant, pendant et après chaque phase.",
      tabs: {
        tongue: "Sur la Langue",
        pulse: "Sur le Pouls",
        abdomen: "Sur l'Abdomen",
        skin: "Sur la Peau"
      },
      colSign: "Manifestation observée",
      colMeaning: "Interprétation biologique",
      colAction: "Ajustement du protocole"
    },
    rules: {
      badge: "Règles d'Or",
      title: "Les 6 Principes Inviolables de Réussite",
      subtitle: "Ce qui différencie un reset durable d'une rechute inflammatoire immédiate."
    },
    observations: {
      badge: "Chronologie du Rétablissement",
      title: "Ce que Vous Allez Observer Semaine par Semaine",
      subtitle: "Comprendre les étapes d'extinction des plaques pour ne pas paniquer face aux éliminations salvatrices.",
      colTime: "Période",
      colExpected: "Évolutions attendues",
      colAlerts: "Points d'attention & Vigilance"
    },
    limits: {
      badge: "Cadre & Éthique",
      title: "Ce que Bloom Peut Faire — Ce qu'Il Ne Peut Pas Faire",
      subtitle: "La clarté absolue au service de votre sécurité et de votre autonomie.",
      canTitle: "Ce que le protocole Bloom accomplit :",
      cannotTitle: "Ce que Bloom ne remplace pas :",
      canItems: [
        "Réduire drastiquement la charge allostatique pesant sur les émonctoires.",
        "Restaurer l'étanchéité des jonctions serrées de la barrière intestinale.",
        "Fournir un totum d'antioxydants purs sans solvants chimiques toxiques.",
        "Soutenir la fonction biliaire et l'évacuation des métabolites acides."
      ],
      cannotItems: [
        "Ne remplace pas un diagnostic médical ou un dermatologue traitant.",
        "Ne promet pas de guérison magique sans respect strict de l'hygiène de vie.",
        "Ne dispense pas d'un bilan biologique préalable prescrit par votre médecin.",
        "Ne doit jamais inciter à interrompre un traitement immunosuppresseur sans accord médical."
      ]
    },
    logbook: {
      badge: "Suivi Personnel",
      title: "Votre Carnet de Bord Hebdomadaire",
      subtitle: "Mesurez objectivement votre progression sur 5 marqueurs fonctionnels clés.",
      downloadBtn: "Télécharger le Carnet de Bord (PDF)",
      markersTitle: "Les 5 Marqueurs à Évaluer Chaque Dimanche :"
    },
    cta: {
      quote: "Votre corps n'est pas cassé. Il est verrouillé par une surcharge qu'il n'a plus les moyens d'évacuer seul.",
      author: "L'Équipe Scientifique Bloom by BotaniK",
      boxTitle: "Prêt à maîtriser l'extraction végétale de haute précision ?",
      boxDesc: "Découvrez l'extracteur BloomLab® pour extraire le totum végétal chez vous au degré près.",
      shopBtn: "Découvrir la BloomLab®",
      assessmentBtn: "Faire mon Bilan Systémique ALMA"
    }
  },
  en: {
    breadcrumb: {
      home: "Home",
      protocols: "Systemic Reset",
      current: "Psoriasis Protocol",
      share: "Share",
      copied: "Link copied!",
      downloadPdf: "Download PDF"
    },
    hero: {
      badge: "Homeostatic Reset — Therapeutic Terrain",
      title: "Psoriasis Protocol",
      subtitle: "Supporting the psoriatic terrain (genetic, epigenetic, and allostatic vulnerability profile), unlocking deep emunctories, and soothing accumulated allostatic loads through high-precision integral phytotherapy.",
      tagWeeks: "14 Weeks (Phases 0 to 3)",
      tagAxis: "Gut - Liver - Skin Axis",
      tagSafety: "Safety & Binders Included"
    },
    disclaimer: {
      title: "Medical & Legal Disclaimer",
      text: "This protocol is an informational and educational document on supporting biological terrain through medicinal plants and vital lifestyle hygiene. It under no circumstances constitutes a medical act, diagnosis, or therapeutic prescription. Psoriasis is a chronic inflammatory skin condition requiring regular dermatological supervision. Never discontinue any prescribed medical treatment without explicit agreement from your physician."
    },
    nav: {
      foreword: "Foreword",
      prereqs: "4 Prerequisites",
      detection: "Terrain Detection",
      phases: "Phased Protocol",
      rules: "Golden Rules",
      observations: "Observations",
      limits: "What Bloom Can Do",
      logbook: "Logbook"
    },
    foreword: {
      title: "Foreword — Reading Psoriasis Differently",
      quote: "Psoriasis is not a disease of the skin. It is a cutaneous distress signal of metabolic overflow and a permeable gut barrier.",
      p1: "Conventional dermatology often focuses solely on visible epidermal symptoms: erythematosquamous plaques, accelerated keratinocyte turnover. Yet the epidermis is merely the external reflection.",
      p2: "In Bloom by BotaniK's systemic model, the skin is an emergency tertiary emunctory. When the liver is congested and gut barrier integrity fails—allowing endotoxins (LPS) into systemic circulation—the immune cascade flares.",
      p3: "Our protocol restores digestive mucosal integrity, reactivates biliary and hepatic clearance, and modulates inflammatory cytokines without shutting down vital biological defenses.",
      highlightTitle: "The biological terrain key",
      highlightText: "Do not suffocate the skin: unburden the liver, repair the gut barrier, bind circulating toxins with mineral adsorbents, and restore full micronutritional totum."
    },
    prereqs: {
      badge: "Non-Negotiable Foundations (Free Access)",
      title: "The 4 Daily Reset Prerequisites",
      subtitle: "No botanical extract can offset a lifestyle that keeps the nervous system trapped in constant sympathetic overdrive.",
      items: [
        {
          title: "1. Sleep & Circadian Rhythm",
          desc: "Asleep before 11 PM. Epidermal cellular repair and glymphatic detoxification of the brain and liver occur predominantly between 10 PM and 3 AM.",
          advice: "Keep room at 18°C (64°F), total pitch darkness, shut down blue-light screens 90 minutes before sleep."
        },
        {
          title: "2. Breathwork & Vagal Tone",
          desc: "Heart coherence breathing (5s inhale, 5s exhale for 5 minutes) 3 times daily calms the hypothalamic-pituitary-adrenal stress axis.",
          advice: "Practice upon waking, before lunch, and right before heading to bed."
        },
        {
          title: "3. Movement & Lymphatic Flow",
          desc: "The lymphatic system lacks a muscular heart pump: only rhythmic muscle contractions and brisk walking propel cellular debris toward elimination nodes.",
          advice: "30 minutes of daily brisk walking and gentle morning stretches."
        },
        {
          title: "4. Natural Morning Light & Electrolytes",
          desc: "Morning sunlight exposure within 30 minutes of waking anchors the master circadian clock; hydration paired with trace unrefined sea salts.",
          advice: "Drink 1.5L to 2L of pure low-mineral water, room temperature, sipped slowly across the day."
        }
      ]
    },
    freemiumGate: {
      badge: "Clinical Protocols Portal",
      title: "Unlock the Complete Psoriasis Protocol",
      desc: "Gain immediate access to exact dosages, precision BloomLab® extraction cycles, adsorption ratios, and the 14-week schedule.",
      inputName: "Your first name",
      inputEmail: "Your email address",
      button: "Unlock Full Access for Free",
      submitting: "Activating your access...",
      success: "Access unlocked successfully! Welcome to the protocol.",
      privacy: "Your information remains strictly confidential. Zero spam. Full GDPR compliance.",
      benefits: [
        "Complete BloomLab® extraction parameter sheets (temperatures accurate to 0.5°C, exact durations)",
        "Daily chronobiology schedule: Morning, Midday, Evening, and Bedtime",
        "Adsorption binder protocol to prevent Herxheimer detox reactions",
        "Printable weekly logbook and tracking of the 5 key biological markers"
      ]
    },
    phases: {
      title: "Chronological Phased Clinical Protocol",
      subtitle: "A progressive 14-week deployment engineered to desensitize and rebuild your terrain.",
      tabs: {
        p0: "Phase 0 — Unlocking (Weeks 1-2)",
        p1: "Phase 1 — Hepato-Biliary Drainage (Weeks 3-6)",
        p2: "Phase 2 — Mucosal Restoration (Weeks 7-10)",
        p3: "Phase 3 — Long-Term Stabilization (Weeks 11-14)"
      },
      tableHeaders: {
        time: "Timing",
        actives: "Botanical Actives & Synergies",
        dosage: "Dosage",
        bloomlab: "BloomLab® Extraction",
        precautions: "Key Precautions"
      }
    },
    detection: {
      badge: "Functional Semiology",
      title: "Terrain Detection: Reading the Warning Signs",
      subtitle: "Learn to read your body's physiological indicators before, during, and after each phase.",
      tabs: {
        tongue: "On the Tongue",
        pulse: "On the Pulse",
        abdomen: "On the Abdomen",
        skin: "On the Skin"
      },
      colSign: "Observed Sign",
      colMeaning: "Biological Meaning",
      colAction: "Protocol Adjustment"
    },
    rules: {
      badge: "Golden Rules",
      title: "The 6 Uncompromising Rules for Success",
      subtitle: "What distinguishes lasting homeostatic reset from an immediate inflammatory relapse."
    },
    observations: {
      badge: "Recovery Timeline",
      title: "What You Will Observe Week by Week",
      subtitle: "Understand each stage of plaque clearing so you don't mistake beneficial detox waves for setbacks.",
      colTime: "Timeline",
      colExpected: "Expected Changes",
      colAlerts: "Watchouts & Vigilance"
    },
    limits: {
      badge: "Framework & Integrity",
      title: "What Bloom Can Do — What It Cannot Do",
      subtitle: "Absolute clarity in service of your safety and genuine health autonomy.",
      canTitle: "What the Bloom protocol achieves:",
      cannotTitle: "What Bloom does not replace:",
      canItems: [
        "Significantly decreases the accumulated toxic load burdening primary emunctories.",
        "Restores tight junction integrity across the intestinal epithelial barrier.",
        "Supplies pure whole-plant antioxidant Totum without chemical solvent residues.",
        "Promotes smooth biliary flow and acidic metabolic waste excretion."
      ],
      cannotItems: [
        "Does not replace a formal medical diagnosis or your dermatologist's oversight.",
        "Does not promise miraculous instant cures without respecting foundational lifestyle hygiene.",
        "Does not replace clinical lab work or physician consultations.",
        "Must never prompt unassisted discontinuation of prescribed immunosuppressive drugs."
      ]
    },
    logbook: {
      badge: "Personal Tracking",
      title: "Your Weekly Recovery Logbook",
      subtitle: "Objectively track your progress across 5 key functional markers.",
      downloadBtn: "Download PDF Logbook",
      markersTitle: "5 Key Markers to Score Every Sunday:"
    },
    cta: {
      quote: "Your body is not broken. It is locked under a systemic burden it can no longer clear on its own.",
      author: "Bloom by BotaniK Scientific Team",
      boxTitle: "Ready to master precision botanical extraction?",
      boxDesc: "Discover the BloomLab® extractor to preserve whole plant Totum at home, calibrated to the exact degree.",
      shopBtn: "Discover BloomLab®",
      assessmentBtn: "Take the ALMA Systemic Assessment"
    }
  },
  de: {
    breadcrumb: {
      home: "Startseite",
      protocols: "Systemischer Reset",
      current: "Psoriasis-Protokoll",
      share: "Teilen",
      copied: "Link kopiert!",
      downloadPdf: "PDF herunterladen"
    },
    hero: {
      badge: "Homöostatischer Reset — Therapeutisches Terrain",
      title: "Psoriasis-Protokoll",
      subtitle: "Begleitung des Psoriasis-Terrains (genetisches, epigenetisches und allostatisches Vulnerabilitätsprofil), Entlastung der tiefen Ausscheidungsorgane und Beruhigung chronischer Entzündungskaskaden durch hochpräzise Pflanzenheilkunde.",
      tagWeeks: "14 Wochen (Phasen 0 bis 3)",
      tagAxis: "Darm - Leber - Haut Achse",
      tagSafety: "Sicherheit & Binder Inklusive"
    },
    disclaimer: {
      title: "Medizinischer und rechtlicher Hinweis",
      text: "Dieses Protokoll dient ausschließlich der Information und Bildung über die Begleitung des biologischen Terrains durch Heilpflanzen und Lebenshygiene. Es stellt keine ärztliche Behandlung, Diagnose oder Heilmittelverschreibung dar. Psoriasis ist eine chronisch-entzündliche Hauterkrankung, die einer regelmäßigen dermatologischen Betreuung bedarf. Setzen Sie niemals verordnete Medikamente ohne ausdrückliche Rücksprache mit Ihrem behandelnden Arzt ab."
    },
    nav: {
      foreword: "Vorwort",
      prereqs: "4 Grundvoraussetzungen",
      detection: "Terrain-Diagnostik",
      phases: "Phasen-Protokoll",
      rules: "Goldene Regeln",
      observations: "Beobachtungen",
      limits: "Was Bloom leisten kann",
      logbook: "Tagebuch"
    },
    foreword: {
      title: "Vorwort — Psoriasis neu verstehen",
      quote: "Psoriasis ist keine primäre Hauterkrankung. Sie ist das kutane Notsignal einer metabolischen Überlastung und eines durchlässigen Darms.",
      p1: "Die konventionelle Dermatologie konzentriert sich meist auf die sichtbaren Symptome der Epidermis: schuppende Rötungen, beschleunigte Keratinozyten-Proliferation. Doch die Haut ist nur der äußere Spiegel.",
      p2: "Im systemischen Ansatz von Bloom by BotaniK ist die Haut das dritte Notausscheidungsorgan. Wenn die Leber überlastet ist und die Darmbarriere Endotoxine (LPS) in den Blutkreislauf entlässt, flammt das Immunsystem auf.",
      p3: "Unser Protokoll repariert die Integrität der Darmschleimhaut, regt den Galle- und Leberfluss an und beruhigt Entzündungszytokine, ohne die vitalen Selbstheilungskräfte des Körpers zu unterdrücken.",
      highlightTitle: "Der biologische Schlüssel zum Terrain",
      highlightText: "Nicht die Haut unterdrücken: Leber entlasten, Darm reparieren, zirkulierende Toxine mit Bindern abfangen und das pflanzliche Vollspektrum (Totum) zuführen."
    },
    prereqs: {
      badge: "Nicht verhandelbare Grundlagen (Freier Zugang)",
      title: "Die 4 täglichen Säulen des Resets",
      subtitle: "Keine Heilpflanze kann einen Lebensstil ausgleichen, der den Körper in dauerhaftem Alarmzustand gefangen hält.",
      items: [
        {
          title: "1. Schlaf & Zirkadianer Rhythmus",
          desc: "Einschlafen vor 23:00 Uhr. Die Zellerneuerung der Haut und die glymphatische Entgiftung von Gehirn und Leber erfolgen primär zwischen 22:00 und 03:00 Uhr morgens.",
          advice: "Schlafraum bei 18°C, vollständige Dunkelheit, kein Blaulicht 90 Minuten vor dem Schlafen."
        },
        {
          title: "2. Atmung & Vagustonus",
          desc: "Herzkohärenz-Atmung (5s Einatmen, 5s Ausatmen für 5 Minuten) 3-mal täglich senkt die Ausschüttung von Stresshormonen der Nebennierenachse.",
          advice: "Morgens nach dem Aufwachen, vor dem Mittagessen und direkt vor dem Schlafengehen anwenden."
        },
        {
          title: "3. Bewegung & Lymphfluss",
          desc: "Das Lymphsystem besitzt keine eigene Muskelpumpe: Nur aktive Muskelbewegung und zügiges Gehen leiten Stoffwechselendprodukte zu den Lymphknoten ab.",
          advice: "Täglich 30 Minuten zügiges Spazierengehen an der frischen Luft und sanfte Dehnübungen."
        },
        {
          title: "4. Natürliches Morgenlicht & Elektrolyte",
          desc: "Tageslichtkontakt innerhalb von 30 Minuten nach dem Erwachen synchronisiert die innere Uhr; Hydratation mit unraffinierten Mineralsalzen.",
          advice: "1,5 bis 2 Liter mineralarmes, lauwarmes Wasser über den Tag verteilt in kleinen Schlucken trinken."
        }
      ]
    },
    freemiumGate: {
      badge: "Klinischer Protokollbereich",
      title: "Vollständiges Psoriasis-Protokoll freischalten",
      desc: "Erhalten Sie sofortigen Zugriff auf die exakten Dosierungen, BloomLab® Extraktionsparameter, Adsorptionszyklen und den 14-Wochen-Fahrplan.",
      inputName: "Ihr Vorname",
      inputEmail: "Ihre E-Mail-Adresse",
      button: "Vollständigen Zugang kostenlos freischalten",
      submitting: "Zugang wird freigeschaltet...",
      success: "Zugang erfolgreich freigeschaltet! Willkommen im Protokoll.",
      privacy: "Ihre Daten werden streng vertraulich behandelt. Kein Spam. Vollständige DSGVO-Konformität.",
      benefits: [
        "Vollständige BloomLab® Extraktionsblätter (auf 0,5°C genaue Temperaturen, genaue Zeiten)",
        "Chronobiologischer Einnahmeplan: Morgens, Mittags, Abends und zur Nacht",
        "Spezifisches Binder-Protokoll zur Vermeidung von Herxheimer-Entgiftungsreaktionen",
        "Ausdruckbares Wochentagebuch zur Dokumentation der 5 biologischen Schlüsselmarker"
      ]
    },
    phases: {
      title: "Klinisches Protokoll nach chronologischen Phasen",
      subtitle: "Ein strukturierter 14-Wochen-Aufbau zur tiefgreifenden Desensibilisierung und Regeneration des Terrains.",
      tabs: {
        p0: "Phase 0 — Entlastung (Woche 1-2)",
        p1: "Phase 1 — Leber-Galle-Drainage (Woche 3-6)",
        p2: "Phase 2 — Schleimhaut-Reparatur (Woche 7-10)",
        p3: "Phase 3 — Stabilisierung (Woche 11-14)"
      },
      tableHeaders: {
        time: "Tageszeit",
        actives: "Pflanzliche Wirkstoffe & Synergien",
        dosage: "Dosierung",
        bloomlab: "BloomLab® Extraktion",
        precautions: "Wichtige Vorsichtsmaßnahmen"
      }
    },
    detection: {
      badge: "Funktionelle Zeichenlehre",
      title: "Terrain-Diagnostik: Körpersignale lesen lernen",
      subtitle: "Beobachten Sie die Reaktionen Ihres Organismus vor, während und nach jeder Protokollphase.",
      tabs: {
        tongue: "Zungendiagnostik",
        pulse: "Pulsqualität",
        abdomen: "Bauchraum",
        skin: "Hautbeschaffenheit"
      },
      colSign: "Beobachtetes Signal",
      colMeaning: "Biologische Bedeutung",
      colAction: "Protokollanpassung"
    },
    rules: {
      badge: "Goldene Regeln",
      title: "Die 6 unverhandelbaren Erfolgsprinzipien",
      subtitle: "Was einen nachhaltigen homöostatischen Reset von einem schnellen Rückfall unterscheidet."
    },
    observations: {
      badge: "Genesungs-Zeitachse",
      title: "Was Sie Woche für Woche beobachten werden",
      subtitle: "Verstehen Sie den natürlichen Ablauf der Hautregeneration, um Heilkrisen richtig einzuordnen.",
      colTime: "Zeitraum",
      colExpected: "Erwartete Veränderungen",
      colAlerts: "Wichtige Achtsamkeitspunkte"
    },
    limits: {
      badge: "Ethik & Transparenz",
      title: "Was Bloom leisten kann — und was nicht",
      subtitle: "Volle Klarheit im Dienste Ihrer Sicherheit und authentischen gesundheitlichen Autonomie.",
      canTitle: "Was das Bloom-Protokoll bewirkt:",
      cannotTitle: "Was Bloom nicht ersetzt:",
      canItems: [
        "Entlastet die primären Ausscheidungsorgane spürbar von chronischen Giften.",
        "Repariert die Schlussleisten (Tight Junctions) der geschädigten Darmwand.",
        "Liefert ein reines pflanzliches Totum ohne toxische chemische Lösungsmittelreste.",
        "Fördert den Gallenfluss und die Ausscheidung saurer Stoffwechselprodukte."
      ],
      cannotItems: [
        "Ersetzt weder eine ärztliche Diagnose noch die Kontrolle durch Ihren Facharzt.",
        "Verspricht keine Wunderheilung ohne strikte Einhaltung der Lebenshygiene.",
        "Ersetzt keine umfassenden klinischen Laboruntersuchungen.",
        "Darf niemals dazu verleiten, verordnete immunsuppressive Medikamente eigenmächtig abzusetzen."
      ]
    },
    logbook: {
      badge: "Persönliche Dokumentation",
      title: "Ihr wöchentliches Genesungstagebuch",
      subtitle: "Messen Sie Ihren Fortschritt objektiv anhand von 5 funktionellen Schlüsselparametern.",
      downloadBtn: "Tagebuch als PDF herunterladen",
      markersTitle: "Die 5 Bewertungsmarker für jeden Sonntag:"
    },
    cta: {
      quote: "Ihr Körper ist nicht fehlerhaft. Er ist blockiert durch eine Last, die er aus eigener Kraft nicht mehr bewältigen kann.",
      author: "Wissenschaftliches Team von Bloom by BotaniK",
      boxTitle: "Bereit für präzise botanische Extraktion zu Hause?",
      boxDesc: "Entdecken Sie den BloomLab® Extraktor, um das gesamte pflanzliche Totum gradgenau zu extrahieren.",
      shopBtn: "BloomLab® entdecken",
      assessmentBtn: "ALMA Systemische Analyse starten"
    }
  }
};
