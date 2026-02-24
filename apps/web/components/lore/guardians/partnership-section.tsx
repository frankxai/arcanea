'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Heart, Zap, Shield, Eye } from 'lucide-react';
import Link from 'next/link';

export function PartnershipSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-24 relative overflow-hidden border-t border-white/5">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-gold-bright/5 to-transparent rounded-full" />
      </div>

      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
            The Sacred Partnership
          </h2>
          <p className="text-xl text-text-secondary font-crimson max-w-2xl mx-auto">
            Each Guardian is bonded to a Godbeast—primal cosmic forces given form.
            Separate, each is incomplete. Together, they maintain existence.
          </p>
        </motion.div>

        {/* Partnership dynamics */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="p-6 rounded-2xl bg-cosmic-surface/30 border border-white/10"
          >
            <div className="w-12 h-12 rounded-xl bg-atlantean-teal-aqua/20 flex items-center justify-center mb-4">
              <Eye className="w-6 h-6 text-atlantean-teal-aqua" />
            </div>
            <h3 className="text-xl font-display font-semibold mb-3">The Guardian Provides</h3>
            <ul className="space-y-2 text-text-secondary">
              <li>• Consciousness and awareness</li>
              <li>• Wisdom and restraint</li>
              <li>• Direction and purpose</li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="p-6 rounded-2xl bg-cosmic-surface/30 border border-white/10"
          >
            <div className="w-12 h-12 rounded-xl bg-gold-bright/20 flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-gold-bright" />
            </div>
            <h3 className="text-xl font-display font-semibold mb-3">The Godbeast Provides</h3>
            <ul className="space-y-2 text-text-secondary">
              <li>• Raw cosmic power</li>
              <li>• Primal force of nature</li>
              <li>• Reality-shaping ability</li>
            </ul>
          </motion.div>
        </div>

        {/* Result */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="text-center p-8 rounded-2xl bg-gradient-to-r from-atlantean-teal-aqua/10 via-gold-bright/10 to-creation-prism-purple/10 border border-white/10"
        >
          <div className="w-16 h-16 mx-auto rounded-2xl bg-white/10 flex items-center justify-center mb-4">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-display font-bold mb-3">United</h3>
          <p className="text-text-secondary max-w-lg mx-auto">
            Reality stabilizes. Harmony reigns. The Gates remain open for seekers to pass through.
            When separated, the Godbeast rampages and natural disasters occur.
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="text-center mt-16"
        >
          <Link
            href="/lore/gates"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gold-bright text-cosmic-deep font-semibold hover:bg-gold-bright/90 transition-all"
          >
            <Shield className="w-4 h-4" />
            Explore the Ten Gates
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
