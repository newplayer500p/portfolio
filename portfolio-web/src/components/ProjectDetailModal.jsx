import React, { useState, useEffect, useRef } from 'react';
import { X, Sparkles, ChevronLeft, ChevronRight, Play, Pause, Maximize2 } from 'lucide-react';
import GithubIcon from './GithubIcon';

export default function ProjectDetailModal({ project, onClose, onOpenAI }) {
  if (!project) return null;

  const screenshots = project.media?.screenshots || [];
  const isFeatured = !!project.featured;
  const count = screenshots.length;

  const [rotationSpeed, setRotationSpeed] = useState(0.5); // speed factor (0 to 1.5)
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState(null); // Lightbox index

  const stageRef = useRef(null);
  const angleRef = useRef(0);
  const animRef = useRef(null);
  const sliderRef = useRef(null);

  // High-performance GPU-accelerated rotation driven strictly via rAF without React state re-renders
  useEffect(() => {
    if (!isAutoRotating || count <= 1 || rotationSpeed === 0) return;

    let lastTime = performance.now();
    const animate = (now) => {
      const delta = (now - lastTime) / 1000;
      lastTime = now;

      // Calculate new angle smoothly (forward order 1 -> 2 -> 3 -> ... -> n)
      const nextAngle = (angleRef.current - rotationSpeed * 25 * delta + 360) % 360;
      angleRef.current = nextAngle;

      if (stageRef.current) {
        stageRef.current.style.setProperty('--rot', `${nextAngle}deg`);
      }
      if (sliderRef.current) {
        sliderRef.current.value = Math.round(nextAngle);
      }

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [isAutoRotating, count, rotationSpeed]);

  // Lightbox keyboard navigation
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) => (prev - 1 + count) % count);
      } else if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev + 1) % count);
      } else if (e.key === 'Escape') {
        setLightboxIndex(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, count]);

  // 3D Circle Radius
  const radius = Math.min(440, Math.max(260, count * 40));

  const handlePrevImage = (e) => {
    e?.stopPropagation();
    setLightboxIndex((prev) => (prev - 1 + count) % count);
  };

  const handleNextImage = (e) => {
    e?.stopPropagation();
    setLightboxIndex((prev) => (prev + 1) % count);
  };

  const handleManualAngleChange = (e) => {
    setIsAutoRotating(false);
    const newAngle = parseFloat(e.target.value);
    angleRef.current = newAngle;
    if (stageRef.current) {
      stageRef.current.style.setProperty('--rot', `${newAngle}deg`);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 dark:bg-black/85 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >

        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-white/5 bg-slate-100/90 dark:bg-slate-950/80">
          <div>
            <h2 className="font-display font-bold text-xl text-slate-900 dark:text-white">
              {project.title}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">{project.category} — {project.period}</p>
          </div>
          <button onClick={onClose} className="btn-icon">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body / 3D Orbit Display */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">

          {count > 0 ? (
            <div className="space-y-6">

              {/* 3D Orbit Stage — Centered & Larger */}
              <div
                className="relative mx-auto overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-950/90 border border-slate-200 dark:border-white/5 flex items-center justify-center select-none"
                style={{
                  perspective: '1200px',
                  width: '100%',
                  height: '520px',
                }}
              >
                <div
                  ref={stageRef}
                  className="relative w-full h-full flex items-center justify-center"
                  style={{
                    transformStyle: 'preserve-3d',
                    transform: `rotateY(var(--rot, 0deg))`,
                    willChange: 'transform',
                  }}
                  onMouseEnter={() => setIsAutoRotating(false)}
                  onMouseLeave={() => setIsAutoRotating(true)}
                >
                  {screenshots.map((imgUrl, index) => {
                    const angleDeg = (index / count) * 360;

                    return (
                      <div
                        key={index}
                        className="absolute top-1/2 left-1/2 cursor-pointer group"
                        onClick={() => setLightboxIndex(index)}
                        style={{
                          transform: `translate(-50%, -50%) rotateY(${angleDeg}deg) translateZ(${radius}px) rotateY(calc(-${angleDeg}deg - var(--rot, 0deg)))`,
                          transformStyle: 'preserve-3d',
                          willChange: 'transform',
                        }}
                        title={`Capture ${index + 1} / ${count} — Cliquer pour agrandir`}
                      >
                        {/* Larger container preserving image aspect ratio without deformation */}
                        <div className="relative max-w-[320px] max-h-[270px] rounded-xl overflow-hidden border border-white/15 bg-slate-950/95 shadow-2xl group-hover:border-cyan-400/80 group-hover:shadow-cyan-500/20 transition-all duration-300 flex items-center justify-center p-1.5">
                          <img
                            src={imgUrl}
                            alt={`${project.title} — capture ${index + 1}`}
                            className="max-w-full max-h-[250px] w-auto h-auto object-contain rounded-lg"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[1px]">
                            <Maximize2 className="w-7 h-7 text-white drop-shadow-md" />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Controls bar: Rotation Angle & Speed Control */}
              <div className="glass-panel p-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
                
                {/* Manual Angle Slider */}
                <div className="flex-1 flex items-center gap-3 w-full">
                  <span className="text-slate-400 font-medium text-[11px] whitespace-nowrap">
                    Angle :
                  </span>
                  <input
                    ref={sliderRef}
                    type="range"
                    min="0"
                    max="360"
                    defaultValue={0}
                    onChange={handleManualAngleChange}
                    className="flex-1 accent-cyan-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                  />
                </div>

                {/* Speed Slider Control */}
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <span className="text-slate-400 font-medium text-[11px] whitespace-nowrap">
                    Vitesse :
                  </span>
                  <input
                    type="range"
                    min="0"
                    max="1.5"
                    step="0.1"
                    value={rotationSpeed}
                    onChange={(e) => setRotationSpeed(parseFloat(e.target.value))}
                    className="w-24 accent-cyan-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                  />
                  <button
                    onClick={() => setIsAutoRotating(!isAutoRotating)}
                    className={`btn-secondary py-1 px-3 text-[11px] flex items-center gap-1.5 ${
                      isAutoRotating ? 'text-cyan-400 border-cyan-500/30' : 'text-slate-400'
                    }`}
                  >
                    {isAutoRotating ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                    {isAutoRotating ? 'Pause' : 'Auto'}
                  </button>
                </div>

              </div>

            </div>
          ) : (
            <div className="text-center text-slate-500 text-sm py-12">
              Aucune capture d'écran disponible pour ce projet.
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-white/5 flex items-center justify-between gap-3 bg-slate-950/80">
          {isFeatured && (
            <button
              onClick={() => { onClose(); onOpenAI(project); }}
              className="btn-primary py-2 px-4 text-xs"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Assistant IA
            </button>
          )}

          {!!(project.links?.github && project.links.github.trim()) && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary py-2 px-4 text-xs ml-auto"
            >
              <GithubIcon className="w-3.5 h-3.5 text-slate-400" />
              Code
            </a>
          )}
        </div>

      </div>

      {/* Lightbox / Zoom Modal with Scrollable Previous & Next Navigation */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Close button */}
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-6 right-6 btn-icon bg-slate-900/90 text-white hover:bg-slate-800 z-10"
            title="Fermer (Échap)"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Left Arrow Button (<) */}
          <button
            onClick={handlePrevImage}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-slate-900/80 hover:bg-cyan-500 hover:text-slate-950 text-white border border-white/10 flex items-center justify-center shadow-2xl transition-all cursor-pointer z-10"
            title="Image précédente (Flèche Gauche)"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Main Zoomed Image Container */}
          <div
            className="relative max-w-5xl max-h-[85vh] w-full flex items-center justify-center p-2"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={screenshots[lightboxIndex]}
              alt={`${project.title} — zoom ${lightboxIndex + 1}`}
              className="max-h-[82vh] max-w-full w-auto h-auto object-contain rounded-xl shadow-2xl border border-white/10"
            />
          </div>

          {/* Right Arrow Button (>) */}
          <button
            onClick={handleNextImage}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-slate-900/80 hover:bg-cyan-500 hover:text-slate-950 text-white border border-white/10 flex items-center justify-center shadow-2xl transition-all cursor-pointer z-10"
            title="Image suivante (Flèche Droite)"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Counter Badge Bottom */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-white/10 text-xs font-mono text-cyan-400 font-semibold shadow-xl">
            {lightboxIndex + 1} / {count}
          </div>
        </div>
      )}

    </div>
  );
}
