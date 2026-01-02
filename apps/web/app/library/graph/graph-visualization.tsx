/**
 * Content Graph Visualization
 *
 * ★ Insight ─────────────────────────────────────
 * This is a simplified visualization using CSS grid.
 * For production, consider:
 * 1. D3.js force-directed graph
 * 2. react-force-graph
 * 3. vis-network
 * This version provides a functional overview without heavy deps.
 * ─────────────────────────────────────────────────
 */

'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import type { ContentGraph, ContentNode, Collection } from '../../../lib/content/types';

interface Props {
  graph: ContentGraph;
  collections: Collection[];
}

const COLLECTION_COLORS: Record<string, string> = {
  'laws-of-arcanea': 'bg-purple-500',
  'poesie-of-freedom': 'bg-pink-500',
  'wisdom-scrolls': 'bg-yellow-500',
  'legends-of-arcanea': 'bg-red-500',
  'chronicles-of-luminors': 'bg-orange-500',
  'parables-of-creation': 'bg-green-500',
  'tales-of-creators': 'bg-teal-500',
  'book-of-rituals': 'bg-indigo-500',
  'dialogues-of-masters': 'bg-blue-500',
  'prophecies': 'bg-violet-500',
  'bestiary-of-creation': 'bg-rose-500',
  'songs-and-hymns': 'bg-amber-500',
  'meditations-on-elements': 'bg-cyan-500',
  'academy-handbook': 'bg-emerald-500',
  'book-of-shadows': 'bg-slate-500',
  'codex-of-collaboration': 'bg-sky-500',
  'atlas-of-territories': 'bg-lime-500',
};

export function ContentGraphVisualization({ graph, collections }: Props) {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [filterCollection, setFilterCollection] = useState<string | null>(null);

  // Group nodes by collection
  const nodesByCollection = useMemo(() => {
    const grouped: Record<string, ContentNode[]> = {};
    for (const node of graph.nodes) {
      if (!grouped[node.collection]) {
        grouped[node.collection] = [];
      }
      grouped[node.collection].push(node);
    }
    return grouped;
  }, [graph.nodes]);

  // Get connections for selected node
  const selectedConnections = useMemo(() => {
    if (!selectedNode) return { incoming: [], outgoing: [] };

    const incoming = graph.edges
      .filter((e) => e.target === selectedNode)
      .map((e) => ({
        ...e,
        node: graph.nodes.find((n) => n.id === e.source),
      }));

    const outgoing = graph.edges
      .filter((e) => e.source === selectedNode)
      .map((e) => ({
        ...e,
        node: graph.nodes.find((n) => n.id === e.target),
      }));

    return { incoming, outgoing };
  }, [selectedNode, graph]);

  // Filter nodes by collection if filter is active
  const filteredNodes = useMemo(() => {
    if (!filterCollection) return graph.nodes;
    return graph.nodes.filter((n) => n.collection === filterCollection);
  }, [graph.nodes, filterCollection]);

  const selectedNodeData = graph.nodes.find((n) => n.id === selectedNode);

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
      {/* Main Graph Area */}
      <div className="space-y-6">
        {/* Collection Filter */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilterCollection(null)}
            className={`rounded-full px-3 py-1 text-xs transition-all ${
              filterCollection === null
                ? 'bg-atlantean-teal text-cosmic-deep'
                : 'border border-cosmic-border text-text-muted hover:border-atlantean-teal/50'
            }`}
          >
            All
          </button>
          {collections.map((collection) => (
            <button
              key={collection.slug}
              onClick={() =>
                setFilterCollection(
                  filterCollection === collection.slug ? null : collection.slug
                )
              }
              className={`flex items-center gap-2 rounded-full px-3 py-1 text-xs transition-all ${
                filterCollection === collection.slug
                  ? 'bg-atlantean-teal text-cosmic-deep'
                  : 'border border-cosmic-border text-text-muted hover:border-atlantean-teal/50'
              }`}
            >
              <span>{collection.icon}</span>
              <span className="hidden md:inline">{collection.name}</span>
            </button>
          ))}
        </div>

        {/* Node Grid */}
        <div className="rounded-xl border border-cosmic-border bg-cosmic-surface p-6">
          <div className="mb-6 text-xs text-text-muted">
            Click a node to see its connections. Showing {filteredNodes.length} texts.
          </div>

          <div className="grid grid-cols-4 gap-4 md:grid-cols-6 lg:grid-cols-8">
            {filteredNodes.map((node) => {
              const isSelected = node.id === selectedNode;
              const isConnected =
                selectedNode &&
                (selectedConnections.incoming.some((c) => c.node?.id === node.id) ||
                  selectedConnections.outgoing.some((c) => c.node?.id === node.id));

              return (
                <button
                  key={node.id}
                  onClick={() => setSelectedNode(isSelected ? null : node.id)}
                  className={`group relative aspect-square rounded-xl border transition-all ${
                    isSelected
                      ? 'border-atlantean-teal bg-atlantean-teal/20 ring-2 ring-atlantean-teal'
                      : isConnected
                      ? 'border-gold-bright bg-gold-dark/20'
                      : 'border-cosmic-border-bright bg-cosmic-raised hover:border-atlantean-teal/50'
                  }`}
                  title={node.title}
                >
                  <span
                    className={`absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full ${
                      COLLECTION_COLORS[node.collection] || 'bg-gray-500'
                    }`}
                  />
                  <span className="sr-only">{node.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Collection Groups */}
        <div className="space-y-4">
          <h3 className="text-xs font-semibold uppercase tracking-[0.35em] text-text-muted">
            By Collection
          </h3>
          {Object.entries(nodesByCollection).map(([collectionSlug, nodes]) => {
            const collection = collections.find((c) => c.slug === collectionSlug);
            if (!collection) return null;

            return (
              <div
                key={collectionSlug}
                className="rounded-xl border border-cosmic-border bg-cosmic-surface p-4"
              >
                <div className="mb-3 flex items-center gap-3">
                  <span className="text-2xl">{collection.icon}</span>
                  <div>
                    <h4 className="font-semibold text-text-primary">{collection.name}</h4>
                    <p className="text-xs text-text-muted">{nodes.length} texts</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {nodes.map((node) => (
                    <button
                      key={node.id}
                      onClick={() => setSelectedNode(node.id)}
                      className={`rounded-lg px-3 py-1 text-xs transition-all ${
                        node.id === selectedNode
                          ? 'bg-atlantean-teal text-cosmic-deep'
                          : 'border border-cosmic-border bg-cosmic-raised text-text-secondary hover:border-atlantean-teal/50 hover:text-atlantean-teal'
                      }`}
                    >
                      {node.title}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Sidebar - Node Details */}
      <aside className="lg:sticky lg:top-24 lg:h-fit">
        {selectedNodeData ? (
          <div className="rounded-xl border border-cosmic-border bg-cosmic-surface p-6 space-y-6">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-atlantean-teal mb-2">
                Selected Text
              </p>
              <h3 className="font-display text-xl font-semibold text-text-primary">
                {selectedNodeData.title}
              </h3>
              <p className="mt-1 text-sm text-text-muted capitalize">
                {selectedNodeData.collection.replace(/-/g, ' ')}
              </p>
            </div>

            {/* Situations */}
            {selectedNodeData.situations.length > 0 && (
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-gold-bright mb-2">
                  Situations
                </p>
                <div className="flex flex-wrap gap-2">
                  {selectedNodeData.situations.map((sit) => (
                    <span
                      key={sit}
                      className="rounded-full border border-gold-medium/30 bg-gold-dark/20 px-2 py-1 text-xs text-gold-light"
                    >
                      {sit}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Outgoing Connections */}
            {selectedConnections.outgoing.length > 0 && (
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-draconic-crimson mb-2">
                  Leads To ({selectedConnections.outgoing.length})
                </p>
                <ul className="space-y-2">
                  {selectedConnections.outgoing.slice(0, 5).map((conn) => (
                    <li key={`${conn.source}-${conn.target}`} className="text-sm">
                      <button
                        onClick={() => setSelectedNode(conn.node?.id || null)}
                        className="text-text-secondary hover:text-atlantean-teal transition-colors text-left"
                      >
                        {conn.node?.title}
                        <span className="ml-2 text-xs text-text-muted">({conn.type})</span>
                      </button>
                    </li>
                  ))}
                  {selectedConnections.outgoing.length > 5 && (
                    <li className="text-xs text-text-muted">
                      +{selectedConnections.outgoing.length - 5} more
                    </li>
                  )}
                </ul>
              </div>
            )}

            {/* Incoming Connections */}
            {selectedConnections.incoming.length > 0 && (
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-blue-400 mb-2">
                  Comes From ({selectedConnections.incoming.length})
                </p>
                <ul className="space-y-2">
                  {selectedConnections.incoming.slice(0, 5).map((conn) => (
                    <li key={`${conn.source}-${conn.target}`} className="text-sm">
                      <button
                        onClick={() => setSelectedNode(conn.node?.id || null)}
                        className="text-text-secondary hover:text-atlantean-teal transition-colors text-left"
                      >
                        {conn.node?.title}
                        <span className="ml-2 text-xs text-text-muted">({conn.type})</span>
                      </button>
                    </li>
                  ))}
                  {selectedConnections.incoming.length > 5 && (
                    <li className="text-xs text-text-muted">
                      +{selectedConnections.incoming.length - 5} more
                    </li>
                  )}
                </ul>
              </div>
            )}

            {/* Read Button */}
            <Link
              href={`/library/${selectedNodeData.id}`}
              className="block w-full rounded-lg bg-atlantean-teal py-3 text-center font-semibold text-cosmic-deep hover:bg-atlantean-teal/90 transition-colors"
            >
              Read This Text
            </Link>
          </div>
        ) : (
          <div className="rounded-xl border border-cosmic-border bg-cosmic-surface p-6 text-center">
            <p className="text-text-muted">
              Select a node to see its details and connections
            </p>
          </div>
        )}
      </aside>
    </div>
  );
}
