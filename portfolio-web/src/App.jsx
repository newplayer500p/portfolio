import React, { useState, useEffect } from 'react';
import { fetchPortfolioData } from './data/portfolioData';
import Header from './components/Header';
import HeroBigText from './components/HeroBigText';
import ProjectCard from './components/ProjectCard';
import ProjectDetailModal from './components/ProjectDetailModal';
import TechMetricsVisual from './components/TechMetricsVisual';
import ContactSection from './components/ContactSection';
import AIChatModal from './components/AIChatModal';
import Footer from './components/Footer';
import { Layers, Sparkles, X, Maximize2, ShieldCheck, Code } from 'lucide-react';

export default function App() {
  const [data, setData] = useState(null);
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'flagship' | 'learning'
  const [detailProject, setDetailProject] = useState(null);
  const [aiTargetProject, setAiTargetProject] = useState(null);
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState(null);

  useEffect(() => {
    fetchPortfolioData().then((res) => setData(res));
  }, []);

  const handleDownloadCV = () => {
    // Create an interactive print/save CV preview trigger
    const cvText = `
========================================================================
CURRICULUM VITAE — RASOLOFOSON HAJA MIRADO
Développeur Full-Stack / L3 Génie Logiciel (ESPA Antsirabe, Madagascar)
Email: hajamirado10@gmail.com | Tel: +261 33 78 838 25
GitHub: https://github.com/newplayer500p
========================================================================

COMPÉTENCES CLÉS:
• Mobile & Web: Flutter (Clean Architecture, Web & Mobile), React 19, Dart, TypeScript.
• Backend & Microservices: NestJS, REST, WebSockets (Socket.IO), Redis, Python (FastAPI).
• Bases de Données & GIS: PostgreSQL, PostGIS (requêtes géospatiales), Prisma ORM.
• IA & LLM: Intégration Google Gemini API, Groq (LLaMA 3.3 70B), WhisperX, Demucs CUDA.
• Conception: Modélisation UML (Cas d'utilisation, Séquence, Classe, Activité), Merise.

PROJETS MAJEURS:
1. SoaLink (PFE Licence 3 - 2026)
   - Plateforme de santé numérique avec triage médical IA en 2 passes.
   - Recherche géospatiale PostGIS d'établissements, messagerie temps réel.
   - Schéma Prisma 26 tables, chiffrement AES-256-CBC, Redis, Supabase S3.

2. GeoTrano (Portes Ouvertes ESPA - 2026)
   - Plateforme immobilière avec système anti-fraude GPS (token 30 min, validation ±500m).
   - React 19, NestJS, PostGIS, Turborepo monorepo, notifications temps réel.

3. Auto-Soutitrage Vidéo & Audio (2025-2026)
   - Application IA Python FastAPI / Flutter avec WhisperX et Demucs accélération CUDA.
    `;

    const blob = new Blob([cvText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'CV_RASOLOFOSON_Haja_Mirado.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleOpenGeneralAI = () => {
    setAiTargetProject(null);
    setIsAIOpen(true);
  };

  const handleOpenProjectAI = (project) => {
    setAiTargetProject(project);
    setIsAIOpen(true);
  };

  const handleScrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  if (!data) {
    return (
      <div className="min-h-screen bg-[#07080c] flex items-center justify-center text-cyan-400 font-display font-bold">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin"></div>
          <span>Chargement du Portfolio 3D Mirado...</span>
        </div>
      </div>
    );
  }

  const { profile, projects } = data;

  const filteredProjects = projects.filter((p) => {
    if (activeTab === 'flagship') return p.tier === 'flagship';
    if (activeTab === 'learning') return p.tier === 'learning';
    return true;
  });

  return (
    <div className="min-h-screen bg-[#07080c] text-slate-100 font-body relative selection:bg-cyan-500 selection:text-slate-950">
      
      {/* Top Header */}
      <Header
        onOpenGeneralAI={handleOpenGeneralAI}
      />

      {/* Main Hero Section */}
      <HeroBigText
        profile={profile}
        onOpenContact={handleScrollToContact}
        onDownloadCV={handleDownloadCV}
      />

      {/* Projects Section */}
      <section id="realisations" className="py-24 px-6 max-w-6xl mx-auto space-y-12">
        
        {/* Section Title & Filter Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-800/80 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold mb-4">
              <Layers className="w-3.5 h-3.5" />
              <span>Projets & Réalisations</span>
            </div>
            <h2 className="text-display-xl text-white font-extrabold tracking-tight">
              PROJETS PHARES & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">EXPOSITIONS 3D</span>.
            </h2>
            <p className="text-slate-400 text-base max-w-2xl mt-2">
              Survolez et tournez les capturants en cercle 3D. Cliquez pour consulter l'architecture et interroger l'assistant IA.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 p-1.5 rounded-xl bg-slate-900 border border-slate-800">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Tous les Projets ({projects.length})
            </button>

            <button
              onClick={() => setActiveTab('flagship')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'flagship'
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              PFE & Projets Phares
            </button>

            <button
              onClick={() => setActiveTab('learning')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'learning'
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Mini-Projets
            </button>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpenDetails={(p) => setDetailProject(p)}
              onOpenAI={(p) => handleOpenProjectAI(p)}
              onSelectImage={(imgUrl) => setLightboxImage(imgUrl)}
            />
          ))}
        </div>

      </section>

      {/* Tech Metrics & Visual Architecture Graphic Section */}
      <TechMetricsVisual profile={profile} />

      {/* Contact Form & CV Download Section */}
      <ContactSection
        profile={profile}
        onDownloadCV={handleDownloadCV}
      />

      {/* Footer */}
      <Footer
        profile={profile}
        onOpenGeneralAI={handleOpenGeneralAI}
        onDownloadCV={handleDownloadCV}
      />

      {/* Persistent Floating AI Chatbot Launcher Trigger */}
      <button
        onClick={handleOpenGeneralAI}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-3 px-4 py-3 rounded-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-display font-extrabold text-sm shadow-2xl shadow-cyan-500/50 hover:scale-105 transition-all cursor-pointer"
        title="Ouvrir l'Assistant Virtuel de Mirado"
      >
        <Sparkles className="w-5 h-5 fill-slate-950 animate-bounce" />
        <span className="hidden sm:inline">Discuter avec Mirado IA</span>
      </button>

      {/* Architecture Detail Modal */}
      {detailProject && (
        <ProjectDetailModal
          project={detailProject}
          onClose={() => setDetailProject(null)}
          onOpenAI={(p) => handleOpenProjectAI(p)}
        />
      )}

      {/* Interactive AI Chatbot Modal */}
      {isAIOpen && (
        <AIChatModal
          targetProject={aiTargetProject}
          profile={profile}
          onClose={() => setIsAIOpen(false)}
        />
      )}

      {/* Screenshot Lightbox Modal */}
      {lightboxImage && (
        <div
          onClick={() => setLightboxImage(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md cursor-zoom-out"
        >
          <div className="relative max-w-5xl w-full max-h-[90vh] flex items-center justify-center">
            <img
              src={lightboxImage}
              alt="Capture Agrandie"
              className="max-w-full max-h-[85vh] object-contain rounded-xl border border-slate-700 shadow-2xl"
            />
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute top-4 right-4 btn-icon bg-slate-900 text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
