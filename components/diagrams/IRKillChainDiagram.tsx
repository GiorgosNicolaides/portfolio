'use client'
import { useState } from 'react'

interface Phase {
  attack: string
  technique: string
  response: string
}

const PHASES: Phase[] = [
  { attack: 'Initial Access', technique: 'T1566 — Phishing', response: 'Isolate endpoint, reset credentials' },
  { attack: 'Execution', technique: 'T1059 — Command Scripting', response: 'Kill malicious processes, collect memory dump' },
  { attack: 'Persistence', technique: 'T1053 — Scheduled Tasks', response: 'Audit scheduled tasks, remove persistence' },
  { attack: 'Privilege Escalation', technique: 'T1068 — Exploitation', response: 'Revoke elevated tokens, audit sudo logs' },
  { attack: 'Lateral Movement', technique: 'T1021 — Remote Services', response: 'Segment network, block lateral paths' },
  { attack: 'Collection', technique: 'T1083 — File Discovery', response: 'Identify blast radius, classify data' },
  { attack: 'Exfiltration', technique: 'T1048 — Over Alt Protocol', response: 'Block outbound, preserve logs, notify DPO' },
]

export default function IRKillChainDiagram() {
  const [selected, setSelected] = useState(0)

  return (
    <div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Attack phases */}
        <div className="rounded-lg border border-border-subtle bg-panel p-4">
          <div className="mb-3 font-mono text-xs text-danger">{'// attack — MITRE ATT&CK'}</div>
          <div className="flex flex-col gap-2">
            {PHASES.map((p, i) => {
              const active = i === selected
              return (
                <button
                  key={p.attack}
                  type="button"
                  onClick={() => setSelected(i)}
                  className={`rounded border px-4 py-3 text-left transition-colors ${
                    active ? 'border-danger bg-danger/10' : 'border-border-subtle hover:border-danger/50'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-semibold text-text-primary">
                      {i + 1}. {p.attack}
                    </span>
                    <span className="font-mono text-xs text-danger">{p.technique}</span>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* IR responses */}
        <div className="rounded-lg border border-border-subtle bg-panel p-4">
          <div className="mb-3 font-mono text-xs text-accent">{'// incident response'}</div>
          <div className="flex flex-col gap-2">
            {PHASES.map((p, i) => {
              const active = i === selected
              return (
                <div
                  key={p.attack}
                  className={`rounded border px-4 py-3 transition-colors ${
                    active ? 'border-accent bg-accent/10' : 'border-border-subtle opacity-50'
                  }`}
                >
                  <span className="text-sm text-text-primary">
                    {i + 1}. {p.response}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Scoring rubric */}
      <div className="mt-8 rounded-lg border border-border-subtle bg-panel p-6">
        <h3 className="mb-4 text-lg font-bold text-text-primary">IR Simulator — Scoring Rubric</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded border border-accent/40 bg-accent/5 p-4">
            <div className="font-mono text-2xl font-bold text-accent">+10</div>
            <div className="text-sm text-text-muted">Best response</div>
          </div>
          <div className="rounded border border-warning/40 bg-warning/5 p-4">
            <div className="font-mono text-2xl font-bold text-warning">+2 … +7</div>
            <div className="text-sm text-text-muted">Partial response</div>
          </div>
          <div className="rounded border border-danger/40 bg-danger/5 p-4">
            <div className="font-mono text-2xl font-bold text-danger">-5 … -10</div>
            <div className="text-sm text-text-muted">No action / wrong action</div>
          </div>
        </div>
      </div>

      {/* Why it matters */}
      <div className="mt-8 rounded-lg border border-l-2 border-border-subtle border-l-accent bg-panel p-6">
        <h3 className="mb-2 font-mono text-sm text-accent">{'// why it matters'}</h3>
        <p className="leading-relaxed text-text-muted">
          The IR kill chain maps attacker techniques (MITRE ATT&amp;CK) to defender responses. Speed at
          each phase determines dwell time — the longer an attacker persists, the more damage they can do.
        </p>
      </div>
    </div>
  )
}
