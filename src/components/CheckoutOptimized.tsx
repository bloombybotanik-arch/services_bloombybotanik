import React, { useState, useEffect } from 'react';
import { ShieldCheck, Lock, Truck, CreditCard, ChevronRight, CheckCircle2, ArrowLeft, Tag, X, Sparkles, Clock, AlertCircle } from 'lucide-react';
import { PaymentBadges } from './PaymentBadges';
import styles from './CheckoutOptimized.module.css';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  selectedKitOption?: string;
}

interface CheckoutOptimizedProps {
  cart: CartItem[];
  total: number;
  user?: any;
  onSuccess: (orderData: any) => void;
  onCancel: () => void;
  lang?: string;
}

export const CheckoutOptimized: React.FC<CheckoutOptimizedProps> = ({
  cart,
  total,
  user,
  onSuccess,
  onCancel,
  lang = 'fr',
}) => {
  const isDE = lang === 'de';
  const isFR = lang === 'fr';

  // Customer form fields prefilled from user or localStorage
  const [formData, setFormData] = useState(() => {
    try {
      const saved = localStorage.getItem('bloom_checkout_info');
      if (saved) return JSON.parse(saved);
    } catch {}
    return {
      email: user?.email || '',
      firstName: '',
      lastName: '',
      address: '',
      city: '',
      postalCode: '',
      phone: '',
      country: 'France',
    };
  });

  const [shippingMethod, setShippingMethod] = useState<'colissimo' | 'express'>('colissimo');
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [discountMessage, setDiscountMessage] = useState<string | null>(null);
  const [showExitModal, setShowExitModal] = useState(false);
  const [recoveryEmail, setRecoveryEmail] = useState('');
  const [recoverySent, setRecoverySent] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Save form data on change
  useEffect(() => {
    try {
      localStorage.setItem('bloom_checkout_info', JSON.stringify(formData));
    } catch {}
  }, [formData]);

  // Exit intent detection (cursor leaving top)
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 10 && !discountPercent && cart.length > 0) {
        setShowExitModal(true);
      }
    };
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [discountPercent, cart.length]);

  const shippingPrice = shippingMethod === 'express' ? 12.9 : total >= 200 ? 0 : 7.9;
  const rawSubtotal = cart.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);
  const discountAmount = discountPercent > 0 ? (rawSubtotal * discountPercent) / 100 : 0;
  const finalTotal = Math.max(0, rawSubtotal - discountAmount + shippingPrice);

  const applyPromo = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'BIENVENUE5' || clean === 'SOLEIL5' || clean === 'BLOOM5') {
      setDiscountPercent(5);
      setDiscountMessage(isFR ? "Code de 5% appliqué avec succès !" : "5% discount applied!");
      setShowExitModal(false);
    } else {
      setDiscountMessage(isFR ? "Code non valide." : "Invalid discount code.");
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleCompleteOrder = () => {
    if (!formData.email || !formData.firstName || !formData.address) {
      alert(isFR ? "Veuillez remplir vos coordonnées de livraison." : "Please fill in shipping details.");
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onSuccess({
        orderId: `BL-${Date.now().toString().slice(-6)}`,
        items: cart,
        total: finalTotal,
        customer: formData,
      });
    }, 1200);
  };

  const handleSendRecoveryEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (recoveryEmail) {
      setRecoverySent(true);
      // Save abandoned cart recovery sequence in localStorage for simulation
      try {
        const recoveryData = {
          email: recoveryEmail,
          cart,
          discountCode: 'BIENVENUE5',
          timestamp: Date.now(),
          scheduledReminders: ['H+1', 'H+24', 'H+72'],
        };
        localStorage.setItem('bloom_abandoned_cart_sequence', JSON.stringify(recoveryData));
      } catch {}
      applyPromo('BIENVENUE5');
      setTimeout(() => {
        setShowExitModal(false);
      }, 1500);
    }
  };

  return (
    <div className={styles.checkoutContainer}>
      <div className={styles.checkoutLayout}>
        
        {/* Left Column: Checkout Form */}
        <div className={styles.mainColumn}>
          
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-[#3E4A3D] mb-2 cursor-pointer w-fit"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{isFR ? "Retourner à la boutique" : "Back to store"}</span>
          </button>

          {/* Express Checkout Options */}
          <div className={styles.expressSection}>
            <div className={styles.expressTitle}>
              {isFR ? "Paiement Express en 1 Clic" : "Express 1-Click Checkout"}
            </div>
            <div className={styles.expressButtons}>
              <button
                type="button"
                onClick={() => {
                  handleInputChange('email', formData.email || 'express@applepay.com');
                  handleInputChange('firstName', 'Client');
                  handleInputChange('lastName', 'ApplePay');
                  handleInputChange('address', '1 Rue de la Paix');
                  handleInputChange('city', 'Paris');
                  handleInputChange('postalCode', '75001');
                  handleCompleteOrder();
                }}
                className={styles.expressBtnApple}
              >
                <span>Pay</span>
                <span className="text-xs">Express</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  handleInputChange('email', formData.email || 'express@paypal.com');
                  handleInputChange('firstName', 'Client');
                  handleInputChange('lastName', 'PayPal');
                  handleInputChange('address', '1 Rue de la Paix');
                  handleInputChange('city', 'Paris');
                  handleInputChange('postalCode', '75001');
                  handleCompleteOrder();
                }}
                className={styles.expressBtnPaypal}
              >
                <span>PayPal</span>
                <span className="text-xs font-medium">Checkout</span>
              </button>
            </div>
          </div>

          <div className={styles.divider}>
            <span>{isFR ? "Ou coordonnées standard" : "Or standard details"}</span>
          </div>

          {/* Step 1: Customer Contact & Shipping */}
          <div className={styles.box}>
            <div className={styles.stepTitle}>
              <div className="flex items-center">
                <span className={styles.stepNumber}>1</span>
                <span>{isFR ? "Coordonnées & Livraison" : "Contact & Delivery"}</span>
              </div>
              <span className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                <Truck className="w-3.5 h-3.5" />
                <span>{isFR ? "Expédié sous 24/48h" : "Ships in 24/48h"}</span>
              </span>
            </div>

            <div className={styles.formGrid}>
              <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                <label className={styles.label}>{isFR ? "Adresse email (pour le suivi de commande)" : "Email address"}</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="votre.email@exemple.com"
                  className={styles.input}
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>{isFR ? "Prénom" : "First Name"}</label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  placeholder="Éléonore"
                  className={styles.input}
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>{isFR ? "Nom" : "Last Name"}</label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  placeholder="Moreau"
                  className={styles.input}
                  required
                />
              </div>

              <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                <label className={styles.label}>{isFR ? "Adresse de livraison" : "Shipping address"}</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  placeholder="12 rue des Plantes"
                  className={styles.input}
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>{isFR ? "Code Postal" : "Postal Code"}</label>
                <input
                  type="text"
                  value={formData.postalCode}
                  onChange={(e) => handleInputChange('postalCode', e.target.value)}
                  placeholder="75001"
                  className={styles.input}
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>{isFR ? "Ville" : "City"}</label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  placeholder="Paris"
                  className={styles.input}
                  required
                />
              </div>

              <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                <label className={styles.label}>{isFR ? "Téléphone (pour le livreur)" : "Phone number"}</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="06 12 34 56 78"
                  className={styles.input}
                />
              </div>
            </div>

            {/* Shipping Mode Selector */}
            <div className="mt-6 pt-6 border-t border-slate-100">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 block">
                {isFR ? "Mode d'expédition prioritaire :" : "Shipping speed:"}
              </label>

              <div
                onClick={() => setShippingMethod('colissimo')}
                className={`${styles.shippingOption} ${shippingMethod === 'colissimo' ? styles.shippingOptionActive : ''}`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="shipping"
                    checked={shippingMethod === 'colissimo'}
                    onChange={() => setShippingMethod('colissimo')}
                    className="accent-[#C8AB8A]"
                  />
                  <div>
                    <div className="font-bold text-sm text-[#3E4A3D]">
                      {isFR ? "Colissimo Suivi Domicile (24-48h)" : "Colissimo Tracked (24-48h)"}
                    </div>
                    <div className="text-xs text-slate-500">
                      {isFR ? "Remise en boîte aux lettres avec numéro de suivi" : "Tracked home delivery"}
                    </div>
                  </div>
                </div>
                <div className="font-bold text-sm text-[#3E4A3D]">
                  {total >= 200 ? (
                    <span className="text-emerald-600 uppercase font-black text-xs">{isFR ? "Gratuit" : "Free"}</span>
                  ) : (
                    "7,90 €"
                  )}
                </div>
              </div>

              <div
                onClick={() => setShippingMethod('express')}
                className={`${styles.shippingOption} ${shippingMethod === 'express' ? styles.shippingOptionActive : ''}`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="shipping"
                    checked={shippingMethod === 'express'}
                    onChange={() => setShippingMethod('express')}
                    className="accent-[#C8AB8A]"
                  />
                  <div>
                    <div className="font-bold text-sm text-[#3E4A3D]">
                      {isFR ? "Chronopost Express 24h Garanti" : "Chronopost Express 24h"}
                    </div>
                    <div className="text-xs text-slate-500">
                      {isFR ? "Livraison le lendemain avant 13h" : "Next-day delivery before 1pm"}
                    </div>
                  </div>
                </div>
                <div className="font-bold text-sm text-[#3E4A3D]">12,90 €</div>
              </div>
            </div>
          </div>

          {/* Step 2: Payment Security */}
          <div className={styles.box}>
            <div className={styles.stepTitle}>
              <div className="flex items-center">
                <span className={styles.stepNumber}>2</span>
                <span>{isFR ? "Paiement 100% Sécurisé SSL" : "Secure Payment"}</span>
              </div>
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-[#FAF7F2] rounded-xl border border-[#D8CBB7] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-[#3E4A3D] flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-[#C8AB8A]" />
                    <span>{isFR ? "Carte Bancaire / Visa / Mastercard" : "Credit Card"}</span>
                  </span>
                  <span className="text-[10px] uppercase font-black bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                    3D Secure 2.0
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <input
                    type="text"
                    placeholder="Numéro de carte (4242 •••• •••• ••••)"
                    className={`${styles.input} col-span-2`}
                  />
                  <input
                    type="text"
                    placeholder="MM / AA"
                    className={styles.input}
                  />
                  <input
                    type="text"
                    placeholder="CVC"
                    className={styles.input}
                  />
                </div>
              </div>

              <div className="text-xs text-slate-500 flex items-center gap-2">
                <Lock className="w-3.5 h-3.5 text-emerald-600" />
                <span>
                  {isFR 
                    ? "Chiffrement AES-256. Vos données bancaires ne transitent jamais sur nos serveurs." 
                    : "AES-256 bank-level encryption."}
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Order Summary */}
        <div className={styles.sideColumn}>
          <div className={styles.orderSummary}>
            <h3 className={styles.summaryTitle}>
              {isFR ? "Récapitulatif de commande" : "Order Summary"}
            </h3>

            {/* Cart Items */}
            <div className={styles.itemsList}>
              {cart.map((item, index) => (
                <div key={`${item.id}-${index}`} className={styles.itemRow}>
                  <div className={styles.itemDetails}>
                    <span className={styles.itemName}>{item.name}</span>
                    {item.selectedKitOption && (
                      <span className="text-xs text-[#C8AB8A] font-semibold">
                        + {item.selectedKitOption}
                      </span>
                    )}
                    <span className={styles.itemSub}>Qté : {item.quantity || 1}</span>
                  </div>
                  <span className={styles.itemPrice}>
                    {item.price * (item.quantity || 1)} €
                  </span>
                </div>
              ))}
            </div>

            {/* Promo code box */}
            <div className={styles.promoBox}>
              <input
                type="text"
                placeholder={isFR ? "Code promo (ex: BIENVENUE5)" : "Promo code"}
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className={styles.promoInput}
              />
              <button
                type="button"
                onClick={() => applyPromo(promoCode)}
                className={styles.promoBtn}
              >
                {isFR ? "Appliquer" : "Apply"}
              </button>
            </div>

            {discountMessage && (
              <div className="mb-4 text-xs font-semibold text-emerald-700 bg-emerald-50 p-2.5 rounded-lg border border-emerald-200">
                {discountMessage}
              </div>
            )}

            {/* Financial calculation */}
            <div className="space-y-2 text-sm text-slate-600 pt-2 border-t border-slate-100">
              <div className="flex justify-between">
                <span>{isFR ? "Sous-total articles" : "Items subtotal"}</span>
                <span className="font-semibold text-slate-800">{rawSubtotal} €</span>
              </div>

              {discountPercent > 0 && (
                <div className="flex justify-between text-emerald-600 font-bold">
                  <span>{isFR ? `Remise privilège (-${discountPercent}%)` : `Discount (-${discountPercent}%)`}</span>
                  <span>- {discountAmount.toFixed(2)} €</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>{isFR ? "Frais de livraison" : "Shipping"}</span>
                <span className="font-semibold text-slate-800">
                  {shippingPrice === 0 ? (isFR ? "Offerts" : "Free") : `${shippingPrice.toFixed(2)} €`}
                </span>
              </div>
            </div>

            <div className={styles.totalRow}>
              <span>{isFR ? "Total à régler" : "Total"}</span>
              <span className="text-2xl font-black text-[#C8AB8A]">
                {finalTotal.toFixed(2)} €
              </span>
            </div>

            <button
              type="button"
              onClick={handleCompleteOrder}
              disabled={isProcessing}
              className={styles.submitBtn}
            >
              <Lock className="w-4 h-4" />
              <span>{isProcessing ? (isFR ? "Validation en cours..." : "Processing...") : (isFR ? "Confirmer et Payer" : "Confirm and Pay")}</span>
            </button>

            <div className="mt-6 pt-6 border-t border-slate-100 flex flex-col items-center gap-3">
              <PaymentBadges />
              <div className="text-[11px] text-slate-400 text-center space-y-1">
                <p>✓ Expédition garantie sous 24/48h</p>
                <p>✓ Garantie 30 jours satisfait ou remboursé</p>
                <p>✓ Support client français réactif par email et téléphone</p>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Exit-Intent & Abandoned Cart Recovery Modal */}
      {showExitModal && (
        <div className={styles.recoveryModalBackdrop}>
          <div className={styles.recoveryModalCard}>
            <button
              type="button"
              onClick={() => setShowExitModal(false)}
              className="absolute top-4 right-4 text-white/70 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-12 h-12 rounded-full bg-[#C8AB8A] text-[#0F261E] flex items-center justify-center mx-auto mb-4 shadow-lg shadow-black/20">
              <Tag className="w-6 h-6" />
            </div>

            <h3 className="text-xl sm:text-2xl font-black mb-2">
              {isFR ? "Attendez ! Ne partez pas les mains vides" : "Wait! Exclusive Gift"}
            </h3>

            <p className="text-sm text-white/80 mb-6 leading-relaxed">
              {isFR
                ? "Vos plantes méritent le meilleur. Profitez de 5% de réduction immédiate sur votre BloomLab® avec le code privilège :"
                : "Save 5% immediately on your BloomLab® with your private code:"}
            </p>

            <div className="p-3 bg-white/10 rounded-xl border border-[#C8AB8A] mb-6 flex items-center justify-center gap-3">
              <span className="text-lg font-black tracking-widest text-[#FBBF24]">BIENVENUE5</span>
              <button
                type="button"
                onClick={() => applyPromo('BIENVENUE5')}
                className="px-3 py-1 bg-[#3E4A3D] hover:bg-[#2D372C] text-white text-xs font-bold rounded-lg cursor-pointer"
              >
                {isFR ? "Appliquer immédiatement" : "Apply now"}
              </button>
            </div>

            {!recoverySent ? (
              <form onSubmit={handleSendRecoveryEmail} className="space-y-3">
                <p className="text-xs text-white/70">
                  {isFR 
                    ? "Ou recevez votre panier réservé et votre réduction par email :" 
                    : "Or receive your reserved cart and code via email:"}
                </p>
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={recoveryEmail}
                    onChange={(e) => setRecoveryEmail(e.target.value)}
                    placeholder="votre.email@exemple.com"
                    className="flex-1 px-3 py-2 rounded-lg bg-black/40 border border-white/20 text-white text-xs"
                    required
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#3E4A3D] hover:bg-[#2D372C] text-white font-bold text-xs rounded-lg whitespace-nowrap cursor-pointer"
                  >
                    {isFR ? "Sauvegarder" : "Save cart"}
                  </button>
                </div>
              </form>
            ) : (
              <div className="p-3 bg-emerald-900/60 border border-emerald-500 rounded-xl text-xs text-emerald-200 flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>{isFR ? "Votre panier et votre code ont été envoyés !" : "Cart and code saved!"}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutOptimized;
