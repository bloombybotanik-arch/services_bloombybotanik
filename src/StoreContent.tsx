import React from 'react';
import { ShoppingBag, Star, Check, ArrowRight, ShieldCheck, Leaf, FlaskConical, Search } from 'lucide-react';
import bloomLabImg from './assets/images/bloomlab_main_1784887530345.jpeg';
import img05 from './assets/images/Img_05.jpeg';
import duoArgilesImg from './assets/images/product_duo_argiles.jpg';
import trioPouchesImg from './assets/images/product_trio_pouches.jpg';
import feuArticulaireImg from './assets/images/product_feu_articulaire.jpg';
import bouclierHiverImg from './assets/images/product_bouclier_hiver.jpg';
import nuitProfondeImg from './assets/images/product_nuit_profonde.jpg';
import seveFondamentaleImg from './assets/images/product_seve_fondamentale.jpg';
import digestionImg from './assets/images/product_digestion.jpeg';

const products = [
  {
    id: 'bloomlab',
    name: "Machine d'Extraction Botanique",
    subtitle: "SOUVERAINETÉ SANTÉ 2026",
    price: 289.00,
    originalPrice: 329.00,
    image: bloomLabImg,
    rating: 4.9,
    reviews: 128,
    description: "Élaborer vos propres remèdes et soins maison grade Laboratoire, c'est enfin possible ! Découvrez la seule machine capable d'extraire le Totum des Plantes avec une précision absolue.",
    bullets: [
      "Macérats huileux, teintures, extraits concentrés",
      "Séquençage thermique ±0,5°C (0°C à 121°C)",
      "Acier Inox 304 certifié, Cuve 1.2L"
    ],
    tags: ['Best-Seller', 'Inox 304', 'Garantie 1 an'],
    featured: true
  },
  {
    id: 'seve-fondamentale',
    name: 'SÈVE FONDAMENTALE',
    subtitle: 'VITALITÉ CAPILLAIRE',
    price: 12.90,
    image: seveFondamentaleImg,
    rating: 4.8,
    reviews: 42,
    description: 'Soutien la vitalité des racines. Mélange de plantes pour infusion capillaire et corporelle.',
    tags: ['Vitalité', 'Structure']
  },
  {
    id: 'nuit-profonde',
    name: 'NUIT PROFONDE',
    subtitle: 'SOMMEIL & ANCRAGE',
    price: 9.90,
    image: nuitProfondeImg,
    rating: 4.9,
    reviews: 56,
    description: 'Rituel du soir et ancrage. Mélange de plantes séchées pour un sommeil profond et réparateur.',
    tags: ['Sommeil', 'Ancrage']
  },
  {
    id: 'confort-digestif',
    name: 'CONFORT DIGESTIF',
    subtitle: 'ÉQUILIBRE INTESTINAL',
    price: 9.90,
    image: digestionImg,
    rating: 4.7,
    reviews: 38,
    description: 'Équilibre et confort digestif. Mélange de plantes pour apaiser les ballonnements durablement.',
    tags: ['Digestion', 'Équilibre']
  },
  {
    id: 'feu-articulaire',
    name: 'FEU ARTICULAIRE',
    subtitle: 'SOUPLESSE & MOBILITÉ',
    price: 9.90,
    image: feuArticulaireImg,
    rating: 4.8,
    reviews: 29,
    description: 'Souplesse articulaire. Mélange de plantes pour accompagner les zones sensibles et la mobilité.',
    tags: ['Articulations', 'Mobilité']
  },
  {
    id: 'duo-argiles',
    name: 'Duo ARGILES Précision',
    subtitle: 'ADSORBANT NATUREL',
    price: 44.90,
    originalPrice: 49.00,
    image: duoArgilesImg,
    rating: 5.0,
    reviews: 15,
    description: 'Haute précision (6µm). Une cure détoxifiante puissante pour libérer le corps des toxines.',
    tags: ['Détox', 'Purification']
  },
  {
    id: 'pack-trio',
    name: 'Achetez par 3',
    subtitle: 'LIVRAISON OFFERTE',
    price: 26.90,
    originalPrice: 29.70,
    image: trioPouchesImg,
    rating: 4.9,
    reviews: 84,
    description: 'Sélectionnez vos 3 mélanges préférés et profitez de la livraison offerte. Idéal pour un protocole complet.',
    tags: ['Offre Spéciale', 'Best-Value']
  }
];

interface StoreContentProps {
  onNavigatePending: () => void;
  onNavigateDetail: (id: string) => void;
  onAddToCart: (product: any) => void;
}

export default function StoreContent({ onNavigatePending, onNavigateDetail, onAddToCart }: StoreContentProps) {
  const [searchQuery, setSearchQuery] = React.useState('');
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="animate-in slide-in-from-right duration-500 pb-20">
      
      {/* Search & Filter Header (App Style) */}
      <div className="bg-white px-4 md:px-6 pt-6 md:pt-8 pb-4">
        <h1 className="text-2xl md:text-3xl font-bold text-botanik-green mb-1 md:mb-2">Boutique</h1>
        <p className="text-[10px] md:text-sm text-botanik-green/40 font-medium uppercase tracking-widest mb-4 md:mb-6">L'Apothicaire Moderne</p>
        
        <div className="relative mb-4 md:mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 md:w-5 h-4 md:h-5 text-botanik-green/30" />
          <input 
            type="text" 
            placeholder="Chercher un kit, une plante..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 md:pl-12 pr-4 py-2 md:py-3 bg-[#F9F9F7] rounded-xl md:rounded-2xl border-none text-sm md:text-base text-botanik-green focus:ring-2 focus:ring-botanik-orange/20"
          />
        </div>
      </div>

      {/* Featured Header: Split Hero Layout synchronized with Home */}
      {!searchQuery && (
        <div className="px-6 mb-16">
          <div className="relative group">
            <div className="absolute -inset-4 bg-botanik-green/5 rounded-[56px] blur-3xl group-hover:bg-botanik-orange/5 transition-colors duration-1000" />
            <div className="relative bg-white border border-botanik-green/5 rounded-[48px] overflow-hidden shadow-2xl">
              <div className="flex flex-col lg:flex-row items-stretch">
                {/* Left Side: Content */}
                <div className="lg:w-1/2 p-6 md:p-16 flex flex-col justify-center order-2 lg:order-1">
                  <div className="flex items-center gap-2 text-botanik-orange font-black uppercase tracking-[0.3em] text-[10px] mb-8">
                    <div className="w-1.5 h-1.5 rounded-full bg-botanik-orange animate-pulse" />
                    L'Extracteur de Totum
                  </div>
                  <h2 className="text-3xl md:text-6xl font-bold text-botanik-green mb-6 md:mb-8 leading-[1.1] tracking-tight">
                    BloomLab <span className="text-botanik-orange md:whitespace-nowrap">La Boutique</span>
                  </h2>
                  <p className="text-base md:text-xl text-botanik-green/60 mb-8 md:mb-12 leading-relaxed max-w-md font-medium">
                    Explorez notre sélection de kits et synergies pour accompagner votre reset homéostatique.
                  </p>
                  <div className="flex flex-wrap items-center gap-6 md:gap-10">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-botanik-green/40 uppercase tracking-widest mb-1">À partir de</span>
                    <span className="text-3xl md:text-5xl font-bold text-botanik-green">{formatPrice(products[0].price).split(',')[0]}€</span>
                    </div>
                    <button 
                      onClick={() => onNavigateDetail('bloomlab')}
                      className="px-6 md:px-12 py-3 md:py-6 bg-botanik-green text-white rounded-[16px] md:rounded-[24px] font-bold shadow-2xl shadow-botanik-green/20 flex items-center justify-center gap-3 md:gap-4 group transition-all hover:-translate-y-1 hover:shadow-botanik-green/30 text-sm md:text-base"
                    >
                      Découvrir
                      <ArrowRight className="w-5 h-5 md:w-6 md:h-6 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>

                {/* Right Side: Image */}
                <div className="lg:w-1/2 bg-[#F9F9F7] relative overflow-hidden min-h-[400px] lg:h-auto order-1 lg:order-2 cursor-pointer" onClick={() => onNavigateDetail('bloomlab')}>
                  <img 
                    src={img05} 
                    alt="BloomLab Boutique" 
                    className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-[2000ms] ease-out"
                  />
                  <div className="absolute top-12 left-12 z-20 bg-botanik-orange/50 backdrop-blur-md text-white px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-white/20 shadow-2xl">
                    SOUVERAINETÉ SANTÉ 2026
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Product Grid */}
      <div className="px-4 md:px-6 mb-12">
        <h3 className="text-xs md:text-sm font-bold uppercase tracking-widest text-botanik-green/40 mb-4 md:mb-6">
          {searchQuery ? `Résultats pour "${searchQuery}"` : "Nos Kits & Synergies"}
        </h3>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
          {filteredProducts.filter(p => !p.featured || searchQuery).map((product) => {
            return (
              <div 
                key={product.id} 
                onClick={() => onNavigateDetail(product.id)}
                className="bg-white rounded-[40px] border border-botanik-green/5 overflow-hidden flex flex-col cursor-pointer hover:shadow-2xl transition-all group"
              >
                <div className="relative h-64 md:h-80 overflow-hidden bg-[#F9F9F7]">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <button 
                    onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}
                    className="absolute bottom-4 right-4 w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg text-botanik-green hover:bg-botanik-orange hover:text-white transition-colors"
                  >
                    <ShoppingBag className="w-5 h-5" />
                  </button>
                </div>
                <div className="p-4 md:p-6 flex flex-col flex-1">
                  <div className="text-[8px] md:text-[10px] font-bold text-botanik-orange uppercase tracking-widest mb-1 md:mb-2">
                    {product.subtitle}
                  </div>
                  <h4 className="text-sm md:text-lg font-bold text-botanik-green mb-2 md:mb-4 leading-tight flex-1">
                    {product.name}
                  </h4>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-base md:text-xl font-bold text-botanik-green">{formatPrice(product.price)}€</span>
                    <ArrowRight className="w-4 h-4 md:w-5 md:h-5 text-botanik-green/20 group-hover:text-botanik-green transition-colors" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Trust Section */}
      <div className="px-4 md:px-6 grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 mb-12">
        <div className="bg-white border border-botanik-green/5 p-4 md:p-5 rounded-2xl flex items-center gap-3 md:gap-4 shadow-sm">
          <div className="w-8 h-8 md:w-10 md:h-10 bg-botanik-green/5 rounded-full flex items-center justify-center shrink-0">
            <ShieldCheck className="w-4 h-4 md:w-5 md:h-5 text-botanik-green" />
          </div>
          <span className="text-[10px] md:text-xs font-bold text-botanik-green uppercase tracking-wider leading-tight">Paiement 100% Sécurisé</span>
        </div>
        <div className="bg-white border border-botanik-green/5 p-4 md:p-5 rounded-2xl flex items-center gap-3 md:gap-4 shadow-sm">
          <div className="w-8 h-8 md:w-10 md:h-10 bg-botanik-green/5 rounded-full flex items-center justify-center shrink-0">
            <FlaskConical className="w-4 h-4 md:w-5 md:h-5 text-botanik-green" />
          </div>
          <span className="text-[10px] md:text-xs font-bold text-botanik-green uppercase tracking-wider leading-tight">Grade Laboratoire</span>
        </div>
        <div className="bg-white border border-botanik-green/5 p-4 md:p-5 rounded-2xl flex items-center gap-3 md:gap-4 shadow-sm">
          <div className="w-8 h-8 md:w-10 md:h-10 bg-botanik-green/5 rounded-full flex items-center justify-center shrink-0">
            <Check className="w-4 h-4 md:w-5 md:h-5 text-botanik-green" />
          </div>
          <span className="text-[10px] md:text-xs font-bold text-botanik-green uppercase tracking-wider leading-tight">Satisfait ou Remboursé</span>
        </div>
      </div>
    </div>
  );
}
