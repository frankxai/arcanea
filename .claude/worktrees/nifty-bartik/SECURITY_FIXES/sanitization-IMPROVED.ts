/**
 * SECURITY FIX: Improved Input Sanitization
 *
 * This module provides comprehensive sanitization for user inputs
 * to prevent XSS, injection attacks, and other security vulnerabilities.
 *
 * Installation required:
 * npm install isomorphic-dompurify
 */

import DOMPurify from 'isomorphic-dompurify';
import { z } from 'zod';

// ============================================================================
// XSS Prevention
// ============================================================================

/**
 * Sanitize plain text input
 * Removes all HTML tags and potentially dangerous content
 */
export function sanitizePlainText(input: string, maxLength = 10000): string {
  if (!input || typeof input !== 'string') return '';

  return input
    .trim()
    .substring(0, maxLength)
    .replace(/[<>]/g, '') // Remove angle brackets
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+\s*=/gi, '') // Remove event handlers
    .replace(/data:/gi, ''); // Remove data: protocol
}

/**
 * Sanitize rich text content (comments, descriptions)
 * Allows safe HTML tags while removing dangerous content
 */
export function sanitizeRichText(input: string, maxLength = 50000): string {
  if (!input || typeof input !== 'string') return '';

  const truncated = input.substring(0, maxLength);

  return DOMPurify.sanitize(truncated, {
    ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 'a', 'ul', 'ol', 'li', 'blockquote', 'code', 'pre'],
    ALLOWED_ATTR: ['href', 'target', 'rel'],
    ALLOWED_URI_REGEXP: /^https?:\/\//i, // Only allow http(s) URLs
    KEEP_CONTENT: true,
    RETURN_DOM: false,
    RETURN_DOM_FRAGMENT: false,
    RETURN_DOM_IMPORT: false,
  });
}

/**
 * Sanitize HTML for display
 * More permissive, for content that needs formatting
 */
export function sanitizeHTML(input: string): string {
  if (!input || typeof input !== 'string') return '';

  return DOMPurify.sanitize(input, {
    ALLOWED_TAGS: [
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'p', 'br', 'hr',
      'strong', 'em', 'u', 'del', 'ins',
      'a', 'ul', 'ol', 'li',
      'blockquote', 'code', 'pre',
      'table', 'thead', 'tbody', 'tr', 'th', 'td',
      'img', 'figure', 'figcaption'
    ],
    ALLOWED_ATTR: ['href', 'target', 'rel', 'src', 'alt', 'title', 'class'],
    ALLOWED_URI_REGEXP: /^https?:\/\//i,
    ADD_ATTR: ['target'], // Allow target="_blank" for external links
    KEEP_CONTENT: true,
  });
}

/**
 * Sanitize user comment with threading support
 */
export function sanitizeComment(input: string): string {
  if (!input || typeof input !== 'string') return '';

  // Limit length
  const truncated = input.substring(0, 2000);

  return DOMPurify.sanitize(truncated, {
    ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 'a', 'code'],
    ALLOWED_ATTR: ['href', 'rel'],
    ALLOWED_URI_REGEXP: /^https?:\/\//i,
    KEEP_CONTENT: true,
  });
}

// ============================================================================
// Injection Attack Prevention
// ============================================================================

/**
 * Detect SQL injection patterns
 */
export function containsSQLInjection(input: string): boolean {
  const sqlPatterns = [
    /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|UNION)\b.*\b(FROM|INTO|WHERE|TABLE)\b)/i,
    /union.*select/i,
    /;\s*(DROP|DELETE|UPDATE|INSERT)/i,
    /--\s*$/,
    /\/\*.*\*\//,
    /'\s*(OR|AND)\s*'.*=/i,
    /'\s*OR\s*'1'\s*=\s*'1/i,
  ];

  return sqlPatterns.some(pattern => pattern.test(input));
}

/**
 * Detect NoSQL injection patterns
 */
export function containsNoSQLInjection(input: string): boolean {
  const nosqlPatterns = [
    /\$where/i,
    /\$regex/i,
    /\$ne/i,
    /\$gt/i,
    /\$lt/i,
    /\{\s*\$.*\}/,
  ];

  return nosqlPatterns.some(pattern => pattern.test(input));
}

/**
 * Detect path traversal attempts
 */
export function containsPathTraversal(input: string): boolean {
  const pathPatterns = [
    /\.\.[\/\\]/,
    /\.\.%2[fF]/,
    /%2e%2e/i,
    /\.\.;/,
  ];

  return pathPatterns.some(pattern => pattern.test(input));
}

/**
 * Detect command injection attempts
 */
export function containsCommandInjection(input: string): boolean {
  const commandPatterns = [
    /[;&|`$(){}[\]]/,
    /\n\s*(cat|ls|rm|wget|curl|nc|bash|sh|chmod|sudo)/i,
  ];

  return commandPatterns.some(pattern => pattern.test(input));
}

/**
 * Comprehensive injection detection
 */
export function containsInjectionAttempt(input: string): boolean {
  return (
    containsSQLInjection(input) ||
    containsNoSQLInjection(input) ||
    containsPathTraversal(input) ||
    containsCommandInjection(input)
  );
}

// ============================================================================
// Content Safety
// ============================================================================

/**
 * Basic profanity filter
 * In production, use a proper profanity filter library or API
 */
const PROFANITY_LIST = [
  // Add profanity words here or use external library
  // This is a placeholder
];

export function containsProfanity(input: string): boolean {
  const normalized = input.toLowerCase();
  return PROFANITY_LIST.some(word => normalized.includes(word));
}

/**
 * Check for excessively long words (potential DoS)
 */
export function containsExcessivelyLongWords(input: string, maxWordLength = 50): boolean {
  const words = input.split(/\s+/);
  return words.some(word => word.length > maxWordLength);
}

/**
 * Check for excessive special characters (potential abuse)
 */
export function containsExcessiveSpecialChars(input: string, threshold = 0.3): boolean {
  const specialCharCount = (input.match(/[^a-zA-Z0-9\s]/g) || []).length;
  const ratio = specialCharCount / input.length;
  return ratio > threshold;
}

// ============================================================================
// URL Sanitization
// ============================================================================

/**
 * Sanitize and validate URL
 */
export function sanitizeURL(input: string): string | null {
  if (!input || typeof input !== 'string') return null;

  try {
    const url = new URL(input);

    // Only allow http and https protocols
    if (!['http:', 'https:'].includes(url.protocol)) {
      return null;
    }

    // Block localhost and private IPs in production
    if (process.env.NODE_ENV === 'production') {
      const hostname = url.hostname.toLowerCase();
      if (
        hostname === 'localhost' ||
        hostname.startsWith('127.') ||
        hostname.startsWith('192.168.') ||
        hostname.startsWith('10.') ||
        hostname === '0.0.0.0'
      ) {
        return null;
      }
    }

    return url.toString();
  } catch {
    return null;
  }
}

// ============================================================================
// Zod Schema Helpers
// ============================================================================

/**
 * Zod transformer for sanitized text
 */
export const sanitizedTextSchema = z
  .string()
  .trim()
  .transform(sanitizePlainText)
  .refine(val => val.length > 0, 'Input cannot be empty')
  .refine(val => !containsInjectionAttempt(val), 'Input contains invalid characters');

/**
 * Zod schema for user comment
 */
export const sanitizedCommentSchema = z
  .string()
  .min(1, 'Comment cannot be empty')
  .max(2000, 'Comment must be less than 2000 characters')
  .transform(sanitizeComment)
  .refine(val => !containsProfanity(val), 'Comment contains inappropriate content')
  .refine(val => !containsInjectionAttempt(val), 'Comment contains invalid characters');

/**
 * Zod schema for AI prompts (strict validation)
 */
export const sanitizedPromptSchema = z
  .string()
  .min(1, 'Prompt cannot be empty')
  .max(5000, 'Prompt must be less than 5000 characters')
  .transform(sanitizePlainText)
  .refine(val => !containsProfanity(val), 'Prompt contains inappropriate content')
  .refine(val => !containsInjectionAttempt(val), 'Prompt contains invalid characters')
  .refine(val => !containsExcessivelyLongWords(val), 'Prompt contains excessively long words')
  .refine(val => !containsExcessiveSpecialChars(val), 'Prompt contains too many special characters');

/**
 * Zod schema for URLs
 */
export const sanitizedURLSchema = z
  .string()
  .url('Invalid URL format')
  .transform(sanitizeURL)
  .refine(val => val !== null, 'URL protocol must be http or https');

/**
 * Zod schema for rich text content
 */
export const sanitizedRichTextSchema = z
  .string()
  .min(1, 'Content cannot be empty')
  .max(50000, 'Content is too long')
  .transform(sanitizeRichText)
  .refine(val => !containsInjectionAttempt(val), 'Content contains invalid characters');

// ============================================================================
// Object Sanitization
// ============================================================================

/**
 * Recursively sanitize all string fields in an object
 */
export function sanitizeObject<T extends Record<string, any>>(
  obj: T,
  sanitizer: (input: string) => string = sanitizePlainText
): T {
  const sanitized = { ...obj };

  for (const key in sanitized) {
    const value = sanitized[key];

    if (typeof value === 'string') {
      sanitized[key] = sanitizer(value) as any;
    } else if (Array.isArray(value)) {
      sanitized[key] = value.map(item =>
        typeof item === 'string' ? sanitizer(item) : item
      ) as any;
    } else if (typeof value === 'object' && value !== null) {
      sanitized[key] = sanitizeObject(value, sanitizer);
    }
  }

  return sanitized;
}

// ============================================================================
// Security Validation Helpers
// ============================================================================

/**
 * Comprehensive security check for user input
 */
export interface SecurityCheckResult {
  safe: boolean;
  threats: string[];
  sanitized?: string;
}

export function performSecurityCheck(input: string): SecurityCheckResult {
  const threats: string[] = [];

  if (containsSQLInjection(input)) {
    threats.push('SQL injection attempt detected');
  }

  if (containsNoSQLInjection(input)) {
    threats.push('NoSQL injection attempt detected');
  }

  if (containsPathTraversal(input)) {
    threats.push('Path traversal attempt detected');
  }

  if (containsCommandInjection(input)) {
    threats.push('Command injection attempt detected');
  }

  if (containsExcessivelyLongWords(input)) {
    threats.push('Excessively long words detected');
  }

  if (containsExcessiveSpecialChars(input)) {
    threats.push('Excessive special characters detected');
  }

  const safe = threats.length === 0;

  return {
    safe,
    threats,
    sanitized: safe ? sanitizePlainText(input) : undefined,
  };
}

// ============================================================================
// Export All
// ============================================================================

export default {
  // Text sanitization
  sanitizePlainText,
  sanitizeRichText,
  sanitizeHTML,
  sanitizeComment,

  // Injection detection
  containsSQLInjection,
  containsNoSQLInjection,
  containsPathTraversal,
  containsCommandInjection,
  containsInjectionAttempt,

  // Content safety
  containsProfanity,
  containsExcessivelyLongWords,
  containsExcessiveSpecialChars,

  // URL handling
  sanitizeURL,

  // Zod schemas
  sanitizedTextSchema,
  sanitizedCommentSchema,
  sanitizedPromptSchema,
  sanitizedURLSchema,
  sanitizedRichTextSchema,

  // Object sanitization
  sanitizeObject,

  // Security checks
  performSecurityCheck,
};
