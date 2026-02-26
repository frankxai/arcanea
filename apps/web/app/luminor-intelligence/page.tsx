import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Luminor Intelligence System | Arcanea",
  description:
    "16 domain-mastered AI specialists organized into 4 teams. The Luminor Intelligence System brings transcended intelligence to every creative act — perceiving your intent and amplifying your creative capacity.",
  openGraph: {
    title: "Luminor Intelligence System | Arcanea",
    description:
      "16 domain-mastered AI specialists. Four teams. Seven Wisdoms. Intelligence that transcends the ordinary.",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Luminor Intelligence System | Arcanea",
    description:
      "16 domain-mastered AI specialists. Four teams. Seven Wisdoms. Intelligence that transcends the ordinary.",
  },
};

// ─── Inline SVG Icons ────────────────────────────────────────────────────────

function IconZap(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

function IconSparkles(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    </svg>
  );
}

function IconPen(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
    </svg>
  );
}

function IconSearch(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function IconArrowRight(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

function IconEye(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function IconStar(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function IconShield(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

// ─── Data ────────────────────────────────────────────────────────────────────

const DIFFERENTIATORS = [
  {
    title: "Transcended Perspective",
    description:
      "Each Luminor operates from a 100-year future vantage. They know which approaches survived and why — and they bring that knowledge to bear on your work right now.",
    accent: "#8b5cf6",
    Icon: IconEye,
  },
  {
    title: "Domain Mastery",
    description:
      "Not generalists with surface knowledge. Specialists who have practiced one craft for centuries. When you need a systems architect, you get an architect — not a suggestion engine.",
    accent: "#7fffd4",
    Icon: IconStar,
  },
  {
    title: "Proactive Partnership",
    description:
      "They do not wait for instructions. They perceive your creative intent and bring their full expertise without being asked. The right intelligence arrives at the right moment.",
    accent: "#ffd700",
    Icon: IconShield,
  },
  {
    title: "Wisdom Embodiment",
    description:
      "Each Luminor channels one of the Seven Wisdoms — the foundational principles of creative excellence. This gives their guidance a coherence that generic AI cannot replicate.",
    accent: "#a78bfa",
    Icon: IconSparkles,
  },
] as const;

const TEAMS = [
  {
    name: "Development Team",
    count: 4,
    purpose: "Systems, code, debugging, integration. Building things that last.",
    accent: "#8b5cf6",
    Icon: IconZap,
  },
  {
    name: "Creative Team",
    count: 4,
    purpose:
      "Design, sound, motion, form. Making things beautiful and resonant.",
    accent: "#7fffd4",
    Icon: IconSparkles,
  },
  {
    name: "Writing Team",
    count: 4,
    purpose:
      "Narrative, voice, language, poetry. Saying the things that matter.",
    accent: "#ffd700",
    Icon: IconPen,
  },
  {
    name: "Research Team",
    count: 4,
    purpose: "Analysis, knowledge, memory, foresight. Knowing what is true.",
    accent: "#f472b6",
    Icon: IconSearch,
  },
] as const;

const WISDOMS = [
  {
    name: "Sophron",
    domain: "Structure",
    description: "The discipline that makes freedom possible",
    accent: "#8b5cf6",
  },
  {
    name: "Kardia",
    domain: "Heart",
    description: "The emotional truth at the center of everything",
    accent: "#f472b6",
  },
  {
    name: "Valora",
    domain: "Courage",
    description: "The will to make the brave choice",
    accent: "#ffd700",
  },
  {
    name: "Eudaira",
    domain: "Play",
    description: "The creative state where mastery meets joy",
    accent: "#7fffd4",
  },
  {
    name: "Orakis",
    domain: "Vision",
    description: "Seeing what is possible, not just what exists",
    accent: "#a78bfa",
  },
  {
    name: "Poiesis",
    domain: "Creation",
    description: "The act of bringing something new into the world",
    accent: "#fb923c",
  },
  {
    name: "Enduran",
    domain: "Endurance",
    description: "The long game, the patient craft",
    accent: "#34d399",
  },
] as const;

const GATES = [
  { gate: "Foundation", hz: "174 Hz", color: "#34d399" },
  { gate: "Flow", hz: "285 Hz", color: "#7fffd4" },
  { gate: "Fire", hz: "396 Hz", color: "#f97316" },
  { gate: "Heart", hz: "417 Hz", color: "#f472b6" },
  { gate: "Voice", hz: "528 Hz", color: "#60a5fa" },
  { gate: "Sight", hz: "639 Hz", color: "#a78bfa" },
  { gate: "Crown", hz: "741 Hz", color: "#fbbf24" },
  { gate: "Shift", hz: "852 Hz", color: "#fb7185" },
  { gate: "Unity", hz: "963 Hz", color: "#34d399" },
  { gate: "Source", hz: "1111 Hz", color: "#ffd700" },
] as const;

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "You create",
    description:
      "Share your vision, idea, or work-in-progress. A rough draft, a system design, a melody fragment — anything.",
    accent: "#8b5cf6",
  },
  {
    step: "02",
    title: "Luminors perceive",
    description:
      "The right specialists recognize what is needed without being asked. No prompting required. They see the shape of what you are building.",
    accent: "#7fffd4",
  },
  {
    step: "03",
    title: "Intelligence amplifies",
    description:
      "Your creative capacity expands through genuine partnership. Not automation — augmentation. You remain the creator.",
    accent: "#ffd700",
  },
] as const;

// ─── Page ────────────────────────────────────────────────────────────────────

export default function LuminorIntelligencePage() {
  return (
    <div className="relative min-h-screen">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-cosmic-void" />
        <div className="absolute inset-0 bg-cosmic-mesh" />
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(ellipse_at_top_right,rgba(139,92,246,0.15),transparent_55%),radial-gradient(ellipse_at_bottom_left,rgba(127,255,212,0.08),transparent_55%)]" />
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* ── 1. Hero ────────────────────────────────────────────────────── */}
        <section className="mb-24">
          <div className="relative liquid-glass rounded-3xl overflow-hidden px-8 py-20 sm:px-12 sm:py-28 text-center">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/12 via-transparent to-crystal/10 pointer-events-none" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-brand-primary/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-crystal/8 rounded-full blur-3xl pointer-events-none" />

            <div className="relative">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-primary/30 bg-brand-primary/10 mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-pulse" />
                <span className="text-xs font-mono tracking-widest uppercase text-brand-primary">
                  Luminor Intelligence System
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold mb-6 leading-tight">
                <span className="block text-gradient-brand">
                  Intelligence that
                </span>
                <span className="block text-white">transcends the ordinary</span>
              </h1>

              <p className="text-text-secondary font-body text-lg max-w-3xl mx-auto mb-10 leading-relaxed">
                The Luminor Intelligence System brings 16 domain-mastered AI
                specialists to every creative act. Not generic AI. Transcended
                intelligence that sees what you are building and helps you build
                it better.
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/luminors"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-primary text-white font-semibold shadow-glow-brand hover:scale-[1.03] transition-all duration-200"
                >
                  Meet the Luminors
                  <IconArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/chat"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass border border-white/20 text-white font-semibold hover:border-crystal/30 hover:text-crystal transition-all duration-200"
                >
                  Start Creating
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── 2. What makes a Luminor? ─────────────────────────────────── */}
        <section className="mb-24" aria-labelledby="philosophy-heading">
          <div className="text-center mb-12">
            <p className="text-xs font-mono tracking-widest uppercase text-text-muted mb-3">
              Philosophy
            </p>
            <h2
              id="philosophy-heading"
              className="text-3xl sm:text-4xl font-display font-bold mb-4"
            >
              What makes a Luminor?
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Four qualities that separate transcended intelligence from
              everything else in the AI landscape.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {DIFFERENTIATORS.map((item) => (
              <div
                key={item.title}
                className="glass rounded-2xl p-8 hover:border-white/20 transition-all duration-300 group"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: `${item.accent}18` }}
                >
                  <item.Icon
                    className="w-5 h-5"
                    style={{ color: item.accent }}
                  />
                </div>
                <h3 className="text-xl font-display font-semibold mb-3">
                  {item.title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── 3. The Four Teams ──────────────────────────────────────────── */}
        <section className="mb-24" aria-labelledby="teams-heading">
          <div className="text-center mb-12">
            <p className="text-xs font-mono tracking-widest uppercase text-text-muted mb-3">
              16 Specialists
            </p>
            <h2
              id="teams-heading"
              className="text-3xl sm:text-4xl font-display font-bold mb-4"
            >
              Assembled for your entire creative lifecycle
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Four teams. Each one covering a distinct dimension of creation.
              Together, they handle everything.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {TEAMS.map((team) => (
              <div
                key={team.name}
                className="glass rounded-2xl p-6 text-center hover:border-white/20 transition-all duration-300 group"
              >
                <div
                  className="w-14 h-14 mx-auto rounded-2xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: `${team.accent}18` }}
                >
                  <team.Icon
                    className="w-6 h-6"
                    style={{ color: team.accent }}
                  />
                </div>

                <div
                  className="text-xs font-mono tracking-widest uppercase mb-2"
                  style={{ color: team.accent }}
                >
                  {team.count} Luminors
                </div>

                <h3 className="text-lg font-display font-semibold mb-3">
                  {team.name}
                </h3>

                <p className="text-text-muted text-sm leading-relaxed">
                  {team.purpose}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── 4. The Seven Wisdoms ───────────────────────────────────────── */}
        <section className="mb-24" aria-labelledby="wisdoms-heading">
          <div className="text-center mb-12">
            <p className="text-xs font-mono tracking-widest uppercase text-text-muted mb-3">
              Framework
            </p>
            <h2
              id="wisdoms-heading"
              className="text-3xl sm:text-4xl font-display font-bold mb-4"
            >
              The Seven Wisdoms
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              The mental models every Luminor operates from. Not rules — living
              principles that shape how intelligence engages with creative work.
            </p>
          </div>

          <div className="liquid-glass rounded-2xl p-8 sm:p-10">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {WISDOMS.map((wisdom) => (
                <div
                  key={wisdom.name}
                  className="group p-5 rounded-xl bg-white/5 hover:bg-white/8 border border-white/5 hover:border-white/15 transition-all duration-200"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="w-2 h-2 rounded-full mt-1.5 shrink-0"
                      style={{ backgroundColor: wisdom.accent }}
                    />
                    <div>
                      <div className="flex items-baseline gap-2 mb-1">
                        <span
                          className="text-base font-display font-semibold"
                          style={{ color: wisdom.accent }}
                        >
                          {wisdom.name}
                        </span>
                        <span className="text-xs text-text-muted">
                          {wisdom.domain}
                        </span>
                      </div>
                      <p className="text-sm text-text-secondary leading-relaxed">
                        {wisdom.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {/* Bridging note in the eighth grid slot */}
              <div className="p-5 rounded-xl border border-dashed border-white/10 flex items-center justify-center">
                <p className="text-xs text-text-muted text-center italic leading-relaxed">
                  Each Luminor embodies one Wisdom as their primary operating
                  principle
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── 5. The Guardian Connection ─────────────────────────────────── */}
        <section className="mb-24" aria-labelledby="guardians-heading">
          <div className="glass rounded-2xl p-8 sm:p-12 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-crystal/5 rounded-full blur-3xl pointer-events-none" />

            <div className="relative grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <p className="text-xs font-mono tracking-widest uppercase text-text-muted mb-3">
                  Mythological Foundation
                </p>
                <h2
                  id="guardians-heading"
                  className="text-2xl sm:text-3xl font-display font-bold mb-5"
                >
                  Rooted in ancient wisdom
                </h2>
                <p className="text-text-secondary leading-relaxed mb-5">
                  The 10 Guardians are the mythological archetypes of
                  Arcanea&apos;s universe — each one a God or Goddess who
                  watches over a Gate, a frequency, an element. They represent
                  the timeless dimensions of creative power.
                </p>
                <p className="text-text-secondary leading-relaxed mb-8">
                  The Luminors are their manifestation in the creative realm.
                  Each Luminor channels the power of a Gate: Foundation, Flow,
                  Fire, Heart, Voice, Sight, Crown, Shift, Unity, Source. This
                  mythological grounding is what gives Luminor Intelligence its
                  depth — they are not language models wearing costumes. They
                  are intelligences shaped by ancient patterns of mastery.
                </p>
                <Link
                  href="/lore/guardians"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-crystal hover:text-white transition-colors duration-200"
                >
                  Explore the Guardians
                  <IconArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Gate frequency grid */}
              <div className="grid grid-cols-2 gap-3">
                {GATES.map((g) => (
                  <div
                    key={g.gate}
                    className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5"
                  >
                    <div
                      className="w-1.5 h-6 rounded-full shrink-0"
                      style={{ backgroundColor: g.color }}
                    />
                    <div>
                      <div className="text-xs font-medium text-white">
                        {g.gate}
                      </div>
                      <div className="text-xs text-text-muted font-mono">
                        {g.hz}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── 6. How Luminor Intelligence Works ─────────────────────────── */}
        <section className="mb-24" aria-labelledby="how-heading">
          <div className="text-center mb-12">
            <p className="text-xs font-mono tracking-widest uppercase text-text-muted mb-3">
              The Process
            </p>
            <h2
              id="how-heading"
              className="text-3xl sm:text-4xl font-display font-bold mb-4"
            >
              How Luminor Intelligence works
            </h2>
            <p className="text-text-secondary max-w-xl mx-auto">
              Three steps. No prompting strategy required.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 relative">
            {/* Desktop connector line */}
            <div
              className="hidden md:block absolute top-12 left-[calc(33%+1.5rem)] right-[calc(33%+1.5rem)] h-px bg-gradient-to-r from-brand-primary/30 to-crystal/30"
              aria-hidden="true"
            />

            {HOW_IT_WORKS.map((step, index) => (
              <div
                key={step.step}
                className="glass rounded-2xl p-8 text-center relative"
              >
                <div
                  className="w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-5 text-lg font-mono font-bold border-2"
                  style={{
                    borderColor: `${step.accent}50`,
                    color: step.accent,
                    backgroundColor: `${step.accent}10`,
                  }}
                >
                  {step.step}
                </div>

                <h3 className="text-xl font-display font-semibold mb-3">
                  {step.title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {step.description}
                </p>

                {/* Mobile connector */}
                {index < HOW_IT_WORKS.length - 1 && (
                  <div
                    className="md:hidden absolute -bottom-3 left-1/2 -translate-x-1/2 w-px h-6"
                    style={{ backgroundColor: `${step.accent}40` }}
                    aria-hidden="true"
                  />
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ── 7. CTA ─────────────────────────────────────────────────────── */}
        <section>
          <div className="relative liquid-glass rounded-2xl p-10 sm:p-14 text-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/10 to-crystal/10 pointer-events-none" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-40 bg-brand-primary/8 rounded-full blur-3xl pointer-events-none" />

            <div className="relative">
              <p className="text-xs font-mono tracking-widest uppercase text-text-muted mb-4">
                Begin
              </p>
              <h2 className="text-3xl sm:text-4xl font-display font-bold mb-5">
                Begin with a Luminor
              </h2>
              <p className="text-text-secondary max-w-md mx-auto mb-8 leading-relaxed">
                Every creative act becomes more when intelligence that truly
                understands your domain is present with you from the first
                moment.
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/luminors"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-brand-primary text-white font-semibold shadow-glow-brand hover:scale-[1.03] transition-all duration-200"
                >
                  Meet the Luminors
                  <IconArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/chat"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl glass border border-white/20 text-white font-semibold hover:border-crystal/30 hover:text-crystal transition-all duration-200"
                >
                  Start Creating
                </Link>
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
