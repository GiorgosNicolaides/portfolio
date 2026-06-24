import type { Metadata } from 'next'
import Link from 'next/link'
import SectionHeader from '@/components/ui/SectionHeader'
import XSSDiagram from '@/components/diagrams/XSSDiagram'

const description =
  'Reflected, stored, and DOM-based XSS attacks side by side with their defenses — output encoding, CSP, and more.'

export const metadata: Metadata = {
  title: 'XSS Attack & Defense — Georgios Nicolaides',
  description,
  openGraph: {
    title: 'XSS Attack & Defense — Georgios Nicolaides',
    description,
    type: 'article',
  },
  twitter: {
    card: 'summary',
  },
}

export default function XSSPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
      <Link
        href="/learn"
        className="mb-8 inline-flex items-center gap-1 font-mono text-sm text-text-muted transition-colors hover:text-accent"
      >
        ← Learn
      </Link>
      <SectionHeader
        title="XSS Attack & Defense"
        subtitle="Switch between reflected, stored, and DOM XSS to compare each attack with its defense."
      />
      <XSSDiagram />
    </div>
  )
}
