import React, { useState } from 'react';
import { X, Sparkles, Send, Bot, User, CornerDownLeft, RefreshCw } from 'lucide-react';

export default function AIChatModal({ targetProject, profile, onClose }) {
  const isProjectSpecific = !!targetProject;
  
  const initialGreeting = isProjectSpecific
    ? `Bonjour ! Je suis l'assistant dédié au projet **${targetProject.title}**. Posez-moi vos questions sur l'architecture, le code backend NestJS, Flutter, ou les algorithmes IA !`
    : `Bonjour ! Je suis l'Assistant Virtuel de **${profile.name}**. Je peux répondre à vos questions sur ses compétences Full-Stack, ses projets ESPA L3 et sa disponibilité.`;

  const suggestedQuestions = isProjectSpecific
    ? [
        `Comment fonctionne la recherche géospatiale PostGIS sur ${targetProject.title} ?`,
        `Peux-tu expliquer le plus grand défi technique rencontré ?`,
        `Quel a été le rôle de Mirado dans la conception ?`
      ]
    : [
        `Quelles sont les compétences clés de Mirado ?`,
        `Sur quel projet Mirado a-t-il travaillé de A à Z ?`,
        `Comment contacter Mirado pour une opportunité freelance ?`
      ];

  const [messages, setMessages] = useState([
    { id: 1, sender: 'bot', text: initialGreeting, time: 'À l\'instant' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (userText) => {
    const text = userText || input;
    if (!text.trim()) return;

    const newMsg = { id: Date.now(), sender: 'user', text, time: 'À l\'instant' };
    setMessages((prev) => [...prev, newMsg]);
    if (!userText) setInput('');
    setIsTyping(true);

    // Simulated Intelligent Response Engine (Ready to connect to real LLM backend endpoint!)
    setTimeout(() => {
      let botResponse = `Merci pour votre question ! L'assistant IA du portfolio est prêt à être connecté avec l'API LLM (Gemini/Groq).`;
      
      const lower = text.toLowerCase();
      if (lower.includes('postgis') || lower.includes('geospatial') || lower.includes('carte')) {
        botResponse = `Sur **SoaLink** & **GeoTrano**, Mirado a implémenté des requêtes spatiales PostGIS via Prisma ORM pour calculer la proximité exacte des points d'intérêt et établissements de santé.`;
      } else if (lower.includes('défi') || lower.includes('challenge')) {
        botResponse = `Le principal défi sur SoaLink a été la synchronisation en temps réel du triage LLM 2-passes avec l'affichage cartographique. Sur GeoTrano, c'était le token GPS éphémère ±500m pour valider l'authenticité des photos.`;
      } else if (lower.includes('contact') || lower.includes('recruter') || lower.includes('freelance')) {
        botResponse = `Mirado est joignable directement par email à hajamirado10@gmail.com ou par téléphone au +261 33 78 838 25. Il est disponible pour des missions Full-Stack, Flutter ou IA.`;
      } else if (lower.includes('compétence') || lower.includes('stack')) {
        botResponse = `Mirado maîtrise la Clean Architecture Flutter/Dart, NestJS/TypeScript, React 19, PostgreSQL/PostGIS, Redis, Python/FastAPI et l'intégration de LLM comme Gemini et Groq LLaMA 3.3.`;
      }

      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, sender: 'bot', text: botResponse, time: 'À l\'instant' }
      ]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/60 dark:bg-black/80 backdrop-blur-md">
      
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-cyan-500/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[650px] max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-100 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-600 dark:text-cyan-400">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="font-display font-bold text-slate-900 dark:text-white text-base">
                {isProjectSpecific ? `Assistant IA — ${targetProject.title}` : `Assistant Virtuel — Mirado IA`}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {isProjectSpecific ? 'Posez vos questions techniques sur ce projet' : 'Posez vos questions sur le profil et parcours'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="btn-icon bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Suggested Questions Pills */}
        <div className="px-6 py-2.5 bg-slate-50 dark:bg-slate-950/60 border-b border-slate-200 dark:border-slate-800/80 flex items-center gap-2 overflow-x-auto">
          <span className="text-[11px] font-semibold uppercase text-slate-500 dark:text-slate-400 whitespace-nowrap">
            Suggestions :
          </span>
          {suggestedQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              className="px-2.5 py-1 rounded-lg bg-slate-200/80 dark:bg-slate-800/80 hover:bg-cyan-50 dark:hover:bg-cyan-950 text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-300 border border-slate-300 dark:border-slate-700/60 text-xs whitespace-nowrap transition-all cursor-pointer"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Message Stream */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-slate-50/50 dark:bg-slate-950/40">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                msg.sender === 'user' ? 'bg-cyan-600 text-white' : 'bg-slate-200 dark:bg-slate-800 text-cyan-600 dark:text-cyan-400 border border-slate-300 dark:border-slate-700'
              }`}>
                {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div className={`max-w-[80%] rounded-2xl p-4 text-sm leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-cyan-600 text-white rounded-tr-none'
                  : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 rounded-tl-none shadow-xs'
              }`}>
                <p className="whitespace-pre-line">{msg.text}</p>
                <span className="block text-[10px] text-slate-400 mt-2 text-right">
                  {msg.time}
                </span>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 text-xs font-semibold pl-11">
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              <span>Mirado IA génère une réponse...</span>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-slate-100 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Écrivez votre question ici..."
              className="flex-1 px-4 py-3 rounded-xl bg-[var(--input-bg)] border border-[var(--input-border)] text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-500"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="btn-primary py-3 px-4 text-xs disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">Envoyer</span>
            </button>
          </form>
        </div>

      </div>

    </div>
  );
}
