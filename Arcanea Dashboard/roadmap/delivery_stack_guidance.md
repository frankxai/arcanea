# Delivery Stack & Repo Strategy Guidance

## Dashboard / Landing Integration
- **Short term**: keep the immersive landing (`docs/arcanea_master_canvas.html`) and focused tracker (`docs/focused_delivery.html`) as static HTML for rapid edits and low friction sharing.
- **Medium term**: mirror the same content inside a Next.js marketing site (e.g., `apps/web`) so we can embed live metrics, authentication, and roadmap gating without duplicating copy. Use MDX to source from `docs/` files.
- **Recommendation**: build a lightweight Next.js route that imports markdown via `next-mdx-remote`, ensuring single source of truth in `docs/` while presenting polished web pages.

## Repo Synchronization
- Maintain the current monorepo (`c:\Users\Frank\Arcanea`) for shared packages, apps, and documentation.
- Spin up two satellite repos when needed:
  1. **arcanea-public-docs** (GitHub public) -> mirrors approved docs (`ARCANEA_CANVAS.md`, `ARCANEA_CODEX.md`, `ARCANEA_GLOSSARY.md`) via automation.
  2. **arcanea-secrets** (private) -> holds infra IaC, credentials templates, and deployment manifests.
- Use Git submodules or GitHub Actions to sync `docs/` folder into the public docs repo on merge to `main`.
- For the Dashboard workspace, keep it within the monorepo so sprint plans and automation prompts stay versioned alongside code.

## Next Steps
1. Create Next.js marketing route that consumes `docs/arcanea_master_canvas.html` content via MDX.
2. Draft GitHub Action to push approved docs to `arcanea-public-docs` once review labels applied.
3. Establish branching policy: `main` (stable), `develop` (integration), feature branches per sprint focus (`feature/sparkwave-chat`).

This approach balances fast iteration on internal rituals with scalable delivery when we are ready to expose artifacts externally.
