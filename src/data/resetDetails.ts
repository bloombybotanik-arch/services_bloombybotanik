export interface ResetSectionDetail {
  id: string;
  title: string;
  objective: string;
  sections: {
    id: string;
    title: string;
    content: string[];
  }[];
  cta: {
    label: string;
    description: string;
    href: string;
  };
}

export const resetDetailsData: ResetSectionDetail[] = [
  {
    "id": "respiration",
    "title": "Respiration – Vague & Thymus",
    "objective": "Activer le nerf vague, éteindre l’inflammation",
    "sections": [
      {
        "id": "intro",
        "title": "Respirer autrement : un levier biochimique",
        "content": [
          "Respirer autrement n’est pas un « exercice de relaxation », c’est un levier biochimique direct sur un système entier : axe HPA (cortisol), nerf vague, variabilité cardiaque, digestion, sommeil et immunité de base.",
          "Dans le Reset, la respiration structurée est toujours le premier remède, avant la plante et avant le Binder : elle prépare le terrain sur lequel tout le reste va agir."
        ]
      },
      {
        "id": "respiration_pourquoi",
        "title": "Pourquoi respirer autrement change le corps",
        "content": [
          "Le nerf vague est la ligne directe entre cerveau, cœur, poumons, estomac et intestins : il module l’inflammation, le rythme cardiaque, la motilité digestive et la profondeur du sommeil.",
          "Quand il est sous‑sollicité (stress chronique, écrans, apnées, respiration courte et haute), il perd sa capacité à envoyer des signaux de calme et de réparation : l’inflammation de bas grade s’installe, le cortisol reste élevé, la digestion ralentit et le système reste coincé en mode « alerte » au lieu de passer en mode « réparation ».",
          "Respirer en conscience, selon une structure stable, ne cherche pas à « faire disparaître un symptôme » : cela remet en route le frein parasympathique et redonne au corps la capacité de se réguler lui‑même. C’est un reset fonctionnel, pas une astuce anti‑stress."
        ]
      },
      {
        "id": "respiration_coherence_cardiaque",
        "title": "La cohérence cardiaque de base",
        "content": [
          "Protocole recommandé : 3 fois par jour (matin, midi, fin d’après‑midi), pendant 5 minutes par session.",
          "6 respirations par minute : inspirer 5 secondes, expirer 5 secondes, par le nez si possible.",
          "Position : assise, pieds au sol, épaules lourdes, regard posé vers le bas ou la fenêtre, sans téléphone ni notification. Le corps doit pouvoir « sentir » que rien ne lui est demandé pendant ces 5 minutes.",
          "Effets attendus : baisse progressive du cortisol, amélioration de la variabilité cardiaque (HRV), bascule vers le parasympathique (digestion, réparation, immunité innée), préparation idéale pour les phases de drainage et pour le Binder du soir, que le corps recevra dans un état de réceptivité plutôt que de défense."
        ]
      },
      {
        "id": "respiration_4_8_soir",
        "title": "La respiration 4–8 avant le Binder",
        "content": [
          "Juste avant le Binder du soir : 4 minutes de respiration 4–8.",
          "Technique : inspirer pendant 4 temps, expirer pendant 8 temps, de préférence par le nez. Si 8 temps sont difficiles au début, rester dans une zone confortable et l’allonger progressivement.",
          "L’expiration longue est un signal direct pour le parasympathique : elle abaisse la tension fasciale, assouplit le diaphragme, ralentit le rythme cardiaque et ouvre le tube digestif.",
          "Dans le protocole Bloom, la 4–8 prépare le terrain digestif : le Binder arrive sur un intestin moins spasmodique, une motilité plus fluide et un nerf vague déjà engagé. On ne « calme » pas l’estomac, on change le mode de fonctionnement de l’ensemble axe HPA–vague–intestin."
        ]
      },
      {
        "id": "respiration_microcodage_vagal",
        "title": "Micro‑codage vagal au quotidien",
        "content": [
          "Ces micro‑gestes peuvent être insérés dans la journée, en complément de la cohérence cardiaque et de la 4–8.",
          "Soupir décompresseur : Inspirer légèrement. Expirer en deux temps : un premier soupir, puis un second plus long. Visualiser le diaphragme qui se défait, comme une ceinture desserrée. Ce double soupir déverrouille le diaphragme et le haut du fascia, libère la pression thoracique et envoie un signal rapide de désactivation de l’alerte interne.",
          "Vibration douce (son O ou M) : 3 minutes de son tenu, bouche ouverte (O) ou fermée (M). Le son doit être doux, confortable, sans forcer la voix. La vibration du thorax et de la zone laryngée stimule le nerf vague et le thymus, comme un petit massage interne de l’axe cœur–poumons–système immunitaire.",
          "Ces micro‑codages vagaux ne remplacent pas les phases du Reset, ils les amplifient : plus le nerf vague est entraîné, plus les plantes, les Binder et les changements alimentaires peuvent travailler sur un terrain qui sait déjà revenir au calme. Bloom ne traite pas un symptôme, Bloom rééduque un système. La respiration en est la première langue."
        ]
      }
    ],
    "cta": {
      "label": "Démarrer le Reset respiratoire",
      "description": "La respiration est la première langue du corps. Apprenez à lui parler pour éteindre l'inflammation.",
      "href": "/reset-homeostasique"
    }
  },
  {
    "id": "mouvement",
    "title": "Mouvement – Fascia & fluides",
    "objective": "Mouvement : faire circuler les fluides, libérer le fascia",
    "sections": [
      {
        "id": "mouvement_intro",
        "title": "Une hygiène biologique indispensable",
        "content": [
          "Le mouvement quotidien n’est pas un sport en plus du Reset, c’est une hygiène biologique au même titre que la respiration ou l’alimentation : il met en circulation les fluides, libère le fascia, active la lymphe, protège les reins et le foie, et stimule le système endocannabinoïde.",
          "Sans circulation, les plantes mobilisent, mais les toxines restent piégées. Bloom ne cherche pas à « brûler des calories », mais à remettre en mouvement un système entier."
        ]
      },
      {
        "id": "mouvement_fascia",
        "title": "Le fascia, réseau caché du corps",
        "content": [
          "Le fascia est le tissu qui relie muscles, organes et peau : il transporte fluide, tension et information immunitaire, comme une toile vivante qui enveloppe tout.",
          "Un fascia figé (sédentarité, stress, écrans, postures répétitives) bloque la circulation lymphatique et ralentit l’élimination des toxines mobilisées par les plantes et les Binder. Le Reset ne peut pas circuler dans un corps immobile : les voies sont ouvertes, mais l’eau ne coule pas."
        ]
      },
      {
        "id": "mouvement_marche_quotidienne",
        "title": "45 minutes de mouvement simple par jour",
        "content": [
          "Objectif quotidien : marcher 30 à 45 minutes par jour, idéalement dehors, à rythme confortable, sans chercher la performance.",
          "Possibilité de fractionner : 3 × 15 minutes autour des repas (après le déjeuner et/ou le dîner, ce qui aide aussi la glycémie).",
          "Ajouter 2 à 3 fois par semaine : une séance de musculation douce (poids du corps, bandes élastiques) ou de yoga/pilates pour mobiliser le fascia, les hanches et la colonne.",
          "Ce mouvement n’est pas un « bonus fitness » : c’est ce qui permet à la lymphe, au sang et aux Binders de faire leur travail jusqu’au bout."
        ]
      },
      {
        "id": "mouvement_effets_systemiques",
        "title": "Effets sur les systèmes du corps",
        "content": [
          "Axe HPA / nerf vague : le mouvement régulier baisse le cortisol chronique, protège le nerf vague et évite l’axe « stress permanent » qui maintient NF‑κB actif et l’inflammation de bas grade.",
          "Terrain intestinal : le mouvement stimule le péristaltisme, réduit la stagnation qui nourrit dysbiose, LPS et fermentation excessive ; il aide l’intestin à « suivre » le travail des plantes et des fibres.",
          "Terrain énergétique (pré‑ménopause & au‑delà) : la marche et la musculation douce maintiennent la masse musculaire et la dépense de repos ; le même repas est alors utilisé et non stocké. On ne corrige pas seulement un poids, on corrige une façon d’utiliser l’énergie.",
          "Bloom n’utilise pas le mouvement pour faire disparaître un symptôme : il le place au service d’un terrain qui doit redevenir capable de brûler, drainer et réparer."
        ]
      },
      {
        "id": "mouvement_rituels_fascia",
        "title": "Rituels fascia à intégrer",
        "content": [
          "Étirements myofasciaux : 10 minutes le matin (hanches, dos, cage thoracique, épaules) pour « ouvrir les éponges » tissulaires et relâcher les zones qui accumulent la tension.",
          "Thymus tapping : 5 minutes de tapotements doux sur le sternum, en respiration lente, pour stimuler le thymus, le nerf vague et l’immunité innée. Le corps reçoit un signal clair : il peut passer du mode alerte au mode réparation.",
          "Ces rituels ne remplacent pas les phases du Reset, ils les accompagnent : plus le fascia circule, plus les plantes et les Binder travaillent sur un terrain vivant."
        ]
      }
    ],
    "cta": {
      "label": "Activer la circulation du Reset",
      "description": "Le mouvement n'est pas un bonus, c'est ce qui permet aux Binders de faire leur travail jusqu'au bout.",
      "href": "/reset-homeostasique"
    }
  },
  {
    "id": "sommeil",
    "title": "Sommeil – Nuit de reconstruction",
    "objective": "Sommeil : la nuit reconstruit ce que le jour draine",
    "sections": [
      {
        "id": "sommeil_intro",
        "title": "La nuit : phase de reconstruction",
        "content": [
          "Le Reset Homéostasique sépare volontairement les moments de mobilisation (plantes, drainage, Binder) et les moments de reconstruction (sommeil profond).",
          "La nuit n’est pas une pause neutre : c’est la phase où le fascia, le foie, l’intestin et les axes HPA/SEC reconstruisent ce que le jour a libéré."
        ]
      },
      {
        "id": "sommeil_circadien_foie",
        "title": "Le foie travaille la nuit",
        "content": [
          "Le foie a son pic de détoxification entre 1h et 3h du matin : il déverse ses toxines dans la bile, puis vers l’intestin.",
          "Le Binder (zéolithe, bentonite, charbon) pris au coucher capture ce flux nocturne, évite la recirculation entero‑hépatique et protège le terrain pendant que le corps reconstruit. On ne « nettoie » pas le foie une fois pour toutes, on lui donne chaque nuit un moyen de terminer son cycle."
        ]
      },
      {
        "id": "sommeil_quatuor_soir",
        "title": "Le quatuor de reconstruction du soir",
        "content": [
          "Ashwagandha (extrait standardisé) : frein de l’axe HPA, baisse du cortisol vespéral, prépare la reméthylation de FKBP5 et la consolidation hippocampique : moins de boucle « stress – rumination », plus de mémoire des signaux de sécurité.",
          "Houblon : Effet GABA‑ergique, facilite l’endormissement et agit sur NF‑κB et les cytokines vespérales : il aide le corps à quitter la veille inflammatoire pour entrer dans un sommeil réparateur.",
          "Glycine (environ 3 g) : Baisse la température centrale, induit le sommeil delta, stimule la synthèse de collagène (fascia) et renforce les jonctions serrées intestinales : elle nourrit à la fois le tissu conjonctif et la barrière intestinale pendant la phase de réparation.",
          "Bardane (si incluse) : Inuline et lactones sesquiterpéniques : travail nocturne sur microbiote, foie et terrain cutané. Elle participe au volet « terrain » du quatuor plutôt qu’ à un effet sédatif direct."
        ]
      },
      {
        "id": "sommeil_timing_remedes",
        "title": "Timing du soir : remèdes et Binder",
        "content": [
          "Prendre le quatuor nocturne 45 à 60 minutes avant le coucher.",
          "Prendre le Binder au moment du coucher, pour capturer toxines, LPS et métaux lourds mobilisés dans la journée, sans interférer avec les actifs déjà absorbés.",
          "Ce timing respecte la chronobiologie : les remèdes entrent d’abord dans le système, puis le Binder vient refermer la porte sur ce que le foie et l’intestin évacuent."
        ]
      },
      {
        "id": "sommeil_hygiene",
        "title": "Hygiène de sommeil Bloom",
        "content": [
          "Dîner léger et tôt : Dîner avant 19h, en quantité modérée, pour ne pas surcharger le foie au moment de sa phase de détox nocturne. Un repas tardif ou lourd détourne l’énergie vers la digestion au lieu de la régénération.",
          "Lumière & obscurité : Exposition à la lumière naturelle le matin (dans les 30 minutes après le réveil) pour ancrer la courbe cortisol–mélatonine, et obscurité réelle le soir (pas d’écran au lit, téléphone en mode avion) pour laisser la mélatonine travailler.",
          "Rituel complet : Respiration 4–8, quatuor nocturne, Binder, puis sommeil dans une chambre sombre et calme. Ce rituel ne combat pas l’insomnie par la force, il aligne les signaux : nerf vague, HPA, SEC, foie et intestin reçoivent tous la même information de nuit."
        ]
      },
      {
        "id": "sommeil_systemes",
        "title": "Systèmes reconstruits pendant la nuit",
        "content": [
          "Fascia et peau : la glycine et le sommeil delta permettent la reconstruction du collagène et du tissu conjonctif ; c’est la « couture nocturne » des tissus mobilisés par les phases de journée.",
          "Intestin et microbiote : la nuit laisse les fibres, les polysaccharides marins et les probiotiques travailler sur la barrière intestinale sans nouveaux stress mécaniques ou glycémiques.",
          "Axes HPA / SEC : un sommeil stable baisse le cortisol chronique, rééquilibre le système endocannabinoïde et réduit cravings, inflammation et fatigue. On ne vise pas seulement « mieux dormir », on vise un changement de mode de fonctionnement du système de stress."
        ]
      }
    ],
    "cta": {
      "label": "Consolider la nuit",
      "description": "Le sommeil est l'espace où le corps redevient capable de se réguler. Optimisez votre reconstruction nocturne.",
      "href": "/reset-homeostasique"
    }
  },
  {
    "id": "alimentation",
    "title": "Alimentation – Nourrir le terrain",
    "objective": "Alimentation : nourrir le terrain plutôt que le symptôme",
    "sections": [
      {
        "id": "alimentation_intro",
        "title": "Nourrir les fondations",
        "content": [
          "L’alimentation Bloom ne cherche pas à « manger anti‑symptôme » mais à nourrir les fondations : foie, microbiote, barrière intestinale, système rénine–angiotensine et axe HPA.",
          "Hydratation, timing, mastication et choix des aliments sont les gestes quotidiens qui mettent le Reset au service d’un terrain vivant."
        ]
      },
      {
        "id": "alimentation_hydratation",
        "title": "Hydratation et ouverture du terrain",
        "content": [
          "Au réveil : 500 ml d’eau tiède avec 1/2 citron et une pincée de sel marin non raffiné pour ouvrir les canaux d’élimination, préparer foie et reins et relancer doucement la circulation.",
          "Puis séquence Phase 0 :",
          "Psyllium (gel protecteur) : tapisse et protège la muqueuse, aide le transit et prépare la barrière à recevoir les plantes.",
          "Aloé + citron : jonctions serrées + bile, soutien des entérocytes et du foie.",
          "Chondrus + Dulse : prébiotique marin + minéraux anti‑inflammatoires, soutien simultané des reins, de l’intestin et du terrain minéral.",
          "Hydrater ne sert pas à « boire plus » : cela met en mouvement la Phase III (élimination) avant de mobiliser, pour que ce qui est lâché puisse sortir."
        ]
      },
      {
        "id": "alimentation_mastication_timing",
        "title": "Mastication et fenêtre alimentaire",
        "content": [
          "Mastication : viser au moins 20 mastications par bouchée pour réduire fermentation, LPS et améliorer la satiété. La bouche est la première « BloomLab » : moins elle fait, plus l’intestin souffre.",
          "Fenêtre alimentaire : idéalement 8h–18h/19h, avec dîner léger et pris tôt. Cette organisation réduit l’inflammation de bas grade, stabilise le métabolisme et respecte l’horloge du foie et du microbiome.",
          "On ne compte pas les calories : on aligne l’heure, la quantité et l’état dans lequel on mange (présence, mastication, rythme)."
        ]
      },
      {
        "id": "alimentation_a_favoriser",
        "title": "Ce qu’il faut privilégier",
        "content": [
          "Légumes verts de saison (épinards, céleri, courgette, brocoli, artichaut, asperges) : soutien du foie, baisse de la « chaleur interne » et apport de fibres fermentescibles pour le microbiote.",
          "Bouillons d’os 3 fois par semaine : Source de glycine, collagène, minéraux et glutamine pour fascia et barrière intestinale. Ils complémentent le travail nocturne du quatuor et des phases de reconstruction.",
          "Glucides de qualité (carottes, betteraves, patates douces, riz complet, millet, quinoa, azuki, yuca) : soutien de l’énergie sans surcharger en sucres rapides ; ils nourrissent la cellule plutôt que le craving.",
          "Poisson bleu, oméga‑3, graines de qualité (sardines, maquereaux, huiles riches en oméga‑3, sésame noir, noix) : baisse de NF‑κB, soutien des membranes et du système endocannabinoïde, protection vasculaire.",
          "Algues (Chondrus, Dulse, autres) : Minéraux, fucanes anti‑inflammatoires, soutien des reins et de l’intestin ; elles complètent la dimension « eau salée vivante » du protocole.",
          "Bloom ne construit pas un « régime spécial maladie ». Il construit une routine alimentaire de terrain qui rend le corps capable de recevoir les plantes, d’en extraire ce qui lui convient, et de renvoyer le reste vers la sortie."
        ]
      }
    ],
    "cta": {
      "label": "Nourrir mon terrain",
      "description": "L'alimentation est le socle de la transformation. Adoptez une routine qui respecte votre biologie.",
      "href": "/culinaire"
    }
  }
];
