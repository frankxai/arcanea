'use client'

import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useState, useRef } from 'react'
import { Badge } from '@/components/ui/badge'

export interface PerformanceStats {
  fps: number
  memory: number
  drawCalls: number
  quality: 'low' | 'medium' | 'high'
}

interface PerformanceMonitorProps {
  onStatsUpdate: (stats: PerformanceStats) => void
}

export function PerformanceMonitor({ onStatsUpdate }: PerformanceMonitorProps) {
  const { gl } = useThree()
  const statsRef = useRef({
    fps: 60,
    frameCount: 0,
    lastTime: performance.now(),
    memory: 0
  })

  useFrame(() => {
    const now = performance.now()
    const delta = now - statsRef.current.lastTime
    statsRef.current.frameCount++

    if (delta >= 1000) {
      const fps = Math.round((statsRef.current.frameCount * 1000) / delta)
      
      // Memory usage (if available)
      let memory = 0
      if ('memory' in performance) {
        memory = Math.round((performance as any).memory.usedJSHeapSize / 1048576)
      }

      const stats: PerformanceStats = {
        fps,
        memory,
        drawCalls: gl.info.render.calls,
        quality: fps >= 50 ? 'high' : fps >= 30 ? 'medium' : 'low'
      }

      onStatsUpdate(stats)
      
      statsRef.current.frameCount = 0
      statsRef.current.lastTime = now
      statsRef.current.memory = memory
    }
  })

  return null
}

interface AdaptiveRenderingProps {
  quality: 'low' | 'medium' | 'high'
}

export function AdaptiveRendering({ quality }: AdaptiveRenderingProps) {
  const { gl, camera } = useThree()

  useEffect(() => {
    switch (quality) {
      case 'low':
        gl.setPixelRatio(Math.min(window.devicePixelRatio, 1))
        gl.shadowMap.enabled = false
        camera.far = 30
        break
      case 'medium':
        gl.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
        gl.shadowMap.enabled = true
        gl.shadowMap.type = 2 // PCFSoft
        camera.far = 50
        break
      case 'high':
        gl.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        gl.shadowMap.enabled = true
        gl.shadowMap.type = 3 // PCFSoft
        camera.far = 100
        break
    }
  }, [quality, gl, camera])

  return null
}

export function PerformancePanel({ stats }: { stats: PerformanceStats }) {
  const getQualityColor = (quality: string) => {
    switch (quality) {
      case 'high': return 'earth'
      case 'medium': return 'fire'
      case 'low': return 'fire'
      default: return 'crystal'
    }
  }

  return (
    <div className="fixed top-4 right-4 z-50 bg-arcane-shadow/90 backdrop-blur-md rounded-lg p-3 border border-arcane-crystal/20">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        <span className="text-arcane-crystal text-xs font-medium">Performance</span>
      </div>
      
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="flex items-center gap-2">
          <span className="text-arcane-400">FPS:</span>
          <span className={`font-mono ${
            stats.fps >= 50 ? 'text-green-400' : 
            stats.fps >= 30 ? 'text-yellow-400' : 'text-red-400'
          }`}>
            {stats.fps}
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-arcane-400">Quality:</span>
          <Badge variant={getQualityColor(stats.quality) as any} className="text-xs">
            {stats.quality}
          </Badge>
        </div>
        
        {stats.memory > 0 && (
          <div className="flex items-center gap-2 col-span-2">
            <span className="text-arcane-400">Memory:</span>
            <span className={`font-mono ${
              stats.memory < 100 ? 'text-green-400' : 
              stats.memory < 200 ? 'text-yellow-400' : 'text-red-400'
            }`}>
              {stats.memory}MB
            </span>
          </div>
        )}
        
        <div className="flex items-center gap-2 col-span-2">
          <span className="text-arcane-400">Draw Calls:</span>
          <span className="font-mono text-arcane-crystal">{stats.drawCalls}</span>
        </div>
      </div>
    </div>
  )
}