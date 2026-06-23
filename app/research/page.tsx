import type { Metadata } from 'next'
import ResearchView from '@/components/research/ResearchView'

const description =
  'Cybersecurity research including RFID/NFC authentication protocols and LEO satellite IoT security achieving 1807x improvement over RSA-2048.'

export const metadata: Metadata = {
  title: 'Research — Georgios Nicolaides',
  description,
  openGraph: {
    title: 'Research — Georgios Nicolaides',
    description,
    type: 'website',
  },
  twitter: {
    card: 'summary',
  },
}

export default function ResearchPage() {
  return <ResearchView />
}
