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
              Building defensive security tools, researching lightweight cryptographic protocols,
              and bridging the gap between theory and real-world threat response.
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

          {/* Right — Stats grid */}
          <div className="hidden lg:grid grid-cols-2 gap-4 animate-fadeIn">
            {[
              { label: 'Security Projects', value: '5', sub: 'built & deployed' },
              { label: 'Research Papers', value: '2', sub: 'in progress' },
              { label: 'Speed Improvement', value: '1,807x', sub: 'vs RSA-2048' },
              { label: 'Students Mentored', value: '30+', sub: 'GDG community' },
            ].map((stat, i) => (
              <div
                key={i}
                className="bg-panel border border-border-subtle rounded-lg p-6 hover:border-accent/50 transition-colors"
              >
                <div className="text-3xl font-bold text-accent font-mono mb-1">
                  {stat.value}
                </div>
                <div className="text-text-primary text-sm font-medium mb-1">
                  {stat.label}
                </div>
                <div className="text-text-muted text-xs font-mono">
                  {stat.sub}
                </div>
              </div>
            ))}

            {/* Location + availability */}
            <div className="col-span-2 bg-panel border border-border-subtle rounded-lg p-6 hover:border-accent/50 transition-colors">
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