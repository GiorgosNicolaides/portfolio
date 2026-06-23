'use client'
import { useState } from 'react'
import Link from 'next/link'

interface Decision {
  id: string
  label: string
  cy: number
  deny: string
  branch: string
}

const MAIN_X = 170
const DENY_X = 450
const HW = 80
const HH = 42

const DECISIONS: Decision[] = [
  { id: 'valid-jwt', label: 'Valid JWT?', cy: 150, deny: '401 Unauthorized', branch: 'No' },
  { id: 'token-revoked', label: 'Token Revoked?', cy: 280, deny: '401 Revoked', branch: 'Yes' },
  { id: 'role-permitted', label: 'Role Permitted?', cy: 410, deny: '403 Forbidden', branch: 'No' },
  { id: 'time-ok', label: 'Time of Day OK?', cy: 540, deny: '403 Time Restricted', branch: 'No' },
  { id: 'ip-trusted', label: 'IP Trusted?', cy: 670, deny: '403 Untrusted Network', branch: 'No' },
]

const LOG_Y = 770
const GRANT_Y = 840

const INFO: Record<string, { title: string; explanation: string }> = {
  incoming: {
    title: 'Incoming Request',
    explanation:
      'Every request entering the system starts here. Under Zero Trust it must pass every gate below before any access is granted — there is no trusted shortcut.',
  },
  'valid-jwt': {
    title: 'Valid JWT?',
    explanation:
      'Every request must carry a signed JWT. The server verifies the signature against the secret — an expired or tampered token is rejected immediately.',
  },
  'token-revoked': {
    title: 'Token Revoked?',
    explanation:
      'Even valid JWTs can be revoked. The server checks a denylist (backed by SQLite in the Zero Trust project) to catch logged-out tokens.',
  },
  'role-permitted': {
    title: 'Role Permitted?',
    explanation:
      'RBAC — the user’s role is checked against the policy config. Admin, Analyst, and Viewer roles have different access levels.',
  },
  'time-ok': {
    title: 'Time of Day OK?',
    explanation:
      'Contextual access control. Analysts can only access the system during business hours (08:00–18:00). Outside that window, access is denied.',
  },
  'ip-trusted': {
    title: 'IP Trusted?',
    explanation:
      'Network origin is evaluated against a CIDR allowlist. Even an admin from an untrusted IP range is denied — true Zero Trust.',
  },
  log: {
    title: 'Log Decision',
    explanation:
      'Every decision, granted or denied, is written to the audit log with reason, timestamp, and IP. Nothing is silent.',
  },
  grant: {
    title: 'Grant Access',
    explanation: 'All checks passed. Request is allowed and the response is returned.',
  },
}

function diamondPoints(cy: number): string {
  return `${MAIN_X},${cy - HH} ${MAIN_X + HW},${cy} ${MAIN_X},${cy + HH} ${MAIN_X - HW},${cy}`
}

export default function ZeroTrustDiagram() {
  const [selected, setSelected] = useState('valid-jwt')
  const info = INFO[selected]

  const sel = (id: string) => (selected === id ? '#00ff88' : '')
  const selW = (id: string) => (selected === id ? 2.5 : 1.5)

  const passSegments = [
    { y1: 192, y2: 238 },
    { y1: 322, y2: 368 },
    { y1: 452, y2: 498 },
    { y1: 582, y2: 628 },
    { y1: 712, y2: LOG_Y - 23 },
  ]

  return (
    <div>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Left — flow diagram */}
        <div className="rounded-lg border border-border-subtle bg-panel p-4">
          <svg viewBox="0 0 620 890" className="w-full" role="img" aria-label="Zero Trust policy decision flow">
            <defs>
              <marker id="zt-green" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto">
                <path d="M0,0 L6,3 L0,6 Z" fill="#00cc6a" />
              </marker>
              <marker id="zt-red" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto">
                <path d="M0,0 L6,3 L0,6 Z" fill="#ef4444" />
              </marker>
            </defs>

            {/* Flow connectors (allowed path, downward) */}
            <line x1={MAIN_X} y1={60} x2={MAIN_X} y2={108} stroke="#00cc6a" strokeWidth={1.5} markerEnd="url(#zt-green)" />
            {passSegments.map((s, i) => (
              <g key={i}>
                <line x1={MAIN_X} y1={s.y1} x2={MAIN_X} y2={s.y2} stroke="#00cc6a" strokeWidth={1.5} markerEnd="url(#zt-green)" />
                <text x={MAIN_X + 10} y={(s.y1 + s.y2) / 2 + 3} fontSize={10} fontFamily="monospace" fill="#00cc6a">
                  ✓
                </text>
              </g>
            ))}
            <line x1={MAIN_X} y1={LOG_Y + 23} x2={MAIN_X} y2={GRANT_Y - 23} stroke="#00cc6a" strokeWidth={1.5} markerEnd="url(#zt-green)" />

            {/* Start node */}
            <g className="cursor-pointer" onClick={() => setSelected('incoming')}>
              <rect
                x={MAIN_X - 90}
                y={20}
                width={180}
                height={40}
                rx={20}
                fill="rgba(59,130,246,0.12)"
                stroke={sel('incoming') || '#3b82f6'}
                strokeWidth={selW('incoming')}
              />
              <text x={MAIN_X} y={45} textAnchor="middle" fontSize={12} fontFamily="monospace" fill="#bfdbfe">
                Incoming Request
              </text>
            </g>

            {/* Decisions + deny branches */}
            {DECISIONS.map(d => (
              <g key={d.id}>
                {/* deny branch */}
                <line x1={MAIN_X + HW} y1={d.cy} x2={DENY_X - 75} y2={d.cy} stroke="#ef4444" strokeWidth={1.5} markerEnd="url(#zt-red)" />
                <text x={(MAIN_X + HW + DENY_X - 75) / 2} y={d.cy - 6} textAnchor="middle" fontSize={10} fontFamily="monospace" fill="#ef4444">
                  {d.branch}
                </text>
                <rect
                  x={DENY_X - 75}
                  y={d.cy - 23}
                  width={150}
                  height={46}
                  rx={6}
                  fill="rgba(239,68,68,0.12)"
                  stroke="#ef4444"
                  strokeWidth={1.5}
                />
                <text x={DENY_X} y={d.cy + 4} textAnchor="middle" fontSize={10.5} fontFamily="monospace" fill="#fca5a5">
                  {d.deny}
                </text>

                {/* decision diamond */}
                <g className="cursor-pointer" onClick={() => setSelected(d.id)}>
                  <polygon
                    points={diamondPoints(d.cy)}
                    fill="rgba(245,158,11,0.10)"
                    stroke={sel(d.id) || '#f59e0b'}
                    strokeWidth={selW(d.id)}
                  />
                  <text x={MAIN_X} y={d.cy + 4} textAnchor="middle" fontSize={11} fontFamily="monospace" fill="#e2e8f0">
                    {d.label}
                  </text>
                </g>
              </g>
            ))}

            {/* Log Decision */}
            <g className="cursor-pointer" onClick={() => setSelected('log')}>
              <rect
                x={MAIN_X - 80}
                y={LOG_Y - 23}
                width={160}
                height={46}
                rx={6}
                fill="rgba(0,255,136,0.08)"
                stroke={sel('log') || '#00cc6a'}
                strokeWidth={selW('log')}
              />
              <text x={MAIN_X} y={LOG_Y + 4} textAnchor="middle" fontSize={11} fontFamily="monospace" fill="#e2e8f0">
                Log Decision
              </text>
            </g>

            {/* Grant Access */}
            <g className="cursor-pointer" onClick={() => setSelected('grant')}>
              <rect
                x={MAIN_X - 90}
                y={GRANT_Y - 23}
                width={180}
                height={46}
                rx={20}
                fill="rgba(0,255,136,0.14)"
                stroke={sel('grant') || '#00ff88'}
                strokeWidth={selW('grant')}
              />
              <text x={MAIN_X} y={GRANT_Y + 4} textAnchor="middle" fontSize={12} fontFamily="monospace" fontWeight="bold" fill="#00ff88">
                Grant Access
              </text>
            </g>
          </svg>

          <p className="mt-2 text-center font-mono text-xs text-text-muted">
            Click any node to see what it checks.
          </p>
        </div>

        {/* Right — explanation */}
        <div className="rounded-lg border border-border-subtle bg-panel p-6">
          <div className="mb-2 font-mono text-xs text-accent">{'// policy gate'}</div>
          <h3 className="mb-3 text-xl font-bold text-text-primary">{info.title}</h3>
          <p className="leading-relaxed text-text-muted">{info.explanation}</p>
        </div>
      </div>

      {/* Callout */}
      <div className="mt-8 rounded-lg border border-l-2 border-border-subtle border-l-accent bg-panel p-6">
        <h3 className="mb-2 font-mono text-sm text-accent">{'// why it matters'}</h3>
        <p className="leading-relaxed text-text-muted">
          Zero Trust means no implicit trust — every request is fully evaluated regardless of
          network location or previous authentication. This flow is implemented in the{' '}
          <Link href="/projects/zero-trust-dashboard" className="font-mono text-accent transition-colors hover:text-accent-dim">
            Zero Trust Identity Dashboard
          </Link>{' '}
          project.
        </p>
      </div>
    </div>
  )
}
