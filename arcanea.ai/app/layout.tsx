import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Arcanea.ai - Premium AI Spatial Worldbuilding',
  description: 'Where premium AI experience meets open-source community meets developer innovation. Transform your stories with embodied Guardian AI companions in immersive 3D spaces.',
  keywords: 'AI worldbuilding, spatial computing, 3D creation, fantasy worlds, creative AI',
  authors: [{ name: 'Arcanea' }],
  openGraph: {
    title: 'Arcanea.ai - Premium Spatial Worldbuilding',
    description: 'Transform your stories with embodied Guardian AI companions in immersive 3D spaces',
    url: 'https://arcanea.ai',
    siteName: 'Arcanea.ai',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Arcanea Premium Spatial Experience',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Arcanea.ai - Premium Spatial Worldbuilding',
    description: 'Transform your stories with embodied Guardian AI companions',
    images: ['/og-image.jpg'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}