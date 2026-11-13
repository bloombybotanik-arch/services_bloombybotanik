import { VIEW_PATHS } from '../types';

interface SEOEntry {
  title: string;
  description: string;
  path?: string;
}

const VIEW_SEO_MAP: Record<string, SEOEntry> = {
  home: {
    title: "Extracteur Botanique BloomLab® | Infusion Précision",
    description: "Découvrez l'extracteur et infuseur botanique de précision BloomLab®. Vortex cinétique et thermorégulation ±0,5°C pour extraire le Totum actif de vos plantes.",
    path: "/"
  },
  indexbis: {
    title: "Extracteur Botanique BloomLab® | Infusion Précision",
    description: "Découvrez l'extracteur et infuseur botanique de précision BloomLab®. Vortex cinétique et thermorégulation ±0,5°C pour extraire le Totum actif de vos plantes.",
    path: "/"
  },
  machine: {
    title: "BloomLab® : Extracteur de Plantes de Précision | Bloom",
    description: "La BloomLab® est l'extracteur de plantes qui préserve le Totum végétal. Thermorégulation ±0,5°C et vortex cinétique pour des huiles et teintures d'exception.",
    path: "/bloomlab/"
  },
  bloomlab: {
    title: "BloomLab® : Extracteur de Plantes de Précision | Bloom",
    description: "La BloomLab® est l'extracteur de plantes qui préserve le Totum végétal. Thermorégulation ±0,5°C et vortex cinétique pour des huiles et teintures d'exception.",
    path: "/bloomlab/"
  },
  guide: {
    title: "Infusion Botanique Maison : Guide Complet & Bienfaits | Bloom",
    description: "Découvrez l'art de l'infusion botanique de précision. Températures, solvants et recettes pour préserver le Totum végétal et booster vos bienfaits.",
    path: "/infusion-botanique/"
  },
  'infusion-botanique': {
    title: "Infusion Botanique Maison | Principes Actifs & Méthode",
    description: "Comprendre la dynamique d'infusion en chambre close : seuils thermiques maîtrisés, agitation douce et protection des flavonoïdes thermosensibles.",
    path: "/infusion-botanique-maison-comment-ca-marche/"
  },
  'infusion-botanique-maison-comment-ca-marche': {
    title: "Infusion Botanique Maison | Principes Actifs & Méthode",
    description: "Comprendre la dynamique d'infusion en chambre close : seuils thermiques maîtrisés, agitation douce et protection des flavonoïdes thermosensibles.",
    path: "/infusion-botanique-maison-comment-ca-marche/"
  },
  'pillar-extraction': {
    title: "Extraction Botanique : Méthodes & Séquençage A/B | Bloom",
    description: "Maîtrisez l'extraction végétale : macération, infusion, séquençage A/B. Découvrez comment la BloomLab préserve les principes actifs.",
    path: "/extraction-botanique/"
  },
  'extraction-botanique': {
    title: "Extraction Botanique : Méthodes & Séquençage A/B | Bloom",
    description: "Maîtrisez l'extraction végétale : macération, infusion, séquençage A/B. Découvrez comment la BloomLab préserve les principes actifs.",
    path: "/extraction-botanique/"
  },
  'guide-complet': {
    title: "Extraction Botanique : Méthodes & Séquençage A/B | Bloom",
    description: "Maîtrisez l'extraction végétale : macération, infusion, séquençage A/B. Découvrez comment la BloomLab préserve les principes actifs.",
    path: "/extraction-botanique/"
  },
  'guide-complet-extraction-botanique-maison': {
    title: "Extraction Botanique : Méthodes & Séquençage A/B | Bloom",
    description: "Maîtrisez l'extraction végétale : macération, infusion, séquençage A/B. Découvrez comment la BloomLab préserve les principes actifs.",
    path: "/extraction-botanique/"
  },
  academie: {
    title: "Académie Bloom | Comprendre le Terrain & la Physiologie",
    description: "Explorez l'Académie Bloom : architectures du vivant, terrains biologiques, axe neuro-endocrinien et méthodologie d'accordage saisonnier.",
    path: "/academie/"
  },
  'phytotherapie-reset': {
    title: "Reset Homéostasique : Protocoles de Drainage & Terrain | Bloom",
    description: "Libérez vos émonctoires et réactivez votre pharmacie intérieure. Découvrez nos protocoles de phytothérapie de précision pour un drainage profond.",
    path: "/academie/reset-homeostasique/"
  },
  'reset-homeostasique': {
    title: "Reset Homéostasique : Protocoles de Drainage & Terrain | Bloom",
    description: "Libérez vos émonctoires et réactivez votre pharmacie intérieure. Découvrez nos protocoles de phytothérapie de précision pour un drainage profond.",
    path: "/academie/reset-homeostasique/"
  },
  herbier: {
    title: "Herbier Médicinal Interactif | Monographies & Dosages",
    description: "Consultez les fiches détaillées de nos plantes médicinales : principes actifs majeurs, parties utilisées, températures d'extraction et précautions d'emploi.",
    path: "/academie/herbier/"
  },
  library: {
    title: "Herbier Médicinal Interactif | Monographies & Dosages",
    description: "Consultez les fiches détaillées de nos plantes médicinales : principes actifs majeurs, parties utilisées, températures d'extraction et précautions d'emploi.",
    path: "/academie/herbier/"
  },
  bibliotheque: {
    title: "Bibliothèque de Savoirs & Protocoles | Académie Bloom",
    description: "Retrouvez l'ensemble des ressources pédagogiques de l'Académie : dossiers de physiologie, fiches d'extraction et guides de terrain.",
    path: "/academie/bibliotheque/"
  },
  'library-landing': {
    title: "Bibliothèque de Savoirs & Protocoles | Académie Bloom",
    description: "Retrouvez l'ensemble des ressources pédagogiques de l'Académie : dossiers de physiologie, fiches d'extraction et guides de terrain.",
    path: "/academie/bibliotheque/"
  },
  protocoles: {
    title: "Protocoles Systémiques Ciblés | Académie Bloom",
    description: "Parcourez nos protocoles d'accompagnement par terrain : digestion, immunité, axe nerveux, sommeil et récupération cellulaire.",
    path: "/academie/protocoles/"
  },
  boutique: {
    title: "Boutique Bloom | BloomLab®, Plantes Bio & Accessoires",
    description: "Commandez l'appareil BloomLab®, nos formules de plantes médicinales bio, filtres et accessoires pour vos préparations botaniques à domicile.",
    path: "/boutique/"
  },
  'boutique-kits': {
    title: "Kits de Plantes Médicinales Bio & Remèdes | Bloom",
    description: "Des formules de plantes bio rigoureusement sélectionnées pour le sommeil, la digestion ou l'immunité. Prêtes à être extraites avec la BloomLab.",
    path: "/boutique/kits/"
  },
  abonnement: {
    title: "Abonnement Bloom | Protocoles & Accompagnement ALMA",
    description: "Rejoignez Bloom : accédez aux protocoles saisonniers de reset homéostatique, au suivi d'anamnèse ALMA et à l'ensemble des formules botaniques guidées.",
    path: "/abonnement/"
  },
  manifeste: {
    title: "Manifeste Bloom | Souveraineté Sanitaire & Plantes",
    description: "Manifeste Bloom by BotaniK : souveraineté sanitaire, ingénierie biologique et réconciliation entre rigueur scientifique et sagesse végétale ancestrale.",
    path: "/manifeste/"
  },
  'la-marque': {
    title: "La Marque Bloom by BotaniK | Terroirs & Exigence",
    description: "Découvrez l'histoire de Bloom by BotaniK : sélection rigoureuse des plantes brutes, conception française des protocoles et transparence scientifique.",
    path: "/la-marque/"
  },
  'questions-frequentes': {
    title: "FAQ Extracteur Botanique | Questions Fréquentes",
    description: "Foire aux questions BloomLab® : garanties, entretien de l'inox 304, protocoles d'extraction, solvants autorisés et délais d'expédition sous 24 à 48 heures.",
    path: "/questions-frequentes/"
  },
  faq: {
    title: "Centre d'Aide & Réponses Pratiques | Bloom by BotaniK",
    description: "Réponses rapides sur l'utilisation quotidienne de nos appareils, le nettoyage, le choix des plantes sèches, la livraison et le suivi de votre commande.",
    path: "/faq/"
  },
  'totum-vegetal': {
    title: "Totum Végétal vs Molécules Isolées | Synergie des Plantes",
    description: "Pourquoi le Totum végétal surpasse les isolats : synergie biochimique, biodisponibilité accrue et effet tampon des principes actifs entiers.",
    path: "/totum-vegetal/"
  },
  'plantes-adaptogenes': {
    title: "Plantes Adaptogènes | Axe HPA, Cortisol & Résilience",
    description: "Ashwagandha, Rhodiola, Éleuthérocoque : guide pratique des plantes adaptogènes pour moduler le cortisol et soutenir l'axe neuro-endocrinien.",
    path: "/plantes-adaptogenes/"
  },
  cosmetiques: {
    title: "Cosmétique Botanique & Macérats Huileux | Bloom",
    description: "Créez des soins d'exception avec la précision BloomLab. Macérats huileux, sérums et baumes enrichis en principes actifs préservés.",
    path: "/cosmetiques-naturels-diy/"
  },
  'gastronomie-botanique': {
    title: "Gastronomie Botanique | Huiles Aromatisées & Bouillons",
    description: "Gastronomie botanique de précision : créez des huiles infusées d'exception, vinaigres botaniques et bouillons actifs grâce au vortex cinétique BloomLab.",
    path: "/gastronomie-botanique/"
  },
  'remedes-naturels': {
    title: "Remèdes Naturels Maison | Guide d'Herboristerie Moderne",
    description: "Guide structuré pour concevoir vos préparations végétales familiales : tisanes concentrées, sirops botaniques, baumes et extraits hydroalcooliques.",
    path: "/remedes-naturels/"
  },
  'remedes-naturels-maison-guide': {
    title: "Remèdes Naturels Maison | Guide d'Herboristerie Moderne",
    description: "Guide structuré pour concevoir vos préparations végétales familiales : tisanes concentrées, sirops botaniques, baumes et extraits hydroalcooliques.",
    path: "/remedes-naturels/"
  },
  lexique: {
    title: "Lexique Phytothérapie | Termes Extraction Botanique",
    description: "Lexique de phytothérapie et d'extraction botanique : définitions du Totum, de la charge allostatique, des solvants nobles et du séquençage actif A/B.",
    path: "/lexique/"
  },
  blog: {
    title: "Journal Botanique | Extraction & Remèdes Naturels",
    description: "Le Journal Botanique Bloom : analyses scientifiques, dossiers d'herboristerie moderne, recettes d'extraction et guides pratiques pour vos remèdes maison.",
    path: "/blog/"
  },
  articles: {
    title: "Articles Savoirs Botaniques | Phytothérapie Maison",
    description: "Explorez tous nos articles d'experts sur l'extraction botanique, la phytothérapie de terrain, les plantes adaptogènes et les macérations de précision.",
    path: "/articles/"
  },
  recettes: {
    title: "Recettes & Formulations Botaniques : Tisanes, Huiles & Extraits | Bloom",
    description: "Recettes précises d'extraction végétale : ratios, températures et solvants pour concevoir vos remèdes et soins botaniques à la maison.",
    path: "/recettes/"
  },
  'recettes-hub': {
    title: "Recettes & Formulations Botaniques : Tisanes, Huiles & Extraits | Bloom",
    description: "Recettes précises d'extraction végétale : ratios, températures et solvants pour concevoir vos remèdes et soins botaniques à la maison.",
    path: "/recettes/"
  },
  contact: {
    title: "Contact & Assistance Botanique | Bloom by BotaniK",
    description: "Une question sur BloomLab® ou nos kits botaniques ? Contactez nos conseillers en phytothérapie. Équipe basée en France, réponse sous 24 à 48 heures.",
    path: "/contact/"
  }
};

function setMetaDescription(description: string) {
  let metaDesc = document.querySelector('meta[name="description"]');
  if (!metaDesc) {
    metaDesc = document.createElement('meta');
    metaDesc.setAttribute('name', 'description');
    document.head.appendChild(metaDesc);
  }
  metaDesc.setAttribute('content', description);
}

function setCanonicalLink(canonical: string) {
  let linkCanonical = document.querySelector('link[rel="canonical"]');
  if (!linkCanonical) {
    linkCanonical = document.createElement('link');
    linkCanonical.setAttribute('rel', 'canonical');
    document.head.appendChild(linkCanonical);
  }
  linkCanonical.setAttribute('href', canonical);
}

export function updateDocumentSEO(config?: any, ..._rest: any[]) {
  if (typeof document === 'undefined' || !config) return;

  if (typeof config === 'string') {
    const currentPathRaw = typeof window !== 'undefined' ? window.location.pathname : '/';
    const normalizedCurrent = currentPathRaw.endsWith('/') ? currentPathRaw : `${currentPathRaw}/`;

    // Si on est directement sur /infusion-botanique/, garder ses balises dédiées et sa canonical auto-référente
    if (normalizedCurrent === '/infusion-botanique/') {
      const entry = VIEW_SEO_MAP.guide;
      document.title = entry.title;
      setMetaDescription(entry.description);
      setCanonicalLink('https://bloombybotanik.com/infusion-botanique/');
      return;
    }

    const mapped = VIEW_SEO_MAP[config];
    if (mapped) {
      document.title = mapped.title;
      setMetaDescription(mapped.description);
      const targetPath = mapped.path || VIEW_PATHS[config] || normalizedCurrent || '/';
      const cleanPath = targetPath.endsWith('/') ? targetPath : `${targetPath}/`;
      setCanonicalLink(`https://bloombybotanik.com${cleanPath === '//' ? '/' : cleanPath}`);
      return;
    }

    // Ne jamais écraser le <title> serveur avec un nom de vue interne brut (ex: "axe-a1")
    if (VIEW_PATHS[config]) {
      const targetPath = VIEW_PATHS[config];
      const cleanPath = targetPath.endsWith('/') ? targetPath : `${targetPath}/`;
      setCanonicalLink(`https://bloombybotanik.com${cleanPath === '//' ? '/' : cleanPath}`);
      return;
    }

    document.title = config;
    return;
  }

  if (config.title) {
    document.title = config.title;
  }

  if (config.description) {
    setMetaDescription(config.description);
  }

  if (config.canonical) {
    setCanonicalLink(config.canonical);
  }

  if (config.schema) {
    let scriptTag = document.querySelector('#seo-structured-data');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'seo-structured-data';
      scriptTag.setAttribute('type', 'application/ld+json');
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(config.schema);
  }
}
