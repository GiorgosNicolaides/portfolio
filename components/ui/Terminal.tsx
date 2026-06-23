import { cn } from '@/lib/utils'

interface TerminalProps {
  title?: string
  children: React.ReactNode
  className?: string
}

export default function Terminal({ title = 'terminal', children, className }: TerminalProps) {
  return (
    <div className={cn(
      'rounded-lg border border-border-subtle bg-panel overflow-hidden',
      className
    )}>
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border-subtle bg-background">
        <span className="w-3 h-3 rounded-full bg-danger/70" />
        <span className="w-3 h-3 rounded-full bg-warning/70" />
        <span className="w-3 h-3 rounded-full bg-accent/70" />
        <span className="ml-2 text-text-muted text-xs font-mono">{title}</span>
      </div>
      <div className="p-4 font-mono text-sm">
        {children}
      </div>
    </div>
  )
}