import React, { useState } from 'react';
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  BookOpen,
  Droplets,
  FlaskConical,
  Flower2,
  HeartHandshake,
  Leaf,
  MessageCircle,
  Moon,
  ShieldAlert,
  Sparkles,
  Thermometer,
} from 'lucide-react';
import { Language } from './translations';
import { View } from './types';
import AcademyNavigation from './components/AcademyNavigation';
import { WOMEN_ACADEMY_COPY } from './data/womenAcademyData';
import heroManuscriptImg from './assets/images/women_academy_hero_1795024413002.jpg';
import botanicalsStillLifeImg from './assets/images/women_academy_botanicals_1795024412743.jpg';

interface WomenAcademyProps {
  onNavigate: (view: View, param?: string) => void;
  lang?: Language;
}

export default function WomenAcademy({
  onNavigate,
  lang = 'fr',
}: WomenAcademyProps) {
  const copy = WOMEN_ACADEMY_COPY[lang] || WOMEN_ACADEMY_COPY.fr;
  const [activeSection, setActiveSection] = useState<string>('module-1');
  const [heroImgError, setHeroImgError] = useState(false);
  const [botanicalImgError, setBotanicalImgError] = useState(false);

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    if (typeof document !== 'undefined') {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
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

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: copy.heroTitle,
    description: copy.metaDescription,
    image: ['https://bloombybotanik.com/images/og/academie-pouvoir-cyclique-femme.jpg'],
    datePublished: '2026-11-18',
    dateModified: '2026-11-18',
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
    isAccessibleForFree: true,
    keywords:
      'manuscrit de Voynich femme, post-partum dépression naturelle, ménopause chute hormonale symptômes, sagesse féminine manuscrits hérétiques, biologie de la fécondation, plantes ménopause',
  };

  const moduleIcons = [
    <BookOpen key="book" className="w-5 h-5 text-[#3E4A3D]" />,
    <Flower2 key="flower" className="w-5 h-5 text-[#9E6B64]" />,
    <Droplets key="drop" className="w-5 h-5 text-[#3E4A3D]" />,
    <Moon key="moon" className="w-5 h-5 text-[#9E6B64]" />,
  ];

  return (
    <div className="min-h-screen bg-[#F9F6F0] text-[#1E2E25] pb-24">
      {/* Schema.org Open-Access Editorial Article JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      {/* Sticky Bloom Academy Top Navigation & Medical Notice */}
      <AcademyNavigation
        currentView="women-academy"
        onNavigate={onNavigate}
        currentPageTitle={copy.breadcrumbTitle}
        sectionName={copy.breadcrumbSection}
        lang={lang}
      />

      {/* Main Dossier Wrapper */}
      <article className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 space-y-14">
        {/* HERO HEADER */}
        <header className="space-y-8 border-b border-[#E7DFD3] pb-12">
          <div className="max-w-4xl space-y-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9E6B64]">
              {copy.kicker}
            </p>

            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#1E2E25] leading-[1.12] text-balance">
              {copy.heroTitle}
            </h1>

            <p className="text-base sm:text-lg text-[#3E4A3D] leading-relaxed max-w-3xl">
              {copy.heroSubtitle}
            </p>
          </div>

          {/* Editorial Pull Quote (Hairline top & bottom dividers, zero thick left bar) */}
          <blockquote className="py-5 border-y border-[#E7DFD3] max-w-3xl">
            <p className="text-lg sm:text-xl italic font-serif text-[#3E4A3D] leading-relaxed">
              {copy.heroQuote}
            </p>
          </blockquote>

          {/* Hero Editorial Image with Resilient Fallback */}
          <figure className="space-y-2.5">
            <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden bg-[#FAF7F2] border border-[#E7DFD3]">
              {!heroImgError ? (
                <img
                  src={heroManuscriptImg}
                  alt={copy.heroCaption}
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                  referrerPolicy="no-referrer"
                  onError={() => setHeroImgError(true)}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-[#F5F0E6] text-[#3E4A3D] space-y-3">
                  <BookOpen className="w-10 h-10 text-[#C8AB8A]" />
                  <p className="text-sm font-semibold max-w-md">{copy.heroTitle}</p>
                </div>
              )}
            </div>
            <figcaption className="text-xs italic text-[#3E4A3D]/80">
              {copy.heroCaption}
            </figcaption>
          </figure>

          {/* Educational Scope & Safety Banner */}
          <div className="p-5 sm:p-6 rounded-2xl bg-[#FAF7F2] border border-[#C8AB8A] flex items-start gap-3.5">
            <ShieldAlert className="w-5 h-5 text-[#9E6B64] shrink-0 mt-0.5" />
            <div className="space-y-1 text-xs sm:text-sm text-[#3E4A3D] leading-relaxed">
              <p className="font-bold text-[#1E2E25]">{copy.eduNoticeTitle}</p>
              <p>{copy.eduNoticeText}</p>
            </div>
          </div>

          {/* 4 INTERACTIVE MODULE OVERVIEW CARDS (Livre, Fleur, Goutte, Lune) */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            {copy.moduleCards.map((card, idx) => {
              const isSelected = activeSection === card.id;
              return (
                <button
                  key={card.id}
                  type="button"
                  onClick={() => scrollToSection(card.id)}
                  className={`text-left p-5 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between gap-4 ${
                    isSelected
                      ? 'bg-white border-[#3E4A3D] shadow-sm'
                      : 'bg-[#FAF7F2] border-[#E7DFD3] hover:bg-white hover:border-[#C8AB8A]'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="w-9 h-9 rounded-xl bg-[#F5F0E6] border border-[#E7DFD3] flex items-center justify-center shrink-0">
                        {moduleIcons[idx]}
                      </span>
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-[#9E6B64]">
                        {card.number}
                      </span>
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-sm sm:text-base font-bold text-[#1E2E25] leading-snug">
                        {card.title}
                      </h3>
                      <p className="text-xs text-[#3E4A3D]/85 leading-relaxed">
                        {card.subtitle}
                      </p>
                    </div>
                  </div>
                  <div className="pt-2.5 border-t border-[#E7DFD3] flex items-center justify-between text-[11px] font-semibold text-[#3E4A3D]">
                    <span className="truncate pr-2">{card.keyFocus}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#E8772E] shrink-0" />
                  </div>
                </button>
              );
            })}
          </div>
        </header>

        {/* MOBILE / TABLET CHAPTER NAVIGATION STRIP */}
        <nav
          aria-label={copy.tocTitle}
          className="xl:hidden flex items-center gap-2 overflow-x-auto pb-2"
        >
          {copy.tocItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollToSection(item.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap shrink-0 border transition-colors cursor-pointer ${
                activeSection === item.id
                  ? 'bg-[#3E4A3D] !text-white border-[#3E4A3D]'
                  : 'bg-white text-[#3E4A3D] border-[#E7DFD3] hover:border-[#C8AB8A]'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* ASYMMETRIC EDITORIAL CANVAS: Reading Column + Sticky TOC Sidebar */}
        <div className="grid xl:grid-cols-[minmax(0,1fr)_260px] gap-8 xl:gap-12 items-start">
          {/* MAIN READING COLUMN */}
          <div className="space-y-16 min-w-0">
            {/* ============================================================== */}
            {/* MODULE 1 : LES MANUSCRITS INTERDITS ET LA FEMME SACRÉE          */}
            {/* ============================================================== */}
            <section
              id="module-1"
              className="scroll-mt-24 space-y-8 pb-14 border-b border-[#E7DFD3]"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#9E6B64]">
                  <BookOpen className="w-4 h-4 text-[#9E6B64]" />
                  <span>{copy.m1Tag}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#1E2E25] leading-tight text-balance">
                  {copy.m1H2}
                </h2>
                <p className="text-sm font-semibold text-[#3E4A3D] bg-[#FAF7F2] border border-[#E7DFD3] rounded-xl px-4 py-3">
                  {copy.m1Objective}
                </p>
              </div>

              <p className="text-base text-[#1E2E25]/90 leading-[1.75]">
                {copy.m1Intro}
              </p>

              {/* 1. Voynich MS 408 */}
              <div className="p-6 sm:p-7 rounded-2xl bg-white border border-[#E7DFD3] space-y-4">
                <h3 className="text-lg sm:text-xl font-bold text-[#1E2E25]">
                  {copy.m1VoynichTitle}
                </h3>
                <p className="text-sm sm:text-base text-[#3E4A3D] leading-relaxed">
                  {copy.m1VoynichLead}
                </p>
                <ul className="space-y-3 pt-1">
                  {copy.m1VoynichBullets.map((b) => (
                    <li
                      key={b.title}
                      className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E7DFD3] space-y-1"
                    >
                      <p className="text-sm font-bold text-[#1E2E25]">{b.title}</p>
                      <p className="text-xs sm:text-sm text-[#3E4A3D] leading-relaxed">
                        {b.text}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 2. Trotula & 3. Hildegarde */}
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="p-6 rounded-2xl bg-white border border-[#E7DFD3] space-y-3">
                  <h3 className="text-lg font-bold text-[#1E2E25]">
                    {copy.m1TrotulaTitle}
                  </h3>
                  <p className="text-sm text-[#3E4A3D] leading-relaxed">
                    {copy.m1TrotulaText}
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-white border border-[#E7DFD3] space-y-3">
                  <h3 className="text-lg font-bold text-[#1E2E25]">
                    {copy.m1HildegardTitle}
                  </h3>
                  <p className="text-sm text-[#3E4A3D] leading-relaxed">
                    {copy.m1HildegardText}
                  </p>
                </div>
              </div>

              {/* Le Secret de la Nature */}
              <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#C8AB8A] space-y-2">
                <p className="text-sm font-bold text-[#1E2E25] flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#E8772E]" />
                  <span>{copy.m1SecretTitle}</span>
                </p>
                <p className="text-sm text-[#3E4A3D] leading-relaxed">
                  {copy.m1SecretText}
                </p>
              </div>

              {/* 4. Ayurveda & MTC */}
              <div className="space-y-2">
                <h3 className="text-lg sm:text-xl font-bold text-[#1E2E25]">
                  {copy.m1TraditionsTitle}
                </h3>
                <p className="text-sm sm:text-base text-[#3E4A3D] leading-relaxed">
                  {copy.m1TraditionsText}
                </p>
              </div>

              {/* Encadré Conseil BloomLab Module 1 */}
              <div className="p-6 rounded-2xl bg-[#F5F0E6] border border-[#C8AB8A] space-y-2.5">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#9E6B64]">
                  <FlaskConical className="w-4 h-4 text-[#9E6B64]" />
                  <span>{copy.m1TipTitle}</span>
                </div>
                <p className="text-sm text-[#1E2E25] leading-relaxed">
                  {copy.m1TipText}
                </p>
              </div>

              {/* Module 1 CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => onNavigate('guide-solvants')}
                  className="px-5 py-2.5 rounded-xl bg-[#3E4A3D] hover:bg-[#1E2E25] !text-white text-xs sm:text-sm font-semibold transition-colors inline-flex items-center gap-2 cursor-pointer"
                >
                  <span>{copy.m1CtaProtocols}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('chat')}
                  className="px-5 py-2.5 rounded-xl bg-white hover:bg-[#FAF7F2] text-[#3E4A3D] border border-[#C8AB8A] text-xs sm:text-sm font-semibold transition-colors inline-flex items-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-[#9E6B64]" />
                  <span>{copy.m1CtaCommunity}</span>
                </button>
              </div>
            </section>

            {/* ============================================================== */}
            {/* MODULE 2 : LA FÉCONDATION ET LA MÉTAMORPHOSE BIOLOGIQUE         */}
            {/* ============================================================== */}
            <section
              id="module-2"
              className="scroll-mt-24 space-y-8 pb-14 border-b border-[#E7DFD3]"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#9E6B64]">
                  <Flower2 className="w-4 h-4 text-[#9E6B64]" />
                  <span>{copy.m2Tag}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#1E2E25] leading-tight text-balance">
                  {copy.m2H2}
                </h2>
                <p className="text-sm font-semibold text-[#3E4A3D] bg-[#FAF7F2] border border-[#E7DFD3] rounded-xl px-4 py-3">
                  {copy.m2Objective}
                </p>
              </div>

              {/* 1. Choc des Galaxies */}
              <div className="space-y-2.5">
                <h3 className="text-lg sm:text-xl font-bold text-[#1E2E25]">
                  {copy.m2GalaxyTitle}
                </h3>
                <p className="text-sm sm:text-base text-[#3E4A3D] leading-[1.75]">
                  {copy.m2GalaxyText}
                </p>
              </div>

              {/* 2. Miracle Immunitaire */}
              <div className="p-6 sm:p-7 rounded-2xl bg-white border border-[#E7DFD3] space-y-4">
                <h3 className="text-lg sm:text-xl font-bold text-[#1E2E25]">
                  {copy.m2ImmuneTitle}
                </h3>
                <p className="text-sm sm:text-base text-[#3E4A3D] leading-relaxed">
                  {copy.m2ImmuneText}
                </p>
                <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E7DFD3] flex items-start gap-2.5">
                  <Leaf className="w-4 h-4 text-[#3E4A3D] shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-[#3E4A3D] leading-relaxed">
                    {copy.m2ImmuneNatureLink}
                  </p>
                </div>
              </div>

              {/* 3. Mommy Brain & Repères chiffrés */}
              <div className="space-y-4">
                <h3 className="text-lg sm:text-xl font-bold text-[#1E2E25]">
                  {copy.m2BrainTitle}
                </h3>
                <p className="text-sm sm:text-base text-[#3E4A3D] leading-[1.75]">
                  {copy.m2BrainText}
                </p>

                <div className="grid sm:grid-cols-3 gap-4 pt-2">
                  {copy.m2BioShifts.map((shift) => (
                    <div
                      key={shift.metric}
                      className="p-5 rounded-2xl bg-white border border-[#E7DFD3] space-y-1.5"
                    >
                      <p className="text-lg font-bold text-[#1E2E25] tabular-nums">
                        {shift.metric}
                      </p>
                      <p className="text-xs text-[#3E4A3D] leading-relaxed">
                        {shift.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Encadré Conseil BloomLab Module 2 */}
              <div className="p-6 rounded-2xl bg-[#F5F0E6] border border-[#C8AB8A] space-y-2.5">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#9E6B64]">
                  <ShieldAlert className="w-4 h-4 text-[#9E6B64]" />
                  <span>{copy.m2TipTitle}</span>
                </div>
                <p className="text-sm text-[#1E2E25] leading-relaxed">
                  {copy.m2TipText}
                </p>
              </div>

              {/* Module 2 CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => onNavigate('herbier')}
                  className="px-5 py-2.5 rounded-xl bg-[#3E4A3D] hover:bg-[#1E2E25] !text-white text-xs sm:text-sm font-semibold transition-colors inline-flex items-center gap-2 cursor-pointer"
                >
                  <span>{copy.m2CtaProtocols}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('chat')}
                  className="px-5 py-2.5 rounded-xl bg-white hover:bg-[#FAF7F2] text-[#3E4A3D] border border-[#C8AB8A] text-xs sm:text-sm font-semibold transition-colors inline-flex items-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-[#9E6B64]" />
                  <span>{copy.m2CtaCommunity}</span>
                </button>
              </div>
            </section>

            {/* ============================================================== */}
            {/* MODULE 3 : LE POST-PARTUM ET LA CHUTE HORMONALE                 */}
            {/* ============================================================== */}
            <section
              id="module-3"
              className="scroll-mt-24 space-y-8 pb-14 border-b border-[#E7DFD3]"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#9E6B64]">
                  <Droplets className="w-4 h-4 text-[#9E6B64]" />
                  <span>{copy.m3Tag}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#1E2E25] leading-tight text-balance">
                  {copy.m3H2}
                </h2>
                <p className="text-sm font-semibold text-[#3E4A3D] bg-[#FAF7F2] border border-[#E7DFD3] rounded-xl px-4 py-3">
                  {copy.m3Objective}
                </p>
              </div>

              {/* Métaphore de l'hiver biologique */}
              <div className="p-5 sm:p-6 rounded-2xl bg-[#1E2E25] !text-white">
                <p className="text-sm sm:text-base font-medium leading-relaxed !text-white">
                  {copy.m3WinterMetaphor}
                </p>
              </div>

              {/* 1. La Falaise Hormonale */}
              <div className="p-6 sm:p-7 rounded-2xl bg-white border border-[#E7DFD3] space-y-3">
                <h3 className="text-lg sm:text-xl font-bold text-[#1E2E25]">
                  {copy.m3CliffTitle}
                </h3>
                <p className="text-sm sm:text-base text-[#3E4A3D] leading-relaxed">
                  {copy.m3CliffText}
                </p>
                <p className="text-xs sm:text-sm text-[#1E2E25] bg-[#FAF7F2] border border-[#E7DFD3] rounded-xl px-4 py-3 leading-relaxed">
                  {copy.m3CliffSymptoms}
                </p>
              </div>

              {/* 2. DPP & Ocytocine / Cortisol + 3. Vol de la Prégnénolone */}
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="p-6 rounded-2xl bg-white border border-[#E7DFD3] space-y-3">
                  <h3 className="text-lg font-bold text-[#1E2E25]">
                    {copy.m3DppTitle}
                  </h3>
                  <p className="text-sm text-[#3E4A3D] leading-relaxed">
                    {copy.m3DppText}
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-white border border-[#E7DFD3] space-y-3">
                  <h3 className="text-lg font-bold text-[#1E2E25]">
                    {copy.m3StealTitle}
                  </h3>
                  <p className="text-sm text-[#3E4A3D] leading-relaxed">
                    {copy.m3StealText}
                  </p>
                </div>
              </div>

              {/* Botanical Still Life Photo */}
              <figure className="space-y-2">
                <div className="relative w-full aspect-[4/3] max-h-[420px] rounded-2xl overflow-hidden bg-[#FAF7F2] border border-[#E7DFD3]">
                  {!botanicalImgError ? (
                    <img
                      src={botanicalsStillLifeImg}
                      alt={copy.m3BotanicalCaption}
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer"
                      onError={() => setBotanicalImgError(true)}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-[#F5F0E6] text-[#3E4A3D] space-y-2">
                      <Leaf className="w-8 h-8 text-[#C8AB8A]" />
                      <p className="text-sm font-semibold">{copy.m3ProtocolTitle}</p>
                    </div>
                  )}
                </div>
                <figcaption className="text-xs italic text-[#3E4A3D]/80">
                  {copy.m3BotanicalCaption}
                </figcaption>
              </figure>

              {/* Protocole Post-Partum Table */}
              <div className="space-y-4">
                <h3 className="text-lg sm:text-xl font-bold text-[#1E2E25] flex items-center gap-2">
                  <Thermometer className="w-5 h-5 text-[#E8772E]" />
                  <span>{copy.m3ProtocolTitle}</span>
                </h3>

                <div className="w-full overflow-x-auto pb-2 rounded-2xl border border-[#E7DFD3] bg-white">
                  <table className="w-full min-w-[740px] table-auto text-left border-collapse">
                    <thead>
                      <tr className="border-b border-[#E7DFD3] bg-[#FAF7F2] text-xs font-bold uppercase tracking-wider text-[#3E4A3D]">
                        <th className="py-3.5 px-4 whitespace-nowrap">Plante</th>
                        <th className="py-3.5 px-4 whitespace-nowrap">Phase BloomLab</th>
                        <th className="py-3.5 px-4 whitespace-nowrap">Temp.</th>
                        <th className="py-3.5 px-4">Axe d'étude</th>
                        <th className="py-3.5 px-4">Vigilance &amp; Précautions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E7DFD3] text-xs sm:text-sm">
                      {copy.m3Plants.map((row) => (
                        <tr key={row.plant} className="hover:bg-[#FAF7F2]/60 transition-colors">
                          <td className="py-4 px-4 font-bold text-[#1E2E25] align-top">
                            {row.plant}
                          </td>
                          <td className="py-4 px-4 text-[#3E4A3D] align-top">
                            <div className="font-semibold">{row.phase}</div>
                            <div className="text-xs text-[#3E4A3D]/75">{row.solvent}</div>
                          </td>
                          <td className="py-4 px-4 font-mono font-bold text-[#E8772E] whitespace-nowrap tabular-nums align-top">
                            {row.temp}
                          </td>
                          <td className="py-4 px-4 text-[#3E4A3D] leading-relaxed align-top">
                            {row.target}
                          </td>
                          <td className="py-4 px-4 text-[#9E6B64] font-medium leading-relaxed align-top">
                            {row.vigilance}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Encadré Conseil BloomLab Module 3 */}
              <div className="p-6 rounded-2xl bg-[#F5F0E6] border border-[#C8AB8A] space-y-2.5">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#9E6B64]">
                  <FlaskConical className="w-4 h-4 text-[#9E6B64]" />
                  <span>{copy.m3TipTitle}</span>
                </div>
                <p className="text-sm text-[#1E2E25] leading-relaxed">
                  {copy.m3TipText}
                </p>
              </div>

              {/* Encadré Sécurité DPP */}
              <div className="p-5 rounded-2xl bg-white border border-[#9E6B64]/50 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-[#9E6B64] shrink-0 mt-0.5" />
                <div className="space-y-1 text-xs sm:text-sm text-[#3E4A3D] leading-relaxed">
                  <p className="font-bold text-[#1E2E25]">{copy.m3SafetyTitle}</p>
                  <p>{copy.m3SafetyText}</p>
                </div>
              </div>

              {/* Module 3 CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => onNavigate('protocoles')}
                  className="px-5 py-2.5 rounded-xl bg-[#3E4A3D] hover:bg-[#1E2E25] !text-white text-xs sm:text-sm font-semibold transition-colors inline-flex items-center gap-2 cursor-pointer"
                >
                  <span>{copy.m3CtaProtocols}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('chat')}
                  className="px-5 py-2.5 rounded-xl bg-white hover:bg-[#FAF7F2] text-[#3E4A3D] border border-[#C8AB8A] text-xs sm:text-sm font-semibold transition-colors inline-flex items-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-[#9E6B64]" />
                  <span>{copy.m3CtaCommunity}</span>
                </button>
              </div>
            </section>

            {/* ============================================================== */}
            {/* MODULE 4 : PÉRÉMÉNOPAUSE, MÉNOPAUSE & PASSAGE VERS LA SAGESSE   */}
            {/* ============================================================== */}
            <section
              id="module-4"
              className="scroll-mt-24 space-y-8 pb-14 border-b border-[#E7DFD3]"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#9E6B64]">
                  <Moon className="w-4 h-4 text-[#9E6B64]" />
                  <span>{copy.m4Tag}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#1E2E25] leading-tight text-balance">
                  {copy.m4H2}
                </h2>
                <p className="text-sm font-semibold text-[#3E4A3D] bg-[#FAF7F2] border border-[#E7DFD3] rounded-xl px-4 py-3">
                  {copy.m4Objective}
                </p>
              </div>

              {/* 1. Péréménopause */}
              <div className="p-6 sm:p-7 rounded-2xl bg-white border border-[#E7DFD3] space-y-3">
                <h3 className="text-lg sm:text-xl font-bold text-[#1E2E25]">
                  {copy.m4PeriTitle}
                </h3>
                <p className="text-sm sm:text-base text-[#3E4A3D] leading-relaxed">
                  {copy.m4PeriText}
                </p>
              </div>

              {/* 2. Ménopause : MTC, Neurobiologie & Impacts physiques */}
              <div className="space-y-5">
                <h3 className="text-lg sm:text-xl font-bold text-[#1E2E25]">
                  {copy.m4MenoTitle}
                </h3>
                <p className="text-sm sm:text-base text-[#3E4A3D] leading-relaxed">
                  {copy.m4MenoTcm}
                </p>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="p-6 rounded-2xl bg-white border border-[#E7DFD3] space-y-2.5">
                    <h4 className="text-base font-bold text-[#1E2E25]">
                      {copy.m4NeuroTitle}
                    </h4>
                    <p className="text-sm text-[#3E4A3D] leading-relaxed">
                      {copy.m4NeuroText}
                    </p>
                  </div>

                  <div className="p-6 rounded-2xl bg-white border border-[#E7DFD3] space-y-2.5">
                    <h4 className="text-base font-bold text-[#1E2E25]">
                      {copy.m4PhysicalTitle}
                    </h4>
                    <ul className="space-y-2 text-xs sm:text-sm text-[#3E4A3D] leading-relaxed list-disc pl-4">
                      {copy.m4PhysicalList.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Vol de la Prégnénolone en Ménopause */}
                <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E7DFD3] text-sm text-[#3E4A3D] leading-relaxed">
                  {copy.m4StealRecall}
                </div>
              </div>

              {/* 3. La Femme Sage */}
              <div className="p-6 sm:p-7 rounded-2xl bg-white border border-[#C8AB8A] space-y-2.5">
                <h3 className="text-lg sm:text-xl font-bold text-[#1E2E25] flex items-center gap-2">
                  <Moon className="w-5 h-5 text-[#9E6B64]" />
                  <span>{copy.m4SageTitle}</span>
                </h3>
                <p className="text-sm sm:text-base text-[#3E4A3D] leading-relaxed">
                  {copy.m4SageText}
                </p>
              </div>

              {/* Plantes Clés de la Transition */}
              <div className="space-y-4">
                <h3 className="text-lg sm:text-xl font-bold text-[#1E2E25] flex items-center gap-2">
                  <Leaf className="w-5 h-5 text-[#3E4A3D]" />
                  <span>{copy.m4ProtocolTitle}</span>
                </h3>

                <div className="w-full overflow-x-auto pb-2 rounded-2xl border border-[#E7DFD3] bg-white">
                  <table className="w-full min-w-[760px] table-auto text-left border-collapse">
                    <thead>
                      <tr className="border-b border-[#E7DFD3] bg-[#FAF7F2] text-xs font-bold uppercase tracking-wider text-[#3E4A3D]">
                        <th className="py-3.5 px-4 whitespace-nowrap">Plante</th>
                        <th className="py-3.5 px-4 whitespace-nowrap">Phase BloomLab</th>
                        <th className="py-3.5 px-4 whitespace-nowrap">Temp.</th>
                        <th className="py-3.5 px-4">Terrain &amp; Objectif</th>
                        <th className="py-3.5 px-4">Vigilance &amp; Contre-indications</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E7DFD3] text-xs sm:text-sm">
                      {copy.m4Plants.map((row) => (
                        <tr key={row.plant} className="hover:bg-[#FAF7F2]/60 transition-colors">
                          <td className="py-4 px-4 font-bold text-[#1E2E25] align-top">
                            {row.plant}
                          </td>
                          <td className="py-4 px-4 text-[#3E4A3D] align-top">
                            <div className="font-semibold">{row.phase}</div>
                            <div className="text-xs text-[#3E4A3D]/75">{row.solvent}</div>
                          </td>
                          <td className="py-4 px-4 font-mono font-bold text-[#E8772E] whitespace-nowrap tabular-nums align-top">
                            {row.temp}
                          </td>
                          <td className="py-4 px-4 text-[#3E4A3D] leading-relaxed align-top">
                            {row.target}
                          </td>
                          <td className="py-4 px-4 text-[#9E6B64] font-medium leading-relaxed align-top">
                            {row.vigilance}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Encadré Conseil BloomLab Module 4 : Sauge sans thuyone */}
              <div className="p-6 rounded-2xl bg-[#F5F0E6] border border-[#C8AB8A] space-y-2.5">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#9E6B64]">
                  <FlaskConical className="w-4 h-4 text-[#9E6B64]" />
                  <span>{copy.m4TipTitle}</span>
                </div>
                <p className="text-sm text-[#1E2E25] leading-relaxed">
                  {copy.m4TipText}
                </p>
              </div>

              {/* Précaution Phytoestrogènes */}
              <div className="p-5 rounded-2xl bg-white border border-[#E7DFD3] flex items-start gap-3">
                <ShieldAlert className="w-5 h-5 text-[#9E6B64] shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm text-[#3E4A3D] leading-relaxed">
                  {copy.m4SafetyText}
                </p>
              </div>

              {/* Module 4 CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => onNavigate('phytotherapie-reset')}
                  className="px-5 py-2.5 rounded-xl bg-[#3E4A3D] hover:bg-[#1E2E25] !text-white text-xs sm:text-sm font-semibold transition-colors inline-flex items-center gap-2 cursor-pointer"
                >
                  <span>{copy.m4CtaProtocols}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('chat')}
                  className="px-5 py-2.5 rounded-xl bg-white hover:bg-[#FAF7F2] text-[#3E4A3D] border border-[#C8AB8A] text-xs sm:text-sm font-semibold transition-colors inline-flex items-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-[#9E6B64]" />
                  <span>{copy.m4CtaCommunity}</span>
                </button>
              </div>
            </section>

            {/* ============================================================== */}
            {/* CONCLUSION & SYNTHÈSE BLOOM ACADEMY                            */}
            {/* ============================================================== */}
            <section
              id="conclusion"
              className="scroll-mt-24 p-7 sm:p-10 rounded-3xl bg-[#0F261E] text-[#F9F6F0] space-y-6 shadow-lg"
            >
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#C8AB8A]">
                <HeartHandshake className="w-4 h-4 text-[#C8AB8A]" />
                <span>Synthèse · Bloom Academy</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold !text-white leading-tight text-balance">
                {copy.concTitle}
              </h2>

              <div className="space-y-4 text-sm sm:text-base !text-white leading-relaxed">
                <p className="!text-white">{copy.concP1}</p>
                <p className="!text-white">{copy.concP2}</p>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href="/bloomlab/"
                  onClick={(e) => handleLinkClick(e, 'machine')}
                  className="px-6 py-3 rounded-xl bg-[#E8772E] hover:bg-[#D4651F] !text-white text-xs sm:text-sm font-bold transition-colors inline-flex items-center gap-2"
                >
                  <span>{copy.concCtaMachine}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <a
                  href="/academie/protocoles/"
                  onClick={(e) => handleLinkClick(e, 'protocoles')}
                  className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 !text-white border border-white/20 text-xs sm:text-sm font-semibold transition-colors inline-flex items-center gap-2"
                >
                  <Activity className="w-4 h-4 text-[#C8AB8A]" />
                  <span>{copy.concCtaProtocols}</span>
                </a>

                <button
                  type="button"
                  onClick={() => onNavigate('chat')}
                  className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 !text-white border border-white/20 text-xs sm:text-sm font-semibold transition-colors inline-flex items-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-[#C8AB8A]" />
                  <span>{copy.concCtaAlma}</span>
                </button>
              </div>
            </section>
          </div>

          {/* RIGHT STICKY LATERAL MODULE INDEX (Desktop lg+) */}
          <aside className="hidden xl:block sticky top-28 space-y-6">
            <div className="p-5 rounded-2xl bg-white border border-[#E7DFD3] space-y-4">
              <p className="text-xs font-bold uppercase tracking-widest text-[#9E6B64]">
                {copy.tocTitle}
              </p>

              <nav aria-label={copy.tocTitle} className="space-y-1.5">
                {copy.tocItems.map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => scrollToSection(item.id)}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                        isActive
                          ? 'bg-[#3E4A3D] !text-white'
                          : 'text-[#3E4A3D] hover:bg-[#FAF7F2]'
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </nav>

              <div className="pt-4 border-t border-[#E7DFD3] space-y-2.5">
                <p className="text-xs font-semibold text-[#1E2E25]">
                  Accès libre &amp; gratuit
                </p>
                <p className="text-xs text-[#3E4A3D]/85 leading-relaxed">
                  Dossier en lecture ouverte au sein de la Bloom Academy.
                </p>
                <button
                  type="button"
                  onClick={() => onNavigate('academie')}
                  className="w-full py-2 px-3 rounded-xl bg-[#FAF7F2] hover:bg-[#F5F0E6] text-[#3E4A3D] border border-[#E7DFD3] text-xs font-semibold transition-colors cursor-pointer text-center"
                >
                  Retour à Bloom Academy
                </button>
              </div>
            </div>
          </aside>
        </div>
      </article>
    </div>
  );
}
