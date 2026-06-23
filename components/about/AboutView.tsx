'use client'
import { useProfile } from '@/hooks/useProfile'
import SectionHeader from '@/components/ui/SectionHeader'
import DownloadCV from '@/components/ui/DownloadCV'
import Timeline from '@/components/about/Timeline'
import SkillsSection from '@/components/about/SkillsSection'
import CertBadge from '@/components/about/CertBadge'

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.37.5 0 5.78 0 12.29c0 5.21 3.44 9.63 8.21 11.19.6.11.82-.25.82-.56 0-.28-.01-1.02-.02-2-3.34.71-4.04-1.58-4.04-1.58-.55-1.37-1.34-1.74-1.34-1.74-1.09-.73.08-.72.08-.72 1.2.08 1.84 1.22 1.84 1.22 1.07 1.8 2.81 1.28 3.5.98.11-.76.42-1.28.76-1.57-2.67-.3-5.47-1.31-5.47-5.84 0-1.29.47-2.34 1.24-3.17-.12-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.21a11.5 11.5 0 0 1 6 0c2.29-1.53 3.3-1.21 3.3-1.21.66 1.65.24 2.87.12 3.17.77.83 1.24 1.88 1.24 3.17 0 4.54-2.81 5.54-5.49 5.83.43.37.81 1.1.81 2.22 0 1.6-.01 2.89-.01 3.28 0 .31.21.68.83.56A12.01 12.01 0 0 0 24 12.29C24 5.78 18.63.5 12 .5z" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  )
}

const socialLinkClass =
  'text-text-muted transition-colors hover:text-accent'

export default function AboutView() {
  const { profile, loading } = useProfile()

  if (loading || !profile) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-20">
        <p className="font-mono text-sm text-text-muted">loading…</p>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-4xl space-y-20 px-6 py-16 sm:py-20">
      <section>
        <SectionHeader title="About" />
        <div className="rounded-lg border border-l-2 border-border-subtle border-l-accent bg-panel p-6 sm:p-8">
          <p className="leading-relaxed text-text-primary">{profile.personal_statement}</p>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-6">
          <DownloadCV />

          <div className="flex items-center gap-5">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className={socialLinkClass}
            >
              <GitHubIcon />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className={socialLinkClass}
            >
              <LinkedInIcon />
            </a>
            <a href={`mailto:${profile.email}`} aria-label="Email" className={socialLinkClass}>
              <MailIcon />
            </a>
          </div>
        </div>
      </section>

      <section>
        <SectionHeader title="Journey" subtitle="Education and community leadership, most recent first." />
        <Timeline education={profile.education} volunteer={profile.volunteer} />
      </section>

      <section>
        <SectionHeader title="Skills" />
        <SkillsSection skills={profile.skills} />
      </section>

      <section>
        <h2 className="mb-6 font-mono text-2xl font-bold text-accent">{'// github activity'}</h2>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <a
            href="https://github.com/GiorgosNicolaides"
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://github-readme-stats.vercel.app/api?username=GiorgosNicolaides&theme=dark&bg_color=0f1520&title_color=00ff88&text_color=e2e8f0&border_color=1e2d40&hide_border=false"
              alt="GitHub statistics for GiorgosNicolaides"
              className="w-full"
            />
          </a>
          <a
            href="https://github.com/GiorgosNicolaides"
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://github-readme-streak-stats.herokuapp.com/?user=GiorgosNicolaides&theme=dark&background=0f1520&ring=00ff88&fire=00ff88&currStreakLabel=00ff88&border=1e2d40"
              alt="GitHub contribution streak for GiorgosNicolaides"
              className="w-full"
            />
          </a>
        </div>
      </section>

      <section>
        <SectionHeader title="Certifications" />
        <div className="space-y-4">
          {profile.certifications.map((cert, i) => (
            <CertBadge key={i} cert={cert} />
          ))}
        </div>

        <div className="mt-10">
          <h3 className="mb-4 font-mono text-sm text-accent">{'// tryhackme'}</h3>
          <a
            href={profile.tryhackme.profile_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block transition-opacity hover:opacity-80"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={profile.tryhackme.badge_url}
              alt={`TryHackMe badge for ${profile.tryhackme.username}`}
              className="max-w-full"
            />
          </a>
        </div>
      </section>
    </div>
  )
}
