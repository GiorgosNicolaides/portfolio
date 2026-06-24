'use client'
import { useMemo, useState } from 'react'

const ORIGINAL = [
  'Alice → Bob: 0.5 BTC',
  'Bob → Carol: 0.3 BTC',
  'Carol → Dave: 0.1 BTC',
  'Dave → Alice: 0.2 BTC',
]

// tiny deterministic hash → 8 hex chars (illustrative, not cryptographic)
function h(input: string): string {
  let x = 0x811c9dc5
  for (let i = 0; i < input.length; i++) {
    x ^= input.charCodeAt(i)
    x = Math.imul(x, 0x01000193)
  }
  return (x >>> 0).toString(16).padStart(8, '0')
}

export default function MerkleTreeDiagram() {
  const [txs, setTxs] = useState<string[]>(ORIGINAL)
  const [editing, setEditing] = useState<number | null>(null)
  const [proofLeaf, setProofLeaf] = useState<number | null>(null)

  const tree = useMemo(() => {
    const leaves = txs.map(h)
    const l1 = [h(leaves[0] + leaves[1]), h(leaves[2] + leaves[3])]
    const root = h(l1[0] + l1[1])
    return { leaves, l1, root }
  }, [txs])

  const origLeaves = ORIGINAL.map(h)
  const origL1 = [h(origLeaves[0] + origLeaves[1]), h(origLeaves[2] + origLeaves[3])]
  const origRoot = h(origL1[0] + origL1[1])

  const tampered = tree.root !== origRoot
  const leafChanged = (i: number) => tree.leaves[i] !== origLeaves[i]
  const l1Changed = (i: number) => tree.l1[i] !== origL1[i]

  // proof of inclusion: sibling hashes needed to verify a leaf
  const proofPath = useMemo(() => {
    if (proofLeaf === null) return new Set<string>()
    const sibLeaf = proofLeaf % 2 === 0 ? proofLeaf + 1 : proofLeaf - 1
    const l1Index = Math.floor(proofLeaf / 2)
    const sibL1 = l1Index === 0 ? 1 : 0
    return new Set<string>([`leaf-${sibLeaf}`, `l1-${sibL1}`])
  }, [proofLeaf])

  const startEdit = (i: number) => {
    setProofLeaf(null)
    setEditing(i)
  }
  const reset = () => {
    setTxs(ORIGINAL)
    setEditing(null)
    setProofLeaf(null)
  }

  const box = (
    label: string,
    value: string,
    opts: { changed?: boolean; inProof?: boolean; onClick?: () => void; sub?: string },
  ) => (
    <button
      type="button"
      onClick={opts.onClick}
      disabled={!opts.onClick}
      className={`min-w-[120px] rounded-lg border px-3 py-2 text-center transition-colors ${
        opts.changed
          ? 'border-danger bg-danger/10'
          : opts.inProof
            ? 'border-accent bg-accent/10'
            : 'border-border-subtle bg-background'
      } ${opts.onClick ? 'cursor-pointer hover:border-accent/60' : ''}`}
    >
      <div className="font-mono text-[10px] text-text-muted">{label}</div>
      <div className={`font-mono text-xs font-bold ${opts.changed ? 'text-danger' : 'text-text-primary'}`}>
        {value.slice(0, 8)}
      </div>
      {opts.sub && <div className="mt-1 max-w-[140px] truncate text-[10px] text-text-muted">{opts.sub}</div>}
    </button>
  )

  return (
    <div>
      <div className="rounded-lg border border-border-subtle bg-panel p-6">
        {/* Root */}
        <div className="flex flex-col items-center gap-6">
          <div>
            {box('Merkle Root', tree.root, { changed: tampered })}
          </div>
          {/* Layer 1 */}
          <div className="flex flex-wrap justify-center gap-10">
            {tree.l1.map((hash, i) =>
              box(`H${i === 0 ? '12' : '34'}`, hash, {
                changed: l1Changed(i),
                inProof: proofPath.has(`l1-${i}`),
              }),
            )}
          </div>
          {/* Leaves */}
          <div className="flex flex-wrap justify-center gap-4">
            {tree.leaves.map((hash, i) =>
              box(`H(Tx${i + 1})`, hash, {
                changed: leafChanged(i),
                inProof: proofPath.has(`leaf-${i}`),
                onClick: () => startEdit(i),
                sub: txs[i],
              }),
            )}
          </div>
        </div>

        {tampered && (
          <div className="mt-6 rounded-lg border border-danger/50 bg-danger/5 p-4 text-center">
            <span className="font-mono text-sm font-bold text-danger">Verification FAILED — root hash mismatch</span>
          </div>
        )}

        <div className="mt-6 flex flex-wrap gap-3">
          <button type="button" onClick={reset} className="rounded border border-accent px-4 py-2 font-mono text-sm text-accent transition-colors hover:bg-accent/10">
            Reset
          </button>
          <span className="self-center font-mono text-xs text-text-muted">
            Click a transaction hash to tamper with it, or select a leaf below to see its proof of inclusion.
          </span>
        </div>
      </div>

      {/* Tamper editor */}
      {editing !== null && (
        <div className="mt-6 rounded-lg border border-border-subtle bg-panel p-4">
          <label className="mb-2 block font-mono text-xs text-warning">Modify Tx{editing + 1}</label>
          <input
            type="text"
            value={txs[editing]}
            onChange={e => {
              const next = [...txs]
              next[editing] = e.target.value
              setTxs(next)
            }}
            className="w-full rounded border border-border-subtle bg-background px-3 py-2 font-mono text-sm text-text-primary focus:border-accent focus:outline-none"
          />
        </div>
      )}

      {/* Proof of inclusion */}
      <div className="mt-6 rounded-lg border border-border-subtle bg-panel p-4">
        <div className="mb-3 font-mono text-xs text-accent">{'// proof of inclusion'}</div>
        <div className="flex flex-wrap gap-2">
          {txs.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                setEditing(null)
                setProofLeaf(p => (p === i ? null : i))
              }}
              className={`rounded border px-3 py-2 font-mono text-xs transition-colors ${
                proofLeaf === i ? 'border-accent bg-accent/10 text-accent' : 'border-border-subtle text-text-muted hover:border-accent/50'
              }`}
            >
              Prove Tx{i + 1}
            </button>
          ))}
        </div>
        {proofLeaf !== null && (
          <p className="mt-3 text-sm leading-relaxed text-text-muted">
            To prove <span className="text-accent">Tx{proofLeaf + 1}</span> is in the tree you only need the{' '}
            <span className="text-accent">highlighted sibling hashes</span> ({proofPath.size} of them) — not the whole
            tree. Recompute upward and compare to the root.
          </p>
        )}
      </div>

      {/* Why it matters */}
      <div className="mt-8 rounded-lg border border-l-2 border-border-subtle border-l-accent bg-panel p-6">
        <h3 className="mb-2 font-mono text-sm text-accent">{'// why it matters'}</h3>
        <p className="leading-relaxed text-text-muted">
          Merkle trees allow efficient verification of large datasets. Bitcoin uses them for transaction
          integrity. In security, they underpin certificate transparency logs, software update
          verification, and tamper-evident audit logs.
        </p>
      </div>
    </div>
  )
}
