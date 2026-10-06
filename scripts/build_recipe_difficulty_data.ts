import fs from 'fs';
import path from 'path';

import { discoveryRecipes } from '../src/data/recipesData';
import { cosmeticsRecipes } from '../src/cosmeticsData';
import { culinaryDatabaseFR } from '../src/data/culinaryData';

// Load pathologies JSON
const pathologiesPath = path.resolve('./src/data/recettes_remedes_pathologies.json');
const pathologiesJson = JSON.parse(fs.readFileSync(pathologiesPath, 'utf-8'));

export type RecipeCategory = 'culinaire' | 'cosmetique' | 'parcours-guide';
export type DifficultyConfidence = 'high' | 'medium' | 'low';
export type DifficultyLevel = 1 | 2 | 3 | 4 | 5;
export type DifficultyLabel = 'Très facile' | 'Facile' | 'Intermédiaire' | 'Avancé' | 'Expert';

export interface DifficultyBreakdown {
  active_steps: number;
  ingredients: number;
  extraction_phases: number;
  thermal_precision: number;
  preparation_precision: number;
  filtration_assembly: number;
  user_attention: number;
  conservation: number;
  safety_handling: number;
}

export interface AuditedRecipeRecord {
  id: string;
  title: string;
  url: string;
  status: 'publiée' | 'brouillon' | 'premium' | 'freemium' | 'archivage';
  category: RecipeCategory;
  subcategory: string;
  ingredientCount: number;
  activeStepCount: number;
  extractionPhaseCount: number;
  temperatures: string;
  machineTimeMinutes: number;
  activeTimeMinutes: number;
  totalTimeMinutes: number;
  filtrationRequired: boolean;
  assemblyRequired: boolean;
  conservationRequirement: string;
  allergensOrPrecautions: string[];
  materialsNeeded: string[];
  keySteps: string[];
  difficultyCalculatedScore: number;
  difficultyFinalScore: number;
  difficultyLevel: DifficultyLevel;
  difficultyLabel: DifficultyLabel;
  difficultyReason: string;
  difficultyConfidence: DifficultyConfidence;
  breakdown: DifficultyBreakdown;
  difficultyOverrideReason?: string | null;
  difficultyReviewedBy: string;
  difficultyReviewedAt: string;
  missingData: string[];
  humanReviewRequired: boolean;
}

function computeDifficultyScore(raw: {
  active_steps_count: number;
  ingredients_count: number;
  extraction_phases_count: number;
  thermal_precision_tier: 2 | 5 | 10;
  preparation_precision_tier: 2 | 5 | 10;
  filtration_assembly_tier: 0 | 4 | 10;
  user_attention_tier: 1 | 3 | 5;
  conservation_tier: 0 | 2 | 5;
  safety_handling_tier: 0 | 4 | 10;
}) {
  let active_steps = 2;
  if (raw.active_steps_count <= 2) active_steps = 2;
  else if (raw.active_steps_count <= 4) active_steps = 7;
  else if (raw.active_steps_count <= 6) active_steps = 12;
  else active_steps = 20;

  let ingredients = 2;
  if (raw.ingredients_count <= 3) ingredients = 2;
  else if (raw.ingredients_count <= 5) ingredients = 5;
  else if (raw.ingredients_count <= 8) ingredients = 10;
  else ingredients = 15;

  let extraction_phases = 2;
  if (raw.extraction_phases_count === 1) extraction_phases = 2;
  else if (raw.extraction_phases_count === 2) extraction_phases = 9;
  else extraction_phases = 15;

  const breakdown: DifficultyBreakdown = {
    active_steps,
    ingredients,
    extraction_phases,
    thermal_precision: raw.thermal_precision_tier,
    preparation_precision: raw.preparation_precision_tier,
    filtration_assembly: raw.filtration_assembly_tier,
    user_attention: raw.user_attention_tier,
    conservation: raw.conservation_tier,
    safety_handling: raw.safety_handling_tier
  };

  const score = Object.values(breakdown).reduce((a, b) => a + b, 0);

  let level: DifficultyLevel = 1;
  let label: DifficultyLabel = 'Très facile';

  if (score <= 20) {
    level = 1;
    label = 'Très facile';
  } else if (score <= 40) {
    level = 2;
    label = 'Facile';
  } else if (score <= 60) {
    level = 3;
    label = 'Intermédiaire';
  } else if (score <= 80) {
    level = 4;
    label = 'Avancé';
  } else {
    level = 5;
    label = 'Expert';
  }

  return { score, level, label, breakdown };
}

const auditList: AuditedRecipeRecord[] = [];

// 1. DISCOVERY RECIPES (12)
discoveryRecipes.forEach((r) => {
  let category: RecipeCategory = 'culinaire';
  let subcategory = r.category;
  let isExternalCosmetic = false;

  if (r.id === '02' || r.id === '03' || r.id === '04' || r.id === '12') {
    category = 'cosmetique';
    isExternalCosmetic = true;
  } else if (r.id === '05' || r.id === '07' || r.id === '08' || r.id === '10' || r.id === '11') {
    category = 'parcours-guide';
  } else {
    category = 'culinaire';
  }

  const hasPhaseB = !!(r.sachetB && r.sachetB.composition && r.sachetB.composition.length > 0);
  const phases = hasPhaseB ? 2 : 1;
  const ingredientsCount = r.ingredients.length;
  const activeStepsCount = r.instructions.length + 1; // +1 for packaging/filtration

  // Duration in minutes estimate
  let machineTime = 30;
  if (r.sachetA?.duration?.includes('h')) {
    machineTime = parseInt(r.sachetA.duration) * 60;
  } else if (r.sachetA?.duration?.includes('min')) {
    machineTime = parseInt(r.sachetA.duration);
  }
  if (r.sachetB?.duration?.includes('h')) {
    machineTime += parseInt(r.sachetB.duration) * 60;
  } else if (r.sachetB?.duration?.includes('min')) {
    machineTime += parseInt(r.sachetB.duration);
  }
  if (r.id === '05') machineTime = 60; // maceration room temp

  const activeTime = phases === 2 ? 20 : 10;
  const totalTime = machineTime + activeTime;

  // Thermal precision tier
  let thermalTier: 2 | 5 | 10 = phases === 2 ? 10 : 5;
  // Prep precision tier
  let prepTier: 2 | 5 | 10 = 5;
  // Filtration tier
  let filtTier: 0 | 4 | 10 = 4;
  // User attention tier
  let attentionTier: 1 | 3 | 5 = phases === 2 ? 3 : 1;
  // Conservation tier
  let consTier: 0 | 2 | 5 = 2;
  // Safety tier
  let safetyTier: 0 | 4 | 10 = 0;

  if (isExternalCosmetic) {
    consTier = 5;
    safetyTier = 4; // test cutané recommandé
  }
  if (r.id === '05') {
    safetyTier = 10; // alcool
    consTier = 2;
  }
  if (category === 'parcours-guide') {
    consTier = 5;
    safetyTier = 4;
  }

  const { score, level, label, breakdown } = computeDifficultyScore({
    active_steps_count: activeStepsCount,
    ingredients_count: ingredientsCount,
    extraction_phases_count: phases,
    thermal_precision_tier: thermalTier,
    preparation_precision_tier: prepTier,
    filtration_assembly_tier: filtTier,
    user_attention_tier: attentionTier,
    conservation_tier: consTier,
    safety_handling_tier: safetyTier
  });

  const reason = phases === 2
    ? `Extraction séquentielle en 2 phases (${r.sachetA?.temp || 'T1'} puis ${r.sachetB?.temp || 'T2'}) avec filtration intermédiaire.`
    : `Préparation directe en 1 phase avec contrôle standard de température et filtration simple.`;

  auditList.push({
    id: `discovery-${r.id}`,
    title: r.title,
    url: `/recettes/#${r.id}`,
    status: 'publiée',
    category,
    subcategory,
    ingredientCount: ingredientsCount,
    activeStepCount: activeStepsCount,
    extractionPhaseCount: phases,
    temperatures: `${r.sachetA?.temp || '60°C'}${r.sachetB?.temp ? ` / ${r.sachetB.temp}` : ''}`,
    machineTimeMinutes: machineTime,
    activeTimeMinutes: activeTime,
    totalTimeMinutes: totalTime,
    filtrationRequired: true,
    assemblyRequired: phases > 1,
    conservationRequirement: isExternalCosmetic ? 'Flacon ambré hermétique, 1 à 3 mois au frais' : 'Bocal hermétique propre ou réfrigération',
    allergensOrPrecautions: r.precautions || [],
    materialsNeeded: ['Extracteur BloomLab®', 'Sachets A/B', 'Filtre tamis', 'Récipient propre'],
    keySteps: r.instructions,
    difficultyCalculatedScore: score,
    difficultyFinalScore: score,
    difficultyLevel: level,
    difficultyLabel: label,
    difficultyReason: reason,
    difficultyConfidence: 'high',
    breakdown,
    difficultyReviewedBy: 'Auditeur Botanique Bloom',
    difficultyReviewedAt: new Date().toISOString(),
    missingData: [],
    humanReviewRequired: level >= 4
  });
});

// 2. COSMETICS RECIPES (24)
cosmeticsRecipes.forEach((c) => {
  const pA_steps = c.recette_pas_a_pas?.phase_A_instructions?.length || 3;
  const pB_steps = c.recette_pas_a_pas?.phase_B_instructions?.length || 3;
  const trans_steps = c.recette_pas_a_pas?.transition?.length || 1;
  const fin_steps = c.recette_pas_a_pas?.filtration_et_finition?.length || 3;
  const totalActiveSteps = pA_steps + trans_steps + pB_steps + fin_steps;

  const ingA = c.recette_pas_a_pas?.ingredients?.phase_A?.length || 2;
  const ingB = c.recette_pas_a_pas?.ingredients?.phase_B?.length || 2;
  const totalIngredients = ingA + ingB + (fin_steps > 3 ? 2 : 0);

  // Parse machine times
  let machineTime = 120;
  const timeA = c.parametres_bloomlab?.phase_A?.temps || '';
  const timeB = c.parametres_bloomlab?.phase_B?.temps || '';
  if (timeA.includes('h')) machineTime = parseInt(timeA) * 60;
  if (timeB.includes('h')) machineTime += parseInt(timeB) * 60;

  const activeTime = 25;
  const totalTime = machineTime + activeTime;

  const phasesCount = 2; // Bi-phase extraction
  const thermalTier: 2 | 5 | 10 = 10; // multiple temperatures & agitation
  const prepTier: 2 | 5 | 10 = 10; // precise weighing, grinding, dilution
  const filtTier: 0 | 4 | 10 = 10; // fine filtration & phase assembly / emulsion
  const attentionTier: 1 | 3 | 5 = 5; // active assembly & surveillance
  const consTier: 0 | 2 | 5 = 5; // amber bottle, refrigeration
  const safetyTier: 0 | 4 | 10 = 10; // alcohol, essential oils, patch test, external use only

  const { score, level, label, breakdown } = computeDifficultyScore({
    active_steps_count: totalActiveSteps,
    ingredients_count: totalIngredients,
    extraction_phases_count: phasesCount,
    thermal_precision_tier: thermalTier,
    preparation_precision_tier: prepTier,
    filtration_assembly_tier: filtTier,
    user_attention_tier: attentionTier,
    conservation_tier: consTier,
    safety_handling_tier: safetyTier
  });

  const reason = `Formulation cosmétique bi-phase avancée : extraction séquentielle, pesée précise des résines/huiles, assemblage sous agitation et conditionnement ambré.`;

  auditList.push({
    id: `cosmetique-${c.plant_id}`,
    title: c.nom_commun,
    url: `/cosmetiques/#${c.plant_id}`,
    status: 'publiée',
    category: 'cosmetique',
    subcategory: c.categorie,
    ingredientCount: totalIngredients,
    activeStepCount: totalActiveSteps,
    extractionPhaseCount: phasesCount,
    temperatures: `Phase A: ${c.parametres_bloomlab?.phase_A?.temp || '45°C'} / Phase B: ${c.parametres_bloomlab?.phase_B?.temp || '50°C'}`,
    machineTimeMinutes: machineTime,
    activeTimeMinutes: activeTime,
    totalTimeMinutes: totalTime,
    filtrationRequired: true,
    assemblyRequired: true,
    conservationRequirement: c.conservation || 'Flacon ambré, 6 à 8 semaines au réfrigérateur',
    allergensOrPrecautions: [
      'Usage externe exclusif. Ne pas ingérer.',
      'Test de tolérance cutanée recommandé 48h dans le pli du coude.',
      c.precautions || ''
    ].filter(Boolean),
    materialsNeeded: ['Extracteur BloomLab®', 'Balance de précision 0.1g', 'Filtre fin / étamine', 'Flacon verre ambré', 'Bain-marie'],
    keySteps: [
      'Extraction aqueuse / polaire (Phase A)',
      'Extraction hydroalcoolique ou lipophile (Phase B)',
      'Filtration fine et pressage du marc',
      'Assemblage, émulsion et ajout des conservateurs naturels'
    ],
    difficultyCalculatedScore: score,
    difficultyFinalScore: score,
    difficultyLevel: level,
    difficultyLabel: label,
    difficultyReason: reason,
    difficultyConfidence: 'high',
    breakdown,
    difficultyReviewedBy: 'Auditeur Botanique Bloom',
    difficultyReviewedAt: new Date().toISOString(),
    missingData: [],
    humanReviewRequired: level >= 4
  });
});

// 3. CULINARY DATABASE (20 plants, flattened to main extraction preparations)
culinaryDatabaseFR.forEach((cp) => {
  const paramKeys = Object.keys(cp.parametres_bloomlab);
  
  paramKeys.forEach((k) => {
    const p = (cp.parametres_bloomlab as any)[k];
    let machineTime = 60;
    if (p.temps?.includes('h')) {
      const match = p.temps.match(/(\d+)h(\d*)/);
      if (match) {
        machineTime = parseInt(match[1]) * 60 + (match[2] ? parseInt(match[2]) : 0);
      }
    } else if (p.temps?.includes('min')) {
      machineTime = parseInt(p.temps);
    }

    const activeTime = 10;
    const totalTime = machineTime + activeTime;

    const { score, level, label, breakdown } = computeDifficultyScore({
      active_steps_count: 2, // Cut plant + load BloomLab
      ingredients_count: 2, // Plant + Solvent
      extraction_phases_count: 1, // Single extraction
      thermal_precision_tier: 2, // Standard single temperature
      preparation_precision_tier: 5, // Simple weighing
      filtration_assembly_tier: 4, // Simple mesh filter
      user_attention_tier: 1, // Launch & leave
      conservation_tier: 2, // Clean bottle
      safety_handling_tier: 0 // Food safe, no hazard
    });

    const subName = k === 'huile_finition' ? 'Huile de finition' : k === 'beurre_ghee' ? 'Beurre clarifié / Ghee' : k === 'miel' ? 'Miel infusé' : k === 'vinaigre' ? 'Vinaigre aromatique' : 'Préparation culinaire';

    const reason = `Préparation culinaire à phase unique (${p.temp}, ${p.temps}) dans ${p.solvant}, simple filtration au tamis BloomLab.`;

    auditList.push({
      id: `culinaire-${cp.plant_id}-${k}`,
      title: `${cp.nom_commun} — ${subName}`,
      url: `/culinaire/#${cp.plant_id}`,
      status: 'publiée',
      category: 'culinaire',
      subcategory: subName,
      ingredientCount: 2,
      activeStepCount: 2,
      extractionPhaseCount: 1,
      temperatures: p.temp,
      machineTimeMinutes: machineTime,
      activeTimeMinutes: activeTime,
      totalTimeMinutes: totalTime,
      filtrationRequired: true,
      assemblyRequired: false,
      conservationRequirement: 'Bouteille en verre propre et sèche, à l’abri de la lumière.',
      allergensOrPrecautions: ['Usage alimentaire.', cp.astuce_chef_bloom],
      materialsNeeded: ['Extracteur BloomLab®', 'Balance de cuisine', 'Filtre tamis BloomLab', 'Bouteille ou bocal en verre'],
      keySteps: [
        `Placer ${cp.nom_commun} (${p.ratio.split('/')[0]}) dans la cuve`,
        `Ajouter ${p.solvant} (${p.ratio.split('/')[1]})`,
        `Régler la BloomLab à ${p.temp} pendant ${p.temps}`,
        `Filtrer tiède dans une bouteille propre`
      ],
      difficultyCalculatedScore: score,
      difficultyFinalScore: score,
      difficultyLevel: level,
      difficultyLabel: label,
      difficultyReason: reason,
      difficultyConfidence: 'high',
      breakdown,
      difficultyReviewedBy: 'Auditeur Botanique Bloom',
      difficultyReviewedAt: new Date().toISOString(),
      missingData: [],
      humanReviewRequired: false
    });
  });
});

// 4. PATHOLOGIES / RESET PROTOCOLS (7 entries)
pathologiesJson.forEach((p: any) => {
  const activeSteps = 6;
  const ingredientsCount = (p.plantes?.length || 2) + 2; // herbs + solvents
  const phasesCount = 2; // sequential phase A & B
  const machineTime = 240; // ~4h
  const activeTime = 30;
  const totalTime = machineTime + activeTime;

  const { score, level, label, breakdown } = computeDifficultyScore({
    active_steps_count: activeSteps,
    ingredients_count: ingredientsCount,
    extraction_phases_count: phasesCount,
    thermal_precision_tier: 10,
    preparation_precision_tier: 10,
    filtration_assembly_tier: 10,
    user_attention_tier: 5,
    conservation_tier: 5,
    safety_handling_tier: 10 // high safety handling, educational disclaimer
  });

  const cleanTitle = p.nom_commun.replace('Remède ', 'Parcours Botanique Guidé — ');

  auditList.push({
    id: `parcours-${p.recette_id}`,
    title: cleanTitle,
    url: `/recettes/#${p.recette_id}`,
    status: 'publiée',
    category: 'parcours-guide',
    subcategory: 'Parcours botanique guidé',
    ingredientCount: ingredientsCount,
    activeStepCount: activeSteps,
    extractionPhaseCount: phasesCount,
    temperatures: 'Phase A: 75°C / Phase B: 50°C',
    machineTimeMinutes: machineTime,
    activeTimeMinutes: activeTime,
    totalTimeMinutes: totalTime,
    filtrationRequired: true,
    assemblyRequired: true,
    conservationRequirement: 'Flacon ambré hermétique, 6 semaines au réfrigérateur.',
    allergensOrPrecautions: [
      'Contenu purement éducatif ne remplaçant pas un avis médical ou un traitement.',
      'Demander conseil à un professionnel de santé en cas de pathologie ou traitement en cours.'
    ],
    materialsNeeded: ['Extracteur BloomLab®', 'Balance de précision', 'Filtre tamis fin', 'Flacon en verre ambré'],
    keySteps: [
      'Extraction séquentielle Phase A (solvant polaire hydroglycériné)',
      'Nettoyage et séchage de la cuve',
      'Extraction séquentielle Phase B (solvant alcoolique doux)',
      'Double filtration et assemblage'
    ],
    difficultyCalculatedScore: score,
    difficultyFinalScore: score,
    difficultyLevel: level,
    difficultyLabel: label,
    difficultyReason: 'Parcours guidé multi-plantes en extraction séquentielle A/B nécessitant 2 solvants et un assemblage précis.',
    difficultyConfidence: 'high',
    breakdown,
    difficultyReviewedBy: 'Auditeur Botanique Bloom',
    difficultyReviewedAt: new Date().toISOString(),
    missingData: [],
    humanReviewRequired: true
  });
});

console.log(`Total audited recipes: ${auditList.length}`);
console.log(`Culinary: ${auditList.filter(r => r.category === 'culinaire').length}`);
console.log(`Cosmetics: ${auditList.filter(r => r.category === 'cosmetique').length}`);
console.log(`Parcours guidés: ${auditList.filter(r => r.category === 'parcours-guide').length}`);

// Write JSON export to public/data/recipes_difficulty_audit.json
const publicExportPath = path.resolve('./public/data/recipes_difficulty_audit.json');
fs.mkdirSync(path.dirname(publicExportPath), { recursive: true });
fs.writeFileSync(publicExportPath, JSON.stringify(auditList, null, 2), 'utf-8');

console.log(`Saved audit JSON to ${publicExportPath}`);
