import { useState, useEffect } from "react";

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
      className="scroll-mt-6 border-t border-slate-200 bg-slate-50/70 p-6 md:p-10"
    >
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Interactive Simulator</p>
          <h2 className="mt-1 font-display text-2xl font-bold text-slate-900 md:text-3xl">
            Live 5-Service Pipeline Simulator
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
            Select a real-world municipal hazard scenario or type custom resident input. Watch Azure AI Speech, Vision, Language, Search (RAG), and OpenAI execute in sequence to generate an actionable dispatch plan.
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-mono text-slate-600 shadow-sm">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          Execution Engine Ready
        </div>
      </div>

      {/* Preset Selector */}
      <div className="mt-6 flex flex-wrap gap-2">
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
            className={`rounded-lg px-4 py-2 text-xs font-medium transition-all ${
              selectedPreset.id === p.id && !customText
                ? "border border-blue-600 bg-blue-600 text-white shadow-sm"
                : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-100"
            }`}
          >
            {p.name}
          </button>
        ))}
      </div>

      {/* Input Box & Control Bar */}
      <div className="mt-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <label htmlFor="custom-voice" className="text-xs font-mono font-semibold uppercase text-slate-500">
          Resident Voice / Text Report Input
        </label>
        <textarea
          id="custom-voice"
          rows={2}
          value={customText}
          onChange={(e) => setCustomText(e.target.value)}
          placeholder={`Or type a custom report... (Default: "${selectedPreset.voiceText}")`}
          className="mt-2 w-full rounded-md border border-slate-200 bg-slate-50 p-3 text-sm text-slate-800 focus:border-blue-500 focus:bg-white focus:outline-none"
        />

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-500">
            <span>Location: <strong className="text-slate-800">{selectedPreset.location}</strong></span>
            <span>Target SLA: <strong className="text-blue-600">{selectedPreset.slaHours} Hours</strong></span>
          </div>

          <button
            type="button"
            onClick={handleRunPipeline}
            disabled={isRunning}
            className="gold-cta disabled:opacity-50"
          >
            {isRunning ? (
              <>
                <span className="h-3 w-3 rounded-full border-2 border-white border-t-transparent animate-spin" />
                Executing Pipeline ({ (executionTime / 1000).toFixed(1) }s)...
              </>
            ) : (
              <>
                Run 5-Service Pipeline
                <span className="arrow">→</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Progress Pipeline Steps */}
      <div className="mt-8">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-5">
          {[
            { step: 1, name: "1. Speech STT", azure: "Azure Speech", icon: "🎙️" },
            { step: 2, name: "2. Vision Evidence", azure: "Azure Vision", icon: "🖼️" },
            { step: 3, name: "3. Language Triage", azure: "Azure Language", icon: "📊" },
            { step: 4, name: "4. RAG Bylaws", azure: "Azure AI Search", icon: "📚" },
            { step: 5, name: "5. OpenAI Dispatch", azure: "Azure OpenAI", icon: "⚡" },
          ].map((st) => {
            const isActive = currentStep === st.step && isRunning;
            const isDone = currentStep > st.step || completed;
            return (
              <div
                key={st.step}
                className={`flex flex-col rounded-xl border p-4 transition-all ${
                  isActive
                    ? "border-blue-500 bg-blue-50/80 shadow-md ring-2 ring-blue-500/20"
                    : isDone
                      ? "border-emerald-200 bg-emerald-50/40 text-emerald-900"
                      : "border-slate-200 bg-white opacity-60"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-lg">{st.icon}</span>
                  <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                    isDone ? "bg-emerald-100 text-emerald-700" : isActive ? "bg-blue-100 text-blue-700" : "bg-slate-100 text-slate-500"
                  }`}>
                    {isDone ? "COMPLETE" : isActive ? "RUNNING" : "WAITING"}
                  </span>
                </div>
                <h4 className="mt-2 font-display text-sm font-bold">{st.name}</h4>
                <p className="text-[11px] font-mono text-slate-500">{st.azure}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Execution Results Output Display */}
      {(currentStep > 0 || completed) && (
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-md transition-all">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="font-display text-lg font-bold text-slate-900">
                Live Output Stream
              </h3>
              <p className="text-xs text-slate-500 font-mono">
                Real-time output generated by Azure AI service chain
              </p>
            </div>
            <span className="rounded-full bg-slate-100 px-3 py-1 font-mono text-xs font-semibold text-slate-700">
              {completed ? `Finished in ${(executionTime / 1000).toFixed(2)}s` : `Step ${currentStep} of 5`}
            </span>
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {/* Step 1: Speech Result */}
            {currentStep >= 1 && (
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between text-xs font-mono text-slate-500">
                  <span className="font-bold text-indigo-600">AZURE SPEECH</span>
                  <span>Confidence: 0.96</span>
                </div>
                <p className="mt-2 text-xs font-semibold text-slate-800">Transcript:</p>
                <p className="mt-1 text-xs text-slate-600 italic font-mono bg-white p-2.5 rounded border border-slate-200">
                  "{activeInputText}"
                </p>
              </div>
            )}

            {/* Step 2: Vision Result */}
            {currentStep >= 2 && (
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between text-xs font-mono text-slate-500">
                  <span className="font-bold text-sky-600">AZURE VISION</span>
                  <span>OCR Detected</span>
                </div>
                <p className="mt-2 text-xs font-semibold text-slate-800">OCR Signage Text:</p>
                <p className="mt-1 text-xs font-mono text-slate-700 bg-white p-2.5 rounded border border-slate-200">
                  {selectedPreset.ocrText}
                </p>
                <div className="mt-2 flex flex-wrap gap-1">
                  {selectedPreset.imageTags.map((t) => (
                    <span key={t} className="rounded bg-sky-100 px-1.5 py-0.5 font-mono text-[10px] text-sky-800">
                      #{t}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Language Result */}
            {currentStep >= 3 && (
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between text-xs font-mono text-slate-500">
                  <span className="font-bold text-purple-600">AZURE LANGUAGE</span>
                  <span className="font-bold text-red-600">HIGH URGENCY</span>
                </div>
                <p className="mt-2 text-xs font-semibold text-slate-800">Classification & Entities:</p>
                <ul className="mt-1 space-y-1 text-xs font-mono text-slate-700 bg-white p-2.5 rounded border border-slate-200">
                  <li>Category: {selectedPreset.category}</li>
                  <li>Location: {selectedPreset.location}</li>
                  <li>Sentiment: Negative / Urgent (0.89)</li>
                </ul>
              </div>
            )}

            {/* Step 4: RAG Result */}
            {currentStep >= 4 && (
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between text-xs font-mono text-slate-500">
                  <span className="font-bold text-amber-600">AZURE SEARCH (RAG)</span>
                  <span>SOP Match</span>
                </div>
                <p className="mt-2 text-xs font-semibold text-slate-800">Bylaw & SLA Citation:</p>
                <p className="mt-1 text-xs font-mono text-slate-700 bg-white p-2.5 rounded border border-slate-200">
                  {selectedPreset.bylawSop}
                  <br />
                  <span className="text-amber-700 font-bold">Mandatory Response SLA: {selectedPreset.slaHours} Hours</span>
                </p>
              </div>
            )}

            {/* Step 5: OpenAI Final Output */}
            {currentStep >= 5 && (
              <div className="rounded-xl border border-blue-200 bg-blue-50/60 p-4 md:col-span-2 lg:col-span-2">
                <div className="flex items-center justify-between text-xs font-mono text-blue-700">
                  <span className="font-bold">AZURE OPENAI DISPATCH GENERATOR</span>
                  <span className="rounded bg-blue-600 px-2 py-0.5 font-bold text-white">WORK ORDER WO-9482</span>
                </div>

                <div className="mt-3 grid gap-3 md:grid-cols-2">
                  <div className="rounded-lg bg-white p-3 border border-blue-100">
                    <p className="text-[11px] font-mono font-bold text-slate-500">GENERATED DISPATCH PLAN</p>
                    <p className="mt-1 text-xs text-slate-800 leading-relaxed font-mono">
                      <strong>Crew Assigned:</strong> Municipal Emergency Response Team B<br />
                      <strong>Action:</strong> Isolate valve, clear drain obstruction, issue public warning.<br />
                      <strong>Bylaw Citation:</strong> {selectedPreset.bylawSop}
                    </p>
                  </div>

                  <div className="rounded-lg bg-white p-3 border border-blue-100">
                    <p className="text-[11px] font-mono font-bold text-slate-500">AUTOMATED RESIDENT SMS</p>
                    <p className="mt-1 text-xs text-slate-800 italic leading-relaxed">
                      "Thank you for reporting. Your hazard report (#{selectedPreset.id}-9482) at {selectedPreset.location} has been registered. Crews dispatched under {selectedPreset.bylawSop} with a {selectedPreset.slaHours}h SLA."
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

export default PipelineSimulator;
