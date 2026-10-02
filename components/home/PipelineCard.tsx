'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const stages = [
  { name: 'checkout', detail: 'actions/checkout@v4', tool: 'GitHub Actions' },
  { name: 'unit tests', detail: 'pytest -q', tool: 'pytest' },
  { name: 'ai review', detail: 'custom review skills', tool: 'Claude Code' },
  { name: 'sast', detail: '30+ CWE rules', tool: 'COVSAW' },
  { name: 'dependency scan', detail: 'OSV.dev · PyPI · npm · Go · Cargo', tool: 'devsecops-scanner' },
  { name: 'secret scan', detail: 'redacted findings', tool: 'devsecops-scanner' },
  { name: 'build image', detail: 'non-root · push ghcr.io', tool: 'Docker' },
  { name: 'cloud posture', detail: 'CIS AWS 14 controls', tool: 'cloud-auditor' },
  { name: 'deploy', detail: 'kubectl apply · TLS ingress', tool: 'Kubernetes' },
  { name: 'monitor', detail: 'Isolation Forest on auth logs', tool: 'threat-engine' },
]

export default function PipelineCard() {
  const [done, setDone] = useState(0)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setDone(stages.length)
      return
    }
    if (done < stages.length) {
      const t = setTimeout(() => setDone(d => d + 1), done === 0 ? 500 : 380)
      return () => clearTimeout(t)
    }
    const reset = setTimeout(() => setDone(0), 6000)
    return () => clearTimeout(reset)
  }, [done])

  const finished = done >= stages.length

  return (
    <div className="card overflow-hidden shadow-2xl shadow-black/40">
      <div className="flex items-center justify-between border-b border-border-subtle bg-panel-2 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-danger/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-warning/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-accent/70" />
          <span className="ml-3 font-mono text-xs text-text-muted">secure-delivery.yml</span>
        </div>
        <span
          className={cn(
            'rounded-full px-2 py-0.5 font-mono text-[11px]',
            finished ? 'bg-accent/15 text-accent' : 'bg-warning/15 text-warning'
          )}
        >
          {finished ? '✓ passed' : '● running'}
        </span>
      </div>

      <ol className="space-y-1 p-4 font-mono text-[13px]">
        {stages.map((s, i) => {
          const state = i < done ? 'done' : i === done ? 'running' : 'pending'
          return (
            <li
              key={s.name}
              className={cn(
                'flex items-center gap-3 rounded-md px-2 py-1.5 transition-colors',
                state === 'running' && 'bg-warning/5'
              )}
            >
              <span
                className={cn(
                  'grid h-5 w-5 shrink-0 place-items-center rounded-full border text-[10px]',
                  state === 'done' && 'border-accent/50 bg-accent/15 text-accent',
                  state === 'running' && 'animate-pulse border-warning/60 text-warning',
                  state === 'pending' && 'border-border-subtle text-text-muted/50'
                )}
              >
                {state === 'done' ? '✓' : state === 'running' ? '•' : ''}
              </span>
              <span className={cn('w-32 shrink-0', state === 'pending' ? 'text-text-muted/60' : 'text-text-primary')}>
                {s.name}
              </span>
              <span className="hidden truncate text-text-muted sm:block">{s.detail}</span>
              <span className="ml-auto shrink-0 rounded border border-border-subtle px-1.5 py-0.5 text-[10px] text-sky/80">
                {s.tool}
              </span>
            </li>
          )
        })}
      </ol>

      <div className="border-t border-border-subtle bg-panel-2 px-4 py-2.5 font-mono text-[11px] text-text-muted">
        Each stage maps to one of my projects or tools I use. See the{' '}
        <Link href="/projects" className="text-accent hover:underline">
          projects
        </Link>
        .
      </div>
    </div>
  )
}
