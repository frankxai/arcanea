import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Arcanea Chess | Arcanea",
  description:
    "Play chess against AI companions infused with the wisdom of the Ten Gates. A unique blend of strategic gameplay and Arcanean lore.",
};

// ─── Inline SVG Icons ───────────────────────────────────────────────────────────
const Icons: Record<string, React.FC<React.SVGProps<SVGElement>>> = {
  Gamepad2: () => (
    <svg
      className="w-6 h-6"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="6" width="20" height="12" rx="2" />
      <path d="M6 12h4" />
      <path d="M15 12h4" />
      <path d="M6 9V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v3" />
    </svg>
  ),
  Crown: () => (
    <svg
      className="w-5 h-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14" />
    </svg>
  ),
  Swords: () => (
    <svg
      className="w-5 h-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.5 17.5L3 6V3h3l11.5 11.5" />
      <path d="M13 19l6-6" />
      <path d="M16 16l4 4" />
      <path d="M19 21l2-2" />
      <path d="M14.5 6.5L18 3h3v3l-3.5 3.5" />
      <path d="M5 14l4 4" />
      <path d="M7 17l-3 3" />
    </svg>
  ),
  Users: () => (
    <svg
      className="w-5 h-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  Trophy: () => (
    <svg
      className="w-5 h-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  ),
  Sparkles: () => (
    <svg
      className="w-5 h-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" />
    </svg>
  ),
  ArrowRight: () => (
    <svg
      className="w-4 h-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  ),
  Clock: () => (
    <svg
      className="w-4 h-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  Zap: () => (
    <svg
      className="w-4 h-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  Target: () => (
    <svg
      className="w-4 h-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  ),
  RotateCcw: () => (
    <svg
      className="w-4 h-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="1 4 1 10 7 10" />
      <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
    </svg>
  ),
  Play: () => (
    <svg
      className="w-4 h-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  ),
  Pause: () => (
    <svg
      className="w-4 h-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="6" y="4" width="4" height="16" />
      <rect x="14" y="4" width="4" height="16" />
    </svg>
  ),
  Volume2: () => (
    <svg
      className="w-4 h-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
    </svg>
  ),
  Settings: () => (
    <svg
      className="w-4 h-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  ),
};

// ─── Guardian Opponents ─────────────────────────────────────────────────────────
const GUARDIANS = [
  {
    id: "lyssandria",
    name: "Lyssandria",
    title: "Foundation Guardian",
    frequency: "174 Hz",
    style: "Strategic & Defensive",
    description: "Masters the art of position and long-term planning.",
    accent: "#4a7c59",
    difficulty: "Medium",
    winRate: "52%",
    gamesPlayed: 1247,
  },
  {
    id: "leyla",
    name: "Leyla",
    title: "Flow Guardian",
    frequency: "285 Hz",
    style: "Creative & Adaptive",
    description: "Weaves unexpected combinations and sacrifices.",
    accent: "#06b6d4",
    difficulty: "Hard",
    winRate: "58%",
    gamesPlayed: 892,
  },
  {
    id: "draconia",
    name: "Draconia",
    title: "Fire Guardian",
    frequency: "396 Hz",
    style: "Aggressive & Bold",
    description: "Strikes with precision and overwhelming force.",
    accent: "#ef4444",
    difficulty: "Expert",
    winRate: "64%",
    gamesPlayed: 456,
  },
  {
    id: "maylinn",
    name: "Maylinn",
    title: "Heart Guardian",
    frequency: "417 Hz",
    style: "Balanced & Patient",
    description: "Outlasts opponents through endurance and timing.",
    accent: "#ec4899",
    difficulty: "Easy",
    winRate: "45%",
    gamesPlayed: 2134,
  },
  {
    id: "alera",
    name: "Alera",
    title: "Voice Guardian",
    frequency: "528 Hz",
    style: "Tactical & Precise",
    description: "Every move carries the weight of truth.",
    accent: "#f59e0b",
    difficulty: "Hard",
    winRate: "61%",
    gamesPlayed: 678,
  },
  {
    id: "lyria",
    name: "Lyria",
    title: "Sight Guardian",
    frequency: "639 Hz",
    style: "Intuitive & Deep",
    description: "Sees moves ahead through pure intuition.",
    accent: "#8b5cf6",
    difficulty: "Expert",
    winRate: "67%",
    gamesPlayed: 324,
  },
];

const GAME_MODES = [
  {
    id: "blitz",
    name: "Blitz",
    time: "3+0",
    description: "Fast-paced rapid chess",
    icon: Icons.Zap,
  },
  {
    id: "rapid",
    name: "Rapid",
    time: "10+5",
    description: "Balanced time control",
    icon: Icons.Clock,
  },
  {
    id: "classical",
    name: "Classical",
    time: "30+30",
    description: "Deep strategic play",
    icon: Icons.Target,
  },
  {
    id: "puzzle",
    name: "Puzzles",
    time: "Unlimited",
    description: "Training exercises",
    icon: Icons.Sparkles,
  },
];

const LEADERBOARD = [
  { rank: 1, name: "Grandmaster", rating: 2850, wins: 342 },
  { rank: 2, name: "Archon_7", rating: 2723, wins: 289 },
  { rank: 3, name: "Luminor_Walker", rating: 2689, wins: 267 },
  { rank: 4, name: "Guardian_Slayer", rating: 2541, wins: 234 },
  { rank: 5, name: "Void_Walker", rating: 2498, wins: 198 },
];

export default function ChessPage() {
  return (
    <div className="relative min-h-screen">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-cosmic-void" />
        <div className="absolute inset-0 bg-cosmic-mesh" />
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(ellipse_at_top_right,rgba(139,92,246,0.12),transparent_55%),radial_gradient(ellipse_at_bottom_left,rgba(127,255,212,0.08),transparent_55%)]" />
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <section className="mb-12">
          <div className="relative liquid-glass rounded-3xl overflow-hidden px-8 py-12 sm:px-12 sm:py-16">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/12 via-transparent to-crystal/10 pointer-events-none" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/8 rounded-full blur-3xl pointer-events-none" />

            <div className="relative">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-primary/30 bg-brand-primary/10 mb-6">
                <Icons.Gamepad2 />
                <span className="text-xs font-mono tracking-widest uppercase text-brand-primary">
                  Arcanea Chess
                </span>
              </div>

              <h1 className="text-fluid-3xl font-display font-bold mb-4">
                Strategic Wisdom
                <span className="block text-gradient-brand">
                  of the Ten Gates
                </span>
              </h1>

              <p className="text-text-secondary font-body text-lg max-w-2xl mb-8">
                Challenge Guardians infused with the frequencies of the Ten
                Gates. Each opponent brings unique strategies from across the
                Arcanea universe.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/chess/play"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-primary text-white font-semibold shadow-glow-brand hover:scale-[1.03] transition-all duration-200"
                >
                  <Icons.Play />
                  Play Now
                  <Icons.ArrowRight />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Game Modes */}
        <section className="mb-12">
          <h2 className="text-xl font-display font-semibold mb-6">
            Game Modes
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {GAME_MODES.map((mode) => (
              <button
                key={mode.id}
                className="glass rounded-xl p-5 text-left hover:border-crystal/30 transition-all group"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-brand-primary/15 flex items-center justify-center group-hover:bg-brand-primary/25 transition-colors">
                    <mode.icon className="w-5 h-5 text-brand-primary" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold">{mode.name}</h3>
                    <span className="text-xs font-mono text-text-muted">
                      {mode.time}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-text-secondary">
                  {mode.description}
                </p>
              </button>
            ))}
          </div>
        </section>

        {/* Guardian Opponents */}
        <section className="mb-12" aria-labelledby="opponents-heading">
          <h2
            id="opponents-heading"
            className="text-xl font-display font-semibold mb-6"
          >
            Choose Your Opponent
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {GUARDIANS.map((guardian) => (
              <div
                key={guardian.id}
                className="glass rounded-2xl overflow-hidden hover:border-crystal/30 transition-all group"
              >
                {/* Accent bar */}
                <div
                  className="h-1"
                  style={{ backgroundColor: guardian.accent }}
                />

                <div className="p-5">
                  {/* Header */}
                  <div className="flex items-center gap-4 mb-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${guardian.accent}20` }}
                    >
                      <Icons.Crown
                        className="w-6 h-6"
                        style={{ color: guardian.accent }}
                      />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold group-hover:text-crystal transition-colors">
                        {guardian.name}
                      </h3>
                      <p className="text-xs text-text-muted">
                        {guardian.title}
                      </p>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-2 mb-4 text-center">
                    <div className="p-2 rounded-lg bg-white/5">
                      <span
                        className="text-xs font-mono block"
                        style={{ color: guardian.accent }}
                      >
                        {guardian.difficulty}
                      </span>
                      <span className="text-[10px] text-text-muted">
                        Difficulty
                      </span>
                    </div>
                    <div className="p-2 rounded-lg bg-white/5">
                      <span className="text-xs font-mono block text-brand-gold">
                        {guardian.winRate}
                      </span>
                      <span className="text-[10px] text-text-muted">
                        Win Rate
                      </span>
                    </div>
                    <div className="p-2 rounded-lg bg-white/5">
                      <span className="text-xs font-mono block text-white">
                        {guardian.gamesPlayed.toLocaleString()}
                      </span>
                      <span className="text-[10px] text-text-muted">Games</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-text-secondary mb-4">
                    {guardian.description}
                  </p>

                  <p className="text-xs text-text-muted mb-4">
                    <span className="font-mono">{guardian.frequency}</span> —{" "}
                    {guardian.style}
                  </p>

                  {/* Play Button */}
                  <Link
                    href={`/chess/play?opponent=${guardian.id}`}
                    className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border transition-all"
                    style={{
                      borderColor: `${guardian.accent}40`,
                      color: guardian.accent,
                    }}
                  >
                    <Icons.Swords />
                    Challenge
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Leaderboard */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-display font-semibold flex items-center gap-2">
              <Icons.Trophy className="w-5 h-5 text-brand-gold" />
              Leaderboard
            </h2>
            <Link
              href="/chess/leaderboard"
              className="text-sm text-brand-primary hover:text-crystal transition-colors"
            >
              View All
            </Link>
          </div>

          <div className="glass rounded-2xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 text-sm font-mono text-text-muted">
                    Rank
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-display font-semibold">
                    Player
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-mono">
                    Rating
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-mono">
                    Wins
                  </th>
                </tr>
              </thead>
              <tbody>
                {LEADERBOARD.map((entry) => (
                  <tr
                    key={entry.rank}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors"
                  >
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-mono ${
                          entry.rank <= 3
                            ? "bg-brand-gold/20 text-brand-gold"
                            : "text-text-muted"
                        }`}
                      >
                        {entry.rank}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-medium">{entry.name}</td>
                    <td className="py-3 px-4 text-right font-mono text-brand-primary">
                      {entry.rating}
                    </td>
                    <td className="py-3 px-4 text-right text-text-secondary">
                      {entry.wins}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Quick Play */}
        <section className="mb-12">
          <div className="glass rounded-2xl p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-xl font-display font-semibold mb-2">
                  Quick Match
                </h3>
                <p className="text-text-secondary text-sm">
                  Get matched with an opponent of similar skill level
                </p>
              </div>
              <Link
                href="/chess/play?mode=random"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-primary text-white font-semibold hover:shadow-glow-brand transition-all"
              >
                <Icons.Play />
                Find Match
              </Link>
            </div>
          </div>
        </section>

        {/* Training Section */}
        <section>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="glass rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-brand-primary/15 flex items-center justify-center">
                  <Icons.RotateCcw className="w-5 h-5 text-brand-primary" />
                </div>
                <h3 className="font-display font-semibold">Analysis</h3>
              </div>
              <p className="text-sm text-text-secondary mb-4">
                Review your games with AI-powered analysis. Understand your
                mistakes and improve your strategy.
              </p>
              <Link
                href="/chess/analysis"
                className="text-sm text-brand-primary hover:text-crystal transition-colors inline-flex items-center gap-1"
              >
                Analyze Games
                <Icons.ArrowRight />
              </Link>
            </div>

            <div className="glass rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-crystal/15 flex items-center justify-center">
                  <Icons.Users className="w-5 h-5 text-crystal" />
                </div>
                <h3 className="font-display font-semibold">Community</h3>
              </div>
              <p className="text-sm text-text-secondary mb-4">
                Join tournaments, participate in leagues, and climb the ranks
                alongside fellow Arcanea chess enthusiasts.
              </p>
              <Link
                href="/chess/community"
                className="text-sm text-brand-primary hover:text-crystal transition-colors inline-flex items-center gap-1"
              >
                Join Community
                <Icons.ArrowRight />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
