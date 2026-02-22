/**
 * @arcanea/security — PermissionManager
 *
 * 4-level hierarchical permission resolver with fallback chain:
 *   SESSION (highest priority) -> LOCAL -> PROJECT -> USER (lowest)
 *
 * Supports glob patterns on tool names, configurable cache with TTL,
 * and mode-based bypass. Absorbed from arcanea-flow's PermissionManager
 * and adapted for the Arcanea monorepo.
 */

import type {
  PermissionLevel,
  PermissionBehavior,
  PermissionRule,
  PermissionConfig,
  PermissionQuery,
  PermissionResolution,
  PermissionUpdate,
} from './types.js';

/**
 * The fallback chain order. SESSION has highest priority,
 * USER is the global fallback.
 */
const FALLBACK_CHAIN: PermissionLevel[] = [
  'session',
  'local',
  'project',
  'user',
];

interface CacheEntry {
  resolution: PermissionResolution;
  timestamp: number;
}

export class PermissionManager {
  private configs: Map<PermissionLevel, PermissionConfig> = new Map();
  private cache: Map<string, CacheEntry> = new Map();
  private cacheEnabled: boolean;
  private cacheTTL: number;

  constructor(options?: { cacheEnabled?: boolean; cacheTTL?: number }) {
    this.cacheEnabled = options?.cacheEnabled ?? true;
    this.cacheTTL = options?.cacheTTL ?? 300_000; // 5 minutes (300s) default

    // Initialize all 4 levels with default configs
    for (const level of FALLBACK_CHAIN) {
      this.configs.set(level, this.createDefaultConfig(level));
    }
  }

  /**
   * Resolve permission for a query using the 4-level fallback chain.
   * SESSION -> LOCAL -> PROJECT -> USER
   * If no rule matches at any level, defaults to 'ask'.
   */
  resolvePermission(query: PermissionQuery): PermissionResolution {
    const startTime = Date.now();

    // Check cache first
    if (this.cacheEnabled) {
      const cacheKey = this.generateCacheKey(query);
      const cached = this.cache.get(cacheKey);

      if (cached && Date.now() - cached.timestamp < this.cacheTTL) {
        return {
          ...cached.resolution,
          cached: true,
          resolutionTime: Date.now() - startTime,
        };
      }
    }

    // Walk the fallback chain
    for (const level of FALLBACK_CHAIN) {
      const config = this.configs.get(level);
      if (!config) continue;

      // Check if mode bypasses rules
      if (config.mode === 'bypassPermissions') {
        const resolution: PermissionResolution = {
          behavior: 'allow',
          level,
          rule: {
            toolName: '*',
            behavior: 'allow',
            scope: level,
            priority: 1000,
            timestamp: Date.now(),
          },
          fallbackChain: FALLBACK_CHAIN.slice(
            0,
            FALLBACK_CHAIN.indexOf(level) + 1,
          ),
          cached: false,
          resolutionTime: Date.now() - startTime,
        };
        this.cacheResolution(query, resolution);
        return resolution;
      }

      // Find matching rule (highest priority first)
      const rule = this.findMatchingRule(config, query);
      if (rule) {
        const resolution: PermissionResolution = {
          behavior: rule.behavior,
          level,
          rule,
          fallbackChain: FALLBACK_CHAIN.slice(
            0,
            FALLBACK_CHAIN.indexOf(level) + 1,
          ),
          cached: false,
          resolutionTime: Date.now() - startTime,
        };
        this.cacheResolution(query, resolution);
        return resolution;
      }
    }

    // No rule found at any level — default to 'ask'
    const defaultResolution: PermissionResolution = {
      behavior: 'ask',
      level: 'user',
      fallbackChain: [...FALLBACK_CHAIN],
      cached: false,
      resolutionTime: Date.now() - startTime,
    };
    this.cacheResolution(query, defaultResolution);
    return defaultResolution;
  }

  /**
   * Update permissions at the specified level.
   * Clears cache after any mutation.
   */
  updatePermissions(
    level: PermissionLevel,
    update: PermissionUpdate,
  ): void {
    const config = this.configs.get(level);
    if (!config) return;

    switch (update.type) {
      case 'addRules': {
        if (!update.rules || !update.behavior) break;
        const newRules: PermissionRule[] = update.rules.map((r, i) => ({
          toolName: r.toolName,
          ruleContent: r.ruleContent,
          behavior: update.behavior!,
          scope: level,
          priority: 100 + i,
          timestamp: Date.now(),
        }));
        config.rules.push(...newRules);
        break;
      }

      case 'replaceRules': {
        if (!update.rules || !update.behavior) break;
        config.rules = update.rules.map((r, i) => ({
          toolName: r.toolName,
          ruleContent: r.ruleContent,
          behavior: update.behavior!,
          scope: level,
          priority: 100 + i,
          timestamp: Date.now(),
        }));
        break;
      }

      case 'removeRules': {
        if (!update.rules) break;
        const toRemove = new Set(
          update.rules.map((r) => `${r.toolName}:${r.ruleContent || ''}`),
        );
        config.rules = config.rules.filter(
          (rule) => !toRemove.has(`${rule.toolName}:${rule.ruleContent || ''}`),
        );
        break;
      }

      case 'setMode': {
        if (update.mode) {
          config.mode = update.mode;
        }
        break;
      }

      case 'addDirectories': {
        if (update.directories) {
          config.allowedDirectories.push(...update.directories);
        }
        break;
      }

      case 'removeDirectories': {
        if (update.directories) {
          const toRemove = new Set(update.directories);
          config.allowedDirectories = config.allowedDirectories.filter(
            (d) => !toRemove.has(d),
          );
        }
        break;
      }
    }

    // Always invalidate cache after mutation
    this.clearCache();
  }

  /**
   * Get the config at a specific level.
   */
  getConfig(level: PermissionLevel): PermissionConfig | undefined {
    return this.configs.get(level);
  }

  /**
   * Clear the resolution cache.
   */
  clearCache(): void {
    this.cache.clear();
  }

  /**
   * Get cache statistics.
   */
  getCacheStats(): { size: number; enabled: boolean; ttl: number } {
    return {
      size: this.cache.size,
      enabled: this.cacheEnabled,
      ttl: this.cacheTTL,
    };
  }

  /**
   * Prune expired cache entries. Returns the number of entries removed.
   */
  pruneCache(): number {
    const now = Date.now();
    let pruned = 0;

    for (const [key, entry] of this.cache.entries()) {
      if (now - entry.timestamp >= this.cacheTTL) {
        this.cache.delete(key);
        pruned++;
      }
    }

    return pruned;
  }

  // =========================================================================
  // Private Helpers
  // =========================================================================

  private findMatchingRule(
    config: PermissionConfig,
    query: PermissionQuery,
  ): PermissionRule | undefined {
    return config.rules
      .filter((rule) => this.ruleMatchesQuery(rule, query))
      .sort((a, b) => b.priority - a.priority)[0];
  }

  private ruleMatchesQuery(
    rule: PermissionRule,
    query: PermissionQuery,
  ): boolean {
    // Exact match
    if (rule.toolName === query.toolName) {
      return true;
    }

    // Wildcard match (single *)
    if (rule.toolName === '*') {
      return true;
    }

    // Glob pattern match
    if (rule.toolName.includes('*')) {
      const pattern = rule.toolName
        .replace(/[.+^${}()|[\]\\]/g, '\\$&') // escape regex metacharacters except *
        .replace(/\*/g, '.*');
      return new RegExp(`^${pattern}$`).test(query.toolName);
    }

    return false;
  }

  private cacheResolution(
    query: PermissionQuery,
    resolution: PermissionResolution,
  ): void {
    if (!this.cacheEnabled) return;

    this.cache.set(this.generateCacheKey(query), {
      resolution,
      timestamp: Date.now(),
    });
  }

  private generateCacheKey(query: PermissionQuery): string {
    return JSON.stringify({
      tool: query.toolName,
      input: query.toolInput,
      session: query.context?.sessionId,
    });
  }

  private createDefaultConfig(scope: PermissionLevel): PermissionConfig {
    return {
      mode: 'default',
      rules: [],
      allowedDirectories: [],
      deniedDirectories: [],
      metadata: {
        scope,
        created: Date.now(),
      },
    };
  }
}
