import type { Metadata } from 'next'
import { Syne, Bebas_Neue, DM_Mono } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import CustomCursor from '@/components/CustomCursor'

const syne = Syne({ 
  subsets: ['latin'],
  variable: '--font-syne',
})

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
})

const dmMono = DM_Mono({
  weight: ['300', '400', '500'],
  subsets: ['latin'],
  variable: '--font-mono',
})

export const metadata: Metadata = {
  title: 'RAVR — Don\'t Miss The Moment',
  description: 'A real-time cultural radar for your city. See what\'s actually happening around you — right now.',
  keywords: ['Bangalore events', 'event discovery', 'nightlife radar', 'rave tracker'],
  openGraph: {
    title: 'RAVR — Hyperlocal Cultural Radar',
    description: 'Experience the city pulse in real-time. Discover secret gigs, underground raves, and cultural hotspots.',
    url: 'https://ravr.vercel.app',
    siteName: 'RAVR',
    images: [
      {
        url: '/preview.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RAVR — Live City Pulse',
    description: 'Stop guessing. Start knowing. Catch the vibe in Bangalore.',
    images: ['/preview.png'],
  },
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${syne.variable} ${bebasNeue.variable} ${dmMono.variable} scroll-smooth`}>
      <body className="bg-background text-foreground min-h-screen font-mono selection:bg-ravr-coral selection:text-white overflow-x-hidden">
        <div className="noise-overlay" />
        <CustomCursor />
        <Navbar />
        <main className="relative z-10">
          {children}
        </main>
      </body>
    </html>
  )
}


