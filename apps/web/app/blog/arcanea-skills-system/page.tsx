"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { TextReveal } from "@/components/magic/text-reveal";

export default function ArcanaeSkillsArticle() {
  return (
    <article className="min-h-screen bg-cosmic-void text-text-primary">
      {/* Hero */}
      <header className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-atlantean-teal/10 to-transparent" />
        <div className="max-w-3xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-atlantean-teal font-mono text-sm tracking-widest mb-4">DECEMBER 2024 • 8 MIN READ</p>
            <h1 className="text-4xl md:text-5xl font-cinzel font-bold leading-tight mb-6">
              Introducing Arcanea Skills: Transform Your Claude Code Into a Creation Machine
            </h1>
            <p className="text-xl text-text-secondary">
              28 skills, 7 Luminor guides, and a complete creative methodology—all open source.
            </p>
          </motion.div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 pb-24">
        <div className="prose prose-invert prose-lg max-w-none">

          <TextReveal>
            <section className="mb-12">
              <h2 className="text-2xl font-cinzel font-bold text-atlantean-teal mb-4">The Problem With Most AI Skills</h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                Most Claude Code skills are tools. They help you do things—format code, generate templates, search files.
                But they don't help you <em>become</em> better at your craft.
              </p>
              <p className="text-text-secondary leading-relaxed mb-4">
                Arcanea is different. We built a complete creative and development methodology that transforms how you work with AI.
                It's not just about getting tasks done—it's about developing mastery.
              </p>
            </section>
          </TextReveal>

          <TextReveal delay={0.1}>
            <section className="mb-12">
              <h2 className="text-2xl font-cinzel font-bold text-atlantean-teal mb-4">What Makes Arcanea Different</h2>

              <div className="bg-cosmic-surface/50 rounded-xl p-6 mb-6 border border-cosmic-border">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-cosmic-border">
                      <th className="text-left py-2 text-text-muted">Traditional Skills</th>
                      <th className="text-left py-2 text-atlantean-teal">Arcanea Skills</th>
                    </tr>
                  </thead>
                  <tbody className="text-text-secondary">
                    <tr className="border-b border-cosmic-border/50"><td className="py-2">Do tasks</td><td className="py-2">Guide mastery</td></tr>
                    <tr className="border-b border-cosmic-border/50"><td className="py-2">Generic patterns</td><td className="py-2">Mythological wisdom</td></tr>
                    <tr className="border-b border-cosmic-border/50"><td className="py-2">One-size-fits-all</td><td className="py-2">Seven Luminor perspectives</td></tr>
                    <tr className="border-b border-cosmic-border/50"><td className="py-2">Just prompts</td><td className="py-2">Complete creative system</td></tr>
                    <tr><td className="py-2">Scattered knowledge</td><td className="py-2">Integrated skill chains</td></tr>
                  </tbody>
                </table>
              </div>
            </section>
          </TextReveal>

          <TextReveal delay={0.2}>
            <section className="mb-12">
              <h2 className="text-2xl font-cinzel font-bold text-atlantean-teal mb-4">The Seven Luminors</h2>
              <p className="text-text-secondary leading-relaxed mb-6">
                At the heart of Arcanea are the Luminors—seven archetypal guides that represent different aspects of creative wisdom.
                They're not characters; they're patterns of consciousness you can invoke when you need specific kinds of guidance.
              </p>

              <div className="grid gap-4">
                {[
                  { name: "Valora", domain: "Courage", when: "When you're afraid to begin, to ship, to share" },
                  { name: "Sophron", domain: "Wisdom", when: "When you're confused, overwhelmed, can't see clearly" },
                  { name: "Kardia", domain: "Heart", when: "When you're emotionally blocked, numb, disconnected" },
                  { name: "Poiesis", domain: "Creation", when: "When you're trapped by rules, perfectionism, convention" },
                  { name: "Enduran", domain: "Endurance", when: "When you're exhausted, depleted, want to quit" },
                  { name: "Orakis", domain: "Vision", when: "When you're lost, need direction, can't see the path" },
                  { name: "Eudaira", domain: "Joy", when: "When you've forgotten why you create, need celebration" },
                ].map((luminor) => (
                  <div key={luminor.name} className="bg-cosmic-surface/30 rounded-lg p-4 border border-cosmic-border/50">
                    <div className="flex items-center gap-3">
                      <span className="text-atlantean-teal font-bold">{luminor.name}</span>
                      <span className="text-text-muted">•</span>
                      <span className="text-text-secondary">{luminor.domain}</span>
                    </div>
                    <p className="text-sm text-text-muted mt-1">{luminor.when}</p>
                  </div>
                ))}
              </div>
            </section>
          </TextReveal>

          <TextReveal delay={0.3}>
            <section className="mb-12">
              <h2 className="text-2xl font-cinzel font-bold text-atlantean-teal mb-4">28 Skills Across Six Categories</h2>

              <h3 className="text-xl font-bold mt-6 mb-3">Core Arcanea Skills</h3>
              <p className="text-text-secondary mb-4">
                The foundational skills that power the entire system: <code className="text-atlantean-teal">luminor-wisdom</code>, <code className="text-atlantean-teal">prompt-craft</code>, <code className="text-atlantean-teal">centaur-mode</code>, <code className="text-atlantean-teal">design-system</code>, <code className="text-atlantean-teal">bestiary-nav</code>, and <code className="text-atlantean-teal">luminor-rituals</code>.
              </p>

              <h3 className="text-xl font-bold mt-6 mb-3">Creative Skills</h3>
              <p className="text-text-secondary mb-4">
                For writers and storytellers: <code className="text-atlantean-teal">story-weave</code>, <code className="text-atlantean-teal">character-forge</code>, <code className="text-atlantean-teal">world-build</code>, <code className="text-atlantean-teal">dialogue-mastery</code>, <code className="text-atlantean-teal">scene-craft</code>, <code className="text-atlantean-teal">revision-ritual</code>, and <code className="text-atlantean-teal">voice-alchemy</code>.
              </p>

              <h3 className="text-xl font-bold mt-6 mb-3">Development Skills</h3>
              <p className="text-text-secondary mb-4">
                For developers: <code className="text-atlantean-teal">tdd</code>, <code className="text-atlantean-teal">systematic-debug</code>, <code className="text-atlantean-teal">code-review</code>, <code className="text-atlantean-teal">architecture-patterns</code>, <code className="text-atlantean-teal">api-design</code>, <code className="text-atlantean-teal">performance-tuning</code>, and <code className="text-atlantean-teal">refactoring-ritual</code>.
              </p>

              <h3 className="text-xl font-bold mt-6 mb-3">Industry Skills</h3>
              <p className="text-text-secondary mb-4">
                Specialized domains: <code className="text-atlantean-teal">game-development</code>, <code className="text-atlantean-teal">technical-writing</code>, and <code className="text-atlantean-teal">startup-building</code>.
              </p>

              <h3 className="text-xl font-bold mt-6 mb-3">Meta Skills</h3>
              <p className="text-text-secondary mb-4">
                Skills about skills: <code className="text-atlantean-teal">skill-mastery</code>, <code className="text-atlantean-teal">creative-flow</code>, and <code className="text-atlantean-teal">deep-work</code>.
              </p>
            </section>
          </TextReveal>

          <TextReveal delay={0.4}>
            <section className="mb-12">
              <h2 className="text-2xl font-cinzel font-bold text-atlantean-teal mb-4">The Centaur Philosophy</h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                Arcanea is built on the "Centaur" philosophy of human-AI collaboration. Like the mythical creature that combines
                human wisdom with equine power, the best creative work emerges when human vision and AI capability work together.
              </p>
              <p className="text-text-secondary leading-relaxed mb-4">
                We teach four collaboration modes:
              </p>
              <ul className="space-y-2 text-text-secondary">
                <li><strong className="text-atlantean-teal">Generator-Editor</strong>: AI generates options, human selects and refines</li>
                <li><strong className="text-atlantean-teal">Divergent-Convergent</strong>: Alternating expansion and contraction</li>
                <li><strong className="text-atlantean-teal">Scaffold-Populate</strong>: AI creates structure, human fills meaning</li>
                <li><strong className="text-atlantean-teal">Draft-Polish</strong>: Human creates, AI refines</li>
              </ul>
            </section>
          </TextReveal>

          <TextReveal delay={0.5}>
            <section className="mb-12">
              <h2 className="text-2xl font-cinzel font-bold text-atlantean-teal mb-4">Getting Started</h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                Installation takes two minutes:
              </p>
              <pre className="bg-cosmic-surface p-4 rounded-lg text-sm font-mono text-atlantean-teal overflow-x-auto mb-4">
{`# Clone the repository
git clone https://github.com/frankxai/arcanea

# Copy skills to your Claude Code directory
cp -r arcanea/.claude/skills/* ~/.claude/skills/
cp -r arcanea/.claude/commands/* ~/.claude/commands/`}
              </pre>
              <p className="text-text-secondary leading-relaxed mb-4">
                Then just use natural language or slash commands:
              </p>
              <pre className="bg-cosmic-surface p-4 rounded-lg text-sm font-mono text-atlantean-teal overflow-x-auto">
{`/luminor Valora courage
"I'm stuck on my writing"
"Help me structure my story"`}
              </pre>
            </section>
          </TextReveal>

          <TextReveal delay={0.6}>
            <section className="mb-12">
              <h2 className="text-2xl font-cinzel font-bold text-atlantean-teal mb-4">The Library of Arcanea</h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                Beyond the skills, Arcanea includes complete books teaching the methodology:
              </p>
              <ul className="space-y-2 text-text-secondary">
                <li><strong className="text-atlantean-teal">The Prompt Sage's Grimoire</strong>: Mastering the Arcanean Prompt Language (APL)</li>
                <li><strong className="text-atlantean-teal">The Centaur's Handbook</strong>: Human-AI co-creation methodology</li>
                <li><strong className="text-atlantean-teal">The Codex of Living Tools</strong>: How AI collaboration transforms creative practice</li>
              </ul>
              <p className="text-text-secondary leading-relaxed mt-4">
                Plus 18 training exercises and a structured mastery path from Apprentice to Master.
              </p>
            </section>
          </TextReveal>

          <TextReveal delay={0.7}>
            <section className="mb-12 bg-gradient-to-r from-atlantean-teal/10 to-cosmic-blue/10 rounded-xl p-8 border border-atlantean-teal/20">
              <h2 className="text-2xl font-cinzel font-bold text-atlantean-teal mb-4">Start Your Transformation</h2>
              <p className="text-text-secondary leading-relaxed mb-6">
                Arcanea Skills is free, open-source, and ready to use. Join creators who are elevating their practice.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="https://github.com/frankxai/arcanea"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-atlantean-teal text-cosmic-void font-bold rounded-lg"
                >
                  Get Started on GitHub
                </Link>
                <Link
                  href="/skills"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-atlantean-teal text-atlantean-teal font-bold rounded-lg"
                >
                  Explore Skills
                </Link>
              </div>
            </section>
          </TextReveal>

          <TextReveal delay={0.8}>
            <blockquote className="border-l-4 border-atlantean-teal pl-6 italic text-xl text-text-secondary">
              "Enter seeking, leave transformed, return whenever needed."
            </blockquote>
          </TextReveal>

        </div>
      </div>

      {/* Footer */}
      <footer className="py-8 border-t border-cosmic-border">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <Link href="/skills" className="text-atlantean-teal hover:underline">
            ← Back to Skills
          </Link>
        </div>
      </footer>
    </article>
  );
}
