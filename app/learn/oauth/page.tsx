import type { Metadata } from 'next'
import Link from 'next/link'
import SectionHeader from '@/components/ui/SectionHeader'
import OAuthDiagram from '@/components/diagrams/OAuthDiagram'

const description =
  'An interactive, step-by-step walkthrough of the OAuth 2.0 Authorization Code Flow with PKCE.'

export const metadata: Metadata = {
  title: 'OAuth 2.0 Flow — Georgios Nicolaides',
  description,
  openGraph: {
    title: 'OAuth 2.0 Flow — Georgios Nicolaides',
    description,
    type: 'article',
  },
  twitter: {
    card: 'summary',
  },
}

export default function OAuthPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
      <Link
        href="/learn"
        className="mb-8 inline-flex items-center gap-1 font-mono text-sm text-text-muted transition-colors hover:text-accent"
      >
        ← Learn
      </Link>
      <SectionHeader
        title="OAuth 2.0 Authorization Code Flow"
        subtitle="With PKCE — step through each message exchanged between the actors."
      />
      <OAuthDiagram />
    </div>
  )
}
