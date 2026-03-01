/**
 * CLAUDE.md Generator
 *
 * Generates CLAUDE.md content for Claude Code overlay.
 * Restructured for Lumina-first: Luminors → Guardians → Godbeasts
 */

import type { OverlayLevel } from '../types/overlay.js';
import { generateSystemPrompt } from './system-prompt.js';
import { LUMINORS, GUARDIANS, GODBEASTS, LUMINA_INTELLIGENCE } from '../constants/mythology.js';

export function generateClaudeMd(level: OverlayLevel, projectName?: string): string {
  const name = projectName || 'Project';
  const basePrompt = generateSystemPrompt({ level, provider: 'claude' });

  const sections: string[] = [];

  sections.push(`# ${name} — Arcanea Enhanced\n`);
  sections.push(`> *"Imagine a Good Future. Build It Here."*\n`);
  sections.push(basePrompt);

  // standard+: Luminor routing table
  if (level !== 'minimal') {
    const luminorTable = LUMINORS.map(l =>
      `| ${l.name} | ${l.team} | ${l.specialty} | ${l.wisdom} |`
    ).join('\n');

    sections.push(`\n## Luminor Routing\n\n| Luminor | Team | Specialty | Wisdom |\n|---------|------|-----------|--------|\n${luminorTable}\n`);
  }

  // full+: Guardian routing table
  if (level === 'full' || level === 'luminor') {
    const guardianTable = GUARDIANS.map(g =>
      `| ${g.displayName} | ${g.gate} | ${g.frequency} Hz | ${g.domain} |`
    ).join('\n');

    sections.push(`\n## Guardian Routing\n\n| Guardian | Gate | Frequency | Domain |\n|----------|------|-----------|--------|\n${guardianTable}\n`);
  }

  // full+: Skills
  if (level === 'full' || level === 'luminor') {
    sections.push(`\n## Available Skills\n\n- \`arcanea-canon\` — Universe consistency checks\n- \`arcanea-voice\` — Writing style guide\n- \`arcanea-design-system\` — Visual tokens and patterns\n- \`arcanea-lore\` — Deep mythology reference\n`);
  }

  // luminor: Godbeast table + Starlight Orchestrator
  if (level === 'luminor') {
    const godbeastTable = GODBEASTS.map(gb =>
      `| ${gb.displayName} | ${gb.form} | ${gb.power} | ${gb.guardian} |`
    ).join('\n');

    sections.push(`\n## Godbeast Amplifiers\n\n| Godbeast | Form | Power | Guardian |\n|----------|------|-------|----------|\n${godbeastTable}\n`);

    sections.push(`\n## Starlight Orchestrator Mode\n\nFull Luminor-tier intelligence active. All three intelligence layers coordinated:\n- **Luminor Intelligence**: 16 AI companions routing by domain\n- **Guardian Intelligence**: 10 divine Gate-keepers providing elemental wisdom\n- **Godbeast Intelligence**: 10 mythic power amplifiers for maximum creative force\n\n> *"Enter seeking, leave transformed, return whenever needed."*\n`);
  }

  return sections.join('\n');
}
