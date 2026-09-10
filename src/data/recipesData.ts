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
  }
];

export const herbariumRecipes: Recipe[] = discoveryRecipes.map(r => ({
  ...r,
  plant: { name: r.title.split(' ').pop() || 'Plante' },
  goal: r.description
}));
