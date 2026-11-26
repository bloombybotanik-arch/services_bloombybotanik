import { VIEW_PATHS } from '../types';
import { blogPosts } from '../data/blogPosts';

interface SEOEntry {
  title: string;
  description: string;
  path?: string;
}

const HOME_TITLE = "BloomLab® — Extracteur Botanique de Précision & Totum Végétal | Bloom by BotaniK";
const HOME_DESCRIPTION = "Créez vos huiles de soin, sérums visage, baumes et huiles parfumées maison en 2h. Cuve Inox 304, contrôle thermique précis et guide de 100 recettes en français.";

const HOME_SEO_I18N: Record<'en' | 'de', SEOEntry> = {
  en: {
    title: "BloomLab® — Precision Botanical Extractor & Whole-Plant Totum | Bloom by BotaniK",
    description: "Create homemade skincare oils, face serums, balms, and scented oils in 2h. 304 stainless steel chamber, precise thermal control, and 100-recipe guide."
  },
  de: {
    title: "BloomLab® — Botanischer Präzisionsextraktor & Pflanzen-Totum | Bloom by BotaniK",
    description: "Kreieren Sie Pflegeöle, Gesichtsseren, Balsame und Duftöle in 2 Std. selbst. 304-Edelstahlbehälter, präzise Temperatursteuerung und 100-Rezepte-Leitfaden."
  }
};

const PRODUCT_SEO_MAP: Record<string, SEOEntry> = {
  bloomlab: {
    title: "BloomLab® — Extracteur Botanique Inox 304 pour Cosmétique & Cuisine Maison",
    description: "Préparez vos macérâts huileux, baumes et infusions botaniques sans amertume. Garantie légale 2 ans (UE) + garantie commerciale 1 an, manuel FR et 100 recettes.",
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
    title: "Kit Nuit Profonde | Rituel du Soir & Plantes Bio | Bloom by BotaniK",
    description: "Kit Nuit Profonde par Bloom by BotaniK : synergie de valériane et passiflore bio calibrée pour l'extraction séquentielle sur BloomLab®.",
    path: "/boutique/kit-nuit/"
  },
  "kit-digestion": {
    title: "Kit Équilibre Botanique | Aromates & Plantes Bio | Bloom by BotaniK",
    description: "Kit Équilibre Botanique Bloom by BotaniK : brou de noix, gingembre, romarin et ginkgo calibrés pour une extraction botanique séquentielle.",
    path: "/boutique/kit-digestion/"
  },
  "kit-articulaire": {
    title: "Kit Mouvement Libre | Résine & Plantes Bio | Bloom by BotaniK",
    description: "Kit Mouvement Libre par Bloom by BotaniK : reine-des-prés, gingembre et résine de boswellia sélectionnés pour l'extraction séquentielle.",
    path: "/boutique/kit-articulaire/"
  },
  "kit-hiver": {
    title: "Kit Bouclier Hiver | Botanique de Saison | Bloom by BotaniK",
    description: "Kit Bouclier Hiver Bloom by BotaniK : gingembre, girofle, sureau noir, thym et romarin pour des préparations aromatiques de saison.",
    path: "/boutique/kit-hiver/"
  },
  "duo-argiles": {
    title: "Duo Argiles & Terres Rares | Purification | Bloom by BotaniK",
    description: "Duo Argiles Zéolithe-Bentonite Bloom by BotaniK : argiles surfines ventilées pour vos préparations d'herboristerie et soins du terrain.",
    path: "/boutique/duo-argiles/"
  },
  "abonnements-numeriques": {
    title: "Abonnements Numériques Bloom Académie & ALMA | Bloom by BotaniK",
    description: "Accédez aux protocoles systémiques Bloom by BotaniK, fiches d'extraction BloomLab® avancées et suivi personnalisé ALMA.",
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
    title: "BloomLab® — Extracteur Botanique Inox 304 pour Cosmétique & Cuisine Maison",
    description: "Préparez vos macérâts huileux, baumes et infusions botaniques sans amertume. Garantie légale 2 ans (UE) + garantie commerciale 1 an, manuel FR et 100 recettes.",
    path: "/bloomlab/"
  },
  bloomlab: {
    title: "BloomLab® — Extracteur Botanique Inox 304 pour Cosmétique & Cuisine Maison",
    description: "Préparez vos macérâts huileux, baumes et infusions botaniques sans amertume. Garantie légale 2 ans (UE) + garantie commerciale 1 an, manuel FR et 100 recettes.",
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
    path: "/infusion-botanique-maison-comment-ca-marche/"
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
    title: "Guide des Solvants d'Extraction : Eau, Huile, Alcool & Glycérine | Bloom by BotaniK",
    description: "Eau, huile végétale, glycérine et teintures documentaires : choisissez le solvant adapté à chaque plante avec le guide Bloom.",
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
    title: "Teinture-Mère Maison | Guide Extraction Hydroalcoolique | Bloom",
    description: "Maîtrisez les teintures mères maison et degrés alcooliques (45° à 96°) avec les programmes Tincture et Sans chauffe de la BloomLab® ou en bocal, en toute sécurité.",
    path: "/teinture-mere/"
  },
  academie: {
    title: "Académie Bloom — Méthode A/B, Totum & Protocoles",
    description: "Guides pédagogiques sur le totum végétal, la méthode A/B et les protocoles botaniques. Contenu éducatif, sans promesse thérapeutique.",
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
    title: "Kits Plantes & Soins Botaniques Maison | Bloom by BotaniK",
    description: "Boutique officielle Bloom by BotaniK : commandez l'extracteur BloomLab®, nos formules de plantes médicinales bio, filtres et accessoires maison.",
    path: "/boutique/"
  },
  'boutique-kits': {
    title: "Kits & Soins Botaniques Maison | Bloom by BotaniK",
    description: "Kits d'ingrédients et protocoles pour préparer vos sérums, infusions et soins à la BloomLab®. Traçabilité et qualité botanique.",
    path: "/boutique/kits/"
  },
  'kits-botaniques': {
    title: "Kits & Soins Botaniques Maison | Bloom by BotaniK",
    description: "Kits d'ingrédients et protocoles pour préparer vos sérums, infusions et soins à la BloomLab®. Traçabilité et qualité botanique.",
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
    title: "Cosmétique Maison au Botanique | Recettes & Protocoles",
    description: "Sérums, huiles et soins capillaires à base de romarin, gingembre et fenugrec, préparés avec votre BloomLab®.",
    path: "/cosmetiques-naturels-diy/"
  },
  'cosmetique-botanique': {
    title: "Cosmétique Maison au Botanique | Recettes & Protocoles",
    description: "Sérums, huiles et soins capillaires à base de romarin, gingembre et fenugrec, préparés avec votre BloomLab®.",
    path: "/cosmetiques-naturels-diy/"
  },
  'cosmetiques-naturels-diy': {
    title: "Cosmétique Maison au Botanique | Recettes & Protocoles",
    description: "Sérums, huiles et soins capillaires à base de romarin, gingembre et fenugrec, préparés avec votre BloomLab®.",
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
    description: "Guide structuré pour concevoir vos préparations végétales familiales : tisanes concentrées, sirops botaniques, baumes et macérats aqueux ou huileux.",
    path: "/remedes-naturels/"
  },
  'remedes-naturels-maison-guide': {
    title: "Remèdes Naturels Maison | Guide d'Herboristerie Moderne",
    description: "Guide structuré pour concevoir vos préparations végétales familiales : tisanes concentrées, sirops botaniques, baumes et macérats aqueux ou huileux.",
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
    description: "Pourquoi la thermorégulation suivie (spécification nominale fabricant) et l'agitation douce transforment la richesse aromatique de vos tisanes.",
    path: "/infusion-precision/"
  },
  'totum-definition': {
    title: "Définition du Totum Végétal en Phytothérapie | Bloom by BotaniK",
    description: "Comprendre la notion de Totum végétal : synergie d'actifs, co-facteurs enzymatiques et comparaison avec les molécules isolées.",
    path: "/totum-definition/"
  },
  'solvants-extraction': {
    title: "Solvants d'Extraction Botanique : Polarité & Usages | Bloom",
    description: "Tableau des solvants naturels (eau, huiles végétales, glycérine, alcool alimentaire 45°–96°), programmes BloomLab® et repères de température.",
    path: "/solvants-extraction/"
  },
  'maceration-plantes': {
    title: "Macération de Plantes | Huileuse, Aqueuse, Glycérinée & Alcoolique | Bloom",
    description: "Maîtrisez la macération végétale (huileuse, glycérinée, aqueuse ou alcoolique sur BloomLab® via Oil, Tincture et Sans chauffe) pour préserver le totum.",
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
    description: "Comment l'ingénierie thermique et l'évidence phytochimique réconcilient herboristerie traditionnelle et rigueur documentaire moderne.",
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
    title: "Retours & Remboursements | Rétractation 14 j & Retour 30 j Bloom",
    description: "Politique de retour Bloom by BotaniK : droit légal de rétractation 14 jours, extension commerciale de retour 30 jours et garanties applicables.",
    path: "/retour-et-remboursement/"
  },
  withdrawal: {
    title: "Droit de Rétractation | Formulaire de Retour Bloom",
    description: "Exercice de votre droit légal de rétractation sous 14 jours pour vos achats sur bloombybotanik.com.",
    path: "/droit-de-retractation/"
  },
  'nutrition-et-micronutrition': {
    title: "Micronutrition & Compléments Alimentaires | Académie Bloom",
    description: "Guide pédagogique pour comprendre vitamines, minéraux et oméga-3 : allégations autorisées, critères de choix, précautions et interactions.",
    path: "/academie/nutrition-et-micronutrition/"
  },
  'micronutrition-guide-achat': {
    title: "Choisir un Complément Alimentaire : Guide | Académie Bloom",
    description: "Apprenez à lire les étiquettes et comparer les compléments alimentaires : quantité active, forme, traçabilité, conservation et précautions.",
    path: "/academie/nutrition-et-micronutrition/guide-achat/"
  },
  'micronutrition-precautions': {
    title: "Compléments Alimentaires : Précautions | Académie Bloom",
    description: "Anticoagulants, grossesse, traitements, chirurgie ou troubles rénaux : situations où demander conseil avant de prendre un complément.",
    path: "/academie/nutrition-et-micronutrition/precautions-et-interactions/"
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

const PRODUCT_SEO_I18N: Record<'en' | 'de', Record<string, { title: string; description: string }>> = {
  en: {
    bloomlab: {
      title: "BloomLab® | Precision Botanical Extractor for Home Formulations",
      description: "Set time (30 min–12 h) and temperature (0–121°C) to preserve the botanical totum. Craft homemade infusions, infused oils, and natural cosmetics."
    },
    "pack-signature": {
      title: "BloomLab® Signature Pack + Organic Medicinal Plants Trio | Bloom by BotaniK",
      description: "Bloom by BotaniK Signature Pack: BloomLab® extractor, organic medicinal plant blends, and guided extraction protocols."
    },
    "bundle-apothicaire": {
      title: "Apothecary Trio | 3 Organic Medicinal Plant Kits | Bloom by BotaniK",
      description: "Apothecary Trio by Bloom by BotaniK: three organic botanical blends calibrated for BloomLab® (Vital Sap, Deep Night, and Digestive Fire)."
    },
    "kit-starter": {
      title: "Vital Sap Kit | Organic Medicinal Plants | Bloom by BotaniK",
      description: "Vital Sap Kit by Bloom by BotaniK: organic nettle, rosemary, and rosehip calibrated for precision extraction on BloomLab®."
    },
    "kit-nuit": {
      title: "Deep Night Kit | Relaxation & Organic Plants | Bloom by BotaniK",
      description: "Deep Night Kit by Bloom by BotaniK: organic passionflower, lemon balm, and chamomile blend calibrated for gentle BloomLab® extraction."
    },
    "kit-digestion": {
      title: "Digestive Fire Kit | Comfort & Organic Plants | Bloom by BotaniK",
      description: "Digestive Fire Kit by Bloom by BotaniK: organic sweet fennel, peppermint, and gentian calibrated for precision botanical infusion."
    },
    "kit-articulaire": {
      title: "Joint Fire Kit | Mobility & Organic Plants | Bloom by BotaniK",
      description: "Joint Fire Kit by Bloom by BotaniK: organic devil's claw, meadowsweet, and blackcurrant selected to preserve the plant totum."
    },
    "kit-hiver": {
      title: "Winter Shield Kit | Seasonal Organic Plants | Bloom by BotaniK",
      description: "Winter Shield Kit by Bloom by BotaniK: organic echinacea, linalool thyme, and elderberry for polyphenol-rich botanical infusions."
    },
    "duo-argiles": {
      title: "Clays & Rare Earths Duo | Zeolite & Bentonite | Bloom by BotaniK",
      description: "Bloom by BotaniK Zeolite-Bentonite Duo: ultra-fine ventilated mineral clays documented for botanical preparations and external care."
    },
    "abonnements-numeriques": {
      title: "Digital Subscriptions Bloom Academy & ALMA | Bloom by BotaniK",
      description: "Access Bloom by BotaniK educational protocols, advanced BloomLab® extraction sheets, and personalized ALMA guidance."
    }
  },
  de: {
    bloomlab: {
      title: "BloomLab® | Präzisions-Pflanzenextraktor für Hausgemachte Pflege",
      description: "Steuern Sie Zeit (30 Min.–12 Std.) und Temperatur (0–121°C), um das Pflanzentotum für Öle, Aufgüsse und Naturkosmetik zu bewahren."
    },
    "pack-signature": {
      title: "Signature-Pack BloomLab® + 3 Bio-Heilpflanzen-Kits | Bloom by BotaniK",
      description: "Signature-Pack von Bloom by BotaniK: BloomLab®-Extraktor, ausgewählte Bio-Heilpflanzen und geführte Extraktionsprotokolle."
    },
    "bundle-apothicaire": {
      title: "Apotheker-Trio | 3 Bio-Heilpflanzen-Kits | Bloom by BotaniK",
      description: "Apotheker-Trio von Bloom by BotaniK: drei auf BloomLab® abgestimmte Bio-Pflanzenmischungen (Ur-Saft, Tiefe Nacht und Verdauungsfeuer)."
    },
    "kit-starter": {
      title: "Kit Ur-Saft | Bio-Heilpflanzen | Bloom by BotaniK",
      description: "Kit Ur-Saft von Bloom by BotaniK: Bio-Brennnessel, Rosmarin und Hagebutte für präzise Pflanzenextraktionen mit der BloomLab®."
    },
    "kit-nuit": {
      title: "Kit Tiefe Nacht | Entspannung & Bio-Pflanzen | Bloom by BotaniK",
      description: "Kit Tiefe Nacht von Bloom by BotaniK: Bio-Passionsblume, Melisse und Kamille für sanfte Extraktionen mit der BloomLab®."
    },
    "kit-digestion": {
      title: "Kit Verdauungsfeuer | Bekömmlichkeit & Bio-Pflanzen | Bloom by BotaniK",
      description: "Kit Verdauungsfeuer von Bloom by BotaniK: Bio-Fenchel, Pfefferminze und Enzian für präzise botanische Aufgüsse."
    },
    "kit-articulaire": {
      title: "Kit Gelenkfeuer | Beweglichkeit & Bio-Pflanzen | Bloom by BotaniK",
      description: "Kit Gelenkfeuer von Bloom by BotaniK: Bio-Teufelskralle, Mädesüß und Schwarze Johannisbeere für den Erhalt des Pflanzentotums."
    },
    "kit-hiver": {
      title: "Kit Winterschild | Saisonale Bio-Pflanzen | Bloom by BotaniK",
      description: "Kit Winterschild von Bloom by BotaniK: Bio-Echinacea, Thymian und Holunder für polyphenolreiche Aufgüsse."
    },
    "duo-argiles": {
      title: "Duo Tonerde & Seltene Erden | Zeolith & Bentonit | Bloom by BotaniK",
      description: "Zeolith-Bentonit-Duo von Bloom by BotaniK: ultrafeine Mineralerden für botanische Anwendungen und äußere Pflege."
    },
    "abonnements-numeriques": {
      title: "Digitale Abos Bloom Academy & ALMA | Bloom by BotaniK",
      description: "Zugang zu edukativen Bloom-Protokollen, detaillierten BloomLab®-Extraktionsbögen und dem ALMA-Assistenten."
    }
  }
};

const VIEW_SEO_I18N: Record<'en' | 'de', Record<string, { title: string; description: string }>> = {
  en: {
    machine: {
      title: "BloomLab® | Precision Botanical Extractor for Home Formulations",
      description: "Set time (30 min–12 h) and temperature (0–121°C) to preserve the plant totum. Craft home infusions, oil macerates, and botanical care."
    },
    bloomlab: {
      title: "BloomLab® | Precision Botanical Extractor for Home Formulations",
      description: "Set time (30 min–12 h) and temperature (0–121°C) to preserve the plant totum. Craft home infusions, oil macerates, and botanical care."
    },
    'comment-ca-marche': {
      title: "How It Works | BloomLab® Active Botanical Sequencing",
      description: "Understand the 3-step Bloom by BotaniK method: weigh your organic herbs, run the regulated cycle, and filter ready-to-use extracts."
    },
    how_it_works: {
      title: "How It Works | BloomLab® Active Botanical Sequencing",
      description: "Understand the 3-step Bloom by BotaniK method: weigh your organic herbs, run the regulated cycle, and filter ready-to-use extracts."
    },
    guide: {
      title: "Homemade Botanical Infusion: Complete Method & Precision Guide | Bloom",
      description: "Master precision botanical infusion: temperatures, solvents, and herbal recipes designed to preserve the plant totum."
    },
    'infusion-botanique': {
      title: "Homemade Botanical Infusion | Active Compounds & Method",
      description: "Understand closed-chamber herbal infusion dynamics: regulated thermal thresholds, gentle agitation, and flavonoid protection."
    },
    'infusion-botanique-maison-comment-ca-marche': {
      title: "Homemade Botanical Infusion | Active Compounds & Method",
      description: "Understand closed-chamber herbal infusion dynamics: regulated thermal thresholds, gentle agitation, and flavonoid protection."
    },
    'pillar-extraction': {
      title: "Botanical Extraction: Maceration, Infusion & A/B Sequencing | Bloom",
      description: "Master botanical extraction at home: maceration, controlled infusion, and A/B sequencing to preserve delicate active compounds."
    },
    'extraction-botanique': {
      title: "Botanical Extraction: Maceration, Infusion & A/B Sequencing | Bloom",
      description: "Master botanical extraction at home: maceration, controlled infusion, and A/B sequencing to preserve delicate active compounds."
    },
    'guide-solvants': {
      title: "Extraction Solvents Guide: Water, Oil, Alcohol & Glycerin | Bloom by BotaniK",
      description: "Water, carrier oils, glycerin, and documentary tincture solvents: choose the right botanical solvent for every plant."
    },
    'guide-complet': {
      title: "Botanical Extraction: Maceration, Infusion & A/B Sequencing | Bloom",
      description: "Master botanical extraction at home: maceration, controlled infusion, and A/B sequencing to preserve delicate active compounds."
    },
    'guide-complet-extraction-botanique-maison': {
      title: "Botanical Extraction: Maceration, Infusion & A/B Sequencing | Bloom",
      description: "Master botanical extraction at home: maceration, controlled infusion, and A/B sequencing to preserve delicate active compounds."
    },
    'huile-infusee': {
      title: "Homemade Infused Oils | Precision Maceration Guide | Bloom",
      description: "Practical guide to herbal infused oils: selecting virgin carrier oils, gentle 45°C maceration, and preserving lipophilic fractions."
    },
    'teinture-mere': {
      title: "Mother Tinctures | Hydroalcoholic Extraction | Bloom",
      description: "Understand hydroalcoholic mother tinctures in traditional herbalism (cold jar maceration, polarity, and alcohol-free glycerin alternatives on BloomLab®)."
    },
    academie: {
      title: "Bloom Academy — A/B Method, Totum & Educational Guides",
      description: "Educational guides on the plant totum, A/B sequencing, and botanical protocols. Informative content without medical claims."
    },
    'phytotherapie-reset': {
      title: "Homeostatic Reset: 6-Phase Terrain & Botanical Framework | Bloom",
      description: "Educational 6-phase terrain hygiene framework exploring elimination pathways, homeostasis, and precision BloomLab® extractions."
    },
    'reset-homeostasique': {
      title: "Homeostatic Reset: 6-Phase Terrain & Botanical Framework | Bloom",
      description: "Educational 6-phase terrain hygiene framework exploring elimination pathways, homeostasis, and precision BloomLab® extractions."
    },
    herbier: {
      title: "Interactive Medicinal Herbarium | Botanical Monographs | Bloom",
      description: "Explore our medicinal plant monographs: key active families, plant parts, extraction temperatures, and safety precautions."
    },
    library: {
      title: "Interactive Medicinal Herbarium | Botanical Monographs | Bloom",
      description: "Explore our medicinal plant monographs: key active families, plant parts, extraction temperatures, and safety precautions."
    },
    herbarium: {
      title: "Interactive Medicinal Herbarium | Botanical Monographs | Bloom",
      description: "Explore our medicinal plant monographs: key active families, plant parts, extraction temperatures, and safety precautions."
    },
    bibliotheque: {
      title: "Knowledge Library & Protocols | Bloom Academy",
      description: "Browse Bloom Academy educational resources: physiology dossiers, extraction sheets, and botanical monographs."
    },
    'library-landing': {
      title: "Knowledge Library & Protocols | Bloom Academy",
      description: "Browse Bloom Academy educational resources: physiology dossiers, extraction sheets, and botanical monographs."
    },
    boutique: {
      title: "Organic Medicinal Plants & Home Botanical Kits | Bloom by BotaniK",
      description: "Official Bloom by BotaniK shop: BloomLab® precision extractor, organic medicinal plant blends, filters, and accessories."
    },
    'boutique-kits': {
      title: "Organic Medicinal Plants & Home Botanical Kits | Bloom by BotaniK",
      description: "Pre-measured organic plant blends and protocols for crafting infusions, infused oils, and natural care with BloomLab®."
    },
    'kits-botaniques': {
      title: "Organic Medicinal Plants & Home Botanical Kits | Bloom by BotaniK",
      description: "Pre-measured organic plant blends and protocols for crafting infusions, infused oils, and natural care with BloomLab®."
    },
    abonnement: {
      title: "Bloom by BotaniK Subscription | Educational Protocols & ALMA",
      description: "Subscribe for €59/month to unlock the full Bloom Academy library, A/B extraction sheets, and guided ALMA orientation."
    },
    manifeste: {
      title: "Bloom Manifesto | Botanical Precision & Living Wisdom",
      description: "The Bloom by BotaniK manifesto: uniting modern thermal precision with traditional botanical knowledge."
    },
    'la-marque': {
      title: "About Bloom by BotaniK | Organic Terroirs & Precision",
      description: "Discover Bloom by BotaniK: rigorous organic herb sourcing, French-designed protocols, and scientific transparency."
    },
    'questions-frequentes': {
      title: "FAQ Botanical Extractor | BloomLab® Support & Shipping | Bloom",
      description: "Frequently asked questions about BloomLab®: 304 stainless steel care, authorized solvents, warranty, and 24–48h dispatch."
    },
    faq: {
      title: "Help Center & Practical Answers | Bloom by BotaniK",
      description: "Quick answers on daily BloomLab® use, cleaning cycle, dry herb selection, delivery, and order tracking."
    },
    'totum-vegetal': {
      title: "The Botanical Totum vs Isolated Molecules | Whole-Plant Synergy",
      description: "Why the whole-plant totum outperforms single isolates: biochemical synergy, natural buffering, and broader bioavailability."
    },
    'plantes-adaptogenes': {
      title: "Adaptogenic Plants | HPA Axis, Cortisol & Resilience | Bloom",
      description: "Ashwagandha, Rhodiola, Eleuthero: practical educational guide to adaptogenic roots and controlled extraction."
    },
    cosmetiques: {
      title: "Homemade Botanical Cosmetics | Serums & Macerates | Bloom",
      description: "Botanical hair oils, soothing balms, and facial serums crafted gently with rosemary, calendula, and BloomLab®."
    },
    'cosmetique-botanique': {
      title: "Homemade Botanical Cosmetics | Serums & Macerates | Bloom",
      description: "Botanical hair oils, soothing balms, and facial serums crafted gently with rosemary, calendula, and BloomLab®."
    },
    'cosmetiques-naturels-diy': {
      title: "Homemade Botanical Cosmetics | Serums & Macerates | Bloom",
      description: "Botanical hair oils, soothing balms, and facial serums crafted gently with rosemary, calendula, and BloomLab®."
    },
    culinaire: {
      title: "Botanical Gastronomy | Infused Oils & Herbal Broths | Bloom",
      description: "Precision botanical cooking: craft aromatic infused oils, herbal vinegars, and concentrated broths with BloomLab®."
    },
    'gastronomie-botanique': {
      title: "Botanical Gastronomy | Infused Oils & Herbal Broths | Bloom",
      description: "Precision botanical cooking: craft aromatic infused oils, herbal vinegars, and concentrated broths with BloomLab®."
    },
    lexique: {
      title: "Botanical Glossary | Extraction & Phytochemistry Terms | Bloom",
      description: "Clear definitions of key botanical terms: plant totum, allostatic load, solvent polarity, and active A/B sequencing."
    },
    blog: {
      title: "Botanical Journal | Extraction Science & Home Care | Bloom",
      description: "Bloom Botanical Journal: scientific insights, herbal monographs, extraction guides, and homemade care ideas."
    },
    articles: {
      title: "Botanical Knowledge Articles | Precision Extraction | Bloom",
      description: "Explore expert educational articles on botanical extraction, solvent science, adaptogens, and precision maceration."
    },
    recettes: {
      title: "Botanical Recipes & Formulations: Infusions, Oils & Care | Bloom",
      description: "Calibrated herbal extraction recipes: ratios, temperatures, and solvents for homemade botanical care with BloomLab®."
    },
    'recettes-hub': {
      title: "Botanical Recipes & Formulations: Infusions, Oils & Care | Bloom",
      description: "Calibrated herbal extraction recipes: ratios, temperatures, and solvents for homemade botanical care with BloomLab®."
    },
    contact: {
      title: "Contact & Botanical Support | Bloom by BotaniK",
      description: "Questions about BloomLab® or our organic medicinal plant kits? Contact our France-based team for a reply within 24–48 hours."
    },
    'infusion-precision': {
      title: "Precision Infusion: Temperature, Vortex & Active Compounds | Bloom",
      description: "How nominal thermal regulation and gentle agitation help preserve delicate aromatic fractions in homemade herbal infusions."
    },
    'totum-definition': {
      title: "What Is the Botanical Totum? Whole-Plant Synergy | Bloom",
      description: "Understand the concept of the botanical totum: cofactor synergy, traditional framing, and preservation of delicate compounds."
    },
    'solvants-extraction': {
      title: "Botanical Extraction Solvents: Polarity & Carrier Oils | Bloom",
      description: "Matrix of natural solvents (water, carrier oils, glycerin, and cold jar alcohol) and botanical extraction temperature guides."
    }
  },
  de: {
    machine: {
      title: "BloomLab® | Präzisions-Pflanzenextraktor für Hausgemachte Pflege",
      description: "Steuern Sie Zeit (30 Min.–12 Std.) und Temperatur (0–121°C), um das Pflanzentotum für Öle, Aufgüsse und Naturkosmetik zu bewahren."
    },
    bloomlab: {
      title: "BloomLab® | Präzisions-Pflanzenextraktor für Hausgemachte Pflege",
      description: "Steuern Sie Zeit (30 Min.–12 Std.) und Temperatur (0–121°C), um das Pflanzentotum für Öle, Aufgüsse und Naturkosmetik zu bewahren."
    },
    'comment-ca-marche': {
      title: "So funktioniert's | BloomLab® Aktive Pflanzen-Sequenzierung",
      description: "Verstehen Sie die 3 Schritte von Bloom by BotaniK: Bio-Kräuter abwiegen, geregelten Zyklus starten und fertigen Extrakt filtern."
    },
    how_it_works: {
      title: "So funktioniert's | BloomLab® Aktive Pflanzen-Sequenzierung",
      description: "Verstehen Sie die 3 Schritte von Bloom by BotaniK: Bio-Kräuter abwiegen, geregelten Zyklus starten und fertigen Extrakt filtern."
    },
    guide: {
      title: "Botanische Infusion für Zuhause: Leitfaden & Methode | Bloom",
      description: "Meistern Sie präzise Kräuterinfusionen: Temperaturen, Lösungsmittel und Rezepte zum Erhalt des vollständigen Pflanzentotums."
    },
    'infusion-botanique': {
      title: "Botanische Infusion für Zuhause | Wirkstoffe & Methode",
      description: "Verstehen Sie geschlossene Kräuterinfusion: kontrollierte Temperaturstufen, sanfte Bewegung und Schutz empfindlicher Flavonoide."
    },
    'infusion-botanique-maison-comment-ca-marche': {
      title: "Botanische Infusion für Zuhause | Wirkstoffe & Methode",
      description: "Verstehen Sie geschlossene Kräuterinfusion: kontrollierte Temperaturstufen, sanfte Bewegung und Schutz empfindlicher Flavonoide."
    },
    'pillar-extraction': {
      title: "Pflanzenextraktion: Mazeration, Infusion & A/B-Sequenzierung | Bloom",
      description: "Beherrschen Sie Pflanzenextraktion zuhause: Mazeration, präziser Aufguss und A/B-Sequenzierung für empfindliche Pflanzenstoffe."
    },
    'extraction-botanique': {
      title: "Pflanzenextraktion: Mazeration, Infusion & A/B-Sequenzierung | Bloom",
      description: "Beherrschen Sie Pflanzenextraktion zuhause: Mazeration, präziser Aufguss und A/B-Sequenzierung für empfindliche Pflanzenstoffe."
    },
    'guide-solvants': {
      title: "Lösungsmittel-Leitfaden: Wasser, Öl, Alkohol & Glycerin | Bloom by BotaniK",
      description: "Wasser, Pflanzenöl, Glycerin und dokumentierte Tinktur-Grundlagen: Wählen Sie das passende Lösungsmittel für jede Pflanze."
    },
    'guide-complet': {
      title: "Pflanzenextraktion: Mazeration, Infusion & A/B-Sequenzierung | Bloom",
      description: "Beherrschen Sie Pflanzenextraktion zuhause: Mazeration, präziser Aufguss und A/B-Sequenzierung für empfindliche Pflanzenstoffe."
    },
    'guide-complet-extraction-botanique-maison': {
      title: "Pflanzenextraktion: Mazeration, Infusion & A/B-Sequenzierung | Bloom",
      description: "Beherrschen Sie Pflanzenextraktion zuhause: Mazeration, präziser Aufguss und A/B-Sequenzierung für empfindliche Pflanzenstoffe."
    },
    'huile-infusee': {
      title: "Ölmazerate Selbstgemacht | Präzisions-Anleitung | Bloom",
      description: "Praxis-Leitfaden für Kräuteröle: Auswahl nativer Trägeröle, sanfte Mazeration bei 45°C und Schutz fettlöslicher Pflanzenstoffe."
    },
    'teinture-mere': {
      title: "Urtinkturen | Hydroalkoholische Extraktion | Bloom",
      description: "Urtinkturen und hydroalkoholische Auszüge in der Kräuterkunde verstehen (Kaltmazeration im Glas und alkoholfreie Alternativen mit BloomLab®)."
    },
    academie: {
      title: "Bloom Academy — A/B-Methode, Totum & Wissensleitfäden",
      description: "Edukative Leitfäden über Pflanzentotum, A/B-Sequenzierung und botanische Protokolle — ohne medizinische Heilversprechen."
    },
    'phytotherapie-reset': {
      title: "Homöostatischer Reset: 6-Phasen-Terrain-Konzept | Bloom",
      description: "Edukatives 6-Phasen-Konzept rund um Ausscheidungswege, Homöostase und präzise Extraktionen mit der BloomLab®."
    },
    'reset-homeostasique': {
      title: "Homöostatischer Reset: 6-Phasen-Terrain-Konzept | Bloom",
      description: "Edukatives 6-Phasen-Konzept rund um Ausscheidungswege, Homöostase und präzise Extraktionen mit der BloomLab®."
    },
    herbier: {
      title: "Interaktives Heilpflanzen-Herbarium | Monographien | Bloom",
      description: "Entdecken Sie unsere Pflanzenmonographien: Leitsubstanzen, verwendete Pflanzenteile, Extraktionstemperaturen und Hinweise."
    },
    library: {
      title: "Interaktives Heilpflanzen-Herbarium | Monographien | Bloom",
      description: "Entdecken Sie unsere Pflanzenmonographien: Leitsubstanzen, verwendete Pflanzenteile, Extraktionstemperaturen und Hinweise."
    },
    herbarium: {
      title: "Interaktives Heilpflanzen-Herbarium | Monographien | Bloom",
      description: "Entdecken Sie unsere Pflanzenmonographien: Leitsubstanzen, verwendete Pflanzenteile, Extraktionstemperaturen und Hinweise."
    },
    bibliotheque: {
      title: "Wissensbibliothek & Protokolle | Bloom Academy",
      description: "Alle Lernressourcen der Bloom Academy: Physiologie-Dossiers, Extraktionsbögen und botanische Monographien."
    },
    'library-landing': {
      title: "Wissensbibliothek & Protokolle | Bloom Academy",
      description: "Alle Lernressourcen der Bloom Academy: Physiologie-Dossiers, Extraktionsbögen und botanische Monographien."
    },
    boutique: {
      title: "Bio-Heilpflanzen & Botanische Kits für Zuhause | Bloom by BotaniK",
      description: "Offizieller Bloom by BotaniK Shop: BloomLab®-Extraktor, Bio-Heilpflanzen-Mischungen, Filter und Zubehör."
    },
    'boutique-kits': {
      title: "Bio-Heilpflanzen & Botanische Kits für Zuhause | Bloom by BotaniK",
      description: "Abgestimmte Bio-Pflanzenmischungen und Anleitungen für Aufgüsse, Öle und Naturpflege mit der BloomLab®."
    },
    'kits-botaniques': {
      title: "Bio-Heilpflanzen & Botanische Kits für Zuhause | Bloom by BotaniK",
      description: "Abgestimmte Bio-Pflanzenmischungen und Anleitungen für Aufgüsse, Öle und Naturpflege mit der BloomLab®."
    },
    abonnement: {
      title: "Bloom by BotaniK Abo | Edukative Protokolle & ALMA",
      description: "Abonnement für 59 €/Monat: Vollzugriff auf die Bloom Academy, A/B-Extraktionsbögen und geführten ALMA-Check."
    },
    manifeste: {
      title: "Bloom Manifest | Botanische Präzision & Naturwissen",
      description: "Das Bloom by BotaniK Manifest: moderne Temperaturpräzision vereint mit traditioneller Pflanzenkunde."
    },
    'la-marque': {
      title: "Über Bloom by BotaniK | Bio-Anbaugebiete & Präzision",
      description: "Lernen Sie Bloom by BotaniK kennen: sorgfältig ausgewählte Bio-Heilpflanzen, französische Protokolle und Transparenz."
    },
    'questions-frequentes': {
      title: "FAQ Pflanzenextraktor | BloomLab® Support & Versand | Bloom",
      description: "Häufige Fragen zur BloomLab®: 304-Edelstahl-Pflege, zugelassene Lösungsmittel, Garantie und Versand innerhalb von 24–48 Std."
    },
    faq: {
      title: "Hilfe-Center & Praktische Antworten | Bloom by BotaniK",
      description: "Schnelle Antworten zum Alltag mit der BloomLab®, Auto-Reinigung, Kräuterauswahl, Lieferung und Bestellung."
    },
    'totum-vegetal': {
      title: "Pflanzentotum vs. Einzelmoleküle | Synergie Ganzer Pflanzen",
      description: "Warum das gesamte Pflanzentotum isolierten Stoffen überlegen ist: Kofaktor-Synergie, Verträglichkeit und Bioverfügbarkeit."
    },
    'plantes-adaptogenes': {
      title: "Adaptogene Pflanzen | HPA-Achse, Cortisol & Resilienz | Bloom",
      description: "Ashwagandha, Rosenwurz, Taigawurzel: edukativer Praxisguide zu adaptogenen Wurzeln und schonender Extraktion."
    },
    cosmetiques: {
      title: "Naturkosmetik Selbstgemacht | Seren & Mazerate | Bloom",
      description: "Pflanzen-Haaröle, Balsame und Gesichtsseren mit Rosmarin, Ringelblume und BloomLab® selbst herstellen."
    },
    'cosmetique-botanique': {
      title: "Naturkosmetik Selbstgemacht | Seren & Mazerate | Bloom",
      description: "Pflanzen-Haaröle, Balsame und Gesichtsseren mit Rosmarin, Ringelblume und BloomLab® selbst herstellen."
    },
    'cosmetiques-naturels-diy': {
      title: "Naturkosmetik Selbstgemacht | Seren & Mazerate | Bloom",
      description: "Pflanzen-Haaröle, Balsame und Gesichtsseren mit Rosmarin, Ringelblume und BloomLab® selbst herstellen."
    },
    culinaire: {
      title: "Botanische Küche | Aromatisierte Öle & Kraftbrühen | Bloom",
      description: "Präzise botanische Küche: Kräuteröle, aromatische Essige und Pflanzenbrühen mit der BloomLab® verfeinern."
    },
    'gastronomie-botanique': {
      title: "Botanische Küche | Aromatisierte Öle & Kraftbrühen | Bloom",
      description: "Präzise botanische Küche: Kräuteröle, aromatische Essige und Pflanzenbrühen mit der BloomLab® verfeinern."
    },
    lexique: {
      title: "Botanisches Glossar | Begriffe der Extraktion | Bloom",
      description: "Klare Definitionen botanischer Fachbegriffe: Pflanzentotum, allostatische Last, Polarität und A/B-Sequenzierung."
    },
    blog: {
      title: "Botanisches Journal | Extraktionswissenschaft & Pflege | Bloom",
      description: "Das Bloom Journal: wissenschaftliche Einordnungen, Pflanzenporträts, Extraktions-Guides und Ideen für zuhause."
    },
    articles: {
      title: "Wissensartikel | Präzise Pflanzenextraktion | Bloom",
      description: "Fachartikel über Pflanzenextraktion, Lösungsmittel-Kunde, Adaptogene und kontrollierte Mazeration."
    },
    recettes: {
      title: "Botanische Rezepte & Formeln: Aufgüsse, Öle & Pflege | Bloom",
      description: "Kalibrierte Extraktionsrezepte: Verhältnisse, Temperaturen und Lösungsmittel für eigene Pflege mit der BloomLab®."
    },
    'recettes-hub': {
      title: "Botanische Rezepte & Formeln: Aufgüsse, Öle & Pflege | Bloom",
      description: "Kalibrierte Extraktionsrezepte: Verhältnisse, Temperaturen und Lösungsmittel für eigene Pflege mit der BloomLab®."
    },
    contact: {
      title: "Kontakt & Botanischer Support | Bloom by BotaniK",
      description: "Fragen zur BloomLab® oder unseren Bio-Heilpflanzen-Kits? Kontaktieren Sie unser Team in Frankreich (Antwort in 24–48 Std.)."
    },
    'infusion-precision': {
      title: "Präzisions-Infusion: Temperatur, Bewegung & Wirkstoffe | Bloom",
      description: "Wie nominelle Temperaturregelung und sanfte Zirkulation dabei helfen, empfindliche Aromastoffe in Aufgüssen zu schützen."
    },
    'totum-definition': {
      title: "Definition des Pflanzentotums | Synergie Ganzer Pflanzen | Bloom",
      description: "Was das Pflanzentotum ausmacht: Zusammenspiel von Kofaktoren, traditionelle Einordnung und Schutz empfindlicher Stoffe."
    },
    'solvants-extraction': {
      title: "Lösungsmittel der Pflanzenextraktion: Polarität & Öle | Bloom",
      description: "Übersicht natürlicher Lösungsmittel (Wasser, Trägeröle, Glycerin und Kaltmazeration mit Alkohol) und Extraktionstemperaturen."
    }
  }
};

function resolveClientCanonicalOverride(normalizedPath: string): string | null {
  if (
    normalizedPath === '/bloomlab/' ||
    normalizedPath === '/boutique/bloomlab/' ||
    normalizedPath === '/produit/bloomlab/' ||
    normalizedPath === '/machine/' ||
    normalizedPath === '/infuseur-botanique/'
  ) {
    return '/bloomlab/';
  }

  if (
    normalizedPath === '/academie/comprendre-le-corps/7-terrains/' ||
    normalizedPath === '/comprendre-le-corps/7-terrains/' ||
    normalizedPath === '/terrains/'
  ) {
    return '/academie/comprendre-le-corps/7-terrains/';
  }

  if (
    normalizedPath === '/academie/reset-homeostasique/' ||
    normalizedPath === '/academie/comprendre-le-corps/reset-homeostasique/' ||
    normalizedPath === '/comprendre-le-corps/reset-homeostasique/' ||
    normalizedPath === '/reset-homeostasique/' ||
    normalizedPath === '/phytotherapie-reset/' ||
    normalizedPath === '/phytotherapie/'
  ) {
    return '/academie/reset-homeostasique/';
  }

  if (
    normalizedPath === '/academie/protocoles/' ||
    normalizedPath === '/protocoles/' ||
    normalizedPath.startsWith('/protocoles/') ||
    normalizedPath.startsWith('/protocoles-systemiques/') ||
    normalizedPath.startsWith('/phytotherapie-reset/') ||
    normalizedPath === '/votre-pratique/' ||
    normalizedPath === '/parcours/'
  ) {
    return '/academie/protocoles/';
  }

  return null;
}

export function updateDocumentSEO(config?: any, _lang?: any, productId?: string, _slug?: string) {
  if (typeof document === 'undefined' || !config) return;

  const langKey: 'fr' | 'en' | 'de' = _lang === 'en' ? 'en' : _lang === 'de' ? 'de' : 'fr';

  if (typeof config === 'string') {
    const isNoindex = NOINDEX_VIEWS.has(config);
    const hasActiveSeoHead = Boolean(
      document.head.querySelector('meta[name="seo-head-active"][content="true"]')
    );

    if (
      hasActiveSeoHead &&
      (config === 'indexbis' || config === 'home' || config === 'machine' || config === 'bloomlab' || config === 'product-detail')
    ) {
      return;
    }

    if (config === 'indexbis' || config === 'home') {
      const homeSeo = langKey === 'fr' ? { title: HOME_TITLE, description: HOME_DESCRIPTION } : HOME_SEO_I18N[langKey];
      applySEOMetadata(homeSeo.title, homeSeo.description, 'https://bloombybotanik.com/', false);
      return;
    }

    if (config !== 'faq') {
      document.getElementById('bloom-ssr-schema')?.remove();
    }

    // Sur toute navigation client hors accueil, préserver Organization + WebSite tout en retirant Product/FAQ/HowTo de la home
    const rootSchemaEl = document.getElementById('bloom-root-schema');
    if (rootSchemaEl && rootSchemaEl.textContent?.includes('FAQPage')) {
      rootSchemaEl.textContent = JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Organization',
            '@id': 'https://bloombybotanik.com/#organization',
            name: 'Bloom by BotaniK',
            url: 'https://bloombybotanik.com',
            logo: {
              '@type': 'ImageObject',
              url: 'https://bloombybotanik.com/assets/img/logo-bloom-square-512.png',
              width: 512,
              height: 512,
            },
            sameAs: [
              'https://www.instagram.com/bloombybotanik/',
              'https://www.tiktok.com/@bloombybotanik',
              'https://www.youtube.com/@BloomByBotanik',
              'https://fr.pinterest.com/bloombybotanik',
              'https://www.facebook.com/profile.php?id=61577892110122',
              'https://www.amazon.fr/dp/B0F7GGTMNR',
            ],
          },
          {
            '@type': 'WebSite',
            '@id': 'https://bloombybotanik.com/#website',
            url: 'https://bloombybotanik.com',
            name: 'Bloom by BotaniK',
            publisher: { '@id': 'https://bloombybotanik.com/#organization' },
          },
        ],
      });
    }

    if (config === 'product-detail' && productId && PRODUCT_SEO_MAP[productId]) {
      const prod = PRODUCT_SEO_MAP[productId];
      const localizedProd = langKey !== 'fr' ? PRODUCT_SEO_I18N[langKey][productId] : undefined;
      const cleanPath = (prod.path || `/boutique/${productId}/`).replace(/\/?$/, '/');
      applySEOMetadata(localizedProd?.title || prod.title, localizedProd?.description || prod.description, `https://bloombybotanik.com${cleanPath}`, false);
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
      const localizedEntry = langKey !== 'fr' ? VIEW_SEO_I18N[langKey].guide : undefined;
      applySEOMetadata(localizedEntry?.title || entry.title, localizedEntry?.description || entry.description, 'https://bloombybotanik.com/infusion-botanique/', false);
      return;
    }

    if (normalizedCurrent === '/reset-homeostasique/') {
      const resetSeo =
        langKey === 'en'
          ? {
              title: "Homeostatic Reset: 6-Phase Systemic Tuning | Bloom by BotaniK",
              description: "Understand allostatic load with Bloom by BotaniK and explore the 6-phase educational framework with BloomLab® to support homeostasis."
            }
          : langKey === 'de'
          ? {
              title: "Homöostatischer Reset: Systemische 6-Phasen-Abstimmung | Bloom by BotaniK",
              description: "Verstehen Sie allostatische Belastung mit Bloom by BotaniK und entdecken Sie das 6-Phasen-Konzept mit der BloomLab® für mehr Balance."
            }
          : {
              title: "Reset Homéostasique : Accordage Systémique en 6 Phases | Bloom by BotaniK",
              description: "Comprenez la charge allostatique avec Bloom by BotaniK et explorez l'accordage biologique en 6 phases avec BloomLab® pour soutenir l'homéostasie."
            };
      applySEOMetadata(
        resetSeo.title,
        resetSeo.description,
        'https://bloombybotanik.com/academie/reset-homeostasique/',
        false
      );
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

    const canonicalOverride = resolveClientCanonicalOverride(normalizedCurrent);
    const mapped = VIEW_SEO_MAP[config];
    if (mapped) {
      const localizedMapped = langKey !== 'fr' ? VIEW_SEO_I18N[langKey][config] : undefined;
      const targetPath = canonicalOverride || mapped.path || VIEW_PATHS[config] || normalizedCurrent || '/';
      const cleanPath = targetPath.endsWith('/') ? targetPath : `${targetPath}/`;
      const canonical = `https://bloombybotanik.com${cleanPath === '//' ? '/' : cleanPath}`;
      applySEOMetadata(localizedMapped?.title || mapped.title, localizedMapped?.description || mapped.description, canonical, isNoindex);
      return;
    }

    if (VIEW_PATHS[config]) {
      const targetPath = canonicalOverride || VIEW_PATHS[config];
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
