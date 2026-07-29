import React from 'react';
import { UserCheck, GraduationCap, Code2, Sparkles } from 'lucide-react';

export default function AboutSection({ profile }) {
  const about = profile?.about;
  if (!about) return null;

  const highlights = [
    { icon: <GraduationCap className="w-4 h-4 text-emerald-500" />, text: "Licence 3 Génie Logiciel" },
    { icon: <Code2 className="w-4 h-4 text-cyan-400" />, text: "ESP-Antsirabe" },
    { icon: <Sparkles className="w-4 h-4 text-amber-500" />, text: "Full-Stack & IA" },
  ];

  return (
    <section id="apropos" className="py-16 sm:py-24 px-4 sm:px-6 max-w-6xl mx-auto space-y-8 sm:space-y-12">
      
      {/* Section Header */}
      <div>
        <h2 className="text-display-lg text-slate-900 dark:text-white">
          {about.title || 'À propos de moi'}
        </h2>
      </div>

      {/* Main Glass Panel */}
      <div className="glass-panel p-6 sm:p-10 space-y-8 glow-border">
        
        <div className="flex items-center gap-2.5 border-b border-slate-200 dark:border-white/5 pb-4">
          <UserCheck className="w-4.5 h-4.5 text-[#7c5c44] dark:text-cyan-400" />
          <h3 className="text-xs font-bold text-slate-700 dark:text-slate-300 font-display tracking-widest uppercase">
            Parcours & Philosophie
          </h3>
        </div>

        {/* Paragraphs */}
        <div className="space-y-5 text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
          {about.paragraphs?.map((p, idx) => (
            <p key={idx}>{p}</p>
          ))}
        </div>

        {/* Key Highlights Bar */}
        <div className="pt-6 border-t border-slate-200 dark:border-white/5 flex flex-wrap gap-3 sm:gap-4 items-center">
          {highlights.map((h, i) => (
            <div
              key={i}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#faf6f0] dark:bg-white/[0.04] border border-[#eee7de] dark:border-white/10 text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200"
            >
              {h.icon}
              <span>{h.text}</span>
            </div>
          ))}
        </div>

      </div>

    </section>
  );
}
