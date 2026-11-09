import React, { useState } from 'react';
import { Mail, Clock, ShieldCheck, MapPin, Send, CheckCircle2, MessageSquare, Sparkles, Phone, HelpCircle, ArrowRight } from 'lucide-react';
import { translations, Language } from './translations';
import { PageIntroHeader } from './components/ui/PageIntroHeader';

interface ContactContentProps {
  onNavigate: (view: any, id?: string) => void;
  lang?: string;
}

export default function ContactContent({ onNavigate, lang = 'fr' }: ContactContentProps) {
  const isFR = lang === 'fr';
  const isDE = lang === 'de';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'question_bloomlab',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate real friendly submission
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <div className="animate-in fade-in duration-500 bg-[#F9F9F7] min-h-screen">
      {/* En-tête contextuel PageIntroHeader */}
      <PageIntroHeader
        badge={isFR ? "ÉCOUTE & SERVICE BOTANIQUE" : "CUSTOMER & BOTANICAL SUPPORT"}
        title={isFR ? "Nous Contacter" : isDE ? "Kontaktieren Sie Uns" : "Contact Us"}
        subtitle={isFR ? "Une équipe d'experts à votre écoute pour vos extractions et vos commandes" : "Experts here to support your extractions and orders"}
        context={isFR 
          ? "Vous êtes sur l'espace d'échange direct de Bloom by BotaniK. Que vous ayez besoin d'un conseil d'extraction sur BloomLab®, d'un suivi de colis ou d'un accompagnement personnalisé, notre équipe vous répond avec soin."
          : "You are in the direct contact space of Bloom by BotaniK. Whether you need extraction advice, order tracking, or support, our team is at your service."}
      />

      {/* Main Content Grid */}
      <section className="py-12 md:py-20 max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Practical info & working hours (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Working Hours Card */}
            <div className="bg-white rounded-3xl p-8 border border-[#D8CBB7]/50 shadow-sm">
              <div className="flex items-center gap-3 text-[#A8B8A0] font-bold text-lg mb-6">
                <div className="w-10 h-10 rounded-2xl bg-[#E8F1EE] text-[#A8B8A0] flex items-center justify-center">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#3E4A3D]">
                    {isFR ? "Horaires d'Ouverture" : "Working Hours"}
                  </h3>
                  <span className="text-xs text-slate-500 font-normal">
                    {isFR ? "Fuseau horaire Europe / Paris" : "Europe / Paris Time"}
                  </span>
                </div>
              </div>

              <div className="space-y-4 text-sm">
                <div className="flex items-center justify-between py-2 border-b border-slate-100">
                  <span className="font-semibold text-[#3E4A3D]">
                    {isFR ? "Lundi – Vendredi" : "Monday – Friday"}
                  </span>
                  <span className="font-bold text-[#A8B8A0] bg-[#E8F1EE] px-3 py-1 rounded-full text-xs">
                    09:00 – 18:00
                  </span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-500">
                    {isFR ? "Samedi & Dimanche" : "Saturday & Sunday"}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    {isFR ? "Fermé (traitement dès lundi)" : "Closed"}
                  </span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-slate-500">
                    {isFR ? "Jours fériés" : "Public Holidays"}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    {isFR ? "Fermé" : "Closed"}
                  </span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-500 leading-relaxed">
                <strong className="text-[#3E4A3D]">{isFR ? "Délai moyen de réponse :" : "Average response time:"}</strong>{" "}
                {isFR 
                  ? "Sous 24 à 48 heures ouvrées. Toutes les demandes reçues pendant le week-end sont prises en charge en priorité le lundi matin." 
                  : "Within 24 to 48 business hours."}
              </div>
            </div>

            {/* Direct Contact Methods Card */}
            <div className="bg-white rounded-3xl p-8 border border-[#D8CBB7]/50 shadow-sm space-y-6">
              <h3 className="text-lg font-bold text-[#3E4A3D] mb-4">
                {isFR ? "Coordonnées Directes" : "Direct Contacts"}
              </h3>

              <div className="space-y-4">
                <a 
                  href="mailto:contact@bloombybotanik.com" 
                  className="flex items-start gap-4 p-4 rounded-2xl bg-[#FAF7F2] hover:bg-[#E8F1EE] border border-[#D8CBB7]/40 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-white text-[#A8B8A0] flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                    <Mail className="w-5 h-5 text-[#C8AB8A]" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 block font-medium">
                      {isFR ? "Email officiel principal" : "Primary Email"}
                    </span>
                    <span className="text-sm font-bold text-[#3E4A3D] group-hover:text-[#A8B8A0]">
                      contact@bloombybotanik.com
                    </span>
                  </div>
                </a>

                <a 
                  href="mailto:bloombybotanik@gmail.com" 
                  className="flex items-start gap-4 p-4 rounded-2xl bg-[#FAF7F2] hover:bg-[#E8F1EE] border border-[#D8CBB7]/40 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-white text-[#A8B8A0] flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                    <Mail className="w-5 h-5 text-[#A8B8A0]" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 block font-medium">
                      {isFR ? "Assistance & Commandes" : "Support & Orders"}
                    </span>
                    <span className="text-sm font-bold text-[#3E4A3D] group-hover:text-[#A8B8A0]">
                      bloombybotanik@gmail.com
                    </span>
                  </div>
                </a>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#FAF7F2] border border-[#D8CBB7]/40">
                  <div className="w-10 h-10 rounded-xl bg-white text-[#A8B8A0] flex items-center justify-center shrink-0 shadow-xs">
                    <MapPin className="w-5 h-5 text-[#A8B8A0]" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 block font-medium">
                      {isFR ? "Siège & Expéditions" : "Headquarters & Shipping"}
                    </span>
                    <span className="text-sm font-bold text-[#3E4A3D]">
                      France · Expédition Europe
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links Card */}
            <div className="bg-[#3E4A3D] rounded-3xl p-8 text-white space-y-4">
              <h4 className="font-bold text-base text-white">
                {isFR ? "Accès Rapides" : "Quick Links"}
              </h4>
              <div className="space-y-2">
                <button
                  onClick={() => onNavigate('faq')}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold transition-all text-left text-[#E8F1EE]"
                >
                  <span className="flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-[#C8AB8A]" />
                    {isFR ? "Consulter les Questions Fréquentes" : "View FAQs"}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onNavigate('boutique')}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold transition-all text-left text-[#E8F1EE]"
                >
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#C8AB8A]" />
                    {isFR ? "Découvrir la Boutique & Remèdes" : "Browse Store & Remedies"}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 md:p-12 border border-[#D8CBB7]/50 shadow-sm">
            {submitted ? (
              <div className="text-center py-16 space-y-6 animate-in fade-in duration-500">
                <div className="w-16 h-16 rounded-full bg-[#E8F1EE] text-[#A8B8A0] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10 text-[#A8B8A0]" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-[#3E4A3D]">
                  {isFR ? "Message bien reçu !" : "Message received!"}
                </h3>
                <p className="text-slate-600 max-w-md mx-auto text-sm md:text-base leading-relaxed">
                  {isFR 
                    ? "Merci pour votre message. Notre équipe botanique ou notre service support l'étudiera avec attention et vous répondra sous 24 à 48 heures ouvrées à l'adresse indiquée." 
                    : "Thank you for reaching out. Our botanical team will reply within 24 to 48 business hours."}
                </p>
                <div className="pt-6">
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        subject: 'question_bloomlab',
                        message: ''
                      });
                    }}
                    className="px-6 py-3 rounded-full bg-[#A8B8A0] text-[#0F261E] font-bold text-xs uppercase tracking-wider hover:bg-[#C8AB8A] transition-colors"
                  >
                    {isFR ? "Envoyer un autre message" : "Send another message"}
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-[#3E4A3D] mb-2">
                    {isFR ? "Envoyez-nous un message" : "Send us a message"}
                  </h3>
                  <p className="text-sm text-slate-500">
                    {isFR 
                      ? "Remplissez ce formulaire et notre équipe vous apportera une réponse personnalisée." 
                      : "Fill in this form and we'll get back to you promptly."}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-[#3E4A3D] uppercase tracking-wider block">
                      {isFR ? "Nom & Prénom *" : "Full Name *"}
                    </label>
                    <input 
                      type="text" 
                      required
                      placeholder={isFR ? "Votre nom complet" : "Your full name"}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-[#FAF7F2] border border-[#D8CBB7]/60 rounded-xl text-[#3E4A3D] placeholder-slate-400 focus:outline-hidden focus:border-[#A8B8A0] focus:bg-white transition-all text-sm"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-[#3E4A3D] uppercase tracking-wider block">
                      {isFR ? "Adresse Email *" : "Email Address *"}
                    </label>
                    <input 
                      type="email" 
                      required
                      placeholder={isFR ? "votre@email.com" : "your@email.com"}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-[#FAF7F2] border border-[#D8CBB7]/60 rounded-xl text-[#3E4A3D] placeholder-slate-400 focus:outline-hidden focus:border-[#A8B8A0] focus:bg-white transition-all text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Phone */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-[#3E4A3D] uppercase tracking-wider block">
                      {isFR ? "Téléphone (optionnel)" : "Phone (optional)"}
                    </label>
                    <input 
                      type="tel" 
                      placeholder={isFR ? "+33 6 00 00 00 00" : "+33 ..."}
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 bg-[#FAF7F2] border border-[#D8CBB7]/60 rounded-xl text-[#3E4A3D] placeholder-slate-400 focus:outline-hidden focus:border-[#A8B8A0] focus:bg-white transition-all text-sm"
                    />
                  </div>

                  {/* Subject */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-[#3E4A3D] uppercase tracking-wider block">
                      {isFR ? "Motif de la demande *" : "Subject *"}
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 bg-[#FAF7F2] border border-[#D8CBB7]/60 rounded-xl text-[#3E4A3D] focus:outline-hidden focus:border-[#A8B8A0] focus:bg-white transition-all text-sm"
                    >
                      <option value="question_bloomlab">{isFR ? "Question sur l'extracteur BloomLab®" : "Question about BloomLab"}</option>
                      <option value="recettes_protocoles">{isFR ? "Conseil recette ou protocole d'extraction" : "Recipe or protocol advice"}</option>
                      <option value="commande_livraison">{isFR ? "Suivi de commande ou livraison" : "Order or delivery tracking"}</option>
                      <option value="sav_garantie">{isFR ? "Service après-vente & Garantie" : "After-sales & Warranty"}</option>
                      <option value="partenariat_presse">{isFR ? "Partenariat, distribution ou presse" : "Partnership & Press"}</option>
                      <option value="autre">{isFR ? "Autre demande" : "Other inquiry"}</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-[#3E4A3D] uppercase tracking-wider block">
                    {isFR ? "Votre Message *" : "Your Message *"}
                  </label>
                  <textarea 
                    required
                    rows={5}
                    placeholder={isFR ? "Précisez votre demande, vos questions ou vos observations..." : "Write your message here..."}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 bg-[#FAF7F2] border border-[#D8CBB7]/60 rounded-xl text-[#3E4A3D] placeholder-slate-400 focus:outline-hidden focus:border-[#A8B8A0] focus:bg-white transition-all text-sm leading-relaxed"
                  />
                </div>

                {/* Notice */}
                <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#D8CBB7]/40 text-xs text-slate-500 leading-relaxed flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-[#A8B8A0] shrink-0 mt-0.5" />
                  <p>
                    {isFR 
                      ? "Rappel déontologique : Bloom by BotaniK propose des outils d'extraction et des contenus éducatifs sur le Totum végétal. Nos conseils portent sur le matériel et les paramètres d'extraction, et ne constituent en aucun cas une consultation médicale."
                      : "Ethical reminder: Bloom by BotaniK provides botanical extraction tools and educational content. For medical questions, please consult a healthcare professional."}
                  </p>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-2xl bg-[#3E4A3D] hover:bg-[#2D372C] text-white font-bold text-sm tracking-wide uppercase transition-all shadow-md flex items-center justify-center gap-3 cursor-pointer disabled:opacity-50"
                >
                  {loading ? (
                    <span>{isFR ? "Envoi en cours..." : "Sending..."}</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>{isFR ? "Envoyer mon message" : "Send message"}</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
