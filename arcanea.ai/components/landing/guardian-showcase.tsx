export default function GuardianShowcase() {
  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-display text-arcane-crystal text-center mb-16">
          Meet Your Guardian AI Companions
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Placeholder Guardian cards */}
          {[
            { name: 'Draconia', element: 'fire', description: 'Transform ideas into reality' },
            { name: 'Lyssandria', element: 'earth', description: 'Build solid foundations' },
            { name: 'Maylinn', element: 'water', description: 'Connect through stories' }
          ].map((guardian, index) => (
            <div key={index} className="bg-arcane-shadow/50 backdrop-blur-sm rounded-xl p-6 border border-arcane-cosmic/30">
              <div className="w-16 h-16 bg-arcane-fire rounded-full mb-4"></div>
              <h3 className="text-xl font-display text-arcane-crystal mb-2">{guardian.name}</h3>
              <p className="text-arcane-400">{guardian.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}