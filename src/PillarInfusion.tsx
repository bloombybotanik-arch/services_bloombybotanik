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

  const handleLinkClick = (e: React.MouseEvent<HTMLElement>, view: string, param?: string) => {
    e.preventDefault();
    onNavigate(view, param);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="bg-[#FAF7F2] text-[#3E4A3D] min-h-screen">
      {/* SECTION 0 — EN-TÊTE & INTRODUCTION VERT SAUGE FONCÉ #1E2E25 */}
      <header className="w-full bg-[#1E2E25] text-white border-b border-white/10">
        {/* Barre de fil d'Ariane tout en haut : Vert Profond du Menu #0F261E */}
        <div className="w-full bg-[#0F261E] border-b border-white/10 px-4 md:px-8 py-3.5">
          <nav aria-label="Fil d'Ariane" className="max-w-7xl mx-auto">
            <ol className="flex items-center space-x-2 text-sm text-white">
              <li>
                <a 
                  href={lang === 'fr' ? '/' : `/${lang}/`} 
                  onClick={(e) => handleLinkClick(e, 'home')}
                  className="text-white/80 hover:text-[#F5F0E6] transition-colors"
                >
                  {t.meta.breadcrumbHome}
                </a>
              </li>
              <li><span className="text-white/40">/</span></li>
              <li>
                <span className="text-white/80 hover:text-[#F5F0E6] transition-colors cursor-pointer" onClick={(e) => handleLinkClick(e, 'home')}>
                  {lang === 'fr' ? 'La Méthode A/B' : 'The A/B Method'}
                </span>
              </li>
              <li><span className="text-white/40">/</span></li>
              <li className="text-white font-bold" aria-current="page">
                {t.meta.breadcrumbCurrent}
              </li>
            </ol>
          </nav>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-20">

          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-white text-xs font-bold tracking-wider uppercase border border-white/20 shadow-xs">
                <Leaf className="w-3.5 h-3.5 text-[#E8772E]" />
                {t.meta.badge}
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight font-sans">
                {t.meta.h1}
              </h1>

              <div className="space-y-4 text-white text-base sm:text-lg leading-relaxed font-normal">
                <p className="text-white">{t.meta.p1}</p>
                <p className="text-white">{t.meta.p2}</p>
                <p className="text-xs sm:text-sm text-white/90 bg-white/10 p-3 rounded-xl border border-white/15">
                  {t.meta.legalNotice}
                </p>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href={lang === 'fr' ? '/bloomlab/' : `/${lang}/bloomlab/`}
                  onClick={(e) => handleLinkClick(e, 'machine')}
                  id="hero-cta-bloomlab"
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#E8772E] hover:bg-[#D4651F] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all"
                >
                  <span>{t.meta.ctaBloomLab}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href={lang === 'fr' ? '/recettes-gratuites/' : `/${lang}/recettes/`}
                  onClick={(e) => handleLinkClick(e, 'recettes-gratuites')}
                  id="hero-cta-recettes"
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-[#1E2E25] font-bold text-sm border border-white/20 transition-all shadow-xs"
                >
                  <span>{t.meta.ctaRecipes}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Image principale LCP */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/20 bg-white/5 aspect-[16/10] w-full max-w-md max-h-[280px]">
                <img
                  src="/images/2.png"
                  alt={isFR ? "BloomLab® — Extracteur et infuseur botanique de précision" : lang === 'de' ? "BloomLab® — Botanischer Präzisionsextraktor" : "BloomLab® — Precision botanical extractor"}
                  width={1200}
                  height={630}
                  loading="eager"
                  fetchPriority="high"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-2.5 left-2.5 right-2.5 text-[11px] text-white/90 bg-black/60 backdrop-blur-xs px-2.5 py-1 rounded-lg border border-white/10 text-center">
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
            <span className="text-xs font-bold uppercase tracking-widest text-[#C8AB8A]">{t.section1.badge}</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#3E4A3D] tracking-tight">
              {t.section1.title}
            </h2>
          </div>

          <div className="prose prose-slate max-w-none text-[#3E4A3D]/90 leading-relaxed space-y-4">
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

          <div className="bg-[#3E4A3D]/5 border-l-4 border-[#3E4A3D] p-5 rounded-r-2xl space-y-1 text-sm text-[#3E4A3D]">
            <p className="font-semibold text-[#3E4A3D]">{t.section1.calloutTitle}</p>
            <p className="italic leading-relaxed">{t.section1.calloutText}</p>
          </div>

          {/* 2ème Image Réelle Produit / Préparation indexable */}
          <div className="my-8 rounded-2xl sm:rounded-3xl overflow-hidden border border-[#3E4A3D]/10 bg-white shadow-md">
            <div className="relative aspect-[16/10] sm:aspect-[2/1] overflow-hidden">
              <img
                src="/assets/images/BloomLab_rosemary_infusion.png"
                alt={isFR ? "Exemple de préparation maison : infusion active de romarin en chambre close avec BloomLab" : lang === 'de' ? "Beispiel einer Hauszubereitung: aktive Rosmarin-Infusion in geschlossener Kammer mit BloomLab" : "Home preparation example: active rosemary infusion in closed chamber with BloomLab"}
                width={1200}
                height={750}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4 bg-[#FAF7F2] border-t border-[#3E4A3D]/5 flex items-center justify-between text-xs text-[#3E4A3D]/80">
              <span className="font-medium">
                {isFR 
                  ? "Exemple de préparation maison : extraction active en chambre close avec BloomLab®" 
                  : lang === 'de'
                  ? "Beispiel einer Hauszubereitung: aktive Extraktion in geschlossener Kammer mit BloomLab®"
                  : "Home preparation example: active extraction in a closed chamber with BloomLab®"}
              </span>
              <span className="text-[#C8AB8A] font-semibold">BloomLab®</span>
            </div>
          </div>
        </section>

        {/* SECTION 2 — POURQUOI LES PARAMÈTRES COMPTENT */}
        <section id="pourquoi-parametres" className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C8AB8A]">{t.section2.badge}</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#3E4A3D] tracking-tight">
              {t.section2.title}
            </h2>
          </div>

          <p className="text-[#3E4A3D]/90 leading-relaxed">{t.section2.intro}</p>

          <div className="grid sm:grid-cols-2 gap-5">
            <div className="bg-white p-5 rounded-2xl border border-[#3E4A3D]/10 shadow-xs space-y-2">
              <div className="flex items-center gap-2 text-[#C8AB8A] font-bold text-sm">
                <Thermometer className="w-4 h-4" />
                <span>{t.section2.tempTitle}</span>
              </div>
              <p className="text-sm text-[#3E4A3D]/85 leading-relaxed">{t.section2.tempText}</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#3E4A3D]/10 shadow-xs space-y-2">
              <div className="flex items-center gap-2 text-[#C8AB8A] font-bold text-sm">
                <Clock className="w-4 h-4" />
                <span>{t.section2.timeTitle}</span>
              </div>
              <p className="text-sm text-[#3E4A3D]/85 leading-relaxed">{t.section2.timeText}</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#3E4A3D]/10 shadow-xs space-y-2">
              <div className="flex items-center gap-2 text-[#C8AB8A] font-bold text-sm">
                <Sparkles className="w-4 h-4" />
                <span>{t.section2.agitationTitle}</span>
              </div>
              <p className="text-sm text-[#3E4A3D]/85 leading-relaxed">{t.section2.agitationText}</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#3E4A3D]/10 shadow-xs space-y-2">
              <div className="flex items-center gap-2 text-[#C8AB8A] font-bold text-sm">
                <Layers className="w-4 h-4" />
                <span>{t.section2.ratioTitle}</span>
              </div>
              <p className="text-sm text-[#3E4A3D]/85 leading-relaxed">{t.section2.ratioText}</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#3E4A3D]/10 text-sm text-[#3E4A3D]/90 italic">
            {t.section2.callout}
          </div>
        </section>

        {/* SECTION 3 — INFUSION, DÉCOCTION, MACÉRATION */}
        <section id="differences-methodes" className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C8AB8A]">{t.section3.badge}</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#3E4A3D] tracking-tight">
              {t.section3.title}
            </h2>
          </div>

          <p className="text-[#3E4A3D]/90 leading-relaxed">{t.section3.intro}</p>

          <div className="grid md:grid-cols-3 gap-5">
            {/* Infusion Card */}
            <div className="bg-white p-6 rounded-2xl border border-[#3E4A3D]/10 space-y-4 shadow-xs">
              <h3 className="text-lg font-bold text-[#3E4A3D] flex items-center gap-2">
                <Leaf className="w-5 h-5 text-[#C8AB8A]" />
                <span>{t.section3.infusion.title}</span>
              </h3>
              <p className="text-xs text-[#3E4A3D]/80 leading-relaxed">{t.section3.infusion.desc}</p>
              <ul className="text-xs space-y-2 border-t border-[#3E4A3D]/5 pt-3 text-[#3E4A3D]/85">
                <li><strong>{isFR ? 'Température :' : lang === 'de' ? 'Temperatur:' : 'Temperature:'}</strong> {t.section3.infusion.temp}</li>
                <li><strong>{isFR ? 'Durée :' : lang === 'de' ? 'Dauer:' : 'Duration:'}</strong> {t.section3.infusion.duration}</li>
                <li><strong>{isFR ? 'Parties :' : lang === 'de' ? 'Teile:' : 'Parts:'}</strong> {t.section3.infusion.parts}</li>
                <li><strong>{isFR ? 'Cible :' : lang === 'de' ? 'Ziel:' : 'Target:'}</strong> {t.section3.infusion.target}</li>
              </ul>
            </div>

            {/* Décoction Card */}
            <div className="bg-white p-6 rounded-2xl border border-[#3E4A3D]/10 space-y-4 shadow-xs">
              <h3 className="text-lg font-bold text-[#3E4A3D] flex items-center gap-2">
                <FlaskConical className="w-5 h-5 text-[#C8AB8A]" />
                <span>{t.section3.decoction.title}</span>
              </h3>
              <p className="text-xs text-[#3E4A3D]/80 leading-relaxed">{t.section3.decoction.desc}</p>
              <ul className="text-xs space-y-2 border-t border-[#3E4A3D]/5 pt-3 text-[#3E4A3D]/85">
                <li><strong>{isFR ? 'Température :' : lang === 'de' ? 'Temperatur:' : 'Temperature:'}</strong> {t.section3.decoction.temp}</li>
                <li><strong>{isFR ? 'Durée :' : lang === 'de' ? 'Dauer:' : 'Duration:'}</strong> {t.section3.decoction.duration}</li>
                <li><strong>{isFR ? 'Parties :' : lang === 'de' ? 'Teile:' : 'Parts:'}</strong> {t.section3.decoction.parts}</li>
                <li><strong>{isFR ? 'Cible :' : lang === 'de' ? 'Ziel:' : 'Target:'}</strong> {t.section3.decoction.target}</li>
              </ul>
            </div>

            {/* Macération Card */}
            <div className="bg-white p-6 rounded-2xl border border-[#3E4A3D]/10 space-y-4 shadow-xs">
              <h3 className="text-lg font-bold text-[#3E4A3D] flex items-center gap-2">
                <Droplets className="w-5 h-5 text-[#C8AB8A]" />
                <span>{t.section3.maceration.title}</span>
              </h3>
              <p className="text-xs text-[#3E4A3D]/80 leading-relaxed">{t.section3.maceration.desc}</p>
              <ul className="text-xs space-y-2 border-t border-[#3E4A3D]/5 pt-3 text-[#3E4A3D]/85">
                <li><strong>{isFR ? 'Température :' : lang === 'de' ? 'Temperatur:' : 'Temperature:'}</strong> {t.section3.maceration.temp}</li>
                <li><strong>{isFR ? 'Durée :' : lang === 'de' ? 'Dauer:' : 'Duration:'}</strong> {t.section3.maceration.duration}</li>
                <li><strong>{isFR ? 'Parties :' : lang === 'de' ? 'Teile:' : 'Parts:'}</strong> {t.section3.maceration.parts}</li>
                <li><strong>{isFR ? 'Cible :' : lang === 'de' ? 'Ziel:' : 'Target:'}</strong> {t.section3.maceration.target}</li>
              </ul>
            </div>
          </div>

          <div className="bg-[#3E4A3D]/5 border-l-4 border-[#3E4A3D] p-5 rounded-r-2xl space-y-1 text-sm text-[#3E4A3D]">
            <p className="font-semibold text-[#3E4A3D]">{t.section3.synthesisTitle}</p>
            <p className="italic leading-relaxed">{t.section3.synthesisText}</p>
          </div>
        </section>

        {/* SECTION 4 — LA DÉMARCHE BLOOM */}
        <section id="demarche-bloom" className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C8AB8A]">{t.section4.badge}</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#3E4A3D] tracking-tight">
              {t.section4.title}
            </h2>
          </div>

          <p className="text-[#3E4A3D]/90 leading-relaxed">{t.section4.intro}</p>

          <div className="grid sm:grid-cols-3 gap-5">
            {t.section4.steps.map((step) => (
              <div key={step.num} className="bg-white p-5 rounded-2xl border border-[#3E4A3D]/10 space-y-2 shadow-xs">
                <div className="w-8 h-8 rounded-full bg-[#3E4A3D] text-white flex items-center justify-center font-bold text-sm">
                  {step.num}
                </div>
                <h3 className="font-bold text-base text-[#3E4A3D]">{step.title}</h3>
                <p className="text-xs text-[#3E4A3D]/80 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>

          <p className="text-sm sm:text-base text-[#3E4A3D]/90 leading-relaxed bg-[#FAF7F2] p-5 rounded-2xl border border-[#3E4A3D]/10 italic">
            {t.section4.quote}
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-semibold">
            <span className="text-[#3E4A3D]/70">{t.section4.linksTitle}</span>
            {t.section4.links.map((link, idx) => (
              <React.Fragment key={link.view}>
                {idx > 0 && <span>•</span>}
                <a 
                  href={`/${lang === 'fr' ? '' : lang + '/'}${link.view}/`} 
                  onClick={(e) => handleLinkClick(e, link.view)}
                  className="inline-flex items-center gap-1 text-[#3E4A3D] underline hover:text-[#C8AB8A]"
                >
                  {link.label}
                </a>
              </React.Fragment>
            ))}
          </div>
        </section>

        {/* SECTION 5 — BLOOMLAB */}
        <section id="decouvrir-bloomlab" className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-[#3E4A3D]/10 shadow-sm space-y-8">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C8AB8A]">{t.section5.badge}</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#3E4A3D] tracking-tight">
              {t.section5.title}
            </h2>
          </div>

          <div className="grid md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-7 space-y-4 text-sm text-[#3E4A3D]/90 leading-relaxed">
              <p>{t.section5.intro}</p>
              <ul className="space-y-2 list-disc pl-5">
                {t.section5.features.map((feat, idx) => (
                  <li key={idx}>
                    <strong>{feat.title}</strong> {feat.desc}
                  </li>
                ))}
              </ul>
              <p className="italic text-[#3E4A3D] font-medium pt-1">{t.section5.quote}</p>
            </div>

            <div className="md:col-span-5">
              <div className="rounded-2xl overflow-hidden border border-[#3E4A3D]/10 shadow-sm aspect-square bg-[#FAF7F2]">
                <img
                  src="/img/produit/bloomlab-face-1200x1200.jpg"
                  alt="BloomLab® — Extracteur et infuseur de plantes médicinales Totum"
                  width={600}
                  height={600}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          <div className="bg-[#FAF7F2] p-5 sm:p-6 rounded-2xl border border-[#3E4A3D]/10 space-y-3">
            <h3 className="font-bold text-sm sm:text-base text-[#3E4A3D] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#C8AB8A]" />
              <span>{t.section5.limitsTitle}</span>
            </h3>
            <ul className="text-xs sm:text-sm text-[#3E4A3D]/80 space-y-1.5 list-disc pl-5 leading-relaxed">
              {t.section5.limits.map((limit, idx) => (
                <li key={idx}>{limit}</li>
              ))}
            </ul>
          </div>

          <div className="pt-2">
            <a
              href={lang === 'fr' ? '/bloomlab/' : `/${lang}/bloomlab/`}
              onClick={(e) => handleLinkClick(e, 'machine')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#3E4A3D] text-white text-sm font-bold hover:bg-[#3E4A3D] transition-all"
            >
              <span>{t.section5.cta}</span>
              <ArrowRight className="w-4 h-4 text-[#C8AB8A]" />
            </a>
          </div>
        </section>

        {/* SECTION 6 — COMPARATIF BAIN-MARIE VS BLOOMLAB */}
        <section id="comparatif-bain-marie" className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C8AB8A]">{t.section6.badge}</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#3E4A3D] tracking-tight">
              {t.section6.title}
            </h2>
          </div>

          <p className="text-[#3E4A3D]/90 leading-relaxed">{t.section6.intro}</p>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse bg-white rounded-2xl overflow-hidden border border-[#3E4A3D]/10 shadow-xs">
              <thead>
                <tr className="bg-[#3E4A3D] text-white text-xs uppercase tracking-wider">
                  <th className="p-4 font-bold">{t.section6.table.headers.criterion}</th>
                  <th className="p-4 font-bold">{t.section6.table.headers.traditional}</th>
                  <th className="p-4 font-bold bg-[#C8AB8A] text-[#0F261E]">{t.section6.table.headers.bloomlab}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#3E4A3D]/10 text-xs sm:text-sm text-[#3E4A3D]/90">
                {t.section6.table.rows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-[#FAF7F2]/60 transition-colors">
                    <td className="p-4 font-bold text-[#3E4A3D]">{row.criterion}</td>
                    <td className="p-4 text-[#3E4A3D]/75">{row.traditional}</td>
                    <td className="p-4 font-medium text-[#3E4A3D] bg-[#C8AB8A]/5">{row.bloomlab}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-xs text-[#3E4A3D]/60 italic">{t.section6.footnote}</p>
        </section>

        {/* SECTION 7 — QUELS SOLVANTS UTILISER ? */}
        <section id="solvants-botaniques" className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C8AB8A]">{t.section7.badge}</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#3E4A3D] tracking-tight">
              {t.section7.title}
            </h2>
          </div>

          <p className="text-[#3E4A3D]/90 leading-relaxed">{t.section7.intro}</p>

          <div className="grid md:grid-cols-3 gap-5">
            {t.section7.solvents.map((solv, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-[#3E4A3D]/10 space-y-3 shadow-xs flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-base text-[#3E4A3D]">{solv.title}</h3>
                  <span className="inline-block text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#3E4A3D]/5 text-[#3E4A3D] mt-1 mb-2">
                    {solv.polarity}
                  </span>
                  <p className="text-xs text-[#3E4A3D]/80 leading-relaxed">{solv.desc}</p>
                </div>
                <div className="border-t border-[#3E4A3D]/5 pt-3 text-xs space-y-1 text-[#3E4A3D]/85">
                  <p><strong>{isFR ? 'Affinité :' : lang === 'de' ? 'Affinität:' : 'Affinity:'}</strong> {solv.affinity}</p>
                  <p><strong>{isFR ? 'Exemples :' : lang === 'de' ? 'Beispiele:' : 'Examples:'}</strong> {solv.examples}</p>
                  <p><strong>{isFR ? 'Conservation :' : lang === 'de' ? 'Haltbarkeit:' : 'Shelf life:'}</strong> {solv.shelfLife}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-[#FAF7F2] p-4 rounded-xl border border-[#3E4A3D]/10 text-xs text-[#3E4A3D]/85">
            <strong className="text-[#3E4A3D]">{t.section7.precautionTitle}</strong> {t.section7.precautionText}
          </div>
        </section>

        {/* SECTION 8 — EXEMPLES DE PRÉPARATIONS */}
        <section id="exemples-recettes" className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C8AB8A]">{t.section8.badge}</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#3E4A3D] tracking-tight">
              {t.section8.title}
            </h2>
          </div>

          <p className="text-[#3E4A3D]/90 leading-relaxed">{t.section8.intro}</p>

          <div className="space-y-6">
            {t.section8.recipes.map((rec) => (
              <div key={rec.num} className="bg-white p-6 sm:p-8 rounded-3xl border border-[#3E4A3D]/10 shadow-xs space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#3E4A3D]/5 pb-3">
                  <h3 className="font-bold text-lg text-[#3E4A3D] flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#C8AB8A] text-[#0F261E] flex items-center justify-center text-xs font-bold">{rec.num}</span>
                    <span>{rec.title}</span>
                  </h3>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#C8AB8A] bg-[#C8AB8A]/10 px-2.5 py-1 rounded-full">
                    {rec.category}
                  </span>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                  <div>
                    <span className="font-bold text-[#3E4A3D]">{isFR ? 'Ingrédients :' : lang === 'de' ? 'Zutaten:' : 'Ingredients:'}</span>
                    <p className="text-[#3E4A3D]/80 mt-1">{rec.ingredients}</p>
                  </div>
                  <div>
                    <span className="font-bold text-[#3E4A3D]">{isFR ? 'Paramètres :' : lang === 'de' ? 'Parameter:' : 'Parameters:'}</span>
                    <p className="text-[#3E4A3D]/80 mt-1">{rec.parameters}</p>
                  </div>
                </div>

                <div>
                  <span className="font-bold text-xs sm:text-sm text-[#3E4A3D]">{isFR ? 'Protocole pas à pas :' : lang === 'de' ? 'Schritt-für-Schritt:' : 'Step-by-step protocol:'}</span>
                  <ol className="list-decimal pl-5 space-y-1 text-xs sm:text-sm text-[#3E4A3D]/80 mt-1">
                    {rec.steps.map((st, sidx) => (
                      <li key={sidx}>{st}</li>
                    ))}
                  </ol>
                </div>

                <div className="bg-[#FAF7F2] p-3 rounded-xl flex flex-wrap items-center justify-between gap-2 text-xs text-[#3E4A3D]/85">
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
            <span className="text-xs font-bold uppercase tracking-widest text-[#C8AB8A]">{t.section9.badge}</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#3E4A3D] tracking-tight">
              {t.section9.title}
            </h2>
          </div>

          <p className="text-[#3E4A3D]/90 leading-relaxed">{t.section9.intro}</p>

          <div className="grid sm:grid-cols-2 gap-4">
            {t.section9.rules.map((rule, idx) => (
              <div key={idx} className="bg-white p-5 rounded-2xl border border-[#3E4A3D]/10 space-y-1.5 shadow-xs">
                <h3 className="font-bold text-sm text-[#3E4A3D] flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C8AB8A]" />
                  <span>{rule.title}</span>
                </h3>
                <p className="text-xs text-[#3E4A3D]/80 leading-relaxed">{rule.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-[#3E4A3D]/5 border border-[#3E4A3D]/15 p-5 rounded-2xl text-xs text-[#3E4A3D]/85 italic text-center">
            {t.section9.disclaimer}
          </div>
        </section>

        {/* SECTION 10 — OÙ ALLER ENSUITE */}
        <section id="ou-aller-ensuite" className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C8AB8A]">{t.section10.badge}</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#3E4A3D] tracking-tight">
              {t.section10.title}
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            {t.section10.profiles.map((prof, idx) => (
              <div key={idx} className="bg-white p-5 rounded-2xl border border-[#3E4A3D]/10 space-y-3 flex flex-col justify-between shadow-xs">
                <div>
                  <span className="text-xs font-bold text-[#C8AB8A] uppercase tracking-wider">{prof.badge}</span>
                  <h3 className="font-bold text-base text-[#3E4A3D] mt-1">{prof.title}</h3>
                  <p className="text-xs text-[#3E4A3D]/80 mt-1 leading-relaxed">{prof.desc}</p>
                </div>
                <a
                  href={`/${lang === 'fr' ? '' : lang + '/'}${prof.view}/`}
                  onClick={(e) => handleLinkClick(e, prof.view)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#3E4A3D] hover:text-[#C8AB8A]"
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
            <span className="text-xs font-bold uppercase tracking-widest text-[#C8AB8A]">{t.section11.badge}</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#3E4A3D] tracking-tight">
              {t.section11.title}
            </h2>
          </div>

          <div className="space-y-3">
            {t.section11.faq.map((item, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div 
                  key={idx} 
                  className="bg-white rounded-2xl border border-[#3E4A3D]/10 overflow-hidden shadow-2xs transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex items-center justify-between p-4 sm:p-5 text-left font-bold text-sm sm:text-base text-[#3E4A3D] hover:text-[#C8AB8A] transition-colors"
                    aria-expanded={isOpen}
                  >
                    <span>{idx + 1}. {item.q}</span>
                    <ChevronDown className={`w-4 h-4 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-[#C8AB8A]' : 'text-[#3E4A3D]/50'}`} />
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs sm:text-sm text-[#3E4A3D]/85 leading-relaxed border-t border-[#3E4A3D]/5 pt-3">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION 12 — CONVERSION FINALE */}
        <section id="conversion-finale" className="bg-[#3E4A3D] text-white rounded-3xl p-8 sm:p-10 md:p-12 text-center space-y-6 shadow-xl border border-white/10">
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
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#3E4A3D] hover:bg-[#2D372C] text-white font-bold text-sm shadow-md transition-all"
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
