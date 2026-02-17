/**
 * Tool Auto-Detection
 * Detects which AI coding tools are installed in the environment.
 */

import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { homedir } from 'node:os';
import { execSync } from 'node:child_process';
import type { ProviderType, ToolDetection } from '../types/overlay.js';

function binaryExists(name: string): boolean {
  try {
    execSync(`which ${name} 2>/dev/null || where ${name} 2>nul`, { stdio: 'pipe' });
    return true;
  } catch {
    return false;
  }
}

function getVersion(command: string): string | undefined {
  try {
    return execSync(command, { stdio: 'pipe', encoding: 'utf-8' }).trim().split('\n')[0];
  } catch {
    return undefined;
  }
}

export async function detectClaude(projectDir: string): Promise<ToolDetection> {
  const signals = [
    existsSync(join(projectDir, '.claude')),
    existsSync(join(projectDir, 'CLAUDE.md')),
    existsSync(join(projectDir, '.mcp.json')),
    existsSync(join(homedir(), '.claude')),
    binaryExists('claude'),
  ];

  return {
    provider: 'claude',
    detected: signals.some(Boolean),
    configPath: join(projectDir, '.claude'),
    version: binaryExists('claude') ? getVersion('claude --version') : undefined,
  };
}

export async function detectOpenAI(projectDir: string): Promise<ToolDetection> {
  const hasEnvKey = !!process.env.OPENAI_API_KEY;
  const hasPackage = existsSync(join(projectDir, 'node_modules', 'openai'));

  return {
    provider: 'openai',
    detected: hasEnvKey || hasPackage,
    configPath: join(projectDir, '.arcanea', 'chatgpt'),
  };
}

export async function detectGemini(projectDir: string): Promise<ToolDetection> {
  const hasEnvKey = !!(process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY);
  const hasPackage = existsSync(join(projectDir, 'node_modules', '@google'));

  return {
    provider: 'gemini',
    detected: hasEnvKey || hasPackage,
    configPath: join(projectDir, '.arcanea', 'gemini'),
  };
}

export async function detectCopilot(projectDir: string): Promise<ToolDetection> {
  const hasGithubDir = existsSync(join(projectDir, '.github'));
  const hasCopilotInstructions = existsSync(join(projectDir, '.github', 'copilot-instructions.md'));
  const hasGhCli = binaryExists('gh');

  return {
    provider: 'copilot',
    detected: hasGithubDir || hasCopilotInstructions || hasGhCli,
    configPath: join(projectDir, '.github'),
  };
}

export async function detectOpenCode(projectDir: string): Promise<ToolDetection> {
  // Detect Cursor IDE (successor to the OpenCode overlay)
  const hasCursorDir = existsSync(join(projectDir, '.cursor'));
  const hasCursorRules = existsSync(join(projectDir, '.cursorrules'));
  const hasCursorBinary = binaryExists('cursor');
  // Also check legacy OpenCode paths
  const hasOpenCodeDir = existsSync(join(projectDir, '.opencode'));
  const hasOpenCodeConfig = existsSync(join(projectDir, 'opencode.json'));

  return {
    provider: 'opencode',
    detected: hasCursorDir || hasCursorRules || hasCursorBinary || hasOpenCodeDir || hasOpenCodeConfig,
    configPath: join(projectDir, '.cursor'),
  };
}

export async function detectAllTools(projectDir: string): Promise<ToolDetection[]> {
  return Promise.all([
    detectClaude(projectDir),
    detectOpenAI(projectDir),
    detectGemini(projectDir),
    detectCopilot(projectDir),
    detectOpenCode(projectDir),
  ]);
}
