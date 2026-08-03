import React from 'react';
import { motion } from 'framer-motion';
import { UserCheck, GraduationCap, Code2, Sparkles } from 'lucide-react';
import { useLang } from '../i18n/LanguageContext';
import { StaggerContainer, StaggerItem, springBouncy } from './Motion';

export default function AboutSection({ profile }) {
  const { t } = useLang();
  const about = profile?.about;
  if (!about) return null;

  const highlights = [
    { icon: <GraduationCap className="w-4 h-4 text-emerald-500" />, text: t('about_highlight_degree') },
    { icon: <Code2 className="w-4 h-4 text-amber-600 dark:text-cyan-400" />, text: t('about_highlight_school') },
    { icon: <Sparkles className="w-4 h-4 text-amber-500" />, text: t('about_highlight_domain') },
  ];

  return (
    <section id="apropos" className="py-16 sm:py-24 px-4 sm:px-6 max-w-6xl mx-auto space-y-8 sm:space-y-12">
      
      {/* Section Header */}
      <div>
        <h2 className="text-display-lg text-slate-900 dark:text-white">
          {about.title || t('about_section_title')}
        </h2>
      </div>

      {/* Main Glass Panel */}
      <div className="glass-panel p-6 sm:p-10 space-y-8 glow-border">
        
        <div className="flex items-center gap-2.5 border-b border-slate-200 dark:border-white/5 pb-4">
          <UserCheck className="w-4.5 h-4.5 text-[#7c5c44] dark:text-cyan-400" />
          <h3 className="text-xs font-bold text-slate-700 dark:text-slate-300 font-display tracking-widest uppercase">
            {t('about_subsection_label')}
          </h3>
        </div>

        {/* Paragraphs */}
        <div className="space-y-5 text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
          {about.paragraphs?.map((p, idx) => (
            <p key={idx}>{p}</p>
          ))}
        </div>

        {/* Key Highlights Bar with Stagger Animation */}
        <div className="pt-6 border-t border-slate-200 dark:border-white/5">
          <StaggerContainer className="flex flex-wrap gap-3 sm:gap-4 items-center" staggerDelay={0.1}>
            {highlights.map((h, i) => (
              <StaggerItem key={i}>
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  transition={springBouncy}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#faf6f0] dark:bg-white/[0.04] border border-[#ede4da] dark:border-white/10 text-xs sm:text-sm font-semibold text-[#4d3d2e] dark:text-slate-200 shadow-2xs cursor-default"
                >
                  {h.icon}
                  <span>{h.text}</span>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

      </div>

    </section>
  );
}

