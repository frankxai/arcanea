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

// Version
export const VERSION = '0.1.0';
