import React, { useState, useEffect } from 'react';
import { Sparkles, FolderOpen, Wrench, Mail } from 'lucide-react';

export default function Header({ onOpenGeneralAI }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'py-3 bg-[#07080c]/90 backdrop-blur-xl border-b border-white/5'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">

        {/* Left — Name only, clean */}
        <a href="#" className="font-display font-bold text-white text-lg tracking-tight hover:opacity-80 transition-opacity">
          Haja Mirado
        </a>

        {/* Right — Navigation links, coherent & minimal */}
        <nav className="flex items-center gap-8 text-sm font-medium text-slate-400">
          <a
            href="#realisations"
            className="hover:text-white transition-colors hidden sm:block"
          >
            Réalisations
          </a>
          <a
            href="#competences"
            className="hover:text-white transition-colors hidden sm:block"
          >
            Compétences
          </a>
          <a
            href="#contact"
            className="hover:text-white transition-colors hidden sm:block"
          >
            Contact
          </a>
          <button
            onClick={onOpenGeneralAI}
            className="flex items-center gap-2 px-4 py-2 rounded-full text-cyan-400 border border-cyan-500/30 bg-cyan-500/5 hover:bg-cyan-500/15 transition-all cursor-pointer text-xs font-semibold"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Assistant IA
          </button>
        </nav>

      </div>
    </header>
  );
}
