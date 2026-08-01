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
    <div className="glass-light-panel relative flex h-[360px] w-full flex-col items-center justify-center p-6 text-center font-mono bg-[#F8FAFC]">
      <p className="font-display text-xl font-bold text-blue-600">
        AZURE AI NEURAL RING 3D
      </p>
      <p className="mt-2 text-xs font-bold text-slate-500">
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
    <main className="relative min-h-screen w-full overflow-hidden animated-gradient-bg text-[#0F172A] selection:bg-pink-500 selection:text-white">
      {/* 3D BACKGROUND LAYER (FIXED) */}
      <div className="fixed inset-0 z-0 opacity-80 mix-blend-multiply pointer-events-auto">
        <ClientDispatchPipe3D
          activeStage={activeStage}
          onSelectStage={(idx) => setActiveStage(idx)}
        />
      </div>

      {/* SCROLLABLE SPATIAL FOREGROUND */}
      <div className="absolute inset-0 z-10 overflow-y-auto overflow-x-hidden pt-20 pb-20">
        
        {/* Floating Glass Header */}
        <header className="glass-light-header fixed top-4 left-4 right-4 z-40 mx-auto max-w-7xl rounded-[2rem] px-6 py-4 transition-all hover:scale-[1.01]">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3"
            >
              <h1 className="font-display text-2xl md:text-4xl font-black tracking-tighter text-gradient-vibrant drop-shadow-sm">
                CivicPulse
              </h1>
              <span className="badge-saas">
                <span className="h-2 w-2 rounded-full bg-pink-500 animate-pulse" />
                AZURE AI CAPSTONE v2.0
              </span>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-wrap items-center gap-2.5"
            >
              <span className="badge-saas text-pink-600 border-pink-200">
                <span className="h-2 w-2 rounded-full bg-pink-600 animate-ping" /> SPATIAL SYSTEM ONLINE
              </span>
            </motion.div>
          </div>
        </header>

        {/* Main Content Container */}
        <div className="relative mx-auto max-w-7xl px-4 mt-20 lg:px-8">
          
          {/* ---- 1. HERO SECTION ---- */}
          <section aria-label="Hero Showcase" className="relative flex flex-col items-center justify-center min-h-[70vh] text-center pt-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
              className="glass-light-panel p-10 md:p-16 max-w-4xl mx-auto backdrop-blur-[40px]"
            >
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="badge-saas text-indigo-700 font-mono font-bold mb-6 mx-auto"
              >
                <span className="h-2 w-2 rounded-full bg-indigo-600 animate-pulse" />
                MUNICIPAL EMERGENCY TRIAGE OPERATOR
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, type: "spring" }}
                className="font-display text-5xl sm:text-7xl md:text-8xl font-black leading-[0.9] tracking-tighter uppercase text-slate-900"
                style={{ textShadow: "0 10px 30px rgba(255,255,255,0.8)" }}
              >
                A city hears <br/> <span className="text-gradient-vibrant">every hazard.</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-8 mx-auto max-w-2xl text-lg md:text-xl leading-relaxed text-slate-800 font-medium"
              >
                Residents report broken pipes, live wires, and flooded underpasses via voice notes & photos.
                CivicPulse transcribes, analyzes evidence, scores urgency, cites municipal bylaws, and drafts work orders — 5 Azure AI microservices acting as one operator.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, type: "spring" }}
                className="mt-10 flex flex-wrap items-center justify-center gap-6"
              >
                <a className="btn-saas-primary text-lg" href="#simulator">
                  LAUNCH DISPATCH SIMULATOR
                </a>
              </motion.div>
            </motion.div>
          </section>

          {/* ---- 3. PIPELINE DETAIL BENTO STRIP ---- */}
          <section aria-label="Pipeline Detail Strip" className="mt-24 glass-light-panel p-8 md:p-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-white/50 pb-6 mb-8 text-center md:text-left">
              <div>
                <div className="badge-saas">
                  <span>⚡</span> MICROSERVICE PIPELINE STRIP
                </div>
                <h3 className="mt-4 font-display text-2xl font-black uppercase tracking-tight md:text-4xl">
                  5-Stage <span className="text-gradient-vibrant">Azure AI Highway</span>
                </h3>
              </div>
              <span className="text-sm font-bold text-indigo-600 bg-white/50 px-4 py-2 rounded-full shadow-sm">
                Click a card to activate stage on 3D conduit
              </span>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5 font-sans">
              {[
                { idx: 0, name: "Speech STT", azure: "Azure Speech", desc: "12s voice note in → Transcript out", color: "from-blue-400 to-indigo-500" },
                { idx: 1, name: "Vision Evidence", azure: "Azure Vision", desc: "Photo input → OCR & Hazard tags", color: "from-emerald-400 to-teal-500" },
                { idx: 2, name: "Language Triage", azure: "Azure Language", desc: "Sentiment & Severity scoring", color: "from-purple-400 to-pink-500" },
                { idx: 3, name: "RAG Search", azure: "AI Search", desc: "Bylaw citation & 4h SLA match", color: "from-amber-400 to-orange-500" },
                { idx: 4, name: "OpenAI Dispatch", azure: "Azure OpenAI", desc: "Work Order WO-9482 + Resident SMS", color: "from-rose-400 to-red-500" },
              ].map((st) => {
                const isActive = activeStage === st.idx;
                return (
                  <motion.button
                    whileHover={{ scale: 1.05, y: -10 }}
                    whileTap={{ scale: 0.95 }}
                    key={st.name}
                    type="button"
                    onClick={() => setActiveStage(st.idx)}
                    className={`glass-light-card relative overflow-hidden flex flex-col justify-between p-6 text-left cursor-pointer transition-all ${
                      isActive ? "ring-4 ring-pink-400 scale-[1.05] shadow-[0_20px_50px_-10px_rgba(236,72,153,0.3)]" : ""
                    }`}
                  >
                    <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${st.color}`} />
                    <div className="relative z-10">
                      <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-3 tracking-widest">
                        <span>STAGE 0{st.idx + 1}</span>
                        {isActive && <motion.span layoutId="active-badge" className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-3 py-1 rounded-full font-black text-[10px] shadow-lg">ACTIVE</motion.span>}
                      </div>
                      <h4 className="font-display text-xl font-black text-slate-900 leading-tight">{st.name}</h4>
                      <p className="text-sm font-bold text-indigo-600 mt-1">{st.azure}</p>
                    </div>

                    <div className="relative z-10 mt-6 pt-4 border-t border-slate-300/50 text-xs font-semibold text-slate-700 leading-relaxed">
                      {st.desc}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </section>

          {/* ---- 4. LIVE TRIAGE SIMULATOR ---- */}
          <div className="mt-24" id="simulator">
            <PipelineSimulator />
          </div>

          {/* ---- 5. CASE STUDY ---- */}
          <div className="mt-24">
            <CaseStudy />
          </div>

          {/* ---- 6. SYSTEM TOPOLOGY ---- */}
          <div className="mt-24">
            <ArchitectureDiagram />
          </div>

          {/* ---- 7. LIVE MODULES RACK ---- */}
          <section id="services" className="mt-24 scroll-mt-32">
            <div className="glass-light-panel p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-end justify-between gap-6 border-b border-white/50 pb-6 mb-8">
                <div>
                  <div className="badge-saas">
                    <span>📦</span> DEPLOYED MICROSERVICES
                  </div>
                  <h2 className="mt-4 font-display text-4xl font-black uppercase text-slate-900 md:text-5xl">
                    Live Azure <span className="text-gradient-vibrant">Modules</span>
                  </h2>
                </div>
                <span className="text-sm font-bold text-indigo-600 bg-white/50 px-4 py-2 rounded-full">
                  {services.length} deployments · immersive controls
                </span>
              </div>
              <ServiceGrid />
            </div>
          </section>

          {/* ---- 8. SCORECARD BENTO MATRIX ---- */}
          <div className="mt-24 mb-24">
            <CapstoneScorecard />
          </div>
        </div>

        {/* ---- 9. FOOTER ---- */}
        <footer className="glass-light-panel mx-4 lg:mx-auto max-w-7xl py-8 px-6 text-center text-sm font-bold text-slate-600 mb-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <p>
              CivicPulse © 2026 · Season of AI 2.0 Final Capstone Project
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <span className="badge-saas">AZURE OPENAI</span>
              <span className="badge-saas text-emerald-600">AI SEARCH</span>
              <span className="badge-saas text-indigo-600">AZURE SPEECH</span>
            </div>
          </div>
        </footer>

      </div>

      <LucidLoader />
      <OnboardingTour />
    </main>
  );
}

export default Index;
