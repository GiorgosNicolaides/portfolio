import type { Metadata, Viewport } from 'next'
import './globals.css'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'
import BackToTop from '@/components/ui/BackToTop'
import { Analytics } from '@vercel/analytics/react'

export const metadata: Metadata = {
  title: 'Georgios Nicolaides — Cybersecurity Engineer',
  description: 'Cybersecurity engineer specialising in protocol security, cryptographic implementation, and defensive tooling.',
  icons: {
    icon: '/favicon.ico',
  },
}

export const viewport: Viewport = {
  themeColor: '#00ff88',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-background text-text-primary min-h-screen flex flex-col">
        <Nav />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <BackToTop />
        <Analytics />
      </body>
    </html>
  )
}
