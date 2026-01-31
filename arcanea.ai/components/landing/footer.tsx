'use client'

export default function Footer() {
  return (
    <footer className="bg-arcane-shadow border-t border-arcane-crystal/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-arcane-crystal font-display text-lg mb-4">Arcanea.ai</h3>
            <p className="text-arcane-400 text-sm mb-4">
              The definitive AI platform for creative worldbuilding.
            </p>
            <div className="flex space-x-6">
              <a href="/" className="text-arcane-300 hover:text-arcane-crystal transition-colors">
                About
              </a>
              <a href="/chat" className="text-arcane-400 hover:text-arcane-crystal transition-colors">
                AI Chat
              </a>
              <a href="/imagine" className="text-arcane-400 hover:text-arcane-crystal transition-colors">
                Generation Suite
              </a>
              <a href="/create" className="text-arcane-400 hover:text-arcane-crystal transition-colors">
                Worldbuilding
              </a>
              <a href="https://spatial.arcanea.ai" className="text-arcane-400 hover:text-arcane-crystal transition-colors">
                Spatial Studio
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-arcane-300 font-medium mb-4">Community</h4>
            <ul className="space-y-2">
              <li>
                <a href="https://community.arcanea.io" className="text-arcane-400 hover:text-arcane-crystal transition-colors">
                  World Gallery
                </a>
              </li>
              <li>
                <a href="https://community.arcanea.io/templates" className="text-arcane-400 hover:text-arcane-crystal transition-colors">
                  Templates
                </a>
              </li>
              <li>
                <a href="https://community.arcanea.io/challenges" className="text-arcane-400 hover:text-arcane-crystal transition-colors">
                  Challenges
                </a>
              </li>
              <li>
                <a href="https://discord.gg/arcanea" className="text-arcane-400 hover:text-arcane-crystal transition-colors">
                  Discord
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-arcane-300 font-medium mb-4">Developers</h4>
            <ul className="space-y-2">
              <li>
                <a href="https://developers.arcanea.ai" className="text-arcane-400 hover:text-arcane-crystal transition-colors">
                  API Documentation
                </a>
              </li>
              <li>
                <a href="https://developers.arcanea.ai/sdk" className="text-arcane-400 hover:text-arcane-crystal transition-colors">
                  SDK Download
                </a>
              </li>
              <li>
                <a href="https://github.com/arcanea" className="text-arcane-400 hover:text-arcane-crystal transition-colors">
                  GitHub
                </a>
              </li>
              <li>
                <a href="https://status.arcanea.ai" className="text-arcane-400 hover:text-arcane-crystal transition-colors">
                  Status
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-arcane-400 text-sm">
              © 2026 Arcanea AI Platform. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="/privacy" className="text-arcane-400 hover:text-arcane-crystal text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="/terms" className="text-arcane-400 hover:text-arcane-crystal text-sm transition-colors">
                Terms of Service
              </a>
              <a href="/cookies" className="text-arcane-400 hover:text-arcane-crystal text-sm transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}