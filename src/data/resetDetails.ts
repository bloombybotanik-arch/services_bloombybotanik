export interface ResetSectionDetail {
  id: string;
  title: string;
  subtitle?: string;
  why?: string;
  objective: string;
  objectives?: string[];
  sections?: {
    id: string;
    title: string;
    content: string[];
  }[];
  daily_rituals?: {
    name: string;
    description: string;
    estimated_duration_minutes?: number;
    time_of_day?: 'matin' | 'midi' | 'apres-midi' | 'soir' | 'flexible';
  }[];
  progression_21_days?: string;
  precautions?: string;
  integration_with_reset?: string;
  cta: {
    label: string;
    description: string;
    href: string;
  };
  vignette_key?: string;
  translations?: any;
}

export const resetDetailsData: ResetSectionDetail[] = [
  {
    vignette_key: "respiration",
    id: "respiration",
    title: "Respiration – Nerf Vague & Thymus",
    subtitle: "Réactiver le réflexe anti‑inflammatoire naturel",
    objective: "Activer le nerf vague, éteindre l’inflammation",
    why: "Le nerf vague est le câble biologique qui relie ton cerveau à tes organes vitaux et qui pilote le réflexe anti‑inflammatoire découvert par Kevin Tracey. Quand il est tonique, il peut couper la surproduction de cytokines qui entretient l'inflammation chronique dans tout le corps. Quand il est épuisé par le stress, la sédentarité, le manque de sommeil ou la malbouffe, ce réflexe s’affaiblit et la douleur, la fatigue et les troubles digestifs se chronicisent. La respiration profonde et régulière est l’un des moyens les plus simples et les plus accessibles pour rééduquer ce nerf, imposer un rythme calme au cœur et ouvrir la voie à une meilleure digestion, un sommeil plus réparateur et une immunité plus stable.",
    objectives: [
      "Augmenter le tonus vagal pour mieux réguler l'inflammation et le stress.",
      "Installer des réflexes respiratoires simples qui ramènent le corps en mode réparation.",
      "Préparer le terrain pour un sommeil plus profond et une digestion plus fluide.",
      "Offrir des rituels courts, reproductibles, qui deviennent des automatismes quotidiens."
    ],
    daily_rituals: [
      {
        name: "Souffle long du matin",
        description: "Assis, une main sur le ventre. Inspire par le nez pendant 4 secondes, puis expire par la bouche pendant 6 à 8 secondes, sans forcer. Répète une dizaine de cycles. Ce souffle long impose un rythme calme à ton cœur, commence à faire baisser les hormones du stress et signale à ton système nerveux que la journée peut démarrer en mode parasympathique.",
        estimated_duration_minutes: 5,
        time_of_day: "matin"
      },
      {
        name: "Cohérence cardiaque en journée",
        description: "Trois fois par jour si possible (matin, midi, fin de journée), pratique la cohérence cardiaque : inspire 5 secondes, expire 5 secondes, pendant 5 minutes. Ce protocole est largement étudié pour réduire l'activation du système sympathique et harmoniser cœur, respiration et nerf vague.",
        estimated_duration_minutes: 5,
        time_of_day: "flexible"
      },
      {
        name: "Micro‑gestes vagaux",
        description: "Chaque jour, ajoute un micro‑geste : hum vibratoire, soupir décompresseur (inspiration normale, longue expiration audible), ton simple chant doux ou une vibration dans la gorge. Ces signaux sensoriels répétés entraînent ton nerf vague à envoyer des messages de calme à l’ensemble des organes.",
        estimated_duration_minutes: 3,
        time_of_day: "apres-midi"
      },
      {
        name: "Respiration diaphragmatique du soir",
        description: "Allongé, une main sur le diaphragme, inspire en gonflant doucement le ventre, puis expire lentement jusqu’à ressentir une descente intérieure. Quelques minutes suffisent pour basculer vers le sommeil en limitant les ruminations et l’activation inflammatoire nocturne.",
        estimated_duration_minutes: 3,
        time_of_day: "soir"
      }
    ],
    progression_21_days: "Jours 1–7 : installer au moins un rituel par jour (souffle long du matin ou respiration du soir). Jours 8–14 : ajouter la cohérence cardiaque une à deux fois par jour. Jours 15–21 : intégrer les micro‑gestes vagaux dans des moments clés (avant un repas, après le brossage des dents, avant un rendez‑vous stressant), jusqu’à ce que ces réflexes deviennent naturels. L’objectif n’est pas la performance, mais la répétition douce pour recréer une mémoire corporelle de calme.",
    precautions: "En cas de vertiges, d’oppression thoracique, de douleurs inhabituelles ou de pathologies cardiaques ou respiratoires déjà suivies par un médecin, réduire l’intensité des exercices et demander un avis médical avant de prolonger ou d’ajouter des apnées. Éviter les pratiques trop agressives (hyperventilation, apnées très longues) dans un contexte d’inflammation chronique, de fatigue extrême ou d’anxiété importante : le système nerveux a besoin de douceur.",
    integration_with_reset: "La respiration est la clé d’entrée du Reset Homéostasique : elle réactive le nerf vague, crée une base de sécurité intérieure et rend chaque autre axe plus efficace. Les extraits botaniques préparés avec la BloomLab viennent soutenir ce travail en modulant le terrain inflammatoire et digestif, mais ils s’ancrent dans un corps qui a réappris à envoyer des signaux de calme.",
    cta: {
      label: "Démarrer le Reset respiratoire",
      description: "La respiration est la première langue du corps. Apprenez à lui parler pour éteindre l'inflammation.",
      href: "/reset-homeostasique"
    }
  },
  {
    vignette_key: "mouvement",
    id: "mouvement",
    title: "Mouvement – Lymphe & Fascia",
    subtitle: "Relancer le drainage et libérer les tissus",
    objective: "Mouvement : faire circuler les fluides, libérer le fascia",
    why: "Le système lymphatique est le grand système de drainage du corps : il collecte les déchets, les protéines et une partie des cytokines produites par l’inflammation. Contrairement au sang, la lymphe n’a pas de pompe centrale : elle dépend presque entièrement des contractions musculaires et de la respiration. La sédentarité prolongée augmente les marqueurs d’inflammation de bas grade (CRP, IL‑6, TNF‑α), favorise le surpoids viscéral et ralentit la circulation lymphatique. Des mouvements doux, fréquents, associés à une respiration profonde, peuvent améliorer nettement ce flux, réduire les oedèmes, libérer les fascias et soutenir la réparation tissulaire.",
    objectives: [
      "Réduire l’impact inflammatoire de la sédentarité en multipliant les micro‑mouvements.",
      "Relancer la circulation lymphatique pour mieux évacuer cytokines et déchets métaboliques.",
      "Assouplir les fascias pour diminuer les sensations de raideur, de lourdeur et de douleur diffuse.",
      "Installer une hygiène de mouvement réaliste, compatible avec une vie quotidienne chargée."
    ],
    daily_rituals: [
      {
        name: "Break anti‑inflammation toutes les 30–60 minutes",
        description: "Si tu passes beaucoup de temps assis, programme un rappel toutes les 30 à 60 minutes : lève‑toi, marche dans la pièce, monte une ou deux marches, fais 10 flexions‑extensions de chevilles et de genoux. Ces micro‑pauses sont suffisantes pour interrompre la montée des marqueurs inflammatoires liée au temps assis.",
        estimated_duration_minutes: 2,
        time_of_day: "flexible"
      },
      {
        name: "Marche quotidienne",
        description: "Installe 20 à 30 minutes de marche à ton rythme, idéalement en extérieur. Tu peux les fractionner en 2 × 10 minutes. Cette marche modérée améliore le flux lymphatique, réduit la fibrose tissulaire et contribue à abaisser l’inflammation de bas grade chez les personnes sédentaires.",
        estimated_duration_minutes: 20,
        time_of_day: "apres-midi"
      },
      {
        name: "Routine fascia & diaphragme",
        description: "Chaque jour, prends 5 à 10 minutes pour mobiliser en douceur les grands axes : enrouler‑dérouler la colonne, ouvrir les hanches, faire des rotations lentes des épaules. Combine ces mouvements avec une respiration abdominale pour mobiliser les fascias thoraco‑abdominaux.",
        estimated_duration_minutes: 10,
        time_of_day: "soir"
      },
      {
        name: "Activation lymphatique ciblée (option)",
        description: "Selon ton niveau d’énergie, ajoute quelques mouvements simples : pompage des chevilles, contractions‑relâchements des muscles des jambes, mouvements de bras façon 'pompe'. Dans les études, ce type d’exercices contribue à réduire la surcharge hydrique et à améliorer le confort dans les membres.",
        estimated_duration_minutes: 5,
        time_of_day: "flexible"
      }
    ],
    progression_21_days: "Jours 1–7 : installer les breaks de 2 minutes, en les rendant automatiques (timer, application, rappel visuel). Jours 8–14 : ajouter la marche quotidienne, même si ce n’est que 10 minutes au début. Jours 15–21 : stabiliser la routine fascia/diaphragme et, si le corps le permet, introduire quelques exercices ciblés de pompage lymphatique. L’objectif est d’ancrer l’idée qu’aucune journée ne se passe sans mouvement doux au service du terrain.",
    precautions: "En cas d’insuffisance cardiaque, d’œdèmes importants, d’arthrose sévère ou de fatigue extrême, commencer avec des mouvements très doux, parfois assis ou semi‑couché, et ajuster en lien avec un professionnel de santé. Éviter les séances très intenses et ponctuelles qui épuisent le corps inflammé : dans un Reset, on privilégie la régularité modérée à la performance.",
    integration_with_reset: "Le mouvement agit comme la pompe du Reset Homéostasique : il fait circuler la lymphe, libère les fascias et aide les extraits botaniques à atteindre plus efficacement les tissus. Combiné à la respiration vagale, il transforme chaque journée en une succession de petites vagues de drainage et de libération, plutôt qu’en blocs de sédentarité qui entretiennent le feu inflammatoire.",
    cta: {
      label: "Activer la circulation du Reset",
      description: "Le mouvement n'est pas un bonus, c'est ce qui permet aux Binders de faire leur travail jusqu'au bout.",
      href: "/reset-homeostasique"
    }
  },
  {
    vignette_key: "sommeil",
    id: "sommeil",
    title: "Sommeil – Nuit de reconstruction",
    subtitle: "Redonner au corps ses nuits de réparation",
    objective: "Sommeil : la nuit reconstruit ce que le jour draine",
    why: "Le sommeil profond est un moment de recalibration de l’immunité et de la réparation tissulaire. Quand le sommeil est court, fragmenté ou irrégulier, la production de cytokines pro‑inflammatoires augmente, la régulation glycémique se dégrade et le risque de maladies cardio‑vasculaires, auto‑immunes et neurodégénératives s’élève. Quelques heures de manque de sommeil répétées suffisent à modifier le profil des cellules immunitaires comme si le corps était déjà dans un état d’inflammation ou de stress métabolique avancé. Restaurer une nuit de reconstruction, ce n’est pas chercher la nuit parfaite : c’est créer des conditions stables et simples qui permettent au système nerveux de basculer plus souvent en mode réparation.",
    objectives: [
      "Stabiliser une plage de sommeil suffisante et régulière.",
      "Réduire la fragmentation du sommeil liée aux écrans, au stress et aux rythmes irréguliers.",
      "Mettre en place des rituels de pré‑sommeil qui soutiennent le passage en mode parasympathique.",
      "Laisser au corps des fenêtres nocturnes de repos métabolique."
    ],
    daily_rituals: [
      {
        name: "Plage de sommeil stable",
        description: "Choisis un créneau de 7 à 8 heures de sommeil et garde autant que possible des horaires de coucher et de réveil proches d’un jour à l’autre. La régularité est plus importante que des nuits de 'rattrapage' occasionnelles pour réduire la charge inflammatoire.",
        estimated_duration_minutes: 0,
        time_of_day: "soir"
      },
      {
        name: "Routine de pré‑sommeil sans écrans",
        description: "30 minutes avant le coucher, coupe les écrans. Remplace‑les par une lumière douce, une lecture légère, une douche tiède ou un temps calme. Ajoute 5 minutes de respiration vagale (souffle long ou cohérence cardiaque) pour signaler au système nerveux que la journée se termine.",
        estimated_duration_minutes: 30,
        time_of_day: "soir"
      },
      {
        name: "Environnement de nuit protecteur",
        description: "Garde la chambre plutôt fraîche, sombre et silencieuse. Limite les sources de bruit et de lumière qui fragmentent le sommeil. Un environnement stable diminue les micro‑réveils qui activent l’inflammation nocturne.",
        estimated_duration_minutes: 0,
        time_of_day: "soir"
      },
      {
        name: "Micro‑règles de journée pour mieux dormir",
        description: "Expose‑toi à la lumière naturelle dans la matinée, limite la caféine après 14–16 h et évite les repas très lourds tardifs. Ces habitudes soutiennent la horloge intérieure et facilitent l’endormissement sans recourir à des solutions agressives.",
        estimated_duration_minutes: 10,
        time_of_day: "matin"
      }
    ],
    progression_21_days: "Jours 1–7 : sécuriser l’heure de coucher/réveil et instaurer au moins 15–20 minutes de pré‑sommeil sans écran. Jours 8–14 : consolider la routine (lumière douce, respiration, lecture) et ajuster progressivement la caféine et la lourdeur des repas du soir. Jours 15–21 : affiner l’environnement de nuit (température, obscurité, bruit) et stabiliser une fenêtre nocturne cohérente, en acceptant que certaines nuits restent imparfaites : l’essentiel est le mouvement global vers une nuit plus réparatrice.",
    precautions: "En cas d’insomnie sévère, de nuits très courtes répétées, de ronflements importants avec pauses respiratoires, ou de suspicion de syndrome d’apnée du sommeil, consulter un médecin avant de se contenter de ces seules mesures. Ne pas transformer la gestion du sommeil en source de culpabilité ou de perfectionnisme : le Reset vise à soutenir le corps, pas à le juger.",
    integration_with_reset: "Le sommeil est le moment où le Reset Homéostasique capitalise les efforts des autres axes : le nerf vague consolide ses réflexes, la lymphe draine plus efficacement, le terrain métabolique se rééquilibre. Les préparations botaniques peuvent soutenir l’apaisement et la régénération (selon les plantes choisies), mais elles s’inscrivent dans un cadre d’hygiène de sommeil clair, ce qui évite de les utiliser comme simples 'somnifères naturels'.",
    cta: {
      label: "Consolider la nuit",
      description: "Le sommeil est l'espace où le corps redevient capable de se réguler. Optimisez votre reconstruction nocturne.",
      href: "/reset-homeostasique"
    }
  },
  {
    vignette_key: "alimentation",
    id: "alimentation",
    title: "Alimentation – Nourrir le terrain",
    subtitle: "Mettre la métabolique et l’immunité de ton côté",
    objective: "Alimentation : nourrir le terrain plutôt que le symptôme",
    why: "Ce que nous mangeons chaque jour est l’un des déterminants majeurs de l’inflammation de bas grade, de la résistance à l’insuline et du surpoids viscéral. Une alimentation riche en sucres rapides, farines raffinées et produits ultra‑transformés entretient un état inflammatoire silencieux qui fragilise le système cardio‑vasculaire, le foie, le microbiote et le cerveau. À l’inverse, une alimentation structurée autour de vrais aliments, de bonnes graisses, de fibres et de fenêtres métaboliques de repos peut améliorer nettement les marqueurs de santé, soutenir l’immunité et rendre le corps plus réceptif aux signaux de réparation envoyés par le nerf vague.",
    objectives: [
      "Réduire l’exposition quotidienne aux sucres rapides et aux produits ultra‑transformés.",
      "Stabiliser la glycémie et le métabolisme pour diminuer l’inflammation de bas grade.",
      "Soutenir le microbiote intestinal par des apports progressifs en fibres et nutriments.",
      "Intégrer les plantes (totum) comme soutien du terrain, pas comme substitut magique."
    ],
    daily_rituals: [
      {
        name: "2–3 vrais repas, peu de grignotages",
        description: "Organise ta journée autour de 2 ou 3 repas complets, en limitant au maximum les grignotages. Laisse au corps des fenêtres de repos métabolique, notamment la nuit, pour soutenir les processus d’autophagie et de réparation.",
        estimated_duration_minutes: 0,
        time_of_day: "flexible"
      },
      {
        name: "Qualité des glucides",
        description: "Diminue les sucres ajoutés, les boissons sucrées et les farines blanches. Privilégie les légumes, quelques fruits, des tubercules, et éventuellement des céréales complètes si elles sont bien tolérées. Cela réduit les pics de glucose, la résistance à l’insuline et l’activation inflammatoire qui en découle.",
        estimated_duration_minutes: 10,
        time_of_day: "flexible"
      },
      {
        name: "Graisses protectrices et protéines suffisantes",
        description: "Chaque jour, ajoute une source d’oméga‑3 (poisson gras de qualité ou certaines graines/huile adaptées) et veille à de bonnes protéines (surtout si tu perds du muscle). Ces apports soutiennent la réparation, la stabilité glycémique et les membranes cellulaires.",
        estimated_duration_minutes: 10,
        time_of_day: "flexible"
      },
      {
        name: "Fiber & microbiote",
        description: "Augmente progressivement les légumes et les fibres fermentescibles, en respectant ta tolérance digestive. Un microbiote diversifié aide à moduler l’inflammation, la métabolique et même l’humeur.",
        estimated_duration_minutes: 10,
        time_of_day: "flexible"
      },
      {
        name: "Fenêtre nocturne de repos",
        description: "Installe une fenêtre de 12 heures sans apport calorique entre le dernier repas du soir et le petit‑déjeuner (par exemple dîner à 19 h, petit‑déjeuner à 7 h). Cela donne au corps un temps de repos métabolique et de nettoyage.",
        estimated_duration_minutes: 0,
        time_of_day: "soir"
      }
    ],
    progression_21_days: "Jours 1–7 : stabiliser les horaires de repas et réduire une source évidente de sucre (boisson sucrée, dessert quotidien). Jours 8–14 : améliorer la qualité des glucides (plus de légumes, moins de farines blanches) et introduire une source quotidienne d’oméga‑3. Jours 15–21 : installer la fenêtre nocturne de repos et travailler sur les fibres/microbiote, en ajustant en fonction de la digestion. L’idée n’est pas de lancer un régime violent, mais de déplacer progressivement le centre de gravité alimentaire vers un terrain moins inflammatoire.",
    precautions: "Adapter toujours ces conseils aux pathologies existantes (diabète, insuffisance rénale, maladies digestives) et aux traitements en cours. En cas de terrain complexe, l’accompagnement par un professionnel de santé est vivement recommandé. Éviter les changements alimentaires brutaux qui peuvent déstabiliser la glycémie, le sommeil ou la digestion : un pas tenable vaut mieux qu’une révolution épuisante.",
    integration_with_reset: "L’alimentation est la matrice du Reset Homéostasique : elle nourrit ou entrave les efforts des autres axes. Une alimentation cohérente rend le nerf vague plus réceptif, facilite la circulation lymphatique, améliore le sommeil et permet aux extraits botaniques issus de la BloomLab de travailler sur un terrain plus favorable. Le totum des plantes ne remplace pas une hygiène alimentaire ; il la renforce et l’affine.",
    cta: {
      label: "Nourrir mon terrain",
      description: "L'alimentation est le socle de la transformation. Adoptez une routine qui respecte votre biologie.",
      href: "/culinaire"
    }
  }
];
