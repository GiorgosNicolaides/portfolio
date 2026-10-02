import type { Metadata, Viewport } from 'next'
import './globals.css'
import { inter, jetbrainsMono } from './fonts'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'
import BackToTop from '@/components/ui/BackToTop'
import { Analytics } from '@vercel/analytics/react'
import { profile } from '@/data/profile'

const siteUrl = 'https://georgiosnicolaides.vercel.app'
const title = `${profile.name} | ${profile.headline}`
const description =
  'Early-career software, security and DevOps engineer looking for junior roles. MEng Cybersecurity (University of Limerick). Documented projects in DevSecOps, detection and applied cryptography.'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: `%s | ${profile.name}`,
  },
  description,
  keywords: [
    'DevOps engineer',
    'DevSecOps',
    'cloud security',
    'cybersecurity engineer',
    'Kubernetes',
    'Docker',
    'Ansible',
    'GitHub Actions',
    'AWS',
    'SOC analyst',
    'AI automation',
    'agentic AI',
    'Claude Code',
    'service desk engineer',
    'Microsoft 365',
    'Sophos',
    'Cyprus',
  ],
  authors: [{ name: profile.name, url: siteUrl }],
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: profile.name,
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title,
    description,
  },
}

export const viewport: Viewport = {
  themeColor: '#090d14',
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: profile.name,
  jobTitle: profile.headline,
  email: `mailto:${profile.email}`,
  url: siteUrl,
  address: { '@type': 'PostalAddress', addressLocality: 'Nicosia', addressCountry: 'CY' },
  alumniOf: ['University of Limerick', 'Harokopio University'],
  worksFor: { '@type': 'Organization', name: profile.currentRole.company },
  knowsLanguage: profile.languages.map(l => l.name),
  sameAs: [profile.github, profile.linkedin],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="flex min-h-screen flex-col bg-background font-sans text-text-primary">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-background"
        >
          Skip to content
        </a>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <Nav />
        <main id="main" className="flex-1">{children}</main>
        <Footer />
        <BackToTop />
        <Analytics />
      </body>
    </html>
  )
}
