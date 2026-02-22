/**
 * Platform Adapters
 *
 * Registry and interface for AI platform adapters.
 *
 * ARCHITECTURE NOTE (2026-02-21):
 * In the Arcanea overlay architecture, the coding agent (Claude Code, Cursor,
 * Gemini Code Assist, etc.) IS the AI. The overlays and agent.md files shape
 * AI behavior without calling another AI through these adapters.
 *
 * These adapter classes provide the type-safe registry pattern and platform
 * detection. The execute() method throws NotImplementedError because direct
 * AI execution is handled by the host agent, not by AIOS.
 *
 * To add real execution in the future, implement execute() with the
 * appropriate SDK (Vercel AI SDK, etc.) in a concrete subclass.
 */

import type { PlatformType, PlatformConfig, PlatformAdapter } from '@arcanea/os';

/**
 * Error thrown when calling unimplemented adapter methods.
 * Signals that direct AI execution is not the responsibility of AIOS --
 * the host coding agent handles execution.
 */
export class AdapterNotImplementedError extends Error {
  constructor(adapterName: string) {
    super(
      `${adapterName}.execute() is not implemented. ` +
      `In the Arcanea architecture, the host coding agent (Claude Code, Cursor, etc.) ` +
      `handles AI execution. Use overlays and agent.md files to shape behavior.`
    );
    this.name = 'AdapterNotImplementedError';
  }
}

// Base adapter interface
export interface BaseAdapter {
  type: PlatformType;
  name: string;
  isAvailable(): Promise<boolean>;
  initialize(config: PlatformConfig): Promise<void>;
  execute(prompt: string, context?: Record<string, unknown>): Promise<string>;
}

// Claude Adapter — platform detection and registration only
export class ClaudeAdapter implements BaseAdapter {
  type: PlatformType = 'claude';
  name = 'Claude Code';
  private config?: PlatformConfig;

  async isAvailable(): Promise<boolean> {
    return true;
  }

  async initialize(config: PlatformConfig): Promise<void> {
    this.config = config;
  }

  async execute(_prompt: string, _context?: Record<string, unknown>): Promise<string> {
    throw new AdapterNotImplementedError('ClaudeAdapter');
  }
}

// Gemini Adapter — platform detection and registration only
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

  async execute(_prompt: string, _context?: Record<string, unknown>): Promise<string> {
    throw new AdapterNotImplementedError('GeminiAdapter');
  }
}

// OpenCode Adapter (Sisyphus) — platform detection and registration only
export class OpenCodeAdapter implements BaseAdapter {
  type: PlatformType = 'opencode';
  name = 'OpenCode (Sisyphus)';
  private config?: PlatformConfig;

  async isAvailable(): Promise<boolean> {
    return true;
  }

  async initialize(config: PlatformConfig): Promise<void> {
    this.config = config;
  }

  async execute(_prompt: string, _context?: Record<string, unknown>): Promise<string> {
    throw new AdapterNotImplementedError('OpenCodeAdapter');
  }
}

// Codex Adapter (ChatGPT) — platform detection and registration only
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

  async execute(_prompt: string, _context?: Record<string, unknown>): Promise<string> {
    throw new AdapterNotImplementedError('CodexAdapter');
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
