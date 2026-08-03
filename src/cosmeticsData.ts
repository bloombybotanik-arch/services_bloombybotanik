export const cosmeticsRecipes = [
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
        "1. Filtrez TRÈS finement avec le sac filtre fournit, la préparation encore tiède. Pressez fermement le marc.",
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
    plant_id: "huile_massage_recuperation",
    nom_commun: "Huile de Massage — Récupération & Élasticité",
    type_produit: "Huile corporelle multi-usage",
    categorie: "Corps",
    peau: "Toutes",
    age: "Tous",
    cible: "Douleurs musculaires, vergetures, hydratation profonde post-douche, récupération sportive",
    solvants: {
      phase_A: {type: "Huile d'Amande Douce", volume: "500ml", role: "Adoucissante, riche en vitamine E, pénétration rapide"},
      phase_B: {type: "Huile de Coco Fractionnée (MCT) ou Beurre de Karité fondu", volume: "250ml", role: "Nourrissante, stable, texture onctueuse"}
    },
    plantes: {
      phase_A: {nom: "Boswellia", partie: "Résine concassée", grammage: "50g", actifs: "Acides boswelliques (inhibition 5-LOX, anti-inflammatoire puissant)"},
      phase_B: {nom: "Gingembre", partie: "Rhizome séché en poudre grossière", grammage: "25g", actifs: "Gingérols (stimulation microcirculation, chaleur douce)"}
    },
    parametres_bloomlab: {
      phase_A: {temp: "50°C", temps: "3h00", agitation: "Moyenne"},
      phase_B: {temp: "45°C", temps: "2h00", agitation: "Douce"}
    },
    recette_pas_a_pas: {
      batch_standard: "Cible BloomLab : 750ml de solvant + 75g de plantes (Rendement final estimé : ~600-650ml)",
      ingredients: {
        phase_A: ["500ml d'Huile d'Amande Douce bio", "50g de Boswellia (résine concassée)"],
        phase_B: ["250ml d'Huile de Coco MCT ou Beurre de Karité fondu", "25g de Gingembre (rhizome séché, poudre grossière)"]
      },
      phase_A_instructions: [
        "1. Versez les 500ml d'huile d'Amande Douce dans la cuve.",
        "2. Ajoutez les 50g de Boswellia concassée.",
        "3. Fermez, mode manuel 'OIL', TEMP 50°C, TEMPS 3h00.",
        "4. START. (Le temps long est nécessaire pour extraire les acides boswelliques de la résine)."
      ],
      transition: [
        "1. Éteignez. Laissez reposer 20 minutes.",
        "2. TEST SENSORIEL OBLIGATOIRE : La cuve doit être tiède au toucher (~40°C).",
        "3. ⚠️ SÉCURITÉ : Attendez que la température soit correcte."
      ],
      phase_B_instructions: [
        "1. Ouvrez, versez les 250ml d'huile de Coco MCT (ou Beurre de Karité fondu).",
        "2. Ajoutez les 25g de Gingembre.",
        "3. Fermez, mode manuel 'OIL', TEMP 45°C, TEMPS 2h00.",
        "4. START."
      ],
      filtration_et_finition: [
        "1. Filtrez à l'étamine. Pressez fermement.",
        "2. FINITION COSMÉTIQUE : Ajoutez 20 gouttes de Vitamine E.",
        "3. OPTION AROMATHÉRAPIE : Ajoutez 10 gouttes d'Huile Essentielle de Lavande Vraie après filtration pour l'odeur (facultatif)."
      ]
    },
    conditionnement: "1 grand flacon pompe de 500ml + 1 petit flacon de 100ml pour le sac de sport.",
    mode_utilisation: "Sur peau humide après la douche pour l'hydratation. En massage sur les zones douloureuses (muscles, articulations) 2 à 3 fois par jour. Pour les vergetures : massage circulaire 2 fois par jour.",
    synergies_kits_internes: "Kit Renaissance (drainage = réduction rétention d'eau) + Kit Expert Peaux (réparation tissu conjonctif)",
    conservation: "6 mois à température ambiante. Le Beurre de Karité peut solidifier en hiver : placer le flacon dans un bain-marie tiède 2 minutes.",
    precautions: "Éviter le visage (texture riche). Ne pas appliquer sur plaies ouvertes."
  },
  {
    plant_id: "lotion_tonique_micellaire",
    nom_commun: "Lotion Tonique Micellaire — Apaisante",
    type_produit: "Lotion aqueuse (sans huile)",
    categorie: "Visage",
    peau: "Sensible",
    age: "Tous",
    cible: "Démaquillage doux, tonification, peaux à rougeurs (couperose), apaisement post-épilation",
    solvants: {
      phase_A: {type: "Eau distillée ultra-pure", volume: "500ml", role: "Base neutre, solvant des actifs hydrosolubles"},
      phase_B: {type: "Glycérine végétale", volume: "250ml", role: "Humectant, conservateur naturel léger, adoucissant"}
    },
    plantes: {
      phase_A: {nom: "Hamamélis", partie: "Feuilles et écorce séchées", grammage: "50g", actifs: "Tanins galliques, hamamélitane (veinotonique, astringent doux)"},
      phase_B: {nom: "Camomille Allemande ou Mélisse", partie: "Fleurs/Feuilles séchées", grammage: "25g", actifs: "Bisabolol, acide rosmarinique (apaisement, anti-rougeurs)"}
    },
    parametres_bloomlab: {
      phase_A: {temp: "60°C", temps: "2h00", agitation: "Moyenne"},
      phase_B: {temp: "45°C", temps: "1h30", agitation: "Douce"}
    },
    recette_pas_a_pas: {
      batch_standard: "Cible BloomLab : 750ml de solvant + 75g de plantes (Rendement final estimé : ~600-650ml)",
      ingredients: {
        phase_A: ["500ml d'Eau distillée ultra-pure", "250ml de Glycérine végétale", "50g d'Hamamélis (feuilles et écorce)"],
        phase_B: ["25g de Camomille Allemande ou Mélisse (feuilles)"]
      },
      phase_A_instructions: [
        "1. Versez les 500ml d'eau distillée + 250ml de glycérine dans la cuve.",
        "2. Ajoutez les 50g d'Hamamélis.",
        "3. Fermez, mode manuel 'OIL', TEMP 60°C, TEMPS 2h00.",
        "4. START."
      ],
      transition: [
        "1. Éteignez. Laissez reposer 20 minutes.",
        "2. TEST SENSORIEL OBLIGATOIRE : La cuve doit être tiède au toucher (~40°C).",
        "3. ⚠️ SÉCURITÉ : Attendez que la température soit correcte."
      ],
      phase_B_instructions: [
        "1. Ouvrez, ajoutez les 25g de Camomille/Mélisse (pas de solvant supplémentaire).",
        "2. Fermez, mode manuel 'OIL', TEMP 45°C, TEMPS 1h30.",
        "3. START. (Extraction douce des restes à basse température)."
      ],
      filtration_et_finition: [
        "1. Filtrez TRÈS finement (filtre à café ou étamine très serrée) pour éviter tout résidu dans les yeux.",
        "2. FINITION COSMÉTIQUE : Ajoutez 10 gouttes d'Extrait de Pépins de Pamplemousse (EPP) ou de Cosgard (conservateur cosmétique naturel) pour garantir la stabilité du produit aqueux sur plusieurs semaines.",
        "3. Mélangez doucement."
      ]
    },
    conditionnement: "Flacons avec pompe ou disque démaquillant réutilisable. À conserver au réfrigérateur pour un effet 'glacé' décongestionnant.",
    mode_utilisation: "Matin et soir sur coton ou directement pulvérisé sur le visage. Peut servir de démaquillant doux (insister sur les yeux). Ne pas rincer.",
    synergies_kits_internes: "Kit Pureté Sanguine (réduction inflammation cutanée) + Kit Mix Expert Peaux (réparation barrière)",
    conservation: "3 mois au réfrigérateur (produit aqueux = plus sensible aux contaminations). Jeter si odeur ou couleur change.",
    precautions: "Éviter le contact direct avec les yeux (pique légèrement). Test de tolérance 24h avant première utilisation."
  },
  {
    plant_id: "baume_reparateur_levres",
    nom_commun: "Baume Réparateur Lèvres (PREMIUM)",
    type_produit: "Baume solide",
    categorie: "Visage",
    peau: "Toutes",
    age: "Tous",
    cible: "Lèvres gercées, sèches, crevasses, protection froid",
    solvants: {
      phase_A: { type: "Huile d'Amande Douce", volume: "250ml", role: "Nourrissant, adoucissant" },
      phase_B: { type: "Beurre de Karité & Cire d'Abeille", volume: "100g", role: "Protection, film occlusif" }
    },
    plantes: {
      phase_A: { nom: "Calendula", partie: "Fleurs séchées", grammage: "20g", actifs: "Apaisant" },
      phase_B: { nom: "-", partie: "-", grammage: "-", actifs: "-" }
    },
    parametres_bloomlab: {
      phase_A: { temp: "45°C", temps: "2h00", agitation: "Douce" },
      phase_B: { temp: "40°C", temps: "1h00", agitation: "Très douce" }
    },
    recette_pas_a_pas: {
      batch_standard: "Cible BloomLab : 250ml de solvant + 20g de plantes",
      ingredients: {
        phase_A: ["250ml d'Huile d'Amande Douce", "20g de Calendula"],
        phase_B: ["75g de Beurre de Karité", "25g de Cire d'Abeille"]
      },
      phase_A_instructions: ["1. Macérât de Calendula à 45°C pendant 2h."],
      transition: ["Filtration du macérât et remise en cuve."],
      phase_B_instructions: ["1. Ajout du Karité et de la Cire d'Abeille à 40°C."],
      filtration_et_finition: ["1. Coulage dans des petits pots et refroidissement."]
    },
    conditionnement: "15 petits pots de 15ml.",
    mode_utilisation: "Appliquer sur les lèvres au besoin.",
    synergies_kits_internes: "Kit Immunité",
    conservation: "12 mois à température ambiante.",
    precautions: "Aucune."
  },
  {
    "plant_id": "baume_barriere_visage_peau_sensible",
    "nom_commun": "Baume Barrière Visage — Apaisement Intensif",
    "type_produit": "Baume visage anhydre",
    "categorie": "Visage",
    "peau": "Sensible",
    "age": "25-45",
    "cible": "Peaux sensibles, déshydratées, sujettes aux rougeurs, 25-45 ans",
    "solvants": {
      "phase_A": {"type": "Beurre de Karité désodorisé", "volume": "350ml", "role": "Nutrition profonde, protection occlusive douce"},
      "phase_B": {"type": "Huile d'Avoine ou Squalane végétal", "volume": "150ml", "role": "Souplesse, confort, sensation non grasse"}
    },
    "plantes": {
      "phase_A": {"nom": "Calendula", "partie": "Fleurs séchées", "grammage": "40g", "actifs": "Triterpènes, caroténoïdes (apaisement, réparation)"},
      "phase_B": {"nom": "Mauve", "partie": "Feuilles et fleurs séchées", "grammage": "20g", "actifs": "Mucilages (adoucissement, protection)"}
    },
    "parametres_bloomlab": {
      "phase_A": {"temp": "45°C", "temps": "3h00", "agitation": "Douce"},
      "phase_B": {"temp": "40°C", "temps": "2h00", "agitation": "Très douce"}
    },
    "recette_pas_a_pas": {
      "batch_standard": "Cible BloomLab : 500ml de solvant + 60g de plantes",
      "ingredients": {
        "phase_A": ["350ml de Beurre de Karité", "40g de Calendula"],
        "phase_B": ["150ml d'Huile d'Avoine ou Squalane végétal", "20g de Mauve"]
      },
      "phase_A_instructions": [
        "1. Faites fondre doucement le Beurre de Karité.",
        "2. Ajoutez le Calendula.",
        "3. Lancez le mode manuel 'OIL' à 45°C pendant 3h00."
      ],
      "transition": [
        "1. Laissez revenir vers 40°C.",
        "2. Vérifiez au toucher que la cuve est tiède, jamais chaude."
      ],
      "phase_B_instructions": [
        "1. Ajoutez l'Huile d'Avoine ou le Squalane.",
        "2. Ajoutez la Mauve.",
        "3. Lancez à 40°C pendant 2h00."
      ],
      "filtration_et_finition": [
        "1. Filtrez très finement.",
        "2. Ajoutez 10 gouttes de Vitamine E naturelle.",
        "3. Coulez en pots ambrés."
      ]
    },
    "conditionnement": "Pots ambrés 50ml.",
    "mode_utilisation": "Le soir sur peau propre, en couche fine.",
    "synergies_kits_internes": "Kit Pureté Sanguine + Kit Mix Expert Peaux",
    "conservation": "6 mois à l'abri de la chaleur et de la lumière.",
    "precautions": "Usage externe. Test cutané 24h avant usage."
  },
  {
    "plant_id": "serum_sensible_contour_yeux",
    "nom_commun": "Sérum Regard Calme — Contour des Yeux",
    "type_produit": "Sérum huileux contour des yeux",
    "categorie": "Visage",
    "peau": "Sensible",
    "age": "30-60",
    "cible": "Contour des yeux, poches, peau fine, 30-60 ans",
    "solvants": {
      "phase_A": {"type": "Huile de Jojoba", "volume": "400ml", "role": "Base légère, non comédogène"},
      "phase_B": {"type": "Huile de Pépins de Raisin", "volume": "100ml", "role": "Légèreté, toucher sec, antioxydants"}
    },
    "plantes": {
      "phase_A": {"nom": "Bleuet", "partie": "Fleurs séchées", "grammage": "30g", "actifs": "Flavonoïdes (confort oculaire, apaisement)"},
      "phase_B": {"nom": "Camomille matricaire", "partie": "Fleurs séchées", "grammage": "15g", "actifs": "Bisabolol, apigénine (anti-irritation)"}
    },
    "parametres_bloomlab": {
      "phase_A": {"temp": "40°C", "temps": "2h00", "agitation": "Très douce"},
      "phase_B": {"temp": "38°C", "temps": "1h30", "agitation": "Très douce"}
    },
    "recette_pas_a_pas": {
      "batch_standard": "500ml de solvant + 45g de plantes",
      "ingredients": {
        "phase_A": ["400ml d'Huile de Jojoba", "30g de Bleuet"],
        "phase_B": ["100ml d'Huile de Pépins de Raisin", "15g de Camomille matricaire"]
      },
      "phase_A_instructions": [
        "Infusez le Bleuet à basse température.",
        "Maintenez 40°C pendant 2h00."
      ],
      "transition": [
        "Laissez retomber à 38-40°C avant la phase suivante."
      ],
      "phase_B_instructions": [
        "Ajoutez la Camomille matricaire.",
        "Poursuivez à 38°C pendant 1h30."
      ],
      "filtration_et_finition": [
        "Filtrez très soigneusement.",
        "Ajoutez 8 gouttes de Vitamine E."
      ]
    },
    "conditionnement": "Flacons compte-gouttes 15ml.",
    "mode_utilisation": "1 goutte par contour, le soir uniquement.",
    "synergies_kits_internes": "Kit Mix Expert Peaux",
    "conservation": "4 à 6 mois.",
    "precautions": "Éviter tout contact direct avec l'œil."
  },
  {
    "plant_id": "lait_corporel_peau_tres_seche",
    "nom_commun": "Lait Corps Confort — Peau Très Sèche",
    "type_produit": "Lait corporel émulsionné",
    "categorie": "Corps",
    "peau": "Sèche",
    "age": "Sénior",
    "cible": "Peaux sèches, inconfort, tiraillements, adultes et seniors",
    "solvants": {
      "phase_A": {"type": "Hydrolat de Rose", "volume": "300ml", "role": "Base aqueuse apaisante"},
      "phase_B": {"type": "Huile d'Avocat", "volume": "150ml", "role": "Nourrissante, relipidante"}
    },
    "plantes": {
      "phase_A": {"nom": "Avoine", "partie": "Flocons finement broyés", "grammage": "30g", "actifs": "Bêta-glucanes, avenanthramides (confort cutané)"},
      "phase_B": {"nom": "Calendula", "partie": "Fleurs séchées", "grammage": "20g", "actifs": "Apaisement, barrière cutanée"}
    },
    "parametres_bloomlab": {
      "phase_A": {"temp": "55°C", "temps": "2h00", "agitation": "Moyenne"},
      "phase_B": {"temp": "45°C", "temps": "2h00", "agitation": "Douce"}
    },
    "recette_pas_a_pas": {
      "batch_standard": "450ml de base + 50g de plantes",
      "ingredients": {
        "phase_A": ["300ml d'Hydrolat de Rose", "30g d'Avoine"],
        "phase_B": ["150ml d'Huile d'Avocat", "20g de Calendula"]
      },
      "phase_A_instructions": [
        "Infusion aqueuse douce à 55°C.",
        "Filtrez finement."
      ],
      "transition": [
        "Laissez descendre à 45°C avant ajout de la phase grasse."
      ],
      "phase_B_instructions": [
        "Ajoutez l'huile d'Avocat et le Calendula.",
        "Maintenez 45°C pendant 2h00."
      ],
      "filtration_et_finition": [
        "Homogénéisez.",
        "Ajoutez un conservateur adapté aux émulsions si nécessaire."
      ]
    },
    "conditionnement": "Flacons pompe 200ml.",
    "mode_utilisation": "Après la douche, sur peau légèrement humide.",
    "synergies_kits_internes": "Kit Renaissance",
    "conservation": "Selon système conservateur, à valider en test microbiologique.",
    "precautions": "Produit aqueux : hygiène stricte indispensable."
  },
  {
    "plant_id": "huile_buste_feminite",
    "nom_commun": "Huile Buste & Décolleté — Éclat Souple",
    "type_produit": "Huile corporelle leave-on",
    "categorie": "Corps",
    "peau": "Mature",
    "age": "35-65",
    "cible": "Décolleté, buste, peau mature, 35-65 ans",
    "solvants": {
      "phase_A": {"type": "Huile de Macadamia", "volume": "350ml", "role": "Souplesse, toucher soyeux"},
      "phase_B": {"type": "Huile de Rose musquée", "volume": "150ml", "role": "Régénération, confort visuel de la peau"}
    },
    "plantes": {
      "phase_A": {"nom": "Rose", "partie": "Pétales séchés", "grammage": "25g", "actifs": "Polyphénols, confort sensoriel"},
      "phase_B": {"nom": "Immortelle", "partie": "Fleurs séchées", "grammage": "10g", "actifs": "Hélichrysum, soutien aspect cutané"}
    },
    "parametres_bloomlab": {
      "phase_A": {"temp": "40°C", "temps": "3h00", "agitation": "Très douce"},
      "phase_B": {"temp": "38°C", "temps": "2h00", "agitation": "Très douce"}
    },
    "recette_pas_a_pas": {
      "batch_standard": "500ml de solvant + 35g de plantes",
      "ingredients": {
        "phase_A": ["350ml d'Huile de Macadamia", "25g de Rose"],
        "phase_B": ["150ml d'Huile de Rose musquée", "10g d'Immortelle"]
      },
      "phase_A_instructions": ["Infusion douce 3h00 à 40°C."],
      "transition": ["Repos 20 minutes."],
      "phase_B_instructions": ["Ajout phase B à 38°C pendant 2h00."],
      "filtration_et_finition": ["Filtration fine", "10 gouttes de Vitamine E"]
    },
    "conditionnement": "Flacons 100ml.",
    "mode_utilisation": "Matin ou soir sur décolleté propre.",
    "synergies_kits_internes": "Kit Mix Expert Peaux",
    "conservation": "6 mois.",
    "precautions": "Éviter toute exposition solaire immédiate si huiles photosensibilisantes présentes."
  },
  {
    "plant_id": "serum_jambes_legeres",
    "nom_commun": "Sérum Jambes Légères — Circulation Confort",
    "type_produit": "Gel huileux de massage",
    "categorie": "Corps",
    "peau": "Toutes",
    "age": "25-60",
    "cible": "Jambes lourdes, station debout, 25-60 ans",
    "solvants": {
      "phase_A": {"type": "Huile de Pépins de Raisin", "volume": "300ml", "role": "Base légère"},
      "phase_B": {"type": "Gel d'Aloe vera stabilisé", "volume": "200ml", "role": "Sensation fraîche, glisse"}
    },
    "plantes": {
      "phase_A": {"nom": "Vigne rouge", "partie": "Feuilles séchées", "grammage": "30g", "actifs": "Anthocyanes, soutien microcirculation"},
      "phase_B": {"nom": "Marron d'Inde", "partie": "Coque ou extrait préparé", "grammage": "10g", "actifs": "Aescine (soutien circulatoire)"}
    },
    "parametres_bloomlab": {
      "phase_A": {"temp": "45°C", "temps": "2h30", "agitation": "Moyenne"},
      "phase_B": {"temp": "40°C", "temps": "1h30", "agitation": "Douce"}
    },
    "recette_pas_a_pas": {
      "batch_standard": "500ml de base + 40g de plantes",
      "ingredients": {
        "phase_A": ["300ml d'Huile de Pépins de Raisin", "30g de Vigne rouge"],
        "phase_B": ["200ml de Gel d'Aloe vera stabilisé", "10g de Marron d'Inde"]
      },
      "phase_A_instructions": ["Infusion huileuse 45°C."],
      "transition": ["Ajout de la base gel à température abaissée."],
      "phase_B_instructions": ["Homogénéisation douce à 40°C."],
      "filtration_et_finition": ["Filtration si besoin", "Conservateur adapté au gel"]
    },
    "conditionnement": "Pompe 150ml.",
    "mode_utilisation": "Massage ascendant des chevilles vers les cuisses.",
    "synergies_kits_internes": "Kit Renaissance",
    "conservation": "Selon système conservateur.",
    "precautions": "Ne remplace pas un traitement veineux prescrit."
  },
  {
    "plant_id": "baume_mains_reparation",
    "nom_commun": "Baume Mains Réparation — Barrière Renforcée",
    "type_produit": "Baume mains anhydre",
    "categorie": "Mains & Pieds",
    "peau": "Sèche",
    "age": "20-70",
    "cible": "Mains sèches, lavages répétés, 20-70 ans",
    "solvants": {
      "phase_A": {"type": "Beurre de Cacao", "volume": "300ml", "role": "Film protecteur, confort"},
      "phase_B": {"type": "Huile de Chanvre", "volume": "200ml", "role": "Relipidant, souplesse"}
    },
    "plantes": {
      "phase_A": {"nom": "Plantain", "partie": "Feuilles séchées", "grammage": "20g", "actifs": "Allantoïne, apaisement"},
      "phase_B": {"nom": "Camomille romaine", "partie": "Fleurs séchées", "grammage": "10g", "actifs": "Confort cutané"}
    },
    "parametres_bloomlab": {
      "phase_A": {"temp": "45°C", "temps": "2h00", "agitation": "Douce"},
      "phase_B": {"temp": "40°C", "temps": "1h30", "agitation": "Très douce"}
    },
    "recette_pas_a_pas": {
      "batch_standard": "500ml de base + 30g de plantes",
      "ingredients": {
        "phase_A": ["300ml de Beurre de Cacao", "20g de Plantain"],
        "phase_B": ["200ml d'Huile de Chanvre", "10g de Camomille romaine"]
      },
      "phase_A_instructions": ["Infusion lente."],
      "transition": ["Repos tiède."],
      "phase_B_instructions": ["Ajout phase B."],
      "filtration_et_finition": ["Filtration fine", "Vitamine E"]
    },
    "conditionnement": "Pots 50ml.",
    "mode_utilisation": "Après lavage des mains et le soir.",
    "synergies_kits_internes": "Kit Mix Expert Peaux",
    "conservation": "6 mois.",
    "precautions": "Usage externe uniquement."
  },
  {
    "plant_id": "soin_cuir_chevelu_doux_enfant",
    "nom_commun": "Soin Cuir Chevelu Doux — Enfant",
    "type_produit": "Huile capillaire légère",
    "categorie": "Cheveux",
    "peau": "Sensible",
    "age": "Enfant",
    "cible": "Enfants 3-12 ans, cuir chevelu sensible",
    "solvants": {
      "phase_A": {"type": "Huile de Tournesol oléique", "volume": "400ml", "role": "Douceur, stabilité"},
      "phase_B": {"type": "Huile de Jojoba", "volume": "100ml", "role": "Tolérance, toucher sec"}
    },
    "plantes": {
      "phase_A": {"nom": "Calendula", "partie": "Fleurs séchées", "grammage": "20g", "actifs": "Apaisement"},
      "phase_B": {"nom": "Camomille", "partie": "Fleurs séchées", "grammage": "10g", "actifs": "Confort, douceur"}
    },
    "parametres_bloomlab": {
      "phase_A": {"temp": "38°C", "temps": "1h30", "agitation": "Très douce"},
      "phase_B": {"temp": "35°C", "temps": "1h00", "agitation": "Très douce"}
    },
    "recette_pas_a_pas": {
      "batch_standard": "500ml de base + 30g de plantes",
      "ingredients": {
        "phase_A": ["400ml d'Huile de Tournesol oléique", "20g de Calendula"],
        "phase_B": ["100ml d'Huile de Jojoba", "10g de Camomille"]
      },
      "phase_A_instructions": ["Extraction à très basse température."],
      "transition": ["Refroidissement doux."],
      "phase_B_instructions": ["Ajout phase B."],
      "filtration_et_finition": ["Filtration fine", "Sans parfum"]
    },
    "conditionnement": "Flacons 30-50ml.",
    "mode_utilisation": "Très petite quantité, sur zones sèches uniquement.",
    "synergies_kits_internes": "Kit Pureté Sanguine",
    "conservation": "4 à 6 mois.",
    "precautions": "Pas d'huiles essentielles. Valider avec un professionnel en cas d'eczéma."
  },
  {
    "plant_id": "creme_nuit_anti_signes_age",
    "nom_commun": "Crème Nuit — Peau Maturée",
    "type_produit": "Crème visage émulsionnée",
    "categorie": "Visage",
    "peau": "Mature",
    "age": "40-70",
    "cible": "Peaux matures, perte de densité, 40-70 ans",
    "solvants": {
      "phase_A": {"type": "Hydrolat de Rose", "volume": "250ml", "role": "Base aqueuse précieuse"},
      "phase_B": {"type": "Huile d'Argan", "volume": "150ml", "role": "Nourrissante, confort"}
    },
    "plantes": {
      "phase_A": {"nom": "Grenade", "partie": "Peaux séchées/extrait", "grammage": "20g", "actifs": "Punicalagines, antioxydants"},
      "phase_B": {"nom": "Rose musquée", "partie": "Graines", "grammage": "20g", "actifs": "Acides gras, régénération visuelle"}
    },
    "parametres_bloomlab": {
      "phase_A": {"temp": "55°C", "temps": "2h00", "agitation": "Moyenne"},
      "phase_B": {"temp": "45°C", "temps": "2h00", "agitation": "Douce"}
    },
    "recette_pas_a_pas": {
      "batch_standard": "400ml de base + 40g de plantes",
      "ingredients": {
        "phase_A": ["250ml d'Hydrolat de Rose", "20g de Grenade"],
        "phase_B": ["150ml d'Huile d'Argan", "20g de Rose musquée"]
      },
      "phase_A_instructions": ["Infusion aqueuse."],
      "transition": ["Émulsification à température contrôlée."],
      "phase_B_instructions": ["Phase grasse intégrée doucement."],
      "filtration_et_finition": ["Conservateur cosmétique adapté", "Vitamine E"]
    },
    "conditionnement": "Airless 50ml.",
    "mode_utilisation": "Le soir, sur peau nettoyée.",
    "synergies_kits_internes": "Kit Renaissance",
    "conservation": "À tester selon conservateur.",
    "precautions": "Éviter les yeux."
  },
  {
    "plant_id": "huile_post_soleil_apaisante",
    "nom_commun": "Huile Après-Soleil — Confort Botanique",
    "type_produit": "Huile corporelle apaisante",
    "categorie": "Corps",
    "peau": "Toutes",
    "age": "18-55",
    "cible": "Après soleil, peau échauffée, 18-55 ans",
    "solvants": {
      "phase_A": {"type": "Huile de Coco fractionnée", "volume": "350ml", "role": "Glisse, légèreté"},
      "phase_B": {"type": "Huile de Jojoba", "volume": "150ml", "role": "Stabilité, toucher sec"}
    },
    "plantes": {
      "phase_A": {"nom": "Aloe vera", "partie": "Gel concentré préparé", "grammage": "25g", "actifs": "Confort, hydratation"},
      "phase_B": {"nom": "Calendula", "partie": "Fleurs séchées", "grammage": "15g", "actifs": "Apaisement"}
    },
    "parametres_bloomlab": {
      "phase_A": {"temp": "35°C", "temps": "1h30", "agitation": "Douce"},
      "phase_B": {"temp": "35°C", "temps": "1h30", "agitation": "Très douce"}
    },
    "recette_pas_a_pas": {
      "batch_standard": "500ml de base + 40g de plantes",
      "ingredients": {
        "phase_A": ["350ml d'Huile de Coco fractionnée", "25g d'Aloe vera préparé"],
        "phase_B": ["150ml d'Huile de Jojoba", "15g de Calendula"]
      },
      "phase_A_instructions": ["Préparation à basse température."],
      "transition": ["Repos tiède."],
      "phase_B_instructions": ["Ajout Calendula puis homogénéisation."],
      "filtration_et_finition": ["Filtrer si nécessaire", "Vitamine E"]
    },
    "conditionnement": "Flacons pompe 100ml.",
    "mode_utilisation": "Après la douche, sur peau refroidie.",
    "synergies_kits_internes": "Kit Mix Expert Peaux",
    "conservation": "6 mois.",
    "precautions": "Ne pas appliquer sur peau brûlée."
  },
  {
    "plant_id": "serum_barbe_et_peau_homme",
    "nom_commun": "Sérum Barbe & Peau — Confort Masculin",
    "type_produit": "Huile visage/barbe",
    "categorie": "Visage",
    "peau": "Mixte",
    "age": "20-50",
    "cible": "Hommes, peau mixte à sèche, 20-50 ans",
    "solvants": {
      "phase_A": {"type": "Huile de Chanvre", "volume": "350ml", "role": "Équilibre lipidique"},
      "phase_B": {"type": "Jojoba", "volume": "150ml", "role": "Tolérance, finition sèche"}
    },
    "plantes": {
      "phase_A": {"nom": "Romarin", "partie": "Feuilles séchées", "grammage": "25g", "actifs": "Tonique botanique"},
      "phase_B": {"nom": "Calendula", "partie": "Fleurs séchées", "grammage": "15g", "actifs": "Apaisement"}
    },
    "parametres_bloomlab": {
      "phase_A": {"temp": "45°C", "temps": "2h00", "agitation": "Moyenne"},
      "phase_B": {"temp": "40°C", "temps": "1h30", "agitation": "Douce"}
    },
    "recette_pas_a_pas": {
      "batch_standard": "500ml de base + 40g de plantes",
      "ingredients": {
        "phase_A": ["350ml d'Huile de Chanvre", "25g de Romarin"],
        "phase_B": ["150ml de Jojoba", "15g de Calendula"]
      },
      "phase_A_instructions": ["Infusion huileuse classique."],
      "transition": ["Repos puis ajout phase B."],
      "phase_B_instructions": ["Homogénéiser."],
      "filtration_et_finition": ["Filtration fine", "Vitamine E"]
    },
    "conditionnement": "Flacons 50-100ml.",
    "mode_utilisation": "Quelques gouttes sur visage propre et barbe.",
    "synergies_kits_internes": "Kit Renaissance",
    "conservation": "6 mois.",
    "precautions": "Éviter les peaux très réactives sans test préalable."
  },
  {
    "plant_id": "gel_gommage_doux_visage",
    "nom_commun": "Gel Gommage Doux — Renouvellement",
    "type_produit": "Gel exfoliant doux",
    "categorie": "Visage",
    "peau": "Toutes",
    "age": "18-45",
    "cible": "Peaux ternes, irrégularités, 18-45 ans",
    "solvants": {
      "phase_A": {"type": "Gel d'Aloe vera", "volume": "400ml", "role": "Base fraîche"},
      "phase_B": {"type": "Glycérine végétale", "volume": "100ml", "role": "Glisse, humectant"}
    },
    "plantes": {
      "phase_A": {"nom": "Papaye", "partie": "Extrait enzymatique", "grammage": "10g", "actifs": "Papain (renouvellement doux)"},
      "phase_B": {"nom": "Avoine", "partie": "Poudre très fine", "grammage": "15g", "actifs": "Confort et douceur"}
    },
    "parametres_bloomlab": {
      "phase_A": {"temp": "35°C", "temps": "1h00", "agitation": "Douce"},
      "phase_B": {"temp": "30°C", "temps": "45min", "agitation": "Très douce"}
    },
    "recette_pas_a_pas": {
      "batch_standard": "500ml de base + 25g de plantes",
      "ingredients": {
        "phase_A": ["400ml de Gel d'Aloe vera", "10g d'Extrait de Papaye"],
        "phase_B": ["100ml de Glycérine végétale", "15g d'Avoine fine"]
      },
      "phase_A_instructions": ["Préparation basse température."],
      "transition": ["Ajout progressif de la poudre."],
      "phase_B_instructions": ["Homogénéisation lente."],
      "filtration_et_finition": ["Pas de filtration si gel fini homogène", "Conservateur adapté"]
    },
    "conditionnement": "Tube 100ml.",
    "mode_utilisation": "1 fois par semaine, massage très doux.",
    "synergies_kits_internes": "Kit Mix Expert Peaux",
    "conservation": "Selon conservateur.",
    "precautions": "Ne pas utiliser sur peau irritée."
  },
  {
    "plant_id": "baume_levres_naturel",
    "nom_commun": "Baume Lèvres — Réparateur",
    "type_produit": "Baume lèvres anhydre",
    "categorie": "Visage",
    "peau": "Toutes",
    "age": "15-70",
    "cible": "Lèvres sèches, froid, vent, 15-70 ans",
    "solvants": {
      "phase_A": {"type": "Beurre de Cacao", "volume": "250ml", "role": "Protection"},
      "phase_B": {"type": "Cire de Candelilla", "volume": "50ml", "role": "Tenue, film léger"}
    },
    "plantes": {
      "phase_A": {"nom": "Calendula", "partie": "Pétales séchés", "grammage": "10g", "actifs": "Apaisement"},
      "phase_B": {"nom": "Vanille", "partie": "Gousse infusée", "grammage": "5g", "actifs": "Odeur douce, confort"}
    },
    "parametres_bloomlab": {
      "phase_A": {"temp": "40°C", "temps": "1h30", "agitation": "Très douce"},
      "phase_B": {"temp": "38°C", "temps": "1h00", "agitation": "Très douce"}
    },
    "recette_pas_a_pas": {
      "batch_standard": "300ml de base + 15g de plantes",
      "ingredients": {
        "phase_A": ["250ml de Beurre de Cacao", "10g de Calendula"],
        "phase_B": ["50ml de Cire de Candelilla", "5g de Vanille"]
      },
      "phase_A_instructions": ["Fusion et extraction lente."],
      "transition": ["Ajout de la cire."],
      "phase_B_instructions": ["Infusion brève."],
      "filtration_et_finition": ["Couler en sticks", "Sans parfum ajouté"]
    },
    "conditionnement": "Sticks 5-10ml.",
    "mode_utilisation": "Au besoin dans la journée.",
    "synergies_kits_internes": "Kit Pureté Sanguine",
    "conservation": "6 mois.",
    "precautions": "Sans huiles essentielles sur les lèvres."
  },
  {
    "plant_id": "huile_massage_femmes_enceintes",
    "nom_commun": "Huile Massage Maternité — Confort",
    "type_produit": "Huile corporelle",
    "categorie": "Corps",
    "peau": "Toutes",
    "age": "Maternité",
    "cible": "Femmes enceintes, grossesse, peau qui tire",
    "solvants": {
      "phase_A": {"type": "Huile d'Amande douce", "volume": "400ml", "role": "Tolérance, souplesse"},
      "phase_B": {"type": "Huile de Calendula", "volume": "100ml", "role": "Apaisement"}
    },
    "plantes": {
      "phase_A": {"nom": "Mauve", "partie": "Fleurs séchées", "grammage": "15g", "actifs": "Mucilages, confort"},
      "phase_B": {"nom": "Calendula", "partie": "Fleurs séchées", "grammage": "15g", "actifs": "Apaisement"}
    },
    "parametres_bloomlab": {
      "phase_A": {"temp": "38°C", "temps": "1h30", "agitation": "Très douce"},
      "phase_B": {"temp": "38°C", "temps": "1h00", "agitation": "Très douce"}
    },
    "recette_pas_a_pas": {
      "batch_standard": "500ml de base + 30g de plantes",
      "ingredients": {
        "phase_A": ["400ml d'Huile d'Amande douce", "15g de Mauve"],
        "phase_B": ["100ml d'Huile de Calendula", "15g de Calendula"]
      },
      "phase_A_instructions": ["Extraction douce."],
      "transition": ["Repos à basse chaleur."],
      "phase_B_instructions": ["Ajout phase B."],
      "filtration_et_finition": ["Filtration fine", "Sans huiles essentielles"]
    },
    "conditionnement": "Flacons 100ml.",
    "mode_utilisation": "Sur ventre, hanches et seins, selon tolérance.",
    "synergies_kits_internes": "Kit Renaissance",
    "conservation": "6 mois.",
    "precautions": "Grossesse : validation préalable recommandée avec professionnel."
  },
  {
    "plant_id": "huile_apaisante_apres_epilation",
    "nom_commun": "Huile Après-Épilation — Peau Calme",
    "type_produit": "Huile apaisante",
    "categorie": "Corps",
    "peau": "Sensible",
    "age": "15-50",
    "cible": "Après rasage/épilation, rougeurs, 15-50 ans",
    "solvants": {
      "phase_A": {"type": "Huile de Jojoba", "volume": "400ml", "role": "Tolérance"},
      "phase_B": {"type": "Huile de Tournesol oléique", "volume": "100ml", "role": "Douceur"}
    },
    "plantes": {
      "phase_A": {"nom": "Calendula", "partie": "Fleurs séchées", "grammage": "20g", "actifs": "Apaisement"},
      "phase_B": {"nom": "Camomille", "partie": "Fleurs séchées", "grammage": "10g", "actifs": "Confort"}
    },
    "parametres_bloomlab": {
      "phase_A": {"temp": "35°C", "temps": "1h30", "agitation": "Très douce"},
      "phase_B": {"temp": "35°C", "temps": "1h00", "agitation": "Très douce"}
    },
    "recette_pas_a_pas": {
      "batch_standard": "500ml de base + 30g de plantes",
      "ingredients": {
        "phase_A": ["400ml d'Huile de Jojoba", "20g de Calendula"],
        "phase_B": ["100ml d'Huile de Tournesol oléique", "10g de Camomille"]
      },
      "phase_A_instructions": ["Infusion courte."],
      "transition": ["Repos à température basse."],
      "phase_B_instructions": ["Ajout phase B."],
      "filtration_et_finition": ["Filtration fine", "Vitamine E"]
    },
    "conditionnement": "Flacons 50ml.",
    "mode_utilisation": "Immédiatement après l'épilation sur peau propre.",
    "synergies_kits_internes": "Kit Mix Expert Peaux",
    "conservation": "6 mois.",
    "precautions": "Éviter si peau lésée."
  },
  {
    "plant_id": "serum_senior_main_et_ongles",
    "nom_commun": "Sérum Mains & Ongles — Réparation Senior",
    "type_produit": "Huile de soin",
    "categorie": "Mains & Pieds",
    "peau": "Sèche",
    "age": "50-80",
    "cible": "Mains fragiles, ongles mous, 50-80 ans",
    "solvants": {
      "phase_A": {"type": "Huile de Ricin", "volume": "300ml", "role": "Fortifiant, filmogène"},
      "phase_B": {"type": "Huile de Jojoba", "volume": "200ml", "role": "Équilibre, pénétration"}
    },
    "plantes": {
      "phase_A": {"nom": "Prêle", "partie": "Tiges séchées", "grammage": "25g", "actifs": "Silice (support kératinique)"},
      "phase_B": {"nom": "Ortie", "partie": "Feuilles séchées", "grammage": "15g", "actifs": "Minéraux, confort"}
    },
    "parametres_bloomlab": {
      "phase_A": {"temp": "45°C", "temps": "2h30", "agitation": "Douce"},
      "phase_B": {"temp": "40°C", "temps": "1h30", "agitation": "Douce"}
    },
    "recette_pas_a_pas": {
      "batch_standard": "500ml de base + 40g de plantes",
      "ingredients": {
        "phase_A": ["300ml d'Huile de Ricin", "25g de Prêle"],
        "phase_B": ["200ml d'Huile de Jojoba", "15g d'Ortie"]
      },
      "phase_A_instructions": ["Infusion prolongée."],
      "transition": ["Repos puis phase B."],
      "phase_B_instructions": ["Mélange délicat."],
      "filtration_et_finition": ["Filtration très fine", "Vitamine E"]
    },
    "conditionnement": "Flacons 30ml.",
    "mode_utilisation": "Masser mains, cuticules et ongles 2 fois par jour.",
    "synergies_kits_internes": "Kit Renaissance",
    "conservation": "6 mois.",
    "precautions": "Ne pas substituer à une prise en charge dermatologique si mycose."
  },
  {
    "plant_id": "brume_visage_adolescente",
    "nom_commun": "Brume Visage — Peau Jeune",
    "type_produit": "Brume aqueuse",
    "categorie": "Visage",
    "peau": "Mixte",
    "age": "Ado",
    "cible": "Adolescentes, 13-18 ans, peau mixte à grasse",
    "solvants": {
      "phase_A": {"type": "Hydrolat de Lavande", "volume": "400ml", "role": "Fraîcheur, confort"},
      "phase_B": {"type": "Eau distillée", "volume": "100ml", "role": "Diluant neutre"}
    },
    "plantes": {
      "phase_A": {"nom": "Thym doux", "partie": "Sommités fleuries", "grammage": "10g", "actifs": "Soutien peau grasse"},
      "phase_B": {"nom": "Camomille", "partie": "Fleurs séchées", "grammage": "10g", "actifs": "Apaisement"}
    },
    "parametres_bloomlab": {
      "phase_A": {"temp": "40°C", "temps": "1h00", "agitation": "Douce"},
      "phase_B": {"temp": "35°C", "temps": "45min", "agitation": "Très douce"}
    },
    "recette_pas_a_pas": {
      "batch_standard": "500ml de base + 20g de plantes",
      "ingredients": {
        "phase_A": ["400ml d'Hydrolat de Lavande", "10g de Thym doux"],
        "phase_B": ["100ml d'Eau distillée", "10g de Camomille"]
      },
      "phase_A_instructions": ["Extraction très douce."],
      "transition": ["Repos."],
      "phase_B_instructions": ["Ajout phase B."],
      "filtration_et_finition": ["Filtration très fine", "Conservateur adapté"]
    },
    "conditionnement": "Sprays 100ml.",
    "mode_utilisation": "Matin ou soir, sur peau propre.",
    "synergies_kits_internes": "Kit Pureté Sanguine",
    "conservation": "Selon conservateur.",
    "precautions": "Brume aqueuse = hygiène irréprochable."
  },
  {
    "plant_id": "baume_pieds_reparateur",
    "nom_commun": "Baume Pieds — Réparation Intensive",
    "type_produit": "Baume pieds anhydre",
    "categorie": "Mains & Pieds",
    "peau": "Sèche",
    "age": "18-75",
    "cible": "Talons secs, pieds fatigués, sportifs, 18-75 ans",
    "solvants": {
      "phase_A": {"type": "Beurre de Mangue", "volume": "300ml", "role": "Souplesse, confort"},
      "phase_B": {"type": "Huile de Coco fractionnée", "volume": "200ml", "role": "Glisse, stabilité"}
    },
    "plantes": {
      "phase_A": {"nom": "Plantain", "partie": "Feuilles séchées", "grammage": "20g", "actifs": "Apaisement"},
      "phase_B": {"nom": "Calendula", "partie": "Fleurs séchées", "grammage": "20g", "actifs": "Réparation visuelle"}
    },
    "parametres_bloomlab": {
      "phase_A": {"temp": "45°C", "temps": "2h00", "agitation": "Douce"},
      "phase_B": {"temp": "40°C", "temps": "1h30", "agitation": "Très douce"}
    },
    "recette_pas_a_pas": {
      "batch_standard": "500ml de base + 40g de plantes",
      "ingredients": {
        "phase_A": ["300ml de Beurre de Mangue", "20g de Plantain"],
        "phase_B": ["200ml d'Huile de Coco fractionnée", "20g de Calendula"]
      },
      "phase_A_instructions": ["Fusion et extraction lente."],
      "transition": ["Repos tiède."],
      "phase_B_instructions": ["Ajout phase B."],
      "filtration_et_finition": ["Filtration fine", "Vitamine E"]
    },
    "conditionnement": "Pots 50ml.",
    "mode_utilisation": "Le soir, sous chaussettes coton.",
    "synergies_kits_internes": "Kit Mix Expert Peaux",
    "conservation": "6 mois.",
    "precautions": "Usage externe uniquement."
  }
];
