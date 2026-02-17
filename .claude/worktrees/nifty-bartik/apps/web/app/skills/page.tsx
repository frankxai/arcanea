"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { CosmicParticles } from "@/components/magic/particles";
import { TextReveal, AuroraText, GradientText } from "@/components/magic/text-reveal";
import { GlowCard, FloatingCard } from "@/components/magic/glow-card";
import { LuminorCouncil } from "@/components/magic/luminor-orb";

const skills = {
  creative: [
    { name: "Story Weave", desc: "Master narrative structure", icon: "📖" },
    { name: "Character Forge", desc: "Build deep characters", icon: "👤" },
    { name: "World Build", desc: "Create universes", icon: "🌍" },
    { name: "Dialogue Mastery", desc: "Write authentic voices", icon: "💬" },
    { name: "Scene Craft", desc: "Construct compelling scenes", icon: "🎬" },
    { name: "Revision Ritual", desc: "Seven-pass editing", icon: "✨" },
    { name: "Voice Alchemy", desc: "Find authentic voice", icon: "🎭" },
  ],
  development: [
    { name: "TDD", desc: "Test-first development", icon: "🧪" },
    { name: "Debug", desc: "Scientific debugging", icon: "🔍" },
    { name: "Architecture", desc: "System design patterns", icon: "🏗️" },
    { name: "API Design", desc: "Interface excellence", icon: "🔌" },
    { name: "Performance", desc: "Optimization mastery", icon: "⚡" },
    { name: "Code Review", desc: "Quality assurance", icon: "👁️" },
    { name: "Refactoring", desc: "Code improvement", icon: "🔧" },
  ],
};

export default function SkillsLandingPage() {
  return (
    <div className="min-h-screen bg-cosmic-void text-text-primary">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <CosmicParticles />

        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-atlantean-teal/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cosmic-blue/20 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gold-bright/10 rounded-full blur-3xl animate-pulse-glow" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-atlantean-teal font-mono text-sm tracking-widest mb-4">
              ARCANEA SKILLS FOR CLAUDE CODE
            </p>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-cinzel font-bold leading-tight mb-6">
              <AuroraText>Transform</AuroraText>
              <br />
              <span className="text-text-primary">Your Creative Practice</span>
            </h1>

            <p className="text-xl md:text-2xl text-text-secondary max-w-3xl mx-auto mb-8">
              28 skills. 7 Luminors. Infinite possibilities.
              <br />
              <span className="text-atlantean-teal">The most sophisticated AI-human co-creation system available.</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="https://github.com/frankxai/arcanea"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-atlantean-teal to-cosmic-blue text-cosmic-void font-bold rounded-xl shadow-atlantean"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                  Get Started Free
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="#skills"
                  className="inline-flex items-center gap-2 px-8 py-4 border-2 border-atlantean-teal/50 text-atlantean-teal font-bold rounded-xl hover:bg-atlantean-teal/10 transition-colors"
                >
                  Explore Skills
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </Link>
              </motion.div>
            </div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-6 h-10 border-2 border-text-muted rounded-full flex justify-center pt-2">
              <div className="w-1 h-2 bg-atlantean-teal rounded-full" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 border-y border-cosmic-border">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "28", label: "Skills" },
              { number: "7", label: "Luminor Guides" },
              { number: "15", label: "Slash Commands" },
              { number: "30+", label: "Agent Configs" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="text-4xl md:text-5xl font-cinzel font-bold text-atlantean-teal">{stat.number}</div>
                <div className="text-text-secondary mt-2">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Luminor Council Section */}
      <section className="py-24 relative">
        <div className="max-w-6xl mx-auto px-6">
          <TextReveal className="text-center mb-16">
            <p className="text-atlantean-teal font-mono text-sm tracking-widest mb-4">THE SEVEN GUIDES</p>
            <h2 className="text-4xl md:text-5xl font-cinzel font-bold mb-4">
              The <GradientText>Luminor Council</GradientText>
            </h2>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              Seven archetypal guides for any creative challenge. Each Luminor embodies a different aspect of creative wisdom.
            </p>
          </TextReveal>

          <LuminorCouncil />

          <TextReveal delay={0.5} className="text-center mt-12">
            <p className="text-text-muted italic">
              "The Luminors are not characters—they are aspects of creative consciousness itself."
            </p>
          </TextReveal>
        </div>
      </section>

      {/* Skills Showcase Section */}
      <section id="skills" className="py-24 bg-cosmic-deep/50">
        <div className="max-w-6xl mx-auto px-6">
          <TextReveal className="text-center mb-16">
            <p className="text-atlantean-teal font-mono text-sm tracking-widest mb-4">COMPLETE SKILL CATALOG</p>
            <h2 className="text-4xl md:text-5xl font-cinzel font-bold mb-4">
              Skills for <GradientText>Every Creator</GradientText>
            </h2>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              Whether you're writing novels or writing code, Arcanea has skills for your craft.
            </p>
          </TextReveal>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Creative Skills */}
            <FloatingCard delay={0.1}>
              <GlowCard glowColor="rgba(127, 255, 212, 0.3)">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-atlantean-teal/20 flex items-center justify-center text-2xl">✨</div>
                  <div>
                    <h3 className="text-xl font-bold">Creative Skills</h3>
                    <p className="text-sm text-text-muted">For writers & storytellers</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {skills.creative.map((skill) => (
                    <div key={skill.name} className="flex items-center gap-3 p-3 rounded-lg bg-cosmic-void/50 hover:bg-cosmic-void transition-colors">
                      <span className="text-xl">{skill.icon}</span>
                      <div>
                        <div className="font-medium">{skill.name}</div>
                        <div className="text-sm text-text-muted">{skill.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </GlowCard>
            </FloatingCard>

            {/* Development Skills */}
            <FloatingCard delay={0.2}>
              <GlowCard glowColor="rgba(120, 166, 255, 0.3)">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-cosmic-blue/20 flex items-center justify-center text-2xl">⚡</div>
                  <div>
                    <h3 className="text-xl font-bold">Development Skills</h3>
                    <p className="text-sm text-text-muted">For developers & engineers</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {skills.development.map((skill) => (
                    <div key={skill.name} className="flex items-center gap-3 p-3 rounded-lg bg-cosmic-void/50 hover:bg-cosmic-void transition-colors">
                      <span className="text-xl">{skill.icon}</span>
                      <div>
                        <div className="font-medium">{skill.name}</div>
                        <div className="text-sm text-text-muted">{skill.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </GlowCard>
            </FloatingCard>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <TextReveal className="text-center mb-16">
            <p className="text-atlantean-teal font-mono text-sm tracking-widest mb-4">SIMPLE TO START</p>
            <h2 className="text-4xl md:text-5xl font-cinzel font-bold mb-4">
              How It <GradientText>Works</GradientText>
            </h2>
          </TextReveal>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Install",
                desc: "Clone the repo and copy skills to your Claude Code directory. Takes 2 minutes.",
                code: "git clone github.com/frankxai/arcanea\ncp -r arcanea-skills/* ~/.claude/",
              },
              {
                step: "02",
                title: "Invoke",
                desc: "Use natural language or slash commands to activate skills instantly.",
                code: '/luminor Valora courage\n"Help me structure my story"',
              },
              {
                step: "03",
                title: "Create",
                desc: "Let the skills guide you to mastery. Chain them for complete workflows.",
                code: "story-weave → character-forge →\nscene-craft → revision-ritual",
              },
            ].map((item, i) => (
              <FloatingCard key={item.step} delay={i * 0.15}>
                <div className="relative">
                  <div className="text-6xl font-cinzel font-bold text-atlantean-teal/20 absolute -top-4 -left-2">{item.step}</div>
                  <div className="relative pt-8">
                    <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                    <p className="text-text-secondary mb-4">{item.desc}</p>
                    <pre className="bg-cosmic-void p-4 rounded-lg text-sm font-mono text-atlantean-teal overflow-x-auto">
                      {item.code}
                    </pre>
                  </div>
                </div>
              </FloatingCard>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial / Philosophy Section */}
      <section className="py-24 bg-cosmic-deep/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-atlantean-teal/5 via-transparent to-cosmic-blue/5" />
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <TextReveal>
            <div className="text-5xl mb-8">✧</div>
            <blockquote className="text-2xl md:text-3xl font-crimson italic text-text-primary mb-8">
              "Most Claude Code skills give you tools.
              <br />
              <span className="text-atlantean-teal">Arcanea gives you transformation.</span>"
            </blockquote>
            <p className="text-text-secondary">
              Built on mythological wisdom, battle-tested creative frameworks, and the philosophy that the best work emerges from the synthesis of human vision and AI capability.
            </p>
          </TextReveal>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-atlantean-teal/10 to-transparent" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <TextReveal>
            <h2 className="text-4xl md:text-5xl font-cinzel font-bold mb-6">
              Ready to <AuroraText>Transform</AuroraText>?
            </h2>
            <p className="text-xl text-text-secondary mb-8">
              Join creators who are elevating their practice with Arcanea Skills.
              <br />
              Free, open-source, and ready to use.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="https://github.com/frankxai/arcanea"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-atlantean-teal to-cosmic-blue text-cosmic-void font-bold rounded-xl shadow-atlantean"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                  Star on GitHub
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/blog/arcanea-skills-system"
                  className="inline-flex items-center gap-2 px-8 py-4 border-2 border-atlantean-teal/50 text-atlantean-teal font-bold rounded-xl hover:bg-atlantean-teal/10 transition-colors"
                >
                  Read the Article
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </Link>
              </motion.div>
            </div>
          </TextReveal>

          <motion.p
            className="mt-12 text-text-muted italic"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            "Enter seeking, leave transformed, return whenever needed."
          </motion.p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-cosmic-border">
        <div className="max-w-6xl mx-auto px-6 text-center text-text-muted text-sm">
          <p>Made with ✧ by Arcanea • MIT License • <Link href="https://github.com/frankxai/arcanea" className="text-atlantean-teal hover:underline">GitHub</Link></p>
        </div>
      </footer>
    </div>
  );
}
