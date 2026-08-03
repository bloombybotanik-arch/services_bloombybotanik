import React, { useState } from 'react';
import { ShieldCheck, Lock, CreditCard, ChevronRight, Truck, Building2, User, Mail, Phone, MapPin, CheckCircle2, Download, PackageCheck } from 'lucide-react';

interface CheckoutFlowProps {
  cart: any[];
  total: number;
  onSuccess: (orderData: any) => void;
  onCancel: () => void;
}

type Step = 'information' | 'shipping' | 'payment' | 'confirmation';

export default function CheckoutFlow({ cart, total, onSuccess, onCancel }: CheckoutFlowProps) {
  const [step, setStep] = useState<Step>('information');
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    type: 'individual' as 'individual' | 'professional',
    company: '',
    vatNumber: '',
    address: '',
    city: '',
    zipCode: '',
    country: 'France',
    billingSameAsShipping: true,
    billingAddress: '',
    billingCity: '',
    billingZipCode: '',
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [orderId, setOrderId] = useState('');

  const handleNext = () => {
    if (step === 'information') setStep('shipping');
    else if (step === 'shipping') setStep('payment');
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    // Simulate API call to process payment and store in Firestore
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const newOrderId = `BLM-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    setOrderId(newOrderId);
    setIsProcessing(false);
    setStep('confirmation');
    
    // In a real app, this would be a server call
    console.log("Emails envoyés : Confirmation de commande, Facture générée, Confirmation de paiement");
  };

  if (step === 'confirmation') {
    return (
      <div className="max-w-2xl mx-auto px-6 py-20 text-center animate-in fade-in zoom-in duration-700">
        <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-8">
          <CheckCircle2 className="w-12 h-12 text-green-500" />
        </div>
        <h1 className="text-4xl font-bold text-[#1B3022] mb-4">Merci pour votre commande !</h1>
        <p className="text-xl text-[#1B3022]/60 mb-8">Votre numéro de commande est <span className="font-bold text-[#1B3022]">#{orderId}</span></p>
        
        <div className="bg-[#F9F9F7] p-8 rounded-[32px] border border-[#1B3022]/10 mb-12 text-left space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
              <Mail className="w-5 h-5 text-[#1B3022]" />
            </div>
            <div>
              <p className="font-bold">Confirmation envoyée</p>
              <p className="text-sm opacity-60">Un email avec votre facture a été envoyé à {formData.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
              <Truck className="w-5 h-5 text-[#1B3022]" />
            </div>
            <div>
              <p className="font-bold">Suivi logistique</p>
              <p className="text-sm opacity-60">Vous recevrez une notification à chaque étape de l'acheminement.</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-[#1B3022] text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-3">
            <Download className="w-5 h-5" /> Télécharger la facture
          </button>
          <button 
            onClick={onCancel}
            className="border border-[#1B3022]/10 px-8 py-4 rounded-xl font-bold hover:bg-[#1B3022]/5 transition-colors"
          >
            Retour à l'accueil
          </button>
        </div>
      </div>
    );
  }

  return (
    <article className="max-w-[1000px] mx-auto px-6 py-12 md:py-20 animate-in fade-in duration-700">
      <div className="flex items-center justify-between mb-12">
        <h1 className="text-3xl font-bold text-[#1B3022]">Finalisation de commande</h1>
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
          {step === 'information' && (
            <section className="bg-white p-8 rounded-[32px] border border-[#1B3022]/10 shadow-sm animate-in slide-in-from-left-4 duration-500">
              <h2 className="text-2xl font-bold text-[#1B3022] mb-8 flex items-center gap-3">
                <User className="w-6 h-6" /> Informations Client
              </h2>
              
              <div className="flex gap-4 mb-8">
                <button 
                  onClick={() => setFormData({...formData, type: 'individual'})}
                  className={`flex-1 p-4 rounded-2xl border-2 flex items-center justify-center gap-3 transition-all ${formData.type === 'individual' ? 'border-[#F97316] bg-[#F97316]/5' : 'border-[#1B3022]/10 hover:border-[#1B3022]/30'}`}
                >
                  <User className="w-5 h-5" /> Particulier
                </button>
                <button 
                  onClick={() => setFormData({...formData, type: 'professional'})}
                  className={`flex-1 p-4 rounded-2xl border-2 flex items-center justify-center gap-3 transition-all ${formData.type === 'professional' ? 'border-[#F97316] bg-[#F97316]/5' : 'border-[#1B3022]/10 hover:border-[#1B3022]/30'}`}
                >
                  <Building2 className="w-5 h-5" /> Professionnel
                </button>
              </div>

              <div className="space-y-4">
                {formData.type === 'professional' && (
                  <>
                    <div>
                      <label className="block text-sm font-bold text-[#1B3022] mb-2">Nom de l'entreprise</label>
                      <input 
                        type="text" 
                        value={formData.company}
                        onChange={(e) => setFormData({...formData, company: e.target.value})}
                        className="w-full bg-[#F9F9F7] border-none rounded-xl p-4 focus:ring-2 focus:ring-[#F97316]"
                        placeholder="Botanique SAS"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-[#1B3022] mb-2">Numéro de TVA</label>
                      <input 
                        type="text" 
                        value={formData.vatNumber}
                        onChange={(e) => setFormData({...formData, vatNumber: e.target.value})}
                        className="w-full bg-[#F9F9F7] border-none rounded-xl p-4 focus:ring-2 focus:ring-[#F97316]"
                        placeholder="FR 12 3456789"
                      />
                    </div>
                  </>
                )}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-[#1B3022] mb-2">Prénom</label>
                    <input 
                      type="text" 
                      value={formData.firstName}
                      onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                      className="w-full bg-[#F9F9F7] border-none rounded-xl p-4 focus:ring-2 focus:ring-[#F97316]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-[#1B3022] mb-2">Nom</label>
                    <input 
                      type="text" 
                      value={formData.lastName}
                      onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                      className="w-full bg-[#F9F9F7] border-none rounded-xl p-4 focus:ring-2 focus:ring-[#F97316]"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#1B3022] mb-2">Email</label>
                  <input 
                    type="email" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-[#F9F9F7] border-none rounded-xl p-4 focus:ring-2 focus:ring-[#F97316]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#1B3022] mb-2">Téléphone</label>
                  <input 
                    type="tel" 
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full bg-[#F9F9F7] border-none rounded-xl p-4 focus:ring-2 focus:ring-[#F97316]"
                  />
                </div>
              </div>
            </section>
          )}

          {step === 'shipping' && (
            <section className="bg-white p-8 rounded-[32px] border border-[#1B3022]/10 shadow-sm animate-in slide-in-from-left-4 duration-500">
              <h2 className="text-2xl font-bold text-[#1B3022] mb-8 flex items-center gap-3">
                <Truck className="w-6 h-6" /> Adresse de livraison
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-[#1B3022] mb-2">Adresse</label>
                  <input 
                    type="text" 
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    className="w-full bg-[#F9F9F7] border-none rounded-xl p-4 focus:ring-2 focus:ring-[#F97316]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-[#1B3022] mb-2">Code Postal</label>
                    <input 
                      type="text" 
                      value={formData.zipCode}
                      onChange={(e) => setFormData({...formData, zipCode: e.target.value})}
                      className="w-full bg-[#F9F9F7] border-none rounded-xl p-4 focus:ring-2 focus:ring-[#F97316]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-[#1B3022] mb-2">Ville</label>
                    <input 
                      type="text" 
                      value={formData.city}
                      onChange={(e) => setFormData({...formData, city: e.target.value})}
                      className="w-full bg-[#F9F9F7] border-none rounded-xl p-4 focus:ring-2 focus:ring-[#F97316]"
                    />
                  </div>
                </div>
              </div>
            </section>
          )}

          {step === 'payment' && (
            <section className="bg-white p-8 rounded-[32px] border border-[#1B3022]/10 shadow-sm animate-in slide-in-from-left-4 duration-500">
              <h2 className="text-2xl font-bold text-[#1B3022] mb-8 flex items-center gap-3">
                <CreditCard className="w-6 h-6" /> Paiement sécurisé
              </h2>
              
              <div className="space-y-4">
                <button className="w-full p-6 rounded-2xl border-2 border-[#1B3022]/10 hover:border-[#1B3022]/30 flex items-center justify-between group transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-8 bg-[#1B3022]/5 rounded flex items-center justify-center">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4" />
                    </div>
                    <span className="font-bold">Carte Bancaire (Stripe)</span>
                  </div>
                  <div className="w-6 h-6 rounded-full border-2 border-[#1B3022]/20 group-hover:border-[#F97316]"></div>
                </button>
                <button className="w-full p-6 rounded-2xl border-2 border-[#1B3022]/10 hover:border-[#1B3022]/30 flex items-center justify-between group transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-8 bg-[#1B3022]/5 rounded flex items-center justify-center">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-4" />
                    </div>
                    <span className="font-bold">PayPal</span>
                  </div>
                  <div className="w-6 h-6 rounded-full border-2 border-[#1B3022]/20 group-hover:border-[#F97316]"></div>
                </button>
              </div>

              <div className="mt-8 flex items-center gap-3 text-xs text-[#1B3022]/60">
                <Lock className="w-4 h-4 text-green-500" />
                Vos données bancaires sont cryptées et jamais stockées.
              </div>
            </section>
          )}

          <div className="flex justify-between items-center pt-8">
            <button 
              onClick={onCancel}
              className="text-[#1B3022]/60 font-bold hover:text-[#1B3022]"
            >
              Annuler
            </button>
            <button 
              onClick={step === 'payment' ? handlePayment : handleNext}
              disabled={isProcessing}
              className="bg-[#1B3022] text-white px-10 py-4 rounded-xl font-bold flex items-center gap-3 hover:bg-[#F97316] transition-all shadow-xl shadow-[#1B3022]/10 disabled:opacity-50"
            >
              {isProcessing ? 'Traitement...' : step === 'payment' ? 'Payer maintenant' : 'Continuer'} 
              {!isProcessing && <ChevronRight className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <div className="space-y-6">
          <div className="bg-[#F9F9F7] p-8 rounded-[40px] border border-[#1B3022]/10">
            <h2 className="text-xl font-bold text-[#1B3022] mb-8">Votre commande</h2>
            <div className="space-y-6 mb-8">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-white flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-[#1B3022] text-sm">{item.name}</div>
                    <div className="text-xs opacity-60">Quantité : {item.quantity}</div>
                  </div>
                  <div className="font-bold text-[#1B3022]">{(item.price * item.quantity).toFixed(2)} €</div>
                </div>
              ))}
            </div>
            
            <div className="pt-6 border-t border-[#1B3022]/10 space-y-3">
              <div className="flex justify-between text-sm opacity-60">
                <span>Livraison</span>
                <span className="font-bold text-[#1B3022]">Offerte</span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-lg font-bold">Total</span>
                <span className="text-2xl font-bold text-[#F97316]">{total.toFixed(2)} €</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-[#1B3022]/10 space-y-4">
            <div className="flex items-center gap-3 text-sm font-bold text-[#1B3022]">
              <PackageCheck className="w-5 h-5 text-green-500" /> Logistique Premium
            </div>
            <p className="text-xs text-[#1B3022]/60 leading-relaxed">
              Expédition prioritaire sous 24h. Emballage éco-conçu et sécurisé. Suivi temps réel par SMS et Email.
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
