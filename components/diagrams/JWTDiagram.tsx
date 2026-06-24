'use client'
import { useEffect, useState } from 'react'

interface Step {
  from: number
  to: number
  label: string
  title: string
  explanation: string
  code: string
}

const ACTORS = ['Client', 'Server', 'Database']
const X = [130, 400, 660]

const STEPS: Step[] = [
  {
    from: 0,
    to: 1,
    label: 'POST /login {email, password}',
    title: 'Login Request',
    explanation: 'The client submits credentials over HTTPS to the authentication endpoint.',
    code: `POST /login
Content-Type: application/json

{ "email": "ana@corp.io",
  "password": "••••••••" }`,
  },
  {
    from: 1,
    to: 2,
    label: 'SELECT user WHERE email = ?',
    title: 'Lookup User',
    explanation: 'The server queries the database for the user using a parameterized query.',
    code: `SELECT id, role, password_hash
FROM users
WHERE email = ?  -- bound param`,
  },
  {
    from: 2,
    to: 1,
    label: 'User record + password_hash',
    title: 'User Record Returned',
    explanation: 'The database returns the stored bcrypt hash — never the plaintext password.',
    code: `{ id: "usr_123",
  role: "analyst",
  password_hash: "$2b$12$X…" }`,
  },
  {
    from: 1,
    to: 1,
    label: 'bcrypt.compare(password, hash)',
    title: 'Verify Password',
    explanation: 'bcrypt re-hashes the supplied password with the stored salt and compares constant-time.',
    code: `const ok = await bcrypt.compare(
  password,
  user.password_hash
) // → true | false`,
  },
  {
    from: 1,
    to: 1,
    label: 'jwt.sign({sub, role, jti}, secret)',
    title: 'Sign Token',
    explanation: 'On success the server signs a JWT embedding the subject, role and a unique jti.',
    code: `const token = jwt.sign(
  { sub: user.id, role: user.role,
    jti: crypto.randomUUID() },
  process.env.JWT_SECRET,
  { expiresIn: "1h" }
)`,
  },
  {
    from: 1,
    to: 0,
    label: '200 OK {token: eyJhbG...}',
    title: 'Token Issued',
    explanation: 'The signed token is returned to the client, which stores it for later requests.',
    code: `200 OK
{ "token": "eyJhbGciOiJIUzI1Ni…" }`,
  },
  {
    from: 0,
    to: 1,
    label: 'GET /api/data  Bearer eyJhbG...',
    title: 'Authenticated Request',
    explanation: 'The client attaches the token in the Authorization header on every protected call.',
    code: `GET /api/data
Authorization: Bearer eyJhbGciOiJIU…`,
  },
  {
    from: 1,
    to: 1,
    label: 'jwt.verify(token, secret)',
    title: 'Verify Signature',
    explanation: 'The server recomputes the HMAC signature to confirm the token was not tampered with.',
    code: `const claims = jwt.verify(
  token, process.env.JWT_SECRET
) // throws on bad signature / exp`,
  },
  {
    from: 1,
    to: 1,
    label: 'Check revocation denylist',
    title: 'Revocation Check',
    explanation: 'The jti is checked against a denylist so logged-out or compromised tokens are rejected.',
    code: `if (await denylist.has(claims.jti))
  throw new Error("token revoked")`,
  },
  {
    from: 1,
    to: 0,
    label: '200 OK {protected data}',
    title: 'Protected Data',
    explanation: 'All checks pass — the server returns the protected resource to the client.',
    code: `200 OK
{ "data": [ /* protected */ ] }`,
  },
]

const ARROW_TOP = 96
const GAP = 36

export default function JWTDiagram() {
  const [step, setStep] = useState(0)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    if (!playing) return
    if (step >= STEPS.length - 1) {
      setPlaying(false)
      return
    }
    const t = setTimeout(() => setStep(s => s + 1), 1400)
    return () => clearTimeout(t)
  }, [playing, step])

  const go = (n: number) => {
    setPlaying(false)
    setStep(Math.max(0, Math.min(STEPS.length - 1, n)))
  }
  const playAll = () => {
    setStep(0)
    setPlaying(true)
  }

  const current = STEPS[step]

  return (
    <div>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Left — sequence diagram */}
        <div className="rounded-lg border border-border-subtle bg-panel p-4">
          <svg viewBox="0 0 760 480" className="w-full" role="img" aria-label="JWT authentication sequence diagram">
            <defs>
              <marker id="jwt-ah-accent" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto">
                <path d="M0,0 L6,3 L0,6 Z" fill="#00ff88" />
              </marker>
              <marker id="jwt-ah-muted" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto">
                <path d="M0,0 L6,3 L0,6 Z" fill="#475569" />
              </marker>
            </defs>

            {ACTORS.map((actor, i) => (
              <g key={actor}>
                <rect x={X[i] - 78} y={16} width={156} height={40} rx={6} fill="#0a0e1a" stroke="#1e2d40" />
                <text x={X[i]} y={40} textAnchor="middle" fontSize={12} fontFamily="monospace" fill="#e2e8f0">
                  {actor}
                </text>
                <line x1={X[i]} y1={56} x2={X[i]} y2={460} stroke="#1e2d40" strokeWidth={1} strokeDasharray="4 4" />
              </g>
            ))}

            {STEPS.slice(0, step + 1).map((s, i) => {
              const y = ARROW_TOP + i * GAP
              const active = i === step
              const stroke = active ? '#00ff88' : '#475569'
              const marker = active ? 'url(#jwt-ah-accent)' : 'url(#jwt-ah-muted)'
              const textFill = active ? '#00ff88' : '#64748b'
              if (s.from === s.to) {
                // self arrow loop
                const x = X[s.from]
                return (
                  <g key={i} opacity={active ? 1 : 0.75}>
                    <path
                      d={`M ${x} ${y} h 34 v 14 h -28`}
                      fill="none"
                      stroke={stroke}
                      strokeWidth={active ? 2 : 1.5}
                      markerEnd={marker}
                    />
                    <text x={x + 40} y={y - 4} fontSize={9} fontFamily="monospace" fill={textFill}>
                      {i + 1}. {s.label}
                    </text>
                  </g>
                )
              }
              const fromX = X[s.from]
              const toRight = s.to > s.from
              const toX = toRight ? X[s.to] - 6 : X[s.to] + 6
              const mid = (fromX + toX) / 2
              return (
                <g key={i} opacity={active ? 1 : 0.75}>
                  <line x1={fromX} y1={y} x2={toX} y2={y} stroke={stroke} strokeWidth={active ? 2 : 1.5} markerEnd={marker} />
                  <text x={mid} y={y - 6} textAnchor="middle" fontSize={9} fontFamily="monospace" fill={textFill}>
                    {i + 1}. {s.label}
                  </text>
                </g>
              )
            })}
          </svg>

          <div className="mt-4 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => go(step - 1)}
              disabled={step === 0}
              className="rounded border border-accent px-4 py-2 font-mono text-sm text-accent transition-colors hover:bg-accent/10 disabled:cursor-not-allowed disabled:opacity-40"
            >
              ← Previous
            </button>
            <button
              type="button"
              onClick={() => go(step + 1)}
              disabled={step === STEPS.length - 1}
              className="rounded border border-accent px-4 py-2 font-mono text-sm text-accent transition-colors hover:bg-accent/10 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next →
            </button>
            <button
              type="button"
              onClick={playAll}
              className="rounded bg-accent px-4 py-2 font-mono text-sm font-semibold text-background transition-colors hover:bg-accent-dim"
            >
              {playing ? 'Playing…' : 'Play All'}
            </button>
          </div>
        </div>

        {/* Right — explanation + code */}
        <div className="rounded-lg border border-border-subtle bg-panel p-6">
          <div className="mb-2 font-mono text-xs text-accent">
            STEP {step + 1} / {STEPS.length}
          </div>
          <h3 className="mb-3 text-xl font-bold text-text-primary">{current.title}</h3>
          <p className="mb-5 leading-relaxed text-text-muted">{current.explanation}</p>
          <pre className="overflow-x-auto rounded-lg border border-border-subtle bg-background p-4 font-mono text-xs leading-relaxed text-text-primary">
            <code>{current.code}</code>
          </pre>
        </div>
      </div>

      {/* JWT structure decoded */}
      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-lg border border-border-subtle bg-panel p-4">
          <div className="mb-2 font-mono text-xs text-accent">HEADER</div>
          <pre className="overflow-x-auto font-mono text-xs leading-relaxed text-text-primary">
            <code>{`{
  "alg": "HS256",
  "typ": "JWT"
}`}</code>
          </pre>
        </div>
        <div className="rounded-lg border border-border-subtle bg-panel p-4">
          <div className="mb-2 font-mono text-xs text-warning">PAYLOAD</div>
          <pre className="overflow-x-auto font-mono text-xs leading-relaxed text-text-primary">
            <code>{`{
  "sub": "usr_123",
  "role": "analyst",
  "jti": "unique-id",
  "exp": 1234567890
}`}</code>
          </pre>
        </div>
        <div className="rounded-lg border border-border-subtle bg-panel p-4">
          <div className="mb-2 font-mono text-xs" style={{ color: '#8b5cf6' }}>SIGNATURE</div>
          <pre className="overflow-x-auto whitespace-pre-wrap font-mono text-xs leading-relaxed text-text-primary">
            <code>{`HMACSHA256(
  base64(header) + "." +
  base64(payload),
  secret
)`}</code>
          </pre>
        </div>
      </div>

      {/* Why it matters */}
      <div className="mt-8 rounded-lg border border-l-2 border-border-subtle border-l-accent bg-panel p-6">
        <h3 className="mb-2 font-mono text-sm text-accent">{'// why it matters'}</h3>
        <p className="leading-relaxed text-text-muted">
          JWTs are stateless — the server doesn&apos;t need to query a database on every request. The
          signature proves the token wasn&apos;t tampered with. The jti claim enables revocation without
          breaking statelessness.
        </p>
      </div>
    </div>
  )
}
