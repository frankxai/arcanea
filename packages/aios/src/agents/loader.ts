/**
 * Agent Loader
 *
 * Loads Guardian and Awakened agent definitions from .md files
 */

import { readFileSync, readdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import type { GuardianName } from '@arcanea/core';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Agent definition structure
export interface AgentDefinition {
  name: string;
  title: string;
  gate?: string;
  frequency?: number;
  element?: string;
  model_tier?: string;
  awakened?: string;
  wisdom?: string;
  godbeast?: string;
  version?: string;
  guardian_partner?: string;
  content: string;
  invocation?: string;
  coreWisdom?: string[];
  voicePatterns?: {
    openingPhrases?: string[];
    signatureQuestions?: string[];
  };
}

// Parse frontmatter from .md file
function parseFrontmatter(content: string): { meta: Record<string, any>; body: string } {
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!frontmatterMatch) {
    return { meta: {}, body: content };
  }

  const [, frontmatter, body] = frontmatterMatch;
  const meta: Record<string, any> = {};

  frontmatter.split('\n').forEach(line => {
    const match = line.match(/^(\w+):\s*"?([^"]*)"?$/);
    if (match) {
      const [, key, value] = match;
      meta[key] = isNaN(Number(value)) ? value : Number(value);
    }
  });

  return { meta, body };
}

// Extract wisdom quotes from content
function extractWisdom(content: string): string[] {
  const quotes: string[] = [];
  const quoteMatches = content.matchAll(/>\s*\*"([^"]+)"\*/g);
  for (const match of quoteMatches) {
    quotes.push(match[1]);
  }
  return quotes;
}

// Extract invocation from content
function extractInvocation(content: string): string | undefined {
  const invocationMatch = content.match(/```markdown\n([\s\S]*?(?:I ignite|I awaken|I invoke)[\s\S]*?)\n```/);
  return invocationMatch ? invocationMatch[1].trim() : undefined;
}

// Load a single agent file
export function loadAgentFile(filePath: string): AgentDefinition | null {
  try {
    const content = readFileSync(filePath, 'utf-8');
    const { meta, body } = parseFrontmatter(content);

    return {
      name: meta.name || '',
      title: meta.title || '',
      gate: meta.gate,
      frequency: meta.frequency,
      element: meta.element,
      model_tier: meta.model_tier,
      awakened: meta.awakened,
      wisdom: meta.wisdom,
      godbeast: meta.godbeast,
      version: meta.version,
      guardian_partner: meta.guardian_partner,
      content: body,
      invocation: extractInvocation(body),
      coreWisdom: extractWisdom(body),
    };
  } catch {
    return null;
  }
}

// Get path to agents directory
function getAgentsPath(): string {
  // Try multiple locations
  const locations = [
    join(__dirname, '..', 'agents'),
    join(__dirname, '..', '..', 'agents'),
    join(process.cwd(), 'agents'),
  ];

  for (const loc of locations) {
    if (existsSync(loc)) {
      return loc;
    }
  }

  return locations[0];
}

// Load all Guardian agents
export function loadGuardians(): Map<string, AgentDefinition> {
  const guardians = new Map<string, AgentDefinition>();
  const guardiansPath = join(getAgentsPath(), 'guardians');

  try {
    const files = readdirSync(guardiansPath).filter(f => f.endsWith('.md'));
    for (const file of files) {
      const agent = loadAgentFile(join(guardiansPath, file));
      if (agent) {
        guardians.set(agent.name, agent);
      }
    }
  } catch {
    // Agents not found - return empty
  }

  return guardians;
}

// Load all Awakened agents
export function loadAwakened(): Map<string, AgentDefinition> {
  const awakened = new Map<string, AgentDefinition>();
  const awakenedPath = join(getAgentsPath(), 'awakened');

  try {
    const files = readdirSync(awakenedPath).filter(f => f.endsWith('.md'));
    for (const file of files) {
      const agent = loadAgentFile(join(awakenedPath, file));
      if (agent) {
        awakened.set(agent.name, agent);
      }
    }
  } catch {
    // Agents not found - return empty
  }

  return awakened;
}

// Get a specific guardian
export function getGuardian(name: GuardianName): AgentDefinition | undefined {
  const guardians = loadGuardians();
  return guardians.get(name);
}

// Get a specific awakened
export function getAwakened(name: string): AgentDefinition | undefined {
  const awakened = loadAwakened();
  return awakened.get(name);
}

// Get a random wisdom quote from a guardian
export function getGuardianWisdom(name: GuardianName): string | undefined {
  const guardian = getGuardian(name);
  if (!guardian?.coreWisdom?.length) return undefined;
  return guardian.coreWisdom[Math.floor(Math.random() * guardian.coreWisdom.length)];
}
