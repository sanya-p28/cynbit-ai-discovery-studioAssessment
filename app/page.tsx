'use client';

import React, { useState } from 'react';
import {
  Cpu,
  Layers,
  Cloud,
  BarChart3,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Terminal,
  Sparkles,
  Clock,
  IndianRupee,
  Download,
  RotateCcw,
  ShieldCheck,
} from 'lucide-react';

interface Blueprint {
  id: string;
  timestamp: string;
  client: { name: string; email: string; brief: string };
  domain: string;
  stage: string;
  targetTimeline: string;
  architecturePattern: string;
  recommendedStack: string[];
  selectedFeatures: string[];
  estimatedWeeks: number;
  estimatedBudgetFormatted: string;
  sprints: { phase: string; title: string; deliverable: string }[];
}

const DOMAINS = [
  {
    id: 'ai-agents',
    title: 'Autonomous AI Agents & RAG',
    desc: 'Custom LLM workflows, vector search, and intelligent process automation.',
    icon: Cpu,
  },
  {
    id: 'fullstack-saas',
    title: 'Full-Stack Web & SaaS MVP',
    desc: 'High-converting, scalable web applications built with modern cloud stacks.',
    icon: Layers,
  },
  {
    id: 'cloud-devops',
    title: 'Cloud Infrastructure & DevOps',
    desc: 'CI/CD pipelines, Kubernetes orchestration, and zero-downtime migrations.',
    icon: Cloud,
  },
  {
    id: 'data-analytics',
    title: 'Enterprise Data & Analytics',
    desc: 'Real-time ETL pipelines, data warehousing, and executive BI dashboards.',
    icon: BarChart3,
  },
];

const FEATURES_LIST = [
  'Role-Based Auth & SSO',
  'Payment Gateway (Razorpay / Stripe)',
  'Custom LLM / Knowledge Base RAG',
  'Real-Time WebSockets & Notifications',
  'Admin Analytics Dashboard',
  'Third-Party CRM / ERP API Sync',
];

export default function CynbitEstimatorPage() {
  const [step, setStep] = useState(1);
  const [domain, setDomain] = useState('ai-agents');
  const [stage, setStage] = useState('mvp');
  const [timeline, setTimeline] = useState('6-8 weeks');
  const [features, setFeatures] = useState<string[]>(['Role-Based Auth & SSO', 'Admin Analytics Dashboard']);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [brief, setBrief] = useState('');
  const [loading, setLoading] = useState(false);
  const [blueprint, setBlueprint] = useState<Blueprint | null>(null);
  const [savedLeads, setSavedLeads] = useState<Blueprint[]>([]);
  const [showAdmin, setShowAdmin] = useState(false);

  const toggleFeature = (feat: string) => {
    setFeatures((prev) =>
      prev.includes(feat) ? prev.filter((f) => f !== feat) : [...prev, feat]
    );
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/generate-blueprint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ domain, stage, timeline, features, name, email, brief }),
      });
      const data = await res.json();
      if (data.success) {
        setBlueprint(data.blueprint);
        setSavedLeads((prev) => [data.blueprint, ...prev]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const resetWizard = () => {
    setBlueprint(null);
    setStep(1);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Navbar matching Cynbit aesthetic */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full border-2 border-[#0d5c63] flex items-center justify-center font-bold text-[#0d5c63] text-sm tracking-tighter">
              CYN
            </div>
            <span className="font-bold text-lg tracking-tight text-slate-900">
              CYNBIT <span className="text-xs font-medium text-[#0d5c63] bg-teal-50 px-2 py-0.5 rounded-full ml-1">AI Discovery Studio</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowAdmin(!showAdmin)}
              className="text-xs font-medium text-slate-600 hover:text-[#0d5c63] border border-slate-200 px-3 py-1.5 rounded-full transition"
            >
              {showAdmin ? 'Back to Estimator' : `Leads Dashboard (${savedLeads.length})`}
            </button>
            <a
              href="https://www.cynbit.in"
              target="_blank"
              rel="noreferrer"
              className="text-xs font-semibold bg-[#0d5c63] text-white px-4 py-2 rounded-full hover:bg-[#094348] transition"
            >
              cynbit.in
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12">
        {showAdmin ? (
          /* Admin Leads View */
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Discovery Leads & Generated Blueprints</h2>
                <p className="text-sm text-slate-500">Internal engineering review queue for incoming client scopes.</p>
              </div>
              <button
                onClick={() => setShowAdmin(false)}
                className="text-sm font-medium text-[#0d5c63] hover:underline"
              >
                + New Scope Estimate
              </button>
            </div>

            {savedLeads.length === 0 ? (
              <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-xl">
                <p className="text-slate-500 text-sm">No blueprints generated yet in this session. Complete the estimator to see leads appear here.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {savedLeads.map((lead) => (
                  <div key={lead.id} className="p-5 rounded-xl border border-slate-200 bg-slate-50/60 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-semibold bg-teal-100 text-[#0d5c63] px-2 py-0.5 rounded">
                          {lead.id}
                        </span>
                        <span className="font-semibold text-slate-900">{lead.client.name || 'Anonymous Prospect'}</span>
                        <span className="text-xs text-slate-500">({lead.client.email})</span>
                      </div>
                      <p className="text-sm text-slate-600 mt-1">{lead.architecturePattern}</p>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {lead.recommendedStack.slice(0, 4).map((tech) => (
                          <span key={tech} className="text-[11px] bg-white border border-slate-200 px-2 py-0.5 rounded text-slate-600">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="text-left md:text-right shrink-0">
                      <div className="text-sm font-bold text-[#0d5c63]">{lead.estimatedBudgetFormatted}</div>
                      <div className="text-xs text-slate-500">{lead.estimatedWeeks} Weeks Delivery</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : !blueprint ? (
          /* Interactive Scoping Wizard */
          <>
            <div className="text-center max-w-2xl mx-auto mb-10">
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0d5c63] bg-teal-50 border border-teal-200 px-3 py-1 rounded-full mb-4">
                <Sparkles className="w-3.5 h-3.5" /> Interactive Discovery & Architecture Engine
              </div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
                Scope Your Custom Software or AI System in 60 Seconds
              </h1>
              <p className="text-slate-600 mt-3 text-sm md:text-base">
                Configure your technical requirements below to instantly generate a recommended system architecture, sprint roadmap, and investment estimate from Cynbit’s engineering team.
              </p>
            </div>

            {/* Step Progress Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-2">
                <span className={step >= 1 ? 'text-[#0d5c63]' : ''}>1. Solution Domain</span>
                <span className={step >= 2 ? 'text-[#0d5c63]' : ''}>2. Scale & Modules</span>
                <span className={step >= 3 ? 'text-[#0d5c63]' : ''}>3. Project Brief</span>
              </div>
              <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#0d5c63] transition-all duration-300"
                  style={{ width: `${(step / 3) * 100}%` }}
                />
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-10 max-w-3xl mx-auto">
              {step === 1 && (
                <div>
                  <h2 className="text-xl font-bold text-slate-900 mb-1">Select Your Primary Engineering Domain</h2>
                  <p className="text-sm text-slate-500 mb-6">Choose the core capability you want Cynbit to architect.</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {DOMAINS.map((item) => {
                      const Icon = item.icon;
                      const isSelected = domain === item.id;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setDomain(item.id)}
                          className={`text-left p-5 rounded-xl border-2 transition ${
                            isSelected
                              ? 'border-[#0d5c63] bg-teal-50/40'
                              : 'border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          <div className="w-10 h-10 rounded-lg bg-[#0d5c63]/10 text-[#0d5c63] flex items-center justify-center mb-3">
                            <Icon className="w-5 h-5" />
                          </div>
                          <div className="font-bold text-slate-900">{item.title}</div>
                          <p className="text-xs text-slate-500 mt-1 leading-relaxed">{item.desc}</p>
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-8 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="inline-flex items-center gap-2 bg-[#0d5c63] text-white text-sm font-semibold px-6 py-3 rounded-full hover:bg-[#094348] transition"
                    >
                      Continue to Scale & Modules <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <h2 className="text-xl font-bold text-slate-900 mb-1">Project Stage & Core Modules</h2>
                  <p className="text-sm text-slate-500 mb-6">Help us calibrate infrastructure throughput and sprint velocity.</p>

                  <div className="mb-6">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                      Current Product Stage
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { id: 'mvp', label: 'Startup MVP', sub: 'Fast launch' },
                        { id: 'scaling', label: 'Growth / Scaling', sub: 'High concurrency' },
                        { id: 'enterprise', label: 'Enterprise', sub: 'SOC2 / Custom SLA' },
                      ].map((s) => (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => setStage(s.id)}
                          className={`p-3.5 rounded-xl border text-left transition ${
                            stage === s.id
                              ? 'border-[#0d5c63] bg-teal-50/50 ring-1 ring-[#0d5c63]'
                              : 'border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          <div className="font-semibold text-sm text-slate-900">{s.label}</div>
                          <div className="text-xs text-slate-500">{s.sub}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                      Required Capabilities
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {FEATURES_LIST.map((feat) => {
                        const checked = features.includes(feat);
                        return (
                          <button
                            key={feat}
                            type="button"
                            onClick={() => toggleFeature(feat)}
                            className={`flex items-center gap-2.5 p-3 rounded-lg border text-left text-sm transition ${
                              checked
                                ? 'border-[#0d5c63] bg-teal-50/40 text-slate-900 font-medium'
                                : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                            }`}
                          >
                            <CheckCircle2
                              className={`w-4 h-4 shrink-0 ${
                                checked ? 'text-[#0d5c63]' : 'text-slate-300'
                              }`}
                            />
                            {feat}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="mt-8 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-slate-900"
                    >
                      <ArrowLeft className="w-4 h-4" /> Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="inline-flex items-center gap-2 bg-[#0d5c63] text-white text-sm font-semibold px-6 py-3 rounded-full hover:bg-[#094348] transition"
                    >
                      Final Step <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <form onSubmit={handleGenerate}>
                  <h2 className="text-xl font-bold text-slate-900 mb-1">Generate Your Architecture Blueprint</h2>
                  <p className="text-sm text-slate-500 mb-6">Enter your details to unlock your custom technical roadmap.</p>

                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Your Name *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g., Aarav Sharma"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:border-[#0d5c63]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Work Email *</label>
                        <input
                          type="email"
                          required
                          placeholder="aarav@company.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:border-[#0d5c63]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Target Launch Window</label>
                      <select
                        value={timeline}
                        onChange={(e) => setTimeline(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:border-[#0d5c63]"
                      >
                        <option value="4-6 weeks">Aggressive (4–6 Weeks)</option>
                        <option value="6-8 weeks">Standard (6–8 Weeks)</option>
                        <option value="10-14 weeks">Comprehensive Enterprise Rollout (10–14 Weeks)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Problem Statement / Key Goals (Optional)
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Briefly describe what you are building or automating..."
                        value={brief}
                        onChange={(e) => setBrief(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:border-[#0d5c63]"
                      />
                    </div>
                  </div>

                  <div className="mt-8 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-slate-900"
                    >
                      <ArrowLeft className="w-4 h-4" /> Back
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="inline-flex items-center gap-2 bg-[#0d5c63] text-white text-sm font-semibold px-7 py-3 rounded-full hover:bg-[#094348] transition disabled:opacity-60"
                    >
                      {loading ? 'Synthesizing Architecture...' : 'Generate Blueprint'}
                      <Sparkles className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </>
        ) : (
          /* Generated Architecture Blueprint Result */
          <div className="max-w-4xl mx-auto">
            <div className="bg-slate-900 text-white rounded-2xl p-6 md:p-8 shadow-lg border border-slate-800">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-5">
                <div>
                  <div className="flex items-center gap-2 text-teal-400 text-xs font-mono mb-1">
                    <Terminal className="w-4 h-4" /> SYSTEM LOG // ARCHITECTURE BLUEPRINT {blueprint.id}
                  </div>
                  <h2 className="text-2xl font-bold">{blueprint.architecturePattern}</h2>
                </div>
                <button
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition"
                >
                  <Download className="w-3.5 h-3.5" /> Export PDF
                </button>
              </div>

              {/* Key Metrics Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6">
                <div className="bg-slate-800/70 p-4 rounded-xl border border-slate-700/70">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                    <Clock className="w-3.5 h-3.5 text-teal-400" /> Estimated Delivery
                  </div>
                  <div className="text-xl font-bold text-white">{blueprint.estimatedWeeks} Weeks</div>
                </div>
                <div className="bg-slate-800/70 p-4 rounded-xl border border-slate-700/70">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                    <IndianRupee className="w-3.5 h-3.5 text-teal-400" /> Ballpark Investment
                  </div>
                  <div className="text-lg font-bold text-teal-300">{blueprint.estimatedBudgetFormatted}</div>
                </div>
                <div className="bg-slate-800/70 p-4 rounded-xl border border-slate-700/70">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-teal-400" /> Lead Status
                  </div>
                  <div className="text-sm font-semibold text-emerald-400">Logged to Cynbit Discovery</div>
                </div>
              </div>

              {/* Recommended Tech Stack */}
              <div className="mb-6">
                <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
                  Recommended Production Tech Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {blueprint.recommendedStack.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs font-medium bg-teal-950 text-teal-300 border border-teal-800 px-3 py-1.5 rounded-lg"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Sprint Execution Roadmap */}
              <div>
                <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
                  Agile Execution Roadmap
                </h3>
                <div className="space-y-3">
                  {blueprint.sprints.map((sprint) => (
                    <div
                      key={sprint.phase}
                      className="bg-slate-800/50 border border-slate-700/60 p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                    >
                      <div>
                        <span className="text-xs font-mono text-teal-400">{sprint.phase}</span>
                        <div className="font-semibold text-sm text-white">{sprint.title}</div>
                        <p className="text-xs text-slate-400 mt-0.5">{sprint.deliverable}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-5 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
                <p className="text-xs text-slate-400">
                  Confirmation sent to <span className="text-white font-medium">{blueprint.client.email}</span>.
                </p>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setShowAdmin(true)}
                    className="text-xs font-semibold text-teal-400 hover:underline"
                  >
                    View in Leads Dashboard →
                  </button>
                  <button
                    onClick={resetWizard}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold bg-white text-slate-900 px-4 py-2 rounded-full hover:bg-slate-100 transition"
                  >
                    <RotateCcw className="w-3.5 h-3.5" /> Scope Another Project
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}