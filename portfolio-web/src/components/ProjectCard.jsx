import React, { useState } from 'react';
import { Image, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import GithubIcon from './GithubIcon';

export default function ProjectCard({ project, onOpenDetails, onOpenAI }) {
  const [isExpanded, setIsExpanded] = useState(false);

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
              className="inline-flex items-center gap-1 text-xs text-cyan-600 dark:text-cyan-400 font-medium hover:underline mt-1.5 cursor-pointer bg-transparent border-none p-0"
            >
              {isExpanded ? (
                <>
                  Réduire <ChevronUp className="w-3 h-3" />
                </>
              ) : (
                <>
                  Lire la suite <ChevronDown className="w-3 h-3" />
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
              className="px-3 py-1 rounded-full bg-slate-200/70 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 text-xs font-medium border border-slate-300/60 dark:border-slate-700/30 transition-colors"
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
              Images
            </button>
          )}

          {isFeatured && (
            <button
              onClick={() => onOpenAI(project)}
              className="btn-secondary py-2 px-4 text-xs text-cyan-600 dark:text-cyan-400 border-cyan-500/30 bg-cyan-500/10 dark:bg-cyan-500/5 hover:bg-cyan-500/20"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
              Assistant IA
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
              Code
            </a>
          )}
        </div>
      )}

    </div>
  );
}
