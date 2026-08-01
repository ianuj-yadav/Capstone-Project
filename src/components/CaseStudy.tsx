import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";

type Stage = {
  id: string;
  service: string;
  azure: string;
  serviceId: string;
  title: string;
  body: string;
  io: { in: string; out: string };
  color: string;
};

export const stages: Stage[] = [
  {
    id: "intake",
    service: "Speech",
    azure: "Azure AI Speech",
    serviceId: "speech",
    title: "A resident just speaks the problem",
    body: "No forms. A 12-second voice note in the street is transcribed live, so people who can't type or don't share the city's main language still get heard.",
    io: {
      in: "Voice note: “there's water gushing from the pipe outside 42 Marine Drive since morning”",
      out: "Transcript + language code + confidence 0.94",
    },
    color: "bg-blue-600",
  },
  {
    id: "evidence",
    service: "Vision",
    azure: "Azure AI Vision",
    serviceId: "vision",
    title: "The attached photo becomes evidence",
    body: "Vision reads the photo for objects, scene and any text on signage or meters — turning a blurry phone picture into structured facts a dispatcher can trust.",
    io: {
      in: "photo_4821.jpg (burst pipe, flooded footpath)",
      out: "tags: water, pipe, pavement, flooding · OCR: “WARD 6 / METER 118”",
    },
    color: "bg-emerald-600",
  },
  {
    id: "triage",
    service: "Language",
    azure: "Azure AI Language",
    serviceId: "language",
    title: "Urgency is scored, not guessed",
    body: "Sentiment, key phrases and entities set the severity band and pull out the address, ward and asset ID — the fields that normally take a human ten minutes.",
    io: {
      in: "Transcript + vision tags",
      out: "severity: HIGH · category: water_leak · location: 42 Marine Dr · ward: 6",
    },
    color: "bg-purple-600",
  },
  {
    id: "policy",
    service: "RAG Search",
    azure: "Azure AI Search",
    serviceId: "rag",
    title: "The rulebook answers, with citations",
    body: "Retrieval over municipal SOPs and bylaws finds the exact clause that governs this incident, so the response is defensible instead of improvised.",
    io: {
      in: "“water main leak response time ward 6”",
      out: "SOP-14 §3.2 — 4h response · Water Works Dept · escalate after 8h",
    },
    color: "bg-amber-600",
  },
  {
    id: "plan",
    service: "OpenAI",
    azure: "Azure OpenAI",
    serviceId: "openai",
    title: "One dispatch plan, ready to send",
    body: "The reasoning layer composes everything into a work order, a resident SMS in their own language, and a one-line summary for the ward dashboard.",
    io: {
      in: "Transcript + evidence + severity + SOP-14",
      out: "Work order WO-2261 · crew: Water Works · SLA 4h · resident SMS drafted",
    },
    color: "bg-red-600",
  },
];

export function CaseStudy() {
  const [active, setActive] = useState(0);
  const stage = stages[active]!;

  return (
    <section
      id="case-study"
      aria-label="CivicPulse case study"
      className="glass-light-panel scroll-mt-24 p-6 md:p-10"
    >
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="badge-saas text-blue-700">
            <span>📚</span> REAL-WORLD CASE STUDY
          </div>
          <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
            5-STAGE HAZARD TRIAGE PIPELINE
          </h2>
          <p className="mt-1.5 max-w-2xl text-xs text-slate-600 font-medium">
            City call centres drown in unstructured complaints. CivicPulse chains 5 Azure AI services into a single unified dispatch pipeline.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {[
            { k: "12s", v: "voice in" },
            { k: "5", v: "Azure AI services" },
            { k: "1", v: "dispatch plan" },
          ].map((s) => (
            <div key={s.v} className="glass-light-card p-3 text-center">
              <div className="font-display text-2xl font-extrabold text-blue-600 md:text-3xl">{s.k}</div>
              <div className="text-[10px] font-bold uppercase text-slate-500">{s.v}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Stage Picker Tabs */}
      <ol className="mt-6 flex flex-wrap gap-2.5" role="tablist" aria-label="Pipeline stages">
        {stages.map((s, i) => (
          <li key={s.id}>
            <button
              type="button"
              role="tab"
              id={`stage-tab-${s.id}`}
              aria-selected={i === active}
              aria-controls={`stage-panel-${s.id}`}
              tabIndex={i === active ? 0 : -1}
              onClick={() => setActive(i)}
              className={`px-4 py-2.5 text-xs font-bold rounded-2xl transition-all ${
                i === active
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/25 scale-105"
                  : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
              }`}
            >
              <span>0{i + 1}. {s.service}</span>
            </button>
          </li>
        ))}
      </ol>

      {/* Active Stage Panel */}
      <motion.div
        key={stage.id}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        role="tabpanel"
        id={`stage-panel-${stage.id}`}
        aria-labelledby={`stage-tab-${stage.id}`}
        className="glass-light-card relative overflow-hidden mt-6 grid grid-cols-1 gap-6 p-6 lg:grid-cols-12"
      >
        <div className={`absolute top-0 left-0 right-0 h-1.5 ${stage.color}`} />
        <div className="lg:col-span-7">
          <p className="text-xs font-bold uppercase tracking-wider text-blue-600 font-mono">
            STAGE 0{active + 1} · {stage.azure}
          </p>
          <h3 className="mt-2 font-display text-xl font-bold text-slate-900 md:text-2xl">{stage.title}</h3>
          <p className="mt-3 text-xs leading-relaxed text-slate-600 font-medium">
            {stage.body}
          </p>
          <Link
            className="btn-saas-primary mt-6 inline-flex"
            to="/demo/$serviceId"
            params={{ serviceId: stage.serviceId }}
          >
            RUN THIS STAGE LIVE
            <span>→</span>
          </Link>
        </div>
        <div className="grid gap-3 lg:col-span-5 font-mono">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-[10px] font-bold text-slate-500 uppercase">STAGE INPUT</p>
            <p className="mt-1 text-xs text-slate-900 leading-relaxed font-medium bg-white p-2.5 rounded-lg border border-slate-200">{stage.io.in}</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-[10px] font-bold text-slate-500 uppercase">STAGE OUTPUT</p>
            <p className="mt-1 text-xs text-slate-900 leading-relaxed font-medium bg-white p-2.5 rounded-lg border border-slate-200">{stage.io.out}</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default CaseStudy;
