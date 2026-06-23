import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '404 — Page Not Found',
}

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-6 text-center">
      <div className="font-mono text-7xl font-bold text-accent sm:text-9xl">404</div>

      <div className="mt-4 font-mono text-lg text-text-primary">
        <span className="text-accent">{'>'}</span> page not found
        <span className="animate-blink text-accent">▋</span>
      </div>

      <p className="mt-6 max-w-md text-text-muted">
        This page doesn&apos;t exist or has been moved.
      </p>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/"
          className="rounded bg-accent px-6 py-3 font-mono text-sm font-semibold text-background transition-colors hover:bg-accent-dim"
        >
          Go Home
        </Link>
        <Link
          href="/projects"
          className="rounded border border-accent px-6 py-3 font-mono text-sm font-semibold text-accent transition-colors hover:bg-accent/10"
        >
          View Projects
        </Link>
      </div>
    </div>
  )
}
