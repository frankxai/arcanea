/**
 * Library Text Reading Page
 *
 * ★ Insight ─────────────────────────────────────
 * The reading experience is the heart of the Library.
 * This page prioritizes:
 * 1. Typography - Crimson Pro for body, Cinzel for headings
 * 2. Focus - Minimal distractions, centered content
 * 3. Navigation - Table of contents, related texts
 * 4. Accessibility - Proper heading hierarchy, skip links
 * ─────────────────────────────────────────────────
 */

import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import {
  getText,
  getTextsInCollection,
  getRelatedTexts,
  getCollection,
  COLLECTIONS,
} from '../../../../lib/content';

interface Props {
  params: Promise<{ collection: string; text: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { collection, text: textSlug } = await params;
  const fullSlug = `${collection}/${textSlug}`;
  const text = await getText(fullSlug);

  if (!text) {
    return { title: 'Text Not Found' };
  }

  return {
    title: `${text.frontmatter.title} | Library of Arcanea`,
    description: text.frontmatter.excerpt,
    openGraph: {
      title: `${text.frontmatter.title} | Library of Arcanea`,
      description: text.frontmatter.excerpt,
    },
  };
}

export default async function TextPage({ params }: Props) {
  const { collection: collectionSlug, text: textSlug } = await params;
  const fullSlug = `${collectionSlug}/${textSlug}`;
  const text = await getText(fullSlug);

  if (!text) {
    notFound();
  }

  const collection = await getCollection(collectionSlug);
  const textsInCollection = await getTextsInCollection(collectionSlug);
  const relatedTexts = await getRelatedTexts(fullSlug, 4);

  // Find current text index for prev/next navigation
  const currentIndex = textsInCollection.findIndex((t) => t.slug === text.slug);
  const prevText = currentIndex > 0 ? textsInCollection[currentIndex - 1] : null;
  const nextText = currentIndex < textsInCollection.length - 1 ? textsInCollection[currentIndex + 1] : null;

  // Filter headings to show only h2 and h3 for table of contents
  const tocHeadings = text.headings.filter((h) => h.level === 2 || h.level === 3);

  return (
    <div className="min-h-screen bg-cosmic-deep">
      {/* Skip to content link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-atlantean-teal focus:px-4 focus:py-2 focus:text-cosmic-deep"
      >
        Skip to content
      </a>

      {/* Header Bar */}
      <header className="sticky top-0 z-40 border-b border-cosmic-border bg-cosmic-deep/90 backdrop-blur-lg">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <nav className="flex items-center gap-2 text-sm text-text-muted" aria-label="Breadcrumb">
            <Link href="/library" className="hover:text-atlantean-teal transition-colors">
              Library
            </Link>
            <span aria-hidden="true">/</span>
            <Link href={`/library/${collectionSlug}`} className="hover:text-atlantean-teal transition-colors">
              {collection?.name}
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-text-primary truncate max-w-[200px]">{text.frontmatter.title}</span>
          </nav>

          <div className="flex items-center gap-4">
            <span className="text-xs text-text-muted">
              {text.frontmatter.readingTime} min read
            </span>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-12 lg:grid-cols-[1fr_280px]">
          {/* Main Content */}
          <main id="main-content" className="min-w-0">
            {/* Text Header */}
            <header className="mb-12">
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <span className="text-3xl">{collection?.icon}</span>
                <span className="rounded-full border border-atlantean-teal/40 bg-atlantean-teal/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-atlantean-teal">
                  {text.frontmatter.format}
                </span>
                {text.frontmatter.difficulty && (
                  <span className="rounded-full border border-cosmic-border-bright bg-cosmic-raised px-3 py-1 text-xs uppercase tracking-[0.2em] text-text-muted">
                    {text.frontmatter.difficulty}
                  </span>
                )}
              </div>

              <h1 className="font-display text-4xl font-bold tracking-tight text-text-primary md:text-5xl lg:text-6xl">
                {text.frontmatter.title}
              </h1>

              <p className="mt-6 text-xl text-text-secondary leading-relaxed">
                {text.frontmatter.excerpt}
              </p>

              {/* Situations */}
              {text.frontmatter.situations.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-2">
                  {text.frontmatter.situations.map((situation) => (
                    <span
                      key={situation}
                      className="rounded-full border border-gold-medium/30 bg-gold-dark/20 px-3 py-1 text-xs text-gold-bright"
                    >
                      {situation}
                    </span>
                  ))}
                </div>
              )}

              {/* Elements & Luminors */}
              <div className="mt-6 flex flex-wrap items-center gap-6 text-sm text-text-muted">
                {text.frontmatter.elements && text.frontmatter.elements.length > 0 && (
                  <div className="flex items-center gap-2">
                    <span className="text-atlantean-teal">Elements:</span>
                    <span>{text.frontmatter.elements.join(', ')}</span>
                  </div>
                )}
                {text.frontmatter.luminors && text.frontmatter.luminors.length > 0 && (
                  <div className="flex items-center gap-2">
                    <span className="text-gold-bright">Luminors:</span>
                    <span className="capitalize">{text.frontmatter.luminors.join(', ')}</span>
                  </div>
                )}
              </div>
            </header>

            {/* Content */}
            <article className="prose-arcanea">
              <ReactMarkdown
                components={{
                  h1: ({ children }) => (
                    <h1 className="font-display text-3xl font-bold tracking-tight text-text-primary mt-16 mb-6 first:mt-0">
                      {children}
                    </h1>
                  ),
                  h2: ({ children }) => {
                    const text = String(children);
                    const slug = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
                    return (
                      <h2 id={slug} className="font-display text-2xl font-semibold tracking-tight text-text-primary mt-12 mb-4 scroll-mt-24">
                        {children}
                      </h2>
                    );
                  },
                  h3: ({ children }) => {
                    const text = String(children);
                    const slug = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
                    return (
                      <h3 id={slug} className="font-display text-xl font-semibold text-text-primary mt-8 mb-3 scroll-mt-24">
                        {children}
                      </h3>
                    );
                  },
                  h4: ({ children }) => (
                    <h4 className="font-display text-lg font-semibold text-text-primary mt-6 mb-2">
                      {children}
                    </h4>
                  ),
                  p: ({ children }) => (
                    <p className="font-body text-lg leading-relaxed text-text-secondary mb-6">
                      {children}
                    </p>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="my-8 border-l-4 border-atlantean-teal/60 bg-cosmic-surface/50 pl-6 py-4 pr-4 rounded-r-lg italic text-text-primary">
                      {children}
                    </blockquote>
                  ),
                  ul: ({ children }) => (
                    <ul className="my-6 ml-6 space-y-2 list-disc text-text-secondary">
                      {children}
                    </ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="my-6 ml-6 space-y-2 list-decimal text-text-secondary">
                      {children}
                    </ol>
                  ),
                  li: ({ children }) => (
                    <li className="text-lg leading-relaxed">{children}</li>
                  ),
                  strong: ({ children }) => (
                    <strong className="font-semibold text-text-primary">{children}</strong>
                  ),
                  em: ({ children }) => (
                    <em className="italic text-atlantean-teal/90">{children}</em>
                  ),
                  hr: () => (
                    <hr className="my-12 border-cosmic-border" />
                  ),
                  a: ({ href, children }) => (
                    <a
                      href={href}
                      className="text-atlantean-teal underline decoration-atlantean-teal/30 hover:decoration-atlantean-teal transition-colors"
                    >
                      {children}
                    </a>
                  ),
                }}
              >
                {text.content}
              </ReactMarkdown>
            </article>

            {/* Text Navigation */}
            <nav className="mt-16 flex items-stretch gap-4 border-t border-cosmic-border pt-8">
              {prevText ? (
                <Link
                  href={`/library/${prevText.slug}`}
                  className="group flex-1 rounded-xl border border-cosmic-border bg-cosmic-surface p-6 transition-all hover:border-atlantean-teal/50 hover:shadow-[0_0_30px_rgba(127,255,212,0.1)]"
                >
                  <p className="text-xs uppercase tracking-[0.2em] text-text-muted mb-2">Previous</p>
                  <p className="font-display font-semibold text-text-primary group-hover:text-atlantean-teal transition-colors">
                    {prevText.frontmatter.title}
                  </p>
                </Link>
              ) : (
                <div className="flex-1" />
              )}

              {nextText ? (
                <Link
                  href={`/library/${nextText.slug}`}
                  className="group flex-1 rounded-xl border border-cosmic-border bg-cosmic-surface p-6 text-right transition-all hover:border-atlantean-teal/50 hover:shadow-[0_0_30px_rgba(127,255,212,0.1)]"
                >
                  <p className="text-xs uppercase tracking-[0.2em] text-text-muted mb-2">Next</p>
                  <p className="font-display font-semibold text-text-primary group-hover:text-atlantean-teal transition-colors">
                    {nextText.frontmatter.title}
                  </p>
                </Link>
              ) : (
                <div className="flex-1" />
              )}
            </nav>
          </main>

          {/* Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-8">
              {/* Table of Contents */}
              {tocHeadings.length > 0 && (
                <div className="rounded-xl border border-cosmic-border bg-cosmic-surface p-6">
                  <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-atlantean-teal">
                    Contents
                  </h2>
                  <nav aria-label="Table of contents">
                    <ul className="space-y-2">
                      {tocHeadings.map((heading) => (
                        <li
                          key={heading.slug}
                          className={heading.level === 3 ? 'ml-4' : ''}
                        >
                          <a
                            href={`#${heading.slug}`}
                            className="block text-sm text-text-muted hover:text-atlantean-teal transition-colors"
                          >
                            {heading.text}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
              )}

              {/* Related Texts */}
              {relatedTexts.length > 0 && (
                <div className="rounded-xl border border-cosmic-border bg-cosmic-surface p-6">
                  <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-gold-bright">
                    Related Texts
                  </h2>
                  <ul className="space-y-3">
                    {relatedTexts.map((related) => (
                      <li key={related.slug}>
                        <Link
                          href={`/library/${related.slug}`}
                          className="group block"
                        >
                          <p className="text-sm font-semibold text-text-primary group-hover:text-atlantean-teal transition-colors">
                            {related.frontmatter.title}
                          </p>
                          <p className="text-xs text-text-muted mt-1">
                            {related.frontmatter.collection}
                          </p>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Back to Collection */}
              <Link
                href={`/library/${collectionSlug}`}
                className="flex items-center gap-2 rounded-xl border border-cosmic-border bg-cosmic-surface p-4 text-sm text-text-muted hover:border-atlantean-teal/50 hover:text-atlantean-teal transition-all"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to {collection?.name}
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
