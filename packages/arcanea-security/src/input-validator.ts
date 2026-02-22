/**
 * @arcanea/security — InputValidator
 *
 * Input validation with safe patterns. First line of defense
 * at Lyssandria's Earth Gate. Validates strings, delegates
 * path validation to PathValidator and command validation
 * to SafeExecutor.
 */

import type {
  StringValidationOptions,
  ValidationResult,
} from './types.js';
import { PathValidator } from './path-validator.js';
import { SafeExecutor } from './safe-executor.js';

/**
 * Dangerous character patterns that should be stripped during sanitization.
 * Covers null bytes, control characters, and common injection vectors.
 */
const DANGEROUS_CHARS = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g;

/**
 * Patterns that indicate potential injection attempts in string inputs.
 */
const INJECTION_PATTERNS: RegExp[] = [
  /<script\b[^>]*>/i,
  /javascript:/i,
  /on\w+\s*=/i,
  /data:text\/html/i,
  /vbscript:/i,
  /expression\s*\(/i,
  /url\s*\(/i,
  /import\s*\(/i,
  /__proto__/,
  /constructor\s*\[/,
  /\beval\s*\(/,
  /\bFunction\s*\(/,
];

/**
 * SQL injection indicator patterns.
 */
const SQL_PATTERNS: RegExp[] = [
  /('\s*(OR|AND)\s+')/i,
  /(;\s*(DROP|DELETE|UPDATE|INSERT|ALTER)\s)/i,
  /(\bUNION\s+SELECT\b)/i,
  /(--\s*$)/,
  /(\b(EXEC|EXECUTE)\s+(sp_|xp_))/i,
];

export class InputValidator {
  private pathValidator: PathValidator;
  private safeExecutor: SafeExecutor;

  constructor() {
    this.pathValidator = new PathValidator();
    this.safeExecutor = new SafeExecutor();
  }

  /**
   * Validate a string input against configurable constraints.
   */
  validateString(
    input: string,
    opts: StringValidationOptions = {},
  ): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];
    let value = input;

    // Trim if requested (default: true)
    if (opts.trim !== false) {
      value = value.trim();
    }

    // Length checks
    if (opts.minLength !== undefined && value.length < opts.minLength) {
      errors.push(
        `Input length ${value.length} is below minimum ${opts.minLength}`,
      );
    }

    if (opts.maxLength !== undefined && value.length > opts.maxLength) {
      errors.push(
        `Input length ${value.length} exceeds maximum ${opts.maxLength}`,
      );
    }

    // Pattern match
    if (opts.pattern && !opts.pattern.test(value)) {
      errors.push(`Input does not match required pattern ${opts.pattern}`);
    }

    // Allowed characters check
    if (opts.allowedChars) {
      const disallowed = value.replace(opts.allowedChars, '');
      if (disallowed.length > 0) {
        errors.push(
          `Input contains disallowed characters: ${disallowed.slice(0, 20)}`,
        );
      }
    }

    // Disallowed patterns check
    if (opts.disallowedPatterns) {
      for (const pattern of opts.disallowedPatterns) {
        if (pattern.test(value)) {
          errors.push(`Input matches disallowed pattern: ${pattern}`);
        }
      }
    }

    // Injection detection (always-on warnings)
    for (const pattern of INJECTION_PATTERNS) {
      if (pattern.test(value)) {
        warnings.push(`Potential injection pattern detected: ${pattern}`);
      }
    }

    for (const pattern of SQL_PATTERNS) {
      if (pattern.test(value)) {
        warnings.push(`Potential SQL injection pattern detected: ${pattern}`);
      }
    }

    return {
      valid: errors.length === 0,
      sanitized: value,
      errors,
      warnings,
    };
  }

  /**
   * Validate a file path. Delegates to PathValidator.
   */
  validatePath(
    input: string,
    allowedRoots?: string[],
  ): ValidationResult {
    const result = this.pathValidator.validatePath(input, allowedRoots);
    return {
      valid: result.valid,
      sanitized: result.normalized,
      errors: result.errors,
      warnings: result.blocked ? [`Path blocked: ${result.reason}`] : [],
    };
  }

  /**
   * Validate a command. Delegates to SafeExecutor.
   */
  validateCommand(input: string): ValidationResult {
    const assessment = this.safeExecutor.isCommandSafe(input);
    return {
      valid: assessment.safe,
      sanitized: input,
      errors: assessment.blocked
        ? [`Command blocked: ${assessment.reasons.join(', ')}`]
        : [],
      warnings: assessment.safe
        ? []
        : assessment.reasons.map((r) => `Command risk (${assessment.risk}): ${r}`),
    };
  }

  /**
   * Sanitize input by stripping dangerous characters and normalizing.
   */
  sanitize(input: string): string {
    let result = input;

    // Remove null bytes
    result = result.replace(/\0/g, '');

    // Remove control characters (keep newlines, tabs, carriage returns)
    result = result.replace(DANGEROUS_CHARS, '');

    // Normalize Unicode to NFC form
    result = result.normalize('NFC');

    // Collapse excessive whitespace
    result = result.replace(/\s{100,}/g, ' '.repeat(99));

    return result;
  }
}
