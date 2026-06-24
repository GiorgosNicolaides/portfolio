import type { Metadata } from 'next'
import Link from 'next/link'
import SectionHeader from '@/components/ui/SectionHeader'
import RBACDiagram from '@/components/diagrams/RBACDiagram'

const description =
  'An interactive RBAC policy matrix and evaluator — pick a role and resource to see access granted or denied.'

export const metadata: Metadata = {
  title: 'RBAC Policy Evaluation — Georgios Nicolaides',
  description,
  openGraph: {
    title: 'RBAC Policy Evaluation — Georgios Nicolaides',
    description,
    type: 'article',
  },
  twitter: {
    card: 'summary',
  },
}

export default function RBACPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
      <Link
        href="/learn"
        className="mb-8 inline-flex items-center gap-1 font-mono text-sm text-text-muted transition-colors hover:text-accent"
      >
        ← Learn
      </Link>
      <SectionHeader
        title="RBAC Policy Evaluation"
        subtitle="Role-based access control as a policy matrix — evaluate any role against any resource."
      />
      <RBACDiagram />
    </div>
  )
}
