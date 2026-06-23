'use client'
import { Fragment, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

type Status = 'pending' | 'running' | 'passed' | 'warning' | 'failed'

interface Stage {
  name: string
  result: Exclude<Status, 'pending' | 'running'>
}

const STAGES: Stage[] = [
  { name: 'Code Commit', result: 'passed' },
  { name: 'Secret Scan', result: 'passed' },
  { name: 'Dependency CVE Check', result: 'passed' },
  { name: 'SAST (Static Analysis)', result: 'passed' },
  { name: 'Build & Test', result: 'passed' },
  { name: 'Container Scan', result: 'warning' },
  { name: 'Deploy to Staging', result: 'passed' },
  { name: 'DAST (Dynamic Analysis)', result: 'passed' },
  { name: 'Deploy to Production', result: 'passed' },
]

interface ReportItem {
  stage: number
  label: string
  value: string
  tone: 'ok' | 'warn'
  fix?: boolean
}

const REPORT: ReportItem[] = [
  { stage: 1, label: 'Secrets', value: 'None found ✓', tone: 'ok' },
  { stage: 2, label: 'Dependencies', value: '0 critical, 2 high CVEs', tone: 'warn', fix: true },
  { stage: 3, label: 'SAST', value: 'No issues ✓', tone: 'ok' },
  { stage: 5, label: 'Container', value: '2 medium CVEs (informational)', tone: 'warn' },
  { stage: 7, label: 'DAST', value: 'No vulnerabilities ✓', tone: 'ok' },
]

const STATUS_STYLES: Record<Status, { box: string; dot: string; label: string }> = {
  pending: { box: 'border-border-subtle text-text-muted', dot: 'bg-text-muted', label: 'Pending' },
  running: { box: 'border-warning text-warning animate-pulse', dot: 'bg-warning', label: 'Running' },
  passed: { box: 'border-accent/50 text-accent', dot: 'bg-accent', label: 'Passed' },
  warning: { box: 'border-warning text-warning', dot: 'bg-warning', label: 'Warning' },
  failed: { box: 'border-danger text-danger', dot: 'bg-danger', label: 'Failed' },
}

export default function DevSecOpsDiagram() {
  const [statuses, setStatuses] = useState<Status[]>(Array(STAGES.length).fill('pending'))
  const [active, setActive] = useState(false)
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])

  const clearTimers = () => {
    timers.current.forEach(clearTimeout)
    timers.current = []
  }

  useEffect(() => clearTimers, [])

  const reset = () => {
    clearTimers()
    setStatuses(Array(STAGES.length).fill('pending'))
    setActive(false)
  }

  const run = () => {
    clearTimers()
    setStatuses(Array(STAGES.length).fill('pending'))
    setActive(true)

    let i = 0
    const advance = () => {
      if (i >= STAGES.length) {
        setActive(false)
        return
      }
      const index = i
      setStatuses(prev => {
        const next = [...prev]
        next[index] = 'running'
        return next
      })
      const t1 = setTimeout(() => {
        setStatuses(prev => {
          const next = [...prev]
          next[index] = STAGES[index].result
          return next
        })
        i++
        const t2 = setTimeout(advance, 300)
        timers.current.push(t2)
      }, 650)
      timers.current.push(t1)
    }
    advance()
  }

  return (
    <div>
      {/* Pipeline */}
      <div className="rounded-lg border border-border-subtle bg-panel p-4">
        <div className="flex items-stretch gap-2 overflow-x-auto pb-2">
          {STAGES.map((stage, i) => {
            const status = statuses[i]
            const style = STATUS_STYLES[status]
            return (
              <Fragment key={stage.name}>
                <div
                  className={cn(
                    'flex min-w-[150px] flex-1 flex-col justify-between rounded-lg border bg-background p-3 transition-colors',
                    style.box
                  )}
                >
                  <div className="mb-2 flex items-center justify-between">
                    <span className="font-mono text-xs text-text-muted">{i + 1}</span>
                    <span className={cn('h-2 w-2 rounded-full', style.dot)} />
                  </div>
                  <div className="text-xs font-medium leading-snug text-text-primary">{stage.name}</div>
                  <div className="mt-2 font-mono text-[10px] uppercase tracking-wider">{style.label}</div>
                </div>
                {i < STAGES.length - 1 && (
                  <div className="flex items-center text-text-muted" aria-hidden="true">
                    →
                  </div>
                )}
              </Fragment>
            )
          })}
        </div>

        <div className="mt-4 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={run}
            disabled={active}
            className="rounded bg-accent px-4 py-2 font-mono text-sm font-semibold text-background transition-colors hover:bg-accent-dim disabled:cursor-not-allowed disabled:opacity-50"
          >
            {active ? 'Running…' : 'Run Pipeline'}
          </button>
          <button
            type="button"
            onClick={reset}
            className="rounded border border-accent px-4 py-2 font-mono text-sm text-accent transition-colors hover:bg-accent/10"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Security Report */}
      <div className="mt-6 rounded-lg border border-border-subtle bg-panel p-6">
        <h3 className="mb-4 font-mono text-sm text-accent">{'// security report'}</h3>
        <div className="space-y-3">
          {REPORT.map(item => {
            const done = ['passed', 'warning', 'failed'].includes(statuses[item.stage])
            return (
              <div
                key={item.label}
                className={cn(
                  'flex flex-wrap items-center justify-between gap-2 border-b border-border-subtle pb-3 transition-opacity last:border-0 last:pb-0',
                  done ? 'opacity-100' : 'opacity-40'
                )}
              >
                <span className="font-mono text-sm text-text-primary">{item.label}</span>
                {done ? (
                  <span
                    className={cn(
                      'font-mono text-sm',
                      item.tone === 'ok' ? 'text-accent' : 'text-warning'
                    )}
                  >
                    {item.value}
                    {item.fix && (
                      <>
                        {' → '}
                        <Link
                          href="/projects/devsecops-scanner"
                          className="underline transition-colors hover:text-accent"
                        >
                          link to fix
                        </Link>
                      </>
                    )}
                  </span>
                ) : (
                  <span className="font-mono text-sm text-text-muted">— pending</span>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Callout */}
      <div className="mt-8 rounded-lg border border-l-2 border-border-subtle border-l-accent bg-panel p-6">
        <h3 className="mb-2 font-mono text-sm text-accent">{'// why it matters'}</h3>
        <p className="leading-relaxed text-text-muted">
          Shifting security left means catching vulnerabilities before they reach production. Each
          gate in this pipeline maps to a real tool: truffleHog for secrets, OSV.dev for CVEs,
          Semgrep for SAST.
        </p>
      </div>
    </div>
  )
}
