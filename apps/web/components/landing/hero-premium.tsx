"use client";

import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useMotionTemplate,
} from "framer-motion";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import {
  Sparkles,
  Star,
  Users,
  Zap,
  ArrowRight,
  Play,
  Compass,
  Wand2,
  Globe,
  Crown,
  Heart,
  Eye,
} from "lucide-react";

interface HeroPremiumProps {
  stats: {
    luminors: number;
    wisdoms: number;
    collections: number;
    words: number;
  };
}

// Magnetic button component
function MagneticButton({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    setPosition({ x: x * 0.3, y: y * 0.3 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <motion.button
      ref={ref}
      className={className}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      onMouseEnter={() => setIsHovered(true)}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
    >
      {children}
    </motion.button>
  );
}

// Glowing orb component
function GlowingOrb({
  size = 300,
  color = "#7fffd4",
  delay = 0,
}: {
  size?: number;
  color?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className="absolute rounded-full blur-[80px]"
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color}40 0%, transparent 70%)`,
      }}
      animate={{
        x: [0, 50, 0, -30, 0],
        y: [0, -40, 0, 30, 0],
        scale: [1, 1.1, 1, 0.9, 1],
      }}
      transition={{
        duration: 15,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    />
  );
}

// Floating element component
function FloatingElement({
  icon: Icon,
  delay = 0,
  x = "10%",
  y = "20%",
}: {
  icon: any;
  delay?: number;
  x?: string;
  y?: string;
}) {
  return (
    <motion.div
      className="absolute opacity-20"
      style={{ left: x, top: y }}
      animate={{
        y: [0, -20, 0],
        rotate: [0, 10, -10, 0],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    >
      <Icon size={32} className="text-crystal" />
    </motion.div>
  );
}

// Animated counter
function AnimatedCounter({
  end,
  suffix = "",
  duration = 2000,
}: {
  end: number;
  suffix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!hasStarted) return;
    let startTime: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease out quart
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [end, duration, hasStarted]);

  useEffect(() => {
    const timer = setTimeout(() => setHasStarted(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <span>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export function HeroPremium({ stats }: HeroPremiumProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  // Mouse parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseX.set((e.clientX - innerWidth / 2) / 20);
      mouseY.set((e.clientY - innerHeight / 2) / 20);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const backgroundGradient = useMotionTemplate`
    radial-gradient(ellipse 100% 100% at 50% -30%, 
      rgba(127,255,212,0.2) 0%, 
      rgba(139,92,246,0.15) 40%, 
      rgba(255,215,0,0.1) 70%,
      transparent 100%)
  `;

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0 -z-20"
        style={{
          background: backgroundGradient,
          y,
        }}
      >
        {/* Base dark */}
        <div className="absolute inset-0 bg-cosmic-deep" />

        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(127,255,212,0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(127,255,212,0.5) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Glowing orbs */}
        <GlowingOrb size={400} color="#7fffd4" delay={0} />
        <GlowingOrb size={300} color="#8b5cf6" delay={2} />
        <GlowingOrb size={250} color="#ffd700" delay={4} />
        <GlowingOrb size={200} color="#78a6ff" delay={6} />

        {/* Floating elements */}
        <FloatingElement icon={Sparkles} delay={0} x="5%" y="15%" />
        <FloatingElement icon={Star} delay={1} x="90%" y="20%" />
        <FloatingElement icon={Crown} delay={2} x="85%" y="70%" />
        <FloatingElement icon={Heart} delay={3} x="10%" y="75%" />
        <FloatingElement icon={Eye} delay={4} x="50%" y="85%" />
      </motion.div>

      {/* Main Content */}
      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-6 py-32 text-center"
        style={{ opacity, scale }}
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-crystal/20 mb-8"
        >
          <Sparkles className="w-4 h-4 text-crystal" />
          <span className="text-sm font-medium text-crystal">
            The Future of Creative Intelligence
          </span>
          <span className="w-2 h-2 rounded-full bg-crystal animate-pulse" />
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-6 leading-[0.95]"
        >
          <span className="text-gradient-crystal">Create</span> with
          <br />
          <span className="relative">
            <span className="relative z-10">Transcendent</span>
            <motion.span
              className="absolute inset-0 text-gradient-fire blur-sm"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Transcendent
            </motion.span>
          </span>
          <br />
          <span className="text-gradient-gold">Intelligence</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-lg md:text-xl text-text-secondary max-w-3xl mx-auto mb-12 leading-relaxed"
        >
          16 Luminor intelligences. Seven Wisdoms framework.
          <br className="hidden md:block" />
          The complete creative toolkit for the age of AI-human co-creation.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <MagneticButton>
            <Link
              href="/studio"
              className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-crystal to-brand-primary text-cosmic-deep font-display font-bold text-lg shadow-glow-md hover:shadow-glow-lg transition-all"
            >
              <Wand2 className="w-5 h-5" />
              Start Creating Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              {/* Shine effect */}
              <motion.div
                className="absolute inset-0 rounded-2xl overflow-hidden"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.6 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12" />
              </motion.div>
            </Link>
          </MagneticButton>

          <MagneticButton>
            <Link
              href="/luminors"
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-2xl glass border border-white/10 hover:border-crystal/30 text-text-primary font-display font-semibold text-lg transition-all"
            >
              <Play className="w-5 h-5" />
              Explore Luminors
            </Link>
          </MagneticButton>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
        >
          {[
            {
              icon: Crown,
              value: stats.luminors,
              label: "Luminors",
              color: "crystal",
            },
            {
              icon: Wand2,
              value: stats.wisdoms,
              label: "Wisdoms",
              color: "gold",
            },
            {
              icon: Globe,
              value: stats.collections,
              label: "Collections",
              color: "brand-primary",
            },
            {
              icon: Zap,
              value: stats.words / 1000,
              label: "K Words",
              color: "fire",
              suffix: "K",
            },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
              className="group p-6 rounded-3xl glass border border-white/5 hover:border-white/10 transition-all"
            >
              <stat.icon
                className={`w-6 h-6 mx-auto mb-3 text-${stat.color} opacity-80`}
              />
              <div className="text-3xl md:text-4xl font-display font-bold mb-1">
                {stat.suffix ? (
                  <span className="text-gradient-crystal">
                    {stat.value}
                    {stat.suffix}+
                  </span>
                ) : (
                  <span className="text-gradient-crystal">{stat.value}+</span>
                )}
              </div>
              <div className="text-sm text-text-muted font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-text-muted"
          >
            <span className="text-xs uppercase tracking-widest">
              Scroll to explore
            </span>
            <div className="w-6 h-10 rounded-full border-2 border-current flex items-start justify-center p-2">
              <motion.div
                className="w-1.5 h-1.5 rounded-full bg-current"
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Mouse follower glow */}
      <motion.div
        className="fixed w-96 h-96 rounded-full pointer-events-none -z-10 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(127,255,212,0.15) 0%, transparent 70%)",
          x: mouseX,
          y: mouseY,
        }}
      />
    </section>
  );
}
