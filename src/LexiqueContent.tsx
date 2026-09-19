import React, { useEffect, useState } from 'react';
import { Star, ArrowRight, BookOpen, Sparkles, ExternalLink, ShieldCheck, CheckCircle2, Bookmark } from 'lucide-react';
import { lexiqueEntriesList, LexiqueEntry } from './data/lexique';

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

  const filteredEntries = lexiqueEntriesList.filter((item) => {
    if (!searchTerm.trim()) return true;
    const query = searchTerm.toLowerCase();
    return (
      item.terme.toLowerCase().includes(query) ||
      item.definitionNovice.toLowerCase().includes(query) ||
      item.tooltip.toLowerCase().includes(query) ||
      item.slug.toLowerCase().includes(query)
    );
  });

  // Schema.org DefinedTermSet JSON-LD
  const definedTermSetSchema = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTermSet',
    '@id': 'https://bloombybotanik.com/lexique#DefinedTermSet',
    name: 'Lexique Bloom by BotaniK — 12 mots pour comprendre',
    description: "Le lexique scientifique et botanique officiel de Bloom by BotaniK : 12 concepts fondamentaux pour comprendre l'extraction végétale, la biologie cellulaire et le reset homéostatique.",
    url: 'https://bloombybotanik.com/lexique',
    inLanguage: lang === 'en' ? 'en' : lang === 'de' ? 'de' : 'fr',
    hasDefinedTerm: lexiqueEntriesList.map((entry) => ({
      '@type': 'DefinedTerm',
      '@id': `https://bloombybotanik.com/lexique#${entry.slug}`,
      name: entry.terme,
      termCode: entry.slug,
      description: entry.definitionNovice,
      inDefinedTermSet: 'https://bloombybotanik.com/lexique#DefinedTermSet',
      url: `https://bloombybotanik.com/lexique#${entry.slug}`
    }))
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#0F261E] pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      {/* Inject Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSetSchema) }}
      />

      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb / Top label */}
        <div className="mb-6 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#D97706]">
          <BookOpen className="w-4 h-4" />
          <span>Savoirs Botaniques & Biologiques</span>
        </div>

        {/* Hero Header */}
        <header className="mb-12 border-b border-[#E7DFD3] pb-10">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F261E] tracking-tight mb-5 leading-tight">
            Lexique Bloom by BotaniK — 12 mots pour comprendre
          </h1>
          <p className="text-lg sm:text-xl text-[#1C3F34]/90 font-medium leading-relaxed max-w-3xl">
            Une passerelle claire et rigoureuse entre science biologique et sagesse botanique. Découvrez en toute simplicité les douze concepts clés qui fondent l'approche Bloom du vivant et de l'équilibre cellulaire.
          </p>

          {/* Quick Jump Pills */}
          <div className="mt-8 pt-6 border-t border-[#E7DFD3]/60">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1C3F34]/70 block mb-3">
              Accès direct aux 12 notions clés :
            </span>
            <div className="flex flex-wrap gap-2">
              {lexiqueEntriesList.map((item) => (
                <a
                  key={item.slug}
                  href={`#${item.slug}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveSlug(item.slug);
                    const el = document.getElementById(item.slug);
                    if (el) {
                      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      window.history.replaceState(null, '', `#${item.slug}`);
                    }
                  }}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                    activeSlug === item.slug
                      ? 'bg-[#0F261E] text-white border-[#0F261E] shadow-sm'
                      : 'bg-white/80 text-[#0F261E] border-[#E7DFD3] hover:border-[#D97706] hover:bg-white'
                  }`}
                >
                  {item.terme}
                </a>
              ))}
            </div>
          </div>
        </header>

        {/* Search bar */}
        <div className="mb-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="text-sm font-semibold text-[#1C3F34]">
            Affichage des <span className="text-[#D97706] font-bold">{filteredEntries.length}</span> termes répertoriés
          </div>
          <div className="relative w-full sm:w-72">
            <input
              type="text"
              placeholder="Rechercher un concept..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Rechercher un terme dans le lexique"
              className="w-full px-3.5 py-2 text-sm bg-white border border-[#E7DFD3] rounded-lg text-[#0F261E] placeholder-[#1C3F34]/50 focus:outline-none focus:ring-2 focus:ring-[#D97706] focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* 12 Terms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {filteredEntries.map((item: LexiqueEntry) => {
            const isHighlighted = activeSlug === item.slug;
            return (
              <article
                key={item.slug}
                id={item.slug}
                className={`group relative bg-white rounded-2xl p-6 sm:p-7 border transition-all duration-300 scroll-mt-28 flex flex-col justify-between ${
                  isHighlighted
                    ? 'border-[#D97706] ring-2 ring-[#D97706]/20 shadow-xl'
                    : 'border-[#E7DFD3] hover:border-[#D97706]/60 shadow-sm hover:shadow-md'
                }`}
              >
                <div>
                  {/* Top Bar: Code + Proof Level */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#FAF7F2] text-[11px] font-bold uppercase tracking-wider text-[#D97706] border border-[#E7DFD3]">
                      <Bookmark className="w-3 h-3" />
                      #{item.slug}
                    </span>

                    {/* Scientific Proof Stars */}
                    <div
                      className="flex items-center gap-1 bg-[#FAF7F2] px-2.5 py-1 rounded-md border border-[#E7DFD3]"
                      title={`Niveau de preuve scientifique : ${item.niveauPreuve}/5`}
                      aria-label={`Niveau de preuve scientifique : ${item.niveauPreuve} sur 5`}
                    >
                      <span className="text-[11px] font-bold text-[#1C3F34] mr-1">Preuve :</span>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-3.5 h-3.5 ${
                            star <= item.niveauPreuve
                              ? 'text-[#D97706] fill-[#D97706]'
                              : 'text-[#E7DFD3]'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Title */}
                  <h2 className="text-xl sm:text-2xl font-extrabold text-[#0F261E] tracking-tight mb-2 group-hover:text-[#D97706] transition-colors">
                    {item.terme}
                  </h2>

                  {/* Verbatim Tooltip (≤ 140 chars badge) */}
                  <div className="bg-[#FAF7F2] rounded-xl p-3 border border-[#E7DFD3] mb-4">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#1C3F34]/70 block mb-1">
                      En résumé (≤ 140 car.) :
                    </span>
                    <p className="text-xs sm:text-sm font-medium text-[#0F261E] leading-relaxed m-0">
                      « {item.tooltip} »
                    </p>
                  </div>

                  {/* Novice Definition */}
                  <div className="mb-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#1C3F34] mb-1">
                      Définition accessible :
                    </h3>
                    <p className="text-sm text-[#0F261E]/90 leading-relaxed font-normal">
                      {item.definitionNovice}
                    </p>
                  </div>

                  {/* Metaphor */}
                  <div className="bg-gradient-to-br from-[#FAF7F2] to-[#FFF] rounded-xl p-3.5 border-l-4 border-[#D97706] border-y border-r border-[#E7DFD3] mb-5">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#D97706] mb-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>L'image pour comprendre :</span>
                    </div>
                    <p className="text-xs sm:text-sm italic text-[#1C3F34] leading-relaxed m-0">
                      « {item.metaphore} »
                    </p>
                  </div>

                  {/* Scientific References */}
                  <div className="text-[11px] text-[#1C3F34]/75 mb-6 pt-3 border-t border-[#E7DFD3]/80">
                    <span className="font-bold text-[#0F261E]">Références cliniques & pharmacopée : </span>
                    {item.references}
                  </div>
                </div>

                {/* Internal Mesh Linking (Maillage) */}
                <div className="pt-4 border-t border-[#E7DFD3]">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#1C3F34] block mb-2">
                    Explorer ce concept sur le site :
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
                        className="inline-flex items-center justify-between text-xs font-semibold text-[#0F261E] hover:text-[#D97706] transition-colors py-1 px-2.5 rounded-lg bg-[#FAF7F2] hover:bg-[#FAF7F2]/80 border border-[#E7DFD3]/60 group/link"
                      >
                        <span className="truncate">{page.title}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#D97706] group-hover/link:translate-x-1 transition-transform flex-shrink-0 ml-2" />
                      </a>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="mt-16 bg-[#0F261E] text-white rounded-3xl p-8 sm:p-10 border border-[#1C3F34] text-center max-w-3xl mx-auto shadow-xl">
          <ShieldCheck className="w-10 h-10 text-[#D97706] mx-auto mb-4" />
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#FAF7F2] tracking-tight mb-3">
            La science végétale au service de votre terrain
          </h2>
          <p className="text-sm sm:text-base text-[#FAF7F2]/80 leading-relaxed mb-6">
            Votre corps n'est pas cassé. Il est verrouillé. Découvrez notre protocole complet de Reset Homéostatique ou apprenez à extraire le Totum absolu grâce au BloomLab.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => onNavigate?.('phytotherapie-reset')}
              className="px-6 py-3 rounded-xl bg-[#D97706] hover:bg-[#b45309] text-white font-bold text-sm transition-all shadow-md hover:shadow-lg"
            >
              Découvrir le Reset Homéostatique
            </button>
            <button
              onClick={() => onNavigate?.('machine')}
              className="px-6 py-3 rounded-xl bg-transparent hover:bg-white/10 text-white border border-white/30 font-bold text-sm transition-all"
            >
              Explorer le BloomLab
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LexiqueContent;
