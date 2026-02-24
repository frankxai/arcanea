/**
 * claude-arcanea
 *
 * Arcanea Intelligence OS integration for Claude Code.
 * Provides mythology-infused AI agent orchestration.
 */

// Re-export core types and constants
export * from '@arcanea/core';

// Export skills
export * from './skills/index.js';

// Version
export const VERSION = '0.1.0';
export const PLATFORM = 'claude' as const;
