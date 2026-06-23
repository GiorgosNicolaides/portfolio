'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const links = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/research', label: 'Research' },
  { href: '/learn', label: 'Learn' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export default function Nav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 border-b border-border-subtle bg-background/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="font-mono font-bold text-lg text-accent hover:text-accent-dim transition-colors">
          GN<span className="animate-blink text-accent">_</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'font-mono text-sm transition-colors hover:text-accent',
                pathname === link.href
                  ? 'text-accent'
                  : 'text-text-muted'
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-text-muted hover:text-accent transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? (
              <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <>
                <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-border-subtle bg-panel px-6 py-4 flex flex-col gap-4">
          {links.map(link => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={cn(
                'font-mono text-sm transition-colors hover:text-accent',
                pathname === link.href ? 'text-accent' : 'text-text-muted'
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}