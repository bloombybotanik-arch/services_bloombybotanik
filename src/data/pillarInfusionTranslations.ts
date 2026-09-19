import { Language } from '../translations';

export interface PillarInfusionTranslation {
  meta: {
    breadcrumbHome: string;
    breadcrumbCurrent: string;
    badge: string;
    h1: string;
    p1: string;
    p2: string;
    legalNotice: string;
    ctaBloomLab: string;
    ctaRecipes: string;
    imgLegend: string;
  };
  section1: {
    badge: string;
    title: string;
    p1: string;
    p2Intro: string;
    infusionTitle: string;
    infusionText: string;
    decoctionTitle: string;
    decoctionText: string;
    p3: string;
    calloutTitle: string;
    calloutText: string;
  };
  section2: {
    badge: string;
    title: string;
    intro: string;
    tempTitle: string;
    tempText: string;
    timeTitle: string;
    timeText: string;
    agitationTitle: string;
    agitationText: string;
    ratioTitle: string;
    ratioText: string;
    callout: string;
  };
  section3: {
    badge: string;
    title: string;
    intro: string;
    infusion: {
      title: string;
      desc: string;
      temp: string;
      duration: string;
      parts: string;
      target: string;
    };
    decoction: {
      title: string;
      desc: string;
      temp: string;
      duration: string;
      parts: string;
      target: string;
    };
    maceration: {
      title: string;
      desc: string;
      temp: string;
      duration: string;
      parts: string;
      target: string;
    };
    synthesisTitle: string;
    synthesisText: string;
  };
  section4: {
    badge: string;
    title: string;
    intro: string;
    steps: {
      num: number;
      title: string;
      desc: string;
    }[];
    quote: string;
    linksTitle: string;
    links: { label: string; view: string }[];
  };
  section5: {
    badge: string;
    title: string;
    intro: string;
    features: { title: string; desc: string }[];
    quote: string;
    limitsTitle: string;
    limits: string[];
    cta: string;
  };
  section6: {
    badge: string;
    title: string;
    intro: string;
    table: {
      headers: { criterion: string; traditional: string; bloomlab: string };
      rows: { criterion: string; traditional: string; bloomlab: string }[];
    };
    footnote: string;
  };
  section7: {
    badge: string;
    title: string;
    intro: string;
    solvents: {
      title: string;
      polarity: string;
      desc: string;
      affinity: string;
      examples: string;
      shelfLife: string;
    }[];
    precautionTitle: string;
    precautionText: string;
  };
  section8: {
    badge: string;
    title: string;
    intro: string;
    recipes: {
      num: number;
      title: string;
      category: string;
      ingredients: string;
      parameters: string;
      steps: string[];
      shelfLife: string;
      safety: string;
    }[];
  };
  section9: {
    badge: string;
    title: string;
    intro: string;
    rules: { title: string; desc: string }[];
    disclaimer: string;
  };
  section10: {
    badge: string;
    title: string;
    profiles: {
      badge: string;
      title: string;
      desc: string;
      cta: string;
      view: string;
    }[];
  };
  section11: {
    badge: string;
    title: string;
    faq: { q: string; a: string }[];
  };
  section12: {
    title: string;
    desc: string;
    ctaMachine: string;
    ctaShop: string;
    ctaFree: string;
  };
}

export const pillarInfusionTranslations: Record<Language, PillarInfusionTranslation> = {
  fr: {
    meta: {
      breadcrumbHome: "Accueil",
      breadcrumbCurrent: "Infusion botanique maison",
      badge: "Guide Méthode & Pratique Domestique",
      h1: "Infusion botanique maison : de la plante à la préparation",
      p1: "L’infusion botanique ne se limite pas à verser de l’eau chaude sur une plante. Elle repose sur un équilibre entre la plante choisie, le solvant utilisé, la température, la durée et le mouvement du mélange.",
      p2: "Avec Bloom by BotaniK, vous découvrez une approche plus précise de la préparation botanique à domicile : comprendre les plantes, suivre des recettes guidées, préparer des huiles infusées et progresser avec BloomLab.",
      legalNotice: "BloomLab est un outil de préparation botanique domestique. Il ne remplace pas un avis médical, un diagnostic ou un traitement. Les informations proposées sont pédagogiques.",
      ctaBloomLab: "Je découvre BloomLab",
      ctaRecipes: "Commencer avec les recettes gratuites",
      imgLegend: "Préparation botanique guidée à domicile",
    },
    section1: {
      badge: "Fondamentaux",
      title: "Qu’est-ce qu’une infusion botanique ?",
      p1: "L’infusion botanique consiste à immerger des matières végétales dans un solvant liquide maintenu à une température donnée pendant une durée précise. L'eau constitue historiquement le solvant le plus universel et accessible : elle dissout efficacement les composés hydrosolubles comme les sels minéraux, les mucilages, certains acides organiques et les tanins.",
      p2Intro: "Il convient de distinguer clairement deux méthodes thermiques complémentaires :",
      infusionTitle: "L’infusion :",
      infusionText: "le liquide chaud est versé ou maintenu au contact de parties végétales tendres (fleurs, feuilles, sommités fleuries) sans maintenir d’ébullition vive, afin de limiter la dégradation thermique des constituants fragiles.",
      decoctionTitle: "La décoction :",
      decoctionText: "la matière végétale est immergée dans de l'eau portée et maintenue à frémissement ou ébullition pendant plusieurs dizaines de minutes. Cette technique est principalement réservée aux parties dures et denses comme les écorces, racines, graines ou bois.",
      p3: "Alors qu’une simple tisane renvoie fréquemment à un rituel gustatif informel, l’infusion botanique relève d’une démarche structurée. Le résultat dépend de la plante choisie, de la partie récoltée, du solvant sélectionné, de la température et de la durée d'exposition.",
      calloutTitle: "À retenir :",
      calloutText: "« Une préparation botanique n’est pas définie uniquement par la plante utilisée. Le résultat dépend aussi du solvant, de la température, de la durée, de la granulométrie, de l’agitation, de la filtration et de la conservation. »",
    },
    section2: {
      badge: "Science du paramétrage",
      title: "Pourquoi contrôler la température, le temps et l’agitation ?",
      intro: "Dans toute préparation botanique, l'équilibre entre dissolution et dégradation est étroitement lié aux conditions du milieu. Une gestion rigoureuse des variables permet de guider la préparation selon les objectifs recherchés :",
      tempTitle: "Impact de la température",
      tempText: "Une température trop élevée peut altérer certains constituants sensibles ou dissiper des molécules aromatiques volatiles. À l'inverse, une température trop basse peut ralentir ou restreindre certains phénomènes de diffusion et d’extraction.",
      timeTitle: "Gestion de la durée",
      timeText: "Une durée trop courte peut produire une préparation différente d’une exposition plus longue. Selon la plante, prolonger l'infusion peut libérer davantage d’astringence ou de tanins, modifiant le profil sensoriel de la solution.",
      agitationTitle: "Rôle de l’agitation",
      agitationText: "Un mouvement régulier et doux renouvelle en continu la couche de solvant en contact avec la surface des tissus végétaux. L'agitation accélère les transferts de matière sans nécessiter d'élever excessivement la température.",
      ratioTitle: "Finesse de coupe (Granulométrie)",
      ratioText: "Une plante concassée présente une surface de contact supérieure à une plante entière, favorisant les échanges. Toutefois, une mouture trop fine complique la filtration et peut créer des résidus indésirables.",
      callout: "Contrôler ces variables permet de rechercher une meilleure répétabilité dans vos préparations domestiques.",
    },
    section3: {
      badge: "Méthodes comparées",
      title: "Infusion, décoction, macération : quelles différences ?",
      intro: "Chaque technique d'extraction répond à des caractéristiques végétales bien précises :",
      infusion: {
        title: "Infusion",
        desc: "Immersion dans un solvant chaud sans ébullition maintenue.",
        temp: "60°C à 85°C",
        duration: "5 à 15 minutes",
        parts: "Fleurs, feuilles tendres, sommités fleuries",
        target: "Composés volatils, arômes, polyphénols délicats"
      },
      decoction: {
        title: "Décoction",
        desc: "Maintien d'un frémissement continu dans l'eau.",
        temp: "90°C à 100°C",
        duration: "15 à 45 minutes",
        parts: "Racines, écorces, graines dures, bois",
        target: "Principes denses, fibres profondes, tanins structurés"
      },
      maceration: {
        title: "Macération",
        desc: "Extraction prolongée à froid ou température ambiante.",
        temp: "15°C à 25°C (ou tiédie 40°C)",
        duration: "Plusieurs heures à plusieurs semaines",
        parts: "Toutes parties végétales selon le solvant",
        target: "Mucilages délicats, huiles infusées, macérats alcooliques"
      },
      synthesisTitle: "Synthèse :",
      synthesisText: "Le choix entre infusion, décoction et macération s'appuie sur la densité des tissus végétaux et la sensibilité thermique des molécules recherchées."
    },
    section4: {
      badge: "La méthode Bloom",
      title: "La démarche Bloom : de la plante au résultat",
      intro: "Pour pratiquer la botanique domestique avec méthode et discernement :",
      steps: [
        {
          num: 1,
          title: "Comprendre la plante",
          desc: "Identifier ses parties actives, sa saisonnalité, ses usages traditionnels documentés et ses précautions d'emploi."
        },
        {
          num: 2,
          title: "Choisir une méthode cohérente",
          desc: "Sélectionner le solvant pertinent et le ratio végétal/liquide adapté à la préparation recherchée."
        },
        {
          num: 3,
          title: "Reproduire les paramètres",
          desc: "Appliquer des repères stables de température et de temps pour obtenir une préparation régulière et soignée."
        }
      ],
      quote: "« Bloom by BotaniK relie l’étude des plantes, la formulation de recettes et la maîtrise des paramètres de préparation. L’objectif n’est pas de promettre une extraction totale, mais de rendre la pratique plus compréhensible, plus documentée et plus régulière. »",
      linksTitle: "Explorer nos espaces pédagogiques :",
      links: [
        { label: "L'Herbier", view: "herbier" },
        { label: "L'Extraction botanique", view: "extraction-botanique" },
        { label: "La Bibliothèque", view: "bibliotheque" }
      ]
    },
    section5: {
      badge: "Outil domestique",
      title: "BloomLab : l’outil de préparation botanique à domicile",
      intro: "BloomLab a été conçue comme un instrument de précision pour les passionnés de plantes et de préparations maison. Elle vous aide à structurer vos protocoles autour de paramètres stables :",
      features: [
        { title: "Thermorégulation stable :", desc: "maintien d'une consigne thermique ajustée selon le modèle." },
        { title: "Durée chronométrée :", desc: "contrôle automatique du cycle pour respecter chaque protocole." },
        { title: "Agitation douce :", desc: "homogénéisation lorsque le programme sélectionné le prévoit." },
        { title: "Répétabilité :", desc: "facilité à reproduire une recette culinaire ou cosmétique réussie." },
        { title: "Entretien :", desc: "conception pensée pour un nettoyage simple après usage." }
      ],
      quote: "« BloomLab vous aide à appliquer certains protocoles avec davantage de régularité. Elle ne remplace ni la connaissance de la plante, ni l’évaluation de la qualité des matières premières, ni le respect des règles d’hygiène et de conservation. »",
      limitsTitle: "Ce que BloomLab ne fait pas",
      limits: [
        "Ne transforme pas une plante de mauvaise qualité en un extrait d'exception.",
        "Ne dispense pas de la rigueur de pesée et de filtration.",
        "Ne remplace en aucun cas un avis médical ou un traitement de santé."
      ],
      cta: "Découvrir la fiche complète de BloomLab"
    },
    section6: {
      badge: "Comparatif d'usage",
      title: "Ce que BloomLab apporte par rapport à un bain-marie traditionnel",
      intro: "La préparation domestique fait historiquement appel au bain-marie. BloomLab rationalise cette pratique en apportant des repères constants :",
      table: {
        headers: {
          criterion: "Critère de préparation",
          traditional: "Bain-marie traditionnel",
          bloomlab: "Préparation avec BloomLab"
        },
        rows: [
          {
            criterion: "Contrôle de la température",
            traditional: "Inertie forte, surveillance visuelle continue de l'eau",
            bloomlab: "Consigne thermique électronique au degré près"
          },
          {
            criterion: "Agitation du mélange",
            traditional: "Manuelle, discontinue, aléatoire",
            bloomlab: "Agitation magnétique motorisée continue selon le mode"
          },
          {
            criterion: "Gestion du temps",
            traditional: "Chronomètre externe, risque d'oubli sur le feu",
            bloomlab: "Cycle automatique minuté avec arrêt programmé"
          },
          {
            criterion: "Régularité des préparations",
            traditional: "Variable selon la puissance du feu et l'attention",
            bloomlab: "Paramètres constants et reproductibles"
          }
        ]
      },
      footnote: "BloomLab n'est pas un équipement de laboratoire industriel ; c'est un appareil domestique pensé pour encadrer la pratique artisanale avec soin."
    },
    section7: {
      badge: "Solvants botaniques",
      title: "Quels solvants utiliser pour vos préparations ?",
      intro: "Le choix du liquide d’extraction dépend directement de la nature biochimique des molécules cibles :",
      solvents: [
        {
          title: "L'eau pure ou filtrée",
          polarity: "Solvant polaire (Hydrosoluble)",
          desc: "Convient aux mucilages, sels minéraux, acides organiques et tanins. Idéale pour les infusions légères à boire immédiatement.",
          affinity: "Molécules hydrosolubles",
          examples: "Camomille, mélisse, menthe, thym",
          shelfLife: "24 à 48 heures au réfrigérateur"
        },
        {
          title: "L'huile végétale",
          polarity: "Solvant lipophile (Liposoluble)",
          desc: "Idéale pour confectionner des macérats huileux pour le corps ou la cuisine. Elle capte les caroténoïdes et composés aromatiques.",
          affinity: "Molécules lipophiles",
          examples: "Calendula, millepertuis, arnica, romarin",
          shelfLife: "6 à 12 mois à l'abri de la lumière"
        },
        {
          title: "La glycérine végétale",
          polarity: "Solvant intermédiaire doux",
          desc: "Parfaite pour des extractions sans alcool destinées aux soins cosmétiques ou aux préparations buccales douces.",
          affinity: "Composés polaires et semi-polaires",
          examples: "Mauve, guimauve, lavande",
          shelfLife: "Plusieurs mois au frais"
        }
      ],
      precautionTitle: "Précautions relatives aux solvants :",
      precautionText: "Vérifiez toujours la pureté et la fraîcheur de vos huiles et solvants. Une huile rance ou une eau stagnante dégrade irrémédiablement le végétal."
    },
    section8: {
      badge: "Formulations guidées",
      title: "Exemples de préparations simples à réaliser",
      intro: "Trois exemples pour explorer la diversité des techniques à la maison :",
      recipes: [
        {
          num: 1,
          title: "Infusion apaisante du soir",
          category: "Infusion aqueuse",
          ingredients: "Mélisse (feuilles), Passiflore (parties aériennes), eau purifiée.",
          parameters: "80°C pendant 10 minutes.",
          steps: [
            "Peser 3 g de chaque plante sèche.",
            "Verser 300 ml d'eau à 80°C.",
            "Laisser infuser à couvert pendant 10 minutes.",
            "Filtrer soigneusement avant dégustation."
          ],
          shelfLife: "Consommation immédiate.",
          safety: "Ne pas conduire après consommation en cas de somnolence."
        },
        {
          num: 2,
          title: "Macérat huileux de Calendula",
          category: "Huile de soin cutané",
          ingredients: "Fleurs de souci séchées, huile de jojoba ou de tournesol bio.",
          parameters: "45°C pendant 60 minutes avec agitation douce.",
          steps: [
            "Déposer 15 g de fleurs bien sèches dans le panier.",
            "Couvrir de 150 ml d'huile végétale.",
            "Régler BloomLab à 45°C pendant 1 heure.",
            "Presser et filtrer sur gaze fine, mettre en flacon ambré."
          ],
          shelfLife: "6 mois à température tempérée.",
          safety: "Faire un test de pli du coude 24 h avant application."
        },
        {
          num: 3,
          title: "Eau aromatique digestive de Menthe",
          category: "Infusion fraîche",
          ingredients: "Feuilles fraîches ou sèches de menthe poivrée, eau de source.",
          parameters: "75°C pendant 8 minutes.",
          steps: [
            "Introduire 4 g de menthe dans l'eau frémissante.",
            "Maintenir la chaleur douce sans ébullition.",
            "Filtrer et déguster chaud ou tiède après le repas."
          ],
          shelfLife: "24 heures au frais.",
          safety: "Déconseillé aux enfants de moins de 6 ans."
        }
      ]
    },
    section9: {
      badge: "Sécurité & Bonnes pratiques",
      title: "Précautions d'usage et sécurité botanique",
      intro: "La pratique botanique exige vigilance, humilité et rigueur :",
      rules: [
        {
          title: "Identification rigoureuse :",
          desc: "N'utilisez que des plantes formellement identifiées par leur nom botanique latin complet."
        },
        {
          title: "Hygiène irréprochable :",
          desc: "Nettoyez et désinfectez systématiquement vos récipients, ustensiles et flacons de stockage."
        },
        {
          title: "Conservation maîtrisée :",
          desc: "Les préparations aqueuses se conservent peu de temps. Jetez tout liquide présentant une odeur suspecte ou un trouble."
        },
        {
          title: "Discernement médical :",
          desc: "Une infusion de plantes n'est pas un médicament. En cas de traitement en cours ou de maladie, demandez l'avis d'un professionnel."
        }
      ],
      disclaimer: "« Les informations présentées ici sont destinées à la culture générale et aux loisirs créatifs autour des plantes. Elles ne remplacent aucunement l'avis d'un médecin, pharmacien ou sage-femme. »"
    },
    section10: {
      badge: "Parcours guidé",
      title: "Où aller ensuite selon votre profil ?",
      profiles: [
        {
          badge: "Profil 1",
          title: "Vous découvrez les plantes",
          desc: "Apprenez à reconnaître les familles botaniques, les parties de plantes et leurs usages traditionnels.",
          cta: "Explorer l’Herbier",
          view: "herbier"
        },
        {
          badge: "Profil 2",
          title: "Vous voulez tester une première préparation",
          desc: "Accédez à des fiches recettes gratuites simples et guidées pour votre cuisine ou vos soins naturels.",
          cta: "Recevoir les recettes gratuites",
          view: "recettes-gratuites"
        },
        {
          badge: "Profil 3",
          title: "Vous souhaitez préparer régulièrement",
          desc: "Découvrez l'outil BloomLab pour fiabiliser vos protocoles avec une régularité thermique constante.",
          cta: "Découvrir BloomLab",
          view: "machine"
        },
        {
          badge: "Profil 4",
          title: "Vous voulez progresser",
          desc: "Consultez notre bibliothèque de savoirs, nos dossiers d'extraction et nos guides thématiques approfondis.",
          cta: "Accéder à la bibliothèque",
          view: "bibliotheque"
        }
      ]
    },
    section11: {
      badge: "Foire aux questions",
      title: "Questions fréquentes sur l’infusion botanique",
      faq: [
        {
          q: "Quelle différence entre une tisane et une infusion botanique ?",
          a: "La tisane traditionnelle est le plus souvent une boisson d'agrément préparée en versant une eau bouillante sur des plantes sans contrôle précis de la température ni du temps. L'infusion botanique adopte une démarche structurée : sélection de la partie végétale, adaptation de la température selon la fragilité des composés, calibrage de la durée et recherche d'une meilleure régularité dans la préparation."
        },
        {
          q: "Quelle différence entre infusion, décoction et macération ?",
          a: "L'infusion consiste à immerger des parties végétales fragiles (fleurs, feuilles tendres) dans un liquide chauffé sans ébullition continue. La décoction maintient une ébullition douce pour extraire les principes de parties denses (écorces, racines, graines dures). La macération, quant à elle, s'effectue à température ambiante ou à froid pendant une durée prolongée dans de l'eau, de l'huile ou un autre solvant."
        },
        {
          q: "Comment choisir un solvant ?",
          a: "Le choix du solvant dépend de la nature des constituants recherchés : l'eau convient aux molécules hydrosolubles (mucilages, tanins, certains polyphénols) ; l'huile végétale est adaptée aux molécules liposolubles (caroténoïdes, arômes, principes actifs pour soins cutanés) ; la glycérine végétale permet des préparations douces sans alcool. Chaque solvant possède ses exigences d'hygiène et de conservation."
        },
        {
          q: "BloomLab remplace-t-elle un bain-marie ?",
          a: "BloomLab remplit la fonction d'un bain-marie régulé avec une précision accrue : elle maintient une température stable au degré près, intègre une minuterie programmable et propose une agitation magnétique douce selon les programmes, évitant ainsi la surveillance manuelle et les risques de surchauffe locale propres au bain-marie traditionnel."
        },
        {
          q: "Quelles plantes peut-on infuser ?",
          a: "La plupart des plantes aromatiques, médicinales et culinaires documentées peuvent être infusées : camomille, mélisse, menthe, romarin, thym, ortie, calendula ou verveine. Il est toutefois impératif de respecter l'usage documenté de chaque espèce, la partie de plante adéquate (fleur, feuille, sommité) et les précautions d'emploi associées."
        },
        {
          q: "Peut-on préparer des huiles infusées ?",
          a: "Oui. L'infusion dans une huile végétale (comme l'huile d'olive, de jojoba, d'amande douce ou de tournesol) permet de confectionner des huiles aromatiques culinaires ou des macérats huileux pour soins cutanés (ex. macérat de calendula). Une maîtrise fine de la température (généralement entre 40°C et 60°C) est essentielle pour préserver la qualité de l'huile."
        },
        {
          q: "Les kits de plantes sont-ils biologiques ?",
          a: "Les mélanges proposés par Bloom by BotaniK proviennent de filières rigoureusement sélectionnées, privilégiant les plantes issues de l'agriculture biologique et des récoltes respectueuses de la biodiversité. Chaque fiche de kit détaille précisément l'origine, les certifications éventuelles et la composition exacte du lot."
        },
        {
          q: "Peut-on utiliser une préparation botanique comme un médicament ?",
          a: "Non. Les préparations présentées par Bloom by BotaniK ne remplacent ni un diagnostic, ni un avis médical, ni un traitement. En cas de grossesse, d’allaitement, d’allergie, de traitement ou de situation particulière, demandez conseil à un professionnel de santé."
        },
        {
          q: "Comment conserver une préparation ?",
          a: "Une infusion aqueuse fraîche doit être consommée dans les 24 à 48 heures et conservée au réfrigérateur. Une huile infusée filtrée avec soin se conserve plusieurs mois à l'abri de la lumière, de l'air et de la chaleur, idéalement dans un flacon en verre ambré hermétiquement fermé."
        },
        {
          q: "Où commencer lorsqu’on ne connaît pas encore les plantes ?",
          a: "Le meilleur point de départ consiste à explorer notre Herbier pour comprendre les profils de quelques plantes simples (mélisse, camomille, ortie), puis de tester une première recette guidée gratuite avec de l'eau ou de l'huile avant d'envisager des méthodes plus avancées."
        }
      ]
    },
    section12: {
      title: "Votre pratique botanique commence par une première préparation",
      desc: "Comprenez la plante, choisissez une méthode cohérente et progressez à votre rythme. Bloom by BotaniK vous accompagne avec des guides, des recettes, un Herbier, des kits de plantes et BloomLab comme outil de préparation botanique à domicile.",
      ctaMachine: "Je découvre BloomLab",
      ctaShop: "Voir la boutique",
      ctaFree: "Commencer gratuitement"
    }
  },
  en: {
    meta: {
      breadcrumbHome: "Home",
      breadcrumbCurrent: "Homemade Botanical Infusion",
      badge: "Method & Domestic Practice Guide",
      h1: "Homemade Botanical Infusion: From Plant to Preparation",
      p1: "Botanical infusion is far more than pouring hot water over a dried plant. It relies on a delicate balance between the selected botanical part, chosen solvent, precise temperature, duration, and controlled agitation.",
      p2: "With Bloom by BotaniK, discover an exacting method for domestic herbal preparations: understand plant profiles, follow step-by-step recipes, formulate infused oils, and elevate your practice with the BloomLab extractor.",
      legalNotice: "BloomLab is a domestic botanical preparation tool. It does not replace medical advice, diagnosis, or prescribed treatments. All content is educational.",
      ctaBloomLab: "Discover BloomLab",
      ctaRecipes: "Start with Free Recipes",
      imgLegend: "Guided precision botanical preparation at home",
    },
    section1: {
      badge: "Fundamentals",
      title: "What is a Botanical Infusion?",
      p1: "Botanical infusion consists of immersing plant material in a liquid solvent maintained at a specific temperature for a defined period. Pure water is historically the most universal solvent: it dissolves water-soluble compounds like mineral salts, mucilages, organic acids, and polyphenols.",
      p2Intro: "Two complementary thermal methods must be clearly distinguished:",
      infusionTitle: "Infusion:",
      infusionText: "Hot liquid is placed in contact with delicate plant tissues (flowers, soft leaves, flowering tops) without boiling, preventing the thermal breakdown of fragile volatile compounds.",
      decoctionTitle: "Decoction:",
      decoctionText: "Botanical matter is submerged in simmering water for tens of minutes. This technique is reserved for dense and fibrous tissues like barks, roots, and hard seeds.",
      p3: "While an informal tea is a recreational ritual, a botanical infusion is a structured discipline. Results depend on plant species, harvested part, solvent polarity, thermal stability, and contact time.",
      calloutTitle: "Key takeaway:",
      calloutText: "“A botanical preparation is not defined solely by the plant chosen. The final extraction depends equally on solvent, temperature, time, grind size, agitation, filtration, and storage conditions.”",
    },
    section2: {
      badge: "Extraction Science",
      title: "Why Control Temperature, Time, and Agitation?",
      intro: "In botanical extraction, dissolution and degradation compete constantly. Rigorous management of operational variables steers the preparation toward target therapeutic profiles:",
      tempTitle: "Temperature Impact",
      tempText: "Excessive heat denatures thermosensitive molecules and boils away volatile terpenes. Conversely, insufficient heat slows mass transfer and leaves target compounds locked in plant walls.",
      timeTitle: "Duration Control",
      timeText: "Too brief an extraction results in weak preparations. Prolonging contact can cause unwanted bitter tannins and astringent polyphenols to dominate the aroma profile.",
      agitationTitle: "Role of Agitation",
      agitationText: "Gentle, continuous agitation refreshes the solvent boundary layer against plant tissues, accelerating diffusion without demanding thermal over-heating.",
      ratioTitle: "Granulometry & Cut Size",
      ratioText: "Crushed herbs offer greater surface area for faster solvent penetration. However, overly fine dust impairs filtration and introduces turbidity into the finished extract.",
      callout: "Controlling these variables enables reliable reproducibility across your home formulations.",
    },
    section3: {
      badge: "Comparative Methods",
      title: "Infusion, Decoction, Maceration: What are the Differences?",
      intro: "Each extraction technique corresponds to precise botanical tissue structures and compound sensitivities:",
      infusion: {
        title: "Infusion",
        desc: "Steeping in hot solvent below boiling point.",
        temp: "60°C to 85°C",
        duration: "5 to 15 minutes",
        parts: "Flowers, tender leaves, flowering tops",
        target: "Volatile compounds, delicate polyphenols, aromas"
      },
      decoction: {
        title: "Decoction",
        desc: "Continuous gentle simmering in water.",
        temp: "90°C to 100°C",
        duration: "15 to 45 minutes",
        parts: "Roots, barks, hard seeds, medicinal wood",
        target: "Dense active principles, deep fibers, structured tannins"
      },
      maceration: {
        title: "Maceration",
        desc: "Extended cold or room-temperature solvent contact.",
        temp: "15°C to 25°C (or warmed 40°C)",
        duration: "Several hours to several weeks",
        parts: "All plant parts depending on solvent",
        target: "Delicate mucilages, infused carrier oils, alcohol tinctures"
      },
      synthesisTitle: "Summary:",
      synthesisText: "Choosing between infusion, decoction, and maceration depends on the density of plant tissues and the thermal sensitivity of desired actives."
    },
    section4: {
      badge: "The Bloom Method",
      title: "The Bloom Workflow: From Botanical to Finished Extract",
      intro: "Practicing botanical extraction with clarity and precision requires a methodical progression:",
      steps: [
        {
          num: 1,
          title: "Understand the Plant",
          desc: "Identify active botanical parts, seasonality, documented traditional uses, and specific usage precautions."
        },
        {
          num: 2,
          title: "Choose a Coherent Method",
          desc: "Select the relevant solvent and calibrated plant-to-liquid ratio tailored to your intended outcome."
        },
        {
          num: 3,
          title: "Reproduce Parameters",
          desc: "Apply consistent benchmarks of temperature, duration, and gentle agitation to achieve reliable results."
        }
      ],
      quote: "“Bloom by BotaniK bridges plant science, guided formulation, and calibrated extraction controls. Our goal is to make home herbal craft accessible, rigorously documented, and repeatable.”",
      linksTitle: "Explore our educational libraries:",
      links: [
        { label: "The Herbarium", view: "herbier" },
        { label: "Botanical Extraction", view: "extraction-botanique" },
        { label: "Knowledge Library", view: "bibliotheque" }
      ]
    },
    section5: {
      badge: "Domestic Instrument",
      title: "BloomLab: The Precision Domestic Herbal Extractor",
      intro: "BloomLab was engineered as a laboratory-inspired instrument for herbal enthusiasts. It standardizes home extraction around stable benchmarks:",
      features: [
        { title: "Stable Thermoregulation:", desc: "PID precision temperature control calibrated to the degree." },
        { title: "Timed Cycles:", desc: "automatic digital timing to respect each plant's optimal steeping window." },
        { title: "Gentle Magnetic Agitation:", desc: "homogeneous mixing when specified by the active recipe." },
        { title: "Reproducibility:", desc: "effortlessly replicate successful cosmetic and culinary extracts." },
        { title: "Simple Maintenance:", desc: "dishwasher-safe borosilicate chamber and high-grade 304 stainless steel." }
      ],
      quote: "“BloomLab helps you execute protocols with superior consistency. It supports, but never replaces, plant knowledge, quality sourcing, or hygienic best practices.”",
      limitsTitle: "What BloomLab Does Not Do",
      limits: [
        "Does not transform poor quality herbs into premium extracts.",
        "Does not eliminate the need for precise weighing and careful filtration.",
        "Never replaces qualified medical care or prescribed treatments."
      ],
      cta: "Explore the Full BloomLab Specifications"
    },
    section6: {
      badge: "Benchmark Comparison",
      title: "What BloomLab Delivers Over a Traditional Double Boiler",
      intro: "Herbalists have traditionally relied on the double boiler (bain-marie). BloomLab modernizes this practice with unwavering consistency:",
      table: {
        headers: {
          criterion: "Preparation Factor",
          traditional: "Traditional Double Boiler",
          bloomlab: "BloomLab® Precision Extractor"
        },
        rows: [
          {
            criterion: "Temperature Control",
            traditional: "High thermal drift, erratic hot spots from boiling steam",
            bloomlab: "Precise digital PID regulation within ±0.5°C"
          },
          {
            criterion: "Batch Agitation",
            traditional: "Manual, discontinuous, irregular stirring with a spoon",
            bloomlab: "Continuous motorized gentle magnetic stirring"
          },
          {
            criterion: "Time Management",
            traditional: "Manual stopwatch, risk of boil-dry hazards",
            bloomlab: "Programmed automatic cycle with shut-off alarm"
          },
          {
            criterion: "Consistency & Totum",
            traditional: "Varies with stove heat and attention; terpene evaporation",
            bloomlab: "Sealed chamber preserving full botanical Totum repeatedly"
          }
        ]
      },
      footnote: "BloomLab is not an industrial chemical reactor; it is an accessible domestic tool crafted to elevate natural herbal formulation."
    },
    section7: {
      badge: "Botanical Solvents",
      title: "Which Solvents to Use for Your Preparations?",
      intro: "Extraction solvents must be selected based on the polarity of your desired active constituents:",
      solvents: [
        {
          title: "Pure or Distilled Water",
          polarity: "Polar Solvent (Hydrophilic)",
          desc: "Extracts mucilages, mineral salts, organic acids, and tannins. Ideal for immediate restorative teas.",
          affinity: "Water-soluble molecules",
          examples: "Chamomile, lemon balm, mint, thyme",
          shelfLife: "24 to 48 hours refrigerated"
        },
        {
          title: "Vegetable Carrier Oil",
          polarity: "Lipophilic Solvent (Lipid-soluble)",
          desc: "Ideal for making body massage oils and culinary finishing oils. Solubilizes carotenoids and aromatic terpenes.",
          affinity: "Fat-soluble active principles",
          examples: "Calendula, St. John's wort, arnica, rosemary",
          shelfLife: "6 to 12 months away from light"
        },
        {
          title: "Vegetable Glycerin",
          polarity: "Gentle Intermediate Solvent",
          desc: "Perfect for alcohol-free drops and extracts intended for sensitive skin or soothing oral syrups.",
          affinity: "Polar and semi-polar compounds",
          examples: "Mallow, marshmallow root, lavender",
          shelfLife: "Several months in cool storage"
        }
      ],
      precautionTitle: "Solvent Safety Notes:",
      precautionText: "Always verify the freshness and grade of your oils. Rancid oils or stagnant water will spoil botanical extracts immediately."
    },
    section8: {
      badge: "Guided Formulations",
      title: "Simple Starter Preparations to Craft at Home",
      intro: "Three foundational protocols to explore diverse extraction techniques at home:",
      recipes: [
        {
          num: 1,
          title: "Deep Evening Restorative Infusion",
          category: "Aqueous Infusion",
          ingredients: "Lemon balm leaves, passionflower tops, purified water.",
          parameters: "80°C for 10 minutes.",
          steps: [
            "Weigh 3 g of each dried plant.",
            "Pour 300 ml of water at 80°C into the vessel.",
            "Cover and steep for 10 minutes.",
            "Filter thoroughly through fine mesh before drinking."
          ],
          shelfLife: "Drink fresh immediately.",
          safety: "Do not operate heavy machinery if drowsiness occurs."
        },
        {
          num: 2,
          title: "Calendula Soothing Oil Macerate",
          category: "Skin Care Oil",
          ingredients: "Dried calendula petals, organic jojoba or sunflower oil.",
          parameters: "45°C for 60 minutes with gentle magnetic stirring.",
          steps: [
            "Place 15 g of dried petals in the filter basket.",
            "Cover with 150 ml of carrier oil.",
            "Set BloomLab to 45°C for 1 hour.",
            "Press and filter through fine cloth, bottle in amber glass."
          ],
          shelfLife: "6 months at room temperature away from light.",
          safety: "Perform a 24-hour patch test on the inner elbow before use."
        },
        {
          num: 3,
          title: "Peppermint Crisp Digestive Water",
          category: "Fresh Digestive Infusion",
          ingredients: "Fresh or dried peppermint leaves, spring water.",
          parameters: "75°C for 8 minutes.",
          steps: [
            "Add 4 g of peppermint leaves to preheated water.",
            "Maintain gentle heat without bringing to a rolling boil.",
            "Filter and sip warm or room temperature after meals."
          ],
          shelfLife: "Consume within 24 hours refrigerated.",
          safety: "Not advised for young children under 6 years."
        }
      ]
    },
    section9: {
      badge: "Safety & Best Practices",
      title: "Usage Precautions & Botanical Safety",
      intro: "Botanical preparation calls for vigilance, humility, and hygiene:",
      rules: [
        {
          title: "Rigorous Botanical Identification:",
          desc: "Only use plants verified by their complete binomial Latin botanical names."
        },
        {
          title: "Uncompromising Cleanliness:",
          desc: "Thoroughly clean and sanitize all glass vessels, measuring tools, and storage bottles."
        },
        {
          title: "Storage Discipline:",
          desc: "Water-based extracts have short shelf lives. Discard any solution showing cloudiness or off odors."
        },
        {
          title: "Medical Prudence:",
          desc: "Herbal infusions are not medical treatments. Consult your healthcare provider if taking medications."
        }
      ],
      disclaimer: "“The information presented here is intended for general education and creative herbal practice. It does not replace the counsel of a physician, pharmacist, or licensed healthcare provider.”"
    },
    section10: {
      badge: "Guided Journey",
      title: "Where to Go Next Based on Your Profile?",
      profiles: [
        {
          badge: "Profile 1",
          title: "You are Discovering Herbs",
          desc: "Learn to recognize plant families, active botanical parts, and their documented traditional uses.",
          cta: "Explore the Herbarium",
          view: "herbier"
        },
        {
          badge: "Profile 2",
          title: "You Want to Try Your First Recipe",
          desc: "Access simple, free step-by-step recipe sheets for your kitchen or daily wellness routines.",
          cta: "Get Free Recipes",
          view: "recettes-gratuites"
        },
        {
          badge: "Profile 3",
          title: "You Want Regular Home Extraction",
          desc: "Discover how the BloomLab appliance stabilizes home protocols with automated temperature control.",
          cta: "Discover BloomLab",
          view: "machine"
        },
        {
          badge: "Profile 4",
          title: "You Want Advanced Mastery",
          desc: "Browse our in-depth scientific knowledge library, research papers, and comprehensive extraction dossiers.",
          cta: "Access Knowledge Library",
          view: "bibliotheque"
        }
      ]
    },
    section11: {
      badge: "Frequently Asked Questions",
      title: "Frequently Asked Questions About Botanical Infusions",
      faq: [
        {
          q: "What is the difference between herbal tea and a botanical infusion?",
          a: "Traditional herbal tea is typically an informal hot drink made by pouring boiling water over dried herbs without heat regulation or timing control. A botanical infusion follows a structured protocol: calibrated temperature matching compound fragility, measured extraction duration, and consistent dissolution of target phytochemicals."
        },
        {
          q: "What is the difference between infusion, decoction, and maceration?",
          a: "Infusion immerses tender plant parts (flowers, leaves) in warm liquid without boiling. Decoction maintains a gentle simmer to extract actives from dense plant tissues (roots, barks, seeds). Maceration operates at room temperature or cold over an extended timeframe in water, oil, or alcohol."
        },
        {
          q: "How do I choose the correct solvent?",
          a: "Solvent choice depends on the biochemical nature of desired compounds: water dissolves polar molecules (mucilages, tannins, polyphenols); plant oils extract non-polar lipophilic principles (carotenoids, aromas, fat-soluble actives); vegetable glycerin creates soothing alcohol-free extracts."
        },
        {
          q: "Does BloomLab replace a traditional double boiler (bain-marie)?",
          a: "Yes, and with far higher accuracy: BloomLab holds temperature steady to the degree, incorporates automated timers, and provides continuous magnetic stirring, eliminating manual monitoring and the risk of hot-spot scorching inherent in double boilers."
        },
        {
          q: "Which botanicals can be infused?",
          a: "Most culinary, aromatic, and medicinal plants with documented safety profiles: chamomile, lemon balm, peppermint, rosemary, thyme, stinging nettle, and calendula. Always respect documented plant parts and usage warnings."
        },
        {
          q: "Can I prepare infused carrier oils with BloomLab?",
          a: "Absolutely. Infusing botanical material into carrier oils (jojoba, sweet almond, olive, sunflower) produces luxurious body oils, soothing facial serums, and gourmet culinary oils without thermal oxidation."
        },
        {
          q: "Are the herbal blends organic?",
          a: "All blends formulated by Bloom by BotaniK originate from rigorous ethical supply chains prioritizing certified organic agriculture and biodiversity-conscious harvesting."
        },
        {
          q: "Can botanical preparations replace medication?",
          a: "No. Botanical preparations support baseline vitality and balance. They do not replace clinical diagnoses, medical consultations, or prescribed medications."
        },
        {
          q: "How should I store finished botanical preparations?",
          a: "Fresh aqueous infusions must be consumed within 24 to 48 hours and stored in the refrigerator. Infused oils filtered thoroughly will keep for several months in amber glass bottles away from light and heat."
        },
        {
          q: "Where should beginners start?",
          a: "We recommend exploring our living Herbarium to understand foundational plants (lemon balm, chamomile, nettle), followed by trying our free guided recipes with water or oil before attempting multi-solvent extractions."
        }
      ]
    },
    section12: {
      title: "Your Botanical Practice Begins with a First Preparation",
      desc: "Understand the plant, choose a coherent method, and progress at your own pace. Bloom by BotaniK guides you with recipe guides, an Herbarium, organic plant kits, and BloomLab as your precision domestic companion.",
      ctaMachine: "Discover BloomLab",
      ctaShop: "Visit Shop",
      ctaFree: "Start for Free"
    }
  },
  de: {
    meta: {
      breadcrumbHome: "Startseite",
      breadcrumbCurrent: "Botanischer Hausaufguss",
      badge: "Methoden- & Praxisleitfaden für zu Hause",
      h1: "Botanischer Hausaufguss: Von der Pflanze zur Zubereitung",
      p1: "Ein botanischer Aufguss ist weit mehr als das einfache Übergießen von Kräutern mit kochendem Wasser. Er beruht auf einem exakten Gleichgewicht aus gewählten Pflanzenteilen, Lösungsmittel, Temperatur, Extraktionszeit und sanfter Bewegung.",
      p2: "Mit Bloom by BotaniK entdecken Sie eine präzise Methode für die häusliche Kräuterkunde: verstehen Sie Pflanzenprofile, folgen Sie geführten Rezepten, stellen Sie wirksame Ölauszüge her und perfektionieren Sie Ihre Zubereitungen mit dem BloomLab.",
      legalNotice: "BloomLab ist ein Haushaltsgerät für botanische Zubereitungen. Es ersetzt weder ärztliche Diagnosen noch medizinische Behandlungen. Alle Angaben dienen der Aufklärung.",
      ctaBloomLab: "BloomLab entdecken",
      ctaRecipes: "Mit kostenlosen Rezepten starten",
      imgLegend: "Geführte botanische Präzisionszubereitung zu Hause",
    },
    section1: {
      badge: "Grundlagen",
      title: "Was ist ein botanischer Aufguss?",
      p1: "Ein botanischer Aufguss bezeichnet das Einlegen pflanzlicher Stoffe in ein flüssiges Lösungsmittel bei einer definierten Temperatur über einen präzisen Zeitraum. Wasser ist historisch das universellste Lösungsmittel: Es löst wasserlösliche Inhaltsstoffe wie Mineralsalze, Schleimstoffe, organische Säuren und Tannine effizient.",
      p2Intro: "Dabei sind zwei komplementäre thermische Verfahren zu unterscheiden:",
      infusionTitle: "Der Aufguss (Infusion):",
      infusionText: "Heiße Flüssigkeit wird mit zarten Pflanzenteilen (Blüten, Blätter) in Kontakt gebracht, ohne dass es kocht, um hitzeempfindliche Wirkstoffe und Aromen zu schonen.",
      decoctionTitle: "Die Abkochung (Dekokt):",
      decoctionText: "Das Pflanzenmaterial wird über längere Zeit sanft geköchelt. Diese Methode ist harten und dichten Pflanzenteilen wie Rinden, Wurzeln und Samen vorbehalten.",
      p3: "Während ein gewöhnlicher Kräutertee ein informelles Alltagsgetränk darstellt, folgt ein botanischer Aufguss einer strukturierten Methode. Das Ergebnis hängt von Pflanzenart, Ernteanteil, Lösungsmittelpolarität, Temperatur und Kontaktzeit ab.",
      calloutTitle: "Wichtig zu wissen:",
      calloutText: "„Eine botanische Zubereitung wird nicht allein durch die Pflanze bestimmt. Das Extraktionsergebnis hängt gleichermaßen vom Lösungsmittel, der Temperatur, der Dauer, dem Zerkleinerungsgrad, der Rührung, der Filtration und der Lagerung ab.“",
    },
    section2: {
      badge: "Extraktionswissenschaft",
      title: "Warum Temperatur, Zeit und Bewegung kontrollieren?",
      intro: "Bei jeder pflanzlichen Extraktion stehen Auflösung und Zersetzung in ständiger Konkurrenz. Eine gezielte Steuerung der Parameter ermöglicht maßgeschneiderte Wirkstoffprofile:",
      tempTitle: "Einfluss der Temperatur",
      tempText: "Zu hohe Hitze zerstört empfindliche Moleküle und verdampft flüchtige Terpene. Zu niedrige Temperaturen verlangsamen den Diffusionsprozess und lassen Wirkstoffe in den Pflanzenfasern eingeschlossen.",
      timeTitle: "Steuerung der Dauer",
      timeText: "Zu kurze Kontaktzeiten führen zu unvollständiger Lösung. Ein Überziehen der Ziehzeit setzt übermäßig viele bittere Gerbstoffe frei, die den Geschmack und die Bekömmlichkeit beeinträchtigen.",
      agitationTitle: "Bedeutung der Rührung",
      agitationText: "Sanfte, kontinuierliche Rührung erneuert die Lösungsmittelschicht an der Pflanzenoberfläche kontinuierlich und beschleunigt den Stoffaustausch ohne thermische Überhitzung.",
      ratioTitle: "Schnittgröße & Mahlgrad",
      ratioText: "Zerkleinerte Kräuter bieten mehr Angriffsfläche für das Lösungsmittel. Ein zu feines Pulver erschwert jedoch die Filtration und hinterlässt Trübungen.",
      callout: "Die Beherrschung dieser Parameter sichert eine zuverlässige Wiederholbarkeit in der heimischen Praxis.",
    },
    section3: {
      badge: "Verfahrensvergleich",
      title: "Aufguss, Abkochung, Mazeration: Wo liegen die Unterschiede?",
      intro: "Jede Extraktionsmethode entspricht spezifischen Gewebestrukturen und Stoffempfindlichkeiten:",
      infusion: {
        title: "Aufguss (Infusion)",
        desc: "Ziehenlassen in heißem Lösungsmittel unterhalb des Siedepunkts.",
        temp: "60°C bis 85°C",
        duration: "5 bis 15 Minuten",
        parts: "Blüten, zarte Blätter, Blütenstände",
        target: "Flüchtige Terpene, feine Polyphenole, Aromen"
      },
      decoction: {
        title: "Abkochung (Dekokt)",
        desc: "Sanftes, dauerhaftes Köcheln im Wasser.",
        temp: "90°C bis 100°C",
        duration: "15 bis 45 Minuten",
        parts: "Wurzeln, Rinden, harte Samen, Holz",
        target: "Dichte Wirkstoffe, feste Fasern, Tannine"
      },
      maceration: {
        title: "Mazeration",
        desc: "Längerer Kalt- oder Raumtemperaturauszug.",
        temp: "15°C bis 25°C (oder erwärmt 40°C)",
        duration: "Mehrere Stunden bis Wochen",
        parts: "Alle Pflanzenteile je nach Lösungsmittel",
        target: "Empfindliche Schleimstoffe, Ölauszüge, alkoholische Tinkturen"
      },
      synthesisTitle: "Zusammenfassung:",
      synthesisText: "Die Wahl zwischen Aufguss, Dekokt und Mazeration richtet sich nach der Gewebedichte und der thermischen Beständigkeit der erwünschten Wirkstoffe."
    },
    section4: {
      badge: "Die Bloom-Methode",
      title: "Der Bloom-Ablauf: Von der Heilpflanze zum fertigen Auszug",
      intro: "Eine strukturierte botanische Praxis zu Hause folgt klaren Leitlinien:",
      steps: [
        {
          num: 1,
          title: "Die Pflanze verstehen",
          desc: "Aktive Pflanzenteile, Erntezeitpunkte, dokumentierte Anwendungen und Vorsichtsmaßnahmen kennen."
        },
        {
          num: 2,
          title: "Stimmiges Verfahren wählen",
          desc: "Passendes Lösungsmittel und das ideale Verhältnis von Pflanze zu Flüssigkeit abstimmen."
        },
        {
          num: 3,
          title: "Parameter reproduzieren",
          desc: "Stabile Temperatur- und Zeitwerte anwenden, um gleichbleibend hochwertige Ergebnisse zu erzielen."
        }
      ],
      quote: "„Bloom by BotaniK verbindet Pflanzenkunde, geführte Rezepturen und präzise Temperaturführung. Ziel ist es, das traditionelle Kräuterwissen verlässlich und reproduzierbar zu machen.“",
      linksTitle: "Unsere pädagogischen Bereiche entdecken:",
      links: [
        { label: "Das Herbarium", view: "herbier" },
        { label: "Botanische Extraktion", view: "extraction-botanique" },
        { label: "Wissensbibliothek", view: "bibliotheque" }
      ]
    },
    section5: {
      badge: "Haushaltsinstrument",
      title: "BloomLab: Das botanische Präzisionsgerät für zu Hause",
      intro: "BloomLab wurde als präzises Instrument für Kräuterliebhaber konzipiert. Es verlässlicht Ihre Zubereitungen durch messbare Standards:",
      features: [
        { title: "Stabile Thermoregulation:", desc: "PID-gesteuerte Temperaturführung auf das Grad genau." },
        { title: "Automatische Timer:", desc: "präzise Zeitabschaltung zum Schutz empfindlicher Ziehzeiten." },
        { title: "Sanfte Magnetrührung:", desc: "gleichmäßige Durchmischung für schonenden Stoffaustausch." },
        { title: "Wiederholbarkeit:", desc: "gelungene Kosmetik- und Speiseölauszüge mühelos replizieren." },
        { title: "Einfache Pflege:", desc: "spülmaschinenfeste Borosilikat-Glaskammer und Edelstahl 304." }
      ],
      quote: "„BloomLab hilft Ihnen, Rezepturen mit höchster Regelmäßigkeit umzusetzen. Es unterstützt die Sorgfalt, ersetzt aber weder botanisches Wissen noch saubere Rohstoffqualität.“",
      limitsTitle: "Was BloomLab nicht leistet",
      limits: [
        "Verwandelt minderwertige Pflanzen nicht in Wunderextrakte.",
        "Ersetzt nicht das sorgfältige Einwiegen und feine Filtrieren.",
        "Ersetzt niemals eine ärztliche Diagnose oder medizinische Therapie."
      ],
      cta: "Vollständiges Datenblatt des BloomLab ansehen"
    },
    section6: {
      badge: "Praxisvergleich",
      title: "Die Vorteile von BloomLab gegenüber dem Wasserbad",
      intro: "Klassisch wurde für Ölauszüge das Wasserbad genutzt. BloomLab standardisiert dieses Verfahren ohne Hitzespitzen:",
      table: {
        headers: {
          criterion: "Zubereitungskriterium",
          traditional: "Klassisches Wasserbad",
          bloomlab: "BloomLab® Präzisionsextraktor"
        },
        rows: [
          {
            criterion: "Temperaturstabilität",
            traditional: "Starke Hitzespitzen über 90°C durch kochenden Wasserdampf",
            bloomlab: "Konstante PID-Temperaturregelung auf ±0,5°C genau"
          },
          {
            criterion: "Durchmischung",
            traditional: "Manuelles, unregelmäßiges Rühren mit dem Löffel",
            bloomlab: "Kontinuierliche motorisierte Magnetrührung"
          },
          {
            criterion: "Aufsicht & Sicherheit",
            traditional: "Ständige Aufsicht gegen Trockenlaufen erforderlich",
            bloomlab: "Programmierbarer Timer mit automatischer Abschaltung"
          },
          {
            criterion: "Totum-Schutz",
            traditional: "Verdampfen flüchtiger Aromen und empfindlicher Terpene",
            bloomlab: "Geschlossene Kammer bewahrt das gesamte Pflanzentotum"
          }
        ]
      },
      footnote: "BloomLab ist kein industrieller Großreaktor, sondern ein zugängliches Heimgerät für anspruchsvolle Naturrezepte."
    },
    section7: {
      badge: "Lösungsmittel",
      title: "Welche Lösungsmittel eignen sich für Ihre Auszüge?",
      intro: "Die Polarität des Lösungsmittels entscheidet über die gelösten Inhaltsstoffe:",
      solvents: [
        {
          title: "Reines oder gefiltertes Wasser",
          polarity: "Polares Lösungsmittel (Hydrophil)",
          desc: "Löst Schleimstoffe, Mineralsalze, organische Säuren und Tannine. Perfekt für frische Tees.",
          affinity: "Wasserlösliche Moleküle",
          examples: "Kamille, Melisse, Pfefferminze, Thymian",
          shelfLife: "24 bis 48 Stunden im Kühlschrank"
        },
        {
          title: "Pflanzliche Trägeröle",
          polarity: "Lipophiles Lösungsmittel (Lipophil)",
          desc: "Ideal für nährende Körperöle und Gourmet-Speiseöle. Bindet fettlösliche Carotinoide und Aromen.",
          affinity: "Fettlösliche Wirkstoffe",
          examples: "Ringelblume (Calendula), Johanniskraut, Arnika, Rosmarin",
          shelfLife: "6 bis 12 Monate lichtgeschützt"
        },
        {
          title: "Pflanzliches Glycerin",
          polarity: "Sanftes Zwischenlösungsmittel",
          desc: "Ideal für alkoholfreie Essenzen, die für empfindliche Haut oder sanfte Mundspülungen bestimmt sind.",
          affinity: "Polare und semipolare Verbindungen",
          examples: "Malve, Eibischwurzel, Lavendel",
          shelfLife: "Mehrere Monate kühl gelagert"
        }
      ],
      precautionTitle: "Hinweise zur Lösungsmittelqualität:",
      precautionText: "Achten Sie stets auf frische, kaltgepresste Öle. Ranziges Öl oder verunreinigtes Wasser verdirbt den Pflanzenauszug sofort."
    },
    section8: {
      badge: "Geführte Rezepturen",
      title: "Einfache Starterrezepturen für zu Hause",
      intro: "Drei elementare Rezepturen zum Kennenlernen der botanischen Extraktion:",
      recipes: [
        {
          num: 1,
          title: "Beruhigender Abendaufguss",
          category: "Wässriger Aufguss",
          ingredients: "Melissenblätter, Passionsblumenkraut, gereinigtes Wasser.",
          parameters: "80°C für 10 Minuten.",
          steps: [
            "Je 3 g getrocknete Kräuter einwiegen.",
            "300 ml Wasser mit 80°C zugeben.",
            "Zugedeckt 10 Minuten ziehen lassen.",
            "Sorgfältig durch ein feines Sieb abseihen."
          ],
          shelfLife: "Frisch genießen.",
          safety: "Bei Müdigkeit nicht mehr am Straßenverkehr teilnehmen."
        },
        {
          num: 2,
          title: "Ringelblumen-Pflegeöl (Calendula)",
          category: "Hautpflegeöl",
          ingredients: "Getrocknete Ringelblumenblüten, Bio-Jojoba- oder Sonnenblumenöl.",
          parameters: "45°C für 60 Minuten mit sanfter Rührung.",
          steps: [
            "15 g getrocknete Blüten in den Filterkorb geben.",
            "Mit 150 ml Pflanzenöl bedecken.",
            "BloomLab auf 45°C für 1 Stunde einstellen.",
            "Durch Filtertuch abpressen und in Braunglas abfüllen."
          ],
          shelfLife: "6 Monate bei Raumtemperatur dunkel gelagert.",
          safety: "Vor der Erstanwendung 24 Std. in der Armbeuge testen."
        },
        {
          num: 3,
          title: "Pfefferminz-Verdauungswasser",
          category: "Frischer Verdauungsaufguss",
          ingredients: "Frische oder getrocknete Pfefferminzblätter, Quellwasser.",
          parameters: "75°C für 8 Minuten.",
          steps: [
            "4 g Pfefferminzblätter in das heiße Wasser geben.",
            "Wärme schonend ohne Sieden halten.",
            "Abseihen und nach dem Essen warm oder lauwarm trinken."
          ],
          shelfLife: "Innerhalb von 24 Stunden verbrauchen.",
          safety: "Nicht für Kleinkinder unter 6 Jahren geeignet."
        }
      ]
    },
    section9: {
      badge: "Sicherheit & Richtlinien",
      title: "Sicherheitshinweise und botanische Sorgfalt",
      intro: "Die Pflanzenpraxis erfordert Umsicht, Hygiene und Respekt vor der Natur:",
      rules: [
        {
          title: "Eindeutige Pflanzenbestimmung:",
          desc: "Verwenden Sie ausschließlich botanisch exakt bestimmte Arten mit vollständigem lateinischem Namen."
        },
        {
          title: "Kompromisslose Hygiene:",
          desc: "Reinigen und desinfizieren Sie alle Gefäße, Rührwerkzeuge und Aufbewahrungsflaschen gründlich."
        },
        {
          title: "Gewissenhafte Lagerung:",
          desc: "Wässrige Auszüge verderben rasch. Entsorgen Sie Flüssigkeiten bei Trübung oder abweichendem Geruch sofort."
        },
        {
          title: "Medizinische Vernunft:",
          desc: "Pflanzenaufgüsse sind keine Arzneimittel. Bei Vorerkrankungen oder Medikamenteneinnahme stets ärztlichen Rat einholen."
        }
      ],
      disclaimer: "„Die hier bereitgestellten Informationen dienen der Wissensvermittlung und der kreativen Naturpraxis. Sie ersetzen zu keinem Zeitpunkt die Beratung durch Arzt, Apotheker oder Hebamme.“"
    },
    section10: {
      badge: "Wegweiser",
      title: "Wohin als Nächstes nach Ihrem Profil?",
      profiles: [
        {
          badge: "Profil 1",
          title: "Sie entdecken die Pflanzenwelt",
          desc: "Lernen Sie Pflanzenfamilien, Ernteanteile und traditionell überlieferte Anwendungen kennen.",
          cta: "Herbarium erkunden",
          view: "herbier"
        },
        {
          badge: "Profil 2",
          title: "Sie möchten das erste Rezept ausprobieren",
          desc: "Erhalten Sie einfache, kostenlose Schritt-für-Schritt-Anleitungen für Küche und Wohlbefinden.",
          cta: "Kostenlose Rezepte anfordern",
          view: "recettes-gratuites"
        },
        {
          badge: "Profil 3",
          title: "Sie möchten regelmäßig zu Hause extrahieren",
          desc: "Erfahren Sie, wie BloomLab mit kontrollierter Temperatur für reproduzierbare Ergebnisse sorgt.",
          cta: "BloomLab kennenlernen",
          view: "machine"
        },
        {
          badge: "Profil 4",
          title: "Sie möchten Ihr Wissen vertiefen",
          desc: "Greifen Sie auf unsere wissenschaftliche Bibliothek, Fachdossiers und Vertiefungsleitfäden zu.",
          cta: "Zur Bibliothek",
          view: "bibliotheque"
        }
      ]
    },
    section11: {
      badge: "Häufige Fragen",
      title: "Häufig gestellte Fragen zum botanischen Aufguss",
      faq: [
        {
          q: "Was ist der Unterschied zwischen Kräutertee und einem botanischen Aufguss?",
          a: "Ein klassischer Kräutertee wird meist informell zubereitet, indem kochendes Wasser ohne exakte Temperaturkontrolle über Kräuter gegossen wird. Ein botanischer Aufguss folgt einem präzisen Protokoll: gradgenaue Temperatur je nach Empfindlichkeit der Pflanzenteile, exakte Zeitmessung und gleichmäßige Wirkstoffextraktion."
        },
        {
          q: "Was ist der Unterschied zwischen Aufguss, Abkochung und Mazeration?",
          a: "Ein Aufguss betrifft zarte Pflanzenteile (Blüten, Blätter) in warmem Wasser ohne Kochen. Eine Abkochung köchelt harte Pflanzenteile (Wurzeln, Rinden) sanft aus. Eine Mazeration findet bei Raumtemperatur oder kalt über einen längeren Zeitraum in Wasser, Öl oder Alkohol statt."
        },
        {
          q: "Wie wählt man das richtige Lösungsmittel aus?",
          a: "Die Wahl richtet sich nach den gewünschten Wirkstoffen: Wasser löst polare Stoffe (Schleimstoffe, Gerbstoffe, Flavonoide); Pflanzenöle lösen unpolare Stoffe (Carotinoide, ätherische Komponenten für die Hautpflege); pflanzliches Glycerin ermöglicht alkoholfreie Extrakte."
        },
        {
          q: "Ersetzt BloomLab ein traditionelles Wasserbad?",
          a: "Ja, und mit deutlich höherer Präzision: BloomLab hält die Temperatur gradgenau stabil, verfügt über integrierte Timer und rührt die Mischung sanft magnetisch – ohne Gefahr von Überhitzung oder Verbrennungen."
        },
        {
          q: "Welche Pflanzen können aufgegossen werden?",
          a: "Die meisten bekannten Heil- und Gewürzkräuter: Kamille, Melisse, Pfefferminze, Rosmarin, Thymian, Brennnessel oder Ringelblume. Beachten Sie stets die offizielle Verwendung des jeweiligen Pflanzenteils."
        },
        {
          q: "Kann man mit BloomLab auch Ölauszüge herstellen?",
          a: "Ja. Die Extraktion in Pflanzenölen (Jojoba, Mandel, Olive) liefert hochwertige Massage- und Gesichtspflegeöle sowie aromatische Speiseöle, ohne dass empfindliche Fettsäuren oxidieren."
        },
        {
          q: "Sind die Pflanzenmischungen biologisch?",
          a: "Die von Bloom by BotaniK angebotenen Kräuter stammen aus streng kontrolliertem Anbau mit Fokus auf zertifizierten Bio-Anbau und nachhaltige Wildsammlungen."
        },
        {
          q: "Dürfen botanische Zubereitungen wie Medikamente verwendet werden?",
          a: "Nein. Botanische Zubereitungen dienen der Unterstützung und dem Wohlbefinden. Sie ersetzen weder eine ärztliche Diagnose noch therapeutische Verordnungen."
        },
        {
          q: "Wie werden Zubereitungen haltbar gemacht?",
          a: "Frische wässrige Aufgüsse sollten innerhalb von 24 bis 48 Stunden verbraucht und im Kühlschrank aufbewahrt werden. Sauber filtrierte Ölauszüge halten sich in dunklen Glasflaschen kühl und lichtgeschützt mehrere Monate."
        },
        {
          q: "Wo fängt man als Einsteiger am besten an?",
          a: "Beginnen Sie mit unserem Herbarium, um Basiskräuter (Melisse, Kamille, Brennnessel) kennenzulernen, und probieren Sie kostenlose Rezepte mit Wasser oder Öl aus."
        }
      ]
    },
    section12: {
      title: "Ihre botanische Praxis beginnt mit einer ersten Zubereitung",
      desc: "Verstehen Sie die Pflanze, wählen Sie eine stimmige Methode und schreiten Sie in Ihrem eigenen Tempo voran. Bloom by BotaniK begleitet Sie mit Leitfäden, Rezepten, einem Herbarium, Bio-Pflanzensets und BloomLab als Präzisionsbegleiter für zu Hause.",
      ctaMachine: "BloomLab entdecken",
      ctaShop: "Zum Shop",
      ctaFree: "Kostenlos starten"
    }
  }
};
