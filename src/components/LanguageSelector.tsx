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
          className="flex items-center gap-3 w-full p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-white"
        >
          <span className="text-lg">{currentLang.flag}</span>
          <span className="text-[10px] font-bold uppercase tracking-widest flex-1 text-left">
            {currentLang.label}
          </span>
          <ChevronDown className={`w-3 h-3 text-white/40 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <div className="absolute bottom-full left-2 right-2 mb-2 bg-[#293228] border border-white/10 rounded-xl overflow-hidden shadow-2xl z-50 animate-in fade-in slide-in-from-bottom-2 duration-200">
            {languages.map((l) => (
              <button
                key={l.code}
                onClick={() => handleSelect(l.code)}
                className={`flex items-center gap-3 w-full px-4 py-3 text-sm transition-colors hover:bg-white/5 ${
                  lang === l.code ? 'text-botanik-orange' : 'text-white/70'
                }`}
              >
                <span>{l.flag}</span>
                <span className="flex-1 text-left text-xs font-bold uppercase tracking-wider">{l.label}</span>
                {lang === l.code && <Check className="w-3 h-3" />}
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
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 border border-white/10 text-white"
        >
          <span className="text-base">{currentLang.flag}</span>
          <ChevronDown className={`w-3 h-3 text-white/40 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <div className="absolute top-full right-0 mt-2 w-40 bg-botanik-green border border-white/10 rounded-xl overflow-hidden shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-200">
            {languages.map((l) => (
              <button
                key={l.code}
                onClick={() => handleSelect(l.code)}
                className={`flex items-center gap-3 w-full px-4 py-3 text-sm transition-colors hover:bg-white/5 ${
                  lang === l.code ? 'text-botanik-orange' : 'text-white/70'
                }`}
              >
                <span>{l.flag}</span>
                <span className="flex-1 text-left text-[10px] font-bold uppercase tracking-wider">{l.label}</span>
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
        className="flex flex-col items-center gap-1 transition-all text-botanik-green/40 min-w-[50px]"
      >
        <span className="text-xl">{currentLang.flag}</span>
        <span className="text-[9px] uppercase font-bold tracking-wider">{currentLang.code}</span>
      </button>

      {isOpen && (
        <div className="absolute bottom-full right-0 mb-4 w-36 bg-white border border-botanik-green/10 rounded-xl overflow-hidden shadow-2xl z-50 animate-in fade-in slide-in-from-bottom-2 duration-200">
          {languages.map((l) => (
            <button
              key={l.code}
              onClick={() => handleSelect(l.code)}
              className={`flex items-center gap-3 w-full px-4 py-3 text-sm transition-colors hover:bg-botanik-green/5 ${
                lang === l.code ? 'text-botanik-orange font-bold' : 'text-botanik-green/60'
              }`}
            >
              <span>{l.flag}</span>
              <span className="flex-1 text-left text-[10px] uppercase tracking-wider">{l.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
