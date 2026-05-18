import { Analyzer } from "@/components/Analyzer";
import { MarketingGraphicsStack } from "@/components/MarketingGraphicsStack";
import { ProcessFlowSection } from "@/components/ProcessFlowSection";
import { HeroProductPanel } from "@/components/HeroProductPanel";
import { TrustStrip } from "@/components/TrustStrip";
import { SiteHeader } from "@/components/SiteHeader";

export default function Home() {
  return (
    <div className="min-h-full bg-obsidian text-white">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,165,60,0.25),transparent_55%)] blur-2xl" />
        <div className="absolute -bottom-48 right-[-140px] h-[720px] w-[720px] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,214,102,0.14),transparent_55%)] blur-2xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.0),rgba(0,0,0,0.65))]" />
      </div>

      <SiteHeader />

      <main className="relative">
        <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
          <TrustStrip />
        </div>

        <section className="mx-auto w-full max-w-6xl px-6 pb-10 pt-10 sm:pb-16 sm:pt-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-semibold tracking-wide text-white/70 backdrop-blur">
            A spam filter for startup thinking
            <span className="h-1 w-1 rounded-full bg-amber-300/80" />
            Not a generator. A reality engine.
          </div>

          <div className="mt-6 grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <h1 className="text-balance text-4xl font-semibold tracking-tight text-white sm:text-6xl">
                Stop wasting your brain on ideas that do not need to exist.
              </h1>
              <p className="mt-5 max-w-xl text-pretty text-base leading-7 text-white/70 sm:text-lg">
                Full of Shit tells you whether your startup idea is real — or just
                disguised repetition. It detects vague language, crowded
                categories, missing buyers, and fake differentiation.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href="#reality-check"
                  className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-amber-300 via-orange-400 to-amber-200 px-6 py-3 text-sm font-semibold text-black shadow-[0_20px_90px_rgba(255,160,60,0.28)]"
                >
                  Run a reality check
                </a>
                <div className="text-sm text-white/55">
                  We don’t validate ideas. We eliminate bad ones before they kill
                  your time.
                </div>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {[
                  { k: "BS Score", v: "How much is marketing fog" },
                  { k: "Redundancy", v: "How crowded / copycat it smells" },
                  { k: "Next move", v: "The fastest validation step" },
                ].map((x) => (
                  <div
                    key={x.k}
                    className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur"
                  >
                    <div className="text-xs font-semibold tracking-wide text-white/60">
                      {x.k}
                    </div>
                    <div className="mt-2 text-sm leading-6 text-white/75">
                      {x.v}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-6 shadow-[0_30px_140px_rgba(0,0,0,0.70)] backdrop-blur">
              <div className="text-xs font-semibold tracking-wide text-white/60">
                POSITIONING
              </div>
              <div className="mt-3 text-pretty text-2xl font-semibold tracking-tight text-white">
                Is this actually forward progress… or just activity that feels
                like progress?
              </div>
              <div className="mt-4 space-y-3 text-sm leading-7 text-white/70">
                <p>
                  Founders are drowning in motion: decks, roadmaps, landing
                  pages, “AI agents,” and vague platforms. Most of it is
                  just… noise.
                </p>
                <p>
                  This engine is built to say the quiet part out loud: what’s
                  missing, what’s redundant, and what would have to be true for
                  this to be worth anyone’s time.
                </p>
              </div>
              <div className="mt-6 rounded-2xl border border-white/10 bg-black/40 p-4">
                <div className="text-xs font-semibold text-white/60">
                  Core principle
                </div>
                <div className="mt-2 text-sm text-white/75">
                  If you can’t name the buyer, the pain, and the wedge — you
                  don’t have a startup. You have a sentence.
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-6 pb-16">
          <Analyzer />
        </section>

        <section id="engine" className="mx-auto w-full max-w-6xl px-6 pb-16">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
            <div>
              <div className="text-xs font-semibold tracking-wide text-white/60">
                THE 2.0 SYSTEM (COMING NEXT)
              </div>
              <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Narrative vs activity vs reality.
              </h2>
              <p className="mt-4 max-w-xl text-pretty text-base leading-7 text-white/70">
                Version 1 is a deterministic heuristic reality check. Version 2
                becomes a structured “reality engine”: it forces the idea
                through buyer truth, problem truth, and edge truth — then
                demands proof.
              </p>
              <div className="mt-6 space-y-3 text-sm leading-7 text-white/70">
                <p>
                  <span className="font-semibold text-white/85">Narrative</span>
                  : the story founders tell themselves.
                </p>
                <p>
                  <span className="font-semibold text-white/85">Activity</span>:
                  the work that feels productive (but isn’t).
                </p>
                <p>
                  <span className="font-semibold text-white/85">Reality</span>:
                  what buyers pay for, and what pain they admit.
                </p>
              </div>
            </div>

            <div className="grid gap-4">
              {[
                {
                  t: "Buyer check",
                  d: "Who has budget authority? What would they cut to pay you?",
                },
                {
                  t: "Pain check",
                  d: "What breaks weekly? What costs money or creates risk? Where are the receipts?",
                },
                {
                  t: "Redundancy check",
                  d: "Is this already shipped by 20 incumbents? Is your wedge provable?",
                },
                {
                  t: "Value creation check",
                  d: "Are you creating new value or rearranging existing tools with marketing?",
                },
                {
                  t: "Time-waste check",
                  d: "How fast can you disprove yourself? The faster, the better.",
                },
              ].map((x) => (
                <div
                  key={x.t}
                  className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur"
                >
                  <div className="text-sm font-semibold text-white/85">
                    {x.t}
                  </div>
                  <div className="mt-2 text-sm leading-7 text-white/70">
                    {x.d}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="use-cases"
          className="mx-auto w-full max-w-6xl px-6 pb-16"
        >
          <div className="text-xs font-semibold tracking-wide text-white/60">
            WHO THIS IS FOR
          </div>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Built for people tired of fake startup progress.
          </h2>

          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                t: "Founders",
                d: "Kill the idea fast, or sharpen it into a wedge worth validating.",
              },
              {
                t: "Investors",
                d: "Pressure-test differentiation, buyer truth, and “why now” in minutes.",
              },
              {
                t: "Accelerators",
                d: "A reality filter for cohorts: less fluff, more buyer truth.",
              },
              {
                t: "Operators",
                d: "Evaluate “internal startup” projects before they consume quarters.",
              },
              {
                t: "Studios",
                d: "Run idea intake through a repeatable brutality pipeline.",
              },
              {
                t: "Venture builders",
                d: "Pick bets with real pain, real buyers, and provable wedges.",
              },
            ].map((x) => (
              <div
                key={x.t}
                className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur"
              >
                <div className="text-sm font-semibold text-white/85">{x.t}</div>
                <div className="mt-2 text-sm leading-7 text-white/70">{x.d}</div>
              </div>
            ))}
          </div>
        </section>

        <section id="vision" className="mx-auto w-full max-w-6xl px-6 pb-20">
          <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,165,60,0.10),rgba(255,255,255,0.03))] p-8 shadow-[0_30px_160px_rgba(0,0,0,0.70)] backdrop-blur sm:p-10">
            <div className="text-xs font-semibold tracking-wide text-white/60">
              VISION
            </div>
            <div className="mt-3 text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              A reality engine for startups.
            </div>
            <div className="mt-4 max-w-3xl text-pretty text-base leading-7 text-white/70">
              The world doesn’t need more ideas. It needs fewer bad ones — killed
              faster. Full of Shit exists to compress “wasted months” into
              “wasted minutes.”
            </div>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="#reality-check"
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-amber-300 via-orange-400 to-amber-200 px-6 py-3 text-sm font-semibold text-black"
              >
                Run the engine
              </a>
              <div className="text-sm text-white/55">
                Brutal truth now. Beautiful product later.
              </div>
            </div>
          </div>
        </section>

        <footer className="border-t border-white/10 bg-black/30">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-sm font-semibold text-white/75">
              Full of Shit
              <span className="ml-2 text-xs font-normal text-white/45">
                Startup Reality Engine
              </span>
            </div>
            <div className="text-xs text-white/45">
              No auth. No database. No external APIs. Deterministic heuristics.
              Vercel-ready.
            </div>
          </div>
        </footer>
      <section className="mx-auto max-w-6xl px-4 pb-16 pt-8 sm:px-6"><HeroProductPanel /></section>
      <ProcessFlowSection />
      <MarketingGraphicsStack />
    </main>
    </div>
  );
}
