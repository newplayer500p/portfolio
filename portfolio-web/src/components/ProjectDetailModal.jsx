import React from 'react';
import { X, Layers, Cpu, ShieldAlert, UserCheck, Sparkles, Database, CheckCircle2 } from 'lucide-react';
import GithubIcon from './GithubIcon';

export default function ProjectDetailModal({ project, onClose, onOpenAI }) {
  if (!project) return null;

  const details = project.details || {};

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-800 bg-slate-950/80 sticky top-0 z-20">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="badge-tag badge-tag-accent">
                {project.category}
              </span>
              <span className="text-xs font-mono text-slate-400">
                {project.period}
              </span>
            </div>
            <h2 className="text-display-lg text-white font-bold">
              {project.title}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="btn-icon bg-slate-800 hover:bg-slate-700 text-slate-300"
            title="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 text-slate-300 text-sm">
          
          {/* Summary */}
          {details.summary && (
            <div className="glass-panel p-6 bg-slate-950/50">
              <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                <Layers className="w-4 h-4 text-cyan-400" />
                Présentation Globale
              </h3>
              <p className="leading-relaxed text-slate-300">
                {details.summary}
              </p>
            </div>
          )}

          {/* Architecture Section */}
          {details.architecture && (
            <div className="space-y-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
                <Database className="w-4 h-4 text-purple-400" />
                Architecture & Infrastructure Backend
              </h3>
              <p className="leading-relaxed text-slate-300 bg-slate-950/40 p-4 rounded-xl border border-slate-800/80">
                {details.architecture}
              </p>
            </div>
          )}

          {/* Key Features */}
          {details.features && (
            <div className="space-y-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Fonctionnalités Majeures
              </h3>
              <p className="leading-relaxed text-slate-300 bg-slate-950/40 p-4 rounded-xl border border-slate-800/80">
                {details.features}
              </p>
            </div>
          )}

          {/* Technical Challenges */}
          {details.challenges && (
            <div className="space-y-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
                <ShieldAlert className="w-4 h-4 text-amber-400" />
                Défis Techniques & Solutions Approfondies
              </h3>
              <p className="leading-relaxed text-slate-300 bg-slate-950/40 p-4 rounded-xl border border-amber-500/20">
                {details.challenges}
              </p>
            </div>
          )}

          {/* Role & UML Modeling */}
          {details.role && (
            <div className="space-y-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
                <UserCheck className="w-4 h-4 text-cyan-400" />
                Rôle de Mirado & Conception Système (UML / Merise)
              </h3>
              <p className="leading-relaxed text-slate-300 bg-slate-950/40 p-4 rounded-xl border border-slate-800/80">
                {details.role}
              </p>
            </div>
          )}

          {/* Full Tech Stack Pills */}
          <div className="space-y-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Cpu className="w-4 h-4 text-blue-400" />
              Technologies & Frameworks Utilisés
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.stack?.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 font-semibold text-xs text-cyan-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Footer CTAs */}
        <div className="px-6 py-4 border-t border-slate-800 bg-slate-950/90 flex flex-wrap items-center justify-between gap-4 sticky bottom-0 z-20">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                onClose();
                onOpenAI(project);
              }}
              className="btn-primary py-2 px-4 text-xs"
            >
              <Sparkles className="w-4 h-4 text-cyan-950" />
              <span>Interroger l'Assistant IA du projet</span>
            </button>
          </div>

          {project.links?.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary py-2 px-4 text-xs"
            >
              <GithubIcon className="w-4 h-4" />
              <span>Voir le code sur GitHub</span>
            </a>
          )}
        </div>

      </div>

    </div>
  );
}
