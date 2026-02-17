/**
 * Arcanea UI Helpers
 *
 * Common utility functions for the Arcanea UI system.
 * Type-safe, well-tested helper functions.
 */

/**
 * Truncate text with ellipsis
 *
 * @param text - Text to truncate
 * @param maxLength - Maximum length before truncation
 * @param suffix - Suffix to add when truncated (default: '...')
 * @returns Truncated text
 */
export function truncate(text: string, maxLength: number, suffix = '...'): string {
  if (!text || text.length <= maxLength) {
    return text
  }

  return text.substring(0, maxLength - suffix.length) + suffix
}

/**
 * Format number with compact notation
 *
 * Examples: 1234 -> 1.2K, 1234567 -> 1.2M
 *
 * @param num - Number to format
 * @returns Formatted string
 */
export function formatCompactNumber(num: number): string {
  if (num < 1000) return num.toString()

  const formatter = new Intl.NumberFormat('en-US', {
    notation: 'compact',
    compactDisplay: 'short',
    maximumFractionDigits: 1,
  })

  return formatter.format(num)
}

/**
 * Format relative time (e.g., "2 hours ago")
 *
 * @param date - Date to format
 * @param locale - Locale string (default: 'en-US')
 * @returns Relative time string
 */
export function formatRelativeTime(date: Date, locale = 'en-US'): string {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    return 'Invalid date'
  }

  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  // Less than a minute
  if (diffInSeconds < 60) {
    return 'just now'
  }

  // Use Intl.RelativeTimeFormat for proper localization
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' })

  const timeUnits: Array<[Intl.RelativeTimeFormatUnit, number]> = [
    ['year', 31536000],
    ['month', 2592000],
    ['week', 604800],
    ['day', 86400],
    ['hour', 3600],
    ['minute', 60],
  ]

  for (const [unit, secondsInUnit] of timeUnits) {
    if (diffInSeconds >= secondsInUnit) {
      const value = Math.floor(diffInSeconds / secondsInUnit)
      return rtf.format(-value, unit)
    }
  }

  return 'just now'
}

/**
 * Debounce function calls
 *
 * @param func - Function to debounce
 * @param wait - Wait time in milliseconds
 * @returns Debounced function
 */
export function debounce<T extends (...args: never[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null
      func(...args)
    }

    if (timeout) {
      clearTimeout(timeout)
    }

    timeout = setTimeout(later, wait)
  }
}

/**
 * Throttle function calls
 *
 * @param func - Function to throttle
 * @param limit - Minimum time between calls in milliseconds
 * @returns Throttled function
 */
export function throttle<T extends (...args: never[]) => unknown>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean = false

  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => {
        inThrottle = false
      }, limit)
    }
  }
}

/**
 * Sleep/delay utility
 *
 * @param ms - Milliseconds to sleep
 * @returns Promise that resolves after delay
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Clamp number between min and max
 *
 * @param value - Value to clamp
 * @param min - Minimum value
 * @param max - Maximum value
 * @returns Clamped value
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

/**
 * Map value from one range to another
 *
 * @param value - Value to map
 * @param inMin - Input range minimum
 * @param inMax - Input range maximum
 * @param outMin - Output range minimum
 * @param outMax - Output range maximum
 * @returns Mapped value
 */
export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin
}

/**
 * Generate slug from text
 *
 * @param text - Text to slugify
 * @returns URL-safe slug
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove non-word chars
    .replace(/[\s_-]+/g, '-') // Replace spaces/underscores with hyphens
    .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
}

/**
 * Check if value is empty (null, undefined, empty string, empty array, empty object)
 *
 * @param value - Value to check
 * @returns True if empty
 */
export function isEmpty(value: unknown): boolean {
  if (value == null) return true
  if (typeof value === 'string') return value.trim().length === 0
  if (Array.isArray(value)) return value.length === 0
  if (typeof value === 'object') return Object.keys(value).length === 0
  return false
}

/**
 * Deep clone object (simple version)
 *
 * Note: For complex objects with functions/dates/etc, use structuredClone or lodash
 *
 * @param obj - Object to clone
 * @returns Cloned object
 */
export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') {
    return obj
  }

  // Use structuredClone if available (modern browsers)
  if (typeof structuredClone !== 'undefined') {
    try {
      return structuredClone(obj)
    } catch {
      // Fallback to JSON method
    }
  }

  // Fallback for simple objects
  try {
    return JSON.parse(JSON.stringify(obj))
  } catch (error) {
    console.error('Failed to deep clone object:', error)
    return obj
  }
}

/**
 * Pick specific keys from object
 *
 * @param obj - Source object
 * @param keys - Keys to pick
 * @returns New object with only picked keys
 */
export function pick<T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): Pick<T, K> {
  const result = {} as Pick<T, K>

  for (const key of keys) {
    if (key in obj) {
      result[key] = obj[key]
    }
  }

  return result
}

/**
 * Omit specific keys from object
 *
 * @param obj - Source object
 * @param keys - Keys to omit
 * @returns New object without omitted keys
 */
export function omit<T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): Omit<T, K> {
  const result = { ...obj }

  for (const key of keys) {
    delete result[key]
  }

  return result
}

/**
 * Group array items by key
 *
 * @param array - Array to group
 * @param key - Key or function to group by
 * @returns Grouped object
 */
export function groupBy<T>(
  array: T[],
  key: keyof T | ((item: T) => string | number)
): Record<string, T[]> {
  return array.reduce((result, item) => {
    const groupKey = typeof key === 'function' ? key(item) : String(item[key])

    if (!result[groupKey]) {
      result[groupKey] = []
    }

    result[groupKey].push(item)
    return result
  }, {} as Record<string, T[]>)
}

/**
 * Remove duplicate items from array
 *
 * @param array - Array with potential duplicates
 * @param key - Optional key to check uniqueness
 * @returns Array with unique items
 */
export function unique<T>(array: T[], key?: keyof T): T[] {
  if (!key) {
    return Array.from(new Set(array))
  }

  const seen = new Set<unknown>()
  return array.filter((item) => {
    const value = item[key]
    if (seen.has(value)) {
      return false
    }
    seen.add(value)
    return true
  })
}

/**
 * Chunk array into smaller arrays
 *
 * @param array - Array to chunk
 * @param size - Chunk size
 * @returns Array of chunks
 */
export function chunk<T>(array: T[], size: number): T[][] {
  const chunks: T[][] = []

  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size))
  }

  return chunks
}

/**
 * Retry async function with exponential backoff
 *
 * @param fn - Async function to retry
 * @param options - Retry options
 * @returns Function result
 */
export async function retry<T>(
  fn: () => Promise<T>,
  options: {
    maxAttempts?: number
    delay?: number
    backoff?: number
  } = {}
): Promise<T> {
  const { maxAttempts = 3, delay = 1000, backoff = 2 } = options

  let lastError: Error | undefined

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn()
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error))

      if (attempt < maxAttempts) {
        const waitTime = delay * Math.pow(backoff, attempt - 1)
        await sleep(waitTime)
      }
    }
  }

  throw lastError || new Error('Retry failed')
}
