/**
 * Type declarations for agentdb (optional dependency)
 *
 * AgentDB provides HNSW-indexed vector storage with SQLite persistence.
 * It's used by ReasoningBank for fast pattern retrieval but falls back
 * to in-memory storage when unavailable.
 */

declare module 'agentdb' {
  export class AgentDB {
    constructor(options?: {
      path?: string;
      namespace?: string;
      dimensions?: number;
    });

    store(key: string, value: unknown, embedding?: number[]): Promise<void>;
    retrieve(key: string): Promise<unknown>;
    search(query: number[], k?: number): Promise<Array<{
      key: string;
      value: unknown;
      score: number;
    }>>;
    delete(key: string): Promise<void>;
    close(): Promise<void>;
  }
}
