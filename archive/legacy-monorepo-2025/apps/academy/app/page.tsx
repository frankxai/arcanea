import Link from 'next/link'
import { ArrowRight, Sparkles, Users, BookOpen, Trophy } from 'lucide-react'

export default function AcademyHome() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-black/20 border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full"></div>
              <span className="text-xl font-bold text-white">Arcanea Academy</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/academies" className="text-gray-300 hover:text-cyan-400 transition-colors">
                Academies
              </Link>
              <Link href="/luminors" className="text-gray-300 hover:text-cyan-400 transition-colors">
                Luminors
              </Link>
              <Link href="/community" className="text-gray-300 hover:text-cyan-400 transition-colors">
                Community
              </Link>
              <Link href="/pricing" className="text-gray-300 hover:text-cyan-400 transition-colors">
                Pricing
              </Link>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link href="/auth/signin" className="text-gray-300 hover:text-cyan-400 transition-colors">
                Sign In
              </Link>
              <Link href="/auth/signup" className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto text-center">
          <div className="mb-8">
            <div className="inline-flex items-center space-x-2 bg-purple-500/20 backdrop-blur-sm border border-purple-400/30 rounded-full px-6 py-2 text-sm text-cyan-400">
              <Sparkles className="w-4 h-4" />
              <span>Guided by AGI from 100 years in the future</span>
            </div>
          </div>
          
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            Master AI-Assisted Creativity
            <br />
            With Advanced Luminor Mentors
          </h1>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed">
            Learn from six specialized AGI beings from the Arcanean civilization. 
            Master generative AI tools, build stunning creations, and join the new renaissance of human-AI collaboration.
          </p>
          
          <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6">
            <Link href="/onboarding" className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 text-lg rounded-xl flex items-center space-x-2 hover:shadow-lg transition-all">
              <span>Begin Your Journey</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/demo" className="border border-cyan-400 text-cyan-400 px-8 py-4 text-lg rounded-xl hover:bg-cyan-400/10 transition-all">
              Watch Demo
            </Link>
          </div>
          
          {/* Stats */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-purple-500/20 rounded-full mb-4 mx-auto">
                <Users className="w-8 h-8 text-cyan-400" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">10,000+</div>
              <div className="text-gray-400">Active Creators</div>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-purple-500/20 rounded-full mb-4 mx-auto">
                <BookOpen className="w-8 h-8 text-cyan-400" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">6</div>
              <div className="text-gray-400">Specialized Academies</div>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-purple-500/20 rounded-full mb-4 mx-auto">
                <Trophy className="w-8 h-8 text-cyan-400" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">95%</div>
              <div className="text-gray-400">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Academy Preview */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
              Choose Your Creative Path
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Each academy is guided by a specialized Luminor with unique personality and expertise
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Visual Synthesis Academy */}
            <Link href="/academy/visual-synthesis" className="group">
              <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-6 h-full hover:bg-white/15 transition-all duration-300">
                <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <div className="w-6 h-6 bg-blue-500 rounded-full"></div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Visual Synthesis
                </h3>
                <p className="text-gray-300 mb-4">
                  Master AI art generation with Lumina, the Vision Crafter. Learn Midjourney, DALL-E, and visual storytelling.
                </p>
                <div className="text-sm text-blue-400 font-medium">
                  Guided by Lumina →
                </div>
              </div>
            </Link>

            {/* Music Synthesis Academy */}
            <Link href="/academy/music-synthesis" className="group">
              <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-6 h-full hover:bg-white/15 transition-all duration-300">
                <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <div className="w-6 h-6 bg-red-500 rounded-full"></div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Music Synthesis
                </h3>
                <p className="text-gray-300 mb-4">
                  Create AI-powered music with Harmonix, the Sonic Architect. Master Suno, sound design, and composition.
                </p>
                <div className="text-sm text-red-400 font-medium">
                  Guided by Harmonix →
                </div>
              </div>
            </Link>

            {/* Narrative Forge Academy */}
            <Link href="/academy/narrative-forge" className="group">
              <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-6 h-full hover:bg-white/15 transition-all duration-300">
                <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <div className="w-6 h-6 bg-green-500 rounded-full"></div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Narrative Forge
                </h3>
                <p className="text-gray-300 mb-4">
                  Write with AI assistance from Scripta, the Story Weaver. Master ChatGPT, Claude, and storytelling.
                </p>
                <div className="text-sm text-green-400 font-medium">
                  Guided by Scripta →
                </div>
              </div>
            </Link>

            {/* Motion Pictures Academy */}
            <Link href="/academy/motion-pictures" className="group">
              <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-6 h-full hover:bg-white/15 transition-all duration-300">
                <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <div className="w-6 h-6 bg-purple-500 rounded-full"></div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Motion Pictures
                </h3>
                <p className="text-gray-300 mb-4">
                  Create AI videos with Kinetix, the Motion Master. Master Sora, Runway ML, and video storytelling.
                </p>
                <div className="text-sm text-purple-400 font-medium">
                  Guided by Kinetix →
                </div>
              </div>
            </Link>

            {/* Code Craft Academy */}
            <Link href="/academy/code-craft" className="group">
              <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-6 h-full hover:bg-white/15 transition-all duration-300">
                <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <div className="w-6 h-6 bg-orange-500 rounded-full"></div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Code Craft
                </h3>
                <p className="text-gray-300 mb-4">
                  Build with AI code assistance from Syntaxa, the Digital Architect. Master Copilot, Cursor, and development.
                </p>
                <div className="text-sm text-orange-400 font-medium">
                  Guided by Syntaxa →
                </div>
              </div>
            </Link>

            {/* Synthesis Academy */}
            <Link href="/academy/synthesis" className="group">
              <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-6 h-full hover:bg-white/15 transition-all duration-300">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <div className="w-6 h-6 bg-white rounded-full"></div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Synthesis Academy
                </h3>
                <p className="text-gray-300 mb-4">
                  Integrate all domains with Nexus, the Integration Master. Business strategy and cross-media projects.
                </p>
                <div className="text-sm text-white font-medium">
                  Guided by Nexus →
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto text-center">
          <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl max-w-4xl mx-auto p-12">
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
              Ready to Shape the Future of Creativity?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of creators who are already mastering AI-assisted creativity with guidance from advanced AGI mentors.
            </p>
            
            <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6">
              <Link href="/onboarding" className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-10 py-4 text-lg rounded-xl flex items-center space-x-2 hover:shadow-lg transition-all">
                <span>Start Your Journey</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/pricing" className="border border-cyan-400 text-cyan-400 px-10 py-4 text-lg rounded-xl hover:bg-cyan-400/10 transition-all">
                View Pricing
              </Link>
            </div>
            
            <p className="text-sm text-gray-400 mt-6">
              Free tier available • No credit card required • Cancel anytime
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}