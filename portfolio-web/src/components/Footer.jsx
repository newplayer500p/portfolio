import React from 'react';
import { Download, Mail, Phone, Heart, Sparkles } from 'lucide-react';
import GithubIcon from './GithubIcon';

export default function Footer({ profile, onOpenGeneralAI, onDownloadCV }) {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 py-12 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand & Rights */}
        <div className="space-y-1 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <span className="font-display font-bold text-white text-base">
              {profile.name}
            </span>
            <span className="text-xs text-slate-500">• {profile.period}</span>
          </div>
          <p className="text-xs text-slate-400">
            {profile.title} — {profile.institution} (Madagascar)
          </p>
        </div>

        {/* Quick Footer Links */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-slate-400">
          <button onClick={onDownloadCV} className="hover:text-cyan-400 transition-colors flex items-center gap-1 cursor-pointer background-none border-none">
            <Download className="w-3.5 h-3.5 text-cyan-400" />
            Télécharger CV
          </button>
          <span>•</span>
          <button onClick={onOpenGeneralAI} className="hover:text-cyan-400 transition-colors flex items-center gap-1 cursor-pointer background-none border-none text-cyan-300">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            Assistant IA
          </button>
          <span>•</span>
          <a href={profile.contact?.github} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
            <GithubIcon className="w-3.5 h-3.5" />
            GitHub
          </a>
        </div>

        {/* Copyright Note */}
        <div className="text-xs text-slate-400 text-center md:text-right">
          Conçu & Développé avec rigueur d'ingénierie ESPA.
        </div>

      </div>
    </footer>
  );
}
