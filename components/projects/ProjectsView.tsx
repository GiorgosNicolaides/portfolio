'use client'
import { useState } from 'react'
import { useProjects } from '@/hooks/useProjects'
import SectionHeader from '@/components/ui/SectionHeader'
import TagFilter, { type ProjectFilter } from '@/components/projects/TagFilter'
import ProjectGrid from '@/components/projects/ProjectGrid'

export default function ProjectsView() {
  const { projects, loading } = useProjects()
  const [filter, setFilter] = useState<ProjectFilter>('all')

  const list = projects.filter(p => p.type === 'project')

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
      <SectionHeader
        title="Projects"
        subtitle="Security tooling and engineering projects — built, tested, and deployed."
      />

      <TagFilter active={filter} onChange={setFilter} />

      {loading ? (
        <p className="font-mono text-sm text-text-muted">loading…</p>
      ) : (
        <ProjectGrid projects={list} filter={filter} />
      )}
    </div>
  )
}
