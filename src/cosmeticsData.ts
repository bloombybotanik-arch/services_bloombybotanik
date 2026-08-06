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
  },
  {
    plant_id: "huile_corps_drainante",
    nom_commun: "Huile Corps Drainante & Fermeté — Silhouette",
    type_produit: "Huile de massage corps",
    categorie: "Corps",
    peau: "Toutes",
    cible: "Cellulite, rétention d'eau, fermeté cutanée, drainage lymphatique",
    solvants: {
      phase_A: { type: "Huile de Sésame", volume: "500ml", role: "Pénétrante, chauffante, active la circulation" },
      phase_B: { type: "Huile de Macadamia", volume: "250ml", role: "Facilite le massage, circulatoire, nourrissante" }
    },
    plantes: {
      phase_A: { nom: "Lierre Grimpant", partie: "Feuilles séchées", grammage: "40g", actifs: "Saponines (drainage), flavonoïdes (fermeté)" },
      phase_B: { nom: "Genièvre", partie: "Baies concassées", grammage: "20g", actifs: "Terpènes (élimination), antioxydants" }
    },
    parametres_bloomlab: {
      phase_A: { temp: "55°C", temps: "4h00", agitation: "Moyenne" },
      phase_B: { temp: "45°C", temps: "2h00", agitation: "Douce" }
    },
    recette_pas_a_pas: {
      batch_standard: "Cible BloomLab : 750ml de solvant + 60g de plantes",
      ingredients: {
        phase_A: ["500ml d'Huile de Sésame bio", "40g de Lierre Grimpant (feuilles)"],
        phase_B: ["250ml d'Huile de Macadamia bio", "20g de Baies de Genièvre (concassées)"]
      },
      phase_A_instructions: [
        "1. Versez l'huile de Sésame dans la cuve.",
        "2. Ajoutez le Lierre Grimpant.",
        "3. Mode 'OIL', 55°C, 4h00. START."
      ],
      transition: [
        "1. Laissez refroidir jusqu'à 45°C."
      ],
      phase_B_instructions: [
        "1. Ajoutez l'huile de Macadamia et le Genièvre.",
        "2. Mode 'OIL', 45°C, 2h00. START."
      ],
      filtration_et_finition: [
        "1. Filtrez à chaud.",
        "2. Ajoutez 20 gouttes de Vitamine E."
      ]
    },
    conditionnement: "Flacons pompe en verre de 100ml.",
    mode_utilisation: "Massage quotidien après la douche sur peau humide. Mouvements circulaires et palper-rouler.",
    synergies_kits_internes: "Kit Renaissance (Drainage profond) + Kit Pureté Sanguine",
    conservation: "12 mois.",
    precautions: "Éviter pendant la grossesse et l'allaitement (Genièvre)."
  },
  {
    plant_id: "nettoyant_botanique_doux",
    nom_commun: "Huile Nettoyante Botanique — Pureté Douce",
    type_produit: "Huile lavante / Démaquillant",
    categorie: "Visage",
    peau: "Sensible / Sèche",
    cible: "Nettoyage profond, démaquillage, respect du film hydrolipidique",
    solvants: {
      phase_A: { type: "Huile de Tournesol Oléique", volume: "600ml", role: "Base nettoyante stable et douce" },
      phase_B: { type: "Huile d'Amande Douce", volume: "150ml", role: "Apaisante, adoucissante" }
    },
    plantes: {
      phase_A: { nom: "Lavande Vraie", partie: "Sommités fleuries", grammage: "30g", actifs: "Linalol (apaisant, purifiant)" },
      phase_B: { nom: "Camomille Matricaire", partie: "Fleurs", grammage: "20g", actifs: "Chamazulène (anti-inflammatoire)" }
    },
    parametres_bloomlab: {
      phase_A: { temp: "40°C", temps: "2h00", agitation: "Douce" },
      phase_B: { temp: "35°C", temps: "2h00", agitation: "Très douce" }
    },
    recette_pas_a_pas: {
      batch_standard: "Cible BloomLab : 750ml",
      ingredients: {
        phase_A: ["600ml d'Huile de Tournesol bio", "30g de Lavande"],
        phase_B: ["150ml d'Huile d'Amande Douce", "20g de Camomille"]
      },
      phase_A_instructions: ["1. Cuve : Tournesol + Lavande. Mode OIL, 40°C, 2h00."],
      transition: ["1. Refroidissement passif 15 min."],
      phase_B_instructions: ["1. Ajout Amande + Camomille. Mode OIL, 35°C, 2h00."],
      filtration_et_finition: ["1. Filtration fine.", "2. Ajout Vitamine E."]
    },
    conditionnement: "Flacon pompe 100ml ou 200ml.",
    mode_utilisation: "Appliquer sur visage sec, masser, puis rincer à l'eau tiède.",
    synergies_kits_internes: "Kit Mix Expert Peaux",
    conservation: "9 mois.",
    precautions: "Aucune particulière."
  },
  {
    plant_id: "masque_eclat_hibiscus",
    nom_commun: "Masque Éclat & Jeunesse — Hibiscus & Rose",
    type_produit: "Masque huileux / Soin minute",
    categorie: "Visage",
    peau: "Toutes / Teint terne",
    cible: "Éclat du teint, antioxydant, lissage des ridules",
    solvants: {
      phase_A: { type: "Huile de Noyau d'Abricot", volume: "400ml", role: "Effet bonne mine, illuminatrice" },
      phase_B: { type: "Huile de Rose Musquée", volume: "200ml", role: "Régénérante, cicatrisante" }
    },
    plantes: {
      phase_A: { nom: "Hibiscus (Fleurs)", partie: "Calices séchés", grammage: "30g", actifs: "Anthocyanes, acides de fruits (éclat, peeling doux)" },
      phase_B: { nom: "Rose de Damas", partie: "Pétales séchés", grammage: "15g", actifs: "Alcools monoterpéniques (tonifiant, parfum)" }
    },
    parametres_bloomlab: {
      phase_A: { temp: "45°C", temps: "2h00", agitation: "Moyenne" },
      phase_B: { temp: "35°C", temps: "1h30", agitation: "Douce" }
    },
    recette_pas_a_pas: {
      batch_standard: "Cible BloomLab : 600ml",
      ingredients: {
        phase_A: ["400ml d'Huile de Noyau d'Abricot", "30g d'Hibiscus"],
        phase_B: ["200ml d'Huile de Rose Musquée", "15g de Rose"]
      },
      phase_A_instructions: ["1. Abricot + Hibiscus. Mode OIL, 45°C, 2h00."],
      transition: ["1. Vérifier la température (inférieure à 40°C)."],
      phase_B_instructions: ["1. Rose Musquée + Rose. Mode OIL, 35°C, 1h30."],
      filtration_et_finition: ["1. Filtration très fine.", "2. Ajout Vitamine E."]
    },
    conditionnement: "Pot en verre ou flacon pompe.",
    mode_utilisation: "Appliquer en couche épaisse, laisser poser 15 min, masser puis rincer ou éponger.",
    synergies_kits_internes: "Kit Pureté Sanguine",
    conservation: "6 mois.",
    precautions: "Coloration naturelle intense (Hibiscus), peut tacher les tissus."
  },
  {
    plant_id: "huile_massage_recuperation",
    nom_commun: "Huile de Massage Récupération — Sport & Muscle",
    type_produit: "Huile de massage thérapeutique",
    categorie: "Corps",
    peau: "Toutes",
    cible: "Douleurs musculaires, récupération après effort, drainage des toxines",
    solvants: {
      phase_A: { type: "Huile d'Arnica (Macérat)", volume: "500ml", role: "Anti-inflammatoire, réduit les ecchymoses" },
      phase_B: { type: "Huile de Calophylle", volume: "250ml", role: "Tonique circulatoire, réparatrice" }
    },
    plantes: {
      phase_A: { nom: "Arnica (Fleurs)", partie: "Fleurs séchées", grammage: "40g", actifs: "Hélénaline (anti-inflammatoire)" },
      phase_B: { nom: "Hélichryse Italienne", partie: "Sommités fleuries", grammage: "20g", actifs: "Italidiones (anti-hématome)" }
    },
    parametres_bloomlab: {
      phase_A: { temp: "50°C", temps: "3h00", agitation: "Moyenne" },
      phase_B: { temp: "40°C", temps: "2h00", agitation: "Douce" }
    },
    recette_pas_a_pas: {
      batch_standard: "Cible BloomLab : 750ml",
      ingredients: {
        phase_A: ["500ml de Macérat d'Arnica bio", "40g de Fleurs d'Arnica"],
        phase_B: ["250ml d'Huile de Calophylle bio", "20g d'Hélichryse Italienne"]
      },
      phase_A_instructions: ["1. Versez l'Arnica et les fleurs. Mode OIL, 50°C, 3h00."],
      transition: ["1. Refroidissement passif 30 min."],
      phase_B_instructions: ["1. Ajoutez Calophylle et Hélichryse. Mode OIL, 40°C, 2h00."],
      filtration_et_finition: ["1. Filtration fine.", "2. Ajout Vitamine E."]
    },
    conditionnement: "Flacon en verre ambré 100ml.",
    mode_utilisation: "Appliquer sur les zones sollicitées après l'effort. Massage profond.",
    synergies_kits_internes: "Kit Reset Homéostasique",
    conservation: "12 mois.",
    precautions: "Ne pas appliquer sur les plaies ouvertes."
  },
  {
    plant_id: "serum_anti_imperfections",
    nom_commun: "Sérum Anti-Imperfections — Bardane & Purifié",
    type_produit: "Sérum visage ciblé",
    categorie: "Visage",
    peau: "Grasse / Acnéique",
    cible: "Excès de sébum, imperfections, pores dilatés",
    solvants: {
      phase_A: { type: "Huile de Noisette", volume: "400ml", role: "Régulatrice, fini sec" },
      phase_B: { type: "Huile de Nigelle", volume: "200ml", role: "Purifiante, anti-bactérienne" }
    },
    plantes: {
      phase_A: { nom: "Bardane", partie: "Racine", grammage: "30g", actifs: "Inuline, polyacétylènes" },
      phase_B: { nom: "Pensée Sauvage", partie: "Parties aériennes", grammage: "20g", actifs: "Acide salicylique naturel" }
    },
    parametres_bloomlab: {
      phase_A: { temp: "55°C", temps: "3h00", agitation: "Moyenne" },
      phase_B: { temp: "45°C", temps: "2h00", agitation: "Douce" }
    },
    recette_pas_a_pas: {
      batch_standard: "Cible BloomLab : 600ml",
      ingredients: {
        phase_A: ["400ml Huile de Noisette", "30g Racine de Bardane"],
        phase_B: ["200ml Huile de Nigelle", "20g Pensée Sauvage"]
      },
      phase_A_instructions: ["1. Noisette + Bardane. Mode OIL, 55°C, 3h00."],
      transition: ["1. Laissez refroidir."],
      phase_B_instructions: ["1. Nigelle + Pensée Sauvage. Mode OIL, 45°C, 2h00."],
      filtration_et_finition: ["1. Filtration très fine.", "2. Ajout Vitamine E."]
    },
    conditionnement: "Flacon pipette 30ml.",
    mode_utilisation: "Le soir, sur peau propre. 2-3 gouttes sur les zones à problèmes.",
    synergies_kits_internes: "Kit Pureté Sanguine",
    conservation: "6 mois.",
    precautions: "Éviter le contour des yeux."
  },
  {
    plant_id: "elixir_regard_frais",
    nom_commun: "Élixir Regard Frais — Contour des Yeux",
    type_produit: "Sérum contour des yeux",
    categorie: "Visage",
    peau: "Toutes",
    cible: "Cernes, poches, ridules de déshydratation",
    solvants: {
      phase_A: { type: "Huile de Calophylle", volume: "200ml", role: "Décongestionnante" },
      phase_B: { type: "Huile d'Avocat", volume: "200ml", role: "Nourrissante, protectrice" }
    },
    plantes: {
      phase_A: { nom: "Bleuet", partie: "Fleurs séchées", grammage: "20g", actifs: "Anthocyanes (apaisant)" },
      phase_B: { nom: "Thé Vert", partie: "Feuilles", grammage: "15g", actifs: "Caféine, polyphénols (tonifiant)" }
    },
    parametres_bloomlab: {
      phase_A: { temp: "40°C", temps: "2h00", agitation: "Très douce" },
      phase_B: { temp: "40°C", temps: "2h00", agitation: "Très douce" }
    },
    recette_pas_a_pas: {
      batch_standard: "Cible BloomLab : 400ml",
      ingredients: {
        phase_A: ["200ml Huile de Calophylle", "20g Fleurs de Bleuet"],
        phase_B: ["200ml Huile d'Avocat", "15g Thé Vert"]
      },
      phase_A_instructions: ["1. Calophylle + Bleuet. Mode OIL, 40°C, 2h00."],
      transition: ["1. Pas de repos nécessaire."],
      phase_B_instructions: ["1. Avocat + Thé Vert. Mode OIL, 40°C, 2h00."],
      filtration_et_finition: ["1. Filtration ultra-fine.", "2. Vitamine E."]
    },
    conditionnement: "Flacon roll-on 10ml.",
    mode_utilisation: "Matin et soir. Appliquer avec le roll-on, tapoter doucement.",
    synergies_kits_internes: "Kit Mix Expert Peaux",
    conservation: "6 mois.",
    precautions: "Ne pas introduire dans l'œil."
  },
  {
    plant_id: "baume_levres_calendula",
    nom_commun: "Baume Lèvres Nourrissant — Calendula & Miel",
    type_produit: "Baume lèvres",
    categorie: "Visage",
    peau: "Sèche / Gercée",
    cible: "Lèvres abîmées, protection contre le froid",
    solvants: {
      phase_A: { type: "Beurre de Karité", volume: "200g", role: "Nourrissant, protecteur" },
      phase_B: { type: "Huile d'Amande Douce", volume: "100ml", role: "Adoucissante" }
    },
    plantes: {
      phase_A: { nom: "Calendula", partie: "Fleurs", grammage: "15g", actifs: "Calendulosides" },
      phase_B: { nom: "Miel", partie: "Miel bio", grammage: "10g", actifs: "Réparateur" }
    },
    parametres_bloomlab: {
      phase_A: { temp: "50°C", temps: "1h30", agitation: "Moyenne" },
      phase_B: { temp: "45°C", temps: "1h00", agitation: "Moyenne" }
    },
    recette_pas_a_pas: {
      batch_standard: "Batch : 300g",
      ingredients: {
        phase_A: ["200g Beurre de Karité", "15g Calendula"],
        phase_B: ["100ml Amande Douce", "10g Miel"]
      },
      phase_A_instructions: ["1. Fondre le Karité avec le Calendula. Mode OIL, 50°C, 1h30."],
      transition: ["1. Filtrer le beurre fondu avant la phase B."],
      phase_B_instructions: ["1. Ajouter Amande et Miel. Mode OIL, 45°C, 1h00."],
      filtration_et_finition: ["1. Couler immédiatement dans des petits pots.", "2. Laisser durcir au froid."]
    },
    conditionnement: "Petits pots 15ml.",
    mode_utilisation: "Appliquer au doigt aussi souvent que nécessaire.",
    synergies_kits_internes: "Kit Pureté Sanguine",
    conservation: "9 mois.",
    precautions: "Attention aux allergies au miel."
  },
  {
    plant_id: "lotion_tonique_camomille",
    nom_commun: "Lotion Tonique Apaisante — Camomille & Lavande",
    type_produit: "Lotion aqueuse",
    categorie: "Visage",
    peau: "Sensible / Irritée",
    cible: "Apaisement après nettoyage, préparation au soin",
    solvants: {
      phase_A: { type: "Hydrolat de Camomille", volume: "500ml", role: "Apaisant" },
      phase_B: { type: "Eau de Rose", volume: "250ml", role: "Astringent doux" }
    },
    plantes: {
      phase_A: { nom: "Camomille Matricaire", partie: "Fleurs", grammage: "20g", actifs: "Chamazulène" },
      phase_B: { nom: "Lavande Vraie", partie: "Fleurs", grammage: "10g", actifs: "Linalol" }
    },
    parametres_bloomlab: {
      phase_A: { temp: "40°C", temps: "1h30", agitation: "Douce" },
      phase_B: { temp: "40°C", temps: "1h00", agitation: "Douce" }
    },
    recette_pas_a_pas: {
      batch_standard: "Cible : 750ml",
      ingredients: {
        phase_A: ["500ml Hydrolat Camomille", "20g Fleurs Camomille"],
        phase_B: ["250ml Eau de Rose", "10g Lavande"]
      },
      phase_A_instructions: ["1. Camomille. Mode OIL, 40°C, 1h30."],
      transition: ["1. Aucun."],
      phase_B_instructions: ["1. Lavande. Mode OIL, 40°C, 1h00."],
      filtration_et_finition: ["1. Filtration TRÈS fine (filtre papier).", "2. Ajout conservateur naturel (Cosgard)."]
    },
    conditionnement: "Flacon spray 100ml.",
    mode_utilisation: "Vaporiser sur visage propre, sécher en tamponnant.",
    synergies_kits_internes: "Kit Mix Expert Peaux",
    conservation: "3 mois au frais.",
    precautions: "Test cutané recommandé."
  },
  {
    plant_id: "huile_precieuse_rose",
    nom_commun: "Huile Précieuse Régénérante — Rose Musquée & Argan",
    type_produit: "Huile visage luxe",
    categorie: "Visage",
    peau: "Mûre / Fatiguée",
    cible: "Rides, fermeté, éclat du teint",
    solvants: {
      phase_A: { type: "Huile d'Argan", volume: "400ml", role: "Nourrissante, riche en vit E" },
      phase_B: { type: "Huile de Rose Musquée", volume: "200ml", role: "Régénérante active" }
    },
    plantes: {
      phase_A: { nom: "Rose de Damas", partie: "Pétales", grammage: "20g", actifs: "Polyphénols" },
      phase_B: { nom: "Ciste Ladanifère", partie: "Rameaux", grammage: "10g", actifs: "Cétones (tenseur)" }
    },
    parametres_bloomlab: {
      phase_A: { temp: "45°C", temps: "3h00", agitation: "Douce" },
      phase_B: { temp: "40°C", temps: "2h00", agitation: "Très douce" }
    },
    recette_pas_a_pas: {
      batch_standard: "Cible : 600ml",
      ingredients: {
        phase_A: ["400ml Argan", "20g Rose"],
        phase_B: ["200ml Rose Musquée", "10g Ciste"]
      },
      phase_A_instructions: ["1. Argan + Rose. Mode OIL, 45°C, 3h00."],
      transition: ["1. Repos 20 min."],
      phase_B_instructions: ["1. Rose Musquée + Ciste. Mode OIL, 40°C, 2h00."],
      filtration_et_finition: ["1. Filtration fine.", "2. Vitamine E."]
    },
    conditionnement: "Flacon verre luxe 30ml.",
    mode_utilisation: "Quelques gouttes matin et soir en massage circulaire.",
    synergies_kits_internes: "Kit Renaissance",
    conservation: "12 mois.",
    precautions: "Éviter si allergie aux rosacées."
  },
  {
    plant_id: "gommage_corps_sel_botanique",
    nom_commun: "Gommage Corps Botanique — Sel & Algues",
    type_produit: "Exfoliant corps",
    categorie: "Corps",
    peau: "Toutes",
    cible: "Exfoliation, détoxication, peau douce",
    solvants: {
      phase_A: { type: "Huile de Tournesol", volume: "300ml", role: "Base fluide" },
      phase_B: { type: "Sel de l'Himalaya", volume: "500g", role: "Exfoliant minéral" }
    },
    plantes: {
      phase_A: { nom: "Fucus (Algues)", partie: "Thalle séché", grammage: "30g", actifs: "Iode, minéraux" },
      phase_B: { nom: "Romarin", partie: "Feuilles", grammage: "10g", actifs: "Tonifiant" }
    },
    parametres_bloomlab: {
      phase_A: { temp: "45°C", temps: "2h00", agitation: "Moyenne" },
      phase_B: { temp: "25°C", temps: "0h30", agitation: "Moyenne" }
    },
    recette_pas_a_pas: {
      batch_standard: "Batch : ~800g",
      ingredients: {
        phase_A: ["300ml Tournesol", "30g Fucus"],
        phase_B: ["500g Sel Himalaya", "10g Romarin haché"]
      },
      phase_A_instructions: ["1. Infuser le Fucus dans l'huile. 45°C, 2h00."],
      transition: ["1. Filtrer l'huile."],
      phase_B_instructions: ["1. Mélanger l'huile filtrée avec le sel et le romarin."],
      filtration_et_finition: ["1. Homogénéiser.", "2. Mettre en pot."]
    },
    conditionnement: "Pot large 250ml.",
    mode_utilisation: "Sous la douche, masser sur peau humide, rincer.",
    synergies_kits_internes: "Kit Pureté Sanguine",
    conservation: "6 mois.",
    precautions: "Ne pas utiliser sur peau irritée."
  },
  {
    plant_id: "huile_jambes_legeres",
    nom_commun: "Huile Jambes Légères — Vigne Rouge & Marron",
    type_produit: "Huile de soin circulatoire",
    categorie: "Corps",
    peau: "Toutes",
    cible: "Jambes lourdes, varicosités, drainage",
    solvants: {
      phase_A: { type: "Huile de Calophylle", volume: "300ml", role: "Actif circulatoire" },
      phase_B: { type: "Huile de Macadamia", volume: "300ml", role: "Pénétrante" }
    },
    plantes: {
      phase_A: { nom: "Vigne Rouge", partie: "Feuilles", grammage: "40g", actifs: "Anthocyanes (tonifiant)" },
      phase_B: { nom: "Marron d'Inde", partie: "Graine", grammage: "20g", actifs: "Aescine (anti-oedème)" }
    },
    parametres_bloomlab: {
      phase_A: { temp: "50°C", temps: "3h00", agitation: "Moyenne" },
      phase_B: { temp: "45°C", temps: "2h00", agitation: "Moyenne" }
    },
    recette_pas_a_pas: {
      batch_standard: "Cible : 600ml",
      ingredients: {
        phase_A: ["300ml Calophylle", "40g Vigne Rouge"],
        phase_B: ["300ml Macadamia", "20g Marron d'Inde"]
      },
      phase_A_instructions: ["1. Calophylle + Vigne Rouge. Mode OIL, 50°C, 3h00."],
      transition: ["1. Repos 20 min."],
      phase_B_instructions: ["1. Macadamia + Marron d'Inde. Mode OIL, 45°C, 2h00."],
      filtration_et_finition: ["1. Filtration fine.", "2. Vitamine E."]
    },
    conditionnement: "Flacon pompe 100ml.",
    mode_utilisation: "Massage ascendant des chevilles vers les cuisses.",
    synergies_kits_internes: "Kit Reset Homéostasique",
    conservation: "12 mois.",
    precautions: "Déconseillé aux enfants et femmes enceintes."
  },
  {
    plant_id: "masque_capillaire_nutrition",
    nom_commun: "Masque Capillaire Nutrition — Avocat & Karité",
    type_produit: "Soin cheveux profond",
    categorie: "Cheveux",
    peau: "Toutes",
    cible: "Cheveux secs, cassants, pointes abîmées",
    solvants: {
      phase_A: { type: "Beurre de Karité", volume: "300g", role: "Généreux, réparateur" },
      phase_B: { type: "Huile d'Avocat", volume: "200ml", role: "Nutrition intense" }
    },
    plantes: {
      phase_A: { nom: "Ortie", partie: "Feuilles", grammage: "30g", actifs: "Silice (fortifiant)" },
      phase_B: { nom: "Fénugrec", partie: "Graines", grammage: "20g", actifs: "Protéines" }
    },
    parametres_bloomlab: {
      phase_A: { temp: "55°C", temps: "2h00", agitation: "Moyenne" },
      phase_B: { temp: "45°C", temps: "2h00", agitation: "Douce" }
    },
    recette_pas_a_pas: {
      batch_standard: "Batch : ~500g",
      ingredients: {
        phase_A: ["300g Karité", "30g Ortie"],
        phase_B: ["200ml Avocat", "20g Fénugrec"]
      },
      phase_A_instructions: ["1. Fondre Karité + Ortie. 55°C, 2h00."],
      transition: ["1. Filtrer le beurre fondu."],
      phase_B_instructions: ["1. Ajouter Avocat + Fénugrec. 45°C, 2h00."],
      filtration_et_finition: ["1. Filtration finale.", "2. Laisser refroidir pour texture crémeuse."]
    },
    conditionnement: "Pot 200ml.",
    mode_utilisation: "Appliquer sur les longueurs avant shampooing, laisser poser 1h.",
    synergies_kits_internes: "Kit Renaissance",
    conservation: "6 mois.",
    precautions: "Bien rincer."
  },
  {
    plant_id: "baume_mains_karite",
    nom_commun: "Baume Mains Protecteur — Karité & Glycérine",
    type_produit: "Baume mains",
    categorie: "Corps",
    peau: "Sèche / Abîmée",
    cible: "Mains sèches, crevasses, protection quotidienne",
    solvants: {
      phase_A: { type: "Beurre de Karité", volume: "400g", role: "Barrière protectrice" },
      phase_B: { type: "Glycérine Végétale", volume: "50ml", role: "Humectant" }
    },
    plantes: {
      phase_A: { nom: "Calendula", partie: "Fleurs", grammage: "20g", actifs: "Apaisant" },
      phase_B: { nom: "Camomille", partie: "Fleurs", grammage: "10g", actifs: "Réparateur" }
    },
    parametres_bloomlab: {
      phase_A: { temp: "55°C", temps: "2h00", agitation: "Moyenne" },
      phase_B: { temp: "40°C", temps: "1h00", agitation: "Moyenne" }
    },
    recette_pas_a_pas: {
      batch_standard: "Batch : ~450g",
      ingredients: {
        phase_A: ["400g Karité", "20g Calendula"],
        phase_B: ["50ml Glycérine", "10g Camomille"]
      },
      phase_A_instructions: ["1. Fondre Karité + Calendula. 55°C, 2h00."],
      transition: ["1. Filtrer."],
      phase_B_instructions: ["1. Ajouter Glycérine + Camomille. 40°C, 1h00."],
      filtration_et_finition: ["1. Fouetter pendant le refroidissement pour texture chantilly."]
    },
    conditionnement: "Pot 100ml.",
    mode_utilisation: "Masser sur les mains propres soir et matin.",
    synergies_kits_internes: "Kit Pureté Sanguine",
    conservation: "12 mois.",
    precautions: "Texture riche."
  },
  {
    plant_id: "huile_demaquillante_yeux",
    nom_commun: "Huile Démaquillante Yeux — Bleuet & Amande",
    type_produit: "Démaquillant yeux",
    categorie: "Visage",
    peau: "Sensible",
    cible: "Démaquillage doux des yeux, soin des cils",
    solvants: {
      phase_A: { type: "Huile d'Amande Douce", volume: "400ml", role: "Doux, adoucissant" },
      phase_B: { type: "Huile de Ricin", volume: "100ml", role: "Fortifiant cils" }
    },
    plantes: {
      phase_A: { nom: "Bleuet", partie: "Fleurs", grammage: "30g", actifs: "Anthocyanes" },
      phase_B: { nom: "Camomille", partie: "Fleurs", grammage: "10g", actifs: "Apaisant" }
    },
    parametres_bloomlab: {
      phase_A: { temp: "35°C", temps: "2h00", agitation: "Très douce" },
      phase_B: { temp: "35°C", temps: "1h00", agitation: "Très douce" }
    },
    recette_pas_a_pas: {
      batch_standard: "Cible : 500ml",
      ingredients: {
        phase_A: ["400ml Amande Douce", "30g Bleuet"],
        phase_B: ["100ml Ricin", "10g Camomille"]
      },
      phase_A_instructions: ["1. Amande + Bleuet. 35°C, 2h00."],
      transition: ["1. Aucun."],
      phase_B_instructions: ["1. Ricin + Camomille. 35°C, 1h00."],
      filtration_et_finition: ["1. Filtration ultra-fine.", "2. Vitamine E."]
    },
    conditionnement: "Flacon verre 50ml.",
    mode_utilisation: "Sur un coton humide ou à la main, masser doucement les yeux, rincer.",
    synergies_kits_internes: "Kit Mix Expert Peaux",
    conservation: "9 mois.",
    precautions: "Éviter le contact direct interne."
  },
  {
    plant_id: "elixir_nuit_apaisant",
    nom_commun: "Élixir de Nuit Apaisant — Mélisse & Valériane",
    type_produit: "Sérum nuit psycho-cutané",
    categorie: "Visage",
    peau: "Toutes / Stressées",
    cible: "Peau fatiguée par le stress, détente nocturne",
    solvants: {
      phase_A: { type: "Huile de Jojoba", volume: "400ml", role: "Équilibration" },
      phase_B: { type: "Huile de Millepertuis", volume: "200ml", role: "Apaisant nerveux" }
    },
    plantes: {
      phase_A: { nom: "Mélisse", partie: "Feuilles", grammage: "30g", actifs: "Acide rosmarinique" },
      phase_B: { nom: "Valériane", partie: "Racine", grammage: "15g", actifs: "Valépotriates" }
    },
    parametres_bloomlab: {
      phase_A: { temp: "45°C", temps: "3h00", agitation: "Douce" },
      phase_B: { temp: "40°C", temps: "2h00", agitation: "Douce" }
    },
    recette_pas_a_pas: {
      batch_standard: "Cible : 600ml",
      ingredients: {
        phase_A: ["400ml Jojoba", "30g Mélisse"],
        phase_B: ["200ml Millepertuis", "15g Valériane"]
      },
      phase_A_instructions: ["1. Jojoba + Mélisse. 45°C, 3h00."],
      transition: ["1. Repos 20 min."],
      phase_B_instructions: ["1. Millepertuis + Valériane. 40°C, 2h00."],
      filtration_et_finition: ["1. Filtration fine.", "2. Vitamine E."]
    },
    conditionnement: "Flacon bleu 30ml.",
    mode_utilisation: "Le soir avant le coucher, en massage lent.",
    synergies_kits_internes: "Kit Reset Homéostasique",
    conservation: "12 mois.",
    precautions: "Millepertuis : ne pas s'exposer au soleil après application."
  },
  {
    plant_id: "serum_hydratation_profonde",
    nom_commun: "Sérum Hydratation — Aloé & Hyaluronique",
    type_produit: "Sérum aqueux",
    categorie: "Visage",
    peau: "Déshydratée",
    cible: "Manque d'eau, tiraillements",
    solvants: {
      phase_A: { type: "Gel d'Aloé Vera", volume: "500ml", role: "Hydratant base" },
      phase_B: { type: "Eau de Rose", volume: "200ml", role: "Actif tonifiant" }
    },
    plantes: {
      phase_A: { nom: "Mauve", partie: "Fleurs", grammage: "20g", actifs: "Mucilages" },
      phase_B: { nom: "Tilleul", partie: "Aubier", grammage: "15g", actifs: "Drainant doux" }
    },
    parametres_bloomlab: {
      phase_A: { temp: "35°C", temps: "1h30", agitation: "Douce" },
      phase_B: { temp: "35°C", temps: "1h00", agitation: "Douce" }
    },
    recette_pas_a_pas: {
      batch_standard: "Cible : 700ml",
      ingredients: {
        phase_A: ["500ml Aloé Vera", "20g Mauve"],
        phase_B: ["200ml Eau de Rose", "15g Tilleul"]
      },
      phase_A_instructions: ["1. Aloé + Mauve. 35°C, 1h30."],
      transition: ["1. Aucun."],
      phase_B_instructions: ["1. Eau de Rose + Tilleul. 35°C, 1h00."],
      filtration_et_finition: ["1. Filtration fine.", "2. Conservateur naturel."]
    },
    conditionnement: "Flacon pompe 50ml.",
    mode_utilisation: "Le matin sous la crème ou l'huile.",
    synergies_kits_internes: "Kit Mix Expert Peaux",
    conservation: "3 mois au frais.",
    precautions: "Usage externe."
  },
  {
    plant_id: "huile_barbe_visage",
    nom_commun: "Huile de Barbe & Visage — Cèdre & Jojoba",
    type_produit: "Huile de soin homme",
    categorie: "Visage",
    peau: "Toutes",
    cible: "Entretien barbe, peau dessous irritée",
    solvants: {
      phase_A: { type: "Huile de Jojoba", volume: "400ml", role: "Équilibration" },
      phase_B: { type: "Huile de Sésame", volume: "200ml", role: "Chauffante, fortifiante" }
    },
    plantes: {
      phase_A: { nom: "Cèdre de l'Atlas", partie: "Bois", grammage: "30g", actifs: "Cédrol (tonifiant)" },
      phase_B: { nom: "Gingembre", partie: "Racine", grammage: "15g", actifs: "Stimulant" }
    },
    parametres_bloomlab: {
      phase_A: { temp: "55°C", temps: "4h00", agitation: "Moyenne" },
      phase_B: { temp: "50°C", temps: "2h00", agitation: "Douce" }
    },
    recette_pas_a_pas: {
      batch_standard: "Cible : 600ml",
      ingredients: {
        phase_A: ["400ml Jojoba", "30g Cèdre"],
        phase_B: ["200ml Sésame", "15g Gingembre"]
      },
      phase_A_instructions: ["1. Jojoba + Cèdre. 55°C, 4h00."],
      transition: ["1. Repos 20 min."],
      phase_B_instructions: ["1. Sésame + Gingembre. 50°C, 2h00."],
      filtration_et_finition: ["1. Filtration fine.", "2. Vitamine E."]
    },
    conditionnement: "Flacon verre 30ml.",
    mode_utilisation: "Quelques gouttes sur la barbe et masser le visage.",
    synergies_kits_internes: "Kit Renaissance",
    conservation: "12 mois.",
    precautions: "Éviter yeux."
  },
  {
    plant_id: "masque_detox_argile",
    nom_commun: "Masque Détox — Argile & Charbon",
    type_produit: "Masque poudre à activer",
    categorie: "Visage",
    peau: "Mixte / Grasse",
    cible: "Détoxification, impuretés, pollution",
    solvants: {
      phase_A: { type: "Huile de Noisette", volume: "200ml", role: "Support huileux" },
      phase_B: { type: "Eau purifiée", volume: "200ml", role: "Activation minute (hors machine)" }
    },
    plantes: {
      phase_A: { nom: "Ortie", partie: "Feuilles", grammage: "40g", actifs: "Minéralisant" },
      phase_B: { nom: "Argile Verte", partie: "Poudre", grammage: "200g", actifs: "Adsorbant" }
    },
    parametres_bloomlab: {
      phase_A: { temp: "50°C", temps: "2h00", agitation: "Moyenne" },
      phase_B: { temp: "25°C", temps: "0h00", agitation: "N/A" }
    },
    recette_pas_a_pas: {
      batch_standard: "Produit : Huile infusée à mélanger à l'argile",
      ingredients: {
        phase_A: ["200ml Huile Noisette", "40g Ortie"],
        phase_B: ["200g Argile Verte", "Charbon végétal 10g"]
      },
      phase_A_instructions: ["1. Infuser Ortie dans Noisette. 50°C, 2h00."],
      transition: ["1. Filtrer l'huile."],
      phase_B_instructions: ["1. Mélanger l'argile et le charbon dans un pot séparé."],
      filtration_et_finition: ["1. Le soin final se fait au moment de l'usage : 1 dose d'huile + 1 dose de poudre + eau."]
    },
    conditionnement: "Duo pot poudre + flacon huile.",
    mode_utilisation: "Mélanger, appliquer 10 min, rincer avant séchage complet.",
    synergies_kits_internes: "Kit Pureté Sanguine",
    conservation: "12 mois (séparés).",
    precautions: "Ne pas laisser sécher complètement sur la peau."
  },
  {
    plant_id: "lotion_capillaire_ortie",
    nom_commun: "Lotion Tonique Capillaire — Ortie & Romarin",
    type_produit: "Lotion scalp",
    categorie: "Cheveux",
    peau: "Toutes",
    cible: "Fortification, brillance, cuir chevelu sain",
    solvants: {
      phase_A: { type: "Vinaigre de Cidre", volume: "500ml", role: "Brillance, pH neutre" },
      phase_B: { type: "Eau de Source", volume: "250ml", role: "Dilution" }
    },
    plantes: {
      phase_A: { nom: "Ortie", partie: "Feuilles", grammage: "50g", actifs: "Minéraux" },
      phase_B: { nom: "Romarin", partie: "Feuilles", grammage: "20g", actifs: "Circulatoire" }
    },
    parametres_bloomlab: {
      phase_A: { temp: "45°C", temps: "3h00", agitation: "Douce" },
      phase_B: { temp: "40°C", temps: "2h00", agitation: "Douce" }
    },
    recette_pas_a_pas: {
      batch_standard: "Cible : 750ml",
      ingredients: {
        phase_A: ["500ml Vinaigre de Cidre", "50g Ortie"],
        phase_B: ["250ml Eau", "20g Romarin"]
      },
      phase_A_instructions: ["1. Vinaigre + Ortie. 45°C, 3h00."],
      transition: ["1. Aucun."],
      phase_B_instructions: ["1. Eau + Romarin. 40°C, 2h00."],
      filtration_et_finition: ["1. Filtration fine.", "2. Utilisation en rinçage."]
    },
    conditionnement: "Flacon 250ml.",
    mode_utilisation: "Dernier rinçage après shampooing.",
    synergies_kits_internes: "Kit Renaissance",
    conservation: "6 mois.",
    precautions: "Odeur de vinaigre s'évapore au séchage."
  },
  {
    plant_id: "soin_pieds_relaxant",
    nom_commun: "Baume Pieds Relaxant — Menthe & Camphre",
    type_produit: "Baume pieds",
    categorie: "Corps",
    peau: "Sèche",
    cible: "Pieds fatigués, échauffements",
    solvants: {
      phase_A: { type: "Huile de Coco", volume: "300g", role: "Fraîcheur, base solide" },
      phase_B: { type: "Beurre de Karité", volume: "200g", role: "Nutrition" }
    },
    plantes: {
      phase_A: { nom: "Menthe Poivrée", partie: "Feuilles", grammage: "40g", actifs: "Menthol (froid)" },
      phase_B: { nom: "Eucalyptus", partie: "Feuilles", grammage: "20g", actifs: "Purifiant" }
    },
    parametres_bloomlab: {
      phase_A: { temp: "45°C", temps: "2h00", agitation: "Moyenne" },
      phase_B: { temp: "40°C", temps: "1h30", agitation: "Moyenne" }
    },
    recette_pas_a_pas: {
      batch_standard: "Batch : ~500g",
      ingredients: {
        phase_A: ["300g Coco", "40g Menthe"],
        phase_B: ["200g Karité", "20g Eucalyptus"]
      },
      phase_A_instructions: ["1. Coco + Menthe. 45°C, 2h00."],
      transition: ["1. Filtrer."],
      phase_B_instructions: ["1. Karité + Eucalyptus. 40°C, 1h30."],
      filtration_et_finition: ["1. Filtration finale.", "2. Couler en pot."]
    },
    conditionnement: "Pot 100ml.",
    mode_utilisation: "Massage des pieds le soir.",
    synergies_kits_internes: "Kit Reset Homéostasique",
    conservation: "12 mois.",
    precautions: "Effet glaçon garanti."
  }
];

// Placeholder arrays for other languages - Titles and Cible are translated for the 22 recipes
// To keep the file manageable, we use the same IDs and similar structures.
export const cosmeticsRecipesEN: CosmeticsRecipe[] = cosmeticsRecipesFR.map(r => {
  const translations: Record<string, { name: string; target: string }> = {
    "serum_reparateur_nuit": { name: "Night Repair Serum — Skin Barrier", target: "Sensitive skin, healing, skin microbiota repair" },
    "elixir_croissance_capillaire": { name: "Growth & Scalp Elixir — Active Follicle", target: "Hair loss, inflamed scalp, dandruff, hair shaft strengthening" },
    "huile_corps_drainante": { name: "Draining & Firming Body Oil — Silhouette", target: "Cellulite, water retention, skin firmness, lymphatic drainage" },
    "nettoyant_botanique_doux": { name: "Gentle Botanical Cleansing Oil — Soft Purity", target: "Deep cleansing, makeup removal, respect for the hydrolipidic film" },
    "masque_eclat_hibiscus": { name: "Radiance & Youth Mask — Hibiscus & Rose", target: "Complexion radiance, antioxidant, smoothing of fine lines" },
    "huile_massage_recuperation": { name: "Recovery Massage Oil — Sport & Muscle", target: "Muscle pain, post-effort recovery, toxin drainage" },
    "serum_anti_imperfections": { name: "Anti-Imperfection Serum — Burdock & Purified", target: "Excess sebum, imperfections, dilated pores" },
    "elixir_regard_frais": { name: "Fresh Eyes Elixir — Eye Contour", target: "Dark circles, puffiness, dehydration lines" },
    "baume_levres_calendula": { name: "Nourishing Lip Balm — Calendula & Honey", target: "Damaged lips, protection against cold" },
    "lotion_tonique_camomille": { name: "Soothing Tonic Lotion — Chamomile & Lavender", target: "Soothing after cleansing, preparation for care" },
    "huile_precieuse_rose": { name: "Regenerating Precious Oil — Rosehip & Argan", target: "Wrinkles, firmness, complexion radiance" },
    "gommage_corps_sel_botanique": { name: "Botanical Body Scrub — Salt & Seaweed", target: "Exfoliation, detoxification, soft skin" },
    "huile_jambes_legeres": { name: "Light Legs Oil — Red Vine & Horse Chestnut", target: "Heavy legs, spider veins, drainage" },
    "masque_capillaire_nutrition": { name: "Nutrition Hair Mask — Avocado & Shea", target: "Dry, brittle hair, damaged ends" },
    "baume_mains_karite": { name: "Protective Hand Balm — Shea & Glycerin", target: "Dry hands, cracks, daily protection" },
    "huile_demaquillante_yeux": { name: "Eye Makeup Remover Oil — Cornflower & Almond", target: "Gentle eye makeup removal, lash care" },
    "elixir_nuit_apaisant": { name: "Soothing Night Elixir — Lemon Balm & Valerian", target: "Skin fatigued by stress, nocturnal relaxation" },
    "serum_hydratation_profonde": { name: "Hydration Serum — Aloe & Hyaluronic", target: "Lack of water, tightness" },
    "huile_barbe_visage": { name: "Beard & Face Oil — Cedar & Jojoba", target: "Beard maintenance, irritated skin underneath" },
    "masque_detox_argile": { name: "Detox Mask — Clay & Charcoal", target: "Detoxification, impurities, pollution" },
    "lotion_capillaire_ortie": { name: "Hair Tonic Lotion — Nettle & Rosemary", target: "Fortification, shine, healthy scalp" },
    "soin_pieds_relaxant": { name: "Relaxing Foot Balm — Mint & Camphor", target: "Tired feet, overheating" }
  };
  const t = translations[r.plant_id];
  return {
    ...r,
    nom_commun: t ? t.name : r.nom_commun,
    categorie: r.categorie === 'Visage' ? 'Face' : r.categorie === 'Corps' ? 'Body' : 'Hair',
    peau: r.peau === 'Sensible' ? 'Sensitive' : r.peau === 'Toutes' ? 'All' : r.peau === 'Grasse / Acnéique' ? 'Oily / Acne' : 'Dry / Sensitive',
    cible: t ? t.target : r.cible
  };
});

export const cosmeticsRecipesDE: CosmeticsRecipe[] = cosmeticsRecipesFR.map(r => {
  const translations: Record<string, { name: string; target: string }> = {
    "serum_reparateur_nuit": { name: "Nacht-Reparatur-Serum — Hautbarriere", target: "Empfindliche Haut, Heilung, Reparatur der Hautmikrobiota" },
    "elixir_croissance_capillaire": { name: "Haarwachstums- & Kopfhaut-Elixier — Aktiver Follikel", target: "Haarausfall, entzündete Kopfhaut, Schuppen, Stärkung des Haarschafts" },
    "huile_corps_drainante": { name: "Entwässerndes & Straffendes Körperöl — Silhouette", target: "Cellulite, Wassereinlagerungen, Hautfestigkeit, Lymphdrainage" },
    "nettoyant_botanique_doux": { name: "Sanftes Botanisches Reinigungsöl — Milde Reinheit", target: "Tiefenreinigung, Make-up-Entfernung, Schutz des Hydrolipidfilms" },
    "masque_eclat_hibiscus": { name: "Strahlkraft- & Jugendmaske — Hibiskus & Rose", target: "Strahlender Teint, Antioxidans, Glättung feiner Linien" },
    "huile_massage_recuperation": { name: "Erholungs-Massageöl — Sport & Muskel", target: "Muskelschmerzen, Erholung nach dem Sport, Giftstoffdrainage" },
    "serum_anti_imperfections": { name: "Anti-Unreinheiten-Serum — Klette & Gereinigt", target: "Talgüberschuss, Unreinheiten, erweiterte Poren" },
    "elixir_regard_frais": { name: "Frische Augen Elixier — Augenkontur", target: "Dunkle Ringe, Schwellungen, Dehydrierungsfalten" },
    "baume_levres_calendula": { name: "Nährender Lippenbalsam — Calendula & Honig", target: "Rissige Lippen, Schutz vor Kälte" },
    "lotion_tonique_camomille": { name: "Beruhigendes Tonikum — Kamille & Lavendel", target: "Beruhigung nach der Reinigung, Vorbereitung auf die Pflege" },
    "huile_precieuse_rose": { name: "Regenerierendes Kostbares Öl — Wildrose & Argan", target: "Falten, Festigkeit, strahlender Teint" },
    "gommage_corps_sel_botanique": { name: "Botanisches Körperpeeling — Salz & Algen", target: "Peeling, Entgiftung, weiche Haut" },
    "huile_jambes_legeres": { name: "Leichte Beine Öl — Roter Weinlaub & Rosskastanie", target: "Schwere Beine, Besenreiser, Drainage" },
    "masque_capillaire_nutrition": { name: "Nährende Haarmaske — Avocado & Shea", target: "Trockenes, brüchiges Haar, geschädigte Spitzen" },
    "baume_mains_karite": { name: "Schützender Handbalsam — Shea & Glycerin", target: "Trockene Hände, Risse, täglicher Schutz" },
    "huile_demaquillante_yeux": { name: "Augen-Make-up-Entferneröl — Kornblume & Mandel", target: "Sanfte Augen-Make-up-Entfernung, Wimpernpflege" },
    "elixir_nuit_apaisant": { name: "Beruhigendes Nachtelixier — Melisse & Baldrian", target: "Durch Stress ermüdete Haut, nächtliche Entspannung" },
    "serum_hydratation_profonde": { name: "Hydratations-Serum — Aloe & Hyaluron", target: "Wassermangel, Spannungsgefühle" },
    "huile_barbe_visage": { name: "Bart- & Gesichtsöl — Zeder & Jojoba", target: "Bartpflege, gereizte Haut darunter" },
    "masque_detox_argile": { name: "Detox-Maske — Tonerde & Kohle", target: "Entgiftung, Unreinheiten, Verschmutzung" },
    "lotion_capillaire_ortie": { name: "Haartonikum — Brennnessel & Rosmarin", target: "Stärkung, Glanz, gesunde Kopfhaut" },
    "soin_pieds_relaxant": { name: "Entspannender Fußbalsam — Minze & Kampfer", target: "Müde Füße, Überhitzung" }
  };
  const t = translations[r.plant_id];
  return {
    ...r,
    nom_commun: t ? t.name : r.nom_commun,
    categorie: r.categorie === 'Visage' ? 'Gesicht' : r.categorie === 'Corps' ? 'Körper' : 'Haare',
    peau: r.peau === 'Sensible' ? 'Empfindlich' : 'Alle',
    cible: t ? t.target : r.cible
  };
});

export const getCosmeticsRecipes = (lang: Language): CosmeticsRecipe[] => {
  switch (lang) {
    case 'en': return cosmeticsRecipesEN;
    case 'de': return cosmeticsRecipesDE;
    default: return cosmeticsRecipesFR;
  }
};

export const cosmeticsRecipes = cosmeticsRecipesFR;
