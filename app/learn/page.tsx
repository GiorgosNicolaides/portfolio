import type { Metadata } from 'next'
import Link from 'next/link'
import SectionHeader from '@/components/ui/SectionHeader'

const description =
  'Visual explainers for core security concepts — interactive diagrams for OAuth 2.0, Zero Trust, and DevSecOps pipelines.'

export const metadata: Metadata = {
  title: 'Interactive Diagrams — Georgios Nicolaides',
  description,
  openGraph: {
    title: 'Interactive Diagrams — Georgios Nicolaides',
    description,
    type: 'website',
  },
  twitter: {
    card: 'summary',
  },
}

function KeyIcon() {
  return (
    <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <circle cx="7.5" cy="15.5" r="4.5" />
      <path d="m10.5 12.5 8-8" />
      <path d="m16 5 3 3" />
      <path d="m19 8 2-2-3-3-2 2" />
    </svg>
  )
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  )
}

function PipelineIcon() {
  return (
    <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="2" y="9" width="6" height="6" rx="1" />
      <rect x="16" y="9" width="6" height="6" rx="1" />
      <path d="M8 12h8" />
      <path d="m13 9-2 3 2 3" />
    </svg>
  )
}

const TOPICS = [
  {
    href: '/learn/oauth',
    title: 'OAuth 2.0',
    description: 'Step through the Authorization Code Flow with PKCE.',
    icon: <KeyIcon />,
  },
  {
    href: '/learn/zero-trust',
    title: 'Zero Trust',
    description: 'How every request is evaluated against policy gates.',
    icon: <ShieldIcon />,
  },
  {
    href: '/learn/devsecops',
    title: 'DevSecOps Pipeline',
    description: 'Security gates in a CI/CD pipeline, animated end to end.',
    icon: <PipelineIcon />,
  },
]

export default function LearnPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
      <SectionHeader
        title="Interactive Diagrams"
        subtitle="Visual explainers for core security concepts — click any topic to explore"
      />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {TOPICS.map(topic => (
          <Link
            key={topic.href}
            href={topic.href}
            className="group flex flex-col rounded-lg border border-border-subtle bg-panel p-6 transition-colors hover:border-accent/60"
          >
            <span className="mb-4 text-accent">{topic.icon}</span>
            <h3 className="mb-2 text-lg font-semibold text-text-primary transition-colors group-hover:text-accent">
              {topic.title}
            </h3>
            <p className="mb-5 flex-1 text-sm leading-relaxed text-text-muted">{topic.description}</p>
            <span className="font-mono text-sm text-accent">Explore →</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
