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
          className="flex items-center justify-center w-10 h-10 hover:scale-110 transition-transform text-white bg-transparent focus:outline-none"
          title={currentLang.label}
          aria-label="Choisir la langue"
        >
          <span className="text-2xl select-none drop-shadow-xs">{currentLang.flag}</span>
        </button>

        {isOpen && (
          <div className="absolute bottom-full left-0 mb-2 bg-[#1C3F34] border border-white/15 rounded-xl overflow-hidden shadow-2xl z-50 p-1 min-w-[120px] animate-in fade-in slide-in-from-bottom-2 duration-200">
            {languages.map((l) => (
              <button
                key={l.code}
                onClick={() => handleSelect(l.code)}
                className={`flex items-center gap-2.5 w-full px-3 py-2 rounded-lg text-sm transition-colors hover:bg-white/10 ${
                  lang === l.code ? 'text-[#D97706] font-bold' : 'text-white/80'
                }`}
              >
                <span className="text-xl select-none">{l.flag}</span>
                <span className="text-xs font-semibold">{l.label}</span>
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
          className="flex items-center justify-center w-9 h-9 hover:scale-110 transition-transform text-white bg-transparent focus:outline-none"
          title={currentLang.label}
          aria-label="Choisir la langue"
        >
          <span className="text-2xl select-none drop-shadow-xs">{currentLang.flag}</span>
        </button>

        {isOpen && (
          <div className="absolute top-full right-0 mt-2 bg-[#0F261E] border border-white/15 rounded-xl overflow-hidden shadow-2xl z-50 p-1 min-w-[130px] animate-in fade-in slide-in-from-top-2 duration-200">
            {languages.map((l) => (
              <button
                key={l.code}
                onClick={() => handleSelect(l.code)}
                className={`flex items-center gap-2.5 w-full px-3 py-2 rounded-lg text-sm transition-colors hover:bg-white/10 ${
                  lang === l.code ? 'text-[#D97706] font-bold' : 'text-[#FAF7F2]'
                }`}
              >
                <span className="text-xl select-none">{l.flag}</span>
                <span className="text-xs font-semibold">{l.label}</span>
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
        className="flex items-center justify-center w-10 h-10 hover:scale-110 transition-transform bg-transparent focus:outline-none"
        title={currentLang.label}
        aria-label="Choisir la langue"
      >
        <span className="text-2xl select-none drop-shadow-xs">{currentLang.flag}</span>
      </button>

      {isOpen && (
        <div className="absolute bottom-full right-0 mb-4 bg-white border border-[#E7DFD3] rounded-xl overflow-hidden shadow-2xl z-50 p-1 min-w-[130px] animate-in fade-in slide-in-from-bottom-2 duration-200">
          {languages.map((l) => (
            <button
              key={l.code}
              onClick={() => handleSelect(l.code)}
              className={`flex items-center gap-2.5 w-full px-3 py-2 rounded-lg text-sm transition-colors hover:bg-black/5 ${
                lang === l.code ? 'text-[#D97706] font-bold' : 'text-[#0F261E]'
              }`}
            >
              <span className="text-xl select-none">{l.flag}</span>
              <span className="text-xs font-semibold">{l.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
