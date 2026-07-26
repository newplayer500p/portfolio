import React from 'react';
import { ArrowDownRight, Download, Send } from 'lucide-react';

export default function HeroBigText({ profile, onOpenContact, onDownloadCV }) {
  return (
    <section className="min-h-screen flex items-center pt-24 pb-16 px-4 sm:px-6 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center w-full">

        {/* Left — Profile Photo */}
        <div className="flex justify-center md:justify-start">
          <div className="relative">
            {/* Photo container with subtle glow */}
            <div className="w-52 h-52 sm:w-80 sm:h-80 rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-cyan-500/10">
              {profile?.profile ? (
                <img
                  src={profile.profile}
                  alt={profile.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 flex items-center justify-center">
                  <span className="font-display font-extrabold text-6xl sm:text-7xl text-white/20 select-none">
                    HM
                  </span>
                </div>
              )}
            </div>
            {/* Status badge */}
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-white dark:bg-slate-900 border border-emerald-500/30 text-[11px] sm:text-xs font-semibold text-emerald-600 dark:text-emerald-400 shadow-lg whitespace-nowrap">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Disponible pour opportunités
            </div>
          </div>
        </div>

        {/* Right — Short Bio & CTAs */}
        <div className="space-y-7 sm:space-y-8 text-center md:text-left">
          {/* Name & Title */}
          <div className="space-y-3 sm:space-y-2">
            <h1 className="text-display-xl text-slate-900 dark:text-white">
              {profile?.name}
            </h1>
            <p className="text-sm sm:text-lg text-slate-600 dark:text-slate-400 font-medium leading-snug">
              {profile?.title}
            </p>
          </div>

          {/* Short bio */}
          <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed max-w-lg mx-auto md:mx-0">
            {profile?.bio}
          </p>

          {/* CTA Buttons — Natural inline wrapping (No full width stretching) */}
          <div className="flex flex-wrap gap-2.5 sm:gap-3 pt-1 justify-center md:justify-start items-center">
            <a href="#realisations" className="btn-primary text-xs sm:text-sm py-2.5 px-4 sm:px-6">
              Voir mes réalisations
              <ArrowDownRight className="w-4 h-4" />
            </a>
            <button onClick={onDownloadCV} className="btn-secondary text-xs sm:text-sm py-2.5 px-4 sm:px-5">
              <Download className="w-4 h-4" />
              Télécharger mon CV
            </button>
            <button onClick={onOpenContact} className="btn-secondary text-xs sm:text-sm py-2.5 px-4 sm:px-5">
              <Send className="w-4 h-4" />
              Me contacter
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
