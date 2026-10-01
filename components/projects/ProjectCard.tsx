import Link from 'next/link'
import { categoryLabels, type Project } from '@/data/projects'
import { ArrowRightIcon, GitHubIcon, LockIcon, UsersIcon } from '@/components/ui/Icons'
import { cn } from '@/lib/utils'

export default function ProjectCard({ project, large = false }: { project: Project; large?: boolean }) {
  return (
    <article className={cn('card card-hover group relative flex h-full flex-col p-6', large && 'sm:p-7')}>
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <span className="rounded-md bg-accent/10 px-2 py-0.5 font-mono text-[11px] text-accent">
          {categoryLabels[project.category]}
        </span>
        {project.team && (
          <span className="inline-flex items-center gap-1 rounded-md bg-sky/10 px-2 py-0.5 font-mono text-[11px] text-sky">
            <UsersIcon size={12} /> Team project
          </span>
        )}
        {project.private && (
          <span className="inline-flex items-center gap-1 rounded-md bg-warning/10 px-2 py-0.5 font-mono text-[11px] text-warning">
            <LockIcon size={12} /> Code on request
          </span>
        )}
        <span className="ml-auto font-mono text-[11px] text-text-muted">{project.year}</span>
      </div>

      <h3 className={cn('font-semibold text-text-primary', large ? 'text-xl' : 'text-lg')}>
        <Link href={`/projects/${project.slug}`} className="after:absolute after:inset-0">
          {project.title}
        </Link>
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-text-muted">{project.tagline}</p>

      {large && (
        <div className="mt-5 grid grid-cols-3 gap-2">
          {project.metrics.slice(0, 3).map(m => (
            <div key={m.label} className="rounded-lg border border-border-subtle bg-background/50 px-3 py-2.5">
              <div className="font-mono text-lg font-bold text-accent">{m.value}</div>
              <div className="mt-0.5 text-[11px] leading-tight text-text-muted">{m.label}</div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-5 flex flex-wrap gap-1.5">
        {project.stack.slice(0, large ? 8 : 5).map(t => (
          <span key={t} className="chip">
            {t}
          </span>
        ))}
      </div>

      <div className="mt-auto flex items-center justify-between pt-6 text-sm">
        <span className="inline-flex items-center gap-1.5 font-medium text-accent">
          Case study <ArrowRightIcon size={15} className="transition-transform group-hover:translate-x-1" />
        </span>
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.title} on GitHub`}
            className="relative z-10 text-text-muted transition-colors hover:text-accent"
          >
            <GitHubIcon />
          </a>
        )}
      </div>
    </article>
  )
}
