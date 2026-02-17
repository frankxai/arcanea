/**
 * File generators for Claude Code overlay.
 */

import type { OverlayLevel, Guardian } from '@arcanea/os';
import { SKILL_TEMPLATES, generateAgentContent, COMMAND_TEMPLATE } from './templates.js';
import { SKILL_EXTENSIONS } from './content-depth.js';

/**
 * Maps an overlay level to which content tiers to include.
 */
function getTiersForLevel(level: OverlayLevel): Array<'standard' | 'full' | 'luminor'> {
  switch (level) {
    case 'minimal':
    case 'standard':
      return ['standard'];
    case 'full':
      return ['standard', 'full'];
    case 'luminor':
      return ['standard', 'full', 'luminor'];
  }
}

export function generateSkillFile(
  skillId: string,
  level: OverlayLevel = 'standard',
): { filename: string; content: string } | null {
  const template = SKILL_TEMPLATES[skillId as keyof typeof SKILL_TEMPLATES];
  if (!template) return null;

  const frontmatter = `---
name: ${template.name}
description: ${template.description}
---

`;

  // Build content by layering tiers
  let content = template.content;
  const tiers = getTiersForLevel(level);
  const extensions = SKILL_EXTENSIONS[skillId];

  if (extensions) {
    for (const tier of tiers) {
      if (tier !== 'standard' && extensions[tier]) {
        content += extensions[tier];
      }
    }
  }

  return {
    filename: `${skillId}.md`,
    content: frontmatter + content,
  };
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
