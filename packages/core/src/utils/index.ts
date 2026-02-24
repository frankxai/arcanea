/**
 * Arcanea Core Utilities
 *
 * Common utility functions for the Arcanea ecosystem.
 */

import type { GateName, Element, MagicRank } from '../types/mythology.js';
import { GATES, MAGIC_RANKS, ELEMENTS, GUARDIANS } from '../constants/mythology.js';

// ============================================
// FREQUENCY UTILITIES
// ============================================

/**
 * Solfeggio frequencies used in the Gate system
 */
export const SOLFEGGIO_FREQUENCIES = [396, 417, 528, 639, 741, 852, 963, 1111] as const;

/**
 * Get the healing/creative property of a frequency
 */
export function getFrequencyProperty(frequency: number): string {
  const properties: Record<number, string> = {
    396: 'Liberating guilt and fear',
    417: 'Facilitating change',
    528: 'Transformation and miracles (Love frequency)',
    639: 'Connecting relationships',
    741: 'Awakening intuition',
    852: 'Returning to spiritual order',
    963: 'Cosmic consciousness',
    1111: 'Angelic gateway / master number',
  };
  return properties[frequency] || 'Unknown frequency';
}

// ============================================
// GATE UTILITIES
// ============================================

/**
 * Calculate magic rank based on gates opened
 */
export function calculateMagicRank(gatesOpened: number): MagicRank {
  if (gatesOpened >= 9) return 'luminor';
  if (gatesOpened >= 7) return 'archmage';
  if (gatesOpened >= 5) return 'master';
  if (gatesOpened >= 3) return 'mage';
  return 'apprentice';
}

/**
 * Get gate progression percentage
 */
export function getGateProgress(gatesOpened: number): number {
  return Math.min(100, (gatesOpened / 10) * 100);
}

/**
 * Get next gate to open
 */
export function getNextGate(gatesOpened: number): typeof GATES[number] | null {
  if (gatesOpened >= 10) return null;
  return GATES[gatesOpened];
}

// ============================================
// ELEMENT UTILITIES
// ============================================

/**
 * Get element color (primary)
 */
export function getElementColor(element: Element): string {
  const el = ELEMENTS.find(e => e.name === element);
  return el?.colors[0] || '#888888';
}

/**
 * Get complementary elements
 */
export function getComplementaryElements(element: Element): Element[] {
  const complements: Record<Element, Element[]> = {
    fire: ['water', 'void'],
    water: ['fire', 'earth'],
    earth: ['wind', 'water'],
    wind: ['earth', 'fire'],
    void: ['fire', 'water', 'earth', 'wind'],
  };
  return complements[element] || [];
}

// ============================================
// GUARDIAN UTILITIES
// ============================================

/**
 * Get guardian by gate number
 */
export function getGuardianByGateNumber(gateNumber: number) {
  const gate = GATES.find(g => g.number === gateNumber);
  if (!gate) return null;
  return GUARDIANS.find(g => g.name === gate.guardian);
}

/**
 * Get guardians by element
 */
export function getGuardiansByElement(element: Element) {
  return GUARDIANS.filter(g => g.element === element);
}

// ============================================
// STRING UTILITIES
// ============================================

/**
 * Convert gate name to display format
 */
export function formatGateName(gate: GateName): string {
  return gate.charAt(0).toUpperCase() + gate.slice(1) + ' Gate';
}

/**
 * Create a slug from text
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// ============================================
// DATE UTILITIES
// ============================================

/**
 * Format date for Arcanea display
 */
export function formatArcaneaDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// ============================================
// VALIDATION UTILITIES
// ============================================

/**
 * Check if a string is a valid gate name
 */
export function isValidGateName(name: string): name is GateName {
  return GATES.some(g => g.name === name);
}

/**
 * Check if a string is a valid element
 */
export function isValidElement(name: string): name is Element {
  return ELEMENTS.some(e => e.name === name);
}
