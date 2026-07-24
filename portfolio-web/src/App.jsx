import React, { useState, useEffect } from 'react';
import { fetchPortfolioData } from './data/portfolioData';
import Header from './components/Header';
import HeroBigText from './components/HeroBigText';
import AboutSection from './components/AboutSection';
import ProjectCard from './components/ProjectCard';
import ProjectDetailModal from './components/ProjectDetailModal';
import TechMetricsVisual from './components/TechMetricsVisual';
import ContactSection from './components/ContactSection';
import AIChatModal from './components/AIChatModal';
import Footer from './components/Footer';
import { Sparkles } from 'lucide-react';

export default function App() {
  const [data, setData] = useState(null);
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'flagship' | 'learning'
  const [detailProject, setDetailProject] = useState(null);
  const [aiTargetProject, setAiTargetProject] = useState(null);
  const [isAIOpen, setIsAIOpen] = useState(false);


  useEffect(() => {
    fetchPortfolioData().then((res) => setData(res));
    // Initialize theme: default to dark if not set
    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'light') {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
    }
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
      <div className="min-h-screen bg-[#07080c] flex items-center justify-center">
        <div className="w-6 h-6 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin"></div>
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
    <div className="min-h-screen bg-[var(--bg-page)] text-[var(--text-primary)] font-body relative selection:bg-cyan-500 selection:text-slate-950 transition-colors duration-300">
      
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

      {/* About Section */}
      <AboutSection profile={profile} />

      {/* Projects Section */}
      <section id="realisations" className="py-24 px-6 max-w-6xl mx-auto space-y-12">

        {/* Section Title & Filter */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <h2 className="text-display-lg text-slate-900 dark:text-white">Mes réalisations</h2>

          <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-200/60 dark:bg-white/5 border border-slate-300/50 dark:border-white/5">
            {[
              { key: 'all', label: 'Tous' },
              { key: 'flagship', label: 'Projets phares' },
              { key: 'learning', label: 'Mini-projets' },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === tab.key
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpenDetails={(p) => setDetailProject(p)}
              onOpenAI={(p) => handleOpenProjectAI(p)}
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

      {/* Floating AI Trigger */}
      <button
        onClick={handleOpenGeneralAI}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 flex items-center justify-center shadow-2xl shadow-cyan-500/40 hover:scale-105 transition-all cursor-pointer"
        title="Assistant IA"
      >
        <Sparkles className="w-5 h-5" />
      </button>

      {/* Detail Modal */}
      {detailProject && (
        <ProjectDetailModal
          project={detailProject}
          onClose={() => setDetailProject(null)}
          onOpenAI={(p) => handleOpenProjectAI(p)}
        />
      )}

      {/* AI Chatbot Modal */}
      {isAIOpen && (
        <AIChatModal
          targetProject={aiTargetProject}
          profile={profile}
          onClose={() => setIsAIOpen(false)}
        />
      )}

    </div>
  );
}
