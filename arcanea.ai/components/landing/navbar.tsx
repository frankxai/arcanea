'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-arcane-shadow/95 backdrop-blur-md border-b border-arcane-crystal/20' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-arcane-crystal to-arcane-fire rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <span className="text-xl font-display text-arcane-crystal">Arcanea.ai</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/studio" className="text-arcane-300 hover:text-arcane-crystal transition-colors">
              Spatial Studio
            </Link>
            <Link href="/guardians" className="text-arcane-300 hover:text-arcane-crystal transition-colors">
              Guardians
            </Link>
            <Link href="/pricing" className="text-arcane-300 hover:text-arcane-crystal transition-colors">
              Pricing
            </Link>
            <Link href="https://arcanea.io" className="text-arcane-300 hover:text-arcane-crystal transition-colors">
              Community
            </Link>
            <Link href="https://developers.arcanea.ai" className="text-arcane-300 hover:text-arcane-crystal transition-colors">
              Developers
            </Link>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/sign-in">Sign In</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/sign-up">Start Creating</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-arcane-300 hover:text-arcane-crystal p-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-arcane-shadow/95 backdrop-blur-md border-t border-arcane-crystal/20">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link href="/studio" className="block px-3 py-2 text-arcane-300 hover:text-arcane-crystal">
                Spatial Studio
              </Link>
              <Link href="/guardians" className="block px-3 py-2 text-arcane-300 hover:text-arcane-crystal">
                Guardians
              </Link>
              <Link href="/pricing" className="block px-3 py-2 text-arcane-300 hover:text-arcane-crystal">
                Pricing
              </Link>
              <Link href="https://arcanea.io" className="block px-3 py-2 text-arcane-300 hover:text-arcane-crystal">
                Community
              </Link>
              <Link href="https://developers.arcanea.ai" className="block px-3 py-2 text-arcane-300 hover:text-arcane-crystal">
                Developers
              </Link>
              <div className="pt-4 space-y-2">
                <Button variant="ghost" size="sm" className="w-full">
                  Sign In
                </Button>
                <Button size="sm" className="w-full">
                  Start Creating
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}