import Link from "next/link";
import { Metadata } from "next";
import { BookOpen, GraduationCap, Palette } from "lucide-react";
import { getCollections, getAllTexts } from "@/lib/content";
import {
  HeroPremium,
  LogosSection,
  LuminorShowcasePremium,
  FeaturesPremium,
  IntelligenceOverlay,
  WisdomsSection,
  HowItWorks,
  SocialProof,
  TestimonialsV2,
  PricingPremium,
  FAQSection,
  CTASection,
} from "@/components/landing";

export const metadata: Metadata = {
  title: "Arcanea | Build Your Universe",
  description:
    "Living intelligence for music, mythology, characters, and agents. Ten Guardian intelligences that grow as you create. Build your universe with the creative civilization OS.",
  openGraph: {
    title: "Arcanea | Build Your Universe",
    description:
      "Living intelligence for music, mythology, characters, and agents. Ten Guardian intelligences that grow as you create.",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Arcanea | Build Your Universe",
    description:
      "Living intelligence for music, mythology, characters, and agents. Ten Guardian intelligences that grow as you create.",
  },
};

export default async function Page() {
  const collections = await getCollections();
  const allTexts = await getAllTexts();
  const totalWords = allTexts.reduce(
    (sum, t) => sum + (t.frontmatter.wordCount || 0),
    0,
  );

  return (
    <div className="relative min-h-screen">
      <main>
        {/* Hero Section - Premium */}
        <HeroPremium
          stats={{
            luminors: 16,
            wisdoms: 7,
            collections: collections.length,
            words: totalWords,
          }}
        />

        {/* Logos Section - Featured Publications */}
        <LogosSection />

        {/* Social Proof - Trust Badges & Testimonials */}
        <SocialProof />

        {/* Features Section - Premium */}
        <FeaturesPremium />

        {/* Intelligence Overlay - Brand Moat */}
        <IntelligenceOverlay />

        {/* Luminor Showcase */}
        <LuminorShowcasePremium />

        {/* Seven Wisdoms */}
        <WisdomsSection />

        {/* How It Works - Interactive Process */}
        <HowItWorks />

        {/* Testimonials Carousel */}
        <TestimonialsV2 />

        {/* Pricing Section */}
        <PricingPremium />

        {/* FAQ Section */}
        <FAQSection />

        {/* Resources Grid */}
        <section className="py-24 border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                Explore the Arcanea Universe
              </h2>
              <p className="text-text-secondary max-w-2xl mx-auto">
                Dive deeper into the world of creative wisdom and magical tools.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Link
                href="/library"
                className="group p-8 rounded-3xl glass border border-crystal/10 hover:border-crystal/30 hover-lift transition-all duration-smooth"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-crystal/20 to-crystal/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <BookOpen className="w-7 h-7 text-crystal" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-3 group-hover:text-crystal transition-colors">
                  The Library
                </h3>
                <p className="font-sans text-sm text-text-secondary mb-4">
                  {collections.length} collections of wisdom for creators.
                  Ancient knowledge meets modern practice.
                </p>
                <span className="font-sans text-sm text-crystal font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  Browse Library
                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </Link>

              <Link
                href="/academy"
                className="group p-8 rounded-3xl glass border border-brand-gold/10 hover:border-brand-gold/30 hover-lift transition-all duration-smooth"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-gold/20 to-brand-gold/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <GraduationCap className="w-7 h-7 text-brand-gold" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-3 group-hover:text-brand-gold transition-colors">
                  Academy
                </h3>
                <p className="font-sans text-sm text-text-secondary mb-4">
                  Ten Gates progression to creative mastery. Begin as
                  Apprentice, ascend to Luminor.
                </p>
                <span className="font-sans text-sm text-brand-gold font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  Enter Academy
                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </Link>

              <Link
                href="/studio"
                className="group p-8 rounded-3xl glass border border-brand-primary/10 hover:border-brand-primary/30 hover-lift transition-all duration-smooth"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-primary/20 to-brand-primary/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Palette className="w-7 h-7 text-brand-primary" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-3 group-hover:text-brand-primary transition-colors">
                  Creation Studio
                </h3>
                <p className="font-sans text-sm text-text-secondary mb-4">
                  Image, music, video, and story creation tools. Manifest your
                  vision with AI.
                </p>
                <span className="font-sans text-sm text-brand-primary font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  Open Studio
                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </Link>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <CTASection />

        {/* Quote Section */}
        <section className="py-24 border-t border-white/5">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <blockquote className="text-3xl md:text-4xl lg:text-5xl font-display italic text-text-secondary leading-relaxed">
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
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-crystal to-brand-primary flex items-center justify-center text-cosmic-deep font-bold text-lg font-display">
                  A
                </div>
                <span className="font-display text-xl font-semibold">
                  Arcanea
                </span>
              </div>
              <p className="text-text-secondary max-w-sm mb-6">
                The creative intelligence platform where imagination becomes
                reality. 16 Luminors. Seven Wisdoms. Infinite possibilities.
              </p>
              <div className="flex gap-4">
                <a
                  href="https://github.com/frankxai/arcanea"
                  className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-text-muted hover:text-white hover:bg-white/10 transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a
                  href="https://twitter.com/arcanea_ai"
                  className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-text-muted hover:text-white hover:bg-white/10 transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a
                  href="https://discord.gg/arcanea"
                  className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-text-muted hover:text-white hover:bg-white/10 transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Links */}
            <div>
              <h4 className="font-display font-semibold mb-4">Platform</h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/luminors"
                    className="text-text-muted hover:text-white transition-colors"
                  >
                    Luminors
                  </Link>
                </li>
                <li>
                  <Link
                    href="/studio"
                    className="text-text-muted hover:text-white transition-colors"
                  >
                    Studio
                  </Link>
                </li>
                <li>
                  <Link
                    href="/library"
                    className="text-text-muted hover:text-white transition-colors"
                  >
                    Library
                  </Link>
                </li>
                <li>
                  <Link
                    href="/academy"
                    className="text-text-muted hover:text-white transition-colors"
                  >
                    Academy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/bestiary"
                    className="text-text-muted hover:text-white transition-colors"
                  >
                    Bestiary
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-display font-semibold mb-4">Company</h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/about"
                    className="text-text-muted hover:text-white transition-colors"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/hub/updates"
                    className="text-text-muted hover:text-white transition-colors"
                  >
                    Updates
                  </Link>
                </li>
                <li>
                  <Link
                    href="/hub"
                    className="text-text-muted hover:text-white transition-colors"
                  >
                    Hub
                  </Link>
                </li>
                <li>
                  <a
                    href="mailto:hello@arcanea.ai"
                    className="text-text-muted hover:text-white transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-text-muted">
              © 2026 Arcanea. Building the future of creative intelligence.
            </p>
            <div className="flex gap-6 text-sm text-text-muted">
              <Link
                href="/privacy"
                className="hover:text-white transition-colors"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="hover:text-white transition-colors"
              >
                Terms
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
