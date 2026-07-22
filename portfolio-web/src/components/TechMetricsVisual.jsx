import React from 'react';
import { Terminal, Cpu, Database, Layers, ShieldCheck, Workflow, CheckCircle2, GitBranch } from 'lucide-react';

export default function TechMetricsVisual({ profile }) {
  const stackDistribution = [
    { category: 'Backend & APIs Modulaires', percentage: 95, color: 'from-cyan-500 to-blue-600', desc: 'NestJS, TypeScript, REST, WebSockets, FastAPI' },
    { category: 'Mobile & Web Frontends', percentage: 90, color: 'from-blue-500 to-indigo-600', desc: 'Flutter Clean Architecture, React 19, Zustand' },
    { category: 'Bases de Données & Géospatial', percentage: 88, color: 'from-purple-500 to-pink-600', desc: 'PostgreSQL, PostGIS, Prisma ORM, Redis' },
    { category: 'Intégration IA & Workflows RAG', percentage: 85, color: 'from-emerald-500 to-teal-600', desc: 'Google Gemini, Groq (LLaMA 3.3), WhisperX, n8n' }
  ];

  const workflowSteps = [
    { num: '01', title: 'Conception & UML', detail: 'Spécification Merise, cas d’utilisation, diagrammes de séquence et de classe pour rôles multiples.' },
    { num: '02', title: 'Backend & Spatial DB', detail: 'Schémas Prisma PostGIS, chiffrement AES-256-CBC, cache Redis & WebSockets temps réel.' },
    { num: '03', title: 'Frontends Mobile & Web', detail: 'Clean Architecture Flutter multiplateforme et interfaces réactives React 19.' },
    { num: '04', title: 'Pipelines IA & Deploiement', detail: 'LLM Triage en 2 passes, Whisper CUDA local et déploiement VPS Linux.' }
  ];

  return (
    <section id="competences" className="py-24 px-6 max-w-6xl mx-auto space-y-16">
      
      {/* Section Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold mb-4">
          <Terminal className="w-3.5 h-3.5" />
          <span>Ingénierie & Métriques d'Architecture</span>
        </div>
        <h2 className="text-display-xl text-white font-extrabold tracking-tight">
          GRAPHES & COMPÉTENCES <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">TECHNIQUES</span>.
        </h2>
        <p className="text-slate-400 text-base max-w-2xl mt-2">
          Vue d'ensemble de la maîtrise des couches logicielles, de la modélisation spatiale aux pipelines IA.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Visual Stack Graphic / Progress Breakdown */}
        <div className="glass-panel p-6 sm:p-8 space-y-6 glow-border">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2 font-display">
              <Cpu className="w-5 h-5 text-cyan-400" />
              Répartition des Domaines d'Expertise
            </h3>
            <span className="text-xs font-mono text-cyan-400 bg-cyan-950/40 px-2.5 py-1 rounded-md border border-cyan-500/20">
              L3 ESPA
            </span>
          </div>

          <div className="space-y-6">
            {stackDistribution.map((item, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex justify-between items-center text-sm font-semibold">
                  <span className="text-slate-200">{item.category}</span>
                  <span className="font-mono text-cyan-400 font-bold">{item.percentage}%</span>
                </div>
                {/* Visual Graphic Bar */}
                <div className="h-3 w-full bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${item.color} transition-all duration-1000`}
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
                <p className="text-xs text-slate-400 font-medium">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* System Workflow Pipeline Graphic */}
        <div className="glass-panel p-6 sm:p-8 space-y-6 glow-border">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2 font-display">
              <Workflow className="w-5 h-5 text-purple-400" />
              Workflow de Développement de Mirado
            </h3>
            <span className="text-xs font-mono text-purple-400 bg-purple-950/40 px-2.5 py-1 rounded-md border border-purple-500/20">
              Solo & Équipe
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {workflowSteps.map((step, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2 relative group hover:border-cyan-500/40 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-extrabold text-2xl text-cyan-400 opacity-60 group-hover:opacity-100 transition-opacity">
                    {step.num}
                  </span>
                  <GitBranch className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                </div>
                <h4 className="font-display font-bold text-slate-200 text-sm">
                  {step.title}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {step.detail}
                </p>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/30 text-xs text-cyan-300 flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 shrink-0 text-cyan-400" />
            <span>
              Chaque projet est conçu de A à Z avec rigueur académique (ESPA L3) et standards de production (Clean Architecture & Sécurité).
            </span>
          </div>
        </div>

      </div>

    </section>
  );
}
