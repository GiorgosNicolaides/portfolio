'use client'
import { useState } from 'react'
import { categoryLabels, projects, type ProjectCategory } from '@/data/projects'
import SectionHeader from '@/components/ui/SectionHeader'
import ProjectCard from '@/components/projects/ProjectCard'
import { cn } from '@/lib/utils'

type Filter = 'all' | ProjectCategory

const filters: Filter[] = [
  'all',
  ...(Object.keys(categoryLabels) as ProjectCategory[]).filter(c => projects.some(p => p.category === c)),
]

export default function ProjectsView() {
  const [filter, setFilter] = useState<Filter>('all')
  const list = filter === 'all' ? projects : projects.filter(p => p.category === filter)

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
      <SectionHeader
        eyebrow="Portfolio"
        title="Projects"
        subtitle="Only complete work is listed here: documented, tested and runnable. Research code is private, and I can walk you through it on request."
      />

      <div className="mb-10 flex flex-wrap gap-2" role="tablist" aria-label="Filter projects by category">
        {filters.map(f => {
          const count = f === 'all' ? projects.length : projects.filter(p => p.category === f).length
          return (
            <button
              key={f}
              role="tab"
              aria-selected={filter === f}
              onClick={() => setFilter(f)}
              className={cn(
                'rounded-full border px-4 py-1.5 text-sm transition-colors',
                filter === f
                  ? 'border-accent bg-accent/10 text-accent'
                  : 'border-border-subtle text-text-muted hover:border-accent/50 hover:text-text-primary'
              )}
            >
              {f === 'all' ? 'All' : categoryLabels[f]}
              <span className="ml-1.5 font-mono text-xs opacity-60">{count}</span>
            </button>
          )
        })}
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {list.map(p => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
    </div>
  )
}
