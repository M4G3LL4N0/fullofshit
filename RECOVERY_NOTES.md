# Recovery Notes — Full of Shit

## What this is

**Full of Shit** is a **startup reality engine**. It does not generate ideas. It **eliminates** bad ones before they consume months of founder time.

The MVP is a premium marketing site + a live deterministic analyzer demo.

## Who it serves

- Founders
- Investors
- Accelerators
- Operators
- Startup studios / venture builders
- Anyone tired of fake startup progress

## Core problem

Founders confuse:

- **Narrative** (a story that sounds good)
- **Activity** (motion that feels productive)
- **Reality** (buyers paying to solve pain)

Most early ideas fail because they’re vague, redundant, missing a buyer, missing pain, or missing a wedge.

## Core solution (MVP)

- A brutal analyzer that returns:
  - BS Score
  - Viability Score
  - Redundancy Score
  - Time Waste Risk
  - Verdict + translation
  - Reasons it may fail
  - “Make it not shit” improvement
  - Next validation move
- Deterministic heuristics in `src/lib/analyze.ts`
- UI demo in `src/components/Analyzer.tsx`

## Design direction

- Premium dark: black/charcoal background
- Gold / fire-orange accents
- Glass cards, cinematic gradients
- Bold typography, mobile-first responsive layout
- No generic SaaS blue template

## Tech stack

- Next.js (App Router)
- TypeScript
- Tailwind (via Tailwind v4 CSS import)
- pnpm only
- Vercel-ready (manual deploy only)

## What to preserve

- Brutal “reality-check” positioning and copy
- Live analyzer component on the homepage
- Deterministic local heuristics (no external APIs for v1)
- Foundation + guardrails files

## What not to do

- Do not turn this into a generic startup idea generator.
- Do not add auth, database, or external API calls for v1.
- Do not deploy automatically.
- Do not push automatically to GitHub.
- Do not use npm.

## Manual deploy command (founder)

```bash
cd /Users/joshuadavis/startups/fullofshit
pnpm install
pnpm build
vercel --prod
```

## Return-later commands

```bash
pnpm dev
pnpm build
pnpm lint
```

## Disk cleanup policy

Safe to delete if needed (generated artifacts only):

- `node_modules`
- `.next`
- `.turbo`
- `.vercel/cache`
- `dist`
- `build`
- `coverage`
- `playwright-report`
- `test-results`
- `.cache`
- `.parcel-cache`
- `.DS_Store`
- `*.log`

Do not delete:

- `src`, `public`
- `package.json`, `pnpm-lock.yaml`, `tsconfig.json`, `next.config.ts`, `postcss.config.mjs`
- `README.md`, `RECOVERY_NOTES.md`, `AUTOBUILDER_FOUNDATION.json`, `.autobuilder/`
- `.gitignore`
- `.env.example`

