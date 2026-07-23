import React from 'react';
import { FileText, Sparkles } from 'lucide-react';
import GithubIcon from './GithubIcon';

export default function ProjectCard({ project, onOpenDetails, onOpenAI }) {
  const demoVideo = project.media?.demo_video;
  const hasImages = (project.media?.screenshots?.length || 0) > 0;
  const hasGithub = !!project.links?.github;
  const isFeatured = !!project.featured;

  const hasActions = hasImages || isFeatured || hasGithub;

  return (
    <div className="glass-panel p-6 glow-border flex flex-col justify-between gap-5 transition-all duration-300">

      <div className="space-y-4">
        {/* Title */}
        <h3 className="font-display font-bold text-2xl text-white tracking-tight">
          {project.title}
        </h3>

        {/* Short description */}
        <p className="text-sm text-slate-400 leading-relaxed line-clamp-3">
          {project.details?.summary}
        </p>

        {/* Video player — only if demo_video exists */}
        {demoVideo && (
          <div className="rounded-xl overflow-hidden border border-white/5 bg-black aspect-video mt-2">
            <video
              src={demoVideo}
              controls
              preload="metadata"
              poster={project.media?.screenshots?.[0] || ''}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Technologies — Soft rounded pills */}
        <div className="flex flex-wrap gap-2 pt-1">
          {project.stack?.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 rounded-full bg-slate-800/60 text-slate-300 text-xs font-medium border border-slate-700/30 hover:bg-slate-800 transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Actions — bottom */}
      {hasActions && (
        <div className="pt-4 border-t border-white/5 flex flex-wrap items-center gap-3 mt-auto">
          {hasImages && (
            <button
              onClick={() => onOpenDetails(project)}
              className="btn-secondary py-2 px-4 text-xs"
            >
              <FileText className="w-3.5 h-3.5 text-slate-400" />
              Détails
            </button>
          )}

          {isFeatured && (
            <button
              onClick={() => onOpenAI(project)}
              className="btn-secondary py-2 px-4 text-xs text-cyan-400 border-cyan-500/20 bg-cyan-500/5 hover:bg-cyan-500/10"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              En savoir plus (IA)
            </button>
          )}

          {hasGithub && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary py-2 px-4 text-xs text-slate-300"
              title="Code source GitHub"
            >
              <GithubIcon className="w-3.5 h-3.5 text-slate-400" />
              Code source
            </a>
          )}
        </div>
      )}

    </div>
  );
}
