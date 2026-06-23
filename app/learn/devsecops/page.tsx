import type { Metadata } from 'next'
import Link from 'next/link'
import SectionHeader from '@/components/ui/SectionHeader'
import DevSecOpsDiagram from '@/components/diagrams/DevSecOpsDiagram'

const description =
  'An animated CI/CD pipeline showing security gates — secret scanning, CVE checks, SAST, container scanning, and DAST.'

export const metadata: Metadata = {
  title: 'DevSecOps Pipeline — Georgios Nicolaides',
  description,
  openGraph: {
    title: 'DevSecOps Pipeline — Georgios Nicolaides',
    description,
    type: 'article',
  },
  twitter: {
    card: 'summary',
  },
}

export default function DevSecOpsPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
      <Link
        href="/learn"
        className="mb-8 inline-flex items-center gap-1 font-mono text-sm text-text-muted transition-colors hover:text-accent"
      >
        ← Learn
      </Link>
      <SectionHeader
        title="DevSecOps Pipeline"
        subtitle="Shift security left — run the pipeline to watch each gate execute in sequence."
      />
      <DevSecOpsDiagram />
    </div>
  )
}
