import { cn } from '@/lib/utils'

type BadgeVariant = 'default' | 'security' | 'success' | 'warning' | 'danger' | 'blue' | 'research'

const variants: Record<BadgeVariant, string> = {
  default: 'bg-panel border border-border-subtle text-text-muted',
  security: 'bg-accent/10 border border-accent/30 text-accent',
  success: 'bg-green-500/10 border border-green-500/30 text-green-400',
  warning: 'bg-warning/10 border border-warning/30 text-warning',
  danger: 'bg-danger/10 border border-danger/30 text-danger',
  blue: 'bg-blue-500/10 border border-blue-500/30 text-blue-400',
  research: 'bg-purple-500/10 border border-purple-500/30 text-purple-400',
}

interface BadgeProps {
  children: React.ReactNode
  variant?: BadgeVariant
  className?: string
}

export default function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span className={cn(
      'inline-flex items-center px-2.5 py-0.5 rounded text-xs font-mono font-medium',
      variants[variant],
      className
    )}>
      {children}
    </span>
  )
}