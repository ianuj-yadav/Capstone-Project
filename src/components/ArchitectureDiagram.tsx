import { useState } from "react";

type ServiceNode = {
  id: string;
  name: string;
  azure: string;
  role: string;
  input: string;
  output: string;
  color: string;
};

const NODES: ServiceNode[] = [
  {
    id: "speech",
    name: "Voice Transcription",
    azure: "Azure AI Speech",
    role: "Converts resident voice audio into high-confidence transcript text with locale detection.",
    input: "Audio Stream / Clip (.wav)",
    output: "Transcript string + confidence score",
    color: "bg-indigo-50 border-indigo-200 text-indigo-900",
  },
  {
    id: "vision",
    name: "Visual Evidence Engine",
    azure: "Azure AI Vision",
    role: "Extracts OCR signage text, object tags, and scene descriptions from photo evidence.",
    input: "Hazard Photo (.jpg)",
    output: "OCR text + Object tags + Bounding boxes",
    color: "bg-sky-50 border-sky-200 text-sky-900",
  },
  {
    id: "language",
    name: "Language Analytics & Severity",
    azure: "Azure AI Language",
    role: "Performs sentiment scoring, urgency categorization, address extraction, and entity recognition.",
    input: "Transcript + OCR text",
    output: "Urgency Score (HIGH/MED/LOW) + Category",
    color: "bg-purple-50 border-purple-200 text-purple-900",
  },
  {
    id: "rag",
    name: "Vector Knowledge Index",
    azure: "Azure AI Search + RAG",
    role: "Queries municipal SOP documents and bylaws to retrieve governing rules and response SLAs.",
    input: "Hazard query + Location",
    output: "Cited SOP Clause + Response SLA (e.g. 2h)",
    color: "bg-amber-50 border-amber-200 text-amber-900",
  },
  {
    id: "openai",
    name: "Conversational Dispatch Synthesizer",
    azure: "Azure OpenAI (GPT-4o)",
    role: "Chains all prior outputs into a crew Work Order, resident SMS notification, and ward dashboard report.",
    input: "Transcript + Tags + Urgency + SOP",
    output: "Work Order WO-9482 + Resident SMS draft",
    color: "bg-blue-50 border-blue-200 text-blue-900",
  },
];

export function ArchitectureDiagram() {
  const [activeNode, setActiveNode] = useState<ServiceNode>(NODES[0]!);

  return (
    <section
      id="architecture"
      aria-label="System Architecture Flowchart"
      className="scroll-mt-6 border-t border-slate-200 bg-white p-6 md:p-10"
    >
      <div>
        <p className="eyebrow">System Topology</p>
        <h2 className="mt-1 font-display text-2xl font-bold text-slate-900 md:text-3xl">
          End-to-End Azure AI Architecture
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
          How five Azure AI microservices collaborate seamlessly to turn raw municipal hazard reports into policy-backed city dispatch actions.
        </p>
      </div>

      {/* Interactive Architecture Map */}
      <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50/50 p-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div className="flex items-center gap-3">
            <span className="rounded-md bg-blue-600 px-2.5 py-1 text-xs font-mono font-bold text-white">
              INPUT: Resident Voice + Photo
            </span>
            <span className="text-slate-400 font-mono">→</span>
            <span className="text-xs font-mono font-semibold text-slate-700">5-Stage Pipeline</span>
            <span className="text-slate-400 font-mono">→</span>
            <span className="rounded-md bg-emerald-600 px-2.5 py-1 text-xs font-mono font-bold text-white">
              OUTPUT: Dispatch Work Order
            </span>
          </div>
          <p className="text-xs font-mono text-slate-500">Click any node for service specs</p>
        </div>

        {/* Nodes Grid Flow */}
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-5">
          {NODES.map((node, i) => {
            const isSelected = activeNode.id === node.id;
            return (
              <div key={node.id} className="relative flex flex-col items-center">
                <button
                  type="button"
                  onClick={() => setActiveNode(node)}
                  className={`w-full rounded-xl border p-4 text-left transition-all ${node.color} ${
                    isSelected ? "ring-2 ring-blue-600 shadow-md scale-[1.02]" : "hover:shadow-sm"
                  }`}
                >
                  <span className="text-[10px] font-mono font-bold uppercase text-slate-500">
                    0{i + 1} · {node.azure}
                  </span>
                  <h4 className="mt-1 font-display text-sm font-bold text-slate-900">{node.name}</h4>
                  <p className="mt-2 text-[11px] font-mono text-slate-600 line-clamp-2">{node.role}</p>
                </button>
                {i < NODES.length - 1 && (
                  <span className="my-2 text-slate-300 font-mono text-sm hidden md:block">↓</span>
                )}
              </div>
            );
          })}
        </div>

        {/* Selected Node Spec Inspector */}
        <div className="mt-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
            <div>
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-blue-600">
                {activeNode.azure} Spec Inspection
              </span>
              <h3 className="font-display text-lg font-bold text-slate-900">{activeNode.name}</h3>
            </div>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-mono font-semibold text-slate-700">
              API Endpoint Active
            </span>
          </div>

          <p className="mt-3 text-sm text-slate-600 leading-relaxed">{activeNode.role}</p>

          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <div className="rounded-lg bg-slate-50 p-3 border border-slate-200">
              <span className="text-[11px] font-mono font-bold uppercase text-slate-500">STAGE INPUT</span>
              <p className="mt-1 text-xs font-mono text-slate-800">{activeNode.input}</p>
            </div>

            <div className="rounded-lg bg-slate-50 p-3 border border-slate-200">
              <span className="text-[11px] font-mono font-bold uppercase text-slate-500">STAGE OUTPUT</span>
              <p className="mt-1 text-xs font-mono text-slate-800">{activeNode.output}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ArchitectureDiagram;
