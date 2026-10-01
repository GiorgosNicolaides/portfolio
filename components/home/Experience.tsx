import Image from 'next/image'
import Link from 'next/link'
import { certifications, profile, timeline } from '@/data/profile'
import { projects } from '@/data/projects'
import SectionHeader from '@/components/ui/SectionHeader'
import { ArrowRightIcon, CapIcon, ShieldIcon, UsersIcon, BookIcon } from '@/components/ui/Icons'

const research = projects.filter(p => p.category === 'research')

export default function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-6xl px-6 py-20">
      <SectionHeader
        eyebrow="Background"
        title="Education, leadership & research"
        subtitle="A strong academic base, combined with running a community and teaching security hands-on."
      />

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.4fr_1fr]">
        <ol className="relative space-y-8 border-l border-border-subtle pl-8">
          {timeline.map(item => {
            const Icon = item.kind === 'education' ? CapIcon : UsersIcon
            return (
              <li key={item.title + item.org} className="relative">
                <span className="absolute -left-[45px] grid h-7 w-7 place-items-center rounded-full border border-border-subtle bg-panel text-accent">
                  <Icon size={14} />
                </span>
                <div className="font-mono text-xs text-text-muted">{item.period}</div>
                <h3 className="mt-1 font-semibold text-text-primary">{item.title}</h3>
                <div className="text-sm text-accent">
                  {item.org} <span className="text-text-muted">· {item.place}</span>
                </div>
                <ul className="mt-3 space-y-1.5">
                  {item.points.map(pt => (
                    <li key={pt} className="flex gap-2 text-sm leading-relaxed text-text-muted">
                      <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-text-muted" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </li>
            )
          })}
        </ol>

        <div className="space-y-5">
          <div className="card p-6">
            <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-text-primary">
              <BookIcon size={16} className="text-accent" /> Research
            </div>
            <div className="space-y-4">
              {research.map(r => (
                <Link key={r.slug} href={`/projects/${r.slug}`} className="group block rounded-lg border border-border-subtle bg-background/50 p-4 transition-colors hover:border-accent/40">
                  <div className="font-mono text-2xl font-bold text-accent">{r.metrics[0].value}</div>
                  <div className="text-[11px] text-text-muted">{r.metrics[0].label}</div>
                  <div className="mt-2 text-sm font-medium text-text-primary group-hover:text-accent">{r.title}</div>
                </Link>
              ))}
            </div>
          </div>

          <div className="card p-6">
            <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-text-primary">
              <ShieldIcon size={16} className="text-accent" /> Certifications & practice
            </div>
            <ul className="space-y-3">
              {certifications.map(c => (
                <li key={c.name} className="flex items-center justify-between gap-3">
                  <div>
                    <div className="text-sm text-text-primary">
                      {c.href ? (
                        <a href={c.href} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
                          {c.name}
                        </a>
                      ) : (
                        c.name
                      )}
                    </div>
                    <div className="text-xs text-text-muted">{c.issuer}</div>
                  </div>
                  <span className="shrink-0 rounded-full bg-warning/10 px-2 py-0.5 font-mono text-[11px] text-warning">
                    {c.status}
                  </span>
                </li>
              ))}
            </ul>
            <a
              href={profile.tryhackme.profile_url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 block overflow-hidden rounded-lg border border-border-subtle"
            >
              <Image
                src={profile.tryhackme.badge_url}
                alt={`TryHackMe profile badge for ${profile.tryhackme.username}`}
                width={329}
                height={88}
                className="h-auto w-full"
                unoptimized
              />
            </a>
            <Link href="/learn" className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
              Interactive security labs <ArrowRightIcon size={15} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
