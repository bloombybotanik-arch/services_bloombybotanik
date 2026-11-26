import { Language } from '../translations';
import { View, VIEW_PATHS } from '../types';

export type NavIconKey =
  | 'home'
  | 'heart'
  | 'sparkles'
  | 'utensils'
  | 'droplets'
  | 'flask'
  | 'book'
  | 'leaf'
  | 'package'
  | 'bag'
  | 'star'
  | 'compass'
  | 'newspaper'
  | 'help'
  | 'message'
  | 'graduation'
  | 'layers'
  | 'activity'
  | 'microscope';

export interface LocalizedText {
  fr: string;
  en: string;
  de: string;
}

export interface NavLeafItem {
  id: string;
  kind: 'link';
  label: LocalizedText;
  title?: LocalizedText;
  view: View;
  param?: string;
  href: string;
  icon?: NavIconKey;
  activeViews?: View[];
  badge?: LocalizedText;
  badgeTone?: 'abo' | 'free' | 'new' | 'pedagogy' | 'provisional';
  locked?: boolean;
  highlightGold?: boolean;
  isSubtle?: boolean;
  scrollTargetId?: string;
  treePrefix?: '├──' | '└──' | '├─' | '└─';
}

export interface NavGroupItem {
  id: string;
  kind: 'group';
  label: LocalizedText;
  title?: LocalizedText;
  /** Optional navigation target when the group header itself links to an existing page (distinct sibling link + toggle button). */
  view?: View;
  param?: string;
  href?: string;
  activeViews?: View[];
  icon?: NavIconKey;
  locked?: boolean;
  defaultOpen?: boolean;
  children: Array<NavLeafItem | NavGroupItem>;
}

export type NavNode = NavLeafItem | NavGroupItem;

export interface NavSection {
  id: string;
  heading?: LocalizedText;
  items: NavNode[];
}

export function getText(text: LocalizedText, lang: Language): string {
  return text[lang] || text.fr;
}

export function isNavItemActive(
  item: { view?: View; param?: string; activeViews?: View[]; href?: string; scrollTargetId?: string },
  currentView: View,
  pathname?: string
): boolean {
  if (item.scrollTargetId) {
    return false;
  }
  if (item.view === 'product-detail' && item.param) {
    if (currentView !== 'product-detail') return false;
    if (pathname) {
      return pathname.startsWith(`/boutique/${item.param}`);
    }
    return false;
  }
  if (item.activeViews && item.activeViews.includes(currentView)) {
    return true;
  }
  return Boolean(item.view && currentView === item.view);
}

export function hasActiveDescendant(
  node: NavNode,
  currentView: View,
  pathname?: string
): boolean {
  if (node.kind === 'link') {
    return isNavItemActive(node, currentView, pathname);
  }
  if (isNavItemActive(node, currentView, pathname)) {
    return true;
  }
  return node.children.some((child) => hasActiveDescendant(child, currentView, pathname));
}

export const NAVIGATION_SECTIONS: NavSection[] = [
  // 1. ACCUEIL
  {
    id: 'section-accueil',
    items: [
      {
        id: 'nav-accueil',
        kind: 'link',
        label: { fr: 'Accueil', en: 'Home', de: 'Startseite' },
        view: 'indexbis',
        href: '/',
        icon: 'home',
        activeViews: ['indexbis', 'home'],
      },
    ],
  },

  // 2. DÉCOUVRIR BLOOM
  {
    id: 'section-decouvrir',
    heading: {
      fr: 'DÉCOUVRIR BLOOM',
      en: 'DISCOVER BLOOM',
      de: 'BLOOM ENTDECKEN',
    },
    items: [
      {
        id: 'nav-histoire',
        kind: 'link',
        label: {
          fr: 'Histoire & philosophie',
          en: 'Story & philosophy',
          de: 'Geschichte & Philosophie',
        },
        view: 'la-marque',
        href: VIEW_PATHS['la-marque'],
        icon: 'heart',
        activeViews: ['la-marque', 'manifeste'],
      },
      {
        id: 'nav-bloomlab-presentation',
        kind: 'link',
        label: {
          fr: 'BloomLab : présentation de l’appareil',
          en: 'BloomLab: device overview',
          de: 'BloomLab: Geräteübersicht',
        },
        view: 'machine',
        href: VIEW_PATHS['bloomlab'],
        icon: 'sparkles',
        activeViews: ['machine', 'bloomlab'],
      },
    ],
  },

  // 3. PRÉPARATIONS
  {
    id: 'section-preparations',
    heading: {
      fr: 'PRÉPARATIONS',
      en: 'PREPARATIONS',
      de: 'ZUBEREITUNGEN',
    },
    items: [
      {
        id: 'group-cuisine-botanique',
        kind: 'group',
        label: {
          fr: 'Cuisine botanique',
          en: 'Botanical cuisine',
          de: 'Botanische Küche',
        },
        view: 'culinaire',
        href: VIEW_PATHS['culinaire'],
        icon: 'utensils',
        activeViews: ['culinaire', 'gastronomie-botanique'],
        defaultOpen: true,
        children: [
          {
            id: 'nav-infusions-culinaires',
            kind: 'link',
            label: {
              fr: 'Infusions & préparations culinaires',
              en: 'Infusions & culinary preparations',
              de: 'Aufgüsse & kulinarische Zubereitungen',
            },
            view: 'culinaire',
            href: VIEW_PATHS['culinaire'],
            icon: 'utensils',
            activeViews: ['culinaire', 'gastronomie-botanique'],
          },
          {
            id: 'group-recettes-culinaires',
            kind: 'group',
            label: {
              fr: 'Recettes',
              en: 'Recipes',
              de: 'Rezepte',
            },
            view: 'recettes-culinaires',
            href: VIEW_PATHS['recettes-culinaires'],
            icon: 'book',
            activeViews: ['recettes-culinaires', 'recettes-gastronomie'],
            defaultOpen: true,
            children: [
              {
                id: 'nav-soupe-tremella',
                kind: 'link',
                label: {
                  fr: 'Soupe au trémella',
                  en: 'Tremella beauty soup',
                  de: 'Tremella-Suppe',
                },
                view: 'recette-soupe-tremella',
                href: VIEW_PATHS['recette-soupe-tremella'],
                icon: 'sparkles',
                activeViews: ['recette-soupe-tremella'],
              },
            ],
          },
        ],
      },
      {
        id: 'group-cosmetique-maison',
        kind: 'group',
        label: {
          fr: 'Cosmétique maison',
          en: 'Homemade cosmetics',
          de: 'Naturkosmetik DIY',
        },
        view: 'cosmetiques',
        href: VIEW_PATHS['cosmetiques'],
        icon: 'droplets',
        activeViews: ['cosmetiques', 'cosmetique-botanique', 'cosmetiques-naturels-diy'],
        defaultOpen: true,
        children: [
          {
            id: 'nav-huiles-macerats',
            kind: 'link',
            label: {
              fr: 'Huiles & macérats',
              en: 'Oils & macerates',
              de: 'Öle & Mazerate',
            },
            view: 'huile-infusee',
            href: VIEW_PATHS['huile-infusee'],
            icon: 'droplets',
            activeViews: ['huile-infusee', 'maceration-plantes'],
          },
          {
            id: 'nav-recettes-soins',
            kind: 'link',
            label: {
              fr: 'Recettes de soins',
              en: 'Skincare recipes',
              de: 'Pflegerezepte',
            },
            view: 'recettes-cosmetiques',
            href: VIEW_PATHS['recettes-cosmetiques'],
            icon: 'sparkles',
            activeViews: ['recettes-cosmetiques'],
          },
        ],
      },
      {
        id: 'nav-toutes-preparations',
        kind: 'link',
        label: {
          fr: 'Voir toutes les préparations',
          en: 'View all preparations',
          de: 'Alle Zubereitungen ansehen',
        },
        view: 'recettes',
        href: VIEW_PATHS['recettes'],
        icon: 'book',
        activeViews: [
          'recettes',
          'recettes-hub',
          'recettes-parcours',
          'recettes-phytotherapie',
        ],
      },
    ],
  },

  // 4. MÉTHODES D’EXTRACTION
  {
    id: 'section-methodes',
    heading: {
      fr: 'MÉTHODES D’EXTRACTION',
      en: 'EXTRACTION METHODS',
      de: 'EXTRAKTIONSMETHODEN',
    },
    items: [
      {
        id: 'nav-infusion-botanique',
        kind: 'link',
        label: {
          fr: 'Infusion botanique',
          en: 'Botanical infusion',
          de: 'Botanische Infusion',
        },
        view: 'infusion-botanique',
        href: VIEW_PATHS['infusion-botanique'],
        icon: 'flask',
        activeViews: [
          'infusion-botanique',
          'infusion-botanique-maison-comment-ca-marche',
          'infusion-precision',
          'qu-est-ce-que-infusion',
        ],
      },
      {
        id: 'nav-extraction-vegetale',
        kind: 'link',
        label: {
          fr: 'Extraction végétale',
          en: 'Plant extraction',
          de: 'Pflanzenextraktion',
        },
        view: 'guide-complet',
        href: VIEW_PATHS['guide-complet'],
        icon: 'book',
        activeViews: [
          'guide-complet',
          'pillar-extraction',
          'extraction-botanique',
          'guide-complet-extraction-botanique-maison',
          'guide',
        ],
      },
      {
        id: 'nav-teintures-solvants',
        kind: 'link',
        label: {
          fr: 'Teintures & solvants',
          en: 'Tinctures & solvents',
          de: 'Tinkturen & Lösungsmittel',
        },
        view: 'guide-solvants',
        href: VIEW_PATHS['guide-solvants'],
        icon: 'droplets',
        activeViews: ['guide-solvants', 'solvants-extraction', 'teinture-mere'],
      },
    ],
  },

  // 5. BOUTIQUE
  {
    id: 'section-boutique',
    heading: {
      fr: 'BOUTIQUE',
      en: 'STORE',
      de: 'SHOP',
    },
    items: [
      {
        id: 'nav-store-bloomlab',
        kind: 'link',
        label: {
          fr: 'BloomLab — Extracteur botanique',
          en: 'BloomLab — Botanical extractor',
          de: 'BloomLab — Botanischer Extraktor',
        },
        view: 'product-detail',
        param: 'bloomlab',
        href: '/boutique/bloomlab/',
        icon: 'sparkles',
      },
      {
        id: 'nav-store-kits',
        kind: 'link',
        label: {
          fr: 'Soins botaniques',
          en: 'Botanical care',
          de: 'Botanische Pflege',
        },
        view: 'boutique-kits',
        href: VIEW_PATHS['boutique-kits'],
        icon: 'package',
        activeViews: ['boutique-kits', 'kits-botaniques'],
      },
      {
        id: 'nav-store-accessoires',
        kind: 'link',
        label: {
          fr: 'Accessoires',
          en: 'Accessories',
          de: 'Zubehör',
        },
        view: 'boutique',
        href: VIEW_PATHS['boutique'],
        icon: 'bag',
        activeViews: ['boutique'],
      },
      {
        id: 'nav-store-argiles',
        kind: 'link',
        label: {
          fr: 'Argiles & liants',
          en: 'Clays & binders',
          de: 'Tonerden & Bindemittel',
        },
        view: 'product-detail',
        param: 'duo-argiles',
        href: '/boutique/duo-argiles/',
        icon: 'leaf',
      },
      {
        id: 'nav-store-abonnements',
        kind: 'link',
        label: {
          fr: 'Abonnements',
          en: 'Subscriptions',
          de: 'Abonnements',
        },
        title: {
          fr: 'Abonnements numériques',
          en: 'Digital subscriptions',
          de: 'Digitale Abonnements',
        },
        view: 'abonnement',
        href: VIEW_PATHS['abonnement'],
        icon: 'star',
        badge: { fr: 'Abo', en: 'Sub', de: 'Abo' },
        badgeTone: 'abo',
        activeViews: ['abonnement', 'premium-info', 'abonnements-numeriques'],
      },
    ],
  },

  // 6. RESSOURCES
  {
    id: 'section-ressources',
    heading: {
      fr: 'RESSOURCES',
      en: 'RESOURCES',
      de: 'RESSOURCEN',
    },
    items: [
      {
        id: 'nav-guides-debuter',
        kind: 'link',
        label: {
          fr: 'Guides pour débuter',
          en: 'Beginner guides',
          de: 'Einsteiger-Leitfäden',
        },
        title: {
          fr: 'Soins Botaniques Maison : Guide Pratique pour Débutants',
          en: 'Home Botanical Care: Practical Guide for Beginners',
          de: 'Botanische Hauspflege: Praxisleitfaden für Einsteiger',
        },
        view: 'remedes-naturels-maison-guide',
        href: VIEW_PATHS['remedes-naturels-maison-guide'],
        icon: 'compass',
        activeViews: ['remedes-naturels-maison-guide', 'remedes-naturels'],
      },
      {
        id: 'nav-herbier',
        kind: 'link',
        label: {
          fr: 'Herbier',
          en: 'Herbarium',
          de: 'Herbarium',
        },
        view: 'herbier',
        href: VIEW_PATHS['herbier'],
        icon: 'book',
        activeViews: ['herbier', 'library', 'herbarium'],
      },
      {
        id: 'group-ingredients-extraits',
        kind: 'group',
        label: {
          fr: 'Ingrédients & extraits',
          en: 'Ingredients & extracts',
          de: 'Inhaltsstoffe & Extrakte',
        },
        icon: 'flask',
        defaultOpen: true,
        children: [
          {
            id: 'nav-phycocyanine-doc',
            kind: 'link',
            label: {
              fr: 'Phycocyanine',
              en: 'Phycocyanin',
              de: 'Phycocyanin',
            },
            title: {
              fr: 'Fiche documentaire d’extraction : Phycocyanine de spiruline',
              en: 'Documentary extraction guide: Spirulina Phycocyanin',
              de: 'Dokumentationsleitfaden: Spirulina-Phycocyanin',
            },
            view: 'recette-phycocyanine',
            href: VIEW_PATHS['recette-phycocyanine'],
            icon: 'flask',
            activeViews: ['recette-phycocyanine'],
          },
        ],
      },
      {
        id: 'group-lexique',
        kind: 'group',
        label: {
          fr: 'Lexique',
          en: 'Glossary',
          de: 'Glossar',
        },
        view: 'lexique',
        href: VIEW_PATHS['lexique'],
        icon: 'book',
        activeViews: ['lexique'],
        defaultOpen: true,
        children: [
          {
            id: 'nav-totum-vegetal',
            kind: 'link',
            label: {
              fr: 'Totum végétal',
              en: 'Plant Totum',
              de: 'Pflanzen-Totum',
            },
            view: 'totum-vegetal',
            href: VIEW_PATHS['totum-vegetal'],
            icon: 'leaf',
            activeViews: ['totum-vegetal', 'totum-definition', 'totum-vegetal-comprendre'],
          },
        ],
      },
      {
        id: 'nav-tous-articles',
        kind: 'link',
        label: {
          fr: 'Tous les articles',
          en: 'All articles',
          de: 'Alle Artikel',
        },
        view: 'articles',
        href: VIEW_PATHS['articles'],
        icon: 'newspaper',
        activeViews: ['articles', 'blog', 'blog-vieillissement-myeline'],
      },
      {
        id: 'nav-bibliotheque',
        kind: 'link',
        label: {
          fr: 'Bibliothèque scientifique',
          en: 'Scientific library',
          de: 'Wissenschaftliche Bibliothek',
        },
        view: 'library-landing',
        href: VIEW_PATHS['library-landing'],
        icon: 'microscope',
        activeViews: ['library-landing', 'bibliotheque'],
      },
      {
        id: 'nav-faq',
        kind: 'link',
        label: {
          fr: 'Questions fréquentes',
          en: 'FAQ',
          de: 'Häufige Fragen',
        },
        view: 'faq',
        href: VIEW_PATHS['faq'],
        icon: 'help',
        activeViews: ['faq', 'questions-frequentes'],
      },
      {
        id: 'nav-contact',
        kind: 'link',
        label: {
          fr: 'Nous contacter',
          en: 'Contact us',
          de: 'Kontakt',
        },
        view: 'contact',
        href: VIEW_PATHS['contact'],
        icon: 'message',
        activeViews: ['contact'],
      },
    ],
  },

  // 7. ACADÉMIE
  {
    id: 'section-academie',
    items: [
      {
        id: 'group-academie',
        kind: 'group',
        label: {
          fr: 'Académie',
          en: 'Academy',
          de: 'Akademie',
        },
        title: {
          fr: 'Accéder à Bloom Académie',
          en: 'Go to Bloom Academy',
          de: 'Zur Bloom Akademie',
        },
        view: 'academie',
        href: VIEW_PATHS['academie'],
        icon: 'graduation',
        activeViews: ['academie'],
        defaultOpen: false,
        children: [
          {
            id: 'nav-academie-presentation',
            kind: 'link',
            label: {
              fr: 'Présentation de l’Académie',
              en: 'Academy overview',
              de: 'Vorstellung der Akademie',
            },
            view: 'academie',
            href: VIEW_PATHS['academie'],
            icon: 'compass',
            activeViews: ['academie'],
          },
          {
            id: 'group-comprendre-le-corps',
            kind: 'group',
            label: {
              fr: 'Comprendre le corps',
              en: 'Understanding the body',
              de: 'Den Körper verstehen',
            },
            icon: 'layers',
            defaultOpen: true,
            children: [
              {
                id: 'nav-lire-modele',
                kind: 'link',
                label: {
                  fr: 'Comment lire le modèle Bloom',
                  en: 'How to read the Bloom model',
                  de: 'Wie man das Bloom-Modell liest',
                },
                view: 'comment-lire-modele-bloom',
                href: VIEW_PATHS['comment-lire-modele-bloom'],
                badge: { fr: 'Gratuit', en: 'Free', de: 'Gratis' },
                badgeTone: 'free',
                treePrefix: '├──',
              },
              {
                id: 'nav-cycle-feminin',
                kind: 'link',
                label: {
                  fr: 'Cycle Féminin',
                  en: 'Women Cyclical Power',
                  de: 'Zyklische Kraft der Frau',
                },
                view: 'women-academy',
                href: VIEW_PATHS['women-academy'],
                badge: { fr: 'Gratuit', en: 'Free', de: 'Gratis' },
                badgeTone: 'free',
                treePrefix: '├──',
              },
              {
                id: 'nav-4-architectures',
                kind: 'link',
                label: {
                  fr: 'Les 4 Architectures',
                  en: 'The 4 Architectures',
                  de: 'Die 4 Architekturen',
                },
                view: '4-architectures',
                href: VIEW_PATHS['4-architectures'],
                locked: true,
                treePrefix: '├──',
              },
              {
                id: 'nav-7-terrains',
                kind: 'link',
                label: {
                  fr: 'Les 7 Terrains',
                  en: 'The 7 Terrains',
                  de: 'Die 7 Terrains',
                },
                view: 'terrain',
                href: VIEW_PATHS['7-terrains'],
                activeViews: ['terrain', '7-terrains'],
                locked: true,
                treePrefix: '├──',
              },
              {
                id: 'group-9-axes',
                kind: 'group',
                label: {
                  fr: 'Les 9 Axes historiques',
                  en: 'The 9 Historical Axes',
                  de: 'Die 9 Historischen Achsen',
                },
                locked: true,
                defaultOpen: false,
                children: [
                  {
                    id: 'nav-9-axes-overview',
                    kind: 'link',
                    label: {
                      fr: "Vue d'ensemble (9 axes)",
                      en: '9 Axes Overview',
                      de: 'Überblick (9 Achsen)',
                    },
                    view: '9-axes',
                    href: VIEW_PATHS['9-axes'],
                    activeViews: ['9-axes', 'neuf-axes-historiques'],
                    treePrefix: '├─',
                  },
                  {
                    id: 'nav-module-0',
                    kind: 'link',
                    label: {
                      fr: 'Module 0 : Paradigme',
                      en: 'Module 0: Paradigm',
                      de: 'Modul 0: Paradigma',
                    },
                    view: 'module-0',
                    href: VIEW_PATHS['module-0'],
                    locked: true,
                    treePrefix: '├─',
                  },
                  {
                    id: 'nav-axe-a1',
                    kind: 'link',
                    label: {
                      fr: 'A1 : Émonctoires',
                      en: 'A1: Emunctories',
                      de: 'A1: Ausscheidung',
                    },
                    view: 'axe-a1',
                    href: VIEW_PATHS['axe-a1'],
                    locked: true,
                    treePrefix: '├─',
                  },
                  {
                    id: 'nav-axe-a2',
                    kind: 'link',
                    label: {
                      fr: 'A2 : Barrière Intestinale',
                      en: 'A2: Gut Barrier',
                      de: 'A2: Darmbarriere',
                    },
                    view: 'axe-a2',
                    href: VIEW_PATHS['axe-a2'],
                    locked: true,
                    treePrefix: '├─',
                  },
                  {
                    id: 'nav-axe-a3',
                    kind: 'link',
                    label: {
                      fr: 'A3 : Axe HPA & Stress',
                      en: 'A3: HPA Axis',
                      de: 'A3: HPA-Achse',
                    },
                    view: 'axe-a3',
                    href: VIEW_PATHS['axe-a3'],
                    locked: true,
                    treePrefix: '├─',
                  },
                  {
                    id: 'nav-axe-a4',
                    kind: 'link',
                    label: {
                      fr: 'A4 : Inflammation & SPMs',
                      en: 'A4: Inflammation',
                      de: 'A4: Entzündungsbalance',
                    },
                    view: 'axe-a4',
                    href: VIEW_PATHS['axe-a4'],
                    locked: true,
                    treePrefix: '├─',
                  },
                  {
                    id: 'nav-axe-a5',
                    kind: 'link',
                    label: {
                      fr: 'A5 : Mitochondries & ATP',
                      en: 'A5: Mitochondria',
                      de: 'A5: Mitochondrien',
                    },
                    view: 'axe-a5',
                    href: VIEW_PATHS['axe-a5'],
                    locked: true,
                    treePrefix: '├─',
                  },
                  {
                    id: 'nav-axe-a6',
                    kind: 'link',
                    label: {
                      fr: 'A6 : Tonus Vagal (SNA)',
                      en: 'A6: Vagal Tone',
                      de: 'A6: Vagustonus',
                    },
                    view: 'axe-a6',
                    href: VIEW_PATHS['axe-a6'],
                    locked: true,
                    treePrefix: '├─',
                  },
                  {
                    id: 'nav-axe-a7',
                    kind: 'link',
                    label: {
                      fr: 'A7 : Matrice & Fascia',
                      en: 'A7: Fascial Matrix',
                      de: 'A7: Faszienmatrix',
                    },
                    view: 'axe-a7',
                    href: VIEW_PATHS['axe-a7'],
                    locked: true,
                    treePrefix: '├─',
                  },
                  {
                    id: 'nav-axe-a8',
                    kind: 'link',
                    label: {
                      fr: 'A8 : Microbiote & Butyrate',
                      en: 'A8: Microbiome',
                      de: 'A8: Mikrobiom',
                    },
                    view: 'axe-a8',
                    href: VIEW_PATHS['axe-a8'],
                    locked: true,
                    treePrefix: '├─',
                  },
                  {
                    id: 'nav-axe-a9',
                    kind: 'link',
                    label: {
                      fr: 'A9 : Système EndoCannabinoïde',
                      en: 'A9: Endocannabinoid',
                      de: 'A9: Endocannabinoid',
                    },
                    view: 'axe-a9',
                    href: VIEW_PATHS['axe-a9'],
                    locked: true,
                    treePrefix: '└─',
                  },
                ],
              },
              {
                id: 'nav-charge-allostatique',
                kind: 'link',
                label: {
                  fr: 'La Charge Allostatique',
                  en: 'The Allostatic Load',
                  de: 'Die Allostatische Last',
                },
                view: 'charge-allostatique',
                href: VIEW_PATHS['charge-allostatique'],
                locked: true,
                treePrefix: '├──',
              },
              {
                id: 'nav-protocoles-systemiques',
                kind: 'link',
                label: {
                  fr: 'Protocoles Systémiques',
                  en: 'Systemic Protocols',
                  de: 'Systemische Protokolle',
                },
                view: 'protocoles',
                href: VIEW_PATHS['protocoles'],
                activeViews: [
                  'protocoles',
                  'protocole-psoriasis',
                  'protocole-sibo',
                  'protocole-myeline',
                  'protocole-decalcification-pineale',
                ],
                locked: true,
                treePrefix: '├──',
              },
              {
                id: 'nav-metabolisme-insuline',
                kind: 'link',
                label: {
                  fr: 'Métabolisme & insuline',
                  en: 'Metabolism & Insulin',
                  de: 'Stoffwechsel & Insulin',
                },
                view: 'metabolisme-insuline',
                href: VIEW_PATHS['metabolisme-insuline'],
                badge: { fr: 'Nouveau', en: 'New', de: 'Neu' },
                badgeTone: 'new',
                highlightGold: true,
                locked: true,
                treePrefix: '├──',
              },
              {
                id: 'nav-autres-modules',
                kind: 'link',
                label: {
                  fr: 'Autres modules prévus',
                  en: 'Other planned modules',
                  de: 'Weitere geplante Module',
                },
                view: 'academie',
                href: '/academie/#comprendre-le-corps',
                scrollTargetId: 'comprendre-le-corps',
                isSubtle: true,
                treePrefix: '└──',
              },
            ],
          },
          {
            id: 'nav-recherche-connaissances',
            kind: 'link',
            label: {
              fr: 'Recherche & limites des connaissances',
              en: 'Research & limits of knowledge',
              de: 'Forschung & Grenzen des Wissens',
            },
            title: {
              fr: 'Phytothérapie Moderne : Quand la Science Documente les Plantes',
              en: 'Modern Phytotherapy: How Science Documents Whole Plants',
              de: 'Moderne Phytotherapie: Wissenschaftliche Grundlagen',
            },
            view: 'phytotherapie-moderne-scientifique',
            href: VIEW_PATHS['phytotherapie-moderne-scientifique'],
            icon: 'microscope',
            activeViews: ['phytotherapie-moderne-scientifique'],
          },
          {
            id: 'nav-rituel-reset',
            kind: 'link',
            label: {
              fr: 'Rituel Reset',
              en: 'Reset Ritual',
              de: 'Reset-Ritual',
            },
            title: {
              fr: 'Approche éducative : Reset homéostasique en 6 phases',
              en: 'Educational framework: 6-phase homeostatic reset',
              de: 'Pädagogischer Ansatz: Homöostatischer Reset in 6 Phasen',
            },
            view: 'phytotherapie-reset',
            href: VIEW_PATHS['phytotherapie-reset'],
            icon: 'activity',
            activeViews: [
              'phytotherapie-reset',
              'reset-homeostasique',
              'votre-pratique',
              'parcours',
            ],
          },
        ],
      },
    ],
  },
];
