import type { Metadata } from 'next'
import { Navbar } from '@/components/navigation'
import { MusicPageClient } from './client'

export const metadata: Metadata = {
  title: 'Music of Arcanea | Songs of the Living World',
  description:
    'The official soundtrack of Arcanea. From the awakening hymn to the Golden Frequency Choir — music created with AI for a world that breathes.',
  openGraph: {
    title: 'Music of Arcanea | Songs of the Living World',
    description: 'The official soundtrack of Arcanea — 14 songs spanning orchestral choirs, arena rock, and healing frequencies.',
    images: ['/og-music.png'],
  },
}

export default function MusicPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <MusicPageClient />
    </div>
  )
}
