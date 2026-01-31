'use client'

import Navigation from '@/components/layout/navigation'
import Footer from '@/components/landing/footer'
import CharacterBookSystem from '@/components/character-book/CharacterBookSystem'

export default function CharacterBookPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-arcane-cosmic via-arcane-shadow to-arcane-cosmic">
      <Navigation />
      
      <main className="pt-20">
        <CharacterBookSystem />
      </main>
      
      <Footer />
    </div>
  )
}
