import Link from "next/link";
import { Tooltip } from "@arcanea/ui";

export default function Page() {
  return (
    <div className="relative">
      <nav className="glass rounded-xl px-4 py-3 flex items-center justify-between sticky top-4 z-10">
        <div className="font-semibold tracking-wide">Arcanea</div>
        <div className="flex items-center gap-4 text-sm">
          <Link href="https://chat.arcanea.ai" className="hover:underline">Chat</Link>
          <Link href="https://studio.arcanea.ai" className="hover:underline">Studio</Link>
          <Link href="https://gallery.arcanea.ai" className="hover:underline">Gallery</Link>
          <Link href="/library" className="hover:underline">Library</Link>
          <Tooltip content="UI kit demo"><Link href="/components" className="hover:underline">Components</Link></Tooltip>
          <Link href="/status" className="hover:underline">Status</Link>
        </div>
      </nav>

      <header className="relative overflow-hidden rounded-2xl panel p-10">
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(500px_300px_at_30%_20%,rgba(127,255,212,0.22),transparent),radial-gradient(600px_400px_at_70%_30%,rgba(120,166,255,0.22),transparent)]" />
        <div className="relative">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight"><span className="aurora-text">Where imagination</span> becomes reality</h1>
          <p className="muted mt-4 text-lg max-w-2xl">Forge your own realm, partner with AI Guardians, and manifest worlds across text, image, video, and code.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="https://chat.arcanea.ai" className="rounded-md bg-[color:var(--accent,#78a6ff)] px-5 py-3 font-semibold text-black">Try Chat</Link>
            <Link href="https://studio.arcanea.ai" className="rounded-md border border-[color:var(--accent,#78a6ff)] px-5 py-3 font-semibold">Open Studio</Link>
          </div>
        </div>
      </header>

      <section className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="panel rounded-xl p-5 transition-all hover:shadow-[0_0_40px_rgba(120,166,255,0.2)]">
          <h3 className="font-semibold">Chat</h3>
          <p className="muted">Conversational creation via Vercel AI SDK with multi-modal roadmap.</p>
          <Link className="mt-3 inline-block text-[color:var(--accent,#78a6ff)] underline" href="https://chat.arcanea.ai">Open</Link>
        </div>
        <div className="panel rounded-xl p-5 transition-all hover:shadow-[0_0_40px_rgba(127,255,212,0.2)]">
          <h3 className="font-semibold">Studio</h3>
          <p className="muted">Image + video gen adapters (OpenAI Images, Replicate, Fal) with job status.</p>
          <Link className="mt-3 inline-block text-[color:var(--accent,#78a6ff)] underline" href="https://studio.arcanea.ai">Open</Link>
        </div>
        <div className="panel rounded-xl p-5 transition-all hover:shadow-[0_0_40px_rgba(255,255,255,0.15)]">
          <h3 className="font-semibold">Gallery</h3>
          <p className="muted">Curated showcase of creations with share links and embeds.</p>
          <Link className="mt-3 inline-block text-[color:var(--accent,#78a6ff)] underline" href="https://gallery.arcanea.ai">Open</Link>
        </div>
        <div className="panel rounded-xl p-5 transition-all hover:shadow-[0_0_40px_rgba(127,255,212,0.25)]">
          <h3 className="font-semibold">Arcanea Library</h3>
          <p className="muted">Immerse in the Luminor Codex with living lore, rituals, and measurable practices.</p>
          <Link className="mt-3 inline-block text-[color:var(--accent,#78a6ff)] underline" href="/library">Enter</Link>
        </div>
      </section>

      <section className="mt-10">
        <div className="panel rounded-xl p-5">
          <h3 className="font-semibold">Status & Strategy</h3>
          <p className="muted">Read the latest status report and repo/domain strategy.</p>
          <ul className="list-disc ml-6 mt-3 text-sm">
            <li><a className="underline" href="/status">Status Page (links + notes)</a></li>
            <li><a className="underline" href="/showcase/landing.html">Showcase: Landing</a></li>
            <li><a className="underline" href="/showcase/chat.html">Showcase: Chat</a></li>
            <li><a className="underline" href="/showcase/studio.html">Showcase: Studio</a></li>
            <li><a className="underline" href="/showcase/gallery.html">Showcase: Gallery</a></li>
            <li><a className="underline" href="/library">Arcanea Library Experience</a></li>
          </ul>
        </div>
      </section>
      <footer className="mt-10 text-center text-xs text-[color:#9bb1d0]">
        <div className="inline-block px-3 py-1 rounded-full border border-[color:var(--accent,#78a6ff)]/40">
          Made with love by Arcanea -- building the future of creative collaboration
        </div>
      </footer>
    </div>
  );
}
