import type { Metadata } from 'next'
import Link from 'next/link'
import SectionHeader from '@/components/ui/SectionHeader'
import MerkleTreeDiagram from '@/components/diagrams/MerkleTreeDiagram'

const description =
  'An interactive Merkle tree — tamper with a transaction to watch hashes cascade, or build a proof of inclusion.'

export const metadata: Metadata = {
  title: 'Merkle Trees — Georgios Nicolaides',
  description,
  openGraph: {
    title: 'Merkle Trees — Georgios Nicolaides',
    description,
    type: 'article',
  },
  twitter: {
    card: 'summary',
  },
}

export default function MerkleTreesPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
      <Link
        href="/learn"
        className="mb-8 inline-flex items-center gap-1 font-mono text-sm text-text-muted transition-colors hover:text-accent"
      >
        ← Learn
      </Link>
      <SectionHeader
        title="Merkle Trees"
        subtitle="Tamper with a transaction to see the root change — or select a leaf to build its proof of inclusion."
      />
      <MerkleTreeDiagram />
    </div>
  )
}
