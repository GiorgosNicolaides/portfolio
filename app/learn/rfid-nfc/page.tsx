import type { Metadata } from 'next'
import Link from 'next/link'
import SectionHeader from '@/components/ui/SectionHeader'
import RFIDDiagram from '@/components/diagrams/RFIDDiagram'

const description =
  'The SONDA-MA mutual authentication protocol for passive RFID/NFC tags — step by step, with attack resistance.'

export const metadata: Metadata = {
  title: 'RFID/NFC Authentication: SONDA-MA — Georgios Nicolaides',
  description,
  openGraph: {
    title: 'RFID/NFC Authentication: SONDA-MA — Georgios Nicolaides',
    description,
    type: 'article',
  },
  twitter: {
    card: 'summary',
  },
}

export default function RFIDPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
      <Link
        href="/learn"
        className="mb-8 inline-flex items-center gap-1 font-mono text-sm text-text-muted transition-colors hover:text-accent"
      >
        ← Learn
      </Link>
      <SectionHeader
        title="RFID/NFC Authentication: SONDA-MA"
        subtitle="Mutual authentication on passive NFC hardware — step through each message in the protocol."
      />
      <RFIDDiagram />
    </div>
  )
}
