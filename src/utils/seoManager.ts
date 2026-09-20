import { Language } from '../translations';
import { View, VIEW_PATHS } from '../types';

export interface MetaData {
  title: Record<Language, string>;
  description: Record<Language, string>;
  image: string;
  imageSquare: string;
  imageAlt: string;
  type?: 'website' | 'article' | 'product';
}

export interface ProductMetaData {
  title: Record<Language, string>;
  description: Record<Language, string>;
  image: string;
  imageSquare: string;
  imageAlt: string;
  price?: string;
  sku?: string;
}

export const VIEW_METADATA: Record<string, MetaData> = {
  home: {
    title: {
      fr: "BloomLab® : L'Extracteur & Infuseur Botanique de Précision | Bloom by BotaniK",
      en: "BloomLab® : Precision Botanical Extractor & Infuser | Bloom by BotaniK",
      de: "BloomLab® : Präzisions-Pflanzenextraktor & Infuser | Bloom by BotaniK"
    },
    description: {
      fr: "Découvrez l'extracteur botanique et infuseur végétal BloomLab®. Séquençage actif A/B, thermorégulation et vortex pour révéler le Totum végétal de vos plantes médicinales.",
      en: "Discover the BloomLab® botanical extractor and plant infuser. Active A/B sequencing, thermoregulation, and vortex kinetics for full plant totum.",
      de: "Entdecken Sie den BloomLab® Pflanzenextraktor. Aktive A/B-Sequenzierung und Thermoregulation zur Freisetzung des gesamten Pflanzentotums."
    },
    image: "/images/og/bloom-extracteur-infuseur-botanique-1200x630.jpg",
    imageSquare: "/images/og/bloom-extracteur-infuseur-botanique-1080x1080.jpg",
    imageAlt: "BloomLab® — extracteur et infuseur botanique de précision Bloom by BotaniK en situation",
    type: "website"
  },
  indexbis: {
    title: {
      fr: "BloomLab® : L'Extracteur & Infuseur Botanique de Précision | Bloom by BotaniK",
      en: "BloomLab® : Precision Botanical Extractor & Infuser | Bloom by BotaniK",
      de: "BloomLab® : Präzisions-Pflanzenextraktor & Infuser | Bloom by BotaniK"
    },
    description: {
      fr: "Découvrez l'extracteur botanique et infuseur végétal BloomLab®. Séquençage actif A/B, thermorégulation et vortex pour révéler le Totum végétal de vos plantes médicinales.",
      en: "Discover the BloomLab® botanical extractor and plant infuser. Active A/B sequencing, thermoregulation, and vortex kinetics for full plant totum.",
      de: "Entdecken Sie den BloomLab® Pflanzenextraktor. Aktive A/B-Sequenzierung und Thermoregulation zur Freisetzung des gesamten Pflanzentotums."
    },
    image: "/images/og/bloom-extracteur-infuseur-botanique-1200x630.jpg",
    imageSquare: "/images/og/bloom-extracteur-infuseur-botanique-1080x1080.jpg",
    imageAlt: "BloomLab® — extracteur et infuseur botanique de précision Bloom by BotaniK en situation",
    type: "website"
  },
  machine: {
    title: {
      fr: "Machine BloomLab® | L'Extracteur Botanique Domestique de Précision",
      en: "BloomLab® Machine | Domestic Precision Botanical Extractor",
      de: "BloomLab® Maschine | Häuslicher Präzisions-Pflanzenextraktor"
    },
    description: {
      fr: "Spécifications techniques de la machine BloomLab : inox chirurgical 304, brassage vortex et thermorégulation au degré près pour vos extractions et infusions maison.",
      en: "Technical specifications of the BloomLab machine: surgical 304 stainless steel, vortex agitation, and degree-precise thermoregulation for homemade extractions.",
      de: "Technische Spezifikationen der BloomLab-Maschine: 304 Edelstahl, Vortex-Rührung und gradgenaue Thermoregulation."
    },
    image: "/images/og/produit-bloomlab-1200x630.jpg",
    imageSquare: "/images/og/produit-bloomlab-1080x1080.jpg",
    imageAlt: "Machine BloomLab® en acier inoxydable 304 pour extraction botanique de précision",
    type: "product"
  },
  'infuseur-botanique': {
    title: {
      fr: "Infuseur Botanique de Précision BloomLab® | Machine à Infusion Végétale",
      en: "Precision Botanical Infuser BloomLab® | Plant Infusion Machine",
      de: "Botanischer Präzisions-Infuser BloomLab® | Kräuter-Infusionsmaschine"
    },
    description: {
      fr: "Pourquoi choisir un infuseur botanique plutôt qu'une théière ? Extraction douce en chambre close, préservation des huiles volatiles et biodisponibilité maximale.",
      en: "Why choose a botanical infuser over a classic teapot? Gentle closed-chamber extraction, preservation of volatile oils, and maximum bioavailability.",
      de: "Warum ein botanischer Infuser? Schonende Extraktion in geschlossener Kammer zur Erhaltung ätherischer Öle und Wirkstoffe."
    },
    image: "/images/og/infuseur-botanique-precision-bloomlab-1200x630.jpg",
    imageSquare: "/images/og/infuseur-botanique-precision-bloomlab-1080x1080.jpg",
    imageAlt: "Infuseur botanique de précision et préparation de tisanes actives",
    type: "article"
  },
  'pillar-extraction': {
    title: {
      fr: "Guide de l'Extraction Botanique : Méthodes, Solvants et Totum Végétal",
      en: "Complete Botanical Extraction Guide: Methods, Solvents & Plant Totum",
      de: "Leitfaden zur botanischen Extraktion: Methoden, Lösungsmittel & Totum"
    },
    description: {
      fr: "Découvrez les secrets de l'extraction végétale : solvants polaires et apolaires, courbes de température et vortex pour extraire le Totum sans dégradation.",
      en: "Master plant extraction: polar and non-polar solvents, thermal curves, and vortex kinetics to extract the full plant totum without degradation.",
      de: "Meistern Sie die Pflanzenextraktion: Lösungsmittel, Temperaturkurven und Kinetik für das unversehrte Totum."
    },
    image: "/images/og/extraction-botanique-totum-solvants-1200x630.jpg",
    imageSquare: "/images/og/extraction-botanique-totum-solvants-1080x1080.jpg",
    imageAlt: "Guide de l'extraction végétale, solvants et Totum botanique",
    type: "article"
  },
  'extraction-botanique': {
    title: {
      fr: "Guide de l'Extraction Botanique : Méthodes, Solvants et Totum Végétal",
      en: "Complete Botanical Extraction Guide: Methods, Solvents & Plant Totum",
      de: "Leitfaden zur botanischen Extraktion: Methoden, Lösungsmittel & Totum"
    },
    description: {
      fr: "Découvrez les secrets de l'extraction végétale : solvants polaires et apolaires, courbes de température et vortex pour extraire le Totum sans dégradation.",
      en: "Master plant extraction: polar and non-polar solvents, thermal curves, and vortex kinetics to extract the full plant totum without degradation.",
      de: "Meistern Sie die Pflanzenextraktion: Lösungsmittel, Temperaturkurven und Kinetik für das unversehrte Totum."
    },
    image: "/images/og/extraction-botanique-totum-solvants-1200x630.jpg",
    imageSquare: "/images/og/extraction-botanique-totum-solvants-1080x1080.jpg",
    imageAlt: "Guide de l'extraction végétale, solvants et Totum botanique",
    type: "article"
  },
  'infusion-botanique': {
    title: {
      fr: "Infusion Botanique Maison : Comment Extraire les Principes Actifs",
      en: "Homemade Botanical Infusion: How to Extract Bioactive Compounds",
      de: "Hausgemachte botanische Infusion: Wie man Wirkstoffe extrahiert"
    },
    description: {
      fr: "Guide pratique de l'infusion botanique de précision : choix des plantes médicinales, températures adaptées et techniques pour des remèdes naturels puissants.",
      en: "Practical guide to precision botanical infusions: medicinal plant selection, temperature control, and methods for potent natural remedies.",
      de: "Praxisleitfaden für botanische Präzisionsinfusionen: Heilpflanzenauswahl und Temperaturkontrolle für kraftvolle Hausmittel."
    },
    image: "/images/og/infusion-botanique-maison-extraction-active-1200x630.jpg",
    imageSquare: "/images/og/infusion-botanique-maison-extraction-active-1080x1080.jpg",
    imageAlt: "Infusion botanique maison et extraction de principes actifs",
    type: "article"
  },
  'infusion-botanique-maison-comment-ca-marche': {
    title: {
      fr: "Infusion Botanique Maison : Comment Extraire les Principes Actifs",
      en: "Homemade Botanical Infusion: How to Extract Bioactive Compounds",
      de: "Hausgemachte botanische Infusion: Wie man Wirkstoffe extrahiert"
    },
    description: {
      fr: "Guide pratique de l'infusion botanique de précision : choix des plantes médicinales, températures adaptées et techniques pour des remèdes naturels puissants.",
      en: "Practical guide to precision botanical infusions: medicinal plant selection, temperature control, and methods for potent natural remedies.",
      de: "Praxisleitfaden für botanische Präzisionsinfusionen: Heilpflanzenauswahl und Temperaturkontrolle für kraftvolle Hausmittel."
    },
    image: "/images/og/infusion-botanique-maison-extraction-active-1200x630.jpg",
    imageSquare: "/images/og/infusion-botanique-maison-extraction-active-1080x1080.jpg",
    imageAlt: "Infusion botanique maison et extraction de principes actifs",
    type: "article"
  },
  'phytotherapie-reset': {
    title: {
      fr: "Phytothérapie Systémique & Reset Homéostasique : Les Protocoles Bloom",
      en: "Systemic Phytotherapy & Homeostatic Reset: The Bloom Protocols",
      de: "Systemische Phytotherapie & Homöostatischer Reset: Bloom-Protokolle"
    },
    description: {
      fr: "Votre corps n'est pas cassé, il est verrouillé. Découvrez nos protocoles de phytothérapie systémique pour rééquilibrer votre terrain et stimuler votre pharmacie intérieure.",
      en: "Your body is not broken; it is locked. Discover our systemic phytotherapy protocols to rebalance your biological terrain.",
      de: "Ihr Körper ist nicht kaputt, sondern blockiert. Entdecken Sie systemische Phytotherapie-Protokolle zur Wiederherstellung des Gleichgewichts."
    },
    image: "/images/og/phytotherapie-reset-homeostasie-terrain-1200x630.jpg",
    imageSquare: "/images/og/phytotherapie-reset-homeostasie-terrain-1080x1080.jpg",
    imageAlt: "Phytothérapie systémique et protocoles de reset homéostasique",
    type: "article"
  },
  'totum-vegetal': {
    title: {
      fr: "Le Totum Végétal en Phytothérapie : Définition, Synergie & Puissance",
      en: "The Plant Totum in Phytotherapy: Definition, Synergy & Power",
      de: "Das Pflanzen-Totum in der Phytotherapie: Definition, Synergie & Kraft"
    },
    description: {
      fr: "Pourquoi le Totum végétal surpasse les molécules isolées de synthèse ? Découvrez la synergie moléculaire protectrice et la biodisponibilité de la plante entière.",
      en: "Why does the plant totum outperform isolated molecules? Discover protective molecular synergy and whole-plant bioavailability.",
      de: "Warum übertrifft das Pflanzen-Totum isolierte Einzelwirkstoffe? Entdecken Sie die molekulare Synergie der Heilpflanzen."
    },
    image: "/images/og/totum-vegetal-synergie-plantes-medicinales-1200x630.jpg",
    imageSquare: "/images/og/totum-vegetal-synergie-plantes-medicinales-1080x1080.jpg",
    imageAlt: "Le Totum végétal en phytothérapie et synergie moléculaire",
    type: "article"
  },
  'plantes-adaptogenes': {
    title: {
      fr: "Plantes Adaptogènes : Réguler le Stress, le Cortisol & l'Axe HPA",
      en: "Adaptogenic Plants: Regulate Stress, Cortisol & the HPA Axis",
      de: "Adaptogene Heilpflanzen: Stress, Cortisol und die HPA-Achse regulieren"
    },
    description: {
      fr: "Ashwagandha, Rhodiola, Éleuthérocoque : guide complet des plantes adaptogènes pour rééquilibrer le système nerveux sans accoutumance.",
      en: "Ashwagandha, Rhodiola, Eleuthero: comprehensive guide to adaptogens for nervous system balance and sustainable energy.",
      de: "Ashwagandha, Rhodiola, Eleutherococcus: Leitfaden zu Adaptogenen für ein ausgeglichenes Nervensystem."
    },
    image: "/images/og/plantes-adaptogenes-axe-hpa-systeme-nerveux-1200x630.jpg",
    imageSquare: "/images/og/plantes-adaptogenes-axe-hpa-systeme-nerveux-1080x1080.jpg",
    imageAlt: "Plantes adaptogènes pour réguler le stress et l'axe HPA",
    type: "article"
  },
  herbier: {
    title: {
      fr: "Herbier Botanique : Fiches des Plantes Médicinales & Propriétés",
      en: "Botanical Herbarium: Medicinal Plants Directory & Therapeutic Profiles",
      de: "Botanisches Herbarium: Heilpflanzen-Verzeichnis & Wirkstoffprofile"
    },
    description: {
      fr: "Explorez notre herbier interactif : profils phytochimiques, principes actifs, parties utilisées et modes d'extraction pour chaque plante médicinale.",
      en: "Explore our interactive herbarium: phytochemical profiles, active compounds, and optimal extraction parameters for each medicinal plant.",
      de: "Erkunden Sie unser interaktives Herbarium: phytochemische Profile und Extraktionsparameter für jede Heilpflanze."
    },
    image: "/images/og/herbier-plantes-medicinales-botanique-1200x630.jpg",
    imageSquare: "/images/og/herbier-plantes-medicinales-botanique-1080x1080.jpg",
    imageAlt: "Herbier botanique interactif et fiches des plantes médicinales",
    type: "article"
  },
  library: {
    title: {
      fr: "Herbier Botanique : Fiches des Plantes Médicinales & Propriétés",
      en: "Botanical Herbarium: Medicinal Plants Directory & Therapeutic Profiles",
      de: "Botanisches Herbarium: Heilpflanzen-Verzeichnis & Wirkstoffprofile"
    },
    description: {
      fr: "Explorez notre herbier interactif : profils phytochimiques, principes actifs, parties utilisées et modes d'extraction pour chaque plante médicinale.",
      en: "Explore our interactive herbarium: phytochemical profiles, active compounds, and optimal extraction parameters for each medicinal plant.",
      de: "Erkunden Sie unser interaktives Herbarium: phytochemische Profile und Extraktionsparameter für jede Heilpflanze."
    },
    image: "/images/og/herbier-plantes-medicinales-botanique-1200x630.jpg",
    imageSquare: "/images/og/herbier-plantes-medicinales-botanique-1080x1080.jpg",
    imageAlt: "Herbier botanique interactif et fiches des plantes médicinales",
    type: "article"
  },
  cosmetiques: {
    title: {
      fr: "Cosmétique Botanique Maison : Macérats Huileux & Baumes de Précision",
      en: "Homemade Botanical Cosmetics: Precision Infused Oils & Balms",
      de: "Hausgemachte Naturkosmetik: Präzisions-Ölauszüge & Balsame"
    },
    description: {
      fr: "Apprenez à créer vos huiles de soin, sérums et macérats de calendula à 45°C sans rancissement grâce à l'extracteur BloomLab.",
      en: "Learn to formulate pure facial oils, serums, and calendula macerations at 45°C without lipid oxidation using BloomLab.",
      de: "Stellen Sie reine Gesichtsöle, Seren und Ringelblumen-Mazerate bei 45°C ohne Oxidation mit BloomLab her."
    },
    image: "/images/og/cosmetique-botanique-macerat-huileux-1200x630.jpg",
    imageSquare: "/images/og/cosmetique-botanique-macerat-huileux-1080x1080.jpg",
    imageAlt: "Cosmétique botanique maison, huiles de soin et macérats de précision",
    type: "article"
  },
  'cosmetique-botanique': {
    title: {
      fr: "Cosmétique Botanique Maison : Macérats Huileux & Baumes de Précision",
      en: "Homemade Botanical Cosmetics: Precision Infused Oils & Balms",
      de: "Hausgemachte Naturkosmetik: Präzisions-Ölauszüge & Balsame"
    },
    description: {
      fr: "Apprenez à créer vos huiles de soin, sérums et macérats de calendula à 45°C sans rancissement grâce à l'extracteur BloomLab.",
      en: "Learn to formulate pure facial oils, serums, and calendula macerations at 45°C without lipid oxidation using BloomLab.",
      de: "Stellen Sie reine Gesichtsöle, Seren und Ringelblumen-Mazerate bei 45°C ohne Oxidation mit BloomLab her."
    },
    image: "/images/og/cosmetique-botanique-macerat-huileux-1200x630.jpg",
    imageSquare: "/images/og/cosmetique-botanique-macerat-huileux-1080x1080.jpg",
    imageAlt: "Cosmétique botanique maison, huiles de soin et macérats de précision",
    type: "article"
  },
  culinaire: {
    title: {
      fr: "Gastronomie Botanique : Huiles Aromatisées & Bouillons de Plantes",
      en: "Botanical Gastronomy: Infused Culinary Oils & Plant Broths",
      de: "Botanische Gastronomie: Aromatische Öle & Kräuterbrühen"
    },
    description: {
      fr: "Transformez vos herbes et épices en huiles infusées gastronomiques et bouillons actifs. Recettes de chefs et extraction sous vortex.",
      en: "Turn culinary herbs and spices into Michelin-grade infused oils and active broths. Chef recipes and vortex extraction.",
      de: "Verwandeln Sie Kräuter und Gewürze in Gourmet-Kräuteröle und aktive Brühen. Meisterrezepte mit Vortex-Extraktion."
    },
    image: "/images/og/gastronomie-botanique-huiles-aromatiques-1200x630.jpg",
    imageSquare: "/images/og/gastronomie-botanique-huiles-aromatiques-1080x1080.jpg",
    imageAlt: "Gastronomie botanique, huiles infusées culinaires et bouillons actifs",
    type: "article"
  },
  'gastronomie-botanique': {
    title: {
      fr: "Gastronomie Botanique : Huiles Aromatisées & Bouillons de Plantes",
      en: "Botanical Gastronomy: Infused Culinary Oils & Plant Broths",
      de: "Botanische Gastronomie: Aromatische Öle & Kräuterbrühen"
    },
    description: {
      fr: "Transformez vos herbes et épices en huiles infusées gastronomiques et bouillons actifs. Recettes de chefs et extraction sous vortex.",
      en: "Turn culinary herbs and spices into Michelin-grade infused oils and active broths. Chef recipes and vortex extraction.",
      de: "Verwandeln Sie Kräuter und Gewürze in Gourmet-Kräuteröle und aktive Brühen. Meisterrezepte mit Vortex-Extraktion."
    },
    image: "/images/og/gastronomie-botanique-huiles-aromatiques-1200x630.jpg",
    imageSquare: "/images/og/gastronomie-botanique-huiles-aromatiques-1080x1080.jpg",
    imageAlt: "Gastronomie botanique, huiles infusées culinaires et bouillons actifs",
    type: "article"
  },
  articles: {
    title: {
      fr: "Articles & Savoirs Botaniques : Phytothérapie et Herboristerie Maison",
      en: "Botanical Articles & Knowledge: Phytotherapy and Home Herbalism",
      de: "Botanische Artikel & Wissen: Phytotherapie und Hauskräuterkunde"
    },
    description: {
      fr: "Dossiers d'experts sur l'infusion végétale, les remèdes de grand-mère revisités par la science, l'extraction du Totum et l'herboristerie maison.",
      en: "Expert dossiers on botanical infusion, science-backed ancestral remedies, Totum extraction, and home herbalism.",
      de: "Fachbeiträge zu Pflanzeninfusionen, traditionellen Hausmitteln und moderner Pflanzenextraktion."
    },
    image: "/images/og/articles-savoirs-herboristerie-botanique-1200x630.jpg",
    imageSquare: "/images/og/articles-savoirs-herboristerie-botanique-1080x1080.jpg",
    imageAlt: "Articles et savoirs botaniques en phytothérapie et herboristerie",
    type: "website"
  },
  boutique: {
    title: {
      fr: "Boutique Officielle Bloom by BotaniK | BloomLab & Kits Botaniques",
      en: "Bloom by BotaniK Official Store | BloomLab & Botanical Kits",
      de: "Offizieller Bloom by BotaniK Shop | BloomLab & Kräuter-Kits"
    },
    description: {
      fr: "Commandez votre extracteur et infuseur botanique BloomLab® ainsi que nos kits de plantes sélectionnées pour vos préparations maison.",
      en: "Order your BloomLab® botanical infuser and curated medicinal plant kits for high-grade domestic extractions.",
      de: "Bestellen Sie Ihren BloomLab® Pflanzen-Infuser und ausgewählte Heilkräuter-Kits für höchste Extraktionsqualität."
    },
    image: "/images/og/boutique-bloomlab-kits-plantes-1200x630.jpg",
    imageSquare: "/images/og/boutique-bloomlab-kits-plantes-1080x1080.jpg",
    imageAlt: "Boutique officielle Bloom by BotaniK, BloomLab et kits de plantes",
    type: "website"
  },
  manifeste: {
    title: {
      fr: "Manifeste Bloom by BotaniK : L'Ingénierie de la Résilience Biologique",
      en: "The Bloom by BotaniK Manifesto: Engineering Biological Resilience",
      de: "Das Bloom by BotaniK Manifest: Biologische Resilienz"
    },
    description: {
      fr: "Votre corps n'est pas cassé, il est verrouillé. Découvrez notre vision d'une herboristerie moderne et souveraine réconciliant sagesse ancestrale et rigueur scientifique.",
      en: "Your body is not broken; it is locked. Discover our vision of modern, autonomous herbalism connecting ancestral wisdom and science.",
      de: "Ihr Körper ist nicht kaputt, sondern blockiert. Unsere Vision moderner Pflanzenheilkunde."
    },
    image: "/images/og/manifeste-souverainete-sanitaire-botanique-1200x630.jpg",
    imageSquare: "/images/og/manifeste-souverainete-sanitaire-botanique-1080x1080.jpg",
    imageAlt: "Manifeste Bloom by BotaniK pour la souveraineté botanique et le reset homéostasique",
    type: "article"
  },
  faq: {
    title: {
      fr: "Questions Fréquentes | Extracteur BloomLab & Extraction Botanique",
      en: "Frequently Asked Questions | BloomLab Extractor & Botanical Extraction",
      de: "Häufig gestellte Fragen | BloomLab Extraktor & Botanische Extraktion"
    },
    description: {
      fr: "Toutes les réponses sur la machine BloomLab : garantie, entretien en inox 304, températures d'extraction, solvants autorisés et délais de livraison.",
      en: "All answers about BloomLab: warranty, 304 stainless steel maintenance, extraction temperatures, allowed solvents, and shipping.",
      de: "Alle Antworten zu BloomLab: Garantie, 304 Edelstahl, Temperaturen und Lösungsmittel."
    },
    image: "/images/og/questions-frequentes-bloomlab-botanique-1200x630.jpg",
    imageSquare: "/images/og/questions-frequentes-bloomlab-botanique-1080x1080.jpg",
    imageAlt: "Foire aux questions sur l'infuseur BloomLab et l'extraction végétale",
    type: "website"
  },
  lexique: {
    title: {
      fr: "Lexique de Phytothérapie & Extraction Botanique | Bloom by BotaniK",
      en: "Phytotherapy & Botanical Extraction Glossary | Bloom by BotaniK",
      de: "Glossar für Phytotherapie & botanische Extraktion | Bloom by BotaniK"
    },
    description: {
      fr: "Définitions claires des concepts clés : Totum, macérat huileux, solvant amphiphile, principes thermolabiles, axe HPA et reset homéostasique.",
      en: "Clear definitions of key concepts: Totum, infused oil, amphiphilic solvent, thermolabile compounds, HPA axis, and homeostatic reset.",
      de: "Klare Definitionen: Totum, Ölauszug, amphiphile Lösungsmittel und homöostatischer Reset."
    },
    image: "/images/og/lexique-phytotherapie-extraction-botanique-1200x630.jpg",
    imageSquare: "/images/og/lexique-phytotherapie-extraction-botanique-1080x1080.jpg",
    imageAlt: "Lexique de phytothérapie et termes d'herboristerie",
    type: "article"
  },
  contact: {
    title: {
      fr: "Contactez l'Équipe Bloom by BotaniK | Support & Conseils",
      en: "Contact Bloom by BotaniK | Support & Guidance",
      de: "Kontaktieren Sie Bloom by BotaniK | Support & Beratung"
    },
    description: {
      fr: "Une question sur BloomLab ou nos mélanges botaniques ? Contactez nos spécialistes de l'extraction végétale. Réponse sous 24 heures.",
      en: "Questions about BloomLab or our botanical blends? Contact our extraction specialists. Fast response within 24 hours.",
      de: "Fragen zu BloomLab oder unseren Kräutermischungen? Kontaktieren Sie unsere Spezialisten."
    },
    image: "/images/og/contact-bloom-by-botanik-1200x630.jpg",
    imageSquare: "/images/og/contact-bloom-by-botanik-1080x1080.jpg",
    imageAlt: "Contactez l'équipe Bloom by BotaniK pour vos questions botaniques",
    type: "website"
  },
  'huile-infusee': {
    title: {
      fr: "Huiles Infusées & Macération de Plantes : Le Guide Complet | Bloom",
      en: "Infused Oils & Plant Maceration: Complete Guide | Bloom",
      de: "Kräuteröle & Pflanzenmazeration: Der vollständige Leitfaden | Bloom"
    },
    description: {
      fr: "Comment fabriquer vos huiles infusées à 45°C sans rancissement. Extraction des principes liposolubles et synergie pour la peau et la cuisine.",
      en: "How to craft pure infused oils at 45°C without oxidation. Extract lipid-soluble compounds for skincare and gastronomy.",
      de: "Wie man Pflanzenöle bei 45°C ohne Oxidation herstellt. Fettlösliche Wirkstoffe für Haut und Küche."
    },
    image: "/images/og/huiles-infusees-maceration-plantes-1200x630.jpg",
    imageSquare: "/images/og/huiles-infusees-maceration-plantes-1080x1080.jpg",
    imageAlt: "Huiles infusées et macération d'herboristerie maison de précision",
    type: "article"
  },
  'teinture-mere': {
    title: {
      fr: "Teinture-Mère & Extraits Hydroalcooliques : Préparation Maison | Bloom",
      en: "Mother Tincture & Hydroalcoholic Extracts: Home Preparation | Bloom",
      de: "Urtinkturen & Hydroalkoholische Extrakte: Hausgemacht | Bloom"
    },
    description: {
      fr: "Maîtrisez les ratios 1:5, les titres alcooliques et l'extraction accélérée sous vortex pour des teintures mères concentrées sans perte d'actifs.",
      en: "Master 1:5 ratios, alcohol titres, and vortex-accelerated extraction for potent mother tinctures without solvent loss.",
      de: "Meistern Sie Verhältnisse und beschleunigte Vortex-Extraktion für wirksame Tinkturen."
    },
    image: "/images/og/teinture-mere-extraits-hydroalcooliques-1200x630.jpg",
    imageSquare: "/images/og/teinture-mere-extraits-hydroalcooliques-1080x1080.jpg",
    imageAlt: "Guide de la teinture-mère et extraits hydroalcooliques de plantes médicinales",
    type: "article"
  },
  terrain: {
    title: {
      fr: "Les 8 Terrains Biologiques : Comprendre son Équilibre | Bloom",
      en: "The 8 Biological Terrains: Understanding Your Balance | Bloom",
      de: "Die 8 biologischen Terrains: Verstehen Sie Ihr Gleichgewicht | Bloom"
    },
    description: {
      fr: "Identifiez votre terrain dominant (nerveux, métabolique, inflammatoire) et appliquez les synergies de plantes adaptées à votre homéostasie.",
      en: "Identify your dominant terrain (nervous, metabolic, inflammatory) and apply targeted plant synergies.",
      de: "Erkennen Sie Ihr dominantes Terrain und nutzen Sie gezielte Pflanzensynergien."
    },
    image: "/images/og/terrain-biologique-equilibre-homeostasie-1200x630.jpg",
    imageSquare: "/images/og/terrain-biologique-equilibre-homeostasie-1080x1080.jpg",
    imageAlt: "Les 8 terrains biologiques en phytothérapie systémique",
    type: "article"
  },
  hormese: {
    title: {
      fr: "L'Hormèse Végétale : Comment les Principes Amers Renforcent l'Organisme",
      en: "Plant Hormesis: How Bitter Principles Strengthen the Body",
      de: "Pflanzliche Hormesis: Wie Bitterstoffe den Körper stärken"
    },
    description: {
      fr: "Le principe de l'hormèse appliqué aux plantes médicinales : comment les défenses végétales stimulent nos mécanismes endogènes de résilience.",
      en: "Plant hormesis: how botanical defense compounds trigger human endogenous cellular resilience.",
      de: "Pflanzliche Hormesis: Wie pflanzliche Bitterstoffe körpereigene Schutzmechanismen aktivieren."
    },
    image: "/images/og/hormese-vegetale-resilience-cellulaire-1200x630.jpg",
    imageSquare: "/images/og/hormese-vegetale-resilience-cellulaire-1080x1080.jpg",
    imageAlt: "Hormèse et résilience biologique par les principes amers végétaux",
    type: "article"
  },
  'guide-utilisation': {
    title: {
      fr: "Guide d'Utilisation BloomLab® : Protocoles & Précautions d'Emploi",
      en: "BloomLab® User Guide: Protocols & Safety Instructions",
      de: "BloomLab® Bedienungsanleitung: Protokolle & Sicherheitshinweise"
    },
    description: {
      fr: "Tous nos conseils pour prendre en main l'appareil BloomLab : réglage des températures, utilisation du vortex, entretien du bol inox et règles de sécurité.",
      en: "Complete guide to mastering your BloomLab: temperature tuning, vortex kinetics, stainless steel bowl cleaning, and safety rules.",
      de: "Anleitung zur Bedienung von BloomLab: Temperaturkontrolle, Vortex, Pflege und Sicherheit."
    },
    image: "/images/og/guide-utilisation-protocoles-bloomlab-1200x630.jpg",
    imageSquare: "/images/og/guide-utilisation-protocoles-bloomlab-1080x1080.jpg",
    imageAlt: "Guide d'utilisation de l'extracteur et infuseur BloomLab",
    type: "article"
  }
};

export const PRODUCT_METADATA: Record<string, ProductMetaData> = {
  bloomlab: {
    title: {
      fr: "BloomLab® : L'Extracteur & Infuseur Botanique de Précision N°1 | Bloom by BotaniK",
      en: "BloomLab® : Precision Botanical Extractor & Plant Infuser | Bloom by BotaniK",
      de: "BloomLab® : Präzisions-Pflanzenextraktor & Infuser | Bloom by BotaniK"
    },
    description: {
      fr: "Commandez l'extracteur et infuseur botanique BloomLab®. Inox chirurgical 304, vortex cinétique, thermorégulation ±0,5°C pour extraire le Totum de vos plantes médicinales.",
      en: "Order the BloomLab® botanical extractor. 304 stainless steel, kinetic vortex, ±0.5°C thermoregulation to extract full plant totum.",
      de: "Bestellen Sie den BloomLab® Pflanzenextraktor. 304 Edelstahl, kinetischer Vortex, ±0,5°C Thermoregulation für volles Pflanzentotum."
    },
    image: "/images/og/produit-bloomlab-1200x630.jpg",
    imageSquare: "/images/og/produit-bloomlab-1080x1080.jpg",
    imageAlt: "Extracteur et infuseur botanique de précision BloomLab® en situation",
    price: "239.00",
    sku: "BLOOMLAB-V2"
  },
  'bundle-apothicaire': {
    title: {
      fr: "Trio Apothicaire : 3 Formules Botaniques pour Infuseur | Bloom by BotaniK",
      en: "Apothecary Trio: 3 Botanical Formulas for Infuser | Bloom by BotaniK",
      de: "Apotheker-Trio: 3 botanische Formeln für Infuser | Bloom by BotaniK"
    },
    description: {
      fr: "Trio de formules médicinales calibrées pour infusion végétale et extraction maison : Sève Fondamentale, Nuit Profonde et Feu Digestif.",
      en: "Trio of medicinal plant formulas calibrated for plant infusion: Fundamental Sap, Deep Night, and Digestive Fire.",
      de: "Trio aus Heilpflanzen-Mischungen für botanische Infusionen: Fundamentaler Pflanzensaft, Tiefe Nacht und Verdauungsfeuer."
    },
    image: "/images/og/produit-bundle-apothicaire-1200x630.jpg",
    imageSquare: "/images/og/produit-bundle-apothicaire-1080x1080.jpg",
    imageAlt: "Trio de formules médicinales Apothicaire Bloom by BotaniK",
    price: "79.00",
    sku: "BUNDLE-APOTHICAIRE"
  },
  'pack-signature': {
    title: {
      fr: "Pack Signature BloomLab® + Trio de Plantes Médicinales | Bloom by BotaniK",
      en: "Signature Pack BloomLab® + Medicinal Plant Trio | Bloom by BotaniK",
      de: "Signature-Paket BloomLab® + Heilpflanzen-Trio | Bloom by BotaniK"
    },
    description: {
      fr: "Le pack complet pour démarrer l'herboristerie maison : la machine BloomLab®, les 3 mélanges de plantes signatures et l'accès aux protocoles d'extraction.",
      en: "The complete setup to start home herbalism: BloomLab® machine, 3 signature botanical blends, and protocol library access.",
      de: "Das Komplettset für die Heimkräuterkunde: BloomLab® Maschine, 3 Signature-Kräutermischungen und Protokoll-Zugang."
    },
    image: "/images/og/produit-pack-signature-1200x630.jpg",
    imageSquare: "/images/og/produit-pack-signature-1080x1080.jpg",
    imageAlt: "Pack Signature BloomLab et ses trois formules botaniques",
    price: "299.00",
    sku: "PACK-SIGNATURE"
  },
  'kit-starter': {
    title: {
      fr: "Kit Sève Fondamentale : Plantes Médicinales pour Infusion Botanique | Bloom",
      en: "Fundamental Sap Kit: Medicinal Plants for Botanical Infusion | Bloom",
      de: "Fundamentaler Pflanzensaft: Heilpflanzen für Infusionen | Bloom"
    },
    description: {
      fr: "Mélange tonique et régulateur pour infusion végétale maison. Ortie, romarin et cynorrhodon pour soutenir le terrain et la vitalité quotidienne.",
      en: "Tonic regulating herbal blend for home botanical infusion. Nettle, rosemary, and rosehip for everyday vitality.",
      de: "Tonisierendes Heilpflanzen-Set für hausgemachte Aufgüsse. Brennnessel, Rosmarin und Hagebutte für tägliche Vitalität."
    },
    image: "/images/og/produit-kit-starter-1200x630.jpg",
    imageSquare: "/images/og/produit-kit-starter-1080x1080.jpg",
    imageAlt: "Kit de plantes médicinales Sève Fondamentale Bloom by BotaniK",
    price: "29.00",
    sku: "KIT-SEVE"
  },
  'kit-nuit': {
    title: {
      fr: "Kit Nuit Profonde : Plantes Médicinales Sommeil & Système Nerveux | Bloom",
      en: "Deep Night Kit: Medicinal Plants for Sleep & Nervous Balance | Bloom",
      de: "Tiefe Nacht Set: Heilpflanzen für Schlaf & Nervensystem | Bloom"
    },
    description: {
      fr: "Synergie de passiflore, mélisse et camomille matricaire calibrée pour l'extraction douce en infuseur végétal. Sommeil réparateur sans somnolence.",
      en: "Synergy of passionflower, lemon balm, and chamomile calibrated for gentle botanical extraction. Restful sleep.",
      de: "Synergie aus Passionsblume, Melisse und Kamille für schonende botanische Extraktion. Erholsamer Schlaf."
    },
    image: "/images/og/produit-kit-nuit-1200x630.jpg",
    imageSquare: "/images/og/produit-kit-nuit-1080x1080.jpg",
    imageAlt: "Kit Nuit Profonde pour le sommeil et l'apaisement nerveux",
    price: "29.00",
    sku: "KIT-NUIT"
  },
  'kit-digestion': {
    title: {
      fr: "Kit Feu Digestif : Plantes pour Confort Intestinal & Émonctoires | Bloom",
      en: "Digestive Fire Kit: Medicinal Plants for Gut Health | Bloom",
      de: "Verdauungsfeuer Set: Heilpflanzen für Darm & Verdauung | Bloom"
    },
    description: {
      fr: "Fenouil doux, menthe poivrée et gentiane pour stimuler les sucs digestifs et apaiser le ballonnement après les repas grâce à l'extraction de précision.",
      en: "Sweet fennel, peppermint, and gentian to stimulate digestive enzymes and calm bloating via precision extraction.",
      de: "Fenchel, Pfefferminze und Enzian zur Unterstützung der Verdauung und Linderung von Blähungen."
    },
    image: "/images/og/produit-kit-digestion-1200x630.jpg",
    imageSquare: "/images/og/produit-kit-digestion-1080x1080.jpg",
    imageAlt: "Kit Feu Digestif pour le confort intestinal et gastrique",
    price: "29.00",
    sku: "KIT-DIGESTION"
  },
  'kit-articulaire': {
    title: {
      fr: "Kit Feu Articulaire : Plantes Médicinales pour Mobilité & Souplesse | Bloom",
      en: "Joint Fire Kit: Medicinal Plants for Mobility & Comfort | Bloom",
      de: "Gelenkfeuer Set: Heilpflanzen für Mobilität & Flexibilität | Bloom"
    },
    description: {
      fr: "Harpagophytum, reine-des-prés et cassis pour soulager les articulations raides et réguler l'inflammation grâce à l'extraction du Totum.",
      en: "Devil's claw, meadowsweet, and blackcurrant to soothe stiff joints and modulate inflammation with whole Totum extraction.",
      de: "Teufelskralle, Mädesüß und Schwarze Johannisbeere zur Linderung von Gelenkbeschwerden."
    },
    image: "/images/og/produit-kit-articulaire-1200x630.jpg",
    imageSquare: "/images/og/produit-kit-articulaire-1080x1080.jpg",
    imageAlt: "Kit Feu Articulaire pour la souplesse et le confort des articulations",
    price: "32.00",
    sku: "KIT-ARTICULAIRE"
  },
  'kit-hiver': {
    title: {
      fr: "Kit Bouclier Hivernal : Plantes Médicinales Immunité Naturelle | Bloom",
      en: "Winter Shield Kit: Medicinal Plants for Natural Immunity | Bloom",
      de: "Winterschild Set: Heilpflanzen für natürliche Abwehrkräfte | Bloom"
    },
    description: {
      fr: "Échinacée pourpre, thym à linalol et sureau noir. Synergie protectrice pour traverser l'hiver avec une infusion botanique riche en polyphénols.",
      en: "Purple coneflower, thyme, and elderberry. Protective botanical synergy rich in bioactive polyphenols for cold season.",
      de: "Echinacea, Thymian und Holunderbeeren. Schützende Pflanzensynergie für das Immunsystem."
    },
    image: "/images/og/produit-kit-hiver-1200x630.jpg",
    imageSquare: "/images/og/produit-kit-hiver-1080x1080.jpg",
    imageAlt: "Kit Bouclier Hivernal pour l'immunité et la protection des voies respiratoires",
    price: "32.00",
    sku: "KIT-HIVER"
  },
  'duo-argiles': {
    title: {
      fr: "Duo Argiles & Terres Rares : Purification Systémique & Remèdes Naturels",
      en: "Clay & Rare Earth Duo: Systemic Cleansing & Natural Remedies",
      de: "Heilerde-Duo: Systemische Reinigung & Natürliche Heilmittel"
    },
    description: {
      fr: "Argiles vertes et blanches surfines ventilées pour cataplasmes et purification du terrain. Remède ancestral d'herboristerie maison.",
      en: "Ventilated green and white clay for poultices and systemic terrain purification. Ancestral herbal remedy.",
      de: "Grüne und weiße Heilerde für Umschläge und systemische Reinigung des Terrains."
    },
    image: "/images/og/produit-duo-argiles-1200x630.jpg",
    imageSquare: "/images/og/produit-duo-argiles-1080x1080.jpg",
    imageAlt: "Duo Argiles & Terres Rares pour la purification systémique",
    price: "24.00",
    sku: "DUO-ARGILES"
  },
  'freemium-access': {
    title: {
      fr: "Accès Découverte : 10 Recettes Gratuites d'Herboristerie & Totum | Bloom",
      en: "Discovery Access: 10 Free Herbalism & Totum Recipes | Bloom",
      de: "Entdecker-Zugang: 10 kostenlose Kräuter-Rezepte & Totum | Bloom"
    },
    description: {
      fr: "Découvrez gratuitement nos fiches d'extraction pas à pas : macérats huileux, infusions thermorégulées et teintures végétales sans équipement lourd.",
      en: "Discover our free step-by-step extraction guides: infused oils, thermoregulated infusions, and tinctures.",
      de: "Entdecken Sie kostenlose Anleitungen für Pflanzenöle, Aufgüsse und Tinkturen."
    },
    image: "/images/og/articles-savoirs-herboristerie-botanique-1200x630.jpg",
    imageSquare: "/images/og/articles-savoirs-herboristerie-botanique-1080x1080.jpg",
    imageAlt: "Accès découverte aux fiches botaniques et recettes de phytothérapie",
    price: "0.00",
    sku: "ACCESS-FREE"
  },
  'premium-access': {
    title: {
      fr: "Abonnement Botanique Annuel : Protocoles Experts & Herboristerie | Bloom",
      en: "Annual Botanical Subscription: Expert Protocols & Herbalism | Bloom",
      de: "Botanisches Jahresabonnement: Expertenprotokolle & Kräuterkunde | Bloom"
    },
    description: {
      fr: "Accès illimité à l'encyclopédie des 8 terrains biologiques, 150+ recettes d'extraction assistée et accompagnement personnalisé par ALMA.",
      en: "Unlimited access to the 8 biological terrains encyclopedia, 150+ assisted extraction recipes, and ALMA guidance.",
      de: "Unbegrenzter Zugang zu den 8 biologischen Terrains, über 150 Extraktionsrezepten und persönlicher Begleitung."
    },
    image: "/images/og/guide-utilisation-protocoles-bloomlab-1200x630.jpg",
    imageSquare: "/images/og/guide-utilisation-protocoles-bloomlab-1080x1080.jpg",
    imageAlt: "Abonnement annuel aux protocoles experts d'herboristerie et phytothérapie",
    price: "59.00",
    sku: "ACCESS-PREMIUM"
  }
};

export function getSEOMetadataForPath(rawPath: string, lang: Language = 'fr'): {
  title: string;
  description: string;
  canonicalUrl: string;
  image: string;
  imageSquare: string;
  imageAlt: string;
  type: 'website' | 'article' | 'product';
  price?: string;
  sku?: string;
} {
  const clean = rawPath.replace(/^\/(en|de)/, '').replace(/\/$/, '') || '/';
  
  // 1. Check Product detail
  if (clean.startsWith('/boutique/') || clean.startsWith('/produit/')) {
    const parts = clean.split('/').filter(Boolean);
    const prodKey = parts[1] || parts[0];
    if (prodKey && PRODUCT_METADATA[prodKey]) {
      const p = PRODUCT_METADATA[prodKey];
      return {
        title: p.title[lang] || p.title.fr,
        description: p.description[lang] || p.description.fr,
        canonicalUrl: `https://bloombybotanik.com/boutique/${prodKey}/`,
        image: `https://bloombybotanik.com${p.image}`,
        imageSquare: `https://bloombybotanik.com${p.imageSquare}`,
        imageAlt: p.imageAlt,
        type: 'product',
        price: p.price,
        sku: p.sku
      };
    }
  }

  // 2. Check Article detail
  if (clean.startsWith('/articles/') || clean.startsWith('/blog/')) {
    const slug = clean.replace(/^\/(articles|blog)\/?/, '');
    const ARTICLE_IMAGES: Record<string, { image: string; imageSquare: string; imageAlt: string; title: string; desc: string }> = {
      'infuseur-botanique-vs-theiere-classique-pourquoi-votre-tisane-ne-marche-pas': {
        image: '/images/og/article-infuseur-vs-theiere-tisane-1200x630.jpg',
        imageSquare: '/images/og/article-infuseur-vs-theiere-tisane-1080x1080.jpg',
        imageAlt: 'Infuseur botanique vs théière classique pour vos tisanes',
        title: "Infuseur Botanique vs Théière Classique | Pourquoi Votre Tisane Ne Marche Pas",
        desc: "Pourquoi l'infuseur botanique surpasse la théière classique ? Découvrez les limites thermiques de l'eau bouillante et la puissance de l'extraction thermo-cinétique."
      },
      'extraction-a-froid-vs-extraction-a-chaud-guide-totum-vegetal': {
        image: '/images/og/article-extraction-froid-chaud-totum-1200x630.jpg',
        imageSquare: '/images/og/article-extraction-froid-chaud-totum-1080x1080.jpg',
        imageAlt: 'Extraction à froid vs extraction à chaud du Totum végétal',
        title: "Extraction à Froid vs à Chaud : Le Guide Ultime du Totum Végétal",
        desc: "Extraction à froid, décoction ou thermo-cinétique douce ? Découvrez quelle méthode préserve l'intégralité du Totum végétal sans altérer les molécules bioactives."
      },
      'remedes-de-grand-mere-revisites-par-la-science-5-plantes-a-redecouvrir': {
        image: '/images/og/article-remedes-grand-mere-science-1200x630.jpg',
        imageSquare: '/images/og/article-remedes-grand-mere-science-1080x1080.jpg',
        imageAlt: 'Remèdes de grand-mère et phytothérapie revisités par la science moderne',
        title: "Remèdes de Grand-Mère & Science : 5 Plantes Médicinales Revisités",
        desc: "Reine des prés, thym, camomille, romarin, mauve : comment la science confirme l'efficacité des remèdes de grand-mère grâce à l'extraction de précision."
      },
      'comment-fabriquer-huiles-infusees-teintures-maison': {
        image: '/images/og/article-fabriquer-huiles-infusees-teintures-1200x630.jpg',
        imageSquare: '/images/og/article-fabriquer-huiles-infusees-teintures-1080x1080.jpg',
        imageAlt: 'Fabrication domestique d huiles infusées et de teintures',
        title: "Guide Pratique : Huiles Infusées et Teintures Végétales Maison",
        desc: "Comment réussir vos huiles infusées, macérats huileux et teintures mères à la maison ? Solvants, températures de 45°C, ratios et extraction fermée."
      },
      'plantes-adaptogenes-guide-complet-reequilibrer-systeme-nerveux': {
        image: '/images/og/article-plantes-adaptogenes-systeme-nerveux-1200x630.jpg',
        imageSquare: '/images/og/article-plantes-adaptogenes-systeme-nerveux-1080x1080.jpg',
        imageAlt: 'Plantes adaptogènes pour rééquilibrer le système nerveux',
        title: "Plantes Adaptogènes : Rééquilibrer l'Axe HPA et le Système Nerveux",
        desc: "Guide complet des plantes adaptogènes : Ashwagandha, Rhodiola, Éleuthérocoque, Basilic sacré. Régulez le cortisol et restaurez l'énergie vitale."
      }
    };

    if (ARTICLE_IMAGES[slug]) {
      const art = ARTICLE_IMAGES[slug];
      return {
        title: art.title,
        description: art.desc,
        canonicalUrl: `https://bloombybotanik.com/articles/${slug}/`,
        image: `https://bloombybotanik.com${art.image}`,
        imageSquare: `https://bloombybotanik.com${art.imageSquare}`,
        imageAlt: art.imageAlt,
        type: 'article'
      };
    }
  }

  // 3. Match reverse VIEW_PATHS or direct key
  let viewKey = 'home';
  for (const [key, p] of Object.entries(VIEW_PATHS)) {
    const normalized = p.replace(/\/$/, '') || '/';
    if (normalized === clean) {
      viewKey = key;
      break;
    }
  }

  if (viewKey === 'home' && clean !== '/') {
    const slugKey = clean.replace(/^\//, '');
    if (VIEW_METADATA[slugKey]) {
      viewKey = slugKey;
    }
  }

  const v = VIEW_METADATA[viewKey] || VIEW_METADATA.home;
  const canonicalPath = VIEW_PATHS[viewKey] || '/';
  return {
    title: v.title[lang] || v.title.fr,
    description: v.description[lang] || v.description.fr,
    canonicalUrl: `https://bloombybotanik.com${canonicalPath}`,
    image: `https://bloombybotanik.com${v.image}`,
    imageSquare: `https://bloombybotanik.com${v.imageSquare}`,
    imageAlt: v.imageAlt,
    type: v.type || 'website'
  };
}

export function updateDocumentSEO(view: View, lang: Language, productParam?: string, articleSlug?: string) {
  if (typeof window === 'undefined') return;

  const currentPath = window.location.pathname;
  let seo = getSEOMetadataForPath(currentPath, lang);

  // If explicit productParam passed
  if (productParam && PRODUCT_METADATA[productParam]) {
    const p = PRODUCT_METADATA[productParam];
    seo = {
      title: p.title[lang] || p.title.fr,
      description: p.description[lang] || p.description.fr,
      canonicalUrl: `https://bloombybotanik.com/boutique/${productParam}/`,
      image: `https://bloombybotanik.com${p.image}`,
      imageSquare: `https://bloombybotanik.com${p.imageSquare}`,
      imageAlt: p.imageAlt,
      type: 'product',
      price: p.price,
      sku: p.sku
    };
  } else if (view && VIEW_METADATA[view]) {
    const v = VIEW_METADATA[view];
    const path = VIEW_PATHS[view] || '/';
    seo = {
      title: v.title[lang] || v.title.fr,
      description: v.description[lang] || v.description.fr,
      canonicalUrl: `https://bloombybotanik.com${path}`,
      image: `https://bloombybotanik.com${v.image}`,
      imageSquare: `https://bloombybotanik.com${v.imageSquare}`,
      imageAlt: v.imageAlt,
      type: v.type || 'website'
    };
  }

  // 1. Update Title
  document.title = seo.title;

  // 2. Helper to set or create meta tag
  const setMeta = (nameAttr: string, nameValue: string, contentValue: string) => {
    let el = document.querySelector(`meta[${nameAttr}="${nameValue}"]`);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(nameAttr, nameValue);
      document.head.appendChild(el);
    }
    el.setAttribute('content', contentValue);
  };

  setMeta('name', 'description', seo.description);
  setMeta('property', 'og:title', seo.title);
  setMeta('property', 'og:description', seo.description);
  setMeta('property', 'og:type', seo.type);
  setMeta('property', 'og:url', seo.canonicalUrl);

  // Primary 1200x630
  setMeta('property', 'og:image', seo.image);
  setMeta('property', 'og:image:secure_url', seo.image);
  setMeta('property', 'og:image:type', 'image/jpeg');
  setMeta('property', 'og:image:width', '1200');
  setMeta('property', 'og:image:height', '630');
  setMeta('property', 'og:image:alt', seo.imageAlt);

  // Secondary 1080x1080
  let squareEl = document.querySelector('meta[property="og:image:square"]');
  if (!squareEl) {
    squareEl = document.createElement('meta');
    squareEl.setAttribute('property', 'og:image:square');
    document.head.appendChild(squareEl);
  }
  squareEl.setAttribute('content', seo.imageSquare);

  // Twitter Card
  setMeta('name', 'twitter:card', 'summary_large_image');
  setMeta('name', 'twitter:title', seo.title);
  setMeta('name', 'twitter:description', seo.description);
  setMeta('name', 'twitter:image', seo.image);
  setMeta('name', 'twitter:image:alt', seo.imageAlt);

  // 3. Update or create Canonical link
  let canonicalEl = document.querySelector('link[rel="canonical"]');
  if (!canonicalEl) {
    canonicalEl = document.createElement('link');
    canonicalEl.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalEl);
  }
  canonicalEl.setAttribute('href', seo.canonicalUrl);

  // 4. Update or create Hreflang links
  const setHreflang = (hreflang: string, url: string) => {
    let el = document.querySelector(`link[rel="alternate"][hreflang="${hreflang}"]`);
    if (!el) {
      el = document.createElement('link');
      el.setAttribute('rel', 'alternate');
      el.setAttribute('hreflang', hreflang);
      document.head.appendChild(el);
    }
    el.setAttribute('href', url);
  };

  const pathOnly = seo.canonicalUrl.replace('https://bloombybotanik.com', '');
  setHreflang('fr', `https://bloombybotanik.com${pathOnly}`);
  setHreflang('en', `https://bloombybotanik.com/en${pathOnly}`);
  setHreflang('de', `https://bloombybotanik.com/de${pathOnly}`);
  setHreflang('x-default', `https://bloombybotanik.com${pathOnly}`);

  // 5. Update or create Dynamic Schema.org JSON-LD
  let schemaEl = document.getElementById('bloom-dynamic-seo') as HTMLScriptElement | null;
  if (!schemaEl) {
    schemaEl = document.createElement('script');
    schemaEl.id = 'bloom-dynamic-seo';
    schemaEl.type = 'application/ld+json';
    document.head.appendChild(schemaEl);
  }

  let schemaData: any;
  if (seo.type === 'article') {
    schemaData = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": seo.title,
      "description": seo.description,
      "image": [seo.image, seo.imageSquare],
      "datePublished": "2026-09-01T08:00:00+02:00",
      "dateModified": "2026-09-20T10:00:00+02:00",
      "author": {
        "@type": "Organization",
        "name": "Bloom by BotaniK",
        "url": "https://bloombybotanik.com"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Bloom by BotaniK",
        "logo": {
          "@type": "ImageObject",
          "url": "https://bloombybotanik.com/assets/img/logo-bloom-square-512.png",
          "width": 512,
          "height": 512
        }
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": seo.canonicalUrl
      }
    };
  } else if (seo.type === 'product') {
    schemaData = {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": seo.title,
      "description": seo.description,
      "image": [seo.imageSquare, seo.image],
      "sku": seo.sku || "BLOOM-PROD",
      "brand": {
        "@type": "Brand",
        "name": "Bloom by BotaniK"
      },
      "offers": {
        "@type": "Offer",
        "url": seo.canonicalUrl,
        "priceCurrency": "EUR",
        "price": seo.price || "29.00",
        "availability": "https://schema.org/InStock",
        "seller": {
          "@type": "Organization",
          "name": "Bloom by BotaniK"
        }
      }
    };
  } else {
    schemaData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": seo.title,
      "description": seo.description,
      "url": seo.canonicalUrl,
      "primaryImageOfPage": {
        "@type": "ImageObject",
        "url": seo.image,
        "width": 1200,
        "height": 630
      },
      "image": [seo.image, seo.imageSquare]
    };
  }
  schemaEl.text = JSON.stringify(schemaData);
}
