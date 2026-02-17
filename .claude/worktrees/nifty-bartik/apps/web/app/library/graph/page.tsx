/**
 * Content Relationship Graph Page
 *
 * ★ Insight ─────────────────────────────────────
 * This visualization shows how texts relate to each other:
 * 1. Explicit relationships (prerequisites, next reading)
 * 2. Shared tags and situations
 * 3. Collection clustering
 * Uses a force-directed graph layout.
 * ─────────────────────────────────────────────────
 */

import { Metadata } from "next";
import Link from "next/link";
import { buildContentGraph, getCollections } from "../../../lib/content";
import { ContentGraphVisualization } from "./graph-visualization";

export const metadata: Metadata = {
  title: "Relationship Graph | Arcanea Library",
  description:
    "Explore the interconnected web of wisdom in the Library of Arcanea. See how texts relate to each other through shared themes, situations, and reading paths.",
  openGraph: {
    title: "Relationship Graph | Arcanea Library",
    description:
      "Explore the interconnected web of wisdom in the Library of Arcanea.",
  },
};

export default async function GraphPage() {
  const graph = await buildContentGraph();
  const collections = await getCollections();

  return (
    <main className="mx-auto max-w-7xl px-6 pb-24 pt-12">
      {/* Tab Navigation */}
      <nav className="mb-12 flex items-center gap-4 border-b border-cosmic-border pb-4">
        <Link
          href="/library"
          className="rounded-full border border-cosmic-border px-4 py-2 text-sm text-text-muted hover:border-atlantean-teal/50 hover:text-atlantean-teal transition-colors"
        >
          Browse Library
        </Link>
        <Link
          href="/library/codex"
          className="rounded-full border border-cosmic-border px-4 py-2 text-sm text-text-muted hover:border-atlantean-teal/50 hover:text-atlantean-teal transition-colors"
        >
          Luminor Codex
        </Link>
        <Link
          href="/library/graph"
          className="rounded-full bg-atlantean-teal px-4 py-2 text-sm font-semibold text-cosmic-deep"
        >
          Relationship Graph
        </Link>
      </nav>

      {/* Header */}
      <header className="mb-12">
        <h1 className="font-display text-4xl font-bold tracking-tight text-text-primary md:text-5xl">
          The Web of Wisdom
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-text-secondary">
          Every text in the Library connects to others through shared themes,
          situations, and reading paths. Explore the relationships to discover
          new paths through the wisdom.
        </p>
      </header>

      {/* Stats */}
      <div className="mb-12 grid gap-4 md:grid-cols-4">
        <div className="rounded-xl border border-cosmic-border bg-cosmic-surface p-6">
          <p className="text-3xl font-bold text-atlantean-teal">{graph.nodes.length}</p>
          <p className="text-sm text-text-muted">Total Texts</p>
        </div>
        <div className="rounded-xl border border-cosmic-border bg-cosmic-surface p-6">
          <p className="text-3xl font-bold text-gold-bright">{collections.length}</p>
          <p className="text-sm text-text-muted">Collections</p>
        </div>
        <div className="rounded-xl border border-cosmic-border bg-cosmic-surface p-6">
          <p className="text-3xl font-bold text-draconic-crimson">{graph.edges.length}</p>
          <p className="text-sm text-text-muted">Connections</p>
        </div>
        <div className="rounded-xl border border-cosmic-border bg-cosmic-surface p-6">
          <p className="text-3xl font-bold text-text-primary">
            {(graph.edges.length / Math.max(graph.nodes.length, 1)).toFixed(1)}
          </p>
          <p className="text-sm text-text-muted">Avg. Connections per Text</p>
        </div>
      </div>

      {/* Graph Visualization */}
      <ContentGraphVisualization graph={graph} collections={collections} />

      {/* Legend */}
      <div className="mt-12 rounded-xl border border-cosmic-border bg-cosmic-surface p-6">
        <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-atlantean-teal">
          Connection Types
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          <div className="flex items-center gap-3">
            <span className="h-3 w-8 rounded-full bg-atlantean-teal" />
            <span className="text-sm text-text-secondary">Related</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="h-3 w-8 rounded-full bg-gold-bright" />
            <span className="text-sm text-text-secondary">Prerequisite</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="h-3 w-8 rounded-full bg-draconic-crimson" />
            <span className="text-sm text-text-secondary">Next Reading</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="h-3 w-8 rounded-full bg-purple-400" />
            <span className="text-sm text-text-secondary">Shared Tag</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="h-3 w-8 rounded-full bg-blue-400" />
            <span className="text-sm text-text-secondary">Shared Situation</span>
          </div>
        </div>
      </div>
    </main>
  );
}
