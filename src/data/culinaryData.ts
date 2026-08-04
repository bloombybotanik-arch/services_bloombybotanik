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

import { Language } from '../translations';

export const culinaryDatabaseFR: CulinaryPlantData[] = [
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

export const culinaryDatabaseEN: CulinaryPlantData[] = [
  {
    plant_id: "romarin_culinaire", nom_commun: "Rosemary", profil_aromatique: "Woody, camphorated, eucalyptus notes",
    parametres_bloomlab: {
      huile_finition: {temp: "50°C", temps: "1h30", solvant: "Extra-virgin olive oil", ratio: "25g/500ml", usage: "Roasted potatoes, lamb, fatty fish"},
      beurre_ghee: {temp: "45°C", temps: "1h00", solvant: "Ghee", ratio: "20g/250g", usage: "Steak finishing, fresh pasta"},
      miel: {temp: "40°C", temps: "1h00", solvant: "Acacia honey", ratio: "15g/250ml", usage: "Sweet and savory marinades, digestive infusions"}
    },
    synergies_aliments: ["Lamb", "Roasted chicken", "Potatoes", "Salmon", "Lentils", "Focaccia"],
    astuce_chef_bloom: "NEVER cook with this oil. Pour it as a FINISH once the dish is on the plate. The heat from the food will be enough to release the aromas without burning the cineole."
  },
  {
    plant_id: "thym_culinaire", nom_commun: "Common Thyme", profil_aromatique: "Herbaceous, peppery, slightly camphorated",
    parametres_bloomlab: {
      huile_finition: {temp: "50°C", temps: "1h30", solvant: "Olive oil", ratio: "25g/500ml", usage: "Pizzas, grills, candied tomatoes"},
      beurre_ghee: {temp: "45°C", temps: "1h00", solvant: "Ghee", ratio: "20g/250g", usage: "Snails, moules marinières"},
      vinaigre: {temp: "40°C", temps: "1h00", solvant: "Cider vinegar", ratio: "15g/500ml", usage: "Vinaigrettes, red meat marinades"}
    },
    synergies_aliments: ["Tomato", "Garlic", "Olives", "Leg of lamb", "Goat cheese"],
    astuce_chef_bloom: "Filter VERY finely with the filter bag provided while the preparation is still warm. Press the marc firmly."
  },
  {
    plant_id: "basilic_culinaire", nom_commun: "Sweet Basil", profil_aromatique: "Anise, peppery, fresh, very volatile",
    parametres_bloomlab: {
      huile_finition: {temp: "40°C", temps: "1h00", solvant: "Grape seed oil (neutral)", ratio: "30g/500ml", usage: "Pesto, carpaccio, tomatoes"},
      vinaigre: {temp: "35°C", temps: "45min", solvant: "White vinegar", ratio: "20g/500ml", usage: "Aromatic vinegar for summer salads"}
    },
    synergies_aliments: ["Tomato", "Mozzarella", "Strawberries", "Pasta", "Zucchini"],
    astuce_chef_bloom: "Basil is ultra-thermolabile. NEVER exceed 40°C in the BloomLab. Grape seed oil is ideal because it doesn't mask basil's subtle aroma."
  },
  {
    plant_id: "origan_culinaire", nom_commun: "Oregano", profil_aromatique: "Intense, camphorated, warm",
    parametres_bloomlab: {
      huile_finition: {temp: "45°C", temps: "1h30", solvant: "Olive oil", ratio: "20g/500ml", usage: "Pizzas, pasta, Greek salads"},
      beurre_ghee: {temp: "40°C", temps: "1h00", solvant: "Ghee", ratio: "15g/250g", usage: "Grills, roasted vegetables"}
    },
    synergies_aliments: ["Tomato", "Mozzarella", "Olives", "Eggplant", "Lamb"],
    astuce_chef_bloom: "Bloom 'Pizza Oil': oregano + thyme + basil extracted at 45°C in olive oil. Pour on pizza AFTER cooking. The aroma is intensified."
  },
  {
    plant_id: "laurier_culinaire", nom_commun: "Bay Leaf", profil_aromatique: "Woody, floral, slightly bitter",
    parametres_bloomlab: {
      huile_finition: {temp: "50°C", temps: "2h00", solvant: "Olive oil", ratio: "15g/500ml", usage: "Marinades, stews, confits"},
      beurre_ghee: {temp: "45°C", temps: "1h30", solvant: "Ghee", ratio: "10g/250g", usage: "Cream sauces, fish"}
    },
    synergies_aliments: ["Beef bourguignon", "Lentils", "Roasted chicken", "Simmered tomato sauces"],
    astuce_chef_bloom: "Bay leaf is a hard plant. Extraction at 50°C for 2h in oil allows capturing floral notes without the excessive bitterness of boiling."
  },
  {
    plant_id: "sauge_culinaire", nom_commun: "Sage", profil_aromatique: "Camphorated, eucalyptus, slightly bitter",
    parametres_bloomlab: {
      beurre_ghee: {temp: "45°C", temps: "1h00", solvant: "Ghee", ratio: "15g/250g", usage: "Ravioli, gnocchi, white meats"},
      huile_finition: {temp: "50°C", temps: "1h30", solvant: "Olive oil", ratio: "15g/500ml", usage: "Foie gras, duck"}
    },
    synergies_aliments: ["Brown butter", "Gnocchi", "Pork", "Duck", "Soft cheeses"],
    astuce_chef_bloom: "Bloom 'Sage Butter': extraction in ghee at 45°C. Brown this butter in a hot pan and coat your gnocchi. A delight."
  },
  {
    plant_id: "menthe_culinaire", nom_commun: "Peppermint", profil_aromatique: "Fresh, minty, very volatile",
    parametres_bloomlab: {
      huile_finition: {temp: "40°C", temps: "1h00", solvant: "Grape seed oil", ratio: "25g/500ml", usage: "Salads, tabbouleh, desserts"},
      miel: {temp: "35°C", temps: "45min", solvant: "Acacia honey", ratio: "15g/250ml", usage: "Tea, yogurts, red fruits"}
    },
    synergies_aliments: ["Lamb", "Tabbouleh", "Chocolate", "Strawberries", "Green tea"],
    astuce_chef_bloom: "Mint loses 80% of its menthol in the open air. Extraction in a closed environment (BloomLab) at 40°C captures 100% of the freshness."
  },
  {
    plant_id: "estragon_culinaire", nom_commun: "Tarragon", profil_aromatique: "Aniseed, licorice, delicate",
    parametres_bloomlab: {
      vinaigre: {temp: "40°C", temps: "1h00", solvant: "White vinegar", ratio: "20g/500ml", usage: "Béarnaise sauce, fine vinaigrettes"},
      huile_finition: {temp: "40°C", temps: "1h00", solvant: "Oleic sunflower oil", ratio: "20g/500ml", usage: "Chicken, delicate fish, eggs"}
    },
    synergies_aliments: ["Chicken", "Salmon", "Deviled eggs", "Avocado", "Shrimp"],
    astuce_chef_bloom: "Bloom 'Tarragon Vinegar': replaces commercial vinegar for your béarnaise. The difference in freshness is astounding."
  },
  {
    plant_id: "gingembre_culinaire", nom_commun: "Ginger", profil_aromatique: "Piquant, lemony, warm",
    parametres_bloomlab: {
      huile_finition: {temp: "50°C", temps: "1h30", solvant: "Sesame oil", ratio: "30g/500ml", usage: "Wok, noodles, fish"},
      miel: {temp: "40°C", temps: "1h00", solvant: "Honey + lemon", ratio: "20g/250ml", usage: "Immunity shot, marinades"}
    },
    synergies_aliments: ["Lemon", "Soy sauce", "Coconut", "Fish", "Carrot"],
    astuce_chef_bloom: "Bloom 'Immunity Shot': glycerin ginger extract (made in BloomLab) + squeezed lemon + pinch of Cayenne. 30ml in the morning."
  },
  {
    plant_id: "curcuma_culinaire", nom_commun: "Turmeric", profil_aromatique: "Earthy, peppery, slightly bitter",
    parametres_bloomlab: {
      huile_finition: {temp: "55°C", temps: "2h00", solvant: "Virgin coconut oil", ratio: "30g/500ml", usage: "Homemade curry, golden rice"},
      beurre_ghee: {temp: "50°C", temps: "1h30", solvant: "Ghee", ratio: "25g/250g", usage: "Indian golden butter, naan, dahl"}
    },
    synergies_aliments: ["Coconut", "Ginger", "Cumin", "Legumes", "Basmati rice"],
    astuce_chef_bloom: "Bloom golden rule: Turmeric + Pepper + Fat. Extraction in ghee at 50°C with a pinch of pepper guarantees maximum bioavailability of curcumin."
  },
  {
    plant_id: "cannelle_culinaire", nom_commun: "Ceylon Cinnamon", profil_aromatique: "Sweet, spicy, woody",
    parametres_bloomlab: {
      miel: {temp: "40°C", temps: "1h30", solvant: "Flower honey", ratio: "15g/250ml", usage: "Toast, hot milk, pastries"},
      huile_finition: {temp: "50°C", temps: "2h00", solvant: "Coconut oil", ratio: "15g/500ml", usage: "Porridge, compotes, roasted squash"}
    },
    synergies_aliments: ["Apple", "Pear", "Chocolate", "Coffee", "Sweet potato"],
    astuce_chef_bloom: "Bloom 'Cinnamon Honey': extraction at 40°C so as not to kill honey enzymes. Sublime on yogurt or morning porridge."
  },
  {
    plant_id: "cardamome_culinaire", nom_commun: "Green Cardamom", profil_aromatique: "Floral, lemony, eucalyptus, very powerful",
    parametres_bloomlab: {
      miel: {temp: "40°C", temps: "1h00", solvant: "Acacia honey", ratio: "5g/250ml", usage: "Tea, oriental pastries"},
      huile_finition: {temp: "45°C", temps: "1h30", solvant: "Grape seed oil", ratio: "10g/500ml", usage: "Risottos, seafood"}
    },
    synergies_aliments: ["Coffee", "Chocolate", "Pilaf rice", "Red fruits", "Lamb"],
    astuce_chef_bloom: "Cardamom is very powerful. 5g are enough for 250ml of honey. Crush the pods just before extraction to release essential oils."
  },
  {
    plant_id: "lavande_culinaire", nom_commun: "Lavender", profil_aromatique: "Floral, camphorated, delicate",
    parametres_bloomlab: {
      sucre: {temp: "40°C", temps: "1h00", solvant: "Sugar + flowers", ratio: "10g/500g", usage: "Biscuits, crème brûlée"},
      miel: {temp: "35°C", temps: "1h00", solvant: "Lavender honey", ratio: "10g/250ml", usage: "Yogurts, fresh cheeses"}
    },
    synergies_aliments: ["Goat cheese", "Honey", "Lemon", "Shortbread cookies", "Ice cream"],
    astuce_chef_bloom: "Bloom 'Lavender Sugar': dried flowers mixed with organic sugar (1:10). Let it rest for 2 weeks. Sublime on a crème brûlée."
  },
  {
    plant_id: "citronnelle_culinaire", nom_commun: "Lemongrass", profil_aromatique: "Lemony, fresh, herbaceous",
    parametres_bloomlab: {
      huile_finition: {temp: "45°C", temps: "1h30", solvant: "Coconut oil", ratio: "25g/500ml", usage: "Thai cuisine, wok, fish"},
      miel: {temp: "40°C", temps: "1h00", solvant: "Acacia honey", ratio: "15g/250ml", usage: "Iced tea, lemonades"}
    },
    synergies_aliments: ["Coconut", "Ginger", "Shrimp", "Chicken", "Green tea"],
    astuce_chef_bloom: "Lemongrass is fibrous. Extraction at 45°C in coconut oil captures citronnellal without the bitterness of crushed stems."
  },
  {
    plant_id: "girofle_culinaire", nom_commun: "Clove", profil_aromatique: "Warm, woody, very powerful, numbing",
    parametres_bloomlab: {
      miel: {temp: "40°C", temps: "1h00", solvant: "Chestnut honey", ratio: "3g/250ml", usage: "Mulled wine, gingerbread, marinades"},
      huile_finition: {temp: "45°C", temps: "1h30", solvant: "Olive oil", ratio: "5g/500ml", usage: "Pot-au-feu, stews"}
    },
    synergies_aliments: ["Orange", "Cinnamon", "Beef", "Red cabbage", "Gingerbread"],
    astuce_chef_bloom: "Clove contains eugenol (numbing). 3g are enough for 250ml of honey. Ideal to soothe a sore throat by sucking a spoon of this honey."
  },
  {
    plant_id: "lycium_barbarum", nom_commun: "Goji Berry", profil_aromatique: "Sweet, slightly tangy, date notes",
    parametres_bloomlab: {
      huile_finition: {temp: "72°C (A) / 45°C (B)", temps: "2h (A) + 3h (B)", solvant: "Water (A) / Oil (B)", ratio: "40g/500ml", usage: "Youth broths, salads, porridges"},
      miel: {temp: "40°C", temps: "2h00", solvant: "Acacia Honey", ratio: "30g/250ml", usage: "Dessert topping, regenerating teas"}
    },
    synergies_aliments: ["Jujube", "White tea", "Almonds", "Yogurt", "Chia"],
    astuce_chef_bloom: "BloomLab biphasic extraction releases carotenoids (skin) and polysaccharides (energy). Perfect for a glowing complexion through diet."
  },
  {
    plant_id: "arctium_lappa", nom_commun: "Burdock", profil_aromatique: "Earthy, nutty, sweet",
    parametres_bloomlab: {
      vinaigre: {temp: "65°C", temps: "3h00", solvant: "Rice vinegar", ratio: "30g/500ml", usage: "Lacto-fermented vegetables, Asian sauces"},
      huile_finition: {temp: "50°C", temps: "2h00", solvant: "Sesame oil", ratio: "20g/500ml", usage: "Sautéed roots, miso soup"}
    },
    synergies_aliments: ["Carrot", "Miso", "Sesame", "Mushrooms", "Seaweed"],
    astuce_chef_bloom: "Burdock is the friend of clear skin. Its extraction in rice vinegar creates a delicious sauce base that supports the liver and purifies the complexion."
  },
  {
    plant_id: "illicium_verum", nom_commun: "Star Anise", profil_aromatique: "Powerful aniseed, licorice, fresh",
    parametres_bloomlab: {
      miel: {temp: "45°C", temps: "1h30", solvant: "Forest honey", ratio: "10g/250ml", usage: "Post-meal infusions, pastries"},
      huile_finition: {temp: "50°C", temps: "1h30", solvant: "Rapeseed oil", ratio: "15g/500ml", usage: "Fish broths, duck, poached pears"}
    },
    synergies_aliments: ["Pear", "Duck", "Dark chocolate", "Pumpkin", "Warm spices"],
    astuce_chef_bloom: "Star anise's anethole is very stable at 50°C. Use the oil as a finish on a pumpkin soup for a fascinating aromatic dimension."
  },
  {
    plant_id: "ziziphus_jujuba", nom_commun: "Jujube (Red Date)", profil_aromatique: "Sweet, woody, deep",
    parametres_bloomlab: {
      miel: {temp: "45°C", temps: "2h30", solvant: "Creamy honey", ratio: "40g/250ml", usage: "Sleep support, vitality snack"},
      vinaigre: {temp: "55°C", temps: "2h00", solvant: "Cider vinegar", ratio: "30g/500ml", usage: "Meat sauce reduction"}
    },
    synergies_aliments: ["Goji", "Ginger", "Walnuts", "Sticky rice", "Cinnamon"],
    astuce_chef_bloom: "Jujube is the fruit of serenity. Its prolonged extraction in honey at 45°C allows capturing its calm energy for periods of stress."
  },
  {
    plant_id: "vigna_angularis", nom_commun: "Adzuki Bean", profil_aromatique: "Leguminous, nutty, slightly sweet",
    parametres_bloomlab: {
      sucre: {temp: "70°C", temps: "3h00", solvant: "Cane syrup", ratio: "100g/500ml", usage: "Red bean paste (Anko), desserts"},
      huile_finition: {temp: "60°C", temps: "2h00", solvant: "Rice bran oil", ratio: "50g/500ml", usage: "Smooth sauces, macrobiotic dishes"}
    },
    synergies_aliments: ["Matcha", "Rice", "Coconut milk", "Black sesame", "Goji"],
    astuce_chef_bloom: "Rich in saponins, adzuki extracted in syrup is a perfect base for desserts that do not overload the lymphatic system."
  }
];

export const culinaryDatabaseDE: CulinaryPlantData[] = [
  {
    plant_id: "romarin_culinaire", nom_commun: "Rosmarin", profil_aromatique: "Holzig, kampferartig, Eukalyptusnoten",
    parametres_bloomlab: {
      huile_finition: {temp: "50°C", temps: "1h30", solvant: "Extra natives Olivenöl", ratio: "25g/500ml", usage: "Röstkartoffeln, Lamm, fettiger Fisch"},
      beurre_ghee: {temp: "45°C", temps: "1h00", solvant: "Ghee", ratio: "20g/250g", usage: "Steak-Finish, frische Pasta"},
      miel: {temp: "40°C", temps: "1h00", solvant: "Akazienhonig", ratio: "15g/250ml", usage: "Süß-saure Marinaden, Verdauungsaufgüsse"}
    },
    synergies_aliments: ["Lamm", "Brathähnchen", "Kartoffeln", "Lachs", "Linsen", "Focaccia"],
    astuce_chef_bloom: "Kochen Sie NIEMALS mit diesem Öl. Gießen Sie es als FINISH über das Gericht, sobald es auf dem Teller ist. Die Wärme des Essens reicht aus, um die Aromen freizusetzen, ohne das Cineol zu verbrennen."
  },
  {
    plant_id: "thym_culinaire", nom_commun: "Echter Thymian", profil_aromatique: "Krautig, pfeffrig, leicht kampferartig",
    parametres_bloomlab: {
      huile_finition: {temp: "50°C", temps: "1h30", solvant: "Olivenöl", ratio: "25g/500ml", usage: "Pizzas, Grillabende, kandierte Tomaten"},
      beurre_ghee: {temp: "45°C", temps: "1h00", solvant: "Ghee", ratio: "20g/250g", usage: "Schnecken, Moules Marinières"},
      vinaigre: {temp: "40°C", temps: "1h00", solvant: "Apfelessig", ratio: "15g/500ml", usage: "Vinaigrettes, Marinaden für rotes Fleisch"}
    },
    synergies_aliments: ["Tomate", "Knoblauch", "Oliven", "Lammkeule", "Ziegenkäse"],
    astuce_chef_bloom: "Filtern Sie SEHR fein mit dem mitgelieferten Filterbeutel, solange die Zubereitung noch warm ist. Drücken Sie den Trester fest aus."
  },
  {
    plant_id: "basilic_culinaire", nom_commun: "Basilikum", profil_aromatique: "Anisartig, pfeffrig, frisch, sehr flüchtig",
    parametres_bloomlab: {
      huile_finition: {temp: "40°C", temps: "1h00", solvant: "Traubenkernöl (neutral)", ratio: "30g/500ml", usage: "Pesto, Carpaccio, Tomaten"},
      vinaigre: {temp: "35°C", temps: "45min", solvant: "Weißer Essig", ratio: "20g/500ml", usage: "Aromatischer Essig für Sommersalate"}
    },
    synergies_aliments: ["Tomate", "Mozzarella", "Erdbeeren", "Pasta", "Zucchini"],
    astuce_chef_bloom: "Basilikum ist ultra-thermolabil. Überschreiten Sie NIEMALS 40°C im BloomLab. Traubenkernöl ist ideal, da es das subtile Aroma des Basilikums nicht überdeckt."
  },
  {
    plant_id: "origan_culinaire", nom_commun: "Oregano", profil_aromatique: "Intensiv, kampferartig, warm",
    parametres_bloomlab: {
      huile_finition: {temp: "45°C", temps: "1h30", solvant: "Olivenöl", ratio: "20g/500ml", usage: "Pizzas, Pasta, griechische Salate"},
      beurre_ghee: {temp: "40°C", temps: "1h00", solvant: "Ghee", ratio: "15g/250g", usage: "Grillabende, geröstetes Gemüse"}
    },
    synergies_aliments: ["Tomate", "Mozzarella", "Oliven", "Aubergine", "Lamm"],
    astuce_chef_bloom: "Bloom 'Pizza-Öl': Oregano + Thymian + Basilikum, extrahiert bei 45°C in Olivenöl. Gießen Sie es nach dem Backen über die Pizza. Das Aroma wird intensiviert."
  },
  {
    plant_id: "laurier_culinaire", nom_commun: "Lorbeerblatt", profil_aromatique: "Holzig, floral, leicht bitter",
    parametres_bloomlab: {
      huile_finition: {temp: "50°C", temps: "2h00", solvant: "Olivenöl", ratio: "15g/500ml", usage: "Marinaden, Eintöpfe, Confits"},
      beurre_ghee: {temp: "45°C", temps: "1h30", solvant: "Ghee", ratio: "10g/250g", usage: "Sahnesaucen, Fisch"}
    },
    synergies_aliments: ["Bœuf Bourguignon", "Linsen", "Brathähnchen", "Geschmorte Tomatensaucen"],
    astuce_chef_bloom: "Lorbeer ist eine harte Pflanze. Die Extraktion bei 50°C für 2 Stunden in Öl ermöglicht es, florale Noten ohne die übermäßige Bitterkeit des Kochens einzufangen."
  },
  {
    plant_id: "sauge_culinaire", nom_commun: "Salbei", profil_aromatique: "Kampferartig, Eukalyptus, leicht bitter",
    parametres_bloomlab: {
      beurre_ghee: {temp: "45°C", temps: "1h00", solvant: "Ghee", ratio: "15g/250g", usage: "Ravioli, Gnocchi, weißes Fleisch"},
      huile_finition: {temp: "50°C", temps: "1h30", solvant: "Olivenöl", ratio: "15g/500ml", usage: "Gänseleber, Ente"}
    },
    synergies_aliments: ["Nussbutter", "Gnocchi", "Schweinefleisch", "Ente", "Weichkäse"],
    astuce_chef_bloom: "Bloom 'Salbeibutter': Extraktion im Ghee bei 45°C. Diese Butter in einer heißen Pfanne aufschäumen lassen und die Gnocchi darin schwenken. Ein Genuss."
  },
  {
    plant_id: "menthe_culinaire", nom_commun: "Pfefferminze", profil_aromatique: "Frisch, minzig, sehr flüchtig",
    parametres_bloomlab: {
      huile_finition: {temp: "40°C", temps: "1h00", solvant: "Traubenkernöl", ratio: "25g/500ml", usage: "Salate, Taboulé, Desserts"},
      miel: {temp: "35°C", temps: "45min", solvant: "Akazienhonig", ratio: "15g/250ml", usage: "Tee, Joghurt, rote Früchte"}
    },
    synergies_aliments: ["Lamm", "Taboulé", "Schokolade", "Erdbeeren", "Grüner Tee"],
    astuce_chef_bloom: "Minze verliert an der frischen Luft 80 % ihres Menthols. Die Extraktion in einer geschlossenen Umgebung (BloomLab) bei 40 °C fängt 100 % der Frische ein."
  },
  {
    plant_id: "estragon_culinaire", nom_commun: "Estragon", profil_aromatique: "Anisartig, Lakritz, zart",
    parametres_bloomlab: {
      vinaigre: {temp: "40°C", temps: "1h00", solvant: "Weißer Essig", ratio: "20g/500ml", usage: "Sauce Béarnaise, feine Vinaigrettes"},
      huile_finition: {temp: "40°C", temps: "1h00", solvant: "ölsäurereiches Sonnenblumenöl", ratio: "20g/500ml", usage: "Hähnchen, zarter Fisch, Eier"}
    },
    synergies_aliments: ["Hähnchen", "Lachs", "Gefüllte Eier", "Avocado", "Garnelen"],
    astuce_chef_bloom: "Bloom 'Estragonessig': ersetzt handelsüblichen Essig für Ihre Béarnaise. Der Unterschied in der Frische ist verblüffend."
  },
  {
    plant_id: "gingembre_culinaire", nom_commun: "Ingwer", profil_aromatique: "Pikant, zitronig, warm",
    parametres_bloomlab: {
      huile_finition: {temp: "50°C", temps: "1h30", solvant: "Sesamöl", ratio: "30g/500ml", usage: "Wok, Nudeln, Fisch"},
      miel: {temp: "40°C", temps: "1h00", solvant: "Honig + Zitrone", ratio: "20g/250ml", usage: "Immunitäts-Shot, Marinaden"}
    },
    synergies_aliments: ["Zitrone", "Sojasauce", "Kokosnuss", "Fisch", "Karotte"],
    astuce_chef_bloom: "Bloom 'Immunitäts-Shot': Glycerin-Ingwer-Extrakt (hergestellt im BloomLab) + ausgepresste Zitrone + eine Prise Cayennepfeffer. 30ml am Morgen."
  },
  {
    plant_id: "curcuma_culinaire", nom_commun: "Kurkuma", profil_aromatique: "Erdig, pfeffrig, leicht bitter",
    parametres_bloomlab: {
      huile_finition: {temp: "55°C", temps: "2h00", solvant: "Natives Kokosöl", ratio: "30g/500ml", usage: "Hausgemachtes Curry, goldener Reis"},
      beurre_ghee: {temp: "50°C", temps: "1h30", solvant: "Ghee", ratio: "25g/250g", usage: "Indische Goldbutter, Naan, Dahl"}
    },
    synergies_aliments: ["Kokosnuss", "Ingwer", "Kreuzkümmel", "Hülsenfrüchte", "Basmatireis"],
    astuce_chef_bloom: "Goldene Bloom-Regel: Kurkuma + Pfeffer + Fett. Die Extraktion im Ghee bei 50 °C mit einer Prise Pfeffer garantiert maximale Bioverfügbarkeit von Curcumin."
  },
  {
    plant_id: "cannelle_culinaire", nom_commun: "Ceylon-Zimt", profil_aromatique: "Süß, würzig, holzig",
    parametres_bloomlab: {
      miel: {temp: "40°C", temps: "1h30", solvant: "Blütenhonig", ratio: "15g/250ml", usage: "Toast, heiße Milch, Gebäck"},
      huile_finition: {temp: "50°C", temps: "2h00", solvant: "Kokosöl", ratio: "15g/500ml", usage: "Porridge, Kompotte, gerösteter Kürbis"}
    },
    synergies_aliments: ["Apfel", "Birne", "Schokolade", "Kaffee", "Süßkartoffel"],
    astuce_chef_bloom: "Bloom 'Zimthonig': Extraktion bei 40 °C, um die Honigenzyme nicht abzutöten. Köstlich zu Joghurt oder morgendlichem Porridge."
  },
  {
    plant_id: "cardamome_culinaire", nom_commun: "Grüner Kardamom", profil_aromatique: "Floral, zitronig, Eukalyptus, sehr kräftig",
    parametres_bloomlab: {
      miel: {temp: "40°C", temps: "1h00", solvant: "Akazienhonig", ratio: "5g/250ml", usage: "Tee, orientalisches Gebäck"},
      huile_finition: {temp: "45°C", temps: "1h30", solvant: "Traubenkernöl", ratio: "10g/500ml", usage: "Risottos, Meeresfrüchte"}
    },
    synergies_aliments: ["Kaffee", "Schokolade", "Pilaw-Reis", "Rote Früchte", "Lamm"],
    astuce_chef_bloom: "Kardamom ist sehr kräftig. 5 g reichen für 250 ml Honig. Zerdrücken Sie die Kapseln kurz vor der Extraktion, um die ätherischen Öle freizusetzen."
  },
  {
    plant_id: "lavande_culinaire", nom_commun: "Lavendel", profil_aromatique: "Floral, kampferartig, zart",
    parametres_bloomlab: {
      sucre: {temp: "40°C", temps: "1h00", solvant: "Zucker + Blüten", ratio: "10g/500g", usage: "Kekse, Crème Brûlée"},
      miel: {temp: "35°C", temps: "1h00", solvant: "Lavendelhonig", ratio: "10g/250ml", usage: "Joghurt, Frischkäse"}
    },
    synergies_aliments: ["Ziegenkäse", "Honig", "Zitrone", "Mürbeteigkekse", "Eiscreme"],
    astuce_chef_bloom: "Bloom 'Lavendelzucker': Getrocknete Blüten mit Bio-Zucker gemischt (1:10). 2 Wochen ruhen lassen. Hervorragend auf einer Crème Brûlée."
  },
  {
    plant_id: "citronnelle_culinaire", nom_commun: "Zitronengras", profil_aromatique: "Zitronig, frisch, krautig",
    parametres_bloomlab: {
      huile_finition: {temp: "45°C", temps: "1h30", solvant: "Kokosöl", ratio: "25g/500ml", usage: "Thailändische Küche, Wok, Fisch"},
      miel: {temp: "40°C", temps: "1h00", solvant: "Akazienhonig", ratio: "15g/250ml", usage: "Eistee, Limonaden"}
    },
    synergies_aliments: ["Kokosnuss", "Ingwer", "Garnelen", "Hähnchen", "Grüner Tee"],
    astuce_chef_bloom: "Zitronengras ist faserig. Die Extraktion bei 45 °C in Kokosöl fängt Citronellal ohne die Bitterkeit zerstoßener Stängel ein."
  },
  {
    plant_id: "girofle_culinaire", nom_commun: "Gewürznelke", profil_aromatique: "Warm, holzig, sehr kräftig, betäubend",
    parametres_bloomlab: {
      miel: {temp: "40°C", temps: "1h00", solvant: "Kastanienhonig", ratio: "3g/250ml", usage: "Glühwein, Lebkuchen, Marinaden"},
      huile_finition: {temp: "45°C", temps: "1h30", solvant: "Olivenöl", ratio: "5g/500ml", usage: "Pot-au-feu, Eintöpfe"}
    },
    synergies_aliments: ["Orange", "Zimt", "Rindfleisch", "Rotkohl", "Lebkuchen"],
    astuce_chef_bloom: "Gewürznelken enthalten Eugenol (betäubend). 3 g reichen für 250 ml Honig. Ideal zur Linderung von Halsschmerzen, indem man einen Löffel dieses Honigs lutscht."
  },
  {
    plant_id: "lycium_barbarum", nom_commun: "Goji-Beere", profil_aromatique: "Süß, leicht säuerlich, Dattelnoten",
    parametres_bloomlab: {
      huile_finition: {temp: "72°C (A) / 45°C (B)", temps: "2h (A) + 3h (B)", solvant: "Wasser (A) / Öl (B)", ratio: "40g/500ml", usage: "Vitalbrühen, Salate, Porridges"},
      miel: {temp: "40°C", temps: "2h00", solvant: "Akazienhonig", ratio: "30g/250ml", usage: "Dessert-Topping, regenerierende Tees"}
    },
    synergies_aliments: ["Jujube", "Weiher Tee", "Mandeln", "Joghurt", "Chia"],
    astuce_chef_bloom: "Die BloomLab-Zweiphasen-Extraktion setzt Carotinoide (Haut) und Polysaccharide (Energie) frei. Perfekt für einen strahlenden Teint durch die Ernährung."
  },
  {
    plant_id: "arctium_lappa", nom_commun: "Klette", profil_aromatique: "Erdig, nussig, süß",
    parametres_bloomlab: {
      vinaigre: {temp: "65°C", temps: "3h00", solvant: "Reisessig", ratio: "30g/500ml", usage: "Milchsauer vergorenes Gemüse, asiatische Saucen"},
      huile_finition: {temp: "50°C", temps: "2h00", solvant: "Sesamöl", ratio: "20g/500ml", usage: "Wurzelgemüse-Pfanne, Miso-Suppe"}
    },
    synergies_aliments: ["Karotte", "Miso", "Sesam", "Pilze", "Algen"],
    astuce_chef_bloom: "Die Klette ist die Freundin reiner Haut. Ihre Extraktion in Reisessig ergibt eine köstliche Saucenbasis, die die Leber unterstützt und das Hautbild klärt."
  },
  {
    plant_id: "illicium_verum", nom_commun: "Sternanis", profil_aromatique: "Kräftig anisartig, Lakritz, frisch",
    parametres_bloomlab: {
      miel: {temp: "45°C", temps: "1h30", solvant: "Waldhonig", ratio: "10g/250ml", usage: "Verdauungshilfen nach dem Essen, Gebäck"},
      huile_finition: {temp: "50°C", temps: "1h30", solvant: "Rapsöl", ratio: "15g/500ml", usage: "Fischbrühen, Ente, pochierte Birnen"}
    },
    synergies_aliments: ["Birne", "Ente", "Zartbitterschokolade", "Kürbis", "Warme Gewürze"],
    astuce_chef_bloom: "Anethol im Sternanis ist bei 50 °C sehr stabil. Verwenden Sie das Öl als Finish auf einer Kürbissuppe für eine faszinierende aromatische Dimension."
  },
  {
    plant_id: "ziziphus_jujuba", nom_commun: "Jujube (Rote Dattel)", profil_aromatique: "Süß, holzig, tief",
    parametres_bloomlab: {
      miel: {temp: "45°C", temps: "2h30", solvant: "Cremiger Honig", ratio: "40g/250ml", usage: "Schlafunterstützung, Vitalitätssnack"},
      vinaigre: {temp: "55°C", temps: "2h00", solvant: "Apfelessig", ratio: "30g/500ml", usage: "Fleischsaucen-Reduktion"}
    },
    synergies_aliments: ["Goji", "Ingwer", "Walnüsse", "Klebreis", "Zimt"],
    astuce_chef_bloom: "Jujube ist die Frucht der Gelassenheit. Ihre längere Extraktion in Honig bei 45 °C ermöglicht es, ihre ruhige Energie für Stresszeiten einzufangen."
  },
  {
    plant_id: "vigna_angularis", nom_commun: "Adzuki-Bohne", profil_aromatique: "Hülsenfruchtartig, nussig, leicht süß",
    parametres_bloomlab: {
      sucre: {temp: "70°C", temps: "3h00", solvant: "Rohrsirup", ratio: "100g/500ml", usage: "Rote Bohnenpaste (Anko), Desserts"},
      huile_finition: {temp: "60°C", temps: "2h00", solvant: "Reiskleieöl", ratio: "50g/500ml", usage: "Sämige Saucen, makrobiotische Gerichte"}
    },
    synergies_aliments: ["Matcha", "Reis", "Kokosmilch", "Schwarzer Sesam", "Goji"],
    astuce_chef_bloom: "Adzuki, reich an Saponinen und in Sirup extrahiert, ist eine perfekte Basis für Desserts, die das Lymphsystem nicht belasten."
  }
];

export const getCulinaryDatabase = (lang: Language): CulinaryPlantData[] => {
  switch (lang) {
    case 'en': return culinaryDatabaseEN;
    case 'de': return culinaryDatabaseDE;
    default: return culinaryDatabaseFR;
  }
};

export const culinaryDatabase = culinaryDatabaseFR;
