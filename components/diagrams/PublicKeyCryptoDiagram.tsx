'use client'
import { useEffect, useState } from 'react'

type Tab = 'rsa' | 'ecc' | 'compare'

export default function PublicKeyCryptoDiagram() {
  const [tab, setTab] = useState<Tab>('rsa')
  // animated point parameter for the ECC curve
  const [t, setT] = useState(0)

  useEffect(() => {
    if (tab !== 'ecc') return
    const id = setInterval(() => setT(v => (v + 0.02) % 1), 40)
    return () => clearInterval(id)
  }, [tab])

  // y^2 = x^3 - x + 1 sampled over a range, drawn as an SVG path
  const curvePoints: [number, number][] = []
  for (let x = -1.5; x <= 2.2; x += 0.02) {
    const y2 = x * x * x - x + 1
    if (y2 >= 0) curvePoints.push([x, Math.sqrt(y2)])
  }
  const upper = curvePoints.map(([x, y]) => [x, y] as [number, number])
  const lower = [...curvePoints].reverse().map(([x, y]) => [x, -y] as [number, number])
  const all = [...upper, ...lower]
  const sx = (x: number) => 40 + (x + 1.8) * 80
  const sy = (y: number) => 150 - y * 55
  const path = all.map(([x, y], i) => `${i === 0 ? 'M' : 'L'} ${sx(x).toFixed(1)} ${sy(y).toFixed(1)}`).join(' ')
  const dotIdx = Math.floor(t * (all.length - 1))
  const [dx, dy] = all[dotIdx] ?? [0, 0]

  return (
    <div>
      {/* Tabs */}
      <div className="mb-6 flex gap-2">
        {(['rsa', 'ecc', 'compare'] as Tab[]).map(tb => (
          <button
            key={tb}
            type="button"
            onClick={() => setTab(tb)}
            className={`rounded border px-4 py-2 font-mono text-sm transition-colors ${
              tab === tb
                ? 'border-accent bg-accent/10 text-accent'
                : 'border-border-subtle text-text-muted hover:border-accent/50'
            }`}
          >
            {tb === 'rsa' ? 'RSA' : tb === 'ecc' ? 'ECC' : 'Compare'}
          </button>
        ))}
      </div>

      {tab === 'rsa' && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-lg border border-border-subtle bg-panel p-6">
            <h3 className="mb-4 text-lg font-bold text-text-primary">RSA — Key Generation</h3>
            <pre className="overflow-x-auto rounded-lg border border-border-subtle bg-background p-4 font-mono text-xs leading-relaxed text-text-primary">
              <code>{`p, q  →  two large primes
n = p × q            (modulus)
φ(n) = (p-1)(q-1)
e  →  public exponent (65537)
d  →  e⁻¹ mod φ(n)   (private)

public  key = (n, e)
private key = (n, d)`}</code>
            </pre>
          </div>
          <div className="rounded-lg border border-border-subtle bg-panel p-6">
            <h3 className="mb-4 text-lg font-bold text-text-primary">Encrypt / Decrypt</h3>
            <pre className="overflow-x-auto rounded-lg border border-border-subtle bg-background p-4 font-mono text-xs leading-relaxed text-text-primary">
              <code>{`Encrypt:  C = M^e mod n
Decrypt:  M = C^d mod n

Key sizes:
  2048-bit  minimum
  4096-bit  recommended`}</code>
            </pre>
            <div className="mt-4">
              <span className="font-mono text-xs text-text-muted">key generation speed</span>
              <div className="mt-1 h-3 w-full overflow-hidden rounded-full bg-background">
                <div className="h-full rounded-full bg-warning" style={{ width: '100%' }} />
              </div>
              <span className="font-mono text-xs text-text-muted">baseline</span>
            </div>
          </div>
        </div>
      )}

      {tab === 'ecc' && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-lg border border-border-subtle bg-panel p-6">
            <h3 className="mb-2 text-lg font-bold text-text-primary">Elliptic Curve</h3>
            <p className="mb-3 font-mono text-sm text-accent">y² = x³ + ax + b</p>
            <svg viewBox="0 0 360 300" className="w-full" role="img" aria-label="Elliptic curve point multiplication">
              <line x1={40} y1={150} x2={340} y2={150} stroke="#1e2d40" strokeWidth={1} />
              <line x1={184} y1={20} x2={184} y2={290} stroke="#1e2d40" strokeWidth={1} />
              <path d={path} fill="none" stroke="#00ff88" strokeWidth={1.8} />
              <circle cx={sx(dx)} cy={sy(dy)} r={5} fill="#00ff88">
                <animate attributeName="opacity" values="0.4;1;0.4" dur="1.2s" repeatCount="indefinite" />
              </circle>
            </svg>
            <p className="mt-2 text-center font-mono text-xs text-text-muted">point multiplication: P → 2P → 3P …</p>
          </div>
          <div className="rounded-lg border border-border-subtle bg-panel p-6">
            <h3 className="mb-4 text-lg font-bold text-text-primary">ECC — Properties</h3>
            <pre className="overflow-x-auto rounded-lg border border-border-subtle bg-background p-4 font-mono text-xs leading-relaxed text-text-primary">
              <code>{`Key sizes:
  256-bit  ≈  RSA 3072-bit security

Security from the hardness of the
Elliptic Curve Discrete Log Problem.`}</code>
            </pre>
            <div className="mt-4">
              <span className="font-mono text-xs text-text-muted">key generation speed</span>
              <div className="mt-1 h-3 w-full overflow-hidden rounded-full bg-background">
                <div className="h-full rounded-full bg-accent" style={{ width: '12%' }} />
              </div>
              <span className="font-mono text-xs text-accent">1,807× faster for equivalent security (LEO satellite research)</span>
            </div>
          </div>
        </div>
      )}

      {tab === 'compare' && (
        <div className="overflow-x-auto rounded-lg border border-border-subtle bg-panel p-4">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr>
                {['Property', 'RSA-2048', 'ECC-256', 'ECC-384'].map(h => (
                  <th key={h} className="border border-border-subtle px-3 py-2 text-left font-mono text-xs text-accent">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="font-mono text-xs text-text-primary">
              {[
                ['Key Size', '2048 bit', '256 bit', '384 bit'],
                ['Security', '112-bit', '128-bit', '192-bit'],
                ['Key Gen Speed', 'baseline', '~10× faster', '~8× faster'],
                ['Use Case', 'Legacy systems', 'TLS, mobile', 'High security'],
              ].map(row => (
                <tr key={row[0]}>
                  {row.map((cell, i) => (
                    <td
                      key={i}
                      className={`border border-border-subtle px-3 py-2 ${i === 0 ? 'text-text-muted' : ''}`}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Why it matters */}
      <div className="mt-8 rounded-lg border border-l-2 border-border-subtle border-l-accent bg-panel p-6">
        <h3 className="mb-2 font-mono text-sm text-accent">{'// why it matters'}</h3>
        <p className="leading-relaxed text-text-muted">
          ECC provides equivalent security to RSA with dramatically smaller keys — critical for
          resource-constrained environments like IoT devices and satellites where my research focuses.
          Smaller keys mean faster operations and less energy consumption.
        </p>
      </div>
    </div>
  )
}
