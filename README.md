# Arcanea

Arcanea is the public code mirror for [arcanea.ai](https://arcanea.ai) — the creative intelligence universe for chat, lore, academy, and worldbuilding.

![Arcanea GitHub Hero](.github/assets/arcanea-github-main-hero.jpg)

## What this repo is

- The public mirror of the Arcanea web experience and supporting packages
- The best place to study the product architecture, design system, and lore model in public
- A pnpm/Turborepo monorepo centered on the active `apps/web` Next.js application

## Install

```bash
git clone https://github.com/frankxai/arcanea.git
cd arcanea
pnpm install
cp apps/web/.env.example apps/web/.env.local
pnpm dev
```

## Quality commands

```bash
pnpm turbo run type-check --filter=@arcanea/web
pnpm turbo run lint --filter=@arcanea/web
pnpm turbo run build --filter=@arcanea/web
pnpm test:quick
```

## How this relates to Arcanea

Arcanea.ai is the live product. This repository is its public mirror. Product operations, private datasets, and some internal workflows may evolve outside this mirror, but this repo remains the canonical public code reference for the living universe.

## Community

- [Discussions](https://github.com/frankxai/arcanea/discussions) — questions, ideas, showcase
- [arcanea.ai/community](https://arcanea.ai/community) — how to contribute lore, agents, skills, code, art, and music

## Ecosystem

- [arcanea-code](https://github.com/frankxai/arcanea-code): Guardian-routed coding CLI for the Arcanea ecosystem
- [arcanea-orchestrator](https://github.com/frankxai/arcanea-orchestrator): multi-agent orchestration for Arcanea swarm workflows
- [arcanea-claw](https://github.com/frankxai/arcanea-claw): 24/7 media-processing engine for creative world-builders
- [oh-my-arcanea](https://github.com/frankxai/oh-my-arcanea): Arcanea overlay for oh-my-opencode

## License

See the repository license for usage terms.
