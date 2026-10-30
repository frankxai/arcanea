import type { Metadata } from 'next';
import Link from 'next/link';
import AtlasClient from './atlas-client';
export const metadata: Metadata = {
 title: 'Creature Atlas | Arcanea',
 description: 'A growing research lexicon of imagined animals, living traditions and original creature proposals, with sources and provenance.',
 robots: {index: false, follow: true},
};
export default function CreatureAtlasPage() {
 return <main className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
  <nav aria-label="Atlas context" className="mb-12 flex flex-wrap gap-6 text-sm text-neutral-400"><Link href="/gallery">← Gallery</Link><Link href="/library">Library</Link><span>Research preview</span></nav>
  <header className="mb-12 max-w-3xl"><p className="mb-5 text-xs uppercase tracking-[0.3em] text-amber-200/80">Arcanea · Field studies</p><h1 className="font-serif text-5xl leading-tight sm:text-7xl">A world of creatures.<br/><span className="text-amber-100">Every origin matters.</span></h1><p className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-400">Explore source traditions, authored worlds and new proposals. Follow the evidence behind each name and keep visual references distinct from permission to reuse them.</p></header>
  <AtlasClient />
 </main>;
}
