'use client'

import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  ArrowRight, 
  Sparkles, 
  Star, 
  Users,
  Zap,
  Crown,
  Play,
  Shield
} from 'lucide-react'

export default function CTASection() {
  const [email, setEmail] = useState('')

  return (
    <section className="py-24 bg-gradient-to-br from-arcane-fire/20 via-arcane-void/30 to-arcane-crystal/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Header */}
          <Badge variant="gold" className="mb-6">
            <Crown className="w-4 h-4 mr-2" />
            LIMITED TIME
          </Badge>
          
          <h2 className="text-4xl md:text-6xl font-display text-white mb-6 leading-tight">
            Ready to Create
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-arcane-crystal to-arcane-fire">
              Something Amazing?
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl text-arcane-200 mb-12 max-w-3xl mx-auto leading-relaxed">
            Join thousands of creators who are already using Arcanea to build worlds, tell stories, and push the boundaries of imagination.
          </p>

          {/* Email Signup */}
          <div className="bg-arcane-shadow/80 backdrop-blur-sm rounded-2xl border border-arcane-crystal/30 p-8 mb-12">
            <h3 className="text-2xl font-display text-arcane-crystal mb-4">
              Start Your Creative Journey
            </h3>
            <p className="text-arcane-300 mb-6">
              Get instant access to all Guardian AI companions and start creating today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-arcane-cosmic/50 border border-arcane-cosmic/30 text-white placeholder-arcane-400 focus:outline-none focus:border-arcane-crystal/50 focus:bg-arcane-cosmic/70"
              />
              <Button size="lg" className="bg-gradient-to-r from-arcane-crystal to-arcane-fire hover:from-arcane-crystal/80 hover:to-arcane-fire/80 text-white px-8 py-3">
                <Sparkles className="w-5 h-5 mr-2" />
                Get Started Free
              </Button>
            </div>
            <p className="text-sm text-arcane-400 mt-4">
              No credit card required. 14-day free trial.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center p-6 bg-arcane-shadow/50 backdrop-blur-sm rounded-xl border border-arcane-cosmic/30">
              <Users className="w-8 h-8 text-arcane-crystal mx-auto mb-3" />
              <div className="text-3xl font-bold text-white mb-2">10,000+</div>
              <div className="text-arcane-300">Active Creators</div>
            </div>
            
            <div className="text-center p-6 bg-arcane-shadow/50 backdrop-blur-sm rounded-xl border border-arcane-cosmic/30">
              <Zap className="w-8 h-8 text-arcane-fire mx-auto mb-3" />
              <div className="text-3xl font-bold text-white mb-2">1M+</div>
              <div className="text-arcane-300">AI Generations</div>
            </div>
            
            <div className="text-center p-6 bg-arcane-shadow/50 backdrop-blur-sm rounded-xl border border-arcane-cosmic/30">
              <Star className="w-8 h-8 text-arcane-gold mx-auto mb-3" />
              <div className="text-3xl font-bold text-white mb-2">98%</div>
              <div className="text-arcane-300">Satisfaction Rate</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-arcane-crystal to-arcane-fire hover:from-arcane-crystal/80 hover:to-arcane-fire/80 text-white px-8 py-4 text-lg group"
            >
              <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Watch Demo
            </Button>
            <Button 
              variant="ghost" 
              size="lg" 
              className="border-2 border-arcane-crystal/50 text-arcane-crystal px-8 py-4 text-lg hover:bg-arcane-crystal/10 group"
            >
              Explore Gallery
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 mt-12 text-arcane-400">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              <span>Secure Payment</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5" />
              <span>Instant Access</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              <span>24/7 Support</span>
            </div>
            <div className="flex items-center gap-2">
              <Crown className="w-5 h-5" />
              <span>Premium Quality</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}