'use client';

import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { HelpCircle, Plus, Minus } from 'lucide-react';

const FAQS = [
  {
    question: 'What makes Arcanea different from other AI tools?',
    answer: "Arcanea isn't just an AI tool—it's a complete creative intelligence platform. Our 16 specialized Luminors each bring unique expertise, from storytelling to research to music composition. The Seven Wisdoms framework provides actionable creative methodology, while the Ten Gates progression system helps you systematically develop your creative abilities.",
  },
  {
    question: 'How do Luminors work?',
    answer: 'Luminors are AI companions designed for specific creative domains. Each Luminor has its own personality, expertise, and approach. Oracle excels at research and analysis, Chronica at storytelling and narrative, Artifax at visual concepts, and so on. You can switch between Luminors or even combine their strengths for complex projects.',
  },
  {
    question: 'Is my creative work private and secure?',
    answer: 'Absolutely. Your creations, prompts, and conversations are encrypted and never shared or used to train AI models. You retain full ownership of everything you create on Arcanea. We offer enterprise-grade security with SOC 2 Type II compliance for teams requiring additional assurance.',
  },
  {
    question: 'Can I export my work?',
    answer: 'Yes! All plans include export capabilities. Explorer users can export to PDF, while Creator and Studio plans unlock Word, Markdown, HTML, and API access. Studio plans also include white-label exports without Arcanea branding.',
  },
  {
    question: 'What is the Ten Gates system?',
    answer: 'The Ten Gates is our unique progression framework based on ancient wisdom traditions and modern creative psychology. Each Gate represents a stage of creative mastery—from Foundation (basic skills) to Source (creative leadership). As you create and learn, you advance through the Gates, unlocking new capabilities and deeper understanding.',
  },
  {
    question: 'Do you offer team or enterprise plans?',
    answer: 'Our Studio plan includes 5 team seats with collaboration features. For larger teams or enterprises needing custom solutions, dedicated support, and advanced security features, please contact our sales team for a tailored quote.',
  },
  {
    question: 'Can I cancel my subscription anytime?',
    answer: 'Yes, you can cancel anytime from your account settings. If you cancel, you\'ll retain access until the end of your current billing period. We also offer a 30-day money-back guarantee on annual plans.',
  },
  {
    question: 'What happens to my work if I downgrade?',
    answer: 'Your work is always yours. If you downgrade, your existing creations remain accessible. You\'ll just be limited to the features of your new plan for future work. We never delete your content.',
  },
];

function FAQItem({
  question,
  answer,
  isOpen,
  onToggle,
  index,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.05 }}
      className="border-b border-white/10"
    >
      <button
        onClick={onToggle}
        className="w-full py-6 flex items-start justify-between gap-4 text-left group"
        aria-expanded={isOpen}
      >
        <span className="text-lg font-medium text-white group-hover:text-atlantean-teal-aqua transition-colors">
          {question}
        </span>
        <span
          className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
            isOpen
              ? 'bg-atlantean-teal-aqua text-cosmic-deep'
              : 'bg-white/5 text-text-muted group-hover:bg-white/10'
          }`}
        >
          {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-text-secondary leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FAQSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section ref={ref} className="py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-atlantean-teal-aqua/5 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-atlantean-teal-aqua/10 border border-atlantean-teal-aqua/20 mb-6">
            <HelpCircle className="w-4 h-4 text-atlantean-teal-aqua" />
            <span className="text-sm font-medium text-atlantean-teal-aqua">FAQ</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            Frequently asked questions
          </h2>
          <p className="text-xl text-text-secondary">
            Everything you need to know about Arcanea.
          </p>
        </motion.div>

        {/* FAQ list */}
        <div className="border-t border-white/10">
          {FAQS.map((faq, i) => (
            <FAQItem
              key={i}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              index={i}
            />
          ))}
        </div>

        {/* Still have questions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center p-8 rounded-2xl bg-cosmic-surface/30 border border-white/10"
        >
          <h3 className="text-xl font-display font-semibold mb-3">Still have questions?</h3>
          <p className="text-text-secondary mb-6">
            Can't find the answer you're looking for? Our team is here to help.
          </p>
          <a
            href="mailto:support@arcanea.ai"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-atlantean-teal-aqua text-cosmic-deep font-semibold hover:bg-atlantean-teal-aqua/90 transition-colors"
          >
            Contact Support
          </a>
        </motion.div>
      </div>
    </section>
  );
}
