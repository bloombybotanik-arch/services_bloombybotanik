/**
 * Bloom Systemic Mapping: 4 Architectures, 7 Terrains, 9 Axes
 * Standardizes all plant and recipe categorizations into the canonical Bloom model.
 */

export interface SystemicProfile {
  architectures: ('SRA' | 'HPA' | 'Fascia' | 'SEC')[];
  terrains: string[]; // e.g. 'T1 : Digestion & microbiome'
  axes: string[]; // e.g. 'A1 : Émonctoires & Élimination'
}

export const CANONICAL_ARCHITECTURES = [
  { id: 'SRA', name: 'Le SRA', subtitle: "Chef d'Orchestre Universel (Système Rénine-Angiotensine)" },
  { id: 'HPA', name: "L'Axe HPA", subtitle: "L'Exécutif du Stress (Hypothalamo-Hypophyso-Surrénalien)" },
  { id: 'Fascia', name: 'Le Fascia', subtitle: "La Mémoire du Corps & Interstitium" },
  { id: 'SEC', name: 'Le SEC', subtitle: "Thermostat Synaptique (Système EndoCannabinoïde)" }
] as const;

export const CANONICAL_TERRAINS = [
  { code: 'T1', title: 'T1 : Digestion & microbiome', desc: 'Intestin, barrière et diversité végétale' },
  { code: 'T2', title: 'T2 : Énergie & vitalité', desc: 'Mitochondries, ATP et métabolisme' },
  { code: 'T3', title: 'T3 : Immunité & protection', desc: 'Défense innée, surveillance et tolérance' },
  { code: 'T4', title: 'T4 : Détoxication hépatique', desc: 'Foie, phases de conjugaison et bile' },
  { code: 'T5', title: 'T5 : Métabolisme & insuline', desc: 'Sensibilité insulinique et équilibre glucidique' },
  { code: 'T6', title: 'T6 : Émonctoires & drainage', desc: 'Reins, lymphe, peau et élimination' },
  { code: 'T7', title: 'T7 : Neuro-endocrinien & stress', desc: 'Axe HPA, sommeil profond et sérénité' }
] as const;

export const CANONICAL_AXES = [
  { code: 'A1', title: 'A1 : Émonctoires & Élimination', target: 'Foie, Reins, Intestins, Peau, Poumons' },
  { code: 'A2', title: 'A2 : Barrière intestinale & Jonctions serrées', target: 'Entérocytes, Mucus, Occludines' },
  { code: 'A3', title: 'A3 : Axe HPA & Neuro-surrénalien', target: 'Hypothalamus, Surrénales, Cortisol' },
  { code: 'A4', title: 'A4 : Cascade de l’inflammation & Résolution', target: 'NF-kB, SPMs, Cytokines' },
  { code: 'A5', title: 'A5 : Énergie cellulaire & Mitochondries', target: 'Synthèse ATP, Stress oxydatif' },
  { code: 'A6', title: 'A6 : Système nerveux autonome & Tonus vagal', target: 'Nerf Vague, Parasympathique' },
  { code: 'A7', title: 'A7 : Matrice extracellulaire & Fascia', target: 'Collagène, Ténségrité, Interstitium' },
  { code: 'A8', title: 'A8 : Système EndoCannabinoïde (SEC)', target: 'Récepteurs CB1/CB2, Anandamide' },
  { code: 'A9', title: 'A9 : Flexibilité métabolique & Insuline', target: 'AMPK / mTOR, Glycémie' }
] as const;

/**
 * Returns canonical 4 architectures, 7 terrains, and 9 axes for any plant or recipe.
 */
export function getPlantSystemicProfile(
  plantNameOrId: string = '',
  rawTerrains: string[] = []
): SystemicProfile {
  const name = plantNameOrId.toLowerCase();
  const rawJoined = rawTerrains.join(' ').toLowerCase();

  const archs = new Set<'SRA' | 'HPA' | 'Fascia' | 'SEC'>();
  const terrains = new Set<string>();
  const axes = new Set<string>();

  // Default baseline
  archs.add('SRA');

  // HPA indicators
  if (
    name.includes('ashwagandha') ||
    name.includes('rhodiola') ||
    name.includes('valériane') ||
    name.includes('valeriane') ||
    name.includes('passiflore') ||
    name.includes('mélisse') ||
    name.includes('melisse') ||
    name.includes('éleuthérocoque') ||
    name.includes('eleutherocoque') ||
    name.includes('ginseng') ||
    name.includes('basilic') ||
    rawJoined.includes('stress') ||
    rawJoined.includes('hpa') ||
    rawJoined.includes('sommeil')
  ) {
    archs.add('HPA');
    terrains.add('T7 : Neuro-endocrinien & stress');
    axes.add('A3 : Axe HPA & Neuro-surrénalien');
    axes.add('A6 : Système nerveux autonome & Tonus vagal');
  }

  // SEC (Endocannabinoid) indicators
  if (
    name.includes('chanvre') ||
    name.includes('cbd') ||
    name.includes('passiflore') ||
    name.includes('mélisse') ||
    name.includes('poivre noir') ||
    name.includes('curcuma') ||
    name.includes('arnica') ||
    name.includes('hélichryse') ||
    name.includes('helichryse') ||
    rawJoined.includes('sec') ||
    rawJoined.includes('douleur') ||
    rawJoined.includes('endocannabinoïde')
  ) {
    archs.add('SEC');
    axes.add('A8 : Système EndoCannabinoïde (SEC)');
  }

  // Fascia & ECM indicators
  if (
    name.includes('prêle') ||
    name.includes('prele') ||
    name.includes('ortie') ||
    name.includes('bambou') ||
    name.includes('arnica') ||
    name.includes('hélichryse') ||
    name.includes('helichryse') ||
    name.includes('calendula') ||
    name.includes('jojoba') ||
    name.includes('rose') ||
    name.includes('reine des prés') ||
    rawJoined.includes('fascia') ||
    rawJoined.includes('articulaire') ||
    rawJoined.includes('peau')
  ) {
    archs.add('Fascia');
    axes.add('A7 : Matrice extracellulaire & Fascia');
    if (!terrains.has('T6 : Émonctoires & drainage')) {
      terrains.add('T6 : Émonctoires & drainage');
    }
  }

  // T1 : Digestion & microbiome
  if (
    name.includes('camomille') ||
    name.includes('mauve') ||
    name.includes('guimauve') ||
    name.includes('plantain') ||
    name.includes('propolis') ||
    name.includes('fenouil') ||
    name.includes('menthe') ||
    rawJoined.includes('intestin') ||
    rawJoined.includes('microbiome') ||
    rawJoined.includes('digestion')
  ) {
    terrains.add('T1 : Digestion & microbiome');
    axes.add('A2 : Barrière intestinale & Jonctions serrées');
  }

  // T2 : Énergie & vitalité (Mitochondries)
  if (
    name.includes('cordyceps') ||
    name.includes('ginseng') ||
    name.includes('spiruline') ||
    name.includes('maca') ||
    name.includes('shilajit') ||
    name.includes('coq10') ||
    rawJoined.includes('énergie') ||
    rawJoined.includes('energie') ||
    rawJoined.includes('mitochondrie') ||
    rawJoined.includes('vitalité')
  ) {
    terrains.add('T2 : Énergie & vitalité');
    axes.add('A5 : Énergie cellulaire & Mitochondries');
  }

  // T3 : Immunité & protection
  if (
    name.includes('chaga') ||
    name.includes('reishi') ||
    name.includes('sureau') ||
    name.includes('échinacée') ||
    name.includes('echinacee') ||
    name.includes('propolis') ||
    name.includes('astragale') ||
    rawJoined.includes('immunité') ||
    rawJoined.includes('immunite')
  ) {
    terrains.add('T3 : Immunité & protection');
    axes.add('A4 : Cascade de l’inflammation & Résolution');
  }

  // T4 : Détoxication hépatique
  if (
    name.includes('artichaut') ||
    name.includes('chardon') ||
    name.includes('romarin') ||
    name.includes('desmodium') ||
    name.includes('fumeterre') ||
    name.includes('radis') ||
    name.includes('chrysanthellum') ||
    rawJoined.includes('foie') ||
    rawJoined.includes('hépatique') ||
    rawJoined.includes('bile')
  ) {
    terrains.add('T4 : Détoxication hépatique');
    axes.add('A1 : Émonctoires & Élimination');
  }

  // T5 : Métabolisme & insuline
  if (
    name.includes('fenugrec') ||
    name.includes('berbérine') ||
    name.includes('berberine') ||
    name.includes('épine-vinette') ||
    name.includes('cannelle') ||
    name.includes('gymnema') ||
    name.includes('gingembre') ||
    rawJoined.includes('métabolisme') ||
    rawJoined.includes('glycémie') ||
    rawJoined.includes('insul')
  ) {
    terrains.add('T5 : Métabolisme & insuline');
    axes.add('A9 : Flexibilité métabolique & Insuline');
  }

  // T6 : Émonctoires & drainage
  if (
    name.includes('pissenlit') ||
    name.includes('bardane') ||
    name.includes('orthosiphon') ||
    name.includes('piloselle') ||
    name.includes('bouleau') ||
    name.includes('pensée sauvage') ||
    name.includes('mahonia') ||
    rawJoined.includes('émonctoire') ||
    rawJoined.includes('drainage') ||
    rawJoined.includes('élimination')
  ) {
    terrains.add('T6 : Émonctoires & drainage');
    axes.add('A1 : Émonctoires & Élimination');
  }

  // Ensure minimum fallbacks so every item has coherent representation
  if (terrains.size === 0) {
    terrains.add('T1 : Digestion & microbiome');
  }
  if (axes.size === 0) {
    axes.add('A1 : Émonctoires & Élimination');
  }

  return {
    architectures: Array.from(archs),
    terrains: Array.from(terrains),
    axes: Array.from(axes)
  };
}
