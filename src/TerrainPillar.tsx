import React, { useMemo } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Leaf, Sparkles, BookOpen, ShoppingBag, Wind, Activity, Zap, ShieldCheck, Heart, Droplets, Flame, Moon } from 'lucide-react';
import { plantsDatabase } from './data/therapeuticData';
import { blogPosts } from './data/blogPosts';
import { getProducts } from './StoreContent';
import { translations, Language } from './translations';
import { OptimizedImage } from './components/OptimizedImage';

interface TerrainPillarProps {
  terrainId: string;
  lang: Language;
  onNavigate: (view: any, id?: string) => void;
}

const TERRAIN_METADATA: Record<string, { 
  name: Record<string, string>;
  description: Record<string, string>;
  icon: any;
  color: string;
  tags: string[]; // Keywords to filter products
}> = {
  'T1': {
    name: { fr: 'Intestin & Microbiome', en: 'Gut & Microbiome', de: 'Darm & Mikrobiom' },
    description: { 
      fr: 'Le socle de votre santé. Travaillez sur la barrière intestinale et l\'équilibre du microbiote.',
      en: 'The foundation of your health. Work on the intestinal barrier and microbiota balance.',
      de: 'Das Fundament Ihrer Gesundheit. Arbeiten Sie an der Darmbarriere und dem Gleichgewicht der Mikrobiota.'
    },
    icon: Droplets,
    color: 'from-blue-50 to-indigo-50',
    tags: ['Digestion', 'Détox']
  },
  'T2': {
    name: { fr: 'Énergie & Mitochondries', en: 'Energy & Mitochondria', de: 'Energie & Mitochondrien' },
    description: { 
      fr: 'Relancez votre vitalité profonde en soutenant la production d\'énergie cellulaire.',
      en: 'Relaunch your deep vitality by supporting cellular energy production.',
      de: 'Beleben Sie Ihre tiefe Vitalität neu, indem Sie die zelluläre Energieproduktion unterstützen.'
    },
    icon: Zap,
    color: 'from-yellow-50 to-orange-50',
    tags: ['Énergie', 'Performance']
  },
  'T3': {
    name: { fr: 'Immunité & Protection', en: 'Immunity & Protection', de: 'Immunität & Schutz' },
    description: { 
      fr: 'Renforcez votre bouclier naturel et la réponse immunitaire systémique.',
      en: 'Strengthen your natural shield and systemic immune response.',
      de: 'Stärken Sie Ihren natürlichen Schutzschild und die systemische Immunantwort.'
    },
    icon: ShieldCheck,
    color: 'from-green-50 to-emerald-50',
    tags: ['Immunité', 'Hiver']
  },
  'T4': {
    name: { fr: 'Axe HPA & Adaptogènes', en: 'HPA Axis & Adaptogens', de: 'HPA-Achse & Adaptogene' },
    description: { 
      fr: 'Régulez la réponse au stress et l\'équilibre hormonal global.',
      en: 'Regulate stress response and overall hormonal balance.',
      de: 'Regulieren Sie die Stressreaktion und das hormonelle Gleichgewicht.'
    },
    icon: Activity,
    color: 'from-purple-50 to-fuchsia-50',
    tags: ['Stress', 'Énergie']
  },
  'T7': {
    name: { fr: 'Psycho-émotionnel & Système Nerveux', en: 'Psycho-emotional & Nervous System', de: 'Psycho-emotional & Nervensystem' },
    description: { 
      fr: 'Apaisez l\'esprit et soutenez la neurochimie pour un équilibre durable.',
      en: 'Soothe the mind and support neurochemistry for sustainable balance.',
      de: 'Beruhigen Sie den Geist und unterstützen Sie die Neurochemie für ein nachhaltiges Gleichgewicht.'
    },
    icon: Wind,
    color: 'from-indigo-50 to-sky-50',
    tags: ['Sommeil', 'Sérénité']
  },
  'T8': {
    name: { fr: 'Inflammation & Réparation', en: 'Inflammation & Repair', de: 'Entzündung & Reparatur' },
    description: { 
      fr: 'Calmez le feu intérieur et favorisez la régénération des tissus.',
      en: 'Soothe the inner fire and promote tissue regeneration.',
      de: 'Beruhigen Sie das innere Feuer und fördern Sie die Geweberegeneration.'
    },
    icon: Flame,
    color: 'from-red-50 to-orange-50',
    tags: ['Mobilité', 'Inflammation']
  },
  'T9': {
    name: { fr: 'Sommeil & Récupération', en: 'Sleep & Recovery', de: 'Schlaf & Erholung' },
    description: { 
      fr: 'Optimisez vos cycles de repos pour une régénération nocturne profonde.',
      en: 'Optimize your rest cycles for deep nocturnal regeneration.',
      de: 'Optimieren Sie Ihre Ruhezyklen für eine tiefe nächtliche Regeneration.'
    },
    icon: Moon,
    color: 'from-slate-50 to-blue-50',
    tags: ['Sommeil']
  },
  'T10': {
    name: { fr: 'Métabolisme & Glycémie', en: 'Metabolism & Blood Sugar', de: 'Stoffwechsel & Blutzucker' },
    description: { 
      fr: 'Équilibrez vos fonctions métaboliques et la gestion de l\'insuline.',
      en: 'Balance your metabolic functions and insulin management.',
      de: 'Gleichen Sie Ihre Stoffwechselfunktionen und das Insulinmanagement aus.'
    },
    icon: Activity,
    color: 'from-emerald-50 to-teal-50',
    tags: ['Métabolisme', 'Digestion']
  }
};

export default function TerrainPillar({ terrainId, lang, onNavigate }: TerrainPillarProps) {
  const metadata = TERRAIN_METADATA[terrainId] || TERRAIN_METADATA['T1'];
  const Icon = metadata.icon;
  const t = translations[lang];

  const filteredPlants = useMemo(() => {
    return plantsDatabase.filter(p => 
      p.terrains_cibles?.some(t => t.startsWith(terrainId))
    );
  }, [terrainId]);

  const filteredPosts = useMemo(() => {
    // Basic mapping for now, using title search since tags might be empty
    return blogPosts.filter(post => 
      post.title.fr.toLowerCase().includes(metadata.name.fr.toLowerCase()) || 
      metadata.tags.some(mt => post.title.fr.toLowerCase().includes(mt.toLowerCase())) ||
      (post as any).tags?.some((tag: string) => tag.toLowerCase().includes(metadata.name.fr.toLowerCase()))
    );
  }, [terrainId, metadata]);

  const filteredProducts = useMemo(() => {
    const products = getProducts(lang);
    return products.filter(p => 
      p.tags?.some(tag => metadata.tags.includes(tag)) || p.id === 'bloomlab'
    );
  }, [terrainId, metadata, lang]);

  return (
    <div className="min-h-screen bg-botanik-bg">
      {/* Hero Section */}
      <section className={`relative py-24 px-6 overflow-hidden bg-gradient-to-br ${metadata.color}`}>
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/50 backdrop-blur-sm rounded-full border border-white/50 mb-8">
              <Icon className="w-5 h-5 text-botanik-green" />
              <span className="text-xs font-bold uppercase tracking-widest text-botanik-green">Terrain {terrainId}</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-botanik-green mb-8 leading-[1.1]">
              {metadata.name[lang]}
            </h1>
            <p className="text-xl text-botanik-green/70 leading-relaxed">
              {metadata.description[lang]}
            </p>
          </motion.div>
        </div>
        
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-white/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[400px] h-[400px] bg-botanik-orange/5 rounded-full blur-3xl" />
      </section>

      <div className="max-w-7xl mx-auto px-6 py-20 space-y-32">
        {/* Associated Plants */}
        <section>
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-botanik-green mb-4">L'Herbier de Précision</h2>
              <p className="text-botanik-green/60">Les plantes maîtresses pour réguler ce terrain.</p>
            </div>
            <button 
              onClick={() => onNavigate('library-landing')}
              className="text-botanik-orange font-bold text-sm flex items-center gap-2 group"
            >
              Voir tout l'herbier <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPlants.map((plant, idx) => (
              <motion.div
                key={plant.plant_id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                onClick={() => onNavigate('library-landing', plant.plant_id)}
                className="group cursor-pointer bg-white p-8 rounded-[40px] border border-botanik-green/5 hover:border-botanik-orange/20 transition-all shadow-sm hover:shadow-xl"
              >
                <div className="w-12 h-12 bg-botanik-bg rounded-2xl flex items-center justify-center mb-6 group-hover:bg-botanik-orange/10 transition-colors">
                  <Leaf className="w-6 h-6 text-botanik-green group-hover:text-botanik-orange transition-colors" />
                </div>
                <h3 className="text-2xl font-bold text-botanik-green mb-2">{plant.nom_commun}</h3>
                <p className="text-sm text-botanik-green/40 italic mb-4">{plant.nom_latin}</p>
                <p className="text-botanik-green/60 text-sm line-clamp-3 mb-8">{plant.preuve_scientifique}</p>
                <div className="flex items-center gap-2 text-botanik-orange font-bold text-xs uppercase tracking-widest">
                  Découvrir l'extraction <ArrowRight className="w-4 h-4" />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Associated Products */}
        <section className="bg-botanik-green rounded-[64px] p-12 md:p-20 text-white relative overflow-hidden">
          <div className="relative z-10">
            <div className="max-w-2xl mb-16">
              <h2 className="text-4xl font-bold mb-6">Outils & Protocoles</h2>
              <p className="text-white/60">Équipez votre laboratoire personnel avec les solutions adaptées à votre terrain.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <div 
                  key={product.id}
                  onClick={() => onNavigate('product-detail', product.id)}
                  className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[32px] p-8 hover:bg-white/10 transition-all cursor-pointer group"
                >
                  <div className="aspect-square rounded-2xl overflow-hidden mb-6">
                    <OptimizedImage src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  </div>
                  <h4 className="text-xl font-bold mb-2">{product.name}</h4>
                  <p className="text-sm text-white/60 mb-6 line-clamp-2">{product.subtitle}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-bold">{product.price.toFixed(2)} €</span>
                    <div className="w-10 h-10 bg-botanik-orange rounded-full flex items-center justify-center">
                      <ShoppingBag className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-botanik-orange/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        </section>

        {/* Associated Blog Posts */}
        {filteredPosts.length > 0 && (
          <section>
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-botanik-green mb-4">Science & Pédagogie</h2>
              <p className="text-botanik-green/60">Approfondissez votre compréhension du terrain {terrainId}.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredPosts.map((post) => (
                <div 
                  key={post.slug}
                  onClick={() => onNavigate('blog', post.slug)}
                  className="group cursor-pointer flex flex-col md:flex-row bg-white rounded-[40px] overflow-hidden border border-botanik-green/5 hover:border-botanik-orange/20 transition-all shadow-sm"
                >
                  <div className="md:w-1/3 aspect-[4/3] md:aspect-auto">
                    <OptimizedImage src={post.image} alt={post.title[lang]} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-8 md:w-2/3 flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-4">
                      <BookOpen className="w-4 h-4 text-botanik-orange" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-botanik-green/40">{post.category}</span>
                    </div>
                    <h4 className="text-xl font-bold text-botanik-green mb-4 group-hover:text-botanik-orange transition-colors">{post.title[lang]}</h4>
                    <p className="text-sm text-botanik-green/60 mb-6 line-clamp-2">{post.excerpt[lang]}</p>
                    <div className="text-botanik-green font-bold text-xs flex items-center gap-2">
                      Lire l'article <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
