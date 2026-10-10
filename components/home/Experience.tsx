import Image from 'next/image'
import Link from 'next/link'
import { certifications, profile, timeline, volunteering, type TimelineItem } from '@/data/profile'
import { projects } from '@/data/projects'
import SectionHeader from '@/components/ui/SectionHeader'
import { ArrowRightIcon, BookIcon, BriefcaseIcon, CapIcon, ExternalIcon, ShieldIcon, UsersIcon } from '@/components/ui/Icons'
import { cn } from '@/lib/utils'

const research = projects.filter(p => p.category === 'research')

const kindIcons = {
  work: BriefcaseIcon,
  education: CapIcon,
  volunteer: UsersIcon,
}

function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <ol className="relative space-y-8 border-l border-border-subtle pl-8">
      {items.map(item => {
        const Icon = kindIcons[item.kind]
        return (
          <li key={item.title + item.org} className="relative">
            <span
              className={cn(
                'absolute -left-[46.5px] grid h-7 w-7 place-items-center rounded-full border bg-panel text-accent',
                item.current ? 'border-accent/60 shadow-[0_0_0_4px_rgba(52,211,153,0.12)]' : 'border-border-subtle'
              )}
            >
              <Icon size={14} />
            </span>
            <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-text-muted">
              {item.period}
              {item.current && (
                <span className="rounded-full bg-accent/10 px-2 py-0.5 text-[10px] text-accent">Current</span>
              )}
            </div>
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
  )
}

export default function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-6xl px-6 py-20">
      <SectionHeader
        eyebrow="Background"
        title="Experience, education & certifications"
        subtitle="Hands-on IT operations, a cybersecurity master's degree and vendor certifications, plus volunteering with a university developer community."
      />

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <Timeline items={timeline} />
          <h3 className="mb-6 mt-14 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.15em] text-accent">
            <UsersIcon size={16} /> Volunteering
          </h3>
          <Timeline items={volunteering} />
        </div>

        <div className="space-y-5">
          <div id="certifications" className="card p-6">
            <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-text-primary">
              <ShieldIcon size={16} className="text-accent" /> Certifications
            </div>
            <ul className="space-y-4">
              {certifications.map(c => (
                <li key={c.name} className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-sm leading-snug text-text-primary">{c.name}</div>
                    <div className="mt-0.5 text-xs text-text-muted">
                      {c.issuer} · {c.issued} · valid to {c.expires}
                    </div>
                  </div>
                  <a
                    href={c.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${c.linkLabel} ${c.name}`}
                    className="inline-flex shrink-0 items-center gap-1 rounded-full bg-accent/10 px-2 py-0.5 font-mono text-[11px] text-accent transition-colors hover:bg-accent/20"
                  >
                    {c.linkLabel} <ExternalIcon size={11} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="card p-6">
            <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-text-primary">
              <BookIcon size={16} className="text-accent" /> Research
            </div>
            <div className="space-y-4">
              {research.map(r => (
                <Link
                  key={r.slug}
                  href={`/projects/${r.slug}`}
                  className="group block rounded-lg border border-border-subtle bg-background/50 p-4 transition-colors hover:border-accent/40"
                >
                  <div className="font-mono text-2xl font-bold text-accent">{r.metrics[0].value}</div>
                  <div className="text-[11px] text-text-muted">{r.metrics[0].label}</div>
                  <div className="mt-2 text-sm font-medium text-text-primary group-hover:text-accent">{r.title}</div>
                </Link>
              ))}
            </div>
          </div>

          <div className="card p-6">
            <div className="mb-2 text-sm font-semibold text-text-primary">Hands-on practice</div>
            <p className="mb-4 text-sm text-text-muted">
              Offensive and defensive labs on{' '}
              <a href={profile.tryhackme.profile_url} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                TryHackMe ({profile.tryhackme.username})
              </a>
              .
            </p>
            <a
              href={profile.tryhackme.profile_url}
              target="_blank"
              rel="noopener noreferrer"
              className="block overflow-hidden rounded-lg border border-border-subtle"
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
