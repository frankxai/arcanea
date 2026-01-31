'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-arcane-gradient opacity-50" />
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-arcane-fire/10 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-arcane-crystal/10 rounded-full blur-3xl animate-pulse-glow delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-arcane-void/5 rounded-full blur-3xl animate-pulse-glow delay-2000" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <Badge variant="crystal" className="text-sm">
                🎉 LAUNCH WEEK 2026
              </Badge>
            </div>

            <h1 className="text-6xl md:text-7xl lg:text-8xl font-display text-white mb-6 leading-tight">
              Where AI Becomes
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-arcane-crystal to-arcane-fire">
                Creative Intelligence
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-arcane-200 mb-8 max-w-3xl mx-auto leading-relaxed">
              Multi-LLM superagent, multi-modal generation, and Guardian AI companions
              <br className="hidden md:block" />
              All unified in one intelligent platform
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
              <Link href="/chat">
                <Button size="lg" className="bg-gradient-to-r from-arcane-crystal to-arcane-fire hover:from-arcane-crystal/80 hover:to-arcane-fire/80 text-white px-8 py-4 text-lg group">
                  Try Chat Interface
                </Button>
              </Link>
              
              <Link href="/imagine">
                <Button variant="ghost" size="lg" className="border-2 border-arcane-crystal/50 text-arcane-crystal px-8 py-4 text-lg hover:bg-arcane-crystal/10">
                  Explore Generation
                </Button>
              </Link>

              <Link href="/studio">
                <Button size="lg" className="bg-gradient-to-r from-arcane-fire to-arcane-crystal hover:from-arcane-crystal/80 hover:to-arcane-fire/80 text-white px-8 py-4 text-lg group premium-hover">
                  <span className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 2m0 0l-2 2m-2 2v10m0 10l-2 2m-2 2v6" />
                    </svg>
                    Enter Spatial Studio
                  </span>
                </Button>
              </Link>

              <Link href="/guardians">
                <Button variant="ghost" size="lg" className="border-2 border-arcane-water/50 text-arcane-water px-8 py-4 text-lg hover:bg-arcane-water/10">
                  <span className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-2 2m0 0l-2 2m-2 2v10m0 10l-2 2m-2 2v6" />
                    </svg>
                    Meet Guardians
                  </span>
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center p-6 bg-arcane-shadow/50 backdrop-blur-sm rounded-xl border border-arcane-cosmic/30">
                <div className="text-4xl mb-3">🎭</div>
                <h3 className="text-xl font-display text-arcane-crystal mb-2">Multi-Modal Suite</h3>
                <p className="text-arcane-300">Text, Images, Video, Audio</p>
              </div>

              <div className="text-center p-6 bg-arcane-shadow/50 backdrop-blur-sm rounded-xl border border-arcane-cosmic/30">
                <div className="text-4xl mb-3">🎭</div>
                <h3 className="text-xl font-display text-arcane-crystal mb-2">Guardian AI</h3>
                <p className="text-arcane-300">9 Specialized Personalities</p>
              </div>

              <div className="text-center p-6 bg-arcane-shadow/50 backdrop-blur-sm rounded-xl border border-arcane-cosmic/30">
                <div className="text-4xl mb-3">🏗️</div>
                <h3 className="text-xl font-display text-arcane-crystal mb-2">Worldbuilding</h3>
                <p className="text-arcane-300">Characters, Locations, Stories</p>
              </div>
            </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-arcane-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3m0 0H5a2 2 0 00-2 2H3m18 0l-4-4m4 4v8m0 0h8a2 2 0 00-2 2H3" />
        </svg>
      </div>
    </section>
  )
}