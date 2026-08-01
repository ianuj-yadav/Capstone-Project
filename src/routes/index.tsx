import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { ServiceGrid, services } from "@/components/ServiceGrid";
import { OnboardingTour } from "@/components/OnboardingTour";
import { LucidLoader } from "@/components/LucidLoader";
import { CaseStudy } from "@/components/CaseStudy";
import { PipelineSimulator } from "@/components/PipelineSimulator";
import { ArchitectureDiagram } from "@/components/ArchitectureDiagram";
import { CapstoneScorecard } from "@/components/CapstoneScorecard";

const DispatchPipe3D = lazy(() => import("@/components/DispatchPipe3D"));

function DispatchPipeFallback() {
  return (
    <div className="glass-panel relative flex h-[360px] w-full flex-col items-center justify-center p-6 text-center font-mono">
      <p className="font-display text-xl font-bold text-cyan-400">
        AZURE AI NEURAL RING 3D
      </p>
      <p className="mt-2 text-xs font-bold text-slate-400">
        [INITIALIZING 3D PIPELINE CONDUIT...]
      </p>
    </div>
  );
}

function ClientDispatchPipe3D({ activeStage, onSelectStage }: { activeStage: number; onSelectStage: (idx: number) => void }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return <DispatchPipeFallback />;

  return (
    <Suspense fallback={<DispatchPipeFallback />}>
      <DispatchPipe3D activeStageIndex={activeStage} onSelectStage={onSelectStage} />
    </Suspense>
  );
}

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

export function Index() {
  const [activeStage, setActiveStage] = useState(0);

  return (
    <main className="relative min-h-screen bg-[#080B11] text-[#F8FAFC] selection:bg-cyan-500 selection:text-black">
      {/* Animated Multi-Color Aurora Mesh Background Layer */}
      <div className="aurora-canvas" aria-hidden="true">
        <div className="aurora-glow-1" />
        <div className="aurora-glow-2" />
        <div className="aurora-glow-3" />
      </div>

      {/* Floating Translucent Top Header */}
      <header className="glass-header sticky top-0 z-40 px-4 py-3.5 md:px-8">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="font-display text-2xl font-black tracking-tight text-white md:text-3xl">
              Civic<span className="text-cyan-400">Pulse</span>
            </h1>
            <span className="rounded-full bg-cyan-500/20 border border-cyan-500/30 px-3 py-0.5 text-xs font-extrabold text-cyan-300 font-mono">
              AZURE AI CAPSTONE v2.0
            </span>
            <span className="hidden text-xs text-slate-400 font-medium md:inline">
              Season of AI 2.0 · Final Showcase
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <span className="badge-glass text-emerald-400">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" /> SYSTEM ONLINE
            </span>
            <span className="badge-glass text-cyan-400">05 AZURE SERVICES</span>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-8 lg:px-8 lg:py-12">
        {/* ---- 1. HERO SECTION ---- */}
        <section aria-label="Hero Showcase" className="relative">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center"
          >
            <div className="flex flex-col justify-between lg:col-span-6">
              <div>
                <motion.div
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="badge-glass text-cyan-400 font-mono font-bold"
                >
                  <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
                  MUNICIPAL EMERGENCY TRIAGE OPERATOR
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="mt-4 font-display text-4xl font-black leading-tight text-white sm:text-5xl md:text-6xl"
                >
                  A city hears every hazard.
                  <br />
                  <span className="gradient-text">And answers in seconds.</span>
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mt-5 max-w-xl text-base leading-relaxed text-slate-300 font-normal"
                >
                  Residents report broken pipes, live wires, and flooded underpasses via voice notes & photos.
                  CivicPulse transcribes, analyzes evidence, scores urgency, cites municipal bylaws, and drafts work orders — 5 Azure AI microservices acting as one operator.
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-8 flex flex-wrap items-center gap-4"
              >
                <a className="btn-aurora text-base" href="#simulator">
                  LAUNCH DISPATCH SIMULATOR
                  <span>↓</span>
                </a>

                <a className="btn-glass text-base" href="#services">
                  EXPLORE 5 MODULES
                  <span>→</span>
                </a>
              </motion.div>
            </div>

            {/* ---- 2. SIGNATURE 3D NEURAL RING STAGE ---- */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="lg:col-span-6"
            >
              <ClientDispatchPipe3D
                activeStage={activeStage}
                onSelectStage={(idx) => setActiveStage(idx)}
              />
            </motion.div>
          </motion.div>
        </section>

        {/* ---- 3. PIPELINE DETAIL BENTO STRIP ---- */}
        <section aria-label="Pipeline Detail Strip" className="mt-12">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-700/60 pb-4">
            <div>
              <div className="badge-glass text-cyan-400">
                <span>⚡</span> MICROSERVICE PIPELINE STRIP
              </div>
              <h3 className="mt-2 font-display text-xl font-bold text-white md:text-2xl">
                5-STAGE AZURE AI DATA HIGHWAY
              </h3>
            </div>
            <span className="text-xs text-slate-400 font-mono">
              Click a card to activate stage on 3D conduit
            </span>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5 font-mono">
            {[
              { idx: 0, name: "Speech STT", azure: "Azure Speech", desc: "12s voice note in → Transcript out", color: "bg-blue-500" },
              { idx: 1, name: "Vision Evidence", azure: "Azure Vision", desc: "Photo input → OCR & Hazard tags", color: "bg-emerald-500" },
              { idx: 2, name: "Language Triage", azure: "Azure Language", desc: "Sentiment & Severity scoring", color: "bg-purple-500" },
              { idx: 3, name: "RAG Search", azure: "AI Search", desc: "Bylaw citation & 4h SLA match", color: "bg-amber-500" },
              { idx: 4, name: "OpenAI Dispatch", azure: "Azure OpenAI", desc: "Work Order WO-9482 + Resident SMS", color: "bg-rose-500" },
            ].map((st) => {
              const isActive = activeStage === st.idx;
              return (
                <button
                  key={st.name}
                  type="button"
                  onClick={() => setActiveStage(st.idx)}
                  className={`glass-card relative overflow-hidden flex flex-col justify-between p-4 text-left cursor-pointer transition-all ${
                    isActive ? "ring-2 ring-cyan-400 scale-[1.03] shadow-lg shadow-cyan-500/20" : ""
                  }`}
                >
                  <div className={`absolute top-0 left-0 right-0 h-1.5 ${st.color}`} />
                  <div>
                    <div className="flex items-center justify-between text-[10px] font-bold text-slate-400">
                      <span>STAGE 0{st.idx + 1}</span>
                      {isActive && <span className="bg-cyan-500 text-black font-extrabold px-2 py-0.5 rounded-full">ACTIVE</span>}
                    </div>
                    <h4 className="mt-2 font-display text-base font-bold text-white">{st.name}</h4>
                    <p className="text-[11px] font-medium text-slate-400">{st.azure}</p>
                  </div>

                  <div className="mt-4 border-t border-slate-700/60 pt-2 text-[10px] text-slate-300 leading-tight">
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
        <section id="services" className="mt-12 scroll-mt-24">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-slate-700/60 pb-4">
            <div>
              <div className="badge-glass text-cyan-400">
                <span>📦</span> DEPLOYED MICROSERVICES
              </div>
              <h2 className="mt-2 font-display text-2xl font-bold text-white md:text-3xl">
                LIVE AZURE AI MODULES
              </h2>
            </div>
            <span className="text-xs text-slate-400 font-mono">
              {services.length} deployments · interactive card controls
            </span>
          </div>

          <div className="mt-6">
            <ServiceGrid />
          </div>
        </section>

        {/* ---- 8. SCORECARD BENTO MATRIX ---- */}
        <div className="mt-12">
          <CapstoneScorecard />
        </div>
      </div>

      {/* ---- 9. FOOTER ---- */}
      <footer className="border-t border-slate-800 bg-slate-950/80 backdrop-blur-md py-6 text-center text-xs text-slate-400 font-mono">
        <div className="mx-auto max-w-7xl px-4 flex flex-wrap items-center justify-between gap-4">
          <p className="font-medium">
            CivicPulse © 2026 · Season of AI 2.0 Final Capstone Project
          </p>
          <div className="flex items-center gap-3">
            <span className="badge-glass text-cyan-400">AZURE OPENAI</span>
            <span className="badge-glass text-emerald-400">AI SEARCH</span>
            <span className="badge-glass text-blue-400">AZURE SPEECH</span>
          </div>
        </div>
      </footer>

      <LucidLoader />
      <OnboardingTour />
    </main>
  );
}

export default Index;
