import React from 'react';
import { Terminal, Code2 } from 'lucide-react';

export default function TechMetricsVisual({ profile }) {
  const tools       = profile?.skills?.tools       || [];
  const competences = profile?.skills?.competences || [];

  return (
    <section id="competences" className="py-24 px-6 max-w-6xl mx-auto space-y-12">

      {/* Section Header */}
      <div>
        <h2 className="text-display-lg text-slate-900 dark:text-white">Mes compétences</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">

        {/* Left Panel — Outils & Technologies */}
        <div className="glass-panel p-6 sm:p-8 space-y-6 glow-border flex flex-col">
          <div className="flex items-center gap-2.5 border-b border-slate-200 dark:border-white/5 pb-4">
            <Terminal className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
            <h3 className="text-xs font-bold text-slate-700 dark:text-slate-300 font-display tracking-widest uppercase">
              Outils & Technologies
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
            {tools.map((group, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl bg-slate-100/60 dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/5 space-y-3 flex flex-col justify-start items-start hover:border-cyan-500/30 hover:bg-slate-100 dark:hover:bg-white/[0.04] transition-all"
              >
                <p className="text-base font-bold text-slate-900 dark:text-white font-display">
                  {group.category}
                </p>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((tool) => (
                    <span
                      key={tool}
                      className="px-3 py-1.5 rounded-full bg-slate-200/80 dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 text-xs sm:text-sm font-medium border border-slate-300 dark:border-slate-700/50"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel — Compétences clés */}
        <div className="glass-panel p-6 sm:p-8 space-y-6 glow-border flex flex-col">
          <div className="flex items-center gap-2.5 border-b border-slate-200 dark:border-white/5 pb-4">
            <Code2 className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
            <h3 className="text-xs font-bold text-slate-700 dark:text-slate-300 font-display tracking-widest uppercase">
              Compétences clés
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
            {competences.map((comp, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl bg-slate-100/60 dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/5 space-y-2.5 flex flex-col justify-start items-start hover:border-cyan-500/30 hover:bg-slate-100 dark:hover:bg-white/[0.04] transition-all"
              >
                <h4 className="font-display font-bold text-slate-900 dark:text-white text-base leading-snug">
                  {comp.title}
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {comp.detail}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>

    </section>
  );
}
