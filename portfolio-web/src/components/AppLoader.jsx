import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function AppLoader({ onFinish }) {
  const welcomeText = "Bienvenue sur le portfolio de";
  const nameText = "RASOLOFOSON Haja Mirado";

  const [animDone, setAnimDone] = useState(false);

  useEffect(() => {
    // Durée totale : délai welcome (0.3s) + welcome (0.5s) + délai name (0.4s) + lettres (~22 * 0.04 = 0.88s) + dernière lettre (0.35s) + marge
    const totalDuration = 3000;
    const timer = setTimeout(() => {
      setAnimDone(true);
    }, totalDuration);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (animDone) {
      onFinish();
    }
  }, [animDone, onFinish]);

  // Animation douce du texte "Bienvenue sur le portfolio de"
  const welcomeVariants = {
    hidden: { opacity: 0, y: -8 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  // Conteneur des lettres du nom — stagger fluide lettre par lettre
  const nameContainerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.7, // Après que "Bienvenue..." soit apparu
        staggerChildren: 0.04, // Délai entre chaque lettre — rapide et fluide
      },
    },
  };

  // Chaque lettre : simple fade + léger slide vers le bas, SANS scale pour éviter le saut de style
  const letterVariants = {
    hidden: { opacity: 0, y: -6 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.35,
        ease: [0.25, 0.1, 0.25, 1], // Courbe cubique douce
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45, ease: 'easeInOut' }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[var(--bg-page)] text-[var(--text-primary)] px-6 select-none"
    >
      <div className="max-w-2xl w-full text-center space-y-6">

        {/* Badge de chargement */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 dark:bg-cyan-500/10 border border-amber-500/20 dark:border-cyan-500/20 text-amber-600 dark:text-cyan-400 text-xs font-semibold tracking-wider uppercase"
        >
          <span className="w-2 h-2 rounded-full bg-amber-500 dark:bg-cyan-400 animate-pulse"></span>
          Chargement de l'expérience...
        </motion.div>

        {/* Texte 1: Bienvenue sur le portfolio de */}
        <motion.p
          variants={welcomeVariants}
          initial="hidden"
          animate="visible"
          className="text-base sm:text-xl font-body font-medium text-slate-600 dark:text-slate-400"
        >
          {welcomeText}
        </motion.p>

        {/* Texte 2: RASOLOFOSON Haja Mirado — lettre par lettre comme PowerPoint */}
        <motion.div
          variants={nameContainerVariants}
          initial="hidden"
          animate="visible"
          className="text-2xl sm:text-4xl md:text-5xl font-display font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center justify-center flex-wrap gap-x-3 gap-y-1"
        >
          {nameText.split(' ').map((word, wordIndex) => (
            <span key={wordIndex} style={{ whiteSpace: 'nowrap', display: 'inline-flex' }}>
              {word.split('').map((char, charIndex) => (
                <motion.span
                  key={`${wordIndex}-${charIndex}`}
                  variants={letterVariants}
                  style={{ display: 'inline-block' }}
                >
                  {char}
                </motion.span>
              ))}
            </span>
          ))}
        </motion.div>


        {/* Barre de progression fluide */}
        <div className="w-48 sm:w-64 h-1 mx-auto bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden mt-8">
          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 2.8, ease: 'easeInOut' }}
            className="h-full bg-amber-600 dark:bg-cyan-400"
          />
        </div>

      </div>
    </motion.div>
  );
}
