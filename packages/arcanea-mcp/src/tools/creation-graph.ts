// Creation Graph - Relationship Network for Generated Content
// Inspired by Qdrant vector patterns and knowledge graphs

import { CreationRef } from "../memory/index.js";

export interface CreationNode {
  id: string;
  type: CreationRef["type"];
  name: string;
  element?: string;
  gate?: number;
  createdAt: Date;
  metadata: Record<string, any>;
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

// In-memory graph store
const graphs = new Map<string, CreationGraph>();

function getOrCreateGraph(sessionId: string): CreationGraph {
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
    createdAt: creation.createdAt,
    metadata,
  };

  graph.nodes.set(creation.id, node);

  // Auto-detect relationships based on shared properties
  autoLinkByElement(sessionId, node);
  autoLinkByGate(sessionId, node);

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
