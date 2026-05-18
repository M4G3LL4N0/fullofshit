# Autobuilder Guardrails — Full of Shit

## Identity (do not drift)

This product is a **startup reality engine** and a **spam filter for startup thinking**.

It is **not** a generic startup idea generator. It does not “inspire.” It **eliminates**.

## Future agents MUST NOT

- Turn this into a generic startup idea generator.
- Remove the brutal reality-check positioning.
- Remove the analyzer demo from the homepage.
- Add auth / database prematurely.
- Use npm (pnpm only).
- Deploy automatically (no `vercel --prod` runs by agents).
- Push automatically to GitHub.
- Delete foundation files (`RECOVERY_NOTES.md`, `AUTOBUILDER_FOUNDATION.json`, `.autobuilder/*`).
- Expose private founder information (names, emails, tokens, local secrets).
- Drift into bland SaaS copy or “friendly” tone that reduces brutality.
- Add external APIs for v1 (no LLM calls).

## Future agents SHOULD

- Improve heuristics transparently in `src/lib/analyze.ts` (no black-box scoring).
- Keep the UI premium dark, cinematic, and fast.
- Keep the demo client-side and deterministic.
- Add tests only if they’re simple and clearly valuable.
- Expand v2 system sections without removing v1 demo.

## Manual deploy command (founder)

```bash
cd /Users/joshuadavis/startups/fullofshit
pnpm install
pnpm build
vercel --prod
```

