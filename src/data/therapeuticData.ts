export interface PlantData {
  plant_id: string;
  nom_commun: string;
  nom_latin: string;
  partie_utilisee: string;
  famille_bloom: string;
  terrains_cibles: string[];
  actifs_cles: { 
    nom: string; 
    polarite: string;
    translations?: {
      [key in 'en' | 'de']?: { nom: string; polarite: string }
    }
  }[];
  preuve_scientifique: string;
  pourquoi_bloomlab: {
    probleme_traditionnel: string;
    phase_A: { 
      temp: string; 
      temps?: string; 
      solvant: string; 
      cible: string;
      translations?: {
        [key in 'en' | 'de']?: { cible: string }
      }
    };
    phase_B: { 
      temp: string; 
      temps?: string; 
      solvant: string; 
      cible: string;
      translations?: {
        [key in 'en' | 'de']?: { cible: string }
      }
    };
    resultat?: string;
    translations?: {
      [key in 'en' | 'de']?: { probleme_traditionnel: string; resultat?: string }
    }
  };
  recette_pas_a_pas?: {
    batch_standard: string;
    ingredients: {
      phase_A: string[];
      phase_B: string[];
    };
    preparation: string[];
    phase_A_instructions: string[];
    transition: string[];
    phase_B_instructions: string[];
    filtration_et_finition: string[];
    translations?: {
      [key in 'en' | 'de']?: {
        batch_standard?: string;
        preparation?: string[];
        phase_A_instructions?: string[];
        transition?: string[];
        phase_B_instructions?: string[];
        filtration_et_finition?: string[];
      }
    }
  };
  usage_standard?: {
    mode_administration: string;
    posologie_quotidienne: string;
    dose_maximale: string;
    duree_utilisation: string;
    contre_indications: string[];
    translations?: {
      [key in 'en' | 'de']?: {
        mode_administration: string;
        posologie_quotidienne: string;
        dose_maximale: string;
        duree_utilisation: string;
        contre_indications: string[];
      }
    }
  };
  socle_synergique?: {
    cofacteurs_complements: { 
      nom: string; 
      dose: string; 
      role: string;
      translations?: {
        [key in 'en' | 'de']?: { nom: string; dose: string; role: string }
      }
    }[];
    leviers_du_vivant: { 
      nom: string; 
      frequence: string; 
      role: string;
      translations?: {
        [key in 'en' | 'de']?: { nom: string; frequence: string; role: string }
      }
    }[];
  };
  note_expert?: string;
  convergence_ancestrale: string;
  synergies_recommandees: string[];
  precautions?: string;
  additional_recipes?: any[];
  translations?: {
    [key in 'en' | 'de']?: {
      nom_commun?: string;
      partie_utilisee?: string;
      famille_bloom?: string;
      preuve_scientifique?: string;
      note_expert?: string;
      convergence_ancestrale?: string;
      precautions?: string;
    }
  };
}

export const plantsDatabase: PlantData[] = [
  {
    plant_id: "chaga_vitality",
    nom_commun: "Chaga (Diamant de la Forêt)",
    nom_latin: "Inonotus obliquus",
    partie_utilisee: "Sclérote (corps stérile) réduit en poudre fine",
    famille_bloom: "Bouclier (Modulateur Immunitaire)",
    terrains_cibles: ["T3 (Immunité)", "T8 (Inflammation)", "T9 (Vitalité)"],
    actifs_cles: [
      { nom: "Bêta-glucanes (1-3, 1-6)", polarite: "Hydrosoluble", translations: { en: { nom: "Beta-glucans (1-3, 1-6)", polarite: "Water-soluble" }, de: { nom: "Beta-Glucane (1-3, 1-6)", polarite: "Wasserlöslich" } } },
      { nom: "Acide bétulinique", polarite: "Liposoluble", translations: { en: { nom: "Betulinic acid", polarite: "Fat-soluble" }, de: { nom: "Betulinsäure", polarite: "Fettlöslich" } } },
      { nom: "Mélanine / Polyphénols", polarite: "Hydrosoluble", translations: { en: { nom: "Melanin / Polyphenols", polarite: "Water-soluble" }, de: { nom: "Melanin / Polyphenole", polarite: "Wasserlöslich" } } },
      { nom: "Superoxyde Dismutase (SOD)", polarite: "Enzymatique", translations: { en: { nom: "Superoxide Dismutase (SOD)", polarite: "Enzymatic" }, de: { nom: "Superoxid-Dismutase (SOD)", polarite: "Enzymatisch" } } }
    ],
    preuve_scientifique: "L'un des plus hauts scores ORAC au monde. L'acide bétulinique (issu du bouleau) est activé par le Chaga pour induire l'apoptose des cellules anormales tout en régulant les cytokines inflammatoires.",
    pourquoi_bloomlab: {
      probleme_traditionnel: "Les bêta-glucanes sont piégés dans une matrice de chitine ultra-résistante. Une simple tisane n'extrait que 15% des actifs. L'acide bétulinique, lui, ne sort qu'en phase alcoolique à température contrôlée.",
      phase_A: { temp: "80°C", temps: "4h00", solvant: "Eau purifiée", cible: "Déstructuration de la chitine et libération des polysaccharides", translations: { en: { cible: "Chitin destructuring and release of polysaccharides" }, de: { cible: "Chitindestrukturierung und Freisetzung von Polysacchariden" } } },
      phase_B: { temp: "55°C", temps: "3h00", solvant: "Alcool bio 96°", cible: "Extraction de l'acide bétulinique et des triterpènes", translations: { en: { cible: "Extraction of betulinic acid and triterpenes" }, de: { cible: "Extraktion von Betulinsäure und Triterpenen" } } },
      resultat: "Un Totum 'Dual-Extract' concentré, biodisponible immédiatement, capturant la fraction hydrosoluble et liposoluble du champignon.",
      translations: { 
        en: { 
          probleme_traditionnel: "Beta-glucans are trapped in an ultra-resistant chitin matrix. A simple herbal tea only extracts 15% of the actives. Betulinic acid only comes out in an alcoholic phase at a controlled temperature.",
          resultat: "A concentrated 'Dual-Extract' Totum, immediately bioavailable, capturing the water-soluble and fat-soluble fraction of the mushroom."
        },
        de: {
          probleme_traditionnel: "Beta-Glucane sind in einer ultra-resistenten Chitinmatrix eingeschlossen. Ein einfacher Kräutertee extrahiert nur 15% der Wirkstoffe. Betulinsäure tritt nur in einer alkoholischen Phase bei kontrollierter Temperatur aus.",
          resultat: "Ein konzentriertes 'Dual-Extract' Totum, sofort bioverfügbar, das die wasserlösliche und fettlösliche Fraktion des Pilzes einfängt."
        }
      }
    },
    convergence_ancestrale: "Utilisé depuis le XVIe siècle en Sibérie et dans les pays nordiques comme tonique universel et soutien immunitaire majeur.",
    synergies_recommandees: ["Bouleau", "Églantier (Vitamine C)", "Gingembre"],
    precautions: "Consultez un médecin en cas de prise d'anticoagulants ou de traitement contre le diabète (effet hypoglycémiant potentiel).",
    usage_standard: {
      mode_administration: "Extraction liquide (Double extrait)",
      posologie_quotidienne: "20 gouttes (soit 1ml) par jour",
      dose_maximale: "40 gouttes (soit 2ml) par jour",
      duree_utilisation: "Cure de 21 jours, pause de 7 jours",
      contre_indications: ["Maladies auto-immunes actives", "Avant une chirurgie", "Troubles de la coagulation"],
      translations: {
        en: {
          mode_administration: "Liquid extraction (Double extract)",
          posologie_quotidienne: "20 drops (1ml) per day",
          dose_maximale: "40 drops (2ml) per day",
          duree_utilisation: "21-day course, 7-day break",
          contre_indications: ["Active autoimmune diseases", "Before surgery", "Coagulation disorders"]
        },
        de: {
          mode_administration: "Flüssigextraktion (Doppelextrakt)",
          posologie_quotidienne: "20 Tropfen (1ml) pro Tag",
          dose_maximale: "40 Tropfen (2ml) pro Tag",
          duree_utilisation: "21-Tage-Kur, 7 Tage Pause",
          contre_indications: ["Aktive Autoimmunerkrankungen", "Vor einer Operation", "Gerinnungsstörungen"]
        }
      }
    },
    translations: {
      en: {
        nom_commun: "Chaga (Forest Diamond)",
        partie_utilisee: "Sclerotium (sterile body) reduced to fine powder",
        preuve_scientifique: "One of the highest ORAC scores in the world. Betulinic acid (from birch) is activated by Chaga to induce apoptosis of abnormal cells while regulating inflammatory cytokines.",
        convergence_ancestrale: "Used since the 16th century in Siberia and Nordic countries as a universal tonic and major immune support.",
        precautions: "Consult a doctor if taking anticoagulants or diabetes treatment (potential hypoglycemic effect)."
      },
      de: {
        nom_commun: "Chaga (Wald-Diamant)",
        partie_utilisee: "Sklerotium (steriler Körper) zu feinem Pulver reduziert",
        preuve_scientifique: "Einer der weltweit höchsten ORAC-Werte. Betulinsäure (aus Birke) wird durch Chaga aktiviert, um die Apoptose abnormaler Zellen zu induzieren und gleichzeitig entzündliche Zytokine zu regulieren.",
        convergence_ancestrale: "Seit dem 16. Jahrhundert in Sibirien und den nordischen Ländern als universelles Tonikum und wichtige Immununterstützung verwendet.",
        precautions: "Konsultieren Sie einen Arzt, wenn Sie Antikoagulanzien oder eine Diabetesbehandlung einnehmen (potenziell hypoglykämische Wirkung)."
      }
    }
  },
  {
    plant_id: "cordyceps_performance",
    nom_commun: "Cordyceps (L'Or de l'Himalaya)",
    nom_latin: "Cordyceps sinensis / militaris",
    partie_utilisee: "Mycélium et corps de fructification en poudre",
    famille_bloom: "Moteur (Adaptogène Énergétique)",
    terrains_cibles: ["T2 (Énergie)", "T5 (Poumons)", "T10 (Performance)"],
    actifs_cles: [
      { nom: "Cordycépine (3'-désoxyadénosine)", polarite: "Hydrosoluble", translations: { en: { nom: "Cordycepin (3'-deoxyadenosine)", polarite: "Water-soluble" }, de: { nom: "Cordycepin (3'-Desoxyadenosin)", polarite: "Wasserlöslich" } } },
      { nom: "Adénosine", polarite: "Hydrosoluble", translations: { en: { nom: "Adenosine", polarite: "Water-soluble" }, de: { nom: "Adenosin", polarite: "Wasserlöslich" } } },
      { nom: "Acide cordycépique", polarite: "Hydrosoluble", translations: { en: { nom: "Cordycepic acid", polarite: "Water-soluble" }, de: { nom: "Cordycepinsäure", polarite: "Wasserlöslich" } } },
      { nom: "Ergostérol", polarite: "Liposoluble", translations: { en: { nom: "Ergosterol", polarite: "Fat-soluble" }, de: { nom: "Ergosterin", polarite: "Fettlöslich" } } }
    ],
    preuve_scientifique: "Augmente significativement la production d'ATP cellulaire et l'utilisation de l'oxygène par les mitochondries. Optimise la réponse au stress en régulant l'axe HPA.",
    pourquoi_bloomlab: {
      probleme_traditionnel: "La cordycépine est fragile. Une extraction à l'eau bouillante peut dégrader une partie des nucléosides. Le ratio eau/alcool doit être précis pour maintenir la stabilité de l'adénosine.",
      phase_A: { temp: "65°C", temps: "3h00", solvant: "Eau distillée", cible: "Libération douce des nucléosides et cordycépine", translations: { en: { cible: "Gentle release of nucleosides and cordycepin" }, de: { cible: "Sanfte Freisetzung von Nukleosiden und Cordycepin" } } },
      phase_B: { temp: "45°C", temps: "2h00", solvant: "Alcool bio 96°", cible: "Extraction des stérols et stabilisation du mélange", translations: { en: { cible: "Extraction of sterols and stabilization of the mixture" }, de: { cible: "Extraktion von Sterolen und Stabilisierung der Mischung" } } },
      resultat: "Une puissance énergétique décuplée, idéale pour la récupération sportive et la fatigue chronique.",
      translations: {
        en: {
          probleme_traditionnel: "Cordycepin is fragile. Boiling water extraction can degrade some of the nucleosides. The water/alcohol ratio must be precise to maintain adenosine stability.",
          resultat: "A tenfold increase in energy power, ideal for sports recovery and chronic fatigue."
        },
        de: {
          probleme_traditionnel: "Cordycepin ist zerbrechlich. Die Extraktion mit kochendem Wasser kann einige der Nukleoside abbauen. Das Wasser/Alkohol-Verhältnis muss präzise sein, um die Adenosinstabilität aufrechtzuerhalten.",
          resultat: "Eine verzehnfachte Energieleistung, ideal für die sportliche Erholung und chronische Müdigkeit."
        }
      }
    },
    convergence_ancestrale: "Trésor de la médecine tibétaine, réservé autrefois aux empereurs pour la longévité et la vigueur.",
    synergies_recommandees: ["Rhodiola", "Ginseng", "Ashwagandha"],
    precautions: "Éviter en cas de maladies auto-immunes (stimulation immunitaire active).",
    translations: {
      en: {
        nom_commun: "Cordyceps (Himalayan Gold)",
        partie_utilisee: "Mycelium and fruiting body powder",
        preuve_scientifique: "Significantly increases cellular ATP production and oxygen utilization by mitochondria. Optimizes stress response by regulating the HPA axis.",
        convergence_ancestrale: "Treasure of Tibetan medicine, formerly reserved for emperors for longevity and vigor.",
        precautions: "Avoid in case of autoimmune diseases (active immune stimulation)."
      },
      de: {
        nom_commun: "Cordyceps (Gold des Himalaya)",
        partie_utilisee: "Myzel- und Fruchtkörperpulver",
        preuve_scientifique: "Erhöht signifikant die zelluläre ATP-Produktion und die Sauerstoffnutzung durch die Mitochondrien. Optimiert die Stressreaktion durch Regulierung der HPA-Achse.",
        convergence_ancestrale: "Schatz der tibetischen Medizin, früher Kaisern für Langlebigkeit und Kraft vorbehalten.",
        precautions: "Vermeiden bei Autoimmunerkrankungen (aktive Immunstimulation)."
      }
    }
  },
  {
    plant_id: "hericium_focus",
    nom_commun: "Hericium (Crinière de Lion)",
    nom_latin: "Hericium erinaceus",
    partie_utilisee: "Corps de fructification séché et réduit en poudre",
    famille_bloom: "Architecte (Régénérateur Nerveux)",
    terrains_cibles: ["T6 (Système Nerveux)", "T7 (Cognition)", "T1 (Estomac)"],
    actifs_cles: [
      { nom: "Héricénones", polarite: "Liposoluble", translations: { en: { nom: "Hericenones", polarite: "Fat-soluble" }, de: { nom: "Hericenone", polarite: "Fettlöslich" } } },
      { nom: "Érinacines", polarite: "Hydrosoluble/Liposoluble", translations: { en: { nom: "Erinacines", polarite: "Water/Fat-soluble" }, de: { nom: "Erinacine", polarite: "Wasser/Fettlöslich" } } },
      { nom: "Bêta-glucanes spécifique", polarite: "Hydrosoluble", translations: { en: { nom: "Specific beta-glucans", polarite: "Water-soluble" }, de: { nom: "Spezifische Beta-Glucane", polarite: "Wasserlöslich" } } }
    ],
    preuve_scientifique: "Seul composé naturel capable de stimuler la synthèse du NGF (Nerve Growth Factor), favorisant la neurogenèse et la réparation de la gaine de myéline.",
    pourquoi_bloomlab: {
      probleme_traditionnel: "Les héricénones (cerveau) sont lipophiles, alors que les polysaccharides (estomac) sont hydrophiles. Une simple poudre ingérée n'offre pas une concentration suffisante pour traverser la barrière hémato-encéphalique.",
      phase_A: { temp: "75°C", temps: "3h30", solvant: "Eau distillée + Glycérine", cible: "Extraction des polysaccharides et protection muqueuse", translations: { en: { cible: "Extraction of polysaccharides and mucosal protection" }, de: { cible: "Extraktion von Polysacchariden und Schleimhautschutz" } } },
      phase_B: { temp: "55°C", temps: "2h30", solvant: "Alcool bio 96°", cible: "Concentration des héricénones pour l'effet neurotrophique", translations: { en: { cible: "Concentration of hericenones for neurotrophic effect" }, de: { cible: "Konzentration von Hericenonen für neurotrophen Effekt" } } },
      resultat: "Un élixir de clarté mentale agissant à la fois sur l'axe intestin-cerveau et la régénération neuronale.",
      translations: {
        en: {
          probleme_traditionnel: "Hericenones (brain) are lipophilic, while polysaccharides (stomach) are hydrophilic. A simple ingested powder does not offer a sufficient concentration to cross the blood-brain barrier.",
          resultat: "An elixir of mental clarity acting on both the gut-brain axis and neuronal regeneration."
        },
        de: {
          probleme_traditionnel: "Hericenone (Gehirn) sind lipophil, während Polysaccharide (Magen) hydrophil sind. Ein einfach eingenommenes Pulver bietet keine ausreichende Konzentration, um die Blut-Hirn-Schranke zu überwinden.",
          resultat: "Ein Elixier für geistige Klarheit, das sowohl auf die Darm-Hirn-Achse als auch auf die neuronale Regeneration wirkt."
        }
      }
    },
    convergence_ancestrale: "Surnommé 'la nourriture du cerveau' par les moines bouddhistes pour approfondir la méditation et la concentration.",
    synergies_recommandees: ["Bacopa", "Ginkgo Biloba", "Gotu Kola"],
    precautions: "Généralement très sûr. Prudence en cas d'allergie aux champignons.",
    translations: {
      en: {
        nom_commun: "Hericium (Lion's Mane)",
        partie_utilisee: "Dried fruiting body reduced to powder",
        preuve_scientifique: "The only natural compound capable of stimulating NGF (Nerve Growth Factor) synthesis, promoting neurogenesis and myelin sheath repair.",
        convergence_ancestrale: "Nicknamed 'brain food' by Buddhist monks to deepen meditation and concentration.",
        precautions: "Generally very safe. Caution in case of mushroom allergy."
      },
      de: {
        nom_commun: "Hericium (Igel-Stachelbart / Löwenmähne)",
        partie_utilisee: "Getrockneter und zu Pulver reduzierter Fruchtkörper",
        preuve_scientifique: "Die einzige natürliche Verbindung, die die Synthese von NGF (Nerve Growth Factor) stimulieren kann und so die Neurogenese und die Reparatur der Myelinscheide fördert.",
        convergence_ancestrale: "Von buddhistischen Mönchen als 'Gehirnnahrung' bezeichnet, um Meditation und Konzentration zu vertiefen.",
        precautions: "Im Allgemeinen sehr sicher. Vorsicht bei Pilzallergie."
      }
    }
  },
  {
    plant_id: "reishi_zen",
    nom_commun: "Reishi (Champignon de l'Immortalité)",
    nom_latin: "Ganoderma lucidum",
    partie_utilisee: "Corps de fructification tranché ou poudre",
    famille_bloom: "Médiateur (Régulateur du Stress)",
    terrains_cibles: ["T3 (Immunité)", "T6 (Sommeil/Anxiété)", "T4 (Foie)"],
    actifs_cles: [
      { nom: "Acides ganodériques (Tritérpènes)", polarite: "Liposoluble", translations: { en: { nom: "Ganoderic acids (Triterpenes)", polarite: "Fat-soluble" }, de: { nom: "Ganodersäuren (Triterpene)", polarite: "Fettlöslich" } } },
      { nom: "Polysaccharides complexes", polarite: "Hydrosoluble", translations: { en: { nom: "Complex polysaccharides", polarite: "Water-soluble" }, de: { nom: "Komplexe Polysaccharide", polarite: "Wasserlöslich" } } },
      { nom: "Peptidoglycanes", polarite: "Hydrosoluble", translations: { en: { nom: "Peptidoglycans", polarite: "Water-soluble" }, de: { nom: "Peptidoglykane", polarite: "Wasserlöslich" } } }
    ],
    preuve_scientifique: "Action adaptogène puissante. Les tritérpènes inhibent la libération d'histamine et protègent le foie, tandis que les polysaccharides modulent les cellules NK (Natural Killers).",
    pourquoi_bloomlab: {
      probleme_traditionnel: "Le Reishi est incroyablement dur et amer. Sa saveur amère vient des tritérpènes qui ne s'extraient que difficilement à l'eau. Une ébullition prolongée détruit les polysaccharides fragiles.",
      phase_A: { temp: "85°C", temps: "4h00", solvant: "Eau pure", cible: "Extraction lente des sucres complexes et modulation immunitaire", translations: { en: { cible: "Slow extraction of complex sugars and immune modulation" }, de: { cible: "Langsame Extraktion komplexer Zucker und Immunmodulation" } } },
      phase_B: { temp: "60°C", temps: "3h00", solvant: "Alcool bio 96°", cible: "Extraction des acides ganodériques (amertume médicinale, effet foie/stress)", translations: { en: { cible: "Extraction of ganoderic acids (medicinal bitterness, liver/stress effect)" }, de: { cible: "Extraktion von Ganodersäuren (medizinische Bitterkeit, Leber-/Stresseffekt)" } } },
      resultat: "Une extraction biphasique équilibrée offrant un apaisement profond du système nerveux et une immunité résiliente.",
      translations: {
        en: {
          probleme_traditionnel: "Reishi is incredibly hard and bitter. Its bitter flavor comes from triterpenes which are difficult to extract in water. Prolonged boiling destroys fragile polysaccharides.",
          resultat: "A balanced biphasic extraction offering deep soothing of the nervous system and resilient immunity."
        },
        de: {
          probleme_traditionnel: "Reishi ist unglaublich hart und bitter. Sein bitterer Geschmack kommt von Triterpenen, die nur schwer in Wasser zu extrahieren sind. Längeres Kochen zerstört empfindliche Polysaccharide.",
          resultat: "Eine ausgewogene biphasische Extraktion, die eine tiefe Beruhigung des Nervensystems und eine widerstandsfähige Immunität bietet."
        }
      }
    },
    convergence_ancestrale: "Plante supérieure classée n°1 dans le Shennong Ben Cao Jing, considérée comme le secret de la jeunesse éternelle.",
    synergies_recommandees: ["Mélisse", "Ashwagandha", "Aubépine"],
    precautions: "Prudence en cas de traitement anticoagulant ou de chirurgie prévue (effet antiagrégant).",
    translations: {
      en: {
        nom_commun: "Reishi (Mushroom of Immortality)",
        partie_utilisee: "Sliced fruiting body or powder",
        preuve_scientifique: "Powerful adaptogenic action. Triterpenes inhibit histamine release and protect the liver, while polysaccharides modulate NK (Natural Killer) cells.",
        convergence_ancestrale: "Superior plant ranked #1 in the Shennong Ben Cao Jing, considered the secret of eternal youth.",
        precautions: "Caution in case of anticoagulant treatment or planned surgery (anti-aggregant effect)."
      },
      de: {
        nom_commun: "Reishi (Pilz der Unsterblichkeit)",
        partie_utilisee: "Geschnittener Fruchtkörper oder Pulver",
        preuve_scientifique: "Starke adaptogene Wirkung. Triterpene hemmen die Histaminfreisetzung und schützen die Leber, während Polysaccharide NK-Zellen (natürliche Killerzellen) modulieren.",
        convergence_ancestrale: "Überlegene Pflanze, Platz 1 im Shennong Ben Cao Jing, gilt als Geheimnis der ewigen Jugend.",
        precautions: "Vorsicht bei gerinnungshemmender Behandlung oder geplanter Operation (antiaggregative Wirkung)."
      }
    }
  },
  {
    plant_id: "curcuma_longa_poivre",
    nom_commun: "Curcuma et Poivre Noir",
    nom_latin: "Curcuma longa / Piper nigrum",
    partie_utilisee: "Rhizome séché en poudre ou tranches / Baies séchées",
    famille_bloom: "Gâchette (Inhibiteur d'inflammation)",
    terrains_cibles: ["T8 (Inflammation)", "T1 (Intestin)", "T3 (Immunité)"],
    actifs_cles: [
      { nom: "Curcuminoïdes", polarite: "Liposoluble", translations: { en: { nom: "Curcuminoids", polarite: "Fat-soluble" }, de: { nom: "Curcuminoide", polarite: "Fettlöslich" } } },
      { nom: "Huiles essentielles (Turmérone)", polarite: "Liposoluble/Volatile", translations: { en: { nom: "Essential oils (Turmerone)", polarite: "Fat-soluble/Volatile" }, de: { nom: "Ätherische Öle (Turmeron)", polarite: "Fettlöslich/Flüchtig" } } },
      { nom: "Pipérine", polarite: "Alcaloïde lipophile", translations: { en: { nom: "Piperine", polarite: "Lipophilic alkaloid" }, de: { nom: "Piperin", polarite: "Lipophiles Alkaloid" } } },
      { nom: "Polysaccharides", polarite: "Hydrosoluble", translations: { en: { nom: "Polysaccharides", polarite: "Water-soluble" }, de: { nom: "Polysaccharide", polarite: "Wasserlöslich" } } }
    ],
    preuve_scientifique: "Inhibition puissante de NF-κB et de la 5-LOX. La pipérine augmente la biodisponibilité de la curcumine de 2000% en inhibant la glucuronidation hépatique et intestinale.",
    pourquoi_bloomlab: {
      probleme_traditionnel: "La curcumine est quasi-insoluble dans l'eau et thermolabile. Une infusion est inutile. Une cuisson à 100°C dans l'huile oxyde les curcuminoïdes et évapore la turmérone.",
      phase_A: { temp: "70°C", temps: "2h00", solvant: "Eau distillée + Glycérine (70/30)", cible: "Polysaccharides prébiotiques et composés hydrosolubles", translations: { en: { cible: "Prebiotic polysaccharides and water-soluble compounds" }, de: { cible: "Präbiotische Polysaccharide und wasserlösliche Verbindungen" } } },
      phase_B: { temp: "50°C", temps: "3h00", solvant: "Alcool bio 96°", cible: "Curcuminoïdes, pipérine et huiles essentielles", translations: { en: { cible: "Curcuminoids, piperine and essential oils" }, de: { cible: "Curcuminoide, Piperin und ätherische Öle" } } },
      resultat: "Extraction complète du spectre anti-inflammatoire sans oxydation thermique, with un taux d'alcool final idéal pour la conservation et l'absorption.",
      translations: {
        en: {
          probleme_traditionnel: "Curcumin is almost insoluble in water and thermolabile. An infusion is useless. Cooking at 100°C in oil oxidizes curcuminoids and evaporates turmerone.",
          resultat: "Complete extraction of the anti-inflammatory spectrum without thermal oxidation, with an ideal final alcohol rate for preservation and absorption."
        },
        de: {
          probleme_traditionnel: "Curcumin ist fast unlöslich in Wasser und thermolabil. Ein Aufguss ist nutzlos. Kochen bei 100°C in Öl oxidiert Curcuminoide und lässt Turmeron verdampfen.",
          resultat: "Vollständige Extraktion des entzündungshemmenden Spektrums ohne thermische Oxidation, mit einem idealen Endalkoholgehalt für Konservierung und Absorption."
        }
      }
    },
    recette_pas_a_pas: {
      batch_standard: "Cible BloomLab : 750ml de solvant + 75g de plantes (Rendement final estimé : ~600-650ml)",
      ingredients: {
        phase_A: ["50g de poudre de Curcuma (ou tranches fines)", "350ml d'Eau distillée", "150ml de Glycérine végétale"],
        phase_B: ["15g de poudre de Curcuma", "10g de Poivre noir concassé", "250ml d'Alcool bio 96°"]
      },
      preparation: [
        "1. Pesez précisément les ingrédients à l'aide d'une balance de précision (0,1g).",
        "2. Si vous utilisez des tranches de curcuma, mixez-les brièvement pour obtenir une poudre grossière (cela augmente la surface de contact).",
        "3. Concassez les baies de poivre noir au mortier juste avant l'extraction pour libérer la pipérine."
      ],
      phase_A_instructions: [
        "1. Versez les 350ml d'eau et les 150ml de glycérine dans la cuve propre de la BloomLab.",
        "2. Ajoutez les 50g de curcuma.",
        "3. Fermez la cuve hermétiquement.",
        "4. Allumez la machine, sélectionnez le mode manuel 'OIL' (ou 'BUTTER').",
        "5. Réglez la TEMPÉRATURE sur 70°C et le TEMPS sur 2h00.",
        "6. Appuyez sur START. Laissez le cycle se terminer."
      ],
      transition: [
        "1. À la fin du bip, éteignez la machine.",
        "2. Laissez reposer 15 à 20 minutes. La température doit descendre naturellement en dessous de 45°C.",
        "3. TEST SENSORIEL OBLIGATOIRE : Posez votre main à plat sur la paroi extérieure de la cuve. Elle doit être 'tiède au toucher' (environ 40°C, comme l'eau d'un bain confortable), et non brûlante.",
        "4. ⚠️ SÉCURITÉ : N'ajoutez l'alcool que lorsque ce test est validé pour éviter toute vaporisation brutale ou risque inflammatoire."
      ],
      phase_B_instructions: [
        "1. Ouvrez la cuve. Versez délicatement les 250ml d'alcool.",
        "2. Ajoutez le mélange de 15g de curcuma et 10g de poivre concassé.",
        "3. Refermez hermétiquement.",
        "4. Sélectionnez à nouveau le mode manuel 'OIL'.",
        "5. Réglez la TEMPÉRATURE sur 50°C et le TEMPS sur 3h00.",
        "6. Appuyez sur START."
      ],
      filtration_et_finition: [
        "1. À la fin du cycle, laissez reposer 10 min pour que les particules tombent au fond.",
        "2. Placez une étamine (tissu en coton fin) sur un grand saladier en verre.",
        "3. Versez le contenu de la cuve lentement.",
        "4. Ramassez les bords de l'étamine et pressez fermement le marc avec vos mains (portez des gants, c'est tachant) pour extraire chaque goutte.",
        "5. Transvasez l'élixir filtré dans des flacons en verre ambré. Conservez à l'abri de la lumière."
      ]
    },
    socle_synergique: {
      cofacteurs_complements: [
        { 
          nom: "Oméga-3 (EPA/DHA)", 
          dose: "2g/jour", 
          role: "Fournit les membranes cellulaires pour que les curcuminoïdes puissent moduler l'inflammation lipidique.",
          translations: {
            en: { nom: "Omega-3 (EPA/DHA)", dose: "2g/day", role: "Provides cell membranes so that curcuminoids can modulate lipid inflammation." },
            de: { nom: "Omega-3 (EPA/DHA)", dose: "2g/Tag", role: "Liefert Zellmembranen, damit Curcuminoide die Lipid-Entzündung modulieren können." }
          }
        },
        { 
          nom: "Vitamine D3 + K2", 
          dose: "2000 UI / 100µg", 
          role: "Synergie immunitaire et régulation de l'expression génique anti-inflammatoire.",
          translations: {
            en: { nom: "Vitamin D3 + K2", dose: "2000 IU / 100µg", role: "Immune synergy and regulation of anti-inflammatory gene expression." },
            de: { nom: "Vitamin D3 + K2", dose: "2000 IE / 100µg", role: "Immun-Synergie und Regulierung der entzündungshemmenden Genexpression." }
          }
        }
      ],
      leviers_du_vivant: [
        { 
          nom: "Fenêtre alimentaire (14h-16h)", 
          frequence: "Quotidienne", 
          role: "Laisse le système digestif au repos, réduisant l'inflammation intestinale de bas grade (LPS).",
          translations: {
            en: { nom: "Eating window (14h-16h)", frequence: "Daily", role: "Allows the digestive system to rest, reducing low-grade intestinal inflammation (LPS)." },
            de: { nom: "Zeitlich begrenztes Essen (14h-16h)", frequence: "Täglich", role: "Lässt das Verdauungssystem ruhen und reduziert geringgradige Darmentzündungen (LPS)." }
          }
        },
        { 
          nom: "Marche post-prandiale", 
          frequence: "10 min après chaque repas", 
          role: "Réduit le pic glycémique, limitant ainsi la glycation et l'inflammation systémique.",
          translations: {
            en: { nom: "Post-prandial walk", frequence: "10 min after each meal", role: "Reduces the glycemic peak, thereby limiting glycation and systemic inflammation." },
            de: { nom: "Spaziergang nach dem Essen", frequence: "10 Min. nach jeder Mahlzeit", role: "Reduziert die Glykämiespitze und begrenzt so die Glykation und systemische Entzündungen." }
          }
        }
      ]
    },
    convergence_ancestrale: "Pilier de l'Ayurveda depuis 4000 ans pour 'purifier le sang' et traiter les troubles articulaires. En MTC, il 'invigore le sang et brise les stases'.",
    synergies_recommandees: ["Boswellia serrata", "Gingembre officinale"],
    precautions: "Contre-indiqué en cas de calculs biliaires obstructifs ou de traitement anticoagulant. Peut tacher les vêtements et les surfaces en marbre.",
    translations: {
      en: {
        nom_commun: "Turmeric and Black Pepper",
        partie_utilisee: "Dried rhizome (powder or slices) / Dried berries",
        preuve_scientifique: "Powerful inhibition of NF-κB and 5-LOX. Piperine increases curcumin bioavailability by 2000% by inhibiting hepatic and intestinal glucuronidation.",
        convergence_ancestrale: "Pillar of Ayurveda for 4000 years to 'purify the blood' and treat joint disorders. In TCM, it 'invigorates the blood and breaks stasis'.",
        precautions: "Contraindicated in case of obstructive gallstones or anticoagulant treatment. Can stain clothes and marble surfaces."
      },
      de: {
        nom_commun: "Kurkuma und Schwarzer Pfeffer",
        partie_utilisee: "Getrocknetes Rhizom (Pulver oder Scheiben) / Getrocknete Beeren",
        preuve_scientifique: "Starke Hemmung von NF-κB und 5-LOX. Piperin erhöht die Bioverfügbarkeit von Curcumin um 2000%, indem es die hepatische und intestinale Glucuronidierung hemmt.",
        convergence_ancestrale: "Pfeiler des Ayurveda seit 4000 Jahren zur 'Reinigung des Blutes' und Behandlung von Gelenkbeschwerden. In der TCM 'belebt es das Blut und bricht Stasen'.",
        precautions: "Kontraindiziert bei obstruktiven Gallensteinen oder gerinnungshemmender Behandlung. Kann Kleidung und Marmoroberflächen verfärben."
      }
    }
  },
  {
    plant_id: "boswellia_serrata",
    nom_commun: "Boswellia (Encens)",
    nom_latin: "Boswellia serrata",
    partie_utilisee: "Résine (gomme oléorésineuse)",
    famille_bloom: "Réparateur (Muqueuses & Fascia)",
    terrains_cibles: ["T1 (Intestin)", "T8 (Inflammation)", "T6 (Fascia)"],
    actifs_cles: [
      { nom: "Acides boswelliques (AKBA)", polarite: "Liposoluble", translations: { en: { nom: "Boswellic acids (AKBA)", polarite: "Fat-soluble" }, de: { nom: "Boswelliasäuren (AKBA)", polarite: "Fettlöslich" } } },
      { nom: "Résines et huiles essentielles", polarite: "Liposoluble/Volatile", translations: { en: { nom: "Resins and essential oils", polarite: "Fat-soluble/Volatile" }, de: { nom: "Harze und ätherische Öle", polarite: "Fettlöslich/Flüchtig" } } },
      { nom: "Polysaccharides", polarite: "Hydrosoluble", translations: { en: { nom: "Polysaccharides", polarite: "Water-soluble" }, de: { nom: "Polysaccharide", polarite: "Wasserlöslich" } } }
    ],
    preuve_scientifique: "Inhibiteur spécifique et puissant de la 5-LOX (5-lipoxygénase), bloquant la production de leucotriènes pro-inflammatoires. Répare la barrière intestinale et régénère le tissu conjonctif.",
    pourquoi_bloomlab: {
      probleme_traditionnel: "La résine est insoluble dans l'eau. Une tisane ne donne qu'un liquide amer sans actifs. Chauffer la résine à 90°C dans l'alcool détruit les acides boswelliques thermolabiles.",
      phase_A: { temp: "60°C", temps: "2h00", solvant: "Eau distillée + Glycérine (70/30)", cible: "Polysaccharides apaisants pour les muqueuses", translations: { en: { cible: "Soothing polysaccharides for mucous membranes" }, de: { cible: "Beruhigende Polysaccharide für Schleimhäute" } } },
      phase_B: { temp: "45°C", temps: "4h00", solvant: "Alcool bio 96°", cible: "Acides boswelliques (AKBA) et résines", translations: { en: { cible: "Boswellic acids (AKBA) and resins" }, de: { cible: "Boswelliasäuren (AKBA) und Harze" } } },
      resultat: "Capture totale des propriétés cicatrisantes (eau) et anti-leucotriènes (alcool) sans dénaturer la structure fragile de la résine.",
      translations: {
        en: {
          probleme_traditionnel: "Resin is insoluble in water. An herbal tea only gives a bitter liquid without actives. Heating resin to 90°C in alcohol destroys thermolabile boswellic acids.",
          resultat: "Total capture of healing properties (water) and anti-leukotrienes (alcohol) without denaturing the fragile structure of the resin."
        },
        de: {
          probleme_traditionnel: "Harz ist in Wasser unlöslich. Ein Kräutertee ergibt nur eine bittere Flüssigkeit ohne Wirkstoffe. Das Erhitzen von Harz auf 90°C in Alkohol zerstört thermolabile Boswelliasäuren.",
          resultat: "Vollständige Erfassung der heilenden Eigenschaften (Wasser) und Anti-Leukotriene (Alkohol), ohne die fragile Struktur des Harzes zu denaturieren."
        }
      }
    },
    recette_pas_a_pas: {
      batch_standard: "Cible BloomLab : 750ml de solvant + 75g de plantes (Rendement final estimé : ~600-650ml)",
      ingredients: {
        phase_A: ["50g de Résine de Boswellia en larmes", "350ml d'Eau distillée", "150ml de Glycérine végétale"],
        phase_B: ["25g de Résine de Boswellia concassée", "250ml d'Alcool bio 96°"]
      },
      preparation: [
        "1. Placez les larmes de résine au congélateur 30 minutes avant de les peser (cela évite qu'elles ne collent à la balance).",
        "2. Concassez les larmes froides au mortier ou avec le dos d'une cuillère lourde pour obtenir des morceaux de la taille d'un grain de riz."
      ],
      phase_A_instructions: [
        "1. Versez les 350ml d'eau et 150ml de glycérine dans la cuve.",
        "2. Ajoutez les 50g de résine concassée.",
        "3. Fermez, mode manuel 'OIL', TEMP 60°C, TEMPS 2h00. START.",
      ],
      transition: [
        "1. Éteignez la machine à la fin du cycle.",
        "2. Laissez reposer 20 minutes. La température doit descendre naturellement en dessous de 45°C.",
        "3. TEST SENSORIEL OBLIGATOIRE : Posez votre main à plat sur la paroi extérieure de la cuve. Elle doit être 'tiède au toucher' (environ 40°C), et non brûlante.",
        "4. ⚠️ SÉCURITÉ : N'ajoutez l'alcool que lorsque ce test est validé."
      ],
      phase_B_instructions: [
        "1. Ouvrez, versez les 250ml d'alcool, ajoutez les 25g de résine restante.",
        "2. Fermez, mode manuel 'OIL', TEMP 45°C, TEMPS 4h00. START. (Le temps long est nécessaire pour solubiliser la résine)."
      ],
      filtration_et_finition: [
        "1. Le filtrage de la résine peut être collant. Utilisez une étamine fine et rincez le marc avec un tout petit peu d'alcool pur pour récupérer les derniers actifs.",
        "2. Pressez fermement. Mettez en flacon ambré."
      ]
    },
    socle_synergique: {
      cofacteurs_complements: [
        { 
          nom: "L-Glutamine", 
          dose: "5g le matin à jeun", 
          role: "Carburant principal des entérocytes, synergise avec le Boswellia pour fermer le 'Leaky Gut'.",
          translations: {
            en: { nom: "L-Glutamine", dose: "5g in the morning on an empty stomach", role: "Main fuel for enterocytes, synergizes with Boswellia to close the 'Leaky Gut'." },
            de: { nom: "L-Glutamin", dose: "5g morgens auf nüchternen Magen", role: "Hauptbrennstoff für Enterozyten, wirkt synergetisch mit Boswellia zum Schließen des 'Leaky Gut'." }
          }
        },
        { 
          nom: "Zinc Carnosine", 
          dose: "75mg 2x/jour", 
          role: "Stabilise la muqueuse gastro-intestinale et réduit l'inflammation locale.",
          translations: {
            en: { nom: "Zinc Carnosine", dose: "75mg 2x/day", role: "Stabilizes the gastrointestinal mucosa and reduces local inflammation." },
            de: { nom: "Zink-Carnosin", dose: "75mg 2x/Tag", role: "Stabilisiert die Magen-Darm-Schleimhaut und reduziert lokale Entzündungen." }
          }
        }
      ],
      leviers_du_vivant: [
        { 
          nom: "Mastication consciente", 
          frequence: "30 fois par bouchée", 
          role: "La digestion commence dans la bouche. Mâcher réduit la charge inflammatoire de l'intestin grêle.",
          translations: {
            en: { nom: "Conscious chewing", frequence: "30 times per bite", role: "Digestion starts in the mouth. Chewing reduces the inflammatory load of the small intestine." },
            de: { nom: "Bewusstes Kauen", frequence: "30 Mal pro Bissen", role: "Die Verdauung beginnt im Mund. Kauen reduziert die Entzündungslast des Dünndarms." }
          }
        }
      ]
    },
    convergence_ancestrale: "Shallaki en Ayurveda, utilisé depuis 3000 ans pour les articulations et le 'feu digestif'.",
    synergies_recommandees: ["Curcuma longa", "Orme rouge", "Aloe vera"],
    precautions: "Peut causer de légers reflux gastriques chez les sujets très sensibles. À prendre de préférence au milieu du repas.",
    translations: {
      en: {
        nom_commun: "Boswellia (Frankincense)",
        partie_utilisee: "Resin (oleoresin gum)",
        preuve_scientifique: "Specific and powerful inhibitor of 5-LOX (5-lipoxygenase), blocking the production of pro-inflammatory leukotrienes. Repairs the intestinal barrier and regenerates connective tissue.",
        convergence_ancestrale: "Shallaki in Ayurveda, used for 3000 years for joints and 'digestive fire'.",
        precautions: "May cause slight gastric reflux in very sensitive subjects. Best taken in the middle of a meal."
      },
      de: {
        nom_commun: "Boswellia (Weihrauch)",
        partie_utilisee: "Harz (Gummiharz)",
        preuve_scientifique: "Spezifischer und starker Hemmstoff der 5-LOX (5-Lipoxygenase), der die Produktion entzündungsfördernder Leukotriene blockiert. Repariert die Darmbarriere und regeneriert Bindegewebe.",
        convergence_ancestrale: "Shallaki im Ayurveda, seit 3000 Jahren für Gelenke und 'Verdauungsfeuer' verwendet.",
        precautions: "Kann bei sehr empfindlichen Personen leichten Magenreflux verursachen. Am besten mitten in einer Mahlzeit einnehmen."
      }
    }
  },
  {
    plant_id: "crocus_sativus",
    nom_commun: "Safran",
    nom_latin: "Crocus sativus",
    partie_utilisee: "Stigmates séchés (fils rouges)",
    famille_bloom: "Chef d'Orchestre (Psycho-émotionnel)",
    terrains_cibles: ["T7 (Psycho-émotionnel)", "T4 (HPA)", "T5 (Mitochondrie)"],
    actifs_cles: [
      { nom: "Safranal", polarite: "Volatile/Liposoluble", translations: { en: { nom: "Safranal", polarite: "Volatile/Fat-soluble" }, de: { nom: "Safranal", polarite: "Flüchtig/Fettlöslich" } } },
      { nom: "Crocine", polarite: "Hydrosoluble", translations: { en: { nom: "Crocine", polarite: "Water-soluble" }, de: { nom: "Crocin", polarite: "Wasserlöslich" } } },
      { nom: "Picrocrocine", polarite: "Hydrosoluble", translations: { en: { nom: "Picrocrocin", polarite: "Water-soluble" }, de: { nom: "Picrocrocin", polarite: "Wasserlöslich" } } }
    ],
    preuve_scientifique: "Modulation de la recapture de la séonine, dopamine et noradrénaline. Effets antidépresseurs et anxiolytiques validés cliniquement. Neuroprotecteur.",
    pourquoi_bloomlab: {
      probleme_traditionnel: "Le safranal est extrêmement volatil. Une infusion à l'eau bouillante le fait s'évaporer instantanément. Le séchage à l'air libre l'oxyde.",
      phase_A: { temp: "50°C", temps: "1h30", solvant: "Eau distillée + Glycérine (70/30)", cible: "Crocine et Picrocrocine", translations: { en: { cible: "Crocin and Picrocrocin" }, de: { cible: "Crocin und Picrocrocin" } } },
      phase_B: { temp: "40°C", temps: "2h00", solvant: "Alcool bio 96°", cible: "Safranal et composés volatils", translations: { en: { cible: "Safranal and volatile compounds" }, de: { cible: "Safranal und flüchtige Verbindungen" } } },
      resultat: "Préservation totale de l'arôme et des actifs neurologiques volatils grâce à une extraction à très basse température.",
      translations: {
        en: {
          probleme_traditionnel: "Safranal is extremely volatile. Boiling water infusion causes it to evaporate instantly. Open-air drying oxidizes it.",
          resultat: "Total preservation of aroma and volatile neurological actives thanks to very low temperature extraction."
        },
        de: {
          probleme_traditionnel: "Safranal ist extrem flüchtig. Ein Aufguss mit kochendem Wasser lässt es sofort verdampfen. Das Trocknen an der Luft oxidiert es.",
          resultat: "Vollständige Erhaltung des Aromas und der flüchtigen neurologischen Wirkstoffe dank einer Extraktion bei sehr niedrigen Temperaturen."
        }
      }
    },
    recette_pas_a_pas: {
      batch_standard: "Cible BloomLab : 750ml de solvant + 3g de Safran (Rendement final estimé : ~700ml). Note : Le safran est dosé à l'effet, pas au poids végétal standard.",
      ingredients: {
        phase_A: ["2g de Stigmates de Safran", "350ml d'Eau distillée", "150ml de Glycérine végétale"],
        phase_B: ["1g de Stigmates de Safran", "250ml d'Alcool bio 96°"]
      },
      preparation: [
        "1. Pesez le safran with une balance de précision (0,01g si possible). 3g au total suffisent pour un effet thérapeutique puissant sur ce volume.",
        "2. Ne broyez pas les fils, laissez-les entiers pour éviter l'oxydation prématurée."
      ],
      phase_A_instructions: [
        "1. Versez eau et glycérine dans la cuve. Ajoutez 2g de safran.",
        "2. Fermez, mode manuel 'OIL', TEMP 50°C, TEMPS 1h30. START."
      ],
      transition: [
        "1. Éteignez. Laissez reposer 20 minutes.",
        "2. TEST SENSORIEL OBLIGATOIRE : Posez votre main sur la paroi extérieure de la cuve. Elle doit être 'tiède au toucher' (environ 40°C), et non brûlante.",
        "3. ⚠️ SÉCURITÉ : N'ajoutez l'alcool que lorsque ce test est validé."
      ],
      phase_B_instructions: [
        "1. Ajoutez l'alcool et le 1g de safran restant.",
        "2. Fermez, mode manuel 'OIL', TEMP 40°C, TEMPS 2h00. START."
      ],
      filtration_et_finition: [
        "1. Filtrez TRÈS finement avec le sac filtre fournit, la préparation encore tiède. Pressez fermement le marc.",
        "2. Le liquide final aura une couleur rouge rubis profond. Conservez impérativement dans du verre violet (Miron) ou ambré, au réfrigérateur après ouverture."
      ]
    },
    socle_synergique: {
      cofacteurs_complements: [
        { 
          nom: "Magnésium Bisglycinate", 
          dose: "300mg le soir", 
          role: "Active le GABA et synergise avec le safran pour calmer le système nerveux.",
          translations: {
            en: { nom: "Magnesium Bisglycinate", dose: "300mg in the evening", role: "Activates GABA and synergizes with saffron to calm the nervous system." },
            de: { nom: "Magnesiumbisglycinat", dose: "300mg abends", role: "Aktiviert GABA und wirkt synergetisch mit Safran, um das Nervensystem zu beruhigen." }
          }
        },
        { 
          nom: "L-Tryptophane ou 5-HTP", 
          dose: "Selon tolérance", 
          role: "Apporte la matière première pour que le corps fabrique sa propre sérotonine.",
          translations: {
            en: { nom: "L-Tryptophan or 5-HTP", dose: "As tolerated", role: "Provides the raw material for the body to manufacture its own serotonin." },
            de: { nom: "L-Tryptophan oder 5-HTP", dose: "Nach Verträglichkeit", role: "Liefert den Rohstoff für den Körper, um sein eigenes Serotonin herzustellen." }
          }
        }
      ],
      leviers_du_vivant: [
        { 
          nom: "Lumière du matin", 
          frequence: "15 min dans l'heure suivant le réveil", 
          role: "Règle l'horloge circadienne et potentialise l'effet du safran sur l'humeur.",
          translations: {
            en: { nom: "Morning light", frequence: "15 min within the hour after waking", role: "Sets the circadian clock and enhances the effect of saffron on mood." },
            de: { nom: "Morgenlicht", frequence: "15 Min. innerhalb einer Stunde nach dem Aufwachen", role: "Stellt die zirkadiane Uhr ein und verstärkt die Wirkung von Safran auf die Stimmung." }
          }
        }
      ]
    },
    convergence_ancestrale: "Utilisé par Cléopâtre pour ses bains. En MTC, il 'fait circuler le Qi et le Sang, dissipe les stases et calme l'esprit (Shen)'.",
    synergies_recommandees: ["Ashwagandha", "Griffonia simplicifolia", "Mélisse"],
    precautions: "Ne pas dépasser 3g de safran par extraction. À haute dose (>5g), le safran devient toxique. Interdit aux femmes enceintes.",
    translations: {
      en: {
        nom_commun: "Saffron",
        partie_utilisee: "Dried stigmas (red threads)",
        preuve_scientifique: "Modulation of serotonin, dopamine, and norepinephrine reuptake. Clinically validated antidepressant and anxiolytic effects. Neuroprotective.",
        convergence_ancestrale: "Used by Cleopatra for her baths. In TCM, it 'circulates Qi and Blood, dissipates stasis and calms the mind (Shen)'.",
        precautions: "Do not exceed 3g of saffron per extraction. At high doses (>5g), saffron becomes toxic. Prohibited for pregnant women."
      },
      de: {
        nom_commun: "Safran",
        partie_utilisee: "Getrocknete Narben (rote Fäden)",
        preuve_scientifique: "Modulation der Wiederaufnahme von Serotonin, Dopamin und Noradrenalin. Klinisch validierte antidepressive und anxiolytische Wirkungen. Neuroprotektiv.",
        convergence_ancestrale: "Von Kleopatra für ihre Bäder verwendet. In der TCM 'lässt es Qi und Blut zirkulieren, zerstreut Stasen und beruhigt den Geist (Shen)'.",
        precautions: "3g Safran pro Extraktion nicht überschreiten. In hohen Dosen (>5g) wird Safran giftig. Für schwangere Frauen verboten."
      }
    }
  },
  {
    plant_id: "urtica_dioica",
    nom_commun: "Ortie (Feuille et Racine)",
    nom_latin: "Urtica dioica",
    partie_utilisee: "Feuilles séchées / Racines séchées",
    famille_bloom: "Pharmacie Intérieure (Minéraux & Régulation)",
    translations: {
      en: {
        nom_commun: "Nettle (Leaf and Root)",
        partie_utilisee: "Dried leaves / Dried roots",
        famille_bloom: "Internal Pharmacy (Minerals & Regulation)",
        preuve_scientifique: "The root inhibits SHBG binding and 5-alpha-reductase (reducing free DHT). The leaf is one of the richest sources of bioavailable minerals and silica for keratin.",
        convergence_ancestrale: "Sacred plant of the druids. Used since Antiquity to 'cleanse the blood' and strengthen the kidneys.",
        precautions: "Nettle leaf has a diuretic effect. Keep well hydrated. The root may interact with medications for the prostate or hypertension."
      },
      de: {
        nom_commun: "Brennnessel (Blatt und Wurzel)",
        partie_utilisee: "Getrocknete Blätter / Getrocknete Wurzeln",
        famille_bloom: "Innere Apotheke (Mineralien & Regulierung)",
        preuve_scientifique: "Die Wurzel hemmt die SHBG-Bindung und die 5-Alpha-Reduktase (reduziert freies DHT). Das Blatt ist eine der reichsten Quellen für bioverfügbare Mineralien und Kieselsäure für Keratin.",
        convergence_ancestrale: "Heilige Pflanze der Druiden. Seit der Antike verwendet, um 'das Blut zu reinigen' und die Nieren zu stärken.",
        precautions: "Brennnesselblätter haben eine harntreibende Wirkung. Ausreichend trinken. Die Wurzel kann mit Medikamenten für die Prostata oder Bluthochdruck interagieren."
      }
    },
    terrains_cibles: ["T1 (Intestin)", "T9 (Peau/Phanères)", "T10 (Hormonal)"],
    actifs_cles: [
      { nom: "Silice organique", polarite: "Hydrosoluble", translations: { en: { nom: "Organic silica", polarite: "Water-soluble" }, de: { nom: "Organisches Silizium", polarite: "Wasserlöslich" } } },
      { nom: "Polyphénols et Flavonoïdes", polarite: "Hydrosoluble", translations: { en: { nom: "Polyphenols and Flavonoids", polarite: "Water-soluble" }, de: { nom: "Polyphenole und Flavonoide", polarite: "Wasserlöslich" } } },
      { nom: "Phytostérols (Racine)", polarite: "Liposoluble", translations: { en: { nom: "Phytosterols (Root)", polarite: "Fat-soluble" }, de: { nom: "Phytosterine (Wurzel)", polarite: "Fettlöslich" } } },
      { nom: "Chlorophylle", polarite: "Liposoluble", translations: { en: { nom: "Chlorophyll", polarite: "Fat-soluble" }, de: { nom: "Chlorophyll", polarite: "Fettlöslich" } } }
    ],
    preuve_scientifique: "La racine inhibe la liaison de la SHBG et la 5-alpha-réductase (réduisant le DHT libre). La feuille est l'une des sources les plus riches en minéraux biodisponibles et en silice pour la kératine.",
    pourquoi_bloomlab: {
      probleme_traditionnel: "La silice et les minéraux nécessitent une chaleur soutenue pour être extraits des parois cellulaires. Les phytostérols de la racine nécessitent un solvant organique. Une simple tisane rate la racine et l'huile rate la feuille.",
      phase_A: { temp: "75°C", temps: "2h00", solvant: "Eau distillée + Glycérine (70/30)", cible: "Silice, minéraux, polyphénols de la feuille", translations: { en: { cible: "Silica, minerals, leaf polyphenols" }, de: { cible: "Silizium, Mineralien, Blattpolyphenole" } } },
      phase_B: { temp: "50°C", temps: "3h00", solvant: "Alcool bio 96°", cible: "Phytostérols de la racine, chlorophylle", translations: { en: { cible: "Root phytosterols, chlorophyll" }, de: { cible: "Wurzelphytosterine, Chlorophyll" } } },
      resultat: "Un élixir complet qui agit à la fois sur la structure du cheveu (silice) et sur le blocage hormonal du follicule (phytostérols).",
      translations: {
        en: {
          probleme_traditionnel: "Silica and minerals require sustained heat to be extracted from cell walls. Root phytosterols require an organic solvent. A simple herbal tea misses the root and oil misses the leaf.",
          resultat: "A complete elixir that acts on both the hair structure (silica) and the hormonal blockage of the follicle (phytosterols)."
        },
        de: {
          probleme_traditionnel: "Silizium und Mineralien erfordern anhaltende Hitze, um aus den Zellwänden extrahiert zu werden. Wurzelphytosterine erfordern ein organisches Lösungsmittel. Ein einfacher Kräutertee verfehlt die Wurzel und Öl das Blatt.",
          resultat: "Ein komplettes Elixier, das sowohl auf die Haarstruktur (Silizium) als auch auf die hormonelle Blockade des Follikels (Phytosterine) wirkt."
        }
      }
    },
    recette_pas_a_pas: {
      batch_standard: "Cible BloomLab : 750ml de solvant + 75g de plantes (Rendement final estimé : ~600-650ml)",
      ingredients: {
        phase_A: ["50g de Feuilles d'Ortie séchées", "350ml d'Eau distillée", "150ml de Glycérine végétale"],
        phase_B: ["25g de Racines d'Ortie séchées (concassées)", "250ml d'Alcool bio 96°"]
      },
      preparation: [
        "1. Les racines d'ortie sont très dures. Concassez-les vigoureusement au mortier ou hachez-les finement.",
        "2. Les feuilles peuvent être utilisées telles quelles, ou légèrement froissées à la main."
      ],
      phase_A_instructions: [
        "1. Versez eau et glycérine. Ajoutez les 50g de feuilles.",
        "2. Fermez, mode manuel 'OIL', TEMP 75°C, TEMPS 2h00. START."
      ],
      transition: [
        "1. Éteignez. Laissez reposer 20 minutes.",
        "2. TEST SENSORIEL OBLIGATOIRE : Posez votre main sur la paroi extérieure de la cuve. Elle doit être 'tiède au toucher' (environ 40°C), et non brûlante.",
        "3. ⚠️ SÉCURITÉ : N'ajoutez l'alcool que lorsque ce test est validé."
      ],
      phase_B_instructions: [
        "1. Ajoutez l'alcool et les 25g de racines.",
        "2. Fermez, mode manuel 'OIL', TEMP 50°C, TEMPS 3h00. START."
      ],
      filtration_et_finition: [
        "1. Filtrez TRÈS finement with le sac filtre fournit, la préparation encore tiède. Pressez fermement le marc. Pressez bien le marc de racines, c'est là que se concentrent les phytostérols.",
        "2. Le liquide aura une belle couleur vert-brun foncé. Mettez en flacon."
      ]
    },
    socle_synergique: {
      cofacteurs_complements: [
        { 
          nom: "Zinc Picolinate", 
          dose: "15-30mg/jour", 
          role: "Cofacteur essentiel de la synthèse de la kératine et de la régulation du sébum.",
          translations: {
            en: { nom: "Zinc Picolinate", dose: "15-30mg/day", role: "Essential cofactor for keratin synthesis and sebum regulation." },
            de: { nom: "Zink-Picolinat", dose: "15-30mg/Tag", role: "Wichtiger Cofaktor für die Keratinsynthese und Talgregulierung." }
          }
        },
        { 
          nom: "Fer (Bisglycinate)", 
          dose: "Selon ferritine (si < 50ng/mL)", 
          role: "L'ortie apporte du fer végétal, mais le complément assure le seuil critique pour la pousse.",
          translations: {
            en: { nom: "Iron (Bisglycinate)", dose: "According to ferritin (if < 50ng/mL)", role: "Nettle provides plant-based iron, but the supplement ensures the critical threshold for growth." },
            de: { nom: "Eisen (Bisglycinat)", dose: "Je nach Ferritin (wenn < 50ng/mL)", role: "Brennnessel liefert pflanzliches Eisen, aber die Ergänzung stellt die kritische Schwelle für das Wachstum sicher." }
          }
        }
      ],
      leviers_du_vivant: [
        { 
          nom: "Inversion gravitaire", 
          frequence: "2 min/jour", 
          role: "Augmente l'afflux sanguin vers le cuir chevelu par simple mécanique vasculaire.",
          translations: {
            en: { nom: "Gravitational inversion", frequence: "2 min/day", role: "Increases blood flow to the scalp through simple vascular mechanics." },
            de: { nom: "Umkehrhaltung", frequence: "2 Min./Tag", role: "Erhöht den Blutfluss zur Kopfhaut durch einfache Gefäßmechanik." }
          }
        }
      ]
    },
    convergence_ancestrale: "Plante sacrée des druides. Utilisée depuis l'Antiquité pour 'nettoyer le sang' et fortifier les reins.",
    synergies_recommandees: ["Romarin à cinéole", "Prêle des champs", "Saw palmetto"],
    precautions: "La feuille d'ortie a un effet diurétique. Bien s'hydrater. La racine peut interagir avec les médicaments pour la prostate ou l'hypertension."
  },
  {
    plant_id: "equisetum_arvense",
    nom_commun: "Prêle des champs",
    nom_latin: "Equisetum arvense",
    partie_utilisee: "Tiges stériles séchées",
    famille_bloom: "Réparateur (Structure & Tissu conjonctif)",
    terrains_cibles: ["T9 (Peau/Phanères)", "T6 (Fascia)", "T1 (Intestin)"],
    actifs_cles: [
      { nom: "Silice organique biodisponible", polarite: "Hydrosoluble", translations: { en: { nom: "Bioavailable organic silica", polarite: "Water-soluble" }, de: { nom: "Bioverfügbares organisches Silizium", polarite: "Wasserlöslich" } } },
      { nom: "Flavonoïdes", polarite: "Hydrosoluble", translations: { en: { nom: "Flavonoids", polarite: "Water-soluble" }, de: { nom: "Flavonoide", polarite: "Wasserlöslich" } } },
      { nom: "Saponines", polarite: "Hydrosoluble", translations: { en: { nom: "Saponins", polarite: "Water-soluble" }, de: { nom: "Saponine", polarite: "Wasserlöslich" } } }
    ],
    preuve_scientifique: "La plante terrestre la plus riche en silice (jusqu'à 10%). La silice est indispensable à la synthèse du collagène, à la minéralisation osseuse et à la structure de la kératine.",
    pourquoi_bloomlab: {
      probleme_traditionnel: "La silice est piégée dans des parois cellulaires très lignifiées. Elle nécessite une température proche de l'ébullition pour être extraite, mais une ébullition prolongée dégrade les flavonoïdes associés.",
      phase_A: { temp: "80°C", temps: "2h30", solvant: "Eau distillée + Glycérine (70/30)", cible: "Silice, minéraux, saponines", translations: { en: { cible: "Silica, minerals, saponins" }, de: { cible: "Silizium, Mineralien, Saponine" } } },
      phase_B: { temp: "50°C", temps: "2h00", solvant: "Alcool bio 70°", cible: "Flavonoïdes et stabilisation", translations: { en: { cible: "Flavonoids and stabilization" }, de: { cible: "Flavonoide und Stabilisierung" } } },
      resultat: "Extraction maximale de la silice grâce à la chaleur prolongée à 80°C, tout en préservant les flavonoïdes lors d'une Phase B douce.",
      translations: {
        en: {
          probleme_traditionnel: "Silica is trapped in highly lignified cell walls. It requires a temperature close to boiling to be extracted, but prolonged boiling degrades the associated flavonoids.",
          resultat: "Maximum extraction of silica thanks to prolonged heat at 80°C, while preserving flavonoids during a gentle Phase B."
        },
        de: {
          probleme_traditionnel: "Silizium ist in stark lignifizierten Zellwänden eingeschlossen. Es erfordert eine Temperatur nahe dem Siedepunkt, um extrahiert zu werden, aber längeres Kochen baut die zugehörigen Flavonoide ab.",
          resultat: "Maximale Extraktion von Silizium dank längerer Hitze bei 80°C, während die Flavonoide während einer sanften Phase B erhalten bleiben."
        }
      }
    },
    recette_pas_a_pas: {
      batch_standard: "Cible BloomLab : 750ml de solvant + 75g de plantes (Rendement final estimé : ~600-650ml)",
      ingredients: {
        phase_A: ["50g de Tiges de Prêle séchées", "350ml d'Eau distillée", "150ml de Glycérine végétale"],
        phase_B: ["25g de Tiges de Prêle séchées", "250ml d'Alcool bio 70°"]
      },
      preparation: [
        "1. La prêle est très abrasive et coupante. Portez des gants si vous la manipulez à mains nues.",
        "2. Cassez les tiges en morceaux de 1 à 2 cm de long pour optimiser l'extraction sans faire de la poussière."
      ],
      phase_A_instructions: [
        "1. Versez eau et glycérine. Ajoutez 50g de prêle.",
        "2. Fermez, mode manuel 'OIL', TEMP 80°C, TEMPS 2h30. START. (La température plus haute est nécessaire pour la silice)."
      ],
      transition: [
        "1. Éteignez. Laissez reposer 25 minutes. La prêle retient beaucoup de chaleur, soyez patient.",
        "2. TEST SENSORIEL OBLIGATOIRE : Posez votre main sur la paroi extérieure de la cuve. Elle doit être 'tiède au toucher' (environ 40°C), et non brûlante.",
        "3. ⚠️ SÉCURITÉ : N'ajoutez l'alcool que lorsque ce test est validé."
      ],
      phase_B_instructions: [
        "1. Ajoutez l'alcool et les 25g de prêle restants.",
        "2. Fermez, mode manuel 'OIL', TEMP 50°C, TEMPS 2h00. START."
      ],
      filtration_et_finition: [
        "1. Filtrez TRÈS finement with le sac filtre fournit, la préparation encore tiède. Pressez fermement le marc. La prêle laisse beaucoup de résidus siliceux (une fine poudre au fond).",
        "2. Laissez décanter le filtrat 2h au réfrigérateur, puis soutirez le liquide clair pour éviter les dépôts dans le flacon final."
      ]
    },
    socle_synergique: {
      cofacteurs_complements: [
        { 
          nom: "Vitamine C (Liposomale ou Acérola)", 
          dose: "500mg/jour", 
          role: "La silice ne peut pas synthétiser le collagène sans la Vitamine C. Elles sont indissociables.",
          translations: {
            en: { nom: "Vitamin C (Liposomal or Acerola)", dose: "500mg/day", role: "Silica cannot synthesize collagen without Vitamin C. They are inseparable." },
            de: { nom: "Vitamin C (Liposomal oder Acerola)", dose: "500mg/Tag", role: "Silizium kann ohne Vitamin C kein Kollagen synthetisieren. Sie sind untrennbar." }
          }
        },
        { 
          nom: "Collagène hydrolysé (Type I et III)", 
          dose: "10g/jour", 
          role: "Apporte les acides aminés spécifiques (glycine, proline) que la silice va 'cimenter'.",
          translations: {
            en: { nom: "Hydrolyzed Collagen (Type I and III)", dose: "10g/day", role: "Provides specific amino acids (glycine, proline) that silica will 'cement'." },
            de: { nom: "Hydrolysiertes Kollagen (Typ I und III)", dose: "10g/Tag", role: "Liefert spezifische Aminosäuren (Glycin, Prolin), die das Silizium 'zementieren' wird." }
          }
        }
      ],
      leviers_du_vivant: [
        { 
          nom: "Exposition solaire modérée", 
          frequence: "15 min/jour", 
          role: "La Vitamine D et la chaleur douce stimulent les fibroblastes pour produire le collagène.",
          translations: {
            en: { nom: "Moderate sun exposure", frequence: "15 min/day", role: "Vitamin D and gentle heat stimulate fibroblasts to produce collagen." },
            de: { nom: "Mäßige Sonnenexposition", frequence: "15 Min./Tag", role: "Vitamin D und sanfte Hitze stimulieren die Fibroblasten zur Kollagenproduktion." }
          }
        }
      ]
    },
    convergence_ancestrale: "Utilisée par les Romains pour souder les fractures osseuses. En Ayurveda, elle est connue sous le nom de 'Punarnava' (celle qui renouvelle le corps).",
    synergies_recommandees: ["Ortie", "Centella asiatica", "Bambou"],
    precautions: "Contre-indiquée en cas d'insuffisance rénale ou cardiaque. Cure de 3 semaines max, suivie d'une pause d'une semaine.",
    translations: {
      en: {
        nom_commun: "Horsetail",
        partie_utilisee: "Dried sterile stems",
        preuve_scientifique: "The terrestrial plant richest in silica (up to 10%). Silica is essential for collagen synthesis, bone mineralization, and keratin structure.",
        convergence_ancestrale: "Used by the Romans to weld bone fractures. In Ayurveda, it is known as 'Punarnava' (the one that renews the body).",
        precautions: "Contraindicated in case of renal or cardiac failure. 3-week course max, followed by a one-week break."
      },
      de: {
        nom_commun: "Schachtelhalm",
        partie_utilisee: "Getrocknete sterile Stängel",
        preuve_scientifique: "Die siliziumreichste Landpflanze (bis zu 10%). Silizium ist für die Kollagensynthese, die Knochenmineralisierung und die Keratinstruktur unerlässlich.",
        convergence_ancestrale: "Von den Römern zum Schweißen von Knochenbrüchen verwendet. Im Ayurveda ist sie als 'Punarnava' bekannt (diejenige, die den Körper erneuert).",
        precautions: "Kontraindiziert bei Nieren- oder Herzinsuffizienz. Max. 3-wöchige Kur, gefolgt von einer einwöchigen Pause."
      }
    }
  },
  {
    plant_id: "zingiber_officinale",
    nom_commun: "Gingembre",
    nom_latin: "Zingiber officinale",
    partie_utilisee: "Rhizome séché en tranches ou poudre",
    famille_bloom: "Déclencheur (Activateur métabolique)",
    terrains_cibles: ["T1 (Intestin)", "T5 (Mitochondrie)", "T8 (Inflammation)"],
    actifs_cles: [
      { nom: "[6]-Gingérols", polarite: "Liposoluble/Thermolabile", translations: { en: { nom: "[6]-Gingerols", polarite: "Fat-soluble/Thermolabile" }, de: { nom: "[6]-Gingerole", polarite: "Fettlöslich/Thermolabil" } } },
      { nom: "Shogaols", polarite: "Liposoluble", translations: { en: { nom: "Shogaols", polarite: "Fat-soluble" }, de: { nom: "Shogaole", polarite: "Fettlöslich" } } },
      { nom: "Zingibérène", polarite: "Volatile", translations: { en: { nom: "Zingiberene", polarite: "Volatile" }, de: { nom: "Zingiberen", polarite: "Flüchtig" } } },
      { nom: "Polysaccharides", polarite: "Hydrosoluble" }
    ],
    preuve_scientifique: "Activation de l'autophagie, stimulation de la microcirculation, inhibition du NLRP3 inflammasome et action anti-nauséeuse puissante via les récepteurs sérotoninergiques 5-HT3.",
    pourquoi_bloomlab: {
      probleme_traditionnel: "Le [6]-gingérol se transforme en shogaol (moins actif pour certaines cibles) au-delà de 60°C. L'huile essentielle (zingibérène) s'évapore à l'air libre ou à l'ébullition.",
      phase_A: { temp: "70°C", temps: "2h00", solvant: "Eau distillée + Glycérine (70/30)", cible: "Polysaccharides prébiotiques et amidons", translations: { en: { cible: "Prebiotic polysaccharides and starches" }, de: { cible: "Präbiotische Polysaccharide und Stärken" } } },
      phase_B: { temp: "45°C", temps: "3h00", solvant: "Alcool bio 96°", cible: "Gingérols, shogaols et huiles essentielles", translations: { en: { cible: "Gingerols, shogaols and essential oils" }, de: { cible: "Gingerole, Shogaole und ätherische Öle" } } },
      resultat: "Capture totale de la puissance digestive et circulatoire sans dénaturer les molécules thermosensibles.",
      translations: {
        en: {
          probleme_traditionnel: "[6]-gingerol turns into shogaol (less active for certain targets) above 60°C. Essential oil (zingiberene) evaporates in open air or when boiling.",
          resultat: "Total capture of digestive and circulatory power without denaturing thermosensitive molecules."
        },
        de: {
          probleme_traditionnel: "[6]-Gingerol verwandelt sich oberhalb von 60°C in Shogaol (weniger aktiv für bestimmte Ziele). Ätherisches Öl (Zingiberen) verdampft an der Luft oder beim Kochen.",
          resultat: "Vollständige Erfassung der Verdauungs- und Durchblutungskraft, ohne hitzeempfindliche Moleküle zu denaturieren."
        }
      }
    },
    recette_pas_a_pas: {
      batch_standard: "Cible BloomLab : 750ml de solvant + 75g de plantes (Rendement final estimé : ~600-650ml)",
      ingredients: {
        phase_A: ["50g de Rhizome de Gingembre séché (tranches)", "350ml d'Eau distillée", "150ml de Glycérine végétale"],
        phase_B: ["25g de Rhizome de Gingembre séché (poudre grossière)", "250ml d'Alcool bio 96°"]
      },
      preparation: [
        "1. Pesez 50g de tranches pour la Phase A et mixez les 25g restants en poudre grossière pour la Phase B (augmente la surface de contact).",
        "2. Si le gingembre est très sec, n'hésitez pas à le concasser légèrement au mortier."
      ],
      phase_A_instructions: [
        "1. Versez les 350ml d'eau et 150ml de glycérine dans the cuve.",
        "2. Ajoutez les 50g de tranches de gingembre.",
        "3. Fermez, mode manuel 'OIL', TEMP 70°C, TEMPS 2h00. START."
      ],
      transition: [
        "1. À la fin du bip, éteignez la machine.",
        "2. Laissez reposer 15 à 20 minutes. La température doit descendre naturellement en dessous de 45°C.",
        "3. TEST SENSORIEL OBLIGATOIRE : Posez votre main à plat sur la paroi extérieure de la cuve. Elle doit être 'tiède au toucher' (environ 40°C, comme l'eau d'un bain confortable), et non brûlante.",
        "4. ⚠️ SÉCURITÉ : N'ajoutez l'alcool que lorsque ce test est validé pour éviter toute vaporisation brutale ou risque inflammatoire."
      ],
      phase_B_instructions: [
        "1. Ouvrez la cuve. Versez délicatement les 250ml d'alcool.",
        "2. Ajoutez les 25g de poudre de gingembre.",
        "3. Refermez hermétiquement.",
        "4. Mode manuel 'OIL', TEMP 45°C, TEMPS 3h00. START."
      ],
      filtration_et_finition: [
        "1. Filtrez TRÈS finement with le sac filtre fournit, la préparation encore tiède. Pressez fermement le marc.",
        "2. Pressez fermement le marc. Le liquide aura une couleur ambrée dorée et une odeur épicée puissante. Mettez en flacon ambré."
      ]
    },
    socle_synergique: {
      cofacteurs_complements: [
        { 
          nom: "Curcuma + Poivre", 
          dose: "Selon protocole", 
          role: "Synergie anti-inflammatoire majeure (inhibition COX/LOX).",
          translations: {
            en: { nom: "Turmeric + Pepper", dose: "According to protocol", role: "Major anti-inflammatory synergy (COX/LOX inhibition)." },
            de: { nom: "Kurkuma + Pfeffer", dose: "Laut Protokoll", role: "Wichtige entzündungshemmende Synergie (COX/LOX-Hemmung)." }
          }
        },
        { 
          nom: "Magnésium", 
          dose: "300mg/jour", 
          role: "Le gingembre améliore l'absorption intestinale des minéraux.",
          translations: {
            en: { nom: "Magnesium", dose: "300mg/day", role: "Ginger improves intestinal absorption of minerals." },
            de: { nom: "Magnesium", dose: "300mg/Tag", role: "Ingwer verbessert die intestinale Aufnahme von Mineralien." }
          }
        }
      ],
      leviers_du_vivant: [
        { 
          nom: "Marche post-prandiale", 
          frequence: "10 min après le repas", 
          role: "Le gingembre accélère la vidange gastrique, la marche optimise la glycémie.",
          translations: {
            en: { nom: "Post-prandial walk", frequence: "10 min after meal", role: "Ginger accelerates gastric emptying, walking optimizes blood sugar." },
            de: { nom: "Spaziergang nach dem Essen", frequence: "10 Min. nach der Mahlzeit", role: "Ingwer beschleunigt die Magenentleerung, Gehen optimiert den Blutzuckerspiegel." }
          }
        }
      ]
    },
    note_expert: "💡 Note de l'expert : Ce lot couvre les fonctions neurologiques, immunitaires et hépatiques avec une précision chirurgicale.",
    convergence_ancestrale: "Utilisé depuis 5000 ans en Ayurveda (Shunthi) pour allumer 'Agni' (le feu digestif) et en MTC pour réchauffer le Poumon et l'Estomac.",
    synergies_recommandees: ["Curcuma longa", "Poivre noir", "Cannelle"],
    precautions: "Déconseillé à haute dose en cas d'ulcère gastrique actif ou de traitement anticoagulant.",
    translations: {
      en: {
        nom_commun: "Ginger",
        partie_utilisee: "Dried rhizome in slices or powder",
        preuve_scientifique: "Powerful prokinetic and anti-emetic. Gingerols and shogaols modulate prostaglandin and leukotriene synthesis.",
        convergence_ancestrale: "Pillar of TCM (Sheng Jiang) for 'warming the middle' and driving out 'cold and damp'.",
        precautions: "May increase the effect of anticoagulants. Avoid in case of biliary obstruction."
      },
      de: {
        nom_commun: "Ingwer",
        partie_utilisee: "Getrocknetes Rhizom in Scheiben oder Pulver",
        preuve_scientifique: "Starkes Prokinetikum und Antiemetikum. Gingerole und Shogaole modulieren die Prostaglandin- und Leukotrien-Synthese.",
        convergence_ancestrale: "Pfeiler der TCM (Sheng Jiang) zur 'Erwärmung der Mitte' und zum Austreiben von 'Kälte und Feuchtigkeit'.",
        precautions: "Kann die Wirkung von Antikoagulanzien verstärken. Bei Gallengangsverschluss vermeiden."
      }
    }
  },
  {
    plant_id: "scutellaria_baicalensis",
    nom_commun: "Scutellaire de Baïkal",
    nom_latin: "Scutellaria baicalensis",
    partie_utilisee: "Racine séchée",
    famille_bloom: "Verrou (Neuro-inflammation)",
    terrains_cibles: ["T7 (Psycho-émotionnel)", "T8 (Inflammation)", "T4 (HPA)"],
    actifs_cles: [
      { nom: "Baicaline", polarite: "Hydrosoluble", translations: { en: { nom: "Baicalin", polarite: "Water-soluble" }, de: { nom: "Baicalin", polarite: "Wasserlöslich" } } },
      { nom: "Wogonine", polarite: "Liposoluble", translations: { en: { nom: "Wogonin", polarite: "Fat-soluble" }, de: { nom: "Wogonin", polarite: "Fettlöslich" } } },
      { nom: "Baicaléine", polarite: "Liposoluble", translations: { en: { nom: "Baicalein", polarite: "Fat-soluble" }, de: { nom: "Baicalein", polarite: "Fettlöslich" } } }
    ],
    preuve_scientifique: "Inhibition puissante de la neuro-inflammation, protection de la barrière hémato-encéphalique, modulation des récepteurs GABA-A (anxiolytique) et inhibition de la voie NF-κB.",
    pourquoi_bloomlab: {
      probleme_traditionnel: "Les flavonoïdes de la scutellaire ont des polarités différentes. La baicaline s'extrait à l'eau chaude, mais la wogonine (cruciale pour le cerveau) nécessite un solvant organique et une chaleur douce.",
      phase_A: { temp: "75°C", temps: "2h00", solvant: "Eau distillée + Glycérine (70/30)", cible: "Baicaline et glycosides hydrosolubles", translations: { en: { cible: "Baicalin and water-soluble glycosides" }, de: { cible: "Baicalin und wasserlösliche Glykoside" } } },
      phase_B: { temp: "50°C", temps: "3h00", solvant: "Alcool bio 96°", cible: "Wogonine, baicaléine et fractions lipophiles", translations: { en: { cible: "Wogonin, baicalein and lipophilic fractions" }, de: { cible: "Wogonin, Baicalein und lipophile Fraktionen" } } },
      resultat: "Spectre complet pour apaiser le 'feu' neuro-inflammatoire sans sédation chimique.",
      translations: {
        en: {
          probleme_traditionnel: "Skullcap flavonoids have different polarities. Baicalin is extracted in hot water, but wogonin (crucial for the brain) requires an organic solvent and gentle heat.",
          resultat: "Full spectrum to soothe neuro-inflammatory 'fire' without chemical sedation."
        },
        de: {
          probleme_traditionnel: "Die Flavonoide des Helmkrauts haben unterschiedliche Polaritäten. Baicalin wird in heißem Wasser extrahiert, aber Wogonin (entscheidend für das Gehirn) erfordert ein organisches Lösungsmittel und sanfte Hitze.",
          resultat: "Vollspektrum zur Linderung des neuroinflammatorischen 'Feuers' ohne chemische Sedierung."
        }
      }
    },
    recette_pas_a_pas: {
      batch_standard: "Cible BloomLab : 750ml de solvant + 75g de plantes (Rendement final estimé : ~600-650ml)",
      ingredients: {
        phase_A: ["50g de Racine de Scutellaire (morceaux)", "350ml d'Eau distillée", "150ml de Glycérine végétale"],
        phase_B: ["25g de Racine de Scutellaire (poudre)", "250ml d'Alcool bio 96°"]
      },
      preparation: [
        "1. La racine est très dure et fibreuse. Concassez les 50g en petits copeaux.",
        "2. Mixez les 25g restants en poudre fine pour la Phase B."
      ],
      phase_A_instructions: [
        "1. Versez eau et glycérine. Ajoutez les 50g de copeaux.",
        "2. Fermez, mode manuel 'OIL', TEMP 75°C, TEMPS 2h00. START."
      ],
      transition: [
        "1. Éteignez. Laissez reposer 20 minutes.",
        "2. TEST SENSORIEL OBLIGATOIRE : Posez votre main sur la paroi extérieure de la cuve. Elle doit être 'tiède au toucher' (environ 40°C), et non brûlante.",
        "3. ⚠️ SÉCURITÉ : N'ajoutez l'alcool que lorsque ce test est validé."
      ],
      phase_B_instructions: [
        "1. Ajoutez l'alcool et les 25g de poudre.",
        "2. Fermez, mode manuel 'OIL', TEMP 50°C, TEMPS 3h00. START."
      ],
      filtration_et_finition: [
        "1. Filtrez TRÈS finement with le sac filtre fournit, la préparation encore tiède. Pressez fermement le marc. La racine de scutellaire laisse un dépôt jaune caractéristique (la baicaline).",
        "2. Pressez bien. Le liquide final est d'un jaune intense. Mettez en flacon ambré."
      ]
    },
    socle_synergique: {
      cofacteurs_complements: [
        { 
          nom: "Magnésium Bisglycinate", 
          dose: "300mg le soir", 
          role: "Synergie GABAergique pour calmer le système nerveux.",
          translations: {
            en: { nom: "Magnesium Bisglycinate", dose: "300mg in the evening", role: "GABAergic synergy to calm the nervous system." },
            de: { nom: "Magnesiumbisglycinat", dose: "300mg abends", role: "GABAerge Synergie zur Beruhigung des Nervensystems." }
          }
        },
        { 
          nom: "Oméga-3 (EPA/DHA)", 
          dose: "2g/jour", 
          role: "Nourrit les membranes neuronales ciblées par la scutellaire.",
          translations: {
            en: { nom: "Omega-3 (EPA/DHA)", dose: "2g/day", role: "Nourishes the neuronal membranes targeted by skullcap." },
            de: { nom: "Omega-3 (EPA/DHA)", dose: "2g/Tag", role: "Nährt die durch Helmkraut angezielten Neuronenmembranen." }
          }
        }
      ],
      leviers_du_vivant: [
        { 
          nom: "Cohérence cardiaque", 
          frequence: "5 min, 3x/jour", 
          role: "Stimulation mécanique du nerf vague, potentialise l'effet anxiolytique.",
          translations: {
            en: { nom: "Heart coherence", frequence: "5 min, 3x/day", role: "Mechanical stimulation of the vagus nerve, enhances the anxiolytic effect." },
            de: { nom: "Herzkohärenz", frequence: "5 Min., 3x/Tag", role: "Mechanische Stimulation des Vagusnervs, verstärkt die anxiolytische Wirkung." }
          }
        }
      ]
    },
    note_expert: "💡 Note de l'expert : Ce lot couvre les fonctions neurologiques, immunitaires et hépatiques avec une précision chirurgicale. La Scutellaire et la Valériane sont des 'Verrous' puissants. Votre machine devient littéralement la seule façon de préserver ces actifs.",
    convergence_ancestrale: "Huang Qin en MTC. Utilisée depuis 2000 ans pour 'purger la chaleur et le feu', particulièrement du Poumon et du Foie (colère/frustration).",
    synergies_recommandees: ["Ashwagandha", "Passiflore", "Mélisse"],
    precautions: "Peut potentialiser les sédatifs. À éviter pendant la grossesse.",
    translations: {
      en: {
        nom_commun: "Baikal Skullcap",
        partie_utilisee: "Dried root",
        preuve_scientifique: "Powerful inhibition of neuro-inflammation, protection of the blood-brain barrier, modulation of GABA-A receptors (anxiolytic), and inhibition of the NF-κB pathway.",
        convergence_ancestrale: "Huang Qin in TCM. Used for 2000 years to 'purge heat and fire', particularly of the Lung and Liver (anger/frustration).",
        precautions: "May potentiate sedatives. Avoid during pregnancy."
      },
      de: {
        nom_commun: "Baikal-Helmkraut",
        partie_utilisee: "Getrocknete Wurzel",
        preuve_scientifique: "Starke Hemmung der Neuroinflammation, Schutz der Blut-Hirn-Schranke, Modulation von GABA-A-Rezeptoren (anxiolytisch) und Hemmung des NF-κB-Signalwegs.",
        convergence_ancestrale: "Huang Qin in der TCM. Seit 2000 Jahren verwendet, um 'Hitze und Feuer zu reinigen', insbesondere der Lunge und Leber (Wut/Frustration).",
        precautions: "Kann Beruhigungsmittel verstärken. Während der Schwangerschaft vermeiden."
      }
    }
  },
  {
    plant_id: "rhodiola_rosea",
    nom_commun: "Rhodiola Rosea",
    nom_latin: "Rhodiola rosea",
    partie_utilisee: "Rhizome et racine séchés",
    famille_bloom: "Chef d'Orchestre (Adaptogène)",
    terrains_cibles: ["T4 (HPA)", "T5 (Mitochondrie)", "T7 (Psycho-émotionnel)"],
    actifs_cles: [
      { nom: "Rosavines", polarite: "Hydrosoluble", translations: { en: { nom: "Rosavins", polarite: "Water-soluble" }, de: { nom: "Rosavine", polarite: "Wasserlöslich" } } },
      { nom: "Salidroside", polarite: "Hydrosoluble/Liposoluble", translations: { en: { nom: "Salidroside", polarite: "Water/Fat-soluble" }, de: { nom: "Salidrosid", polarite: "Wasser/Fettlöslich" } } },
      { nom: "Huiles essentielles (arôme de rose)", polarite: "Volatile", translations: { en: { nom: "Essential oils (rose aroma)", polarite: "Volatile" }, de: { nom: "Ätherische Öle (Rosenaroma)", polarite: "Flüchtig" } } }
    ],
    preuve_scientifique: "Réduction de la fatigue et du cortisol, amélioration de la performance cognitive et physique, modulation des neurotransmetteurs (sérotonine, dopamine).",
    pourquoi_bloomlab: {
      probleme_traditionnel: "L'arôme de rose (signe de qualité) et les composés volatils s'évaporent à la chaleur. Les rosavines nécessitent une extraction aqueuse chaude, le salidroside un solvant mixte.",
      phase_A: { temp: "75°C", temps: "2h00", solvant: "Eau distillée + Glycérine (70/30)", cible: "Rosavines et polysaccharides", translations: { en: { cible: "Rosavins and polysaccharides" }, de: { cible: "Rosavine und Polysaccharide" } } },
      phase_B: { temp: "45°C", temps: "3h00", solvant: "Alcool bio 96°", cible: "Salidroside, tyrosol et volatils", translations: { en: { cible: "Salidroside, tyrosol and volatiles" }, de: { cible: "Salidrosid, Tyrosol und flüchtige Stoffe" } } },
      resultat: "Un adaptogène complet qui tonifie sans épuiser les surrénales, with son profil aromatique intact.",
      translations: {
        en: {
          probleme_traditionnel: "Rose aroma (quality sign) and volatile compounds evaporate with heat. Rosavins require hot aqueous extraction, salidroside a mixed solvent.",
          resultat: "A complete adaptogen that tones without exhausting the adrenals, with its aromatic profile intact."
        },
        de: {
          probleme_traditionnel: "Rosenaroma (Qualitätsmerkmal) und flüchtige Verbindungen verdampfen bei Hitze. Rosavine erfordern eine heiße wässrige Extraktion, Salidrosid ein gemischtes Lösungsmittel.",
          resultat: "Ein komplettes Adaptogen, das tonisiert, ohne die Nebennieren zu erschöpfen, wobei sein aromatisches Profil intakt bleibt."
        }
      }
    },
    recette_pas_a_pas: {
      batch_standard: "Cible BloomLab : 750ml de solvant + 75g de plantes (Rendement final estimé : ~600-650ml)",
      ingredients: {
        phase_A: ["50g de Rhizome de Rhodiola (morceaux)", "350ml d'Eau distillée", "150ml de Glycérine végétale"],
        phase_B: ["25g de Rhizome de Rhodiola (poudre)", "250ml d'Alcool bio 96°"]
      },
      preparation: [
        "1. Le rhizome est très dense. Concassez les 50g en copeaux.",
        "2. Mixez les 25g restants en poudre."
      ],
      phase_A_instructions: [
        "1. Versez eau et glycérine. Ajoutez les 50g de copeaux.",
        "2. Fermez, mode manuel 'OIL', TEMP 75°C, TEMPS 2h00. START."
      ],
      transition: [
        "1. Éteignez. Laissez reposer 20 minutes.",
        "2. TEST SENSORIEL OBLIGATOIRE : Posez votre main sur la paroi extérieure de la cuve. Elle doit être 'tiède au toucher' (environ 40°C), et non brûlante.",
        "3. ⚠️ SÉCURITÉ : N'ajoutez l'alcool que lorsque ce test est validé."
      ],
      phase_B_instructions: [
        "1. Ajoutez l'alcool et les 25g de poudre.",
        "2. Fermez, mode manuel 'OIL', TEMP 45°C, TEMPS 3h00. START."
      ],
      filtration_et_finition: [
        "1. Filtrez TRÈS finement with le sac filtre fournit, la préparation encore tiède. Pressez fermement le marc. Pressez le marc.",
        "2. L'élixir aura une couleur brun-rouge et une odeur subtile de rose et de terre. Mettez en flacon."
      ]
    },
    socle_synergique: {
      cofacteurs_complements: [
        { 
          nom: "Vitamines B (B-Complex)", 
          dose: "Matin", 
          role: "Cofacteurs indispensables pour la production d'ATP mitochondriale.",
          translations: {
            en: { nom: "Vitamin B Complex", dose: "Morning", role: "Essential cofactors for mitochondrial ATP production." },
            de: { nom: "Vitamin-B-Komplex", dose: "Morgens", role: "Unverzichtbare Cofaktoren für die mitochondriale ATP-Produktion." }
          }
        },
        { 
          nom: "CoQ10", 
          dose: "100mg matin", 
          role: "Optimise la chaîne respiratoire, synergise avec l'effet anti-fatigue.",
          translations: {
            en: { nom: "CoQ10", dose: "100mg morning", role: "Optimizes the respiratory chain, synergizes with the anti-fatigue effect." },
            de: { nom: "CoQ10", dose: "100mg morgens", role: "Optimiert die Atmungskette, wirkt synergetisch mit dem Anti-Müdigkeits-Effekt." }
          }
        }
      ],
      leviers_du_vivant: [
        { 
          nom: "Exposition à la lumière matinale", 
          frequence: "15 min au réveil", 
          role: "Règle le rythme circadien, la Rhodiola potentialise cet éveil naturel.",
          translations: {
            en: { nom: "Morning light exposure", frequence: "15 min on waking", role: "Sets the circadian rhythm, Rhodiola enhances this natural wakefulness." },
            de: { nom: "Morgenlicht-Exposition", frequence: "15 Min. nach dem Aufwachen", role: "Stellt den zirkadianen Rhythmus ein, Rhodiola verstärkt diese natürliche Wachheit." }
          }
        }
      ]
    },
    note_expert: "💡 Note de l'expert : Ce lot couvre les fonctions neurologiques, immunitaires et hépatiques avec une précision chirurgicale.",
    convergence_ancestrale: "Plante sacrée des peuples sibériens et vikings pour l'endurance et la longévité. En MTC, elle tonifie le Qi et le Sang.",
    synergies_recommandees: ["Ashwagandha", "Panax ginseng", "Éleuthérocoque"],
    precautions: "À prendre le matin ou midi (peut perturber le sommeil si prise le soir). Déconseillée en cas de troubles bipolaires.",
    translations: {
      en: {
        nom_commun: "Rhodiola Rosea",
        partie_utilisee: "Dried rhizome and root",
        preuve_scientifique: "Reduction of fatigue and cortisol, improvement of cognitive and physical performance, modulation of neurotransmitters (serotonin, dopamine).",
        convergence_ancestrale: "Sacred plant of the Siberian and Viking peoples for endurance and longevity. In TCM, it tonifies Qi and Blood.",
        precautions: "Best taken in the morning or noon (may disturb sleep if taken in the evening). Not recommended in case of bipolar disorder."
      },
      de: {
        nom_commun: "Rosenwurz",
        partie_utilisee: "Getrocknetes Rhizom und Wurzel",
        preuve_scientifique: "Verringerung von Müdigkeit und Cortisol, Verbesserung der kognitiven und körperlichen Leistung, Modulation von Neurotransmittern (Serotonin, Dopamin).",
        convergence_ancestrale: "Heilige Pflanze der sibirischen und Wikinger-Völker für Ausdauer und Langlebigkeit. In der TCM tonisiert sie Qi und Blut.",
        precautions: "Am besten morgens oder mittags einnehmen (kann den Schlaf stören, wenn es abends eingenommen wird). Nicht empfohlen bei bipolaren Störungen."
      }
    }
  },
  {
    plant_id: "griffonia_simplicifolia",
    nom_commun: "Griffonia",
    nom_latin: "Griffonia simplicifolia",
    partie_utilisee: "Graines séchées",
    famille_bloom: "Pharmacie Intérieure (Précurseur neurochimique)",
    terrains_cibles: ["T7 (Psycho-émotionnel)", "T9 (Sommeil)", "T10 (Cycle Féminin)"],
    actifs_cles: [
      { nom: "5-HTP (5-Hydroxytryptophane)", polarite: "Hydrosoluble", translations: { en: { nom: "5-HTP (5-Hydroxytryptophan)", polarite: "Water-soluble" }, de: { nom: "5-HTP (5-Hydroxytryptophan)", polarite: "Wasserlöslich" } } },
      { nom: "Alcaloïdes indoliques", polarite: "Liposoluble", translations: { en: { nom: "Indole alkaloids", polarite: "Fat-soluble" }, de: { nom: "Indolalkaloide", polarite: "Fettlöslich" } } }
    ],
    preuve_scientifique: "Le 5-HTP traverse la barrière hémato-encéphalique et est converti directement en sérotonine, puis en mélatonine. Efficace sur l'humeur, les compulsions sucrées et l'endormissement.",
    pourquoi_bloomlab: {
      probleme_traditionnel: "Le 5-HTP s'extrait bien à l'eau, mais les graines contiennent d'autres alcaloïdes lipophiles qui modulent l'effet. Une extraction unique rate une partie du totum.",
      phase_A: { temp: "70°C", temps: "2h00", solvant: "Eau distillée + Glycérine (70/30)", cible: "5-HTP et composés hydrosolubles", translations: { en: { cible: "5-HTP and water-soluble compounds" }, de: { cible: "5-HTP und wasserlösliche Verbindungen" } } },
      phase_B: { temp: "50°C", temps: "3h00", solvant: "Alcool bio 96°", cible: "Alcaloïdes lipophiles et fractions secondaires", translations: { en: { cible: "Lipophilic alkaloids and secondary fractions" }, de: { cible: "Lipophile Alkaloide und sekundäre Fraktionen" } } },
      resultat: "Un précurseur de sérotonine naturel, mieux toléré et plus complet que le 5-HTP isolé en gélule.",
      translations: {
        en: {
          probleme_traditionnel: "5-HTP is well extracted in water, but the seeds contain other lipophilic alkaloids that modulate the effect. A single extraction misses part of the totum.",
          resultat: "A natural serotonin precursor, better tolerated and more complete than isolated 5-HTP in capsules."
        },
        de: {
          probleme_traditionnel: "5-HTP lässt sich gut in Wasser extrahieren, aber die Samen enthalten andere lipophile Alkaloide, die die Wirkung modulieren. Eine einzige Extraktion verpasst einen Teil des Totums.",
          resultat: "Ein natürlicher Serotonin-Vorläufer, besser verträglich und vollständiger als isoliertes 5-HTP in Kapseln."
        }
      }
    },
    recette_pas_a_pas: {
      batch_standard: "Cible BloomLab : 750ml de solvant + 75g de plantes (Rendement final estimé : ~600-650ml)",
      ingredients: {
        phase_A: ["50g de Graines de Griffonia (entières ou concassées)", "350ml d'Eau distillée", "150ml de Glycérine végétale"],
        phase_B: ["25g de Graines de Griffonia (poudre)", "250ml d'Alcool bio 96°"]
      },
      preparation: [
        "1. Les graines sont dures. Concassez les 50g au moulin à café ou au mortier.",
        "2. Mixez les 25g restants en poudre fine."
      ],
      phase_A_instructions: [
        "1. Versez eau et glycérine. Ajoutez les 50g de graines concassées.",
        "2. Fermez, mode manuel 'OIL', TEMP 70°C, TEMPS 2h00. START."
      ],
      transition: [
        "1. Éteignez. Laissez reposer 20 minutes.",
        "2. TEST SENSORIEL OBLIGATOIRE : Posez votre main sur la paroi extérieure de la cuve. Elle doit être 'tiède au toucher' (environ 40°C), et non brûlante.",
        "3. ⚠️ SÉCURITÉ : N'ajoutez l'alcool que lorsque ce test est validé."
      ],
      phase_B_instructions: [
        "1. Ajoutez l'alcool et les 25g de poudre.",
        "2. Fermez, mode manuel 'OIL', TEMP 50°C, TEMPS 3h00. START."
      ],
      filtration_et_finition: [
        "1. Filtrez TRÈS finement with le sac filtre fournit, la préparation encore tiède. Pressez fermement le marc.",
        "2. Mettez en flacon ambré. À conserver à l'obscurité."
      ]
    },
    socle_synergique: {
      cofacteurs_complements: [
        { nom: "Vitamine B6 (P-5-P)", dose: "20mg/jour", role: "Cofacteur obligatoire de la décarboxylation du 5-HTP en Sérotonine." },
        { nom: "Magnésium Bisglycinate", dose: "300mg le soir", role: "Réduit l'excitabilité neuronale, facilitant l'action apaisante de la sérotonine." }
      ],
      leviers_du_vivant: [
        { nom: "Éviction des écrans (lumière bleue)", frequence: "2h avant le coucher", role: "Préserve la mélatonine que le Griffonia aide à produire." }
      ]
    },
    convergence_ancestrale: "Plante d'Afrique de l'Ouest traditionnellement utilisée pour la guérison des plaies, mais aussi comme tonique psychique.",
    synergies_recommandees: ["Rhodiola rosea", "Mélisse", "Passiflore"],
    precautions: "Interdiction absolue avec les antidépresseurs (IRS) : risque de syndrome sérotoninergique."
  }
,
  {
    plant_id: "gentiana_lutea",
    nom_commun: "Gentiane Jaune",
    nom_latin: "Gentiana lutea",
    partie_utilisee: "Racine séchée",
    famille_bloom: "Déclencheur (Amère majeur)",
    terrains_cibles: [
        "T1_Intestin",
        "T2_Foie",
        "T4_HPA"
      ],
    actifs_cles: [
      { nom: "Gentiopicroside", polarite: "Hydrosoluble", translations: { en: { nom: "Gentiopicroside", polarite: "Water-soluble" }, de: { nom: "Gentiopicrosid", polarite: "Wasserlöslich" } } },
      { nom: "Amarogentine", polarite: "Hydrosoluble", translations: { en: { nom: "Amarogentin", polarite: "Water-soluble" }, de: { nom: "Amarogentin", polarite: "Wasserlöslich" } } },
      { nom: "Xanthones", polarite: "Liposoluble", translations: { en: { nom: "Xanthones", polarite: "Fat-soluble" }, de: { nom: "Xanthone", polarite: "Fettlöslich" } } }
    ],
    preuve_scientifique: "Stimulation puissante des récepteurs du goût amer (TAS2R), entraînant une augmentation réflexe de la sécrétion de bile, d'acide gastrique et d'enzymes pancréatiques. Régulation du SRA (Système Rénine-Angiotensine) via l'amélioration de la digestion et la réduction de l'inflammation intestinale.",
    pourquoi_bloomlab: {
      probleme_traditionnel: "Les principes amers sont hydrosolubles mais nécessitent une chaleur soutenue pour être extraits de la racine dense. Les xanthones hépatoprotectrices nécessitent un solvant organique.",
      phase_A: { temp: "75°C", temps: "2h00", solvant: "Eau distillée + Glycérine (70/30)", cible: "Gentiopicroside, amarogentine", translations: { en: { cible: "Gentiopicroside, amarogentin" }, de: { cible: "Gentiopicrosid, Amarogentin" } } },
      phase_B: { temp: "50°C", temps: "3h00", solvant: "Alcool bio 96°", cible: "Xanthones", translations: { en: { cible: "Xanthones" }, de: { cible: "Xanthone" } } },
      resultat: "Spectre complet pour stimuler les sécrétions digestives tout en protégeant le foie.",
      translations: {
        en: {
          probleme_traditionnel: "Bitter principles are water-soluble but require sustained heat to be extracted from the dense root. Hepatoprotective xanthones require an organic solvent.",
          resultat: "Full spectrum to stimulate digestive secretions while protecting the liver."
        },
        de: {
          probleme_traditionnel: "Bitterstoffe sind wasserlöslich, erfordern jedoch anhaltende Hitze, um aus der dichten Wurzel extrahiert zu werden. Hepatoprotektive Xanthone erfordern ein organisches Lösungsmittel.",
          resultat: "Vollspektrum zur Stimulierung der Verdauungssekrete bei gleichzeitigem Schutz der Leber."
        }
      }
    },
    recette_pas_a_pas: {
        batch_standard: "Cible BloomLab : 750ml de solvant + 75g de plantes (Rendement final estimé : ~600-650ml)",
        ingredients: {
          phase_A: [
            "50g de Racine de Gentiane (copeaux)",
            "350ml d'Eau distillée",
            "150ml de Glycérine végétale"
          ],
          phase_B: [
            "25g de Racine de Gentiane (poudre)",
            "250ml d'Alcool bio 96°"
          ]
        },
        preparation: [
          "Concassez vigoureusement les 50g de racine pour la Phase A.",
          "Mixez les 25g restants en poudre fine pour la Phase B."
        ],
        phase_A_instructions: [
          "Versez eau et glycérine. Ajoutez les 50g de copeaux.",
          "Fermez, mode manuel 'OIL', TEMP 75°C, TEMPS 2h00. START."
        ],
        transition: [
          "1. Éteignez. Laissez reposer 20 minutes.",
          "2. TEST SENSORIEL OBLIGATOIRE : Posez votre main sur la paroi extérieure de la cuve. Elle doit être 'tiède au toucher' (environ 40°C), et non brûlante.",
          "3. ⚠️ SÉCURITÉ : N'ajoutez l'alcool que lorsque ce test est validé."
        ],
        phase_B_instructions: [
          "Ajoutez l'alcool et les 25g de poudre.",
          "Fermez, mode manuel 'OIL', TEMP 50°C, TEMPS 3h00. START."
        ],
        filtration_et_finition: [
          "Filtrez à l'étamine. Pressez fermement le marc de racine.",
          "Le liquide sera d'un brun-rouge profond, extrêmement amer. Mettez en flacon ambré."
        ]
      },
    socle_synergique: {
      cofacteurs_complements: [
        { 
          nom: "Zinc", 
          dose: "15mg/jour", 
          role: "Cofacteur essentiel des enzymes digestives stimulées par l'amertume.",
          translations: {
            en: { nom: "Zinc", dose: "15mg/day", role: "Essential cofactor for digestive enzymes stimulated by bitterness." },
            de: { nom: "Zink", dose: "15mg/Tag", role: "Essenzieller Cofaktor für Verdauungsenzyme, die durch Bitterkeit stimuliert werden." }
          }
        },
        { 
          nom: "Magnésium Bisglycinate", 
          dose: "300mg", 
          role: "Relaxe le sphincter d'Oddi, facilitant l'évacuation de la bile stimulée par la gentiane.",
          translations: {
            en: { nom: "Magnesium Bisglycinate", dose: "300mg", role: "Relaxes the sphincter of Oddi, facilitating the evacuation of bile stimulated by gentian." },
            de: { nom: "Magnesiumbisglycinat", dose: "300mg", role: "Entspannt den Sphinkter Oddi und erleichtert den Abfluss der durch Enzian stimulierten Galle." }
          }
        }
      ],
      leviers_du_vivant: [
        { 
          nom: "Mastication prolongée", 
          frequence: "30 fois par bouchée", 
          role: "Active la phase céphalique de la digestion, potentialisant l'effet de la gentiane.",
          translations: {
            en: { nom: "Prolonged chewing", frequence: "30 times per bite", role: "Activates the cephalic phase of digestion, enhancing the effect of gentian." },
            de: { nom: "Längeres Kauen", frequence: "30 Mal pro Bissen", role: "Aktiviert die kephalische Phase der Verdauung und verstärkt die Wirkung des Enzians." }
          }
        }
      ]
    },
    convergence_ancestrale: "Utilisée depuis l'Antiquité européenne comme tonique amer majeur pour 'réveiller le feu digestif' et purifier le sang.",
    synergies_recommandees: ["raphanus_sativus_niger", "chrysanthellum_indicum", "artichaut"],
    precautions: "Contre-indiquée en cas d'ulcère gastrique ou duodénal actif, et d'obstruction des voies biliaires.",
    translations: {
      en: {
        nom_commun: "Yellow Gentian",
        partie_utilisee: "Dried root",
        preuve_scientifique: "Powerful stimulation of bitter taste receptors (TAS2R), leading to a reflex increase in bile, gastric acid, and pancreatic enzyme secretion. Regulation of the RAS (Renin-Angiotensin System) via improved digestion and reduced intestinal inflammation.",
        convergence_ancestrale: "Used since European antiquity as a major bitter tonic to 'awaken the digestive fire' and purify the blood.",
        precautions: "Contraindicated in case of active gastric or duodenal ulcer, and biliary tract obstruction."
      },
      de: {
        nom_commun: "Gelber Enzian",
        partie_utilisee: "Getrocknete Wurzel",
        preuve_scientifique: "Starke Stimulation der Bittergeschmacksrezeptoren (TAS2R), was zu einer reflexartigen Steigerung der Galle-, Magensäure- und Bauchspeicheldrüsenenzymsekretion führt. Regulierung des RAS (Renin-Angiotensin-System) durch verbesserte Verdauung und verringerte Darmentzündung.",
        convergence_ancestrale: "Seit der europäischen Antike als wichtiges Bittertonikum verwendet, um das 'Verdauungsfeuer zu wecken' und das Blut zu reinigen.",
        precautions: "Kontraindiziert bei aktivem Magen- oder Zwölffingerdarmgeschwür und Gallengangsverschluss."
      }
    }
  },
  {
    plant_id: "raphanus_sativus_niger",
    nom_commun: "Radis Noir",
    nom_latin: "Raphanus sativus niger",
    partie_utilisee: "Racine séchée",
    famille_bloom: "Déclencheur (Drainage hépato-biliaire)",
    terrains_cibles: [
        "T2_Foie",
        "T6_Émonctoires",
        "T1_Intestin"
      ],
    actifs_cles: [
      { nom: "Glucosinolates", polarite: "Hydrosoluble", translations: { en: { nom: "Glucosinolates", polarite: "Water-soluble" }, de: { nom: "Glucosinolate", polarite: "Wasserlöslich" } } },
      { nom: "Isothiocyanates", polarite: "Liposoluble/Volatile", translations: { en: { nom: "Isothiocyanates", polarite: "Fat-soluble/Volatile" }, de: { nom: "Isothiocyanate", polarite: "Fettlöslich/Flüchtig" } } },
      { nom: "Raphanines", polarite: "Hydrosoluble", translations: { en: { nom: "Raphanins", polarite: "Water-soluble" }, de: { nom: "Raphanine", polarite: "Wasserlöslich" } } }
    ],
    preuve_scientifique: "Stimulation cholérétique (production de bile) et cholagogue (évacuation de la bile). Soutien des enzymes de détoxification de Phase II du foie (conjugaison).",
    pourquoi_bloomlab: {
      probleme_traditionnel: "Les glucosinolates sont hydrosolubles, mais les isothiocyanates (actifs détoxifiants majeurs) sont volatils et se perdent à l'ébullition.",
      phase_A: { temp: "70°C", temps: "2h00", solvant: "Eau distillée + Glycérine (70/30)", cible: "Glucosinolates, raphanines", translations: { en: { cible: "Glucosinolates, raphanins" }, de: { cible: "Glucosinolate, Raphanine" } } },
      phase_B: { temp: "45°C", temps: "3h00", solvant: "Alcool bio 96°", cible: "Isothiocyanates", translations: { en: { cible: "Isothiocyanates" }, de: { cible: "Isothiocyanate" } } },
      resultat: "Un drainage hépato-biliaire puissant respectant la fragilité des actifs soufrés.",
      translations: {
        en: {
          probleme_traditionnel: "Glucosinolates are water-soluble, but isothiocyanates (major detoxifying actives) are volatile and lost upon boiling.",
          resultat: "Powerful hepato-biliary drainage respecting the fragility of sulfur actives."
        },
        de: {
          probleme_traditionnel: "Glucosinolate sind wasserlöslich, aber Isothiocyanate (wichtigste entgiftende Wirkstoffe) sind flüchtig und gehen beim Kochen verloren.",
          resultat: "Leistungsstarke hepato-biliäre Drainage unter Berücksichtigung der Fragilität der Schwefelwirkstoffe."
        }
      }
    },
    recette_pas_a_pas: {
        batch_standard: "Cible BloomLab : 750ml de solvant + 75g de plantes (Rendement final estimé : ~600-650ml)",
        ingredients: {
          phase_A: [
            "50g de Racine de Radis Noir (morceaux)",
            "350ml d'Eau distillée",
            "150ml de Glycérine végétale"
          ],
          phase_B: [
            "25g de Racine de Radis Noir (poudre)",
            "250ml d'Alcool bio 96°"
          ]
        },
        preparation: [
          "Concassez les 50g de racine pour la Phase A.",
          "Mixez les 25g restants en poudre pour la Phase B."
        ],
        phase_A_instructions: [
          "Versez eau et glycérine. Ajoutez les 50g de morceaux.",
          "Fermez, mode manuel 'OIL', TEMP 70°C, TEMPS 2h00. START."
        ],
        transition: [
          "1. Éteignez. Laissez reposer 20 minutes.",
          "2. TEST SENSORIEL OBLIGATOIRE : Posez votre main sur la paroi extérieure de la cuve. Elle doit être 'tiède au toucher' (environ 40°C), et non brûlante.",
          "3. ⚠️ SÉCURITÉ : N'ajoutez l'alcool que lorsque ce test est validé."
        ],
        phase_B_instructions: [
          "Ajoutez l'alcool et les 25g de poudre.",
          "Fermez, mode manuel 'OIL', TEMP 45°C, TEMPS 3h00. START."
        ],
        filtration_et_finition: [
          "Filtrez à l'étamine. L'odeur sera soufrée et caractéristique.",
          "Pressez le marc. Mettez en flacon ambré."
        ]
      },
    socle_synergique: {
      cofacteurs_complements: [
        { 
          nom: "NAC (N-Acétyl Cystéine)", 
          dose: "600mg/jour", 
          role: "Fournit le glutathion nécessaire au foie pour conjuguer les toxines mobilisées par le radis noir.",
          translations: {
            en: { nom: "NAC (N-Acetyl Cysteine)", dose: "600mg/day", role: "Provides glutathione needed by the liver to conjugate toxins mobilized by black radish." },
            de: { nom: "NAC (N-Acetylcystein)", dose: "600mg/Tag", role: "Liefert das Glutathion, das die Leber benötigt, um die durch Rettich mobilisierten Toxine zu konjugieren." }
          }
        },
        { 
          nom: "Vitamines B (B2, B6, B9, B12)", 
          dose: "Complexe B", 
          role: "Cofacteurs indispensables des voies de méthylation hépatique (Phase II).",
          translations: {
            en: { nom: "Vitamin B Complex (B2, B6, B9, B12)", dose: "B Complex", role: "Essential cofactors for hepatic methylation pathways (Phase II)." },
            de: { nom: "Vitamin-B-Komplex (B2, B6, B9, B12)", dose: "B-Komplex", role: "Unverzichtbare Cofaktoren der hepatischen Methylierungswege (Phase II)." }
          }
        }
      ],
      leviers_du_vivant: [
        { 
          nom: "Hydratation abondante", 
          frequence: "2L d'eau/jour", 
          role: "Assure l'évacuation rénale des toxines conjuguées par le foie.",
          translations: {
            en: { nom: "Abundant hydration", frequence: "2L water/day", role: "Ensures renal evacuation of toxins conjugated by the liver." },
            de: { nom: "Reichliche Flüssigkeitszufuhr", frequence: "2L Wasser/Tag", role: "Stellt die renale Ausscheidung der von der Leber konjugierten Toxine sicher." }
          }
        }
      ]
    },
    convergence_ancestrale: "Remède traditionnel européen de printemps pour 'nettoyer le foie' après les excès de l'hiver.",
    synergies_recommandees: ["chardon_marie", "artichaut", "fumeterre"],
    precautions: "Contre-indiqué en cas de calculs biliaires obstructifs ou d'obstruction des voies biliaires. Peut irriter les muqueuses gastriques sensibles.",
    translations: {
      en: {
        nom_commun: "Black Radish",
        partie_utilisee: "Dried root",
        preuve_scientifique: "Choleretic (bile production) and cholagogue (bile evacuation) stimulation. Support of liver Phase II detoxification enzymes (conjugation).",
        convergence_ancestrale: "Traditional European spring remedy to 'clean the liver' after the excesses of winter.",
        precautions: "Contraindicated in case of obstructive gallstones or biliary tract obstruction. May irritate sensitive gastric mucous membranes."
      },
      de: {
        nom_commun: "Rettich (Schwarz)",
        partie_utilisee: "Getrocknete Wurzel",
        preuve_scientifique: "Choleretische (Gallenproduktion) und cholagoge (Gallenentleerung) Stimulation. Unterstützung der Leber-Phase-II-Entgiftungsenzyme (Konjugation).",
        convergence_ancestrale: "Traditionelles europäisches Frühlingsmittel zur 'Reinigung der Leber' nach den Ausschweifungen des Winters.",
        precautions: "Kontraindiziert bei obstruktiven Gallensteinen oder Gallengangsverschluss. Kann empfindliche Magenschleimhäute reizen."
      }
    }
  },
  {
    plant_id: "chrysanthellum_indicum",
    nom_commun: "Chrysanthellum",
    nom_latin: "Chrysanthellum indicum",
    partie_utilisee: "Parties aériennes séchées",
    famille_bloom: "Réparateur (Hépatoprotecteur & Veineux)",
    terrains_cibles: [
        "T2_Foie",
        "T8_Inflammation",
        "T6_Émonctoires"
      ],
    actifs_cles: [
      { nom: "Flavonoïdes (lutéoline)", polarite: "Hydrosoluble", translations: { en: { nom: "Flavonoids (luteolin)", polarite: "Water-soluble" }, de: { nom: "Flavonoide (Luteolin)", polarite: "Wasserlöslich" } } },
      { nom: "Saponines stéroïdiques", polarite: "Liposoluble", translations: { en: { nom: "Steroidal saponins", polarite: "Fat-soluble" }, de: { nom: "Steroidsaponine", polarite: "Fettlöslich" } } },
      { nom: "Acides phénoliques", polarite: "Hydrosoluble", translations: { en: { nom: "Phenolic acids", polarite: "Water-soluble" }, de: { nom: "Phenolsäuren", polarite: "Wasserlöslich" } } }
    ],
    preuve_scientifique: "Action hépatoprotectrice puissante, réduction de la stéatose hépatique, et amélioration de la microcirculation veineuse et lymphatique.",
    pourquoi_bloomlab: {
      probleme_traditionnel: "Les flavonoïdes nécessitent une extraction aqueuse chaude, tandis que les saponines (cruciales pour l'action veineuse et hépatique) sont liposolubles.",
      phase_A: { temp: "70°C", temps: "2h00", solvant: "Eau distillée + Glycérine (70/30)", cible: "Flavonoïdes, acides phénoliques", translations: { en: { cible: "Flavonoids, phenolic acids" }, de: { cible: "Flavonoide, Phenolsäuren" } } },
      phase_B: { temp: "50°C", temps: "3h00", solvant: "Alcool bio 96°", cible: "Saponines stéroïdiques", translations: { en: { cible: "Steroidal saponins" }, de: { cible: "Steroidsaponine" } } },
      resultat: "Double action de protection hépatique et de tonification veineuse dans un seul élixir.",
      translations: {
        en: {
          probleme_traditionnel: "Flavonoids require hot aqueous extraction, while saponins (crucial for venous and hepatic action) are fat-soluble.",
          resultat: "Double action of liver protection and venous tonification in a single elixir."
        },
        de: {
          probleme_traditionnel: "Flavonoide erfordern eine heiße wässrige Extraktion, während Saponine (entscheidend für die venöse und hepatische Wirkung) fettlöslich sind.",
          resultat: "Doppelte Wirkung von Leberschutz und venöser Tonisierung in einem einzigen Elixier."
        }
      }
    },
    recette_pas_a_pas: {
        batch_standard: "Cible BloomLab : 750ml de solvant + 75g de plantes (Rendement final estimé : ~600-650ml)",
        ingredients: {
          phase_A: [
            "50g de Chrysanthellum séché",
            "350ml d'Eau distillée",
            "150ml de Glycérine végétale"
          ],
          phase_B: [
            "25g de Chrysanthellum séché",
            "250ml d'Alcool bio 96°"
          ]
        },
        preparation: [
          "La plante est légère et volumineuse. Tassez les 50g dans la cuve.",
          "Mixez les 25g restants pour la Phase B."
        ],
        phase_A_instructions: [
          "Versez eau et glycérine. Ajoutez les 50g de plante tassée.",
          "Fermez, mode manuel 'OIL', TEMP 70°C, TEMPS 2h00. START."
        ],
        transition: [
          "1. Éteignez. Laissez reposer 20 minutes.",
          "2. TEST SENSORIEL OBLIGATOIRE : Posez votre main sur la paroi extérieure de la cuve. Elle doit être 'tiède au toucher' (environ 40°C), et non brûlante.",
          "3. ⚠️ SÉCURITÉ : N'ajoutez l'alcool que lorsque ce test est validé."
        ],
        phase_B_instructions: [
          "Ajoutez l'alcool et les 25g de plante mixée.",
          "Fermez, mode manuel 'OIL', TEMP 50°C, TEMPS 3h00. START."
        ],
        filtration_et_finition: [
          "Filtrez à l'étamine. Pressez le marc.",
          "Le liquide sera vert-brun. Mettez en flacon ambré."
        ]
      },
    socle_synergique: {
      cofacteurs_complements: [
        { 
          nom: "Chardon-Marie", 
          dose: "Selon protocole", 
          role: "Synergie hépatique totale : le chardon régénère, le chrysanthellum draine et protège.",
          translations: {
            en: { nom: "Milk Thistle", dose: "According to protocol", role: "Total liver synergy: milk thistle regenerates, chrysanthellum drains and protects." },
            de: { nom: "Mariendistel", dose: "Laut Protokoll", role: "Vollständige Lebersynergie: Mariendistel regeneriert, Chrysanthellum entwässert und schützt." }
          }
        },
        { 
          nom: "Vitamine C", 
          dose: "500mg/jour", 
          role: "Renforce l'action des flavonoïdes sur la microcirculation.",
          translations: {
            en: { nom: "Vitamin C", dose: "500mg/day", role: "Strengthens the action of flavonoids on microcirculation." },
            de: { nom: "Vitamin C", dose: "500mg/Tag", role: "Stärkt die Wirkung von Flavonoiden auf die Mikrozirkulation." }
          }
        }
      ],
      leviers_du_vivant: [
        { 
          nom: "Marche quotidienne", 
          frequence: "30 min/jour", 
          role: "Active la pompe veineuse et le drainage lymphatique, potentialisant l'effet du chrysanthellum.",
          translations: {
            en: { nom: "Daily walk", frequence: "30 min/day", role: "Activates the venous pump and lymphatic drainage, enhancing the effect of chrysanthellum." },
            de: { nom: "Täglicher Spaziergang", frequence: "30 Min./Tag", role: "Aktiviert die Venenpumpe und Lymphdrainage und verstärkt die Wirkung von Chrysanthellum." }
          }
        }
      ]
    },
    convergence_ancestrale: "Utilisé en Amérique du Sud et en médecine traditionnelle pour les troubles hépatiques et la circulation.",
    synergies_recommandees: ["gentiana_lutea", "vitis_vinifera", "hamamelis_virginiana"],
    precautions: "Allergie aux Astéracées. Déconseillé en cas d'obstruction des voies biliaires.",
    translations: {
      en: {
        nom_commun: "Chrysanthellum",
        partie_utilisee: "Dried aerial parts",
        preuve_scientifique: "Powerful hepatoprotective action, reduction of hepatic steatosis, and improvement of venous and lymphatic microcirculation.",
        convergence_ancestrale: "Used in South America and traditional medicine for liver disorders and circulation.",
        precautions: "Allergy to Asteraceae. Not recommended in case of biliary tract obstruction."
      },
      de: {
        nom_commun: "Chrysanthellum",
        partie_utilisee: "Getrocknete oberirdische Teile",
        preuve_scientifique: "Starke hepatoprotektive Wirkung, Verringerung der Lebersteatose und Verbesserung der venösen und lymphatischen Mikrozirkulation.",
        convergence_ancestrale: "In Südamerika und der traditionellen Medizin bei Lebererkrankungen und Kreislaufbeschwerden verwendet.",
        precautions: "Allergie gegen Asteraceae. Bei Gallengangsverschluss nicht empfohlen."
      }
    }
  },
  {
    plant_id: "desmodium_adscendens",
    nom_commun: "Desmodium",
    nom_latin: "Desmodium adscendens",
    partie_utilisee: "Parties aériennes séchées",
    famille_bloom: "Réparateur (Régénération hépatique)",
    terrains_cibles: [
        "T2_Foie",
        "T3_Immunité",
        "T8_Inflammation"
      ],
    actifs_cles: [
      { nom: "Saponosides triterpéniques", polarite: "Liposoluble", translations: { en: { nom: "Triterpenoid saponosides", polarite: "Fat-soluble" }, de: { nom: "Triterpen-Saponoside", polarite: "Fettlöslich" } } },
      { nom: "Flavonoïdes", polarite: "Hydrosoluble", translations: { en: { nom: "Flavonoids", polarite: "Water-soluble" }, de: { nom: "Flavonoide", polarite: "Wasserlöslich" } } },
      { nom: "Alcaloïdes", polarite: "Mixte", translations: { en: { nom: "Alkaloids", polarite: "Mixed" }, de: { nom: "Alkaloide", polarite: "Gemischt" } } }
    ],
    preuve_scientifique: "Protection spécifique des membranes des hépatocytes contre les toxines (médicaments, alcool, virus). Action anti-allergique et anti-inflammatoire puissante.",
    pourquoi_bloomlab: {
      probleme_traditionnel: "Les saponosides (actifs régénérateurs clés) sont liposolubles et nécessitent un solvant organique, tandis que les flavonoïdes sont hydrosolubles.",
      phase_A: { temp: "70°C", temps: "2h00", solvant: "Eau distillée + Glycérine (70/30)", cible: "Flavonoïdes, alcaloïdes hydrosolubles", translations: { en: { cible: "Flavonoids, water-soluble alkaloids" }, de: { cible: "Flavonoide, wasserlösliche Alkaloide" } } },
      phase_B: { temp: "50°C", temps: "3h00", solvant: "Alcool bio 96°", cible: "Saponosides triterpéniques", translations: { en: { cible: "Triterpenoid saponosides" }, de: { cible: "Triterpen-Saponoside" } } },
      resultat: "Une protection hépatique et pulmonaire complète capturant l'ensemble du totum de la plante.",
      translations: {
        en: {
          probleme_traditionnel: "Saponosides (key regenerative actives) are fat-soluble and require an organic solvent, while flavonoids are water-soluble.",
          resultat: "Complete hepatic and pulmonary protection capturing the entire totum of the plant."
        },
        de: {
          probleme_traditionnel: "Saponoside (wichtigste regenerative Wirkstoffe) sind fettlöslich und erfordern ein organisches Lösungsmittel, während Flavonoide wasserlöslich sind.",
          resultat: "Vollständiger Leber- und Lungenschutz, der das gesamte Totum der Pflanze erfasst."
        }
      }
    },
    recette_pas_a_pas: {
        batch_standard: "Cible BloomLab : 750ml de solvant + 75g de plantes (Rendement final estimé : ~600-650ml)",
        ingredients: {
          phase_A: [
            "50g de Desmodium séché",
            "350ml d'Eau distillée",
            "150ml de Glycérine végétale"
          ],
          phase_B: [
            "25g de Desmodium séché",
            "250ml d'Alcool bio 96°"
          ]
        },
        preparation: [
          "La plante est très légère. Tassez fermement les 50g dans la cuve.",
          "Mixez les 25g restants pour la Phase B."
        ],
        phase_A_instructions: [
          "Versez eau et glycérine. Ajoutez les 50g de plante tassée.",
          "Fermez, mode manuel 'OIL', TEMP 70°C, TEMPS 2h00. START."
        ],
        transition: [
          "1. Éteignez. Laissez reposer 20 minutes.",
          "2. TEST SENSORIEL OBLIGATOIRE : Posez votre main sur la paroi extérieure de la cuve. Elle doit être 'tiède au toucher' (environ 40°C), et non brûlante.",
          "3. ⚠️ SÉCURITÉ : N'ajoutez l'alcool que lorsque ce test est validé."
        ],
        phase_B_instructions: [
          "Ajoutez l'alcool et les 25g de plante mixée.",
          "Fermez, mode manuel 'OIL', TEMP 50°C, TEMPS 3h00. START."
        ],
        filtration_et_finition: [
          "Filtrez à l'étamine. Pressez le marc.",
          "Le liquide sera vert foncé. Mettez en flacon ambré."
        ]
      },
    socle_synergique: {
      cofacteurs_complements: [
        { 
          nom: "NAC", 
          dose: "600mg/jour", 
          role: "Soutient la production de glutathion, travaillant en synergie avec le desmodium pour protéger le foie.",
          translations: {
            en: { nom: "NAC", dose: "600mg/day", role: "Supports glutathione production, working in synergy with desmodium to protect the liver." },
            de: { nom: "NAC", dose: "600mg/Tag", role: "Unterstützt die Glutathionproduktion und wirkt synergetisch mit Desmodium zum Schutz der Leber." }
          }
        },
        { 
          nom: "Vitamine E", 
          dose: "400 UI/jour", 
          role: "Protège les membranes lipidiques des hépatocytes que le desmodium vise à réparer.",
          translations: {
            en: { nom: "Vitamin E", dose: "400 IU/day", role: "Protects the lipid membranes of hepatocytes that desmodium aims to repair." },
            de: { nom: "Vitamin E", dose: "400 IE/Tag", role: "Schützt die Lipidmembranen der Hepatozyten, die das Desmodium zu reparieren versucht." }
          }
        }
      ],
      leviers_du_vivant: [
        { 
          nom: "Éviction stricte de l'alcool et du paracétamol", 
          frequence: "Pendant la cure", 
          role: "Permet au foie de se régénérer sans nouvelle agression chimique.",
          translations: {
            en: { nom: "Strict avoidance of alcohol and paracetamol", frequence: "During the course", role: "Allows the liver to regenerate without new chemical aggression." },
            de: { nom: "Strikte Vermeidung von Alkohol und Paracetamol", frequence: "Während der Kur", role: "Ermöglicht der Leber die Regeneration ohne neue chemische Belastung." }
          }
        }
      ]
    },
    convergence_ancestrale: "Utilisé en médecine traditionnelle africaine et amazonienne pour les troubles hépatiques et les réactions allergiques.",
    synergies_recommandees: ["chardon_marie", "artichaut", "curcuma_longa"],
    precautions: "Peut avoir un effet légèrement sédatif à haute dose. Déconseillé en cas d'obstruction des voies biliaires.",
    translations: {
      en: {
        nom_commun: "Desmodium",
        partie_utilisee: "Dried aerial parts",
        preuve_scientifique: "Specific protection of hepatocyte membranes against toxins (medicines, alcohol, viruses). Powerful anti-allergic and anti-inflammatory action.",
        convergence_ancestrale: "Used in traditional African and Amazonian medicine for liver disorders and allergic reactions.",
        precautions: "May have a slight sedative effect at high doses. Not recommended in case of biliary tract obstruction."
      },
      de: {
        nom_commun: "Desmodium",
        partie_utilisee: "Getrocknete oberirdische Teile",
        preuve_scientifique: "Spezifischer Schutz der Hepatozytenmembranen vor Toxinen (Medikamente, Alkohol, Viren). Starke antiallergische und entzündungshemmende Wirkung.",
        convergence_ancestrale: "In der traditionellen afrikanischen und amazonischen Medizin bei Lebererkrankungen und allergischen Reaktionen verwendet.",
        precautions: "Kann bei hohen Dosen eine leicht sedierende Wirkung haben. Bei Gallengangsverschluss nicht empfohlen."
      }
    }
  },
  {
    plant_id: "arctium_lappa",
    nom_commun: "Bardane",
    nom_latin: "Arctium lappa",
    partie_utilisee: "Racine séchée",
    famille_bloom: "Réparateur (Dépuratif sanguin & cutané)",
    terrains_cibles: [
        "T9_Peau_Phaneres",
        "T1_Intestin",
        "T2_Foie"
      ],
    actifs_cles: [
      { nom: "Inuline", polarite: "Hydrosoluble", translations: { en: { nom: "Inulin", polarite: "Water-soluble" }, de: { nom: "Inulin", polarite: "Wasserlöslich" } } },
      { nom: "Polyacétylènes", polarite: "Liposoluble", translations: { en: { nom: "Polyacetylenes", polarite: "Fat-soluble" }, de: { nom: "Polyacetylene", polarite: "Fettlöslich" } } },
      { nom: "Tanins", polarite: "Hydrosoluble", translations: { en: { nom: "Tannins", polarite: "Water-soluble" }, de: { nom: "Tannine", polarite: "Wasserlöslich" } } }
    ],
    preuve_scientifique: "Action dépurative, prébiotique (inuline), et modulation du microbiote cutané et intestinal. Efficace dans les dermatoses chroniques (acné, eczéma, psoriasis).",
    pourquoi_bloomlab: {
      probleme_traditionnel: "L'inuline (prébiotique majeur) nécessite une extraction aqueuse chaude, tandis que les polyacétylènes (actifs cutanés) sont liposolubles.",
      phase_A: { temp: "75°C", temps: "2h30", solvant: "Eau distillée + Glycérine (70/30)", cible: "Inuline, tanins", translations: { en: { cible: "Inulin, tannins" }, de: { cible: "Inulin, Tannine" } } },
      phase_B: { temp: "50°C", temps: "3h00", solvant: "Alcool bio 96°", cible: "Polyacétylènes", translations: { en: { cible: "Polyacetylenes" }, de: { cible: "Polyacetylene" } } },
      resultat: "Une extraction purifiante complète pour assainir le terrain cutané et intestinal.",
      translations: {
        en: {
          probleme_traditionnel: "Inulin (major prebiotic) requires hot aqueous extraction, while polyacetylenes (skin actives) are fat-soluble.",
          resultat: "A complete purifying extraction to cleanse the skin and intestinal terrain."
        },
        de: {
          probleme_traditionnel: "Inulin (wichtigstes Präbiotikum) erfordert eine heiße wässrige Extraktion, während Polyacetylene (Hautwirkstoffe) fettlöslich sind.",
          resultat: "Eine vollständige reinigende Extraktion zur Reinigung des Haut- und Darmterrains."
        }
      }
    },
    recette_pas_a_pas: {
        batch_standard: "Cible BloomLab : 750ml de solvant + 75g de plantes (Rendement final estimé : ~600-650ml)",
        ingredients: {
          phase_A: [
            "50g de Racine de Bardane (copeaux)",
            "350ml d'Eau distillée",
            "150ml de Glycérine végétale"
          ],
          phase_B: [
            "25g de Racine de Bardane (poudre)",
            "250ml d'Alcool bio 96°"
          ]
        },
        preparation: [
          "Concassez les 50g de racine pour la Phase A.",
          "Mixez les 25g restants en poudre pour la Phase B."
        ],
        phase_A_instructions: [
          "Versez eau et glycérine. Ajoutez les 50g de copeaux.",
          "Fermez, mode manuel 'OIL', TEMP 75°C, TEMPS 2h30. START."
        ],
        transition: [
          "1. Éteignez. Laissez reposer 25 minutes (la racine dense retient la chaleur).",
          "2. TEST SENSORIEL OBLIGATOIRE : Posez votre main sur la paroi extérieure de la cuve. Elle doit être 'tiède au toucher' (environ 40°C), et non brûlante.",
          "3. ⚠️ SÉCURITÉ : N'ajoutez l'alcool que lorsque ce test est validé."
        ],
        phase_B_instructions: [
          "Ajoutez l'alcool et les 25g de poudre.",
          "Fermez, mode manuel 'OIL', TEMP 50°C, TEMPS 3h00. START."
        ],
        filtration_et_finition: [
          "Filtrez à l'étamine. Pressez fermement le marc de racine.",
          "Le liquide sera brun-jaune. Mettez en flacon ambré."
        ]
      },
    socle_synergique: {
      cofacteurs_complements: [
        { 
          nom: "Zinc", 
          dose: "15mg/jour", 
          role: "Cofacteur essentiel de la régénération cutanée et de la régulation du sébum.",
          translations: {
            en: { nom: "Zinc", dose: "15mg/day", role: "Essential cofactor for skin regeneration and sebum regulation." },
            de: { nom: "Zink", dose: "15mg/Tag", role: "Essenzieller Cofaktor für die Hautregeneration und Talgregulierung." }
          }
        },
        { 
          nom: "Probiotiques (Lactobacillus)", 
          dose: "Selon protocole", 
          role: "L'inuline de la bardane nourrit spécifiquement ces souches bénéfiques.",
          translations: {
            en: { nom: "Probiotics (Lactobacillus)", dose: "According to protocol", role: "Burdock inulin specifically nourishes these beneficial strains." },
            de: { nom: "Probiotika (Lactobacillus)", dose: "Laut Protokoll", role: "Kletteninulin nährt gezielt diese nützlichen Stämme." }
          }
        }
      ],
      leviers_du_vivant: [
        { 
          nom: "Éviction des produits laitiers industriels", 
          frequence: "Pendant la cure", 
          role: "Réduit la charge inflammatoire et l'IGF-1, potentialisant l'action dépurative de la bardane sur la peau.",
          translations: {
            en: { nom: "Avoidance of industrial dairy products", frequence: "During the course", role: "Reduces the inflammatory load and IGF-1, enhancing burdock's depurative action on the skin." },
            de: { nom: "Vermeidung von industriellen Milchprodukten", frequence: "Während der Kur", role: "Reduziert die Entzündungsbelastung und IGF-1 und verstärkt die depurative Wirkung der Klette auf die Haut." }
          }
        }
      ]
    },
    convergence_ancestrale: "Plante majeure de la médecine traditionnelle chinoise (Niu Bang Zi) et européenne pour 'purifier le sang' et traiter les affections cutanées.",
    synergies_recommandees: ["smilax_glabra", "taraxacum_officinale", "urtica_dioica"],
    precautions: "Effet diurétique. Bien s'hydrater. Déconseillé en cas d'allergie aux Astéracées.",
    translations: {
      en: {
        nom_commun: "Burdock",
        partie_utilisee: "Dried root",
        preuve_scientifique: "Depurative, prebiotic (inulin) action, and modulation of the skin and intestinal microbiota. Effective in chronic dermatoses (acne, eczema, psoriasis).",
        convergence_ancestrale: "Major plant of Traditional Chinese Medicine (Niu Bang Zi) and European medicine to 'purify the blood' and treat skin conditions.",
        precautions: "Diuretic effect. Stay well hydrated. Not recommended in case of allergy to Asteraceae."
      },
      de: {
        nom_commun: "Klette",
        partie_utilisee: "Getrocknete Wurzel",
        preuve_scientifique: "Depurative, präbiotische (Inulin) Wirkung und Modulation der Haut- und Darmmikrobiota. Wirksam bei chronischen Dermatosen (Akne, Ekzeme, Psoriasis).",
        convergence_ancestrale: "Wichtige Pflanze der Traditionellen Chinesischen Medizin (Niu Bang Zi) und der europäischen Medizin zur 'Blutreinigung' und Behandlung von Hauterkrankungen.",
        precautions: "Diuretische Wirkung. Gut hydriert bleiben. Bei Allergie gegen Asteraceae nicht empfohlen."
      }
    }
  },
  {
    plant_id: "astragalus_membranaceus",
    nom_commun: "Astragale",
    nom_latin: "Astragalus membranaceus",
    partie_utilisee: "Racine séchée",
    famille_bloom: "Chef d'Orchestre (Immunité & Longévité)",
    terrains_cibles: [
        "T3_Immunité",
        "T5_Mitochondrie",
        "T4_HPA"
      ],
    actifs_cles: [
      { nom: "Astragaloside IV", polarite: "Liposoluble", translations: { en: { nom: "Astragaloside IV", polarite: "Fat-soluble" }, de: { nom: "Astragalosid IV", polarite: "Fettlöslich" } } },
      { nom: "Polysaccharides", polarite: "Hydrosoluble", translations: { en: { nom: "Polysaccharides", polarite: "Water-soluble" }, de: { nom: "Polysaccharide", polarite: "Wasserlöslich" } } },
      { nom: "Flavonoïdes", polarite: "Hydrosoluble", translations: { en: { nom: "Flavonoids", polarite: "Water-soluble" }, de: { nom: "Flavonoide", polarite: "Wasserlöslich" } } }
    ],
    preuve_scientifique: "Modulation immunitaire (activation des macrophages et des cellules NK), protection des télomères (action sur la télomérase), et soutien de la fonction mitochondriale.",
    pourquoi_bloomlab: {
      probleme_traditionnel: "Les polysaccharides immuno-modulateurs nécessitent une extraction aqueuse chaude, tandis que l'astragaloside IV (actif anti-âge clé) est liposoluble.",
      phase_A: { temp: "75°C", temps: "2h30", solvant: "Eau distillée + Glycérine (70/30)", cible: "Polysaccharides, flavonoïdes", translations: { en: { cible: "Polysaccharides, flavonoids" }, de: { cible: "Polysaccharide, Flavonoide" } } },
      phase_B: { temp: "50°C", temps: "3h00", solvant: "Alcool bio 96°", cible: "Astragaloside IV", translations: { en: { cible: "Astragaloside IV" }, de: { cible: "Astragalosid IV" } } },
      resultat: "Un élixir de longévité capturant à la fois les modulateurs de l'immunité et les protecteurs cellulaires.",
      translations: {
        en: {
          probleme_traditionnel: "Immuno-modulating polysaccharides require hot aqueous extraction, while astragaloside IV (key anti-aging active) is fat-soluble.",
          resultat: "A longevity elixir capturing both immunity modulators and cellular protectors."
        },
        de: {
          probleme_traditionnel: "Immunmodulierende Polysaccharide erfordern eine heiße wässrige Extraktion, während Astragalosid IV (wichtigster Anti-Aging-Wirkstoff) fettlöslich ist.",
          resultat: "Ein Langlebigkeits-Elixier, das sowohl Immunmodulatoren als auch Zellschutzstoffe erfasst."
        }
      }
    },
    recette_pas_a_pas: {
        batch_standard: "Cible BloomLab : 750ml de solvant + 75g de plantes (Rendement final estimé : ~600-650ml)",
        ingredients: {
          phase_A: [
            "50g de Racine d'Astragale (copeaux)",
            "350ml d'Eau distillée",
            "150ml de Glycérine végétale"
          ],
          phase_B: [
            "25g de Racine d'Astragale (poudre)",
            "250ml d'Alcool bio 96°"
          ]
        },
        preparation: [
          "Concassez les 50g de racine pour la Phase A.",
          "Mixez les 25g restants en poudre pour la Phase B."
        ],
        phase_A_instructions: [
          "Versez eau et glycérine. Ajoutez les 50g de copeaux.",
          "Fermez, mode manuel 'OIL', TEMP 75°C, TEMPS 2h30. START."
        ],
        transition: [
          "1. Éteignez. Laissez reposer 25 minutes.",
          "2. TEST SENSORIEL OBLIGATOIRE : Posez votre main sur la paroi extérieure de cuve. Elle doit être 'tiède au toucher' (environ 40°C), et non brûlante.",
          "3. ⚠️ SÉCURITÉ : N'ajoutez l'alcool que lorsque ce test est validé."
        ],
        phase_B_instructions: [
          "Ajoutez l'alcool et les 25g de poudre.",
          "Fermez, mode manuel 'OIL', TEMP 50°C, TEMPS 3h00. START."
        ],
        filtration_et_finition: [
          "Filtrez à l'étamine. Pressez fermement le marc.",
          "Le liquide sera jaune pâle. Mettez en flacon ambré."
        ]
      },
    socle_synergique: {
      cofacteurs_complements: [
        { 
          nom: "Vitamine D3", 
          dose: "2000-4000 UI/jour", 
          role: "Indispensable à la maturation des cellules immunitaires que l'astragale active.",
          translations: {
            en: { nom: "Vitamin D3", dose: "2000-4000 IU/day", role: "Essential for the maturation of immune cells that astragalus activates." },
            de: { nom: "Vitamin D3", dose: "2000-4000 IE/Tag", role: "Unerlässlich für die Reifung der Immunzellen, die Astragalus aktiviert." }
          }
        },
        { 
          nom: "NAD+ (ou précurseurs)", 
          dose: "Selon protocole", 
          role: "Synergie avec l'astragaloside IV pour la protection mitochondriale et la longévité cellulaire.",
          translations: {
            en: { nom: "NAD+ (or precursors)", dose: "According to protocol", role: "Synergy with astragaloside IV for mitochondrial protection and cellular longevity." },
            de: { nom: "NAD+ (oder Vorstufen)", dose: "Laut Protokoll", role: "Synergie mit Astragalosid IV für den mitochondrialen Schutz und die zelluläre Langlebigkeit." }
          }
        }
      ],
      leviers_du_vivant: [
        { 
          nom: "Sommeil avant 23h", 
          frequence: "Quotidienne", 
          role: "Le système immunitaire et la réparation de l'ADN (télomères) se régénèrent principalement durant le sommeil profond.",
          translations: {
            en: { nom: "Sleep before 11pm", frequence: "Daily", role: "The immune system and DNA repair (telomeres) regenerate primarily during deep sleep." },
            de: { nom: "Schlaf vor 23 Uhr", frequence: "Täglich", role: "Das Immunsystem und die DNA-Reparatur (Telomere) regenerieren sich hauptsächlich während des Tiefschlafs." }
          }
        }
      ]
    },
    convergence_ancestrale: "Huang Qi en MTC. Utilisé depuis 2000 ans comme tonique majeur du 'Qi' et de l'immunité.",
    synergies_recommandees: ["ganoderma_lucidum", "echinacea_purpurea", "panax_ginseng"],
    precautions: "À éviter en cas de maladie auto-immune active (lupus, polyarthrite) ou de fièvre aiguë, car il stimule l'immunité.",
    translations: {
      en: {
        nom_commun: "Astragalus",
        partie_utilisee: "Dried root",
        preuve_scientifique: "Immune modulation (activation of macrophages and NK cells), telomere protection (action on telomerase), and support of mitochondrial function.",
        convergence_ancestrale: "Pillar of TCM (Huang Qi) for 'tonifying the spleen and Qi' and 'strengthening the exterior' (Wei Qi).",
        precautions: "Avoid in case of acute fever or active autoimmune disease (due to its immunostimulant effect)."
      },
      de: {
        nom_commun: "Astragalus",
        partie_utilisee: "Getrocknete Wurzel",
        preuve_scientifique: "Immunmodulation (Aktivierung von Makrophagen und NK-Zellen), Telomerschutz (Wirkung auf Telomerase) und Unterstützung der Mitochondrienfunktion.",
        convergence_ancestrale: "Pfeiler der TCM (Huang Qi) zur 'Tonisierung von Milz und Qi' und zur 'Stärkung des Äußeren' (Wei Qi).",
        precautions: "Bei akutem Fieber oder aktiver Autoimmunerkrankung vermeiden (wegen seiner immunstimulierenden Wirkung)."
      }
    }
  },
  {
    plant_id: "eleutherococcus_senticosus",
    nom_commun: "Eleuthérocoque",
    nom_latin: "Eleutherococcus senticosus",
    partie_utilisee: "Racine séchée",
    famille_bloom: "Chef d'Orchestre (Adaptogène)",
    terrains_cibles: [
        "T4_HPA",
        "T5_Mitochondrie",
        "T3_Immunité"
      ],
    actifs_cles: [
      { nom: "Éleuthérosides", polarite: "Hydrosoluble/Liposoluble", translations: { en: { nom: "Eleutherosides", polarite: "Water/Fat-soluble" }, de: { nom: "Eleutheroside", polarite: "Wasser/Fettlöslich" } } },
      { nom: "Polysaccharides", polarite: "Hydrosoluble", translations: { en: { nom: "Polysaccharides", polarite: "Water-soluble" }, de: { nom: "Polysaccharide", polarite: "Wasserlöslich" } } }
    ],
    preuve_scientifique: "Augmentation de la résistance non-spécifique au stress, amélioration de l'endurance physique et mentale, modulation de l'axe HPA sans effet stimulant direct (contrairement au café).",
    pourquoi_bloomlab: {
      probleme_traditionnel: "Les éleuthérosides (B et E) ont des polarités mixtes et nécessitent une extraction séquentielle pour être capturés intégralement sans dégradation thermique.",
      phase_A: { temp: "75°C", temps: "2h00", solvant: "Eau distillée + Glycérine (70/30)", cible: "Polysaccharides, éleuthérosides hydrosolubles", translations: { en: { cible: "Polysaccharides, water-soluble eleutherosides" }, de: { cible: "Polysaccharide, wasserlösliche Eleutheroside" } } },
      phase_B: { temp: "50°C", temps: "3h00", solvant: "Alcool bio 96°", cible: "Éleuthérosides liposolubles", translations: { en: { cible: "Fat-soluble eleutherosides" }, de: { cible: "Fettlösliche Eleutheroside" } } },
      resultat: "Une extraction adaptogène complète pour renforcer la résilience face aux agressions environnementales.",
      translations: {
        en: {
          probleme_traditionnel: "Eleutherosides (B and E) have mixed polarities and require sequential extraction to be fully captured without thermal degradation.",
          resultat: "A complete adaptogenic extraction to strengthen resilience against environmental stressors."
        },
        de: {
          probleme_traditionnel: "Eleutheroside (B und E) haben gemischte Polaritäten und erfordern eine sequentielle Extraktion, um ohne thermischen Abbau vollständig erfasst zu werden.",
          resultat: "Eine vollständige adaptogene Extraktion zur Stärkung der Widerstandsfähigkeit gegen Umweltstressoren."
        }
      }
    },
    recette_pas_a_pas: {
        batch_standard: "Cible BloomLab : 750ml de solvant + 75g de plantes (Rendement final estimé : ~600-650ml)",
        ingredients: {
          phase_A: [
            "50g de Racine d'Eleuthérocoque (copeaux)",
            "350ml d'Eau distillée",
            "150ml de Glycérine végétale"
          ],
          phase_B: [
            "25g de Racine d'Eleuthérocoque (poudre)",
            "250ml d'Alcool bio 96°"
          ]
        },
        preparation: [
          "Concassez les 50g de racine pour la Phase A.",
          "Mixez les 25g restants en poudre pour la Phase B."
        ],
        phase_A_instructions: [
          "Versez eau et glycérine. Ajoutez les 50g de copeaux.",
          "Fermez, mode manuel 'OIL', TEMP 75°C, TEMPS 2h00. START."
        ],
        transition: [
          "1. Éteignez. Laissez reposer 20 minutes.",
          "2. TEST SENSORIEL OBLIGATOIRE : Posez votre main sur la paroi extérieure de la cuve. Elle doit être 'tiède au toucher' (environ 40°C), et non brûlante.",
          "3. ⚠️ SÉCURITÉ : N'ajoutez l'alcool que lorsque ce test est validé."
        ],
        phase_B_instructions: [
          "Ajoutez l'alcool et les 25g de poudre.",
          "Fermez, mode manuel 'OIL', TEMP 50°C, TEMPS 3h00. START."
        ],
        filtration_et_finition: [
          "Filtrez à l'étamine. Pressez le marc.",
          "Le liquide sera brun clair. Mettez en flacon ambré."
        ]
      },
    socle_synergique: {
      cofacteurs_complements: [
        { 
          nom: "Magnésium", 
          dose: "300mg/jour", 
          role: "Cofacteur essentiel de la production d'ATP, potentialisant l'effet anti-fatigue de l'eleuthérocoque.",
          translations: {
            en: { nom: "Magnesium", dose: "300mg/day", role: "Essential cofactor for ATP production, enhancing the anti-fatigue effect of eleutherococcus." },
            de: { nom: "Magnesium", dose: "300mg/Tag", role: "Essenzieller Cofaktor der ATP-Produktion, der die Anti-Müdigkeits-Wirkung von Eleutherococcus verstärkt." }
          }
        },
        { 
          nom: "Vitamines B", 
          dose: "Complexe B", 
          role: "Soutien du métabolisme énergétique activé par la plante.",
          translations: {
            en: { nom: "B Vitamins", dose: "B Complex", role: "Support of energy metabolism activated by the plant." },
            de: { nom: "B-Vitamine", dose: "B-Komplex", role: "Unterstützung des durch die Pflanze aktivierten Energiestoffwechsels." }
          }
        }
      ],
      leviers_du_vivant: [
        { 
          nom: "Exposition à la lumière matinale", 
          frequence: "15 min au réveil", 
          role: "Synchronise le rythme circadien, optimisant l'effet adaptogène sur l'axe HPA.",
          translations: {
            en: { nom: "Morning light exposure", frequence: "15 min upon waking", role: "Synchronizes the circadian rhythm, optimizing the adaptogenic effect on the HPA axis." },
            de: { nom: "Morgendliche Lichtexposition", frequence: "15 Min. nach dem Aufwachen", role: "Synchronisiert den zirkadianen Rhythmus und optimiert die adaptogene Wirkung auf die HPA-Achse." }
          }
        }
      ]
    },
    convergence_ancestrale: "Utilisé en Russie soviétique pour les cosmonautes et les athlètes. En MTC, il tonifie le Qi et renforce la rate.",
    synergies_recommandees: ["rhodiola_rosea", "panax_ginseng", "schisandra_chinensis"],
    precautions: "À éviter en cas d'hypertension sévère non contrôlée. À prendre le matin ou midi.",
    translations: {
      en: {
        nom_commun: "Eleuthero",
        partie_utilisee: "Dried root",
        preuve_scientifique: "Increased non-specific resistance to stress, improvement of physical and mental endurance, modulation of the HPA axis without a direct stimulant effect (unlike coffee).",
        convergence_ancestrale: "Used in Soviet Russia for cosmonauts and athletes. In TCM, it tonifies Qi and strengthens the spleen.",
        precautions: "Avoid in case of uncontrolled severe hypertension. Take in the morning or at noon."
      },
      de: {
        nom_commun: "Eleutherococcus",
        partie_utilisee: "Getrocknete Wurzel",
        preuve_scientifique: "Erhöhung der unspezifischen Stressresistenz, Verbesserung der körperlichen und geistigen Ausdauer, Modulation der HPA-Achse ohne direkte stimulierende Wirkung (im Gegensatz zu Kaffee).",
        convergence_ancestrale: "In der Sowjetunion für Kosmonauten und Athleten verwendet. In der TCM tonisiert es das Qi und stärkt die Milz.",
        precautions: "Bei unkontrolliertem schwerem Bluthochdruck vermeiden. Morgens oder mittags einnehmen."
      }
    }
  },
  {
    plant_id: "bacopa_monnieri",
    nom_commun: "Bacopa",
    nom_latin: "Bacopa monnieri",
    partie_utilisee: "Parties aériennes séchées",
    famille_bloom: "Réparateur (Neuroplasticité)",
    terrains_cibles: [
        "T7_Psycho_émotionnel",
        "T5_Mitochondrie",
        "T4_HPA"
      ],
    actifs_cles: [
      { nom: "Bacosides", polarite: "Liposoluble", translations: { en: { nom: "Bacosides", polarite: "Fat-soluble" }, de: { nom: "Bacoside", polarite: "Fettlöslich" } } },
      { nom: "Alcaloïdes", polarite: "Mixte", translations: { en: { nom: "Alkaloids", polarite: "Mixed" }, de: { nom: "Alkaloide", polarite: "Gemischt" } } },
      { nom: "Flavonoïdes", polarite: "Hydrosoluble", translations: { en: { nom: "Flavonoids", polarite: "Water-soluble" }, de: { nom: "Flavonoide", polarite: "Wasserlöslich" } } }
    ],
    preuve_scientifique: "Amélioration de la mémoire et de la vitesse de traitement de l'information. Réduction de l'anxiété via la modulation des récepteurs GABAergiques et la protection des neurones contre le stress oxydatif.",
    pourquoi_bloomlab: {
      probleme_traditionnel: "Les bacosides (actifs nootropiques majeurs) sont lipophiles. Une extraction aqueuse seule est inefficace.",
      phase_A: { temp: "65°C", temps: "2h00", solvant: "Eau distillée + Glycérine (70/30)", cible: "Flavonoïdes, alcaloïdes hydrosolubles", translations: { en: { cible: "Flavonoids, water-soluble alkaloids" }, de: { cible: "Flavonoide, wasserlösliche Alkaloide" } } },
      phase_B: { temp: "50°C", temps: "3h00", solvant: "Alcool bio 96°", cible: "Bacosides", translations: { en: { cible: "Bacosides" }, de: { cible: "Bacoside" } } },
      resultat: "Un extrait nootropique puissant optimisant la conduction synaptique et la résilience neuronale.",
      translations: {
        en: {
          probleme_traditionnel: "Bacosides (major nootropic actives) are lipophilic. Aqueous extraction alone is ineffective.",
          resultat: "A powerful nootropic extract optimizing synaptic conduction and neuronal resilience."
        },
        de: {
          probleme_traditionnel: "Bacoside (wichtigste nootropische Wirkstoffe) sind lipophil. Eine rein wässrige Extraktion ist unwirksam.",
          resultat: "Ein leistungsstarker nootropischer Extrakt, der die synaptische Leitung und die neuronale Resilienz optimiert."
        }
      }
    },
    recette_pas_a_pas: {
        batch_standard: "Cible BloomLab : 750ml de solvant + 75g de plantes (Rendement final estimé : ~600-650ml)",
        ingredients: {
          phase_A: [
            "50g de Bacopa séché",
            "350ml d'Eau distillée",
            "150ml de Glycérine végétale"
          ],
          phase_B: [
            "25g de Bacopa séché",
            "250ml d'Alcool bio 96°"
          ]
        },
        preparation: [
          "La plante est légère. Tassez les 50g dans la cuve.",
          "Mixez les 25g restants pour la Phase B."
        ],
        phase_A_instructions: [
          "Versez eau et glycérine. Ajoutez les 50g de plante tassée.",
          "Fermez, mode manuel 'OIL', TEMP 65°C, TEMPS 2h00. START."
        ],
        transition: [
          "1. Éteignez. Laissez reposer 20 minutes.",
          "2. TEST SENSORIEL OBLIGATOIRE : Posez votre main sur la paroi extérieure de la cuve. Elle doit être 'tiède au toucher' (environ 40°C), et non brûlante.",
          "3. ⚠️ SÉCURITÉ : N'ajoutez l'alcool que lorsque ce test est validé."
        ],
        phase_B_instructions: [
          "Ajoutez l'alcool et les 25g de plante mixée.",
          "Fermez, mode manuel 'OIL', TEMP 50°C, TEMPS 3h00. START."
        ],
        filtration_et_finition: [
          "Filtrez à l'étamine. Pressez le marc.",
          "Le liquide sera vert-brun. Mettez en flacon ambré."
        ]
      },
    socle_synergique: {
      cofacteurs_complements: [
        { 
          nom: "Oméga-3 (DHA)", 
          dose: "1000mg/jour", 
          role: "Les bacosides améliorent la communication neuronale, mais le DHA est la brique structurelle des membranes neuronales.",
          translations: {
            en: { nom: "Omega-3 (DHA)", dose: "1000mg/day", role: "Bacosides improve neuronal communication, but DHA is the structural building block of neuronal membranes." },
            de: { nom: "Omega-3 (DHA)", dose: "1000mg/Tag", role: "Bacoside verbessern die neuronale Kommunikation, aber DHA ist der strukturelle Baustein der neuronalen Membranen." }
          }
        },
        { 
          nom: "Magnésium L-Thréonate", 
          dose: "Selon protocole", 
          role: "Seule forme de magnésium traversant efficacement la barrière hémato-encéphalique pour soutenir la neuroplasticité.",
          translations: {
            en: { nom: "Magnesium L-Threonate", dose: "According to protocol", role: "The only form of magnesium that effectively crosses the blood-brain barrier to support neuroplasticity." },
            de: { nom: "Magnesium-L-Threonat", dose: "Laut Protokoll", role: "Die einzige Form von Magnesium, die die Blut-Hirn-Schranke wirksam passiert, um die Neuroplastizität zu unterstützen." }
          }
        }
      ],
      leviers_du_vivant: [
        { 
          nom: "Apprentissage continu", 
          frequence: "Quotidienne", 
          role: "La neuroplasticité induite par le bacopa nécessite une stimulation cognitive pour créer de nouvelles connexions synaptiques.",
          translations: {
            en: { nom: "Continuous learning", frequence: "Daily", role: "Bacopa-induced neuroplasticity requires cognitive stimulation to create new synaptic connections." },
            de: { nom: "Kontinuierliches Lernen", frequence: "Täglich", role: "Die durch Bacopa induzierte Neuroplastizität erfordert kognitive Stimulation, um neue synaptische Verbindungen zu schaffen." }
          }
        }
      ]
    },
    convergence_ancestrale: "Brahmi en Ayurveda. Utilisé depuis des millénaires par les érudits pour améliorer la mémoire et la concentration.",
    synergies_recommandees: ["rhodiola_rosea", "ginkgo_biloba", "melissa_officinalis"],
    precautions: "Peut causer des troubles digestifs légers au début. À prendre au milieu d'un repas. Déconseillé en cas de bradycardie.",
    translations: {
      en: {
        nom_commun: "Bacopa",
        partie_utilisee: "Dried aerial parts",
        preuve_scientifique: "Improvement of memory and information processing speed. Reduction of anxiety via modulation of GABAergic receptors and protection of neurons against oxidative stress.",
        convergence_ancestrale: "'Brahmi' in Ayurveda. Sacred plant used to 'open the mind' and support intellectual clarity.",
        precautions: "May cause slight intestinal transit acceleration in some people. Take during a meal."
      },
      de: {
        nom_commun: "Kleines Fettblatt (Brahmi)",
        partie_utilisee: "Getrocknete oberirdische Teile",
        preuve_scientifique: "Verbesserung des Gedächtnisses und der Informationsverarbeitungsgeschwindigkeit. Reduzierung von Angstzuständen durch Modulation der GABAergen Rezeptoren und Schutz der Neuronen vor oxidativem Stress.",
        convergence_ancestrale: "'Brahmi' im Ayurveda. Heilige Pflanze, die verwendet wird, um den 'Geist zu öffnen' und die intellektuelle Klarheit zu unterstützen.",
        precautions: "Kann bei einigen Personen eine leichte Beschleunigung des Darmtransports verursachen. Während einer Mahlzeit einnehmen."
      }
    }
  },
  {
    plant_id: "ganoderma_lucidum",
    nom_commun: "Reishi",
    nom_latin: "Ganoderma lucidum",
    partie_utilisee: "Fruit (champignon) séché",
    famille_bloom: "Chef d'Orchestre (Immunité & Calme)",
    terrains_cibles: [
        "T3_Immunité",
        "T7_Psycho_émotionnel",
        "T2_Foie"
      ],
    actifs_cles: [
      { nom: "Polysaccharides (Bêta-glucanes)", polarite: "Hydrosoluble", translations: { en: { nom: "Polysaccharides (Beta-glucans)", polarite: "Water-soluble" }, de: { nom: "Polysaccharide (Beta-Glucane)", polarite: "Wasserlöslich" } } },
      { nom: "Triterpènes", polarite: "Liposoluble", translations: { en: { nom: "Triterpenes", polarite: "Fat-soluble" }, de: { nom: "Triterpene", polarite: "Fettlöslich" } } }
    ],
    preuve_scientifique: "Modulation immunitaire (équilibre Th1/Th2, augmentation des cellules NK), action hépatoprotectrice, et effet calmant sur le système nerveux central via les triterpènes.",
    pourquoi_bloomlab: {
      probleme_traditionnel: "La paroi de chitine du champignon nécessite une chaleur prolongée pour libérer les bêta-glucanes. Les triterpènes (amers et calmants) nécessitent un solvant organique.",
      phase_A: { temp: "80°C", temps: "3h00", solvant: "Eau distillée + Glycérine (70/30)", cible: "Polysaccharides (Bêta-glucanes)", translations: { en: { cible: "Polysaccharides (Beta-glucans)" }, de: { cible: "Polysaccharide (Beta-Glucane)" } } },
      phase_B: { temp: "50°C", temps: "3h00", solvant: "Alcool bio 96°", cible: "Triterpènes", translations: { en: { cible: "Triterpenes" }, de: { cible: "Triterpene" } } },
      resultat: "Une double extraction fongique complète libérant l'intégralité du potentiel immuno-modulateur et calmant du Reishi.",
      translations: {
        en: {
          probleme_traditionnel: "The chitin wall of the mushroom requires prolonged heat to release beta-glucans. Triterpenes (bitter and calming) require an organic solvent.",
          resultat: "A complete fungal double extraction releasing the entire immuno-modulating and calming potential of Reishi."
        },
        de: {
          probleme_traditionnel: "Die Chitinwand des Pilzes erfordert längere Hitze, um Beta-Glucane freizusetzen. Triterpene (bitter und beruhigend) erfordern ein organisches Lösungsmittel.",
          resultat: "Eine vollständige pilzliche Doppelextraktion, die das gesamte immunmodulierende und beruhigende Potenzial von Reishi freisetzt."
        }
      }
    },
    recette_pas_a_pas: {
        batch_standard: "Cible BloomLab : 750ml de solvant + 75g de plantes (Rendement final estimé : ~600-650ml)",
        ingredients: {
          phase_A: [
            "50g de Reishi en poudre grossière",
            "350ml d'Eau distillée",
            "150ml de Glycérine végétale"
          ],
          phase_B: [
            "25g de Reishi en poudre fine",
            "250ml d'Alcool bio 96°"
          ]
        },
        preparation: [
          "Utilisez du Reishi déjà broyé ou broyez-le finement. La texture est très dure.",
          "Séparez en 50g pour la Phase A et 25g pour la Phase B."
        ],
        phase_A_instructions: [
          "Versez eau et glycérine. Ajoutez les 50g de poudre.",
          "Fermez, mode manuel 'OIL', TEMP 80°C, TEMPS 3h00. START."
        ],
        transition: [
          "1. Éteignez. Laissez reposer 30 minutes (la poudre de champignon retient la chaleur).",
          "2. TEST SENSORIEL OBLIGATOIRE : Posez votre main sur la paroi extérieure de la cuve. Elle doit être 'tiède au toucher' (environ 40°C), et non brûlante.",
          "3. ⚠️ SÉCURITÉ : N'ajoutez l'alcool que lorsque ce test est validé."
        ],
        phase_B_instructions: [
          "Ajoutez l'alcool et les 25g de poudre fine.",
          "Fermez, mode manuel 'OIL', TEMP 50°C, TEMPS 3h00. START."
        ],
        filtration_et_finition: [
          "Filtrez à l'étamine double épaisseur. Pressez très fermement.",
          "Le liquide sera brun foncé et amer. Mettez en flacon ambré."
        ]
      },
    socle_synergique: {
      cofacteurs_complements: [
        { 
          nom: "Vitamine C", 
          dose: "500mg/jour", 
          role: "Potentialise l'absorption et l'activité immunitaire des bêta-glucanes.",
          translations: {
            en: { nom: "Vitamin C", dose: "500mg/day", role: "Enhances the absorption and immune activity of beta-glucans." },
            de: { nom: "Vitamin C", dose: "500mg/Tag", role: "Verstärkt die Aufnahme und Immunaktivität von Beta-Glucanen." }
          }
        },
        { 
          nom: "Zinc", 
          dose: "15mg/jour", 
          role: "Cofacteur essentiel de la fonction des cellules NK activées par le Reishi.",
          translations: {
            en: { nom: "Zinc", dose: "15mg/day", role: "Essential cofactor for the function of NK cells activated by Reishi." },
            de: { nom: "Zink", dose: "15mg/Tag", role: "Essenzieller Cofaktor für die Funktion der durch Reishi aktivierten NK-Zellen." }
          }
        }
      ],
      leviers_du_vivant: [
        { 
          nom: "Cohérence cardiaque", 
          frequence: "2x 5min/jour", 
          role: "Synergie parfaite avec l'effet calmant du Reishi sur le système nerveux.",
          translations: {
            en: { nom: "Heart coherence", frequence: "2x 5min/day", role: "Perfect synergy with Reishi's calming effect on the nervous system." },
            de: { nom: "Herzkohärenz", frequence: "2x 5 Min./Tag", role: "Perfekte Synergie mit der beruhigenden Wirkung von Reishi auf das Nervensystem." }
          }
        }
      ]
    },
    convergence_ancestrale: "Ling Zhi en MTC, le 'champignon de l'immortalité'. Utilisé pour calmer l'esprit (Shen) et tonifier le Qi.",
    synergies_recommandees: ["astragalus_membranaceus", "cordyceps_sinensis", "passiflora_incarnata"],
    precautions: "Peut fluidifier le sang. À utiliser avec prudence en cas de traitement anticoagulant ou avant une intervention chirurgicale.",
    translations: {
      en: {
        nom_commun: "Reishi",
        partie_utilisee: "Dried fruit (mushroom)",
        preuve_scientifique: "Immune modulation (Th1/Th2 balance, increase in NK cells), hepatoprotective action, and calming effect on the central nervous system via triterpenes.",
        convergence_ancestrale: "'Ling Zhi' in TCM, the 'mushroom of immortality'. Used to calm the mind (Shen) and tonify the Qi.",
        precautions: "May thin the blood. Use with caution in case of anticoagulant treatment or before surgery."
      },
      de: {
        nom_commun: "Reishi",
        partie_utilisee: "Getrockneter Fruchtkörper (Pilz)",
        preuve_scientifique: "Immunmodulation (Th1/Th2-Gleichgewicht, Zunahme der NK-Zellen), hepatoprotektive Wirkung und beruhigende Wirkung auf das Zentralnervensystem durch Triterpene.",
        convergence_ancestrale: "'Ling Zhi' in der TCM, der 'Pilz der Unsterblichkeit'. Wird verwendet, um den Geist (Shen) zu beruhigen und das Qi zu tonisieren.",
        precautions: "Kann das Blut verdünnen. Bei gerinnungshemmender Behandlung oder vor Operationen mit Vorsicht anwenden."
      }
    }
  },
  {
    plant_id: "cannabis_sativa_fleurs",
    nom_commun: "Chanvre Industriel (Fleurs)",
    nom_latin: "Cannabis sativa L. (<0.3% THC)",
    partie_utilisee: "Fleurs séchées",
    famille_bloom: "Réparateur (Système Endocannabinoïde)",
    terrains_cibles: [
        "T1_Intestin",
        "T8_Inflammation",
        "T7_Psycho_émotionnel"
      ],
    actifs_cles: [
      { nom: "Cannabidiol (CBD)", polarite: "Liposoluble", translations: { en: { nom: "Cannabidiol (CBD)", polarite: "Fat-soluble" }, de: { nom: "Cannabidiol (CBD)", polarite: "Fettlöslich" } } },
      { nom: "Cannabigérol (CBG)", polarite: "Liposoluble", translations: { en: { nom: "Cannabigerol (CBG)", polarite: "Fat-soluble" }, de: { nom: "Cannabigerol (CBG)", polarite: "Fettlöslich" } } },
      { nom: "Terpènes (Myrcène, Pinène)", polarite: "Volatile/Liposoluble", translations: { en: { nom: "Terpenes (Myrcene, Pinene)", polarite: "Volatile/Fat-soluble" }, de: { nom: "Terpene (Myrcen, Pinen)", polarite: "Flüchtig/Fettlöslich" } } }
    ],
    preuve_scientifique: "Modulation du système endocannabinoïde (récepteurs CB1 et CB2). Réduction de l'inflammation intestinale (leaky gut), action anxiolytique sans effet psychotrope, et modulation de la douleur.",
    pourquoi_bloomlab: {
      probleme_traditionnel: "Les cannabinoïdes et les terpènes sont strictement liposolubles et très thermolabiles. Une extraction aqueuse est inutile. Une chaleur >60°C dégrade les terpènes et décarboxyle le CBD de manière incontrôlée.",
      phase_A: { temp: "50°C", temps: "1h00", solvant: "Eau distillée + Glycérine (70/30)", cible: "Flavonoïdes mineurs (cannaflavines)", translations: { en: { cible: "Minor flavonoids (cannaflavines)" }, de: { cible: "Geringe Flavonoide (Cannaflavine)" } } },
      phase_B: { temp: "45°C", temps: "4h00", solvant: "Huile de Jojoba ou Huile de Coco MCT", cible: "CBD, CBG, Terpènes", translations: { en: { cible: "CBD, CBG, Terpenes" }, de: { cible: "CBD, CBG, Terpene" } } },
      resultat: "Un extrait riche en cannabinoïdes et terpènes préservés pour une modulation optimale du système endocannabinoïde.",
      translations: {
        en: {
          probleme_traditionnel: "Cannabinoids and terpenes are strictly fat-soluble and very heat-labile. Aqueous extraction is useless. Heat >60°C degrades terpenes and decarboxylates CBD in an uncontrolled manner.",
          resultat: "An extract rich in preserved cannabinoids and terpenes for optimal modulation of the endocannabinoid system."
        },
        de: {
          probleme_traditionnel: "Cannabinoide und Terpene sind streng fettlöslich und sehr hitzelabil. Eine wässrige Extraktion ist nutzlos. Hitze >60°C baut Terpene ab und decarboxyliert CBD unkontrolliert.",
          resultat: "Ein Extrakt, der reich an konservierten Cannabinoiden und Terpenen ist, für eine optimale Modulation des Endocannabinoid-Systems."
        }
      }
    },
    recette_pas_a_pas: {
        batch_standard: "Cible BloomLab : 750ml de solvant + 75g de plantes (Rendement final estimé : ~600-650ml)",
        ingredients: {
          phase_A: [
            "50g de Fleurs de Chanvre (légèrement concassées)",
            "350ml d'Eau distillée",
            "150ml de Glycérine végétale"
          ],
          phase_B: [
            "25g de Fleurs de Chanvre (légèrement concassées)",
            "250ml d'Huile de Jojoba ou Coco MCT"
          ]
        },
        preparation: [
          "Ne mixez pas les fleurs en poudre fine pour éviter une extraction trop agressive des chlorophylles.",
          "Concassez grossièrement à la main."
        ],
        phase_A_instructions: [
          "Versez eau et glycérine. Ajoutez les 50g de fleurs.",
          "Fermez, mode manuel 'OIL', TEMP 50°C, TEMPS 1h00. START."
        ],
        transition: [
          "1. Éteignez. Laissez reposer 20 minutes.",
          "2. TEST SENSORIEL OBLIGATOIRE : Posez votre main sur la paroi extérieure de la cuve. Elle doit être 'tiède au toucher' (environ 40°C), et non brûlante.",
          "3. ⚠️ SÉCURITÉ : N'ajoutez l'huile que lorsque ce test est validé."
        ],
        phase_B_instructions: [
          "Ajoutez l'huile et les 25g de fleurs restantes.",
          "Fermez, mode manuel 'OIL', TEMP 45°C, TEMPS 4h00. START."
        ],
        filtration_et_finition: [
          "Filtrez à l'étamine. Pressez doucement pour éviter de troubler l'huile.",
          "Le liquide sera une huile verte/dorée aromatique. Mettez en flacon ambré."
        ]
      },
    socle_synergique: {
      cofacteurs_complements: [
        { 
          nom: "Oméga-3", 
          dose: "2g/jour", 
          role: "Les acides gras oméga-3 sont les précurseurs des endocannabinoïdes naturels du corps, créant une synergie parfaite avec le CBD.",
          translations: {
            en: { nom: "Omega-3", dose: "2g/day", role: "Omega-3 fatty acids are the precursors of the body's natural endocannabinoids, creating a perfect synergy with CBD." },
            de: { nom: "Omega-3", dose: "2g/Tag", role: "Omega-3-Fettsäuren sind die Vorstufen der körpereigenen Endocannabinoide und bilden eine perfekte Synergie mit CBD." }
          }
        },
        { 
          nom: "Magnésium", 
          dose: "300mg/jour", 
          role: "Potentialise l'effet relaxant musculaire et nerveux du chanvre.",
          translations: {
            en: { nom: "Magnesium", dose: "300mg/day", role: "Enhances the muscular and nervous relaxant effect of hemp." },
            de: { nom: "Magnesium", dose: "300mg/Tag", role: "Verstärkt die muskel- und nervenentspannende Wirkung von Hanf." }
          }
        }
      ],
      leviers_du_vivant: [
        { 
          nom: "Réduction du stress oxydatif", 
          frequence: "Quotidienne", 
          role: "Le système endocannabinoïde fonctionne mieux lorsque la charge inflammatoire globale est réduite (via l'alimentation et le sommeil).",
          translations: {
            en: { nom: "Oxidative stress reduction", frequence: "Daily", role: "The endocannabinoid system works better when the overall inflammatory load is reduced (via diet and sleep)." },
            de: { nom: "Reduzierung von oxidativem Stress", frequence: "Täglich", role: "Das Endocannabinoid-System funktioniert besser, wenn die allgemeine Entzündungsbelastung (über Ernährung und Schlaf) reduziert wird." }
          }
        }
      ]
    },
    convergence_ancestrale: "Utilisé en médecine traditionnelle chinoise et ayurvédique pour calmer l'esprit, réduire la douleur et harmoniser le corps.",
    synergies_recommandees: ["curcuma_longa", "boswellia_serrata", "melissa_officinalis"],
    precautions: "Vérifiez la législation locale sur le CBD. Déconseillé en cas de grossesse, d'allaitement ou de traitement par inhibiteurs du cytochrome P450 (demandez l'avis d'un professionnel de santé).",
    translations: {
      en: {
        nom_commun: "Industrial Hemp (Flowers)",
        partie_utilisee: "Dried flowers",
        preuve_scientifique: "Modulation of the endocannabinoid system (CB1 and CB2 receptors). Reduction of intestinal inflammation (leaky gut), anxiolytic action without psychotropic effect, and pain modulation.",
        convergence_ancestrale: "Sacred plant used for millennia for its fiber and its therapeutic properties (Shen Nong Ben Cao Jing).",
        precautions: "Check local legislation. Not recommended during pregnancy and for children."
      },
      de: {
        nom_commun: "Nutzhanf (Blüten)",
        partie_utilisee: "Getrocknete Blüten",
        preuve_scientifique: "Modulation des Endocannabinoid-Systems (CB1- und CB2-Rezeptoren). Reduzierung von Darmentzündungen (Leaky Gut), anxiolytische Wirkung ohne psychotrope Wirkung und Schmerzmodulation.",
        convergence_ancestrale: "Heilige Pflanze, die seit Jahrtausenden wegen ihrer Fasern und ihrer therapeutischen Eigenschaften verwendet wird (Shen Nong Ben Cao Jing).",
        precautions: "Lokale Gesetzgebung prüfen. Während der Schwangerschaft und für Kinder nicht empfohlen."
      }
    }
  },
  {
    plant_id: "ginkgo_biloba",
    nom_commun: "Ginkgo",
    nom_latin: "Ginkgo biloba",
    partie_utilisee: "Feuilles séchées",
    famille_bloom: "Pharmacie Intérieure (Microcirculation & Neuro)",
    terrains_cibles: [
        "T5_Mitochondrie",
        "T7_Psycho_emotionnel",
        "T9_Peau_Phaneres"
      ],
    actifs_cles: [
      { nom: "Ginkgolides (A, B, C)", polarite: "Liposoluble", translations: { en: { nom: "Ginkgolides (A, B, C)", polarite: "Fat-soluble" }, de: { nom: "Ginkgolide (A, B, C)", polarite: "Fettlöslich" } } },
      { nom: "Flavones glycosides", polarite: "Hydrosoluble", translations: { en: { nom: "Flavone glycosides", polarite: "Water-soluble" }, de: { nom: "Flavonglykoside", polarite: "Wasserlöslich" } } },
      { nom: "Acide ginkgolique", polarite: "Liposoluble", translations: { en: { nom: "Ginkgolic acid", polarite: "Fat-soluble" }, de: { nom: "Ginkgolsäure", polarite: "Fettlöslich" } } }
    ],
    preuve_scientifique: "Amélioration de la microcirculation cérébrale et périphérique, protection contre le stress oxydatif neuronal, et inhibition du facteur d'activation plaquettaire (PAF).",
    pourquoi_bloomlab: {
      probleme_traditionnel: "Les ginkgolides (actifs vasculaires majeurs) sont liposolubles, tandis que les flavones sont hydrosolubles. Une infusion rate les ginkgolides, une macération alcoolique seule rate les flavones.",
      phase_A: { temp: "70°C", temps: "2h00", solvant: "Eau distillée + Glycérine (70/30)", cible: "Flavones glycosides", translations: { en: { cible: "Flavone glycosides" }, de: { cible: "Flavonglykoside" } } },
      phase_B: { temp: "50°C", temps: "3h00", solvant: "Alcool bio 96°", cible: "Ginkgolides, acide ginkgolique", translations: { en: { cible: "Ginkgolides, ginkgolic acid" }, de: { cible: "Ginkgolide, Ginkgolsäure" } } },
      resultat: "Une extraction neuro-vasculaire complète pour optimiser la microcirculation et la protection cérébrale.",
      translations: {
        en: {
          probleme_traditionnel: "Ginkgolides (major vascular actives) are fat-soluble, while flavones are water-soluble. An infusion misses ginkgolides, an alcoholic maceration alone misses flavones.",
          resultat: "A complete neuro-vascular extraction to optimize microcirculation and cerebral protection."
        },
        de: {
          probleme_traditionnel: "Ginkgolide (wichtigste vaskuläre Wirkstoffe) sind fettlöslich, während Flavone wasserlöslich sind. Ein Aufguss verfehlt Ginkgolide, eine rein alkoholische Mazeration verfehlt Flavone.",
          resultat: "Eine vollständige neurovaskuläre Extraktion zur Optimierung der Mikrozirkulation und des Schutzes des Gehirns."
        }
      }
    },
    recette_pas_a_pas: {
        batch_standard: "Cible BloomLab : 750ml de solvant + 75g de plantes (Rendement final estimé : ~600-650ml)",
        ingredients: {
          phase_A: [
            "50g de Feuilles de Ginkgo",
            "350ml d'Eau distillée",
            "150ml de Glycérine végétale"
          ],
          phase_B: [
            "25g de Feuilles de Ginkgo",
            "250ml d'Alcool bio 96°"
          ]
        },
        preparation: [
          "Les feuilles sont relativement légères. Tassez les 50g dans la cuve.",
          "Mixez les 25g restants pour la Phase B."
        ],
        phase_A_instructions: [
          "Versez eau et glycérine. Ajoutez les 50g de feuilles tassées.",
          "Fermez, mode manuel 'OIL', TEMP 70°C, TEMPS 2h00. START."
        ],
        transition: [
          "1. Éteignez. Laissez reposer 20 minutes.",
          "2. TEST SENSORIEL OBLIGATOIRE : Posez votre main sur la paroi extérieure de la cuve. Elle doit être 'tiède au toucher' (environ 40°C), et non brûlante.",
          "3. ⚠️ SÉCURITÉ : N'ajoutez l'alcool que lorsque ce test est validé."
        ],
        phase_B_instructions: [
          "Ajoutez l'alcool et les 25g de feuilles mixées.",
          "Fermez, mode manuel 'OIL', TEMP 50°C, TEMPS 3h00. START."
        ],
        filtration_et_finition: [
          "Filtrez à l'étamine. Pressez le marc.",
          "Le liquide sera jaune-vert. Mettez en flacon ambré."
        ]
      },
    socle_synergique: {
      cofacteurs_complements: [
        { 
          nom: "Oméga-3 (EPA/DHA)", 
          dose: "1000mg/jour", 
          role: "Fluidifie les membranes cellulaires, potentialisant l'action microcirculatoire du Ginkgo.",
          translations: {
            en: { nom: "Omega-3 (EPA/DHA)", dose: "1000mg/day", role: "Fluids cell membranes, enhancing the microcirculatory action of Ginkgo." },
            de: { nom: "Omega-3 (EPA/DHA)", dose: "1000mg/Tag", role: "Verflüssigt Zellmembranen und verstärkt die mikrozirkulatorische Wirkung von Ginkgo." }
          }
        },
        { 
          nom: "Magnésium", 
          dose: "300mg/jour", 
          role: "Relaxant vasculaire naturel, synergique avec l'effet du Ginkgo.",
          translations: {
            en: { nom: "Magnesium", dose: "300mg/day", role: "Natural vascular relaxant, synergistic with the effect of Ginkgo." },
            de: { nom: "Magnesium", dose: "300mg/Tag", role: "Natürliches Gefäßentspannungsmittel, synergetisch mit der Wirkung von Ginkgo." }
          }
        }
      ],
      leviers_du_vivant: [
        { 
          nom: "Exercice cardiovasculaire léger", 
          frequence: "30 min/jour", 
          role: "Stimule la pompe cardiaque, maximisant la distribution des actifs du Ginkgo aux extrémités et au cerveau.",
          translations: {
            en: { nom: "Light cardiovascular exercise", frequence: "30 min/day", role: "Stimulates the cardiac pump, maximizing the distribution of Ginkgo's actives to the extremities and the brain." },
            de: { nom: "Leichte Herz-Kreislauf-Übung", frequence: "30 Min./Tag", role: "Stimuliert die Herzpumpe und maximiert die Verteilung der Ginkgo-Wirkstoffe in den Extremitäten und im Gehirn." }
          }
        }
      ]
    },
    convergence_ancestrale: "Utilisé en MTC depuis des millénaires pour 'nourrir le cerveau' et 'débloquer les méridiens'.",
    synergies_recommandees: ["bacopa_monnieri", "rhodiola_rosea", "vaccinium_myrtillus"],
    precautions: "Contre-indiqué en cas de traitement anticoagulant ou antiagrégant plaquettaire. À arrêter 1 semaine avant toute intervention chirurgicale.",
    translations: {
      en: {
        nom_commun: "Ginkgo",
        partie_utilisee: "Dried leaves",
        preuve_scientifique: "Improvement of cerebral and peripheral microcirculation, protection against neuronal oxidative stress, and inhibition of platelet activating factor (PAF).",
        convergence_ancestrale: "'Living fossil'. Sacred tree in Asia, used for its longevity and its action on memory and 'vitality'.",
        precautions: "May thin the blood. Avoid in case of anticoagulant treatment or before surgery. Not recommended in case of epilepsy."
      },
      de: {
        nom_commun: "Ginkgo",
        partie_utilisee: "Getrocknete Blätter",
        preuve_scientifique: "Verbesserung der zerebralen und peripheren Mikrozirkulation, Schutz vor neuronalem oxidativem Stress und Hemmung des Thrombozyten-aktivierenden Faktors (PAF).",
        convergence_ancestrale: "'Lebendes Fossil'. Heiliger Baum in Asien, verwendet wegen seiner Langlebigkeit und seiner Wirkung auf das Gedächtnis und die 'Vitalität'.",
        precautions: "Kann das Blut verdünnen. Bei gerinnungshemmender Behandlung oder vor Operationen vermeiden. Bei Epilepsie nicht empfohlen."
      }
    }
  },
  {
    plant_id: "trigonella_foenum_graecum",
    nom_commun: "Fenugrec",
    nom_latin: "Trigonella foenum-graecum",
    partie_utilisee: "Graines séchées",
    famille_bloom: "Réparateur (Métabolique & Capillaire)",
    terrains_cibles: [
        "T10_Hormonal",
        "T1_Intestin",
        "T9_Peau_Phaneres"
      ],
    actifs_cles: [
      { nom: "Saponines stéroïdiques", polarite: "Liposoluble", translations: { en: { nom: "Steroidal saponins", polarite: "Fat-soluble" }, de: { nom: "Steroidsaponine", polarite: "Fettlöslich" } } },
      { nom: "Mucilages", polarite: "Hydrosoluble", translations: { en: { nom: "Mucilages", polarite: "Water-soluble" }, de: { nom: "Schleimstoffe", polarite: "Wasserlöslich" } } },
      { nom: "4-hydroxyisoleucine", polarite: "Hydrosoluble", translations: { en: { nom: "4-hydroxyisoleucine", polarite: "Water-soluble" }, de: { nom: "4-Hydroxyisoleucin", polarite: "Wasserlöslich" } } }
    ],
    preuve_scientifique: "Modulation de la glycémie (stimulation de la sécrétion d'insuline), action galactogène, et apport de précurseurs hormonaux naturels soutenant la densité capillaire et la vitalité.",
    pourquoi_bloomlab: {
      probleme_traditionnel: "Les mucilages (apaisants intestinaux) nécessitent de l'eau tiède, tandis que les saponines stéroïdiques (régulatrices) nécessitent un solvant organique et une chaleur modérée.",
      phase_A: { temp: "65°C", temps: "2h00", solvant: "Eau distillée + Glycérine (70/30)", cible: "Mucilages, 4-hydroxyisoleucine", translations: { en: { cible: "Mucilages, 4-hydroxyisoleucine" }, de: { cible: "Schleimstoffe, 4-Hydroxyisoleucin" } } },
      phase_B: { temp: "50°C", temps: "3h00", solvant: "Alcool bio 96°", cible: "Saponines stéroïdiques", translations: { en: { cible: "Steroidal saponins" }, de: { cible: "Steroidsaponine" } } },
      resultat: "Une extraction anabolique naturelle complète pour le soutien métabolisme et hormonal.",
      translations: {
        en: {
          probleme_traditionnel: "Mucilages (intestinal soothers) require lukewarm water, while steroidal saponins (regulators) require an organic solvent and moderate heat.",
          resultat: "A complete natural anabolic extraction for metabolic and hormonal support."
        },
        de: {
          probleme_traditionnel: "Schleimstoffe (Darmberuhigungsmittel) erfordern lauwarmes Wasser, während Steroidsaponine (Regulatoren) ein organisches Lösungsmittel und mäßige Hitze erfordern.",
          resultat: "Eine vollständige natürliche anabole Extraktion zur Unterstützung von Stoffwechsel und Hormonen."
        }
      }
    },
    recette_pas_a_pas: {
        batch_standard: "Cible BloomLab : 750ml de solvant + 75g de plantes (Rendement final estimé : ~600-650ml)",
        ingredients: {
          phase_A: [
            "50g de Graines de Fenugrec (légèrement concassées)",
            "350ml d'Eau distillée",
            "150ml de Glycérine végétale"
          ],
          phase_B: [
            "25g de Graines de Fenugrec (poudre)",
            "250ml d'Alcool bio 96°"
          ]
        },
        preparation: [
          "Concassez légèrement les 50g de graines pour la Phase A (évitez la poudre fine pour ne pas géifier l'eau).",
          "Mixez les 25g restants en poudre pour la Phase B."
        ],
        phase_A_instructions: [
          "Versez eau et glycérine. Ajoutez les 50g de graines concassées.",
          "Fermez, mode manuel 'OIL', TEMP 65°C, TEMPS 2h00. START."
        ],
        transition: [
          "1. Éteignez. Laissez reposer 20 minutes.",
          "2. TEST SENSORIEL OBLIGATOIRE : Posez votre main sur la paroi extérieure de la cuve. Elle doit être 'tiède au toucher' (environ 40°C), et non brûlante.",
          "3. ⚠️ SÉCURITÉ : N'ajoutez l'alcool que lorsque ce test est validé."
        ],
        phase_B_instructions: [
          "Ajoutez l'alcool et les 25g de poudre.",
          "Fermez, mode manuel 'OIL', TEMP 50°C, TEMPS 3h00. START."
        ],
        filtration_et_finition: [
          "Filtrez à l'étamine. Le mélange sera légèrement visqueux (mucilages). Pressez fermement.",
          "Mettez en flacon ambré."
        ]
      },
    socle_synergique: {
      cofacteurs_complements: [
        { 
          nom: "Zinc", 
          dose: "15mg/jour", 
          role: "Cofacteur essentiel de la synthèse des hormones stéroïdiennes et de la kératine.",
          translations: {
            en: { nom: "Zinc", dose: "15mg/day", role: "Essential cofactor for the synthesis of steroid hormones and keratin." },
            de: { nom: "Zink", dose: "15mg/Tag", role: "Essenzieller Cofaktor der Synthese von Steroidhormonen und Keratin." }
          }
        },
        { 
          nom: "Vitamines B", 
          dose: "Complexe B", 
          role: "Soutien du métabolisme des glucides potentialisé par le fenugrec.",
          translations: {
            en: { nom: "B Vitamins", dose: "B Complex", role: "Support of carbohydrate metabolism enhanced by fenugreek." },
            de: { nom: "B-Vitamine", dose: "B-Komplex", role: "Unterstützung des durch Bockshornklee verstärkten Kohlenhydratstoffwechsels." }
          }
        }
      ],
      leviers_du_vivant: [
        { 
          nom: "Réduction des sucres rapides", 
          frequence: "Quotidienne", 
          role: "Le fenugrec régule la glycémie, mais l'hygiène alimentaire reste le pilier de l'équilibre insulinique.",
          translations: {
            en: { nom: "Reduction of fast sugars", frequence: "Daily", role: "Fenugreek regulates blood sugar, but dietary hygiene remains the pillar of insulin balance." },
            de: { nom: "Reduzierung schneller Zucker", frequence: "Täglich", role: "Bockshornklee reguliert den Blutzucker, aber die Ernährungshygiene bleibt die Säule des Insulin-Gleichgewichts." }
          }
        }
      ]
    },
    convergence_ancestrale: "Utilisé en Égypte ancienne et en Ayurveda pour la vitalité, la digestion et la santé reproductive.",
    synergies_recommandees: ["urtica_dioica", "panax_ginseng", "cinnamomum_verum"],
    precautions: "Déconseillé en cas de diabète sous traitement (risque d'hypoglycémie) et pendant la grossesse (effet utérotonique à haute dose).",
    translations: {
      en: {
        nom_commun: "Fenugreek",
        partie_utilisee: "Dried seeds",
        preuve_scientifique: "Blood sugar modulation (stimulation of insulin secretion), galactogenic action, and contribution of natural hormonal precursors supporting hair density and vitality.",
        convergence_ancestrale: "Used in Ancient Egypt and Ayurveda for vitality, digestion, and reproductive health.",
        precautions: "Not recommended in case of diabetes under treatment (risk of hypoglycemia) and during pregnancy (uterotonic effect at high doses)."
      },
      de: {
        nom_commun: "Bockshornklee",
        partie_utilisee: "Getrocknete Samen",
        preuve_scientifique: "Blutzuckermodulation (Stimulation der Insulinsekretion), galaktogene Wirkung und Beitrag natürlicher Hormonvorstufen zur Unterstützung der Haardichte und Vitalität.",
        convergence_ancestrale: "Im alten Ägypten und im Ayurveda für Vitalität, Verdauung und reproduktive Gesundheit verwendet.",
        precautions: "Bei Diabetes unter Behandlung nicht empfohlen (Hypoglykämierisiko) und während der Schwangerschaft nicht empfohlen (uterotonische Wirkung bei hohen Dosen)."
      }
    }
  },
  {
    plant_id: "plantago_major",
    nom_commun: "Plantain majeur",
    nom_latin: "Plantago major",
    partie_utilisee: "Feuilles séchées",
    famille_bloom: "Réparateur (Muqueuses & Peau)",
    terrains_cibles: [
        "T1_Intestin",
        "T9_Peau_Phaneres",
        "T3_Immunité"
      ],
    actifs_cles: [
      { nom: "Mucilages", polarite: "Hydrosoluble", translations: { en: { nom: "Mucilages", polarite: "Water-soluble" }, de: { nom: "Schleimstoffe", polarite: "Wasserlöslich" } } },
      { nom: "Iridoïdes (Aucuboside)", polarite: "Hydrosoluble", translations: { en: { nom: "Iridoids (Aucuboside)", polarite: "Water-soluble" }, de: { nom: "Iridoide (Aucubosid)", polarite: "Wasserlöslich" } } },
      { nom: "Tanins", polarite: "Hydrosoluble", translations: { en: { nom: "Tannins", polarite: "Water-soluble" }, de: { nom: "Tannine", polarite: "Wasserlöslich" } } }
    ],
    preuve_scientifique: "Action émolliente, anti-inflammatoire et cicatrisante sur les muqueuses (intestinales, respiratoires) et la peau. Réduction de la perméabilité intestinale.",
    pourquoi_bloomlab: {
      probleme_traditionnel: "Les mucilages sont très sensibles à la chaleur excessive (qui les dégrade en sucres simples) et aux solvants organiques forts.",
      phase_A: { temp: "60°C", temps: "1h30", solvant: "Eau distillée + Glycérine (70/30)", cible: "Mucilages, iridoïdes, tanins", translations: { en: { cible: "Mucilages, iridoids, tannins" }, de: { cible: "Schleimstoffe, Iridoide, Tannine" } } },
      phase_B: { temp: "45°C", temps: "2h00", solvant: "Alcool bio 70°", cible: "Stabilisation et extraction douce des composés secondaires", translations: { en: { cible: "Stabilization and gentle extraction of secondary compounds" }, de: { cible: "Stabilisierung und sanfte Extraktion von Sekundärverbindungen" } } },
      resultat: "Une extraction douce préservant l'intégrité des mucilages pour une réparation profonde des muqueuses.",
      translations: {
        en: {
          probleme_traditionnel: "Mucilages are very sensitive to excessive heat (which degrades them into simple sugars) and strong organic solvents.",
          resultat: "A gentle extraction preserving the integrity of mucilages for deep mucosal repair."
        },
        de: {
          probleme_traditionnel: "Schleimstoffe sind sehr empfindlich gegenüber übermäßiger Hitze (die sie in einfache Zucker abbaut) und starken organischen Lösungsmitteln.",
          resultat: "Eine sanfte Extraktion, die die Integrität der Schleimstoffe für eine tiefe Schleimhautregeneration bewahrt."
        }
      }
    },
    recette_pas_a_pas: {
        batch_standard: "Cible BloomLab : 750ml de solvant + 75g de plantes (Rendement final estimé : ~600-650ml)",
        ingredients: {
          phase_A: [
            "50g de Feuilles de Plantain",
            "350ml d'Eau distillée",
            "150ml de Glycérine végétale"
          ],
          phase_B: [
            "25g de Feuilles de Plantain",
            "250ml d'Alcool bio 70°"
          ]
        },
        preparation: [
          "Les feuilles sont volumineuses. Tassez les 50g dans la cuve.",
          "Mixez les 25g restants pour la Phase B."
        ],
        phase_A_instructions: [
          "Versez eau et glycérine. Ajoutez les 50g de feuilles tassées.",
          "Fermez, mode manuel 'OIL', TEMP 60°C, TEMPS 1h30. START."
        ],
        transition: [
          "1. Éteignez. Laissez reposer 20 minutes.",
          "2. TEST SENSORIEL OBLIGATOIRE : Posez votre main sur la paroi extérieure de la cuve. Elle doit être 'tiède au toucher' (environ 40°C), et non brûlante.",
          "3. ⚠️ SÉCURITÉ : N'ajoutez l'alcool que lorsque ce test est validé."
        ],
        phase_B_instructions: [
          "Ajoutez l'alcool et les 25g de feuilles mixées.",
          "Fermez, mode manuel 'OIL', TEMP 45°C, TEMPS 2h00. START."
        ],
        filtration_et_finition: [
          "Filtrez à l'étamine. Pressez doucement pour éviter de troubler l'extrait avec trop de particules.",
          "Mettez en flacon ambré."
        ]
      },
    socle_synergique: {
      cofacteurs_complements: [
        { 
          nom: "L-Glutamine", 
          dose: "5g le matin", 
          role: "Synergie parfaite avec les mucilages pour sceller les jonctions serrées de l'intestin.",
          translations: {
            en: { nom: "L-Glutamine", dose: "5g in the morning", role: "Perfect synergy with mucilages to seal the tight junctions of the intestine." },
            de: { nom: "L-Glutamin", dose: "5g am Morgen", role: "Perfekte Synergie mit Schleimstoffen zur Versiegelung der Tight Junctions des Darms." }
          }
        },
        { 
          nom: "Zinc Carnosine", 
          dose: "75mg 2x/jour", 
          role: "Réparation ciblée de la muqueuse gastrique et intestinale.",
          translations: {
            en: { nom: "Zinc Carnosine", dose: "75mg 2x/day", role: "Targeted repair of the gastric and intestinal mucosa." },
            de: { nom: "Zink-Carnosin", dose: "75mg 2x/Tag", role: "Gezielte Reparatur der Magen- und Darmschleimhaut." }
          }
        }
      ],
      leviers_du_vivant: [
        { 
          nom: "Mastication extrême", 
          frequence: "40 fois par bouchée", 
          role: "Prédigère les aliments, réduisant la charge de travail et l'irritation pour un intestin déjà inflammé.",
          translations: {
            en: { nom: "Extreme mastication", frequence: "40 times per bite", role: "Predigests food, reducing workload and irritation for an already inflamed intestine." },
            de: { nom: "Extremes Kauen", frequence: "40 Mal pro Bissen", role: "Verdaut die Nahrung vor, reduziert die Arbeitsbelastung und Irritation für einen bereits entzündeten Darm." }
          }
        }
      ]
    },
    convergence_ancestrale: "Considéré comme la 'trace de pas du blanc' par les Amérindiens, utilisé universellement pour cicatriser les plaies et apaiser les inflammations.",
    synergies_recommandees: ["aloe_vera", "calendula_officinalis", "glycyrrhiza_glabra"],
    precautions: "Aucune contre-indication majeure. Peut ralentir légèrement l'absorption d'autres médicaments pris simultanément (prendre à distance).",
    translations: {
      en: {
        nom_commun: "Greater Plantain",
        partie_utilisee: "Dried leaves",
        preuve_scientifique: "Emollient, anti-inflammatory and healing action on the mucous membranes (intestinal, respiratory) and the skin. Reduction of intestinal permeability.",
        convergence_ancestrale: "Considered as the 'white man's footprint' by Native Americans, used universally to heal wounds and soothe inflammation.",
        precautions: "No major contraindications. May slightly slow the absorption of other medications taken simultaneously (take at a distance)."
      },
      de: {
        nom_commun: "Breitwegerich",
        partie_utilisee: "Getrocknete Blätter",
        preuve_scientifique: "Erweichende, entzündungshemmende und heilende Wirkung auf die Schleimhäute (Darm, Atemwege) und die Haut. Verringerung der Darmpermeabilität.",
        convergence_ancestrale: "Von den amerikanischen Ureinwohnern als 'Fußabdruck des weißen Mannes' betrachtet, universell zur Heilung von Wunden und zur Linderung von Entzündungen verwendet.",
        precautions: "Keine größeren Kontraindikationen. Kann die Aufnahme anderer gleichzeitig eingenommener Medikamente leicht verlangsamen (mit Abstand einnehmen)."
      }
    }
  },
  {
    plant_id: "reynoutria_japonica",
    nom_commun: "Renouée du Japon (Racine)",
    nom_latin: "Reynoutria japonica (Polygonum cuspidatum)",
    partie_utilisee: "Racine et rhizome séchés",
    famille_bloom: "Gâchette (Anti-inflammatoire & Antioxydant)",
    terrains_cibles: [
        "T8_Inflammation",
        "T5_Mitochondrie",
        "T2_Foie"
      ],
    actifs_cles: [
      { nom: "Resvératrol", polarite: "Liposoluble", translations: { en: { nom: "Resveratrol", polarite: "Fat-soluble" }, de: { nom: "Resveratrol", polarite: "Fettlöslich" } } },
      { nom: "Émodine", polarite: "Liposoluble", translations: { en: { nom: "Emodin", polarite: "Fat-soluble" }, de: { nom: "Emodin", polarite: "Fettlöslich" } } },
      { nom: "Polyphénols", polarite: "Hydrosoluble", translations: { en: { nom: "Polyphenols", polarite: "Water-soluble" }, de: { nom: "Polyphenole", polarite: "Wasserlöslich" } } }
    ],
    preuve_scientifique: "Inhibition puissante du NLRP3 inflammasome, protection mitochondriale, et action hépatoprotectrice. C'est l'une des sources naturelles les plus concentrées en resvératrol.",
    pourquoi_bloomlab: {
      probleme_traditionnel: "La racine est très dure et lignifiée. Le resvératrol est strictement liposoluble et sensible à l'oxydation.",
      phase_A: { temp: "75°C", temps: "2h30", solvant: "Eau distillée + Glycérine (70/30)", cible: "Polyphénols hydrosolubles", translations: { en: { cible: "Water-soluble polyphenols" }, de: { cible: "Wasserlösliche Polyphenole" } } },
      phase_B: { temp: "50°C", temps: "3h00", solvant: "Alcool bio 96°", cible: "Resvératrol, émodine", translations: { en: { cible: "Resveratrol, emodin" }, de: { cible: "Resveratrol, Emodin" } } },
      resultat: "Une extraction de resvératrol hautement biodisponible pour un soutien systémique anti-inflammatoire.",
      translations: {
        en: {
          probleme_traditionnel: "The root is very hard and lignified. Resveratrol is strictly fat-soluble and sensitive to oxidation.",
          resultat: "A highly bioavailable resveratrol extraction for systemic anti-inflammatory support."
        },
        de: {
          probleme_traditionnel: "Die Wurzel ist sehr hart und verholzt. Resveratrol ist streng fettlöslich und oxidationsempfindlich.",
          resultat: "Eine hoch bioverfügbare Resveratrol-Extraktion zur systemischen entzündungshemmenden Unterstützung."
        }
      }
    },
    recette_pas_a_pas: {
        batch_standard: "Cible BloomLab : 750ml de solvant + 75g de plantes (Rendement final estimé : ~600-650ml)",
        ingredients: {
          phase_A: [
            "50g de Racine de Renouée (copeaux)",
            "350ml d'Eau distillée",
            "150ml de Glycérine végétale"
          ],
          phase_B: [
            "25g de Racine de Renouée (poudre)",
            "250ml d'Alcool bio 96°"
          ]
        },
        preparation: [
          "Concassez vigoureusement les 50g de racine pour la Phase A.",
          "Mixez les 25g restants en poudre fine pour la Phase B."
        ],
        phase_A_instructions: [
          "Versez eau et glycérine. Ajoutez les 50g de copeaux.",
          "Fermez, mode manuel 'OIL', TEMP 75°C, TEMPS 2h30. START."
        ],
        transition: [
          "1. Éteignez. Laissez reposer 25 minutes (la racine dense retient la chaleur).",
          "2. TEST SENSORIEL OBLIGATOIRE : Posez votre main sur la paroi extérieure de la cuve. Elle doit être 'tiède au toucher' (environ 40°C), et non brûlante.",
          "3. ⚠️ SÉCURITÉ : N'ajoutez l'alcool que lorsque ce test est validé."
        ],
        phase_B_instructions: [
          "Ajoutez l'alcool et les 25g de poudre.",
          "Fermez, mode manuel 'OIL', TEMP 50°C, TEMPS 3h00. START."
        ],
        filtration_et_finition: [
          "Filtrez à l'étamine. Pressez fermement le marc de racine.",
          "Le liquide sera brun-rouge. Mettez en flacon ambré."
        ]
      },
    socle_synergique: {
      cofacteurs_complements: [
        { 
          nom: "Pipérine (Poivre noir)", 
          dose: "5-10mg", 
          role: "Augmente la biodisponibilité du resvératrol de plus de 2000%.",
          translations: {
            en: { nom: "Piperine (Black pepper)", dose: "5-10mg", role: "Increases resveratrol bioavailability by over 2000%." },
            de: { nom: "Piperin (Schwarzer Pfeffer)", dose: "5-10mg", role: "Erhöht die Bioverfügbarkeit von Resveratrol um mehr als 2000 %." }
          }
        },
        { 
          nom: "NAC", 
          dose: "600mg/jour", 
          role: "Synergie antioxydante pour protéger les mitochondries avec le resvératrol.",
          translations: {
            en: { nom: "NAC", dose: "600mg/day", role: "Antioxidant synergy to protect mitochondria with resveratrol." },
            de: { nom: "NAC", dose: "600mg/Tag", role: "Antioxidative Synergie zum Schutz der Mitochondrien mit Resveratrol." }
          }
        }
      ],
      leviers_du_vivant: [
        { 
          nom: "Jeûne intermittent", 
          frequence: "14-16h de nuit", 
          role: "Active la sirtuine 1 (SIRT1), la même voie de longévité que cible le resvératrol.",
          translations: {
            en: { nom: "Intermittent fasting", frequence: "14-16h at night", role: "Activates sirtuin 1 (SIRT1), the same longevity pathway targeted by resveratrol." },
            de: { nom: "Intermittierendes Fasten", frequence: "14-16 Std. nachts", role: "Aktiviert Sirtuin 1 (SIRT1), den gleichen Langlebigkeitspfad, den Resveratrol anspricht." }
          }
        }
      ]
    },
    convergence_ancestrale: "Utilisée en MTC (Hu Zhang) pour 'invigorer le sang, disperser les stases et clarifier la chaleur'.",
    synergies_recommandees: ["curcuma_longa", "vitis_vinifera", "boswellia_serrata"],
    precautions: "Peut avoir un effet laxatif à haute dose (présence d'émodine). Déconseillé en cas de grossesse ou de traitement anticoagulant.",
    translations: {
      en: {
        nom_commun: "Japanese Knotweed",
        partie_utilisee: "Dried root and rhizome",
        preuve_scientifique: "Powerful inhibition of the NLRP3 inflammasome, mitochondrial protection, and hepatoprotective action. It is one of the most concentrated natural sources of resveratrol.",
        convergence_ancestrale: "Used in TCM (Hu Zhang) to 'invigorate the blood, disperse stasis and clear heat'.",
        precautions: "May have a laxative effect at high doses (presence of emodin). Not recommended during pregnancy or in case of anticoagulant treatment."
      },
      de: {
        nom_commun: "Japanischer Staudenknöterich",
        partie_utilisee: "Getrocknete Wurzel und Rhizom",
        preuve_scientifique: "Starke Hemmung des NLRP3-Inflammasoms, Mitochondrienschutz und hepatoprotektive Wirkung. Es ist eine der am stärksten konzentrierten natürlichen Quellen für Resveratrol.",
        convergence_ancestrale: "In der TCM (Hu Zhang) verwendet, um das 'Blut zu beleben, Stasen zu zerstreuen und Hitze zu klären'.",
        precautions: "Kann bei hohen Dosen abführend wirken (Vorhandensein von Emodin). Während der Schwangerschaft oder bei gerinnungshemmender Behandlung nicht empfohlen."
      }
    }
  },
  {
    plant_id: "picrasma_quassioides",
    nom_commun: "Quassia amer",
    nom_latin: "Picrasma quassioides (Quassia amara)",
    partie_utilisee: "Bois séché",
    famille_bloom: "Déclencheur (Amère & Antiparasitaire)",
    terrains_cibles: [
        "T1_Intestin",
        "T2_Foie",
        "T3_Immunité"
      ],
    actifs_cles: [
      { nom: "Quassinoïdes", polarite: "Hydrosoluble/Liposoluble", translations: { en: { nom: "Quassinoids", polarite: "Water/Fat-soluble" }, de: { nom: "Quassinoide", polarite: "Wasser/Fettlöslich" } } },
      { nom: "Tanins", polarite: "Hydrosoluble", translations: { en: { nom: "Tannins", polarite: "Water-soluble" }, de: { nom: "Tannine", polarite: "Wasserlöslich" } } }
    ],
    preuve_scientifique: "L'une des substances les plus amères connues. Stimule fortement la sécrétion de bile et de sucs gastriques. Action antiparasitaire et antifongique (Candida) douce mais efficace.",
    pourquoi_bloomlab: {
      probleme_traditionnel: "Le bois est très dur. Les quassinoïdes nécessitent une extraction séquentielle pour être pleinement capturés sans sur-extraction des tanins astringents.",
      phase_A: { temp: "70°C", temps: "2h00", solvant: "Eau distillée + Glycérine (70/30)", cible: "Quassinoïdes hydrosolubles, tanins", translations: { en: { cible: "Water-soluble quassinoids, tannins" }, de: { cible: "Wasserlösliche Quassinoide, Tannine" } } },
      phase_B: { temp: "50°C", temps: "3h00", solvant: "Alcool bio 96°", cible: "Quassinoïdes liposolubles", translations: { en: { cible: "Fat-soluble quassinoids" }, de: { cible: "Fettlösliche Quassinoide" } } },
      resultat: "Une extraction amère ultra-puissante pour relancer la digestion et assainir l'écosystème intestinal.",
      translations: {
        en: {
          probleme_traditionnel: "The wood is very hard. Quassinoids require sequential extraction to be fully captured without over-extraction of astringent tannins.",
          resultat: "An ultra-powerful bitter extraction to jumpstart digestion and cleanse the intestinal ecosystem."
        },
        de: {
          probleme_traditionnel: "Das Holz ist sehr hart. Quassinoide erfordern eine sequentielle Extraktion, um ohne Überextraktion von astringierenden Tanninen vollständig erfasst zu werden.",
          resultat: "Eine ultra-starke bittere Extraktion, um die Verdauung anzukurbeln und das Darm-Ökosystem zu reinigen."
        }
      }
    },
    recette_pas_a_pas: {
        batch_standard: "Cible BloomLab : 750ml de solvant + 75g de plantes (Rendement final estimé : ~600-650ml)",
        ingredients: {
          phase_A: [
            "50g de Copeaux de Quassia",
            "350ml d'Eau distillée",
            "150ml de Glycérine végétale"
          ],
          phase_B: [
            "25g de Quassia (poudre)",
            "250ml d'Alcool bio 96°"
          ]
        },
        preparation: [
          "Utilisez des copeaux fins pour la Phase A.",
          "Mixez les 25g restants en poudre pour la Phase B."
        ],
        phase_A_instructions: [
          "Versez eau et glycérine. Ajoutez les 50g de copeaux.",
          "Fermez, mode manuel 'OIL', TEMP 70°C, TEMPS 2h00. START."
        ],
        transition: [
          "1. Éteignez. Laissez reposer 20 minutes.",
          "2. TEST SENSORIEL OBLIGATOIRE : Posez votre main sur la paroi extérieure de la cuve. Elle doit être 'tiède au toucher' (environ 40°C), et non brûlante.",
          "3. ⚠️ SÉCURITÉ : N'ajoutez l'alcool que lorsque ce test est validé."
        ],
        phase_B_instructions: [
          "Ajoutez l'alcool et les 25g de poudre.",
          "Fermez, mode manuel 'OIL', TEMP 50°C, TEMPS 3h00. START."
        ],
        filtration_et_finition: [
          "Filtrez à l'étamine. Pressez fermement.",
          "Le liquide sera jaune pâle, d'une amertume extrême. Mettez en flacon ambré."
        ]
      },
    socle_synergique: {
      cofacteurs_complements: [
        { 
          nom: "Probiotiques (S. Boulardii)", 
          dose: "Après la cure", 
          role: "Le Quassia nettoie le terrain des levures, les probiotiques reconstruisent la flore ensuite.",
          translations: {
            en: { nom: "Probiotics (S. Boulardii)", dose: "After the course", role: "Quassia cleanses the environment of yeasts, probiotics rebuild the flora afterwards." },
            de: { nom: "Probiotika (S. Boulardii)", dose: "Nach der Kur", role: "Quassia reinigt das Milieu von Hefen, Probiotika bauen danach die Flora wieder auf." }
          }
        },
        { 
          nom: "Zinc", 
          dose: "15mg/jour", 
          role: "Restaure le sens du goût, souvent altéré par les régimes ou les carences, permettant de mieux tolérer l'amertume.",
          translations: {
            en: { nom: "Zinc", dose: "15mg/day", role: "Restores the sense of taste, often altered by diets or deficiencies, allowing better tolerance of bitterness." },
            de: { nom: "Zink", dose: "15mg/Tag", role: "Stellt den Geschmackssinn wieder her, der oft durch Diäten oder Mangelerscheinungen beeinträchtigt ist, und ermöglicht eine bessere Toleranz gegenüber Bitterkeit." }
          }
        }
      ],
      leviers_du_vivant: [
        { 
          nom: "Éviction totale des sucres raffinés", 
          frequence: "Pendant la cure", 
          role: "Affame les candidas et parasites que le Quassia aide à éliminer.",
          translations: {
            en: { nom: "Total eviction of refined sugars", frequence: "During the course", role: "Starves the Candida and parasites that Quassia helps to eliminate." },
            de: { nom: "Vollständiger Verzicht auf raffinierten Zucker", frequence: "Während der Kur", role: "Hungert die Candida und Parasiten aus, die Quassia zu eliminieren hilft." }
          }
        }
      ]
    },
    convergence_ancestrale: "Utilisé en Amérique du Sud et en Afrique de l'Ouest comme tonique amer et vermifuge naturel.",
    synergies_recommandees: ["gentiana_lutea", "origanum_vulgare", "nigella_sativa"],
    precautions: "Amertume extrême : commencer par de très petites doses. Déconseillé en cas d'ulcère gastrique ou de calculs biliaires.",
    translations: {
      en: {
        nom_commun: "Quassia",
        partie_utilisee: "Dried wood",
        preuve_scientifique: "One of the most bitter substances known. Strongly stimulates the secretion of bile and gastric juices. Gentle but effective antiparasitic and antifungal (Candida) action.",
        convergence_ancestrale: "Used in South America and West Africa as a bitter tonic and natural vermifuge.",
        precautions: "Extreme bitterness: start with very small doses. Not recommended in case of gastric ulcer or gallstones."
      },
      de: {
        nom_commun: "Bitterholz (Quassia)",
        partie_utilisee: "Getrocknetes Holz",
        preuve_scientifique: "Eine der am stärksten bitteren bekannten Substanzen. Stimuliert stark die Sekretion von Galle und Magensaft. Sanfte, aber wirksame antiparasitäre und antimykotische (Candida) Wirkung.",
        convergence_ancestrale: "In Südamerika und Westafrika als bitteres Tonikum und natürliches Wurmmittel verwendet.",
        precautions: "Extreme Bitterkeit: mit sehr kleinen Dosen beginnen. Bei Magengeschwüren oder Gallensteinen nicht empfohlen."
      }
    }
  },
  {
    plant_id: "euphrasia_officinalis",
    nom_commun: "Euphraise",
    nom_latin: "Euphrasia officinalis",
    partie_utilisee: "Parties aériennes séchées",
    famille_bloom: "Réparateur (Muqueuses & Immunité)",
    terrains_cibles: [
        "T3_Immunité",
        "T9_Peau_Phaneres",
        "T1_Intestin"
      ],
    actifs_cles: [
      { nom: "Iridoïdes (Euphrosine)", polarite: "Hydrosoluble", translations: { en: { nom: "Iridoids (Euphrosine)", polarite: "Water-soluble" }, de: { nom: "Iridoide (Euphrosin)", polarite: "Wasserlöslich" } } },
      { nom: "Tanins", polarite: "Hydrosoluble", translations: { en: { nom: "Tannins", polarite: "Water-soluble" }, de: { nom: "Tannine", polarite: "Wasserlöslich" } } },
      { nom: "Flavonoïdes", polarite: "Hydrosoluble", translations: { en: { nom: "Flavonoids", polarite: "Water-soluble" }, de: { nom: "Flavonoide", polarite: "Wasserlöslich" } } }
    ],
    preuve_scientifique: "Action astringente, anti-inflammatoire et décongestionnante spécifique des muqueuses (oculaires, respiratoires, intestinales).",
    pourquoi_bloomlab: {
      probleme_traditionnel: "Les iridoïdes sont sensibles à la chaleur prolongée. Une extraction douce et séquencée préserve leur activité sur les muqueuses.",
      phase_A: { temp: "65°C", temps: "1h30", solvant: "Eau distillée + Glycérine (70/30)", cible: "Iridoïdes, tanins, flavonoïdes", translations: { en: { cible: "Iridoids, tannins, flavonoids" }, de: { cible: "Iridoide, Tannine, Flavonoide" } } },
      phase_B: { temp: "45°C", temps: "2h00", solvant: "Alcool bio 70°", cible: "Stabilisation des composés", translations: { en: { cible: "Stabilization of compounds" }, de: { cible: "Stabilisierung der Verbindungen" } } },
      resultat: "Une extraction douce et complète pour une décongestion profonde des muqueuses irritées.",
      translations: {
        en: {
          probleme_traditionnel: "Iridoids are sensitive to prolonged heat. A gentle and sequenced extraction preserves their activity on the mucous membranes.",
          resultat: "A gentle and complete extraction for deep decongestion of irritated mucous membranes."
        },
        de: {
          probleme_traditionnel: "Iridoide sind empfindlich gegenüber längerer Hitze. Eine sanfte und sequenzierte Extraktion bewahrt ihre Aktivität auf den Schleimhäuten.",
          resultat: "Eine sanfte und vollständige Extraktion zur tiefen Abschwellung irritierter Schleimhäute."
        }
      }
    },
    recette_pas_a_pas: {
        batch_standard: "Cible BloomLab : 750ml de solvant + 75g de plantes (Rendement final estimé : ~600-650ml)",
        ingredients: {
          phase_A: [
            "50g d'Euphraise séchée",
            "350ml d'Eau distillée",
            "150ml de Glycérine végétale"
          ],
          phase_B: [
            "25g d'Euphraise séchée",
            "250ml d'Alcool bio 70°"
          ]
        },
        preparation: [
          "La plante est très légère. Tassez les 50g dans la cuve.",
          "Mixez les 25g restants pour la Phase B."
        ],
        phase_A_instructions: [
          "Versez eau et glycérine. Ajoutez les 50g de plante tassée.",
          "Fermez, mode manuel 'OIL', TEMP 65°C, TEMPS 1h30. START."
        ],
        transition: [
          "1. Éteignez. Laissez reposer 20 minutes.",
          "2. TEST SENSORIEL OBLIGATOIRE : Posez votre main sur la paroi extérieure de la cuve. Elle doit être 'tiède au toucher' (environ 40°C), et non brûlante.",
          "3. ⚠️ SÉCURITÉ : N'ajoutez l'alcool que lorsque ce test est validé."
        ],
        phase_B_instructions: [
          "Ajoutez l'alcool et les 25g de plante mixée.",
          "Fermez, mode manuel 'OIL', TEMP 45°C, TEMPS 2h00. START."
        ],
        filtration_et_finition: [
          "Filtrez à l'étamine fine. Pressez le marc.",
          "Le liquide sera brun-vert. Mettez en flacon ambré."
        ]
      },
    socle_synergique: {
      cofacteurs_complements: [
        { 
          nom: "Vitamine A", 
          dose: "Selon besoins", 
          role: "Indispensable à l'intégrité de toutes les muqueuses (yeux, intestin, poumons).",
          translations: {
            en: { nom: "Vitamin A", dose: "According to needs", role: "Indispensable for the integrity of all mucous membranes (eyes, intestine, lungs)." },
            de: { nom: "Vitamin A", dose: "Nach Bedarf", role: "Unverzichtbar für die Integrität aller Schleimhäute (Augen, Darm, Lunge)." }
          }
        },
        { 
          nom: "Quercétine", 
          dose: "500mg/jour", 
          role: "Stabilise mastocytes, réduisant l'inflammation allergique des muqueuses.",
          translations: {
            en: { nom: "Quercetin", dose: "500mg/day", role: "Stabilizes mast cells, reducing allergic inflammation of the mucous membranes." },
            de: { nom: "Quercetin", dose: "500mg/Tag", role: "Stabilisiert Mastzellen und reduziert allergische Entzündungen der Schleimhäute." }
          }
        }
      ],
      leviers_du_vivant: [
        { 
          nom: "Hydratation des muqueuses", 
          frequence: "Quotidienne", 
          role: "Boire de l'eau régulièrement maintient la couche de mucus protectrice que l'euphraise aide à réparer.",
          translations: {
            en: { nom: "Mucosal hydration", frequence: "Daily", role: "Drinking water regularly maintains the protective mucus layer that eyebright helps to repair." },
            de: { nom: "Schleimhauthydratation", frequence: "Täglich", role: "Regelmäßiges Wassertrinken erhält die schützende Schleimschicht aufrecht, die Augentrost bei der Regeneration unterstützt." }
          }
        }
      ]
    },
    convergence_ancestrale: "Nommée 'l'herbe aux yeux' depuis le Moyen Âge, utilisée par Hildegarde de Bingen pour les affections oculaires et respiratoires.",
    synergies_recommandees: ["plantago_major", "calendula_officinalis", "echinacea_purpurea"],
    precautions: "Aucune contre-indication majeure connue. Peut causer une légère constipation à très haute dose (effet astringent des tanins).",
    translations: {
      en: {
        nom_commun: "Eyebright",
        partie_utilisee: "Dried aerial parts",
        preuve_scientifique: "Astringent, anti-inflammatory and decongestant action specific to the mucous membranes (ocular, respiratory, intestinal).",
        convergence_ancestrale: "'Break-glasses' plant. Used for centuries to clear vision and soothe 'hot' inflammations of the mucous membranes.",
        precautions: "Generally safe. Use with caution in case of very dry mucous membranes."
      },
      de: {
        nom_commun: "Augentrost",
        partie_utilisee: "Getrocknete oberirdische Teile",
        preuve_scientifique: "Adstringierende, entzündungshemmende und abschwellende Wirkung spezifisch für die Schleimhäute (Augen, Atemwege, Darm).",
        convergence_ancestrale: "'Augentrost'-Pflanze. Seit Jahrhunderten verwendet, um die Sicht zu klären und 'heiße' Entzündungen der Schleimhäute zu lindern.",
        precautions: "Allgemein sicher. Bei sehr trockenen Schleimhäuten mit Vorsicht anwenden."
      }
    }
  },
  {
    plant_id: "vaccinium_myrtillus",
    nom_commun: "Myrtille",
    nom_latin: "Vaccinium myrtillus",
    partie_utilisee: "Fruits séchés (ou feuilles pour usage spécifique)",
    famille_bloom: "Réparateur (Microcirculation & Collagène)",
    terrains_cibles: [
        "T5_Mitochondrie",
        "T9_Peau_Phaneres",
        "T7_Psycho_emotionnel"
      ],
    actifs_cles: [
      { nom: "Anthocyanes", polarite: "Hydrosoluble/Thermolabile", translations: { en: { nom: "Anthocyanins", polarite: "Water-soluble/Heat-sensitive" }, de: { nom: "Anthocyane", polarite: "Wasserlöslich/Thermolabil" } } },
      { nom: "Myrtilline", polarite: "Hydrosoluble", translations: { en: { nom: "Myrtillin", polarite: "Water-soluble" }, de: { nom: "Myrtillin", polarite: "Wasserlöslich" } } },
      { nom: "Tanins", polarite: "Hydrosoluble", translations: { en: { nom: "Tannins", polarite: "Water-soluble" }, de: { nom: "Tannine", polarite: "Wasserlöslich" } } }
    ],
    preuve_scientifique: "Protection de la microcirculation (rétine, peau, cerveau), renforcement du collagène, et action antioxydante puissante.",
    pourquoi_bloomlab: {
      probleme_traditionnel: "Les anthocyanes sont extrêmement thermolabiles. Une cuisson >70°C les détruit presque entièrement, annulant le bénéfice microcirculatoire.",
      phase_A: { temp: "60°C", temps: "1h30", solvant: "Eau distillée + Glycérine (70/30)", cible: "Anthocyanes, myrtilline", translations: { en: { cible: "Anthocyanins, myrtillin" }, de: { cible: "Anthocyane, Myrtillin" } } },
      phase_B: { temp: "45°C", temps: "2h00", solvant: "Alcool bio 70°", cible: "Stabilisation des polyphénols", translations: { en: { cible: "Stabilization of polyphenols" }, de: { cible: "Stabilisierung der Polyphenole" } } },
      resultat: "Une extraction douce préservant l'intégrité des anthocyanes pour un soutien vasculaire et oculaire maximal.",
      translations: {
        en: {
          probleme_traditionnel: "Anthocyanins are extremely heat-sensitive. Cooking >70°C destroys them almost entirely, cancelling the microcirculatory benefit.",
          resultat: "A gentle extraction preserving the integrity of anthocyanins for maximum vascular and ocular support."
        },
        de: {
          probleme_traditionnel: "Anthocyane sind extrem thermolabil. Kochen >70°C zerstört sie fast vollständig und hebt den mikrozirkulatorischen Nutzen auf.",
          resultat: "Eine sanfte Extraktion, die die Integrität der Anthocyane bewahrt, für maximale vaskuläre und okuläre Unterstützung."
        }
      }
    },
    recette_pas_a_pas: {
        batch_standard: "Cible BloomLab : 750ml de solvant + 75g de plantes (Rendement final estimé : ~600-650ml)",
        ingredients: {
          phase_A: [
            "50g de Myrtilles séchées",
            "350ml d'Eau distillée",
            "150ml de Glycérine végétale"
          ],
          phase_B: [
            "25g de Myrtilles séchées",
            "250ml d'Alcool bio 70°"
          ]
        },
        preparation: [
          "Les fruits séchés sont collants. Séparez-les bien avant de les peser.",
          "Mixez légèrement les 25g de la Phase B."
        ],
        phase_A_instructions: [
          "Versez eau et glycérine. Ajoutez les 50g de myrtilles.",
          "Fermez, mode manuel 'OIL', TEMP 60°C, TEMPS 1h30. START."
        ],
        transition: [
          "1. Éteignez. Laissez reposer 20 minutes.",
          "2. TEST SENSORIEL OBLIGATOIRE : Posez votre main sur la paroi extérieure de la cuve. Elle doit être 'tiède au toucher' (environ 40°C), et non brûlante.",
          "3. ⚠️ SÉCURITÉ : N'ajoutez l'alcool que lorsque ce test est validé."
        ],
        phase_B_instructions: [
          "Ajoutez l'alcool et les 25g de myrtilles mixées.",
          "Fermez, mode manuel 'OIL', TEMP 45°C, TEMPS 2h00. START."
        ],
        filtration_et_finition: [
          "Filtrez à l'étamine. Pressez doucement.",
          "Le liquide sera rouge-violet profond. Mettez en flacon ambré ou violet (Miron)."
        ]
      },
    socle_synergique: {
      cofacteurs_complements: [
        { 
          nom: "Vitamine C", 
          dose: "500mg/jour", 
          role: "Synergie obligatoire : la vitamine C est le cofacteur de la synthèse du collagène que les anthocyanes protègent.",
          translations: {
            en: { nom: "Vitamin C", dose: "500mg/day", role: "Mandatory synergy: vitamin C is the cofactor for the synthesis of collagen that anthocyanins protect." },
            de: { nom: "Vitamin C", dose: "500mg/Tag", role: "Zwingende Synergie: Vitamin C ist der Cofaktor für die Synthese von Kollagen, das Anthocyane schützen." }
          }
        },
        { 
          nom: "Oméga-3", 
          dose: "1000mg/jour", 
          role: "Fluidifie les membranes des capillaires, améliorant l'effet de la myrtille.",
          translations: {
            en: { nom: "Omega-3", dose: "1000mg/day", role: "Fluids capillary membranes, improving the effect of bilberry." },
            de: { nom: "Omega-3", dose: "1000mg/Tag", role: "Verflüssigt Kapillarmembranen und verbessert die Wirkung der Heidelbeere." }
          }
        }
      ],
      leviers_du_vivant: [
        { 
          nom: "Protection solaire", 
          frequence: "Quotidienne", 
          role: "Les anthocyanes protègent la peau de l'intérieur, mais ne remplacent pas la protection physique contre les UV.",
          translations: {
            en: { nom: "Sun protection", frequence: "Daily", role: "Anthocyanins protect the skin from the inside, but do not replace physical UV protection." },
            de: { nom: "Sonnenschutz", frequence: "Täglich", role: "Anthocyane schützen die Haut von innen, ersetzen aber keinen physikalischen UV-Schutz." }
          }
        }
      ]
    },
    convergence_ancestrale: "Utilisée par les aviateurs de la RAF pendant la Seconde Guerre mondiale pour améliorer la vision nocturne.",
    synergies_recommandees: ["centella_asiatica", "ginkgo_biloba", "rosa_canina"],
    precautions: "Généralement sûre. Aucune contre-indication majeure.",
    translations: {
      en: {
        nom_commun: "Bilberry",
        partie_utilisee: "Dried fruits",
        preuve_scientifique: "Protection of the microcirculation (retina, skin, brain), strengthening of collagen, and powerful antioxidant action.",
        convergence_ancestrale: "Long-time used fruit for vision (World War II pilots) and for its action on the 'vessels'.",
        precautions: "Generally safe. No major contraindications."
      },
      de: {
        nom_commun: "Heidelbeere",
        partie_utilisee: "Getrocknete Früchte",
        preuve_scientifique: "Schutz der Mikrozirkulation (Netzhaut, Haut, Gehirn), Stärkung des Kollagens und starke antioxidative Wirkung.",
        convergence_ancestrale: "Lange Zeit verwendete Frucht für die Sehkraft (Piloten im Zweiten Weltkrieg) und für ihre Wirkung auf die 'Gefäße'.",
        precautions: "Allgemein sicher. Keine größeren Kontraindikationen."
      }
    }
  },
  {
    plant_id: "lepidium_meyenii",
    nom_commun: "Maca",
    nom_latin: "Lepidium meyenii",
    partie_utilisee: "Racine (hypocotyle) séchée",
    famille_bloom: "Chef d'Orchestre (Adaptogène Hormonal)",
    terrains_cibles: [
        "T4_HPA",
        "T10_Hormonal",
        "T5_Mitochondrie"
      ],
    actifs_cles: [
      { nom: "Macamides et Macaènes", polarite: "Liposoluble", translations: { en: { nom: "Macamides and Macaenes", polarite: "Fat-soluble" }, de: { nom: "Macamide und Macaene", polarite: "Fettlöslich" } } },
      { nom: "Glucosinolates", polarite: "Hydrosoluble", translations: { en: { nom: "Glucosinolates", polarite: "Water-soluble" }, de: { nom: "Glucosinolate", polarite: "Wasserlöslich" } } },
      { nom: "Polysaccharides", polarite: "Hydrosoluble", translations: { en: { nom: "Polysaccharides", polarite: "Water-soluble" }, de: { nom: "Polysaccharide", polarite: "Wasserlöslich" } } }
    ],
    preuve_scientifique: "Modulation de l'axe HPA sans contenir d'hormones exogènes. Amélioration de la libido, de l'énergie et de l'humeur via l'équilibre des neurotransmetteurs.",
    pourquoi_bloomlab: {
      probleme_traditionnel: "La racine de maca est très dense. Les macamides (actifs endocriniens) sont liposolubles, tandis que les glucosinolates sont hydrosolubles.",
      phase_A: { temp: "70°C", temps: "2h00", solvant: "Eau distillée + Glycérine (70/30)", cible: "Glucosinolates, polysaccharides", translations: { en: { cible: "Glucosinolates, polysaccharides" }, de: { cible: "Glucosinolate, Polysaccharide" } } },
      phase_B: { temp: "50°C", temps: "3h00", solvant: "Alcool bio 96°", cible: "Macamides, macaènes", translations: { en: { cible: "Macamides, macaenes" }, de: { cible: "Macamide, Macaene" } } },
      resultat: "Une extraction adaptogène complète pour le soutien de l'énergie et de l'équilibre hormonal.",
      translations: {
        en: {
          probleme_traditionnel: "Maca root is very dense. Macamides (endocrine actives) are fat-soluble, while glucosinolates are water-soluble.",
          resultat: "A complete adaptogenic extraction for energy and hormonal balance support."
        },
        de: {
          probleme_traditionnel: "Maca-Wurzel ist sehr dicht. Macamide (endokrine Wirkstoffe) sind fettlöslich, während Glucosinolate wasserlöslich sind.",
          resultat: "Eine vollständige adaptogene Extraktion zur Unterstützung von Energie und Hormongleichgewicht."
        }
      }
    },
    recette_pas_a_pas: {
        batch_standard: "Cible BloomLab : 750ml de solvant + 75g de plantes (Rendement final estimé : ~600-650ml)",
        ingredients: {
          phase_A: [
            "50g de Racine de Maca (poudre grossière)",
            "350ml d'Eau distillée",
            "150ml de Glycérine végétale"
          ],
          phase_B: [
            "25g de Racine de Maca (poudre fine)",
            "250ml d'Alcool bio 96°"
          ]
        },
        preparation: [
          "Utilisez de la poudre de maca de qualité alimentaire.",
          "Séparez 50g pour la Phase A et 25g pour la Phase B."
        ],
        phase_A_instructions: [
          "Versez eau et glycérine. Ajoutez les 50g de poudre.",
          "Fermez, mode manuel 'OIL', TEMP 70°C, TEMPS 2h00. START."
        ],
        transition: [
          "1. Éteignez. Laissez reposer 20 minutes.",
          "2. TEST SENSORIEL OBLIGATOIRE : Posez votre main sur la paroi extérieure de la cuve. Elle doit être 'tiède au toucher' (environ 40°C), et non brûlante.",
          "3. ⚠️ SÉCURITÉ : N'ajoutez l'alcool que lorsque ce test est validé."
        ],
        phase_B_instructions: [
          "Ajoutez l'alcool et les 25g de poudre fine.",
          "Fermez, mode manuel 'OIL', TEMP 50°C, TEMPS 3h00. START."
        ],
        filtration_et_finition: [
          "Filtrez à l'étamine. Pressez fermement (la poudre de maca absorbe beaucoup de liquide).",
          "Le liquide sera beige-brun, avec un goût de caramel/malt. Mettez en flacon ambré."
        ]
      },
    socle_synergique: {
      cofacteurs_complements: [
        { 
          nom: "Magnésium Bisglycinate", 
          dose: "300mg/jour", 
          role: "Soutient la production d'énergie cellulaire et calme le système nerveux, potentialisant l'adaptogène.",
          translations: {
            en: { nom: "Magnesium Bisglycinate", dose: "300mg/day", role: "Supports cellular energy production and calms the nervous system, enhancing the adaptogen." },
            de: { nom: "Magnesium-Bisglycinat", dose: "300mg/Tag", role: "Unterstützt die zelluläre Energieproduktion und beruhigt das Nervensystem, was das Adaptogen verstärkt." }
          }
        },
        { 
          nom: "Zinc", 
          dose: "15mg/jour", 
          role: "Cofacteur essentiel de la synthèse de la testostérone et de la santé reproductive, que la Maca soutient.",
          translations: {
            en: { nom: "Zinc", dose: "15mg/day", role: "Essential cofactor for testosterone synthesis and reproductive health, which Maca supports." },
            de: { nom: "Zink", dose: "15mg/Tag", role: "Essenzieller Cofaktor der Testosteronsynthese und der reproduktiven Gesundheit, die Maca unterstützt." }
          }
        }
      ],
      leviers_du_vivant: [
        { 
          nom: "Sommeil régulier", 
          frequence: "Coucher à heure fixe", 
          role: "L'axe HPA se régénère principalement pendant le sommeil profond. La Maca optimise ce processus.",
          translations: {
            en: { nom: "Regular sleep", frequence: "Bedtime at fixed hour", role: "The HPA axis regenerates mainly during deep sleep. Maca optimizes this process." },
            de: { nom: "Regelmäßiger Schlaf", frequence: "Schlafenszeit zu fester Stunde", role: "Die HPA-Achse regeneriert sich hauptsächlich während des Tiefschlafs. Maca optimiert diesen Prozess." }
          }
        }
      ]
    },
    convergence_ancestrale: "Cultivée depuis 2000 ans dans les Andes péruviennes comme 'viagra des Incas' et tonique de vitalité globale.",
    synergies_recommandees: ["ashwagandha_somnifera", "tribulus_terrestris", "rhodiola_rosea"],
    precautions: "Déconseillée en cas de pathologies hormonales sensibles (sein, utérus, prostate) sans avis médical, bien qu'elle ne contienne pas d'hormones.",
    translations: {
      en: {
        nom_commun: "Maca",
        partie_utilisee: "Dried root (hypocotyl)",
        preuve_scientifique: "Modulation of the HPA axis without containing exogenous hormones. Improvement of libido, energy and mood via the balance of neurotransmitters.",
        convergence_ancestrale: "Cultivated for 2000 years in the Peruvian Andes as the 'Inca viagra' and a tonic for overall vitality.",
        precautions: "Not recommended in case of sensitive hormonal pathologies (breast, uterus, prostate) without medical advice, although it does not contain hormones."
      },
      de: {
        nom_commun: "Maca",
        partie_utilisee: "Getrocknete Wurzel (Hypokotyl)",
        preuve_scientifique: "Modulation der HPA-Achse ohne exogene Hormone. Verbesserung von Libido, Energie und Stimmung über das Gleichgewicht der Neurotransmitter.",
        convergence_ancestrale: "Seit 2000 Jahren in den peruanischen Anden als 'Inka-Viagra' und Tonikum für die allgemeine Vitalität angebaut.",
        precautions: "Bei hormonempfindlichen Erkrankungen (Brust, Gebärmutter, Prostata) ohne ärztlichen Rat nicht empfohlen, obwohl es keine Hormone enthält."
      }
    }
  },
  {
    plant_id: "alchemilla_vulgaris",
    nom_commun: "Alchémille",
    nom_latin: "Alchemilla vulgaris",
    partie_utilisee: "Parties aériennes séchées",
    famille_bloom: "Réparateur (Cycle Féminin & Muqueuses)",
    terrains_cibles: [
        "T10_Hormonal",
        "T1_Intestin",
        "T9_Peau_Phaneres"
      ],
    actifs_cles: [
      { nom: "Tanins ellagiques", polarite: "Hydrosoluble", translations: { en: { nom: "Ellagic tannins", polarite: "Water-soluble" }, de: { nom: "Ellagengerbstoffe", polarite: "Wasserlöslich" } } },
      { nom: "Flavonoïdes", polarite: "Hydrosoluble", translations: { en: { nom: "Flavonoids", polarite: "Water-soluble" }, de: { nom: "Flavonoide", polarite: "Wasserlöslich" } } },
      { nom: "Acide salicylique", polarite: "Liposoluble", translations: { en: { nom: "Salicylic acid", polarite: "Fat-soluble" }, de: { nom: "Salicylsäure", polarite: "Fettlöslich" } } }
    ],
    preuve_scientifique: "Action astringente, hémostatique et régulatrice sur les muqueuses, en particulier l'utérus et le tube digestif. Soulage les règles douloureuses et les leucorrhées.",
    pourquoi_bloomlab: {
      probleme_traditionnel: "Les tanins s'extraient bien à l'eau, mais l'acide salicylique (anti-inflammatoire doux) nécessite un solvant organique et une chaleur modérée.",
      phase_A: { temp: "65°C", temps: "2h00", solvant: "Eau distillée + Glycérine (70/30)", cible: "Tanins, flavonoïdes", translations: { en: { cible: "Tannins, flavonoids" }, de: { cible: "Tannine, Flavonoide" } } },
      phase_B: { temp: "50°C", temps: "3h00", solvant: "Alcool bio 96°", cible: "Acide salicylique, composés lipophiles", translations: { en: { cible: "Salicylic acid, lipophilic compounds" }, de: { cible: "Salicylsäure, lipophile Verbindungen" } } },
      resultat: "Une extraction gynécologique et digestive complète pour le soutien des muqueuses et la régulation du cycle.",
      translations: {
        en: {
          probleme_traditionnel: "Tannins extract well in water, but salicylic acid (mild anti-inflammatory) requires an organic solvent and moderate heat.",
          resultat: "A complete gynecological and digestive extraction for mucosal support and cycle regulation."
        },
        de: {
          probleme_traditionnel: "Tannine lassen sich gut in Wasser extrahieren, aber Salicylsäure (mild entzündungshemmend) erfordert ein organisches Lösungsmittel und mäßige Hitze.",
          resultat: "Eine vollständige gynäkologische und digestive Extraktion zur Schleimhautunterstützung und Zyklusregulation."
        }
      }
    },
    recette_pas_a_pas: {
        batch_standard: "Cible BloomLab : 750ml de solvant + 75g de plantes (Rendement final estimé : ~600-650ml)",
        ingredients: {
          phase_A: [
            "50g d'Alchémille séchée",
            "350ml d'Eau distillée",
            "150ml de Glycérine végétale"
          ],
          phase_B: [
            "25g d'Alchémille séchée",
            "250ml d'Alcool bio 96°"
          ]
        },
        preparation: [
          "La plante est volumineuse. Tassez les 50g dans la cuve.",
          "Mixez les 25g restants pour la Phase B."
        ],
        phase_A_instructions: [
          "Versez eau et glycérine. Ajoutez les 50g de plante tassée.",
          "Fermez, mode manuel 'OIL', TEMP 65°C, TEMPS 2h00. START."
        ],
        transition: [
          "1. Éteignez. Laissez reposer 20 minutes.",
          "2. TEST SENSORIEL OBLIGATOIRE : Posez votre main sur la paroi extérieure de la cuve. Elle doit être 'tiède au toucher' (environ 40°C), et non brûlante.",
          "3. ⚠️ SÉCURITÉ : N'ajoutez l'alcool que lorsque ce test est validé."
        ],
        phase_B_instructions: [
          "Ajoutez l'alcool et les 25g de plante mixée.",
          "Fermez, mode manuel 'OIL', TEMP 50°C, TEMPS 3h00. START."
        ],
        filtration_et_finition: [
          "Filtrez à l'étamine. Pressez le marc.",
          "Le liquide sera vert-brun, légèrement astringent. Mettez en flacon ambré."
        ]
      },
    socle_synergique: {
      cofacteurs_complements: [
        { 
          nom: "Fer (Bisglycinate)", 
          dose: "Si ferritine < 50ng/mL", 
          role: "Compense les pertes sanguines menstruelles que l'alchémille aide à réguler.",
          translations: {
            en: { nom: "Iron (Bisglycinate)", dose: "If ferritin < 50ng/mL", role: "Compensates for menstrual blood loss that lady's mantle helps regulate." },
            de: { nom: "Eisen (Bisglycinat)", dose: "Wenn Ferritin < 50ng/mL", role: "Gleicht menstruelle Blutverluste aus, die Frauenmantel regulieren hilft." }
          }
        },
        { 
          nom: "Magnésium", 
          dose: "300mg/jour", 
          role: "Relaxe les spasmes utérins et intestinaux, synergique avec l'action de l'alchémille.",
          translations: {
            en: { nom: "Magnesium", dose: "300mg/day", role: "Relaxes uterine and intestinal spasms, synergistic with lady's mantle action." },
            de: { nom: "Magnesium", dose: "300mg/Tag", role: "Entspannt Gebärmutter- und Darmkrämpfe, synergetisch mit der Wirkung von Frauenmantel." }
          }
        }
      ],
      leviers_du_vivant: [
        { 
          nom: "Chaleur locale", 
          frequence: "Pendant les règles", 
          role: "Une bouillotte sur le bas-ventre potentialise l'effet antispasmodique de l'alchémille.",
          translations: {
            en: { nom: "Local heat", frequence: "During periods", role: "A hot water bottle on the lower abdomen enhances the antispasmodic effect of lady's mantle." },
            de: { nom: "Lokale Wärme", frequence: "Während der Periode", role: "Eine Wärmflasche auf dem Unterbauch verstärkt die krampfstoppende Wirkung von Frauenmantel." }
          }
        }
      ]
    },
    convergence_ancestrale: "Plante sacrée des alchimistes du Moyen Âge, associée à la Vierge Marie pour ses vertus 'purificatrices' et gynécologiques.",
    synergies_recommandees: ["achillea_millefolium", "rubus_idaeus", "capsella_bursa_pastoris"],
    precautions: "En raison de sa teneur en tanins, une consommation excessive et prolongée peut causer de la constipation. Faire des pauses.",
    translations: {
      en: {
        nom_commun: "Lady's Mantle",
        partie_utilisee: "Dried aerial parts",
        preuve_scientifique: "Astringent, hemostatic and regulatory action on the mucous membranes, especially the uterus and the digestive tract. Relieves painful periods and leucorrhea.",
        convergence_ancestrale: "Sacred plant of the Middle Ages alchemists, associated with the Virgin Mary for its 'purifying' and gynecological virtues.",
        precautions: "Due to its tannin content, excessive and prolonged consumption can cause constipation. Take breaks."
      },
      de: {
        nom_commun: "Frauenmantel",
        partie_utilisee: "Getrocknete oberirdische Teile",
        preuve_scientifique: "Adstringierende, hämostatische und regulierende Wirkung auf die Schleimhäute, insbesondere die Gebärmutter und den Verdauungstrakt. Lindert schmerzhafte Perioden und Weißfluss.",
        convergence_ancestrale: "Heilige Pflanze der Alchemisten des Mittelalters, verbunden mit der Jungfrau Maria wegen ihrer 'reinigenden' und gynäkologischen Tugenden.",
        precautions: "Aufgrund seines Gerbstoffgehalts kann übermäßiger und längerer Konsum Verstopfung verursachen. Pausen einlegen."
      }
    }
  },
  {
    plant_id: "artemisia_annua",
    nom_commun: "Armoise annuelle",
    nom_latin: "Artemisia annua",
    partie_utilisee: "Parties aériennes séchées",
    famille_bloom: "Gâchette (Immunité & Modulation)",
    terrains_cibles: [
        "T3_Immunité",
        "T8_Inflammation",
        "T1_Intestin"
      ],
    actifs_cles: [
      { nom: "Artémisinine", polarite: "Liposoluble/Thermolabile", translations: { en: { nom: "Artemisinin", polarite: "Fat-soluble/Heat-sensitive" }, de: { nom: "Artemisinin", polarite: "Fettlöslich/Thermolabil" } } },
      { nom: "Flavonoïdes", polarite: "Hydrosoluble", translations: { en: { nom: "Flavonoids", polarite: "Water-soluble" }, de: { nom: "Flavonoide", polarite: "Wasserlöslich" } } },
      { nom: "Huiles essentielles", polarite: "Volatile", translations: { en: { nom: "Essential oils", polarite: "Volatile" }, de: { nom: "Ätherische Öle", polarite: "Flüchtig" } } }
    ],
    preuve_scientifique: "Action immunomodulatrice puissante, antiparasitaire, et anti-inflammatoire via l'inhibition de la voie NF-κB. L'artémisinine agit en présence de fer (abondant dans les cellules inflammatoires ou parasitées).",
    pourquoi_bloomlab: {
      probleme_traditionnel: "L'artémisinine est très thermolabile et liposoluble. Une infusion à l'eau bouillante la détruit presque totalement.",
      phase_A: { temp: "60°C", temps: "1h30", solvant: "Eau distillée + Glycérine (70/30)", cible: "Flavonoïdes, composés hydrosolubles", translations: { en: { cible: "Flavonoids, water-soluble compounds" }, de: { cible: "Flavonoide, wasserlösliche Verbindungen" } } },
      phase_B: { temp: "45°C", temps: "3h00", solvant: "Alcool bio 96°", cible: "Artémisinine, huiles essentielles", translations: { en: { cible: "Artemisinin, essential oils" }, de: { cible: "Artemisinin, ätherische Öle" } } },
      resultat: "Une extraction à froid préservant l'artémisinine pour une modulation immunitaire et anti-parasitaire maximale.",
      translations: {
        en: {
          probleme_traditionnel: "Artemisinin is very heat-sensitive and fat-soluble. An infusion with boiling water destroys it almost completely.",
          resultat: "A cold extraction preserving artemisinin for maximum immune and anti-parasitic modulation."
        },
        de: {
          probleme_traditionnel: "Artemisinin ist sehr thermolabil und fettlöslich. Ein Aufguss mit kochendem Wasser zerstört es fast vollständig.",
          resultat: "Eine Kaltextraktion, die Artemisinin bewahrt, für maximale Immun- und Antiparasitenmodulation."
        }
      }
    },
    recette_pas_a_pas: {
        batch_standard: "Cible BloomLab : 750ml de solvant + 75g de plantes (Rendement final estimé : ~600-650ml)",
        ingredients: {
          phase_A: [
            "50g d'Armoise annuelle",
            "350ml d'Eau distillée",
            "150ml de Glycérine végétale"
          ],
          phase_B: [
            "25g d'Armoise annuelle",
            "250ml d'Alcool bio 96°"
          ]
        },
        preparation: [
          "La plante est légère et aromatique. Tassez les 50g.",
          "Mixez les 25g restants pour la Phase B."
        ],
        phase_A_instructions: [
          "Versez eau et glycérine. Ajoutez les 50g de plante tassée.",
          "Fermez, mode manuel 'OIL', TEMP 60°C, TEMPS 1h30. START."
        ],
        transition: [
          "1. Éteignez. Laissez reposer 20 minutes.",
          "2. TEST SENSORIEL OBLIGATOIRE : Posez votre main sur la paroi extérieure de la cuve. Elle doit être 'tiède au toucher' (environ 40°C), et non brûlante.",
          "3. ⚠️ SÉCURITÉ : N'ajoutez l'alcool que lorsque ce test est validé."
        ],
        phase_B_instructions: [
          "Ajoutez l'alcool et les 25g de plante mixée.",
          "Fermez, mode manuel 'OIL', TEMP 45°C, TEMPS 3h00. START."
        ],
        filtration_et_finition: [
          "Filtrez à l'étamine. Pressez le marc.",
          "Le liquide sera vert foncé, très aromatique. Mettez en flacon ambré."
        ]
      },
    socle_synergique: {
      cofacteurs_complements: [
        { 
          nom: "Fer (si carence avérée)", 
          dose: "Selon bilan", 
          role: "L'artémisinine agit en synergie avec le fer pour cibler les cellules inflammatoires ou parasitées.",
          translations: {
            en: { nom: "Iron (if deficiency proven)", dose: "According to assessment", role: "Artemisinin acts in synergy with iron to target inflammatory or parasitized cells." },
            de: { nom: "Eisen (bei nachgewiesenem Mangel)", dose: "Nach Befund", role: "Artemisinin wirkt synergetisch mit Eisen, um entzündliche oder parasitierte Zellen anzugreifen." }
          }
        },
        { 
          nom: "Vitamine C", 
          dose: "500mg/jour", 
          role: "Potentialise l'action de l'artémisinine en générant des radicaux libres localisés dans les cellules cibles.",
          translations: {
            en: { nom: "Vitamin C", dose: "500mg/day", role: "Potentiates the action of artemisinin by generating localized free radicals in the target cells." },
            de: { nom: "Vitamin C", dose: "500mg/Tag", role: "Potenziert die Wirkung von Artemisinin durch die Erzeugung lokalisierter freier Radikale in den Zielzellen." }
          }
        }
      ],
      leviers_du_vivant: [
        { 
          nom: "Jeûne intermittent", 
          frequence: "14-16h", 
          role: "Réduit la charge inflammatoire globale, laissant l'Artemisia agir plus précisément.",
          translations: {
            en: { nom: "Intermittent fasting", frequence: "14-16h", role: "Reduces overall inflammatory load, letting Artemisia act more precisely." },
            de: { nom: "Intervallfasten", frequence: "14-16h", role: "Reduziert die gesamte Entzündungslast, sodass Artemisia präziser wirken kann." }
          }
        }
      ]
    },
    convergence_ancestrale: "Qing Hao en MTC, utilisée depuis 1600 ans pour les 'fièvres'. Prix Nobel de Médecine 2015 pour la découverte de l'artémisinine.",
    synergies_recommandees: ["nigella_sativa", "origanum_vulgare", "curcuma_longa"],
    precautions: "Déconseillée pendant la grossesse et l'allaitement. Peut interagir avec certains médicaments métabolisés par le foie.",
    translations: {
      en: {
        nom_commun: "Sweet Wormwood",
        partie_utilisee: "Dried aerial parts",
        preuve_scientifique: "Powerful immunomodulatory, antiparasitic, and anti-inflammatory action via the inhibition of the NF-κB pathway. Artemisinin acts in the presence of iron (abundant in inflammatory or parasitized cells).",
        convergence_ancestrale: "Qing Hao in TCM, used for 1600 years for 'fevers'. 2015 Nobel Prize in Medicine for the discovery of artemisinin.",
        precautions: "Not recommended during pregnancy and breastfeeding. May interact with certain drugs metabolized by the liver."
      },
      de: {
        nom_commun: "Einjähriger Beifuß",
        partie_utilisee: "Getrocknete oberirdische Teile",
        preuve_scientifique: "Starke immunmodulatorische, antiparasitäre und entzündungshemmende Wirkung über die Hemmung des NF-κB-Weges. Artemisinin wirkt in Gegenwart von Eisen (reichlich vorhanden in entzündlichen oder parasitierten Zellen).",
        convergence_ancestrale: "Qing Hao in der TCM, seit 1600 Jahren gegen 'Fieber' eingesetzt. Nobelpreis für Medizin 2015 für die Entdeckung von Artemisinin.",
        precautions: "Während der Schwangerschaft und Stillzeit nicht empfohlen. Kann mit bestimmten Medikamenten interagieren, die über die Leber metabolisiert werden."
      }
    }
  },
  {
    plant_id: "vitex_agnus_castus",
    nom_commun: "Gattilier (Vitex)",
    nom_latin: "Vitex agnus-castus",
    partie_utilisee: "Fruits séchés",
    famille_bloom: "Chef d'Orchestre (Régulateur Hormonal)",
    terrains_cibles: [
        "T8_Hormonal",
        "T5_HPA",
        "T7_Psycho_emotionnel"
      ],
    actifs_cles: [
      { nom: "Diterpènes cycliques", polarite: "Liposoluble", translations: { en: { nom: "Cyclic diterpenes", polarite: "Fat-soluble" }, de: { nom: "Zyklische Diterpene", polarite: "Fettlöslich" } } },
      { nom: "Flavonoïdes (Casticine)", polarite: "Liposoluble", translations: { en: { nom: "Flavonoids (Casticin)", polarite: "Fat-soluble" }, de: { nom: "Flavonoide (Casticin)", polarite: "Fettlöslich" } } },
      { nom: "Iridoïdes (Agnuside)", polarite: "Hydrosoluble", translations: { en: { nom: "Iridoids (Agnuside)", polarite: "Water-soluble" }, de: { nom: "Iridoide (Agnusid)", polarite: "Wasserlöslich" } } }
    ],
    preuve_scientifique: "Action dopaminergique au niveau de l'hypophyse, inhibant la sécrétion de prolactine et favorisant la production de progestérone par le corps jaune. Maître du syndrome prémenstruel et de l'insuffisance lutéale.",
    pourquoi_bloomlab: {
      probleme_traditionnel: "Les diterpènes (actifs endocriniens majeurs) sont strictement liposolubles. Une infusion aqueuse rate totalement l'action sur la progestérone.",
      phase_A: { temp: "70°C", temps: "2h00", solvant: "Eau distillée + Glycérine (70/30)", cible: "Iridoïdes (Agnuside)", translations: { en: { cible: "Iridoids (Agnuside)" }, de: { cible: "Iridoide (Agnusid)" } } },
      phase_B: { temp: "50°C", temps: "3h00", solvant: "Alcool bio 96°", cible: "Diterpènes, Casticine", translations: { en: { cible: "Diterpenes, Casticin" }, de: { cible: "Diterpene, Casticin" } } },
      resultat: "Une extraction hormonale complète pour la régulation du cycle et le soutien de la progestérone.",
      translations: {
        en: {
          probleme_traditionnel: "Diterpenes (major endocrine actives) are strictly fat-soluble. A water infusion completely misses the action on progesterone.",
          resultat: "A complete hormonal extraction for cycle regulation and progesterone support."
        },
        de: {
          probleme_traditionnel: "Diterpene (wichtigste endokrine Wirkstoffe) sind streng fettlöslich. Ein wässriger Aufguss verfehlt die Wirkung auf Progesteron vollständig.",
          resultat: "Eine vollständige hormonelle Extraktion zur Zyklusregulation und Progesteronunterstützung."
        }
      }
    },
    recette_pas_a_pas: {
        batch_standard: "Cible BloomLab : 750ml de solvant + 75g de plantes (Rendement final estimé : ~600-650ml)",
        ingredients: {
          phase_A: [
            "50g de Fruits de Vitex (légèrement concassées)",
            "350ml d'Eau distillée",
            "150ml de Glycérine végétale"
          ],
          phase_B: [
            "25g de Fruits de Vitex (poudre)",
            "250ml d'Alcool bio 96°"
          ]
        },
        preparation: [
          "Concassez les 50g de fruits pour la Phase A (évitez la poudre fine pour ne pas géifier l'eau avec les mucilages).",
          "Mixez les 25g restants en poudre pour la Phase B."
        ],
        phase_A_instructions: [
          "Versez eau et glycérine. Ajoutez les 50g de fruits concassés.",
          "Fermez, mode manuel 'OIL', TEMP 70°C, TEMPS 2h00. START."
        ],
        transition: [
          "1. Éteignez. Laissez reposer 20 minutes.",
          "2. TEST SENSORIEL OBLIGATOIRE : Posez votre main sur la paroi extérieure de la cuve. Elle doit être 'tiède au toucher' (environ 40°C), et non brûlante.",
          "3. ⚠️ SÉCURITÉ : N'ajoutez l'alcool que lorsque ce test est validé."
        ],
        phase_B_instructions: [
          "Ajoutez l'alcool et les 25g de poudre.",
          "Fermez, mode manuel 'OIL', TEMP 50°C, TEMPS 3h00. START."
        ],
        filtration_et_finition: [
          "Filtrez à l'étamine. Pressez fermement le marc.",
          "Le liquide sera brun foncé. Mettez en flacon ambré."
        ]
      },
    socle_synergique: {
      cofacteurs_complements: [
        { 
          nom: "Magnésium Bisglycinate", 
          dose: "300mg/jour (phase lutéale)", 
          role: "Réduit les spasmes utérins et soutient la méthylation hépatique des œstrogènes.",
          translations: {
            en: { nom: "Magnesium Bisglycinate", dose: "300mg/day (luteal phase)", role: "Reduces uterine spasms and supports hepatic methylation of estrogens." },
            de: { nom: "Magnesium-Bisglycinat", dose: "300mg/Tag (Lutealphase)", role: "Reduziert Gebärmutterkrämpfe und unterstützt die hepatische Methylierung von Östrogenen." }
          }
        },
        { 
          nom: "Vitamine B6 (P-5-P)", 
          dose: "50mg/jour", 
          role: "Cofacteur essentiel de la synthèse de la progestérone et de la dopamine.",
          translations: {
            en: { nom: "Vitamin B6 (P-5-P)", dose: "50mg/day", role: "Essential cofactor for progesterone and dopamine synthesis." },
            de: { nom: "Vitamin B6 (P-5-P)", dose: "50mg/Tag", role: "Essenzieller Cofaktor der Progesteron- und Dopaminsynthese." }
          }
        }
      ],
      leviers_du_vivant: [
        { 
          nom: "Gestion du stress (Cohérence cardiaque)", 
          frequence: "Quotidienne", 
          role: "Le cortisol élevé vole les précurseurs de la progestérone (pregnenolone steal). Calmer l'axe HPA est obligatoire pour que le Vitex fonctionne.",
          translations: {
            en: { nom: "Stress management (Cardiac coherence)", frequence: "Daily", role: "High cortisol steals progesterone precursors (pregnenolone steal). Calming the HPA axis is mandatory for Vitex to work." },
            de: { nom: "Stressmanagement (Herzkoheränz)", frequence: "Täglich", role: "Erhöhtes Cortisol stiehlt Progesteron-Vorstufen (Pregnenolon-Steal). Die Beruhigung der HPA-Achse ist zwingend erforderlich, damit Vitex wirken kann." }
          }
        }
      ]
    },
    convergence_ancestrale: "Herbe des 'veuves' et des moines au Moyen Âge. Utilisé depuis l'Antiquité pour l'équilibre féminin.",
    synergies_recommandees: ["alchemilla_vulgaris", "shatavari", "paeonia_lactiflora"],
    precautions: "Contre-indiqué en cas de prise de contraceptifs oraux, de traitements dopaminergiques ou d'antécédents de cancers hormono-dépendants sans avis médical. Action lente (3 cycles minimum).",
    translations: {
      en: {
        nom_commun: "Chasteberry (Vitex)",
        partie_utilisee: "Dried fruits",
        preuve_scientifique: "Dopaminergic action at the pituitary level, inhibiting the secretion of prolactin and promoting the production of progesterone by the corpus luteum. Master of premenstrual syndrome and luteal insufficiency.",
        convergence_ancestrale: "'Widows' herb' and monks' herb in the Middle Ages. Used since Antiquity for female balance.",
        precautions: "Contraindicated in case of taking oral contraceptives, dopaminergic treatments or history of hormone-dependent cancers without medical advice. Slow action (3 cycles minimum)."
      },
      de: {
        nom_commun: "Mönchspfeffer (Vitex)",
        partie_utilisee: "Getrocknete Früchte",
        preuve_scientifique: "Dopaminerge Wirkung auf Hypophysenebene, Hemmung der Prolaktinsekretion und Förderung der Progesteronproduktion durch den Gelbkörper. Meister des prämenstruellen Syndroms und der Gelbkörperschwäche.",
        convergence_ancestrale: "'Witwenkraut' und Mönchskraut im Mittelalter. Seit der Antike für das weibliche Gleichgewicht verwendet.",
        precautions: "Kontraindiziert bei Einnahme von oralen Kontrazeptiva, dopaminergen Behandlungen oder hormonabhängigen Krebserkrankungen in der Vorgeschichte ohne ärztlichen Rat. Langsame Wirkung (mindestens 3 Zyklen)."
      }
    }
  },
  {
    plant_id: "nigella_sativa",
    nom_commun: "Nigelle",
    nom_latin: "Nigella sativa",
    partie_utilisee: "Graines séchées",
    famille_bloom: "Gâchette (Immunomodulateur & Anti-inflammatoire)",
    terrains_cibles: [
        "T4_Immunité",
        "T8_Inflammation",
        "T1_Intestin"
      ],
    actifs_cles: [
      { nom: "Thymoquinone", polarite: "Liposoluble", translations: { en: { nom: "Thymoquinone", polarite: "Fat-soluble" }, de: { nom: "Thymoquinon", polarite: "Fettlöslich" } } },
      { nom: "Nigellone", polarite: "Liposoluble", translations: { en: { nom: "Nigellone", polarite: "Fat-soluble" }, de: { nom: "Nigellon", polarite: "Fettlöslich" } } },
      { nom: "Acides gras insaturés", polarite: "Liposoluble", translations: { en: { nom: "Unsaturated fatty acids", polarite: "Fat-soluble" }, de: { nom: "Ungesättigte Fettsäuren", polarite: "Fettlöslich" } } }
    ],
    preuve_scientifique: "La thymoquinone est un puissant inhibiteur de NF-κB et des leucotriènes. Action antihistaminique, bronchodilatatrice et protectrice des muqueuses. Modulation fine de la réponse Th1/Th2.",
    pourquoi_bloomlab: {
      probleme_traditionnel: "La thymoquinone est strictement lipophile et volatile. Une extraction aqueuse est inutile. Une chaleur >60°C oxyde les acides gras précieux de la graine.",
      phase_A: { temp: "60°C", temps: "1h30", solvant: "Eau distillée + Glycérine (70/30)", cible: "Saponines, protéines hydrosolubles", translations: { en: { cible: "Saponins, water-soluble proteins" }, de: { cible: "Saponine, wasserlösliche Proteine" } } },
      phase_B: { temp: "45°C", temps: "3h00", solvant: "Alcool bio 96°", cible: "Thymoquinone, Nigellone", translations: { en: { cible: "Thymoquinone, Nigellone" }, de: { cible: "Thymoquinon, Nigellon" } } },
      resultat: "Une extraction immunitaire et anti-inflammatoire préservant la thymoquinone pour une efficacité maximale.",
      translations: {
        en: {
          probleme_traditionnel: "Thymoquinone is strictly lipophilic and volatile. A water extraction is useless. Heat >60°C oxidizes the precious fatty acids of the seed.",
          resultat: "An immune and anti-inflammatory extraction preserving thymoquinone for maximum efficiency."
        },
        de: {
          probleme_traditionnel: "Thymoquinon ist streng lipophil und flüchtig. Eine wässrige Extraktion ist nutzlos. Hitze >60°C oxidiert die wertvollen Fettsäuren des Samens.",
          resultat: "Eine immunologische und entzündungshemmende Extraktion, die Thymoquinon bewahrt, für maximale Wirksamkeit."
        }
      }
    },
    recette_pas_a_pas: {
        batch_standard: "Cible BloomLab : 750ml de solvant + 75g de plantes (Rendement final estimé : ~600-650ml)",
        ingredients: {
          phase_A: [
            "50g de Graines de Nigelle (légèrement concassées)",
            "350ml d'Eau distillée",
            "150ml de Glycérine végétale"
          ],
          phase_B: [
            "25g de Graines de Nigelle (poudre)",
            "250ml d'Alcool bio 96°"
          ]
        },
        preparation: [
          "Concassez légèrement les 50g pour la Phase A.",
          "Mixez les 25g restants pour la Phase B."
        ],
        phase_A_instructions: [
          "Versez eau et glycérine. Ajoutez les 50g de graines.",
          "Fermez, mode manuel 'OIL', TEMP 60°C, TEMPS 1h30. START."
        ],
        transition: [
          "1. Éteignez. Laissez reposer 20 minutes.",
          "2. TEST SENSORIEL OBLIGATOIRE : Posez votre main sur la paroi extérieure de la cuve. Elle doit être 'tiède au toucher' (environ 40°C), et non brûlante.",
          "3. ️ SÉCURITÉ : N'ajoutez l'alcool que lorsque ce test est validé."
        ],
        phase_B_instructions: [
          "Ajoutez l'alcool et les 25g de poudre.",
          "Fermez, mode manuel 'OIL', TEMP 45°C, TEMPS 3h00. START."
        ],
        filtration_et_finition: [
          "Filtrez à l'étamine. Pressez fermement.",
          "Le liquide sera noir/brun très foncé, avec une odeur épicée. Mettez en flacon ambré."
        ]
      },
    socle_synergique: {
      cofacteurs_complements: [
        { 
          nom: "Oméga-3 (EPA/DHA)", 
          dose: "2g/jour", 
          role: "Synergie anti-inflammatoire majeure avec la thymoquinone sur les membranes cellulaires.",
          translations: {
            en: { nom: "Omega-3 (EPA/DHA)", dose: "2g/day", role: "Major anti-inflammatory synergy with thymoquinone on cell membranes." },
            de: { nom: "Omega-3 (EPA/DHA)", dose: "2g/Tag", role: "Wichtige entzündungshemmende Synergie mit Thymoquinon auf Zellmembranen." }
          }
        },
        { 
          nom: "Vitamine D3", 
          dose: "Selon bilan", 
          role: "Indispensable à la modulation immunitaire (Treg) que la Nigelle soutient.",
          translations: {
            en: { nom: "Vitamin D3", dose: "According to assessment", role: "Indispensable for immune modulation (Treg) that Black Cumin supports." },
            de: { nom: "Vitamin D3", dose: "Nach Befund", role: "Unverzichtbar für die Immunmodulation (Treg), die Schwarzkümmel unterstützt." }
          }
        }
      ],
      leviers_du_vivant: [
        { 
          nom: "Respiration nasale", 
          frequence: "Quotidienne", 
          role: "La Nigelle ouvre les bronches ; la respiration nasale filtre et humidifie l'air, potentialisant l'effet respiratoire.",
          translations: {
            en: { nom: "Nasal breathing", frequence: "Daily", role: "Black Cumin opens the bronchi; nasal breathing filters and humidifies the air, potentiating the respiratory effect." },
            de: { nom: "Nasenatmung", frequence: "Täglich", role: "Schwarzkümmel öffnet die Bronchien; die Nasenatmung filtert und befeuchtet die Luft, was die Atemwegswirkung verstärkt." }
          }
        }
      ]
    },
    convergence_ancestrale: "La 'graine de bénédiction' de l'Islam et de la médecine unani. Utilisée pour 'tout sauf la mort'.",
    synergies_recommandees: ["curcuma_longa", "boswellia_serrata", "echinacea_purpurea"],
    precautions: "Généralement très sûre. À haute dose peut avoir un léger effet fluidifiant sanguin.",
    translations: {
      en: {
        nom_commun: "Black Cumin",
        partie_utilisee: "Dried seeds",
        preuve_scientifique: "Thymoquinone is a powerful inhibitor of NF-κB and leukotrienes. Antihistamine, bronchodilatory and mucosal protective action. Fine modulation of the Th1/Th2 response.",
        convergence_ancestrale: "'The seed that heals everything except death' (Prophetic medicine). Used for 3000 years in the Middle East and Egypt.",
        precautions: "Generally very safe. High dose may have a mild blood-thinning effect."
      },
      de: {
        nom_commun: "Schwarzkümmel",
        partie_utilisee: "Getrocknete Samen",
        preuve_scientifique: "Thymoquinon ist ein starker Inhibitor von NF-κB und Leukotrienen. Antihistaminika-, bronchodilatatorische und schleimhautschützende Wirkung. Feine Modulation der Th1/Th2-Antwort.",
        convergence_ancestrale: "'Der Samen, der alles heilt außer den Tod' (Prophetische Medizin). Seit 3000 Jahren im Nahen Osten und Ägypten verwendet.",
        precautions: "Im Allgemeinen sehr sicher. Hohe Dosen können eine leicht blutverdünnende Wirkung haben."
      }
    }
  },
  {
    plant_id: "cordyceps_militaris",
    nom_commun: "Cordyceps",
    nom_latin: "Cordyceps militaris / sinensis",
    partie_utilisee: "Fruit (champignon) séché",
    famille_bloom: "Chef d'Orchestre (Énergie Mitochondriale)",
    terrains_cibles: [
        "T6_Mitochondrie",
        "T5_HPA",
        "T3_Immunité"
      ],
    actifs_cles: [
      { nom: "Cordycépine", polarite: "Hydrosoluble", translations: { en: { nom: "Cordycepin", polarite: "Water-soluble" }, de: { nom: "Cordycepin", polarite: "Wasserlöslich" } } },
      { nom: "Adénosine", polarite: "Hydrosoluble", translations: { en: { nom: "Adenosine", polarite: "Water-soluble" }, de: { nom: "Adenosin", polarite: "Wasserlöslich" } } },
      { nom: "Stérols (Ergostérol)", polarite: "Liposoluble", translations: { en: { nom: "Sterols (Ergosterol)", polarite: "Fat-soluble" }, de: { nom: "Sterine (Ergosterin)", polarite: "Fettlöslich" } } }
    ],
    preuve_scientifique: "Augmentation de la production d'ATP mitochondrial, amélioration de l'utilisation de l'oxygène (VO2 max), et modulation de l'immunité via les bêta-glucanes.",
    pourquoi_bloomlab: {
      probleme_traditionnel: "La paroi de chitine du champignon nécessite une chaleur prolongée (80°C) pour libérer les polysaccharides. Les stérols nécessitent un solvant organique.",
      phase_A: { temp: "80°C", temps: "3h00", solvant: "Eau distillée + Glycérine (70/30)", cible: "Polysaccharides, Cordycépine", translations: { en: { cible: "Polysaccharides, Cordycepin" }, de: { cible: "Polysaccharide, Cordycepin" } } },
      phase_B: { temp: "50°C", temps: "3h00", solvant: "Alcool bio 96°", cible: "Stérols, composés lipophiles", translations: { en: { cible: "Sterols, lipophilic compounds" }, de: { cible: "Sterine, lipophile Verbindungen" } } },
      resultat: "Une extraction mitochondriale et immunitaire complète pour le soutien de l'énergie et de la vitalité.",
      translations: {
        en: {
          probleme_traditionnel: "The mushroom's chitin wall requires prolonged heat (80°C) to release polysaccharides. Sterols require an organic solvent.",
          resultat: "A complete mitochondrial and immune extraction for energy and vitality support."
        },
        de: {
          probleme_traditionnel: "Die Chitinwand des Pilzes erfordert längere Hitze (80°C), um Polysaccharide freizusetzen. Sterine erfordern ein organisches Lösungsmittel.",
          resultat: "Eine vollständige mitochondriale und immunologische Extraktion zur Unterstützung von Energie und Vitalität."
        }
      }
    },
    recette_pas_a_pas: {
        batch_standard: "Cible BloomLab : 750ml de solvant + 75g de plantes (Rendement final estimé : ~600-650ml)",
        ingredients: {
          phase_A: [
            "50g de Cordyceps en poudre grossière",
            "350ml d'Eau distillée",
            "150ml de Glycérine végétale"
          ],
          phase_B: [
            "25g de Cordyceps en poudre fine",
            "250ml d'Alcool bio 96°"
          ]
        },
        preparation: [
          "Utilisez du Cordyceps déjà broyé. Séparez 50g pour la Phase A et 25g pour la Phase B."
        ],
        phase_A_instructions: [
          "Versez eau et glycérine. Ajoutez les 50g de poudre.",
          "Fermez, mode manuel 'OIL', TEMP 80°C, TEMPS 3h00. START."
        ],
        transition: [
          "1. Éteignez. Laissez reposer 30 minutes (la poudre retient la chaleur).",
          "2. TEST SENSORIEL OBLIGATOIRE : Posez votre main sur la paroi extérieure de la cuve. Elle doit être 'tiède au toucher' (environ 40°C), et non brûlante.",
          "3. ⚠️ SÉCURITÉ : N'ajoutez l'alcool que lorsque ce test est validé."
        ],
        phase_B_instructions: [
          "Ajoutez l'alcool et les 25g de poudre fine.",
          "Fermez, mode manuel 'OIL', TEMP 50°C, TEMPS 3h00. START."
        ],
        filtration_et_finition: [
          "Filtrez à l'étamine double épaisseur. Pressez très fermement.",
          "Le liquide sera brun doré. Mettez en flacon ambré."
        ]
      },
    socle_synergique: {
      cofacteurs_complements: [
        { 
          nom: "CoQ10 (Ubiquinol)", 
          dose: "100-200mg/jour", 
          role: "Synergie directe avec le Cordyceps sur la chaîne respiratoire mitochondriale.",
          translations: {
            en: { nom: "CoQ10 (Ubiquinol)", dose: "100-200mg/day", role: "Direct synergy with Cordyceps on the mitochondrial respiratory chain." },
            de: { nom: "CoQ10 (Ubiquinol)", dose: "100-200mg/Tag", role: "Direkte Synergie mit Cordyceps in der mitochondrialen Atmungskette." }
          }
        },
        { 
          nom: "Magnésium", 
          dose: "300mg/jour", 
          role: "Cofacteur obligatoire de la synthèse d'ATP.",
          translations: {
            en: { nom: "Magnesium", dose: "300mg/day", role: "Mandatory cofactor for ATP synthesis." },
            de: { nom: "Magnesium", dose: "300mg/Tag", role: "Zwingender Cofaktor der ATP-Synthese." }
          }
        }
      ],
      leviers_du_vivant: [
        { 
          nom: "Exercice en zone 2 (endurance fondamentale)", 
          frequence: "3x 45min/semaine", 
          role: "Le Cordyceps augmente la VO2 max ; l'entraînement en zone 2 construit les mitochondries.",
          translations: {
            en: { nom: "Zone 2 exercise (base endurance)", frequence: "3x 45min/week", role: "Cordyceps increases VO2 max; zone 2 training builds mitochondria." },
            de: { nom: "Zone-2-Training (Grundlagenausdauer)", frequence: "3x 45 Min./Woche", role: "Cordyceps erhöht die VO2 max; Zone-2-Training baut Mitochondrien auf." }
          }
        }
      ]
    },
    convergence_ancestrale: "Champignon de l'énergie en MTC, utilisé par les sherpas pour l'endurance en altitude.",
    synergies_recommandees: ["rhodiola_rosea", "panax_ginseng", "ganoderma_lucidum"],
    precautions: "Déconseillé en cas de maladies auto-immunes actives (stimulation immunitaire) ou de prise d'anticoagulants.",
    translations: {
      en: {
        nom_commun: "Cordyceps",
        partie_utilisee: "Dried fruit (mushroom)",
        preuve_scientifique: "Increase in mitochondrial ATP production, improvement of oxygen utilization (VO2 max), and modulation of immunity via beta-glucans.",
        convergence_ancestrale: "Energy mushroom in TCM, used by sherpas for endurance at altitude.",
        precautions: "Not recommended in case of active autoimmune diseases (immune stimulation) or taking anticoagulants."
      },
      de: {
        nom_commun: "Cordyceps",
        partie_utilisee: "Getrocknete Frucht (Pilz)",
        preuve_scientifique: "Erhöhung der mitochondrialen ATP-Produktion, Verbesserung der Sauerstoffausnutzung (VO2 max) und Modulation der Immunität über Beta-Glucane.",
        convergence_ancestrale: "Energiepilz in der TCM, von Sherpas für die Ausdauer in der Höhe verwendet.",
        precautions: "Bei aktiven Autoimmunerkrankungen (Immunstimulation) oder Einnahme von Antikoagulanzien nicht empfohlen."
      }
    }
  },
  {
    plant_id: "hieracium_pilosella",
    nom_commun: "Piloselle",
    nom_latin: "Hieracium pilosella",
    partie_utilisee: "Plante entière séchée",
    famille_bloom: "Déclencheur (Drainage Rénal)",
    terrains_cibles: [
        "T1_Emonctoires",
        "T4_Immunité",
        "T8_Inflammation"
      ],
    actifs_cles: [
      { nom: "Flavonoïdes", polarite: "Hydrosoluble", translations: { en: { nom: "Flavonoids", polarite: "Water-soluble" }, de: { nom: "Flavonoide", polarite: "Wasserlöslich" } } },
      { nom: "Acide chlorogénique", polarite: "Hydrosoluble", translations: { en: { nom: "Chlorogenic acid", polarite: "Water-soluble" }, de: { nom: "Chlorogensäure", polarite: "Wasserlöslich" } } },
      { nom: "Ombelliférone", polarite: "Liposoluble", translations: { en: { nom: "Umbelliferone", polarite: "Fat-soluble" }, de: { nom: "Umbelliferon", polarite: "Fettlöslich" } } }
    ],
    preuve_scientifique: "Puissant diurétique épargnant le potassium (contrairement aux diurétiques chimiques). Action anti-inflammatoire sur les voies urinaires. Maître du drainage des surcharges hydriques.",
    pourquoi_bloomlab: {
      probleme_traditionnel: "Les flavonoïdes diurétiques s'extraient à l'eau, mais l'ombelliférone (antibactérien urinaire) nécessite un solvant organique.",
      phase_A: { temp: "65°C", temps: "2h00", solvant: "Eau distillée + Glycérine (70/30)", cible: "Flavonoïdes, acide chlorogénique", translations: { en: { cible: "Flavonoids, chlorogenic acid" }, de: { cible: "Flavonoide, Chlorogensäure" } } },
      phase_B: { temp: "50°C", temps: "3h00", solvant: "Alcool bio 96°", cible: "Ombelliférone", translations: { en: { cible: "Umbelliferone" }, de: { cible: "Umbelliferon" } } },
      resultat: "Une extraction rénale complète pour le drainage des fluides et le soutien des voies urinaires.",
      translations: {
        en: {
          probleme_traditionnel: "Diuretic flavonoids extract in water, but umbelliferone (urinary antibacterial) requires an organic solvent.",
          resultat: "A complete renal extraction for fluid drainage and urinary tract support."
        },
        de: {
          probleme_traditionnel: "Diuretische Flavonoide werden in Wasser extrahiert, aber Umbelliferon (antibakteriell für die Harnwege) erfordert ein organisches Lösungsmittel.",
          resultat: "Eine vollständige Nierenextraktion zur Flüssigkeitsdrainage und Unterstützung der Harnwege."
        }
      }
    },
    recette_pas_a_pas: {
        batch_standard: "Cible BloomLab : 750ml de solvant + 75g de plantes (Rendement final estimé : ~600-650ml)",
        ingredients: {
          phase_A: [
            "50g de Piloselle séchée",
            "350ml d'Eau distillée",
            "150ml de Glycérine végétale"
          ],
          phase_B: [
            "25g de Piloselle séchée",
            "250ml d'Alcool bio 96°"
          ]
        },
        preparation: [
          "La plante est volumineuse. Tassez les 50g dans la cuve.",
          "Mixez les 25g restants pour la Phase B."
        ],
        phase_A_instructions: [
          "Versez eau et glycérine. Ajoutez les 50g de plante tassée.",
          "Fermez, mode manuel 'OIL', TEMP 65°C, TEMPS 2h00. START."
        ],
        transition: [
          "1. Éteignez. Laissez reposer 20 minutes.",
          "2. TEST SENSORIEL OBLIGATOIRE : Posez votre main sur la paroi extérieure de la cuve. Elle doit être 'tiède au toucher' (environ 40°C), et non brûlante.",
          "3. ⚠️ SÉCURITÉ : N'ajoutez l'alcool que lorsque ce test est validé."
        ],
        phase_B_instructions: [
          "Ajoutez l'alcool et les 25g de plante mixée.",
          "Fermez, mode manuel 'OIL', TEMP 50°C, TEMPS 3h00. START."
        ],
        filtration_et_finition: [
          "Filtrez à l'étamine. Pressez le marc.",
          "Le liquide sera vert-brun. Mettez en flacon ambré."
        ]
      },
    socle_synergique: {
      cofacteurs_complements: [
        { 
          nom: "Potassium", 
          dose: "Via alimentation (banane, avocat)", 
          role: "Bien que la Piloselle épargne le potassium, un apport alimentaire riche soutient la fonction rénale.",
          translations: {
            en: { nom: "Potassium", dose: "Via diet (banana, avocado)", role: "Although Mouse-ear Hawkweed spares potassium, a rich dietary intake supports kidney function." },
            de: { nom: "Kalium", dose: "Über die Ernährung (Banane, Avocado)", role: "Obwohl Kleines Habichtskraut Kalium schont, unterstützt eine reiche Nahrungsaufnahme die Nierenfunktion." }
          }
        },
        { 
          nom: "Magnésium", 
          dose: "300mg/jour", 
          role: "Prévient les crampes lors d'un drainage intensif.",
          translations: {
            en: { nom: "Magnesium", dose: "300mg/day", role: "Prevents cramps during intensive drainage." },
            de: { nom: "Magnesium", dose: "300mg/Tag", role: "Beugt Krämpfen bei intensiver Drainage vor." }
          }
        }
      ],
      leviers_du_vivant: [
        { 
          nom: "Hydratation massive", 
          frequence: "2,5L d'eau/jour", 
          role: "Un drainant rénal ne fonctionne que si le volume d'eau à filtrer est suffisant.",
          translations: {
            en: { nom: "Massive hydration", frequence: "2.5L water/day", role: "A renal drainer only works if the volume of water to be filtered is sufficient." },
            de: { nom: "Massive Hydratation", frequence: "2,5 l Wasser/Tag", role: "Ein Nierendrainagemittel funktioniert nur, wenn das zu filternde Wasservolumen ausreichend ist." }
          }
        }
      ]
    },
    convergence_ancestrale: "Utilisée depuis le Moyen Âge en Europe pour les 'eaux' (œdèmes) et les infections urinaires.",
    synergies_recommandees: ["pissenlit", "orthosiphon", "queue_de_cerise"],
    precautions: "Déconseillé en cas d'insuffisance rénale ou cardiaque sévère (nécessitant une restriction hydrique).",
    translations: {
      en: {
        nom_commun: "Mouse-ear Hawkweed",
        partie_utilisee: "Dried whole plant",
        preuve_scientifique: "Powerful potassium-sparing diuretic (unlike chemical diuretics). Anti-inflammatory action on the urinary tract. Master of drainage of hydric overloads.",
        convergence_ancestrale: "Used since the Middle Ages in Europe for 'waters' (edema) and urinary tract infections.",
        precautions: "Not recommended in case of severe renal or cardiac insufficiency (requiring fluid restriction)."
      },
      de: {
        nom_commun: "Kleines Habichtskraut",
        partie_utilisee: "Getrocknete ganze Pflanze",
        preuve_scientifique: "Leistungsstarkes kaliumsparendes Diuretikum (im Gegensatz zu chemischen Diuretika). Entzündungshemmende Wirkung auf die Harnwege. Meister der Drainage von Wasserüberlastungen.",
        convergence_ancestrale: "Seit dem Mittelalter in Europa gegen 'Wasser' (Ödeme) und Harnwegsinfektionen verwendet.",
        precautions: "Nicht empfohlen bei schwerer Nieren- oder Herzinsuffizienz (die eine Flüssigkeitsbeschränkung erfordert)."
      }
    }
  },
  {
    plant_id: "malva_sylvestris",
    nom_commun: "Mauve",
    nom_latin: "Malva sylvestris",
    partie_utilisee: "Feuilles et fleurs séchées",
    famille_bloom: "Réparateur (Muqueuse Intestinale)",
    terrains_cibles: [
        "T2_Intestin",
        "T9_Peau",
        "T1_Emonctoires"
      ],
    actifs_cles: [
      { nom: "Mucilages", polarite: "Hydrosoluble", translations: { en: { nom: "Mucilages", polarite: "Water-soluble" }, de: { nom: "Schleimstoffe", polarite: "Wasserlöslich" } } },
      { nom: "Anthocyanes", polarite: "Hydrosoluble", translations: { en: { nom: "Anthocyanins", polarite: "Water-soluble" }, de: { nom: "Anthocyane", polarite: "Wasserlöslich" } } },
      { nom: "Flavonoïdes", polarite: "Hydrosoluble", translations: { en: { nom: "Flavonoids", polarite: "Water-soluble" }, de: { nom: "Flavonoide", polarite: "Wasserlöslich" } } }
    ],
    preuve_scientifique: "Action émolliente, anti-inflammatoire et protectrice des muqueuses (intestin, gorge, peau). Les mucilages forment un film protecteur sur l'épithélium intestinal, réduisant l'irritation et la perméabilité.",
    pourquoi_bloomlab: {
      probleme_traditionnel: "Les mucilages sont extrêmement thermolabiles. Une température >60°C les dégrade en sucres simples, annulant l'effet protecteur.",
      phase_A: { temp: "50°C", temps: "1h30", solvant: "Eau distillée + Glycérine (70/30)", cible: "Mucilages, anthocyanes", translations: { en: { cible: "Mucilages, anthocyanins" }, de: { cible: "Schleimstoffe, Anthocyane" } } },
      phase_B: { temp: "40°C", temps: "2h00", solvant: "Alcool bio 70°", cible: "Stabilisation douce", translations: { en: { cible: "Gentle stabilization" }, de: { cible: "Sanfte Stabilisierung" } } },
      resultat: "Une extraction douce préservant les mucilages pour une protection maximale des muqueuses enflammées.",
      translations: {
        en: {
          probleme_traditionnel: "Mucilages are extremely heat-sensitive. Temperatures >60°C degrade them into simple sugars, cancelling the protective effect.",
          resultat: "A gentle extraction preserving mucilages for maximum protection of inflamed mucous membranes."
        },
        de: {
          probleme_traditionnel: "Schleimstoffe sind extrem thermolabil. Temperaturen >60°C bauen sie zu einfachen Zuckern ab, was die Schutzwirkung aufhebt.",
          resultat: "Eine sanfte Extraktion, die Schleimstoffe bewahrt, für maximalen Schutz entzündeter Schleimhäute."
        }
      }
    },
    recette_pas_a_pas: {
        batch_standard: "Cible BloomLab : 750ml de solvant + 75g de plantes (Rendement final estimé : ~600-650ml)",
        ingredients: {
          phase_A: [
            "50g de Mauve (feuilles/fleurs)",
            "350ml d'Eau distillée",
            "150ml de Glycérine végétale"
          ],
          phase_B: [
            "25g de Mauve",
            "250ml d'Alcool bio 70°"
          ]
        },
        preparation: [
          "La plante est très volumineuse. Tassez fermement les 50g.",
          "Mixez les 25g restants pour la Phase B."
        ],
        phase_A_instructions: [
          "Versez eau et glycérine. Ajoutez les 50g de plante tassée.",
          "Fermez, mode manuel 'OIL', TEMP 50°C, TEMPS 1h30. START."
        ],
        transition: [
          "1. Éteignez. Laissez reposer 20 minutes.",
          "2. TEST SENSORIEL OBLIGATOIRE : Posez votre main sur la paroi extérieure de la cuve. Elle doit être 'tiède au toucher' (environ 40°C), et non brûlante.",
          "3. ⚠️ SÉCURITÉ : N'ajoutez l'alcool que lorsque ce test est validé."
        ],
        phase_B_instructions: [
          "Ajoutez l'alcool et les 25g de plante mixée.",
          "Fermez, mode manuel 'OIL', TEMP 40°C, TEMPS 2h00. START."
        ],
        filtration_et_finition: [
          "Filtrez à l'étamine. Pressez doucement (le liquide sera visqueux).",
          "Mettez en flacon ambré."
        ]
      },
    socle_synergique: {
      cofacteurs_complements: [
        { 
          nom: "L-Glutamine", 
          dose: "5g le matin", 
          role: "Synergie parfaite : la Mauve apaise la muqueuse, la Glutamine nourrit les entérocytes.",
          translations: {
            en: { nom: "L-Glutamine", dose: "5g in the morning", role: "Perfect synergy: Mallow soothes the mucosa, Glutamine nourishes the enterocytes." },
            de: { nom: "L-Glutamin", dose: "5g am Morgen", role: "Perfekte Synergie: Malve beruhigt die Schleimhaut, Glutamin nährt die Enterozyten." }
          }
        },
        { 
          nom: "Zinc Carnosine", 
          dose: "75mg 2x/jour", 
          role: "Réparation ciblée des jonctions serrées.",
          translations: {
            en: { nom: "Zinc Carnosine", dose: "75mg 2x/day", role: "Targeted repair of tight junctions." },
            de: { nom: "Zink-Carnosin", dose: "75mg 2x/Tag", role: "Gezielte Reparatur von 'Tight Junctions'." }
          }
        }
      ],
      leviers_du_vivant: [
        { 
          nom: "Éviction des irritants", 
          frequence: "Pendant la cure", 
          role: "Éviter gluten, lait, épices fortes pour laisser le film de mucilage agir sans être détruit.",
          translations: {
            en: { nom: "Avoidance of irritants", frequence: "During the course", role: "Avoid gluten, milk, strong spices to let the mucilage film act without being destroyed." },
            de: { nom: "Vermeidung von Reizstoffen", frequence: "Während der Kur", role: "Gluten, Milch und scharfe Gewürze vermeiden, damit der Schleimfilm wirken kann, ohne zerstört zu werden." }
          }
        }
      ]
    },
    convergence_ancestrale: "La 'mauvaise' (malva) d'Hildegarde de Bingen, utilisée pour adoucir toutes les inflammations internes et externes.",
    synergies_recommandees: ["plantago_major", "aloe_vera", "calendula_officinalis"],
    precautions: "Généralement sûre. À haute dose peut avoir un léger effet laxatif.",
    translations: {
      en: {
        nom_commun: "Mallow",
        partie_utilisee: "Dried leaves and flowers",
        preuve_scientifique: "Emollient, anti-inflammatory and protective action on the mucous membranes (intestine, throat, skin). Mucilages form a protective film on the intestinal epithelium, reducing irritation and permeability.",
        convergence_ancestrale: "'Malva' of Hildegard of Bingen, used to soften all internal and external inflammations.",
        precautions: "Generally safe. At high dose can have a mild laxative effect."
      },
      de: {
        nom_commun: "Malve",
        partie_utilisee: "Getrocknete Blätter und Blüten",
        preuve_scientifique: "Erweichende, entzündungshemmende und schützende Wirkung auf die Schleimhäute (Darm, Rachen, Haut). Mucilage bilden einen Schutzfilm auf dem Darmepithel und reduzieren Reizungen und Durchlässigkeit.",
        convergence_ancestrale: "'Malva' der Hildegard von Bingen, verwendet zur Linderung aller inneren und äußeren Entzündungen.",
        precautions: "Allgemein sicher. In hohen Dosen kann es eine leicht abführende Wirkung haben."
      }
    }
  },
  {
    plant_id: "asparagus_racemosus",
    nom_commun: "Shatavari",
    nom_latin: "Asparagus racemosus",
    partie_utilisee: "Racine séchée",
    famille_bloom: "Réparateur (Yin Féminin & Muqueuses)",
    terrains_cibles: [
        "T8_Hormonal",
        "T2_Intestin",
        "T7_Psycho_emotionnel"
      ],
    actifs_cles: [
      { nom: "Shatavarines (Saponines stéroïdiques)", polarite: "Liposoluble", translations: { en: { nom: "Shatavarins (Steroidal saponins)", polarite: "Fat-soluble" }, de: { nom: "Shatavarine (Steroidale Saponine)", polarite: "Fettlöslich" } } },
      { nom: "Mucilages", polarite: "Hydrosoluble", translations: { en: { nom: "Mucilages", polarite: "Water-soluble" }, de: { nom: "Schleimstoffe", polarite: "Wasserlöslich" } } },
      { nom: "Alcaloïdes", polarite: "Mixte", translations: { en: { nom: "Alkaloids", polarite: "Mixed" }, de: { nom: "Alkaloide", polarite: "Gemischt" } } }
    ],
    preuve_scientifique: "Adaptogène féminin majeur. Soutient la production d'œstrogènes naturels, hydrate les muqueuses (sècheresse vaginale, digestive), et module l'humeur via l'axe HPA.",
    pourquoi_bloomlab: {
      probleme_traditionnel: "Les shatavarines (actifs hormonaux) sont liposolubles, tandis que les mucilages (hydratation) sont hydrosolubles et thermolabiles.",
      phase_A: { temp: "65°C", temps: "2h00", solvant: "Eau distillée + Glycérine (70/30)", cible: "Mucilages, alcaloïdes hydrosolubles", translations: { en: { cible: "Mucilages, water-soluble alkaloids" }, de: { cible: "Schleimstoffe, wasserlösliche Alkaloide" } } },
      phase_B: { temp: "50°C", temps: "3h00", solvant: "Alcool bio 96°", cible: "Shatavarines", translations: { en: { cible: "Shatavarins" }, de: { cible: "Shatavarine" } } },
      resultat: "Une extraction hormonale et hydratante complète pour le soutien du Yin féminin.",
      translations: {
        en: {
          probleme_traditionnel: "Shatavarins (hormonal actives) are fat-soluble, while mucilages (hydration) are water-soluble and heat-sensitive.",
          resultat: "A complete hormonal and hydrating extraction for the support of the female Yin."
        },
        de: {
          probleme_traditionnel: "Shatavarine (hormonelle Wirkstoffe) sind fettlöslich, während Schleimstoffe (Hydratation) wasserlöslich und thermolabil sind.",
          resultat: "Eine vollständige hormonelle und hydratisierende Extraktion zur Unterstützung des weiblichen Yin."
        }
      }
    },
    recette_pas_a_pas: {
        batch_standard: "Cible BloomLab : 750ml de solvant + 75g de plantes (Rendement final estimé : ~600-650ml)",
        ingredients: {
          phase_A: [
            "50g de Racine de Shatavari (copeaux)",
            "350ml d'Eau distillée",
            "150ml de Glycérine végétale"
          ],
          phase_B: [
            "25g de Racine de Shatavari (poudre)",
            "250ml d'Alcool bio 96°"
          ]
        },
        preparation: [
          "Concassez les 50g de racine pour la Phase A.",
          "Mixez les 25g restants en poudre pour la Phase B."
        ],
        phase_A_instructions: [
          "Versez eau et glycérine. Ajoutez les 50g de copeaux.",
          "Fermez, mode manuel 'OIL', TEMP 65°C, TEMPS 2h00. START."
        ],
        transition: [
          "1. Éteignez. Laissez reposer 20 minutes.",
          "2. TEST SENSORIEL OBLIGATOIRE : Posez votre main sur la paroi extérieure de la cuve. Elle doit être 'tiède au toucher' (environ 40°C), et non brûlante.",
          "3. ⚠️ SÉCURITÉ : N'ajoutez l'alcool que lorsque ce test est validé."
        ],
        phase_B_instructions: [
          "Ajoutez l'alcool et les 25g de poudre.",
          "Fermez, mode manuel 'OIL', TEMP 50°C, TEMPS 3h00. START."
        ],
        filtration_et_finition: [
          "Filtrez à l'étamine. Pressez fermement le marc.",
          "Le liquide sera brun clair, légèrement visqueux. Mettez en flacon ambré."
        ]
      },
    socle_synergique: {
      cofacteurs_complements: [
        { 
          nom: "Oméga-3", 
          dose: "2g/jour", 
          role: "Fournit les lipides nécessaires à la synthèse hormonale et à l'hydratation cellulaire.",
          translations: {
            en: { nom: "Omega-3", dose: "2g/day", role: "Provides the lipids necessary for hormonal synthesis and cellular hydration." },
            de: { nom: "Omega-3", dose: "2g/Tag", role: "Liefert die für die Hormonsynthese und zelluläre Hydratation notwendigen Lipide." }
          }
        },
        { 
          nom: "Magnésium", 
          dose: "300mg/jour", 
          role: "Soutient le système nerveux pendant les fluctuations hormonales.",
          translations: {
            en: { nom: "Magnesium", dose: "300mg/day", role: "Supports the nervous system during hormonal fluctuations." },
            de: { nom: "Magnesium", dose: "300mg/Tag", role: "Unterstützt das Nervensystem bei hormonellen Schwankungen." }
          }
        }
      ],
      leviers_du_vivant: [
        { 
          nom: "Hydratation profonde", 
          frequence: "Quotidienne", 
          role: "Le Shatavari attire l'eau dans les muqueuses ; boire 2L d'eau est obligatoire pour que l'effet 'Yin' opère.",
          translations: {
            en: { nom: "Deep hydration", frequence: "Daily", role: "Shatavari draws water into the mucous membranes; drinking 2L of water is mandatory for the 'Yin' effect to operate." },
            de: { nom: "Tiefe Hydratation", frequence: "Täglich", role: "Shatavari zieht Wasser in die Schleimhäute; das Trinken von 2 l Wasser ist obligatorisch, damit der 'Yin'-Effekt eintreten kann." }
          }
        }
      ]
    },
    convergence_ancestrale: "'Celle qui possède cent maris' en Ayurveda. Tonique féminin sacré pour la fertilité et la longévité.",
    synergies_recommandees: ["vitex_agnus_castus", "alchemilla_vulgaris", "maca_lepidium"],
    precautions: "Déconseillé en cas de cancers hormono-dépendants (sein, utérus) ou d'endométriose sévère sans avis médical (effet phyto-œstrogénique).",
    translations: {
      en: {
        nom_commun: "Shatavari",
        partie_utilisee: "Dried root",
        preuve_scientifique: "Major female adaptogen. Supports natural estrogen production, hydrates mucous membranes (vaginal, digestive dryness), and modulates mood via the HPA axis.",
        convergence_ancestrale: "'She who possesses a hundred husbands' in Ayurveda. Sacred female tonic for fertility and longevity.",
        precautions: "Not recommended in case of hormone-dependent cancers (breast, uterus) or severe endometriosis without medical advice (phyto-estrogenic effect)."
      },
      de: {
        nom_commun: "Shatavari",
        partie_utilisee: "Getrocknete Wurzel",
        preuve_scientifique: "Wichtigstes weibliches Adaptogen. Unterstützt die natürliche Östrogenproduktion, hydratisiert die Schleimhäute (vaginale, digestive Trockenheit) und moduliert die Stimmung über die HPA-Achse.",
        convergence_ancestrale: "'Die, die hundert Ehemänner besitzt' im Ayurveda. Heiliges weibliches Stärkungsmittel für Fruchtbarkeit und Langlebigkeit.",
        precautions: "Nicht empfohlen bei hormonabhängigen Krebserkrankungen (Brust, Gebärmutter) oder schwerer Endometriose ohne ärztlichen Rat (phytoöstrogene Wirkung)."
      }
    }
  },
  {
    plant_id: "hericium_erinaceus",
    nom_commun: "Lion's Mane (Hydne hérisson)",
    nom_latin: "Hericium erinaceus",
    partie_utilisee: "Fruit (champignon) séché",
    famille_bloom: "Réparateur (Neuroplasticité)",
    terrains_cibles: [
        "T7_Psycho_emotionnel",
        "T5_HPA",
        "T2_Intestin"
      ],
    actifs_cles: [
      { nom: "Héricénones", polarite: "Liposoluble", translations: { en: { nom: "Hericenones", polarite: "Fat-soluble" }, de: { nom: "Hericenone", polarite: "Fettlöslich" } } },
      { nom: "Érinacines", polarite: "Liposoluble", translations: { en: { nom: "Erinacines", polarite: "Fat-soluble" }, de: { nom: "Erinacine", polarite: "Fettlöslich" } } },
      { nom: "Bêta-glucanes", polarite: "Hydrosoluble", translations: { en: { nom: "Beta-glucans", polarite: "Water-soluble" }, de: { nom: "Beta-Glucane", polarite: "Wasserlöslich" } } }
    ],
    preuve_scientifique: "Stimulation de la synthèse du NGF (Nerve Growth Factor). Amélioration de la cognition, de la mémoire et de l'humeur. Réparation de la barrière intestinale via la modulation du microbiote.",
    pourquoi_bloomlab: {
      probleme_traditionnel: "Les héricénones (NGF) sont liposolubles. La paroi de chitine nécessite une chaleur prolongée pour libérer les bêta-glucanes.",
      phase_A: { temp: "80°C", temps: "3h00", solvant: "Eau distillée + Glycérine (70/30)", cible: "Bêta-glucanes, polysaccharides", translations: { en: { cible: "Beta-glucans, polysaccharides" }, de: { cible: "Beta-Glucane, Polysaccharide" } } },
      phase_B: { temp: "50°C", temps: "3h00", solvant: "Alcool bio 96°", cible: "Héricénones, Érinacines", translations: { en: { cible: "Hericenones, Erinacines" }, de: { cible: "Hericenone, Erinacine" } } },
      resultat: "Une extraction neurologique et immunitaire complète pour le soutien de la neuroplasticité.",
      translations: {
        en: {
          probleme_traditionnel: "Hericenones (NGF) are fat-soluble. The chitin wall requires prolonged heat to release beta-glucans.",
          resultat: "A complete neurological and immune extraction for neuroplasticity support."
        },
        de: {
          probleme_traditionnel: "Hericenone (NGF) sind fettlöslich. Die Chitinwand erfordert längere Hitze, um Beta-Glucane freizusetzen.",
          resultat: "Eine vollständige neurologische und immunologische Extraktion zur Unterstützung der Neuroplastizität."
        }
      }
    },
    recette_pas_a_pas: {
        batch_standard: "Cible BloomLab : 750ml de solvant + 75g de plantes (Rendement final estimé : ~600-650ml)",
        ingredients: {
          phase_A: [
            "50g de Lion's Mane en poudre grossière",
            "350ml d'Eau distillée",
            "150ml de Glycérine végétale"
          ],
          phase_B: [
            "25g de Lion's Mane en poudre fine",
            "250ml d'Alcool bio 96°"
          ]
        },
        preparation: [
          "Utilisez du Lion's Mane déjà broyé. Séparez 50g pour la Phase A et 25g pour la Phase B."
        ],
        phase_A_instructions: [
          "Versez eau et glycérine. Ajoutez les 50g de poudre.",
          "Fermez, mode manuel 'OIL', TEMP 80°C, TEMPS 3h00. START."
        ],
        transition: [
          "1. Éteignez. Laissez reposer 30 minutes.",
          "2. TEST SENSORIEL OBLIGATOIRE : Posez votre main sur la paroi extérieure de la cuve. Elle doit être 'tiède au toucher' (environ 40°C), et non brûlante.",
          "3. ⚠️ SÉCURITÉ : N'ajoutez l'alcool que lorsque ce test est validé."
        ],
        phase_B_instructions: [
          "Ajoutez l'alcool et les 25g de poudre fine.",
          "Fermez, mode manuel 'OIL', TEMP 50°C, TEMPS 3h00. START."
        ],
        filtration_et_finition: [
          "Filtrez à l'étamine double épaisseur. Pressez très fermement.",
          "Le liquide sera brun ambré. Mettez en flacon ambré."
        ]
      },
    socle_synergique: {
        cofacteurs_complements: [
          {
            nom: "Oméga-3 (DHA)",
            dose: "1000mg/jour",
            role: "Le DHA est la brique structurelle des neurones que le Lion's Mane aide à réparer."
          },
          {
            nom: "Magnésium L-Thréonate",
            dose: "Selon protocole",
            role: "Seule forme de magnésium traversant efficacement la barrière hémato-encéphalique."
          }
        ],
        leviers_du_vivant: [
          {
            nom: "Apprentissage continu",
            frequence: "Quotidienne",
            role: "La neuroplasticité induite par le NGF nécessite une stimulation cognitive pour créer de nouvelles connexions."
          }
        ]
      },
    convergence_ancestrale: "Champignon de la clarté mentale en MTC, utilisé par les moines bouddhistes pour la méditation.",
    synergies_recommandees: [
        "bacopa_monnieri",
        "rhodiola_rosea",
        "ginkgo_biloba"
      ],
    precautions: "Peut causer de légères démangeaisons chez les sujets très sensibles (stimulation du NGF). Déconseillé en cas d'allergie aux champignons."
  },
  {
    plant_id: "inonotus_obliquus",
    nom_commun: "Chaga",
    nom_latin: "Inonotus obliquus",
    partie_utilisee: "Sclérote (champignon) séché",
    famille_bloom: "Chef d'Orchestre (Antioxydant Majeur)",
    terrains_cibles: [
        "T3_Immunité",
        "T6_Mitochondrie",
        "T8_Inflammation"
      ],
    actifs_cles: [
      { nom: "Mélanine", polarite: "Hydrosoluble", translations: { en: { nom: "Melanin", polarite: "Water-soluble" }, de: { nom: "Melanin", polarite: "Wasserlöslich" } } },
      { nom: "Acide bétulinique", polarite: "Liposoluble", translations: { en: { nom: "Betulinic acid", polarite: "Fat-soluble" }, de: { nom: "Betulinsäure", polarite: "Fettlöslich" } } },
      { nom: "SOD (Superoxyde Dismutase)", polarite: "Hydrosoluble/Thermolabile", translations: { en: { nom: "SOD (Superoxide Dismutase)", polarite: "Water-soluble/Heat-sensitive" }, de: { nom: "SOD (Superoxid-Dismutase)", polarite: "Wasserlöslich/Thermolabil" } } }
    ],
    preuve_scientifique: "L'un des antioxydants les plus puissants de la planète (ORAC > 100 000). Modulation immunitaire, protection de l'ADN contre le stress oxydatif, et soutien de la fonction hépatique.",
    pourquoi_bloomlab: {
      probleme_traditionnel: "Le Chaga est dur comme de la pierre. La mélanine et la SOD nécessitent une extraction aqueuse chaude mais contrôlée. L'acide bétulinique (anti-tumoral) nécessite un solvant organique.",
      phase_A: { temp: "75°C", temps: "3h00", solvant: "Eau distillée + Glycérine (70/30)", cible: "Mélanine, SOD, bêta-glucanes", translations: { en: { cible: "Melanin, SOD, beta-glucans" }, de: { cible: "Melanin, SOD, Beta-Glucane" } } },
      phase_B: { temp: "50°C", temps: "3h00", solvant: "Alcool bio 96°", cible: "Acide bétulinique, triterpènes", translations: { en: { cible: "Betulinic acid, triterpenes" }, de: { cible: "Betulinsäure, Triterpene" } } },
      resultat: "Une extraction antioxydante et immunitaire totale, capturant l'acide bétulinique rare du Chaga.",
      translations: {
        en: {
          probleme_traditionnel: "Chaga is stone-hard. Melanin and SOD require a hot but controlled aqueous extraction. Betulinic acid (anti-tumor) requires an organic solvent.",
          resultat: "A total antioxidant and immune extraction, capturing the rare betulinic acid from Chaga."
        },
        de: {
          probleme_traditionnel: "Chaga ist steinhart. Melanin und SOD erfordern eine heiße, aber kontrollierte wässrige Extraktion. Betulinsäure (Antitumormittel) erfordert ein organisches Lösungsmittel.",
          resultat: "Eine vollständige antioxidative und immunologische Extraktion, die die seltene Betulinsäure aus Chaga einfängt."
        }
      }
    },
    recette_pas_a_pas: {
        batch_standard: "Cible BloomLab : 750ml de solvant + 75g de plantes (Rendement final estimé : ~600-650ml)",
        ingredients: {
          phase_A: [
            "50g de Chaga en poudre grossière",
            "350ml d'Eau distillée",
            "150ml de Glycérine végétale"
          ],
          phase_B: [
            "25g de Chaga en poudre fine",
            "250ml d'Alcool bio 96°"
          ]
        },
        preparation: [
          "Le Chaga doit être finement broyé (texture de marc de café). Séparez 50g et 25g."
        ],
        phase_A_instructions: [
          "Versez eau et glycérine. Ajoutez les 50g de poudre.",
          "Fermez, mode manuel 'OIL', TEMP 75°C, TEMPS 3h00. START."
        ],
        transition: [
          "1. Éteignez. Laissez reposer 30 minutes.",
          "2. TEST SENSORIEL OBLIGATOIRE : Posez votre main sur la paroi extérieure de la cuve. Elle doit être 'tiède au toucher' (environ 40°C), et non brûlante.",
          "3. ⚠️ SÉCURITÉ : N'ajoutez l'alcool que lorsque ce test est validé."
        ],
        phase_B_instructions: [
          "Ajoutez l'alcool et les 25g de poudre fine.",
          "Fermez, mode manuel 'OIL', TEMP 50°C, TEMPS 3h00. START."
        ],
        filtration_et_finition: [
          "Filtrez à l'étamine double épaisseur. Pressez très fermement.",
          "Le liquide sera noir profond (mélanine). Mettez en flacon ambré ou violet (Miron)."
        ]
      },
    socle_synergique: {
      cofacteurs_complements: [
        { 
          nom: "Vitamine C", 
          dose: "500mg/jour", 
          role: "Régénère les antioxydants du Chaga après qu'ils aient neutralisé les radicaux libres.",
          translations: {
            en: { nom: "Vitamin C", dose: "500mg/day", role: "Regenerates Chaga's antioxidants after they have neutralized free radicals." },
            de: { nom: "Vitamin C", dose: "500mg/Tag", role: "Regeneriert die Antioxidantien von Chaga, nachdem sie freie Radikale neutralisiert haben." }
          }
        },
        { 
          nom: "Glutathion (ou NAC)", 
          dose: "Selon protocole", 
          role: "Synergie antioxydante majeure pour la détoxification cellulaire.",
          translations: {
            en: { nom: "Glutathione (or NAC)", dose: "According to protocol", role: "Major antioxidant synergy for cellular detoxification." },
            de: { nom: "Glutathion (oder NAC)", dose: "Nach Protokoll", role: "Wichtige antioxidative Synergie zur zellulären Entgiftung." }
          }
        }
      ],
      leviers_du_vivant: [
        { 
          nom: "Réduction de l'exposition aux toxines", 
          frequence: "Quotidienne", 
          role: "Le Chaga protège l'ADN, mais réduire l'exposition (plastiques, pesticides) diminue la charge oxydative globale.",
          translations: {
            en: { nom: "Reduction of toxin exposure", frequence: "Daily", role: "Chaga protects DNA, but reducing exposure (plastics, pesticides) decreases the overall oxidative load." },
            de: { nom: "Reduzierung der Schadstoffexposition", frequence: "Täglich", role: "Chaga schützt die DNA, aber die Reduzierung der Exposition (Kunststoffe, Pestizide) verringert die gesamte oxidative Belastung." }
          }
        }
      ]
    },
    convergence_ancestrale: "Champignon de l'immortalité en Sibérie et en MTC. Utilisé depuis des siècles pour la longévité.",
    synergies_recommandees: ["ganoderma_lucidum", "cordyceps_militaris", "curcuma_longa"],
    precautions: "Déconseillé en cas de maladies auto-immunes (stimulation immunitaire) ou de prise d'anticoagulants (acide bétulinique).",
    translations: {
      en: {
        nom_commun: "Chaga",
        partie_utilisee: "Dried sclerotium (mushroom)",
        preuve_scientifique: "One of the most powerful antioxidants on the planet (ORAC > 100,000). Immune modulation, DNA protection against oxidative stress, and liver function support.",
        convergence_ancestrale: "Mushroom of immortality in Siberia and TCM. Used for centuries for longevity.",
        precautions: "Not recommended in case of autoimmune diseases (immune stimulation) or taking anticoagulants (betulinic acid)."
      },
      de: {
        nom_commun: "Schiefer Schillerporling (Chaga)",
        partie_utilisee: "Getrocknetes Sklerotium (Pilz)",
        preuve_scientifique: "Eines der stärksten Antioxidantien der Welt (ORAC > 100.000). Immunmodulation, DNA-Schutz vor oxidativem Stress und Unterstützung der Leberfunktion.",
        convergence_ancestrale: "Pilz der Unsterblichkeit in Sibirien und der TCM. Seit Jahrhunderten für Langlebigkeit verwendet.",
        precautions: "Bei Autoimmunerkrankungen (Immunstimulation) oder Einnahme von Antikoagulanzien (Betulinsäure) nicht empfohlen."
      }
    }
  },
  {
    plant_id: "hamamelis_virginiana",
    nom_commun: "Hamamélis",
    nom_latin: "Hamamelis virginiana",
    partie_utilisee: "Feuilles et écorce séchées",
    famille_bloom: "Réparateur (Circulation Veineuse & Lymphatique)",
    terrains_cibles: [
        "T1_Emonctoires",
        "T9_Peau",
        "T8_Inflammation"
      ],
    actifs_cles: [
      { nom: "Tanins galliques", polarite: "Hydrosoluble", translations: { en: { nom: "Gallic tannins", polarite: "Water-soluble" }, de: { nom: "Gallusgerbstoffe", polarite: "Wasserlöslich" } } },
      { nom: "Hamamélitane", polarite: "Hydrosoluble", translations: { en: { nom: "Hamamelitannin", polarite: "Water-soluble" }, de: { nom: "Hamamelitannin", polarite: "Wasserlöslich" } } },
      { nom: "Flavonoïdes", polarite: "Hydrosoluble", translations: { en: { nom: "Flavonoids", polarite: "Water-soluble" }, de: { nom: "Flavonoide", polarite: "Wasserlöslich" } } }
    ],
    preuve_scientifique: "Action veinotonique, lymphagogue et anti-inflammatoire puissante. Réduit la perméabilité capillaire et l'œdème. Maître des jambes lourdes, de la couperose et des hémorroïdes.",
    pourquoi_bloomlab: {
      probleme_traditionnel: "Les tanins s'extraient bien à l'eau, mais une chaleur excessive (>70°C) les rend trop astringents et irritants pour les muqueuses.",
      phase_A: { temp: "65°C", temps: "2h00", solvant: "Eau distillée + Glycérine (70/30)", cible: "Hamamélitane, flavonoïdes", translations: { en: { cible: "Hamamelitannin, flavonoids" }, de: { cible: "Hamamelitannin, Flavonoide" } } },
      phase_B: { temp: "50°C", temps: "3h00", solvant: "Alcool bio 96°", cible: "Tanins contrôlés, composés lipophiles", translations: { en: { cible: "Controlled tannins, lipophilic compounds" }, de: { cible: "Kontrollierte Gerbstoffe, lipophile Verbindungen" } } },
      resultat: "Une extraction veinotonique complète sans astringence excessive, idéale pour la circulation.",
      translations: {
        en: {
          probleme_traditionnel: "Tannins extract well in water, but excessive heat (>70°C) makes them too astringent and irritating to mucous membranes.",
          resultat: "A complete veinotonic extraction without excessive astringency, ideal for circulation."
        },
        de: {
          probleme_traditionnel: "Gerbstoffe lassen sich gut in Wasser extrahieren, aber übermäßige Hitze (>70°C) macht sie zu adstringierend und reizend für die Schleimhäute.",
          resultat: "Eine vollständige venotonische Extraktion ohne übermäßige Adstringenz, ideal für die Zirkulation."
        }
      }
    },
    recette_pas_a_pas: {
        batch_standard: "Cible BloomLab : 750ml de solvant + 75g de plantes (Rendement final estimé : ~600-650ml)",
        ingredients: {
          phase_A: [
            "50g d'Hamamélis (feuilles/écorce)",
            "350ml d'Eau distillée",
            "150ml de Glycérine végétale"
          ],
          phase_B: [
            "25g d'Hamamélis",
            "250ml d'Alcool bio 96°"
          ]
        },
        preparation: [
          "Concassez grossièrement les 50g pour la Phase A.",
          "Mixez les 25g restants pour la Phase B."
        ],
        phase_A_instructions: [
          "Versez eau et glycérine. Ajoutez les 50g de plante.",
          "Fermez, mode manuel 'OIL', TEMP 65°C, TEMPS 2h00. START."
        ],
        transition: [
          "1. Éteignez. Laissez reposer 20 minutes.",
          "2. TEST SENSORIEL OBLIGATOIRE : Posez votre main sur la paroi extérieure de la cuve. Elle doit être 'tiède au toucher' (environ 40°C), et non brûlante.",
          "3. ⚠️ SÉCURITÉ : N'ajoutez l'alcool que lorsque ce test est validé."
        ],
        phase_B_instructions: [
          "Ajoutez l'alcool et les 25g de plante mixée.",
          "Fermez, mode manuel 'OIL', TEMP 50°C, TEMPS 3h00. START."
        ],
        filtration_et_finition: [
          "Filtrez à l'étamine. Pressez le marc.",
          "Le liquide sera brun-rouge. Mettez en flacon ambré."
        ]
      },
    socle_synergique: {
      cofacteurs_complements: [
        { 
          nom: "Vitamine C + Bioflavonoïdes (Rutine)", 
          dose: "500mg/jour", 
          role: "Renforce la paroi des capillaires en synergie avec l'hamamélis.",
          translations: {
            en: { nom: "Vitamin C + Bioflavonoids (Rutin)", dose: "500mg/day", role: "Strengthens capillary walls in synergy with witch hazel." },
            de: { nom: "Vitamin C + Bioflavonoide (Rutin)", dose: "500mg/Tag", role: "Stärkt die Kapillarwände in Synergie mit Hamamelis." }
          }
        },
        { 
          nom: "Magnésium", 
          dose: "300mg/jour", 
          role: "Relaxe la paroi veineuse, réduisant la congestion.",
          translations: {
            en: { nom: "Magnesium", dose: "300mg/day", role: "Relaxes the venous wall, reducing congestion." },
            de: { nom: "Magnesium", dose: "300mg/Tag", role: "Entspannt die Venenwand und reduziert Stauungen." }
          }
        }
      ],
      leviers_du_vivant: [
        { 
          nom: "Douche écossaise (jambes)", 
          frequence: "Quotidienne", 
          role: "L'alternance chaud/froid active la pompe veineuse, potentialisant l'effet de l'hamamélis.",
          translations: {
            en: { nom: "Scottish shower (legs)", frequence: "Daily", role: "Alternating hot/cold activates the venous pump, potentiating witch hazel's effect." },
            de: { nom: "Wechseldusche (Beine)", frequence: "Täglich", role: "Der Wechsel von warm/kalt aktiviert die Venenpumpe und verstärkt die Wirkung von Hamamelis." }
          }
        }
      ]
    },
    convergence_ancestrale: "Arbre magique des Amérindiens, utilisé pour les saignements et les inflammations.",
    synergies_recommandees: ["vitis_vinifera", "centella_asiatica", "marronnier_indien"],
    precautions: "En raison de sa teneur en tanins, une consommation excessive peut causer de la constipation. Faire des pauses.",
    translations: {
      en: {
        nom_commun: "Witch Hazel",
        partie_utilisee: "Dried leaves and bark",
        preuve_scientifique: "Powerful veinotonic, lymphagogue and anti-inflammatory action. Reduces capillary permeability and edema. Master of heavy legs, rosacea and hemorrhoids.",
        convergence_ancestrale: "'Magic tree' of Native Americans, used for bleeding and inflammation.",
        precautions: "Due to its tannin content, excessive consumption can cause constipation. Take breaks."
      },
      de: {
        nom_commun: "Hamamelis (Zaubernuss)",
        partie_utilisee: "Getrocknete Blätter und Rinde",
        preuve_scientifique: "Starke venotonische, lymphatische und entzündungshemmende Wirkung. Reduziert die Durchlässigkeit der Kapillaren und Ödeme. Meister der schweren Beine, Couperose und Hämorrhoiden.",
        convergence_ancestrale: "'Zauberbaum' der amerikanischen Ureinwohner, verwendet gegen Blutungen und Entzündungen.",
        precautions: "Aufgrund des Gerbstoffgehalts kann übermäßiger Verzehr zu Verstopfung führen. Pausen einlegen."
      }
    }
  },
  {
    plant_id: "moringa_oleifera",
    nom_commun: "Moringa",
    nom_latin: "Moringa oleifera",
    partie_utilisee: "Feuilles séchées",
    famille_bloom: "Pharmacie Intérieure (Nutrition Cellulaire Dense)",
    terrains_cibles: [
        "T6_Mitochondrie",
        "T3_Immunité",
        "T5_HPA"
      ],
    actifs_cles: [
      { nom: "Isothiocyanates", polarite: "Liposoluble", translations: { en: { nom: "Isothiocyanates", polarite: "Fat-soluble" }, de: { nom: "Isothiocyanate", polarite: "Fettlöslich" } } },
      { nom: "Vitamines (A, C, E)", polarite: "Mixte", translations: { en: { nom: "Vitamins (A, C, E)", polarite: "Mixed" }, de: { nom: "Vitamine (A, C, E)", polarite: "Gemischt" } } },
      { nom: "Minéraux (Fer, Calcium)", polarite: "Hydrosoluble", translations: { en: { nom: "Minerals (Iron, Calcium)", polarite: "Water-soluble" }, de: { nom: "Mineralstoffe (Eisen, Kalzium)", polarite: "Wasserlöslich" } } }
    ],
    preuve_scientifique: "Densité nutritionnelle exceptionnelle. Action anti-inflammatoire via les isothiocyanates (similaires au sulforaphane). Soutien de l'énergie cellulaire et de l'immunité.",
    pourquoi_bloomlab: {
      probleme_traditionnel: "Les vitamines et les isothiocyanates sont extrêmement thermolabiles. Une chaleur >65°C détruit 80% de la valeur nutritionnelle.",
      phase_A: { temp: "60°C", temps: "1h30", solvant: "Eau distillée + Glycérine (70/30)", cible: "Minéraux, vitamines hydrosolubles", translations: { en: { cible: "Minerals, water-soluble vitamins" }, de: { cible: "Mineralstoffe, wasserlösliche Vitamine" } } },
      phase_B: { temp: "45°C", temps: "2h00", solvant: "Alcool bio 70°", cible: "Isothiocyanates, vitamines liposolubles", translations: { en: { cible: "Isothiocyanates, fat-soluble vitamins" }, de: { cible: "Isothiocyanate, fettlösliche Vitamine" } } },
      resultat: "Une extraction nutritive à froid préservant l'intégrité des vitamines et des composés soufrés.",
      translations: {
        en: {
          probleme_traditionnel: "Vitamins and isothiocyanates are extremely heat-sensitive. Heat >65°C destroys 80% of the nutritional value.",
          resultat: "A nutrient-rich cold extraction preserving the integrity of vitamins and sulfur compounds."
        },
        de: {
          probleme_traditionnel: "Vitamine und Isothiocyanate sind extrem hitzeempfindlich. Temperaturen >65°C zerstören 80% des Nährwerts.",
          resultat: "Eine nährstoffreiche Kaltextraktion, die die Integrität von Vitaminen und Schwefelverbindungen bewahrt."
        }
      }
    },
    recette_pas_a_pas: {
        batch_standard: "Cible BloomLab : 750ml de solvant + 75g de plantes (Rendement final estimé : ~600-650ml)",
        ingredients: {
          phase_A: [
            "50g de Feuilles de Moringa",
            "350ml d'Eau distillée",
            "150ml de Glycérine végétale"
          ],
          phase_B: [
            "25g de Feuilles de Moringa",
            "250ml d'Alcool bio 70°"
          ]
        },
        preparation: [
          "Les feuilles sont volumineuses. Tassez les 50g dans la cuve.",
          "Mixez les 25g restants pour la Phase B."
        ],
        phase_A_instructions: [
          "Versez eau et glycérine. Ajoutez les 50g de feuilles tassées.",
          "Fermez, mode manuel 'OIL', TEMP 60°C, TEMPS 1h30. START."
        ],
        transition: [
          "1. Éteignez. Laissez reposer 20 minutes.",
          "2. TEST SENSORIEL OBLIGATOIRE : Posez votre main sur la paroi extérieure de la cuve. Elle doit être 'tiède au toucher' (environ 40°C), et non brûlante.",
          "3. ⚠️ SÉCURITÉ : N'ajoutez l'alcool que lorsque ce test est validé."
        ],
        phase_B_instructions: [
          "Ajoutez l'alcool et les 25g de feuilles mixées.",
          "Fermez, mode manuel 'OIL', TEMP 45°C, TEMPS 2h00. START."
        ],
        filtration_et_finition: [
          "Filtrez à l'étamine. Pressez le marc.",
          "Le liquide sera vert foncé. Mettez en flacon ambré."
        ]
      },
    socle_synergique: {
      cofacteurs_complements: [
        { 
          nom: "Fer (si carence)", 
          dose: "Selon bilan", 
          role: "Le Moringa apporte du fer végétal, mais un complément peut être nécessaire en cas d'anémie avérée.",
          translations: {
            en: { nom: "Iron (if deficient)", dose: "According to tests", role: "Moringa provides plant iron, but a supplement may be necessary in case of proven anemia." },
            de: { nom: "Eisen (bei Mangel)", dose: "Nach Befund", role: "Moringa liefert pflanzliches Eisen, aber bei nachgewiesener Anämie kann ein Ergänzungsmittel erforderlich sein." }
          }
        },
        { 
          nom: "Vitamine C", 
          dose: "500mg/jour", 
          role: "Augmente l'absorption du fer végétal du Moringa de 300%.",
          translations: {
            en: { nom: "Vitamin C", dose: "500mg/day", role: "Increases plant iron absorption from Moringa by 300%." },
            de: { nom: "Vitamin C", dose: "500mg/Tag", role: "Erhöht die Aufnahme von pflanzlichem Eisen aus Moringa um 300%." }
          }
        }
      ],
      leviers_du_vivant: [
        { 
          nom: "Alimentation dense en nutriments", 
          frequence: "Quotidienne", 
          role: "Le Moringa comble les carences, mais une alimentation vivante reste la base de la nutrition cellulaire.",
          translations: {
            en: { nom: "Nutrient-dense diet", frequence: "Daily", role: "Moringa fills deficiencies, but a living diet remains the base of cellular nutrition." },
            de: { nom: "Nährstoffreiche Ernährung", frequence: "Täglich", role: "Moringa füllt Mängel auf, aber eine lebendige Ernährung bleibt die Basis der zellulären Ernährung." }
          }
        }
      ]
    },
    convergence_ancestrale: "L'arbre de vie en Ayurveda et en médecine traditionnelle africaine. Utilisé pour la malnutrition et la vitalité.",
    synergies_recommandees: ["spirulina", "chlorella", "ortica_dioica"],
    precautions: "Déconseillé en début de grossesse (effet utérotonique léger des racines/écorces, moins les feuilles, mais prudence). Peut avoir un effet laxatif à haute dose.",
    translations: {
      en: {
        nom_commun: "Moringa",
        partie_utilisee: "Dried leaves",
        preuve_scientifique: "Exceptional nutritional density. Anti-inflammatory action via isothiocyanates (similar to sulforaphane). Support for cellular energy and immunity.",
        convergence_ancestrale: "Tree of life in Ayurveda and traditional African medicine. Used for malnutrition and vitality.",
        precautions: "Not recommended at the beginning of pregnancy (slight uterotonic effect of roots/bark, less so for leaves, but caution). May have a laxative effect at high dose."
      },
      de: {
        nom_commun: "Moringa",
        partie_utilisee: "Getrocknete Blätter",
        preuve_scientifique: "Außergewöhnliche Nährstoffdichte. Entzündungshemmende Wirkung über Isothiocyanate (ähnlich wie Sulforaphan). Unterstützung der Zellenergie und des Immunsystems.",
        convergence_ancestrale: "Baum des Lebens im Ayurveda und in der traditionellen afrikanischen Medizin. Wird gegen Unterernährung und für Vitalität verwendet.",
        precautions: "Zu Beginn der Schwangerschaft nicht empfohlen (leichte uterotonische Wirkung der Wurzeln/Rinde, weniger bei Blättern, aber Vorsicht). In hohen Dosen kann es abführend wirken."
      }
    }
  },
  {
    "plant_id": "allium_sativum",
    "nom_commun": "Ail (Vieilli ou Noir)",
    "nom_latin": "Allium sativum",
    "partie_utilisee": "Gousses séchées",
    "famille_bloom": "Pharmacie Intérieure (Cardiovasculaire & Antimicrobien)",
    "terrains_cibles": ["T8_Inflammation", "T1_Intestin", "T3_Immunité"],
    "actifs_cles": [
      {"nom": "S-allyl-cystéine (SAC)", "polarite": "Hydrosoluble", "translations": { "en": { "nom": "S-allyl-cysteine (SAC)", "polarite": "Water-soluble" }, "de": { "nom": "S-Allylcystein (SAC)", "polarite": "Wasserlöslich" } } },
      {"nom": "Ajoène", "polarite": "Liposoluble", "translations": { "en": { "nom": "Ajoene", "polarite": "Fat-soluble" }, "de": { "nom": "Ajoen", "polarite": "Fettlöslich" } } },
      {"nom": "Allicine", "polarite": "Volatile/Enzymatique", "translations": { "en": { "nom": "Allicin", "polarite": "Volatile/Enzymatic" }, "de": { "nom": "Allicin", "polarite": "Flüchtig/Enzymatisch" } } }
    ],
    "preuve_scientifique": "L'ail vieilli contient de la SAC, stable et hydrosoluble, qui inhibe l'Enzyme de Conversion de l'Angiotensine (ECA). L'ajoène possède une action antiplaquettaire. L'allicine (issue de la transformation enzymatique de l'alliine par l'alliinase) est un puissant antimicrobien à large spectre.",
    "pourquoi_bloomlab": {
      "probleme_traditionnel": "L'allicine est détruite par la chaleur (>40°C) et les sucs gastriques. L'ail cru peut être irritant pour les muqueuses. L'extraction traditionnelle ne capture pas le ratio SAC/Allicine optimal.",
      "phase_A": {"temp": "35°C", "temps": "4h00", "solvant": "Eau distillée + Glycérine (70/30)", "cible": "Conversion enzymatique alliine -> allicine et stabilisation de la SAC", "translations": { "en": { "cible": "Enzymatic conversion alliine -> allicin and SAC stabilization" }, "de": { "cible": "Enzymatische Umwandlung Alliin -> Allicin und SAC-Stabilisierung" } } },
      "phase_B": {"temp": "45°C", "temps": "2h00", "solvant": "Alcool bio 96°", "cible": "Extraction de l'ajoène et des composés organosoufrés liposolubles", "translations": { "en": { "cible": "Extraction of ajoene and fat-soluble organosulfur compounds" }, "de": { "cible": "Extraktion von Ajoen und fettlöslichen organischen Schwefelverbindungen" } } },
      "resultat": "Un concentré antimicrobien et cardio-protecteur non irritant, sans les inconvénients de l'ail cru.",
      "translations": {
        "en": {
          "probleme_traditionnel": "Allicin is destroyed by heat (>40°C) and gastric juices. Raw garlic can be irritating to mucous membranes. Traditional extraction does not capture the optimal SAC/Allicin ratio.",
          "resultat": "A non-irritating antimicrobial and cardio-protective concentrate, without the drawbacks of raw garlic."
        },
        "de": {
          "probleme_traditionnel": "Allicin wird durch Hitze (>40°C) und Magensäfte zerstört. Roher Knoblauch kann die Schleimhäute reizen. Die traditionelle Extraktion erfasst nicht das optimale SAC/Allicin-Verhältnis.",
          "resultat": "Ein nicht reizendes antimikrobielles und herzschützendes Konzentrat ohne die Nachteile von rohem Knoblauch."
        }
      }
    },
    "recette_pas_a_pas": {
      "batch_standard": "750ml de solvant + 150g de gousses d'ail",
      "ingredients": {
        "phase_A": ["100g de gousses d'ail frais (écrasées)", "350ml d'Eau distillée", "150ml de Glycérine végétale"],
        "phase_B": ["50g de gousses d'ail (tranchées)", "250ml d'Alcool bio 96°"]
      },
      "preparation": [
        "1. Écrasez les 100g d'ail de la Phase A et laissez reposer 15 minutes à l'air libre (crucial pour l'activation de l'alliinase).",
        "2. Tranchez finement les 50g d'ail de la Phase B."
      ],
      "phase_A_instructions": [
        "1. Versez eau et glycérine dans la cuve.",
        "2. Ajoutez l'ail écrasé.",
        "3. TEMP: 35°C, TEMPS: 4h00. START."
      ],
      "transition": ["Vérifiez que la température est redescendue sous 35°C."],
      "phase_B_instructions": [
        "1. Ajoutez l'alcool et l'ail tranché.",
        "2. TEMP: 45°C, TEMPS: 2h00. START."
      ],
      "filtration_et_finition": ["Filtration à l'étamine fine. Mise en flacon ambré. Conservation au frais recommandée."]
    },
    "convergence_ancestrale": "Pungent de la médecine égyptienne et grecque, utilisé pour 'nettoyer les artères' et combattre les infections.",
    "synergies_recommandees": ["Aubépine (Cardio)", "Gingembre (Immunité)"],
    "precautions": "Interactions possibles avec les anticoagulants.",
    "translations": {
      "en": {
        "nom_commun": "Aged or Black Garlic",
        "partie_utilisee": "Dried cloves",
        "preuve_scientifique": "Aged garlic contains SAC, stable and water-soluble, which inhibits ACE. Ajoene has antiplatelet action. Allicin is a powerful broad-spectrum antimicrobial.",
        "convergence_ancestrale": "Pungent of Egyptian and Greek medicine, used to 'clean the arteries' and fight infections.",
        "precautions": "Possible interactions with anticoagulants."
      },
      "de": {
        "nom_commun": "Knoblauch (Gealtert oder Schwarz)",
        "partie_utilisee": "Getrocknete Zehen",
        "preuve_scientifique": "Gealterter Knoblauch enthält SAC, das ACE hemmt. Ajoene hat eine thrombozytenaggregationshemmende Wirkung. Allicin ist ein starkes antimikrobielles Breitbandmittel.",
        "convergence_ancestrale": "Scharfer Stoff der ägyptischen und griechischen Medizin, verwendet zur 'Reinigung der Arterien' und zur Infektionsbekämpfung.",
        "precautions": "Mögliche Wechselwirkungen mit Antikoagulanzien."
      }
    }
  },
  {
    "plant_id": "salix_alba",
    "nom_commun": "Saule Blanc",
    "nom_latin": "Salix alba",
    "partie_utilisee": "Écorce interne (Liber)",
    "famille_bloom": "Gâchette (Anti-inflammatoire)",
    "terrains_cibles": ["T8_Inflammation", "T6_Nerveux", "T10_Hormonal"],
    "actifs_cles": [
      {"nom": "Salicine (Hétéroside phénolique)", "polarite": "Hydrosoluble", "translations": { "en": { "nom": "Salicin (Phenolic glycoside)", "polarite": "Water-soluble" }, "de": { "nom": "Salicin (Phenolglycosid)", "polarite": "Wasserlöslich" } } },
      {"nom": "Flavonoïdes & Tanins", "polarite": "Hydrosoluble", "translations": { "en": { "nom": "Flavonoids & Tannins", "polarite": "Water-soluble" }, "de": { "nom": "Flavonoide & Gerbstoffe", "polarite": "Wasserlöslich" } } }
    ],
    "preuve_scientifique": "La salicine est convertie par la flore intestinale en acide salicylique. Contrairement à l'aspirine de synthèse, le saule blanc n'inhibe pas les COX-1 protectrices de l'estomac mais cible les COX-2 pro-inflammatoires.",
    "pourquoi_bloomlab": {
      "probleme_traditionnel": "L'écorce est très ligneuse. Une simple infusion ne libère que 20% de la salicine. Une ébullition dégrade les flavonoïdes protecteurs.",
      "phase_A": {"temp": "80°C", "temps": "3h00", "solvant": "Eau distillée + Glycérine", "cible": "Extraction forcée de la salicine par déstructuration de la lignine", "translations": { "en": { "cible": "Forced extraction of salicin by lignin destructuration" }, "de": { "cible": "Forcierte Extraktion von Salicin durch Lignin-Destrukturierung" } } },
      "phase_B": {"temp": "50°C", "temps": "2h00", "solvant": "Alcool bio 70°", "cible": "Fractions flavonoïques et tanins astringents", "translations": { "en": { "cible": "Flavonoid fractions and astringent tannins" }, "de": { "cible": "Flavonoidfraktionen und adstringierende Gerbstoffe" } } },
      "resultat": "Une 'Aspirine Végétale' à spectre complet, hautement dosée en salicine biodisponible.",
      "translations": {
        "en": {
          "probleme_traditionnel": "The bark is very woody. A simple infusion releases only 20% of the salicin. Boiling degrades protective flavonoids.",
          "resultat": "A full-spectrum 'Plant Aspirin', highly dosed in bioavailable salicin."
        },
        "de": {
          "probleme_traditionnel": "Die Rinde ist sehr holzig. Ein einfacher Aufguss setzt nur 20% des Salicins frei. Kochen baut schützende Flavonoide ab.",
          "resultat": "Ein Vollspektrum-'Pflanzen-Aspirin', hochdosiert mit bioverfügbarem Salicin."
        }
      }
    },
    "convergence_ancestrale": "Remède ancestral contre la douleur et la fièvre, utilisé par Hippocrate et les peuples amérindiens.",
    "synergies_recommandees": ["Reine des Prés", "Curcuma"],
    "precautions": "Contre-indiqué en cas d'allergie aux salicylés ou de traitement anticoagulant.",
    "translations": {
      "en": {
        "nom_commun": "White Willow",
        "partie_utilisee": "Inner bark (Liber)",
        "preuve_scientifique": "Salicin is converted by intestinal flora into salicylic acid. Unlike synthetic aspirin, white willow does not inhibit stomach-protecting COX-1 but targets pro-inflammatory COX-2.",
        "convergence_ancestrale": "Ancestral remedy for pain and fever, used by Hippocrates and Native American peoples.",
        "precautions": "Contraindicated in case of allergy to salicylates or anticoagulant treatment."
      },
      "de": {
        "nom_commun": "Silber-Weide",
        "partie_utilisee": "Innere Rinde (Bast)",
        "preuve_scientifique": "Salicin wird durch die Darmflora in Salicylsäure umgewandelt. Im Gegensatz zu synthetischem Aspirin hemmt die Silber-Weide nicht die magenschützende COX-1, sondern zielt auf proinflammatorische COX-2 ab.",
        "convergence_ancestrale": "Uraltes Heilmittel gegen Schmerzen und Fieber, das bereits von Hippokrates und den amerikanischen Ureinwohnern verwendet wurde.",
        "precautions": "Kontraindiziert bei Allergie gegen Salicylate oder gerinnungshemmender Behandlung."
      }
    }
  },
  {
    "plant_id": "berberis_vulgaris",
    "nom_commun": "Épine-vinette",
    "nom_latin": "Berberis vulgaris",
    "partie_utilisee": "Écorce de racine ou de tige",
    "famille_bloom": "Verrou (Métabolisme & Glycémie)",
    "terrains_cibles": ["T5_Mitochondrie", "T4_HPA", "T1_Intestin"],
    "actifs_cles": [
      {"nom": "Berbérine (Alcaloïde)", "polarite": "Peu hydrosoluble / Alcoolosoluble", "translations": { "en": { "nom": "Berberine (Alkaloid)", "polarite": "Slightly water-soluble / Alcohol-soluble" }, "de": { "nom": "Berberin (Alkaloid)", "polarite": "Gering wasserlöslich / Alkohollöslich" } } },
      {"nom": "Berbamine", "polarite": "Liposoluble", "translations": { "en": { "nom": "Berbamine", "polarite": "Fat-soluble" }, "de": { "nom": "Berbamin", "polarite": "Fettlöslich" } } }
    ],
    "preuve_scientifique": "La berbérine est un activateur puissant de l'AMPK (protéine kinase activée par l'AMP), régulant le métabolisme du glucose et des lipides. Elle module également la flore intestinale (effet eubiotique).",
    "pourquoi_bloomlab": {
      "probleme_traditionnel": "La berbérine est très amère et difficile à extraire à l'eau seule. Son absorption est naturellement faible.",
      "phase_A": {"temp": "75°C", "temps": "3h00", "solvant": "Eau distillée + Glycérine", "cible": "Glycosides et fraction aqueuse", "translations": { "en": { "cible": "Glycosides and aqueous fraction" }, "de": { "cible": "Glykoside und wässrige Fraktion" } } },
      "phase_B": {"temp": "60°C", "temps": "4h00", "solvant": "Alcool bio 96°", "cible": "Concentration maximale de Berbérine et Berbamine", "translations": { "en": { "cible": "Maximum concentration of Berberine and Berbamine" }, "de": { "cible": "Maximale Konzentration von Berberin und Berbamin" } } },
      "resultat": "Un régulateur métabolique majeur, optimisant la sensibilité à l'insuline et la santé hépatique.",
      "translations": {
        "en": {
          "probleme_traditionnel": "Berberine is very bitter and difficult to extract with water alone. Its absorption is naturally low.",
          "resultat": "A major metabolic regulator, optimizing insulin sensitivity and liver health."
        },
        "de": {
          "probleme_traditionnel": "Berberin ist sehr bitter und allein mit Wasser schwer zu extrahieren. Seine Absorption ist natürlich gering.",
          "resultat": "Ein wichtiger Stoffwechselregulator, der die Insulinsensitivität und die Lebergesundheit optimiert."
        }
      }
    },
    "convergence_ancestrale": "Utilisé en médecine persane et chinoise pour 'nettoyer le foie' et rafraîchir le sang.",
    "synergies_recommandees": ["Chardon-Marie", "Gingembre"],
    "precautions": "Ne pas utiliser pendant la grossesse. Peut interférer avec certains médicaments métabolisés par le foie (CYP450).",
    "translations": {
      "en": {
        "nom_commun": "Common Barberry",
        "partie_utilisee": "Bark of root or stem",
        "preuve_scientifique": "Berberine is a powerful activator of AMPK (AMP-activated protein kinase), regulating glucose and lipid metabolism. It also modulates the intestinal flora (eubiotic effect).",
        "convergence_ancestrale": "Used in Persian and Chinese medicine to 'clean the liver' and refresh the blood.",
        "precautions": "Do not use during pregnancy. May interfere with some drugs metabolized by the liver (CYP450)."
      },
      "de": {
        "nom_commun": "Berberitze (Sauerdorn)",
        "partie_utilisee": "Wurzel- oder Stängelrinde",
        "preuve_scientifique": "Berberin ist ein starker Aktivator der AMPK (AMP-aktivierte Proteinkinase) und reguliert den Glukose- und Lipidstoffwechsel. Es moduliert auch die Darmflora (eubiotische Wirkung).",
        "convergence_ancestrale": "Wird in der persischen und chinesischen Medizin verwendet, um 'die Leber zu reinigen' und das Blut zu kühlen.",
        "precautions": "Nicht während der Schwangerschaft verwenden. Kann die Wirkung einiger in der Leber metabolisierter Medikamente beeinflussen (CYP450)."
      }
    }
  },
  {
    "plant_id": "crataegus_monogyna",
    "nom_commun": "Aubépine",
    "nom_latin": "Crataegus monogyna",
    "partie_utilisee": "Sommités fleuries et fruits",
    "famille_bloom": "Chef d'Orchestre (Cœur & Système Nerveux)",
    "terrains_cibles": ["T4_HPA", "T6_Nerveux", "T8_Inflammation"],
    "actifs_cles": [
      {"nom": "Vitexine / Hypéroside", "polarite": "Hydrosoluble", "translations": { "en": { "nom": "Vitexin / Hyperoside", "polarite": "Water-soluble" }, "de": { "nom": "Vitexin / Hyperosid", "polarite": "Wasserlöslich" } } },
      {"nom": "Proanthocyanidines (OPC)", "polarite": "Hydrosoluble/Liposoluble", "translations": { "en": { "nom": "Proanthocyanidins (OPC)", "polarite": "Water-soluble/Fat-soluble" }, "de": { "nom": "Proanthocyanidine (OPC)", "polarite": "Wasserlöslich/Fettlöslich" } } }
    ],
    "preuve_scientifique": "Action inotrope positive et chronotrope négative (renforce le cœur et ralentit le rythme). Régule la tension artérielle et apaise l'anxiété par modulation du système nerveux autonome.",
    "pourquoi_bloomlab": {
      "probleme_traditionnel": "Les OPC sont sensibles à l'oxydation. Les flavonoïdes nécessitent une chaleur douce mais constante pour être totalement libérés de la matrice végétale.",
      "phase_A": {"temp": "65°C", "temps": "2h00", "solvant": "Eau distillée + Glycérine", "cible": "Extraction des flavonoïdes et OPC", "translations": { "en": { "cible": "Extraction of flavonoids and OPC" }, "de": { "cible": "Extraktion von Flavonoiden und OPC" } } },
      "phase_B": {"temp": "45°C", "temps": "2h00", "solvant": "Alcool bio 45°", "cible": "Stabilisation et extraction des composés aromatiques", "translations": { "en": { "cible": "Stabilization and extraction of aromatic compounds" }, "de": { "cible": "Stabilisierung und Extraktion aromatischer Verbindungen" } } },
      "resultat": "Le 'Lait du Cœur', un tonique cardiaque et nerveux d'une grande douceur et d'une efficacité profonde.",
      "translations": {
        "en": {
          "probleme_traditionnel": "OPCs are sensitive to oxidation. Flavonoids require gentle but constant heat to be fully released from the plant matrix.",
          "resultat": "The 'Heart Milk', a cardiac and nervous tonic of great gentleness and deep effectiveness."
        },
        "de": {
          "probleme_traditionnel": "OPCs sind oxidationsempfindlich. Flavonoide benötigen eine sanfte, aber konstante Hitze, um vollständig aus der Pflanzenmatrix freigesetzt zu werden.",
          "resultat": "Die 'Herzmilch', ein Herz- und Nerventonikum von großer Sanftheit und tiefer Wirksamkeit."
        }
      }
    },
    "convergence_ancestrale": "Plante du cœur physique et émotionnel, utilisée depuis le Moyen Âge pour 'chasser les peines'.",
    "synergies_recommandees": ["Passiflore", "Mélisse"],
    "precautions": "Généralement très sûre. Prudence en cas de prise de digitaliques (digoxine).",
    "translations": {
      "en": {
        "nom_commun": "Hawthorn",
        "partie_utilisee": "Flowering tops and fruits",
        "preuve_scientifique": "Positive inotropic and negative chronotropic action (strengthens the heart and slows the rhythm). Regulates blood pressure and soothes anxiety by modulating the autonomic nervous system.",
        "convergence_ancestrale": "Plant of the physical and emotional heart, used since the Middle Ages to 'chase away sorrows'.",
        "precautions": "Generally very safe. Caution in case of taking digitalis (digoxin)."
      },
      "de": {
        "nom_commun": "Weißdorn",
        "partie_utilisee": "Blütenzweige und Früchte",
        "preuve_scientifique": "Positive inotrope und negative chronotrope Wirkung (stärkt das Herz und verlangsamt den Rhythmus). Reguliert den Blutdruck und beruhigt Angstzustände durch Modulation des autonomen Nervensystems.",
        "convergence_ancestrale": "Pflanze des physischen und emotionalen Herzens, wird seit dem Mittelalter verwendet, um 'Sorgen zu vertreiben'.",
        "precautions": "Im Allgemeinen sehr sicher. Vorsicht bei der Einnahme von Digitalis (Digoxin)."
      }
    }
  },
  {
    "plant_id": "cinchona_succirubra",
    "nom_commun": "Quinquina Rouge",
    "nom_latin": "Cinchona succirubra",
    "partie_utilisee": "Écorce séchée",
    "famille_bloom": "Moteur (Tonique & Vitalité)",
    "terrains_cibles": ["T2_Énergie", "T3_Immunité", "T5_Mitochondrie"],
    "actifs_cles": [
      {"nom": "Quinine / Quinidine (Alcaloïdes)", "polarite": "Peu hydrosoluble / Très soluble dans l'alcool", "translations": { "en": { "nom": "Quinine / Quinidine (Alkaloids)", "polarite": "Slightly water-soluble / Highly alcohol-soluble" }, "de": { "nom": "Chinin / Chinidin (Alkaloide)", "polarite": "Gering wasserlöslich / Gut alkohollöslich" } } },
      {"nom": "Tanins cinchoniques", "polarite": "Hydrosoluble", "translations": { "en": { "nom": "Cinchona tannins", "polarite": "Water-soluble" }, "de": { "nom": "Chinarindengerbstoffe", "polarite": "Wasserlöslich" } } }
    ],
    "preuve_scientifique": "La quinine possède des propriétés antipyrétiques, antipaludéennes et toniques amères. Stimule les sécrétions digestives et renforce la réponse immunitaire non spécifique.",
    "pourquoi_bloomlab": {
      "probleme_traditionnel": "L'écorce est extrêmement dure. La quinine nécessite un milieu acide ou fortement alcoolisé pour être extraite efficacement. L'eau seule ne capture que les tanins.",
      "phase_A": {"temp": "85°C", "temps": "3h00", "solvant": "Eau + Acide Citrique (léger)", "cible": "Relargage des tanins et préparation de l'écorce", "translations": { "en": { "cible": "Release of tannins and preparation of the bark" }, "de": { "cible": "Freisetzung von Gerbstoffen und Vorbereitung der Rinde" } } },
      "phase_B": {"temp": "60°C", "temps": "4h00", "solvant": "Alcool bio 96°", "cible": "Extraction massive des alcaloïdes (Quinine)", "translations": { "en": { "cible": "Massive extraction of alkaloids (Quinine)" }, "de": { "cible": "Massive Extraktion von Alkaloiden (Chinin)" } } },
      "resultat": "Un élixir de vitalité 'Feu', idéal pour les convalescences et les états de fatigue profonde.",
      "translations": {
        "en": {
          "probleme_traditionnel": "The bark is extremely hard. Quinine requires an acidic or highly alcoholic medium to be extracted efficiently. Water alone only captures tannins.",
          "resultat": "A 'Fire' vitality elixir, ideal for convalescence and states of deep fatigue."
        },
        "de": {
          "probleme_traditionnel": "Die Rinde ist extrem hart. Chinin erfordert ein saures oder stark alkoholisches Medium, um effizient extrahiert zu werden. Wasser allein erfasst nur Gerbstoffe.",
          "resultat": "Ein 'Feuer'-Vitalitätselixier, ideal für die Rekonvaleszenz und Zustände tiefer Erschöpfung."
        }
      }
    },
    "convergence_ancestrale": "Plante sacrée des Andes, introduite en Europe au XVIIe siècle pour sauver les têtes couronnées de la fièvre.",
    "synergies_recommandees": ["Gingembre", "Gentiane"],
    "precautions": "Interdit en cas de grossesse ou de troubles graves du rythme cardiaque.",
    "translations": {
      "en": {
        "nom_commun": "Red Cinchona",
        "partie_utilisee": "Dried bark",
        "preuve_scientifique": "Quinine has antipyretic, antimalarial and bitter tonic properties. Stimulates digestive secretions and strengthens the non-specific immune response.",
        "convergence_ancestrale": "Sacred plant of the Andes, introduced to Europe in the 17th century to save crowned heads from fever.",
        "precautions": "Forbidden in case of pregnancy or serious heart rhythm disorders."
      },
      "de": {
        "nom_commun": "Rote Chinarinde",
        "partie_utilisee": "Getrocknete Rinde",
        "preuve_scientifique": "Chinin besitzt fiebersenkende, antimalarielle und bittertonische Eigenschaften. Stimuliert die Verdauungssekrete und stärkt die unspezifische Immunantwort.",
        "convergence_ancestrale": "Heilige Pflanze der Anden, im 17. Jahrhundert in Europa eingeführt, um gekrönte Häupter vor dem Fieber zu retten.",
        "precautions": "Verboten bei Schwangerschaft oder schweren Herzrhythmusstörungen."
      }
    }
  },
  {
    plant_id: "taraxacum_officinale",
    nom_commun: "Pissenlit",
    nom_latin: "Taraxacum officinale",
    partie_utilisee: "Feuilles et Racines",
    famille_bloom: "Médiateur (Détoxication & Digestion)",
    terrains_cibles: ["T2_Foie", "T6_Émonctoires", "T1_Intestin"],
    actifs_cles: [
      { nom: "Principes amers (Lactones)", polarite: "Hydrosoluble" },
      { nom: "Flavonoïdes", polarite: "Hydrosoluble" },
      { nom: "Potassium", polarite: "Hydrosoluble" }
    ],
    preuve_scientifique: "Stimulation de la diurèse (augmentation du volume d'urine) sans perte de potassium. Effet cholérétique et cholagogue facilitant la digestion des graisses.",
    pourquoi_bloomlab: {
      probleme_traditionnel: "L'infusion classique à l'eau bouillante peut être trop agressive pour les actifs sensibles. L'extraction contrôlée à 60°C préserve le ratio minéral/amer.",
      phase_A: { temp: "60°C", temps: "1h30", solvant: "Eau purifiée", cible: "Minéraux et principes amers" },
      phase_B: { temp: "45°C", temps: "1h00", solvant: "Eau / Glycérine", cible: "Stabilisation des flavonoïdes" },
      resultat: "Un extrait dépuratif doux et reminéralisant."
    },
    recette_pas_a_pas: {
      batch_standard: "750ml de solvant + 50g de plante",
      ingredients: {
        phase_A: ["35g de feuilles/racines de Pissenlit", "500ml d'Eau filtrée"],
        phase_B: ["15g de Pissenlit", "250ml de mélange Eau/Glycérine"]
      },
      preparation: ["Mélanger feuilles et racines concassées."],
      phase_A_instructions: ["Extraire à 60°C pendant 90 min."],
      transition: ["Filtrer à l'étamine."],
      phase_B_instructions: ["Ajouter le solvant B et extraire à 45°C pendant 60 min."],
      filtration_et_finition: ["Mélanger les deux phases et mettre en flacon."]
    },
    convergence_ancestrale: "Utilisé depuis l'Antiquité pour 'nettoyer les filtres' du corps au printemps.",
    synergies_recommandees: ["chardon_marie", "artichaut", "romarin"],
    precautions: "Prudence en cas de calculs biliaires. Effet diurétique marqué."
  },
  {
    plant_id: "ribes_nigrum",
    nom_commun: "Cassis",
    nom_latin: "Ribes nigrum",
    partie_utilisee: "Feuilles et Baies",
    famille_bloom: "Médiateur (Anti-inflammatoire & Vitalité)",
    terrains_cibles: ["T8_Inflammation", "T4_HPA", "T9_Peau_Phaneres"],
    actifs_cles: [
      { nom: "Anthocyanes", polarite: "Hydrosoluble" },
      { nom: "Flavonoïdes (Quercétine)", polarite: "Hydrosoluble" },
      { nom: "Vitamine C", polarite: "Hydrosoluble" }
    ],
    preuve_scientifique: "Effet 'cortisone-like' naturel en stimulant doucement les glandes surrénales. Puissant antioxydant et anti-inflammatoire systémique.",
    pourquoi_bloomlab: {
      probleme_traditionnel: "Les anthocyanes sont détruites par la chaleur excessive. L'extraction douce à 55°C est indispensable pour préserver la couleur et l'activité.",
      phase_A: { temp: "55°C", temps: "2h00", solvant: "Eau distillée", cible: "Anthocyanes et Vitamine C" },
      phase_B: { temp: "40°C", temps: "1h00", solvant: "Glycérine", cible: "Stabilisation" },
      resultat: "Un élixir protecteur et revitalisant."
    },
    recette_pas_a_pas: {
      batch_standard: "750ml + 60g de feuilles/baies",
      ingredients: {
        phase_A: ["40g de Cassis", "500ml d'Eau"],
        phase_B: ["20g de Cassis", "250ml de Glycérine"]
      },
      preparation: ["Utiliser des baies séchées et des feuilles concassées."],
      phase_A_instructions: ["Extraire à 55°C pendant 120 min."],
      transition: ["Refroidir rapidement."],
      phase_B_instructions: ["Ajouter la glycérine et maintenir à 40°C pendant 60 min."],
      filtration_et_finition: ["Presser fermement le marc pour extraire tout le jus coloré."]
    },
    convergence_ancestrale: "Surnommé 'l'élixir de vie' au XVIIIe siècle pour ses propriétés polyvalentes.",
    synergies_recommandees: ["urtica_dioica", "curcuma_longa", "rosa_canina"],
    precautions: "Prudence en cas d'insuffisance cardiaque ou rénale sévère."
  },
  {
    plant_id: "melissa_officinalis",
    nom_commun: "Mélisse",
    nom_latin: "Melissa officinalis",
    partie_utilisee: "Feuilles",
    famille_bloom: "Médiateur (Apaisement & Digestion)",
    terrains_cibles: ["T7_Psycho_émotionnel", "T1_Intestin", "T4_HPA"],
    actifs_cles: [
      { nom: "Acide Rosmarinique", polarite: "Hydrosoluble" },
      { nom: "Huiles essentielles (Citral)", polarite: "Volatile" }
    ],
    preuve_scientifique: "Action antispasmodique sur le tube digestif et régulatrice du système nerveux. Aide à l'endormissement et réduit l'anxiété légère.",
    pourquoi_bloomlab: {
      probleme_traditionnel: "Les huiles essentielles s'échappent dès 40°C. L'extraction sous vide ou à basse température est cruciale.",
      phase_A: { temp: "45°C", temps: "2h00", solvant: "Eau / Glycérine", cible: "Acide rosmarinique" },
      phase_B: { temp: "35°C", temps: "1h00", solvant: "Eau", cible: "Huiles essentielles" },
      resultat: "Une eau de mélisse apaisante et parfumée."
    },
    recette_pas_a_pas: {
      batch_standard: "750ml + 40g de feuilles",
      ingredients: {
        phase_A: ["30g de Mélisse", "500ml de solvant"],
        phase_B: ["10g de Mélisse", "250ml d'Eau"]
      },
      preparation: ["Utiliser des feuilles bien sèches pour éviter la fermentation."],
      phase_A_instructions: ["Extraire à 45°C pendant 2h."],
      transition: ["Garder le couvercle fermé pour piéger les arômes."],
      phase_B_instructions: ["Finir à 35°C pendant 1h."],
      filtration_et_finition: ["Mise en flacon immédiate."]
    },
    convergence_ancestrale: "Ingrédient principal de 'l'Eau des Carmes', célèbre remède de réconfort depuis le XVIIe siècle.",
    synergies_recommandees: ["passiflora_incarnata", "valeriana_officinalis", "mentha_piperita"],
    precautions: "Généralement sans danger. Peut interférer avec les traitements thyroïdiens à très haute dose."
  },
  {
    plant_id: "passiflora_incarnata",
    nom_commun: "Passiflore",
    nom_latin: "Passiflora incarnata",
    partie_utilisee: "Parties aériennes",
    famille_bloom: "Médiateur (Sédation Douce)",
    terrains_cibles: ["T7_Psycho_émotionnel", "T4_HPA"],
    actifs_cles: [
      { nom: "Flavonoïdes (Vitexine)", polarite: "Hydrosoluble" },
      { nom: "Alcaloïdes (Harmala)", polarite: "Liposoluble" }
    ],
    preuve_scientifique: "Augmentation des niveaux de GABA dans le cerveau, favorisant la détente musculaire et nerveuse sans accoutumance.",
    pourquoi_bloomlab: {
      probleme_traditionnel: "Le Totum nécessite à la fois une phase aqueuse et une phase alcoolique légère pour capturer les alcaloïdes.",
      phase_A: { temp: "60°C", temps: "2h00", solvant: "Eau", cible: "Flavonoïdes" },
      phase_B: { temp: "45°C", temps: "2h00", solvant: "Alcool bio 45°", cible: "Alcaloïdes" },
      resultat: "Un extrait complet pour un sommeil réparateur."
    },
    recette_pas_a_pas: {
      batch_standard: "750ml + 50g de plante",
      ingredients: {
        phase_A: ["35g de Passiflore", "500ml d'Eau"],
        phase_B: ["15g de Passiflore", "250ml d'Alcool 45°"]
      },
      preparation: ["Tasser la plante dans la cuve."],
      phase_A_instructions: ["Extraire à 60°C."],
      transition: ["Laisser tiédir."],
      phase_B_instructions: ["Ajouter l'alcool et extraire à 45°C."],
      filtration_et_finition: ["Filtre fin requis."]
    },
    convergence_ancestrale: "Découverte par les missionnaires en Amérique, associée à la Passion pour sa structure florale unique.",
    synergies_recommandees: ["eschscholzia_californica", "valeriana_officinalis", "humulus_lupulus"],
    precautions: "Éviter avec d'autres sédatifs puissants ou antidépresseurs IMAO."
  },
  {
    plant_id: "valeriana_officinalis",
    nom_commun: "Valériane",
    nom_latin: "Valeriana officinalis",
    partie_utilisee: "Racines et Rhizomes",
    famille_bloom: "Gâchette (Sommeil Profond)",
    terrains_cibles: ["T7_Psycho_émotionnel", "T6_Nerveux"],
    actifs_cles: [
      { nom: "Acide valérénique", polarite: "Liposoluble" },
      { nom: "Valépotriates", polarite: "Liposoluble" }
    ],
    preuve_scientifique: "Réduit le temps d'endormissement et améliore la qualité du sommeil profond. Action sur les récepteurs GABA.",
    pourquoi_bloomlab: {
      probleme_traditionnel: "L'odeur est forte et les actifs sont principalement lipophiles. L'extraction doit être hermétique.",
      phase_A: { temp: "50°C", temps: "3h00", solvant: "Eau / Alcool 70°", cible: "Acide valérénique" },
      phase_B: { temp: "40°C", temps: "1h00", solvant: "Alcool", cible: "Stabilisation" },
      resultat: "Une teinture mère puissante et normalisée."
    },
    recette_pas_a_pas: {
      batch_standard: "750ml + 75g de racines",
      ingredients: {
        phase_A: ["50g de Valériane", "500ml de mélange"],
        phase_B: ["25g de Valériane", "250ml d'Alcool"]
      },
      preparation: ["Concasser les racines dures."],
      phase_A_instructions: ["Extraire à 50°C longuement."],
      transition: ["Maintenir l'étanchéité."],
      phase_B_instructions: ["Ajouter le reste d'alcool."],
      filtration_et_finition: ["Filtrer et flaconner rapidement."]
    },
    convergence_ancestrale: "Le 'Phu' des Grecs anciens, utilisé pour calmer les nerfs et les spasmes.",
    synergies_recommandees: ["passiflora_incarnata", "melissa_officinalis", "eschscholzia_californica"],
    precautions: "Odeur caractéristique puissante. Éviter avant de conduire."
  },
  {
    plant_id: "eschscholzia_californica",
    nom_commun: "Eschscholtzia",
    nom_latin: "Eschscholzia californica",
    partie_utilisee: "Parties aériennes fleuries",
    famille_bloom: "Médiateur (Sommeil & Relaxation)",
    terrains_cibles: ["T7_Psycho_émotionnel", "T4_HPA"],
    actifs_cles: [
      { nom: "Alcaloïdes (Pavine)", polarite: "Liposoluble" },
      { nom: "Flavonoïdes", polarite: "Hydrosoluble" }
    ],
    preuve_scientifique: "Action anxiolytique et sédative légère sans accoutumance. Aide à maintenir le sommeil tout au long de la nuit.",
    pourquoi_bloomlab: {
      probleme_traditionnel: "Les alcaloïdes sont sensibles et nécessitent une extraction à température modérée pour ne pas être dénaturés.",
      phase_A: { temp: "55°C", temps: "2h00", solvant: "Eau / Glycérine", cible: "Flavonoïdes" },
      phase_B: { temp: "45°C", temps: "2h00", solvant: "Alcool bio 45°", cible: "Alcaloïdes" },
      resultat: "Un extrait relaxant idéal pour la fin de journée."
    },
    recette_pas_a_pas: {
      batch_standard: "750ml + 50g de plante",
      ingredients: {
        phase_A: ["35g d'Eschscholtzia", "500ml d'Eau/Gly"],
        phase_B: ["15g d'Eschscholtzia", "250ml d'Alcool 45°"]
      },
      preparation: ["Plante séchée concassée."],
      phase_A_instructions: ["Extraire à 55°C."],
      transition: ["Laisser reposer."],
      phase_B_instructions: ["Ajouter l'alcool et finir à 45°C."],
      filtration_et_finition: ["Filtre étamine."]
    },
    convergence_ancestrale: "Le 'Pavot de Californie', utilisé par les Amérindiens pour apaiser les enfants et les douleurs.",
    synergies_recommandees: ["valeriana_officinalis", "passiflora_incarnata", "lavandula_angustifolia"],
    precautions: "Généralement très sûr. Éviter en cas de glaucome."
  },
  {
    plant_id: "rosmarinus_officinalis",
    nom_commun: "Romarin",
    nom_latin: "Rosmarinus officinalis",
    partie_utilisee: "Feuilles et Sommités fleuries",
    famille_bloom: "Gâchette (Dynamisation & Foie)",
    terrains_cibles: ["T2_Foie", "T5_Mitochondrie", "T7_Psycho_émotionnel"],
    actifs_cles: [
      { nom: "Acide Rosmarinique", polarite: "Hydrosoluble" },
      { nom: "Diterpènes (Carnosol)", polarite: "Liposoluble" },
      { nom: "Huiles essentielles (Cinole)", polarite: "Volatile" }
    ],
    preuve_scientifique: "Puissant antioxydant protecteur du foie et stimulant de la concentration et de la mémoire (neuroprotection).",
    pourquoi_bloomlab: {
      probleme_traditionnel: "L'infusion bouillante perd les huiles volatiles. L'extraction à 65°C capture les diterpènes protecteurs.",
      phase_A: { temp: "65°C", temps: "1h30", solvant: "Eau distillée", cible: "Acide rosmarinique" },
      phase_B: { temp: "45°C", temps: "1h00", solvant: "Eau / Alcool", cible: "Huiles essentielles" },
      resultat: "Un tonique hépatique et cérébral majeur."
    },
    recette_pas_a_pas: {
      batch_standard: "750ml + 40g de plante",
      ingredients: {
        phase_A: ["30g de Romarin", "500ml d'Eau"],
        phase_B: ["10g de Romarin", "250ml d'Eau/Alcool"]
      },
      preparation: ["Feuilles sèches entières."],
      phase_A_instructions: ["Extraire à 65°C."],
      transition: ["Garder fermé."],
      phase_B_instructions: ["Finir à 45°C."],
      filtration_et_finition: ["Mise en flacon ambré."]
    },
    convergence_ancestrale: "L'herbe du souvenir et de la fidélité, utilisée pour 'éclaircir l'esprit' et fortifier le corps.",
    synergies_recommandees: ["artichaut", "chardon_marie", "ginkgo_biloba"],
    precautions: "Éviter à haute dose en cas d'hypertension sévère le soir (stimulant)."
  },
  {
    plant_id: "lavandula_angustifolia",
    nom_commun: "Lavande",
    nom_latin: "Lavandula angustifolia",
    partie_utilisee: "Fleurs séchées",
    famille_bloom: "Médiateur (Apaisement & Harmonie)",
    terrains_cibles: ["T7_Psycho_émotionnel", "T9_Peau_Phaneres"],
    actifs_cles: [
      { nom: "Linalol", polarite: "Volatile" },
      { nom: "Acétate de linalyle", polarite: "Volatile" },
      { nom: "Tanins", polarite: "Hydrosoluble" }
    ],
    preuve_scientifique: "Action anxiolytique démontrée par inhalation et ingestion. Régule l'humeur et apaise les tensions nerveuses.",
    pourquoi_bloomlab: {
      probleme_traditionnel: "La lavande est très fragile. La chaleur doit être minimale pour ne pas transformer le parfum en odeur de 'foin'.",
      phase_A: { temp: "45°C", temps: "1h00", solvant: "Eau / Glycérine", cible: "Tanins et arômes" },
      phase_B: { temp: "35°C", temps: "1h00", solvant: "Eau", cible: "Stabilisation" },
      resultat: "Une eau florale concentrée et apaisante."
    },
    recette_pas_a_pas: {
      batch_standard: "750ml + 30g de fleurs",
      ingredients: {
        phase_A: ["20g de Lavande", "500ml de solvant"],
        phase_B: ["10g de Lavande", "250ml d'Eau"]
      },
      preparation: ["Utiliser des fleurs de lavande vraie (angustifolia)."],
      phase_A_instructions: ["Extraire à 45°C doucement."],
      transition: ["Laisser tiédir."],
      phase_B_instructions: ["Finir à 35°C."],
      filtration_et_finition: ["Filtrer délicatement."]
    },
    convergence_ancestrale: "Utilisée dans les bains romains pour ses vertus purifiantes et apaisantes.",
    synergies_recommandees: ["melissa_officinalis", "passiflora_incarnata", "calendula_officinalis"],
    precautions: "Généralement très sûre. Prudence en cas d'hypotension."
  },
  {
    plant_id: "artichaut",
    "nom_commun": "Artichaut",
    "nom_latin": "Cynara scolymus",
    "partie_utilisee": "Feuilles séchées",
    "famille_bloom": "Médiateur (Soutien Hépatique)",
    "terrains_cibles": ["T4 (Foie)", "T1 (Intestin)", "T8 (Inflammation)"],
    "actifs_cles": [
      { "nom": "Cynarine", "polarite": "Hydrosoluble", "translations": { "en": { "nom": "Cynarin", "polarite": "Water-soluble" }, "de": { "nom": "Cynarin", "polarite": "Wasserlöslich" } } },
      { "nom": "Acides phénoliques", "polarite": "Hydrosoluble", "translations": { "en": { "nom": "Phenolic acids", "polarite": "Water-soluble" }, "de": { "nom": "Phenolsäuren", "polarite": "Wasserlöslich" } } },
      { "nom": "Lutéoline", "polarite": "Liposoluble", "translations": { "en": { "nom": "Luteolin", "polarite": "Fat-soluble" }, "de": { "nom": "Luteolin", "polarite": "Fettlöslich" } } },
      { "nom": "Inuline", "polarite": "Hydrosoluble", "translations": { "en": { "nom": "Inulin", "polarite": "Water-soluble" }, "de": { "nom": "Inulin", "polarite": "Wasserlöslich" } } }
    ],
    "preuve_scientifique": "La cynarine et les acides phénoliques stimulent la sécrétion biliaire (effet cholérétique) et son évacuation (effet cholagogue). Propriétés hépatoprotectrices et antioxydantes majeures.",
    "pourquoi_bloomlab": {
      "probleme_traditionnel": "La cynarine est thermosensible au-delà de 70°C. Une infusion classique à l'eau bouillante peut dénaturer une partie des polyphénols. L'extraction contrôlée à 60°C permet de maximiser le Totum.",
      "phase_A": { "temp": "60°C", "temps": "1h30", "solvant": "Eau purifiée", "cible": "Cynarine, inuline et acides chlorogéniques", "translations": { "en": { "cible": "Cynarin, inulin and chlorogenic acids" }, "de": { "cible": "Cynarin, Inulin und Chlorogensäuren" } } },
      "phase_B": { "temp": "45°C", "temps": "1h00", "solvant": "Glycérine / Eau", "cible": "Flavonoïdes et stabilisation", "translations": { "en": { "cible": "Flavonoids and stabilization" }, "de": { "cible": "Flavonoide und Stabilisierung" } } },
      "resultat": "Un concentré hépatique biodisponible, doux pour la digestion et riche en protecteurs cellulaires.",
      "translations": {
        "en": {
          "probleme_traditionnel": "Cynarin is heat-sensitive above 70°C. A classic boiling water infusion can denature some polyphenols. Controlled extraction at 60°C maximizes the Totum.",
          "resultat": "A bioavailable hepatic concentrate, gentle on digestion and rich in cellular protectors."
        },
        "de": {
          "probleme_traditionnel": "Cynarin ist über 70°C hitzeempfindlich. Ein klassischer Aufguss mit kochendem Wasser kann einige Polyphenole denaturieren. Eine kontrollierte Extraktion bei 60°C maximiert das Totum.",
          "resultat": "Ein bioverfügbares Leberkonzentrat, sanft zur Verdauung und reich an Zellschutzstoffen."
        }
      }
    },
    "recette_pas_a_pas": {
      "batch_standard": "Cible Bloom : 750ml de solvant + 24.6g de feuilles (10 sachets)",
      "ingredients": {
        "phase_A": ["24.6g de feuilles d'Artichaut (10 sachets)", "750ml d'Eau filtrée"],
        "phase_B": ["Optionnel : Citron ou Glycérine"]
      },
      "preparation": [
        "1. Ouvrir les 10 sachets d'Artichaut.",
        "2. Verser le contenu dans la cuve de la BloomLab."
      ],
      "phase_A_instructions": [
        "1. Ajouter 750 ml d'eau filtrée.",
        "2. Régler sur 60°C pendant 90 minutes.",
        "3. Lancer le cycle."
      ],
      "transition": [
        "1. Filtrer à chaud à l'aide d'une étamine.",
        "2. Refroidir rapidement pour stopper l'oxydation."
      ],
      "phase_B_instructions": [
        "1. Pas de phase B complexe requise pour l'infusion standard.",
        "2. Vous pouvez ajouter un jus de citron une fois le liquide tiède."
      ],
      "filtration_et_finition": [
        "1. Transvaser dans une bouteille en verre propre.",
        "2. Conserver au réfrigérateur (24h-48h)."
      ]
    },
    "convergence_ancestrale": "Utilisé depuis l'Égypte ancienne pour favoriser la digestion. En Europe, il est le remède phare du drainage hépato-biliaire.",
    "synergies_recommandees": ["Chardon-marie", "Radis noir", "Romarin"],
    "precautions": "Contre-indiqué en cas d'obstruction des voies biliaires ou d'allergie aux Astéracées.",
    "translations": {
      "en": {
        "nom_commun": "Artichoke",
        "partie_utilisee": "Dried leaves",
        "preuve_scientifique": "Cynarin and phenolic acids stimulate bile secretion (cholerectic effect) and its evacuation (cholagogue effect). Major hepatoprotective and antioxidant properties.",
        "convergence_ancestrale": "Used since ancient Egypt to promote digestion. In Europe, it is the leading remedy for hepatic-biliary drainage.",
        "precautions": "Contraindicated in case of bile duct obstruction or allergy to Asteraceae."
      },
      "de": {
        "nom_commun": "Artischocke",
        "partie_utilisee": "Getrocknete Blätter",
        "preuve_scientifique": "Cynarin und Phenolsäuren stimulieren die Gallensekretion (choleretische Wirkung) und deren Entleerung (cholagoge Wirkung). Wichtige hepatoprotektive und antioxidative Eigenschaften.",
        "convergence_ancestrale": "Wird seit dem alten Ägypten zur Förderung der Verdauung verwendet. In Europa ist es das führende Mittel zur Leber-Galle-Drainage.",
        "precautions": "Kontraindiziert bei Gallengangsverschluss oder Allergie gegen Korbblütler (Asteraceae)."
      }
    },
    "additional_recipes": [
      {
        "id": "artichaut-classique-750ml",
        "title": "Artichaut classique 750 ml",
        "goal": "Extraire un concentré polyphénolique doux pour soutien hépatique quotidien.",
        "translations": {
          "en": { "title": "Classic Artichoke 750 ml", "goal": "Extract a gentle polyphenolic concentrate for daily hepatic support." },
          "de": { "title": "Artischocke Klassisch 750 ml", "goal": "Extraktion eines sanften polyphenolischen Konzentrats zur täglichen Leberunterstützung." }
        },
        "plant": {
          "name": "Artichaut",
          "part": "feuilles sèches en sachets",
          "sachet_weight_g": 2.46,
          "sachet_count": 10,
          "total_plant_mass_g": 24.6
        },
        "solvent": {
          "type": "water",
          "volume_ml": 750,
          "notes": "Eau filtrée ou eau faiblement minéralisée."
        },
        "process": {
          "method": "infusion_decoction_douce",
          "temperature_c": 60,
          "time_min": 90,
          "steps": [
            "Ouvrir les sachets et verser le contenu dans la cuve.",
            "Ajouter 750 ml d'eau.",
            "Chauffer à 60 °C pendant 90 minutes.",
            "Filtrer à chaud.",
            "Refroidir rapidement et conserver au réfrigérateur."
          ]
        },
        "use": {
          "duration_hours": 24,
          "servings": [
            { "time": "matin", "volume_ml": 190 },
            { "time": "midi", "volume_ml": 190 },
            { "time": "apres-midi", "volume_ml": 190 },
            { "time": "fin_d_apres_midi", "volume_ml": 190 }
          ],
          "notes": "Boire sur la journée pour répartir la charge polyphénolique et soutenir le foie de manière progressive."
        },
        "storage": {
          "fridge": true,
          "max_hours": 24,
          "absolute_max_hours": 48,
          "notes": "Conserver dans un récipient propre et fermé. Jeter si odeur, couleur ou aspect changent."
        },
        "cta": {
          "label": "Utiliser cette recette dans le Reset Homéostasique",
          "href": "/reset-homeostasique"
        }
      },
      {
        "id": "artichaut-intense-750ml",
        "title": "Artichaut intense 750 ml",
        "goal": "Extraire un concentré plus riche en polyphénols avec une intensité supérieure.",
        "translations": {
          "en": { "title": "Intense Artichoke 750 ml", "goal": "Extract a concentrate richer in polyphenols with superior intensity." },
          "de": { "title": "Artischocke Intensiv 750 ml", "goal": "Extraktion eines polyphenolreicheren Konzentrats mit höherer Intensität." }
        },
        "plant": {
          "name": "Artichaut",
          "part": "feuilles sèches en sachets",
          "sachet_weight_g": 2.46,
          "sachet_count": 10,
          "total_plant_mass_g": 24.6
        },
        "solvent": {
          "type": "water_ethanol",
          "water_volume_ml": 550,
          "ethanol_volume_ml": 200,
          "ethanol_percent_final": 25,
          "notes": "Éthanol alimentaire dilué avant usage."
        },
        "process": {
          "method": "infusion_renforcee",
          "temperature_c": 70,
          "time_min": 60,
          "steps": [
            "Ouvrir les sachets et verser le contenu dans la cuve.",
            "Ajouter le mélange eau-éthanol.",
            "Chauffer à 70 °C pendant 60 minutes.",
            "Filtrer à chaud.",
            "Refroidir puis conserver au réfrigérateur."
          ]
        },
        "use": {
          "duration_hours": 24,
          "servings": [
            { "time": "matin", "volume_ml": 180 },
            { "time": "midi", "volume_ml": 180 },
            { "time": "apres-midi", "volume_ml": 180 },
            { "time": "fin_d_apres_midi", "volume_ml": 180 }
          ],
          "notes": "Version plus active, à utiliser si la tolérance digestive est bonne."
        },
        "storage": {
          "fridge": true,
          "max_hours": 24,
          "absolute_max_hours": 48,
          "notes": "Mêmes règles de conservation que l'infusion classique."
        },
        "cta": {
          "label": "Utiliser cette recette dans le Reset Homéostasique",
          "href": "/reset-homeostasique"
        }
      },
      {
        "id": "artichaut-citron-750ml",
        "title": "Artichaut + citron 750 ml",
        "goal": "Stabiliser légèrement l'infusion grâce à l'acidification et améliorer la tolérance.",
        "translations": {
          "en": { "title": "Artichoke + Lemon 750 ml", "goal": "Slightly stabilize the infusion through acidification and improve tolerance." },
          "de": { "title": "Artischocke + Zitrone 750 ml", "goal": "Leichte Stabilisierung des Aufgusses durch Ansäuerung und Verbesserung der Verträglichkeit." }
        },
        "plant": {
          "name": "Artichaut",
          "part": "feuilles sèches en sachets",
          "sachet_weight_g": 2.46,
          "sachet_count": 10,
          "total_plant_mass_g": 24.6
        },
        "solvent": {
          "type": "water",
          "volume_ml": 750,
          "notes": "Citron ajouté après extraction, jamais pendant la chauffe."
        },
        "process": {
          "method": "infusion_acidifiee",
          "temperature_c": 60,
          "time_min": 90,
          "steps": [
            "Faire l'infusion classique à 60 °C pendant 90 minutes.",
            "Filtrer à chaud.",
            "Laisser refroidir légèrement.",
            "Ajouter le citron après extraction.",
            "Conserver immédiatement au réfrigérateur."
          ]
        },
        "use": {
          "duration_hours": 24,
          "servings": [
            { "time": "matin", "volume_ml": 190 },
            { "time": "midi", "volume_ml": 190 },
            { "time": "apres-midi", "volume_ml": 190 },
            { "time": "fin_d_apres_midi", "volume_ml": 190 }
          ],
          "notes": "Ajout de citron modéré : environ 1/2 citron pour 750 ml."
        },
        "storage": {
          "fridge": true,
          "max_hours": 24,
          "absolute_max_hours": 48,
          "notes": "Le citron améliore un peu la stabilité mais ne remplace pas le froid."
        },
        "cta": {
          "label": "Utiliser cette recette dans le Reset Homéostasique",
          "href": "/reset-homeostasique"
        }
      },
      {
        "id": "artichaut-base-quotidienne-24h",
        "title": "Artichaut base quotidienne 24 h",
        "goal": "Protocole simple pour consommation journalière régulière.",
        "translations": {
          "en": { "title": "Artichoke daily base 24 h", "goal": "Simple protocol for regular daily consumption." },
          "de": { "title": "Artischocke Tagesbasis 24 h", "goal": "Einfaches Protokoll für den regelmäßigen täglichen Verzehr." }
        },
        "plant": {
          "name": "Artichaut",
          "part": "feuilles sèches en sachets",
          "sachet_weight_g": 2.46,
          "sachet_count": 10,
          "total_plant_mass_g": 24.6
        },
        "solvent": {
          "type": "water",
          "volume_ml": 750,
          "notes": "Version la plus simple et la plus sûre pour un usage quotidien."
        },
        "process": {
          "method": "infusion_standard",
          "temperature_c": 60,
          "time_min": 90,
          "steps": [
            "Placer 10 sachets ouverts dans 750 ml d'eau.",
            "Chauffer à 60 °C pendant 90 minutes.",
            "Filtrer.",
            "Refroidir.",
            "Boire dans la journée."
          ]
        },
        "use": {
          "duration_hours": 24,
          "servings": [
            { "time": "matin", "volume_ml": 125 },
            { "time": "milieu_de_matinee", "volume_ml": 125 },
            { "time": "midi", "volume_ml": 125 },
            { "time": "apres-midi", "volume_ml": 125 },
            { "time": "fin_d_apres_midi", "volume_ml": 125 },
            { "time": "soir_tot", "volume_ml": 125 }
          ],
          "notes": "Fractionner la prise aide à répartir l'effet sur le foie et le confort digestif."
        },
        "storage": {
          "fridge": true,
          "max_hours": 24,
          "absolute_max_hours": 48,
          "notes": "Au-delà de 24 h, la qualité baisse; au-delà de 48 h, ne pas consommer."
        },
        "cta": {
          "label": "Utiliser cette recette dans le Reset Homéostasique",
          "href": "/reset-homeostasique"
        }
      }
    ]
  }
];
