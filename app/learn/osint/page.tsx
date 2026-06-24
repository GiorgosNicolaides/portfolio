import type { Metadata } from 'next'
import Link from 'next/link'
import SectionHeader from '@/components/ui/SectionHeader'
import OSINTDiagram from '@/components/diagrams/OSINTDiagram'

const description =
  'An interactive OSINT mind map — explore domain, people, technical, and social intelligence gathering techniques.'

export const metadata: Metadata = {
  title: 'OSINT Techniques — Georgios Nicolaides',
  description,
  openGraph: {
    title: 'OSINT Techniques — Georgios Nicolaides',
    description,
    type: 'article',
  },
  twitter: {
    card: 'summary',
  },
}

export default function OSINTPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
      <Link
        href="/learn"
        className="mb-8 inline-flex items-center gap-1 font-mono text-sm text-text-muted transition-colors hover:text-accent"
      >
        ← Learn
      </Link>
      <SectionHeader
        title="OSINT Techniques"
        subtitle="Click any node to see the tool, an example query, what it reveals, and the countermeasure."
      />
      <OSINTDiagram />
    </div>
  )
}
