import React from 'react';
import { Layers, Sparkles, FileText, ArrowRight, ShieldCheck, Cpu } from 'lucide-react';
import GithubIcon from './GithubIcon';
import Project3DOrbit from './Project3DOrbit';

export default function ProjectCard({ project, onOpenDetails, onOpenAI, onSelectImage }) {
  const isFlagship = project.tier === 'flagship';

  return (
    <div className={`glass-panel p-6 sm:p-8 glow-border relative flex flex-col justify-between transition-all duration-300 ${
      isFlagship ? 'border-cyan-500/20 bg-slate-900/90' : 'bg-slate-900/60'
    }`}>
      
      {/* Top Banner: Category & Featured Flag */}
      <div>
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2">
            <span className={`badge-tag ${isFlagship ? 'badge-tag-accent' : ''}`}>
              <Layers className="w-3.5 h-3.5" />
              {project.category}
            </span>
            {project.featured && (
              <span className="badge-tag-emerald">
                <ShieldCheck className="w-3.5 h-3.5" />
                Projet Soutenu
              </span>
            )}
          </div>
          <span className="text-xs font-mono text-slate-400 font-medium">
            {project.period}
          </span>
        </div>

        {/* Project Title */}
        <h3 className="text-display-lg text-white font-bold mb-3 tracking-tight">
          {project.title}
        </h3>

        {/* Short Essential Summary */}
        <p className="text-sm text-slate-300 leading-relaxed mb-6">
          {project.details?.summary}
        </p>

        {/* Interactive 3D Screenshot & Video Showcase Orbit */}
        <div className="mb-6">
          <Project3DOrbit project={project} onSelectImage={onSelectImage} />
        </div>

        {/* Tech Stack Badges */}
        <div className="flex flex-wrap gap-1.5 mb-8">
          {project.stack?.map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 rounded-md bg-slate-800/80 border border-slate-700/60 text-xs font-medium text-slate-300"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Action Footer Buttons */}
      <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
        
        <div className="flex flex-wrap items-center gap-2">
          {/* Architecture & Details Button */}
          <button
            onClick={() => onOpenDetails(project)}
            className="btn-primary py-2.5 px-4 text-xs"
          >
            <FileText className="w-4 h-4" />
            <span>Détails & Architecture</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          {/* Per-Project AI Assistant Trigger */}
          <button
            onClick={() => onOpenAI(project)}
            className="btn-secondary py-2.5 px-4 text-xs text-cyan-300 border-cyan-500/30 bg-cyan-950/30 hover:bg-cyan-900/40"
            title="Poser des questions à l'assistant IA de ce projet"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>Assistant IA</span>
          </button>
        </div>

        {/* GitHub Code Link */}
        {project.links?.github && (
          <a
            href={project.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-icon"
            title="Consulter le dépôt GitHub"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
        )}

      </div>

    </div>
  );
}
