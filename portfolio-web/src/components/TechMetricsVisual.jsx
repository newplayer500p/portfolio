import React from 'react';
import { Terminal, Code2, Layers, Cpu, Database, Smartphone } from 'lucide-react';

export default function TechMetricsVisual({ profile }) {
  const tools       = profile?.skills?.tools       || [];
  const competences = profile?.skills?.competences || [];

  const categoryIcons = {
    "Mobile & Web": <Smartphone className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />,
    "Backend": <Layers className="w-4 h-4 text-amber-600 dark:text-amber-400" />,
    "Données": <Database className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />,
    "IA & Automatisation": <Cpu className="w-4 h-4 text-purple-600 dark:text-purple-400" />,
  };

  return (
    <section id="competences" className="py-16 sm:py-24 px-4 sm:px-6 max-w-6xl mx-auto space-y-8 sm:space-y-12">

      {/* Section Header */}
      <div>
        <h2 className="text-display-lg text-slate-900 dark:text-white">Mes compétences</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-stretch">

        {/* Left Panel — Outils & Technologies */}
        <div className="glass-panel p-5 sm:p-8 space-y-6 glow-border flex flex-col justify-between">
          <div className="flex items-center gap-2.5 border-b border-slate-200 dark:border-white/5 pb-4">
            <Terminal className="w-4.5 h-4.5 text-[#7c5c44] dark:text-cyan-400" />
            <h3 className="text-xs font-bold text-slate-700 dark:text-slate-300 font-display tracking-widest uppercase">
              Outils & Technologies
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
            {tools.map((group, idx) => (
              <div
                key={idx}
                className="p-4 sm:p-5 rounded-2xl bg-[#faf6f0] dark:bg-white/[0.03] border border-[#eee7de] dark:border-white/5 space-y-3 flex flex-col justify-between hover:border-cyan-500/30 dark:hover:border-cyan-500/30 transition-all shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm sm:text-base font-bold text-slate-900 dark:text-white font-display">
                    {group.category}
                  </p>
                  {categoryIcons[group.category] || <Terminal className="w-4 h-4 text-slate-400" />}
                </div>

                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {group.items.map((tool) => (
                    <span
                      key={tool}
                      className="px-2.5 py-1 rounded-xl bg-[#f4ede5] dark:bg-white/[0.06] text-slate-800 dark:text-slate-200 text-xs font-semibold border border-[#ddd0c4] dark:border-white/10 hover:border-cyan-500/40 dark:hover:border-cyan-400/40 hover:bg-cyan-500/5 transition-all shadow-2xs"
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
        <div className="glass-panel p-5 sm:p-8 space-y-6 glow-border flex flex-col justify-between">
          <div className="flex items-center gap-2.5 border-b border-slate-200 dark:border-white/5 pb-4">
            <Code2 className="w-4.5 h-4.5 text-[#7c5c44] dark:text-cyan-400" />
            <h3 className="text-xs font-bold text-slate-700 dark:text-slate-300 font-display tracking-widest uppercase">
              Compétences clés
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
            {competences.map((comp, idx) => (
              <div
                key={idx}
                className="p-4 sm:p-5 rounded-2xl bg-[#faf6f0] dark:bg-white/[0.03] border border-[#eee7de] dark:border-white/5 space-y-2.5 flex flex-col justify-start items-start hover:border-cyan-500/30 dark:hover:border-cyan-500/30 transition-all shadow-sm"
              >
                <h4 className="font-display font-bold text-slate-900 dark:text-white text-sm sm:text-base leading-snug">
                  {comp.title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
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
