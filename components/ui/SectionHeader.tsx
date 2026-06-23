import { cn } from '@/lib/utils'

interface SectionHeaderProps {
  title: string
  subtitle?: string
  className?: string
}

export default function SectionHeader({ title, subtitle, className }: SectionHeaderProps) {
  return (
    <div className={cn('mb-12', className)}>
      <div className="flex items-center gap-3 mb-3">
        <span className="text-accent font-mono text-sm">{'>'}</span>
        <h2 className="text-3xl font-bold text-text-primary tracking-tight">
          {title}
        </h2>
      </div>
      <div className="h-px w-16 bg-accent mb-4" />
      {subtitle && (
        <p className="text-text-muted text-base max-w-2xl">{subtitle}</p>
      )}
    </div>
  )
}