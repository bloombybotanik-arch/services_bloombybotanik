import { 
  lexiqueDefinitions, 
  LexiqueDefinition, 
  LexiqueCategory,
  CATEGORIES_LABELS 
} from './lexiqueDefinitions';

export type LexiqueTermKey = string;

export interface LexiqueLinkedPage {
  title: string;
  url: string;
  view?: string;
}

export interface LexiqueEntry {
  slug: string;
  terme: string;
  tooltip: string; // <= 140 caractères pour aperçu rapide
  definitionNovice: string; // alias de definitionSimple
  definitionSimple: string;
  definitionExperte: string;
  metaphore: string; // alias d'analogie
  analogie: string;
  niveauPreuve: 1 | 2 | 3 | 4 | 5;
  references: string;
  categorie: LexiqueCategory;
  linkedPages: LexiqueLinkedPage[];
}

/**
 * Mapping des pages recommandées par catégorie ou slug
 */
function getLinkedPagesForEntry(id: string, categorie: LexiqueCategory): LexiqueLinkedPage[] {
  switch (id) {
    case 'charge-allostatique':
      return [
        { title: "Le Manifeste Fondateur", url: "/manifeste/", view: "manifeste" },
        { title: "Protocole Reset Homéostatique", url: "/phytotherapie-reset/", view: "phytotherapie-reset" },
        { title: "Évaluation du Terrain", url: "/chat", view: "chat" }
      ];
    case 'homeostasie':
    case 'allostasie':
      return [
        { title: "Le Manifeste Fondateur", url: "/manifeste/", view: "manifeste" },
        { title: "Le Reset Homéostatique", url: "/phytotherapie-reset/", view: "phytotherapie-reset" },
        { title: "L'extracteur BloomLab", url: "/produit/bloomlab/", view: "machine" }
      ];
    case 'totum':
      return [
        { title: "Comprendre le Totum végétal", url: "/totum-vegetal/", view: "totum-vegetal" },
        { title: "Extraction Botanique de pointe", url: "/extraction-botanique/", view: "extraction-botanique" },
        { title: "L'extracteur BloomLab", url: "/produit/bloomlab/", view: "machine" }
      ];
    case 'sequencage-ab':
      return [
        { title: "L'extracteur BloomLab", url: "/produit/bloomlab/", view: "machine" },
        { title: "Méthode d'infusion de précision", url: "/infusion-precision/", view: "infusion-precision" },
        { title: "Extraction Botanique", url: "/extraction-botanique/", view: "extraction-botanique" }
      ];
    case 'emonctoires':
    case 'binder-adsorbant':
    case 'jarisch-herxheimer':
      return [
        { title: "Le Protocole Reset Homéostatique", url: "/phytotherapie-reset/", view: "phytotherapie-reset" },
        { title: "Protocole Psoriasis & Terrain", url: "/phytotherapie-reset/protocole-psoriasis/", view: "protocole-psoriasis" },
        { title: "L'Herbier des plantes", url: "/herbier/", view: "herbier" }
      ];
    case 'axe-hpa':
    case 'cortisol':
    case 'adaptogenes':
      return [
        { title: "Guide des Plantes Adaptogènes", url: "/plantes-adaptogenes/", view: "plantes-adaptogenes" },
        { title: "Protocole Reset Homéostatique", url: "/phytotherapie-reset/", view: "phytotherapie-reset" },
        { title: "Boutique Botanique", url: "/boutique/", view: "boutique" }
      ];
    default:
      if (categorie === 'phytochimie' || categorie === 'galenique-extraction') {
        return [
          { title: "L'Herbier Scientifique", url: "/herbier/", view: "herbier" },
          { title: "Extraction Botanique", url: "/extraction-botanique/", view: "extraction-botanique" },
          { title: "L'extracteur BloomLab", url: "/produit/bloomlab/", view: "machine" }
        ];
      }
      return [
        { title: "Le Manifeste Fondateur", url: "/manifeste/", view: "manifeste" },
        { title: "Protocole Reset Homéostatique", url: "/phytotherapie-reset/", view: "phytotherapie-reset" },
        { title: "Le Lexique complet", url: "/lexique/", view: "lexique" }
      ];
  }
}

// Convert canonical definitions into LexiqueEntry
export const lexique: Record<string, LexiqueEntry> = {};

lexiqueDefinitions.forEach((def) => {
  const tooltipText = def.definitionSimple.length > 140 
    ? def.definitionSimple.slice(0, 137) + '...' 
    : def.definitionSimple;

  const entry: LexiqueEntry = {
    slug: def.id,
    terme: def.terme,
    tooltip: tooltipText,
    definitionNovice: def.definitionSimple,
    definitionSimple: def.definitionSimple,
    definitionExperte: def.definitionExperte,
    metaphore: def.analogie,
    analogie: def.analogie,
    niveauPreuve: def.niveauPreuve || 5,
    references: def.references || 'Corpus Scientifique Bloom by BotaniK',
    categorie: def.categorie,
    linkedPages: getLinkedPagesForEntry(def.id, def.categorie)
  };

  lexique[def.id] = entry;

  // Add aliases / variants for quick indexing
  if (def.variantes) {
    def.variantes.forEach((v) => {
      const normalizedKey = v.toLowerCase().trim();
      if (!lexique[normalizedKey]) {
        lexique[normalizedKey] = entry;
      }
    });
  }
});

// Backward compatibility legacy slugs
const legacyAliases: Record<string, string> = {
  'polyphenols': 'polyphenols-flavonoides',
  'adaptogene': 'adaptogenes',
  'thermolabile': 'sequencage-ab',
  'synergie': 'totum',
  'terroir': 'terrain',
  'xenohormese': 'adaptogenes',
  'hydrosoluble': 'sequencage-ab'
};

Object.entries(legacyAliases).forEach(([legacySlug, targetId]) => {
  if (lexique[targetId] && !lexique[legacySlug]) {
    lexique[legacySlug] = lexique[targetId];
  }
});

// Explicit list of unique entries for Lexique view
export const lexiqueEntriesList: LexiqueEntry[] = lexiqueDefinitions.map((def) => lexique[def.id]);

/**
 * Recherche robuste d'un terme dans le lexique (par slug, terme exact ou variante)
 */
export function findLexiqueEntry(termOrSlug: string): LexiqueEntry | undefined {
  if (!termOrSlug) return undefined;
  const clean = termOrSlug.toLowerCase().trim();

  // 1. Direct key match
  if (lexique[clean]) return lexique[clean];

  // 2. Slug without accents/hyphens
  const slugified = clean.replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
  if (lexique[slugified]) return lexique[slugified];

  // 3. Search in entries
  return lexiqueEntriesList.find(
    (e) =>
      e.slug === clean ||
      e.terme.toLowerCase() === clean ||
      e.terme.toLowerCase().includes(clean)
  );
}

export { CATEGORIES_LABELS };
