import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Arcanea Realms | Infinite Worlds",
  description: "Build and explore limitless worlds with AI-powered realm generation. Every realm tells a story, every story shapes reality.",
};

export default function RealmsPage() {
  return (
    <div className="relative min-h-screen">
      <nav className="glass rounded-xl px-4 py-3 flex items-center justify-between sticky top-4 z-10 mx-4 mt-4">
        <div className="font-semibold tracking-wide">Arcanea Realms</div>
        <div className="flex items-center gap-4 text-sm">
          <Link href="https://arcanea.ai" className="hover:underline">Hub</Link>
          <Link href="https://chat.arcanea.ai" className="hover:underline">Chat</Link>
          <Link href="https://studio.arcanea.ai" className="hover:underline">Studio</Link>
          <Link href="https://library.arcanea.ai" className="hover:underline">Library</Link>
        </div>
      </nav>

      <main className="mx-auto max-w-6xl px-4 py-16">
        <header className="relative overflow-hidden rounded-2xl panel p-10">
          <div className="absolute inset-0 opacity-40 bg-[radial-gradient(500px_300px_at_30%_20%,rgba(127,255,212,0.22),transparent),radial-gradient(600px_400px_at_70%_30%,rgba(120,166,255,0.22),transparent)]" />
          <div className="relative">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              <span className="aurora-text">Infinite realms</span> await your creation
            </h1>
            <p className="muted mt-4 text-lg max-w-2xl">
              Build and explore limitless worlds with AI-powered realm generation. Every realm tells a story, every story shapes reality.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button className="rounded-md bg-[color:var(--accent,#78a6ff)] px-5 py-3 font-semibold text-black">
                Enter Realms
              </button>
              <button className="rounded-md border border-[color:var(--accent,#78a6ff)] px-5 py-3 font-semibold">
                Browse Gallery
              </button>
            </div>
          </div>
        </header>

        <section className="mt-10 text-center">
          <p className="muted text-lg">Coming Soon - Realm Builder Interface</p>
          <p className="muted text-sm mt-2">Where imagination becomes infinite reality</p>
        </section>
      </main>
    </div>
  );
}
