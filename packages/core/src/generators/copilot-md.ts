/**
 * Copilot Instructions Generator
 * Generates .github/copilot-instructions.md content.
 */

import type { OverlayLevel } from '../types/overlay.js';
import { generateSystemPrompt } from './system-prompt.js';

export function generateCopilotInstructions(level: OverlayLevel): string {
  const prompt = generateSystemPrompt({ level, provider: 'copilot', maxLength: 8000 });

  return `# Copilot Instructions — Arcanea Enhanced

${prompt}

## Code Style

- Write TypeScript with strict types
- Prefer Server Components by default (Next.js)
- Use Tailwind CSS with the Arcanea design tokens
- Follow the Arcanea voice in comments and documentation
`;
}
