import type { Metadata } from 'next'
import Link from 'next/link'
import SectionHeader from '@/components/ui/SectionHeader'
import SQLInjectionDiagram from '@/components/diagrams/SQLInjectionDiagram'

const description =
  'An interactive SQL injection lab — try real payloads against a vulnerable query and see the parameterized fix.'

export const metadata: Metadata = {
  title: 'SQL Injection — Georgios Nicolaides',
  description,
  openGraph: {
    title: 'SQL Injection — Georgios Nicolaides',
    description,
    type: 'article',
  },
  twitter: {
    card: 'summary',
  },
}

export default function SQLInjectionPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
      <Link
        href="/learn"
        className="mb-8 inline-flex items-center gap-1 font-mono text-sm text-text-muted transition-colors hover:text-accent"
      >
        ← Learn
      </Link>
      <SectionHeader
        title="SQL Injection"
        subtitle="Edit the login fields or try a payload to see the vulnerable query — then the parameterized defense."
      />
      <SQLInjectionDiagram />
    </div>
  )
}
