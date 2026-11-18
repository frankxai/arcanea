## Cursor Cloud specific instructions

- The root workspace is a pnpm/Turbo monorepo; package scripts in `package.json` are the source of truth for standard lint, test, build, and dev commands.
- Do not start the two primary web services with plain `pnpm dev` when testing both together: `@arcanea/web` runs on port `3001`, and `arcanea-premium-web` also defaults to `3001`. Run the web app with `pnpm dev:web`, and run the premium service with an explicit alternate port such as `PORT=3002 pnpm --filter arcanea-premium-web dev`.
- Full Supabase/auth/AI flows require the real environment variables documented in `apps/web/.env.example`. Public pages and the Academy gate quiz can run locally without those secrets, but AI generation and authenticated database flows are not end-to-end without Supabase plus Gemini credentials.
- Local Supabase startup with current CLI versions rejects the committed `supabase/config.toml` value `realtime.ip_version = "ipv4"`; use real remote Supabase env values, or fix/test that config casing before relying on `supabase start`.
- The root `pnpm test:quick` command expects built package artifacts for several workspace packages. If it reports missing `dist` files, build `@arcanea/core`, `@arcanea/extension-core`, `@arcanea/mcp-server`, and `@arcanea/auth` before rerunning it.
- MCP memory tests use the agent home directory and expect `~/.arcanea` to exist; create that directory in the current VM session before running those tests if it is absent.

<!-- web-excellence:begin -->
## Web design gate

Website and web-design work goes through the `web-release-gate` skill first, before any UI code. It sequences the pack's skills in `.claude/skills/` and defines what done requires: audit findings and before and after screenshots at 375, 768 and 1440 px, never a self-assigned score. This repo's own `design.md` and `taste.md` outrank every skill in the pack.

A shader, canvas, glass panel, liquid-metal mark or 3D element goes through `gpu-surface` first. It decides whether the page earns one (one GPU surface per route, and the repo's taste file before any tutorial), then hands the build to `liquid-logo`, `shader-backdrop`, `liquid-glass` or `r3f-scene`. A look across the whole site is decided once in `material-system`, with the owner's approval. Finish with `node .claude/skills/gpu-surface/probe.mjs --url <route>`.

Delegate web builds to `worker-web-builder` and have `worker-visual-qa` judge them on a different model. `worker-web-steward` handles dependency upkeep.
<!-- web-excellence:end -->
