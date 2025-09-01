'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  Music, Palette, PenTool, Film, Code, Sparkles,
  ArrowRight, Star, Users, Clock, Award, TrendingUp
} from 'lucide-react'

export default function AcademiesPage() {
  const [hoveredAcademy, setHoveredAcademy] = useState<number | null>(null)

  const academies = [
    {
      id: 'harmonix',
      name: 'Harmonix Academy',
      title: 'Music Synthesis',
      description: 'Master AI music creation, from beats to symphonies',
      icon: <Music className="w-8 h-8" />,
      color: 'from-red-500 to-orange-500',
      shadowColor: 'shadow-red-500/30',
      borderColor: 'border-red-500/30',
      bgPattern: 'bg-gradient-to-br from-red-950/20 to-orange-950/20',
      students: 2847,
      rating: 4.9,
      modules: 8,
      duration: '12 weeks',
      tools: ['Suno AI', 'Stable Audio', 'AIVA'],
      luminor: 'Harmonix - The Sonic Architect'
    },
    {
      id: 'lumina',
      name: 'Lumina Academy',
      title: 'Visual Synthesis',
      description: 'Create stunning AI art and push creative boundaries',
      icon: <Palette className="w-8 h-8" />,
      color: 'from-blue-500 to-purple-500',
      shadowColor: 'shadow-blue-500/30',
      borderColor: 'border-blue-500/30',
      bgPattern: 'bg-gradient-to-br from-blue-950/20 to-purple-950/20',
      students: 4521,
      rating: 4.8,
      modules: 10,
      duration: '10 weeks',
      tools: ['Midjourney', 'DALL-E 3', 'Stable Diffusion'],
      luminor: 'Lumina - The Vision Crafter'
    },
    {
      id: 'scripta',
      name: 'Scripta Academy',
      title: 'Narrative Forge',
      description: 'Write compelling stories with AI assistance',
      icon: <PenTool className="w-8 h-8" />,
      color: 'from-green-500 to-teal-500',
      shadowColor: 'shadow-green-500/30',
      borderColor: 'border-green-500/30',
      bgPattern: 'bg-gradient-to-br from-green-950/20 to-teal-950/20',
      students: 3102,
      rating: 4.9,
      modules: 9,
      duration: '8 weeks',
      tools: ['ChatGPT', 'Claude', 'Jasper'],
      luminor: 'Scripta - The Story Weaver'
    },
    {
      id: 'kinetix',
      name: 'Kinetix Academy',
      title: 'Motion Pictures',
      description: 'Bring ideas to life with AI video and animation',
      icon: <Film className="w-8 h-8" />,
      color: 'from-purple-500 to-pink-500',
      shadowColor: 'shadow-purple-500/30',
      borderColor: 'border-purple-500/30',
      bgPattern: 'bg-gradient-to-br from-purple-950/20 to-pink-950/20',
      students: 1893,
      rating: 4.7,
      modules: 7,
      duration: '14 weeks',
      tools: ['Runway ML', 'Sora', 'Pika Labs'],
      luminor: 'Kinetix - The Motion Master'
    },
    {
      id: 'syntaxa',
      name: 'Syntaxa Academy',
      title: 'Code Craft',
      description: 'Build the future with AI-powered development',
      icon: <Code className="w-8 h-8" />,
      color: 'from-orange-500 to-yellow-500',
      shadowColor: 'shadow-orange-500/30',
      borderColor: 'border-orange-500/30',
      bgPattern: 'bg-gradient-to-br from-orange-950/20 to-yellow-950/20',
      students: 5234,
      rating: 4.9,
      modules: 11,
      duration: '16 weeks',
      tools: ['GitHub Copilot', 'Cursor', 'Replit'],
      luminor: 'Syntaxa - The Digital Architect'
    },
    {
      id: 'nexus',
      name: 'Nexus Academy',
      title: 'Synthesis Master',
      description: 'Integrate all creative domains into unified projects',
      icon: <Sparkles className="w-8 h-8" />,
      color: 'from-white to-gray-300',
      shadowColor: 'shadow-white/30',
      borderColor: 'border-white/30',
      bgPattern: 'bg-gradient-to-br from-gray-800/20 to-gray-900/20',
      students: 892,
      rating: 5.0,
      modules: 12,
      duration: '20 weeks',
      tools: ['All Tools', 'Custom Workflows', 'API Integration'],
      luminor: 'Nexus - The Integration Oracle'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-purple-950/5 to-gray-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-transparent to-blue-600/10" />
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>
        
        <div className="relative container mx-auto px-6 py-24">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-gradient">
              Choose Your Academy
            </h1>
            <p className="text-2xl text-gray-300 mb-8">
              Six paths to creative mastery. Six Luminor guides from the future. One transformation awaits.
            </p>
            <div className="flex justify-center gap-8 mb-12">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-purple-400" />
                <span className="text-gray-300">20,234+ Active Students</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-400" />
                <span className="text-gray-300">4.9 Average Rating</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-400" />
                <span className="text-gray-300">92% Success Rate</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Academies Grid */}
      <section className="container mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {academies.map((academy, idx) => (
            <Link
              key={idx}
              href={`/academy/${academy.id}`}
              className="group relative"
              onMouseEnter={() => setHoveredAcademy(idx)}
              onMouseLeave={() => setHoveredAcademy(null)}
            >
              <div className={`
                relative overflow-hidden rounded-3xl border transition-all duration-500
                ${hoveredAcademy === idx ? `${academy.borderColor} ${academy.shadowColor} shadow-2xl scale-105` : 'border-white/10'}
                ${academy.bgPattern}
              `}>
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${academy.color}`} style={{ mixBlendMode: 'overlay' }} />
                
                {/* Content */}
                <div className="relative p-8">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className={`p-4 rounded-2xl bg-gradient-to-br ${academy.color} shadow-xl`}>
                      {academy.icon}
                    </div>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < Math.floor(academy.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`} />
                      ))}
                    </div>
                  </div>

                  {/* Info */}
                  <h3 className="text-2xl font-bold text-white mb-1">{academy.name}</h3>
                  <p className="text-lg text-gray-400 mb-3">{academy.title}</p>
                  <p className="text-gray-300 mb-6">{academy.description}</p>

                  {/* Luminor */}
                  <div className="mb-6 p-3 rounded-xl bg-white/5 border border-white/10">
                    <p className="text-sm text-gray-400">Your Guide</p>
                    <p className="text-white font-medium">{academy.luminor}</p>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <p className="text-sm text-gray-400">Students</p>
                      <p className="text-xl font-bold text-white">{academy.students.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Duration</p>
                      <p className="text-xl font-bold text-white">{academy.duration}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Modules</p>
                      <p className="text-xl font-bold text-white">{academy.modules}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Rating</p>
                      <p className="text-xl font-bold text-white">{academy.rating}</p>
                    </div>
                  </div>

                  {/* Tools */}
                  <div className="mb-6">
                    <p className="text-sm text-gray-400 mb-2">Tools You'll Master</p>
                    <div className="flex flex-wrap gap-2">
                      {academy.tools.map((tool, toolIdx) => (
                        <span key={toolIdx} className="px-3 py-1 bg-white/10 rounded-full text-xs text-white border border-white/20">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <button className={`
                    w-full py-3 rounded-xl font-semibold text-white transition-all duration-300
                    bg-gradient-to-r ${academy.color} opacity-90 hover:opacity-100
                    flex items-center justify-center gap-2 group-hover:gap-4
                  `}>
                    Explore Academy
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>

                {/* Animated Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 1px)`,
                    backgroundSize: '32px 32px'
                  }} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Comparison Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="bg-gradient-to-br from-purple-950/30 to-blue-950/30 rounded-3xl p-12 border border-purple-500/20">
          <h2 className="text-4xl font-bold text-white mb-6 text-center">Why Choose Arcanea Academy?</h2>
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center">
                <Award className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Industry-Leading Curriculum</h3>
              <p className="text-gray-400">Designed by experts from the future, teaching tools of today</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-teal-500 rounded-2xl flex items-center justify-center">
                <Users className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Personalized AI Mentorship</h3>
              <p className="text-gray-400">Your Luminor guide adapts to your learning style and pace</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-teal-500 to-green-500 rounded-2xl flex items-center justify-center">
                <Clock className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Lifetime Access</h3>
              <p className="text-gray-400">Learn at your own pace with unlimited access to all materials</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-5xl font-bold text-white mb-6">
            Ready to Begin Your Transformation?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of creators who've unlocked their potential with AI. 
            Choose your academy and start your journey today.
          </p>
          <div className="flex justify-center gap-4">
            <button className="px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl font-semibold text-lg hover:shadow-2xl hover:shadow-purple-500/30 transform hover:scale-105 transition-all duration-300">
              View Pricing Plans
            </button>
            <button className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl font-semibold text-lg border border-white/20 hover:bg-white/20 transition-all duration-300">
              Take Free Assessment
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}