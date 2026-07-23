import React, { useState, useEffect } from 'react';
import { X, Sparkles } from 'lucide-react';
import GithubIcon from './GithubIcon';

export default function ProjectDetailModal({ project, onClose, onOpenAI }) {
  if (!project) return null;

  const screenshots = project.media?.screenshots || [];
  const isFeatured = !!project.featured;

  const [rotationAngle, setRotationAngle] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(true);

  // Auto-rotate orbit
  useEffect(() => {
    if (!isAutoRotating || screenshots.length <= 1) return;
    const interval = setInterval(() => {
      setRotationAngle((prev) => (prev + 0.5) % 360);
    }, 40);
    return () => clearInterval(interval);
  }, [isAutoRotating, screenshots.length]);

  const count = screenshots.length;
  const radius = Math.min(300, Math.max(180, count * 30));

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl bg-slate-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/5">
          <div>
            <h2 className="font-display font-bold text-xl text-white">
              {project.title}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">{project.category} — {project.period}</p>
          </div>
          <button onClick={onClose} className="btn-icon">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-8">

          {/* 3D Orbit — screenshots in circular rotation, no scaling */}
          {count > 0 && (
            <div>
              <div
                className="relative mx-auto"
                style={{
                  perspective: '1200px',
                  width: '100%',
                  height: '400px',
                }}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    transformStyle: 'preserve-3d',
                    transform: `rotateX(5deg) rotateY(${rotationAngle}deg)`,
                    transition: isAutoRotating ? 'none' : 'transform 0.1s ease-out',
                  }}
                  onMouseEnter={() => setIsAutoRotating(false)}
                  onMouseLeave={() => setIsAutoRotating(true)}
                >
                  {screenshots.map((imgUrl, index) => {
                    const angleDeg = (index / count) * 360;

                    return (
                      <div
                        key={index}
                        className="absolute top-1/2 left-1/2"
                        style={{
                          transform: `translate(-50%, -50%) rotateY(${angleDeg}deg) translateZ(${radius}px) rotateY(-${angleDeg}deg)`,
                          transformStyle: 'preserve-3d',
                        }}
                      >
                        <div className="w-36 h-24 rounded-lg overflow-hidden border border-white/10 bg-slate-950 shadow-xl hover:border-cyan-400/50 transition-colors cursor-pointer">
                          <img
                            src={imgUrl}
                            alt={`${project.title} — capture ${index + 1}`}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Manual angle slider */}
              <div className="flex items-center gap-3 mt-4 px-2">
                <span className="text-[11px] text-slate-500 font-medium">Rotation</span>
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={rotationAngle}
                  onChange={(e) => {
                    setIsAutoRotating(false);
                    setRotationAngle(parseFloat(e.target.value));
                  }}
                  className="flex-1 accent-cyan-400 h-1 cursor-pointer"
                />
                <span className="text-[11px] font-mono text-cyan-400 w-8 text-right">
                  {Math.round(rotationAngle)}°
                </span>
              </div>
            </div>
          )}

          {count === 0 && (
            <div className="text-center text-slate-500 text-sm py-8">
              Aucune capture d'écran disponible pour ce projet.
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-white/5 flex items-center gap-3">
          {isFeatured && (
            <button
              onClick={() => { onClose(); onOpenAI(project); }}
              className="btn-primary py-2 px-4 text-xs"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Poser une question (IA)
            </button>
          )}

          {project.links?.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary py-2 px-4 text-xs ml-auto"
            >
              <GithubIcon className="w-4 h-4" />
              Code source
            </a>
          )}
        </div>

      </div>
    </div>
  );
}
