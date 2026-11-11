import React, { useEffect, useState, useMemo } from 'react';
import { Star, ArrowRight, BookOpen, Sparkles, ShieldCheck, Bookmark, Layers, Search, Filter } from 'lucide-react';
import { lexiqueEntriesList, LexiqueEntry, CATEGORIES_LABELS } from './data/lexique';
import { LexiqueCategory, TermLevel, lexiqueDefinitionsById } from './data/lexiqueDefinitions';

interface LexiqueContentProps {
  onNavigate?: (view: any, param?: string) => void;
  lang?: string;
  initialTerm?: string;
}

export const LexiqueContent: React.FC<LexiqueContentProps> = ({
  onNavigate,
  lang = 'fr',
  initialTerm
}) => {
  const [activeSlug, setActiveSlug] = useState<string | null>(initialTerm || null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');

  useEffect(() => {
    // Check window.location.hash
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      setActiveSlug(hash);
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 400);
    }
  }, []);

  const categories = useMemo(() => {
    const counts: Record<string, number> = { all: lexiqueEntriesList.length };
    lexiqueEntriesList.forEach((entry) => {
      counts[entry.categorie] = (counts[entry.categorie] || 0) + 1;
    });
    return counts;
  }, []);

  const filteredEntries = useMemo(() => {
    return lexiqueEntriesList.filter((item: LexiqueEntry) => {
      // Category filter
      if (selectedCategory !== 'all' && item.categorie !== selectedCategory) {
        return false;
      }

      // Level filter
      const def = lexiqueDefinitionsById[item.slug];
      if (selectedLevel !== 'all' && def && def.niveau !== selectedLevel) {
        return false;
      }

      // Search term
      if (!searchTerm.trim()) return true;
      const query = searchTerm.toLowerCase().trim();
      return (
        item.terme.toLowerCase().includes(query) ||
        (item.definitionSimple && item.definitionSimple.toLowerCase().includes(query)) ||
        (item.definitionExperte && item.definitionExperte.toLowerCase().includes(query)) ||
        (item.analogie && item.analogie.toLowerCase().includes(query)) ||
        item.slug.toLowerCase().includes(query) ||
        (item.references && item.references.toLowerCase().includes(query))
      );
    });
  }, [searchTerm, selectedCategory, selectedLevel]);

  // Schema.org DefinedTermSet JSON-LD
  const definedTermSetSchema = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTermSet',
    '@id': 'https://bloombybotanik.com/lexique#DefinedTermSet',
    name: 'Lexique Canonique Bloom by BotaniK — Vocabulaire Biologique, Phytochimique et Systémique',
    description: "Le lexique scientifique et botanique officiel de Bloom by BotaniK : définitions canoniques de la charge allostatique, du reset homéostatique, de la phytochimie et du Totum végétal.",
    url: 'https://bloombybotanik.com/lexique',
    inLanguage: lang === 'en' ? 'en' : lang === 'de' ? 'de' : 'fr',
    hasDefinedTerm: lexiqueEntriesList.map((entry) => ({
      '@type': 'DefinedTerm',
      '@id': `https://bloombybotanik.com/lexique#${entry.slug}`,
      name: entry.terme,
      termCode: entry.slug,
      description: entry.definitionSimple || entry.definitionNovice,
      inDefinedTermSet: 'https://bloombybotanik.com/lexique#DefinedTermSet',
      url: `https://bloombybotanik.com/lexique#${entry.slug}`
    }))
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#3E4A3D] pb-20">
      {/* Inject Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSetSchema) }}
      />

      {/* SECTION HERO VERT SAUGE FONCÉ #1E2E25 AVEC FIL D'ARIANE VERT PROFOND #0F261E */}
      <header className="w-full bg-[#1E2E25] text-white border-b border-white/10 mb-12">
        {/* Barre de fil d'Ariane tout en haut : Vert Profond du Menu #0F261E */}
        <div className="w-full bg-[#0F261E] border-b border-white/10 px-4 md:px-8 py-3.5">
          <nav aria-label="Fil d'Ariane" className="max-w-7xl mx-auto">
            <ol className="flex items-center space-x-2 text-sm text-white">
              <li>
                <button 
                  onClick={() => { onNavigate?.('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="text-white/80 hover:text-[#F5F0E6] transition-colors cursor-pointer"
                >
                  Accueil
                </button>
              </li>
              <li><span className="text-white/40">/</span></li>
              <li>
                <span className="text-white/80">
                  Ressources
                </span>
              </li>
              <li><span className="text-white/40">/</span></li>
              <li className="text-white font-bold" aria-current="page">
                Lexique Botanik
              </li>
            </ol>
          </nav>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-20 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-white text-xs font-bold tracking-wider uppercase border border-white/20 mb-6 shadow-xs">
            <BookOpen className="w-3.5 h-3.5 text-[#E8772E]" />
            <span>Corpus Scientifique & Phytochimique</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-4 leading-tight">
            Lexique Fondateur Bloom — Le Vocabulaire du Vivant
          </h1>

          <p className="text-base sm:text-lg text-white/80 font-normal leading-relaxed max-w-3xl">
            Rendre la complexité biologique limpide sans jamais en appauvrir la rigueur. Retrouvez ici les définitions canoniques, analogies concrètes et fondements physiologiques qui éclairent notre démarche : de la <strong className="text-white font-semibold">charge allostatique</strong> au <strong className="text-white font-semibold">Totum végétal</strong>.
          </p>

          <div className="bg-white/5 border border-white/10 text-white/80 p-6 rounded-2xl mt-6 max-w-3xl text-sm leading-relaxed text-left">
            <p className="text-white font-semibold mb-1 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#E8772E]" />
              <span>Où suis-je ?</span>
            </p>
            <p className="text-white text-xs sm:text-sm leading-relaxed font-normal">
              Vous êtes dans le glossaire canonique de Bloom by BotaniK. Ce répertoire clarifie les concepts clés de notre méthodologie (Totum végétal, extraction thermo-cinétique, homéostasie, pharmacie intérieure) pour une compréhension rigoureuse et accessible du vivant.
            </p>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Controls: Search & Category Filter */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-lg">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Rechercher un concept (ex : charge allostatique, nerf vague, LPS, totum...)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                aria-label="Rechercher un terme dans le lexique"
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-[#E7DFD3] rounded-xl text-[#3E4A3D] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#C8AB8A] focus:border-transparent transition-all shadow-xs"
              />
            </div>

            {/* Level Selector */}
            <div className="flex items-center gap-2 text-xs font-semibold">
              <span className="text-slate-500">Niveau :</span>
              <button
                type="button"
                onClick={() => setSelectedLevel('all')}
                className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                  selectedLevel === 'all'
                    ? 'bg-[#3E4A3D] text-white border-[#3E4A3D]'
                    : 'bg-white text-slate-700 border-[#E7DFD3] hover:bg-[#FAF7F2]'
                }`}
              >
                Tous
              </button>
              <button
                type="button"
                onClick={() => setSelectedLevel('N1')}
                className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                  selectedLevel === 'N1'
                    ? 'bg-[#C8AB8A] text-[#0F261E] border-[#C8AB8A]'
                    : 'bg-white text-slate-700 border-[#E7DFD3] hover:bg-[#FAF7F2]'
                }`}
              >
                N1 Fondamental
              </button>
              <button
                type="button"
                onClick={() => setSelectedLevel('N2')}
                className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                  selectedLevel === 'N2'
                    ? 'bg-[#1E2E25] text-white border-[#1E2E25]'
                    : 'bg-white text-slate-700 border-[#E7DFD3] hover:bg-[#FAF7F2]'
                }`}
              >
                N2 Approfondi
              </button>
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            <button
              type="button"
              onClick={() => setSelectedCategory('all')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold border transition-all cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-[#3E4A3D] text-white border-[#3E4A3D]'
                  : 'bg-white/80 text-slate-700 border-[#E7DFD3] hover:border-[#C8AB8A] hover:bg-white'
              }`}
            >
              Toutes les notions ({lexiqueEntriesList.length})
            </button>

            {Object.entries(CATEGORIES_LABELS).map(([catKey, catInfo]) => {
              const count = categories[catKey] || 0;
              const isSelected = selectedCategory === catKey;
              return (
                <button
                  key={catKey}
                  type="button"
                  onClick={() => setSelectedCategory(catKey)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#C8AB8A] text-[#0F261E] border-[#C8AB8A] shadow-xs'
                      : 'bg-white/80 text-slate-700 border-[#E7DFD3] hover:border-[#C8AB8A] hover:bg-white'
                  }`}
                >
                  {catInfo.label} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Counter readout */}
        <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-6">
          {filteredEntries.length} {filteredEntries.length > 1 ? 'notions correspondent' : 'notion correspond'} à votre sélection
        </div>

        {/* Lexique Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {filteredEntries.map((item: LexiqueEntry) => {
            const isHighlighted = activeSlug === item.slug;
            const defInfo = lexiqueDefinitionsById[item.slug];
            const level = defInfo?.niveau || 'N1';
            const catLabel = CATEGORIES_LABELS[item.categorie]?.label || item.categorie;

            return (
              <article
                key={item.slug}
                id={item.slug}
                className={`group relative bg-white rounded-3xl p-6 sm:p-8 border transition-all duration-300 scroll-mt-28 flex flex-col justify-between ${
                  isHighlighted
                    ? 'border-[#C8AB8A] ring-2 ring-[#C8AB8A]/20 shadow-xl bg-amber-50/20'
                    : 'border-[#E7DFD3] hover:border-[#C8AB8A]/60 shadow-xs hover:shadow-md'
                }`}
              >
                <div className="space-y-4">
                  {/* Top Bar: Category + Level + Stars */}
                  <div className="flex items-center justify-between gap-2 flex-wrap pb-2 border-b border-[#E7DFD3]/60">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-[#FAF7F2] text-[10px] font-black uppercase tracking-wider text-[#C8AB8A] border border-[#E7DFD3]">
                        {level}
                      </span>
                      <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                        {catLabel}
                      </span>
                    </div>

                    {/* Scientific Proof Stars */}
                    <div
                      className="flex items-center gap-1 bg-[#FAF7F2] px-2 py-0.5 rounded-md border border-[#E7DFD3]"
                      title={`Niveau de preuve scientifique : ${item.niveauPreuve}/5`}
                      aria-label={`Niveau de preuve scientifique : ${item.niveauPreuve} sur 5`}
                    >
                      <span className="text-[10px] font-bold text-slate-600 mr-0.5">Preuve :</span>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-3 h-3 ${
                            star <= item.niveauPreuve
                              ? 'text-[#C8AB8A] fill-[#C8AB8A]'
                              : 'text-[#E7DFD3]'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Title */}
                  <h2 className="text-xl sm:text-2xl font-black text-[#3E4A3D] tracking-tight group-hover:text-[#C8AB8A] transition-colors">
                    {item.terme}
                  </h2>

                  {/* Simple Definition */}
                  <div className="space-y-1">
                    <h3 className="text-xs font-black uppercase tracking-wider text-[#1E2E25]">
                      En langage simple :
                    </h3>
                    <p className="text-sm text-slate-800 leading-relaxed font-normal">
                      {item.definitionSimple || item.definitionNovice}
                    </p>
                  </div>

                  {/* Analogy Box */}
                  {item.analogie && (
                    <div className="bg-[#FAF7F2] rounded-2xl p-4 border border-[#E7DFD3] space-y-1">
                      <div className="flex items-center gap-1.5 text-xs font-black text-[#C8AB8A]">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>L'analogie concrète :</span>
                      </div>
                      <p className="text-xs sm:text-sm italic text-[#1E2E25] leading-relaxed m-0 font-medium">
                        « {item.analogie} »
                      </p>
                    </div>
                  )}

                  {/* Expert Definition */}
                  {item.definitionExperte && (
                    <div className="space-y-1 pt-1">
                      <h3 className="text-xs font-black uppercase tracking-wider text-slate-500">
                        Précision physiologique & biochimique :
                      </h3>
                      <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed">
                        {item.definitionExperte}
                      </p>
                    </div>
                  )}

                  {/* Scientific References */}
                  {item.references && (
                    <div className="text-[11px] text-slate-500 pt-3 border-t border-[#E7DFD3]/60 leading-relaxed">
                      <strong className="text-slate-700">Références scientifiques : </strong>
                      {item.references}
                    </div>
                  )}
                </div>

                {/* Internal Mesh Linking */}
                {item.linkedPages && item.linkedPages.length > 0 && (
                  <div className="pt-4 mt-4 border-t border-[#E7DFD3]">
                    <span className="text-[11px] font-black uppercase tracking-wider text-[#1E2E25] block mb-2">
                      Approfondir sur le site :
                    </span>
                    <div className="flex flex-col gap-1.5">
                      {item.linkedPages.map((page, idx) => (
                        <a
                          key={idx}
                          href={page.url}
                          onClick={(e) => {
                            if (onNavigate && page.view) {
                              e.preventDefault();
                              onNavigate(page.view);
                            }
                          }}
                          className="inline-flex items-center justify-between text-xs font-semibold text-[#3E4A3D] hover:text-[#C8AB8A] transition-colors py-1.5 px-3 rounded-xl bg-[#FAF7F2] hover:bg-white border border-[#E7DFD3] group/link"
                        >
                          <span className="truncate">{page.title}</span>
                          <ArrowRight className="w-3.5 h-3.5 text-[#C8AB8A] group-hover/link:translate-x-1 transition-transform shrink-0 ml-2" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="mt-16 bg-[#1E2E25] text-white rounded-3xl p-8 sm:p-12 border border-white/10 text-center max-w-3xl mx-auto shadow-xl space-y-4">
          <ShieldCheck className="w-10 h-10 text-[#C8AB8A] mx-auto" />
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            La rigueur de votre extraction détermine la réponse de votre terrain
          </h2>
          <p className="text-sm sm:text-base text-white/80 leading-relaxed max-w-xl mx-auto">
            Votre corps n'est pas cassé. Il est verrouillé par un spectre de charges allostatiques accumulées. Découvrez comment l'extraction séquentielle A/B redonne à vos cellules leurs pleines capacités d'autorégulation.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <button
              onClick={() => onNavigate?.('phytotherapie-reset')}
              className="px-6 py-3.5 rounded-xl bg-[#E8772E] hover:bg-[#D4651F] text-white font-bold text-xs sm:text-sm transition-all shadow-md cursor-pointer"
            >
              Découvrir le Protocole Reset
            </button>
            <button
              onClick={() => onNavigate?.('manifeste')}
              className="px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-[#1E2E25] font-bold text-xs sm:text-sm transition-all cursor-pointer shadow-xs"
            >
              Lire le Manifeste
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LexiqueContent;
