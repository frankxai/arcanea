/**
 * Library Collection Page
 *
 * Displays all texts within a collection with the cosmic design system.
 */

import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getCollection, getTextsInCollection, COLLECTIONS } from '../../../lib/content';

interface Props {
  params: Promise<{ collection: string }>;
}

export async function generateStaticParams() {
  return COLLECTIONS.map((c) => ({ collection: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { collection: slug } = await params;
  const collection = await getCollection(slug);

  if (!collection) {
    return { title: 'Collection Not Found' };
  }

  return {
    title: `${collection.name} | Library of Arcanea`,
    description: collection.description,
    openGraph: {
      title: `${collection.name} | Library of Arcanea`,
      description: collection.description,
    },
  };
}

export default async function CollectionPage({ params }: Props) {
  const { collection: slug } = await params;
  const collection = await getCollection(slug);

  if (!collection) {
    notFound();
  }

  const texts = await getTextsInCollection(slug);

  // Find adjacent collections for navigation
  const currentIndex = COLLECTIONS.findIndex((c) => c.slug === slug);
  const prevCollection = currentIndex > 0 ? COLLECTIONS[currentIndex - 1] : null;
  const nextCollection = currentIndex < COLLECTIONS.length - 1 ? COLLECTIONS[currentIndex + 1] : null;

  return (
    <main className="mx-auto max-w-5xl px-6 pb-24 pt-12">
      {/* Breadcrumb */}
      <nav className="mb-8 text-sm" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 text-text-muted">
          <li>
            <Link href="/library" className="hover:text-atlantean-teal transition-colors">
              Library
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-text-primary">{collection.name}</li>
        </ol>
      </nav>

      {/* Collection Header */}
      <header className="relative mb-16 overflow-hidden rounded-3xl border border-cosmic-border bg-gradient-to-br from-cosmic-surface via-cosmic-deep to-cosmic-void p-10">
        <div className="pointer-events-none absolute inset-0 opacity-40" aria-hidden="true">
          <div className="absolute -left-24 top-16 h-72 w-72 rounded-full bg-atlantean-teal/30 blur-3xl" />
          <div className="absolute right-[-10%] top-1/3 h-80 w-80 rounded-full bg-gold-bright/20 blur-3xl" />
        </div>

        <div className="relative">
          <div className="mb-4 flex items-center gap-4">
            <span className="text-4xl">{collection.icon}</span>
            <span className="rounded-full border border-atlantean-teal/40 bg-atlantean-teal/10 px-4 py-1 text-xs uppercase tracking-[0.3em] text-atlantean-teal">
              Collection {collection.order} of 17
            </span>
          </div>

          <h1 className="font-display text-4xl font-semibold tracking-tight text-text-primary md:text-5xl">
            {collection.name}
          </h1>

          <p className="mt-4 max-w-2xl text-lg text-text-secondary">
            {collection.description}
          </p>

          <div className="mt-6 flex items-center gap-6 text-sm text-text-muted">
            <span>{texts.length} {texts.length === 1 ? 'text' : 'texts'}</span>
            <span className="h-4 w-px bg-cosmic-border" aria-hidden="true" />
            <span className="capitalize">{collection.format} format</span>
          </div>

          <div className="mt-8 rounded-xl border border-gold-medium/30 bg-gold-dark/20 p-4">
            <p className="text-sm text-gold-bright">
              <span className="font-semibold">Read when:</span> {collection.readWhen}
            </p>
          </div>
        </div>
      </header>

      {/* Texts Grid */}
      <section aria-labelledby="texts-heading">
        <h2 id="texts-heading" className="mb-8 text-xs uppercase tracking-[0.35em] text-atlantean-teal">
          Texts in this collection
        </h2>

        <div className="space-y-4">
          {texts.map((text, index) => (
            <Link
              key={text.slug}
              href={`/library/${text.slug}`}
              className="group block rounded-2xl border border-cosmic-border bg-cosmic-surface p-6 transition-all hover:border-atlantean-teal/50 hover:shadow-[0_0_40px_rgba(127,255,212,0.15)]"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="mb-2 flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full border border-cosmic-border-bright bg-cosmic-raised text-sm font-semibold text-text-muted">
                      {index + 1}
                    </span>
                    <span className="text-xs uppercase tracking-[0.2em] text-text-muted">
                      {text.frontmatter.format}
                    </span>
                  </div>

                  <h3 className="font-display text-xl font-semibold text-text-primary group-hover:text-atlantean-teal transition-colors">
                    {text.frontmatter.title}
                  </h3>

                  <p className="mt-2 line-clamp-2 text-sm text-text-secondary">
                    {text.frontmatter.excerpt}
                  </p>

                  <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-text-muted">
                    <span>{text.frontmatter.readingTime} min read</span>
                    <span className="h-3 w-px bg-cosmic-border" aria-hidden="true" />
                    <span>{text.frontmatter.wordCount?.toLocaleString()} words</span>

                    {text.frontmatter.situations.length > 0 && (
                      <>
                        <span className="h-3 w-px bg-cosmic-border" aria-hidden="true" />
                        <span className="text-atlantean-teal/80">
                          For: {text.frontmatter.situations.slice(0, 2).join(', ')}
                        </span>
                      </>
                    )}
                  </div>
                </div>

                <div className="hidden md:flex h-12 w-12 items-center justify-center rounded-full border border-cosmic-border-bright bg-cosmic-raised text-atlantean-teal group-hover:bg-atlantean-teal group-hover:text-cosmic-deep transition-colors">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Collection Navigation */}
      <nav className="mt-16 flex items-center justify-between rounded-2xl border border-cosmic-border bg-cosmic-surface p-6">
        {prevCollection ? (
          <Link
            href={`/library/${prevCollection.slug}`}
            className="group flex items-center gap-3 text-text-secondary hover:text-atlantean-teal transition-colors"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <div className="text-left">
              <p className="text-xs uppercase tracking-[0.2em] text-text-muted">Previous</p>
              <p className="font-display font-semibold">{prevCollection.name}</p>
            </div>
          </Link>
        ) : (
          <div />
        )}

        <Link
          href="/library"
          className="rounded-full border border-cosmic-border-bright px-4 py-2 text-sm text-text-muted hover:border-atlantean-teal hover:text-atlantean-teal transition-colors"
        >
          All Collections
        </Link>

        {nextCollection ? (
          <Link
            href={`/library/${nextCollection.slug}`}
            className="group flex items-center gap-3 text-text-secondary hover:text-atlantean-teal transition-colors"
          >
            <div className="text-right">
              <p className="text-xs uppercase tracking-[0.2em] text-text-muted">Next</p>
              <p className="font-display font-semibold">{nextCollection.name}</p>
            </div>
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        ) : (
          <div />
        )}
      </nav>
    </main>
  );
}
