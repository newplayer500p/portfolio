import React from 'react';
import { ArrowDownRight, Download, Send } from 'lucide-react';
import { useLang } from '../i18n/LanguageContext';

export default function HeroBigText({ profile, onOpenContact, onDownloadCV }) {
  const { t } = useLang();

  return (
    <section className="min-h-screen flex items-center pt-24 pb-16 px-4 sm:px-6 max-w-6xl mx-auto">

      {/* ── Desktop: Side-by-side layout ── */}
      <div className="hidden md:grid grid-cols-2 gap-16 items-center w-full">

        {/* Left — Profile Photo */}
        <div className="flex justify-start">
          <div className="relative">
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
            {/* Intuitive Green Availability Dot at 10:30 Position (Top-Left) */}
            <div
              className="absolute top-3 left-3 z-10 flex items-center justify-center"
              title={t('hero_available_title')}
            >
              <span className="absolute inline-flex h-6 w-6 rounded-full bg-emerald-400 opacity-75 animate-ping"></span>
              <span className="relative inline-flex h-4.5 w-4.5 rounded-full bg-emerald-500 ring-4 ring-[#fdf8f4] dark:ring-[#07080c] shadow-md"></span>
            </div>
          </div>
        </div>

        {/* Right — Bio & CTAs */}
        <div className="space-y-8 sm:space-y-10 text-left">
          <div className="space-y-3 sm:space-y-4">
            <h1 className="text-display-xl text-slate-900 dark:text-white leading-tight">
              {profile?.name}
            </h1>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
              {profile?.title}
            </p>
          </div>

          <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed max-w-xl font-normal">
            {profile?.bio}
          </p>

          <div className="flex flex-wrap gap-4 pt-2 justify-start items-center">
            <a href="#realisations" className="btn-primary text-sm py-3 px-6">
              {t('hero_cta_projects')}
              <ArrowDownRight className="w-4 h-4" />
            </a>
            <button onClick={onDownloadCV} className="btn-secondary text-sm py-3 px-5">
              <Download className="w-4 h-4" />
              {t('hero_cta_cv')}
            </button>
            <button onClick={onOpenContact} className="btn-secondary text-sm py-3 px-5">
              <Send className="w-4 h-4" />
              {t('hero_cta_contact')}
            </button>
          </div>
        </div>

      </div>

      {/* ── Mobile: Premium centered card layout ── */}
      <div className="flex md:hidden flex-col items-center w-full">

        {/* Top section — Photo + 10:30 Status Indicator Dot */}
        <div className="relative mb-8">
          {/* Decorative glow ring behind photo */}
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

          {/* Intuitive Green Availability Dot at 10:30 Position (Top-Left) */}
          <div
            className="absolute top-2 left-2 z-10 flex items-center justify-center"
            title={t('hero_available_title')}
          >
            <span className="absolute inline-flex h-5 w-5 rounded-full bg-emerald-400 opacity-75 animate-ping"></span>
            <span className="relative inline-flex h-4 w-4 rounded-full bg-emerald-500 ring-4 ring-[#fdf8f4] dark:ring-[#07080c] shadow-md"></span>
          </div>
        </div>

        {/* Name — Large with comfortable left & right margins */}
        <h1 className="font-display font-extrabold text-[1.75rem] leading-[1.25] tracking-tight text-center text-slate-900 dark:text-white px-6 max-w-[320px] mx-auto mb-4">
          {profile?.name}
        </h1>

        {/* Title — Subtle accent */}
        <p className="text-sm sm:text-base text-center text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-[300px] mb-8">
          {profile?.title}
        </p>

        {/* Divider */}
        <div className="w-16 h-[2px] rounded-full bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-700 to-transparent mb-8"></div>

        {/* Bio */}
        <p className="text-sm text-center text-slate-600 dark:text-slate-300 leading-relaxed max-w-[340px] mb-12">
          {profile?.bio}
        </p>

        {/* CTA — Primary action prominent, secondary actions compact */}
        <div className="flex flex-col items-center gap-3.5 w-full max-w-[320px]">
          <a
            href="#realisations"
            className="btn-primary text-sm py-3.5 px-8 w-full justify-center shadow-lg"
          >
            {t('hero_cta_projects')}
            <ArrowDownRight className="w-4 h-4" />
          </a>

          <div className="flex gap-3 w-full">
            <button
              onClick={onDownloadCV}
              className="btn-secondary text-xs py-3 px-4 flex-1 justify-center"
            >
              <Download className="w-3.5 h-3.5" />
              {t('hero_cta_cv_short')}
            </button>
            <button
              onClick={onOpenContact}
              className="btn-secondary text-xs py-3 px-4 flex-1 justify-center"
            >
              <Send className="w-3.5 h-3.5" />
              {t('hero_cta_contact')}
            </button>
          </div>
        </div>

      </div>

    </section>
  );
}
