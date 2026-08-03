
export interface ChronoPlant {
  slug: string;
  nom: string;
  role: string;
  depend_de_bilan: boolean;
  avertissement?: string;
}

export interface ChronoPhase {
  key: string;
  time_window: string;
  title: string;
  short_text: string;
  long_text: string;
  objectives: string[];
  core_plants: ChronoPlant[];
  optional_plants: ChronoPlant[];
  core_supplements?: ChronoPlant[];
  optional_supplements?: ChronoPlant[];
  system_message: string;
}

export const chronobiologyData: Record<string, ChronoPhase> = {
  "activation_matin": {
    "key": "activation_matin",
    "time_window": "07:00–09:00",
    "title": "Activation",
    "short_text": "Réveil mitochondrial et mise en route douce de l’axe HPA. Ouverture du terrain pour la journée.",
    "long_text": "Le matin, le corps passe de la nuit de réparation à la journée d’action. La phase d’activation réveille les mitochondries, relance la circulation, prépare l’axe HPA et ouvre le terrain intestinal par hydratation et gel protecteur. C’est aussi le moment idéal pour les nutriments qui synchronisent horloge circadienne et système immunitaire.",
    "objectives": [
      "Sortir de l’inertie nocturne sans choc.",
      "Activer la micro-circulation et les fonctions cognitives.",
      "Préparer l’intestin, le foie et le système immunitaire aux phases de drainage et de digestion."
    ],
    "core_plants": [
      {
        "slug": "gingembre",
        "nom": "Gingembre",
        "role": "Réveille la digestion et la micro-circulation, aide à sortir de la lourdeur matinale.",
        "depend_de_bilan": false
      },
      {
        "slug": "ortie",
        "nom": "Ortie",
        "role": "Apporte minéraux et tonus léger, soutien muscles et fascia dès le matin.",
        "depend_de_bilan": false
      },
      {
        "slug": "rhodiola",
        "nom": "Rhodiola rosea",
        "role": "Adaptogène de l’axe HPA, améliore la vigilance sans suractiver le stress.",
        "depend_de_bilan": false
      }
    ],
    "optional_plants": [
      {
        "slug": "chaga",
        "nom": "Chaga",
        "role": "Champignon adaptogène, soutien immunitaire et antioxydant pour terrains très fatigués.",
        "depend_de_bilan": true
      },
      {
        "slug": "hericium",
        "nom": "Hericium",
        "role": "Soutien neurogène et cognitif, à réserver aux profils avec charge cérébrale importante.",
        "depend_de_bilan": true
      }
    ],
    "core_supplements": [
      {
        "slug": "psyllium",
        "nom": "Psyllium",
        "role": "Gel protecteur intestinal le matin, augmente la viscosité, capte acides biliaires secondaires et prépare la barrière.",
        "depend_de_bilan": false
      },
      {
        "slug": "eau_matin",
        "nom": "Hydratation matinale",
        "role": "500 ml d’eau tiède (option citron + sel marin non raffiné) pour relancer motilité biliaire, intestinale et rénale.",
        "depend_de_bilan": false
      },
      {
        "slug": "vitamine_d3_k2",
        "nom": "Vitamine D3 + K2",
        "role": "Optimale le matin avec un apport gras; module SRA, immunité, ossature et hormone du jour. K2 guide le calcium vers les os et non vers les artères.",
        "depend_de_bilan": false
      },
      {
        "slug": "selenium",
        "nom": "Sélénium",
        "role": "Cofacteur des enzymes antioxydantes, soutien thyroïde et immunité; à prendre le matin ou au déjeuner avec un repas.",
        "depend_de_bilan": false
      }
    ],
    "optional_supplements": [
      {
        "slug": "aloe_vera",
        "nom": "Aloé vera",
        "role": "Soutien des jonctions serrées et de la motilité; à utiliser selon tolérance intestinale.",
        "depend_de_bilan": true
      }
    ],
    "system_message": "Bloom ne cherche pas à ‘booster’ la matinée, mais à remettre en route un système entier : mitochondries, nerf vague, foie, intestin, immunité et fascia."
  },

  "metabolisme_midi": {
    "key": "metabolisme_midi",
    "time_window": "12:00–14:00",
    "title": "Métabolisme",
    "short_text": "Fenêtre d’assimilation diurne : le foie, la bile et l’intestin traitent le repas principal.",
    "long_text": "À midi, le feu digestif et les enzymes hépatiques sont à leur apogée. La phase de métabolisme soutient la transformation des nutriments en énergie stable, sans saturer le foie ni créer une inflammation silencieuse. Les compléments de terrain (fibres marines, Oméga‑3, vitamine C) soutiennent simultanément microbiote, membranes et capacité antioxydante.",
    "objectives": [
      "Optimiser la digestion du repas principal sans surcharge biliaire.",
      "Soutenir la Phase II hépatique et la sortie biliaire.",
      "Nourrir microbiote, membranes et système antioxydant pour la suite du Reset."
    ],
    "core_plants": [
      {
        "slug": "artichaut",
        "nom": "Artichaut",
        "role": "Protège les hépatocytes et facilite le flux biliaire pendant la digestion des graisses.",
        "depend_de_bilan": false
      },
      {
        "slug": "curcuma",
        "nom": "Curcuma",
        "role": "Inhibe NF‑κB, soutient la bile et limite l’inflammation post-prandiale.",
        "depend_de_bilan": false
      },
      {
        "slug": "poivre_noir",
        "nom": "Poivre noir",
        "role": "Augmente la biodisponibilité des actifs (curcuminoïdes, polyphénols).",
        "depend_de_bilan": false
      }
    ],
    "optional_plants": [
      {
        "slug": "gentiane",
        "nom": "Gentiane jaune",
        "role": "Amers puissants pour relancer les sécrétions digestives; réservée aux terrains qui le tolèrent.",
        "depend_de_bilan": true
      },
      {
        "slug": "radis_noir",
        "nom": "Radis noir",
        "role": "Inducteur de Phase II, utile si bile épaisse ou digestion lente.",
        "depend_de_bilan": true
      },
      {
        "slug": "chrysanthellum",
        "nom": "Chrysanthellum americanum",
        "role": "Microcirculation hépatique et modulation du cholestérol; proposé si terrain lipido‑métabolique chargé.",
        "depend_de_bilan": true
      }
    ],
    "core_supplements": [
      {
        "slug": "chondrus",
        "nom": "Chondrus crispus",
        "role": "Prébiotique marin, polysaccharides et minéraux anti‑inflammatoires, soutien intestin et reins.",
        "depend_de_bilan": false
      },
      {
        "slug": "dulse",
        "nom": "Dulse",
        "role": "Algue riche en minéraux et fucanes; soutien du terrain minéral et du microbiote.",
        "avertissement": "En cas de Hashimoto ou pathologie thyroïdienne, limiter la fréquence ou adapter la dose d’algues (iode) et se faire accompagner.",
        "depend_de_bilan": true
      },
      {
        "slug": "omega_3",
        "nom": "Oméga‑3 EPADHA",
        "role": "Anti‑inflammatoire systémique, soutien membranes neuronales et système endocannabinoïde; idéalement pris avec un repas (déjeuner ou dîner).",
        "depend_de_bilan": false
      },
      {
        "slug": "vitamine_c",
        "nom": "Vitamine C",
        "role": "Antioxydant de base, soutien immunité et synthèse de collagène; à prendre en 1–2 prises dans la journée, souvent au déjeuner pour éviter l’excitation tardive.",
        "depend_de_bilan": false
      }
    ],
    "optional_supplements": [],
    "system_message": "Cette phase ne vise pas à ‘mieux digérer’ un repas isolé, mais à stabiliser le système foie–bile–intestin et nourrir le terrain (microbiote, membranes, minéraux, antioxydants)."
  },

  "preparation_soir": {
    "key": "preparation_soir",
    "time_window": "18:00–20:00",
    "title": "Préparation",
    "short_text": "Bascule vers le parasympathique : on prépare le système nerveux, le foie et l’intestin à la nuit.",
    "long_text": "En fin de journée, le corps doit quitter le mode ‘alerte’ pour entrer en mode ‘réparation’. La phase de préparation calme l’axe HPA, baisse la tension fasciale et synchronise digestion légère, respiration, compléments du soir et mise en place de la fenêtre de jeûne nocturne. C’est aussi un moment possible pour une seconde dose de vitamine C si le terrain le demande.",
    "objectives": [
      "Faire redescendre le cortisol vesperal.",
      "Préparer le foie à sa phase de détox nocturne (dîner léger et pris tôt).",
      "Aligner digestion, respiration et compléments sur la logique circadienne."
    ],
    "core_plants": [
      {
        "slug": "melisse",
        "nom": "Mélisse",
        "role": "Calme doux du système nerveux et soutien digestion du soir.",
        "depend_de_bilan": false
      },
      {
        "slug": "safran",
        "nom": "Safran",
        "role": "Agit sur sérotonine, GABA et cortisol; prépare l’axe psycho‑émotionnel au sommeil.",
        "depend_de_bilan": false
      },
      {
        "slug": "reishi",
        "nom": "Reishi",
        "role": "Adaptogène de terrain, modulant HPA et immunité de base.",
        "depend_de_bilan": false
      }
    ],
    "optional_plants": [
      {
        "slug": "houblon",
        "nom": "Houblon",
        "role": "GABA‑ergique, facilite l’endormissement; indiqué en cas d’insomnie ou réveils nocturnes.",
        "depend_de_bilan": true
      },
      {
        "slug": "ashwagandha",
        "nom": "Ashwagandha",
        "role": "Adaptogène HPA, utile si stress chronique et difficulté à couper le mental le soir.",
        "depend_de_bilan": true
      }
    ],
    "core_supplements": [
      {
        "slug": "omega_3",
        "nom": "Oméga‑3 EPADHA",
        "role": "Peut être pris au déjeuner ou au dîner selon tolérance; soutient l’anti‑inflammation nocturne et le système endocannabinoïde.",
        "depend_de_bilan": false
      },
      {
        "slug": "vitamine_c_soir",
        "nom": "Vitamine C (éventuelle dose du soir)",
        "role": "Une petite dose peut être prise en fin de journée selon tolérance, pour soutenir collagène et défenses, tout en évitant de perturber l’endormissement.",
        "depend_de_bilan": true
      }
    ],
    "optional_supplements": [],
    "system_message": "Cette phase n’est pas un ‘anti‑stress du soir’, c’est la clé de la bascule système HPA–vague–SEC vers un mode reconstruction, avec digestion légère et fin de la fenêtre alimentaire."
  },

  "regeneration_nuit": {
    "key": "regeneration_nuit",
    "time_window": "22:00–06:00",
    "title": "Régénération",
    "short_text": "Sommeil profond, autophagie et reconstruction tissulaire. Binder + charbon limitent la recirculation des toxines.",
    "long_text": "Pendant la nuit, le corps reconstruit ce que le jour a drainé : fascia, peau, intestin, foie, axes HPA/SEC. La phase de régénération met l’autophagie au service de la réparation, tandis que le Binder et le charbon réduisent la recirculation des toxines, LPS et métaux lourds libérés. Les nutriments pris plus tôt dans la journée (vitamine C, D, Oméga‑3, sélénium) soutiennent silencieusement cette réparation.",
    "objectives": [
      "Permettre un sommeil delta stable, propice à la réparation tissulaire.",
      "Renforcer la barrière intestinale et la matrice conjonctive.",
      "Limiter la recirculation lente (entero‑hépatique) des toxines mobilisées dans la journée."
    ],
    "core_plants": [
      {
        "slug": "glycine",
        "nom": "Glycine",
        "role": "Baisse la température centrale, induit le sommeil delta et soutient collagène et jonctions serrées.",
        "depend_de_bilan": false
      },
      {
        "slug": "ashwagandha",
        "nom": "Ashwagandha (extrait standardisé)",
        "role": "Frein de l’axe HPA, prépare la reméthylation de FKBP5 et la consolidation hippocampique.",
        "depend_de_bilan": false
      },
      {
        "slug": "houblon",
        "nom": "Houblon",
        "role": "GABA‑ergique, facilite l’endormissement et diminue les cytokines vespérales.",
        "depend_de_bilan": false
      }
    ],
    "optional_plants": [
      {
        "slug": "bardane",
        "nom": "Bardane",
        "role": "Inuline et lactones sesquiterpéniques, soutien du microbiote et du foie pendant la nuit.",
        "depend_de_bilan": true
      },
      {
        "slug": "hericium",
        "nom": "Hericium",
        "role": "Champignon neurogène, utile si cible principale : mémoire, neuroplasticité.",
        "depend_de_bilan": true
      },
      {
        "slug": "chaga",
        "nom": "Chaga",
        "role": "Antioxydant profond, soutien immunitaire et terrain inflammatoire; effet différé.",
        "depend_de_bilan": true
      },
      {
        "slug": "astragale",
        "nom": "Astragale",
        "role": "Télomérase et longévité cellulaire; à réserver aux terrains ayant avancé dans le Reset.",
        "depend_de_bilan": true
      },
      {
        "slug": "centella_asiatica",
        "nom": "Centella asiatica",
        "role": "Collagène et fascia; renforce la reconstruction nocturne des tissus.",
        "depend_de_bilan": true
      }
    ],
    "core_supplements": [
      {
        "slug": "binder",
        "nom": "Binder (zéolithe, bentonite…)",
        "role": "Pris au coucher, capte les toxines, LPS et métaux lourds pour éviter la recirculation entero‑hépatique.",
        "depend_de_bilan": false
      },
      {
        "slug": "charbon_vegetal",
        "nom": "Charbon végétal",
        "role": "Complète le Binder en adsorbant certains métabolites et gaz; à utiliser en respectant les intervalles avec médicaments ou autres compléments.",
        "depend_de_bilan": false
      }
    ],
    "optional_supplements": [],
    "system_message": "La régénération n’est pas un simple ‘complément pour dormir mieux’, c’est la phase où le système entier profite du Reset : moins de toxines en circulation, plus de réparation et de stabilité sur le long terme."
  }
};
