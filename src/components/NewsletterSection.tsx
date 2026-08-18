import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Check, Loader2, Shield } from 'lucide-react';
import { subscribeToNewsletter } from '../lib/newsletter';

interface NewsletterSectionProps {
  lang: string;
}

export const NewsletterSection: React.FC<NewsletterSectionProps> = ({ lang }) => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    try {
      await subscribeToNewsletter(email, firstName);
      setStatus('success');
      setEmail('');
      setFirstName('');
    } catch (error: any) {
      console.error(error);
      setStatus('error');
      setErrorMessage(lang === 'fr' ? 'Une erreur est survenue.' : lang === 'de' ? 'Ein Fehler ist aufgetreten.' : 'An error occurred.');
    }
  };

  const t = {
    fr: {
      title: "Faites fleurir votre savoir botanique",
      subtitle: "Rejoignez la communauté Bloom et recevez chaque mardi nos conseils d'experts pour maîtriser l'extraction du Totum.",
      placeholderEmail: "Votre adresse email",
      placeholderName: "Votre prénom",
      button: "M'inscrire gratuitement",
      success: "Merci ! Vérifiez votre boîte mail pour confirmer votre inscription.",
      privacy: "Respect de votre vie privée. Désinscription en un clic.",
      benefit1: "Conseils de saison",
      benefit2: "Recettes exclusives",
      benefit3: "Accès privilégié"
    },
    en: {
      title: "Let your botanical knowledge bloom",
      subtitle: "Join the Bloom community and receive our expert tips every Tuesday to master Totum extraction.",
      placeholderEmail: "Your email address",
      placeholderName: "Your first name",
      button: "Subscribe for free",
      success: "Thank you! Please check your email to confirm your subscription.",
      privacy: "Privacy respected. One-click unsubscribe.",
      benefit1: "Seasonal tips",
      benefit2: "Exclusive recipes",
      benefit3: "Priority access"
    },
    de: {
      title: "Lassen Sie Ihr botanisches Wissen erblühen",
      subtitle: "Werden Sie Teil der Bloom-Gemeinschaft und erhalten Sie jeden Dienstag unsere Expertentipps zur Beherrschung der Totum-Extraktion.",
      placeholderEmail: "Ihre E-Mail-Adresse",
      placeholderName: "Ihr Vorname",
      button: "Kostenlos anmelden",
      success: "Vielen Dank! Bitte überprüfen Sie Ihre E-Mails, um Ihre Anmeldung zu bestätigen.",
      privacy: "Datenschutz gewährleistet. Abmeldung mit einem Klick.",
      benefit1: "Saisonale Tipps",
      benefit2: "Exklusive Rezepte",
      benefit3: "Priorisierter Zugang"
    }
  }[lang as 'fr' | 'en' | 'de'] || {
    title: "Faites fleurir votre savoir botanique",
    subtitle: "Rejoignez la communauté Bloom et recevez chaque mardi nos conseils d'experts pour maîtriser l'extraction du Totum.",
    placeholderEmail: "Votre adresse email",
    placeholderName: "Votre prénom",
    button: "M'inscrire gratuitement",
    success: "Merci ! Vérifiez votre boîte mail pour confirmer votre inscription.",
    privacy: "Respect de votre vie privée. Désinscription en un clic.",
    benefit1: "Conseils de saison",
    benefit2: "Recettes exclusives",
    benefit3: "Accès privilégié"
  };

  return (
    <section className="py-20 bg-[#1C3F34] relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-800/20 rounded-full blur-3xl -mr-48 -mt-48" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-900/20 rounded-full blur-3xl -ml-48 -mb-48" />

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/50 border border-emerald-700/50 text-emerald-400 text-xs font-bold uppercase tracking-widest">
              <Mail className="w-3 h-3" />
              Newsletter Hebdomadaire
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
              {t.title}
            </h2>
            <p className="text-lg text-emerald-100/70 max-w-lg">
              {t.subtitle}
            </p>
            
            <div className="flex flex-wrap gap-6 pt-4">
              {[t.benefit1, t.benefit2, t.benefit3].map((benefit, i) => (
                <div key={i} className="flex items-center gap-2 text-white/80 text-sm font-medium">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <Check className="w-3 h-3 text-emerald-400" />
                  </div>
                  {benefit}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-8 md:p-10 rounded-[40px] shadow-2xl relative">
            {status === 'success' ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10 space-y-4"
              >
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check className="w-10 h-10 text-emerald-600" />
                </div>
                <h3 className="text-2xl font-black text-[#0F261E]">{lang === 'fr' ? 'Presque fini !' : lang === 'de' ? 'Fast fertig!' : 'Almost there!'}</h3>
                <p className="text-slate-600">
                  {t.success}
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-[#0F261E] uppercase tracking-wider pl-1">{t.placeholderName}</label>
                    <input 
                      type="text" 
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="Jean"
                      className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1C3F34]/20 transition-all text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-[#0F261E] uppercase tracking-wider pl-1">{t.placeholderEmail}</label>
                    <input 
                      type="email" 
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="jean@exemple.com"
                      className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1C3F34]/20 transition-all text-sm"
                    />
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={status === 'loading'}
                  className="w-full py-5 rounded-2xl bg-[#D97706] hover:bg-[#B45309] text-white font-black text-lg transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  {status === 'loading' ? (
                    <Loader2 className="w-6 h-6 animate-spin" />
                  ) : (
                    t.button
                  )}
                </button>

                <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 font-medium pt-2">
                  <Shield className="w-3 h-3" />
                  {t.privacy}
                </div>
                
                {status === 'error' && (
                  <p className="text-center text-red-600 text-xs font-bold">{errorMessage}</p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
