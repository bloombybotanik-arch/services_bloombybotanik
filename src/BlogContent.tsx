import React from 'react';
import { translations, Language } from './translations';
import { Calendar, User, Tag, ChevronRight, ArrowLeft, Clock } from 'lucide-react';
import { blogPosts } from './data/blogPosts';

export default function BlogContent({ lang, onNavigate, initialSlug }: { lang: Language, onNavigate: (view: any) => void, initialSlug?: string }) {
  const [selectedPost, setSelectedPost] = React.useState<any | null>(null);

  React.useEffect(() => {
    if (initialSlug) {
      const match = blogPosts.find(p => p.slug === initialSlug);
      if (match) {
        setSelectedPost(match);
      }
    }
  }, [initialSlug]);

  if (selectedPost) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-24 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <button 
          onClick={() => {
            setSelectedPost(null);
            onNavigate('blog');
          }}
          className="flex items-center gap-2 text-botanik-green/60 hover:text-botanik-green mb-12 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> {lang === 'fr' ? 'Retour aux articles' : lang === 'en' ? 'Back to articles' : 'Zurück zu den Artikeln'}
        </button>
        
        <div className="mb-12">
          <div className="flex items-center gap-4 text-xs font-black uppercase tracking-widest text-botanik-orange mb-6">
            <span>{selectedPost.category}</span>
            <span className="w-1 h-1 rounded-full bg-botanik-orange/20" />
            <span>{new Date(selectedPost.date).toLocaleDateString(lang)}</span>
            <span className="w-1 h-1 rounded-full bg-botanik-orange/20" />
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {selectedPost.readTime}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-botanik-green mb-8 leading-tight">
            {selectedPost.title[lang]}
          </h1>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-botanik-green/5 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-botanik-green" />
            </div>
            <span className="font-bold text-botanik-green text-sm">{selectedPost.author}</span>
          </div>
        </div>

        {selectedPost.image && (
          <img src={selectedPost.image} alt={selectedPost.title[lang]} className="w-full aspect-video object-cover rounded-[40px] mb-12 shadow-xl" />
        )}

        <div className="prose prose-lg prose-botanik max-w-none prose-headings:text-botanik-green prose-p:text-botanik-green/70 prose-strong:text-botanik-green prose-a:text-botanik-orange prose-a:no-underline hover:prose-a:underline">
          <div dangerouslySetInnerHTML={{ __html: selectedPost.content[lang] }} />
        </div>

        <div className="mt-24 p-12 bg-[#F9F9F7] rounded-[40px] border border-botanik-green/5 text-center">
          <h3 className="text-2xl font-bold text-botanik-green mb-4">
            {lang === 'fr' ? "Envie d'aller plus loin ?" : lang === 'en' ? "Want to go further?" : "Möchten Sie weiter gehen?"}
          </h3>
          <p className="text-botanik-green/60 mb-8 max-w-lg mx-auto">
            {lang === 'fr' 
              ? "Découvrez BloomLab, l'extracteur botanique qui transforme votre cuisine en laboratoire de précision." 
              : lang === 'en'
              ? "Discover BloomLab, the botanical extractor that turns your kitchen into a precision laboratory."
              : "Entdecken Sie BloomLab, den botanischen Extraktor, der Ihre Küche in ein Präzisionslabor verwandelt."}
          </p>
          <button 
            onClick={() => onNavigate('machine')}
            className="px-8 py-4 bg-botanik-green text-white rounded-2xl font-bold hover:bg-botanik-green/90 transition-all shadow-lg"
          >
            {lang === 'fr' ? 'Découvrir BloomLab' : lang === 'en' ? 'Discover BloomLab' : 'BloomLab entdecken'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-24 animate-in fade-in duration-700">
      <div className="text-center mb-24">
        <h1 className="text-4xl md:text-7xl font-bold text-botanik-green mb-8">
          {lang === 'fr' ? 'Journal Botanique' : lang === 'en' ? 'Botanical Journal' : 'Botanisches Journal'}
        </h1>
        <p className="text-xl text-botanik-green/60 max-w-2xl mx-auto leading-relaxed">
          {lang === 'fr'
            ? "Exploration scientifique, tutoriels et réflexions sur le travail du terrain et l'extraction botanique de précision."
            : lang === 'en'
            ? "Scientific exploration, tutorials, and reflections on field work and precision botanical extraction."
            : "Wissenschaftliche Erkundung, Tutorials und Reflexionen über die Feldarbeit und die botanische Präzisionsextraktion."}
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
        {blogPosts.map((post) => (
          <article 
            key={post.slug}
            className="group cursor-pointer bg-white rounded-[40px] border border-botanik-green/5 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col"
            onClick={() => {
              setSelectedPost(post);
              window.scrollTo(0, 0);
              window.history.pushState({}, '', `${lang === 'fr' ? '' : '/' + lang}/blog?post=${post.slug}`);
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
