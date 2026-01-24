'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Star, Quote } from 'lucide-react';

const TESTIMONIALS = [
  {
    name: 'Sarah Chen',
    role: 'Creative Director',
    company: 'Studio Lumina',
    avatar: 'SC',
    quote: 'Arcanea transformed how our team approaches creative projects. The Luminors feel like having a team of expert collaborators available 24/7.',
    rating: 5,
    gradient: 'from-atlantean-teal-aqua to-creation-prism-purple',
  },
  {
    name: 'Marcus Rodriguez',
    role: 'Indie Game Developer',
    company: 'Pixel Dreams',
    avatar: 'MR',
    quote: 'The worldbuilding capabilities are incredible. I created an entire game universe in a fraction of the time it would normally take.',
    rating: 5,
    gradient: 'from-gold-bright to-draconic-crimson',
  },
  {
    name: 'Elena Vorova',
    role: 'Author',
    company: 'Bestselling Novelist',
    avatar: 'EV',
    quote: 'Chronica helped me break through a 6-month writers block. The Seven Wisdoms framework changed how I think about creativity.',
    rating: 5,
    gradient: 'from-creation-prism-purple to-atlantean-teal-aqua',
  },
  {
    name: 'David Kim',
    role: 'Music Producer',
    company: 'Frequency Labs',
    avatar: 'DK',
    quote: 'Melodia understands music theory at a level I didnt expect. Its like having a collaborator who never runs out of ideas.',
    rating: 5,
    gradient: 'from-draconic-crimson to-gold-bright',
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
  { value: '10,000+', label: 'Active Creators' },
  { value: '2.5M+', label: 'Creations Made' },
  { value: '4.9/5', label: 'Average Rating' },
  { value: '99.9%', label: 'Uptime' },
];

export function SocialProof() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-24 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-atlantean-teal-aqua/5 to-transparent -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Featured In */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <p className="text-sm text-text-muted uppercase tracking-wider mb-8">
            Featured in
          </p>
          <div className="flex flex-wrap items-center justify-center gap-12">
            {LOGOS.map((logo) => (
              <div
                key={logo.name}
                className="text-2xl font-display font-bold text-white"
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
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24"
        >
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-display font-bold bg-gradient-to-r from-atlantean-teal-aqua to-creation-prism-purple bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-sm text-text-muted mt-2">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonials Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Loved by creators worldwide
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
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
              transition={{ delay: 0.3 + i * 0.1 }}
              className="group relative"
            >
              <div className="relative rounded-2xl border border-white/10 bg-cosmic-surface/50 backdrop-blur-sm p-6 hover:border-white/20 transition-all duration-300">
                {/* Quote icon */}
                <Quote className="absolute top-4 right-4 w-8 h-8 text-white/5" />

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-gold-bright text-gold-bright" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-text-secondary mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center text-white font-semibold`}
                  >
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-text-muted">
                      {testimonial.role} at {testimonial.company}
                    </div>
                  </div>
                </div>

                {/* Hover gradient */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-atlantean-teal-aqua/5 to-creation-prism-purple/5 opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center mt-12"
        >
          <p className="text-text-muted">
            Ready to join them?{' '}
            <a href="/chat" className="text-atlantean-teal-aqua hover:underline">
              Start creating free →
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
