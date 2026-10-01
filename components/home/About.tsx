import { pillars, profile, stats } from '@/data/profile'
import SectionHeader from '@/components/ui/SectionHeader'
import { CloudIcon, LockIcon, PipelineIcon, RadarIcon } from '@/components/ui/Icons'

const icons = {
  pipeline: PipelineIcon,
  cloud: CloudIcon,
  radar: RadarIcon,
  lock: LockIcon,
}

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-20">
      <div className="mb-16 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border-subtle bg-border-subtle lg:grid-cols-4">
        {stats.map(s => (
          <div key={s.label} className="bg-panel px-6 py-6">
            <div className="font-mono text-3xl font-bold text-text-primary">{s.value}</div>
            <div className="mt-1 text-sm text-text-muted">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <SectionHeader eyebrow="About" title="Operations mindset, attacker's eye" className="mb-6" />
          <p className="leading-relaxed text-text-muted">{profile.summary}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {profile.targetRoles.map(r => (
              <span key={r} className="rounded-full border border-accent/30 bg-accent/5 px-3 py-1 text-xs font-medium text-accent">
                {r}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {pillars.map(p => {
            const Icon = icons[p.icon]
            return (
              <div key={p.title} className="card card-hover p-5">
                <div className="mb-3 grid h-10 w-10 place-items-center rounded-lg bg-accent/10 text-accent">
                  <Icon size={20} />
                </div>
                <h3 className="font-semibold text-text-primary">{p.title}</h3>
                <p className="mt-1 text-sm text-text-muted">{p.description}</p>
                <ul className="mt-3 space-y-1.5">
                  {p.points.map(pt => (
                    <li key={pt} className="flex gap-2 text-[13px] leading-snug text-text-primary/85">
                      <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-accent" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
