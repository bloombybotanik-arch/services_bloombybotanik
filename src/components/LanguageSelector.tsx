import React, { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { Language } from '../translations';

interface LanguageSelectorProps {
  lang: Language;
  setLang: (lang: Language) => void;
  variant?: 'sidebar' | 'mobile-header' | 'mobile-bottom';
}

const languages: { code: Language; label: string; flag: string }[] = [
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
];

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ lang, setLang, variant = 'sidebar' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLang = languages.find((l) => l.code === lang) || languages[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (code: Language) => {
    setLang(code);
    setIsOpen(false);
  };

  if (variant === 'sidebar') {
    return (
      <div className="relative mb-10 px-2" ref={dropdownRef}>
        <button
          onClick={toggleDropdown}
          className="flex items-center justify-center w-12 h-12 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-white"
        >
          <span className="text-xl">{currentLang.flag}</span>
        </button>

        {isOpen && (
          <div className="absolute bottom-full left-0 mb-2 bg-[#293228] border border-white/10 rounded-xl overflow-hidden shadow-2xl z-50 animate-in fade-in slide-in-from-bottom-2 duration-200">
            {languages.map((l) => (
              <button
                key={l.code}
                onClick={() => handleSelect(l.code)}
                className={`flex items-center justify-center w-12 h-12 text-xl transition-colors hover:bg-white/5 ${
                  lang === l.code ? 'bg-botanik-orange/20 text-botanik-orange' : 'text-white/70'
                }`}
              >
                <span>{l.flag}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  if (variant === 'mobile-header') {
    return (
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={toggleDropdown}
          className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/10 border border-white/10 text-white"
        >
          <span className="text-xl">{currentLang.flag}</span>
        </button>

        {isOpen && (
          <div className="absolute top-full right-0 mt-2 bg-botanik-green border border-white/10 rounded-xl overflow-hidden shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-200">
            {languages.map((l) => (
              <button
                key={l.code}
                onClick={() => handleSelect(l.code)}
                className={`flex items-center justify-center w-12 h-12 text-xl transition-colors hover:bg-white/5 ${
                  lang === l.code ? 'bg-botanik-orange/20 text-botanik-orange font-bold' : 'text-white/70'
                }`}
              >
                <span>{l.flag}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  // mobile-bottom variant
  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="flex items-center justify-center w-12 h-12 transition-all text-botanik-green/40"
      >
        <span className="text-2xl">{currentLang.flag}</span>
      </button>

      {isOpen && (
        <div className="absolute bottom-full right-0 mb-4 bg-white border border-botanik-green/10 rounded-xl overflow-hidden shadow-2xl z-50 animate-in fade-in slide-in-from-bottom-2 duration-200">
          {languages.map((l) => (
            <button
              key={l.code}
              onClick={() => handleSelect(l.code)}
              className={`flex items-center justify-center w-12 h-12 text-xl transition-colors hover:bg-botanik-green/5 ${
                lang === l.code ? 'bg-botanik-orange/10 text-botanik-orange font-bold' : 'text-botanik-green/60'
              }`}
            >
              <span>{l.flag}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
