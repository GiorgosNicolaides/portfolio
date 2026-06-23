'use client'
import { useState } from 'react'

const EMAIL = 'gnicolaides02@gmail.com'

function ClipboardIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  )
}

export default function CopyEmail() {
  const [copied, setCopied] = useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      /* clipboard unavailable — silently ignore */
    }
  }

  return (
    <span className="inline-flex items-center gap-2">
      <button
        type="button"
        onClick={copy}
        aria-label="Copy email address to clipboard"
        className="text-text-muted transition-colors hover:text-accent"
      >
        <ClipboardIcon />
      </button>
      {copied && (
        <span className="animate-fadeIn font-mono text-xs text-accent">Copied!</span>
      )}
    </span>
  )
}
