'use client'

import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Check, 
  Crown, 
  Zap, 
  Infinity, 
  Star,
  Sparkles,
  Users
} from 'lucide-react'

export default function PricingSection() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly')

  const plans = [
    {
      name: 'Creator',
      description: 'Perfect for individual creators and hobbyists',
      price: { monthly: 19, yearly: 199 },
      originalPrice: { monthly: 29, yearly: 299 },
      features: [
        '1000 AI credits per month',
        'Basic LLM models (Claude, GPT-3.5)',
        'Standard image generation',
        '3 Guardian AI companions',
        'Community access',
        'Basic analytics'
      ],
      color: 'from-arcane-cosmic to-arcane-water',
      borderColor: 'border-arcane-water',
      popular: false
    },
    {
      name: 'Professional',
      description: 'For serious creators and small teams',
      price: { monthly: 49, yearly: 499 },
      originalPrice: { monthly: 79, yearly: 799 },
      features: [
        '5000 AI credits per month',
        'Advanced LLM models (GPT-4, Claude 3.5)',
        'Premium image generation',
        'All 9 Guardian AI companions',
        'Video generation (10 mins)',
        'Audio generation (30 mins)',
        'Priority support',
        'Advanced analytics'
      ],
      color: 'from-arcane-fire to-arcane-crystal',
      borderColor: 'border-arcane-crystal',
      popular: true
    },
    {
      name: 'Enterprise',
      description: 'For large teams and organizations',
      price: { monthly: 199, yearly: 1999 },
      originalPrice: { monthly: null, yearly: null },
      features: [
        'Unlimited AI credits',
        'All AI models and providers',
        'Unlimited generations',
        'Custom Guardian personalities',
        'API access',
        'Dedicated support',
        'Custom integrations',
        'SLA guarantee',
        'White-label options'
      ],
      color: 'from-arcane-void to-arcane-gold',
      borderColor: 'border-arcane-gold',
      popular: false
    }
  ]

  const getDisplayPrice = (plan: typeof plans[0]) => {
    const price = plan.price[billingCycle]
    const originalPrice = plan.originalPrice[billingCycle]
    
    if (originalPrice) {
      return (
        <div className="flex items-center gap-2">
          <span className="text-3xl font-bold">${price}</span>
          <span className="text-sm text-arcane-400 line-through">${originalPrice}</span>
        </div>
      )
    }
    return <span className="text-3xl font-bold">${price}</span>
  }

  return (
    <section id="pricing" className="py-24 bg-gradient-to-b from-arcane-void/30 to-arcane-shadow/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="gold" className="mb-6">
            <Crown className="w-4 h-4 mr-2" />
            PRICING PLANS
          </Badge>
          <h2 className="text-4xl md:text-5xl font-display text-white mb-6">
            Choose Your
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-arcane-gold to-arcane-crystal">
              Creative Power
            </span>
          </h2>
          <p className="text-xl text-arcane-200 max-w-3xl mx-auto leading-relaxed mb-8">
            Select the perfect plan for your creative journey. All plans include core features with scalable benefits.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center bg-arcane-shadow/80 rounded-full border border-arcane-cosmic/30 p-1">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-full transition-all duration-200 ${
                billingCycle === 'monthly'
                  ? 'bg-arcane-fire text-white'
                  : 'text-arcane-300 hover:text-arcane-crystal'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-6 py-2 rounded-full transition-all duration-200 flex items-center gap-2 ${
                billingCycle === 'yearly'
                  ? 'bg-arcane-fire text-white'
                  : 'text-arcane-300 hover:text-arcane-crystal'
              }`}
            >
              Yearly
              <Badge variant="crystal" className="text-xs">
                Save 30%
              </Badge>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-arcane-shadow/80 backdrop-blur-sm rounded-2xl border transition-all duration-300 hover:transform hover:scale-105 ${
                plan.popular
                  ? 'border-arcane-crystal scale-105 shadow-2xl shadow-arcane-crystal/20'
                  : 'border-arcane-cosmic/30'
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-gradient-to-r from-arcane-fire to-arcane-crystal text-white px-4 py-2">
                    <Star className="w-4 h-4 mr-2" />
                    MOST POPULAR
                  </Badge>
                </div>
              )}

              <div className="p-8">
                {/* Plan Header */}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-display text-white mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-arcane-300 text-sm mb-4">
                    {plan.description}
                  </p>
                  
                  <div className="mb-2">
                    {getDisplayPrice(plan)}
                  </div>
                  <p className="text-arcane-400 text-sm">
                    per {billingCycle === 'monthly' ? 'month' : 'year'}
                  </p>
                </div>

                {/* Features */}
                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-arcane-crystal flex-shrink-0 mt-0.5" />
                      <span className="text-arcane-200">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <Button
                  size="lg"
                  className={`w-full py-4 ${
                    plan.popular
                      ? `bg-gradient-to-r ${plan.color} hover:opacity-90 text-white`
                      : 'border-2 border-arcane-crystal/50 text-arcane-crystal hover:bg-arcane-crystal/10'
                  }`}
                >
                  {plan.popular && <Sparkles className="w-5 h-5 mr-2" />}
                  Start {plan.name} Plan
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="text-center">
          <div className="bg-arcane-shadow/80 backdrop-blur-sm rounded-2xl border border-arcane-crystal/30 p-12">
            <h3 className="text-2xl font-display text-arcane-crystal mb-4 flex items-center justify-center gap-3">
              <Users className="w-6 h-6" />
              Join Thousands of Creators
            </h3>
            <p className="text-arcane-200 mb-8 text-lg">
              From individual artists to enterprise teams, Arcanea powers creativity at every scale.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-arcane-crystal mb-2">10K+</div>
                <div className="text-arcane-300">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-arcane-fire mb-2">1M+</div>
                <div className="text-arcane-300">Generations</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-arcane-gold mb-2">98%</div>
                <div className="text-arcane-300">Satisfaction</div>
              </div>
            </div>
            <Button size="lg" className="bg-gradient-to-r from-arcane-crystal to-arcane-fire hover:from-arcane-crystal/80 hover:to-arcane-fire/80 text-white px-8 py-4 text-lg">
              <Zap className="w-5 h-5 mr-2" />
              Start Free Trial
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}