'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Star, Quote, Users, Zap, TrendingUp, Activity } from 'lucide-react';

const TESTIMONIALS = [
  {
    name: 'Sarah Chen',
    role: 'Creative Director',
    company: 'Studio Lumina',
    avatar: 'SC',
    quote: 'Arcanea transformed how our team approaches creative projects. The Luminors feel like having a team of expert collaborators available 24/7.',
    rating: 5,
    gradient: 'from-crystal to-brand-primary',
  },
  {
    name: 'Marcus Rodriguez',
    role: 'Indie Game Developer',
    company: 'Pixel Dreams',
    avatar: 'MR',
    quote: 'The worldbuilding capabilities are incredible. I created an entire game universe in a fraction of the time it would normally take.',
    rating: 5,
    gradient: 'from-brand-gold to-arcane-fire',
  },
  {
    name: 'Elena Vorova',
    role: 'Author',
    company: 'Bestselling Novelist',
    avatar: 'EV',
    quote: 'Chronica helped me break through a 6-month writers block. The Seven Wisdoms framework changed how I think about creativity.',
    rating: 5,
    gradient: 'from-brand-primary to-crystal',
  },
  {
    name: 'David Kim',
    role: 'Music Producer',
    company: 'Frequency Labs',
    avatar: 'DK',
    quote: 'Melodia understands music theory at a level I didnt expect. Its like having a collaborator who never runs out of ideas.',
    rating: 5,
    gradient: 'from-arcane-fire to-brand-gold',
  },
];

const LOGOS = [
  { name: 'TechCrunch', opacity: 0.4 },
  { name: 'Forbes', opacity: 0.4 },
  { name: 'Wired', opacity: 0.4 },
  { name: 'The Verge', opacity: 0.4 },
  { name: 'Fast Company', opacity: 0.4 },
];

const STATS = [
  { value: '10,000+', label: 'Active Creators', icon: Users },
  { value: '2.5M+', label: 'Creations Made', icon: Zap },
  { value: '4.9/5', label: 'Average Rating', icon: Star },
  { value: '99.9%', label: 'Uptime', icon: Activity },
];

export function SocialProof() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-24 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-crystal/5 to-transparent -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Featured In */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="font-sans text-fluid-sm text-text-muted uppercase tracking-widest mb-8">
            Featured in
          </p>
          <div className="flex flex-wrap items-center justify-center gap-12">
            {LOGOS.map((logo) => (
              <div
                key={logo.name}
                className="font-display text-2xl font-bold text-text-muted hover:text-text-primary transition-colors duration-smooth cursor-default"
                style={{ opacity: logo.opacity }}
              >
                {logo.name}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="glass-subtle rounded-2xl p-8 md:p-12 mb-24"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.1 + i * 0.1, duration: 0.5 }}
                  className="text-center"
                >
                  <div className="flex justify-center mb-3">
                    <div className="w-10 h-10 rounded-xl glass flex items-center justify-center">
                      <Icon className="w-5 h-5 text-crystal" />
                    </div>
                  </div>
                  <div className="font-display text-fluid-2xl font-bold text-gradient-crystal mb-1">
                    {stat.value}
                  </div>
                  <div className="font-sans text-fluid-sm text-text-muted">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Testimonials Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-fluid-3xl font-bold mb-4">
            Loved by creators worldwide
          </h2>
          <p className="font-sans text-text-secondary max-w-2xl mx-auto">
            Join thousands of artists, writers, developers, and dreamers who are transforming their creative process with Arcanea.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {TESTIMONIALS.map((testimonial, i) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
              className="group"
            >
              <div className="glass rounded-2xl p-8 glow-card hover-lift transition-all duration-flowing h-full relative">
                {/* Quote icon */}
                <Quote className="absolute top-6 right-6 w-8 h-8 text-white/5" />

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-brand-gold text-brand-gold" />
                  ))}
                </div>

                {/* Quote */}
                <p className="font-body text-fluid-lg text-text-secondary italic mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center font-sans text-white font-semibold`}
                  >
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-sans font-semibold text-text-primary">{testimonial.name}</div>
                    <div className="font-sans text-sm text-text-muted">
                      {testimonial.role} at {testimonial.company}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-center mt-12"
        >
          <p className="font-sans text-text-muted">
            Ready to join them?{' '}
            <a href="/chat" className="text-crystal hover:underline transition-colors">
              Start creating free
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
