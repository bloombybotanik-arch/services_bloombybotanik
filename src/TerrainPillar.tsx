import React, { useMemo } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Leaf, Sparkles, BookOpen, ShoppingBag, ShieldAlert } from 'lucide-react';
import { plantsDatabase } from './data/therapeuticData';
import { blogPosts } from './data/blogPosts';
import { getProducts } from './StoreContent';
import { Language } from './translations';
import { OptimizedImage } from './components/OptimizedImage';
import { PUBLIC_TERRAINS, resolveTerrainCode, TERRAIN_EDITORIAL_NOTICE } from './data/terrainMapping';

interface TerrainPillarProps {
  terrainId: string;
  lang: Language;
  onNavigate: (view: any, id?: string) => void;
}

export default function TerrainPillar({ terrainId, lang, onNavigate }: TerrainPillarProps) {
  // Resolve legacy codes or aliases to the official 9 public terrains (T1..T9)
  const resolved = resolveTerrainCode(terrainId);
  const activeCode = resolved.code || (terrainId?.toUpperCase() === 'T10' ? 'T5' : 'T1');
  const currentTerrain = PUBLIC_TERRAINS.find(p => p.code === activeCode) || PUBLIC_TERRAINS[0];
  const Icon = currentTerrain.icon;

  const filteredPlants = useMemo(() => {
    return plantsDatabase.filter(p => {
      // 1. Direct target mapping
      const hasDirectTarget = p.terrains_cibles?.some(t => {
        const res = resolveTerrainCode(t);
        return res.code === currentTerrain.code;
      });
      if (hasDirectTarget) return true;

      // 2. Fallback semantic match for T5 (Métabolisme) to ensure complete botanical representation
      if (currentTerrain.code === 'T5') {
        const text = `${p.nom_commun} ${p.nom_latin} ${p.preuve_scientifique || ''} ${p.famille_bloom || ''}`.toLowerCase();
        if (text.includes('métaboli') || text.includes('metaboli') || text.includes('glycém') || text.includes('glycem') || text.includes('insul') || text.includes('berbérine')) {
          return true;
        }
      }
      return false;
    });
  }, [currentTerrain.code]);

  const filteredPosts = useMemo(() => {
    return blogPosts.filter(post => {
      const titleLower = (post.title[lang] || post.title.fr).toLowerCase();
      const excerptLower = (post.excerpt[lang] || post.excerpt.fr).toLowerCase();
      return (
        titleLower.includes(currentTerrain.label[lang].toLowerCase()) ||
        titleLower.includes(currentTerrain.label.fr.toLowerCase()) ||
        currentTerrain.publicKeywords.some(kw => titleLower.includes(kw.toLowerCase()) || excerptLower.includes(kw.toLowerCase()))
      );
    });
  }, [currentTerrain, lang]);

  const filteredProducts = useMemo(() => {
    const products = getProducts(lang);
    return products.filter(p => 
      p.tags?.some(tag => currentTerrain.productTags.some(pt => pt.toLowerCase() === tag.toLowerCase())) ||
      p.id === 'bloomlab'
    );
  }, [currentTerrain, lang]);

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      {/* Top 9-Terrains Navigation Switcher */}
      <div className="bg-white border-b border-botanik-green/10 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between gap-4 overflow-x-auto no-scrollbar">
          <button
            onClick={() => onNavigate('library-landing')}
            className="text-xs font-bold text-botanik-green/60 hover:text-botanik-green shrink-0 flex items-center gap-1.5 transition-colors pr-2 border-r border-botanik-green/15"
          >
            ← Retour navigation
          </button>
          <div className="flex items-center gap-2 shrink-0">
            {PUBLIC_TERRAINS.map((pt) => {
              const isSelected = pt.code === currentTerrain.code;
              return (
                <button
                  key={pt.code}
                  onClick={() => onNavigate('terrain', pt.code)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-botanik-green text-white shadow-sm'
                      : 'bg-[#FAF7F2] text-botanik-green/75 hover:bg-botanik-green/10 hover:text-botanik-green border border-[#D8CBB7]/40'
                  }`}
                >
                  <span>{pt.code}</span>
                  <span className="opacity-40">•</span>
                  <span>{pt.label[lang]}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className={`relative py-20 px-6 overflow-hidden bg-gradient-to-br ${currentTerrain.gradient} border-b border-botanik-green/10`}>
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/70 backdrop-blur-sm rounded-full border border-botanik-green/15 mb-6 shadow-xs">
              <Icon className="w-4 h-4 text-botanik-green" />
              <span className="text-[11px] font-black uppercase tracking-widest text-botanik-green">
                Terrain {currentTerrain.code} • {currentTerrain.label[lang]}
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-botanik-green mb-6 leading-[1.05] tracking-tight">
              {currentTerrain.label[lang]}
            </h1>
            
            <p className="text-lg md:text-xl text-botanik-green/80 leading-relaxed font-serif italic mb-6">
              {currentTerrain.publicDescription[lang]}
            </p>

            {/* Note éditoriale de cadrage & non-diagnostic */}
            <div className="p-4 rounded-2xl bg-white/80 backdrop-blur-sm border border-botanik-green/15 text-xs text-botanik-green/75 max-w-2xl flex items-start gap-3 shadow-xs">
              <ShieldAlert className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
              <p>
                <strong className="text-botanik-green font-semibold">Cadrage éditorial : </strong>
                {TERRAIN_EDITORIAL_NOTICE[lang]}
              </p>
            </div>
          </motion.div>
        </div>
        
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-white/40 rounded-full blur-3xl pointer-events-none" />
      </section>

      <div className="max-w-7xl mx-auto px-6 py-16 md:py-20 space-y-24">
        {/* Associated Plants */}
        <section>
          <div className="flex items-end justify-between mb-10">
            <div>
              <div className="text-[10px] font-black uppercase tracking-widest text-[#D97706] mb-2">Botanique & Totum</div>
              <h2 className="text-3xl font-bold text-botanik-green mb-2">L'Herbier de Précision • {currentTerrain.label[lang]}</h2>
              <p className="text-botanik-green/60 text-sm md:text-base">
                {filteredPlants.length} plante{filteredPlants.length > 1 ? 's' : ''} associée{filteredPlants.length > 1 ? 's' : ''} à ce terrain éditorial.
              </p>
            </div>
            <button 
              onClick={() => onNavigate('library-landing')}
              className="text-[#D97706] hover:text-botanik-green font-bold text-sm flex items-center gap-2 group transition-colors"
            >
              Voir tout l'herbier <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredPlants.map((plant, idx) => (
              <motion.div
                key={plant.plant_id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(idx * 0.05, 0.3) }}
                viewport={{ once: true }}
                onClick={() => onNavigate('library-landing', plant.plant_id)}
                className="group cursor-pointer bg-white p-7 rounded-[32px] border border-botanik-green/10 hover:border-botanik-green/30 transition-all shadow-sm hover:shadow-xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 bg-[#FAF7F2] rounded-2xl flex items-center justify-center group-hover:bg-[#1C3F34] text-[#1C3F34] group-hover:text-white transition-all shadow-xs border border-[#D8CBB7]/30">
                      <Leaf className="w-5 h-5 transition-colors" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-botanik-green/50 bg-botanik-green/5 px-2.5 py-1 rounded-full">
                      {currentTerrain.code}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-botanik-green mb-1 group-hover:text-[#1C3F34] transition-colors">
                    {plant.nom_commun}
                  </h3>
                  <p className="text-xs text-botanik-green/50 italic mb-4">{plant.nom_latin}</p>
                  <p className="text-botanik-green/70 text-xs md:text-sm line-clamp-3 mb-6 leading-relaxed">
                    {plant.preuve_scientifique}
                  </p>
                </div>

                <div className="pt-4 border-t border-botanik-green/5 flex items-center justify-between text-xs font-bold text-[#D97706] group-hover:text-botanik-green transition-colors">
                  <span>Découvrir l'extraction</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Associated Products */}
        <section className="bg-[#0F261E] rounded-[40px] md:rounded-[48px] p-8 md:p-14 text-white relative overflow-hidden shadow-2xl">
          <div className="relative z-10">
            <div className="max-w-2xl mb-12">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#D97706] mb-3 inline-block">
                Protocoles & Solutions
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Équipements & Protocoles Ciblés</h2>
              <p className="text-white/70 text-sm md:text-base leading-relaxed">
                Découvrez les solutions Bloom conçues pour accompagner le terrain {currentTerrain.label[lang]}.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div 
                  key={product.id}
                  onClick={() => onNavigate('product-detail', product.id)}
                  className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[28px] p-6 hover:bg-white/10 transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <div className="aspect-square rounded-2xl overflow-hidden mb-5 bg-white/5">
                      <OptimizedImage src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    </div>
                    <h4 className="text-lg font-bold mb-2 text-white">{product.name}</h4>
                    <p className="text-xs text-white/65 mb-6 line-clamp-2 leading-relaxed">{product.subtitle}</p>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <span className="font-bold text-sm text-[#D97706]">{product.price.toFixed(2)} €</span>
                    <div className="w-9 h-9 bg-[#D97706] group-hover:bg-white text-white group-hover:text-[#0F261E] rounded-full flex items-center justify-center transition-colors">
                      <ShoppingBag className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Associated Blog Posts */}
        {filteredPosts.length > 0 && (
          <section>
            <div className="mb-10">
              <div className="text-[10px] font-black uppercase tracking-widest text-[#D97706] mb-2">Compréhension & Pédagogie</div>
              <h2 className="text-3xl font-bold text-botanik-green mb-2">Science & Éclairages</h2>
              <p className="text-botanik-green/60 text-sm md:text-base">
                Articles et dossiers pour approfondir les dimensions du terrain {currentTerrain.label[lang]}.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {filteredPosts.map((post) => (
                <div 
                  key={post.slug}
                  onClick={() => onNavigate('blog', post.slug)}
                  className="group cursor-pointer flex flex-col sm:flex-row bg-white rounded-[32px] overflow-hidden border border-botanik-green/10 hover:border-botanik-green/30 transition-all shadow-sm"
                >
                  <div className="sm:w-2/5 aspect-[4/3] sm:aspect-auto">
                    <OptimizedImage src={post.image} alt={post.title[lang]} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-6 sm:w-3/5 flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-3">
                      <BookOpen className="w-3.5 h-3.5 text-[#D97706]" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-botanik-green/40">{post.category}</span>
                    </div>
                    <h4 className="text-lg font-bold text-botanik-green mb-2 group-hover:text-[#D97706] transition-colors">{post.title[lang]}</h4>
                    <p className="text-xs text-botanik-green/65 mb-4 line-clamp-2 leading-relaxed">{post.excerpt[lang]}</p>
                    <div className="text-[#D97706] font-bold text-xs flex items-center gap-2">
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
