import { Language } from '../translations';

export interface TremellaRecipeCopy {
  metaTitle: string;
  metaDescription: string;
  breadcrumbHome: string;
  breadcrumbCulinary: string;
  breadcrumbCurrent: string;
  backButton: string;
  heroEyebrow: string;
  h1: string;
  subtitle: string;
  metrics: {
    volumeLabel: string;
    volumeValue: string;
    rehydrationLabel: string;
    rehydrationValue: string;
    cycleLabel: string;
    cycleValue: string;
    signatureLabel: string;
    signatureValue: string;
  };
  imageAlt: string;
  captionLead: string;
  captionSub: string;
  captionBadge: string;
  intro: {
    eyebrow: string;
    heading: string;
    p1: string;
    p2: string;
  };
  ingredients: {
    eyebrow: string;
    heading: string;
    items: Array<{
      name: string;
      note?: string;
      qty: string;
    }>;
    qualityTitle: string;
    qualityText: string;
  };
  preparation: {
    eyebrow: string;
    heading: string;
    steps: Array<{
      badge: string;
      title: string;
      body: string;
    }>;
  };
  protocol: {
    eyebrow: string;
    heading: string;
    lead: string;
    headers: {
      step: string;
      ingredients: string;
      temp: string;
      duration: string;
      objective: string;
    };
    rows: Array<{
      step: string;
      ingredients: string;
      temp: string;
      duration: string;
      objective: string;
      tempHighlight?: boolean;
    }>;
    tableFootnoteLabel: string;
    tableFootnote: string;
    whyHeading: string;
    whyPoints: Array<{
      title: string;
      body: string;
    }>;
  };
  longanSection: {
    eyebrow: string;
    heading: string;
    subheading: string;
    quote: string;
    points: Array<{
      title: string;
      body: string;
    }>;
    variantBadge: string;
    variantText: string;
  };
  fruitVariants: {
    eyebrow: string;
    heading: string;
    lead: string;
    pear: {
      badge: string;
      title: string;
      body: string;
      tipLabel: string;
      tip: string;
      highlights: string[];
    };
    apple: {
      badge: string;
      title: string;
      body: string;
      tipLabel: string;
      tip: string;
      highlights: string[];
    };
  };
  lotusVariant: {
    badge: string;
    heading: string;
    leadQuote: string;
    details: Array<{
      label: string;
      value: string;
    }>;
  };
  benefits: {
    eyebrow: string;
    heading: string;
    cards: Array<{
      tag: string;
      title: string;
      body: string;
      footer?: string;
    }>;
  };
  dosage: {
    heading: string;
    cards: Array<{
      label: string;
      value: string;
      desc: string;
    }>;
    precautionLabel: string;
    precautionText: string;
  };
  cta: {
    eyebrow: string;
    heading: string;
    body: string;
    primaryBtn: string;
    recipesBtn: string;
    academyBtn: string;
  };
  jsonLd: {
    name: string;
    alternateName: string;
    recipeYield: string;
    recipeCategory: string;
    recipeCuisine: string;
    keywords: string;
    recipeIngredient: string[];
    recipeInstructions: Array<{
      name: string;
      text: string;
    }>;
  };
}

export const TREMELLA_RECIPE_COPY: Record<Language, TremellaRecipeCopy> = {
  fr: {
    metaTitle: 'Soupe de Beauté au Champignon des Neiges (Tremella) | BloomLab',
    metaDescription:
      'Recette authentique de Soupe de Beauté MTC au Tremella adaptée à la BloomLab : hydratation profonde, éclat de la peau et vitalité.',
    breadcrumbHome: 'Accueil',
    breadcrumbCulinary: 'Atelier Culinaire',
    breadcrumbCurrent: 'Soupe de Beauté au Champignon des Neiges',
    backButton: 'Retour à l’Atelier Culinaire',
    heroEyebrow:
      'Atelier Culinaire · Recette Yin Beauté MTC · Extraction 80 °C & 70 °C · 800 ml',
    h1: 'L’Élixir de Beauté : La Soupe au Champignon des Neiges (Tremella) à la BloomLab',
    subtitle:
      'Nourrissez votre Yin, hydratez votre peau et soutenez votre vitalité avec cette recette ancestrale de la Médecine Traditionnelle Chinoise, réinventée par l’extraction de précision.',
    metrics: {
      volumeLabel: 'Volume obtenu',
      volumeValue: '800 ml (3–4 tasses)',
      rehydrationLabel: 'Réhydratation',
      rehydrationValue: '4 h minimum (ou la nuit)',
      cycleLabel: 'Cycle BloomLab®',
      cycleValue: '45 min à 80 °C + 15 min à 70 °C',
      signatureLabel: 'Signature MTC',
      signatureValue: 'Yin · Sang · Ancrage & Shen',
    },
    imageAlt:
      'Soupe de Beauté MTC au Champignon des Neiges Tremella, perles de pêche, dattes de jujube, longan, baies de goji et gingembre préparée à la BloomLab',
    captionLead: 'Atelier Culinaire Bloom :',
    captionSub:
      'recette soupe champignon blanc MTC, perles de pêche, variantes Poire/Pomme & Graines de Lotus.',
    captionBadge: 'Extraction Séquencée 80 °C → 70 °C',
    intro: {
      eyebrow: 'Origine & Approche Scientifique',
      heading:
        'La Soupe de Beauté ancestrale réinventée par l’extraction de précision',
      p1: 'En Médecine Traditionnelle Chinoise (MTC), cette préparation porte le nom évocateur de « Soupe de Beauté ». Au cœur de sa composition trône le Tremella fuciformis, surnommé le « Champignon des Neiges » en raison de ses pétales translucides et nacrés. Utilisée depuis des siècles pour Nourrir le Yin et Nourrir le Sang, cette recette Yin beauté associe la richesse hydratante des polysaccharides végétaux à la douceur réconfortante des dattes de jujube, de la poire (ou de la pomme), du longan, des graines de lotus et des baies de Goji.',
      p2: 'Là où la casserole traditionnelle expose les ingrédients à une ébullition brutale à 100 °C — dégradant les antioxydants fragiles avant même que les fibres denses n’aient livré leurs actifs — la BloomLab® orchestre une cinétique thermique séquencée. En combinant deux paliers de température maîtrisés, elle permet d’extraire le Totum hydrosoluble de chaque matrice végétale : les macromolécules soyeuses du Tremella et l’amidon fondant des graines de lotus s’épanouissent pleinement à 80 °C, tandis que les composés thermolabiles des baies de Goji restent préservés à 70 °C.',
    },
    ingredients: {
      eyebrow: 'Pour 800 ml d’eau filtrée',
      heading: 'Ingrédients de la recette',
      items: [
        {
          name: 'Champignon blanc (Tremella) séché',
          qty: '1 petit pain (~10 g)',
        },
        {
          name: 'Perles de Pêche (Peach Gum)',
          note: 'Facultatif · texture onctueuse & collagène végétal',
          qty: '10 g',
        },
        {
          name: 'Graines de lotus séchées (Lian Zi)',
          note: 'Optionnel (Variante Sérénité) · trempées 4 h+, en Phase 1',
          qty: '30 g',
        },
        {
          name: 'Dattes de jujube rouges, dénoyautées',
          qty: '10–12 pcs (~30 g)',
        },
        {
          name: 'Poire (canonique) ou Pomme (digestive), en dés',
          note: 'Voir le comparatif Poire vs Pomme ci-dessous',
          qty: '1/2 fruit (~80 g)',
        },
        {
          name: 'Longan séché (桂圆, guìyuán)',
          note: 'Optionnel · pilier de la variante Confort Émotionnel',
          qty: '20 g',
        },
        {
          name: 'Baies de Goji',
          note: 'À ajouter uniquement en Phase 2 (70 °C)',
          qty: '20 g',
        },
        {
          name: 'Gingembre frais, en tranches',
          qty: '3–4 tr. (~10 g)',
        },
        {
          name: 'Eau filtrée peu minéralisée',
          qty: '800 ml',
        },
      ],
      qualityTitle: 'Exigence de qualité botanique :',
      qualityText:
        'Privilégiez des végétaux issus de l’agriculture biologique, séchés à basse température et garantis non traités au soufre (en particulier pour le Tremella, les graines de lotus et les baies de Goji) afin d’obtenir un extrait pur et limpide.',
    },
    preparation: {
      eyebrow: 'Avant la mise en extracteur',
      heading: 'Préparation étape par étape',
      steps: [
        {
          badge: 'Étape 1 · Réhydratation (4 h à 1 nuit)',
          title: 'Trempage du Tremella, des Perles de Pêche et des Graines de Lotus',
          body: 'La veille au soir — ou au minimum 4 heures avant de lancer votre BloomLab® — faites tremper séparément dans de l’eau froide le champignon blanc, les perles de pêche et, si vous choisissez la variante Sérénité, les 30 g de graines de lotus séchées. Le Tremella triple de volume tandis que les graines de lotus s’attendrissent pour une extraction optimale.',
        },
        {
          badge: 'Étape 2 · Parage & Découpe',
          title: 'Préparation des matrices végétales',
          body: 'Égouttez soigneusement le champignon des neiges, retirez le cœur jaune et coriace situé à sa base, puis déchirez les pétales à la main en petits morceaux. Rincez les perles de pêche, et retirez le germe central (cœur amer) des graines de lotus réhydratées si nécessaire. Coupez les dattes de jujube en deux, taillez la poire non pelée (ou la pomme) en dés et émincez le gingembre frais en fines tranches.',
        },
        {
          badge: 'Étape 3 · Extraction Séquencée BloomLab®',
          title: 'Séquence en deux paliers thermiques',
          body: 'Versez 800 ml d’eau filtrée dans la cuve. Ajoutez en Phase 1 le Tremella, les perles de pêche, les graines de lotus trempées (si choisies), les jujubes, la poire ou la pomme, le gingembre (et le Longan optionnel) pour 45 minutes à 80 °C. En fin de cycle, incorporez uniquement les baies de Goji pour la Phase 2 à 70 °C pendant 15 minutes.',
        },
      ],
    },
    protocol: {
      eyebrow: 'Ingénierie Botanique BloomLab®',
      heading: 'Protocole d’Extraction BloomLab® (Recette BloomLab)',
      lead: 'Paramètres calibrés pour extraire les polysaccharides du Tremella et l’amidon doux des graines de lotus en Phase 1 (80 °C), puis préserver la zéaxanthine des baies de Goji en Phase 2 (70 °C).',
      headers: {
        step: 'Étape',
        ingredients: 'Ingrédients à ajouter',
        temp: 'Température',
        duration: 'Durée',
        objective: 'Objectif Scientifique',
      },
      rows: [
        {
          step: 'Phase 1 (Hydrosoluble)',
          ingredients:
            'Champignon blanc (Tremella), perles de pêche, graines de lotus (30 g, trempées), dattes de jujube, poire ou pomme en dés, gingembre frais + Longan (optionnel)',
          temp: '80 °C',
          duration: '45 minutes',
          objective:
            'Gélatiniser les polysaccharides du Tremella et l’amidon des graines de lotus, tout en libérant les macromolécules sans détruire les gingérols.',
          tempHighlight: true,
        },
        {
          step: 'Phase 2 (Finition douce)',
          ingredients: 'Baies de Goji',
          temp: '70 °C',
          duration: '15 minutes',
          objective:
            'Préserver la zéaxanthine et la vitamine C thermolabiles tout en diffusant la douceur naturelle du fruit.',
        },
      ],
      tableFootnoteLabel: 'Note de bas de tableau :',
      tableFootnote:
        'Le Longan peut être ajouté en Phase 1 pour infuser ses sucres et son arôme, ou être omis pour une version purement axée sur le Yin. Les graines de lotus, plus denses, nécessitent obligatoirement la Phase 1.',
      whyHeading: 'Pourquoi ces paramètres ?',
      whyPoints: [
        {
          title: '1. Pourquoi 80 °C (et pas 100 °C) ?',
          body: 'Le palier à 80 °C suffit à gélatiniser les polysaccharides du champignon blanc, des perles de pêche et l’amidon des graines de lotus tout en préservant les gingérols du gingembre et les polyphénols du fruit. Une ébullition vigoureuse à 100 °C dégraderait les vitamines fragiles.',
        },
        {
          title: '2. Pourquoi 45 minutes en Phase 1 ?',
          body: 'Même après trempage, le Tremella, les perles de pêche et les graines de lotus conservent une structure dense. Le maintien stable pendant 45 minutes sous brassage doux laisse à l’eau le temps d’extraire leur amidon bénéfique et de créer une texture onctueuse homogène.',
        },
        {
          title: '3. Pourquoi uniquement les Goji à 70 °C en Phase 2 ?',
          body: 'Les baies de Goji concentrent de la zéaxanthine et de la vitamine C particulièrement sensibles à la chaleur prolongée. Les introduire seules sur les 15 dernières minutes à 70 °C protège leur potentiel antioxydant.',
        },
      ],
    },
    longanSection: {
      eyebrow: 'Zoom Ingrédient · Bienfaits Longan MTC & Soupe Tremella Sommeil',
      heading: 'Le Longan : L’Ingrédient du Cœur et de l’Esprit',
      subheading: '桂圆 (guìyuán) — « L’Œil de Dragon » de la pharmacopée traditionnelle',
      quote:
        '« Bien que le Longan soit un ajout optionnel dans notre recette classique, il est le pilier des variantes traditionnelles dédiées au soutien émotionnel et au sommeil. En MTC, il nourrit le Sang du Cœur et calme le Shen. »',
      points: [
        {
          title: 'Nourrir le Sang du Cœur & tonifier la Rate',
          body: 'Surnommé « œil de dragon » pour sa pulpe translucide entourant un noyau sombre, le Longan (桂圆, guìyuán) est un pilier de la Médecine Traditionnelle Chinoise pour nourrir le Sang du Cœur, tonifier le Qi de la Rate et restaurer une sensation d’ancrage intérieur.',
        },
        {
          title: 'Apaiser l’Esprit (Shen) et accompagner le sommeil',
          body: 'Il est particulièrement recommandé en cas d’anxiété, de déprime ou d’insomnie — faisant de cette soupe au Tremella un rituel réconfortant de fin de journée dédié au calme émotionnel et au sommeil.',
        },
      ],
      variantBadge: 'Nuance & Variante « Confort Émotionnel »',
      variantText:
        'Dans la recette de base, le Longan reste un ajout optionnel. Cependant, il devient l’ingrédient central dans la variante « Confort Émotionnel » — la traditionnelle Soupe de Tremella, Jujubes et Longan.',
    },
    fruitVariants: {
      eyebrow: 'Personnalisation du Terrain · Poire ou Pomme Tisane',
      heading: 'Variantes : Poire ou Pomme ?',
      lead: 'Le choix du fruit oriente subtilement la note aromatique de votre préparation culinaire : privilégiez la poire pour sa texture veloutée et sa douceur, ou la pomme pour une note plus légère et acidulée.',
      pear: {
        badge: 'La Reine du Yin · Recette Canonique',
        title: 'La Poire : L’Alliée de votre Peau (Nourrit le Yin)',
        body: 'C’est l’ingrédient canonique. Elle humidifie les Poumons et nourrit le Yin. Idéale pour les peaux déshydratées, les toux sèches et la gorge irritée. Riche en sorbitol et en pectine, elle donne cette texture onctueuse à l’élixir.',
        tipLabel: 'Conseil :',
        tip: 'Ne pas la peler (choisissez une poire bio bien lavée) pour conserver ses polyphénols.',
        highlights: [
          'Humidifie les Poumons et nourrit le Yin cutané',
          'Texture naturellement veloutée grâce au sorbitol et à la pectine',
          'Recommandée pour cette recette Yin beauté en saison sèche',
        ],
      },
      apple: {
        badge: 'L’Alternative Digestive · Équilibre Doux',
        title: 'La Pomme : L’Alternative Digestion (Tonifie la Rate)',
        body: 'Légèrement acide, elle harmonise l’Estomac et tonifie le Qi de la Rate. Elle est parfaite si vous avez une digestion paresseuse ou si vous souhaitez équilibrer le goût sucré des dattes avec une pointe d’acidité.',
        tipLabel: 'Conseil d’accord :',
        tip: 'Optez pour une variété légèrement acidulée coupée en petits dés avec sa peau bio pour plus de vivacité aromatique.',
        highlights: [
          'Harmonise l’Estomac et tonifie le Qi de la Rate',
          'Équilibre la rondeur sucrée des dattes de jujube',
          'Idéale si vous avez une digestion sensible ou paresseuse',
        ],
      },
    },
    lotusVariant: {
      badge: 'Recette Bonus · Variante Sérénité',
      heading: 'L’Option Graines de Lotus (Sérénité & Ancrage)',
      leadQuote:
        '« Pour une action profonde sur l’ancrage et la sérénité, ajoutez 30 g de graines de lotus préalablement trempées. En MTC, elles tonifient la Rate et calment le Shen. Leur extraction lente à 80 °C en Phase 1 libère leur amidon bénéfique, enrichissant la texture onctueuse de l’élixir. »',
      details: [
        {
          label: 'Ingrédient & Préparation',
          value:
            '30 g de graines de lotus séchées (à ajouter en Phase 1). Faites tremper les graines pendant au moins 4 heures (idéalement toute la nuit) et retirez le cœur amer si nécessaire.',
        },
        {
          label: 'Graines de lotus bienfaits (Lian Zi)',
          value:
            'Réputées en MTC pour tonifier la Rate et les Reins, nourrir le Cœur et calmer l’Esprit (Shen). Leur action astringente aide à retenir l’humidité bénéfique dans le corps, renforçant l’effet hydratant du Tremella, tout en apportant une texture fondante et une saveur douce.',
        },
        {
          label: 'Protocole d’extraction BloomLab®',
          value:
            'Denses et riches en amidon, elles doivent être extraites en même temps que le Tremella : ajoutez-les dans le panier d’infusion dès la Phase 1 (80 °C pendant 45 minutes).',
        },
      ],
    },
    benefits: {
      eyebrow: 'Comprendre la Synergie Végétale',
      heading: 'Les bienfaits de cette tisane Yin & Sang Beauté',
      cards: [
        {
          tag: 'Hydratation & Peau (Yin)',
          title: 'Polysaccharides de Tremella & Collagène Végétal',
          body: 'Les polysaccharides du champignon blanc sont réputés pour leur capacité exceptionnelle de rétention d’eau, favorisant une hydratation profonde des tissus et un soutien naturel de la souplesse cutanée. Les perles de pêche complètent cette texture avec leur apport traditionnellement qualifié de collagène végétal, tandis que la poire et les graines de lotus aident à retenir cette hydratation.',
          footer:
            'Repère scientifique 2026 : Des travaux publiés en 2026 montrent que les polysaccharides de Tremella améliorent l’hydratation de la peau et contribuent à renforcer la barrière cutanée.',
        },
        {
          tag: 'Sang & Vitalité',
          title: 'Bienfaits Goji, Jujube & Caroténoïdes',
          body: 'Dans la lecture MTC, un teint lumineux reflète la plénitude du Sang et du Yin. Les baies de Goji — naturellement riches en zéaxanthine et bêta-carotène — nourrissent le Yin du Foie et des Reins tout en soutenant le confort oculaire. Les dattes de jujube rouges tonifient en douceur le Qi et le Sang, apportant une rondeur chaleureuse à l’infusion.',
        },
        {
          tag: 'Ancrage, Shen & Digestion',
          title: 'Harmonie Graines de Lotus, Longan & Gingembre',
          body: 'Les graines de lotus (Lian Zi) et le longan séché soutiennent classiquement la Rate, les Reins et le Cœur, aidant à calmer le Shen et à favoriser l’ancrage nocturne. Pour contrebalancer la nature fraîche du Tremella et de la poire, le gingembre frais réchauffe le centre digestif et facilite l’assimilation.',
        },
      ],
    },
    dosage: {
      heading: 'Posologie, Rythme d’Usage & Conservation',
      cards: [
        {
          label: 'Quantité quotidienne',
          value: '1 tasse (200–250 ml)',
          desc: 'Par jour, en boisson tiède ou à température ambiante.',
        },
        {
          label: 'Moment optimal',
          value: 'Matin ou fin d’après-midi',
          desc: 'Éviter de boire glacé pour respecter la chaleur digestive (ou le soir avec la variante Longan / Graines de lotus).',
        },
        {
          label: 'Durée conseillée',
          value: '2 à 3 semaines',
          desc: 'Pour apprécier pleinement la régularité sur la peau, l’ancrage et l’énergie.',
        },
        {
          label: 'Conservation',
          value: '5 à 6 jours à 4 °C',
          desc: 'Au réfrigérateur, en bouteille en verre propre hermétique.',
        },
      ],
      precautionLabel: 'Information éducative & précautions d’emploi :',
      precautionText:
        'Cette fiche recette de gastronomie botanique s’inscrit dans une démarche éducative et de bien-être général ; elle ne constitue pas un avis médical et ne se substitue à aucun traitement. Par prudence, demandez conseil à un professionnel de santé en cas de grossesse, d’allaitement, chez l’enfant, ou si vous suivez un traitement médicamenteux (notamment anticoagulant ou régulateur de glycémie).',
    },
    cta: {
      eyebrow: 'Passez de la théorie à l’extraction de précision',
      heading: 'Réalisez cette Soupe de Beauté au degré près avec la BloomLab®',
      body: 'Grâce au contrôle thermique précis à 80 °C et 70 °C sans ébullition destructrice (toujours sous surveillance, sans jamais laisser l’appareil sans surveillance en fonctionnement ni branché), votre cuisine devient un véritable atelier d’herboristerie moderne.',
      primaryBtn: 'Découvrir l’extracteur BloomLab®',
      recipesBtn: 'Explorer toutes les recettes',
      academyBtn: 'Découvrir la Bloom Académie',
    },
    jsonLd: {
      name: 'Soupe de Beauté au Champignon des Neiges (Tremella) à la BloomLab',
      alternateName:
        'Soupe aux Perles de Pêche, Graines de Lotus, Longan et Poire MTC',
      recipeYield: '800 ml (3 à 4 tasses)',
      recipeCategory: 'Atelier Culinaire · Recette MTC',
      recipeCuisine: 'Médecine Traditionnelle Chinoise',
      keywords:
        'soupe tremella beauté, recette soupe champignon blanc MTC, bienfaits longan MTC, soupe tremella sommeil, poire ou pomme tisane, graines de lotus bienfaits, recette yin beauté, recette BloomLab',
      recipeIngredient: [
        '800 ml d’eau filtrée ou faiblement minéralisée',
        '10 g de champignon blanc (Tremella fuciformis) séché, réhydraté',
        '10 g de perles de pêche (Peach Gum), réhydratées (facultatif)',
        '30 g de graines de lotus séchées (Lian Zi), trempées 4 h minimum (facultatif, Phase 1)',
        '10 à 12 dattes de jujube rouges (environ 30 g), dénoyautées',
        '1/2 poire non pelée ou 1/2 pomme (environ 80 g), coupée en dés',
        '20 g de longan séché (facultatif, variante Confort Émotionnel)',
        '20 g de baies de Goji bio non soufrées',
        '3 à 4 tranches de gingembre frais (environ 10 g)',
      ],
      recipeInstructions: [
        {
          name: 'Réhydratation des matrices sèches',
          text: 'La veille ou au moins 4 heures avant, faites tremper séparément dans de l’eau froide le champignon blanc (Tremella), les perles de pêche et les 30 g de graines de lotus séchées.',
        },
        {
          name: 'Préparation des végétaux',
          text: 'Égouttez le Tremella, retirez la base jaune et dure puis déchirez-le en petits morceaux. Retirez le cœur amer des graines de lotus si nécessaire. Coupez les dattes de jujube en deux, détaillez la demi-poire non pelée (ou la demi-pomme) en dés et taillez le gingembre en fines tranches.',
        },
        {
          name: 'Phase 1 — Extraction hydrosoluble principale à la BloomLab',
          text: 'Déposez le Tremella, les perles de pêche, les graines de lotus trempées (30 g), les dattes de jujube, la poire ou pomme, le gingembre et éventuellement le Longan dans 800 ml d’eau filtrée. Lancez un cycle BloomLab de 45 minutes à 80°C.',
        },
        {
          name: 'Phase 2 — Finition douce aux baies de Goji',
          text: 'Ajoutez uniquement les baies de Goji en fin de cycle et prolongez l’extraction à 70°C pendant 15 minutes.',
        },
      ],
    },
  },

  en: {
    metaTitle: 'Snow Fungus (Tremella) Beauty Soup | BloomLab TCM Recipe',
    metaDescription:
      'Authentic TCM Tremella Beauty Soup adapted for BloomLab: deep Yin hydration, radiant skin, Longan & Lotus Seed serenity variants.',
    breadcrumbHome: 'Home',
    breadcrumbCulinary: 'Culinary Workshop',
    breadcrumbCurrent: 'Snow Fungus Beauty Soup (Tremella)',
    backButton: 'Back to Culinary Workshop',
    heroEyebrow:
      'Culinary Workshop · TCM Yin Beauty Recipe · 80 °C & 70 °C Extraction · 800 ml',
    h1: 'The Beauty Elixir: Snow Fungus (Tremella) Soup with BloomLab',
    subtitle:
      'Nourish your Yin, hydrate your skin from within, and support daily vitality with this ancestral Traditional Chinese Medicine recipe, elevated by precision thermal extraction.',
    metrics: {
      volumeLabel: 'Yield',
      volumeValue: '800 ml (3–4 cups)',
      rehydrationLabel: 'Soaking time',
      rehydrationValue: '4 h minimum (or overnight)',
      cycleLabel: 'BloomLab® Cycle',
      cycleValue: '45 min at 80 °C + 15 min at 70 °C',
      signatureLabel: 'TCM Profile',
      signatureValue: 'Yin · Blood · Grounding & Shen',
    },
    imageAlt:
      'TCM Tremella Snow Fungus Beauty Soup with peach gum pearls, red jujube dates, longan, goji berries and fresh ginger prepared with BloomLab',
    captionLead: 'Bloom Culinary Workshop:',
    captionSub:
      'TCM white fungus soup, peach gum pearls, Pear vs Apple & Lotus Seed variants.',
    captionBadge: 'Sequenced Extraction 80 °C → 70 °C',
    intro: {
      eyebrow: 'Origins & Precision Botany',
      heading: 'The ancestral Beauty Soup reimagined through precision extraction',
      p1: 'In Traditional Chinese Medicine (TCM), this luminous preparation is known as the "Beauty Soup." At its heart sits Tremella fuciformis—revered as the Snow Fungus for its translucent, pearlescent petals. Valued for centuries as a Yin beauty recipe to Nourish Yin and Nourish Blood, it pairs water-binding fungal polysaccharides with red jujube dates, pear (or apple), optional longan, lotus seeds, and goji berries.',
      p2: 'Whereas stove-top boiling at 100 °C degrades delicate antioxidants before dense dried fibers can release their actives, BloomLab® runs a sequenced two-step thermal profile. It extracts the water-soluble Totum cleanly: Tremella polysaccharides and tender lotus seed starch gelatinize smoothly at 80 °C while heat-sensitive goji compounds remain protected at 70 °C.',
    },
    ingredients: {
      eyebrow: 'For 800 ml filtered water',
      heading: 'Recipe Ingredients',
      items: [
        {
          name: 'Dried Snow Fungus (Tremella fuciformis)',
          qty: '1 small bloom (~10 g)',
        },
        {
          name: 'Peach Gum pearls',
          note: 'Optional · silky texture & plant collagen support',
          qty: '10 g',
        },
        {
          name: 'Dried Lotus Seeds (Lian Zi)',
          note: 'Optional (Serenity variant) · soaked 4 h+, Phase 1 (80 °C)',
          qty: '30 g',
        },
        {
          name: 'Red jujube dates, pitted',
          qty: '10–12 pcs (~30 g)',
        },
        {
          name: 'Pear (classic) or Apple (digestive), diced',
          note: 'See Pear vs Apple comparison below',
          qty: '1/2 fruit (~80 g)',
        },
        {
          name: 'Dried Longan (桂圆, guìyuán)',
          note: 'Optional · core of the Emotional Comfort variant',
          qty: '20 g',
        },
        {
          name: 'Goji berries',
          note: 'Add only in Phase 2 (70 °C)',
          qty: '20 g',
        },
        {
          name: 'Fresh ginger, thinly sliced',
          qty: '3–4 slices (~10 g)',
        },
        {
          name: 'Low-mineral filtered water',
          qty: '800 ml',
        },
      ],
      qualityTitle: 'Botanical Quality Standard:',
      qualityText:
        'Choose organic, low-temperature dried botanicals guaranteed sulfur-free (especially Tremella, lotus seeds, and goji berries) to ensure a clean, aromatic extraction.',
    },
    preparation: {
      eyebrow: 'Before Extraction',
      heading: 'Step-by-Step Preparation',
      steps: [
        {
          badge: 'Step 1 · Rehydration (4 h to overnight)',
          title: 'Soaking Tremella, Peach Gum & Lotus Seeds',
          body: 'The night before—or at least 4 hours prior to running BloomLab®—soak dried Tremella, peach gum pearls, and (for the Serenity option) 30 g of dried lotus seeds separately in cold water. Tremella triples in volume while the lotus seeds soften for thorough extraction.',
        },
        {
          badge: 'Step 2 · Trimming & Slicing',
          title: 'Preparing the botanical matrices',
          body: 'Drain the soaked Tremella, trim away the dense yellow base, and tear the petals by hand into bite-sized pieces. Rinse peach gum and remove the bitter green germ from the soaked lotus seeds if needed. Halve pitted jujube dates, dice the unpeeled pear (or apple), and thinly slice fresh ginger.',
        },
        {
          badge: 'Step 3 · BloomLab® Two-Stage Extraction',
          title: 'Dual-temperature precision sequence',
          body: 'Pour 800 ml filtered water into the chamber. Add Tremella, peach gum, soaked lotus seeds (if used), jujubes, pear or apple, ginger (and optional Longan), and run Phase 1 at 80 °C for 45 minutes. Then add only the goji berries for Phase 2 at 70 °C for 15 minutes.',
        },
      ],
    },
    protocol: {
      eyebrow: 'BloomLab® Botanical Engineering',
      heading: 'BloomLab® Extraction Protocol',
      lead: 'Calibrated parameters to extract high-molecular Tremella polysaccharides and lotus seed starch in Phase 1 (80 °C), then protect goji zeaxanthin in Phase 2 (70 °C).',
      headers: {
        step: 'Stage',
        ingredients: 'Ingredients to Add',
        temp: 'Temperature',
        duration: 'Duration',
        objective: 'Scientific Purpose',
      },
      rows: [
        {
          step: 'Phase 1 (Hydrosoluble)',
          ingredients:
            'Tremella mushroom, peach gum, lotus seeds (30 g, soaked), jujube dates, diced pear or apple, fresh ginger + Longan (optional)',
          temp: '80 °C',
          duration: '45 minutes',
          objective:
            'Gelatinize Tremella polysaccharides and lotus seed starch while releasing macromolecules without degrading gingerols.',
          tempHighlight: true,
        },
        {
          step: 'Phase 2 (Gentle Finish)',
          ingredients: 'Goji berries',
          temp: '70 °C',
          duration: '15 minutes',
          objective:
            'Protect heat-sensitive zeaxanthin and vitamin C while releasing gentle natural fruit sweetness.',
        },
      ],
      tableFootnoteLabel: 'Protocol Note:',
      tableFootnote:
        'Longan can be added in Phase 1 to infuse its natural sugars and aroma, or omitted for a pure Yin-focused version. Denser lotus seeds strictly require Phase 1.',
      whyHeading: 'Why these exact parameters?',
      whyPoints: [
        {
          title: '1. Why 80 °C instead of 100 °C?',
          body: 'An 80 °C plateau gelatinizes Tremella polysaccharides, peach gum, and lotus seed starch smoothly while preserving fresh gingerols and fruit polyphenols. Rolling 100 °C boiling rapidly oxidizes delicate vitamins.',
        },
        {
          title: '2. Why 45 minutes in Phase 1?',
          body: 'Even after soaking, Tremella, peach gum, and lotus seeds hold dense networks. Steady thermal agitation for 45 minutes releases the lotus starch and hydrates every layer into a velvety suspension.',
        },
        {
          title: '3. Why Goji Berries alone at 70 °C in Phase 2?',
          body: 'Goji berries concentrate heat-sensitive zeaxanthin and vitamin C. Adding them alone for the final 15 minutes at 70 °C safeguards their antioxidant integrity.',
        },
      ],
    },
    longanSection: {
      eyebrow: 'Ingredient Spotlight · Longan TCM Benefits & Tremella Sleep Soup',
      heading: 'Longan: The Ingredient for Heart and Spirit',
      subheading: '桂圆 (guìyuán) — Traditional "Dragon Eye" of Herbal Gastronomy',
      quote:
        '"Although Longan is an optional addition in our classic recipe, it forms the cornerstone of traditional variants dedicated to emotional support and restful sleep. In TCM, it nourishes Heart Blood and calms the Shen."',
      points: [
        {
          title: 'Nourishing Heart Blood & Tonifying the Spleen',
          body: 'Known as "dragon eye" for its translucent flesh around a glossy seed, Longan (桂圆, guìyuán) is a classic pillar of Traditional Chinese Medicine used to nourish Heart Blood, tonify Spleen Qi, and restore gentle warmth.',
        },
        {
          title: 'Calming the Spirit (Shen) for Evening Serenity',
          body: 'It is especially prized in TCM tradition in cases of restlessness, low mood, anxiety, or sleeplessness—making this Tremella soup a comforting evening ritual for emotional balance and sleep.',
        },
      ],
      variantBadge: 'Nuance & "Emotional Comfort" Variant',
      variantText:
        'In our base Yin hydration recipe, Longan is optional. However, it takes center stage in the "Emotional Comfort" variation—the traditional Tremella, Jujube & Longan Soup.',
    },
    fruitVariants: {
      eyebrow: 'Personalize Your Elixir · Pear or Apple Herbal Tea',
      heading: 'Variants: Pear or Apple?',
      lead: 'Your choice of fruit subtly shifts the character of the broth: select pear to deeply nourish Yin and skin hydration, or apple for gentle digestive harmony.',
      pear: {
        badge: 'Queen of Yin · Canonical Choice',
        title: 'Pear: Your Skin’s Ally (Nourishes Yin)',
        body: 'The canonical ingredient of this Yin beauty recipe. In TCM, pear moistens the Lungs and nourishes Yin—ideal for dehydrated skin, dry coughs, or a parched throat. Rich in sorbitol and pectin, it lends a lush, silky body to the elixir.',
        tipLabel: 'Tip:',
        tip: 'Do not peel it (use a washed organic pear) so its skin polyphenols are preserved.',
        highlights: [
          'Moistens Lungs and supports deep Yin skin hydration',
          'Naturally velvety mouthfeel from sorbitol and pectin',
          'Ideal during dry seasons or indoor heating',
        ],
      },
      apple: {
        badge: 'Digestive Alternative · Balanced Acidity',
        title: 'Apple: The Digestive Alternative (Tonifies Spleen)',
        body: 'Gently tart, apple harmonizes the Stomach and tonifies Spleen Qi. An ideal choice if digestion feels sluggish or if you want to balance the honeyed sweetness of jujube dates with a crisp touch of acidity.',
        tipLabel: 'Pairing tip:',
        tip: 'Choose a slightly tart organic apple and dice it unpeeled for lively flavor balance.',
        highlights: [
          'Harmonizes Stomach comfort and tonifies Spleen Qi',
          'Balances the natural sweetness of jujubes',
          'Well-suited for sensitive or sluggish digestion',
        ],
      },
    },
    lotusVariant: {
      badge: 'Bonus Recipe · Serenity Variant',
      heading: 'The Lotus Seed Option (Serenity & Grounding)',
      leadQuote:
        '"For deep action on grounding and serenity, add 30 g of pre-soaked lotus seeds. In TCM, they tonify the Spleen and calm the Shen. Slow extraction at 80 °C in Phase 1 releases their beneficial starch, enriching the silky texture of the elixir."',
      details: [
        {
          label: 'Ingredient & Preparation',
          value:
            '30 g dried lotus seeds (added in Phase 1). Soak for at least 4 hours (ideally overnight) and remove the bitter inner germ if needed.',
        },
        {
          label: 'Lotus Seed Benefits (Lian Zi)',
          value:
            'Renowned in TCM to tonify Spleen and Kidneys, nourish the Heart, and calm the Spirit (Shen). Their gentle astringent action helps retain beneficial moisture in the body—reinforcing Tremella’s hydration—while adding a melt-in-the-mouth texture and mild flavor.',
        },
        {
          label: 'BloomLab® Extraction Protocol',
          value:
            'Dense and starch-rich, they must be extracted alongside Tremella: place them in the infusion basket right from Phase 1 (80 °C for 45 minutes).',
        },
      ],
    },
    benefits: {
      eyebrow: 'Botanical Synergy',
      heading: 'Key Benefits of this Yin & Blood Beauty Infusion',
      cards: [
        {
          tag: 'Hydration & Skin (Yin)',
          title: 'Tremella Polysaccharides & Plant Collagen',
          body: 'White fungus polysaccharides hold remarkable water-binding capacity, supporting deep tissue hydration and supple skin texture. Peach gum enriches the broth with soluble plant fibers often referred to as plant collagen, while pear and lotus seeds help lock in beneficial moisture.',
          footer:
            '2026 Scientific Note: Recent 2026 findings highlight that Tremella polysaccharides support skin moisture retention and strengthen epidermal barrier function.',
        },
        {
          tag: 'Blood & Vitality',
          title: 'Goji, Jujube & Carotenoids',
          body: 'In TCM, radiant skin reflects abundant Blood and Yin. Goji berries provide natural zeaxanthin and carotenoids to nourish Liver and Kidney Yin, while red jujubes gently replenish Qi and Blood.',
        },
        {
          tag: 'Grounding, Shen & Digestion',
          title: 'Lotus Seeds, Longan & Fresh Ginger Balance',
          body: 'Lotus seeds (Lian Zi) and longan traditionally support Spleen, Kidney, and Heart harmony to calm the Shen, while slices of fresh ginger gently warm the digestive center so cooling Yin ingredients absorb comfortably.',
        },
      ],
    },
    dosage: {
      heading: 'Daily Ritual, Timing & Storage',
      cards: [
        {
          label: 'Daily serving',
          value: '1 cup (200–250 ml)',
          desc: 'Enjoy warm or at room temperature.',
        },
        {
          label: 'Best time',
          value: 'Morning or late afternoon',
          desc: 'Avoid drinking ice-cold to protect digestive warmth (evenings suit the Longan / Lotus Seed option).',
        },
        {
          label: 'Recommended duration',
          value: '2 to 3 weeks',
          desc: 'Consistent daily intake reveals progressive skin, grounding, and vitality comfort.',
        },
        {
          label: 'Storage',
          value: '5 to 6 days at 4 °C',
          desc: 'Refrigerated in a clean, sealed glass bottle.',
        },
      ],
      precautionLabel: 'Educational Note & Precautions:',
      precautionText:
        'This botanical culinary recipe is shared strictly for educational and general wellness purposes; it is not medical advice and does not replace medical care. Consult a healthcare professional if pregnant, nursing, preparing for children, or taking prescription medications (especially anticoagulants or blood-sugar modulators).',
    },
    cta: {
      eyebrow: 'Move from theory to degree-accurate extraction',
      heading: 'Craft this Beauty Soup to the exact degree with BloomLab®',
      body: 'With automated 80 °C and 70 °C thermal control and zero harsh boiling, your kitchen becomes a modern botanical studio.',
      primaryBtn: 'Discover the BloomLab® Extractor',
      recipesBtn: 'Explore All Recipes',
      academyBtn: 'Discover Bloom Academy',
    },
    jsonLd: {
      name: 'Snow Fungus (Tremella) Beauty Soup with BloomLab',
      alternateName:
        'TCM Tremella, Peach Gum, Lotus Seed, Longan & Pear Elixir',
      recipeYield: '800 ml (3 to 4 cups)',
      recipeCategory: 'Culinary Workshop · TCM Recipe',
      recipeCuisine: 'Traditional Chinese Medicine',
      keywords:
        'tremella beauty soup, longan TCM benefits, tremella soup sleep, pear or apple herbal tea, lotus seed benefits, yin beauty recipe, BloomLab recipe',
      recipeIngredient: [
        '800 ml filtered water',
        '10 g dried Snow Fungus (Tremella fuciformis), rehydrated',
        '10 g peach gum pearls, rehydrated (optional)',
        '30 g dried lotus seeds (Lian Zi), soaked 4 h+ (optional, Phase 1)',
        '10–12 pitted red jujube dates (~30 g)',
        '1/2 unpeeled pear or 1/2 apple (~80 g), diced',
        '20 g dried longan (optional, Emotional Comfort variant)',
        '20 g organic sulfur-free goji berries',
        '3–4 slices fresh ginger (~10 g)',
      ],
      recipeInstructions: [
        {
          name: 'Soak dried matrices',
          text: 'Soak dried Tremella, peach gum, and 30 g dried lotus seeds separately in cold water for at least 4 hours or overnight.',
        },
        {
          name: 'Prep botanicals',
          text: 'Drain Tremella, remove the yellow core, tear into small pieces, and remove bitter lotus seed germs if needed. Halve jujubes, dice unpeeled pear or apple, and slice ginger.',
        },
        {
          name: 'Phase 1 — Main hydrosoluble extraction',
          text: 'Add Tremella, peach gum, soaked lotus seeds (30 g), jujubes, pear or apple, ginger, and optional Longan to 800 ml filtered water in BloomLab. Run at 80 °C for 45 minutes.',
        },
        {
          name: 'Phase 2 — Goji Finish',
          text: 'Add only the goji berries and extract at 70 °C for 15 minutes.',
        },
      ],
    },
  },

  de: {
    metaTitle: 'Schneepilz-Schönheitssuppe (Tremella) | BloomLab TCM-Rezept',
    metaDescription:
      'Authentische TCM-Schönheitssuppe mit Tremella für die BloomLab: tiefe Yin-Hydratation, strahlende Haut, Longan- & Lotussamen-Varianten.',
    breadcrumbHome: 'Startseite',
    breadcrumbCulinary: 'Kulinarische Werkstatt',
    breadcrumbCurrent: 'Schneepilz-Schönheitssuppe (Tremella)',
    backButton: 'Zurück zur Kulinarischen Werkstatt',
    heroEyebrow:
      'Kulinarische Werkstatt · Yin Schönheitsrezept (TCM) · 80 °C & 70 °C Extraktion · 800 ml',
    h1: 'Das Schönheits-Elixier: Schneepilz-Suppe (Tremella) aus der BloomLab',
    subtitle:
      'Nähren Sie Ihr Yin, versorgen Sie Ihre Haut tiefenwirksam mit Feuchtigkeit und unterstützen Sie Ihre Vitalität mit diesem traditionellen TCM-Rezept – verfeinert durch Präzisionsextraktion.',
    metrics: {
      volumeLabel: 'Ergebnis',
      volumeValue: '800 ml (3–4 Tassen)',
      rehydrationLabel: 'Einweichzeit',
      rehydrationValue: 'Mind. 4 Std. (oder über Nacht)',
      cycleLabel: 'BloomLab® Zyklus',
      cycleValue: '45 Min. bei 80 °C + 15 Min. bei 70 °C',
      signatureLabel: 'TCM-Signatur',
      signatureValue: 'Yin · Blut · Erdung & Shen',
    },
    imageAlt:
      'TCM Tremella Schneepilz Schönheitssuppe mit Pfirsichharz-Perlen, roten Jujube-Datteln, Longan, Goji-Beeren und frischem Ingwer aus der BloomLab',
    captionLead: 'Kulinarische Werkstatt Bloom:',
    captionSub:
      'TCM-Schneepilz-Suppe, Pfirsichharz, Birne-vs.-Apfel- & Lotussamen-Varianten.',
    captionBadge: 'Sequenzierte Extraktion 80 °C → 70 °C',
    intro: {
      eyebrow: 'Ursprung & Präzisionsbotanik',
      heading:
        'Die traditionelle Schönheitssuppe durch Präzisionsextraktion neu gedacht',
      p1: 'In der Traditionellen Chinesischen Medizin (TCM) trägt diese Zubereitung den klangvollen Namen „Schönheitssuppe“. Im Mittelpunkt steht Tremella fuciformis – wegen seiner durchscheinenden, perlmuttartigen Blütenblätter auch „Schneepilz“ genannt. Seit Jahrhunderten wird dieses Yin Schönheitsrezept geschätzt, um Yin und Blut zu nähren: Wasserbindende Polysaccharide verbinden sich mit roten Jujube-Datteln, Birne (oder Apfel), optionalem Longan, Lotussamen und Goji-Beeren.',
      p2: 'Während herkömmliches Kochen bei 100 °C empfindliche Antioxidantien zerstört, steuert die BloomLab® eine zweistufige Temperaturkurve. So wird das wasserlösliche Totum jeder Pflanze schonend freigesetzt: Tremella-Polysaccharide und die zarte Stärke der Lotussamen entfalten sich bei 80 °C optimal, während hitzeempfindliche Wirkstoffe der Goji-Beeren bei 70 °C geschützt bleiben.',
    },
    ingredients: {
      eyebrow: 'Für 800 ml gefiltertes Wasser',
      heading: 'Zutaten des Rezepts',
      items: [
        {
          name: 'Getrockneter Schneepilz (Tremella fuciformis)',
          qty: '1 kleiner Kopf (~10 g)',
        },
        {
          name: 'Pfirsichharz-Perlen (Peach Gum)',
          note: 'Optional · samtige Textur & pflanzliches Kollagen',
          qty: '10 g',
        },
        {
          name: 'Getrocknete Lotussamen (Lian Zi)',
          note: 'Optional (Variante Gelassenheit) · 4 Std.+ eingeweicht, Phase 1',
          qty: '30 g',
        },
        {
          name: 'Rote Jujube-Datteln, entsteint',
          qty: '10–12 Stk. (~30 g)',
        },
        {
          name: 'Birne (klassisch) oder Apfel (verdauungsfreundlich), gewürfelt',
          note: 'Siehe Vergleich Birne vs. Apfel unten',
          qty: '1/2 Frucht (~80 g)',
        },
        {
          name: 'Getrocknete Longan-Früchte (桂圆, guìyuán)',
          note: 'Optional · Basis der Variante „Emotionales Gleichgewicht“',
          qty: '20 g',
        },
        {
          name: 'Goji-Beeren',
          note: 'Zugabe erst in Phase 2 (70 °C)',
          qty: '20 g',
        },
        {
          name: 'Frischer Ingwer, in dünnen Scheiben',
          qty: '3–4 Scheiben (~10 g)',
        },
        {
          name: 'Mineralarmes, gefiltertes Wasser',
          qty: '800 ml',
        },
      ],
      qualityTitle: 'Botanischer Qualitätsanspruch:',
      qualityText:
        'Verwenden Sie möglichst schonend getrocknete Bio-Rohstoffe ohne Schwefelbehandlung (insbesondere bei Tremella, Lotussamen und Goji-Beeren) für einen klaren, reinen Auszug.',
    },
    preparation: {
      eyebrow: 'Vor der Extraktion',
      heading: 'Zubereitung Schritt für Schritt',
      steps: [
        {
          badge: 'Schritt 1 · Einweichen (4 Std. bis über Nacht)',
          title: 'Einweichen von Tremella, Pfirsichharz & Lotussamen',
          body: 'Weichen Sie den Schneepilz, die Pfirsichharz-Perlen und – für die Option Gelassenheit – 30 g getrocknete Lotussamen am Vorabend oder mindestens 4 Stunden vor dem Start getrennt in kaltem Wasser ein.',
        },
        {
          badge: 'Schritt 2 · Vorbereiten & Schneiden',
          title: 'Aufbereiten der pflanzlichen Zutaten',
          body: 'Den Tremella abgießen, den festen gelblichen Strunk entfernen und die Blütenblätter von Hand in kleine Stücke zupfen. Das Pfirsichharz abspülen und bei den eingeweichten Lotussamen bei Bedarf den bitteren Keimling im Inneren entfernen. Jujube-Datteln halbieren, ungeschälte Birne (oder Apfel) würfeln, Ingwer fein schneiden.',
        },
        {
          badge: 'Schritt 3 · Zweiphasige BloomLab® Extraktion',
          title: 'Zwei präzise Temperaturstufen',
          body: '800 ml gefiltertes Wasser einfüllen, Tremella, Pfirsichharz, eingeweichte Lotussamen (falls gewählt), Jujuben, Birne oder Apfel, Ingwer (und optional Longan) zugeben und Phase 1 bei 80 °C für 45 Minuten starten. Anschließend nur die Goji-Beeren für Phase 2 bei 70 °C für 15 Minuten hinzufügen.',
        },
      ],
    },
    protocol: {
      eyebrow: 'Botanisches Engineering BloomLab®',
      heading: 'BloomLab® Extraktionsprotokoll',
      lead: 'Präzise abgestimmte Parameter zur Extraktion der Tremella-Polysaccharide und Lotussamen-Stärke in Phase 1 (80 °C) sowie zum Schutz von Zeaxanthin der Goji-Beeren in Phase 2 (70 °C).',
      headers: {
        step: 'Phase',
        ingredients: 'Zutaten',
        temp: 'Temperatur',
        duration: 'Dauer',
        objective: 'Wissenschaftliches Ziel',
      },
      rows: [
        {
          step: 'Phase 1 (Wasserlöslich)',
          ingredients:
            'Schneepilz (Tremella), Pfirsichharz, Lotussamen (30 g, eingeweicht), Jujube-Datteln, gewürfelte Birne oder Apfel, frischer Ingwer + Longan (optional)',
          temp: '80 °C',
          duration: '45 Minuten',
          objective:
            'Tremella-Polysaccharide und Lotussamen-Stärke gelatinieren und Makromoleküle lösen, ohne Gingerole zu zerstören.',
          tempHighlight: true,
        },
        {
          step: 'Phase 2 (Sanftes Finish)',
          ingredients: 'Goji-Beeren',
          temp: '70 °C',
          duration: '15 Minuten',
          objective:
            'Hitzeempfindliches Zeaxanthin und Vitamin C schützen und fruchtige Süße freisetzen.',
        },
      ],
      tableFootnoteLabel: 'Hinweis zum Protokoll:',
      tableFootnote:
        'Longan kann in Phase 1 hinzugefügt werden, um seine natürliche Süße und sein Aroma freizusetzen – oder für eine rein auf Yin ausgerichtete Version weggelassen werden. Die dichteren Lotussamen erfordern zwingend Phase 1.',
      whyHeading: 'Warum genau diese Parameter?',
      whyPoints: [
        {
          title: '1. Warum 80 °C statt 100 °C?',
          body: 'Bei 80 °C gelatinieren die Polysaccharide von Tremella, Pfirsichharz und die Stärke der Lotussamen zuverlässig, während Gingerole und Frucht-Polyphenole geschont werden. Sprudelndes Kochen bei 100 °C baut empfindliche Vitamine schnell ab.',
        },
        {
          title: '2. Warum 45 Minuten in Phase 1?',
          body: 'Selbst nach dem Einweichen besitzen Tremella, Pfirsichharz und Lotussamen dichte Strukturen. 45 Minuten konstante, sanfte Bewegung lösen die wohltuende Stärke der Lotussamen und sorgen für eine samtige Textur.',
        },
        {
          title: '3. Warum Goji-Beeren allein bei 70 °C in Phase 2?',
          body: 'Goji-Beeren liefern hitzeempfindliches Zeaxanthin und Vitamin C. Die alleinige Zugabe in den letzten 15 Minuten bei 70 °C bewahrt ihr antioxidatives Potenzial.',
        },
      ],
    },
    longanSection: {
      eyebrow: 'Zutaten-Fokus · Longan TCM Vorteile & Tremella Suppe Schlaf',
      heading: 'Longan: Die Zutat für Herz und Geist',
      subheading: '桂圆 (guìyuán) — Das traditionelle „Drachenauge“ der TCM',
      quote:
        '„Obwohl Longan in unserem klassischen Grundrezept optional ist, bildet es das Herzstück traditioneller Varianten für emotionale Ausgeglichenheit und erholsamen Schlaf. In der TCM nährt es das Herz-Blut und beruhigt den Shen.“',
      points: [
        {
          title: 'Herz-Blut nähren & Milz-Qi stärken',
          body: 'Wegen seines hellen Fruchtfleisches um einen dunklen Kern wird Longan (桂圆, guìyuán) „Drachenauge“ genannt. In der Traditionellen Chinesischen Medizin gilt es als Schlüsselzutat, um das Herz-Blut zu nähren und das Milz-Qi zu tonisieren.',
        },
        {
          title: 'Den Geist (Shen) beruhigen & Schlaf begleiten',
          body: 'Besonders empfohlen wird Longan in der TCM bei innerer Unruhe, gedrückter Stimmung oder Schlaflosigkeit – damit wird diese Tremella Suppe zu einem wohltuenden Abendritual.',
        },
      ],
      variantBadge: 'Hinweis zur Variante „Emotionales Gleichgewicht“',
      variantText:
        'Im Basisrezept ist Longan freiwillig. In der traditionellen Variante „Emotionales Gleichgewicht“ – der bekannten Suppe aus Tremella, Jujuben und Longan – übernimmt es hingegen die Hauptrolle.',
    },
    fruitVariants: {
      eyebrow: 'Individuelle Anpassung · Birne oder Apfel Tee',
      heading: 'Varianten: Birne oder Apfel?',
      lead: 'Die Wahl der Frucht bestimmt die Ausrichtung Ihres Elixiers: Birne nährt tiefgreifend das Yin und die Haut, während Apfel die Verdauung sanft unterstützt.',
      pear: {
        badge: 'Königin des Yin · Klassisches Rezept',
        title: 'Die Birne: Verbündete Ihrer Haut (Nährt das Yin)',
        body: 'Die kanonische Zutat dieses Yin Schönheitsrezepts. Sie befeuchtet die Lunge und nährt das Yin – ideal bei trockener Haut, trockenem Husten oder gereiztem Hals. Reich an Sorbit und Pektin verleiht sie dem Elixier eine besonders samtige Textur.',
        tipLabel: 'Tipp:',
        tip: 'Nicht schälen (gut gewaschene Bio-Birne verwenden), damit die Polyphenole in der Schale erhalten bleiben.',
        highlights: [
          'Befeuchtet die Lunge und nährt das Haut-Yin',
          'Geschmeidige Textur durch natürliches Sorbit & Pektin',
          'Optimal bei trockener Heizungsluft oder trockenem Klima',
        ],
      },
      apple: {
        badge: 'Verdauungs-Alternative · Feine Säure',
        title: 'Der Apfel: Die Verdauungs-Alternative (Stärkt die Milz)',
        body: 'Leicht säuerlich harmonisiert der Apfel den Magen und stärkt das Milz-Qi. Ideal bei träger Verdauung oder wenn Sie die natürliche Süße der Datteln mit einer feinen Säurenote ausbalancieren möchten.',
        tipLabel: 'Kombinations-Tipp:',
        tip: 'Verwenden Sie eine leicht säuerliche Bio-Apfelsorte mit Schale für mehr aromatische Frische.',
        highlights: [
          'Harmonisiert den Magen und unterstützt das Milz-Qi',
          'Gleicht die Süße von Jujube und Longan fein aus',
          'Ideal für sensible oder träge Verdauung',
        ],
      },
    },
    lotusVariant: {
      badge: 'Bonus-Rezept · Variante Gelassenheit',
      heading: 'Die Option Lotussamen (Gelassenheit & Erdung)',
      leadQuote:
        '„Für eine tiefgehende Wirkung auf Erdung und Gelassenheit fügen Sie 30 g zuvor eingeweichte Lotussamen hinzu. In der TCM stärken sie die Milz und beruhigen den Shen. Ihre langsame Extraktion bei 80 °C in Phase 1 setzt ihre wohltuende Stärke frei und verfeinert die samtige Textur des Elixiers.“',
      details: [
        {
          label: 'Zutat & Vorbereitung',
          value:
            '30 g getrocknete Lotussamen (Zugabe in Phase 1). Mindestens 4 Stunden (ideal über Nacht) einweichen und bei Bedarf den bitteren Kern entfernen.',
        },
        {
          label: 'Lotussamen Wirkung in der TCM (Lian Zi)',
          value:
            'Bekannt dafür, Milz und Nieren zu stärken, das Herz zu nähren und den Geist (Shen) zu beruhigen. Ihre sanft adstringierende Wirkung hilft, Feuchtigkeit im Körper zu bewahren – ideal ergänzend zu Tremella – bei zart-cremigem Geschmack.',
        },
        {
          label: 'BloomLab® Extraktionsprotokoll',
          value:
            'Da sie dicht und stärkereich sind, müssen sie gemeinsam mit dem Tremella extrahiert werden: Geben Sie sie bereits ab Phase 1 (80 °C für 45 Minuten) in den Korb.',
        },
      ],
    },
    benefits: {
      eyebrow: 'Pflanzliche Synergie verstehen',
      heading: 'Die Vorteile dieser Yin- & Blut-Schönheitsinfusion',
      cards: [
        {
          tag: 'Hydratation & Haut (Yin)',
          title: 'Tremella-Polysaccharide & Pflanzliches Kollagen',
          body: 'Schneepilz-Polysaccharide binden außergewöhnlich viel Wasser und unterstützen so eine tiefe Gewebehydratation und Hautelastizität. Pfirsichharz ergänzt diese Textur als pflanzliches Kollagen, während Birne und Lotussamen helfen, Feuchtigkeit zu bewahren.',
          footer:
            'Wissenschaftlicher Hinweis 2026: Aktuelle Studien von 2026 zeigen, dass Tremella-Polysaccharide die Hautfeuchtigkeit verbessern und die Hautbarriere stärken können.',
        },
        {
          tag: 'Blut & Vitalität',
          title: 'Goji, Jujube & Carotinoide',
          body: 'In der TCM spiegelt ein strahlender Teint die Fülle von Blut und Yin wider. Goji-Beeren liefern natürliches Zeaxanthin für Leber- und Nieren-Yin, während Jujube-Datteln Qi und Blut sanft nähren.',
        },
        {
          tag: 'Erdung, Shen & Verdauung',
          title: 'Harmonie aus Lotussamen, Longan & Ingwer',
          body: 'Lotussamen (Lian Zi) und Longan unterstützen traditionell Milz, Nieren und Herz und beruhigen den Shen, während frischer Ingwer die Verdauungsmitte wärmt und die Aufnahme der kühlenden Yin-Zutaten abrundet.',
        },
      ],
    },
    dosage: {
      heading: 'Anwendung, Rhythmus & Aufbewahrung',
      cards: [
        {
          label: 'Tagesmenge',
          value: '1 Tasse (200–250 ml)',
          desc: 'Täglich lauwarm oder bei Zimmertemperatur genießen.',
        },
        {
          label: 'Optimaler Zeitpunkt',
          value: 'Morgens oder nachmittags',
          desc: 'Nicht eiskalt trinken, um die Verdauungswärme zu schonen (abends ideal mit Longan / Lotussamen).',
        },
        {
          label: 'Empfohlene Dauer',
          value: '2 bis 3 Wochen',
          desc: 'Regelmäßige Anwendung begleitet Hautkomfort, Erdung und inneres Gleichgewicht.',
        },
        {
          label: 'Aufbewahrung',
          value: '5 bis 6 Tage bei 4 °C',
          desc: 'Im Kühlschrank in einer sauberen, verschlossenen Glasflasche.',
        },
      ],
      precautionLabel: 'Bildungshinweis & Vorsichtsmaßnahmen:',
      precautionText:
        'Dieses Rezept der botanischen Kulinarik dient ausschließlich Bildungs- und allgemeinen Wohlfühlzwecken; es stellt keine medizinische Beratung dar und ersetzt keine ärztliche Behandlung. Bei Schwangerschaft, Stillzeit, Kindern oder Medikamenteneinnahme (insbesondere Blutverdünner oder Blutzuckermittel) bitte vorab fachlichen Rat einholen.',
    },
    cta: {
      eyebrow: 'Von der Theorie zur gradgenauen Extraktion',
      heading: 'Bereiten Sie diese Schönheitssuppe gradgenau mit der BloomLab® zu',
      body: 'Dank präziser Temperaturführung bei 80 °C und 70 °C ohne zerstörerisches Kochen wird Ihre Küche zum modernen Kräuteratelier.',
      primaryBtn: 'BloomLab® Extraktor entdecken',
      recipesBtn: 'Alle Rezepte entdecken',
      academyBtn: 'Zur Bloom Akademie',
    },
    jsonLd: {
      name: 'Schneepilz-Schönheitssuppe (Tremella) aus der BloomLab',
      alternateName:
        'TCM Tremella-, Pfirsichharz-, Lotussamen-, Longan- & Birnen-Elixier',
      recipeYield: '800 ml (3 bis 4 Tassen)',
      recipeCategory: 'Kulinarische Werkstatt · TCM-Rezept',
      recipeCuisine: 'Traditionelle Chinesische Medizin',
      keywords:
        'Tremella Schönheitssuppe, Longan TCM Vorteile, Tremella Suppe Schlaf, Birne oder Apfel Tee, Lotussamen Wirkung, Yin Schönheitsrezept, BloomLab Rezept',
      recipeIngredient: [
        '800 ml gefiltertes Wasser',
        '10 g getrockneter Schneepilz (Tremella fuciformis), eingeweicht',
        '10 g Pfirsichharz-Perlen, eingeweicht (optional)',
        '30 g getrocknete Lotussamen (Lian Zi), 4 Std.+ eingeweicht (optional, Phase 1)',
        '10–12 entsteinte rote Jujube-Datteln (~30 g)',
        '1/2 ungeschälte Birne oder 1/2 Apfel (~80 g), gewürfelt',
        '20 g getrocknete Longan-Früchte (optional)',
        '20 g ungeschwefelte Bio-Goji-Beeren',
        '3–4 Scheiben frischer Ingwer (~10 g)',
      ],
      recipeInstructions: [
        {
          name: 'Einweichen',
          text: 'Tremella, Pfirsichharz und 30 g getrocknete Lotussamen mindestens 4 Stunden oder über Nacht getrennt in kaltem Wasser einweichen.',
        },
        {
          name: 'Vorbereiten',
          text: 'Tremella abgießen, harten Kern entfernen und zerkleinern; bei Lotussamen ggf. bitteren Keimling entfernen. Jujuben halbieren, ungeschälte Birne oder Apfel würfeln, Ingwer schneiden.',
        },
        {
          name: 'Phase 1 — Hauptextraktion',
          text: 'Tremella, Pfirsichharz, eingeweichte Lotussamen (30 g), Jujuben, Birne/Apfel, Ingwer und optional Longan in 800 ml Wasser bei 80 °C für 45 Minuten extrahieren.',
        },
        {
          name: 'Phase 2 — Goji Finish',
          text: 'Nur die Goji-Beeren hinzufügen und 15 Minuten bei 70 °C ziehen lassen.',
        },
      ],
    },
  },
};
