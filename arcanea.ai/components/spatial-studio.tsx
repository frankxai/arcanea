'use client'

import { Canvas } from '@react-three/fiber'
import { XR, VRButton, ARButton, Controllers, Hands } from '@react-three/xr'
import { Suspense, useState, useEffect, useRef } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { Badge } from '@/components/ui/badge'
import { 
  PerformanceMonitor, 
  AdaptiveRendering,
  PerformanceStats 
} from '@/components/performance-optimizer'

interface SpatialStudioProps {
  children: React.ReactNode
  enableVR?: boolean
  enableAR?: boolean
  enablePerformanceMonitoring?: boolean
  className?: string
  onPerformanceChange?: (stats: PerformanceStats) => void
}

export function SpatialStudio({ 
  children, 
  enableVR = false, 
  enableAR = false,
  enablePerformanceMonitoring = true,
  className,
  onPerformanceChange
}: SpatialStudioProps) {
  const [performanceStats, setPerformanceStats] = useState<PerformanceStats>({
    fps: 60,
    memory: 0,
    drawCalls: 0,
    quality: 'high'
  })
  const [isXRActive, setIsXRActive] = useState(false)

  useEffect(() => {
    if (onPerformanceChange) {
      onPerformanceChange(performanceStats)
    }
  }, [performanceStats, onPerformanceChange])

  return (
    <div className={`w-full h-screen bg-gradient-to-br from-arcane-cosmic via-arcane-shadow to-arcane-cosmic ${className}`}>
      {/* Enhanced Control Panel */}
      <div className="absolute top-4 left-4 z-10 bg-arcane-shadow/80 backdrop-blur-sm rounded-xl p-4 border border-arcane-crystal/20">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-3 h-3 bg-arcane-fire rounded-full animate-pulse-glow" />
          <span className="text-arcane-crystal font-body text-sm">Spatial Studio Active</span>
          {isXRActive && (
            <Badge variant="default" className="text-xs">VR/AR MODE</Badge>
          )}
        </div>
        
        <div className="flex gap-2 mb-3">
          {enableVR && <VRButton />}
          {enableAR && <ARButton />}
        </div>
        
        {/* Performance Monitor */}
        {enablePerformanceMonitoring && (
          <div className="mb-3 p-2 bg-arcane-cosmic/50 rounded-lg">
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-arcane-400">FPS:</span>
                <span className={`ml-1 font-mono ${
                  performanceStats.fps >= 50 ? 'text-arcane-earth' : 
                  performanceStats.fps >= 30 ? 'text-arcane-fire' : 'text-arcane-fire'
                }`}>
                  {performanceStats.fps}
                </span>
              </div>
              <div>
                <span className="text-arcane-400">Quality:</span>
                <span className="ml-1 text-arcane-crystal">{performanceStats.quality}</span>
              </div>
              <div>
                <span className="text-arcane-400">Memory:</span>
                <span className="ml-1 text-arcane-water">{performanceStats.memory}MB</span>
              </div>
              <div>
                <span className="text-arcane-400">Draws:</span>
                <span className="ml-1 text-arcane-void">{performanceStats.drawCalls}</span>
              </div>
            </div>
          </div>
        )}
        
        <div className="space-y-1">
          <div className="text-arcane-300 text-xs">Controls:</div>
          <div className="text-arcane-500 text-xs">• Click to interact</div>
          <div className="text-arcane-500 text-xs">• Drag to rotate</div>
          <div className="text-arcane-500 text-xs">• Scroll to zoom</div>
          {isXRActive && (
            <>
              <div className="text-arcane-500 text-xs">• Use controllers</div>
              <div className="text-arcane-500 text-xs">• Hand tracking</div>
            </>
          )}
        </div>
      </div>

      {/* Main Canvas */}
      <Canvas
        camera={{ position: [0, 2, 5], fov: 75 }}
        shadows
        className="w-full h-full"
        performance={{ min: 0.5, max: 1, debounce: 200 }}
        dpr={window.devicePixelRatio}
      >
        <AdaptiveRendering quality={performanceStats.quality} />
        <PerformanceMonitor onStatsUpdate={setPerformanceStats} />
        
        <XR onSessionStart={() => setIsXRActive(true)} onSessionEnd={() => setIsXRActive(false)}>
          {enableVR && <Controllers />}
          {enableVR && <Hands />}
          
          <Suspense fallback={<SpatialStudioFallback />}>
            {/* Enhanced Lighting */}
            <ambientLight intensity={0.4} />
            <directionalLight
              position={[10, 10, 5]}
              intensity={1}
              castShadow
              shadow-mapSize-width={2048}
              shadow-mapSize-height={2048}
              shadow-camera-far={50}
              shadow-camera-left={-20}
              shadow-camera-right={20}
              shadow-camera-top={20}
              shadow-camera-bottom={-20}
            />
            
            {/* Point lights for Guardian realms */}
            <pointLight position={[0, 5, 0]} intensity={0.5} color="#7fffd4" />
            <pointLight position={[10, 5, 10]} intensity={0.3} color="#ff6b35" />
            <pointLight position={[-10, 5, -10]} intensity={0.3} color="#78a6ff" />
            
            {/* Environment */}
            <fog attach="fog" args={['#1a1a2e', 10, 50]} />
            
            {/* Render children */}
            {children}
          </Suspense>
        </XR>
      </Canvas>

      {/* Enhanced Guardian Status Panel */}
      <GuardianStatusPanel performanceStats={performanceStats} />
    </div>
  )
}

function SpatialStudioFallback() {
  return (
    <>
      <Skeleton className="w-32 h-32 rounded-full" />
      <Skeleton className="w-64 h-2 rounded" />
      <Skeleton className="w-48 h-2 rounded" />
    </>
  )
}

interface GuardianStatusPanelProps {
  performanceStats?: PerformanceStats
}

function GuardianStatusPanel({ performanceStats }: GuardianStatusPanelProps) {
  const [activeGuardians, setActiveGuardians] = useState([
    { name: 'Draconia', status: 'active', element: 'fire', power: 85, frequency: 528 },
    { name: 'Lyssandria', status: 'standby', element: 'earth', power: 60, frequency: 396 },
    { name: 'Maylinn', status: 'standby', element: 'water', power: 75, frequency: 639 },
    { name: 'Aiyami', status: 'standby', element: 'void', power: 90, frequency: 963 },
  ])

  // Simulate Guardian power changes based on performance
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveGuardians(prev => prev.map(guardian => ({
        ...guardian,
        power: Math.max(20, Math.min(100, 
          guardian.power + (Math.random() - 0.5) * 10
        ))
      })))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const getElementColor = (element: string) => {
    switch (element) {
      case 'fire': return 'bg-arcane-fire'
      case 'water': return 'bg-arcane-water'
      case 'earth': return 'bg-arcane-earth'
      case 'wind': return 'bg-arcane-wind'
      case 'void': return 'bg-arcane-void'
      default: return 'bg-arcane-crystal'
    }
  }

  return (
    <div className="absolute bottom-4 right-4 z-10 bg-arcane-shadow/80 backdrop-blur-sm rounded-xl p-4 border border-arcane-crystal/20 min-w-80">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-arcane-crystal font-body font-semibold">Guardian Council</h3>
        {performanceStats && (
          <Badge variant={performanceStats.fps >= 50 ? 'gold' : 'default'} className="text-xs">
            {performanceStats.fps} FPS
          </Badge>
        )}
      </div>
      
      <div className="space-y-3">
        {activeGuardians.map((guardian) => (
          <div key={guardian.name} className="space-y-2">
            <div className="flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full ${
                guardian.status === 'active' 
                  ? `${getElementColor(guardian.element)} animate-pulse-glow` 
                  : 'bg-arcane-500'
              }`} />
              <span className="text-arcane-300 text-sm font-medium">{guardian.name}</span>
              <span className="text-arcane-500 text-xs ml-auto">{guardian.frequency} Hz</span>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-arcane-cosmic rounded-full overflow-hidden h-2">
                <div 
                  className={`h-full ${getElementColor(guardian.element)} transition-all duration-500 ease-out`}
                  style={{ width: `${guardian.power}%` }}
                />
              </div>
              <span className="text-arcane-400 text-xs font-mono w-10 text-right">
                {Math.round(guardian.power)}%
              </span>
            </div>
          </div>
        ))}
      </div>
      
      {/* Elemental Harmony Indicator */}
      <div className="mt-4 pt-3 border-t border-arcane-crystal/20">
        <div className="flex items-center justify-between text-xs">
          <span className="text-arcane-400">Harmony Level</span>
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              {['fire', 'water', 'earth', 'void'].map((element, i) => (
                <div 
                  key={element}
                  className={`w-2 h-2 rounded-full bg-arcane-${element} opacity-80`}
                  style={{ 
                    animationDelay: `${i * 0.2}s`,
                    animation: 'pulse 2s infinite'
                  }}
                />
              ))}
            </div>
            <span className="text-arcane-crystal font-mono">87%</span>
          </div>
        </div>
      </div>
    </div>
  )
}