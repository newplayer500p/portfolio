import React, { createContext, useContext, useState, useCallback } from 'react';
import fr from './translations/fr';
import en from './translations/en';

const translations = { fr, en };

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    const saved = localStorage.getItem('lang');
    return saved === 'en' ? 'en' : 'fr';
  });

  const setLang = useCallback((newLang) => {
    setLangState(newLang);
    localStorage.setItem('lang', newLang);
  }, []);

  const t = useCallback(
    (key) => {
      const dict = translations[lang] || translations['fr'];
      return dict[key] ?? key;
    },
    [lang]
  );

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLang must be used inside LanguageProvider');
  return ctx;
}
