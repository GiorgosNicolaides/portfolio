'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { profile } from '@/data/profile'
import { DownloadIcon } from '@/components/ui/Icons'

const links = [
  { href: '/#about', label: 'About' },
  { href: '/#skills', label: 'Skills' },
  { href: '/projects', label: 'Projects' },
  { href: '/#experience', label: 'Experience' },
  { href: '/learn', label: 'Labs' },
  { href: '/#contact', label: 'Contact' },
]

export default function Nav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const isActive = (href: string) =>
    !href.includes('#') && (pathname === href || pathname.startsWith(`${href}/`))

  return (
    <nav className="sticky top-0 z-50 border-b border-border-subtle/80 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5">
        <Link href="/" className="group flex items-center gap-2.5" aria-label="Home">
          <span className="grid h-8 w-8 place-items-center rounded-lg border border-accent/40 bg-accent/10 font-mono text-sm font-bold text-accent">
            GN
          </span>
          <span className="hidden text-sm font-semibold text-text-primary sm:block">
            {profile.name}
          </span>
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {links.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'text-sm transition-colors hover:text-accent',
                isActive(link.href) ? 'text-accent' : 'text-text-muted'
              )}
            >
              {link.label}
            </Link>
          ))}
          <a href={profile.cv} download className="btn-primary !px-4 !py-2">
            <DownloadIcon size={16} /> CV
          </a>
        </div>

        <button
          className="text-text-muted transition-colors hover:text-accent md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? (
              <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="flex flex-col gap-4 border-t border-border-subtle bg-panel px-6 py-5 md:hidden">
          {links.map(link => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={cn(
                'text-sm transition-colors hover:text-accent',
                isActive(link.href) ? 'text-accent' : 'text-text-muted'
              )}
            >
              {link.label}
            </Link>
          ))}
          <a href={profile.cv} download className="btn-primary w-fit">
            <DownloadIcon size={16} /> Download CV
          </a>
        </div>
      )}
    </nav>
  )
}
