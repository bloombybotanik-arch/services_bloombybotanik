import fs from 'fs';
import path from 'path';
import auditData from '../src/data/recipes_difficulty_audit.json';
import { discoveryRecipes } from '../src/data/recipesData';
import { cosmeticsRecipesFR } from '../src/cosmeticsData';
import { culinaryDatabaseFR } from '../src/data/culinaryData';
import remediesData from '../src/data/recettes_remedes_pathologies.json';

export interface CanonicalRecipe {
  id: string;
  slug: string;
  canonicalUrl: string;
  title: string;
  category: 'culinaire' | 'cosmetique' | 'parcours-guide';
  categorySlug: 'culinaires' | 'cosmetiques' | 'parcours-botaniques';
  categoryLabel: string;
  subcategory: string;
  summary: string;
  image: string;
  imageAlt: string;
  ingredientCount: number;
  ingredients: string[];
  activeStepCount: number;
  instructions: string[];
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
  difficultyCalculatedScore: number;
  difficultyFinalScore: number;
  difficultyLevel: 1 | 2 | 3 | 4 | 5;
  difficultyLabel: 'Très facile' | 'Facile' | 'Intermédiaire' | 'Avancé' | 'Expert';
  difficultyReason: string;
  difficultyConfidence: 'high' | 'medium' | 'low';
  breakdown: {
    active_steps: number;
    ingredients: number;
    extraction_phases: number;
    thermal_precision: number;
    preparation_precision: number;
    filtration_assembly: number;
    user_attention: number;
    conservation: number;
    safety_handling: number;
  };
  dosageOrUsage?: string;
  contraindications?: string[];
  bloomNote?: string;
  datePublished: string;
  dateModified: string;
  schemaType: 'Recipe' | 'Article';
  isPublic: boolean;
  status: 'publiée';
}

function cleanSlug(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/—|–/g, '-')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function buildRegistry(): CanonicalRecipe[] {
  const recipes: CanonicalRecipe[] = [];
  const usedUrls = new Set<string>();

  // Map sources for fast lookup
  const discoveryMap = new Map(discoveryRecipes.map(r => [r.id, r]));
  const cosmeticsMap = new Map(cosmeticsRecipesFR.map(c => [c.plant_id, c]));
  const culinaryMap = new Map(culinaryDatabaseFR.map(p => [p.plant_id, p]));
  const remediesMap = new Map(remediesData.map(r => [r.recette_id, r]));

  for (const item of auditData as any[]) {
    const id = item.id;
    let slug = '';
    const category: 'culinaire' | 'cosmetique' | 'parcours-guide' = item.category;
    let categorySlug: 'culinaires' | 'cosmetiques' | 'parcours-botaniques' = 'culinaires';
    let categoryLabel = 'Culinaire';

    if (category === 'culinaire') {
      categorySlug = 'culinaires';
      categoryLabel = 'Culinaire';
    } else if (category === 'cosmetique') {
      categorySlug = 'cosmetiques';
      categoryLabel = 'Cosmétique (Usage externe)';
    } else {
      categorySlug = 'parcours-botaniques';
      categoryLabel = 'Parcours botanique guidé';
    }

    // Determine clean slug
    if (id === 'discovery-01') slug = 'infusion-sommeil-profond';
    else if (id === 'discovery-02') slug = 'huile-massage-articulaire';
    else if (id === 'discovery-03') slug = 'serum-visage-eclat-botanique';
    else if (id === 'discovery-04') slug = 'baume-levres-calendula';
    else if (id === 'discovery-05') slug = 'teinture-propolis-maison';
    else if (id === 'discovery-06') slug = 'sirop-sureau-immunite';
    else if (id === 'discovery-07') slug = 'decoction-detox-soutien-hepatique';
    else if (id === 'discovery-08') slug = 'elixir-regulateur-metabolique';
    else if (id === 'discovery-09') slug = 'infusion-drainage-elimination';
    else if (id === 'discovery-10') slug = 'remede-psoriasis-emonctoires-regulation';
    else if (id === 'discovery-11') slug = 'remede-eczema-desamorcage-histaminique';
    else if (id === 'discovery-12') slug = 'soin-alopecie-anti-dht-matrice-folliculaire';
    else {
      // Clean title
      const baseSlug = cleanSlug(item.title);
      slug = baseSlug;
    }

    const canonicalUrl = `/recettes/${categorySlug}/${slug}/`;
    if (usedUrls.has(canonicalUrl)) {
      throw new Error(`Duplicate canonical URL detected: ${canonicalUrl} for id: ${id}`);
    }
    usedUrls.add(canonicalUrl);

    // Build specific ingredients and instructions
    let ingredients: string[] = [];
    let instructions: string[] = item.keySteps || [];
    let summary = item.title;
    let image = '/images/og/gastronomie-botanique-huiles-aromatiques-1200x630.jpg';
    let imageAlt = `${item.title} — Extraction botanique BloomLab`;
    let dosageOrUsage = '';
    let contraindications: string[] = [];
    let bloomNote = '';

    if (id.startsWith('discovery-')) {
      const discId = id.replace('discovery-', '');
      const disc = discoveryMap.get(discId);
      if (disc) {
        summary = disc.description;
        ingredients = disc.ingredients;
        instructions = disc.instructions;
        if (disc.image) image = disc.image;
        if (disc.administration?.mode) {
          dosageOrUsage = `${disc.administration.mode} — ${disc.administration.dailyDose || ''} (${disc.administration.timing || ''})`;
        }
        if (disc.contraindications) contraindications = disc.contraindications;
        if (disc.bloomNote) bloomNote = disc.bloomNote;
      }
    } else if (id.startsWith('cosmetique-')) {
      const cosId = id.replace('cosmetique-', '');
      const cos = cosmeticsMap.get(cosId);
      image = '/images/og/cosmetique-botanique-macerat-huileux-1080x1080.jpg';
      if (cos) {
        summary = cos.cible;
        ingredients = [
          `Phase A : ${cos.plantes.phase_A.nom} (${cos.plantes.phase_A.grammage}) dans ${cos.solvants.phase_A.type}`,
          `Phase B : ${cos.plantes.phase_B.nom} (${cos.plantes.phase_B.grammage}) dans ${cos.solvants.phase_B.type}`
        ];
        if (cos.recette_pas_a_pas?.phase_A_instructions) {
          instructions = [
            ...cos.recette_pas_a_pas.phase_A_instructions,
            ...(cos.recette_pas_a_pas.transition || []),
            ...(cos.recette_pas_a_pas.phase_B_instructions || []),
            ...(cos.recette_pas_a_pas.filtration_et_finition || [])
          ];
        }
        dosageOrUsage = `${cos.mode_utilisation || 'Application cutanée externe'} | Flacon : ${cos.conditionnement || 'Flacon verre ambré'}`;
        bloomNote = cos.synergies_kits_internes || 'Formulation externe optimisée pour la biodisponibilité cutanée sans solvants de synthèse.';
      }
    } else if (id.startsWith('culinaire-')) {
      const parts = id.replace('culinaire-', '').split('-');
      const plantKey = parts[0];
      const prepKey = parts[1] as any;
      const cul = culinaryMap.get(plantKey);
      image = '/images/og/gastronomie-botanique-huiles-aromatiques-1200x630.jpg';
      if (cul) {
        summary = `Extraction gastronomique de ${cul.nom_commun} (${cul.profil_aromatique}). Conçue pour sublimer vos préparations culinaires sans altérer les composés volatils.`;
        const param = cul.parametres_bloomlab[prepKey as keyof typeof cul.parametres_bloomlab];
        if (param) {
          ingredients = [
            `${cul.nom_commun} séché de qualité herboristerie`,
            `Solvant d'extraction : ${param.solvant} (Ratio : ${param.ratio})`
          ];
          instructions = [
            `Placer la matière végétale dans le panier d'infusion de l'extracteur BloomLab®.`,
            `Ajouter le solvant (${param.solvant}) dans la cuve en respectant le ratio ${param.ratio}.`,
            `Lancer le cycle de thermorégulation à ${param.temp} pendant ${param.temps}.`,
            `Filtrer délicatement à l'aide du filtre tamis fin et conditionner dans un flacon propre hermétique.`,
            `Usage conseillé : ${param.usage}.`
          ];
          dosageOrUsage = `En finition dans l'assiette ou en assaisonnement : ${param.usage}.`;
        }
        bloomNote = cul.astuce_chef_bloom;
      }
    } else if (id.startsWith('parcours-')) {
      const remId = id.replace('parcours-', '');
      const rem = remediesMap.get(remId);
      image = '/images/og/extraction-botanique-totum-solvants-1200x630.jpg';
      if (rem) {
        summary = `Atelier d'apprentissage botanique : compréhension du totum de ${rem.plantes.map((p: any) => p.nom_commun).join(', ')} par extraction séquentielle. Contenu éducatif non médical.`;
        ingredients = rem.plantes.map((p: any) => `${p.nom_commun} (${p.nom_latin}) - ${p.partie_utilisee} : ${p.grammage}`);
        instructions = [
          `Préparer les plantes et séparer les phases hydrosolubles et lipophiles selon les directives du panier.`,
          `Phase A : Extraction aqueuse / glycérinée à ${rem.solvants.phase_A.volume} (${rem.solvants.phase_A.type}).`,
          `Phase B : Extraction hydroalcoolique stabilisée à ${rem.solvants.phase_B.volume} (${rem.solvants.phase_B.type}).`,
          `Filtration sous vide partiel et mise en flacon ambré hermétique à l'abri de la lumière.`
        ];
        dosageOrUsage = 'Usage pédagogique et éducatif. Ne pas consommer sans avis préalable d\'un professionnel de santé.';
        bloomNote = 'La méthode BloomLab permet d\'isoler et d\'observer la complémentarité des fractions moléculaires végétales.';
      }
    }

    if (ingredients.length === 0) {
      ingredients = [`${item.title} (parties végétales sélectionnées)`, `Solvant d'extraction adapté BloomLab®`];
    }

    // Determine Schema.org Type:
    // ONLY culinary recipes get 'Recipe'.
    // Cosmetic and guided paths strictly get 'Article'.
    const schemaType: 'Recipe' | 'Article' = category === 'culinaire' ? 'Recipe' : 'Article';

    recipes.push({
      id: item.id,
      slug,
      canonicalUrl,
      title: item.title,
      category,
      categorySlug,
      categoryLabel,
      subcategory: item.subcategory,
      summary,
      image,
      imageAlt,
      ingredientCount: ingredients.length,
      ingredients,
      activeStepCount: instructions.length,
      instructions,
      extractionPhaseCount: item.extractionPhaseCount,
      temperatures: item.temperatures,
      machineTimeMinutes: item.machineTimeMinutes,
      activeTimeMinutes: item.activeTimeMinutes,
      totalTimeMinutes: item.totalTimeMinutes,
      filtrationRequired: item.filtrationRequired,
      assemblyRequired: item.assemblyRequired,
      conservationRequirement: item.conservationRequirement,
      allergensOrPrecautions: item.allergensOrPrecautions || [],
      materialsNeeded: item.materialsNeeded || ['Extracteur BloomLab®', 'Filtre tamis', 'Récipient propre'],
      difficultyCalculatedScore: item.difficultyCalculatedScore,
      difficultyFinalScore: item.difficultyFinalScore,
      difficultyLevel: item.difficultyLevel,
      difficultyLabel: item.difficultyLabel,
      difficultyReason: item.difficultyReason,
      difficultyConfidence: item.difficultyConfidence,
      breakdown: item.breakdown,
      dosageOrUsage,
      contraindications,
      bloomNote,
      datePublished: '2026-09-01T08:00:00+02:00',
      dateModified: '2026-10-05T08:00:00+02:00',
      schemaType,
      isPublic: true,
      status: 'publiée'
    });
  }

  return recipes;
}

const allCanonicalRecipes = buildRegistry();

// Generate TS code
const code = `/**
 * BLOOM BY BOTANIK — REGISTRE CANONIQUE DU CATALOGUE PUBLIC DES RECETTES
 * 
 * Fichier généré automatiquement pour garantir :
 * - 1 URL canonique unique par recette publique
 * - Zéro hash URL pour l'indexation
 * - Parité stricte entre rendu SSR serveur et client React
 * - Typage Recipe Schema.org strictement réservé au culinaire
 * - Typage Article Schema.org pour cosmétiques et parcours botaniques
 */

export interface CanonicalRecipe {
  id: string;
  slug: string;
  canonicalUrl: string;
  title: string;
  category: 'culinaire' | 'cosmetique' | 'parcours-guide';
  categorySlug: 'culinaires' | 'cosmetiques' | 'parcours-botaniques';
  categoryLabel: string;
  subcategory: string;
  summary: string;
  image: string;
  imageAlt: string;
  ingredientCount: number;
  ingredients: string[];
  activeStepCount: number;
  instructions: string[];
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
  difficultyCalculatedScore: number;
  difficultyFinalScore: number;
  difficultyLevel: 1 | 2 | 3 | 4 | 5;
  difficultyLabel: 'Très facile' | 'Facile' | 'Intermédiaire' | 'Avancé' | 'Expert';
  difficultyReason: string;
  difficultyConfidence: 'high' | 'medium' | 'low';
  breakdown: {
    active_steps: number;
    ingredients: number;
    extraction_phases: number;
    thermal_precision: number;
    preparation_precision: number;
    filtration_assembly: number;
    user_attention: number;
    conservation: number;
    safety_handling: number;
  };
  dosageOrUsage?: string;
  contraindications?: string[];
  bloomNote?: string;
  datePublished: string;
  dateModified: string;
  schemaType: 'Recipe' | 'Article';
  isPublic: boolean;
  status: 'publiée';
}

export const CANONICAL_RECIPES: CanonicalRecipe[] = ${JSON.stringify(allCanonicalRecipes, null, 2)};

export const RECIPES_BY_URL: Record<string, CanonicalRecipe> = {};
export const RECIPES_BY_ID: Record<string, CanonicalRecipe> = {};
export const RECIPES_BY_CATEGORY: Record<string, CanonicalRecipe[]> = {
  culinaire: [],
  cosmetique: [],
  'parcours-guide': []
};

CANONICAL_RECIPES.forEach(r => {
  RECIPES_BY_URL[r.canonicalUrl] = r;
  // Also register without trailing slash for robust lookup
  RECIPES_BY_URL[r.canonicalUrl.replace(/\\/$/, '')] = r;
  RECIPES_BY_ID[r.id] = r;
  RECIPES_BY_CATEGORY[r.category].push(r);
});

export function getRecipeByPath(reqPath: string): CanonicalRecipe | undefined {
  const clean = reqPath.endsWith('/') ? reqPath : reqPath + '/';
  return RECIPES_BY_URL[clean] || RECIPES_BY_URL[reqPath];
}

export function getCategoryRecipes(category: 'culinaire' | 'cosmetique' | 'parcours-guide'): CanonicalRecipe[] {
  return RECIPES_BY_CATEGORY[category] || [];
}

export const CATEGORY_METADATA = {
  culinaires: {
    id: 'culinaire' as const,
    slug: 'culinaires' as const,
    url: '/recettes/culinaires/',
    title: 'Recettes culinaires botaniques | Extraction gastronomique Bloom',
    h1: 'Recettes culinaires botaniques',
    metaDescription: 'Découvrez nos recettes culinaires d\\'extraction végétale : huiles aromatiques, vinaigres botaniques, miels infusés et beurres gastronomiques à réaliser avec BloomLab®.',
    intro: 'L\\'extraction végétale au service de la haute gastronomie maison. Découvrez comment concentrer le profil aromatique intact des herbes aromatiques, racines et épices grâce au contrôle micrométrique des températures et des temps de contact. Des huiles de finition aux vinaigres vivants, nos formulations culinaires respectent l\\'intégrité des molécules thermo-sensibles pour sublimer votre cuisine quotidienne sans aucun arôme de synthèse ni surchauffe des corps gras.',
    totalRecipes: RECIPES_BY_CATEGORY.culinaire.length,
    pageSize: 24
  },
  cosmetiques: {
    id: 'cosmetique' as const,
    slug: 'cosmetiques' as const,
    url: '/recettes/cosmetiques/',
    title: 'Recettes cosmétiques botaniques (Usage externe) | Soins maison Bloom',
    h1: 'Recettes cosmétiques botaniques',
    metaDescription: 'Formulations cosmétiques botaniques pour usage externe : sérums, huiles de soin, baumes et macérats actifs réalisés à froid ou basse température avec BloomLab®.',
    intro: 'La puissance des principes actifs botaniques appliquée au soin externe de la peau et des cheveux. Grâce à l\\'extraction séquentielle bi-phase, libérez les acides boswelliques, flavonoïdes et mucilages protecteurs directement dans vos solvants nobles (huiles vierges, glycérine végétale, eau purifiée). Toutes les formulations sont conçues exclusivement pour un usage externe, formulées sans conservateurs agressifs et adaptées à chaque typologie cutanée.',
    totalRecipes: RECIPES_BY_CATEGORY.cosmetique.length,
    pageSize: 24
  },
  'parcours-botaniques': {
    id: 'parcours-guide' as const,
    slug: 'parcours-botaniques' as const,
    url: '/recettes/parcours-botaniques/',
    title: 'Parcours botaniques guidés | Ateliers & apprentissage Bloom',
    h1: 'Parcours botaniques guidés',
    metaDescription: 'Ateliers et séquences d\\'apprentissage technique pour maîtriser l\\'herboristerie moderne et l\\'extraction du totum végétal à domicile avec BloomLab®.',
    intro: 'Séquences éducatives et ateliers techniques pour explorer en profondeur l\\'ingénierie du végétal et les méthodes d\\'extraction traditionnelles modernisées. Ces parcours d\\'apprentissage vous guident pas à pas dans la manipulation des solvants multiples, la cinétique d\\'agitation vortex et les protocoles de conservation. Vocation strictement éducative et technique : ces ateliers ne constituent aucun protocole médical ni traitement.',
    totalRecipes: RECIPES_BY_CATEGORY['parcours-guide'].length,
    pageSize: 24
  }
};
`;

fs.writeFileSync(path.join(process.cwd(), 'src/data/canonicalRecipesRegistry.ts'), code, 'utf-8');
console.log(`Generated src/data/canonicalRecipesRegistry.ts with ${allCanonicalRecipes.length} recipes.`);
