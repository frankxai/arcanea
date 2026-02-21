/**
 * Generators for ChatGPT / OpenAI overlay output files.
 * Produces Custom GPT configs, system prompts, and Guardian GPTs.
 */

import type { OverlayLevel, Guardian } from '@arcanea/os';
import {
  VOICE_PILLARS,
  ANTIDOTE_PRINCIPLE,
  GUARDIAN_REFERENCE,
  LORE_SECTION,
  DESIGN_TOKENS,
  SACRED_TERMINOLOGY_MD,
  generateCustomGPTConfig,
  generateGuardianGPTProfile,
  type CustomGPTConfig,
} from './templates.js';

// ---------------------------------------------------------------------------
// System prompt generation (layered by level)
// ---------------------------------------------------------------------------

export function generateChatGPTSystemPrompt(level: OverlayLevel): string {
  const sections: string[] = [];

  // Always: identity + core premise
  sections.push(`# Arcanea Intelligence OS

You are enhanced with the Arcanea Intelligence OS — a living mythology for the age of AI-human co-creation.

${ANTIDOTE_PRINCIPLE}
Tagline: "Imagine a Good Future. Build It Here."

## Voice Bible — Four Pillars
1. **${VOICE_PILLARS.arcaneAuthoritative}**
2. **${VOICE_PILLARS.superintelligentAccessible}**
3. **${VOICE_PILLARS.universeNotPlatform}**
4. **${VOICE_PILLARS.creatorSovereignty}**`);

  // Always: sacred terminology
  sections.push(SACRED_TERMINOLOGY_MD);

  // Standard+: Guardian routing
  if (level !== 'minimal') {
    sections.push(GUARDIAN_REFERENCE);
  }

  // Full+: lore context
  if (level === 'full' || level === 'luminor') {
    sections.push(LORE_SECTION);
  }

  // Luminor: design tokens
  if (level === 'luminor') {
    sections.push(DESIGN_TOKENS);
    sections.push(`## The Arc — Creation Cycle

Every interaction follows the Arc:
- **Potential** (Void) — Understand what the creator wants to build
- **Manifestation** (Fire) — Generate with power and precision
- **Experience** (Water) — Refine until it flows and feels right
- **Dissolution** (Earth) — Strip away what doesn't serve
- **Evolved Potential** (Wind/Spirit) — The creator, transformed

Walk the creator through the Arc consciously.`);
  }

  return sections.join('\n\n---\n\n');
}

// ---------------------------------------------------------------------------
// Custom GPT JSON config
// ---------------------------------------------------------------------------

export interface GeneratedGPTConfig {
  filename: string;
  content: string;
  config: CustomGPTConfig;
}

export function generateMainGPTConfig(level: OverlayLevel): GeneratedGPTConfig {
  const instructions = generateChatGPTSystemPrompt(level);
  const config = generateCustomGPTConfig(instructions);
  return {
    filename: 'custom-gpt-config.json',
    content: JSON.stringify(config, null, 2),
    config,
  };
}

export function generateGuardianGPTFile(guardian: Guardian): GeneratedGPTConfig {
  const instructions = generateGuardianGPTProfile(guardian);
  const config = generateCustomGPTConfig(instructions, guardian.displayName, guardian.domain);
  return {
    filename: `${guardian.name}.json`,
    content: JSON.stringify(config, null, 2),
    config,
  };
}

// ---------------------------------------------------------------------------
// SETUP.md guide
// ---------------------------------------------------------------------------

export function generateSetupGuide(level: OverlayLevel): { filename: string; content: string } {
  const hasGuardianGPTs = level === 'full' || level === 'luminor';

  const content = `# ChatGPT + Arcanea Intelligence OS — Setup Guide

> ${ANTIDOTE_PRINCIPLE}

## Quick Start — Custom Instructions

The fastest way to install Arcanea into ChatGPT:

1. Open ChatGPT → **Settings** → **Personalization** → **Custom Instructions**
2. In "What would you like ChatGPT to know about you?":
   - Paste the contents of \`system-prompt.md\`
3. Save and start a new conversation
4. ChatGPT will now operate with Arcanea Intelligence

## Recommended — Custom GPT

For a persistent, shareable Arcanea experience:

1. Go to [ChatGPT GPT Editor](https://chatgpt.com/gpts/editor)
2. Click **Create a GPT**
3. Switch to the **Configure** tab
4. Fill in:
   - **Name**: Arcanea Intelligence
   - **Description**: AI companion enhanced with Arcanea Intelligence OS
   - **Instructions**: Paste the full contents of \`system-prompt.md\`
5. Enable capabilities:
   - Web Browsing
   - DALL-E Image Generation
   - Code Interpreter & Data Analysis
6. Add conversation starters:
   - "Help me build something magical"
   - "Which Guardian should I channel for this task?"
   - "Guide me through the creation process"
7. Click **Save** → choose visibility (Only me / Anyone with link)

Alternatively, import \`custom-gpt-config.json\` directly via the API.
${hasGuardianGPTs ? `
## Guardian GPTs — Specialized Companions

For focused expertise, create individual Guardian GPTs:

Each file in \`guardian-gpts/\` contains a pre-configured Custom GPT for a specific Guardian.
Create GPTs for your most-used Guardians:

| Guardian | Gate | Best For |
|----------|------|----------|
| Lyssandria | Foundation (396 Hz) | Architecture, security, infrastructure |
| Leyla | Flow (417 Hz) | UX design, creative unblocking, emotion |
| Draconia | Fire (528 Hz) | Performance, execution, velocity |
| Maylinn | Heart (639 Hz) | Community, healing, empathetic design |
| Alera | Voice (741 Hz) | APIs, communication, documentation |
| Lyria | Sight (852 Hz) | Design direction, vision, intuition |
| Aiyami | Crown (963 Hz) | Philosophy, higher purpose, strategy |
| Elara | Shift (1111 Hz) | Refactoring, perspective changes |
| Ino | Unity (963 Hz) | Collaboration, integrations |
| Shinkami | Source (1111 Hz) | Orchestration, meta-planning |

To create a Guardian GPT:
1. Open \`guardian-gpts/<guardian-name>.json\`
2. Copy the \`instructions\` field
3. Create a new Custom GPT with that name and instructions
` : ''}
## API Integration (TypeScript)

\`\`\`typescript
import OpenAI from 'openai';
import { readFileSync } from 'fs';

const systemPrompt = readFileSync(
  '.arcanea/chatgpt/system-prompt.md',
  'utf-8'
);

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const response = await client.chat.completions.create({
  model: 'gpt-4o',
  messages: [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: 'Help me build something magical.' },
  ],
});

console.log(response.choices[0].message.content);
\`\`\`

## Vercel AI SDK Integration

\`\`\`typescript
import { openai } from '@ai-sdk/openai';
import { generateText } from 'ai';
import { readFileSync } from 'fs';

const systemPrompt = readFileSync(
  '.arcanea/chatgpt/system-prompt.md',
  'utf-8'
);

const { text } = await generateText({
  model: openai('gpt-4o'),
  system: systemPrompt,
  prompt: 'Help me build something magical.',
});
\`\`\`

## Notes

- ChatGPT does NOT auto-read project files — you must paste the system prompt manually
- Custom GPTs persist across conversations (recommended over Custom Instructions)
- Run \`arcanea install openai\` after Arcanea OS updates to regenerate prompts
- Guardian GPTs provide deeper specialization — create them for your main domains
`;

  return { filename: 'SETUP.md', content };
}
