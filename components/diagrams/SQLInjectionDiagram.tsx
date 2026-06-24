'use client'
import { useState } from 'react'

interface Payload {
  label: string
  value: string
  result: string
}

const PAYLOADS: Payload[] = [
  { label: 'Classic', value: "admin' OR '1'='1", result: 'Returns all rows — OR \'1\'=\'1\' is always true. Logged in as the first user (admin).' },
  { label: 'Comment', value: "admin'--", result: 'The -- comments out the password check entirely. Authenticated as admin without a password.' },
  { label: 'Union', value: "' UNION SELECT username,password FROM users--", result: 'UNION appends attacker-controlled rows — dumps every username and password hash.' },
]

export default function SQLInjectionDiagram() {
  const [username, setUsername] = useState("admin' OR '1'='1")
  const [password] = useState('anything')
  const [payloadResult, setPayloadResult] = useState(PAYLOADS[0].result)

  const vulnerableQuery = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`

  return (
    <div>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Attack lab */}
        <div className="rounded-lg border border-danger/40 bg-panel p-6">
          <div className="mb-4 font-mono text-xs text-danger">{'// attack lab — vulnerable'}</div>
          <label className="mb-2 block">
            <span className="mb-1 block font-mono text-xs text-text-muted">username</span>
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              className="w-full rounded border border-border-subtle bg-background px-3 py-2 font-mono text-sm text-text-primary focus:border-danger focus:outline-none"
            />
          </label>
          <label className="mb-4 block">
            <span className="mb-1 block font-mono text-xs text-text-muted">password</span>
            <input
              type="text"
              value={password}
              readOnly
              className="w-full rounded border border-border-subtle bg-background px-3 py-2 font-mono text-sm text-text-muted focus:outline-none"
            />
          </label>

          <div className="mb-2 font-mono text-xs text-text-muted">query built by string concatenation:</div>
          <pre className="mb-4 overflow-x-auto whitespace-pre-wrap rounded-lg border border-danger/40 bg-background p-3 font-mono text-xs leading-relaxed text-danger">
            <code>{vulnerableQuery}</code>
          </pre>

          <div className="rounded-lg border border-danger/50 bg-danger/5 p-3 text-center font-mono text-sm font-bold text-danger">
            Login successful as admin ← VULNERABLE
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {PAYLOADS.map(p => (
              <button
                key={p.label}
                type="button"
                onClick={() => {
                  setUsername(p.value)
                  setPayloadResult(p.result)
                }}
                className="rounded border border-danger/50 px-3 py-1.5 font-mono text-xs text-danger transition-colors hover:bg-danger/10"
              >
                Try: {p.label}
              </button>
            ))}
          </div>
          <p className="mt-3 text-sm leading-relaxed text-text-muted">{payloadResult}</p>
        </div>

        {/* Defense */}
        <div className="rounded-lg border border-accent/40 bg-panel p-6">
          <div className="mb-4 font-mono text-xs text-accent">{'// defense — parameterized'}</div>
          <pre className="mb-4 overflow-x-auto rounded-lg border border-accent/40 bg-background p-3 font-mono text-xs leading-relaxed text-text-primary">
            <code>{`const query =
  "SELECT * FROM users
   WHERE username = ?
   AND password = ?"

db.prepare(query)
  .get(username, hashedPassword)`}</code>
          </pre>
          <p className="mb-4 text-sm leading-relaxed text-text-muted">
            <span className="text-accent">?</span> placeholders are never interpreted as SQL — the database
            treats them as literal data, not code.
          </p>
          <div className="flex flex-col gap-2">
            {[
              ['Input validation', 'Whitelist allowed characters and formats'],
              ['Least privilege', 'DB user has only the rights it needs — no DROP/GRANT'],
              ['WAF rules', 'Block known injection signatures at the edge'],
            ].map(([t, d]) => (
              <div key={t} className="rounded border border-border-subtle p-3">
                <div className="text-sm font-semibold text-accent">{t}</div>
                <p className="text-xs text-text-muted">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Why it matters */}
      <div className="mt-8 rounded-lg border border-l-2 border-border-subtle border-l-accent bg-panel p-6">
        <h3 className="mb-2 font-mono text-sm text-accent">{'// why it matters'}</h3>
        <p className="leading-relaxed text-text-muted">
          SQL injection has been in the OWASP Top 10 for over a decade. It is trivially exploitable in
          unparameterized queries and can lead to complete database compromise, data exfiltration, and
          authentication bypass.
        </p>
      </div>
    </div>
  )
}
