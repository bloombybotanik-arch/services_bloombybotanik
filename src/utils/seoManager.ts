import { VIEW_PATHS } from '../types';
import { blogPosts } from '../data/blogPosts';

interface SEOEntry {
  title: string;
  description: string;
  path?: string;
}

const HOME_TITLE = "Bloom by BotaniK | Extracteur Botanique de Précision & Infusion Végétale Maîtrisée";
const HOME_DESCRIPTION = "Bloom by BotaniK conçoit BloomLab®, l'extracteur et infuseur botanique de précision. Vortex cinétique et thermorégulation ±0,5°C pour extraire le Totum actif.";

const PRODUCT_SEO_MAP: Record<string, SEOEntry> = {
  bloomlab: {
    title: "BloomLab® Extracteur Botanique de Précision | Bloom by BotaniK",
    description: "Commandez l'extracteur et infuseur botanique BloomLab® de Bloom by BotaniK. Inox 304, vortex cinétique et thermorégulation ±0,5°C pour le Totum actif.",
    path: "/bloomlab/"
  },
  "pack-signature": {
    title: "Pack Signature BloomLab® + Trio Plantes | Bloom by BotaniK",
    description: "Pack Signature Bloom by BotaniK : l'extracteur BloomLab®, nos sélections de plantes médicinales bio et les protocoles d'extraction guidés.",
    path: "/boutique/pack-signature/"
  },
  "bundle-apothicaire": {
    title: "Trio Apothicaire | 3 Kits Plantes Bio | Bloom by BotaniK",
    description: "Trio Apothicaire par Bloom by BotaniK : formules botaniques calibrées pour BloomLab® (Sève Fondamentale, Nuit Profonde et Feu Digestif).",
    path: "/boutique/bundle-apothicaire/"
  },
  "kit-starter": {
    title: "Kit Sève Fondamentale | Plantes Bio | Bloom by BotaniK",
    description: "Kit Sève Fondamentale Bloom by BotaniK : ortie, romarin et cynorrhodon bio sélectionnés pour l'extraction végétale de précision sur BloomLab®.",
    path: "/boutique/kit-starter/"
  },
  "kit-nuit": {
    title: "Kit Nuit Profonde | Sommeil & Plantes Bio | Bloom by BotaniK",
    description: "Kit Nuit Profonde par Bloom by BotaniK : synergie de passiflore, mélisse et camomille matricaire bio calibrée pour l'extraction douce sur BloomLab®.",
    path: "/boutique/kit-nuit/"
  },
  "kit-digestion": {
    title: "Kit Feu Digestif | Confort & Plantes Bio | Bloom by BotaniK",
    description: "Kit Feu Digestif Bloom by BotaniK : fenouil doux, menthe poivrée et gentiane bio calibrés pour une extraction botanique de précision.",
    path: "/boutique/kit-digestion/"
  },
  "kit-articulaire": {
    title: "Kit Feu Articulaire | Mobilité & Plantes Bio | Bloom by BotaniK",
    description: "Kit Feu Articulaire par Bloom by BotaniK : harpagophytum, reine-des-prés et cassis bio sélectionnés pour préserver le Totum végétal.",
    path: "/boutique/kit-articulaire/"
  },
  "kit-hiver": {
    title: "Kit Bouclier Hivernal | Plantes Bio | Bloom by BotaniK",
    description: "Kit Bouclier Hivernal Bloom by BotaniK : échinacée pourpre, thym à linalol et sureau noir bio pour des infusions riches en polyphénols.",
    path: "/boutique/kit-hiver/"
  },
  "duo-argiles": {
    title: "Duo Argiles & Terres Rares | Purification | Bloom by BotaniK",
    description: "Duo Argiles Zéolithe-Bentonite Bloom by BotaniK : argiles surfines ventilées pour vos préparations d'herboristerie et soins du terrain.",
    path: "/boutique/duo-argiles/"
  },
  "abonnements-numeriques": {
    title: "Abonnements Numériques Bloom Académie & ALMA | Bloom by BotaniK",
    description: "Accédez aux protocoles systémiques complets, fiches d'extraction avancées et suivi personnalisé ALMA.",
    path: "/boutique/abonnements-numeriques/"
  }
};

const VIEW_SEO_MAP: Record<string, SEOEntry> = {
  home: {
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    path: "/"
  },
  indexbis: {
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    path: "/"
  },
  machine: {
    title: "BloomLab® Extracteur Botanique de Précision | Bloom by BotaniK",
    description: "La BloomLab® de Bloom by BotaniK est l'extracteur de plantes qui préserve le Totum végétal : thermorégulation ±0,5°C et vortex cinétique.",
    path: "/bloomlab/"
  },
  bloomlab: {
    title: "BloomLab® Extracteur Botanique de Précision | Bloom by BotaniK",
    description: "La BloomLab® de Bloom by BotaniK est l'extracteur de plantes qui préserve le Totum végétal : thermorégulation ±0,5°C et vortex cinétique.",
    path: "/bloomlab/"
  },
  'comment-ca-marche': {
    title: "Comment Ça Marche | Le Séquençage Actif BloomLab®",
    description: "Comprenez en 3 étapes le fonctionnement de la méthode Bloom by BotaniK : pesée des plantes, cycle thermique régulé et filtration prête à l'emploi.",
    path: "/comment-ca-marche/"
  },
  how_it_works: {
    title: "Comment Ça Marche | Le Séquençage Actif BloomLab®",
    description: "Comprenez en 3 étapes le fonctionnement de la méthode Bloom by BotaniK : pesée des plantes, cycle thermique régulé et filtration prête à l'emploi.",
    path: "/comment-ca-marche/"
  },
  guide: {
    title: "Infusion Botanique Maison : Guide Complet & Bienfaits | Bloom",
    description: "Découvrez l'art de l'infusion botanique de précision. Températures, solvants et recettes pour préserver le Totum végétal et booster vos bienfaits.",
    path: "/infusion-botanique/"
  },
  'infusion-botanique': {
    title: "Infusion Botanique Maison | Principes Actifs & Méthode",
    description: "Comprendre la dynamique d'infusion en chambre close : seuils thermiques maîtrisés, agitation douce et protection des flavonoïdes thermosensibles.",
    path: "/infusion-botanique-maison-comment-ca-marche/"
  },
  'infusion-botanique-maison-comment-ca-marche': {
    title: "Infusion Botanique Maison | Principes Actifs & Méthode",
    description: "Comprendre la dynamique d'infusion en chambre close : seuils thermiques maîtrisés, agitation douce et protection des flavonoïdes thermosensibles.",
    path: "/infusion-botanique-maison-comment-ca-marche/"
  },
  'pillar-extraction': {
    title: "Extraction Botanique : Méthodes & Séquençage A/B | Bloom",
    description: "Maîtrisez l'extraction végétale : macération, infusion, séquençage A/B. Découvrez comment la BloomLab préserve les principes actifs.",
    path: "/extraction-botanique/"
  },
  'extraction-botanique': {
    title: "Extraction Botanique : Méthodes & Séquençage A/B | Bloom",
    description: "Maîtrisez l'extraction végétale : macération, infusion, séquençage A/B. Découvrez comment la BloomLab préserve les principes actifs.",
    path: "/extraction-botanique/"
  },
  'guide-solvants': {
    title: "Guide des Solvants d'Extraction : Eau, Huile, Alcool | Bloom",
    description: "Eau, huile végétale, alcool, glycérine : comprenez la polarité et les affinités de chaque solvant pour libérer le Totum Végétal et maîtriser vos extractions botaniques.",
    path: "/guide-solvants/"
  },
  'guide-complet': {
    title: "Extraction Botanique : Méthodes & Séquençage A/B | Bloom",
    description: "Maîtrisez l'extraction végétale : macération, infusion, séquençage A/B. Découvrez comment la BloomLab préserve les principes actifs.",
    path: "/extraction-botanique/"
  },
  'guide-complet-extraction-botanique-maison': {
    title: "Extraction Botanique : Méthodes & Séquençage A/B | Bloom",
    description: "Maîtrisez l'extraction végétale : macération, infusion, séquençage A/B. Découvrez comment la BloomLab préserve les principes actifs.",
    path: "/extraction-botanique/"
  },
  'huile-infusee': {
    title: "Huiles Infusées Maison | Guide Macération Végétale | Bloom",
    description: "Guide pratique des huiles infusées : sélection des huiles végétales bio, température de macération à 45°C et extraction des principes actifs liposolubles.",
    path: "/huile-infusee/"
  },
  'teinture-mere': {
    title: "Teinture-Mère Maison | Guide Extraits Hydroalcooliques | Bloom",
    description: "Fabrication de teintures mères maison : ratios 1:5, choix des titres alcooliques et extraction dynamique par vortex cinétique.",
    path: "/teinture-mere/"
  },
  academie: {
    title: "Académie Bloom | Comprendre le Terrain & la Physiologie",
    description: "Explorez l'Académie Bloom : architectures du vivant, terrains biologiques, axe neuro-endocrinien et méthodologie d'accordage saisonnier.",
    path: "/academie/"
  },
  'comment-lire-modele-bloom': {
    title: "Comprendre le Modèle Bloom | Lecture Systémique du Terrain",
    description: "Découvrez la méthodologie Bloom by BotaniK : comment lire les 4 architectures, les 7 terrains et les 9 axes pour soutenir l'homéostasie.",
    path: "/academie/comprendre-le-modele-bloom/"
  },
  'women-academy': {
    title: "Le Pouvoir Cyclique et Sacré de la Femme | Bloom Academy",
    description: "Dossier en accès libre : manuscrit de Voynich, Trotula, biologie de la fécondation, chute hormonale du post-partum, ménopause et plantes d'extraction BloomLab.",
    path: "/academie/pouvoir-cyclique-femme/"
  },
  '4-architectures': {
    title: "Les 4 Architectures du Vivant | Académie Bloom",
    description: "Comprendre les 4 architectures fonctionnelles du corps humain et leur équilibre dynamique au sein de l'Académie Bloom by BotaniK.",
    path: "/academie/comprendre-le-corps/4-architectures/"
  },
  '7-terrains': {
    title: "Les 7 Terrains Biologiques | Cartographie Bloom by BotaniK",
    description: "Explorez les 7 terrains biologiques en phytothérapie systémique et adaptez votre accompagnement végétal.",
    path: "/academie/comprendre-le-corps/7-terrains/"
  },
  terrain: {
    title: "Les 7 Terrains Biologiques | Cartographie Bloom by BotaniK",
    description: "Explorez les 7 terrains biologiques en phytothérapie systémique et adaptez votre accompagnement végétal.",
    path: "/academie/comprendre-le-corps/7-terrains/"
  },
  '9-axes': {
    title: "Les 9 Axes Systémiques (A1 à A9) | Académie Bloom",
    description: "Analyse des 9 axes de régulation du terrain (émonctoires, mitochondries, neuro-endocrinien, glymphatique) dans l'approche Bloom.",
    path: "/academie/comprendre-le-corps/9-axes-historiques/"
  },
  'neuf-axes-historiques': {
    title: "Les 9 Axes Systémiques (A1 à A9) | Académie Bloom",
    description: "Analyse des 9 axes de régulation du terrain (émonctoires, mitochondries, neuro-endocrinien, glymphatique) dans l'approche Bloom.",
    path: "/academie/comprendre-le-corps/9-axes-historiques/"
  },
  'charge-allostatique': {
    title: "Charge Allostatique & Exposome | Académie Bloom by BotaniK",
    description: "Comprendre la charge allostatique et l'exposome : comment les facteurs cumulatifs verrouillent le terrain et comment soutenir le retour à l'équilibre.",
    path: "/academie/comprendre-le-corps/charge-allostatique/"
  },
  'metabolisme-insuline': {
    title: "Métabolisme Glucidique & Insuline | Académie Bloom",
    description: "Sensibilité à l'insuline, glycation et flexibilité métabolique : comprendre le levier glucidique et les plantes d'accompagnement.",
    path: "/academie/comprendre-le-corps/metabolisme-glucidique-insuline/"
  },
  'module-0': {
    title: "Module 0 : Le Choc de Paradigme | Académie Bloom",
    description: "Passer de l'approche symptomatique à l'ingénierie du terrain et au reset homéostatique avec la méthode Bloom by BotaniK.",
    path: "/academie/choc-de-paradigme/"
  },
  'axe-a1': {
    title: "Axe A1 : Émonctoires & Élimination | Académie Bloom",
    description: "Soutenir les voies d'élimination (foie, reins, intestin, peau, poumons) en amont de toute stratégie botanique de fond.",
    path: "/academie/axes/a1-emonctoires/"
  },
  'phytotherapie-reset': {
    title: "Reset Homéostasique : Protocoles de Drainage & Terrain | Bloom",
    description: "Libérez vos émonctoires et réactivez votre pharmacie intérieure. Découvrez nos protocoles de phytothérapie de précision pour un drainage profond.",
    path: "/academie/reset-homeostasique/"
  },
  'reset-homeostasique': {
    title: "Reset Homéostasique : Protocoles de Drainage & Terrain | Bloom",
    description: "Libérez vos émonctoires et réactivez votre pharmacie intérieure. Découvrez nos protocoles de phytothérapie de précision pour un drainage profond.",
    path: "/academie/reset-homeostasique/"
  },
  'protocole-psoriasis': {
    title: "Protocole Psoriasis | Reset Terrain Cutané | Bloom by BotaniK",
    description: "Protocole complet d'accompagnement du terrain cutané par la phytothérapie intégrale et l'extraction botanique de précision.",
    path: "/academie/protocoles/psoriasis/"
  },
  'protocole-sibo': {
    title: "Protocole SIBO & Équilibre Intestinal | Bloom by BotaniK",
    description: "Approche systémique du terrain digestif et de la motilité intestinale par extraction botanique de précision et séquençage A/B.",
    path: "/academie/protocoles/sibo/"
  },
  'protocole-myeline': {
    title: "Protocole Clarté Mentale & Myéline | Bloom by BotaniK",
    description: "Soutenir le système glymphatique, la neuroprotection et la clarté cognitive grâce aux synergies végétales extraites sur BloomLab®.",
    path: "/academie/protocoles/clarte-mentale/"
  },
  'protocole-decalcification-pineale': {
    title: "Protocole Glande Pinéale & Rythme Circadien | Bloom",
    description: "Accompagner la vitalité neuro-endocrinienne et le cycle mélatonine/sommeil profond par l'extraction botanique maîtrisée.",
    path: "/academie/protocoles/decalcification-pineale/"
  },
  herbier: {
    title: "Herbier Médicinal Interactif | Monographies & Dosages | Bloom",
    description: "Consultez les fiches détaillées de nos plantes médicinales : principes actifs majeurs, parties utilisées, températures d'extraction et précautions d'emploi.",
    path: "/academie/herbier/"
  },
  library: {
    title: "Herbier Médicinal Interactif | Monographies & Dosages | Bloom",
    description: "Consultez les fiches détaillées de nos plantes médicinales : principes actifs majeurs, parties utilisées, températures d'extraction et précautions d'emploi.",
    path: "/academie/herbier/"
  },
  herbarium: {
    title: "Herbier Médicinal Interactif | Monographies & Dosages | Bloom",
    description: "Consultez les fiches détaillées de nos plantes médicinales : principes actifs majeurs, parties utilisées, températures d'extraction et précautions d'emploi.",
    path: "/academie/herbier/"
  },
  bibliotheque: {
    title: "Bibliothèque de Savoirs & Protocoles | Académie Bloom",
    description: "Retrouvez l'ensemble des ressources pédagogiques de l'Académie : dossiers de physiologie, fiches d'extraction et guides de terrain.",
    path: "/academie/bibliotheque/"
  },
  'library-landing': {
    title: "Bibliothèque de Savoirs & Protocoles | Académie Bloom",
    description: "Retrouvez l'ensemble des ressources pédagogiques de l'Académie : dossiers de physiologie, fiches d'extraction et guides de terrain.",
    path: "/academie/bibliotheque/"
  },
  protocoles: {
    title: "Protocoles Systémiques Ciblés | Académie Bloom",
    description: "Parcourez nos protocoles d'accompagnement par terrain : digestion, immunité, axe nerveux, sommeil et récupération cellulaire.",
    path: "/academie/protocoles/"
  },
  boutique: {
    title: "Boutique Bloom by BotaniK | BloomLab® & Plantes Bio",
    description: "Boutique officielle Bloom by BotaniK : commandez l'extracteur BloomLab®, nos formules de plantes médicinales bio, filtres et accessoires maison.",
    path: "/boutique/"
  },
  'boutique-kits': {
    title: "Kits Plantes Médicinales Bio | Bloom by BotaniK",
    description: "Kits de plantes bio Bloom by BotaniK sélectionnés pour le sommeil, la digestion ou l'immunité. Prêts à être extraits avec l'appareil BloomLab®.",
    path: "/boutique/kits/"
  },
  abonnement: {
    title: "Abonnement Bloom by BotaniK | Protocoles & Suivi ALMA",
    description: "Abonnement Bloom by BotaniK : accédez aux protocoles de reset homéostatique, au suivi d'anamnèse ALMA et aux formules d'extraction BloomLab®.",
    path: "/abonnement/"
  },
  manifeste: {
    title: "Manifeste Bloom | Souveraineté Sanitaire & Plantes",
    description: "Manifeste Bloom by BotaniK : souveraineté sanitaire, ingénierie biologique et réconciliation entre rigueur scientifique et sagesse végétale ancestrale.",
    path: "/manifeste/"
  },
  'la-marque': {
    title: "La Marque Bloom by BotaniK | Terroirs & Exigence",
    description: "Découvrez l'histoire de Bloom by BotaniK : sélection rigoureuse des plantes brutes, conception française des protocoles et transparence scientifique.",
    path: "/la-marque/"
  },
  'questions-frequentes': {
    title: "FAQ Extracteur Botanique | Questions Fréquentes | Bloom",
    description: "Foire aux questions BloomLab® : garanties, entretien de l'inox 304, protocoles d'extraction, solvants autorisés et délais d'expédition sous 24 à 48 heures.",
    path: "/questions-frequentes/"
  },
  faq: {
    title: "Centre d'Aide & Réponses Pratiques | Bloom by BotaniK",
    description: "Réponses rapides sur l'utilisation quotidienne de nos appareils, le nettoyage, le choix des plantes sèches, la livraison et le suivi de votre commande.",
    path: "/questions-frequentes/"
  },
  'totum-vegetal': {
    title: "Totum Végétal vs Molécules Isolées | Synergie des Plantes",
    description: "Pourquoi le Totum végétal surpasse les isolats : synergie biochimique, biodisponibilité accrue et effet tampon des principes actifs entiers.",
    path: "/totum-vegetal/"
  },
  'plantes-adaptogenes': {
    title: "Plantes Adaptogènes | Axe HPA, Cortisol & Résilience",
    description: "Ashwagandha, Rhodiola, Éleuthérocoque : guide pratique des plantes adaptogènes pour moduler le cortisol et soutenir l'axe neuro-endocrinien.",
    path: "/plantes-adaptogenes/"
  },
  cosmetiques: {
    title: "Cosmétique Botanique & Macérats Huileux | Bloom",
    description: "Créez des soins d'exception avec la précision BloomLab. Macérats huileux, sérums et baumes enrichis en principes actifs préservés.",
    path: "/cosmetiques-naturels-diy/"
  },
  'cosmetique-botanique': {
    title: "Cosmétique Botanique & Macérats Huileux | Bloom",
    description: "Créez des soins d'exception avec la précision BloomLab. Macérats huileux, sérums et baumes enrichis en principes actifs préservés.",
    path: "/cosmetiques-naturels-diy/"
  },
  'cosmetiques-naturels-diy': {
    title: "Cosmétique Botanique & Macérats Huileux | Bloom",
    description: "Créez des soins d'exception avec la précision BloomLab. Macérats huileux, sérums et baumes enrichis en principes actifs préservés.",
    path: "/cosmetiques-naturels-diy/"
  },
  culinaire: {
    title: "Gastronomie Botanique | Huiles Aromatisées & Bouillons",
    description: "Gastronomie botanique de précision : créez des huiles infusées d'exception, vinaigres botaniques et bouillons actifs grâce au vortex cinétique BloomLab.",
    path: "/gastronomie-botanique/"
  },
  'gastronomie-botanique': {
    title: "Gastronomie Botanique | Huiles Aromatisées & Bouillons",
    description: "Gastronomie botanique de précision : créez des huiles infusées d'exception, vinaigres botaniques et bouillons actifs grâce au vortex cinétique BloomLab.",
    path: "/gastronomie-botanique/"
  },
  'remedes-naturels': {
    title: "Remèdes Naturels Maison | Guide d'Herboristerie Moderne",
    description: "Guide structuré pour concevoir vos préparations végétales familiales : tisanes concentrées, sirops botaniques, baumes et extraits hydroalcooliques.",
    path: "/remedes-naturels/"
  },
  'remedes-naturels-maison-guide': {
    title: "Remèdes Naturels Maison | Guide d'Herboristerie Moderne",
    description: "Guide structuré pour concevoir vos préparations végétales familiales : tisanes concentrées, sirops botaniques, baumes et extraits hydroalcooliques.",
    path: "/remedes-naturels/"
  },
  lexique: {
    title: "Lexique Phytothérapie | Termes Extraction Botanique | Bloom",
    description: "Lexique de phytothérapie et d'extraction botanique : définitions du Totum, de la charge allostatique, des solvants nobles et du séquençage actif A/B.",
    path: "/lexique/"
  },
  blog: {
    title: "Journal Botanique | Extraction & Remèdes Naturels | Bloom",
    description: "Le Journal Botanique Bloom : analyses scientifiques, dossiers d'herboristerie moderne, recettes d'extraction et guides pratiques pour vos remèdes maison.",
    path: "/blog/"
  },
  articles: {
    title: "Articles Savoirs Botaniques | Phytothérapie Maison | Bloom",
    description: "Explorez tous nos articles d'experts sur l'extraction botanique, la phytothérapie de terrain, les plantes adaptogènes et les macérations de précision.",
    path: "/articles/"
  },
  recettes: {
    title: "Recettes & Formulations Botaniques : Tisanes, Huiles & Extraits | Bloom",
    description: "Recettes précises d'extraction végétale : ratios, températures et solvants pour concevoir vos remèdes et soins botaniques à la maison.",
    path: "/recettes/"
  },
  'recettes-hub': {
    title: "Recettes & Formulations Botaniques : Tisanes, Huiles & Extraits | Bloom",
    description: "Recettes précises d'extraction végétale : ratios, températures et solvants pour concevoir vos remèdes et soins botaniques à la maison.",
    path: "/recettes/"
  },
  'recette-soupe-tremella': {
    title: "Soupe de Beauté au Champignon des Neiges (Tremella) | BloomLab",
    description: "Recette authentique de Soupe de Beauté MTC au Tremella adaptée à la BloomLab : hydratation profonde, éclat de la peau et vitalité.",
    path: "/recettes/culinaires/soupe-beaute-tremella/"
  },
  'recette-phycocyanine': {
    title: "Phycocyanine & Reset Homéostasique | Extraction BloomLab",
    description: "Extrayez la phycocyanine de spiruline à 40°C avec la BloomLab pour soutenir vos mitochondries et optimiser les Phases 2 et 3 du Reset Homéostasique.",
    path: "/academie/reset-homeostasique/phycocyanine/"
  },
  contact: {
    title: "Contact & Assistance Botanique | Bloom by BotaniK",
    description: "Une question sur BloomLab® ou nos kits botaniques ? Contactez nos conseillers en phytothérapie. Équipe basée en France, réponse sous 24 à 48 heures.",
    path: "/contact/"
  },
  'recettes-phytotherapie': {
    title: "Recettes Phytothérapie de Précision | Herbier Bloom",
    description: "Formulations d'extraction botanique de précision par terrain et principe actif pour votre extracteur BloomLab®.",
    path: "/recettes/phytotherapie/"
  },
  'recettes-gastronomie': {
    title: "Recettes Gastronomie Botanique | Huiles & Bouillons Bloom",
    description: "Créations culinaires botaniques : huiles infusées, vinaigres actifs et miels de précision préparés avec BloomLab®.",
    path: "/recettes/gastronomie/"
  },
  'recettes-culinaires': {
    title: "Recettes Culinaires Botaniques | Tisanes, Sirops & Bouillons",
    description: "Explorez nos recettes culinaires d'extraction végétale à basse température pour préserver arômes et actifs.",
    path: "/recettes/culinaires/"
  },
  'recettes-cosmetiques': {
    title: "Recettes Cosmétiques Naturelles | Macérats & Baumes Bloom",
    description: "Formules maison de macérats huileux, sérums et soins dermo-botaniques stables préparés à 45°C.",
    path: "/recettes/cosmetiques/"
  },
  'recettes-parcours': {
    title: "Parcours Botaniques Guidés | Protocoles & Remèdes",
    description: "Parcours botaniques multi-phases associant drainage émonctoriel et formulations ciblées.",
    path: "/recettes/parcours-botaniques/"
  },
  'axe-a2': {
    title: "Axe A2 : Barrière Intestinale & Microbiote | Académie Bloom",
    description: "Comprendre la perméabilité intestinale, les jonctions serrées et le rôle des mucilages végétaux extraits sur BloomLab®.",
    path: "/academie/axes/a2/"
  },
  'axe-a3': {
    title: "Axe A3 : Axe HPA & Stress Adaptatif | Académie Bloom",
    description: "Régulation du cortisol, rythme circadien et soutien neuro-endocrinien par les plantes adaptogènes en phytothérapie systémique.",
    path: "/academie/axes/a3/"
  },
  'axe-a4': {
    title: "Axe A4 : Inflammation Bas Bruit & Résolution | Académie Bloom",
    description: "Comprendre les médiateurs pro-résolutifs et la modulation naturelle des voies NF-κB et Nrf2 par le Totum végétal.",
    path: "/academie/axes/a4/"
  },
  'axe-a5': {
    title: "Axe A5 : Mitochondries & Biogenèse ATP | Académie Bloom",
    description: "Soutenir le rendement énergétique mitochondrial et réduire le stress oxydatif grâce aux polyphénols et pigments bioactifs.",
    path: "/academie/axes/a5/"
  },
  'axe-a6': {
    title: "Axe A6 : Tonus Vagal & Système Parasympathique | Académie Bloom",
    description: "Variabilité de la fréquence cardiaque, nerf vague et apaisement du système nerveux autonome par l'extraction botanique douce.",
    path: "/academie/axes/a6/"
  },
  'axe-a7': {
    title: "Axe A7 : Matrice Extracellulaire & Fascia | Académie Bloom",
    description: "Hydratation tissulaire, collagène végétal, silice de prêle et drainage de l'espace interstitiel dans le modèle Bloom.",
    path: "/academie/axes/a7/"
  },
  'axe-a8': {
    title: "Axe A8 : Écologie Microbienne & Butyrate | Académie Bloom",
    description: "Prébiotiques végétaux, fibres solubles et production d'acides gras à chaîne courte pour équilibrer le microbiote.",
    path: "/academie/axes/a8/"
  },
  'axe-a9': {
    title: "Axe A9 : Système Endocannabinoïde (SEC) | Académie Bloom",
    description: "Le chef d'orchestre rétrograde de l'homéostasie : phytocannabinoïdes, terpènes et extraction liposoluble de précision.",
    path: "/academie/axes/a9/"
  },
  'blog-vieillissement-myeline': {
    title: "Vieillissement, Myéline & FGF17 : Restaurer la Clarté Mentale | Bloom",
    description: "Analyse neurobiologique de la démyélinisation liée à l'âge, du facteur FGF17 et des leviers botaniques pour soutenir les oligodendrocytes.",
    path: "/blog/vieillissement-myeline-fgf17-clarte-mentale/"
  },
  'infusion-precision': {
    title: "Infusion de Précision : Température, Vortex & Principes Actifs | Bloom",
    description: "Pourquoi la température au degré près et l'agitation dynamique transforment radicalement la richesse moléculaire de vos tisanes médicinales.",
    path: "/infusion-precision/"
  },
  'totum-definition': {
    title: "Définition du Totum Végétal en Phytothérapie | Bloom by BotaniK",
    description: "Comprendre la notion scientifique de Totum végétal : synergie d'actifs, co-facteurs enzymatiques et supériorité face aux molécules isolées.",
    path: "/totum-definition/"
  },
  'solvants-extraction': {
    title: "Solvants d'Extraction Botanique : Polarité & Rendements | Bloom",
    description: "Tableau complet des solvants naturels (eau, éthanol, huiles, glycérine, vinaigre) et températures optimales par famille phytochimique.",
    path: "/solvants-extraction/"
  },
  'maceration-plantes': {
    title: "Macération de Plantes à Chaud & Froid : Protocoles Maison | Bloom",
    description: "Maîtrisez la macération végétale (huileuse, alcoolique, glycérinée) à domicile sans oxydation grâce à l'extraction en cuve close.",
    path: "/maceration-plantes/"
  },
  'qu-est-ce-que-infusion': {
    title: "Qu'est-ce que l'Infusion Botanique ? Science & Pratique | Bloom",
    description: "Découvrez les différences entre tisane simple, décoction et extraction botanique contrôlée pour préserver flavonoïdes et huiles essentielles.",
    path: "/qu-est-ce-que-l-infusion-botanique/"
  },
  hormese: {
    title: "Hormèse Végétale | Principes Amers & Résilience Bloom",
    description: "Le principe d'hormèse végétale : comment les molécules de défense des plantes stimulent notre pharmacie intérieure et nos mécanismes de régénération.",
    path: "/hormese/"
  },
  'phytotherapie-moderne-scientifique': {
    title: "Phytothérapie Moderne & Scientifique | Extraction & Biodisponibilité",
    description: "Comment l'ingénierie thermique et l'évidence phytochimique réconcilient herboristerie traditionnelle et rigueur clinique moderne.",
    path: "/phytotherapie-moderne-scientifique/"
  },
  'abonnements-numeriques': {
    title: "Abonnements Numériques Bloom Académie & ALMA | Bloom by BotaniK",
    description: "Accédez aux protocoles systémiques complets, fiches d'extraction avancées et suivi personnalisé ALMA.",
    path: "/boutique/abonnements-numeriques/"
  },
  cgv: {
    title: "Conditions Générales de Vente (CGV) | Bloom by BotaniK",
    description: "Consultez les conditions générales de vente de Bloom by BotaniK : commandes, tarifs, garanties, livraisons et droit de rétractation.",
    path: "/conditions-generales-de-vente/"
  },
  cgu: {
    title: "Conditions d'Utilisation (CGU) | Bloom by BotaniK",
    description: "Conditions générales d'utilisation du site et des services Bloom by BotaniK.",
    path: "/termes-et-conditions/"
  },
  privacy: {
    title: "Politique de Confidentialité | Données Personnelles Bloom",
    description: "Politique de confidentialité et protection des données personnelles (RGPD) sur bloombybotanik.com.",
    path: "/politique-de-confidentialite/"
  },
  mentions: {
    title: "Mentions Légales | Bloom by BotaniK",
    description: "Mentions légales du site bloombybotanik.com : éditeur, hébergement et propriété intellectuelle.",
    path: "/mentions-legales/"
  },
  returns: {
    title: "Retours & Remboursements | Garantie 30 Jours Bloom",
    description: "Politique de retour et de remboursement Bloom by BotaniK : garantie 30 jours et modalités SAV.",
    path: "/retour-et-remboursement/"
  },
  withdrawal: {
    title: "Droit de Rétractation | Formulaire de Retour Bloom",
    description: "Exercice de votre droit légal de rétractation sous 14 jours pour vos achats sur bloombybotanik.com.",
    path: "/droit-de-retractation/"
  }
};

const NOINDEX_VIEWS = new Set([
  'admin',
  'admin-newsletter',
  'cart',
  'checkout',
  'account',
  'pending',
  'activation',
  'activate-bloomlab',
  'newsletter-preferences'
]);

function setMetaTag(attrName: 'name' | 'property', attrValue: string, content: string) {
  let meta = document.querySelector(`meta[${attrName}="${attrValue}"]`);
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute(attrName, attrValue);
    document.head.appendChild(meta);
  }
  meta.setAttribute('content', content);
}

function setMetaDescription(description: string) {
  setMetaTag('name', 'description', description);
}

function setCanonicalLink(canonical: string) {
  let linkCanonical = document.querySelector('link[rel="canonical"]');
  if (!linkCanonical) {
    linkCanonical = document.createElement('link');
    linkCanonical.setAttribute('rel', 'canonical');
    document.head.appendChild(linkCanonical);
  }
  linkCanonical.setAttribute('href', canonical);

  document.querySelectorAll('link[rel="alternate"][hreflang]').forEach((el) => {
    const hreflang = el.getAttribute('hreflang');
    if (hreflang === 'fr' || hreflang === 'x-default') {
      el.setAttribute('href', canonical);
    }
  });
}

function applySEOMetadata(title: string, description: string, canonical: string, noindex: boolean) {
  document.title = title;
  setMetaDescription(description);
  setMetaTag('property', 'og:title', title);
  setMetaTag('property', 'og:description', description);
  setMetaTag('property', 'og:url', canonical);
  setMetaTag('name', 'twitter:title', title);
  setMetaTag('name', 'twitter:description', description);
  setMetaTag(
    'name',
    'robots',
    noindex
      ? 'noindex, nofollow'
      : 'index, follow, max-image-preview:large, max-video-preview:-1, max-snippet:-1'
  );
  setCanonicalLink(canonical);
}

export function updateDocumentSEO(config?: any, _lang?: any, productId?: string, _slug?: string) {
  if (typeof document === 'undefined' || !config) return;

  if (typeof config === 'string') {
    const isNoindex = NOINDEX_VIEWS.has(config);

    if (config === 'indexbis' || config === 'home') {
      applySEOMetadata(HOME_TITLE, HOME_DESCRIPTION, 'https://bloombybotanik.com/', false);
      return;
    }

    // Sur toute navigation client hors accueil, éviter de conserver le schéma Product/FAQ/HowTo de la home
    const rootSchemaEl = document.getElementById('bloom-root-schema');
    if (rootSchemaEl && rootSchemaEl.textContent?.includes('FAQPage')) {
      rootSchemaEl.remove();
    }

    if (config === 'product-detail' && productId && PRODUCT_SEO_MAP[productId]) {
      const prod = PRODUCT_SEO_MAP[productId];
      const cleanPath = (prod.path || `/boutique/${productId}/`).replace(/\/?$/, '/');
      applySEOMetadata(prod.title, prod.description, `https://bloombybotanik.com${cleanPath}`, false);
      return;
    }

    const currentPathRaw = typeof window !== 'undefined' ? window.location.pathname : '/';
    const normalizedCurrent = currentPathRaw.endsWith('/') ? currentPathRaw : `${currentPathRaw}/`;

    // Résolution dynamique articles / blog avec slug : préserver titre, description et canonical propre !
    if ((config === 'articles' || config === 'blog') && (_slug || normalizedCurrent.startsWith('/articles/') || normalizedCurrent.startsWith('/blog/'))) {
      const resolvedSlug = _slug || normalizedCurrent.replace(/^\/(?:articles|blog)\//, '').replace(/\/$/, '');
      if (resolvedSlug) {
        const matchedPost = blogPosts.find((p) => p.slug === resolvedSlug);
        if (matchedPost) {
          const langKey = _lang === 'en' || _lang === 'de' ? _lang : 'fr';
          const title = matchedPost.metaTitle?.[langKey] || matchedPost.metaTitle?.fr || `${matchedPost.title?.[langKey] || matchedPost.title?.fr} | Bloom by BotaniK`;
          const desc = (matchedPost.metaDescription?.[langKey] || matchedPost.metaDescription?.fr || matchedPost.excerpt?.[langKey] || matchedPost.excerpt?.fr || title).slice(0, 158);
          const postCanonical = `https://bloombybotanik.com/articles/${resolvedSlug}/`;
          applySEOMetadata(title, desc, postCanonical, false);
          return;
        }
      }
    }

    // Préserver le canonical exact des fiches recettes individuelles & paginations (/recettes/...)
    if (
      (config === 'recette-detail' || normalizedCurrent.startsWith('/recettes/')) &&
      normalizedCurrent !== '/recettes/' &&
      normalizedCurrent !== '/recettes/culinaires/soupe-beaute-tremella/'
    ) {
      setCanonicalLink(`https://bloombybotanik.com${normalizedCurrent}`);
      setMetaTag('name', 'robots', 'index, follow, max-image-preview:large, max-video-preview:-1, max-snippet:-1');
      return;
    }

    if (normalizedCurrent === '/infusion-botanique/') {
      const entry = VIEW_SEO_MAP.guide;
      applySEOMetadata(entry.title, entry.description, 'https://bloombybotanik.com/infusion-botanique/', false);
      return;
    }

    if (config === 'recette-soupe-tremella') {
      const canonical = 'https://bloombybotanik.com/recettes/culinaires/soupe-beaute-tremella/';
      if (_lang === 'en') {
        applySEOMetadata(
          'Snow Fungus (Tremella) Beauty Soup | BloomLab TCM Recipe',
          'Authentic TCM Tremella Beauty Soup adapted for BloomLab: deep Yin hydration, radiant skin, Longan & Lotus Seed serenity variants.',
          canonical,
          false
        );
        return;
      }
      if (_lang === 'de') {
        applySEOMetadata(
          'Schneepilz-Schönheitssuppe (Tremella) | BloomLab TCM-Rezept',
          'Authentische TCM-Schönheitssuppe mit Tremella für die BloomLab: tiefe Yin-Hydratation, strahlende Haut, Longan- & Lotussamen-Varianten.',
          canonical,
          false
        );
        return;
      }
    }

    if (config === 'recette-phycocyanine') {
      const canonical = 'https://bloombybotanik.com/academie/reset-homeostasique/phycocyanine/';
      if (_lang === 'en') {
        applySEOMetadata(
          'Phycocyanin & Homeostatic Reset | BloomLab 40°C Extraction',
          'Extract spirulina phycocyanin at 40°C with BloomLab to support mitochondria, modulate NF-κB/Nrf2 and enhance Phases 2 & 3 of Homeostatic Reset.',
          canonical,
          false
        );
        return;
      }
      if (_lang === 'de') {
        applySEOMetadata(
          'Phycocyanin & Homöostatischer Reset | BloomLab 40°C Extraktion',
          'Extrahieren Sie Spirulina-Phycocyanin bei 40°C mit der BloomLab zur Unterstützung der Mitochondrien in Phase 2 & 3 des Homöostatischen Resets.',
          canonical,
          false
        );
        return;
      }
    }

    if (config === 'women-academy') {
      const canonical = 'https://bloombybotanik.com/academie/pouvoir-cyclique-femme/';
      if (_lang === 'en') {
        applySEOMetadata(
          'The Cyclical and Sacred Power of Women | Bloom Academy',
          'Open-access Bloom Academy dossier: Voynich manuscript, Trotula, fertilization biology, postpartum hormonal drop, menopause neurobiology & BloomLab botanical extracts.',
          canonical,
          false
        );
        return;
      }
      if (_lang === 'de') {
        applySEOMetadata(
          'Die Zyklische und Heilige Kraft der Frau | Bloom Academy',
          'Freies Bloom Academy Dossier: Voynich-Manuskript, Trotula, Befruchtungsbiologie, postpartaler Hormonabfall, Menopause und präzise BloomLab-Pflanzenextrakte.',
          canonical,
          false
        );
        return;
      }
    }

    const mapped = VIEW_SEO_MAP[config];
    if (mapped) {
      const targetPath = mapped.path || VIEW_PATHS[config] || normalizedCurrent || '/';
      const cleanPath = targetPath.endsWith('/') ? targetPath : `${targetPath}/`;
      const canonical = `https://bloombybotanik.com${cleanPath === '//' ? '/' : cleanPath}`;
      applySEOMetadata(mapped.title, mapped.description, canonical, isNoindex);
      return;
    }

    if (VIEW_PATHS[config]) {
      const targetPath = VIEW_PATHS[config];
      const cleanPath = targetPath.endsWith('/') ? targetPath : `${targetPath}/`;
      const canonical = `https://bloombybotanik.com${cleanPath === '//' ? '/' : cleanPath}`;
      setCanonicalLink(canonical);
      setMetaTag(
        'name',
        'robots',
        isNoindex
          ? 'noindex, nofollow'
          : 'index, follow, max-image-preview:large, max-video-preview:-1, max-snippet:-1'
      );
      return;
    }

    if (!document.title || document.title === 'indexbis') {
      document.title = HOME_TITLE;
    }
    return;
  }

  if (config.title) {
    document.title = config.title;
    setMetaTag('property', 'og:title', config.title);
    setMetaTag('name', 'twitter:title', config.title);
  }

  if (config.description) {
    setMetaDescription(config.description);
    setMetaTag('property', 'og:description', config.description);
    setMetaTag('name', 'twitter:description', config.description);
  }

  if (config.canonical) {
    setCanonicalLink(config.canonical);
    setMetaTag('property', 'og:url', config.canonical);
  }

  if (config.schema) {
    let scriptTag = document.querySelector('#seo-structured-data');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'seo-structured-data';
      scriptTag.setAttribute('type', 'application/ld+json');
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(config.schema);
  }
}
