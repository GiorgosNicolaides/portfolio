export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border-subtle mt-20">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-text-muted text-sm font-mono">
          © {year} Georgios Nicolaides
        </p>

        <div className="flex items-center gap-6">
          <a
            href="https://github.com/GiorgosNicolaides"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-muted text-sm font-mono hover:text-accent transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/giorgosnicolaides/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-muted text-sm font-mono hover:text-accent transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="mailto:gnicolaides02@gmail.com"
            className="text-text-muted text-sm font-mono hover:text-accent transition-colors"
          >
            Email
          </a>
        </div>

        <p className="text-text-muted text-xs font-mono">
          Built with <span className="text-accent">Next.js</span>
        </p>
      </div>
    </footer>
  )
}
