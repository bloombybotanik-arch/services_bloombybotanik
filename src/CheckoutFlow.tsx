import React, { useState, useEffect } from 'react';
import { ShieldCheck, Lock, CreditCard, ChevronRight, Truck, Building2, User, Mail, Phone, MapPin, CheckCircle2, Download, PackageCheck, AlertCircle } from 'lucide-react';
import { translations, Language } from './translations';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { getShippingPrice, ShippingMethod } from './lib/shippingUtils';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY || "");

interface CheckoutFlowProps {
  cart: any[];
  total: number;
  shippingMethod: ShippingMethod;
  user: any;
  onSuccess: (orderData: any) => void;
  onCancel: () => void;
  lang?: Language;
}

type Step = 'information' | 'shipping' | 'payment' | 'confirmation';
type PaymentMethod = 'stripe' | 'paypal';

function StripePaymentForm({ finalTotal, onPaymentSuccess, cart, shippingMethod, formData, user, t }: any) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    setProcessing(true);
    setError(null);

    try {
      const response = await fetch('/api/checkout/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cart,
          shippingMethod,
          formData,
          userId: user.uid,
          userEmail: user.email
        }),
      });

      const { clientSecret, error: backendError } = await response.json();
      if (backendError) throw new Error(backendError);

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement) as any,
          billing_details: {
            name: `${formData.firstName} ${formData.lastName}`,
            email: formData.email,
          },
        },
      });

      if (result.error) {
        setError(result.error.message || "Erreur de paiement");
      } else {
        if (result.paymentIntent && result.paymentIntent.status === 'succeeded') {
          onPaymentSuccess((result.paymentIntent as any).metadata?.orderId);
        }
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="p-4 bg-[#F9F9F7] rounded-xl border border-[#1B3022]/10">
        <CardElement options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#1B3022',
              '::placeholder': { color: '#1B302260' },
            },
          },
        }} />
      </div>
      {error && <div className="text-red-500 text-sm">{error}</div>}
      <button 
        type="submit" 
        disabled={!stripe || processing}
        className="w-full bg-[#1B3022] text-white px-10 py-4 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-[#F97316] transition-all shadow-xl shadow-[#1B3022]/10 disabled:opacity-50"
      >
        {processing ? t.actions.processing : t.actions.pay} <ChevronRight className="w-5 h-5" />
      </button>
    </form>
  );
}

function CheckoutFlowContent({ cart, total, shippingMethod, user, onSuccess, onCancel, lang = 'fr' }: CheckoutFlowProps) {
  const t = translations[lang].checkout;
  const cartT = translations[lang].cart;
  const [promoCode, setPromoCode] = useState('');
  const [isPromoApplied, setIsPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('stripe');
  
  const shipping = getShippingPrice(shippingMethod, cart);
  
  let adjustedTotal = total;
  if (isPromoApplied) {
    adjustedTotal = cart.reduce((sum, item) => {
      let p = item.price;
      if (isPromoApplied && (item.id === 'bloomlab' || item.id === 'pack-signature' || item.name.includes('BloomLab')) && p > 239) {
        p = 239;
      }
      return sum + (p * item.quantity);
    }, 0);
  }
  const finalTotal = adjustedTotal + shipping;

  const [step, setStep] = useState<Step>('information');
  const [formData, setFormData] = useState({
    email: user?.email || '',
    firstName: user?.displayName?.split(' ')[0] || '',
    lastName: user?.displayName?.split(' ')[1] || '',
    phone: '',
    type: 'individual' as 'individual' | 'professional',
    company: '',
    vatNumber: '',
    address: '',
    city: '',
    zipCode: '',
    country: 'France',
    billingSameAsShipping: true,
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [orderId, setOrderId] = useState('');

  const applyPromoCode = () => {
    if (promoCode.trim().toUpperCase() === 'RENTRÉE2026') {
      setIsPromoApplied(true);
      setPromoError('');
    } else {
      setPromoError(lang === 'fr' ? 'Code invalide' : 'Invalid code');
      setIsPromoApplied(false);
    }
  };

  const handleNext = () => {
    if (step === 'information') setStep('shipping');
    else if (step === 'shipping') setStep('payment');
  };

  const onPaymentSuccess = (id: string) => {
    setOrderId(id);
    setStep('confirmation');
    onSuccess && onSuccess({ orderId: id });
  };

  if (step === 'confirmation') {
    return (
      <div className="max-w-2xl mx-auto px-6 py-20 text-center animate-in fade-in zoom-in duration-700">
        <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-8">
          <CheckCircle2 className="w-12 h-12 text-green-500" />
        </div>
        <h1 className="text-4xl font-bold text-[#1B3022] mb-4">{t.confirmation.title}</h1>
        <p className="text-xl text-[#1B3022]/60 mb-8">{t.confirmation.order_number} <span className="font-bold text-[#1B3022]">#{orderId}</span></p>
        
        <div className="bg-[#F9F9F7] p-8 rounded-[32px] border border-[#1B3022]/10 mb-12 text-left space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
              <Mail className="w-5 h-5 text-[#1B3022]" />
            </div>
            <div>
              <p className="font-bold">{t.confirmation.conf_sent}</p>
              <p className="text-sm opacity-60">{t.confirmation.conf_desc} {formData.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
              <Truck className="w-5 h-5 text-[#1B3022]" />
            </div>
            <div>
              <p className="font-bold">{t.confirmation.logistics}</p>
              <p className="text-sm opacity-60">{t.confirmation.logistics_desc}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-[#1B3022] text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-3">
            <Download className="w-5 h-5" /> {t.confirmation.download_invoice}
          </button>
          <button onClick={onCancel} className="border border-[#1B3022]/10 px-8 py-4 rounded-xl font-bold hover:bg-[#1B3022]/5 transition-colors">
            {t.confirmation.back_home}
          </button>
        </div>
      </div>
    );
  }

  return (
    <article className="max-w-[1000px] mx-auto px-6 py-12 md:py-20 animate-in fade-in duration-700">
      <div className="flex items-center justify-between mb-12">
        <h1 className="text-3xl font-bold text-[#1B3022]">{t.header}</h1>
        <div className="flex items-center gap-4">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step === 'information' ? 'bg-[#F97316] text-white' : 'bg-[#1B3022]/10 text-[#1B3022]'}`}>1</div>
          <div className="w-8 h-[2px] bg-[#1B3022]/10"></div>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step === 'shipping' ? 'bg-[#F97316] text-white' : 'bg-[#1B3022]/10 text-[#1B3022]'}`}>2</div>
          <div className="w-8 h-[2px] bg-[#1B3022]/10"></div>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step === 'payment' ? 'bg-[#F97316] text-white' : 'bg-[#1B3022]/10 text-[#1B3022]'}`}>3</div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        <div className="space-y-8">
          {!user && step === 'information' && (
            <div className="mb-8 p-6 bg-botanik-orange/10 border border-botanik-orange/20 rounded-2xl flex items-start gap-4">
              <AlertCircle className="w-6 h-6 text-botanik-orange flex-shrink-0 mt-1" />
              <div>
                <p className="font-bold text-botanik-green mb-1">Authentification requise</p>
                <p className="text-sm text-botanik-green/70 mb-4">Vous devez être connecté pour finaliser votre commande.</p>
              </div>
            </div>
          )}

          {step === 'information' && (
            <section className="bg-white p-8 rounded-[32px] border border-[#1B3022]/10 shadow-sm animate-in slide-in-from-left-4 duration-500">
              <h2 className="text-2xl font-bold text-[#1B3022] mb-8 flex items-center gap-3">
                <User className="w-6 h-6" /> {t.client_info.title}
              </h2>
              
              <div className="flex gap-4 mb-8">
                <button 
                  onClick={() => setFormData({...formData, type: 'individual'})}
                  className={`flex-1 p-4 rounded-2xl border-2 flex items-center justify-center gap-3 transition-all ${formData.type === 'individual' ? 'border-[#F97316] bg-[#F97316]/5' : 'border-[#1B3022]/10 hover:border-[#1B3022]/30'}`}
                >
                  <User className="w-5 h-5" /> {t.client_info.individual}
                </button>
                <button 
                  onClick={() => setFormData({...formData, type: 'professional'})}
                  className={`flex-1 p-4 rounded-2xl border-2 flex items-center justify-center gap-3 transition-all ${formData.type === 'professional' ? 'border-[#F97316] bg-[#F97316]/5' : 'border-[#1B3022]/10 hover:border-[#1B3022]/30'}`}
                >
                  <Building2 className="w-5 h-5" /> {t.client_info.professional}
                </button>
              </div>

              <div className="space-y-4">
                {formData.type === 'professional' && (
                  <>
                    <div>
                      <label className="block text-sm font-bold text-[#1B3022] mb-2">{t.client_info.company}</label>
                      <input type="text" value={formData.company} onChange={(e) => setFormData({...formData, company: e.target.value})} className="w-full bg-[#F9F9F7] border-none rounded-xl p-4 focus:ring-2 focus:ring-[#F97316]" />
                    </div>
                  </>
                )}
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder={t.client_info.first_name} value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: e.target.value})} className="w-full bg-[#F9F9F7] border-none rounded-xl p-4 focus:ring-2 focus:ring-[#F97316]" />
                  <input type="text" placeholder={t.client_info.last_name} value={formData.lastName} onChange={(e) => setFormData({...formData, lastName: e.target.value})} className="w-full bg-[#F9F9F7] border-none rounded-xl p-4 focus:ring-2 focus:ring-[#F97316]" />
                </div>
                <input type="email" placeholder={t.client_info.email} value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-[#F9F9F7] border-none rounded-xl p-4 focus:ring-2 focus:ring-[#F97316]" />
                <input type="tel" placeholder={t.client_info.phone} value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full bg-[#F9F9F7] border-none rounded-xl p-4 focus:ring-2 focus:ring-[#F97316]" />
              </div>
            </section>
          )}

          {step === 'shipping' && (
            <section className="bg-white p-8 rounded-[32px] border border-[#1B3022]/10 shadow-sm animate-in slide-in-from-left-4 duration-500">
              <h2 className="text-2xl font-bold text-[#1B3022] mb-8 flex items-center gap-3">
                <Truck className="w-6 h-6" /> {t.shipping.title}
              </h2>
              <div className="space-y-4">
                <input type="text" placeholder={t.shipping.address} value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} className="w-full bg-[#F9F9F7] border-none rounded-xl p-4 focus:ring-2 focus:ring-[#F97316]" />
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder={t.shipping.zip} value={formData.zipCode} onChange={(e) => setFormData({...formData, zipCode: e.target.value})} className="w-full bg-[#F9F9F7] border-none rounded-xl p-4 focus:ring-2 focus:ring-[#F97316]" />
                  <input type="text" placeholder={t.shipping.city} value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})} className="w-full bg-[#F9F9F7] border-none rounded-xl p-4 focus:ring-2 focus:ring-[#F97316]" />
                </div>
              </div>
            </section>
          )}

          {step === 'payment' && (
            <section className="bg-white p-8 rounded-[32px] border border-[#1B3022]/10 shadow-sm animate-in slide-in-from-left-4 duration-500">
              <h2 className="text-2xl font-bold text-[#1B3022] mb-8 flex items-center gap-3">
                <CreditCard className="w-6 h-6" /> {t.payment.title}
              </h2>
              
              <div className="space-y-4 mb-8">
                <button 
                  onClick={() => setPaymentMethod('stripe')}
                  className={`w-full p-6 rounded-2xl border-2 flex items-center justify-between group transition-all ${paymentMethod === 'stripe' ? 'border-[#F97316] bg-[#F97316]/5' : 'border-[#1B3022]/10 hover:border-[#1B3022]/30'}`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-8 bg-white rounded flex items-center justify-center">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4" />
                    </div>
                    <span className="font-bold">{t.payment.stripe}</span>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 ${paymentMethod === 'stripe' ? 'border-[#F97316] bg-[#F97316] bg-[url(\'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIzIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwYXRoIGQ9Ik0yMCA2TDkgMTcgNCAxMiIvPjwvc3ZnPg==\')] bg-center bg-no-repeat bg-[length:14px]' : 'border-[#1B3022]/20'}`}></div>
                </button>
                <button 
                  onClick={() => setPaymentMethod('paypal')}
                  className={`w-full p-6 rounded-2xl border-2 flex items-center justify-between group transition-all ${paymentMethod === 'paypal' ? 'border-[#F97316] bg-[#F97316]/5' : 'border-[#1B3022]/10 hover:border-[#1B3022]/30'}`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-8 bg-white rounded flex items-center justify-center">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-4" />
                    </div>
                    <span className="font-bold">{t.payment.paypal}</span>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 ${paymentMethod === 'paypal' ? 'border-[#F97316] bg-[#F97316] bg-[url(\'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIzIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwYXRoIGQ9Ik0yMCA2TDkgMTcgNCAxMiIvPjwvc3ZnPg==\')] bg-center bg-no-repeat bg-[length:14px]' : 'border-[#1B3022]/20'}`}></div>
                </button>
              </div>

              {paymentMethod === 'stripe' ? (
                <StripePaymentForm finalTotal={finalTotal} onPaymentSuccess={onPaymentSuccess} cart={cart} shippingMethod={shippingMethod} formData={formData} user={user} t={t} />
              ) : (
                <PayPalButtons 
                  style={{ layout: "vertical", shape: "pill", label: "pay" }}
                  createOrder={async () => {
                    const response = await fetch("/api/checkout/paypal/create-order", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ cart, shippingMethod, formData, userId: user.uid, userEmail: user.email }),
                    });
                    const { orderId: paypalOrderId } = await response.json();
                    return paypalOrderId;
                  }}
                  onApprove={async (data, actions) => {
                    const response = await fetch("/api/checkout/paypal/capture", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ orderId: data.orderID }),
                    });
                    const result = await response.json();
                    if (result.success) onPaymentSuccess(data.orderID);
                  }}
                />
              )}

              <div className="mt-8 flex items-center gap-3 text-xs text-[#1B3022]/60">
                <Lock className="w-4 h-4 text-green-500" />
                {t.payment.secure_note}
              </div>
            </section>
          )}

          {step !== 'payment' && (
            <div className="flex justify-between items-center pt-8">
              <button onClick={onCancel} className="text-[#1B3022]/60 font-bold hover:text-[#1B3022]">{t.actions.cancel}</button>
              <button 
                onClick={handleNext}
                disabled={isProcessing}
                className="bg-[#1B3022] text-white px-10 py-4 rounded-xl font-bold flex items-center gap-3 hover:bg-[#F97316] transition-all shadow-xl shadow-[#1B3022]/10 disabled:opacity-50"
              >
                {t.actions.continue} <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="bg-[#F9F9F7] p-8 rounded-[40px] border border-[#1B3022]/10">
            <h2 className="text-xl font-bold text-[#1B3022] mb-8">{t.summary.title}</h2>
            <div className="space-y-6 mb-8">
              {cart.map((item) => {
                let displayPrice = item.price;
                if (isPromoApplied && (item.id === 'bloomlab' || item.id === 'pack-signature' || item.name.includes('BloomLab')) && displayPrice > 239) displayPrice = 239;
                return (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-white flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-[#1B3022] text-sm">{item.name}</div>
                      <div className="text-xs opacity-60">{t.summary.quantity} {item.quantity}</div>
                    </div>
                    <div className="font-bold text-[#1B3022]">{(displayPrice * item.quantity).toFixed(2).replace('.', ',')}&nbsp;€</div>
                  </div>
                );
              })}
            </div>
            
            <div className="pt-6 border-t border-[#1B3022]/10 space-y-3">
              <div className="flex justify-between text-sm opacity-60">
                <span>{cartT.summary.shipping} ({shippingMethod})</span>
                <span className="font-bold text-[#1B3022]">{shipping === 0 ? t.summary.shipping_free : `${shipping.toFixed(2).replace('.', ',')}&nbsp;€`}</span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-lg font-bold">{t.summary.total}</span>
                <span className="text-2xl font-bold text-[#F97316]">{finalTotal.toFixed(2).replace('.', ',')}&nbsp;€</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function CheckoutFlow(props: CheckoutFlowProps) {
  return (
    <PayPalScriptProvider options={{ "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID || "" }}>
      <Elements stripe={stripePromise}>
        <CheckoutFlowContent {...props} />
      </Elements>
    </PayPalScriptProvider>
  );
}
