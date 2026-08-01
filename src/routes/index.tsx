import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { ServiceGrid, services } from "@/components/ServiceGrid";
import { OnboardingTour } from "@/components/OnboardingTour";
import { LucidLoader } from "@/components/LucidLoader";
import { CaseStudy } from "@/components/CaseStudy";
import { PipelineSimulator } from "@/components/PipelineSimulator";
import { ArchitectureDiagram } from "@/components/ArchitectureDiagram";
import { CapstoneScorecard } from "@/components/CapstoneScorecard";
import { DispatchPipe3D } from "@/components/DispatchPipe3D";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CivicPulse — Azure AI Dispatch Console | Season of AI 2.0 Capstone" },
      {
        name: "description",
        content:
          "CivicPulse turns a resident's voice note and photo into a ranked, policy-backed city dispatch plan using Azure Speech, Vision, Language, AI Search and OpenAI.",
      },
      { property: "og:title", content: "CivicPulse — Azure AI Hazard Triage Dispatch Console" },
      {
        property: "og:description",
        content:
          "A capstone mini product: five Azure AI services chained into one civic hazard triage pipeline, live and interactive.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const TICKER =
  "VOICE REPORT IN · VISION EVIDENCE · URGENCY SCORED · BYLAW CITED · DISPATCH PLAN OUT · 05 AZURE AI SERVICES · NO REDIRECTS · ";

export function Index() {
  const [activeStage, setActiveStage] = useState(0);

  return (
    <main className="relative min-h-screen bg-[#0B0C0E] text-[#F3F0E9] font-mono selection:bg-[#C9F031] selection:text-[#000000]">
      {/* Console Top Header Bar */}
      <header className="border-b-3 border-[#000000] bg-[#12141A] px-4 py-3 md:px-8">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="font-display text-2xl font-black tracking-tight text-[#F3F0E9] md:text-3xl">
              CIVICPULSE
            </h1>
            <span className="border border-[#C9F031] bg-black px-2 py-0.5 text-[10px] font-bold text-[#C9F031]">
              DISPATCH CONSOLE v2.0
            </span>
            <span className="hidden text-xs text-slate-500 md:inline">
              Season of AI 2.0 · Final Capstone
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="badge-console">
              <span className="h-2 w-2 bg-[#C9F031] animate-pulse" /> SYSTEM ONLINE
            </span>
            <span className="badge-console">05 AZURE SERVICES</span>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8 lg:py-12">
        {/* ---- 1. HERO SECTION: Full-bleed, large off-center headline ---- */}
        <section aria-label="Hero Console" className="relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, staggerChildren: 0.1 }}
            className="grid grid-cols-1 gap-8 lg:grid-cols-12"
          >
            <div className="flex flex-col justify-between lg:col-span-6">
              <div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="inline-flex items-center gap-2 border-2 border-[#FF3B1F] bg-[#1A0B0B] px-3 py-1 font-mono text-xs font-bold text-[#FF3B1F]"
                >
                  <span className="h-2 w-2 bg-[#FF3B1F] animate-ping" />
                  MUNICIPAL EMERGENCY TRIAGE OPERATOR
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="mt-4 font-display text-4xl font-black leading-none text-[#F3F0E9] sm:text-5xl md:text-6xl lg:text-7xl"
                >
                  A CITY HEARS EVERY HAZARD.
                  <br />
                  <span className="text-[#C9F031]">AND ANSWERS IN SECONDS.</span>
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mt-6 max-w-xl font-mono text-sm leading-relaxed text-slate-300"
                >
                  Residents report broken pipes, live wires, and flooded underpasses via voice notes & photos.
                  CivicPulse transcribes, analyzes evidence, scores urgency, cites municipal bylaws, and drafts work orders — 5 Azure AI microservices acting as one operator.
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-8 flex flex-wrap items-center gap-4"
              >
                <a className="btn-dispatch text-base" href="#simulator">
                  INITIALIZE DISPATCH SIMULATOR
                  <span>↓</span>
                </a>

                <a className="btn-signal text-base" href="#services">
                  EXPLORE 5 MODULES
                  <span>→</span>
                </a>
              </motion.div>
            </div>

            {/* ---- 2. SIGNATURE 3D R3F DISPATCH CONDUIT ELEMENT ---- */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="lg:col-span-6"
            >
              <DispatchPipe3D
                activeStageIndex={activeStage}
                onSelectStage={(idx) => setActiveStage(idx)}
              />
            </motion.div>
          </motion.div>
        </section>

        {/* ---- 3. PIPELINE DETAIL STRIP (5 Stages as Horizontal Bento Row) ---- */}
        <section aria-label="Pipeline Detail Strip" className="mt-12">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-slate-800 pb-4">
            <div>
              <div className="badge-console">
                <span>⚡</span> MICROSERVICE PIPELINE STRIP
              </div>
              <h3 className="mt-2 font-display text-xl font-black text-[#F3F0E9] md:text-2xl">
                5-STAGE AZURE AI DATA HIGHWAY
              </h3>
            </div>
            <span className="font-mono text-xs text-slate-400">
              Click a card to activate stage on 3D conduit
            </span>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5 font-mono">
            {[
              { idx: 0, name: "Speech STT", azure: "Azure Speech", color: "#2B6EFF", desc: "12s voice note in → Transcript out", stripe: "bg-[#2B6EFF]" },
              { idx: 1, name: "Vision Evidence", azure: "Azure Vision", color: "#C9F031", desc: "Photo input → OCR & Hazard tags", stripe: "bg-[#C9F031]" },
              { idx: 2, name: "Language Triage", azure: "Azure Language", color: "#A855F7", desc: "Sentiment & Severity scoring", stripe: "bg-[#A855F7]" },
              { idx: 3, name: "RAG Search", azure: "AI Search", color: "#F59E0B", desc: "Bylaw citation & 4h SLA match", stripe: "bg-[#F59E0B]" },
              { idx: 4, name: "OpenAI Dispatch", azure: "Azure OpenAI", color: "#FF3B1F", desc: "Work Order WO-9482 + Resident SMS", stripe: "bg-[#FF3B1F]" },
            ].map((st) => {
              const isActive = activeStage === st.idx;
              return (
                <button
                  key={st.name}
                  type="button"
                  onClick={() => setActiveStage(st.idx)}
                  className={`card-paper relative overflow-hidden flex flex-col justify-between p-4 text-left cursor-pointer transition-all ${
                    isActive ? "ring-3 ring-[#C9F031] scale-[1.02] shadow-hard-lg" : ""
                  }`}
                >
                  <div className={`absolute top-0 left-0 right-0 h-2 ${st.stripe}`} />
                  <div>
                    <div className="flex items-center justify-between text-[10px] font-bold text-slate-500">
                      <span>STAGE 0{st.idx + 1}</span>
                      {isActive && <span className="bg-black text-[#C9F031] px-1.5 py-0.5">ACTIVE</span>}
                    </div>
                    <h4 className="mt-2 font-display text-base font-black text-[#0B0C0E]">{st.name}</h4>
                    <p className="text-[11px] font-bold text-slate-600">{st.azure}</p>
                  </div>

                  <div className="mt-4 border-t border-slate-300 pt-2 text-[10px] text-slate-800 leading-tight">
                    {st.desc}
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* ---- 4. LIVE TRIAGE SIMULATOR ---- */}
        <div className="mt-12">
          <PipelineSimulator />
        </div>

        {/* ---- 5. CASE STUDY ---- */}
        <div className="mt-12">
          <CaseStudy />
        </div>

        {/* ---- 6. SYSTEM TOPOLOGY ---- */}
        <div className="mt-12">
          <ArchitectureDiagram />
        </div>

        {/* ---- 7. LIVE MODULES RACK ---- */}
        <section id="services" className="mt-12 scroll-mt-6">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b-2 border-slate-800 pb-4">
            <div>
              <div className="badge-console">
                <span>📦</span> DEPLOYED MICROSERVICES
              </div>
              <h2 className="mt-2 font-display text-2xl font-black text-[#F3F0E9] md:text-3xl">
                LIVE AZURE AI MODULES
              </h2>
            </div>
            <span className="font-mono text-xs text-slate-400">
              {services.length} deployments · interactive card controls
            </span>
          </div>

          <div className="mt-6">
            <ServiceGrid />
          </div>
        </section>

        {/* ---- 8. SCORECARD (Uneven Bento Weights: 2 Large + 3 Small) ---- */}
        <div className="mt-12">
          <CapstoneScorecard />
        </div>
      </div>

      {/* ---- 9. FOOTER: Dot-Matrix LED Readout Marquee ---- */}
      <footer className="dot-matrix overflow-hidden py-3 text-center">
        <div className="ticker" aria-hidden>
          {TICKER}
          {TICKER}
        </div>
        <p className="sr-only">
          CivicPulse — Season of AI 2.0 Capstone built with Azure OpenAI, AI Search, Speech, Vision, and Language.
        </p>
      </footer>

      <LucidLoader />
      <OnboardingTour />
    </main>
  );
}

export default Index;
