'use client'
import Link from 'next/link'
import { useProjects } from '@/hooks/useProjects'
import SectionHeader from '@/components/ui/SectionHeader'
import ProjectCard from '@/components/projects/ProjectCard'

export default function FeaturedProjects() {
  const { projects, loading } = useProjects()
  const featured = projects
    .filter(p => p.featured && p.type === 'project')
    .slice(0, 3)

  return (
    <section className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
      <SectionHeader
        title="Featured Projects"
        subtitle="A selection of security tools built end to end — from threat modelling to deployment."
      />

      {loading ? (
        <p className="font-mono text-sm text-text-muted">loading…</p>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map(project => (
              <ProjectCard key={project.slug} project={project} maxTags={3} />
            ))}
          </div>

          <div className="mt-10">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 font-mono text-sm text-accent transition-colors hover:text-accent-dim"
            >
              View all projects →
            </Link>
          </div>
        </>
      )}
    </section>
  )
}
