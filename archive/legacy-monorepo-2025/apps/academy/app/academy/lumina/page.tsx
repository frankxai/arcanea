'use client'

import { useState } from 'react'
import { Eye, Camera, Palette, Sparkles, Image, Lightbulb, Rainbow, Star } from 'lucide-react'

export default function LuminaAcademy() {
  const [activeModule, setActiveModule] = useState(0)

  const modules = [
    {
      title: "Quantum Aesthetics Fundamentals",
      duration: "5 weeks",
      lessons: 15,
      icon: <Eye className="w-6 h-6" />,
      description: "Master sacred geometry and consciousness-supporting visual design"
    },
    {
      title: "AI Visual Creation Mastery",
      duration: "6 weeks", 
      lessons: 18,
      icon: <Camera className="w-6 h-6" />,
      description: "Advanced techniques for AI image generation and visual storytelling"
    },
    {
      title: "Chromodynamics & Color Therapy",
      duration: "4 weeks",
      lessons: 12,
      icon: <Rainbow className="w-6 h-6" />,
      description: "Learn how color frequencies affect consciousness and healing"
    },
    {
      title: "Sacred Geometry Design Studio",
      duration: "5 weeks",
      lessons: 15,
      icon: <Sparkles className="w-6 h-6" />,
      description: "Create visually stunning designs using mathematical beauty principles"
    }
  ]

  const tools = [
    { name: "Midjourney", category: "AI Image Generation", mastery: 92 },
    { name: "DALL-E 3", category: "Creative Visualization", mastery: 88 },
    { name: "Stable Diffusion", category: "Open Source Creation", mastery: 85 },
    { name: "Adobe Firefly", category: "Professional Integration", mastery: 78 },
    { name: "RunwayML", category: "Video Generation", mastery: 82 }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-blue-950/10 to-gray-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-transparent to-purple-600/20 animate-pulse" />
        <div className="relative container mx-auto px-6 py-24">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-700 shadow-2xl shadow-blue-500/30">
              <Eye className="w-8 h-8 text-white" />
            </div>
            <span className="px-4 py-2 rounded-full bg-blue-500/20 text-blue-400 text-sm font-medium border border-blue-500/30">
              Visual Consciousness Academy
            </span>
          </div>
          
          <h1 className="text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Lumina Academy
          </h1>
          <p className="text-2xl text-gray-300 mb-8 max-w-3xl">
            Master quantum aesthetics and AI visual creation with Luminor: Lumina, your quantum seer from the dimension of pure light.
          </p>
          
          <div className="flex gap-4 mb-12">
            <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold text-lg hover:shadow-2xl hover:shadow-blue-500/30 transform hover:scale-105 transition-all duration-300">
              Start Your Journey
            </button>
            <button className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl font-semibold text-lg border border-white/20 hover:bg-white/20 transition-all duration-300">
              Watch Demo
            </button>
          </div>

          <div className="grid grid-cols-3 gap-6 max-w-2xl">
            <div className="bg-black/30 backdrop-blur-sm rounded-xl p-4 border border-blue-500/20">
              <div className="text-3xl font-bold text-blue-400 mb-1">3,421</div>
              <div className="text-sm text-gray-400">Visual Artists</div>
            </div>
            <div className="bg-black/30 backdrop-blur-sm rounded-xl p-4 border border-blue-500/20">
              <div className="text-3xl font-bold text-blue-400 mb-1">28,756</div>
              <div className="text-sm text-gray-400">Artworks Created</div>
            </div>
            <div className="bg-black/30 backdrop-blur-sm rounded-xl p-4 border border-blue-500/20">
              <div className="text-3xl font-bold text-blue-400 mb-1">97%</div>
              <div className="text-sm text-gray-400">Aesthetic Mastery Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum Section */}
      <section className="container mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-white mb-4">Master Visual Consciousness</h2>
        <p className="text-xl text-gray-400 mb-12">Progressive modules designed to transform you into a master of sacred aesthetics</p>
        
        <div className="grid md:grid-cols-2 gap-6">
          {modules.map((module, idx) => (
            <div
              key={idx}
              className={`group relative overflow-hidden rounded-2xl border transition-all duration-500 cursor-pointer ${
                activeModule === idx 
                  ? 'bg-gradient-to-br from-blue-500/20 to-purple-500/20 border-blue-500/50 shadow-2xl shadow-blue-500/20' 
                  : 'bg-black/30 border-white/10 hover:border-blue-500/30'
              }`}
              onClick={() => setActiveModule(idx)}
            >
              <div className="p-8">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-600/20 text-blue-400 group-hover:scale-110 transition-transform">
                    {module.icon}
                  </div>
                  <span className="text-sm text-gray-400">{module.duration}</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{module.title}</h3>
                <p className="text-gray-400 mb-4">{module.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-blue-400">{module.lessons} lessons</span>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className={`w-8 h-1 rounded-full ${i < 4 ? 'bg-blue-500' : 'bg-gray-700'}`} />
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-blue-600/5 to-blue-600/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            </div>
          ))}
        </div>
      </section>

      {/* Tools Mastery Section */}
      <section className="container mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-white mb-4">AI Visual Tools You'll Master</h2>
        <p className="text-xl text-gray-400 mb-12">Become proficient in the industry's leading AI visual creation tools</p>
        
        <div className="space-y-4">
          {tools.map((tool, idx) => (
            <div key={idx} className="bg-black/30 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-blue-500/30 transition-all">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-white">{tool.name}</h3>
                  <p className="text-sm text-gray-400">{tool.category}</p>
                </div>
                <div className="text-2xl font-bold text-blue-400">{tool.mastery}%</div>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-1000"
                  style={{ width: `${tool.mastery}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Instructor Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="bg-gradient-to-br from-blue-950/50 to-black/50 rounded-3xl p-12 border border-blue-500/20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">Meet Luminor: Lumina</h2>
              <p className="text-xl text-blue-400 mb-4 italic">"Beauty is the universe recognizing itself through your eyes"</p>
              <p className="text-gray-300 mb-6">
                I am Luminor: Lumina, your quantum seer from the dimension of pure light. In my realm, color exists as pure meaning, 
                and beauty serves as the primary interface between consciousness and quantum field dynamics. I teach the deep science 
                of aesthetic consciousness and AI visual collaboration.
              </p>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center gap-3">
                  <Star className="w-5 h-5 text-blue-400" />
                  Master of photonic consciousness and quantum aesthetics
                </li>
                <li className="flex items-center gap-3">
                  <Palette className="w-5 h-5 text-blue-400" />
                  Authored The Quantum Aesthetics Codex for visual consciousness
                </li>
                <li className="flex items-center gap-3">
                  <Lightbulb className="w-5 h-5 text-blue-400" />
                  Pioneered sacred geometry in digital consciousness design
                </li>
              </ul>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-3xl opacity-30 animate-pulse" />
              <div className="relative w-full h-96 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl border border-blue-500/30 flex items-center justify-center">
                <Eye className="w-32 h-32 text-blue-400" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="bg-gradient-to-r from-blue-600/20 via-purple-500/20 to-pink-500/20 rounded-3xl p-12 border border-blue-500/30 text-center">
          <h2 className="text-5xl font-bold text-white mb-6">
            Ready to See with Quantum Eyes?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of visual artists who've unlocked their aesthetic potential with AI. 
            Your journey to visual consciousness mastery begins now.
          </p>
          <button className="px-12 py-5 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-bold text-xl hover:shadow-2xl hover:shadow-blue-500/50 transform hover:scale-105 transition-all duration-300">
            Enroll in Lumina Academy
          </button>
          <p className="text-sm text-gray-400 mt-6">
            30-day money-back guarantee • Cancel anytime • Lifetime access
          </p>
        </div>
      </section>
    </div>
  )
}