/**
 * Lexique Canonique Bloom by BotaniK (Corpus V3.1)
 * Source unique de vérité pour l'ensemble du vocabulaire biologique, phytochimique et galénique.
 * 
 * Règles éditoriales :
 * - Aucune promesse thérapeutique ni terme curatif ("guérir", "traiter").
 * - Définitions simples compréhensibles par un lecteur de 15 ans.
 * - Analogies concrètes tirées du corpus Bloom (fardeau de l'âne, maison en feu, chef d'orchestre, etc.).
 * - Définitions expertes rigoureuses et sourcées.
 */

export type LexiqueCategory =
  | 'stress-terrain'
  | 'physiologie'
  | 'phytochimie'
  | 'galenique-extraction'
  | 'immunite-detox';

export type TermLevel = 'N1' | 'N2' | 'N3';

export interface LexiqueDefinition {
  id: string; // Identifiant unique / slug ancre
  terme: string; // Nom officiel
  variantes?: string[]; // Mots-clés alternatifs ou pluriels pour la détection
  niveau: TermLevel;
  categorie: LexiqueCategory;
  definitionSimple: string; // 1-2 phrases, zéro jargon
  analogie: string; // 1 phrase concrète
  definitionExperte: string; // 1 phrase précise, rigoureusement sourçable
  niveauPreuve?: 1 | 2 | 3 | 4 | 5;
  references?: string;
  lienLexique: string;
  i18n?: {
    fr: {
      terme: string;
      definitionSimple: string;
      analogie: string;
      definitionExperte: string;
    };
    en?: {
      terme: string;
      definitionSimple: string;
      analogie: string;
      definitionExperte: string;
    };
    de?: {
      terme: string;
      definitionSimple: string;
      analogie: string;
      definitionExperte: string;
    };
  };
}

export const CATEGORIES_LABELS: Record<LexiqueCategory, { label: string; description: string }> = {
  'stress-terrain': {
    label: 'Charge Allostatique & Terrain',
    description: 'Les dynamiques d’adaptation biologique, d’usure et d’équilibre systémique.'
  },
  'physiologie': {
    label: 'Physiologie & Neuro-Biologie',
    description: 'Les circuits de régulation cellulaire, hormonale et nerveuse.'
  },
  'phytochimie': {
    label: 'Phytochimie & Totum',
    description: 'Les familles moléculaires actives issues du règne végétal.'
  },
  'galenique-extraction': {
    label: 'Extraction & Galénique',
    description: 'Les procédés techniques pour extraire et préserver les principes actifs sans les dénaturer.'
  },
  'immunite-detox': {
    label: 'Immunité & Émonctoires',
    description: 'Les barrières de protection, filtres d’élimination et modulations immunitaires.'
  }
};

export const FAMILLES_DE_STRESS = [
  {
    id: 'psycho-emotionnel',
    titre: 'Psycho-émotionnel',
    description: 'Pressions mentales, deuils, hyper-vigilance et tensions affectives sollicitant en continu les circuits limbiques.',
    icone: 'Brain'
  },
  {
    id: 'neuroendocrinien',
    titre: 'Neuroendocrinien',
    description: 'Perturbations du cycle circadien, sécrétion anarchique de cortisol et sollicitation épuisante de l’axe corticotrope.',
    icone: 'Moon'
  },
  {
    id: 'inflammatoire-infectieux',
    titre: 'Inflammatoire & Infectieux',
    description: 'Foyers d’activation immunitaire silencieux, agressions virales ou bactériennes latentes et cascades de cytokines pro-inflammatoires.',
    icone: 'Flame'
  },
  {
    id: 'toxique-exposomique',
    titre: 'Toxique & Exposomique',
    description: 'Exposition chronique aux polluants, métaux lourds, xénobiotiques et perturbateurs endocriniens saturant les capacités de détoxication.',
    icone: 'ShieldAlert'
  },
  {
    id: 'metabolique',
    titre: 'Métabolique',
    description: 'Pics glycémiques répétés, résistance à l’insuline, surcharge hépatique et accumulation de sous-produits d’oxydation cellulaire.',
    icone: 'Activity'
  },
  {
    id: 'physico-bioenergetique',
    titre: 'Physico-bioénergétique',
    description: 'Manque d’oxygénation, sédentarité ou surentraînement, pollution électromagnétique et altération de la production mitochondriale d’ATP.',
    icone: 'Zap'
  }
];

export const lexiqueDefinitions: LexiqueDefinition[] = [
  // ==========================================
  // NIVEAU 1 : TERMES FONDAMENTAUX OBLIGATOIRES
  // ==========================================
  {
    id: 'charge-allostatique',
    terme: 'Charge allostatique',
    variantes: ['charge allostatique', 'charges allostatiques', 'allostatic load'],
    niveau: 'N1',
    categorie: 'stress-terrain',
    definitionSimple: "Usure accumulée par le corps lorsqu'il doit s'adapter trop souvent, trop longtemps, à trop de stress à la fois (émotionnels, hormonaux, inflammatoires, toxiques, métaboliques). Quand cette charge dépasse sa capacité de récupération, le corps ne revient plus à l'équilibre : c'est là que les symptômes s'installent.",
    analogie: "Le problème n'est pas la paille qui a fait plier le dos de l'âne, mais le fardeau déjà présent sur son dos.",
    definitionExperte: "Ensemble des altérations physiologiques cumulées résultant d'expositions répétées, prolongées ou mal récupérées à des perturbations internes et externes, dépassant la capacité adaptative du sujet et conduisant à une dysrégulation multi-systémique (neuroendocrine, immunitaire, métabolique, redox).",
    niveauPreuve: 5,
    references: "McEwen & Stellar (Arch Intern Med 1993) ; McEwen (NEJM 1998) ; Juster et al. (Neurosci Biobehav Rev 2010)",
    lienLexique: '/lexique#charge-allostatique',
    i18n: {
      fr: {
        terme: 'Charge allostatique',
        definitionSimple: "Usure accumulée par le corps lorsqu'il doit s'adapter trop souvent, trop longtemps, à trop de stress à la fois. Quand cette charge dépasse sa capacité de récupération, le corps ne revient plus à l'équilibre.",
        analogie: "Le problème n'est pas la paille qui a fait plier le dos de l'âne, mais le fardeau déjà présent sur son dos.",
        definitionExperte: "Ensemble des altérations physiologiques cumulées résultant d'expositions prolongées à des perturbations dépassant la capacité adaptative du sujet."
      },
      en: {
        terme: 'Allostatic Load',
        definitionSimple: "The cumulative biological wear and tear on the body from adapting too often and too long to multisystemic stressors.",
        analogie: "It is not the final straw that breaks the camel's back, but the cumulative heavy burden already carried.",
        definitionExperte: "The cumulative physiological degradation resulting from repeated or chronic adaptation to stressors exceeding adaptive reserve."
      },
      de: {
        terme: 'Allostatische Last',
        definitionSimple: "Die kumulierte biologische Abnutzung des Körpers durch anhaltende Anpassung an multiple Stressfaktoren.",
        analogie: "Nicht der letzte Strohhalm bricht den Rücken des Esels, sondern die schwere Last, die er bereits trägt.",
        definitionExperte: "Gesamtheit der kumulierten physiologischen Veränderungen infolge wiederholter oder chronischer Anpassungsreaktionen."
      }
    }
  },

  {
    id: 'homeostasie',
    terme: 'Homéostasie',
    variantes: ['homéostasie', 'homeostasie', 'homéostatique', 'homeostatique'],
    niveau: 'N1',
    categorie: 'stress-terrain',
    definitionSimple: "Capacité du corps à revenir à son point d'équilibre d'origine après une perturbation.",
    analogie: "Le système de pilotage gyroscopique d'un navire de haute mer, rectifiant sans cesse son cap face aux vagues.",
    definitionExperte: "Processus physiologique dynamique par lequel l'organisme maintient la stabilité de ses paramètres physico-chimiques internes (température, pH, glycémie, volémie) indispensables à la vie cellulaire.",
    niveauPreuve: 5,
    references: "Claude Bernard (1865) ; Walter B. Cannon, The Wisdom of the Body (1932)",
    lienLexique: '/lexique#homeostasie'
  },

  {
    id: 'allostasie',
    terme: 'Allostasie',
    variantes: ['allostasie', 'allostatique', 'allostasis'],
    niveau: 'N1',
    categorie: 'stress-terrain',
    definitionSimple: "Capacité du corps à s'adapter en déplaçant temporairement son point d'équilibre.",
    analogie: "Un thermostat intelligent qui modifie temporairement sa consigne en pleine tempête hivernale pour maintenir la structure habitable.",
    definitionExperte: "Maintien de la stabilité systémique par le changement physiologique (ajustement actif de l'axe HPA, du système nerveux autonome et des médiateurs immunitaires pour répondre aux exigences environnementales).",
    niveauPreuve: 5,
    references: "Sterling & Eyer (1988) ; McEwen (1998)",
    lienLexique: '/lexique#allostasie'
  },

  {
    id: 'dysregulation-multi-systemique',
    terme: 'Dysrégulation multi-systémique',
    variantes: ['dysrégulation multi-systémique', 'dysrégulation multisystémique', 'dysrégulation', 'dysrégulations'],
    niveau: 'N1',
    categorie: 'stress-terrain',
    definitionSimple: "Désynchronisation globale de plusieurs systèmes de l'organisme (nerveux, hormonal, immunitaire, digestif) qui se perturbent en cascade.",
    analogie: "Un orchestre symphonique où les cordes, les cuivres et les percussions jouent chacun à un tempo différent.",
    definitionExperte: "Découplage fonctionnel et perte de coordination homéostatique entre l'axe neuroendocrinien, l'immunité innée, le métabolisme cellulaire et la clairance émonctorielle.",
    niveauPreuve: 5,
    references: "Karlamangla et al. (Psychoneuroendocrinology 2002) ; Seeman et al. (PNAS 2001)",
    lienLexique: '/lexique#dysregulation-multi-systemique'
  },

  {
    id: 'axe-hpa',
    terme: 'Axe HPA (Hypothalamo-Hypophyso-Surrénalien)',
    variantes: ['axe HPA', 'axe hypothalamo-hypophyso-surrénalien', 'axe corticotrope', 'axe surrénalien'],
    niveau: 'N1',
    categorie: 'physiologie',
    definitionSimple: "Circuit de communication central entre le cerveau et les glandes surrénales, qui orchestre la libération des hormones d'alerte et d'adaptation.",
    analogie: "La ligne téléphonique d'urgence directe reliant le centre de commandement central aux équipes d'intervention sur le terrain.",
    definitionExperte: "Axe neuroendocrinien majeur régulant la réponse systémique au stress via la sécrétion de CRH, d'ACTH et de glucocorticoïdes (cortisol).",
    niveauPreuve: 5,
    references: "Selye (Nature 1936) ; Chrousos & Gold (JAMA 1992)",
    lienLexique: '/lexique#axe-hpa'
  },

  {
    id: 'cortisol',
    terme: 'Cortisol',
    variantes: ['cortisol', 'cortisolemie', 'cortisolémie'],
    niveau: 'N1',
    categorie: 'physiologie',
    definitionSimple: "Hormone d'énergie et d'adaptation sécrétée par les surrénales, indispensable pour mobiliser nos réserves au réveil et face aux défis du quotidien.",
    analogie: "L'accélérateur qui injecte du carburant dans le moteur lorsque la pente devient raide.",
    definitionExperte: "Hormone stéroïde glucocorticoïde sécrétée par la zone fasciculée du cortex surrénalien, régulant le métabolisme des glucides, la vigilance et la modulation immunitaire.",
    niveauPreuve: 5,
    references: "Guyton & Hall, Textbook of Medical Physiology",
    lienLexique: '/lexique#cortisol'
  },

  {
    id: 'nerf-vague',
    terme: 'Nerf vague (Système parasympathique)',
    variantes: ['nerf vague', 'tonus vagal', 'parasympathique'],
    niveau: 'N1',
    categorie: 'physiologie',
    definitionSimple: "Grand nerf reliant le cerveau au cœur, aux poumons et aux intestins, chargé d'enclencher le calme, la digestion et la réparation cellulaire.",
    analogie: "Le frein puissant et progressif qui permet au véhicule de ralentir et de se garer en toute sécurité pour faire le plein.",
    definitionExperte: "Dixième paire de nerfs crâniens (nerf pneumogastrique), composante maîtresse du système nerveux parasympathique régulant le tonus viscéral, la variabilité cardiaque et la voie anti-inflammatoire cholinergique.",
    niveauPreuve: 5,
    references: "Porges, The Polyvagal Theory (2011) ; Tracey (Nature 2002)",
    lienLexique: '/lexique#nerf-vague'
  },

  {
    id: 'hrv',
    terme: 'HRV (Variabilité de la Fréquence Cardiaque)',
    variantes: ['HRV', 'variabilité de la fréquence cardiaque', 'variabilité cardiaque', 'VFC'],
    niveau: 'N1',
    categorie: 'physiologie',
    definitionSimple: "Mesure de la micro-variation de temps entre chaque battement du cœur : plus elle est souple, plus le corps est capable de s'adapter.",
    analogie: "La flexibilité d'un roseau qui ondule harmonieusement sous les coups de vent plutôt que de rester rigide et de casser.",
    definitionExperte: "Fluctuation temporelle continue entre les battements cardiaques consécutifs (intervalles R-R), reflétant l'équilibre dynamique entre les branches sympathique et parasympathique du système nerveux autonome.",
    niveauPreuve: 5,
    references: "Task Force of the European Society of Cardiology and the North American Society of Pacing and Electrophysiology (Circulation 1996)",
    lienLexique: '/lexique#hrv'
  },

  {
    id: 'inflammation-de-bas-grade',
    terme: 'Inflammation de bas grade',
    variantes: ['inflammation de bas grade', 'inflammation silencieuse', 'métaflammation', 'low-grade inflammation'],
    niveau: 'N1',
    categorie: 'stress-terrain',
    definitionSimple: "Flamme d'alerte silencieuse et continue dans le corps qui ne provoque ni rougeur ni douleur aiguë, mais consume lentement les réserves de nos tissus.",
    analogie: "Une braise incandescente qui couve sous la cendre au fond d'un plancher en bois, sans jamais faire jaillir de flamme visible.",
    definitionExperte: "État inflammatoire chronique systémique caractérisé par une élévation modérée et durable des cytokines pro-inflammatoires (TNF-α, IL-6, CRP ultrasensible) sans foyer infectieux aigu.",
    niveauPreuve: 5,
    references: "Hotamisligil (Nature 2006) ; Ridker (Lancet 2017)",
    lienLexique: '/lexique#inflammation-de-bas-grade'
  },

  {
    id: 'nf-kb',
    terme: 'NF-κB (Facteur Nucléaire Kappa B)',
    variantes: ['NF-κB', 'NF-kB', 'NFkB', 'facteur nucléaire kappa B'],
    niveau: 'N1',
    categorie: 'physiologie',
    definitionSimple: "Interrupteur génétique à l'intérieur des cellules qui allume la production des molécules d'inflammation en cas de danger perçu.",
    analogie: "L'alarme générale d'une usine qui réveille l'ensemble des sirènes dès qu'un capteur détecte une fumée suspecte.",
    definitionExperte: "Complexe protéique agissant comme facteur de transcription central de la réponse immunitaire innée, activant l'expression de gènes codant pour des cytokines, chimiokines et enzymes inflammatoires (COX-2, iNOS).",
    niveauPreuve: 5,
    references: "Sen & Baltimore (Cell 1986) ; Karin & Greten (Nat Rev Immunol 2005)",
    lienLexique: '/lexique#nf-kb'
  },

  {
    id: 'ido1',
    terme: 'IDO1 (Indoléamine 2,3-dioxygénase 1)',
    variantes: ['IDO1', 'IDO-1', 'indoleamine 2,3-dioxygenase'],
    niveau: 'N1',
    categorie: 'physiologie',
    definitionSimple: "Enzyme qui, sous l'effet d'une inflammation persistante, détourne le tryptophane pour fabriquer des composés toxiques au lieu de la molécule de la sérénité.",
    analogie: "Un aiguillage ferroviaire défaillant qui redirige le train de ravitaillement vers un cul-de-sac pollué au lieu de l'acheminer vers la ville.",
    definitionExperte: "Enzyme inductible par l'interféron-gamma catalysant la dégradation du L-tryptophane en N-formylkynurénine, modulant l'immunosuppression et la neurotoxicité centrale.",
    niveauPreuve: 5,
    references: "Munn & Mellor (Science 1998) ; Dantzer et al. (Nat Rev Neurosci 2008)",
    lienLexique: '/lexique#ido1'
  },

  {
    id: 'tryptophane-kynurenine',
    terme: 'Voie Tryptophane / Kynurénine',
    variantes: ['tryptophane', 'kynurénine', 'voie des kynurénines', 'kynurenine'],
    niveau: 'N1',
    categorie: 'physiologie',
    definitionSimple: "Carrefour biologique où notre corps choisit soit de fabriquer la sérotonine pour le bien-être, soit de transformer le tryptophane en métabolites d'alerte sous l'effet du stress.",
    analogie: "Un grand carrefour routier : si la route paisible est barrée par des travaux (l'inflammation), tout le trafic est forcé d'emprunter une déviation encombrée.",
    definitionExperte: "Voie métabolique catabolisant plus de 95% du L-tryptophane en acide kynurénique, quinoléique et NAD+, fortement réorientée vers des métabolites neurotoxiques en cas de stress allostatique prolongé.",
    niveauPreuve: 5,
    references: "Schwarcz et al. (Nat Rev Neurosci 2012)",
    lienLexique: '/lexique#tryptophane-kynurenine'
  },

  {
    id: 'serotonine',
    terme: 'Sérotonine',
    variantes: ['sérotonine', 'serotonine', '5-HT'],
    niveau: 'N1',
    categorie: 'physiologie',
    definitionSimple: "Molécule messagère essentielle à la stabilité de l'humeur, à la sensation de satiété et à la régulation du transit digestif.",
    analogie: "Le chef de gare qui régule le flot des voyageurs et maintient un climat apaisé sur les quais de la gare intérieure.",
    definitionExperte: "Neurotransmetteur monoaminergique (5-hydroxytryptamine) synthétisé à 90% dans les cellules entérochromaffines du tractus gastro-intestinal et à 10% dans le système nerveux central.",
    niveauPreuve: 5,
    references: "Gershon, The Second Brain (HarperCollins 1998)",
    lienLexique: '/lexique#serotonine'
  },

  {
    id: 'melatonine',
    terme: 'Mélatonine',
    variantes: ['mélatonine', 'melatonine'],
    niveau: 'N1',
    categorie: 'physiologie',
    definitionSimple: "Hormone naturelle de l'obscurité qui synchronise notre horloge interne et déclenche le sommeil profond réparateur.",
    analogie: "Le rideau de velours sombre qu'un gardien tire sur les fenêtres du château pour inviter l'ensemble des occupants au repos.",
    definitionExperte: "Hormone sécrétée par la glande pinéale à partir de la sérotonine selon un rythme nycthéméral dépendant de l'obscurité, doublée d'un antioxydant mitochondrial direct de premier ordre.",
    niveauPreuve: 5,
    references: "Reiter et al. (Molecules 2018) ; Claustrat et al. (Neurochirurgie 2015)",
    lienLexique: '/lexique#melatonine'
  },

  {
    id: 'fkbp5-epigenetique',
    terme: 'FKBP5 & Épigénétique',
    variantes: ['FKBP5', 'épigénétique', 'epigenetique'],
    niveau: 'N1',
    categorie: 'physiologie',
    definitionSimple: "Mécanisme par lequel nos épreuves et notre mode de vie apposent des marqueurs sur nos gènes pour modifier leur sensibilité au stress, sans altérer notre ADN.",
    analogie: "Des post-it ou des surlignages apposés dans le grand livre de recettes de la cellule, dictant quelles pages doivent être lues plus ou moins fort.",
    definitionExperte: "Protéine cochaperonne du récepteur des glucocorticoïdes dont la déméthylation épigénétique induite par des stress prolongés perturbe durablement la boucle de rétrocontrôle négatif du cortisol.",
    niveauPreuve: 5,
    references: "Binder (Psychoneuroendocrinology 2009) ; Klengel et al. (Nat Neurosci 2013)",
    lienLexique: '/lexique#fkbp5-epigenetique'
  },

  {
    id: 'mitochondrie-atp',
    terme: 'Mitochondrie & ATP',
    variantes: ['mitochondrie', 'mitochondries', 'ATP', 'adénosine triphosphate'],
    niveau: 'N1',
    categorie: 'physiologie',
    definitionSimple: "Centrales énergétiques miniatures au cœur de nos cellules qui transforment l'oxygène et les nutriments en monnaie d'énergie vitale (l'ATP).",
    analogie: "Les turbines hydroélectriques qui tournent jour et nuit au fond d'un barrage pour alimenter en électricité toute la région.",
    definitionExperte: "Organites cellulaires eucaryotes produisant la majorité de l'adénosine triphosphate (ATP) par phosphorylation oxydative via la chaîne respiratoire, régulateurs clés de l'apoptose et de la signalisation calcique.",
    niveauPreuve: 5,
    references: "Lane, Power, Sex, Suicide: Mitochondria and the Meaning of Life (Oxford University Press)",
    lienLexique: '/lexique#mitochondrie-atp'
  },

  {
    id: 'microbiote-dysbiose',
    terme: 'Microbiote & Dysbiose',
    variantes: ['microbiote', 'dysbiose', 'microbiome', 'flore intestinale'],
    niveau: 'N1',
    categorie: 'immunite-detox',
    definitionSimple: "Communauté de milliards de micro-organismes bénéfiques peuplant nos intestins ; la dysbiose survient lorsque cet écosystème perd sa diversité et s'appauvrit.",
    analogie: "Une forêt amazonienne luxuriante qui subit une sécheresse et où quelques mauvaises herbes envahissantes finissent par étouffer les essences rares.",
    definitionExperte: "Écosystème commensal bactérien, fongique et viral de la lumière intestinale dont l'altération qualitative et fonctionnelle (dysbiose) favorise la perméabilité muqueuse et l'inflammation systémique.",
    niveauPreuve: 5,
    references: "Cani (Gut 2018) ; Round & Mazmanian (Nat Rev Immunol 2009)",
    lienLexique: '/lexique#microbiote-dysbiose'
  },

  {
    id: 'permeabilite-intestinale',
    terme: 'Perméabilité intestinale (Leaky Gut)',
    variantes: ['perméabilité intestinale', 'hyperperméabilité intestinale', 'leaky gut', 'barrière intestinale'],
    niveau: 'N1',
    categorie: 'immunite-detox',
    definitionSimple: "Relâchement des jonctions serrées qui scellent l'intérieur de l'intestin, laissant passer dans le sang des débris indésirables qui déclenchent l'alarme immunitaire.",
    analogie: "Une moustiquaire de fenêtre dont les mailles se sont distendues, laissant entrer les insectes et la poussière dans le salon.",
    definitionExperte: "Altération de l'intégrité de la barrière épithéliale intestinale (zonuline, occludines) permettant la translocation paracellulaire d'antigènes alimentaires et de toxines microbiennes dans la circulation sanguine.",
    niveauPreuve: 5,
    references: "Fasano (Ann N Y Acad Sci 2012) ; Turner (Nat Rev Immunol 2009)",
    lienLexique: '/lexique#permeabilite-intestinale'
  },

  {
    id: 'lps-endotoxines',
    terme: 'LPS / Endotoxines',
    variantes: ['LPS', 'endotoxines', 'lipopolysaccharides', 'endotoxémie'],
    niveau: 'N1',
    categorie: 'immunite-detox',
    definitionSimple: "Fragments de l'enveloppe de bactéries intestinales mortes qui, lorsqu'ils traversent la barrière digestive, déclenchent une vive réaction d'alerte du système immunitaire.",
    analogie: "Des morceaux de braise échappés d'une cheminée qui tombent sur le tapis et font immédiatement retentir le détecteur de fumée.",
    definitionExperte: "Lipopolysaccharides constitutifs de la membrane externe des bactéries Gram négatives, ligands majeurs du récepteur TLR4 déclenchant l'endotoxémie métabolique et la cascade inflammatoire.",
    niveauPreuve: 5,
    references: "Cani et al. (Diabetes 2007) ; Raetz & Whitfield (Annu Rev Biochem 2002)",
    lienLexique: '/lexique#lps-endotoxines'
  },

  {
    id: 'emonctoires',
    terme: 'Émonctoires',
    variantes: ['émonctoire', 'émonctoires', 'portes d’élimination'],
    niveau: 'N1',
    categorie: 'immunite-detox',
    definitionSimple: "Les cinq organes d'élimination naturels du corps (foie, reins, peau, poumons, intestins) qui filtrent et évacuent les résidus pour préserver la pureté de nos liquides intérieurs.",
    analogie: "Le réseau d'épuration et de recyclage haute précision d'une grande cité, garantissant la salubrité de ses artères.",
    definitionExperte: "Organes et tissus physiologiques assurant la neutralisation enzymatique, la conjugaison et l'excrétion hors de l'organisme des métabolites de dégradation et des xénobiotiques circulants.",
    niveauPreuve: 4,
    references: "Guyton & Hall, Textbook of Medical Physiology",
    lienLexique: '/lexique#emonctoires'
  },

  {
    id: 'totum',
    terme: 'Totum végétal',
    variantes: ['totum', 'totum végétal', 'matrice végétale'],
    niveau: 'N1',
    categorie: 'phytochimie',
    definitionSimple: "Ensemble complet et naturel de toutes les molécules actives, minéraux et cofacteurs d'une plante, agissant en harmonie sans qu'aucun élément ne soit isolé.",
    analogie: "Un orchestre symphonique au grand complet où chaque musicien soutient l'harmonie, plutôt qu'un instrumentiste jouant en solitaire.",
    definitionExperte: "Matrice phytochimique intégrale et inaltérée d'un organisme végétal vivant, dont l'efficacité biologique découle de synergies pharmacocinétiques et pharmacodynamiques multivariées.",
    niveauPreuve: 5,
    references: "Pharmacopée Européenne ; Schulz et al., Rational Phytotherapy ; Verpoorte et al. (2005)",
    lienLexique: '/lexique#totum'
  },

  {
    id: 'sequencage-ab',
    terme: 'Séquençage A/B',
    variantes: ['séquençage A/B', 'extraction séquentielle', 'phase A/B'],
    niveau: 'N1',
    categorie: 'galenique-extraction',
    definitionSimple: "Méthode d'extraction en deux temps qui sépare les molécules fragiles à basse température (Phase A) des principes denses nécessitant plus d'énergie ou un solvant gras (Phase B).",
    analogie: "Comme cuisiner un mets délicat en ajoutant les herbes aromatiques à la fin pour ne pas détruire leurs parfums subtils à feu vif.",
    definitionExperte: "Procédé fractionné dissociant chronologiquement l'extraction aqueuse des composés thermolabiles et l'extraction hydro-alcoolique ou lipidique des principes apolaires à cinétique lente.",
    niveauPreuve: 4,
    references: "Brevet & Procédé d'extraction fractionnée BloomLab ; Principes de phytochimie cinétique",
    lienLexique: '/lexique#sequencage-ab'
  },

  {
    id: 'adaptogenes',
    terme: 'Plantes adaptogènes',
    variantes: ['adaptogène', 'adaptogènes', 'plantes adaptogènes'],
    niveau: 'N1',
    categorie: 'phytochimie',
    definitionSimple: "Plantes d'élite qui aident le corps à résister aux multiples stress en rééquilibrant ses fonctions sans provoquer d'accoutumance ni d'effet coup de fouet brutal.",
    analogie: "Un thermostat intelligent qui chauffe la maison lorsqu'il fait trop froid et déclenche la brise fraîche dès que l'air s'échauffe.",
    definitionExperte: "Substances végétales naturelles modulant l'axe neuroendocrinien et l'expression des protéines de choc thermique (Hsp70), augmentant la résistance non spécifique de l'organisme face aux stresseurs physiques, chimiques et biologiques.",
    niveauPreuve: 5,
    references: "Panossian & Wikman (Pharmaceuticals 2010) ; Brekhman & Dardymov (Annu Rev Pharmacol 1969)",
    lienLexique: '/lexique#adaptogenes'
  },

  {
    id: 'polyphenols-flavonoides',
    terme: 'Polyphénols & Flavonoïdes',
    variantes: ['polyphénol', 'polyphénols', 'flavonoïde', 'flavonoïdes'],
    niveau: 'N1',
    categorie: 'phytochimie',
    definitionSimple: "Vaste famille de pigments et de micronutriments protecteurs sécrétés par les plantes pour se défendre, protégeant nos propres cellules contre le vieillissement et l'oxydation.",
    analogie: "Le bouclier protecteur d'une forteresse, repoussant sans relâche les assauts corrosifs des intempéries.",
    definitionExperte: "Composés organiques aromatiques comportant un ou plusieurs groupements phénoliques, capables de piéger les espèces réactives de l'oxygène (ROS) et de moduler les cascades de signalisation intracellulaire (Nrf2, MAPK).",
    niveauPreuve: 5,
    references: "Manach et al. (Am J Clin Nutr 2004) ; EFSA Scientific Opinions",
    lienLexique: '/lexique#polyphenols-flavonoides'
  },

  {
    id: 'terpenes',
    terme: 'Terpènes',
    variantes: ['terpène', 'terpènes', 'monoterpènes', 'sesquiterpènes'],
    niveau: 'N1',
    categorie: 'phytochimie',
    definitionSimple: "Molécules aromatiques très volatiles qui confèrent aux plantes leurs parfums caractéristiques (pin, lavande, agrumes) et possèdent des vertus apaisantes remarquables.",
    analogie: "Le message olfactif subtil qu'une forêt de conifères libère dans l'air tiède pour signaler sa vitalité et assainir l'atmosphère.",
    definitionExperte: "Hydrocarbures naturels dérivés d'unités isoprène (C5H8) constituant l'armature majeure des fractions volatiles végétales, dotés de propriétés lipophiles capables de franchir la barrière hémato-encéphalique.",
    niveauPreuve: 5,
    references: "Bakkali et al. (Food Chem Toxicol 2008)",
    lienLexique: '/lexique#terpenes'
  },

  {
    id: 'mucilages',
    terme: 'Mucilages',
    variantes: ['mucilage', 'mucilages'],
    niveau: 'N1',
    categorie: 'phytochimie',
    definitionSimple: "Substances végétales gélatineuses qui gonflent au contact de l'eau pour tapisser, protéger et adoucir nos muqueuses digestives irritées.",
    analogie: "Un pansement de soie fluide et doux que l'on viendrait déposer sur une gorge ou une paroi digestive enflammée.",
    definitionExperte: "Polysaccharides hydrosolubles de haut poids moléculaire capables de former des gels colloïdaux visqueux créant un film protecteur mécanique et émollient sur les épithéliums muqueux.",
    niveauPreuve: 5,
    references: "Bruneton, Pharmacognosie (Lavoisier) ; European Medicines Agency (HMPC)",
    lienLexique: '/lexique#mucilages'
  },

  {
    id: 'resines',
    terme: 'Résines végétales',
    variantes: ['résine', 'résines', 'oléorésines'],
    niveau: 'N1',
    categorie: 'phytochimie',
    definitionSimple: "Substances épaisses et insolubles dans l'eau sécrétées par les écorces d'arbres (comme le boswellia ou la myrrhe) pour cicatriser leurs blessures et repousser les assauts extérieurs.",
    analogie: "La sève dorée et protectrice qui se fige sur l'écorce meurtrie pour former un bouclier étanche et inviolable.",
    definitionExperte: "Exsudats végétaux complexes composés d'acides résiniques diterpéniques ou triterpéniques liposolubles, dotés d'actions anti-inflammatoires puissantes (notamment via l'inhibition de la 5-lipoxygénase).",
    niveauPreuve: 5,
    references: "Ammon (Planta Med 2006) ; Abdel-Tawab et al. (Clin Pharmacokinet 2011)",
    lienLexique: '/lexique#resines'
  },

  {
    id: 'macerat-teinture-decoction-infusion',
    terme: 'Galénique (Infusion, Décoction, Macérat, Teinture)',
    variantes: ['macérat', 'teinture-mère', 'teinture', 'décoction', 'infusion', 'galénique'],
    niveau: 'N1',
    categorie: 'galenique-extraction',
    definitionSimple: "L'art de choisir le bon solvant (eau, alcool, huile, glycérine) et la juste température pour extraire les principes actifs d'une plante sans dénaturer son énergie.",
    analogie: "Choisir la bonne clé pour ouvrir la bonne porte : une clé en or pour les fleurs fragiles, une clé en fer forgé pour les racines denses.",
    definitionExperte: "Sciences et techniques de transformation de la matière médicale brute en formes d'administration assurant la biodisponibilité optimale et la stabilité physico-chimique des principes actifs.",
    niveauPreuve: 5,
    references: "Pharmacopée Française 11ème édition ; Bruneton (2016)",
    lienLexique: '/lexique#macerat-teinture-decoction-infusion'
  },

  {
    id: 'terrain',
    terme: 'Terrain biologique',
    variantes: ['terrain', 'terrain biologique', 'profil de terrain'],
    niveau: 'N1',
    categorie: 'stress-terrain',
    definitionSimple: "Profil individuel de vulnérabilité génétique, épigénétique et allostatique ; le sol intérieur sur lequel s'expriment ou s'apaisent nos déséquilibres.",
    analogie: "La qualité de la terre dans un potager : si le sol est fertile et aéré, la plante s'épanouit ; s'il est acide et détrempé, les champignons prolifèrent.",
    definitionExperte: "Ensemble dynamique des prédispositions génomiques, du profil épigénétique, du statut métabolique et de l'historique allostatique d'un individu conditionnant sa réactivité biologique.",
    niveauPreuve: 4,
    references: "Claude Bernard ; Tissot ; Approches systémiques contemporaines de la médecine fonctionnelle",
    lienLexique: '/lexique#terrain'
  },

  {
    id: 'jarisch-herxheimer',
    terme: 'Réaction de Jarisch-Herxheimer',
    variantes: ['Jarisch-Herxheimer', 'Herxheimer', 'crise d’élimination', 'crise de détox'],
    niveau: 'N1',
    categorie: 'immunite-detox',
    definitionSimple: "Exacerbation temporaire d'inconforts survenant quand des toxines ou endotoxines libérées en grand nombre saturent provisoirement les capacités de filtrage du corps.",
    analogie: "La poussière dense qui obscurcit temporairement une pièce lorsqu'on balaie énergiquement sous de vieux tapis.",
    definitionExperte: "Réaction d'amplification inflammatoire transitoire provoquée par le relargage massif d'endotoxines (LPS) et de cytokines lors de la lyse microbienne ou d'une mobilisation émonctorielle rapide.",
    niveauPreuve: 5,
    references: "Jarisch (1895) ; Herxheimer (1902) ; Pound & May (Lancet Infect Dis 2005)",
    lienLexique: '/lexique#jarisch-herxheimer'
  },

  {
    id: 'binder-adsorbant',
    terme: 'Binders & Adsorbants',
    variantes: ['binder', 'binders', 'adsorbant', 'adsorbants', 'chélateur'],
    niveau: 'N1',
    categorie: 'immunite-detox',
    definitionSimple: "Substances naturelles minérales (argiles, zéolithes, charbon actif) capables d'aimanter et d'emprisonner les déchets dans l'intestin pour les évacuer sans qu'ils ne soient réabsorbés.",
    analogie: "Une éponge magnétique puissante qui capture la limaille de fer dans un conduit d'eau sans jamais la relâcher.",
    definitionExperte: "Agents non résorbables présentant une surface spécifique élevée et des charges de surface négatives capables de piéger par adsorption physique ou chélation les toxines et métaux lourds dans la lumière digestive.",
    niveauPreuve: 4,
    references: "European Journal of Clinical Nutrition ; Droy-Lefaix & Tateo (1999)",
    lienLexique: '/lexique#binder-adsorbant'
  },

  // ==========================================
  // NIVEAU 2 : TERMES AVANCÉS (PREMIÈRE OCCURRENCE)
  // ==========================================
  {
    id: 'resolvines',
    terme: 'Résolvines (SPM)',
    variantes: ['résolvine', 'résolvines', 'SPM', 'médiateurs spécialisés de la résolution'],
    niveau: 'N2',
    categorie: 'physiologie',
    definitionSimple: "Petites molécules produites par l'organisme à partir d'acides gras pour éteindre activement le signal d'inflammation et réparer les tissus endommagés.",
    analogie: "L'équipe de pompiers qui inspecte méticuleusement les décombres pour éteindre les dernières flammèches et orchestrer le déblaiement.",
    definitionExperte: "Médiateurs lipidiques spécialisés pro-résolution (SPM) dérivés des acides gras oméga-3 (EPA/DHA) qui arrêtent le recrutement des neutrophiles et stimulent la clairance macrophagique non phlogistique.",
    niveauPreuve: 5,
    references: "Serhan (Nature 2014) ; Serhan et al. (J Exp Med 2002)",
    lienLexique: '/lexique#resolvines'
  },

  {
    id: 'butyrate',
    terme: 'Butyrate (Acides Gras à Chaîne Courte)',
    variantes: ['butyrate', 'acide butyrique', 'SCFA', 'AGCC'],
    niveau: 'N2',
    categorie: 'immunite-detox',
    definitionSimple: "Précieux carburant fabriqué par nos bonnes bactéries intestinales à partir des fibres végétales, qui nourrit et scelle la paroi de l'intestin.",
    analogie: "Le mortier frais et protecteur qu'un maçon applique méticuleusement pour consolider les briques d'un mur de soutènement.",
    definitionExperte: "Acide gras à chaîne courte (AGCC) à 4 carbones produit par la fermentation bactérienne colique, source énergétique préférentielle des colonocytes et inhibiteur naturel des histones désacétylases (HDAC).",
    niveauPreuve: 5,
    references: "Hamer et al. (Aliment Pharmacol Ther 2008) ; Koh et al. (Cell 2016)",
    lienLexique: '/lexique#butyrate'
  },

  {
    id: 'iga-secretoire',
    terme: 'IgA Sécrétoires (sIgA)',
    variantes: ['IgA sécrétoire', 'IgA sécrétoires', 'sIgA', 'immunoglobuline A'],
    niveau: 'N2',
    categorie: 'immunite-detox',
    definitionSimple: "Anticorps sentinelles postés sur nos muqueuses digestives et respiratoires pour neutraliser les intrus avant même qu'ils ne pénètrent dans le sang.",
    analogie: "Les gardes-frontières postés le long d'une douane pour contrôler les passeports et stopper les resquilleurs avant l'entrée sur le territoire.",
    definitionExperte: "Dimères d'immunoglobulines A sécrétés dans la lumière muqueuse par transcytose épithéliale, neutralisant les antigènes et toxines microbiens par exclusion immunitaire.",
    niveauPreuve: 5,
    references: "Macpherson et al. (Nat Rev Immunol 2008) ; Mantis et al. (Mucosal Immunol 2011)",
    lienLexique: '/lexique#iga-secretoire'
  },

  {
    id: 'caraghenanes',
    terme: 'Carraghénanes',
    variantes: ['carraghénane', 'carraghénanes', 'E407'],
    niveau: 'N2',
    categorie: 'phytochimie',
    definitionSimple: "Épaississants extraits d'algues rouges utilisés dans l'industrie agroalimentaire, susceptibles de fragiliser les muqueuses sensibles lorsqu'ils sont mal utilisés.",
    analogie: "Un agent gélifiant synthétique qui alourdit artificiellement une texture au détriment de la respiration du tissu.",
    definitionExperte: "Polysaccharides sulfatés de haut poids moléculaire utilisés comme hydrocolloïdes, faisant l'objet d'études quant à leur potentiel perturbateur sur la perméabilité épithéliale digestive.",
    niveauPreuve: 4,
    references: "Bhattacharyya et al. (Am J Physiol Gastrointest Liver Physiol 2017)",
    lienLexique: '/lexique#caraghenanes'
  },

  {
    id: 'withanolides',
    terme: 'Withanolides',
    variantes: ['withanolide', 'withanolides'],
    niveau: 'N2',
    categorie: 'phytochimie',
    definitionSimple: "Famille de principes actifs spécifiques de l'Ashwagandha qui aident le système nerveux à apaiser les tempêtes émotionnelles et régulent le cortisol.",
    analogie: "Un baume rafraîchissant déposé sur des récepteurs nerveux surchauffés par l'agitation mentale.",
    definitionExperte: "Lactones stéroïdiennes triterpéniques d'origine végétale exerçant une modulation allostérique positive sur les récepteurs GABA-A et atténuant la réactivité de l'axe corticotrope.",
    niveauPreuve: 5,
    references: "Mishra et al. (Altern Med Rev 2000) ; Chandrasekhar et al. (Indian J Psychol Med 2012)",
    lienLexique: '/lexique#withanolides'
  },

  {
    id: 'akba-5-lox',
    terme: 'AKBA & 5-LOX',
    variantes: ['AKBA', '5-LOX', '5-lipoxygénase', 'acide acétyl-11-kéto-bêta-boswellique'],
    niveau: 'N2',
    categorie: 'phytochimie',
    definitionSimple: "Duo clé de la résine de Boswellia : l'AKBA neutralise directement l'enzyme 5-LOX responsable des poussées inflammatoires articulaires et intestinales.",
    analogie: "Le verrou qui bloque avec précision le mécanisme d'une vanne d'inondation avant que l'eau n'envahisse la pièce.",
    definitionExperte: "L'acide acétyl-11-kéto-bêta-boswellique (AKBA) est un inhibiteur allostérique non compétitif puissant de la 5-lipoxygénase (5-LOX), bloquant la synthèse des leucotriènes pro-inflammatoires.",
    niveauPreuve: 5,
    references: "Safayhi et al. (Mol Pharmacol 1992) ; Ammon (Planta Med 2006)",
    lienLexique: '/lexique#akba-5-lox'
  },

  {
    id: 'sulforaphane',
    terme: 'Sulforaphane',
    variantes: ['sulforaphane', 'glucoraphanine'],
    niveau: 'N2',
    categorie: 'phytochimie',
    definitionSimple: "Composé soufré présent dans les jeunes pousses de brocoli, champion pour réveiller les mécanismes naturels d'autodéfense et de détoxication du foie.",
    analogie: "Un coup de clairon qui réveille les brigades de nettoyage de la ville à l'aube pour désinfecter les rues.",
    definitionExperte: "Isothiocyanate organosulfuré puissant inducteur de la voie Nrf2-ARE, stimulant l'expression des enzymes de phase II de détoxication hépatique (glutathion S-transférases, NQO1).",
    niveauPreuve: 5,
    references: "Fahey et al. (PNAS 1997) ; Dinkova-Kostova & Talalay (Mol Nutr Food Res 2008)",
    lienLexique: '/lexique#sulforaphane'
  },

  {
    id: 'egcg',
    terme: 'EGCG (Épigallocatéchine Gallate)',
    variantes: ['EGCG', 'épigallocatéchine gallate', 'épigallocatéchine'],
    niveau: 'N2',
    categorie: 'phytochimie',
    definitionSimple: "Antioxydant majeur du thé vert qui protège les cellules contre les radicaux libres et apaise les emballements métaboliques.",
    analogie: "Une fine couche d'huile protectrice sur une chaîne en métal empêchant l'apparition de toute trace de rouille.",
    definitionExperte: "Polyphénol de la famille des flavan-3-ols exerçant une action antioxydante directe et une inhibition des kinases pro-inflammatoires intracellulaires.",
    niveauPreuve: 5,
    references: "Khan & Mukhtar (Nutr Cancer 2008)",
    lienLexique: '/lexique#egcg'
  },

  {
    id: 'nac-glutathion',
    terme: 'NAC & Glutathion',
    variantes: ['NAC', 'glutathion', 'N-acétyl-cystéine', 'glutathione'],
    niveau: 'N2',
    categorie: 'physiologie',
    definitionSimple: "Le glutathion est le maître antioxydant de nos cellules ; la NAC est sa matière première indispensable pour recharger nos réserves face à la fatigue.",
    analogie: "Le grand filtre purificateur d'eau d'un hôpital et le réservoir de charbon actif neuf nécessaire pour le régénérer.",
    definitionExperte: "Le glutathion (GSH) est le tripeptide antioxydant intracellulaire dominant ; la N-acétyl-L-cystéine (NAC) en constitue le précurseur limitant en apportant le groupement thiol libre indispensable.",
    niveauPreuve: 5,
    references: "Meister & Anderson (Annu Rev Biochem 1983) ; Townsend et al. (Biochem Pharmacol 2003)",
    lienLexique: '/lexique#nac-glutathion'
  },

  {
    id: 'coherence-cardiaque',
    terme: 'Cohérence cardiaque',
    variantes: ['cohérence cardiaque', 'coherence cardiaque', 'résonance cardiaque'],
    niveau: 'N2',
    categorie: 'physiologie',
    definitionSimple: "Pratique respiratoire rythmée (6 respirations par minute) qui synchronise les battements du cœur et le cerveau pour basculer vers le calme en 5 minutes.",
    analogie: "Régler deux métronomes sur le même tempo jusqu'à ce que leur balancement s'accorde dans une parfaite harmonie.",
    definitionExperte: "État neuro-physiologique d'harmonisation de la variabilité de la fréquence cardiaque autour d'une fréquence de 0,1 Hz, optimisant les afférences vagales vers le système nerveux central.",
    niveauPreuve: 5,
    references: "McCraty et al. (Am J Cardiol 1995) ; O'Hare, 365 Cohérence Cardiaque",
    lienLexique: '/lexique#coherence-cardiaque'
  },

  {
    id: 'fascia',
    terme: 'Fascia & Matrice extracellulaire',
    variantes: ['fascia', 'fascias', 'matrice extracellulaire'],
    niveau: 'N2',
    categorie: 'physiologie',
    definitionSimple: "Toile vivante de tissu conjonctif qui enveloppe et relie chacun de nos muscles, organes et nerfs, et par laquelle circulent nos signaux biologiques.",
    analogie: "Un maillage tricoté d'une seule pièce qui maintient chaque partie du corps en place tout en lui permettant de glisser sans frottement.",
    definitionExperte: "Réseau fibro-élastique continu et viscoélastique de collagène et d'élastine entourant les viscères et muscles, médiateur mécano-sensible de l'inflammation et de la transmission de force.",
    niveauPreuve: 4,
    references: "Langevin (J Anat 2006) ; Schleip et al., Fascia: The Tensional Network of the Human Body",
    lienLexique: '/lexique#fascia'
  },

  {
    id: 'systeme-endocannabinoide',
    terme: 'Système endocannabinoïde (SEC)',
    variantes: ['système endocannabinoïde', 'endocannabinoïde', 'SEC', 'récepteurs CB1', 'récepteurs CB2'],
    niveau: 'N2',
    categorie: 'physiologie',
    definitionSimple: "Réseau de capteurs et de molécules naturelles régulateurs qui ajuste en permanence la douleur, l'appétit, le sommeil et l'humeur.",
    analogie: "Le bouton de volume général d'une chaîne hi-fi qui permet de baisser le niveau sonore quand la musique devient trop assourdissante.",
    definitionExperte: "Système de signalisation lipidique rétrograde composé de récepteurs membranaires (CB1, CB2), d'endocannabinoïdes (anandamide, 2-AG) et d'enzymes de synthèse et de dégradation maintenant l'homéostasie neuronale et immunitaire.",
    niveauPreuve: 5,
    references: "Di Marzo et al. (Nature 2004) ; Mechoulam (Br J Pharmacol 2005)",
    lienLexique: '/lexique#systeme-endocannabinoide'
  }
];

export const lexiqueDefinitionsById: Record<string, LexiqueDefinition> = lexiqueDefinitions.reduce((acc, def) => {
  acc[def.id] = def;
  return acc;
}, {} as Record<string, LexiqueDefinition>);
