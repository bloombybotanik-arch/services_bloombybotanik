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
    <article className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between mb-6 sm:mb-8">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-[#1B3022]/60 hover:text-[#1B3022] transition-colors group py-2"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          {t.back}
        </button>
      </div>

      <div className="flex flex-col lg:flex-row items-stretch bg-white border border-[#1B3022]/5 rounded-3xl sm:rounded-[48px] overflow-hidden shadow-2xl mb-16 sm:mb-24 min-h-0 lg:min-h-[700px]">
        {/* Left Side: Image (Occupies full space) */}
        <div 
          className="lg:w-1/2 relative bg-[#F9F9F7] overflow-hidden min-h-[260px] sm:min-h-[400px] lg:min-h-[600px] cursor-zoom-in flex items-stretch"
          onClick={() => setIsZoomed(true)}
        >
          <img 
            src={gallery[activeImage].src} 
            alt={gallery[activeImage].alt} 
            className="w-full h-full object-cover transition-all duration-500 scale-105 sm:scale-110 hover:scale-125"
          />
          {productId === 'bloomlab' && (
            <div className="absolute top-4 left-4 sm:top-6 sm:left-6 bg-[#D97706] text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] border border-white/20 shadow-xl z-20 whitespace-nowrap">
              {sheet.subtitle}
            </div>
          )}
          {gallery.length > 1 && (
            <div className="absolute bottom-4 left-4 right-4 sm:bottom-8 sm:left-8 sm:right-8 z-20">
              <div className="flex gap-2 p-2 sm:p-3 bg-white/20 backdrop-blur-md rounded-2xl border border-white/20 w-fit max-w-full overflow-x-auto">
                {gallery.map((img: any, i: number) => (
                  <button 
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${activeImage === i ? 'border-[#F97316] scale-95 ring-2 ring-white/50' : 'border-transparent opacity-70 hover:opacity-100'}`}
                  >
                    <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Side: Info & Buy */}
        <div className="lg:w-1/2 p-5 sm:p-8 md:p-16 lg:p-20 flex flex-col justify-center">
          <div className="flex items-center gap-2 text-[#1C3F34] font-bold uppercase tracking-widest text-[10px] mb-3 sm:mb-4">
            <ShieldCheck className="w-4 h-4" /> 
            <span>{lang === 'fr' ? 'Conception Botanique de Précision' : lang === 'de' ? 'Botanische Präzisionsentwicklung' : 'Precision Botanical Design'}</span>
          </div>
          
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-[#1B3022] mb-3 sm:mb-4 md:mb-6 tracking-tight leading-tight">{sheet.name}</h1>
          <div className="text-[#F97316] text-[10px] md:text-sm font-bold uppercase tracking-widest mb-4 md:mb-6">{sheet.subtitle}</div>
          
          <p className="text-sm sm:text-base md:text-xl text-[#1B3022]/80 font-medium mb-6 md:mb-8 leading-relaxed">
            {sheet.description}
          </p>

          <div className="bg-[#F9F9F7] p-5 sm:p-8 rounded-2xl sm:rounded-[32px] border border-[#1B3022]/5 mb-8 md:mb-10">
            <div className="flex items-baseline gap-3 md:gap-4 mb-4 md:mb-6 flex-wrap">
              <span className="text-2xl sm:text-3xl md:text-5xl font-bold text-[#1B3022]">{sheet.price.toFixed(2).replace('.', ',')} €</span>
              {sheet.originalPrice && (
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[#1B3022]/40 line-through text-base sm:text-lg md:text-xl">{sheet.originalPrice.toFixed(2).replace('.', ',')} €</span>
                  <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-[#D97706]/10 text-[#D97706] border border-[#D97706]/20 px-2.5 py-1 rounded-full whitespace-nowrap">
                    code: Rentrée 2026
                  </span>
                </div>
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
              className="w-full bg-[#0F261E] hover:bg-[#D97706] active:bg-[#D97706] text-white px-6 py-4 md:py-5 rounded-2xl font-bold text-base sm:text-lg md:text-xl tracking-wide transition-all flex items-center justify-center gap-3 shadow-xl shadow-black/10 transform hover:-translate-y-1 cursor-pointer min-h-[48px]"
            >
              <ShoppingBag className="w-5 h-5 md:w-6 md:h-6" /> {t.add_to_cart}
            </button>
            <p className="text-center text-xs sm:text-sm text-[#1B3022]/50 mt-4 flex items-center justify-center gap-2">
              <ShieldCheck className="w-4 h-4 shrink-0" /> {t.shipping_info}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {sheet.specs.map((spec: any, i: number) => (
              <div key={i} className="bg-[#1B3022]/5 p-4 sm:p-5 rounded-2xl flex items-center gap-3 sm:gap-4 group hover:bg-[#1B3022]/10 transition-colors">
                <div className="w-9 h-9 sm:w-10 sm:h-10 bg-white rounded-xl flex items-center justify-center shadow-sm shrink-0">
                  <spec.icon className="w-4 h-4 sm:w-5 sm:h-5 text-[#1B3022]" />
                </div>
                <div className="min-w-0">
                  <div className="text-[9px] sm:text-[10px] uppercase font-bold text-[#1B3022]/40 tracking-wider truncate">{spec.label}</div>
                  <div className="text-xs sm:text-sm font-bold text-[#1B3022] truncate sm:whitespace-normal">{spec.value}</div>
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
            className="absolute top-6 right-6 p-3 bg-[#0F261E] hover:bg-[#1C3F34] rounded-full text-white transition-colors border border-white/20"
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

