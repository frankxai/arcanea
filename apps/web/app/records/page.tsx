import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "The Arcanean Records | Arcanea",
  description:
    "Art, music, and chronicles from the universe of Arcanea. Guardian portraits, world imagery, and video chronicles from across the Ten Gates.",
};

// ─── Types ─────────────────────────────────────────────────────────────────────

interface GuardianPortrait {
  slug: string; name: string; gate: string; gateNumber: number;
  frequency: string; element: string; gradient: string;
  accent: string; border: string; bg: string; heroImage: string | null;
}
interface HeroImage {
  id: string; title: string; guardianTag: string;
  accent: string; border: string; src: string;
}
interface Chronicle {
  id: string; title: string; guardian: string; guardianSlug: string;
  description: string; gradient: string; accent: string; border: string; bg: string;
}

// ─── Data ──────────────────────────────────────────────────────────────────────

const BASE =
  "https://raw.githubusercontent.com/frankxai/Arcanea/main/public/images/guardians/";

const PORTRAITS: GuardianPortrait[] = [
  { slug: "lyssandria", name: "Lyssandria", gate: "Foundation", gateNumber: 1, frequency: "174 Hz", element: "Earth", gradient: "from-amber-700 via-yellow-600 to-stone-400", accent: "text-amber-400", border: "border-amber-500/30", bg: "bg-amber-500/10", heroImage: BASE + "lyssandria-lyssandria-vibrant-colorful-blonde-ameri-001.webp" },
  { slug: "leyla", name: "Leyla", gate: "Flow", gateNumber: 2, frequency: "285 Hz", element: "Water", gradient: "from-blue-300 via-cyan-400 to-slate-300", accent: "text-cyan-300", border: "border-cyan-400/30", bg: "bg-cyan-400/10", heroImage: null },
  { slug: "draconia", name: "Draconia", gate: "Fire", gateNumber: 3, frequency: "396 Hz", element: "Fire", gradient: "from-red-600 via-orange-500 to-amber-400", accent: "text-orange-400", border: "border-orange-500/30", bg: "bg-orange-500/10", heroImage: BASE + "draconia-ahra-beautiful-korean-dragon-rider-lovin-074.webp" },
  { slug: "maylinn", name: "Maylinn", gate: "Heart", gateNumber: 4, frequency: "417 Hz", element: "Wind", gradient: "from-rose-300 via-pink-400 to-green-300", accent: "text-pink-300", border: "border-pink-400/30", bg: "bg-pink-400/10", heroImage: null },
  { slug: "alera", name: "Alera", gate: "Voice", gateNumber: 5, frequency: "528 Hz", element: "Fire", gradient: "from-sky-400 via-blue-500 to-indigo-600", accent: "text-sky-300", border: "border-sky-400/30", bg: "bg-sky-400/10", heroImage: BASE + "alera-alera-and-her-musical-spirit-animal-arca-001.webp" },
  { slug: "lyria", name: "Lyria", gate: "Sight", gateNumber: 6, frequency: "639 Hz", element: "Void", gradient: "from-violet-500 via-purple-600 to-indigo-700", accent: "text-violet-300", border: "border-violet-500/30", bg: "bg-violet-500/10", heroImage: null },
  { slug: "aiyami", name: "Aiyami", gate: "Crown", gateNumber: 7, frequency: "741 Hz", element: "Void", gradient: "from-yellow-200 via-amber-300 to-white", accent: "text-amber-300", border: "border-amber-400/30", bg: "bg-amber-400/10", heroImage: BASE + "aiyami-devora-ultra-detailed-high-resolution-ep-001.webp" },
  { slug: "elara", name: "Elara", gate: "Shift", gateNumber: 8, frequency: "852 Hz", element: "Wind", gradient: "from-emerald-400 via-green-500 to-teal-600", accent: "text-emerald-300", border: "border-emerald-400/30", bg: "bg-emerald-400/10", heroImage: BASE + "elara-lelara-and-her-unicorn-spirit-animal-arc-001.webp" },
  { slug: "ino", name: "Ino", gate: "Unity", gateNumber: 9, frequency: "963 Hz", element: "Earth", gradient: "from-pink-400 via-fuchsia-500 to-teal-400", accent: "text-fuchsia-300", border: "border-fuchsia-400/30", bg: "bg-fuchsia-400/10", heroImage: null },
  { slug: "shinkami", name: "Shinkami", gate: "Source", gateNumber: 10, frequency: "1111 Hz", element: "Spirit", gradient: "from-neutral-900 via-yellow-400 to-white", accent: "text-yellow-200", border: "border-yellow-300/30", bg: "bg-yellow-300/10", heroImage: null },
];

const ACADEMY =
  "https://raw.githubusercontent.com/frankxai/Arcanea/main/public/images/academy/";

const HERO_IMAGES: HeroImage[] = [
  { id: "w1", title: "The Ten Gates", guardianTag: "All Gates", accent: "text-crystal", border: "border-crystal/30", src: ACADEMY + "02-ten-gates.png" },
  { id: "w2", title: "The Guardian Council", guardianTag: "Council", accent: "text-brand-gold", border: "border-brand-gold/30", src: ACADEMY + "05-guardian-council.png" },
  { id: "w3", title: "Draconia — Fire Gate", guardianTag: "Gate 03", accent: "text-orange-400", border: "border-orange-400/30", src: BASE + "draconia-ahra-beautiful-korean-dragon-rider-lovin-074.webp" },
  { id: "w4", title: "Alera — Voice of Truth", guardianTag: "Gate 05", accent: "text-sky-300", border: "border-sky-400/30", src: BASE + "alera-alera-and-her-musical-spirit-animal-arca-001.webp" },
  { id: "w5", title: "Aiyami — Crown of Light", guardianTag: "Gate 07", accent: "text-amber-300", border: "border-amber-400/30", src: BASE + "aiyami-devora-ultra-detailed-high-resolution-ep-001.webp" },
  { id: "w6", title: "Elara — The Shifting Path", guardianTag: "Gate 08", accent: "text-emerald-300", border: "border-emerald-400/30", src: BASE + "elara-lelara-and-her-unicorn-spirit-animal-arc-001.webp" },
];

const CHRONICLES: Chronicle[] = [
  { id: "c1", title: "Draconia's Fire Trial", guardian: "Draconia", guardianSlug: "draconia", description: "The moment Draconia descended into the Fire Gate and emerged transformed — the origin of the Draconic lineage.", gradient: "from-red-900 via-orange-800 to-amber-700", accent: "text-orange-400", border: "border-orange-500/30", bg: "bg-orange-500/10" },
  { id: "c2", title: "Alera's Voice Awakening", guardian: "Alera", guardianSlug: "alera", description: "A silent Mage who could not speak her truth — and the moment Otome sang through her for the first time.", gradient: "from-sky-900 via-blue-800 to-indigo-700", accent: "text-sky-300", border: "border-sky-400/30", bg: "bg-sky-400/10" },
  { id: "c3", title: "Lyssandria and the Deep Root", guardian: "Lyssandria", guardianSlug: "lyssandria", description: "Before the first Academy was built, Lyssandria walked alone through the world and laid the Foundation Gate.", gradient: "from-amber-900 via-yellow-800 to-stone-700", accent: "text-amber-400", border: "border-amber-500/30", bg: "bg-amber-500/10" },
  { id: "c4", title: "The Source Remembers", guardian: "Shinkami", guardianSlug: "shinkami", description: "Amaterasu rises only once in an age. This is the chronicle of Shinkami's first awakening at the Source Gate.", gradient: "from-neutral-900 via-yellow-900 to-amber-800", accent: "text-yellow-200", border: "border-yellow-400/30", bg: "bg-yellow-400/10" },
  { id: "c5", title: "Leyla and the Silver Current", guardian: "Leyla", guardianSlug: "leyla", description: "Veloura surfaces only for those who stop swimming and let the current carry them. Leyla's chronicle of trust.", gradient: "from-blue-900 via-cyan-800 to-slate-700", accent: "text-cyan-300", border: "border-cyan-400/30", bg: "bg-cyan-400/10" },
  { id: "c6", title: "Lyria Sees the Becoming", guardian: "Lyria", guardianSlug: "lyria", description: "Yumiko opened all nine tails at once. Lyria saw every timeline simultaneously — and chose this one.", gradient: "from-violet-900 via-purple-800 to-indigo-700", accent: "text-violet-300", border: "border-violet-500/30", bg: "bg-violet-500/10" },
];

// ─── Inline icons ──────────────────────────────────────────────────────────────

function SparklesIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" />
    </svg>
  );
}
function ArrowRight({ className }: { className?: string }) {
  return (
    <svg className={className ?? "w-4 h-4"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
    </svg>
  );
}
function PlayIcon() {
  return (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function RecordsPage() {
  return (
    <div className="relative min-h-screen">
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-cosmic-void" />
        <div className="absolute inset-0 bg-cosmic-mesh" />
        <div className="absolute inset-0 opacity-25 bg-[radial-gradient(ellipse_at_top_left,rgba(153,102,255,0.15),transparent_50%),radial-gradient(ellipse_at_bottom_right,rgba(127,255,212,0.1),transparent_50%)]" />
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Header */}
        <section className="mb-20">
          <div className="relative liquid-glass rounded-3xl overflow-hidden px-8 py-14 sm:px-14">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/10 via-transparent to-crystal/8 pointer-events-none" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-brand-primary/6 rounded-full blur-3xl pointer-events-none" />
            <div className="relative">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-gold/30 bg-brand-gold/10 mb-6">
                <SparklesIcon />
                <span className="text-xs font-mono tracking-widest uppercase text-brand-gold">The Arcanean Records</span>
              </div>
              <h1 className="text-5xl sm:text-6xl font-display font-bold mb-4 leading-none">
                Art, Music &<span className="block text-gradient-brand">Chronicles</span>
              </h1>
              <p className="text-text-secondary font-body text-lg max-w-2xl leading-relaxed">
                From the Ten Gates to the depths of the Source — the visual and sonic records of the Arcanean universe.
                Guardian portraits, world imagery, and chronicles of the moments that shaped creation.
              </p>
            </div>
          </div>
        </section>

        {/* Section 1 — Guardian Portraits */}
        <section className="mb-20">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs font-mono text-text-muted uppercase tracking-widest mb-2">Section 01</p>
              <h2 className="text-2xl font-display font-bold text-text-primary">Guardian Portraits</h2>
              <p className="text-text-secondary font-sans text-sm mt-1">The ten Guardians of the Gates — keepers of Arcanea's creative frequencies</p>
            </div>
            <Link href="/lore/guardians" className="hidden sm:inline-flex items-center gap-2 text-sm font-sans text-text-muted hover:text-text-primary transition-colors">
              View all Guardians <ArrowRight />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {PORTRAITS.map((g) => (
              <Link key={g.slug} href={`/lore/guardians/${g.slug}`}
                className="group relative rounded-2xl overflow-hidden glass border border-white/5 hover:border-white/20 transition-all hover-lift glow-card"
                aria-label={`${g.name} — ${g.gate} Gate`}
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  {g.heroImage ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={g.heroImage} alt={`${g.name}, Guardian of the ${g.gate} Gate`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                  ) : (
                    <div className={`absolute inset-0 bg-gradient-to-br ${g.gradient} opacity-50`} aria-hidden="true" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-cosmic-deep via-cosmic-deep/20 to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className={`text-xs font-mono font-bold px-2 py-1 rounded-lg ${g.bg} ${g.accent} border ${g.border}`}>
                      {String(g.gateNumber).padStart(2, "0")}
                    </span>
                  </div>
                </div>
                <div className="p-3">
                  <p className="font-display font-semibold text-text-primary text-sm group-hover:text-white transition-colors">{g.name}</p>
                  <p className={`text-xs font-mono mt-0.5 ${g.accent}`}>{g.frequency}</p>
                  <p className="text-xs text-text-muted font-sans mt-0.5">{g.element}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Section 2 — World Imagery */}
        <section className="mb-20">
          <div className="mb-8">
            <p className="text-xs font-mono text-text-muted uppercase tracking-widest mb-2">Section 02</p>
            <h2 className="text-2xl font-display font-bold text-text-primary">World Imagery</h2>
            <p className="text-text-secondary font-sans text-sm mt-1">Landscapes, councils, and scenes from across the Arcanean universe</p>
          </div>

          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {HERO_IMAGES.map((img) => (
              <div key={img.id} className="group break-inside-avoid relative rounded-2xl overflow-hidden glass border border-white/5 hover:border-white/20 transition-all glow-card">
                <div className="relative w-full">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img.src} alt={img.title}
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.03]" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-cosmic-deep/70 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <span className={`text-xs font-mono px-2 py-0.5 rounded-md border ${img.border} ${img.accent} bg-cosmic-deep/60 mb-1.5 inline-block`}>
                      {img.guardianTag}
                    </span>
                    <p className="text-sm font-display font-semibold text-white leading-snug">{img.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3 — Chronicles */}
        <section className="mb-20">
          <div className="mb-8">
            <p className="text-xs font-mono text-text-muted uppercase tracking-widest mb-2">Section 03</p>
            <h2 className="text-2xl font-display font-bold text-text-primary">Arcanean Chronicles</h2>
            <p className="text-text-secondary font-sans text-sm mt-1">Video records of the moments that shaped the universe — coming soon</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {CHRONICLES.map((ch) => (
              <Link key={ch.id} href={`/lore/guardians/${ch.guardianSlug}`}
                className="group relative glass rounded-2xl overflow-hidden border border-white/5 hover:border-white/20 transition-all glow-card hover-lift"
              >
                <div className="relative aspect-video overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${ch.gradient}`} aria-hidden="true" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className={`w-16 h-16 rounded-full ${ch.bg} border ${ch.border} flex items-center justify-center ${ch.accent} opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all`}>
                      <PlayIcon />
                    </div>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-cosmic-deep/80 text-text-muted border border-white/10">
                      Coming Soon
                    </span>
                  </div>
                  <div className="absolute top-3 left-3">
                    <span className={`text-xs font-mono px-2 py-0.5 rounded-md border ${ch.border} ${ch.accent} bg-cosmic-deep/70`}>
                      {ch.guardian}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-display font-semibold text-text-primary mb-2 group-hover:text-white transition-colors leading-snug">{ch.title}</h3>
                  <p className="text-sm font-sans text-text-muted leading-relaxed">{ch.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Section 4 — CTA */}
        <section>
          <div className="relative liquid-glass-elevated rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/12 via-transparent to-crystal/10 pointer-events-none" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-crystal/30 to-transparent" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-brand-gold/8 rounded-full blur-3xl pointer-events-none" />
            <div className="relative px-8 py-14 sm:px-14 text-center">
              <div className="w-16 h-16 rounded-2xl mx-auto mb-6 flex items-center justify-center bg-crystal/10 border border-crystal/20">
                <SparklesIcon />
              </div>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-text-primary mb-3">
                Add your creation to the Records
              </h2>
              <p className="text-text-secondary font-body text-lg max-w-xl mx-auto mb-8 leading-relaxed">
                Every creator who enters Arcanea leaves a record. Open the Creation Studio and begin yours.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/studio"
                  className="group inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-sans font-semibold text-base transition-all hover:scale-[1.02] active:scale-[0.98] bg-gradient-to-r from-brand-primary to-crystal text-white shadow-elevation-3"
                >
                  <SparklesIcon />
                  Open Creation Studio
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="/community"
                  className="inline-flex items-center gap-2 px-6 py-4 rounded-2xl font-sans font-medium text-sm text-text-secondary border border-white/10 hover:border-white/20 hover:text-text-primary glass transition-all"
                >
                  Browse Community <ArrowRight />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
