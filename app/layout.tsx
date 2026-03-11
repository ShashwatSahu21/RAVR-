import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'RAVR - Don\'t Miss the Moment',
  description: 'Gen-Z hyperlocal event discovery platform.',
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
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-ravr-black text-white min-h-screen flex flex-col`}>
        <Navbar />
        <main className="flex-1 overflow-x-hidden pt-16">
          {children}
        </main>
      </body>
    </html>
  )
}
