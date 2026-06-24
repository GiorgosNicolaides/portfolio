import type { Metadata } from 'next'
import Link from 'next/link'
import SectionHeader from '@/components/ui/SectionHeader'
import IRKillChainDiagram from '@/components/diagrams/IRKillChainDiagram'

const description =
  'Map attacker techniques (MITRE ATT&CK) to defender responses across the incident response kill chain.'

export const metadata: Metadata = {
  title: 'Incident Response Kill Chain — Georgios Nicolaides',
  description,
  openGraph: {
    title: 'Incident Response Kill Chain — Georgios Nicolaides',
    description,
    type: 'article',
  },
  twitter: {
    card: 'summary',
  },
}

export default function IRKillChainPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
      <Link
        href="/learn"
        className="mb-8 inline-flex items-center gap-1 font-mono text-sm text-text-muted transition-colors hover:text-accent"
      >
        ← Learn
      </Link>
      <SectionHeader
        title="Incident Response Kill Chain"
        subtitle="Click any attack phase to reveal the corresponding incident response action."
      />
      <IRKillChainDiagram />
    </div>
  )
}
