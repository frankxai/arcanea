import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://arcanea.ai'),
  title: {
    default: 'Arcanea.ai - Premium AI Spatial Worldbuilding',
    template: '%s | Arcanea.ai'
  },
  description: 'Where premium AI experience meets open-source community meets developer innovation. Transform your stories with embodied Guardian AI companions in immersive 3D spaces.',
  keywords: ['AI worldbuilding', 'spatial computing', '3D creation', 'fantasy worlds', 'creative AI', 'Guardian AI', 'immersive storytelling'],
  authors: [{ name: 'Arcanea' }],
  creator: 'Arcanea',
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
    creator: '@arcanea_ai',
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
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
    <html lang="en" className="dark">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}