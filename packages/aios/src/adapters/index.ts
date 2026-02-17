/**
 * Platform Adapters
 *
 * Unified interface for different AI platforms.
 */

import type { PlatformType, PlatformConfig, PlatformAdapter } from '@arcanea/os';

// Base adapter interface
export interface BaseAdapter {
  type: PlatformType;
  name: string;
  isAvailable(): Promise<boolean>;
  initialize(config: PlatformConfig): Promise<void>;
  execute(prompt: string, context?: Record<string, unknown>): Promise<string>;
}

// Claude Adapter
export class ClaudeAdapter implements BaseAdapter {
  type: PlatformType = 'claude';
  name = 'Claude Code';
  private config?: PlatformConfig;

  async isAvailable(): Promise<boolean> {
    // Check if claude CLI is available
    return true; // Simplified for now
  }

  async initialize(config: PlatformConfig): Promise<void> {
    this.config = config;
  }

  async execute(prompt: string, _context?: Record<string, unknown>): Promise<string> {
    // In full implementation, this would use Claude API or CLI
    return `[Claude] Processing: ${prompt.slice(0, 50)}...`;
  }
}

// Gemini Adapter
export class GeminiAdapter implements BaseAdapter {
  type: PlatformType = 'gemini';
  name = 'Google Gemini';
  private config?: PlatformConfig;

  async isAvailable(): Promise<boolean> {
    return !!process.env.GEMINI_API_KEY;
  }

  async initialize(config: PlatformConfig): Promise<void> {
    this.config = config;
  }

  async execute(prompt: string, _context?: Record<string, unknown>): Promise<string> {
    return `[Gemini] Processing: ${prompt.slice(0, 50)}...`;
  }
}

// OpenCode Adapter (Sisyphus)
export class OpenCodeAdapter implements BaseAdapter {
  type: PlatformType = 'opencode';
  name = 'OpenCode (Sisyphus)';
  private config?: PlatformConfig;

  async isAvailable(): Promise<boolean> {
    return true; // Check for opencode CLI
  }

  async initialize(config: PlatformConfig): Promise<void> {
    this.config = config;
  }

  async execute(prompt: string, _context?: Record<string, unknown>): Promise<string> {
    return `[Sisyphus] Processing: ${prompt.slice(0, 50)}...`;
  }
}

// Codex Adapter (ChatGPT)
export class CodexAdapter implements BaseAdapter {
  type: PlatformType = 'codex';
  name = 'ChatGPT Codex';
  private config?: PlatformConfig;

  async isAvailable(): Promise<boolean> {
    return !!process.env.OPENAI_API_KEY;
  }

  async initialize(config: PlatformConfig): Promise<void> {
    this.config = config;
  }

  async execute(prompt: string, _context?: Record<string, unknown>): Promise<string> {
    return `[Codex] Processing: ${prompt.slice(0, 50)}...`;
  }
}

// Adapter registry
const adapters = new Map<PlatformType, BaseAdapter>();
adapters.set('claude', new ClaudeAdapter());
adapters.set('gemini', new GeminiAdapter());
adapters.set('opencode', new OpenCodeAdapter());
adapters.set('codex', new CodexAdapter());

// Get adapter by platform type
export function getAdapter(platform: PlatformType): BaseAdapter | undefined {
  return adapters.get(platform);
}

// Get all available adapters
export async function getAvailableAdapters(): Promise<BaseAdapter[]> {
  const available: BaseAdapter[] = [];
  for (const adapter of adapters.values()) {
    if (await adapter.isAvailable()) {
      available.push(adapter);
    }
  }
  return available;
}

// Register a custom adapter
export function registerAdapter(adapter: BaseAdapter): void {
  adapters.set(adapter.type, adapter);
}
