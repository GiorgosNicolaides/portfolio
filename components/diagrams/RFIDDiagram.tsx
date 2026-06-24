'use client'
import { useEffect, useState } from 'react'

interface Step {
  from: number
  to: number
  label: string
  title: string
  explanation: string
}

const ACTORS = ['NFC Tag', 'Reader / Pi', 'Backend']
const X = [120, 380, 640]

const STEPS: Step[] = [
  { from: 1, to: 0, label: 'HELLO {nonce_R}', title: 'Reader Challenge', explanation: 'The reader opens the session with a fresh random nonce R.' },
  { from: 0, to: 1, label: 'RESPONSE {nonce_T, HMAC(R‖T, key)}', title: 'Tag Response', explanation: 'The tag replies with its own nonce T and an HMAC binding both nonces under the shared key.' },
  { from: 1, to: 2, label: 'VERIFY {R, T, HMAC}', title: 'Forward to Backend', explanation: 'The reader forwards the material to the backend, which holds the key store.' },
  { from: 2, to: 1, label: 'HMAC valid → session token', title: 'Backend Verifies', explanation: 'The backend recomputes the HMAC; if valid it issues a session token.' },
  { from: 1, to: 0, label: 'SESSION {token, HMAC(token, key)}', title: 'Session to Tag', explanation: 'The reader passes the session token to the tag, authenticated with an HMAC.' },
  { from: 0, to: 1, label: 'ACK {HMAC(token‖T, key)}', title: 'Tag Acknowledges', explanation: 'The tag confirms by returning an HMAC over the token and its nonce.' },
  { from: 1, to: 1, label: 'Mutual authentication complete ✓', title: 'Authenticated', explanation: 'Both parties have proven knowledge of the key — mutual authentication achieved.' },
]

const ARROW_TOP = 96
const GAP = 44

const RESISTANCE = [
  { attack: 'Replay Attack', defense: 'Each nonce is unique per session — replayed messages are rejected' },
  { attack: 'Man-in-the-Middle', defense: 'HMAC chain prevents modification — attacker cannot forge responses' },
  { attack: 'Eavesdropping', defense: 'Session keys derived dynamically — captured traffic cannot be reused' },
]

const HARDWARE = [
  { name: 'Raspberry Pi 5', role: 'reader' },
  { name: 'MFRC522 / PN532', role: 'NFC interface' },
  { name: 'Flipper Zero', role: 'adversarial testing tool' },
  { name: 'MIFARE Classic card', role: 'passive tag' },
]

export default function RFIDDiagram() {
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
  const current = STEPS[step]

  return (
    <div>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="rounded-lg border border-border-subtle bg-panel p-4">
          <svg viewBox="0 0 760 420" className="w-full" role="img" aria-label="SONDA-MA mutual authentication sequence">
            <defs>
              <marker id="rfid-ah-accent" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto">
                <path d="M0,0 L6,3 L0,6 Z" fill="#00ff88" />
              </marker>
              <marker id="rfid-ah-muted" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto">
                <path d="M0,0 L6,3 L0,6 Z" fill="#475569" />
              </marker>
            </defs>
            {ACTORS.map((actor, i) => (
              <g key={actor}>
                <rect x={X[i] - 78} y={16} width={156} height={40} rx={6} fill="#0a0e1a" stroke="#1e2d40" />
                <text x={X[i]} y={40} textAnchor="middle" fontSize={12} fontFamily="monospace" fill="#e2e8f0">
                  {actor}
                </text>
                <line x1={X[i]} y1={56} x2={X[i]} y2={400} stroke="#1e2d40" strokeWidth={1} strokeDasharray="4 4" />
              </g>
            ))}
            {STEPS.slice(0, step + 1).map((s, i) => {
              const y = ARROW_TOP + i * GAP
              const active = i === step
              const stroke = active ? '#00ff88' : '#475569'
              const marker = active ? 'url(#rfid-ah-accent)' : 'url(#rfid-ah-muted)'
              const textFill = active ? '#00ff88' : '#64748b'
              if (s.from === s.to) {
                const x = X[s.from]
                return (
                  <g key={i} opacity={active ? 1 : 0.75}>
                    <path d={`M ${x} ${y} h 34 v 14 h -28`} fill="none" stroke={stroke} strokeWidth={active ? 2 : 1.5} markerEnd={marker} />
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
                  <text x={mid} y={y - 6} textAnchor="middle" fontSize={8.5} fontFamily="monospace" fill={textFill}>
                    {i + 1}. {s.label}
                  </text>
                </g>
              )
            })}
          </svg>
          <div className="mt-4 flex flex-wrap gap-3">
            <button type="button" onClick={() => go(step - 1)} disabled={step === 0} className="rounded border border-accent px-4 py-2 font-mono text-sm text-accent transition-colors hover:bg-accent/10 disabled:cursor-not-allowed disabled:opacity-40">
              ← Previous
            </button>
            <button type="button" onClick={() => go(step + 1)} disabled={step === STEPS.length - 1} className="rounded border border-accent px-4 py-2 font-mono text-sm text-accent transition-colors hover:bg-accent/10 disabled:cursor-not-allowed disabled:opacity-40">
              Next →
            </button>
            <button type="button" onClick={() => { setStep(0); setPlaying(true) }} className="rounded bg-accent px-4 py-2 font-mono text-sm font-semibold text-background transition-colors hover:bg-accent-dim">
              {playing ? 'Playing…' : 'Play All'}
            </button>
          </div>
        </div>

        <div className="rounded-lg border border-border-subtle bg-panel p-6">
          <div className="mb-2 font-mono text-xs text-accent">STEP {step + 1} / {STEPS.length}</div>
          <h3 className="mb-3 text-xl font-bold text-text-primary">{current.title}</h3>
          <p className="mb-6 leading-relaxed text-text-muted">{current.explanation}</p>
          <div className="mb-3 font-mono text-xs text-accent">{'// attack resistance'}</div>
          <div className="flex flex-col gap-2">
            {RESISTANCE.map(r => (
              <div key={r.attack} className="rounded border border-border-subtle p-3">
                <div className="text-sm font-semibold text-text-primary">{r.attack}</div>
                <p className="text-xs leading-snug text-text-muted">{r.defense}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Hardware */}
      <div className="mt-8 rounded-lg border border-border-subtle bg-panel p-6">
        <h3 className="mb-4 text-lg font-bold text-text-primary">Hardware Setup</h3>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {HARDWARE.map(h => (
            <div key={h.name} className="rounded border border-border-subtle p-3 text-center">
              <div className="text-sm font-semibold text-accent">{h.name}</div>
              <div className="mt-1 font-mono text-xs text-text-muted">{h.role}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Why it matters */}
      <div className="mt-8 rounded-lg border border-l-2 border-border-subtle border-l-accent bg-panel p-6">
        <h3 className="mb-2 font-mono text-sm text-accent">{'// why it matters'}</h3>
        <p className="leading-relaxed text-text-muted">
          Passive RFID/NFC tags have no battery and extremely limited compute. SONDA-MA achieves mutual
          authentication within these constraints — both the tag and reader verify each other&apos;s identity
          before any data is exchanged.
        </p>
      </div>
    </div>
  )
}
