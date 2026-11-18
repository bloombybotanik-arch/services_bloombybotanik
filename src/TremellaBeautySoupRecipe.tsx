import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  ChefHat,
  Clock,
  Droplets,
  Flame,
  Flower2,
  Heart,
  Info,
  Leaf,
  Moon,
  ShieldCheck,
  Sparkles,
  Thermometer,
  Utensils,
} from 'lucide-react';
import { Language } from './translations';
import { View } from './types';
import { TREMELLA_RECIPE_COPY } from './data/tremellaRecipeData';
import tremellaSoupImg from './assets/images/soupe_beaute_tremella_1794992328062.jpg';

interface TremellaBeautySoupRecipeProps {
  lang?: Language;
  onNavigate: (view: View, param?: string) => void;
}

export default function TremellaBeautySoupRecipe({
  lang = 'fr',
  onNavigate,
}: TremellaBeautySoupRecipeProps) {
  const [imgError, setImgError] = useState(false);
  const copy = TREMELLA_RECIPE_COPY[lang] || TREMELLA_RECIPE_COPY.fr;

  const recipeJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Recipe',
    name: copy.jsonLd.name,
    alternateName: copy.jsonLd.alternateName,
    description: copy.metaDescription,
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
    recipeYield: copy.jsonLd.recipeYield,
    recipeCategory: copy.jsonLd.recipeCategory,
    recipeCuisine: copy.jsonLd.recipeCuisine,
    keywords: copy.jsonLd.keywords,
    recipeIngredient: copy.jsonLd.recipeIngredient,
    recipeInstructions: copy.jsonLd.recipeInstructions.map((step) => ({
      '@type': 'HowToStep',
      name: step.name,
      text: step.text,
    })),
  };

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

  const benefitIcons = [
    <Droplets key="drop" className="w-4 h-4" />,
    <Sparkles key="spark" className="w-4 h-4" />,
    <Flame key="flame" className="w-4 h-4" />,
  ];

  return (
    <article className="w-full min-h-screen bg-[#F9F6F0] text-[#1E2E25] pb-24 animate-in fade-in duration-700">
      {/* Données Structurées Schema.org Recipe */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(recipeJsonLd) }}
      />

      {/* Top Editorial Breadcrumb Strip */}
      <div className="border-b border-[#E7DFD3] bg-[#FAF7F2]">
        <div className="max-w-5xl mx-auto px-6 md:px-10 py-4 flex flex-wrap items-center justify-between gap-4 text-xs font-semibold text-[#3E4A3D]">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2">
            <a
              href="/"
              onClick={(e) => handleLinkClick(e, 'indexbis')}
              className="hover:text-[#E8772E] transition-colors"
            >
              {copy.breadcrumbHome}
            </a>
            <span className="text-[#C8AB8A]">/</span>
            <a
              href="/gastronomie-botanique/"
              onClick={(e) => handleLinkClick(e, 'culinaire')}
              className="hover:text-[#E8772E] transition-colors"
            >
              {copy.breadcrumbCulinary}
            </a>
            <span className="text-[#C8AB8A]">/</span>
            <span className="text-[#1E2E25] font-bold">{copy.breadcrumbCurrent}</span>
          </nav>

          <button
            type="button"
            onClick={() => onNavigate('culinaire')}
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#3E4A3D] hover:text-[#E8772E] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            {copy.backButton}
          </button>
        </div>
      </div>

      {/* 1. HERO SECTION */}
      <header className="max-w-5xl mx-auto px-6 md:px-10 pt-10 md:pt-14 pb-10">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#3E4A3D]/80 mb-5">
          {copy.heroEyebrow}
        </p>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1E2E25] leading-[1.12] tracking-tight mb-6">
          {copy.h1}
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-[#3E4A3D] leading-relaxed max-w-3xl mb-8">
          {copy.subtitle}
        </p>

        {/* Key Metrics Strip (unboxed, hairline bounded) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 border-y border-[#E7DFD3] py-4 gap-4 mb-10 text-sm">
          <div>
            <span className="block text-[11px] font-bold uppercase tracking-wider text-[#3E4A3D]/70">
              {copy.metrics.volumeLabel}
            </span>
            <span className="font-extrabold text-[#1E2E25] tabular-nums">
              {copy.metrics.volumeValue}
            </span>
          </div>
          <div>
            <span className="block text-[11px] font-bold uppercase tracking-wider text-[#3E4A3D]/70">
              {copy.metrics.rehydrationLabel}
            </span>
            <span className="font-extrabold text-[#1E2E25] tabular-nums">
              {copy.metrics.rehydrationValue}
            </span>
          </div>
          <div>
            <span className="block text-[11px] font-bold uppercase tracking-wider text-[#3E4A3D]/70">
              {copy.metrics.cycleLabel}
            </span>
            <span className="font-extrabold text-[#1E2E25] tabular-nums">
              {copy.metrics.cycleValue}
            </span>
          </div>
          <div>
            <span className="block text-[11px] font-bold uppercase tracking-wider text-[#3E4A3D]/70">
              {copy.metrics.signatureLabel}
            </span>
            <span className="font-extrabold text-[#1E2E25]">
              {copy.metrics.signatureValue}
            </span>
          </div>
        </div>

        {/* Hero Visual Container */}
        <figure className="rounded-3xl overflow-hidden border border-[#E7DFD3] bg-white shadow-sm">
          <div className="relative aspect-[16/9] w-full bg-[#FAF7F2] overflow-hidden">
            {!imgError ? (
              <img
                src={tremellaSoupImg}
                alt={copy.imageAlt}
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
                  {copy.breadcrumbCurrent}
                </p>
                <p className="text-xs text-[#3E4A3D] mt-1">
                  {copy.metrics.cycleValue}
                </p>
              </div>
            )}
          </div>
          <figcaption className="px-6 py-3.5 bg-[#FAF7F2] border-t border-[#E7DFD3] flex flex-wrap items-center justify-between gap-2 text-xs text-[#3E4A3D]">
            <span>
              <strong className="text-[#1E2E25]">{copy.captionLead}</strong>{' '}
              {copy.captionSub}
            </span>
            <span className="font-bold uppercase tracking-wider text-[#E8772E]">
              {copy.captionBadge}
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
            <span>{copy.intro.eyebrow}</span>
          </div>
          <h2
            id="intro-heading"
            className="text-2xl sm:text-3xl font-extrabold text-[#1E2E25]"
          >
            {copy.intro.heading}
          </h2>
          <p className="text-base text-[#3E4A3D] leading-relaxed">{copy.intro.p1}</p>
          <p className="text-base text-[#3E4A3D] leading-relaxed">{copy.intro.p2}</p>
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
                <span>{copy.ingredients.eyebrow}</span>
              </div>
              <h2
                id="ingredients-heading"
                className="text-2xl font-extrabold text-[#1E2E25] mb-6"
              >
                {copy.ingredients.heading}
              </h2>

              <ul className="divide-y divide-[#E7DFD3] text-sm sm:text-base">
                {copy.ingredients.items.map((item, idx) => (
                  <li key={idx} className="py-3 flex justify-between gap-4">
                    <span className="font-semibold text-[#1E2E25]">
                      {item.name}
                      {item.note && (
                        <span className="block text-xs font-normal text-[#3E4A3D]">
                          {item.note}
                        </span>
                      )}
                    </span>
                    <span className="text-[#3E4A3D] font-bold tabular-nums text-right shrink-0">
                      {item.qty}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 rounded-2xl bg-[#FAF7F2] border border-[#E7DFD3] p-4 text-xs sm:text-sm text-[#3E4A3D] leading-relaxed">
              <strong className="text-[#1E2E25] flex items-center gap-1.5 mb-1">
                <Leaf className="w-4 h-4 text-[#3E4A3D]" />
                {copy.ingredients.qualityTitle}
              </strong>
              {copy.ingredients.qualityText}
            </div>
          </section>

          {/* Préparation étape par étape */}
          <section
            aria-labelledby="preparation-heading"
            className="lg:col-span-7 bg-white rounded-3xl border border-[#E7DFD3] p-7 sm:p-8 shadow-xs"
          >
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#3E4A3D]/80 mb-2">
              <Clock className="w-4 h-4 text-[#C8AB8A]" />
              <span>{copy.preparation.eyebrow}</span>
            </div>
            <h2
              id="preparation-heading"
              className="text-2xl font-extrabold text-[#1E2E25] mb-6"
            >
              {copy.preparation.heading}
            </h2>

            <ol className="space-y-6">
              {copy.preparation.steps.map((step, idx) => (
                <li
                  key={idx}
                  className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E7DFD3]"
                >
                  <span className="text-xs font-extrabold uppercase tracking-wider text-[#E8772E] block mb-1">
                    {step.badge}
                  </span>
                  <h3 className="text-lg font-bold text-[#1E2E25] mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm sm:text-base text-[#3E4A3D] leading-relaxed">
                    {step.body}
                  </p>
                </li>
              ))}
            </ol>
          </section>
        </div>

        {/* NOUVELLE SECTION 1 : LE LONGAN — L'INGRÉDIENT DU CŒUR ET DE L'ESPRIT */}
        <section
          aria-labelledby="longan-heading"
          className="rounded-3xl bg-[#F5F0E6] border border-[#C8AB8A] p-7 sm:p-10 shadow-xs space-y-6"
        >
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.18em] text-[#9E6B64]">
              <Heart className="w-4 h-4" />
              <span>{copy.longanSection.eyebrow}</span>
            </div>
            <h2
              id="longan-heading"
              className="text-2xl sm:text-3xl font-extrabold text-[#1E2E25]"
            >
              {copy.longanSection.heading}
            </h2>
            <p className="text-sm font-semibold text-[#3E4A3D]">
              {copy.longanSection.subheading}
            </p>
          </div>

          <blockquote className="rounded-2xl bg-white/80 border border-[#C8AB8A]/60 p-5 sm:p-6 text-base sm:text-lg font-medium text-[#1E2E25] leading-relaxed">
            {copy.longanSection.quote}
          </blockquote>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {copy.longanSection.points.map((point, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-[#FAF7F2] border border-[#E7DFD3] p-6 space-y-2.5"
              >
                <h3 className="text-lg font-bold text-[#1E2E25] flex items-center gap-2">
                  {idx === 0 ? (
                    <Heart className="w-4 h-4 text-[#9E6B64] shrink-0" />
                  ) : (
                    <Moon className="w-4 h-4 text-[#3E4A3D] shrink-0" />
                  )}
                  <span>{point.title}</span>
                </h3>
                <p className="text-sm sm:text-base text-[#3E4A3D] leading-relaxed">
                  {point.body}
                </p>
              </div>
            ))}
          </div>

          <div className="rounded-2xl bg-white border border-[#C8AB8A]/70 p-5 flex items-start gap-3.5 text-sm text-[#3E4A3D] leading-relaxed">
            <Info className="w-5 h-5 text-[#9E6B64] shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#1E2E25] block mb-0.5">
                {copy.longanSection.variantBadge}
              </strong>
              {copy.longanSection.variantText}
            </div>
          </div>
        </section>

        {/* NOUVELLE SECTION 2 : VARIANTES POIRE OU POMME ? */}
        <section aria-labelledby="fruit-variants-heading" className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#3E4A3D]/80">
              <Leaf className="w-4 h-4 text-[#C8AB8A]" />
              <span>{copy.fruitVariants.eyebrow}</span>
            </div>
            <h2
              id="fruit-variants-heading"
              className="text-2xl sm:text-3xl font-extrabold text-[#1E2E25]"
            >
              {copy.fruitVariants.heading}
            </h2>
            <p className="text-sm sm:text-base text-[#3E4A3D] max-w-3xl leading-relaxed">
              {copy.fruitVariants.lead}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Carte Poire */}
            <div className="bg-white rounded-3xl border border-[#C8AB8A]/80 p-7 sm:p-8 shadow-xs flex flex-col justify-between space-y-5">
              <div className="space-y-4">
                <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#9E6B64] flex items-center gap-1.5">
                  <Droplets className="w-4 h-4" />
                  <span>{copy.fruitVariants.pear.badge}</span>
                </p>
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#1E2E25] leading-snug">
                  {copy.fruitVariants.pear.title}
                </h3>
                <p className="text-sm sm:text-base text-[#3E4A3D] leading-relaxed">
                  {copy.fruitVariants.pear.body}
                </p>
                <ul className="space-y-2 text-sm text-[#3E4A3D]">
                  {copy.fruitVariants.pear.highlights.map((h, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#3E4A3D] shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl bg-[#F5F0E6] border border-[#E7DFD3] p-4 text-xs sm:text-sm text-[#3E4A3D]">
                <strong className="text-[#1E2E25]">
                  {copy.fruitVariants.pear.tipLabel}
                </strong>{' '}
                {copy.fruitVariants.pear.tip}
              </div>
            </div>

            {/* Carte Pomme */}
            <div className="bg-white rounded-3xl border border-[#E7DFD3] p-7 sm:p-8 shadow-xs flex flex-col justify-between space-y-5">
              <div className="space-y-4">
                <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#3E4A3D] flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-[#E8772E]" />
                  <span>{copy.fruitVariants.apple.badge}</span>
                </p>
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#1E2E25] leading-snug">
                  {copy.fruitVariants.apple.title}
                </h3>
                <p className="text-sm sm:text-base text-[#3E4A3D] leading-relaxed">
                  {copy.fruitVariants.apple.body}
                </p>
                <ul className="space-y-2 text-sm text-[#3E4A3D]">
                  {copy.fruitVariants.apple.highlights.map((h, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#3E4A3D] shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl bg-[#FAF7F2] border border-[#E7DFD3] p-4 text-xs sm:text-sm text-[#3E4A3D]">
                <strong className="text-[#1E2E25]">
                  {copy.fruitVariants.apple.tipLabel}
                </strong>{' '}
                {copy.fruitVariants.apple.tip}
              </div>
            </div>
          </div>
        </section>

        {/* NOUVELLE SECTION 3 : L'OPTION FLEURS DE LOTUS (SÉRÉNITÉ & ÉCLAT) */}
        <section
          aria-labelledby="lotus-variant-heading"
          className="rounded-3xl bg-[#FAF7F2] border border-[#C8AB8A] p-7 sm:p-10 shadow-xs space-y-6"
        >
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.18em] text-[#9E6B64]">
              <Flower2 className="w-4 h-4" />
              <span>{copy.lotusVariant.badge}</span>
            </div>
            <h2
              id="lotus-variant-heading"
              className="text-2xl sm:text-3xl font-extrabold text-[#1E2E25]"
            >
              {copy.lotusVariant.heading}
            </h2>
          </div>

          <p className="text-base sm:text-lg text-[#1E2E25] font-medium leading-relaxed">
            {copy.lotusVariant.leadQuote}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {copy.lotusVariant.details.map((detail, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-white border border-[#E7DFD3] p-5 space-y-2"
              >
                <h3 className="text-sm font-extrabold uppercase tracking-wider text-[#9E6B64]">
                  {detail.label}
                </h3>
                <p className="text-sm text-[#3E4A3D] leading-relaxed">
                  {detail.value}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 5. PROTOCOLE D'EXTRACTION BLOOMLAB (TABLEAU MIS À JOUR + POURQUOI CES PARAMÈTRES) */}
        <section
          aria-labelledby="protocole-heading"
          className="bg-white rounded-3xl border border-[#E7DFD3] p-7 sm:p-10 shadow-xs space-y-8"
        >
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#E8772E] mb-2">
              <Thermometer className="w-4 h-4" />
              <span>{copy.protocol.eyebrow}</span>
            </div>
            <h2
              id="protocole-heading"
              className="text-2xl sm:text-3xl font-extrabold text-[#1E2E25]"
            >
              {copy.protocol.heading}
            </h2>
            <p className="text-sm sm:text-base text-[#3E4A3D] mt-2">
              {copy.protocol.lead}
            </p>
          </div>

          <div className="w-full overflow-x-auto pb-4">
            <table className="w-full min-w-[860px] table-auto text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-[#3E4A3D]/20 bg-[#FAF7F2] text-xs font-extrabold uppercase tracking-wider text-[#1E2E25]">
                  <th className="py-3.5 px-4 min-w-[180px] whitespace-nowrap">
                    {copy.protocol.headers.step}
                  </th>
                  <th className="py-3.5 px-4 min-w-[260px] whitespace-nowrap">
                    {copy.protocol.headers.ingredients}
                  </th>
                  <th className="py-3.5 px-4 min-w-[120px] whitespace-nowrap">
                    {copy.protocol.headers.temp}
                  </th>
                  <th className="py-3.5 px-4 min-w-[120px] whitespace-nowrap">
                    {copy.protocol.headers.duration}
                  </th>
                  <th className="py-3.5 px-4 min-w-[260px] whitespace-nowrap">
                    {copy.protocol.headers.objective}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E7DFD3] text-sm text-[#3E4A3D]">
                {copy.protocol.rows.map((row, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-[#FAF7F2]/60 transition-colors"
                  >
                    <td className="py-4 px-4 font-bold text-[#1E2E25] align-top">
                      {row.step}
                    </td>
                    <td className="py-4 px-4 align-top">{row.ingredients}</td>
                    <td
                      className={`py-4 px-4 font-extrabold tabular-nums align-top whitespace-nowrap ${
                        row.tempHighlight ? 'text-[#E8772E]' : 'text-[#3E4A3D]'
                      }`}
                    >
                      {row.temp}
                    </td>
                    <td className="py-4 px-4 font-bold text-[#1E2E25] tabular-nums align-top whitespace-nowrap">
                      {row.duration}
                    </td>
                    <td className="py-4 px-4 align-top leading-relaxed">
                      {row.objective}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Note de bas de tableau (Longan & Graines de Lotus en Phase 1) */}
          <div className="rounded-2xl bg-[#F5F0E6] border border-[#C8AB8A] p-5 flex items-start gap-3 text-xs sm:text-sm text-[#3E4A3D] leading-relaxed">
            <Info className="w-5 h-5 text-[#9E6B64] shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#1E2E25] mr-1">
                {copy.protocol.tableFootnoteLabel}
              </strong>
              <span>{copy.protocol.tableFootnote}</span>
            </div>
          </div>

          {/* Pourquoi ces paramètres ? */}
          <div className="rounded-2xl bg-[#FAF7F2] border border-[#E7DFD3] p-6 sm:p-7 space-y-4">
            <h3 className="text-lg sm:text-xl font-extrabold text-[#1E2E25] flex items-center gap-2">
              <Info className="w-5 h-5 text-[#E8772E]" />
              {copy.protocol.whyHeading}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-[#3E4A3D] leading-relaxed">
              {copy.protocol.whyPoints.map((pt, idx) => (
                <div key={idx}>
                  <p className="font-bold text-[#1E2E25] mb-1">{pt.title}</p>
                  <p>{pt.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. BIENFAITS (SECTION ÉDUCATIVE) */}
        <section aria-labelledby="bienfaits-heading" className="space-y-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#3E4A3D]/80 mb-2">
              <BookOpen className="w-4 h-4 text-[#C8AB8A]" />
              <span>{copy.benefits.eyebrow}</span>
            </div>
            <h2
              id="bienfaits-heading"
              className="text-2xl sm:text-3xl font-extrabold text-[#1E2E25]"
            >
              {copy.benefits.heading}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {copy.benefits.cards.map((card, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl border border-[#E7DFD3] p-6 sm:p-7 shadow-xs flex flex-col justify-between space-y-4"
              >
                <div>
                  <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-[#E8772E] mb-2">
                    {benefitIcons[idx]}
                    {card.tag}
                  </span>
                  <h3 className="text-xl font-bold text-[#1E2E25] mb-3">
                    {card.title}
                  </h3>
                  <p className="text-sm text-[#3E4A3D] leading-relaxed">
                    {card.body}
                  </p>
                </div>
                {card.footer && (
                  <p className="text-xs text-[#3E4A3D]/90 pt-3 border-t border-[#E7DFD3] leading-relaxed">
                    {card.footer}
                  </p>
                )}
              </div>
            ))}
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
            {copy.dosage.heading}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {copy.dosage.cards.map((card, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E7DFD3]"
              >
                <span className="block text-xs font-bold uppercase tracking-wider text-[#3E4A3D]/70 mb-1">
                  {card.label}
                </span>
                <p className="text-lg font-extrabold text-[#1E2E25] tabular-nums">
                  {card.value}
                </p>
                <p className="text-xs text-[#3E4A3D] mt-1">{card.desc}</p>
              </div>
            ))}
          </div>

          <div className="rounded-2xl bg-[#FAF7F2] border border-[#E7DFD3] p-5 flex items-start gap-3.5 text-xs sm:text-sm text-[#3E4A3D] leading-relaxed">
            <ShieldCheck className="w-5 h-5 text-[#3E4A3D] shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#1E2E25]">
                {copy.dosage.precautionLabel}
              </strong>{' '}
              {copy.dosage.precautionText}
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
              {copy.cta.eyebrow}
            </p>
            <h2
              id="cta-heading"
              className="text-2xl sm:text-3xl font-extrabold !text-white leading-tight"
            >
              {copy.cta.heading}
            </h2>
            <p className="text-sm sm:text-base !text-[#FAF7F2]/90 leading-relaxed">
              {copy.cta.body}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="/bloomlab/"
                onClick={(e) => handleLinkClick(e, 'machine')}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-[#E8772E] hover:bg-[#d16521] !text-white font-bold text-sm transition-colors shadow-md"
              >
                <span>{copy.cta.primaryBtn}</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="/recettes/"
                onClick={(e) => handleLinkClick(e, 'recettes')}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full border border-white/25 hover:bg-white/10 !text-white font-semibold text-sm transition-colors"
              >
                {copy.cta.recipesBtn}
              </a>

              <a
                href="/academie/"
                onClick={(e) => handleLinkClick(e, 'academie')}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full border border-white/25 hover:bg-white/10 !text-white font-semibold text-sm transition-colors"
              >
                {copy.cta.academyBtn}
              </a>
            </div>
          </div>
        </section>
      </main>
    </article>
  );
}
