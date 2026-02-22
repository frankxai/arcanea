/**
 * @arcanea/security — PathValidator
 *
 * Path traversal prevention. Ensures file system access stays
 * within allowed boundaries. Blocks access to sensitive system
 * files, .env, .git/config, SSH keys, etc.
 *
 * Lyssandria's Earth Gate protects the Foundation —
 * no path shall escape the boundaries of trust.
 */

import { resolve, normalize, sep, posix } from 'path';
import type { PathValidationResult } from './types.js';

/**
 * Sensitive paths that are always blocked regardless of allowedRoots.
 * These represent system-critical or credential-bearing locations.
 */
const BLOCKED_PATHS: string[] = [
  '/etc/passwd',
  '/etc/shadow',
  '/etc/sudoers',
  '/etc/hosts',
  '/etc/ssh',
  '/root/.ssh',
  '/root/.bashrc',
  '/root/.bash_history',
  '/proc/self',
  '/dev/sda',
];

/**
 * Filename patterns that are always blocked.
 */
const BLOCKED_PATTERNS: RegExp[] = [
  /\.env($|\.)/,          // .env, .env.local, .env.production
  /\.git\/config$/,       // Git config
  /\.git\/credentials$/,  // Git credentials
  /\.ssh\//,              // SSH directory contents
  /id_rsa/,               // SSH private keys
  /id_ed25519/,           // SSH keys (ed25519)
  /\.pem$/,               // Certificate private keys
  /\.key$/,               // Private key files
  /credentials\.json$/,   // Generic credentials
  /secrets\.ya?ml$/,      // Secrets files
  /\.npmrc$/,             // npm auth tokens
  /\.pypirc$/,            // PyPI auth tokens
  /\.docker\/config\.json$/, // Docker auth
];

/**
 * Traversal indicators — character sequences that indicate
 * an attempt to escape directory boundaries.
 */
const TRAVERSAL_PATTERNS: RegExp[] = [
  /\.\.\//,               // ../
  /\.\.\\/,               // ..\
  /\.\.$/,                // ends with ..
  /^~\//,                 // home directory reference
  /^~\\/,                 // home directory (windows)
  /%2e%2e/i,              // URL-encoded ..
  /%252e%252e/i,          // Double URL-encoded ..
  /\.\.\%2f/i,            // Mixed traversal
  /\%2f\.\./i,            // Mixed traversal
];

export class PathValidator {
  /**
   * Check if a path contains traversal attempts.
   * Returns true if the path appears to be a traversal attack.
   */
  isTraversalAttempt(path: string): boolean {
    // Check direct traversal patterns
    for (const pattern of TRAVERSAL_PATTERNS) {
      if (pattern.test(path)) {
        return true;
      }
    }

    // Check for null byte injection
    if (path.includes('\0')) {
      return true;
    }

    // Normalize and compare — if normalization changes the path
    // significantly (removes ..), it was a traversal attempt
    const normalized = normalize(path);
    if (path.includes('..') && !normalized.includes('..')) {
      return true;
    }

    return false;
  }

  /**
   * Validate a path against allowed root directories.
   * Ensures the resolved path stays within at least one allowed root.
   */
  validatePath(
    path: string,
    allowedRoots?: string[],
  ): PathValidationResult {
    const errors: string[] = [];

    // Check for traversal attempts
    if (this.isTraversalAttempt(path)) {
      return {
        valid: false,
        errors: ['Path contains traversal sequences'],
        blocked: true,
        reason: 'Directory traversal detected',
      };
    }

    // Check for null bytes
    if (path.includes('\0')) {
      return {
        valid: false,
        errors: ['Path contains null bytes'],
        blocked: true,
        reason: 'Null byte injection detected',
      };
    }

    // Normalize the path
    const normalized = this.normalizePath(path);

    // Check against blocked sensitive paths
    for (const blocked of BLOCKED_PATHS) {
      if (
        normalized === blocked ||
        normalized.startsWith(blocked + '/')
      ) {
        return {
          valid: false,
          normalized,
          errors: [`Access to ${blocked} is forbidden`],
          blocked: true,
          reason: `Sensitive system path: ${blocked}`,
        };
      }
    }

    // Check against blocked filename patterns
    for (const pattern of BLOCKED_PATTERNS) {
      if (pattern.test(normalized)) {
        return {
          valid: false,
          normalized,
          errors: [`Path matches blocked pattern: ${pattern}`],
          blocked: true,
          reason: `Sensitive file pattern: ${pattern}`,
        };
      }
    }

    // If allowedRoots specified, verify the path is within one of them
    if (allowedRoots && allowedRoots.length > 0) {
      const resolvedPath = resolve(normalized);
      const withinAllowed = allowedRoots.some((root) => {
        const resolvedRoot = resolve(root);
        return (
          resolvedPath === resolvedRoot ||
          resolvedPath.startsWith(resolvedRoot + sep)
        );
      });

      if (!withinAllowed) {
        return {
          valid: false,
          normalized,
          errors: [
            `Path ${normalized} is not within any allowed root: ${allowedRoots.join(', ')}`,
          ],
          blocked: true,
          reason: 'Path outside allowed directories',
        };
      }
    }

    return {
      valid: true,
      normalized,
      errors,
      blocked: false,
    };
  }

  /**
   * Normalize a path: resolve separators, remove redundant segments.
   * Does NOT resolve symlinks (that requires fs access).
   */
  normalizePath(path: string): string {
    // Replace Windows separators with POSIX
    let result = path.replace(/\\/g, '/');

    // Remove null bytes
    result = result.replace(/\0/g, '');

    // URL-decode common sequences
    result = result.replace(/%2f/gi, '/');
    result = result.replace(/%2e/gi, '.');
    result = result.replace(/%5c/gi, '/');

    // Normalize using Node's posix normalize
    result = posix.normalize(result);

    // Remove trailing slash (unless it's the root)
    if (result.length > 1 && result.endsWith('/')) {
      result = result.slice(0, -1);
    }

    return result;
  }
}
