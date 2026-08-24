import React from 'react';
import { translations, Language } from './translations';
import { Calendar, User, Tag, ChevronRight, ArrowLeft, Clock } from 'lucide-react';
import { blogPosts } from './data/blogPosts';

export default function BlogContent({ lang, onNavigate, initialSlug }: { lang: Language, onNavigate: (view: any, productId?: string) => void, initialSlug?: string }) {
  const [selectedPost, setSelectedPost] = React.useState<any | null>(null);

  React.useEffect(() => {
    if (initialSlug) {
      const match = blogPosts.find(p => p.slug === initialSlug);
      if (match) {
        setSelectedPost(match);
      }
    }
  }, [initialSlug]);

  const t = translations[lang];

  if (selectedPost) {
    const relatedPosts = blogPosts.filter(p => p.slug !== selectedPost.slug).slice(0, 2);

    return (
      <div className="bg-[#F9F9F7] min-h-screen">
        {/* Progress Bar */}
        <div className="fixed top-0 left-0 right-0 h-1 bg-botanik-orange/10 z-[100]">
          <div className="h-full bg-botanik-orange transition-all duration-300" style={{ width: '0%' }} id="reading-progress" />
        </div>

        <div className="max-w-4xl mx-auto px-6 py-24 animate-in fade-in slide-in-from-bottom-4 duration-700">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-botanik-green/40 mb-12">
            <button onClick={() => onNavigate('home')} className="hover:text-botanik-green transition-colors uppercase">Accueil</button>
            <ChevronRight className="w-3 h-3" />
            <button onClick={() => { setSelectedPost(null); onNavigate('blog'); }} className="hover:text-botanik-green transition-colors uppercase">{lang === 'fr' ? 'Journal' : 'Journal'}</button>
            <ChevronRight className="w-3 h-3" />
            <span className="text-botanik-orange truncate max-w-[200px]">{selectedPost.title[lang]}</span>
          </nav>

          <button 
            onClick={() => {
              setSelectedPost(null);
              onNavigate('blog');
            }}
            className="flex items-center gap-2 text-botanik-green/60 hover:text-botanik-green mb-12 transition-colors group text-sm font-bold"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> 
            {lang === 'fr' ? 'Retour au Journal Botanique' : lang === 'en' ? 'Back to Botanical Journal' : 'Zurück zum Journal'}
          </button>
          
          <header className="mb-16">
            <div className="flex items-center gap-4 text-xs font-black uppercase tracking-widest text-botanik-orange mb-8">
              <span className="bg-botanik-orange/10 px-3 py-1 rounded-full">{selectedPost.category}</span>
              <span className="w-1 h-1 rounded-full bg-botanik-orange/20" />
              <span>{new Date(selectedPost.date).toLocaleDateString(lang, { day: 'numeric', month: 'long', year: 'numeric' })}</span>
              <span className="w-1 h-1 rounded-full bg-botanik-orange/20" />
              <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {selectedPost.readTime}</span>
            </div>
            <h1 className="text-4xl md:text-7xl font-bold text-botanik-green mb-10 leading-[1.1] tracking-tight">
              {selectedPost.title[lang]}
            </h1>
            <div className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-botanik-green/5 inline-flex">
              <div className="w-12 h-12 bg-botanik-green/5 rounded-full flex items-center justify-center border border-botanik-green/10">
                <User className="w-6 h-6 text-botanik-green" />
              </div>
              <div>
                <div className="text-[10px] font-black uppercase tracking-widest text-botanik-green/40 mb-0.5">Rédigé par</div>
                <div className="font-bold text-botanik-green text-base">{selectedPost.author}</div>
              </div>
            </div>
          </header>

          {selectedPost.image && (
            <div className="relative group mb-16">
              <img src={selectedPost.image} alt={selectedPost.title[lang]} className="w-full aspect-[21/9] object-cover rounded-[40px] shadow-2xl transition-transform duration-700 group-hover:scale-[1.01]" />
              <div className="absolute inset-0 rounded-[40px] ring-1 ring-inset ring-black/10" />
            </div>
          )}

          <article className="prose prose-xl prose-botanik max-w-none 
            prose-headings:text-botanik-green prose-headings:font-bold prose-headings:tracking-tight
            prose-p:text-botanik-green/80 prose-p:leading-relaxed
            prose-strong:text-botanik-green prose-strong:font-black
            prose-ul:text-botanik-green/70
            prose-a:text-botanik-orange prose-a:font-bold prose-a:no-underline hover:prose-a:underline
            prose-img:rounded-[32px] prose-img:shadow-lg">
            <div dangerouslySetInnerHTML={{ __html: selectedPost.content[lang] }} />
          </article>

          {/* CTA Section */}
          <div className="mt-24 p-12 bg-botanik-green rounded-[48px] text-center relative overflow-hidden shadow-2xl group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:bg-white/10 transition-colors" />
            <div className="relative z-10">
              <span className="inline-block px-4 py-1.5 bg-white/10 text-white text-[10px] font-black uppercase tracking-widest rounded-full mb-8">Souveraineté Sanitaire</span>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                {lang === 'fr' ? "Passez de la tisane à l'extraction de précision." : "Switch from tea to precision extraction."}
              </h2>
              <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto leading-relaxed">
                {lang === 'fr' 
                  ? "Rejoignez les milliers de passionnés qui utilisent BloomLab® pour libérer le plein potentiel de leurs plantes médicinales." 
                  : "Join thousands of enthusiasts using BloomLab® to unlock the full potential of their medicinal plants."}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button 
                  onClick={() => onNavigate('machine')}
                  className="px-10 py-5 bg-botanik-orange text-white rounded-2xl font-bold hover:bg-botanik-orange/90 transition-all shadow-xl hover:scale-105 active:scale-95"
                >
                  {lang === 'fr' ? 'Découvrir BloomLab®' : 'Discover BloomLab®'}
                </button>
                <button 
                  onClick={() => onNavigate('boutique')}
                  className="px-10 py-5 bg-white/10 text-white rounded-2xl font-bold hover:bg-white/20 transition-all border border-white/10"
                >
                  {lang === 'fr' ? 'Voir la Boutique' : 'Visit Shop'}
                </button>
              </div>
            </div>
          </div>

          {/* Related Posts */}
          <div className="mt-32 border-t border-botanik-green/10 pt-24">
            <h3 className="text-2xl font-bold text-botanik-green mb-12 flex items-center gap-3">
              <Tag className="w-6 h-6 text-botanik-orange" />
              {lang === 'fr' ? 'Articles Similaires' : 'Related Articles'}
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              {relatedPosts.map((post) => (
                <div 
                  key={post.slug}
                  onClick={() => {
                    setSelectedPost(post);
                    onNavigate('blog', post.slug);
                    window.scrollTo(0, 0);
                  }}
                  className="group cursor-pointer bg-white p-6 rounded-[32px] border border-botanik-green/5 shadow-sm hover:shadow-xl transition-all duration-500"
                >
                  <div className="text-[10px] font-black uppercase tracking-widest text-botanik-orange mb-3">{post.category}</div>
                  <h4 className="text-xl font-bold text-botanik-green mb-4 group-hover:text-botanik-orange transition-colors leading-tight">{post.title[lang]}</h4>
                  <div className="flex items-center justify-between text-xs font-bold text-botanik-green/40">
                    <span>{new Date(post.date).toLocaleDateString(lang)}</span>
                    <div className="flex items-center gap-1 group-hover:text-botanik-orange transition-colors">
                      Lire la suite <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-24 animate-in fade-in duration-700">
      <div className="text-center mb-24">
        <h1 className="text-4xl md:text-7xl font-bold text-botanik-green mb-8">
          {(t.seo.blog as any).h1}
        </h1>
        <p className="text-xl text-botanik-green/60 max-w-2xl mx-auto leading-relaxed">
          {(t.seo.blog as any).intro}
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
        {blogPosts.map((post) => (
          <article 
            key={post.slug}
            className="group cursor-pointer bg-white rounded-[40px] border border-botanik-green/5 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col"
            onClick={() => {
              onNavigate('blog', post.slug);
              window.scrollTo(0, 0);
            }}
          >
            {post.image && (
              <div className="aspect-[4/3] overflow-hidden">
                <img src={post.image} alt={post.title[lang]} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
            )}
            <div className="p-8 flex flex-col flex-1">
              <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-botanik-orange mb-4">
                <Tag className="w-3 h-3" />
                <span>{post.category}</span>
              </div>
              <h3 className="text-xl font-bold text-botanik-green mb-4 leading-tight group-hover:text-botanik-orange transition-colors">
                {post.title[lang]}
              </h3>
              <p className="text-sm text-botanik-green/60 mb-6 line-clamp-3">
                {post.excerpt[lang]}
              </p>
              <div className="flex items-center justify-between mt-auto pt-6 border-t border-botanik-green/5">
                <div className="flex items-center gap-2">
                  <Calendar className="w-3 h-3 text-botanik-green/40" />
                  <span className="text-[10px] font-bold text-botanik-green/40 uppercase tracking-widest">{new Date(post.date).toLocaleDateString(lang)}</span>
                </div>
                <ChevronRight className="w-5 h-5 text-botanik-orange group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
