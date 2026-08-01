import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export type IncidentPreset = {
  id: string;
  name: string;
  category: string;
  location: string;
  ward: string;
  voiceText: string;
  imageTags: string[];
  ocrText: string;
  bylawSop: string;
  slaHours: number;
};

const PRESETS: IncidentPreset[] = [
  {
    id: "water_leak",
    name: "Burst Water Main",
    category: "Water Supply & Plumbing",
    location: "42 Marine Drive, Ward 6",
    ward: "Ward 6",
    voiceText: "Emergency! Water is gushing out of the pipe outside 42 Marine Drive since 6 AM. The sidewalk is completely submerged.",
    imageTags: ["water_leak", "submerged_footpath", "damaged_pipe"],
    ocrText: "MUNICIPAL WATER VALVE #W-4821 - WARD 6",
    bylawSop: "SOP-14 §3.2 — Main Line Ruptures & Water Losses",
    slaHours: 2,
  },
  {
    id: "power_hazard",
    name: "Fallen Live Power Cable",
    category: "Electrical & Public Safety",
    location: "Corner of Oak St & 5th Ave",
    ward: "Ward 2",
    voiceText: "A heavy tree branch broke and dragged a live electrical wire down onto the pedestrian road. Sparks are flying!",
    imageTags: ["fallen_wire", "tree_branch", "spark_hazard"],
    ocrText: "HIGH VOLTAGE - UTILITY POLE #E-910",
    bylawSop: "SOP-09 §1.1 — High-Voltage Electrical Hazard Emergencies",
    slaHours: 1,
  },
  {
    id: "road_flooding",
    name: "Clogged Drain & Road Flooding",
    category: "Drainage & Roads",
    location: "Underpass at Sector 14",
    ward: "Ward 11",
    voiceText: "Heavy rain has flooded the underpass. Cars are stuck in 3 feet of water because the storm drain is blocked with debris.",
    imageTags: ["flooded_road", "blocked_drain", "stranded_vehicles"],
    ocrText: "DRAINAGE OUTLET #D-114",
    bylawSop: "SOP-22 §4.5 — Stormwater Clearing & Traffic Obstruction",
    slaHours: 3,
  },
];

export function PipelineSimulator() {
  const [selectedPreset, setSelectedPreset] = useState<IncidentPreset>(PRESETS[0]!);
  const [customText, setCustomText] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [executionTime, setExecutionTime] = useState<number>(0);
  const [completed, setCompleted] = useState(false);

  const activeInputText = customText.trim() || selectedPreset.voiceText;

  const handleRunPipeline = () => {
    setIsRunning(true);
    setCurrentStep(1);
    setExecutionTime(0);
    setCompleted(false);
  };

  useEffect(() => {
    if (!isRunning) return;

    const timer = setInterval(() => {
      setExecutionTime((prev) => prev + 100);
    }, 100);

    const stepTimer = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= 5) {
          setIsRunning(false);
          setCompleted(true);
          clearInterval(stepTimer);
          clearInterval(timer);
          return 5;
        }
        return prev + 1;
      });
    }, 800);

    return () => {
      clearInterval(timer);
      clearInterval(stepTimer);
    };
  }, [isRunning]);

  return (
    <section
      id="simulator"
      aria-label="Live Pipeline Simulator"
      className="scroll-mt-6 border-t-3 border-[#000000] bg-[#0B0C0E] p-6 md:p-10"
    >
      <div className="flex flex-wrap items-end justify-between gap-4 border-b-2 border-slate-800 pb-6">
        <div>
          <div className="badge-console">
            <span>⚡</span> INTERACTIVE CONSOLE
          </div>
          <h2 className="mt-2 font-display text-2xl font-black text-[#F3F0E9] md:text-4xl">
            LIVE 5-SERVICE TRIAGE SIMULATOR
          </h2>
          <p className="mt-2 max-w-2xl font-mono text-xs text-slate-400">
            Trigger a real-world municipal hazard report or type custom resident input. Watch Azure AI Speech, Vision, Language, Search (RAG), and OpenAI execute in real-time sequence.
          </p>
        </div>

        <div className="flex items-center gap-2 border-2 border-[#C9F031] bg-[#12141A] px-3 py-1.5 font-mono text-xs font-bold text-[#C9F031]">
          <span className="h-2.5 w-2.5 bg-[#C9F031] animate-pulse" />
          DISPATCH ENGINE READY
        </div>
      </div>

      {/* Preset Selector Buttons */}
      <div className="mt-6 flex flex-wrap gap-3">
        {PRESETS.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => {
              setSelectedPreset(p);
              setCustomText("");
              setCompleted(false);
              setCurrentStep(0);
            }}
            className={`font-mono text-xs font-bold uppercase transition-all px-4 py-2.5 border-3 border-[#000000] ${
              selectedPreset.id === p.id && !customText
                ? "bg-[#C9F031] text-[#000000] shadow-[4px_4px_0px_#000000]"
                : "bg-[#F3F0E9] text-[#000000] hover:bg-[#ffffff]"
            }`}
          >
            {p.name}
          </button>
        ))}
      </div>

      {/* Console Input Container */}
      <div className="mt-4 card-paper p-6">
        <label htmlFor="custom-voice" className="font-mono text-xs font-bold uppercase text-[#0B0C0E]">
          [CONSOLE INPUT] Resident Voice / Text Report
        </label>
        <textarea
          id="custom-voice"
          rows={2}
          value={customText}
          onChange={(e) => setCustomText(e.target.value)}
          placeholder={`Type custom report... (Default: "${selectedPreset.voiceText}")`}
          className="mt-2 w-full border-2 border-[#000000] bg-[#ffffff] p-3 font-mono text-xs text-[#0B0C0E] focus:outline-none focus:ring-2 focus:ring-[#FF3B1F]"
        />

        <div className="mt-4 flex flex-wrap items-center justify-between gap-4 border-t-2 border-slate-300 pt-4 font-mono text-xs">
          <div className="flex flex-wrap items-center gap-4 text-slate-700">
            <span>LOCATION: <strong className="text-[#0B0C0E] font-bold">{selectedPreset.location}</strong></span>
            <span>TARGET SLA: <strong className="text-[#FF3B1F] font-bold">{selectedPreset.slaHours} HOURS</strong></span>
          </div>

          <button
            type="button"
            onClick={handleRunPipeline}
            disabled={isRunning}
            className="btn-dispatch disabled:opacity-50"
          >
            {isRunning ? (
              <>
                <span className="h-3 w-3 border-2 border-black border-t-transparent animate-spin" />
                EXECUTING ({ (executionTime / 1000).toFixed(1) }s)...
              </>
            ) : (
              <>
                RUN 5-SERVICE PIPELINE
                <span>→</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Progress Pipeline Steps */}
      <div className="mt-8 grid grid-cols-1 gap-3 md:grid-cols-5 font-mono">
        {[
          { step: 1, name: "1. SPEECH STT", azure: "Azure Speech", icon: "🎙️", stripe: "bg-[#2B6EFF]" },
          { step: 2, name: "2. VISION OCR", azure: "Azure Vision", icon: "🖼️", stripe: "bg-[#C9F031]" },
          { step: 3, name: "3. LANGUAGE", azure: "Azure Language", icon: "📊", stripe: "bg-[#A855F7]" },
          { step: 4, name: "4. RAG SEARCH", azure: "AI Search", icon: "📚", stripe: "bg-[#F59E0B]" },
          { step: 5, name: "5. OPENAI DISPATCH", azure: "Azure OpenAI", icon: "⚡", stripe: "bg-[#FF3B1F]" },
        ].map((st) => {
          const isActive = currentStep === st.step && isRunning;
          const isDone = currentStep > st.step || completed;
          return (
            <div
              key={st.step}
              className={`relative overflow-hidden border-3 border-[#000000] p-4 transition-all ${
                isActive
                  ? "bg-[#C9F031] text-[#000000] shadow-[6px_6px_0px_#000000]"
                  : isDone
                    ? "bg-[#F3F0E9] text-[#000000] border-emerald-500 shadow-[4px_4px_0px_#000000]"
                    : "bg-[#12141A] text-slate-400 opacity-70 border-slate-800"
              }`}
            >
              <div className={`absolute top-0 left-0 right-0 h-1.5 ${st.stripe}`} />
              <div className="flex items-center justify-between">
                <span className="text-base">{st.icon}</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 border border-black ${
                  isDone ? "bg-black text-[#C9F031]" : isActive ? "bg-[#FF3B1F] text-white" : "bg-slate-800 text-slate-400"
                }`}>
                  {isDone ? "DONE" : isActive ? "ACTIVE" : "WAIT"}
                </span>
              </div>
              <h4 className="mt-2 font-display text-sm font-black">{st.name}</h4>
              <p className="text-[10px] font-bold opacity-80">{st.azure}</p>
            </div>
          );
        })}
      </div>

      {/* Execution Results Output Display */}
      {(currentStep > 0 || completed) && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 card-paper p-6"
        >
          <div className="flex items-center justify-between border-b-2 border-slate-300 pb-4 font-mono">
            <div>
              <h3 className="font-display text-lg font-black text-[#0B0C0E]">
                LIVE DISPATCH OUTPUT STREAM
              </h3>
              <p className="text-xs text-slate-600">
                Data generated by 5 Azure AI microservices in sequence
              </p>
            </div>
            <span className="border-2 border-black bg-black px-3 py-1 text-xs font-bold text-[#C9F031]">
              {completed ? `EXECUTION FINISHED (${(executionTime / 1000).toFixed(2)}s)` : `STEP ${currentStep} OF 5`}
            </span>
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3 font-mono">
            {/* Step 1: Speech Result */}
            {currentStep >= 1 && (
              <div className="border-2 border-black bg-white p-4">
                <div className="flex items-center justify-between text-xs font-bold border-b border-slate-200 pb-2">
                  <span className="text-[#2B6EFF]">1. AZURE SPEECH STT</span>
                  <span>CONF: 0.96</span>
                </div>
                <p className="mt-2 text-[11px] font-bold text-slate-500">TRANSCRIPT:</p>
                <p className="mt-1 text-xs text-slate-900 bg-slate-100 p-2.5 border border-slate-300 italic">
                  "{activeInputText}"
                </p>
              </div>
            )}

            {/* Step 2: Vision Result */}
            {currentStep >= 2 && (
              <div className="border-2 border-black bg-white p-4">
                <div className="flex items-center justify-between text-xs font-bold border-b border-slate-200 pb-2">
                  <span className="text-[#C9F031] bg-black px-1.5 py-0.5">2. AZURE VISION</span>
                  <span>OCR MATCH</span>
                </div>
                <p className="mt-2 text-[11px] font-bold text-slate-500">OCR SIGNAGE TEXT:</p>
                <p className="mt-1 text-xs text-slate-900 bg-slate-100 p-2.5 border border-slate-300">
                  {selectedPreset.ocrText}
                </p>
                <div className="mt-2 flex flex-wrap gap-1">
                  {selectedPreset.imageTags.map((t) => (
                    <span key={t} className="bg-black text-[#C9F031] px-1.5 py-0.5 text-[10px] font-bold">
                      #{t}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Language Result */}
            {currentStep >= 3 && (
              <div className="border-2 border-black bg-white p-4">
                <div className="flex items-center justify-between text-xs font-bold border-b border-slate-200 pb-2">
                  <span className="text-[#A855F7]">3. AZURE LANGUAGE</span>
                  <span className="bg-[#FF3B1F] text-white px-1.5 py-0.5 font-black">HIGH URGENCY</span>
                </div>
                <p className="mt-2 text-[11px] font-bold text-slate-500">TRIAGE CLASSIFICATION:</p>
                <ul className="mt-1 space-y-1 text-xs text-slate-900 bg-slate-100 p-2.5 border border-slate-300">
                  <li>Category: {selectedPreset.category}</li>
                  <li>Location: {selectedPreset.location}</li>
                  <li>Sentiment: Urgent (0.89)</li>
                </ul>
              </div>
            )}

            {/* Step 4: RAG Result */}
            {currentStep >= 4 && (
              <div className="border-2 border-black bg-white p-4">
                <div className="flex items-center justify-between text-xs font-bold border-b border-slate-200 pb-2">
                  <span className="text-[#F59E0B]">4. AI SEARCH (RAG)</span>
                  <span>SOP MATCH</span>
                </div>
                <p className="mt-2 text-[11px] font-bold text-slate-500">SOP BYLAW CITATION:</p>
                <p className="mt-1 text-xs text-slate-900 bg-slate-100 p-2.5 border border-slate-300">
                  {selectedPreset.bylawSop}
                  <br />
                  <strong className="text-[#FF3B1F]">MANDATORY RESPONSE SLA: {selectedPreset.slaHours} HOURS</strong>
                </p>
              </div>
            )}

            {/* Step 5: OpenAI Output */}
            {currentStep >= 5 && (
              <div className="border-3 border-black bg-[#FF3B1F] text-black p-4 md:col-span-2 lg:col-span-2 shadow-[6px_6px_0px_#000000]">
                <div className="flex items-center justify-between text-xs font-black border-b-2 border-black pb-2">
                  <span>5. AZURE OPENAI DISPATCH GENERATOR</span>
                  <span className="bg-black text-[#C9F031] px-2 py-0.5 font-bold">WORK ORDER WO-9482</span>
                </div>

                <div className="mt-3 grid gap-3 md:grid-cols-2">
                  <div className="bg-[#F3F0E9] p-3 border-2 border-black">
                    <p className="text-[10px] font-bold text-slate-600">GENERATED DISPATCH WORK ORDER</p>
                    <p className="mt-1 text-xs text-[#0B0C0E] leading-relaxed">
                      <strong>Crew Assigned:</strong> Municipal Emergency Team B<br />
                      <strong>Action:</strong> Isolate main valve, clear hazard obstruction, broadcast public safety notice.<br />
                      <strong>Bylaw Citation:</strong> {selectedPreset.bylawSop}
                    </p>
                  </div>

                  <div className="bg-[#F3F0E9] p-3 border-2 border-black">
                    <p className="text-[10px] font-bold text-slate-600">AUTOMATED RESIDENT SMS</p>
                    <p className="mt-1 text-xs text-[#0B0C0E] italic leading-relaxed">
                      "Thank you for reporting. Your hazard report (#{selectedPreset.id}-9482) at {selectedPreset.location} is registered. Crews dispatched under {selectedPreset.bylawSop} with a {selectedPreset.slaHours}h SLA."
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </section>
  );
}

export default PipelineSimulator;
