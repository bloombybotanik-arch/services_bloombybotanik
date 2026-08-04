import { Language } from './translations';

export interface CosmeticsRecipe {
  plant_id: string;
  nom_commun: string;
  type_produit: string;
  categorie: string;
  peau: string;
  age?: string;
  cible: string;
  solvants: {
    phase_A: { type: string; volume: string; role: string };
    phase_B: { type: string; volume: string; role: string };
  };
  plantes: {
    phase_A: { nom: string; partie: string; grammage: string; actifs: string };
    phase_B: { nom: string; partie: string; grammage: string; actifs: string };
  };
  parametres_bloomlab: {
    phase_A: { temp: string; temps: string; agitation: string };
    phase_B: { temp: string; temps: string; agitation: string };
  };
  recette_pas_a_pas: {
    batch_standard: string;
    ingredients: {
      phase_A: string[];
      phase_B: string[];
    };
    phase_A_instructions: string[];
    transition: string[];
    phase_B_instructions: string[];
    filtration_et_finition: string[];
  };
  conditionnement: string;
  mode_utilisation: string;
  synergies_kits_internes: string;
  conservation: string;
  precautions: string;
}

export const cosmeticsRecipesFR: CosmeticsRecipe[] = [
  {
    plant_id: "serum_reparateur_nuit",
    nom_commun: "Sérum Réparateur Nuit — Barrière Cutanée",
    type_produit: "Sérum visage huileux",
    categorie: "Visage",
    peau: "Sensible",
    cible: "Peaux sensibles, cicatrisation, réparation du microbiote cutané",
    solvants: {
      phase_A: { type: "Huile de Jojoba", volume: "500ml", role: "Base légère, non comédogène, cire liquide proche du sébum" },
      phase_B: { type: "Huile de Rosehip (Églantier)", volume: "250ml", role: "Riche en acide linoléique et vitamine A, régénération cellulaire" }
    },
    plantes: {
      phase_A: { nom: "Centella Asiatica", partie: "Feuilles séchées", grammage: "50g", actifs: "Asiaticoside, madécassoside (stimulation collagène)" },
      phase_B: { nom: "Calendula", partie: "Fleurs séchées", grammage: "25g", actifs: "Calendulosides, caroténoïdes (apaisement, barrière)" }
    },
    parametres_bloomlab: {
      phase_A: { temp: "45°C", temps: "3h00", agitation: "Douce" },
      phase_B: { temp: "40°C", temps: "2h00", agitation: "Très douce" }
    },
    recette_pas_a_pas: {
      batch_standard: "Cible BloomLab : 750ml de solvant + 75g de plantes (Rendement final estimé : ~600-650ml)",
      ingredients: {
        phase_A: ["500ml d'Huile de Jojoba bio", "50g de Centella Asiatica (feuilles séchées)"],
        phase_B: ["250ml d'Huile de Rosehip bio", "25g de Calendula (fleurs séchées)"]
      },
      phase_A_instructions: [
        "1. Versez les 500ml d'huile de Jojoba dans la cuve propre de la BloomLab.",
        "2. Ajoutez les 50g de Centella Asiatica.",
        "3. Fermez la cuve hermétiquement.",
        "4. Sélectionnez le mode manuel 'OIL'.",
        "5. Réglez TEMP 45°C, TEMPS 3h00.",
        "6. Appuyez sur START."
      ],
      transition: [
        "1. À la fin du bip, éteignez la machine.",
        "2. Laissez reposer 20 minutes.",
        "3. TEST SENSORIEL OBLIGATOIRE : Posez votre main à plat sur la paroi extérieure de la cuve. Elle doit être 'tiède au toucher' (environ 40°C), et non brûlante.",
        "4. ⚠️ SÉCURITÉ : Ne procédez à la Phase B que lorsque ce test est validé pour préserver les actifs thermolabiles du Rosehip."
      ],
      phase_B_instructions: [
        "1. Ouvrez la cuve. Versez délicatement les 250ml d'huile de Rosehip.",
        "2. Ajoutez les 25g de fleurs de Calendula.",
        "3. Refermez hermétiquement.",
        "4. Mode manuel 'OIL', TEMP 40°C, TEMPS 2h00.",
        "5. Appuyez sur START."
      ],
      filtration_et_finition: [
        "1. Laissez reposer 10 minutes.",
        "2. Filtrez TRÈS finement avec le sac filtre fournit, la préparation encore tiède. Pressez fermement le marc.",
        "3. Pressez fermement le marc pour extraire chaque goutte.",
        "4. FINITION COSMÉTIQUE : Ajoutez 15 à 20 gouttes de Vitamine E naturelle (Tocophérol) au mélange filtré pour empêcher l'oxydation.",
        "5. Mélangez doucement en faisant tourner le récipient."
      ]
    },
    conditionnement: "10 à 15 flacons compte-gouttes en verre ambré de 50ml. Conserver le stock au réfrigérateur.",
    mode_utilisation: "3 à 5 gouttes le soir on peau nettoyée et légèrement humide. Massage ascendant du visage et du cou.",
    synergies_kits_internes: "Kit Pureté Sanguine (réduction inflammation systémique) + Kit Mix Expert Peaux (cicatrisation accélérée)",
    conservation: "6 mois à l'abri de la lumière et de la chaleur. Réfrigérateur après ouverture.",
    precautions: "Test de tolérance sur le pli du coude 24h avant première utilisation. Éviter le contour de l'œil."
  },
  {
    plant_id: "elixir_croissance_capillaire",
    nom_commun: "Élixir de Croissance & Cuir Chevelu — Follicule Actif",
    type_produit: "Huile capillaire leave-on",
    categorie: "Cheveux",
    peau: "Toutes",
    age: "Tous",
    cible: "Chute de cheveux, cuir chevelu inflammé, pellicules, fortification de la tige",
    solvants: {
      phase_A: {type: "Huile de Jojoba", volume: "500ml", role: "Fluide, pénètre sans graisser, régule le sébum"},
      phase_B: {type: "Huile de Ricin (Castor Oil)", volume: "250ml", role: "Épaisse, fortifiante, stimule la pousse"}
    },
    plantes: {
      phase_A: {nom: "Romarin à Cinéole", partie: "Feuilles séchées", grammage: "50g", actifs: "Acide rosmarinique, cinéole (stimulation microcirculation, inhibition 5-alpha-réductase)"},
      phase_B: {nom: "Ortie", partie: "Racine séchée concassée", grammage: "25g", actifs: "Phytostérols, silice (régulation hormonale, fortification)"}
    },
    parametres_bloomlab: {
      phase_A: {temp: "50°C", temps: "3h00", agitation: "Moyenne"},
      phase_B: {temp: "45°C", temps: "3h00", agitation: "Douce"}
    },
    recette_pas_a_pas: {
      batch_standard: "Cible BloomLab : 750ml de solvant + 75g de plantes (Rendement final estimé : ~600-650ml)",
      ingredients: {
        phase_A: ["500ml d'Huile de Jojoba bio", "50g de Romarin à Cinéole (feuilles séchées)"],
        phase_B: ["250ml d'Huile de Ricin bio", "25g de Racine d'Ortie (concassée)"]
      },
      phase_A_instructions: [
        "1. Versez les 500ml d'huile de Jojoba dans la cuve.",
        "2. Ajoutez les 50g de Romarin.",
        "3. Fermez, mode manuel 'OIL', TEMP 50°C, TEMPS 3h00.",
        "4. START."
      ],
      transition: [
        "1. Éteignez. Laissez reposer 20 minutes.",
        "2. TEST SENSORIEL OBLIGATOIRE : La cuve doit être tiède au toucher (~40°C).",
        "3. ⚠️ SÉCURITÉ : Attendez que la température soit correcte avant d'ajouter l'huile de Ricin."
      ],
      phase_B_instructions: [
        "1. Ouvrez, versez les 250ml d'huile de Ricin.",
        "2. Ajoutez les 25g de racine d'Ortie concassée.",
        "3. Fermez, mode manuel 'OIL', TEMP 45°C, TEMPS 3h00.",
        "4. START."
      ],
      filtration_et_finition: [
        "1. Filtrez à l'étamine. La racine d'ortie absorbe beaucoup, pressez fermement.",
        "2. FINITION COSMÉTIQUE : Ajoutez 20 gouttes de Vitamine E.",
        "3. Mélangez doucement."
      ]
    },
    conditionnement: "Flacons de 100ml avec embout applicateur (pour appliquer directement sur le cuir chevelu). Le format 750ml permet de traiter toute la famille ou de faire des cures de 3 mois.",
    mode_utilisation: "2 à 3 fois par semaine. Appliquer 10-15 gouttes directement sur le cuir chevelu, masser 2 minutes en mouvements circulaires. Laisser poser 30 minutes minimum (ou toute la nuit) avant lavage.",
    synergies_kits_internes: "Kit Renaissance (drainage hépatique = réduction DHT) + Kit Pureté Sanguine (réduction inflammation cuir chevelu)",
    conservation: "6 mois à température ambiante, à l'abri de la lumière.",
    precautions: "Éviter le contact avec les yeux. Peut tacher les taies d'oreiller claires (utiliser une serviette)."
  }
];

export const cosmeticsRecipesEN: CosmeticsRecipe[] = [
  {
    plant_id: "serum_reparateur_nuit",
    nom_commun: "Night Repair Serum — Skin Barrier",
    type_produit: "Oily face serum",
    categorie: "Face",
    peau: "Sensitive",
    cible: "Sensitive skin, healing, skin microbiota repair",
    solvants: {
      phase_A: { type: "Jojoba Oil", volume: "500ml", role: "Lightweight, non-comedogenic, liquid wax similar to sebum" },
      phase_B: { type: "Rosehip Oil", volume: "250ml", role: "Rich in linoleic acid and vitamin A, cellular regeneration" }
    },
    plantes: {
      phase_A: { nom: "Centella Asiatica", partie: "Dried leaves", grammage: "50g", actifs: "Asiaticoside, madecassoside (collagen stimulation)" },
      phase_B: { nom: "Calendula", partie: "Dried flowers", grammage: "25g", actifs: "Calendulosides, carotenoids (soothing, barrier)" }
    },
    parametres_bloomlab: {
      phase_A: { temp: "45°C", temps: "3h00", agitation: "Gentle" },
      phase_B: { temp: "40°C", temps: "2h00", agitation: "Very gentle" }
    },
    recette_pas_a_pas: {
      batch_standard: "BloomLab Target: 750ml solvent + 75g plants (Estimated final yield: ~600-650ml)",
      ingredients: {
        phase_A: ["500ml Organic Jojoba Oil", "50g Centella Asiatica (dried leaves)"],
        phase_B: ["250ml Organic Rosehip Oil", "25g Calendula (dried flowers)"]
      },
      phase_A_instructions: [
        "1. Pour 500ml of Jojoba oil into the clean BloomLab tank.",
        "2. Add 50g of Centella Asiatica.",
        "3. Close the tank hermetically.",
        "4. Select 'OIL' manual mode.",
        "5. Set TEMP 45°C, TIME 3h00.",
        "6. Press START."
      ],
      transition: [
        "1. At the end of the beep, turn off the machine.",
        "2. Let it rest for 20 minutes.",
        "3. MANDATORY SENSORY TEST: Place your hand flat on the outer wall of the tank. It should be 'warm to the touch' (about 40°C), not burning.",
        "4. ⚠️ SAFETY: Do not proceed to Phase B until this test is validated to preserve Rosehip's heat-sensitive actives."
      ],
      phase_B_instructions: [
        "1. Open the tank. Gently pour in 250ml of Rosehip oil.",
        "2. Add 25g of Calendula flowers.",
        "3. Close hermetically.",
        "4. Manual 'OIL' mode, TEMP 40°C, TIME 2h00.",
        "5. Press START."
      ],
      filtration_et_finition: [
        "1. Let it rest for 10 minutes.",
        "2. Filter VERY finely with the provided filter bag while the preparation is still warm.",
        "3. Press the marc firmly to extract every drop.",
        "4. COSMETIC FINISH: Add 15 to 20 drops of natural Vitamin E (Tocopherol) to the filtered mixture to prevent oxidation.",
        "5. Mix gently by swirling the container."
      ]
    },
    conditionnement: "10 to 15 amber glass dropper bottles of 50ml. Store in the refrigerator.",
    mode_utilisation: "3 to 5 drops in the evening on cleansed and slightly damp skin. Upward massage of the face and neck.",
    synergies_kits_internes: "Blood Purity Kit (systemic inflammation reduction) + Expert Skin Mix Kit (accelerated healing)",
    conservation: "6 months protected from light and heat. Refrigerate after opening.",
    precautions: "Tolerance test on the elbow fold 24h before first use. Avoid the eye area."
  },
  {
    plant_id: "elixir_croissance_capillaire",
    nom_commun: "Growth & Scalp Elixir — Active Follicle",
    type_produit: "Leave-on hair oil",
    categorie: "Hair",
    peau: "All",
    age: "All",
    cible: "Hair loss, inflamed scalp, dandruff, hair shaft fortification",
    solvants: {
      phase_A: {type: "Jojoba Oil", volume: "500ml", role: "Fluid, penetrates without greasing, regulates sebum"},
      phase_B: {type: "Castor Oil", volume: "250ml", role: "Thick, fortifying, stimulates growth"}
    },
    plantes: {
      phase_A: {nom: "Rosemary Cineole", partie: "Dried leaves", grammage: "50g", actifs: "Rosmarinic acid, cineole (microcirculation stimulation)"},
      phase_B: {nom: "Nettle", partie: "Crushed dried root", grammage: "25g", actifs: "Phytosterols, silica (hormonal regulation, fortification)"}
    },
    parametres_bloomlab: {
      phase_A: {temp: "50°C", temps: "3h00", agitation: "Medium"},
      phase_B: {temp: "45°C", temps: "3h00", agitation: "Gentle"}
    },
    recette_pas_a_pas: {
      batch_standard: "BloomLab Target: 750ml solvent + 75g plants (Estimated final yield: ~600-650ml)",
      ingredients: {
        phase_A: ["500ml Organic Jojoba Oil", "50g Rosemary Cineole (dried leaves)"],
        phase_B: ["250ml Organic Castor Oil", "25g Nettle Root (crushed)"]
      },
      phase_A_instructions: [
        "1. Pour 500ml of Jojoba oil into the tank.",
        "2. Add 50g of Rosemary.",
        "3. Close, manual 'OIL' mode, TEMP 50°C, TIME 3h00.",
        "4. START."
      ],
      transition: [
        "1. Turn off. Let it rest for 20 minutes.",
        "2. MANDATORY SENSORY TEST: The tank should be warm to the touch (~40°C).",
        "3. ⚠️ SAFETY: Wait until the temperature is correct before adding Castor oil."
      ],
      phase_B_instructions: [
        "1. Open, pour in 250ml of Castor oil.",
        "2. Add 25g of crushed Nettle root.",
        "3. Close, manual 'OIL' mode, TEMP 45°C, TIME 3h00.",
        "4. START."
      ],
      filtration_et_finition: [
        "1. Filter with cheesecloth. Nettle root absorbs a lot, press firmly.",
        "2. COSMETIC FINISH: Add 20 drops of Vitamin E.",
        "3. Mix gently."
      ]
    },
    conditionnement: "100ml bottles with applicator tip. The 750ml format allows treating the whole family or 3-month courses.",
    mode_utilisation: "2 to 3 times per week. Apply 10-15 drops directly to the scalp, massage for 2 minutes in circular motions. Leave for at least 30 minutes (or overnight) before washing.",
    synergies_kits_internes: "Renaissance Kit (hepatic drainage) + Blood Purity Kit (scalp inflammation reduction)",
    conservation: "6 months at room temperature, away from light.",
    precautions: "Avoid contact with eyes. May stain light-colored pillowcases (use a towel)."
  }
];

export const cosmeticsRecipesDE: CosmeticsRecipe[] = [
  {
    plant_id: "serum_reparateur_nuit",
    nom_commun: "Nacht-Reparatur-Serum — Hautbarriere",
    type_produit: "Öliges Gesichtsserum",
    categorie: "Gesicht",
    peau: "Empfindlich",
    cible: "Empfindliche Haut, Heilung, Reparatur der Hautmikrobiota",
    solvants: {
      phase_A: { type: "Jojobaöl", volume: "500ml", role: "Leicht, nicht komedogen, talgähnliches flüssiges Wachs" },
      phase_B: { type: "Wildrosenöl (Hagebutte)", volume: "250ml", role: "Reich an Linolsäure und Vitamin A, Zellregeneration" }
    },
    plantes: {
      phase_A: { nom: "Centella Asiatica", partie: "Getrocknete Blätter", grammage: "50g", actifs: "Asiaticosid, Madecassosid (Kollagenstimulation)" },
      phase_B: { nom: "Calendula", partie: "Getrocknete Blüten", grammage: "25g", actifs: "Calenduloside, Carotinoide (Beruhigung, Barriere)" }
    },
    parametres_bloomlab: {
      phase_A: { temp: "45°C", temps: "3h00", agitation: "Sanft" },
      phase_B: { temp: "40°C", temps: "2h00", agitation: "Sehr sanft" }
    },
    recette_pas_a_pas: {
      batch_standard: "BloomLab Ziel: 750ml Lösungsmittel + 75g Pflanzen (Geschätzte Endausbeute: ~600-650ml)",
      ingredients: {
        phase_A: ["500ml Bio-Jojobaöl", "50g Centella Asiatica (getrocknete Blätter)"],
        phase_B: ["250ml Bio-Wildrosenöl", "25g Calendula (getrocknete Blüten)"]
      },
      phase_A_instructions: [
        "1. Gießen Sie 500ml Jojobaöl in den sauberen BloomLab-Tank.",
        "2. Fügen Sie 50g Centella Asiatica hinzu.",
        "3. Schließen Sie den Tank hermetisch.",
        "4. Wählen Sie den manuellen Modus 'OIL'.",
        "5. Stellen Sie TEMP 45°C, ZEIT 3h00 ein.",
        "6. Drücken Sie START."
      ],
      transition: [
        "1. Schalten Sie die Maschine am Ende des Signaltons aus.",
        "2. 20 Minuten ruhen lassen.",
        "3. OBLIGATORISCHER SENSORISCHER TEST: Legen Sie Ihre Hand flach auf die Außenwand des Tanks. Sie sollte sich 'warm anfühlen' (ca. 40°C), nicht brennend.",
        "4. ⚠️ SICHERHEIT: Fahren Sie erst mit Phase B fort, wenn dieser Test bestanden ist, um die hitzeempfindlichen Wirkstoffe der Hagebutte zu schützen."
      ],
      phase_B_instructions: [
        "1. Öffnen Sie den Tank. Gießen Sie vorsichtig 250ml Wildrosenöl ein.",
        "2. Fügen Sie 25g Calendula-Blüten hinzu.",
        "3. Hermetisch schließen.",
        "4. Manueller 'OIL'-Modus, TEMP 40°C, ZEIT 2h00.",
        "5. Drücken Sie START."
      ],
      filtration_et_finition: [
        "1. 10 Minuten ruhen lassen.",
        "2. SEHR fein mit dem mitgelieferten Filterbeutel filtern, solange die Zubereitung noch warm ist.",
        "3. Den Trester fest auspressen, um jeden Tropfen zu gewinnen.",
        "4. KOSMETISCHES FINISH: 15 bis 20 Tropfen natürliches Vitamin E (Tocopherol) zur gefilterten Mischung hinzufügen, um Oxidation zu verhindern.",
        "5. Durch Schwenken des Behälters vorsichtig mischen."
      ]
    },
    conditionnement: "10 bis 15 Braunglas-Tropfflaschen à 50ml. Im Kühlschrank lagern.",
    mode_utilisation: "3 bis 5 Tropfen abends auf die gereinigte und leicht feuchte Haut. Aufsteigende Massage von Gesicht und Hals.",
    synergies_kits_internes: "Blutreinheits-Kit (Reduzierung systemischer Entzündungen) + Experten-Haut-Mix-Kit (beschleunigte Heilung)",
    conservation: "6 Monate vor Licht und Hitze geschützt. Nach dem Öffnen im Kühlschrank lagern.",
    precautions: "Verträglichkeitstest in der Armbeuge 24h vor der ersten Anwendung. Augenpartie aussparen."
  },
  {
    plant_id: "elixir_croissance_capillaire",
    nom_commun: "Wachstums- & Kopfhaut-Elixier — Aktiver Follikel",
    type_produit: "Leave-on Haaröl",
    categorie: "Haare",
    peau: "Alle",
    age: "Alle",
    cible: "Haarausfall, entzündete Kopfhaut, Schuppen, Stärkung des Haarschafts",
    solvants: {
      phase_A: {type: "Jojobaöl", volume: "500ml", role: "Flüssig, zieht ein ohne zu fetten, reguliert Talg"},
      phase_B: {type: "Rizinusöl", volume: "250ml", role: "Dickflüssig, stärkend, stimuliert das Wachstum"}
    },
    plantes: {
      phase_A: {nom: "Rosmarin Cineol", partie: "Getrocknete Blätter", grammage: "50g", actifs: "Rosmarinsäure, Cineol (Mikrozirkulationsstimulation)"},
      phase_B: {nom: "Brennnessel", partie: "Zerkleinerte getrocknete Wurzel", grammage: "25g", actifs: "Phytosterole, Kieselsäure (Hormonregulation, Stärkung)"}
    },
    parametres_bloomlab: {
      phase_A: {temp: "50°C", temps: "3h00", agitation: "Mittel"},
      phase_B: {temp: "45°C", temps: "3h00", agitation: "Sanft"}
    },
    recette_pas_a_pas: {
      batch_standard: "BloomLab Ziel: 750ml Lösungsmittel + 75g Pflanzen (Geschätzte Endausbeute: ~600-650ml)",
      ingredients: {
        phase_A: ["500ml Bio-Jojobaöl", "50g Rosmarin Cineol (getrocknete Blätter)"],
        phase_B: ["250ml Bio-Rizinusöl", "25g Brennnesselwurzel (zerkleinert)"]
      },
      phase_A_instructions: [
        "1. Gießen Sie 500ml Jojobaöl in den Tank.",
        "2. Fügen Sie 50g Rosmarin hinzu.",
        "3. Schließen, manueller 'OIL'-Modus, TEMP 50°C, ZEIT 3h00.",
        "4. START."
      ],
      transition: [
        "1. Ausschalten. 20 Minuten ruhen lassen.",
        "2. OBLIGATORISCHER SENSORISCHER TEST: Der Tank sollte sich warm anfühlen (~40°C).",
        "3. ⚠️ SICHERHEIT: Warten Sie, bis die Temperatur korrekt ist, bevor Sie Rizinusöl hinzufügen."
      ],
      phase_B_instructions: [
        "1. Öffnen, 250ml Rizinusöl eingießen.",
        "2. Fügen Sie 25g zerkleinerte Brennnesselwurzel hinzu.",
        "3. Schließen, manueller 'OIL'-Modus, TEMP 45°C, ZEIT 3h00.",
        "4. START."
      ],
      filtration_et_finition: [
        "1. Mit Seihtuch filtern. Brennnesselwurzel absorbiert viel, fest drücken.",
        "2. KOSMETISCHES FINISH: 20 Tropfen Vitamin E hinzufügen.",
        "3. Vorsichtig mischen."
      ]
    },
    conditionnement: "100ml Flaschen mit Applikatorspitze. Das 750ml Format ermöglicht die Behandlung der ganzen Familie oder 3-Monats-Kuren.",
    mode_utilisation: "2 bis 3 Mal pro Woche. 10-15 Tropfen direkt auf die Kopfhaut auftragen, 2 Minuten in kreisenden Bewegungen einmassieren. Vor dem Waschen mindestens 30 Minuten (oder über Nacht) einwirken lassen.",
    synergies_kits_internes: "Renaissance-Kit (Leberdrainage) + Blutreinheits-Kit (Reduzierung von Kopfhautentzündungen)",
    conservation: "6 Monate bei Raumtemperatur, vor Licht geschützt.",
    precautions: "Augenkontakt vermeiden. Kann helle Kissenbezüge verfärben (Handtuch verwenden)."
  }
];

export const getCosmeticsRecipes = (lang: Language): CosmeticsRecipe[] => {
  switch (lang) {
    case 'en': return cosmeticsRecipesEN;
    case 'de': return cosmeticsRecipesDE;
    default: return cosmeticsRecipesFR;
  }
};

export const cosmeticsRecipes = cosmeticsRecipesFR;
