import { useEffect, useState } from "react";

/**
 * Lightweight loading veil that clears quickly on client mount so the
 * page content is immediately visible without blocking black screens.
 */
export function LucidLoader() {
  const [leaving, setLeaving] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    // Quickly fade out overlay after client hydration
    const start = window.setTimeout(() => setLeaving(true), 100);
    const end = window.setTimeout(() => setGone(true), 350);
    return () => {
      window.clearTimeout(start);
      window.clearTimeout(end);
    };
  }, []);

  if (gone) return null;

  return (
    <div
      className="loader-veil pointer-events-none"
      data-leaving={leaving}
      role="status"
      aria-label="Loading CivicPulse console"
    >
      <div className="flex flex-col items-center gap-3 px-6 text-center">
        <div className="flex items-center gap-2 border-2 border-[#C9F031] bg-[#0B0C0E] px-4 py-2 font-mono text-xs font-bold text-[#C9F031] shadow-[4px_4px_0px_#000000]">
          <span className="h-2 w-2 bg-[#C9F031] animate-pulse" />
          INITIALIZING DISPATCH CONSOLE...
        </div>
      </div>
    </div>
  );
}

export default LucidLoader;
