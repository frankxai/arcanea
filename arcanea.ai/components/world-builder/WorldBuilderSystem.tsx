'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Globe, Crown } from 'lucide-react'

export default function WorldBuilderSystem() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-5xl font-bold text-white text-center mb-8">
          🌍 World Builder
        </h1>
        <p className="text-gray-300 text-center text-lg">
          Create immersive worlds with Guardian guidance
        </p>
      </div>
    </div>
  )
}
