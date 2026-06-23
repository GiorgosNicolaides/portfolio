import { cn } from '@/lib/utils'
import Badge from '@/components/ui/Badge'
import type { Education, Volunteer } from '@/hooks/useProfile'

const MONTHS: Record<string, number> = {
  Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
  Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
}

function sortKey(start: string): number {
  const [month, year] = start.split(' ')
  const y = parseInt(year, 10) || 0
  const m = MONTHS[month] ?? 0
  return y * 12 + m
}

interface TimelineItem {
  kind: 'education' | 'volunteer'
  title: string
  subtitle: string
  start: string
  end: string
  current?: boolean
  thesis?: string
  grade?: string
  highlights?: string[]
}

interface TimelineProps {
  education: Education[]
  volunteer: Volunteer[]
}

export default function Timeline({ education, volunteer }: TimelineProps) {
  const items: TimelineItem[] = [
    ...education.map((e): TimelineItem => ({
      kind: 'education',
      title: e.degree,
      subtitle: `${e.institution} · ${e.country}`,
      start: e.start,
      end: e.end,
      current: e.current,
      thesis: e.thesis,
      grade: e.grade,
    })),
    ...volunteer.map((v): TimelineItem => ({
      kind: 'volunteer',
      title: v.role,
      subtitle: `${v.organisation} · ${v.chapter}`,
      start: v.start,
      end: v.end,
      highlights: v.highlights,
    })),
  ].sort((a, b) => sortKey(b.start) - sortKey(a.start))

  return (
    <div className="relative">
      <div className="absolute bottom-1 left-[5px] top-1 w-px bg-border-subtle" />
      <div className="space-y-10">
        {items.map((item, i) => (
          <div key={i} className="relative pl-8">
            <span
              className={cn(
                'absolute left-0 top-1.5 h-[11px] w-[11px] rounded-full ring-4 ring-background',
                item.kind === 'education' ? 'bg-accent' : 'bg-blue-400'
              )}
            />

            <div className="mb-1 flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h3 className="font-semibold text-text-primary">{item.title}</h3>
              {item.current && <Badge variant="success">current</Badge>}
            </div>

            <div className="mb-1 font-mono text-sm text-text-muted">{item.subtitle}</div>
            <div className="mb-3 font-mono text-xs text-text-muted">
              {item.start} — {item.end}
            </div>

            {item.thesis && (
              <p className="text-sm text-text-muted">
                Thesis: <span className="text-text-primary">{item.thesis}</span>
              </p>
            )}
            {item.grade && (
              <p className="mt-1 font-mono text-sm text-accent">Grade: {item.grade}</p>
            )}

            {item.highlights && (
              <ul className="mt-2 space-y-1.5">
                {item.highlights.map((highlight, j) => (
                  <li key={j} className="flex gap-2.5 text-sm text-text-muted">
                    <span className="mt-0.5 text-blue-400">▹</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
