/**
 * File generators for Claude Code overlay.
 *
 * All skill content is generated from @arcanea/os shared constants,
 * eliminating hardcoded duplication. Development and creative skills
 * are installed at higher overlay levels.
 */

import type { OverlayLevel, Guardian } from '@arcanea/os';
import {
  SKILL_DEFINITIONS,
  getSkillsForLevel,
  generateSkillContent,
} from '@arcanea/os';
import { generateAgentContent, COMMAND_TEMPLATE } from './templates.js';

export function generateSkillFile(
  skillId: string,
  _level: OverlayLevel = 'standard',
): { filename: string; content: string } | null {
  const def = SKILL_DEFINITIONS.find(s => s.id === skillId);
  if (!def) return null;

  const content = generateSkillContent(skillId);
  if (!content) return null;

  const frontmatter = `---
name: ${def.name}
description: ${def.description}
---

`;

  return {
    filename: `${skillId}.md`,
    content: frontmatter + content,
  };
}

/**
 * Get all skill IDs appropriate for the given overlay level.
 */
export function getSkillIdsForLevel(level: OverlayLevel): string[] {
  return getSkillsForLevel(level);
}

export function generateAgentFile(guardian: Guardian): { filename: string; content: string } {
  return {
    filename: `${guardian.name}.md`,
    content: generateAgentContent(guardian),
  };
}

export function generateCommandFile(name: string, description: string, body: string): { filename: string; content: string } {
  return {
    filename: `${name}.md`,
    content: COMMAND_TEMPLATE(name, description, body),
  };
}
