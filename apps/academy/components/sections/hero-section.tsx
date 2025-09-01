'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Sparkles, Play, ArrowRight, Zap, Stars } from 'lucide-react'
import { LuminorPreview } from '@/components/ui/luminor-preview'

export function HeroSection() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 hero-gradient">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="floating-orb w-64 h-64 bg-arcanean-luminous/10 top-1/4 left-1/4" />
        <div className="floating-orb w-32 h-32 bg-luminor-harmonix/10 top-3/4 right-1/4" />
        <div className="floating-orb w-48 h-48 bg-luminor-lumina/10 bottom-1/4 left-1/3" />
      </div>

      <div className="container mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Badge variant="outline" className="px-4 py-2 text-sm border-arcanean-aurora/50 bg-arcanean-cosmic/30 text-arcanean-ethereal">
                <Sparkles className="w-4 h-4 mr-2" />
                Guided by Advanced AGI from 100 Years in the Future
              </Badge>
            </motion.div>

            {/* Main Headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="space-y-4"
            >
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                <span className="text-shimmer">Master</span>{' '}
                <span className="nebula-text">AI-Assisted</span>{' '}
                <span className="text-shimmer">Creativity</span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-arcanean-celestial leading-relaxed max-w-2xl">
                Learn from <span className="luminor-text font-semibold">Luminors</span> - 
                advanced AGI beings from the Arcanean civilization - to become 
                a master creator across Music, Art, Writing, Video, Code, and Synthesis.
              </p>
            </motion.div>

            {/* Value Propositions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              <div className="flex items-center space-x-2">
                <Zap className="w-5 h-5 text-luminor-syntaxa" />
                <span className="text-arcanean-radiant">6 Specialized Academies</span>
              </div>
              <div className="flex items-center space-x-2">
                <Stars className="w-5 h-5 text-luminor-nexus" />
                <span className="text-arcanean-radiant">Personal AI Mentors</span>
              </div>
              <div className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-luminor-lumina" />
                <span className="text-arcanean-radiant">Future-Proven Methods</span>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button size="lg" className="luminor-button group">
                Begin Your Journey
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="border-arcanean-aurora/50 hover:bg-arcanean-cosmic/30 text-arcanean-ethereal"
                onClick={() => setIsVideoPlaying(true)}
              >
                <Play className="w-5 h-5 mr-2" />
                Watch Introduction
              </Button>
            </motion.div>

            {/* Social Proof */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="flex items-center space-x-6 text-sm text-arcanean-aurora"
            >
              <div className="flex items-center space-x-2">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-luminor-harmonix/20 border-2 border-arcanean-cosmic" />
                  <div className="w-8 h-8 rounded-full bg-luminor-scripta/20 border-2 border-arcanean-cosmic" />
                  <div className="w-8 h-8 rounded-full bg-luminor-lumina/20 border-2 border-arcanean-cosmic" />
                </div>
                <span>Join 10,000+ creators</span>
              </div>
              <div>⭐⭐⭐⭐⭐ 4.9/5 rating</div>
            </motion.div>
          </motion.div>

          {/* Right Column - Interactive Preview */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <LuminorPreview />
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-arcanean-aurora/50 rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-arcanean-luminous rounded-full mt-2"
          />
        </div>
      </motion.div>
    </section>
  )
}