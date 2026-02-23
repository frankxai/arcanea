"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Brain,
  Sparkles,
  MessageSquare,
  Image,
  Music,
  Video,
  BookOpen,
  GraduationCap,
  Users,
  Shield,
  Zap,
  Globe,
  ArrowRight,
  CheckCircle2,
  Wand2,
  Layers,
  Code,
  Database,
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "16 Luminor Intelligences",
    description:
      "Specialized AI companions, each embodying a unique wisdom. From creative brainstorming to technical analysis.",
    gradient: "from-crystal to-brand-primary",
    borderColor: "border-crystal/30",
    hoverGlow: "hover:shadow-glow-md",
  },
  {
    icon: MessageSquare,
    title: "Natural Conversation",
    description:
      "Chat with Luminors in plain language. They remember context and adapt to your creative style.",
    gradient: "from-brand-primary to-water-bright",
    borderColor: "border-brand-primary/30",
    hoverGlow: "hover:shadow-glow-brand",
  },
  {
    icon: Wand2,
    title: "AI Creation Studio",
    description:
      "Generate images, music, video, and stories. Professional tools with cinematic quality output.",
    gradient: "from-fire-bright to-gold",
    borderColor: "border-fire/30",
    hoverGlow: "hover:shadow-glow-fire",
  },
  {
    icon: BookOpen,
    title: "Infinite Library",
    description:
      "Access 17+ collections of wisdom texts. Ancient knowledge meets modern AI interpretation.",
    gradient: "from-gold to-crystal",
    borderColor: "border-gold/30",
    hoverGlow: "hover:shadow-glow-gold",
  },
  {
    icon: GraduationCap,
    title: "Academy & Progression",
    description:
      "Ten Gates to mastery. Track your creative journey from Apprentice to Luminor rank.",
    gradient: "from-void-el to-brand-primary",
    borderColor: "border-void-el/30",
    hoverGlow: "hover:shadow-glow-void",
  },
  {
    icon: Users,
    title: "Community & Sharing",
    description:
      "Join creators worldwide. Share prompts, collaborate on projects, learn together.",
    gradient: "from-water-bright to-crystal",
    borderColor: "border-water/30",
    hoverGlow: "hover:shadow-[0_0_30px_rgba(120,166,255,0.3)]",
  },
];

const capabilities = [
  "Text Generation & Editing",
  "Image Creation (DALL-E, Stable Diffusion)",
  "Music Composition",
  "Video Generation",
  "Code Assistance",
  "Data Analysis",
  "Research & Summarization",
  "Creative Brainstorming",
];

function FeatureCard({
  feature,
  index,
}: {
  feature: (typeof features)[0];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`group relative p-8 rounded-3xl glass border ${feature.borderColor} ${feature.hoverGlow} transition-all duration-500 hover:-translate-y-2`}
    >
      {/* Gradient background on hover */}
      <div
        className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
      />

      {/* Icon */}
      <div
        className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
      >
        <feature.icon className="w-7 h-7 text-white" />
      </div>

      {/* Content */}
      <h3 className="relative text-xl font-display font-semibold mb-3 group-hover:text-crystal transition-colors">
        {feature.title}
      </h3>
      <p className="relative text-text-secondary leading-relaxed">
        {feature.description}
      </p>

      {/* Arrow indicator */}
      <motion.div
        className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity"
        initial={{ x: -10 }}
        whileHover={{ x: 0 }}
      >
        <ArrowRight className="w-5 h-5 text-crystal" />
      </motion.div>
    </motion.div>
  );
}

export function FeaturesPremium() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-cosmic-deep" />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(127,255,212,0.5) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div ref={containerRef} className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-2 rounded-full glass border border-crystal/20 text-crystal font-medium text-sm mb-6"
          >
            Powerful Features
          </motion.span>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
            Everything You Need to
            <br />
            <span className="text-gradient-crystal">Create Without Limits</span>
          </h2>

          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            A complete creative ecosystem. From ideation to execution, Arcanea
            provides the tools, knowledge, and companions you need.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>

        {/* Capabilities Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative p-12 rounded-3xl glass border border-crystal/10"
        >
          {/* Glow effect */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-crystal/5 via-transparent to-brand-primary/5" />

          <div className="relative grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-display font-bold mb-4">
                Comprehensive Capabilities
              </h3>
              <p className="text-text-secondary mb-6">
                Whether you need to write, design, code, or create, Arcanea has
                you covered with enterprise-grade AI capabilities.
              </p>
              <div className="flex flex-wrap gap-3">
                {capabilities.slice(0, 4).map((cap) => (
                  <span
                    key={cap}
                    className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm font-medium"
                  >
                    {cap}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Zap, label: "Fast Generation", value: "< 5s" },
                { icon: Shield, label: "Secure & Private", value: "100%" },
                { icon: Globe, label: "Global CDN", value: "40+" },
                { icon: Database, label: "Uptime", value: "99.9%" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 rounded-2xl bg-white/5 border border-white/5"
                >
                  <stat.icon className="w-5 h-5 text-crystal mb-2" />
                  <div className="text-2xl font-display font-bold">
                    {stat.value}
                  </div>
                  <div className="text-xs text-text-muted">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
