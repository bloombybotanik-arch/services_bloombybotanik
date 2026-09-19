import React, { useState } from 'react';
import { 
  Thermometer, 
  Clock, 
  Droplets, 
  Leaf, 
  ShieldCheck, 
  ArrowRight, 
  Check, 
  Sparkles, 
  AlertCircle, 
  ChevronDown, 
  Layers, 
  FlaskConical,
  Filter,
  CheckCircle2
} from 'lucide-react';
import { Language } from './translations';
import { TooltipLexique } from './components/TooltipLexique';
import { pillarInfusionTranslations } from './data/pillarInfusionTranslations';

interface PillarInfusionProps {
  lang: Language;
  onNavigate: (view: any, param?: string) => void;
}

export default function PillarInfusion({ lang, onNavigate }: PillarInfusionProps) {
  const t = pillarInfusionTranslations[lang] || pillarInfusionTranslations.fr;
  const isFR = lang === 'fr';
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, view: string, param?: string) => {
    e.preventDefault();
    onNavigate(view, param);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="bg-[#FAF7F2] text-[#0F261E] min-h-screen">
      {/* SECTION 0 — EN-TÊTE & INTRODUCTION */}
      <header className="relative bg-[#1C3F34] text-white pt-12 pb-16 md:pt-16 md:pb-24 overflow-hidden border-b border-white/10">
        <div className="max-w-5xl mx-auto px-6">
          {/* Fil d'Ariane */}
          <nav aria-label="Fil d'Ariane" className="mb-6">
            <ol className="flex items-center space-x-2 text-xs text-white/70">
              <li>
                <a 
                  href={lang === 'fr' ? '/' : `/${lang}/`} 
                  onClick={(e) => handleLinkClick(e, 'home')}
                  className="hover:text-white transition-colors"
                >
                  {t.meta.breadcrumbHome}
                </a>
              </li>
              <li><span className="text-white/40">/</span></li>
              <li className="text-[#D97706] font-medium" aria-current="page">
                {t.meta.breadcrumbCurrent}
              </li>
            </ol>
          </nav>

          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white/90 text-xs font-semibold tracking-wider uppercase border border-white/15">
                <Leaf className="w-3.5 h-3.5 text-[#D97706]" />
                {t.meta.badge}
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight font-sans">
                {t.meta.h1}
              </h1>

              <div className="space-y-4 text-white/85 text-base sm:text-lg leading-relaxed">
                <p>{t.meta.p1}</p>
                <p>{t.meta.p2}</p>
                <p className="text-xs sm:text-sm text-white/70 bg-white/5 p-3 rounded-xl border border-white/10">
                  {t.meta.legalNotice}
                </p>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href={lang === 'fr' ? '/bloomlab/' : `/${lang}/bloomlab/`}
                  onClick={(e) => handleLinkClick(e, 'machine')}
                  id="hero-cta-bloomlab"
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#D97706] hover:bg-[#b45309] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all"
                >
                  <span>{t.meta.ctaBloomLab}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href={lang === 'fr' ? '/recettes-gratuites/' : `/${lang}/recettes/`}
                  onClick={(e) => handleLinkClick(e, 'recettes-gratuites')}
                  id="hero-cta-recettes"
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 transition-all"
                >
                  <span>{t.meta.ctaRecipes}</span>
                </a>
              </div>
            </div>

            {/* Image principale LCP */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/20 bg-white/5 aspect-[16/10]">
                <img
                  src="/img/produit/bloomlab-cuisine-1200x630.jpg"
                  alt={t.meta.h1}
                  width={1200}
                  height={630}
                  decoding="async"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 right-3 text-xs text-white/90 bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/10">
                  {t.meta.imgLegend}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* CONTENU PRINCIPAL ÉDITORIAL */}
      <div className="max-w-4xl mx-auto px-6 py-12 md:py-16 space-y-16 sm:space-y-20">

        {/* SECTION 1 — COMPRENDRE L’INFUSION BOTANIQUE */}
        <section id="comprendre-infusion-botanique" className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D97706]">{t.section1.badge}</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0F261E] tracking-tight">
              {t.section1.title}
            </h2>
          </div>

          <div className="prose prose-slate max-w-none text-[#1C3F34]/90 leading-relaxed space-y-4">
            <p>{t.section1.p1}</p>
            <p>{t.section1.p2Intro}</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>{t.section1.infusionTitle} </strong>
                {t.section1.infusionText}
              </li>
              <li>
                <strong>{t.section1.decoctionTitle} </strong>
                {t.section1.decoctionText}
              </li>
            </ul>
            <p>{t.section1.p3}</p>
          </div>

          <div className="bg-[#1C3F34]/5 border-l-4 border-[#1C3F34] p-5 rounded-r-2xl space-y-1 text-sm text-[#0F261E]">
            <p className="font-semibold text-[#1C3F34]">{t.section1.calloutTitle}</p>
            <p className="italic leading-relaxed">{t.section1.calloutText}</p>
          </div>
        </section>

        {/* SECTION 2 — POURQUOI LES PARAMÈTRES COMPTENT */}
        <section id="pourquoi-parametres" className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D97706]">{t.section2.badge}</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0F261E] tracking-tight">
              {t.section2.title}
            </h2>
          </div>

          <p className="text-[#1C3F34]/90 leading-relaxed">{t.section2.intro}</p>

          <div className="grid sm:grid-cols-2 gap-5">
            <div className="bg-white p-5 rounded-2xl border border-[#0F261E]/10 shadow-xs space-y-2">
              <div className="flex items-center gap-2 text-[#D97706] font-bold text-sm">
                <Thermometer className="w-4 h-4" />
                <span>{t.section2.tempTitle}</span>
              </div>
              <p className="text-sm text-[#1C3F34]/85 leading-relaxed">{t.section2.tempText}</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#0F261E]/10 shadow-xs space-y-2">
              <div className="flex items-center gap-2 text-[#D97706] font-bold text-sm">
                <Clock className="w-4 h-4" />
                <span>{t.section2.timeTitle}</span>
              </div>
              <p className="text-sm text-[#1C3F34]/85 leading-relaxed">{t.section2.timeText}</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#0F261E]/10 shadow-xs space-y-2">
              <div className="flex items-center gap-2 text-[#D97706] font-bold text-sm">
                <Sparkles className="w-4 h-4" />
                <span>{t.section2.agitationTitle}</span>
              </div>
              <p className="text-sm text-[#1C3F34]/85 leading-relaxed">{t.section2.agitationText}</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#0F261E]/10 shadow-xs space-y-2">
              <div className="flex items-center gap-2 text-[#D97706] font-bold text-sm">
                <Layers className="w-4 h-4" />
                <span>{t.section2.ratioTitle}</span>
              </div>
              <p className="text-sm text-[#1C3F34]/85 leading-relaxed">{t.section2.ratioText}</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#0F261E]/10 text-sm text-[#1C3F34]/90 italic">
            {t.section2.callout}
          </div>
        </section>

        {/* SECTION 3 — INFUSION, DÉCOCTION, MACÉRATION */}
        <section id="differences-methodes" className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D97706]">{t.section3.badge}</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0F261E] tracking-tight">
              {t.section3.title}
            </h2>
          </div>

          <p className="text-[#1C3F34]/90 leading-relaxed">{t.section3.intro}</p>

          <div className="grid md:grid-cols-3 gap-5">
            {/* Infusion Card */}
            <div className="bg-white p-6 rounded-2xl border border-[#0F261E]/10 space-y-4 shadow-xs">
              <h3 className="text-lg font-bold text-[#1C3F34] flex items-center gap-2">
                <Leaf className="w-5 h-5 text-[#D97706]" />
                <span>{t.section3.infusion.title}</span>
              </h3>
              <p className="text-xs text-[#0F261E]/80 leading-relaxed">{t.section3.infusion.desc}</p>
              <ul className="text-xs space-y-2 border-t border-[#0F261E]/5 pt-3 text-[#1C3F34]/85">
                <li><strong>{isFR ? 'Température :' : lang === 'de' ? 'Temperatur:' : 'Temperature:'}</strong> {t.section3.infusion.temp}</li>
                <li><strong>{isFR ? 'Durée :' : lang === 'de' ? 'Dauer:' : 'Duration:'}</strong> {t.section3.infusion.duration}</li>
                <li><strong>{isFR ? 'Parties :' : lang === 'de' ? 'Teile:' : 'Parts:'}</strong> {t.section3.infusion.parts}</li>
                <li><strong>{isFR ? 'Cible :' : lang === 'de' ? 'Ziel:' : 'Target:'}</strong> {t.section3.infusion.target}</li>
              </ul>
            </div>

            {/* Décoction Card */}
            <div className="bg-white p-6 rounded-2xl border border-[#0F261E]/10 space-y-4 shadow-xs">
              <h3 className="text-lg font-bold text-[#1C3F34] flex items-center gap-2">
                <FlaskConical className="w-5 h-5 text-[#D97706]" />
                <span>{t.section3.decoction.title}</span>
              </h3>
              <p className="text-xs text-[#0F261E]/80 leading-relaxed">{t.section3.decoction.desc}</p>
              <ul className="text-xs space-y-2 border-t border-[#0F261E]/5 pt-3 text-[#1C3F34]/85">
                <li><strong>{isFR ? 'Température :' : lang === 'de' ? 'Temperatur:' : 'Temperature:'}</strong> {t.section3.decoction.temp}</li>
                <li><strong>{isFR ? 'Durée :' : lang === 'de' ? 'Dauer:' : 'Duration:'}</strong> {t.section3.decoction.duration}</li>
                <li><strong>{isFR ? 'Parties :' : lang === 'de' ? 'Teile:' : 'Parts:'}</strong> {t.section3.decoction.parts}</li>
                <li><strong>{isFR ? 'Cible :' : lang === 'de' ? 'Ziel:' : 'Target:'}</strong> {t.section3.decoction.target}</li>
              </ul>
            </div>

            {/* Macération Card */}
            <div className="bg-white p-6 rounded-2xl border border-[#0F261E]/10 space-y-4 shadow-xs">
              <h3 className="text-lg font-bold text-[#1C3F34] flex items-center gap-2">
                <Droplets className="w-5 h-5 text-[#D97706]" />
                <span>{t.section3.maceration.title}</span>
              </h3>
              <p className="text-xs text-[#0F261E]/80 leading-relaxed">{t.section3.maceration.desc}</p>
              <ul className="text-xs space-y-2 border-t border-[#0F261E]/5 pt-3 text-[#1C3F34]/85">
                <li><strong>{isFR ? 'Température :' : lang === 'de' ? 'Temperatur:' : 'Temperature:'}</strong> {t.section3.maceration.temp}</li>
                <li><strong>{isFR ? 'Durée :' : lang === 'de' ? 'Dauer:' : 'Duration:'}</strong> {t.section3.maceration.duration}</li>
                <li><strong>{isFR ? 'Parties :' : lang === 'de' ? 'Teile:' : 'Parts:'}</strong> {t.section3.maceration.parts}</li>
                <li><strong>{isFR ? 'Cible :' : lang === 'de' ? 'Ziel:' : 'Target:'}</strong> {t.section3.maceration.target}</li>
              </ul>
            </div>
          </div>

          <div className="bg-[#1C3F34]/5 border-l-4 border-[#1C3F34] p-5 rounded-r-2xl space-y-1 text-sm text-[#0F261E]">
            <p className="font-semibold text-[#1C3F34]">{t.section3.synthesisTitle}</p>
            <p className="italic leading-relaxed">{t.section3.synthesisText}</p>
          </div>
        </section>

        {/* SECTION 4 — LA DÉMARCHE BLOOM */}
        <section id="demarche-bloom" className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D97706]">{t.section4.badge}</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0F261E] tracking-tight">
              {t.section4.title}
            </h2>
          </div>

          <p className="text-[#1C3F34]/90 leading-relaxed">{t.section4.intro}</p>

          <div className="grid sm:grid-cols-3 gap-5">
            {t.section4.steps.map((step) => (
              <div key={step.num} className="bg-white p-5 rounded-2xl border border-[#0F261E]/10 space-y-2 shadow-xs">
                <div className="w-8 h-8 rounded-full bg-[#1C3F34] text-white flex items-center justify-center font-bold text-sm">
                  {step.num}
                </div>
                <h3 className="font-bold text-base text-[#1C3F34]">{step.title}</h3>
                <p className="text-xs text-[#0F261E]/80 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>

          <p className="text-sm sm:text-base text-[#1C3F34]/90 leading-relaxed bg-[#FAF7F2] p-5 rounded-2xl border border-[#0F261E]/10 italic">
            {t.section4.quote}
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-semibold">
            <span className="text-[#0F261E]/70">{t.section4.linksTitle}</span>
            {t.section4.links.map((link, idx) => (
              <React.Fragment key={link.view}>
                {idx > 0 && <span>•</span>}
                <a 
                  href={`/${lang === 'fr' ? '' : lang + '/'}${link.view}/`} 
                  onClick={(e) => handleLinkClick(e, link.view)}
                  className="inline-flex items-center gap-1 text-[#1C3F34] underline hover:text-[#D97706]"
                >
                  {link.label}
                </a>
              </React.Fragment>
            ))}
          </div>
        </section>

        {/* SECTION 5 — BLOOMLAB */}
        <section id="decouvrir-bloomlab" className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-[#0F261E]/10 shadow-sm space-y-8">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D97706]">{t.section5.badge}</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0F261E] tracking-tight">
              {t.section5.title}
            </h2>
          </div>

          <div className="grid md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-7 space-y-4 text-sm text-[#1C3F34]/90 leading-relaxed">
              <p>{t.section5.intro}</p>
              <ul className="space-y-2 list-disc pl-5">
                {t.section5.features.map((feat, idx) => (
                  <li key={idx}>
                    <strong>{feat.title}</strong> {feat.desc}
                  </li>
                ))}
              </ul>
              <p className="italic text-[#0F261E] font-medium pt-1">{t.section5.quote}</p>
            </div>

            <div className="md:col-span-5">
              <div className="rounded-2xl overflow-hidden border border-[#0F261E]/10 shadow-sm aspect-square bg-[#FAF7F2]">
                <img
                  src="/img/produit/bloomlab-face-1200x1200.jpg"
                  alt="BloomLab"
                  width={600}
                  height={600}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          <div className="bg-[#FAF7F2] p-5 sm:p-6 rounded-2xl border border-[#0F261E]/10 space-y-3">
            <h3 className="font-bold text-sm sm:text-base text-[#1C3F34] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#D97706]" />
              <span>{t.section5.limitsTitle}</span>
            </h3>
            <ul className="text-xs sm:text-sm text-[#0F261E]/80 space-y-1.5 list-disc pl-5 leading-relaxed">
              {t.section5.limits.map((limit, idx) => (
                <li key={idx}>{limit}</li>
              ))}
            </ul>
          </div>

          <div className="pt-2">
            <a
              href={lang === 'fr' ? '/bloomlab/' : `/${lang}/bloomlab/`}
              onClick={(e) => handleLinkClick(e, 'machine')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1C3F34] text-white text-sm font-bold hover:bg-[#0F261E] transition-all"
            >
              <span>{t.section5.cta}</span>
              <ArrowRight className="w-4 h-4 text-[#D97706]" />
            </a>
          </div>
        </section>

        {/* SECTION 6 — COMPARATIF BAIN-MARIE VS BLOOMLAB */}
        <section id="comparatif-bain-marie" className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D97706]">{t.section6.badge}</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0F261E] tracking-tight">
              {t.section6.title}
            </h2>
          </div>

          <p className="text-[#1C3F34]/90 leading-relaxed">{t.section6.intro}</p>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse bg-white rounded-2xl overflow-hidden border border-[#0F261E]/10 shadow-xs">
              <thead>
                <tr className="bg-[#1C3F34] text-white text-xs uppercase tracking-wider">
                  <th className="p-4 font-bold">{t.section6.table.headers.criterion}</th>
                  <th className="p-4 font-bold">{t.section6.table.headers.traditional}</th>
                  <th className="p-4 font-bold bg-[#D97706] text-white">{t.section6.table.headers.bloomlab}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#0F261E]/10 text-xs sm:text-sm text-[#0F261E]/90">
                {t.section6.table.rows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-[#FAF7F2]/60 transition-colors">
                    <td className="p-4 font-bold text-[#1C3F34]">{row.criterion}</td>
                    <td className="p-4 text-[#0F261E]/75">{row.traditional}</td>
                    <td className="p-4 font-medium text-[#1C3F34] bg-[#D97706]/5">{row.bloomlab}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-xs text-[#0F261E]/60 italic">{t.section6.footnote}</p>
        </section>

        {/* SECTION 7 — QUELS SOLVANTS UTILISER ? */}
        <section id="solvants-botaniques" className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D97706]">{t.section7.badge}</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0F261E] tracking-tight">
              {t.section7.title}
            </h2>
          </div>

          <p className="text-[#1C3F34]/90 leading-relaxed">{t.section7.intro}</p>

          <div className="grid md:grid-cols-3 gap-5">
            {t.section7.solvents.map((solv, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-[#0F261E]/10 space-y-3 shadow-xs flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-base text-[#1C3F34]">{solv.title}</h3>
                  <span className="inline-block text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#1C3F34]/5 text-[#1C3F34] mt-1 mb-2">
                    {solv.polarity}
                  </span>
                  <p className="text-xs text-[#0F261E]/80 leading-relaxed">{solv.desc}</p>
                </div>
                <div className="border-t border-[#0F261E]/5 pt-3 text-xs space-y-1 text-[#1C3F34]/85">
                  <p><strong>{isFR ? 'Affinité :' : lang === 'de' ? 'Affinität:' : 'Affinity:'}</strong> {solv.affinity}</p>
                  <p><strong>{isFR ? 'Exemples :' : lang === 'de' ? 'Beispiele:' : 'Examples:'}</strong> {solv.examples}</p>
                  <p><strong>{isFR ? 'Conservation :' : lang === 'de' ? 'Haltbarkeit:' : 'Shelf life:'}</strong> {solv.shelfLife}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-[#FAF7F2] p-4 rounded-xl border border-[#0F261E]/10 text-xs text-[#0F261E]/85">
            <strong className="text-[#1C3F34]">{t.section7.precautionTitle}</strong> {t.section7.precautionText}
          </div>
        </section>

        {/* SECTION 8 — EXEMPLES DE PRÉPARATIONS */}
        <section id="exemples-recettes" className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D97706]">{t.section8.badge}</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0F261E] tracking-tight">
              {t.section8.title}
            </h2>
          </div>

          <p className="text-[#1C3F34]/90 leading-relaxed">{t.section8.intro}</p>

          <div className="space-y-6">
            {t.section8.recipes.map((rec) => (
              <div key={rec.num} className="bg-white p-6 sm:p-8 rounded-3xl border border-[#0F261E]/10 shadow-xs space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#0F261E]/5 pb-3">
                  <h3 className="font-bold text-lg text-[#1C3F34] flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#D97706] text-white flex items-center justify-center text-xs font-bold">{rec.num}</span>
                    <span>{rec.title}</span>
                  </h3>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#D97706] bg-[#D97706]/10 px-2.5 py-1 rounded-full">
                    {rec.category}
                  </span>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                  <div>
                    <span className="font-bold text-[#1C3F34]">{isFR ? 'Ingrédients :' : lang === 'de' ? 'Zutaten:' : 'Ingredients:'}</span>
                    <p className="text-[#0F261E]/80 mt-1">{rec.ingredients}</p>
                  </div>
                  <div>
                    <span className="font-bold text-[#1C3F34]">{isFR ? 'Paramètres :' : lang === 'de' ? 'Parameter:' : 'Parameters:'}</span>
                    <p className="text-[#0F261E]/80 mt-1">{rec.parameters}</p>
                  </div>
                </div>

                <div>
                  <span className="font-bold text-xs sm:text-sm text-[#1C3F34]">{isFR ? 'Protocole pas à pas :' : lang === 'de' ? 'Schritt-für-Schritt:' : 'Step-by-step protocol:'}</span>
                  <ol className="list-decimal pl-5 space-y-1 text-xs sm:text-sm text-[#0F261E]/80 mt-1">
                    {rec.steps.map((st, sidx) => (
                      <li key={sidx}>{st}</li>
                    ))}
                  </ol>
                </div>

                <div className="bg-[#FAF7F2] p-3 rounded-xl flex flex-wrap items-center justify-between gap-2 text-xs text-[#0F261E]/85">
                  <span><strong>{isFR ? 'Conservation :' : lang === 'de' ? 'Haltbarkeit:' : 'Shelf life:'}</strong> {rec.shelfLife}</span>
                  <span className="text-amber-800"><strong>{isFR ? 'Précautions :' : lang === 'de' ? 'Hinweis:' : 'Precaution:'}</strong> {rec.safety}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 9 — PRÉCAUTIONS ET SÉCURITÉ */}
        <section id="securite-bonnes-pratiques" className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D97706]">{t.section9.badge}</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0F261E] tracking-tight">
              {t.section9.title}
            </h2>
          </div>

          <p className="text-[#1C3F34]/90 leading-relaxed">{t.section9.intro}</p>

          <div className="grid sm:grid-cols-2 gap-4">
            {t.section9.rules.map((rule, idx) => (
              <div key={idx} className="bg-white p-5 rounded-2xl border border-[#0F261E]/10 space-y-1.5 shadow-xs">
                <h3 className="font-bold text-sm text-[#1C3F34] flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#D97706]" />
                  <span>{rule.title}</span>
                </h3>
                <p className="text-xs text-[#0F261E]/80 leading-relaxed">{rule.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-[#1C3F34]/5 border border-[#1C3F34]/15 p-5 rounded-2xl text-xs text-[#0F261E]/85 italic text-center">
            {t.section9.disclaimer}
          </div>
        </section>

        {/* SECTION 10 — OÙ ALLER ENSUITE */}
        <section id="ou-aller-ensuite" className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D97706]">{t.section10.badge}</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0F261E] tracking-tight">
              {t.section10.title}
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            {t.section10.profiles.map((prof, idx) => (
              <div key={idx} className="bg-white p-5 rounded-2xl border border-[#0F261E]/10 space-y-3 flex flex-col justify-between shadow-xs">
                <div>
                  <span className="text-xs font-bold text-[#D97706] uppercase tracking-wider">{prof.badge}</span>
                  <h3 className="font-bold text-base text-[#1C3F34] mt-1">{prof.title}</h3>
                  <p className="text-xs text-[#0F261E]/80 mt-1 leading-relaxed">{prof.desc}</p>
                </div>
                <a
                  href={`/${lang === 'fr' ? '' : lang + '/'}${prof.view}/`}
                  onClick={(e) => handleLinkClick(e, prof.view)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1C3F34] hover:text-[#D97706]"
                >
                  <span>{prof.cta}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 11 — FAQ */}
        <section id="faq-infusion" className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D97706]">{t.section11.badge}</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0F261E] tracking-tight">
              {t.section11.title}
            </h2>
          </div>

          <div className="space-y-3">
            {t.section11.faq.map((item, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div 
                  key={idx} 
                  className="bg-white rounded-2xl border border-[#0F261E]/10 overflow-hidden shadow-2xs transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex items-center justify-between p-4 sm:p-5 text-left font-bold text-sm sm:text-base text-[#1C3F34] hover:text-[#D97706] transition-colors"
                    aria-expanded={isOpen}
                  >
                    <span>{idx + 1}. {item.q}</span>
                    <ChevronDown className={`w-4 h-4 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-[#D97706]' : 'text-[#0F261E]/50'}`} />
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs sm:text-sm text-[#0F261E]/85 leading-relaxed border-t border-[#0F261E]/5 pt-3">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION 12 — CONVERSION FINALE */}
        <section id="conversion-finale" className="bg-[#1C3F34] text-white rounded-3xl p-8 sm:p-10 md:p-12 text-center space-y-6 shadow-xl border border-white/10">
          <div className="max-w-2xl mx-auto space-y-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              {t.section12.title}
            </h2>
            <p className="text-white/85 text-sm sm:text-base leading-relaxed">
              {t.section12.desc}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <a
              href={lang === 'fr' ? '/bloomlab/' : `/${lang}/bloomlab/`}
              onClick={(e) => handleLinkClick(e, 'machine')}
              id="footer-cta-bloomlab"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#D97706] hover:bg-[#b45309] text-white font-bold text-sm shadow-md transition-all"
            >
              <span>{t.section12.ctaMachine}</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href={lang === 'fr' ? '/boutique/' : `/${lang}/boutique/`}
              onClick={(e) => handleLinkClick(e, 'boutique')}
              id="footer-cta-boutique"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 transition-all"
            >
              <span>{t.section12.ctaShop}</span>
            </a>
            <a
              href={lang === 'fr' ? '/recettes-gratuites/' : `/${lang}/recettes/`}
              onClick={(e) => handleLinkClick(e, 'recettes-gratuites')}
              id="footer-cta-recettes"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-transparent hover:bg-white/10 text-white/90 hover:text-white font-medium text-sm underline transition-all"
            >
              <span>{t.section12.ctaFree}</span>
            </a>
          </div>
        </section>

      </div>
    </main>
  );
}
