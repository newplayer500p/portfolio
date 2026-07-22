import React from 'react';
import { ArrowDownRight, Download, Send } from 'lucide-react';

export default function HeroBigText({ profile, onOpenContact, onDownloadCV }) {
  return (
    <section className="min-h-screen flex items-center pt-24 pb-16 px-6 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center w-full">

        {/* Left — Profile Photo */}
        <div className="flex justify-center md:justify-start">
          <div className="relative">
            {/* Photo container with subtle glow */}
            <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-cyan-500/10">
              <div className="w-full h-full bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 flex items-center justify-center">
                {/* Placeholder — replace with actual profile photo */}
                <span className="font-display font-extrabold text-7xl text-white/20 select-none">
                  HM
                </span>
              </div>
            </div>
            {/* Status badge */}
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 border border-emerald-500/30 text-xs font-semibold text-emerald-400 shadow-lg">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Disponible pour opportunités
            </div>
          </div>
        </div>

        {/* Right — Short Bio & CTAs */}
        <div className="space-y-8">
          {/* Name */}
          <div className="space-y-2">
            <h1 className="text-display-xl text-white">
              {profile.name}
            </h1>
            <p className="text-lg text-slate-400 font-medium">
              Développeur Full-Stack — L3 Génie Logiciel, ESPA Antsirabe
            </p>
          </div>

          {/* Short bio — 2-3 lines max */}
          <p className="text-base text-slate-300 leading-relaxed max-w-lg">
            Je conçois et déploie des applications web et mobiles complètes, des systèmes backend complexes, et j'intègre des solutions IA dans mes projets.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-3 pt-2">
            <a href="#realisations" className="btn-primary">
              Voir mes réalisations
              <ArrowDownRight className="w-4 h-4" />
            </a>
            <button onClick={onDownloadCV} className="btn-secondary">
              <Download className="w-4 h-4" />
              Télécharger mon CV
            </button>
            <button onClick={onOpenContact} className="btn-secondary">
              <Send className="w-4 h-4" />
              Me contacter
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
