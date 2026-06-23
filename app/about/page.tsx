import type { Metadata } from 'next'
import AboutView from '@/components/about/AboutView'

const description =
  'MEng Cybersecurity student at University of Limerick. Background in protocol security, cryptography, and defensive tooling.'

export const metadata: Metadata = {
  title: 'About — Georgios Nicolaides',
  description,
  openGraph: {
    title: 'About — Georgios Nicolaides',
    description,
    type: 'website',
  },
  twitter: {
    card: 'summary',
  },
}

export default function AboutPage() {
  return <AboutView />
}
