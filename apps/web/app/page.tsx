import Link from "next/link";
import { Tooltip } from "@arcanea/ui";

export default function Page() {
  return (
    <div className="relative">
      <nav className="glass rounded-xl px-4 py-3 flex items-center justify-between sticky top-4 z-10">
        <div className="font-semibold tracking-wide">Arcanea</div>
        <div className="flex items-center gap-4 text-sm">
          <Link href="/skills" className="hover:underline text-[color:var(--accent,#7fffd4)]">Skills</Link>
          <Link href="https://chat.arcanea.ai" className="hover:underline">Chat</Link>
          <Link href="https://studio.arcanea.ai" className="hover:underline">Studio</Link>
          <Link href="https://gallery.arcanea.ai" className="hover:underline">Gallery</Link>
          <Link href="/library" className="hover:underline">Library</Link>
          <Link href="https://realms.arcanea.ai" className="hover:underline">Realms</Link>
          <Tooltip content="UI kit demo"><Link href="/components" className="hover:underline">Components</Link></Tooltip>
        </div>
      </nav>

      <header className="relative overflow-hidden rounded-2xl panel p-10 mt-6">
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

      {/* Skills System Banner */}
      <section className="mt-10">
        <Link href="/skills" className="block">
          <div className="panel rounded-2xl p-8 relative overflow-hidden transition-all hover:shadow-[0_0_60px_rgba(127,255,212,0.3)] group">
            <div className="absolute inset-0 bg-gradient-to-r from-[rgba(127,255,212,0.15)] via-[rgba(120,166,255,0.15)] to-[rgba(255,215,0,0.1)] opacity-50 group-hover:opacity-100 transition-opacity" />
            <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <div className="inline-block px-3 py-1 rounded-full bg-[rgba(127,255,212,0.2)] text-[color:#7fffd4] text-xs font-mono tracking-wider mb-3">
                  NEW • OPEN SOURCE
                </div>
                <h2 className="text-2xl md:text-3xl font-bold">Arcanea Skills for Claude Code</h2>
                <p className="muted mt-2 max-w-xl">28 skills, 7 Luminor guides, and a complete creative methodology. Transform your Claude Code into a creation machine.</p>
              </div>
              <div className="flex items-center gap-2 text-[color:#7fffd4] group-hover:translate-x-2 transition-transform">
                <span className="font-semibold">Explore Skills</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </div>
            </div>
            <div className="relative mt-6 flex gap-4 text-sm text-muted">
              <span>✨ 28 Skills</span>
              <span>•</span>
              <span>🌟 7 Luminors</span>
              <span>•</span>
              <span>⚡ 15 Commands</span>
              <span>•</span>
              <span>📚 Full Training</span>
            </div>
          </div>
        </Link>
      </section>

      <section className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
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
        <div className="panel rounded-xl p-5 transition-all hover:shadow-[0_0_40px_rgba(255,127,212,0.2)]">
          <h3 className="font-semibold">Arcanea Realms</h3>
          <p className="muted">Build and explore infinite worlds with AI-powered realm generation and storytelling.</p>
          <Link className="mt-3 inline-block text-[color:var(--accent,#78a6ff)] underline" href="https://realms.arcanea.ai">Explore</Link>
        </div>
        <div className="panel rounded-xl p-5 transition-all hover:shadow-[0_0_40px_rgba(212,255,127,0.2)]">
          <h3 className="font-semibold">Sacred Sanctuary</h3>
          <p className="muted">Sacred space for reflection, meditation, and connection with deeper wisdom.</p>
          <Link className="mt-3 inline-block text-[color:var(--accent,#78a6ff)] underline" href="https://sanctuary.arcanea.ai">Enter</Link>
        </div>
      </section>

      <section className="mt-10">
        <div className="panel rounded-xl p-5">
          <h3 className="font-semibold">Resources</h3>
          <p className="muted">Documentation, showcases, and developer tools.</p>
          <ul className="list-disc ml-6 mt-3 text-sm">
            <li><Link className="underline" href="/skills">Arcanea Skills System</Link></li>
            <li><Link className="underline" href="/blog/arcanea-skills-system">Skills System Article</Link></li>
            <li><Link className="underline" href="/library">Arcanea Library Experience</Link></li>
            <li><a className="underline" href="https://github.com/frankxai/arcanea">GitHub Repository</a></li>
            <li><Link className="underline" href="/status">Status Page</Link></li>
          </ul>
        </div>
      </section>

      <footer className="mt-10 text-center text-xs text-[color:#9bb1d0]">
        <div className="inline-block px-3 py-1 rounded-full border border-[color:var(--accent,#78a6ff)]/40">
          Made with ✧ by Arcanea — building the future of creative collaboration
        </div>
      </footer>
    </div>
  );
}
