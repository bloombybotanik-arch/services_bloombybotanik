export interface ExtractionParams {
  temp: string;
  temps: string;
  solvant: string;
  ratio: string;
  usage: string;
}

export interface CulinaryPlantData {
  plant_id: string;
  nom_commun: string;
  profil_aromatique: string;
  parametres_bloomlab: {
    huile_finition?: ExtractionParams;
    beurre_ghee?: ExtractionParams;
    miel?: ExtractionParams;
    vinaigre?: ExtractionParams;
    sucre?: ExtractionParams;
  };
  synergies_aliments: string[];
  astuce_chef_bloom: string;
}

export const culinaryDatabase: CulinaryPlantData[] = [
  {
    plant_id: "romarin_culinaire", nom_commun: "Romarin à Cinéole", profil_aromatique: "Boisé, camphré, notes d'eucalyptus",
    parametres_bloomlab: {
      huile_finition: {temp: "50°C", temps: "1h30", solvant: "Huile d'olive extra-vierge", ratio: "25g/500ml", usage: "Pommes de terre rôties, agneau, poissons gras"},
      beurre_ghee: {temp: "45°C", temps: "1h00", solvant: "Ghee", ratio: "20g/250g", usage: "Finition steaks, pâtes fraîches"},
      miel: {temp: "40°C", temps: "1h00", solvant: "Miel d'acacia", ratio: "15g/250ml", usage: "Marinades sucrées-salées, infusions digestives"}
    },
    synergies_aliments: ["Agneau", "Poulet rôti", "Pommes de terre", "Saumon", "Lentilles", "Focaccia"],
    astuce_chef_bloom: "Ne cuisinez JAMAIS avec cette huile. Versez-la EN FINITION, une fois le plat dans l'assiette. La chaleur de l'aliment suffira à libérer les arômes sans brûler le cinéole."
  },
  {
    plant_id: "thym_culinaire", nom_commun: "Thym commun", profil_aromatique: "Herbacé, poivré, légèrement camphré",
    parametres_bloomlab: {
      huile_finition: {temp: "50°C", temps: "1h30", solvant: "Huile d'olive", ratio: "25g/500ml", usage: "Pizzas, grillades, tomates confites"},
      beurre_ghee: {temp: "45°C", temps: "1h00", solvant: "Ghee", ratio: "20g/250g", usage: "Escargots, moules marinières"},
      vinaigre: {temp: "40°C", temps: "1h00", solvant: "Vinaigre de cidre", ratio: "15g/500ml", usage: "Vinaigrettes, marinades de viande rouge"}
    },
    synergies_aliments: ["Tomate", "Ail", "Olives", "Gigot d'agneau", "Fromages de chèvre"],
    astuce_chef_bloom: "Filtrez TRÈS finement avec le sac filtre fournit, la préparation encore tiède. Pressez fermement le marc."
  },
  {
    plant_id: "basilic_culinaire", nom_commun: "Basilic grand vert", profil_aromatique: "Anisé, poivré, frais, très volatil",
    parametres_bloomlab: {
      huile_finition: {temp: "40°C", temps: "1h00", solvant: "Huile de pépins de raisin (neutre)", ratio: "30g/500ml", usage: "Pesto, carpaccio, tomates"},
      vinaigre: {temp: "35°C", temps: "45min", solvant: "Vinaigre blanc", ratio: "20g/500ml", usage: "Vinaigre aromatique pour salades d'été"}
    },
    synergies_aliments: ["Tomate", "Mozzarella", "Fraises", "Pâtes", "Courgettes"],
    astuce_chef_bloom: "Le basilic est ultra-thermolabile. Ne dépassez JAMAIS 40°C dans la BloomLab. L'huile de pépins de raisin est idéale car elle ne masque pas l'arôme subtil du basilic."
  },
  {
    plant_id: "origan_culinaire", nom_commun: "Origan compact", profil_aromatique: "Intense, camphré, chaud",
    parametres_bloomlab: {
      huile_finition: {temp: "45°C", temps: "1h30", solvant: "Huile d'olive", ratio: "20g/500ml", usage: "Pizzas, pâtes, salades grecques"},
      beurre_ghee: {temp: "40°C", temps: "1h00", solvant: "Ghee", ratio: "15g/250g", usage: "Grillades, légumes rôtis"}
    },
    synergies_aliments: ["Tomate", "Mozzarella", "Olives", "Aubergine", "Agneau"],
    astuce_chef_bloom: "L' 'Huile de Pizza Bloom' : origan + thym + basilic extraits à 45°C dans l'huile d'olive. Versez sur la pizza APRÈS cuisson. L'arôme est décuplé."
  },
  {
    plant_id: "laurier_culinaire", nom_commun: "Laurier sauce", profil_aromatique: "Boisé, floral, légèrement amer",
    parametres_bloomlab: {
      huile_finition: {temp: "50°C", temps: "2h00", solvant: "Huile d'olive", ratio: "15g/500ml", usage: "Marinades, daubes, confits"},
      beurre_ghee: {temp: "45°C", temps: "1h30", solvant: "Ghee", ratio: "10g/250g", usage: "Sauces crème, poissons"}
    },
    synergies_aliments: ["Bœuf bourguignon", "Lentilles", "Poulet rôti", "Sauces tomates mijotées"],
    astuce_chef_bloom: "Le laurier est une plante dure. L'extraction à 50°C pendant 2h dans l'huile permet de capturer les notes florales sans l'amertume excessive de l'ébullition."
  },
  {
    plant_id: "sauge_culinaire", nom_commun: "Sauge officinale", profil_aromatique: "Camphré, eucalyptus, légèrement amer",
    parametres_bloomlab: {
      beurre_ghee: {temp: "45°C", temps: "1h00", solvant: "Ghee", ratio: "15g/250g", usage: "Ravioles, gnocchis, viandes blanches"},
      huile_finition: {temp: "50°C", temps: "1h30", solvant: "Huile d'olive", ratio: "15g/500ml", usage: "Fois gras, canard"}
    },
    synergies_aliments: ["Beurre noisette", "Gnocchis", "Porc", "Canard", "Fromages à pâte molle"],
    astuce_chef_bloom: "Le 'Beurre de Sauge Bloom' : extraction dans le ghee à 45°C. Faites mousser ce beurre dans une poêle chaude et nappez vos gnocchis. Un régal."
  },
  {
    plant_id: "menthe_culinaire", nom_commun: "Menthe poivrée", profil_aromatique: "Frais, mentholé, très volatil",
    parametres_bloomlab: {
      huile_finition: {temp: "40°C", temps: "1h00", solvant: "Huile de pépins de raisin", ratio: "25g/500ml", usage: "Salades, taboulé, desserts"},
      miel: {temp: "35°C", temps: "45min", solvant: "Miel d'acacia", ratio: "15g/250ml", usage: "Thé, yaourts, fruits rouges"}
    },
    synergies_aliments: ["Agneau", "Taboulé", "Chocolat", "Fraises", "Thé vert"],
    astuce_chef_bloom: "La menthe perd 80% de son menthol à l'air libre. L'extraction en milieu fermé (BloomLab) à 40°C capture 100% de la fraîcheur."
  },
  {
    plant_id: "estragon_culinaire", nom_commun: "Estragon", profil_aromatique: "Anisé, réglissé, délicat",
    parametres_bloomlab: {
      vinaigre: {temp: "40°C", temps: "1h00", solvant: "Vinaigre blanc", ratio: "20g/500ml", usage: "Sauce béarnaise, vinaigrettes fines"},
      huile_finition: {temp: "40°C", temps: "1h00", solvant: "Huile de tournesol oléique", ratio: "20g/500ml", usage: "Poulet, poissons délicats, œufs"}
    },
    synergies_aliments: ["Poulet", "Saumon", "Œufs mimosa", "Avocat", "Crevettes"],
    astuce_chef_bloom: "Le 'Vinaigre à l'Estragon Bloom' : remplace le vinaigre du commerce pour vos béarnaises. La différence de fraîcheur est sidérante."
  },
  {
    plant_id: "gingembre_culinaire", nom_commun: "Gingembre", profil_aromatique: "Piquant, citronné, chaud",
    parametres_bloomlab: {
      huile_finition: {temp: "50°C", temps: "1h30", solvant: "Huile de sésame", ratio: "30g/500ml", usage: "Wok, nouilles, poissons"},
      miel: {temp: "40°C", temps: "1h00", solvant: "Miel + citron", ratio: "20g/250ml", usage: "Shot immunité, marinades"}
    },
    synergies_aliments: ["Citron", "Sauce soja", "Coco", "Poisson", "Carotte"],
    astuce_chef_bloom: "Le 'Shot Immunité Bloom' : extrait glycériné de gingembre (fait en BloomLab) + citron pressé + pincée de Cayenne. 30ml le matin."
  },
  {
    plant_id: "curcuma_culinaire", nom_commun: "Curcuma", profil_aromatique: "Terreux, poivré, légèrement amer",
    parametres_bloomlab: {
      huile_finition: {temp: "55°C", temps: "2h00", solvant: "Huile de coco vierge", ratio: "30g/500ml", usage: "Curry maison, riz doré"},
      beurre_ghee: {temp: "50°C", temps: "1h30", solvant: "Ghee", ratio: "25g/250g", usage: "Beurre doré indien, naan, dahl"}
    },
    synergies_aliments: ["Coco", "Gingembre", "Cumin", "Légumineuses", "Riz basmati"],
    astuce_chef_bloom: "Règle d'or Bloom : Curcuma + Poivre + Gras. L'extraction dans le ghee à 50°C avec une pincée de poivre garantit une biodisponibilité maximale de la curcumine."
  },
  {
    plant_id: "cannelle_culinaire", nom_commun: "Cannelle de Ceylan", profil_aromatique: "Doux, épicé, boisé, sucré",
    parametres_bloomlab: {
      miel: {temp: "40°C", temps: "1h30", solvant: "Miel de fleurs", ratio: "15g/250ml", usage: "Tartines, lait chaud, pâtisseries"},
      huile_finition: {temp: "50°C", temps: "2h00", solvant: "Huile de coco", ratio: "15g/500ml", usage: "Porridge, compotes, courges rôties"}
    },
    synergies_aliments: ["Pomme", "Poire", "Chocolat", "Café", "Patate douce"],
    astuce_chef_bloom: "Le 'Miel à la Cannelle Bloom' : extraction à 40°C pour ne pas tuer les enzymes du miel. Sublime sur un yaourt ou un porridge du matin."
  },
  {
    plant_id: "cardamome_culinaire", nom_commun: "Cardamome verte", profil_aromatique: "Floral, citronné, eucalyptus, très puissant",
    parametres_bloomlab: {
      miel: {temp: "40°C", temps: "1h00", solvant: "Miel d'acacia", ratio: "5g/250ml", usage: "Thé, pâtisseries orientales"},
      huile_finition: {temp: "45°C", temps: "1h30", solvant: "Huile de pépins de raisin", ratio: "10g/500ml", usage: "Risottos, fruits de mer"}
    },
    synergies_aliments: ["Café", "Chocolat", "Riz pilaf", "Fruits rouges", "Agneau"],
    astuce_chef_bloom: "La cardamome est très puissante. 5g suffisent pour 250ml de miel. Concassez les gousses juste avant l'extraction pour libérer les huiles essentielles."
  },
  {
    plant_id: "lavande_culinaire", nom_commun: "Lavande (Angustifolia)", profil_aromatique: "Floral, camphré, délicat",
    parametres_bloomlab: {
      sucre: {temp: "40°C", temps: "1h00", solvant: "Sucre + fleurs", ratio: "10g/500g", usage: "Biscuits, crème brûlée"},
      miel: {temp: "35°C", temps: "1h00", solvant: "Miel de lavande", ratio: "10g/250ml", usage: "Yaourts, fromages frais"}
    },
    synergies_aliments: ["Chèvre", "Miel", "Citron", "Biscuits sablés", "Glaces"],
    astuce_chef_bloom: "Le 'Sucre de Lavande Bloom' : fleurs séchées mixées avec du sucre bio (1:10). Laissez reposer 2 semaines. Sublime sur une crème brûlée."
  },
  {
    plant_id: "citronnelle_culinaire", nom_commun: "Citronnelle", profil_aromatique: "Citronné, frais, herbacé",
    parametres_bloomlab: {
      huile_finition: {temp: "45°C", temps: "1h30", solvant: "Huile de coco", ratio: "25g/500ml", usage: "Cuisine thaï, wok, poissons"},
      miel: {temp: "40°C", temps: "1h00", solvant: "Miel d'acacia", ratio: "15g/250ml", usage: "Thé glacé, limonades"}
    },
    synergies_aliments: ["Coco", "Gingembre", "Crevettes", "Poulet", "Thé vert"],
    astuce_chef_bloom: "La citronnelle est fibreuse. L'extraction à 45°C dans l'huile de coco capture le citronnellal sans l'amertume des tiges broyées."
  },
  {
    plant_id: "girofle_culinaire", nom_commun: "Clou de girofle", profil_aromatique: "Chaud, boisé, très puissant, anesthésiant",
    parametres_bloomlab: {
      miel: {temp: "40°C", temps: "1h00", solvant: "Miel de châtaignier", ratio: "3g/250ml", usage: "Vin chaud, pain d'épices, marinades"},
      huile_finition: {temp: "45°C", temps: "1h30", solvant: "Huile d'olive", ratio: "5g/500ml", usage: "Pot-au-feu, daubes"}
    },
    synergies_aliments: ["Orange", "Cannelle", "Bœuf", "Chou rouge", "Pain d'épices"],
    astuce_chef_bloom: "Le girofle contient de l'eugénol (anesthésiant). 3g suffisent pour 250ml de miel. Idéal pour apaiser un mal de gorge en suçant une cuillère de ce miel."
  },
  {
    plant_id: "lycium_barbarum", nom_commun: "Goji", profil_aromatique: "Sucré, légèrement acidulé, notes de datte",
    parametres_bloomlab: {
      huile_finition: {temp: "72°C (A) / 45°C (B)", temps: "2h (A) + 3h (B)", solvant: "Eau (A) / Huile (B)", ratio: "40g/500ml", usage: "Bouillons de jeunesse, salades, porridges"},
      miel: {temp: "40°C", temps: "2h00", solvant: "Miel d'Acacia", ratio: "30g/250ml", usage: "Nappage desserts, thés régénérants"}
    },
    synergies_aliments: ["Jujube", "Thé blanc", "Amandes", "Yaourt", "Chia"],
    astuce_chef_bloom: "L'extraction biphasique BloomLab libère les caroténoïdes (peau) et les polysaccharides (énergie). Parfait pour un teint éclatant via l'alimentation."
  },
  {
    plant_id: "arctium_lappa", nom_commun: "Bardane", profil_aromatique: "Terreux, noisette, doux",
    parametres_bloomlab: {
      vinaigre: {temp: "65°C", temps: "3h00", solvant: "Vinaigre de riz", ratio: "30g/500ml", usage: "Légumes lacto-fermentés, sauces asiatiques"},
      huile_finition: {temp: "50°C", temps: "2h00", solvant: "Huile de sésame", ratio: "20g/500ml", usage: "Sauté de racines, soupe miso"}
    },
    synergies_aliments: ["Carotte", "Miso", "Sésame", "Champignons", "Algues"],
    astuce_chef_bloom: "La bardane est l'amie de la peau nette. Son extraction dans le vinaigre de riz crée une base de sauce délicieuse qui soutient le foie et purifie le teint."
  },
  {
    plant_id: "illicium_verum", nom_commun: "Badiane (Anis étoilé)", profil_aromatique: "Anisé puissant, réglissé, frais",
    parametres_bloomlab: {
      miel: {temp: "45°C", temps: "1h30", solvant: "Miel de forêt", ratio: "10g/250ml", usage: "Infusions d'après-repas, pâtisseries"},
      huile_finition: {temp: "50°C", temps: "1h30", solvant: "Huile de colza", ratio: "15g/500ml", usage: "Bouillons de poisson, canard, poires pochées"}
    },
    synergies_aliments: ["Poire", "Canard", "Chocolat noir", "Potiron", "Épices chaudes"],
    astuce_chef_bloom: "L'anéthol de la badiane est très stable à 50°C. Utilisez l'huile en finition sur une soupe de potiron pour une dimension aromatique fascinante."
  },
  {
    plant_id: "ziziphus_jujuba", nom_commun: "Jujube (Datte rouge)", profil_aromatique: "Sucré, boisé, profond",
    parametres_bloomlab: {
      miel: {temp: "45°C", temps: "2h30", solvant: "Miel crémeux", ratio: "40g/250ml", usage: "Soutien du sommeil, encas vitalité"},
      vinaigre: {temp: "55°C", temps: "2h00", solvant: "Vinaigre de cidre", ratio: "30g/500ml", usage: "Réduction pour sauces de viande"}
    },
    synergies_aliments: ["Goji", "Gingembre", "Noix", "Riz gluant", "Cannelle"],
    astuce_chef_bloom: "Le jujube est le fruit de la sérénité. Son extraction prolongée dans le miel à 45°C permet de capturer son énergie calme pour les périodes de stress."
  },
  {
    plant_id: "vigna_angularis", nom_commun: "Haricot Adzuki", profil_aromatique: "Légumineux, noisette, légèrement sucré",
    parametres_bloomlab: {
      sucre: {temp: "70°C", temps: "3h00", solvant: "Sirop de canne", ratio: "100g/500ml", usage: "Pâte de haricots rouges (Anko), desserts"},
      huile_finition: {temp: "60°C", temps: "2h00", solvant: "Huile de son de riz", ratio: "50g/500ml", usage: "Sauces onctueuses, plats macrobiotiques"}
    },
    synergies_aliments: ["Matcha", "Riz", "Lait de coco", "Sésame noir", "Goji"],
    astuce_chef_bloom: "Riche en saponines, l'adzuki extrait en sirop est une base parfaite pour des desserts qui ne surchargent pas le système lymphatique."
  }
];
