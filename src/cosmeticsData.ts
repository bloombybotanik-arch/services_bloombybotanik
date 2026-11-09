import { CANONICAL_RECIPES } from './data/canonicalRecipesRegistry';

export interface CosmeticRecipe {
  id: string;
  plant_id: string;
  nom_commun: string;
  nom_latin?: string;
  type_produit: string;
  categorie: string;
  peau: string;
  cible: string;
  temps_total: string;
  difficulte: string;
  solvants: {
    phase_A: { type: string; volume: string; role: string };
    phase_B: { type: string; volume: string; role: string };
  };
  plantes: {
    phase_A: { nom: string; grammage: string; actifs: string };
    phase_B: { nom: string; grammage: string; actifs: string };
  };
  parametres_bloomlab: {
    phase_A: { temp: string; temps: string; agitation: string };
    phase_B: { temp: string; temps: string; agitation: string };
  };
  recette_pas_a_pas: {
    batch_standard: string;
    ingredients: {
      phase_A: string[];
      phase_B: string[];
    };
    phase_A_instructions: string[];
    transition: string[];
    phase_B_instructions: string[];
    filtration_et_finition: string[];
  };
  conditionnement: string;
  mode_utilisation: string;
  conservation: string;
  precautions: string;
  synergies_kits_internes: string;
  // Propriétés de compatibilité
  slug?: string;
  canonicalUrl?: string;
  title?: string;
  summary?: string;
  image?: string;
  imageAlt?: string;
  ingredients?: string[];
  instructions?: string[];
  difficultyLevel?: number;
  difficultyLabel?: string;
  category?: string;
  [key: string]: any;
}

export const cosmeticsRecipes: CosmeticRecipe[] = CANONICAL_RECIPES.filter(r => r.category === 'cosmetique').map(r => {
  const plantId = r.id.replace(/^cosmetique-/, '');
  const subcategory = r.subcategory || 'Visage';
  
  let peau = 'Toutes';
  if (r.summary.toLowerCase().includes('sensible')) peau = 'Sensible';
  else if (r.summary.toLowerCase().includes('grasse') || r.summary.toLowerCase().includes('acné')) peau = 'Grasse / Acnéique';
  else if (r.summary.toLowerCase().includes('sèche')) peau = 'Sèche';
  else if (r.summary.toLowerCase().includes('mature') || r.summary.toLowerCase().includes('ride')) peau = 'Mature';

  const temps = r.temperatures?.split('/') || ['45°C', '40°C'];
  const tempA = temps[0]?.replace(/Phase A:?/i, '').trim() || '45°C';
  const tempB = temps[1]?.replace(/Phase B:?/i, '').trim() || '40°C';

  const instructions = r.instructions || [];
  const phaseAInstructions = instructions.filter(i => i.toLowerCase().includes('phase a') || (!i.toLowerCase().includes('phase b') && !i.toLowerCase().includes('filtre') && !i.toLowerCase().includes('repos')));
  const transitionInstructions = instructions.filter(i => i.toLowerCase().includes('repos') || i.toLowerCase().includes('tiède') || i.toLowerCase().includes('sécurité') || i.toLowerCase().includes('test sensoriel'));
  const phaseBInstructions = instructions.filter(i => i.toLowerCase().includes('phase b') || i.toLowerCase().includes('rosehip') || i.toLowerCase().includes('fleurs de calendula'));
  const filtrationInstructions = instructions.filter(i => i.toLowerCase().includes('filtre') || i.toLowerCase().includes('vitamine e') || i.toLowerCase().includes('marc') || i.toLowerCase().includes('finition'));

  return {
    ...r,
    id: r.id,
    plant_id: plantId,
    nom_commun: r.title,
    type_produit: subcategory,
    categorie: subcategory,
    peau,
    cible: r.summary,
    temps_total: `${r.totalTimeMinutes || 60} min`,
    difficulte: r.difficultyLabel || 'Facile',
    solvants: {
      phase_A: {
        type: r.ingredients[0]?.split('dans')?.[1]?.trim() || "Huile végétale bio de première pression",
        volume: "500 ml",
        role: "Solvant porteur lipophile principal"
      },
      phase_B: {
        type: r.ingredients[1]?.split('dans')?.[1]?.trim() || "Huile végétale précieuse thermolabile",
        volume: "250 ml",
        role: "Solvant d'enrichissement et protection des actifs fragiles"
      }
    },
    plantes: {
      phase_A: {
        nom: r.ingredients[0]?.replace(/^Phase A\s*:\s*/, '')?.split('(')?.[0]?.trim() || "Plante Phase A",
        grammage: r.ingredients[0]?.match(/\(([^)]+)\)/)?.[1] || "50g",
        actifs: "Molécules lipophiles denses, caroténoïdes & phytostérols"
      },
      phase_B: {
        nom: r.ingredients[1]?.replace(/^Phase B\s*:\s*/, '')?.split('(')?.[0]?.trim() || "Plante Phase B",
        grammage: r.ingredients[1]?.match(/\(([^)]+)\)/)?.[1] || "25g",
        actifs: "Composés aromatiques volatils & flavonoïdes thermosensibles"
      }
    },
    parametres_bloomlab: {
      phase_A: {
        temp: tempA,
        temps: `${Math.max(20, Math.round((r.machineTimeMinutes || 60) * 0.6))} min`,
        agitation: "Cycle doux 'OIL'"
      },
      phase_B: {
        temp: tempB,
        temps: `${Math.max(15, Math.round((r.machineTimeMinutes || 60) * 0.4))} min`,
        agitation: "Cycle doux 'OIL'"
      }
    },
    recette_pas_a_pas: {
      batch_standard: `${r.title} — Formulation 500ml`,
      ingredients: {
        phase_A: [r.ingredients[0] || 'Ingrédient Phase A'],
        phase_B: [r.ingredients[1] || 'Ingrédient Phase B']
      },
      phase_A_instructions: phaseAInstructions.length > 0 ? phaseAInstructions : [
        "Verser le solvant Phase A dans la cuve propre de la BloomLab®.",
        "Ajouter les matières végétales broyées de la Phase A.",
        `Lancer le cycle thermo-régulé à ${tempA}.`
      ],
      transition: transitionInstructions.length > 0 ? transitionInstructions : [
        "Laisser reposer pour amener la température sous 40°C.",
        "TEST SENSORIEL : Vérifier que la cuve est tiède au toucher avant d'introduire la Phase B."
      ],
      phase_B_instructions: phaseBInstructions.length > 0 ? phaseBInstructions : [
        "Ajouter les huiles précieuses et plantes délicates de la Phase B.",
        `Relancer le cycle doux d'extraction à ${tempB}.`
      ],
      filtration_et_finition: filtrationInstructions.length > 0 ? filtrationInstructions : [
        "Filtrer très finement encore tiède à l'aide de l'étamine BloomLab.",
        "Ajouter 10 gouttes de Vitamine E naturelle antioxydante (Tocophérol).",
        "Conditionner immédiatement en flacon ambré propre."
      ]
    },
    conditionnement: "Flacon en verre ambré avec pipette ou spray protecteur",
    mode_utilisation: "Appliquer 3 à 5 gouttes matin et/ou soir sur une peau préalablement nettoyée et légèrement humide.",
    conservation: r.conservationRequirement || "6 mois à l'abri de la lumière et de la chaleur. Conserver au frais après ouverture.",
    precautions: r.allergensOrPrecautions?.join(' ') || "Usage cosmétique externe exclusif. Ne pas ingérer. Effectuer un test de tolérance cutanée dans le pli du coude 24h avant première utilisation.",
    synergies_kits_internes: "Idéalement associé au protocole de détoxification cutanée et aux infusions drainantes hépato-biliaires Bloom."
  };
});

export const cosmeticsRecipesFR = cosmeticsRecipes;
export const getCosmeticsRecipes = (_lang?: any) => cosmeticsRecipes;
export default cosmeticsRecipes;
