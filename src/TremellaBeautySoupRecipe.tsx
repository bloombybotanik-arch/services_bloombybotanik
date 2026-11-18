import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  ChefHat,
  Clock,
  Droplets,
  Flame,
  Info,
  Leaf,
  ShieldCheck,
  Sparkles,
  Thermometer,
  Utensils,
} from 'lucide-react';
import { Language } from './translations';
import { View } from './types';
import tremellaSoupImg from './assets/images/soupe_beaute_tremella_1794992328062.jpg';

interface TremellaBeautySoupRecipeProps {
  lang?: Language;
  onNavigate: (view: View, param?: string) => void;
}

const META_DESCRIPTION =
  "Recette authentique de Soupe de Beauté MTC au Tremella adaptée à la BloomLab : hydratation profonde, éclat de la peau et vitalité.";

const RECIPE_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'Recipe',
  name: 'Soupe de Beauté au Champignon des Neiges (Tremella) à la BloomLab',
  alternateName: 'Soupe aux Perles de Pêche et Tremella MTC',
  description: META_DESCRIPTION,
  image: [
    'https://bloombybotanik.com/images/og/recette-soupe-beaute-tremella.jpg',
  ],
  author: {
    '@type': 'Organization',
    name: 'Bloom by BotaniK',
    url: 'https://bloombybotanik.com',
  },
  publisher: {
    '@type': 'Organization',
    name: 'Bloom by BotaniK',
    url: 'https://bloombybotanik.com',
  },
  datePublished: '2026-11-18',
  prepTime: 'PT4H15M',
  cookTime: 'PT1H',
  totalTime: 'PT5H15M',
  recipeYield: '800 ml (3 à 4 tasses)',
  recipeCategory: 'Atelier Culinaire · Recette MTC',
  recipeCuisine: 'Médecine Traditionnelle Chinoise',
  keywords:
    'soupe tremella beauté, recette soupe champignon blanc MTC, extraire polysaccharides tremella, tisane yin sang beauté, recette BloomLab, soupe aux perles de pêche, bienfaits goji jujube longan, collagène végétal',
  recipeIngredient: [
    '800 ml d’eau filtrée ou faiblement minéralisée',
    '10 à 12 dattes de jujube rouges (environ 30 g), dénoyautées',
    '20 g de baies de Goji bio non soufrées',
    '20 g de longan séché',
    '10 g de champignon blanc (Tremella fuciformis) séché, réhydraté',
    '10 g de perles de pêche (Peach Gum), réhydratées (facultatif)',
    '1/2 pomme (environ 80 g), coupée en dés',
    '3 à 4 tranches de gingembre frais (environ 10 g)',
  ],
  recipeInstructions: [
    {
      '@type': 'HowToStep',
      name: 'Réhydratation des matrices sèches',
      text: 'La veille ou au moins 4 heures avant, faites tremper le champignon blanc (Tremella) et les perles de pêche séparément dans deux grands bols d’eau froide.',
    },
    {
      '@type': 'HowToStep',
      name: 'Préparation des végétaux',
      text: 'Égouttez le Tremella, retirez la base jaune et dure puis déchirez-le en petits morceaux. Rincez les perles de pêche, coupez les dattes de jujube en deux, détaillez la demi-pomme en dés et taillez le gingembre en fines tranches.',
    },
    {
      '@type': 'HowToStep',
      name: 'Phase 1 — Extraction hydrosoluble principale à la BloomLab',
      text: 'Déposez le Tremella, les perles de pêche, les dattes de jujube, le longan, le gingembre et la pomme dans 800 ml d’eau filtrée. Lancez un cycle BloomLab de 45 minutes à 80°C pour gélatiniser les polysaccharides tout en respectant les gingérols.',
    },
    {
      '@type': 'HowToStep',
      name: 'Phase 2 — Finition douce aux baies de Goji',
      text: 'Ajoutez les baies de Goji en fin de cycle et prolongez l’extraction à 70°C pendant 15 minutes afin de préserver la zéaxanthine et la vitamine C thermolabiles.',
    },
  ],
};

export default function TremellaBeautySoupRecipe({
  onNavigate,
}: TremellaBeautySoupRecipeProps) {
  const [imgError, setImgError] = useState(false);

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    view: View,
    param?: string
  ) => {
    if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
      e.preventDefault();
      onNavigate(view, param);
    }
  };

  return (
    <article className="w-full min-h-screen bg-[#F9F6F0] text-[#1E2E25] pb-24 animate-in fade-in duration-700">
      {/* 9. Données Structurées Schema.org Recipe */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(RECIPE_JSON_LD) }}
      />

      {/* Top Editorial Breadcrumb Strip */}
      <div className="border-b border-[#E7DFD3] bg-[#FAF7F2]">
        <div className="max-w-5xl mx-auto px-6 md:px-10 py-4 flex flex-wrap items-center justify-between gap-4 text-xs font-semibold text-[#3E4A3D]">
          <nav aria-label="Fil d'Ariane" className="flex flex-wrap items-center gap-2">
            <a
              href="/"
              onClick={(e) => handleLinkClick(e, 'indexbis')}
              className="hover:text-[#E8772E] transition-colors"
            >
              Accueil
            </a>
            <span className="text-[#C8AB8A]">/</span>
            <a
              href="/gastronomie-botanique/"
              onClick={(e) => handleLinkClick(e, 'culinaire')}
              className="hover:text-[#E8772E] transition-colors"
            >
              Atelier Culinaire
            </a>
            <span className="text-[#C8AB8A]">/</span>
            <span className="text-[#1E2E25] font-bold">
              Soupe de Beauté au Champignon des Neiges
            </span>
          </nav>

          <button
            type="button"
            onClick={() => onNavigate('culinaire')}
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#3E4A3D] hover:text-[#E8772E] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Retour à l’Atelier Culinaire
          </button>
        </div>
      </div>

      {/* 1. HERO SECTION */}
      <header className="max-w-5xl mx-auto px-6 md:px-10 pt-10 md:pt-14 pb-10">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#3E4A3D]/80 mb-5">
          Atelier Culinaire · Recettes MTC · Extraction 80 °C &amp; 70 °C · 800 ml
        </p>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1E2E25] leading-[1.12] tracking-tight mb-6">
          L’Élixir de Beauté : La Soupe au Champignon des Neiges (Tremella) à la
          BloomLab
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-[#3E4A3D] leading-relaxed max-w-3xl mb-8">
          Nourrissez votre Yin, hydratez votre peau et soutenez votre vitalité avec
          cette recette ancestrale de la Médecine Traditionnelle Chinoise, réinventée
          par l’extraction de précision.
        </p>

        {/* Key Metrics Strip (unboxed, hairline bounded) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 border-y border-[#E7DFD3] py-4 gap-4 mb-10 text-sm">
          <div>
            <span className="block text-[11px] font-bold uppercase tracking-wider text-[#3E4A3D]/70">
              Volume obtenu
            </span>
            <span className="font-extrabold text-[#1E2E25] tabular-nums">
              800 ml (3–4 tasses)
            </span>
          </div>
          <div>
            <span className="block text-[11px] font-bold uppercase tracking-wider text-[#3E4A3D]/70">
              Réhydratation
            </span>
            <span className="font-extrabold text-[#1E2E25] tabular-nums">
              4 h minimum (ou la nuit)
            </span>
          </div>
          <div>
            <span className="block text-[11px] font-bold uppercase tracking-wider text-[#3E4A3D]/70">
              Cycle BloomLab®
            </span>
            <span className="font-extrabold text-[#1E2E25] tabular-nums">
              45 min à 80 °C + 15 min à 70 °C
            </span>
          </div>
          <div>
            <span className="block text-[11px] font-bold uppercase tracking-wider text-[#3E4A3D]/70">
              Signature MTC
            </span>
            <span className="font-extrabold text-[#1E2E25]">
              Yin · Sang · Collagène végétal
            </span>
          </div>
        </div>

        {/* Hero Visual Container */}
        <figure className="rounded-3xl overflow-hidden border border-[#E7DFD3] bg-white shadow-sm">
          <div className="relative aspect-[16/9] w-full bg-[#FAF7F2] overflow-hidden">
            {!imgError ? (
              <img
                src={tremellaSoupImg}
                alt="Soupe de Beauté MTC au Champignon des Neiges Tremella, perles de pêche, dattes de jujube, longan, baies de goji et gingembre préparée à la BloomLab"
                width={1280}
                height={720}
                loading="eager"
                referrerPolicy="no-referrer"
                onError={() => setImgError(true)}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-[#F9F6F0] to-[#E7DFD3]">
                <ChefHat className="w-12 h-12 text-[#3E4A3D] mb-3" />
                <p className="text-base font-bold text-[#1E2E25]">
                  Soupe de Beauté au Champignon des Neiges (Tremella)
                </p>
                <p className="text-xs text-[#3E4A3D] mt-1">
                  Extraction douce BloomLab® — 80 °C &amp; 70 °C
                </p>
              </div>
            )}
          </div>
          <figcaption className="px-6 py-3.5 bg-[#FAF7F2] border-t border-[#E7DFD3] flex flex-wrap items-center justify-between gap-2 text-xs text-[#3E4A3D]">
            <span>
              <strong className="text-[#1E2E25]">Atelier Culinaire Bloom :</strong>{' '}
              recette soupe champignon blanc MTC &amp; perles de pêche.
            </span>
            <span className="font-bold uppercase tracking-wider text-[#E8772E]">
              Extraction Séquencée 80 °C → 70 °C
            </span>
          </figcaption>
        </figure>
      </header>

      <main className="max-w-5xl mx-auto px-6 md:px-10 space-y-14">
        {/* 2. INTRODUCTION */}
        <section
          aria-labelledby="intro-heading"
          className="bg-white rounded-3xl border border-[#E7DFD3] p-7 sm:p-10 shadow-xs space-y-5"
        >
          <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-widest text-[#E8772E]">
            <Sparkles className="w-4 h-4" />
            <span>Origine &amp; Approche Scientifique</span>
          </div>
          <h2
            id="intro-heading"
            className="text-2xl sm:text-3xl font-extrabold text-[#1E2E25]"
          >
            La Soupe de Beauté ancestrale réinventée par l’extraction de précision
          </h2>
          <p className="text-base text-[#3E4A3D] leading-relaxed">
            En Médecine Traditionnelle Chinoise (MTC), cette préparation porte le nom
            évocateur de <strong>« Soupe de Beauté »</strong>. Au cœur de sa
            composition trône le <em>Tremella fuciformis</em>, surnommé le{' '}
            <strong>« Champignon des Neiges »</strong> en raison de ses pétales
            translucides et nacrés. Utilisée depuis des siècles pour{' '}
            <strong>Nourrir le Yin</strong> et <strong>Nourrir le Sang</strong>, cette
            recette associe la richesse hydratante des polysaccharides végétaux à la
            douceur réconfortante des dattes de jujube, du longan et des baies de Goji.
          </p>
          <p className="text-base text-[#3E4A3D] leading-relaxed">
            Là où la casserole traditionnelle expose les ingrédients à une ébullition
            brutale à 100 °C — dégradant les antioxydants fragiles avant même que les
            fibres denses n’aient livré leurs actifs — la <strong>BloomLab®</strong>{' '}
            orchestre une cinétique thermique séquencée. En combinant deux paliers de
            température maîtrisés, elle permet d’<strong>extraire le Totum</strong>{' '}
            hydrosoluble de chaque matrice végétale : les macromolécules soyeuses du
            Tremella s’épanouissent pleinement, tandis que les composés thermolabiles
            du gingembre et des baies de Goji restent préservés.
          </p>
        </section>

        {/* 3. INGRÉDIENTS & 4. PRÉPARATION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Ingrédients */}
          <section
            aria-labelledby="ingredients-heading"
            className="lg:col-span-5 bg-white rounded-3xl border border-[#E7DFD3] p-7 sm:p-8 shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#3E4A3D]/80 mb-2">
                <Utensils className="w-4 h-4 text-[#C8AB8A]" />
                <span>Pour 800 ml d’eau filtrée</span>
              </div>
              <h2
                id="ingredients-heading"
                className="text-2xl font-extrabold text-[#1E2E25] mb-6"
              >
                Ingrédients de la recette
              </h2>

              <ul className="divide-y divide-[#E7DFD3] text-sm sm:text-base">
                <li className="py-3 flex justify-between gap-4">
                  <span className="font-semibold text-[#1E2E25]">
                    Champignon blanc (Tremella) séché
                  </span>
                  <span className="text-[#3E4A3D] font-bold tabular-nums text-right shrink-0">
                    1 petit pain (~10 g)
                  </span>
                </li>
                <li className="py-3 flex justify-between gap-4">
                  <span className="font-semibold text-[#1E2E25]">
                    Perles de Pêche (Peach Gum)
                    <span className="block text-xs font-normal text-[#3E4A3D]">
                      Facultatif · texture &amp; collagène végétal
                    </span>
                  </span>
                  <span className="text-[#3E4A3D] font-bold tabular-nums text-right shrink-0">
                    10 g
                  </span>
                </li>
                <li className="py-3 flex justify-between gap-4">
                  <span className="font-semibold text-[#1E2E25]">
                    Dattes de jujube rouges, dénoyautées
                  </span>
                  <span className="text-[#3E4A3D] font-bold tabular-nums text-right shrink-0">
                    10–12 pcs (~30 g)
                  </span>
                </li>
                <li className="py-3 flex justify-between gap-4">
                  <span className="font-semibold text-[#1E2E25]">Baies de Goji</span>
                  <span className="text-[#3E4A3D] font-bold tabular-nums text-right shrink-0">
                    20 g
                  </span>
                </li>
                <li className="py-3 flex justify-between gap-4">
                  <span className="font-semibold text-[#1E2E25]">Longan séché</span>
                  <span className="text-[#3E4A3D] font-bold tabular-nums text-right shrink-0">
                    20 g
                  </span>
                </li>
                <li className="py-3 flex justify-between gap-4">
                  <span className="font-semibold text-[#1E2E25]">
                    Pomme douce, coupée en dés
                  </span>
                  <span className="text-[#3E4A3D] font-bold tabular-nums text-right shrink-0">
                    1/2 (~80 g)
                  </span>
                </li>
                <li className="py-3 flex justify-between gap-4">
                  <span className="font-semibold text-[#1E2E25]">
                    Gingembre frais, en tranches
                  </span>
                  <span className="text-[#3E4A3D] font-bold tabular-nums text-right shrink-0">
                    3–4 tr. (~10 g)
                  </span>
                </li>
                <li className="py-3 flex justify-between gap-4">
                  <span className="font-semibold text-[#1E2E25]">
                    Eau filtrée peu minéralisée
                  </span>
                  <span className="text-[#3E4A3D] font-bold tabular-nums text-right shrink-0">
                    800 ml
                  </span>
                </li>
              </ul>
            </div>

            <div className="mt-6 rounded-2xl bg-[#FAF7F2] border border-[#E7DFD3] p-4 text-xs sm:text-sm text-[#3E4A3D] leading-relaxed">
              <strong className="text-[#1E2E25] flex items-center gap-1.5 mb-1">
                <Leaf className="w-4 h-4 text-[#3E4A3D]" />
                Exigence de qualité botanique :
              </strong>
              Privilégiez des végétaux issus de l’agriculture biologique, séchés à basse
              température et garantis <strong>non traités au soufre</strong> (en
              particulier pour le Tremella et les baies de Goji) afin d’obtenir un
              extrait pur et limpide.
            </div>
          </section>

          {/* Préparation étape par étape */}
          <section
            aria-labelledby="preparation-heading"
            className="lg:col-span-7 bg-white rounded-3xl border border-[#E7DFD3] p-7 sm:p-8 shadow-xs"
          >
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#3E4A3D]/80 mb-2">
              <Clock className="w-4 h-4 text-[#C8AB8A]" />
              <span>Avant la mise en extracteur</span>
            </div>
            <h2
              id="preparation-heading"
              className="text-2xl font-extrabold text-[#1E2E25] mb-6"
            >
              Préparation étape par étape
            </h2>

            <ol className="space-y-6">
              <li className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E7DFD3]">
                <span className="text-xs font-extrabold uppercase tracking-wider text-[#E8772E] block mb-1">
                  Étape 1 · Réhydratation (4 h à 1 nuit)
                </span>
                <h3 className="text-lg font-bold text-[#1E2E25] mb-2">
                  Trempage séparé du Tremella et des Perles de Pêche
                </h3>
                <p className="text-sm sm:text-base text-[#3E4A3D] leading-relaxed">
                  La veille au soir — ou au minimum <strong>4 heures</strong> avant de
                  lancer votre BloomLab® — déposez le champignon blanc et les perles de
                  pêche dans <strong>deux bols distincts</strong> remplis d’un grand
                  volume d’eau froide. Le Tremella se déploie jusqu’à tripler de volume,
                  tandis que les cristaux de résine de pêcher deviennent translucides
                  et souples.
                </p>
              </li>

              <li className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E7DFD3]">
                <span className="text-xs font-extrabold uppercase tracking-wider text-[#E8772E] block mb-1">
                  Étape 2 · Parage &amp; Découpe
                </span>
                <h3 className="text-lg font-bold text-[#1E2E25] mb-2">
                  Préparation des matrices végétales
                </h3>
                <p className="text-sm sm:text-base text-[#3E4A3D] leading-relaxed">
                  Égouttez soigneusement le champignon des neiges, retirez le cœur
                  jaune et coriace situé à sa base, puis déchirez les pétales à la
                  main en petits morceaux pour maximiser la surface d’échange avec
                  l’eau. Rincez les perles de pêche en retirant les éventuelles
                  particules d’écorce. Coupez les dattes de jujube dénoyautées en deux,
                  détaillez la demi-pomme en petits dés et émincez le gingembre frais
                  en fines tranches.
                </p>
              </li>

              <li className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E7DFD3]">
                <span className="text-xs font-extrabold uppercase tracking-wider text-[#E8772E] block mb-1">
                  Étape 3 · Extraction Séquencée BloomLab®
                </span>
                <h3 className="text-lg font-bold text-[#1E2E25] mb-2">
                  Séquence en deux paliers thermiques
                </h3>
                <p className="text-sm sm:text-base text-[#3E4A3D] leading-relaxed">
                  Versez les 800 ml d’eau filtrée dans la cuve, ajoutez tous les
                  ingrédients préparés (hormis les baies de Goji) et lancez la Phase 1
                  à <strong>80 °C pendant 45 minutes</strong>. À l’issue de cette
                  première étape, incorporez les baies de Goji puis lancez la Phase 2 à{' '}
                  <strong>70 °C pendant 15 minutes</strong>.
                </p>
              </li>
            </ol>
          </section>
        </div>

        {/* 5. PROTOCOLE D'EXTRACTION BLOOMLAB (TABLEAU + POURQUOI CES PARAMÈTRES) */}
        <section
          aria-labelledby="protocole-heading"
          className="bg-white rounded-3xl border border-[#E7DFD3] p-7 sm:p-10 shadow-xs space-y-8"
        >
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#E8772E] mb-2">
              <Thermometer className="w-4 h-4" />
              <span>Ingénierie Botanique BloomLab®</span>
            </div>
            <h2
              id="protocole-heading"
              className="text-2xl sm:text-3xl font-extrabold text-[#1E2E25]"
            >
              Protocole d’Extraction BloomLab® (Recette BloomLab)
            </h2>
            <p className="text-sm sm:text-base text-[#3E4A3D] mt-2">
              Paramètres calibrés pour extraire les polysaccharides du Tremella et
              préserver la zéaxanthine des baies de Goji dans 800 ml d’eau filtrée.
            </p>
          </div>

          <div className="w-full overflow-x-auto pb-4">
            <table className="w-full min-w-[860px] table-auto text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-[#3E4A3D]/20 bg-[#FAF7F2] text-xs font-extrabold uppercase tracking-wider text-[#1E2E25]">
                  <th className="py-3.5 px-4 min-w-[170px] whitespace-nowrap">
                    Étape
                  </th>
                  <th className="py-3.5 px-4 min-w-[260px] whitespace-nowrap">
                    Ingrédients à ajouter
                  </th>
                  <th className="py-3.5 px-4 min-w-[120px] whitespace-nowrap">
                    Température
                  </th>
                  <th className="py-3.5 px-4 min-w-[120px] whitespace-nowrap">
                    Durée
                  </th>
                  <th className="py-3.5 px-4 min-w-[260px] whitespace-nowrap">
                    Objectif Scientifique
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E7DFD3] text-sm text-[#3E4A3D]">
                <tr className="hover:bg-[#FAF7F2]/60 transition-colors">
                  <td className="py-4 px-4 font-bold text-[#1E2E25] align-top">
                    Phase 1 (Hydrosoluble)
                  </td>
                  <td className="py-4 px-4 align-top">
                    Champignon blanc (Tremella), perles de pêche, dattes de jujube,
                    longan, gingembre frais, pomme en dés
                  </td>
                  <td className="py-4 px-4 font-extrabold text-[#E8772E] tabular-nums align-top whitespace-nowrap">
                    80 °C
                  </td>
                  <td className="py-4 px-4 font-bold text-[#1E2E25] tabular-nums align-top whitespace-nowrap">
                    45 minutes
                  </td>
                  <td className="py-4 px-4 align-top leading-relaxed">
                    Gélatiniser les polysaccharides du Tremella et libérer les
                    macromolécules sans détruire les gingérols.
                  </td>
                </tr>
                <tr className="hover:bg-[#FAF7F2]/60 transition-colors">
                  <td className="py-4 px-4 font-bold text-[#1E2E25] align-top">
                    Phase 2 (Finition)
                  </td>
                  <td className="py-4 px-4 align-top">Baies de Goji</td>
                  <td className="py-4 px-4 font-extrabold text-[#3E4A3D] tabular-nums align-top whitespace-nowrap">
                    70 °C
                  </td>
                  <td className="py-4 px-4 font-bold text-[#1E2E25] tabular-nums align-top whitespace-nowrap">
                    15 minutes
                  </td>
                  <td className="py-4 px-4 align-top leading-relaxed">
                    Préserver la zéaxanthine et la vitamine C thermolabiles tout en
                    diffusant la douceur naturelle du fruit.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Pourquoi ces paramètres ? */}
          <div className="rounded-2xl bg-[#FAF7F2] border border-[#E7DFD3] p-6 sm:p-7 space-y-4">
            <h3 className="text-lg sm:text-xl font-extrabold text-[#1E2E25] flex items-center gap-2">
              <Info className="w-5 h-5 text-[#E8772E]" />
              Pourquoi ces paramètres ?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-[#3E4A3D] leading-relaxed">
              <div>
                <p className="font-bold text-[#1E2E25] mb-1">
                  1. Pourquoi 80 °C (et pas 100 °C) ?
                </p>
                <p>
                  Le palier à <strong>80 °C</strong> suffit à gélatiniser les
                  polysaccharides du champignon blanc et des perles de pêche tout en
                  préservant les gingérols du gingembre. Une ébullition vigoureuse à
                  100 °C dégraderait rapidement les vitamines fragiles de la pomme et
                  oxyderait les arômes volatils.
                </p>
              </div>
              <div>
                <p className="font-bold text-[#1E2E25] mb-1">
                  2. Pourquoi 45 minutes en Phase 1 ?
                </p>
                <p>
                  Même après réhydratation, le Tremella et les perles de pêche
                  conservent une structure polysaccharidique dense. Le maintien stable
                  pendant <strong>45 minutes</strong> sous brassage doux laisse le
                  temps à l’eau de pénétrer ces matrices et de créer une texture
                  veloutée homogène.
                </p>
              </div>
              <div>
                <p className="font-bold text-[#1E2E25] mb-1">
                  3. Pourquoi les Goji à 70 °C en Phase 2 ?
                </p>
                <p>
                  Les baies de Goji concentrent de la <strong>zéaxanthine</strong> et
                  de la <strong>vitamine C</strong> particulièrement sensibles à la
                  chaleur prolongée. Les introduire uniquement sur les{' '}
                  <strong>15 dernières minutes à 70 °C</strong> protège leur potentiel
                  antioxydant.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 6. BIENFAITS (SECTION ÉDUCATIVE) */}
        <section aria-labelledby="bienfaits-heading" className="space-y-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#3E4A3D]/80 mb-2">
              <BookOpen className="w-4 h-4 text-[#C8AB8A]" />
              <span>Comprendre la Synergie Végétale</span>
            </div>
            <h2
              id="bienfaits-heading"
              className="text-2xl sm:text-3xl font-extrabold text-[#1E2E25]"
            >
              Les bienfaits de cette tisane Yin &amp; Sang Beauté
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-3xl border border-[#E7DFD3] p-6 sm:p-7 shadow-xs flex flex-col justify-between space-y-4">
              <div>
                <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-[#E8772E] mb-2">
                  <Droplets className="w-4 h-4" />
                  Hydratation &amp; Peau (Yin)
                </span>
                <h3 className="text-xl font-bold text-[#1E2E25] mb-3">
                  Polysaccharides de Tremella &amp; Collagène Végétal
                </h3>
                <p className="text-sm text-[#3E4A3D] leading-relaxed">
                  Les polysaccharides du champignon blanc sont réputés pour leur
                  capacité exceptionnelle de rétention d’eau, favorisant une
                  hydratation profonde des tissus et un soutien naturel de la souplesse
                  cutanée. Les perles de pêche complètent cette texture avec leur
                  apport traditionnellement qualifié de <strong>collagène végétal</strong>,
                  apprécié pour l’élasticité et le velouté du teint.
                </p>
              </div>
              <p className="text-xs text-[#3E4A3D]/90 pt-3 border-t border-[#E7DFD3] leading-relaxed">
                <strong>Repère scientifique 2026 :</strong> Des travaux publiés en
                2026 montrent que les polysaccharides de Tremella améliorent
                l’hydratation de la peau et contribuent à renforcer la barrière
                cutanée.
              </p>
            </div>

            <div className="bg-white rounded-3xl border border-[#E7DFD3] p-6 sm:p-7 shadow-xs space-y-3">
              <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-[#E8772E]">
                <Sparkles className="w-4 h-4" />
                Sang &amp; Vitalité
              </span>
              <h3 className="text-xl font-bold text-[#1E2E25]">
                Bienfaits Goji, Jujube &amp; Caroténoïdes
              </h3>
              <p className="text-sm text-[#3E4A3D] leading-relaxed">
                Dans la lecture MTC, un teint lumineux reflète la plénitude du Sang
                et du Yin. Les baies de Goji — naturellement riches en zéaxanthine et
                bêta-carotène — nourrissent le Yin du Foie et des Reins tout en
                soutenant le confort oculaire. Les dattes de jujube rouges tonifient en
                douceur le Qi et le Sang, apportant une rondeur chaleureuse à
                l’infusion.
              </p>
            </div>

            <div className="bg-white rounded-3xl border border-[#E7DFD3] p-6 sm:p-7 shadow-xs space-y-3">
              <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-[#E8772E]">
                <Flame className="w-4 h-4" />
                Énergie &amp; Digestion
              </span>
              <h3 className="text-xl font-bold text-[#1E2E25]">
                Harmonie Longan &amp; Gingembre Frais
              </h3>
              <p className="text-sm text-[#3E4A3D] leading-relaxed">
                Le longan séché soutient classiquement le Cœur et la Rate, aidant à
                apaiser l’agitation intérieure et à préparer un sommeil plus serein.
                Pour contrebalancer la nature fraîche et humidifiante du Tremella,
                quelques tranches de gingembre frais réchauffent le centre digestif,
                soutiennent la micro-circulation et facilitent l’assimilation de
                l’ensemble.
              </p>
            </div>
          </div>
        </section>

        {/* 7. POSOLOGIE & CONSERVATION */}
        <section
          aria-labelledby="posologie-heading"
          className="bg-white rounded-3xl border border-[#E7DFD3] p-7 sm:p-10 shadow-xs space-y-6"
        >
          <h2
            id="posologie-heading"
            className="text-2xl sm:text-3xl font-extrabold text-[#1E2E25]"
          >
            Posologie, Rythme d’Usage &amp; Conservation
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E7DFD3]">
              <span className="block text-xs font-bold uppercase tracking-wider text-[#3E4A3D]/70 mb-1">
                Quantité quotidienne
              </span>
              <p className="text-lg font-extrabold text-[#1E2E25] tabular-nums">
                1 tasse (200–250 ml)
              </p>
              <p className="text-xs text-[#3E4A3D] mt-1">
                Par jour, en boisson tiède ou à température ambiante.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E7DFD3]">
              <span className="block text-xs font-bold uppercase tracking-wider text-[#3E4A3D]/70 mb-1">
                Moment optimal
              </span>
              <p className="text-lg font-extrabold text-[#1E2E25]">
                Matin ou fin d’après-midi
              </p>
              <p className="text-xs text-[#3E4A3D] mt-1">
                Éviter de boire glacé pour respecter la chaleur digestive.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E7DFD3]">
              <span className="block text-xs font-bold uppercase tracking-wider text-[#3E4A3D]/70 mb-1">
                Durée conseillée
              </span>
              <p className="text-lg font-extrabold text-[#1E2E25] tabular-nums">
                2 à 3 semaines
              </p>
              <p className="text-xs text-[#3E4A3D] mt-1">
                Pour apprécier pleinement la régularité sur la peau et l’énergie.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E7DFD3]">
              <span className="block text-xs font-bold uppercase tracking-wider text-[#3E4A3D]/70 mb-1">
                Conservation
              </span>
              <p className="text-lg font-extrabold text-[#1E2E25] tabular-nums">
                5 à 6 jours à 4 °C
              </p>
              <p className="text-xs text-[#3E4A3D] mt-1">
                Au réfrigérateur, en bouteille en verre propre hermétique.
              </p>
            </div>
          </div>

          <div className="rounded-2xl bg-[#FAF7F2] border border-[#E7DFD3] p-5 flex items-start gap-3.5 text-xs sm:text-sm text-[#3E4A3D] leading-relaxed">
            <ShieldCheck className="w-5 h-5 text-[#3E4A3D] shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#1E2E25]">
                Information éducative &amp; précautions d’emploi :
              </strong>{' '}
              Cette fiche recette de gastronomie botanique s’inscrit dans une démarche
              éducative et de bien-être général ; elle ne constitue pas un avis médical
              et ne se substitue à aucun traitement. Par prudence, demandez conseil à
              un professionnel de santé en cas de grossesse, d’allaitement, chez
              l’enfant, ou si vous suivez un traitement médicamenteux (notamment
              anticoagulant ou régulateur de glycémie).
            </div>
          </div>
        </section>

        {/* 8. APPEL À L'ACTION (CTA) */}
        <section
          aria-labelledby="cta-heading"
          className="rounded-3xl bg-[#1E2E25] p-8 sm:p-12 text-white shadow-lg"
        >
          <div className="max-w-3xl space-y-5">
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#C8AB8A]">
              Passez de la théorie à l’extraction de précision
            </p>
            <h2
              id="cta-heading"
              className="text-2xl sm:text-3xl font-extrabold !text-white leading-tight"
            >
              Réalisez cette Soupe de Beauté au degré près avec la BloomLab®
            </h2>
            <p className="text-sm sm:text-base !text-[#FAF7F2]/90 leading-relaxed">
              Grâce au contrôle thermique à 80 °C et 70 °C sans surveillance ni
              ébullition destructrice, votre cuisine devient un véritable atelier
              d’herboristerie moderne.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="/bloomlab/"
                onClick={(e) => handleLinkClick(e, 'machine')}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-[#E8772E] hover:bg-[#d16521] !text-white font-bold text-sm transition-colors shadow-md"
              >
                <span>Découvrir l’extracteur BloomLab®</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="/recettes/"
                onClick={(e) => handleLinkClick(e, 'recettes')}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full border border-white/25 hover:bg-white/10 !text-white font-semibold text-sm transition-colors"
              >
                Explorer toutes les recettes
              </a>

              <a
                href="/academie/"
                onClick={(e) => handleLinkClick(e, 'academie')}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full border border-white/25 hover:bg-white/10 !text-white font-semibold text-sm transition-colors"
              >
                Découvrir la Bloom Académie
              </a>
            </div>
          </div>
        </section>
      </main>
    </article>
  );
}
