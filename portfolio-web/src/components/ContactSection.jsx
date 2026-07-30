import React, { useState } from 'react';
import { Mail, Phone, Send, Download, CheckCircle2, ArrowUpRight } from 'lucide-react';
import GithubIcon from './GithubIcon';
import { useLang } from '../i18n/LanguageContext';

const LinkedinIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

export default function ContactSection({ profile, onDownloadCV }) {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle');
  const { t } = useLang();

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
    <section id="contact" className="py-16 sm:py-24 px-4 sm:px-6 max-w-6xl mx-auto space-y-8 sm:space-y-12">
      
      {/* Section Header */}
      <div>
        <h2 className="text-display-lg text-slate-900 dark:text-white">{t('contact_section_title')}</h2>
      </div>

      {/* Two Standalone Glass Cards Side by Side */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
        
        {/* Left Card: Direct Links & CV */}
        <div className="lg:col-span-5 glass-panel p-5 sm:p-8 glow-border flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-slate-700 dark:text-slate-300 font-display tracking-widest uppercase border-b border-slate-200 dark:border-white/5 pb-4">
              {t('contact_coordinates_label')}
            </h3>

            <div className="space-y-3">
              <div className="space-y-1">
                <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider pl-1">{t('contact_email_label')}</p>
                <a
                  href={`mailto:${profile.contact?.email}`}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-[#faf6f0] dark:bg-white/[0.03] border border-[#eee7de] dark:border-white/5 hover:border-cyan-500/30 dark:hover:border-cyan-500/30 hover:bg-[#f7f1e9] dark:hover:bg-white/[0.06] transition-all group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Mail className="w-4 h-4 text-[#7c5c44] dark:text-cyan-400 shrink-0" />
                    <span className="text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200 truncate">{profile.contact?.email}</span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors shrink-0" />
                </a>
              </div>

              <div className="space-y-1">
                <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider pl-1">{t('contact_phone_label')}</p>
                <a
                  href={`tel:${profile.contact?.phone?.replace(/\s+/g, '')}`}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-[#faf6f0] dark:bg-white/[0.03] border border-[#eee7de] dark:border-white/5 hover:border-cyan-500/30 dark:hover:border-cyan-500/30 hover:bg-[#f7f1e9] dark:hover:bg-white/[0.06] transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-[#7c5c44] dark:text-cyan-400 shrink-0" />
                    <span className="text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200">{profile.contact?.phone}</span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors shrink-0" />
                </a>
              </div>

              {profile.contact?.github && (
                <div className="space-y-1">
                  <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider pl-1">{t('contact_github_label')}</p>
                  <a
                    href={profile.contact.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3.5 rounded-2xl bg-[#faf6f0] dark:bg-white/[0.03] border border-[#eee7de] dark:border-white/5 hover:border-cyan-500/30 dark:hover:border-cyan-500/30 hover:bg-[#f7f1e9] dark:hover:bg-white/[0.06] transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <GithubIcon className="w-4 h-4 text-[#7c5c44] dark:text-cyan-400 shrink-0" />
                      <span className="text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200">github.com/newplayer500p</span>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors shrink-0" />
                  </a>
                </div>
              )}

              {profile.contact?.linkedin && (
                <div className="space-y-1">
                  <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider pl-1">{t('contact_linkedin_label')}</p>
                  <a
                    href={profile.contact.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3.5 rounded-2xl bg-[#faf6f0] dark:bg-white/[0.03] border border-[#eee7de] dark:border-white/5 hover:border-cyan-500/30 dark:hover:border-cyan-500/30 hover:bg-[#f7f1e9] dark:hover:bg-white/[0.06] transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <LinkedinIcon className="w-4 h-4 text-[#7c5c44] dark:text-cyan-400 shrink-0" />
                      <span className="text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200">Haja Mirado Rasolofoson</span>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors shrink-0" />
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Action CV */}
          <div className="pt-2">
            <button
              onClick={onDownloadCV}
              className="w-full flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-xl border border-[#e8dfd5] dark:border-white/10 bg-[#faf6f0] dark:bg-white/[0.05] text-[#261e17] dark:text-slate-200 hover:bg-[#f5efe6] dark:hover:bg-white/10 text-xs font-semibold transition-all shadow-sm"
            >
              <Download className="w-4 h-4 text-[#7c5c44] dark:text-cyan-400" />
              <span>{t('contact_cv_btn')}</span>
            </button>
          </div>
        </div>

        {/* Right Card: Form */}
        <div className="lg:col-span-7 glass-panel p-6 sm:p-8 glow-border flex flex-col justify-between">
          <h3 className="text-xs font-bold text-slate-700 dark:text-slate-300 font-display tracking-widest uppercase border-b border-slate-200 dark:border-white/5 pb-4 mb-6">
            {t('contact_form_title')}
          </h3>

          <form onSubmit={handleSubmit} className="flex-1 flex flex-col justify-between space-y-5">
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">{t('contact_form_name')}</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={t('contact_form_name_placeholder')}
                    className="w-full px-4 py-3 rounded-xl bg-[#faf6f0] dark:bg-white/[0.04] border border-[#eee7de] dark:border-white/10 text-slate-900 dark:text-white placeholder-[#9e8c7c] dark:placeholder-slate-500 focus:outline-none focus:border-[#7c5c44]/60 dark:focus:border-cyan-400/60 focus:ring-1 focus:ring-[#7c5c44]/20 dark:focus:ring-cyan-500/30 transition-all text-xs sm:text-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">{t('contact_form_email')}</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder={t('contact_form_email_placeholder')}
                    className="w-full px-4 py-3 rounded-xl bg-[#faf6f0] dark:bg-white/[0.04] border border-[#eee7de] dark:border-white/10 text-slate-900 dark:text-white placeholder-[#9e8c7c] dark:placeholder-slate-500 focus:outline-none focus:border-[#7c5c44]/60 dark:focus:border-cyan-400/60 focus:ring-1 focus:ring-[#7c5c44]/20 dark:focus:ring-cyan-500/30 transition-all text-xs sm:text-sm"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">{t('contact_form_subject')}</label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder={t('contact_form_subject_placeholder')}
                  className="w-full px-4 py-3 rounded-xl bg-[#faf6f0] dark:bg-white/[0.04] border border-[#eee7de] dark:border-white/10 text-slate-900 dark:text-white placeholder-[#9e8c7c] dark:placeholder-slate-500 focus:outline-none focus:border-[#7c5c44]/60 dark:focus:border-cyan-400/60 focus:ring-1 focus:ring-[#7c5c44]/20 dark:focus:ring-cyan-500/30 transition-all text-xs sm:text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">{t('contact_form_message')}</label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder={t('contact_form_message_placeholder')}
                  className="w-full px-4 py-3 rounded-xl bg-[#faf6f0] dark:bg-white/[0.04] border border-[#eee7de] dark:border-white/10 text-slate-900 dark:text-white placeholder-[#9e8c7c] dark:placeholder-slate-500 focus:outline-none focus:border-[#7c5c44]/60 dark:focus:border-cyan-400/60 focus:ring-1 focus:ring-[#7c5c44]/20 dark:focus:ring-cyan-500/30 transition-all text-xs sm:text-sm resize-none"
                ></textarea>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm sm:text-base bg-[#7c5c44] hover:bg-[#5e4433] text-white dark:bg-cyan-400 dark:hover:bg-cyan-300 dark:text-slate-950 shadow-md transition-all cursor-pointer group"
              >
                {status === 'sending' ? (
                  <span>{t('contact_form_sending')}</span>
                ) : status === 'sent' ? (
                  <span className="flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-4.5 h-4.5" /> {t('contact_form_sent')}
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2 font-extrabold tracking-wide">
                    <Send className="w-4.5 h-4.5 group-hover:translate-x-0.5 transition-transform" /> {t('contact_form_submit')}
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
