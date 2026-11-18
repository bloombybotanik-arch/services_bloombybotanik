import { Language } from '../translations';

export interface PhycocyanineRecipeCopy {
  metaTitle: string;
  metaDescription: string;
  breadcrumbHome: string;
  breadcrumbAcademy: string;
  breadcrumbReset: string;
  breadcrumbCurrent: string;
  backButton: string;
  heroEyebrow: string;
  h1: string;
  subtitle: string;
  metrics: {
    volumeLabel: string;
    volumeValue: string;
    tempLabel: string;
    tempValue: string;
    durationLabel: string;
    durationValue: string;
    phasesLabel: string;
    phasesValue: string;
  };
  imageAlt: string;
  captionLead: string;
  captionSub: string;
  captionBadge: string;
  intro: {
    eyebrow: string;
    heading: string;
    lead: string;
    pillars: Array<{
      badge: string;
      title: string;
      body: string;
    }>;
  };
  recipe: {
    eyebrow: string;
    heading: string;
    lead: string;
    ingredientCardTitle: string;
    ingredientDose: string;
    ingredientNote: string;
    solventCardTitle: string;
    solventDose: string;
    solventNote: string;
    tableTitle: string;
    headers: {
      phase: string;
      temp: string;
      duration: string;
      agitation: string;
      justification: string;
    };
    row: {
      phase: string;
      temp: string;
      duration: string;
      agitation: string;
      justification: string;
    };
    filtrationTitle: string;
    filtrationSteps: string[];
  };
  benefitsDosage: {
    eyebrow: string;
    heading: string;
    benefitsHeading: string;
    benefitsList: Array<{
      title: string;
      desc: string;
    }>;
    dosageHeading: string;
    dosageHeaders: {
      goal: string;
      dose: string;
      duration: string;
    };
    dosageRows: Array<{
      goal: string;
      dose: string;
      duration: string;
    }>;
    chronoTitle: string;
    chronoBody: string;
  };
  precautions: {
    eyebrow: string;
    heading: string;
    intro: string;
    absTitle: string;
    absList: string[];
    relTitle: string;
    relList: string[];
    vigilanceTitle: string;
    vigilanceBody: string;
  };
  cta: {
    eyebrow: string;
    heading: string;
    body: string;
    primaryBtn: string;
    resetBtn: string;
    protocolsBtn: string;
  };
  jsonLd: {
    name: string;
    alternateName: string;
    recipeYield: string;
    recipeCategory: string;
    keywords: string;
    recipeIngredient: string[];
    recipeInstructions: Array<{
      name: string;
      text: string;
    }>;
  };
}

export const PHYCOCYANINE_RECIPE_COPY: Record<Language, PhycocyanineRecipeCopy> = {
  fr: {
    metaTitle: 'Phycocyanine & Reset Homéostasique | Extraction BloomLab',
    metaDescription:
      'Extrayez la phycocyanine de spiruline à 40°C avec la BloomLab pour soutenir vos mitochondries et optimiser les Phases 2 et 3 du Reset Homéostasique.',
    breadcrumbHome: 'Accueil',
    breadcrumbAcademy: 'Académie',
    breadcrumbReset: 'Reset Homéostasique',
    breadcrumbCurrent: 'Phycocyanine de Spiruline',
    backButton: 'Retour au Reset Homéostasique',
    heroEyebrow:
      'Reset Homéostasique · Phases 2 & 3 · Extraction Douce 40 °C · 800 ml',
    h1: 'Phycocyanine & Reset Homéostasique : Le Bleu qui Réinitialise votre Biologie',
    subtitle:
      'Découvrez comment ce pigment bleu de la spiruline, extrait avec la BloomLab, potentialise votre protocole de rééquilibrage en agissant sur les mitochondries et l’inflammation.',
    metrics: {
      volumeLabel: 'Volume préparé',
      volumeValue: '800 ml (extrait liquide)',
      tempLabel: 'Température stricte',
      tempValue: '40 °C (jamais > 45 °C)',
      durationLabel: 'Cycle BloomLab®',
      durationValue: '1 heure · agitation douce',
      phasesLabel: 'Ancrage Reset',
      phasesValue: 'Phases 2 & 3 (Drainage & HPA)',
    },
    imageAlt:
      'Extrait liquide bleu cobalt de phycocyanine en carafe borosilicate, poudre de spiruline biologique et flacon compte-gouttes ambré pour protocole Reset Homéostasique BloomLab',
    captionLead: 'Extraction Douce BloomLab® :',
    captionSub:
      'protocole détox spiruline à 40 °C pour préserver l’intégrité thermolabile de la phycocyanine.',
    captionBadge: 'Thermorégulation ≤ 40 °C',
    intro: {
      eyebrow: 'Justification Stratégique & Mécanismes Cellulaires',
      heading:
        'Pourquoi la phycocyanine est l’alliée stratégique du Reset Homéostasique',
      lead: 'Dans la philosophie Bloom by BotaniK, votre corps n’est pas cassé — il est verrouillé sous le poids d’une charge allostatique excessive. Surnommée l’« or bleu » de la micro-algue spiruline (Arthrospira platensis) — utilisée de longue date en nutrition énergétique et rapprochée des toniques du Sang et du Yin en recette spiruline MTC — la phycocyanine intervient précisément là où les tissus saturent, sans brusquer vos émonctoires.',
      pillars: [
        {
          badge: 'Bioénergétique Cellulaire',
          title: 'Ciblage mitochondrial & baisse de la charge allostatique',
          body: 'La phycocyanine protège les membranes des mitochondries et neutralise les espèces réactives de l’oxygène. En réduisant le stress oxydatif à la source, elle diminue directement la « charge allostatique » (l’usure silencieuse d’un organisme en surrégime) au cœur du protocole Reset Homéostasique.',
        },
        {
          badge: 'Sortir du Verrouillage',
          title: 'Modulation fine des voies NF-κB et Nrf2',
          body: 'Sur le plan biochimique, les bienfaits de la phycocyanine reposent sur une double bascule : elle freine le facteur pro-inflammatoire NF-κB tout en activant la voie protectrice Nrf2 (déclenchant la synthèse d’enzymes antioxydantes endogènes). Elle aide ainsi à lever le « verrouillage » inflammatoire du terrain.',
        },
        {
          badge: 'Architecture en 6 Phases',
          title: 'Positionnement idéal en Phase 2 et Phase 3 du Reset',
          body: 'Une fois les émonctoires déverrouillés (Phase 0) et le filtre hépatique relancé (Phase 1), l’extraction de phycocyanine s’intègre idéalement dans la Phase 2 (Drainage Profond du Totum) et la Phase 3 (Régénération de l’Axe HPA) pour soutenir le nettoyage cellulaire et la recharge énergétique.',
        },
      ],
    },
    recipe: {
      eyebrow: 'Protocole Technique · Extraction Aqueuse BloomLab®',
      heading: 'La Recette : Extraction de Phycocyanine avec la BloomLab',
      lead: 'Contrairement aux poudres de spiruline complètes dont les pigments restent piégés dans les membranes cellulaires, une extraction phycocyanine BloomLab en phase aqueuse à pH neutre et à basse température libère une phycocyanine hydrosoluble hautement biodisponible.',
      ingredientCardTitle: 'Ingrédient Botanique (Qualité Critique)',
      ingredientDose: '40 à 50 g de spiruline',
      ingredientNote:
        'Spiruline en poudre ou en brindilles (flakes) de qualité alimentaire, impérativement certifiée biologique, séchée à basse température (< 45 °C) et contrôlée exempte de métaux lourds et de microcystines.',
      solventCardTitle: 'Solvant Polaire Neutre',
      solventDose: '800 ml d’eau distillée ou filtrée',
      solventNote:
        'Eau très faiblement minéralisée à pH neutre (autour de 7,0). Un pH neutre garantit la stabilité et la solubilité optimales du complexe phycocyanobiline.',
      tableTitle: 'Protocole d’Extraction (Mode DIY / Manuel BloomLab®)',
      headers: {
        phase: 'Étape',
        temp: 'Température',
        duration: 'Durée',
        agitation: 'Agitation',
        justification: 'Justification Scientifique',
      },
      row: {
        phase: 'Phase Unique (Extraction Douce)',
        temp: '40 °C',
        duration: '1 heure (60 min)',
        agitation: 'Agitation douce continue',
        justification:
          'La phycocyanine est une protéine pigmentaire thermolabile qui se dénature irréversiblement au-delà de 45 °C. Le palier strict à 40 °C brise les parois cellulaires fragiles de la spiruline et libère le pigment tout en préservant 100 % de son intégrité structurale.',
      },
      filtrationTitle: 'Filtration de précision & Conservation en flacon ambré',
      filtrationSteps: [
        'À l’issue des 60 minutes à 40 °C, laissez tiédir quelques instants puis filtrez lentement à travers une étamine fine (ou double gaze stérile / filtre à mailles serrées) sans presser excessivement la pâte résiduelle.',
        'Le filtrat obtenu doit arborer une couleur bleu cobalt intense et translucide, signe d’une extraction réussie sans dégradation thermique ni contamination chlorophylienne excessive.',
        'Transvasez immédiatement dans un flacon en verre ambré propre (pour bloquer la photo-oxydation), placez au réfrigérateur à 4 °C et consommez dans un délai strict de 3 à 5 jours — la forme liquide fraîche étant naturellement instable.',
      ],
    },
    benefitsDosage: {
      eyebrow: 'Usages Éducatifs, Rythmes & Chronobiologie',
      heading: 'Bénéfices & Posologie d’Accompagnement',
      benefitsHeading: 'Les 4 axes de soutien biologique de la phycocyanine',
      benefitsList: [
        {
          title: 'Bouclier antioxydant cellulaire',
          desc: 'Capte les radicaux libres et protège les membranes lipidiques ainsi que les mitochondries durant les phases de drainage profond.',
        },
        {
          title: 'Modulation de l’inflammation',
          desc: 'Soutient l’équilibre des cytokines via l’inhibition de NF-κB et l’activation de la réponse antioxydante Nrf2.',
        },
        {
          title: 'Soutien de l’immunité de terrain',
          desc: 'Accompagne les défenses naturelles et la vitalité de la lignée hématopoïétique sans sur-stimulation agressive.',
        },
        {
          title: 'Énergie & récupération physiologique',
          desc: 'Optimise l’oxygénation cellulaire et soutient la récupération lors des épisodes de fatigue de l’axe HPA.',
        },
      ],
      dosageHeading: 'Repères de posologie selon l’objectif (extrait titré / équivalent)',
      dosageHeaders: {
        goal: 'Objectif de Terrain',
        dose: 'Dosage Journalier',
        duration: 'Durée de Cure',
      },
      dosageRows: [
        {
          goal: 'Tonus & Énergie',
          dose: '20 mg / jour (jusqu’à 50 mg en cas de fatigue intense)',
          duration: '10 à 30 jours',
        },
        {
          goal: 'Convalescence & Immunité',
          dose: '50 mg / jour',
          duration: '20 à 30 jours',
        },
        {
          goal: 'Entretien & Homéostasie',
          dose: '10 à 20 mg / jour',
          duration: 'Programme continu ou cures saisonnières',
        },
      ],
      chronoTitle: 'Chronobiologie circadienne : quand la consommer ?',
      chronoBody:
        'Privilégiez une prise le matin, à jeun ou 20 minutes avant le petit-déjeuner (diluée dans un peu d’eau fraîche ou à température ambiante). Ce créneau matinal maximise l’absorption intestinale de cette protéine hydrosoluble et soutient l’élan énergétique diurne sans risque de perturber l’endormissement le soir.',
    },
    precautions: {
      eyebrow: 'Sécurité Physiologique & Responsabilité',
      heading: 'Précautions, Contre-indications et Vigilance',
      intro:
        'Cette fiche s’inscrit dans une vocation strictement éducative et de bien-être général. Elle ne remplace en aucun cas un diagnostic ou un suivi médical, et vous ne devez jamais interrompre un traitement en cours sans avis de votre médecin.',
      absTitle: 'Contre-indications absolues',
      absList: [
        'Phénylcétonurie (PCU) — en raison de la présence de phénylalanine dans les acides aminés de l’algue',
        'Maladies auto-immunes évolutives (en raison de l’action immuno-modulatrice)',
        'Prise de médicaments immunosuppresseurs',
        'Allergie connue aux algues, micro-algues ou à la spiruline',
      ],
      relTitle: 'Contre-indications relatives (avis médical indispensable)',
      relList: [
        'Prise d’anticoagulants ou d’antiagrégants plaquettaires',
        'Grossesse, allaitement et enfants de moins de 12 ans',
        'Insuffisance rénale ou hépatique avérée',
        'Maladies Inflammatoires Chroniques de l’Intestin (MICI)',
        'Cancer en cours de traitement (chimiothérapie, radiothérapie ou immunothérapie)',
      ],
      vigilanceTitle:
        'Point de vigilance clé : Fer (Hémochromatose) & Instabilité thermique',
      vigilanceBody:
        'Contrairement à la spiruline entière qui est très riche en fer, la phycocyanine pure extraite en phase aqueuse et filtrée est quasi exempte de fer — ce qui la rend nettement plus sûre en cas d’hémochromatose ou de surcharge martiale (toujours avec validation médicale). En contrepartie, sa forme liquide est fragile : ne jamais la chauffer au-delà de 45 °C (jamais dans un thé ou un bouillon brûlant) et consommer rapidement sous 3 à 5 jours au réfrigérateur.',
    },
    cta: {
      eyebrow: 'Passez à l’extraction de précision à 40 °C',
      heading:
        'Intégrez la phycocyanine à votre protocole Reset Homéostasique avec BloomLab®',
      body: 'Grâce au maintien thermique stable au degré près à 40 °C sans surchauffe locale, la BloomLab® préserve l’intégralité de cette molécule bleue fragile pour soutenir vos Phases 2 et 3.',
      primaryBtn: 'Découvrir l’extracteur BloomLab®',
      resetBtn: 'Revoir les 6 Phases du Reset Homéostasique',
      protocolsBtn: 'Explorer tous les protocoles',
    },
    jsonLd: {
      name: 'Extraction Douce de Phycocyanine de Spiruline à 40 °C à la BloomLab',
      alternateName: 'Protocole Phycocyanine — Reset Homéostasique Phases 2 & 3',
      recipeYield: '800 ml d’extrait liquide concentré',
      recipeCategory: 'Reset Homéostasique · Extraction Botanique',
      keywords:
        'phycocyanine Reset Homéostasique, extraction phycocyanine BloomLab, recette spiruline MTC, bienfaits phycocyanine, protocole détox spiruline',
      recipeIngredient: [
        '40 à 50 g de spiruline biologique en poudre ou flakes de qualité alimentaire',
        '800 ml d’eau distillée ou filtrée à pH neutre (~7,0)',
      ],
      recipeInstructions: [
        {
          name: 'Dosage & Mise en suspension',
          text: 'Versez 800 ml d’eau distillée ou filtrée à pH neutre dans la cuve BloomLab et ajoutez 40 à 50 g de spiruline bio.',
        },
        {
          name: 'Extraction douce à 40 °C',
          text: 'Programmez une phase unique à 40 °C pendant 1 heure sous agitation douce pour briser les parois cellulaires sans dénaturer la phycocyanine thermolabile (< 45 °C).',
        },
        {
          name: 'Filtration fine & Conservation ambrée',
          text: 'Filtrez à l’étamine fine pour obtenir un liquide bleu intense, transférez en flacon en verre ambré au réfrigérateur (4 °C) et consommez sous 3 à 5 jours.',
        },
      ],
    },
  },

  en: {
    metaTitle: 'Phycocyanin & Homeostatic Reset | BloomLab 40°C Extraction',
    metaDescription:
      'Extract spirulina phycocyanin at 40°C with BloomLab to support mitochondria, modulate NF-κB/Nrf2 and enhance Phases 2 & 3 of Homeostatic Reset.',
    breadcrumbHome: 'Home',
    breadcrumbAcademy: 'Academy',
    breadcrumbReset: 'Homeostatic Reset',
    breadcrumbCurrent: 'Spirulina Phycocyanin',
    backButton: 'Back to Homeostatic Reset',
    heroEyebrow:
      'Homeostatic Reset · Phases 2 & 3 · Gentle 40 °C Extraction · 800 ml',
    h1: 'Phycocyanin & Homeostatic Reset: The Blue Pigment That Resets Your Biology',
    subtitle:
      'Discover how this vibrant blue spirulina pigment, extracted gently with BloomLab, powers your rebalancing protocol by targeting mitochondria and inflammatory lock.',
    metrics: {
      volumeLabel: 'Batch volume',
      volumeValue: '800 ml (liquid extract)',
      tempLabel: 'Strict temperature',
      tempValue: '40 °C (never > 45 °C)',
      durationLabel: 'BloomLab® Cycle',
      durationValue: '1 hour · gentle agitation',
      phasesLabel: 'Reset Placement',
      phasesValue: 'Phases 2 & 3 (Drainage & HPA)',
    },
    imageAlt:
      'Vibrant cobalt blue liquid phycocyanin extract in borosilicate glass carafe beside organic emerald spirulina powder and amber dropper bottle for BloomLab Homeostatic Reset',
    captionLead: 'BloomLab® Gentle Extraction:',
    captionSub:
      '40 °C spirulina protocol safeguarding heat-sensitive phycocyanin integrity.',
    captionBadge: 'Thermal Control ≤ 40 °C',
    intro: {
      eyebrow: 'Strategic Rationale & Cellular Mechanisms',
      heading:
        'Why phycocyanin is the ideal ally of the Homeostatic Reset',
      lead: 'At Bloom by BotaniK, we start from one conviction: your body is not broken—it is locked under excessive allostatic load. Revered as the "blue gold" of spirulina (Arthrospira platensis) and echoing TCM blood-nourishing cooling tonics, water-extracted phycocyanin acts where tissues stagnate without overwhelming elimination pathways.',
      pillars: [
        {
          badge: 'Mitochondrial Bioenergetics',
          title: 'Mitochondrial protection & lower allostatic load',
          body: 'Phycocyanin shields mitochondrial membranes and quenches oxidative stress at its source, directly helping ease the "allostatic load" (cumulative physiological wear) targeted throughout the Homeostatic Reset.',
        },
        {
          badge: 'Unlocking Inflammation',
          title: 'NF-κB inhibition & Nrf2 activation',
          body: 'Biochemically, phycocyanin supports a dual shift: it down-regulates the pro-inflammatory NF-κB cascade while activating the protective Nrf2 pathway (endogenous antioxidant synthesis), helping release inflammatory lock.',
        },
        {
          badge: '6-Phase Sequencing',
          title: 'Strategic integration in Phases 2 & 3',
          body: 'Once emunctories are open (Phase 0) and hepatic clearance is engaged (Phase 1), phycocyanin fits seamlessly into Phase 2 (Deep Totum Drainage) and Phase 3 (HPA Axis Regeneration) to assist cellular cleanup and energy restoration.',
        },
      ],
    },
    recipe: {
      eyebrow: 'Technical Protocol · BloomLab® Aqueous Extraction',
      heading: 'The Recipe: Phycocyanin Extraction with BloomLab',
      lead: 'Unlike whole spirulina powder where pigments remain bound inside cell walls, aqueous BloomLab extraction at neutral pH and 40 °C releases clean, water-soluble phycocyanin.',
      ingredientCardTitle: 'Botanical Ingredient (Strict Quality)',
      ingredientDose: '40 to 50 g spirulina',
      ingredientNote:
        'Food-grade organic spirulina powder or flakes, dried below 45 °C and lab-tested free from heavy metals and microcystins.',
      solventCardTitle: 'Neutral Polar Solvent',
      solventDose: '800 ml distilled or filtered water',
      solventNote:
        'Low-mineral water at neutral pH (~7.0) to preserve phycocyanobilin stability and maximize pigment solubility.',
      tableTitle: 'Extraction Protocol (DIY / BloomLab® Manual Mode)',
      headers: {
        phase: 'Stage',
        temp: 'Temperature',
        duration: 'Duration',
        agitation: 'Agitation',
        justification: 'Scientific Rationale',
      },
      row: {
        phase: 'Single Phase (Gentle Extraction)',
        temp: '40 °C',
        duration: '1 hour (60 min)',
        agitation: 'Gentle continuous stirring',
        justification:
          'Phycocyanin is a heat-sensitive pigment-protein that denatures irreversibly above 45 °C. Holding strictly at 40 °C gently ruptures spirulina cell walls while preserving molecular integrity.',
      },
      filtrationTitle: 'Fine filtration & Amber glass storage',
      filtrationSteps: [
        'After 60 minutes at 40 °C, allow to settle briefly and filter slowly through fine muslin / cheesecloth without forcing solid paste through.',
        'The resulting filtrate should display an intense, luminous cobalt-blue hue, confirming intact pigment extraction.',
        'Transfer immediately into a clean amber glass bottle, refrigerate at 4 °C, and consume within 3 to 5 days—liquid phycocyanin is sensitive to light and heat.',
      ],
    },
    benefitsDosage: {
      eyebrow: 'Educational Uses, Timing & Chronobiology',
      heading: 'Benefits & Suggested Dosage',
      benefitsHeading: 'Four physiological pillars of phycocyanin support',
      benefitsList: [
        {
          title: 'Potent cellular antioxidant',
          desc: 'Neutralizes free radicals and protects lipid membranes and mitochondria during deep drainage phases.',
        },
        {
          title: 'Inflammatory pathway modulation',
          desc: 'Balances cytokine signaling by down-modulating NF-κB and supporting Nrf2 antioxidant defenses.',
        },
        {
          title: 'Immune resilience support',
          desc: 'Supports balanced immune vitality without harsh over-stimulation.',
        },
        {
          title: 'Energy & recovery',
          desc: 'Supports cellular oxygenation and vitality recovery during HPA axis fatigue.',
        },
      ],
      dosageHeading: 'Reference dosage guidelines',
      dosageHeaders: {
        goal: 'Wellness Focus',
        dose: 'Daily Amount',
        duration: 'Cycle Duration',
      },
      dosageRows: [
        {
          goal: 'Vitality & Energy',
          dose: '20 mg / day (up to 50 mg during intense fatigue)',
          duration: '10 to 30 days',
        },
        {
          goal: 'Recovery & Immunity',
          dose: '50 mg / day',
          duration: '20 to 30 days',
        },
        {
          goal: 'Maintenance',
          dose: '10 to 20 mg / day',
          duration: 'Ongoing or seasonal cycles',
        },
      ],
      chronoTitle: 'Circadian timing: best taken in the morning',
      chronoBody:
        'Take in the morning on an empty stomach or 20 minutes before breakfast (diluted in cool or room-temperature water) to maximize absorption and support daytime energy without disturbing evening sleep.',
    },
    precautions: {
      eyebrow: 'Safety & Clinical Prudence',
      heading: 'Precautions, Contraindications & Vigilance',
      intro:
        'This protocol is provided strictly for educational and general wellness purposes. It does not constitute medical advice or replace physician care; never discontinue prescribed medication without medical guidance.',
      absTitle: 'Absolute contraindications',
      absList: [
        'Phenylketonuria (PKU) due to amino acid phenylalanine content',
        'Active progressive autoimmune conditions',
        'Current use of immunosuppressive therapy',
        'Known allergy to algae, microalgae, or spirulina',
      ],
      relTitle: 'Relative contraindications (medical advice required)',
      relList: [
        'Anticoagulant or antiplatelet medications',
        'Pregnancy, breastfeeding, and children under 12 years old',
        'Diagnosed renal or hepatic insufficiency',
        'Inflammatory Bowel Disease (IBD)',
        'Active cancer treatment (chemotherapy, radiation, or immunotherapy)',
      ],
      vigilanceTitle:
        'Key Vigilance: Iron (Hemochromatosis) & Liquid Instability',
      vigilanceBody:
        'Unlike whole spirulina which is iron-rich, water-extracted filtered phycocyanin is virtually iron-free—making it safer in cases of iron overload / hemochromatosis (subject to physician approval). However, liquid extract is unstable: never heat above 45 °C and consume within 3 to 5 days refrigerated.',
    },
    cta: {
      eyebrow: 'Degree-accurate extraction at 40 °C',
      heading:
        'Bring phycocyanin into your Homeostatic Reset with BloomLab®',
      body: 'With steady 40 °C temperature regulation and zero hot-spots, BloomLab® preserves fragile blue phycocyanin across Phases 2 and 3.',
      primaryBtn: 'Discover the BloomLab® Extractor',
      resetBtn: 'Back to the 6 Reset Phases',
      protocolsBtn: 'Explore All Protocols',
    },
    jsonLd: {
      name: 'Gentle 40 °C Spirulina Phycocyanin Extraction with BloomLab',
      alternateName: 'Phycocyanin Protocol — Homeostatic Reset Phases 2 & 3',
      recipeYield: '800 ml concentrated liquid extract',
      recipeCategory: 'Homeostatic Reset · Botanical Extraction',
      keywords:
        'phycocyanin Homeostatic Reset, BloomLab phycocyanin extraction, TCM spirulina recipe, phycocyanin benefits, spirulina detox protocol',
      recipeIngredient: [
        '40 to 50 g food-grade organic spirulina powder or flakes',
        '800 ml distilled or filtered neutral-pH (~7.0) water',
      ],
      recipeInstructions: [
        {
          name: 'Prepare suspension',
          text: 'Add 40–50 g organic spirulina to 800 ml neutral filtered water in the BloomLab chamber.',
        },
        {
          name: '40 °C gentle extraction',
          text: 'Run 1 hour at 40 °C with gentle stirring to release water-soluble phycocyanin without exceeding 45 °C.',
        },
        {
          name: 'Filter & refrigerate',
          text: 'Strain through fine muslin into an amber glass bottle, refrigerate at 4 °C, and consume within 3–5 days.',
        },
      ],
    },
  },

  de: {
    metaTitle: 'Phycocyanin & Homöostatischer Reset | BloomLab 40°C Extraktion',
    metaDescription:
      'Extrahieren Sie Spirulina-Phycocyanin bei 40°C mit der BloomLab zur Unterstützung der Mitochondrien in Phase 2 & 3 des Homöostatischen Resets.',
    breadcrumbHome: 'Startseite',
    breadcrumbAcademy: 'Akademie',
    breadcrumbReset: 'Homöostatischer Reset',
    breadcrumbCurrent: 'Spirulina-Phycocyanin',
    backButton: 'Zurück zum Homöostatischen Reset',
    heroEyebrow:
      'Homöostatischer Reset · Phase 2 & 3 · Sanfte 40 °C Extraktion · 800 ml',
    h1: 'Phycocyanin & Homöostatischer Reset: Das Blau, das Ihre Biologie neu ausrichtet',
    subtitle:
      'Entdecken Sie, wie dieses tiefblaue Pigment der Spirulina – schonend mit der BloomLab extrahiert – Ihr Reset-Protokoll über Mitochondrien und Entzündungsmodulation unterstützt.',
    metrics: {
      volumeLabel: 'Ansatzmenge',
      volumeValue: '800 ml (Flüssigextrakt)',
      tempLabel: 'Strikte Temperatur',
      tempValue: '40 °C (niemals > 45 °C)',
      durationLabel: 'BloomLab® Zyklus',
      durationValue: '1 Stunde · sanftes Rühren',
      phasesLabel: 'Reset-Phase',
      phasesValue: 'Phase 2 & 3 (Drainage & HPA)',
    },
    imageAlt:
      'Leuchtend kobaltblauer flüssiger Phycocyanin-Extrakt in einer Borosilikat-Karaffe neben Bio-Spirulina-Pulver und Braunglasflasche für das BloomLab Reset-Protokoll',
    captionLead: 'Sanfte BloomLab® Extraktion:',
    captionSub:
      '40 °C Spirulina-Protokoll zum Schutz der hitzeempfindlichen Phycocyanin-Struktur.',
    captionBadge: 'Thermoregulation ≤ 40 °C',
    intro: {
      eyebrow: 'Strategische Begründung & Zellmechanismen',
      heading:
        'Warum Phycocyanin der ideale Partner im Homöostatischen Reset ist',
      lead: 'Nach der Philosophie von Bloom by BotaniK ist Ihr Körper nicht defekt – er befindet sich durch eine zu hohe allostatische Last im Schutzmodus. Bekannt als das „blaue Gold“ der Spirulina (Arthrospira platensis) unterstützt wässrig extrahiertes Phycocyanin genau dort, wo Gewebe überlastet sind, ohne die Ausscheidungsorgane zu überfordern.',
      pillars: [
        {
          badge: 'Mitochondriale Bioenergetik',
          title: 'Schutz der Mitochondrien & Senkung der allostatischen Last',
          body: 'Phycocyanin schützt mitochondriale Membranen und reduziert oxidativen Stress. Damit senkt es gezielt die „allostatische Last“ (stille Dauerbelastung des Organismus), die im Reset-Protokoll adressiert wird.',
        },
        {
          badge: 'Entzündungs-Modulation',
          title: 'Hemmung von NF-κB & Aktivierung von Nrf2',
          body: 'Biochemisch wirkt Phycocyanin doppelt: Es bremst den pro-entzündlichen Signalweg NF-κB und aktiviert den Schutzweg Nrf2 (körpereigene Antioxidans-Synthese), was hilft, biologische Blockaden zu lösen.',
        },
        {
          badge: '6-Phasen-Architektur',
          title: 'Optimal für Phase 2 & Phase 3 des Resets',
          body: 'Sobald Ausscheidungswege geöffnet (Phase 0) und die Leberfilter aktiviert sind (Phase 1), fügt sich Phycocyanin ideal in Phase 2 (Tiefe Drainage) und Phase 3 (Regeneration der HPA-Achse) ein.',
        },
      ],
    },
    recipe: {
      eyebrow: 'Technisches Protokoll · Wässrige BloomLab® Extraktion',
      heading: 'Das Rezept: Phycocyanin-Extraktion mit der BloomLab',
      lead: 'Während das Pigment in trockenem Spirulina-Pulver fest in den Zellwänden eingeschlossen bleibt, löst die wässrige BloomLab-Extraktion bei neutralem pH-Wert und 40 °C hoch bioverfügbares Phycocyanin heraus.',
      ingredientCardTitle: 'Botanische Zutat (Qualitätskriterium)',
      ingredientDose: '40 bis 50 g Spirulina',
      ingredientNote:
        'Bio-Spirulina in Pulverform oder Flakes in Lebensmittelqualität, schonend (< 45 °C) getrocknet und rückstandsfrei auf Schwermetalle sowie Microcystine geprüft.',
      solventCardTitle: 'Neutrales Lösungsmittel',
      solventDose: '800 ml destilliertes oder gefiltertes Wasser',
      solventNote:
        'Mineralarmes Wasser mit neutralem pH-Wert (um 7,0), um Löslichkeit und Stabilität des Phycocyanobilin-Komplexes zu sichern.',
      tableTitle: 'Extraktionsprotokoll (DIY / Manueller BloomLab® Modus)',
      headers: {
        phase: 'Phase',
        temp: 'Temperatur',
        duration: 'Dauer',
        agitation: 'Bewegung',
        justification: 'Wissenschaftliche Begründung',
      },
      row: {
        phase: 'Einzelphase (Sanfte Extraktion)',
        temp: '40 °C',
        duration: '1 Stunde (60 Min.)',
        agitation: 'Sanftes kontinuierliches Rühren',
        justification:
          'Phycocyanin ist hitzelabil und denaturiert irreversibel ab über 45 °C. Konstante 40 °C öffnen die Zellwände der Spirulina schonend bei vollständigem Erhalt der Molekülstruktur.',
      },
      filtrationTitle: 'Feinfiltration & Aufbewahrung im Braunglas',
      filtrationSteps: [
        'Nach 60 Minuten bei 40 °C kurz absetzen lassen und langsam durch ein feines Seihtuch (Etamin) abgießen, ohne den Rückstand stark auszudrücken.',
        'Die gewonnene Flüssigkeit besitzt eine intensive, klare kobaltblaue Farbe.',
        'Sofort in eine saubere Braunglasflasche füllen, bei 4 °C kühlen und innerhalb von 3 bis 5 Tagen verbrauchen (die flüssige Form ist licht- und wärmeempfindlich).',
      ],
    },
    benefitsDosage: {
      eyebrow: 'Bildungswissen, Anwendung & Chronobiologie',
      heading: 'Vorteile & Dosierungsempfehlungen',
      benefitsHeading: 'Vier biologische Schwerpunkte von Phycocyanin',
      benefitsList: [
        {
          title: 'Starkes zelluläres Antioxidans',
          desc: 'Fängt freie Radikale ab und schützt Zellmembranen sowie Mitochondrien während der Drainagephasen.',
        },
        {
          title: 'Modulation von Entzündungswegen',
          desc: 'Unterstützt die Zytokin-Balance über die Hemmung von NF-κB und Aktivierung von Nrf2.',
        },
        {
          title: 'Unterstützung des Immunsystems',
          desc: 'Fördert die natürliche Abwehrbalance ohne aggressive Überstimulation.',
        },
        {
          title: 'Energie & Regeneration',
          desc: 'Unterstützt zelluläre Vitalität und Erholung bei Erschöpfung der HPA-Achse.',
        },
      ],
      dosageHeading: 'Richtwerte nach Zielsetzung',
      dosageHeaders: {
        goal: 'Anwendungsziel',
        dose: 'Tagesdosis',
        duration: 'Dauer',
      },
      dosageRows: [
        {
          goal: 'Tonus & Energie',
          dose: '20 mg / Tag (bis 50 mg bei starker Müdigkeit)',
          duration: '10 bis 30 Tage',
        },
        {
          goal: 'Rekonvaleszenz & Immunität',
          dose: '50 mg / Tag',
          duration: '20 bis 30 Tage',
        },
        {
          goal: 'Erhaltung & Balance',
          dose: '10 bis 20 mg / Tag',
          duration: 'Laufend oder saisonal',
        },
      ],
      chronoTitle: 'Chronobiologie: Einnahme am Morgen',
      chronoBody:
        'Morgens nüchtern oder etwa 20 Minuten vor dem Frühstück in etwas kühlem oder zimmerwarmem Wasser einnehmen, um die Resorption zu optimieren und die Tagesenergie ohne Störung des Nachtschlafs zu unterstützen.',
    },
    precautions: {
      eyebrow: 'Sicherheit & Medizinische Vorsicht',
      heading: 'Vorsichtsmaßnahmen, Gegenanzeigen & Wachsamkeit',
      intro:
        'Diese Anleitung dient ausschließlich zu Bildungs- und allgemeinen Wohlfühlzwecken. Sie ersetzt keine ärztliche Beratung oder Behandlung; laufende Therapien niemals eigenmächtig absetzen.',
      absTitle: 'Absolute Gegenanzeigen',
      absList: [
        'Phenylketonurie (PKU)',
        'Fortschreitende Autoimmunerkrankungen',
        'Einnahme von Immunsuppressiva',
        'Bekannte Allergie gegen Algen, Mikroalgen oder Spirulina',
      ],
      relTitle: 'Relative Gegenanzeigen (ärztliche Rücksprache erforderlich)',
      relList: [
        'Einnahme von Antikoagulanzien / Blutverdünnern',
        'Schwangerschaft, Stillzeit und Kinder unter 12 Jahren',
        'Bekannte Nieren- oder Leberinsuffizienz',
        'Chronisch-entzündliche Darmerkrankungen (CED / MICI)',
        'Laufende Krebstherapie',
      ],
      vigilanceTitle:
        'Wichtiger Hinweis: Eisen (Hämochromatose) & Wärmeinstabilität',
      vigilanceBody:
        'Im Gegensatz zu ganzer Spirulina ist wässrig extrahiertes, gefiltertes Phycocyanin nahezu eisenfrei und daher bei Eisenüberladung (Hämochromatose) nach ärztlicher Rücksprache verträglicher. Gleichzeitig ist die flüssige Form instabil: niemals über 45 °C erhitzen und gekühlt binnen 3–5 Tagen aufbrauchen.',
    },
    cta: {
      eyebrow: 'Gradgenaue Extraktion bei 40 °C',
      heading:
        'Integrieren Sie Phycocyanin mit der BloomLab® in Ihren Homöostatischen Reset',
      body: 'Dank präziser 40 °C-Temperaturführung schützt die BloomLab® dieses empfindliche blaue Pigment für Phase 2 und Phase 3.',
      primaryBtn: 'BloomLab® Extraktor entdecken',
      resetBtn: 'Zu den 6 Phasen des Resets',
      protocolsBtn: 'Alle Protokolle ansehen',
    },
    jsonLd: {
      name: 'Sanfte 40 °C Phycocyanin-Extraktion aus Spirulina mit der BloomLab',
      alternateName:
        'Phycocyanin-Protokoll — Homöostatischer Reset Phase 2 & 3',
      recipeYield: '800 ml flüssiger Extrakt',
      recipeCategory: 'Homöostatischer Reset · Botanische Extraktion',
      keywords:
        'Phycocyanin Homöostatischer Reset, BloomLab Phycocyanin Extraktion, Spirulina TCM Rezept, Phycocyanin Wirkung, Spirulina Detox Protokoll',
      recipeIngredient: [
        '40 bis 50 g Bio-Spirulina (Pulver oder Flakes)',
        '800 ml destilliertes oder gefiltertes Wasser (pH ~7,0)',
      ],
      recipeInstructions: [
        {
          name: 'Ansatz vorbereiten',
          text: '40–50 g Bio-Spirulina in 800 ml neutrales Wasser in der BloomLab geben.',
        },
        {
          name: 'Sanfte Extraktion bei 40 °C',
          text: '1 Stunde bei 40 °C sanft rühren lassen, um Phycocyanin zu lösen, ohne 45 °C zu überschreiten.',
        },
        {
          name: 'Filtrieren & kühlen',
          text: 'Durch ein feines Tuch in eine Braunglasflasche abseihen, bei 4 °C lagern und binnen 3–5 Tagen verbrauchen.',
        },
      ],
    },
  },
};
