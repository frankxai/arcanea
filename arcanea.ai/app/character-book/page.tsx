'use client'

import { useEffect, useState } from 'react'
import Navigation from '@/components/layout/navigation'
import Footer from '@/components/landing/footer'
import dynamic from 'next/dynamic'

const CharacterBookSystem = dynamic(
  () => import('@/components/character-book/CharacterBookSystem'),
  { ssr: false }
)

export default function CharacterBookPage() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-arcane-cosmic via-arcane-shadow to-arcane-cosmic">
      <Navigation />

      <main className="pt-20">
        {isClient && <CharacterBookSystem />}
      </main>

      <Footer />
    </div>
  )
}
