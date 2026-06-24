'use client'
import { useEffect, useState } from 'react'

interface Check {
  name: string
  pass: boolean
  detail: string
  weight: number
}

interface ServicePanel {
  service: string
  checks: Check[]
}

const PANELS: ServicePanel[] = [
  {
    service: 'S3',
    checks: [
      { name: 'Public ACL', pass: false, detail: 'Bucket grants AllUsers read access', weight: 10 },
      { name: 'Encryption', pass: false, detail: 'No default SSE configured', weight: 6 },
      { name: 'Versioning', pass: false, detail: 'Versioning disabled', weight: 4 },
      { name: 'Logging', pass: false, detail: 'Access logging not enabled', weight: 4 },
      { name: 'Block Public Access', pass: false, detail: 'Not fully enabled', weight: 8 },
    ],
  },
  {
    service: 'IAM',
    checks: [
      { name: 'Root Access Keys', pass: false, detail: 'Active root keys detected — CIS 1.4 CRITICAL', weight: 12 },
      { name: 'MFA Enabled', pass: false, detail: '2 users without MFA', weight: 8 },
      { name: 'Admin Policy', pass: false, detail: '1 user with AdministratorAccess', weight: 8 },
      { name: 'Password Policy', pass: false, detail: 'Min length 6, no complexity', weight: 4 },
      { name: 'Inline Policies', pass: false, detail: '1 user with inline policy', weight: 3 },
    ],
  },
  {
    service: 'Security Groups',
    checks: [
      { name: 'SSH Open', pass: false, detail: '0.0.0.0/0 on port 22 — CIS 5.2 CRITICAL', weight: 12 },
      { name: 'RDP Open', pass: false, detail: '0.0.0.0/0 on port 3389 — CIS 5.3 CRITICAL', weight: 10 },
      { name: 'Unrestricted Inbound', pass: false, detail: 'Wide open inbound rule', weight: 6 },
      { name: 'Unrestricted Outbound', pass: true, detail: 'Outbound restricted', weight: 0 },
    ],
  },
]

const ALL_FINDINGS = PANELS.flatMap(p =>
  p.checks.map(c => ({ ...c, service: p.service })),
).filter(c => !c.pass)

const TARGET_SCORE = 85
const TOTAL_CHECKS = PANELS.reduce((n, p) => n + p.checks.length, 0)

export default function CloudAuditDiagram() {
  const [revealed, setRevealed] = useState(0)
  const [running, setRunning] = useState(false)
  const [score, setScore] = useState(0)

  useEffect(() => {
    if (!running) return
    if (revealed >= TOTAL_CHECKS) {
      setRunning(false)
      return
    }
    const t = setTimeout(() => setRevealed(r => r + 1), 350)
    return () => clearTimeout(t)
  }, [running, revealed])

  // animate the risk score toward the proportion revealed
  useEffect(() => {
    const target = Math.round((revealed / TOTAL_CHECKS) * TARGET_SCORE)
    if (score === target) return
    const t = setTimeout(() => setScore(s => (s < target ? s + 1 : s)), 15)
    return () => clearTimeout(t)
  }, [revealed, score])

  const run = () => {
    setRevealed(0)
    setScore(0)
    setRunning(true)
  }

  let idx = 0
  const done = revealed >= TOTAL_CHECKS

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center gap-6 rounded-lg border border-border-subtle bg-panel p-4">
        <button
          type="button"
          onClick={run}
          className="rounded bg-accent px-4 py-2 font-mono text-sm font-semibold text-background transition-colors hover:bg-accent-dim"
        >
          {running ? 'Auditing…' : 'Run Audit'}
        </button>
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-text-muted">Risk Score</span>
          <span className="font-mono text-3xl font-bold text-danger">{score}</span>
          <span className="font-mono text-sm text-text-muted">/ 100</span>
        </div>
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-background">
          <div
            className="h-full rounded-full bg-danger transition-all duration-300"
            style={{ width: `${score}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {PANELS.map(panel => (
          <div key={panel.service} className="rounded-lg border border-border-subtle bg-panel p-4">
            <div className="mb-3 font-mono text-sm font-semibold text-accent">{panel.service}</div>
            <div className="flex flex-col gap-2">
              {panel.checks.map(c => {
                const myIdx = idx++
                const shown = myIdx < revealed
                return (
                  <div
                    key={c.name}
                    className={`rounded border p-2 transition-opacity ${
                      shown ? 'opacity-100' : 'opacity-20'
                    } ${c.pass ? 'border-accent/40 bg-accent/5' : 'border-danger/40 bg-danger/5'}`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-semibold text-text-primary">{c.name}</span>
                      <span className={`font-mono text-xs font-bold ${c.pass ? 'text-accent' : 'text-danger'}`}>
                        {c.pass ? 'PASS' : 'FAIL'}
                      </span>
                    </div>
                    <p className="mt-1 text-xs leading-snug text-text-muted">{c.detail}</p>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Remediation priority */}
      {done && (
        <div className="mt-8 rounded-lg border border-border-subtle bg-panel p-6 animate-fadeIn">
          <h3 className="mb-4 text-lg font-bold text-text-primary">Remediation Priority</h3>
          <ol className="flex flex-col gap-2">
            {[...ALL_FINDINGS]
              .sort((a, b) => b.weight - a.weight)
              .map((f, i) => (
                <li
                  key={`${f.service}-${f.name}`}
                  className="flex items-center justify-between gap-3 rounded border border-border-subtle px-3 py-2"
                >
                  <span className="text-sm text-text-primary">
                    <span className="font-mono text-xs text-text-muted">{i + 1}.</span> {f.service} — {f.name}
                  </span>
                  <span
                    className={`font-mono text-xs font-bold ${
                      f.weight >= 10 ? 'text-danger' : f.weight >= 6 ? 'text-warning' : 'text-text-muted'
                    }`}
                  >
                    {f.weight >= 10 ? 'CRITICAL' : f.weight >= 6 ? 'HIGH' : 'MEDIUM'}
                  </span>
                </li>
              ))}
          </ol>
        </div>
      )}

      {/* Why it matters */}
      <div className="mt-8 rounded-lg border border-l-2 border-border-subtle border-l-accent bg-panel p-6">
        <h3 className="mb-2 font-mono text-sm text-accent">{'// why it matters'}</h3>
        <p className="leading-relaxed text-text-muted">
          CIS Benchmarks are the industry standard for cloud security posture. These misconfiguration
          patterns are responsible for the majority of cloud data breaches — open S3 buckets and
          unrestricted Security Groups top the list every year.
        </p>
      </div>
    </div>
  )
}
