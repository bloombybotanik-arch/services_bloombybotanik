import React, { useState } from 'react';
import { Trash2, Plus, Minus, ShieldCheck, Truck, CreditCard, Lock, ArrowLeft, ChevronRight, Info, Sparkles, FlaskConical, BookOpen } from 'lucide-react';

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
}

export default function CartContent({ items, onUpdateQuantity, onRemove, onBack, onCheckout }: CartContentProps) {
  const hasBloomLab = items.some(item => item.id === 'bloomlab');
  const [shippingMethod, setShippingMethod] = useState<'colissimo' | 'laposte' | 'mondialrelay' | 'express'>(hasBloomLab ? 'laposte' : 'colissimo');
  
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const hasRemedies = items.some(item => item.id !== 'bloomlab');
  
  const getShippingPrice = () => {
    if (items.length === 0) return 0;
    
    // Free shipping ONLY if NO remedies AND subtotal >= 150 (example threshold for machine)
    // AND only for Colissimo or Mondial Relay
    if (!hasRemedies && subtotal >= 150 && (shippingMethod === 'colissimo' || shippingMethod === 'mondialrelay')) {
      return 0;
    }
    
    switch (shippingMethod) {
      case 'mondialrelay': return 4.90;
      case 'colissimo': return 6.90;
      case 'laposte': return 7.50;
      case 'express': return 14.90;
      default: return 6.90;
    }
  };

  const shipping = getShippingPrice();
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="max-w-[1200px] mx-auto px-6 py-32 text-center">
        <div className="w-24 h-24 bg-[#1B3022]/5 rounded-full flex items-center justify-center mx-auto mb-8">
          <Truck className="w-10 h-10 text-[#1B3022]/20" />
        </div>
        <h2 className="text-3xl font-bold text-[#1B3022] mb-4">Votre panier est vide</h2>
        <p className="text-[#1B3022]/60 mb-10 max-w-md mx-auto">Explorez notre boutique et découvrez nos solutions de souveraineté santé.</p>
        <button 
          onClick={onBack}
          className="bg-[#1B3022] text-white px-10 py-4 rounded-xl font-bold hover:bg-[#F97316] transition-all"
        >
          Retour à la boutique
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
        <div className="text-[10px] font-black uppercase tracking-[0.3em] text-[#F97316]">Votre Sélection</div>
      </div>
      
      <div className="mb-12">
        <h1 className="text-3xl md:text-6xl font-bold text-[#1B3022] mb-4">La Cohérence de votre Terrain.</h1>
        <p className="text-base md:text-xl text-[#1B3022]/60 max-w-2xl font-light">
          Chaque élément de votre panier a été choisi pour dialoguer avec votre biologie. Voici comment votre sélection s'articule pour votre souveraineté.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-12">
        {/* Items List */}
        <div className="lg:col-span-2 space-y-12">
          <div className="space-y-6">
            {items.map((item) => (
              <div key={item.id} className="bg-white p-6 rounded-[32px] border border-[#1B3022]/10 flex flex-col sm:flex-row gap-6 items-center group hover:shadow-xl transition-all duration-500">
                <div className="w-32 h-32 rounded-2xl overflow-hidden bg-[#F9F9F7] flex-shrink-0 relative">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <div className="text-[10px] font-bold text-[#F97316] uppercase tracking-widest mb-1">{item.subtitle}</div>
                  <h3 className="text-xl font-bold text-[#1B3022] mb-2">{item.name}</h3>
                  <div className="text-lg font-bold text-[#1B3022]">{item.price.toFixed(2)} €</div>
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
            <h3 className="text-2xl md:text-3xl font-bold mb-6">Pourquoi cet ensemble fonctionne ?</h3>
            <p className="text-lg text-white/70 leading-relaxed mb-8 font-light">
              {hasBloomLab 
                ? "L'acquisition de la BloomLab est le pilier de votre autonomie. Dès réception, activez votre Mois Premium Offert pour accéder à l'intégralité des 56 protocoles experts."
                : "Votre sélection de remèdes botaniques cible des dimensions complémentaires de votre terrain. Chaque plante a été sourcée pour sa pureté absolue et sa capacité à relancer vos fonctions vitales en douceur."}
            </p>
            {hasBloomLab && (
              <div className="p-4 bg-white/10 rounded-2xl border border-white/20 mb-8">
                <div className="flex items-center gap-3 text-botanik-orange font-bold uppercase text-[10px] tracking-[0.2em] mb-2">
                  <ShieldCheck className="w-4 h-4" /> Offre BloomLab Incluse
                </div>
                <p className="text-sm text-white/90">
                  Votre achat inclut 1 mois d'accès Premium offert. Vous pourrez l'activer via votre facture dans votre espace membre.
                </p>
              </div>
            )}
            <div className="flex items-center gap-3 text-[#F97316] font-bold uppercase text-xs tracking-widest">
              <ShieldCheck className="w-5 h-5" /> Protocoles de grade laboratoire
            </div>
          </div>

          {/* Value Proposition for Subscription */}
          {items.filter(i => i.id !== 'bloomlab').length >= 2 && (
            <div className="bg-[#F97316]/10 border-2 border-[#F97316] p-8 rounded-[40px] flex flex-col md:flex-row items-center gap-6">
              <div className="flex-1">
                <h4 className="text-xl font-bold text-[#1B3022] mb-2">Optimisez votre Souveraineté</h4>
                <p className="text-sm text-[#1B3022]/70 leading-relaxed">
                  Le prix de l'abonnement annuel (99€) est inférieur au prix de deux Kits Renaissance. Accédez à l'intégralité de la bibliothèque sans limite.
                </p>
              </div>
              <button 
                onClick={() => onBack()}
                className="px-6 py-3 bg-[#F97316] text-white rounded-xl font-bold text-sm hover:bg-[#EA580C] transition-all"
              >
                Découvrir le Premium
              </button>
            </div>
          )}

          {/* Cross-sell / Recommended */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.3em] text-[#1B3022]/40 mb-8 px-4">Compléments Recommandés</h4>
            <div className="grid sm:grid-cols-2 gap-6">
              {!hasBloomLab && (
                <div className="bg-white p-6 rounded-[32px] border border-[#F97316]/20 shadow-sm hover:shadow-xl transition-all group">
                  <div className="w-16 h-16 bg-[#F97316]/5 rounded-2xl flex items-center justify-center mb-6">
                    <FlaskConical className="w-8 h-8 text-[#F97316]" />
                  </div>
                  <h5 className="font-bold text-[#1B3022] mb-2">La BloomLab</h5>
                  <p className="text-xs text-[#1B3022]/60 mb-6 leading-relaxed">Passez de spectateur à acteur. Extrayez vous-même vos principes actifs pour une puissance multipliée par 4.</p>
                  <button onClick={() => onBack()} className="text-sm font-bold text-[#F97316] flex items-center gap-2 group-hover:gap-3 transition-all">
                    Découvrir l'instrument <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
              <div className="bg-white p-6 rounded-[32px] border border-[#1B3022]/10 shadow-sm hover:shadow-xl transition-all group">
                <div className="w-16 h-16 bg-[#1B3022]/5 rounded-2xl flex items-center justify-center mb-6">
                  <BookOpen className="w-8 h-8 text-[#1B3022]" />
                </div>
                <h5 className="font-bold text-[#1B3022] mb-2">L'Abonnement Premium</h5>
                <p className="text-xs text-[#1B3022]/60 mb-6 leading-relaxed">Accédez à l'intégralité des 56 kits de précision et aux protocoles de Reset Homéostatique.</p>
                <button onClick={() => onBack()} className="text-sm font-bold text-[#1B3022] flex items-center gap-2 group-hover:gap-3 transition-all">
                  Voir les avantages <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Delivery Options */}
          <div className="bg-white p-8 rounded-[32px] border border-[#1B3022]/10">
            <div className="flex items-center gap-3 mb-8">
              <Truck className="w-6 h-6 text-[#1B3022]" />
              <h2 className="text-2xl font-bold text-[#1B3022]">Mode de livraison</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <button 
                onClick={() => setShippingMethod('mondialrelay')}
                className={`p-6 rounded-2xl border-2 transition-all text-left ${shippingMethod === 'mondialrelay' ? 'border-[#F97316] bg-[#F97316]/5' : 'border-[#1B3022]/10 hover:border-[#1B3022]/30'}`}
              >
                <div className="font-bold text-[#1B3022] mb-1">Mondial Relay (4-5j)</div>
                <div className="text-sm opacity-60">Point Relais de votre choix</div>
                <div className="mt-4 font-bold text-[#F97316]">
                  {!hasRemedies && subtotal >= 150 ? 'Gratuit' : '4,90 €'}
                </div>
              </button>
              <button 
                onClick={() => setShippingMethod('colissimo')}
                className={`p-6 rounded-2xl border-2 transition-all text-left ${shippingMethod === 'colissimo' ? 'border-[#F97316] bg-[#F97316]/5' : 'border-[#1B3022]/10 hover:border-[#1B3022]/30'}`}
              >
                <div className="font-bold text-[#1B3022] mb-1">Colissimo (48h-72h)</div>
                <div className="text-sm opacity-60">Livraison à domicile</div>
                <div className="mt-4 font-bold text-[#F97316]">
                  {!hasRemedies && subtotal >= 150 ? 'Gratuit' : '6,90 €'}
                </div>
              </button>
              <button 
                onClick={() => setShippingMethod('laposte')}
                className={`p-6 rounded-2xl border-2 transition-all text-left ${shippingMethod === 'laposte' ? 'border-[#F97316] bg-[#F97316]/5' : 'border-[#1B3022]/10 hover:border-[#1B3022]/30'}`}
              >
                <div className="font-bold text-[#1B3022] mb-1">La Poste (48h)</div>
                <div className="text-sm opacity-60">Courrier suivi prioritaires</div>
                <div className="mt-4 font-bold text-[#F97316]">7,50 €</div>
              </button>
              <button 
                onClick={() => setShippingMethod('express')}
                className={`p-6 rounded-2xl border-2 transition-all text-left ${shippingMethod === 'express' ? 'border-[#F97316] bg-[#F97316]/5' : 'border-[#1B3022]/10 hover:border-[#1B3022]/30'}`}
              >
                <div className="font-bold text-[#1B3022] mb-1">Express (24h)</div>
                <div className="text-sm opacity-60">Chronopost Premium</div>
                <div className="mt-4 font-bold text-[#F97316]">14,90 €</div>
              </button>
            </div>
            {!hasRemedies && subtotal < 150 && (
              <div className="mt-6 p-4 bg-[#1B3022]/5 rounded-xl flex items-center gap-3">
                <Plus className="w-5 h-5 text-[#F97316]" />
                <p className="text-sm">Plus que <span className="font-bold">{(150 - subtotal).toFixed(2)} €</span> pour bénéficier de la <span className="font-bold">livraison offerte</span> !</p>
              </div>
            )}
            {hasRemedies && (
              <div className="mt-6 p-4 bg-[#F97316]/5 rounded-xl flex items-center gap-3 border border-[#F97316]/10">
                <Info className="w-5 h-5 text-[#F97316]" />
                <p className="text-xs text-[#1B3022]/70 italic">Note : Les remèdes botaniques nécessitent une expédition spécifique non éligible à la gratuité standard.</p>
              </div>
            )}
          </div>
        </div>

        {/* Summary */}
        <div className="space-y-6">
          <div className="bg-[#1B3022] text-white p-8 rounded-[40px] sticky top-24">
            <h2 className="text-2xl font-bold mb-8">Récapitulatif</h2>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-white/60">
                <span>Sous-total</span>
                <span className="font-bold text-white">{subtotal.toFixed(2)} €</span>
              </div>
              <div className="flex justify-between text-white/60">
                <span>Livraison</span>
                <span className="font-bold text-white">{shipping === 0 ? 'Gratuite' : `${shipping.toFixed(2)} €`}</span>
              </div>
              <div className="pt-4 border-t border-white/10 flex justify-between items-center">
                <span className="text-lg font-bold">Total</span>
                <span className="text-3xl font-bold text-[#F97316]">{total.toFixed(2)} €</span>
              </div>
            </div>

            <button 
              onClick={onCheckout}
              className="w-full bg-[#F97316] text-white py-5 rounded-2xl font-bold text-lg hover:bg-[#EA580C] transition-all flex items-center justify-center gap-3 shadow-xl shadow-[#F97316]/20 mb-8"
            >
              Procéder au paiement <ChevronRight className="w-5 h-5" />
            </button>

            <div className="space-y-6">
              <div className="flex items-center gap-3 text-sm opacity-60">
                <Lock className="w-4 h-4" /> Paiement 100% sécurisé
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
                    <h4 className="text-sm font-bold mb-1">Garantie Souveraineté</h4>
                    <p className="text-xs text-white/40 leading-relaxed">Chaque BloomLab est certifiée Inox 304 Grade Alimentaire et testée individuellement.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Truck className="w-6 h-6 text-botanik-orange shrink-0" />
                  <div>
                    <h4 className="text-sm font-bold mb-1">Expédition 24h</h4>
                    <p className="text-xs text-white/40 leading-relaxed">Préparé avec soin dans notre atelier en France. Numéro de suivi communiqué dès l'envoi.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Legal Footer for Cart */}
          <div className="bg-[#F5F3EB] p-8 rounded-3xl space-y-4">
            <h4 className="text-xs font-black uppercase tracking-widest text-botanik-green/40">Engagement Bloom</h4>
            <div className="space-y-3">
              <div className="text-[10px] text-botanik-green/60 leading-relaxed">
                <span className="font-bold text-botanik-green">Satisfait ou Remboursé :</span> Vous disposez de 14 jours pour changer d'avis dès réception de votre commande.
              </div>
              <div className="text-[10px] text-botanik-green/60 leading-relaxed">
                <span className="font-bold text-botanik-green">Données Personnelles :</span> Vos informations sont traitées conformément à notre Politique de Confidentialité et au RGPD.
              </div>
              <div className="text-[10px] text-botanik-green/60 leading-relaxed">
                <span className="font-bold text-botanik-green">SAV & Support :</span> Une question ? Contactez-nous à bloombybotanik@gmail.com.
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
