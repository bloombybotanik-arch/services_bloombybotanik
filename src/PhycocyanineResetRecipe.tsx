import React, { useState } from 'react';
import {
  Activity,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Check,
  Clock,
  Droplets,
  FlaskConical,
  Leaf,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Sun,
  Thermometer,
  Zap,
} from 'lucide-react';
import { Language } from './translations';
import { View } from './types';
import { PHYCOCYANINE_RECIPE_COPY } from './data/phycocyanineRecipeData';
import phycocyanineImg from './assets/images/phycocyanine_spiruline_extract_1795020366000.jpg';

interface PhycocyanineResetRecipeProps {
  lang?: Language;
  onNavigate: (view: View, param?: string) => void;
}

export default function PhycocyanineResetRecipe({
  lang = 'fr',
  onNavigate,
}: PhycocyanineResetRecipeProps) {
  const [imgError, setImgError] = useState(false);
  const copy = PHYCOCYANINE_RECIPE_COPY[lang] || PHYCOCYANINE_RECIPE_COPY.fr;

  const recipeJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Recipe',
    name: copy.jsonLd.name,
    alternateName: copy.jsonLd.alternateName,
    description: copy.metaDescription,
    image: [
      'https://bloombybotanik.com/images/og/recette-phycocyanine-reset.jpg',
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
    prepTime: 'PT10M',
    cookTime: 'PT1H',
    totalTime: 'PT1H10M',
    recipeYield: copy.jsonLd.recipeYield,
    recipeCategory: copy.jsonLd.recipeCategory,
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

  const pillarIcons = [
    <Zap key="zap" className="w-4 h-4 text-[#E8772E]" />,
    <Activity key="act" className="w-4 h-4 text-[#9E6B64]" />,
    <Sparkles key="sp" className="w-4 h-4 text-[#3E4A3D]" />,
  ];

  return (
    <article className="w-full min-h-screen bg-[#F9F6F0] text-[#1E2E25] pb-24 animate-in fade-in duration-700">
      {/* Schema.org Recipe JSON-LD */}
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
              href="/academie/"
              onClick={(e) => handleLinkClick(e, 'academie')}
              className="hover:text-[#E8772E] transition-colors"
            >
              {copy.breadcrumbAcademy}
            </a>
            <span className="text-[#C8AB8A]">/</span>
            <a
              href="/academie/reset-homeostasique/"
              onClick={(e) => handleLinkClick(e, 'phytotherapie-reset')}
              className="hover:text-[#E8772E] transition-colors"
            >
              {copy.breadcrumbReset}
            </a>
            <span className="text-[#C8AB8A]">/</span>
            <span className="text-[#1E2E25] font-bold">{copy.breadcrumbCurrent}</span>
          </nav>

          <button
            type="button"
            onClick={() => onNavigate('phytotherapie-reset')}
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#3E4A3D] hover:text-[#E8772E] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            {copy.backButton}
          </button>
        </div>
      </div>

      {/* 1. SECTION HÉRO */}
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

        {/* Key Metrics Strip */}
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
              {copy.metrics.tempLabel}
            </span>
            <span className="font-extrabold text-[#E8772E] tabular-nums">
              {copy.metrics.tempValue}
            </span>
          </div>
          <div>
            <span className="block text-[11px] font-bold uppercase tracking-wider text-[#3E4A3D]/70">
              {copy.metrics.durationLabel}
            </span>
            <span className="font-extrabold text-[#1E2E25] tabular-nums">
              {copy.metrics.durationValue}
            </span>
          </div>
          <div>
            <span className="block text-[11px] font-bold uppercase tracking-wider text-[#3E4A3D]/70">
              {copy.metrics.phasesLabel}
            </span>
            <span className="font-extrabold text-[#1E2E25]">
              {copy.metrics.phasesValue}
            </span>
          </div>
        </div>

        {/* Hero Visual */}
        <figure className="rounded-3xl overflow-hidden border border-[#E7DFD3] bg-white shadow-sm">
          <div className="relative aspect-[16/9] w-full bg-[#FAF7F2] overflow-hidden">
            {!imgError ? (
              <img
                src={phycocyanineImg}
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
                <FlaskConical className="w-12 h-12 text-[#3E4A3D] mb-3" />
                <p className="text-base font-bold text-[#1E2E25]">
                  {copy.breadcrumbCurrent}
                </p>
                <p className="text-xs text-[#3E4A3D] mt-1">
                  {copy.metrics.tempValue} · {copy.metrics.durationValue}
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
        {/* 2. INTRODUCTION & JUSTIFICATION STRATÉGIQUE */}
        <section
          aria-labelledby="intro-phyco-heading"
          className="bg-white rounded-3xl border border-[#E7DFD3] p-7 sm:p-10 shadow-xs space-y-7"
        >
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#E8772E]">
              <Sparkles className="w-4 h-4" />
              <span>{copy.intro.eyebrow}</span>
            </div>
            <h2
              id="intro-phyco-heading"
              className="text-2xl sm:text-3xl font-extrabold text-[#1E2E25]"
            >
              {copy.intro.heading}
            </h2>
            <p className="text-base text-[#3E4A3D] leading-relaxed">
              {copy.intro.lead}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {copy.intro.pillars.map((pillar, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-[#FAF7F2] border border-[#E7DFD3] p-6 space-y-3"
              >
                <p className="text-[11px] font-extrabold uppercase tracking-wider text-[#9E6B64] flex items-center gap-1.5">
                  {pillarIcons[idx]}
                  <span>{pillar.badge}</span>
                </p>
                <h3 className="text-lg font-bold text-[#1E2E25] leading-snug">
                  {pillar.title}
                </h3>
                <p className="text-sm text-[#3E4A3D] leading-relaxed">
                  {pillar.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 3. LA RECETTE : EXTRACTION DE PHYCOCYANINE AVEC LA BLOOMLAB */}
        <section
          aria-labelledby="recipe-phyco-heading"
          className="bg-white rounded-3xl border border-[#E7DFD3] p-7 sm:p-10 shadow-xs space-y-8"
        >
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#3E4A3D]/80">
              <Thermometer className="w-4 h-4 text-[#C8AB8A]" />
              <span>{copy.recipe.eyebrow}</span>
            </div>
            <h2
              id="recipe-phyco-heading"
              className="text-2xl sm:text-3xl font-extrabold text-[#1E2E25]"
            >
              {copy.recipe.heading}
            </h2>
            <p className="text-sm sm:text-base text-[#3E4A3D] leading-relaxed">
              {copy.recipe.lead}
            </p>
          </div>

          {/* Ingrédient + Solvant */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-2xl bg-[#FAF7F2] border border-[#E7DFD3] p-6 space-y-2">
              <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#3E4A3D]">
                <Leaf className="w-4 h-4 text-[#3E4A3D]" />
                <span>{copy.recipe.ingredientCardTitle}</span>
              </div>
              <p className="text-xl font-extrabold text-[#1E2E25] tabular-nums">
                {copy.recipe.ingredientDose}
              </p>
              <p className="text-sm text-[#3E4A3D] leading-relaxed">
                {copy.recipe.ingredientNote}
              </p>
            </div>

            <div className="rounded-2xl bg-[#FAF7F2] border border-[#E7DFD3] p-6 space-y-2">
              <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#3E4A3D]">
                <Droplets className="w-4 h-4 text-[#9E6B64]" />
                <span>{copy.recipe.solventCardTitle}</span>
              </div>
              <p className="text-xl font-extrabold text-[#1E2E25] tabular-nums">
                {copy.recipe.solventDose}
              </p>
              <p className="text-sm text-[#3E4A3D] leading-relaxed">
                {copy.recipe.solventNote}
              </p>
            </div>
          </div>

          {/* Tableau Protocole d'Extraction */}
          <div className="space-y-4">
            <h3 className="text-lg sm:text-xl font-extrabold text-[#1E2E25]">
              {copy.recipe.tableTitle}
            </h3>

            <div className="w-full overflow-x-auto pb-4">
              <table className="w-full min-w-[820px] table-auto text-left border-collapse">
                <thead>
                  <tr className="border-b-2 border-[#3E4A3D]/20 bg-[#FAF7F2] text-xs font-extrabold uppercase tracking-wider text-[#1E2E25]">
                    <th className="py-3.5 px-4 min-w-[200px] whitespace-nowrap">
                      {copy.recipe.headers.phase}
                    </th>
                    <th className="py-3.5 px-4 min-w-[120px] whitespace-nowrap">
                      {copy.recipe.headers.temp}
                    </th>
                    <th className="py-3.5 px-4 min-w-[130px] whitespace-nowrap">
                      {copy.recipe.headers.duration}
                    </th>
                    <th className="py-3.5 px-4 min-w-[170px] whitespace-nowrap">
                      {copy.recipe.headers.agitation}
                    </th>
                    <th className="py-3.5 px-4 min-w-[280px] whitespace-nowrap">
                      {copy.recipe.headers.justification}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E7DFD3] text-sm text-[#3E4A3D]">
                  <tr>
                    <td className="py-4 px-4 font-bold text-[#1E2E25] align-top">
                      {copy.recipe.row.phase}
                    </td>
                    <td className="py-4 px-4 font-extrabold text-[#E8772E] tabular-nums align-top whitespace-nowrap">
                      {copy.recipe.row.temp}
                    </td>
                    <td className="py-4 px-4 font-bold text-[#1E2E25] tabular-nums align-top whitespace-nowrap">
                      {copy.recipe.row.duration}
                    </td>
                    <td className="py-4 px-4 font-medium text-[#3E4A3D] align-top">
                      {copy.recipe.row.agitation}
                    </td>
                    <td className="py-4 px-4 align-top leading-relaxed">
                      {copy.recipe.row.justification}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Filtration & Conservation */}
          <div className="rounded-2xl bg-[#FAF7F2] border border-[#E7DFD3] p-6 sm:p-7 space-y-4">
            <h3 className="text-lg font-extrabold text-[#1E2E25] flex items-center gap-2">
              <FlaskConical className="w-5 h-5 text-[#3E4A3D]" />
              <span>{copy.recipe.filtrationTitle}</span>
            </h3>
            <ol className="space-y-3 text-sm sm:text-base text-[#3E4A3D] leading-relaxed">
              {copy.recipe.filtrationSteps.map((step, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#3E4A3D] text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 tabular-nums">
                    {idx + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 4. BÉNÉFICES & POSOLOGIE */}
        <section
          aria-labelledby="benefits-dosage-heading"
          className="bg-white rounded-3xl border border-[#E7DFD3] p-7 sm:p-10 shadow-xs space-y-8"
        >
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#3E4A3D]/80">
              <Check className="w-4 h-4 text-[#C8AB8A]" />
              <span>{copy.benefitsDosage.eyebrow}</span>
            </div>
            <h2
              id="benefits-dosage-heading"
              className="text-2xl sm:text-3xl font-extrabold text-[#1E2E25]"
            >
              {copy.benefitsDosage.heading}
            </h2>
          </div>

          {/* 4 Bénéfices */}
          <div className="space-y-4">
            <h3 className="text-lg font-extrabold text-[#1E2E25]">
              {copy.benefitsDosage.benefitsHeading}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {copy.benefitsDosage.benefitsList.map((b, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E7DFD3] flex items-start gap-3"
                >
                  <Check className="w-4 h-4 text-[#E8772E] shrink-0 mt-1" />
                  <div>
                    <p className="font-bold text-[#1E2E25] text-sm sm:text-base">
                      {b.title}
                    </p>
                    <p className="text-xs sm:text-sm text-[#3E4A3D] mt-1 leading-relaxed">
                      {b.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tableau Posologie */}
          <div className="space-y-4">
            <h3 className="text-lg font-extrabold text-[#1E2E25]">
              {copy.benefitsDosage.dosageHeading}
            </h3>
            <div className="w-full overflow-x-auto pb-2">
              <table className="w-full min-w-[680px] table-auto text-left border-collapse">
                <thead>
                  <tr className="border-b-2 border-[#3E4A3D]/20 bg-[#FAF7F2] text-xs font-extrabold uppercase tracking-wider text-[#1E2E25]">
                    <th className="py-3.5 px-4 min-w-[210px] whitespace-nowrap">
                      {copy.benefitsDosage.dosageHeaders.goal}
                    </th>
                    <th className="py-3.5 px-4 min-w-[260px] whitespace-nowrap">
                      {copy.benefitsDosage.dosageHeaders.dose}
                    </th>
                    <th className="py-3.5 px-4 min-w-[180px] whitespace-nowrap">
                      {copy.benefitsDosage.dosageHeaders.duration}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E7DFD3] text-sm text-[#3E4A3D]">
                  {copy.benefitsDosage.dosageRows.map((row, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-[#FAF7F2]/60 transition-colors"
                    >
                      <td className="py-4 px-4 font-bold text-[#1E2E25] align-top">
                        {row.goal}
                      </td>
                      <td className="py-4 px-4 font-semibold text-[#3E4A3D] tabular-nums align-top">
                        {row.dose}
                      </td>
                      <td className="py-4 px-4 font-bold text-[#E8772E] tabular-nums align-top">
                        {row.duration}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Chronobiologie */}
          <div className="rounded-2xl bg-[#FAF7F2] border border-[#E7DFD3] p-6 flex items-start gap-4">
            <Sun className="w-6 h-6 text-[#E8772E] shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h3 className="text-base sm:text-lg font-extrabold text-[#1E2E25] flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#3E4A3D]" />
                <span>{copy.benefitsDosage.chronoTitle}</span>
              </h3>
              <p className="text-sm text-[#3E4A3D] leading-relaxed">
                {copy.benefitsDosage.chronoBody}
              </p>
            </div>
          </div>
        </section>

        {/* 5. PRÉCAUTIONS, CONTRE-INDICATIONS ET VIGILANCE (CRUCIALE) */}
        <section
          aria-labelledby="precautions-phyco-heading"
          className="rounded-3xl bg-[#F5F0E6] border border-[#C8AB8A] p-7 sm:p-10 shadow-xs space-y-6"
        >
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.18em] text-[#9E6B64]">
              <AlertTriangle className="w-4 h-4" />
              <span>{copy.precautions.eyebrow}</span>
            </div>
            <h2
              id="precautions-phyco-heading"
              className="text-2xl sm:text-3xl font-extrabold text-[#1E2E25] flex items-center gap-2.5"
            >
              <ShieldAlert className="w-7 h-7 text-[#E8772E] shrink-0" />
              <span>{copy.precautions.heading}</span>
            </h2>
            <p className="text-sm sm:text-base text-[#3E4A3D] leading-relaxed">
              {copy.precautions.intro}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-2xl bg-white border border-[#C8AB8A]/70 p-6 space-y-3">
              <h3 className="text-base sm:text-lg font-extrabold text-[#1E2E25]">
                {copy.precautions.absTitle}
              </h3>
              <ul className="space-y-2 text-sm text-[#3E4A3D]">
                {copy.precautions.absList.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E8772E] shrink-0 mt-2" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl bg-white border border-[#C8AB8A]/70 p-6 space-y-3">
              <h3 className="text-base sm:text-lg font-extrabold text-[#1E2E25]">
                {copy.precautions.relTitle}
              </h3>
              <ul className="space-y-2 text-sm text-[#3E4A3D]">
                {copy.precautions.relList.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3E4A3D] shrink-0 mt-2" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="rounded-2xl bg-white border border-[#C8AB8A] p-6 flex items-start gap-3.5 text-sm text-[#3E4A3D] leading-relaxed">
            <ShieldCheck className="w-5 h-5 text-[#3E4A3D] shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#1E2E25] block mb-1">
                {copy.precautions.vigilanceTitle}
              </strong>
              <span>{copy.precautions.vigilanceBody}</span>
            </div>
          </div>
        </section>

        {/* 6. APPEL À L'ACTION (CTA) */}
        <section
          aria-labelledby="cta-phyco-heading"
          className="rounded-3xl bg-[#1E2E25] p-8 sm:p-12 text-white shadow-lg"
        >
          <div className="max-w-3xl space-y-5">
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#C8AB8A]">
              {copy.cta.eyebrow}
            </p>
            <h2
              id="cta-phyco-heading"
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
                href="/academie/reset-homeostasique/"
                onClick={(e) => handleLinkClick(e, 'phytotherapie-reset')}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full border border-white/25 hover:bg-white/10 !text-white font-semibold text-sm transition-colors"
              >
                {copy.cta.resetBtn}
              </a>

              <a
                href="/academie/protocoles/"
                onClick={(e) => handleLinkClick(e, 'protocoles')}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full border border-white/25 hover:bg-white/10 !text-white font-semibold text-sm transition-colors"
              >
                {copy.cta.protocolsBtn}
              </a>
            </div>
          </div>
        </section>
      </main>
    </article>
  );
}
