'use client'

import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text, Float, PerspectiveCamera } from '@react-three/drei'
import { Mesh, Vector3 } from 'three'
import { cn } from '@/lib/utils'

interface GuardianEntityProps {
  guardian: {
    name: string
    element: 'fire' | 'water' | 'earth' | 'wind' | 'void'
    frequency: number
    description: string
    power?: number
  }
  position?: [number, number, number]
  isActive?: boolean
  onClick?: () => void
  className?: string
}

export function GuardianEntity({ 
  guardian, 
  position = [0, 1, 0], 
  isActive = false,
  onClick,
  className 
}: GuardianEntityProps) {
  const meshRef = useRef<Mesh>(null)
  const [hovered, setHovered] = useState(false)
  
  // Animate Guardian entity
  useFrame((state) => {
    if (!meshRef.current) return
    
    // Floating animation
    meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    
    // Gentle rotation when active
    if (isActive) {
      meshRef.current.rotation.y += 0.005
    }
    
    // Pulsing glow effect
    if (hovered || isActive) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 3) * 0.05
      meshRef.current.scale.setScalar(scale)
    }
  })

  // Element-specific colors and materials
  const getElementConfig = () => {
    switch (guardian.element) {
      case 'fire':
        return {
          color: '#ff6b35',
          emissive: '#ff6b35',
          emissiveIntensity: 0.3,
          glow: '#ff6b3540'
        }
      case 'water':
        return {
          color: '#78a6ff',
          emissive: '#78a6ff',
          emissiveIntensity: 0.2,
          glow: '#78a6ff40'
        }
      case 'earth':
        return {
          color: '#8b7355',
          emissive: '#8b7355',
          emissiveIntensity: 0.15,
          glow: '#8b735530'
        }
      case 'wind':
        return {
          color: '#00ff88',
          emissive: '#00ff88',
          emissiveIntensity: 0.25,
          glow: '#00ff8840'
        }
      case 'void':
        return {
          color: '#9966ff',
          emissive: '#9966ff',
          emissiveIntensity: 0.35,
          glow: '#9966ff60'
        }
      default:
        return {
          color: '#7fffd4',
          emissive: '#7fffd4',
          emissiveIntensity: 0.2,
          glow: '#7fffd430'
        }
    }
  }

  const elementConfig = getElementConfig()

  return (
    <group position={position}>
      {/* Guardian Crystal */}
      <Float speed={2} rotationIntensity={0.1} floatIntensity={0.2}>
        <mesh
          ref={meshRef}
          onClick={onClick}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          {/* Main crystal form */}
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color={elementConfig.color}
            emissive={elementConfig.emissive}
            emissiveIntensity={elementConfig.emissiveIntensity}
            metalness={0.8}
            roughness={0.1}
            transparent
            opacity={0.9}
          />
          
          {/* Energy field effect */}
          {(hovered || isActive) && (
            <mesh scale={1.5}>
              <octahedronGeometry args={[1.2, 0]} />
              <meshBasicMaterial
                color={elementConfig.glow}
                transparent
                opacity={0.3}
                side={2} // DoubleSide
              />
            </mesh>
          )}
        </mesh>
      </Float>

      {/* Guardian Name */}
      <Text
        position={[0, 1.5, 0]}
        fontSize={0.3}
        color="#7fffd4"
        anchorX="center"
        anchorY="middle"
        font="/fonts/inter-bold.woff"
      >
        {guardian.name}
      </Text>

      {/* Frequency Display */}
      <Text
        position={[0, 1.2, 0]}
        fontSize={0.15}
        color="#78a6ff"
        anchorX="center"
        anchorY="middle"
      >
        {guardian.frequency} Hz
      </Text>

      {/* Power Ring */}
      {guardian.power && (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
          <ringGeometry args={[1.2, 1.4, 32]} />
          <meshBasicMaterial
            color={elementConfig.color}
            transparent
            opacity={0.3}
          />
        </mesh>
      )}
    </group>
  )
}

// Guardian Environment Realm
export function GuardianRealm({ 
  guardian, 
  children 
}: { 
  guardian: GuardianEntityProps['guardian']
  children?: React.ReactNode 
}) {
  const getElementEnvironment = () => {
    switch (guardian.element) {
      case 'fire':
        return {
          fogColor: '#ff6b3530',
          groundColor: '#8b4513',
          lightColor: '#ff6b35'
        }
      case 'water':
        return {
          fogColor: '#78a6ff30',
          groundColor: '#1e3a5f',
          lightColor: '#78a6ff'
        }
      case 'earth':
        return {
          fogColor: '#8b735520',
          groundColor: '#654321',
          lightColor: '#daa520'
        }
      case 'wind':
        return {
          fogColor: '#00ff8820',
          groundColor: '#2d5a2d',
          lightColor: '#00ff88'
        }
      case 'void':
        return {
          fogColor: '#9966ff40',
          groundColor: '#1a0033',
          lightColor: '#9966ff'
        }
      default:
        return {
          fogColor: '#7fffd420',
          groundColor: '#0f3460',
          lightColor: '#7fffd4'
        }
    }
  }

  const env = getElementEnvironment()

  return (
    <>
      {/* Custom fog for this realm */}
      <fog attach="fog" args={[env.fogColor, 5, 30]} />
      
      {/* Realm ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color={env.groundColor} roughness={0.8} />
      </mesh>

      {/* Elemental particles */}
      <ElementalParticles element={guardian.element} />

      {/* Additional realm content */}
      {children}
    </>
  )
}

// Elemental particle effects
function ElementalParticles({ element }: { element: string }) {
  const particlesRef = useRef<Mesh>(null)
  
  useFrame((state) => {
    if (!particlesRef.current) return
    particlesRef.current.rotation.y += 0.001
  })

  const getParticleConfig = () => {
    switch (element) {
      case 'fire':
        return { count: 100, size: 0.05, color: '#ff6b35', speed: 0.1 }
      case 'water':
        return { count: 80, size: 0.03, color: '#78a6ff', speed: 0.05 }
      case 'earth':
        return { count: 60, size: 0.08, color: '#8b7355', speed: 0.02 }
      case 'wind':
        return { count: 120, size: 0.02, color: '#00ff88', speed: 0.15 }
      case 'void':
        return { count: 150, size: 0.04, color: '#9966ff', speed: 0.08 }
      default:
        return { count: 80, size: 0.05, color: '#7fffd4', speed: 0.05 }
    }
  }

  const config = getParticleConfig()

  return (
    <mesh ref={particlesRef}>
      <sphereGeometry args={[20, 32, 16]} />
      <meshBasicMaterial
        color={config.color}
        transparent
        opacity={0.1}
        side={2} // DoubleSide
      />
    </mesh>
  )
}