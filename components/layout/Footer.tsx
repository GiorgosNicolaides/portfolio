import { profile } from '@/data/profile'
import { GitHubIcon, LinkedInIcon, MailIcon } from '@/components/ui/Icons'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-24 border-t border-border-subtle">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
        <p className="text-sm text-text-muted">
          © {year} {profile.name} · {profile.headline}
        </p>
        <div className="flex items-center gap-5 text-text-muted">
          <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="transition-colors hover:text-accent">
            <GitHubIcon />
          </a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="transition-colors hover:text-accent">
            <LinkedInIcon />
          </a>
          <a href={`mailto:${profile.email}`} aria-label="Email" className="transition-colors hover:text-accent">
            <MailIcon />
          </a>
        </div>
      </div>
    </footer>
  )
}
