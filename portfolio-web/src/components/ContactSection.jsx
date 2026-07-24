import React, { useState } from 'react';
import { Mail, Phone, Send, Download, CheckCircle2, ArrowUpRight } from 'lucide-react';

const LinkedinIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);
import GithubIcon from './GithubIcon';

export default function ContactSection({ profile, onDownloadCV }) {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    setStatus('sending');
    
    // Open mailto link pre-filled with user's input
    const mailtoSubject = encodeURIComponent(formData.subject || `Message de ${formData.name}`);
    const mailtoBody = encodeURIComponent(`De: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
    
    setTimeout(() => {
      setStatus('sent');
      window.location.href = `mailto:${profile.contact?.email}?subject=${mailtoSubject}&body=${mailtoBody}`;
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 3000);
    }, 500);
  };

  return (
    <section id="contact" className="py-24 px-6 max-w-6xl mx-auto space-y-12">
      
      {/* Section Header */}
      <div>
        <h2 className="text-display-lg text-slate-900 dark:text-white">Contact</h2>
      </div>

      {/* Two Standalone Glass Cards Side by Side */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Card: Direct Links & CV */}
        <div className="lg:col-span-5 glass-panel p-6 sm:p-8 glow-border flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300 font-display tracking-widest uppercase border-b border-slate-200 dark:border-white/5 pb-4">
              Coordonnées
            </h3>

            <div className="space-y-4">
              <div className="space-y-1">
                <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider pl-1">Email</p>
                <a
                  href={`mailto:${profile.contact?.email}`}
                  className="flex items-center justify-between p-4 rounded-xl bg-slate-100/70 dark:bg-white/[0.03] border border-slate-200 dark:border-white/5 hover:border-cyan-500/30 hover:bg-slate-200/60 dark:hover:bg-white/[0.06] transition-all group"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <Mail className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0" />
                    <span className="text-sm font-medium text-slate-800 dark:text-slate-200 truncate">{profile.contact?.email}</span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors shrink-0" />
                </a>
              </div>

              <div className="space-y-1">
                <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider pl-1">Téléphone & WhatsApp</p>
                <a
                  href={`tel:${profile.contact?.phone?.replace(/\s+/g, '')}`}
                  className="flex items-center justify-between p-4 rounded-xl bg-slate-100/70 dark:bg-white/[0.03] border border-slate-200 dark:border-white/5 hover:border-cyan-500/30 hover:bg-slate-200/60 dark:hover:bg-white/[0.06] transition-all group"
                >
                  <div className="flex items-center gap-3.5">
                    <Phone className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0" />
                    <span className="text-sm font-medium text-slate-800 dark:text-slate-200">{profile.contact?.phone}</span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors shrink-0" />
                </a>
              </div>

              {profile.contact?.github && (
                <div className="space-y-1">
                  <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider pl-1">GitHub</p>
                  <a
                    href={profile.contact.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 rounded-xl bg-slate-100/70 dark:bg-white/[0.03] border border-slate-200 dark:border-white/5 hover:border-cyan-500/30 hover:bg-slate-200/60 dark:hover:bg-white/[0.06] transition-all group"
                  >
                    <div className="flex items-center gap-3.5">
                      <GithubIcon className="w-4 h-4 text-slate-700 dark:text-slate-300 shrink-0" />
                      <span className="text-sm font-medium text-slate-800 dark:text-slate-200">github.com/newplayer500p</span>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors shrink-0" />
                  </a>
                </div>
              )}

              {profile.contact?.linkedin && (
                <div className="space-y-1">
                  <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider pl-1">LinkedIn</p>
                  <a
                    href={profile.contact.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 rounded-xl bg-slate-100/70 dark:bg-white/[0.03] border border-slate-200 dark:border-white/5 hover:border-cyan-500/30 hover:bg-slate-200/60 dark:hover:bg-white/[0.06] transition-all group"
                  >
                    <div className="flex items-center gap-3.5">
                      <LinkedinIcon className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                      <span className="text-sm font-medium text-slate-800 dark:text-slate-200">Haja Mirado Rasolofoson</span>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors shrink-0" />
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Action CV */}
          <div className="pt-2">
            <button
              onClick={onDownloadCV}
              className="w-full flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-xl border border-slate-300 dark:border-slate-700/50 bg-slate-200/80 dark:bg-slate-800/60 text-slate-800 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white hover:bg-slate-300 dark:hover:bg-slate-800 text-xs font-semibold transition-all"
            >
              <Download className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              <span>Télécharger mon CV</span>
            </button>
          </div>
        </div>

        {/* Right Card: Form */}
        <div className="lg:col-span-7 glass-panel p-6 sm:p-8 glow-border flex flex-col justify-between">
          <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300 font-display tracking-widest uppercase border-b border-slate-200 dark:border-white/5 pb-4 mb-6">
            Envoyer un message
          </h3>

          <form onSubmit={handleSubmit} className="flex-1 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Nom</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Votre nom"
                    className="w-full px-4 py-3 rounded-xl bg-[var(--input-bg)] border border-[var(--input-border)] text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:border-cyan-500/60 transition-all text-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="votre.email@exemple.com"
                    className="w-full px-4 py-3 rounded-xl bg-[var(--input-bg)] border border-[var(--input-border)] text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:border-cyan-500/60 transition-all text-sm"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Sujet</label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Objet de votre message"
                  className="w-full px-4 py-3 rounded-xl bg-[var(--input-bg)] border border-[var(--input-border)] text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:border-cyan-500/60 transition-all text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Message</label>
                <textarea
                  rows={5}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Décrivez votre projet ou votre demande..."
                  className="w-full px-4 py-3 rounded-xl bg-[var(--input-bg)] border border-[var(--input-border)] text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:border-cyan-500/60 transition-all text-sm resize-none"
                ></textarea>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full btn-primary py-3.5 shadow-lg shadow-cyan-500/20 group text-xs tracking-wide"
              >
                {status === 'sending' ? (
                  <span>Ouverture de votre messagerie...</span>
                ) : status === 'sent' ? (
                  <span className="flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-4 h-4" /> Application e-mail ouverte !
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <Send className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" /> Envoyer le message
                  </span>
                )}
              </button>
            </div>
          </form>
        </div>

      </div>

    </section>
  );
}
