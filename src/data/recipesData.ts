import { BookOpen, Moon, Activity, Sparkles, ChefHat, ShieldCheck, Droplets, Leaf, FlaskConical, Wind } from 'lucide-react';

export interface Recipe {
  id: string;
  title: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  benefits: string[];
  image: string;
  category: string;
  plant?: { name: string };
  goal?: string;
  sachetA: { composition: string[]; solvant: string; temp: string; duration: string };
  sachetB: { composition: string[]; solvant: string; temp: string; duration: string };
  extractionOrder: string;
  administration: {
    mode: string;
    dailyDose: string;
    maxDose: string;
    frequency: string;
    timing: string;
    usageDuration?: string;
  };
  precautions: string[];
  contraindications: string[];
  safetyMessage: string;
  bloomNote: string;
}

export const discoveryRecipes: Recipe[] = [
  {
    id: '01',
    title: "Infusion Sommeil Profond",
    description: "Un mélange apaisant pour favoriser l'endormissement et un sommeil réparateur par extraction séquentielle des actifs.",
    ingredients: ["Valériane (racines)", "Passiflore", "Mélisse (feuilles)"],
    instructions: [
      "Préparez vos sachets A et B selon la composition.",
      "Lancer le cycle de phase A à 85°C.",
      "Lancer le cycle de phase B à 70°C."
    ],
    benefits: ["Réduction de l'anxiété", "Facilite l'endormissement", "Sommeil profond"],
    image: "/src/assets/images/infusion_sommeil_profond_1788380074862.jpg",
    category: "Infusion",
    sachetA: {
      composition: ["5g de Valériane (racines)"],
      solvant: "Eau purifiée (300ml)",
      temp: "85°C",
      duration: "15 min"
    },
    sachetB: {
      composition: ["3g de Passiflore", "2g de Mélisse"],
      solvant: "Eau purifiée (déjà présente)",
      temp: "70°C",
      duration: "10 min"
    },
    extractionOrder: "Phase A (racines dures) puis Phase B (feuilles fragiles)",
    administration: {
      mode: "Par voie orale, en infusion chaude.",
      dailyDose: "1 tasse (300ml)",
      maxDose: "2 tasses par jour",
      frequency: "Une fois par jour",
      timing: "30 minutes avant le coucher",
      usageDuration: "En cure de 21 jours maximum."
    },
    precautions: ["Ne pas conduire après consommation.", "Éviter l'association avec d'autres sédatifs."],
    contraindications: ["Grossesse et allaitement", "Enfants de moins de 12 ans"],
    safetyMessage: "Respectez toujours les températures pour éviter de brûler les actifs volatils.",
    bloomNote: "Le séquençage permet d'extraire les valépotriates de la racine sans détruire l'acide rosmarinique de la mélisse."
  },
  {
    id: '02',
    title: "Huile de Massage Articulaire",
    description: "Une huile de soin concentrée pour soulager les tensions et l'inflammation par extraction liposoluble.",
    ingredients: ["Huile végétale d'Arnica (100ml)", "Fleurs d'Hélichryse italienne (10g)"],
    instructions: [
      "Préparez la phase A avec l'huile.",
      "Ajoutez les fleurs en phase B."
    ],
    benefits: ["Anti-inflammatoire", "Décongestionnant", "Souplesse articulaire"],
    image: "/src/assets/images/huile_massage_articulaire_1788380088150.jpg",
    category: "Huile de soin",
    sachetA: {
      composition: ["Huile végétale d'Arnica (100ml)"],
      solvant: "Huile végétale d'Arnica",
      temp: "45°C",
      duration: "30 min"
    },
    sachetB: {
      composition: ["10g de Fleurs d'Hélichryse italienne"],
      solvant: "Huile végétale (déjà présente)",
      temp: "42°C",
      duration: "45 min"
    },
    extractionOrder: "Chauffe douce du solvant puis macération des fleurs",
    administration: {
      mode: "Application cutanée locale en massages circulaires.",
      dailyDose: "3 à 5 pressions",
      maxDose: "10 pressions par jour",
      frequency: "2 à 3 fois par jour",
      timing: "Matin et soir, ou après l'effort",
      usageDuration: "Utilisation prolongée possible."
    },
    precautions: ["Ne pas appliquer sur les plaies ouvertes.", "Usage externe uniquement."],
    contraindications: ["Allergie aux Astéracées", "Enfants de moins de 3 ans"],
    safetyMessage: "Testez toujours sur une petite zone du coude avant utilisation étendue.",
    bloomNote: "La basse température préserve l'intégrité des acides gras essentiels de l'Arnica."
  },
  {
    id: '03',
    title: "Sérum Visage Éclat Botanique",
    description: "Un sérum précieux régénérant, conçu pour une pénétration cutanée optimale des actifs végétaux.",
    ingredients: ["Huile de Jojoba", "Fleurs de Rose de Damas"],
    instructions: ["Phase A : Jojoba", "Phase B : Rose"],
    benefits: ["Régénérant", "Antioxydant", "Éclat du teint"],
    image: "/src/assets/images/serum_visage_eclat_1788380103773.jpg",
    category: "Sérum",
    sachetA: {
      composition: ["Huile de Jojoba (50ml)"],
      solvant: "Huile de Jojoba",
      temp: "35°C",
      duration: "20 min"
    },
    sachetB: {
      composition: ["5g de Pétales de Rose de Damas"],
      solvant: "Huile de Jojoba",
      temp: "35°C",
      duration: "60 min"
    },
    extractionOrder: "Phase unique à température constante",
    administration: {
      mode: "Appliquer 3 gouttes sur le visage propre.",
      dailyDose: "3 gouttes",
      maxDose: "6 gouttes par jour",
      frequency: "Matin et/ou soir",
      timing: "Avant votre crème habituelle",
      usageDuration: "Usage quotidien recommandé."
    },
    precautions: ["Usage externe uniquement.", "Éviter le contact direct avec les yeux."],
    contraindications: ["Aucune connue aux doses recommandées"],
    safetyMessage: "Conserver à l'abri de la lumière et de la chaleur.",
    bloomNote: "L'agitation 'vague douce' mime le mouvement naturel pour une extraction moléculaire optimale."
  },
  {
    id: '04',
    title: "Baume à Lèvres au Calendula",
    description: "Un baume protecteur et réparateur utilisant l'extraction par fusion contrôlée.",
    ingredients: ["Cire d'abeille", "Beurre de Karité", "Fleurs de Calendula"],
    instructions: ["Fusionner phase A", "Extraire phase B"],
    benefits: ["Réparateur", "Protecteur", "Apaisant"],
    image: "/src/assets/images/baume_levres_calendula_1788380119108.jpg",
    category: "Baume",
    sachetA: {
      composition: ["20g de Cire d'abeille", "30g de Beurre de Karité"],
      solvant: "Fusion lipidique",
      temp: "65°C",
      duration: "15 min"
    },
    sachetB: {
      composition: ["5g de Fleurs de Calendula"],
      solvant: "Base lipidique (déjà présente)",
      temp: "45°C",
      duration: "20 min"
    },
    extractionOrder: "Fusion des cires puis extraction des fleurs",
    administration: {
      mode: "Application locale sur les lèvres.",
      dailyDose: "À volonté",
      maxDose: "Pas de dose maximale stricte",
      frequency: "Plusieurs fois par jour",
      timing: "Dès que le besoin se fait sentir",
      usageDuration: "Usage quotidien."
    },
    precautions: ["Usage externe uniquement."],
    contraindications: ["Allergie aux produits de la ruche"],
    safetyMessage: "Le baume durcit en refroidissant.",
    bloomNote: "Le contrôle thermique empêche la dégradation des caroténoïdes du Calendula."
  },
  {
    id: '05',
    title: "Teinture de Propolis Maison",
    description: "Un concentré protecteur issu d'une extraction hydro-alcoolique assistée par vortex.",
    ingredients: ["Propolis brute", "Alcool à 70°"],
    instructions: ["Extraction vortex phase A"],
    benefits: ["Antibactérien", "Immunostimulant", "Antiseptique"],
    image: "/src/assets/images/teinture_propolis_1788380133082.jpg",
    category: "Teinture",
    sachetA: {
      composition: ["20g de Propolis brute broyée"],
      solvant: "Alcool à 70° (100ml)",
      temp: "Température ambiante",
      duration: "14 jours"
    },
    sachetB: {
      composition: ["Aucun"],
      solvant: "N/A",
      temp: "N/A",
      duration: "N/A"
    },
    extractionOrder: "Macération longue avec agitation vortex",
    administration: {
      mode: "Quelques gouttes dans de l'eau ou du miel.",
      dailyDose: "5 à 10 gouttes",
      maxDose: "15 gouttes par jour",
      frequency: "1 à 3 fois par jour",
      timing: "De préférence entre les repas",
      usageDuration: "Cure de 10 jours recommandée."
    },
    precautions: ["Contient de l'alcool.", "Tache les vêtements."],
    contraindications: ["Grossesse et allaitement", "Allergie aux produits de la ruche"],
    safetyMessage: "La propolis est un produit très actif, respectez les doses.",
    bloomNote: "L'agitation vortex du BloomLab divise par 3 le temps d'extraction traditionnel."
  },
  {
    id: '06',
    title: "Sirop de Sureau Immunité",
    description: "Un remède d'hiver traditionnel optimisé par une décoction basse température.",
    ingredients: ["Baies de sureau séchées", "Gingembre frais", "Miel bio"],
    instructions: ["Décoction phase A", "Ajout miel phase B"],
    benefits: ["Antiviral", "Riche en antioxydants", "Renforce l'immunité"],
    image: "/src/assets/images/sirop_sureau_immunite_1788380146573.jpg",
    category: "Sirop",
    sachetA: {
      composition: ["30g de Baies de sureau", "10g de Gingembre"],
      solvant: "Eau (250ml)",
      temp: "90°C",
      duration: "25 min"
    },
    sachetB: {
      composition: ["50g de Miel bio"],
      solvant: "Sirop chaud",
      temp: "40°C",
      duration: "5 min"
    },
    extractionOrder: "Décoction puis mélange tiède",
    administration: {
      mode: "Une cuillère à soupe pure ou diluée.",
      dailyDose: "1 cuillère à soupe",
      maxDose: "3 cuillères par jour",
      frequency: "Matin et soir",
      timing: "Pendant les repas",
      usageDuration: "Cure de 7 jours."
    },
    precautions: ["Contient beaucoup de sucre."],
    contraindications: ["Diabète non équilibré", "Nourrissons"],
    safetyMessage: "Ne pas faire bouillir le miel.",
    bloomNote: "La basse température préserve les anthocyanes antivirales."
  },
  {
    id: '07',
    title: "Décoction Détox & Soutien Hépatique",
    description: "Une préparation traditionnelle de plantes amères pour accompagner le travail hépato-biliaire et la légèreté digestive (Terrain T4).",
    ingredients: ["Artichaut (feuilles)", "Romarin (sommités)", "Radis Noir (racine)"],
    instructions: [
      "Placer les racines de radis noir et les feuilles d'artichaut en phase A.",
      "Ajouter les sommités fleuries de romarin en phase B pour préserver les arômes volatils."
    ],
    benefits: ["Soutien du confort biliaire", "Amertume digestive tonifiante", "Accompagnement des changements de saison"],
    image: "/src/assets/images/hepatic_balance_liver_1785755318947.jpg",
    category: "Décoction",
    sachetA: {
      composition: ["5g de Feuilles d'Artichaut", "5g de Racine de Radis Noir séchée"],
      solvant: "Eau purifiée (350ml)",
      temp: "90°C",
      duration: "15 min"
    },
    sachetB: {
      composition: ["3g de Romarin sommités fleuries"],
      solvant: "Eau (déjà présente)",
      temp: "75°C",
      duration: "10 min"
    },
    extractionOrder: "Décoction des amers coriaces puis infusion douce du romarin",
    administration: {
      mode: "Par voie orale, tiède avant ou après le repas principal.",
      dailyDose: "1 tasse (250ml)",
      maxDose: "2 tasses par jour",
      frequency: "1 à 2 fois par jour",
      timing: "Avant le déjeuner ou après un repas riche",
      usageDuration: "En cure de 14 jours aux intersaisons."
    },
    precautions: ["Saveur très amère caractéristique.", "Bien s'hydrater tout au long de la journée."],
    contraindications: ["Obstruction des voies biliaires", "Calculs biliaires avérés sans avis médical", "Grossesse"],
    safetyMessage: "Respecter la durée de la cure.",
    bloomNote: "Le romarin tempère la saveur amère de la cynarine tout en apportant l'acide rosmarinique protecteur."
  },
  {
    id: '08',
    title: "Élixir Régulateur Métabolique",
    description: "Synergie végétale aux graines de fenugrec et écorce d'épine-vinette pour accompagner l'équilibre métabolique et le rythme du quotidien (Terrain T5).",
    ingredients: ["Épine-vinette (écorce de racine)", "Fenugrec (graines)", "Gingembre frais"],
    instructions: [
      "Préparer la décoction douce des graines concassées de fenugrec.",
      "Extraire les principes amers et les alcaloïdes d'épine-vinette à température contrôlée."
    ],
    benefits: ["Soutien du métabolisme glucidique", "Tonus digestif", "Régularité du rythme alimentaire"],
    image: "/src/assets/images/blood_purity_lymphatic_1785755331143.jpg",
    category: "Élixir",
    sachetA: {
      composition: ["4g de Graines de Fenugrec concassées", "3g d'Écorce d'Épine-vinette"],
      solvant: "Eau purifiée (300ml)",
      temp: "85°C",
      duration: "20 min"
    },
    sachetB: {
      composition: ["2g de Gingembre en fines lamelles"],
      solvant: "Eau (déjà présente)",
      temp: "70°C",
      duration: "10 min"
    },
    extractionOrder: "Extraction chaude des principes denses puis dynamisation au gingembre",
    administration: {
      mode: "Par voie orale, 15 minutes avant le repas.",
      dailyDose: "1 petite tasse (150ml)",
      maxDose: "2 prises par jour",
      frequency: "1 à 2 fois par jour",
      timing: "Avant le déjeuner ou le dîner",
      usageDuration: "Cure de 21 jours."
    },
    precautions: ["Ne dispense pas d'une alimentation équilibrée et d'activité physique réguliere."],
    contraindications: ["Grossesse", "Traitement antidiabétique lourd sans concertation médicale"],
    safetyMessage: "Ne pas dépasser la dose recommandée.",
    bloomNote: "Les mucilages du fenugrec ralentissent l'absorption tandis que la berbérine soutient la sensibilité cellulaire."
  },
  {
    id: '09',
    title: "Infusion Drainage & Élimination",
    description: "Formule drainante aux sommités de reine des prés et racines de pissenlit pour accompagner les fonctions d'élimination de l'eau et des émonctoires (Terrain T6).",
    ingredients: ["Pissenlit (feuilles et racines)", "Reine des prés (sommités)", "Prêle des champs"],
    instructions: [
      "Extraction des racines de pissenlit et tiges de prêle en phase A.",
      "Infusion courte de la reine des prés en phase B pour protéger les dérivés salicylés."
    ],
    benefits: ["Favorise l'élimination rénale de l'eau", "Reminéralisation douce grâce à la prêle", "Légèreté corporelle"],
    image: "/src/assets/images/emonctoires_natural_drainage_1785755307026.jpg",
    category: "Infusion",
    sachetA: {
      composition: ["4g de Pissenlit racines", "3g de Prêle des champs"],
      solvant: "Eau purifiée (400ml)",
      temp: "90°C",
      duration: "15 min"
    },
    sachetB: {
      composition: ["4g de Sommités de Reine des prés"],
      solvant: "Eau (déjà présente)",
      temp: "75°C",
      duration: "8 min"
    },
    extractionOrder: "Décoction minérale puis infusion douce fleuri",
    administration: {
      mode: "À boire tout au long de la matinée.",
      dailyDose: "1 grande tasse ou gourde (400ml)",
      maxDose: "500ml par jour",
      frequency: "Le matin et en début d'après-midi",
      timing: "Entre les repas",
      usageDuration: "Cure de 10 à 15 jours."
    },
    precautions: ["Veiller à boire suffisamment d'eau pure en complément."],
    contraindications: ["Allergie aux dérivés salicylés (aspirine)", "Insuffisance rénale sévère", "Femmes enceintes"],
    safetyMessage: "Ne pas consommer en soirée pour préserver le repos nocturne.",
    bloomNote: "L'association de la prêle permet de compenser les pertes minérales naturelles dues à l'élimination hydrique."
  },
  {
    id: '10',
    title: "Remède Psoriasis — Émonctoires & Régulation Épidermique",
    description: "Extraction séquentielle de Bardane, Pensée Sauvage et Mahonia ciblant la régulation kératinocytaire et le drainage hépato-cutané.",
    ingredients: ["Racine de Bardane (30g)", "Pensée Sauvage (25g)", "Écorce de Mahonia (20g)"],
    instructions: [
      "Phase A : Extraction hydroglycérinée de la Bardane et de la Pensée Sauvage à 75°C pendant 2h00.",
      "Vérification de la descente de température de la cuve sous 45°C.",
      "Phase B : Ajout du Mahonia et de l'alcool bio 96° à 50°C pendant 2h30.",
      "Filtration et pressage à l'étamine de lin pour recueillir la fraction de cœur riche en berbérine."
    ],
    benefits: ["Régulation du renouvellement des kératinocytes", "Soutien du drainage émonctoriel hépato-rénal", "Apaisement des plaques squameuses"],
    image: "/src/assets/images/natural_remedies_cleaned_1786616831671.jpg",
    category: "Extrait liquide",
    plant: { name: "Bardane & Mahonia" },
    goal: "Plaques squameuses, hyperprolifération kératinocytaire et surcharge hépato-cutanée",
    sachetA: {
      composition: ["30g Racine de Bardane", "25g Pensée Sauvage"],
      solvant: "Eau distillée + Glycérine végétale (500ml, 70/30)",
      temp: "75°C",
      duration: "2h00"
    },
    sachetB: {
      composition: ["20g Écorce de Mahonia concassée"],
      solvant: "Alcool de grain bio 96° (250ml)",
      temp: "50°C",
      duration: "2h30"
    },
    extractionOrder: "Phase A hydroglycérinée (inuline et mucilages) puis Phase B hydroalcoolique tiède (berbérine)",
    administration: {
      mode: "Voie orale, dilué dans 100ml d'eau tiède.",
      dailyDose: "10ml par jour (2 prises de 5ml)",
      maxDose: "10ml par jour",
      frequency: "2 fois par jour",
      timing: "15 min avant le petit-déjeuner et 15 min avant le dîner",
      usageDuration: "Cure de 60 jours avec pause de 10 jours."
    },
    precautions: ["Ne se substitue pas à un traitement dermatologique médical.", "Éviter les savons décapants."],
    contraindications: ["Grossesse et allaitement", "Enfants de moins de 12 ans", "Lithiase biliaire symptomatique"],
    safetyMessage: "Respecter scrupuleusement le refroidissement sous 45°C avant introduction de l'alcool.",
    bloomNote: "Le Mahonia bloque la voie Th17 et la lipoxygénase tandis que la bardane soutient l'axe intestin-peau."
  },
  {
    id: '11',
    title: "Remède Eczéma — Désamorçage Histaminique & Barrière",
    description: "Formule protectrice thermo-régulée combinant Plantain, Camomille Matricaire et Fumeterre pour calmer le prurit et restaurer la matrice cutanée.",
    ingredients: ["Feuilles de Plantain lancéolé (25g)", "Capitules de Camomille Matricaire (25g)", "Fumeterre fleurie (25g)"],
    instructions: [
      "Phase A : Extraction douce de l'aucuboside du Plantain et de l'apigénine de Camomille à 68°C pendant 1h45.",
      "Contrôle de refroidissement sous 40°C.",
      "Phase B : Captation étanche des sesquiterpènes volatils (chamazulène) et protopine de Fumeterre à 48°C pendant 2h30.",
      "Pressage doux sans broyer les tiges."
    ],
    benefits: ["Action anti-prurigineuse immédiate", "Stabilisation des mastocytes cutanés", "Réparation du film hydrolipidique"],
    image: "/src/assets/images/herbs_close_up_cleaned_1786616800877.jpg",
    category: "Extrait liquide",
    plant: { name: "Plantain & Camomille" },
    goal: "Dermatite atopique, réactivité cutanée, prurit intense et déficience de la barrière épidermique",
    sachetA: {
      composition: ["25g Plantain lancéolé", "15g Camomille matricaire"],
      solvant: "Eau distillée + Glycérine végétale bio (500ml, 65/35)",
      temp: "68°C",
      duration: "1h45"
    },
    sachetB: {
      composition: ["10g Camomille matricaire (terpènes)", "25g Fumeterre"],
      solvant: "Alcool de grain bio 96° (250ml)",
      temp: "48°C",
      duration: "2h30"
    },
    extractionOrder: "Phase A hydroglycérinée sous 70°C puis Phase B hydroalcoolique en cuve étanche",
    administration: {
      mode: "Voie orale exclusive.",
      dailyDose: "8ml par jour (2 prises de 4ml)",
      maxDose: "8ml par jour",
      frequency: "2 fois par jour",
      timing: "Le matin à jeun et à 17h00 (chronobiologie de la chute du cortisol)",
      usageDuration: "Cure de 45 jours continus."
    },
    precautions: ["Ne jamais appliquer l'extrait hydroalcoolique pur sur peau écorchée ou suintante."],
    contraindications: ["Grossesse et allaitement", "Allergie connue aux Astéracées", "Calculs biliaires aigus"],
    safetyMessage: "Privilégier des douches tièdes (<34°C) pour ne pas dissoudre le ciment céramidique épidermique.",
    bloomNote: "La prise de 17h00 neutralise le pic circadien de libération d'histamine avant la crise de grattage du soir."
  },
  {
    id: '12',
    title: "Remède Alopécie — Anti-DHT & Matrice Folliculaire",
    description: "Extraction lipophile et hydrosoluble de Palmier Nain, Racine d'Ortie et Ginkgo pour inhiber la 5-alpha-réductase et relancer la microcirculation capillaire.",
    ingredients: ["Baies de Palmier Nain / Saw Palmetto (30g)", "Racine d'Ortie concassée (25g)", "Feuilles de Ginkgo Biloba (20g)"],
    instructions: [
      "Phase A : Extraction des lectines UDA et silice biodisponible d'ortie et polyphénols de Ginkgo à 72°C pendant 2h00.",
      "Phase B : Extraction lipophile sous vortex des acides gras libres et phytostérols de Palmier Nain à 52°C pendant 3h00.",
      "Conditionnement bimodal : flacon compte-gouttes (oral) et flacon spray (lotion cuir chevelu)."
    ],
    benefits: ["Inhibition ciblée de la 5-alpha-réductase", "Vasodilatation du plexus capillaire dermique", "Freinage de la miniaturisation du bulbe pileux"],
    image: "/src/assets/images/lifestyle_botanik_cleaned_1786616810137.jpg",
    category: "Extrait double action",
    plant: { name: "Palmier Nain & Ortie" },
    goal: "Alopécie androgénétique, excès de DHT, fibrose du bulbe et perte de densité capillaire",
    sachetA: {
      composition: ["25g Racine d'Ortie", "20g Feuilles de Ginkgo"],
      solvant: "Eau distillée + Glycérine végétale (450ml, 70/30)",
      temp: "72°C",
      duration: "2h00"
    },
    sachetB: {
      composition: ["30g Baies de Palmier Nain (Saw Palmetto) concassées"],
      solvant: "Alcool de grain bio 96° (300ml)",
      temp: "52°C",
      duration: "3h00"
    },
    extractionOrder: "Phase A pour silice et flavonoïdes, puis Phase B alcoolique pour phytostérols lipophiles",
    administration: {
      mode: "Double voie : orale le matin (5ml) et topique en lotion cuir chevelu le soir (8 pulvérisations).",
      dailyDose: "5ml par voie orale + 8 pulvérisations topiques 3x/semaine",
      maxDose: "5ml par voie orale",
      frequency: "Quotidien le matin (oral), 3 fois par semaine le soir (lotion)",
      timing: "Matin au petit-déjeuner (oral) et soir avant le coucher (topique)",
      usageDuration: "Cure de 90 jours continus (cycle anagène complet du cheveu)."
    },
    precautions: ["Consulter en cas de prise simultanée d'anticoagulants (Ginkgo Biloba)."],
    contraindications: ["Grossesse et allaitement", "Femmes enceintes (foetus masculin)", "Moins de 18 ans", "Antécédents hormonodépendants"],
    safetyMessage: "Le massage du cuir chevelu de 3 minutes le soir amplifie la pénétration folliculaire des actifs.",
    bloomNote: "Le Palmier Nain mime l'action du finastéride de manière douce et naturelle sans blocage hormonal systémique agressif."
  }
];

export const pathologyRemediesJson = [
  // Accessible from the dedicated database file /src/data/recettes_remedes_pathologies.json
];

export const herbariumRecipes: Recipe[] = discoveryRecipes.map(r => ({
  ...r,
  plant: { name: r.plant?.name || r.title.split(' ').pop() || 'Plante' },
  goal: r.goal || r.description
}));

