import type { Metadata } from 'next'
import Link from 'next/link'
import SectionHeader from '@/components/ui/SectionHeader'
import JWTDiagram from '@/components/diagrams/JWTDiagram'

const description =
  'An animated sequence diagram walking through JWT authentication — login, signing, verification, and revocation.'

export const metadata: Metadata = {
  title: 'JWT Authentication Flow — Georgios Nicolaides',
  description,
  openGraph: {
    title: 'JWT Authentication Flow — Georgios Nicolaides',
    description,
    type: 'article',
  },
  twitter: {
    card: 'summary',
  },
}

export default function JWTPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
      <Link
        href="/learn"
        className="mb-8 inline-flex items-center gap-1 font-mono text-sm text-text-muted transition-colors hover:text-accent"
      >
        ← Learn
      </Link>
      <SectionHeader
        title="JWT Authentication Flow"
        subtitle="Step through every message between client, server, and database — and see the token decoded."
      />
      <JWTDiagram />
    </div>
  )
}
