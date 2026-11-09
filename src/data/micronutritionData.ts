import { NutrientCardData } from '../components/micronutrition/NutrientCard';
import { SourceItem } from '../components/micronutrition/SourceList';

export const GLOBAL_MICRONUTRITION_SOURCES: SourceItem[] = [
  {
    organisme_ou_revue: 'Union Européenne',
    titre: 'Règlement (CE) n° 1924/2006 concernant les allégations nutritionnelles et de santé portant sur les denrées alimentaires',
    date: '2006 (mis à jour régulièrement)',
    lien: 'https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=CELEX%3A32006R1924',
    date_de_consultation: '03/10/2026'
  },
  {
    organisme_ou_revue: 'EFSA',
    titre: 'Scientific Opinions on Dietary Reference Values and Nutrient Safety Limits',
    date: '2021-2025',
    lien: 'https://www.efsa.europa.eu/fr/topics/topic/dietary-reference-values',
    date_de_consultation: '03/10/2026'
  },
  {
    organisme_ou_revue: 'ANSES',
    titre: 'Compléments alimentaires : les recommandations pour limiter les risques',
    date: '2023-2025',
    lien: 'https://www.anses.fr/fr/content/complements-alimentaires',
    date_de_consultation: '03/10/2026'
  },
  {
    organisme_ou_revue: 'DGCCRF',
    titre: 'Réglementation et sécurité des compléments alimentaires en France',
    date: '2024',
    lien: 'https://www.economie.gouv.fr/dgccrf/complements-alimentaires',
    date_de_consultation: '03/10/2026'
  }
];

export const NUTRIENTS_DATA: NutrientCardData[] = [
  {
    id: 'magnesium',
    nom: 'Magnésium',
    sousTitre: 'Minéral essentiel intervenant dans plus de 300 réactions enzymatiques',
    evidenceLevel: 'Allégation autorisée',
    description_education: 'Minéral indispensable présent notamment dans les légumes verts à feuilles, les légumineuses, les graines oléagineuses et les céréales complètes. Les formes de sels disponibles (bisglycinate, citrate, malate, oxyde, chlorure) diffèrent par leur teneur en magnésium élémentaire et leur tolérance digestive.',
    sources_alimentaires: [
      'Graines de courge, lin et chia (300-500 mg / 100g)',
      'Oléagineux : amandes, noix du Brésil, noisettes (150-250 mg / 100g)',
      'Chocolat noir >70% et cacao pur',
      'Légumineuses : haricots noirs, pois chiches, lentilles',
      'Légumes à feuilles vertes (épinards, blettes)'
    ],
    allégations_autorisées: [
      'Le magnésium contribue à réduire la fatigue.',
      'Le magnésium contribue au fonctionnement normal du système nerveux.',
      'Le magnésium contribue à une fonction musculaire normale.',
      'Le magnésium contribue à un métabolisme énergétique normal.'
    ],
    critères_de_lecture: [
      'Vérifier la quantité de magnésium élémentaire réelle par portion (ex: 300 mg de sel ne font pas 300 mg de magnésium actif).',
      'Lire l\'ensemble de la liste des excipients.',
      'Ne pas considérer une forme comme universellement supérieure : la tolérance digestive varie selon chaque personne.',
      'Vérifier les pourcentages de Valeurs Nutritionnelles de Référence (VNR).'
    ],
    précautions: [
      'Un apport élevé en une prise unique peut induire un effet laxatif osmotique.',
      'Prudence stricte en cas d\'insuffisance rénale : l\'élimination rénale du magnésium est réduite, risque d\'hypermagnésémie.'
    ],
    interactions: [
      'Prendre à distance (2 heures) de certains antibiotiques (cyclines, quinolones) et des bisphosphonates.'
    ],
    quand_consulter: 'En cas de maladie rénale, de troubles du rythme cardiaque ou de traitements médicamenteux lourds.',
    sources: [
      {
        organisme_ou_revue: 'EFSA',
        titre: 'Scientific Opinion on Dietary Reference Values for magnesium',
        date: '2015',
        lien: 'https://efsa.onlinelibrary.wiley.com/doi/10.2903/j.efsa.2015.4186',
        date_de_consultation: '03/10/2026'
      }
    ],
    date_de_revue: '10/2026'
  },
  {
    id: 'vitamine-d',
    nom: 'Vitamine D',
    sousTitre: 'Hormone-vitamine liposoluble essentielle à l\'homéostasie calcique',
    evidenceLevel: 'Allégation autorisée',
    description_education: 'Vitamine liposoluble principalement synthétisée par l\'épiderme sous l\'action du rayonnement ultraviolet B (UVB) solaire, et apportée en moindre mesure par l\'alimentation (poissons gras, jaune d\'œuf, champignons exposés aux UV). Une situation individuelle ou géographique peut justifier un avis médical ou un dosage sanguin en 25(OH)D.',
    sources_alimentaires: [
      'Poissons gras : saumon, maquereau, hareng, sardines',
      'Huile de foie de morue',
      'Jaune d\'œuf fermier',
      'Champignons exposés aux UVB',
      'Produits laitiers ou boissons végétales enrichies'
    ],
    allégations_autorisées: [
      'La vitamine D contribue au fonctionnement normal du système immunitaire.',
      'La vitamine D contribue au maintien d\'une ossature et d\'une dentition normales.',
      'La vitamine D contribue à l\'absorption et à l\'utilisation normales du calcium et du phosphore.'
    ],
    critères_de_lecture: [
      'Vérifier la dose exprimée en microgrammes (µg) et en Unités Internationales (1 µg = 40 UI).',
      'Éviter les mégadoses quotidiennes prolongées sans bilan sanguin ou suivi professionnel.',
      'Prendre en compte les cumuls avec d\'autres compléments ou produits enrichis.'
    ],
    précautions: [
      'Risque de toxicité par accumulation (hypercalcémie, lithiase rénale) en cas d\'excès chronique.',
      'Ne jamais cumuler plusieurs compléments contenant de la vitamine D sans calcul global de dose.'
    ],
    interactions: [
      'Avis médical en cas d\'antécédent de calculs rénaux, sarcoïdose, insuffisance rénale ou traitement par diurétiques thiazidiques.'
    ],
    quand_consulter: 'En cas de doute sur son statut, avant toute cure à dose supérieure à 2000 UI/jour, ou lors de bilans sanguins anormaux.',
    sources: [
      {
        organisme_ou_revue: 'ANSES',
        titre: 'Vitamine D : besoins nutritionnels et risques liés aux surdosages',
        date: '2024',
        lien: 'https://www.anses.fr/fr/content/vitamine-d',
        date_de_consultation: '03/10/2026'
      }
    ],
    date_de_revue: '10/2026'
  },
  {
    id: 'vitamine-k',
    nom: 'Vitamine K',
    sousTitre: 'Famille de vitamines liposolubles impliquées dans la coagulation et le métabolisme osseux',
    evidenceLevel: 'Allégation autorisée',
    description_education: 'La vitamine K regroupe la phylloquinone (K1, abondante dans les légumes verts à feuilles) et les ménaquinones (K2, issues de fermentations comme le natto ou de produits animaux). Elle participe à l\'activation de protéines indispensables à la coagulation et à la fixation du calcium.',
    sources_alimentaires: [
      'Légumes à feuilles vertes : chou frisé, épinards, brocoli, persil (K1)',
      'Aliments fermentés : natto japonais (K2-MK7)',
      'Fromages affinés et jaunes d\'œufs (K2-MK4)',
      'Huiles végétales (colza, soja)'
    ],
    allégations_autorisées: [
      'La vitamine K contribue à une coagulation sanguine normale.',
      'La vitamine K contribue au maintien d\'une ossature normale.'
    ],
    critères_de_lecture: [
      'Indiquer clairement la forme (K1 ou K2, MK-4 ou MK-7) et la quantité exacte en microgrammes.',
      'Ne jamais faire de promesse de prévention cardiovasculaire ou de "débouchage artériel".',
      'Vérifier la compatibilité avec son régime alimentaire habituel.'
    ],
    précautions: [
      'CONTRE-INDICATION MAJEURE : Les personnes sous anticoagulants de type Antivitamines K (AVK, ex: warfarine, Coumadine, Sintrom, Previscan) doivent impérativement éviter toute supplémentation sans accord strict de leur médecin.'
    ],
    interactions: [
      'Antagonisme direct avec les anticoagulants AVK pouvant entraîner de graves accidents thrombotiques ou hémorragiques.'
    ],
    quand_consulter: 'Obligatoire dès qu\'un traitement fluidifiant ou anticoagulant est prescrit.',
    sources: [
      {
        organisme_ou_revue: 'EFSA',
        titre: 'Dietary Reference Values for vitamin K',
        date: '2017',
        lien: 'https://efsa.onlinelibrary.wiley.com/doi/10.2903/j.efsa.2017.4780',
        date_de_consultation: '03/10/2026'
      }
    ],
    date_de_revue: '10/2026'
  },
  {
    id: 'omega-3',
    nom: 'Oméga-3 Marins : EPA & DHA',
    sousTitre: 'Acides gras polyinsaturés à longue chaîne essentiels',
    evidenceLevel: 'Allégation autorisée',
    description_education: 'L\'acide eicosapentaénoïque (EPA) et l\'acide docosahexaénoïque (DHA) sont des acides gras fondamentaux naturellement concentrés dans les poissons gras marins et certaines micro-algues. Contrairement à l\'ALA végétal dont le taux de conversion en EPA/DHA est très faible, les formes marines apportent directement ces acides gras structurels.',
    sources_alimentaires: [
      'Petits poissons gras sauvages : maquereaux, sardines, anchois',
      'Saumon sauvage et hareng',
      'Huile de micro-algues (Schizochytrium sp.) pour les profils végétariens',
      'Fruits de mer et crustacés'
    ],
    allégations_autorisées: [
      'L\'EPA et le DHA contribuent à une fonction cardiaque normale (effet obtenu avec 250 mg/jour).',
      'Le DHA contribue au maintien d\'une fonction cérébrale normale (effet obtenu avec 250 mg/jour).',
      'Le DHA contribue au maintien d\'une vision normale (effet obtenu avec 250 mg/jour).'
    ],
    critères_de_lecture: [
      'Calculer les quantités séparées d\'EPA et de DHA, pas uniquement la quantité totale d\'huile.',
      'Comparer le coût réel par gramme d\'actif (EPA+DHA) et non le prix facial du flacon.',
      'Vérifier les indices d\'oxydation (Totox < 10) et la certification de pureté (métaux lourds, PCB).'
    ],
    précautions: [
      'Les oméga-3 ne doivent pas être présentés comme un traitement de substitution des pathologies cardiaques, de l\'inflammation ou de la dépression.',
      'Attention aux allergies connues au poisson et aux fruits de mer.'
    ],
    interactions: [
      'À forte dose (>2 g/jour), effet antiagrégant plaquettaire possible : prudence avec les anticoagulants et arrêt préalable avant chirurgie.'
    ],
    quand_consulter: 'Avant toute intervention chirurgicale programmée ou lors de la prise conjointe d\'anticoagulants.',
    sources: [
      {
        organisme_ou_revue: 'EFSA',
        titre: 'Scientific Opinion on the substantiation of health claims related to EPA and DHA',
        date: '2010',
        lien: 'https://efsa.onlinelibrary.wiley.com/doi/10.2903/j.efsa.2010.1796',
        date_de_consultation: '03/10/2026'
      }
    ],
    date_de_revue: '10/2026'
  },
  {
    id: 'zinc',
    nom: 'Zinc',
    sousTitre: 'Oligoélément ubiquitaire cofacteur de plus de 200 enzymes',
    evidenceLevel: 'Allégation autorisée',
    description_education: 'Oligoélément indispensable impliqué dans la division cellulaire, la réplication de l\'ADN et la physiologie immunitaire et cutanée. Bien présent dans les produits animaux et les légumineuses/graines (où son absorption peut être freinée par les phytates alimentaires).',
    sources_alimentaires: [
      'Huîtres et fruits de mer',
      'Viandes rouges et volailles',
      'Graines de courge, chanvre et sésame',
      'Légumineuses : lentilles, haricots, pois chiches',
      'Germe de blé et céréales complètes'
    ],
    allégations_autorisées: [
      'Le zinc contribue au fonctionnement normal du système immunitaire.',
      'Le zinc contribue à protéger les cellules contre le stress oxydatif.',
      'Le zinc contribue au maintien d\'une peau, de cheveux et d\'ongles normaux.'
    ],
    critères_de_lecture: [
      'Vérifier la quantité de zinc élémentaire apportée par portion.',
      'Éviter les supplémentations continues au long cours sans surveillance professionnelle.',
      'Privilégier des formes bien tolérées (gluconate, bisglycinate, picolinate).'
    ],
    précautions: [
      'Une supplémentation prolongée à forte dose (>15-20 mg/jour pendant des mois) peut induire un déficit secondaire en cuivre par compétition d\'absorption intestinale.'
    ],
    interactions: [
      'Prendre à distance de certains antibiotiques et des suppléments de fer ou de cuivre.'
    ],
    quand_consulter: 'En cas de cure prolongée de plus de 3 mois ou de troubles cutanés persistants.',
    sources: [
      {
        organisme_ou_revue: 'ANSES',
        titre: 'Avis relatif à l\'évaluation des apports en vitamines et minéraux des populations',
        date: '2021',
        lien: 'https://www.anses.fr',
        date_de_consultation: '03/10/2026'
      }
    ],
    date_de_revue: '10/2026'
  },
  {
    id: 'selenium',
    nom: 'Sélénium',
    sousTitre: 'Oligoélément antioxydant intégré aux sélénoprotéines',
    evidenceLevel: 'Allégation autorisée',
    description_education: 'Le sélénium est un oligoélément dont la teneur dans les aliments dépend étroitement de la composition des sols de culture. Il est incorporé dans des enzymes clés comme la glutathion peroxydase et les désiodases thyroïdiennes.',
    sources_alimentaires: [
      'Noix du Brésil (source très concentrée : 1 à 2 noix suffisent pour les besoins journaliers)',
      'Poissons et fruits de mer (thon, cabillaud)',
      'Viandes et œufs',
      'Céréales complètes selon les sols'
    ],
    allégations_autorisées: [
      'Le sélénium contribue à protéger les cellules contre le stress oxydatif.',
      'Le sélénium contribue au fonctionnement normal du système immunitaire.',
      'Le sélénium contribue à une fonction thyroïdienne normale.'
    ],
    critères_de_lecture: [
      'Vérifier le dosage exact (la marge entre apport adéquat et surdosage est étroite : limite de sécurité ~300 µg/j).',
      'Vérifier la forme (levure séléniée, sélénométhionine ou sélénite de sodium).'
    ],
    précautions: [
      'Ne pas cumuler plusieurs produits contenant du sélénium (multivitamines + formules peau/cheveux).',
      'Risque de sélénose (ongles cassants, alopécie, haleine aillée) en cas d\'excès chronique.'
    ],
    interactions: [
      'Avis médical impératif chez les personnes traitées pour des pathologies thyroïdiennes.'
    ],
    quand_consulter: 'En cas de traitement thyroïdien (Lévothyrox) ou d\'hypo/hyperthyroïdie diagnostiquée.',
    sources: [
      {
        organisme_ou_revue: 'EFSA',
        titre: 'Scientific Opinion on Dietary Reference Values for selenium',
        date: '2014',
        lien: 'https://efsa.onlinelibrary.wiley.com/doi/10.2903/j.efsa.2014.3846',
        date_de_consultation: '03/10/2026'
      }
    ],
    date_de_revue: '10/2026'
  },
  {
    id: 'vitamine-c',
    nom: 'Vitamine C (Acide Ascorbique)',
    sousTitre: 'Vitamine hydrosoluble antioxydante et cofacteur de la synthèse de collagène',
    evidenceLevel: 'Allégation autorisée',
    description_education: 'L\'être humain ne sait pas synthétiser la vitamine C, qui doit être apportée par l\'alimentation végétale fraîche. Les compléments existent sous forme synthétique (acide L-ascorbique), naturelle (acérola) ou formulée (liposomale, ascorbates). Aucune forme ne doit être abusivement promue comme médicalement miracle sans essai comparatif robuste.',
    sources_alimentaires: [
      'Poivrons rouges et jaunes crus',
      'Agrumes : citrons, oranges, pamplemousses',
      'Fruits rouges et cassis',
      'Kiwis et papaye',
      'Choux crus et persil frais'
    ],
    allégations_autorisées: [
      'La vitamine C contribue au fonctionnement normal du système immunitaire.',
      'La vitamine C contribue à protéger les cellules contre le stress oxydatif.',
      'La vitamine C contribue à la formation normale de collagène pour assurer la fonction normale des vaisseaux, des os, des cartilages et de la peau.'
    ],
    critères_de_lecture: [
      'Vérifier la dose par gélule ou comprimé (le taux d\'absorption intestinale sature au-delà de 200 à 500 mg en prise unique).',
      'Ne pas confondre la vitamine C avec des plantes adaptogènes comme la Rhodiola (qui ont leurs propres règles d\'usage).'
    ],
    précautions: [
      'Prudence chez les personnes prédisposées aux calculs rénaux d\'oxalate de calcium (l\'ascorbate peut se métaboliser en oxalate).',
      'Contre-indication en cas d\'hémochromatose (la vitamine C augmente l\'absorption du fer).'
    ],
    interactions: [
      'Prise de sang : de très fortes doses de vitamine C peuvent fausser certains tests de glycémie ou bilans biologiques.'
    ],
    quand_consulter: 'En cas d\'antécédent de lithiase rénale ou de surcharge en fer.',
    sources: [
      {
        organisme_ou_revue: 'EFSA',
        titre: 'Scientific Opinion on Dietary Reference Values for vitamin C',
        date: '2013',
        lien: 'https://efsa.onlinelibrary.wiley.com/doi/10.2903/j.efsa.2013.3418',
        date_de_consultation: '03/10/2026'
      }
    ],
    date_de_revue: '10/2026'
  },
  {
    id: 'vitamines-b',
    nom: 'Vitamines du Groupe B (Traitées Individuellement)',
    sousTitre: 'Ensemble de 8 vitamines hydrosolubles aux rôles physiologiques distincts',
    evidenceLevel: 'Allégation autorisée',
    description_education: 'Les vitamines B ne forment pas une entité uniforme : B1 (thiamine), B2 (riboflavine), B3 (niacine), B5 (acide pantothénique), B6 (pyridoxine), B8 (biotine), B9 (folates) et B12 (cobalamines) ont chacune des fonctions, apports de référence et seuils de tolérance spécifiques. La vitamine B12 nécessite une vigilance particulière chez les personnes végétaliennes et âgées.',
    sources_alimentaires: [
      'B1, B2, B3 : céréales complètes, légumineuses, levure de bière',
      'B6 : volailles, poissons, pommes de terre, bananes',
      'B9 : légumes verts à feuilles (folates), légumineuses, foie',
      'B12 : produits exclusivement d\'origine animale (viandes, poissons, œufs, produits laitiers) ou suppléments dédiés'
    ],
    allégations_autorisées: [
      'Les allégations doivent être employées pour chaque vitamine présente : ex. B6 et B12 contribuent au fonctionnement normal du système immunitaire et à la formation normale de globules rouges.',
      'Les folates (B9) contribuent à la croissance des tissus maternels durant la grossesse.'
    ],
    critères_de_lecture: [
      'Exiger l\'affichage détaillé de chaque vitamine B avec sa dose en mg ou µg et son % VNR.',
      'Ne pas prétendre que les formes "méthylées" sont obligatoires pour toute la population.',
      'Vérifier que la dose de B6 ne dépasse pas les limites de sécurité de l\'EFSA (12 mg/jour).'
    ],
    précautions: [
      'Éviter les prises prolongées de doses élevées de vitamine B6 en raison de risques prouvés de neuropathies sensitives périphériques réversibles.',
      'La prise de B9 (acide folique) à forte dose peut masquer les signes hématologiques d\'une carence sévère en vitamine B12.'
    ],
    interactions: [
      'Certains médicaments (metformine, inhibiteurs de la pompe à protons - IPP) réduisent l\'absorption de la vitamine B12.'
    ],
    quand_consulter: 'Avant toute grossesse (supplémentation périconceptionnelle en folates B9 sous prescription médicale) ou lors d\'un régime 100% végétal pour la B12.',
    sources: [
      {
        organisme_ou_revue: 'EFSA',
        titre: 'Scientific opinion on the tolerable upper intake level for vitamin B6',
        date: '2023',
        lien: 'https://efsa.onlinelibrary.wiley.com',
        date_de_consultation: '03/10/2026'
      }
    ],
    date_de_revue: '10/2026'
  },
  {
    id: 'substances-avancees',
    nom: 'Substances Spécialisées : NAC, Glycine, Choline',
    sousTitre: 'Composés azotés et acides aminés objets de recherches préliminaires',
    evidenceLevel: 'Données préliminaires',
    description_education: 'La N-Acétyl-Cystéine (NAC), la glycine et la choline sont des molécules actives ou métabolites étudiés dans divers cadres scientifiques. Elles ne doivent jamais être présentées comme des compléments de base universels, ni comme des traitements de "détoxification", de "réparation hépatique" ou de "cure métaux lourds".',
    sources_alimentaires: [
      'Choline : œufs (jaune), abats, soja, poisson',
      'Glycine : bouillons d\'os traditionnels, viandes, poissons, gélatine',
      'Cystéine (précurseur du NAC) : viandes, produits laitiers, ail, oignon'
    ],
    allégations_autorisées: [
      'La choline contribue à un métabolisme lipidique normal et au maintien d\'une fonction hépatique normale (uniquement pour les doses conformes au règlement CE n° 1924/2006).',
      'Aucune allégation de santé relative à la "détoxification" ou au "reset biologique" n\'est autorisée pour le NAC ou la glycine.'
    ],
    critères_de_lecture: [
      'Identifier clairement la substance et la quantité unitaire.',
      'Refuser tout produit promettant une chélation, une réparation cellulaire miraculeuse ou une guérison.',
      'Privilégier un avis médical préalable.'
    ],
    précautions: [
      'NAC : vigilance accrue en cas d\'asthme bronchique, d\'antécédents d\'ulcère gastro-duodénal et chez les femmes enceintes.',
      'Choline : les apports excessifs peuvent entraîner une odeur corporelle désagréable de poisson (triméthylaminurie) et des troubles digestifs.'
    ],
    interactions: [
      'NAC : interaction potentielle avec la nitroglycérine (dérivés nitrés) et les anticoagulants.',
      'Prendre conseil auprès d\'un pharmacien avant toute association médicamenteuse.'
    ],
    quand_consulter: 'Systématiquement avant d\'introduire ces substances, en particulier lors de maladies chroniques ou de polypathologies.',
    sources: [
      {
        organisme_ou_revue: 'ANSES',
        titre: 'Avis sur la sécurité d\'emploi de substances à but nutritionnel ou physiologique',
        date: '2022',
        lien: 'https://www.anses.fr',
        date_de_consultation: '03/10/2026'
      }
    ],
    date_de_revue: '10/2026'
  }
];

export const EVALUATION_CHECKLIST = [
  {
    title: "1. Le besoin est-il documenté ?",
    desc: "Par votre alimentation réelle, un motif clair discuté avec un professionnel ou un bilan biologique adapté, et non par une anxiété générale."
  },
  {
    title: "2. La quantité active est-elle clairement affichée ?",
    desc: "Vérifier la part de nutriment élémentaire (ex: magnésium actif vs poids total du sel) et les milligrammes d'EPA/DHA réels pour les oméga-3."
  },
  {
    title: "3. La forme moléculaire est-elle identifiée ?",
    desc: "Le produit indique-t-il explicitement le sel, l'isomère ou le vecteur sans jargon trompeur ?"
  },
  {
    title: "4. Existe-t-il des doublons cachés ?",
    desc: "Vérifier les apports cumulés entre vos différents compléments (vitamine D, zinc, sélénium, multivitamines) pour éviter tout dépassement des seuils de sécurité."
  },
  {
    title: "5. Avez-vous vérifié les contre-indications personnelles ?",
    desc: "Traitements réguliers, anticoagulants, pathologie rénale, thyroïdienne, grossesse, allaitement ou chirurgie programmée."
  },
  {
    title: "6. La traçabilité et le fabricant sont-ils transparents ?",
    desc: "Numéro de lot vérifiable, date de péremption, adresse du metteur sur le marché dans l'UE et conditions strictes de conservation."
  },
  {
    title: "7. L'allégation est-elle autorisée et sobre ?",
    desc: "Fuite devant toute promesse de guérison, détoxification, régulation hormonale magique ou traitement de maladie."
  }
];

export const FREQUENT_INTERACTIONS_DATA = [
  {
    category: "Médicaments Anticoagulants (AVK, Warfarine)",
    risks: "La vitamine K s'oppose directement à l'effet de ces médicaments. Les oméga-3 et le ginkgo à forte dose augmentent le risque hémorragique.",
    action: "Avis médical préalable impératif. Ne jamais modifier son régime en vitamine K sans contrôle de l'INR."
  },
  {
    category: "Traitements Thyroïdiens (Lévothyroxine)",
    risks: "Le fer, le calcium, le magnésium et le soja chélatent la molécule dans le tube digestif et diminuent fortement son absorption.",
    action: "Espacer d'au moins 2 à 4 heures la prise de tout complément minéral de votre hormone thyroïdienne."
  },
  {
    category: "Antibiotiques (Quinolones, Tétracyclines)",
    risks: "Les ions minéraux bivalents (magnésium, zinc, fer, calcium) forment des complexes insolubles avec ces antibiotiques.",
    action: "Décaler les prises d'au moins 2 à 3 heures."
  },
  {
    category: "Produits Adsorbants (Argiles, Charbon, Zéolithe)",
    risks: "Capacité d'adsorption physique non sélective dans le tractus digestif pouvant inactiver les contraceptifs oraux, médicaments vitaux et micronutriments.",
    action: "Espacer d'au moins 2 heures minimum (idéalement 3h) de TOUT médicament ou nutriment. Demander conseil en officine."
  },
  {
    category: "Antidiabétiques Oraux",
    risks: "Certaines substances ou extraits peuvent modifier la glycémie et potentialiser le risque d'hypoglycémie.",
    action: "Surveillance glycémique renforcée et avis du médecin traitant."
  }
];
