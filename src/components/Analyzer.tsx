"use client";

import { useMemo, useState } from "react";
import { analyzeStartupIdea, type StartupAnalysis } from "@/lib/analyze";

const samples = [
  "An AI agent platform for founders to automate everything.",
  "A marketplace that connects freelancers with startups for any task.",
  "A compliance-first tool that helps clinics reduce claim denials by 20% using real-time eligibility checks.",
  "A job board for remote AI roles with verified salary data and employer deposits.",
];

function scoreColor(score: number) {
  if (score >= 75) return "from-emerald-300 via-emerald-200 to-emerald-100";
  if (score >= 55) return "from-amber-300 via-orange-300 to-amber-200";
  return "from-rose-300 via-orange-300 to-amber-200";
}

function riskBadge(risk: StartupAnalysis["timeWasteRisk"]) {
  switch (risk) {
    case "Low":
      return "border-emerald-400/25 bg-emerald-400/10 text-emerald-200";
    case "Medium":
      return "border-amber-400/25 bg-amber-400/10 text-amber-200";
    case "High":
      return "border-orange-400/25 bg-orange-400/10 text-orange-200";
    case "Extreme":
    default:
      return "border-rose-400/25 bg-rose-400/10 text-rose-200";
  }
}

function ScoreBar({ label, score }: { label: string; score: number }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur">
      <div className="flex items-center justify-between gap-4">
        <div className="text-xs font-semibold tracking-wide text-white/60">
          {label}
        </div>
        <div className="text-sm font-semibold text-white/85">{score}/100</div>
      </div>
      <div className="mt-3 h-2 w-full rounded-full bg-white/10">
        <div
          className={`h-2 rounded-full bg-gradient-to-r ${scoreColor(score)}`}
          style={{ width: `${Math.max(2, Math.min(100, score))}%` }}
        />
      </div>
    </div>
  );
}

export function Analyzer() {
  const [idea, setIdea] = useState(
    "A tool that tells founders if their startup idea already exists and what would make it actually worth building.",
  );
  const [analysis, setAnalysis] = useState<StartupAnalysis>(() =>
    analyzeStartupIdea(
      "A tool that tells founders if their startup idea already exists and what would make it actually worth building.",
    ),
  );

  const derived = useMemo(() => {
    const a = analysis;
    const risk = a.timeWasteRisk;
    const riskLabel =
      risk === "Low"
        ? "Probably not a waste. Still prove it."
        : risk === "Medium"
          ? "Could be real — but sharpen it fast."
          : risk === "High"
            ? "Likely a time sink unless you find a wedge."
            : "Stop. Rewrite the idea or kill it.";
    return { riskLabel };
  }, [analysis]);

  return (
    <section
      id="reality-check"
      className="scroll-mt-24 rounded-[2.25rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-6 shadow-[0_30px_140px_rgba(0,0,0,0.70)] backdrop-blur sm:p-8"
    >
      <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
        <div className="lg:w-[46%]">
          <div className="text-xs font-semibold tracking-wide text-white/60">
            LIVE REALITY CHECK (MVP)
          </div>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Paste the idea. Get the truth.
          </h2>
          <p className="mt-4 text-sm leading-7 text-white/70">
            Deterministic heuristics. No external APIs. No “infinite imagination.”
            Just the signals that usually decide whether a startup is real… or
            full of it.
          </p>

          <div className="mt-6 space-y-3">
            <textarea
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              className="min-h-[160px] w-full resize-none rounded-3xl border border-white/10 bg-black/40 p-4 text-sm leading-6 text-white/85 outline-none ring-1 ring-transparent transition focus:border-white/15 focus:ring-[color:var(--ring)]"
              placeholder="One sentence is enough. Buyer + pain + wedge if you have it."
            />

            <div className="flex flex-wrap gap-2">
              {samples.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => {
                    setIdea(s);
                    setAnalysis(analyzeStartupIdea(s));
                  }}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-semibold text-white/70 hover:bg-white/[0.06] hover:text-white"
                >
                  Try sample
                </button>
              ))}
              <button
                type="button"
                onClick={() => setAnalysis(analyzeStartupIdea(idea))}
                className="ml-auto inline-flex items-center justify-center rounded-full bg-gradient-to-r from-amber-300 via-orange-400 to-amber-200 px-4 py-2 text-xs font-semibold text-black shadow-[0_18px_70px_rgba(255,160,60,0.22)]"
              >
                Run reality check
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-3xl border border-white/10 bg-black/35 p-5">
            <div>
              <div className="text-xs font-semibold tracking-wide text-white/60">
                VERDICT
              </div>
              <div className="mt-2 text-base font-semibold text-white/90">
                {analysis.verdict}
              </div>
              <div className="mt-2 text-sm leading-7 text-white/65">
                {analysis.translation}
              </div>
            </div>
            <div
              className={`shrink-0 rounded-2xl border px-3 py-2 text-xs font-semibold ${riskBadge(
                analysis.timeWasteRisk,
              )}`}
            >
              Time waste risk: {analysis.timeWasteRisk}
              <div className="mt-1 text-[11px] font-normal text-white/60">
                {derived.riskLabel}
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <ScoreBar label="BS Score (higher = more fog)" score={analysis.bsScore} />
            <ScoreBar
              label="Viability (higher = more real)"
              score={analysis.viabilityScore}
            />
            <ScoreBar
              label="Redundancy (higher = more crowded)"
              score={analysis.redundancyScore}
            />
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur">
              <div className="text-xs font-semibold tracking-wide text-white/60">
                WHY IT MAY FAIL
              </div>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-white/75">
                {analysis.reasons.map((r) => (
                  <li key={r} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-300/80" />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur">
              <div className="text-xs font-semibold tracking-wide text-white/60">
                MAKE IT NOT SHIT
              </div>
              <div className="mt-4 rounded-2xl border border-white/10 bg-black/35 p-4 text-sm leading-7 text-white/80">
                {analysis.betterVersion}
              </div>
              <div className="mt-5 text-xs font-semibold tracking-wide text-white/60">
                NEXT VALIDATION MOVE
              </div>
              <div className="mt-3 text-sm leading-7 text-white/75">
                {analysis.nextMove}
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-[linear-gradient(180deg,rgba(255,165,60,0.10),rgba(255,255,255,0.03))] p-6 backdrop-blur">
            <div className="text-xs font-semibold tracking-wide text-white/60">
              NOTE
            </div>
            <div className="mt-3 text-sm leading-7 text-white/70">
              This is deliberately brutal. The goal is not to “feel inspired.”
              The goal is to remove fake progress and force buyer truth.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

