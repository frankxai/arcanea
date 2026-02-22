/**
 * @arcanea/token-optimizer — LRU Cache with TTL
 *
 * A bounded Least-Recently-Used cache where each entry has an
 * independent time-to-live. Expired entries are pruned lazily on
 * access and eagerly via `prune()`.
 *
 * @module @arcanea/token-optimizer/cache
 */

import type { CacheEntry, CacheStats } from './types.js';

export class LRUCache<T> {
  private readonly cache = new Map<string, CacheEntry<T>>();
  private readonly maxSize: number;
  private readonly defaultTTL: number;

  /** Hit counter */
  private hits = 0;
  /** Miss counter */
  private misses = 0;

  /**
   * @param maxSize    Maximum number of entries (default 1000)
   * @param defaultTTL Default TTL in milliseconds (default 5 min)
   */
  constructor(maxSize = 1000, defaultTTL = 300_000) {
    this.maxSize = maxSize;
    this.defaultTTL = defaultTTL;
  }

  /**
   * Retrieve a cached value. Returns `undefined` on miss or expiry.
   * Promotes the entry to most-recently-used on hit.
   */
  get(key: string): T | undefined {
    const entry = this.cache.get(key);

    if (!entry) {
      this.misses++;
      return undefined;
    }

    // Check expiration
    if (Date.now() - entry.timestamp > entry.ttl) {
      this.cache.delete(key);
      this.misses++;
      return undefined;
    }

    // Promote to MRU: delete + re-insert to move to end of Map iteration order
    this.cache.delete(key);
    entry.hits++;
    this.cache.set(key, entry);
    this.hits++;

    return entry.data;
  }

  /**
   * Store a value. Evicts the LRU entry if the cache is at capacity.
   */
  set(key: string, value: T, ttl?: number): void {
    // If key already exists, delete first (will be re-inserted at end)
    if (this.cache.has(key)) {
      this.cache.delete(key);
    }

    // Evict LRU entry if at capacity
    if (this.cache.size >= this.maxSize) {
      const lruKey = this.cache.keys().next().value;
      if (lruKey !== undefined) {
        this.cache.delete(lruKey);
      }
    }

    this.cache.set(key, {
      data: value,
      timestamp: Date.now(),
      ttl: ttl ?? this.defaultTTL,
      hits: 0,
    });
  }

  /** Check whether a non-expired entry exists for `key`. */
  has(key: string): boolean {
    const entry = this.cache.get(key);
    if (!entry) return false;
    if (Date.now() - entry.timestamp > entry.ttl) {
      this.cache.delete(key);
      return false;
    }
    return true;
  }

  /** Delete a specific entry. Returns true if the entry existed. */
  delete(key: string): boolean {
    return this.cache.delete(key);
  }

  /** Clear all entries and reset statistics. */
  clear(): void {
    this.cache.clear();
    this.hits = 0;
    this.misses = 0;
  }

  /** Remove all expired entries. Returns the number of entries pruned. */
  prune(): number {
    const now = Date.now();
    let pruned = 0;
    for (const [key, entry] of this.cache) {
      if (now - entry.timestamp > entry.ttl) {
        this.cache.delete(key);
        pruned++;
      }
    }
    return pruned;
  }

  /** Return cache statistics. */
  getStats(): CacheStats {
    const total = this.hits + this.misses;
    return {
      size: this.cache.size,
      maxSize: this.maxSize,
      hits: this.hits,
      misses: this.misses,
      hitRate: total > 0 ? this.hits / total : 0,
    };
  }

  /** Current number of entries (including potentially expired). */
  get size(): number {
    return this.cache.size;
  }
}
