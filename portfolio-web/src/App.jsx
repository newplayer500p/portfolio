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
import RevealOnScroll from './components/RevealOnScroll';
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
    const cvUrl = data?.profile?.cv_url || 'https://res.cloudinary.com/sxzy2als/raw/upload/v1785078975/CV_q7gagd.docx';
    const a = document.createElement('a');
    a.href = cvUrl;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.download = 'CV_RASOLOFOSON_Haja_Mirado.docx';
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
        profile={profile}
        onOpenGeneralAI={handleOpenGeneralAI}
      />

      {/* Main Hero Section */}
      <RevealOnScroll delay={0}>
        <HeroBigText
          profile={profile}
          onOpenContact={handleScrollToContact}
          onDownloadCV={handleDownloadCV}
        />
      </RevealOnScroll>

      {/* About Section */}
      <RevealOnScroll delay={100}>
        <AboutSection profile={profile} />
      </RevealOnScroll>

      {/* Projects Section */}
      <section id="realisations" className="py-16 sm:py-24 px-4 sm:px-6 max-w-6xl mx-auto space-y-8 sm:space-y-12">

        {/* Section Title & Filter */}
        <RevealOnScroll delay={0}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6">
            <h2 className="text-display-lg text-slate-900 dark:text-white">Mes réalisations</h2>

            <div className="inline-flex items-center gap-1 p-1 rounded-xl bg-[#f3ebe1] dark:bg-white/5 border border-[#e5dacd] dark:border-white/5 overflow-x-auto max-w-full self-start md:self-end">
              {[
                { key: 'all', label: 'Tous' },
                { key: 'flagship', label: 'Projets phares' },
                { key: 'learning', label: 'Mini-projets' },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                    activeTab === tab.key
                      ? 'bg-[#7c5c44] text-[#fdf8f4] dark:bg-white dark:text-slate-950 shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </RevealOnScroll>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredProjects.map((project, idx) => (
            <RevealOnScroll key={project.id} delay={(idx % 2) * 150}>
              <ProjectCard
                project={project}
                onOpenDetails={(p) => setDetailProject(p)}
                onOpenAI={(p) => handleOpenProjectAI(p)}
              />
            </RevealOnScroll>
          ))}
        </div>

      </section>

      {/* Tech Metrics & Visual Architecture Graphic Section */}
      <RevealOnScroll delay={100}>
        <TechMetricsVisual profile={profile} />
      </RevealOnScroll>

      {/* Contact Form & CV Download Section */}
      <RevealOnScroll delay={100}>
        <ContactSection
          profile={profile}
          onDownloadCV={handleDownloadCV}
        />
      </RevealOnScroll>

      {/* Footer */}
      <Footer
        profile={profile}
        onOpenGeneralAI={handleOpenGeneralAI}
        onDownloadCV={handleDownloadCV}
      />

      {/* Floating AI Trigger */}
      <button
        onClick={handleOpenGeneralAI}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-amber-900 dark:bg-cyan-500 hover:bg-amber-800 dark:hover:bg-cyan-400 text-amber-50 dark:text-slate-950 flex items-center justify-center shadow-2xl shadow-amber-900/20 dark:shadow-cyan-500/40 hover:scale-105 transition-all cursor-pointer"
        title="Assistant IA"
      >
        <Sparkles className="w-5 h-5" />
      </button>

      {/* AI Chatbot Modal */}
      {isAIOpen && (
        <AIChatModal
          targetProject={aiTargetProject}
          profile={profile}
          projects={projects}
          onClose={() => setIsAIOpen(false)}
          onOpenProjectDetail={(p) => {
            setDetailProject(p);
          }}
        />
      )}

      {/* Detail Modal */}
      {detailProject && (
        <ProjectDetailModal
          project={detailProject}
          onClose={() => setDetailProject(null)}
          onOpenAI={(p) => handleOpenProjectAI(p)}
        />
      )}

    </div>
  );
}
