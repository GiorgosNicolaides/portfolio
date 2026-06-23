'use client'
import { useProjects } from '@/hooks/useProjects'
import { useProfile } from '@/hooks/useProfile'
import SectionHeader from '@/components/ui/SectionHeader'
import ResearchCard, { type ResearchEntry } from '@/components/research/ResearchCard'

export default function ResearchView() {
  const { projects, loading: projectsLoading } = useProjects()
  const { profile, loading: profileLoading } = useProfile()
  const loading = projectsLoading || profileLoading

  const fromProfile: ResearchEntry[] = (profile?.research ?? []).map(r => ({
    title: r.title,
    type: r.type,
    institution: r.institution,
    year: r.year,
    status: r.status,
    description: r.description,
    highlights: r.highlights,
    stat: r.stat,
    grade: r.grade,
    author_position: r.author_position,
    code_available: r.code_available,
    repo: r.repo,
  }))

  const fromProjects: ResearchEntry[] = projects
    .filter(p => p.type === 'research')
    .map(p => ({
      title: p.title,
      type: p.research_type ?? 'Research',
      institution: p.institution ?? '',
      year: p.year ?? '',
      status: (p.status as ResearchEntry['status']) ?? 'in_progress',
      description: p.description,
      highlights: p.highlights ?? [],
      stat: p.stat,
      author_position: p.author_position,
      code_available: p.code_available ?? 'upon_request',
      repo: p.github,
    }))

  // Both sources overlap on the SONDA-MA and LEO entries — merge and dedupe by
  // title, letting the richer profile entries take precedence.
  const seen = new Set<string>()
  const entries = [...fromProfile, ...fromProjects].filter(entry => {
    if (seen.has(entry.title)) return false
    seen.add(entry.title)
    return true
  })

  return (
    <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
      <SectionHeader
        title="Research"
        subtitle="Cryptographic protocol design and security research across IoT, satellite, and web domains."
      />

      {loading ? (
        <p className="font-mono text-sm text-text-muted">loading…</p>
      ) : (
        <div className="space-y-8">
          {entries.map((entry, i) => (
            <ResearchCard key={i} entry={entry} />
          ))}
        </div>
      )}
    </div>
  )
}
