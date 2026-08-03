import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import LanguageToggle from './LanguageToggle';
import { useLang } from '../i18n/LanguageContext';
import { springBouncy } from './Motion';

export default function Header({ profile, onOpenGeneralAI }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useLang();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { href: '#apropos', label: t('nav_about') },
    { href: '#realisations', label: t('nav_projects') },
    { href: '#competences', label: t('nav_skills') },
    { href: '#contact', label: t('nav_contact') },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || mobileMenuOpen
          ? 'py-3 glass-nav'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">

        {/* Left — Dynamic Name */}
        <a href="#" className="font-display font-bold text-slate-900 dark:text-white text-base sm:text-lg tracking-tight hover:opacity-80 transition-opacity shrink-0">
          <span className="hidden sm:inline">{profile?.name || 'RASOLOFOSON Haja Mirado'}</span>
          <span className="inline sm:hidden">Haja Mirado</span>
        </a>

        {/* Right — Desktop Navigation & Mobile Actions */}
        <nav className="flex items-center gap-2 sm:gap-4 text-sm font-medium text-slate-600 dark:text-slate-400">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-slate-900 dark:hover:text-white transition-colors hidden sm:block"
            >
              {link.label}
            </a>
          ))}

          <LanguageToggle />
          <ThemeToggle />

          <motion.button
            onClick={onOpenGeneralAI}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={springBouncy}
            className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-full text-amber-900 dark:text-cyan-400 border border-amber-300/60 dark:border-cyan-500/30 bg-amber-100/60 dark:bg-cyan-500/5 hover:bg-amber-200/60 dark:hover:bg-cyan-500/20 transition-all cursor-pointer text-xs font-semibold"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">{t('header_ai_btn')}</span>
          </motion.button>

          {/* Mobile Hamburger Toggle */}
          <motion.button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileTap={{ scale: 0.9 }}
            className="sm:hidden p-2 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-amber-100/60 dark:hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Menu de navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </motion.button>
        </nav>

      </div>

      {/* Mobile Navigation Menu Dropdown with Framer Motion AnimatePresence */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -10 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="sm:hidden overflow-hidden px-4 pt-3 pb-4 border-t border-slate-200/60 dark:border-white/10 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl shadow-xl space-y-2 mt-2"
          >
            {navLinks.map((link, idx) => (
              <motion.a
                key={link.href}
                href={link.href}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 + 0.1 }}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-800 dark:text-slate-200 hover:bg-amber-100/60 dark:hover:bg-white/10 transition-all"
              >
                {link.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

