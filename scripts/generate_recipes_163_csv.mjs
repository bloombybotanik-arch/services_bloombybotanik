import fs from 'fs';
import path from 'path';

// Load herbierRecipesRegistry
const registryPath = path.join(process.cwd(), 'src/data/herbierRecipesRegistry.ts');
const fileContent = fs.readFileSync(registryPath, 'utf-8');

const arrayStart = fileContent.indexOf('export const HERBIER_RECIPES: HerbierRecipe[] = [');
const arrayEnd = fileContent.lastIndexOf('];');

if (arrayStart === -1 || arrayEnd === -1) {
  console.error('Could not find HERBIER_RECIPES array');
  process.exit(1);
}

const jsonText = fileContent.substring(arrayStart + 'export const HERBIER_RECIPES: HerbierRecipe[] = '.length, arrayEnd + 1);
const recipes = JSON.parse(jsonText);

console.log(`Loaded ${recipes.length} recipes from herbierRecipesRegistry.ts`);

// Terrain descriptive mapping for clear user-facing and backend interpretation
const TERRAIN_NAMES = {
  'T1': 'T1 : Microbiome & Confort Digestif',
  'T2': 'T2 : Énergie Cellulaire & Vitalité',
  'T3': 'T3 : Immunité & Défenses Naturelles',
  'T4': 'T4 : Foie & Détoxication Hépatique',
  'T5': 'T5 : Métabolisme & Équilibre Glucidique',
  'T6': 'T6 : Élimination, Reins & Peau',
  'T7': 'T7 : Sérénité & Axe Neuro-Endocrinien',
  'T8': 'T8 : Inflammation & Confort Tissulaire',
  'T9': 'T9 : Sommeil & Rythmes Circadiens',
  'T10': 'T10 : Équilibre Cardiovasculaire & Circulation'
};

// Map categories strictly to user requirements:
// 'reset homeostasique, soins cosmétiques, gastronomie'
function mapCategory(cat) {
  if (cat === 'phytotherapie') return 'reset homeostasique';
  if (cat === 'cosmetique') return 'soins cosmétiques';
  if (cat === 'gastronomie') return 'gastronomie';
  return cat;
}

function escapeCsv(val) {
  if (val === null || val === undefined) return '""';
  const str = String(val).replace(/"/g, '""').replace(/\r?\n/g, ' ');
  return `"${str}"`;
}

// Columns definition
const headers = [
  'ID',
  'Titre',
  'Slug',
  'URL_Canonique',
  'Categorie',
  'Sous_Categorie',
  'Degre_Difficulte_Niveau',
  'Degre_Difficulte_Libelle',
  'Terrains',
  'Terrains_Codes',
  'Axes_Operatoires',
  'Nombre_Ingredients',
  'Tous_Les_Ingredients',
  'Ingredients_Phase_A_Sachet_A',
  'Solvant_Phase_A',
  'Temperature_Phase_A',
  'Duree_Phase_A',
  'Ingredients_Phase_B_Sachet_B',
  'Solvant_Phase_B',
  'Temperature_Phase_B',
  'Duree_Phase_B',
  'Temps_Preparation_Minutes',
  'Temps_BloomLab_Minutes',
  'Temps_Total_Minutes',
  'Conservation',
  'Volume_Rendement_Ml',
  'Mode_Administration_Ou_Application',
  'Objectif_Terrain_Cible',
  'Signature_Moleculaire_Actifs',
  'Tradition_Heritage',
  'Precautions_Emploi',
  'Contre_Indications'
];

const rows = [headers.map(h => `"${h}"`).join(',')];

const categoryCounts = {
  'reset homeostasique': 0,
  'soins cosmétiques': 0,
  'gastronomie': 0
};

recipes.forEach((r, idx) => {
  const cat = mapCategory(r.category);
  categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;

  // Extract all ingredients
  const allIngredients = Array.isArray(r.ingredients) ? r.ingredients : [];
  const sachetAComp = (r.sachetA && Array.isArray(r.sachetA.composition)) ? r.sachetA.composition : [];
  const sachetBComp = (r.sachetB && Array.isArray(r.sachetB.composition)) ? r.sachetB.composition : [];
  
  // Combine all ingredients uniquely
  const fullIngredientList = Array.from(new Set([...allIngredients, ...sachetAComp, ...sachetBComp])).filter(Boolean);

  // Terrains
  const rawTerrains = Array.isArray(r.terrains) ? r.terrains : [];
  const terrainCodes = rawTerrains.filter(t => /^T\d+$/.test(t)).join(', ');
  const terrainLabels = rawTerrains.map(t => TERRAIN_NAMES[t] || t).join(' | ');

  // Molecular actives
  let molecularStr = '';
  if (Array.isArray(r.molecularSignature)) {
    molecularStr = r.molecularSignature.map(m => {
      if (typeof m === 'string') return m;
      return `${m.molecule || m.nom || ''} (${m.mechanism || m.target || ''})`.trim();
    }).filter(Boolean).join(' | ');
  }

  // Heritage
  let heritageStr = '';
  if (r.heritage) {
    heritageStr = `${r.heritage.register || ''} — ${r.heritage.period || ''}: ${r.heritage.quote || r.heritage.description || ''}`.trim();
  }

  // Mode administration
  const modeAdmin = r.category === 'cosmetique' 
    ? 'Application cutanée / Massage ciblé' 
    : r.category === 'gastronomie' 
      ? 'Usage culinaire & dégustation' 
      : 'Voie orale / Infusion régulatrice';

  const row = [
    escapeCsv(r.id),
    escapeCsv(r.title),
    escapeCsv(r.slug),
    escapeCsv(r.canonicalUrl),
    escapeCsv(cat),
    escapeCsv(r.subcategory || r.categoryLabel || ''),
    escapeCsv(r.difficultyLevel || 2),
    escapeCsv(r.difficultyLabel || 'Facile'),
    escapeCsv(terrainLabels),
    escapeCsv(terrainCodes),
    escapeCsv(Array.isArray(r.axes) ? r.axes.join(', ') : ''),
    escapeCsv(fullIngredientList.length),
    escapeCsv(fullIngredientList.join(' ; ')),
    escapeCsv(sachetAComp.join(' ; ')),
    escapeCsv(r.sachetA?.solvent || ''),
    escapeCsv(r.tempSachetA || r.sachetA?.temp || ''),
    escapeCsv(r.sachetA?.duration || ''),
    escapeCsv(sachetBComp.join(' ; ')),
    escapeCsv(r.sachetB?.solvent || ''),
    escapeCsv(r.tempSachetB || r.sachetB?.temp || ''),
    escapeCsv(r.sachetB?.duration || ''),
    escapeCsv(r.prepTimeMinutes || 15),
    escapeCsv(r.machineTimeMinutes || 30),
    escapeCsv(r.totalTimeMinutes || 45),
    escapeCsv(r.shelfLife || ''),
    escapeCsv(r.yieldMl || ''),
    escapeCsv(modeAdmin),
    escapeCsv(r.subtitle || ''),
    escapeCsv(molecularStr),
    escapeCsv(heritageStr),
    escapeCsv(Array.isArray(r.precautions) ? r.precautions.join(' ; ') : (r.precautions || '')),
    escapeCsv(Array.isArray(r.contraindications) ? r.contraindications.join(' ; ') : (r.contraindications || ''))
  ];

  rows.push(row.join(','));
});

const csvContent = rows.join('\n');

// Destination paths
const targetPaths = [
  path.join(process.cwd(), 'recettes_163_ingredients_terrains.csv'),
  path.join(process.cwd(), 'audit_herbier_163_recettes.csv'),
  path.join(process.cwd(), 'public/data/recettes_163_ingredients_terrains.csv'),
  path.join(process.cwd(), 'public/recettes_163_ingredients_terrains.csv')
];

// Ensure public/data exists
if (!fs.existsSync(path.join(process.cwd(), 'public/data'))) {
  fs.mkdirSync(path.join(process.cwd(), 'public/data'), { recursive: true });
}

targetPaths.forEach(p => {
  fs.writeFileSync(p, csvContent, 'utf-8');
  console.log(`Saved CSV to ${p} (${csvContent.length} bytes, ${rows.length - 1} rows)`);
});

// Also create a copy in dist/ if dist exists
if (fs.existsSync(path.join(process.cwd(), 'dist'))) {
  const distPaths = [
    path.join(process.cwd(), 'dist/recettes_163_ingredients_terrains.csv'),
    path.join(process.cwd(), 'dist/data/recettes_163_ingredients_terrains.csv')
  ];
  distPaths.forEach(p => {
    fs.mkdirSync(path.dirname(p), { recursive: true });
    fs.writeFileSync(p, csvContent, 'utf-8');
    console.log(`Saved CSV to dist: ${p}`);
  });
}

console.log('--- SUMMARY ---');
console.log(`Total recipes written: ${rows.length - 1}`);
console.log('Category distribution:', categoryCounts);
