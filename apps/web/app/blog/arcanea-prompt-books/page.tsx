"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const stagger = {
  animate: { transition: { staggerChildren: 0.1 } },
};

export default function PromptBooksArticle() {
  return (
    <article className="min-h-screen bg-cosmic-void text-text-primary">
      {/* Hero */}
      <header className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/10 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(127,255,212,0.06),transparent_70%)]" />
        <div className="max-w-3xl mx-auto px-6 relative z-10">
          <motion.div {...fadeUp}>
            <p className="text-crystal font-mono text-sm tracking-widest mb-4">
              FEBRUARY 2026 &bull; 12 MIN READ
            </p>
            <h1 className="text-4xl md:text-5xl font-display font-bold leading-tight mb-6">
              Introducing Arcanea Prompt Books: Your AI Prompts Deserve a Home
            </h1>
            <p className="text-xl text-text-secondary leading-relaxed">
              79 files. 11,579 lines. 10 phases built overnight. A complete cross-device
              prompt management system with context engineering, real-time sync,
              and the full power of the Ten Guardians.
            </p>
          </motion.div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 pb-24">
        <div className="prose prose-invert prose-lg max-w-none">

          {/* The Problem */}
          <Section title="The Problem Every AI User Has" delay={0.1}>
            <p className="text-text-secondary leading-relaxed mb-4">
              You have 47 prompts scattered across 12 apps. That perfect image generation prompt?
              Somewhere in a Discord DM. Your carefully crafted system prompt for code review?
              In a text file on your desktop. The chain prompt that produces your weekly newsletter?
              You recreate it from memory every single time.
            </p>
            <p className="text-text-secondary leading-relaxed mb-4">
              AI prompts are the new creative artifacts. They are code, poetry, and craft
              rolled into one. They deserve the same respect we give to source code:
              version control, organization, collaboration, and a proper home.
            </p>
            <p className="text-text-secondary leading-relaxed">
              That is what Arcanea Prompt Books does.
            </p>
          </Section>

          {/* What It Is */}
          <Section title="What Prompt Books Is" delay={0.15}>
            <p className="text-text-secondary leading-relaxed mb-6">
              Prompt Books is a full-stack prompt management application built into the
              Arcanea platform. Think of it as the intersection of a code editor, a prompt
              library, and a context engineering workbench.
            </p>

            <FeatureGrid features={[
              {
                title: "Cross-Device Sync",
                desc: "Supabase Realtime channels keep your prompts synchronized across every device. Edit on desktop, capture on mobile, review on tablet.",
                icon: "cloud",
              },
              {
                title: "9 Prompt Types",
                desc: "General, Text-to-Image, Image-to-Image, Chat, Chain, Few-Shot, Code, Writing, and Analysis. Each type activates relevant tools.",
                icon: "grid",
              },
              {
                title: "Context Engineering",
                desc: "Model selector, temperature/topP sliders, few-shot examples, chain builders. Compile prompts into API-ready context packages.",
                icon: "cpu",
              },
              {
                title: "Weight Syntax",
                desc: "SD (text:1.1), NAI {text:1.05}, and Emphasis [text:0.9] syntax. Parse, format, apply, and strip weights with a visual modifier.",
                icon: "sliders",
              },
              {
                title: "Markdown First",
                desc: "Import and export prompts as .md files with YAML frontmatter. Your prompts are portable, version-controllable, and human-readable.",
                icon: "file",
              },
              {
                title: "Guardian Themes",
                desc: "Collections align with the Ten Guardians. Lyssandria's earth tones for foundational prompts. Draconia's fire for transformation. Your choice.",
                icon: "shield",
              },
            ]} />
          </Section>

          {/* Architecture */}
          <Section title="How It's Built" delay={0.2}>
            <p className="text-text-secondary leading-relaxed mb-4">
              The architecture follows three principles: type-safety everywhere,
              real-time by default, and platform-agnostic core logic.
            </p>

            <h3 className="text-xl font-display text-text-primary mt-8 mb-4">The Database Layer</h3>
            <p className="text-text-secondary leading-relaxed mb-4">
              Six PostgreSQL tables with Row Level Security, managed through a single
              Supabase migration. The schema includes automatic version tracking via
              a <code className="text-crystal bg-white/5 rounded px-1.5 py-0.5">pb_auto_version()</code> trigger
              that snapshots your prompt content before every update. Full-text search
              runs through a dedicated <code className="text-crystal bg-white/5 rounded px-1.5 py-0.5">pb_search_prompts()</code> RPC
              function with <code className="text-crystal bg-white/5 rounded px-1.5 py-0.5">ts_rank</code> scoring.
            </p>

            <CodeBlock code={`-- Tables
pb_collections    -- Folders with Guardian themes
pb_prompts        -- The prompts themselves
pb_tags           -- Injectable, weighted tokens
pb_prompt_tags    -- Many-to-many junction
pb_prompt_versions -- Auto-versioning on every save
pb_templates      -- Reusable prompt templates`} />

            <h3 className="text-xl font-display text-text-primary mt-8 mb-4">The Service Layer</h3>
            <p className="text-text-secondary leading-relaxed mb-4">
              29 async functions covering every CRUD operation. Collections, prompts,
              tags, versions, templates, search, import, and export. Every function
              takes a Supabase client as its first argument, making it testable and
              environment-agnostic.
            </p>

            <h3 className="text-xl font-display text-text-primary mt-8 mb-4">The State Layer</h3>
            <p className="text-text-secondary leading-relaxed mb-4">
              A Zustand store with <code className="text-crystal bg-white/5 rounded px-1.5 py-0.5">persist</code> middleware.
              Only UI preferences go to localStorage. Data lives in Supabase. Three
              Realtime channels (<code className="text-crystal bg-white/5 rounded px-1.5 py-0.5">pb_collections_sync</code>,{" "}
              <code className="text-crystal bg-white/5 rounded px-1.5 py-0.5">pb_prompts_sync</code>,{" "}
              <code className="text-crystal bg-white/5 rounded px-1.5 py-0.5">pb_tags_sync</code>) filtered
              by <code className="text-crystal bg-white/5 rounded px-1.5 py-0.5">user_id</code> dispatch
              INSERT/UPDATE/DELETE events directly to store actions.
            </p>

            <h3 className="text-xl font-display text-text-primary mt-8 mb-4">The Package</h3>
            <p className="text-text-secondary leading-relaxed mb-4">
              Platform-agnostic logic is extracted into{" "}
              <code className="text-crystal bg-white/5 rounded px-1.5 py-0.5">@arcanea/prompt-books</code> &mdash;
              types, constants, the context engine, markdown parser, and weight syntax
              utilities. This package can be used by the Chrome extension (Arcanea Vault),
              the CLI, or any future surface.
            </p>
          </Section>

          {/* UX Journey */}
          <Section title="The User Experience, Step by Step" delay={0.25}>
            <Journey steps={[
              {
                num: "01",
                title: "Land on /prompt-books",
                desc: "A glass sidebar on the left shows your collections, each with a Guardian-colored border. The main area shows your prompts in grid or list view. A floating action button glows in the bottom-right for quick capture.",
              },
              {
                num: "02",
                title: "Create a Collection",
                desc: "Click 'New Collection'. Name it, pick a Guardian to theme it (Lyria for image prompts, Draconia for transformation workflows). Set visibility to private, shared, or public. The Guardian's color flows through every prompt card in this collection.",
              },
              {
                num: "03",
                title: "Quick Capture a Prompt",
                desc: "Press Cmd+Shift+P from anywhere. A liquid-glass modal appears. Paste your prompt, pick a collection, hit Cmd+Enter. It's saved, synced, and searchable in under 2 seconds. The title auto-extracts from the first line.",
              },
              {
                num: "04",
                title: "Open the Editor",
                desc: "Click any prompt card. The full editor loads with a title bar, prompt type tabs (switch between General, Chat, Code, Image, etc.), and your content in a monospace textarea with a markdown toolbar. Bold, italic, code blocks, headings, lists — all with keyboard shortcuts.",
              },
              {
                num: "05",
                title: "Add Tags",
                desc: "Below the type tabs, a tag chip bar shows assigned tags. Click '+Tag' to open the tag selector — search existing tags, filter by category (Quality, Style, Negative, Model, Custom), or create new ones inline. Tags carry injectable text and optional weight modifiers.",
              },
              {
                num: "06",
                title: "Weight Syntax for Image Prompts",
                desc: "Switch to 'Text to Image' type. The weight modifier bar appears: pick SD, NAI, or Emphasis syntax, adjust the weight from 0.10 to 2.00, select text, click 'Wrap'. Your 'masterpiece' becomes '(masterpiece:1.2)'. The preview highlights weights in accent colors.",
              },
              {
                num: "07",
                title: "Split View Preview",
                desc: "Toggle the split view icon. The editor splits 50/50 — write on the left, see rendered markdown on the right. Weight syntax renders with color-coded strength. Template variables like {{subject}} glow in gold badges.",
              },
              {
                num: "08",
                title: "Context Engineering",
                desc: "Open the context panel. Select a model (Claude Opus 4.6, Gemini 2.5 Pro, GPT-4o). Adjust temperature, max tokens, top-p. Add few-shot examples as user/assistant pairs. For chain types, build multi-step pipelines with output variables passed between steps.",
              },
              {
                num: "09",
                title: "Search with Cmd+K",
                desc: "Press Cmd+K. A full-screen command palette appears with a search box. Results are grouped by collection, showing type icons, content previews, and tag counts. Arrow keys navigate, Enter opens, Escape closes. When empty, it shows your recent prompts.",
              },
              {
                num: "10",
                title: "Filter and Sort",
                desc: "The filter bar offers type dropdowns, a favorites toggle, tag multi-select, and sort options (newest, oldest, most used, A-Z, recently used). Active filters show as removable chips. Clear all with one click.",
              },
              {
                num: "11",
                title: "Version History",
                desc: "Click the history icon. A drawer slides in from the right showing every saved version with timestamps. Select a version to see a line-by-line diff against the current content. Green for added, red for removed. Click 'Restore' to roll back.",
              },
              {
                num: "12",
                title: "Templates",
                desc: "Open the template gallery. Browse starter, professional, creative, and technical templates. Each shows detected variables. Click 'Use' to open the instantiator — fill in each {{variable}}, see a live preview, pick a collection, and create your prompt.",
              },
              {
                num: "13",
                title: "Import and Export",
                desc: "Go to Settings > Import/Export. Drop .json, .md, or .txt files to import. The parser auto-detects YAML frontmatter in markdown files. Export individual collections or everything as structured JSON. Your prompts are never locked in.",
              },
              {
                num: "14",
                title: "PWA Share Target",
                desc: "Install Prompt Books as a PWA. Now when you share text from any app on your phone, 'Prompt Books' appears as a share target. The shared text flows directly into quick capture. Your prompts follow you everywhere.",
              },
            ]} />
          </Section>

          {/* Context Engineering Deep Dive */}
          <Section title="Context Engineering: The Real Power" delay={0.3}>
            <p className="text-text-secondary leading-relaxed mb-4">
              Most prompt tools let you save text. Prompt Books lets you engineer context.
            </p>
            <p className="text-text-secondary leading-relaxed mb-4">
              The context engine compiles your prompt, tags, system prompt, few-shot examples,
              and parameters into a{" "}
              <code className="text-crystal bg-white/5 rounded px-1.5 py-0.5">ContextPackage</code> &mdash;
              a structured object ready to send to any AI API:
            </p>

            <CodeBlock code={`interface ContextPackage {
  system: string | null;
  messages: Array<{
    role: 'system' | 'user' | 'assistant';
    content: string;
  }>;
  parameters: {
    model: string;
    temperature: number;
    maxTokens: number;
    topP?: number;
  };
  metadata: {
    promptId: string;
    promptType: string;
    compiledAt: string;
  };
}`} />

            <p className="text-text-secondary leading-relaxed mt-4 mb-4">
              Tags inject text at configurable positions (prepend, append, system) with weight
              modifiers. Chain prompts compile sequentially, passing output variables between steps.
              Template variables resolve at compile time. The result is a single, API-ready payload.
            </p>
          </Section>

          {/* The Ecosystem */}
          <Section title="Part of a Bigger Picture" delay={0.35}>
            <p className="text-text-secondary leading-relaxed mb-4">
              Prompt Books doesn't exist in isolation. It connects to the broader Arcanea ecosystem:
            </p>
            <ul className="space-y-3 text-text-secondary mb-6">
              <li className="flex gap-3">
                <span className="text-crystal font-bold shrink-0">Arcanea Vault</span>
                <span>Chrome extension that captures conversations, images, and prompts from Grok, ChatGPT, Claude, Gemini, DeepSeek, and Perplexity. Vault exports. Prompt Books imports. One pipeline.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-crystal font-bold shrink-0">@arcanea/prompt-books</span>
                <span>Shared package with types, constants, and engines. Used by the web app, the extension, and the CLI. Write once, run everywhere.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-crystal font-bold shrink-0">Ten Guardians</span>
                <span>Each collection can be themed by a Guardian. Lyssandria (Earth/Foundation), Leyla (Water/Flow), Draconia (Fire/Power) &mdash; the mythology enriches the organizational metaphor.</span>
              </li>
            </ul>
          </Section>

          {/* Technical Stats */}
          <Section title="By The Numbers" delay={0.4}>
            <StatsGrid stats={[
              { label: "Files", value: "79" },
              { label: "Lines of Code", value: "11,579" },
              { label: "Build Phases", value: "10" },
              { label: "Components", value: "40" },
              { label: "Service Functions", value: "29" },
              { label: "Prompt Types", value: "9" },
              { label: "Guardian Themes", value: "10" },
              { label: "Default Tags", value: "26" },
              { label: "Database Tables", value: "6" },
              { label: "Supabase Channels", value: "3" },
              { label: "Build Phases", value: "10" },
              { label: "TypeScript Errors", value: "0" },
            ]} />
          </Section>

          {/* What's Next */}
          <Section title="What Comes Next" delay={0.45}>
            <p className="text-text-secondary leading-relaxed mb-4">
              This is v1. The foundation is complete. Here is what follows:
            </p>
            <ul className="space-y-2 text-text-secondary">
              <li><strong className="text-text-primary">Vault Integration</strong> &mdash; Direct sync between the Chrome extension and Prompt Books</li>
              <li><strong className="text-text-primary">Studio Mode</strong> &mdash; Visual prompt composition with drag-and-drop blocks</li>
              <li><strong className="text-text-primary">Community Templates</strong> &mdash; Share and discover prompts from other creators</li>
              <li><strong className="text-text-primary">AI-Assisted Refinement</strong> &mdash; Let the Guardians help you improve your prompts</li>
              <li><strong className="text-text-primary">Analytics</strong> &mdash; Track which prompts produce the best results</li>
            </ul>
          </Section>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-16 pt-12 border-t border-white/10 text-center"
          >
            <p className="text-2xl font-display text-text-primary mb-4">
              Your prompts deserve better than a text file.
            </p>
            <p className="text-text-secondary mb-8">
              Arcanea Prompt Books is available now at{" "}
              <Link href="/prompt-books" className="text-crystal hover:underline">
                arcanea.ai/prompt-books
              </Link>
            </p>
            <Link
              href="/prompt-books"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl liquid-glass text-text-primary font-display hover:scale-[1.02] transition-transform"
            >
              Open Prompt Books
            </Link>
          </motion.div>

        </div>
      </div>
    </article>
  );
}

// ─── Reusable Components ─────────────────────────────────────────

function Section({
  title,
  delay = 0,
  children,
}: {
  title: string;
  delay?: number;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay }}
      className="mb-16"
    >
      <h2 className="text-2xl font-display font-bold text-crystal mb-6">{title}</h2>
      {children}
    </motion.section>
  );
}

function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="bg-white/[0.03] border border-white/5 rounded-xl p-4 overflow-x-auto my-6">
      <code className="text-sm font-mono text-text-secondary leading-relaxed">{code}</code>
    </pre>
  );
}

function FeatureGrid({ features }: { features: { title: string; desc: string; icon: string }[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose">
      {features.map((f) => (
        <div
          key={f.title}
          className="glass rounded-xl p-5 border border-white/5 hover:border-white/10 transition-colors"
        >
          <h4 className="text-sm font-display text-text-primary mb-2">{f.title}</h4>
          <p className="text-xs font-sans text-text-muted leading-relaxed">{f.desc}</p>
        </div>
      ))}
    </div>
  );
}

function Journey({ steps }: { steps: { num: string; title: string; desc: string }[] }) {
  return (
    <div className="space-y-6 not-prose">
      {steps.map((step) => (
        <motion.div
          key={step.num}
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4 }}
          className="flex gap-4"
        >
          <div className="shrink-0 w-10 h-10 rounded-xl glass flex items-center justify-center">
            <span className="text-xs font-mono text-crystal">{step.num}</span>
          </div>
          <div className="flex-1 pt-1">
            <h4 className="text-sm font-display text-text-primary mb-1">{step.title}</h4>
            <p className="text-xs font-sans text-text-muted leading-relaxed">{step.desc}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function StatsGrid({ stats }: { stats: { label: string; value: string }[] }) {
  return (
    <div className="grid grid-cols-3 md:grid-cols-4 gap-3 not-prose">
      {stats.map((s) => (
        <div key={s.label} className="glass-subtle rounded-xl p-4 text-center">
          <div className="text-xl font-mono font-bold text-crystal mb-1">{s.value}</div>
          <div className="text-[10px] font-sans text-text-muted uppercase tracking-wider">{s.label}</div>
        </div>
      ))}
    </div>
  );
}
