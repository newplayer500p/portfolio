import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { X, Sparkles, Send, Bot, User, ArrowRight } from 'lucide-react';
import { useLang } from '../i18n/LanguageContext';
import { ModalOverlay, ModalContent, springSmooth, springBouncy } from './Motion';

const WEBHOOK_URL = 'https://portfolio-n8n-310w.onrender.com/webhook/chat';
const MAX_INPUT_LENGTH = 400;
const COLD_START_HINT_MS = 5000;

// ─── Lightweight Markdown Parser ────────────────────────────────────────────
function parseMarkdown(text) {
  if (!text) return null;

  const lines = text.split('\n');
  const elements = [];
  let listBuffer = [];

  const flushList = () => {
    if (listBuffer.length > 0) {
      elements.push(
        <ul key={`ul-${elements.length}`} className="ai-md-list">
          {listBuffer.map((item, i) => (
            <li key={i}>{formatInline(item)}</li>
          ))}
        </ul>
      );
      listBuffer = [];
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Heading ###
    const headingMatch = line.match(/^(#{1,3})\s+(.+)$/);
    if (headingMatch) {
      flushList();
      const level = headingMatch[1].length;
      const Tag = level === 1 ? 'h3' : level === 2 ? 'h4' : 'h5';
      elements.push(<Tag key={`h-${i}`} className="ai-md-heading">{formatInline(headingMatch[2])}</Tag>);
      continue;
    }

    // Bullet point (-, *, •)
    const bulletMatch = line.match(/^\s*[-*•]\s+(.+)$/);
    if (bulletMatch) {
      listBuffer.push(bulletMatch[1]);
      continue;
    }

    // Empty line
    if (line.trim() === '') {
      flushList();
      continue;
    }

    // Normal paragraph
    flushList();
    elements.push(<p key={`p-${i}`} className="ai-md-paragraph">{formatInline(line)}</p>);
  }

  flushList();
  return elements;
}

// Inline formatting: **bold**, *italic*, `code`
function formatInline(text) {
  if (!text) return text;
  const parts = [];
  const regex = /(\*\*(.+?)\*\*|\*(.+?)\*|`(.+?)`)/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    if (match[2]) {
      parts.push(<strong key={match.index} className="ai-md-bold">{match[2]}</strong>);
    } else if (match[3]) {
      parts.push(<em key={match.index}>{match[3]}</em>);
    } else if (match[4]) {
      parts.push(<code key={match.index} className="ai-md-code">{match[4]}</code>);
    }
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }
  return parts.length > 0 ? parts : text;
}

// ─── [[SHOW_CARD:id]] Parser ────────────────────────────────────────────────
function extractShowCards(text) {
  const TAG_REGEX = /\[\[SHOW_CARD:([^\]]+)\]\]/g;
  const ids = [];
  let match;
  while ((match = TAG_REGEX.exec(text)) !== null) {
    const id = match[1].trim();
    if (id && id !== 'id_du_projet') {
      ids.push(id);
    }
  }
  const cleanText = text.replace(/\s*\[\[SHOW_CARD:[^\]]*\]\]\s*/g, '').trim();
  return { cleanText, projectIds: ids };
}

// ─── Mini Project Card (compact, inline) ────────────────────────────────────
function ProjectMiniCard({ project, onOpenDetail }) {
  if (!project) return null;
  const stackPreview = project.stack?.slice(0, 4) || [];
  const summary = project.details?.summary || '';

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={springBouncy}
      onClick={() => onOpenDetail(project)}
      className="ai-project-card group cursor-pointer"
    >
      <div className="ai-project-card-inner">
        <div className="ai-project-card-header">
          <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-cyan-400 shrink-0" />
          <span className="ai-project-card-title">{project.title}</span>
          {project.category && (
            <span className="text-[10px] text-slate-400 dark:text-slate-500 font-normal truncate max-w-[130px] ml-1">
              • {project.category}
            </span>
          )}
          <ArrowRight className="w-3.5 h-3.5 text-slate-400 ml-auto shrink-0 transition-transform group-hover:translate-x-1" />
        </div>

        {summary && (
          <p className="text-[11px] text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed pl-5">
            {summary}
          </p>
        )}

        {stackPreview.length > 0 && (
          <div className="ai-project-card-stack pl-5">
            {stackPreview.map((t) => (
              <span key={t} className="ai-project-card-tag">{t}</span>
            ))}
            {project.stack?.length > 4 && (
              <span className="ai-project-card-tag ai-project-card-tag-more">+{project.stack.length - 4}</span>
            )}
          </div>
        )}
      </div>
    </motion.button>
  );
}

// ─── Generate & Manage Session Storage ──────────────────────────────────────
function generateSessionId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `session-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function getStoredSessionId() {
  let sid = sessionStorage.getItem('ai_session_id');
  if (!sid) {
    sid = generateSessionId();
    sessionStorage.setItem('ai_session_id', sid);
  }
  return sid;
}

function clearStoredSession() {
  sessionStorage.removeItem('ai_session_id');
  sessionStorage.removeItem('ai_messages');
}

// ─── Main Component ─────────────────────────────────────────────────────────
export default function AIChatModal({ targetProject, profile, projects, onClose, onOpenProjectDetail }) {
  const { t, lang } = useLang();
  const isProjectSpecific = !!targetProject;

  const initialGreeting = isProjectSpecific
    ? t('ai_greeting_project').replace('{title}', targetProject.title)
    : t('ai_greeting_general');

  const suggestedQuestions = isProjectSpecific
    ? [
        t('ai_project_ask'),
        'Architecture',
        'Stack',
      ]
    : [
        t('ai_about_skills'),
        t('ai_about_projects'),
        t('ai_about_contact')
      ];

  const [messages, setMessages] = useState(() => {
    const stored = sessionStorage.getItem('ai_messages');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {
        // Fallback to initial greeting if parse fails
      }
    }
    return [{ id: 1, sender: 'bot', text: initialGreeting, projectIds: [] }];
  });

  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [coldStartHint, setColdStartHint] = useState(false);
  const [error, setError] = useState(null);

  const sessionIdRef = useRef(getStoredSessionId());
  const messagesEndRef = useRef(null);
  const coldStartTimerRef = useRef(null);

  // Re-generate greeting when language switches
  useEffect(() => {
    const newGreeting = isProjectSpecific
      ? t('ai_greeting_project').replace('{title}', targetProject?.title || '')
      : t('ai_greeting_general');
    setMessages((prev) => {
      if (prev.length === 0) return prev;
      const [first, ...rest] = prev;
      if (first.sender !== 'bot') return prev;
      return [{ ...first, text: newGreeting }, ...rest];
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  // Sync messages to sessionStorage
  useEffect(() => {
    sessionStorage.setItem('ai_messages', JSON.stringify(messages));
  }, [messages]);

  // Handle explicit reset when clicking 'X'
  const handleResetSessionAndClose = () => {
    clearStoredSession();
    onClose();
  };

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Cleanup cold-start timer on unmount
  useEffect(() => {
    return () => {
      if (coldStartTimerRef.current) clearTimeout(coldStartTimerRef.current);
    };
  }, []);

  const findProject = useCallback((id) => {
    if (!projects || !Array.isArray(projects)) return null;
    return projects.find((p) => p.id === id) || null;
  }, [projects]);

  const handleSend = async (userText) => {
    const text = (userText || input).trim();
    if (!text || isTyping) return;

    const userMsg = { id: Date.now(), sender: 'user', text, projectIds: [] };
    setMessages((prev) => [...prev, userMsg]);
    if (!userText) setInput('');
    setIsTyping(true);
    setError(null);
    setColdStartHint(false);

    coldStartTimerRef.current = setTimeout(() => {
      setColdStartHint(true);
    }, COLD_START_HINT_MS);

    try {
      let chatInput = text;
      if (isProjectSpecific && targetProject) {
        chatInput = `[Contexte: projet ${targetProject.title} (id: ${targetProject.id})] ${text}`;
      }

      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify({
          chatInput,
          sessionId: sessionIdRef.current,
        }),
      });

      if (!response.ok) {
        throw new Error(`${t('ai_error_server')} (${response.status})`);
      }

      const data = await response.json();

      let rawOutput;
      if (Array.isArray(data)) {
        rawOutput = data[0]?.output;
      } else {
        rawOutput = data.output;
      }
      if (!rawOutput) rawOutput = t('ai_error_no_response');

      const { cleanText, projectIds } = extractShowCards(rawOutput);

      const botMsg = {
        id: Date.now() + 1,
        sender: 'bot',
        text: cleanText,
        projectIds,
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      setError(err.message || t('ai_error_generic'));
      const errorMsg = {
        id: Date.now() + 1,
        sender: 'bot',
        text: t('ai_error_connection'),
        projectIds: [],
        isError: true,
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
      setColdStartHint(false);
      if (coldStartTimerRef.current) {
        clearTimeout(coldStartTimerRef.current);
        coldStartTimerRef.current = null;
      }
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (value.length <= MAX_INPUT_LENGTH) {
      setInput(value);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const charCount = input.length;
  const charRatio = charCount / MAX_INPUT_LENGTH;

  return (
    <ModalOverlay className="ai-overlay" onClick={(e) => e.stopPropagation()}>
      <ModalContent className="ai-modal">

        {/* ─── Header ─── */}
        <div className="ai-header">
          <div className="ai-header-left">
            <div className="ai-header-icon">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="ai-header-title">
                {isProjectSpecific ? targetProject.title : 'Mirado AI'}
              </h3>
              <p className="ai-header-subtitle">
                {t('ai_subtitle')}
              </p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleResetSessionAndClose}
            className="ai-close-btn cursor-pointer"
            aria-label="Fermer et réinitialiser"
          >
            <X className="w-4 h-4" />
          </motion.button>
        </div>

        {/* ─── Suggestion Pills ─── */}
        <div className="ai-suggestions">
          {suggestedQuestions.map((q, idx) => (
            <motion.button
              key={idx}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSend(q)}
              className="ai-suggestion-pill cursor-pointer"
              disabled={isTyping}
            >
              {q}
            </motion.button>
          ))}
        </div>

        {/* ─── Messages ─── */}
        <div className="ai-messages">
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 15, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={springSmooth}
              className={`ai-msg-row ${msg.sender === 'user' ? 'ai-msg-row-user' : 'ai-msg-row-bot'}`}
            >
              {/* Avatar */}
              <div className={`ai-avatar ${msg.sender === 'user' ? 'ai-avatar-user' : 'ai-avatar-bot'}`}>
                {msg.sender === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
              </div>

              {/* Bubble */}
              <div className={`ai-bubble ${msg.sender === 'user' ? 'ai-bubble-user' : 'ai-bubble-bot'} ${msg.isError ? 'ai-bubble-error' : ''}`}>
                <div className="ai-bubble-content">
                  {msg.sender === 'bot' ? parseMarkdown(msg.text) : msg.text}
                </div>

                {/* Reconstructed project cards */}
                {msg.projectIds?.length > 0 && (
                  <div className="ai-cards-container">
                    {msg.projectIds.map((pid) => {
                      const proj = findProject(pid);
                      return proj ? (
                        <ProjectMiniCard
                          key={pid}
                          project={proj}
                          onOpenDetail={(p) => {
                            if (onOpenProjectDetail) onOpenProjectDetail(p);
                          }}
                        />
                      ) : null;
                    })}
                  </div>
                )}
              </div>
            </motion.div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="ai-msg-row ai-msg-row-bot"
            >
              <div className="ai-avatar ai-avatar-bot">
                <Bot className="w-3.5 h-3.5" />
              </div>
              <div className="ai-typing">
                <div className="ai-typing-dots">
                  <span></span><span></span><span></span>
                </div>
                <span className="ai-typing-label">
                  {coldStartHint ? t('ai_cold_start') : t('ai_typing')}
                </span>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* ─── Input Bar ─── */}
        <div className="ai-input-bar">
          <form
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
            className="ai-input-form"
          >
            <div className="ai-input-wrapper">
              <input
                type="text"
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder={t('ai_input_placeholder')}
                maxLength={MAX_INPUT_LENGTH}
                disabled={isTyping}
                className="ai-input"
                autoFocus
              />
              <span className={`ai-char-counter ${charRatio > 0.85 ? 'ai-char-warn' : ''} ${charRatio >= 1 ? 'ai-char-limit' : ''}`}>
                {charCount}/{MAX_INPUT_LENGTH}
              </span>
            </div>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              transition={springBouncy}
              disabled={!input.trim() || isTyping}
              className="ai-send-btn cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </motion.button>
          </form>
        </div>

      </ModalContent>
    </ModalOverlay>
  );
}

