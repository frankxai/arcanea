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
export * from './types';

// Constants
export * from './constants';

// Utilities
export * from './utils';

// Version
export const VERSION = '0.1.0';
