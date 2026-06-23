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

const ACTORS = ['User', 'Client App', 'Authorization Server', 'Resource Server']
const X = [100, 300, 480, 660]

const STEPS: Step[] = [
  {
    from: 0,
    to: 1,
    label: 'Click Login',
    title: 'Login Initiated',
    explanation: 'The user initiates login by clicking a button in the client application.',
    code: `<button onclick="startOAuthFlow()">
  Login with Provider
</button>`,
  },
  {
    from: 1,
    to: 2,
    label: 'Authorization Request + code_challenge',
    title: 'Authorization Request',
    explanation:
      'The client generates a code_verifier and code_challenge for PKCE, then redirects the user.',
    code: `GET /authorize?
  response_type=code
  &client_id=CLIENT_ID
  &redirect_uri=https://app.com/callback
  &code_challenge=BASE64URL(SHA256(verifier))
  &code_challenge_method=S256
  &state=RANDOM_STATE`,
  },
  {
    from: 2,
    to: 0,
    label: 'Login & Consent Screen',
    title: 'Login & Consent',
    explanation: 'The authorization server presents a login and consent screen to the user.',
    code: `// Server renders login page
// User enters credentials
// Server validates and shows consent`,
  },
  {
    from: 0,
    to: 2,
    label: 'User Approves',
    title: 'User Approves',
    explanation: 'User grants permission to the requested scopes.',
    code: `// User clicks "Allow"
// Server validates consent
// Generates authorization code`,
  },
  {
    from: 2,
    to: 1,
    label: 'Authorization Code',
    title: 'Authorization Code',
    explanation:
      'Server redirects back to the client with a short-lived authorization code.',
    code: `HTTP 302 Redirect to:
  https://app.com/callback
  ?code=AUTH_CODE_HERE
  &state=RANDOM_STATE`,
  },
  {
    from: 1,
    to: 2,
    label: 'Token Request + code_verifier',
    title: 'Token Exchange',
    explanation:
      'Client exchanges the code for tokens, proving it holds the original verifier.',
    code: `POST /token
Content-Type: application/x-www-form-urlencoded

grant_type=authorization_code
&code=AUTH_CODE_HERE
&redirect_uri=https://app.com/callback
&client_id=CLIENT_ID
&code_verifier=ORIGINAL_VERIFIER`,
  },
  {
    from: 2,
    to: 1,
    label: 'Access Token + Refresh Token',
    title: 'Tokens Issued',
    explanation: 'Server validates everything and returns tokens.',
    code: `{
  "access_token": "eyJhbGc...",
  "token_type": "Bearer",
  "expires_in": 3600,
  "refresh_token": "def502..."
}`,
  },
  {
    from: 1,
    to: 3,
    label: 'API Request + Bearer Token',
    title: 'API Request',
    explanation: 'Client uses the access token to call protected APIs.',
    code: `GET /api/user/profile
Authorization: Bearer eyJhbGc...`,
  },
  {
    from: 3,
    to: 1,
    label: 'Protected Resource',
    title: 'Protected Resource',
    explanation: 'Resource server validates the token and returns data.',
    code: `{
  "id": "usr_123",
  "email": "user@example.com",
  "name": "George"
}`,
  },
]

const ARROW_TOP = 96
const GAP = 40

export default function OAuthDiagram() {
  const [step, setStep] = useState(0)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    if (!playing) return
    if (step >= STEPS.length - 1) {
      setPlaying(false)
      return
    }
    const t = setTimeout(() => setStep(s => s + 1), 1500)
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
          <svg viewBox="0 0 760 480" className="w-full" role="img" aria-label="OAuth 2.0 sequence diagram">
            <defs>
              <marker id="oauth-ah-accent" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto">
                <path d="M0,0 L6,3 L0,6 Z" fill="#00ff88" />
              </marker>
              <marker id="oauth-ah-muted" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto">
                <path d="M0,0 L6,3 L0,6 Z" fill="#475569" />
              </marker>
            </defs>

            {/* Actors + lifelines */}
            {ACTORS.map((actor, i) => (
              <g key={actor}>
                <rect
                  x={X[i] - 78}
                  y={16}
                  width={156}
                  height={40}
                  rx={6}
                  fill="#0a0e1a"
                  stroke="#1e2d40"
                />
                <text
                  x={X[i]}
                  y={40}
                  textAnchor="middle"
                  fontSize={11}
                  fontFamily="monospace"
                  fill="#e2e8f0"
                >
                  {actor}
                </text>
                <line
                  x1={X[i]}
                  y1={56}
                  x2={X[i]}
                  y2={452}
                  stroke="#1e2d40"
                  strokeWidth={1}
                  strokeDasharray="4 4"
                />
              </g>
            ))}

            {/* Arrows up to the current step */}
            {STEPS.slice(0, step + 1).map((s, i) => {
              const y = ARROW_TOP + i * GAP
              const active = i === step
              const fromX = X[s.from]
              const toRight = s.to > s.from
              const toX = toRight ? X[s.to] - 6 : X[s.to] + 6
              const stroke = active ? '#00ff88' : '#475569'
              const marker = active ? 'url(#oauth-ah-accent)' : 'url(#oauth-ah-muted)'
              const mid = (fromX + toX) / 2
              return (
                <g key={i} opacity={active ? 1 : 0.75}>
                  <line
                    x1={fromX}
                    y1={y}
                    x2={toX}
                    y2={y}
                    stroke={stroke}
                    strokeWidth={active ? 2 : 1.5}
                    markerEnd={marker}
                  />
                  <text
                    x={mid}
                    y={y - 6}
                    textAnchor="middle"
                    fontSize={9}
                    fontFamily="monospace"
                    fill={active ? '#00ff88' : '#64748b'}
                  >
                    {i + 1}. {s.label}
                  </text>
                </g>
              )
            })}
          </svg>

          {/* Controls */}
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

      {/* Why it matters */}
      <div className="mt-8 rounded-lg border border-l-2 border-border-subtle border-l-accent bg-panel p-6">
        <h3 className="mb-2 font-mono text-sm text-accent">{'// why it matters'}</h3>
        <p className="leading-relaxed text-text-muted">
          OAuth 2.0 with PKCE prevents authorization code interception attacks. The code_verifier
          proves the same client that started the flow is completing it — critical for public
          clients like SPAs and mobile apps.
        </p>
      </div>
    </div>
  )
}
