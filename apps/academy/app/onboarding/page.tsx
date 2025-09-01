'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, ArrowLeft, Sparkles } from 'lucide-react'

export default function Onboarding() {
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedAcademy, setSelectedAcademy] = useState('')

  const academies = [
    {
      id: 'visual-synthesis',
      name: 'Visual Synthesis',
      luminor: 'Lumina',
      description: 'Master AI art generation with Midjourney, DALL-E, and visual storytelling',
      icon: '🎨'
    },
    {
      id: 'music-synthesis', 
      name: 'Music Synthesis',
      luminor: 'Harmonix',
      description: 'Create AI-powered music with Suno, sound design, and composition',
      icon: '🎵'
    },
    {
      id: 'narrative-forge',
      name: 'Narrative Forge', 
      luminor: 'Scripta',
      description: 'Write with AI assistance using ChatGPT, Claude, and storytelling',
      icon: '📖'
    }
  ]

  const steps = [
    {
      title: "Welcome to Your Creative Journey",
      content: (
        <div className="text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full mx-auto mb-6 flex items-center justify-center">
            <Sparkles className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Master AI-Assisted Creativity?</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            The Arcanean Luminors from 100 years in the future are here to guide you. 
            Each brings unique expertise and personality to accelerate your creative mastery.
          </p>
        </div>
      )
    },
    {
      title: "Choose Your First Academy",
      content: (
        <div>
          <h2 className="text-3xl font-bold text-white mb-6 text-center">Which Path Calls to You?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {academies.map((academy) => (
              <button
                key={academy.id}
                onClick={() => setSelectedAcademy(academy.id)}
                className={`p-6 rounded-xl border-2 transition-all text-left ${
                  selectedAcademy === academy.id 
                    ? 'border-cyan-400 bg-cyan-400/10' 
                    : 'border-white/20 bg-white/5 hover:border-white/40 hover:bg-white/10'
                }`}
              >
                <div className="text-3xl mb-3">{academy.icon}</div>
                <h3 className="text-lg font-bold text-white mb-2">{academy.name}</h3>
                <p className="text-sm text-gray-300 mb-3">{academy.description}</p>
                <div className="text-xs text-cyan-400">Guided by {academy.luminor}</div>
              </button>
            ))}
          </div>
        </div>
      )
    }
  ]

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      if (selectedAcademy) {
        window.location.href = '/luminor'
      }
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const canProceed = currentStep === 0 || (currentStep === 1 && selectedAcademy)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="border-b border-white/10 bg-black/20 backdrop-blur-md">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full"></div>
              <span className="text-xl font-bold text-white">Arcanea Academy</span>
            </Link>
            
            <div className="flex space-x-2">
              {steps.map((_, index) => (
                <div 
                  key={index}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index <= currentStep ? 'bg-cyan-400' : 'bg-white/20'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-lg text-cyan-400 mb-2">Step {currentStep + 1} of {steps.length}</h1>
            <div className="text-sm text-gray-400">{steps[currentStep].title}</div>
          </div>

          <div className="mb-12">
            {steps[currentStep].content}
          </div>

          <div className="flex justify-between items-center max-w-2xl mx-auto">
            <button
              onClick={prevStep}
              disabled={currentStep === 0}
              className="flex items-center space-x-2 px-6 py-3 text-gray-400 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <button
              onClick={nextStep}
              disabled={!canProceed}
              className="flex items-center space-x-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-3 rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>{currentStep === steps.length - 1 ? 'Meet Your Luminor' : 'Continue'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}