/**
 * @arcanea/core
 *
 * Core types, constants, and utilities for the Arcanea ecosystem.
 *
 * @example
 * ```typescript
 * import { GATES, GUARDIANS, type Guardian } from '@arcanea/core';
 *
 * const lumina = GUARDIANS.find(g => g.gate === 'foundation');
 * ```
 */

// Types
export * from './types/index.js';

// Constants
export * from './constants/index.js';

// Utilities
export * from './utils/index.js';

// Content (voice, markdown generators, routing, skills, library)
export * from './content/index.js';

// Detection (tool auto-detection)
export * from './detection/index.js';

// Engine (guardian router, voice enforcer, design tokens, session)
export * from './engine/index.js';

// Generators (claude-md, copilot, system-prompt)
export * from './generators/index.js';

// Version
export const VERSION = '0.1.0';
