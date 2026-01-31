'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Brain, 
  Zap, 
  Shield, 
  Sparkles, 
  Infinity, 
  Layers,
  Users,
  Crown
} from 'lucide-react'

export default function FeaturesSection() {
  const features = [
    {
      icon: Brain,
      title: 'Multi-LLM Superagent',
      description: 'Seamlessly switch between Claude, GPT-4, and Gemini based on your task requirements.',
      highlight: 'Intelligent routing',
      color: 'from-arcane-fire to-arcane-crystal'
    },
    {
      icon: Zap,
      title: 'Multi-Modal Generation',
      description: 'Create text, images, videos, and audio all in one unified platform.',
      highlight: 'Create anything',
      color: 'from-arcane-crystal to-arcane-water'
    },
    {
      icon: Shield,
      title: 'Guardian AI Companions',
      description: '9 specialized AI personalities with unique expertise in creative domains.',
      highlight: '9 AI Guardians',
      color: 'from-arcane-void to-arcane-crystal'
    },
    {
      icon: Sparkles,
      title: 'Premium Quality',
      description: 'Industry-leading AI models optimized for professional creative work.',
      highlight: 'Pro-grade output',
      color: 'from-arcane-gold to-arcane-fire'
    },
    {
      icon: Infinity,
      title: 'Infinite Creativity',
      description: 'Never run out of ideas with AI-powered creative assistance.',
      highlight: 'Endless inspiration',
      color: 'from-arcane-water to-arcane-crystal'
    },
    {
      icon: Layers,
      title: 'Cost Optimization',
      description: 'Smart routing reduces costs by 40% while maintaining quality.',
      highlight: 'Save 40% on costs',
      color: 'from-arcane-earth to-arcane-gold'
    }
  ]

  return (
    <section id="features" className="py-24 bg-gradient-to-b from-transparent to-arcane-cosmic/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="crystal" className="mb-6">
            <Crown className="w-4 h-4 mr-2" />
            PREMIUM FEATURES
          </Badge>
          <h2 className="text-4xl md:text-5xl font-display text-white mb-6">
            The Complete AI
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-arcane-crystal to-arcane-fire">
              Creative Platform
            </span>
          </h2>
          <p className="text-xl text-arcane-200 max-w-3xl mx-auto leading-relaxed">
            Everything you need to bring your creative visions to life, powered by cutting-edge AI technology
            and enhanced by specialized Guardian personalities.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="group relative bg-arcane-shadow/50 backdrop-blur-sm rounded-2xl border border-arcane-cosmic/30 p-8 hover:border-arcane-crystal/50 transition-all duration-300 hover:transform hover:scale-105"
              >
                {/* Glow Effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`} />
                
                {/* Feature Icon */}
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.color} mb-6`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                
                {/* Feature Content */}
                <h3 className="text-xl font-display text-arcane-crystal mb-3">
                  {feature.title}
                </h3>
                <p className="text-arcane-300 leading-relaxed mb-4">
                  {feature.description}
                </p>
                
                {/* Highlight Badge */}
                <Badge variant="crystal" className="text-xs">
                  {feature.highlight}
                </Badge>
              </div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center bg-arcane-shadow/80 backdrop-blur-sm rounded-2xl border border-arcane-crystal/30 p-12">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl font-display text-arcane-crystal mb-4">
              Ready to Transform Your Creative Process?
            </h3>
            <p className="text-arcane-200 mb-8 text-lg">
              Join thousands of creators using Arcanea to build worlds, tell stories, and push the boundaries of imagination.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-arcane-crystal to-arcane-fire hover:from-arcane-crystal/80 hover:to-arcane-fire/80 text-white px-8 py-4 text-lg">
                <Zap className="w-5 h-5 mr-2" />
                Start Creating Free
              </Button>
              <Button variant="ghost" size="lg" className="border-2 border-arcane-crystal/50 text-arcane-crystal px-8 py-4 text-lg hover:bg-arcane-crystal/10">
                <Users className="w-5 h-5 mr-2" />
                View Demo Creations
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}