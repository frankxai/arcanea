/**
 * @arcanea/hooks — HookMatcher
 *
 * Pattern-based hook matching with caching for selective hook triggering.
 * Supports glob patterns (via minimatch), regex, exact string matching,
 * and composite AND/OR patterns.
 *
 * Adapted from arcanea-flow's hook-matchers.ts, simplified for the
 * standalone hooks package. Cache entries auto-expire based on TTL.
 */

import { minimatch } from 'minimatch';
import type {
  MatcherConfig,
  MatcherPattern,
  MatchResult,
  CompositePattern,
} from './types.js';

// ── Cache Entry ──────────────────────────────────────────────────

interface CacheEntry {
  result: boolean;
  rules: string[];
  timestamp: number;
}

// ── HookMatcher ──────────────────────────────────────────────────

export class HookMatcher {
  private readonly cache: Map<string, CacheEntry> = new Map();
  private readonly cacheEnabled: boolean;
  private readonly cacheTTLMs: number;
  private readonly matchStrategy: 'all' | 'any';
  private cacheHits = 0;
  private cacheMisses = 0;

  constructor(config?: MatcherConfig) {
    this.cacheEnabled = config?.cacheEnabled ?? true;
    this.cacheTTLMs = config?.cacheTTLMs ?? 60_000;
    this.matchStrategy = config?.matchStrategy ?? 'all';
  }

  // ── Public API ───────────────────────────────────────────────

  /**
   * Match a value against a single MatcherPattern.
   */
  matchPattern(value: string, pattern: MatcherPattern): boolean {
    const raw = this.rawMatch(value, pattern);
    return pattern.inverted ? !raw : raw;
  }

  /**
   * Match a value against multiple patterns using the configured strategy.
   */
  matchPatterns(value: string, patterns: MatcherPattern[]): MatchResult {
    const start = Date.now();

    // Check cache
    if (this.cacheEnabled) {
      const key = this.cacheKey(value, patterns);
      const cached = this.getFromCache(key);
      if (cached !== undefined) {
        this.cacheHits++;
        return {
          matched: cached.result,
          matchedRules: cached.rules,
          executionTimeMs: Date.now() - start,
          cacheHit: true,
        };
      }
      this.cacheMisses++;
    }

    if (patterns.length === 0) {
      return { matched: true, matchedRules: ['*'], executionTimeMs: 0, cacheHit: false };
    }

    const matchedRules: string[] = [];
    const results: boolean[] = [];

    for (const p of patterns) {
      const matched = this.matchPattern(value, p);
      results.push(matched);
      if (matched) {
        matchedRules.push(this.patternLabel(p));
      }
    }

    const matched = this.matchStrategy === 'all'
      ? results.every(Boolean)
      : results.some(Boolean);

    // Store in cache
    if (this.cacheEnabled) {
      const key = this.cacheKey(value, patterns);
      this.cache.set(key, { result: matched, rules: matchedRules, timestamp: Date.now() });
    }

    return {
      matched,
      matchedRules,
      executionTimeMs: Date.now() - start,
      cacheHit: false,
    };
  }

  /**
   * Match a value against a composite pattern (AND/OR of sub-patterns).
   */
  matchComposite(value: string, composite: CompositePattern): boolean {
    const results = composite.patterns.map((p) => this.matchPattern(value, p));
    return composite.operator === 'AND'
      ? results.every(Boolean)
      : results.some(Boolean);
  }

  /**
   * Convenience: match a file path against glob patterns.
   */
  matchGlob(filePath: string, globPattern: string): boolean {
    return minimatch(filePath, globPattern, { dot: true });
  }

  /**
   * Convenience: match a string against a regex pattern string.
   */
  matchRegex(value: string, regexString: string): boolean {
    return new RegExp(regexString).test(value);
  }

  /**
   * Convenience: exact match.
   */
  matchExact(value: string, target: string): boolean {
    return value === target;
  }

  // ── Cache Management ─────────────────────────────────────────

  clearCache(): void {
    this.cache.clear();
    this.cacheHits = 0;
    this.cacheMisses = 0;
  }

  pruneExpired(): number {
    const now = Date.now();
    let pruned = 0;
    for (const [key, entry] of this.cache) {
      if (now - entry.timestamp >= this.cacheTTLMs) {
        this.cache.delete(key);
        pruned++;
      }
    }
    return pruned;
  }

  getCacheStats(): { size: number; hits: number; misses: number; hitRate: number } {
    const total = this.cacheHits + this.cacheMisses;
    return {
      size: this.cache.size,
      hits: this.cacheHits,
      misses: this.cacheMisses,
      hitRate: total > 0 ? this.cacheHits / total : 0,
    };
  }

  // ── Private ──────────────────────────────────────────────────

  private rawMatch(value: string, pattern: MatcherPattern): boolean {
    switch (pattern.type) {
      case 'glob':
        return minimatch(value, pattern.pattern, { dot: true });
      case 'regex':
        return new RegExp(pattern.pattern).test(value);
      case 'exact':
        return value === pattern.pattern;
      case 'composite':
        // Should not happen at this level, but handle gracefully
        return false;
      default:
        return false;
    }
  }

  private cacheKey(value: string, patterns: MatcherPattern[]): string {
    const patternStr = patterns
      .map((p) => `${p.type}:${p.pattern}:${p.inverted ?? false}`)
      .join('|');
    return `${value}::${patternStr}`;
  }

  private getFromCache(key: string): CacheEntry | undefined {
    const entry = this.cache.get(key);
    if (!entry) return undefined;
    if (Date.now() - entry.timestamp >= this.cacheTTLMs) {
      this.cache.delete(key);
      return undefined;
    }
    return entry;
  }

  private patternLabel(p: MatcherPattern): string {
    const inv = p.inverted ? '!' : '';
    return `${inv}${p.type}:${typeof p.pattern === 'string' ? p.pattern : String(p.pattern)}`;
  }
}
