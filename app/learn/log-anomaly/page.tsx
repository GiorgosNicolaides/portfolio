import type { Metadata } from 'next'
import Link from 'next/link'
import SectionHeader from '@/components/ui/SectionHeader'
import LogAnomalyDiagram from '@/components/diagrams/LogAnomalyDiagram'

const description =
  'An animated log anomaly detection pipeline — from raw log line to an Isolation Forest anomaly alert.'

export const metadata: Metadata = {
  title: 'Log Anomaly Detection Pipeline — Georgios Nicolaides',
  description,
  openGraph: {
    title: 'Log Anomaly Detection Pipeline — Georgios Nicolaides',
    description,
    type: 'article',
  },
  twitter: {
    card: 'summary',
  },
}

export default function LogAnomalyPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
      <Link
        href="/learn"
        className="mb-8 inline-flex items-center gap-1 font-mono text-sm text-text-muted transition-colors hover:text-accent"
      >
        ← Learn
      </Link>
      <SectionHeader
        title="Log Anomaly Detection Pipeline"
        subtitle="Run the pipeline to watch a single log line transform into a scored anomaly alert."
      />
      <LogAnomalyDiagram />
    </div>
  )
}
