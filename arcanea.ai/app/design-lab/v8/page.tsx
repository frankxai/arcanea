'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  staggerContainer,
  staggerItem,
  cosmicFadeIn,
  cosmicFadeInUp,
  fadeInViewport,
  floatingOrb,
} from '@/lib/animations'
import {
  Box,
  Sun,
  Lightbulb,
  Gauge,
  RotateCcw,
  Globe,
  Glasses,
  ArrowLeft,
  ArrowRight,
  Code2,
  Layers,
  Eye,
  Cpu,
  Monitor,
  Smartphone,
  Zap,
  Settings,
  Shield,
  Copy,
  Check,
} from '@/components/icons'

// ============================================
// COSMIC BACKGROUND
// ============================================

function LabCosmicBackground() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100
      container.style.setProperty('--mouse-x', `${x}%`)
      container.style.setProperty('--mouse-y', `${y}%`)
    }
    container.addEventListener('mousemove', handleMouseMove)
    return () => container.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 opacity-40 transition-opacity duration-700" style={{ background: 'radial-gradient(800px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(127, 255, 212, 0.06), transparent 40%)' }} />
      <div className="absolute inset-0 bg-cosmic-stars opacity-50" />
      <motion.div variants={floatingOrb} animate="animate" className="absolute top-[10%] left-[15%] w-[600px] h-[600px] rounded-full bg-arcane-crystal/5 blur-[120px]" />
      <motion.div variants={floatingOrb} animate="animate" className="absolute bottom-[10%] right-[10%] w-[500px] h-[500px] rounded-full bg-arcane-void/8 blur-[100px]" style={{ animationDelay: '3s' }} />
      <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: 'linear-gradient(rgba(127, 255, 212, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(127, 255, 212, 0.5) 1px, transparent 1px)', backgroundSize: '80px 80px' }} />
    </div>
  )
}

const threejsPatterns = [
  {
    title: 'Dynamic Import Pattern',
    icon: Code2,
    description: 'Three.js components must be loaded client-side with SSR disabled to avoid window/document errors in Next.js.',
    code: `// components/3d/GuardianScene.tsx
'use client'

import dynamic from 'next/dynamic'

const Scene = dynamic(
  () => import('./Scene'),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full bg-cosmic-deep
        flex items-center justify-center">
        <div className="animate-pulse-glow">
          Loading 3D...
        </div>
      </div>
    ),
  }
)

export default function GuardianScene() {
  return (
    <div className="w-full h-[600px] rounded-2xl
      overflow-hidden border border-white/10">
      <Scene />
    </div>
  )
}`,
    badge: 'CORE',
    badgeVariant: 'crystal' as const,
  },
  {
    title: 'Lighting Setup',
    icon: Lightbulb,
    description: 'The standard Arcanea 3D lighting rig uses ambient light for base illumination, directional light for depth, and colored point lights matching the elemental palette.',
    code: `import { Canvas } from '@react-three/fiber'
import { Environment } from '@react-three/drei'

function ArcaneaLighting() {
  return (
    <>
      {/* Base ambient - soft cosmic glow */}
      <ambientLight intensity={0.3} color="#7fffd4" />

      {/* Key directional - from above-right */}
      <directionalLight
        position={[5, 8, 3]}
        intensity={1.2}
        color="#ffffff"
        castShadow
        shadow-mapSize={[2048, 2048]}
      />

      {/* Elemental point lights */}
      <pointLight
        position={[-4, 2, -3]}
        intensity={0.8}
        color="#7fffd4"  // Crystal
        distance={15}
      />
      <pointLight
        position={[4, 1, 2]}
        intensity={0.6}
        color="#9966ff"  // Void
        distance={12}
      />
      <pointLight
        position={[0, -2, 4]}
        intensity={0.4}
        color="#ff6b35"  // Fire
        distance={10}
      />

      {/* HDR environment for reflections */}
      <Environment preset="night" />
    </>
  )
}`,
    badge: 'LIGHTING',
    badgeVariant: 'gold' as const,
  },
  {
    title: 'Performance Optimizer',
    icon: Gauge,
    description: 'A performance monitoring component that adjusts quality tiers based on real-time FPS. Three tiers: Ultra (60fps), Standard (30fps), and Reduced (below 30fps).',
    code: `import { useFrame } from '@react-three/fiber'
import { useState, useRef } from 'react'

type QualityTier = 'ultra' | 'standard' | 'reduced'

function usePerformanceTier() {
  const [tier, setTier] = useState<QualityTier>('ultra')
  const fpsRef = useRef<number[]>([])

  useFrame((_, delta) => {
    const fps = 1 / delta
    fpsRef.current.push(fps)

    if (fpsRef.current.length >= 60) {
      const avg = fpsRef.current.reduce(
        (a, b) => a + b, 0
      ) / fpsRef.current.length

      if (avg < 20) setTier('reduced')
      else if (avg < 45) setTier('standard')
      else setTier('ultra')

      fpsRef.current = []
    }
  })

  return tier
}

// Usage in scene
function AdaptiveScene() {
  const tier = usePerformanceTier()

  return (
    <>
      {/* Adjust based on tier */}
      <mesh>
        <sphereGeometry args={[
          1,
          tier === 'ultra' ? 64 :
          tier === 'standard' ? 32 : 16,
          tier === 'ultra' ? 64 :
          tier === 'standard' ? 32 : 16,
        ]} />
      </mesh>
      {tier !== 'reduced' && <Particles />}
      {tier === 'ultra' && <PostProcessing />}
    </>
  )
}`,
    badge: 'PERF',
    badgeVariant: 'fire' as const,
  },
  {
    title: 'Orbit Controls & Camera',
    icon: RotateCcw,
    description: 'Camera controls allow orbit, pan, and zoom with sensible limits for showcase scenes. Auto-rotate is used for idle states.',
    code: `import { OrbitControls, PerspectiveCamera } from '@react-three/drei'

function CameraSetup() {
  return (
    <>
      <PerspectiveCamera
        makeDefault
        position={[0, 2, 8]}
        fov={50}
        near={0.1}
        far={1000}
      />
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        enableRotate={true}
        autoRotate={true}
        autoRotateSpeed={0.5}
        minDistance={3}
        maxDistance={20}
        maxPolarAngle={Math.PI / 1.8}
        minPolarAngle={Math.PI / 6}
        target={[0, 0, 0]}
        dampingFactor={0.05}
        enableDamping
      />
    </>
  )
}`,
    badge: 'CAMERA',
    badgeVariant: 'water' as const,
  },
  {
    title: 'Guardian 3D Representation',
    icon: Shield,
    description: 'Each Guardian has a 3D avatar with elemental materials. Colors, emissive intensities, and particle effects map to their design tokens.',
    code: `import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const GUARDIAN_MATERIALS = {
  Foundation: {
    color: '#8b7355',
    emissive: '#6b5640',
    emissiveIntensity: 0.3,
    metalness: 0.8,
    roughness: 0.6,
  },
  Fire: {
    color: '#ff6b35',
    emissive: '#ff6b35',
    emissiveIntensity: 0.8,
    metalness: 0.3,
    roughness: 0.2,
  },
  Crown: {
    color: '#ffd700',
    emissive: '#ffd700',
    emissiveIntensity: 1.0,
    metalness: 0.9,
    roughness: 0.1,
  },
  // ... one per Guardian
}

function GuardianOrb({ gate }: { gate: string }) {
  const ref = useRef<THREE.Mesh>(null)
  const mat = GUARDIAN_MATERIALS[
    gate as keyof typeof GUARDIAN_MATERIALS
  ]

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y =
        state.clock.elapsedTime * 0.5
      ref.current.position.y =
        Math.sin(state.clock.elapsedTime) * 0.2
    }
  })

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial {...mat} />
    </mesh>
  )
}`,
    badge: 'GUARDIAN',
    badgeVariant: 'void' as const,
  },
  {
    title: 'XR (VR/AR) Integration',
    icon: Glasses,
    description: 'WebXR support enables VR/AR experiences. The XR button appears when hardware is detected. Scene scales adapt for immersive viewing.',
    code: `import { Canvas } from '@react-three/fiber'
import { XR, XRButton } from '@react-three/xr'

function ImmersiveScene() {
  return (
    <div className="relative">
      {/* XR Enter button */}
      <XRButton
        mode="AR"
        className="absolute top-4 right-4 z-10
          bg-arcane-crystal text-cosmic-void
          px-4 py-2 rounded-xl font-sans text-sm
          hover:bg-arcane-crystal/80 transition-colors
          shadow-glow-crystal"
      >
        Enter AR
      </XRButton>

      <Canvas>
        <XR
          referenceSpace="local-floor"
          foveation={1}
        >
          {/* Scene content renders in XR */}
          <ArcaneaLighting />
          <GuardianOrb gate="Crown" />
          <CameraSetup />
        </XR>
      </Canvas>
    </div>
  )
}`,
    badge: 'XR',
    badgeVariant: 'crystal' as const,
  },
]

const qualityTiers = [
  {
    tier: 'Ultra',
    fps: '60+',
    icon: Monitor,
    features: ['Full particle systems', 'Post-processing (bloom, DOF)', 'High-res shadow maps (2048)', '64-segment geometries', 'HDR environment maps'],
    color: 'text-arcane-crystal',
    bgColor: 'bg-arcane-crystal/10',
    borderColor: 'border-arcane-crystal/20',
  },
  {
    tier: 'Standard',
    fps: '30-60',
    icon: Smartphone,
    features: ['Reduced particles', 'No post-processing', 'Medium shadows (1024)', '32-segment geometries', 'Static environment'],
    color: 'text-arcane-gold',
    bgColor: 'bg-arcane-gold/10',
    borderColor: 'border-arcane-gold/20',
  },
  {
    tier: 'Reduced',
    fps: '<30',
    icon: Cpu,
    features: ['No particles', 'No shadows', 'Basic materials only', '16-segment geometries', 'Static lighting'],
    color: 'text-arcane-fire',
    bgColor: 'bg-arcane-fire/10',
    borderColor: 'border-arcane-fire/20',
  },
]

export default function DesignLabV8() {
  const [selectedPattern, setSelectedPattern] = useState(0)
  const [copied, setCopied] = useState(false)
  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const heroY = useTransform(scrollYProgress, [0, 0.6], [0, 80])

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-[100dvh] bg-cosmic-void bg-cosmic-mesh relative">
      <LabCosmicBackground />
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 pt-8 lg:pt-12 space-y-20 pb-20">
        {/* Hero */}
        <motion.section
          ref={heroRef}
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="text-center pt-8 min-h-[50vh] flex flex-col items-center justify-center"
          style={{ opacity: heroOpacity, y: heroY }}
        >
        <motion.div variants={cosmicFadeIn}>
          <Badge variant="crystal" className="mb-6 font-sans text-xs tracking-wider px-4 py-1">
            <Icons.Box className="w-3.5 h-3.5 mr-2" />
            V8 -- 3D & SPATIAL
          </Badge>
        </motion.div>

        <motion.h1
          variants={cosmicFadeInUp}
          className="text-fluid-5xl font-display text-white mb-6 leading-tight"
        >
          3D & Spatial
          <span className="block text-gradient-cosmic">Three.js & XR Patterns</span>
        </motion.h1>

        <motion.p
          variants={cosmicFadeIn}
          className="text-fluid-lg font-body text-text-secondary max-w-3xl mx-auto mb-10 leading-relaxed"
        >
          The design system extends into three dimensions. These patterns document how Three.js
          integrates with Next.js, how Guardians are represented in 3D space, and how performance
          adapts to every device. From browser to headset, the mythology renders everywhere.
        </motion.p>

        {/* 3D mock visualization */}
        <motion.div
          variants={cosmicFadeIn}
          className="max-w-3xl mx-auto glass rounded-2xl overflow-hidden border border-white/10"
        >
          <div className="relative aspect-[16/9] bg-cosmic-deep flex items-center justify-center overflow-hidden">
            {/* Pseudo-3D visualization with CSS */}
            <div className="absolute inset-0" style={{ perspective: '800px' }}>
              <motion.div
                animate={{ rotateY: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 flex items-center justify-center"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {[0, 60, 120, 180, 240, 300].map((angle, i) => {
                  const colors = ['#7fffd4', '#78a6ff', '#9966ff', '#ff6b35', '#ffd700', '#00ff88']
                  return (
                    <motion.div
                      key={angle}
                      className="absolute w-16 h-16 rounded-xl border border-white/10"
                      style={{
                        transform: `rotateY(${angle}deg) translateZ(120px)`,
                        backgroundColor: `${colors[i]}15`,
                        borderColor: `${colors[i]}30`,
                        boxShadow: `0 0 20px ${colors[i]}20`,
                      }}
                    />
                  )
                })}
              </motion.div>
            </div>

            {/* Center orb */}
            <motion.div
              animate={{ scale: [1, 1.1, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="relative z-10 w-24 h-24 rounded-full bg-gradient-to-br from-arcane-crystal/20 to-arcane-void/20 border border-arcane-crystal/30 flex items-center justify-center shadow-glow-crystal"
            >
              <Icons.Box className="w-10 h-10 text-arcane-crystal" />
            </motion.div>

            {/* Corner labels */}
            <div className="absolute top-3 left-3 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-[10px] font-mono text-text-muted">Three.js r162</span>
            </div>
            <div className="absolute top-3 right-3">
              <Badge variant="crystal" className="text-[9px]">WEBGL2</Badge>
            </div>
            <div className="absolute bottom-3 left-3">
              <span className="text-[10px] font-mono text-text-muted">@react-three/fiber 8.x</span>
            </div>
            <div className="absolute bottom-3 right-3">
              <span className="text-[10px] font-mono text-text-muted">60 FPS</span>
            </div>
          </div>
        </motion.div>
      </motion.section>

      {/* Pattern Navigation */}
      <motion.section
        variants={staggerContainer}
        {...fadeInViewport}
      >
        <motion.div variants={cosmicFadeIn} className="text-center mb-10">
          <Badge variant="void" className="mb-4 font-sans text-xs tracking-wider px-3 py-1">
            <Icons.Code2 className="w-3 h-3 mr-1.5" />
            IMPLEMENTATION PATTERNS
          </Badge>
          <h2 className="text-fluid-3xl font-display text-white mb-3">
            Code Patterns
          </h2>
          <p className="text-fluid-base font-body text-text-secondary max-w-2xl mx-auto">
            Six documented patterns for integrating 3D into the Arcanea platform.
            Each pattern includes production-ready code.
          </p>
        </motion.div>

        {/* Pattern tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {threejsPatterns.map((pattern, i) => {
            const Icon = pattern.icon
            return (
              <Button
                key={pattern.title}
                variant={selectedPattern === i ? 'crystal' : 'outline'}
                size="sm"
                onClick={() => setSelectedPattern(i)}
                className="rounded-xl font-sans text-xs"
              >
                <Icon className="w-3.5 h-3.5 mr-1.5" />
                {pattern.title.split(' ')[0]}
              </Button>
            )
          })}
        </div>

        {/* Selected pattern detail */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedPattern}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="glass rounded-2xl p-6 border border-white/10"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                {(() => {
                  const Icon = threejsPatterns[selectedPattern].icon
                  return <Icon className="w-6 h-6 text-arcane-crystal" />
                })()}
                <div>
                  <h3 className="text-xl font-display text-white">{threejsPatterns[selectedPattern].title}</h3>
                  <Badge variant={threejsPatterns[selectedPattern].badgeVariant} className="text-[9px] mt-1">
                    {threejsPatterns[selectedPattern].badge}
                  </Badge>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleCopyCode(threejsPatterns[selectedPattern].code)}
                className="rounded-lg text-xs"
              >
                {copied ? <Icons.Check className="w-3.5 h-3.5 mr-1" /> : <Icons.Copy className="w-3.5 h-3.5 mr-1" />}
                {copied ? 'Copied' : 'Copy'}
              </Button>
            </div>

            <p className="text-sm font-body text-text-secondary mb-6 leading-relaxed">
              {threejsPatterns[selectedPattern].description}
            </p>

            <div className="glass rounded-xl p-4 overflow-x-auto border border-white/5">
              <pre className="text-xs font-mono text-text-secondary whitespace-pre">
                {threejsPatterns[selectedPattern].code}
              </pre>
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.section>

      {/* Quality Tiers */}
      <motion.section
        variants={staggerContainer}
        {...fadeInViewport}
      >
        <motion.div variants={cosmicFadeIn} className="text-center mb-10">
          <Badge variant="fire" className="mb-4 font-sans text-xs tracking-wider px-3 py-1">
            <Gauge className="w-3 h-3 mr-1.5" />
            PERFORMANCE TIERS
          </Badge>
          <h2 className="text-fluid-3xl font-display text-white mb-3">Adaptive Quality</h2>
          <p className="text-fluid-base font-body text-text-secondary max-w-2xl mx-auto">
            The 3D system automatically downgrades visual fidelity to maintain frame rate.
            Three tiers ensure smooth experience on any hardware.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {qualityTiers.map((qt) => {
            const Icon = qt.icon
            return (
              <motion.div
                key={qt.tier}
                variants={staggerItem}
                className={`glow-card rounded-2xl p-6 border ${qt.borderColor}`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-lg ${qt.bgColor} flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 ${qt.color}`} />
                  </div>
                  <div>
                    <h3 className={`text-lg font-display ${qt.color}`}>{qt.tier}</h3>
                    <span className="text-xs font-mono text-text-muted">{qt.fps} FPS</span>
                  </div>
                </div>
                <ul className="space-y-2">
                  {qt.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <Icons.Zap className={`w-3 h-3 ${qt.color} flex-shrink-0 mt-0.5`} />
                      <span className="text-sm font-sans text-text-secondary">{f}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )
          })}
        </div>
      </motion.section>

      {/* Architecture Overview */}
      <motion.section
        variants={staggerContainer}
        {...fadeInViewport}
        className="glass rounded-3xl p-8 border-gradient"
      >
        <motion.div variants={cosmicFadeIn}>
          <Badge variant="gold" className="mb-6 font-sans text-xs tracking-wider px-3 py-1">
            <Icons.Layers className="w-3 h-3 mr-1.5" />
            ARCHITECTURE
          </Badge>
          <h2 className="text-fluid-2xl font-display text-white mb-6">
            3D Integration Stack
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              {[
                { label: 'Renderer', value: '@react-three/fiber', desc: 'React reconciler for Three.js' },
                { label: 'Helpers', value: '@react-three/drei', desc: 'Ready-made abstractions' },
                { label: 'Physics', value: '@react-three/rapier', desc: 'WASM-based physics engine' },
                { label: 'XR', value: '@react-three/xr', desc: 'WebXR device API bindings' },
                { label: 'Post', value: '@react-three/postprocessing', desc: 'GPU post-processing effects' },
              ].map((dep) => (
                <div key={dep.label} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-mono text-arcane-crystal">{dep.label.slice(0, 2).toUpperCase()}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <code className="text-sm font-mono text-white">{dep.value}</code>
                    </div>
                    <p className="text-xs font-sans text-text-muted">{dep.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              {[
                { label: 'Loading', desc: 'Dynamic import with ssr: false. Skeleton loaders in cosmic-deep with pulse animation.' },
                { label: 'Error Boundary', desc: 'Canvas-level error boundary catches WebGL context loss. Fallback to 2D visualization.' },
                { label: 'Memory', desc: 'useEffect cleanup disposes geometries, materials, and textures on unmount.' },
                { label: 'Mobile', desc: 'Touch events mapped to orbit controls. Pinch-to-zoom with momentum.' },
                { label: 'Accessibility', desc: 'Canvas has role="img" and aria-label. Keyboard navigation for orbit controls.' },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                    <Settings className="w-3.5 h-3.5 text-arcane-gold" />
                  </div>
                  <div>
                    <h4 className="text-sm font-display text-white">{item.label}</h4>
                    <p className="text-xs font-body text-text-secondary">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.section>

        {/* Navigation */}
        <motion.section
          variants={cosmicFadeIn}
          {...fadeInViewport}
          className="flex items-center justify-between pt-8 border-t border-white/5"
        >
          <Link href="/design-lab/v7">
            <Button variant="outline" className="rounded-2xl font-sans">
              <Icons.ArrowLeft className="w-4 h-4 mr-2" />
              v7 -- Responsive
            </Button>
          </Link>
          <Link href="/design-lab/v9">
            <Button className="rounded-2xl font-sans">
              v9 -- AI Patterns
              <Icons.ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </motion.section>
      </div>
    </div>
  )
}
