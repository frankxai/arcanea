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
      <nav className="mb-12 flex items-center gap-4 border-b border-white/10 pb-4">
        <Link
          href="/library"
          className="rounded-full bg-brand-primary px-4 py-2 text-sm font-semibold text-white font-sans shadow-glow-brand"
        >
          Browse Library
        </Link>
        <Link
          href="/library/codex"
          className="rounded-full glass border border-white/10 px-4 py-2 text-sm text-text-muted hover:border-crystal/50 hover:text-crystal transition-colors font-sans"
        >
          Luminor Codex
        </Link>
        <Link
          href="/library/graph"
          className="rounded-full glass border border-white/10 px-4 py-2 text-sm text-text-muted hover:border-crystal/50 hover:text-crystal transition-colors font-sans"
        >
          Relationship Graph
        </Link>
      </nav>

      <LibraryBrowse collections={collections} />
    </main>
  );
}
