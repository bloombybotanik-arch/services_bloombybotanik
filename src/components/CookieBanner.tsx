import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, X } from 'lucide-react';
import { Language, translations } from '../translations';

export const CookieBanner = ({ lang }: { lang: Language }) => {
  const [isVisible, setIsVisible] = useState(false);
  const t = translations[lang].common;

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-6 left-6 right-6 md:left-auto md:right-8 md:max-w-md z-[100]"
        >
          <div className="bg-white rounded-3xl p-6 shadow-2xl border border-botanik-green/10">
            <div className="flex gap-4 items-start mb-4">
              <div className="w-10 h-10 rounded-xl bg-botanik-green/5 flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-6 h-6 text-botanik-green" />
              </div>
              <div>
                <h4 className="text-botanik-green font-bold">Cookies & Confidentialité</h4>
                <p className="text-sm text-botanik-green/60 leading-relaxed mt-1">
                  {lang === 'fr' 
                    ? "Nous utilisons des cookies pour améliorer votre expérience et analyser le trafic." 
                    : lang === 'en' 
                    ? "We use cookies to improve your experience and analyze traffic." 
                    : "Wir verwenden Cookies, um Ihre Erfahrung zu verbessern und den Datenverkehr zu analysieren."}
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleAccept}
                className="flex-1 bg-botanik-green text-white py-3 rounded-xl font-bold hover:bg-botanik-orange transition-all"
              >
                Accepter
              </button>
              <button
                onClick={handleDecline}
                className="px-6 py-3 bg-botanik-green/5 text-botanik-green/60 rounded-xl font-bold hover:bg-botanik-green/10 transition-all"
              >
                Refuser
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
