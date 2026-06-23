import type { Metadata } from 'next'
import SectionHeader from '@/components/ui/SectionHeader'
import DownloadCV from '@/components/ui/DownloadCV'
import CopyEmail from '@/components/ui/CopyEmail'

const description =
  'Get in touch with Georgios Nicolaides — open to cybersecurity engineering roles and research collaborations.'

export const metadata: Metadata = {
  title: 'Contact — Georgios Nicolaides',
  description,
  openGraph: {
    title: 'Contact — Georgios Nicolaides',
    description,
    type: 'website',
  },
  twitter: {
    card: 'summary',
  },
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  )
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.37.5 0 5.78 0 12.29c0 5.21 3.44 9.63 8.21 11.19.6.11.82-.25.82-.56 0-.28-.01-1.02-.02-2-3.34.71-4.04-1.58-4.04-1.58-.55-1.37-1.34-1.74-1.34-1.74-1.09-.73.08-.72.08-.72 1.2.08 1.84 1.22 1.84 1.22 1.07 1.8 2.81 1.28 3.5.98.11-.76.42-1.28.76-1.57-2.67-.3-5.47-1.31-5.47-5.84 0-1.29.47-2.34 1.24-3.17-.12-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.21a11.5 11.5 0 0 1 6 0c2.29-1.53 3.3-1.21 3.3-1.21.66 1.65.24 2.87.12 3.17.77.83 1.24 1.88 1.24 3.17 0 4.54-2.81 5.54-5.49 5.83.43.37.81 1.1.81 2.22 0 1.6-.01 2.89-.01 3.28 0 .31.21.68.83.56A12.01 12.01 0 0 0 24 12.29C24 5.78 18.63.5 12 .5z" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

const cardClass =
  'group flex items-start gap-4 rounded-lg border border-border-subtle bg-panel p-6 transition-colors hover:border-accent/40'

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16 sm:py-20">
      <SectionHeader
        title="Contact"
        subtitle="Open to security engineering roles, research collaboration, and speaking opportunities."
      />

      <p className="mb-10 max-w-2xl leading-relaxed text-text-muted">
        Whether you want to talk protocol security, discuss a research idea, or just say hello —
        the fastest way to reach me is email. I read everything and reply quickly.
      </p>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <div className={cardClass}>
          <span className="text-text-muted transition-colors group-hover:text-accent">
            <MailIcon />
          </span>
          <span className="min-w-0">
            <span className="block font-semibold text-text-primary">Email</span>
            <span className="flex items-center gap-2">
              <a
                href="mailto:gnicolaides02@gmail.com"
                className="break-all font-mono text-sm text-text-muted transition-colors hover:text-accent"
              >
                gnicolaides02@gmail.com
              </a>
              <CopyEmail />
            </span>
          </span>
        </div>

        <a
          href="https://github.com/GiorgosNicolaides"
          target="_blank"
          rel="noopener noreferrer"
          className={cardClass}
        >
          <span className="text-text-muted transition-colors group-hover:text-accent">
            <GitHubIcon />
          </span>
          <span>
            <span className="block font-semibold text-text-primary">GitHub</span>
            <span className="block font-mono text-sm text-text-muted">@GiorgosNicolaides</span>
          </span>
        </a>

        <a
          href="https://www.linkedin.com/in/giorgosnicolaides/"
          target="_blank"
          rel="noopener noreferrer"
          className={cardClass}
        >
          <span className="text-text-muted transition-colors group-hover:text-accent">
            <LinkedInIcon />
          </span>
          <span>
            <span className="block font-semibold text-text-primary">LinkedIn</span>
            <span className="block font-mono text-sm text-text-muted">in/giorgosnicolaides</span>
          </span>
        </a>
      </div>

      <div className="mt-10">
        <DownloadCV />
      </div>
    </div>
  )
}
