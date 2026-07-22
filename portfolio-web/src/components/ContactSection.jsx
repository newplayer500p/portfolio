import React, { useState } from 'react';
import { Mail, Phone, Send, Download, CheckCircle2, MessageSquare, Sparkles } from 'lucide-react';
import GithubIcon from './GithubIcon';

export default function ContactSection({ profile, onDownloadCV }) {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle'); // 'idle' | 'sending' | 'sent'

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    setStatus('sending');
    setTimeout(() => {
      setStatus('sent');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 4000);
    }, 1000);
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-8 max-w-7xl mx-auto space-y-12">
      
      {/* Section Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-4">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Restons en Contact</span>
        </div>
        <h2 className="text-display-xl text-white font-extrabold tracking-tight">
          PRENDRE CONTACT & <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">DISCUTER D'UN PROJET</span>.
        </h2>
        <p className="text-slate-400 text-base max-w-2xl mt-2">
          {profile.role_and_status}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Contact Info Cards & CV Download Banner */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Direct Email Card */}
          <div className="glass-panel p-6 glow-border flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Email</span>
              <a href={`mailto:${profile.contact?.email}`} className="block font-display font-bold text-white hover:text-cyan-400 transition-colors text-base">
                {profile.contact?.email}
              </a>
            </div>
          </div>

          {/* Direct Phone Card */}
          <div className="glass-panel p-6 glow-border flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Téléphone / WhatsApp</span>
              <a href={`tel:${profile.contact?.phone?.replace(/\s+/g, '')}`} className="block font-display font-bold text-white hover:text-purple-400 transition-colors text-base">
                {profile.contact?.phone}
              </a>
            </div>
          </div>

          {/* GitHub Card */}
          {profile.contact?.github && (
            <div className="glass-panel p-6 glow-border flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-white shrink-0">
                <GithubIcon className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">GitHub Profil</span>
                <a href={profile.contact.github} target="_blank" rel="noopener noreferrer" className="block font-display font-bold text-cyan-400 hover:underline text-base">
                  github.com/newplayer500p
                </a>
              </div>
            </div>
          )}

          {/* Prominent CV Download Banner */}
          <div className="glass-panel p-6 border-cyan-500/30 bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950/40 space-y-4">
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Curriculum Vitae</span>
            </div>
            <h3 className="font-display font-bold text-white text-lg">
              Télécharger mon CV Complet
            </h3>
            <p className="text-xs text-slate-300">
              Découvrez le détail complet des compétences Full-Stack, projets académiques L3 ESPA et réalisations.
            </p>
            <button onClick={onDownloadCV} className="btn-primary w-full py-3">
              <Download className="w-4 h-4" />
              <span>Télécharger le CV (PDF)</span>
            </button>
          </div>

        </div>

        {/* Interactive Message Form */}
        <div className="lg:col-span-7 glass-panel p-6 sm:p-8 glow-border">
          <h3 className="font-display font-bold text-xl text-white mb-6 flex items-center gap-2">
            <Send className="w-5 h-5 text-emerald-400" />
            Envoyer un Message Direct
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Votre Nom</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ex: Jean Dupont"
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500 text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Votre Adresse Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="ex: jean@entreprise.com"
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500 text-sm"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Sujet du Message</label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="Ex: Opportunité Freelance / Projet Full-Stack"
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500 text-sm"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Message</label>
              <textarea
                rows={5}
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Décrivez votre projet ou votre demande..."
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500 text-sm resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={status === 'sending'}
              className="btn-primary w-full py-3.5 text-sm"
            >
              {status === 'sending' ? (
                <span>Envoi en cours...</span>
              ) : status === 'sent' ? (
                <span className="flex items-center gap-2 text-emerald-950 font-bold">
                  <CheckCircle2 className="w-5 h-5 text-emerald-950" /> Message envoyé avec succès !
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Send className="w-4 h-4" /> Envoyer le message
                </span>
              )}
            </button>
          </form>
        </div>

      </div>

    </section>
  );
}
