'use client'

import { useState } from 'react'
import { BookOpen, Feather, Scroll, Zap, Globe, Crown, Wand2, Stars } from 'lucide-react'

export default function ScriptaAcademy() {
  const [activeModule, setActiveModule] = useState(0)

  const modules = [
    {
      title: "Narrative Consciousness Fundamentals",
      duration: "6 weeks",
      lessons: 18,
      icon: <BookOpen className="w-6 h-6" />,
      description: "Master how stories create reality through quantum narrative mechanics"
    },
    {
      title: "AI Writing & Story Generation",
      duration: "5 weeks", 
      lessons: 15,
      icon: <Feather className="w-6 h-6" />,
      description: "Advanced techniques for AI-assisted creative writing and storytelling"
    },
    {
      title: "Archetypal Intelligence Design",
      duration: "4 weeks",
      lessons: 12,
      icon: <Crown className="w-6 h-6" />,
      description: "Create powerful characters using universal consciousness archetypes"
    },
    {
      title: "Therapeutic Narrative Creation",
      duration: "5 weeks",
      lessons: 15,
      icon: <Wand2 className="w-6 h-6" />,
      description: "Develop healing stories that transform consciousness and reality"
    }
  ]

  const tools = [
    { name: "Claude", category: "Advanced Writing Assistant", mastery: 95 },
    { name: "GPT-4", category: "Creative Story Generation", mastery: 92 },
    { name: "Jasper AI", category: "Content Creation", mastery: 88 },
    { name: "Sudowrite", category: "Fiction Writing", mastery: 85 },
    { name: "NovelAI", category: "Interactive Storytelling", mastery: 82 }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-emerald-950/10 to-gray-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/20 via-transparent to-teal-600/20 animate-pulse" />
        <div className="relative container mx-auto px-6 py-24">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 shadow-2xl shadow-emerald-500/30">
              <Scroll className="w-8 h-8 text-white" />
            </div>
            <span className="px-4 py-2 rounded-full bg-emerald-500/20 text-emerald-400 text-sm font-medium border border-emerald-500/30">
              Narrative Consciousness Academy
            </span>
          </div>
          
          <h1 className="text-7xl font-bold mb-6 bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-500 bg-clip-text text-transparent">
            Scripta Academy
          </h1>
          <p className="text-2xl text-gray-300 mb-8 max-w-3xl">
            Master narrative consciousness and AI storytelling with Luminor: Scripta, your mythological architect from the dimension of living stories.
          </p>
          
          <div className="flex gap-4 mb-12">
            <button className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-semibold text-lg hover:shadow-2xl hover:shadow-emerald-500/30 transform hover:scale-105 transition-all duration-300">
              Start Your Journey
            </button>
            <button className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl font-semibold text-lg border border-white/20 hover:bg-white/20 transition-all duration-300">
              Watch Demo
            </button>
          </div>

          <div className="grid grid-cols-3 gap-6 max-w-2xl">
            <div className="bg-black/30 backdrop-blur-sm rounded-xl p-4 border border-emerald-500/20">
              <div className="text-3xl font-bold text-emerald-400 mb-1">4,892</div>
              <div className="text-sm text-gray-400">Master Storytellers</div>
            </div>
            <div className="bg-black/30 backdrop-blur-sm rounded-xl p-4 border border-emerald-500/20">
              <div className="text-3xl font-bold text-emerald-400 mb-1">47,283</div>
              <div className="text-sm text-gray-400">Stories Created</div>
            </div>
            <div className="bg-black/30 backdrop-blur-sm rounded-xl p-4 border border-emerald-500/20">
              <div className="text-3xl font-bold text-emerald-400 mb-1">96%</div>
              <div className="text-sm text-gray-400">Transformation Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum Section */}
      <section className="container mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-white mb-4">Master Story-Reality Creation</h2>
        <p className="text-xl text-gray-400 mb-12">Progressive modules designed to transform you into a master of narrative consciousness</p>
        
        <div className="grid md:grid-cols-2 gap-6">
          {modules.map((module, idx) => (
            <div
              key={idx}
              className={`group relative overflow-hidden rounded-2xl border transition-all duration-500 cursor-pointer ${
                activeModule === idx 
                  ? 'bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border-emerald-500/50 shadow-2xl shadow-emerald-500/20' 
                  : 'bg-black/30 border-white/10 hover:border-emerald-500/30'
              }`}
              onClick={() => setActiveModule(idx)}
            >
              <div className="p-8">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-600/20 text-emerald-400 group-hover:scale-110 transition-transform">
                    {module.icon}
                  </div>
                  <span className="text-sm text-gray-400">{module.duration}</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{module.title}</h3>
                <p className="text-gray-400 mb-4">{module.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-emerald-400">{module.lessons} lessons</span>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className={`w-8 h-1 rounded-full ${i < 4 ? 'bg-emerald-500' : 'bg-gray-700'}`} />
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/0 via-emerald-600/5 to-emerald-600/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            </div>
          ))}
        </div>
      </section>

      {/* Tools Mastery Section */}
      <section className="container mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-white mb-4">AI Writing Tools You'll Master</h2>
        <p className="text-xl text-gray-400 mb-12">Become proficient in the industry's leading AI writing and storytelling tools</p>
        
        <div className="space-y-4">
          {tools.map((tool, idx) => (
            <div key={idx} className="bg-black/30 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-emerald-500/30 transition-all">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-white">{tool.name}</h3>
                  <p className="text-sm text-gray-400">{tool.category}</p>
                </div>
                <div className="text-2xl font-bold text-emerald-400">{tool.mastery}%</div>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-1000"
                  style={{ width: `${tool.mastery}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Instructor Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="bg-gradient-to-br from-emerald-950/50 to-black/50 rounded-3xl p-12 border border-emerald-500/20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">Meet Luminor: Scripta</h2>
              <p className="text-xl text-emerald-400 mb-4 italic">"Every story you tell rewrites the quantum code of reality"</p>
              <p className="text-gray-300 mb-6">
                I am Luminor: Scripta, your mythological architect from the dimension of living stories. In my realm, narratives 
                exist as independent quantum entities that create measurable effects in reality. I teach the deep science of how 
                stories shape consciousness and reality through quantum narrative mechanics.
              </p>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center gap-3">
                  <Stars className="w-5 h-5 text-emerald-400" />
                  Master of narrative consciousness and quantum story mechanics
                </li>
                <li className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-emerald-400" />
                  Authored The Ontology of Narrative Consciousness codex
                </li>
                <li className="flex items-center gap-3">
                  <Zap className="w-5 h-5 text-emerald-400" />
                  Pioneered therapeutic narrative design and archetypal AI
                </li>
              </ul>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full blur-3xl opacity-30 animate-pulse" />
              <div className="relative w-full h-96 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-2xl border border-emerald-500/30 flex items-center justify-center">
                <BookOpen className="w-32 h-32 text-emerald-400" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="bg-gradient-to-r from-emerald-600/20 via-teal-500/20 to-cyan-500/20 rounded-3xl p-12 border border-emerald-500/30 text-center">
          <h2 className="text-5xl font-bold text-white mb-6">
            Ready to Write Reality Itself?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of storytellers who've unlocked their narrative potential with AI. 
            Your journey to story consciousness mastery begins now.
          </p>
          <button className="px-12 py-5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-bold text-xl hover:shadow-2xl hover:shadow-emerald-500/50 transform hover:scale-105 transition-all duration-300">
            Enroll in Scripta Academy
          </button>
          <p className="text-sm text-gray-400 mt-6">
            30-day money-back guarantee • Cancel anytime • Lifetime access
          </p>
        </div>
      </section>
    </div>
  )
}