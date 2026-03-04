'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Music2, Play, ExternalLink, Headphones, Sparkles, Radio } from 'lucide-react'
import musicData from '@/data/arcanea-music.json'

type Track = {
  sunoId: string
  title: string
  subtitle?: string | null
  genre: string[]
  lore: string
  guardian?: string | null
  plays?: number | null
  audioUrl: string
  coverUrl: string
  embedUrl: string
  sunoUrl: string
}

function TrackEmbed({ track, isActive, onSelect }: { track: Track; isActive: boolean; onSelect: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
        isActive
          ? 'border-atlantean-teal/40 bg-atlantean-deep/20'
          : 'border-white/5 bg-white/[0.02] hover:border-white/10 hover:bg-white/[0.04]'
      }`}
    >
      {/* Header */}
      <button
        onClick={onSelect}
        className="w-full text-left p-5 flex items-start gap-4"
      >
        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-atlantean-teal/20 to-creation-prism-purple/20 flex items-center justify-center border border-atlantean-teal/10">
          <Play className="w-5 h-5 text-atlantean-teal ml-0.5" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-display font-semibold text-white text-sm leading-snug">
                {track.title}
                {track.subtitle && (
                  <span className="text-white/40 font-normal ml-1.5">({track.subtitle})</span>
                )}
              </h3>
              <p className="text-xs text-atlantean-teal/70 mt-0.5">{track.genre.join(' · ')}</p>
            </div>
            {track.plays && (
              <span className="text-xs text-white/30 flex-shrink-0">{track.plays} plays</span>
            )}
          </div>
          <p className="text-xs text-white/40 mt-2 leading-relaxed line-clamp-2 italic font-serif">
            &ldquo;{track.lore}&rdquo;
          </p>
        </div>
      </button>

      {/* Expanded embed */}
      {isActive && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="border-t border-atlantean-teal/10"
        >
          <iframe
            src={track.embedUrl}
            className="w-full h-[200px]"
            style={{ border: 'none' }}
            allow="autoplay; clipboard-write"
            loading="lazy"
            title={track.title}
          />
          <div className="px-5 py-3 flex items-center justify-end">
            <a
              href={track.sunoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-atlantean-teal hover:text-atlantean-glow transition-colors"
            >
              Open in Suno
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}

export function MusicPageClient() {
  const [activeTrack, setActiveTrack] = useState<string | null>(null)
  const [activeSection, setActiveSection] = useState<'featured' | 'frequencies'>('featured')

  const featured = musicData.featured as Track[]
  const frequencies = musicData.golden_frequencies as Track[]

  return (
    <main className="relative min-h-screen pt-24 pb-32">
      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-1/3 w-[600px] h-[600px] rounded-full opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(38, 204, 204, 0.06) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
        <div
          className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(140, 61, 245, 0.08) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6">

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-atlantean-teal/20 bg-atlantean-teal/5 mb-8">
            <Headphones className="w-3.5 h-3.5 text-atlantean-teal" />
            <span className="text-xs font-medium text-atlantean-teal uppercase tracking-widest">Arcanea Soundscapes</span>
          </div>

          <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-5 tracking-tight leading-[1.05]">
            Music of the{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-atlantean-teal to-creation-prism-purple">
              Living World
            </span>
          </h1>

          <p className="text-lg text-white/50 max-w-2xl mx-auto leading-relaxed font-serif">
            Every realm breathes through sound. These tracks were forged with AI —
            each one carrying a fragment of Arcanean lore, ready to score your sessions,
            rituals, and world-building moments.
          </p>

          <div className="flex items-center justify-center gap-4 mt-8">
            <a
              href={musicData.suno_links.arcanean_choir_playlist}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-atlantean-teal/10 border border-atlantean-teal/20 text-atlantean-teal text-sm font-medium hover:bg-atlantean-teal/20 transition-all"
            >
              <Music2 className="w-4 h-4" />
              Arcanean Choir Playlist
            </a>
            <a
              href={musicData.suno_links.profile}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/10 text-white/60 text-sm font-medium hover:border-white/20 hover:text-white transition-all"
            >
              <ExternalLink className="w-4 h-4" />
              @frankx on Suno
            </a>
          </div>
        </motion.div>

        {/* Section tabs */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-white/[0.03] border border-white/5 w-fit mx-auto mb-12">
          <button
            onClick={() => setActiveSection('featured')}
            className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
              activeSection === 'featured'
                ? 'bg-atlantean-teal/15 text-atlantean-teal border border-atlantean-teal/20'
                : 'text-white/50 hover:text-white'
            }`}
          >
            <span className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              Arcanea Anthems
            </span>
          </button>
          <button
            onClick={() => setActiveSection('frequencies')}
            className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
              activeSection === 'frequencies'
                ? 'bg-creation-prism-purple/15 text-creation-prism-purple border border-creation-prism-purple/20'
                : 'text-white/50 hover:text-white'
            }`}
          >
            <span className="flex items-center gap-2">
              <Radio className="w-3.5 h-3.5" />
              Golden Frequencies
            </span>
          </button>
        </div>

        {/* Arcanea Anthems */}
        {activeSection === 'featured' && (
          <motion.div
            key="featured"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-6">
              <h2 className="font-display text-xl font-semibold text-white mb-1">Arcanea Anthems</h2>
              <p className="text-sm text-white/40">
                The defining songs of the world — direct invocations of the Arcanean universe.
              </p>
            </div>

            <div className="space-y-3">
              {featured.map((track) => (
                <TrackEmbed
                  key={track.sunoId}
                  track={track}
                  isActive={activeTrack === track.sunoId}
                  onSelect={() => setActiveTrack(activeTrack === track.sunoId ? null : track.sunoId)}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* Golden Frequencies */}
        {activeSection === 'frequencies' && (
          <motion.div
            key="frequencies"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-6">
              <h2 className="font-display text-xl font-semibold text-white mb-1">Golden Frequencies</h2>
              <p className="text-sm text-white/40">
                Neoclassical and choral soundscapes tuned to 528hz — the resonance of the Forge.
                Use these for world-building sessions, writing rituals, and deep focus.
              </p>
            </div>

            <div className="space-y-3">
              {frequencies.map((track) => (
                <TrackEmbed
                  key={track.sunoId}
                  track={track}
                  isActive={activeTrack === track.sunoId}
                  onSelect={() => setActiveTrack(activeTrack === track.sunoId ? null : track.sunoId)}
                />
              ))}
            </div>

            <div className="mt-8 p-5 rounded-2xl border border-creation-prism-purple/10 bg-creation-prism-purple/5 text-center">
              <p className="text-sm text-white/50 mb-3">
                Full Golden Frequencies playlist on Suno — 9 tracks
              </p>
              <a
                href={musicData.suno_links.golden_frequencies_playlist}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-creation-prism-purple hover:text-creation-prism-purple/80 transition-colors font-medium"
              >
                Open Golden Frequencies Playlist
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        )}

        {/* All Suno links reference */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-20 pt-12 border-t border-white/5 text-center"
        >
          <p className="text-xs text-white/25 mb-4">14 Arcanea songs · All created with Suno AI</p>
          <div className="flex flex-wrap justify-center gap-2">
            {musicData.suno_links.all_arcanea_songs.map((url) => {
              const id = url.split('/').pop() || ''
              const allTracks = [...featured, ...frequencies]
              const track = allTracks.find((t) => t.sunoId === id)
              return (
                <a
                  key={id}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-white/20 hover:text-atlantean-teal/60 transition-colors px-2 py-1 rounded border border-white/5 hover:border-atlantean-teal/10"
                  title={track?.title || id}
                >
                  {track?.title ? track.title.slice(0, 20) : id.slice(0, 8) + '...'}
                </a>
              )
            })}
          </div>
        </motion.div>

      </div>
    </main>
  )
}
