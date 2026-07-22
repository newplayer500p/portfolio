import React, { useState, useEffect } from 'react';
import { Play, Pause, Maximize2, RotateCw, Image as ImageIcon, Video } from 'lucide-react';

export default function Project3DOrbit({ project, onSelectImage }) {
  const screenshots = project.media?.screenshots || [];
  const demoVideo = project.media?.demo_video;

  const [rotationAngle, setRotationAngle] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [activeSpotlight, setActiveSpotlight] = useState(0);

  // Auto-rotate 3D screenshot ring smoothly
  useEffect(() => {
    if (!isAutoRotating || screenshots.length <= 1) return;
    const interval = setInterval(() => {
      setRotationAngle((prev) => (prev + 0.6) % 360);
    }, 40);
    return () => clearInterval(interval);
  }, [isAutoRotating, screenshots.length]);

  const count = screenshots.length;
  const radius = Math.min(260, Math.max(160, count * 35));

  return (
    <div className="relative w-100 py-6 px-2 overflow-hidden rounded-2xl bg-slate-950/60 border border-slate-800/80">
      
      {/* Top Media Controls Banner */}
      <div className="flex items-center justify-between px-4 pb-3 border-b border-slate-800/60 text-xs text-slate-400 font-medium mb-4">
        <div className="flex items-center gap-2">
          {demoVideo ? (
            <span className="flex items-center gap-1 text-cyan-400 font-semibold">
              <Video className="w-3.5 h-3.5" /> Démo Vidéo en Centre
            </span>
          ) : (
            <span className="flex items-center gap-1 text-slate-300">
              <ImageIcon className="w-3.5 h-3.5" /> Aperçu Visuel
            </span>
          )}
          {count > 0 && (
            <span className="text-slate-500">
              • {count} Captures en Orbite 3D
            </span>
          )}
        </div>

        {count > 0 && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAutoRotating(!isAutoRotating)}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer border ${
                isAutoRotating
                  ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30'
                  : 'bg-slate-800 text-slate-400 border-slate-700'
              }`}
              title="Activer/Désactiver la rotation 3D"
            >
              <RotateCw className={`w-3 h-3 ${isAutoRotating ? 'animate-spin' : ''}`} />
              3D {isAutoRotating ? 'Auto' : 'Fixe'}
            </button>
          </div>
        )}
      </div>

      {/* 3D Orbit Stage */}
      <div className="orbit-container-3d min-h-[340px] sm:min-h-[400px]">
        
        {/* Center Media (Video or Main Active Image) */}
        <div className="orbit-center-media max-w-[280px] sm:max-w-[340px] w-full">
          {demoVideo ? (
            <div className="relative group rounded-xl overflow-hidden bg-black aspect-video border border-cyan-500/30">
              <video
                src={demoVideo}
                controls={isPlayingVideo}
                className="w-full h-full object-cover"
                poster={screenshots[0] || ''}
              />
              {!isPlayingVideo && (
                <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center group-hover:bg-slate-950/40 transition-all">
                  <button
                    onClick={() => setIsPlayingVideo(true)}
                    className="w-14 h-14 rounded-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 flex items-center justify-center shadow-lg shadow-cyan-500/40 transition-transform transform group-hover:scale-110 cursor-pointer"
                    title="Lancer la vidéo"
                  >
                    <Play className="w-6 h-6 fill-slate-950 ml-1" />
                  </button>
                </div>
              )}
            </div>
          ) : screenshots.length > 0 ? (
            <div
              onClick={() => onSelectImage(screenshots[activeSpotlight])}
              className="relative group rounded-xl overflow-hidden bg-slate-900 aspect-video border border-slate-700 cursor-pointer"
            >
              <img
                src={screenshots[activeSpotlight]}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-3">
                <span className="text-xs text-white font-medium">Agrandir l'image</span>
                <Maximize2 className="w-4 h-4 text-cyan-400" />
              </div>
            </div>
          ) : (
            <div className="p-8 text-center text-slate-500 text-sm glass-panel">
              Aucun média visuel enregistré.
            </div>
          )}
        </div>

        {/* Floating Screenshots Orbit Ring (CSS 3D Engine) */}
        {count > 0 && (
          <div
            className="orbit-stage-3d pointer-events-auto"
            style={{
              transform: `rotateX(10deg) rotateY(${rotationAngle}deg)`,
            }}
          >
            {screenshots.map((imgUrl, index) => {
              const angleDeg = (index / count) * 360;
              const angleRad = (angleDeg * Math.PI) / 180;
              
              // Calculate spatial distance from front facing camera view
              const relativeAngle = (angleDeg + rotationAngle) % 360;
              const normalizedAngle = (relativeAngle + 360) % 360;
              const isFront = normalizedAngle > 310 || normalizedAngle < 50;

              return (
                <div
                  key={index}
                  className="orbit-ring-item group"
                  onClick={() => {
                    setActiveSpotlight(index);
                    onSelectImage(imgUrl);
                  }}
                  style={{
                    transform: `translate(-50%, -50%) rotateY(${angleDeg}deg) translateZ(${radius}px) rotateY(${-angleDeg}deg)`,
                    opacity: isFront ? 1 : 0.65,
                  }}
                  title={`Capture ${index + 1} - Cliquer pour ouvrir`}
                >
                  <div className="w-20 h-14 sm:w-28 sm:h-20 rounded-lg overflow-hidden border border-slate-700/80 group-hover:border-cyan-400 bg-slate-900 shadow-2xl transition-all duration-300 transform group-hover:scale-110">
                    <img
                      src={imgUrl}
                      alt={`${project.title} screen ${index + 1}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* Manual Angle Slider & Indicator */}
      {count > 1 && (
        <div className="mt-4 px-4 flex items-center justify-between gap-4">
          <div className="flex-1 flex items-center gap-2">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              Rotation 3D :
            </span>
            <input
              type="range"
              min="0"
              max="360"
              value={rotationAngle}
              onChange={(e) => {
                setIsAutoRotating(false);
                setRotationAngle(parseFloat(e.target.value));
              }}
              className="w-full accent-cyan-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
            />
          </div>
          <span className="text-[11px] font-mono text-cyan-400 font-semibold min-w-[40px] text-right">
            {Math.round(rotationAngle)}°
          </span>
        </div>
      )}

    </div>
  );
}
