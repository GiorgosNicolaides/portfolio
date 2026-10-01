import Link from 'next/link'
import { featuredProjects } from '@/data/projects'
import ProjectCard from '@/components/projects/ProjectCard'
import SectionHeader from '@/components/ui/SectionHeader'
import { ArrowRightIcon } from '@/components/ui/Icons'

export default function FeaturedProjects() {
  return (
    <section id="projects" className="mx-auto max-w-6xl px-6 py-20">
      <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
        <SectionHeader
          eyebrow="Selected work"
          title="Projects that ship"
          subtitle="Complete, documented and tested tools, most of them containerised. Each one has a write-up covering the problem, the approach and the result."
          className="mb-0"
        />
        <Link href="/projects" className="btn-secondary shrink-0">
          All projects <ArrowRightIcon size={16} />
        </Link>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2">
        {featuredProjects.map(p => (
          <ProjectCard key={p.slug} project={p} large />
        ))}
      </div>
    </section>
  )
}
