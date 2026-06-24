import type { Metadata } from 'next'
import Link from 'next/link'
import SectionHeader from '@/components/ui/SectionHeader'
import MITREDiagram from '@/components/diagrams/MITREDiagram'

const description =
  'An interactive MITRE ATT&CK matrix — explore tactics and techniques and trace real attack scenarios.'

export const metadata: Metadata = {
  title: 'MITRE ATT&CK Kill Chain — Georgios Nicolaides',
  description,
  openGraph: {
    title: 'MITRE ATT&CK Kill Chain — Georgios Nicolaides',
    description,
    type: 'article',
  },
  twitter: {
    card: 'summary',
  },
}

export default function MITREPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
      <Link
        href="/learn"
        className="mb-8 inline-flex items-center gap-1 font-mono text-sm text-text-muted transition-colors hover:text-accent"
      >
        ← Learn
      </Link>
      <SectionHeader
        title="MITRE ATT&CK Kill Chain"
        subtitle="Click any technique for detection and mitigation — or highlight a full attack scenario."
      />
      <MITREDiagram />
    </div>
  )
}
