import Link from "next/link";
import { Metadata } from "next";
import { getCollections, getAllTexts } from "@/lib/content";
import { HeroSection, LuminorShowcase, FeaturesSection, WisdomsSection } from "@/components/landing";

export const metadata: Metadata = {
  title: "Arcanea | The Creative Intelligence Platform",
  description: "Where imagination becomes reality. 16 Luminor intelligences, Seven Wisdoms framework, and the complete creative toolkit for the age of AI-human co-creation.",
  openGraph: {
    title: "Arcanea | The Creative Intelligence Platform",
    description: "16 Luminor intelligences. Seven Wisdoms. The complete creative toolkit for AI-human co-creation.",
    images: ["/og-image.png"],
  },
};

export default async function Page() {
  const collections = await getCollections();
  const allTexts = await getAllTexts();
  const totalTexts = allTexts.length;
  const totalWords = allTexts.reduce((sum, t) => sum + (t.frontmatter.wordCount || 0), 0);

  return (
    <div className="relative min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-cosmic-deep/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-atlantean-teal-aqua to-creation-prism-purple flex items-center justify-center text-cosmic-deep font-bold text-lg font-display">
                A
              </div>
              <span className="font-display text-xl font-semibold tracking-wide">Arcanea</span>
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-8">
              <Link href="/luminors" className="text-sm text-text-secondary hover:text-atlantean-teal-aqua transition-colors">
                Luminors
              </Link>
              <Link href="/studio" className="text-sm text-text-secondary hover:text-atlantean-teal-aqua transition-colors">
                Studio
              </Link>
              <Link href="/library" className="text-sm text-text-secondary hover:text-atlantean-teal-aqua transition-colors">
                Library
              </Link>
              <Link href="/academy" className="text-sm text-text-secondary hover:text-atlantean-teal-aqua transition-colors">
                Academy
              </Link>
              <Link href="/about" className="text-sm text-text-secondary hover:text-atlantean-teal-aqua transition-colors">
                About
              </Link>
              <Link
                href="/chat"
                className="px-5 py-2.5 rounded-xl bg-atlantean-teal-aqua text-cosmic-deep text-sm font-semibold hover:shadow-[0_0_20px_rgba(127,255,212,0.4)] transition-all"
              >
                Start Creating
              </Link>
            </div>

            {/* Mobile menu button */}
            <button className="md:hidden p-2 text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <HeroSection
          stats={{
            luminors: 16,
            wisdoms: 7,
            collections: collections.length,
            words: totalWords,
          }}
        />

        {/* Features Section */}
        <FeaturesSection />

        {/* Luminor Showcase */}
        <LuminorShowcase />

        {/* Seven Wisdoms */}
        <WisdomsSection />

        {/* Platform CTA */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="relative rounded-[2rem] overflow-hidden">
              {/* Animated background */}
              <div className="absolute inset-0 bg-gradient-to-r from-atlantean-teal-aqua/20 via-creation-prism-purple/20 to-gold-bright/20" />
              <div className="absolute inset-0 bg-cosmic-surface/80 backdrop-blur-xl" />

              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-64 h-64 bg-atlantean-teal-aqua/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-creation-prism-purple/10 rounded-full blur-3xl" />

              <div className="relative p-12 md:p-20">
                <div className="max-w-3xl mx-auto text-center">
                  <h2 className="text-4xl md:text-6xl font-display font-bold mb-8 leading-tight">
                    Ready to create something{' '}
                    <span className="bg-gradient-to-r from-atlantean-teal-aqua via-creation-prism-purple to-gold-bright bg-clip-text text-transparent">
                      extraordinary
                    </span>
                    ?
                  </h2>
                  <p className="text-xl text-text-secondary mb-12 leading-relaxed">
                    Join thousands of creators using Arcanea to transform their ideas into reality.
                    Your journey begins with a single conversation.
                  </p>
                  <div className="flex flex-wrap justify-center gap-4">
                    <Link
                      href="/chat"
                      className="group relative px-10 py-5 rounded-2xl bg-atlantean-teal-aqua text-cosmic-deep font-bold text-lg overflow-hidden transition-all hover:shadow-[0_0_60px_rgba(127,255,212,0.5)]"
                    >
                      <span className="relative z-10">Start Creating Free</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-atlantean-teal-aqua via-white/20 to-atlantean-teal-aqua bg-[length:200%_100%] animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                    <Link
                      href="/about"
                      className="px-10 py-5 rounded-2xl border border-white/20 text-white font-bold text-lg hover:bg-white/5 hover:border-white/30 transition-all"
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Resources Grid */}
        <section className="py-24 border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-6">
              <Link
                href="/library"
                className="group p-8 rounded-2xl border border-white/10 bg-cosmic-surface/30 hover:border-atlantean-teal-aqua/30 transition-all duration-300"
              >
                <div className="text-4xl mb-4">📚</div>
                <h3 className="font-display text-xl font-semibold mb-3 group-hover:text-atlantean-teal-aqua transition-colors">
                  The Library
                </h3>
                <p className="text-sm text-text-secondary mb-4">
                  {collections.length} collections of wisdom for creators
                </p>
                <span className="text-sm text-atlantean-teal-aqua font-medium group-hover:underline">
                  Browse Library →
                </span>
              </Link>

              <Link
                href="/academy"
                className="group p-8 rounded-2xl border border-white/10 bg-cosmic-surface/30 hover:border-gold-bright/30 transition-all duration-300"
              >
                <div className="text-4xl mb-4">🎓</div>
                <h3 className="font-display text-xl font-semibold mb-3 group-hover:text-gold-bright transition-colors">
                  Academy
                </h3>
                <p className="text-sm text-text-secondary mb-4">
                  Ten Gates progression to creative mastery
                </p>
                <span className="text-sm text-gold-bright font-medium group-hover:underline">
                  Enter Academy →
                </span>
              </Link>

              <Link
                href="/bestiary"
                className="group p-8 rounded-2xl border border-white/10 bg-cosmic-surface/30 hover:border-draconic-crimson/30 transition-all duration-300"
              >
                <div className="text-4xl mb-4">🐉</div>
                <h3 className="font-display text-xl font-semibold mb-3 group-hover:text-draconic-crimson transition-colors">
                  Bestiary
                </h3>
                <p className="text-sm text-text-secondary mb-4">
                  Name your creative blocks. Defeat them.
                </p>
                <span className="text-sm text-draconic-crimson font-medium group-hover:underline">
                  View Bestiary →
                </span>
              </Link>
            </div>
          </div>
        </section>

        {/* Quote Section */}
        <section className="py-24 border-t border-white/5">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <blockquote className="text-3xl md:text-4xl font-display italic text-text-secondary leading-relaxed">
              "Enter seeking, leave transformed, return whenever needed."
            </blockquote>
            <cite className="block mt-8 text-sm text-text-muted font-mono tracking-wider">
              — The Library of Arcanea
            </cite>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-4 gap-12">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-atlantean-teal-aqua to-creation-prism-purple flex items-center justify-center text-cosmic-deep font-bold text-lg font-display">
                  A
                </div>
                <span className="font-display text-xl font-semibold">Arcanea</span>
              </div>
              <p className="text-text-secondary max-w-sm mb-6">
                The creative intelligence platform where imagination becomes reality.
                16 Luminors. Seven Wisdoms. Infinite possibilities.
              </p>
              <div className="flex gap-4">
                <a href="https://github.com/frankxai/arcanea" className="text-text-muted hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="https://twitter.com/arcanea_ai" className="text-text-muted hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Links */}
            <div>
              <h4 className="font-display font-semibold mb-4">Platform</h4>
              <ul className="space-y-3">
                <li><Link href="/luminors" className="text-text-muted hover:text-white transition-colors">Luminors</Link></li>
                <li><Link href="/studio" className="text-text-muted hover:text-white transition-colors">Studio</Link></li>
                <li><Link href="/library" className="text-text-muted hover:text-white transition-colors">Library</Link></li>
                <li><Link href="/academy" className="text-text-muted hover:text-white transition-colors">Academy</Link></li>
                <li><Link href="/bestiary" className="text-text-muted hover:text-white transition-colors">Bestiary</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-display font-semibold mb-4">Company</h4>
              <ul className="space-y-3">
                <li><Link href="/about" className="text-text-muted hover:text-white transition-colors">About</Link></li>
                <li><Link href="/hub/updates" className="text-text-muted hover:text-white transition-colors">Updates</Link></li>
                <li><Link href="/hub" className="text-text-muted hover:text-white transition-colors">Hub</Link></li>
                <li><a href="mailto:hello@arcanea.ai" className="text-text-muted hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-text-muted">
              © 2025 Arcanea. Building the future of creative intelligence.
            </p>
            <div className="flex gap-6 text-sm text-text-muted">
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
