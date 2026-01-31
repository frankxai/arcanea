'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Menu, X, Sparkles, Zap, Shield } from 'lucide-react'

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
      
      // Update active section based on scroll position
      const sections = ['home', 'features', 'guardians', 'pricing', 'testimonials']
      const currentSection = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      
      if (currentSection) {
        setActiveSection(currentSection)
      }
      
      // Handle route-based active states
      const path = window.location.pathname
      if (path === '/chat') setActiveSection('chat')
      else if (path === '/imagine') setActiveSection('imagine')
      else if (path === '/prompt-books') setActiveSection('prompt-books')
      else if (path === '/character-book') setActiveSection('character-book')
      else if (path === '/world-builder') setActiveSection('world-builder')
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { id: 'home', label: 'Home', href: '/' },
    { id: 'features', label: 'Features', href: '/#features' },
    { id: 'guardians', label: 'Guardians', href: '/#guardians' },
    { id: 'pricing', label: 'Pricing', href: '/#pricing' },
    { id: 'chat', label: 'AI Chat', href: '/chat' },
    { id: 'imagine', label: 'Create', href: '/imagine' },
    { id: 'prompt-books', label: 'Prompt Books', href: '/prompt-books' },
    { id: 'character-book', label: 'Characters', href: '/character-book' },
    { id: 'world-builder', label: 'Worlds', href: '/world-builder' },
  ]

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-arcane-shadow/95 backdrop-blur-md border-b border-arcane-crystal/20' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-arcane-crystal to-arcane-fire rounded-lg flex items-center justify-center transform group-hover:rotate-180 transition-transform duration-500">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-display text-white group-hover:text-arcane-crystal transition-colors">
              Arcanea
            </span>
            <Badge variant="crystal" className="text-xs ml-2">
              BETA
            </Badge>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className={`text-sm font-medium transition-all duration-200 hover:text-arcane-crystal ${
                  activeSection === item.id || window.location.pathname === item.href
                    ? 'text-arcane-crystal'
                    : 'text-arcane-300'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost" size="sm" className="text-arcane-300 hover:text-arcane-crystal border-arcane-crystal/30">
              Sign In
            </Button>
            <Button size="sm" className="bg-gradient-to-r from-arcane-crystal to-arcane-fire hover:from-arcane-crystal/80 hover:to-arcane-fire/80">
              Start Creating
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-arcane-300 hover:text-arcane-crystal transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-arcane-shadow/98 backdrop-blur-md border-t border-arcane-crystal/20">
            <div className="px-4 py-6 space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-arcane-300 hover:text-arcane-crystal font-medium transition-colors"
                >
                  {item.label}
                </Link>
              ))}
              
              <div className="pt-4 border-t border-arcane-cosmic/30 space-y-3">
                <Button variant="ghost" className="w-full text-arcane-300 hover:text-arcane-crystal border-arcane-crystal/30">
                  Sign In
                </Button>
                <Button className="w-full bg-gradient-to-r from-arcane-crystal to-arcane-fire hover:from-arcane-crystal/80 hover:to-arcane-fire/80">
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