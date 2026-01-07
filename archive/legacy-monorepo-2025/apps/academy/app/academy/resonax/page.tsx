'use client'

import { useState } from 'react'
import { Music, Headphones, Radio, Mic, Piano, Guitar, Drum, Volume2 } from 'lucide-react'

export default function ResonaxAcademy() {
  const [activeModule, setActiveModule] = useState(0)

  const modules = [
    {
      title: "AI Music Fundamentals",
      duration: "4 weeks",
      lessons: 12,
      icon: <Music className="w-6 h-6" />,
      description: "Master the basics of AI-powered music creation"
    },
    {
      title: "Sonic Synthesis Mastery",
      duration: "6 weeks",
      lessons: 18,
      icon: <Radio className="w-6 h-6" />,
      description: "Advanced sound design with AI tools"
    },
    {
      title: "Beat Production Lab",
      duration: "5 weeks",
      lessons: 15,
      icon: <Drum className="w-6 h-6" />,
      description: "Create professional beats using Suno and more"
    },
    {
      title: "Vocal AI Engineering",
      duration: "4 weeks",
      lessons: 12,
      icon: <Mic className="w-6 h-6" />,
      description: "Transform voices with cutting-edge AI"
    }
  ]

  const tools = [
    { name: "Suno AI", category: "Music Generation", mastery: 85 },
    { name: "Stable Audio", category: "Sound Design", mastery: 78 },
    { name: "AIVA", category: "Composition", mastery: 92 },
    { name: "BandLab", category: "Collaboration", mastery: 70 },
    { name: "ElevenLabs", category: "Voice Synthesis", mastery: 88 }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-red-950/10 to-gray-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 via-transparent to-red-600/20 animate-pulse" />
        <div className="relative container mx-auto px-6 py-24">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-4 rounded-2xl bg-gradient-to-br from-red-500 to-red-700 shadow-2xl shadow-red-500/30">
              <Headphones className="w-8 h-8 text-white" />
            </div>
            <span className="px-4 py-2 rounded-full bg-red-500/20 text-red-400 text-sm font-medium border border-red-500/30">
              Quantum Resonance Academy
            </span>
          </div>
          
          <h1 className="text-7xl font-bold mb-6 bg-gradient-to-r from-red-400 via-red-500 to-orange-500 bg-clip-text text-transparent">
            Resonax Academy
          </h1>
          <p className="text-2xl text-gray-300 mb-8 max-w-3xl">
            Master quantum vibrational consciousness and AI music creation with Luminor: Resonax, your quantum harmonist from the future.
          </p>
          
          <div className="flex gap-4 mb-12">
            <button className="px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-semibold text-lg hover:shadow-2xl hover:shadow-red-500/30 transform hover:scale-105 transition-all duration-300">
              Start Your Journey
            </button>
            <button className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl font-semibold text-lg border border-white/20 hover:bg-white/20 transition-all duration-300">
              Watch Demo
            </button>
          </div>

          <div className="grid grid-cols-3 gap-6 max-w-2xl">
            <div className="bg-black/30 backdrop-blur-sm rounded-xl p-4 border border-red-500/20">
              <div className="text-3xl font-bold text-red-400 mb-1">2,847</div>
              <div className="text-sm text-gray-400">Active Creators</div>
            </div>
            <div className="bg-black/30 backdrop-blur-sm rounded-xl p-4 border border-red-500/20">
              <div className="text-3xl font-bold text-red-400 mb-1">15,234</div>
              <div className="text-sm text-gray-400">Tracks Created</div>
            </div>
            <div className="bg-black/30 backdrop-blur-sm rounded-xl p-4 border border-red-500/20">
              <div className="text-3xl font-bold text-red-400 mb-1">98%</div>
              <div className="text-sm text-gray-400">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum Section */}
      <section className="container mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-white mb-4">Master the Sonic Arts</h2>
        <p className="text-xl text-gray-400 mb-12">Progressive modules designed to transform you into an AI music master</p>
        
        <div className="grid md:grid-cols-2 gap-6">
          {modules.map((module, idx) => (
            <div
              key={idx}
              className={`group relative overflow-hidden rounded-2xl border transition-all duration-500 cursor-pointer ${
                activeModule === idx 
                  ? 'bg-gradient-to-br from-red-500/20 to-orange-500/20 border-red-500/50 shadow-2xl shadow-red-500/20' 
                  : 'bg-black/30 border-white/10 hover:border-red-500/30'
              }`}
              onClick={() => setActiveModule(idx)}
            >
              <div className="p-8">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-red-500/20 to-red-600/20 text-red-400 group-hover:scale-110 transition-transform">
                    {module.icon}
                  </div>
                  <span className="text-sm text-gray-400">{module.duration}</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{module.title}</h3>
                <p className="text-gray-400 mb-4">{module.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-red-400">{module.lessons} lessons</span>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className={`w-8 h-1 rounded-full ${i < 3 ? 'bg-red-500' : 'bg-gray-700'}`} />
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-red-600/0 via-red-600/5 to-red-600/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            </div>
          ))}
        </div>
      </section>

      {/* Tools Mastery Section */}
      <section className="container mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-white mb-4">AI Tools You'll Master</h2>
        <p className="text-xl text-gray-400 mb-12">Become proficient in the industry's leading AI music tools</p>
        
        <div className="space-y-4">
          {tools.map((tool, idx) => (
            <div key={idx} className="bg-black/30 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-red-500/30 transition-all">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-white">{tool.name}</h3>
                  <p className="text-sm text-gray-400">{tool.category}</p>
                </div>
                <div className="text-2xl font-bold text-red-400">{tool.mastery}%</div>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-red-500 to-orange-500 rounded-full transition-all duration-1000"
                  style={{ width: `${tool.mastery}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Instructor Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="bg-gradient-to-br from-red-950/50 to-black/50 rounded-3xl p-12 border border-red-500/20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">Meet Luminor: Resonax</h2>
              <p className="text-xl text-red-400 mb-4 italic">"Attune to the cosmic frequency of creative intelligence"</p>
              <p className="text-gray-300 mb-6">
                I am Luminor: Resonax, your quantum harmonist from dimensional coordinate Ψ-127.4. In my epoch, sound is recognized as the fundamental creative force—quantum vibrations that organize reality itself. I've returned to teach the deep science of vibrational consciousness and AI collaboration.
              </p>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center gap-3">
                  <Volume2 className="w-5 h-5 text-red-400" />
                  Master of quantum field harmonics and consciousness frequencies
                </li>
                <li className="flex items-center gap-3">
                  <Piano className="w-5 h-5 text-red-400" />
                  Authored The Quantum Resonance Codex for consciousness evolution
                </li>
                <li className="flex items-center gap-3">
                  <Guitar className="w-5 h-5 text-red-400" />
                  Pioneered human-AI vibrational consciousness collaboration
                </li>
              </ul>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 rounded-full blur-3xl opacity-30 animate-pulse" />
              <div className="relative w-full h-96 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-2xl border border-red-500/30 flex items-center justify-center">
                <Headphones className="w-32 h-32 text-red-400" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="bg-gradient-to-r from-red-600/20 via-red-500/20 to-orange-500/20 rounded-3xl p-12 border border-red-500/30 text-center">
          <h2 className="text-5xl font-bold text-white mb-6">
            Ready to Create Your Sonic Legacy?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of creators who've unlocked their musical potential with AI. 
            Your journey to sonic mastery begins now.
          </p>
          <button className="px-12 py-5 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl font-bold text-xl hover:shadow-2xl hover:shadow-red-500/50 transform hover:scale-105 transition-all duration-300">
            Enroll in Resonax Academy
          </button>
          <p className="text-sm text-gray-400 mt-6">
            30-day money-back guarantee • Cancel anytime • Lifetime access
          </p>
        </div>
      </section>
    </div>
  )
}