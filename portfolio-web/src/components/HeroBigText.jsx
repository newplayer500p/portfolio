import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDownRight, Download, Send } from 'lucide-react';
import { useLang } from '../i18n/LanguageContext';
import { springSmooth, springBouncy } from './Motion';

export default function HeroBigText({ profile, onOpenContact, onDownloadCV, isReady = false }) {
  const { t } = useLang();

  // ── Animation orchestrée : se déclenche uniquement quand isReady = true ──

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.15,
      },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] },
    },
  };

  const photoReveal = {
    hidden: { opacity: 0, scale: 0.92 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: springSmooth,
    },
  };

  const ctaStagger = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const ctaItem = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] },
    },
  };

  return (
    <section className="min-h-screen flex items-center pt-24 pb-16 px-4 sm:px-6 max-w-6xl mx-auto">

      {/* ── Desktop: Side-by-side layout ── */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isReady ? 'visible' : 'hidden'}
        className="hidden md:grid grid-cols-2 gap-16 items-center w-full"
      >

        {/* Left — Profile Photo */}
        <div className="flex justify-start">
          <motion.div variants={photoReveal} className="relative">
            <div className="w-80 h-80 rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-cyan-500/10">
              {profile?.profile ? (
                <img
                  src={profile.profile}
                  alt={profile.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 flex items-center justify-center">
                  <span className="font-display font-extrabold text-7xl text-white/20 select-none">
                    HM
                  </span>
                </div>
              )}
            </div>
            {/* Intuitive Green Availability Dot */}
            <div
              className="absolute top-3 left-3 z-10 flex items-center justify-center"
              title={t('hero_available_title')}
            >
              <span className="absolute inline-flex h-6 w-6 rounded-full bg-emerald-400 opacity-75 animate-ping"></span>
              <span className="relative inline-flex h-4.5 w-4.5 rounded-full bg-emerald-500 ring-4 ring-[#fdf8f4] dark:ring-[#07080c] shadow-md"></span>
            </div>
          </motion.div>
        </div>

        {/* Right — Bio & CTAs */}
        <div className="space-y-8 sm:space-y-10 text-left">
          <div className="space-y-3 sm:space-y-4">
            <motion.h1 variants={fadeUp} className="text-display-xl text-slate-900 dark:text-white leading-tight">
              {profile?.name}
            </motion.h1>
            <motion.p variants={fadeUp} className="text-base sm:text-lg text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
              {profile?.title}
            </motion.p>
          </div>

          <motion.p variants={fadeUp} className="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed max-w-xl font-normal">
            {profile?.bio}
          </motion.p>

          <motion.div variants={ctaStagger} className="flex flex-wrap gap-4 pt-2 justify-start items-center">
            <motion.a
              variants={ctaItem}
              href="#realisations"
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.97 }}
              transition={springBouncy}
              className="btn-primary text-sm py-3 px-6"
            >
              {t('hero_cta_projects')}
              <ArrowDownRight className="w-4 h-4" />
            </motion.a>
            <motion.button
              variants={ctaItem}
              onClick={onDownloadCV}
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.97 }}
              transition={springBouncy}
              className="btn-secondary text-sm py-3 px-5 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              {t('hero_cta_cv')}
            </motion.button>
            <motion.button
              variants={ctaItem}
              onClick={onOpenContact}
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.97 }}
              transition={springBouncy}
              className="btn-secondary text-sm py-3 px-5 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              {t('hero_cta_contact')}
            </motion.button>
          </motion.div>
        </div>

      </motion.div>

      {/* ── Mobile: Premium centered card layout ── */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isReady ? 'visible' : 'hidden'}
        className="flex md:hidden flex-col items-center w-full"
      >

        {/* Top section — Photo */}
        <motion.div variants={photoReveal} className="relative mb-8">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-500/20 via-transparent to-emerald-500/20 dark:from-cyan-500/10 dark:to-emerald-500/10 blur-2xl scale-150"></div>
          
          <div className="relative w-36 h-36 rounded-full overflow-hidden border-2 border-white/20 dark:border-white/10 shadow-2xl shadow-cyan-500/20 ring-4 ring-white/10 dark:ring-white/5">
            {profile?.profile ? (
              <img
                src={profile.profile}
                alt={profile.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 flex items-center justify-center">
                <span className="font-display font-extrabold text-4xl text-white/20 select-none">
                  HM
                </span>
              </div>
            )}
          </div>

          <div
            className="absolute top-2 left-2 z-10 flex items-center justify-center"
            title={t('hero_available_title')}
          >
            <span className="absolute inline-flex h-5 w-5 rounded-full bg-emerald-400 opacity-75 animate-ping"></span>
            <span className="relative inline-flex h-4 w-4 rounded-full bg-emerald-500 ring-4 ring-[#fdf8f4] dark:ring-[#07080c] shadow-md"></span>
          </div>
        </motion.div>

        {/* Name */}
        <motion.h1 variants={fadeUp} className="font-display font-extrabold text-[1.75rem] leading-[1.25] tracking-tight text-center text-slate-900 dark:text-white px-6 max-w-[320px] mx-auto mb-4">
          {profile?.name}
        </motion.h1>

        {/* Title */}
        <motion.p variants={fadeUp} className="text-sm sm:text-base text-center text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-[300px] mb-8">
          {profile?.title}
        </motion.p>

        {/* Divider */}
        <motion.div variants={fadeUp} className="w-16 h-[2px] rounded-full bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-700 to-transparent mb-8"></motion.div>

        {/* Bio */}
        <motion.p variants={fadeUp} className="text-sm text-center text-slate-600 dark:text-slate-300 leading-relaxed max-w-[340px] mb-12">
          {profile?.bio}
        </motion.p>

        {/* CTA */}
        <motion.div variants={ctaStagger} className="flex flex-col items-center gap-3.5 w-full max-w-[320px]">
          <motion.a
            variants={ctaItem}
            href="#realisations"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={springBouncy}
            className="btn-primary text-sm py-3.5 px-8 w-full justify-center shadow-lg"
          >
            {t('hero_cta_projects')}
            <ArrowDownRight className="w-4 h-4" />
          </motion.a>

          <motion.div variants={ctaStagger} className="flex gap-3 w-full">
            <motion.button
              variants={ctaItem}
              onClick={onDownloadCV}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={springBouncy}
              className="btn-secondary text-xs py-3 px-4 flex-1 justify-center cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              {t('hero_cta_cv_short')}
            </motion.button>
            <motion.button
              variants={ctaItem}
              onClick={onOpenContact}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={springBouncy}
              className="btn-secondary text-xs py-3 px-4 flex-1 justify-center cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              {t('hero_cta_contact')}
            </motion.button>
          </motion.div>
        </motion.div>

      </motion.div>

    </section>
  );
}
