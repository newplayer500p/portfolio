import React from 'react';
import { Terminal, Code2 } from 'lucide-react';

// Color palette per tool group — indexed by position
const groupColors = [
  { text: 'text-blue-400',    pill: 'bg-blue-500/8   border-blue-500/15'   },
  { text: 'text-cyan-400',    pill: 'bg-cyan-500/8   border-cyan-500/15'   },
  { text: 'text-purple-400',  pill: 'bg-purple-500/8 border-purple-500/15' },
  { text: 'text-emerald-400', pill: 'bg-emerald-500/8 border-emerald-500/15' },
];

export default function TechMetricsVisual({ profile }) {
  const tools       = profile?.skills?.tools       || [];
  const competences = profile?.skills?.competences || [];

  return (
    <section id="competences" className="py-24 px-6 max-w-6xl mx-auto space-y-12">

      {/* Section Header */}
      <div>
        <h2 className="text-display-lg text-white">Mes compétences</h2>
        <p className="text-slate-400 text-base max-w-2xl mt-2">
          Stack Full-Stack complète — du mobile natif aux pipelines IA, en passant par les données géospatiales.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* Left — Outils & Technologies (from JSON) */}
        <div className="glass-panel p-6 sm:p-8 space-y-6 glow-border">
          <div className="flex items-center gap-2 border-b border-slate-800/50 pb-4">
            <Terminal className="w-4 h-4 text-cyan-400" />
            <h3 className="text-xs font-bold text-white font-display tracking-widest uppercase opacity-70">
              Outils & Technologies
            </h3>
          </div>

          <div className="space-y-5">
            {tools.map((group, idx) => {
              const color = groupColors[idx % groupColors.length];
              return (
                <div key={idx} className="space-y-2">
                  <p className={`text-[11px] font-bold uppercase tracking-widest ${color.text}`}>
                    {group.category}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((tool) => (
                      <span
                        key={tool}
                        className={`px-3 py-1 rounded-full text-xs font-medium text-slate-300 border ${color.pill} hover:text-white transition-colors`}
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right — Compétences clés (from JSON) */}
        <div className="glass-panel p-6 sm:p-8 space-y-6 glow-border">
          <div className="flex items-center gap-2 border-b border-slate-800/50 pb-4">
            <Code2 className="w-4 h-4 text-purple-400" />
            <h3 className="text-xs font-bold text-white font-display tracking-widest uppercase opacity-70">
              Compétences clés
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {competences.map((comp, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-white/2 border border-white/5 space-y-2 group hover:border-purple-500/20 hover:bg-white/4 transition-all"
              >
                <span className="font-mono text-[11px] font-bold text-purple-400/40 group-hover:text-purple-400 transition-colors">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <h4 className="font-display font-bold text-slate-200 text-sm leading-snug">
                  {comp.title}
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed">
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
