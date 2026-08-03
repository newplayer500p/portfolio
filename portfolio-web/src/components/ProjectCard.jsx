import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ChevronDown, ChevronUp, Box } from 'lucide-react';
import GithubIcon from './GithubIcon';
import { useLang } from '../i18n/LanguageContext';
import { springSmooth, springBouncy } from './Motion';

export default function ProjectCard({ project, onOpenDetails, onOpenAI }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { t } = useLang();

  const demoVideo = project.media?.demo_video;
  const hasImages = (project.media?.screenshots?.length || 0) > 0;
  const hasGithub = !!(project.links?.github && project.links.github.trim());
  const isFeatured = !!project.featured;

  const summary = project.details?.summary || '';
  const isLongSummary = summary.length > 150;

  const hasActions = hasImages || isFeatured || hasGithub;

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={springSmooth}
      className="glass-panel p-6 glow-border flex flex-col justify-between gap-5 transition-all duration-300 h-full"
    >

      <div className="space-y-4">
        {/* Title */}
        <h3 className="font-display font-bold text-2xl text-slate-900 dark:text-white tracking-tight">
          {project.title}
        </h3>

        {/* Short description with inline expand / collapse toggle & smooth layout animation */}
        <div>
          <motion.p
            layout
            className={`text-sm text-slate-600 dark:text-slate-400 leading-relaxed ${isExpanded ? '' : 'line-clamp-3'}`}
          >
            {summary}
          </motion.p>
          {isLongSummary && (
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsExpanded(!isExpanded)}
              className="inline-flex items-center gap-1 text-xs text-amber-900 dark:text-cyan-400 font-medium hover:underline mt-1.5 cursor-pointer bg-transparent border-none p-0"
            >
              {isExpanded ? (
                <>
                  {t('projects_card_read_less')} <ChevronUp className="w-3 h-3" />
                </>
              ) : (
                <>
                  {t('projects_card_read_more')} <ChevronDown className="w-3 h-3" />
                </>
              )}
            </motion.button>
          )}
        </div>

        {/* Video player — only if demo_video exists */}
        {demoVideo && (
          <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-white/5 bg-black aspect-video mt-2 relative z-10">
            <video
              src={demoVideo}
              controls
              playsInline
              preload="metadata"
              poster={project.media?.screenshots?.[0] || ''}
              className="w-full h-full object-cover relative z-10 pointer-events-auto"
              style={{ isolation: 'isolate' }}
            />
          </div>
        )}

        {/* Technologies — Soft rounded pills with hover micro-animations */}
        <div className="flex flex-wrap gap-2 pt-1">
          {project.stack?.map((tech) => (
            <motion.span
              key={tech}
              whileHover={{ scale: 1.08, y: -1 }}
              transition={springBouncy}
              className="px-3 py-1 rounded-full bg-white/80 dark:bg-slate-800/60 text-[#4d3d2e] dark:text-slate-300 text-xs font-medium border border-[#e8dfd5] dark:border-slate-700/40 shadow-2xs cursor-default"
            >
              {tech}
            </motion.span>
          ))}
        </div>
      </div>

      {/* Actions — bottom */}
      {hasActions && (
        <div className="pt-4 border-t border-slate-200/80 dark:border-white/5 grid grid-cols-2 gap-2.5 mt-auto">
          {hasImages && (
            <motion.button
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              transition={springBouncy}
              onClick={() => onOpenDetails(project)}
              className="btn-secondary py-2.5 px-3 text-xs justify-center text-center w-full min-w-0 cursor-pointer"
            >
              <Box className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400 shrink-0" />
              <span className="truncate">{t('projects_card_images')} (3D)</span>
            </motion.button>
          )}

          {isFeatured && (
            <motion.button
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              transition={springBouncy}
              onClick={() => onOpenAI(project)}
              className="btn-secondary py-2.5 px-3 text-xs justify-center text-center w-full min-w-0 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-700 dark:text-cyan-400 shrink-0" />
              <span className="truncate">{t('projects_card_ai')}</span>
            </motion.button>
          )}

          {hasGithub && (
            <motion.a
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              transition={springBouncy}
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className={`btn-secondary py-2.5 px-3 text-xs justify-center text-center min-w-0 ${
                hasImages && isFeatured ? 'col-span-2 w-full' : 'w-full'
              }`}
              title="Code source GitHub"
            >
              <GithubIcon className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400 shrink-0" />
              <span className="truncate">{t('projects_card_code')}</span>
            </motion.a>
          )}
        </div>
      )}

    </motion.div>
  );
}

