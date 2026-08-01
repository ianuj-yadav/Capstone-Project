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
    <div className="card-cyber relative flex h-[360px] w-full flex-col items-center justify-center p-6 text-center font-mono bg-[#E5E2D9]">
      <p className="font-display text-xl font-bold text-blue-600">
        AZURE AI NEURAL RING 3D
      </p>
      <p className="mt-2 text-xs font-bold text-slate-800">
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
    <main className="relative min-h-screen bg-[#F4F2EC] text-[#0B0F19] selection:bg-blue-600 selection:text-white">
      {/* Deep Void Ink Sticky Top Header */}
      <header className="sticky top-0 z-40 border-b-2 border-[#0B0F19] bg-[#0B0F19] px-4 py-3.5 text-white shadow-lg md:px-8">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="font-display text-2xl font-black tracking-tight text-white md:text-3xl">
              Civic<span className="text-blue-500">Pulse</span>
            </h1>
            <span className="rounded-lg bg-blue-600 border-2 border-blue-400 px-3 py-0.5 text-xs font-extrabold text-white font-mono shadow-[2px_2px_0px_#000]">
              AZURE AI CAPSTONE v2.0
            </span>
            <span className="hidden text-xs text-slate-300 font-medium md:inline">
              Season of AI 2.0 · Final Showcase
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <span className="badge-cyber text-emerald-400 border-emerald-400">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" /> SYSTEM ONLINE
            </span>
            <span className="badge-cyber text-cyan-300 border-cyan-400">05 AZURE SERVICES</span>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-8 lg:px-8 lg:py-12">
        {/* ---- 1. HERO SECTION ---- */}
        <section aria-label="Hero Showcase" className="relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center"
          >
            <div className="flex flex-col justify-between lg:col-span-6">
              <div>
                <motion.div
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="badge-cyber text-blue-400"
                >
                  <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                  MUNICIPAL EMERGENCY TRIAGE OPERATOR
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="mt-4 font-display text-4xl font-black leading-tight text-[#0B0F19] sm:text-5xl md:text-6xl"
                >
                  A city hears every hazard.
                  <br />
                  <span className="text-blue-600">And answers in seconds.</span>
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mt-5 max-w-xl text-base leading-relaxed text-slate-800 font-medium"
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
                <a className="btn-cyber-primary text-base" href="#simulator">
                  LAUNCH DISPATCH SIMULATOR
                  <span>↓</span>
                </a>

                <a className="btn-cyber-secondary text-base" href="#services">
                  EXPLORE 5 MODULES
                  <span>→</span>
                </a>
              </motion.div>
            </div>

            {/* ---- 2. SIGNATURE 3D NEURAL RING STAGE ---- */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
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
        <section aria-label="Pipeline Detail Strip" className="mt-12 rounded-2xl bg-[#0B0F19] p-6 text-white border-2 border-[#0B0F19] shadow-[6px_6px_0px_0px_#2563EB]">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-slate-800 pb-4">
            <div>
              <div className="badge-cyber text-blue-400 border-blue-500">
                <span>⚡</span> MICROSERVICE PIPELINE STRIP
              </div>
              <h3 className="mt-2 font-display text-xl font-bold text-white md:text-2xl">
                5-STAGE AZURE AI DATA HIGHWAY
              </h3>
            </div>
            <span className="text-xs text-slate-300 font-mono">
              Click a card to activate stage on 3D conduit
            </span>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5 font-mono">
            {[
              { idx: 0, name: "Speech STT", azure: "Azure Speech", desc: "12s voice note in → Transcript out", color: "bg-blue-600" },
              { idx: 1, name: "Vision Evidence", azure: "Azure Vision", desc: "Photo input → OCR & Hazard tags", color: "bg-emerald-600" },
              { idx: 2, name: "Language Triage", azure: "Azure Language", desc: "Sentiment & Severity scoring", color: "bg-purple-600" },
              { idx: 3, name: "RAG Search", azure: "AI Search", desc: "Bylaw citation & 4h SLA match", color: "bg-amber-600" },
              { idx: 4, name: "OpenAI Dispatch", azure: "Azure OpenAI", desc: "Work Order WO-9482 + Resident SMS", color: "bg-red-600" },
            ].map((st) => {
              const isActive = activeStage === st.idx;
              return (
                <button
                  key={st.name}
                  type="button"
                  onClick={() => setActiveStage(st.idx)}
                  className={`relative overflow-hidden rounded-xl p-4 text-left cursor-pointer transition-all border-2 ${
                    isActive
                      ? "bg-slate-800 border-blue-500 scale-[1.03] shadow-[4px_4px_0px_#2563EB]"
                      : "bg-slate-900 border-slate-700 hover:bg-slate-800"
                  }`}
                >
                  <div className={`absolute top-0 left-0 right-0 h-1.5 ${st.color}`} />
                  <div>
                    <div className="flex items-center justify-between text-[10px] font-bold text-slate-400">
                      <span>STAGE 0{st.idx + 1}</span>
                      {isActive && <span className="bg-blue-600 text-white px-2 py-0.5 rounded-full font-bold">ACTIVE</span>}
                    </div>
                    <h4 className="mt-2 font-display text-base font-bold text-white">{st.name}</h4>
                    <p className="text-[11px] font-medium text-slate-300">{st.azure}</p>
                  </div>

                  <div className="mt-4 border-t border-slate-700 pt-2 text-[10px] text-slate-300 leading-tight">
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
          <div className="flex flex-wrap items-end justify-between gap-4 border-b-2 border-[#0B0F19] pb-4">
            <div>
              <div className="badge-cyber text-blue-400">
                <span>📦</span> DEPLOYED MICROSERVICES
              </div>
              <h2 className="mt-2 font-display text-2xl font-bold text-[#0B0F19] md:text-3xl">
                LIVE AZURE AI MODULES
              </h2>
            </div>
            <span className="text-xs text-slate-700 font-mono font-bold">
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
      <footer className="border-t-2 border-[#0B0F19] bg-[#0B0F19] py-6 text-center text-xs text-slate-300 font-mono">
        <div className="mx-auto max-w-7xl px-4 flex flex-wrap items-center justify-between gap-4">
          <p className="font-bold">
            CivicPulse © 2026 · Season of AI 2.0 Final Capstone Project
          </p>
          <div className="flex items-center gap-3">
            <span className="badge-cyber text-blue-400">AZURE OPENAI</span>
            <span className="badge-cyber text-emerald-400">AI SEARCH</span>
            <span className="badge-cyber text-blue-400">AZURE SPEECH</span>
          </div>
        </div>
      </footer>

      <LucidLoader />
      <OnboardingTour />
    </main>
  );
}

export default Index;
