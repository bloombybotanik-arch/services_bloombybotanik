export type LexiqueTermKey =
  | 'totum'
  | 'sequencage-ab'
  | 'hydrosoluble'
  | 'thermolabile'
  | 'polyphenols'
  | 'emonctoires'
  | 'charge-allostatique'
  | 'homeostasie'
  | 'adaptogene'
  | 'synergie'
  | 'terroir'
  | 'xenohormese';

export interface LexiqueLinkedPage {
  title: string;
  url: string;
  view?: string;
}

export interface LexiqueEntry {
  slug: LexiqueTermKey;
  terme: string;
  tooltip: string; // Stricte contrainte : <= 140 caractères
  definitionNovice: string;
  metaphore: string;
  niveauPreuve: 1 | 2 | 3 | 4 | 5;
  references: string;
  linkedPages: LexiqueLinkedPage[];
}

export const lexique: Record<LexiqueTermKey, LexiqueEntry> = {
  totum: {
    slug: 'totum',
    terme: 'Totum végétal',
    tooltip: "L’ensemble synergique des molécules actives d’une plante entière, bien plus puissant et équilibré qu’un principe actif isolé en laboratoire.",
    definitionNovice: "Le totum désigne l’intégralité des molécules actives, cofacteurs et minéraux naturellement présents dans la plante, préservés sans aucune altération.",
    metaphore: "Un orchestre symphonique au grand complet où chaque musicien soutient l'harmonie, plutôt qu'un instrumentiste jouant en solitaire.",
    niveauPreuve: 5,
    references: "Pharmacopée Européenne ; Schulz et al., Rational Phytotherapy (Springer) ; Verpoorte et al. (2005)",
    linkedPages: [
      { title: "Comprendre le Totum végétal", url: "/totum-vegetal/", view: "totum-vegetal" },
      { title: "Extraction Botanique de pointe", url: "/extraction-botanique/", view: "extraction-botanique" },
      { title: "L'extracteur BloomLab", url: "/produit/bloomlab/", view: "machine" }
    ]
  },

  'sequencage-ab': {
    slug: 'sequencage-ab',
    terme: 'Séquençage A/B',
    tooltip: "Procédé en 2 étapes dissociant l’extraction des molécules fragiles (A) et denses (B) pour préserver l’intégrité totale des principes actifs.",
    definitionNovice: "Méthode d'extraction chronologique séparant les composés thermosensibles à basse température des principes actifs plus résistants nécessitant plus d'énergie.",
    metaphore: "Comme cuisiner un mets délicat en ajoutant les herbes aromatiques à la fin pour ne pas détruire leurs parfums subtils à feu vif.",
    niveauPreuve: 4,
    references: "Brevet & Procédé d'extraction fractionnée BloomLab ; Principes de phytochimie cinétique",
    linkedPages: [
      { title: "L'extracteur BloomLab", url: "/produit/bloomlab/", view: "machine" },
      { title: "Méthode d'infusion de précision", url: "/infusion-precision/", view: "infusion-precision" },
      { title: "Extraction Botanique", url: "/extraction-botanique/", view: "extraction-botanique" }
    ]
  },

  hydrosoluble: {
    slug: 'hydrosoluble',
    terme: 'Hydrosoluble',
    tooltip: "Qualifie un composé végétal capable de se dissoudre dans l’eau pour être immédiatement assimilé par les tissus et les fluides corporels.",
    definitionNovice: "Caractérise les principes actifs botaniques (comme les tanins, flavonoïdes ou acides phénoliques) qui se dissolvent dans l'eau et agissent rapidement.",
    metaphore: "Un cristal qui fond instantanément dans une eau pure pour diffuser harmonieusement son énergie dans tout le liquide.",
    niveauPreuve: 5,
    references: "Bruneton, Pharmacognosie (Lavoisier) ; Principes de phytochimie et solvants d'extraction",
    linkedPages: [
      { title: "Solvants d'extraction végétale", url: "/solvants-extraction/", view: "solvants-extraction" },
      { title: "Infusion botanique maison", url: "/infusion-botanique-maison-comment-ca-marche/", view: "infusion-botanique" },
      { title: "L'Herbier médicinal", url: "/herbier/", view: "herbier" }
    ]
  },

  thermolabile: {
    slug: 'thermolabile',
    terme: 'Thermolabile',
    tooltip: "Principe actif végétal délicat dénaturé ou détruit sous l’effet d’une chaleur excessive, exigeant une extraction douce sous 45°C.",
    definitionNovice: "Désigne une substance végétale fragile dont les propriétés thérapeutiques ou aromatiques sont irrémédiablement perdues au-delà d'un certain seuil thermique.",
    metaphore: "Une sculpture de givre aux détails ciselés qui perd ses contours et sa pureté dès qu'on l'approche trop près d'une flamme.",
    niveauPreuve: 5,
    references: "Journal of Agricultural and Food Chemistry ; Deville et al., Thermal degradation of plant volatiles",
    linkedPages: [
      { title: "Infusion de précision à froid & tiède", url: "/infusion-precision/", view: "infusion-precision" },
      { title: "L'extracteur BloomLab", url: "/produit/bloomlab/", view: "machine" },
      { title: "Extraction Botanique", url: "/extraction-botanique/", view: "extraction-botanique" }
    ]
  },

  polyphenols: {
    slug: 'polyphenols',
    terme: 'Polyphénols',
    tooltip: "Puissants antioxydants naturels sécrétés par les plantes pour se défendre, protégeant nos cellules contre l’oxydation et le vieillissement.",
    definitionNovice: "Grande famille de micronutriments protecteurs d’origine végétale qui neutralisent les radicaux libres et soutiennent la vitalité cellulaire.",
    metaphore: "Le bouclier protecteur d'une forteresse, repoussant sans relâche les assauts corrosifs du temps et des agressions extérieures.",
    niveauPreuve: 5,
    references: "Manach et al., Polyphenols: food sources and bioavailability (Am J Clin Nutr) ; EFSA Scientific Opinions",
    linkedPages: [
      { title: "Gastronomie Botanique", url: "/gastronomie-botanique/", view: "culinaire" },
      { title: "Cosmétique Botanique", url: "/cosmetique-botanique/", view: "cosmetiques" },
      { title: "L'Herbier des plantes riches en polyphénols", url: "/herbier/", view: "herbier" }
    ]
  },

  emonctoires: {
    slug: 'emonctoires',
    terme: 'Émonctoires',
    tooltip: "Organes d’élimination naturels (foie, reins, peau, poumons, intestins) évacuant les toxines et résidus métaboliques hors de l’organisme.",
    definitionNovice: "Les cinq voies physiologiques majeures par lesquelles notre corps filtre, neutralise et expulse en continu les déchets métaboliques et toxiques.",
    metaphore: "Le réseau d'épuration et de recyclage haute précision d'une cité moderne, garantissant la pureté et la santé de ses artères.",
    niveauPreuve: 4,
    references: "Physiologie médicale de Guyton & Hall ; Vander, Physiologie humaine : mécanismes et fonctions",
    linkedPages: [
      { title: "Le Protocole Reset Homéostatique", url: "/phytotherapie-reset/", view: "phytotherapie-reset" },
      { title: "Comprendre son Terrain biologique", url: "/terrain/", view: "terrain" },
      { title: "Les plantes de drainage", url: "/herbier/", view: "herbier" }
    ]
  },

  'charge-allostatique': {
    slug: 'charge-allostatique',
    terme: 'Charge allostatique',
    tooltip: "Usure physiologique cumulative subie par le corps lorsqu’il est soumis à un stress chronique sans temps de récupération suffisant.",
    definitionNovice: "Le coût biologique et l'épuisement cellulaire provoqués par une adaptation permanente à des tensions physiques, émotionnelles ou environnementales.",
    metaphore: "Un ressort d'acier bandé au maximum pendant des mois sans répit, finissant par perdre son élasticité naturelle originelle.",
    niveauPreuve: 5,
    references: "McEwen, Protective and damaging effects of stress mediators (NEJM 1998) ; Sterling & Eyer",
    linkedPages: [
      { title: "Le Protocole Reset Homéostatique", url: "/phytotherapie-reset/", view: "phytotherapie-reset" },
      { title: "Plantes Adaptogènes", url: "/plantes-adaptogenes/", view: "plantes-adaptogenes" },
      { title: "Diagnostic de Terrain", url: "/terrain/", view: "terrain" }
    ]
  },

  homeostasie: {
    slug: 'homeostasie',
    terme: 'Homéostasie',
    tooltip: "Capacité innée de l’organisme à maintenir son équilibre interne vital (pH, température, glycémie) malgré les fluctuations extérieures.",
    definitionNovice: "L'état d'équilibre biologique dynamique que recherche constamment chaque cellule de votre corps pour fonctionner à son plein potentiel.",
    metaphore: "Le système de pilotage gyroscopique d'un navire de haute mer, rectifiant sans cesse son cap face aux vagues et aux bourrasques.",
    niveauPreuve: 5,
    references: "Cannon, The Wisdom of the Body (1932) ; Bernard, Introduction à l’étude de la médecine expérimentale",
    linkedPages: [
      { title: "Le Reset Homéostatique", url: "/phytotherapie-reset/", view: "phytotherapie-reset" },
      { title: "Le Manifeste Bloom", url: "/manifeste/", view: "manifeste" },
      { title: "Les 8 Terrains Biologiques", url: "/terrain/", view: "terrain" }
    ]
  },

  adaptogene: {
    slug: 'adaptogene',
    terme: 'Plante adaptogène',
    tooltip: "Plante maîtresse qui régule la résistance globale de l’organisme au stress en modulant l’axe surrénalien sans effet excitant ni sédatif.",
    definitionNovice: "Une plante d'exception capable de normaliser les fonctions corporelles, stimulant ce qui est affaibli et apaisant ce qui est suractivé.",
    metaphore: "Un thermostat intelligent qui chauffe la maison lorsqu'il fait trop froid et déclenche la brise fraîche dès que l'air s'échauffe.",
    niveauPreuve: 5,
    references: "Panossian & Wikman, Effects of Adaptogens on the Central Nervous System (Pharmaceuticals) ; Brekhman (1968)",
    linkedPages: [
      { title: "Guide des Plantes Adaptogènes", url: "/plantes-adaptogenes/", view: "plantes-adaptogenes" },
      { title: "Le Protocole Reset", url: "/phytotherapie-reset/", view: "phytotherapie-reset" },
      { title: "Boutique des synergies de plantes", url: "/boutique/", view: "boutique" }
    ]
  },

  synergie: {
    slug: 'synergie',
    terme: 'Synergie d’action',
    tooltip: "Interaction de plusieurs composés botaniques dont l’effet combiné dépasse la simple somme de leurs effets pris individuellement.",
    definitionNovice: "Le phénomène remarquable où deux ou plusieurs molécules végétales décuplent mutuellement leur efficacité et atténuent leurs éventuels effets indésirables.",
    metaphore: "Deux alpinistes encordés gravissant une paroi escarpée ensemble, atteignant un sommet inaccessible en solitaire.",
    niveauPreuve: 5,
    references: "Wagner & Ulrich-Merzenich, Synergy research: approaching a new generation of phytopharmaceuticals (Phytomedicine)",
    linkedPages: [
      { title: "Totum végétal et synergie", url: "/totum-vegetal/", view: "totum-vegetal" },
      { title: "L'art de l'extraction végétale", url: "/extraction-botanique/", view: "extraction-botanique" },
      { title: "Les synergies en Boutique", url: "/boutique/", view: "boutique" }
    ]
  },

  terroir: {
    slug: 'terroir',
    terme: 'Terroir botanique',
    tooltip: "Alchimie unique entre sol, climat, altitude et savoir-faire conférant à chaque récolte de plantes sa signature biochimique singulière.",
    definitionNovice: "L'empreinte géographique et écologique qui dicte la concentration et la variété des principes actifs d'une plante médicinale sauvage ou cultivée.",
    metaphore: "L'accent inimitable d'une terre natale, façonné par le souffle des vents, la minéralité des sols et les rayons du soleil.",
    niveauPreuve: 4,
    references: "INRAE & CNRS : Métabolomique environnementale et chémotypes des plantes aromatiques et médicinales",
    linkedPages: [
      { title: "La démarche Bloom & nos producteurs", url: "/la-marque/", view: "la-marque" },
      { title: "L'Herbier vivant", url: "/herbier/", view: "herbier" },
      { title: "Le Manifeste", url: "/manifeste/", view: "manifeste" }
    ]
  },

  xenohormese: {
    slug: 'xenohormese',
    terme: 'Xénohormèse',
    tooltip: "Bénéfice cellulaire obtenu par l’humain en consommant les molécules de défense produites par des plantes exposées à un stress naturel.",
    definitionNovice: "Principe selon lequel les signaux de résistance produits par des plantes résilientes activent nos propres mécanismes de longévité et de réparation.",
    metaphore: "Recevoir le carnet de survie d'un explorateur aguerri, qui apprend à votre organisme à surmonter les tempêtes intérieures.",
    niveauPreuve: 5,
    references: "Howitz & Sinclair, Xenohormesis: sensing the chemical cues of other species (Cell 2008) ; Nature Reviews Molecular Cell Biology",
    linkedPages: [
      { title: "Hormèse et résilience cellulaire", url: "/hormese/", view: "hormese" },
      { title: "Plantes Adaptogènes", url: "/plantes-adaptogenes/", view: "plantes-adaptogenes" },
      { title: "Le Protocole Reset Homéostatique", url: "/phytotherapie-reset/", view: "phytotherapie-reset" }
    ]
  }
};

export const lexiqueEntriesList = Object.values(lexique);
