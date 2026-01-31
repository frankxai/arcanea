export default function CommunitySection() {
  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-display text-arcane-crystal text-center mb-8">
          Join the Creator Community
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-arcane-shadow/50 backdrop-blur-sm rounded-xl p-8 border border-arcane-cosmic/30">
            <h3 className="text-2xl font-display text-arcane-crystal mb-6">Share Your Worlds</h3>
            <p className="text-arcane-300 mb-6">
              Publish your creations to the community gallery. Get feedback, collaborate with other creators, and build your audience.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-arcane-gold rounded-full flex items-center justify-center">
                  <span className="text-arcane-shadow font-bold">🌍</span>
                </div>
                <div>
                  <h4 className="font-display text-arcane-crystal">World Gallery</h4>
                  <p className="text-arcane-400">Browse and share creator universes</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-arcane-crystal rounded-full flex items-center justify-center">
                  <span className="text-arcane-shadow font-bold">📚</span>
                </div>
                <div>
                  <h4 className="font-display text-arcane-crystal">Template Marketplace</h4>
                  <p className="text-arcane-400">Reusable creation frameworks</p>
                </div>
              </div>
            </div>
            
            <button className="w-full py-3 bg-arcane-cosmic/50 border border-arcane-cosmic/50 text-arcane-crystal rounded-lg hover:bg-arcane-cosmic/70">
              Explore Community
            </button>
          </div>

          <div className="bg-arcane-shadow/50 backdrop-blur-sm rounded-xl p-8 border border-arcane-cosmic/30">
            <h3 className="text-2xl font-display text-arcane-crystal mb-6">Collaborate & Learn</h3>
            <p className="text-arcane-300 mb-6">
              Connect with other worldbuilders, participate in challenges, and access exclusive tutorials and resources.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-arcane-water rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">🤝</span>
                </div>
                <div>
                  <h4 className="font-display text-arcane-crystal">Collaborative Projects</h4>
                  <p className="text-arcane-400">Build worlds together in real-time</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-arcane-fire rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">🏆</span>
                </div>
                <div>
                  <h4 className="font-display text-arcane-crystal">Creator Challenges</h4>
                  <p className="text-arcane-400">Monthly themed competitions</p>
                </div>
              </div>
            </div>
            
            <button className="w-full py-3 bg-arcane-cosmic/50 border border-arcane-cosmic/50 text-arcane-crystal rounded-lg hover:bg-arcane-cosmic/70">
              Join Community Hub
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}