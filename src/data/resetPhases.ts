export interface Plant {
  slug: string;
  nom: string;
  partie: string;
  role: string;
  depend_de_bilan: boolean;
}

export interface ResetPhaseDetail {
  key: string;
  type: 'diagnostic' | 'phase' | 'pause';
  subtitle: string;
  title: string;
  name: string;
  short_text: string;
  long_text: string;
  summary: string;
  objectives: string[];
  focus_systems: string[];
  plants?: string[];
  core_plants?: Plant[];
  optional_plants?: Plant[];
  actions: string[];
  cta: string;
  system_message: string;
}

export const resetPhasesData: ResetPhaseDetail[] = [
  {
    "key": "step_0",
    "type": "diagnostic",
    "title": "Étape 0",
    "name": "Anamnèse Systémique",
    "subtitle": "Diagnostic",
    "short_text": "L’intelligence ALMA identifie vos verrous biologiques (T1–T10). C’est le point de départ indispensable pour personnaliser votre extraction.",
    "long_text": "L’objectif n’est pas de nommer un symptôme, mais de cartographier le système entier qui s’est déréglé (intestin, foie, immunité, axe HPA, mitochondries, terrain psycho‑émotionnel). Cette étape permet de choisir un chemin de Reset cohérent plutôt que d’appliquer une solution standard ou isolée.",
    "summary": "L’objectif n’est pas de nommer un symptôme, mais de cartographier le système entier qui s’est déréglé (intestin, foie, immunité, axe HPA, mitochondries, terrain psycho‑émotionnel). Cette étape permet de choisir un chemin de Reset cohérent plutôt que d’appliquer une solution standard ou isolée.",
    "objectives": [
      "Identifier les verrous biologiques",
      "Cartographier le système déréglé",
      "Personnaliser l'approche thérapeutique"
    ],
    "focus_systems": ["intestin", "foie", "immunité", "axe HPA", "mitochondries"],
    "actions": [
      "Répondre au questionnaire ALMA",
      "Analyser les résultats systémiques",
      "Choisir son kit de démarrage"
    ],
    "cta": "Lancer mon bilan",
    "system_message": "Bloom ne vise pas à faire taire un symptôme, mais à rééquilibrer un système entier dans le bon ordre."
  },
  {
    "key": "phase_0",
    "type": "phase",
    "title": "Phase 0",
    "name": "Ouverture des Émonctoires",
    "subtitle": "7 jours — Préparation",
    "short_text": "On ne détoxifie pas un foie si les portes de sortie (reins, peau, intestin) sont closes. Utilisation du Pissenlit et de la Bardane pour libérer les filtres.",
    "long_text": "Cette phase prépare les cinq émonctoires (reins, lymphe, poumons, peau, intestin) pour qu’ils puissent évacuer ce que les phases suivantes vont mobiliser. On ne soulage pas un symptôme, on rétablit la capacité du corps à filtrer, drainer et faire circuler à nouveau correctement son propre terrain.",
    "summary": "On ne draine pas avant d'avoir ouvert les sorties. Cette phase prépare les reins, la lymphe, les poumons, la peau et l'intestin pour permettre un vrai travail de fond.",
    "objectives": [
      "Ouvrir les voies d’élimination",
      "Réduire l’engorgement de base",
      "Préparer le corps à recevoir la phase hépatique"
    ],
    "focus_systems": ["reins", "lymphe", "poumons", "peau", "intestin"],
    "plants": ["Prêle", "Orthosiphon", "Pissenlit", "Sureau", "Bardane", "Mauve"],
    "core_plants": [
      { "slug": "prele", "nom": "Prêle", "partie": "aérienne", "role": "Drainage rénal profond, silice pour fascia et collagène.", "depend_de_bilan": false },
      { "slug": "orthosiphon", "nom": "Orthosiphon", "partie": "feuille", "role": "Diurétique doux, dissolution des cristaux, soutien des reins.", "depend_de_bilan": false },
      { "slug": "pissenlit_racine", "nom": "Pissenlit racine", "partie": "racine", "role": "Double drainage rénal et biliaire, pont vers le foie.", "depend_de_bilan": false },
      { "slug": "sureau", "nom": "Sureau", "partie": "fleur", "role": "Draineur lymphatique majeur, antiviral doux, sudation monctorielle.", "depend_de_bilan": false },
      { "slug": "bardane_feuille", "nom": "Bardane feuille", "partie": "feuille", "role": "Dépurative cutanée, pont foie–peau, soutien du monctoire peau.", "depend_de_bilan": false },
      { "slug": "mauve", "nom": "Mauve", "partie": "fleur/feuille", "role": "Mucilages protecteurs des muqueuses respiratoires et cutanées.", "depend_de_bilan": false }
    ],
    "optional_plants": [
      { "slug": "busserole", "nom": "Busserole", "partie": "feuille", "role": "Antiseptique urinaire, diurétique ciblé sur les voies urinaires.", "depend_de_bilan": true },
      { "slug": "reine_des_pres", "nom": "Reine-des-prés", "partie": "sommité fleurie", "role": "Salicylates, drainage articulaire et décalcification des tissus.", "depend_de_bilan": true },
      { "slug": "thym", "nom": "Thym", "partie": "feuille", "role": "Antiseptique bronchique, soutien du monctoire poumons.", "depend_de_bilan": true },
      { "slug": "pin_bourgeon", "nom": "Bourgeon de Pin", "partie": "bourgeon", "role": "Tonus respiratoire, soutien lymphe et voies aériennes.", "depend_de_bilan": true }
    ],
    "actions": [
      "Hydratation régulière",
      "Respiration profonde",
      "Allègement alimentaire",
      "Soutien du transit"
    ],
    "cta": "Détails Phase 0",
    "system_message": "Bloom ne vise pas à faire taire un symptôme, mais à rééquilibrer un système entier dans le bon ordre."
  },
  {
    "key": "phase_1",
    "type": "phase",
    "title": "Phase 1",
    "name": "Relance Hépatique",
    "subtitle": "21 jours — Drainage",
    "short_text": "Mobilisation des toxines et relance de la bile. Utilisation du Kit Renaissance (Radis noir, Artichaut, Chrysanthellum).",
    "long_text": "Le foie filtre 1,7 litre de sang par minute et pilote la glycémie, les hormones et la digestion des graisses ; le relancer, c’est remettre en mouvement une usine centrale, pas « nettoyer le foie » en surface. Cette phase diminue la recirculation silencieuse des toxines et prépare l’équilibre du sang, de la peau et de l’immunité qui sera poursuivi dans les phases suivantes.",
    "summary": "Mobilisation des toxines et relance de la bile. Le foie est traité en premier après l'ouverture des émonctoires, selon la logique du protocole.",
    "objectives": [
      "Soutenir la phase I et II hépatiques",
      "Fluidifier la bile",
      "Diminuer la charge toxique recirculante"
    ],
    "focus_systems": ["foie", "bile", "intestin", "circulation"],
    "plants": ["Gentiane", "Salsepareille", "Pissenlit", "Radis noir", "Artichaut", "Chrysanthellum", "Gingembre"],
    "core_plants": [
      { "slug": "gentiane", "nom": "Gentiane jaune", "partie": "racine", "role": "Amers puissants, reset hépatique, stimulation Phase I et bile.", "depend_de_bilan": false },
      { "slug": "salsepareille", "nom": "Salsepareille", "partie": "racine", "role": "Saponines stéroïdiennes, purgeur de toxines, liaison LPS.", "depend_de_bilan": false },
      { "slug": "pissenlit_racine", "nom": "Pissenlit racine", "partie": "racine", "role": "Diurétique et cholagogue, ouvre sortie rénale et biliaire.", "depend_de_bilan": false },
      { "slug": "radis_noir", "nom": "Radis noir", "partie": "racine", "role": "Glucosinolates activant Nrf2, induction des enzymes de Phase II.", "depend_de_bilan": false },
      { "slug": "artichaut", "nom": "Artichaut", "partie": "feuille", "role": "Cynarine, protection des hépatocytes, flux biliaire.", "depend_de_bilan": false },
      { "slug": "chrysanthellum", "nom": "Chrysanthellum americanum", "partie": "partie aérienne", "role": "Flavonoïdes, microcirculation hépatique, cholestérol LDL.", "depend_de_bilan": false },
      { "slug": "orange_amere", "nom": "Orange amère", "partie": "écorce", "role": "Flavanones digestives, motricité biliaire, aromatique pour observance.", "depend_de_bilan": false },
      { "slug": "gingembre", "nom": "Gingembre", "partie": "rhizome", "role": "Motricité gastrique, anti‑H. pylori, booster de biodisponibilité.", "depend_de_bilan": false },
      { "slug": "poivre_noir", "nom": "Poivre noir", "partie": "fruit", "role": "Pipérine, augmentation de la biodisponibilité de 20–40 %.", "depend_de_bilan": false }
    ],
    "optional_plants": [],
    "actions": [
      "Prise le matin à jeun si bien toléré",
      "Alimentation plus légère le soir",
      "Hydratation renforcée",
      "Éviter l'alcool et les excès gras"
    ],
    "cta": "Voir Kit 1",
    "system_message": "Bloom ne vise pas à faire taire un symptôme, mais à rééquilibrer un système entier dans le bon ordre."
  },
  {
    "key": "pause_1",
    "type": "pause",
    "title": "Pause 1",
    "name": "Pause Intégrative",
    "subtitle": "7 jours — Repos",
    "short_text": "Repos enzymatique crucial pour laisser au foie le temps de stabiliser ses fonctions avant la purification sanguine.",
    "long_text": "Pendant cette pause, on laisse le système se recalibrer (foie, reins, microbiome) au lieu d’ajouter une stimulation supplémentaire. L’idée n’est pas d’arrêter le protocole, mais d’aider le corps à digérer le travail déjà accompli pour rendre la suite plus stable et plus tolérable.",
    "summary": "Repos enzymatique et biologique pour laisser le foie stabiliser ses fonctions avant d'aborder le travail sanguin.",
    "objectives": [
      "Éviter la surcharge",
      "Consolider le drainage",
      "Laisser le système se rééquilibrer"
    ],
    "focus_systems": ["repos", "régulation", "assimilation"],
    "actions": [
      "Poursuivre l'hydratation",
      "Réduire la stimulation",
      "Maintenir le rythme alimentaire"
    ],
    "cta": "Conseils Pause",
    "system_message": "Bloom ne vise pas à faire taire un symptôme, mais à rééquilibrer un système entier dans le bon ordre."
  },
  {
    "key": "phase_2",
    "type": "phase",
    "title": "Phase 2",
    "name": "Pureté Sanguine",
    "subtitle": "21 jours — Purification",
    "short_text": "Nettoyage en profondeur du terrain sanguin et inhibition de NF‑κB par la Boswellia et la Bardane.",
    "long_text": "Le sang est le milieu qui relie tous les organes ; en travailler la qualité, c’est agir sur l’inflammation systémique plutôt que viser une seule zone douloureuse. Cette phase diminue la charge inflammatoire qui nourrit les symptômes (peau, articulations, fatigue) et prépare un terrain plus stable pour la régénération et le psychoneuro‑endocrinien.",
    "summary": "Nettoyage de fond du terrain sanguin et diminution de l'inflammation circulante. Cette phase prolonge le drainage en soutenant le sang, la peau et la réactivité immunitaire.",
    "objectives": [
      "Alléger le terrain inflammatoire",
      "Soutenir la filtration interne",
      "Réduire les manifestations cutanées et circulatoires"
    ],
    "focus_systems": ["sang", "peau", "immunité", "circulation"],
    "plants": ["Bardane", "Salsepareille", "Manjishtha", "Ortie", "Curcuma"],
    "core_plants": [
      { "slug": "bardane_racine", "nom": "Bardane", "partie": "racine", "role": "Dépurative du sang, prébiotique (inuline), soutien cutané.", "depend_de_bilan": false },
      { "slug": "salsepareille", "nom": "Salsepareille", "partie": "racine", "role": "Dpuration sanguine, liaison LPS, pont sang–peau.", "depend_de_bilan": false },
      { "slug": "manjishtha", "nom": "Manjishtha (Rubia cordifolia)", "partie": "racine", "role": "Grande dépurative ayurvédique du sang, régulation des kératinocytes.", "depend_de_bilan": false },
      { "slug": "ortie", "nom": "Ortie", "partie": "feuille/racine", "role": "Reminéralisante, anti‑inflammatoire douce, soutien tissus et follicules.", "depend_de_bilan": false },
      { "slug": "curcuma", "nom": "Curcuma", "partie": "rhizome", "role": "Curcuminoïdes, inhibition NF‑κB, terrain inflammatoire sanguin.", "depend_de_bilan": false }
    ],
    "optional_plants": [
      { "slug": "cassis", "nom": "Cassis", "partie": "feuille/bourgeon", "role": "Apaisant tissulaire, soutien des émonctoires, terrain sensible.", "depend_de_bilan": true },
      { "slug": "reglisse", "nom": "Réglisse", "partie": "racine", "role": "Modulation du cortisol, muqueuses, à utiliser selon axe HPA et tension.", "depend_de_bilan": true },
      { "slug": "boswellia", "nom": "Boswellia", "partie": "résine", "role": "Acides boswelliques résineux documentés dans la tradition ayurvédique.", "depend_de_bilan": true }
    ],
    "actions": [
      "Soutien du microbiote",
      "Réduction des sucres rapides",
      "Alimentation hypotoxique et apaisante",
      "Repos régulier"
    ],
    "cta": "Voir Kit 2",
    "system_message": "Bloom ne vise pas à faire taire un symptôme, mais à rééquilibrer un système entier dans le bon ordre."
  },
  {
    "key": "pause_2",
    "type": "pause",
    "title": "Pause 2",
    "name": "Pause Intégrative",
    "subtitle": "7 jours — Repos",
    "short_text": "Deuxième phase de repos pour consolider les acquis de la purification avant la stabilisation finale.",
    "long_text": "Cette pause permet au système sanguin et immunitaire d’intégrer les modifications (apaisement tissulaire, meilleure fluidité, microbiome plus stable). On ne cherche pas une « cure express », mais une transformation durable du terrain ; les temps de repos font partie du protocole autant que les phases actives.",
    "summary": "Deuxième temps de repos pour consolider la purification avant la stabilisation finale.",
    "objectives": [
      "Intégrer les effets",
      "Prévenir la saturation",
      "Préparer la phase de renforcement"
    ],
    "focus_systems": ["repos", "consolidation", "équilibre"],
    "actions": [
      "Simplicité alimentaire",
      "Hydratation",
      "Sommeil prioritaire"
    ],
    "cta": "Conseils Pause",
    "system_message": "Bloom ne vise pas à faire taire un symptôme, mais à rééquilibrer un système entier dans le bon ordre."
  },
  {
    "key": "phase_3",
    "type": "phase",
    "title": "Phase 3",
    "name": "Stabilisation & Renforcement",
    "subtitle": "21 jours — Consolidation",
    "short_text": "Ancrage des résultats et renforcement de la barrière intestinale et cutanée (Kit Mix Expert Peaux).",
    "long_text": "Ici, on ne « termine une cure », on consolide la nouvelle organisation du système : entérocyte, mitochondrie, fascia, microglie, peau et cheveux sont soutenus pour maintenir le Reset dans le temps. L’objectif est que le corps redevienne capable de se réguler seul, avec moins de dépendance aux produits et plus de cohérence biologique globale.",
    "summary": "Ancrage des résultats, consolidation de la barrière intestinale et cutanée, soutien de la régénération cellulaire et du terrain de fond.",
    "objectives": [
      "Stabiliser les acquis",
      "Renforcer la peau et les tissus",
      "Soutenir la réparation cellulaire"
    ],
    "focus_systems": ["barrière intestinale", "peau", "cellules", "terrain général"],
    "plants": ["Astragale", "Centella asiatica", "Manjishtha", "Prêle", "Ortie"],
    "core_plants": [
      { "slug": "astragale", "nom": "Astragale", "partie": "racine", "role": "Astragaloside IV, télomérase, énergie cellulaire et vasculaire.", "depend_de_bilan": false },
      { "slug": "centella_asiatica", "nom": "Centella asiatica", "partie": "partie aérienne", "role": "Asiaticoside, collagène III/IV, fascia, peau et micro‑circulation cérébrale.", "depend_de_bilan": false },
      { "slug": "manjishtha", "nom": "Manjishtha (Rubia cordifolia)", "partie": "racine", "role": "Dpuration sanguine profonde, régulation cutanée, pont sang–peau.", "depend_de_bilan": false },
      { "slug": "prele", "nom": "Prêle", "partie": "aérienne", "role": "Silice organique, cofacteur du collagène neuf, soutien fascia et os.", "depend_de_bilan": false },
      { "slug": "ortie", "nom": "Ortie", "partie": "feuille/racine", "role": "Magnésium, fer, zinc, soutien tissue conjonctif et cheveux.", "depend_de_bilan": false }
    ],
    "optional_plants": [
      { "slug": "resveratrol", "nom": "Resvératrol", "partie": "extrait de raisin/renouée", "role": "Activation SIRT1, réparation ADN, réduction de l’inflammaging.", "depend_de_bilan": true },
      { "slug": "opc_pin", "nom": "OPC de Pin maritime", "partie": "écorce", "role": "Antioxidant vasculaire, collagène vasculaire, anti‑inflammatoire.", "depend_de_bilan": true },
      { "slug": "bakuchiol", "nom": "Bakuchiol", "partie": "graine de Psoralea corylifolia", "role": "« Rétinol végétal », collagène III/IV sans irritation, soutien peau.", "depend_de_bilan": true },
      { "slug": "romarin", "nom": "Romarin", "partie": "feuille", "role": "Antioxydant mitochondrial, soutien foie, cerveau et circulation.", "depend_de_bilan": true }
    ],
    "actions": [
      "Renforcement progressif",
      "Routine stable",
      "Soutien de long terme",
      "Observation des signaux du corps"
    ],
    "cta": "Voir Kit 3",
    "system_message": "Bloom ne vise pas à faire taire un symptôme, mais à rééquilibrer un système entier dans le bon ordre."
  }
];

export function getResetPhasesData(lang: 'fr' | 'en' | 'de' = 'fr'): ResetPhaseDetail[] {
  if (lang === 'fr') return resetPhasesData;
  const isDE = lang === 'de';
  const loc: Record<string, Partial<ResetPhaseDetail>> = {
    step_0: {
      title: isDE ? "Schritt 0" : "Step 0",
      name: isDE ? "Systemische Anamnese" : "Systemic Anamnesis",
      subtitle: isDE ? "Bestandsaufnahme" : "Assessment",
      short_text: isDE
        ? "ALMA hilft Ihnen, Ihre biologischen Blockaden (T1–T10) einzuordnen – die Basis für Ihre individuelle Extraktion."
        : "ALMA helps identify your biological bottlenecks (T1–T10) — the essential starting point for tailoring your extraction routine.",
      long_text: isDE
        ? "Ziel ist es nicht, ein Symptom zu bekämpfen, sondern das gesamte aus dem Gleichgewicht geratene Terrain (Darm, Leber, Immunsystem, HPA-Achse, Mitochondrien) zu kartieren."
        : "The goal is not to label a single symptom, but to map the interconnected terrain (gut, liver, immunity, HPA axis, mitochondria) for a coherent Reset sequence.",
      summary: isDE
        ? "Kartierung des biologischen Terrains vor Beginn der Pflanzenphasen."
        : "Mapping the biological terrain before starting botanical extraction phases.",
      objectives: isDE
        ? ["Biologische Blockaden erkennen", "Das gesamte Terrain kartieren", "Pflanzenauswahl pädagogisch abstimmen"]
        : ["Identify biological bottlenecks", "Map interconnected terrain systems", "Tailor botanical phase priorities"],
      focus_systems: isDE
        ? ["Darm", "Leber", "Immunsystem", "HPA-Achse", "Mitochondrien"]
        : ["Gut", "Liver", "Immunity", "HPA Axis", "Mitochondria"],
      actions: isDE
        ? ["ALMA-Fragebogen ausfüllen", "Systemische Ergebnisse analysieren", "Starter-Kit auswählen"]
        : ["Complete the ALMA questionnaire", "Review systemic priorities", "Select starter botanical kit"],
      cta: isDE ? "Bilanz starten" : "Start assessment",
      system_message: isDE
        ? "Bloom unterdrückt kein Symptom, sondern unterstützt das gesamte System in der richtigen Reihenfolge."
        : "Bloom does not aim to silence a symptom, but to rebalance an entire system in the proper sequence."
    },
    phase_0: {
      title: "Phase 0",
      name: isDE ? "Öffnung der Ausscheidungsorgane" : "Opening the Emunctories",
      subtitle: isDE ? "7 Tage — Vorbereitung" : "7 days — Preparation",
      short_text: isDE
        ? "Leberentlastung gelingt erst, wenn die Ausscheidungswege (Nieren, Haut, Darm) frei sind. Löwenzahn und Klette bereiten die Filter vor."
        : "Gentle hepatic support begins only once elimination pathways (kidneys, skin, gut) are open. Dandelion and burdock prepare the filters.",
      long_text: isDE
        ? "Diese Phase bereitet alle fünf Ausscheidungsorgane (Nieren, Lymphe, Lunge, Haut, Darm) vor, damit nachfolgende Phasen gut vertragen werden."
        : "This phase prepares all five emunctories (kidneys, lymph, lungs, skin, gut) so subsequent phases are cleanly processed.",
      summary: isDE
        ? "Vorbereitung der Ausscheidungswege vor der Leberphase."
        : "Preparing elimination pathways prior to the hepatic phase.",
      objectives: isDE
        ? ["Ausscheidungswege sanft öffnen", "Grundstau reduzieren", "Auf die Leberphase vorbereiten"]
        : ["Open elimination pathways gently", "Ease baseline congestion", "Prepare the body for the liver phase"],
      focus_systems: isDE ? ["Nieren", "Lymphe", "Lunge", "Haut", "Darm"] : ["Kidneys", "Lymph", "Lungs", "Skin", "Gut"],
      actions: isDE
        ? ["Regelmäßig trinken", "Tief atmen", "Leichte Ernährung", "Darmpassage unterstützen"]
        : ["Steady hydration", "Deep diaphragmatic breathing", "Lighter evening meals", "Support gut transit"],
      cta: isDE ? "Details Phase 0" : "Phase 0 Details",
      system_message: isDE
        ? "Bloom unterdrückt kein Symptom, sondern unterstützt das gesamte System in der richtigen Reihenfolge."
        : "Bloom does not aim to silence a symptom, but to rebalance an entire system in the proper sequence."
    },
    phase_1: {
      title: "Phase 1",
      name: isDE ? "Leber- & Gallenimpuls" : "Hepatic & Biliary Reset",
      subtitle: isDE ? "21 Tage — Drainage" : "21 days — Drainage",
      short_text: isDE
        ? "Sanfte Unterstützung der Leberphasen I & II und des Gallenflusses mit Schwarzem Rettich, Artischocke und Chrysanthellum."
        : "Supporting Phase I & II hepatic enzymes and bile fluidity with black radish, artichoke, and chrysanthellum.",
      long_text: isDE
        ? "Die Leber filtert rund 1,7 Liter Blut pro Minute. Nach Öffnung der Ausscheidungsorgane unterstützt diese Phase die Gallenzirkulation und entlastet die innere Filterarbeit."
        : "The liver filters 1.7 liters of blood per minute. Following emunctory preparation, this phase supports bile flow and reduces silent toxin recirculation.",
      summary: isDE
        ? "Unterstützung von Leber und Gallenfluss nach Phase 0."
        : "Supporting hepatic filtration and bile flow after Phase 0.",
      objectives: isDE
        ? ["Leberphase I & II begleiten", "Gallenfluss verflüssigen", "Rückresorption verringern"]
        : ["Support Phase I & II liver pathways", "Promote healthy bile flow", "Reduce recirculating metabolic load"],
      focus_systems: isDE ? ["Leber", "Galle", "Darm", "Kreislauf"] : ["Liver", "Bile", "Gut", "Circulation"],
      actions: isDE
        ? ["Morgens nüchtern bei guter Verträglichkeit", "Abends leicht essen", "Ausreichend hydrieren", "Alkohol meiden"]
        : ["Morning intake if well tolerated", "Lighter evening meals", "Reinforced hydration", "Avoid alcohol and heavy fats"],
      cta: isDE ? "Kit 1 ansehen" : "View Kit 1",
      system_message: isDE
        ? "Bloom unterdrückt kein Symptom, sondern unterstützt das gesamte System in der richtigen Reihenfolge."
        : "Bloom does not aim to silence a symptom, but to rebalance an entire system in the proper sequence."
    },
    pause_1: {
      title: isDE ? "Pause 1" : "Pause 1",
      name: isDE ? "Integrative Ruhepause" : "Integrative Pause",
      subtitle: isDE ? "7 Tage — Erholung" : "7 days — Rest",
      short_text: isDE
        ? "Wichtige enzymatische Ruhephase, damit sich Leber und Ausscheidung vor der nächsten Stufe stabilisieren."
        : "Essential enzymatic rest allowing liver and filters to stabilize before deeper systemic balancing.",
      long_text: isDE
        ? "Während dieser Pause kalibriert sich das System neu, anstatt weitere Reize hinzuzufügen."
        : "During this planned pause, the system recalibrates and integrates gains before resuming active phases.",
      summary: isDE ? "Enzymatische Erholung zur Stabilisierung." : "Enzymatic rest to consolidate drainage gains.",
      objectives: isDE
        ? ["Überlastung vermeiden", "Drainage festigen", "System ausgleichen"]
        : ["Prevent overload", "Consolidate drainage", "Allow systemic recalibration"],
      focus_systems: isDE ? ["Ruhe", "Regulation", "Aufnahme"] : ["Rest", "Regulation", "Assimilation"],
      actions: isDE
        ? ["Weiter hydrieren", "Reize reduzieren", "Essensrhythmus halten"]
        : ["Maintain hydration", "Lower stimulation", "Keep steady meal timing"],
      cta: isDE ? "Pausen-Tipps" : "Pause Tips",
      system_message: isDE
        ? "Bloom unterdrückt kein Symptom, sondern unterstützt das gesamte System in der richtigen Reihenfolge."
        : "Bloom does not aim to silence a symptom, but to rebalance an entire system in the proper sequence."
    },
    phase_2: {
      title: "Phase 2",
      name: isDE ? "Blut- & Gewebereinheit" : "Blood & Terrain Purity",
      subtitle: isDE ? "21 Tage — Klärung" : "21 days — Purification",
      short_text: isDE
        ? "Begleitung des zirkulierenden Terrains und der Haut-Blut-Achse mit Klette, Sarsaparilla und Kurkuma."
        : "Deep terrain cleansing and modulation of circulating inflammatory tone with burdock, sarsaparilla, and turmeric.",
      long_text: isDE
        ? "Das Blut verbindet alle Organe. Diese Phase begleitet das zirkulierende Milieu, die Haut und die Immunbalance."
        : "Blood links every organ system. This phase supports circulating clarity, skin balance, and immune equilibrium.",
      summary: isDE
        ? "Begleitung von Blutterrain, Haut und Immunbalance."
        : "Supporting circulating terrain, skin clarity, and immune calm.",
      objectives: isDE
        ? ["Entzündungsneigung entlasten", "Innere Filtration stärken", "Hautbild beruhigen"]
        : ["Ease inflammatory load", "Support internal filtration", "Calm skin and circulatory reactivity"],
      focus_systems: isDE ? ["Blut", "Haut", "Immunsystem", "Kreislauf"] : ["Blood", "Skin", "Immunity", "Circulation"],
      actions: isDE
        ? ["Mikrobiom unterstützen", "Schnelle Zucker reduzieren", "Reizarme Kost", "Ausreichend schlafen"]
        : ["Support microbiome", "Reduce refined sugars", "Soothing whole-food diet", "Consistent sleep"],
      cta: isDE ? "Kit 2 ansehen" : "View Kit 2",
      system_message: isDE
        ? "Bloom unterdrückt kein Symptom, sondern unterstützt das gesamte System in der richtigen Reihenfolge."
        : "Bloom does not aim to silence a symptom, but to rebalance an entire system in the proper sequence."
    },
    pause_2: {
      title: isDE ? "Pause 2" : "Pause 2",
      name: isDE ? "Integrative Ruhepause" : "Integrative Pause",
      subtitle: isDE ? "7 Tage — Erholung" : "7 days — Rest",
      short_text: isDE
        ? "Zweite Erholungsphase zur Festigung der Ergebnisse vor der abschließenden Konsolidierung."
        : "Second rest window to consolidate purification gains prior to final stabilization.",
      long_text: isDE
        ? "Ruhezeiten sind ein fester Bestandteil des Reset-Ansatzes für nachhaltige Ergebnisse ohne Überforderung."
        : "Structured rest phases are as essential as active phases for durable terrain resilience.",
      summary: isDE ? "Zweite Ruhephase vor der Stabilisierung." : "Second rest window before consolidation.",
      objectives: isDE
        ? ["Ergebnisse integrieren", "Sättigung vorbeugen", "Stärkungsphase vorbereiten"]
        : ["Integrate progress", "Prevent saturation", "Prepare strengthening phase"],
      focus_systems: isDE ? ["Ruhe", "Konsolidierung", "Balance"] : ["Rest", "Consolidation", "Balance"],
      actions: isDE ? ["Einfache Kost", "Hydratation", "Schlaf priorisieren"] : ["Simple nutrition", "Steady hydration", "Prioritize deep sleep"],
      cta: isDE ? "Pausen-Tipps" : "Pause Tips",
      system_message: isDE
        ? "Bloom unterdrückt kein Symptom, sondern unterstützt das gesamte System in der richtigen Reihenfolge."
        : "Bloom does not aim to silence a symptom, but to rebalance an entire system in the proper sequence."
    },
    phase_3: {
      title: "Phase 3",
      name: isDE ? "Stabilisierung & Stärkung" : "Stabilization & Strengthening",
      subtitle: isDE ? "21 Tage — Festigung" : "21 days — Consolidation",
      short_text: isDE
        ? "Verankerung der Ergebnisse und Unterstützung von Darmbarriere, Faszien und Haut mit Astragalus, Centella und Schachtelhalm."
        : "Anchoring results and reinforcing gut barrier, fascia, and skin vitality with astragalus, centella, and horsetail.",
      long_text: isDE
        ? "Hier wird die neue Systembalance in Darmepithel, Mitochondrien, Faszien und Haut gefestigt, sodass der Körper eigenständig reguliert."
        : "This phase consolidates systemic harmony across enterocytes, mitochondria, fascia, and skin for lasting autonomous regulation.",
      summary: isDE
        ? "Festigung von Darmbarriere, Haut und Zellenergie."
        : "Consolidating intestinal barrier, skin vitality, and cellular resilience.",
      objectives: isDE
        ? ["Ergebnisse stabilisieren", "Haut und Gewebe stärken", "Zellregeneration begleiten"]
        : ["Stabilize gains", "Strengthen skin and connective tissues", "Support cellular renewal"],
      focus_systems: isDE ? ["Darmbarriere", "Haut", "Zellen", "Grundterrain"] : ["Gut Barrier", "Skin", "Cells", "Core Terrain"],
      actions: isDE
        ? ["Schrittweise Stärkung", "Stabile Routine", "Langfristige Pflege", "Körpersignale beobachten"]
        : ["Gradual strengthening", "Steady daily routine", "Long-term care", "Observe body signals"],
      cta: isDE ? "Kit 3 ansehen" : "View Kit 3",
      system_message: isDE
        ? "Bloom unterdrückt kein Symptom, sondern unterstützt das gesamte System in der richtigen Reihenfolge."
        : "Bloom does not aim to silence a symptom, but to rebalance an entire system in the proper sequence."
    }
  };

  return resetPhasesData.map((p) => {
    const patch = loc[p.key];
    return patch ? { ...p, ...patch } : p;
  });
}

