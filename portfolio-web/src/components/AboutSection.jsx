import React from 'react';
import { Cpu, Layers, Compass, UserCheck } from 'lucide-react';

export default function AboutSection({ profile }) {
  const about = profile?.about;
  if (!about) return null;

  const cardIcons = [
    <Compass className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />,
    <Layers className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
    <Cpu className="w-5 h-5 text-purple-600 dark:text-purple-400" />
  ];

  return (
    <section id="apropos" className="py-24 px-6 max-w-6xl mx-auto space-y-12">
      
      {/* Section Header */}
      <div>
        <h2 className="text-display-lg text-slate-900 dark:text-white">
          {about.title || 'À propos de moi'}
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Panel — Story & Bio */}
        <div className="lg:col-span-6 glass-panel p-6 sm:p-8 space-y-6 glow-border flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2.5 border-b border-slate-200 dark:border-white/5 pb-4">
              <UserCheck className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              <h3 className="text-xs font-bold text-slate-700 dark:text-slate-300 font-display tracking-widest uppercase">
                Parcours & Philosophie
              </h3>
            </div>

            <div className="space-y-4 text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
              {about.paragraphs?.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 dark:border-white/5 flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>ESPA Antsirabe</span>
            <span>•</span>
            <span>Génie Logiciel (L3)</span>
          </div>
        </div>

        {/* Right Panel — 3 Key Engineering Pillars */}
        <div className="lg:col-span-6 flex flex-col gap-4 justify-between">
          {about.cards?.map((card, idx) => (
            <div
              key={idx}
              className="glass-panel p-6 glow-border space-y-2 flex items-start gap-4 hover:border-cyan-500/30 transition-all flex-1"
            >
              <div className="p-3 rounded-xl bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 shrink-0">
                {cardIcons[idx % cardIcons.length]}
              </div>
              <div className="space-y-1">
                <h4 className="font-display font-bold text-slate-900 dark:text-white text-base">
                  {card.title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>

    </section>
  );
}
