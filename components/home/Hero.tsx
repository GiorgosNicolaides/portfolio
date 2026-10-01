import Link from 'next/link'
import { profile } from '@/data/profile'
import PipelineCard from '@/components/home/PipelineCard'
import { ArrowRightIcon, DownloadIcon, GitHubIcon, LinkedInIcon } from '@/components/ui/Icons'

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="grid-bg pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[480px] w-[880px] -translate-x-1/2 rounded-full bg-accent/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 px-6 pb-20 pt-16 sm:pt-24 lg:grid-cols-[1.1fr_1fr]">
        <div className="animate-fadeIn">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            Open to DevOps &amp; Cybersecurity roles
          </div>

          <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight text-text-primary sm:text-5xl lg:text-6xl">
            {profile.name}
          </h1>
          <p className="mt-4 bg-gradient-to-r from-accent to-sky bg-clip-text text-xl font-semibold text-transparent sm:text-2xl">
            {profile.headline}
          </p>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-text-muted sm:text-lg">
            {profile.pitch}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="/projects" className="btn-primary">
              View my work <ArrowRightIcon size={16} />
            </Link>
            <a href={profile.cv} download className="btn-secondary">
              <DownloadIcon size={16} /> Download CV
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="grid h-10 w-10 place-items-center rounded-lg border border-border-subtle text-text-muted transition-colors hover:border-accent/60 hover:text-accent"
            >
              <GitHubIcon />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="grid h-10 w-10 place-items-center rounded-lg border border-border-subtle text-text-muted transition-colors hover:border-accent/60 hover:text-accent"
            >
              <LinkedInIcon />
            </a>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-text-muted">
            <span>{profile.currentRole.title} @ {profile.currentRole.company}</span>
            <span className="hidden h-1 w-1 rounded-full bg-border-subtle sm:block" />
            <span>MEng Cybersecurity, University of Limerick (2026)</span>
            <span className="hidden h-1 w-1 rounded-full bg-border-subtle sm:block" />
            <span>{profile.location}</span>
          </div>
        </div>

        <div className="animate-fadeIn">
          <PipelineCard />
        </div>
      </div>
    </section>
  )
}
