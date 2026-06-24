'use client'
import { useEffect, useState } from 'react'

interface Stage {
  name: string
  output: string
}

const STAGES: Stage[] = [
  { name: 'Raw Logs', output: 'Dec 10 06:55:46 LabSZ sshd[24200]: Failed password\nfor root from 173.234.31.186' },
  { name: 'Format Detection', output: 'Detected: auth.log format' },
  {
    name: 'Parsing',
    output: `{
  timestamp: "2005-12-10 06:55:46",
  hostname: "LabSZ",
  process: "sshd",
  is_failure: true,
  is_root_attempt: true,
  ip: "173.234.31.186"
}`,
  },
  { name: 'Feature Extraction', output: '[hour=6, is_failure=1, failures_per_ip=12,\n is_root=1, is_new_ip=1]' },
  { name: 'IsolationForest', output: 'anomaly_score: -0.34\n(threshold: -0.10) → ANOMALOUS' },
  {
    name: 'Alert Generation',
    output: `{
  severity: "CRITICAL",
  reason: "Root login attempt; Brute force
           pattern from IP 173.234.31.186",
  score: -0.34
}`,
  },
]

export default function LogAnomalyDiagram() {
  const [active, setActive] = useState(-1)
  const [running, setRunning] = useState(false)

  useEffect(() => {
    if (!running) return
    if (active >= STAGES.length - 1) {
      setRunning(false)
      return
    }
    const t = setTimeout(() => setActive(a => a + 1), 900)
    return () => clearTimeout(t)
  }, [running, active])

  const run = () => {
    setActive(0)
    setRunning(true)
  }

  return (
    <div>
      {/* Pipeline flow */}
      <div className="rounded-lg border border-border-subtle bg-panel p-4">
        <div className="flex flex-col items-stretch gap-3 lg:flex-row lg:items-center">
          {STAGES.map((s, i) => {
            const on = i <= active
            return (
              <div key={s.name} className="flex items-center gap-3 lg:flex-1 lg:flex-col">
                <div
                  className={`flex-1 rounded-lg border px-3 py-3 text-center font-mono text-xs transition-colors lg:w-full ${
                    on
                      ? 'border-accent bg-accent/10 text-accent'
                      : 'border-border-subtle text-text-muted'
                  } ${i === active ? 'animate-pulse' : ''}`}
                >
                  {s.name}
                </div>
                {i < STAGES.length - 1 && (
                  <span className={`font-mono ${on ? 'text-accent' : 'text-text-muted'}`}>
                    <span className="hidden lg:inline">→</span>
                    <span className="lg:hidden">↓</span>
                  </span>
                )}
              </div>
            )
          })}
        </div>
        <button
          type="button"
          onClick={run}
          className="mt-5 rounded bg-accent px-4 py-2 font-mono text-sm font-semibold text-background transition-colors hover:bg-accent-dim"
        >
          {running ? 'Running…' : 'Run Pipeline'}
        </button>
      </div>

      {/* Stage outputs */}
      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {STAGES.map((s, i) => {
          const on = i <= active
          return (
            <div
              key={s.name}
              className={`rounded-lg border bg-panel p-4 transition-opacity ${
                on ? 'border-accent/40 opacity-100' : 'border-border-subtle opacity-40'
              }`}
            >
              <div className="mb-2 font-mono text-xs text-accent">{s.name}</div>
              <pre className="overflow-x-auto whitespace-pre-wrap font-mono text-xs leading-relaxed text-text-primary">
                <code>{s.output}</code>
              </pre>
            </div>
          )
        })}
      </div>

      {/* Why it matters */}
      <div className="mt-8 rounded-lg border border-l-2 border-border-subtle border-l-accent bg-panel p-6">
        <h3 className="mb-2 font-mono text-sm text-accent">{'// why it matters'}</h3>
        <p className="leading-relaxed text-text-muted">
          Isolation Forest detects anomalies without labeled training data — it isolates outliers by
          randomly partitioning features. A score below -0.1 indicates an anomaly; below -0.2 is critical.
        </p>
      </div>
    </div>
  )
}
