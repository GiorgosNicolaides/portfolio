'use client'
import { useState } from 'react'

const ROLES = ['admin', 'analyst', 'viewer'] as const
type Role = (typeof ROLES)[number]

const RESOURCES = ['/dashboard', '/audit/log', '/policy/evaluate', '/admin', 'DELETE /users'] as const
type Resource = (typeof RESOURCES)[number]

interface Policy {
  can_access: string[]
  time_restriction: boolean
}

const POLICIES: Record<Role, Policy> = {
  admin: { can_access: ['*'], time_restriction: false },
  analyst: { can_access: ['dashboard', 'audit'], time_restriction: true },
  viewer: { can_access: ['dashboard'], time_restriction: true },
}

// maps a resource path to the capability keyword it requires
const RESOURCE_CAP: Record<Resource, string> = {
  '/dashboard': 'dashboard',
  '/audit/log': 'audit',
  '/policy/evaluate': 'policy',
  '/admin': 'admin',
  'DELETE /users': 'users',
}

function evaluate(role: Role, resource: Resource): { granted: boolean; reason: string } {
  const policy = POLICIES[role]
  const cap = RESOURCE_CAP[resource]
  if (policy.can_access.includes('*')) {
    return { granted: true, reason: `Role "${role}" has wildcard (*) access — all resources permitted.` }
  }
  if (policy.can_access.includes(cap)) {
    return { granted: true, reason: `Role "${role}" can_access includes "${cap}".` }
  }
  return {
    granted: false,
    reason: `Role "${role}" can_access [${policy.can_access.join(', ')}] does not include "${cap}".`,
  }
}

export default function RBACDiagram() {
  const [role, setRole] = useState<Role>('analyst')
  const [resource, setResource] = useState<Resource>('/audit/log')
  const [result, setResult] = useState<{ granted: boolean; reason: string } | null>(null)

  return (
    <div>
      {/* Policy matrix */}
      <div className="overflow-x-auto rounded-lg border border-border-subtle bg-panel p-4">
        <div className="mb-3 font-mono text-xs text-accent">{'// access control matrix'}</div>
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr>
              <th className="border border-border-subtle px-3 py-2 text-left font-mono text-xs text-text-muted">role</th>
              {RESOURCES.map(r => (
                <th key={r} className="border border-border-subtle px-3 py-2 font-mono text-xs text-text-primary">
                  {r}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ROLES.map(r => (
              <tr key={r}>
                <td className="border border-border-subtle px-3 py-2 font-mono text-xs font-semibold text-accent">{r}</td>
                {RESOURCES.map(res => {
                  const allowed = evaluate(r, res).granted
                  return (
                    <td key={res} className="border border-border-subtle px-3 py-2 text-center">
                      {allowed ? (
                        <span className="font-bold text-accent">✓</span>
                      ) : (
                        <span className="font-bold text-danger">✕</span>
                      )}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Policy evaluator */}
        <div className="rounded-lg border border-border-subtle bg-panel p-6">
          <h3 className="mb-4 text-lg font-bold text-text-primary">Policy Evaluator</h3>
          <div className="flex flex-col gap-4 sm:flex-row">
            <label className="flex-1">
              <span className="mb-1 block font-mono text-xs text-text-muted">role</span>
              <select
                value={role}
                onChange={e => {
                  setRole(e.target.value as Role)
                  setResult(null)
                }}
                className="w-full rounded border border-border-subtle bg-background px-3 py-2 font-mono text-sm text-text-primary focus:border-accent focus:outline-none"
              >
                {ROLES.map(r => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex-1">
              <span className="mb-1 block font-mono text-xs text-text-muted">resource</span>
              <select
                value={resource}
                onChange={e => {
                  setResource(e.target.value as Resource)
                  setResult(null)
                }}
                className="w-full rounded border border-border-subtle bg-background px-3 py-2 font-mono text-sm text-text-primary focus:border-accent focus:outline-none"
              >
                {RESOURCES.map(r => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <button
            type="button"
            onClick={() => setResult(evaluate(role, resource))}
            className="mt-4 rounded bg-accent px-4 py-2 font-mono text-sm font-semibold text-background transition-colors hover:bg-accent-dim"
          >
            Evaluate
          </button>

          {result && (
            <div
              className={`mt-5 rounded-lg border p-4 ${
                result.granted ? 'border-accent/50 bg-accent/5' : 'border-danger/50 bg-danger/5'
              }`}
            >
              <div className={`mb-1 font-mono text-lg font-bold ${result.granted ? 'text-accent' : 'text-danger'}`}>
                {result.granted ? 'GRANTED' : 'DENIED'}
              </div>
              <p className="text-sm leading-relaxed text-text-muted">{result.reason}</p>
            </div>
          )}
        </div>

        {/* policies.json */}
        <div className="rounded-lg border border-border-subtle bg-panel p-6">
          <h3 className="mb-4 text-lg font-bold text-text-primary">policies.json</h3>
          <pre className="overflow-x-auto rounded-lg border border-border-subtle bg-background p-4 font-mono text-xs leading-relaxed text-text-primary">
            <code>{`{
  "admin": {
    "can_access": ["*"],
    "time_restriction": false
  },
  "analyst": {
    "can_access": ["dashboard", "audit"],
    "time_restriction": true
  },
  "viewer": {
    "can_access": ["dashboard"],
    "time_restriction": true
  }
}`}</code>
          </pre>
        </div>
      </div>

      {/* Why it matters */}
      <div className="mt-8 rounded-lg border border-l-2 border-border-subtle border-l-accent bg-panel p-6">
        <h3 className="mb-2 font-mono text-sm text-accent">{'// why it matters'}</h3>
        <p className="leading-relaxed text-text-muted">
          RBAC ensures users only access what their role requires — principle of least privilege.
          Combined with time and IP restrictions, it forms the core of Zero Trust access control.
        </p>
      </div>
    </div>
  )
}
