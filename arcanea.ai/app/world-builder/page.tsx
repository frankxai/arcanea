'use client'

import Navigation from '@/components/layout/navigation'
import Footer from '@/components/landing/footer'
import WorldBuilderSystem from '@/components/world-builder/WorldBuilderSystem'

export default function WorldBuilderPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-arcane-cosmic via-arcane-shadow to-arcane-cosmic">
      <Navigation />
      
      <main className="pt-20">
        <WorldBuilderSystem />
      </main>
      
      <Footer />
    </div>
  )
}
