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
import { AmazonRatingBadge } from './components/AmazonSocialProof';

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
  const isDE = lang === 'de';
  const tr = (fr: string, en: string, de: string) => (isFR ? fr : isDE ? de : en);
  
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
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <div className="w-24 h-24 bg-[#1B3022]/5 rounded-full flex items-center justify-center mx-auto mb-8">
          <Truck className="w-10 h-10 text-[#1B3022]/20" />
        </div>
        <h2 className="text-3xl font-bold text-[#1B3022] mb-4">{t.empty.title}</h2>
        <p className="text-[#1B3022]/60 mb-10 max-w-md mx-auto">{t.empty.subtitle}</p>
        <button 
          onClick={onBack}
          className="bg-[#D97706] hover:bg-[#B45309] text-white px-10 py-4 rounded-xl font-bold transition-all shadow-lg shadow-orange-900/20 cursor-pointer"
        >
          {t.empty.button}
        </button>
      </div>
    );
  }

  return (
    <article className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center gap-4 mb-6 sm:mb-8">
        <button onClick={onBack} className="p-2 hover:bg-[#1B3022]/5 rounded-full transition-colors cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center">
          <ArrowLeft className="w-6 h-6 text-[#1B3022]" />
        </button>
        <div className="text-[10px] font-black uppercase tracking-[0.3em] text-[#C8AB8A]">{t.header.badge}</div>
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
                  className={`bg-white p-4 sm:p-6 rounded-2xl sm:rounded-[32px] border ${isComplet ? 'border-2 border-[#C8AB8A] shadow-lg' : 'border-[#1B3022]/10'} flex flex-col sm:flex-row gap-5 sm:gap-8 items-center group hover:shadow-xl transition-all duration-500`}
                >
                  <div className="w-28 sm:w-48 h-28 sm:h-48 aspect-square rounded-2xl overflow-hidden bg-[#F9F9F7] flex-shrink-0 relative border border-[#1B3022]/5">
                    <div className="absolute inset-2 overflow-hidden rounded-xl">
                      <img 
                        src={item.image || `/products/${item.id}.jpg`} 
                        alt={item.name} 
                        loading="lazy"
                        decoding="async"
                        onError={(e) => {
                          const target = e.currentTarget;
                          if (!target.dataset.triedFallback) {
                            target.dataset.triedFallback = "1";
                            target.src = `/products/${item.id}.jpg`;
                          } else if (target.dataset.triedFallback === "1") {
                            target.dataset.triedFallback = "2";
                            target.src = `/img/produit/${item.id}-1200x1200.jpg`;
                          } else if (target.dataset.triedFallback === "2") {
                            target.dataset.triedFallback = "3";
                            target.src = '/products/bloomlab.jpg';
                          }
                        }}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                      />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0 text-center sm:text-left space-y-2">
                    <div className="flex flex-wrap items-center gap-2 mb-1 justify-center sm:justify-start">
                      <span className="text-[10px] font-bold text-[#C8AB8A] uppercase tracking-widest">
                        {item.subtitle}
                      </span>
                      {isComplet && (
                        <span className="text-[9px] font-black uppercase tracking-wider bg-[#C8AB8A] text-[#0F261E] px-2.5 py-0.5 rounded-full">
                          {tr("Abonnement Mensuel", "Monthly Subscription", "Monatsabo")}
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#1B3022] leading-tight">{item.name}</h3>
                    <div className="text-lg sm:text-xl font-bold text-[#1B3022] whitespace-nowrap">
                      {item.price.toFixed(2).replace('.', ',')} €
                      {isComplet && <span className="text-xs font-normal text-[#1B3022]/60 ml-1">{tr("/mois", "/mo", "/Monat")}</span>}
                    </div>
                    {isComplet && (
                      <p className="text-xs text-[#1B3022]/70 italic pt-1">
                        {tr(
                          "1 préparation de 100 ml livrée chaque mois + guide + accès recettes et méthodes inclus.",
                          "100 ml preparation delivered monthly + guide + included recipe & method access.",
                          "100 ml Zubereitung monatlich geliefert + Guide + Zugang zu Rezepten & Methoden inklusive."
                        )}
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
                    aria-label={tr("Supprimer l'article", "Remove item", "Artikel entfernen")}
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              );
            })}
          </div>

          {/* Dedicated Bloom Complet Reassurance Card */}
          {hasBloomComplet && (
            <div className="bg-[#FFF8F0] border-2 border-[#C8AB8A] rounded-2xl sm:rounded-[32px] p-5 sm:p-8 relative overflow-hidden shadow-sm space-y-6">
              <div className="flex items-center gap-2 text-[#C8AB8A] text-xs font-black uppercase tracking-widest">
                <Package className="w-4 h-4 text-[#C8AB8A]" />
                <span>{tr("Votre formule Bloom Complet (59 €/mois)", "Your Bloom Complete Plan (59 €/month)", "Ihr Bloom Complet Abo (59 €/Monat)")}</span>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-[#3E4A3D] mb-2">
                  {tr("L'accompagnement botanique mensuel guidé", "Guided Monthly Botanical Journey", "Die geführte monatliche Pflanzenbegleitung")}
                </h3>
                <p className="text-sm text-[#3E4A3D]/80 leading-relaxed">
                  {tr(
                    "Bloom Complet réunit une préparation botanique mensuelle préparée par Bloom, les informations pour la découvrir et l'accès à nos ressources, sans obligation d'équipement.",
                    "Bloom Complete brings together a monthly preparation created by Bloom, information to discover it, and access to resources, with no equipment required.",
                    "Bloom Complet vereint eine monatliche botanische Zubereitung von Bloom, Anwendungsinformationen und Zugang zu unseren Ressourcen – ohne eigene Geräte."
                  )}
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 bg-white rounded-2xl border border-[#C8AB8A]/20 space-y-1">
                  <div className="font-bold text-xs text-[#3E4A3D] flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C8AB8A]" />
                    <span>{tr("Préparation mensuelle (100 ml)", "Monthly preparation (100 ml)", "Monatliche Zubereitung (100 ml)")}</span>
                  </div>
                  <p className="text-xs text-[#3E4A3D]/70 pl-5">
                    {tr("Sélection botanique préparée par Bloom et livrée à domicile.", "Botanical blend prepared by Bloom and delivered to your door.", "Von Bloom zubereitete Pflanzenmischung direkt zu Ihnen nach Hause.")}
                  </p>
                </div>

                <div className="p-4 bg-white rounded-2xl border border-[#C8AB8A]/20 space-y-1">
                  <div className="font-bold text-xs text-[#3E4A3D] flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C8AB8A]" />
                    <span>{tr("Guide clair de découverte", "Discovery Guide", "Klarer Entdeckungs-Guide")}</span>
                  </div>
                  <p className="text-xs text-[#3E4A3D]/70 pl-5">
                    {tr("Ingrédients, contexte d'usage prévu, conservation et précautions.", "Ingredients, context of use, storage advice, and precautions.", "Zutaten, Anwendungshinweise, Aufbewahrung und Vorsichtsmaßnahmen.")}
                  </p>
                </div>

                <div className="p-4 bg-white rounded-2xl border border-[#C8AB8A]/20 space-y-1">
                  <div className="font-bold text-xs text-[#3E4A3D] flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C8AB8A]" />
                    <span>{tr("Accès recettes et méthodes", "Recipe & method access", "Zugang zu Rezepten & Methoden")}</span>
                  </div>
                  <p className="text-xs text-[#3E4A3D]/70 pl-5">
                    {tr("Bibliothèque complète de fiches botaniques et techniques d'extraction.", "Complete library of monographs and extraction techniques.", "Komplette Bibliothek botanischer Datenblätter und Extraktionstechniken.")}
                  </p>
                </div>

                <div className="p-4 bg-white rounded-2xl border border-[#C8AB8A]/20 space-y-1">
                  <div className="font-bold text-xs text-[#3E4A3D] flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C8AB8A]" />
                    <span>{tr("Alma, assistant d'orientation", "Alma Orientation Assistant", "Alma, Ihr Orientierungsassistent")}</span>
                  </div>
                  <p className="text-xs text-[#3E4A3D]/70 pl-5">
                    {tr("Pour vous orienter vers les contenus, recettes et précautions publiées.", "Guides you to published recipes, methods, and precautions.", "Führt Sie zu veröffentlichten Rezepten, Methoden und Hinweisen.")}
                  </p>
                </div>
              </div>

              <div className="p-4 bg-white/80 rounded-2xl border border-[#C8AB8A]/20 text-xs text-[#3E4A3D]/80 space-y-1">
                <span className="font-bold text-[#3E4A3D] block">
                  {tr("Facturation et résiliation sans engagement :", "Billing & Commitment-free Terms:", "Abrechnung & flexible Kündigung:")}
                </span>
                <p>
                  {tr(
                    "59 €/mois. La livraison standard mensuelle de votre préparation est incluse. Vous pouvez suspendre ou résilier votre abonnement à tout moment depuis votre compte client.",
                    "59 €/month. Monthly standard shipping is included. You can pause or cancel anytime from your account.",
                    "59 €/Monat. Der monatliche Standardversand ist inklusive. Sie können Ihr Abo jederzeit im Kundenkonto pausieren oder kündigen."
                  )}
                </p>
              </div>

              <div className="p-3 bg-white rounded-xl border border-amber-300 text-[11px] text-amber-950 flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-[#C8AB8A] shrink-0 mt-0.5" />
                <span>
                  <strong>{tr("Rappel de sécurité : ", "Safety Notice: ", "Sicherheitshinweis: ")}</strong>
                  {tr(
                    "Bloom Complet est un accompagnement de découverte et de préparation botanique. Il ne remplace pas un médicament, un diagnostic, une consultation médicale ni les conseils d'un pharmacien.",
                    "Bloom Complete is an educational botanical journey. It does not replace medication, medical consultation, diagnosis, or pharmacist advice.",
                    "Bloom Complet ist ein pädagogisches Pflanzenprogramm. Es ersetzt keine Medikamente, ärztliche Diagnose oder Apothekerberatung."
                  )}
                </span>
              </div>
            </div>
          )}

          {/* Logic & Coherence Section */}
          <div className="bg-[#1B3022] text-white p-10 md:p-14 rounded-[48px] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
            <Sparkles className="w-10 h-10 text-[#C8AB8A] mb-6" />
            <h3 className="text-2xl md:text-3xl font-bold mb-4">{t.why_works.title}</h3>
            <p className="text-base md:text-lg text-white/75 leading-relaxed mb-6 font-light">
              {hasBloomLab 
                ? t.why_works.bloomlab
                : t.why_works.remedies}
            </p>
            {hasBloomLab && (
              <div className="p-4 bg-white/10 rounded-2xl border border-white/20 mb-6">
                <div className="flex items-center gap-3 text-[#C8AB8A] font-bold uppercase text-[10px] tracking-[0.2em] mb-2">
                  <ShieldCheck className="w-4 h-4" /> {t.why_works.offer_badge}
                </div>
                <p className="text-sm text-white/90">
                  {t.why_works.offer_desc}
                </p>
              </div>
            )}
            <div className="flex items-center gap-3 text-[#C8AB8A] font-bold uppercase text-xs tracking-widest">
              <ShieldCheck className="w-5 h-5" /> {t.why_works.lab_grade}
            </div>
          </div>

          {/* Cross-sell / Recommended */}
          <div className="bg-white p-5 sm:p-8 rounded-2xl sm:rounded-[40px] border border-[#1B3022]/10">
            <h4 className="text-xs font-black uppercase tracking-[0.3em] text-[#1B3022]/40 mb-6 sm:mb-8 px-2 sm:px-4">{t.recommended.title}</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {!hasBloomLab && (
                <div className="bg-[#F9F9F7] p-5 sm:p-8 rounded-2xl sm:rounded-[32px] border border-[#C8AB8A]/20 shadow-sm hover:shadow-xl transition-all group">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-2xl flex items-center justify-center mb-4 sm:mb-6 shadow-sm">
                    <FlaskConical className="w-6 h-6 sm:w-8 sm:h-8 text-[#C8AB8A]" />
                  </div>
                  <h5 className="text-base sm:text-lg font-bold text-[#1B3022] mb-2 sm:mb-3">{t.recommended.bloomlab_title}</h5>
                  <p className="text-xs sm:text-sm text-[#1B3022]/60 mb-6 sm:mb-8 leading-relaxed">{t.recommended.bloomlab_desc}</p>
                  <button onClick={() => onBack()} className="text-xs sm:text-sm font-bold text-[#C8AB8A] flex items-center gap-2 group-hover:gap-3 transition-all cursor-pointer py-1">
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
                <button onClick={() => onNavigate('machine')} className="text-xs sm:text-sm font-bold text-[#1B3022] flex items-center gap-2 group-hover:gap-3 transition-all cursor-pointer py-1">
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
                    <p className="text-xs text-[#C8AB8A] font-bold mt-1">
                      {tr("Livraison mensuelle standard incluse avec l'abonnement Bloom Complet", "Standard monthly shipping included with Bloom Complete", "Monatlicher Standardversand im Bloom Complet Abo enthalten")}
                    </p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <button 
                  onClick={() => setShippingMethod('mondialrelay')}
                  className={`p-4 sm:p-6 rounded-2xl sm:rounded-3xl border-2 transition-all text-left flex flex-col justify-between h-full cursor-pointer min-h-[48px] ${shippingMethod === 'mondialrelay' ? 'border-[#C8AB8A] bg-[#C8AB8A]/5 shadow-inner' : 'border-[#1B3022]/10 hover:border-[#1B3022]/30 bg-white'}`}
                >
                  <div>
                    <div className="font-bold text-[#1B3022] mb-1 text-sm sm:text-base">{t.shipping.methods.mondialrelay}</div>
                    <div className="text-xs opacity-60 leading-relaxed">{t.shipping.methods.mondialrelay_desc}</div>
                  </div>
                  <div className="mt-4 font-bold text-[#C8AB8A] text-base sm:text-lg">
                    {getMethodPriceLabel('mondialrelay')}
                  </div>
                </button>
                <button 
                  onClick={() => setShippingMethod('colissimo')}
                  className={`p-4 sm:p-6 rounded-2xl sm:rounded-3xl border-2 transition-all text-left flex flex-col justify-between h-full cursor-pointer min-h-[48px] ${shippingMethod === 'colissimo' ? 'border-[#C8AB8A] bg-[#C8AB8A]/5 shadow-inner' : 'border-[#1B3022]/10 hover:border-[#1B3022]/30 bg-white'}`}
                >
                  <div>
                    <div className="font-bold text-[#1B3022] mb-1 text-sm sm:text-base">{t.shipping.methods.colissimo}</div>
                    <div className="text-xs opacity-60 leading-relaxed">{t.shipping.methods.colissimo_desc}</div>
                  </div>
                  <div className="mt-4 font-bold text-[#C8AB8A] text-base sm:text-lg">
                    {getMethodPriceLabel('colissimo')}
                  </div>
                </button>
                <button 
                  onClick={() => setShippingMethod('laposte')}
                  className={`p-4 sm:p-6 rounded-2xl sm:rounded-3xl border-2 transition-all text-left flex flex-col justify-between h-full cursor-pointer min-h-[48px] ${shippingMethod === 'laposte' ? 'border-[#C8AB8A] bg-[#C8AB8A]/5 shadow-inner' : 'border-[#1B3022]/10 hover:border-[#1B3022]/30 bg-white'}`}
                >
                  <div>
                    <div className="font-bold text-[#1B3022] mb-1 text-sm sm:text-base">{t.shipping.methods.laposte}</div>
                    <div className="text-xs opacity-60 leading-relaxed">{t.shipping.methods.laposte_desc}</div>
                  </div>
                  <div className="mt-4 font-bold text-[#C8AB8A] text-base sm:text-lg">
                    {getMethodPriceLabel('laposte')}
                  </div>
                </button>
                <button 
                  onClick={() => setShippingMethod('express')}
                  className={`p-4 sm:p-6 rounded-2xl sm:rounded-3xl border-2 transition-all text-left flex flex-col justify-between h-full cursor-pointer min-h-[48px] ${shippingMethod === 'express' ? 'border-[#C8AB8A] bg-[#C8AB8A]/5 shadow-inner' : 'border-[#1B3022]/10 hover:border-[#1B3022]/30 bg-white'}`}
                >
                  <div>
                    <div className="font-bold text-[#1B3022] mb-1 text-sm sm:text-base">{t.shipping.methods.express}</div>
                    <div className="text-xs opacity-60 leading-relaxed">{t.shipping.methods.express_desc}</div>
                  </div>
                  <div className="mt-4 font-bold text-[#C8AB8A] text-base sm:text-lg">
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
                  placeholder={tr("CODE PROMO", "PROMO CODE", "GUTSCHEINCODE")}
                  className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm focus:border-[#C8AB8A] outline-none transition-all placeholder:text-white/20"
                />
                <button 
                  onClick={() => setIsPromoApplied(true)}
                  className="bg-[#D97706] text-white hover:bg-[#B45309] px-4 rounded-xl text-xs font-bold transition-all shadow-md shadow-orange-900/20 cursor-pointer"
                >
                  {tr("Appliquer", "Apply", "Einlösen")}
                </button>
              </div>
              {isPromoApplied && (
                <div className="mt-2 text-[10px] text-[#C8AB8A] flex items-center gap-2">
                  <Sparkles className="w-3 h-3" /> {tr("Code activé avec succès", "Code applied successfully", "Code erfolgreich aktiviert")}
                </div>
              )}
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-white/60 whitespace-nowrap">
                <span>{hasBloomComplet ? tr("Abonnement mensuel", "Monthly plan", "Monatsabo") : t.summary.subtotal}</span>
                <span className="font-bold text-white">{subtotal.toFixed(2).replace('.', ',')} €</span>
              </div>
              {isPromoApplied && (
                <div className="flex justify-between text-[#C8AB8A] whitespace-nowrap">
                  <span>{tr("Remise (Code Promo)", "Discount (Promo Code)", "Rabatt (Gutscheincode)")}</span>
                  <span className="font-bold">-{ (subtotal * 0.1).toFixed(2).replace('.', ',') } €</span>
                </div>
              )}
              <div className="flex justify-between text-white/60 whitespace-nowrap">
                <span>{hasBloomComplet ? tr("Livraison mensuelle", "Monthly shipping", "Monatlicher Versand") : (allDigital ? tr('Livraison', 'Delivery', 'Lieferung') : t.summary.shipping)}</span>
                <span className="font-bold text-white">
                  {hasBloomComplet 
                    ? tr("Incluse (Offerte)", "Included (Free)", "Inklusive (Kostenlos)") 
                    : (allDigital ? tr('Inclus / Gratuit', t.summary.free, t.summary.free) : (shipping === 0 ? t.summary.free : `${shipping.toFixed(2).replace('.', ',')} €`))}
                </span>
              </div>
              <div className="pt-4 border-t border-white/10 flex justify-between items-center whitespace-nowrap">
                <span className="text-lg font-bold">{t.summary.total}</span>
                <span className="text-3xl font-bold text-[#C8AB8A]">
                  {(isPromoApplied ? total * 0.9 : total).toFixed(2).replace('.', ',')} €
                  {hasBloomComplet && <span className="text-xs font-normal text-white/70 ml-1">{tr("/mois", "/mo", "/Monat")}</span>}
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
                    className="w-4 h-4 rounded mt-0.5 text-[#C8AB8A] focus:ring-0 cursor-pointer accent-[#C8AB8A]"
                  />
                  <span>
                    {tr(
                      "J'ai pris connaissance du contenu de l'abonnement Bloom Complet (59 €/mois), de la livraison mensuelle incluse, des conditions de résiliation sans engagement et des précautions associées.",
                      "I acknowledge the contents of Bloom Complete (59 €/month), monthly shipping included, commitment-free cancellation, and associated precautions.",
                      "Ich habe den Inhalt des Abonnements Bloom Complet (59 €/Monat), den monatlichen Versand inklusive, die monatliche Kündbarkeit und die Hinweise zur Kenntnis genommen."
                    )}
                  </span>
                </label>
                {showConsentWarning && !completConsent && (
                  <p className="mt-2 text-[11px] text-amber-300 font-semibold flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{tr("Veuillez cocher cette case pour valider votre commande.", "Please check this box to continue.", "Bitte aktivieren Sie dieses Feld, um fortzufahren.")}</span>
                  </p>
                )}
              </div>
            )}

            <button 
              onClick={handleProceedCheckout}
              className="w-full bg-[#D97706] text-white py-5 rounded-2xl font-bold text-lg hover:bg-[#B45309] transition-all flex items-center justify-center gap-3 shadow-lg shadow-orange-900/20 mb-6 cursor-pointer"
            >
              {t.summary.checkout} <ChevronRight className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <p className="text-[10px] text-white/50 leading-relaxed">
                {tr("En validant votre commande, vous acceptez nos", "By confirming your order, you accept our", "Mit Ihrer Bestellung akzeptieren Sie unsere")}{' '}
                <button onClick={() => onNavigate('legal', undefined, 'cgv')} className="underline hover:text-[#C8AB8A] transition-colors cursor-pointer">
                  {tr("CGV", "Terms of Sale", "AGB")}
                </button>{' '}
                {tr("et nos", "and", "und unser")}{' '}
                <button onClick={() => onNavigate('legal', undefined, 'mentions')} className="underline hover:text-[#C8AB8A] transition-colors cursor-pointer">
                  {tr("Mentions Légales", "Legal Notice", "Impressum")}
                </button>.
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
                <div className="flex items-center justify-center pb-1">
                  <AmazonRatingBadge lang={lang as any} variant="reassurance" />
                </div>
                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold mb-0.5">{t.summary.guarantee}</h4>
                    <p className="text-[11px] text-white/50 leading-relaxed">{t.summary.guarantee_desc}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Truck className="w-5 h-5 text-[#C8AB8A] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold mb-0.5">
                      {hasBloomComplet ? tr("Livraison mensuelle suivie", "Tracked monthly delivery", "Monatlicher Versand mit Tracking") : t.summary.shipping_24h}
                    </h4>
                    <p className="text-[11px] text-white/50 leading-relaxed">
                      {hasBloomComplet 
                        ? tr("Votre préparation botanique mensuelle est expédiée chaque mois avec suivi.", "Your monthly botanical preparation is shipped every month with tracking.", "Ihre monatliche Zubereitung wird jeden Monat mit Sendungsverfolgung verschickt.")
                        : t.summary.shipping_desc}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Legal Footer for Cart */}
          <div className="bg-[#F5F3EB] p-6 rounded-3xl space-y-3">
            <h4 className="text-xs font-black uppercase tracking-widest text-[#3E4A3D]/50">{t.engagement.title}</h4>
            <div className="space-y-2 text-[10px] text-[#3E4A3D]/70 leading-relaxed">
              <div>
                <span className="font-bold text-[#3E4A3D]">{t.engagement.refund_title}</span> {t.engagement.refund_desc}
              </div>
              <div>
                <span className="font-bold text-[#3E4A3D]">{t.engagement.data_title}</span> {t.engagement.data_desc}
              </div>
              <div>
                <span className="font-bold text-[#3E4A3D]">{t.engagement.support_title}</span> {t.engagement.support_desc}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full Statutory Disclaimer */}
      <div className="mt-16 p-6 bg-white rounded-3xl border border-[#1B3022]/10 shadow-sm flex items-start gap-4 text-xs text-[#1B3022]/80 leading-relaxed">
        <AlertCircle className="w-5 h-5 text-[#C8AB8A] shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-bold text-[#3E4A3D]">
            {tr("Information importante et sécurité :", "Important Safety Information:", "Wichtiger Sicherheitshinweis:")}
          </p>
          <p>
            {tr(
              "Les produits et contenus Bloom by BotaniK ne sont pas des médicaments. Les informations proposées sont destinées à la découverte des plantes et des méthodes de préparation ; elles ne remplacent pas l'avis d'un professionnel de santé. En cas de traitement, de pathologie, de grossesse, d'allaitement, d'allergie, de chirurgie programmée ou de doute, demandez conseil à un professionnel de santé qualifié avant d'utiliser une nouvelle préparation.",
              "Bloom by BotaniK products and content are not medicines. Information provided is for educational discovery of plants and preparation techniques; it does not replace the advice of a qualified healthcare professional. In case of medical treatment, pregnancy, breastfeeding, allergy, or doubt, consult a healthcare professional first.",
              "Produkte und Inhalte von Bloom by BotaniK sind keine Arzneimittel. Sie dienen der Information über Pflanzen und Zubereitungsmethoden und ersetzen keinen ärztlichen Rat. Bei Schwangerschaft, Stillzeit, Allergien oder Medikamenteneinnahme wenden Sie sich bitte vorab an eine Fachperson."
            )}
          </p>
        </div>
      </div>
    </article>
  );
}