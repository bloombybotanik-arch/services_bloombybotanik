import React from 'react';
import { translations, Language } from './translations';
import { Calendar, User, Tag, ChevronRight, ArrowLeft } from 'lucide-react';

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  tag: string;
  image: string;
}

export default function BlogContent({ lang, onNavigate }: { lang: Language, onNavigate: (view: any) => void }) {
  const [selectedPost, setSelectedPost] = React.useState<BlogPost | null>(null);

  const posts: BlogPost[] = [
    {
      slug: 'extraction-totum-plantes-medicinales',
      title: "L'extraction du Totum : Pourquoi la précision thermique change tout",
      excerpt: "Découvrez pourquoi extraire l'ensemble des principes actifs d'une plante (le Totum) est plus efficace qu'un isolat chimique, et comment la basse température préserve cette synergie.",
      date: '2026-08-01',
      author: 'Équipe Bloom',
      tag: 'Science & Botanique',
      image: 'https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?auto=format&fit=crop&q=80&w=800',
      content: `
        <h2>Qu'est-ce que le Totum d'une plante ?</h2>
        <p>Le <strong>Totum</strong> représente l'intégralité des substances actives contenues dans une plante. Contrairement à la pharmacologie moderne qui cherche souvent à isoler une seule molécule (le principe actif), la phytothérapie traditionnelle et moderne s'appuie sur la synergie de tous les constituants : huiles essentielles, flavonoïdes, tanins, minéraux...</p>
        
        <h2>L'importance de la précision thermique</h2>
        <p>Pour extraire ce Totum sans le dégrader, la température est le facteur clé. Une chaleur trop élevée détruit les enzymes et oxyde les principes actifs fragiles. C'est ici que l'<strong>extraction botanique de précision</strong> intervient.</p>
        
        <p>Avec BloomLab, vous maîtrisez l'<strong>extraction basse température</strong> au degré près. Que ce soit pour une macération huileuse ou une infusion aqueuse, la régularité thermique permet d'obtenir un remède d'une qualité constante, proche de celle des laboratoires professionnels.</p>
        
        <h2>Vers une souveraineté sanitaire</h2>
        <p>Produire ses propres <strong>remèdes de plantes</strong> à la maison n'est pas seulement une question de bien-être, c'est un acte de <strong>souveraineté sanitaire</strong>. En comprenant comment extraire le meilleur de la nature, vous reprenez le pouvoir sur votre santé quotidienne.</p>
        
        <p><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('machine'); }}>Découvrez comment BloomLab® vous offre toutes les clés pour réaliser vos propres remèdes naturels.</a></p>
      `
    },
    {
      slug: 'microbiome-inflammation-chronique-plantes',
      title: "Microbiome et Inflammation Chronique : Le rôle des plantes médicinales",
      excerpt: "Comment le travail du terrain par la phytothérapie peut aider à réguler l'inflammation systémique et soutenir votre santé intestinale.",
      date: '2026-07-25',
      author: 'Équipe Bloom',
      tag: 'Santé Intégrative',
      image: 'https://images.unsplash.com/photo-1540331547168-8b63109225b7?auto=format&fit=crop&q=80&w=800',
      content: `
        <h2>Le travail du terrain : Une approche systémique</h2>
        <p>En phytothérapie, on ne traite pas seulement un symptôme, on effectue un <strong>travail du terrain</strong>. L'inflammation chronique est souvent le signe d'un terrain déséquilibré, souvent lié à l'état de notre <strong>microbiome</strong>.</p>
        
        <h2>Plantes et inflammation</h2>
        <p>Certaines <strong>plantes médicinales</strong> comme le curcuma, le gingembre ou la reine-des-prés possèdent des propriétés modulatrices exceptionnelles. Cependant, leur biodisponibilité dépend de la méthode d'extraction.</p>
        
        <p>L'utilisation d'un <strong>infuseur botanique</strong> comme BloomLab permet de réaliser des émulsions et des macérations qui optimisent la libération de ces composés actifs. Par exemple, une extraction précise dans une huile végétale de qualité peut grandement améliorer l'absorption des curcuminoïdes.</p>
        
        <h2>Accompagner les maladies auto-immunes</h2>
        <p>Bien que les plantes ne remplacent pas un traitement médical, elles constituent un soutien précieux pour la <strong>santé de la peau</strong> et la gestion de l'inflammation globale rencontrée dans les <strong>maladies auto-immunes</strong>. Une approche douce et régulière permet de stabiliser le terrain sur le long terme.</p>
      `
    },
    {
      slug: 'guide-debutant-remedes-naturels-maison',
      title: "Guide : Réussir ses premiers remèdes naturels avec l'extracteur botanique",
      excerpt: "De la décarboxylation à la stérilisation, apprenez les étapes essentielles pour créer vos propres sérums et baumes de qualité laboratoire.",
      date: '2026-07-15',
      author: 'Équipe Bloom',
      tag: 'Tutoriel',
      image: 'https://images.unsplash.com/photo-1611080626919-7cf5a9caab53?auto=format&fit=crop&q=80&w=800',
      content: `
        <h2>Pourquoi choisir l'extraction domestique ?</h2>
        <p><strong>Faites fleurir toutes vos envies de bien-être végétal.</strong> Faire ses propres soins permet de contrôler l'origine des ingrédients et d'éviter les conservateurs synthétiques. C'est le début de votre <strong>soin naturel</strong> sur mesure.</p>
        
        <h2>Les étapes clés de la précision</h2>
        <ul>
          <li><strong>Décarboxylation :</strong> Essentielle pour activer certains composés avant l'extraction.</li>
          <li><strong>Macération :</strong> Le temps long, respecté par une agitation constante et une température stable.</li>
          <li><strong>Stérilisation :</strong> Pour garantir la conservation et la sécurité de vos produits.</li>
        </ul>
        
        <p>BloomLab simplifie ces processus complexes. Une place pour chaque plante et chaque plante à sa place. Nos équipes vous accompagnent dans votre projet de soins sur mesure grâce aux protocoles pré-enregistrés.</p>
        
        <h2>Baumes et Sérums : Par où commencer ?</h2>
        <p>Nous recommandons de commencer par un sérum huileux simple à base de calendula ou de lavande. C'est une excellente introduction à la <strong>précision thermique</strong> et à la satisfaction de créer soi-même.</p>
        
        <p><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('boutique'); }}>Parcourez nos kits et trouvez l'infuseur botanique N°1 en France.</a></p>
      `
    },
    {
      slug: 'art-emulsion-botanique-precision-thermique',
      title: "L'Art de l'Émulsion Botanique : Pourquoi la précision thermique est reine",
      excerpt: "Maîtrisez la création de crèmes et laits botaniques stables. Découvrez l'importance de la décarboxylation et de la stérilisation dans vos soins naturels.",
      date: '2026-08-10',
      author: 'Équipe Bloom',
      tag: 'Cosmétique Avancée',
      image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&q=80&w=800',
      content: `
        <h2>L'émulsion : La rencontre de l'eau et de l'huile</h2>
        <p>Réaliser une <strong>émulsion</strong> stable est le graal de la cosmétique maison. Pour que vos soins naturels ne se déphasent pas, la maîtrise de la température au moment du mélange est cruciale. C'est ici que l'<strong>extracteur botanique</strong> BloomLab® se transforme en assistant de laboratoire de haute précision.</p>
        
        <h2>Précision thermique et actifs thermolabiles</h2>
        <p>De nombreux principes actifs du <strong>totum</strong> végétal sont dits \"thermolabiles\" : ils se dégradent s'ils sont chauffés trop fort ou trop longtemps. Notre technologie d'<strong>extraction basse température</strong> garantit que vos huiles végétales et sérums conservent toute leur puissance biologique.</p>
        
        <h2>Souveraineté et Qualité Laboratoire</h2>
        <p>En maîtrisant la <strong>stérilisation</strong> et la précision thermique ±0,5°C, vous atteignez une qualité de soin professionnelle. <strong>BloomLab® vous offre toutes les clés pour réaliser vos propres remèdes naturels.</strong> Une place pour chaque plante et chaque plante à sa place.</p>
        
        <p>Nos équipes vous accompagnent dans votre projet de soins sur mesure. <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('manifeste'); }}>Découvrez notre manifeste pour comprendre notre vision de l'herboristerie moderne.</a></p>
      `
    }
  ];

  if (selectedPost) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-24 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <button 
          onClick={() => setSelectedPost(null)}
          className="flex items-center gap-2 text-botanik-green/60 hover:text-botanik-green mb-12 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Retour aux articles
        </button>
        
        <div className="mb-12">
          <div className="flex items-center gap-4 text-xs font-black uppercase tracking-widest text-botanik-orange mb-6">
            <span>{selectedPost.tag}</span>
            <span className="w-1 h-1 rounded-full bg-botanik-orange/20" />
            <span>{new Date(selectedPost.date).toLocaleDateString()}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-botanik-green mb-8 leading-tight">
            {selectedPost.title}
          </h1>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-botanik-green/5 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-botanik-green" />
            </div>
            <span className="font-bold text-botanik-green text-sm">{selectedPost.author}</span>
          </div>
        </div>

        <img src={selectedPost.image} alt={selectedPost.title} className="w-full aspect-video object-cover rounded-[40px] mb-12 shadow-xl" />

        <div className="prose prose-lg prose-botanik max-w-none prose-headings:text-botanik-green prose-p:text-botanik-green/70 prose-strong:text-botanik-green prose-a:text-botanik-orange prose-a:no-underline hover:prose-a:underline">
          <div dangerouslySetInnerHTML={{ __html: selectedPost.content }} />
        </div>

        <div className="mt-24 p-12 bg-[#F9F9F7] rounded-[40px] border border-botanik-green/5 text-center">
          <h3 className="text-2xl font-bold text-botanik-green mb-4">Envie d'aller plus loin ?</h3>
          <p className="text-botanik-green/60 mb-8 max-w-lg mx-auto">Découvrez BloomLab, l'extracteur botanique qui transforme votre cuisine en laboratoire de précision.</p>
          <button 
            onClick={() => onNavigate('machine')}
            className="px-8 py-4 bg-botanik-green text-white rounded-2xl font-bold hover:bg-botanik-green/90 transition-all shadow-lg"
          >
            Découvrir BloomLab
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-24 animate-in fade-in duration-700">
      <div className="text-center mb-24">
        <h1 className="text-4xl md:text-7xl font-bold text-botanik-green mb-8">Journal Botanique</h1>
        <p className="text-xl text-botanik-green/60 max-w-2xl mx-auto leading-relaxed">
          Exploration scientifique, tutoriels et réflexions sur le <strong>travail du terrain</strong> et l'<strong>extraction botanique de précision</strong>.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
        {posts.map((post) => (
          <article 
            key={post.slug}
            className="group cursor-pointer bg-white rounded-[40px] border border-botanik-green/5 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
            onClick={() => {
              setSelectedPost(post);
              window.scrollTo(0, 0);
            }}
          >
            <div className="aspect-[4/3] overflow-hidden">
              <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="p-8">
              <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-botanik-orange mb-4">
                <Tag className="w-3 h-3" />
                <span>{post.tag}</span>
              </div>
              <h3 className="text-xl font-bold text-botanik-green mb-4 leading-tight group-hover:text-botanik-orange transition-colors">
                {post.title}
              </h3>
              <p className="text-sm text-botanik-green/60 mb-6 line-clamp-3">
                {post.excerpt}
              </p>
              <div className="flex items-center justify-between mt-auto pt-6 border-t border-botanik-green/5">
                <div className="flex items-center gap-2">
                  <Calendar className="w-3 h-3 text-botanik-green/40" />
                  <span className="text-[10px] font-bold text-botanik-green/40 uppercase tracking-widest">{new Date(post.date).toLocaleDateString()}</span>
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
