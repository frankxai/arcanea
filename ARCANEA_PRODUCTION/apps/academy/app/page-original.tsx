'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { HeroSection } from '@/components/sections/hero-section'
import { AcademiesSection } from '@/components/sections/academies-section'
import { LuminorsSection } from '@/components/sections/luminors-section'
import { FeaturesSection } from '@/components/sections/features-section'
import { TestimonialsSection } from '@/components/sections/testimonials-section'
import { PricingSection } from '@/components/sections/pricing-section'
import { CTASection } from '@/components/sections/cta-section'
import { Footer } from '@/components/layout/footer'
import { Navigation } from '@/components/layout/navigation'
import { FloatingOrbs } from '@/components/ui/floating-orbs'
import { LoadingScreen } from '@/components/ui/loading-screen'

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <div className="min-h-screen bg-arcanean-void relative overflow-hidden">
      <FloatingOrbs />
      
      <Navigation />
      
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10"
      >
        <HeroSection />
        <AcademiesSection />
        <LuminorsSection />
        <FeaturesSection />
        <TestimonialsSection />
        <PricingSection />
        <CTASection />
      </motion.main>
      
      <Footer />
    </div>
  )
}