export interface WomenModuleCard {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  keyFocus: string;
}

export interface PlantProtocolRow {
  plant: string;
  phase: string;
  temp: string;
  solvent: string;
  target: string;
  vigilance: string;
}

export interface WomenAcademyCopy {
  metaTitle: string;
  metaDescription: string;
  breadcrumbSection: string;
  breadcrumbTitle: string;
  kicker: string;
  heroTitle: string;
  heroSubtitle: string;
  heroQuote: string;
  heroCaption: string;
  eduNoticeTitle: string;
  eduNoticeText: string;
  tocTitle: string;
  tocItems: { id: string; label: string }[];
  moduleCards: WomenModuleCard[];

  // Module 1
  m1Tag: string;
  m1H2: string;
  m1Objective: string;
  m1Intro: string;
  m1VoynichTitle: string;
  m1VoynichLead: string;
  m1VoynichBullets: { title: string; text: string }[];
  m1TrotulaTitle: string;
  m1TrotulaText: string;
  m1HildegardTitle: string;
  m1HildegardText: string;
  m1SecretTitle: string;
  m1SecretText: string;
  m1TraditionsTitle: string;
  m1TraditionsText: string;
  m1TipTitle: string;
  m1TipText: string;
  m1CtaProtocols: string;
  m1CtaCommunity: string;

  // Module 2
  m2Tag: string;
  m2H2: string;
  m2Objective: string;
  m2GalaxyTitle: string;
  m2GalaxyText: string;
  m2ImmuneTitle: string;
  m2ImmuneText: string;
  m2ImmuneNatureLink: string;
  m2BrainTitle: string;
  m2BrainText: string;
  m2BioShifts: { metric: string; detail: string }[];
  m2TipTitle: string;
  m2TipText: string;
  m2CtaProtocols: string;
  m2CtaCommunity: string;

  // Module 3
  m3Tag: string;
  m3H2: string;
  m3Objective: string;
  m3WinterMetaphor: string;
  m3CliffTitle: string;
  m3CliffText: string;
  m3CliffSymptoms: string;
  m3DppTitle: string;
  m3DppText: string;
  m3StealTitle: string;
  m3StealText: string;
  m3ProtocolTitle: string;
  m3BotanicalCaption: string;
  m3Plants: PlantProtocolRow[];
  m3TipTitle: string;
  m3TipText: string;
  m3SafetyTitle: string;
  m3SafetyText: string;
  m3CtaProtocols: string;
  m3CtaCommunity: string;

  // Module 4
  m4Tag: string;
  m4H2: string;
  m4Objective: string;
  m4PeriTitle: string;
  m4PeriText: string;
  m4MenoTitle: string;
  m4MenoTcm: string;
  m4NeuroTitle: string;
  m4NeuroText: string;
  m4PhysicalTitle: string;
  m4PhysicalList: string[];
  m4StealRecall: string;
  m4SageTitle: string;
  m4SageText: string;
  m4ProtocolTitle: string;
  m4Plants: PlantProtocolRow[];
  m4TipTitle: string;
  m4TipText: string;
  m4SafetyText: string;
  m4CtaProtocols: string;
  m4CtaCommunity: string;

  // Conclusion
  concTitle: string;
  concP1: string;
  concP2: string;
  concCtaMachine: string;
  concCtaProtocols: string;
  concCtaAlma: string;
}

export const WOMEN_ACADEMY_COPY: Record<'fr' | 'en' | 'de', WomenAcademyCopy> = {
  fr: {
    metaTitle: "Le Pouvoir Cyclique et Sacré de la Femme | Bloom Academy",
    metaDescription:
      "Dossier en accès libre Bloom Academy : manuscrit de Voynich, Trotula, biologie de la fécondation, chute hormonale du post-partum, ménopause et plantes d'extraction BloomLab.",
    breadcrumbSection: "Cycles & Biologie Féminine",
    breadcrumbTitle: "Le Pouvoir Cyclique et Sacré de la Femme",
    kicker: "Bloom Academy · Dossier en accès libre · Histoire, Neurobiologie & Ethnobotanique",
    heroTitle: "Le Pouvoir Cyclique et Sacré de la Femme",
    heroSubtitle:
      "Des manuscrits médiévaux oubliés à la neurobiologie contemporaine : réconcilier la femme avec son horloge hormonale, de la fécondation au post-partum et jusqu'à la métamorphose de la ménopause.",
    heroQuote:
      "« Votre corps n'est pas brisé par ses cycles ; il orchestre une partition lumineuse, immunitaire et nerveuse d'une rare intelligence. »",
    heroCaption:
      "Fig. 1 — Manuscrit botanique des cycles lunaires, alchémille (Alchemilla vulgaris), sauge officinale et extraction douce du safran.",
    eduNoticeTitle: "Vocation éducative et accompagnement médical",
    eduNoticeText:
      "Ce dossier est strictement pédagogique et historique. Il ne constitue ni un diagnostic, ni une prescription, et ne remplace jamais un suivi médical, gynécologique, obstétrical ou psychologique — en particulier durant la grossesse, l'allaitement, le post-partum ou un traitement en cours.",
    tocTitle: "Sommaire du dossier",
    tocItems: [
      { id: "module-1", label: "01 · Manuscrits Interdits & Voynich" },
      { id: "module-2", label: "02 · Alchimie de la Fécondation" },
      { id: "module-3", label: "03 · Post-Partum & Falaise Hormonale" },
      { id: "module-4", label: "04 · Péréménopause, Ménopause & Sagesse" },
      { id: "conclusion", label: "05 · Synthèse & BloomLab" },
    ],
    moduleCards: [
      {
        id: "module-1",
        number: "Module 01",
        title: "Les Manuscrits Interdits",
        subtitle: "Voynich, Trotula, Hildegarde, Ayurveda & MTC",
        keyFocus: "Chronopharmacologie & noyau porphyrine",
      },
      {
        id: "module-2",
        number: "Module 02",
        title: "L'Alchimie de la Conception",
        subtitle: "Fécondation, tolérance immunitaire & Mommy Brain",
        keyFocus: "Onde calcique & neuroplasticité maternelle",
      },
      {
        id: "module-3",
        number: "Module 03",
        title: "Le Post-Partum : L'Hiver Biologique",
        subtitle: "Chute hormonale, vol de la prégnénolone & DPP",
        keyFocus: "Safran 40°C, Ashwagandha & Ortie",
      },
      {
        id: "module-4",
        number: "Module 04",
        title: "Ménopause & Passage vers la Sagesse",
        subtitle: "Péréménopause, neurochimie & Femme Sage",
        keyFocus: "Sauge dosée (limite thuyone EMA), Shatavari, Maca & Rhodiola",
      },
    ],

    // MODULE 1
    m1Tag: "Module 01 · Savoirs Oubliés & Ethnobotanique",
    m1H2: "L'Histoire Cachée : Quand la Science et le Sacré s'unissaient",
    m1Objective:
      "Objectif : Déconstruire les tabous et réhabiliter le corps féminin comme un sanctuaire biologique et cosmique.",
    m1Intro:
      "Pendant des siècles, la médecine officielle a réduit le corps de la femme à une mécanique reproductrice souvent jugée instable ou dysfonctionnelle. Pourtant, les textes les plus anciens — ceux que l'on a longtemps qualifiés d'hérétiques, d'obscurs ou d'illisibles — décrivent un tout autre récit : celui d'un microcosme vivant accordé aux cycles de la lumière, de la lune et des saisons végétales.",
    m1VoynichTitle: "1. Le Manuscrit de Voynich (MS 408) : Le Secret de la « Fourche d'Accordage »",
    m1VoynichLead:
      "Le célèbre codex du XVe siècle, peuplé de plantes non identifiées et de femmes immergées dans des bassins botaniques interconnectés, n'est peut-être pas un grimoire indéchiffrable. Des travaux interdisciplinaires récents (l'hypothèse de la Tuning Fork / Fourche d'Accordage, 2026) suggèrent qu'il s'agirait d'un manuel de chronopharmacologie féminine.",
    m1VoynichBullets: [
      {
        title: "Le principe diurne / nocturne (Yin / Yang)",
        text: "Le manuscrit mettrait en regard l'état biochimique diurne (capture solaire, synthèse) et nocturne (régénération, drainage) des végétaux avec les phases du cycle féminin.",
      },
      {
        title: "Le pont moléculaire du noyau porphyrine (Mg / Fe)",
        text: "La chlorophylle (qui capte les photons grâce à un atome de magnésium au centre de son anneau) et l'hémoglobine (qui transporte l'oxygène dans le sang féminin grâce à un atome de fer) partagent exactement la même charpente chimique : le noyau porphyrine. En captant la lumière, les plantes forgent des cofacteurs capables de soutenir notre propre rapport à l'oxygène, au sang et à l'énergie.",
      },
      {
        title: "Des hormones messagères de lumière",
        text: "Rythmées par l'axe pinéal-hypothalamique (mélatonine, FSH, LH, œstrogènes, progestérone), les hormones agissent comme des traducteurs entre la lumière cosmique et la physiologie cellulaire.",
      },
    ],
    m1TrotulaTitle: "2. Les Textes de Trotula de Salerne (XIe siècle) : La Voix Effacée",
    m1TrotulaText:
      "Issue de l'École de Salerne — considérée comme la première faculté de médecine d'Europe —, Trotula a rédigé des traités médicaux par des femmes pour des femmes. Elle y abordait sans tabou les menstruations, la fertilité, les douleurs pelviennes et le bien-être intime. Au fil des siècles suivants, ses manuscrits furent massivement réécrits, attribués à des copistes masculins et expurgés pour en effacer la voix féminine et la bienveillance empirique.",
    m1HildegardTitle: "3. Hildegarde de Bingen (XIIe siècle) : La Purge Sacrée",
    m1HildegardText:
      "Dans son ouvrage Cause et Cure (Causae et Curae), l'abbesse et botaniste rhénane refuse la notion dogmatique d'un sang « impur ». Elle décrit la menstruation comme une purge naturelle et sacrée, reliée aux quartiers de la lune et à la viriditas (la force vitale verte). Elle recommandait notamment l'Alchémille (Alchemilla vulgaris, « manteau des dames ») pour ses tanins astringents et son affinité régulatrice avec le terrain utérin.",
    m1SecretTitle: "Le Secret de la Nature : un reset métabolique mensuel",
    m1SecretText:
      "Ne voyez plus vos règles comme une simple contrainte mécanique, mais comme un rendez-vous de renouvellement : chaque mois, l'organisme évacue l'ancien tissu endométrial et réinitialise ses marqueurs vasculaires pour laisser place au nouveau cycle.",
    m1TraditionsTitle: "4. Ayurveda et Médecine Traditionnelle Chinoise (MTC) : Agni et Jing",
    m1TraditionsText:
      "En Ayurveda, le flux menstruel (Artava) reflète la qualité du feu digestif et métabolique (Agni) ainsi que de Rakta (le tissu sanguin) : un cycle fluide témoigne d'un feu équilibré sans stagnation. En MTC, le sang (Xue) et l'essence vitale innée (Jing des Reins) gouvernent le vaisseau Chong Mai (« Mer du Sang ») : nourrir le Sang et protéger le Jing garantissent la souplesse de chaque transition de vie.",
    m1TipTitle: "Conseil BloomLab · Extraction de l'Alchémille (Manteau des Dames)",
    m1TipText:
      "Comment préserver les polyphénols et tanins régulateurs de l'Alchémille sans extraire d'astringence excessive ni oxyder ses flavonoïdes ? Réglez la BloomLab en Phase A (eau filtrée pure), à 70 °C pendant 15 à 20 minutes sous vortex doux. Cette température respecte l'intégrité des tanins ellagiques tout en obtenant une infusion ambrée, ronde et digeste.",
    m1CtaProtocols: "Explorer le Guide des Solvants & Températures",
    m1CtaCommunity: "Poser une question sur le cycle à ALMA",

    // MODULE 2
    m2Tag: "Module 02 · Neurobiologie & Immunologie de la Conception",
    m2H2: "L'Alchimie de la Conception : Ce qui se passe vraiment dans le corps",
    m2Objective:
      "Objectif : Comprendre la fécondation non comme un automatisme mécanique, mais comme une véritable métamorphose immunitaire et neurologique.",
    m2GalaxyTitle: "1. Le Choc des Galaxies : La Fécondation et l'Onde Calcique",
    m2GalaxyText:
      "La rencontre entre un spermatozoïde et un ovocyte n'a rien d'une fusion passive : c'est un événement électrique fulgurant. À l'instant exact de la pénétration, une vague d'ions calcium (onde calcique) déferle à travers tout le cytoplasme de l'ovocyte. Elle modifie instantanément la zone pellucide pour verrouiller l'accès aux autres spermatozoïdes et déclenche le réveil transcriptionnel du nouveau génome. En neuf mois, cette cellule unique orchestre des milliards de divisions coordonnées.",
    m2ImmuneTitle: "2. Le Miracle Immunitaire de la Nidation : Accepter l'Étranger",
    m2ImmuneText:
      "Biologiquement, l'embryon est une semi-allogreffe : 50 % de son patrimoine génétique est d'origine paternelle, donc « étranger » aux yeux du système immunitaire maternel. En situation ordinaire, les lymphocytes T détruiraient tout corps portant des antigènes distincts. Lors de la nidation, le corps féminin accomplit une prouesse de tolérance immunitaire active : la progestérone et l'endomètre reprogramment localement les cellules tueuses utérines (uNK) et favorisent les lymphocytes T régulateurs (Treg) pour bâtir un sanctuaire protecteur sans affaiblir la vigilance générale de la mère.",
    m2ImmuneNatureLink:
      "Le lien avec le Vivant : c'est exactement la même intelligence biologique que celle d'une racine végétale qui sécrète des exsudats pour accueillir les mycorhizes et bactéries symbiotiques du sol, tout en repoussant les agents pathogènes.",
    m2BrainTitle: "3. Le « Mommy Brain » : La Reconfiguration Neurologique par Neuroplasticité",
    m2BrainText:
      "On a trop souvent tourné en dérision les oublis passagers de la femme enceinte. L'imagerie cérébrale (IRM longitudinale) a démontré le contraire : la grossesse induit une neuroplasticité ciblée et un élagage synaptique sélectif dans les réseaux du cortex préfrontal médian et du sillon temporal. Le cerveau optimise ses ressources pour amplifier les circuits de l'empathie, de la lecture émotionnelle fine, de la détection des signaux de danger et de l'attachement. Ce n'est pas une perte cognitive : c'est une mise à jour biologique vers l'intuition protectrice.",
    m2BioShifts: [
      {
        metric: "+40 à +50 %",
        detail: "Expansion du volume plasmatique et sanguin maternel pour irriguer le placenta sans priver les organes vitaux.",
      },
      {
        metric: "Tolérance Treg / uNK",
        detail: "Bascule immunitaire orchestrée par la progestérone et le PIBF afin d'accueillir l'ADN semi-étranger lors de l'implantation.",
      },
      {
        metric: "Neuroplasticité IRM",
        detail: "Spécialisation des aires sociales et émotionnelles persistant plusieurs années après la naissance (sommeil vigilant, empathie).",
      },
    ],
    m2TipTitle: "Conseil BloomLab · Prudence Absolue & Soutien Minéral Doux",
    m2TipText:
      "Pendant la grossesse, le principe de précaution prime : de nombreuses plantes actives ou huiles essentielles sont contre-indiquées. Avant toute préparation botanique, demandez l'accord de votre médecin ou sage-femme. Sur validation médicale, la BloomLab permet des infusions douces purement nutritionnelles (ex. Ortie douce en Phase A à 70 °C pour ses minéraux, ou Feuille de Framboisier exclusivement en toute fin de grossesse selon avis obstétrical).",
    m2CtaProtocols: "Consulter les Fiches & Précautions Botaniques",
    m2CtaCommunity: "Échanger avec ALMA sur les précautions",

    // MODULE 3
    m3Tag: "Module 03 · Le Grand Oubli & L'Hiver Biologique",
    m3H2: "L'Après : Post-Partum, Baby Blues et Dépression",
    m3Objective:
      "Objectif : Déculpabiliser totalement les jeunes mères et comprendre le séisme neuro-endocrinien de l'après-naissance.",
    m3WinterMetaphor:
      "Métaphore fondatrice : Le post-partum est un hiver biologique. On demande trop souvent à une femme de rayonner comme en plein été alors que son terrain traverse le sevrage hormonal le plus abrupt de l'existence humaine.",
    m3CliffTitle: "1. La Falaise Hormonale (24 à 48 heures après l'accouchement)",
    m3CliffText:
      "Durant neuf mois, le placenta agissait comme une usine endocrinienne gigantesque. Dès son expulsion, en l'espace de 24 à 48 heures, les taux d'œstrogènes et de progestérone — qui avaient atteint des sommets historiques — s'effondrent verticalement. L'organisme subit un sevrage hormonal brutal comparable à une ménopause instantanée.",
    m3CliffSymptoms:
      "Manifestations fréquentes du Baby Blues (jours 3 à 14) : vagues de pleurs sans raison apparente, hypersensibilité sensorielle, irritabilité, sueurs nocturnes, frissons thermiques, fatigue écrasante et sensation de vide corporel.",
    m3DppTitle: "2. Dépression Post-Partum (DPP), Ocytocine et Cortisol",
    m3DppText:
      "Lorsque cette détresse dépasse deux semaines ou s'accompagne d'une anxiété envahissante, d'insomnies sévères ou d'un sentiment de déconnexion, il s'agit d'une dépression post-partum (DPP) — une réalité neurobiologique, jamais un manque d'amour ou de volonté. Privé brutalement de progestérone (dont les métabolites comme l'alloprégnanolone calment naturellement les récepteurs GABA du cerveau), le système nerveux s'emballe. En parallèle, les pics d'ocytocine liés à l'allaitement côtoient un cortisol chroniquement bloqué à la hausse par la fragmentation du sommeil et la perte sanguine.",
    m3StealTitle: "3. Le « Vol de la Prégnénolone » (Pregnenolone Steal)",
    m3StealText:
      "La prégnénolone est l'hormone mère synthétisée à partir du cholestérol, à partir de laquelle le corps fabrique aussi bien les hormones sexuelles apaisantes (progestérone, œstrogènes, DHEA) que le cortisol (hormone de survie au stress). Lors d'un post-partum épuisant ou d'un stress intense, les glandes surrénales réquisitionnent prioritairement la prégnénolone pour fabriquer du cortisol. Résultat : plus de matière première disponible pour reconstruire la sérénité hormonale.",
    m3ProtocolTitle: "Protocole Pédagogique BloomLab · La Trousse de Secours de l'Après",
    m3BotanicalCaption:
      "Fig. 2 — Safran (Crocus sativus), Sauge officinale, racine d'Ashwagandha, Ortie piquante et Romarin : précision des températures d'extraction aqueuse et lipophile.",
    m3Plants: [
      {
        plant: "Safran (Crocus sativus)",
        phase: "Extraction à froid ou Phase A",
        temp: "20–40 °C",
        solvent: "Eau pure (ou macération douce)",
        target: "Équilibre émotionnel & sérotonine (30 mg/j d'extrait documentés dans la littérature sur la dépression légère à modérée)",
        vigilance: "Avis médical indispensable si allaitement ou prise d'antidépresseurs (ISRS).",
      },
      {
        plant: "Ashwagandha (Withania somnifera)",
        phase: "Phase B (Racine)",
        temp: "50 °C",
        solvent: "Eau / Phase mixte douce",
        target: "Soutien des glandes surrénales épuisées et modulation du cortisol",
        vigilance: "Contre-indiquée durant la grossesse ; avis médical en cas d'allaitement ou de trouble thyroïdien.",
      },
      {
        plant: "Ortie Piquante (Urtica dioica)",
        phase: "Phase A (Feuilles)",
        temp: "70 °C",
        solvent: "Eau filtrée pure",
        target: "Reconstitution minérale, chlorophylle (noyau porphyrine) et soutien des réserves de fer post-hémorragiques",
        vigilance: "Attention en cas d'insuffisance rénale/cardiaque avec œdèmes ou surcharge en fer (hémochromatose).",
      },
    ],
    m3TipTitle: "Conseil BloomLab · Préserver la Crocine et le Safranal à 40 °C",
    m3TipText:
      "Pourquoi ne jamais verser d'eau bouillante sur vos stigmates de Safran ? Ses molécules messagères (crocine hydrosoluble et safranal aromatique) s'oxydent et se volatilisent au-dessus de 45–50 °C. Dans la BloomLab, sélectionnez une Phase A douce à 40 °C (ou une extraction à température ambiante sous vortex léger) : vous obtenez un extrait rubis-doré intact, à associer à un suivi médical bienveillant.",
    m3SafetyTitle: "Rappel de sécurité essentiel en Post-Partum",
    m3SafetyText:
      "Si vous ressentez une tristesse persistante au-delà de 14 jours, des pensées angoissantes ou un épuisement extrême, consultez sans attendre votre médecin, votre sage-femme ou un professionnel de santé mentale. Les plantes accompagnent le terrain mais ne remplacent jamais un avis médical ni un traitement prescrit — notamment en cas d'allaitement.",
    m3CtaProtocols: "Voir les Protocoles de Régénération & Axe HPA",
    m3CtaCommunity: "Demander conseil à ALMA",

    // MODULE 4
    m4Tag: "Module 04 · Transition Hormonale & Émergence de la Femme Sage",
    m4H2: "La Transition : Comprendre la Chute Hormonale et ses Impacts",
    m4Objective:
      "Objectif : Transformer la peur d'une « fin » biologique en compréhension claire et en puissance de renaissance.",
    m4PeriTitle: "1. La Péréménopause : Le Chaos Fertile (Les Montagnes Russes)",
    m4PeriText:
      "La péréménopause ne ressemble pas à une descente linéaire : c'est une période de turbulence durant laquelle les ovaires répondent de manière erratique aux signaux de l'hypophyse. Les pics de FSH déclenchent parfois des sursauts brutaux d'œstrogènes suivis d'effondrements rapides, alors même que la progestérone diminue plus précocement. Symptômes typiques : cycles irréguliers, tensions mammaires, sautes d'humeur, réveils nocturnes à 3 h du matin et brouillard cérébral (brain fog).",
    m4MenoTitle: "2. La Ménopause : Comprendre la Chute et la Nouvelle Ère",
    m4MenoTcm:
      "En Médecine Traditionnelle Chinoise, la ménopause est qualifiée de transition du « Sang » vers le « Qi » (l'énergie pure) : l'organisme cesse d'investir mensuellement son essence reproductive pour rediriger ce potentiel vers le Cœur, l'Esprit (Shen) et la longévité.",
    m4NeuroTitle: "Symptômes neurobiologiques : quand la chimie cérébrale se réajuste",
    m4NeuroText:
      "Les œstrogènes ne servent pas qu'à la reproduction : ce sont de puissants neuromodulateurs. Ils soutiennent la synthèse et la sensibilité des récepteurs de la sérotonine (humeur, sérénité) et de la dopamine (élan vital, motivation, mémoire de travail). Leur baisse explique pourquoi l'anxiété, la lassitude émotionnelle ou les troubles de concentration (« ce n'est pas dans votre tête ») relèvent d'une adaptation neurochimique réelle.",
    m4PhysicalTitle: "Impacts physiques majeurs de la transition :",
    m4PhysicalList: [
      "Bouffées de chaleur & sueurs nocturnes : le thermostat hypothalamique se dérègle sous l'effet des fluctuations d'œstrogènes et de noradrénaline.",
      "Sécheresse des muqueuses et de la peau : baisse d'hydratation collagénique et tissulaire liée au déficit œstrogénique.",
      "Répartition métabolique abdominale : sensibilité accrue à l'insuline et stockage viscéral protecteur en réponse au cortisol.",
      "Densité minérale osseuse : ralentissement de l'activité des ostéoblastes nécessitant un apport accru en minéraux, vitamine D/K2 et mouvement en charge.",
    ],
    m4StealRecall:
      "Attention au « Vol de la Prégnénolone » : à la ménopause, lorsque les ovaires passent le relais aux glandes surrénales et aux tissus périphériques pour produire de faibles doses d'hormones de relais, un stress chronique (cortisol élevé) détourne la prégnénolone et amplifie nettement les bouffées de chaleur, l'insomnie et l'irritabilité.",
    m4SageTitle: "3. Le Nouveau Pouvoir : De la « Mère » à la « Femme Sage »",
    m4SageText:
      "Sur le plan évolutif, la ménopause est une exception biologique rare dans le règne animal (l'hypothèse de la grand-mère). La Nature a façonné cette longue phase post-reproductive pour que la femme, libérée de la charge cyclique et gravidique, devienne la Gardienne de la mémoire, de la stratégie et de la transmission au sein de la communauté. Le pouvoir créateur ne s'éteint pas : il change de fréquence.",
    m4ProtocolTitle: "Protocole Pédagogique BloomLab · Le Bouclier de la Transition",
    m4Plants: [
      {
        plant: "Sauge Officinale (Salvia officinalis)",
        phase: "Phase A uniquement",
        temp: "65–70 °C",
        solvent: "Eau pure (dosage maîtrisé)",
        target: "Bouffées de chaleur et transpiration nocturne (phytoestrogènes doux et acide rosmarinique)",
        vigilance: "L'eau ne supprime pas la thuyone : environ 17,6 % de la thuyone passent dans 150 ml d'eau chaude (EMA). La quantité dépend de la sauge utilisée et peut dépasser la limite de 6 mg/jour ; usage oral limité à 2 semaines et à minimiser pendant la grossesse et chez l'enfant (déconseillée par l'EMA, ainsi qu'en cas d'antécédent hormonodépendant ou d'épilepsie).",
      },
      {
        plant: "Shatavari (Asparagus racemosus)",
        phase: "Phase A + B",
        temp: "50 °C",
        solvent: "Eau + phase glycérinée ou douce",
        target: "Soutien du Yin féminin, hydratation des muqueuses et apaisement des sécheresses",
        vigilance: "Avis médical requis en cas d'antécédent hormonodépendant (seins, utérus) ou d'allergie aux asparagacées.",
      },
      {
        plant: "Maca (Lepidium meyenii)",
        phase: "Phase B (Racine)",
        temp: "50 °C",
        solvent: "Eau tiède / support nutritif",
        target: "Tonus global, vitalité et soutien de la libido sans apporter d'hormones exogènes",
        vigilance: "Demander un avis médical en cas d'hypertension non contrôlée ou de pathologie thyroïdienne.",
      },
      {
        plant: "Rhodiola (Rhodiola rosea)",
        phase: "Phase A",
        temp: "55 °C",
        solvent: "Eau pure",
        target: "Brouillard cérébral (brain fog), fatigue mentale et tolérance au stress (axe HPA)",
        vigilance: "Prudence le soir (légèrement stimulante) et en cas de trouble bipolaire ou traitement ISRS.",
      },
      {
        plant: "Romarin (Rosmarinus officinalis)",
        phase: "Extrait à froid / Phase A douce",
        temp: "25–45 °C",
        solvent: "Eau ou macération hydro-glycérinée",
        target: "Clarté cognitive, mémoire de travail et protection antioxydante cérébrale",
        vigilance: "Prudence en cas d'hypertension sévère ou d'obstruction des voies biliaires.",
      },
    ],
    m4TipTitle: "Conseil BloomLab · Sauge officinale, thuyone et maîtrise de la dose (EMA)",
    m4TipText:
      "L'eau ne supprime pas la thuyone : selon l'EMA (Agence Européenne des Médicaments), environ 17,6 % de la thuyone passent dans 150 ml d'eau chaude. La quantité exacte dépend de la sauge utilisée et peut dépasser la limite de 6 mg/jour. Par mesure de sécurité, l'usage oral est limité à 2 semaines maximum et l'exposition doit être minimisée pendant la grossesse et chez l'enfant (non recommandée par l'EMA ; éviter également les huiles essentielles concentrées).",
    m4SafetyText:
      "Précaution essentielle : toute plante à action phyto-oestrogénique ou modulatrice endocrinienne (Sauge, Shatavari) nécessite l'avis préalable de votre médecin en cas d'antécédent personnel ou familial de cancer hormonodépendant ou de traitement hormonal substitutif.",
    m4CtaProtocols: "Découvrir le Reset Homéostasique & Dosages",
    m4CtaCommunity: "Poser une question à ALMA",

    // CONCLUSION
    concTitle: "La femme n'est pas un homme comme les autres : BloomLab comme traducteur biologique",
    concP1:
      "Sa biologie est une symphonie cyclique : elle renouvelle le sang chaque mois, orchestre une tolérance immunitaire et une plasticité cérébrale hors normes pour donner la vie, traverse l'hiver hormonal du post-partum puis transmute son énergie vers la sagesse de la ménopause. En croisant le Manuscrit de Voynich, les voix de Trotula et d'Hildegarde de Bingen avec l'endocrinologie contemporaine, chaque étape cesse d'être une faiblesse pour redevenir une invitation à s'accorder sur le rythme du vivant.",
    concP2:
      "La BloomLab intervient ici comme un traducteur de précision : en maîtrisant l'extraction des crocines du safran à 40 °C, des tanins de l'alchémille à 70 °C ou des feuilles de sauge correctement dosées à 65 °C dans le respect des repères EMA, elle met entre vos mains un savoir botanique clair, mesuré et reproductible.",
    concCtaMachine: "Découvrir l'extracteur BloomLab®",
    concCtaProtocols: "Parcourir les Protocoles Systémiques",
    concCtaAlma: "Échanger avec ALMA",
  },

  en: {
    metaTitle: "The Cyclical and Sacred Power of Women | Bloom Academy",
    metaDescription:
      "Open-access Bloom Academy dossier: Voynich manuscript, Trotula, fertilization biology, postpartum hormonal drop, menopause neurobiology & BloomLab botanical extracts.",
    breadcrumbSection: "Feminine Cycles & Biology",
    breadcrumbTitle: "The Cyclical and Sacred Power of Women",
    kicker: "Bloom Academy · Open Access Dossier · Medical History, Neurobiology & Ethnobotany",
    heroTitle: "The Cyclical and Sacred Power of Women",
    heroSubtitle:
      "From forgotten medieval manuscripts to modern neurobiology: reconnecting women with their biological rhythm across fertility, postpartum recovery, and menopausal wisdom.",
    heroQuote:
      "“Your body is not broken by its cycles; it conducts a luminous, immunological, and neurological symphony of remarkable intelligence.”",
    heroCaption:
      "Fig. 1 — Illuminated lunar-cycle botanical manuscript, Lady's Mantle (Alchemilla vulgaris), garden sage, and gentle amber saffron infusion.",
    eduNoticeTitle: "Educational Purpose & Medical Guidance",
    eduNoticeText:
      "This dossier is strictly educational and historical. It does not provide medical diagnosis or prescriptions and never replaces qualified medical, obstetric, or psychological care—especially during pregnancy, breastfeeding, postpartum recovery, or ongoing medication.",
    tocTitle: "Dossier Contents",
    tocItems: [
      { id: "module-1", label: "01 · Forbidden Manuscripts & Voynich" },
      { id: "module-2", label: "02 · Alchemy of Conception" },
      { id: "module-3", label: "03 · Postpartum Hormonal Cliff" },
      { id: "module-4", label: "04 · Perimenopause & Menopause Wisdom" },
      { id: "conclusion", label: "05 · Synthesis & BloomLab" },
    ],
    moduleCards: [
      {
        id: "module-1",
        number: "Module 01",
        title: "Forbidden Manuscripts",
        subtitle: "Voynich, Trotula, Hildegard, Ayurveda & TCM",
        keyFocus: "Chronopharmacology & porphyrin ring",
      },
      {
        id: "module-2",
        number: "Module 02",
        title: "Alchemy of Conception",
        subtitle: "Fertilization, immune tolerance & Mommy Brain",
        keyFocus: "Calcium wave & maternal neuroplasticity",
      },
      {
        id: "module-3",
        number: "Module 03",
        title: "Postpartum: Biological Winter",
        subtitle: "Hormonal cliff, pregnenolone steal & PPD",
        keyFocus: "Saffron 40°C, Ashwagandha & Nettle",
      },
      {
        id: "module-4",
        number: "Module 04",
        title: "Menopause & Passage to Wisdom",
        subtitle: "Perimenopause, neurochemistry & Wise Woman",
        keyFocus: "Dose-controlled Sage (EMA thujone limit), Shatavari, Maca & Rhodiola",
      },
    ],
    m1Tag: "Module 01 · Forgotten Lore & Ethnobotany",
    m1H2: "Hidden History: When Science and the Sacred Were One",
    m1Objective:
      "Objective: Dismantle ancient taboos and restore the female body as a coherent biological and cosmic sanctuary.",
    m1Intro:
      "For centuries, institutional medicine reduced women's bodies to erratic reproductive machinery. Yet older texts—dismissed as heretical or indecipherable—tell a radically different story of harmony with lunar light, plant chemistry, and seasonal renewal.",
    m1VoynichTitle: "1. The Voynich Manuscript (MS 408): The “Tuning Fork” Hypothesis",
    m1VoynichLead:
      "Filled with unidentified flora and women bathing in interconnected botanical basins, the 15th-century MS 408 may not be gibberish. Recent 2026 Tuning Fork research frames it as a chronopharmacology manual linking diurnal/nocturnal light cycles to feminine physiology.",
    m1VoynichBullets: [
      {
        title: "Diurnal vs. nocturnal balance (Yin / Yang)",
        text: "Pairing daytime photosynthetic states and nighttime regenerative plant biochemistry with cyclical phases.",
      },
      {
        title: "The porphyrin chemical bridge (Mg / Fe)",
        text: "Chlorophyll (capturing light via Magnesium) and hemoglobin (carrying oxygen via Iron) share the exact same molecular core: the porphyrin ring.",
      },
      {
        title: "Hormones as light-linked messengers",
        text: "Governed by the pineal-hypothalamic axis, female hormones translate environmental rhythm into cellular timing.",
      },
    ],
    m1TrotulaTitle: "2. Trotula of Salerno (11th Century): Erased Feminine Voices",
    m1TrotulaText:
      "At Europe's first medical school in Salerno, Trotula authored candid texts written by women for women on menstruation, fertility, pain, and pleasure—later heavily rewritten by male scribes to erase her female authorship.",
    m1HildegardTitle: "3. Hildegard of Bingen (12th Century): The Sacred Purge",
    m1HildegardText:
      "In Causae et Curae, Hildegard rejected dogma calling menstrual blood impure, framing it as a lunar metabolic renewal and prescribing Lady's Mantle (Alchemilla vulgaris) for gentle astringent tone.",
    m1SecretTitle: "Nature's Secret: A Monthly Metabolic Reset",
    m1SecretText:
      "Menstruation is not a mechanical inconvenience; it is a built-in monthly vascular and endometrial renewal cycle.",
    m1TraditionsTitle: "4. Ayurveda & Traditional Chinese Medicine: Agni and Jing",
    m1TraditionsText:
      "Ayurveda links cyclical flow to balanced metabolic fire (Agni) and blood tissue (Rakta), while TCM ties Chong Mai (“Sea of Blood”) to Kidney Jing essence.",
    m1TipTitle: "BloomLab Tip · Lady's Mantle Precision Extraction",
    m1TipText:
      "Use Phase A (pure filtered water) at 70 °C for 15–20 minutes under gentle vortex agitation to extract Alchemilla's regulating tannins and flavonoids without harsh bitterness.",
    m1CtaProtocols: "Explore Solvents & Temperatures Guide",
    m1CtaCommunity: "Ask ALMA a question",

    m2Tag: "Module 02 · Neurobiology & Immunology of Conception",
    m2H2: "The Alchemy of Conception: What Truly Happens in the Body",
    m2Objective:
      "Objective: Understand fertilization as a coordinated electrical, immunological, and neuroplastic transformation.",
    m2GalaxyTitle: "1. Clash of Galaxies: Fertilization & the Calcium Wave",
    m2GalaxyText:
      "Sperm-oocyte fusion triggers an immediate electric calcium wave across the egg, sealing the membrane against polyspermy and activating embryonic genome transcription.",
    m2ImmuneTitle: "2. The Immune Tolerance Miracle of Implantation",
    m2ImmuneText:
      "Because half of the embryo's DNA is paternal, the maternal immune system actively shifts toward local Treg and specialized uterine NK tolerance under progesterone guidance rather than rejecting the embryo.",
    m2ImmuneNatureLink:
      "Botanical parallel: Like plant roots welcoming beneficial mycorrhizal fungi while keeping pathogens out.",
    m2BrainTitle: "3. “Mommy Brain”: Targeted MRI-Proven Neuroplasticity",
    m2BrainText:
      "Longitudinal MRI studies show pregnancy prunes redundant pathways to amplify social cognition, empathy, threat-vigilance, and intuitive bonding networks.",
    m2BioShifts: [
      { metric: "+40 to +50%", detail: "Maternal blood volume expansion supporting placental perfusion." },
      { metric: "Treg / uNK Shift", detail: "Active progesterone-mediated immune tolerance at the uterine interface." },
      { metric: "MRI Neuroplasticity", detail: "Long-term maternal brain specialization for empathy and hyper-vigilance." },
    ],
    m2TipTitle: "BloomLab Tip · Strict Pregnancy Precaution",
    m2TipText:
      "Pregnancy requires strict medical oversight before taking any active herb. Only mild nutritional infusions approved by your doctor or midwife—such as gentle Nettle leaf in Phase A at 70 °C—should ever be considered.",
    m2CtaProtocols: "Browse Botanical Safety Monographs",
    m2CtaCommunity: "Discuss safety questions with ALMA",

    m3Tag: "Module 03 · The Great Oversight & Biological Winter",
    m3H2: "After Birth: Postpartum, Baby Blues & Depression",
    m3Objective:
      "Objective: Remove guilt from new mothers by explaining the neuro-endocrine shock of childbirth.",
    m3WinterMetaphor:
      "Core Metaphor: Postpartum is a biological winter—society expects summer energy while the body endures the steepest hormone withdrawal in human physiology.",
    m3CliffTitle: "1. The Hormonal Cliff (24–48 Hours Post-Delivery)",
    m3CliffText:
      "Expelling the placenta causes estrogen and progesterone to plummet overnight—an abrupt withdrawal akin to instantaneous menopause.",
    m3CliffSymptoms:
      "Baby blues (days 3–14): sudden crying spells, heightened sensitivity, night sweats, chills, exhaustion, and an empty physical sensation.",
    m3DppTitle: "2. Postpartum Depression, Oxytocin & Cortisol",
    m3DppText:
      "Lasting beyond two weeks with deep anxiety or disconnection, PPD reflects neurochemistry—not a lack of maternal love. Loss of calming progesterone metabolites leaves GABA circuits exposed while sleep loss keeps cortisol elevated.",
    m3StealTitle: "3. “Pregnenolone Steal”",
    m3StealText:
      "Pregnenolone is the master precursor for both mood/sex hormones and stress cortisol. Severe sleep deprivation diverts pregnenolone into cortisol survival synthesis, depleting mood reserves.",
    m3ProtocolTitle: "Educational BloomLab Protocol · Postpartum Support Kit",
    m3BotanicalCaption:
      "Fig. 2 — Saffron, garden sage, ashwagandha root, nettle leaf, and rosemary calibrated for aqueous & gentle temperature extraction.",
    m3Plants: [
      {
        plant: "Saffron (Crocus sativus)",
        phase: "Cold extract or Phase A",
        temp: "20–40 °C",
        solvent: "Pure water",
        target: "Mood & serotonin balance (30 mg/day documented extract equivalence in clinical literature)",
        vigilance: "Consult a physician if breastfeeding or taking SSRIs.",
      },
      {
        plant: "Ashwagandha",
        phase: "Phase B (Root)",
        temp: "50 °C",
        solvent: "Gentle aqueous/lipid phase",
        target: "Adrenal resilience & cortisol buffering",
        vigilance: "Avoid in pregnancy; medical guidance required during breastfeeding or thyroid conditions.",
      },
      {
        plant: "Nettle (Urtica dioica)",
        phase: "Phase A (Leaves)",
        temp: "70 °C",
        solvent: "Pure filtered water",
        target: "Remineralization, chlorophyll (porphyrin ring) & iron reserve support",
        vigilance: "Caution in renal/cardiac edema or iron overload.",
      },
    ],
    m3TipTitle: "BloomLab Tip · Protecting Saffron Crocin & Safranal at 40 °C",
    m3TipText:
      "Boiling water destroys delicate saffron carotenoids. Run Phase A at 40 °C or cold vortex infusion in BloomLab to preserve active aromatic compounds.",
    m3SafetyTitle: "Postpartum Medical Safety Reminder",
    m3SafetyText:
      "If sadness, panic, or disconnection persists past 14 days, seek immediate support from your physician or midwife. Botanicals never replace medical or psychological treatment.",
    m3CtaProtocols: "View HPA Axis & Recovery Protocols",
    m3CtaCommunity: "Consult ALMA on postpartum questions",

    m4Tag: "Module 04 · Hormonal Transition & Emergence of the Wise Woman",
    m4H2: "The Transition: Understanding Hormonal Decline & Its Impacts",
    m4Objective:
      "Objective: Reframe menopause from an ending into a neurological and social metamorphosis.",
    m4PeriTitle: "1. Perimenopause: The Rollercoaster Years",
    m4PeriText:
      "Hormones do not drop smoothly; erratic FSH surges and sharp estrogen swings trigger irregular cycles, mood shifts, 3 a.m. waking, and brain fog.",
    m4MenoTitle: "2. Menopause: From Blood to Qi",
    m4MenoTcm:
      "In TCM, menopause shifts vital essence from reproductive Blood to Heart Qi and Shen wisdom.",
    m4NeuroTitle: "Neurobiological shifts",
    m4NeuroText:
      "Estrogen regulates serotonin and dopamine signaling; its decline directly affects thermoregulation, mood, motivation, and working memory.",
    m4PhysicalTitle: "Key physical transitions:",
    m4PhysicalList: [
      "Hot flashes & night sweats from hypothalamic thermostat recalibration.",
      "Vaginal and skin mucosal dryness due to reduced estrogenic hydration.",
      "Abdominal metabolic shift and insulin sensitivity changes.",
      "Bone mineral density remodeling requiring weight-bearing movement and micronutrients.",
    ],
    m4StealRecall:
      "Chronic stress (pregnenolone steal) worsens hot flashes and fatigue as adrenals struggle to provide secondary hormonal precursors.",
    m4SageTitle: "3. The New Power: From Mother to Wise Woman",
    m4SageText:
      "Evolutionarily rare among mammals, human menopause unlocks decades of post-reproductive leadership, memory stewardship, and creative clarity.",
    m4ProtocolTitle: "Educational BloomLab Protocol · Transition Shield",
    m4Plants: [
      {
        plant: "Garden Sage (Salvia officinalis)",
        phase: "Phase A only",
        temp: "65–70 °C",
        solvent: "Pure water (strictly dosed)",
        target: "Hot flashes & night sweats (rosmarinic acid & mild phytoestrogens)",
        vigilance: "Water does not eliminate thujone: approximately 17.6% of thujone passes into 150 ml of hot water (EMA). The actual amount depends on the sage used and can exceed the 6 mg/day limit; oral use is limited to 2 weeks and must be minimized during pregnancy and in children (not recommended per EMA monograph, nor in hormone-dependent history or epilepsy).",
      },
      {
        plant: "Shatavari",
        phase: "Phase A + B",
        temp: "50 °C",
        solvent: "Water + gentle glycerine phase",
        target: "Female Yin nourishment & mucosal hydration",
        vigilance: "Seek medical advice if hormone-dependent medical history exists.",
      },
      {
        plant: "Maca (Lepidium meyenii)",
        phase: "Phase B",
        temp: "50 °C",
        solvent: "Warm aqueous base",
        target: "Vitality & libido support without exogenous hormones",
        vigilance: "Medical check if severe hypertension or thyroid disorder.",
      },
      {
        plant: "Rhodiola rosea",
        phase: "Phase A",
        temp: "55 °C",
        solvent: "Pure water",
        target: "Brain fog, mental stamina & stress adaptation",
        vigilance: "Take in morning; caution with SSRIs or bipolar spectrum.",
      },
      {
        plant: "Rosemary",
        phase: "Cold extract / gentle Phase A",
        temp: "25–45 °C",
        solvent: "Water / glycerine",
        target: "Cognitive clarity & antioxidant support",
        vigilance: "Caution in biliary obstruction or severe hypertension.",
      },
    ],
    m4TipTitle: "BloomLab Tip · Garden Sage, Thujone & Dose Control (EMA)",
    m4TipText:
      "Water does not eliminate thujone: per the EMA (European Medicines Agency), approximately 17.6% of plant thujone passes into 150 ml of hot water. Actual intake depends on the sage used and may exceed the 6 mg/day limit; oral use is therefore limited to 2 weeks maximum, and exposure must be minimized during pregnancy and in children (not recommended per EMA monograph; avoid concentrated essential oils).",
    m4SafetyText:
      "Always consult your doctor before using phytoestrogenic plants (Sage, Shatavari) if you have a personal or family history of hormone-sensitive conditions.",
    m4CtaProtocols: "Explore Homeostatic Reset Protocols",
    m4CtaCommunity: "Ask ALMA about menopausal care",

    concTitle: "Women Are Not Small Men: BloomLab as a Biological Translator",
    concP1:
      "From monthly renewal and pregnancy neuroplasticity to postpartum winter and menopausal wisdom, female physiology is an ever-evolving dialogue with light and plants.",
    concP2:
      "BloomLab translates these herbal monographs into reproducible temperature-controlled infusions—40 °C saffron, 65 °C dose-controlled sage (within EMA thujone limits), 70 °C lady's mantle.",
    concCtaMachine: "Discover BloomLab®",
    concCtaProtocols: "Browse Systemic Protocols",
    concCtaAlma: "Chat with ALMA",
  },

  de: {
    metaTitle: "Die Zyklische und Heilige Kraft der Frau | Bloom Academy",
    metaDescription:
      "Freies Bloom Academy Dossier: Voynich-Manuskript, Trotula, Befruchtungsbiologie, postpartaler Hormonabfall, Menopause und präzise BloomLab-Pflanzenextrakte.",
    breadcrumbSection: "Weibliche Zyklen & Biologie",
    breadcrumbTitle: "Die Zyklische und Heilige Kraft der Frau",
    kicker: "Bloom Academy · Freier Zugang · Medizingeschichte, Neurobiologie & Ethnobotanik",
    heroTitle: "Die Zyklische und Heilige Kraft der Frau",
    heroSubtitle:
      "Von vergessenen mittelalterlichen Manuskripten bis zur modernen Neurobiologie: die Rückverbindung der Frau mit ihrem biologischen Rhythmus von der Empfängnis über das Wochenbett bis in die Weisheit der Menopause.",
    heroQuote:
      "„Ihr Körper ist durch seine Zyklen nicht defekt – er dirigiert eine lichtgesteuerte, immunologische und neuronale Partitur von höchster Intelligenz.“",
    heroCaption:
      "Abb. 1 — Botanisches Mondzyklus-Manuskript, Frauenmantel (Alchemilla vulgaris), Gartensalbei und schonender Safran-Aufguss.",
    eduNoticeTitle: "Bildungsauftrag & ärztliche Begleitung",
    eduNoticeText:
      "Dieses Dossier dient ausschließlich der historischen und wissenschaftlichen Weiterbildung. Es stellt keine Diagnose oder Therapieempfehlung dar und ersetzt niemals eine ärztliche, geburtshilfliche oder psychologische Betreuung.",
    tocTitle: "Inhaltsverzeichnis",
    tocItems: [
      { id: "module-1", label: "01 · Verbotene Manuskripte & Voynich" },
      { id: "module-2", label: "02 · Alchemie der Empfängnis" },
      { id: "module-3", label: "03 · Wochenbett & Hormonabfall" },
      { id: "module-4", label: "04 · Perimenopause & Weisheit" },
      { id: "conclusion", label: "05 · Fazit & BloomLab" },
    ],
    moduleCards: [
      {
        id: "module-1",
        number: "Modul 01",
        title: "Verbotene Manuskripte",
        subtitle: "Voynich, Trotula, Hildegard, Ayurveda & TCM",
        keyFocus: "Chronopharmakologie & Porphyrinring",
      },
      {
        id: "module-2",
        number: "Modul 02",
        title: "Alchemie der Empfängnis",
        subtitle: "Befruchtung, Immuntoleranz & Mommy Brain",
        keyFocus: "Kalziumwelle & Neuroplastizität",
      },
      {
        id: "module-3",
        number: "Modul 03",
        title: "Wochenbett: Biologischer Winter",
        subtitle: "Hormonabfall, Pregnenolon-Raub & PPD",
        keyFocus: "Safran 40°C, Ashwagandha & Brennnessel",
      },
      {
        id: "module-4",
        number: "Modul 04",
        title: "Menopause & Wandel zur Weisheit",
        subtitle: "Perimenopause, Neurochemie & Weise Frau",
        keyFocus: "Dosierter Salbei (EMA-Thujonlimit), Shatavari & Maca",
      },
    ],
    m1Tag: "Modul 01 · Vergessenes Wissen & Ethnobotanik",
    m1H2: "Verborgene Geschichte: Als Wissenschaft und Heiliges vereint waren",
    m1Objective:
      "Ziel: Tabus auflösen und den weiblichen Körper als biologisches und kosmisches Heiligtum würdigen.",
    m1Intro:
      "Jahrhundertelang reduzierte die etablierte Medizin den Frauenkörper auf eine fehleranfällige Fortpflanzungsmaschine. Ältere Schriften zeigen jedoch ein ganz anderes Bild: einen Körper im Einklang mit Mondphasen, Lichtzyklen und Pflanzenkräften.",
    m1VoynichTitle: "1. Das Voynich-Manuskript (MS 408): Die „Stimmgabel-Hypothese“",
    m1VoynichLead:
      "Neue Forschungsansätze (Tuning Fork Hypothesis, 2026) deuten das berühmte Manuskript des 15. Jahrhunderts als chronopharmakologisches Handbuch über Tag-Nacht-Zyklen von Pflanzen und weiblicher Physiologie.",
    m1VoynichBullets: [
      {
        title: "Tag-/Nacht-Polarität (Yin / Yang)",
        text: "Vergleich zwischen solarer Tagessynthese und nächtlicher Regeneration der Pflanzen.",
      },
      {
        title: "Der Porphyrin-Brückenschlag (Mg / Fe)",
        text: "Chlorophyll (mit Magnesium) und menschliches Hämoglobin (mit Eisen) besitzen exakt dieselbe Porphyrinring-Grundstruktur.",
      },
      {
        title: "Hormone als Licht- und Chemieboten",
        text: "Gesteuert über die Epiphysen-Hypothalamus-Achse synchronisieren Hormone Umweltlicht mit Zellrhythmen.",
      },
    ],
    m1TrotulaTitle: "2. Trotula von Salerno (11. Jh.): Zum Schweigen gebracht",
    m1TrotulaText:
      "An Europas ältester Medizinschule verfasste Trotula tabufreie Schriften von Frauen für Frauen – später von männlichen Kopisten stark umgeschrieben.",
    m1HildegardTitle: "3. Hildegard von Bingen (12. Jh.): Heilige Reinigung",
    m1HildegardText:
      "In Causae et Curae beschrieb Hildegard die Menstruation als monatliche Mond-Reinigung und empfahl Frauenmantel (Alchemilla vulgaris).",
    m1SecretTitle: "Geheimnis der Natur: Ein monatlicher Stoffwechsel-Reset",
    m1SecretText:
      "Jeder Zyklus erneuert vaskuläre und endometriale Gewebe für einen frischen Neubeginn.",
    m1TraditionsTitle: "4. Ayurveda & TCM: Agni und Jing",
    m1TraditionsText:
      "Ayurveda verbindet den Zyklus mit Verdauungsfeuer (Agni) und Blutgewebe (Rakta), die TCM mit der Nierenessenz (Jing) und dem Chong-Mai-Gefäß.",
    m1TipTitle: "BloomLab-Tipp · Frauenmantel schonend bei 70 °C extrahieren",
    m1TipText:
      "Phase A mit reinem Wasser bei 70 °C für 15–20 Minuten löst regulierende Gerbstoffe und Flavonoide ohne übermäßige Bitterkeit.",
    m1CtaProtocols: "Lösungsmittel- & Temperatur-Guide öffnen",
    m1CtaCommunity: "ALMA eine Frage stellen",

    m2Tag: "Modul 02 · Neurobiologie & Immunologie der Empfängnis",
    m2H2: "Die Alchemie der Empfängnis: Was im Körper wirklich geschieht",
    m2Objective:
      "Ziel: Befruchtung als elektrisches, immunologisches und neuroplastisches Wunder verstehen.",
    m2GalaxyTitle: "1. Kollision der Galaxien: Die Kalziumwelle",
    m2GalaxyText:
      "Bei der Verschmelzung durchläuft eine elektrische Kalziumwelle die Eizelle, verschließt die Hülle und aktiviert das neue Genom.",
    m2ImmuneTitle: "2. Das Wunder der Immuntoleranz",
    m2ImmuneText:
      "Da 50 % der embryonalen DNA väterlich sind, schaltet Progesteron lokale Treg- und uNK-Zellen auf aktiven Schutz statt Abstoßung.",
    m2ImmuneNatureLink:
      "Naturparallele: Wie eine Pflanzenwurzel nützliche Bodenpilze einlädt und Pathogene abwehrt.",
    m2BrainTitle: "3. „Mommy Brain“: MRT-bewiesene Neuroplastizität",
    m2BrainText:
      "Moderne Bildgebung zeigt gezielte synaptische Umstrukturierung zugunsten von Empathie, Wachsamkeit und intuitiver Bindung.",
    m2BioShifts: [
      { metric: "+40 bis +50 %", detail: "Anstieg des mütterlichen Blutvolumens." },
      { metric: "Treg / uNK Balance", detail: "Aktive progesterongesteuerte Immuntoleranz." },
      { metric: "MRT-Neuroplastizität", detail: "Langfristige Spezialisierung sozial-emotionaler Hirnareale." },
    ],
    m2TipTitle: "BloomLab-Tipp · Strenge Vorsicht in der Schwangerschaft",
    m2TipText:
      "Jede Pflanzenanwendung in der Schwangerschaft bedarf ärztlicher oder hebammenkundlicher Freigabe (z. B. milde Brennnessel Phase A bei 70 °C).",
    m2CtaProtocols: "Botanische Sicherheitsprofile ansehen",
    m2CtaCommunity: "Sicherheit mit ALMA besprechen",

    m3Tag: "Modul 03 · Das große Vergessen & Biologischer Winter",
    m3H2: "Das Danach: Wochenbett, Baby Blues und Postpartale Depression",
    m3Objective:
      "Ziel: Mütter entlasten und den neuroendokrinen Schock nach der Geburt präzise erklären.",
    m3WinterMetaphor:
      "Leitmetapher: Das Wochenbett ist ein biologischer Winter – der Körper erlebt den steilsten Hormonentzug des Lebens.",
    m3CliffTitle: "1. Die Hormonklippe (24–48 Stunden nach der Geburt)",
    m3CliffText:
      "Mit der Plazenta brechen Östrogen und Progesteron schlagartig ein – vergleichbar mit einer sofortigen Menopause.",
    m3CliffSymptoms:
      "Baby Blues (Tage 3–14): Tränenwellen, Reizbarkeit, Nachtschweiß, Frösteln, tiefe Erschöpfung.",
    m3DppTitle: "2. Postpartale Depression (PPD), Oxytocin & Cortisol",
    m3DppText:
      "Hält die Krise länger als zwei Wochen an, liegt eine neurochemische Dysbalance vor (fehlende GABA-beruhigende Progesteron-Metaboliten, hohes Schlafmangel-Cortisol) – niemals mangelnde Liebe.",
    m3StealTitle: "3. Der „Pregnenolon-Raub“ (Pregnenolone Steal)",
    m3StealText:
      "Dauerstress leitet das Mutterhormon Pregnenolon vorrangig in die Cortisol-Synthese um – es fehlt Rohstoff für Sexual- und Stimmungshormone.",
    m3ProtocolTitle: "BloomLab-Bildungsprotokoll · Unterstützung nach der Geburt",
    m3BotanicalCaption:
      "Abb. 2 — Safran, Salbei, Ashwagandha-Wurzel, Brennnessel und Rosmarin für präzise Temperaturextraktion.",
    m3Plants: [
      {
        plant: "Safran (Crocus sativus)",
        phase: "Kaltextrakt oder Phase A",
        temp: "20–40 °C",
        solvent: "Reines Wasser",
        target: "Stimmungsbalance & Serotonin (30 mg/Tag Studienäquivalent)",
        vigilance: "Ärztliche Rücksprache bei Stillzeit oder SSRI-Einnahme.",
      },
      {
        plant: "Ashwagandha",
        phase: "Phase B (Wurzel)",
        temp: "50 °C",
        solvent: "Sanfte Wasser-/Lipidphase",
        target: "Nebennieren-Resilienz & Cortisolregulation",
        vigilance: "Nicht in der Schwangerschaft; ärztlicher Rat bei Stillzeit/Schilddrüse.",
      },
      {
        plant: "Brennnessel (Urtica dioica)",
        phase: "Phase A (Blätter)",
        temp: "70 °C",
        solvent: "Reines Wasser",
        target: "Remineralisierung, Chlorophyll & Unterstützung der Eisenreserven",
        vigilance: "Vorsicht bei Nieren-/Herzödemen oder Eisenüberladung.",
      },
    ],
    m3TipTitle: "BloomLab-Tipp · Crocin & Safranal bei 40 °C schützen",
    m3TipText:
      "Kochendes Wasser zerstört empfindliche Safran-Wirkstoffe. Phase A bei 40 °C im BloomLab bewahrt das gesamte Aromaspektrum.",
    m3SafetyTitle: "Wichtiger Sicherheitshinweis im Wochenbett",
    m3SafetyText:
      "Dauern Traurigkeit, Angst oder innere Leere länger als 14 Tage an, wenden Sie sich umgehend an Ärztin, Hebamme oder psychologische Fachberatung.",
    m3CtaProtocols: "HPA-Achse & Regenerationsprotokolle",
    m3CtaCommunity: "ALMA befragen",

    m4Tag: "Modul 04 · Hormonwandel & Übergang zur Weisen Frau",
    m4H2: "Der Übergang: Hormonabfall und seine Auswirkungen verstehen",
    m4Objective:
      "Ziel: Die Menopause nicht als Verlust, sondern als bewusste Transformation begreifen.",
    m4PeriTitle: "1. Perimenopause: Das fruchtbare Chaos",
    m4PeriText:
      "Hormone sinken nicht linear, sondern schwanken stark: FSH-Spitzen, Östrogen-Achterbahnen, unregelmäßige Zyklen, Schlafstörungen und Brain Fog.",
    m4MenoTitle: "2. Menopause: Vom Blut zum Qi",
    m4MenoTcm:
      "In der TCM verlagert sich die Energie vom reproduktiven Blut hin zu Herz-Qi und geistiger Klarheit.",
    m4NeuroTitle: "Neurobiologische Veränderungen",
    m4NeuroText:
      "Östrogene stützen Serotonin und Dopamin – ihr Rückgang beeinflusst Temperaturzentrum, Stimmung und Motivation.",
    m4PhysicalTitle: "Körperliche Schwerpunkte:",
    m4PhysicalList: [
      "Hitzewallungen & Nachtschweiß durch Anpassung des Hypothalamus.",
      "Trockenheit von Haut und Schleimhäuten.",
      "Veränderte Fettverteilung & Insulinsensitivität.",
      "Knochendichte-Umbau (Krafttraining & Mikronährstoffe).",
    ],
    m4StealRecall:
      "Chronischer Stress verstärkt durch den Pregnenolon-Raub Hitzewallungen und Erschöpfung.",
    m4SageTitle: "3. Neue Kraft: Von der Mutter zur Weisen Frau",
    m4SageText:
      "Evolutionär einzigartig eröffnet die Menopause eine Ära der Weitergabe, Intuition und schöpferischen Führung.",
    m4ProtocolTitle: "BloomLab-Bildungsprotokoll · Schutzschild im Wandel",
    m4Plants: [
      {
        plant: "Salbei (Salvia officinalis)",
        phase: "Nur Phase A",
        temp: "65–70 °C",
        solvent: "Reines Wasser (streng dosiert)",
        target: "Hitzewallungen & Nachtschweiß",
        vigilance: "Wasser entfernt Thujon nicht: Etwa 17,6 % des Thujons gehen in 150 ml heißes Wasser über (EMA). Die Menge hängt vom verwendeten Salbei ab und kann das Limit von 6 mg/Tag überschreiten; orale Anwendung auf 2 Wochen begrenzen und in Schwangerschaft sowie bei Kindern minimieren (laut EMA nicht empfohlen; nicht bei hormonabhängigen Tumoren).",
      },
      {
        plant: "Shatavari",
        phase: "Phase A + B",
        temp: "50 °C",
        solvent: "Wasser + milde Glycerinphase",
        target: "Weibliches Yin & Schleimhautfeuchtigkeit",
        vigilance: "Ärztlicher Rat bei hormonabhängiger Vorgeschichte.",
      },
      {
        plant: "Maca",
        phase: "Phase B",
        temp: "50 °C",
        solvent: "Warme Wasserbasis",
        target: "Energie & Vitalität ohne exogene Hormone",
        vigilance: "Vorsicht bei schwerem Bluthochdruck.",
      },
      {
        plant: "Rhodiola rosea",
        phase: "Phase A",
        temp: "55 °C",
        solvent: "Reines Wasser",
        target: "Brain Fog & mentale Belastbarkeit",
        vigilance: "Morgens einnehmen; Vorsicht mit SSRIs.",
      },
      {
        plant: "Rosmarin",
        phase: "Kaltextrakt / sanfte Phase A",
        temp: "25–45 °C",
        solvent: "Wasser / Glycerin",
        target: "Gedächtnis & kognitive Klarheit",
        vigilance: "Vorsicht bei Gallengangsproblemen.",
      },
    ],
    m4TipTitle: "BloomLab-Tipp · Salbei, Thujon und Dosierungssicherheit (EMA)",
    m4TipText:
      "Wasser entfernt Thujon nicht: Laut EMA gehen rund 17,6 % des Thujons in 150 ml heißes Wasser über. Die tatsächliche Menge hängt vom verwendeten Salbei ab und kann das Tageslimit von 6 mg/Tag überschreiten. Die orale Anwendung ist auf maximal 2 Wochen zu begrenzen und die Exposition in der Schwangerschaft sowie bei Kindern zu minimieren (laut EMA-Monografie nicht empfohlen; konzentrierte ätherische Öle meiden).",
    m4SafetyText:
      "Bei hormonabhängigen Vorerkrankungen (Brust, Gebärmutter) vor Anwendung phytoöstrogener Pflanzen stets ärztlichen Rat einholen.",
    m4CtaProtocols: "Homöostatischen Reset entdecken",
    m4CtaCommunity: "ALMA fragen",

    concTitle: "Frauen sind keine kleinen Männer: BloomLab als biologischer Übersetzer",
    concP1:
      "Von der monatlichen Erneuerung über Schwangerschaft und Wochenbett bis zur Weisheit der Menopause bleibt die weibliche Biologie ein lebendiger Zyklus.",
    concP2:
      "BloomLab übersetzt überliefertes Wissen durch gradgenaue Extraktion (40 °C Safran, 65 °C streng dosierter Salbei gemäß EMA, 70 °C Frauenmantel) in eine reproduzierbare Alltagspraxis.",
    concCtaMachine: "BloomLab® entdecken",
    concCtaProtocols: "Systemische Protokolle",
    concCtaAlma: "Mit ALMA sprechen",
  },
};
