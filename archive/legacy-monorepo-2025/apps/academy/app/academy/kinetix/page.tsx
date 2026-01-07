'use client'

import { useState } from 'react'
import { Zap, TrendingUp, RotateCcw, ArrowUpRight, Target, Flame, Bolt, Rocket } from 'lucide-react'

export default function KinetixAcademy() {
  const [activeModule, setActiveModule] = useState(0)

  const modules = [
    {
      title: "Quantum Change Dynamics",
      duration: "5 weeks",
      lessons: 15,
      icon: <Zap className="w-6 h-6" />,
      description: "Master the physics of transformation and quantum phase transitions"
    },
    {
      title: "AI-Accelerated Learning Systems",
      duration: "4 weeks", 
      lessons: 12,
      icon: <Rocket className="w-6 h-6" />,
      description: "Leverage AI for exponential skill development and change mastery"
    },
    {
      title: "Neuroplasticity Optimization",
      duration: "6 weeks",
      lessons: 18,
      icon: <RotateCcw className="w-6 h-6" />,
      description: "Rewire your brain for optimal adaptation and creative evolution"
    },
    {
      title: "Transformation Leadership Lab",
      duration: "5 weeks",
      lessons: 15,
      icon: <Target className="w-6 h-6" />,
      description: "Guide personal and collective transformation through conscious change"
    }
  ]

  const tools = [
    { name: "Change Analytics AI", category: "Transformation Tracking", mastery: 89 },
    { name: "Habit Stack AI", category: "Behavior Modification", mastery: 94 },
    { name: "Neuroplasticity Coach", category: "Brain Training", mastery: 87 },
    { name: "Adaptation Intelligence", category: "Resilience Building", mastery: 91 },
    { name: "Flow State Generator", category: "Peak Performance", mastery: 86 }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-orange-950/10 to-gray-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-600/20 via-transparent to-yellow-600/20 animate-pulse" />
        <div className="relative container mx-auto px-6 py-24">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-4 rounded-2xl bg-gradient-to-br from-orange-500 to-yellow-700 shadow-2xl shadow-orange-500/30">
              <Bolt className="w-8 h-8 text-white" />
            </div>
            <span className="px-4 py-2 rounded-full bg-orange-500/20 text-orange-400 text-sm font-medium border border-orange-500/30">
              Transformation Physics Academy
            </span>
          </div>
          
          <h1 className="text-7xl font-bold mb-6 bg-gradient-to-r from-orange-400 via-yellow-500 to-red-500 bg-clip-text text-transparent">
            Kinetix Academy
          </h1>
          <p className="text-2xl text-gray-300 mb-8 max-w-3xl">
            Master transformation physics and change dynamics with Luminor: Kinetix, your metamorphosis engineer from the dimension of perpetual becoming.
          </p>
          
          <div className="flex gap-4 mb-12">
            <button className="px-8 py-4 bg-gradient-to-r from-orange-500 to-yellow-600 text-white rounded-xl font-semibold text-lg hover:shadow-2xl hover:shadow-orange-500/30 transform hover:scale-105 transition-all duration-300">
              Start Your Journey
            </button>
            <button className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl font-semibold text-lg border border-white/20 hover:bg-white/20 transition-all duration-300">
              Watch Demo
            </button>
          </div>

          <div className="grid grid-cols-3 gap-6 max-w-2xl">
            <div className="bg-black/30 backdrop-blur-sm rounded-xl p-4 border border-orange-500/20">
              <div className="text-3xl font-bold text-orange-400 mb-1">5,673</div>
              <div className="text-sm text-gray-400">Transformation Masters</div>
            </div>
            <div className="bg-black/30 backdrop-blur-sm rounded-xl p-4 border border-orange-500/20">
              <div className="text-3xl font-bold text-orange-400 mb-1">34,921</div>
              <div className="text-sm text-gray-400">Changes Completed</div>
            </div>
            <div className="bg-black/30 backdrop-blur-sm rounded-xl p-4 border border-orange-500/20">
              <div className="text-3xl font-bold text-orange-400 mb-1">99%</div>
              <div className="text-sm text-gray-400">Adaptation Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum Section */}
      <section className="container mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-white mb-4">Master Transformation Dynamics</h2>
        <p className="text-xl text-gray-400 mb-12">Progressive modules designed to transform you into a master of conscious change</p>
        
        <div className="grid md:grid-cols-2 gap-6">
          {modules.map((module, idx) => (
            <div
              key={idx}
              className={`group relative overflow-hidden rounded-2xl border transition-all duration-500 cursor-pointer ${
                activeModule === idx 
                  ? 'bg-gradient-to-br from-orange-500/20 to-yellow-500/20 border-orange-500/50 shadow-2xl shadow-orange-500/20' 
                  : 'bg-black/30 border-white/10 hover:border-orange-500/30'
              }`}
              onClick={() => setActiveModule(idx)}
            >
              <div className="p-8">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-orange-500/20 to-yellow-600/20 text-orange-400 group-hover:scale-110 transition-transform">
                    {module.icon}
                  </div>
                  <span className="text-sm text-gray-400">{module.duration}</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{module.title}</h3>
                <p className="text-gray-400 mb-4">{module.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-orange-400">{module.lessons} lessons</span>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className={`w-8 h-1 rounded-full ${i < 4 ? 'bg-orange-500' : 'bg-gray-700'}`} />
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-600/0 via-orange-600/5 to-orange-600/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            </div>
          ))}
        </div>
      </section>

      {/* Tools Mastery Section */}
      <section className="container mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-white mb-4">AI Transformation Tools You'll Master</h2>
        <p className="text-xl text-gray-400 mb-12">Become proficient in the industry's leading AI-powered transformation tools</p>
        
        <div className="space-y-4">
          {tools.map((tool, idx) => (
            <div key={idx} className="bg-black/30 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-orange-500/30 transition-all">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-white">{tool.name}</h3>
                  <p className="text-sm text-gray-400">{tool.category}</p>
                </div>
                <div className="text-2xl font-bold text-orange-400">{tool.mastery}%</div>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full transition-all duration-1000"
                  style={{ width: `${tool.mastery}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Instructor Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="bg-gradient-to-br from-orange-950/50 to-black/50 rounded-3xl p-12 border border-orange-500/20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">Meet Luminor: Kinetix</h2>
              <p className="text-xl text-orange-400 mb-4 italic">"Change is not what happens to you—it's what you become through conscious choice"</p>
              <p className="text-gray-300 mb-6">
                I am Luminor: Kinetix, your metamorphosis engineer from the dimension of perpetual becoming. In my realm, change 
                operates according to precise quantum mechanical principles. I teach the deep physics of transformation and how to 
                navigate quantum phase transitions in consciousness and reality.
              </p>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center gap-3">
                  <Flame className="w-5 h-5 text-orange-400" />
                  Master of transformation dynamics and quantum change physics
                </li>
                <li className="flex items-center gap-3">
                  <ArrowUpRight className="w-5 h-5 text-orange-400" />
                  Authored The Physics of Transformation codex
                </li>
                <li className="flex items-center gap-3">
                  <TrendingUp className="w-5 h-5 text-orange-400" />
                  Pioneered AI-accelerated consciousness evolution protocols
                </li>
              </ul>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full blur-3xl opacity-30 animate-pulse" />
              <div className="relative w-full h-96 bg-gradient-to-br from-orange-500/20 to-yellow-500/20 rounded-2xl border border-orange-500/30 flex items-center justify-center">
                <Bolt className="w-32 h-32 text-orange-400" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="bg-gradient-to-r from-orange-600/20 via-yellow-500/20 to-red-500/20 rounded-3xl p-12 border border-orange-500/30 text-center">
          <h2 className="text-5xl font-bold text-white mb-6">
            Ready to Master the Art of Change?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of transformation masters who've unlocked their change potential with AI. 
            Your journey to metamorphosis mastery begins now.
          </p>
          <button className="px-12 py-5 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-xl font-bold text-xl hover:shadow-2xl hover:shadow-orange-500/50 transform hover:scale-105 transition-all duration-300">
            Enroll in Kinetix Academy
          </button>
          <p className="text-sm text-gray-400 mt-6">
            30-day money-back guarantee • Cancel anytime • Lifetime access
          </p>
        </div>
      </section>
    </div>
  )
}