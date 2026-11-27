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
    description: "Une huile botanique aromatique d'Arnica et d'Hélichryse préparée par extraction liposoluble douce pour le massage externe.",
    ingredients: ["Huile végétale d'Arnica (100ml)", "Fleurs d'Hélichryse italienne (10g)"],
    instructions: [
      "Préparez la phase A avec l'huile.",
      "Ajoutez les fleurs en phase B."
    ],
    benefits: ["Usage externe en massage aromatique", "Extraction liposoluble douce", "Texture fluide de glisse"],
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
    description: "Un sérum huileux précieux à la rose de Damas et au jojoba, conçu pour un rituel cosmétique d'éclat et de douceur.",
    ingredients: ["Huile de Jojoba", "Fleurs de Rose de Damas"],
    instructions: ["Phase A : Jojoba", "Phase B : Rose"],
    benefits: ["Soin cosmétique quotidien", "Profil riche en lipides végétaux", "Éclat du teint"],
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
    description: "Un baume cosmétique protecteur au calendula utilisant l'extraction par fusion contrôlée.",
    ingredients: ["Cire d'abeille", "Beurre de Karité", "Fleurs de Calendula"],
    instructions: ["Fusionner phase A", "Extraire phase B"],
    benefits: ["Confort cosmétique des lèvres", "Film lipidique protecteur", "Texture fondante douce"],
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
    description: "Une teinture concentrée des résines et flavonoïdes de la propolis brute dans de l'alcool à 90°–96° (sans ajout d'eau) via le programme Tincture de la BloomLab® réglé manuellement à 45 °C (ou en bocal hermétique hors appareil, ou base glycérinée sans alcool).",
    ingredients: ["Propolis brute (20g)", "Alcool éthylique alimentaire bio 90°–96° (150ml, sans eau)"],
    instructions: [
      "Congeler brièvement la propolis brute puis la concasser grossièrement.",
      "Placer la propolis et 150 ml d'alcool 90°–96° (sans eau) dans la cuve propre et sèche (entre MIN et MAX ; pièce ventilée, aucune flamme).",
      "Verrouiller le couvercle et lancer le programme Tincture (défaut 71 °C / 160 °F – 4 h, modifiable manuellement via TEMP/TIME à 45 °C pendant 2h30 pour ménager la fraction aromatique), ou réaliser la macération en bocal hermétique hors appareil.",
      "Filtrer à froid à travers un filtre fin (la cire reste sur le filtre) et embouteiller en flacon ambré."
    ],
    benefits: ["Concentration en flavonoïdes résineux", "Préservation aromatique de la fraction brute", "Solubilisation complète des cires et résines"],
    image: "/images/recettes/teinture-propolis-maison.jpg",
    category: "Teinture-mère",
    architectures: ["SRA", "HPA"],
    terrains: ["T3 (Protection saisonnière)", "T1 (Sphère digestive)"],
    axes: ["A2 (Équilibre des muqueuses)", "A4 (Réponse oxydative)"],
    sachetA: {
      composition: ["20g de Propolis brute concassée"],
      solvant: "Alcool éthylique bio 90°–96° (150ml, sans ajout d'eau)",
      temp: "45°C (Tincture réglé manuellement) ou défaut 71°C",
      duration: "2h30 (ou 4h par défaut)"
    },
    sachetB: {
      composition: ["Aucun"],
      solvant: "N/A",
      temp: "N/A",
      duration: "N/A"
    },
    extractionOrder: "Cycle unique anhydre (alcool fort ≥ 75 % vol., sans eau) via programme Tincture (71 °C / 4 h par défaut, réglable manuellement à 45 °C / 2h30) ou macération en bocal hermétique hors appareil",
    administration: {
      mode: "Quelques gouttes diluées dans de l'eau, une tisane tiède ou du miel.",
      dailyDose: "5 à 10 gouttes",
      maxDose: "15 gouttes par jour",
      frequency: "1 à 3 fois par jour",
      timing: "De préférence entre les repas",
      usageDuration: "Usage ponctuel jusqu'à 10 jours."
    },
    precautions: [
      "Ne jamais laisser l'appareil sans surveillance en fonctionnement ni lorsqu'il est branché.",
      "Vapeurs hautement inflammables (point d'éclair de l'éthanol pur : 13 °C ; la pression de vapeur augmente avec la chaleur) : préparer impérativement en pièce très bien ventilée, loin de toute flamme ou étincelle, couvercle verrouillé et entre les repères MIN et MAX (ne pas ajouter d'eau ni de lécithine en cycle Tincture).",
      "Option sans alcool disponible en glycérine végétale bio 80/20 (45 °C / 2h30).",
      "La propolis tache durablement les vêtements et la cuve (nettoyer avec un peu d'alcool fort puis programme Nettoyage)."
    ],
    contraindications: ["Grossesse et allaitement", "Enfants", "Sensibilité ou sevrage alcoolique", "Allergie aux produits de la ruche"],
    safetyMessage: "La propolis est un concentré résineux puissant : respecter les doses et les consignes de sécurité liées à l'alcool (vapeurs inflammables dès 13 °C).",
    bloomNote: "Les résines cireuses de la propolis exigent un alcool de 90° à 96° (sans eau ajoutée) pour se solubiliser pleinement, adapté au programme Tincture (71 °C / 4 h par défaut, réglable manuellement en TEMP/TIME) en milieu ventilé sans flamme et sous surveillance, ou en bocal hermétique / glycérine."
  },
  {
    id: '06',
    title: "Sirop de Sureau Immunité",
    description: "Une recette d'hiver traditionnelle aux baies de sureau, gingembre et miel, préparée par décoction douce.",
    ingredients: ["Baies de sureau séchées", "Gingembre frais", "Miel bio"],
    instructions: ["Décoction phase A", "Ajout miel phase B"],
    benefits: ["Préparation hivernale traditionnelle", "Riche en pigments anthocyanes", "Saveur épicée et miellée"],
    image: "/images/recettes/sirop-sureau-immunite.jpg",
    category: "Sirop",
    architectures: ["SRA"],
    terrains: ["T3 (Saison froide)", "T2 (Tonus quotidien)"],
    axes: ["A4 (Équilibre oxydatif)", "A5 (Vitalité générale)"],
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
      usageDuration: "Usage ponctuel de 7 jours."
    },
    precautions: ["Contient beaucoup de sucre."],
    contraindications: ["Diabète non équilibré", "Nourrissons"],
    safetyMessage: "Ne pas faire bouillir le miel.",
    bloomNote: "La température maîtrisée préserve l'intégrité des anthocyanes et les arômes du miel."
  },
  {
    id: '07',
    title: "Décoction d'Herboristerie aux Plantes Amères",
    description: "Une préparation traditionnelle de plantes amères (artichaut, romarin, radis noir) inspirée des usages culinaires et d'herboristerie de saison.",
    ingredients: ["Artichaut (feuilles)", "Romarin (sommités)", "Radis Noir (racine)"],
    instructions: [
      "Placer les racines de radis noir et les feuilles d'artichaut en phase A.",
      "Ajouter les sommités fleuries de romarin en phase B pour préserver les arômes volatils."
    ],
    benefits: ["Plantes amères de tradition", "Amertume aromatique caractéristique", "Rituel culinaire aux changements de saison"],
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
    title: "Élixir Traditionnel Fenugrec & Épine-Vinette",
    description: "Préparation botanique traditionnelle aux graines de fenugrec et écorce d'épine-vinette étudiée pour son profil alcaloïdique et mucilagineux (contenu éducatif).",
    ingredients: ["Épine-vinette (écorce de racine)", "Fenugrec (graines)", "Gingembre frais"],
    instructions: [
      "Préparer la décoction douce des graines concassées de fenugrec.",
      "Extraire les principes amers d'épine-vinette à température contrôlée."
    ],
    benefits: ["Profil riche en mucilages et principes amers", "Note épicée au gingembre", "Préparation botanique d'étude"],
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
    title: "Infusion Traditionnelle Pissenlit, Prêle & Reine des Prés",
    description: "Infusion végétale traditionnelle associant sommités de reine des prés, prêle et racines de pissenlit.",
    ingredients: ["Pissenlit (feuilles et racines)", "Reine des prés (sommités)", "Prêle des champs"],
    instructions: [
      "Extraction des racines de pissenlit et tiges de prêle en phase A.",
      "Infusion courte de la reine des prés en phase B pour protéger les composés aromatiques."
    ],
    benefits: ["Association botanique traditionnelle de printemps", "Apport végétal en silice de prêle", "Profil herbacé frais"],
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
    title: "Atelier Botanique — Bardane, Pensée Sauvage & Mahonia",
    description: "Séquence pédagogique d'extraction séquentielle (Bardane, Pensée Sauvage et Mahonia) illustrant la séparation des phases hydroglycérinée et hydroalcoolique.",
    ingredients: ["Racine de Bardane (30g)", "Pensée Sauvage (25g)", "Écorce de Mahonia (20g)"],
    instructions: [
      "Phase A : Extraction hydroglycérinée de la Bardane et de la Pensée Sauvage à 75°C pendant 2h00 dans BloomLab® (sous surveillance). Filtrer et réserver l'extrait A.",
      "Transition obligatoire : Vider, rincer (programme Nettoyage 5 min) et sécher intégralement la cuve.",
      "Phase B : Macération hydro-alcoolique à 70° (dilution contenant de l'eau) du Mahonia en bocal en verre hermétique hors appareil à l'abri de la lumière (ne pas chauffer une dilution à l'eau en mode Tincture ; alternatif ≥ 75 % vol. sans eau possible en mode Tincture sous surveillance).",
      "Filtrer, presser le marc et réunir les fractions A et B hors appareil en flacons ambrés."
    ],
    benefits: ["Étude séquentielle inuline / alcaloïdes", "Séparation des polarités végétales", "Contenu éducatif non thérapeutique"],
    image: "/images/recettes/remede-psoriasis-emonctoires-regulation.jpg",
    category: "Extrait liquide",
    plant: { name: "Bardane & Mahonia" },
    goal: "Étude d'herboristerie sur la double polarité des racines amères et écorces",
    architectures: ["SRA", "Fascia", "HPA"],
    terrains: ["T6 (Terrain cutané)", "T4 (Sphère hépato-biliaire)", "T1 (Sphère digestive)"],
    axes: ["A1 (Équilibre cutané)", "A2 (Équilibre muqueux)", "A4 (Réponse oxydative)"],
    sachetA: {
      composition: ["30g Racine de Bardane", "25g Pensée Sauvage"],
      solvant: "Eau distillée + Glycérine végétale (500ml, 70/30)",
      temp: "75°C",
      duration: "2h00"
    },
    sachetB: {
      composition: ["20g Écorce de Mahonia concassée"],
      solvant: "Alcool alimentaire 70° en bocal hermétique hors appareil (ou option sans alcool en glycérine)",
      temp: "Bocal hermétique hors appareil",
      duration: "Macération traditionnelle hors appareil"
    },
    extractionOrder: "Phase A aqueuse/glycérinée (inuline et mucilages) en BloomLab® -> vidange & séchage complet -> Phase B hydro-alcoolique 70° en bocal hermétique hors appareil -> assemblage final",
    administration: {
      mode: "Usage pédagogique et éducatif. Pour tout usage interne, demander conseil à un professionnel de santé.",
      dailyDose: "Usage éducatif uniquement",
      maxDose: "Non applicable (fiche pédagogique)",
      frequency: "Selon protocole encadré",
      timing: "Hors repas",
      usageDuration: "À valider avec un professionnel de santé."
    },
    precautions: [
      "Fiche strictement éducative : ne constitue ni un avis médical ni un traitement d'une pathologie cutanée.",
      "Ne jamais laisser l'appareil sans surveillance en fonctionnement ni lorsqu'il est branché.",
      "Alcool inflammable dès 21 °C à 70 % (INRS) : manipuler loin de toute flamme ou étincelle en pièce très ventilée ; ne pas chauffer une dilution contenant de l'eau en mode Tincture.",
      "Éviter les savons décapants."
    ],
    contraindications: ["Grossesse et allaitement", "Enfants de moins de 12 ans", "Sensibilité à l'alcool", "Lithiase biliaire symptomatique"],
    safetyMessage: "Conserver l'extrait en flacon ambré à l'abri de la lumière et consulter un professionnel de santé avant tout usage.",
    bloomNote: "Le titre hydro-alcoolique à 70° contenant de l'eau, il se travaille en bocal en verre hermétique hors appareil (aucune chauffe en mode Tincture pour les dilutions aqueuses) après une Phase A aqueuse en BloomLab®."
  },
  {
    id: '11',
    title: "Atelier Botanique — Plantain, Camomille & Fumeterre",
    description: "Séquence pédagogique combinant Plantain, Camomille Matricaire et Fumeterre par extraction séquentielle douce.",
    ingredients: ["Feuilles de Plantain lancéolé (25g)", "Capitules de Camomille Matricaire (25g)", "Fumeterre fleurie (25g)"],
    instructions: [
      "Phase A : Extraction douce de l'aucuboside du Plantain et de l'apigénine de Camomille à 68°C pendant 1h45 dans BloomLab® (sous surveillance). Filtrer et réserver.",
      "Transition obligatoire : Vider, rincer (Nettoyage 5 min) et sécher intégralement la cuve.",
      "Phase B : Macération hydro-alcoolique à 50° (dilution contenant de l'eau) des sommités fleuries en bocal en verre hermétique hors appareil (ou option sans alcool en glycérine/huile végétale dans BloomLab®).",
      "Pressage doux sans broyer les tiges et réunion des fractions A et B."
    ],
    benefits: ["Étude phytochimique des iridoïdes et flavonoïdes", "Séparation des fractions hydrosolubles et aromatiques", "Contenu éducatif non thérapeutique"],
    image: "/images/recettes/remede-eczema-desamorcage-histaminique.jpg",
    category: "Extrait liquide",
    plant: { name: "Plantain & Camomille" },
    goal: "Étude d'herboristerie sur les plantes douces à mucilages et sesquiterpènes",
    architectures: ["HPA", "SEC", "Fascia"],
    terrains: ["T7 (Équilibre nerveux)", "T3 (Terrain sensible)", "T6 (Terrain cutané)"],
    axes: ["A3 (Équilibre émotionnel)", "A4 (Réponse oxydative)", "A8 (Système endocannabinoïde)"],
    sachetA: {
      composition: ["25g Plantain lancéolé", "15g Camomille matricaire"],
      solvant: "Eau distillée + Glycérine végétale bio (500ml, 65/35)",
      temp: "68°C",
      duration: "1h45"
    },
    sachetB: {
      composition: ["10g Camomille matricaire (terpènes)", "25g Fumeterre"],
      solvant: "Alcool alimentaire 50° en bocal hermétique hors appareil (ou option sans alcool glycérine/huile)",
      temp: "Bocal hermétique hors appareil",
      duration: "Macération traditionnelle hors appareil"
    },
    extractionOrder: "Phase A hydroglycérinée sous 70°C en BloomLab® -> vidange & séchage complet -> Phase B hydro-alcoolique 50° en bocal hermétique hors appareil -> assemblage",
    administration: {
      mode: "Usage pédagogique et éducatif. Pour tout usage, consulter un professionnel de santé.",
      dailyDose: "Usage éducatif uniquement",
      maxDose: "Non applicable (fiche pédagogique)",
      frequency: "Selon avis qualifié",
      timing: "Hors repas",
      usageDuration: "À valider avec un professionnel de santé."
    },
    precautions: [
      "Fiche strictement éducative : ne constitue ni un avis médical ni un traitement d'une affection cutanée.",
      "Ne jamais laisser l'appareil sans surveillance en fonctionnement ni lorsqu'il est branché.",
      "Alcool inflammable dès la température ambiante (point d'éclair ~21–24 °C entre 50° et 70°, INRS) : manipuler en pièce très ventilée loin de toute flamme ; ne jamais chauffer d'alcool dilué à l'eau en mode Tincture.",
      "Demander un avis médical ou dermatologique en cas de lésion cutanée suintante ou persistante."
    ],
    contraindications: ["Grossesse et allaitement", "Enfants", "Sensibilité à l'alcool", "Allergie connue aux Astéracées", "Calculs biliaires aigus"],
    safetyMessage: "Privilégier des douches tièdes (<34°C) et consulter un professionnel de santé en cas de peau sensible.",
    bloomNote: "Un titre alcoolique à 50° contenant de l'eau, la Phase B s'effectue en bocal hermétique hors appareil (ou en glycérine/huile dans BloomLab®)."
  },
  {
    id: '12',
    title: "Atelier Botanique — Palmier Nain, Ortie & Ginkgo",
    description: "Extraction lipophile et hydrosoluble de Palmier Nain, Racine d'Ortie et Ginkgo étudiant le profil en phytostérols, silice et flavonoïdes.",
    ingredients: ["Baies de Palmier Nain / Saw Palmetto (30g)", "Racine d'Ortie concassée (25g)", "Feuilles de Ginkgo Biloba (20g)"],
    instructions: [
      "Phase A : Extraction hydroglycérinée des composés hydrosolubles, de la silice d'ortie et des flavonoïdes de Ginkgo à 72°C pendant 2h00 dans BloomLab® (sous surveillance). Filtrer et réserver.",
      "Transition obligatoire : Vider, nettoyer et sécher intégralement la cuve.",
      "Phase B : Macération du Palmier Nain concassé soit à 70° en bocal hermétique hors appareil, soit dans un alcool ≥ 75 % vol. sans eau via programme Tincture (71 °C / 4 h par défaut, réglable manuellement) en pièce ventilée loin de toute flamme et sous surveillance.",
      "Conditionnement bimodal hors cuve en flacons ambrés hermétiques."
    ],
    benefits: ["Étude des phytostérols et flavonoïdes", "Extraction biphasique hydrophile / lipophile", "Apport documentaire sur le totum"],
    image: "/images/recettes/soin-alopecie-anti-dht-matrice-folliculaire.jpg",
    category: "Extrait double action",
    plant: { name: "Palmier Nain & Ortie" },
    goal: "Étude de l'extraction séquentielle des baies riches en acides gras/phytostérols et racines siliceuses",
    architectures: ["SRA", "Fascia"],
    terrains: ["T7 (Terrain hormonal/nerveux)", "T6 (Circulation périphérique)", "T2 (Vitalité)"],
    axes: ["A5 (Métabolisme cellulaire)", "A7 (Matrice extracellulaire)", "A9 (Équilibre lipidique)"],
    sachetA: {
      composition: ["25g Racine d'Ortie", "20g Feuilles de Ginkgo"],
      solvant: "Eau distillée + Glycérine végétale (450ml, 70/30)",
      temp: "72°C",
      duration: "2h00"
    },
    sachetB: {
      composition: ["30g Baies de Palmier Nain (Saw Palmetto) concassées"],
      solvant: "Alcool ≥ 75 % vol. sans eau (cycle Tincture) ou alcool 70° en bocal hermétique hors appareil (300ml)",
      temp: "71°C Tincture (≥75° sans eau) ou Bocal hermétique hors appareil (70°)",
      duration: "4h Tincture (réglable) ou macération hors appareil"
    },
    extractionOrder: "Phase A silice & flavonoïdes -> vidange & séchage complet -> Phase B soit alcool ≥75 % sans eau (Tincture) soit alcool 70° en bocal hermétique hors appareil -> assemblage",
    administration: {
      mode: "Usage pédagogique et cosmétique externe du cuir chevelu (pour tout usage interne, demander avis médical).",
      dailyDose: "Usage pédagogique uniquement",
      maxDose: "Non applicable (fiche pédagogique)",
      frequency: "Selon protocole encadré",
      timing: "Le soir en application externe",
      usageDuration: "À valider avec un professionnel de santé."
    },
    precautions: [
      "Fiche strictement éducative : ne constitue ni un avis médical ni un traitement d'une alopécie.",
      "Ne jamais laisser l'appareil sans surveillance en fonctionnement ni lorsqu'il est branché.",
      "Consulter un professionnel de santé en cas de prise simultanée d'anticoagulants (Ginkgo Biloba).",
      "Vapeurs d'alcool inflammables dès 13–21 °C (INRS) : travailler en pièce très ventilée loin de toute flamme, couvercle verrouillé et entre MIN et MAX."
    ],
    contraindications: ["Grossesse et allaitement", "Femmes en âge de procréer sans contraception", "Moins de 18 ans", "Sensibilité à l'alcool", "Antécédents hormonodépendants"],
    safetyMessage: "Respecter les précautions de sécurité sur l'alcool et consulter un professionnel de santé avant tout usage.",
    bloomNote: "Les baies de Palmier Nain étant riches en acides gras libres et phytostérols cireux, un alcool fort ≥ 75 % vol. sans eau convient au programme Tincture (ou alcool 70° en bocal hermétique hors appareil)."
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