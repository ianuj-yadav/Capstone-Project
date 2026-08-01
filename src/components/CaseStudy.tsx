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
  stripe: string;
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
    stripe: "border-t-4 border-[#2B6EFF]",
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
    stripe: "border-t-4 border-[#C9F031]",
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
    stripe: "border-t-4 border-[#A855F7]",
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
    stripe: "border-t-4 border-[#F59E0B]",
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
    stripe: "border-t-4 border-[#FF3B1F]",
  },
];

export function CaseStudy() {
  const [active, setActive] = useState(0);
  const stage = stages[active]!;

  return (
    <section
      id="case-study"
      aria-label="CivicPulse case study"
      className="scroll-mt-6 border-t-3 border-[#000000] bg-[#0B0C0E] p-6 md:p-10 font-mono"
    >
      <div className="flex flex-wrap items-end justify-between gap-4 border-b-2 border-slate-800 pb-6">
        <div>
          <div className="badge-console">
            <span>📚</span> REAL-WORLD CASE STUDY
          </div>
          <h2 className="mt-2 font-display text-2xl font-black text-[#F3F0E9] md:text-4xl">
            5-STAGE HAZARD TRIAGE PIPELINE
          </h2>
          <p className="mt-2 max-w-2xl text-xs text-slate-400">
            City call centres drown in unstructured complaints. CivicPulse chains 5 Azure AI services into a single unified dispatch pipeline.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {[
            { k: "12s", v: "voice in" },
            { k: "5", v: "Azure AI services" },
            { k: "1", v: "dispatch plan" },
          ].map((s) => (
            <div key={s.v} className="border-2 border-black bg-[#F3F0E9] p-3 text-center text-black shadow-[4px_4px_0px_#000000]">
              <div className="font-display text-2xl font-black text-[#FF3B1F] md:text-3xl">{s.k}</div>
              <div className="text-[10px] font-bold uppercase text-slate-700">{s.v}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Stage Picker Tabs */}
      <ol className="mt-6 flex flex-wrap gap-2" role="tablist" aria-label="Pipeline stages">
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
              className={`font-mono text-xs font-bold uppercase transition-all px-4 py-2.5 border-3 border-[#000000] ${
                i === active
                  ? "bg-[#C9F031] text-[#000000] shadow-[4px_4px_0px_#000000]"
                  : "bg-[#F3F0E9] text-[#000000] hover:bg-[#ffffff]"
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
        className={`card-paper relative overflow-hidden mt-6 grid grid-cols-1 gap-6 p-6 lg:grid-cols-12 ${stage.stripe}`}
      >
        <div className="lg:col-span-7">
          <p className="text-xs font-bold uppercase tracking-wider text-[#FF3B1F]">
            STAGE 0{active + 1} · {stage.azure}
          </p>
          <h3 className="mt-2 font-display text-xl font-black text-[#0B0C0E] md:text-2xl">{stage.title}</h3>
          <p className="mt-3 text-xs leading-relaxed text-slate-800">
            {stage.body}
          </p>
          <Link
            className="btn-dispatch mt-6 inline-flex"
            to="/demo/$serviceId"
            params={{ serviceId: stage.serviceId }}
          >
            RUN THIS STAGE LIVE
            <span>→</span>
          </Link>
        </div>
        <div className="grid gap-3 lg:col-span-5">
          <div className="border-2 border-black bg-white p-4">
            <p className="text-[10px] font-bold text-slate-500 uppercase">STAGE INPUT</p>
            <p className="mt-1 text-xs text-slate-900 leading-relaxed font-mono bg-slate-100 p-2.5 border border-slate-300">{stage.io.in}</p>
          </div>
          <div className="border-2 border-black bg-white p-4">
            <p className="text-[10px] font-bold text-slate-500 uppercase">STAGE OUTPUT</p>
            <p className="mt-1 text-xs text-slate-900 leading-relaxed font-mono bg-slate-100 p-2.5 border border-slate-300">{stage.io.out}</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default CaseStudy;
