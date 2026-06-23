'use client'
import { cn } from '@/lib/utils'

export type ProjectFilter = 'all' | 'security' | 'cs' | 'research-tool'

const FILTERS: { label: string; value: ProjectFilter }[] = [
  { label: 'All', value: 'all' },
  { label: 'Security', value: 'security' },
  { label: 'CS', value: 'cs' },
  { label: 'Research Tool', value: 'research-tool' },
]

interface TagFilterProps {
  active: ProjectFilter
  onChange: (filter: ProjectFilter) => void
}

export default function TagFilter({ active, onChange }: TagFilterProps) {
  return (
    <div className="mb-10 flex flex-wrap gap-3">
      {FILTERS.map(filter => (
        <button
          key={filter.value}
          onClick={() => onChange(filter.value)}
          className={cn(
            'rounded border px-4 py-2 font-mono text-sm transition-colors',
            active === filter.value
              ? 'border-accent bg-accent text-background'
              : 'border-border-subtle bg-panel text-text-muted hover:border-accent hover:text-accent'
          )}
        >
          {filter.label}
        </button>
      ))}
    </div>
  )
}
