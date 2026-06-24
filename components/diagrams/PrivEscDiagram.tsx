'use client'
import { useState } from 'react'

type OS = 'linux' | 'windows'

interface Vector {
  name: string
  detail: string
  defense: string
}

const LINUX_PATH = [
  'Low privilege shell (www-data)',
  'Find SUID binaries:  find / -perm -4000 2>/dev/null',
  'Find: /usr/bin/python3 has SUID bit set',
  'Exploit: python3 -c \'import os; os.setuid(0); os.system("/bin/bash")\'',
  'Root shell  ← ESCALATED',
]

const WINDOWS_PATH = [
  'Low privilege user',
  'Check: whoami /priv → SeImpersonatePrivilege enabled',
  'Exploit: JuicyPotato / PrintSpoofer',
  'SYSTEM shell  ← ESCALATED',
]

const LINUX_VECTORS: Vector[] = [
  { name: 'SUID/SGID Binaries', detail: 'Binaries that run as their owner (root). GTFOBins lists ones that can spawn shells.', defense: 'Remove unnecessary SUID bits; audit regularly.' },
  { name: 'Sudo Misconfiguration', detail: 'sudo -l reveals (ALL) NOPASSWD entries that can be abused.', defense: 'Restrict sudo rules; avoid NOPASSWD on shells.' },
  { name: 'Writable /etc/passwd', detail: 'If writable, add a root user with a known password hash.', defense: 'Enforce correct file ownership and permissions.' },
  { name: 'Cron Jobs', detail: 'A writable script executed by root cron grants code execution as root.', defense: 'Lock down cron script permissions.' },
  { name: 'Kernel Exploits', detail: 'Check uname -a against known CVEs (e.g. DirtyPipe, DirtyCow).', defense: 'Patch management; minimal kernel exposure.' },
]

const WINDOWS_VECTORS: Vector[] = [
  { name: 'Token Impersonation', detail: 'SeImpersonatePrivilege lets a service account impersonate SYSTEM tokens.', defense: 'Remove SeImpersonate from non-essential accounts.' },
  { name: 'Unquoted Service Paths', detail: 'A space in an unquoted service path lets you drop a malicious binary earlier in the path.', defense: 'Quote all service binary paths.' },
  { name: 'Weak Service Permissions', detail: 'If you can modify a service binary or config, it runs your code as SYSTEM.', defense: 'Restrict service ACLs.' },
  { name: 'AlwaysInstallElevated', detail: 'When set, MSI packages install as SYSTEM regardless of caller.', defense: 'Disable AlwaysInstallElevated policy.' },
  { name: 'DLL Hijacking', detail: 'Place a malicious DLL in a writable directory in the search path.', defense: 'Patch, enforce safe DLL search order.' },
]

export default function PrivEscDiagram() {
  const [os, setOs] = useState<OS>('linux')
  const [open, setOpen] = useState<number | null>(null)

  const path = os === 'linux' ? LINUX_PATH : WINDOWS_PATH
  const vectors = os === 'linux' ? LINUX_VECTORS : WINDOWS_VECTORS

  return (
    <div>
      <div className="mb-6 flex gap-2">
        {(['linux', 'windows'] as OS[]).map(o => (
          <button
            key={o}
            type="button"
            onClick={() => {
              setOs(o)
              setOpen(null)
            }}
            className={`rounded border px-4 py-2 font-mono text-sm capitalize transition-colors ${
              os === o ? 'border-accent bg-accent/10 text-accent' : 'border-border-subtle text-text-muted hover:border-accent/50'
            }`}
          >
            {o} PrivEsc
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Escalation path */}
        <div className="rounded-lg border border-border-subtle bg-panel p-6">
          <div className="mb-4 font-mono text-xs text-accent">{'// escalation path'}</div>
          <div className="flex flex-col gap-2">
            {path.map((p, i) => (
              <div key={i}>
                <div
                  className={`rounded border p-3 font-mono text-xs leading-relaxed ${
                    i === path.length - 1
                      ? 'border-accent bg-accent/10 text-accent'
                      : i === 0
                        ? 'border-danger/40 bg-danger/5 text-text-primary'
                        : 'border-border-subtle text-text-primary'
                  }`}
                >
                  {p}
                </div>
                {i < path.length - 1 && <div className="py-1 text-center text-accent">↓</div>}
              </div>
            ))}
          </div>
        </div>

        {/* Vectors */}
        <div className="rounded-lg border border-border-subtle bg-panel p-6">
          <div className="mb-4 font-mono text-xs text-accent">{'// common vectors'}</div>
          <div className="flex flex-col gap-2">
            {vectors.map((v, i) => (
              <div key={v.name} className="rounded border border-border-subtle">
                <button
                  type="button"
                  onClick={() => setOpen(open === i ? null : i)}
                  className="flex w-full items-center justify-between gap-2 px-3 py-2 text-left"
                >
                  <span className="text-sm font-semibold text-text-primary">
                    {i + 1}. {v.name}
                  </span>
                  <span className="font-mono text-xs text-accent">{open === i ? '−' : '+'}</span>
                </button>
                {open === i && (
                  <div className="border-t border-border-subtle p-3">
                    <p className="mb-2 text-sm text-text-muted">{v.detail}</p>
                    <div className="rounded border border-accent/30 bg-accent/5 p-2">
                      <span className="font-mono text-xs text-accent">Defense: </span>
                      <span className="text-xs text-text-muted">{v.defense}</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Why it matters */}
      <div className="mt-8 rounded-lg border border-l-2 border-border-subtle border-l-accent bg-panel p-6">
        <h3 className="mb-2 font-mono text-sm text-accent">{'// why it matters'}</h3>
        <p className="leading-relaxed text-text-muted">
          Privilege escalation turns a limited foothold into full system control. Understanding these
          vectors is essential for both penetration testers finding them and defenders removing them.
        </p>
      </div>
    </div>
  )
}
