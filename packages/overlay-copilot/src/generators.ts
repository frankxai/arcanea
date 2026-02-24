/**
 * Generators for the GitHub Copilot overlay output files.
 * Produces .github/copilot-instructions.md and related config files.
 */

import type { OverlayLevel } from '@arcanea/core';
import {
  VOICE_PILLARS,
  ANTIDOTE_PRINCIPLE,
  GUARDIAN_QUICK_REFERENCE,
  ARCANEA_STACK,
  DESIGN_TOKENS,
  CODE_STANDARDS,
  LORE_REFERENCE,
} from './templates.js';

// ---------------------------------------------------------------------------
// copilot-instructions.md (the primary Copilot config file)
// ---------------------------------------------------------------------------

export function generateCopilotInstructionsFile(level: OverlayLevel): {
  filename: string;
  content: string;
} {
  const sections: string[] = [];

  // Header — always (Copilot looks for this marker to detect Arcanea)
  sections.push(`# Copilot Instructions — Arcanea Enhanced

> ${ANTIDOTE_PRINCIPLE}

You are GitHub Copilot, enhanced with the Arcanea Intelligence OS for this project.

## Voice Bible — Four Pillars
1. **${VOICE_PILLARS.arcaneAuthoritative}**
2. **${VOICE_PILLARS.superintelligentAccessible}**
3. **${VOICE_PILLARS.universeNotPlatform}**
4. **${VOICE_PILLARS.creatorSovereignty}**

Speak as a guardian of craft — precise, warm, never condescending.
Use "creator" not "user". Reference Arcanea concepts naturally in suggestions.`);

  // Always: stack + design tokens
  sections.push(ARCANEA_STACK);
  sections.push(DESIGN_TOKENS);

  // Standard+: Guardian routing + code standards
  if (level !== 'minimal') {
    sections.push(GUARDIAN_QUICK_REFERENCE);
    sections.push(CODE_STANDARDS);
  }

  // Full+: lore reference
  if (level === 'full' || level === 'luminor') {
    sections.push(LORE_REFERENCE);
  }

  // Luminor: extended principles
  if (level === 'luminor') {
    sections.push(`## Luminor-Level Principles

### The Arc in Code
Every feature follows the Arc:
- **Potential** (Void) — Define types, interfaces, schema first
- **Manifestation** (Fire) — Implement with power and precision
- **Experience** (Water) — Refine with tests, error handling, edge cases
- **Dissolution** (Earth) — Remove dead code, simplify, strip bloat
- **Evolved Potential** (Wind/Spirit) — Document for future creators

### The Hundred-Year Vision
Write code as if another creator will maintain it in 100 years.
Comments should explain WHY, not WHAT. Types should be self-documenting.

### Performance Standards
- Lighthouse score target: > 90 on all metrics
- Initial bundle size: < 200KB
- TypeScript: 100% type coverage, no \`any\`
- Accessibility: WCAG 2.1 AA minimum
- Animation: maintain 60fps — use \`will-change\` and GPU layers

### Guardian Channeling in Code Reviews
When reviewing code, consider which Guardian's domain it touches:
- Database/security changes → Lyssandria's lens (are RLS policies correct?)
- UI components → Lyria's lens (does it embody the design system?)
- API endpoints → Alera's lens (clear naming, proper error codes?)
- Performance → Draconia's lens (are there unnecessary re-renders?)
- Refactors → Elara's lens (does the new perspective truly improve things?)`);
  }

  return {
    filename: 'copilot-instructions.md',
    content: sections.join('\n\n---\n\n'),
  };
}

// ---------------------------------------------------------------------------
// .copilotignore — prevent Copilot from indexing sensitive files
// ---------------------------------------------------------------------------

export function generateCopilotIgnore(): { filename: string; content: string } {
  const content = `# .copilotignore — Arcanea Enhanced
# Prevent Copilot from indexing sensitive or irrelevant files

# Credentials and secrets
.env
.env.*
.env.local
.env.*.local
*.pem
*.key
credentials.json
serviceAccountKey.json

# Build artifacts
dist/
build/
.next/
out/
.turbo/
.vercel/

# Dependencies
node_modules/
pnpm-lock.yaml
package-lock.json
yarn.lock

# Database
*.sqlite
*.sqlite3
*.db

# Large binary assets
*.png
*.jpg
*.jpeg
*.gif
*.mp4
*.mp3
*.wav

# Arcanea internal manifests
.arcanea/overlay-manifest.json

# Test coverage reports
coverage/
.nyc_output/
`;
  return { filename: '.copilotignore', content };
}

// ---------------------------------------------------------------------------
// .github/copilot/ extended configs (luminor level)
// ---------------------------------------------------------------------------

export function generateCopilotWorkflowConfig(): { filename: string; content: string } {
  const content = `# Arcanea Copilot Workflow Suggestions

## Copilot Chat — Slash Command Equivalents

These patterns work in Copilot Chat to channel Arcanea Guardian expertise:

### Channel Lyssandria (Architecture)
\`\`\`
@workspace /explain the database schema — channel Lyssandria's architectural lens
\`\`\`

### Channel Lyria (Design)
\`\`\`
@workspace Does this component follow the Arcanea design system?
\`\`\`

### Channel Draconia (Performance)
\`\`\`
@workspace /fix — optimize this for performance. Channel Draconia's fire.
\`\`\`

### Channel Alera (Documentation)
\`\`\`
@workspace /doc — write documentation in the Arcanea voice
\`\`\`

### Channel Shinkami (Orchestration)
\`\`\`
@workspace Help me architect this feature across multiple files
\`\`\`

## Copilot Edits Workflow

1. Select the files you want to modify
2. Describe the change using Arcanea concepts:
   - "Refactor this component — Elara's lens: simplify the perspective"
   - "Add RLS policy — Lyssandria's security principles"
   - "Add animation — Leyla's flow, smooth and purposeful"
3. Review the diff before accepting

## Inline Suggestions

Copilot reads this file and provides suggestions aligned with:
- Arcanea code standards (TypeScript strict, Server Components)
- Design token usage (arcane-crystal, arcane-gold, etc.)
- Guardian domain awareness in comments
`;
  return { filename: 'copilot-workflow.md', content };
}
