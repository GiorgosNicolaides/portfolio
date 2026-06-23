import type { Metadata } from 'next'
import Hero from '@/components/home/Hero'
import FeaturedProjects from '@/components/home/FeaturedProjects'

const description =
  'Cybersecurity engineer specialising in protocol security, cryptographic implementation, and defensive tooling. MEng Cybersecurity at University of Limerick.'

export const metadata: Metadata = {
  title: 'Georgios Nicolaides — Cybersecurity Engineer',
  description,
  openGraph: {
    title: 'Georgios Nicolaides — Cybersecurity Engineer',
    description,
    type: 'website',
  },
  twitter: {
    card: 'summary',
  },
}

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedProjects />
    </>
  )
}
