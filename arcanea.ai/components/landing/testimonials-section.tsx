'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, Star, Users, Zap } from 'lucide-react'

const testimonials = [
    {
      name: 'Alex Chen',
      role: 'Fantasy Author',
      content: 'Arcanea\'s Guardian AI transformed my worldbuilding process. Draconia\'s creative guidance helped me break through writer\'s block and create characters with real depth.',
      avatar: 'AC',
      rating: 5,
      result: 'Published 3 fantasy novels'
    },
    {
      name: 'Maya Patel', 
      role: 'Game Developer',
      content: 'The multi-modal generation suite is incredible. I can generate character art, location maps, and story elements all in one platform. It saves me hours every day.',
      avatar: 'MP',
      rating: 5,
      result: 'Launched successful indie RPG'
    },
    {
      name: 'Sam Rivera',
      role: 'Community Manager',
      content: 'Our community engagement increased 300% using Arcanea\'s tools. The Guardian AI personalities make our events more engaging and the templates help new creators get started quickly.',
      avatar: 'SR',
      rating: 5,
      result: '50K+ active community members'
    },
    {
      name: 'Jordan Kim',
      role: 'Creative Director',
      content: 'As a professional studio, we need tools that deliver quality consistently. Arcanea\'s intelligent routing and cost optimization have cut our generation costs by 40% while improving quality.',
      avatar: 'JK',
      rating: 4,
      result: '200+ projects delivered'
    }
  ] as const;

const TestimonialCard = React.memo(function TestimonialCard({
  testimonial,
  index,
  isActive,
  onClick
}: {
  testimonial: typeof testimonials[0];
  index: number;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <div
      className={`p-8 bg-arcane-shadow/80 backdrop-blur-sm rounded-xl border border-arcane-cosmic/30 cursor-pointer transition-all hover:border-arcane-fire hover:shadow-lg ${
        isActive ? 'border-arcane-fire' : ''
      }`}
      onClick={onClick}
    >
      <div className="flex items-start gap-6">
        <div className="w-16 h-16 bg-arcane-crystal/10 rounded-full flex items-center justify-center text-2xl font-display text-arcane-crystal">
          {testimonial.avatar}
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2 mb-4">
            <div>
              <h4 className="text-xl font-display text-arcane-crystal">
                {testimonial.name}
              </h4>
              <p className="text-arcane-400 text-sm">{testimonial.role}</p>
            </div>

            <div className="flex items-center">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < testimonial.rating
                      ? 'text-arcane-gold fill-current'
                      : 'text-arcane-300'
                  }`}
                />
              ))}
              <span className="ml-2 text-arcane-400">{testimonial.rating}</span>
            </div>
          </div>

          <blockquote className="text-arcane-300 mb-6">
            "{testimonial.content}"
          </blockquote>

          <div className="flex items-center gap-3 mt-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-arcane-fire" />
              <span className="text-arcane-crystal font-medium">
                {testimonial.result}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default function TestimonialsSection() {
  const [activeTestimonial, setActiveTestimonial] = useState(0)

  const handleTestimonialClick = React.useCallback((index: number) => {
    setActiveTestimonial(index);
  }, []);

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-display text-arcane-crystal mb-4">
            Trusted by Creators Worldwide
          </h2>
          <p className="text-xl text-arcane-200 max-w-3xl mx-auto">
            Join thousands of worldbuilders who use Arcanea to transform their creative vision into reality
          </p>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          <div className="text-center p-6 bg-arcane-shadow/50 backdrop-blur-sm rounded-xl border border-arcane-cosmic/30">
            <div className="text-3xl font-display text-arcane-fire mb-2">50K+</div>
            <div className="text-arcane-300">Active Users</div>
          </div>
          
          <div className="text-center p-6 bg-arcane-shadow/50 backdrop-blur-sm rounded-xl border border-arcane-cosmic/30">
            <div className="text-3xl font-display text-arcane-water mb-2">1M+</div>
            <div className="text-arcane-300">Generations</div>
          </div>
          
          <div className="text-center p-6 bg-arcane-shadow/50 backdrop-blur-sm rounded-xl border border-arcane-cosmic/30">
            <div className="text-3xl font-display text-arcane-earth mb-2">99.9%</div>
            <div className="text-arcane-300">Satisfaction</div>
          </div>
          
          <div className="text-center p-6 bg-arcane-shadow/50 backdrop-blur-sm rounded-xl border border-arcane-cosmic/30">
            <div className="text-3xl font-display text-arcane-void mb-2">4.9★</div>
            <div className="text-arcane-300">Average Rating</div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              testimonial={testimonial}
              index={index}
              isActive={activeTestimonial === index}
              onClick={() => handleTestimonialClick(index)}
            />
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-8 px-6 py-3 bg-arcane-crystal/10 rounded-full border border-arcane-crystal/30">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-arcane-crystal" />
              <span className="text-arcane-crystal font-medium">30-Day Money Back Guarantee</span>
            </div>
          </div>
          
          <div className="inline-flex items-center gap-8 px-6 py-3 bg-arcane-fire/10 rounded-full border border-arcane-fire/30">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-white" />
              <span className="text-white font-medium">50K+ Happy Creators</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}