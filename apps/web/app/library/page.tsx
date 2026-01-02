import { Metadata } from "next";
import Link from "next/link";
import { LibraryBrowse } from "./library-browse";
import { getCollections } from "../../lib/content";

export const metadata: Metadata = {
  title: "Library of Arcanea | Wisdom, Legend, Poetry, and Practice",
  description:
    "Explore the Library of Arcanea - seventeen collections of wisdom, legend, poetry, and practice for the creative soul. Enter seeking, leave transformed.",
  openGraph: {
    title: "Library of Arcanea",
    description:
      "Seventeen collections of wisdom, legend, poetry, and practice. Enter seeking, leave transformed, return whenever needed.",
  },
};

export default async function LibraryPage() {
  const collections = await getCollections();

  return (
    <main className="mx-auto max-w-7xl px-6 pb-24 pt-12">
      {/* Tab Navigation */}
      <nav className="mb-12 flex items-center gap-4 border-b border-cosmic-border pb-4">
        <Link
          href="/library"
          className="rounded-full bg-atlantean-teal px-4 py-2 text-sm font-semibold text-cosmic-deep"
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
          className="rounded-full border border-cosmic-border px-4 py-2 text-sm text-text-muted hover:border-atlantean-teal/50 hover:text-atlantean-teal transition-colors"
        >
          Relationship Graph
        </Link>
      </nav>

      <LibraryBrowse collections={collections} />
    </main>
  );
}
