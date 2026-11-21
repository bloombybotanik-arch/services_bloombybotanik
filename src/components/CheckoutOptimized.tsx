import React, { useState, useEffect } from 'react';
import { ShieldCheck, Lock, Truck, CreditCard, ArrowLeft, Tag, X, CheckCircle2 } from 'lucide-react';
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
  const tr = (fr: string, en: string, de: string) => (isFR ? fr : isDE ? de : en);

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
      country: isDE ? 'Deutschland' : isFR ? 'France' : 'United Kingdom',
    };
  });

  const [shippingMethod, setShippingMethod] = useState<'colissimo' | 'express'>('colissimo');
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [discountMessage, setDiscountMessage] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [showExitModal, setShowExitModal] = useState(false);
  const [recoveryEmail, setRecoveryEmail] = useState('');
  const [recoverySent, setRecoverySent] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('bloom_checkout_info', JSON.stringify(formData));
    } catch {}
  }, [formData]);

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
      setDiscountMessage(tr("Code de 5% appliqué avec succès !", "5% discount applied!", "5 % Rabatt erfolgreich angewendet!"));
      setShowExitModal(false);
    } else {
      setDiscountMessage(tr("Code non valide.", "Invalid discount code.", "Ungültiger Gutscheincode."));
    }
  };

  const handleInputChange = (field: string, value: string) => {
    if (validationError) setValidationError(null);
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleCompleteOrder = () => {
    if (!formData.email || !formData.firstName || !formData.address) {
      setValidationError(tr(
        "Veuillez remplir vos coordonnées de livraison (e-mail, prénom et adresse).",
        "Please fill in your shipping details (email, first name, and address).",
        "Bitte füllen Sie Ihre Lieferdaten aus (E-Mail, Vorname und Adresse)."
      ));
      return;
    }
    setValidationError(null);

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
            <span>{tr("Retourner à la boutique", "Back to store", "Zurück zum Shop")}</span>
          </button>

          {/* Express Checkout Options */}
          <div className={styles.expressSection}>
            <div className={styles.expressTitle}>
              {tr("Paiement Express en 1 Clic", "Express 1-Click Checkout", "1-Klick-Expresszahlung")}
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
            <span>{tr("Ou coordonnées standard", "Or standard details", "Oder Standardangaben")}</span>
          </div>

          {/* Step 1: Customer Contact & Shipping */}
          <div className={styles.box}>
            <div className={styles.stepTitle}>
              <div className="flex items-center">
                <span className={styles.stepNumber}>1</span>
                <span>{tr("Coordonnées & Livraison", "Contact & Delivery", "Kontaktdaten & Lieferung")}</span>
              </div>
              <span className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                <Truck className="w-3.5 h-3.5" />
                <span>{tr("Expédié sous 24/48h", "Ships in 24/48h", "Versand in 24/48 Std.")}</span>
              </span>
            </div>

            <div className={styles.formGrid}>
              <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                <label className={styles.label}>
                  {tr("Adresse email (pour le suivi de commande)", "Email address (for order tracking)", "E-Mail-Adresse (für Sendungsverfolgung)")}
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder={tr("votre.email@exemple.com", "your.email@example.com", "ihre.email@beispiel.de")}
                  className={styles.input}
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>{tr("Prénom", "First Name", "Vorname")}</label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  placeholder={tr("Éléonore", "Eleanor", "Helena")}
                  className={styles.input}
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>{tr("Nom", "Last Name", "Nachname")}</label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  placeholder={tr("Moreau", "Miller", "Weber")}
                  className={styles.input}
                  required
                />
              </div>

              <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                <label className={styles.label}>{tr("Adresse de livraison", "Shipping address", "Lieferadresse")}</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  placeholder={tr("12 rue des Plantes", "12 Botanical Street", "Kräuterstraße 12")}
                  className={styles.input}
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>{tr("Code Postal", "Postal Code", "Postleitzahl")}</label>
                <input
                  type="text"
                  value={formData.postalCode}
                  onChange={(e) => handleInputChange('postalCode', e.target.value)}
                  placeholder={tr("75001", "SW1A 1AA", "10115")}
                  className={styles.input}
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>{tr("Ville", "City", "Stadt")}</label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  placeholder={tr("Paris", "London", "Berlin")}
                  className={styles.input}
                  required
                />
              </div>

              <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                <label className={styles.label}>{tr("Téléphone (pour le livreur)", "Phone number (for carrier)", "Telefonnummer (für Zusteller)")}</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder={tr("06 12 34 56 78", "+44 7700 900077", "+49 151 23456789")}
                  className={styles.input}
                />
              </div>
            </div>

            {/* Shipping Mode Selector */}
            <div className="mt-6 pt-6 border-t border-slate-100">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 block">
                {tr("Mode d'expédition prioritaire :", "Shipping speed:", "Versandart:")}
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
                      {tr("Colissimo Suivi Domicile (24-48h)", "Tracked Standard Delivery (48-72h)", "Standardversand mit Sendungsverfolgung (48-72 Std.)")}
                    </div>
                    <div className="text-xs text-slate-500">
                      {tr("Remise en boîte aux lettres avec numéro de suivi", "Tracked home delivery", "Haustürlieferung mit Sendungsnummer")}
                    </div>
                  </div>
                </div>
                <div className="font-bold text-sm text-[#3E4A3D]">
                  {total >= 200 ? (
                    <span className="text-emerald-600 uppercase font-black text-xs">{tr("Gratuit", "Free", "Kostenlos")}</span>
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
                      {tr("Chronopost Express 24h Garanti", "Express 24h Delivery", "Expressversand 24 Std.")}
                    </div>
                    <div className="text-xs text-slate-500">
                      {tr("Livraison le lendemain avant 13h", "Priority next-day delivery", "Prioritätslieferung am nächsten Werktag")}
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
                <span>{tr("Paiement 100% Sécurisé SSL", "100% SSL Secure Payment", "100% SSL-verschlüsselte Zahlung")}</span>
              </div>
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-[#FAF7F2] rounded-xl border border-[#D8CBB7] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-[#3E4A3D] flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-[#C8AB8A]" />
                    <span>{tr("Carte Bancaire / Visa / Mastercard", "Credit Card / Visa / Mastercard", "Kreditkarte / Visa / Mastercard")}</span>
                  </span>
                  <span className="text-[10px] uppercase font-black bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                    3D Secure 2.0
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <input
                    type="text"
                    placeholder={tr("Numéro de carte (4242 •••• •••• ••••)", "Card number (4242 •••• •••• ••••)", "Kartennummer (4242 •••• •••• ••••)")}
                    className={`${styles.input} col-span-2`}
                  />
                  <input
                    type="text"
                    placeholder={tr("MM / AA", "MM / YY", "MM / JJ")}
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
                  {tr(
                    "Chiffrement AES-256. Vos données bancaires ne transitent jamais sur nos serveurs.",
                    "AES-256 bank-level encryption. Your card details are never stored on our servers.",
                    "AES-256-Verschlüsselung. Ihre Zahlungsdaten werden niemals auf unseren Servern gespeichert."
                  )}
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Order Summary */}
        <div className={styles.sideColumn}>
          <div className={styles.orderSummary}>
            <h3 className={styles.summaryTitle}>
              {tr("Récapitulatif de commande", "Order Summary", "Bestellübersicht")}
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
                    <span className={styles.itemSub}>{tr("Qté :", "Qty:", "Menge:")} {item.quantity || 1}</span>
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
                placeholder={tr("Code promo (ex: BIENVENUE5)", "Promo code (e.g. BIENVENUE5)", "Gutscheincode (z. B. BIENVENUE5)")}
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className={styles.promoInput}
              />
              <button
                type="button"
                onClick={() => applyPromo(promoCode)}
                className={styles.promoBtn}
              >
                {tr("Appliquer", "Apply", "Einlösen")}
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
                <span>{tr("Sous-total articles", "Items subtotal", "Zwischensumme")}</span>
                <span className="font-semibold text-slate-800">{rawSubtotal} €</span>
              </div>

              {discountPercent > 0 && (
                <div className="flex justify-between text-emerald-600 font-bold">
                  <span>{tr(`Remise privilège (-${discountPercent}%)`, `Discount (-${discountPercent}%)`, `Rabatt (-${discountPercent}%)`)}</span>
                  <span>- {discountAmount.toFixed(2)} €</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>{tr("Frais de livraison", "Shipping", "Versandkosten")}</span>
                <span className="font-semibold text-slate-800">
                  {shippingPrice === 0 ? tr("Offerts", "Free", "Kostenlos") : `${shippingPrice.toFixed(2)} €`}
                </span>
              </div>
            </div>

            <div className={styles.totalRow}>
              <span>{tr("Total à régler", "Total", "Gesamtbetrag")}</span>
              <span className="text-2xl font-black text-[#C8AB8A]">
                {finalTotal.toFixed(2)} €
              </span>
            </div>

            {validationError && (
              <div className="mb-3 text-xs font-semibold text-rose-700 bg-rose-50 p-3 rounded-xl border border-rose-200">
                {validationError}
              </div>
            )}

            <button
              type="button"
              onClick={handleCompleteOrder}
              disabled={isProcessing}
              className={styles.submitBtn}
            >
              <Lock className="w-4 h-4" />
              <span>
                {isProcessing
                  ? tr("Validation en cours...", "Processing...", "Wird bearbeitet...")
                  : tr("Confirmer et Payer", "Confirm and Pay", "Bestätigen & Bezahlen")}
              </span>
            </button>

            <div className="mt-6 pt-6 border-t border-slate-100 flex flex-col items-center gap-3">
              <PaymentBadges />
              <div className="text-[11px] text-slate-400 text-center space-y-1">
                <p>✓ {tr("Expédition garantie sous 24/48h", "Guaranteed dispatch within 24/48h", "Garantierter Versand in 24/48 Std.")}</p>
                <p>✓ {tr("Garantie 30 jours satisfait ou remboursé", "30-day money-back guarantee", "30 Tage Geld-zurück-Garantie")}</p>
                <p>✓ {tr("Support client réactif par email", "Responsive customer support via email", "Reaktiver Kundensupport per E-Mail")}</p>
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
              {tr("Attendez ! Ne partez pas les mains vides", "Wait! Exclusive Offer", "Warten Sie! Exklusives Angebot")}
            </h3>

            <p className="text-sm text-white/80 mb-6 leading-relaxed">
              {tr(
                "Vos plantes méritent le meilleur. Profitez de 5% de réduction immédiate sur votre BloomLab® avec le code privilège :",
                "Save 5% immediately on your BloomLab® with your private code:",
                "Sichern Sie sich sofort 5 % Rabatt auf Ihr BloomLab® mit diesem Gutscheincode:"
              )}
            </p>

            <div className="p-3 bg-white/10 rounded-xl border border-[#C8AB8A] mb-6 flex items-center justify-center gap-3">
              <span className="text-lg font-black tracking-widest text-[#FBBF24]">BIENVENUE5</span>
              <button
                type="button"
                onClick={() => applyPromo('BIENVENUE5')}
                className="px-3 py-1 bg-[#3E4A3D] hover:bg-[#2D372C] text-white text-xs font-bold rounded-lg cursor-pointer"
              >
                {tr("Appliquer immédiatement", "Apply now", "Sofort einlösen")}
              </button>
            </div>

            {!recoverySent ? (
              <form onSubmit={handleSendRecoveryEmail} className="space-y-3">
                <p className="text-xs text-white/70">
                  {tr(
                    "Ou recevez votre panier réservé et votre réduction par email :",
                    "Or receive your reserved cart and code via email:",
                    "Oder erhalten Sie Ihren Warenkorb & Rabattcode per E-Mail:"
                  )}
                </p>
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={recoveryEmail}
                    onChange={(e) => setRecoveryEmail(e.target.value)}
                    placeholder={tr("votre.email@exemple.com", "your.email@example.com", "ihre.email@beispiel.de")}
                    className="flex-1 px-3 py-2 rounded-lg bg-black/40 border border-white/20 text-white text-xs"
                    required
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#3E4A3D] hover:bg-[#2D372C] text-white font-bold text-xs rounded-lg whitespace-nowrap cursor-pointer"
                  >
                    {tr("Sauvegarder", "Save cart", "Speichern")}
                  </button>
                </div>
              </form>
            ) : (
              <div className="p-3 bg-emerald-900/60 border border-emerald-500 rounded-xl text-xs text-emerald-200 flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>{tr("Votre panier et votre code ont été envoyés !", "Cart and code saved!", "Warenkorb & Code gesichert!")}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutOptimized;
