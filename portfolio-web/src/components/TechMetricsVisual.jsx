import React from 'react';
import { Terminal, Code2 } from 'lucide-react';

export default function TechMetricsVisual({ profile }) {
  const tools       = profile?.skills?.tools       || [];
  const competences = profile?.skills?.competences || [];

  return (
    <section id="competences" className="py-24 px-6 max-w-6xl mx-auto space-y-12">

      {/* Section Header */}
      <div>
        <h2 className="text-display-lg text-white">Mes compétences</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">

        {/* Left Panel — Outils & Technologies */}
        <div className="glass-panel p-6 sm:p-8 space-y-6 glow-border flex flex-col">
          <div className="flex items-center gap-2.5 border-b border-white/5 pb-4">
            <Terminal className="w-4 h-4 text-cyan-400" />
            <h3 className="text-xs font-bold text-slate-300 font-display tracking-widest uppercase">
              Outils & Technologies
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
            {tools.map((group, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl bg-white/[0.02] border border-white/5 space-y-3 flex flex-col justify-center items-start hover:border-cyan-500/20 hover:bg-white/[0.04] transition-all"
              >
                <p className="text-sm font-bold text-white font-display">
                  {group.category}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {group.items.map((tool) => (
                    <span
                      key={tool}
                      className="px-2.5 py-1 rounded-full bg-slate-800/60 text-slate-300 text-xs font-medium border border-slate-700/30"
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
          <div className="flex items-center gap-2.5 border-b border-white/5 pb-4">
            <Code2 className="w-4 h-4 text-cyan-400" />
            <h3 className="text-xs font-bold text-slate-300 font-display tracking-widest uppercase">
              Compétences clés
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
            {competences.map((comp, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl bg-white/[0.02] border border-white/5 space-y-2 flex flex-col justify-center items-start hover:border-cyan-500/20 hover:bg-white/[0.04] transition-all"
              >
                <h4 className="font-display font-bold text-white text-sm leading-snug">
                  {comp.title}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
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
