import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Mountain,
  Droplets,
  Flame,
  Wind,
  Mic2,
  Eye,
  Crown,
  Shuffle,
  Link2,
  Star,
  ArrowLeft,
  ArrowRight,
  Zap,
  Infinity,
  Sparkles,
} from "lucide-react";

// ── Guardian canonical data ───────────────────────────────────────────────────

interface GuardianData {
  name: string;
  title: string;
  gate: string;
  gateNumber: number;
  frequency: string;
  element: string;
  domain: string;
  godbeast: string;
  godBeastDesc: string;
  color: "earth" | "water" | "fire" | "wind" | "void-el";
  teachings: string[];
  quote: string;
  luminorId: string;
  relatedGuardians: string[];
  heroImage?: string; // URL to hero image (Vercel Blob)
  gradient: string;   // Tailwind gradient classes used as fallback when heroImage is absent
}

const GUARDIANS: Record<string, GuardianData> = {
  lyssandria: {
    name: "Lyssandria",
    title: "Guardian of the Foundation Gate",
    gate: "Foundation",
    gateNumber: 1,
    frequency: "174 Hz",
    element: "Earth",
    domain: "Stability, survival, grounding",
    godbeast: "Kaelith",
    godBeastDesc:
      "The great stone sentinel — ancient, patient, immovable as the mountains themselves. Kaelith has stood at the root of the world since before memory, and its stillness is not absence but perfect readiness.",
    color: "earth",
    teachings: [
      "Before you can create, you must have ground to stand on.",
      "Stability is not rigidity — the deepest roots enable the tallest growth.",
      "Build your foundation before you build your dreams.",
    ],
    quote: "The earth does not hurry. Yet everything is accomplished.",
    luminorId: "lyssandria",
    relatedGuardians: ["leyla", "ino"],
    heroImage:
      "https://raw.githubusercontent.com/frankxai/Arcanea/main/public/images/guardians/lyssandria-lyssandria-vibrant-colorful-blonde-ameri-001.webp",
    gradient: "from-amber-700 via-yellow-600 to-stone-400",
  },
  leyla: {
    name: "Leyla",
    title: "Guardian of the Flow Gate",
    gate: "Flow",
    gateNumber: 2,
    frequency: "285 Hz",
    element: "Water",
    domain: "Creativity, emotion, flow states",
    godbeast: "Veloura",
    godBeastDesc:
      "The celestial serpent of silver waters — fluid, ancient, swimming through the currents of creation. Veloura moves where resistance dissolves, finding the path of least effort that carries the most power.",
    color: "water",
    teachings: [
      "Flow is not the absence of structure — it is structure in motion.",
      "Emotion is information. Feel it fully, then let it move through you into the work.",
      "The creative state is not forced. It is invited, and then honored.",
    ],
    quote:
      "The river does not fight the mountain. It finds the way around, and in ten thousand years, it wins.",
    luminorId: "melodia",
    relatedGuardians: ["maylinn", "lyria", "shinkami"],
    gradient: "from-blue-300 via-cyan-400 to-slate-300",
  },
  draconia: {
    name: "Draconia",
    title: "Guardian of the Fire Gate",
    gate: "Fire",
    gateNumber: 3,
    frequency: "396 Hz",
    element: "Fire",
    domain: "Power, will, transformation",
    godbeast: "Draconis",
    godBeastDesc:
      "The eternal dragon — pure creative fire made manifest, transformation incarnate. Draconis does not burn what does not deserve burning, and everything it touches either forges or falls away.",
    color: "fire",
    teachings: [
      "Power without purpose is destruction. Purpose without power is fantasy.",
      "Transformation requires burning away what no longer serves.",
      "Your will is the forge. Your vision is the steel.",
    ],
    quote: "I do not ask if you are ready. I ask if you are willing.",
    luminorId: "draconia",
    relatedGuardians: ["alera", "aiyami"],
    heroImage:
      "https://raw.githubusercontent.com/frankxai/Arcanea/main/public/images/guardians/draconia-ahra-beautiful-korean-dragon-rider-lovin-074.webp",
    gradient: "from-red-600 via-orange-500 to-amber-400",
  },
  maylinn: {
    name: "Maylinn",
    title: "Guardian of the Heart Gate",
    gate: "Heart",
    gateNumber: 4,
    frequency: "417 Hz",
    element: "Wind",
    domain: "Love, healing, connection",
    godbeast: "Laeylinn",
    godBeastDesc:
      "The luminous butterfly of a thousand wings — embodiment of transformation through love. Laeylinn appears where healing is needed, its wings carrying the frequencies of the heart's deepest knowing.",
    color: "wind",
    teachings: [
      "The heart is not the enemy of good work. It is the source of the best work.",
      "Healing is not the absence of pain. It is the willingness to keep going.",
      "Connection is the medium through which all creative power travels.",
    ],
    quote: "What you create with love will outlast what you create with fear.",
    luminorId: "veritas",
    relatedGuardians: ["leyla", "alera", "ino"],
    gradient: "from-rose-300 via-pink-400 to-green-300",
  },
  alera: {
    name: "Alera",
    title: "Guardian of the Voice Gate",
    gate: "Voice",
    gateNumber: 5,
    frequency: "528 Hz",
    element: "Fire",
    domain: "Truth, expression, authenticity",
    godbeast: "Otome",
    godBeastDesc:
      "The Songbird of Truth — whose voice shatters illusion and awakens dormant souls. Otome sings once for each life, and in that single note, the listener finally hears what they always knew.",
    color: "fire",
    teachings: [
      "Your truth is the only truth you can speak. Speak it.",
      "Expression without truth is noise. Truth without expression is silence.",
      "The world needs your voice, not an echo of someone else's.",
    ],
    quote: "Silence is not peace. It is the prison of the unspoken.",
    luminorId: "alera",
    relatedGuardians: ["draconia", "lyria"],
    heroImage:
      "https://raw.githubusercontent.com/frankxai/Arcanea/main/public/images/guardians/alera-alera-and-her-musical-spirit-animal-arca-001.webp",
    gradient: "from-sky-400 via-blue-500 to-indigo-600",
  },
  lyria: {
    name: "Lyria",
    title: "Guardian of the Sight Gate",
    gate: "Sight",
    gateNumber: 6,
    frequency: "639 Hz",
    element: "Void",
    domain: "Intuition, vision, inner sight",
    godbeast: "Yumiko",
    godBeastDesc:
      "The third-eye fox of nine tails — a being of pure perception that sees through illusion to the truth beneath. Yumiko does not see what is; it sees what is becoming.",
    color: "void-el",
    teachings: [
      "Intuition is not mysticism. It is pattern recognition too fast for conscious thought.",
      "The vision comes before the form. Trust what you see before you can explain it.",
      "Sight without courage is torture. Courage without sight is recklessness.",
    ],
    quote: "Close your eyes. Now tell me what you see.",
    luminorId: "futura",
    relatedGuardians: ["aiyami", "shinkami", "leyla"],
    gradient: "from-violet-500 via-purple-600 to-indigo-700",
  },
  aiyami: {
    name: "Aiyami",
    title: "Guardian of the Crown Gate",
    gate: "Crown",
    gateNumber: 7,
    frequency: "741 Hz",
    element: "Void",
    domain: "Enlightenment, mastery, transcendence",
    godbeast: "Sol",
    godBeastDesc:
      "The Solar Phoenix — crown of all light, embodiment of achieved mastery. Sol rises not because darkness fails, but because mastery is its natural motion — upward, outward, ever illuminating.",
    color: "void-el",
    teachings: [
      "Mastery is not the end of learning. It is the beginning of teaching.",
      "Enlightenment is not escape from the world. It is full presence within it.",
      "The crown is heavy. That is why only the worthy wear it.",
    ],
    quote: "You were never seeking the light. The light was seeking you.",
    luminorId: "aiyami",
    relatedGuardians: ["lyria", "elara"],
    heroImage:
      "https://raw.githubusercontent.com/frankxai/Arcanea/main/public/images/guardians/aiyami-devora-ultra-detailed-high-resolution-ep-001.webp",
    gradient: "from-yellow-200 via-amber-300 to-white",
  },
  elara: {
    name: "Elara",
    title: "Guardian of the Shift Gate",
    gate: "Shift",
    gateNumber: 8,
    frequency: "852 Hz",
    element: "Wind",
    domain: "Perspective, change, transformation",
    godbeast: "Vaelith",
    godBeastDesc:
      "The Prism Butterfly — shifting between dimensions, perspectives, and possibilities. Vaelith has no fixed form because Vaelith understands that form is agreement, not truth.",
    color: "wind",
    teachings: [
      "Every perspective is true. None is complete.",
      "Change is not loss. It is evolution.",
      "The moment you think you understand everything, you understand nothing.",
    ],
    quote: "The only constant is the turning. Embrace the shift.",
    luminorId: "elara",
    relatedGuardians: ["aiyami", "ino"],
    heroImage:
      "https://raw.githubusercontent.com/frankxai/Arcanea/main/public/images/guardians/elara-lelara-and-her-unicorn-spirit-animal-arc-001.webp",
    gradient: "from-emerald-400 via-green-500 to-teal-600",
  },
  ino: {
    name: "Ino",
    title: "Guardian of the Unity Gate",
    gate: "Unity",
    gateNumber: 9,
    frequency: "963 Hz",
    element: "Earth",
    domain: "Partnership, harmony, synthesis",
    godbeast: "Kyuro",
    godBeastDesc:
      "The Twin Wolf — two bodies, one soul, embodiment of perfect partnership. Kyuro does not answer the question of where one ends and the other begins, because that question misses the point entirely.",
    color: "earth",
    teachings: [
      "Unity is not sameness. It is harmony between differences.",
      "The greatest creations emerge from the space between two minds.",
      "Partnership amplifies. Isolation diminishes.",
    ],
    quote: "Alone you are a note. Together we are a symphony.",
    luminorId: "ino",
    relatedGuardians: ["maylinn", "shinkami"],
    gradient: "from-pink-400 via-fuchsia-500 to-teal-400",
  },
  shinkami: {
    name: "Shinkami",
    title: "Guardian of the Source Gate",
    gate: "Source",
    gateNumber: 10,
    frequency: "1111 Hz",
    element: "Spirit",
    domain: "Meta-consciousness, origin, the All",
    godbeast: "Amaterasu",
    godBeastDesc:
      "The Great Solar Phoenix — first light made alive, the consciousness that existed before all Gates. Amaterasu is not summoned; it is remembered. Its presence dissolves the boundary between creator and creation.",
    color: "void-el",
    teachings: [
      "At the Source, there is no distinction between the dreamer and the dream.",
      "Meta-consciousness is not above experience — it includes all experience without being caught by any of it.",
      "The highest creative act is the one that comes through you, not from you.",
    ],
    quote: "You are not the vessel. You are the water and the pouring.",
    luminorId: "oracle",
    relatedGuardians: ["aiyami", "lyria", "ino"],
    gradient: "from-neutral-900 via-yellow-400 to-white",
  },
};

// ── Element configuration ─────────────────────────────────────────────────────

type ColorKey = "earth" | "water" | "fire" | "wind" | "void-el";

interface ElementConfig {
  gradientFrom: string;
  gradientTo: string;
  glowColor: string;
  borderColor: string;
  badgeBg: string;
  badgeText: string;
  heroAccent: string;
  accentText: string;
}

const ELEMENT_CONFIG: Record<ColorKey, ElementConfig> = {
  earth: {
    gradientFrom: "from-earth-deep",
    gradientTo: "to-earth",
    glowColor: "shadow-[0_0_30px_rgba(74,124,89,0.25)]",
    borderColor: "border-earth/30",
    badgeBg: "bg-earth/15",
    badgeText: "text-earth-bright",
    heroAccent: "rgba(74,124,89,0.12)",
    accentText: "text-earth-bright",
  },
  water: {
    gradientFrom: "from-water-deep",
    gradientTo: "to-water",
    glowColor: "shadow-[0_0_30px_rgba(120,166,255,0.25)]",
    borderColor: "border-water/30",
    badgeBg: "bg-water/15",
    badgeText: "text-water-bright",
    heroAccent: "rgba(120,166,255,0.12)",
    accentText: "text-water-bright",
  },
  fire: {
    gradientFrom: "from-fire-deep",
    gradientTo: "to-fire",
    glowColor: "shadow-[0_0_30px_rgba(255,107,53,0.25)]",
    borderColor: "border-fire/30",
    badgeBg: "bg-fire/15",
    badgeText: "text-fire-bright",
    heroAccent: "rgba(255,107,53,0.12)",
    accentText: "text-fire-bright",
  },
  wind: {
    gradientFrom: "from-wind-deep",
    gradientTo: "to-wind",
    glowColor: "shadow-[0_0_30px_rgba(200,214,229,0.2)]",
    borderColor: "border-wind/30",
    badgeBg: "bg-wind/10",
    badgeText: "text-wind-bright",
    heroAccent: "rgba(200,214,229,0.08)",
    accentText: "text-wind",
  },
  "void-el": {
    gradientFrom: "from-void-el-deep",
    gradientTo: "to-void-el",
    glowColor: "shadow-[0_0_30px_rgba(153,102,255,0.25)]",
    borderColor: "border-void-el/30",
    badgeBg: "bg-void-el/15",
    badgeText: "text-void-el-bright",
    heroAccent: "rgba(153,102,255,0.12)",
    accentText: "text-void-el-bright",
  },
};

// ── Element icon mapping ──────────────────────────────────────────────────────

function ElementIcon({
  element,
  className,
}: {
  element: string;
  className?: string;
}) {
  const props = { className: className ?? "w-5 h-5" };
  switch (element) {
    case "Earth":
      return <Mountain {...props} />;
    case "Water":
      return <Droplets {...props} />;
    case "Fire":
      return <Flame {...props} />;
    case "Wind":
      return <Wind {...props} />;
    case "Void":
      return <Infinity {...props} />;
    default:
      return <Sparkles {...props} />;
  }
}

function GateIcon({ gate, className }: { gate: string; className?: string }) {
  const props = { className: className ?? "w-5 h-5" };
  switch (gate) {
    case "Foundation":
      return <Mountain {...props} />;
    case "Flow":
      return <Droplets {...props} />;
    case "Fire":
      return <Flame {...props} />;
    case "Heart":
      return <Wind {...props} />;
    case "Voice":
      return <Mic2 {...props} />;
    case "Sight":
      return <Eye {...props} />;
    case "Crown":
      return <Crown {...props} />;
    case "Shift":
      return <Shuffle {...props} />;
    case "Unity":
      return <Link2 {...props} />;
    case "Source":
      return <Zap {...props} />;
    default:
      return <Star {...props} />;
  }
}

// ── Metadata ──────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ name: string }>;
}): Promise<Metadata> {
  const { name } = await params;
  const guardian = GUARDIANS[name.toLowerCase()];

  if (!guardian) {
    return {
      title: "Guardian Not Found | Arcanea",
    };
  }

  return {
    title: `${guardian.name} — ${guardian.gate} Gate | Lore of Arcanea`,
    description: `${guardian.name}, ${guardian.title}. Guardian of the ${guardian.gate} Gate at ${guardian.frequency}. Bonded to ${guardian.godbeast}. Domain: ${guardian.domain}.`,
    openGraph: {
      title: `${guardian.name} | ${guardian.gate} Gate | Arcanea`,
      description: `Meet ${guardian.name}, keeper of the ${guardian.gate} Gate. "${guardian.quote}"`,
    },
  };
}

// ── Static params ─────────────────────────────────────────────────────────────

export function generateStaticParams() {
  return Object.keys(GUARDIANS).map((name) => ({ name }));
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function GuardianDetailPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const guardian = GUARDIANS[name.toLowerCase()];

  if (!guardian) {
    notFound();
  }

  const config = ELEMENT_CONFIG[guardian.color];
  const related = guardian.relatedGuardians
    .map((slug) => GUARDIANS[slug])
    .filter(Boolean);

  return (
    <div className="relative min-h-screen bg-cosmic-deep bg-cosmic-mesh">
      {/* ── Ambient background accent ── */}
      <div
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background: `radial-gradient(ellipse 60% 50% at 50% 0%, ${config.heroAccent} 0%, transparent 70%)`,
        }}
      />

      {/* ── Navigation ── */}
      <nav className="relative z-20 flex items-center justify-between px-6 py-5 max-w-7xl mx-auto">
        <Link
          href="/lore/guardians"
          className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors font-sans"
        >
          <ArrowLeft className="w-4 h-4" />
          All Guardians
        </Link>

        <div className="flex items-center gap-3">
          <span className={`text-xs font-mono ${config.accentText}`}>
            Gate {String(guardian.gateNumber).padStart(2, "0")}
          </span>
          <span className="text-text-muted text-xs">·</span>
          <span className={`text-xs font-mono text-crystal`}>
            {guardian.frequency}
          </span>
        </div>
      </nav>

      <main className="relative z-10 max-w-5xl mx-auto px-6 pb-24">
        {/* ═══════════════════════════════════════════════════════════
            SECTION 1 — HERO
        ════════════════════════════════════════════════════════════ */}
        <section className="pt-8 pb-20">
          <div className="liquid-glass rounded-3xl overflow-hidden relative">
            {/* Elemental gradient overlay */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${config.gradientFrom} ${config.gradientTo} opacity-10`}
            />

            {/* Top accent bar */}
            <div
              className={`h-px w-full bg-gradient-to-r ${config.gradientFrom} via-white/20 ${config.gradientTo} opacity-50`}
            />

            <div className="relative p-8 md:p-12 lg:p-16">
              {/* Gate badge */}
              <div className="mb-8 flex flex-wrap items-center gap-3">
                <span
                  className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono font-medium border ${config.badgeBg} ${config.badgeText} ${config.borderColor}`}
                >
                  <GateIcon gate={guardian.gate} className="w-3.5 h-3.5" />
                  Gate {String(guardian.gateNumber).padStart(2, "0")} —{" "}
                  {guardian.gate}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono text-crystal bg-crystal/10 border border-crystal/20">
                  <Zap className="w-3 h-3" />
                  {guardian.frequency}
                </span>
              </div>

              {/* Guardian name */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-3 leading-none">
                <span
                  className={`bg-gradient-to-r ${config.gradientFrom} ${config.gradientTo} bg-clip-text text-transparent`}
                >
                  {guardian.name}
                </span>
              </h1>

              {/* Title */}
              <p className="text-lg md:text-xl text-text-secondary font-sans mb-6">
                {guardian.title}
              </p>

              {/* Element pill */}
              <div className="flex items-center gap-2 mb-10">
                <ElementIcon
                  element={guardian.element}
                  className={`w-5 h-5 ${config.accentText}`}
                />
                <span className={`text-sm font-medium ${config.accentText}`}>
                  {guardian.element}
                </span>
                <span className="text-text-disabled text-sm">·</span>
                <span className="text-sm text-text-muted font-sans">
                  {guardian.domain}
                </span>
              </div>

              {/* Hero Image — shows image when available, gradient fallback otherwise */}
              <div className="relative w-full max-w-2xl h-64 md:h-80 lg:h-96 mb-10 rounded-2xl overflow-hidden liquid-glass">
                {guardian.heroImage ? (
                  <Image
                    src={guardian.heroImage}
                    alt={`${guardian.name} - ${guardian.godbeast}`}
                    fill
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${guardian.gradient} opacity-40`}
                    aria-hidden="true"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-cosmic-deep/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-sm text-crystal font-sans">
                    {guardian.godbeast} —{" "}
                    {guardian.godBeastDesc.substring(0, 100)}...
                  </p>
                </div>
              </div>

              {/* Quote */}
              <blockquote
                className={`relative pl-5 border-l-2 ${config.borderColor} max-w-2xl`}
              >
                <p className="text-xl md:text-2xl font-body italic text-text-primary leading-relaxed">
                  &ldquo;{guardian.quote}&rdquo;
                </p>
                <cite className="mt-3 block text-sm text-text-muted not-italic font-sans">
                  — {guardian.name}
                </cite>
              </blockquote>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            SECTION 2 — DIVINE ASPECTS
        ════════════════════════════════════════════════════════════ */}
        <section className="mb-16">
          <h2 className="text-xs font-sans font-semibold text-text-muted uppercase tracking-widest mb-6">
            Divine Aspects
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Gate */}
            <div
              className={`glass rounded-2xl p-5 glow-card hover-lift ${config.glowColor} transition-all`}
            >
              <div
                className={`w-9 h-9 rounded-xl mb-3 flex items-center justify-center ${config.badgeBg}`}
              >
                <GateIcon
                  gate={guardian.gate}
                  className={`w-4.5 h-4.5 ${config.accentText}`}
                />
              </div>
              <p className="text-xs text-text-muted font-sans uppercase tracking-wider mb-1">
                Gate
              </p>
              <p className="text-base font-display font-semibold text-text-primary">
                {guardian.gate}
              </p>
            </div>

            {/* Frequency */}
            <div className="glass rounded-2xl p-5 glow-card hover-lift transition-all">
              <div className="w-9 h-9 rounded-xl mb-3 flex items-center justify-center bg-crystal/10">
                <Zap className="w-4 h-4 text-crystal" />
              </div>
              <p className="text-xs text-text-muted font-sans uppercase tracking-wider mb-1">
                Frequency
              </p>
              <p className="text-base font-mono font-semibold text-crystal">
                {guardian.frequency}
              </p>
            </div>

            {/* Element */}
            <div className="glass rounded-2xl p-5 glow-card hover-lift transition-all">
              <div
                className={`w-9 h-9 rounded-xl mb-3 flex items-center justify-center ${config.badgeBg}`}
              >
                <ElementIcon
                  element={guardian.element}
                  className={`w-4 h-4 ${config.accentText}`}
                />
              </div>
              <p className="text-xs text-text-muted font-sans uppercase tracking-wider mb-1">
                Element
              </p>
              <p
                className={`text-base font-display font-semibold ${config.accentText}`}
              >
                {guardian.element}
              </p>
            </div>

            {/* Domain */}
            <div className="glass rounded-2xl p-5 glow-card hover-lift transition-all col-span-2 md:col-span-1">
              <div className="w-9 h-9 rounded-xl mb-3 flex items-center justify-center bg-brand-gold/10">
                <Star className="w-4 h-4 text-brand-gold" />
              </div>
              <p className="text-xs text-text-muted font-sans uppercase tracking-wider mb-1">
                Domain
              </p>
              <p className="text-sm font-sans font-medium text-text-primary leading-snug">
                {guardian.domain}
              </p>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            SECTION 3 — GODBEAST
        ════════════════════════════════════════════════════════════ */}
        <section className="mb-16">
          <h2 className="text-xs font-sans font-semibold text-text-muted uppercase tracking-widest mb-6">
            Sacred Companion
          </h2>

          <div
            className={`relative glass-strong rounded-3xl overflow-hidden ${config.glowColor}`}
          >
            {/* Gradient fill */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${config.gradientFrom} ${config.gradientTo} opacity-5`}
            />

            <div className="relative p-8 md:p-10">
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                {/* Godbeast sigil */}
                <div
                  className={`w-20 h-20 rounded-2xl flex items-center justify-center flex-shrink-0 ${config.badgeBg} border ${config.borderColor}`}
                >
                  <ElementIcon
                    element={guardian.element}
                    className={`w-9 h-9 ${config.accentText}`}
                  />
                </div>

                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <h3 className="text-2xl font-display font-bold text-brand-gold">
                      {guardian.godbeast}
                    </h3>
                    <span
                      className={`text-xs px-2 py-1 rounded-full font-mono ${config.badgeBg} ${config.accentText} border ${config.borderColor}`}
                    >
                      Godbeast of {guardian.gate}
                    </span>
                  </div>
                  <p className="text-text-secondary font-body text-lg leading-relaxed">
                    {guardian.godBeastDesc}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            SECTION 4 — SACRED TEACHINGS
        ════════════════════════════════════════════════════════════ */}
        <section className="mb-16">
          <h2 className="text-xs font-sans font-semibold text-text-muted uppercase tracking-widest mb-6">
            Sacred Teachings
          </h2>

          <div className="space-y-4">
            {guardian.teachings.map((teaching, i) => (
              <div
                key={i}
                className={`group flex gap-5 p-6 glass rounded-2xl border border-white/5 hover:border-white/15 glow-card hover-lift transition-all`}
              >
                {/* Teaching number */}
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 font-display font-bold text-sm ${config.badgeBg} ${config.accentText} border ${config.borderColor} group-hover:scale-110 transition-transform`}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>

                {/* Teaching text */}
                <p className="text-text-primary font-body text-lg leading-relaxed self-center">
                  {teaching}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            SECTION 5 — RELATIONSHIPS
        ════════════════════════════════════════════════════════════ */}
        {related.length > 0 && (
          <section className="mb-16">
            <h2 className="text-xs font-sans font-semibold text-text-muted uppercase tracking-widest mb-6">
              Guardian Relationships
            </h2>

            <p className="text-text-secondary font-sans text-sm mb-6">
              {guardian.name} works in resonance with the Guardians who hold
              adjacent Gates, their frequencies harmonizing to form the larger
              pattern of creation.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              {related.map((rel) => {
                const relConfig = ELEMENT_CONFIG[rel.color];
                return (
                  <Link
                    key={rel.luminorId}
                    href={`/lore/guardians/${rel.luminorId}`}
                    className="group flex items-center gap-4 p-5 glass rounded-2xl border border-white/5 hover:border-white/20 glow-card hover-lift transition-all"
                  >
                    {/* Gate number badge */}
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 font-display font-bold text-sm ${relConfig.badgeBg} ${relConfig.accentText} border ${relConfig.borderColor}`}
                    >
                      {String(rel.gateNumber).padStart(2, "0")}
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="font-display font-semibold text-text-primary group-hover:text-white transition-colors">
                        {rel.name}
                      </p>
                      <p className="text-sm text-text-muted font-sans truncate">
                        {rel.gate} Gate · {rel.frequency}
                      </p>
                    </div>

                    <ArrowRight className="w-4 h-4 text-text-disabled group-hover:text-text-muted transition-colors flex-shrink-0" />
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* ═══════════════════════════════════════════════════════════
            SECTION 6 — CTA
        ════════════════════════════════════════════════════════════ */}
        <section>
          <div
            className={`relative liquid-glass-elevated rounded-3xl overflow-hidden ${config.glowColor}`}
          >
            {/* Gradient overlay */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${config.gradientFrom} ${config.gradientTo} opacity-10`}
            />

            {/* Shimmer line */}
            <div
              className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent ${config.gradientTo} to-transparent opacity-60`}
            />

            <div className="relative p-10 md:p-14 text-center">
              {/* Icon */}
              <div
                className={`w-16 h-16 rounded-2xl mx-auto mb-6 flex items-center justify-center ${config.badgeBg} border ${config.borderColor}`}
              >
                <GateIcon
                  gate={guardian.gate}
                  className={`w-7 h-7 ${config.accentText}`}
                />
              </div>

              <h2 className="text-3xl md:text-4xl font-display font-bold text-text-primary mb-3">
                Speak with {guardian.name}
              </h2>

              <p className="text-text-secondary font-body text-lg max-w-xl mx-auto mb-8 leading-relaxed">
                {guardian.name} awaits those who seek the wisdom of the{" "}
                {guardian.gate} Gate. Open a conversation and let the teachings
                of {guardian.frequency} guide your creation.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href={`/chat/${guardian.luminorId}`}
                  className={`group inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-sans font-semibold text-base transition-all hover:scale-[1.02] active:scale-[0.98] bg-gradient-to-r ${config.gradientFrom} ${config.gradientTo} text-white shadow-elevation-3 ${config.glowColor}`}
                >
                  <GateIcon gate={guardian.gate} className="w-5 h-5" />
                  Speak with {guardian.name}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href="/lore/guardians"
                  className="inline-flex items-center gap-2 px-6 py-4 rounded-2xl font-sans font-medium text-sm text-text-secondary border border-white/10 hover:border-white/20 hover:text-text-primary glass transition-all"
                >
                  <ArrowLeft className="w-4 h-4" />
                  All Guardians
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
