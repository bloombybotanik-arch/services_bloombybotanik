export interface PlantData {
  plant_id: string;
  nom_commun: string;
  nom_latin: string;
  partie_utilisee: string;
  famille_bloom: string;
  terrains_cibles: string[];
  actifs_cles: { nom: string; polarite: string }[];
  preuve_scientifique: string;
  pourquoi_bloomlab: {
    probleme_traditionnel: string;
    phase_A: { temp: string; temps?: string; solvant: string; cible: string };
    phase_B: { temp: string; temps?: string; solvant: string; cible: string };
    resultat?: string;
  };
  recette_pas_a_pas?: {
    batch_standard: string;
    ingredients: {
      phase_A: string[];
      phase_B: string[];
    };
    preparation: string[];
    phase_A_instructions: string[];
    transition: string[];
    phase_B_instructions: string[];
    filtration_et_finition: string[];
  };
  usage_standard?: {
    mode_administration: string;
    posologie_quotidienne: string;
    dose_maximale: string;
    duree_utilisation: string;
    contre_indications: string[];
  };
  socle_synergique?: {
    cofacteurs_complements: { nom: string; dose: string; role: string }[];
    leviers_du_vivant: { nom: string; frequence: string; role: string }[];
  };
  note_expert?: string;
  convergence_ancestrale: string;
  synergies_recommandees: string[];
  precautions?: string;
  additional_recipes?: any[];
}

export const plantsDatabase: PlantData[] = [
  {
    plant_id: "chaga_vitality",
    nom_commun: "Chaga (Diamant de la Forêt)",
    nom_latin: "Inonotus obliquus",
    partie_utilisee: "Sclérote (corps stérile) réduit en poudre fine",
    famille_bloom: "Bouclier (Modulateur Immunitaire)",
    terrains_cibles: ["T3 (Immunité)", "T8 (Inflammation)", "T9 (Vitalité)"],
    actifs_cles: [
      { nom: "Bêta-glucanes (1-3, 1-6)", polarite: "Hydrosoluble" },
      { nom: "Acide bétulinique", polarite: "Liposoluble" },
      { nom: "Mélanine / Polyphénols", polarite: "Hydrosoluble" },
      { nom: "Superoxyde Dismutase (SOD)", polarite: "Enzymatique" }
    ],
    preuve_scientifique: "L'un des plus hauts scores ORAC au monde. L'acide bétulinique (issu du bouleau) est activé par le Chaga pour induire l'apoptose des cellules anormales tout en régulant les cytokines inflammatoires.",
    pourquoi_bloomlab: {
      probleme_traditionnel: "Les bêta-glucanes sont piégés dans une matrice de chitine ultra-résistante. Une simple tisane n'extrait que 15% des actifs. L'acide bétulinique, lui, ne sort qu'en phase alcoolique à température contrôlée.",
      phase_A: { temp: "80°C", temps: "4h00", solvant: "Eau purifiée", cible: "Déstructuration de la chitine et libération des polysaccharides" },
      phase_B: { temp: "55°C", temps: "3h00", solvant: "Alcool bio 96°", cible: "Extraction de l'acide bétulinique et des triterpènes" },
      resultat: "Un Totum 'Dual-Extract' concentré, biodisponible immédiatement, capturant la fraction hydrosoluble et liposoluble du champignon."
    },
    convergence_ancestrale: "Utilisé depuis le XVIe siècle en Sibérie et dans les pays nordiques comme tonique universel et soutien immunitaire majeur.",
    synergies_recommandees: ["Bouleau", "Églantier (Vitamine C)", "Gingembre"],
    precautions: "Consultez un médecin en cas de prise d'anticoagulants ou de traitement contre le diabète (effet hypoglycémiant potentiel).",
    usage_standard: {
      mode_administration: "Extraction liquide (Double extrait)",
      posologie_quotidienne: "20 gouttes (soit 1ml) par jour",
      dose_maximale: "40 gouttes (soit 2ml) par jour",
      duree_utilisation: "Cure de 21 jours, pause de 7 jours",
      contre_indications: ["Maladies auto-immunes actives", "Avant une chirurgie", "Troubles de la coagulation"]
    }
  },
  {
    plant_id: "cordyceps_performance",
    nom_commun: "Cordyceps (L'Or de l'Himalaya)",
    nom_latin: "Cordyceps sinensis / militaris",
    partie_utilisee: "Mycélium et corps de fructification en poudre",
    famille_bloom: "Moteur (Adaptogène Énergétique)",
    terrains_cibles: ["T2 (Énergie)", "T5 (Poumons)", "T10 (Performance)"],
    actifs_cles: [
      { nom: "Cordycépine (3'-désoxyadénosine)", polarite: "Hydrosoluble" },
      { nom: "Adénosine", polarite: "Hydrosoluble" },
      { nom: "Acide cordycépique", polarite: "Hydrosoluble" },
      { nom: "Ergostérol", polarite: "Liposoluble" }
    ],
    preuve_scientifique: "Augmente significativement la production d'ATP cellulaire et l'utilisation de l'oxygène par les mitochondries. Optimise la réponse au stress en régulant l'axe HPA.",
    pourquoi_bloomlab: {
      probleme_traditionnel: "La cordycépine est fragile. Une extraction à l'eau bouillante peut dégrader une partie des nucléosides. Le ratio eau/alcool doit être précis pour maintenir la stabilité de l'adénosine.",
      phase_A: { temp: "65°C", temps: "3h00", solvant: "Eau distillée", cible: "Libération douce des nucléosides et cordycépine" },
      phase_B: { temp: "45°C", temps: "2h00", solvant: "Alcool bio 96°", cible: "Extraction des stérols et stabilisation du mélange" },
      resultat: "Une puissance énergétique décuplée, idéale pour la récupération sportive et la fatigue chronique."
    },
    convergence_ancestrale: "Trésor de la médecine tibétaine, réservé autrefois aux empereurs pour la longévité et la vigueur.",
    synergies_recommandees: ["Rhodiola", "Ginseng", "Ashwagandha"],
    precautions: "Éviter en cas de maladies auto-immunes (stimulation immunitaire active)."
  },
  {
    plant_id: "hericium_focus",
    nom_commun: "Hericium (Crinière de Lion)",
    nom_latin: "Hericium erinaceus",
    partie_utilisee: "Corps de fructification séché et réduit en poudre",
    famille_bloom: "Architecte (Régénérateur Nerveux)",
    terrains_cibles: ["T6 (Système Nerveux)", "T7 (Cognition)", "T1 (Estomac)"],
    actifs_cles: [
      { nom: "Héricénones", polarite: "Liposoluble" },
      { nom: "Érinacines", polarite: "Hydrosoluble/Liposoluble" },
      { nom: "Bêta-glucanes spécifique", polarite: "Hydrosoluble" }
    ],
    preuve_scientifique: "Seul composé naturel capable de stimuler la synthèse du NGF (Nerve Growth Factor), favorisant la neurogenèse et la réparation de la gaine de myéline.",
    pourquoi_bloomlab: {
      probleme_traditionnel: "Les héricénones (cerveau) sont lipophiles, alors que les polysaccharides (estomac) sont hydrophiles. Une simple poudre ingérée n'offre pas une concentration suffisante pour traverser la barrière hémato-encéphalique.",
      phase_A: { temp: "75°C", temps: "3h30", solvant: "Eau distillée + Glycérine", cible: "Extraction des polysaccharides et protection muqueuse" },
      phase_B: { temp: "55°C", temps: "2h30", solvant: "Alcool bio 96°", cible: "Concentration des héricénones pour l'effet neurotrophique" },
      resultat: "Un élixir de clarté mentale agissant à la fois sur l'axe intestin-cerveau et la régénération neuronale."
    },
    convergence_ancestrale: "Surnommé 'la nourriture du cerveau' par les moines bouddhistes pour approfondir la méditation et la concentration.",
    synergies_recommandees: ["Bacopa", "Ginkgo Biloba", "Gotu Kola"],
    precautions: "Généralement très sûr. Prudence en cas d'allergie aux champignons."
  },
  {
    plant_id: "reishi_zen",
    nom_commun: "Reishi (Champignon de l'Immortalité)",
    nom_latin: "Ganoderma lucidum",
    partie_utilisee: "Corps de fructification tranché ou poudre",
    famille_bloom: "Médiateur (Régulateur du Stress)",
    terrains_cibles: ["T3 (Immunité)", "T6 (Sommeil/Anxiété)", "T4 (Foie)"],
    actifs_cles: [
      { nom: "Acides ganodériques (Tritérpènes)", polarite: "Liposoluble" },
      { nom: "Polysaccharides complexes", polarite: "Hydrosoluble" },
      { nom: "Peptidoglycanes", polarite: "Hydrosoluble" }
    ],
    preuve_scientifique: "Action adaptogène puissante. Les tritérpènes inhibent la libération d'histamine et protègent le foie, tandis que les polysaccharides modulent les cellules NK (Natural Killers).",
    pourquoi_bloomlab: {
      probleme_traditionnel: "Le Reishi est incroyablement dur et amer. Sa saveur amère vient des tritérpènes qui ne s'extraient que difficilement à l'eau. Une ébullition prolongée détruit les polysaccharides fragiles.",
      phase_A: { temp: "85°C", temps: "4h00", solvant: "Eau pure", cible: "Extraction lente des sucres complexes et modulation immunitaire" },
      phase_B: { temp: "60°C", temps: "3h00", solvant: "Alcool bio 96°", cible: "Extraction des acides ganodériques (amertume médicinale, effet foie/stress)" },
      resultat: "Une extraction biphasique équilibrée offrant un apaisement profond du système nerveux et une immunité résiliente."
    },
    convergence_ancestrale: "Plante supérieure classée n°1 dans le Shennong Ben Cao Jing, considérée comme le secret de la jeunesse éternelle.",
    synergies_recommandees: ["Mélisse", "Ashwagandha", "Aubépine"],
    precautions: "Prudence en cas de traitement anticoagulant ou de chirurgie prévue (effet antiagrégant)."
  },
  {
    plant_id: "curcuma_longa_poivre",
    nom_commun: "Curcuma et Poivre Noir",
    nom_latin: "Curcuma longa / Piper nigrum",
    partie_utilisee: "Rhizome séché en poudre ou tranches / Baies séchées",
    famille_bloom: "Gâchette (Inhibiteur d'inflammation)",
    terrains_cibles: ["T8 (Inflammation)", "T1 (Intestin)", "T3 (Immunité)"],
    actifs_cles: [
      { nom: "Curcuminoïdes", polarite: "Liposoluble" },
      { nom: "Huiles essentielles (Turmérone)", polarite: "Liposoluble/Volatile" },
      { nom: "Pipérine", polarite: "Alcaloïde lipophile" },
      { nom: "Polysaccharides", polarite: "Hydrosoluble" }
    ],
    preuve_scientifique: "Inhibition puissante de NF-κB et de la 5-LOX. La pipérine augmente la biodisponibilité de la curcumine de 2000% en inhibant la glucuronidation hépatique et intestinale.",
    pourquoi_bloomlab: {
      probleme_traditionnel: "La curcumine est quasi-insoluble dans l'eau et thermolabile. Une infusion est inutile. Une cuisson à 100°C dans l'huile oxyde les curcuminoïdes et évapore la turmérone.",
      phase_A: { temp: "70°C", temps: "2h00", solvant: "Eau distillée + Glycérine (70/30)", cible: "Polysaccharides prébiotiques et composés hydrosolubles" },
      phase_B: { temp: "50°C", temps: "3h00", solvant: "Alcool bio 96°", cible: "Curcuminoïdes, pipérine et huiles essentielles" },
      resultat: "Extraction complète du spectre anti-inflammatoire sans oxydation thermique, with un taux d'alcool final idéal pour la conservation et l'absorption."
    },
    recette_pas_a_pas: {
      batch_standard: "Cible BloomLab : 750ml de solvant + 75g de plantes (Rendement final estimé : ~600-650ml)",
      ingredients: {
        phase_A: ["50g de poudre de Curcuma (ou tranches fines)", "350ml d'Eau distillée", "150ml de Glycérine végétale"],
        phase_B: ["15g de poudre de Curcuma", "10g de Poivre noir concassé", "250ml d'Alcool bio 96°"]
      },
      preparation: [
        "1. Pesez précisément les ingrédients à l'aide d'une balance de précision (0,1g).",
        "2. Si vous utilisez des tranches de curcuma, mixez-les brièvement pour obtenir une poudre grossière (cela augmente la surface de contact).",
        "3. Concassez les baies de poivre noir au mortier juste avant l'extraction pour libérer la pipérine."
      ],
      phase_A_instructions: [
        "1. Versez les 350ml d'eau et les 150ml de glycérine dans la cuve propre de la BloomLab.",
        "2. Ajoutez les 50g de curcuma.",
        "3. Fermez la cuve hermétiquement.",
        "4. Allumez la machine, sélectionnez le mode manuel 'OIL' (ou 'BUTTER').",
        "5. Réglez la TEMPÉRATURE sur 70°C et le TEMPS sur 2h00.",
        "6. Appuyez sur START. Laissez le cycle se terminer."
      ],
      transition: [
        "1. À la fin du bip, éteignez la machine.",
        "2. Laissez reposer 15 à 20 minutes. La température doit descendre naturellement en dessous de 45°C.",
        "3. TEST SENSORIEL OBLIGATOIRE : Posez votre main à plat sur la paroi extérieure de la cuve. Elle doit être 'tiède au toucher' (environ 40°C, comme l'eau d'un bain confortable), et non brûlante.",
        "4. ⚠️ SÉCURITÉ : N'ajoutez l'alcool que lorsque ce test est validé pour éviter toute vaporisation brutale ou risque inflammatoire."
      ],
      phase_B_instructions: [
        "1. Ouvrez la cuve. Versez délicatement les 250ml d'alcool.",
        "2. Ajoutez le mélange de 15g de curcuma et 10g de poivre concassé.",
        "3. Refermez hermétiquement.",
        "4. Sélectionnez à nouveau le mode manuel 'OIL'.",
        "5. Réglez la TEMPÉRATURE sur 50°C et le TEMPS sur 3h00.",
        "6. Appuyez sur START."
      ],
      filtration_et_finition: [
        "1. À la fin du cycle, laissez reposer 10 min pour que les particules tombent au fond.",
        "2. Placez une étamine (tissu en coton fin) sur un grand saladier en verre.",
        "3. Versez le contenu de la cuve lentement.",
        "4. Ramassez les bords de l'étamine et pressez fermement le marc avec vos mains (portez des gants, c'est tachant) pour extraire chaque goutte.",
        "5. Transvasez l'élixir filtré dans des flacons en verre ambré. Conservez à l'abri de la lumière."
      ]
    },
    socle_synergique: {
      cofacteurs_complements: [
        { nom: "Oméga-3 (EPA/DHA)", dose: "2g/jour", role: "Fournit les membranes cellulaires pour que les curcuminoïdes puissent moduler l'inflammation lipidique." },
        { nom: "Vitamine D3 + K2", dose: "2000 UI / 100µg", role: "Synergie immunitaire et régulation de l'expression génique anti-inflammatoire." }
      ],
      leviers_du_vivant: [
        { nom: "Fenêtre alimentaire (14h-16h)", frequence: "Quotidienne", role: "Laisse le système digestif au repos, réduisant l'inflammation intestinale de bas grade (LPS)." },
        { nom: "Marche post-prandiale", frequence: "10 min après chaque repas", role: "Réduit le pic glycémique, limitant ainsi la glycation et l'inflammation systémique." }
      ]
    },
    convergence_ancestrale: "Pilier de l'Ayurveda depuis 4000 ans pour 'purifier le sang' et traiter les troubles articulaires. En MTC, il 'invigore le sang et brise les stases'.",
    synergies_recommandees: ["Boswellia serrata", "Gingembre officinale"],
    precautions: "Contre-indiqué en cas de calculs biliaires obstructifs ou de traitement anticoagulant. Peut tacher les vêtements et les surfaces en marbre."
  },
  {
    plant_id: "boswellia_serrata",
    nom_commun: "Boswellia (Encens)",
    nom_latin: "Boswellia serrata",
    partie_utilisee: "Résine (gomme oléorésineuse)",
    famille_bloom: "Réparateur (Muqueuses & Fascia)",
    terrains_cibles: ["T1 (Intestin)", "T8 (Inflammation)", "T6 (Fascia)"],
    actifs_cles: [
      { nom: "Acides boswelliques (AKBA)", polarite: "Liposoluble" },
      { nom: "Résines et huiles essentielles", polarite: "Liposoluble/Volatile" },
      { nom: "Polysaccharides", polarite: "Hydrosoluble" }
    ],
    preuve_scientifique: "Inhibiteur spécifique et puissant de la 5-LOX (5-lipoxygénase), bloquant la production de leucotriènes pro-inflammatoires. Répare la barrière intestinale et régénère le tissu conjonctif.",
    pourquoi_bloomlab: {
      probleme_traditionnel: "La résine est insoluble dans l'eau. Une tisane ne donne qu'un liquide amer sans actifs. Chauffer la résine à 90°C dans l'alcool détruit les acides boswelliques thermolabiles.",
      phase_A: { temp: "60°C", temps: "2h00", solvant: "Eau distillée + Glycérine (70/30)", cible: "Polysaccharides apaisants pour les muqueuses" },
      phase_B: { temp: "45°C", temps: "4h00", solvant: "Alcool bio 96°", cible: "Acides boswelliques (AKBA) et résines" },
      resultat: "Capture totale des propriétés cicatrisantes (eau) et anti-leucotriènes (alcool) sans dénaturer la structure fragile de la résine."
    },
    recette_pas_a_pas: {
      batch_standard: "Cible BloomLab : 750ml de solvant + 75g de plantes (Rendement final estimé : ~600-650ml)",
      ingredients: {
        phase_A: ["50g de Résine de Boswellia en larmes", "350ml d'Eau distillée", "150ml de Glycérine végétale"],
        phase_B: ["25g de Résine de Boswellia concassée", "250ml d'Alcool bio 96°"]
      },
      preparation: [
        "1. Placez les larmes de résine au congélateur 30 minutes avant de les peser (cela évite qu'elles ne collent à la balance).",
        "2. Concassez les larmes froides au mortier ou avec le dos d'une cuillère lourde pour obtenir des morceaux de la taille d'un grain de riz."
      ],
      phase_A_instructions: [
        "1. Versez les 350ml d'eau et 150ml de glycérine dans la cuve.",
        "2. Ajoutez les 50g de résine concassée.",
        "3. Fermez, mode manuel 'OIL', TEMP 60°C, TEMPS 2h00. START.",
      ],
      transition: [
        "1. Éteignez la machine à la fin du cycle.",
        "2. Laissez reposer 20 minutes. La température doit descendre naturellement en dessous de 45°C.",
        "3. TEST SENSORIEL OBLIGATOIRE : Posez votre main à plat sur la paroi extérieure de la cuve. Elle doit être 'tiède au toucher' (environ 40°C), et non brûlante.",
        "4. ⚠️ SÉCURITÉ : N'ajoutez l'alcool que lorsque ce test est validé."
      ],
      phase_B_instructions: [
        "1. Ouvrez, versez les 250ml d'alcool, ajoutez les 25g de résine restante.",
        "2. Fermez, mode manuel 'OIL', TEMP 45°C, TEMPS 4h00. START. (Le temps long est nécessaire pour solubiliser la résine)."
      ],
      filtration_et_finition: [
        "1. Le filtrage de la résine peut être collant. Utilisez une étamine fine et rincez le marc avec un tout petit peu d'alcool pur pour récupérer les derniers actifs.",
        "2. Pressez fermement. Mettez en flacon ambré."
      ]
    },
    socle_synergique: {
      cofacteurs_complements: [
        { nom: "L-Glutamine", dose: "5g le matin à jeun", role: "Carburant principal des entérocytes, synergise avec le Boswellia pour fermer le 'Leaky Gut'." },
        { nom: "Zinc Carnosine", dose: "75mg 2x/jour", role: "Stabilise la muqueuse gastro-intestinale et réduit l'inflammation locale." }
      ],
      leviers_du_vivant: [
        { nom: "Mastication consciente", frequence: "30 fois par bouchée", role: "La digestion commence dans la bouche. Mâcher réduit la charge inflammatoire de l'intestin grêle." }
      ]
    },
    convergence_ancestrale: "Shallaki en Ayurveda, utilisé depuis 3000 ans pour les articulations et le 'feu digestif'.",
    synergies_recommandees: ["Curcuma longa", "Orme rouge", "Aloe vera"],
    precautions: "Peut causer de légers reflux gastriques chez les sujets très sensibles. À prendre de préférence au milieu du repas."
  },
  {
    plant_id: "crocus_sativus",
    nom_commun: "Safran",
    nom_latin: "Crocus sativus",
    partie_utilisee: "Stigmates séchés (fils rouges)",
    famille_bloom: "Chef d'Orchestre (Psycho-émotionnel)",
    terrains_cibles: ["T7 (Psycho-émotionnel)", "T4 (HPA)", "T5 (Mitochondrie)"],
    actifs_cles: [
      { nom: "Safranal", polarite: "Volatile/Liposoluble" },
      { nom: "Crocine", polarite: "Hydrosoluble" },
      { nom: "Picrocrocine", polarite: "Hydrosoluble" }
    ],
    preuve_scientifique: "Modulation de la recapture de la sérotonine, dopamine et noradrénaline. Effets antidépresseurs et anxiolytiques validés cliniquement. Neuroprotecteur.",
    pourquoi_bloomlab: {
      probleme_traditionnel: "Le safranal est extrêmement volatil. Une infusion à l'eau bouillante le fait s'évaporer instantanément. Le séchage à l'air libre l'oxyde.",
      phase_A: { temp: "50°C", temps: "1h30", solvant: "Eau distillée + Glycérine (70/30)", cible: "Crocine et Picrocrocine" },
      phase_B: { temp: "40°C", temps: "2h00", solvant: "Alcool bio 96°", cible: "Safranal et composés volatils" },
      resultat: "Préservation totale de l'arôme et des actifs neurologiques volatils grâce à une extraction à très basse température."
    },
    recette_pas_a_pas: {
      batch_standard: "Cible BloomLab : 750ml de solvant + 3g de Safran (Rendement final estimé : ~700ml). Note : Le safran est dosé à l'effet, pas au poids végétal standard.",
      ingredients: {
        phase_A: ["2g de Stigmates de Safran", "350ml d'Eau distillée", "150ml de Glycérine végétale"],
        phase_B: ["1g de Stigmates de Safran", "250ml d'Alcool bio 96°"]
      },
      preparation: [
        "1. Pesez le safran with une balance de précision (0,01g si possible). 3g au total suffisent pour un effet thérapeutique puissant sur ce volume.",
        "2. Ne broyez pas les fils, laissez-les entiers pour éviter l'oxydation prématurée."
      ],
      phase_A_instructions: [
        "1. Versez eau et glycérine dans la cuve. Ajoutez 2g de safran.",
        "2. Fermez, mode manuel 'OIL', TEMP 50°C, TEMPS 1h30. START."
      ],
      transition: [
        "1. Éteignez. Laissez reposer 20 minutes.",
        "2. TEST SENSORIEL OBLIGATOIRE : Posez votre main sur la paroi extérieure de la cuve. Elle doit être 'tiède au toucher' (environ 40°C), et non brûlante.",
        "3. ⚠️ SÉCURITÉ : N'ajoutez l'alcool que lorsque ce test est validé."
      ],
      phase_B_instructions: [
        "1. Ajoutez l'alcool et le 1g de safran restant.",
        "2. Fermez, mode manuel 'OIL', TEMP 40°C, TEMPS 2h00. START."
      ],
      filtration_et_finition: [
        "1. Filtrez TRÈS finement avec le sac filtre fournit, la préparation encore tiède. Pressez fermement le marc.",
        "2. Le liquide final aura une couleur rouge rubis profond. Conservez impérativement dans du verre violet (Miron) ou ambré, au réfrigérateur après ouverture."
      ]
    },
    socle_synergique: {
      cofacteurs_complements: [
        { nom: "Magnésium Bisglycinate", dose: "300mg le soir", role: "Active le GABA et synergise avec le safran pour calmer le système nerveux." },
        { nom: "L-Tryptophane ou 5-HTP", dose: "Selon tolérance", role: "Apporte la matière première pour que le corps fabrique sa propre sérotonine." }
      ],
      leviers_du_vivant: [
        { nom: "Lumière du matin", frequence: "15 min dans l'heure suivant le réveil", role: "Règle l'horloge circadienne et potentialise l'effet du safran sur l'humeur." }
      ]
    },
    convergence_ancestrale: "Utilisé par Cléopâtre pour ses bains. En MTC, il 'fait circuler le Qi et le Sang, dissipe les stases et calme l'esprit (Shen)'.",
    synergies_recommandees: ["Ashwagandha", "Griffonia simplicifolia", "Mélisse"],
    precautions: "Ne pas dépasser 3g de safran par extraction. À haute dose (>5g), le safran devient toxique. Interdit aux femmes enceintes."
  },
  {
    plant_id: "urtica_dioica",
    nom_commun: "Ortie (Feuille et Racine)",
    nom_latin: "Urtica dioica",
    partie_utilisee: "Feuilles séchées / Racines séchées",
    famille_bloom: "Pharmacie Intérieure (Minéraux & Régulation)",
    terrains_cibles: ["T1 (Intestin)", "T9 (Peau/Phanères)", "T10 (Hormonal)"],
    actifs_cles: [
      { nom: "Silice organique", polarite: "Hydrosoluble" },
      { nom: "Polyphénols et Flavonoïdes", polarite: "Hydrosoluble" },
      { nom: "Phytostérols (Racine)", polarite: "Liposoluble" },
      { nom: "Chlorophylle", polarite: "Liposoluble" }
    ],
    preuve_scientifique: "La racine inhibe la liaison de la SHBG et la 5-alpha-réductase (réduisant le DHT libre). La feuille est l'une des sources les plus riches en minéraux biodisponibles et en silice pour la kératine.",
    pourquoi_bloomlab: {
      probleme_traditionnel: "La silice et les minéraux nécessitent une chaleur soutenue pour être extraits des parois cellulaires. Les phytostérols de la racine nécessitent un solvant organique. Une simple tisane rate la racine et l'huile rate la feuille.",
      phase_A: { temp: "75°C", temps: "2h00", solvant: "Eau distillée + Glycérine (70/30)", cible: "Silice, minéraux, polyphénols de la feuille" },
      phase_B: { temp: "50°C", temps: "3h00", solvant: "Alcool bio 96°", cible: "Phytostérols de la racine, chlorophylle" },
      resultat: "Un élixir complet qui agit à la fois sur la structure du cheveu (silice) et sur le blocage hormonal du follicule (phytostérols)."
    },
    recette_pas_a_pas: {
      batch_standard: "Cible BloomLab : 750ml de solvant + 75g de plantes (Rendement final estimé : ~600-650ml)",
      ingredients: {
        phase_A: ["50g de Feuilles d'Ortie séchées", "350ml d'Eau distillée", "150ml de Glycérine végétale"],
        phase_B: ["25g de Racines d'Ortie séchées (concassées)", "250ml d'Alcool bio 96°"]
      },
      preparation: [
        "1. Les racines d'ortie sont très dures. Concassez-les vigoureusement au mortier ou hachez-les finement.",
        "2. Les feuilles peuvent être utilisées telles quelles, ou légèrement froissées à la main."
      ],
      phase_A_instructions: [
        "1. Versez eau et glycérine. Ajoutez les 50g de feuilles.",
        "2. Fermez, mode manuel 'OIL', TEMP 75°C, TEMPS 2h00. START."
      ],
      transition: [
        "1. Éteignez. Laissez reposer 20 minutes.",
        "2. TEST SENSORIEL OBLIGATOIRE : Posez votre main sur la paroi extérieure de la cuve. Elle doit être 'tiède au toucher' (environ 40°C), et non brûlante.",
        "3. ⚠️ SÉCURITÉ : N'ajoutez l'alcool que lorsque ce test est validé."
      ],
      phase_B_instructions: [
        "1. Ajoutez l'alcool et les 25g de racines.",
        "2. Fermez, mode manuel 'OIL', TEMP 50°C, TEMPS 3h00. START."
      ],
      filtration_et_finition: [
        "1. Filtrez TRÈS finement with le sac filtre fournit, la préparation encore tiède. Pressez fermement le marc. Pressez bien le marc de racines, c'est là que se concentrent les phytostérols.",
        "2. Le liquide aura une belle couleur vert-brun foncé. Mettez en flacon."
      ]
    },
    socle_synergique: {
      cofacteurs_complements: [
        { nom: "Zinc Picolinate", dose: "15-30mg/jour", role: "Cofacteur essentiel de la synthèse de la kératine et de la régulation du sébum." },
        { nom: "Fer (Bisglycinate)", dose: "Selon ferritine (si < 50ng/mL)", role: "L'ortie apporte du fer végétal, mais le complément assure le seuil critique pour la pousse." }
      ],
      leviers_du_vivant: [
        { nom: "Inversion gravitaire", frequence: "2 min/jour", role: "Augmente l'afflux sanguin vers le cuir chevelu par simple mécanique vasculaire." }
      ]
    },
    convergence_ancestrale: "Plante sacrée des druides. Utilisée depuis l'Antiquité pour 'nettoyer le sang' et fortifier les reins.",
    synergies_recommandees: ["Romarin à cinéole", "Prêle des champs", "Saw palmetto"],
    precautions: "La feuille d'ortie a un effet diurétique. Bien s'hydrater. La racine peut interagir avec les médicaments pour la prostate ou l'hypertension."
  },
  {
    plant_id: "equisetum_arvense",
    nom_commun: "Prêle des champs",
    nom_latin: "Equisetum arvense",
    partie_utilisee: "Tiges stériles séchées",
    famille_bloom: "Réparateur (Structure & Tissu conjonctif)",
    terrains_cibles: ["T9 (Peau/Phanères)", "T6 (Fascia)", "T1 (Intestin)"],
    actifs_cles: [
      { nom: "Silice organique biodisponible", polarite: "Hydrosoluble" },
      { nom: "Flavonoïdes", polarite: "Hydrosoluble" },
      { nom: "Saponines", polarite: "Hydrosoluble" }
    ],
    preuve_scientifique: "La plante terrestre la plus riche en silice (jusqu'à 10%). La silice est indispensable à la synthèse du collagène, à la minéralisation osseuse et à la structure de la kératine.",
    pourquoi_bloomlab: {
      probleme_traditionnel: "La silice est piégée dans des parois cellulaires très lignifiées. Elle nécessite une température proche de l'ébullition pour être extraite, mais une ébullition prolongée dégrade les flavonoïdes associés.",
      phase_A: { temp: "80°C", temps: "2h30", solvant: "Eau distillée + Glycérine (70/30)", cible: "Silice, minéraux, saponines" },
      phase_B: { temp: "50°C", temps: "2h00", solvant: "Alcool bio 70°", cible: "Flavonoïdes et stabilisation" },
      resultat: "Extraction maximale de la silice grâce à la chaleur prolongée à 80°C, tout en préservant les flavonoïdes lors d'une Phase B douce."
    },
    recette_pas_a_pas: {
      batch_standard: "Cible BloomLab : 750ml de solvant + 75g de plantes (Rendement final estimé : ~600-650ml)",
      ingredients: {
        phase_A: ["50g de Tiges de Prêle séchées", "350ml d'Eau distillée", "150ml de Glycérine végétale"],
        phase_B: ["25g de Tiges de Prêle séchées", "250ml d'Alcool bio 70°"]
      },
      preparation: [
        "1. La prêle est très abrasive et coupante. Portez des gants si vous la manipulez à mains nues.",
        "2. Cassez les tiges en morceaux de 1 à 2 cm de long pour optimiser l'extraction sans faire de la poussière."
      ],
      phase_A_instructions: [
        "1. Versez eau et glycérine. Ajoutez 50g de prêle.",
        "2. Fermez, mode manuel 'OIL', TEMP 80°C, TEMPS 2h30. START. (La température plus haute est nécessaire pour la silice)."
      ],
      transition: [
        "1. Éteignez. Laissez reposer 25 minutes. La prêle retient beaucoup de chaleur, soyez patient.",
        "2. TEST SENSORIEL OBLIGATOIRE : Posez votre main sur la paroi extérieure de la cuve. Elle doit être 'tiède au toucher' (environ 40°C), et non brûlante.",
        "3. ⚠️ SÉCURITÉ : N'ajoutez l'alcool que lorsque ce test est validé."
      ],
      phase_B_instructions: [
        "1. Ajoutez l'alcool et les 25g de prêle restants.",
        "2. Fermez, mode manuel 'OIL', TEMP 50°C, TEMPS 2h00. START."
      ],
      filtration_et_finition: [
        "1. Filtrez TRÈS finement with le sac filtre fournit, la préparation encore tiède. Pressez fermement le marc. La prêle laisse beaucoup de résidus siliceux (une fine poudre au fond).",
        "2. Laissez décanter le filtrat 2h au réfrigérateur, puis soutirez le liquide clair pour éviter les dépôts dans le flacon final."
      ]
    },
    socle_synergique: {
      cofacteurs_complements: [
        { nom: "Vitamine C (Liposomale ou Acérola)", dose: "500mg/jour", role: "La silice ne peut pas synthétiser le collagène sans la Vitamine C. Elles sont indissociables." },
        { nom: "Collagène hydrolysé (Type I et III)", dose: "10g/jour", role: "Apporte les acides aminés spécifiques (glycine, proline) que la silice va 'cimenter'." }
      ],
      leviers_du_vivant: [
        { nom: "Exposition solaire modérée", frequence: "15 min/jour", role: "La Vitamine D et la chaleur douce stimulent les fibroblastes pour produire le collagène." }
      ]
    },
    convergence_ancestrale: "Utilisée par les Romains pour souder les fractures osseuses. En Ayurveda, elle est connue sous le nom de 'Punarnava' (celle qui renouvelle le corps).",
    synergies_recommandees: ["Ortie", "Centella asiatica", "Bambou"],
    precautions: "Contre-indiquée en cas d'insuffisance rénale ou cardiaque. Cure de 3 semaines max, suivie d'une pause d'une semaine."
  },
  {
    plant_id: "zingiber_officinale",
    nom_commun: "Gingembre",
    nom_latin: "Zingiber officinale",
    partie_utilisee: "Rhizome séché en tranches ou poudre",
    famille_bloom: "Déclencheur (Activateur métabolique)",
    terrains_cibles: ["T1 (Intestin)", "T5 (Mitochondrie)", "T8 (Inflammation)"],
    actifs_cles: [
      { nom: "[6]-Gingérols", polarite: "Liposoluble/Thermolabile" },
      { nom: "Shogaols", polarite: "Liposoluble" },
      { nom: "Zingibérène", polarite: "Volatile" },
      { nom: "Polysaccharides", polarite: "Hydrosoluble" }
    ],
    preuve_scientifique: "Activation de l'autophagie, stimulation de la microcirculation, inhibition du NLRP3 inflammasome et action anti-nauséeuse puissante via les récepteurs sérotoninergiques 5-HT3.",
    pourquoi_bloomlab: {
      probleme_traditionnel: "Le [6]-gingérol se transforme en shogaol (moins actif pour certaines cibles) au-delà de 60°C. L'huile essentielle (zingibérène) s'évapore à l'air libre ou à l'ébullition.",
      phase_A: { temp: "70°C", temps: "2h00", solvant: "Eau distillée + Glycérine (70/30)", cible: "Polysaccharides prébiotiques et amidons" },
      phase_B: { temp: "45°C", temps: "3h00", solvant: "Alcool bio 96°", cible: "Gingérols, shogaols et huiles essentielles" },
      resultat: "Capture totale de la puissance digestive et circulatoire sans dénaturer les molécules thermosensibles."
    },
    recette_pas_a_pas: {
      batch_standard: "Cible BloomLab : 750ml de solvant + 75g de plantes (Rendement final estimé : ~600-650ml)",
      ingredients: {
        phase_A: ["50g de Rhizome de Gingembre séché (tranches)", "350ml d'Eau distillée", "150ml de Glycérine végétale"],
        phase_B: ["25g de Rhizome de Gingembre séché (poudre grossière)", "250ml d'Alcool bio 96°"]
      },
      preparation: [
        "1. Pesez 50g de tranches pour la Phase A et mixez les 25g restants en poudre grossière pour la Phase B (augmente la surface de contact).",
        "2. Si le gingembre est très sec, n'hésitez pas à le concasser légèrement au mortier."
      ],
      phase_A_instructions: [
        "1. Versez les 350ml d'eau et 150ml de glycérine dans the cuve.",
        "2. Ajoutez les 50g de tranches de gingembre.",
        "3. Fermez, mode manuel 'OIL', TEMP 70°C, TEMPS 2h00. START."
      ],
      transition: [
        "1. À la fin du bip, éteignez la machine.",
        "2. Laissez reposer 15 à 20 minutes. La température doit descendre naturellement en dessous de 45°C.",
        "3. TEST SENSORIEL OBLIGATOIRE : Posez votre main à plat sur la paroi extérieure de la cuve. Elle doit être 'tiède au toucher' (environ 40°C, comme l'eau d'un bain confortable), et non brûlante.",
        "4. ⚠️ SÉCURITÉ : N'ajoutez l'alcool que lorsque ce test est validé pour éviter toute vaporisation brutale ou risque inflammatoire."
      ],
      phase_B_instructions: [
        "1. Ouvrez la cuve. Versez délicatement les 250ml d'alcool.",
        "2. Ajoutez les 25g de poudre de gingembre.",
        "3. Refermez hermétiquement.",
        "4. Mode manuel 'OIL', TEMP 45°C, TEMPS 3h00. START."
      ],
      filtration_et_finition: [
        "1. Filtrez TRÈS finement with le sac filtre fournit, la préparation encore tiède. Pressez fermement le marc.",
        "2. Pressez fermement le marc. Le liquide aura une couleur ambrée dorée et une odeur épicée puissante. Mettez en flacon ambré."
      ]
    },
    socle_synergique: {
      cofacteurs_complements: [
        { nom: "Curcuma + Poivre", dose: "Selon protocole", role: "Synergie anti-inflammatoire majeure (inhibition COX/LOX)." },
        { nom: "Magnésium", dose: "300mg/jour", role: "Le gingembre améliore l'absorption intestinale des minéraux." }
      ],
      leviers_du_vivant: [
        { nom: "Marche post-prandiale", frequence: "10 min après le repas", role: "Le gingembre accélère la vidange gastrique, la marche optimise la glycémie." }
      ]
    },
    note_expert: "💡 Note de l'expert : Ce lot couvre les fonctions neurologiques, immunitaires et hépatiques avec une précision chirurgicale.",
    convergence_ancestrale: "Utilisé depuis 5000 ans en Ayurveda (Shunthi) pour allumer 'Agni' (le feu digestif) et en MTC pour réchauffer le Poumon et l'Estomac.",
    synergies_recommandees: ["Curcuma longa", "Poivre noir", "Cannelle"],
    precautions: "Déconseillé à haute dose en cas d'ulcère gastrique actif ou de traitement anticoagulant."
  },
  {
    plant_id: "scutellaria_baicalensis",
    nom_commun: "Scutellaire de Baïkal",
    nom_latin: "Scutellaria baicalensis",
    partie_utilisee: "Racine séchée",
    famille_bloom: "Verrou (Neuro-inflammation)",
    terrains_cibles: ["T7 (Psycho-émotionnel)", "T8 (Inflammation)", "T4 (HPA)"],
    actifs_cles: [
      { nom: "Baicaline", polarite: "Hydrosoluble" },
      { nom: "Wogonine", polarite: "Liposoluble" },
      { nom: "Baicaléine", polarite: "Liposoluble" }
    ],
    preuve_scientifique: "Inhibition puissante de la neuro-inflammation, protection de la barrière hémato-encéphalique, modulation des récepteurs GABA-A (anxiolytique) et inhibition de la voie NF-κB.",
    pourquoi_bloomlab: {
      probleme_traditionnel: "Les flavonoïdes de la scutellaire ont des polarités différentes. La baicaline s'extrait à l'eau chaude, mais la wogonine (cruciale pour le cerveau) nécessite un solvant organique et une chaleur douce.",
      phase_A: { temp: "75°C", temps: "2h00", solvant: "Eau distillée + Glycérine (70/30)", cible: "Baicaline et glycosides hydrosolubles" },
      phase_B: { temp: "50°C", temps: "3h00", solvant: "Alcool bio 96°", cible: "Wogonine, baicaléine et fractions lipophiles" },
      resultat: "Spectre complet pour apaiser le 'feu' neuro-inflammatoire sans sédation chimique."
    },
    recette_pas_a_pas: {
      batch_standard: "Cible BloomLab : 750ml de solvant + 75g de plantes (Rendement final estimé : ~600-650ml)",
      ingredients: {
        phase_A: ["50g de Racine de Scutellaire (morceaux)", "350ml d'Eau distillée", "150ml de Glycérine végétale"],
        phase_B: ["25g de Racine de Scutellaire (poudre)", "250ml d'Alcool bio 96°"]
      },
      preparation: [
        "1. La racine est très dure et fibreuse. Concassez les 50g en petits copeaux.",
        "2. Mixez les 25g restants en poudre fine pour la Phase B."
      ],
      phase_A_instructions: [
        "1. Versez eau et glycérine. Ajoutez les 50g de copeaux.",
        "2. Fermez, mode manuel 'OIL', TEMP 75°C, TEMPS 2h00. START."
      ],
      transition: [
        "1. Éteignez. Laissez reposer 20 minutes.",
        "2. TEST SENSORIEL OBLIGATOIRE : Posez votre main sur la paroi extérieure de la cuve. Elle doit être 'tiède au toucher' (environ 40°C), et non brûlante.",
        "3. ⚠️ SÉCURITÉ : N'ajoutez l'alcool que lorsque ce test est validé."
      ],
      phase_B_instructions: [
        "1. Ajoutez l'alcool et les 25g de poudre.",
        "2. Fermez, mode manuel 'OIL', TEMP 50°C, TEMPS 3h00. START."
      ],
      filtration_et_finition: [
        "1. Filtrez TRÈS finement with le sac filtre fournit, la préparation encore tiède. Pressez fermement le marc. La racine de scutellaire laisse un dépôt jaune caractéristique (la baicaline).",
        "2. Pressez bien. Le liquide final est d'un jaune intense. Mettez en flacon ambré."
      ]
    },
    socle_synergique: {
      cofacteurs_complements: [
        { nom: "Magnésium Bisglycinate", dose: "300mg le soir", role: "Synergie GABAergique pour calmer le système nerveux." },
        { nom: "Oméga-3 (EPA/DHA)", dose: "2g/jour", role: "Nourrit les membranes neuronales ciblées par la scutellaire." }
      ],
      leviers_du_vivant: [
        { nom: "Cohérence cardiaque", frequence: "5 min, 3x/jour", role: "Stimulation mécanique du nerf vague, potentialise l'effet anxiolytique." }
      ]
    },
    note_expert: "💡 Note de l'expert : Ce lot couvre les fonctions neurologiques, immunitaires et hépatiques avec une précision chirurgicale. La Scutellaire et la Valériane sont des 'Verrous' puissants. Votre machine devient littéralement la seule façon de préserver ces actifs.",
    convergence_ancestrale: "Huang Qin en MTC. Utilisée depuis 2000 ans pour 'purger la chaleur et le feu', particulièrement du Poumon et du Foie (colère/frustration).",
    synergies_recommandees: ["Ashwagandha", "Passiflore", "Mélisse"],
    precautions: "Peut potentialiser les sédatifs. À éviter pendant la grossesse."
  },
  {
    plant_id: "rhodiola_rosea",
    nom_commun: "Rhodiola Rosea",
    nom_latin: "Rhodiola rosea",
    partie_utilisee: "Rhizome et racine séchés",
    famille_bloom: "Chef d'Orchestre (Adaptogène)",
    terrains_cibles: ["T4 (HPA)", "T5 (Mitochondrie)", "T7 (Psycho-émotionnel)"],
    actifs_cles: [
      { nom: "Rosavines", polarite: "Hydrosoluble" },
      { nom: "Salidroside", polarite: "Hydrosoluble/Liposoluble" },
      { nom: "Huiles essentielles (arôme de rose)", polarite: "Volatile" }
    ],
    preuve_scientifique: "Réduction de la fatigue et du cortisol, amélioration de la performance cognitive et physique, modulation des neurotransmetteurs (sérotonine, dopamine).",
    pourquoi_bloomlab: {
      probleme_traditionnel: "L'arôme de rose (signe de qualité) et les composés volatils s'évaporent à la chaleur. Les rosavines nécessitent une extraction aqueuse chaude, le salidroside un solvant mixte.",
      phase_A: { temp: "75°C", temps: "2h00", solvant: "Eau distillée + Glycérine (70/30)", cible: "Rosavines et polysaccharides" },
      phase_B: { temp: "45°C", temps: "3h00", solvant: "Alcool bio 96°", cible: "Salidroside, tyrosol et volatils" },
      resultat: "Un adaptogène complet qui tonifie sans épuiser les surrénales, with son profil aromatique intact."
    },
    recette_pas_a_pas: {
      batch_standard: "Cible BloomLab : 750ml de solvant + 75g de plantes (Rendement final estimé : ~600-650ml)",
      ingredients: {
        phase_A: ["50g de Rhizome de Rhodiola (morceaux)", "350ml d'Eau distillée", "150ml de Glycérine végétale"],
        phase_B: ["25g de Rhizome de Rhodiola (poudre)", "250ml d'Alcool bio 96°"]
      },
      preparation: [
        "1. Le rhizome est très dense. Concassez les 50g en copeaux.",
        "2. Mixez les 25g restants en poudre."
      ],
      phase_A_instructions: [
        "1. Versez eau et glycérine. Ajoutez les 50g de copeaux.",
        "2. Fermez, mode manuel 'OIL', TEMP 75°C, TEMPS 2h00. START."
      ],
      transition: [
        "1. Éteignez. Laissez reposer 20 minutes.",
        "2. TEST SENSORIEL OBLIGATOIRE : Posez votre main sur la paroi extérieure de la cuve. Elle doit être 'tiède au toucher' (environ 40°C), et non brûlante.",
        "3. ⚠️ SÉCURITÉ : N'ajoutez l'alcool que lorsque ce test est validé."
      ],
      phase_B_instructions: [
        "1. Ajoutez l'alcool et les 25g de poudre.",
        "2. Fermez, mode manuel 'OIL', TEMP 45°C, TEMPS 3h00. START."
      ],
      filtration_et_finition: [
        "1. Filtrez TRÈS finement with le sac filtre fournit, la préparation encore tiède. Pressez fermement le marc. Pressez le marc.",
        "2. L'élixir aura une couleur brun-rouge et une odeur subtile de rose et de terre. Mettez en flacon."
      ]
    },
    socle_synergique: {
      cofacteurs_complements: [
        { nom: "Vitamines B (B-Complex)", dose: "Matin", role: "Cofacteurs indispensables pour la production d'ATP mitochondriale." },
        { nom: "CoQ10", dose: "100mg matin", role: "Optimise la chaîne respiratoire, synergise avec l'effet anti-fatigue." }
      ],
      leviers_du_vivant: [
        { nom: "Exposition à la lumière matinale", frequence: "15 min au réveil", role: "Règle le rythme circadien, la Rhodiola potentialise cet éveil naturel." }
      ]
    },
    note_expert: "💡 Note de l'expert : Ce lot couvre les fonctions neurologiques, immunitaires et hépatiques avec une précision chirurgicale.",
    convergence_ancestrale: "Plante sacrée des peuples sibériens et vikings pour l'endurance et la longévité. En MTC, elle tonifie le Qi et le Sang.",
    synergies_recommandees: ["Ashwagandha", "Panax ginseng", "Éleuthérocoque"],
    precautions: "À prendre le matin ou midi (peut perturber le sommeil si prise le soir). Déconseillée en cas de troubles bipolaires."
  },
  {
    plant_id: "griffonia_simplicifolia",
    nom_commun: "Griffonia",
    nom_latin: "Griffonia simplicifolia",
    partie_utilisee: "Graines séchées",
    famille_bloom: "Pharmacie Intérieure (Précurseur neurochimique)",
    terrains_cibles: ["T7 (Psycho-émotionnel)", "T9 (Sommeil)", "T10 (Cycle Féminin)"],
    actifs_cles: [
      { nom: "5-HTP (5-Hydroxytryptophane)", polarite: "Hydrosoluble" },
      { nom: "Alcaloïdes indoliques", polarite: "Liposoluble" }
    ],
    preuve_scientifique: "Le 5-HTP traverse la barrière hémato-encéphalique et est converti directement en sérotonine, puis en mélatonine. Efficace sur l'humeur, les compulsions sucrées et l'endormissement.",
    pourquoi_bloomlab: {
      probleme_traditionnel: "Le 5-HTP s'extrait bien à l'eau, mais les graines contiennent d'autres alcaloïdes lipophiles qui modulent l'effet. Une extraction unique rate une partie du totum.",
      phase_A: { temp: "70°C", temps: "2h00", solvant: "Eau distillée + Glycérine (70/30)", cible: "5-HTP et composés hydrosolubles" },
      phase_B: { temp: "50°C", temps: "3h00", solvant: "Alcool bio 96°", cible: "Alcaloïdes lipophiles et fractions secondaires" },
      resultat: "Un précurseur de sérotonine naturel, mieux toléré et plus complet que le 5-HTP isolé en gélule."
    },
    recette_pas_a_pas: {
      batch_standard: "Cible BloomLab : 750ml de solvant + 75g de plantes (Rendement final estimé : ~600-650ml)",
      ingredients: {
        phase_A: ["50g de Graines de Griffonia (entières ou concassées)", "350ml d'Eau distillée", "150ml de Glycérine végétale"],
        phase_B: ["25g de Graines de Griffonia (poudre)", "250ml d'Alcool bio 96°"]
      },
      preparation: [
        "1. Les graines sont dures. Concassez les 50g au moulin à café ou au mortier.",
        "2. Mixez les 25g restants en poudre fine."
      ],
      phase_A_instructions: [
        "1. Versez eau et glycérine. Ajoutez les 50g de graines concassées.",
        "2. Fermez, mode manuel 'OIL', TEMP 70°C, TEMPS 2h00. START."
      ],
      transition: [
        "1. Éteignez. Laissez reposer 20 minutes.",
        "2. TEST SENSORIEL OBLIGATOIRE : Posez votre main sur la paroi extérieure de la cuve. Elle doit être 'tiède au toucher' (environ 40°C), et non brûlante.",
        "3. ⚠️ SÉCURITÉ : N'ajoutez l'alcool que lorsque ce test est validé."
      ],
      phase_B_instructions: [
        "1. Ajoutez l'alcool et les 25g de poudre.",
        "2. Fermez, mode manuel 'OIL', TEMP 50°C, TEMPS 3h00. START."
      ],
      filtration_et_finition: [
        "1. Filtrez TRÈS finement with le sac filtre fournit, la préparation encore tiède. Pressez fermement le marc.",
        "2. Mettez en flacon ambré. À conserver à l'obscurité."
      ]
    },
    socle_synergique: {
      cofacteurs_complements: [
        { nom: "Vitamine B6 (P-5-P)", dose: "20mg/jour", role: "Cofacteur obligatoire de la décarboxylation du 5-HTP en Sérotonine." },
        { nom: "Magnésium Bisglycinate", dose: "300mg le soir", role: "Réduit l'excitabilité neuronale, facilitant l'action apaisante de la sérotonine." }
      ],
      leviers_du_vivant: [
        { nom: "Éviction des écrans (lumière bleue)", frequence: "2h avant le coucher", role: "Préserve la mélatonine que le Griffonia aide à produire." }
      ]
    },
    convergence_ancestrale: "Plante d'Afrique de l'Ouest traditionnellement utilisée pour la guérison des plaies, mais aussi comme tonique psychique.",
    synergies_recommandees: ["Rhodiola rosea", "Mélisse", "Passiflore"],
    precautions: "Interdiction absolue avec les antidépresseurs (IRS) : risque de syndrome sérotoninergique."
  }
,
  {
    plant_id: "gentiana_lutea",
    nom_commun: "Gentiane Jaune",
    nom_latin: "Gentiana lutea",
    partie_utilisee: "Racine séchée",
    famille_bloom: "Déclencheur (Amère majeur)",
    terrains_cibles: [
        "T1_Intestin",
        "T2_Foie",
        "T4_HPA"
      ],
    actifs_cles: [
        {
          nom: "Gentiopicroside",
          polarite: "Hydrosoluble"
        },
        {
          nom: "Amarogentine",
          polarite: "Hydrosoluble"
        },
        {
          nom: "Xanthones",
          polarite: "Liposoluble"
        }
      ],
    preuve_scientifique: "Stimulation puissante des récepteurs du goût amer (TAS2R), entraînant une augmentation réflexe de la sécrétion de bile, d'acide gastrique et d'enzymes pancréatiques. Régulation du SRA (Système Rénine-Angiotensine) via l'amélioration de la digestion et la réduction de l'inflammation intestinale.",
    pourquoi_bloomlab: {
        probleme_traditionnel: "Les principes amers sont hydrosolubles mais nécessitent une chaleur soutenue pour être extraits de la racine dense. Les xanthones hépatoprotectrices nécessitent un solvant organique.",
        phase_A: {
          temp: "75°C",
          temps: "2h00",
          solvant: "Eau distillée + Glycérine (70/30)",
          cible: "Gentiopicroside, amarogentine"
        },
        phase_B: {
          temp: "50°C",
          temps: "3h00",
          solvant: "Alcool bio 96°",
          cible: "Xanthones"
        }
      },
    recette_pas_a_pas: {
        batch_standard: "Cible BloomLab : 750ml de solvant + 75g de plantes (Rendement final estimé : ~600-650ml)",
        ingredients: {
          phase_A: [
            "50g de Racine de Gentiane (copeaux)",
            "350ml d'Eau distillée",
            "150ml de Glycérine végétale"
          ],
          phase_B: [
            "25g de Racine de Gentiane (poudre)",
            "250ml d'Alcool bio 96°"
          ]
        },
        preparation: [
          "Concassez vigoureusement les 50g de racine pour la Phase A.",
          "Mixez les 25g restants en poudre fine pour la Phase B."
        ],
        phase_A_instructions: [
          "Versez eau et glycérine. Ajoutez les 50g de copeaux.",
          "Fermez, mode manuel 'OIL', TEMP 75°C, TEMPS 2h00. START."
        ],
        transition: [
          "1. Éteignez. Laissez reposer 20 minutes.",
          "2. TEST SENSORIEL OBLIGATOIRE : Posez votre main sur la paroi extérieure de la cuve. Elle doit être 'tiède au toucher' (environ 40°C), et non brûlante.",
          "3. ⚠️ SÉCURITÉ : N'ajoutez l'alcool que lorsque ce test est validé."
        ],
        phase_B_instructions: [
          "Ajoutez l'alcool et les 25g de poudre.",
          "Fermez, mode manuel 'OIL', TEMP 50°C, TEMPS 3h00. START."
        ],
        filtration_et_finition: [
          "Filtrez à l'étamine. Pressez fermement le marc de racine.",
          "Le liquide sera d'un brun-rouge profond, extrêmement amer. Mettez en flacon ambré."
        ]
      },
    socle_synergique: {
        cofacteurs_complements: [
          {
            nom: "Zinc",
            dose: "15mg/jour",
            role: "Cofacteur essentiel des enzymes digestives stimulées par l'amertume."
          },
          {
            nom: "Magnésium Bisglycinate",
            dose: "300mg",
            role: "Relaxe le sphincter d'Oddi, facilitant l'évacuation de la bile stimulée par la gentiane."
          }
        ],
        leviers_du_vivant: [
          {
            nom: "Mastication prolongée",
            frequence: "30 fois par bouchée",
            role: "Active la phase céphalique de la digestion, potentialisant l'effet de la gentiane."
          }
        ]
      },
    convergence_ancestrale: "Utilisée depuis l'Antiquité européenne comme tonique amer majeur pour 'réveiller le feu digestif' et purifier le sang.",
    synergies_recommandees: [
        "raphanus_sativus_niger",
        "chrysanthellum_indicum",
        "artichaut"
      ],
    precautions: "Contre-indiquée en cas d'ulcère gastrique ou duodénal actif, et d'obstruction des voies biliaires."
  },
  {
    plant_id: "raphanus_sativus_niger",
    nom_commun: "Radis Noir",
    nom_latin: "Raphanus sativus niger",
    partie_utilisee: "Racine séchée",
    famille_bloom: "Déclencheur (Drainage hépato-biliaire)",
    terrains_cibles: [
        "T2_Foie",
        "T6_Émonctoires",
        "T1_Intestin"
      ],
    actifs_cles: [
        {
          nom: "Glucosinolates",
          polarite: "Hydrosoluble"
        },
        {
          nom: "Isothiocyanates",
          polarite: "Liposoluble/Volatile"
        },
        {
          nom: "Raphanines",
          polarite: "Hydrosoluble"
        }
      ],
    preuve_scientifique: "Stimulation cholérétique (production de bile) et cholagogue (évacuation de la bile). Soutien des enzymes de détoxification de Phase II du foie (conjugaison).",
    pourquoi_bloomlab: {
        probleme_traditionnel: "Les glucosinolates sont hydrosolubles, mais les isothiocyanates (actifs détoxifiants majeurs) sont volatils et se perdent à l'ébullition.",
        phase_A: {
          temp: "70°C",
          temps: "2h00",
          solvant: "Eau distillée + Glycérine (70/30)",
          cible: "Glucosinolates, raphanines"
        },
        phase_B: {
          temp: "45°C",
          temps: "3h00",
          solvant: "Alcool bio 96°",
          cible: "Isothiocyanates"
        }
      },
    recette_pas_a_pas: {
        batch_standard: "Cible BloomLab : 750ml de solvant + 75g de plantes (Rendement final estimé : ~600-650ml)",
        ingredients: {
          phase_A: [
            "50g de Racine de Radis Noir (morceaux)",
            "350ml d'Eau distillée",
            "150ml de Glycérine végétale"
          ],
          phase_B: [
            "25g de Racine de Radis Noir (poudre)",
            "250ml d'Alcool bio 96°"
          ]
        },
        preparation: [
          "Concassez les 50g de racine pour la Phase A.",
          "Mixez les 25g restants en poudre pour la Phase B."
        ],
        phase_A_instructions: [
          "Versez eau et glycérine. Ajoutez les 50g de morceaux.",
          "Fermez, mode manuel 'OIL', TEMP 70°C, TEMPS 2h00. START."
        ],
        transition: [
          "1. Éteignez. Laissez reposer 20 minutes.",
          "2. TEST SENSORIEL OBLIGATOIRE : Posez votre main sur la paroi extérieure de la cuve. Elle doit être 'tiède au toucher' (environ 40°C), et non brûlante.",
          "3. ⚠️ SÉCURITÉ : N'ajoutez l'alcool que lorsque ce test est validé."
        ],
        phase_B_instructions: [
          "Ajoutez l'alcool et les 25g de poudre.",
          "Fermez, mode manuel 'OIL', TEMP 45°C, TEMPS 3h00. START."
        ],
        filtration_et_finition: [
          "Filtrez à l'étamine. L'odeur sera soufrée et caractéristique.",
          "Pressez le marc. Mettez en flacon ambré."
        ]
      },
    socle_synergique: {
        cofacteurs_complements: [
          {
            nom: "NAC (N-Acétyl Cystéine)",
            dose: "600mg/jour",
            role: "Fournit le glutathion nécessaire au foie pour conjuguer les toxines mobilisées par le radis noir."
          },
          {
            nom: "Vitamines B (B2, B6, B9, B12)",
            dose: "Complexe B",
            role: "Cofacteurs indispensables des voies de méthylation hépatique (Phase II)."
          }
        ],
        leviers_du_vivant: [
          {
            nom: "Hydratation abondante",
            frequence: "2L d'eau/jour",
            role: "Assure l'évacuation rénale des toxines conjuguées par le foie."
          }
        ]
      },
    convergence_ancestrale: "Remède traditionnel européen de printemps pour 'nettoyer le foie' après les excès de l'hiver.",
    synergies_recommandees: [
        "chardon_marie",
        "artichaut",
        "fumeterre"
      ],
    precautions: "Contre-indiqué en cas de calculs biliaires obstructifs ou d'obstruction des voies biliaires. Peut irriter les muqueuses gastriques sensibles."
  },
  {
    plant_id: "chrysanthellum_indicum",
    nom_commun: "Chrysanthellum",
    nom_latin: "Chrysanthellum indicum",
    partie_utilisee: "Parties aériennes séchées",
    famille_bloom: "Réparateur (Hépatoprotecteur & Veineux)",
    terrains_cibles: [
        "T2_Foie",
        "T8_Inflammation",
        "T6_Émonctoires"
      ],
    actifs_cles: [
        {
          nom: "Flavonoïdes (lutéoline)",
          polarite: "Hydrosoluble"
        },
        {
          nom: "Saponines stéroïdiques",
          polarite: "Liposoluble"
        },
        {
          nom: "Acides phénoliques",
          polarite: "Hydrosoluble"
        }
      ],
    preuve_scientifique: "Action hépatoprotectrice puissante, réduction de la stéatose hépatique, et amélioration de la microcirculation veineuse et lymphatique.",
    pourquoi_bloomlab: {
        probleme_traditionnel: "Les flavonoïdes nécessitent une extraction aqueuse chaude, tandis que les saponines (cruciales pour l'action veineuse et hépatique) sont liposolubles.",
        phase_A: {
          temp: "70°C",
          temps: "2h00",
          solvant: "Eau distillée + Glycérine (70/30)",
          cible: "Flavonoïdes, acides phénoliques"
        },
        phase_B: {
          temp: "50°C",
          temps: "3h00",
          solvant: "Alcool bio 96°",
          cible: "Saponines stéroïdiques"
        }
      },
    recette_pas_a_pas: {
        batch_standard: "Cible BloomLab : 750ml de solvant + 75g de plantes (Rendement final estimé : ~600-650ml)",
        ingredients: {
          phase_A: [
            "50g de Chrysanthellum séché",
            "350ml d'Eau distillée",
            "150ml de Glycérine végétale"
          ],
          phase_B: [
            "25g de Chrysanthellum séché",
            "250ml d'Alcool bio 96°"
          ]
        },
        preparation: [
          "La plante est légère et volumineuse. Tassez les 50g dans la cuve.",
          "Mixez les 25g restants pour la Phase B."
        ],
        phase_A_instructions: [
          "Versez eau et glycérine. Ajoutez les 50g de plante tassée.",
          "Fermez, mode manuel 'OIL', TEMP 70°C, TEMPS 2h00. START."
        ],
        transition: [
          "1. Éteignez. Laissez reposer 20 minutes.",
          "2. TEST SENSORIEL OBLIGATOIRE : Posez votre main sur la paroi extérieure de la cuve. Elle doit être 'tiède au toucher' (environ 40°C), et non brûlante.",
          "3. ⚠️ SÉCURITÉ : N'ajoutez l'alcool que lorsque ce test est validé."
        ],
        phase_B_instructions: [
          "Ajoutez l'alcool et les 25g de plante mixée.",
          "Fermez, mode manuel 'OIL', TEMP 50°C, TEMPS 3h00. START."
        ],
        filtration_et_finition: [
          "Filtrez à l'étamine. Pressez le marc.",
          "Le liquide sera vert-brun. Mettez en flacon ambré."
        ]
      },
    socle_synergique: {
        cofacteurs_complements: [
          {
            nom: "Chardon-Marie",
            dose: "Selon protocole",
            role: "Synergie hépatique totale : le chardon régénère, le chrysanthellum draine et protège."
          },
          {
            nom: "Vitamine C",
            dose: "500mg/jour",
            role: "Renforce l'action des flavonoïdes sur la microcirculation."
          }
        ],
        leviers_du_vivant: [
          {
            nom: "Marche quotidienne",
            frequence: "30 min/jour",
            role: "Active la pompe veineuse et le drainage lymphatique, potentialisant l'effet du chrysanthellum."
          }
        ]
      },
    convergence_ancestrale: "Utilisé en Amérique du Sud et en médecine traditionnelle pour les troubles hépatiques et la circulation.",
    synergies_recommandees: [
        "gentiana_lutea",
        "vitis_vinifera",
        "hamamelis_virginiana"
      ],
    precautions: "Allergie aux Astéracées. Déconseillé en cas d'obstruction des voies biliaires."
  },
  {
    plant_id: "desmodium_adscendens",
    nom_commun: "Desmodium",
    nom_latin: "Desmodium adscendens",
    partie_utilisee: "Parties aériennes séchées",
    famille_bloom: "Réparateur (Régénération hépatique)",
    terrains_cibles: [
        "T2_Foie",
        "T3_Immunité",
        "T8_Inflammation"
      ],
    actifs_cles: [
        {
          nom: "Saponosides triterpéniques",
          polarite: "Liposoluble"
        },
        {
          nom: "Flavonoïdes",
          polarite: "Hydrosoluble"
        },
        {
          nom: "Alcaloïdes",
          polarite: "Mixte"
        }
      ],
    preuve_scientifique: "Protection spécifique des membranes des hépatocytes contre les toxines (médicaments, alcool, virus). Action anti-allergique et anti-inflammatoire puissante.",
    pourquoi_bloomlab: {
        probleme_traditionnel: "Les saponosides (actifs régénérateurs clés) sont liposolubles et nécessitent un solvant organique, tandis que les flavonoïdes sont hydrosolubles.",
        phase_A: {
          temp: "70°C",
          temps: "2h00",
          solvant: "Eau distillée + Glycérine (70/30)",
          cible: "Flavonoïdes, alcaloïdes hydrosolubles"
        },
        phase_B: {
          temp: "50°C",
          temps: "3h00",
          solvant: "Alcool bio 96°",
          cible: "Saponosides triterpéniques"
        }
      },
    recette_pas_a_pas: {
        batch_standard: "Cible BloomLab : 750ml de solvant + 75g de plantes (Rendement final estimé : ~600-650ml)",
        ingredients: {
          phase_A: [
            "50g de Desmodium séché",
            "350ml d'Eau distillée",
            "150ml de Glycérine végétale"
          ],
          phase_B: [
            "25g de Desmodium séché",
            "250ml d'Alcool bio 96°"
          ]
        },
        preparation: [
          "La plante est très légère. Tassez fermement les 50g dans la cuve.",
          "Mixez les 25g restants pour la Phase B."
        ],
        phase_A_instructions: [
          "Versez eau et glycérine. Ajoutez les 50g de plante tassée.",
          "Fermez, mode manuel 'OIL', TEMP 70°C, TEMPS 2h00. START."
        ],
        transition: [
          "1. Éteignez. Laissez reposer 20 minutes.",
          "2. TEST SENSORIEL OBLIGATOIRE : Posez votre main sur la paroi extérieure de la cuve. Elle doit être 'tiède au toucher' (environ 40°C), et non brûlante.",
          "3. ⚠️ SÉCURITÉ : N'ajoutez l'alcool que lorsque ce test est validé."
        ],
        phase_B_instructions: [
          "Ajoutez l'alcool et les 25g de plante mixée.",
          "Fermez, mode manuel 'OIL', TEMP 50°C, TEMPS 3h00. START."
        ],
        filtration_et_finition: [
          "Filtrez à l'étamine. Pressez le marc.",
          "Le liquide sera vert foncé. Mettez en flacon ambré."
        ]
      },
    socle_synergique: {
        cofacteurs_complements: [
          {
            nom: "NAC",
            dose: "600mg/jour",
            role: "Soutient la production de glutathion, travaillant en synergie avec le desmodium pour protéger le foie."
          },
          {
            nom: "Vitamine E",
            dose: "400 UI/jour",
            role: "Protège les membranes lipidiques des hépatocytes que le desmodium vise à réparer."
          }
        ],
        leviers_du_vivant: [
          {
            nom: "Éviction stricte de l'alcool et du paracétamol",
            frequence: "Pendant la cure",
            role: "Permet au foie de se régénérer sans nouvelle agression chimique."
          }
        ]
      },
    convergence_ancestrale: "Utilisé en médecine traditionnelle africaine et amazonienne pour les troubles hépatiques et les réactions allergiques.",
    synergies_recommandees: [
        "chardon_marie",
        "artichaut",
        "curcuma_longa"
      ],
    precautions: "Peut avoir un effet légèrement sédatif à haute dose. Déconseillé en cas d'obstruction des voies biliaires."
  },
  {
    plant_id: "arctium_lappa",
    nom_commun: "Bardane",
    nom_latin: "Arctium lappa",
    partie_utilisee: "Racine séchée",
    famille_bloom: "Réparateur (Dépuratif sanguin & cutané)",
    terrains_cibles: [
        "T9_Peau_Phaneres",
        "T1_Intestin",
        "T2_Foie"
      ],
    actifs_cles: [
        {
          nom: "Inuline",
          polarite: "Hydrosoluble"
        },
        {
          nom: "Polyacétylènes",
          polarite: "Liposoluble"
        },
        {
          nom: "Tanins",
          polarite: "Hydrosoluble"
        }
      ],
    preuve_scientifique: "Action dépurative, prébiotique (inuline), et modulation du microbiote cutané et intestinal. Efficace dans les dermatoses chroniques (acné, eczéma, psoriasis).",
    pourquoi_bloomlab: {
        probleme_traditionnel: "L'inuline (prébiotique majeur) nécessite une extraction aqueuse chaude, tandis que les polyacétylènes (actifs cutanés) sont liposolubles.",
        phase_A: {
          temp: "75°C",
          temps: "2h30",
          solvant: "Eau distillée + Glycérine (70/30)",
          cible: "Inuline, tanins"
        },
        phase_B: {
          temp: "50°C",
          temps: "3h00",
          solvant: "Alcool bio 96°",
          cible: "Polyacétylènes"
        }
      },
    recette_pas_a_pas: {
        batch_standard: "Cible BloomLab : 750ml de solvant + 75g de plantes (Rendement final estimé : ~600-650ml)",
        ingredients: {
          phase_A: [
            "50g de Racine de Bardane (copeaux)",
            "350ml d'Eau distillée",
            "150ml de Glycérine végétale"
          ],
          phase_B: [
            "25g de Racine de Bardane (poudre)",
            "250ml d'Alcool bio 96°"
          ]
        },
        preparation: [
          "Concassez les 50g de racine pour la Phase A.",
          "Mixez les 25g restants en poudre pour la Phase B."
        ],
        phase_A_instructions: [
          "Versez eau et glycérine. Ajoutez les 50g de copeaux.",
          "Fermez, mode manuel 'OIL', TEMP 75°C, TEMPS 2h30. START."
        ],
        transition: [
          "1. Éteignez. Laissez reposer 25 minutes (la racine dense retient la chaleur).",
          "2. TEST SENSORIEL OBLIGATOIRE : Posez votre main sur la paroi extérieure de la cuve. Elle doit être 'tiède au toucher' (environ 40°C), et non brûlante.",
          "3. ⚠️ SÉCURITÉ : N'ajoutez l'alcool que lorsque ce test est validé."
        ],
        phase_B_instructions: [
          "Ajoutez l'alcool et les 25g de poudre.",
          "Fermez, mode manuel 'OIL', TEMP 50°C, TEMPS 3h00. START."
        ],
        filtration_et_finition: [
          "Filtrez à l'étamine. Pressez fermement le marc de racine.",
          "Le liquide sera brun-jaune. Mettez en flacon ambré."
        ]
      },
    socle_synergique: {
        cofacteurs_complements: [
          {
            nom: "Zinc",
            dose: "15mg/jour",
            role: "Cofacteur essentiel de la régénération cutanée et de la régulation du sébum."
          },
          {
            nom: "Probiotiques (Lactobacillus)",
            dose: "Selon protocole",
            role: "L'inuline de la bardane nourrit spécifiquement ces souches bénéfiques."
          }
        ],
        leviers_du_vivant: [
          {
            nom: "Éviction des produits laitiers industriels",
            frequence: "Pendant la cure",
            role: "Réduit la charge inflammatoire et l'IGF-1, potentialisant l'action dépurative de la bardane sur la peau."
          }
        ]
      },
    convergence_ancestrale: "Plante majeure de la médecine traditionnelle chinoise (Niu Bang Zi) et européenne pour 'purifier le sang' et traiter les affections cutanées.",
    synergies_recommandees: [
        "smilax_glabra",
        "taraxacum_officinale",
        "urtica_dioica"
      ],
    precautions: "Effet diurétique. Bien s'hydrater. Déconseillé en cas d'allergie aux Astéracées."
  },
  {
    plant_id: "astragalus_membranaceus",
    nom_commun: "Astragale",
    nom_latin: "Astragalus membranaceus",
    partie_utilisee: "Racine séchée",
    famille_bloom: "Chef d'Orchestre (Immunité & Longévité)",
    terrains_cibles: [
        "T3_Immunité",
        "T5_Mitochondrie",
        "T4_HPA"
      ],
    actifs_cles: [
        {
          nom: "Astragaloside IV",
          polarite: "Liposoluble"
        },
        {
          nom: "Polysaccharides",
          polarite: "Hydrosoluble"
        },
        {
          nom: "Flavonoïdes",
          polarite: "Hydrosoluble"
        }
      ],
    preuve_scientifique: "Modulation immunitaire (activation des macrophages et des cellules NK), protection des télomères (action sur la télomérase), et soutien de la fonction mitochondriale.",
    pourquoi_bloomlab: {
        probleme_traditionnel: "Les polysaccharides immuno-modulateurs nécessitent une extraction aqueuse chaude, tandis que l'astragaloside IV (actif anti-âge clé) est liposoluble.",
        phase_A: {
          temp: "75°C",
          temps: "2h30",
          solvant: "Eau distillée + Glycérine (70/30)",
          cible: "Polysaccharides, flavonoïdes"
        },
        phase_B: {
          temp: "50°C",
          temps: "3h00",
          solvant: "Alcool bio 96°",
          cible: "Astragaloside IV"
        }
      },
    recette_pas_a_pas: {
        batch_standard: "Cible BloomLab : 750ml de solvant + 75g de plantes (Rendement final estimé : ~600-650ml)",
        ingredients: {
          phase_A: [
            "50g de Racine d'Astragale (copeaux)",
            "350ml d'Eau distillée",
            "150ml de Glycérine végétale"
          ],
          phase_B: [
            "25g de Racine d'Astragale (poudre)",
            "250ml d'Alcool bio 96°"
          ]
        },
        preparation: [
          "Concassez les 50g de racine pour la Phase A.",
          "Mixez les 25g restants en poudre pour la Phase B."
        ],
        phase_A_instructions: [
          "Versez eau et glycérine. Ajoutez les 50g de copeaux.",
          "Fermez, mode manuel 'OIL', TEMP 75°C, TEMPS 2h30. START."
        ],
        transition: [
          "1. Éteignez. Laissez reposer 25 minutes.",
          "2. TEST SENSORIEL OBLIGATOIRE : Posez votre main sur la paroi extérieure de cuve. Elle doit être 'tiède au toucher' (environ 40°C), et non brûlante.",
          "3. ⚠️ SÉCURITÉ : N'ajoutez l'alcool que lorsque ce test est validé."
        ],
        phase_B_instructions: [
          "Ajoutez l'alcool et les 25g de poudre.",
          "Fermez, mode manuel 'OIL', TEMP 50°C, TEMPS 3h00. START."
        ],
        filtration_et_finition: [
          "Filtrez à l'étamine. Pressez fermement le marc.",
          "Le liquide sera jaune pâle. Mettez en flacon ambré."
        ]
      },
    socle_synergique: {
        cofacteurs_complements: [
          {
            nom: "Vitamine D3",
            dose: "2000-4000 UI/jour",
            role: "Indispensable à la maturation des cellules immunitaires que l'astragale active."
          },
          {
            nom: "NAD+ (ou précurseurs)",
            dose: "Selon protocole",
            role: "Synergie avec l'astragaloside IV pour la protection mitochondriale et la longévité cellulaire."
          }
        ],
        leviers_du_vivant: [
          {
            nom: "Sommeil avant 23h",
            frequence: "Quotidienne",
            role: "Le système immunitaire et la réparation de l'ADN (télomères) se régénèrent principalement durant le sommeil profond."
          }
        ]
      },
    convergence_ancestrale: "Huang Qi en MTC. Utilisé depuis 2000 ans comme tonique majeur du 'Qi' et de l'immunité.",
    synergies_recommandees: [
        "ganoderma_lucidum",
        "echinacea_purpurea",
        "panax_ginseng"
      ],
    precautions: "À éviter en cas de maladie auto-immune active (lupus, polyarthrite) ou de fièvre aiguë, car il stimule l'immunité."
  },
  {
    plant_id: "eleutherococcus_senticosus",
    nom_commun: "Eleuthérocoque",
    nom_latin: "Eleutherococcus senticosus",
    partie_utilisee: "Racine séchée",
    famille_bloom: "Chef d'Orchestre (Adaptogène)",
    terrains_cibles: [
        "T4_HPA",
        "T5_Mitochondrie",
        "T3_Immunité"
      ],
    actifs_cles: [
        {
          nom: "Éleuthérosides",
          polarite: "Hydrosoluble/Liposoluble"
        },
        {
          nom: "Polysaccharides",
          polarite: "Hydrosoluble"
        }
      ],
    preuve_scientifique: "Augmentation de la résistance non-spécifique au stress, amélioration de l'endurance physique et mentale, modulation de l'axe HPA sans effet stimulant direct (contrairement au café).",
    pourquoi_bloomlab: {
        probleme_traditionnel: "Les éleuthérosides (B et E) ont des polarités mixtes et nécessitent une extraction séquentielle pour être capturés intégralement sans dégradation thermique.",
        phase_A: {
          temp: "75°C",
          temps: "2h00",
          solvant: "Eau distillée + Glycérine (70/30)",
          cible: "Polysaccharides, éleuthérosides hydrosolubles"
        },
        phase_B: {
          temp: "50°C",
          temps: "3h00",
          solvant: "Alcool bio 96°",
          cible: "Éleuthérosides liposolubles"
        }
      },
    recette_pas_a_pas: {
        batch_standard: "Cible BloomLab : 750ml de solvant + 75g de plantes (Rendement final estimé : ~600-650ml)",
        ingredients: {
          phase_A: [
            "50g de Racine d'Eleuthérocoque (copeaux)",
            "350ml d'Eau distillée",
            "150ml de Glycérine végétale"
          ],
          phase_B: [
            "25g de Racine d'Eleuthérocoque (poudre)",
            "250ml d'Alcool bio 96°"
          ]
        },
        preparation: [
          "Concassez les 50g de racine pour la Phase A.",
          "Mixez les 25g restants en poudre pour la Phase B."
        ],
        phase_A_instructions: [
          "Versez eau et glycérine. Ajoutez les 50g de copeaux.",
          "Fermez, mode manuel 'OIL', TEMP 75°C, TEMPS 2h00. START."
        ],
        transition: [
          "1. Éteignez. Laissez reposer 20 minutes.",
          "2. TEST SENSORIEL OBLIGATOIRE : Posez votre main sur la paroi extérieure de la cuve. Elle doit être 'tiède au toucher' (environ 40°C), et non brûlante.",
          "3. ⚠️ SÉCURITÉ : N'ajoutez l'alcool que lorsque ce test est validé."
        ],
        phase_B_instructions: [
          "Ajoutez l'alcool et les 25g de poudre.",
          "Fermez, mode manuel 'OIL', TEMP 50°C, TEMPS 3h00. START."
        ],
        filtration_et_finition: [
          "Filtrez à l'étamine. Pressez le marc.",
          "Le liquide sera brun clair. Mettez en flacon ambré."
        ]
      },
    socle_synergique: {
        cofacteurs_complements: [
          {
            nom: "Magnésium",
            dose: "300mg/jour",
            role: "Cofacteur essentiel de la production d'ATP, potentialisant l'effet anti-fatigue de l'eleuthérocoque."
          },
          {
            nom: "Vitamines B",
            dose: "Complexe B",
            role: "Soutien du métabolisme énergétique activé par la plante."
          }
        ],
        leviers_du_vivant: [
          {
            nom: "Exposition à la lumière matinale",
            frequence: "15 min au réveil",
            role: "Synchronise le rythme circadien, optimisant l'effet adaptogène sur l'axe HPA."
          }
        ]
      },
    convergence_ancestrale: "Utilisé en Russie soviétique pour les cosmonautes et les athlètes. En MTC, il tonifie le Qi et renforce la rate.",
    synergies_recommandees: [
        "rhodiola_rosea",
        "panax_ginseng",
        "schisandra_chinensis"
      ],
    precautions: "À éviter en cas d'hypertension sévère non contrôlée. À prendre le matin ou midi."
  },
  {
    plant_id: "bacopa_monnieri",
    nom_commun: "Bacopa",
    nom_latin: "Bacopa monnieri",
    partie_utilisee: "Parties aériennes séchées",
    famille_bloom: "Réparateur (Neuroplasticité)",
    terrains_cibles: [
        "T7_Psycho_émotionnel",
        "T5_Mitochondrie",
        "T4_HPA"
      ],
    actifs_cles: [
        {
          nom: "Bacosides",
          polarite: "Liposoluble"
        },
        {
          nom: "Alcaloïdes",
          polarite: "Mixte"
        },
        {
          nom: "Flavonoïdes",
          polarite: "Hydrosoluble"
        }
      ],
    preuve_scientifique: "Amélioration de la mémoire et de la vitesse de traitement de l'information. Réduction de l'anxiété via la modulation des récepteurs GABAergiques et la protection des neurones contre le stress oxydatif.",
    pourquoi_bloomlab: {
        probleme_traditionnel: "Les bacosides (actifs nootropiques majeurs) sont lipophiles. Une extraction aqueuse seule est inefficace.",
        phase_A: {
          temp: "65°C",
          temps: "2h00",
          solvant: "Eau distillée + Glycérine (70/30)",
          cible: "Flavonoïdes, alcaloïdes hydrosolubles"
        },
        phase_B: {
          temp: "50°C",
          temps: "3h00",
          solvant: "Alcool bio 96°",
          cible: "Bacosides"
        }
      },
    recette_pas_a_pas: {
        batch_standard: "Cible BloomLab : 750ml de solvant + 75g de plantes (Rendement final estimé : ~600-650ml)",
        ingredients: {
          phase_A: [
            "50g de Bacopa séché",
            "350ml d'Eau distillée",
            "150ml de Glycérine végétale"
          ],
          phase_B: [
            "25g de Bacopa séché",
            "250ml d'Alcool bio 96°"
          ]
        },
        preparation: [
          "La plante est légère. Tassez les 50g dans la cuve.",
          "Mixez les 25g restants pour la Phase B."
        ],
        phase_A_instructions: [
          "Versez eau et glycérine. Ajoutez les 50g de plante tassée.",
          "Fermez, mode manuel 'OIL', TEMP 65°C, TEMPS 2h00. START."
        ],
        transition: [
          "1. Éteignez. Laissez reposer 20 minutes.",
          "2. TEST SENSORIEL OBLIGATOIRE : Posez votre main sur la paroi extérieure de la cuve. Elle doit être 'tiède au toucher' (environ 40°C), et non brûlante.",
          "3. ⚠️ SÉCURITÉ : N'ajoutez l'alcool que lorsque ce test est validé."
        ],
        phase_B_instructions: [
          "Ajoutez l'alcool et les 25g de plante mixée.",
          "Fermez, mode manuel 'OIL', TEMP 50°C, TEMPS 3h00. START."
        ],
        filtration_et_finition: [
          "Filtrez à l'étamine. Pressez le marc.",
          "Le liquide sera vert-brun. Mettez en flacon ambré."
        ]
      },
    socle_synergique: {
        cofacteurs_complements: [
          {
            nom: "Oméga-3 (DHA)",
            dose: "1000mg/jour",
            role: "Les bacosides améliorent la communication neuronale, mais le DHA est la brique structurelle des membranes neuronales."
          },
          {
            nom: "Magnésium L-Thréonate",
            dose: "Selon protocole",
            role: "Seule forme de magnésium traversant efficacement la barrière hémato-encéphalique pour soutenir la neuroplasticité."
          }
        ],
        leviers_du_vivant: [
          {
            nom: "Apprentissage continu",
            frequence: "Quotidienne",
            role: "La neuroplasticité induite par le bacopa nécessite une stimulation cognitive pour créer de nouvelles connexions synaptiques."
          }
        ]
      },
    convergence_ancestrale: "Brahmi en Ayurveda. Utilisé depuis des millénaires par les érudits pour améliorer la mémoire et la concentration.",
    synergies_recommandees: [
        "rhodiola_rosea",
        "ginkgo_biloba",
        "melissa_officinalis"
      ],
    precautions: "Peut causer des troubles digestifs légers au début. À prendre au milieu d'un repas. Déconseillé en cas de bradycardie."
  },
  {
    plant_id: "ganoderma_lucidum",
    nom_commun: "Reishi",
    nom_latin: "Ganoderma lucidum",
    partie_utilisee: "Fruit (champignon) séché",
    famille_bloom: "Chef d'Orchestre (Immunité & Calme)",
    terrains_cibles: [
        "T3_Immunité",
        "T7_Psycho_émotionnel",
        "T2_Foie"
      ],
    actifs_cles: [
        {
          nom: "Polysaccharides (Bêta-glucanes)",
          polarite: "Hydrosoluble"
        },
        {
          nom: "Triterpènes",
          polarite: "Liposoluble"
        }
      ],
    preuve_scientifique: "Modulation immunitaire (équilibre Th1/Th2, augmentation des cellules NK), action hépatoprotectrice, et effet calmant sur le système nerveux central via les triterpènes.",
    pourquoi_bloomlab: {
        probleme_traditionnel: "La paroi de chitine du champignon nécessite une chaleur prolongée pour libérer les bêta-glucanes. Les triterpènes (amers et calmants) nécessitent un solvant organique.",
        phase_A: {
          temp: "80°C",
          temps: "3h00",
          solvant: "Eau distillée + Glycérine (70/30)",
          cible: "Polysaccharides (Bêta-glucanes)"
        },
        phase_B: {
          temp: "50°C",
          temps: "3h00",
          solvant: "Alcool bio 96°",
          cible: "Triterpènes"
        }
      },
    recette_pas_a_pas: {
        batch_standard: "Cible BloomLab : 750ml de solvant + 75g de plantes (Rendement final estimé : ~600-650ml)",
        ingredients: {
          phase_A: [
            "50g de Reishi en poudre grossière",
            "350ml d'Eau distillée",
            "150ml de Glycérine végétale"
          ],
          phase_B: [
            "25g de Reishi en poudre fine",
            "250ml d'Alcool bio 96°"
          ]
        },
        preparation: [
          "Utilisez du Reishi déjà broyé ou broyez-le finement. La texture est très dure.",
          "Séparez en 50g pour la Phase A et 25g pour la Phase B."
        ],
        phase_A_instructions: [
          "Versez eau et glycérine. Ajoutez les 50g de poudre.",
          "Fermez, mode manuel 'OIL', TEMP 80°C, TEMPS 3h00. START."
        ],
        transition: [
          "1. Éteignez. Laissez reposer 30 minutes (la poudre de champignon retient la chaleur).",
          "2. TEST SENSORIEL OBLIGATOIRE : Posez votre main sur la paroi extérieure de la cuve. Elle doit être 'tiède au toucher' (environ 40°C), et non brûlante.",
          "3. ⚠️ SÉCURITÉ : N'ajoutez l'alcool que lorsque ce test est validé."
        ],
        phase_B_instructions: [
          "Ajoutez l'alcool et les 25g de poudre fine.",
          "Fermez, mode manuel 'OIL', TEMP 50°C, TEMPS 3h00. START."
        ],
        filtration_et_finition: [
          "Filtrez à l'étamine double épaisseur. Pressez très fermement.",
          "Le liquide sera brun foncé et amer. Mettez en flacon ambré."
        ]
      },
    socle_synergique: {
        cofacteurs_complements: [
          {
            nom: "Vitamine C",
            dose: "500mg/jour",
            role: "Potentialise l'absorption et l'activité immunitaire des bêta-glucanes."
          },
          {
            nom: "Zinc",
            dose: "15mg/jour",
            role: "Cofacteur essentiel de la fonction des cellules NK activées par le Reishi."
          }
        ],
        leviers_du_vivant: [
          {
            nom: "Cohérence cardiaque",
            frequence: "2x 5min/jour",
            role: "Synergie parfaite avec l'effet calmant du Reishi sur le système nerveux."
          }
        ]
      },
    convergence_ancestrale: "Ling Zhi en MTC, le 'champignon de l'immortalité'. Utilisé pour calmer l'esprit (Shen) et tonifier le Qi.",
    synergies_recommandees: [
        "astragalus_membranaceus",
        "cordyceps_sinensis",
        "passiflora_incarnata"
      ],
    precautions: "Peut fluidifier le sang. À utiliser avec prudence en cas de traitement anticoagulant ou avant une intervention chirurgicale."
  },
  {
    plant_id: "cannabis_sativa_fleurs",
    nom_commun: "Chanvre Industriel (Fleurs)",
    nom_latin: "Cannabis sativa L. (<0.3% THC)",
    partie_utilisee: "Fleurs séchées",
    famille_bloom: "Réparateur (Système Endocannabinoïde)",
    terrains_cibles: [
        "T1_Intestin",
        "T8_Inflammation",
        "T7_Psycho_émotionnel"
      ],
    actifs_cles: [
        {
          nom: "Cannabidiol (CBD)",
          polarite: "Liposoluble"
        },
        {
          nom: "Cannabigérol (CBG)",
          polarite: "Liposoluble"
        },
        {
          nom: "Terpènes (Myrcène, Pinène)",
          polarite: "Volatile/Liposoluble"
        }
      ],
    preuve_scientifique: "Modulation du système endocannabinoïde (récepteurs CB1 et CB2). Réduction de l'inflammation intestinale (leaky gut), action anxiolytique sans effet psychotrope, et modulation de la douleur.",
    pourquoi_bloomlab: {
        probleme_traditionnel: "Les cannabinoïdes et les terpènes sont strictement liposolubles et très thermolabiles. Une extraction aqueuse est inutile. Une chaleur >60°C dégrade les terpènes et décarboxyle le CBD de manière incontrôlée.",
        phase_A: {
          temp: "50°C",
          temps: "1h00",
          solvant: "Eau distillée + Glycérine (70/30)",
          cible: "Flavonoïdes mineurs (cannaflavines)"
        },
        phase_B: {
          temp: "45°C",
          temps: "4h00",
          solvant: "Huile de Jojoba ou Huile de Coco MCT",
          cible: "CBD, CBG, Terpènes"
        }
      },
    recette_pas_a_pas: {
        batch_standard: "Cible BloomLab : 750ml de solvant + 75g de plantes (Rendement final estimé : ~600-650ml)",
        ingredients: {
          phase_A: [
            "50g de Fleurs de Chanvre (légèrement concassées)",
            "350ml d'Eau distillée",
            "150ml de Glycérine végétale"
          ],
          phase_B: [
            "25g de Fleurs de Chanvre (légèrement concassées)",
            "250ml d'Huile de Jojoba ou Coco MCT"
          ]
        },
        preparation: [
          "Ne mixez pas les fleurs en poudre fine pour éviter une extraction trop agressive des chlorophylles.",
          "Concassez grossièrement à la main."
        ],
        phase_A_instructions: [
          "Versez eau et glycérine. Ajoutez les 50g de fleurs.",
          "Fermez, mode manuel 'OIL', TEMP 50°C, TEMPS 1h00. START."
        ],
        transition: [
          "1. Éteignez. Laissez reposer 20 minutes.",
          "2. TEST SENSORIEL OBLIGATOIRE : Posez votre main sur la paroi extérieure de la cuve. Elle doit être 'tiède au toucher' (environ 40°C), et non brûlante.",
          "3. ⚠️ SÉCURITÉ : N'ajoutez l'huile que lorsque ce test est validé."
        ],
        phase_B_instructions: [
          "Ajoutez l'huile et les 25g de fleurs restantes.",
          "Fermez, mode manuel 'OIL', TEMP 45°C, TEMPS 4h00. START."
        ],
        filtration_et_finition: [
          "Filtrez à l'étamine. Pressez doucement pour éviter de troubler l'huile.",
          "Le liquide sera une huile verte/dorée aromatique. Mettez en flacon ambré."
        ]
      },
    socle_synergique: {
        cofacteurs_complements: [
          {
            nom: "Oméga-3",
            dose: "2g/jour",
            role: "Les acides gras oméga-3 sont les précurseurs des endocannabinoïdes naturels du corps, créant une synergie parfaite avec le CBD."
          },
          {
            nom: "Magnésium",
            dose: "300mg/jour",
            role: "Potentialise l'effet relaxant musculaire et nerveux du chanvre."
          }
        ],
        leviers_du_vivant: [
          {
            nom: "Réduction du stress oxydatif",
            frequence: "Quotidienne",
            role: "Le système endocannabinoïde fonctionne mieux lorsque la charge inflammatoire globale est réduite (via l'alimentation et le sommeil)."
          }
        ]
      },
    convergence_ancestrale: "Utilisé en médecine traditionnelle chinoise et ayurvédique pour calmer l'esprit, réduire la douleur et harmoniser le corps.",
    synergies_recommandees: [
        "curcuma_longa",
        "boswellia_serrata",
        "melissa_officinalis"
      ],
    precautions: "Vérifiez la législation locale sur le CBD. Déconseillé en cas de grossesse, d'allaitement ou de traitement par inhibiteurs du cytochrome P450 (demandez l'avis d'un professionnel de santé)."
  },
  {
    plant_id: "ginkgo_biloba",
    nom_commun: "Ginkgo",
    nom_latin: "Ginkgo biloba",
    partie_utilisee: "Feuilles séchées",
    famille_bloom: "Pharmacie Intérieure (Microcirculation & Neuro)",
    terrains_cibles: [
        "T5_Mitochondrie",
        "T7_Psycho_emotionnel",
        "T9_Peau_Phaneres"
      ],
    actifs_cles: [
        {
          nom: "Ginkgolides (A, B, C)",
          polarite: "Liposoluble"
        },
        {
          nom: "Flavones glycosides",
          polarite: "Hydrosoluble"
        },
        {
          nom: "Acide ginkgolique",
          polarite: "Liposoluble"
        }
      ],
    preuve_scientifique: "Amélioration de la microcirculation cérébrale et périphérique, protection contre le stress oxydatif neuronal, et inhibition du facteur d'activation plaquettaire (PAF).",
    pourquoi_bloomlab: {
        probleme_traditionnel: "Les ginkgolides (actifs vasculaires majeurs) sont liposolubles, tandis que les flavones sont hydrosolubles. Une infusion rate les ginkgolides, une macération alcoolique seule rate les flavones.",
        phase_A: {
          temp: "70°C",
          temps: "2h00",
          solvant: "Eau distillée + Glycérine (70/30)",
          cible: "Flavones glycosides"
        },
        phase_B: {
          temp: "50°C",
          temps: "3h00",
          solvant: "Alcool bio 96°",
          cible: "Ginkgolides, acide ginkgolique"
        }
      },
    recette_pas_a_pas: {
        batch_standard: "Cible BloomLab : 750ml de solvant + 75g de plantes (Rendement final estimé : ~600-650ml)",
        ingredients: {
          phase_A: [
            "50g de Feuilles de Ginkgo",
            "350ml d'Eau distillée",
            "150ml de Glycérine végétale"
          ],
          phase_B: [
            "25g de Feuilles de Ginkgo",
            "250ml d'Alcool bio 96°"
          ]
        },
        preparation: [
          "Les feuilles sont relativement légères. Tassez les 50g dans la cuve.",
          "Mixez les 25g restants pour la Phase B."
        ],
        phase_A_instructions: [
          "Versez eau et glycérine. Ajoutez les 50g de feuilles tassées.",
          "Fermez, mode manuel 'OIL', TEMP 70°C, TEMPS 2h00. START."
        ],
        transition: [
          "1. Éteignez. Laissez reposer 20 minutes.",
          "2. TEST SENSORIEL OBLIGATOIRE : Posez votre main sur la paroi extérieure de la cuve. Elle doit être 'tiède au toucher' (environ 40°C), et non brûlante.",
          "3. ⚠️ SÉCURITÉ : N'ajoutez l'alcool que lorsque ce test est validé."
        ],
        phase_B_instructions: [
          "Ajoutez l'alcool et les 25g de feuilles mixées.",
          "Fermez, mode manuel 'OIL', TEMP 50°C, TEMPS 3h00. START."
        ],
        filtration_et_finition: [
          "Filtrez à l'étamine. Pressez le marc.",
          "Le liquide sera jaune-vert. Mettez en flacon ambré."
        ]
      },
    socle_synergique: {
        cofacteurs_complements: [
          {
            nom: "Oméga-3 (EPA/DHA)",
            dose: "1000mg/jour",
            role: "Fluidifie les membranes cellulaires, potentialisant l'action microcirculatoire du Ginkgo."
          },
          {
            nom: "Magnésium",
            dose: "300mg/jour",
            role: "Relaxant vasculaire naturel, synergique avec l'effet du Ginkgo."
          }
        ],
        leviers_du_vivant: [
          {
            nom: "Exercice cardiovasculaire léger",
            frequence: "30 min/jour",
            role: "Stimule la pompe cardiaque, maximisant la distribution des actifs du Ginkgo aux extrémités et au cerveau."
          }
        ]
      },
    convergence_ancestrale: "Utilisé en MTC depuis des millénaires pour 'nourrir le cerveau' et 'débloquer les méridiens'.",
    synergies_recommandees: [
        "bacopa_monnieri",
        "rhodiola_rosea",
        "vaccinium_myrtillus"
      ],
    precautions: "Contre-indiqué en cas de traitement anticoagulant ou antiagrégant plaquettaire. À arrêter 1 semaine avant toute intervention chirurgicale."
  },
  {
    plant_id: "trigonella_foenum_graecum",
    nom_commun: "Fenugrec",
    nom_latin: "Trigonella foenum-graecum",
    partie_utilisee: "Graines séchées",
    famille_bloom: "Réparateur (Métabolique & Capillaire)",
    terrains_cibles: [
        "T10_Hormonal",
        "T1_Intestin",
        "T9_Peau_Phaneres"
      ],
    actifs_cles: [
        {
          nom: "Saponines stéroïdiques",
          polarite: "Liposoluble"
        },
        {
          nom: "Mucilages",
          polarite: "Hydrosoluble"
        },
        {
          nom: "4-hydroxyisoleucine",
          polarite: "Hydrosoluble"
        }
      ],
    preuve_scientifique: "Modulation de la glycémie (stimulation de la sécrétion d'insuline), action galactogène, et apport de précurseurs hormonaux naturels soutenant la densité capillaire et la vitalité.",
    pourquoi_bloomlab: {
        probleme_traditionnel: "Les mucilages (apaisants intestinaux) nécessitent de l'eau tiède, tandis que les saponines stéroïdiques (régulatrices) nécessitent un solvant organique et une chaleur modérée.",
        phase_A: {
          temp: "65°C",
          temps: "2h00",
          solvant: "Eau distillée + Glycérine (70/30)",
          cible: "Mucilages, 4-hydroxyisoleucine"
        },
        phase_B: {
          temp: "50°C",
          temps: "3h00",
          solvant: "Alcool bio 96°",
          cible: "Saponines stéroïdiques"
        }
      },
    recette_pas_a_pas: {
        batch_standard: "Cible BloomLab : 750ml de solvant + 75g de plantes (Rendement final estimé : ~600-650ml)",
        ingredients: {
          phase_A: [
            "50g de Graines de Fenugrec (légèrement concassées)",
            "350ml d'Eau distillée",
            "150ml de Glycérine végétale"
          ],
          phase_B: [
            "25g de Graines de Fenugrec (poudre)",
            "250ml d'Alcool bio 96°"
          ]
        },
        preparation: [
          "Concassez légèrement les 50g de graines pour la Phase A (évitez la poudre fine pour ne pas géifier l'eau).",
          "Mixez les 25g restants en poudre pour la Phase B."
        ],
        phase_A_instructions: [
          "Versez eau et glycérine. Ajoutez les 50g de graines concassées.",
          "Fermez, mode manuel 'OIL', TEMP 65°C, TEMPS 2h00. START."
        ],
        transition: [
          "1. Éteignez. Laissez reposer 20 minutes.",
          "2. TEST SENSORIEL OBLIGATOIRE : Posez votre main sur la paroi extérieure de la cuve. Elle doit être 'tiède au toucher' (environ 40°C), et non brûlante.",
          "3. ⚠️ SÉCURITÉ : N'ajoutez l'alcool que lorsque ce test est validé."
        ],
        phase_B_instructions: [
          "Ajoutez l'alcool et les 25g de poudre.",
          "Fermez, mode manuel 'OIL', TEMP 50°C, TEMPS 3h00. START."
        ],
        filtration_et_finition: [
          "Filtrez à l'étamine. Le mélange sera légèrement visqueux (mucilages). Pressez fermement.",
          "Mettez en flacon ambré."
        ]
      },
    socle_synergique: {
        cofacteurs_complements: [
          {
            nom: "Zinc",
            dose: "15mg/jour",
            role: "Cofacteur essentiel de la synthèse des hormones stéroïdiennes et de la kératine."
          },
          {
            nom: "Vitamines B",
            dose: "Complexe B",
            role: "Soutien du métabolisme des glucides potentialisé par le fenugrec."
          }
        ],
        leviers_du_vivant: [
          {
            nom: "Réduction des sucres rapides",
            frequence: "Quotidienne",
            role: "Le fenugrec régule la glycémie, mais l'hygiène alimentaire reste le pilier de l'équilibre insulinique."
          }
        ]
      },
    convergence_ancestrale: "Utilisé en Égypte ancienne et en Ayurveda pour la vitalité, la digestion et la santé reproductive.",
    synergies_recommandees: [
        "urtica_dioica",
        "panax_ginseng",
        "cinnamomum_verum"
      ],
    precautions: "Déconseillé en cas de diabète sous traitement (risque d'hypoglycémie) et pendant la grossesse (effet utérotonique à haute dose)."
  },
  {
    plant_id: "plantago_major",
    nom_commun: "Plantain majeur",
    nom_latin: "Plantago major",
    partie_utilisee: "Feuilles séchées",
    famille_bloom: "Réparateur (Muqueuses & Peau)",
    terrains_cibles: [
        "T1_Intestin",
        "T9_Peau_Phaneres",
        "T3_Immunité"
      ],
    actifs_cles: [
        {
          nom: "Mucilages",
          polarite: "Hydrosoluble"
        },
        {
          nom: "Iridoïdes (Aucuboside)",
          polarite: "Hydrosoluble"
        },
        {
          nom: "Tanins",
          polarite: "Hydrosoluble"
        }
      ],
    preuve_scientifique: "Action émolliente, anti-inflammatoire et cicatrisante sur les muqueuses (intestinales, respiratoires) et la peau. Réduction de la perméabilité intestinale.",
    pourquoi_bloomlab: {
        probleme_traditionnel: "Les mucilages sont très sensibles à la chaleur excessive (qui les dégrade en sucres simples) et aux solvants organiques forts.",
        phase_A: {
          temp: "60°C",
          temps: "1h30",
          solvant: "Eau distillée + Glycérine (70/30)",
          cible: "Mucilages, iridoïdes, tanins"
        },
        phase_B: {
          temp: "45°C",
          temps: "2h00",
          solvant: "Alcool bio 70°",
          cible: "Stabilisation et extraction douce des composés secondaires"
        }
      },
    recette_pas_a_pas: {
        batch_standard: "Cible BloomLab : 750ml de solvant + 75g de plantes (Rendement final estimé : ~600-650ml)",
        ingredients: {
          phase_A: [
            "50g de Feuilles de Plantain",
            "350ml d'Eau distillée",
            "150ml de Glycérine végétale"
          ],
          phase_B: [
            "25g de Feuilles de Plantain",
            "250ml d'Alcool bio 70°"
          ]
        },
        preparation: [
          "Les feuilles sont volumineuses. Tassez les 50g dans la cuve.",
          "Mixez les 25g restants pour la Phase B."
        ],
        phase_A_instructions: [
          "Versez eau et glycérine. Ajoutez les 50g de feuilles tassées.",
          "Fermez, mode manuel 'OIL', TEMP 60°C, TEMPS 1h30. START."
        ],
        transition: [
          "1. Éteignez. Laissez reposer 20 minutes.",
          "2. TEST SENSORIEL OBLIGATOIRE : Posez votre main sur la paroi extérieure de la cuve. Elle doit être 'tiède au toucher' (environ 40°C), et non brûlante.",
          "3. ⚠️ SÉCURITÉ : N'ajoutez l'alcool que lorsque ce test est validé."
        ],
        phase_B_instructions: [
          "Ajoutez l'alcool et les 25g de feuilles mixées.",
          "Fermez, mode manuel 'OIL', TEMP 45°C, TEMPS 2h00. START."
        ],
        filtration_et_finition: [
          "Filtrez à l'étamine. Pressez doucement pour éviter de troubler l'extrait avec trop de particules.",
          "Mettez en flacon ambré."
        ]
      },
    socle_synergique: {
        cofacteurs_complements: [
          {
            nom: "L-Glutamine",
            dose: "5g le matin",
            role: "Synergie parfaite avec les mucilages pour sceller les jonctions serrées de l'intestin."
          },
          {
            nom: "Zinc Carnosine",
            dose: "75mg 2x/jour",
            role: "Réparation ciblée de la muqueuse gastrique et intestinale."
          }
        ],
        leviers_du_vivant: [
          {
            nom: "Mastication extrême",
            frequence: "40 fois par bouchée",
            role: "Prédigère les aliments, réduisant la charge de travail et l'irritation pour un intestin déjà inflammé."
          }
        ]
      },
    convergence_ancestrale: "Considéré comme la 'trace de pas du blanc' par les Amérindiens, utilisé universellement pour cicatriser les plaies et apaiser les inflammations.",
    synergies_recommandees: [
        "aloe_vera",
        "calendula_officinalis",
        "glycyrrhiza_glabra"
      ],
    precautions: "Aucune contre-indication majeure. Peut ralentir légèrement l'absorption d'autres médicaments pris simultanément (prendre à distance)."
  },
  {
    plant_id: "reynoutria_japonica",
    nom_commun: "Renouée du Japon (Racine)",
    nom_latin: "Reynoutria japonica (Polygonum cuspidatum)",
    partie_utilisee: "Racine et rhizome séchés",
    famille_bloom: "Gâchette (Anti-inflammatoire & Antioxydant)",
    terrains_cibles: [
        "T8_Inflammation",
        "T5_Mitochondrie",
        "T2_Foie"
      ],
    actifs_cles: [
        {
          nom: "Resvératrol",
          polarite: "Liposoluble"
        },
        {
          nom: "Émodine",
          polarite: "Liposoluble"
        },
        {
          nom: "Polyphénols",
          polarite: "Hydrosoluble"
        }
      ],
    preuve_scientifique: "Inhibition puissante du NLRP3 inflammasome, protection mitochondriale, et action hépatoprotectrice. C'est l'une des sources naturelles les plus concentrées en resvératrol.",
    pourquoi_bloomlab: {
        probleme_traditionnel: "La racine est très dure et lignifiée. Le resvératrol est strictement liposoluble et sensible à l'oxydation.",
        phase_A: {
          temp: "75°C",
          temps: "2h30",
          solvant: "Eau distillée + Glycérine (70/30)",
          cible: "Polyphénols hydrosolubles"
        },
        phase_B: {
          temp: "50°C",
          temps: "3h00",
          solvant: "Alcool bio 96°",
          cible: "Resvératrol, émodine"
        }
      },
    recette_pas_a_pas: {
        batch_standard: "Cible BloomLab : 750ml de solvant + 75g de plantes (Rendement final estimé : ~600-650ml)",
        ingredients: {
          phase_A: [
            "50g de Racine de Renouée (copeaux)",
            "350ml d'Eau distillée",
            "150ml de Glycérine végétale"
          ],
          phase_B: [
            "25g de Racine de Renouée (poudre)",
            "250ml d'Alcool bio 96°"
          ]
        },
        preparation: [
          "Concassez vigoureusement les 50g de racine pour la Phase A.",
          "Mixez les 25g restants en poudre fine pour la Phase B."
        ],
        phase_A_instructions: [
          "Versez eau et glycérine. Ajoutez les 50g de copeaux.",
          "Fermez, mode manuel 'OIL', TEMP 75°C, TEMPS 2h30. START."
        ],
        transition: [
          "1. Éteignez. Laissez reposer 25 minutes (la racine dense retient la chaleur).",
          "2. TEST SENSORIEL OBLIGATOIRE : Posez votre main sur la paroi extérieure de la cuve. Elle doit être 'tiède au toucher' (environ 40°C), et non brûlante.",
          "3. ⚠️ SÉCURITÉ : N'ajoutez l'alcool que lorsque ce test est validé."
        ],
        phase_B_instructions: [
          "Ajoutez l'alcool et les 25g de poudre.",
          "Fermez, mode manuel 'OIL', TEMP 50°C, TEMPS 3h00. START."
        ],
        filtration_et_finition: [
          "Filtrez à l'étamine. Pressez fermement le marc de racine.",
          "Le liquide sera brun-rouge. Mettez en flacon ambré."
        ]
      },
    socle_synergique: {
        cofacteurs_complements: [
          {
            nom: "Pipérine (Poivre noir)",
            dose: "5-10mg",
            role: "Augmente la biodisponibilité du resvératrol de plus de 2000%."
          },
          {
            nom: "NAC",
            dose: "600mg/jour",
            role: "Synergie antioxydante pour protéger les mitochondries avec le resvératrol."
          }
        ],
        leviers_du_vivant: [
          {
            nom: "Jeûne intermittent",
            frequence: "14-16h de nuit",
            role: "Active la sirtuine 1 (SIRT1), la même voie de longévité que cible le resvératrol."
          }
        ]
      },
    convergence_ancestrale: "Utilisée en MTC (Hu Zhang) pour 'invigorer le sang, disperser les stases et clarifier la chaleur'.",
    synergies_recommandees: [
        "curcuma_longa",
        "vitis_vinifera",
        "boswellia_serrata"
      ],
    precautions: "Peut avoir un effet laxatif à haute dose (présence d'émodine). Déconseillé en cas de grossesse ou de traitement anticoagulant."
  },
  {
    plant_id: "picrasma_quassioides",
    nom_commun: "Quassia amer",
    nom_latin: "Picrasma quassioides (Quassia amara)",
    partie_utilisee: "Bois séché",
    famille_bloom: "Déclencheur (Amère & Antiparasitaire)",
    terrains_cibles: [
        "T1_Intestin",
        "T2_Foie",
        "T3_Immunité"
      ],
    actifs_cles: [
        {
          nom: "Quassinoïdes",
          polarite: "Hydrosoluble/Liposoluble"
        },
        {
          nom: "Tanins",
          polarite: "Hydrosoluble"
        }
      ],
    preuve_scientifique: "L'une des substances les plus amères connues. Stimule fortement la sécrétion de bile et de sucs gastriques. Action antiparasitaire et antifongique (Candida) douce mais efficace.",
    pourquoi_bloomlab: {
        probleme_traditionnel: "Le bois est très dur. Les quassinoïdes nécessitent une extraction séquentielle pour être pleinement capturés sans sur-extraction des tanins astringents.",
        phase_A: {
          temp: "70°C",
          temps: "2h00",
          solvant: "Eau distillée + Glycérine (70/30)",
          cible: "Quassinoïdes hydrosolubles, tanins"
        },
        phase_B: {
          temp: "50°C",
          temps: "3h00",
          solvant: "Alcool bio 96°",
          cible: "Quassinoïdes liposolubles"
        }
      },
    recette_pas_a_pas: {
        batch_standard: "Cible BloomLab : 750ml de solvant + 75g de plantes (Rendement final estimé : ~600-650ml)",
        ingredients: {
          phase_A: [
            "50g de Copeaux de Quassia",
            "350ml d'Eau distillée",
            "150ml de Glycérine végétale"
          ],
          phase_B: [
            "25g de Quassia (poudre)",
            "250ml d'Alcool bio 96°"
          ]
        },
        preparation: [
          "Utilisez des copeaux fins pour la Phase A.",
          "Mixez les 25g restants en poudre pour la Phase B."
        ],
        phase_A_instructions: [
          "Versez eau et glycérine. Ajoutez les 50g de copeaux.",
          "Fermez, mode manuel 'OIL', TEMP 70°C, TEMPS 2h00. START."
        ],
        transition: [
          "1. Éteignez. Laissez reposer 20 minutes.",
          "2. TEST SENSORIEL OBLIGATOIRE : Posez votre main sur la paroi extérieure de la cuve. Elle doit être 'tiède au toucher' (environ 40°C), et non brûlante.",
          "3. ⚠️ SÉCURITÉ : N'ajoutez l'alcool que lorsque ce test est validé."
        ],
        phase_B_instructions: [
          "Ajoutez l'alcool et les 25g de poudre.",
          "Fermez, mode manuel 'OIL', TEMP 50°C, TEMPS 3h00. START."
        ],
        filtration_et_finition: [
          "Filtrez à l'étamine. Pressez fermement.",
          "Le liquide sera jaune pâle, d'une amertume extrême. Mettez en flacon ambré."
        ]
      },
    socle_synergique: {
        cofacteurs_complements: [
          {
            nom: "Probiotiques (S. Boulardii)",
            dose: "Après la cure",
            role: "Le Quassia nettoie le terrain des levures, les probiotiques reconstruisent la flore ensuite."
          },
          {
            nom: "Zinc",
            dose: "15mg/jour",
            role: "Restaure le sens du goût, souvent altéré par les régimes ou les carences, permettant de mieux tolérer l'amertume."
          }
        ],
        leviers_du_vivant: [
          {
            nom: "Éviction totale des sucres raffinés",
            frequence: "Pendant la cure",
            role: "Affame les candidas et parasites que le Quassia aide à éliminer."
          }
        ]
      },
    convergence_ancestrale: "Utilisé en Amérique du Sud et en Afrique de l'Ouest comme tonique amer et vermifuge naturel.",
    synergies_recommandees: [
        "gentiana_lutea",
        "origanum_vulgare",
        "nigella_sativa"
      ],
    precautions: "Amertume extrême : commencer par de très petites doses. Déconseillé en cas d'ulcère gastrique ou de calculs biliaires."
  },
  {
    plant_id: "euphrasia_officinalis",
    nom_commun: "Euphraise",
    nom_latin: "Euphrasia officinalis",
    partie_utilisee: "Parties aériennes séchées",
    famille_bloom: "Réparateur (Muqueuses & Immunité)",
    terrains_cibles: [
        "T3_Immunité",
        "T9_Peau_Phaneres",
        "T1_Intestin"
      ],
    actifs_cles: [
        {
          nom: "Iridoïdes (Euphrosine)",
          polarite: "Hydrosoluble"
        },
        {
          nom: "Tanins",
          polarite: "Hydrosoluble"
        },
        {
          nom: "Flavonoïdes",
          polarite: "Hydrosoluble"
        }
      ],
    preuve_scientifique: "Action astringente, anti-inflammatoire et décongestionnante spécifique des muqueuses (oculaires, respiratoires, intestinales).",
    pourquoi_bloomlab: {
        probleme_traditionnel: "Les iridoïdes sont sensibles à la chaleur prolongée. Une extraction douce et séquencée préserve leur activité sur les muqueuses.",
        phase_A: {
          temp: "65°C",
          temps: "1h30",
          solvant: "Eau distillée + Glycérine (70/30)",
          cible: "Iridoïdes, tanins, flavonoïdes"
        },
        phase_B: {
          temp: "45°C",
          temps: "2h00",
          solvant: "Alcool bio 70°",
          cible: "Stabilisation des composés"
        }
      },
    recette_pas_a_pas: {
        batch_standard: "Cible BloomLab : 750ml de solvant + 75g de plantes (Rendement final estimé : ~600-650ml)",
        ingredients: {
          phase_A: [
            "50g d'Euphraise séchée",
            "350ml d'Eau distillée",
            "150ml de Glycérine végétale"
          ],
          phase_B: [
            "25g d'Euphraise séchée",
            "250ml d'Alcool bio 70°"
          ]
        },
        preparation: [
          "La plante est très légère. Tassez les 50g dans la cuve.",
          "Mixez les 25g restants pour la Phase B."
        ],
        phase_A_instructions: [
          "Versez eau et glycérine. Ajoutez les 50g de plante tassée.",
          "Fermez, mode manuel 'OIL', TEMP 65°C, TEMPS 1h30. START."
        ],
        transition: [
          "1. Éteignez. Laissez reposer 20 minutes.",
          "2. TEST SENSORIEL OBLIGATOIRE : Posez votre main sur la paroi extérieure de la cuve. Elle doit être 'tiède au toucher' (environ 40°C), et non brûlante.",
          "3. ⚠️ SÉCURITÉ : N'ajoutez l'alcool que lorsque ce test est validé."
        ],
        phase_B_instructions: [
          "Ajoutez l'alcool et les 25g de plante mixée.",
          "Fermez, mode manuel 'OIL', TEMP 45°C, TEMPS 2h00. START."
        ],
        filtration_et_finition: [
          "Filtrez à l'étamine fine. Pressez le marc.",
          "Le liquide sera brun-vert. Mettez en flacon ambré."
        ]
      },
    socle_synergique: {
        cofacteurs_complements: [
          {
            nom: "Vitamine A",
            dose: "Selon besoins",
            role: "Indispensable à l'intégrité de toutes les muqueuses (yeux, intestin, poumons)."
          },
          {
            nom: "Quercétine",
            dose: "500mg/jour",
            role: "Stabilise mastocytes, réduisant l'inflammation allergique des muqueuses."
          }
        ],
        leviers_du_vivant: [
          {
            nom: "Hydratation des muqueuses",
            frequence: "Quotidienne",
            role: "Boire de l'eau régulièrement maintient la couche de mucus protectrice que l'euphraise aide à réparer."
          }
        ]
      },
    convergence_ancestrale: "Nommée 'l'herbe aux yeux' depuis le Moyen Âge, utilisée par Hildegarde de Bingen pour les affections oculaires et respiratoires.",
    synergies_recommandees: [
        "plantago_major",
        "calendula_officinalis",
        "echinacea_purpurea"
      ],
    precautions: "Aucune contre-indication majeure connue. Peut causer une légère constipation à très haute dose (effet astringent des tanins)."
  },
  {
    plant_id: "vaccinium_myrtillus",
    nom_commun: "Myrtille",
    nom_latin: "Vaccinium myrtillus",
    partie_utilisee: "Fruits séchés (ou feuilles pour usage spécifique)",
    famille_bloom: "Réparateur (Microcirculation & Collagène)",
    terrains_cibles: [
        "T5_Mitochondrie",
        "T9_Peau_Phaneres",
        "T7_Psycho_emotionnel"
      ],
    actifs_cles: [
        {
          nom: "Anthocyanes",
          polarite: "Hydrosoluble/Thermolabile"
        },
        {
          nom: "Myrtilline",
          polarite: "Hydrosoluble"
        },
        {
          nom: "Tanins",
          polarite: "Hydrosoluble"
        }
      ],
    preuve_scientifique: "Protection de la microcirculation (rétine, peau, cerveau), renforcement du collagène, et action antioxydante puissante.",
    pourquoi_bloomlab: {
        probleme_traditionnel: "Les anthocyanes sont extrêmement thermolabiles. Une cuisson >70°C les détruit presque entièrement, annulant le bénéfice microcirculatoire.",
        phase_A: {
          temp: "60°C",
          temps: "1h30",
          solvant: "Eau distillée + Glycérine (70/30)",
          cible: "Anthocyanes, myrtilline"
        },
        phase_B: {
          temp: "45°C",
          temps: "2h00",
          solvant: "Alcool bio 70°",
          cible: "Stabilisation des polyphénols"
        }
      },
    recette_pas_a_pas: {
        batch_standard: "Cible BloomLab : 750ml de solvant + 75g de plantes (Rendement final estimé : ~600-650ml)",
        ingredients: {
          phase_A: [
            "50g de Myrtilles séchées",
            "350ml d'Eau distillée",
            "150ml de Glycérine végétale"
          ],
          phase_B: [
            "25g de Myrtilles séchées",
            "250ml d'Alcool bio 70°"
          ]
        },
        preparation: [
          "Les fruits séchés sont collants. Séparez-les bien avant de les peser.",
          "Mixez légèrement les 25g de la Phase B."
        ],
        phase_A_instructions: [
          "Versez eau et glycérine. Ajoutez les 50g de myrtilles.",
          "Fermez, mode manuel 'OIL', TEMP 60°C, TEMPS 1h30. START."
        ],
        transition: [
          "1. Éteignez. Laissez reposer 20 minutes.",
          "2. TEST SENSORIEL OBLIGATOIRE : Posez votre main sur la paroi extérieure de la cuve. Elle doit être 'tiède au toucher' (environ 40°C), et non brûlante.",
          "3. ⚠️ SÉCURITÉ : N'ajoutez l'alcool que lorsque ce test est validé."
        ],
        phase_B_instructions: [
          "Ajoutez l'alcool et les 25g de myrtilles mixées.",
          "Fermez, mode manuel 'OIL', TEMP 45°C, TEMPS 2h00. START."
        ],
        filtration_et_finition: [
          "Filtrez à l'étamine. Pressez doucement.",
          "Le liquide sera rouge-violet profond. Mettez en flacon ambré ou violet (Miron)."
        ]
      },
    socle_synergique: {
        cofacteurs_complements: [
          {
            nom: "Vitamine C",
            dose: "500mg/jour",
            role: "Synergie obligatoire : la vitamine C est le cofacteur de la synthèse du collagène que les anthocyanes protègent."
          },
          {
            nom: "Oméga-3",
            dose: "1000mg/jour",
            role: "Fluidifie les membranes des capillaires, améliorant l'effet de la myrtille."
          }
        ],
        leviers_du_vivant: [
          {
            nom: "Protection solaire",
            frequence: "Quotidienne",
            role: "Les anthocyanes protègent la peau de l'intérieur, mais ne remplacent pas la protection physique contre les UV."
          }
        ]
      },
    convergence_ancestrale: "Utilisée par les aviateurs de la RAF pendant la Seconde Guerre mondiale pour améliorer la vision nocturne.",
    synergies_recommandees: [
        "centella_asiatica",
        "ginkgo_biloba",
        "rosa_canina"
      ],
    precautions: "Peut avoir un léger effet astringent (constipant) à très haute dose en raison des tanins."
  },
  {
    plant_id: "lepidium_meyenii",
    nom_commun: "Maca",
    nom_latin: "Lepidium meyenii",
    partie_utilisee: "Racine (hypocotyle) séchée",
    famille_bloom: "Chef d'Orchestre (Adaptogène Hormonal)",
    terrains_cibles: [
        "T4_HPA",
        "T10_Hormonal",
        "T5_Mitochondrie"
      ],
    actifs_cles: [
        {
          nom: "Macamides et Macaènes",
          polarite: "Liposoluble"
        },
        {
          nom: "Glucosinolates",
          polarite: "Hydrosoluble"
        },
        {
          nom: "Polysaccharides",
          polarite: "Hydrosoluble"
        }
      ],
    preuve_scientifique: "Modulation de l'axe HPA sans contenir d'hormones exogènes. Amélioration de la libido, de l'énergie et de l'humeur via l'équilibre des neurotransmetteurs.",
    pourquoi_bloomlab: {
        probleme_traditionnel: "La racine de maca est très dense. Les macamides (actifs endocriniens) sont liposolubles, tandis que les glucosinolates sont hydrosolubles.",
        phase_A: {
          temp: "70°C",
          temps: "2h00",
          solvant: "Eau distillée + Glycérine (70/30)",
          cible: "Glucosinolates, polysaccharides"
        },
        phase_B: {
          temp: "50°C",
          temps: "3h00",
          solvant: "Alcool bio 96°",
          cible: "Macamides, macaènes"
        }
      },
    recette_pas_a_pas: {
        batch_standard: "Cible BloomLab : 750ml de solvant + 75g de plantes (Rendement final estimé : ~600-650ml)",
        ingredients: {
          phase_A: [
            "50g de Racine de Maca (poudre grossière)",
            "350ml d'Eau distillée",
            "150ml de Glycérine végétale"
          ],
          phase_B: [
            "25g de Racine de Maca (poudre fine)",
            "250ml d'Alcool bio 96°"
          ]
        },
        preparation: [
          "Utilisez de la poudre de maca de qualité alimentaire.",
          "Séparez 50g pour la Phase A et 25g pour la Phase B."
        ],
        phase_A_instructions: [
          "Versez eau et glycérine. Ajoutez les 50g de poudre.",
          "Fermez, mode manuel 'OIL', TEMP 70°C, TEMPS 2h00. START."
        ],
        transition: [
          "1. Éteignez. Laissez reposer 20 minutes.",
          "2. TEST SENSORIEL OBLIGATOIRE : Posez votre main sur la paroi extérieure de la cuve. Elle doit être 'tiède au toucher' (environ 40°C), et non brûlante.",
          "3. ⚠️ SÉCURITÉ : N'ajoutez l'alcool que lorsque ce test est validé."
        ],
        phase_B_instructions: [
          "Ajoutez l'alcool et les 25g de poudre fine.",
          "Fermez, mode manuel 'OIL', TEMP 50°C, TEMPS 3h00. START."
        ],
        filtration_et_finition: [
          "Filtrez à l'étamine. Pressez fermement (la poudre de maca absorbe beaucoup de liquide).",
          "Le liquide sera beige-brun, avec un goût de caramel/malt. Mettez en flacon ambré."
        ]
      },
    socle_synergique: {
        cofacteurs_complements: [
          {
            nom: "Magnésium Bisglycinate",
            dose: "300mg/jour",
            role: "Soutient la production d'énergie cellulaire et calme le système nerveux, potentialisant l'adaptogène."
          },
          {
            nom: "Zinc",
            dose: "15mg/jour",
            role: "Cofacteur essentiel de la synthèse de la testostérone et de la santé reproductive, que la Maca soutient."
          }
        ],
        leviers_du_vivant: [
          {
            nom: "Sommeil régulier",
            frequence: "Coucher à heure fixe",
            role: "L'axe HPA se régénère principalement pendant le sommeil profond. La Maca optimise ce processus."
          }
        ]
      },
    convergence_ancestrale: "Cultivée depuis 2000 ans dans les Andes péruviennes comme 'viagra des Incas' et tonique de vitalité globale.",
    synergies_recommandees: [
        "ashwagandha_somnifera",
        "tribulus_terrestris",
        "rhodiola_rosea"
      ],
    precautions: "Déconseillée en cas de pathologies hormonales sensibles (sein, utérus, prostate) sans avis médical, bien qu'elle ne contienne pas d'hormones."
  },
  {
    plant_id: "alchemilla_vulgaris",
    nom_commun: "Alchémille",
    nom_latin: "Alchemilla vulgaris",
    partie_utilisee: "Parties aériennes séchées",
    famille_bloom: "Réparateur (Cycle Féminin & Muqueuses)",
    terrains_cibles: [
        "T10_Hormonal",
        "T1_Intestin",
        "T9_Peau_Phaneres"
      ],
    actifs_cles: [
        {
          nom: "Tanins ellagiques",
          polarite: "Hydrosoluble"
        },
        {
          nom: "Flavonoïdes",
          polarite: "Hydrosoluble"
        },
        {
          nom: "Acide salicylique",
          polarite: "Liposoluble"
        }
      ],
    preuve_scientifique: "Action astringente, hémostatique et régulatrice sur les muqueuses, en particulier l'utérus et le tube digestif. Soulage les règles douloureuses et les leucorrhées.",
    pourquoi_bloomlab: {
        probleme_traditionnel: "Les tanins s'extraient bien à l'eau, mais l'acide salicylique (anti-inflammatoire doux) nécessite un solvant organique et une chaleur modérée.",
        phase_A: {
          temp: "65°C",
          temps: "2h00",
          solvant: "Eau distillée + Glycérine (70/30)",
          cible: "Tanins, flavonoïdes"
        },
        phase_B: {
          temp: "50°C",
          temps: "3h00",
          solvant: "Alcool bio 96°",
          cible: "Acide salicylique, composés lipophiles"
        }
      },
    recette_pas_a_pas: {
        batch_standard: "Cible BloomLab : 750ml de solvant + 75g de plantes (Rendement final estimé : ~600-650ml)",
        ingredients: {
          phase_A: [
            "50g d'Alchémille séchée",
            "350ml d'Eau distillée",
            "150ml de Glycérine végétale"
          ],
          phase_B: [
            "25g d'Alchémille séchée",
            "250ml d'Alcool bio 96°"
          ]
        },
        preparation: [
          "La plante est volumineuse. Tassez les 50g dans la cuve.",
          "Mixez les 25g restants pour la Phase B."
        ],
        phase_A_instructions: [
          "Versez eau et glycérine. Ajoutez les 50g de plante tassée.",
          "Fermez, mode manuel 'OIL', TEMP 65°C, TEMPS 2h00. START."
        ],
        transition: [
          "1. Éteignez. Laissez reposer 20 minutes.",
          "2. TEST SENSORIEL OBLIGATOIRE : Posez votre main sur la paroi extérieure de la cuve. Elle doit être 'tiède au toucher' (environ 40°C), et non brûlante.",
          "3. ⚠️ SÉCURITÉ : N'ajoutez l'alcool que lorsque ce test est validé."
        ],
        phase_B_instructions: [
          "Ajoutez l'alcool et les 25g de plante mixée.",
          "Fermez, mode manuel 'OIL', TEMP 50°C, TEMPS 3h00. START."
        ],
        filtration_et_finition: [
          "Filtrez à l'étamine. Pressez le marc.",
          "Le liquide sera vert-brun, légèrement astringent. Mettez en flacon ambré."
        ]
      },
    socle_synergique: {
        cofacteurs_complements: [
          {
            nom: "Fer (Bisglycinate)",
            dose: "Si ferritine < 50ng/mL",
            role: "Compense les pertes sanguines menstruelles que l'alchémille aide à réguler."
          },
          {
            nom: "Magnésium",
            dose: "300mg/jour",
            role: "Relaxe les spasmes utérins et intestinaux, synergique avec l'action de l'alchémille."
          }
        ],
        leviers_du_vivant: [
          {
            nom: "Chaleur locale",
            frequence: "Pendant les règles",
            role: "Une bouillotte sur le bas-ventre potentialise l'effet antispasmodique de l'alchémille."
          }
        ]
      },
    convergence_ancestrale: "Plante sacrée des alchimistes du Moyen Âge, associée à la Vierge Marie pour ses vertus 'purificatrices' et gynécologiques.",
    synergies_recommandees: [
        "achillea_millefolium",
        "rubus_idaeus",
        "capsella_bursa_pastoris"
      ],
    precautions: "En raison de sa teneur en tanins, une consommation excessive et prolongée peut causer de la constipation. Faire des pauses."
  },
  {
    plant_id: "artemisia_annua",
    nom_commun: "Armoise annuelle",
    nom_latin: "Artemisia annua",
    partie_utilisee: "Parties aériennes séchées",
    famille_bloom: "Gâchette (Immunité & Modulation)",
    terrains_cibles: [
        "T3_Immunité",
        "T8_Inflammation",
        "T1_Intestin"
      ],
    actifs_cles: [
        {
          nom: "Artémisinine",
          polarite: "Liposoluble/Thermolabile"
        },
        {
          nom: "Flavonoïdes",
          polarite: "Hydrosoluble"
        },
        {
          nom: "Huiles essentielles",
          polarite: "Volatile"
        }
      ],
    preuve_scientifique: "Action immunomodulatrice puissante, antiparasitaire, et anti-inflammatoire via l'inhibition de la voie NF-κB. L'artémisinine agit en présence de fer (abondant dans les cellules inflammatoires ou parasitées).",
    pourquoi_bloomlab: {
        probleme_traditionnel: "L'artémisinine est très thermolabile et liposoluble. Une infusion à l'eau bouillante la détruit presque totalement.",
        phase_A: {
          temp: "60°C",
          temps: "1h30",
          solvant: "Eau distillée + Glycérine (70/30)",
          cible: "Flavonoïdes, composés hydrosolubles"
        },
        phase_B: {
          temp: "45°C",
          temps: "3h00",
          solvant: "Alcool bio 96°",
          cible: "Artémisinine, huiles essentielles"
        }
      },
    recette_pas_a_pas: {
        batch_standard: "Cible BloomLab : 750ml de solvant + 75g de plantes (Rendement final estimé : ~600-650ml)",
        ingredients: {
          phase_A: [
            "50g d'Armoise annuelle",
            "350ml d'Eau distillée",
            "150ml de Glycérine végétale"
          ],
          phase_B: [
            "25g d'Armoise annuelle",
            "250ml d'Alcool bio 96°"
          ]
        },
        preparation: [
          "La plante est légère et aromatique. Tassez les 50g.",
          "Mixez les 25g restants pour la Phase B."
        ],
        phase_A_instructions: [
          "Versez eau et glycérine. Ajoutez les 50g de plante tassée.",
          "Fermez, mode manuel 'OIL', TEMP 60°C, TEMPS 1h30. START."
        ],
        transition: [
          "1. Éteignez. Laissez reposer 20 minutes.",
          "2. TEST SENSORIEL OBLIGATOIRE : Posez votre main sur la paroi extérieure de la cuve. Elle doit être 'tiède au toucher' (environ 40°C), et non brûlante.",
          "3. ⚠️ SÉCURITÉ : N'ajoutez l'alcool que lorsque ce test est validé."
        ],
        phase_B_instructions: [
          "Ajoutez l'alcool et les 25g de plante mixée.",
          "Fermez, mode manuel 'OIL', TEMP 45°C, TEMPS 3h00. START."
        ],
        filtration_et_finition: [
          "Filtrez à l'étamine. Pressez le marc.",
          "Le liquide sera vert foncé, très aromatique. Mettez en flacon ambré."
        ]
      },
    socle_synergique: {
        cofacteurs_complements: [
          {
            nom: "Fer (si carence avérée)",
            dose: "Selon bilan",
            role: "L'artémisinine agit en synergie avec le fer pour cibler les cellules inflammatoires ou parasitées."
          },
          {
            nom: "Vitamine C",
            dose: "500mg/jour",
            role: "Potentialise l'action de l'artémisinine en générant des radicaux libres localisés dans les cellules cibles."
          }
        ],
        leviers_du_vivant: [
          {
            nom: "Jeûne intermittent",
            frequence: "14-16h",
            role: "Réduit la charge inflammatoire globale, laissant l'Artemisia agir plus précisément."
          }
        ]
      },
    convergence_ancestrale: "Qing Hao en MTC, utilisée depuis 1600 ans pour les 'fièvres'. Prix Nobel de Médecine 2015 pour la découverte de l'artémisinine.",
    synergies_recommandees: [
        "nigella_sativa",
        "origanum_vulgare",
        "curcuma_longa"
      ],
    precautions: "Déconseillée pendant la grossesse et l'allaitement. Peut interagir avec certains médicaments métabolisés par le foie."
  },
  {
    plant_id: "vitex_agnus_castus",
    nom_commun: "Gattilier (Vitex)",
    nom_latin: "Vitex agnus-castus",
    partie_utilisee: "Fruits séchés",
    famille_bloom: "Chef d'Orchestre (Régulateur Hormonal)",
    terrains_cibles: [
        "T8_Hormonal",
        "T5_HPA",
        "T7_Psycho_emotionnel"
      ],
    actifs_cles: [
        {
          nom: "Diterpènes cycliques",
          polarite: "Liposoluble"
        },
        {
          nom: "Flavonoïdes (Casticine)",
          polarite: "Liposoluble"
        },
        {
          nom: "Iridoïdes (Agnuside)",
          polarite: "Hydrosoluble"
        }
      ],
    preuve_scientifique: "Action dopaminergique au niveau de l'hypophyse, inhibant la sécrétion de prolactine et favorisant la production de progestérone par le corps jaune. Maître du syndrome prémenstruel et de l'insuffisance lutéale.",
    pourquoi_bloomlab: {
        probleme_traditionnel: "Les diterpènes (actifs endocriniens majeurs) sont strictement liposolubles. Une infusion aqueuse rate totalement l'action sur la progestérone.",
        phase_A: {
          temp: "70°C",
          temps: "2h00",
          solvant: "Eau distillée + Glycérine (70/30)",
          cible: "Iridoïdes (Agnuside)"
        },
        phase_B: {
          temp: "50°C",
          temps: "3h00",
          solvant: "Alcool bio 96°",
          cible: "Diterpènes, Casticine"
        }
      },
    recette_pas_a_pas: {
        batch_standard: "Cible BloomLab : 750ml de solvant + 75g de plantes (Rendement final estimé : ~600-650ml)",
        ingredients: {
          phase_A: [
            "50g de Fruits de Vitex (légèrement concassées)",
            "350ml d'Eau distillée",
            "150ml de Glycérine végétale"
          ],
          phase_B: [
            "25g de Fruits de Vitex (poudre)",
            "250ml d'Alcool bio 96°"
          ]
        },
        preparation: [
          "Concassez les 50g de fruits pour la Phase A (évitez la poudre fine pour ne pas géifier l'eau avec les mucilages).",
          "Mixez les 25g restants en poudre pour la Phase B."
        ],
        phase_A_instructions: [
          "Versez eau et glycérine. Ajoutez les 50g de fruits concassés.",
          "Fermez, mode manuel 'OIL', TEMP 70°C, TEMPS 2h00. START."
        ],
        transition: [
          "1. Éteignez. Laissez reposer 20 minutes.",
          "2. TEST SENSORIEL OBLIGATOIRE : Posez votre main sur la paroi extérieure de la cuve. Elle doit être 'tiède au toucher' (environ 40°C), et non brûlante.",
          "3. ⚠️ SÉCURITÉ : N'ajoutez l'alcool que lorsque ce test est validé."
        ],
        phase_B_instructions: [
          "Ajoutez l'alcool et les 25g de poudre.",
          "Fermez, mode manuel 'OIL', TEMP 50°C, TEMPS 3h00. START."
        ],
        filtration_et_finition: [
          "Filtrez à l'étamine. Pressez fermement le marc.",
          "Le liquide sera brun foncé. Mettez en flacon ambré."
        ]
      },
    socle_synergique: {
        cofacteurs_complements: [
          {
            nom: "Magnésium Bisglycinate",
            dose: "300mg/jour (phase lutéale)",
            role: "Réduit les spasmes utérins et soutient la méthylation hépatique des œstrogènes."
          },
          {
            nom: "Vitamine B6 (P-5-P)",
            dose: "50mg/jour",
            role: "Cofacteur essentiel de la synthèse de la progestérone et de la dopamine."
          }
        ],
        leviers_du_vivant: [
          {
            nom: "Gestion du stress (Cohérence cardiaque)",
            frequence: "Quotidienne",
            role: "Le cortisol élevé vole les précurseurs de la progestérone (pregnenolone steal). Calmer l'axe HPA est obligatoire pour que le Vitex fonctionne."
          }
        ]
      },
    convergence_ancestrale: "Herbe des 'veuves' et des moines au Moyen Âge. Utilisé depuis l'Antiquité pour l'équilibre féminin.",
    synergies_recommandees: [
        "alchemilla_vulgaris",
        "shatavari",
        "paeonia_lactiflora"
      ],
    precautions: "Contre-indiqué en cas de prise de contraceptifs oraux, de traitements dopaminergiques ou d'antécédents de cancers hormono-dépendants sans avis médical. Action lente (3 cycles minimum)."
  },
  {
    plant_id: "nigella_sativa",
    nom_commun: "Nigelle",
    nom_latin: "Nigella sativa",
    partie_utilisee: "Graines séchées",
    famille_bloom: "Gâchette (Immunomodulateur & Anti-inflammatoire)",
    terrains_cibles: [
        "T4_Immunité",
        "T8_Inflammation",
        "T1_Intestin"
      ],
    actifs_cles: [
        {
          nom: "Thymoquinone",
          polarite: "Liposoluble"
        },
        {
          nom: "Nigellone",
          polarite: "Liposoluble"
        },
        {
          nom: "Acides gras insaturés",
          polarite: "Liposoluble"
        }
      ],
    preuve_scientifique: "La thymoquinone est un puissant inhibiteur de NF-κB et des leucotriènes. Action antihistaminique, bronchodilatatrice et protectrice des muqueuses. Modulation fine de la réponse Th1/Th2.",
    pourquoi_bloomlab: {
        probleme_traditionnel: "La thymoquinone est strictement lipophile et volatile. Une extraction aqueuse est inutile. Une chaleur >60°C oxyde les acides gras précieux de la graine.",
        phase_A: {
          temp: "60°C",
          temps: "1h30",
          solvant: "Eau distillée + Glycérine (70/30)",
          cible: "Saponines, protéines hydrosolubles"
        },
        phase_B: {
          temp: "45°C",
          temps: "3h00",
          solvant: "Alcool bio 96°",
          cible: "Thymoquinone, Nigellone"
        }
      },
    recette_pas_a_pas: {
        batch_standard: "Cible BloomLab : 750ml de solvant + 75g de plantes (Rendement final estimé : ~600-650ml)",
        ingredients: {
          phase_A: [
            "50g de Graines de Nigelle (légèrement concassées)",
            "350ml d'Eau distillée",
            "150ml de Glycérine végétale"
          ],
          phase_B: [
            "25g de Graines de Nigelle (poudre)",
            "250ml d'Alcool bio 96°"
          ]
        },
        preparation: [
          "Concassez légèrement les 50g pour la Phase A.",
          "Mixez les 25g restants pour la Phase B."
        ],
        phase_A_instructions: [
          "Versez eau et glycérine. Ajoutez les 50g de graines.",
          "Fermez, mode manuel 'OIL', TEMP 60°C, TEMPS 1h30. START."
        ],
        transition: [
          "1. Éteignez. Laissez reposer 20 minutes.",
          "2. TEST SENSORIEL OBLIGATOIRE : Posez votre main sur la paroi extérieure de la cuve. Elle doit être 'tiède au toucher' (environ 40°C), et non brûlante.",
          "3. ️ SÉCURITÉ : N'ajoutez l'alcool que lorsque ce test est validé."
        ],
        phase_B_instructions: [
          "Ajoutez l'alcool et les 25g de poudre.",
          "Fermez, mode manuel 'OIL', TEMP 45°C, TEMPS 3h00. START."
        ],
        filtration_et_finition: [
          "Filtrez à l'étamine. Pressez fermement.",
          "Le liquide sera noir/brun très foncé, avec une odeur épicée. Mettez en flacon ambré."
        ]
      },
    socle_synergique: {
        cofacteurs_complements: [
          {
            nom: "Oméga-3 (EPA/DHA)",
            dose: "2g/jour",
            role: "Synergie anti-inflammatoire majeure avec la thymoquinone sur les membranes cellulaires."
          },
          {
            nom: "Vitamine D3",
            dose: "Selon bilan",
            role: "Indispensable à la modulation immunitaire (Treg) que la Nigelle soutient."
          }
        ],
        leviers_du_vivant: [
          {
            nom: "Respiration nasale",
            frequence: "Quotidienne",
            role: "La Nigelle ouvre les bronches ; la respiration nasale filtre et humidifie l'air, potentialisant l'effet respiratoire."
          }
        ]
      },
    convergence_ancestrale: "La 'graine de bénédiction' de l'Islam et de la médecine unani. Utilisée pour 'tout sauf la mort'.",
    synergies_recommandees: [
        "curcuma_longa",
        "boswellia_serrata",
        "echinacea_purpurea"
      ],
    precautions: "Peut avoir un effet hypoglycémiant (attention aux traitements antidiabétiques). Déconseillé en début de grossesse (effet utérotonique à haute dose)."
  },
  {
    plant_id: "cordyceps_militaris",
    nom_commun: "Cordyceps",
    nom_latin: "Cordyceps militaris / sinensis",
    partie_utilisee: "Fruit (champignon) séché",
    famille_bloom: "Chef d'Orchestre (Énergie Mitochondriale)",
    terrains_cibles: [
        "T6_Mitochondrie",
        "T5_HPA",
        "T3_Immunité"
      ],
    actifs_cles: [
        {
          nom: "Cordycépine",
          polarite: "Hydrosoluble"
        },
        {
          nom: "Adénosine",
          polarite: "Hydrosoluble"
        },
        {
          nom: "Stérols (Ergostérol)",
          polarite: "Liposoluble"
        }
      ],
    preuve_scientifique: "Augmentation de la production d'ATP mitochondrial, amélioration de l'utilisation de l'oxygène (VO2 max), et modulation de l'immunité via les bêta-glucanes.",
    pourquoi_bloomlab: {
        probleme_traditionnel: "La paroi de chitine du champignon nécessite une chaleur prolongée (80°C) pour libérer les polysaccharides. Les stérols nécessitent un solvant organique.",
        phase_A: {
          temp: "80°C",
          temps: "3h00",
          solvant: "Eau distillée + Glycérine (70/30)",
          cible: "Polysaccharides, Cordycépine"
        },
        phase_B: {
          temp: "50°C",
          temps: "3h00",
          solvant: "Alcool bio 96°",
          cible: "Stérols, composés lipophiles"
        }
      },
    recette_pas_a_pas: {
        batch_standard: "Cible BloomLab : 750ml de solvant + 75g de plantes (Rendement final estimé : ~600-650ml)",
        ingredients: {
          phase_A: [
            "50g de Cordyceps en poudre grossière",
            "350ml d'Eau distillée",
            "150ml de Glycérine végétale"
          ],
          phase_B: [
            "25g de Cordyceps en poudre fine",
            "250ml d'Alcool bio 96°"
          ]
        },
        preparation: [
          "Utilisez du Cordyceps déjà broyé. Séparez 50g pour la Phase A et 25g pour la Phase B."
        ],
        phase_A_instructions: [
          "Versez eau et glycérine. Ajoutez les 50g de poudre.",
          "Fermez, mode manuel 'OIL', TEMP 80°C, TEMPS 3h00. START."
        ],
        transition: [
          "1. Éteignez. Laissez reposer 30 minutes (la poudre retient la chaleur).",
          "2. TEST SENSORIEL OBLIGATOIRE : Posez votre main sur la paroi extérieure de la cuve. Elle doit être 'tiède au toucher' (environ 40°C), et non brûlante.",
          "3. ⚠️ SÉCURITÉ : N'ajoutez l'alcool que lorsque ce test est validé."
        ],
        phase_B_instructions: [
          "Ajoutez l'alcool et les 25g de poudre fine.",
          "Fermez, mode manuel 'OIL', TEMP 50°C, TEMPS 3h00. START."
        ],
        filtration_et_finition: [
          "Filtrez à l'étamine double épaisseur. Pressez très fermement.",
          "Le liquide sera brun doré. Mettez en flacon ambré."
        ]
      },
    socle_synergique: {
        cofacteurs_complements: [
          {
            nom: "CoQ10 (Ubiquinol)",
            dose: "100-200mg/jour",
            role: "Synergie directe avec le Cordyceps sur la chaîne respiratoire mitochondriale."
          },
          {
            nom: "Magnésium",
            dose: "300mg/jour",
            role: "Cofacteur obligatoire de la synthèse d'ATP."
          }
        ],
        leviers_du_vivant: [
          {
            nom: "Exercice en zone 2 (endurance fondamentale)",
            frequence: "3x 45min/semaine",
            role: "Le Cordyceps augmente la VO2 max ; l'entraînement en zone 2 construit les mitochondries."
          }
        ]
      },
    convergence_ancestrale: "Champignon de l'énergie en MTC, utilisé par les sherpas pour l'endurance en altitude.",
    synergies_recommandees: [
        "rhodiola_rosea",
        "panax_ginseng",
        "ganoderma_lucidum"
      ],
    precautions: "Déconseillé en cas de maladies auto-immunes actives (stimulation immunitaire) ou de prise d'anticoagulants."
  },
  {
    plant_id: "hieracium_pilosella",
    nom_commun: "Piloselle",
    nom_latin: "Hieracium pilosella",
    partie_utilisee: "Plante entière séchée",
    famille_bloom: "Déclencheur (Drainage Rénal)",
    terrains_cibles: [
        "T1_Emonctoires",
        "T4_Immunité",
        "T8_Inflammation"
      ],
    actifs_cles: [
        {
          nom: "Flavonoïdes",
          polarite: "Hydrosoluble"
        },
        {
          nom: "Acide chlorogénique",
          polarite: "Hydrosoluble"
        },
        {
          nom: "Ombelliférone",
          polarite: "Liposoluble"
        }
      ],
    preuve_scientifique: "Puissant diurétique épargnant le potassium (contrairement aux diurétiques chimiques). Action anti-inflammatoire sur les voies urinaires. Maître du drainage des surcharges hydriques.",
    pourquoi_bloomlab: {
        probleme_traditionnel: "Les flavonoïdes diurétiques s'extraient à l'eau, mais l'ombelliférone (antibactérien urinaire) nécessite un solvant organique.",
        phase_A: {
          temp: "65°C",
          temps: "2h00",
          solvant: "Eau distillée + Glycérine (70/30)",
          cible: "Flavonoïdes, acide chlorogénique"
        },
        phase_B: {
          temp: "50°C",
          temps: "3h00",
          solvant: "Alcool bio 96°",
          cible: "Ombelliférone"
        }
      },
    recette_pas_a_pas: {
        batch_standard: "Cible BloomLab : 750ml de solvant + 75g de plantes (Rendement final estimé : ~600-650ml)",
        ingredients: {
          phase_A: [
            "50g de Piloselle séchée",
            "350ml d'Eau distillée",
            "150ml de Glycérine végétale"
          ],
          phase_B: [
            "25g de Piloselle séchée",
            "250ml d'Alcool bio 96°"
          ]
        },
        preparation: [
          "La plante est volumineuse. Tassez les 50g dans la cuve.",
          "Mixez les 25g restants pour la Phase B."
        ],
        phase_A_instructions: [
          "Versez eau et glycérine. Ajoutez les 50g de plante tassée.",
          "Fermez, mode manuel 'OIL', TEMP 65°C, TEMPS 2h00. START."
        ],
        transition: [
          "1. Éteignez. Laissez reposer 20 minutes.",
          "2. TEST SENSORIEL OBLIGATOIRE : Posez votre main sur la paroi extérieure de la cuve. Elle doit être 'tiède au toucher' (environ 40°C), et non brûlante.",
          "3. ⚠️ SÉCURITÉ : N'ajoutez l'alcool que lorsque ce test est validé."
        ],
        phase_B_instructions: [
          "Ajoutez l'alcool et les 25g de plante mixée.",
          "Fermez, mode manuel 'OIL', TEMP 50°C, TEMPS 3h00. START."
        ],
        filtration_et_finition: [
          "Filtrez à l'étamine. Pressez le marc.",
          "Le liquide sera vert-brun. Mettez en flacon ambré."
        ]
      },
    socle_synergique: {
        cofacteurs_complements: [
          {
            nom: "Potassium",
            dose: "Via alimentation (banane, avocat)",
            role: "Bien que la Piloselle épargne le potassium, un apport alimentaire riche soutient la fonction rénale."
          },
          {
            nom: "Magnésium",
            dose: "300mg/jour",
            role: "Prévient les crampes lors d'un drainage intensif."
          }
        ],
        leviers_du_vivant: [
          {
            nom: "Hydratation massive",
            frequence: "2,5L d'eau/jour",
            role: "Un drainant rénal ne fonctionne que si le volume d'eau à filtrer est suffisant."
          }
        ]
      },
    convergence_ancestrale: "Utilisée depuis le Moyen Âge en Europe pour les 'eaux' (œdèmes) et les infections urinaires.",
    synergies_recommandees: [
        "pissenlit",
        "orthosiphon",
        "queue_de_cerise"
      ],
    precautions: "Déconseillé en cas d'insuffisance rénale ou cardiaque sévère (nécessitant une restriction hydrique)."
  },
  {
    plant_id: "malva_sylvestris",
    nom_commun: "Mauve",
    nom_latin: "Malva sylvestris",
    partie_utilisee: "Feuilles et fleurs séchées",
    famille_bloom: "Réparateur (Muqueuse Intestinale)",
    terrains_cibles: [
        "T2_Intestin",
        "T9_Peau",
        "T1_Emonctoires"
      ],
    actifs_cles: [
        {
          nom: "Mucilages",
          polarite: "Hydrosoluble"
        },
        {
          nom: "Anthocyanes",
          polarite: "Hydrosoluble"
        },
        {
          nom: "Flavonoïdes",
          polarite: "Hydrosoluble"
        }
      ],
    preuve_scientifique: "Action émolliente, anti-inflammatoire et protectrice des muqueuses (intestin, gorge, peau). Les mucilages forment un film protecteur sur l'épithélium intestinal, réduisant l'irritation et la perméabilité.",
    pourquoi_bloomlab: {
        probleme_traditionnel: "Les mucilages sont extrêmement thermolabiles. Une température >60°C les dégrade en sucres simples, annulant l'effet protecteur.",
        phase_A: {
          temp: "50°C",
          temps: "1h30",
          solvant: "Eau distillée + Glycérine (70/30)",
          cible: "Mucilages, anthocyanes"
        },
        phase_B: {
          temp: "40°C",
          temps: "2h00",
          solvant: "Alcool bio 70°",
          cible: "Stabilisation douce"
        }
      },
    recette_pas_a_pas: {
        batch_standard: "Cible BloomLab : 750ml de solvant + 75g de plantes (Rendement final estimé : ~600-650ml)",
        ingredients: {
          phase_A: [
            "50g de Mauve (feuilles/fleurs)",
            "350ml d'Eau distillée",
            "150ml de Glycérine végétale"
          ],
          phase_B: [
            "25g de Mauve",
            "250ml d'Alcool bio 70°"
          ]
        },
        preparation: [
          "La plante est très volumineuse. Tassez fermement les 50g.",
          "Mixez les 25g restants pour la Phase B."
        ],
        phase_A_instructions: [
          "Versez eau et glycérine. Ajoutez les 50g de plante tassée.",
          "Fermez, mode manuel 'OIL', TEMP 50°C, TEMPS 1h30. START."
        ],
        transition: [
          "1. Éteignez. Laissez reposer 20 minutes.",
          "2. TEST SENSORIEL OBLIGATOIRE : Posez votre main sur la paroi extérieure de la cuve. Elle doit être 'tiède au toucher' (environ 40°C), et non brûlante.",
          "3. ⚠️ SÉCURITÉ : N'ajoutez l'alcool que lorsque ce test est validé."
        ],
        phase_B_instructions: [
          "Ajoutez l'alcool et les 25g de plante mixée.",
          "Fermez, mode manuel 'OIL', TEMP 40°C, TEMPS 2h00. START."
        ],
        filtration_et_finition: [
          "Filtrez à l'étamine. Pressez doucement (le liquide sera visqueux).",
          "Mettez en flacon ambré."
        ]
      },
    socle_synergique: {
        cofacteurs_complements: [
          {
            nom: "L-Glutamine",
            dose: "5g le matin",
            role: "Synergie parfaite : la Mauve apaise la muqueuse, la Glutamine nourrit les entérocytes."
          },
          {
            nom: "Zinc Carnosine",
            dose: "75mg 2x/jour",
            role: "Réparation ciblée des jonctions serrées."
          }
        ],
        leviers_du_vivant: [
          {
            nom: "Éviction des irritants",
            frequence: "Pendant la cure",
            role: "Éviter gluten, lait, épices fortes pour laisser le film de mucilage agir sans être détruit."
          }
        ]
      },
    convergence_ancestrale: "La 'mauvaise' (malva) d'Hildegarde de Bingen, utilisée pour adoucir toutes les inflammations internes et externes.",
    synergies_recommandees: [
        "plantago_major",
        "aloe_vera",
        "calendula_officinalis"
      ],
    precautions: "Peut ralentir l'absorption d'autres médicaments (prendre à distance des traitements)."
  },
  {
    plant_id: "asparagus_racemosus",
    nom_commun: "Shatavari",
    nom_latin: "Asparagus racemosus",
    partie_utilisee: "Racine séchée",
    famille_bloom: "Réparateur (Yin Féminin & Muqueuses)",
    terrains_cibles: [
        "T8_Hormonal",
        "T2_Intestin",
        "T7_Psycho_emotionnel"
      ],
    actifs_cles: [
        {
          nom: "Shatavarines (Saponines stéroïdiques)",
          polarite: "Liposoluble"
        },
        {
          nom: "Mucilages",
          polarite: "Hydrosoluble"
        },
        {
          nom: "Alcaloïdes",
          polarite: "Mixte"
        }
      ],
    preuve_scientifique: "Adaptogène féminin majeur. Soutient la production d'œstrogènes naturels, hydrate les muqueuses (sècheresse vaginale, digestive), et module l'humeur via l'axe HPA.",
    pourquoi_bloomlab: {
        probleme_traditionnel: "Les shatavarines (actifs hormonaux) sont liposolubles, tandis que les mucilages (hydratation) sont hydrosolubles et thermolabiles.",
        phase_A: {
          temp: "65°C",
          temps: "2h00",
          solvant: "Eau distillée + Glycérine (70/30)",
          cible: "Mucilages, alcaloïdes hydrosolubles"
        },
        phase_B: {
          temp: "50°C",
          temps: "3h00",
          solvant: "Alcool bio 96°",
          cible: "Shatavarines"
        }
      },
    recette_pas_a_pas: {
        batch_standard: "Cible BloomLab : 750ml de solvant + 75g de plantes (Rendement final estimé : ~600-650ml)",
        ingredients: {
          phase_A: [
            "50g de Racine de Shatavari (copeaux)",
            "350ml d'Eau distillée",
            "150ml de Glycérine végétale"
          ],
          phase_B: [
            "25g de Racine de Shatavari (poudre)",
            "250ml d'Alcool bio 96°"
          ]
        },
        preparation: [
          "Concassez les 50g de racine pour la Phase A.",
          "Mixez les 25g restants en poudre pour la Phase B."
        ],
        phase_A_instructions: [
          "Versez eau et glycérine. Ajoutez les 50g de copeaux.",
          "Fermez, mode manuel 'OIL', TEMP 65°C, TEMPS 2h00. START."
        ],
        transition: [
          "1. Éteignez. Laissez reposer 20 minutes.",
          "2. TEST SENSORIEL OBLIGATOIRE : Posez votre main sur la paroi extérieure de la cuve. Elle doit être 'tiède au toucher' (environ 40°C), et non brûlante.",
          "3. ⚠️ SÉCURITÉ : N'ajoutez l'alcool que lorsque ce test est validé."
        ],
        phase_B_instructions: [
          "Ajoutez l'alcool et les 25g de poudre.",
          "Fermez, mode manuel 'OIL', TEMP 50°C, TEMPS 3h00. START."
        ],
        filtration_et_finition: [
          "Filtrez à l'étamine. Pressez fermement le marc.",
          "Le liquide sera brun clair, légèrement visqueux. Mettez en flacon ambré."
        ]
      },
    socle_synergique: {
        cofacteurs_complements: [
          {
            nom: "Oméga-3",
            dose: "2g/jour",
            role: "Fournit les lipides nécessaires à la synthèse hormonale et à l'hydratation cellulaire."
          },
          {
            nom: "Magnésium",
            dose: "300mg/jour",
            role: "Soutient le système nerveux pendant les fluctuations hormonales."
          }
        ],
        leviers_du_vivant: [
          {
            nom: "Hydratation profonde",
            frequence: "Quotidienne",
            role: "Le Shatavari attire l'eau dans les muqueuses ; boire 2L d'eau est obligatoire pour que l'effet 'Yin' opère."
          }
        ]
      },
    convergence_ancestrale: "'Celle qui possède cent maris' en Ayurveda. Tonique féminin sacré pour la fertilité et la longévité.",
    synergies_recommandees: [
        "vitex_agnus_castus",
        "alchemilla_vulgaris",
        "maca_lepidium"
      ],
    precautions: "Déconseillé en cas de cancers hormono-dépendants (sein, utérus) ou d'endométriose sévère sans avis médical (effet phyto-œstrogénique)."
  },
  {
    plant_id: "hericium_erinaceus",
    nom_commun: "Lion's Mane (Hydne hérisson)",
    nom_latin: "Hericium erinaceus",
    partie_utilisee: "Fruit (champignon) séché",
    famille_bloom: "Réparateur (Neuroplasticité)",
    terrains_cibles: [
        "T7_Psycho_emotionnel",
        "T5_HPA",
        "T2_Intestin"
      ],
    actifs_cles: [
        {
          nom: "Héricénones",
          polarite: "Liposoluble"
        },
        {
          nom: "Érinacines",
          polarite: "Liposoluble"
        },
        {
          nom: "Bêta-glucanes",
          polarite: "Hydrosoluble"
        }
      ],
    preuve_scientifique: "Stimulation de la synthèse du NGF (Nerve Growth Factor). Amélioration de la cognition, de la mémoire et de l'humeur. Réparation de la barrière intestinale via la modulation du microbiote.",
    pourquoi_bloomlab: {
        probleme_traditionnel: "Les héricénones (NGF) sont liposolubles. La paroi de chitine nécessite une chaleur prolongée pour libérer les bêta-glucanes.",
        phase_A: {
          temp: "80°C",
          temps: "3h00",
          solvant: "Eau distillée + Glycérine (70/30)",
          cible: "Bêta-glucanes, polysaccharides"
        },
        phase_B: {
          temp: "50°C",
          temps: "3h00",
          solvant: "Alcool bio 96°",
          cible: "Héricénones, Érinacines"
        }
      },
    recette_pas_a_pas: {
        batch_standard: "Cible BloomLab : 750ml de solvant + 75g de plantes (Rendement final estimé : ~600-650ml)",
        ingredients: {
          phase_A: [
            "50g de Lion's Mane en poudre grossière",
            "350ml d'Eau distillée",
            "150ml de Glycérine végétale"
          ],
          phase_B: [
            "25g de Lion's Mane en poudre fine",
            "250ml d'Alcool bio 96°"
          ]
        },
        preparation: [
          "Utilisez du Lion's Mane déjà broyé. Séparez 50g pour la Phase A et 25g pour la Phase B."
        ],
        phase_A_instructions: [
          "Versez eau et glycérine. Ajoutez les 50g de poudre.",
          "Fermez, mode manuel 'OIL', TEMP 80°C, TEMPS 3h00. START."
        ],
        transition: [
          "1. Éteignez. Laissez reposer 30 minutes.",
          "2. TEST SENSORIEL OBLIGATOIRE : Posez votre main sur la paroi extérieure de la cuve. Elle doit être 'tiède au toucher' (environ 40°C), et non brûlante.",
          "3. ⚠️ SÉCURITÉ : N'ajoutez l'alcool que lorsque ce test est validé."
        ],
        phase_B_instructions: [
          "Ajoutez l'alcool et les 25g de poudre fine.",
          "Fermez, mode manuel 'OIL', TEMP 50°C, TEMPS 3h00. START."
        ],
        filtration_et_finition: [
          "Filtrez à l'étamine double épaisseur. Pressez très fermement.",
          "Le liquide sera brun ambré. Mettez en flacon ambré."
        ]
      },
    socle_synergique: {
        cofacteurs_complements: [
          {
            nom: "Oméga-3 (DHA)",
            dose: "1000mg/jour",
            role: "Le DHA est la brique structurelle des neurones que le Lion's Mane aide à réparer."
          },
          {
            nom: "Magnésium L-Thréonate",
            dose: "Selon protocole",
            role: "Seule forme de magnésium traversant efficacement la barrière hémato-encéphalique."
          }
        ],
        leviers_du_vivant: [
          {
            nom: "Apprentissage continu",
            frequence: "Quotidienne",
            role: "La neuroplasticité induite par le NGF nécessite une stimulation cognitive pour créer de nouvelles connexions."
          }
        ]
      },
    convergence_ancestrale: "Champignon de la clarté mentale en MTC, utilisé par les moines bouddhistes pour la méditation.",
    synergies_recommandees: [
        "bacopa_monnieri",
        "rhodiola_rosea",
        "ginkgo_biloba"
      ],
    precautions: "Peut causer de légères démangeaisons chez les sujets très sensibles (stimulation du NGF). Déconseillé en cas d'allergie aux champignons."
  },
  {
    plant_id: "inonotus_obliquus",
    nom_commun: "Chaga",
    nom_latin: "Inonotus obliquus",
    partie_utilisee: "Sclérote (champignon) séché",
    famille_bloom: "Chef d'Orchestre (Antioxydant Majeur)",
    terrains_cibles: [
        "T3_Immunité",
        "T6_Mitochondrie",
        "T8_Inflammation"
      ],
    actifs_cles: [
        {
          nom: "Mélanine",
          polarite: "Hydrosoluble"
        },
        {
          nom: "Acide bétulinique",
          polarite: "Liposoluble"
        },
        {
          nom: "SOD (Superoxyde Dismutase)",
          polarite: "Hydrosoluble/Thermolabile"
        }
      ],
    preuve_scientifique: "L'un des antioxydants les plus puissants de la planète (ORAC > 100 000). Modulation immunitaire, protection de l'ADN contre le stress oxydatif, et soutien de la fonction hépatique.",
    pourquoi_bloomlab: {
        probleme_traditionnel: "Le Chaga est dur comme de la pierre. La mélanine et la SOD nécessitent une extraction aqueuse chaude mais contrôlée. L'acide bétulinique (anti-tumoral) nécessite un solvant organique.",
        phase_A: {
          temp: "75°C",
          temps: "3h00",
          solvant: "Eau distillée + Glycérine (70/30)",
          cible: "Mélanine, SOD, bêta-glucanes"
        },
        phase_B: {
          temp: "50°C",
          temps: "3h00",
          solvant: "Alcool bio 96°",
          cible: "Acide bétulinique, triterpènes"
        }
      },
    recette_pas_a_pas: {
        batch_standard: "Cible BloomLab : 750ml de solvant + 75g de plantes (Rendement final estimé : ~600-650ml)",
        ingredients: {
          phase_A: [
            "50g de Chaga en poudre grossière",
            "350ml d'Eau distillée",
            "150ml de Glycérine végétale"
          ],
          phase_B: [
            "25g de Chaga en poudre fine",
            "250ml d'Alcool bio 96°"
          ]
        },
        preparation: [
          "Le Chaga doit être finement broyé (texture de marc de café). Séparez 50g et 25g."
        ],
        phase_A_instructions: [
          "Versez eau et glycérine. Ajoutez les 50g de poudre.",
          "Fermez, mode manuel 'OIL', TEMP 75°C, TEMPS 3h00. START."
        ],
        transition: [
          "1. Éteignez. Laissez reposer 30 minutes.",
          "2. TEST SENSORIEL OBLIGATOIRE : Posez votre main sur la paroi extérieure de la cuve. Elle doit être 'tiède au toucher' (environ 40°C), et non brûlante.",
          "3. ⚠️ SÉCURITÉ : N'ajoutez l'alcool que lorsque ce test est validé."
        ],
        phase_B_instructions: [
          "Ajoutez l'alcool et les 25g de poudre fine.",
          "Fermez, mode manuel 'OIL', TEMP 50°C, TEMPS 3h00. START."
        ],
        filtration_et_finition: [
          "Filtrez à l'étamine double épaisseur. Pressez très fermement.",
          "Le liquide sera noir profond (mélanine). Mettez en flacon ambré ou violet (Miron)."
        ]
      },
    socle_synergique: {
        cofacteurs_complements: [
          {
            nom: "Vitamine C",
            dose: "500mg/jour",
            role: "Régénère les antioxydants du Chaga après qu'ils aient neutralisé les radicaux libres."
          },
          {
            nom: "Glutathion (ou NAC)",
            dose: "Selon protocole",
            role: "Synergie antioxydante majeure pour la détoxification cellulaire."
          }
        ],
        leviers_du_vivant: [
          {
            nom: "Réduction de l'exposition aux toxines",
            frequence: "Quotidienne",
            role: "Le Chaga protège l'ADN, mais réduire l'exposition (plastiques, pesticides) diminue la charge oxydative globale."
          }
        ]
      },
    convergence_ancestrale: "Champignon de l'immortalité en Sibérie et en MTC. Utilisé depuis des siècles pour la longévité.",
    synergies_recommandees: [
        "ganoderma_lucidum",
        "cordyceps_militaris",
        "curcuma_longa"
      ],
    precautions: "Déconseillé en cas de maladies auto-immunes (stimulation immunitaire) ou de prise d'anticoagulants (acide bétulinique)."
  },
  {
    plant_id: "hamamelis_virginiana",
    nom_commun: "Hamamélis",
    nom_latin: "Hamamelis virginiana",
    partie_utilisee: "Feuilles et écorce séchées",
    famille_bloom: "Réparateur (Circulation Veineuse & Lymphatique)",
    terrains_cibles: [
        "T1_Emonctoires",
        "T9_Peau",
        "T8_Inflammation"
      ],
    actifs_cles: [
        {
          nom: "Tanins galliques",
          polarite: "Hydrosoluble"
        },
        {
          nom: "Hamamélitane",
          polarite: "Hydrosoluble"
        },
        {
          nom: "Flavonoïdes",
          polarite: "Hydrosoluble"
        }
      ],
    preuve_scientifique: "Action veinotonique, lymphagogue et anti-inflammatoire puissante. Réduit la perméabilité capillaire et l'œdème. Maître des jambes lourdes, de la couperose et des hémorroïdes.",
    pourquoi_bloomlab: {
        probleme_traditionnel: "Les tanins s'extraient bien à l'eau, mais une chaleur excessive (>70°C) les rend trop astringents et irritants pour les muqueuses.",
        phase_A: {
          temp: "65°C",
          temps: "2h00",
          solvant: "Eau distillée + Glycérine (70/30)",
          cible: "Hamamélitane, flavonoïdes"
        },
        phase_B: {
          temp: "50°C",
          temps: "3h00",
          solvant: "Alcool bio 96°",
          cible: "Tanins contrôlés, composés lipophiles"
        }
      },
    recette_pas_a_pas: {
        batch_standard: "Cible BloomLab : 750ml de solvant + 75g de plantes (Rendement final estimé : ~600-650ml)",
        ingredients: {
          phase_A: [
            "50g d'Hamamélis (feuilles/écorce)",
            "350ml d'Eau distillée",
            "150ml de Glycérine végétale"
          ],
          phase_B: [
            "25g d'Hamamélis",
            "250ml d'Alcool bio 96°"
          ]
        },
        preparation: [
          "Concassez grossièrement les 50g pour la Phase A.",
          "Mixez les 25g restants pour la Phase B."
        ],
        phase_A_instructions: [
          "Versez eau et glycérine. Ajoutez les 50g de plante.",
          "Fermez, mode manuel 'OIL', TEMP 65°C, TEMPS 2h00. START."
        ],
        transition: [
          "1. Éteignez. Laissez reposer 20 minutes.",
          "2. TEST SENSORIEL OBLIGATOIRE : Posez votre main sur la paroi extérieure de la cuve. Elle doit être 'tiède au toucher' (environ 40°C), et non brûlante.",
          "3. ⚠️ SÉCURITÉ : N'ajoutez l'alcool que lorsque ce test est validé."
        ],
        phase_B_instructions: [
          "Ajoutez l'alcool et les 25g de plante mixée.",
          "Fermez, mode manuel 'OIL', TEMP 50°C, TEMPS 3h00. START."
        ],
        filtration_et_finition: [
          "Filtrez à l'étamine. Pressez le marc.",
          "Le liquide sera brun-rouge. Mettez en flacon ambré."
        ]
      },
    socle_synergique: {
        cofacteurs_complements: [
          {
            nom: "Vitamine C + Bioflavonoïdes (Rutine)",
            dose: "500mg/jour",
            role: "Renforce la paroi des capillaires en synergie avec l'hamamélis."
          },
          {
            nom: "Magnésium",
            dose: "300mg/jour",
            role: "Relaxe la paroi veineuse, réduisant la congestion."
          }
        ],
        leviers_du_vivant: [
          {
            nom: "Douche écossaise (jambes)",
            frequence: "Quotidienne",
            role: "L'alternance chaud/froid active la pompe veineuse, potentialisant l'effet de l'hamamélis."
          }
        ]
      },
    convergence_ancestrale: "Arbre magique des Amérindiens, utilisé pour les saignements et les inflammations.",
    synergies_recommandees: [
        "vitis_vinifera",
        "centella_asiatica",
        "marronnier_indien"
      ],
    precautions: "En raison de sa teneur en tanins, une consommation excessive peut causer de la constipation. Faire des pauses."
  },
  {
    plant_id: "moringa_oleifera",
    nom_commun: "Moringa",
    nom_latin: "Moringa oleifera",
    partie_utilisee: "Feuilles séchées",
    famille_bloom: "Pharmacie Intérieure (Nutrition Cellulaire Dense)",
    terrains_cibles: [
        "T6_Mitochondrie",
        "T3_Immunité",
        "T5_HPA"
      ],
    actifs_cles: [
        {
          nom: "Isothiocyanates",
          polarite: "Liposoluble"
        },
        {
          nom: "Vitamines (A, C, E)",
          polarite: "Mixte"
        },
        {
          nom: "Minéraux (Fer, Calcium)",
          polarite: "Hydrosoluble"
        }
      ],
    preuve_scientifique: "Densité nutritionnelle exceptionnelle. Action anti-inflammatoire via les isothiocyanates (similaires au sulforaphane). Soutien de l'énergie cellulaire et de l'immunité.",
    pourquoi_bloomlab: {
        probleme_traditionnel: "Les vitamines et les isothiocyanates sont extrêmement thermolabiles. Une chaleur >65°C détruit 80% de la valeur nutritionnelle.",
        phase_A: {
          temp: "60°C",
          temps: "1h30",
          solvant: "Eau distillée + Glycérine (70/30)",
          cible: "Minéraux, vitamines hydrosolubles"
        },
        phase_B: {
          temp: "45°C",
          temps: "2h00",
          solvant: "Alcool bio 70°",
          cible: "Isothiocyanates, vitamines liposolubles"
        }
      },
    recette_pas_a_pas: {
        batch_standard: "Cible BloomLab : 750ml de solvant + 75g de plantes (Rendement final estimé : ~600-650ml)",
        ingredients: {
          phase_A: [
            "50g de Feuilles de Moringa",
            "350ml d'Eau distillée",
            "150ml de Glycérine végétale"
          ],
          phase_B: [
            "25g de Feuilles de Moringa",
            "250ml d'Alcool bio 70°"
          ]
        },
        preparation: [
          "Les feuilles sont volumineuses. Tassez les 50g dans la cuve.",
          "Mixez les 25g restants pour la Phase B."
        ],
        phase_A_instructions: [
          "Versez eau et glycérine. Ajoutez les 50g de feuilles tassées.",
          "Fermez, mode manuel 'OIL', TEMP 60°C, TEMPS 1h30. START."
        ],
        transition: [
          "1. Éteignez. Laissez reposer 20 minutes.",
          "2. TEST SENSORIEL OBLIGATOIRE : Posez votre main sur la paroi extérieure de la cuve. Elle doit être 'tiède au toucher' (environ 40°C), et non brûlante.",
          "3. ⚠️ SÉCURITÉ : N'ajoutez l'alcool que lorsque ce test est validé."
        ],
        phase_B_instructions: [
          "Ajoutez l'alcool et les 25g de feuilles mixées.",
          "Fermez, mode manuel 'OIL', TEMP 45°C, TEMPS 2h00. START."
        ],
        filtration_et_finition: [
          "Filtrez à l'étamine. Pressez le marc.",
          "Le liquide sera vert foncé. Mettez en flacon ambré."
        ]
      },
    socle_synergique: {
        cofacteurs_complements: [
          {
            nom: "Fer (si carence)",
            dose: "Selon bilan",
            role: "Le Moringa apporte du fer végétal, mais un complément peut être nécessaire en cas d'anémie avérée."
          },
          {
            nom: "Vitamine C",
            dose: "500mg/jour",
            role: "Augmente l'absorption du fer végétal du Moringa de 300%."
          }
        ],
        leviers_du_vivant: [
          {
            nom: "Alimentation dense en nutriments",
            frequence: "Quotidienne",
            role: "Le Moringa comble les carences, mais une alimentation vivante reste la base de la nutrition cellulaire."
          }
        ]
      },
    convergence_ancestrale: "L'arbre de vie en Ayurveda et en médecine traditionnelle africaine. Utilisé pour la malnutrition et la vitalité.",
    synergies_recommandees: [
        "spirulina",
        "chlorella",
        "ortica_dioica"
      ],
    precautions: "Déconseillé en début de grossesse (effet utérotonique léger des racines/écorces, moins les feuilles, mais prudence). Peut avoir un effet laxatif à haute dose."
  },
  {
    "plant_id": "allium_sativum",
    "nom_commun": "Ail (Vieilli ou Noir)",
    "nom_latin": "Allium sativum",
    "partie_utilisee": "Gousses séchées",
    "famille_bloom": "Pharmacie Intérieure (Cardiovasculaire & Antimicrobien)",
    "terrains_cibles": ["T8_Inflammation", "T1_Intestin", "T3_Immunité"],
    "actifs_cles": [
      {"nom": "S-allyl-cystéine (SAC)", "polarite": "Hydrosoluble"},
      {"nom": "Ajoène", "polarite": "Liposoluble"},
      {"nom": "Allicine", "polarite": "Volatile/Enzymatique"}
    ],
    "preuve_scientifique": "L'ail vieilli contient de la SAC, stable et hydrosoluble, qui inhibe l'Enzyme de Conversion de l'Angiotensine (ECA). L'ajoène possède une action antiplaquettaire. L'allicine (issue de la transformation enzymatique de l'alliine par l'alliinase) est un puissant antimicrobien à large spectre.",
    "pourquoi_bloomlab": {
      "probleme_traditionnel": "L'allicine est détruite par la chaleur (>40°C) et les sucs gastriques. L'ail cru peut être irritant pour les muqueuses. L'extraction traditionnelle ne capture pas le ratio SAC/Allicine optimal.",
      "phase_A": {"temp": "35°C", "temps": "4h00", "solvant": "Eau distillée + Glycérine (70/30)", "cible": "Conversion enzymatique alliine -> allicine et stabilisation de la SAC"},
      "phase_B": {"temp": "45°C", "temps": "2h00", "solvant": "Alcool bio 96°", "cible": "Extraction de l'ajoène et des composés organosoufrés liposolubles"},
      "resultat": "Un concentré antimicrobien et cardio-protecteur non irritant, sans les inconvénients de l'ail cru."
    },
    "recette_pas_a_pas": {
      "batch_standard": "750ml de solvant + 150g de gousses d'ail",
      "ingredients": {
        "phase_A": ["100g de gousses d'ail frais (écrasées)", "350ml d'Eau distillée", "150ml de Glycérine végétale"],
        "phase_B": ["50g de gousses d'ail (tranchées)", "250ml d'Alcool bio 96°"]
      },
      "preparation": [
        "1. Écrasez les 100g d'ail de la Phase A et laissez reposer 15 minutes à l'air libre (crucial pour l'activation de l'alliinase).",
        "2. Tranchez finement les 50g d'ail de la Phase B."
      ],
      "phase_A_instructions": [
        "1. Versez eau et glycérine dans la cuve.",
        "2. Ajoutez l'ail écrasé.",
        "3. TEMP: 35°C, TEMPS: 4h00. START."
      ],
      "transition": ["Vérifiez que la température est redescendue sous 35°C."],
      "phase_B_instructions": [
        "1. Ajoutez l'alcool et l'ail tranché.",
        "2. TEMP: 45°C, TEMPS: 2h00. START."
      ],
      "filtration_et_finition": ["Filtration à l'étamine fine. Mise en flacon ambré. Conservation au frais recommandée."]
    },
    "convergence_ancestrale": "Pungent de la médecine égyptienne et grecque, utilisé pour 'nettoyer les artères' et combattre les infections.",
    "synergies_recommandees": ["Aubépine (Cardio)", "Gingembre (Immunité)"],
    "precautions": "Interactions possibles avec les anticoagulants."
  },
  {
    "plant_id": "salix_alba",
    "nom_commun": "Saule Blanc",
    "nom_latin": "Salix alba",
    "partie_utilisee": "Écorce interne (Liber)",
    "famille_bloom": "Gâchette (Anti-inflammatoire)",
    "terrains_cibles": ["T8_Inflammation", "T6_Nerveux", "T10_Hormonal"],
    "actifs_cles": [
      {"nom": "Salicine (Hétéroside phénolique)", "polarite": "Hydrosoluble"},
      {"nom": "Flavonoïdes & Tanins", "polarite": "Hydrosoluble"}
    ],
    "preuve_scientifique": "La salicine est convertie par la flore intestinale en acide salicylique. Contrairement à l'aspirine de synthèse, le saule blanc n'inhibe pas les COX-1 protectrices de l'estomac mais cible les COX-2 pro-inflammatoires.",
    "pourquoi_bloomlab": {
      "probleme_traditionnel": "L'écorce est très ligneuse. Une simple infusion ne libère que 20% de la salicine. Une ébullition dégrade les flavonoïdes protecteurs.",
      "phase_A": {"temp": "80°C", "temps": "3h00", "solvant": "Eau distillée + Glycérine", "cible": "Extraction forcée de la salicine par déstructuration de la lignine"},
      "phase_B": {"temp": "50°C", "temps": "2h00", "solvant": "Alcool bio 70°", "cible": "Fractions flavonoïques et tanins astringents"},
      "resultat": "Une 'Aspirine Végétale' à spectre complet, hautement dosée en salicine biodisponible."
    },
    "convergence_ancestrale": "Remède ancestral contre la douleur et la fièvre, utilisé par Hippocrate et les peuples amérindiens.",
    "synergies_recommandees": ["Reine des Prés", "Curcuma"],
    "precautions": "Contre-indiqué en cas d'allergie aux salicylés ou de traitement anticoagulant."
  },
  {
    "plant_id": "berberis_vulgaris",
    "nom_commun": "Épine-vinette",
    "nom_latin": "Berberis vulgaris",
    "partie_utilisee": "Écorce de racine ou de tige",
    "famille_bloom": "Verrou (Métabolisme & Glycémie)",
    "terrains_cibles": ["T5_Mitochondrie", "T4_HPA", "T1_Intestin"],
    "actifs_cles": [
      {"nom": "Berbérine (Alcaloïde)", "polarite": "Peu hydrosoluble / Alcoolosoluble"},
      {"nom": "Berbamine", "polarite": "Liposoluble"}
    ],
    "preuve_scientifique": "La berbérine est un activateur puissant de l'AMPK (protéine kinase activée par l'AMP), régulant le métabolisme du glucose et des lipides. Elle module également la flore intestinale (effet eubiotique).",
    "pourquoi_bloomlab": {
      "probleme_traditionnel": "La berbérine est très amère et difficile à extraire à l'eau seule. Son absorption est naturellement faible.",
      "phase_A": {"temp": "75°C", "temps": "3h00", "solvant": "Eau distillée + Glycérine", "cible": "Glycosides et fraction aqueuse"},
      "phase_B": {"temp": "60°C", "temps": "4h00", "solvant": "Alcool bio 96°", "cible": "Concentration maximale de Berbérine et Berbamine"},
      "resultat": "Un régulateur métabolique majeur, optimisant la sensibilité à l'insuline et la santé hépatique."
    },
    "convergence_ancestrale": "Utilisé en médecine persane et chinoise pour 'nettoyer le foie' et rafraîchir le sang.",
    "synergies_recommandees": ["Chardon-Marie", "Gingembre"],
    "precautions": "Ne pas utiliser pendant la grossesse. Peut interférer avec certains médicaments métabolisés par le foie (CYP450)."
  },
  {
    "plant_id": "crataegus_monogyna",
    "nom_commun": "Aubépine",
    "nom_latin": "Crataegus monogyna",
    "partie_utilisee": "Sommités fleuries et fruits",
    "famille_bloom": "Chef d'Orchestre (Cœur & Système Nerveux)",
    "terrains_cibles": ["T4_HPA", "T6_Nerveux", "T8_Inflammation"],
    "actifs_cles": [
      {"nom": "Vitexine / Hypéroside", "polarite": "Hydrosoluble"},
      {"nom": "Proanthocyanidines (OPC)", "polarite": "Hydrosoluble/Liposoluble"}
    ],
    "preuve_scientifique": "Action inotrope positive et chronotrope négative (renforce le cœur et ralentit le rythme). Régule la tension artérielle et apaise l'anxiété par modulation du système nerveux autonome.",
    "pourquoi_bloomlab": {
      "probleme_traditionnel": "Les OPC sont sensibles à l'oxydation. Les flavonoïdes nécessitent une chaleur douce mais constante pour être totalement libérés de la matrice végétale.",
      "phase_A": {"temp": "65°C", "temps": "2h00", "solvant": "Eau distillée + Glycérine", "cible": "Extraction des flavonoïdes et OPC"},
      "phase_B": {"temp": "45°C", "temps": "2h00", "solvant": "Alcool bio 45°", "cible": "Stabilisation et extraction des composés aromatiques"},
      "resultat": "Le 'Lait du Cœur', un tonique cardiaque et nerveux d'une grande douceur et d'une efficacité profonde."
    },
    "convergence_ancestrale": "Plante du cœur physique et émotionnel, utilisée depuis le Moyen Âge pour 'chasser les peines'.",
    "synergies_recommandees": ["Passiflore", "Mélisse"],
    "precautions": "Généralement très sûre. Prudence en cas de prise de digitaliques (digoxine)."
  },
  {
    "plant_id": "cinchona_succirubra",
    "nom_commun": "Quinquina Rouge",
    "nom_latin": "Cinchona succirubra",
    "partie_utilisee": "Écorce séchée",
    "famille_bloom": "Moteur (Tonique & Vitalité)",
    "terrains_cibles": ["T2_Énergie", "T3_Immunité", "T5_Mitochondrie"],
    "actifs_cles": [
      {"nom": "Quinine / Quinidine (Alcaloïdes)", "polarite": "Peu hydrosoluble / Très soluble dans l'alcool"},
      {"nom": "Tanins cinchoniques", "polarite": "Hydrosoluble"}
    ],
    "preuve_scientifique": "La quinine possède des propriétés antipyrétiques, antipaludéennes et toniques amères. Stimule les sécrétions digestives et renforce la réponse immunitaire non spécifique.",
    "pourquoi_bloomlab": {
      "probleme_traditionnel": "L'écorce est extrêmement dure. La quinine nécessite un milieu acide ou fortement alcoolisé pour être extraite efficacement. L'eau seule ne capture que les tanins.",
      "phase_A": {"temp": "85°C", "temps": "3h00", "solvant": "Eau + Acide Citrique (léger)", "cible": "Relargage des tanins et préparation de l'écorce"},
      "phase_B": {"temp": "60°C", "temps": "4h00", "solvant": "Alcool bio 96°", "cible": "Extraction massive des alcaloïdes (Quinine)"},
      "resultat": "Un élixir de vitalité 'Feu', idéal pour les convalescences et les états de fatigue profonde."
    },
    "convergence_ancestrale": "Plante sacrée des Andes, introduite en Europe au XVIIe siècle pour sauver les têtes couronnées de la fièvre.",
    "synergies_recommandees": ["Gingembre", "Gentiane"],
    "precautions": "Interdit en cas de grossesse ou de troubles graves du rythme cardiaque."
  },
  {
    "plant_id": "artichaut",
    "nom_commun": "Artichaut",
    "nom_latin": "Cynara scolymus",
    "partie_utilisee": "Feuilles séchées",
    "famille_bloom": "Médiateur (Soutien Hépatique)",
    "terrains_cibles": ["T4 (Foie)", "T1 (Intestin)", "T8 (Inflammation)"],
    "actifs_cles": [
      { "nom": "Cynarine", "polarite": "Hydrosoluble" },
      { "nom": "Acides phénoliques", "polarite": "Hydrosoluble" },
      { "nom": "Lutéoline", "polarite": "Liposoluble" },
      { "nom": "Inuline", "polarite": "Hydrosoluble" }
    ],
    "preuve_scientifique": "La cynarine et les acides phénoliques stimulent la sécrétion biliaire (effet cholérétique) et son évacuation (effet cholagogue). Propriétés hépatoprotectrices et antioxydantes majeures.",
    "pourquoi_bloomlab": {
      "probleme_traditionnel": "La cynarine est thermosensible au-delà de 70°C. Une infusion classique à l'eau bouillante peut dénaturer une partie des polyphénols. L'extraction contrôlée à 60°C permet de maximiser le Totum.",
      "phase_A": { "temp": "60°C", "temps": "1h30", "solvant": "Eau purifiée", "cible": "Cynarine, inuline et acides chlorogéniques" },
      "phase_B": { "temp": "45°C", "temps": "1h00", "solvant": "Glycérine / Eau", "cible": "Flavonoïdes et stabilisation" },
      "resultat": "Un concentré hépatique biodisponible, doux pour la digestion et riche en protecteurs cellulaires."
    },
    "recette_pas_a_pas": {
      "batch_standard": "Cible Bloom : 750ml de solvant + 24.6g de feuilles (10 sachets)",
      "ingredients": {
        "phase_A": ["24.6g de feuilles d'Artichaut (10 sachets)", "750ml d'Eau filtrée"],
        "phase_B": ["Optionnel : Citron ou Glycérine"]
      },
      "preparation": [
        "1. Ouvrir les 10 sachets d'Artichaut.",
        "2. Verser le contenu dans la cuve de la BloomLab."
      ],
      "phase_A_instructions": [
        "1. Ajouter 750 ml d'eau filtrée.",
        "2. Régler sur 60°C pendant 90 minutes.",
        "3. Lancer le cycle."
      ],
      "transition": [
        "1. Filtrer à chaud à l'aide d'une étamine.",
        "2. Refroidir rapidement pour stopper l'oxydation."
      ],
      "phase_B_instructions": [
        "1. Pas de phase B complexe requise pour l'infusion standard.",
        "2. Vous pouvez ajouter un jus de citron une fois le liquide tiède."
      ],
      "filtration_et_finition": [
        "1. Transvaser dans une bouteille en verre propre.",
        "2. Conserver au réfrigérateur (24h-48h)."
      ]
    },
    "convergence_ancestrale": "Utilisé depuis l'Égypte ancienne pour favoriser la digestion. En Europe, il est le remède phare du drainage hépato-biliaire.",
    "synergies_recommandees": ["Chardon-marie", "Radis noir", "Romarin"],
    "precautions": "Contre-indiqué en cas d'obstruction des voies biliaires ou d'allergie aux Astéracées.",
    "additional_recipes": [
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
            { "time": "matin", "volume_ml": 190 },
            { "time": "midi", "volume_ml": 190 },
            { "time": "apres-midi", "volume_ml": 190 },
            { "time": "fin_d_apres_midi", "volume_ml": 190 }
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
            { "time": "matin", "volume_ml": 180 },
            { "time": "midi", "volume_ml": 180 },
            { "time": "apres-midi", "volume_ml": 180 },
            { "time": "fin_d_apres_midi", "volume_ml": 180 }
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
            { "time": "matin", "volume_ml": 190 },
            { "time": "midi", "volume_ml": 190 },
            { "time": "apres-midi", "volume_ml": 190 },
            { "time": "fin_d_apres_midi", "volume_ml": 190 }
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
            { "time": "matin", "volume_ml": 125 },
            { "time": "milieu_de_matinee", "volume_ml": 125 },
            { "time": "midi", "volume_ml": 125 },
            { "time": "apres-midi", "volume_ml": 125 },
            { "time": "fin_d_apres_midi", "volume_ml": 125 },
            { "time": "soir_tot", "volume_ml": 125 }
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
    ]
  }
];
