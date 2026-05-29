## Cursor Cloud specific instructions

- The root workspace is a pnpm/Turbo monorepo; package scripts in `package.json` are the source of truth for standard lint, test, build, and dev commands.
- Do not start the two primary web services with plain `pnpm dev` when testing both together: `@arcanea/web` runs on port `3001`, and `arcanea-premium-web` also defaults to `3001`. Run the web app with `pnpm dev:web`, and run the premium service with an explicit alternate port such as `PORT=3002 pnpm --filter arcanea-premium-web dev`.
- Full Supabase/auth/AI flows require the real environment variables documented in `apps/web/.env.example`. Public pages and the Academy gate quiz can run locally without those secrets, but AI generation and authenticated database flows are not end-to-end without Supabase plus Gemini credentials.
- The root `pnpm test:quick` command expects built package artifacts for several workspace packages. If it reports missing `dist` files, build `@arcanea/core`, `@arcanea/extension-core`, `@arcanea/mcp-server`, and `@arcanea/auth` before rerunning it.
- MCP memory tests use the agent home directory and expect `~/.arcanea` to exist; create that directory in the current VM session before running those tests if it is absent.
