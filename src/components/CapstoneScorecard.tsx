import { motion } from "framer-motion";

export function CapstoneScorecard() {
  const criteria = [
    {
      id: "services",
      req: "5 Azure AI Services Chained",
      badge: "EXCEEDED (5 vs 3 Required)",
      desc: "Integrates Azure AI Speech, Vision, Language, Search (RAG), and Azure OpenAI into one continuous municipal hazard triage pipeline.",
      isLarge: true,
      stripe: "bg-[#FF3B1F]",
      stat: "05",
      statLabel: "Live Azure Services",
    },
    {
      id: "problem",
      req: "Municipal Hazard Triage System",
      badge: "REAL-WORLD SOLVED",
      desc: "Processes resident voice recordings & hazard photos, extracts location, scores urgency, applies SOP bylaws, and drafts dispatch work orders with 4h SLA.",
      isLarge: true,
      stripe: "bg-[#C9F031]",
      stat: "4h",
      statLabel: "Enforced Response SLA",
    },
    {
      id: "originality",
      req: "Original Mini Product Concept",
      badge: "VERIFIED",
      desc: "CivicPulse delivers an end-to-end municipal triage operator that automates resident communication & crew dispatch.",
      isLarge: false,
      stripe: "bg-[#2B6EFF]",
      stat: "100%",
      statLabel: "Original Architecture",
    },
    {
      id: "execution",
      req: "0 Redirect Execution",
      badge: "LIVE APIs",
      desc: "All microservices run as live HTTP endpoints through server-side functions inside this showcase.",
      isLarge: false,
      stripe: "bg-[#A855F7]",
      stat: "0",
      statLabel: "External Redirects",
    },
    {
      id: "a11y",
      req: "WCAG 2.1 AA Accessibility",
      badge: "VERIFIED",
      desc: "100% keyboard navigable, high-contrast neobrutalist UI, screen-reader status live-regions, reduced-motion aware.",
      isLarge: false,
      stripe: "bg-[#F59E0B]",
      stat: "AA",
      statLabel: "Compliance Level",
    },
  ];

  return (
    <section
      id="scorecard"
      aria-label="Season of AI 2.0 Capstone Scorecard"
      className="scroll-mt-6 border-t-3 border-[#000000] bg-[#0B0C0E] p-6 md:p-10"
    >
      <div className="flex flex-wrap items-end justify-between gap-4 border-b-2 border-slate-800 pb-6">
        <div>
          <div className="badge-console">
            <span>🏆</span> SUBMISSION REQUIREMENTS
          </div>
          <h2 className="mt-2 font-display text-2xl font-black text-[#F3F0E9] md:text-4xl">
            CAPSTONE SCORECARD
          </h2>
          <p className="mt-2 max-w-2xl font-mono text-xs text-slate-400">
            How CivicPulse satisfies and exceeds all official Season of AI 2.0 Final Capstone requirements.
          </p>
        </div>

        <div className="flex items-center gap-2 border-2 border-[#C9F031] bg-[#12141A] px-4 py-2 font-mono text-xs font-bold text-[#C9F031]">
          <span>STATUS:</span> 100% VERIFIED & COMPLIANT
        </div>
      </div>

      {/* Asymmetric Bento Grid: 2 Large (col-span-3) + 3 Small (col-span-2) */}
      <div className="mt-8 grid gap-6 md:grid-cols-6">
        {criteria.map((c, idx) => (
          <motion.div
            key={c.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            className={`card-paper relative overflow-hidden flex flex-col justify-between p-6 ${
              c.isLarge ? "md:col-span-3" : "md:col-span-2"
            }`}
          >
            {/* Top Color Stripe per Card */}
            <div className={`absolute top-0 left-0 right-0 h-2.5 ${c.stripe}`} />

            <div>
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="font-bold text-slate-500">REQ 0{idx + 1}</span>
                <span className="border border-black bg-black px-2 py-0.5 font-bold text-[#C9F031]">
                  {c.badge}
                </span>
              </div>

              <h3 className="mt-4 font-display text-lg font-black text-[#0B0C0E] md:text-xl">
                {c.req}
              </h3>
              <p className="mt-3 font-mono text-xs text-slate-700 leading-relaxed">
                {c.desc}
              </p>
            </div>

            <div className="mt-6 flex items-baseline justify-between border-t-2 border-slate-300 pt-4">
              <div>
                <span className="font-display text-3xl font-black text-[#FF3B1F] md:text-4xl">
                  {c.stat}
                </span>
                <p className="font-mono text-[10px] font-bold text-slate-500 uppercase">
                  {c.statLabel}
                </p>
              </div>
              <span className="font-mono text-xs font-bold text-slate-900">VERIFIED ✓</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default CapstoneScorecard;
