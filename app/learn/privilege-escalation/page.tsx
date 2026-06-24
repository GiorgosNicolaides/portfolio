import type { Metadata } from 'next'
import Link from 'next/link'
import SectionHeader from '@/components/ui/SectionHeader'
import PrivEscDiagram from '@/components/diagrams/PrivEscDiagram'

const description =
  'Linux and Windows privilege escalation paths and vectors, each with its defensive countermeasure.'

export const metadata: Metadata = {
  title: 'Privilege Escalation — Georgios Nicolaides',
  description,
  openGraph: {
    title: 'Privilege Escalation — Georgios Nicolaides',
    description,
    type: 'article',
  },
  twitter: {
    card: 'summary',
  },
}

export default function PrivEscPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
      <Link
        href="/learn"
        className="mb-8 inline-flex items-center gap-1 font-mono text-sm text-text-muted transition-colors hover:text-accent"
      >
        ← Learn
      </Link>
      <SectionHeader
        title="Privilege Escalation"
        subtitle="Switch between Linux and Windows to trace the escalation path and expand each vector."
      />
      <PrivEscDiagram />
    </div>
  )
}
