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
      className="card-cyber scroll-mt-24 p-6 md:p-10"
    >
      <div className="flex flex-wrap items-end justify-between gap-4 border-b-2 border-[#0B0F19] pb-6">
        <div>
          <div className="badge-cyber text-blue-400">
            <span>⚡</span> INTERACTIVE CONSOLE
          </div>
          <h2 className="mt-2 font-display text-2xl font-black tracking-tight text-[#0B0F19] md:text-3xl">
            LIVE 5-SERVICE TRIAGE SIMULATOR
          </h2>
          <p className="mt-1.5 max-w-2xl text-xs text-slate-700 font-medium">
            Trigger a real-world municipal hazard report or type custom resident input. Watch Azure AI Speech, Vision, Language, Search (RAG), and OpenAI execute in real-time sequence.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-lg border-2 border-[#0B0F19] bg-emerald-400 px-4 py-2 text-xs font-black text-black shadow-[3px_3px_0px_#0B0F19]">
          <span className="h-2.5 w-2.5 rounded-full bg-black animate-ping" />
          DISPATCH ENGINE READY
        </div>
      </div>

      {/* Preset Selector Pill Buttons */}
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
            className={`px-4 py-2.5 text-xs font-black rounded-xl transition-all border-2 border-[#0B0F19] ${
              selectedPreset.id === p.id && !customText
                ? "bg-blue-600 text-white shadow-[3px_3px_0px_#0B0F19]"
                : "bg-white text-[#0B0F19] hover:bg-slate-100 shadow-[2px_2px_0px_#0B0F19]"
            }`}
          >
            {p.name}
          </button>
        ))}
      </div>

      {/* Console Input Container */}
      <div className="mt-6 rounded-xl border-2 border-[#0B0F19] bg-[#F4F2EC] p-6 shadow-[4px_4px_0px_#0B0F19]">
        <label htmlFor="custom-voice" className="text-xs font-extrabold uppercase tracking-wide text-[#0B0F19]">
          [CONSOLE INPUT] Resident Voice / Text Report
        </label>
        <textarea
          id="custom-voice"
          rows={2}
          value={customText}
          onChange={(e) => setCustomText(e.target.value)}
          placeholder={`Type custom report... (Default: "${selectedPreset.voiceText}")`}
          className="mt-2 w-full rounded-lg border-2 border-[#0B0F19] bg-white p-3.5 font-mono text-xs text-[#0B0F19] font-bold focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-inner"
        />

        <div className="mt-4 flex flex-wrap items-center justify-between gap-4 border-t-2 border-[#0B0F19] pt-4 text-xs font-bold">
          <div className="flex flex-wrap items-center gap-4 text-slate-800">
            <span>LOCATION: <strong className="text-[#0B0F19] font-black">{selectedPreset.location}</strong></span>
            <span>TARGET SLA: <strong className="text-red-600 font-black">{selectedPreset.slaHours} HOURS</strong></span>
          </div>

          <button
            type="button"
            onClick={handleRunPipeline}
            disabled={isRunning}
            className="btn-cyber-primary disabled:opacity-50"
          >
            {isRunning ? (
              <>
                <span className="h-3 w-3 rounded-full border-2 border-white border-t-transparent animate-spin" />
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
      <div className="mt-8 grid grid-cols-1 gap-3 md:grid-cols-5 text-xs font-mono font-bold">
        {[
          { step: 1, name: "1. SPEECH STT", azure: "Azure Speech", icon: "🎙️", color: "bg-blue-600" },
          { step: 2, name: "2. VISION OCR", azure: "Azure Vision", icon: "🖼️", color: "bg-emerald-600" },
          { step: 3, name: "3. LANGUAGE", azure: "Azure Language", icon: "📊", color: "bg-purple-600" },
          { step: 4, name: "4. RAG SEARCH", azure: "AI Search", icon: "📚", color: "bg-amber-600" },
          { step: 5, name: "5. OPENAI DISPATCH", azure: "Azure OpenAI", icon: "⚡", color: "bg-red-600" },
        ].map((st) => {
          const isActive = currentStep === st.step && isRunning;
          const isDone = currentStep > st.step || completed;
          return (
            <div
              key={st.step}
              className={`relative overflow-hidden rounded-xl p-4 transition-all border-2 border-[#0B0F19] ${
                isActive
                  ? "bg-white text-[#0B0F19] shadow-[4px_4px_0px_#2563EB] scale-105"
                  : isDone
                    ? "bg-[#E5E2D9] text-[#0B0F19] shadow-[3px_3px_0px_#0B0F19]"
                    : "bg-white text-slate-400 opacity-80"
              }`}
            >
              <div className={`absolute top-0 left-0 right-0 h-1.5 ${st.color}`} />
              <div className="flex items-center justify-between mt-1">
                <span className="text-base">{st.icon}</span>
                <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md border border-[#0B0F19] ${
                  isDone ? "bg-emerald-400 text-black" : isActive ? "bg-blue-600 text-white" : "bg-slate-200 text-slate-600"
                }`}>
                  {isDone ? "DONE" : isActive ? "ACTIVE" : "WAIT"}
                </span>
              </div>
              <h4 className="mt-2 font-display text-sm font-black text-[#0B0F19]">{st.name}</h4>
              <p className="text-[10px] text-slate-700 font-mono">{st.azure}</p>
            </div>
          );
        })}
      </div>

      {/* Execution Results Output Display */}
      {(currentStep > 0 || completed) && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 rounded-xl border-2 border-[#0B0F19] bg-[#F4F2EC] p-6 shadow-[4px_4px_0px_#0B0F19]"
        >
          <div className="flex items-center justify-between border-b-2 border-[#0B0F19] pb-4">
            <div>
              <h3 className="font-display text-lg font-black text-[#0B0F19]">
                LIVE DISPATCH OUTPUT STREAM
              </h3>
              <p className="text-xs text-slate-700 font-mono">
                Data generated by 5 Azure AI microservices in sequence
              </p>
            </div>
            <span className="badge-cyber text-blue-400">
              {completed ? `FINISHED (${(executionTime / 1000).toFixed(2)}s)` : `STEP ${currentStep} OF 5`}
            </span>
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3 font-mono">
            {/* Step 1: Speech Result */}
            {currentStep >= 1 && (
              <div className="rounded-lg border-2 border-[#0B0F19] bg-white p-4 shadow-[3px_3px_0px_#0B0F19]">
                <div className="flex items-center justify-between text-xs font-extrabold border-b-2 border-slate-200 pb-2">
                  <span className="text-blue-600">1. AZURE SPEECH STT</span>
                  <span className="text-slate-600">CONF: 0.96</span>
                </div>
                <p className="mt-2 text-[11px] font-extrabold text-slate-600">TRANSCRIPT:</p>
                <p className="mt-1 text-xs text-[#0B0F19] bg-slate-100 p-2.5 rounded-md border border-slate-300 italic font-bold">
                  "{activeInputText}"
                </p>
              </div>
            )}

            {/* Step 2: Vision Result */}
            {currentStep >= 2 && (
              <div className="rounded-lg border-2 border-[#0B0F19] bg-white p-4 shadow-[3px_3px_0px_#0B0F19]">
                <div className="flex items-center justify-between text-xs font-extrabold border-b-2 border-slate-200 pb-2">
                  <span className="text-emerald-600">2. AZURE VISION</span>
                  <span className="text-slate-600">OCR MATCH</span>
                </div>
                <p className="mt-2 text-[11px] font-extrabold text-slate-600">OCR SIGNAGE TEXT:</p>
                <p className="mt-1 text-xs text-[#0B0F19] bg-slate-100 p-2.5 rounded-md border border-slate-300 font-bold">
                  {selectedPreset.ocrText}
                </p>
                <div className="mt-2 flex flex-wrap gap-1">
                  {selectedPreset.imageTags.map((t) => (
                    <span key={t} className="bg-emerald-200 text-emerald-950 border border-[#0B0F19] px-2 py-0.5 rounded-md text-[10px] font-black">
                      #{t}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Language Result */}
            {currentStep >= 3 && (
              <div className="rounded-lg border-2 border-[#0B0F19] bg-white p-4 shadow-[3px_3px_0px_#0B0F19]">
                <div className="flex items-center justify-between text-xs font-extrabold border-b-2 border-slate-200 pb-2">
                  <span className="text-purple-600">3. AZURE LANGUAGE</span>
                  <span className="bg-red-400 text-black px-2 py-0.5 rounded-md font-black border border-[#0B0F19]">HIGH URGENCY</span>
                </div>
                <p className="mt-2 text-[11px] font-extrabold text-slate-600">TRIAGE CLASSIFICATION:</p>
                <ul className="mt-1 space-y-1 text-xs text-[#0B0F19] bg-slate-100 p-2.5 rounded-md border border-slate-300 font-bold">
                  <li>Category: {selectedPreset.category}</li>
                  <li>Location: {selectedPreset.location}</li>
                  <li>Sentiment: Urgent (0.89)</li>
                </ul>
              </div>
            )}

            {/* Step 4: RAG Result */}
            {currentStep >= 4 && (
              <div className="rounded-lg border-2 border-[#0B0F19] bg-white p-4 shadow-[3px_3px_0px_#0B0F19]">
                <div className="flex items-center justify-between text-xs font-extrabold border-b-2 border-slate-200 pb-2">
                  <span className="text-amber-600">4. AI SEARCH (RAG)</span>
                  <span className="text-slate-600">SOP MATCH</span>
                </div>
                <p className="mt-2 text-[11px] font-extrabold text-slate-600">SOP BYLAW CITATION:</p>
                <p className="mt-1 text-xs text-[#0B0F19] bg-slate-100 p-2.5 rounded-md border border-slate-300 font-bold">
                  {selectedPreset.bylawSop}
                  <br />
                  <strong className="text-red-600">MANDATORY RESPONSE SLA: {selectedPreset.slaHours} HOURS</strong>
                </p>
              </div>
            )}

            {/* Step 5: OpenAI Output */}
            {currentStep >= 5 && (
              <div className="rounded-lg border-2 border-[#0B0F19] bg-red-600 text-white p-4 md:col-span-2 lg:col-span-2 shadow-[5px_5px_0px_#0B0F19]">
                <div className="flex items-center justify-between text-xs font-black border-b-2 border-white/40 pb-2">
                  <span>5. AZURE OPENAI DISPATCH GENERATOR</span>
                  <span className="bg-white text-black px-2 py-0.5 rounded-md font-black border border-[#0B0F19]">WORK ORDER WO-9482</span>
                </div>

                <div className="mt-3 grid gap-3 md:grid-cols-2 text-[#0B0F19]">
                  <div className="bg-white p-3.5 rounded-md border-2 border-[#0B0F19]">
                    <p className="text-[10px] font-black text-slate-600 uppercase">GENERATED WORK ORDER</p>
                    <p className="mt-1 text-xs leading-relaxed font-bold">
                      <strong>Crew Assigned:</strong> Municipal Emergency Team B<br />
                      <strong>Action:</strong> Isolate main valve, clear hazard obstruction, broadcast public safety notice.<br />
                      <strong>Bylaw Citation:</strong> {selectedPreset.bylawSop}
                    </p>
                  </div>

                  <div className="bg-white p-3.5 rounded-md border-2 border-[#0B0F19]">
                    <p className="text-[10px] font-black text-slate-600 uppercase">AUTOMATED RESIDENT SMS</p>
                    <p className="mt-1 text-xs italic leading-relaxed font-bold">
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
