import React, { useState } from 'react';
import { Trash2, Plus, Minus, ShieldCheck, Truck, CreditCard, Lock, ArrowLeft, ChevronRight, Info, Sparkles, FlaskConical, BookOpen } from 'lucide-react';
import { translations, Language } from './translations';
import { getShippingPrice, ShippingMethod } from './lib/shippingUtils';

interface CartItem {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartContentProps {
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
  onBack: () => void;
  onCheckout: () => void;
  onNavigate: (view: any, productId?: string, type?: any) => void;
  lang?: Language;
  shippingMethod: ShippingMethod;
  setShippingMethod: (method: ShippingMethod) => void;
}

export default function CartContent({ 
  items, 
  onUpdateQuantity, 
  onRemove, 
  onBack, 
  onCheckout, 
  onNavigate, 
  lang = 'fr',
  shippingMethod,
  setShippingMethod
}: CartContentProps) {
  const t = translations[lang].cart;
  const common = translations[lang].common;
  
  const hasBloomLab = items.some(item => item.id === 'bloomlab');
  const [promoCode, setPromoCode] = useState('');
  const [isPromoApplied, setIsPromoApplied] = useState(false);
  
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const allDigital = items.every(item => (item as any).isDigital);
  
  const shipping = getShippingPrice(shippingMethod, items);
  const total = subtotal + shipping;

  const sachetCount = items.filter(item => item.id !== 'bloomlab' && !(item as any).isDigital).reduce((acc, item) => acc + item.quantity, 0);

  const getMethodPriceLabel = (method: ShippingMethod) => {
    const price = getShippingPrice(method, items);
    return price === 0 ? t.summary.free : (
      <span className="whitespace-nowrap">
        {price.toFixed(2).replace('.', ',')}&nbsp;€
      </span>
    );
  };

  if (items.length === 0) {
    return (
      <div className="max-w-[1200px] mx-auto px-6 py-32 text-center">
        <div className="w-24 h-24 bg-[#1B3022]/5 rounded-full flex items-center justify-center mx-auto mb-8">
          <Truck className="w-10 h-10 text-[#1B3022]/20" />
        </div>
        <h2 className="text-3xl font-bold text-[#1B3022] mb-4">{t.empty.title}</h2>
        <p className="text-[#1B3022]/60 mb-10 max-w-md mx-auto">{t.empty.subtitle}</p>
        <button 
          onClick={onBack}
          className="bg-[#1B3022] text-white px-10 py-4 rounded-xl font-bold hover:bg-[#F97316] transition-all"
        >
          {t.empty.button}
        </button>
      </div>
    );
  }

  return (
    <article className="max-w-[1200px] mx-auto px-6 py-12 md:py-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={onBack} className="p-2 hover:bg-[#1B3022]/5 rounded-full transition-colors">
          <ArrowLeft className="w-6 h-6 text-[#1B3022]" />
        </button>
        <div className="text-[10px] font-black uppercase tracking-[0.3em] text-[#F97316]">{t.header.badge}</div>
      </div>
      
      <div className="mb-12">
        <h1 className="text-3xl md:text-6xl font-bold text-[#1B3022] mb-4">{t.header.title}</h1>
        <p className="text-base md:text-xl text-[#1B3022]/60 max-w-2xl font-light">
          {t.header.subtitle}
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-12">
        {/* Items List */}
        <div className="lg:col-span-2 space-y-12">
          <div className="space-y-6">
            {items.map((item) => (
              <div key={item.id} className="bg-white p-6 rounded-[32px] border border-[#1B3022]/10 flex flex-col sm:flex-row gap-8 items-center group hover:shadow-xl transition-all duration-500">
                <div className="w-full sm:w-48 aspect-square rounded-2xl overflow-hidden bg-[#F9F9F7] flex-shrink-0 relative border border-[#1B3022]/5">
                  <div className="absolute inset-2 overflow-hidden rounded-xl">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  </div>
                </div>
                <div className="flex-1 min-w-0 text-center sm:text-left space-y-2">
                  <div className="text-[10px] font-bold text-[#F97316] uppercase tracking-widest mb-1 truncate">{item.subtitle}</div>
                  <h3 className="text-xl md:text-2xl font-bold text-[#1B3022] truncate sm:whitespace-normal leading-tight">{item.name}</h3>
                  <div className="text-xl font-bold text-[#1B3022] whitespace-nowrap">{item.price.toFixed(2)}&nbsp;€</div>
                </div>
                <div className="flex items-center gap-4 bg-[#F9F9F7] p-2 rounded-xl">
                  <button 
                    onClick={() => onUpdateQuantity(item.id, -1)}
                    className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-lg transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="font-bold w-4 text-center">{item.quantity}</span>
                  <button 
                    onClick={() => onUpdateQuantity(item.id, 1)}
                    className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-lg transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <button 
                  onClick={() => onRemove(item.id)}
                  className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>

          {/* Logic & Coherence Section */}
          <div className="bg-[#1B3022] text-white p-10 md:p-16 rounded-[60px] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
            <Sparkles className="w-10 h-10 text-[#F97316] mb-8" />
            <h3 className="text-2xl md:text-3xl font-bold mb-6">{t.why_works.title}</h3>
            <p className="text-lg text-white/70 leading-relaxed mb-8 font-light">
              {hasBloomLab 
                ? t.why_works.bloomlab
                : t.why_works.remedies}
            </p>
            {hasBloomLab && (
              <div className="p-4 bg-white/10 rounded-2xl border border-white/20 mb-8">
                <div className="flex items-center gap-3 text-botanik-orange font-bold uppercase text-[10px] tracking-[0.2em] mb-2">
                  <ShieldCheck className="w-4 h-4" /> {t.why_works.offer_badge}
                </div>
                <p className="text-sm text-white/90">
                  {t.why_works.offer_desc}
                </p>
              </div>
            )}
            <div className="flex items-center gap-3 text-[#F97316] font-bold uppercase text-xs tracking-widest">
              <ShieldCheck className="w-5 h-5" /> {t.why_works.lab_grade}
            </div>
          </div>

          {/* Value Proposition for Subscription */}
          {items.filter(i => i.id !== 'bloomlab').length >= 2 && (
            <div className="bg-[#F97316]/10 border-2 border-[#F97316] p-8 rounded-[40px] flex flex-col md:flex-row items-center gap-6">
              <div className="flex-1">
                <h4 className="text-xl font-bold text-[#1B3022] mb-2">{t.upsell.title}</h4>
                <p className="text-sm text-[#1B3022]/70 leading-relaxed">
                  {t.upsell.description}
                </p>
              </div>
              <button 
                onClick={() => onBack()}
                className="px-6 py-3 bg-[#F97316] text-white rounded-xl font-bold text-sm hover:bg-[#EA580C] transition-all"
              >
                {t.upsell.button}
              </button>
            </div>
          )}

          {/* Cross-sell / Recommended */}
          <div className="bg-white p-8 rounded-[40px] border border-[#1B3022]/10">
            <h4 className="text-xs font-black uppercase tracking-[0.3em] text-[#1B3022]/40 mb-8 px-4">{t.recommended.title}</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {!hasBloomLab && (
                <div className="bg-[#F9F9F7] p-8 rounded-[32px] border border-[#F97316]/20 shadow-sm hover:shadow-xl transition-all group">
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                    <FlaskConical className="w-8 h-8 text-[#F97316]" />
                  </div>
                  <h5 className="text-lg font-bold text-[#1B3022] mb-3">{t.recommended.bloomlab_title}</h5>
                  <p className="text-sm text-[#1B3022]/60 mb-8 leading-relaxed">{t.recommended.bloomlab_desc}</p>
                  <button onClick={() => onBack()} className="text-sm font-bold text-[#F97316] flex items-center gap-2 group-hover:gap-3 transition-all">
                    {t.recommended.bloomlab_btn} <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
              <div className="bg-[#F9F9F7] p-8 rounded-[32px] border border-[#1B3022]/10 shadow-sm hover:shadow-xl transition-all group">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                  <BookOpen className="w-8 h-8 text-[#1B3022]" />
                </div>
                <h5 className="text-lg font-bold text-[#1B3022] mb-3">{t.recommended.premium_title}</h5>
                <p className="text-sm text-[#1B3022]/60 mb-8 leading-relaxed">{t.recommended.premium_desc}</p>
                <button onClick={() => onBack()} className="text-sm font-bold text-[#1B3022] flex items-center gap-2 group-hover:gap-3 transition-all">
                  {t.recommended.premium_btn} <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Delivery Options */}
          {!allDigital && (
            <div className="bg-white p-8 rounded-[32px] border border-[#1B3022]/10">
              <div className="flex items-center gap-3 mb-8">
                <Truck className="w-6 h-6 text-[#1B3022]" />
                <h2 className="text-2xl font-bold text-[#1B3022]">{t.shipping.title}</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <button 
                  onClick={() => setShippingMethod('mondialrelay')}
                  className={`p-6 rounded-3xl border-2 transition-all text-left flex flex-col justify-between h-full ${shippingMethod === 'mondialrelay' ? 'border-[#F97316] bg-[#F97316]/5 shadow-inner' : 'border-[#1B3022]/10 hover:border-[#1B3022]/30 bg-white'}`}
                >
                  <div>
                    <div className="font-bold text-[#1B3022] mb-1">{t.shipping.methods.mondialrelay}</div>
                    <div className="text-xs opacity-60 leading-relaxed">{t.shipping.methods.mondialrelay_desc}</div>
                  </div>
                  <div className="mt-4 font-bold text-[#F97316] text-lg">
                    {getMethodPriceLabel('mondialrelay')}
                  </div>
                </button>
                <button 
                  onClick={() => setShippingMethod('colissimo')}
                  className={`p-6 rounded-3xl border-2 transition-all text-left flex flex-col justify-between h-full ${shippingMethod === 'colissimo' ? 'border-[#F97316] bg-[#F97316]/5 shadow-inner' : 'border-[#1B3022]/10 hover:border-[#1B3022]/30 bg-white'}`}
                >
                  <div>
                    <div className="font-bold text-[#1B3022] mb-1">{t.shipping.methods.colissimo}</div>
                    <div className="text-xs opacity-60 leading-relaxed">{t.shipping.methods.colissimo_desc}</div>
                  </div>
                  <div className="mt-4 font-bold text-[#F97316] text-lg">
                    {getMethodPriceLabel('colissimo')}
                  </div>
                </button>
                <button 
                  onClick={() => setShippingMethod('laposte')}
                  className={`p-6 rounded-3xl border-2 transition-all text-left flex flex-col justify-between h-full ${shippingMethod === 'laposte' ? 'border-[#F97316] bg-[#F97316]/5 shadow-inner' : 'border-[#1B3022]/10 hover:border-[#1B3022]/30 bg-white'}`}
                >
                  <div>
                    <div className="font-bold text-[#1B3022] mb-1">{t.shipping.methods.laposte}</div>
                    <div className="text-xs opacity-60 leading-relaxed">{t.shipping.methods.laposte_desc}</div>
                  </div>
                  <div className="mt-4 font-bold text-[#F97316] text-lg">
                    {getMethodPriceLabel('laposte')}
                  </div>
                </button>
                <button 
                  onClick={() => setShippingMethod('express')}
                  className={`p-6 rounded-3xl border-2 transition-all text-left flex flex-col justify-between h-full ${shippingMethod === 'express' ? 'border-[#F97316] bg-[#F97316]/5 shadow-inner' : 'border-[#1B3022]/10 hover:border-[#1B3022]/30 bg-white'}`}
                >
                  <div>
                    <div className="font-bold text-[#1B3022] mb-1">{t.shipping.methods.express}</div>
                    <div className="text-xs opacity-60 leading-relaxed">{t.shipping.methods.express_desc}</div>
                  </div>
                  <div className="mt-4 font-bold text-[#F97316] text-lg">
                    {getMethodPriceLabel('express')}
                  </div>
                </button>
              </div>
              {!hasBloomLab && sachetCount < 3 && (
                <div className="mt-6 p-4 bg-[#1B3022]/5 rounded-xl flex items-center gap-3">
                  <Plus className="w-5 h-5 text-[#F97316]" />
                  <p className="text-sm">{t.shipping.more_for_free.replace('{amount}', (3 - sachetCount).toString())} sachets</p>
                </div>
              )}
              {sachetCount > 0 && (
                <div className="mt-6 p-4 bg-[#F97316]/5 rounded-xl flex items-center gap-3 border border-[#F97316]/10">
                  <Info className="w-5 h-5 text-[#F97316]" />
                  <p className="text-xs text-[#1B3022]/70 italic">{t.shipping.remedies_note}</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Summary */}
        <div className="space-y-6">
          <div className="bg-[#1B3022] text-white p-8 rounded-[40px] sticky top-24">
            <h2 className="text-2xl font-bold mb-8">{t.summary.title}</h2>
            
            {/* Promo Code Field */}
            <div className="mb-8">
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                  placeholder="CODE PROMO"
                  className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm focus:border-botanik-orange outline-none transition-all placeholder:text-white/20"
                />
                <button 
                  onClick={() => setIsPromoApplied(true)}
                  className="bg-white/10 hover:bg-white/20 px-4 rounded-xl text-xs font-bold transition-all border border-white/20"
                >
                  Appliquer
                </button>
              </div>
              {isPromoApplied && (
                <div className="mt-2 text-[10px] text-botanik-orange flex items-center gap-2">
                  <Sparkles className="w-3 h-3" /> Code activé avec succès
                </div>
              )}
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-white/60 whitespace-nowrap">
                <span>{t.summary.subtotal}</span>
                <span className="font-bold text-white">{subtotal.toFixed(2)}&nbsp;€</span>
              </div>
              {isPromoApplied && (
                <div className="flex justify-between text-botanik-orange whitespace-nowrap">
                  <span>Remise (Code Promo)</span>
                  <span className="font-bold">-{ (subtotal * 0.1).toFixed(2) }&nbsp;€</span>
                </div>
              )}
              <div className="flex justify-between text-white/60 whitespace-nowrap">
                <span>{t.summary.shipping}</span>
                <span className="font-bold text-white">{shipping === 0 ? t.summary.free : `${shipping.toFixed(2)}&nbsp;€`}</span>
              </div>
              <div className="pt-4 border-t border-white/10 flex justify-between items-center whitespace-nowrap">
                <span className="text-lg font-bold">{t.summary.total}</span>
                <span className="text-3xl font-bold text-[#F97316]">{(isPromoApplied ? total * 0.9 : total).toFixed(2)}&nbsp;€</span>
              </div>
            </div>

            <button 
              onClick={onCheckout}
              className="w-full bg-[#F97316] text-white py-5 rounded-2xl font-bold text-lg hover:bg-[#EA580C] transition-all flex items-center justify-center gap-3 shadow-xl shadow-[#F97316]/20 mb-6"
            >
              {t.summary.checkout} <ChevronRight className="w-5 h-5" />
            </button>

            <div className="text-center mb-8">
              <p className="text-[10px] text-white/40 leading-relaxed">
                En validant votre commande, vous acceptez nos <button onClick={() => onNavigate('legal', undefined, 'cgv')} className="underline hover:text-botanik-orange transition-colors">CGV</button> et nos <button onClick={() => onNavigate('legal', undefined, 'mentions')} className="underline hover:text-botanik-orange transition-colors">Mentions Légales</button>.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-3 text-sm opacity-60">
                <Lock className="w-4 h-4" /> {t.summary.secure}
              </div>
              <div className="flex flex-wrap gap-4 grayscale opacity-50 brightness-200">
                <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-4" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" alt="Stripe" className="h-6" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6" />
              </div>

              {/* Mentions Légales & Garanties */}
              <div className="pt-8 border-t border-white/10 space-y-6">
                <div className="flex items-start gap-4">
                  <ShieldCheck className="w-6 h-6 text-green-500 shrink-0" />
                  <div>
                    <h4 className="text-sm font-bold mb-1">{t.summary.guarantee}</h4>
                    <p className="text-xs text-white/40 leading-relaxed">{t.summary.guarantee_desc}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Truck className="w-6 h-6 text-botanik-orange shrink-0" />
                  <div>
                    <h4 className="text-sm font-bold mb-1">{t.summary.shipping_24h}</h4>
                    <p className="text-xs text-white/40 leading-relaxed">{t.summary.shipping_desc}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Legal Footer for Cart */}
          <div className="bg-[#F5F3EB] p-8 rounded-3xl space-y-4">
            <h4 className="text-xs font-black uppercase tracking-widest text-botanik-green/40">{t.engagement.title}</h4>
            <div className="space-y-3">
              <div className="text-[10px] text-botanik-green/60 leading-relaxed">
                <span className="font-bold text-botanik-green">{t.engagement.refund_title}</span> {t.engagement.refund_desc}
              </div>
              <div className="text-[10px] text-botanik-green/60 leading-relaxed">
                <span className="font-bold text-botanik-green">{t.engagement.data_title}</span> {t.engagement.data_desc}
              </div>
              <div className="text-[10px] text-botanik-green/60 leading-relaxed">
                <span className="font-bold text-botanik-green">{t.engagement.support_title}</span> {t.engagement.support_desc}
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
