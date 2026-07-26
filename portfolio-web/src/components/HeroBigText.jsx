import React from 'react';
import { ArrowDownRight, Download, Send } from 'lucide-react';

export default function HeroBigText({ profile, onOpenContact, onDownloadCV }) {
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
            {/* Status badge */}
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-1.5 rounded-full bg-white dark:bg-slate-900 border border-emerald-500/30 text-xs font-semibold text-emerald-600 dark:text-emerald-400 shadow-lg whitespace-nowrap">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Disponible pour opportunités
            </div>
          </div>
        </div>

        {/* Right — Bio & CTAs */}
        <div className="space-y-8 text-left">
          <div className="space-y-2">
            <h1 className="text-display-xl text-slate-900 dark:text-white">
              {profile?.name}
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 font-medium leading-snug">
              {profile?.title}
            </p>
          </div>

          <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed max-w-lg">
            {profile?.bio}
          </p>

          <div className="flex flex-wrap gap-3 pt-1 justify-start items-center">
            <a href="#realisations" className="btn-primary text-sm py-2.5 px-6">
              Voir mes réalisations
              <ArrowDownRight className="w-4 h-4" />
            </a>
            <button onClick={onDownloadCV} className="btn-secondary text-sm py-2.5 px-5">
              <Download className="w-4 h-4" />
              Télécharger mon CV
            </button>
            <button onClick={onOpenContact} className="btn-secondary text-sm py-2.5 px-5">
              <Send className="w-4 h-4" />
              Me contacter
            </button>
          </div>
        </div>

      </div>

      {/* ── Mobile: Premium centered card layout ── */}
      <div className="flex md:hidden flex-col items-center w-full">

        {/* Top section — Photo + Badge integrated */}
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
        </div>

        {/* Status badge — Standalone below photo */}
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200/60 dark:border-emerald-500/20 text-[11px] font-bold text-emerald-700 dark:text-emerald-400 shadow-sm mb-8 tracking-wide uppercase">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          Disponible
        </div>

        {/* Name — Large and prominent */}
        <h1 className="font-display font-extrabold text-[1.75rem] leading-[1.1] tracking-tight text-center text-slate-900 dark:text-white mb-3">
          {profile?.name}
        </h1>

        {/* Title — Subtle accent */}
        <p className="text-sm text-center text-slate-500 dark:text-slate-400 font-medium leading-snug max-w-[280px] mb-6">
          {profile?.title}
        </p>

        {/* Divider */}
        <div className="w-12 h-[2px] rounded-full bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-700 to-transparent mb-6"></div>

        {/* Bio */}
        <p className="text-[13px] text-center text-slate-600 dark:text-slate-300 leading-relaxed max-w-[320px] mb-10">
          {profile?.bio}
        </p>

        {/* CTA — Primary action prominent, secondary actions compact */}
        <div className="flex flex-col items-center gap-3 w-full max-w-[320px]">
          <a
            href="#realisations"
            className="btn-primary text-sm py-3 px-8 w-full justify-center"
          >
            Voir mes réalisations
            <ArrowDownRight className="w-4 h-4" />
          </a>

          <div className="flex gap-2.5 w-full">
            <button
              onClick={onDownloadCV}
              className="btn-secondary text-xs py-2.5 px-4 flex-1 justify-center"
            >
              <Download className="w-3.5 h-3.5" />
              Mon CV
            </button>
            <button
              onClick={onOpenContact}
              className="btn-secondary text-xs py-2.5 px-4 flex-1 justify-center"
            >
              <Send className="w-3.5 h-3.5" />
              Me contacter
            </button>
          </div>
        </div>

      </div>

    </section>
  );
}
