import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
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
import AppLoader from './components/AppLoader';
import { MotionSection, StaggerContainer, StaggerItem, springBouncy } from './components/Motion';
import { Sparkles } from 'lucide-react';
import { useLang } from './i18n/LanguageContext';
import { getLocalizedProfile, getLocalizedProjects } from './i18n/dataTranslations';

export default function App() {
  const [data, setData] = useState(null);
  const [isLoaderAnimFinished, setIsLoaderAnimFinished] = useState(false);
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'flagship' | 'learning'
  const [detailProject, setDetailProject] = useState(null);
  const [aiTargetProject, setAiTargetProject] = useState(null);
  const [isAIOpen, setIsAIOpen] = useState(false);
  const { lang, t } = useLang();

  // Appliquer le thème dès l'initialisation synchrone pour éviter le flash de thème dans le Loader
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'light') {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
    }

    fetchPortfolioData().then((res) => setData(res));
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

  // Le loader reste affiché TANT QUE les données ne sont pas chargées OU que l'animation n'est pas terminée
  const showLoader = !data || !isLoaderAnimFinished;

  return (
    <>
      <AnimatePresence>
        {showLoader && (
          <AppLoader onFinish={() => setIsLoaderAnimFinished(true)} />
        )}
      </AnimatePresence>

      {data && (
        <div className="min-h-screen bg-[var(--bg-page)] text-[var(--text-primary)] font-body relative selection:bg-cyan-500 selection:text-slate-950 transition-colors duration-300">
          
          {/* Top Header */}
          <Header
            profile={getLocalizedProfile(data.profile, lang)}
            onOpenGeneralAI={handleOpenGeneralAI}
          />

          {/* Main Hero Section */}
          <HeroBigText
            profile={getLocalizedProfile(data.profile, lang)}
            onOpenContact={handleScrollToContact}
            onDownloadCV={handleDownloadCV}
            isReady={isLoaderAnimFinished}
          />

          {/* About Section */}
          <MotionSection delay={100}>
            <AboutSection profile={getLocalizedProfile(data.profile, lang)} />
          </MotionSection>

          {/* Projects Section */}
          <section id="realisations" className="py-16 sm:py-24 px-4 sm:px-6 max-w-6xl mx-auto space-y-8 sm:space-y-12">

            {/* Section Title & Filter */}
            <MotionSection delay={0}>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6">
                <h2 className="text-display-lg text-slate-900 dark:text-white">{t('projects_section_title')}</h2>

                <div className="inline-flex items-center gap-1 p-1 rounded-xl bg-[#f3ebe1] dark:bg-white/5 border border-[#e5dacd] dark:border-white/5 overflow-x-auto max-w-full self-start md:self-end">
                  {[
                    { key: 'all', label: t('projects_filter_all') },
                    { key: 'flagship', label: t('projects_filter_flagship') },
                    { key: 'learning', label: t('projects_filter_learning') },
                  ].map((tab) => (
                    <button
                      key={tab.key}
                      onClick={() => setActiveTab(tab.key)}
                      className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                        activeTab === tab.key
                          ? 'bg-amber-600 text-white dark:bg-white dark:text-slate-950 shadow-sm'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>
            </MotionSection>

            {/* Projects Grid with Stagger Animation */}
            <StaggerContainer key={activeTab} className="grid grid-cols-1 lg:grid-cols-2 gap-6" staggerDelay={0.08}>
              {getLocalizedProjects(data.projects, lang)
                .filter((p) => {
                  if (activeTab === 'flagship') return p.tier === 'flagship';
                  if (activeTab === 'learning') return p.tier === 'learning';
                  return true;
                })
                .map((project) => (
                  <StaggerItem key={project.id}>
                    <ProjectCard
                      project={project}
                      onOpenDetails={(p) => setDetailProject(p)}
                      onOpenAI={(p) => handleOpenProjectAI(p)}
                    />
                  </StaggerItem>
                ))}
            </StaggerContainer>

          </section>

          {/* Tech Metrics & Visual Architecture Graphic Section */}
          <MotionSection delay={100}>
            <TechMetricsVisual profile={getLocalizedProfile(data.profile, lang)} />
          </MotionSection>

          {/* Contact Form & CV Download Section */}
          <MotionSection delay={100}>
            <ContactSection
              profile={getLocalizedProfile(data.profile, lang)}
              onDownloadCV={handleDownloadCV}
            />
          </MotionSection>

          {/* Footer */}
          <Footer
            profile={getLocalizedProfile(data.profile, lang)}
            onOpenGeneralAI={handleOpenGeneralAI}
            onDownloadCV={handleDownloadCV}
          />

          {/* Floating AI Trigger with Framer Motion spring physics & hover/tap */}
          <motion.button
            onClick={handleOpenGeneralAI}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={springBouncy}
            className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-amber-600 dark:bg-cyan-500 hover:bg-amber-500 dark:hover:bg-cyan-400 text-white dark:text-slate-950 flex items-center justify-center shadow-2xl shadow-amber-600/20 dark:shadow-cyan-500/40 cursor-pointer"
            title="Assistant IA"
          >
            <Sparkles className="w-5 h-5" />
          </motion.button>

          {/* AI Chatbot Modal with AnimatePresence */}
          <AnimatePresence>
            {isAIOpen && (
              <AIChatModal
                targetProject={aiTargetProject}
                profile={getLocalizedProfile(data.profile, lang)}
                projects={getLocalizedProjects(data.projects, lang)}
                onClose={() => setIsAIOpen(false)}
                onOpenProjectDetail={(p) => {
                  setDetailProject(p);
                }}
              />
            )}
          </AnimatePresence>

          {/* Detail Modal with AnimatePresence */}
          <AnimatePresence>
            {detailProject && (
              <ProjectDetailModal
                project={detailProject}
                onClose={() => setDetailProject(null)}
                onOpenAI={(p) => handleOpenProjectAI(p)}
              />
            )}
          </AnimatePresence>

        </div>
      )}
    </>
  );
}


