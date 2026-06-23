'use client'
import Link from 'next/link'
import Badge from '@/components/ui/Badge'
import type { Project } from '@/hooks/useProjects'

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.37.5 0 5.78 0 12.29c0 5.21 3.44 9.63 8.21 11.19.6.11.82-.25.82-.56 0-.28-.01-1.02-.02-2-3.34.71-4.04-1.58-4.04-1.58-.55-1.37-1.34-1.74-1.34-1.74-1.09-.73.08-.72.08-.72 1.2.08 1.84 1.22 1.84 1.22 1.07 1.8 2.81 1.28 3.5.98.11-.76.42-1.28.76-1.57-2.67-.3-5.47-1.31-5.47-5.84 0-1.29.47-2.34 1.24-3.17-.12-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.21a11.5 11.5 0 0 1 6 0c2.29-1.53 3.3-1.21 3.3-1.21.66 1.65.24 2.87.12 3.17.77.83 1.24 1.88 1.24 3.17 0 4.54-2.81 5.54-5.49 5.83.43.37.81 1.1.81 2.22 0 1.6-.01 2.89-.01 3.28 0 .31.21.68.83.56A12.01 12.01 0 0 0 24 12.29C24 5.78 18.63.5 12 .5z" />
    </svg>
  )
}

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  )
}

interface ProjectCardProps {
  project: Project
  maxTags?: number
}

export default function ProjectCard({ project, maxTags }: ProjectCardProps) {
  const tags = maxTags ? project.tags.slice(0, maxTags) : project.tags

  return (
    <article className="group relative flex h-full flex-col rounded-lg border border-border-subtle bg-panel p-6 transition-colors hover:border-accent/40">
      {/* Stretched link — the whole card navigates to the detail page. Kept as a
          sibling overlay (not a wrapping anchor) to avoid nesting the GitHub
          anchor inside another anchor. */}
      <Link
        href={`/projects/${project.slug}`}
        aria-label={`View details for ${project.title}`}
        className="absolute inset-0 rounded-lg"
      />

      <h3 className="mb-2 text-lg font-semibold text-text-primary transition-colors group-hover:text-accent">
        {project.title}
      </h3>

      <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-text-muted">
        {project.description}
      </p>

      <div className="mb-5 flex flex-wrap gap-2">
        {tags.map(tag => (
          <Badge key={tag} variant="security">{tag}</Badge>
        ))}
      </div>

      <div className="mt-auto pt-2">
        {project.github ? (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            className="relative z-10 inline-flex items-center gap-2 font-mono text-sm text-text-muted transition-colors hover:text-accent"
          >
            <GitHubIcon /> View Code
          </a>
        ) : (
          <span className="relative z-10 inline-flex items-center gap-2 font-mono text-sm text-text-muted">
            <LockIcon /> Code available upon request
          </span>
        )}
      </div>
    </article>
  )
}
