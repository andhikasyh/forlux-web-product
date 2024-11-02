import { useStore } from '@nanostores/react';
import { useState, useRef, useEffect } from 'react';
import { currentLanguage, toggleLanguage } from '../stores/languageStore';

export default function LanguageToggle() {
  const $currentLanguage = useStore(currentLanguage);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const languages = {
    en: {
      flag: "🇬🇧",
      name: "English",
      shortName: "EN"
    },
    id: {
      flag: "🇮🇩",
      name: "Indonesia",
      shortName: "ID"
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageChange = (lang) => {
    if (lang !== $currentLanguage) {
      currentLanguage.set(lang);
    }
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-1.5 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-300"
      >
        <span className="text-base">{languages[$currentLanguage].flag}</span>
        <span className="hidden lg:inline">{languages[$currentLanguage].name}</span>
        <span className="lg:hidden">{languages[$currentLanguage].shortName}</span>
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-lg bg-[#1a1f2d] border border-white/10 shadow-lg py-1 z-50">
          {Object.entries(languages).map(([code, lang]) => (
            <button
              key={code}
              onClick={() => handleLanguageChange(code)}
              className={`w-full text-left px-4 py-2 text-sm flex items-center space-x-3 hover:bg-white/5 transition-colors
                ${code === $currentLanguage ? 'text-forlux-orange-primary' : 'text-gray-400'}`}
            >
              <span className="text-base">{lang.flag}</span>
              <span>{lang.name}</span>
              {code === $currentLanguage && (
                <svg className="w-4 h-4 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
} 