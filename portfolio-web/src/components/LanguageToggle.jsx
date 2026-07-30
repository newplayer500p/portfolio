import React from 'react';
import { useLang } from '../i18n/LanguageContext';

export default function LanguageToggle() {
  const { lang, setLang } = useLang();

  return (
    <div className="lang-toggle-wrap" role="group" aria-label="Language selector">
      <button
        onClick={() => setLang('fr')}
        className={`lang-btn ${lang === 'fr' ? 'lang-btn-active' : 'lang-btn-inactive'}`}
        aria-pressed={lang === 'fr'}
        title="Passer en Français"
      >
        FR
      </button>
      <span className="lang-divider" aria-hidden="true">|</span>
      <button
        onClick={() => setLang('en')}
        className={`lang-btn ${lang === 'en' ? 'lang-btn-active' : 'lang-btn-inactive'}`}
        aria-pressed={lang === 'en'}
        title="Switch to English"
      >
        EN
      </button>
    </div>
  );
}
