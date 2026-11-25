'use client'
import { useState } from 'react'
import { timeline, type TimelineItem } from '@/data/profile'
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

// The most recent current work role is where the roadmap stands today.
const nowIndex = milestones.reduce((latest, item, i) => (item.kind === 'work' && item.current ? i : latest), -1)

const DESKTOP_PANEL = 'roadmap-details'
const mobilePanel = (i: number) => `roadmap-details-m${i}`

function Card({
  item,
  index,
  selected,
  controls,
  onSelect,
}: {
  item: TimelineItem
  index: number
  selected: boolean
  controls: string
  onSelect: (i: number) => void
}) {
  const Icon = item.kind === 'education' ? CapIcon : BriefcaseIcon
  const isNow = index === nowIndex
  return (
    <button
      type="button"
      onClick={() => onSelect(index)}
      aria-expanded={selected}
      aria-controls={controls}
      className={cn(
        'card card-hover w-full p-4 text-left',
        isNow && 'border-accent/40 bg-accent/5',
        selected && 'border-accent/70 shadow-[0_0_0_1px_rgba(52,211,153,0.35)]'
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <span
          className={cn(
            'grid h-7 w-7 place-items-center rounded-lg',
            item.kind === 'education' ? 'bg-sky/10 text-sky' : 'bg-accent/10 text-accent'
          )}
        >
          <Icon size={14} />
        </span>
        {isNow && <span className="rounded-full bg-accent/15 px-2 py-0.5 font-mono text-[10px] text-accent">Now</span>}
      </div>
      <div className="mt-3 font-mono text-[11px] text-text-muted">{item.period}</div>
      <div className="mt-1 text-sm font-semibold leading-snug text-text-primary">{item.title}</div>
      <div className="mt-0.5 text-xs text-text-muted">{item.org}</div>
    </button>
  )
}

function Details({ item, id }: { item: TimelineItem; id: string }) {
  return (
    <div id={id} role="region" aria-label={`${item.title} details`} className="card p-6">
      <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-text-muted">
        {item.period}
        {item.current && <span className="rounded-full bg-accent/10 px-2 py-0.5 text-[10px] text-accent">Current</span>}
      </div>
      <h3 className="mt-1 text-lg font-semibold text-text-primary">{item.title}</h3>
      <div className="text-sm text-accent">
        {item.org} <span className="text-text-muted">· {item.place}</span>
      </div>
      <ul className="mt-4 space-y-2">
        {item.points.map(pt => (
          <li key={pt} className="flex gap-2 text-sm leading-relaxed text-text-muted">
            <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-accent" />
            {pt}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Roadmap() {
  const [selected, setSelected] = useState(nowIndex >= 0 ? nowIndex : milestones.length - 1)
  const cols = milestones.length

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center gap-5 text-xs text-text-muted">
        <span className="inline-flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-sky" /> Education
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-accent" /> Professional experience
        </span>
        <span className="text-text-muted/80">Select a milestone for details.</span>
      </div>

      {/* Desktop: education above the line, work below, details panel underneath */}
      <div className="hidden lg:block">
        <div
          className="grid"
          style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`, gridTemplateRows: 'auto 56px auto' }}
        >
          {milestones.map((item, i) => (
            <div key={`top-${item.title}`} className="flex flex-col justify-end px-2" style={{ gridColumn: i + 1, gridRow: 1 }}>
              {item.kind === 'education' && (
                <>
                  <Card item={item} index={i} selected={i === selected} controls={DESKTOP_PANEL} onSelect={setSelected} />
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
                  <button
                    type="button"
                    onClick={() => setSelected(i)}
                    aria-label={`Show ${item.title}`}
                    className={cn(
                      'relative h-4 w-4 rounded-full border-2 border-background transition-transform hover:scale-125',
                      item.kind === 'education' ? 'bg-sky' : 'bg-accent',
                      i === nowIndex && 'ring-4 ring-accent/25',
                      i === selected && 'scale-125'
                    )}
                  >
                    {i === nowIndex && <span className="absolute inset-0 animate-ping rounded-full bg-accent opacity-50" />}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {milestones.map((item, i) => (
            <div key={`bottom-${item.title}`} className="flex flex-col px-2" style={{ gridColumn: i + 1, gridRow: 3 }}>
              {item.kind === 'work' && (
                <>
                  <span className="mx-auto h-4 w-px bg-accent/50" />
                  <Card item={item} index={i} selected={i === selected} controls={DESKTOP_PANEL} onSelect={setSelected} />
                </>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 px-2">
          <Details item={milestones[selected]} id={DESKTOP_PANEL} />
        </div>
      </div>

      {/* Mobile / tablet: vertical roadmap, details open under the chosen milestone */}
      <ol className="relative space-y-5 border-l-2 border-border-subtle pl-6 lg:hidden">
        {milestones.map((item, i) => (
          <li key={`m-${item.title}`} className="relative">
            <span
              className={cn(
                'absolute -left-[33px] top-5 h-4 w-4 rounded-full border-2 border-background',
                item.kind === 'education' ? 'bg-sky' : 'bg-accent',
                i === nowIndex && 'ring-4 ring-accent/25'
              )}
            />
            <Card item={item} index={i} selected={i === selected} controls={mobilePanel(i)} onSelect={setSelected} />
            {i === selected && (
              <div className="mt-3">
                <Details item={item} id={mobilePanel(i)} />
              </div>
            )}
          </li>
        ))}
      </ol>
    </div>
  )
}
