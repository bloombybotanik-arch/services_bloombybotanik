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
      fr: "Extracteur Botanique BloomLab® | Infusion Précision",
      en: "BloomLab® Precision Botanical Extractor | Herbal Infusion",
      de: "BloomLab® Präzisions-Pflanzenextraktor | Kräuter-Infusion"
    },
    description: {
      fr: "BloomLab® : extracteur et infuseur botanique de précision. Séquençage actif A/B et thermorégulation pour libérer le Totum des plantes médicinales à domicile.",
      en: "BloomLab®: precision botanical extractor and infuser. Active A/B sequencing and thermoregulation to extract full medicinal plant totum at home.",
      de: "BloomLab®: Präzisions-Pflanzenextraktor und Infuser. Aktive A/B-Sequenzierung und Thermoregulation für volles Pflanzentotum zu Hause."
    },
    image: "/images/og/bloom-extracteur-infuseur-botanique-1200x630.jpg",
    imageSquare: "/images/og/bloom-extracteur-infuseur-botanique-1080x1080.jpg",
    imageAlt: "BloomLab® — extracteur et infuseur botanique de précision Bloom by BotaniK en situation",
    type: "website"
  },
  indexbis: {
    title: {
      fr: "Extracteur Botanique BloomLab® | Infusion Précision",
      en: "BloomLab® Precision Botanical Extractor | Herbal Infusion",
      de: "BloomLab® Präzisions-Pflanzenextraktor | Kräuter-Infusion"
    },
    description: {
      fr: "BloomLab® : extracteur et infuseur botanique de précision. Séquençage actif A/B et thermorégulation pour libérer le Totum des plantes médicinales à domicile.",
      en: "BloomLab®: precision botanical extractor and infuser. Active A/B sequencing and thermoregulation to extract full medicinal plant totum at home.",
      de: "BloomLab®: Präzisions-Pflanzenextraktor und Infuser. Aktive A/B-Sequenzierung und Thermoregulation für volles Pflanzentotum zu Hause."
    },
    image: "/images/og/bloom-extracteur-infuseur-botanique-1200x630.jpg",
    imageSquare: "/images/og/bloom-extracteur-infuseur-botanique-1080x1080.jpg",
    imageAlt: "BloomLab® — extracteur et infuseur botanique de précision Bloom by BotaniK en situation",
    type: "website"
  },
  bloomlab: {
    title: {
      fr: "BloomLab® Extracteur Botanique | Totum Végétal Préservé — 239€",
      en: "BloomLab® Botanical Extractor | Preserved Plant Totum — €239",
      de: "BloomLab® Pflanzenextraktor | Bewahrtes Pflanzen-Totum — 239€"
    },
    description: {
      fr: "Découvrez l'extracteur BloomLab® : cuve inox 304, vortex cinétique et thermorégulation ±0,5°C pour extraire le Totum de vos plantes médicinales en toute sécurité.",
      en: "Discover the BloomLab® extractor: 304 stainless steel, kinetic vortex, and ±0.5°C thermoregulation for safe plant totum extraction.",
      de: "Entdecken Sie den BloomLab® Extraktor: 304 Edelstahl, Vortex und ±0,5°C Thermoregulation für sichere Pflanzenextraktion."
    },
    image: "/images/og/produit-bloomlab-1200x630.jpg",
    imageSquare: "/images/og/produit-bloomlab-1080x1080.jpg",
    imageAlt: "Machine BloomLab® en acier inoxydable 304 pour extraction botanique de précision",
    type: "product"
  },
  machine: {
    title: {
      fr: "BloomLab® Extracteur Botanique | Totum Végétal Préservé — 239€",
      en: "BloomLab® Botanical Extractor | Preserved Plant Totum — €239",
      de: "BloomLab® Pflanzenextraktor | Bewahrtes Pflanzen-Totum — 239€"
    },
    description: {
      fr: "Découvrez l'extracteur BloomLab® : cuve inox 304, vortex cinétique et thermorégulation ±0,5°C pour extraire le Totum de vos plantes médicinales en toute sécurité.",
      en: "Discover the BloomLab® extractor: 304 stainless steel, kinetic vortex, and ±0.5°C thermoregulation for safe plant totum extraction.",
      de: "Entdecken Sie den BloomLab® Extraktor: 304 Edelstahl, Vortex und ±0,5°C Thermoregulation für sichere Pflanzenextraktion."
    },
    image: "/images/og/produit-bloomlab-1200x630.jpg",
    imageSquare: "/images/og/produit-bloomlab-1080x1080.jpg",
    imageAlt: "Machine BloomLab® en acier inoxydable 304 pour extraction botanique de précision",
    type: "product"
  },
  'infuseur-botanique': {
    title: {
      fr: "Infuseur Botanique Précision | Tisanes Actives BloomLab",
      en: "Precision Botanical Infuser | Active Herbal Teas BloomLab",
      de: "Präzisions-Infuser | Aktive Kräutertees BloomLab"
    },
    description: {
      fr: "Découvrez l'infuseur botanique BloomLab : extraction en chambre hermétique à température régulée pour des tisanes actives riches en principes aromatiques.",
      en: "Discover BloomLab botanical infuser: closed-chamber extraction with regulated temperature for active teas rich in aromatic compounds.",
      de: "Entdecken Sie den BloomLab Infuser: Extraktion in geschlossener Kammer für wirkstoffreiche Kräutertees."
    },
    image: "/images/og/infuseur-botanique-precision-bloomlab-1200x630.jpg",
    imageSquare: "/images/og/infuseur-botanique-precision-bloomlab-1080x1080.jpg",
    imageAlt: "Infuseur botanique de précision et préparation de tisanes actives",
    type: "article"
  },
  'pillar-extraction': {
    title: {
      fr: "Extraction Botanique Guide | Totum & Séquençage A/B",
      en: "Botanical Extraction Guide | Totum & A/B Sequencing",
      de: "Leitfaden Pflanzenextraktion | Totum & A/B-Sequenzierung"
    },
    description: {
      fr: "Guide de référence de l'extraction botanique : solvants polaires et apolaires, courbes thermiques et séquençage A/B pour capturer le Totum végétal entier.",
      en: "Authoritative guide to botanical extraction: polar and non-polar solvents, thermal curves, and A/B sequencing to capture full plant totum.",
      de: "Leitfaden für botanische Extraktion: polare Lösungsmittel, Temperaturkurven und A/B-Sequenzierung für das volle Totum."
    },
    image: "/images/og/extraction-botanique-totum-solvants-1200x630.jpg",
    imageSquare: "/images/og/extraction-botanique-totum-solvants-1080x1080.jpg",
    imageAlt: "Guide de l'extraction végétale, solvants et Totum botanique",
    type: "article"
  },
  'extraction-botanique': {
    title: {
      fr: "Extraction Botanique Guide | Totum & Séquençage A/B",
      en: "Botanical Extraction Guide | Totum & A/B Sequencing",
      de: "Leitfaden Pflanzenextraktion | Totum & A/B-Sequenzierung"
    },
    description: {
      fr: "Guide de référence de l'extraction botanique : solvants polaires et apolaires, courbes thermiques et séquençage A/B pour capturer le Totum végétal entier.",
      en: "Authoritative guide to botanical extraction: polar and non-polar solvents, thermal curves, and A/B sequencing to capture full plant totum.",
      de: "Leitfaden für botanische Extraktion: polare Lösungsmittel, Temperaturkurven und A/B-Sequenzierung für das volle Totum."
    },
    image: "/images/og/extraction-botanique-totum-solvants-1200x630.jpg",
    imageSquare: "/images/og/extraction-botanique-totum-solvants-1080x1080.jpg",
    imageAlt: "Guide de l'extraction végétale, solvants et Totum botanique",
    type: "article"
  },
  'guide-complet': {
    title: {
      fr: "Extraction Botanique Guide | Totum & Séquençage A/B",
      en: "Botanical Extraction Guide | Totum & A/B Sequencing",
      de: "Leitfaden Pflanzenextraktion | Totum & A/B-Sequenzierung"
    },
    description: {
      fr: "Guide de référence de l'extraction botanique : solvants polaires et apolaires, courbes thermiques et séquençage A/B pour capturer le Totum végétal entier.",
      en: "Authoritative guide to botanical extraction: polar and non-polar solvents, thermal curves, and A/B sequencing to capture full plant totum.",
      de: "Leitfaden für botanische Extraktion: polare Lösungsmittel, Temperaturkurven und A/B-Sequenzierung für das volle Totum."
    },
    image: "/images/og/extraction-botanique-totum-solvants-1200x630.jpg",
    imageSquare: "/images/og/extraction-botanique-totum-solvants-1080x1080.jpg",
    imageAlt: "Guide de l'extraction végétale, solvants et Totum botanique",
    type: "article"
  },
  'infusion-botanique': {
    title: {
      fr: "Infusion Botanique Maison | Guide Complet",
      en: "Homemade Botanical Infusion | Complete Guide",
      de: "Hausgemachte Kräuter-Infusion | Vollständiger Leitfaden"
    },
    description: {
      fr: "Comment réussir vos infusions botaniques maison : température précise, extraction fermée sans évaporation et préservation des principes actifs thermolabiles.",
      en: "How to master homemade botanical infusions: exact temperature, closed-chamber extraction, and preservation of bioactive thermolabile compounds.",
      de: "Hausgemachte botanische Aufgüsse: präzise Temperatur, geschlossene Kammer und Schutz empfindlicher Wirkstoffe."
    },
    image: "/images/og/infusion-botanique-maison-extraction-active-1200x630.jpg",
    imageSquare: "/images/og/infusion-botanique-maison-extraction-active-1080x1080.jpg",
    imageAlt: "Infusion botanique maison et extraction de principes actifs",
    type: "article"
  },
  'infusion-botanique-maison-comment-ca-marche': {
    title: {
      fr: "Infusion Botanique Maison | Guide Complet",
      en: "Homemade Botanical Infusion | Complete Guide",
      de: "Hausgemachte Kräuter-Infusion | Vollständiger Leitfaden"
    },
    description: {
      fr: "Comment réussir vos infusions botaniques maison : température précise, extraction fermée sans évaporation et préservation des principes actifs thermolabiles.",
      en: "How to master homemade botanical infusions: exact temperature, closed-chamber extraction, and preservation of bioactive thermolabile compounds.",
      de: "Hausgemachte botanische Aufgüsse: präzise Temperatur, geschlossene Kammer und Schutz empfindlicher Wirkstoffe."
    },
    image: "/images/og/infusion-botanique-maison-extraction-active-1200x630.jpg",
    imageSquare: "/images/og/infusion-botanique-maison-extraction-active-1080x1080.jpg",
    imageAlt: "Infusion botanique maison et extraction de principes actifs",
    type: "article"
  },
  'infusion-precision': {
    title: {
      fr: "Infuseur Botanique Précision | Tisanes Actives BloomLab",
      en: "Precision Botanical Infuser | Active Herbal Teas BloomLab",
      de: "Präzisions-Infuser | Aktive Kräutertees BloomLab"
    },
    description: {
      fr: "Découvrez l'infuseur botanique BloomLab : extraction en chambre hermétique à température régulée pour des tisanes actives riches en principes aromatiques.",
      en: "Discover BloomLab botanical infuser: closed-chamber extraction with regulated temperature for active teas rich in aromatic compounds.",
      de: "Entdecken Sie den BloomLab Infuser: Extraktion in geschlossener Kammer für wirkstoffreiche Kräutertees."
    },
    image: "/images/og/infuseur-botanique-precision-bloomlab-1200x630.jpg",
    imageSquare: "/images/og/infuseur-botanique-precision-bloomlab-1080x1080.jpg",
    imageAlt: "Infuseur botanique de précision et préparation de tisanes actives",
    type: "article"
  },
  'phytotherapie-reset': {
    title: {
      fr: "Reset Homéostasique | Protocoles Phytothérapie",
      en: "Homeostatic Reset | Bloom Phytotherapy Protocols",
      de: "Homöostatischer Reset | Bloom Phytotherapie-Protokolle"
    },
    description: {
      fr: "Reset Homéostasique : protocoles de phytothérapie intégrale pour réinitialiser le terrain biologique, soutenir les émonctoires et réguler l'axe HPA en 90 jours.",
      en: "Homeostatic Reset: integral phytotherapy protocols to reset biological terrain, support emunctories, and regulate HPA axis in 90 days.",
      de: "Homöostatischer Reset: ganzheitliche Phytotherapie-Protokolle zur Wiederherstellung des Terrains und HPA-Achsen-Regulierung."
    },
    image: "/images/og/phytotherapie-reset-homeostasie-terrain-1200x630.jpg",
    imageSquare: "/images/og/phytotherapie-reset-homeostasie-terrain-1080x1080.jpg",
    imageAlt: "Phytothérapie systémique et protocoles de reset homéostasique",
    type: "article"
  },
  'votre-pratique': {
    title: {
      fr: "Reset Homéostasique | Protocoles Phytothérapie",
      en: "Homeostatic Reset | Bloom Phytotherapy Protocols",
      de: "Homöostatischer Reset | Bloom Phytotherapie-Protokolle"
    },
    description: {
      fr: "Reset Homéostasique : protocoles de phytothérapie intégrale pour réinitialiser le terrain biologique, soutenir les émonctoires et réguler l'axe HPA en 90 jours.",
      en: "Homeostatic Reset: integral phytotherapy protocols to reset biological terrain, support emunctories, and regulate HPA axis in 90 days.",
      de: "Homöostatischer Reset: ganzheitliche Phytotherapie-Protokolle zur Wiederherstellung des Terrains und HPA-Achsen-Regulierung."
    },
    image: "/images/og/phytotherapie-reset-homeostasie-terrain-1200x630.jpg",
    imageSquare: "/images/og/phytotherapie-reset-homeostasie-terrain-1080x1080.jpg",
    imageAlt: "Phytothérapie systémique et protocoles de reset homéostasique",
    type: "article"
  },
  'parcours': {
    title: {
      fr: "Reset Homéostasique | Protocoles Phytothérapie",
      en: "Homeostatic Reset | Bloom Phytotherapy Protocols",
      de: "Homöostatischer Reset | Bloom Phytotherapie-Protokolle"
    },
    description: {
      fr: "Reset Homéostasique : protocoles de phytothérapie intégrale pour réinitialiser le terrain biologique, soutenir les émonctoires et réguler l'axe HPA en 90 jours.",
      en: "Homeostatic Reset: integral phytotherapy protocols to reset biological terrain, support emunctories, and regulate HPA axis in 90 days.",
      de: "Homöostatischer Reset: ganzheitliche Phytotherapie-Protokolle zur Wiederherstellung des Terrains und HPA-Achsen-Regulierung."
    },
    image: "/images/og/phytotherapie-reset-homeostasie-terrain-1200x630.jpg",
    imageSquare: "/images/og/phytotherapie-reset-homeostasie-terrain-1080x1080.jpg",
    imageAlt: "Phytothérapie systémique et protocoles de reset homéostasique",
    type: "article"
  },
  'totum-vegetal': {
    title: {
      fr: "Totum Végétal | Synergie Plantes Médicinales",
      en: "Plant Totum | Medicinal Plants Synergy",
      de: "Pflanzen-Totum | Synergie der Heilpflanzen"
    },
    description: {
      fr: "Comprendre le Totum végétal : la puissance de la plante entière et la synergie de ses principes actifs face aux molécules isolées de synthèse en phytothérapie.",
      en: "Understand plant totum: whole-plant power and synergistic bioactives versus isolated synthetic compounds in phytotherapy.",
      de: "Das Pflanzen-Totum verstehen: die Kraft der ganzen Pflanze und molekulare Synergie gegenüber isolierten Stoffen."
    },
    image: "/images/og/totum-vegetal-synergie-plantes-medicinales-1200x630.jpg",
    imageSquare: "/images/og/totum-vegetal-synergie-plantes-medicinales-1080x1080.jpg",
    imageAlt: "Le Totum végétal en phytothérapie et synergie moléculaire",
    type: "article"
  },
  'totum-definition': {
    title: {
      fr: "Totum Végétal | Synergie Plantes Médicinales",
      en: "Plant Totum | Medicinal Plants Synergy",
      de: "Pflanzen-Totum | Synergie der Heilpflanzen"
    },
    description: {
      fr: "Comprendre le Totum végétal : la puissance de la plante entière et la synergie de ses principes actifs face aux molécules isolées de synthèse en phytothérapie.",
      en: "Understand plant totum: whole-plant power and synergistic bioactives versus isolated synthetic compounds in phytotherapy.",
      de: "Das Pflanzen-Totum verstehen: die Kraft der ganzen Pflanze und molekulare Synergie gegenüber isolierten Stoffen."
    },
    image: "/images/og/totum-vegetal-synergie-plantes-medicinales-1200x630.jpg",
    imageSquare: "/images/og/totum-vegetal-synergie-plantes-medicinales-1080x1080.jpg",
    imageAlt: "Le Totum végétal en phytothérapie et synergie moléculaire",
    type: "article"
  },
  'plantes-adaptogenes': {
    title: {
      fr: "Plantes Adaptogènes | Stress & Système Nerveux",
      en: "Adaptogenic Plants | Stress & Nervous System",
      de: "Adaptogene Pflanzen | Stress & Nervensystem"
    },
    description: {
      fr: "Guide des plantes adaptogènes : ashwagandha, rhodiola et éleuthérocoque pour réguler le stress chronique, l'axe HPA et restaurer la vitalité nerveuse.",
      en: "Guide to adaptogenic plants: ashwagandha, rhodiola, and eleuthero to regulate chronic stress, HPA axis, and restore vitality.",
      de: "Leitfaden zu Adaptogenen: Ashwagandha, Rhodiola und Eleutherococcus zur Regulierung von chronischem Stress und der HPA-Achse."
    },
    image: "/images/og/plantes-adaptogenes-axe-hpa-systeme-nerveux-1200x630.jpg",
    imageSquare: "/images/og/plantes-adaptogenes-axe-hpa-systeme-nerveux-1080x1080.jpg",
    imageAlt: "Plantes adaptogènes pour réguler le stress et l'axe HPA",
    type: "article"
  },
  herbier: {
    title: {
      fr: "Herbier Bloom | Plantes Médicinales & Adaptogènes",
      en: "Bloom Herbarium | Medicinal & Adaptogenic Plants",
      de: "Bloom Herbarium | Heil- & Adaptogene Pflanzen"
    },
    description: {
      fr: "Herbier complet : plantes médicinales, adaptogènes, propriétés et usages. Fiches détaillées pour extraction botanique avec BloomLab®.",
      en: "Complete herbarium: medicinal plants, adaptogens, properties, and uses. Detailed profiles for botanical extraction with BloomLab®.",
      de: "Vollständiges Herbarium: Heilpflanzen, Adaptogene, Eigenschaften und Anwendungen für BloomLab®."
    },
    image: "/images/og/herbier-plantes-medicinales-botanique-1200x630.jpg",
    imageSquare: "/images/og/herbier-plantes-medicinales-botanique-1080x1080.jpg",
    imageAlt: "Herbier botanique interactif et fiches des plantes médicinales",
    type: "article"
  },
  library: {
    title: {
      fr: "Herbier Bloom | Plantes Médicinales & Adaptogènes",
      en: "Bloom Herbarium | Medicinal & Adaptogenic Plants",
      de: "Bloom Herbarium | Heil- & Adaptogene Pflanzen"
    },
    description: {
      fr: "Herbier complet : plantes médicinales, adaptogènes, propriétés et usages. Fiches détaillées pour extraction botanique avec BloomLab®.",
      en: "Complete herbarium: medicinal plants, adaptogens, properties, and uses. Detailed profiles for botanical extraction with BloomLab®.",
      de: "Vollständiges Herbarium: Heilpflanzen, Adaptogene, Eigenschaften und Anwendungen für BloomLab®."
    },
    image: "/images/og/herbier-plantes-medicinales-botanique-1200x630.jpg",
    imageSquare: "/images/og/herbier-plantes-medicinales-botanique-1080x1080.jpg",
    imageAlt: "Herbier botanique interactif et fiches des plantes médicinales",
    type: "article"
  },
  herbarium: {
    title: {
      fr: "Herbier Bloom | Plantes Médicinales & Adaptogènes",
      en: "Bloom Herbarium | Medicinal & Adaptogenic Plants",
      de: "Bloom Herbarium | Heil- & Adaptogene Pflanzen"
    },
    description: {
      fr: "Herbier complet : plantes médicinales, adaptogènes, propriétés et usages. Fiches détaillées pour extraction botanique avec BloomLab®.",
      en: "Complete herbarium: medicinal plants, adaptogens, properties, and uses. Detailed profiles for botanical extraction with BloomLab®.",
      de: "Vollständiges Herbarium: Heilpflanzen, Adaptogene, Eigenschaften und Anwendungen für BloomLab®."
    },
    image: "/images/og/herbier-plantes-medicinales-botanique-1200x630.jpg",
    imageSquare: "/images/og/herbier-plantes-medicinales-botanique-1080x1080.jpg",
    imageAlt: "Herbier botanique interactif et fiches des plantes médicinales",
    type: "article"
  },
  cosmetiques: {
    title: {
      fr: "Cosmétique Botanique Maison | Soins & Macérats Huileux",
      en: "Homemade Botanical Cosmetics | Skincare & Infused Oils",
      de: "Hausgemachte Naturkosmetik | Pflege & Ölauszüge"
    },
    description: {
      fr: "Formulez vos cosmétiques botaniques maison à 45°C : sérums visage purs, macérats huileux de calendula et baumes régénérants sans additifs chimiques.",
      en: "Formulate pure botanical cosmetics at 45°C: facial serums, calendula macerations, and balms without chemical additives.",
      de: "Formulieren Sie reine Naturkosmetik bei 45°C: Gesichtsseren, Ringelblumen-Mazerate und Balsame ohne Zusätze."
    },
    image: "/images/og/cosmetique-botanique-macerat-huileux-1200x630.jpg",
    imageSquare: "/images/og/cosmetique-botanique-macerat-huileux-1080x1080.jpg",
    imageAlt: "Cosmétique botanique maison, huiles de soin et macérats de précision",
    type: "article"
  },
  'cosmetique-botanique': {
    title: {
      fr: "Cosmétique Botanique Maison | Soins & Macérats Huileux",
      en: "Homemade Botanical Cosmetics | Skincare & Infused Oils",
      de: "Hausgemachte Naturkosmetik | Pflege & Ölauszüge"
    },
    description: {
      fr: "Formulez vos cosmétiques botaniques maison à 45°C : sérums visage purs, macérats huileux de calendula et baumes régénérants sans additifs chimiques.",
      en: "Formulate pure botanical cosmetics at 45°C: facial serums, calendula macerations, and balms without chemical additives.",
      de: "Formulieren Sie reine Naturkosmetik bei 45°C: Gesichtsseren, Ringelblumen-Mazerate und Balsame ohne Zusätze."
    },
    image: "/images/og/cosmetique-botanique-macerat-huileux-1200x630.jpg",
    imageSquare: "/images/og/cosmetique-botanique-macerat-huileux-1080x1080.jpg",
    imageAlt: "Cosmétique botanique maison, huiles de soin et macérats de précision",
    type: "article"
  },
  culinaire: {
    title: {
      fr: "Gastronomie Botanique | Huiles Aromatisées & Bouillons",
      en: "Botanical Gastronomy | Infused Oils & Herbal Broths",
      de: "Botanische Gastronomie | Kräuteröle & Aromatische Brühen"
    },
    description: {
      fr: "Gastronomie botanique de précision : créez des huiles infusées d'exception, vinaigres botaniques et bouillons actifs grâce au vortex cinétique BloomLab.",
      en: "Precision botanical gastronomy: craft exceptional culinary oils, vinegars, and active broths using BloomLab kinetic vortex.",
      de: "Botanische Gourmetküche: kreieren Sie hochwertige Kräuteröle, Essige und Brühen mit dem BloomLab Vortex."
    },
    image: "/images/og/gastronomie-botanique-huiles-aromatiques-1200x630.jpg",
    imageSquare: "/images/og/gastronomie-botanique-huiles-aromatiques-1080x1080.jpg",
    imageAlt: "Gastronomie botanique, huiles infusées culinaires et bouillons actifs",
    type: "article"
  },
  'gastronomie-botanique': {
    title: {
      fr: "Gastronomie Botanique | Huiles Aromatisées & Bouillons",
      en: "Botanical Gastronomy | Infused Oils & Herbal Broths",
      de: "Botanische Gastronomie | Kräuteröle & Aromatische Brühen"
    },
    description: {
      fr: "Gastronomie botanique de précision : créez des huiles infusées d'exception, vinaigres botaniques et bouillons actifs grâce au vortex cinétique BloomLab.",
      en: "Precision botanical gastronomy: craft exceptional culinary oils, vinegars, and active broths using BloomLab kinetic vortex.",
      de: "Botanische Gourmetküche: kreieren Sie hochwertige Kräuteröle, Essige und Brühen mit dem BloomLab Vortex."
    },
    image: "/images/og/gastronomie-botanique-huiles-aromatiques-1200x630.jpg",
    imageSquare: "/images/og/gastronomie-botanique-huiles-aromatiques-1080x1080.jpg",
    imageAlt: "Gastronomie botanique, huiles infusées culinaires et bouillons actifs",
    type: "article"
  },
  articles: {
    title: {
      fr: "Articles Savoirs Botaniques | Phytothérapie Maison",
      en: "Botanical Knowledge Articles | Home Phytotherapy",
      de: "Botanische Wissensartikel | Hausgemachte Phytotherapie"
    },
    description: {
      fr: "Explorez tous nos articles d'experts sur l'extraction botanique, la phytothérapie de terrain, les plantes adaptogènes et les macérations de précision.",
      en: "Explore expert articles on botanical extraction, terrain phytotherapy, adaptogens, and precision macerations.",
      de: "Erkunden Sie Expertenartikel zu botanischer Extraktion, Phytotherapie, Adaptogenen und Präzisions-Mazerationen."
    },
    image: "/images/og/articles-savoirs-herboristerie-botanique-1200x630.jpg",
    imageSquare: "/images/og/articles-savoirs-herboristerie-botanique-1080x1080.jpg",
    imageAlt: "Articles et savoirs botaniques en phytothérapie et herboristerie",
    type: "website"
  },
  boutique: {
    title: {
      fr: "Kits Plantes Médicinales & Remèdes Naturels | Bloom",
      en: "Medicinal Plant Kits & Natural Remedies | Bloom",
      de: "Heilpflanzen-Kits & Natürliche Heilmittel | Bloom"
    },
    description: {
      fr: "Kits de plantes médicinales pour remèdes naturels maison. BloomLab® extracteur botanique + plantes bio pour infusions, huiles et soins. Totum préservé.",
      en: "Medicinal plant kits for homemade natural remedies. BloomLab® botanical extractor + organic herbs for infusions, oils, and balms. Totum preserved.",
      de: "Heilpflanzen-Kits für hausgemachte Heilmittel. BloomLab® Extraktor + Bio-Pflanzen für Aufgüsse, Öle und Pflege. Totum bewahrt."
    },
    image: "/images/og/boutique-bloomlab-kits-plantes-1200x630.jpg",
    imageSquare: "/images/og/boutique-bloomlab-kits-plantes-1080x1080.jpg",
    imageAlt: "Boutique officielle Bloom by BotaniK, BloomLab et kits de plantes",
    type: "website"
  },
  'boutique-kits': {
    title: {
      fr: "Kits de Plantes & Remèdes Naturels Maison | Bloom",
      en: "Plant Kits & Homemade Natural Remedies | Bloom",
      de: "Pflanzen-Kits & Hausgemachte Naturheilmittel | Bloom"
    },
    description: {
      fr: "Catalogue complet des kits de plantes médicinales bio pour BloomLab®. Synergies végétales ciblées : sommeil, digestion, vitalité, immunité et articulations.",
      en: "Complete catalog of organic medicinal plant kits for BloomLab®. Targeted synergies: sleep, digestion, vitality, immunity, and joints.",
      de: "Vollständiger Katalog von Bio-Heilpflanzen-Kits für BloomLab®. Gezielte Synergien: Schlaf, Verdauung, Vitalität, Immunität und Gelenke."
    },
    image: "/images/og/boutique-bloomlab-kits-plantes-1200x630.jpg",
    imageSquare: "/images/og/boutique-bloomlab-kits-plantes-1080x1080.jpg",
    imageAlt: "Kits de plantes médicinales bio pour BloomLab",
    type: "website"
  },
  'kits-botaniques': {
    title: {
      fr: "Kits de Plantes & Remèdes Naturels Maison | Bloom",
      en: "Plant Kits & Homemade Natural Remedies | Bloom",
      de: "Pflanzen-Kits & Hausgemachte Naturheilmittel | Bloom"
    },
    description: {
      fr: "Catalogue complet des kits de plantes médicinales bio pour BloomLab®. Synergies végétales ciblées : sommeil, digestion, vitalité, immunité et articulations.",
      en: "Complete catalog of organic medicinal plant kits for BloomLab®. Targeted synergies: sleep, digestion, vitality, immunity, and joints.",
      de: "Vollständiger Katalog von Bio-Heilpflanzen-Kits für BloomLab®. Gezielte Synergien: Schlaf, Verdauung, Vitalität, Immunität und Gelenke."
    },
    image: "/images/og/boutique-bloomlab-kits-plantes-1200x630.jpg",
    imageSquare: "/images/og/boutique-bloomlab-kits-plantes-1080x1080.jpg",
    imageAlt: "Kits de plantes médicinales bio pour BloomLab",
    type: "website"
  },
  manifeste: {
    title: {
      fr: "Manifeste Bloom | Souveraineté Sanitaire & Plantes",
      en: "Bloom Manifesto | Health Sovereignty & Plants",
      de: "Bloom Manifest | Gesundheitliche Souveränität & Pflanzen"
    },
    description: {
      fr: "Manifeste Bloom by BotaniK : souveraineté sanitaire, ingénierie biologique et réconciliation entre rigueur scientifique et sagesse végétale ancestrale.",
      en: "Bloom by BotaniK Manifesto: health sovereignty, biological engineering, and uniting scientific rigor with ancestral plant wisdom.",
      de: "Bloom by BotaniK Manifest: gesundheitliche Souveränität und Vereinigung moderner Wissenschaft mit traditioneller Kräuterkunde."
    },
    image: "/images/og/manifeste-souverainete-sanitaire-botanique-1200x630.jpg",
    imageSquare: "/images/og/manifeste-souverainete-sanitaire-botanique-1080x1080.jpg",
    imageAlt: "Manifeste Bloom by BotaniK pour la souveraineté botanique et le reset homéostasique",
    type: "article"
  },
  faq: {
    title: {
      fr: "FAQ Extracteur Botanique | Questions Fréquentes",
      en: "Botanical Extractor FAQ | Frequently Asked Questions",
      de: "Pflanzenextraktor FAQ | Häufig Gestellte Fragen"
    },
    description: {
      fr: "Foire aux questions BloomLab® : garanties, entretien de l'inox 304, protocoles d'extraction, solvants autorisés et délais d'expédition sous 24 à 48 heures.",
      en: "BloomLab® FAQ: warranty, 304 stainless steel maintenance, extraction protocols, authorized solvents, and 24-48h dispatch.",
      de: "BloomLab® FAQ: Garantie, Pflege des 304 Edelstahls, Extraktionsprotokolle und schneller Versand."
    },
    image: "/images/og/questions-frequentes-bloomlab-botanique-1200x630.jpg",
    imageSquare: "/images/og/questions-frequentes-bloomlab-botanique-1080x1080.jpg",
    imageAlt: "Foire aux questions sur l'infuseur BloomLab et l'extraction végétale",
    type: "website"
  },
  'questions-frequentes': {
    title: {
      fr: "FAQ Extracteur Botanique | Questions Fréquentes",
      en: "Botanical Extractor FAQ | Frequently Asked Questions",
      de: "Pflanzenextraktor FAQ | Häufig Gestellte Fragen"
    },
    description: {
      fr: "Foire aux questions BloomLab® : garanties, entretien de l'inox 304, protocoles d'extraction, solvants autorisés et délais d'expédition sous 24 à 48 heures.",
      en: "BloomLab® FAQ: warranty, 304 stainless steel maintenance, extraction protocols, authorized solvents, and 24-48h dispatch.",
      de: "BloomLab® FAQ: Garantie, Pflege des 304 Edelstahls, Extraktionsprotokolle und schneller Versand."
    },
    image: "/images/og/questions-frequentes-bloomlab-botanique-1200x630.jpg",
    imageSquare: "/images/og/questions-frequentes-bloomlab-botanique-1080x1080.jpg",
    imageAlt: "Foire aux questions sur l'infuseur BloomLab et l'extraction végétale",
    type: "website"
  },
  lexique: {
    title: {
      fr: "Lexique Phytothérapie | Termes Extraction Botanique",
      en: "Phytotherapy Glossary | Botanical Extraction Terms",
      de: "Phytotherapie-Glossar | Botanische Extraktionsbegriffe"
    },
    description: {
      fr: "Lexique de phytothérapie et d'extraction botanique : définitions du Totum, de la charge allostatique, des solvants nobles et du séquençage actif A/B.",
      en: "Phytotherapy and botanical extraction glossary: definitions of Totum, allostatic load, noble solvents, and active A/B sequencing.",
      de: "Glossar für Phytotherapie und Extraktion: Definitionen von Totum, allostatischer Last, Lösungsmitteln und A/B-Sequenzierung."
    },
    image: "/images/og/lexique-phytotherapie-extraction-botanique-1200x630.jpg",
    imageSquare: "/images/og/lexique-phytotherapie-extraction-botanique-1080x1080.jpg",
    imageAlt: "Lexique de phytothérapie et termes d'herboristerie",
    type: "article"
  },
  contact: {
    title: {
      fr: "Contact & Assistance Botanique | Bloom by BotaniK",
      en: "Contact & Botanical Support | Bloom by BotaniK",
      de: "Kontakt & Botanischer Support | Bloom by BotaniK"
    },
    description: {
      fr: "Une question sur BloomLab® ou nos kits botaniques ? Contactez nos conseillers en phytothérapie. Équipe basée en France, réponse sous 24 à 48 heures.",
      en: "Questions about BloomLab® or plant kits? Contact our phytotherapy specialists based in France. Fast response within 24-48 hours.",
      de: "Fragen zu BloomLab® oder unseren Pflanzen-Kits? Kontaktieren Sie unsere Spezialisten. Antwort innerhalb von 24 bis 48 Stunden."
    },
    image: "/images/og/contact-bloom-by-botanik-1200x630.jpg",
    imageSquare: "/images/og/contact-bloom-by-botanik-1080x1080.jpg",
    imageAlt: "Contactez l'équipe Bloom by BotaniK pour vos questions botaniques",
    type: "website"
  },
  'huile-infusee': {
    title: {
      fr: "Huiles Infusées Maison | Guide Macération Végétale",
      en: "Homemade Infused Oils | Botanical Maceration Guide",
      de: "Hausgemachte Kräuteröle | Pflanzenmazerations-Leitfaden"
    },
    description: {
      fr: "Guide pratique des huiles infusées : sélection des huiles végétales bio, température de macération à 45°C et extraction des principes actifs liposolubles.",
      en: "Practical guide to infused oils: organic plant oil selection, 45°C maceration temperature, and lipid-soluble active extraction.",
      de: "Praxisleitfaden für Kräuteröle: Bio-Ölauswahl, 45°C Mazerationstemperatur und Extraktion fettlöslicher Wirkstoffe."
    },
    image: "/images/og/huiles-infusees-maceration-plantes-1200x630.jpg",
    imageSquare: "/images/og/huiles-infusees-maceration-plantes-1080x1080.jpg",
    imageAlt: "Huiles infusées et macération d'herboristerie maison de précision",
    type: "article"
  },
  'maceration-plantes': {
    title: {
      fr: "Huiles Infusées Maison | Guide Macération Végétale",
      en: "Homemade Infused Oils | Botanical Maceration Guide",
      de: "Hausgemachte Kräuteröle | Pflanzenmazerations-Leitfaden"
    },
    description: {
      fr: "Guide pratique des huiles infusées : sélection des huiles végétales bio, température de macération à 45°C et extraction des principes actifs liposolubles.",
      en: "Practical guide to infused oils: organic plant oil selection, 45°C maceration temperature, and lipid-soluble active extraction.",
      de: "Praxisleitfaden für Kräuteröle: Bio-Ölauswahl, 45°C Mazerationstemperatur und Extraktion fettlöslicher Wirkstoffe."
    },
    image: "/images/og/huiles-infusees-maceration-plantes-1200x630.jpg",
    imageSquare: "/images/og/huiles-infusees-maceration-plantes-1080x1080.jpg",
    imageAlt: "Huiles infusées et macération d'herboristerie maison de précision",
    type: "article"
  },
  'teinture-mere': {
    title: {
      fr: "Teinture-Mère Maison | Guide Extraits Hydroalcooliques",
      en: "Homemade Mother Tincture | Hydroalcoholic Extracts Guide",
      de: "Hausgemachte Urtinktur | Hydroalkoholische Extrakte"
    },
    description: {
      fr: "Fabrication de teintures mères maison : ratios 1:5, choix des titres alcooliques et extraction dynamique par vortex cinétique pour un concentré d'actifs.",
      en: "Craft homemade mother tinctures: 1:5 ratios, alcohol titres selection, and dynamic vortex extraction for concentrated actives.",
      de: "Herstellung von Urtinkturen zu Hause: 1:5 Verhältnisse und dynamische Vortex-Extraktion für maximale Wirkstoffkonzentration."
    },
    image: "/images/og/teinture-mere-extraits-hydroalcooliques-1200x630.jpg",
    imageSquare: "/images/og/teinture-mere-extraits-hydroalcooliques-1080x1080.jpg",
    imageAlt: "Guide de la teinture-mère et extraits hydroalcooliques de plantes médicinales",
    type: "article"
  },
  'solvants-extraction': {
    title: {
      fr: "Teinture-Mère Maison | Guide Extraits Hydroalcooliques",
      en: "Homemade Mother Tincture | Hydroalcoholic Extracts Guide",
      de: "Hausgemachte Urtinktur | Hydroalkoholische Extrakte"
    },
    description: {
      fr: "Fabrication de teintures mères maison : ratios 1:5, choix des titres alcooliques et extraction dynamique par vortex cinétique pour un concentré d'actifs.",
      en: "Craft homemade mother tinctures: 1:5 ratios, alcohol titres selection, and dynamic vortex extraction for concentrated actives.",
      de: "Herstellung von Urtinkturen zu Hause: 1:5 Verhältnisse und dynamische Vortex-Extraktion für maximale Wirkstoffkonzentration."
    },
    image: "/images/og/teinture-mere-extraits-hydroalcooliques-1200x630.jpg",
    imageSquare: "/images/og/teinture-mere-extraits-hydroalcooliques-1080x1080.jpg",
    imageAlt: "Guide de la teinture-mère et extraits hydroalcooliques de plantes médicinales",
    type: "article"
  },
  terrain: {
    title: {
      fr: "Les 8 Terrains Biologiques | Équilibre & Homéostasie",
      en: "The 8 Biological Terrains | Balance & Homeostasis",
      de: "Die 8 Biologischen Terrains | Gleichgewicht & Homöostase"
    },
    description: {
      fr: "Explorez les 8 terrains biologiques en phytothérapie systémique : cartographiez vos vulnérabilités et choisissez les synergies de plantes appropriées.",
      en: "Explore the 8 biological terrains in systemic phytotherapy: map your vulnerabilities and choose adapted plant synergies.",
      de: "Erkunden Sie die 8 biologischen Terrains in der systemischen Phytotherapie und wählen Sie abgestimmte Pflanzensynergien."
    },
    image: "/images/og/terrain-biologique-equilibre-homeostasie-1200x630.jpg",
    imageSquare: "/images/og/terrain-biologique-equilibre-homeostasie-1080x1080.jpg",
    imageAlt: "Les 8 terrains biologiques en phytothérapie systémique",
    type: "article"
  },
  hormese: {
    title: {
      fr: "Hormèse Végétale | Principes Amers & Résilience Bloom",
      en: "Plant Hormesis | Bitter Principles & Resilience Bloom",
      de: "Pflanzliche Hormesis | Bitterstoffe & Resilienz Bloom"
    },
    description: {
      fr: "Le principe d'hormèse végétale : comment les molécules de défense des plantes stimulent notre pharmacie intérieure et nos mécanismes de régénération.",
      en: "Plant hormesis: how botanical defense compounds trigger human endogenous cellular resilience and regeneration.",
      de: "Pflanzliche Hormesis: wie Bitterstoffe körpereigene Schutz- und Regenerationsmechanismen aktivieren."
    },
    image: "/images/og/hormese-vegetale-resilience-cellulaire-1200x630.jpg",
    imageSquare: "/images/og/hormese-vegetale-resilience-cellulaire-1080x1080.jpg",
    imageAlt: "Hormèse et résilience biologique par les principes amers végétaux",
    type: "article"
  },
  abonnement: {
    title: {
      fr: "Abonnement Bloom | Protocoles & Accompagnement ALMA",
      en: "Bloom Subscription | Protocols & ALMA Guidance",
      de: "Bloom Abonnement | Protokolle & ALMA Begleitung"
    },
    description: {
      fr: "Rejoignez Bloom : accédez aux protocoles saisonniers de reset homéostatique, au suivi d'anamnèse ALMA et à l'ensemble des formules botaniques guidées.",
      en: "Join Bloom: access seasonal homeostatic reset protocols, ALMA anamnesis support, and all guided botanical formulations.",
      de: "Werden Sie Bloom-Mitglied: saisonale Reset-Protokolle, ALMA-Begleitung und geführte botanische Rezepturen."
    },
    image: "/images/og/guide-utilisation-protocoles-bloomlab-1200x630.jpg",
    imageSquare: "/images/og/guide-utilisation-protocoles-bloomlab-1080x1080.jpg",
    imageAlt: "Abonnement Bloom et protocoles d'accompagnement",
    type: "website"
  },
  activation: {
    title: {
      fr: "Activer Votre BloomLab® | Garantie & Mise en Service",
      en: "Activate Your BloomLab® | Warranty & Quick Start",
      de: "BloomLab® Aktivieren | Garantie & Inbetriebnahme"
    },
    description: {
      fr: "Activez votre extracteur botanique BloomLab® : enregistrement de la garantie constructeur 1 an et déblocage de vos premiers protocoles d'extraction guidés.",
      en: "Activate your BloomLab® botanical extractor: register 1-year manufacturer warranty and unlock your first guided extraction protocols.",
      de: "Aktivieren Sie Ihren BloomLab®: 1 Jahr Herstellergarantie registrieren und Extraktionsprotokolle freischalten."
    },
    image: "/images/og/produit-bloomlab-1200x630.jpg",
    imageSquare: "/images/og/produit-bloomlab-1080x1080.jpg",
    imageAlt: "Activation et enregistrement de garantie BloomLab",
    type: "website"
  },
  blog: {
    title: {
      fr: "Journal Botanique | Extraction & Remèdes Naturels",
      en: "Botanical Journal | Extraction & Natural Remedies",
      de: "Botanisches Journal | Extraktion & Naturheilmittel"
    },
    description: {
      fr: "Le Journal Botanique Bloom : analyses scientifiques, dossiers d'herboristerie moderne, recettes d'extraction et guides pratiques pour vos remèdes maison.",
      en: "The Bloom Botanical Journal: scientific insights, modern herbalism dossiers, extraction recipes, and practical guides for home remedies.",
      de: "Das Bloom Botanische Journal: wissenschaftliche Analysen, Dossiers zur Kräuterkunde und praktische Anleitungen für Hausmittel."
    },
    image: "/images/og/articles-savoirs-herboristerie-botanique-1200x630.jpg",
    imageSquare: "/images/og/articles-savoirs-herboristerie-botanique-1080x1080.jpg",
    imageAlt: "Journal Botanique Bloom by BotaniK",
    type: "website"
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
  },
  'protocole-psoriasis': {
    title: {
      fr: "Protocole Psoriasis | Reset Terrain Cutané",
      en: "Psoriasis Protocol | Skin Terrain Reset",
      de: "Psoriasis-Protokoll | Haut-Terrain-Reset"
    },
    description: {
      fr: "Protocole complet d'accompagnement du terrain psoriasique par la phytothérapie intégrale : 4 phases, 14 semaines, soutien émonctoriel et régulation cutanée.",
      en: "Comprehensive protocol for psoriasis terrain through integral phytotherapy: 4 phases, 14 weeks, emunctory support, and skin balance.",
      de: "Ganzheitliches Protokoll für das Psoriasis-Terrain: 4 Phasen, 14 Wochen, Entgiftung und Hautregulation."
    },
    image: "/images/og/protocole-psoriasis-reset-homeostatique-1200x630.jpg",
    imageSquare: "/images/og/protocole-psoriasis-reset-homeostatique-1080x1080.jpg",
    imageAlt: "Protocole Psoriasis — Reset Homéostasique et phytothérapie intégrale Bloom by BotaniK",
    type: "article"
  },
  mentions: {
    title: {
      fr: "Mentions Légales | Bloom by BotaniK",
      en: "Legal Notice | Bloom by BotaniK",
      de: "Impressum | Bloom by BotaniK"
    },
    description: {
      fr: "Mentions légales du site bloombybotanik.com : éditeur, hébergement, propriété intellectuelle et informations réglementaires de la marque Bloom.",
      en: "Legal notices for bloombybotanik.com: publisher, hosting, intellectual property, and regulatory information.",
      de: "Rechtliche Hinweise der Website bloombybotanik.com: Herausgeber, Hosting und regulatorische Informationen."
    },
    image: "/images/og/bloom-extracteur-infuseur-botanique-1200x630.jpg",
    imageSquare: "/images/og/bloom-extracteur-infuseur-botanique-1080x1080.jpg",
    imageAlt: "Mentions légales Bloom by BotaniK",
    type: "website"
  },
  privacy: {
    title: {
      fr: "Politique de Confidentialité | Données Personnelles Bloom",
      en: "Privacy Policy | Personal Data Protection Bloom",
      de: "Datenschutzerklärung | Personenbezogene Daten Bloom"
    },
    description: {
      fr: "Politique de confidentialité et protection des données personnelles (RGPD) sur bloombybotanik.com. Vos données de santé et de navigation sont sécurisées.",
      en: "Privacy policy and GDPR compliance on bloombybotanik.com. Your personal health and navigation data remain strictly confidential.",
      de: "Datenschutzerklärung und DSGVO-Konformität auf bloombybotanik.com. Ihre Daten sind geschützt."
    },
    image: "/images/og/bloom-extracteur-infuseur-botanique-1200x630.jpg",
    imageSquare: "/images/og/bloom-extracteur-infuseur-botanique-1080x1080.jpg",
    imageAlt: "Politique de confidentialité Bloom by BotaniK",
    type: "website"
  },
  cgv: {
    title: {
      fr: "Conditions Générales de Vente (CGV) | Bloom by BotaniK",
      en: "Terms of Sale (CGV) | Bloom by BotaniK",
      de: "Allgemeine Verkaufsbedingungen (AGB) | Bloom by BotaniK"
    },
    description: {
      fr: "Consultez les conditions générales de vente de Bloom by BotaniK : commandes, tarifs, garanties, livraisons et droit de rétractation applicable.",
      en: "General terms and conditions of sale of Bloom by BotaniK: orders, pricing, warranty, delivery, and withdrawal rights.",
      de: "Allgemeine Geschäfts- und Verkaufsbedingungen von Bloom by BotaniK: Bestellungen, Preise, Garantie und Widerrufsrecht."
    },
    image: "/images/og/bloom-extracteur-infuseur-botanique-1200x630.jpg",
    imageSquare: "/images/og/bloom-extracteur-infuseur-botanique-1080x1080.jpg",
    imageAlt: "Conditions Générales de Vente Bloom by BotaniK",
    type: "website"
  },
  cgu: {
    title: {
      fr: "Conditions d'Utilisation (CGU) | Bloom by BotaniK",
      en: "Terms of Use (CGU) | Bloom by BotaniK",
      de: "Nutzungsbedingungen (CGU) | Bloom by BotaniK"
    },
    description: {
      fr: "Conditions générales d'utilisation du site et des services Bloom by BotaniK. Modalités d'accès à l'application et aux contenus botaniques.",
      en: "General terms of use for bloombybotanik.com and associated botanical services and software.",
      de: "Allgemeine Nutzungsbedingungen für die Website und Dienste von Bloom by BotaniK."
    },
    image: "/images/og/bloom-extracteur-infuseur-botanique-1200x630.jpg",
    imageSquare: "/images/og/bloom-extracteur-infuseur-botanique-1080x1080.jpg",
    imageAlt: "Conditions d'utilisation Bloom by BotaniK",
    type: "website"
  },
  returns: {
    title: {
      fr: "Retours & Remboursements | Garantie 30 Jours Bloom",
      en: "Returns & Refunds | 30-Day Money-Back Bloom",
      de: "Rückgabe & Erstattung | 30 Tage Garantie Bloom"
    },
    description: {
      fr: "Politique de retour et de remboursement Bloom by BotaniK : garantie satisfait ou remboursé sous 30 jours et modalités de prise en charge SAV.",
      en: "Return and refund policy of Bloom by BotaniK: 30-day money-back guarantee and customer service instructions.",
      de: "Rückgabe- und Erstattungsrichtlinien von Bloom by BotaniK: 30 Tage Zufriedenheitsgarantie."
    },
    image: "/images/og/bloom-extracteur-infuseur-botanique-1200x630.jpg",
    imageSquare: "/images/og/bloom-extracteur-infuseur-botanique-1080x1080.jpg",
    imageAlt: "Retours et remboursements Bloom by BotaniK",
    type: "website"
  },
  withdrawal: {
    title: {
      fr: "Droit de Rétractation | Formulaire de Retour Bloom",
      en: "Right of Withdrawal | Return Form Bloom",
      de: "Widerrufsrecht | Rückgabeformular Bloom"
    },
    description: {
      fr: "Exercice de votre droit légal de rétractation sous 14 jours et formulaire de retour de commande pour vos achats sur bloombybotanik.com.",
      en: "Exercise your legal 14-day right of withdrawal and access return forms for purchases on bloombybotanik.com.",
      de: "Ausübung Ihres 14-tägigen gesetzlichen Widerrufsrechts und Rücksendeformular auf bloombybotanik.com."
    },
    image: "/images/og/bloom-extracteur-infuseur-botanique-1200x630.jpg",
    imageSquare: "/images/og/bloom-extracteur-infuseur-botanique-1080x1080.jpg",
    imageAlt: "Droit de rétractation et formulaire de retour Bloom by BotaniK",
    type: "website"
  }
};

export const PRODUCT_METADATA: Record<string, ProductMetaData> = {
  bloomlab: {
    title: {
      fr: "BloomLab® Extracteur Précision | Inox 304 ±0,5°C",
      en: "BloomLab® Precision Extractor | 304 Stainless Steel ±0.5°C",
      de: "BloomLab® Präzisions-Extraktor | 304 Edelstahl ±0,5°C"
    },
    description: {
      fr: "Commandez l'extracteur et infuseur botanique BloomLab®. Inox chirurgical 304, vortex cinétique, thermorégulation ±0,5°C pour extraire le Totum de vos plantes.",
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
      fr: "Trio Apothicaire | 3 Kits Plantes Médicinales",
      en: "Apothecary Trio | 3 Medicinal Plant Kits",
      de: "Apotheker-Trio | 3 Heilpflanzen-Kits"
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
      fr: "Pack Signature BloomLab® + Trio Plantes — 289€",
      en: "Signature Pack BloomLab® + Plant Trio — 289€",
      de: "Signature-Paket BloomLab® + Heilpflanzen-Trio — 289€"
    },
    description: {
      fr: "Le pack complet pour démarrer l'herboristerie maison : la machine BloomLab®, les 3 mélanges de plantes signatures et l'accès aux protocoles d'extraction.",
      en: "The complete setup to start home herbalism: BloomLab® machine, 3 signature botanical blends, and protocol library access.",
      de: "Das Komplettset für die Heimkräuterkunde: BloomLab® Maschine, 3 Signature-Kräutermischungen und Protokoll-Zugang."
    },
    image: "/images/og/produit-pack-signature-1200x630.jpg",
    imageSquare: "/images/og/produit-pack-signature-1080x1080.jpg",
    imageAlt: "Pack Signature BloomLab et ses trois formules botaniques",
    price: "289.00",
    sku: "PACK-SIGNATURE"
  },
  'kit-starter': {
    title: {
      fr: "Kit Sève Fondamentale | Plantes Médicinales Énergie",
      en: "Fundamental Sap Kit | Medicinal Plants for Vitality",
      de: "Fundamentaler Pflanzensaft Kit | Vitalitäts-Heilpflanzen"
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
      fr: "Kit Nuit Profonde | Sommeil Réparateur & Plantes Bio",
      en: "Deep Night Kit | Restful Sleep & Organic Herbs",
      de: "Tiefe Nacht Set | Erholsamer Schlaf & Bio-Kräuter"
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
      fr: "Kit Feu Digestif | Confort Intestinal & Plantes Bio",
      en: "Digestive Fire Kit | Gut Comfort & Organic Herbs",
      de: "Verdauungsfeuer Set | Darmkomfort & Bio-Kräuter"
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
      fr: "Kit Feu Articulaire | Mobilité & Souplesse Articulaire",
      en: "Joint Fire Kit | Mobility & Joint Flexibility",
      de: "Gelenkfeuer Set | Mobilität & Gelenkflexibilität"
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
      fr: "Kit Bouclier Hivernal | Défenses Immunitaires & Plantes",
      en: "Winter Shield Kit | Immune Defenses & Botanicals",
      de: "Winterschild Set | Immunkräfte & Heilpflanzen"
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
      fr: "Duo Argiles & Terres Rares | Purification Botanique",
      en: "Clay & Rare Earth Duo | Botanical Purification",
      de: "Heilerde-Duo | Botanische Reinigung"
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
      fr: "Accès Découverte : 10 Recettes Gratuites d'Herboristerie | Bloom",
      en: "Discovery Access: 10 Free Herbalism Recipes | Bloom",
      de: "Entdecker-Zugang: 10 kostenlose Kräuter-Rezepte | Bloom"
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
      fr: "Abonnement Botanique Annuel : Protocoles Experts | Bloom",
      en: "Annual Botanical Subscription: Expert Protocols | Bloom",
      de: "Botanisches Jahresabonnement: Expertenprotokolle | Bloom"
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

  // 2. Check Article & Blog detail
  if (clean.startsWith('/articles/') || clean.startsWith('/blog/')) {
    const isBlog = clean.startsWith('/blog/');
    const basePath = isBlog ? 'blog' : 'articles';
    const slug = clean.replace(/^\/(articles|blog)\/?/, '');
    const ARTICLE_IMAGES: Record<string, { image: string; imageSquare: string; imageAlt: string; title: string; desc: string }> = {
      'infuseur-botanique-vs-theiere-classique-pourquoi-votre-tisane-ne-marche-pas': {
        image: '/images/og/article-infuseur-vs-theiere-tisane-1200x630.jpg',
        imageSquare: '/images/og/article-infuseur-vs-theiere-tisane-1080x1080.jpg',
        imageAlt: 'Infuseur botanique vs théière classique pour vos tisanes',
        title: "Infuseur vs Théière | Pourquoi Votre Tisane Ne Marche Pas",
        desc: "Pourquoi l'infuseur botanique surpasse la théière classique ? Découvrez les limites thermiques de l'eau bouillante et la puissance de l'extraction thermo-cinétique."
      },
      'extraction-a-froid-vs-extraction-a-chaud-guide-totum-vegetal': {
        image: '/images/og/article-extraction-froid-chaud-totum-1200x630.jpg',
        imageSquare: '/images/og/article-extraction-froid-chaud-totum-1080x1080.jpg',
        imageAlt: 'Extraction à froid vs extraction à chaud du Totum végétal',
        title: "Extraction Froid vs Chaud | Guide Totum Végétal",
        desc: "Extraction à froid, décoction ou thermo-cinétique douce ? Découvrez quelle méthode préserve l'intégralité du Totum végétal sans altérer les molécules bioactives."
      },
      'remedes-de-grand-mere-revisites-par-la-science-5-plantes-a-redecouvrir': {
        image: '/images/og/article-remedes-grand-mere-science-1200x630.jpg',
        imageSquare: '/images/og/article-remedes-grand-mere-science-1080x1080.jpg',
        imageAlt: 'Remèdes de grand-mère et phytothérapie revisités par la science moderne',
        title: "Remèdes Grand-Mère & Science | 5 Plantes Revisités",
        desc: "Reine des prés, thym, camomille, romarin, mauve : comment la science confirme l'efficacité des remèdes de grand-mère grâce à l'extraction de précision."
      },
      'comment-fabriquer-huiles-infusees-teintures-maison': {
        image: '/images/og/article-fabriquer-huiles-infusees-teintures-1200x630.jpg',
        imageSquare: '/images/og/article-fabriquer-huiles-infusees-teintures-1080x1080.jpg',
        imageAlt: 'Fabrication domestique d huiles infusées et de teintures',
        title: "Huiles Infusées & Teintures | Guide Fabrication Maison",
        desc: "Comment réussir vos huiles infusées, macérats huileux et teintures mères à la maison ? Solvants, températures de 45°C, ratios et extraction fermée."
      },
      'plantes-adaptogenes-guide-complet-reequilibrer-systeme-nerveux': {
        image: '/images/og/article-plantes-adaptogenes-systeme-nerveux-1200x630.jpg',
        imageSquare: '/images/og/article-plantes-adaptogenes-systeme-nerveux-1080x1080.jpg',
        imageAlt: 'Plantes adaptogènes pour rééquilibrer le système nerveux',
        title: "Plantes Adaptogènes | Rééquilibrer l'Axe HPA & Stress",
        desc: "Guide complet des plantes adaptogènes : Ashwagandha, Rhodiola, Éleuthérocoque, Basilic sacré. Régulez le cortisol et restaurez l'énergie vitale."
      },
      'science-extraction-botanique-biodisponibilite': {
        image: '/images/og/article-extraction-froid-chaud-totum-1200x630.jpg',
        imageSquare: '/images/og/article-extraction-froid-chaud-totum-1080x1080.jpg',
        imageAlt: "Science de l'extraction botanique et biodisponibilité",
        title: "Science Extraction Botanique | Journal Bloom",
        desc: "Comprendre les principes biophysiques de l'extraction végétale : biodisponibilité cellulaire, cinétique vortex et thermorégulation de précision."
      },
      'phytotherapie-axe-intestin-cerveau-microbiote': {
        image: '/images/og/produit-kit-digestion-1200x630.jpg',
        imageSquare: '/images/og/produit-kit-digestion-1080x1080.jpg',
        imageAlt: "Phytothérapie et axe intestin-cerveau",
        title: "Axe Intestin-Cerveau & Plantes | Journal Bloom",
        desc: "L'impact des principes amers et polyphénols sur l'axe intestin-cerveau, le microbiote intestinal et la régulation neuro-végétative."
      },
      'protocoles-sommeil-reparateur-extraction-douce': {
        image: '/images/og/produit-kit-nuit-1200x630.jpg',
        imageSquare: '/images/og/produit-kit-nuit-1080x1080.jpg',
        imageAlt: "Protocoles de sommeil réparateur par extraction douce",
        title: "Protocoles Sommeil Réparateur | Journal Bloom",
        desc: "Comment concevoir des extractions végétales douces pour restaurer les cycles circadiens et favoriser un sommeil profond et réparateur."
      },
      'guide-solvants-naturels-huile-eau-alcool-vinaigre': {
        image: '/images/og/huiles-infusees-maceration-plantes-1200x630.jpg',
        imageSquare: '/images/og/huiles-infusees-maceration-plantes-1080x1080.jpg',
        imageAlt: "Guide des solvants naturels en phytothérapie",
        title: "Guide Solvants Naturels | Journal Bloom",
        desc: "Eau, alcool de grain, huiles végétales et vinaigre de cidre : quel solvant choisir pour extraire les principes actifs de vos plantes."
      }
    };

    if (ARTICLE_IMAGES[slug]) {
      const art = ARTICLE_IMAGES[slug];
      return {
        title: art.title,
        description: art.desc,
        canonicalUrl: `https://bloombybotanik.com/${basePath}/${slug}/`,
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

  // If explicit product-detail view and productParam passed
  if (view === 'product-detail' && productParam && PRODUCT_METADATA[productParam]) {
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
  if (view === 'protocole-psoriasis' || pathOnly === '/phytotherapie-reset/protocole-psoriasis/') {
    setHreflang('fr', 'https://bloombybotanik.com/phytotherapie-reset/protocole-psoriasis/');
    setHreflang('x-default', 'https://bloombybotanik.com/phytotherapie-reset/protocole-psoriasis/');
    document.querySelector('link[rel="alternate"][hreflang="en"]')?.remove();
    document.querySelector('link[rel="alternate"][hreflang="de"]')?.remove();
  } else {
    setHreflang('fr', `https://bloombybotanik.com${pathOnly}`);
    setHreflang('en', `https://bloombybotanik.com/en${pathOnly}`);
    setHreflang('de', `https://bloombybotanik.com/de${pathOnly}`);
    setHreflang('x-default', `https://bloombybotanik.com${pathOnly}`);
  }

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
      "datePublished": view === 'protocole-psoriasis' ? "2026-09-22T08:00:00+02:00" : "2026-09-01T08:00:00+02:00",
      "dateModified": view === 'protocole-psoriasis' ? "2026-09-22T08:00:00+02:00" : "2026-09-20T10:00:00+02:00",
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

    if (view === 'protocole-psoriasis') {
      schemaData.isAccessibleForFree = false;
      schemaData.hasPart = {
        "@type": "WebPageElement",
        "isAccessibleForFree": false,
        "cssSelector": ".premium-paywall-content"
      };
    }
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
        },
        "shippingDetails": {
          "@type": "OfferShippingDetails",
          "shippingRate": {
            "@type": "MonetaryAmount",
            "value": (seo.sku && seo.sku.includes("BLOOMLAB")) ? "7.90" : "5.90",
            "currency": "EUR"
          },
          "shippingDestination": {
            "@type": "DefinedRegion",
            "addressCountry": "FR"
          },
          "deliveryTime": {
            "@type": "ShippingDeliveryTime",
            "handlingTime": {
              "@type": "QuantitativeValue",
              "minValue": 1,
              "maxValue": 2,
              "unitCode": "DAY"
            },
            "transitTime": {
              "@type": "QuantitativeValue",
              "minValue": 2,
              "maxValue": 4,
              "unitCode": "DAY"
            }
          }
        },
        "hasMerchantReturnPolicy": {
          "@type": "MerchantReturnPolicy",
          "applicableCountry": "FR",
          "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
          "merchantReturnDays": 14,
          "returnMethod": "https://schema.org/ReturnByMail",
          "returnFees": "https://schema.org/ReturnShippingFees"
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
