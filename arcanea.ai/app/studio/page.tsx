'use client'

import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei'
import { SpatialStudio } from '@/components/spatial-studio'
import { GuardianEntity, GuardianRealm } from '@/components/guardian-entity'
import { GuardianConfig } from '@/types/guardian'

const guardians: GuardianConfig[] = [
  {
    name: 'Draconia',
    element: 'fire',
    frequency: 528,
    description: 'Guardian of transformation and creative fire',
    power: 85
  },
  {
    name: 'Lyssandria', 
    element: 'earth',
    frequency: 396,
    description: 'Guardian of foundation and security',
    power: 75
  },
  {
    name: 'Maylinn',
    element: 'water', 
    frequency: 639,
    description: 'Guardian of heart and community',
    power: 90
  },
  {
    name: 'Alera',
    element: 'wind',
    frequency: 741,
    description: 'Guardian of voice and communication',
    power: 70
  },
  {
    name: 'Aiyami',
    element: 'void',
    frequency: 963,
    description: 'Guardian of crown and architecture',
    power: 95
  }
]

export default function SpatialStudioPage() {
  const [activeGuardian, setActiveGuardian] = useState<string>('Draconia')
  const [isInteracting, setIsInteracting] = useState(false)

  const selectedGuardian = guardians.find(g => g.name === activeGuardian)

  return (
    <div className="w-full h-screen relative">
      {/* Header Controls */}
      <div className="absolute top-4 right-4 z-20 bg-arcane-shadow/90 backdrop-blur-md rounded-xl p-4 border border-arcane-crystal/20 max-w-sm">
        <h1 className="text-2xl font-display text-arcane-crystal mb-4">
          Spatial Worldbuilding Studio
        </h1>
        
        <div className="space-y-3">
          <div className="text-arcane-300 text-sm font-medium">
            Active Guardian:
          </div>
          
          {/* Guardian Selection */}
          <div className="grid grid-cols-2 gap-2">
            {guardians.map((guardian) => (
              <button
                key={guardian.name}
                onClick={() => setActiveGuardian(guardian.name)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeGuardian === guardian.name
                    ? 'bg-arcane-fire text-white'
                    : 'bg-arcane-cosmic/50 text-arcane-300 hover:bg-arcane-cosmic/70'
                }`}
              >
                {guardian.name}
              </button>
            ))}
          </div>

          {/* Selected Guardian Info */}
          {selectedGuardian && (
            <div className="mt-4 p-3 bg-arcane-cosmic/30 rounded-lg border border-arcane-crystal/10">
              <div className="text-arcane-crystal font-medium mb-1">
                {selectedGuardian.name}
              </div>
              <div className="text-arcane-400 text-xs mb-2">
                {selectedGuardian.description}
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-arcane-400">
                  Frequency: {selectedGuardian.frequency} Hz
                </span>
                <span className="text-arcane-fire">
                  Power: {selectedGuardian.power}%
                </span>
              </div>
            </div>
          )}

          {/* Creation Tools */}
          <div className="pt-3 border-t border-arcane-cosmic/50">
            <div className="text-arcane-300 text-sm font-medium mb-2">
              Creation Tools:
            </div>
            <div className="space-y-2">
              <button className="w-full px-3 py-2 bg-arcane-crystal/20 hover:bg-arcane-crystal/30 rounded-lg text-arcane-300 text-sm transition-colors">
                🎭 Create Character
              </button>
              <button className="w-full px-3 py-2 bg-arcane-crystal/20 hover:bg-arcane-crystal/30 rounded-lg text-arcane-300 text-sm transition-colors">
                🗺️ Design Location
              </button>
              <button className="w-full px-3 py-2 bg-arcane-crystal/20 hover:bg-arcane-crystal/30 rounded-lg text-arcane-300 text-sm transition-colors">
                📖 Craft Story
              </button>
              <button className="w-full px-3 py-2 bg-arcane-fire hover:bg-arcane-fire/80 rounded-lg text-white text-sm transition-colors font-medium">
                ⚡ Begin Creation
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3D Spatial Interface */}
      <SpatialStudio enableVR={true} enableAR={false}>
        <GuardianRealm guardian={selectedGuardian!}>
          {/* Central Guardian Entity */}
          <GuardianEntity
            guardian={selectedGuardian!}
            isActive={true}
            onClick={() => setIsInteracting(!isInteracting)}
            position={[0, 1, 0]}
          />

          {/* Creation Manifestation Nodes */}
          <group position={[3, 0.5, -2]}>
            <mesh rotation={[0, Math.PI / 4, 0]}>
              <boxGeometry args={[1, 1, 1]} />
              <meshStandardMaterial
                color="#7fffd4"
                emissive="#7fffd4"
                emissiveIntensity={0.2}
                transparent
                opacity={0.8}
              />
            </mesh>
            <ContactShadows position={[0, -0.5, 0]} opacity={0.3} />
          </group>

          <group position={[-3, 0.5, -2]}>
            <mesh rotation={[0, -Math.PI / 4, 0]}>
              <tetrahedronGeometry args={[1, 0]} />
              <meshStandardMaterial
                color="#ffd700"
                emissive="#ffd700"
                emissiveIntensity={0.3}
                transparent
                opacity={0.8}
              />
            </mesh>
            <ContactShadows position={[0, -0.5, 0]} opacity={0.3} />
          </group>

          <group position={[0, 0.5, -4]}>
            <mesh rotation={[0, 0, Math.PI / 6]}>
              <octahedronGeometry args={[0.8, 0]} />
              <meshStandardMaterial
                color="#78a6ff"
                emissive="#78a6ff"
                emissiveIntensity={0.25}
                transparent
                opacity={0.8}
              />
            </mesh>
            <ContactShadows position={[0, -0.5, 0]} opacity={0.3} />
          </group>

          {/* Energy Flow Connections */}
          {isInteracting && (
            <EnergyFlowNodes guardian={selectedGuardian!} />
          )}
        </GuardianRealm>

        {/* Camera Controls */}
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={2}
          maxDistance={15}
          maxPolarAngle={Math.PI / 2}
        />

        {/* Enhanced Environment */}
        <Environment preset="night" />
      </SpatialStudio>

      {/* Interactive Status */}
      {isInteracting && (
        <div className="absolute bottom-4 left-4 z-20 bg-arcane-fire/90 backdrop-blur-md rounded-xl p-4 border border-arcane-fire/20 max-w-sm">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
            <span className="text-white font-medium">
              {selectedGuardian?.name} Active
            </span>
          </div>
          <p className="text-white/90 text-sm">
            Guardian is ready to guide your creation. Choose a creation tool to begin.
          </p>
        </div>
      )}
    </div>
  )
}

// Energy flow visualization between Guardian and creation nodes
function EnergyFlowNodes({ guardian }: { guardian: GuardianConfig }) {
  return (
    <group>
      {/* Energy streams from Guardian to creation nodes */}
      <line>
        <bufferGeometry attach="geometry">
          <bufferAttribute
            attach="attributes-position"
            args={[new Float32Array([0, 1, 0, 3, 0.5, -2]), 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#7fffd4" opacity={0.6} transparent />
      </line>
      
      <line>
        <bufferGeometry attach="geometry">
          <bufferAttribute
            attach="attributes-position"
            args={[new Float32Array([0, 1, 0, -3, 0.5, -2]), 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#ffd700" opacity={0.6} transparent />
      </line>

      <line>
        <bufferGeometry attach="geometry">
          <bufferAttribute
            attach="attributes-position"
            args={[new Float32Array([0, 1, 0, 0, 0.5, -4]), 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#78a6ff" opacity={0.6} transparent />
      </line>
    </group>
  )
}