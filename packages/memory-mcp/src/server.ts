#!/usr/bin/env node
/**
 * @arcanea/memory-mcp — Starlight Vaults MCP Server
 *
 * Exposes 6 semantic memory vaults to any MCP-compatible AI tool via
 * the MCP stdio JSON-RPC transport (protocol version 2024-11-05).
 *
 * Add to Claude Code:
 *   claude mcp add arcanea-memory npx @arcanea/memory-mcp
 *
 * Add to Cursor / Cline / Windsurf — mcp.json:
 *   { "arcanea-memory": { "command": "npx", "args": ["@arcanea/memory-mcp"] } }
 *
 * Tools provided:
 *   vault_remember   — Store a memory (auto-classified or explicit vault)
 *   vault_recall     — Search across vaults
 *   vault_recent     — Get recent memories
 *   vault_stats      — Memory system statistics
 *   horizon_append   — Add to the Horizon Vault (permanent)
 *   horizon_read     — Read Horizon wishes
 *   vault_classify   — Classify content without storing
 *   memory_sync      — Sync vaults to MEMORY.md
 *
 * Environment:
 *   STARLIGHT_PATH   — Override vault storage directory
 *                      Default: {cwd}/.arcanea/memory
 */

import { createInterface } from 'node:readline';
import { join } from 'node:path';
import {
  StarlightVaults,
  MemoryBridge,
} from '@arcanea/memory-system';
import type {
  VaultType,
  GuardianName,
  VaultEntry,
  VaultSearchResult,
  HorizonEntry,
  MemorySystemStats,
  ClassificationResult,
  SyncResult,
} from '@arcanea/memory-system';

// ── MCP Protocol Types ───────────────────────────────────────────────────────

interface McpRequest {
  jsonrpc: '2.0';
  id: string | number;
  method: string;
  params?: Record<string, unknown>;
}

interface McpResponse {
  jsonrpc: '2.0';
  id: string | number;
  result?: unknown;
  error?: { code: number; message: string; data?: unknown };
}

// ── Tool Definitions ─────────────────────────────────────────────────────────

const TOOLS = [
  {
    name: 'vault_remember',
    description:
      'Store a memory in Starlight Vaults. Auto-classifies into the right vault ' +
      '(strategic, technical, creative, operational, wisdom, horizon) unless vault ' +
      'is specified. Optionally tag a Guardian namespace for domain routing.',
    inputSchema: {
      type: 'object',
      properties: {
        content: {
          type: 'string',
          description: 'The memory content to store',
        },
        vault: {
          type: 'string',
          enum: [
            'strategic',
            'technical',
            'creative',
            'operational',
            'wisdom',
            'horizon',
          ],
          description: 'Force a specific vault (optional — omit for auto-classification)',
        },
        guardian: {
          type: 'string',
          enum: [
            'Lyssandria',
            'Leyla',
            'Draconia',
            'Maylinn',
            'Alera',
            'Lyria',
            'Aiyami',
            'Elara',
            'Ino',
            'Shinkami',
          ],
          description: 'Guardian namespace for domain routing (optional)',
        },
        tags: {
          type: 'array',
          items: { type: 'string' },
          description: 'Tags for categorization (optional)',
        },
      },
      required: ['content'],
    },
  },
  {
    name: 'vault_recall',
    description:
      'Search across Starlight Vaults for relevant memories. Returns scored results ' +
      'ranked by relevance. Optionally filter to a specific vault or Guardian.',
    inputSchema: {
      type: 'object',
      properties: {
        query: {
          type: 'string',
          description: 'Search query',
        },
        vault: {
          type: 'string',
          enum: [
            'strategic',
            'technical',
            'creative',
            'operational',
            'wisdom',
            'horizon',
          ],
          description: 'Filter to specific vault (optional)',
        },
        guardian: {
          type: 'string',
          description: 'Filter by Guardian namespace (optional)',
        },
        limit: {
          type: 'number',
          description: 'Max results to return (default: 10)',
        },
      },
      required: ['query'],
    },
  },
  {
    name: 'vault_recent',
    description:
      'Get the most recent memories from a specific vault or all vaults combined.',
    inputSchema: {
      type: 'object',
      properties: {
        vault: {
          type: 'string',
          enum: [
            'strategic',
            'technical',
            'creative',
            'operational',
            'wisdom',
            'horizon',
          ],
          description: 'Filter to specific vault (optional)',
        },
        limit: {
          type: 'number',
          description: 'Max results to return (default: 10)',
        },
      },
    },
  },
  {
    name: 'vault_stats',
    description:
      'Get statistics about the Starlight Vault memory system — entry counts per ' +
      'vault, top tags, Guardian distribution, and last activity.',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },
  {
    name: 'horizon_append',
    description:
      'Append a benevolent wish or intention to the Horizon Vault. ' +
      'This is PERMANENT — Horizon entries cannot be deleted. ' +
      'Use for recording constructive visions, AI alignment intentions, or ' +
      'creative aspirations. Destructive intentions are not accepted.',
    inputSchema: {
      type: 'object',
      properties: {
        wish: {
          type: 'string',
          description:
            'The benevolent intention or wish (must be constructive, not destructive)',
        },
        context: {
          type: 'string',
          description: 'What prompted this wish',
        },
        tags: {
          type: 'array',
          items: { type: 'string' },
          description: 'Categorization tags (optional)',
        },
      },
      required: ['wish', 'context'],
    },
  },
  {
    name: 'horizon_read',
    description:
      'Read recent wishes and intentions from the Horizon Vault. ' +
      'Optionally search within wishes by keyword.',
    inputSchema: {
      type: 'object',
      properties: {
        limit: {
          type: 'number',
          description: 'Max wishes to return (default: 10)',
        },
        search: {
          type: 'string',
          description: 'Search query within wishes (optional)',
        },
      },
    },
  },
  {
    name: 'vault_classify',
    description:
      'Classify content into the appropriate vault type without storing it. ' +
      'Returns the predicted vault, confidence score, and reasoning.',
    inputSchema: {
      type: 'object',
      properties: {
        content: {
          type: 'string',
          description: 'Content to classify',
        },
        guardian: {
          type: 'string',
          description: 'Guardian context for classification (optional)',
        },
      },
      required: ['content'],
    },
  },
  {
    name: 'memory_sync',
    description:
      "Sync Starlight Vaults to MEMORY.md — creates a structured summary in " +
      "Claude Code's native memory format at .arcanea/memory/MEMORY.md. " +
      'Returns sync metadata (lines written, entries included per vault).',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },
];

// ── Vault Shortcut Map ───────────────────────────────────────────────────────

type VaultShortcutKey = Exclude<VaultType, 'horizon'>;

type VaultShortcutMethod = (
  content: string,
  tags?: string[],
) => Promise<VaultEntry>;

// ── Server State ─────────────────────────────────────────────────────────────

let vaults: StarlightVaults | null = null;

async function getVaults(): Promise<StarlightVaults> {
  if (!vaults) {
    const storagePath =
      process.env['STARLIGHT_PATH'] ??
      join(process.cwd(), '.arcanea', 'memory');
    vaults = await StarlightVaults.create({ storagePath });
  }
  return vaults;
}

// ── Tool Handlers ─────────────────────────────────────────────────────────────

interface VaultRememberArgs {
  content: string;
  vault?: VaultType;
  guardian?: GuardianName;
  tags?: string[];
}

interface VaultRecallArgs {
  query: string;
  vault?: VaultType;
  guardian?: GuardianName;
  limit?: number;
}

interface VaultRecentArgs {
  vault?: VaultType;
  limit?: number;
}

interface HorizonAppendArgs {
  wish: string;
  context: string;
  tags?: string[];
}

interface HorizonReadArgs {
  limit?: number;
  search?: string;
}

interface VaultClassifyArgs {
  content: string;
  guardian?: GuardianName;
}

async function handleVaultRemember(args: VaultRememberArgs): Promise<unknown> {
  const v = await getVaults();
  const { content, vault, guardian, tags } = args;

  const instance = guardian ? v.as(guardian) : v;

  let entry: VaultEntry;

  if (!vault) {
    // Auto-classify
    entry = await instance.remember(content, tags);
  } else if (vault === 'horizon') {
    // Horizon via the append-only ledger
    const wish = content;
    const context = tags?.[0] ?? 'stored via vault_remember';
    const horizonEntry = await instance.horizon.append(wish, context, tags);
    return {
      id: horizonEntry.id,
      vault: 'horizon',
      guardian: guardian ?? null,
      tags: horizonEntry.tags,
      createdAt: horizonEntry.createdAt,
      preview: content.slice(0, 100) + (content.length > 100 ? '...' : ''),
      message: 'Permanently appended to the Horizon Vault.',
    };
  } else {
    // Explicit non-horizon vault — call the shortcut method
    const shortcuts: Record<VaultShortcutKey, VaultShortcutMethod> = {
      strategic:   (c, t) => instance.strategic(c, t),
      technical:   (c, t) => instance.technical(c, t),
      creative:    (c, t) => instance.creative(c, t),
      operational: (c, t) => instance.operational(c, t),
      wisdom:      (c, t) => instance.wisdom(c, t),
    };
    entry = await shortcuts[vault as VaultShortcutKey](content, tags);
  }

  return {
    id: entry.id,
    vault: entry.vault,
    guardian: entry.guardian ?? null,
    tags: entry.tags,
    createdAt: entry.createdAt,
    preview: content.slice(0, 100) + (content.length > 100 ? '...' : ''),
    message: `Stored in ${entry.vault} vault${guardian ? ` (${guardian})` : ''}`,
  };
}

async function handleVaultRecall(args: VaultRecallArgs): Promise<unknown> {
  const v = await getVaults();
  const { query, vault, guardian, limit = 10 } = args;

  const results: VaultSearchResult[] = await v.recall(query, {
    vault,
    guardian: guardian as GuardianName | undefined,
    limit,
  });

  return results.map((r) => ({
    id: r.entry.id,
    vault: r.entry.vault,
    guardian: r.entry.guardian ?? null,
    score: Math.round(r.score * 100) / 100,
    content:
      r.entry.content.slice(0, 200) +
      (r.entry.content.length > 200 ? '...' : ''),
    tags: r.entry.tags,
    createdAt: r.entry.createdAt,
  }));
}

async function handleVaultRecent(args: VaultRecentArgs): Promise<unknown> {
  const v = await getVaults();
  const { vault, limit = 10 } = args;

  const entries: VaultEntry[] = await v.recent(vault, limit);

  return entries.map((e) => ({
    id: e.id,
    vault: e.vault,
    guardian: e.guardian ?? null,
    content: e.content.slice(0, 150) + (e.content.length > 150 ? '...' : ''),
    tags: e.tags,
    createdAt: e.createdAt,
  }));
}

async function handleVaultStats(): Promise<MemorySystemStats> {
  const v = await getVaults();
  return v.stats();
}

async function handleHorizonAppend(args: HorizonAppendArgs): Promise<unknown> {
  const v = await getVaults();
  const { wish, context, tags } = args;

  const entry: HorizonEntry = await v.horizon.append(wish, context, tags);

  return {
    id: entry.id,
    wish: entry.wish,
    createdAt: entry.createdAt,
    totalWishes: v.horizon.count(),
    message:
      'Permanently appended to the Horizon Vault. This wish cannot be deleted.',
  };
}

async function handleHorizonRead(args: HorizonReadArgs): Promise<unknown> {
  const v = await getVaults();
  const { limit = 10, search } = args;

  const entries: HorizonEntry[] = search
    ? await v.horizon.search(search, limit)
    : await v.horizon.recent(limit);

  return {
    wishes: entries,
    total: v.horizon.count(),
  };
}

async function handleVaultClassify(
  args: VaultClassifyArgs,
): Promise<ClassificationResult> {
  const v = await getVaults();
  const { content, guardian } = args;

  const instance = guardian ? v.as(guardian as GuardianName) : v;
  return instance.classify(content);
}

async function handleMemorySync(): Promise<SyncResult> {
  const storagePath =
    process.env['STARLIGHT_PATH'] ?? join(process.cwd(), '.arcanea', 'memory');
  const bridge = new MemoryBridge({ vaultStoragePath: storagePath });
  return bridge.sync();
}

// ── Dispatch ─────────────────────────────────────────────────────────────────

async function handleToolCall(
  name: string,
  args: Record<string, unknown>,
): Promise<unknown> {
  switch (name) {
    case 'vault_remember':
      return handleVaultRemember(args as unknown as VaultRememberArgs);

    case 'vault_recall':
      return handleVaultRecall(args as unknown as VaultRecallArgs);

    case 'vault_recent':
      return handleVaultRecent(args as unknown as VaultRecentArgs);

    case 'vault_stats':
      return handleVaultStats();

    case 'horizon_append':
      return handleHorizonAppend(args as unknown as HorizonAppendArgs);

    case 'horizon_read':
      return handleHorizonRead(args as unknown as HorizonReadArgs);

    case 'vault_classify':
      return handleVaultClassify(args as unknown as VaultClassifyArgs);

    case 'memory_sync':
      return handleMemorySync();

    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}

// ── MCP Protocol Handler ──────────────────────────────────────────────────────

function sendResponse(response: McpResponse): void {
  process.stdout.write(JSON.stringify(response) + '\n');
}

async function handleRequest(request: McpRequest): Promise<void> {
  const { id, method, params } = request;

  try {
    switch (method) {
      case 'initialize':
        sendResponse({
          jsonrpc: '2.0',
          id,
          result: {
            protocolVersion: '2024-11-05',
            capabilities: { tools: {} },
            serverInfo: {
              name: 'arcanea-memory',
              version: '0.1.0',
              description:
                'Starlight Vaults — 6-vault semantic memory for AI tools',
            },
          },
        });
        break;

      case 'tools/list':
        sendResponse({
          jsonrpc: '2.0',
          id,
          result: { tools: TOOLS },
        });
        break;

      case 'tools/call': {
        const toolName = (params?.['name'] as string) ?? '';
        const toolArgs =
          (params?.['arguments'] as Record<string, unknown>) ?? {};
        const result = await handleToolCall(toolName, toolArgs);
        sendResponse({
          jsonrpc: '2.0',
          id,
          result: {
            content: [
              { type: 'text', text: JSON.stringify(result, null, 2) },
            ],
          },
        });
        break;
      }

      case 'notifications/initialized':
        // Notifications do not require a response
        break;

      default:
        sendResponse({
          jsonrpc: '2.0',
          id,
          error: { code: -32601, message: `Method not found: ${method}` },
        });
    }
  } catch (error) {
    sendResponse({
      jsonrpc: '2.0',
      id,
      error: {
        code: -32603,
        message:
          error instanceof Error ? error.message : 'Internal server error',
        data:
          error instanceof Error ? { stack: error.stack } : undefined,
      },
    });
  }
}

// ── Main: stdio JSON-RPC loop ─────────────────────────────────────────────────

const rl = createInterface({ input: process.stdin, terminal: false });

rl.on('line', (line: string) => {
  const trimmed = line.trim();
  if (!trimmed) return;

  let request: McpRequest;
  try {
    request = JSON.parse(trimmed) as McpRequest;
  } catch {
    // Silently ignore malformed JSON — MCP clients always send valid JSON
    return;
  }

  handleRequest(request).catch((err: unknown) => {
    // Last-resort handler — should not reach here because handleRequest
    // wraps all errors in MCP error responses internally.
    process.stderr.write(
      `[arcanea-memory-mcp] Unhandled error: ${String(err)}\n`,
    );
  });
});

process.stderr.write(
  '[arcanea-memory-mcp] Starlight Vaults MCP server started\n',
);
