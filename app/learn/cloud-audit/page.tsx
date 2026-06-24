import type { Metadata } from 'next'
import Link from 'next/link'
import SectionHeader from '@/components/ui/SectionHeader'
import CloudAuditDiagram from '@/components/diagrams/CloudAuditDiagram'

const description =
  'An interactive CIS benchmark audit across S3, IAM, and Security Groups with a live risk score.'

export const metadata: Metadata = {
  title: 'Cloud Misconfiguration Audit — Georgios Nicolaides',
  description,
  openGraph: {
    title: 'Cloud Misconfiguration Audit — Georgios Nicolaides',
    description,
    type: 'article',
  },
  twitter: {
    card: 'summary',
  },
}

export default function CloudAuditPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
      <Link
        href="/learn"
        className="mb-8 inline-flex items-center gap-1 font-mono text-sm text-text-muted transition-colors hover:text-accent"
      >
        ← Learn
      </Link>
      <SectionHeader
        title="Cloud Misconfiguration Audit"
        subtitle="Run the audit to evaluate CIS benchmark checks and watch the risk score climb."
      />
      <CloudAuditDiagram />
    </div>
  )
}
