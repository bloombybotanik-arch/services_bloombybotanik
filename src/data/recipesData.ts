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
  architectures?: string[];
  terrains?: string[];
  axes?: string[];
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
    description: "Un mélange aromatique traditionnel du soir (valériane, passiflore, mélisse) préparé par extraction séquentielle douce.",
    ingredients: ["Valériane (racines)", "Passiflore", "Mélisse (feuilles)"],
    instructions: [
      "Préparez vos sachets A et B selon la composition.",
      "Lancer le cycle de phase A à 85°C.",
      "Lancer le cycle de phase B à 70°C."
    ],
    benefits: ["Rituel botanique du soir", "Extraction séquentielle douce", "Profil aromatique apaisant"],
    image: "/images/recettes/infusion-sommeil-profond.jpg",
    category: "Infusion",
    architectures: ["HPA", "SEC"],
    terrains: ["T7 (Neuro-endocrinien & stress)", "T1 (Digestion & microbiome)"],
    axes: ["A3 (Axe HPA & Neuro-surrénalien)", "A6 (Système nerveux autonome & Tonus vagal)", "A8 (Système EndoCannabinoïde)"],
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
    image: "/images/recettes/huile-massage-articulaire.jpg",
    category: "Huile de soin",
    architectures: ["Fascia", "SEC"],
    terrains: ["T6 (Émonctoires & drainage)", "T7 (Neuro-endocrinien & stress)"],
    axes: ["A4 (Cascade de l'inflammation & Résolution)", "A7 (Matrice extracellulaire & Fascia)", "A8 (Système EndoCannabinoïde)"],
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
    image: "/images/recettes/serum-visage-eclat-botanique.jpg",
    category: "Sérum",
    architectures: ["Fascia", "SRA"],
    terrains: ["T6 (Émonctoires & peau)", "T2 (Énergie & vitalité)"],
    axes: ["A1 (Émonctoires & Élimination)", "A7 (Matrice extracellulaire & Fascia)"],
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
    image: "/images/recettes/baume-levres-calendula.jpg",
    category: "Baume",
    architectures: ["Fascia", "SRA"],
    terrains: ["T6 (Émonctoires & barrière cutanée)", "T3 (Immunité innée)"],
    axes: ["A2 (Barrière & Jonctions serrées)", "A4 (Cascade de l'inflammation)"],
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
    title: "Teinture Mère de Propolis Maison",
    description: "Une teinture concentrée des résines et flavonoïdes de la propolis brute dans de l'alcool à 90°–96° (sans ajout d'eau) via le programme Tincture ajusté ou Sans chauffe de la BloomLab® (ou alternative douce sans alcool sur base glycérinée).",
    ingredients: ["Propolis brute (20g)", "Alcool éthylique alimentaire bio 90°–96° (150ml, sans eau)"],
    instructions: [
      "Congeler brièvement la propolis brute puis la concasser grossièrement.",
      "Placer la propolis et 150 ml d'alcool 90°–96° (sans eau) dans la cuve propre et sèche (entre MIN et MAX ; pièce ventilée, aucune flamme).",
      "Verrouiller le couvercle et lancer le programme Tincture (défaut 71 °C / 160 °F – 4 h, modifiable manuellement à 45 °C pendant 2h30 pour ménager la fraction aromatique) ou le mode Sans chauffe (4h à 12h).",
      "Filtrer à froid à travers un filtre fin (la cire reste sur le filtre) et embouteiller en flacon ambré."
    ],
    benefits: ["Concentration en flavonoïdes résineux", "Protection antioxydante des préparations", "Solubilisation complète des cires et résines"],
    image: "/images/recettes/teinture-propolis-maison.jpg",
    category: "Teinture-mère",
    architectures: ["SRA", "HPA"],
    terrains: ["T3 (Immunité innée)", "T1 (Digestion & microbiome)"],
    axes: ["A2 (Barrière intestinale & muqueuses)", "A4 (Cascade de l'inflammation)"],
    sachetA: {
      composition: ["20g de Propolis brute concassée"],
      solvant: "Alcool éthylique bio 90°–96° (150ml, sans ajout d'eau)",
      temp: "45°C (ou défaut 71°C / Sans chauffe)",
      duration: "2h30 (ou 4h / 4h–12h)"
    },
    sachetB: {
      composition: ["Aucun"],
      solvant: "N/A",
      temp: "N/A",
      duration: "N/A"
    },
    extractionOrder: "Cycle unique anhydre (alcool fort ≥ 75 % vol., sans eau) via programme Tincture (71 °C / 4 h par défaut, réglable) ou mode Sans chauffe",
    administration: {
      mode: "Quelques gouttes diluées dans de l'eau, une tisane tiède ou du miel.",
      dailyDose: "5 à 10 gouttes",
      maxDose: "15 gouttes par jour",
      frequency: "1 à 3 fois par jour",
      timing: "De préférence entre les repas",
      usageDuration: "Cure ponctuelle de 10 jours recommandée."
    },
    precautions: [
      "Vapeurs hautement inflammables (point d'éclair de l'éthanol pur : 13 °C ; la pression de vapeur augmente avec la chaleur) : préparer impérativement en pièce très bien ventilée, loin de toute flamme ou étincelle, couvercle verrouillé et entre les repères MIN et MAX (ne pas ajouter d'eau ni de lécithine en cycle Tincture chauffé).",
      "Option sans alcool disponible en glycérine végétale bio 80/20 (45 °C / 2h30).",
      "La propolis tache durablement les vêtements et la cuve (nettoyer avec un peu d'alcool fort puis programme Nettoyage)."
    ],
    contraindications: ["Grossesse et allaitement", "Enfants", "Sensibilité ou sevrage alcoolique", "Allergie aux produits de la ruche"],
    safetyMessage: "La propolis est un concentré résineux puissant : respecter les doses et les consignes de sécurité liées à l'alcool (vapeurs inflammables dès 13 °C).",
    bloomNote: "Les résines cireuses de la propolis exigent un alcool de 90° à 96° (sans eau ajoutée) pour se solubiliser pleinement, adapté au programme Tincture (71 °C / 4 h par défaut, réglable manuellement en TEMP/TIME) en milieu ventilé sans flamme, ou au mode Sans chauffe / glycérine."
  },
  {
    id: '06',
    title: "Sirop de Sureau Immunité",
    description: "Un remède d'hiver traditionnel optimisé par une décoction basse température.",
    ingredients: ["Baies de sureau séchées", "Gingembre frais", "Miel bio"],
    instructions: ["Décoction phase A", "Ajout miel phase B"],
    benefits: ["Antiviral", "Riche en antioxydants", "Renforce l'immunité"],
    image: "/images/recettes/sirop-sureau-immunite.jpg",
    category: "Sirop",
    architectures: ["SRA"],
    terrains: ["T3 (Immunité & protection)", "T2 (Énergie & vitalité)"],
    axes: ["A4 (Cascade de l'inflammation & Résolution)", "A5 (Énergie cellulaire & Mitochondries)"],
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
    image: "/images/recettes/decoction-detox-soutien-hepatique.jpg",
    category: "Décoction",
    architectures: ["SRA", "HPA"],
    terrains: ["T4 (Détoxication hépatique)", "T6 (Émonctoires & drainage)", "T1 (Digestion & microbiome)"],
    axes: ["A1 (Émonctoires & Élimination)", "A4 (Cascade de l'inflammation)"],
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
    image: "/images/recettes/elixir-regulateur-metabolique.jpg",
    category: "Élixir",
    architectures: ["SRA", "HPA"],
    terrains: ["T5 (Métabolisme glucidique & insuline)", "T1 (Digestion & microbiome)"],
    axes: ["A9 (Flexibilité métabolique & Insuline)", "A5 (Énergie cellulaire & Mitochondries)"],
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
    image: "/images/recettes/infusion-drainage-elimination.jpg",
    category: "Infusion",
    architectures: ["SRA", "Fascia"],
    terrains: ["T6 (Émonctoires & drainage)", "T4 (Détoxication hépatique)"],
    axes: ["A1 (Émonctoires & Élimination)", "A7 (Matrice extracellulaire & Fascia)"],
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
      "Phase A : Extraction hydroglycérinée de la Bardane et de la Pensée Sauvage à 75°C pendant 2h00. Filtrer et réserver l'extrait A.",
      "Transition obligatoire : Vider, rincer (programme Nettoyage 5 min) et sécher intégralement la cuve.",
      "Phase B : Macération hydro-alcoolique à 70° (titre optimal pour alcaloïdes isoquinoléiques et lignanes) du Mahonia en mode Sans chauffe (4h à 12h) ou en bocal hermétique (sans chauffe car dilution 70° contenant de l'eau ; alternatif 75° sans eau en Tincture possible).",
      "Filtrer, presser le marc et réunir les fractions A et B hors appareil en flacons ambrés."
    ],
    benefits: ["Régulation du renouvellement des kératinocytes", "Soutien du drainage émonctoriel hépato-rénal", "Apaisement des terrains squameux"],
    image: "/images/recettes/remede-psoriasis-emonctoires-regulation.jpg",
    category: "Extrait liquide",
    plant: { name: "Bardane & Mahonia" },
    goal: "Plaques squameuses, hyperprolifération kératinocytaire et surcharge hépato-cutanée",
    architectures: ["SRA", "Fascia", "HPA"],
    terrains: ["T6 (Émonctoires & élimination)", "T4 (Détoxication hépatique)", "T1 (Digestion & microbiome)"],
    axes: ["A1 (Émonctoires & Élimination)", "A2 (Barrière intestinale & Jonctions serrées)", "A4 (Cascade de l'inflammation & Résolution)"],
    sachetA: {
      composition: ["30g Racine de Bardane", "25g Pensée Sauvage"],
      solvant: "Eau distillée + Glycérine végétale (500ml, 70/30)",
      temp: "75°C",
      duration: "2h00"
    },
    sachetB: {
      composition: ["20g Écorce de Mahonia concassée"],
      solvant: "Alcool alimentaire 70° (250ml ; option sans alcool possible en glycérine)",
      temp: "Ambiante (Sans chauffe / bocal)",
      duration: "4h à 12h (ou 14–21j bocal)"
    },
    extractionOrder: "Phase A aqueuse/glycérinée (inuline et mucilages) -> vidange & séchage complet -> Phase B hydro-alcoolique 70° (berbérine et alcaloïdes) en Sans chauffe ou bocal -> assemblage final",
    administration: {
      mode: "Voie orale, dilué dans 100ml d'eau tiède.",
      dailyDose: "10ml par jour (2 prises de 5ml)",
      maxDose: "10ml par jour",
      frequency: "2 fois par jour",
      timing: "15 min avant le petit-déjeuner et 15 min avant le dîner",
      usageDuration: "Cure de 60 jours avec pause de 10 jours."
    },
    precautions: [
      "Ne se substitue pas à un suivi dermatologique médical.",
      "Alcool inflammable dès 21 °C à 70 % (INRS) : travailler en pièce très ventilée loin de toute flamme ; ne pas chauffer une dilution contenant de l'eau en mode Tincture.",
      "Éviter les savons décapants."
    ],
    contraindications: ["Grossesse et allaitement", "Enfants de moins de 12 ans", "Sensibilité à l'alcool", "Lithiase biliaire symptomatique"],
    safetyMessage: "Respecter les dosages recommandés et conserver l'extrait en flacon ambré à l'abri de la lumière.",
    bloomNote: "Le titre hydro-alcoolique de 70° optimise la solubilisation de la berbérine et des alcaloïdes ligneux du Mahonia après une Phase A aqueuse dédiée à l'inuline de Bardane."
  },
  {
    id: '11',
    title: "Remède Eczéma — Désamorçage Histaminique & Barrière",
    description: "Formule protectrice thermo-régulée combinant Plantain, Camomille Matricaire et Fumeterre pour calmer le prurit et restaurer la matrice cutanée.",
    ingredients: ["Feuilles de Plantain lancéolé (25g)", "Capitules de Camomille Matricaire (25g)", "Fumeterre fleurie (25g)"],
    instructions: [
      "Phase A : Extraction douce de l'aucuboside du Plantain et de l'apigénine de Camomille à 68°C pendant 1h45. Filtrer et réserver.",
      "Transition obligatoire : Vider, rincer (Nettoyage 5 min) et sécher intégralement la cuve.",
      "Phase B : Captation hydro-alcoolique à 50° (degré doux adapté aux sommités fleuries et sesquiterpènes/protopine) en mode Sans chauffe (4h à 12h) ou en bocal hermétique.",
      "Pressage doux sans broyer les tiges et réunion des fractions A et B."
    ],
    benefits: ["Soutien du confort cutané", "Équilibre de la réponse histaminique", "Préservation du film hydrolipidique"],
    image: "/images/recettes/remede-eczema-desamorcage-histaminique.jpg",
    category: "Extrait liquide",
    plant: { name: "Plantain & Camomille" },
    goal: "Peaux réactives à tendance atopique, inconfort cutané et fragilité de la barrière épidermique",
    architectures: ["HPA", "SEC", "Fascia"],
    terrains: ["T7 (Neuro-endocrinien & stress)", "T3 (Immunité innée)", "T6 (Émonctoires)"],
    axes: ["A3 (Axe HPA & Neuro-surrénalien)", "A4 (Cascade de l'inflammation)", "A8 (Système EndoCannabinoïde)"],
    sachetA: {
      composition: ["25g Plantain lancéolé", "15g Camomille matricaire"],
      solvant: "Eau distillée + Glycérine végétale bio (500ml, 65/35)",
      temp: "68°C",
      duration: "1h45"
    },
    sachetB: {
      composition: ["10g Camomille matricaire (terpènes)", "25g Fumeterre"],
      solvant: "Alcool alimentaire 50° (250ml ; option sans alcool possible en glycérine/huile)",
      temp: "Ambiante (Sans chauffe / bocal)",
      duration: "4h à 12h"
    },
    extractionOrder: "Phase A hydroglycérinée sous 70°C -> vidange & séchage complet -> Phase B hydro-alcoolique 50° en Sans chauffe ou bocal pour sesquiterpènes et protopine -> assemblage",
    administration: {
      mode: "Voie orale exclusive (diluée dans un demi-verre d'eau).",
      dailyDose: "8ml par jour (2 prises de 4ml)",
      maxDose: "8ml par jour",
      frequency: "2 fois par jour",
      timing: "Le matin à jeun et à 17h00",
      usageDuration: "Cure de 45 jours continus."
    },
    precautions: [
      "Alcool inflammable dès la température ambiante (point d'éclair ~21–24 °C entre 50° et 70°, INRS) : manipuler en pièce très ventilée loin de toute flamme ; ne jamais chauffer d'alcool dilué à l'eau en mode Tincture.",
      "Demander un avis médical ou dermatologique en cas de lésion cutanée suintante ou persistante."
    ],
    contraindications: ["Grossesse et allaitement", "Enfants", "Sensibilité à l'alcool", "Allergie connue aux Astéracées", "Calculs biliaires aigus"],
    safetyMessage: "Privilégier des douches tièdes (<34°C) pour préserver le film lipidique épidermique.",
    bloomNote: "Un titre alcoolique doux de 50° respecte la délicatesse des capitules de camomille et extrait efficacement la protopine de la fumeterre sans recours à la chaleur."
  },
  {
    id: '12',
    title: "Remède Alopécie — Anti-DHT & Matrice Folliculaire",
    description: "Extraction lipophile et hydrosoluble de Palmier Nain, Racine d'Ortie et Ginkgo pour inhiber la 5-alpha-réductase et relancer la microcirculation capillaire.",
    ingredients: ["Baies de Palmier Nain / Saw Palmetto (30g)", "Racine d'Ortie concassée (25g)", "Feuilles de Ginkgo Biloba (20g)"],
    instructions: [
      "Phase A : Extraction hydroglycérinée des lectines UDA, de la silice d'ortie et des flavonoïdes de Ginkgo à 72°C pendant 2h00. Filtrer et réserver.",
      "Transition obligatoire : Vider, nettoyer et sécher intégralement la cuve.",
      "Phase B : Extraction alcoolique du Palmier Nain (Saw Palmetto) concassé — titre optimal 70° en Sans chauffe (4h à 12h) ou bocal hermétique ; ou alcool ≥ 75 % vol. sans eau via programme Tincture en pièce ventilée sans flamme.",
      "Conditionnement bimodal hors cuve : flacon compte-gouttes (oral) et flacon spray (lotion cuir chevelu)."
    ],
    benefits: ["Soutien de la vitalité du bulbe pileux", "Microcirculation du cuir chevelu", "Apport en phytostérols et silice"],
    image: "/images/recettes/soin-alopecie-anti-dht-matrice-folliculaire.jpg",
    category: "Extrait double action",
    plant: { name: "Palmier Nain & Ortie" },
    goal: "Perte de densité capillaire, microcirculation du cuir chevelu et équilibre des acides gras/stérols",
    architectures: ["SRA", "Fascia"],
    terrains: ["T7 (Neuro-endocrinien)", "T6 (Émonctoires & microcirculation)", "T2 (Énergie & vitalité)"],
    axes: ["A5 (Énergie cellulaire & Mitochondries)", "A7 (Matrice extracellulaire & Fascia)", "A9 (Flexibilité métabolique & Insuline)"],
    sachetA: {
      composition: ["25g Racine d'Ortie", "20g Feuilles de Ginkgo"],
      solvant: "Eau distillée + Glycérine végétale (450ml, 70/30)",
      temp: "72°C",
      duration: "2h00"
    },
    sachetB: {
      composition: ["30g Baies de Palmier Nain (Saw Palmetto) concassées"],
      solvant: "Alcool alimentaire 70° (ou ≥ 75 % vol. sans eau pour cycle Tincture) (300ml)",
      temp: "Ambiante (Sans chauffe) ou 71°C Tincture (≥75° sans eau)",
      duration: "4h à 12h (ou 4h Tincture)"
    },
    extractionOrder: "Phase A silice & flavonoïdes -> vidange & séchage complet -> Phase B alcoolique 70°/75° pour acides gras libres et bêta-sitostérol -> assemblage",
    administration: {
      mode: "Double voie : orale le matin (5ml dilués) et topique en lotion cuir chevelu le soir (8 pulvérisations).",
      dailyDose: "5ml par voie orale + 8 pulvérisations topiques 3x/semaine",
      maxDose: "5ml par voie orale",
      frequency: "Quotidien le matin (oral), 3 fois par semaine le soir (lotion)",
      timing: "Matin au petit-déjeuner (oral) et soir avant le coucher (topique)",
      usageDuration: "Cure de 90 jours continus."
    },
    precautions: [
      "Consulter un professionnel de santé en cas de prise simultanée d'anticoagulants (Ginkgo Biloba).",
      "Vapeurs d'alcool inflammables dès 13–21 °C (INRS) : travailler en pièce très ventilée loin de toute flamme, couvercle verrouillé et entre MIN et MAX."
    ],
    contraindications: ["Grossesse et allaitement", "Femmes en âge de procréer sans contraception", "Moins de 18 ans", "Sensibilité à l'alcool", "Antécédents hormonodépendants"],
    safetyMessage: "Le massage du cuir chevelu de 3 minutes le soir favorise la microcirculation locale.",
    bloomNote: "Les baies de Palmier Nain étant très riches en acides gras libres et phytostérols cireux, un titre alcoolique élevé (70°–75°) assure une solubilisation complète."
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