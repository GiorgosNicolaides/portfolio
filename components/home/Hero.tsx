'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Terminal from '@/components/ui/Terminal'
import DownloadCV from '@/components/ui/DownloadCV'

const lines = [
  { prompt: '> whoami', output: 'Georgios Nicolaides' },
  { prompt: '> role', output: 'Cybersecurity Engineer' },
  { prompt: '> specialisation', output: 'Protocol Security · Cryptography · Threat Detection · DevSecOps' },
  { prompt: '> status', output: 'Open to opportunities' },
]

export default function Hero() {
  const [visibleLines, setVisibleLines] = useState<number>(0)
  const [showCursor, setShowCursor] = useState<boolean>(true)

  useEffect(() => {
    if (visibleLines < lines.length) {
      const timer = setTimeout(() => {
        setVisibleLines(v => v + 1)
      }, 600)
      return () => clearTimeout(timer)
    }
  }, [visibleLines])

  useEffect(() => {
    const cursor = setInterval(() => {
      setShowCursor(v => !v)
    }, 500)
    return () => clearInterval(cursor)
  }, [])

  return (
    <section className="min-h-[90vh] flex items-center">
      <div className="max-w-6xl mx-auto px-6 w-full py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left — Terminal */}
          <div className="animate-fadeIn">
            <div className="mb-6">
              <span className="text-accent font-mono text-sm tracking-widest uppercase">
                {'// cybersecurity engineer'}
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-text-primary mb-4 leading-tight">
              Georgios{' '}
              <span className="text-accent">Nicolaides</span>
            </h1>
            <p className="text-text-muted mb-8 max-w-md leading-relaxed">
              Building defensive security tools, researching lightweight cryptographic
              protocols, and bridging the gap between theory and real-world threat response.
            </p>

            <Terminal title="gn@portfolio:~$" className="mb-8">
              <div className="space-y-3">
                {lines.map((line, i) => (
                  <div
                    key={i}
                    className={`transition-opacity duration-300 ${i < visibleLines ? 'opacity-100' : 'opacity-0'}`}
                  >
                    <div className="text-accent">{line.prompt}</div>
                    <div className="text-text-primary ml-2">{line.output}</div>
                  </div>
                ))}
                {visibleLines >= lines.length && (
                  <div className="text-accent">
                    {'> '}
                    <span className={showCursor ? 'opacity-100' : 'opacity-0'}>▋</span>
                  </div>
                )}
              </div>
            </Terminal>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/projects"
                className="px-6 py-3 bg-accent text-background font-mono font-semibold text-sm rounded hover:bg-accent-dim transition-colors"
              >
                View Projects
              </Link>
              <Link
                href="/research"
                className="px-6 py-3 border border-accent text-accent font-mono font-semibold text-sm rounded hover:bg-accent/10 transition-colors"
              >
                View Research
              </Link>
              <Link
                href="mailto:gnicolaides02@gmail.com"
                className="px-6 py-3 border border-border-subtle text-text-muted font-mono text-sm rounded hover:border-accent hover:text-accent transition-colors"
              >
                Contact Me
              </Link>
              <DownloadCV />
            </div>
          </div>

          {/* Right — Highlight grid */}
          <div className="hidden lg:flex flex-col gap-4 animate-fadeIn">

            {/* Hero stat */}
            <div className="bg-panel border border-accent/30 rounded-lg p-8 hover:border-accent/60 transition-colors">
              <div className="text-5xl font-bold text-accent font-mono mb-3">
                1,807x
              </div>
              <div className="text-text-primary text-sm font-medium mb-2">
                faster mutual authentication for LEO satellites
              </div>
              <div className="text-text-muted text-xs font-mono leading-relaxed">
                Designed an ECDSA P-256 authentication protocol for LEO satellite
                to ground station communication — achieving 1,807x faster key generation
                than RSA-2048 while maintaining equivalent security.
                Validated in a containerised testbed.
              </div>
              <div className="mt-4 pt-4 border-t border-border-subtle flex items-center justify-between">
                <span className="text-text-muted text-xs font-mono">
                  First Author · Pending Submission · 2026
                </span>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-accent/10 text-accent border border-accent/20">
                  Research Paper
                </span>
              </div>
            </div>

            {/* Two skill cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-panel border border-border-subtle rounded-lg p-5 hover:border-accent/50 transition-colors">
                <div className="text-accent font-mono text-xs mb-3">
                  {'// cryptography'}
                </div>
                <div className="text-text-primary text-sm font-medium mb-3">
                  Protocol Security & Research
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {['SONDA-MA', 'LEO Satellite', 'RFID/NFC', 'AES', 'RSA', 'Merkle Trees'].map(tag => (
                    <span
                      key={tag}
                      className="text-xs font-mono px-2 py-0.5 rounded bg-accent/10 text-accent border border-accent/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-panel border border-border-subtle rounded-lg p-5 hover:border-accent/50 transition-colors">
                <div className="text-accent font-mono text-xs mb-3">
                  {'// defensive tooling'}
                </div>
                <div className="text-text-primary text-sm font-medium mb-3">
                  Security Engineering
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {['Zero Trust', 'Threat Detection', 'DevSecOps', 'Cloud Auditing', 'SIEM', 'MITRE ATT&CK'].map(tag => (
                    <span
                      key={tag}
                      className="text-xs font-mono px-2 py-0.5 rounded bg-accent/10 text-accent border border-accent/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Currently section */}
            <div className="bg-panel border border-border-subtle rounded-lg p-5 hover:border-accent/50 transition-colors">
              <div className="text-text-muted text-xs font-mono mb-3">{'// currently'}</div>
              <div className="space-y-2.5">
                {[
                  { icon: '🎓', text: 'MEng Cybersecurity — University of Limerick' },
                  { icon: '📄', text: 'CompTIA Security+ — expected Jul 2026' },
                  { icon: '✅', text: 'Open to graduate & junior security roles' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="text-sm">{item.icon}</span>
                    <span className="text-text-primary text-xs font-mono">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Location + availability */}
            <div className="bg-panel border border-border-subtle rounded-lg px-5 py-4 hover:border-accent/50 transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-text-muted text-xs font-mono mb-1">{'// location'}</div>
                  <div className="text-text-primary font-mono text-sm">Nicosia, Cyprus</div>
                </div>
                <div className="text-right">
                  <div className="text-text-muted text-xs font-mono mb-1">{'// availability'}</div>
                  <div className="flex items-center gap-2 justify-end">
                    <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                    <span className="text-accent font-mono text-sm">Open to work</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  )
}