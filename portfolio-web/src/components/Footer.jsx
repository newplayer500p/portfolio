import React from 'react';
import GithubIcon from './GithubIcon';

const LinkedinIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

export default function Footer({ profile }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800/60 bg-slate-50 dark:bg-[#050609] py-8 px-6 transition-colors duration-300">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-5">
        
        {/* Left — Copyright */}
        <p className="text-xs text-slate-500 dark:text-slate-500 text-center sm:text-left">
          © {currentYear} {profile.name}. Tous droits réservés.
        </p>

        {/* Center — Social Icons */}
        <div className="flex items-center gap-3">
          {profile.contact?.github && (
            <a
              href={profile.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
              title="GitHub"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
          )}
          {profile.contact?.linkedin && (
            <a
              href={profile.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              title="LinkedIn"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
          )}
        </div>

        {/* Right — Quick nav */}
        <nav className="flex items-center gap-5 text-xs text-slate-500">
          <a href="#apropos" className="hover:text-slate-900 dark:hover:text-white transition-colors">À propos</a>
          <a href="#realisations" className="hover:text-slate-900 dark:hover:text-white transition-colors">Projets</a>
          <a href="#competences" className="hover:text-slate-900 dark:hover:text-white transition-colors">Compétences</a>
          <a href="#contact" className="hover:text-slate-900 dark:hover:text-white transition-colors">Contact</a>
        </nav>

      </div>
    </footer>
  );
}
