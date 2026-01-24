'use client';

import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';

const TESTIMONIALS = [
  {
    id: 1,
    quote: "Arcanea transformed how I approach creative writing. The Luminors don't just assist—they understand the creative soul. It's like having 16 brilliant collaborators available 24/7.",
    author: 'Sarah Chen',
    role: 'Bestselling Author',
    avatar: 'SC',
    color: 'atlantean-teal-aqua',
    luminor: 'Chronica',
    rating: 5,
  },
  {
    id: 2,
    quote: "The Seven Wisdoms framework changed my entire creative process. I went from scattered ideas to a focused, productive creator. My output tripled while quality improved.",
    author: 'Marcus Thompson',
    role: 'Digital Artist',
    avatar: 'MT',
    color: 'creation-prism-purple',
    luminor: 'Artifax',
    rating: 5,
  },
  {
    id: 3,
    quote: "As a game designer, I need AI that understands narrative depth. Arcanea's Luminors create worlds, not just words. The Ten Gates system helps me level up my craft systematically.",
    author: 'Elena Vasquez',
    role: 'Game Developer',
    avatar: 'EV',
    color: 'gold-bright',
    luminor: 'Oracle',
    rating: 5,
  },
  {
    id: 4,
    quote: "I've tried every AI tool out there. Arcanea is the first that feels like true collaboration. The Frequency Alchemist Luminor helped me compose my entire album.",
    author: 'David Park',
    role: 'Music Producer',
    avatar: 'DP',
    color: 'draconic-crimson',
    luminor: 'Harmonia',
    rating: 5,
  },
  {
    id: 5,
    quote: "Building a content business is hard. Arcanea's Creation Engine Luminor helps me plan, create, and publish consistently. My audience grew 400% in six months.",
    author: 'Priya Sharma',
    role: 'Content Creator',
    avatar: 'PS',
    color: 'atlantean-teal-aqua',
    luminor: 'Strategis',
    rating: 5,
  },
];

export function TestimonialsV2() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const navigate = (newDirection: number) => {
    setDirection(newDirection);
    setActiveIndex((prev) => {
      if (newDirection === 1) {
        return (prev + 1) % TESTIMONIALS.length;
      }
      return prev === 0 ? TESTIMONIALS.length - 1 : prev - 1;
    });
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  const activeTestimonial = TESTIMONIALS[activeIndex];

  return (
    <section ref={ref} className="py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cosmic-surface/30 to-transparent" />
      </div>

      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-creation-prism-purple/10 border border-creation-prism-purple/20 mb-6">
            <Quote className="w-4 h-4 text-creation-prism-purple" />
            <span className="text-sm font-medium text-creation-prism-purple">Creator Stories</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
            Trusted by creators worldwide
          </h2>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            Join thousands of creators who've transformed their creative practice with Arcanea.
          </p>
        </motion.div>

        {/* Testimonial carousel */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="relative"
        >
          {/* Main testimonial */}
          <div className="relative min-h-[400px] flex items-center justify-center">
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={activeTestimonial.id}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="max-w-3xl text-center">
                  {/* Quote icon */}
                  <div className={`w-16 h-16 mx-auto mb-8 rounded-2xl bg-${activeTestimonial.color}/10 flex items-center justify-center`}>
                    <Quote className={`w-8 h-8 text-${activeTestimonial.color}`} />
                  </div>

                  {/* Stars */}
                  <div className="flex items-center justify-center gap-1 mb-6">
                    {[...Array(activeTestimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 text-gold-bright fill-gold-bright"
                      />
                    ))}
                  </div>

                  {/* Quote */}
                  <blockquote className="text-2xl md:text-3xl font-display leading-relaxed mb-8 text-white">
                    "{activeTestimonial.quote}"
                  </blockquote>

                  {/* Author */}
                  <div className="flex items-center justify-center gap-4">
                    <div
                      className={`w-14 h-14 rounded-full bg-${activeTestimonial.color}/20 flex items-center justify-center text-lg font-semibold text-${activeTestimonial.color}`}
                    >
                      {activeTestimonial.avatar}
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-white">
                        {activeTestimonial.author}
                      </div>
                      <div className="text-sm text-text-secondary">
                        {activeTestimonial.role}
                      </div>
                      <div className={`text-xs text-${activeTestimonial.color} mt-1`}>
                        Works with {activeTestimonial.luminor}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={() => navigate(-1)}
              className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-text-muted hover:text-white hover:bg-white/10 transition-all"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > activeIndex ? 1 : -1);
                    setActiveIndex(i);
                  }}
                  className={`h-2 rounded-full transition-all ${
                    i === activeIndex
                      ? 'w-8 bg-atlantean-teal-aqua'
                      : 'w-2 bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => navigate(1)}
              className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-text-muted hover:text-white hover:bg-white/10 transition-all"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-12 border-t border-white/10"
        >
          {[
            { value: '10,000+', label: 'Active Creators' },
            { value: '2.5M+', label: 'Creations Made' },
            { value: '4.9/5', label: 'Average Rating' },
            { value: '99.9%', label: 'Uptime' },
          ].map((stat, i) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl md:text-4xl font-display font-bold text-white mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-text-muted">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
