"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const anchorLinks = [
  { href: "#reality-check", label: "Reality check" },
  { href: "#engine", label: "Engine checks" },
  { href: "#use-cases", label: "Use cases" },
  { href: "#vision", label: "Vision" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-0 px-6 py-6">
      <div className="flex items-center justify-between gap-3">
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <div className="grid h-9 w-9 place-items-center rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur">
            <span className="text-sm font-black tracking-tight text-amber-200">FoS</span>
          </div>
          <div className="leading-tight">
            <div className="text-sm font-semibold tracking-wide text-white/85">Full of Shit</div>
            <div className="text-xs text-white/45">Startup Reality Engine</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-5 text-sm font-semibold text-white/70 md:flex" aria-label="Primary">
          {anchorLinks.map((l) => (
            <a key={l.href} className="hover:text-white" href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#reality-check"
            className="hidden rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm font-semibold text-white/80 backdrop-blur hover:bg-white/[0.06] sm:inline-flex"
          >
            Run a check
          </a>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-white md:hidden"
            aria-expanded={open}
            aria-controls="fullofshit-mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <span aria-hidden>{open ? "×" : "☰"}</span>
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="fullofshit-mobile-nav"
          className="mt-3 flex flex-col gap-2 rounded-2xl border border-white/10 bg-white/[0.03] p-4 md:hidden"
          aria-label="Mobile"
        >
          <p className="px-2 pb-1 text-xs text-white/45">Opinionated analysis for founders — not legal or investment advice.</p>
          {anchorLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-xl px-3 py-2.5 text-sm text-white/80 hover:bg-white/[0.06]"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#reality-check"
            className="mt-1 rounded-full bg-gradient-to-r from-amber-300 via-orange-400 to-amber-200 px-4 py-2 text-center text-sm font-semibold text-black"
            onClick={() => setOpen(false)}
          >
            Tell me the truth
          </a>
        </nav>
      )}
    </header>
  );
}
