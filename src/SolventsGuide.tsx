import React, { useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock,
  Droplets,
  Flame,
  FlaskConical,
  Leaf,
  Microscope,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Thermometer
} from 'lucide-react';
import { Language } from './translations';
import { View } from './types';
import { FreemiumPaywallGate } from './components/FreemiumPaywallGate';
import { TooltipLexique } from './components/TooltipLexique';
import { GlossaryProvider } from './context/GlossaryContext';

interface SolventsGuideProps {
  lang?: Language;
  onNavigate: (view: View, param?: string) => void;
}

interface SolventComparisonRow {
  name: string;
  polarity: string;
  affinity: string;
  targets: string;
  temperature: string;
  conservation: string;
  limit: string;
}

interface SolventPracticalSheet {
  id: string;
  name: string;
  polarityTag: string;
  tempRange: string;
  ratio: string;
  duration: string;
  agitation: string;
  shelfLife: string;
  idealFor: string;
  notes: string;
}

interface SignatureRecipe {
  id: string;
  name: string;
  objective: string;
  description: string;
  phaseLabel: string;
  composition: string;
  solvent: string;
  temperature: string;
  duration: string;
  administration: string;
  dosage: string;
  precautions: string;
  contraindications: string;
}

interface PlantSolventMapping {
  plantCategory: string;
  examples: string;
  dominantPolarity: string;
  recommendedSolvent: string;
  sequenceTip: string;
}

interface CarrierOilGuide {
  name: string;
  profile: string;
  temp: string;
  usage: string;
}

interface OrganSolventRow {
  organ: string;
  polarity: string;
  idealSolvent: string;
  plants: string;
}

export default function SolventsGuide({ lang = 'fr', onNavigate }: SolventsGuideProps) {
  const isDE = lang === 'de';
  const isEN = lang === 'en';
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const solventFaqs = [
    {
      q: "Quel solvant choisir entre l'eau, l'huile végétale et l'alcool ?",
      a: "L'eau extrait les composés hydrosolubles (mucilages, tanins, flavonoïdes polaires). L'huile végétale capte les actifs liposolubles (caroténoïdes, phytostérols, huiles essentielles). L'alcool ou la glycérine permettent des extractions mixtes et une conservation longue durée."
    },
    {
      q: "À quelle température préparer un macérat huileux avec BloomLab® ?",
      a: "La plage optimale se situe autour de 45°C pendant 90 à 180 minutes en cuve close inox 304 : suffisamment tiède pour fluidifier l'huile et accélérer la diffusion, tout en protégeant les acides gras polyinsaturés de l'oxydation."
    },
    {
      q: "Pourquoi associer plusieurs solvants dans la méthode Bloom by BotaniK ?",
      a: "Le séquençage A/B permet de recueillir d'abord les fractions hydrosolubles, puis les fractions liposolubles d'une même plante ou synergie afin de se rapprocher au plus près du Totum végétal."
    },
    {
      q: "Comment conserver ses extraits aqueux, huileux ou hydroalcooliques ?",
      a: "Les infusions aqueuses se consomment fraîches sous 24 à 48 h au réfrigérateur. Les huiles infusées filtrées et flacons hydroalcooliques se conservent à l'abri de la lumière dans un flacon ambré hermétique."
    }
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLElement>, view: View, param?: string) => {
    e.preventDefault();
    onNavigate(view, param);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const comparisonRows: SolventComparisonRow[] = [
    {
      name: 'Eau purifiée (H₂O)',
      polarity: 'Très polaire',
      affinity: 'Hydrosoluble',
      targets: 'Mucilages, minéraux, tanins doux, flavonoïdes solubles, polysaccharides',
      temperature: '55 – 80 °C (jamais bouillante)',
      conservation: '24 à 72 h au réfrigérateur',
      limit: 'N’extrait ni les résines ni les terpènes lipophiles ; oxydation rapide'
    },
    {
      name: 'Huile végétale vierge',
      polarity: 'Apolaire (Lipophile)',
      affinity: 'Liposoluble',
      targets: 'Terpènes, caroténoïdes, vitamines liposolubles (A, D, E, K), phytostérols',
      temperature: '40 – 52 °C en milieu clos',
      conservation: '6 à 12 mois en flacon ambré',
      limit: 'Laisse de côté les polysaccharides et minéraux hydrosolubles'
    },
    {
      name: 'Alcool alimentaire titré',
      polarity: 'Amphiphile (Bipolaire)',
      affinity: 'Hydro-alcoolique (Mixte)',
      targets: 'Alcaloïdes, résines denses, lactones sesquiterpéniques, polyphénols',
      temperature: '38 – 48 °C en chambre étanche',
      conservation: '24 à 36 mois à l’abri de la lumière',
      limit: 'Nécessite une filtration fine et une vigilance selon le terrain individuel'
    },
    {
      name: 'Glycérine végétale bio',
      polarity: 'Polaire douce (Triol)',
      affinity: 'Hydro-polaire sans éthanol',
      targets: 'Polyphénols, anthocyanes, composés aromatiques doux, flavonoïdes',
      temperature: '45 – 60 °C sous agitation continue',
      conservation: '12 à 18 mois (ratio glycérine ≥ 65 %)',
      limit: 'Viscosité élevée demandant un brassage vortex continu pour vaincre la couche limite'
    }
  ];

  const practicalSheets: SolventPracticalSheet[] = [
    {
      id: 'eau',
      name: "L'Eau (Le Solvant de la Vie)",
      polarityTag: 'Affinité Hydrosoluble (Polaire)',
      tempRange: '55°C à 80°C',
      ratio: '1:15 à 1:20 (eau faiblement minéralisée)',
      duration: '20 à 45 min en chambre close',
      agitation: 'Cyclique douce (jamais d’ébullition)',
      shelfLife: '24 à 72h au réfrigérateur',
      idealFor: 'Mucilages, minéraux, tanins doux, flavonoïdes, polysaccharides.',
      notes: 'Ne jamais faire bouillir, car l’ébullition détruit les flavonoïdes et rend l’infusion amère. Prolifération bactérienne rapide au-delà de 72h ; n’extrait ni les résines ni les huiles essentielles.'
    },
    {
      id: 'alcool',
      name: "L'Alcool (Le Solvant de Précision)",
      polarityTag: 'Affinité Hydro-alcoolique (Mixte)',
      tempRange: '38°C à 48°C',
      ratio: '1:5 (teinture classique) à 1:3 (résines)',
      duration: '120 à 180 min en chambre étanche',
      agitation: 'Vortex régulier évitant l’évaporation',
      shelfLife: '24 à 36 mois à l’abri de la lumière',
      idealFor: 'Alcaloïdes, résines denses, lactones, polyphénols.',
      notes: 'Nécessite une filtration fine et une vigilance selon le terrain (contre-indiqué pour les femmes enceintes ou les enfants).'
    },
    {
      id: 'glycerine',
      name: 'La Glycérine (Le Solvant Doux)',
      polarityTag: 'Affinité Hydro-polaire sans éthanol',
      tempRange: '45°C à 60°C',
      ratio: 'Ratio glycérine ≥ 65 % (ex. 60-70 % / 30-40 % eau)',
      duration: '90 à 150 min sous agitation continue',
      agitation: 'Brassage vortex continu (viscosité élevée)',
      shelfLife: '12 à 18 mois à l’abri des UV',
      idealFor: 'Polyphénols, anthocyanes, composés aromatiques doux, flavonoïdes.',
      notes: 'Sa viscosité élevée demande un brassage vortex continu afin d’optimiser l’extraction sans recourir à l’éthanol.'
    },
    {
      id: 'huile',
      name: 'Les Huiles Végétales (Les Solvants Lipophiles)',
      polarityTag: 'Affinité Liposoluble (Apolaire)',
      tempRange: '40°C à 50°C max',
      ratio: '1:5 à 1:8 (plantes sèches < 8 % d’humidité)',
      duration: '90 à 180 min',
      agitation: 'Vortex doux en milieu clos',
      shelfLife: '6 à 12 mois en flacon ambré',
      idealFor: 'Terpènes, vitamines liposolubles (A, D, E, K), caroténoïdes, phytostérols.',
      notes: 'Température maximale : 40-50°C — ne jamais dépasser pour éviter l’oxydation et préserver les acides gras essentiels (Oméga 3, 6, 9) de l’huile de support.'
    }
  ];

  const carrierOils: CarrierOilGuide[] = [
    {
      name: "Huile d'Olive",
      profile: 'Très stable, riche en polyphénols',
      temp: '40°C - 45°C',
      usage: 'Idéale pour les macérats de romarin ou de calendula.'
    },
    {
      name: 'Huile de Nigelle',
      profile: 'Très sensible, riche en thymoquinone',
      temp: '40°C max',
      usage: 'Préserve la thymoquinone, son actif majeur, qu’une chaleur trop élevée détruit.'
    },
    {
      name: "Huile d'Avocat",
      profile: 'Riche en insaponifiables et vitamines',
      temp: '45°C',
      usage: 'Très pénétrante, parfaite pour les soins articulaires.'
    },
    {
      name: 'Huile de Macadamia',
      profile: 'Riche en acide palmitoléique',
      temp: '45°C',
      usage: 'Très fluide, idéale pour les soins du visage.'
    },
    {
      name: 'Huile de Jojoba',
      profile: 'Cire liquide, très stable',
      temp: '45°C - 50°C',
      usage: 'Ne rancit pas, idéale pour le cuir chevelu.'
    },
    {
      name: 'Huile de Coco',
      profile: 'Solide en dessous de 24°C',
      temp: '40°C - 45°C',
      usage: 'Idéale pour la peau, mais peut boucher les pores si elle est trop concentrée.'
    },
    {
      name: 'Huile de Sésame',
      profile: 'Très stable, antioxydante',
      temp: '45°C',
      usage: 'Parfaite pour les massages et les articulations.'
    },
    {
      name: 'Huile de Moutarde',
      profile: 'Très piquante, riche en soufre',
      temp: '40°C max',
      usage: 'Utilisée traditionnellement pour stimuler la circulation locale (usage externe avec précaution).'
    }
  ];

  const signatureRecipes: SignatureRecipe[] = [
    {
      id: 'serum-polyphenols',
      name: 'Sérum Polyphénols à la Glycérine (Sans Alcool)',
      objective: "Extraire un maximum d'antioxydants pour un soin cutané anti-âge.",
      description: 'Une macération glycéro-hydrolatée douce sans éthanol, conçue pour capter les polyphénols et acides phénoliques du romarin sans dénaturation thermique.',
      phaseLabel: 'Sachet A · Polarité Douce Sans Alcool',
      composition: '20 g de romarin séché',
      solvent: "60 % Glycérine végétale + 40 % Eau florale de rose",
      temperature: '45°C',
      duration: '2h, mode agitation continu',
      administration: 'Usage externe cutané : appliquer quelques gouttes sur peau propre ou incorporer dans une crème neutre après filtration sur filtre à mailles très fines.',
      dosage: 'Usage général externe : 2 à 4 gouttes matin et soir sur le visage et le cou ; maximum 8 gouttes/jour.',
      precautions: 'Filtrer impérativement sur un filtre à mailles très fines pour retirer toute microparticule végétale. Conserver en flacon ambré à l’abri de la lumière.',
      contraindications: 'Réaliser un test cutané préalable au pli du coude 24h avant application. Éviter le contact direct avec les yeux ; demander un avis professionnel en cas de peau réactive.'
    },
    {
      id: 'teinture-propolis',
      name: 'Teinture Mère de Propolis',
      objective: 'Extraire les flavonoïdes et les résines de la propolis pour soutenir le terrain immunitaire.',
      description: 'Les résines cireuses de la propolis exigent un solvant hydro-alcoolique concentré. La chambre étanche BloomLab® maintient 45°C sans évaporation d’éthanol.',
      phaseLabel: 'Sachet B · Extraction Résineuse Amphiphile',
      composition: '30 g de propolis brute finement fragmentée',
      solvent: '200 ml d’alcool à 70°',
      temperature: '45°C',
      duration: '3h en chambre close',
      administration: 'Usage oral dilué dans une cuillère de miel ou un verre d’eau tiède après décantation et filtration soigneuse. Conservation : flacon ambré, 3 ans.',
      dosage: 'Usage général adulte : 10 à 15 gouttes diluées, 1 à 2 fois par jour ; dose maximale indicative : 30 gouttes/jour.',
      precautions: 'Ne jamais consommer pur ni approcher d’une source de flamme lors de la préparation. Filtrer après refroidissement complet.',
      contraindications: 'Contre-indiqué chez les femmes enceintes ou allaitantes, chez les enfants, en cas d’allergie aux produits de la ruche, d’asthme allergique ou de contre-indication à l’alcool.'
    },
    {
      id: 'macerat-calendula',
      name: 'Macérat Huileux Intégral de Calendula',
      objective: 'Préserver les caroténoïdes et triterpènes apaisants des capitules entiers sans altération lipidique.',
      description: 'À 45°C en milieu clos, l’huile d’olive ou de jojoba capture les composés liposolubles du calendula en 2h tout en protégeant les acides gras de l’oxydation.',
      phaseLabel: 'Sachet B · Fraction Liposoluble',
      composition: '25 g de capitules entiers de Calendula officinalis séchés (< 8 % humidité)',
      solvent: "200 ml d'huile végétale vierge d'Olive ou de Jojoba (ratio 1:8)",
      temperature: '45°C',
      duration: '2h sous agitation douce continue',
      administration: 'Application cutanée pure ou en base de baume sur les zones sèches.',
      dosage: 'Usage strictement externe : quelques gouttes en massage doux 1 à 2 fois par jour.',
      precautions: 'Vérifier que les fleurs sont parfaitement sèches avant extraction pour éviter toute eau résiduelle.',
      contraindications: 'Allergie connue aux plantes de la famille des Astéracées. Réaliser un test cutané au pli du coude 24h avant usage.'
    }
  ];

  const organSolventMatrix: OrganSolventRow[] = [
    {
      organ: 'Foie',
      polarity: 'Amphiphile',
      idealSolvent: 'Alcool + Glycérine',
      plants: 'Chardon-Marie, Pissenlit'
    },
    {
      organ: 'Reins',
      polarity: 'Polaire',
      idealSolvent: 'Eau',
      plants: 'Prêle, Orthosiphon'
    },
    {
      organ: 'Cuir Chevelu',
      polarity: 'Apolaire',
      idealSolvent: 'Huile (Jojoba, Nigelle)',
      plants: 'Romarin, Gingembre'
    },
    {
      organ: 'Système Nerveux',
      polarity: 'Mixte',
      idealSolvent: 'Alcool (Teinture)',
      plants: 'Passiflore, Valériane'
    }
  ];

  const plantMappings: PlantSolventMapping[] = [
    {
      plantCategory: 'Fleurs aromatiques & Sommités tendres',
      examples: 'Camomille matricaire, Lavande, Mélisse, Tilleul',
      dominantPolarity: 'Mixte (Terpènes volatils + Flavonoïdes polaires)',
      recommendedSolvent: 'Eau à 60 °C (Phase A) ou Huile à 42 °C (Phase B)',
      sequenceTip: 'Éviter l’ébullition pour sauvegarder les huiles essentielles thermolabiles.'
    },
    {
      plantCategory: 'Résines, Écorces & Bourgeons cireux',
      examples: 'Propolis, Encens (Boswellia), Cannelle, Bourgeon de Peuplier',
      dominantPolarity: 'Lipophile / Amphiphile dense',
      recommendedSolvent: 'Alcool titré 60–70° ou Huile chaude 48 °C',
      sequenceTip: 'L’eau seule est inefficace : seule la phase B libère les acides résiniques.'
    },
    {
      plantCategory: 'Racines fibreuses & Champignons adaptogènes',
      examples: 'Reishi, Astragale, Ashwagandha, Curcuma',
      dominantPolarity: 'Double polarité (Bêta-glucanes polaires + Triterpènes lipophiles)',
      recommendedSolvent: 'Séquençage A/B complet (Eau 75 °C puis Alcool/Huile 45 °C)',
      sequenceTip: 'Associer les deux phases restitue le Totum complet de la matrice ligneuse.'
    },
    {
      plantCategory: 'Baies & Feuilles riches en polyphénols',
      examples: 'Myrtille, Hibiscus, Vigne rouge, Romarin',
      dominantPolarity: 'Polaire à modérément polaire',
      recommendedSolvent: 'Glycérine végétale (70/30) ou Eau tempérée 65 °C',
      sequenceTip: 'La glycérine stabilise durablement les anthocyanes fragiles sans éthanol.'
    }
  ];

  return (
    <GlossaryProvider pageKey="guide-solvants">
      <div className="flex-1 bg-[#FAF7F2] text-[#3E4A3D] min-h-screen w-full">
        {/* SECTION 0 — HERO SECTION VERT FORÊT AVEC FIL D'ARIANE */}
        <header className="w-full bg-[#1E2E25] text-white border-b border-white/10 relative overflow-hidden">
          <div className="w-full bg-[#0F261E] border-b border-white/10 px-4 md:px-8 py-3.5 relative z-20">
            <nav aria-label="Fil d'Ariane" className="max-w-7xl mx-auto">
              <ol className="flex flex-wrap items-center space-x-2 text-sm text-white">
                <li>
                  <a
                    href="/"
                    onClick={(e) => handleNavClick(e, 'indexbis')}
                    className="text-white/80 hover:text-[#F5F0E6] transition-colors"
                  >
                    {isDE ? 'Startseite' : isEN ? 'Home' : 'Accueil'}
                  </a>
                </li>
                <li><span className="text-white/40">/</span></li>
                <li>
                  <a
                    href="/extraction-botanique/"
                    onClick={(e) => handleNavClick(e, 'guide-complet')}
                    className="text-white/80 hover:text-[#F5F0E6] transition-colors"
                  >
                    {isDE ? 'Die A/B Methode' : isEN ? 'The A/B Method' : 'La Méthode A/B'}
                  </a>
                </li>
                <li><span className="text-white/40">/</span></li>
                <li className="text-white font-bold" aria-current="page">
                  Guide des Solvants
                </li>
              </ol>
            </nav>
          </div>

          <div className="max-w-7xl mx-auto px-4 md:px-8 py-14 md:py-20 relative z-10">
            <div className="max-w-4xl space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-white text-xs font-bold tracking-wider uppercase border border-white/20">
                <FlaskConical className="w-3.5 h-3.5 text-[#E8772E]" />
                <span>Polarité &amp; Ingénierie d&apos;Extraction</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white !text-white leading-tight font-sans">
                Le Guide des Solvants : La Clé de l&apos;Extraction
              </h1>

              <p className="text-lg sm:text-xl text-white/90 !text-white leading-relaxed font-normal max-w-3xl">
                Eau, Huile, Alcool, Glycérine : apprenez à choisir le bon solvant avec la méthode{' '}
                <strong className="text-white">Bloom by BotaniK</strong> et l&apos;extracteur{' '}
                <strong className="text-white">BloomLab®</strong> pour libérer le{' '}
                <TooltipLexique terme="totum" force={true}>
                  <span className="text-white underline decoration-[#E8772E] decoration-dotted underline-offset-4">
                    Totum Végétal
                  </span>
                </TooltipLexique>
              </p>

              <p className="text-xs sm:text-sm text-white/85 !text-white bg-white/10 p-3.5 rounded-xl border border-white/15 max-w-2xl leading-relaxed">
                Ressource éducative dédiée à la chimie douce de l&apos;extraction botanique. Ces informations générales accompagnent la compréhension du végétal et ne remplacent jamais un avis médical ni un traitement prescrit.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => scrollToSection('comparatif-solvants')}
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#E8772E] hover:bg-[#D4651F] text-white font-bold text-sm shadow-md transition-all cursor-pointer"
                >
                  <span>Comparer les 4 solvants</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('machine')}
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-white hover:bg-[#FAF7F2] text-[#1E2E25] font-bold text-sm border border-white/20 transition-all shadow-xs cursor-pointer"
                >
                  <span>Découvrir la BloomLab®</span>
                  <Sparkles className="w-4 h-4 text-[#E8772E]" />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* CONTENU PRINCIPAL */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12 md:py-16 space-y-16">
          {/* ================================================================= */}
          {/* PARTIE GRATUITE (ÉDUCATION) : TABLEAU COMPARATIF DES 4 SOLVANTS   */}
          {/* ================================================================= */}
          <section id="comparatif-solvants" className="space-y-8">
            <div className="max-w-3xl space-y-3">
              <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#C8AB8A]">
                <Droplets className="w-4 h-4 text-[#E8772E]" />
                <span>Accès Libre · Fondamentaux de Polarité</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-[#1E2E25] tracking-tight">
                Pourquoi un seul solvant ne capture jamais toute la plante
              </h2>
              <p className="text-sm sm:text-base text-[#3E4A3D]/85 leading-relaxed">
                En phytochimie, « qui se ressemble s&apos;assemble » : les molécules polaires migrent vers les solvants polaires, tandis que les composés lipophiles exigent des corps gras ou amphiphiles. Comprendre cette affinité évite de gaspiller jusqu&apos;à la moitié des principes actifs d&apos;une plante dans votre tasse.
              </p>
            </div>

            <div className="bg-white rounded-3xl border border-[#E7DFD3] shadow-sm overflow-hidden">
              <div className="w-full overflow-x-auto pb-4">
                <table className="w-full min-w-[900px] table-auto text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-[#1E2E25] text-white uppercase tracking-wider text-[11px]">
                      <th className="p-4 font-bold whitespace-nowrap break-normal w-[15%] min-w-[130px]">Solvant</th>
                      <th className="p-4 font-bold whitespace-nowrap break-normal w-[15%] min-w-[120px]">Affinité</th>
                      <th className="p-4 font-bold whitespace-nowrap break-normal w-[25%] min-w-[200px]">Molécules Extraites</th>
                      <th className="p-4 font-bold whitespace-nowrap break-normal w-[15%] min-w-[150px]">Plage Thermique</th>
                      <th className="p-4 font-bold whitespace-nowrap break-normal w-[15%] min-w-[120px]">Conservation</th>
                      <th className="p-4 font-bold whitespace-nowrap break-normal w-[15%] min-w-[150px]">Limite Principale</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E7DFD3]">
                    {comparisonRows.map((row) => (
                      <tr key={row.name} className="hover:bg-[#FAF7F2]/70 transition-colors">
                        <td className="p-4 align-top break-normal font-black text-[#1E2E25]">
                          <div>{row.name}</div>
                          <div className="text-[11px] font-medium text-[#C8AB8A] mt-0.5">{row.polarity}</div>
                        </td>
                        <td className="p-4 align-top break-normal font-bold text-[#E8772E] whitespace-nowrap">{row.affinity}</td>
                        <td className="p-4 align-top break-normal text-[#3E4A3D]/85 leading-relaxed">{row.targets}</td>
                        <td className="p-4 align-top break-normal font-mono tabular-nums text-[#1E2E25] whitespace-nowrap">{row.temperature}</td>
                        <td className="p-4 align-top break-normal text-[#3E4A3D]/85">{row.conservation}</td>
                        <td className="p-4 align-top break-normal text-[#3E4A3D]/75 leading-relaxed">{row.limit}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* ================================================================= */}
          {/* PARTIE GRATUITE (ÉDUCATION) : CAS TU YOUYOU & L'ARTÉMISININE      */}
          {/* ================================================================= */}
          <section id="tu-youyou-artemisinine" className="bg-white rounded-3xl border border-[#E7DFD3] shadow-sm p-6 sm:p-10 md:p-12 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E7DFD3] pb-5">
              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#E8772E]">
                  <Microscope className="w-4 h-4" />
                  <span>Histoire Scientifique · Leçon de Polarité</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-[#1E2E25] tracking-tight">
                  Le cas Tu Youyou : comment le choix du solvant à 60 °C a préservé l&apos;artémisinine
                </h2>
              </div>
              <span className="text-xs font-mono uppercase tracking-wider px-3 py-1 rounded-lg bg-[#FAF7F2] border border-[#E7DFD3] text-[#1E2E25] font-bold">
                Prix Nobel 2015
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-8 space-y-4 text-sm sm:text-base text-[#3E4A3D]/90 leading-relaxed">
                <p>
                  À la fin des années 1960, la chercheuse Tu Youyou et son équipe testent plus de 2 000 préparations issues de la pharmacopée traditionnelle chinoise. L&apos;armoise annuelle (<em>Artemisia annua</em>) montre d&apos;abord des résultats prometteurs, puis déçoit : les extraits obtenus par décoction classique dans l&apos;eau bouillante s&apos;avèrent irréguliers et presque inactifs.
                </p>
                <p>
                  En relisant attentivement le traité du IV<sup>e</sup> siècle de Ge Hong (<em>Zhouhou Beiji Fang</em>), Tu Youyou relève un détail décisif : l&apos;auteur recommande de presser le suc frais à froid plutôt que de faire bouillir la plante. Elle comprend immédiatement que la chaleur excessive détruit la molécule fragile, tandis que l&apos;eau seule ne l&apos;entraîne qu&apos;imparfaitement.
                </p>
                <p>
                  En remplaçant l&apos;ébullition aqueuse par une <strong>extraction à l&apos;éther diéthylique à basse température (autour de 60 °C maximum selon les cycles de séparation)</strong>, la structure moléculaire sensible de l&apos;artémisinine — notamment son pont endoperoxyde — reste intacte. Le rendement bondit et révèle toute la puissance de la plante.
                </p>
              </div>

              <div className="lg:col-span-4 bg-[#1E2E25] text-white rounded-2xl p-6 space-y-4">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#E8772E]">
                  <Thermometer className="w-4 h-4" />
                  <span className="text-[#E8772E]">Ce que cela enseigne</span>
                </div>
                <p className="text-sm text-white/90 !text-white leading-relaxed">
                  Une plante « inefficace » en tisane bouillante n&apos;est souvent qu&apos;une plante extraite avec le mauvais solvant ou à une température trop élevée.
                </p>
                <div className="pt-3 border-t border-white/15 space-y-2 text-xs text-white/85">
                  <div className="flex items-center gap-2">
                    <Flame className="w-4 h-4 text-[#E8772E] shrink-0" />
                    <span>100 °C eau = rupture des ponts fragiles</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FlaskConical className="w-4 h-4 text-[#C8AB8A] shrink-0" />
                    <span>Solvant adapté + 40–60 °C = intégrité du Totum</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ================================================================= */}
          {/* PARTIE PAYANTE (FREEMIUM PAYWALL GATE)                            */}
          {/* ================================================================= */}
          <section id="protocoles-solvants" className="space-y-6">
            <div className="max-w-3xl space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#E8772E]">
                <BookOpen className="w-4 h-4" />
                <span>Laboratoire Pratique · Protocoles &amp; Formulations</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-[#1E2E25] tracking-tight">
                Fiches Paramètres, Recettes Signatures &amp; Matrice Plantes/Solvants
              </h2>
            </div>

            <FreemiumPaywallGate
              onNavigate={onNavigate}
              lang={lang}
              title="Débloquez les Protocoles & Formulations Solvants"
              subtitle="Accédez aux paramètres exacts (températures au demi-degré, ratios, durées), aux recettes signatures commentées et au guide complet des associations plantes/solvants pour votre BloomLab®."
              bulletPoints={[
                'Fiches techniques des 4 solvants (Températures, Ratios, Durées, Conservation)',
                'Recette Signature : Sérum Polyphénols à la Glycérine (sans alcool)',
                'Recette Signature : Teinture Mère de Propolis en milieu clos',
                'Matrice complète des associations organes végétaux / polarité / solvants'
              ]}
              teaserContent={
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 opacity-90">
                  <div className="bg-white p-5 rounded-2xl border border-[#E7DFD3] space-y-2">
                    <div className="text-xs font-black uppercase tracking-wider text-[#E8772E]">Aperçu Fiches</div>
                    <div className="font-bold text-[#1E2E25]">Paramètres Calibrés ±0,5 °C</div>
                    <p className="text-xs text-[#3E4A3D]/75 leading-relaxed">
                      Ratios exacts plante sèche / solvant et paliers thermiques pour éviter la dénaturation.
                    </p>
                  </div>
                  <div className="bg-white p-5 rounded-2xl border border-[#E7DFD3] space-y-2">
                    <div className="text-xs font-black uppercase tracking-wider text-[#E8772E]">Aperçu Recettes</div>
                    <div className="font-bold text-[#1E2E25]">Sérum Polyphénols &amp; Propolis</div>
                    <p className="text-xs text-[#3E4A3D]/75 leading-relaxed">
                      Protocoles pas à pas avec dosages, précautions d&apos;emploi et contre-indications claires.
                    </p>
                  </div>
                  <div className="bg-white p-5 rounded-2xl border border-[#E7DFD3] space-y-2">
                    <div className="text-xs font-black uppercase tracking-wider text-[#E8772E]">Aperçu Associations</div>
                    <div className="font-bold text-[#1E2E25]">Matrice Plantes &amp; Polarités</div>
                    <p className="text-xs text-[#3E4A3D]/75 leading-relaxed">
                      Associez instantanément fleurs, racines, résines et baies au solvant optimal.
                    </p>
                  </div>
                </div>
              }
            >
              <div className="space-y-14">
                {/* 0. INTRODUCTION DU COURS : POURQUOI LE SOLVANT EST LA CLÉ DE TOUT */}
                <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E7DFD3] text-[#1E2E25] space-y-5 shadow-xs">
                  <div className="space-y-1">
                    <span className="text-xs font-black uppercase tracking-widest text-[#E8772E]">
                      Introduction du Cours · Fondamentaux BloomLab®
                    </span>
                    <h3 className="text-2xl font-black text-[#1E2E25]">
                      Pourquoi le Solvant est la Clé de Tout
                    </h3>
                  </div>
                  <p className="text-sm sm:text-base text-[#3E4A3D]/90 leading-relaxed">
                    Le solvant est le véhicule qui permet d&apos;extraire les principes actifs d&apos;une plante. Chaque solvant possède une « polarité » différente :
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-[#F9F6F0] p-4 rounded-xl border border-[#E7DFD3] space-y-1">
                      <div className="font-black text-sm text-[#1E2E25]">L&apos;eau est polaire</div>
                      <p className="text-xs sm:text-sm text-[#3E4A3D]/85 leading-relaxed">
                        Elle attire les molécules polaires (sucres, tanins, mucilages).
                      </p>
                    </div>
                    <div className="bg-[#F9F6F0] p-4 rounded-xl border border-[#E7DFD3] space-y-1">
                      <div className="font-black text-sm text-[#1E2E25]">L&apos;huile est apolaire</div>
                      <p className="text-xs sm:text-sm text-[#3E4A3D]/85 leading-relaxed">
                        Elle attire les molécules grasses (terpènes, résines, vitamines liposolubles).
                      </p>
                    </div>
                    <div className="bg-[#F9F6F0] p-4 rounded-xl border border-[#E7DFD3] space-y-1">
                      <div className="font-black text-sm text-[#1E2E25]">L&apos;alcool est amphiphile</div>
                      <p className="text-xs sm:text-sm text-[#3E4A3D]/85 leading-relaxed">
                        Il peut attirer à la fois des fractions polaires et lipophiles.
                      </p>
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-[#1E2E25] text-white text-xs sm:text-sm leading-relaxed">
                    <strong className="text-[#E8772E]">Le secret de la BloomLab® :</strong> Comprendre que forcer un solvant à extraire ce qu&apos;il ne peut pas extraire détruit la plante. Le séquençage A/B consiste à utiliser le bon solvant pour la bonne molécule.
                  </div>
                </div>

                {/* 1. FICHES TECHNIQUES PAR SOLVANT (GRILLE 4 CARTES) */}
                <div className="space-y-6">
                  <div className="space-y-1">
                    <span className="text-xs font-black uppercase tracking-widest text-[#C8AB8A]">
                      Module 1 · Fiches Techniques
                    </span>
                    <h3 className="text-2xl font-black text-[#1E2E25]">
                      Les 4 Solvants : Affinités, Molécules &amp; Plages Thermiques BloomLab®
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {practicalSheets.map((sheet) => (
                      <article
                        key={sheet.id}
                        className="bg-white p-6 rounded-2xl border border-[#E7DFD3] text-[#1E2E25] shadow-xs space-y-5"
                      >
                        <div className="flex items-start justify-between gap-3 border-b border-[#F3EEE6] pb-4">
                          <div>
                            <span className="text-[11px] font-black uppercase tracking-wider text-[#E8772E]">
                              {sheet.polarityTag}
                            </span>
                            <h4 className="text-lg sm:text-xl font-black text-[#1E2E25] mt-1">
                              {sheet.name}
                            </h4>
                          </div>
                          <FlaskConical className="w-5 h-5 text-[#C8AB8A] shrink-0 mt-1" />
                        </div>

                        <div className="grid grid-cols-3 gap-3 text-center">
                          <div className="p-3 rounded-xl bg-[#F9F6F0] border border-[#E7DFD3]">
                            <div className="flex items-center justify-center gap-1 text-[10px] font-bold uppercase text-[#3E4A3D]/70 mb-1">
                              <Thermometer className="w-3.5 h-3.5 text-[#E8772E]" />
                              <span>Température</span>
                            </div>
                            <div className="font-mono tabular-nums font-black text-xs sm:text-sm text-[#1E2E25]">
                              {sheet.tempRange}
                            </div>
                          </div>
                          <div className="p-3 rounded-xl bg-[#F9F6F0] border border-[#E7DFD3]">
                            <div className="flex items-center justify-center gap-1 text-[10px] font-bold uppercase text-[#3E4A3D]/70 mb-1">
                              <Clock className="w-3.5 h-3.5 text-[#E8772E]" />
                              <span>Durée</span>
                            </div>
                            <div className="font-mono tabular-nums font-black text-xs sm:text-sm text-[#1E2E25]">
                              {sheet.duration.split(' ')[0]} {sheet.duration.split(' ')[1]} {sheet.duration.split(' ')[2]}
                            </div>
                          </div>
                          <div className="p-3 rounded-xl bg-[#F9F6F0] border border-[#E7DFD3]">
                            <div className="flex items-center justify-center gap-1 text-[10px] font-bold uppercase text-[#3E4A3D]/70 mb-1">
                              <ShieldCheck className="w-3.5 h-3.5 text-[#E8772E]" />
                              <span>Conservation</span>
                            </div>
                            <div className="font-mono tabular-nums font-black text-xs sm:text-sm text-[#1E2E25]">
                              {sheet.shelfLife.split(' ').slice(0, 4).join(' ')}
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2 text-xs sm:text-sm text-[#3E4A3D]/90">
                          <p>
                            <strong className="text-[#1E2E25]">Molécules extraites :</strong> {sheet.idealFor}
                          </p>
                          <p>
                            <strong className="text-[#1E2E25]">Ratio &amp; Conservation :</strong> {sheet.ratio} · {sheet.shelfLife}
                          </p>
                          <p>
                            <strong className="text-[#1E2E25]">Agitation :</strong> {sheet.agitation}
                          </p>
                          <p className="text-xs text-[#3E4A3D]/80 bg-[#F9F6F0] p-3 rounded-xl border border-[#E7DFD3]">
                            <strong className="text-[#1E2E25]">Limite &amp; Précaution :</strong> {sheet.notes}
                          </p>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>

                {/* 2. SECTION DÉTAILLÉE SUR LES HUILES DE SUPPORT (LE CŒUR DU COURS) */}
                <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E7DFD3] text-[#1E2E25] space-y-6 shadow-xs">
                  <div className="space-y-2">
                    <span className="text-xs font-black uppercase tracking-widest text-[#E8772E]">
                      Module 2 · Le Rôle Crucial des Huiles Végétales
                    </span>
                    <h3 className="text-2xl font-black text-[#1E2E25]">
                      Les Huiles de Support et leurs Températures
                    </h3>
                    <p className="text-sm sm:text-base text-[#3E4A3D]/90 leading-relaxed">
                      Les huiles végétales ne sont pas seulement des « vecteurs » : ce sont des actifs à part entière. Pour extraire les principes actifs des plantes (macération huileuse) sans détruire les précieux acides gras (Oméga 3, 6, 9) de l&apos;huile de support, la température de la BloomLab® ne doit jamais dépasser <strong>45°C à 50°C</strong>. Au-delà, l&apos;huile s&apos;oxyde, rancit et perd ses propriétés.
                    </p>
                  </div>

                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {carrierOils.map((oil) => (
                      <li
                        key={oil.name}
                        className="p-4 rounded-xl bg-[#F9F6F0] border border-[#E7DFD3] flex items-start gap-3"
                      >
                        <Leaf className="w-4 h-4 text-[#E8772E] shrink-0 mt-1" />
                        <div className="space-y-1 text-xs sm:text-sm">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <strong className="text-[#1E2E25] font-black">{oil.name}</strong>
                            <span className="font-mono font-bold text-xs px-2.5 py-0.5 rounded-md bg-white border border-[#E7DFD3] text-[#E8772E]">
                              {oil.temp}
                            </span>
                          </div>
                          <div className="text-[11px] font-semibold text-[#C8AB8A] uppercase tracking-wide">
                            {oil.profile}
                          </div>
                          <p className="text-[#3E4A3D]/85 leading-relaxed">{oil.usage}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 3. RECETTES SIGNATURES (ENCADRÉS BG-[#F9F6F0] CONFORMES AGENTS.MD) */}
                <div className="space-y-6">
                  <div className="space-y-1">
                    <span className="text-xs font-black uppercase tracking-widest text-[#C8AB8A]">
                      Module 3 · Fiches Recettes
                    </span>
                    <h3 className="text-2xl font-black text-[#1E2E25]">
                      Recettes Signatures sur BloomLab®
                    </h3>
                  </div>

                  <div className="space-y-6">
                    {signatureRecipes.map((recipe) => (
                      <article
                        key={recipe.id}
                        className="bg-[#F9F6F0] rounded-2xl border border-[#E7DFD3] p-6 sm:p-8 shadow-xs space-y-5 text-[#1E2E25]"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E7DFD3] pb-4">
                          <div>
                            <span className="text-xs font-black uppercase tracking-wider text-[#E8772E]">
                              {recipe.phaseLabel}
                            </span>
                            <h4 className="text-xl font-black text-[#1E2E25] mt-0.5">{recipe.name}</h4>
                          </div>
                          <span className="text-xs font-mono font-bold px-3 py-1 rounded-lg bg-white border border-[#E7DFD3] text-[#1E2E25]">
                            {recipe.temperature} · {recipe.duration}
                          </span>
                        </div>

                        <div className="space-y-2 text-sm text-[#3E4A3D]/90">
                          <p>
                            <strong className="text-[#1E2E25]">Objectif :</strong> {recipe.objective}
                          </p>
                          <p>{recipe.description}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-4 rounded-xl border border-[#E7DFD3] text-xs sm:text-sm">
                          <div className="space-y-1.5">
                            <div>
                              <strong className="text-[#1E2E25]">Ingrédients / Plante :</strong> {recipe.composition}
                            </div>
                            <div>
                              <strong className="text-[#1E2E25]">Solvant :</strong> {recipe.solvent}
                            </div>
                          </div>
                          <div className="space-y-1.5">
                            <div>
                              <strong className="text-[#1E2E25]">Mode d&apos;administration :</strong> {recipe.administration}
                            </div>
                            <div>
                              <strong className="text-[#1E2E25]">Dosage indicatif :</strong> {recipe.dosage}
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                          <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 flex items-start gap-2.5">
                            <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                            <div>
                              <strong>Précautions &amp; Filtration :</strong> {recipe.precautions}
                            </div>
                          </div>
                          <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 flex items-start gap-2.5">
                            <ShieldCheck className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                            <div>
                              <strong>Contre-indications :</strong> {recipe.contraindications}
                            </div>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>

                {/* 4. MATRICE D'ASSOCIATION (ORGANES / POLARITÉ / SOLVANTS / PLANTES) */}
                <div className="space-y-6">
                  <div className="space-y-1">
                    <span className="text-xs font-black uppercase tracking-widest text-[#C8AB8A]">
                      Module 4 · Matrice d&apos;Association
                    </span>
                    <h3 className="text-2xl font-black text-[#1E2E25]">
                      Matrice d&apos;Association : Organes, Polarité, Solvants &amp; Plantes
                    </h3>
                  </div>

                  <div className="bg-white rounded-2xl border border-[#E7DFD3] shadow-xs overflow-hidden">
                    <div className="w-full overflow-x-auto pb-4">
                      <table className="w-full min-w-[720px] table-auto text-left border-collapse text-xs sm:text-sm">
                        <thead>
                          <tr className="bg-[#1E2E25] text-white uppercase tracking-wider text-[11px]">
                            <th className="p-4 font-bold whitespace-nowrap break-normal min-w-[150px]">Organe Cible</th>
                            <th className="p-4 font-bold whitespace-nowrap break-normal min-w-[130px]">Polarité</th>
                            <th className="p-4 font-bold whitespace-nowrap break-normal min-w-[180px]">Solvant Idéal</th>
                            <th className="p-4 font-bold whitespace-nowrap break-normal min-w-[200px]">Plantes Types</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#E7DFD3]">
                          {organSolventMatrix.map((row) => (
                            <tr key={row.organ} className="hover:bg-[#F9F6F0]/70 transition-colors">
                              <td className="p-4 align-top break-normal font-black text-[#1E2E25]">{row.organ}</td>
                              <td className="p-4 align-top break-normal font-semibold text-[#3E4A3D]">{row.polarity}</td>
                              <td className="p-4 align-top break-normal font-bold text-[#E8772E]">{row.idealSolvent}</td>
                              <td className="p-4 align-top break-normal text-[#3E4A3D]/90">{row.plants}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Complément par familles botaniques */}
                  <div className="bg-white rounded-2xl border border-[#E7DFD3] shadow-xs overflow-hidden">
                    <div className="w-full overflow-x-auto pb-4">
                      <table className="w-full min-w-[900px] table-auto text-left border-collapse text-xs sm:text-sm">
                        <thead>
                          <tr className="bg-[#F9F6F0] border-b border-[#E7DFD3] text-[#1E2E25] uppercase tracking-wider text-[11px]">
                            <th className="p-4 font-black whitespace-nowrap break-normal w-[20%] min-w-[180px]">Famille / Organe Végétal</th>
                            <th className="p-4 font-black whitespace-nowrap break-normal w-[20%] min-w-[160px]">Exemples</th>
                            <th className="p-4 font-black whitespace-nowrap break-normal w-[20%] min-w-[160px]">Polarité Dominante</th>
                            <th className="p-4 font-black whitespace-nowrap break-normal w-[20%] min-w-[180px]">Solvant Recommandé</th>
                            <th className="p-4 font-black whitespace-nowrap break-normal w-[20%] min-w-[200px]">Conseil Séquençage</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#E7DFD3]">
                          {plantMappings.map((item) => (
                            <tr key={item.plantCategory} className="hover:bg-[#FAF7F2]/60 transition-colors">
                              <td className="p-4 align-top break-normal font-bold text-[#1E2E25]">{item.plantCategory}</td>
                              <td className="p-4 align-top break-normal text-[#3E4A3D]/85">{item.examples}</td>
                              <td className="p-4 align-top break-normal text-[#3E4A3D]/85">{item.dominantPolarity}</td>
                              <td className="p-4 align-top break-normal font-semibold text-[#E8772E]">{item.recommendedSolvent}</td>
                              <td className="p-4 align-top break-normal text-[#3E4A3D]/80">{item.sequenceTip}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </FreemiumPaywallGate>
          </section>

          {/* FAQ SOLVANTS */}
          <section id="faq-solvants" className="space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-black uppercase tracking-widest text-[#C8AB8A]">
                Questions Fréquentes · Polarité &amp; Solvants
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#1E2E25] tracking-tight">
                Questions fréquentes sur les solvants d&apos;extraction
              </h2>
            </div>

            <div className="space-y-3">
              {solventFaqs.map((item, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl border border-[#E7DFD3] overflow-hidden shadow-2xs"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full flex items-center justify-between gap-4 p-5 text-left font-bold text-sm sm:text-base text-[#1E2E25] hover:text-[#E8772E] transition-colors cursor-pointer"
                      aria-expanded={isOpen}
                    >
                      <span>{item.q}</span>
                      <span className="text-xs font-mono text-[#E8772E] shrink-0">{isOpen ? '−' : '+'}</span>
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 text-xs sm:text-sm text-[#3E4A3D] leading-relaxed border-t border-[#E7DFD3]/60 pt-3">
                        {item.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* CTA DE NAVIGATION COMPLÉMENTAIRE */}
          <section className="bg-[#1E2E25] text-white rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#C8AB8A]">
                <Leaf className="w-4 h-4 text-[#E8772E]" />
                <span>Poursuivre votre pratique</span>
              </div>
              <h3 className="text-2xl font-black text-white !text-white">
                Passez de la théorie des solvants au Séquençage Actif A/B
              </h3>
              <p className="text-sm text-white/85 !text-white leading-relaxed">
                Explorez notre guide complet d&apos;extraction, découvrez l&apos;extracteur BloomLab® ou parcourez nos kits sur la Boutique Bloom by BotaniK.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <a
                href="/extraction-botanique/"
                onClick={(e) => handleNavClick(e, 'guide-complet')}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider border border-white/20 transition-all cursor-pointer"
              >
                <span>Guide de l&apos;extraction</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="/bloomlab/"
                onClick={(e) => handleNavClick(e, 'machine')}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#E8772E] hover:bg-[#D4651F] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer"
              >
                <span>Découvrir BloomLab®</span>
                <Sparkles className="w-4 h-4" />
              </a>
              <a
                href="/boutique/"
                onClick={(e) => handleNavClick(e, 'boutique')}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider border border-white/20 transition-all cursor-pointer"
              >
                <span>Boutique Plantes</span>
                <CheckCircle2 className="w-4 h-4" />
              </a>
            </div>
          </section>
        </main>
      </div>
    </GlossaryProvider>
  );
}
