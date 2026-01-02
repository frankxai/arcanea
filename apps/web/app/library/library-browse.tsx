/**
 * Library Browse Component
 *
 * ★ Insight ─────────────────────────────────────
 * This component presents the 17 collections of the Library
 * in a visually stunning grid with:
 * 1. Collection cards with cosmic styling
 * 2. Situation-based filtering (read when...)
 * 3. Search functionality
 * 4. Reading path generator
 * ─────────────────────────────────────────────────
 */

'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import type { Collection, Situation } from '../../lib/content/types';

interface LibraryBrowseProps {
  collections: Collection[];
}

const SITUATIONS: { value: Situation; label: string; icon: string }[] = [
  { value: 'beginning', label: 'Beginning something new', icon: '🌅' },
  { value: 'stuck', label: 'Feeling stuck', icon: '🌀' },
  { value: 'darkness', label: 'In darkness', icon: '🌑' },
  { value: 'comparison', label: 'Comparing myself', icon: '👥' },
  { value: 'failure', label: 'After failure', icon: '🔥' },
  { value: 'celebration', label: 'Celebrating', icon: '✨' },
  { value: 'confusion', label: 'Confused', icon: '🌫️' },
  { value: 'lost', label: 'Feeling lost', icon: '🧭' },
  { value: 'collaboration', label: 'Working with others', icon: '🤝' },
  { value: 'fear', label: 'Facing fear', icon: '⚡' },
  { value: 'scattered', label: 'Scattered mind', icon: '💫' },
];

// Map situations to recommended collections
const SITUATION_TO_COLLECTIONS: Record<Situation, string[]> = {
  beginning: ['laws-of-arcanea', 'academy-handbook', 'atlas-of-territories'],
  stuck: ['chronicles-of-luminors', 'bestiary-of-creation', 'book-of-rituals'],
  darkness: ['book-of-shadows', 'chronicles-of-luminors', 'songs-and-hymns'],
  comparison: ['wisdom-scrolls', 'bestiary-of-creation'],
  failure: ['tales-of-creators', 'book-of-rituals', 'songs-and-hymns'],
  celebration: ['songs-and-hymns', 'poesie-of-freedom'],
  confusion: ['dialogues-of-masters', 'meditations-on-elements'],
  lost: ['atlas-of-territories', 'prophecies'],
  collaboration: ['codex-of-collaboration'],
  fear: ['chronicles-of-luminors', 'legends-of-arcanea'],
  scattered: ['meditations-on-elements', 'academy-handbook'],
};

export function LibraryBrowse({ collections }: LibraryBrowseProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSituation, setSelectedSituation] = useState<Situation | null>(null);

  const filteredCollections = useMemo(() => {
    let filtered = collections;

    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (c) =>
          c.name.toLowerCase().includes(query) ||
          c.description.toLowerCase().includes(query) ||
          c.readWhen.toLowerCase().includes(query)
      );
    }

    // Filter by situation
    if (selectedSituation) {
      const recommendedSlugs = SITUATION_TO_COLLECTIONS[selectedSituation] || [];
      filtered = filtered.filter((c) => recommendedSlugs.includes(c.slug));
    }

    return filtered;
  }, [collections, searchQuery, selectedSituation]);

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl border border-cosmic-border bg-gradient-to-br from-cosmic-surface via-cosmic-deep to-cosmic-void p-10">
        <div className="pointer-events-none absolute inset-0 opacity-40" aria-hidden="true">
          <div className="absolute -left-24 top-16 h-72 w-72 rounded-full bg-atlantean-teal/30 blur-3xl" />
          <div className="absolute right-[-10%] top-1/3 h-80 w-80 rounded-full bg-gold-bright/20 blur-3xl" />
          <div className="absolute bottom-0 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-draconic-crimson/10 blur-2xl" />
        </div>

        <div className="relative max-w-3xl">
          <div className="mb-4 flex items-center gap-3 text-xs uppercase tracking-[0.4em] text-atlantean-teal">
            <span>The Library of Arcanea</span>
            <span className="hidden h-px flex-1 bg-cosmic-border sm:block" aria-hidden="true" />
          </div>

          <h1 className="font-display text-4xl font-bold tracking-tight text-text-primary md:text-5xl lg:text-6xl">
            <span className="aurora-text">Seventeen Collections</span>
            <br />
            of Wisdom, Legend, and Practice
          </h1>

          <p className="mt-6 text-xl text-text-secondary leading-relaxed">
            These books are not entertainment. They are equipment for living.
            Some will call to you now. Others will wait until you are ready.
          </p>

          <blockquote className="mt-8 border-l-4 border-gold-bright/60 pl-6 italic text-gold-bright">
            "Enter seeking, leave transformed, return whenever needed."
            <footer className="mt-2 text-sm text-text-muted not-italic">
              — Inscription on the Library Door
            </footer>
          </blockquote>
        </div>
      </section>

      {/* Situation Filter */}
      <section>
        <h2 className="mb-6 text-xs font-semibold uppercase tracking-[0.35em] text-atlantean-teal">
          What brings you here?
        </h2>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setSelectedSituation(null)}
            className={`rounded-full px-4 py-2 text-sm transition-all ${
              selectedSituation === null
                ? 'bg-atlantean-teal text-cosmic-deep'
                : 'border border-cosmic-border bg-cosmic-surface text-text-muted hover:border-atlantean-teal/50 hover:text-atlantean-teal'
            }`}
          >
            All Collections
          </button>
          {SITUATIONS.map((situation) => (
            <button
              key={situation.value}
              onClick={() =>
                setSelectedSituation(
                  selectedSituation === situation.value ? null : situation.value
                )
              }
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm transition-all ${
                selectedSituation === situation.value
                  ? 'bg-gold-bright text-cosmic-deep'
                  : 'border border-cosmic-border bg-cosmic-surface text-text-muted hover:border-gold-medium/50 hover:text-gold-bright'
              }`}
            >
              <span>{situation.icon}</span>
              <span>{situation.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Search */}
      <section>
        <div className="relative">
          <input
            type="text"
            placeholder="Search collections..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-cosmic-border bg-cosmic-surface px-6 py-4 text-text-primary placeholder:text-text-muted focus:border-atlantean-teal focus:outline-none focus:ring-2 focus:ring-atlantean-teal/20"
          />
          <svg
            className="absolute right-6 top-1/2 h-5 w-5 -translate-y-1/2 text-text-muted"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </section>

      {/* Collections Grid */}
      <section>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xs font-semibold uppercase tracking-[0.35em] text-text-muted">
            {filteredCollections.length} {filteredCollections.length === 1 ? 'Collection' : 'Collections'}
          </h2>
        </div>

        {filteredCollections.length === 0 ? (
          <div className="rounded-xl border border-cosmic-border bg-cosmic-surface p-12 text-center">
            <p className="text-lg text-text-muted">No collections match your search.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedSituation(null);
              }}
              className="mt-4 text-atlantean-teal hover:underline"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredCollections.map((collection) => (
              <CollectionCard key={collection.slug} collection={collection} />
            ))}
          </div>
        )}
      </section>

      {/* Quick Reference */}
      <section className="rounded-3xl border border-cosmic-border bg-cosmic-surface p-8">
        <h2 className="mb-6 text-2xl font-display font-semibold text-text-primary">
          Finding What You Need
        </h2>

        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-atlantean-teal">
              By Format
            </h3>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li><strong className="text-text-primary">Theory:</strong> Laws of Arcanea</li>
              <li><strong className="text-text-primary">Story:</strong> Legends, Chronicles, Tales</li>
              <li><strong className="text-text-primary">Poetry:</strong> Poetry of Freedom</li>
              <li><strong className="text-text-primary">Practical:</strong> Wisdom Scrolls, Rituals, Handbook</li>
              <li><strong className="text-text-primary">Dialogue:</strong> Dialogues of Masters</li>
              <li><strong className="text-text-primary">Meditation:</strong> Meditations on Elements</li>
              <li><strong className="text-text-primary">Reference:</strong> Bestiary, Atlas</li>
              <li><strong className="text-text-primary">Song:</strong> Songs and Hymns</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-gold-bright">
              The Library's Promise
            </h3>
            <p className="text-sm text-text-secondary leading-relaxed">
              If you read these texts honestly—
              If you let them question you as you question them—
              If you apply what resonates and release what doesn't—
              <strong className="text-text-primary"> You will change.</strong>
            </p>
            <p className="mt-4 text-sm text-text-secondary leading-relaxed">
              Not because the texts have magic power, but because engagement with wisdom
              changes those who engage.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

function CollectionCard({ collection }: { collection: Collection }) {
  return (
    <Link
      href={`/library/${collection.slug}`}
      className="group relative overflow-hidden rounded-2xl border border-cosmic-border bg-gradient-to-br from-cosmic-surface via-cosmic-deep to-cosmic-void p-6 transition-all hover:border-atlantean-teal/50 hover:shadow-[0_0_50px_rgba(127,255,212,0.15)]"
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" aria-hidden="true">
        <div className="absolute -left-16 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full bg-atlantean-teal/15 blur-3xl" />
        <div className="absolute right-[-10%] bottom-[-20%] h-48 w-48 rounded-full bg-gold-bright/10 blur-3xl" />
      </div>

      <div className="relative">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-3xl">{collection.icon}</span>
          <span className="rounded-full border border-cosmic-border-bright bg-cosmic-raised px-3 py-1 text-xs uppercase tracking-[0.2em] text-text-muted">
            {collection.order}/17
          </span>
        </div>

        <h3 className="font-display text-xl font-semibold text-text-primary group-hover:text-atlantean-teal transition-colors">
          {collection.name}
        </h3>

        <p className="mt-2 text-sm text-text-secondary line-clamp-2">
          {collection.description}
        </p>

        <div className="mt-4 rounded-lg border border-gold-medium/20 bg-gold-dark/10 p-3">
          <p className="text-xs text-gold-bright">
            <span className="font-semibold">Read when:</span>{' '}
            <span className="text-gold-light">{collection.readWhen}</span>
          </p>
        </div>

        <div className="mt-4 flex items-center justify-between text-xs text-text-muted">
          <span>{collection.textCount} {collection.textCount === 1 ? 'text' : 'texts'}</span>
          <span className="capitalize">{collection.format}</span>
        </div>

        <div className="mt-4 flex items-center gap-2 text-sm text-atlantean-teal opacity-0 transition-opacity group-hover:opacity-100">
          <span>Enter collection</span>
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  );
}
