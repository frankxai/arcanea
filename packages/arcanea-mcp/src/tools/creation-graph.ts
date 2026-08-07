// Creation Graph - Relationship Network for Generated Content
// Inspired by Qdrant vector patterns and knowledge graphs

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { dirname, join } from "node:path";
import { CreationRef } from "../memory/index.js";

export interface CreationNode {
  id: string;
  type: CreationRef["type"];
  name: string;
  element?: string;
  gate?: number;
  createdAt: Date;
  metadata: Record<string, any>;
  embedding?: number[];
}

export interface CreationEdge {
  id: string;
  sourceId: string;
  targetId: string;
  relationship: RelationshipType;
  strength: number; // 0-1
  metadata?: Record<string, any>;
}

export type RelationshipType =
  | "created_by" // Character created artifact
  | "mentored_by" // Character learned from character
  | "located_at" // Character/creature found at location
  | "wields" // Character uses artifact
  | "inhabits" // Creature lives in location
  | "guards" // Creature/character protects something
  | "opposes" // Antagonistic relationship
  | "allies_with" // Cooperative relationship
  | "transforms_into" // Evolution/transformation
  | "derived_from" // Inspired by or based on
  | "part_of" // Belongs to larger entity
  | "same_element" // Shares elemental affinity
  | "same_house" // Same Academy house
  | "same_gate" // Same Gate level;

interface CreationGraph {
  nodes: Map<string, CreationNode>;
  edges: CreationEdge[];
}

export interface GuardianSafetyIssue {
  severity: "warning" | "error";
  message: string;
}

export interface GuardianSafetyReport {
  status: "safe" | "warning" | "error";
  issues: GuardianSafetyIssue[];
}

interface PersistedCreationNode extends Omit<CreationNode, "createdAt"> {
  createdAt: string;
}

interface PersistedCreationGraph {
  nodes: PersistedCreationNode[];
  edges: CreationEdge[];
}

interface PersistedWorldGraphsFile {
  version: 1;
  updatedAt: string;
  graphs: Record<string, PersistedCreationGraph>;
}

// In-memory graph store
const graphs = new Map<string, CreationGraph>();
const worldGraphFilePath = join(homedir(), ".arcanea", "sis-world-graphs.json");
let loadedFromDisk = false;

const EMBEDDING_DIMENSIONS = 64;

function ensureSisDirectory(): void {
  mkdirSync(dirname(worldGraphFilePath), { recursive: true });
}

function parseNodeTypeForSupabase(type: CreationRef["type"]): "lore" | "character" | "location" {
  if (type === "character") return "character";
  if (type === "location") return "location";
  return "lore";
}

function getSupabaseConfig():
  | { url: string; serviceRoleKey: string }
  | null {
  const url = process.env["SUPABASE_URL"] ?? process.env["NEXT_PUBLIC_SUPABASE_URL"];
  const serviceRoleKey = process.env["SUPABASE_SERVICE_ROLE_KEY"];
  if (!url || !serviceRoleKey) return null;
  return { url, serviceRoleKey };
}

function serializeGraph(graph: CreationGraph): PersistedCreationGraph {
  return {
    nodes: Array.from(graph.nodes.values()).map((n) => ({
      ...n,
      createdAt: (n.createdAt instanceof Date ? n.createdAt : new Date(n.createdAt)).toISOString(),
    })),
    edges: graph.edges,
  };
}

function toCreationNode(node: PersistedCreationNode): CreationNode {
  return {
    ...node,
    createdAt: new Date(node.createdAt),
  };
}

function loadGraphsFromSisStorage(): void {
  if (loadedFromDisk) return;
  loadedFromDisk = true;
  ensureSisDirectory();
  if (!existsSync(worldGraphFilePath)) return;

  try {
    const parsed = JSON.parse(readFileSync(worldGraphFilePath, "utf-8")) as Partial<PersistedWorldGraphsFile>;
    for (const [sessionId, persistedGraph] of Object.entries(parsed.graphs ?? {})) {
      graphs.set(sessionId, {
        nodes: new Map((persistedGraph.nodes ?? []).map((node) => [node.id, toCreationNode(node)])),
        edges: persistedGraph.edges ?? [],
      });
    }
  } catch {
    // Corrupt local SIS file should not block world graph access.
  }
}

function syncGraphsToSisStorage(): void {
  ensureSisDirectory();
  const payload: PersistedWorldGraphsFile = {
    version: 1,
    updatedAt: new Date().toISOString(),
    graphs: Object.fromEntries(
      Array.from(graphs.entries()).map(([sessionId, graph]) => [sessionId, serializeGraph(graph)])
    ),
  };
  writeFileSync(worldGraphFilePath, JSON.stringify(payload, null, 2), "utf-8");
}

export function getSisWorldGraphFilePath(): string {
  ensureSisDirectory();
  return worldGraphFilePath;
}

export function buildWorldGraphEmbedding(content: string): number[] {
  const vector = new Array<number>(EMBEDDING_DIMENSIONS).fill(0);
  for (let i = 0; i < content.length; i++) {
    const code = content.charCodeAt(i);
    vector[i % EMBEDDING_DIMENSIONS] += code / 255;
  }
  const norm = Math.sqrt(vector.reduce((acc, value) => acc + value * value, 0));
  if (!norm) return vector;
  return vector.map((value) => Number((value / norm).toFixed(6)));
}

async function persistNodeToSupabase(sessionId: string, node: CreationNode): Promise<void> {
  const config = getSupabaseConfig();
  if (!config) return;

  const nodeType = parseNodeTypeForSupabase(node.type);
  const embeddingText = `[${(node.embedding ?? buildWorldGraphEmbedding(
    `${node.name} ${node.metadata?.summary ?? ""}`
  )).join(",")}]`;

  await fetch(`${config.url}/rest/v1/world_graph_nodes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "apikey": config.serviceRoleKey,
      "Prefer": "resolution=merge-duplicates,return=minimal",
    },
    body: JSON.stringify({
      session_id: sessionId,
      node_id: node.id,
      node_type: nodeType,
      name: node.name,
      element: node.element ?? null,
      gate: node.gate ?? null,
      summary: node.metadata?.summary ?? node.name,
      metadata: node.metadata ?? {},
      embedding: embeddingText,
    }),
  }).catch(() => undefined);
}

async function persistEdgeToSupabase(sessionId: string, edge: CreationEdge): Promise<void> {
  const config = getSupabaseConfig();
  if (!config) return;

  await fetch(`${config.url}/rest/v1/world_graph_edges`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "apikey": config.serviceRoleKey,
      "Prefer": "resolution=merge-duplicates,return=minimal",
    },
    body: JSON.stringify({
      session_id: sessionId,
      edge_id: edge.id,
      source_node_id: edge.sourceId,
      target_node_id: edge.targetId,
      relationship: edge.relationship,
      strength: edge.strength,
      metadata: edge.metadata ?? {},
    }),
  }).catch(() => undefined);
}

function getOrCreateGraph(sessionId: string): CreationGraph {
  loadGraphsFromSisStorage();
  if (!graphs.has(sessionId)) {
    graphs.set(sessionId, {
      nodes: new Map(),
      edges: [],
    });
  }
  return graphs.get(sessionId)!;
}

export function addCreationToGraph(
  sessionId: string,
  creation: CreationRef,
  metadata: Record<string, any> = {}
): CreationNode {
  const graph = getOrCreateGraph(sessionId);

  const node: CreationNode = {
    id: creation.id,
    type: creation.type,
    name: creation.name,
    element: creation.element,
    gate: creation.gate,
    createdAt: creation.createdAt instanceof Date ? creation.createdAt : new Date(creation.createdAt),
    metadata,
    embedding: buildWorldGraphEmbedding(
      `${creation.name} ${creation.summary} ${creation.element ?? ""}`
    ),
  };

  graph.nodes.set(creation.id, node);

  // Auto-detect relationships based on shared properties
  autoLinkByElement(sessionId, node);
  autoLinkByGate(sessionId, node);
  syncGraphsToSisStorage();
  void persistNodeToSupabase(sessionId, node);

  return node;
}

export function linkCreations(
  sessionId: string,
  sourceId: string,
  targetId: string,
  relationship: RelationshipType,
  strength: number = 0.5,
  metadata?: Record<string, any>
): CreationEdge | null {
  const graph = getOrCreateGraph(sessionId);

  if (!graph.nodes.has(sourceId) || !graph.nodes.has(targetId)) {
    return null;
  }

  const edge: CreationEdge = {
    id: `${sourceId}-${relationship}-${targetId}`,
    sourceId,
    targetId,
    relationship,
    strength: Math.min(1, Math.max(0, strength)),
    metadata,
  };

  // Avoid duplicate edges
  const existingIdx = graph.edges.findIndex(
    (e) =>
      e.sourceId === sourceId &&
      e.targetId === targetId &&
      e.relationship === relationship
  );

  if (existingIdx >= 0) {
    graph.edges[existingIdx] = edge; // Update existing
  } else {
    graph.edges.push(edge);
  }

  syncGraphsToSisStorage();
  void persistEdgeToSupabase(sessionId, edge);

  return edge;
}

function autoLinkByElement(sessionId: string, newNode: CreationNode): void {
  if (!newNode.element) return;

  const graph = getOrCreateGraph(sessionId);

  for (const [id, node] of graph.nodes) {
    if (id === newNode.id) continue;
    if (node.element === newNode.element) {
      linkCreations(sessionId, newNode.id, id, "same_element", 0.3);
    }
  }
}

function autoLinkByGate(sessionId: string, newNode: CreationNode): void {
  if (!newNode.gate) return;

  const graph = getOrCreateGraph(sessionId);

  for (const [id, node] of graph.nodes) {
    if (id === newNode.id) continue;
    if (node.gate === newNode.gate) {
      linkCreations(sessionId, newNode.id, id, "same_gate", 0.3);
    }
  }
}

export function getRelatedCreations(
  sessionId: string,
  creationId: string,
  relationshipFilter?: RelationshipType
): Array<{ node: CreationNode; relationship: RelationshipType; strength: number }> {
  const graph = getOrCreateGraph(sessionId);
  const results: Array<{
    node: CreationNode;
    relationship: RelationshipType;
    strength: number;
  }> = [];

  for (const edge of graph.edges) {
    if (relationshipFilter && edge.relationship !== relationshipFilter) continue;

    if (edge.sourceId === creationId && graph.nodes.has(edge.targetId)) {
      results.push({
        node: graph.nodes.get(edge.targetId)!,
        relationship: edge.relationship,
        strength: edge.strength,
      });
    } else if (edge.targetId === creationId && graph.nodes.has(edge.sourceId)) {
      results.push({
        node: graph.nodes.get(edge.sourceId)!,
        relationship: edge.relationship,
        strength: edge.strength,
      });
    }
  }

  // Sort by strength descending
  return results.sort((a, b) => b.strength - a.strength);
}

export function suggestConnections(
  sessionId: string,
  creationId: string
): Array<{
  target: CreationNode;
  suggestedRelationship: RelationshipType;
  reason: string;
}> {
  const graph = getOrCreateGraph(sessionId);
  const source = graph.nodes.get(creationId);

  if (!source) return [];

  const suggestions: Array<{
    target: CreationNode;
    suggestedRelationship: RelationshipType;
    reason: string;
  }> = [];

  // Get existing connections
  const existingConnections = new Set(
    graph.edges
      .filter((e) => e.sourceId === creationId || e.targetId === creationId)
      .flatMap((e) => [e.sourceId, e.targetId])
  );

  for (const [id, target] of graph.nodes) {
    if (id === creationId || existingConnections.has(id)) continue;

    // Suggest based on type compatibility
    if (source.type === "character" && target.type === "location") {
      suggestions.push({
        target,
        suggestedRelationship: "located_at",
        reason: `${source.name} could be found at ${target.name}`,
      });
    } else if (source.type === "character" && target.type === "artifact") {
      suggestions.push({
        target,
        suggestedRelationship: "wields",
        reason: `${source.name} could wield ${target.name}`,
      });
    } else if (source.type === "character" && target.type === "creature") {
      suggestions.push({
        target,
        suggestedRelationship: "allies_with",
        reason: `${source.name} could ally with ${target.name}`,
      });
    } else if (source.type === "creature" && target.type === "location") {
      suggestions.push({
        target,
        suggestedRelationship: "inhabits",
        reason: `${source.name} could inhabit ${target.name}`,
      });
    } else if (source.type === "artifact" && target.type === "character") {
      suggestions.push({
        target,
        suggestedRelationship: "created_by",
        reason: `${source.name} could have been created by ${target.name}`,
      });
    }
  }

  return suggestions.slice(0, 5); // Return top 5 suggestions
}

export function getGraphSummary(sessionId: string): {
  nodeCount: number;
  edgeCount: number;
  nodesByType: Record<string, number>;
  nodesByElement: Record<string, number>;
  mostConnected: Array<{ name: string; connections: number }>;
} {
  const graph = getOrCreateGraph(sessionId);

  const nodesByType: Record<string, number> = {};
  const nodesByElement: Record<string, number> = {};
  const connectionCounts: Map<string, number> = new Map();

  for (const [id, node] of graph.nodes) {
    nodesByType[node.type] = (nodesByType[node.type] || 0) + 1;
    if (node.element) {
      nodesByElement[node.element] = (nodesByElement[node.element] || 0) + 1;
    }
    connectionCounts.set(id, 0);
  }

  for (const edge of graph.edges) {
    connectionCounts.set(
      edge.sourceId,
      (connectionCounts.get(edge.sourceId) || 0) + 1
    );
    connectionCounts.set(
      edge.targetId,
      (connectionCounts.get(edge.targetId) || 0) + 1
    );
  }

  const mostConnected = Array.from(connectionCounts.entries())
    .map(([id, count]) => ({
      name: graph.nodes.get(id)?.name || id,
      connections: count,
    }))
    .sort((a, b) => b.connections - a.connections)
    .slice(0, 5);

  return {
    nodeCount: graph.nodes.size,
    edgeCount: graph.edges.length,
    nodesByType,
    nodesByElement,
    mostConnected,
  };
}

export function runGuardianSafetyCheck(sessionId: string): GuardianSafetyReport {
  const graph = getOrCreateGraph(sessionId);
  const issues: GuardianSafetyIssue[] = [];

  for (const node of graph.nodes.values()) {
    if (!node.name.trim()) {
      issues.push({ severity: "error", message: `Node ${node.id} is missing a valid name.` });
    }
    if (node.gate !== undefined && (node.gate < 1 || node.gate > 10)) {
      issues.push({
        severity: "error",
        message: `Node ${node.name} has gate ${node.gate}. Gate must be between 1 and 10.`,
      });
    }
  }

  for (const edge of graph.edges) {
    if (edge.sourceId === edge.targetId) {
      issues.push({
        severity: "warning",
        message: `Edge ${edge.id} links a creation to itself. Review this relationship.`,
      });
    }
    if (edge.relationship === "opposes" && edge.strength > 0.95) {
      issues.push({
        severity: "warning",
        message: `Edge ${edge.id} is highly adversarial (${edge.strength}). Guardian review recommended.`,
      });
    }
  }

  const hasError = issues.some((issue) => issue.severity === "error");
  return {
    status: hasError ? "error" : issues.length > 0 ? "warning" : "safe",
    issues,
  };
}

// Export graph as JSON for visualization
export function exportGraph(sessionId: string): {
  nodes: CreationNode[];
  edges: CreationEdge[];
} {
  const graph = getOrCreateGraph(sessionId);
  return {
    nodes: Array.from(graph.nodes.values()),
    edges: graph.edges,
  };
}

// Find path between two creations
export function findPath(
  sessionId: string,
  sourceId: string,
  targetId: string,
  maxDepth: number = 5
): Array<{ nodeId: string; relationship: RelationshipType }> | null {
  const graph = getOrCreateGraph(sessionId);

  if (!graph.nodes.has(sourceId) || !graph.nodes.has(targetId)) {
    return null;
  }

  // BFS to find shortest path
  const visited = new Set<string>();
  const queue: Array<{
    nodeId: string;
    path: Array<{ nodeId: string; relationship: RelationshipType }>;
  }> = [{ nodeId: sourceId, path: [] }];

  while (queue.length > 0) {
    const current = queue.shift()!;

    if (current.path.length > maxDepth) continue;
    if (visited.has(current.nodeId)) continue;
    visited.add(current.nodeId);

    if (current.nodeId === targetId) {
      return current.path;
    }

    // Find connected nodes
    for (const edge of graph.edges) {
      let nextId: string | null = null;
      if (edge.sourceId === current.nodeId) {
        nextId = edge.targetId;
      } else if (edge.targetId === current.nodeId) {
        nextId = edge.sourceId;
      }

      if (nextId && !visited.has(nextId)) {
        queue.push({
          nodeId: nextId,
          path: [...current.path, { nodeId: nextId, relationship: edge.relationship }],
        });
      }
    }
  }

  return null; // No path found
}
