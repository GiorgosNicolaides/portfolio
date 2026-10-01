import { cn } from '@/lib/utils'

interface SectionHeaderProps {
  title: string
  subtitle?: string
  eyebrow?: string
  className?: string
}

export default function SectionHeader({ title, subtitle, eyebrow, className }: SectionHeaderProps) {
  return (
    <div className={cn('mb-12', className)}>
      {eyebrow && <div className="eyebrow mb-3">{eyebrow}</div>}
      <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">{title}</h2>
      {subtitle && <p className="mt-4 max-w-2xl text-base leading-relaxed text-text-muted">{subtitle}</p>}
    </div>
  )
}
