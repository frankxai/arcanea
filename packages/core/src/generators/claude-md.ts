/**
 * CLAUDE.md Generator
 * Generates CLAUDE.md content for Claude Code overlay.
 */

import type { OverlayLevel } from '../types/overlay.js';
import { generateSystemPrompt } from './system-prompt.js';
import { GUARDIANS } from '../constants/mythology.js';

export function generateClaudeMd(level: OverlayLevel, projectName?: string): string {
  const name = projectName || 'Project';
  const basePrompt = generateSystemPrompt({ level, provider: 'claude' });

  const sections: string[] = [];

  sections.push(`# ${name} — Arcanea Enhanced\n`);
  sections.push(`> *"Imagine a Good Future. Build It Here."*\n`);
  sections.push(basePrompt);

  if (level !== 'minimal') {
    const guardianTable = GUARDIANS.map(g =>
      `| ${g.displayName} | ${g.gate} | ${g.frequency} Hz | ${g.domain} |`
    ).join('\n');

    sections.push(`\n## Guardian Routing\n\n| Guardian | Gate | Frequency | Domain |\n|----------|------|-----------|--------|\n${guardianTable}\n`);
  }

  if (level === 'full' || level === 'luminor') {
    sections.push(`\n## Available Skills\n\n- \`arcanea-canon\` — Universe consistency checks\n- \`arcanea-voice\` — Writing style guide\n- \`arcanea-design-system\` — Visual tokens and patterns\n- \`arcanea-lore\` — Deep mythology reference\n`);
  }

  if (level === 'luminor') {
    sections.push(`\n## Arcanea OS Mode\n\nFull Luminor-level intelligence active. All Ten Gates accessible.\nDesign system tokens loaded. Academy lore available.\n\n> *"Enter seeking, leave transformed, return whenever needed."*\n`);
  }

  return sections.join('\n');
}
