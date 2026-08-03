import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Code2, Layers, Cpu, Database, Smartphone } from 'lucide-react';
import { useLang } from '../i18n/LanguageContext';
import { StaggerContainer, StaggerItem, springBouncy } from './Motion';

export default function TechMetricsVisual({ profile }) {
  const { t } = useLang();
  const tools       = profile?.skills?.tools       || [];
  const competences = profile?.skills?.competences || [];

  const categoryIcons = {
    "Mobile & Web": <Smartphone className="w-4 h-4 text-amber-600 dark:text-cyan-400" />,
    "Backend": <Layers className="w-4 h-4 text-amber-600 dark:text-amber-400" />,
    "Données": <Database className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />,
    "Data": <Database className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />,
    "IA & Automatisation": <Cpu className="w-4 h-4 text-purple-600 dark:text-purple-400" />,
    "AI & Automation": <Cpu className="w-4 h-4 text-purple-600 dark:text-purple-400" />,
  };

  return (
    <section id="competences" className="py-16 sm:py-24 px-4 sm:px-6 max-w-6xl mx-auto space-y-8 sm:space-y-12">

      {/* Section Header */}
      <div>
        <h2 className="text-display-lg text-slate-900 dark:text-white">{t('skills_section_title')}</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-stretch">

        {/* Left Panel — Outils & Technologies */}
        <div className="glass-panel p-5 sm:p-8 space-y-6 glow-border flex flex-col justify-between">
          <div className="flex items-center gap-2.5 border-b border-slate-200 dark:border-white/5 pb-4">
            <Terminal className="w-4.5 h-4.5 text-[#7c5c44] dark:text-cyan-400" />
            <h3 className="text-xs font-bold text-slate-700 dark:text-slate-300 font-display tracking-widest uppercase">
              {t('skills_tools_label')}
            </h3>
          </div>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1" staggerDelay={0.08}>
            {tools.map((group, idx) => (
              <StaggerItem
                key={idx}
                className="p-4 sm:p-5 rounded-2xl bg-[#faf6f0] dark:bg-white/[0.03] border border-[#ede4da] dark:border-white/5 space-y-3 flex flex-col justify-between hover:border-amber-300/50 dark:hover:border-cyan-500/30 transition-all shadow-xs"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm sm:text-base font-bold text-slate-900 dark:text-white font-display">
                    {group.category}
                  </p>
                  {categoryIcons[group.category] || <Terminal className="w-4 h-4 text-slate-400" />}
                </div>

                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {group.items.map((tool) => (
                    <motion.span
                      key={tool}
                      whileHover={{ scale: 1.08, y: -1 }}
                      transition={springBouncy}
                      className="px-2.5 py-1 rounded-xl bg-white/80 dark:bg-white/[0.06] text-[#4d3d2e] dark:text-slate-200 text-xs font-medium border border-[#e8dfd5] dark:border-white/10 hover:border-amber-300/60 dark:hover:border-cyan-400/40 hover:bg-[#f5efe6] dark:hover:bg-cyan-500/10 transition-colors shadow-2xs cursor-default"
                    >
                      {tool}
                    </motion.span>
                  ))}
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

        {/* Right Panel — Compétences clés */}
        <div className="glass-panel p-5 sm:p-8 space-y-6 glow-border flex flex-col justify-between">
          <div className="flex items-center gap-2.5 border-b border-slate-200 dark:border-white/5 pb-4">
            <Code2 className="w-4.5 h-4.5 text-[#7c5c44] dark:text-cyan-400" />
            <h3 className="text-xs font-bold text-slate-700 dark:text-slate-300 font-display tracking-widest uppercase">
              {t('skills_key_label')}
            </h3>
          </div>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1" staggerDelay={0.08}>
            {competences.map((comp, idx) => (
              <StaggerItem
                key={idx}
                className="p-4 sm:p-5 rounded-2xl bg-[#faf6f0] dark:bg-white/[0.03] border border-[#ede4da] dark:border-white/5 space-y-2.5 flex flex-col justify-start items-start hover:border-amber-300/50 dark:hover:border-cyan-500/30 transition-all shadow-xs"
              >
                <h4 className="font-display font-bold text-slate-900 dark:text-white text-sm sm:text-base leading-snug">
                  {comp.title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {comp.detail}
                </p>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

      </div>

    </section>
  );
}

