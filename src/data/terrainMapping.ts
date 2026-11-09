import { Droplets, Zap, ShieldCheck, Activity, Target, Waves, Wind, Flame, Moon, Sparkles, Scale, RefreshCw } from 'lucide-react';
import { Language } from '../translations';

export type PublicTerrainCode = 'T1' | 'T2' | 'T3' | 'T4' | 'T5' | 'T6' | 'T7' | 'T8' | 'T9';

export interface PublicTerrainDefinition {
  code: PublicTerrainCode;
  label: Record<Language, string>;
  shortLabel: Record<Language, string>;
  publicDescription: Record<Language, string>;
  icon: any;
  colorKey: string;
  gradient: string;
  badgeColor: string;
  navigationPriority: number;
  publicKeywords: string[];
  productTags: string[];
  mustNotClaim: string[];
  featuredPlants?: string[];
  keyRecipes?: Record<Language, string[]>;
}

export const PUBLIC_TERRAINS: PublicTerrainDefinition[] = [
  {
    code: 'T1',
    label: {
      fr: 'Microbiome',
      en: 'Microbiome',
      de: 'Mikrobiom'
    },
    shortLabel: {
      fr: 'Microbiome',
      en: 'Microbiome',
      de: 'Mikrobiom'
    },
    publicDescription: {
      fr: 'Explorer les plantes, recettes et méthodes liées au confort digestif, aux habitudes alimentaires et à la diversité végétale.',
      en: 'Explore plants, recipes and methods related to digestive comfort, dietary habits and plant diversity.',
      de: 'Erkunden Sie Pflanzen, Rezepte und Methoden rund um Verdauungskomfort, Ernährungsgewohnheiten und Pflanzenvielfalt.'
    },
    icon: Droplets,
    colorKey: 'terrain_microbiome',
    gradient: 'from-blue-50 to-indigo-50',
    badgeColor: 'bg-blue-500',
    navigationPriority: 1,
    publicKeywords: ['microbiome', 'digestion', 'plantes alimentaires', 'fibres', 'recettes', 'confort digestif'],
    productTags: ['Digestion', 'Détox', 'Microbiome', 'Intestin'],
    mustNotClaim: [
      'Traiter la dysbiose.',
      'Réparer l\'intestin.',
      'Guérir une maladie digestive.',
      'Éliminer les bactéries nocives.',
      'Soigner le microbiote.'
    ]
  },
  {
    code: 'T2',
    label: {
      fr: 'Énergie',
      en: 'Energy',
      de: 'Energie'
    },
    shortLabel: {
      fr: 'Énergie',
      en: 'Energy',
      de: 'Energie'
    },
    publicDescription: {
      fr: 'Explorer des préparations, routines et contenus pensés pour accompagner un quotidien actif, l\'organisation et la récupération.',
      en: 'Explore preparations, routines and content designed to support an active daily life, organization and recovery.',
      de: 'Erkunden Sie Zubereitungen, Routinen und Inhalte zur Unterstützung eines aktiven Alltags, von Organisation und Erholung.'
    },
    icon: Zap,
    colorKey: 'terrain_energy',
    gradient: 'from-amber-50 to-yellow-50',
    badgeColor: 'bg-amber-500',
    navigationPriority: 2,
    publicKeywords: ['énergie', 'vitalité', 'récupération', 'routines', 'quotidien actif', 'organisation'],
    productTags: ['Énergie', 'Vitalité', 'Performance', 'Mitochondrie'],
    mustNotClaim: [
      'Traiter la fatigue chronique.',
      'Soigner l\'épuisement.',
      'Augmenter l\'ATP.',
      'Réparer les mitochondries.',
      'Remplacer un traitement.'
    ]
  },
  {
    code: 'T3',
    label: {
      fr: 'Immunité',
      en: 'Immune Support',
      de: 'Abwehrkräfte'
    },
    shortLabel: {
      fr: 'Immunité',
      en: 'Immune Support',
      de: 'Abwehrkräfte'
    },
    publicDescription: {
      fr: 'Découvrir les plantes, traditions botaniques et gestes saisonniers associés au bien-être quotidien et aux habitudes de préparation.',
      en: 'Discover plants, botanical traditions and seasonal practices associated with daily well-being and preparation habits.',
      de: 'Entdecken Sie Pflanzen, botanische Traditionen und saisonale Praktiken für das tägliche Wohlbefinden und Zubereitungsgewohnheiten.'
    },
    icon: ShieldCheck,
    colorKey: 'terrain_immunity',
    gradient: 'from-emerald-50 to-teal-50',
    badgeColor: 'bg-emerald-500',
    navigationPriority: 3,
    publicKeywords: ['immunité', 'saisons', 'plantes', 'préparation botanique', 'routine saisonnière', 'bien-être quotidien'],
    productTags: ['Immunité', 'Protection', 'Hiver', 'Défenses'],
    mustNotClaim: [
      'Renforcer l\'immunité contre une maladie.',
      'Traiter une infection.',
      'Prévenir une infection.',
      'Stimuler le système immunitaire de façon garantie.',
      'Remplacer un vaccin ou un traitement.'
    ]
  },
  {
    code: 'T4',
    label: {
      fr: 'Foie & Détox',
      en: 'Liver & Daily Balance',
      de: 'Leber & Alltag'
    },
    shortLabel: {
      fr: 'Foie & Détox',
      en: 'Liver & Daily Balance',
      de: 'Leber & Alltag'
    },
    publicDescription: {
      fr: 'Explorer des contenus sur les habitudes de vie, les plantes amères, la cuisine botanique, l\'hydratation et les routines de préparation associées au confort du quotidien.',
      en: 'Explore content on lifestyle habits, bitter plants, botanical cooking, hydration and preparation routines for everyday comfort.',
      de: 'Erkunden Sie Inhalte zu Lebensgewohnheiten, Bitterpflanzen, botanischer Küche, Hydratation und Zubereitungsroutinen für den Alltagskomfort.'
    },
    icon: Activity,
    colorKey: 'terrain_liver_detox',
    gradient: 'from-yellow-50 to-amber-50',
    badgeColor: 'bg-yellow-600',
    navigationPriority: 4,
    publicKeywords: ['foie', 'détox', 'plantes amères', 'routines', 'hydratation', 'cuisine botanique', 'préparation de plantes'],
    productTags: ['Foie', 'Détox', 'Amères', 'Hydratation'],
    featuredPlants: ['Artichaut', 'Radis Noir', 'Desmodium', 'Chardon-Marie', 'Romarin'],
    keyRecipes: {
      fr: ['Décoction Détox & Soutien Hépatique', 'Macérât Romarin & Artichaut'],
      en: ['Hepatic Detox Decoction', 'Rosemary & Artichoke Macerate'],
      de: ['Leber-Detox-Dekokt', 'Rosmarin-Artischocken-Mazerat']
    },
    mustNotClaim: [
      'Détoxifie le foie.',
      'Nettoie le foie.',
      'Élimine les toxines.',
      'Élimine les métaux lourds.',
      'Répare le foie.',
      'Traite une stéatose, une hépatite ou une maladie hépatique.',
      'Remplace un suivi médical.'
    ]
  },
  {
    code: 'T5',
    label: {
      fr: 'Métabolisme',
      en: 'Metabolism',
      de: 'Stoffwechsel'
    },
    shortLabel: {
      fr: 'Métabolisme',
      en: 'Metabolism',
      de: 'Stoffwechsel'
    },
    publicDescription: {
      fr: 'Comprendre les routines alimentaires, le rythme des repas, l\'organisation du quotidien et les gestes qui soutiennent une pratique plus régulière.',
      en: 'Understand eating routines, meal rhythms, daily organization and practices that support a more regular routine.',
      de: 'Verstehen Sie Ernährungsroutinen, Mahlzeitenrhythmen, Alltagsorganisation und Praktiken für eine regelmäßige Routine.'
    },
    icon: Target,
    colorKey: 'terrain_metabolism',
    gradient: 'from-teal-50 to-green-50',
    badgeColor: 'bg-teal-600',
    navigationPriority: 5,
    publicKeywords: ['métabolisme', 'routines alimentaires', 'rythme des repas', 'organisation', 'préparation maison', 'équilibre du quotidien'],
    productTags: ['Métabolisme', 'Équilibre', 'Routines', 'Digestion'],
    featuredPlants: ['Fenugrec', 'Épine-vinette (Berbérine)', 'Gingembre', 'Cannelle de Ceylan'],
    keyRecipes: {
      fr: ['Élixir Régulateur Métabolique', 'Infusion Cannelle & Fenugrec'],
      en: ['Metabolic Active Elixir', 'Cinnamon & Fenugreek Infusion'],
      de: ['Stoffwechsel-Aktiv-Elixier', 'Zimt-Bockshornklee-Tee']
    },
    mustNotClaim: [
      'Réduit la glycémie.',
      'Traite le diabète.',
      'Corrige l\'insuline.',
      'Brûle les graisses.',
      'Fait perdre du poids.',
      'Répare le métabolisme.'
    ]
  },
  {
    code: 'T6',
    label: {
      fr: 'Élimination',
      en: 'Hydration & Movement',
      de: 'Flüssigkeit & Bewegung'
    },
    shortLabel: {
      fr: 'Élimination',
      en: 'Hydration & Movement',
      de: 'Flüssigkeit & Bewegung'
    },
    publicDescription: {
      fr: 'Explorer les pratiques liées à l\'hydratation, au mouvement, au transit, à la circulation et aux routines de récupération.',
      en: 'Explore practices related to hydration, movement, transit, circulation and recovery routines.',
      de: 'Erkunden Sie Praktiken rund um Hydratation, Bewegung, Transit, Zirkulation und Erholungsroutinen.'
    },
    icon: Waves,
    colorKey: 'terrain_elimination',
    gradient: 'from-cyan-50 to-blue-50',
    badgeColor: 'bg-cyan-600',
    navigationPriority: 6,
    publicKeywords: ['élimination', 'hydratation', 'mouvement', 'transit', 'circulation', 'récupération'],
    productTags: ['Élimination', 'Hydratation', 'Mouvement', 'Transit', 'Circulation'],
    featuredPlants: ['Pissenlit', 'Piloselle', 'Reine des prés', 'Prêle des champs', 'Orthosiphon'],
    keyRecipes: {
      fr: ['Infusion Drainage & Élimination', 'Teinture Dépurative Pissenlit & Prêle'],
      en: ['Drainage & Elimination Infusion', 'Dandelion & Horsetail Tincture'],
      de: ['Drainage- & Ausscheidungstee', 'Löwenzahn-Schachtelhalm-Tinktur']
    },
    mustNotClaim: [
      'Draine les toxines.',
      'Nettoie les reins.',
      'Purifie le sang.',
      'Détoxifie l\'organisme.',
      'Élimine les polluants.',
      'Traite un problème rénal ou lymphatique.'
    ]
  },
  {
    code: 'T7',
    label: {
      fr: 'Sérénité',
      en: 'Serenity',
      de: 'Gelassenheit'
    },
    shortLabel: {
      fr: 'Sérénité',
      en: 'Serenity',
      de: 'Gelassenheit'
    },
    publicDescription: {
      fr: 'Créer des moments de calme grâce aux rituels, aux plantes aromatiques, aux recettes du soir et aux pratiques de préparation conscientes.',
      en: 'Create moments of calm through rituals, aromatic herbs, evening recipes and mindful preparation practices.',
      de: 'Schaffen Sie Momente der Ruhe durch Rituale, aromatische Kräuter, Abendrezepturen und achtsame Zubereitungspraktiken.'
    },
    icon: Wind,
    colorKey: 'terrain_serenity',
    gradient: 'from-indigo-50 to-violet-50',
    badgeColor: 'bg-indigo-600',
    navigationPriority: 7,
    publicKeywords: ['sérénité', 'calme', 'rituel', 'détente', 'préparation du soir', 'plantes aromatiques'],
    productTags: ['Sérénité', 'Calme', 'Rituel', 'Détente', 'Stress', 'Sommeil'],
    mustNotClaim: [
      'Traite l\'anxiété.',
      'Traite la dépression.',
      'Remplace un anxiolytique.',
      'Calme une crise d\'angoisse.',
      'Modifie les neurotransmetteurs.',
      'Traite un trouble psychiatrique.'
    ]
  },
  {
    code: 'T8',
    label: {
      fr: 'Inflammation',
      en: 'Everyday Comfort',
      de: 'Alltagskomfort'
    },
    shortLabel: {
      fr: 'Inflammation',
      en: 'Everyday Comfort',
      de: 'Alltagskomfort'
    },
    publicDescription: {
      fr: 'Découvrir une approche de confort global, de routines équilibrées, de cuisine botanique et de gestes de préparation responsables.',
      en: 'Discover an approach to overall comfort, balanced routines, botanical cooking and responsible preparation practices.',
      de: 'Entdecken Sie einen Ansatz für ganzheitlichen Komfort, ausgewogene Routinen, botanische Küche und verantwortungsvolle Zubereitung.'
    },
    icon: Flame,
    colorKey: 'terrain_inflammation',
    gradient: 'from-rose-50 to-orange-50',
    badgeColor: 'bg-rose-500',
    navigationPriority: 8,
    publicKeywords: ['inflammation', 'confort', 'routines équilibrées', 'cuisine botanique', 'préparation responsable', 'bien-être quotidien'],
    productTags: ['Inflammation', 'Confort', 'Apaisement', 'Mobilité'],
    mustNotClaim: [
      'Anti-inflammatoire garanti.',
      'Traite l\'inflammation chronique.',
      'Soulage l\'arthrite.',
      'Soulage une maladie inflammatoire.',
      'Réduit les cytokines.',
      'Remplace un anti-inflammatoire.'
    ]
  },
  {
    code: 'T9',
    label: {
      fr: 'Sommeil',
      en: 'Sleep',
      de: 'Schlaf'
    },
    shortLabel: {
      fr: 'Sommeil',
      en: 'Sleep',
      de: 'Schlaf'
    },
    publicDescription: {
      fr: 'Explorer les routines du soir, les pratiques de récupération, les préparations aromatiques et les gestes qui favorisent un moment de détente.',
      en: 'Explore evening routines, recovery practices, aromatic preparations and actions that encourage relaxation.',
      de: 'Erkunden Sie Abendroutinen, Erholungspraktiken, aromatische Zubereitungen und Gesten zur Förderung der Entspannung.'
    },
    icon: Moon,
    colorKey: 'terrain_sleep',
    gradient: 'from-slate-50 to-indigo-50',
    badgeColor: 'bg-slate-700',
    navigationPriority: 9,
    publicKeywords: ['sommeil', 'routine du soir', 'récupération', 'détente', 'rituel', 'préparation aromatique'],
    productTags: ['Sommeil', 'Nuit', 'Récupération', 'Sérénité'],
    mustNotClaim: [
      'Traite l\'insomnie.',
      'Remplace un somnifère.',
      'Endort rapidement.',
      'Augmente la mélatonine.',
      'Traite un trouble du sommeil.',
      'Garantit un meilleur sommeil.'
    ]
  }
];

export const TERRAIN_EDITORIAL_NOTICE = {
  fr: "Cette structure est une taxonomie éditoriale et de navigation Bloom. Elle ne constitue pas un diagnostic, une prescription, une classification médicale ou une recommandation thérapeutique personnalisée.",
  en: "This structure is a Bloom editorial and navigation taxonomy. It does not constitute a diagnosis, prescription, medical classification, or personalized therapeutic recommendation.",
  de: "Diese Struktur ist eine redaktionelle und navigationsbezogene Taxonomie von Bloom. Sie stellt keine Diagnose, Verschreibung, medizinische Klassifikation oder personalisierte Therapieempfehlung dar."
};

export const TERRAIN_PAGE_INTRO = {
  fr: "Choisissez un terrain pour découvrir des plantes, recettes, méthodes et contenus associés à vos centres d'intérêt. Les terrains Bloom sont des repères éditoriaux destinés à faciliter votre navigation ; ils ne constituent pas un diagnostic médical.",
  en: "Choose a terrain to discover plants, recipes, methods, and content related to your interests. Bloom terrains are editorial benchmarks to facilitate navigation; they do not constitute a medical diagnosis.",
  de: "Wählen Sie ein Terrain, um Pflanzen, Rezepte, Methoden und Inhalte zu entdecken, die Ihren Interessen entsprechen. Bloom-Terrains sind redaktionelle Orientierungshilfen zur Erleichterung der Navigation; sie stellen keine medizinische Diagnose dar."
};

/**
 * Historical legacy aliases preserved for seamless backward compatibility.
 * Never deleted, never modifying the underlying botanical database.
 */
export const LEGACY_TERRAIN_ALIASES: Record<string, string> = {
  "T1_Intestin": "T1",
  "T1_Microbiome": "T1",
  "T1_Barriere_intestinale": "T1",
  "T2_Energie": "T2",
  "T2_Foie": "T4",
  "T3_Immunite": "T3",
  "T3_Sang": "T3",
  "T4_HPA": "T7",
  "T4_Stress": "T7",
  "T5_Mitochondrie": "T2",
  "T5_Energie": "T2",
  "T6_Emonctoires": "T6",
  "T6_Circulation": "T6",
  "T7_Psychoemotionnel": "T7",
  "T7_Serenite": "T7",
  "T8_Inflammation": "T8",
  "T8_Adipeux_visceral": "T5",
  "T9_Peau": "T9",
  "T9_Phaneres": "T9",
  "T9_Sommeil": "T9",
  "T10_Hormonal": "legacy_internal_only"
};

/**
 * Resolves any raw terrain string (legacy tag, bracket notation, or clean code)
 * into a valid PublicTerrainCode ('T1' through 'T9') or null.
 */
export function resolveTerrainCode(rawTag: string): { 
  code: PublicTerrainCode | null; 
  status: 'mapped' | 'review_required' | 'archived' 
} {
  if (!rawTag) return { code: null, status: 'review_required' };
  const trimmed = rawTag.trim().replace(/^["'`]|["'`]$/g, '');

  // Exact match in legacy aliases
  if (LEGACY_TERRAIN_ALIASES[trimmed]) {
    const alias = LEGACY_TERRAIN_ALIASES[trimmed];
    if (alias === 'legacy_internal_only') {
      return { code: null, status: 'archived' };
    }
    return { code: alias as PublicTerrainCode, status: 'mapped' };
  }

  // Normalized key (accents & punctuation stripped)
  const normalizedKey = trimmed
    .replace(/[()]/g, '')
    .replace(/\s+/g, '_')
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  if (LEGACY_TERRAIN_ALIASES[normalizedKey]) {
    const alias = LEGACY_TERRAIN_ALIASES[normalizedKey];
    if (alias === 'legacy_internal_only') {
      return { code: null, status: 'archived' };
    }
    return { code: alias as PublicTerrainCode, status: 'mapped' };
  }

  // Bracket notation e.g. "T4 (Foie)", "T1 (Intestin)", "T10 (Métabolisme)"
  const lower = trimmed.toLowerCase();
  
  if (lower.includes('foie') || lower.includes('détox') || lower.includes('detox') || lower.includes('hépatique') || lower.includes('hepatique') || lower.includes('biliaire') || lower.includes('chardon')) {
    return { code: 'T4', status: 'mapped' };
  }
  if (lower.includes('métabolisme') || lower.includes('metabolisme') || lower.includes('adipeux') || lower.includes('glycémie') || lower.includes('glycemie') || lower.includes('insul') || lower.includes('berbérine') || lower.includes('berberine') || lower.includes('fenugrec')) {
    return { code: 'T5', status: 'mapped' };
  }
  if (lower.includes('émonctoire') || lower.includes('emonctoire') || lower.includes('circulation') || lower.includes('fascia') || lower.includes('élimination') || lower.includes('elimination') || lower.includes('drainage') || lower.includes('reins') || lower.includes('pissenlit') || lower.includes('piloselle') || lower.includes('prêle') || lower.includes('prele')) {
    return { code: 'T6', status: 'mapped' };
  }
  if (lower.includes('hpa') || lower.includes('psycho') || lower.includes('cognition') || lower.includes('nerveux') || lower.includes('sérénité') || lower.includes('serenite')) {
    return { code: 'T7', status: 'mapped' };
  }
  if (lower.includes('microbiome') || lower.includes('intestin') || lower.includes('estomac')) {
    return { code: 'T1', status: 'mapped' };
  }
  if (lower.includes('mitochondrie') || lower.includes('vitalité') || lower.includes('performance') || lower.includes('énergie') || lower.includes('energie')) {
    return { code: 'T2', status: 'mapped' };
  }
  if (lower.includes('immunité') || lower.includes('immunite') || lower.includes('sang') || lower.includes('protection')) {
    return { code: 'T3', status: 'mapped' };
  }
  if (lower.includes('inflammation')) {
    return { code: 'T8', status: 'mapped' };
  }
  if (lower.includes('sommeil') || lower.includes('peau') || lower.includes('phanères') || lower.includes('phaneres')) {
    return { code: 'T9', status: 'mapped' };
  }

  // Direct code match T1..T9
  const m = trimmed.match(/^T([1-9])\b/i);
  if (m) {
    const code = `T${m[1]}` as PublicTerrainCode;
    return { code, status: 'mapped' };
  }

  if (trimmed.startsWith('T10')) {
    return { code: null, status: 'archived' };
  }

  return { code: null, status: 'review_required' };
}
