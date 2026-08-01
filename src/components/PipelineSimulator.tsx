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
      className="glass-light-panel scroll-mt-24 p-6 md:p-10"
    >
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="badge-saas text-blue-700">
            <span>⚡</span> INTERACTIVE CONSOLE
          </div>
          <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
            LIVE 5-SERVICE TRIAGE SIMULATOR
          </h2>
          <p className="mt-1.5 max-w-2xl text-xs text-slate-600 font-medium">
            Trigger a real-world municipal hazard report or type custom resident input. Watch Azure AI Speech, Vision, Language, Search (RAG), and OpenAI execute in real-time sequence.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-xs font-bold text-emerald-700 shadow-sm">
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-600 animate-ping" />
          DISPATCH ENGINE READY
        </div>
      </div>

      {/* Preset Selector Pill Buttons */}
      <div className="mt-8 flex flex-wrap justify-center md:justify-start gap-4">
        {PRESETS.map((p) => (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            key={p.id}
            type="button"
            onClick={() => {
              setSelectedPreset(p);
              setCustomText("");
              setCompleted(false);
              setCurrentStep(0);
            }}
            className={`px-5 py-3 text-sm font-black rounded-full transition-all border-2 shadow-sm ${
              selectedPreset.id === p.id && !customText
                ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white border-transparent shadow-[0_10px_20px_-5px_rgba(236,72,153,0.4)]"
                : "bg-white/60 backdrop-blur-sm text-slate-700 border-white hover:bg-white hover:border-pink-300"
            }`}
          >
            {p.name}
          </motion.button>
        ))}
      </div>

      {/* Console Input Container */}
      <motion.div 
        layout
        className="mt-8 rounded-3xl border-2 border-white/80 bg-white/40 backdrop-blur-xl p-6 shadow-xl"
      >
        <label htmlFor="custom-voice" className="text-xs font-black uppercase tracking-widest text-indigo-900 drop-shadow-sm">
          [CONSOLE INPUT] Resident Voice / Text Report
        </label>
        <textarea
          id="custom-voice"
          rows={2}
          value={customText}
          onChange={(e) => setCustomText(e.target.value)}
          placeholder={`Type custom report... (Default: "${selectedPreset.voiceText}")`}
          className="mt-3 w-full rounded-2xl border-2 border-white/80 bg-white/80 p-4 font-mono text-sm text-slate-900 font-medium focus:outline-none focus:border-pink-400 focus:ring-4 focus:ring-pink-400/20 shadow-inner transition-all placeholder:text-slate-400"
        />

        <div className="mt-6 flex flex-wrap items-center justify-between gap-6 border-t border-white/50 pt-6 text-sm font-bold">
          <div className="flex flex-wrap items-center gap-6 text-slate-700 bg-white/50 px-5 py-2.5 rounded-full shadow-sm">
            <span>LOCATION: <strong className="text-indigo-900 font-black">{selectedPreset.location}</strong></span>
            <span>TARGET SLA: <strong className="text-pink-600 font-black">{selectedPreset.slaHours} HOURS</strong></span>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={handleRunPipeline}
            disabled={isRunning}
            className="btn-saas-primary shadow-[0_10px_30px_-10px_rgba(236,72,153,0.5)] disabled:opacity-60 disabled:hover:scale-100"
          >
            {isRunning ? (
              <>
                <span className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                EXECUTING ({ (executionTime / 1000).toFixed(1) }s)
              </>
            ) : (
              <>
                RUN 5-SERVICE PIPELINE
                <span className="text-xl leading-none">→</span>
              </>
            )}
          </motion.button>
        </div>
      </motion.div>

      {/* Progress Pipeline Steps */}
      <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-5 text-sm font-bold">
        {[
          { step: 1, name: "1. SPEECH STT", azure: "Azure Speech", icon: "🎙️", color: "from-blue-400 to-indigo-500" },
          { step: 2, name: "2. VISION OCR", azure: "Azure Vision", icon: "🖼️", color: "from-emerald-400 to-teal-500" },
          { step: 3, name: "3. LANGUAGE", azure: "Azure Language", icon: "📊", color: "from-purple-400 to-pink-500" },
          { step: 4, name: "4. RAG SEARCH", azure: "AI Search", icon: "📚", color: "from-amber-400 to-orange-500" },
          { step: 5, name: "5. OPENAI DISPATCH", azure: "Azure OpenAI", icon: "⚡", color: "from-rose-400 to-red-500" },
        ].map((st) => {
          const isActive = currentStep === st.step && isRunning;
          const isDone = currentStep > st.step || completed;
          return (
            <motion.div
              layout
              key={st.step}
              className={`relative overflow-hidden rounded-[2rem] p-5 transition-all border-2 ${
                isActive
                  ? "bg-white/90 border-pink-400 shadow-[0_20px_40px_-10px_rgba(236,72,153,0.3)] scale-105 z-10 backdrop-blur-lg"
                  : isDone
                    ? "bg-white/70 border-emerald-300 text-slate-900 shadow-sm backdrop-blur-md"
                    : "bg-white/40 border-white/50 text-slate-500 backdrop-blur-sm"
              }`}
            >
              <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${st.color} ${isActive ? 'opacity-100' : 'opacity-70'}`} />
              <div className="flex items-center justify-between mt-2">
                <span className="text-2xl drop-shadow-sm">{st.icon}</span>
                <span className={`text-[10px] font-black px-3 py-1 rounded-full shadow-inner ${
                  isDone ? "bg-emerald-100 text-emerald-800" : isActive ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md" : "bg-white/60 text-slate-500"
                }`}>
                  {isDone ? "DONE" : isActive ? "ACTIVE" : "WAIT"}
                </span>
              </div>
              <h4 className="mt-4 font-display text-base font-black text-slate-900 tracking-tight">{st.name}</h4>
              <p className="text-xs text-indigo-600/80 font-mono font-bold mt-1">{st.azure}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Execution Results Output Display */}
      {(currentStep > 0 || completed) && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 rounded-2xl border border-slate-200 bg-slate-50/90 p-6 shadow-sm"
        >
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <div>
              <h3 className="font-display text-lg font-bold text-slate-900">
                LIVE DISPATCH OUTPUT STREAM
              </h3>
              <p className="text-xs text-slate-500 font-mono">
                Data generated by 5 Azure AI microservices in sequence
              </p>
            </div>
            <span className="badge-saas text-blue-700">
              {completed ? `FINISHED (${(executionTime / 1000).toFixed(2)}s)` : `STEP ${currentStep} OF 5`}
            </span>
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3 font-mono">
            {/* Step 1: Speech Result */}
            {currentStep >= 1 && (
              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <div className="flex items-center justify-between text-xs font-bold border-b border-slate-200 pb-2">
                  <span className="text-blue-600">1. AZURE SPEECH STT</span>
                  <span className="text-slate-500">CONF: 0.96</span>
                </div>
                <p className="mt-2 text-[11px] font-bold text-slate-500">TRANSCRIPT:</p>
                <p className="mt-1 text-xs text-slate-900 bg-slate-50 p-2.5 rounded-lg border border-slate-200 italic">
                  "{activeInputText}"
                </p>
              </div>
            )}

            {/* Step 2: Vision Result */}
            {currentStep >= 2 && (
              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <div className="flex items-center justify-between text-xs font-bold border-b border-slate-200 pb-2">
                  <span className="text-emerald-600">2. AZURE VISION</span>
                  <span className="text-slate-500">OCR MATCH</span>
                </div>
                <p className="mt-2 text-[11px] font-bold text-slate-500">OCR SIGNAGE TEXT:</p>
                <p className="mt-1 text-xs text-slate-900 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                  {selectedPreset.ocrText}
                </p>
                <div className="mt-2 flex flex-wrap gap-1">
                  {selectedPreset.imageTags.map((t) => (
                    <span key={t} className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md text-[10px] font-bold">
                      #{t}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Language Result */}
            {currentStep >= 3 && (
              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <div className="flex items-center justify-between text-xs font-bold border-b border-slate-200 pb-2">
                  <span className="text-purple-600">3. AZURE LANGUAGE</span>
                  <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded-md font-bold">HIGH URGENCY</span>
                </div>
                <p className="mt-2 text-[11px] font-bold text-slate-500">TRIAGE CLASSIFICATION:</p>
                <ul className="mt-1 space-y-1 text-xs text-slate-900 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                  <li>Category: {selectedPreset.category}</li>
                  <li>Location: {selectedPreset.location}</li>
                  <li>Sentiment: Urgent (0.89)</li>
                </ul>
              </div>
            )}

            {/* Step 4: RAG Result */}
            {currentStep >= 4 && (
              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <div className="flex items-center justify-between text-xs font-bold border-b border-slate-200 pb-2">
                  <span className="text-amber-600">4. AI SEARCH (RAG)</span>
                  <span className="text-slate-500">SOP MATCH</span>
                </div>
                <p className="mt-2 text-[11px] font-bold text-slate-500">SOP BYLAW CITATION:</p>
                <p className="mt-1 text-xs text-slate-900 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                  {selectedPreset.bylawSop}
                  <br />
                  <strong className="text-red-600">MANDATORY RESPONSE SLA: {selectedPreset.slaHours} HOURS</strong>
                </p>
              </div>
            )}

            {/* Step 5: OpenAI Output */}
            {currentStep >= 5 && (
              <div className="rounded-xl border border-red-200 bg-red-600 text-white p-4 md:col-span-2 lg:col-span-2 shadow-md">
                <div className="flex items-center justify-between text-xs font-bold border-b border-white/30 pb-2">
                  <span>5. AZURE OPENAI DISPATCH GENERATOR</span>
                  <span className="bg-white text-red-700 px-2 py-0.5 rounded-md font-extrabold">WORK ORDER WO-9482</span>
                </div>

                <div className="mt-3 grid gap-3 md:grid-cols-2 text-slate-900">
                  <div className="bg-white p-3.5 rounded-xl border border-white">
                    <p className="text-[10px] font-bold text-slate-500 uppercase">GENERATED WORK ORDER</p>
                    <p className="mt-1 text-xs leading-relaxed">
                      <strong>Crew Assigned:</strong> Municipal Emergency Team B<br />
                      <strong>Action:</strong> Isolate main valve, clear hazard obstruction, broadcast public safety notice.<br />
                      <strong>Bylaw Citation:</strong> {selectedPreset.bylawSop}
                    </p>
                  </div>

                  <div className="bg-white p-3.5 rounded-xl border border-white">
                    <p className="text-[10px] font-bold text-slate-500 uppercase">AUTOMATED RESIDENT SMS</p>
                    <p className="mt-1 text-xs italic leading-relaxed">
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
