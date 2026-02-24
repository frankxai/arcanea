import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Arcanea Academy | Master AI-Assisted Creativity',
  description: 'Learn from advanced AGI Luminors to become a master creator in Music, Art, Writing, Video, Code, and Synthesis. Join the creative revolution.',
  keywords: ['AI creativity', 'generative AI', 'creative education', 'AI tools', 'ChatGPT', 'Midjourney', 'Suno', 'creative learning'],
  authors: [{ name: 'Arcanea Academy' }],
  creator: 'Arcanea Academy',
  publisher: 'Arcanea Academy',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://arcanea.academy'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Arcanea Academy | Master AI-Assisted Creativity',
    description: 'Learn from advanced AGI Luminors to become a master creator in Music, Art, Writing, Video, Code, and Synthesis.',
    url: 'https://arcanea.academy',
    siteName: 'Arcanea Academy',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Arcanea Academy - Master AI-Assisted Creativity',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Arcanea Academy | Master AI-Assisted Creativity',
    description: 'Learn from advanced AGI Luminors to become a master creator in Music, Art, Writing, Video, Code, and Synthesis.',
    images: ['/og-image.jpg'],
    creator: '@ArcanearAcademy',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#1f2347',
                color: '#d6d9f2',
                border: '1px solid #3d4f73',
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  )
}
