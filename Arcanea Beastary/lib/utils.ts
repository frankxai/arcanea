import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility function to merge Tailwind CSS classes with clsx
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a string to title case
 */
export function toTitleCase(str: string): string {
  return str.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );
}

/**
 * Truncate text to a specified length
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substr(0, maxLength).trim() + '...';
}

/**
 * Generate a random ID
 */
export function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

/**
 * Format culture display name
 */
export function formatCultureName(cultureName: string, region?: string): string {
  if (region) {
    return `${cultureName} (${region})`;
  }
  return cultureName;
}

/**
 * Get creature classification emoji
 */
export function getCreatureEmoji(classification: string): string {
  const emojiMap: Record<string, string> = {
    'Dragon': '🐉',
    'Divine Wolf': '🐺',
    'Serpentine Monster': '🐍',
    'Divine Guardian': '🦁',
    'Fairy Spirit': '👻',
    'Fox Spirit': '🦊',
    'Sea Monster': '🐙',
    'Divine Bird': '🔥',
    'Divine Guide': '⚱️',
    'Sphinx': '🦁',
    'Hydra': '🐍',
    'Phoenix': '🔥',
    'Banshee': '👻',
    'Kitsune': '🦊',
    'Kraken': '🐙',
    'Anubis': '⚱️',
    'Fenrir': '🐺',
  };
  
  return emojiMap[classification] || '✨';
}

/**
 * Get verification status display
 */
export function getVerificationDisplay(status: string): { emoji: string; text: string; color: string } {
  const statusMap: Record<string, { emoji: string; text: string; color: string }> = {
    'verified': { emoji: '✅', text: 'Verified', color: 'text-green-400' },
    'pending': { emoji: '⏳', text: 'Pending Review', color: 'text-yellow-400' },
    'community_approved': { emoji: '👥', text: 'Community Approved', color: 'text-blue-400' },
    'needs_review': { emoji: '🔍', text: 'Needs Review', color: 'text-orange-400' },
    'rejected': { emoji: '❌', text: 'Rejected', color: 'text-red-400' },
  };
  
  return statusMap[status] || { emoji: '❓', text: 'Unknown', color: 'text-gray-400' };
}

/**
 * Format array as comma-separated string with "and" before last item
 */
export function formatList(items: string[]): string {
  if (items.length === 0) return '';
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  
  const lastItem = items[items.length - 1];
  const otherItems = items.slice(0, -1);
  
  return `${otherItems.join(', ')}, and ${lastItem}`;
}

/**
 * Calculate reading time for text
 */
export function calculateReadingTime(text: string): number {
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  waitFor: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>): void => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), waitFor);
  };
}

/**
 * Check if a string is a valid URL
 */
export function isValidUrl(string: string): boolean {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}

/**
 * Generate a gradient class based on creature type
 */
export function getCreatureGradient(creatureType: string): string {
  const gradientMap: Record<string, string> = {
    'corporeal': 'from-blue-500 to-purple-500',
    'spiritual': 'from-purple-500 to-pink-500',
    'divine': 'from-yellow-500 to-orange-500',
    'shapeshifter': 'from-green-500 to-teal-500',
    'elemental': 'from-red-500 to-yellow-500',
  };
  
  return gradientMap[creatureType] || 'from-gray-500 to-gray-600';
}

/**
 * Format cultural significance for display
 */
export function formatCulturalSignificance(significance: string): string {
  // Remove extra whitespace and format for display
  return significance
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\. ([A-Z])/g, '.\n\n$1'); // Add paragraph breaks after sentences
}

/**
 * Generate SEO-friendly slug from creature name
 */
export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Color utilities for dynamic theming
 */
export const colors = {
  cultures: {
    'Norse': 'from-blue-600 to-indigo-600',
    'Greek': 'from-purple-600 to-pink-600',
    'Egyptian': 'from-yellow-600 to-orange-600',
    'Celtic': 'from-green-600 to-teal-600',
    'Japanese': 'from-red-600 to-rose-600',
  },
  classifications: {
    'Dragon': 'from-red-500 to-orange-500',
    'Spirit': 'from-purple-500 to-pink-500',
    'Guardian': 'from-blue-500 to-indigo-500',
    'Monster': 'from-gray-500 to-slate-500',
    'Divine': 'from-yellow-500 to-amber-500',
  }
};

/**
 * Get color class for culture
 */
export function getCultureColor(cultureName: string): string {
  return colors.cultures[cultureName as keyof typeof colors.cultures] || 'from-gray-500 to-gray-600';
}

/**
 * Get color class for classification
 */
export function getClassificationColor(classification: string): string {
  // Find matching key by checking if classification contains the key
  const matchingKey = Object.keys(colors.classifications).find(key => 
    classification.toLowerCase().includes(key.toLowerCase())
  );
  
  return matchingKey 
    ? colors.classifications[matchingKey as keyof typeof colors.classifications]
    : 'from-gray-500 to-gray-600';
}

/**
 * Format creature size for display
 */
export function formatCreatureSize(sizeCategory: string, heightMin?: number, heightMax?: number): string {
  let sizeText = toTitleCase(sizeCategory);
  
  if (heightMin && heightMax) {
    const minStr = heightMin < 1 ? `${(heightMin * 100).toFixed(0)}cm` : `${heightMin.toFixed(1)}m`;
    const maxStr = heightMax < 1 ? `${(heightMax * 100).toFixed(0)}cm` : `${heightMax.toFixed(1)}m`;
    sizeText += ` (${minStr} - ${maxStr})`;
  } else if (heightMin) {
    const heightStr = heightMin < 1 ? `${(heightMin * 100).toFixed(0)}cm` : `${heightMin.toFixed(1)}m`;
    sizeText += ` (${heightStr})`;
  }
  
  return sizeText;
}