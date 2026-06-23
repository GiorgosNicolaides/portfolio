import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Badge from '@/components/ui/Badge'
import { projects, getProject } from '@/lib/projects'

interface PageProps {
  params: { slug: string }
}

export function generateStaticParams() {
  return projects.map(p => ({ slug: p.slug }))
}

export function generateMetadata({ params }: PageProps): Metadata {
  const project = getProject(params.slug)
  if (!project) {
    return { title: 'Project Not Found — Georgios Nicolaides' }
  }
  const title = `${project.title} — Georgios Nicolaides`
  return {
    title,
    description: project.description,
    openGraph: {
      title,
      description: project.description,
      type: 'article',
    },
    twitter: {
      card: 'summary',
    },
  }
}

const categoryLabels: Record<string, string> = {
  security: 'Security',
  cs: 'CS',
  'research-tool': 'Research Tool',
  research: 'Research',
}

const statusLabels: Record<string, { label: string; variant: 'warning' | 'blue' | 'success' }> = {
  in_progress: { label: 'In Progress', variant: 'warning' },
  pending_submission: { label: 'Pending Submission', variant: 'blue' },
  completed: { label: 'Completed', variant: 'success' },
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.37.5 0 5.78 0 12.29c0 5.21 3.44 9.63 8.21 11.19.6.11.82-.25.82-.56 0-.28-.01-1.02-.02-2-3.34.71-4.04-1.58-4.04-1.58-.55-1.37-1.34-1.74-1.34-1.74-1.09-.73.08-.72.08-.72 1.2.08 1.84 1.22 1.84 1.22 1.07 1.8 2.81 1.28 3.5.98.11-.76.42-1.28.76-1.57-2.67-.3-5.47-1.31-5.47-5.84 0-1.29.47-2.34 1.24-3.17-.12-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.21a11.5 11.5 0 0 1 6 0c2.29-1.53 3.3-1.21 3.3-1.21.66 1.65.24 2.87.12 3.17.77.83 1.24 1.88 1.24 3.17 0 4.54-2.81 5.54-5.49 5.83.43.37.81 1.1.81 2.22 0 1.6-.01 2.89-.01 3.28 0 .31.21.68.83.56A12.01 12.01 0 0 0 24 12.29C24 5.78 18.63.5 12 .5z" />
    </svg>
  )
}

function DemoIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <path d="M15 3h6v6" />
      <path d="M10 14 21 3" />
    </svg>
  )
}

export default function ProjectDetailPage({ params }: PageProps) {
  const project = getProject(params.slug)
  if (!project) {
    notFound()
  }

  const status = project.status ? statusLabels[project.status] : undefined

  return (
    <div className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
      <Link
        href="/projects"
        className="mb-8 inline-flex items-center gap-1 font-mono text-sm text-text-muted transition-colors hover:text-accent"
      >
        ← Projects
      </Link>

      <div className="mb-4 flex flex-wrap items-center gap-2">
        <Badge variant="security">{categoryLabels[project.category] ?? project.category}</Badge>
        <Badge variant={project.type === 'research' ? 'research' : 'default'}>
          {project.type === 'research' ? 'Research' : 'Project'}
        </Badge>
        {status && <Badge variant={status.variant}>{status.label}</Badge>}
      </div>

      <h1 className="mb-6 text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
        {project.title}
      </h1>

      {(project.research_type || project.institution || project.year) && (
        <div className="mb-6 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-border-subtle bg-border-subtle sm:grid-cols-3">
          {project.research_type && (
            <div className="bg-panel p-4">
              <div className="font-mono text-xs text-text-muted">Research Type</div>
              <div className="mt-1 text-sm text-text-primary">{project.research_type}</div>
            </div>
          )}
          {project.institution && (
            <div className="bg-panel p-4">
              <div className="font-mono text-xs text-text-muted">Institution</div>
              <div className="mt-1 text-sm text-text-primary">{project.institution}</div>
            </div>
          )}
          {project.year && (
            <div className="bg-panel p-4">
              <div className="font-mono text-xs text-text-muted">Year</div>
              <div className="mt-1 text-sm text-text-primary">{project.year}</div>
            </div>
          )}
        </div>
      )}

      <p className="mb-8 leading-relaxed text-text-muted">{project.description}</p>

      {project.stat && (
        <div className="mb-8 rounded-lg border border-accent/30 bg-accent/5 p-6">
          <div className="font-mono text-3xl font-bold text-accent sm:text-4xl">{project.stat}</div>
          <div className="mt-1 font-mono text-xs text-text-muted">benchmark result</div>
        </div>
      )}

      {project.note && (
        <div className="mb-8 rounded-lg border border-l-2 border-border-subtle border-l-blue-400 bg-panel p-5">
          <div className="mb-1 font-mono text-xs text-blue-400">{'// note'}</div>
          <p className="text-sm text-text-muted">{project.note}</p>
        </div>
      )}

      <div className="mb-8">
        <h2 className="mb-3 font-mono text-sm text-accent">{'// tags'}</h2>
        <div className="flex flex-wrap gap-2">
          {project.tags.map(tag => (
            <Badge key={tag} variant="security">{tag}</Badge>
          ))}
        </div>
      </div>

      {project.highlights && project.highlights.length > 0 && (
        <div className="mb-8">
          <h2 className="mb-3 font-mono text-sm text-accent">{'// highlights'}</h2>
          <ul className="space-y-2">
            {project.highlights.map((highlight, i) => (
              <li key={i} className="flex gap-3 text-sm text-text-primary">
                <span className="mt-0.5 text-accent">▹</span>
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-4">
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded bg-accent px-6 py-3 font-mono text-sm font-semibold text-background transition-colors hover:bg-accent-dim"
          >
            <GitHubIcon /> View on GitHub
          </a>
        )}

        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded border border-accent px-6 py-3 font-mono text-sm font-semibold text-accent transition-colors hover:bg-accent/10"
          >
            <DemoIcon /> Live Demo
          </a>
        )}
      </div>

      {!project.github && (
        <div className="mt-4 rounded-lg border border-border-subtle bg-panel p-6">
          <h2 className="mb-1 font-semibold text-text-primary">Code available upon request</h2>
          <p className="text-sm text-text-muted">
            This project&apos;s source is private. Reach out and I&apos;m happy to walk through it
            or share access —{' '}
            <a
              href="mailto:gnicolaides02@gmail.com"
              className="font-mono text-accent transition-colors hover:text-accent-dim"
            >
              gnicolaides02@gmail.com
            </a>
            .
          </p>
        </div>
      )}
    </div>
  )
}
