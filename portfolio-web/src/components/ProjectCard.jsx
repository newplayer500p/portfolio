import React, { useState } from 'react';
import { Image, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import GithubIcon from './GithubIcon';
import { useLang } from '../i18n/LanguageContext';

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
    <div className="glass-panel p-6 glow-border flex flex-col justify-between gap-5 transition-all duration-300">

      <div className="space-y-4">
        {/* Title */}
        <h3 className="font-display font-bold text-2xl text-slate-900 dark:text-white tracking-tight">
          {project.title}
        </h3>

        {/* Short description with inline expand / collapse toggle */}
        <div>
          <p className={`text-sm text-slate-600 dark:text-slate-400 leading-relaxed ${isExpanded ? '' : 'line-clamp-3'}`}>
            {summary}
          </p>
          {isLongSummary && (
            <button
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
            </button>
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

        {/* Technologies — Soft rounded pills */}
        <div className="flex flex-wrap gap-2 pt-1">
          {project.stack?.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 rounded-full bg-[#fffdfa] dark:bg-slate-800/60 text-[#261e17] dark:text-slate-300 text-xs font-medium border border-[#e8dfd5] dark:border-slate-700/30 transition-colors shadow-2xs"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Actions — bottom */}
      {hasActions && (
        <div className="pt-4 border-t border-slate-200/80 dark:border-white/5 flex flex-wrap items-center gap-3 mt-auto">
          {hasImages && (
            <button
              onClick={() => onOpenDetails(project)}
              className="btn-secondary py-2 px-4 text-xs"
            >
              <Image className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
              {t('projects_card_images')}
            </button>
          )}

          {isFeatured && (
            <button
              onClick={() => onOpenAI(project)}
              className="btn-secondary py-2 px-4 text-xs text-amber-900 dark:text-cyan-400 border-amber-300/60 dark:border-cyan-500/30 bg-amber-100/60 dark:bg-cyan-500/5 hover:bg-amber-200/60 dark:hover:bg-cyan-500/20"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-900 dark:text-cyan-400" />
              {t('projects_card_ai')}
            </button>
          )}

          {hasGithub && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary py-2 px-4 text-xs text-slate-700 dark:text-slate-300"
              title="Code source GitHub"
            >
              <GithubIcon className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
              {t('projects_card_code')}
            </a>
          )}
        </div>
      )}

    </div>
  );
}
