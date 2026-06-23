import type { Metadata } from 'next'
import Link from 'next/link'
import SectionHeader from '@/components/ui/SectionHeader'
import ZeroTrustDiagram from '@/components/diagrams/ZeroTrustDiagram'

const description =
  'An interactive policy-decision flow showing how Zero Trust evaluates every request before granting access.'

export const metadata: Metadata = {
  title: 'Zero Trust Architecture — Georgios Nicolaides',
  description,
  openGraph: {
    title: 'Zero Trust Architecture — Georgios Nicolaides',
    description,
    type: 'article',
  },
  twitter: {
    card: 'summary',
  },
}

export default function ZeroTrustPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
      <Link
        href="/learn"
        className="mb-8 inline-flex items-center gap-1 font-mono text-sm text-text-muted transition-colors hover:text-accent"
      >
        ← Learn
      </Link>
      <SectionHeader
        title="Zero Trust Architecture"
        subtitle="Every request is evaluated against a chain of policy gates — click any node to learn more."
      />
      <ZeroTrustDiagram />
    </div>
  )
}
