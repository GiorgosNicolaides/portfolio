'use client'
import { useState } from 'react'

interface Node {
  name: string
  command: string
  reveals: string
  defense: string
}

interface Branch {
  title: string
  nodes: Node[]
}

const BRANCHES: Branch[] = [
  {
    title: 'Domain Intelligence',
    nodes: [
      { name: 'WHOIS lookup', command: 'whois example-corp.com', reveals: 'Registrar, registration dates, nameservers', defense: 'Use WHOIS privacy / registrar proxy' },
      { name: 'DNS records', command: 'dig example-corp.com ANY', reveals: 'A, MX, TXT, SPF records', defense: 'Minimize public TXT metadata' },
      { name: 'Subdomain enumeration', command: 'amass enum -d example-corp.com', reveals: 'dev.example.com, staging.example.com', defense: 'Avoid predictable hostnames, monitor CT' },
      { name: 'Certificate transparency', command: 'curl crt.sh?q=example-corp.com', reveals: 'All issued certs incl. internal hosts', defense: 'Wildcard certs, internal CA' },
    ],
  },
  {
    title: 'People Intelligence',
    nodes: [
      { name: 'LinkedIn', command: 'site:linkedin.com "example-corp"', reveals: 'Employee names, roles, tech stack', defense: 'Security-awareness training' },
      { name: 'GitHub', command: 'github.com search "example-corp"', reveals: 'Leaked credentials, internal repos', defense: 'Secret scanning, private orgs' },
      { name: 'Email format', command: 'theHarvester -d example-corp.com', reveals: 'firstname.lastname@example.com', defense: 'Anti-phishing controls, MFA' },
      { name: 'HaveIBeenPwned', command: 'hibp example-corp.com', reveals: 'Breached employee credentials', defense: 'Force resets, monitor breaches' },
    ],
  },
  {
    title: 'Technical Intelligence',
    nodes: [
      { name: 'Shodan', command: 'shodan search org:"Example Corp"', reveals: 'Exposed services, banners, versions', defense: 'Reduce attack surface, firewall' },
      { name: 'VirusTotal', command: 'vt domain example-corp.com', reveals: 'Historical IP/domain data', defense: 'Rotate infra, monitor reputation' },
      { name: 'Wayback Machine', command: 'web.archive.org/example-corp.com', reveals: 'Old pages, hidden endpoints', defense: 'Remove sensitive cached content' },
      { name: 'Google Dorks', command: 'site:example-corp.com filetype:pdf', reveals: 'Indexed documents, metadata', defense: 'robots.txt, strip metadata' },
    ],
  },
  {
    title: 'Social Engineering Intel',
    nodes: [
      { name: 'Job postings', command: 'site:example-corp.com/careers', reveals: 'Tech stack, security tools used', defense: 'Generalize job descriptions' },
      { name: 'Press releases', command: 'news search "example-corp"', reveals: 'Acquisitions, infra changes', defense: 'Limit infrastructure detail' },
      { name: 'Conference talks', command: 'youtube "example-corp" architecture', reveals: 'Internal architecture details', defense: 'Review talks before release' },
    ],
  },
]

const TOOLS = ['theHarvester', 'Maltego', 'Recon-ng', 'Shodan', 'crt.sh', 'LinkedIn', 'GitHub']

export default function OSINTDiagram() {
  const [active, setActive] = useState<Node | null>(null)

  return (
    <div>
      <div className="mb-6 rounded-lg border border-accent/50 bg-accent/5 p-4 text-center">
        <span className="font-mono text-sm text-text-muted">Target:</span>{' '}
        <span className="font-mono text-lg font-bold text-accent">example-corp.com</span>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {BRANCHES.map(branch => (
          <div key={branch.title} className="rounded-lg border border-border-subtle bg-panel p-4">
            <div className="mb-3 font-mono text-sm font-semibold text-accent">{branch.title}</div>
            <div className="flex flex-wrap gap-2">
              {branch.nodes.map(n => (
                <button
                  key={n.name}
                  type="button"
                  onClick={() => setActive(n)}
                  className={`rounded border px-3 py-1.5 text-xs transition-colors ${
                    active?.name === n.name ? 'border-accent bg-accent/10 text-accent' : 'border-border-subtle text-text-primary hover:border-accent/50'
                  }`}
                >
                  {n.name}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Detail */}
      <div className="mt-6 rounded-lg border border-border-subtle bg-panel p-6">
        {active ? (
          <div>
            <h3 className="mb-3 text-lg font-bold text-text-primary">{active.name}</h3>
            <div className="mb-2 font-mono text-xs text-text-muted">example command / query</div>
            <pre className="mb-4 overflow-x-auto rounded-lg border border-border-subtle bg-background p-3 font-mono text-xs text-accent">
              <code>{active.command}</code>
            </pre>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded border border-border-subtle p-3">
                <div className="mb-1 font-mono text-xs text-warning">Reveals</div>
                <p className="text-sm text-text-muted">{active.reveals}</p>
              </div>
              <div className="rounded border border-border-subtle p-3">
                <div className="mb-1 font-mono text-xs text-accent">Countermeasure</div>
                <p className="text-sm text-text-muted">{active.defense}</p>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-text-muted">Click any node to see the technique, an example command, what it reveals, and the defensive countermeasure.</p>
        )}
      </div>

      {/* Tools */}
      <div className="mt-6 rounded-lg border border-border-subtle bg-panel p-4">
        <div className="mb-3 font-mono text-xs text-accent">{'// tool reference'}</div>
        <div className="flex flex-wrap gap-2">
          {TOOLS.map(t => (
            <span key={t} className="rounded border border-border-subtle px-3 py-1 font-mono text-xs text-text-primary">
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Why it matters */}
      <div className="mt-8 rounded-lg border border-l-2 border-border-subtle border-l-accent bg-panel p-6">
        <h3 className="mb-2 font-mono text-sm text-accent">{'// why it matters'}</h3>
        <p className="leading-relaxed text-text-muted">
          OSINT is the first phase of any engagement — passive reconnaissance reveals attack surface
          without touching the target. Defenders use the same techniques to understand what attackers can
          see about them.
        </p>
      </div>
    </div>
  )
}
