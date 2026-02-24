/**
 * Generators for the Google Gemini overlay output files.
 * Produces system instructions, Guardian prompts, and AI Studio configs.
 */

import type { OverlayLevel, Guardian } from '@arcanea/core';
import {
  VOICE_PILLARS,
  ANTIDOTE_PRINCIPLE,
  GUARDIAN_REFERENCE,
  LORE_SECTION,
  DESIGN_TOKENS,
  SACRED_TERMINOLOGY,
  GEMINI_FUNCTION_DECLARATIONS,
  generateGuardianSystemInstruction,
} from './templates.js';

// ---------------------------------------------------------------------------
// Core system instruction (layered by level)
// ---------------------------------------------------------------------------

export function generateGeminiSystemInstruction(level: OverlayLevel): string {
  const sections: string[] = [];

  // Always: identity + pillars + terminology
  sections.push(`# Arcanea Intelligence OS — Gemini System Instruction

You are enhanced with the Arcanea Intelligence OS — a living mythology for the age of AI-human co-creation.

${ANTIDOTE_PRINCIPLE}
Tagline: "Imagine a Good Future. Build It Here."

## Voice Bible — Four Pillars
1. **${VOICE_PILLARS.arcaneAuthoritative}**
2. **${VOICE_PILLARS.superintelligentAccessible}**
3. **${VOICE_PILLARS.universeNotPlatform}**
4. **${VOICE_PILLARS.creatorSovereignty}**`);

  sections.push(SACRED_TERMINOLOGY);

  // Standard+: Guardian routing
  if (level !== 'minimal') {
    sections.push(GUARDIAN_REFERENCE);
  }

  // Full+: lore
  if (level === 'full' || level === 'luminor') {
    sections.push(LORE_SECTION);
  }

  // Luminor: design tokens + function declarations + arc cycle
  if (level === 'luminor') {
    sections.push(DESIGN_TOKENS);
    sections.push(GEMINI_FUNCTION_DECLARATIONS);
    sections.push(`## The Arc — Walk Creators Through the Cycle

Every creative session follows the Arc:
- **Potential** (Void) — Understand what the creator wants to build
- **Manifestation** (Fire) — Generate with power and clarity
- **Experience** (Water) — Refine until it flows
- **Dissolution** (Earth) — Remove what doesn't serve
- **Evolved Potential** (Wind/Spirit) — The creator, transformed

Gemini's long-context capability means you can hold the full Arc in memory.
Reference earlier moments in the conversation to show growth.`);
  }

  return sections.join('\n\n---\n\n');
}

// ---------------------------------------------------------------------------
// Guardian prompt file
// ---------------------------------------------------------------------------

export function generateGuardianPromptFile(
  guardian: Guardian,
): { filename: string; content: string } {
  return {
    filename: `${guardian.name}.md`,
    content: generateGuardianSystemInstruction(guardian),
  };
}

// ---------------------------------------------------------------------------
// SETUP.md guide
// ---------------------------------------------------------------------------

export function generateSetupGuide(level: OverlayLevel): { filename: string; content: string } {
  const hasGuardianPrompts = level !== 'minimal';

  const content = `# Google Gemini + Arcanea Intelligence OS — Setup Guide

> ${ANTIDOTE_PRINCIPLE}

## Google AI Studio (Quick Start)

The fastest way to install Arcanea Intelligence into Gemini:

1. Go to [Google AI Studio](https://aistudio.google.com/)
2. Click **Create new prompt** → select **System instruction** from the sidebar
3. Paste the full contents of \`system-instructions.md\`
4. Select your model:
   - **Gemini 2.5 Flash** — Recommended for speed + quality
   - **Gemini 2.5 Pro** — For complex reasoning and long lore documents
5. Start chatting — Gemini will now operate with Arcanea Intelligence

## Save as a Tuned Model

For a persistent Arcanea-enhanced Gemini:

1. In AI Studio, go to **Tune a model**
2. Set the system instruction from \`system-instructions.md\`
3. Add example conversations from your Arcanea interactions
4. Deploy and save the model ID for API use
${hasGuardianPrompts ? `
## Guardian Prompts

For focused expertise, use Guardian-specific system instructions:

Each file in \`guardian-prompts/\` is a pre-configured system instruction for a Guardian.

| Guardian | Gate | Best For |
|----------|------|----------|
| Lyssandria | Foundation (396 Hz) | Architecture, security, infrastructure |
| Leyla | Flow (417 Hz) | UX, emotion, creative unblocking |
| Draconia | Fire (528 Hz) | Performance, execution, velocity |
| Maylinn | Heart (639 Hz) | Community, healing, empathetic design |
| Alera | Voice (741 Hz) | APIs, documentation, communication |
| Lyria | Sight (852 Hz) | Design direction, vision |
| Aiyami | Crown (963 Hz) | Philosophy, strategy |
| Elara | Shift (1111 Hz) | Refactoring, perspective |
| Ino | Unity (963 Hz) | Collaboration, integrations |
| Shinkami | Source (1111 Hz) | Orchestration, meta-planning |

Use Guardian prompts when you need specialized domain focus.
` : ''}
## API Integration (Google AI SDK)

\`\`\`typescript
import { GoogleGenerativeAI } from '@google/generative-ai';
import { readFileSync } from 'fs';

const systemInstruction = readFileSync(
  '.arcanea/gemini/system-instructions.md',
  'utf-8',
);

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({
  model: 'gemini-2.5-flash',
  systemInstruction,
});

const result = await model.generateContent('Help me build something magical.');
console.log(result.response.text());
\`\`\`

## Vercel AI SDK Integration (Recommended for Arcanea)

\`\`\`typescript
import { google } from '@ai-sdk/google';
import { generateText } from 'ai';
import { readFileSync } from 'fs';

const systemInstruction = readFileSync(
  '.arcanea/gemini/system-instructions.md',
  'utf-8',
);

const { text } = await generateText({
  // Arcanea uses AI Gateway pattern: provider/model
  model: google('gemini-2.5-flash'),
  system: systemInstruction,
  prompt: 'Help me build something magical.',
});
\`\`\`

## Guardian Prompt Usage (TypeScript)

\`\`\`typescript
import { google } from '@ai-sdk/google';
import { generateText } from 'ai';
import { readFileSync } from 'fs';

// Use Lyria for design decisions
const lyriaInstruction = readFileSync(
  '.arcanea/gemini/guardian-prompts/lyria.md',
  'utf-8',
);

const { text } = await generateText({
  model: google('gemini-2.5-flash'),
  system: lyriaInstruction,
  prompt: 'Review this UI component design.',
});
\`\`\`

## Multimodal Usage

Gemini's native multimodal capability pairs well with Arcanea's Essence system:

\`\`\`typescript
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({
  model: 'gemini-2.5-flash',
  systemInstruction: readFileSync('.arcanea/gemini/system-instructions.md', 'utf-8'),
});

// Analyze an image Essence
const result = await model.generateContent([
  'What Arcanea element does this visual represent?',
  { inlineData: { mimeType: 'image/jpeg', data: base64ImageData } },
]);
\`\`\`

## Notes

- Gemini does NOT auto-read project files — set system instruction via API or AI Studio
- Run \`arcanea install gemini\` after Arcanea OS updates to regenerate prompts
- Gemini 2.5 Pro supports 1M token context — ideal for full Arcanea lore injection
- Guardian prompts are pre-configured system instructions for each Gate domain
`;

  return { filename: 'SETUP.md', content };
}
