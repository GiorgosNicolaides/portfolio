import { profile } from '@/data/profile'
import { DownloadIcon, GitHubIcon, LinkedInIcon, MailIcon } from '@/components/ui/Icons'

export default function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-6xl px-6 pt-8">
      <div className="relative overflow-hidden rounded-2xl border border-accent/30 bg-gradient-to-br from-accent/10 via-panel to-sky/10 px-6 py-14 text-center sm:px-12">
        <div className="eyebrow mb-4">Let&apos;s talk</div>
        <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
          Looking for a DevOps or security engineer who automates the secure path?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-text-muted">
          I&apos;m open to DevOps, DevSecOps, cloud security and SOC roles, and happy to talk through any of these projects in detail.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a href={`mailto:${profile.email}`} className="btn-primary">
            <MailIcon size={16} /> {profile.email}
          </a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="btn-secondary">
            <LinkedInIcon size={16} /> LinkedIn
          </a>
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className="btn-secondary">
            <GitHubIcon size={16} /> GitHub
          </a>
          <a href={profile.cv} download className="btn-secondary">
            <DownloadIcon size={16} /> CV
          </a>
        </div>
      </div>
    </section>
  )
}
