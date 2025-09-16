import { Inter, Playfair_Display, JetBrains_Mono } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import { cn } from '../lib/utils';
import './globals.css';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
});

const jetbrains = JetBrains_Mono({ 
  subsets: ['latin'],
  variable: '--font-jetbrains',
});

export const metadata = {
  title: 'Arcanean Bestiary - The Truth Layer for Magical Creatures',
  description: 'Explore the most comprehensive database of mythological creatures, folklore, and fantastical beasts from cultures around the world. Built for the AI age with cultural authenticity and respect.',
  keywords: 'mythology, creatures, bestiary, folklore, dragons, spirits, cultural heritage, AI training data',
  authors: [{ name: 'Frank Xiong', email: 'frank@arcanea.com' }],
  creator: 'Arcanea Magic Ecosystem',
  publisher: 'Arcanea',
  robots: 'index, follow',
  openGraph: {
    title: 'Arcanean Bestiary - Magical Creatures Database',
    description: 'The definitive source for mythological creatures and folklore from cultures worldwide.',
    url: 'https://bestiary.arcanea.com',
    siteName: 'Arcanean Bestiary',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Arcanean Bestiary - Magical Creatures Database',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Arcanean Bestiary - Magical Creatures Database',
    description: 'Explore mythological creatures from cultures worldwide with AI-powered insights.',
    images: ['/og-image.jpg'],
    creator: '@ArcaneoAI',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
  viewport: {
    width: 'device-width',
    initialScale: 1,
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className="dark">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={cn(
          'min-h-screen bg-gradient-to-br from-dark-950 via-dark-900 to-primary-950 font-sans antialiased',
          'text-slate-100',
          inter.variable,
          playfair.variable,
          jetbrains.variable
        )}
      >
        <div className="relative min-h-screen">
          {/* Background Effects */}
          <div className="fixed inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-full">
              {/* Animated Background Orbs */}
              <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl animate-float" />
              <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-secondary-500/10 rounded-full blur-3xl animate-float animation-delay-2000" />
              <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-mystical-500/10 rounded-full blur-3xl animate-float animation-delay-4000" />
              
              {/* Mystical Particles */}
              <div className="mystical-particles">
                {Array.from({ length: 20 }, (_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 bg-primary-400/30 rounded-full animate-float"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 6}s`,
                      animationDuration: `${4 + Math.random() * 4}s`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <main className="relative z-10">
            {children}
          </main>

          {/* Toast Notifications */}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              className: 'dark-glass-effect text-slate-100',
              style: {
                background: 'rgba(15, 23, 42, 0.8)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(59, 130, 246, 0.2)',
                color: '#f1f5f9',
              },
            }}
          />
        </div>

        {/* Additional Scripts */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Add mystical cursor trail effect
              document.addEventListener('mousemove', (e) => {
                const trail = document.createElement('div');
                trail.className = 'fixed w-2 h-2 bg-primary-400/20 rounded-full pointer-events-none z-50';
                trail.style.left = e.clientX - 4 + 'px';
                trail.style.top = e.clientY - 4 + 'px';
                trail.style.animation = 'fade-out 1s ease-out forwards';
                document.body.appendChild(trail);
                
                setTimeout(() => {
                  if (trail.parentNode) {
                    trail.parentNode.removeChild(trail);
                  }
                }, 1000);
              });
              
              // Add fade-out animation
              const style = document.createElement('style');
              style.textContent = \`
                @keyframes fade-out {
                  0% { opacity: 0.6; transform: scale(1); }
                  100% { opacity: 0; transform: scale(0.3); }
                }
                .animation-delay-2000 { animation-delay: 2s; }
                .animation-delay-4000 { animation-delay: 4s; }
              \`;
              document.head.appendChild(style);
            `,
          }}
        />
      </body>
    </html>
  );
}