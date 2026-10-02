import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { categoryLabels, getProject, projects } from '@/data/projects'
import { profile } from '@/data/profile'
import ProjectCard from '@/components/projects/ProjectCard'
import { ArrowRightIcon, ExternalIcon, GitHubIcon, LockIcon, MailIcon, UsersIcon } from '@/components/ui/Icons'

interface PageProps {
  params: { slug: string }
}

export function generateStaticParams() {
  return projects.map(p => ({ slug: p.slug }))
}

export function generateMetadata({ params }: PageProps): Metadata {
  const project = getProject(params.slug)
  if (!project) {
    return { title: 'Project not found' }
  }
  return {
    title: project.title,
    description: project.tagline,
    openGraph: { title: project.title, description: project.tagline, type: 'article' },
  }
}

export default function ProjectDetailPage({ params }: PageProps) {
  const project = getProject(params.slug)
  if (!project) {
    notFound()
  }

  const related = projects
    .filter(p => p.slug !== project.slug && p.category === project.category)
    .concat(projects.filter(p => p.slug !== project.slug && p.category !== project.category && p.featured))
    .slice(0, 2)

  return (
    <div className="mx-auto max-w-4xl px-6 py-14 sm:py-20">
      <Link
        href="/projects"
        className="mb-10 inline-flex items-center gap-1 text-sm text-text-muted transition-colors hover:text-accent"
      >
        ← All projects
      </Link>

      <div className="mb-5 flex flex-wrap items-center gap-2">
        <span className="rounded-md bg-accent/10 px-2 py-0.5 font-mono text-xs text-accent">
          {categoryLabels[project.category]}
        </span>
        {project.team && (
          <span className="inline-flex items-center gap-1 rounded-md bg-sky/10 px-2 py-0.5 font-mono text-xs text-sky">
            <UsersIcon size={12} /> Team project
          </span>
        )}
        {project.private && (
          <span className="inline-flex items-center gap-1 rounded-md bg-warning/10 px-2 py-0.5 font-mono text-xs text-warning">
            <LockIcon size={12} /> Code on request
          </span>
        )}
        <span className="font-mono text-xs text-text-muted">{project.year}</span>
      </div>

      <h1 className="text-3xl font-bold tracking-tight text-text-primary sm:text-5xl">{project.title}</h1>
      <p className="mt-4 text-lg leading-relaxed text-text-muted">{project.tagline}</p>

      <div className="mt-8 flex flex-wrap gap-3">
        {project.github ? (
          <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn-primary">
            <GitHubIcon size={16} /> View source
          </a>
        ) : (
          <a href={`mailto:${profile.email}?subject=${encodeURIComponent(`Code access: ${project.title}`)}`} className="btn-primary">
            <MailIcon size={16} /> Request code walkthrough
          </a>
        )}
        {project.extraLinks?.map(l => (
          <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="btn-secondary">
            <ExternalIcon size={16} /> {l.label}
          </a>
        ))}
        {project.learnHref && (
          <Link href={project.learnHref} className="btn-secondary">
            Interactive diagram <ArrowRightIcon size={16} />
          </Link>
        )}
      </div>

      <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-border-subtle bg-border-subtle sm:grid-cols-3">
        {project.metrics.map(m => (
          <div key={m.label} className="bg-panel px-5 py-5">
            <div className="font-mono text-2xl font-bold text-accent">{m.value}</div>
            <div className="mt-1 text-sm text-text-muted">{m.label}</div>
          </div>
        ))}
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="card p-6">
          <div className="eyebrow mb-3 !text-danger">The problem</div>
          <p className="leading-relaxed text-text-primary/90">{project.problem}</p>
        </div>
        <div className="card p-6">
          <div className="eyebrow mb-3">What I built</div>
          <p className="leading-relaxed text-text-primary/90">{project.solution}</p>
        </div>
      </div>

      <section className="mt-12">
        <h2 className="mb-5 text-xl font-semibold text-text-primary">Engineering highlights</h2>
        <ul className="space-y-3">
          {project.highlights.map(h => (
            <li key={h} className="flex gap-3 leading-relaxed text-text-primary/90">
              <span className="mt-1.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-accent/15 text-[10px] text-accent">
                ✓
              </span>
              {h}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="mb-4 text-xl font-semibold text-text-primary">Tech stack</h2>
        <div className="flex flex-wrap gap-2">
          {project.stack.map(t => (
            <span key={t} className="rounded-lg border border-border-subtle bg-panel px-3 py-1.5 text-sm text-text-primary">
              {t}
            </span>
          ))}
        </div>
      </section>

      {project.team && (
        <p className="mt-10 rounded-lg border border-sky/30 bg-sky/5 p-4 text-sm text-text-muted">
          This was a team project built for a university course and later refined for this portfolio. I&apos;m happy to
          go through my own contributions in detail.
        </p>
      )}

      {related.length > 0 && (
        <section className="mt-20 border-t border-border-subtle pt-12">
          <h2 className="mb-6 text-xl font-semibold text-text-primary">More projects</h2>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {related.map(p => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
