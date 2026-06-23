import ProjectCard from '@/components/projects/ProjectCard'
import type { Project } from '@/hooks/useProjects'
import type { ProjectFilter } from '@/components/projects/TagFilter'

interface ProjectGridProps {
  projects: Project[]
  filter: ProjectFilter
}

export default function ProjectGrid({ projects, filter }: ProjectGridProps) {
  const filtered =
    filter === 'all' ? projects : projects.filter(p => p.category === filter)

  if (filtered.length === 0) {
    return (
      <p className="font-mono text-sm text-text-muted">
        No projects in this category.
      </p>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {filtered.map(project => (
        <ProjectCard key={project.slug} project={project} />
      ))}
    </div>
  )
}
