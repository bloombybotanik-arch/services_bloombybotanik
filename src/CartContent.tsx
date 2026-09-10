import React, { useState } from 'react';
import { 
  Trash2, 
  Plus, 
  Minus, 
  ShieldCheck, 
  Truck, 
  CreditCard, 
  Lock, 
  ArrowLeft, 
  ChevronRight, 
  Info, 
  Sparkles, 
  FlaskConical, 
  BookOpen, 
  Package, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';
import { translations, Language } from './translations';
import { getShippingPrice, ShippingMethod, isDigitalProduct } from './lib/shippingUtils';

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
  const isFR = lang === 'fr';
  
  const hasBloomLab = items.some(item => item.id === 'bloomlab');
  const hasBloomComplet = items.some(item => item.id === 'bloom-complet');
  
  const [promoCode, setPromoCode] = useState('');
  const [isPromoApplied, setIsPromoApplied] = useState(false);
  const [completConsent, setCompletConsent] = useState(false);
  const [showConsentWarning, setShowConsentWarning] = useState(false);
  
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const allDigital = items.length > 0 && items.every(item => isDigitalProduct(item));
  
  const shipping = allDigital ? 0 : getShippingPrice(shippingMethod, items);
  const total = subtotal + shipping;

  const sachetCount = items.filter(item => item.id !== 'bloomlab' && !isDigitalProduct(item)).reduce((acc, item) => acc + item.quantity, 0);

  const getMethodPriceLabel = (method: ShippingMethod) => {
    const price = getShippingPrice(method, items);
    return price === 0 ? t.summary.free : (
      <span className="whitespace-nowrap">
        {price.toFixed(2).replace('.', ',')} €
      </span>
    );
  };

  const handleProceedCheckout = () => {
    if (hasBloomComplet && !completConsent) {
      setShowConsentWarning(true);
      return;
    }
    onCheckout();
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
          className="bg-[#0F261E] hover:bg-[#D97706] active:bg-[#D97706] text-white px-10 py-4 rounded-xl font-bold transition-all cursor-pointer"
        >
          {t.empty.button}
        </button>
      </div>
    );
  }

  return (
    <article className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center gap-4 mb-6 sm:mb-8">
        <button onClick={onBack} className="p-2 hover:bg-[#1B3022]/5 rounded-full transition-colors cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center">
          <ArrowLeft className="w-6 h-6 text-[#1B3022]" />
        </button>
        <div className="text-[10px] font-black uppercase tracking-[0.3em] text-[#D97706]">{t.header.badge}</div>
      </div>
      
      <div className="mb-8 sm:mb-12">
        <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-[#1B3022] mb-3 sm:mb-4">{t.header.title}</h1>
        <p className="text-sm sm:text-base md:text-xl text-[#1B3022]/60 max-w-2xl font-light">
          {t.header.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-12">
        {/* Items List */}
        <div className="lg:col-span-2 space-y-6 sm:space-y-8">
          <div className="space-y-4 sm:space-y-6">
            {items.map((item) => {
              const isComplet = item.id === 'bloom-complet';

              return (
                <div 
                  key={item.id} 
                  className={`bg-white p-4 sm:p-6 rounded-2xl sm:rounded-[32px] border ${isComplet ? 'border-2 border-[#D97706] shadow-lg' : 'border-[#1B3022]/10'} flex flex-col sm:flex-row gap-5 sm:gap-8 items-center group hover:shadow-xl transition-all duration-500`}
                >
                  <div className="w-28 sm:w-48 h-28 sm:h-48 aspect-square rounded-2xl overflow-hidden bg-[#F9F9F7] flex-shrink-0 relative border border-[#1B3022]/5">
                    <div className="absolute inset-2 overflow-hidden rounded-xl">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0 text-center sm:text-left space-y-2">
                    <div className="flex flex-wrap items-center gap-2 mb-1 justify-center sm:justify-start">
                      <span className="text-[10px] font-bold text-[#D97706] uppercase tracking-widest">
                        {item.subtitle}
                      </span>
                      {isComplet && (
                        <span className="text-[9px] font-black uppercase tracking-wider bg-[#D97706] text-white px-2.5 py-0.5 rounded-full">
                          {isFR ? "Abonnement Mensuel" : "Monthly Subscription"}
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#1B3022] leading-tight">{item.name}</h3>
                    <div className="text-lg sm:text-xl font-bold text-[#1B3022] whitespace-nowrap">
                      {item.price.toFixed(2).replace('.', ',')} €
                      {isComplet && <span className="text-xs font-normal text-[#1B3022]/60 ml-1">/mois</span>}
                    </div>
                    {isComplet && (
                      <p className="text-xs text-[#1B3022]/70 italic pt-1">
                        {isFR 
                          ? "1 préparation de 100 ml livrée chaque mois + guide + accès recettes et méthodes inclus."
                          : "100 ml preparation delivered monthly + guide + included recipe & method access."}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-3 sm:gap-4 bg-[#F9F9F7] p-2 rounded-xl">
                    <button 
                      onClick={() => onUpdateQuantity(item.id, -1)}
                      className="w-9 h-9 sm:w-8 sm:h-8 flex items-center justify-center hover:bg-white rounded-lg transition-colors cursor-pointer min-h-[36px] min-w-[36px]"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="font-bold w-6 text-center text-sm sm:text-base">{item.quantity}</span>
                    <button 
                      onClick={() => onUpdateQuantity(item.id, 1)}
                      className="w-9 h-9 sm:w-8 sm:h-8 flex items-center justify-center hover:bg-white rounded-lg transition-colors cursor-pointer min-h-[36px] min-w-[36px]"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <button 
                    onClick={() => onRemove(item.id)}
                    className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
                    aria-label="Supprimer l'article"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              );
            })}
          </div>

          {/* Dedicated Bloom Complet Reassurance Card */}
          {hasBloomComplet && (
            <div className="bg-[#FFF8F0] border-2 border-[#D97706] rounded-2xl sm:rounded-[32px] p-5 sm:p-8 relative overflow-hidden shadow-sm space-y-6">
              <div className="flex items-center gap-2 text-[#D97706] text-xs font-black uppercase tracking-widest">
                <Package className="w-4 h-4 text-[#D97706]" />
                <span>{isFR ? "Votre formule Bloom Complet (59 €/mois)" : "Your Bloom Complete Plan (59 €/month)"}</span>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-[#0F261E] mb-2">
                  {isFR ? "L'accompagnement botanique mensuel guidé" : "Guided Monthly Botanical Journey"}
                </h3>
                <p className="text-sm text-[#0F261E]/80 leading-relaxed">
                  {isFR 
                    ? "Bloom Complet réunit une préparation botanique mensuelle préparée par Bloom, les informations pour la découvrir et l'accès à nos ressources, sans obligation d'équipement."
                    : "Bloom Complete brings together a monthly preparation created by Bloom, information to discover it, and access to resources."}
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 bg-white rounded-2xl border border-[#D97706]/20 space-y-1">
                  <div className="font-bold text-xs text-[#0F261E] flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D97706]" />
                    <span>{isFR ? "Préparation mensuelle (100 ml)" : "Monthly preparation (100 ml)"}</span>
                  </div>
                  <p className="text-xs text-[#0F261E]/70 pl-5">
                    {isFR ? "Sélection botanique préparée par Bloom et livrée à domicile." : "Botanical blend prepared by Bloom and delivered to your door."}
                  </p>
                </div>

                <div className="p-4 bg-white rounded-2xl border border-[#D97706]/20 space-y-1">
                  <div className="font-bold text-xs text-[#0F261E] flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D97706]" />
                    <span>{isFR ? "Guide clair de découverte" : "Discovery Guide"}</span>
                  </div>
                  <p className="text-xs text-[#0F261E]/70 pl-5">
                    {isFR ? "Ingrédients, contexte d'usage prévu, conservation et précautions." : "Ingredients, context of use, storage advice, and precautions."}
                  </p>
                </div>

                <div className="p-4 bg-white rounded-2xl border border-[#D97706]/20 space-y-1">
                  <div className="font-bold text-xs text-[#0F261E] flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D97706]" />
                    <span>{isFR ? "Accès recettes et méthodes" : "Recipe & method access"}</span>
                  </div>
                  <p className="text-xs text-[#0F261E]/70 pl-5">
                    {isFR ? "Bibliothèque complète de fiches botaniques et techniques d'extraction." : "Complete library of monographs and extraction techniques."}
                  </p>
                </div>

                <div className="p-4 bg-white rounded-2xl border border-[#D97706]/20 space-y-1">
                  <div className="font-bold text-xs text-[#0F261E] flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D97706]" />
                    <span>{isFR ? "Alma, assistant d'orientation" : "Alma Orientation Assistant"}</span>
                  </div>
                  <p className="text-xs text-[#0F261E]/70 pl-5">
                    {isFR ? "Pour vous orienter vers les contenus, recettes et précautions publiées." : "Guides you to published recipes, methods, and precautions."}
                  </p>
                </div>
              </div>

              <div className="p-4 bg-white/80 rounded-2xl border border-[#D97706]/20 text-xs text-[#0F261E]/80 space-y-1">
                <span className="font-bold text-[#0F261E] block">
                  {isFR ? "Facturation et résiliation sans engagement :" : "Billing & Commitment-free Terms:"}
                </span>
                <p>
                  {isFR 
                    ? "59 €/mois. La livraison standard mensuelle de votre préparation est incluse. Vous pouvez suspendre ou résilier votre abonnement à tout moment depuis votre compte client."
                    : "59 €/month. Monthly standard shipping is included. You can pause or cancel anytime from your account."}
                </p>
              </div>

              <div className="p-3 bg-white rounded-xl border border-amber-300 text-[11px] text-amber-950 flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
                <span>
                  <strong>{isFR ? "Rappel de sécurité : " : "Safety Notice: "}</strong>
                  {isFR 
                    ? "Bloom Complet est un accompagnement de découverte et de préparation botanique. Il ne remplace pas un médicament, un diagnostic, une consultation médicale ni les conseils d'un pharmacien."
                    : "Bloom Complete is an educational botanical journey. It does not replace medication, medical consultation, diagnosis, or pharmacist advice."}
                </span>
              </div>
            </div>
          )}

          {/* Logic & Coherence Section */}
          <div className="bg-[#1B3022] text-white p-10 md:p-14 rounded-[48px] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
            <Sparkles className="w-10 h-10 text-[#D97706] mb-6" />
            <h3 className="text-2xl md:text-3xl font-bold mb-4">{t.why_works.title}</h3>
            <p className="text-base md:text-lg text-white/75 leading-relaxed mb-6 font-light">
              {hasBloomLab 
                ? t.why_works.bloomlab
                : t.why_works.remedies}
            </p>
            {hasBloomLab && (
              <div className="p-4 bg-white/10 rounded-2xl border border-white/20 mb-6">
                <div className="flex items-center gap-3 text-[#D97706] font-bold uppercase text-[10px] tracking-[0.2em] mb-2">
                  <ShieldCheck className="w-4 h-4" /> {t.why_works.offer_badge}
                </div>
                <p className="text-sm text-white/90">
                  {t.why_works.offer_desc}
                </p>
              </div>
            )}
            <div className="flex items-center gap-3 text-[#D97706] font-bold uppercase text-xs tracking-widest">
              <ShieldCheck className="w-5 h-5" /> {t.why_works.lab_grade}
            </div>
          </div>

          {/* Cross-sell / Recommended */}
          <div className="bg-white p-5 sm:p-8 rounded-2xl sm:rounded-[40px] border border-[#1B3022]/10">
            <h4 className="text-xs font-black uppercase tracking-[0.3em] text-[#1B3022]/40 mb-6 sm:mb-8 px-2 sm:px-4">{t.recommended.title}</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {!hasBloomLab && (
                <div className="bg-[#F9F9F7] p-5 sm:p-8 rounded-2xl sm:rounded-[32px] border border-[#D97706]/20 shadow-sm hover:shadow-xl transition-all group">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-2xl flex items-center justify-center mb-4 sm:mb-6 shadow-sm">
                    <FlaskConical className="w-6 h-6 sm:w-8 sm:h-8 text-[#D97706]" />
                  </div>
                  <h5 className="text-base sm:text-lg font-bold text-[#1B3022] mb-2 sm:mb-3">{t.recommended.bloomlab_title}</h5>
                  <p className="text-xs sm:text-sm text-[#1B3022]/60 mb-6 sm:mb-8 leading-relaxed">{t.recommended.bloomlab_desc}</p>
                  <button onClick={() => onBack()} className="text-xs sm:text-sm font-bold text-[#D97706] flex items-center gap-2 group-hover:gap-3 transition-all cursor-pointer py-1">
                    {t.recommended.bloomlab_btn} <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
              <div className="bg-[#F9F9F7] p-5 sm:p-8 rounded-2xl sm:rounded-[32px] border border-[#1B3022]/10 shadow-sm hover:shadow-xl transition-all group">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-2xl flex items-center justify-center mb-4 sm:mb-6 shadow-sm">
                  <BookOpen className="w-6 h-6 sm:w-8 sm:h-8 text-[#1B3022]" />
                </div>
                <h5 className="text-base sm:text-lg font-bold text-[#1B3022] mb-2 sm:mb-3">{t.recommended.premium_title}</h5>
                <p className="text-xs sm:text-sm text-[#1B3022]/60 mb-6 sm:mb-8 leading-relaxed">{t.recommended.premium_desc}</p>
                <button onClick={() => onNavigate('abonnement')} className="text-xs sm:text-sm font-bold text-[#1B3022] flex items-center gap-2 group-hover:gap-3 transition-all cursor-pointer py-1">
                  {t.recommended.premium_btn} <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Delivery Options */}
          {!allDigital && (
            <div className="bg-white p-5 sm:p-8 rounded-2xl sm:rounded-[32px] border border-[#1B3022]/10">
              <div className="flex items-center gap-3 mb-6 sm:mb-8">
                <Truck className="w-6 h-6 text-[#1B3022]" />
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#1B3022]">{t.shipping.title}</h2>
                  {hasBloomComplet && (
                    <p className="text-xs text-[#D97706] font-bold mt-1">
                      {isFR ? "Livraison mensuelle standard incluse avec l'abonnement Bloom Complet" : "Standard monthly shipping included with Bloom Complete"}
                    </p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <button 
                  onClick={() => setShippingMethod('mondialrelay')}
                  className={`p-4 sm:p-6 rounded-2xl sm:rounded-3xl border-2 transition-all text-left flex flex-col justify-between h-full cursor-pointer min-h-[48px] ${shippingMethod === 'mondialrelay' ? 'border-[#D97706] bg-[#D97706]/5 shadow-inner' : 'border-[#1B3022]/10 hover:border-[#1B3022]/30 bg-white'}`}
                >
                  <div>
                    <div className="font-bold text-[#1B3022] mb-1 text-sm sm:text-base">{t.shipping.methods.mondialrelay}</div>
                    <div className="text-xs opacity-60 leading-relaxed">{t.shipping.methods.mondialrelay_desc}</div>
                  </div>
                  <div className="mt-4 font-bold text-[#D97706] text-base sm:text-lg">
                    {getMethodPriceLabel('mondialrelay')}
                  </div>
                </button>
                <button 
                  onClick={() => setShippingMethod('colissimo')}
                  className={`p-4 sm:p-6 rounded-2xl sm:rounded-3xl border-2 transition-all text-left flex flex-col justify-between h-full cursor-pointer min-h-[48px] ${shippingMethod === 'colissimo' ? 'border-[#D97706] bg-[#D97706]/5 shadow-inner' : 'border-[#1B3022]/10 hover:border-[#1B3022]/30 bg-white'}`}
                >
                  <div>
                    <div className="font-bold text-[#1B3022] mb-1 text-sm sm:text-base">{t.shipping.methods.colissimo}</div>
                    <div className="text-xs opacity-60 leading-relaxed">{t.shipping.methods.colissimo_desc}</div>
                  </div>
                  <div className="mt-4 font-bold text-[#D97706] text-base sm:text-lg">
                    {getMethodPriceLabel('colissimo')}
                  </div>
                </button>
                <button 
                  onClick={() => setShippingMethod('laposte')}
                  className={`p-4 sm:p-6 rounded-2xl sm:rounded-3xl border-2 transition-all text-left flex flex-col justify-between h-full cursor-pointer min-h-[48px] ${shippingMethod === 'laposte' ? 'border-[#D97706] bg-[#D97706]/5 shadow-inner' : 'border-[#1B3022]/10 hover:border-[#1B3022]/30 bg-white'}`}
                >
                  <div>
                    <div className="font-bold text-[#1B3022] mb-1 text-sm sm:text-base">{t.shipping.methods.laposte}</div>
                    <div className="text-xs opacity-60 leading-relaxed">{t.shipping.methods.laposte_desc}</div>
                  </div>
                  <div className="mt-4 font-bold text-[#D97706] text-base sm:text-lg">
                    {getMethodPriceLabel('laposte')}
                  </div>
                </button>
                <button 
                  onClick={() => setShippingMethod('express')}
                  className={`p-4 sm:p-6 rounded-2xl sm:rounded-3xl border-2 transition-all text-left flex flex-col justify-between h-full cursor-pointer min-h-[48px] ${shippingMethod === 'express' ? 'border-[#D97706] bg-[#D97706]/5 shadow-inner' : 'border-[#1B3022]/10 hover:border-[#1B3022]/30 bg-white'}`}
                >
                  <div>
                    <div className="font-bold text-[#1B3022] mb-1 text-sm sm:text-base">{t.shipping.methods.express}</div>
                    <div className="text-xs opacity-60 leading-relaxed">{t.shipping.methods.express_desc}</div>
                  </div>
                  <div className="mt-4 font-bold text-[#D97706] text-base sm:text-lg">
                    {getMethodPriceLabel('express')}
                  </div>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Summary Sidebar */}
        <div className="space-y-6">
          <div className="bg-[#1B3022] text-white p-5 sm:p-8 rounded-3xl sm:rounded-[40px] sticky top-24">
            <h2 className="text-2xl font-bold mb-6">{t.summary.title}</h2>
            
            {/* Promo Code Field */}
            <div className="mb-6">
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                  placeholder="CODE PROMO"
                  className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm focus:border-[#D97706] outline-none transition-all placeholder:text-white/20"
                />
                <button 
                  onClick={() => setIsPromoApplied(true)}
                  className="bg-[#0F261E] text-white hover:bg-[#1C3F34] px-4 rounded-xl text-xs font-bold transition-all border border-white/20 cursor-pointer"
                >
                  Appliquer
                </button>
              </div>
              {isPromoApplied && (
                <div className="mt-2 text-[10px] text-[#D97706] flex items-center gap-2">
                  <Sparkles className="w-3 h-3" /> Code activé avec succès
                </div>
              )}
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-white/60 whitespace-nowrap">
                <span>{hasBloomComplet ? (isFR ? "Abonnement mensuel" : "Monthly plan") : t.summary.subtotal}</span>
                <span className="font-bold text-white">{subtotal.toFixed(2).replace('.', ',')} €</span>
              </div>
              {isPromoApplied && (
                <div className="flex justify-between text-[#D97706] whitespace-nowrap">
                  <span>Remise (Code Promo)</span>
                  <span className="font-bold">-{ (subtotal * 0.1).toFixed(2).replace('.', ',') } €</span>
                </div>
              )}
              <div className="flex justify-between text-white/60 whitespace-nowrap">
                <span>{hasBloomComplet ? (isFR ? "Livraison mensuelle" : "Monthly shipping") : (allDigital ? (isFR ? 'Livraison' : 'Delivery') : t.summary.shipping)}</span>
                <span className="font-bold text-white">
                  {hasBloomComplet 
                    ? (isFR ? "Incluse (Offerte)" : "Included") 
                    : (allDigital ? (isFR ? 'Inclus / Gratuit' : t.summary.free) : (shipping === 0 ? t.summary.free : `${shipping.toFixed(2).replace('.', ',')} €`))}
                </span>
              </div>
              <div className="pt-4 border-t border-white/10 flex justify-between items-center whitespace-nowrap">
                <span className="text-lg font-bold">{t.summary.total}</span>
                <span className="text-3xl font-bold text-[#D97706]">
                  {(isPromoApplied ? total * 0.9 : total).toFixed(2).replace('.', ',')} €
                  {hasBloomComplet && <span className="text-xs font-normal text-white/70 ml-1">/mois</span>}
                </span>
              </div>
            </div>

            {/* Bloom Complet Mandatory Consent Checkbox */}
            {hasBloomComplet && (
              <div className="mb-6 p-4 bg-white/5 rounded-2xl border border-white/15">
                <label className="flex items-start gap-3 cursor-pointer text-xs text-white/90 leading-relaxed">
                  <input
                    type="checkbox"
                    checked={completConsent}
                    onChange={(e) => {
                      setCompletConsent(e.target.checked);
                      if (e.target.checked) setShowConsentWarning(false);
                    }}
                    className="w-4 h-4 rounded mt-0.5 text-[#D97706] focus:ring-0 cursor-pointer accent-[#D97706]"
                  />
                  <span>
                    {isFR 
                      ? "J'ai pris connaissance du contenu de l'abonnement Bloom Complet (59 €/mois), de la livraison mensuelle incluse, des conditions de résiliation sans engagement et des précautions associées."
                      : "I acknowledge the contents of Bloom Complete (59 €/month), monthly shipping included, commitment-free cancellation, and associated precautions."}
                  </span>
                </label>
                {showConsentWarning && !completConsent && (
                  <p className="mt-2 text-[11px] text-amber-300 font-semibold flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>Veuillez cocher cette case pour valider votre commande.</span>
                  </p>
                )}
              </div>
            )}

            <button 
              onClick={handleProceedCheckout}
              className="w-full bg-[#D97706] text-white py-5 rounded-2xl font-bold text-lg hover:bg-[#b45309] transition-all flex items-center justify-center gap-3 shadow-xl shadow-[#D97706]/20 mb-6 cursor-pointer"
            >
              {t.summary.checkout} <ChevronRight className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <p className="text-[10px] text-white/50 leading-relaxed">
                En validant votre commande, vous acceptez nos <button onClick={() => onNavigate('legal', undefined, 'cgv')} className="underline hover:text-[#D97706] transition-colors cursor-pointer">CGV</button> et nos <button onClick={() => onNavigate('legal', undefined, 'mentions')} className="underline hover:text-[#D97706] transition-colors cursor-pointer">Mentions Légales</button>.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm opacity-60">
                <Lock className="w-4 h-4" /> {t.summary.secure}
              </div>
              <div className="flex flex-wrap gap-4 grayscale opacity-50 brightness-200">
                <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-4" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" alt="Stripe" className="h-6" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6" />
              </div>

              {/* Garanties */}
              <div className="pt-6 border-t border-white/10 space-y-4">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold mb-0.5">{t.summary.guarantee}</h4>
                    <p className="text-[11px] text-white/50 leading-relaxed">{t.summary.guarantee_desc}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Truck className="w-5 h-5 text-[#D97706] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold mb-0.5">
                      {hasBloomComplet ? "Livraison mensuelle suivie" : t.summary.shipping_24h}
                    </h4>
                    <p className="text-[11px] text-white/50 leading-relaxed">
                      {hasBloomComplet 
                        ? "Votre préparation botanique mensuelle est expédiée chaque mois avec suivi."
                        : t.summary.shipping_desc}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Legal Footer for Cart */}
          <div className="bg-[#F5F3EB] p-6 rounded-3xl space-y-3">
            <h4 className="text-xs font-black uppercase tracking-widest text-[#0F261E]/50">{t.engagement.title}</h4>
            <div className="space-y-2 text-[10px] text-[#0F261E]/70 leading-relaxed">
              <div>
                <span className="font-bold text-[#0F261E]">{t.engagement.refund_title}</span> {t.engagement.refund_desc}
              </div>
              <div>
                <span className="font-bold text-[#0F261E]">{t.engagement.data_title}</span> {t.engagement.data_desc}
              </div>
              <div>
                <span className="font-bold text-[#0F261E]">{t.engagement.support_title}</span> {t.engagement.support_desc}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full Statutory Disclaimer */}
      <div className="mt-16 p-6 bg-white rounded-3xl border border-[#1B3022]/10 shadow-sm flex items-start gap-4 text-xs text-[#1B3022]/80 leading-relaxed">
        <AlertCircle className="w-5 h-5 text-[#D97706] shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-bold text-[#0F261E]">
            {isFR ? "Information importante et sécurité :" : "Important Safety Information:"}
          </p>
          <p>
            {isFR 
              ? "Les produits et contenus Bloom by BotaniK ne sont pas des médicaments. Les informations proposées sont destinées à la découverte des plantes et des méthodes de préparation ; elles ne remplacent pas l'avis d'un professionnel de santé. En cas de traitement, de pathologie, de grossesse, d'allaitement, d'allergie, de chirurgie programmée ou de doute, demandez conseil à un professionnel de santé qualifié avant d'utiliser une nouvelle préparation."
              : "Bloom by BotaniK products and content are not medicines. Information provided is for educational discovery of plants and preparation techniques; it does not replace the advice of a qualified healthcare professional."}
          </p>
        </div>
      </div>
    </article>
  );
}
