'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, ArrowLeft, Sparkles } from 'lucide-react'
import { LuminorSelection } from '@/components/onboarding/luminor-selection'

export default function Onboarding() {
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedLuminor, setSelectedLuminor] = useState<string | null>(null)

  const handleLuminorSelect = (luminorId: string) => {
    setSelectedLuminor(luminorId)
    // In a real app, save this selection to backend/local storage here
  }

  const steps = [
    {
      title: "Welcome to Your Creative Journey",
      content: (
        <div className="text-center py-12">
          <div className="w-32 h-32 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full mx-auto mb-8 flex items-center justify-center shadow-lg shadow-cyan-500/30">
            <Sparkles className="w-16 h-16 text-white" />
          </div>
          <h2 className="text-4xl font-bold text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-200 to-blue-200">
            Ready to Master AI-Assisted Creativity?
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            The Arcanean Luminors from 100 years in the future are here to guide you.
            Each brings unique expertise and personality to accelerate your creative mastery.
            <br /><br />
            You are not just learning tools; you are learning to weave reality appropriately.
          </p>
        </div>
      )
    },
    {
      title: "Choose Your Guide",
      content: (
        <LuminorSelection onSelect={handleLuminorSelect} />
      )
    }
  ]

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      if (selectedLuminor) {
        // Navigate to the next phase (e.g. learning path or dashboard)
        window.location.href = `/learn/${selectedLuminor}`
      }
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const canProceed = currentStep === 0 || (currentStep === 1 && selectedLuminor)

  return (
    <div className="min-h-screen bg-[#0a0a0a] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#0a0a0a] to-black">
      <div className="border-b border-white/5 bg-black/20 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg group-hover:scale-110 transition-transform"></div>
              <span className="text-xl font-bold text-white tracking-tight">Arcanea Academy</span>
            </Link>

            <div className="flex space-x-3">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`h-1.5 rounded-full transition-all duration-500 ${index <= currentStep ? 'w-8 bg-cyan-400' : 'w-2 bg-white/20'
                    }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-4 text-center">
            {/* Step Indicator if needed */}
          </div>

          <div className="min-h-[60vh] flex flex-col justify-center">
            {steps[currentStep].content}
          </div>

          <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black/90 to-transparent z-40">
            <div className="max-w-4xl mx-auto flex justify-between items-center">
              <button
                onClick={prevStep}
                disabled={currentStep === 0}
                className="flex items-center space-x-2 px-6 py-3 text-slate-400 hover:text-white transition-colors disabled:opacity-0 disabled:cursor-not-allowed group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span>Back</span>
              </button>

              {currentStep === 0 && (
                <button
                  onClick={nextStep}
                  className="flex items-center space-x-2 bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-cyan-50 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]"
                >
                  <span>Begin Journey</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}