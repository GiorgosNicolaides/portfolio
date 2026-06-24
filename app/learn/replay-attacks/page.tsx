import type { Metadata } from 'next'
import Link from 'next/link'
import SectionHeader from '@/components/ui/SectionHeader'
import ReplayAttackDiagram from '@/components/diagrams/ReplayAttackDiagram'

const description =
  'Compare a vulnerable authentication flow with a nonce- and timestamp-protected one that defeats replay attacks.'

export const metadata: Metadata = {
  title: 'Replay Attack Prevention — Georgios Nicolaides',
  description,
  openGraph: {
    title: 'Replay Attack Prevention — Georgios Nicolaides',
    description,
    type: 'article',
  },
  twitter: {
    card: 'summary',
  },
}

export default function ReplayAttacksPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
      <Link
        href="/learn"
        className="mb-8 inline-flex items-center gap-1 font-mono text-sm text-text-muted transition-colors hover:text-accent"
      >
        ← Learn
      </Link>
      <SectionHeader
        title="Replay Attack Prevention"
        subtitle="Toggle between vulnerable and protected flows to see how nonces stop replayed messages."
      />
      <ReplayAttackDiagram />
    </div>
  )
}
