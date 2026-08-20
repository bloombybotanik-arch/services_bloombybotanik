import React, { useState, useMemo } from 'react';
import { ArrowLeft, Check, ShieldCheck, Thermometer, Timer, RefreshCw, ShoppingBag, FlaskConical, Beaker, Leaf, ChefHat, X, Star, Heart, Share2, Info, Award } from 'lucide-react';
import { translations, Language } from './translations';
import { getProductSheets } from './data/productDetailsData';

interface ProductDetailProps {
  onBack: () => void;
  onAddToCart: (product: any) => void;
  onNavigate: (view: any, productId?: string, type?: any) => void;
  productId?: string;
  lang: Language;
}

export default function ProductDetail({ onBack, onAddToCart, onNavigate, productId = 'bloomlab', lang }: ProductDetailProps) {
  const [activeImage, setActiveImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const t = translations[lang].product_detail;
  const productSheets = useMemo(() => getProductSheets(lang), [lang]);
  const sheet = productSheets[productId] || productSheets['bloomlab'];
  const gallery = sheet.images.map((img: string, i: number) => ({ 
    src: img, 
    alt: `${sheet.name} - ${t.view_alt} ${i + 1} - ${translations[lang].seo.keywords.split(', ').slice(0, 4).join(', ')}` 
  }));

  return (
    <article className="max-w-[1200px] mx-auto px-6 py-12 md:py-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between mb-8">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-[#1B3022]/60 hover:text-[#1B3022] transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          {t.back}
        </button>
      </div>

      <div className="flex flex-col lg:flex-row items-stretch bg-white border border-[#1B3022]/5 rounded-[48px] overflow-hidden shadow-2xl mb-24 min-h-[600px] lg:min-h-[700px]">
        {/* Left Side: Image (Occupies full space) */}
        <div 
          className="lg:w-1/2 relative bg-[#F9F9F7] overflow-hidden min-h-[400px] lg:min-h-[600px] cursor-zoom-in flex items-stretch"
          onClick={() => setIsZoomed(true)}
        >
          <img 
            src={gallery[activeImage].src} 
            alt={gallery[activeImage].alt} 
            className="w-full h-full object-cover transition-all duration-500 scale-110 hover:scale-125"
          />
          {productId === 'bloomlab' && (
            <div className="absolute top-6 left-6 bg-[#F97316]/50 backdrop-blur-md text-white px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-white/20 shadow-xl z-20 whitespace-nowrap">
              {sheet.subtitle}
            </div>
          )}
          {gallery.length > 1 && (
            <div className="absolute bottom-8 left-8 right-8 z-20">
              <div className="flex gap-2 p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 w-fit">
                {gallery.map((img: any, i: number) => (
                  <button 
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`w-12 h-12 rounded-xl overflow-hidden border-2 transition-all ${activeImage === i ? 'border-[#F97316] scale-95' : 'border-transparent opacity-60 hover:opacity-100'}`}
                  >
                    <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Side: Info & Buy */}
        <div className="lg:w-1/2 p-8 md:p-16 lg:p-20 flex flex-col justify-center">
          <div className="flex items-center gap-2 text-[#1C3F34] font-bold uppercase tracking-widest text-[10px] mb-4">
            <ShieldCheck className="w-4 h-4" /> 
            <span>{lang === 'fr' ? 'Conception Botanique de Précision' : lang === 'de' ? 'Botanische Präzisionsentwicklung' : 'Precision Botanical Design'}</span>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-bold text-[#1B3022] mb-4 md:mb-6 tracking-tight">{sheet.name}</h1>
          <div className="text-[#F97316] text-[10px] md:text-sm font-bold uppercase tracking-widest mb-4 md:mb-6">{sheet.subtitle}</div>
          
          <p className="text-base md:text-xl text-[#1B3022]/80 font-medium mb-6 md:mb-8 leading-relaxed">
            {sheet.description}
          </p>

          <div className="bg-[#F9F9F7] p-6 md:p-8 rounded-[32px] border border-[#1B3022]/5 mb-8 md:mb-10">
            <div className="flex items-baseline gap-3 md:gap-4 mb-4 md:mb-6">
              <span className="text-3xl md:text-5xl font-bold text-[#1B3022]">{sheet.price.toFixed(2)} €</span>
              {sheet.originalPrice && (
                <span className="text-[#1B3022]/40 line-through text-lg md:text-xl">{sheet.originalPrice.toFixed(2)} €</span>
              )}
            </div>
            
            <button 
              onClick={() => onAddToCart({
                id: productId,
                name: sheet.name,
                subtitle: sheet.subtitle,
                price: sheet.price,
                image: sheet.images[0]
              })}
              className="w-full bg-[#F97316] text-white px-6 py-4 md:py-5 rounded-2xl font-bold text-lg md:text-xl tracking-wide hover:bg-[#EA580C] transition-all flex items-center justify-center gap-3 shadow-xl shadow-[#F97316]/20 transform hover:-translate-y-1"
            >
              <ShoppingBag className="w-5 h-5 md:w-6 md:h-6" /> {t.add_to_cart}
            </button>
            <p className="text-center text-sm text-[#1B3022]/50 mt-4 flex items-center justify-center gap-2">
              <ShieldCheck className="w-4 h-4" /> {t.shipping_info}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {sheet.specs.map((spec: any, i: number) => (
              <div key={i} className="bg-[#1B3022]/5 p-5 rounded-2xl flex items-center gap-4 group hover:bg-[#1B3022]/10 transition-colors">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm shrink-0">
                  <spec.icon className="w-5 h-5 text-[#1B3022]" />
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] uppercase font-bold text-[#1B3022]/40 tracking-wider truncate">{spec.label}</div>
                  <div className="text-sm font-bold text-[#1B3022] truncate sm:whitespace-normal">{spec.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        <div dangerouslySetInnerHTML={{ __html: sheet.fullDescription }} />
      </div>
      
      <footer className="mt-20 border-t border-[#1B3022]/10 pt-10 text-center">
        <div className="flex flex-wrap justify-center gap-6 mb-8 text-xs font-bold uppercase tracking-widest text-[#1B3022]/40">
          <button onClick={() => onNavigate('legal', undefined, 'mentions')} className="hover:text-botanik-orange transition-colors">Mentions Légales</button>
          <button onClick={() => onNavigate('legal', undefined, 'cgv')} className="hover:text-botanik-orange transition-colors">CGV</button>
          <button onClick={() => onNavigate('legal', undefined, 'cgu')} className="hover:text-botanik-orange transition-colors">CGU</button>
        </div>
        <p className="text-sm text-[#1B3022]/40 italic max-w-2xl mx-auto">
          {sheet.name} {t.disclaimer}
        </p>
      </footer>

      {/* Zoom Modal */}
      {isZoomed && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-300 cursor-zoom-out"
          onClick={() => setIsZoomed(false)}
        >
          <button 
            className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors"
            onClick={() => setIsZoomed(false)}
          >
            <X className="w-8 h-8" />
          </button>
          <img 
            src={gallery[activeImage].src} 
            alt={gallery[activeImage].alt} 
            className="max-w-full max-h-full object-contain animate-in zoom-in-95 duration-300"
          />
        </div>
      )}
    </article>
  );
}

