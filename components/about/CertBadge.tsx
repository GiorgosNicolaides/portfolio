import { cn } from '@/lib/utils'
import type { Certification } from '@/hooks/useProfile'

const STATUS: Record<
  Certification['status'],
  { dot: string; label: string; text: string }
> = {
  in_progress: { dot: 'bg-warning animate-pulse', label: 'In Progress', text: 'text-warning' },
  completed: { dot: 'bg-accent', label: 'Completed', text: 'text-accent' },
  planned: { dot: 'bg-text-muted', label: 'Planned', text: 'text-text-muted' },
}

export default function CertBadge({ cert }: { cert: Certification }) {
  const status = STATUS[cert.status]

  return (
    <div className="flex items-center justify-between rounded-lg border border-border-subtle bg-panel p-5">
      <div>
        <div className="font-semibold text-text-primary">{cert.name}</div>
        <div className="font-mono text-sm text-text-muted">
          {cert.issuer}
          {cert.expected ? ` · expected ${cert.expected}` : ''}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span className={cn('h-2.5 w-2.5 rounded-full', status.dot)} />
        <span className={cn('font-mono text-xs', status.text)}>{status.label}</span>
      </div>
    </div>
  )
}
