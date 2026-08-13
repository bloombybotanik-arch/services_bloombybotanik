import { BookOpen, Moon, Activity, Sparkles, ChefHat, ShieldCheck, Droplets, Leaf, FlaskConical, Wind } from 'lucide-react';

export interface Recipe {
  id: string;
  title: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  benefits: string[];
  icon: any;
  category: string;
  plant?: { name: string };
  goal?: string;
}

export const discoveryRecipes: Recipe[] = [
  {
    id: '01',
    title: "Infusion Sommeil Profond",
    description: "Un mélange apaisant pour favoriser l'endormissement et un sommeil réparateur.",
    ingredients: ["Valériane", "Passiflore", "Mélisse", "Eau filtrée"],
    instructions: ["Chauffer l'eau à 85°C", "Infuser le mélange pendant 10 minutes", "Filtrer et déguster 30 minutes avant le coucher"],
    benefits: ["Réduction de l'anxiété", "Facilite l'endormissement", "Améliore la qualité du sommeil"],
    icon: Moon,
    category: "Infusion"
  },
  {
    id: '02',
    title: "Huile de Massage Articulaire",
    description: "Une huile de soin pour soulager les tensions et l'inflammation articulaire.",
    ingredients: ["Huile végétale d'Arnica", "Hélichryse italienne", "Gaulthérie", "Laurier noble"],
    instructions: ["Mélanger les huiles", "Laisser macérer au BloomLab à 40°C", "Appliquer en massage circulaire sur les zones sensibles"],
    benefits: ["Anti-inflammatoire", "Soulage la douleur", "Améliore la souplesse"],
    icon: Activity,
    category: "Huile de soin"
  },
  {
    id: '03',
    title: "Sérum Visage Éclat Botanique",
    description: "Un sérum précieux pour revitaliser la peau et redonner de l'éclat au teint.",
    ingredients: ["Huile de Jojoba", "Huile de Rose musquée", "Vitamine E", "HE de Géranium"],
    instructions: ["Extraction douce à basse température", "Mélange homogène", "Appliquer le soir sur peau propre"],
    benefits: ["Régénérant", "Antioxydant", "Éclat du teint"],
    icon: Sparkles,
    category: "Sérum"
  },
  {
    id: '04',
    title: "Baume à Lèvres au Calendula",
    description: "Un baume protecteur et réparateur pour les lèvres gercées ou sèches.",
    ingredients: ["Cire d'abeille", "Beurre de Karité", "Macérat de Calendula", "Miel de lavande"],
    instructions: ["Fondre la cire et le beurre", "Intégrer le macérat", "Couler en pots et laisser figer"],
    benefits: ["Réparateur", "Protecteur", "Apaisant"],
    icon: Droplets,
    category: "Baume"
  },
  {
    id: '05',
    title: "Teinture de Propolis Maison",
    description: "Un concentré protecteur pour renforcer les défenses naturelles.",
    ingredients: ["Propolis brute", "Alcool à 70°", "Eau de source"],
    instructions: ["Macération longue (21 jours)", "Agitation régulière", "Filtration fine"],
    benefits: ["Antibactérien", "Immunostimulant", "Antiseptique"],
    icon: FlaskConical,
    category: "Teinture"
  },
  {
    id: '06',
    title: "Sirop de Sureau Immunité",
    description: "Le remède traditionnel contre les maux de l'hiver et pour l'immunité.",
    ingredients: ["Baies de sureau", "Gingembre frais", "Cannelle", "Miel"],
    instructions: ["Décoction des baies", "Réduction du liquide", "Ajout du miel après refroidissement"],
    benefits: ["Antiviral", "Riche en antioxydants", "Renforce l'immunité"],
    icon: ShieldCheck,
    category: "Sirop"
  },
  {
    id: '07',
    title: "Eau Florale de Lavande",
    description: "Un hydrolat apaisant pour la peau et l'esprit, issu d'une extraction de précision.",
    ingredients: ["Fleurs de Lavande vraie", "Eau de source"],
    instructions: ["Extraction vapeur au BloomLab", "Refroidissement contrôlé", "Mise en flacon stérile"],
    benefits: ["Apaisant", "Cicatrisant", "Relaxant"],
    icon: Wind,
    category: "Hydrolat"
  },
  {
    id: '08',
    title: "Macérat de Pâquerette Tenseur",
    description: "Une huile de beauté réputée pour son effet tenseur sur les tissus.",
    ingredients: ["Fleurs de Pâquerettes séchées", "Huile de Tournesol bio"],
    instructions: ["Macération solaire ou au BloomLab à 35°C", "Filtration sous presse", "Stockage à l'abri de la lumière"],
    benefits: ["Galbant", "Tenseur", "Circulatoire"],
    icon: Leaf,
    category: "Macérat"
  },
  {
    id: '09',
    title: "Gel d'Aloe Vera Frais",
    description: "L'hydratant universel, extrait directement de la feuille fraîche.",
    ingredients: ["Feuille d'Aloe Vera", "Conservateur naturel (Vitamine C)"],
    instructions: ["Extraction du filet", "Mixage lent", "Stabilisation"],
    benefits: ["Hydratant", "Apaisant brûlures", "Réparateur"],
    icon: Droplets,
    category: "Gel"
  },
  {
    id: '10',
    title: "Infusion Digestive au Gingembre",
    description: "Un tonique digestif pour soulager les lourdeurs et stimuler le métabolisme.",
    ingredients: ["Gingembre frais", "Citron bio", "Menthe poivrée", "Miel"],
    instructions: ["Décoction légère du gingembre", "Ajout des feuilles de menthe hors du feu", "Citron et miel à la dégustation"],
    benefits: ["Digestif", "Anti-nausée", "Tonifiant"],
    icon: ChefHat,
    category: "Infusion"
  }
];

export const herbariumRecipes: Recipe[] = discoveryRecipes.map(r => ({
  ...r,
  plant: { name: r.title.split(' ').pop() || 'Plante' },
  goal: r.description
}));
