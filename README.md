# Arcanea
Arcanea is the public code mirror for [arcanea.ai](https://arcanea.ai), the creative intelligence platform for chat, lore, academy, and worldbuilding.
## What this repo is
- The public mirror of the Arcanea web platform and supporting packages
- The best place to study the product architecture, design system, and lore model in public
- The codebase that powers the current public Arcanea experience
## Install
`ash
git clone https://github.com/frankxai/arcanea.git
cd arcanea
pnpm install
cp .env.example .env.local
pnpm dev
`
## How this relates to Arcanea
Arcanea.ai is the live product. This repository is its public mirror. Product operations, private datasets, and some internal workflows may evolve outside this mirror, but this repo remains the canonical public code reference for the platform.
## Ecosystem
- [arcanea-code](https://github.com/frankxai/arcanea-code): Guardian-routed coding CLI for the Arcanea ecosystem
- [oh-my-arcanea](https://github.com/frankxai/oh-my-arcanea): Arcanea overlay for oh-my-opencode
- [arcanea-orchestrator](https://github.com/frankxai/arcanea-orchestrator): multi-agent orchestration fork used for Arcanea swarm workflows
## License
See the repository license for usage terms.