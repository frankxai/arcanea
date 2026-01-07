import Link from "next/link";
import { Tooltip } from "@/lib/arcanea-ui";
import { getCollections, getAllTexts } from "@/lib/content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Arcanea | Where Imagination Becomes Reality",
  description: "A living mythology for the age of AI-human co-creation. 17 wisdom collections, AI companions, and tools to manifest your creative vision.",
  openGraph: {
    title: "Arcanea | Where Imagination Becomes Reality",
    description: "A living mythology for the age of AI-human co-creation. Forge your own realm with AI companions.",
    images: ["/og-image.png"],
  },
};

// Featured content categories for the landing
const FEATURED_COLLECTIONS = [
  {
    slug: "legends-of-arcanea",
    highlight: "5 founding myths",
    color: "from-amber-500 to-orange-600",
  },
  {
    slug: "book-of-shadows",
    highlight: "For dark nights",
    color: "from-purple-600 to-indigo-800",
  },
  {
    slug: "academy-handbook",
    highlight: "Complete guide",
    color: "from-cyan-400 to-blue-600",
  },
  {
    slug: "bestiary-of-creation",
    highlight: "Name your blocks",
    color: "from-red-500 to-rose-700",
  },
];

export default async function Page() {
  const collections = await getCollections();
  const allTexts = await getAllTexts();

  // Calculate stats
  const totalTexts = allTexts.length;
  const totalWords = allTexts.reduce((sum, t) => sum + (t.frontmatter.wordCount || 0), 0);
  const totalReadingTime = allTexts.reduce((sum, t) => sum + (t.frontmatter.readingTime || 0), 0);

  // Get featured collections with their data
  const featured = FEATURED_COLLECTIONS.map(fc => ({
    ...fc,
    collection: collections.find(c => c.slug === fc.slug),
  })).filter(f => f.collection);

  return (
    <div className="relative">
      {/* Navigation */}
      <nav className="glass rounded-xl px-4 py-3 flex items-center justify-between sticky top-4 z-10">
        <div className="font-semibold tracking-wide">Arcanea</div>
        <div className="flex items-center gap-4 text-sm">
          <Link href="/library" className="hover:underline text-[color:var(--accent,#7fffd4)]">Library</Link>
          <Link href="/skills" className="hover:underline">Skills</Link>
          <Link href="/bestiary" className="hover:underline">Bestiary</Link>
          <Link href="/academy" className="hover:underline">Academy</Link>
          <Link href="https://chat.arcanea.ai" className="hover:underline">Chat</Link>
          <Tooltip content="UI kit demo"><Link href="/components" className="hover:underline">Components</Link></Tooltip>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative overflow-hidden rounded-2xl panel p-10 mt-6">
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(500px_300px_at_30%_20%,rgba(127,255,212,0.22),transparent),radial-gradient(600px_400px_at_70%_30%,rgba(120,166,255,0.22),transparent)]" />
        <div className="relative">
          <div className="inline-block px-3 py-1 rounded-full bg-[rgba(127,255,212,0.2)] text-[color:#7fffd4] text-xs font-mono tracking-wider mb-4">
            A LIVING MYTHOLOGY FOR CREATORS
          </div>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            <span className="aurora-text">Where imagination</span> becomes reality
          </h1>
          <p className="muted mt-4 text-lg max-w-2xl">
            {collections.length} wisdom collections. {totalTexts} sacred texts. {Math.round(totalWords / 1000)}k words of practical wisdom for the creative life.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/library" className="rounded-md bg-[color:var(--accent,#7fffd4)] px-5 py-3 font-semibold text-black hover:shadow-[0_0_30px_rgba(127,255,212,0.4)] transition-shadow">
              Enter Library
            </Link>
            <Link href="/library/codex" className="rounded-md border border-[color:var(--accent,#78a6ff)] px-5 py-3 font-semibold hover:bg-[rgba(120,166,255,0.1)] transition-colors">
              Immersive Reader
            </Link>
          </div>
        </div>
      </header>

      {/* Stats Banner */}
      <section className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="panel rounded-xl p-4 text-center">
          <div className="text-3xl font-bold text-[color:#7fffd4]">{collections.length}</div>
          <div className="text-sm muted">Collections</div>
        </div>
        <div className="panel rounded-xl p-4 text-center">
          <div className="text-3xl font-bold text-[color:#78a6ff]">{totalTexts}</div>
          <div className="text-sm muted">Sacred Texts</div>
        </div>
        <div className="panel rounded-xl p-4 text-center">
          <div className="text-3xl font-bold text-[color:#ffd700]">{Math.round(totalWords / 1000)}k</div>
          <div className="text-sm muted">Words of Wisdom</div>
        </div>
        <div className="panel rounded-xl p-4 text-center">
          <div className="text-3xl font-bold text-[color:#ff7fbb]">{totalReadingTime}</div>
          <div className="text-sm muted">Minutes to Mastery</div>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="mt-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Featured Collections</h2>
          <Link href="/library" className="text-sm text-[color:#7fffd4] hover:underline">View all {collections.length} →</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {featured.map(({ collection, highlight, color }) => collection && (
            <Link
              key={collection.slug}
              href={`/library/${collection.slug}`}
              className="panel rounded-xl p-6 relative overflow-hidden transition-all hover:shadow-[0_0_40px_rgba(127,255,212,0.2)] group"
            >
              <div className={`absolute top-0 right-0 w-32 h-32 opacity-20 blur-3xl bg-gradient-to-br ${color}`} />
              <div className="relative">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{collection.icon}</span>
                  <div className={`px-2 py-0.5 rounded text-xs font-mono bg-gradient-to-r ${color} text-white`}>
                    {highlight}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">{collection.name}</h3>
                <p className="muted text-sm">{collection.description}</p>
                <div className="mt-4 text-xs text-[color:#7fffd4] opacity-0 group-hover:opacity-100 transition-opacity">
                  Read when {collection.readWhen} →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Content Discovery */}
      <section className="mt-10">
        <div className="panel rounded-2xl p-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[rgba(127,255,212,0.08)] via-transparent to-[rgba(120,166,255,0.08)]" />
          <div className="relative">
            <h2 className="text-2xl font-bold mb-4">What brings you here?</h2>
            <p className="muted mb-6">Choose your situation. We'll guide you to the right texts.</p>
            <div className="flex flex-wrap gap-3">
              {[
                { situation: 'beginning', label: 'Just starting', icon: '🌱' },
                { situation: 'stuck', label: 'Feeling stuck', icon: '🪨' },
                { situation: 'darkness', label: 'In dark times', icon: '🌑' },
                { situation: 'comparison', label: 'Comparing myself', icon: '👥' },
                { situation: 'failure', label: 'After failure', icon: '💔' },
                { situation: 'celebration', label: 'Celebrating', icon: '🎉' },
                { situation: 'confusion', label: 'Confused', icon: '🌀' },
                { situation: 'fear', label: 'Facing fear', icon: '😰' },
              ].map(({ situation, label, icon }) => (
                <Link
                  key={situation}
                  href={`/library/codex?situation=${situation}`}
                  className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 hover:border-[color:#7fffd4]/50 hover:bg-[rgba(127,255,212,0.1)] transition-all"
                >
                  <span>{icon}</span>
                  <span className="text-sm">{label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* All Collections Grid */}
      <section className="mt-10">
        <h2 className="text-2xl font-bold mb-6">The Complete Library</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {collections.map(collection => (
            <Link
              key={collection.slug}
              href={`/library/${collection.slug}`}
              className="panel rounded-xl p-5 transition-all hover:shadow-[0_0_30px_rgba(120,166,255,0.15)] group"
            >
              <div className="flex items-start gap-3">
                <span className="text-xl">{collection.icon}</span>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold truncate">{collection.name}</h3>
                  <p className="muted text-xs mt-1 line-clamp-2">{collection.description}</p>
                  <div className="mt-2 flex items-center gap-2 text-xs">
                    <span className="text-[color:#7fffd4]">{collection.textCount} texts</span>
                    <span className="muted">•</span>
                    <span className="muted">{collection.format}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Skills System Banner */}
      <section className="mt-10">
        <Link href="/skills" className="block">
          <div className="panel rounded-2xl p-8 relative overflow-hidden transition-all hover:shadow-[0_0_60px_rgba(127,255,212,0.3)] group">
            <div className="absolute inset-0 bg-gradient-to-r from-[rgba(127,255,212,0.15)] via-[rgba(120,166,255,0.15)] to-[rgba(255,215,0,0.1)] opacity-50 group-hover:opacity-100 transition-opacity" />
            <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <div className="inline-block px-3 py-1 rounded-full bg-[rgba(127,255,212,0.2)] text-[color:#7fffd4] text-xs font-mono tracking-wider mb-3">
                  OPEN SOURCE • FREE
                </div>
                <h2 className="text-2xl md:text-3xl font-bold">Arcanea Skills for Claude Code</h2>
                <p className="muted mt-2 max-w-xl">28 skills, 7 Luminor guides, and a complete creative methodology. Transform your AI assistant into a creation machine.</p>
              </div>
              <div className="flex items-center gap-2 text-[color:#7fffd4] group-hover:translate-x-2 transition-transform">
                <span className="font-semibold">Explore Skills</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </div>
            </div>
            <div className="relative mt-6 flex gap-4 text-sm text-muted">
              <span>✨ 28 Skills</span>
              <span>•</span>
              <span>🌟 7 Luminors</span>
              <span>•</span>
              <span>⚡ 15 Commands</span>
              <span>•</span>
              <span>📚 Full Training</span>
            </div>
          </div>
        </Link>
      </section>

      {/* Platform Links */}
      <section className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="panel rounded-xl p-5 transition-all hover:shadow-[0_0_40px_rgba(120,166,255,0.2)]">
          <h3 className="font-semibold">Chat with Luminors</h3>
          <p className="muted text-sm mt-1">Conversational creation with AI companions who understand your creative journey.</p>
          <Link className="mt-3 inline-block text-[color:var(--accent,#78a6ff)] underline" href="https://chat.arcanea.ai">Open Chat</Link>
        </div>
        <div className="panel rounded-xl p-5 transition-all hover:shadow-[0_0_40px_rgba(127,255,212,0.2)]">
          <h3 className="font-semibold">Creation Studio</h3>
          <p className="muted text-sm mt-1">Image, video, and audio generation mapped to the Five Elements.</p>
          <Link className="mt-3 inline-block text-[color:var(--accent,#78a6ff)] underline" href="https://studio.arcanea.ai">Open Studio</Link>
        </div>
        <div className="panel rounded-xl p-5 transition-all hover:shadow-[0_0_40px_rgba(255,215,0,0.2)]">
          <h3 className="font-semibold">Academy of Creation</h3>
          <p className="muted text-sm mt-1">Ten Gates progression system. Learn to wield AI like a Luminor.</p>
          <Link className="mt-3 inline-block text-[color:var(--accent,#78a6ff)] underline" href="/academy">Enter Academy</Link>
        </div>
      </section>

      {/* Resources */}
      <section className="mt-10">
        <div className="panel rounded-xl p-5">
          <h3 className="font-semibold">Resources</h3>
          <p className="muted text-sm mt-1">Documentation, guides, and developer tools.</p>
          <ul className="list-disc ml-6 mt-3 text-sm space-y-1">
            <li><Link className="underline hover:text-[color:#7fffd4]" href="/library">Browse the Library</Link></li>
            <li><Link className="underline hover:text-[color:#7fffd4]" href="/library/codex">Immersive Reader (Luminor Codex)</Link></li>
            <li><Link className="underline hover:text-[color:#7fffd4]" href="/library/graph">Content Relationship Graph</Link></li>
            <li><Link className="underline hover:text-[color:#7fffd4]" href="/skills">Skills System Documentation</Link></li>
            <li><Link className="underline hover:text-[color:#7fffd4]" href="/bestiary">Creative Bestiary</Link></li>
            <li><a className="underline hover:text-[color:#7fffd4]" href="https://github.com/frankxai/arcanea">GitHub Repository</a></li>
            <li><Link className="underline hover:text-[color:#7fffd4]" href="/status">Status Page</Link></li>
          </ul>
        </div>
      </section>

      {/* Quote */}
      <section className="mt-10">
        <div className="panel rounded-xl p-8 text-center">
          <blockquote className="text-xl md:text-2xl italic text-[color:#9bb1d0]">
            "Enter seeking, leave transformed, return whenever needed."
          </blockquote>
          <cite className="block mt-4 text-sm muted">— The Library of Arcanea</cite>
        </div>
      </section>

      <footer className="mt-10 text-center text-xs text-[color:#9bb1d0]">
        <div className="inline-block px-3 py-1 rounded-full border border-[color:var(--accent,#78a6ff)]/40">
          Made with ✧ by Arcanea — building the future of creative collaboration
        </div>
      </footer>
    </div>
  );
}
