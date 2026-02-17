/**
 * @arcanea/os
 *
 * Core types, constants, and utilities for the Arcanea ecosystem.
 *
 * @example
 * ```typescript
 * import { GATES, GUARDIANS, type Guardian } from '@arcanea/os';
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

// Generators
export * from './generators/index.js';

// Detection
export * from './detection/index.js';

// Engine (Intelligence Layer)
export * from './engine/index.js';

// Version
export const VERSION = '0.2.0';
