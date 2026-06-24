'use client'
import { useEffect, useState } from 'react'

type Mode = 'vulnerable' | 'protected'

interface Msg {
  actor: 'Client' | 'Server' | 'Attacker'
  text: string
  bad?: boolean
  good?: boolean
}

const VULNERABLE: Msg[] = [
  { actor: 'Client', text: 'AUTH {user: alice, password: hash}' },
  { actor: 'Server', text: '200 OK — Access Granted', good: true },
  { actor: 'Attacker', text: '🔍 captures the message off the wire', bad: true },
  { actor: 'Attacker', text: 'AUTH {user: alice, password: hash}  [replay]', bad: true },
  { actor: 'Server', text: '200 OK — Access Granted  ← VULNERABLE', bad: true },
]

const PROTECTED: Msg[] = [
  { actor: 'Client', text: 'REQUEST_NONCE' },
  { actor: 'Server', text: 'NONCE: a7f3b2c1, expires: +30s' },
  { actor: 'Client', text: 'AUTH {user: alice, nonce: a7f3b2c1, HMAC(creds+nonce)}' },
  { actor: 'Server', text: '200 OK — nonce consumed', good: true },
  { actor: 'Attacker', text: 'AUTH {user: alice, nonce: a7f3b2c1, HMAC}  [replay]', bad: true },
  { actor: 'Server', text: '401 — Nonce already used  ← PROTECTED', good: true },
]

const MECHANISMS = [
  { name: 'Nonce', desc: 'One-time random value — server tracks used nonces' },
  { name: 'Timestamp', desc: 'Message valid only within ±30 seconds — clock skew tolerance' },
  { name: 'HMAC chain', desc: 'Message integrity — tampering invalidates the MAC' },
  { name: 'Session tokens', desc: 'Short-lived tokens with jti claim for JWT revocation' },
]

const actorColor: Record<Msg['actor'], string> = {
  Client: 'text-accent',
  Server: 'text-text-primary',
  Attacker: 'text-danger',
}

export default function ReplayAttackDiagram() {
  const [mode, setMode] = useState<Mode>('vulnerable')
  const [shown, setShown] = useState(0)

  const messages = mode === 'vulnerable' ? VULNERABLE : PROTECTED

  useEffect(() => {
    setShown(0)
    const id = setInterval(() => {
      setShown(s => {
        if (s >= messages.length) {
          clearInterval(id)
          return s
        }
        return s + 1
      })
    }, 700)
    return () => clearInterval(id)
  }, [mode, messages.length])

  return (
    <div>
      <div className="mb-6 flex gap-2">
        {(['vulnerable', 'protected'] as Mode[]).map(m => (
          <button
            key={m}
            type="button"
            onClick={() => setMode(m)}
            className={`rounded border px-4 py-2 font-mono text-sm capitalize transition-colors ${
              mode === m
                ? m === 'vulnerable'
                  ? 'border-danger bg-danger/10 text-danger'
                  : 'border-accent bg-accent/10 text-accent'
                : 'border-border-subtle text-text-muted hover:border-accent/50'
            }`}
          >
            {m}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="rounded-lg border border-border-subtle bg-panel p-4">
          <div className="mb-3 font-mono text-xs text-text-muted">
            {mode === 'vulnerable' ? '// no replay protection' : '// nonce + timestamp + HMAC'}
          </div>
          <div className="flex flex-col gap-2">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`rounded border p-3 transition-opacity duration-300 ${
                  i < shown ? 'opacity-100' : 'opacity-20'
                } ${m.bad ? 'border-danger/40 bg-danger/5' : m.good ? 'border-accent/40 bg-accent/5' : 'border-border-subtle'}`}
              >
                <div className="flex items-baseline gap-2">
                  <span className={`font-mono text-xs font-semibold ${actorColor[m.actor]}`}>{m.actor}</span>
                </div>
                <p className="mt-1 break-words font-mono text-xs text-text-primary">{m.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-border-subtle bg-panel p-6">
          <h3 className="mb-4 text-lg font-bold text-text-primary">Protection Mechanisms</h3>
          <div className="flex flex-col gap-3">
            {MECHANISMS.map(mech => (
              <div key={mech.name} className="rounded border border-border-subtle p-3">
                <div className="text-sm font-semibold text-accent">{mech.name}</div>
                <p className="text-xs leading-snug text-text-muted">{mech.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Why it matters */}
      <div className="mt-8 rounded-lg border border-l-2 border-border-subtle border-l-accent bg-panel p-6">
        <h3 className="mb-2 font-mono text-sm text-accent">{'// why it matters'}</h3>
        <p className="leading-relaxed text-text-muted">
          Replay attacks are one of the most common authentication vulnerabilities. SONDA-MA (my RFID
          research) uses dynamic nonces to prevent replayed authentication messages on passive NFC
          hardware where traditional TLS is too expensive.
        </p>
      </div>
    </div>
  )
}
