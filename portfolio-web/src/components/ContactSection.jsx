import React, { useState } from 'react';
import { Mail, Phone, Send, Download, CheckCircle2, ArrowUpRight } from 'lucide-react';
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
    const mailtoBody = encodeURIComponent(`Nom: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
    
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
        <h2 className="text-display-lg text-white">Contact</h2>
      </div>

      {/* Unified Master Glass Card */}
      <div className="glass-panel p-8 sm:p-12 glow-border">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Direct Links & CV */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Links list */}
            <div className="space-y-3">
              <a
                href={`mailto:${profile.contact?.email}`}
                className="flex items-center justify-between p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:border-cyan-500/30 hover:bg-white/[0.06] transition-all group"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span className="text-sm font-medium text-slate-200 truncate">{profile.contact?.email}</span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors shrink-0" />
              </a>

              <a
                href={`tel:${profile.contact?.phone?.replace(/\s+/g, '')}`}
                className="flex items-center justify-between p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:border-cyan-500/30 hover:bg-white/[0.06] transition-all group"
              >
                <div className="flex items-center gap-3.5">
                  <Phone className="w-4 h-4 text-purple-400 shrink-0" />
                  <span className="text-sm font-medium text-slate-200">{profile.contact?.phone}</span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-purple-400 transition-colors shrink-0" />
              </a>

              {profile.contact?.github && (
                <a
                  href={profile.contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:border-cyan-500/30 hover:bg-white/[0.06] transition-all group"
                >
                  <div className="flex items-center gap-3.5">
                    <GithubIcon className="w-4 h-4 text-slate-300 shrink-0" />
                    <span className="text-sm font-medium text-slate-200">github.com/newplayer500p</span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors shrink-0" />
                </a>
              )}
            </div>

            {/* Action CV */}
            <div>
              <button
                onClick={onDownloadCV}
                className="w-full flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-xl border border-slate-700/50 bg-slate-800/60 text-slate-200 hover:text-white hover:bg-slate-800 hover:border-slate-600 text-xs font-semibold transition-all"
              >
                <Download className="w-4 h-4 text-cyan-400" />
                <span>Télécharger mon CV</span>
              </button>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-400">Nom</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Votre nom"
                    className="w-full px-4 py-3 rounded-xl bg-slate-950/60 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500/60 focus:bg-slate-950 transition-all text-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-400">Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="votre.email@exemple.com"
                    className="w-full px-4 py-3 rounded-xl bg-slate-950/60 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500/60 focus:bg-slate-950 transition-all text-sm"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-400">Sujet</label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Objet de votre message"
                  className="w-full px-4 py-3 rounded-xl bg-slate-950/60 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500/60 focus:bg-slate-950 transition-all text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-400">Message</label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Décrivez votre projet ou votre demande..."
                  className="w-full px-4 py-3 rounded-xl bg-slate-950/60 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500/60 focus:bg-slate-950 transition-all text-sm resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs tracking-wide shadow-lg shadow-cyan-500/15 hover:shadow-cyan-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {status === 'sending' ? (
                  <span>Ouverture de votre messagerie...</span>
                ) : status === 'sent' ? (
                  <span className="flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-4 h-4" /> Application e-mail ouverte !
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <Send className="w-4 h-4" /> Envoyer le message
                  </span>
                )}
              </button>
            </form>
          </div>

        </div>
      </div>

    </section>
  );
}
