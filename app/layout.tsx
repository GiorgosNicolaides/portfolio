import type { Metadata, Viewport } from 'next'
import './globals.css'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'
import BackToTop from '@/components/ui/BackToTop'
import { Analytics } from '@vercel/analytics/react'
import { profile } from '@/data/profile'

const siteUrl = 'https://georgiosnicolaides.vercel.app'
const title = `${profile.name} | ${profile.headline}`
const description =
  'DevSecOps and cloud security engineer. CI/CD security gates, AWS CIS auditing, Docker/Kubernetes delivery, and ML-based threat detection. MEng Cybersecurity, University of Limerick.'

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
  icons: {
    icon: '/favicon.ico',
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
  sameAs: [profile.github, profile.linkedin],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col bg-background text-text-primary">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
        <BackToTop />
        <Analytics />
      </body>
    </html>
  )
}
