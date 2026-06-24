import type { Metadata } from 'next'
import Link from 'next/link'
import SectionHeader from '@/components/ui/SectionHeader'
import PublicKeyCryptoDiagram from '@/components/diagrams/PublicKeyCryptoDiagram'

const description =
  'A side-by-side comparison of RSA and ECC public key cryptography, with key sizes, speed, and use cases.'

export const metadata: Metadata = {
  title: 'Public Key Cryptography: RSA vs ECC — Georgios Nicolaides',
  description,
  openGraph: {
    title: 'Public Key Cryptography: RSA vs ECC — Georgios Nicolaides',
    description,
    type: 'article',
  },
  twitter: {
    card: 'summary',
  },
}

export default function PublicKeyCryptoPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
      <Link
        href="/learn"
        className="mb-8 inline-flex items-center gap-1 font-mono text-sm text-text-muted transition-colors hover:text-accent"
      >
        ← Learn
      </Link>
      <SectionHeader
        title="Public Key Cryptography: RSA vs ECC"
        subtitle="Switch tabs to compare RSA and elliptic curve cryptography for equivalent security."
      />
      <PublicKeyCryptoDiagram />
    </div>
  )
}
