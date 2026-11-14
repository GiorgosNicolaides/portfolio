import { timeline, type TimelineItem } from '@/data/profile'
import SectionHeader from '@/components/ui/SectionHeader'
import { BriefcaseIcon, CapIcon } from '@/components/ui/Icons'
import { cn } from '@/lib/utils'

const MONTHS: Record<string, number> = {
  Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
}

function startOf(period: string) {
  const [month, year] = period.split('–')[0].trim().split(' ')
  return Number(year) * 12 + (MONTHS[month] ?? 0)
}

const milestones = timeline
  .filter(item => item.kind !== 'volunteer')
  .slice()
  .sort((a, b) => startOf(a.period) - startOf(b.period))

// The most recent work role is where the roadmap currently stands.
const nowIndex = milestones.reduce((latest, item, i) => (item.kind === 'work' && item.current ? i : latest), -1)

function Card({ item, isNow }: { item: TimelineItem; isNow: boolean }) {
  const Icon = item.kind === 'education' ? CapIcon : BriefcaseIcon
  return (
    <div
      className={cn(
        'card w-full p-4',
        isNow && 'border-accent/50 bg-accent/5 shadow-[0_0_0_1px_rgba(52,211,153,0.25)]'
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <span className={cn('grid h-7 w-7 place-items-center rounded-lg', item.kind === 'education' ? 'bg-sky/10 text-sky' : 'bg-accent/10 text-accent')}>
          <Icon size={14} />
        </span>
        {isNow && <span className="rounded-full bg-accent/15 px-2 py-0.5 font-mono text-[10px] text-accent">Now</span>}
      </div>
      <div className="mt-3 font-mono text-[11px] text-text-muted">{item.period}</div>
      <div className="mt-1 text-sm font-semibold leading-snug text-text-primary">{item.title}</div>
      <div className="mt-0.5 text-xs text-text-muted">{item.org}</div>
    </div>
  )
}

export default function Roadmap() {
  const cols = milestones.length

  return (
    <section id="roadmap" className="mx-auto max-w-6xl px-6 py-20">
      <SectionHeader
        eyebrow="Career"
        title="Roadmap"
        subtitle="Academic and professional milestones, from undergraduate studies to security operations."
      />

      <div className="mb-8 flex flex-wrap gap-5 text-xs text-text-muted">
        <span className="inline-flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-sky" /> Education
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-accent" /> Professional experience
        </span>
      </div>

      {/* Desktop: education above the line, work below, in chronological order */}
      <div
        className="hidden lg:grid"
        style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`, gridTemplateRows: 'auto 56px auto' }}
        role="list"
        aria-label="Career roadmap"
      >
        {milestones.map((item, i) => (
          <div
            key={`top-${item.title}`}
            className="flex flex-col justify-end px-2"
            style={{ gridColumn: i + 1, gridRow: 1 }}
            role={item.kind === 'education' ? 'listitem' : undefined}
          >
            {item.kind === 'education' && (
              <>
                <Card item={item} isNow={i === nowIndex} />
                <span className="mx-auto h-4 w-px bg-sky/50" />
              </>
            )}
          </div>
        ))}

        <div className="relative" style={{ gridColumn: `1 / span ${cols}`, gridRow: 2 }}>
          <div
            className="absolute top-1/2 h-0.5 -translate-y-1/2 bg-gradient-to-r from-sky/60 via-border-subtle to-accent/70"
            style={{ left: `${50 / cols}%`, right: `${50 / cols}%` }}
          />
          <div className="absolute inset-0 grid" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
            {milestones.map((item, i) => (
              <div key={`dot-${item.title}`} className="grid place-items-center">
                <span
                  className={cn(
                    'relative h-4 w-4 rounded-full border-2 border-background',
                    item.kind === 'education' ? 'bg-sky' : 'bg-accent',
                    i === nowIndex && 'ring-4 ring-accent/25'
                  )}
                >
                  {i === nowIndex && <span className="absolute inset-0 animate-ping rounded-full bg-accent opacity-50" />}
                </span>
              </div>
            ))}
          </div>
        </div>

        {milestones.map((item, i) => (
          <div
            key={`bottom-${item.title}`}
            className="flex flex-col px-2"
            style={{ gridColumn: i + 1, gridRow: 3 }}
            role={item.kind === 'work' ? 'listitem' : undefined}
          >
            {item.kind === 'work' && (
              <>
                <span className="mx-auto h-4 w-px bg-accent/50" />
                <Card item={item} isNow={i === nowIndex} />
              </>
            )}
          </div>
        ))}
      </div>

      {/* Mobile / tablet: vertical roadmap */}
      <ol className="relative space-y-5 border-l-2 border-border-subtle pl-6 lg:hidden" aria-label="Career roadmap">
        {milestones.map((item, i) => (
          <li key={`m-${item.title}`} className="relative">
            <span
              className={cn(
                'absolute -left-[33px] top-5 h-4 w-4 rounded-full border-2 border-background',
                item.kind === 'education' ? 'bg-sky' : 'bg-accent',
                i === nowIndex && 'ring-4 ring-accent/25'
              )}
            />
            <Card item={item} isNow={i === nowIndex} />
          </li>
        ))}
      </ol>
    </section>
  )
}
