import { cn } from '@/lib/utils'

function DownloadIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <path d="m7 10 5 5 5-5" />
      <path d="M12 15V3" />
    </svg>
  )
}

export default function DownloadCV({ className }: { className?: string }) {
  return (
    <a
      href="/George_Nicolaides_CV.pdf"
      download="George_Nicolaides_CV.pdf"
      className={cn(
        'inline-flex items-center gap-2 rounded border border-accent px-6 py-3 font-mono text-sm font-semibold text-accent transition-colors hover:bg-accent hover:text-background',
        className
      )}
    >
      <DownloadIcon />
      Download CV
    </a>
  )
}
