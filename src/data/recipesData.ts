import { PlantSource } from './unifiedBotanicalData';

export interface Recipe {
  id: string;
  title: string;
  goal: string;
  plant: {
    name: string;
    part: string;
    sachet_weight_g: number;
    sachet_count: number;
    total_plant_mass_g: number;
  };
  solvent: {
    type: string;
    volume_ml?: number;
    water_volume_ml?: number;
    ethanol_volume_ml?: number;
    ethanol_percent_final?: number;
    notes: string;
  };
  process: {
    method: string;
    temperature_c: number;
    time_min: number;
    steps: string[];
  };
  use: {
    duration_hours: number;
    servings: {
      time: string;
      volume_ml: number;
    }[];
    notes: string;
  };
  storage: {
    fridge: boolean;
    max_hours: number;
    absolute_max_hours: number;
    notes: string;
  };
  cta: {
    label: string;
    href: string;
  };
}

export const herbariumRecipes: Recipe[] = [
  {
    "id": "artichaut-classique-750ml",
    "title": "Artichaut classique 750 ml",
    "goal": "Extraire un concentré polyphénolique doux pour soutien hépatique quotidien.",
    "plant": {
      "name": "Artichaut",
      "part": "feuilles sèches en sachets",
      "sachet_weight_g": 2.46,
      "sachet_count": 10,
      "total_plant_mass_g": 24.6
    },
    "solvent": {
      "type": "water",
      "volume_ml": 750,
      "notes": "Eau filtrée ou eau faiblement minéralisée."
    },
    "process": {
      "method": "infusion_decoction_douce",
      "temperature_c": 60,
      "time_min": 90,
      "steps": [
        "Ouvrir les sachets et verser le contenu dans la cuve.",
        "Ajouter 750 ml d'eau.",
        "Chauffer à 60 °C pendant 90 minutes.",
        "Filtrer à chaud.",
        "Refroidir rapidement et conserver au réfrigérateur."
      ]
    },
    "use": {
      "duration_hours": 24,
      "servings": [
        {
          "time": "matin",
          "volume_ml": 190
        },
        {
          "time": "midi",
          "volume_ml": 190
        },
        {
          "time": "apres-midi",
          "volume_ml": 190
        },
        {
          "time": "fin_d_apres_midi",
          "volume_ml": 190
        }
      ],
      "notes": "Boire sur la journée pour répartir la charge polyphénolique et soutenir le foie de manière progressive."
    },
    "storage": {
      "fridge": true,
      "max_hours": 24,
      "absolute_max_hours": 48,
      "notes": "Conserver dans un récipient propre et fermé. Jeter si odeur, couleur ou aspect changent."
    },
    "cta": {
      "label": "Utiliser cette recette dans le Reset Homéostasique",
      "href": "/reset-homeostasique"
    }
  },
  {
    "id": "artichaut-intense-750ml",
    "title": "Artichaut intense 750 ml",
    "goal": "Extraire un concentré plus riche en polyphénols avec une intensité supérieure.",
    "plant": {
      "name": "Artichaut",
      "part": "feuilles sèches en sachets",
      "sachet_weight_g": 2.46,
      "sachet_count": 10,
      "total_plant_mass_g": 24.6
    },
    "solvent": {
      "type": "water_ethanol",
      "water_volume_ml": 550,
      "ethanol_volume_ml": 200,
      "ethanol_percent_final": 25,
      "notes": "Éthanol alimentaire dilué avant usage."
    },
    "process": {
      "method": "infusion_renforcee",
      "temperature_c": 70,
      "time_min": 60,
      "steps": [
        "Ouvrir les sachets et verser le contenu dans la cuve.",
        "Ajouter le mélange eau-éthanol.",
        "Chauffer à 70 °C pendant 60 minutes.",
        "Filtrer à chaud.",
        "Refroidir puis conserver au réfrigérateur."
      ]
    },
    "use": {
      "duration_hours": 24,
      "servings": [
        {
          "time": "matin",
          "volume_ml": 180
        },
        {
          "time": "midi",
          "volume_ml": 180
        },
        {
          "time": "apres-midi",
          "volume_ml": 180
        },
        {
          "time": "fin_d_apres_midi",
          "volume_ml": 180
        }
      ],
      "notes": "Version plus active, à utiliser si la tolérance digestive est bonne."
    },
    "storage": {
      "fridge": true,
      "max_hours": 24,
      "absolute_max_hours": 48,
      "notes": "Mêmes règles de conservation que l'infusion classique."
    },
    "cta": {
      "label": "Utiliser cette recette dans le Reset Homéostasique",
      "href": "/reset-homeostasique"
    }
  },
  {
    "id": "artichaut-citron-750ml",
    "title": "Artichaut + citron 750 ml",
    "goal": "Stabiliser légèrement l'infusion grâce à l'acidification et améliorer la tolérance.",
    "plant": {
      "name": "Artichaut",
      "part": "feuilles sèches en sachets",
      "sachet_weight_g": 2.46,
      "sachet_count": 10,
      "total_plant_mass_g": 24.6
    },
    "solvent": {
      "type": "water",
      "volume_ml": 750,
      "notes": "Citron ajouté après extraction, jamais pendant la chauffe."
    },
    "process": {
      "method": "infusion_acidifiee",
      "temperature_c": 60,
      "time_min": 90,
      "steps": [
        "Faire l'infusion classique à 60 °C pendant 90 minutes.",
        "Filtrer à chaud.",
        "Laisser refroidir légèrement.",
        "Ajouter le citron après extraction.",
        "Conserver immédiatement au réfrigérateur."
      ]
    },
    "use": {
      "duration_hours": 24,
      "servings": [
        {
          "time": "matin",
          "volume_ml": 190
        },
        {
          "time": "midi",
          "volume_ml": 190
        },
        {
          "time": "apres-midi",
          "volume_ml": 190
        },
        {
          "time": "fin_d_apres_midi",
          "volume_ml": 190
        }
      ],
      "notes": "Ajout de citron modéré : environ 1/2 citron pour 750 ml."
    },
    "storage": {
      "fridge": true,
      "max_hours": 24,
      "absolute_max_hours": 48,
      "notes": "Le citron améliore un peu la stabilité mais ne remplace pas le froid."
    },
    "cta": {
      "label": "Utiliser cette recette dans le Reset Homéostasique",
      "href": "/reset-homeostasique"
    }
  },
  {
    "id": "artichaut-base-quotidienne-24h",
    "title": "Artichaut base quotidienne 24 h",
    "goal": "Protocole simple pour consommation journalière régulière.",
    "plant": {
      "name": "Artichaut",
      "part": "feuilles sèches en sachets",
      "sachet_weight_g": 2.46,
      "sachet_count": 10,
      "total_plant_mass_g": 24.6
    },
    "solvent": {
      "type": "water",
      "volume_ml": 750,
      "notes": "Version la plus simple et la plus sûre pour un usage quotidien."
    },
    "process": {
      "method": "infusion_standard",
      "temperature_c": 60,
      "time_min": 90,
      "steps": [
        "Placer 10 sachets ouverts dans 750 ml d'eau.",
        "Chauffer à 60 °C pendant 90 minutes.",
        "Filtrer.",
        "Refroidir.",
        "Boire dans la journée."
      ]
    },
    "use": {
      "duration_hours": 24,
      "servings": [
        {
          "time": "matin",
          "volume_ml": 125
        },
        {
          "time": "milieu_de_matinee",
          "volume_ml": 125
        },
        {
          "time": "midi",
          "volume_ml": 125
        },
        {
          "time": "apres-midi",
          "volume_ml": 125
        },
        {
          "time": "fin_d_apres_midi",
          "volume_ml": 125
        },
        {
          "time": "soir_tot",
          "volume_ml": 125
        }
      ],
      "notes": "Fractionner la prise aide à répartir l'effet sur le foie et le confort digestif."
    },
    "storage": {
      "fridge": true,
      "max_hours": 24,
      "absolute_max_hours": 48,
      "notes": "Au-delà de 24 h, la qualité baisse; au-delà de 48 h, ne pas consommer."
    },
    "cta": {
      "label": "Utiliser cette recette dans le Reset Homéostasique",
      "href": "/reset-homeostasique"
    }
  }
];
