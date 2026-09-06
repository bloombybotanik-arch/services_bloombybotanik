import React, { useState, useEffect } from 'react';
import { translations, Language } from './translations';
import { Calendar, User, Tag, ChevronRight, ArrowLeft, Clock, ExternalLink, BookOpen, Sparkles, Compass, Search } from 'lucide-react';
import { blogPosts, BlogPost } from './data/blogPosts';

interface ArticlesContentProps {
  lang: Language;
  onNavigate: (view: any, productId?: string) => void;
  initialSlug?: string;
}

export default function ArticlesContent({ lang, onNavigate, initialSlug }: ArticlesContentProps) {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const isFR = lang === 'fr';
  const isDE = lang === 'de';

  useEffect(() => {
    if (initialSlug) {
      const match = blogPosts.find(p => p.slug === initialSlug || (initialSlug === 'saule-salicine-aspirine-histoire-totum' && p.slug === 'remplacer-aspirine-naturellement-guide-extraction-reine-des-pres'));
      if (match) {
        setSelectedPost(match);
      }
    }
  }, [initialSlug]);

  const categories = ['all', ...Array.from(new Set(blogPosts.map(p => p.category)))];

  const filteredPosts = blogPosts.filter(p => {
    const matchesSearch = p.title[lang]?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.excerpt[lang]?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (selectedPost) {
    const relatedPosts = blogPosts.filter(p => p.slug !== selectedPost.slug).slice(0, 3);

    return (
      <div className="bg-[#FAF7F2] min-h-screen">
        <div className="max-w-4xl mx-auto px-6 py-16">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#1C3F34]/60 mb-8">
            <button onClick={() => onNavigate('home')} className="hover:text-[#1C3F34] uppercase cursor-pointer">Accueil</button>
            <ChevronRight className="w-3 h-3" />
            <button onClick={() => setSelectedPost(null)} className="hover:text-[#1C3F34] uppercase cursor-pointer">Articles</button>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#D97706] truncate max-w-[240px]">{selectedPost.title[lang]}</span>
          </nav>

          <button 
            onClick={() => setSelectedPost(null)}
            className="flex items-center gap-2 text-[#1C3F34]/70 hover:text-[#1C3F34] mb-8 font-bold text-sm transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> 
            {isFR ? 'Retour aux Articles' : isDE ? 'Zurück zu den Artikeln' : 'Back to Articles'}
          </button>

          {/* Banner Blog Officiel */}
          <div className="mb-10 p-5 bg-[#E8F1EE] rounded-2xl border border-[#D8CBB7] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#1C3F34] text-white flex items-center justify-center shrink-0">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-[#1C3F34]">Retrouvez nos dossiers complets sur le blog officiel</div>
                <div className="text-[11px] text-[#1C3F34]/70">blog.bloombybotanik.com</div>
              </div>
            </div>
            <a
              href="https://blog.bloombybotanik.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#1C3F34] hover:bg-[#D97706] text-white rounded-xl text-xs font-bold transition-colors shrink-0"
            >
              <span>Visiter le blog officiel</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <header className="mb-12">
            <div className="flex flex-wrap items-center gap-3 text-xs font-black uppercase tracking-widest text-[#D97706] mb-6">
              <span className="bg-[#D97706]/10 px-3 py-1 rounded-full">{selectedPost.category}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#D97706]/30" />
              <span>{new Date(selectedPost.date).toLocaleDateString(lang, { day: 'numeric', month: 'long', year: 'numeric' })}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#D97706]/30" />
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {selectedPost.readTime}</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0F261E] mb-6 leading-tight tracking-tight">
              {selectedPost.title[lang]}
            </h1>
            
            <div className="flex items-center gap-3 p-3 bg-white rounded-2xl border border-[#E7DFD3] inline-flex">
              <div className="w-10 h-10 bg-[#1C3F34]/10 rounded-full flex items-center justify-center text-[#1C3F34]">
                <User className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] font-black uppercase tracking-widest text-[#1C3F34]/50">Rédigé par</div>
                <div className="font-bold text-[#1C3F34] text-sm">{selectedPost.author}</div>
              </div>
            </div>
          </header>

          {selectedPost.image && (
            <div className="relative mb-12 rounded-3xl overflow-hidden shadow-lg border border-[#E7DFD3]">
              <img 
                src={selectedPost.image} 
                alt={selectedPost.title[lang]} 
                className="w-full aspect-[16/9] object-cover" 
              />
            </div>
          )}

          <article className="prose prose-lg max-w-none text-[#0F261E]/85 leading-relaxed space-y-6
            prose-headings:text-[#0F261E] prose-headings:font-black
            prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
            prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
            prose-strong:text-[#1C3F34] prose-strong:font-bold
            prose-ul:list-disc prose-ul:pl-6 prose-li:my-1
            prose-a:text-[#D97706] prose-a:font-bold hover:prose-a:underline">
            <div dangerouslySetInnerHTML={{ __html: selectedPost.content[lang] }} />
          </article>

          {/* Related Articles */}
          {relatedPosts.length > 0 && (
            <div className="mt-20 pt-12 border-t border-[#E7DFD3]">
              <h3 className="text-2xl font-black text-[#0F261E] mb-8">
                {isFR ? "Articles similaires" : "Related Articles"}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map(post => (
                  <div 
                    key={post.slug}
                    onClick={() => {
                      setSelectedPost(post);
                      window.scrollTo(0, 0);
                    }}
                    className="p-6 bg-white rounded-2xl border border-[#E7DFD3] hover:border-[#1C3F34] transition-all cursor-pointer flex flex-col justify-between"
                  >
                    <div>
                      <div className="text-[10px] font-black uppercase text-[#D97706] mb-2">{post.category}</div>
                      <h4 className="font-bold text-[#0F261E] text-base mb-2 line-clamp-2">{post.title[lang]}</h4>
                      <p className="text-xs text-[#0F261E]/70 line-clamp-2 mb-4">{post.excerpt[lang]}</p>
                    </div>
                    <div className="flex items-center gap-1 text-xs font-bold text-[#1C3F34]">
                      <span>Lire l'article</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF7F2] min-h-screen py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* En-tête Page Articles */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#E8F1EE] text-[#1C3F34] text-[10px] font-bold uppercase tracking-widest rounded-md border border-[#D8CBB7]">
            <Compass className="w-3.5 h-3.5 text-[#D97706]" />
            <span>{isFR ? "Le Journal Botanique" : "Botanical Journal"}</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0F261E] tracking-tight">
            {isFR ? "Articles, Guides & Protocoles d'Extraction" : "Articles, Guides & Botanical Protocols"}
          </h1>
          
          <p className="text-base sm:text-lg text-[#0F261E]/70 leading-relaxed">
            {isFR 
              ? "Approfondissez vos connaissances en phytothérapie moderne, extraction du Totum et recettes de terrain." 
              : "Deepen your knowledge of botanical science, Totum extraction and daily recipes."}
          </p>
        </div>

        {/* Bloc Card Mis en Avant : Blog Officiel */}
        <div className="bg-gradient-to-br from-[#1C3F34] to-[#0F261E] text-white rounded-3xl p-8 md:p-12 shadow-xl border border-[#1C3F34] relative overflow-hidden">
          <div className="relative z-10 max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#D97706] text-white text-[10px] font-black uppercase tracking-widest rounded-full">
              <Sparkles className="w-3 h-3" />
              <span>{isFR ? "Blog Officiel Bloom by BotaniK" : "Official Blog"}</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black leading-tight">
              {isFR 
                ? "Dossiers exclusifs & actualités sur blog.bloombybotanik.com" 
                : "Exclusive research & articles on blog.bloombybotanik.com"}
            </h2>
            
            <p className="text-sm sm:text-base text-white/80 leading-relaxed">
              {isFR 
                ? "Retrouvez l'intégralité de nos publications, les retours d'expérience de la communauté et les décryptages scientifiques sur notre plateforme de blog officielle."
                : "Explore our full publications, community feedback, and scientific deep dives on our official blog platform."}
            </p>
            
            <div className="pt-2">
              <a
                href="https://blog.bloombybotanik.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-white text-[#1C3F34] hover:bg-[#D97706] hover:text-white rounded-2xl font-black text-sm transition-all shadow-lg cursor-pointer"
              >
                <span>{isFR ? "Accéder au blog officiel (blog.bloombybotanik.com)" : "Visit official blog"}</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Barre de Recherche et Catégories */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between pt-4">
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === cat 
                    ? 'bg-[#1C3F34] text-white shadow-md' 
                    : 'bg-white text-[#0F261E]/70 border border-[#E7DFD3] hover:border-[#1C3F34]'
                }`}
              >
                {cat === 'all' ? (isFR ? 'Tous les articles' : 'All articles') : cat}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isFR ? "Rechercher un article..." : "Search articles..."}
              className="w-full pl-10 pr-4 py-2.5 bg-white rounded-full border border-[#E7DFD3] text-sm focus:outline-none focus:border-[#1C3F34]"
            />
          </div>
        </div>

        {/* Grille des Articles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map(post => (
            <article 
              key={post.slug}
              onClick={() => {
                setSelectedPost(post);
                window.scrollTo(0, 0);
              }}
              className="bg-white rounded-3xl overflow-hidden border border-[#E7DFD3] shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col group"
            >
              {post.image && (
                <div className="aspect-[16/10] overflow-hidden bg-slate-100">
                  <img 
                    src={post.image} 
                    alt={post.title[lang]} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                </div>
              )}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-[#D97706]">
                    <span className="bg-[#D97706]/10 px-2.5 py-1 rounded-full">{post.category}</span>
                    <span className="text-slate-400 font-medium">{post.readTime}</span>
                  </div>
                  <h2 className="text-lg sm:text-xl font-black text-[#0F261E] group-hover:text-[#1C3F34] transition-colors line-clamp-2">
                    {post.title[lang]}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                    {post.excerpt[lang]}
                  </p>
                </div>
                
                <div className="pt-4 border-t border-[#F3EEE6] flex items-center justify-between text-xs font-bold text-[#1C3F34]">
                  <span>{isFR ? "Lire l'article complet" : "Read full article"}</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </div>
  );
}
