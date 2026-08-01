import { createFileRoute, Link } from "@tanstack/react-router";
import { lazy, Suspense, useEffect, useState } from "react";
import { ServiceGrid, services } from "@/components/ServiceGrid";
import { TiltCard } from "@/components/TiltCard";
import { OnboardingTour } from "@/components/OnboardingTour";
import { LucidLoader } from "@/components/LucidLoader";
import { CaseStudy } from "@/components/CaseStudy";

const HeroScene = lazy(() => import("@/components/HeroScene"));

function HeroFallback() {
  return <div className="hero-stage" aria-hidden />;
}

/** Mounts the interactive 3D hero after hydration + first idle frame. */
function DeferredHeroScene() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    if (w.requestIdleCallback) {
      const id = w.requestIdleCallback(() => setShow(true), { timeout: 1200 });
      return () => w.cancelIdleCallback?.(id);
    }
    const t = setTimeout(() => setShow(true), 250);
    return () => clearTimeout(t);
  }, []);

  if (!show) return <HeroFallback />;
  return (
    <Suspense fallback={<HeroFallback />}>
      <HeroScene />
    </Suspense>
  );
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CivicPulse — Azure AI Hazard Triage | Season of AI 2.0" },
      {
        name: "description",
        content:
          "CivicPulse turns a resident's voice note and photo into a ranked, policy-backed city dispatch plan using Azure Speech, Vision, Language, AI Search and OpenAI.",
      },
      { property: "og:title", content: "CivicPulse — Azure AI Hazard Triage" },
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
  "CIVICPULSE_ONLINE // VOICE_REPORT_IN // VISION_EVIDENCE // URGENCY_SCORED // BYLAW_CITED // DISPATCH_PLAN_OUT // 05_AZURE_SERVICES // NO_REDIRECTS // ";

function Index() {
  return (
    <main className="relative z-10 mx-auto w-full max-w-7xl px-4 py-8 lg:px-10 lg:py-14">
      <div className="rack">
        {/* ---- Rack bar: identity + data plates ---- */}
        <header className="rack-bar flex flex-col gap-4 p-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="font-display text-2xl leading-none md:text-3xl">CivicPulse</h1>
            <span
              aria-hidden
              className="hidden h-6 w-px bg-[color-mix(in_oklab,var(--ink)_20%,transparent)] md:block"
            />
            <p className="label-mono">Season of AI 2.0 · Final Capstone</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="plate">Services: 05</span>
            <span className="plate">Pipeline: 01</span>
            <span className="plate">Status: live</span>
          </div>
        </header>

        {/* ---- Hero: problem statement + interactive 3D pipeline ---- */}
        <section
          aria-label="CivicPulse overview"
          className="grid grid-cols-1 border-t lucid-divide tint-lilac lg:grid-cols-12"
        >
          <div className="p-6 md:p-10 lg:col-span-5 lg:border-r lucid-divide">
            <p className="eyebrow">Real_world_problem</p>
            <p className="mt-4 font-display text-2xl leading-tight md:text-4xl">
              A city hears every hazard.
              <br />
              And answers in seconds.
            </p>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">
              Residents report broken pipes, dark streets and flooded roads by voice and photo.
              CivicPulse listens, looks, scores the urgency, cites the bylaw and writes the dispatch
              plan — five Azure AI services acting as one operator.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a className="gold-cta" href="#case-study">
                See the pipeline
                <span aria-hidden className="arrow">
                  ↓
                </span>
              </a>
              <Link
                className="ghost-cta"
                to="/demo/$serviceId"
                params={{ serviceId: services[0]!.id }}
              >
                Run a live module
                <span aria-hidden className="arrow">
                  →
                </span>
              </Link>
            </div>
            <p className="label-mono mt-6 text-muted-foreground">
              Move your pointer over the scene to steer it
            </p>
          </div>
          <div className="p-4 md:p-8 lg:col-span-7">
            <DeferredHeroScene />
          </div>
        </section>

        {/* ---- Case study: the real-world pipeline ---- */}
        <CaseStudy />

        {/* ---- Module rack ---- */}
        <section
          id="services"
          className="scroll-mt-6 border-t lucid-divide p-6"
          aria-label="Live modules"
        >
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="label-mono">The_product</p>
              <h2 className="mt-2 font-display text-xl md:text-3xl">Live modules</h2>
            </div>
            <p className="label-mono text-muted-foreground">
              {services.length} deployments · hover or drag a card to tilt
            </p>
          </div>
          <div className="mt-5 h-px w-full bg-[color-mix(in_oklab,var(--ink)_12%,transparent)]" />
          <div className="mt-6">
            <ServiceGrid />
          </div>
        </section>

        {/* ---- Rationale bento ---- */}
        <section className="border-t lucid-divide tint-sand p-6" aria-label="Why it qualifies">
          <p className="label-mono">Why_it_wins</p>
          <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-6">
            <div className="md:col-span-4">
              <TiltCard className="tint-skin" intensity={4}>
                <p className="label-mono">Composition</p>
                <p className="mt-3 font-display text-lg leading-tight md:text-2xl">
                  Voice and image in, retrieval and reasoning in the middle, a dispatch plan out.
                </p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  Every module is deployed independently, then chained into one civic workflow — so
                  the pipeline solves a real municipal problem instead of demoing an API.
                </p>
              </TiltCard>
            </div>
            <div className="md:col-span-2">
              <TiltCard className="tint-signal" intensity={5}>
                <p className="stat-figure">5</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Azure AI services chained — submission asks for three.
                </p>
              </TiltCard>
            </div>
            <div className="md:col-span-3">
              <TiltCard className="tint-sand" intensity={5}>
                <p className="stat-figure">4h</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  SLA pulled straight from the cited bylaw, not guessed by a dispatcher.
                </p>
              </TiltCard>
            </div>
            <div className="md:col-span-3">
              <TiltCard className="tint-mint" intensity={5}>
                <p className="stat-figure">0</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Redirects — every request and response runs inside this showcase.
                </p>
              </TiltCard>
            </div>
          </div>
        </section>

        {/* ---- Ticker footer ---- */}
        <footer className="overflow-hidden border-t lucid-divide bg-[color-mix(in_oklab,var(--ink)_88%,transparent)] px-3 py-1.5 text-background">
          <div className="ticker" aria-hidden>
            {TICKER}
            {TICKER}
          </div>
          <p className="sr-only">
            CivicPulse — a Season of AI 2.0 capstone built with Azure OpenAI, AI Search, Speech,
            Vision and Language.
          </p>
        </footer>
      </div>

      <LucidLoader />
      <OnboardingTour />
    </main>
  );
}
