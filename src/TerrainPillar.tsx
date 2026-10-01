import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronRight, 
  ArrowRight, 
  Leaf, 
  Sparkles, 
  BookOpen, 
  ShieldCheck, 
  ShieldAlert, 
  Droplets, 
  Activity, 
  Zap, 
  Target, 
  Waves, 
  Wind, 
  Flame, 
  Moon, 
  CheckCircle2, 
  AlertTriangle, 
  HeartHandshake, 
  HelpCircle, 
  Compass, 
  Layers, 
  Network,
  Clock,
  ExternalLink
} from 'lucide-react';
import { Language } from './translations';
import { plantsDatabase } from './data/therapeuticData';
import { getProducts } from './StoreContent';
import { FreemiumPaywallGate } from './components/FreemiumPaywallGate';

interface TerrainPillarProps {
  terrainId?: string;
  lang: Language;
  onNavigate: (view: any, id?: string) => void;
}

export interface SevenTerrainItem {
  id: string;
  code: string;
  number: number;
  title: string;
  subtitle: string;
  shortDescription: string;
  internalReference: string;
  icon: any;
  gradient: string;
  accentColor: string;
  description: string[];
  observePoints: string[];
  toRemember: string;
  keyPlants: string[];
  transversalTags?: string[];
}

export const SEVEN_TERRAINS: SevenTerrainItem[] = [
  {
    id: 'digestion_microbiome',
    code: 'T1',
    number: 1,
    title: 'Digestion & microbiome',
    subtitle: 'Le point de départ quotidien',
    shortDescription: 'Comprendre les liens entre alimentation, diversité végétale, confort digestif et routines quotidiennes.',
    internalReference: 'Terrain intestinal, microbiome et barrière',
    icon: Droplets,
    gradient: 'from-blue-50 to-indigo-50/60',
    accentColor: '#1d4ed8',
    description: [
      "Le système digestif ne se limite pas à transformer les aliments. Il participe à la tolérance alimentaire, aux signaux de faim et de satiété, à la relation avec le système immunitaire et à la communication entre l’intestin et le cerveau.",
      "Le mot microbiome désigne l’ensemble des micro-organismes qui vivent notamment dans notre intestin. Leur diversité dépend de nombreux facteurs : variété alimentaire, fibres, sommeil, stress, alcool, antibiotiques, activité physique, âge et environnement."
    ],
    observePoints: [
      "La régularité des repas et des rythmes de mastication ;",
      "La diversité et la saisonnalité des végétaux consommés ;",
      "La place des fibres douces et prébiotiques dans l’alimentation ;",
      "L’hydratation régulière tout au long de la journée ;",
      "Le rythme naturel du transit intestinal ;",
      "Le contexte émotionnel et le calme dans lequel nous mangeons ;",
      "La façon dont une recette botanique s’intègre dans une routine globale."
    ],
    toRemember: "Une plante ne “répare” pas à elle seule un microbiome. Une préparation botanique peut s’inscrire dans une pratique plus large, mais elle ne remplace ni un bilan médical ni une prise en charge lorsque des symptômes persistent, sont inhabituels ou importants.",
    keyPlants: ['Menthe poivrée', 'Mélisse', 'Fenouil', 'Camomille matricaire', 'Réglisse']
  },
  {
    id: 'liver_metabolic_balance',
    code: 'T2',
    number: 2,
    title: 'Foie & équilibre métabolique',
    subtitle: 'Un carrefour de transformation',
    shortDescription: 'Explorer les habitudes de vie, les plantes amères, la cuisine botanique et les routines qui participent à l’équilibre quotidien.',
    internalReference: 'Terrain hépatique et métabolique',
    icon: Activity,
    gradient: 'from-amber-50 to-yellow-50/60',
    accentColor: '#b45309',
    description: [
      "Le foie intervient dans de nombreuses fonctions indispensables : transformation des nutriments, stockage et libération d’énergie, traitement de certaines substances, production de bile et participation au métabolisme de nombreuses molécules.",
      "Dans le langage Bloom, parler du terrain hépatique ne signifie pas “nettoyer le foie”. Cette expression est simplificatrice et ne décrit pas précisément le fonctionnement réel de l’organisme. Il s’agit plutôt de s’intéresser aux habitudes qui soutiennent l'équilibre au quotidien.",
      "Les plantes amères, les aromatiques et certaines traditions culinaires peuvent faire partie de cet univers. Elles doivent être comprises dans leur contexte, avec leurs précautions, leurs limites et leurs contre-indications éventuelles."
    ],
    observePoints: [
      "La régularité des horaires de repas ;",
      "La réduction de la place des aliments ultra-transformés et des sucres rapides ;",
      "La modération stricte de la consommation d’alcool ;",
      "La qualité et la durée du sommeil réparateur ;",
      "La pratique d’une activité physique douce et régulière ;",
      "La variété de l’alimentation et l’apport en légumes amers ;",
      "L’organisation de périodes de repos digestif ;",
      "La vigilance face à l’exposition à certaines substances environnementales."
    ],
    toRemember: "Le terrain Foie & équilibre métabolique est un repère éducatif. Il ne permet pas de diagnostiquer une maladie du foie, un trouble métabolique ou une intolérance. Une fatigue importante, une douleur, une jaunisse, une perte de poids inexpliquée ou toute anomalie persistante nécessite un avis médical.",
    keyPlants: ['Artichaut', 'Chardon-Marie', 'Desmodium', 'Romarin', 'Radis noir']
  },
  {
    id: 'immune_regulation',
    code: 'T3',
    number: 3,
    title: 'Défenses & régulation immunitaire',
    subtitle: 'Protéger sans sur-réagir',
    shortDescription: 'Découvrir les pratiques saisonnières, les plantes et les habitudes qui s’inscrivent dans une approche globale du bien-être.',
    internalReference: 'Terrain immunitaire',
    icon: ShieldCheck,
    gradient: 'from-emerald-50 to-teal-50/60',
    accentColor: '#047857',
    description: [
      "Le système immunitaire n’est pas un interrupteur que l’on devrait simplement “booster”. Il doit savoir reconnaître, protéger, tolérer et revenir à l’équilibre après une réponse.",
      "Dans l’Académie Bloom, ce terrain permet de comprendre pourquoi les saisons, les rythmes de vie et les habitudes quotidiennes comptent autant que le choix d’une plante. Il invite à mieux distinguer un usage traditionnel, une préparation culinaire ou aromatique, une allégation et un traitement médical."
    ],
    observePoints: [
      "La régularité du sommeil et le respect des heures de repos ;",
      "Une alimentation riche en micro-nutriments et antioxydants ;",
      "Une activité physique en extérieur et contact avec les éléments ;",
      "La gestion des épisodes de stress aigu ou chronique ;",
      "L’adaptation aux changements de saisons et températures ;",
      "L’évaluation de certaines carences (notamment vitamine D, zinc) avec un professionnel ;",
      "L’état de la barrière digestive et du microbiome intestinal ;",
      "La prise en compte rigoureuse des antécédents et traitements en cours."
    ],
    toRemember: "Les plantes ne remplacent pas une vaccination, un traitement, un diagnostic ou une prise en charge médicale. Certaines plantes peuvent interagir avec des médicaments ou ne pas convenir à certaines situations. Le mot “immunité” doit toujours être abordé avec mesure.",
    keyPlants: ['Échinacée', 'Sureau noir', 'Thym', 'Astragale', 'Ravintsara']
  },
  {
    id: 'stress_adaptation',
    code: 'T4',
    number: 4,
    title: 'Stress & adaptation',
    subtitle: 'Le corps s’adapte en permanence',
    shortDescription: 'Comprendre comment les rythmes, le repos, la lumière, la respiration et les routines influencent la récupération.',
    internalReference: 'Terrain HPA et adaptation neuroendocrinienne',
    icon: Zap,
    gradient: 'from-violet-50 to-purple-50/60',
    accentColor: '#6d28d9',
    description: [
      "Le stress n’est pas seulement une émotion. C’est aussi une réponse physiologique du corps à une demande : manque de sommeil, contrainte professionnelle, douleur, infection, bruit, alimentation désorganisée, surcharge mentale, entraînement intense ou événement de vie.",
      "L’organisme mobilise alors des mécanismes d’adaptation neuroendocriniens (axe HPA). Ils sont utiles et protecteurs à court terme. Mais lorsqu’ils sont sollicités en continu, la récupération devient plus difficile.",
      "Certaines plantes sont traditionnellement associées à des moments de calme ou à des rituels du soir. Cela ne signifie pas qu’elles traitent l’anxiété, la dépression ou un trouble du sommeil."
    ],
    observePoints: [
      "La régularité des horaires de lever et de coucher ;",
      "La qualité globale du sommeil profond ;",
      "L’instauration de périodes régulières sans écran ;",
      "L’équilibre réel entre périodes d’activité et plages de récupération ;",
      "La conscience respiratoire (cohérence cardiaque, respirations lentes) ;",
      "L’exposition quotidienne à la lumière naturelle dès le matin ;",
      "La qualité des relations sociales et du soutien relationnel ;",
      "Les routines du soir qui permettent réellement de ralentir le système nerveux."
    ],
    toRemember: "Un stress intense, une anxiété persistante, une humeur très dégradée, des crises répétées ou des pensées suicidaires ne relèvent pas d’un programme botanique. Il faut consulter rapidement un professionnel de santé ou les services d’urgence appropriés.",
    keyPlants: ['Ashwagandha', 'Rhodiola rosea', 'Basilic sacré (Tulsi)', 'Éleuthérocoque']
  },
  {
    id: 'energy_recovery',
    code: 'T5',
    number: 5,
    title: 'Énergie & récupération',
    subtitle: 'L’énergie ne dépend pas d’un seul facteur',
    shortDescription: 'Explorer les liens entre sommeil, alimentation, activité, repos et sensation d’énergie au quotidien.',
    internalReference: 'Terrain mitochondrial et énergétique',
    icon: Target,
    gradient: 'from-orange-50 to-amber-50/60',
    accentColor: '#c2410c',
    description: [
      "La sensation d’énergie dépend d’un réseau complexe d'éléments : sommeil, apport alimentaire de qualité, hydratation, activité physique, exposition à la lumière, charge mentale, rythme de travail, récupération et état de santé général.",
      "Les mitochondries, souvent décrites comme les structures qui participent à la production d’énergie cellulaire (ATP), font partie de cette histoire. Mais réduire la vitalité à un seul mécanisme moléculaire serait réducteur.",
      "Dans la pratique Bloom, ce terrain sert à structurer les habitudes du quotidien pour soutenir la vitalité sur la durée."
    ],
    observePoints: [
      "La mise en place de routines calmes et structurées le matin ;",
      "Le rythme et la composition des repas pour éviter les pics et chutes d'énergie ;",
      "L’équilibre équitable entre dépense physique et temps de repos ;",
      "Les préparations culinaires végétales revitalisantes ;",
      "L’organisation d’une pratique botanique régulière et mesurée ;",
      "La manière de respecter ses propres signaux corporels de fatigue."
    ],
    toRemember: "Une fatigue durable, inhabituelle ou invalidante peut avoir de nombreuses causes médicales (anémie, déséquilibre thyroïdien, apnées du sommeil, infection, etc.). Elle ne doit pas être interprétée seule ni prise en charge uniquement avec des plantes ou des compléments.",
    keyPlants: ['Ginseng', 'Maca', 'Ortie dioïque', 'Cynorrhodon']
  },
  {
    id: 'elimination_circulation',
    code: 'T6',
    number: 6,
    title: 'Élimination & circulation',
    subtitle: 'Les gestes qui soutiennent le mouvement',
    shortDescription: 'Découvrir des pratiques liées à l’hydratation, au mouvement, au transit et aux routines de récupération.',
    internalReference: 'Terrain des émonctoires et circulation',
    icon: Waves,
    gradient: 'from-cyan-50 to-teal-50/60',
    accentColor: '#0f766e',
    description: [
      "Le corps possède ses propres voies physiologiques d’élimination et d’échange : reins, intestin, peau, poumons, foie, circulation sanguine et système lymphatique participent activement à son homéostasie quotidienne.",
      "Dans le langage Bloom, ce terrain ne doit pas être confondu avec la promesse de “drainer les toxines” ou de “purifier le sang”. Ces formules sont vagues, obsolètes et peuvent créer de fausses attentes.",
      "Le terrain Élimination & circulation permet plutôt de parler de gestes simples, vérifiables et mesurables au quotidien."
    ],
    observePoints: [
      "Boire suffisamment d’eau pure selon ses besoins individuels et son activité ;",
      "Bouger régulièrement au cours de la journée et marcher quotidiennement ;",
      "Éviter la sédentarité prolongée et changer de posture ;",
      "Soutenir un transit intestinal régulier grâce aux fibres alimentaires ;",
      "Respecter un temps de sommeil suffisant pour les échanges cellulaires ;",
      "Réduire la consommation de tabac et d'alcool ;",
      "Organiser des temps de récupération passive (bains tièdes, étirements) ;",
      "Découvrir des usages culinaires et aromatiques traditionnels de certaines plantes."
    ],
    toRemember: "Les plantes diurétiques, les préparations concentrées ou certains extraits peuvent présenter des risques, notamment en cas de maladie rénale, cardiaque, de traitement médicamenteux ou de grossesse. Elles ne doivent pas être utilisées comme solutions de “détox” sans discernement.",
    keyPlants: ['Pissenlit', 'Prêle des champs', 'Piloselle', 'Vigne rouge', 'Reine des prés']
  },
  {
    id: 'serenity_sleep_recovery',
    code: 'T7',
    number: 7,
    title: 'Sérénité, sommeil & récupération nerveuse',
    subtitle: 'Créer des conditions favorables au repos',
    shortDescription: 'Créer des conditions favorables au calme, aux rituels du soir et à une récupération plus régulière.',
    internalReference: 'Terrain psycho-émotionnel, système nerveux et axes circadiens transversaux',
    icon: Wind,
    gradient: 'from-indigo-50 to-blue-50/60',
    accentColor: '#4338ca',
    description: [
      "Le sommeil et la récupération ne dépendent pas uniquement de ce que l’on consomme le soir. Ils reposent sur un écosystème global : exposition à la lumière le jour, obscurité la nuit, rythme des repas, température de la chambre, activité physique, stress, temps d'écran, habitudes de coucher et environnement sonore.",
      "Ce terrain relie deux dimensions qui se nourrissent mutuellement : la sérénité (la capacité à aménager des moments de calme dans la journée) et la récupération (la capacité à respecter les conditions d'un repos plus régulier et profond)."
    ],
    observePoints: [
      "La mise en place de rituels de préparation du soir calmes et répétitifs ;",
      "L’utilisation raisonnée de plantes aromatiques douces ;",
      "Des infusions du soir préparées à température modérée selon les recettes de l'Académie ;",
      "Des pratiques simples de respiration apaisante avant le coucher ;",
      "Des routines sans écran au moins 60 minutes avant de dormir ;",
      "Des gestes de soin externe (automassage tiède, huiles végétales nourrissantes) ;",
      "Une organisation plus consciente et allégée de son temps de soirée."
    ],
    toRemember: "Les troubles du sommeil persistants, les apnées, les réveils répétés, la somnolence diurne importante ou les troubles anxieux nécessitent une évaluation médicale. Une routine botanique peut accompagner un rituel, mais elle ne remplace pas une prise en charge adaptée.",
    keyPlants: ['Passiflore', 'Valériane', 'Eschscholzia', 'Aubépine', 'Lavande vraie']
  }
];

export default function TerrainPillar({ terrainId, lang, onNavigate }: TerrainPillarProps) {
  const isFR = lang === 'fr';
  const [selectedTerrainId, setSelectedTerrainId] = useState<string>(() => {
    if (!terrainId) return 'digestion_microbiome';
    // Match by code (T1..T7) or id
    const clean = terrainId.toLowerCase().trim();
    if (clean === 't1' || clean.includes('microbiome') || clean.includes('digest')) return 'digestion_microbiome';
    if (clean === 't2' || clean.includes('foie') || clean.includes('metabol')) return 'liver_metabolic_balance';
    if (clean === 't3' || clean.includes('immuni') || clean.includes('defens')) return 'immune_regulation';
    if (clean === 't4' || clean.includes('stress') || clean.includes('adapt') || clean.includes('hpa')) return 'stress_adaptation';
    if (clean === 't5' || clean.includes('energie') || clean.includes('energy') || clean.includes('mito')) return 'energy_recovery';
    if (clean === 't6' || clean.includes('elimin') || clean.includes('circul') || clean.includes('emonct')) return 'elimination_circulation';
    if (clean === 't7' || clean.includes('seren') || clean.includes('sommeil') || clean.includes('sleep')) return 'serenity_sleep_recovery';
    return 'digestion_microbiome';
  });

  const [expandedTerrain, setExpandedTerrain] = useState<string | null>(null);

  useEffect(() => {
    const pageTitle = "Les 7 Terrains | Comprendre le corps | Bloom Académie";
    const pageDesc = "Découvrez les 7 Terrains Bloom : une grille pédagogique pour comprendre les liens entre digestion, énergie, stress, sommeil, habitudes de vie et préparation botanique.";
    document.title = pageTitle;

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', pageDesc);

    // Schema.org Structured Data
    const schemaScriptId = 'schema-7-terrains';
    let scriptTag = document.getElementById(schemaScriptId) as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = schemaScriptId;
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }

    const schemaData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Article",
          "headline": pageTitle,
          "description": pageDesc,
          "url": "https://bloombybotanik.com/academie/comprendre-le-corps/7-terrains/",
          "image": "https://bloombybotanik.com/images/og/bloom-extracteur-infuseur-botanique-1200x630.jpg",
          "publisher": {
            "@type": "Organization",
            "name": "Bloom by BotaniK",
            "url": "https://bloombybotanik.com"
          },
          "inLanguage": "fr-FR"
        },
        {
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Accueil",
              "item": "https://bloombybotanik.com/"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Bloom Académie",
              "item": "https://bloombybotanik.com/academie/"
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": "Comprendre le Corps",
              "item": "https://bloombybotanik.com/academie/#comprendre-le-corps"
            },
            {
              "@type": "ListItem",
              "position": 4,
              "name": "Les 7 Terrains",
              "item": "https://bloombybotanik.com/academie/comprendre-le-corps/7-terrains/"
            }
          ]
        }
      ]
    };
    scriptTag.text = JSON.stringify(schemaData);

    return () => {
      const tag = document.getElementById(schemaScriptId);
      if (tag) tag.remove();
    };
  }, []);

  const scrollToTerrain = (terrainId: string) => {
    setSelectedTerrainId(terrainId);
    const el = document.getElementById(`terrain-${terrainId}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <article className="min-h-screen bg-[#FAF7F2] text-[#0F261E] selection:bg-[#c9a84c]/20 font-sans pb-24">
      
      {/* 1. TOP 7-TERRAINS BANDEAU (FOND VERT DU MENU + BOUTONS INVERSÉS AU SURVOL) */}
      <div className="bg-[#0F261E] border-b border-white/10 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4 overflow-x-auto no-scrollbar">
          <button
            onClick={() => onNavigate('academie')}
            className="text-xs font-bold text-white/80 hover:text-white shrink-0 flex items-center gap-1.5 transition-colors pr-3 border-r border-white/20 cursor-pointer"
          >
            ← Bloom Académie
          </button>
          
          <div className="flex items-center gap-2 shrink-0">
            {SEVEN_TERRAINS.map((terrain) => {
              const isSelected = selectedTerrainId === terrain.id;
              return (
                <button
                  key={terrain.id}
                  onClick={() => scrollToTerrain(terrain.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                    isSelected
                      ? 'bg-[#0F261E] text-white border-2 border-white shadow-md font-black'
                      : 'bg-white text-[#0F261E] hover:bg-[#0F261E] hover:text-white border border-white hover:border-white'
                  }`}
                >
                  <span>{terrain.code}</span>
                  <span className="opacity-40">•</span>
                  <span>{terrain.title}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 2. FIL D'ARIANE / BREADCRUMB */}
      <div className="border-b border-[#D8CBB7]/40 bg-white/70 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <nav aria-label="Fil d'Ariane" className="flex items-center gap-2 text-xs font-semibold text-slate-500 flex-wrap">
            <button 
              onClick={() => onNavigate('home')} 
              className="hover:text-[#1C3F34] transition-colors cursor-pointer"
            >
              Accueil
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <button 
              onClick={() => onNavigate('academie')} 
              className="hover:text-[#1C3F34] transition-colors cursor-pointer"
            >
              Bloom Académie
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <button 
              onClick={() => onNavigate('academie')} 
              className="hover:text-[#1C3F34] transition-colors cursor-pointer"
            >
              Comprendre le Corps
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="text-[#1C3F34] font-bold">Les 7 Terrains</span>
          </nav>

          <span className="text-[10px] uppercase font-bold tracking-widest text-[#1C3F34] bg-[#E8F1EE] px-2.5 py-1 rounded-full border border-[#D8CBB7]/50 hidden sm:inline-block">
            Grille Éditoriale Vivante
          </span>
        </div>
      </div>

      {/* 3. HERO PRINCIPAL */}
      <header className="relative border-b border-[#D8CBB7]/40 bg-gradient-to-b from-white to-[#FAF7F2] pt-12 sm:pt-16 pb-12 sm:pb-16 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto space-y-6">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1C3F34]/10 border border-[#1C3F34]/20 text-[#1C3F34] text-xs font-bold uppercase tracking-widest">
            <Compass className="w-4 h-4 text-[#D97706]" />
            <span>COMPRENDRE LE CORPS</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-[#0F261E] tracking-tight leading-[1.1]">
            Les 7 Terrains
          </h1>

          <p className="text-lg sm:text-xl text-slate-700 leading-relaxed font-normal max-w-3xl">
            Les 7 Terrains Bloom sont sept repères pour comprendre comment les grands systèmes du corps interagissent au quotidien. Ils ne remplacent pas un diagnostic : ils aident à observer les liens entre digestion, énergie, sommeil, stress, habitudes de vie et préparation botanique.
          </p>

          {/* Invitation pédagogique de bienvenue */}
          <div className="p-5 sm:p-6 rounded-2xl bg-[#E8F1EE] border border-[#D8CBB7] space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1C3F34]">
              <Sparkles className="w-4 h-4 text-[#D97706]" />
              <span>Porte d’entrée de l’Académie</span>
            </div>
            <p className="text-sm sm:text-base text-[#0F261E] font-medium leading-relaxed">
              Les 7 Terrains Bloom sont 7 portes d’entrée pour apprendre. Vous n’avez pas besoin de tout maîtriser. Choisissez le sujet qui vous parle le plus aujourd’hui.
            </p>
          </div>

          {/* Deux images réelles produit & préparation indexables (RÈGLE V1) */}
          <div className="grid sm:grid-cols-2 gap-6 my-6">
            <div className="rounded-2xl overflow-hidden border border-[#D8CBB7] bg-white shadow-sm flex flex-col">
              <div className="relative aspect-[16/10] overflow-hidden bg-[#FAF7F2]">
                <img
                  src="/img/produit/bloomlab-cuisine-1200x630.jpg"
                  alt={lang === 'fr' ? "Extracteur botanique BloomLab® en situation de cuisine pour l'équilibre des terrains" : lang === 'de' ? "Botanischer Extraktor BloomLab® in der Küche für das Gleichgewicht der Terrains" : "BloomLab® botanical extractor in kitchen setting for terrain balance"}
                  width={1200}
                  height={630}
                  loading="eager"
                  fetchPriority="high"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-3 bg-[#FAF7F2] border-t border-[#D8CBB7]/40 flex items-center justify-between text-xs text-[#0F261E]/80">
                <span className="font-semibold">{lang === 'fr' ? "BloomLab® — Extraction de précision" : lang === 'de' ? "BloomLab® — Präzisionsextraktion" : "BloomLab® — Precision extraction"}</span>
                <span className="text-[10px] text-[#D97706] font-bold uppercase">Totum Végétal</span>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border border-[#D8CBB7] bg-white shadow-sm flex flex-col">
              <div className="relative aspect-[16/10] overflow-hidden bg-[#FAF7F2]">
                <img
                  src="/assets/images/modern_herbalist_shelves_1786699793560.jpg"
                  alt={lang === 'fr' ? "Exemple de préparation maison : flacons d'extraits botaniques et herboristerie moderne" : lang === 'de' ? "Beispiel einer Hauszubereitung: Flaschen mit botanischen Extrakten und moderner Kräuterkunde" : "Home preparation example: botanical extract bottles and modern herbalism"}
                  width={1200}
                  height={800}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-3 bg-[#FAF7F2] border-t border-[#D8CBB7]/40 flex items-center justify-between text-xs text-[#0F261E]/80">
                <span className="font-semibold">{lang === 'fr' ? "Exemple de préparations et extraits maison" : lang === 'de' ? "Beispiel für Hauszubereitungen" : "Example of home botanical preparations"}</span>
                <span className="text-[10px] text-[#1C3F34] font-bold uppercase">Herboristerie</span>
              </div>
            </div>
          </div>

          {/* Mini-repères horizontaux des 7 terrains */}
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2 pt-2">
            {SEVEN_TERRAINS.map((t) => (
              <button
                key={t.id}
                onClick={() => scrollToTerrain(t.id)}
                className="p-2.5 rounded-xl bg-white border border-[#E7DFD3] hover:border-[#1C3F34] hover:shadow-xs transition-all text-center space-y-1 cursor-pointer group"
              >
                <span className="text-[10px] font-mono font-bold text-[#D97706] block">{t.code}</span>
                <span className="text-xs font-bold text-[#0F261E] group-hover:text-[#1C3F34] line-clamp-1 block">
                  {t.title.split('&')[0].trim()}
                </span>
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-4 sm:gap-8 pt-4 text-xs font-mono text-slate-500 border-t border-[#D8CBB7]/40">
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#D97706]" />
              Lecture : 8 min
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-[#1C3F34]" />
              Niveau : Pédagogique Novice &amp; Adulte
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Non médical · Non prescriptif
            </span>
          </div>

        </div>
      </header>

      {/* 4. CORPS PRINCIPAL DE LA PAGE */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16 space-y-16">

        {/* SECTION 1 — COMPRENDRE LE CORPS COMME UN ENSEMBLE */}
        <section className="space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-white border-l-4 border-[#1C3F34] border-y border-r border-[#E7DFD3] space-y-4 shadow-sm">
            <div className="text-[10px] font-mono text-[#D97706] uppercase tracking-widest font-bold">
              Vision Systémique
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0F261E]">
              Comprendre le corps comme un ensemble
            </h2>
            <div className="space-y-4 text-base sm:text-lg text-slate-700 leading-relaxed font-light">
              <p>
                Le corps n’est pas une somme d’organes qui fonctionneraient séparément. La digestion influence l’énergie. Le sommeil modifie la manière dont nous gérons le stress. Le stress peut transformer l’appétit, le transit, la récupération et notre rapport à l’effort.
              </p>
              <p>
                Chez Bloom, nous appelons <strong className="text-[#0F261E] font-semibold">terrains</strong> les grands ensembles qui permettent de lire ces interactions.
              </p>
              <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#D8CBB7]/60 text-sm text-[#0F261E] space-y-2">
                <p className="font-semibold text-[#1C3F34]">
                  Ce ne sont pas des diagnostics. Ce ne sont pas des maladies. Ce ne sont pas non plus des cases dans lesquelles enfermer une personne.
                </p>
                <p className="text-slate-600 font-light">
                  Ce sont des repères pour mieux observer le quotidien, comprendre les liens entre différentes fonctions du corps et choisir une approche plus cohérente : alimentation, sommeil, activité physique, gestion du stress, environnement et, lorsque cela est adapté, préparation botanique.
                </p>
              </div>
              <p className="italic text-lg text-[#1C3F34] pt-1">
                « Un terrain n’explique jamais tout. Il aide à poser de meilleures questions. »
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2 — POURQUOI PARLER DE TERRAINS ? */}
        <section className="space-y-6">
          <div className="space-y-3">
            <div className="text-[10px] font-mono text-[#D97706] uppercase tracking-widest font-bold">
              Origines &amp; Biologie Moderne
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0F261E]">
              Pourquoi parler de terrains ?
            </h2>
          </div>

          <div className="space-y-4 text-base sm:text-lg text-slate-700 leading-relaxed font-light">
            <p>
              Pendant longtemps, les traditions de soin ont observé que deux personnes exposées aux mêmes habitudes ou aux mêmes contraintes ne réagissent pas toujours de la même manière.
            </p>
            <p>
              La biologie contemporaine décrit elle aussi un organisme fait d’interactions : système digestif, système nerveux, immunité, métabolisme, rythmes circadiens, tissus et environnement communiquent en permanence.
            </p>
            <p>
              Le modèle Bloom ne remplace ni une consultation ni un diagnostic médical. Il propose une manière d’organiser cette complexité en <strong className="text-[#0F261E] font-semibold">sept repères accessibles</strong> :
            </p>
          </div>

          {/* Liste ordonnée visuelle des 7 repères */}
          <div className="grid sm:grid-cols-2 gap-3 pt-2">
            {SEVEN_TERRAINS.map((item) => (
              <div 
                key={item.id}
                onClick={() => scrollToTerrain(item.id)}
                className="p-4 rounded-2xl bg-white border border-[#E7DFD3] hover:border-[#1C3F34] flex items-center justify-between gap-3 cursor-pointer group transition-all"
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-xl bg-[#E8F1EE] text-[#1C3F34] font-bold text-xs flex items-center justify-center font-mono">
                    0{item.number}
                  </span>
                  <div>
                    <h3 className="font-bold text-sm text-[#0F261E] group-hover:text-[#1C3F34] transition-colors">
                      {item.title}
                    </h3>
                    <span className="text-[11px] text-slate-500 line-clamp-1">{item.subtitle}</span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#1C3F34] group-hover:translate-x-1 transition-all" />
              </div>
            ))}
          </div>

          <p className="text-sm font-medium text-slate-600 italic pt-2">
            Ces terrains se recoupent. C’est normal : le vivant ne travaille pas en silos.
          </p>
        </section>

        {/* FREEMIUM GATE : SECTION 3 — LES 7 TERRAINS EN DÉTAIL */}
        <FreemiumPaywallGate
          onNavigate={onNavigate}
          lang={lang}
          title={lang === 'fr' ? 'Débloquez l’Exploration Approfondie des 7 Terrains' : lang === 'de' ? 'Vollständige Erkundung der 7 Terrains freischalten' : 'Unlock In-Depth Exploration of the 7 Terrains'}
          subtitle={lang === 'fr' ? 'L’introduction et la vue globale des 7 terrains sont en accès libre. Débloquez les fiches monographiques complètes, les signaux cliniques, les associations botaniques précises et les liens d’extraction avec votre abonnement.' : lang === 'de' ? 'Einführung und Gesamtübersicht sind frei zugänglich. Schalten Sie die vollständigen Monographien mit Ihrem Abonnement frei.' : 'Introduction and overview are open access. Unlock full monographs and botanical pairings with your subscription.'}
          bulletPoints={[
            lang === 'fr' ? 'Fiches d’observation complètes des Terrains T1 à T7' : 'Full observation sheets for Terrains T1 to T7',
            lang === 'fr' ? 'Synergies végétales Totum, ratios et polarités d’extraction' : 'Totum plant synergies, extraction ratios and polarities',
            lang === 'fr' ? 'Signaux d’alerte et repères du quotidien par terrain' : 'Warning signals and daily benchmarks per terrain',
            lang === 'fr' ? 'Accès illimité aux 4 Architectures, 9 Axes et Protocoles' : 'Unlimited access to 4 Architectures, 9 Axes and Protocols'
          ]}
        >
          {/* SECTION 3 — LES 7 TERRAINS EN DÉTAIL (LES 7 CARTES ÉDITORIALES) */}
          <section className="space-y-12">
          <div className="space-y-2 border-b border-[#D8CBB7]/40 pb-4">
            <div className="text-[10px] font-mono text-[#D97706] uppercase tracking-widest font-bold">
              Grille d’Observation
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0F261E]">
              Les 7 Terrains Bloom en Détail
            </h2>
            <p className="text-slate-600 text-sm">
              Chaque terrain invite à observer des signaux concrets du quotidien et rappelle ses limites déontologiques.
            </p>
          </div>

          <div className="space-y-12">
            {SEVEN_TERRAINS.map((terrain) => {
              const Icon = terrain.icon;
              const isExpanded = expandedTerrain === terrain.id;

              return (
                <div
                  key={terrain.id}
                  id={`terrain-${terrain.id}`}
                  className="scroll-mt-20 p-6 sm:p-10 rounded-[32px] bg-white border border-[#E7DFD3] shadow-sm hover:shadow-md transition-shadow space-y-8"
                >
                  {/* En-tête de la carte */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E7DFD3] pb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-[#E8F1EE] text-[#1C3F34] flex items-center justify-center shrink-0 shadow-xs border border-[#D8CBB7]/40">
                        <Icon className="w-7 h-7 text-[#1C3F34]" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold text-[#D97706] uppercase tracking-wider">
                            Terrain 0{terrain.number} • {terrain.code}
                          </span>
                          <span className="text-[10px] font-medium text-slate-400">• {terrain.internalReference}</span>
                        </div>
                        <h3 className="text-2xl sm:text-3xl font-black text-[#0F261E]">
                          {terrain.title}
                        </h3>
                        <p className="text-sm font-medium text-[#1C3F34]">{terrain.subtitle}</p>
                      </div>
                    </div>

                    <span className="text-xs text-slate-500 font-mono bg-[#FAF7F2] px-3 py-1.5 rounded-full border border-[#D8CBB7]/50 self-start sm:self-center">
                      Repère éducatif
                    </span>
                  </div>

                  {/* Paragraphes de présentation */}
                  <div className="space-y-3 text-base sm:text-lg text-slate-700 font-light leading-relaxed">
                    {terrain.description.map((paragraph, pIdx) => (
                      <p key={pIdx}>{paragraph}</p>
                    ))}
                  </div>

                  {/* Points concrets à observer */}
                  <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#E7DFD3] space-y-4">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-[#1C3F34] flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#D97706]" />
                      Chez Bloom, ce terrain invite à observer au quotidien :
                    </h4>
                    <ul className="grid sm:grid-cols-2 gap-2.5 text-xs sm:text-sm text-slate-700 pl-2">
                      {terrain.observePoints.map((pt, ptIdx) => (
                        <li key={ptIdx} className="flex items-start gap-2">
                          <span className="text-[#D97706] font-bold">•</span>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Encadré À retenir (Limites & responsabilité) */}
                  <div className="p-5 sm:p-6 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs sm:text-sm text-amber-950 flex items-start gap-3.5">
                    <AlertTriangle className="w-5 h-5 text-[#b45309] shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <strong className="font-bold text-[#b45309] uppercase tracking-wider block text-xs">
                        À retenir
                      </strong>
                      <p className="leading-relaxed font-normal">
                        {terrain.toRemember}
                      </p>
                    </div>
                  </div>

                  {/* Plantes Totum Végétal associées de l'Herbier */}
                  <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-[#E7DFD3]">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-bold text-slate-600 flex items-center gap-1.5">
                        <Leaf className="w-3.5 h-3.5 text-[#1C3F34]" />
                        Plantes emblématiques :
                      </span>
                      {terrain.keyPlants.map((plantName, pIdx) => (
                        <button
                          key={pIdx}
                          onClick={() => onNavigate('herbarium')}
                          className="px-2.5 py-1 rounded-lg bg-white border border-[#D8CBB7] hover:border-[#1C3F34] text-xs font-medium text-[#0F261E] hover:text-[#1C3F34] transition-colors cursor-pointer"
                        >
                          {plantName}
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={() => onNavigate('chat')}
                      className="text-xs font-bold text-[#1C3F34] hover:text-[#D97706] flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
                    >
                      <span>Explorer avec ALMA</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION 4 — LES TERRAINS NE FONCTIONNENT PAS SÉPARÉMENT */}
        <section className="space-y-6">
          <div className="p-8 sm:p-10 rounded-3xl bg-white border border-[#E7DFD3] shadow-sm space-y-6">
            <div className="space-y-2">
              <div className="text-[10px] font-mono text-[#D97706] uppercase tracking-widest font-bold">
                Interconnexions Vivantes
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-[#0F261E]">
                Les terrains ne fonctionnent pas séparément
              </h2>
            </div>

            <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-light">
              Les sept terrains Bloom sont intimement liés. Un rythme de sommeil irrégulier peut modifier la sensation d’énergie. Un stress durable peut affecter l’alimentation et la digestion. Une alimentation peu diversifiée peut influencer le microbiome. Une récupération insuffisante peut rendre plus difficile la mise en place de nouvelles habitudes.
            </p>

            <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-light">
              C’est pourquoi Bloom ne propose pas de penser uniquement en termes de symptômes isolés.
            </p>

            {/* Objectif pédagogique en 5 points */}
            <div className="p-6 rounded-2xl bg-[#0F261E] text-white space-y-4">
              <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-[#D97706]">
                L’objectif pédagogique Bloom
              </h3>
              <div className="grid sm:grid-cols-5 gap-3 text-center text-xs sm:text-sm font-semibold">
                <div className="p-3 rounded-xl bg-white/10 border border-white/10">1. Observer les liens.</div>
                <div className="p-3 rounded-xl bg-white/10 border border-white/10">2. Comprendre les habitudes.</div>
                <div className="p-3 rounded-xl bg-white/10 border border-white/10">3. Choisir une méthode.</div>
                <div className="p-3 rounded-xl bg-white/10 border border-white/10">4. Préparer avec discernement.</div>
                <div className="p-3 rounded-xl bg-white/10 border border-white/10">5. Demander conseil médical.</div>
              </div>
            </div>

            {/* Note transversale sur Inflammation & Sommeil */}
            <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#D8CBB7] space-y-3">
              <h4 className="text-sm font-bold text-[#1C3F34] uppercase tracking-wider flex items-center gap-2">
                <Network className="w-4 h-4 text-[#D97706]" />
                Deux thématiques transversales majeures
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Dans les grilles de santé naturelle, certaines notions comme l’inflammation et le sommeil sont souvent recherchées de manière isolée. Chez Bloom, nous les traitons comme des <strong className="text-[#0F261E]">axes transversaux</strong> qui traversent plusieurs terrains :
              </p>
              <div className="grid sm:grid-cols-2 gap-3 pt-1 text-xs text-slate-700">
                <div className="p-3 rounded-xl bg-white border border-[#E7DFD3]">
                  <strong className="text-[#b45309] block mb-1">Inflammation :</strong>
                  Transversale à la digestion, à l’immunité, au stress, à l’énergie et à l'équilibre métabolique.
                </div>
                <div className="p-3 rounded-xl bg-white border border-[#E7DFD3]">
                  <strong className="text-[#4338ca] block mb-1">Sommeil &amp; Rythmes :</strong>
                  Transversal au stress, à l'énergie, à la sérénité et aux rythmes circadiens de récupération.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5 — COMMENT UTILISER CETTE GRILLE */}
        <section className="space-y-6">
          <div className="p-8 sm:p-10 rounded-3xl bg-white border border-[#E7DFD3] shadow-sm space-y-6">
            <div className="space-y-2">
              <div className="text-[10px] font-mono text-[#D97706] uppercase tracking-widest font-bold">
                Parcours d'Apprentissage
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-[#0F261E]">
                Comment utiliser cette grille
              </h2>
              <p className="text-slate-600 text-sm sm:text-base">
                Vous pouvez utiliser les 7 Terrains Bloom pour choisir par où commencer dans l’Académie.
              </p>
            </div>

            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E7DFD3] flex items-center justify-between gap-4">
                <p className="text-xs sm:text-sm text-slate-700">
                  Vous voulez comprendre les plantes et l’alimentation ?
                </p>
                <button
                  onClick={() => scrollToTerrain('digestion_microbiome')}
                  className="px-3.5 py-1.5 rounded-lg bg-[#1C3F34] hover:bg-[#D97706] text-white text-xs font-bold transition-colors cursor-pointer shrink-0"
                >
                  Commencez par Digestion &amp; microbiome
                </button>
              </div>

              <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E7DFD3] flex items-center justify-between gap-4">
                <p className="text-xs sm:text-sm text-slate-700">
                  Vous souhaitez structurer vos repas et votre rythme quotidien ?
                </p>
                <button
                  onClick={() => scrollToTerrain('liver_metabolic_balance')}
                  className="px-3.5 py-1.5 rounded-lg bg-[#1C3F34] hover:bg-[#D97706] text-white text-xs font-bold transition-colors cursor-pointer shrink-0"
                >
                  Explorez Foie &amp; équilibre métabolique
                </button>
              </div>

              <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E7DFD3] flex items-center justify-between gap-4">
                <p className="text-xs sm:text-sm text-slate-700">
                  Vous voulez mieux comprendre les pratiques saisonnières ?
                </p>
                <button
                  onClick={() => scrollToTerrain('immune_regulation')}
                  className="px-3.5 py-1.5 rounded-lg bg-[#1C3F34] hover:bg-[#D97706] text-white text-xs font-bold transition-colors cursor-pointer shrink-0"
                >
                  Consultez Défenses &amp; régulation immunitaire
                </button>
              </div>

              <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E7DFD3] flex items-center justify-between gap-4">
                <p className="text-xs sm:text-sm text-slate-700">
                  Vous avez besoin de retrouver de la régularité dans vos journées ?
                </p>
                <button
                  onClick={() => scrollToTerrain('stress_adaptation')}
                  className="px-3.5 py-1.5 rounded-lg bg-[#1C3F34] hover:bg-[#D97706] text-white text-xs font-bold transition-colors cursor-pointer shrink-0"
                >
                  Découvrez Stress &amp; adaptation
                </button>
              </div>

              <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E7DFD3] flex items-center justify-between gap-4">
                <p className="text-xs sm:text-sm text-slate-700">
                  Vous cherchez à mieux organiser activité, repos et préparation ?
                </p>
                <button
                  onClick={() => scrollToTerrain('energy_recovery')}
                  className="px-3.5 py-1.5 rounded-lg bg-[#1C3F34] hover:bg-[#D97706] text-white text-xs font-bold transition-colors cursor-pointer shrink-0"
                >
                  Explorez Énergie &amp; récupération
                </button>
              </div>

              <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E7DFD3] flex items-center justify-between gap-4">
                <p className="text-xs sm:text-sm text-slate-700">
                  Vous souhaitez construire des routines simples d’hydratation et de mouvement ?
                </p>
                <button
                  onClick={() => scrollToTerrain('elimination_circulation')}
                  className="px-3.5 py-1.5 rounded-lg bg-[#1C3F34] hover:bg-[#D97706] text-white text-xs font-bold transition-colors cursor-pointer shrink-0"
                >
                  Commencez par Élimination &amp; circulation
                </button>
              </div>

              <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E7DFD3] flex items-center justify-between gap-4">
                <p className="text-xs sm:text-sm text-slate-700">
                  Vous voulez créer un rituel de fin de journée ?
                </p>
                <button
                  onClick={() => scrollToTerrain('serenity_sleep_recovery')}
                  className="px-3.5 py-1.5 rounded-lg bg-[#1C3F34] hover:bg-[#D97706] text-white text-xs font-bold transition-colors cursor-pointer shrink-0"
                >
                  Consultez Sérénité, sommeil &amp; récupération nerveuse
                </button>
              </div>
            </div>

            <p className="text-xs text-slate-500 font-medium italic pt-2">
              Ce parcours n’est pas un questionnaire médical. Il sert à orienter votre apprentissage, pas à décider d’un traitement.
            </p>
          </div>
        </section>

        {/* SECTION 6 — LIMITES ET RESPONSABILITÉ */}
        <section className="space-y-4">
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E7DFD3] space-y-4 shadow-sm">
            <div className="flex items-center gap-2.5 text-[#1C3F34] font-bold text-sm sm:text-base">
              <ShieldAlert className="w-5 h-5 text-[#D97706] shrink-0" />
              <span>Limites et responsabilité déontologique</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
              Les 7 Terrains Bloom sont une grille éditoriale destinée à faciliter la compréhension des contenus de l’Académie. Ils ne remplacent pas un diagnostic médical, un bilan biologique, un suivi médical, une prescription ou une consultation avec un médecin, un pharmacien ou un professionnel de santé qualifié.
            </p>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
              Les plantes, compléments et préparations botaniques peuvent avoir des contre-indications et interagir avec des médicaments. En cas de traitement, de maladie, de grossesse, d’allaitement, d’allergie, de chirurgie programmée ou de doute, demandez toujours conseil à un professionnel de santé qualifié.
            </p>
          </div>
        </section>

        {/* SECTION 7 — POURSUIVRE DANS L'ACADÉMIE */}
        <section className="space-y-6 pt-4">
          <div className="space-y-2 border-b border-[#D8CBB7]/40 pb-4">
            <div className="text-[10px] font-mono text-[#D97706] uppercase tracking-widest font-bold">
              Modules Recommandés
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0F261E]">
              Poursuivre dans l’Académie
            </h2>
            <p className="text-slate-600 text-sm">
              Découvrez les modules complémentaires de compréhension biologique et d'extraction de précision.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* 1. Les 4 Architectures */}
            <div
              onClick={() => onNavigate('4-architectures')}
              className="p-5 rounded-2xl bg-white border border-[#E7DFD3] hover:border-[#1C3F34] hover:shadow-md transition-all cursor-pointer space-y-2 group"
            >
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#D97706] bg-amber-50 px-2 py-0.5 rounded">
                Fondement
              </span>
              <h4 className="font-bold text-sm text-[#0F261E] group-hover:text-[#1C3F34] transition-colors">
                Les 4 Architectures
              </h4>
              <p className="text-xs text-slate-500 line-clamp-2">
                SRA, Axe HPA, Fascia et SEC : les 4 réseaux qui régulent votre biologie.
              </p>
              <span className="text-xs font-bold text-[#1C3F34] flex items-center gap-1 pt-1">
                Découvrir &rarr;
              </span>
            </div>

            {/* 2. Le Reset Homéostasique */}
            <div
              onClick={() => onNavigate('phytotherapie-reset')}
              className="p-5 rounded-2xl bg-white border border-[#E7DFD3] hover:border-[#1C3F34] hover:shadow-md transition-all cursor-pointer space-y-2 group"
            >
              <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                Méthode
              </span>
              <h4 className="font-bold text-sm text-[#0F261E] group-hover:text-[#1C3F34] transition-colors">
                Le Reset Homéostasique
              </h4>
              <p className="text-xs text-slate-500 line-clamp-2">
                Le protocole pas à pas pour soulager la charge allostatique du corps.
              </p>
              <span className="text-xs font-bold text-[#1C3F34] flex items-center gap-1 pt-1">
                Consulter &rarr;
              </span>
            </div>

            {/* 3. L'Infusion de Précision */}
            <div
              onClick={() => onNavigate('infusion-precision')}
              className="p-5 rounded-2xl bg-white border border-[#E7DFD3] hover:border-[#1C3F34] hover:shadow-md transition-all cursor-pointer space-y-2 group"
            >
              <span className="text-[10px] uppercase font-bold tracking-widest text-blue-800 bg-blue-50 px-2 py-0.5 rounded">
                Extraction
              </span>
              <h4 className="font-bold text-sm text-[#0F261E] group-hover:text-[#1C3F34] transition-colors">
                L’Infusion de Précision
              </h4>
              <p className="text-xs text-slate-500 line-clamp-2">
                Température, temps et agitation pour préserver le Totum végétal intact.
              </p>
              <span className="text-xs font-bold text-[#1C3F34] flex items-center gap-1 pt-1">
                Explorer &rarr;
              </span>
            </div>

            {/* 4. L'Herbier Botanique */}
            <div
              onClick={() => onNavigate('herbarium')}
              className="p-5 rounded-2xl bg-white border border-[#E7DFD3] hover:border-[#1C3F34] hover:shadow-md transition-all cursor-pointer space-y-2 group"
            >
              <span className="text-[10px] uppercase font-bold tracking-widest text-teal-800 bg-teal-50 px-2 py-0.5 rounded">
                Matière
              </span>
              <h4 className="font-bold text-sm text-[#0F261E] group-hover:text-[#1C3F34] transition-colors">
                L’Herbier de Précision
              </h4>
              <p className="text-xs text-slate-500 line-clamp-2">
                Fiches détaillées des plantes médicinales et preuves pharmacologiques.
              </p>
              <span className="text-xs font-bold text-[#1C3F34] flex items-center gap-1 pt-1">
                Consulter &rarr;
              </span>
            </div>
          </div>

          {/* Modules futurs signalés */}
          <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#D8CBB7]/50 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
            <span className="font-semibold text-[#1C3F34]">Modules d'approfondissement en préparation :</span>
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-1 rounded-md bg-white border border-[#D8CBB7] text-slate-500">Les 9 Axes (Bientôt)</span>
              <span className="px-2.5 py-1 rounded-md bg-white border border-[#D8CBB7] text-slate-500">La Charge Allostatique (Bientôt)</span>
              <span className="px-2.5 py-1 rounded-md bg-white border border-[#D8CBB7] text-slate-500">La Chronobiologie (Bientôt)</span>
            </div>
          </div>
        </section>
        </FreemiumPaywallGate>

      </main>

    </article>
  );
}
