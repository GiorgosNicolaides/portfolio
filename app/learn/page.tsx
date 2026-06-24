import type { Metadata } from 'next'
import Link from 'next/link'
import SectionHeader from '@/components/ui/SectionHeader'

const description =
  'Interactive diagrams for security concepts — OAuth, Zero Trust, JWT, RBAC, cryptography, MITRE ATT&CK, and offensive security.'

export const metadata: Metadata = {
  title: 'Interactive Diagrams — Georgios Nicolaides',
  description,
  openGraph: {
    title: 'Interactive Diagrams — Georgios Nicolaides',
    description,
    type: 'website',
  },
  twitter: {
    card: 'summary',
  },
}

type Category = 'fundamentals' | 'projects' | 'crypto' | 'offensive'
type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced'

interface Topic {
  href: string
  title: string
  description: string
  category: Category
  difficulty: Difficulty
}

interface Section {
  header: string
  category: Category
  topics: Topic[]
}

const SECTIONS: Section[] = [
  {
    header: '// fundamentals',
    category: 'fundamentals',
    topics: [
      { href: '/learn/oauth', title: 'OAuth 2.0', description: 'Step through the Authorization Code Flow with PKCE.', category: 'fundamentals', difficulty: 'Intermediate' },
      { href: '/learn/zero-trust', title: 'Zero Trust', description: 'How every request is evaluated against policy gates.', category: 'fundamentals', difficulty: 'Intermediate' },
      { href: '/learn/devsecops', title: 'DevSecOps Pipeline', description: 'Security gates in a CI/CD pipeline, animated end to end.', category: 'fundamentals', difficulty: 'Beginner' },
    ],
  },
  {
    header: '// from my projects',
    category: 'projects',
    topics: [
      { href: '/learn/jwt', title: 'JWT Authentication', description: 'Login, signing, verification, and revocation in sequence.', category: 'projects', difficulty: 'Intermediate' },
      { href: '/learn/rbac', title: 'RBAC Policy Evaluation', description: 'Evaluate roles against resources in a live policy matrix.', category: 'projects', difficulty: 'Intermediate' },
      { href: '/learn/ir-kill-chain', title: 'IR Kill Chain', description: 'Map attacker techniques to incident response actions.', category: 'projects', difficulty: 'Advanced' },
      { href: '/learn/log-anomaly', title: 'Log Anomaly Detection', description: 'Isolation Forest pipeline from raw log to alert.', category: 'projects', difficulty: 'Advanced' },
      { href: '/learn/devsecops', title: 'CI/CD Security', description: 'Shift-left security gates across the build pipeline.', category: 'projects', difficulty: 'Beginner' },
      { href: '/learn/cloud-audit', title: 'Cloud Audit', description: 'CIS benchmark checks with a live risk score.', category: 'projects', difficulty: 'Intermediate' },
    ],
  },
  {
    header: '// cryptography & research',
    category: 'crypto',
    topics: [
      { href: '/learn/public-key-crypto', title: 'Public Key Crypto', description: 'RSA vs ECC — keys, speed, and use cases compared.', category: 'crypto', difficulty: 'Advanced' },
      { href: '/learn/rfid-nfc', title: 'RFID/NFC (SONDA-MA)', description: 'Mutual authentication on passive NFC hardware.', category: 'crypto', difficulty: 'Advanced' },
      { href: '/learn/merkle-trees', title: 'Merkle Trees', description: 'Tamper detection and proofs of inclusion, interactively.', category: 'crypto', difficulty: 'Intermediate' },
      { href: '/learn/replay-attacks', title: 'Replay Attacks', description: 'Nonces and timestamps that defeat replayed messages.', category: 'crypto', difficulty: 'Intermediate' },
    ],
  },
  {
    header: '// offensive security',
    category: 'offensive',
    topics: [
      { href: '/learn/mitre-attack', title: 'MITRE ATT&CK', description: 'Explore tactics, techniques, and attack scenarios.', category: 'offensive', difficulty: 'Intermediate' },
      { href: '/learn/sql-injection', title: 'SQL Injection', description: 'Run payloads against a vulnerable query, then fix it.', category: 'offensive', difficulty: 'Beginner' },
      { href: '/learn/xss', title: 'XSS Attack & Defense', description: 'Reflected, stored, and DOM XSS with their defenses.', category: 'offensive', difficulty: 'Beginner' },
      { href: '/learn/osint', title: 'OSINT Techniques', description: 'A mind map of passive reconnaissance techniques.', category: 'offensive', difficulty: 'Intermediate' },
      { href: '/learn/privilege-escalation', title: 'Privilege Escalation', description: 'Linux and Windows escalation paths and vectors.', category: 'offensive', difficulty: 'Advanced' },
    ],
  },
]

const CATEGORY_STYLES: Record<Category, { border: string; dot: string; text: string }> = {
  fundamentals: { border: 'hover:border-blue-400/60', dot: 'bg-blue-400', text: 'text-blue-400' },
  projects: { border: 'hover:border-accent/60', dot: 'bg-accent', text: 'text-accent' },
  crypto: { border: 'hover:border-purple-400/60', dot: 'bg-purple-400', text: 'text-purple-400' },
  offensive: { border: 'hover:border-danger/60', dot: 'bg-danger', text: 'text-danger' },
}

const DIFFICULTY_STYLES: Record<Difficulty, string> = {
  Beginner: 'border-accent/40 text-accent',
  Intermediate: 'border-warning/40 text-warning',
  Advanced: 'border-danger/40 text-danger',
}

export default function LearnPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
      <SectionHeader
        title="Interactive Diagrams"
        subtitle="Visual explainers for security concepts from my projects, research, and workshops — click any topic to explore"
      />

      <div className="flex flex-col gap-14">
        {SECTIONS.map(section => {
          const style = CATEGORY_STYLES[section.category]
          return (
            <section key={section.header}>
              <div className="mb-6 flex items-center gap-3">
                <span className={`inline-block h-2.5 w-2.5 rounded-full ${style.dot}`} />
                <h3 className={`font-mono text-sm font-semibold ${style.text}`}>{section.header}</h3>
                <div className="h-px flex-1 bg-border-subtle" />
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {section.topics.map(topic => (
                  <Link
                    key={`${section.category}-${topic.href}`}
                    href={topic.href}
                    className={`group flex flex-col rounded-lg border border-border-subtle bg-panel p-6 transition-colors ${style.border}`}
                  >
                    <div className="mb-3 flex items-center justify-between gap-2">
                      <span className={`inline-block h-2 w-2 rounded-full ${style.dot}`} />
                      <span
                        className={`rounded border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide ${DIFFICULTY_STYLES[topic.difficulty]}`}
                      >
                        {topic.difficulty}
                      </span>
                    </div>
                    <h4 className="mb-2 text-lg font-semibold text-text-primary">{topic.title}</h4>
                    <p className="mb-5 flex-1 text-sm leading-relaxed text-text-muted">{topic.description}</p>
                    <span className={`font-mono text-sm ${style.text}`}>Explore →</span>
                  </Link>
                ))}
              </div>
            </section>
          )
        })}
      </div>
    </div>
  )
}
